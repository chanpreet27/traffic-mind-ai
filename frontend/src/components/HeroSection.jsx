import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const DESKTOP_VIDEO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/65fdef53-5686-4659-8761-52d61bf1a4f7.mp4'
const MOBILE_VIDEO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9a30e5e9-9f03-4755-9bc1-7bcf1510aab3.mp4'
const POSTER_IMAGE =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/33150b94-09f7-47da-a7c9-3ae76c2dd7eb.jpg'
const DURATION = 5.04

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function HeroSection({ onNavigate }) {
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const headlineRef = useRef(null)
  const scrollCueRef = useRef(null)
  const scrollCueLineRef = useRef(null)
  const processListRef = useRef(null)
  const hudOverlayRef = useRef(null)

  const [activeStep, setActiveStep] = useState(1)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const stateRef = useRef({
    targetTime: 0,
    currentTime: 0,
    isSeeking: false,
    pendingSeekTime: null,
    isReducedMotion: false,
  })

  // Handle video source setup and seek loop
  useEffect(() => {
    stateRef.current.isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const video = videoRef.current
    if (!video) return

    const updateSource = () => {
      const selected = window.innerWidth <= 900 ? MOBILE_VIDEO : DESKTOP_VIDEO
      if (video.src !== selected) {
        video.src = selected
        video.load()
      }
    }
    updateSource()

    const handleResize = () => {
      updateSource()
    }
    window.addEventListener('resize', handleResize)

    const handleLoadedData = () => setVideoLoaded(true)
    const handleCanPlay = () => setVideoLoaded(true)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)

    // Fallback timer for loader
    const fallbackTimer = setTimeout(() => setVideoLoaded(true), 2500)

    const applySeek = (time) => {
      const dur = video.duration || DURATION
      const bounded = clamp(time, 0, dur - 1 / 48)

      if (!stateRef.current.isSeeking) {
        if (Math.abs(video.currentTime - bounded) > 1 / 60) {
          stateRef.current.isSeeking = true
          video.currentTime = bounded
        }
      } else {
        stateRef.current.pendingSeekTime = bounded
      }
    }

    const handleSeeked = () => {
      stateRef.current.isSeeking = false
      if (stateRef.current.pendingSeekTime !== null) {
        const next = stateRef.current.pendingSeekTime
        stateRef.current.pendingSeekTime = null
        if (Math.abs(video.currentTime - next) > 1 / 60) {
          stateRef.current.isSeeking = true
          video.currentTime = next
        }
      }
    }
    video.addEventListener('seeked', handleSeeked)

    let rafId
    const onFrame = () => {
      const track = trackRef.current
      if (track && video) {
        const trackRect = track.getBoundingClientRect()
        const scrollY = window.pageYOffset || document.documentElement.scrollTop
        const trackTop = trackRect.top + scrollY
        const maxScroll = track.offsetHeight - window.innerHeight
        const p = clamp((scrollY - trackTop) / (maxScroll > 0 ? maxScroll : 1), 0, 1)

        const dur = video.duration || DURATION
        stateRef.current.targetTime = p * (dur - 1 / 48)

        if (stateRef.current.isReducedMotion) {
          stateRef.current.currentTime = stateRef.current.targetTime
        } else {
          stateRef.current.currentTime +=
            (stateRef.current.targetTime - stateRef.current.currentTime) * 0.2
        }

        applySeek(stateRef.current.currentTime)

        // Update Headline 3D fold
        if (headlineRef.current) {
          const normH = clamp(p / 0.38, 0, 1)
          const h = easeInOutQuad(normH)
          const ty = -34 * h
          const rx = 62 * h
          const sc = 1 - 0.12 * h
          headlineRef.current.style.transform = `translateY(${ty}vh) rotateX(${rx}deg) scale(${sc})`

          const hOpacity = 1 - clamp((p - 0.1) / (0.24 - 0.1), 0, 1)
          headlineRef.current.style.opacity = hOpacity
          headlineRef.current.style.pointerEvents = hOpacity <= 0.05 ? 'none' : 'auto'
        }

        // Update Process List
        if (processListRef.current) {
          const tProcess = clamp((p - 0.08) / (0.24 - 0.08), 0, 1)
          const processTy = (1 - tProcess) * 40
          processListRef.current.style.opacity = tProcess
          processListRef.current.style.transform = `translateY(${processTy}px)`
          processListRef.current.style.pointerEvents = tProcess <= 0.05 ? 'none' : 'auto'

          // Active process steps: 4 phases
          if (p < 0.3) {
            setActiveStep(1)
          } else if (p < 0.55) {
            setActiveStep(2)
          } else if (p < 0.8) {
            setActiveStep(3)
          } else {
            setActiveStep(4)
          }
        }

        // Update Scroll Cue
        if (scrollCueRef.current && scrollCueLineRef.current) {
          const lineScale = 1 - clamp(p / 0.1, 0, 1)
          scrollCueLineRef.current.style.transform = `scaleX(${lineScale})`

          const cueOpacity = 1 - clamp((p - 0.04) / (0.12 - 0.04), 0, 1)
          scrollCueRef.current.style.opacity = cueOpacity
          scrollCueRef.current.style.pointerEvents = cueOpacity <= 0.05 ? 'none' : 'auto'
        }

        // Update HUD Overlays opacity based on scroll
        if (hudOverlayRef.current) {
          const hudOpacity = clamp((p - 0.12) / 0.15, 0, 0.95)
          hudOverlayRef.current.style.opacity = hudOpacity
        }
      }

      rafId = requestAnimationFrame(onFrame)
    }

    rafId = requestAnimationFrame(onFrame)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fallbackTimer)
      window.removeEventListener('resize', handleResize)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  const handleStepClick = (stepIndex) => {
    if (!trackRef.current) return
    const maxScroll = trackRef.current.offsetHeight - window.innerHeight
    const targetMap = { 1: 0.18, 2: 0.42, 3: 0.68, 4: 0.92 }
    const targetP = targetMap[stepIndex] || 0.2
    window.scrollTo({
      top: trackRef.current.offsetTop + maxScroll * targetP,
      behavior: 'smooth',
    })
  }

  const handleScrollCueClick = () => {
    if (!trackRef.current) return
    const maxScroll = trackRef.current.offsetHeight - window.innerHeight
    window.scrollTo({
      top: trackRef.current.offsetTop + maxScroll * 0.2,
      behavior: 'smooth',
    })
  }

  return (
    <div id="hero-track" className="tm-hero-track" ref={trackRef}>
      {/* Sticky 100vh Scene */}
      <section className="tm-hero-scene" aria-label="TrafficMind AI City Visualization">
        {/* Video Canvas Layer */}
        <div className="tm-scene-video-wrapper">
          <video
            ref={videoRef}
            className="tm-scene-video"
            poster={POSTER_IMAGE}
            playsInline
            muted
            preload="auto"
            aria-hidden="true"
          />
        </div>

        {/* Ambient Film Vignette Gradient */}
        <div className="tm-scene-shade" />

        {/* Floating Intelligent Road Network & Telemetry HUD Overlay */}
        <div className="tm-hud-overlay" ref={hudOverlayRef} aria-hidden="true">
          {/* Pulsing Connected Route Lines (SVG) */}
          <svg className="tm-hud-svg" viewBox="0 0 1920 1080" fill="none">
            {/* Main Arterial Flow Line */}
            <path
              d="M 280 820 L 740 680 L 1180 580 L 1520 490"
              stroke="#00D4FF"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              className="tm-svg-stream-1"
            />
            {/* Cross-Intersection Flow Line */}
            <path
              d="M 620 380 L 860 540 L 1180 580 L 1380 720"
              stroke="#6CAEFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="tm-svg-stream-2"
            />
          </svg>

          {/* HUD Node 1: High Density Intersection */}
          <div className="tm-hud-pin pin-alpha">
            <div className="tm-pin-beacon high-risk">
              <span className="tm-beacon-ring"></span>
              <span className="tm-beacon-core"></span>
            </div>
            <div className="tm-pin-card">
              <div className="tm-pin-header">
                <span className="tm-pin-id">NODE A-12</span>
                <span className="tm-pin-tag tag-high">HIGH DENSITY</span>
              </div>
              <div className="tm-pin-metric">
                <span className="tm-pin-num">78%</span>
                <span className="tm-pin-label">Congestion Index</span>
              </div>
              <div className="tm-pin-recommend">
                <span className="tm-pin-rec-icon">⚡</span>
                <span>Signal: +45s Green Phase</span>
              </div>
            </div>
          </div>

          {/* HUD Node 2: Flow Optimal Corridor */}
          <div className="tm-hud-pin pin-beta">
            <div className="tm-pin-beacon optimal">
              <span className="tm-beacon-ring"></span>
              <span className="tm-beacon-core"></span>
            </div>
            <div className="tm-pin-card">
              <div className="tm-pin-header">
                <span className="tm-pin-id">EXPRESSWAY NW</span>
                <span className="tm-pin-tag tag-opt">OPTIMAL FLOW</span>
              </div>
              <div className="tm-pin-metric">
                <span className="tm-pin-num">24%</span>
                <span className="tm-pin-label">Congestion Index</span>
              </div>
              <div className="tm-pin-recommend">
                <span className="tm-pin-rec-icon">🟢</span>
                <span>Signal: Balanced Cycle</span>
              </div>
            </div>
          </div>

          {/* Center Telemetry Status Stamp */}
          <div className="tm-hud-stamp">
            <div className="tm-stamp-dot"></div>
            <span className="tm-stamp-label">TRAFFIC SENSING GRID ONLINE</span>
            <span className="tm-stamp-val">FPS: 60 | YOLOV8 NANO ACTIVE</span>
          </div>
        </div>

        {/* 3D Perspective Headline Stage */}
        <div className="tm-hero-stage">
          <div className="tm-headline-block" ref={headlineRef}>
            {/* Eyebrow Pill */}
            <div className="tm-hero-eyebrow">
              <span className="tm-eyebrow-pulse"></span>
              <span className="tm-eyebrow-text">AI-POWERED TRAFFIC INTELLIGENCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="tm-hero-title">
              The Future of <br className="tm-br-desktop" />
              Intelligent Traffic.
            </h1>

            {/* Subtitle */}
            <p className="tm-hero-subtitle">
              Analyze traffic. Understand congestion. Make smarter signal decisions. TrafficMind AI
              transforms single-frame traffic images into actionable flow insights using deep
              vehicle detection and density heuristics.
            </p>

            {/* CTA Button Group */}
            <div className="tm-hero-actions">
              <button
                className="tm-btn-hero-primary"
                onClick={() => onNavigate('/dashboard')}
                aria-label="Open TrafficMind AI Dashboard"
              >
                <span>ANALYZE TRAFFIC</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="#features"
                className="tm-btn-hero-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('features')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>EXPLORE THE SYSTEM</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div
          className="tm-scroll-cue"
          ref={scrollCueRef}
          onClick={handleScrollCueClick}
          role="button"
          tabIndex={0}
          aria-label="Scroll to discover traffic intelligence"
        >
          <span className="tm-scroll-cue-text">SCROLL TO DISCOVER TRAFFIC INTELLIGENCE</span>
          <div className="tm-scroll-cue-track">
            <div className="tm-scroll-cue-line" ref={scrollCueLineRef}></div>
          </div>
        </div>

        {/* 4-Step Process Accordion (Bottom Left) */}
        <div
          className="tm-process-container"
          ref={processListRef}
          role="region"
          aria-label="Traffic Intelligence Pipeline Steps"
        >
          {/* Step 1 */}
          <div
            className={`tm-process-card ${activeStep === 1 ? 'active' : ''}`}
            onClick={() => handleStepClick(1)}
          >
            <div className="tm-process-header">
              <div className="tm-process-number">01</div>
              <div className="tm-process-title-group">
                <div className="tm-process-title">Image Ingestion</div>
                <div className="tm-process-badge">STAGE 1</div>
              </div>
            </div>
            <div className="tm-process-drawer">
              <div className="tm-process-drawer-content">
                <div className="tm-process-body-wrap">
                  <p className="tm-process-text">
                    Single-frame intersection or aerial traffic capture with automated resolution
                    scaling and noise filtering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className={`tm-process-card ${activeStep === 2 ? 'active' : ''}`}
            onClick={() => handleStepClick(2)}
          >
            <div className="tm-process-header">
              <div className="tm-process-number">02</div>
              <div className="tm-process-title-group">
                <div className="tm-process-title">Neural Detection</div>
                <div className="tm-process-badge">YOLOV8</div>
              </div>
            </div>
            <div className="tm-process-drawer">
              <div className="tm-process-drawer-content">
                <div className="tm-process-body-wrap">
                  <p className="tm-process-text">
                    Deep neural network inference detects and classifies cars, buses, trucks, and
                    motorcycles with sub-second bounding boxes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className={`tm-process-card ${activeStep === 3 ? 'active' : ''}`}
            onClick={() => handleStepClick(3)}
          >
            <div className="tm-process-header">
              <div className="tm-process-number">03</div>
              <div className="tm-process-title-group">
                <div className="tm-process-title">Density Scoring</div>
                <div className="tm-process-badge">0-100 INDEX</div>
              </div>
            </div>
            <div className="tm-process-drawer">
              <div className="tm-process-drawer-content">
                <div className="tm-process-body-wrap">
                  <p className="tm-process-text">
                    Calculates congestion metrics from 0 to 100 based on classified vehicle weights,
                    spatial cluster density, and capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div
            className={`tm-process-card ${activeStep === 4 ? 'active' : ''}`}
            onClick={() => handleStepClick(4)}
          >
            <div className="tm-process-header">
              <div className="tm-process-number">04</div>
              <div className="tm-process-title-group">
                <div className="tm-process-title">Adaptive Timing</div>
                <div className="tm-process-badge">ADVISORY</div>
              </div>
            </div>
            <div className="tm-process-drawer">
              <div className="tm-process-drawer-content">
                <div className="tm-process-body-wrap">
                  <p className="tm-process-text">
                    Recommends signal priority levels (Low, Medium, High) with dynamic green-phase
                    timing advisories to prevent gridlock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
