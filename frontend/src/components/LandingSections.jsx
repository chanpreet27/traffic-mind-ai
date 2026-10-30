import './LandingSections.css'

export default function LandingSections({ onNavigate }) {
  return (
    <div className="tm-landing-sections">
      {/* ====================================================================
          Section 1: Intelligent Traffic Analysis (Features)
          ==================================================================== */}
      <section id="features" className="tm-section tm-features-section">
        <div className="tm-section-container">
          <div className="tm-section-header">
            <div className="tm-section-badge">
              <span className="tm-badge-dot"></span>
              <span>INTELLIGENT TRAFFIC ANALYSIS</span>
            </div>
            <h2 className="tm-section-title">See Traffic Differently</h2>
            <p className="tm-section-subtitle">
              Real-time AI computer vision transforming raw camera snapshots into structured traffic
              intelligence and adaptive signal recommendations.
            </p>
          </div>

          <div className="tm-features-grid">
            {/* Feature Card 1 */}
            <div className="tm-feature-card">
              <div className="tm-feature-top">
                <span className="tm-feature-icon-wrap">🚘</span>
                <span className="tm-feature-chip">YOLOV8 ENGINE</span>
              </div>
              <h3 className="tm-feature-name">Vehicle Detection</h3>
              <p className="tm-feature-desc">
                High-precision deep learning detection categorizes cars, buses, trucks, and
                motorcycles with localized bounding boxes and confidence scores in milliseconds.
              </p>
              <div className="tm-feature-footer">
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">COCO 80</span>
                  <span className="tm-fstat-lbl">Pretrained Classes</span>
                </div>
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">&lt;50ms</span>
                  <span className="tm-fstat-lbl">Inference Speed</span>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="tm-feature-card highlight">
              <div className="tm-feature-top">
                <span className="tm-feature-icon-wrap">📈</span>
                <span className="tm-feature-chip chip-cyan">DENSITY HEURISTICS</span>
              </div>
              <h3 className="tm-feature-name">Congestion Intelligence</h3>
              <p className="tm-feature-desc">
                Translates multi-class vehicle counts into an explainable 0–100 congestion index.
                Heuristically maps vehicular density to Low, Medium, and High traffic levels.
              </p>
              <div className="tm-feature-footer">
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">0–100</span>
                  <span className="tm-fstat-lbl">Congestion Scale</span>
                </div>
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">3-Tier</span>
                  <span className="tm-fstat-lbl">Density Levels</span>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="tm-feature-card">
              <div className="tm-feature-top">
                <span className="tm-feature-icon-wrap">🚦</span>
                <span className="tm-feature-chip">SIGNAL ADVISORY</span>
              </div>
              <h3 className="tm-feature-name">Signal Priority</h3>
              <p className="tm-feature-desc">
                Provides dynamic signal timing recommendations, suggesting green-phase extensions or
                immediate clearance phases to mitigate intersection gridlock before it accumulates.
              </p>
              <div className="tm-feature-footer">
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">Dynamic</span>
                  <span className="tm-fstat-lbl">Phase Advisory</span>
                </div>
                <div className="tm-feature-stat">
                  <span className="tm-fstat-val">Explainable</span>
                  <span className="tm-fstat-lbl">Decision Rationale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 2: How It Works
          ==================================================================== */}
      <section id="how-it-works" className="tm-section tm-how-section">
        <div className="tm-section-container">
          <div className="tm-section-header">
            <div className="tm-section-badge">
              <span className="tm-badge-dot"></span>
              <span>THREE-STEP PIPELINE</span>
            </div>
            <h2 className="tm-section-title">From Image to Intelligence</h2>
            <p className="tm-section-subtitle">
              A transparent, end-to-end computer vision pipeline designed for quick evaluation and
              smart mobility simulation.
            </p>
          </div>

          <div className="tm-steps-grid">
            {/* Step 1 */}
            <div className="tm-step-card">
              <div className="tm-step-number">01</div>
              <div className="tm-step-badge">STEP ONE</div>
              <h3 className="tm-step-title">Upload Intersection Image</h3>
              <p className="tm-step-desc">
                Drop any JPEG, PNG, or WEBP photo from an intersection camera, drone survey, or traffic
                surveillance feed directly into the analyzer.
              </p>
              <div className="tm-step-mini-hud">
                <span>FORMATS: JPG, PNG, WEBP</span>
                <span className="tm-mini-dot"></span>
                <span>DRAG & DROP READY</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="tm-step-card">
              <div className="tm-step-number">02</div>
              <div className="tm-step-badge">STEP TWO</div>
              <h3 className="tm-step-title">AI Vision Processing</h3>
              <p className="tm-step-desc">
                Our YOLOv8 nano engine detects vehicles across classes (cars, buses, trucks, bikes),
                draws annotated bounding boxes, and calculates aggregate vehicular weight.
              </p>
              <div className="tm-step-mini-hud">
                <span>MODEL: YOLOV8 NANO</span>
                <span className="tm-mini-dot"></span>
                <span>AUTO-ANNOTATION</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="tm-step-card">
              <div className="tm-step-number">03</div>
              <div className="tm-step-badge">STEP THREE</div>
              <h3 className="tm-step-title">Actionable Signal Advisory</h3>
              <p className="tm-step-desc">
                Receive an immediate congestion score (0–100), vehicle category counts, and an
                explainable traffic signal priority recommendation to relieve road congestion.
              </p>
              <div className="tm-step-mini-hud">
                <span>OUTPUT: CONGESTION + TIMING</span>
                <span className="tm-mini-dot"></span>
                <span>INSTANT ADVISORY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 3: Traffic Intelligence Dashboard Preview
          ==================================================================== */}
      <section id="preview" className="tm-section tm-preview-section">
        <div className="tm-section-container">
          <div className="tm-section-header">
            <div className="tm-section-badge">
              <span className="tm-badge-dot"></span>
              <span>SYSTEM PREVIEW</span>
            </div>
            <h2 className="tm-section-title">Live Intelligence at Intersection Scale</h2>
            <p className="tm-section-subtitle">
              Designed for mobility operators and researchers. Gain real-time clarity into vehicle
              density, vehicle type breakdowns, and suggested signal adaptations.
            </p>
          </div>

          {/* Interactive Preview Dashboard Mockup Card */}
          <div className="tm-mockup-wrapper">
            <div className="tm-mockup-frame">
              {/* Window Header */}
              <div className="tm-mockup-topbar">
                <div className="tm-window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="tm-window-title">
                  <span>trafficmind-ai-console // intersection-junction-a12</span>
                </div>
                <div className="tm-window-status">
                  <span className="status-live">● SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="tm-mockup-content">
                {/* Metric Summary Bar */}
                <div className="tm-mockup-metrics">
                  <div className="tm-mock-metric">
                    <span className="tm-mock-lbl">TOTAL VEHICLES</span>
                    <span className="tm-mock-val">14 Detected</span>
                  </div>
                  <div className="tm-mock-metric">
                    <span className="tm-mock-lbl">CONGESTION SCORE</span>
                    <span className="tm-mock-val val-alert">70 / 100</span>
                    <span className="tm-mock-sub">HIGH CONGESTION</span>
                  </div>
                  <div className="tm-mock-metric">
                    <span className="tm-mock-lbl">RECOMMENDED PRIORITY</span>
                    <span className="tm-mock-val val-priority">🔴 High Priority</span>
                    <span className="tm-mock-sub">Immediate Green Allocation</span>
                  </div>
                </div>

                {/* Vehicle Classification Breakdown Chips */}
                <div className="tm-mockup-classes">
                  <span className="tm-class-chip">🚗 8 Cars</span>
                  <span className="tm-class-chip">🚌 3 Buses</span>
                  <span className="tm-class-chip">🚛 2 Trucks</span>
                  <span className="tm-class-chip">🏍️ 1 Motorcycle</span>
                </div>

                {/* Mock Visualizer Box */}
                <div className="tm-mockup-visualizer">
                  <div className="tm-vis-grid">
                    <div className="tm-vis-crosshair"></div>
                    <div className="tm-vis-box box-1">
                      <span className="tm-box-tag">bus 0.94</span>
                    </div>
                    <div className="tm-vis-box box-2">
                      <span className="tm-box-tag">car 0.91</span>
                    </div>
                    <div className="tm-vis-box box-3">
                      <span className="tm-box-tag">truck 0.88</span>
                    </div>
                    <div className="tm-vis-scanline"></div>
                  </div>
                  <div className="tm-vis-info">
                    <span>YOLOv8 NANO • CONFIDENCE THRESHOLD 0.25 • COCO WEIGHTS</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Bar inside Mockup */}
              <div className="tm-mockup-action-bar">
                <div className="tm-mockup-prompt">
                  Ready to test with your own traffic image?
                </div>
                <button
                  className="tm-btn-launch-dash"
                  onClick={() => onNavigate('/dashboard')}
                >
                  <span>OPEN TRAFFIC DASHBOARD</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 4: Final Call to Action
          ==================================================================== */}
      <section id="cta" className="tm-section tm-cta-section">
        <div className="tm-cta-card">
          <div className="tm-cta-glow"></div>
          <div className="tm-cta-content">
            <div className="tm-section-badge">
              <span className="tm-badge-dot"></span>
              <span>GET STARTED NOW</span>
            </div>
            <h2 className="tm-cta-title">Smarter Traffic Starts Here</h2>
            <p className="tm-cta-subtitle">
              Experience the instant power of AI-driven traffic intelligence. Upload a road snapshot,
              generate vehicular density metrics, and review adaptive signal priority timing in seconds.
            </p>
            <div className="tm-cta-actions">
              <button
                className="tm-btn-hero-primary"
                onClick={() => onNavigate('/dashboard')}
              >
                <span>ANALYZE YOUR IMAGE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Footer
          ==================================================================== */}
      <footer className="tm-footer" role="contentinfo">
        <div className="tm-footer-container">
          <div className="tm-footer-top">
            <div className="tm-footer-brand">
              <div className="tm-logo-text">
                <span className="tm-brand-name">TrafficMind</span>
                <span className="tm-brand-ai">AI</span>
              </div>
              <p className="tm-footer-tagline">
                AI-powered traffic intelligence for smarter urban mobility and adaptive intersection
                management.
              </p>
            </div>

            <div className="tm-footer-links">
              <div className="tm-footer-col">
                <h4 className="tm-footer-heading">Navigation</h4>
                <a
                  href="#hero-track"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Overview
                </a>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  How It Works
                </a>
                <a
                  href="#preview"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  System Preview
                </a>
              </div>

              <div className="tm-footer-col">
                <h4 className="tm-footer-heading">Tools</h4>
                <button
                  className="tm-footer-link-btn"
                  onClick={() => onNavigate('/dashboard')}
                >
                  Traffic Analysis Dashboard
                </button>
                <span className="tm-footer-subtext">YOLOv8 Vehicle Detection</span>
                <span className="tm-footer-subtext">Congestion Scoring</span>
                <span className="tm-footer-subtext">Signal Priority Engine</span>
              </div>
            </div>
          </div>

          <div className="tm-footer-divider"></div>

          {/* Prototype / Simulation Mandatory Disclaimer */}
          <div className="tm-footer-disclaimer">
            <span className="tm-disclaimer-badge">PROTOTYPE & SIMULATION NOTICE</span>
            <p>
              TrafficMind AI is an educational simulation and prototype designed to demonstrate
              computer vision applications in urban mobility. All vehicle detections, congestion
              metrics, and signal priority recommendations are heuristic approximations and are
              strictly prohibited from being connected to or controlling real-world municipal traffic
              hardware.
            </p>
          </div>

          <div className="tm-footer-bottom">
            <p className="tm-copyright">
              &copy; {new Date().getFullYear()} TrafficMind AI. All rights reserved.
            </p>
            <div className="tm-footer-status">
              <span className="tm-status-dot"></span>
              <span>All Systems Operational (Port 8081)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
