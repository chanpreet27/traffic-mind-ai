import base64
from datetime import datetime, timezone
from pathlib import Path
import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO

app = FastAPI(
    title="TrafficMind AI & NORVA Portal",
    description="Traffic intelligence analysis with YOLOv8 and NORVA Night-City Hero on port 8081",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
NORVA_FILE = BASE_DIR / "norva.html"
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"

# COCO dataset vehicle class IDs
VEHICLE_CLASSES = {
    2: "car",
    3: "motorcycle",
    5: "bus",
    7: "truck",
    1: "bicycle",
}

# Initialize YOLOv8 nano model
try:
    model = YOLO("yolov8n.pt")
except Exception as e:
    model = None
    print(f"Warning: YOLO model could not be initialized at startup: {e}")


@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "model_loaded": model is not None,
    }


@app.post("/api/analyze")
async def analyze_traffic(file: UploadFile = File(...)):
    global model
    if model is None:
        try:
            model = YOLO("yolov8n.pt")
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to load YOLOv8 model: {str(e)}",
            )

    # Read uploaded image bytes
    try:
        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if image is None:
            raise HTTPException(
                status_code=400,
                detail="Unable to decode image. Please provide a valid JPEG or PNG file.",
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading image file: {str(e)}",
        )

    # Perform YOLOv8 inference with full recall down to 0.10 so the slider can filter smoothly
    try:
        # Run inference filtering for the specific vehicle classes
        results = model(image, classes=list(VEHICLE_CLASSES.keys()), conf=0.10, verbose=False)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"YOLO inference failed: {str(e)}",
        )

    # Class color mapping for clean visualization (BGR format for OpenCV)
    # Bus: Brand Pink #FF4D8B, Car: Brand Teal #1A3A3A / #1E7E7E, Truck: Brand Ochre #E8B94A, Motorcycle: Lavender #B8A4ED, Bicycle: Peach #FFB084
    CLASS_COLORS = {
        "car": (120, 120, 26),
        "truck": (74, 185, 232),
        "bus": (139, 77, 255),
        "motorcycle": (237, 164, 184),
        "bicycle": (132, 176, 255),
    }

    # Copy image to draw annotations
    annotated_img = image.copy()
    img_h, img_w = image.shape[:2]

    # Initialize vehicle counts and detections list
    vehicle_counts = {name: 0 for name in VEHICLE_CLASSES.values()}
    detections = []

    boxes = results[0].boxes if len(results) > 0 and results[0].boxes is not None else []

    for box in boxes:
        cls_id = int(box.cls[0].item())
        if cls_id in VEHICLE_CLASSES:
            cls_name = VEHICLE_CLASSES[cls_id]
            vehicle_counts[cls_name] += 1

            # Coordinates
            coords = box.xyxy[0].tolist()
            x1, y1, x2, y2 = map(int, coords)
            confidence = float(box.conf[0].item())

            color = CLASS_COLORS.get(cls_name, (74, 185, 232))

            detections.append({
                "class": cls_name,
                "class_name": cls_name,
                "confidence": round(confidence, 3),
                "bbox": [x1, y1, x2, y2],
                "box": [x1, y1, x2, y2],
                "normalized_bbox": [
                    round(x1 / img_w, 4),
                    round(y1 / img_h, 4),
                    round(x2 / img_w, 4),
                    round(y2 / img_h, 4),
                ],
            })

            # Draw thin, crisp bounding box (2px)
            cv2.rectangle(annotated_img, (x1, y1), (x2, y2), color, 2)

            # Compact label: "Car 0.88"
            label = f"{cls_name.capitalize()} {confidence:.2f}"
            (text_w, text_h), baseline = cv2.getTextSize(
                label, cv2.FONT_HERSHEY_SIMPLEX, 0.42, 1
            )

            # Position label above box if space permits, otherwise inside
            bg_y1 = max(0, y1 - text_h - 6) if y1 - text_h - 6 > 0 else y1
            bg_y2 = bg_y1 + text_h + 6

            # Dark semi-transparent background for maximum readability without covering vehicles
            cv2.rectangle(
                annotated_img,
                (x1, bg_y1),
                (x1 + text_w + 6, bg_y2),
                (17, 26, 36),
                -1,
            )
            # Subtle accent border on the label tag
            cv2.rectangle(
                annotated_img,
                (x1, bg_y1),
                (x1 + text_w + 6, bg_y2),
                color,
                1,
            )
            # Label text in clean white
            cv2.putText(
                annotated_img,
                label,
                (x1 + 3, bg_y1 + text_h + 2),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.42,
                (242, 245, 248),
                1,
                cv2.LINE_AA,
            )

    total_vehicles = sum(vehicle_counts.values())

    # Weighted congestion estimation matching the specification:
    # Car: 1.0x, Bus: 3.2x, Truck: 2.5x, Motorcycle: 0.5x, Bicycle: 0.5x
    weighted_units = (
        vehicle_counts.get("car", 0) * 1.0 +
        vehicle_counts.get("bus", 0) * 3.2 +
        vehicle_counts.get("truck", 0) * 2.5 +
        vehicle_counts.get("motorcycle", 0) * 0.5 +
        vehicle_counts.get("bicycle", 0) * 0.5
    )

    if total_vehicles == 0:
        congestion_score = 0
        congestion_level = "Low"
        signal_priority = "Normal Timing (Low Priority)"
        explanation = (
            "No vehicles detected in this camera frame. "
            "Traffic corridor is clear; standard signal cycle timing is adequate."
        )
    else:
        # Scale to 0-100 where 20 weighted units represents peak road saturation
        congestion_score = min(100, max(5, int(round((weighted_units / 20.0) * 100))))
        
        if congestion_score < 35:
            congestion_level = "Low"
            signal_priority = "Normal Timing (Low Priority)"
            explanation = (
                f"Light traffic volume detected with {total_vehicles} vehicle(s) ({congestion_score}/100 index). "
                f"Traffic flow is unconstrained; standard baseline split is adequate for this approach."
            )
        elif congestion_score < 68:
            congestion_level = "Moderate"
            signal_priority = "Adjust Timing (Moderate Priority)"
            explanation = (
                f"Moderate traffic volume detected with {total_vehicles} vehicle(s) ({congestion_score}/100 index). "
                f"Review approach green phase duration to mitigate potential queue accumulation."
            )
        else:
            congestion_level = "High"
            signal_priority = "Prioritize Approach (High Priority)"
            explanation = (
                f"Elevated traffic volume detected with {total_vehicles} vehicle(s) ({congestion_score}/100 index). "
                f"Consider prioritizing approach clearance phase (+15s to +20s green extension) in cycle."
            )

    # Encode annotated image to base64 JPEG
    success, buffer = cv2.imencode(".jpg", annotated_img)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to encode annotated image.")

    b64_image = base64.b64encode(buffer).decode("utf-8")
    detection_image = f"data:image/jpeg;base64,{b64_image}"

    return {
        "vehicle_counts": vehicle_counts,
        "total_vehicles": total_vehicles,
        "congestion_score": congestion_score,
        "congestion_level": congestion_level,
        "signal_priority": signal_priority,
        "explanation": explanation,
        "detection_image": detection_image,
        "detections": detections,
        "image_dimensions": {"width": img_w, "height": img_h},
        "analysis_mode": "yolo_v8_nano",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/dashboard")
@app.get("/how-it-works")
@app.get("/analyze")
async def get_dashboard_page():
    index_file = FRONTEND_DIST / "index.html"
    if index_file.exists():
        return FileResponse(index_file, media_type="text/html")
    raise HTTPException(status_code=404, detail="Frontend dist not found")


@app.get("/norva")
@app.get("/norva.html")
async def get_norva_redirect():
    # Seamlessly serve the merged TrafficMind AI experience
    index_file = FRONTEND_DIST / "index.html"
    if index_file.exists():
        return FileResponse(index_file, media_type="text/html")
    if NORVA_FILE.exists():
        return FileResponse(NORVA_FILE, media_type="text/html")
    raise HTTPException(status_code=404, detail="Index not found")


@app.get("/traffic")
async def get_traffic_page():
    index_file = FRONTEND_DIST / "index.html"
    if index_file.exists():
        return FileResponse(index_file, media_type="text/html")
    raise HTTPException(status_code=404, detail="Frontend dist not found")


@app.get("/trafficmind-logo.png")
async def get_trafficmind_logo():
    logo_path = FRONTEND_DIST / "trafficmind-logo.png"
    if not logo_path.exists():
        logo_path = BASE_DIR / "trafficmind-logo.png"
    if logo_path.exists():
        return FileResponse(logo_path, media_type="image/png")
    raise HTTPException(status_code=404, detail="Logo not found")


# Mount React frontend build directory for static files and SPA root
if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")


