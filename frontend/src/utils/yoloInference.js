import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime wasm paths
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;

const VEHICLE_MAP = {
  1: 'bicycle',
  2: 'car',
  3: 'motorcycle',
  5: 'bus',
  7: 'truck',
};

const CLASS_COLORS = {
  car: '#1A3A3A',
  bus: '#FF4D8B',
  truck: '#E8B94A',
  motorcycle: '#B8A4ED',
  bicycle: '#FFB084',
};

let cachedSession = null;

export async function getYoloSession(modelPath = './yolov8n.onnx') {
  if (cachedSession) return cachedSession;
  try {
    cachedSession = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
    return cachedSession;
  } catch (err) {
    console.warn('Could not initialize ONNX session:', err);
    throw err;
  }
}

/**
 * Preprocesses an image file or objectUrl to 1x3x640x640 float32 tensor
 */
async function preprocessImage(imgUrl, targetSize = 640) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const origW = img.naturalWidth || img.width;
      const origH = img.naturalHeight || img.height;

      const canvas = document.createElement('canvas');
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetSize, targetSize);

      const imgData = ctx.getImageData(0, 0, targetSize, targetSize);
      const { data } = imgData; // RGBA

      const floatData = new Float32Array(3 * targetSize * targetSize);
      const channelSize = targetSize * targetSize;

      for (let i = 0; i < channelSize; i++) {
        floatData[i] = data[i * 4] / 255.0; // R
        floatData[channelSize + i] = data[i * 4 + 1] / 255.0; // G
        floatData[2 * channelSize + i] = data[i * 4 + 2] / 255.0; // B
      }

      const tensor = new ort.Tensor('float32', floatData, [1, 3, targetSize, targetSize]);
      resolve({ tensor, origW, origH });
    };
    img.onerror = reject;
    img.src = imgUrl;
  });
}

function calculateIoU(boxA, boxB) {
  const xA = Math.max(boxA[0], boxB[0]);
  const yA = Math.max(boxA[1], boxB[1]);
  const xB = Math.min(boxA[2], boxB[2]);
  const yB = Math.min(boxA[3], boxB[3]);

  const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1]);
  const boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1]);

  return interArea / (boxAArea + boxBArea - interArea + 1e-6);
}

function nonMaxSuppression(candidates, iouThreshold = 0.45) {
  candidates.sort((a, b) => b.confidence - a.confidence);
  const selected = [];

  for (const current of candidates) {
    let shouldKeep = true;
    for (const chosen of selected) {
      if (calculateIoU(current.box, chosen.box) > iouThreshold) {
        shouldKeep = false;
        break;
      }
    }
    if (shouldKeep) {
      selected.push(current);
    }
  }

  return selected;
}

/**
 * Runs client-side YOLOv8 nano inference on an image URL
 */
export async function runClientYoloInference(imageUrl, minConfidence = 0.10) {
  const session = await getYoloSession();
  const { tensor, origW, origH } = await preprocessImage(imageUrl, 640);

  const outputs = await session.run({ images: tensor });
  const outputTensor = outputs.output0; // [1, 84, 8400]
  const data = outputTensor.data;

  const numChannels = 84;
  const numBoxes = 8400;

  const candidates = [];

  for (let i = 0; i < numBoxes; i++) {
    let maxScore = 0;
    let maxClassId = -1;

    for (let c = 4; c < numChannels; c++) {
      const score = data[c * numBoxes + i];
      const classId = c - 4;
      if (VEHICLE_MAP[classId] && score > maxScore) {
        maxScore = score;
        maxClassId = classId;
      }
    }

    if (maxScore >= minConfidence) {
      const cx = data[0 * numBoxes + i];
      const cy = data[1 * numBoxes + i];
      const bw = data[2 * numBoxes + i];
      const bh = data[3 * numBoxes + i];

      const scaleX = origW / 640;
      const scaleY = origH / 640;

      const x1 = Math.max(0, (cx - bw / 2) * scaleX);
      const y1 = Math.max(0, (cy - bh / 2) * scaleY);
      const x2 = Math.min(origW, (cx + bw / 2) * scaleX);
      const y2 = Math.min(origH, (cy + bh / 2) * scaleY);

      const className = VEHICLE_MAP[maxClassId];
      const color = CLASS_COLORS[className] || '#E8B94A';

      const leftPct = (x1 / origW) * 100;
      const topPct = (y1 / origH) * 100;
      const widthPct = ((x2 - x1) / origW) * 100;
      const heightPct = ((y2 - y1) / origH) * 100;

      candidates.push({
        class_name: className,
        confidence: Math.round(maxScore * 1000) / 1000,
        box: [Math.round(x1), Math.round(y1), Math.round(x2), Math.round(y2)],
        top: `${Math.max(0, topPct).toFixed(1)}%`,
        left: `${Math.max(0, leftPct).toFixed(1)}%`,
        width: `${Math.min(100, Math.max(2, widthPct)).toFixed(1)}%`,
        height: `${Math.min(100, Math.max(2, heightPct)).toFixed(1)}%`,
        color,
      });
    }
  }

  const finalDetections = nonMaxSuppression(candidates, 0.45);

  return {
    detections: finalDetections,
    image_dimensions: { width: origW, height: origH },
  };
}
