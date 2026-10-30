import { useState, useRef } from 'react'
import './AnalysisResults.css'

function VehicleIcon({ type, className = '' }) {
  switch (type.toLowerCase()) {
    case 'car':
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.5l2-3h7l2 3H19a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M19 17a2 2 0 1 0 4 0" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    case 'truck':
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'bus':
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16M4 6h16M7 15h.01M17 15h.01M6 19v2M18 19v2" />
        </svg>
      )
    case 'motorcycle':
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="5" cy="16" r="3" />
          <circle cx="19" cy="16" r="3" />
          <path d="M12 16h4l2-6H9l-2 3M14 7h3" />
        </svg>
      )
    case 'bicycle':
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 6H5m7 11.5l3.5-6h4" />
        </svg>
      )
    default:
      return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
  }
}

function AnalysisResults({ result, detectionImage, originalImageUrl }) {
  const {
    vehicle_counts = {},
    total_vehicles = 0,
    congestion_score = 0,
    congestion_level = 'Low',
    signal_priority = '',
    explanation = '',
    analysis_mode = 'yolo_v8_nano',
    detections = [],
    image_dimensions = null,
  } = result

  // Visualization state
  const [viewMode, setViewMode] = useState('annotated') // 'annotated' | 'original'
  const [showBoxes, setShowBoxes] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [hoveredClass, setHoveredClass] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Color mapping by class
  const classColors = {
    car: 'var(--color-class-car)',
    truck: 'var(--color-class-truck)',
    bus: 'var(--color-class-bus)',
    motorcycle: 'var(--color-class-motorcycle)',
    bicycle: 'var(--color-class-bicycle)',
  }

  const getCongestionBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'status-low'
      case 'moderate':
      case 'medium': return 'status-moderate'
      case 'high': return 'status-high'
      default: return 'status-default'
    }
  }

  // Filter detections if hovered class is active
  const filteredDetections = hoveredClass
    ? detections.filter((d) => d.class.toLowerCase() === hoveredClass.toLowerCase())
    : detections

  return (
    <section className="tm-results-workspace" aria-label="Analysis Results">
      {/* ====================================================================
          1. Primary Summary KPI Row
          ==================================================================== */}
      <div className="tm-summary-grid">
        {/* KPI 1: Vehicles Detected */}
        <div className="tm-kpi-card">
          <div className="tm-kpi-header">
            <span className="tm-kpi-label">Vehicles Detected</span>
            <span className="tm-kpi-badge">YOLOv8</span>
          </div>
          <div className="tm-kpi-value-row">
            <span className="tm-kpi-main-val">{total_vehicles}</span>
            <span className="tm-kpi-unit">units</span>
          </div>
          <p className="tm-kpi-sub">
            {total_vehicles === 0
              ? 'No supported vehicle classes detected in scene.'
              : `Classified across ${Object.values(vehicle_counts).filter(c => c > 0).length} active category types.`}
          </p>
        </div>

        {/* KPI 2: Prototype Congestion Index */}
        <div className="tm-kpi-card">
          <div className="tm-kpi-header">
            <span className="tm-kpi-label">Congestion Index</span>
            <span className={`tm-level-tag ${getCongestionBadgeClass(congestion_level)}`}>
              {congestion_level}
            </span>
          </div>
          <div className="tm-kpi-value-row">
            <span className="tm-kpi-main-val">{congestion_score}</span>
            <span className="tm-kpi-unit">/ 100</span>
          </div>
          <div className="tm-kpi-progress-track">
            <div
              className={`tm-kpi-progress-bar ${getCongestionBadgeClass(congestion_level)}`}
              style={{ width: `${Math.min(100, Math.max(0, congestion_score))}%` }}
              role="progressbar"
              aria-valuenow={congestion_score}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <p className="tm-kpi-sub">Estimated from detected vehicles using prototype rules.</p>
        </div>

        {/* KPI 3: Analysis Status */}
        <div className="tm-kpi-card">
          <div className="tm-kpi-header">
            <span className="tm-kpi-label">Analysis Status</span>
            <span className="tm-status-indicator-tag">
              <span className="indicator-dot"></span> Verified
            </span>
          </div>
          <div className="tm-kpi-value-row">
            <span className="tm-kpi-main-val" style={{ fontSize: '20px' }}>Inference Complete</span>
          </div>
          <div className="tm-status-meta-list">
            <div className="tm-status-row">
              <span className="tm-meta-k">Engine:</span>
              <span className="tm-meta-v">Ultralytics YOLOv8n</span>
            </div>
            <div className="tm-status-row">
              <span className="tm-meta-k">Weights:</span>
              <span className="tm-meta-v">COCO Pretrained (80 cls)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. Vehicle Classification Breakdown
          ==================================================================== */}
      <div className="tm-section-block">
        <div className="tm-block-header">
          <div>
            <h3 className="tm-block-title">Vehicle Classification</h3>
            <p className="tm-block-desc">Categorized counts for standard transportation classes.</p>
          </div>
          <div className="tm-legend-pills" aria-label="Class color legend">
            {Object.keys(classColors).map((cls) => (
              <span
                key={cls}
                className="tm-legend-chip"
                onMouseEnter={() => setHoveredClass(cls)}
                onMouseLeave={() => setHoveredClass(null)}
                style={{ borderColor: hoveredClass === cls ? classColors[cls] : 'transparent' }}
              >
                <span className="chip-dot" style={{ background: classColors[cls] }}></span>
                <span className="chip-name">{cls}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="tm-classes-grid">
          {Object.entries(vehicle_counts).map(([type, count]) => {
            const hasDetections = count > 0
            const isTargeted = hoveredClass === type
            return (
              <div
                key={type}
                className={`tm-class-card ${hasDetections ? 'has-count' : 'is-zero'} ${isTargeted ? 'targeted' : ''}`}
                onMouseEnter={() => setHoveredClass(type)}
                onMouseLeave={() => setHoveredClass(null)}
              >
                <div className="tm-class-icon-cell" style={{ color: classColors[type] || 'inherit' }}>
                  <VehicleIcon type={type} />
                </div>
                <div className="tm-class-info-cell">
                  <span className="tm-class-label">{type}</span>
                  <span className="tm-class-count">{count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ====================================================================
          3. Detection Visualization (Critical Improvement)
          ==================================================================== */}
      <div className="tm-section-block tm-vis-block">
        <div className="tm-block-header vis-header">
          <div>
            <h3 className="tm-block-title">Vehicle Detection</h3>
            <p className="tm-block-desc">
              Visual localization of detected vehicles ({detections.length} bounding boxes).
            </p>
          </div>

          {/* Interactive Controls Toolbar */}
          <div className="tm-vis-toolbar" role="toolbar" aria-label="Detection visualization controls">
            {/* View Mode Toggle */}
            <div className="tm-control-group">
              <button
                type="button"
                className={`tm-control-btn ${viewMode === 'annotated' ? 'active' : ''}`}
                onClick={() => setViewMode('annotated')}
                title="View annotated image with server-rendered bounding boxes"
              >
                Annotated View
              </button>
              {originalImageUrl && (
                <button
                  type="button"
                  className={`tm-control-btn ${viewMode === 'original' ? 'active' : ''}`}
                  onClick={() => setViewMode('original')}
                  title="View original uploaded image"
                >
                  Original Image
                </button>
              )}
            </div>

            {/* SVG Overlay Toggles (when in original image view or interactive overlay mode) */}
            {viewMode === 'original' && detections.length > 0 && (
              <div className="tm-control-group">
                <button
                  type="button"
                  className={`tm-control-btn ${showBoxes ? 'active' : ''}`}
                  onClick={() => setShowBoxes(!showBoxes)}
                  title="Toggle bounding box outlines"
                >
                  Boxes: {showBoxes ? 'On' : 'Off'}
                </button>
                <button
                  type="button"
                  className={`tm-control-btn ${showLabels ? 'active' : ''}`}
                  onClick={() => setShowLabels(!showLabels)}
                  title="Toggle classification labels"
                >
                  Labels: {showLabels ? 'On' : 'Off'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visualization Viewport Container */}
        <div className={`tm-detection-viewport ${isFullscreen ? 'fullscreen' : ''}`}>
          {viewMode === 'annotated' ? (
            /* Server-Rendered Clean Annotated Image */
            <div className="tm-image-container">
              <img
                src={detectionImage || originalImageUrl}
                alt="Traffic scene with vehicle detection overlays"
                className="tm-detection-img"
              />
            </div>
          ) : (
            /* Original Image with Scaled SVG Bounding Box Layer */
            <div className="tm-svg-overlay-container">
              <img
                src={originalImageUrl}
                alt="Original uploaded traffic scene"
                className="tm-detection-img"
              />
              {showBoxes && image_dimensions && (
                <svg
                  className="tm-svg-detection-layer"
                  viewBox={`0 0 ${image_dimensions.width} ${image_dimensions.height}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {filteredDetections.map((d, idx) => {
                    const [x1, y1, x2, y2] = d.bbox
                    const width = x2 - x1
                    const height = y2 - y1
                    const strokeColor = classColors[d.class] || '#27B7D8'
                    return (
                      <g key={idx} className="tm-svg-box-group">
                        <rect
                          x={x1}
                          y={y1}
                          width={width}
                          height={height}
                          fill="rgba(0, 0, 0, 0.05)"
                          stroke={strokeColor}
                          strokeWidth="2"
                          rx="2"
                        />
                        {showLabels && (
                          <g className="tm-svg-label-group">
                            <rect
                              x={x1}
                              y={Math.max(0, y1 - 20)}
                              width={d.class.length * 8 + 44}
                              height="18"
                              fill="#0B1118"
                              stroke={strokeColor}
                              strokeWidth="1"
                              rx="2"
                            />
                            <text
                              x={x1 + 4}
                              y={Math.max(14, y1 - 6)}
                              fill="#F2F5F8"
                              fontSize="11"
                              fontFamily="sans-serif"
                              fontWeight="600"
                            >
                              {d.class} · {d.confidence.toFixed(2)}
                            </text>
                          </g>
                        )}
                      </g>
                    )
                  })}
                </svg>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================
          4. Congestion Analysis & Signal Priority Assessment
          ==================================================================== */}
      <div className="tm-analysis-two-col">
        {/* Congestion Assessment */}
        <div className="tm-section-block">
          <div className="tm-block-header">
            <div>
              <h3 className="tm-block-title">Congestion Analysis</h3>
              <p className="tm-block-desc">Heuristic density estimation and scene evaluation.</p>
            </div>
          </div>

          <div className="tm-analysis-card-body">
            <div className="tm-eval-row">
              <span className="tm-eval-label">Congestion Index:</span>
              <span className="tm-eval-value">{congestion_score} / 100</span>
            </div>
            <div className="tm-eval-row">
              <span className="tm-eval-label">Assessed Level:</span>
              <span className={`tm-level-tag ${getCongestionBadgeClass(congestion_level)}`}>
                {congestion_level}
              </span>
            </div>

            <div className="tm-explanation-box">
              <span className="tm-explanation-tag">Analysis Summary</span>
              <p className="tm-explanation-text">{explanation}</p>
            </div>

            <p className="tm-methodology-note">
              <strong>Methodology note:</strong> The prototype congestion index is calculated heuristically
              as 5 index points per detected vehicle (capped at 100). This formula is an uncalibrated
              prototype model and does not measure true queue length, speed, or road surface geometry.
            </p>
          </div>
        </div>

        {/* Signal Priority Assessment */}
        <div className="tm-section-block">
          <div className="tm-block-header">
            <div>
              <h3 className="tm-block-title">Signal Priority Assessment</h3>
              <p className="tm-block-desc">Adaptive phase recommendation based on detected volume.</p>
            </div>
          </div>

          <div className="tm-analysis-card-body">
            <div className="tm-recommendation-box">
              <div className="tm-rec-top">
                <span className="tm-rec-badge">Prototype Recommendation</span>
                <span className={`tm-level-tag ${getCongestionBadgeClass(congestion_level)}`}>
                  {congestion_level} Priority
                </span>
              </div>
              <h4 className="tm-rec-headline">{signal_priority}</h4>
              <p className="tm-rec-detail">
                Review priority timing for this approach. Based on {total_vehicles} detected vehicle(s),
                the prototype index is evaluated at {congestion_score}/100.
              </p>
            </div>

            <div className="tm-disclaimer-notice">
              <div className="tm-disclaimer-title">Operational Notice</div>
              <p className="tm-disclaimer-text">
                This assessment is an automated heuristic simulation. It is not connected to municipal
                traffic signal controllers, does not measure queue wait times, and must not be used
                for real-world traffic actuation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalysisResults
