import React, { useState, useRef } from 'react';
import logoUrl from '../assets/trafficmind-logo.png';

const DEFAULT_WORKSPACE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuA_y5GJMTU-i0lH8DN2rsMZJrOuBKELpLVrlwIrRsYD2PzjeXI8H6gTVFZwLt8-5HQelrjyVQyf68U3U7sUH-ignuDHKYDcvshVFHWC1OdnBpYcmLlMzwS9JM8dl8by2YAFC_L1U7i5Ug1h7IPwmVyTg5L00AFf1FW765E-XiRPULXhiJbkI-o6oHprqswjgJR7obWCRFCgOEuKuy-ih24_31rHSULOy8NnXKL3pEc";
const DEFAULT_STAGE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBuC02RuewM9JC3hQ-xXiYBEUKfnO804Wft76krUOR19lccjKOHJvLf659w-G62BSwQ_rt2FHwiSfbq_9aTwv0tJA1Z7wIRaH6DSkuC3pU49dnjVUwEoveu_Za_FbdyZJyV7-rrq9AT5__5liFzg652XfHwpCkUNdNiEKCKGdnvBojipwHPKkTTNSiEF4erxitKvORo3OHKetUdYUIBDdf-RUhKwy9EW1nFbH3PiSY";

// Default sample detections from Stitch specification
const DEFAULT_DETECTIONS = [
  { class_name: 'bus', confidence: 0.94, box: [422, 302, 806, 712], top: '28%', left: '22%', width: '20%', height: '38%', color: '#FF4D8B' },
  { class_name: 'bus', confidence: 0.91, box: [864, 172, 1132, 432], top: '16%', left: '45%', width: '14%', height: '24%', color: '#FF4D8B' },
  { class_name: 'bus', confidence: 0.88, box: [1305, 561, 1651, 928], top: '52%', left: '68%', width: '18%', height: '34%', color: '#FF4D8B' },
  { class_name: 'car', confidence: 0.89, box: [192, 410, 403, 604], top: '38%', left: '10%', width: '11%', height: '18%', color: '#1A3A3A' },
  { class_name: 'car', confidence: 0.96, box: [652, 583, 883, 820], top: '54%', left: '34%', width: '12%', height: '22%', color: '#1A3A3A' },
  { class_name: 'car', confidence: 0.79, box: [1190, 237, 1382, 421], top: '22%', left: '62%', width: '10%', height: '17%', color: '#1A3A3A' },
  { class_name: 'car', confidence: 0.85, box: [345, 734, 595, 972], top: '68%', left: '18%', width: '13%', height: '22%', color: '#1A3A3A' },
  { class_name: 'truck', confidence: 0.92, box: [268, 129, 576, 399], top: '12%', left: '14%', width: '16%', height: '25%', color: '#E8B94A' },
  { class_name: 'truck', confidence: 0.87, box: [940, 712, 1228, 993], top: '66%', left: '49%', width: '15%', height: '26%', color: '#E8B94A' },
  { class_name: 'motorcycle', confidence: 0.81, box: [921, 518, 1056, 648], top: '48%', left: '48%', width: '7%', height: '12%', color: '#B8A4ED' },
  { class_name: 'bicycle', confidence: 0.74, box: [1651, 345, 1766, 464], top: '32%', left: '86%', width: '6%', height: '11%', color: '#FFB084' },
];

export default function AnalyzeTrafficView() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.25);
  const [monitoredClasses, setMonitoredClasses] = useState({
    car: true,
    bus: true,
    truck: true,
    motorcycle: true,
    bicycle: true,
  });

  const [currentFile, setCurrentFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_WORKSPACE_IMG);
  const [stageImageUrl, setStageImageUrl] = useState(DEFAULT_STAGE_IMG);
  const [imageDimensions, setImageDimensions] = useState({ width: 1920, height: 1080 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // Analysis state
  const [analysisResult, setAnalysisResult] = useState({
    isCustom: false,
    fileName: 'sample_intersection_rushhour.jpg',
    resolution: '1920 × 1080 · 2.4 MB · JPEG RGB',
    detections: DEFAULT_DETECTIONS,
  });

  const fileInputRef = useRef(null);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setCurrentFile(file);
    setAnalysisError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setStageImageUrl(objectUrl);

    // Reset detections to clean slate so old mock boxes don't appear over the new image
    setAnalysisResult({
      isCustom: true,
      fileName: file.name,
      resolution: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      detections: [],
    });

    // Auto trigger analysis
    runAnalysis(file, objectUrl);
  };

  const runAnalysis = async (fileToAnalyze = currentFile, directUrl = null) => {
    if (!fileToAnalyze) {
      // Trigger sample simulation refresh
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowOverlay(true);
      }, 300);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    const formData = new FormData();
    formData.append('file', fileToAnalyze);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Inference service error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Format detections to relative bounds
      const imgW = data.image_dimensions?.width || 1920;
      const imgH = data.image_dimensions?.height || 1080;
      setImageDimensions({ width: imgW, height: imgH });

      const formattedDetections = (data.detections || []).map((det) => {
        const rawBox = det.bbox || det.box || (det.normalized_bbox ? [det.normalized_bbox[0]*imgW, det.normalized_bbox[1]*imgH, det.normalized_bbox[2]*imgW, det.normalized_bbox[3]*imgH] : [0, 0, 0, 0]);
        const x1 = Array.isArray(rawBox) ? (rawBox[0] ?? 0) : 0;
        const y1 = Array.isArray(rawBox) ? (rawBox[1] ?? 0) : 0;
        const x2 = Array.isArray(rawBox) ? (rawBox[2] ?? 0) : 0;
        const y2 = Array.isArray(rawBox) ? (rawBox[3] ?? 0) : 0;

        let leftPct = 0;
        let topPct = 0;
        let widthPct = 0;
        let heightPct = 0;

        if (det.normalized_bbox && Array.isArray(det.normalized_bbox) && det.normalized_bbox.length >= 4) {
          leftPct = det.normalized_bbox[0] * 100;
          topPct = det.normalized_bbox[1] * 100;
          widthPct = (det.normalized_bbox[2] - det.normalized_bbox[0]) * 100;
          heightPct = (det.normalized_bbox[3] - det.normalized_bbox[1]) * 100;
        } else {
          widthPct = ((x2 - x1) / (imgW || 1)) * 100;
          heightPct = ((y2 - y1) / (imgH || 1)) * 100;
          leftPct = (x1 / (imgW || 1)) * 100;
          topPct = (y1 / (imgH || 1)) * 100;
        }

        const className = (det.class_name || det.class || 'car').toLowerCase();
        let color = '#1A3A3A'; // Teal
        if (className === 'bus') color = '#FF4D8B'; // Pink
        else if (className === 'truck') color = '#E8B94A'; // Ochre
        else if (className === 'motorcycle') color = '#B8A4ED'; // Lavender
        else if (className === 'bicycle') color = '#FFB084'; // Peach

        return {
          class_name: className,
          confidence: det.confidence || 0,
          box: [x1, y1, x2, y2],
          top: `${Math.max(0, topPct).toFixed(1)}%`,
          left: `${Math.max(0, leftPct).toFixed(1)}%`,
          width: `${Math.min(100, Math.max(2, widthPct)).toFixed(1)}%`,
          height: `${Math.min(100, Math.max(2, heightPct)).toFixed(1)}%`,
          color,
        };
      });

      setAnalysisResult({
        isCustom: true,
        fileName: fileToAnalyze.name,
        resolution: `${imgW} × ${imgH} · ${(fileToAnalyze.size / (1024 * 1024)).toFixed(1)} MB`,
        detections: formattedDetections,
      });

    } catch (err) {
      console.warn('Backend inference unavailable, switching to client simulation:', err);
      // Fallback for static hosts (e.g. GitHub Pages) where Python FastAPI backend is not running
      const fallbackDetections = [
        { class_name: 'car', confidence: 0.94, box: [192, 410, 403, 604], top: '38%', left: '10%', width: '12%', height: '18%', color: '#1A3A3A' },
        { class_name: 'car', confidence: 0.91, box: [652, 583, 883, 820], top: '54%', left: '34%', width: '14%', height: '22%', color: '#1A3A3A' },
        { class_name: 'bus', confidence: 0.88, box: [422, 302, 806, 712], top: '28%', left: '22%', width: '20%', height: '38%', color: '#FF4D8B' },
        { class_name: 'truck', confidence: 0.85, box: [940, 712, 1228, 993], top: '66%', left: '49%', width: '16%', height: '26%', color: '#E8B94A' },
        { class_name: 'motorcycle', confidence: 0.78, box: [921, 518, 1056, 648], top: '48%', left: '48%', width: '8%', height: '12%', color: '#B8A4ED' },
      ];
      setAnalysisResult({
        isCustom: true,
        fileName: fileToAnalyze.name,
        resolution: `${(fileToAnalyze.size / (1024 * 1024)).toFixed(1)} MB (Client Simulation)`,
        detections: fallbackDetections,
      });
      setShowOverlay(true);
      setAnalysisError('Static Web Preview: Running client-side simulation. For live YOLOv8 nano inference, run the local backend server.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentFile(null);
    setPreviewUrl(DEFAULT_WORKSPACE_IMG);
    setStageImageUrl(DEFAULT_STAGE_IMG);
    setImageDimensions({ width: 1920, height: 1080 });
    setConfidenceThreshold(0.25);
    setMonitoredClasses({
      car: true,
      bus: true,
      truck: true,
      motorcycle: true,
      bicycle: true,
    });
    setShowOverlay(true);
    setAnalysisError(null);
    setAnalysisResult({
      isCustom: false,
      fileName: 'sample_intersection_rushhour.jpg',
      resolution: '1920 × 1080 · 2.4 MB · JPEG RGB',
      detections: DEFAULT_DETECTIONS,
    });
  };

  // Filter detections dynamically based on threshold and monitored classes
  const visibleDetections = (analysisResult.detections || []).filter((det) => {
    if (det.confidence < confidenceThreshold) return false;
    if (det.class_name === 'car' && !monitoredClasses.car) return false;
    if (det.class_name === 'bus' && !monitoredClasses.bus) return false;
    if (det.class_name === 'truck' && !monitoredClasses.truck) return false;
    if (det.class_name === 'motorcycle' && !monitoredClasses.motorcycle) return false;
    if (det.class_name === 'bicycle' && !monitoredClasses.bicycle) return false;
    return true;
  });

  // Dynamically compute counts based on active filtered detections
  const carCount = visibleDetections.filter(d => d.class_name === 'car').length;
  const busCount = visibleDetections.filter(d => d.class_name === 'bus').length;
  const truckCount = visibleDetections.filter(d => d.class_name === 'truck').length;
  const motoCount = visibleDetections.filter(d => d.class_name === 'motorcycle').length;
  const bikeCount = visibleDetections.filter(d => d.class_name === 'bicycle').length;
  const totalCount = visibleDetections.length;

  // Dynamically compute weighted congestion score based on visible vehicles
  const weightedUnits = (
    carCount * 1.0 +
    busCount * 3.2 +
    truckCount * 2.5 +
    (motoCount + bikeCount) * 0.5
  );

  const activeCongestionScore = totalCount === 0 
    ? 0 
    : Math.min(100, Math.max(5, Math.round((weightedUnits / 20.0) * 100)));

  let activeCongestionLevel = 'Clear (0 Targets)';
  let activeSignalPriority = 'Normal Timing (Low Priority)';
  let activeBaseSplit = '45s';
  let activeProposedSplit = '45s (Standard)';
  let activeExplanation = 'No monitored vehicles currently visible with active filters.';

  if (totalCount > 0) {
    if (activeCongestionScore < 35) {
      activeCongestionLevel = 'Low';
      activeSignalPriority = 'Normal Timing (Low Priority)';
      activeBaseSplit = '45s';
      activeProposedSplit = '45s';
      activeExplanation = `Light traffic volume detected with ${totalCount} monitored vehicle(s). Traffic flow is unconstrained; standard baseline split is adequate for this approach.`;
    } else if (activeCongestionScore < 68) {
      activeCongestionLevel = 'Moderate';
      activeSignalPriority = 'Adjust Timing (Moderate Priority)';
      activeBaseSplit = '45s';
      activeProposedSplit = '55s (+10s)';
      activeExplanation = `Moderate traffic volume detected with ${totalCount} monitored vehicle(s) (${activeCongestionScore}/100 index). Review approach green phase duration to mitigate potential queue accumulation.`;
    } else {
      activeCongestionLevel = 'High';
      activeSignalPriority = 'Prioritize Approach (High Priority)';
      activeBaseSplit = '45s';
      activeProposedSplit = '65s (+20s)';
      activeExplanation = `Elevated traffic volume detected with ${totalCount} monitored vehicle(s) (${activeCongestionScore}/100 index). Consider prioritizing approach clearance phase (+15s to +20s green extension) in cycle.`;
    }
  }

  const activeAvgConf = totalCount > 0
    ? ((visibleDetections.reduce((sum, d) => sum + (d.confidence || 0), 0) / totalCount) * 100).toFixed(1) + '%'
    : '0.0%';

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-margin py-space-xl flex flex-col gap-space-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-hairline pb-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="mb-2">
              <img 
                src={logoUrl} 
                alt="TrafficMind AI" 
                className="h-10 w-auto object-contain rounded-md" 
              />
            </div>
            <div className="flex items-center gap-space-sm mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card text-on-surface font-caption-uppercase text-caption-uppercase text-[11px] tracking-wider border border-hairline/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ochre"></span>
                {analysisResult.isCustom ? 'LOCAL SPECIMEN · ACTIVE INFERENCE' : 'PROTOTYPE · SAMPLE DATA PREVIEW'}
              </span>
              <span className="text-muted font-caption text-caption hidden sm:inline">Engine v2.4 (YOLOv8 Nano)</span>
            </div>
            <h1 className="font-display-md text-display-md text-body-strong tracking-tight">Traffic Analysis</h1>
            <p className="font-body-md text-body-md text-muted max-w-2xl">
              Upload a high-resolution intersection or corridor image to detect multi-class vehicles, evaluate density coefficients, and run simulation timing rules.
            </p>
          </div>
          {/* Quick Telemetry Chipset */}
          <div className="flex items-center gap-space-xs bg-surface-card p-1.5 rounded-xl border border-hairline self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-lg bg-surface flex flex-col">
              <span className="font-caption-uppercase text-[10px] text-muted-soft uppercase tracking-wider">Inference Model</span>
              <span className="font-title-sm text-xs font-semibold text-body-strong">YOLOv8-Nano-Transit</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-surface flex flex-col">
              <span className="font-caption-uppercase text-[10px] text-muted-soft uppercase tracking-wider">Target Latency</span>
              <span className="font-title-sm text-xs font-semibold text-body-strong">34.8 ms</span>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Error Notification if any */}
        {analysisError && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{analysisError}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setAnalysisError(null)}
              className="text-xs uppercase tracking-wider font-semibold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Upload & Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Upload & Parameter Control Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md bg-surface-container-lowest rounded-2xl p-6 border border-hairline shadow-sm">
            <div className="flex items-center justify-between pb-space-sm border-b border-hairline">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-xl">upload_file</span>
                <span className="font-title-sm text-title-sm text-body-strong">Input Source</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card text-success font-caption text-caption border border-hairline/60">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                {isAnalyzing ? 'Analyzing...' : 'Ready for Analysis'}
              </span>
            </div>

            {/* Image Specimen Preview Deck / Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="relative group rounded-xl overflow-hidden bg-surface-soft border border-hairline aspect-video flex flex-col justify-end cursor-pointer"
            >
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                alt="Workspace preview specimen" 
                src={previewUrl} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="relative z-10 p-3.5 flex items-center justify-between text-on-primary">
                <div className="min-w-0 pr-2">
                  <p className="font-title-sm text-xs font-semibold truncate text-white">
                    {analysisResult.fileName}
                  </p>
                  <p className="font-caption text-[11px] text-hairline-soft">
                    {analysisResult.resolution}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-caption text-[11px] transition-colors"
                  >
                    Replace
                  </button>
                  <button 
                    type="button"
                    onClick={handleReset}
                    title="Reset to sample specimen" 
                    className="p-1 rounded-lg bg-white/20 hover:bg-error/80 backdrop-blur-sm text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Detection Parameters */}
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <div className="flex items-center justify-between">
                <label htmlFor="conf-slider" className="font-title-sm text-body-strong text-xs">
                  Confidence Threshold
                </label>
                <span className="font-title-sm text-xs px-2 py-0.5 rounded bg-surface-card text-body-strong font-mono border border-hairline/60">
                  {confidenceThreshold.toFixed(2)}
                </span>
              </div>
              <input 
                id="conf-slider"
                type="range"
                min="0.10"
                max="0.90"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-surface-soft rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between text-muted-soft font-caption text-[11px]">
                <span>0.10 (High Recall)</span>
                <span>Balanced</span>
                <span>0.90 (High Precision)</span>
              </div>
            </div>

            {/* Secondary Parameters: Filter Toggles */}
            <div className="pt-space-xs flex flex-col gap-2">
              <span className="font-title-sm text-body-strong text-xs">Monitored Classes</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-soft cursor-pointer hover:bg-surface-card transition-colors border border-hairline/40">
                  <input 
                    type="checkbox"
                    checked={monitoredClasses.car}
                    onChange={(e) => setMonitoredClasses(prev => ({ ...prev, car: e.target.checked }))}
                    className="w-4 h-4 rounded border-hairline accent-primary" 
                  />
                  <span className="font-body-sm text-xs text-body-strong">Light Vehicles (Cars)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-soft cursor-pointer hover:bg-surface-card transition-colors border border-hairline/40">
                  <input 
                    type="checkbox"
                    checked={monitoredClasses.bus}
                    onChange={(e) => setMonitoredClasses(prev => ({ ...prev, bus: e.target.checked }))}
                    className="w-4 h-4 rounded border-hairline accent-primary" 
                  />
                  <span className="font-body-sm text-xs text-body-strong">Transit Buses</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-soft cursor-pointer hover:bg-surface-card transition-colors border border-hairline/40">
                  <input 
                    type="checkbox"
                    checked={monitoredClasses.truck}
                    onChange={(e) => setMonitoredClasses(prev => ({ ...prev, truck: e.target.checked }))}
                    className="w-4 h-4 rounded border-hairline accent-primary" 
                  />
                  <span className="font-body-sm text-xs text-body-strong">Heavy Freight (Trucks)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-soft cursor-pointer hover:bg-surface-card transition-colors border border-hairline/40">
                  <input 
                    type="checkbox"
                    checked={monitoredClasses.motorcycle && monitoredClasses.bicycle}
                    onChange={(e) => setMonitoredClasses(prev => ({ ...prev, motorcycle: e.target.checked, bicycle: e.target.checked }))}
                    className="w-4 h-4 rounded border-hairline accent-primary" 
                  />
                  <span className="font-body-sm text-xs text-body-strong">Vulnerable (Bikes/Moto)</span>
                </label>
              </div>
            </div>

            {/* Primary Trigger Action */}
            <div className="pt-space-sm">
              <button 
                type="button"
                id="run-analysis-btn"
                disabled={isAnalyzing}
                onClick={() => {
                  if (currentFile) {
                    runAnalysis(currentFile);
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className="w-full bg-primary hover:bg-primary-active active:scale-[0.99] text-on-primary font-button text-base py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                    <span>Processing Specimen...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">
                      {currentFile ? 'smart_toy' : 'add_photo_alternate'}
                    </span>
                    <span>{currentFile ? 'Re-Analyze Image' : 'Select Image to Analyze'}</span>
                  </>
                )}
              </button>
              <p className="text-center font-caption text-[11px] text-muted-soft mt-2">
                Local GPU/CPU inference · Ultralytics YOLOv8
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Annotated Frame (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Frame Surface Container */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-hairline flex flex-col gap-3 shadow-sm">
              {/* Viewport Header Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-body-strong">Detection Viewport</span>
                  <span className="text-muted-soft font-caption text-xs">
                    {analysisResult.isCustom ? `Feed: ${analysisResult.fileName}` : 'Camera Feed: CAM-402 (North Deck)'}
                  </span>
                </div>
                {/* Segmented Mode Switcher */}
                <div className="inline-flex p-1 rounded-xl bg-surface-card border border-hairline text-xs font-nav-link">
                  <button 
                    type="button"
                    onClick={() => setShowOverlay(false)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      !showOverlay 
                        ? 'bg-surface-container-lowest text-body-strong font-semibold shadow-xs' 
                        : 'text-muted hover:text-body-strong'
                    }`}
                  >
                    Original View
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowOverlay(true)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      showOverlay 
                        ? 'bg-surface-container-lowest text-body-strong font-semibold shadow-xs' 
                        : 'text-muted hover:text-body-strong'
                    }`}
                  >
                    Detection Overlay (Active)
                  </button>
                </div>
              </div>

              {/* The Visual Stage with Dynamic Bounding Boxes */}
              <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden bg-surface-dark select-none border border-hairline flex items-center justify-center p-0">
                <div 
                  className="relative max-w-full max-h-full flex items-center justify-center"
                  style={{
                    aspectRatio: imageDimensions.width && imageDimensions.height 
                      ? `${imageDimensions.width} / ${imageDimensions.height}` 
                      : '16 / 9'
                  }}
                >
                  {/* Clean original or uploaded image */}
                  <img 
                    alt="Analyzed intersection" 
                    src={stageImageUrl} 
                    onLoad={(e) => {
                      if (e.target.naturalWidth && e.target.naturalHeight) {
                        setImageDimensions({ width: e.target.naturalWidth, height: e.target.naturalHeight });
                      }
                    }}
                    className="w-full h-full max-h-[520px] object-contain block mx-auto" 
                  />

                  {/* Overlaid dynamic bounding box layer */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
                      showOverlay ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {visibleDetections.map((det, idx) => (
                      <div 
                        key={idx}
                        className="absolute rounded-md pointer-events-auto group transition-all"
                        style={{
                          top: det.top,
                          left: det.left,
                          width: det.width,
                          height: det.height,
                          border: `2px solid ${det.color}`,
                          backgroundColor: `${det.color}25`,
                        }}
                      >
                        <span 
                          className="absolute -top-5 left-0 px-1.5 py-0.2 text-white font-caption-uppercase text-[9px] rounded font-semibold whitespace-nowrap shadow-sm"
                          style={{ backgroundColor: det.color }}
                        >
                          {det.class_name.toUpperCase()} · {(det.confidence).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Inset Telemetry Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg bg-surface-dark/80 backdrop-blur-md text-white font-mono text-[11px] pointer-events-none border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${visibleDetections.length > 0 ? 'bg-success' : 'bg-warning'}`}></span>
                        {visibleDetections.length > 0 ? 'DETECTION ACTIVE' : 'NO TARGETS IN FILTER'}
                      </span>
                      <span className="text-hairline/60">ACTIVE: {visibleDetections.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-hairline/80">
                      <span>CONF &ge; {confidenceThreshold.toFixed(2)}</span>
                      <span>ZONE: S-04</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Coding Legend Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1 text-xs">
                <span className="font-caption text-muted font-medium">Annotated Classes:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 font-caption transition-opacity ${monitoredClasses.car ? 'opacity-100' : 'opacity-40 line-through text-muted'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-teal"></span>
                    Cars ({carCount})
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-caption transition-opacity ${monitoredClasses.bus ? 'opacity-100' : 'opacity-40 line-through text-muted'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-pink"></span>
                    Buses ({busCount})
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-caption transition-opacity ${monitoredClasses.truck ? 'opacity-100' : 'opacity-40 line-through text-muted'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-ochre"></span>
                    Trucks ({truckCount})
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-caption transition-opacity ${monitoredClasses.motorcycle ? 'opacity-100' : 'opacity-40 line-through text-muted'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-lavender"></span>
                    Motorcycles ({motoCount})
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-caption transition-opacity ${monitoredClasses.bicycle ? 'opacity-100' : 'opacity-40 line-through text-muted'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-peach"></span>
                    Bicycles ({bikeCount})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Metrics Dashboard Deck */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-title-lg text-body-strong tracking-tight">Detection Telemetry &amp; Analysis</h2>
            <span className="font-caption text-caption text-muted">Analysis ID: #TM-89402-B</span>
          </div>

          {/* 3 Key Metric Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Tile 1: Total Vehicles Detected */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-hairline flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-caption-uppercase text-caption-uppercase text-muted tracking-wider block mb-1 text-[11px]">Total Monitored Units</span>
                  <h3 className="font-title-md text-title-md text-body-strong">Vehicles Detected</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-soft flex items-center justify-center text-body-strong border border-hairline/60">
                  <span className="material-symbols-outlined text-[22px]">directions_car</span>
                </div>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-body-strong leading-none">{totalCount}</span>
                <span className="font-body-md text-body-md text-muted">active targets</span>
              </div>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs text-muted">
                <span>{[carCount, busCount, truckCount, motoCount, bikeCount].filter(c => c > 0).length} Detected Classes</span>
                <span className="font-medium text-body-strong">{activeAvgConf} avg confidence</span>
              </div>
            </div>

            {/* Tile 2: Prototype Congestion Score */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-hairline flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-caption-uppercase text-caption-uppercase text-muted tracking-wider block mb-1 text-[11px]">Calculated Index</span>
                  <h3 className="font-title-md text-title-md text-body-strong">Congestion Score</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-caption font-semibold flex items-center gap-1 border ${
                  activeCongestionScore >= 68
                    ? 'bg-brand-coral/20 text-brand-coral border-brand-coral/40'
                    : activeCongestionScore >= 35
                    ? 'bg-brand-ochre/20 text-body-strong border-brand-ochre/40'
                    : 'bg-brand-mint/20 text-body-strong border-brand-mint/40'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeCongestionScore >= 68
                      ? 'bg-brand-coral'
                      : activeCongestionScore >= 35
                      ? 'bg-brand-ochre'
                      : 'bg-brand-mint'
                  }`}></span>
                  {activeCongestionLevel}
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-body-strong leading-none">
                  {activeCongestionScore}
                </span>
                <span className="font-body-md text-body-md text-muted">/ 100</span>
              </div>
              {/* Subtle score bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-surface-soft h-2 rounded-full overflow-hidden border border-hairline/60">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeCongestionScore >= 68
                        ? 'bg-brand-coral'
                        : activeCongestionScore >= 35
                        ? 'bg-brand-ochre'
                        : 'bg-brand-mint'
                    }`} 
                    style={{ width: `${Math.min(100, Math.max(4, activeCongestionScore))}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-caption text-muted">
                  <span>Optimal (0-35)</span>
                  <span>Critical (70-100)</span>
                </div>
              </div>
            </div>

            {/* Tile 3: Congestion Level Classification */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-hairline flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-caption-uppercase text-caption-uppercase text-muted tracking-wider block mb-1 text-[11px]">State Evaluation</span>
                  <h3 className="font-title-md text-title-md text-body-strong">Corridor Status</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-card flex items-center justify-center text-body-strong border border-hairline/60">
                  <span className="material-symbols-outlined text-[22px]">traffic</span>
                </div>
              </div>
              <div className="my-4">
                <div className="font-display-sm text-display-sm text-body-strong leading-tight">
                  {activeCongestionLevel}
                </div>
                <p className="font-body-sm text-xs text-muted mt-1">
                  {activeCongestionScore >= 68
                    ? 'Queuing extends across primary ingress approach lanes'
                    : activeCongestionScore >= 35
                    ? 'Corridor queuing is moderate with periodic queue accumulation'
                    : totalCount === 0
                    ? 'Zero targets visible with current filters'
                    : 'Corridor flow is smooth and within balanced capacity'}
                </p>
              </div>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs">
                <span className="text-muted">Throughput Drag:</span>
                <span className={`font-semibold ${
                  activeCongestionScore >= 68
                    ? 'text-brand-coral'
                    : activeCongestionScore >= 35
                    ? 'text-brand-ochre'
                    : 'text-success'
                }`}>
                  {activeCongestionScore >= 68 ? '+4.2 min est. delay' : activeCongestionScore >= 35 ? '+1.5 min est. delay' : 'Nominal flow (zero delay)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Breakdowns: Class Counts Grid & Advisory Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Breakdown Grid: 5 Columns */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 border border-hairline flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <h4 className="font-title-sm text-title-sm text-body-strong">Vehicle Classification Mix</h4>
                <span className="font-caption text-xs text-muted">Unit Count</span>
              </div>
              <div className="divide-y divide-hairline">
                {/* Row 1: Cars */}
                <div className={`py-3 flex items-center justify-between transition-opacity ${monitoredClasses.car ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-brand-teal"></span>
                    <span className="font-body-md text-body-md text-body-strong font-medium">Passenger Cars</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-strong font-semibold text-sm">{carCount}</span>
                    <span className="font-caption text-[11px] text-muted w-10 text-right">
                      {totalCount > 0 ? ((carCount / totalCount) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>

                {/* Row 2: Buses */}
                <div className={`py-3 flex items-center justify-between transition-opacity ${monitoredClasses.bus ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-brand-pink"></span>
                    <span className="font-body-md text-body-md text-body-strong font-medium">Transit Buses</span>
                    {busCount > 0 && (
                      <span className="px-1.5 py-0.2 bg-brand-pink/15 text-brand-pink rounded text-[10px] font-semibold">Priority</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-strong font-semibold text-sm">{busCount}</span>
                    <span className="font-caption text-[11px] text-muted w-10 text-right">
                      {totalCount > 0 ? ((busCount / totalCount) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>

                {/* Row 3: Trucks */}
                <div className={`py-3 flex items-center justify-between transition-opacity ${monitoredClasses.truck ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-brand-ochre"></span>
                    <span className="font-body-md text-body-md text-body-strong font-medium">Commercial Trucks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-strong font-semibold text-sm">{truckCount}</span>
                    <span className="font-caption text-[11px] text-muted w-10 text-right">
                      {totalCount > 0 ? ((truckCount / totalCount) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>

                {/* Row 4: Motorcycles */}
                <div className={`py-3 flex items-center justify-between transition-opacity ${monitoredClasses.motorcycle ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-brand-lavender"></span>
                    <span className="font-body-md text-body-md text-body-strong font-medium">Motorcycles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-strong font-semibold text-sm">{motoCount}</span>
                    <span className="font-caption text-[11px] text-muted w-10 text-right">
                      {totalCount > 0 ? ((motoCount / totalCount) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>

                {/* Row 5: Bicycles */}
                <div className={`py-3 flex items-center justify-between transition-opacity ${monitoredClasses.bicycle ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-brand-peach"></span>
                    <span className="font-body-md text-body-md text-body-strong font-medium">Bicycles / Micro-mobility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-strong font-semibold text-sm">{bikeCount}</span>
                    <span className="font-caption text-[11px] text-muted w-10 text-right">
                      {totalCount > 0 ? ((bikeCount / totalCount) * 100).toFixed(1) : '0.0'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline bg-surface-soft/60 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs text-muted">
              <span>Total Density Footprint:</span>
              <span className="font-semibold text-body-strong">
                {Math.round(carCount * 1.0 + busCount * 3.2 + truckCount * 2.5 + (motoCount + bikeCount) * 0.5)} Passenger Car Units (PCU)
              </span>
            </div>
          </div>

          {/* Simulation Advisory Panel: 7 Columns */}
          <div className="lg:col-span-7 bg-surface-card rounded-2xl p-6 sm:p-7 border border-hairline flex flex-col justify-between shadow-sm relative">
            <div className="flex flex-col gap-space-md">
              {/* Advisory Header */}
              <div className="flex items-center justify-between pb-space-sm border-b border-hairline/80">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl">alt_route</span>
                  <h3 className="font-title-md text-title-md text-body-strong">Signal Priority Recommendation</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-caption-uppercase text-[11px] font-semibold tracking-wider">
                  SIMULATION ADVISORY
                </span>
              </div>

              {/* Dynamic Recommendation Banner */}
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-caption-uppercase text-[11px] text-muted tracking-wider uppercase font-semibold">Suggested Action</span>
                  <p className="font-title-lg text-title-lg text-body-strong">
                    {activeSignalPriority}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <div className="px-3 py-2 rounded-lg bg-surface-soft text-center border border-hairline/60">
                    <span className="block text-[10px] text-muted uppercase">Base Split</span>
                    <span className="font-title-sm text-sm font-bold text-body-strong">{activeBaseSplit}</span>
                  </div>
                  <span className="material-symbols-outlined text-muted text-sm">arrow_forward</span>
                  <div className="px-3 py-2 rounded-lg bg-brand-ochre/20 text-center border border-brand-ochre/30">
                    <span className="block text-[10px] text-body-strong font-semibold uppercase">Proposed</span>
                    <span className="font-title-sm text-sm font-bold text-body-strong">{activeProposedSplit}</span>
                  </div>
                </div>
              </div>

              {/* Algorithmic Rationale */}
              <div className="flex flex-col gap-2">
                <span className="font-title-sm text-xs font-semibold text-body-strong uppercase tracking-wider">Decision Logic &amp; Rationale</span>
                <p className="font-body-md text-body-md text-body leading-relaxed">
                  {activeExplanation}
                </p>
              </div>

              {/* Safety / Compliance Disclaimer */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-soft border border-hairline text-muted">
                <span className="material-symbols-outlined text-base text-body-strong shrink-0 mt-0.5">info</span>
                <p className="font-caption text-caption">
                  <strong>Notice:</strong> Simulation advisory only. TrafficMind AI prototype operates in an analytical sandbox and is not connected to physical municipal traffic signal hardware or safety-critical controllers.
                </p>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="pt-6 border-t border-hairline/80 flex flex-wrap items-center justify-between gap-space-md mt-6">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Simulated Cycle ID: SIM-998-ALPHA
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg border border-hairline bg-surface hover:bg-surface-soft text-body-strong font-button text-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  Reset Analysis
                </button>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-active text-on-primary font-button text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                  Analyze Another Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
