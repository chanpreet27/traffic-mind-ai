import ImageUpload from './ImageUpload'
import AnalysisResults from './AnalysisResults'
import './DashboardView.css'

export default function DashboardView({
  onNavigate,
  selectedFile,
  selectedImage,
  previewUrl,
  analysisResult,
  isAnalyzing,
  error,
  onImageSelect,
  onAnalyze,
  onReset,
}) {
  const activeFile = selectedFile || selectedImage

  return (
    <div className="tm-dashboard-workspace" role="main">
      <div className="tm-dashboard-inner">
        {/* Navigation Breadcrumb & Context */}
        <div className="tm-workspace-topbar">
          <button
            type="button"
            className="tm-btn-breadcrumb"
            onClick={() => onNavigate('/')}
            aria-label="Return to overview page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Overview</span>
          </button>

          <div className="tm-workspace-context-pill">
            <span className="context-dot"></span>
            <span>IMAGE-BASED ANALYSIS · PROTOTYPE</span>
          </div>
        </div>

        {/* Compact Page Heading (Section 8) */}
        <header className="tm-page-heading">
          <div className="tm-heading-row">
            <h1 className="tm-page-title">Traffic Analysis</h1>
            <span className="tm-prototype-status-chip">Prototype</span>
          </div>
          <p className="tm-page-subtitle">
            Upload a traffic image to detect vehicles and estimate congestion using computer vision.
          </p>
        </header>

        {/* Error Notification Banner */}
        {error && (
          <div className="tm-workspace-error-banner" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="tm-error-details">
              <strong>Unable to analyze image:</strong> {error}
            </div>
            <button
              type="button"
              className="tm-btn-retry"
              onClick={onAnalyze}
              disabled={isAnalyzing}
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Operational Workflow Layout */}
        <div className="tm-workspace-stack">
          {/* Section 1: Image Upload Workspace */}
          <div className="tm-workspace-card upload-module">
            <ImageUpload
              onImageSelect={onImageSelect}
              selectedFile={activeFile}
              previewUrl={previewUrl}
              onAnalyze={onAnalyze}
              onReset={onReset}
              isAnalyzing={isAnalyzing}
              hasImage={!!activeFile}
            />
          </div>

          {/* Section 2: Analysis Results (Rendered upon successful inference) */}
          {analysisResult && (
            <div className="tm-workspace-card results-module">
              <AnalysisResults
                result={analysisResult}
                detectionImage={analysisResult.detection_image}
                originalImageUrl={previewUrl}
              />
            </div>
          )}
        </div>

        {/* Honest Prototype Notice & Limitations Disclaimer (Section 10 & 14) */}
        <footer className="tm-workspace-footer-notice" role="contentinfo">
          <div className="tm-notice-badge">Prototype Disclaimer</div>
          <p className="tm-notice-text">
            TrafficMind AI is an educational image-based traffic analysis prototype. It is not connected
            to real-world traffic sensors, does not control municipal traffic signals, and uses heuristic
            rules rather than validated real-world traffic engineering models. All data is generated
            strictly from the uploaded static frame.
          </p>
        </footer>
      </div>
    </div>
  )
}
