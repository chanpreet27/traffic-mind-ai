import { useRef, useState, useEffect } from 'react'
import './ImageUpload.css'

function ImageUpload({
  onImageSelect,
  selectedFile,
  previewUrl,
  onAnalyze,
  onReset,
  isAnalyzing,
  hasImage,
}) {
  const fileInputRef = useRef(null)
  const [dimensions, setDimensions] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  // Reset dimensions when previewUrl changes
  useEffect(() => {
    if (!previewUrl) {
      setDimensions(null)
    }
  }, [previewUrl])

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target
    setDimensions({ width: naturalWidth, height: naturalHeight })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImageSelect(file)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="tm-upload-workspace" aria-label="Traffic image upload workspace">
      {!previewUrl ? (
        /* Empty State */
        <div
          className={`tm-drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          aria-label="Upload traffic image by dragging or clicking to browse"
        >
          <div className="tm-drop-content">
            <div className="tm-upload-icon-wrap" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className="tm-upload-heading">Upload traffic image</h3>
            <p className="tm-upload-desc">
              Select a traffic image to begin vehicle detection and congestion analysis.
            </p>
            <div className="tm-upload-actions">
              <button
                type="button"
                className="tm-btn-choose"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                Choose image
              </button>
            </div>
            <p className="tm-upload-hint">Supported formats: JPEG, PNG, WEBP · Max 20MB</p>
          </div>
        </div>
      ) : (
        /* Uploaded Preview State */
        <div className="tm-preview-card">
          {/* Metadata bar */}
          <div className="tm-preview-header">
            <div className="tm-file-info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="tm-file-name" title={selectedFile?.name}>
                {selectedFile?.name || 'Selected Traffic Image'}
              </span>
              {selectedFile?.size && (
                <span className="tm-file-meta-pill">{formatFileSize(selectedFile.size)}</span>
              )}
              {dimensions && (
                <span className="tm-file-meta-pill">{dimensions.width} × {dimensions.height} px</span>
              )}
            </div>

            <div className="tm-preview-top-actions">
              <button
                type="button"
                className="tm-btn-subtle"
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                aria-label="Replace with another image"
              >
                Replace
              </button>
              <button
                type="button"
                className="tm-btn-subtle destructive"
                onClick={onReset}
                disabled={isAnalyzing}
                aria-label="Remove uploaded image"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Centered Preview Display */}
          <div className="tm-preview-viewport">
            <img
              src={previewUrl}
              alt="Uploaded traffic scene"
              className="tm-preview-img"
              onLoad={handleImageLoad}
            />
            {isAnalyzing && (
              <div className="tm-analyzing-overlay" role="status" aria-live="polite">
                <div className="tm-analyzing-spinner" aria-hidden="true"></div>
                <div className="tm-analyzing-text">Analyzing image…</div>
                <div className="tm-analyzing-sub">Running YOLOv8 inference & congestion heuristics</div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="tm-preview-footer">
            <button
              type="button"
              className="tm-btn-primary"
              onClick={onAnalyze}
              disabled={isAnalyzing || !hasImage}
              aria-label="Run vehicle detection and congestion analysis"
            >
              {isAnalyzing ? (
                <>
                  <span className="tm-inline-spinner" aria-hidden="true"></span>
                  <span>Analyzing image…</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </div>
  )
}

export default ImageUpload
