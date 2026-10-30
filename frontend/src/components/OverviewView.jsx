import React from 'react';
import logoUrl from '../assets/trafficmind-logo.png';

const DIORAMA_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8XyHqkx9BZymL6RUOZEiimb6c734z0LV9ovcxJzuXQrZRQC8GINf9ttMiSrHyQrWgYqINEBUy3w4mhpQtOovn8apobAYPSgC0jgDX5cvYME4l22ggf5Jra1LyMCPlJqrS4lzpiz-fuZrRDDCmv10eC6-o0nYLsXcEUf4qltthYSnaSujuNk1gEP4Ir9UyaUXiKMNW_58MHhsBkHBuF2ZO7hESYvie-up7WoALFNc";
const SAMPLE_INTERSECTION_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCjmIA7VhxHrdXDWoRzyKoZUq_vK1MeRv402gCTK2TnEK5qiiPiQssIU_CIr4JD-BIZgrFGsU-gPxokOVYcc2X4Pzgs5NfgE4-so9ZA5dSufUGs5BhbJ0bnwaLl9ccAvkjdBQQVjrIna1_vedNvSz3cF8z1Pu6c1GIkwDieO3rml2uN4XtABzYT9dyY00cmT8sXhxZf85oHCqyQwqD2uFMwlp9NRxzHV-SLcPQTG_Y";

export default function OverviewView({ onNavigate }) {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION: 7/5 Desktop Grid Split */}
      <section className="w-full max-w-7xl mx-auto px-margin pt-space-xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-space-md">
            <div className="mb-4">
              <img 
                src={logoUrl} 
                alt="TrafficMind AI" 
                className="h-12 sm:h-14 w-auto object-contain rounded-lg"
              />
            </div>
            <span className="inline-flex items-center font-caption-uppercase text-caption-uppercase text-muted bg-surface-card px-3 py-1 rounded-full mb-4">
              IMAGE-BASED TRAFFIC INTELLIGENCE
            </span>
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight leading-tight mb-space-md">
              Understand traffic. See the bigger picture.
            </h1>
            <p className="font-title-md text-title-md text-body font-normal max-w-xl mb-8 leading-relaxed">
              Turn traffic images into useful insights with vehicle detection, congestion estimation, and signal priority recommendations.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-space-sm mb-space-lg">
              <button
                type="button"
                onClick={() => onNavigate('/dashboard')}
                className="bg-primary text-on-primary font-button text-button rounded-lg px-6 py-3.5 hover:bg-primary-active transition-all shadow-sm flex items-center gap-space-xs"
              >
                <span>Analyze Traffic</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/how-it-works')}
                className="bg-canvas text-primary font-button text-button rounded-lg px-6 py-3.5 hover:bg-surface-card transition-all border border-hairline"
              >
                How It Works
              </button>
            </div>

            {/* Product Information Badges Row */}
            <div className="w-full flex flex-wrap items-center gap-6 pt-6 bg-surface-soft/60 rounded-xl px-4 py-3 border border-hairline/60">
              <div className="flex items-center gap-2 text-body font-caption text-caption">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span>Vehicle detection</span>
              </div>
              <div className="flex items-center gap-2 text-body font-caption text-caption">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span>Congestion estimation</span>
              </div>
              <div className="flex items-center gap-2 text-body font-caption text-caption">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span>Prototype advisory</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols Tactile Clay Intersection Artifact */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-surface-soft rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[460px] border border-hairline">
              {/* Top Telemetry Pill Bar */}
              <div className="flex items-center justify-between z-10 w-full mb-4">
                <div className="flex items-center gap-2 bg-surface-container-lowest/90 px-3 py-1.5 rounded-full shadow-xs border border-hairline/80">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                  <span className="font-caption-uppercase text-caption-uppercase text-body-strong tracking-wide">
                    CAM_04 · CLAY_RENDER
                  </span>
                </div>
                <span className="bg-surface-card text-body font-caption text-caption px-3 py-1 rounded-full">
                  30 FPS MODEL
                </span>
              </div>

              {/* Central Tactile Diorama Artifact */}
              <div className="relative w-full h-64 sm:h-72 my-2 rounded-2xl overflow-hidden bg-surface-strong/70 flex items-center justify-center border border-hairline/50">
                <img 
                  className="w-full h-full object-cover rounded-xl" 
                  alt="Tactile 3D miniature clay traffic intersection diorama" 
                  src={DIORAMA_IMG} 
                />
                
                {/* Inset Clay Telemetry Floating Chips */}
                <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2 border border-hairline/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-coral"></span>
                  <span className="font-caption text-caption font-semibold text-body-strong">
                    Active Flow: 42 v/min
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-surface-container-lowest/95 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5 border border-hairline/80">
                  <span className="material-symbols-outlined text-secondary text-sm">precision_manufacturing</span>
                  <span className="font-caption-uppercase text-[11px] text-body">TACTILE COGNITION</span>
                </div>
              </div>

              {/* Bottom Micro-Telemetry Matrix */}
              <div className="grid grid-cols-3 gap-2 pt-4 mt-2">
                <div className="bg-surface-container-lowest rounded-xl p-2.5 text-center shadow-xs border border-hairline/60">
                  <p className="font-caption-uppercase text-[10px] text-muted tracking-wider">VEHICLES</p>
                  <p className="font-title-sm text-title-sm text-body-strong font-semibold">18</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-2.5 text-center shadow-xs border border-hairline/60">
                  <p className="font-caption-uppercase text-[10px] text-muted tracking-wider">INDEX</p>
                  <p className="font-title-sm text-title-sm text-warning font-semibold">58 / 100</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-2.5 text-center shadow-xs border border-hairline/60">
                  <p className="font-caption-uppercase text-[10px] text-muted tracking-wider">SIGNAL</p>
                  <p className="font-title-sm text-title-sm text-body-strong font-semibold">PHASE 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A: Traffic Intelligence Feature Cards (Saturated Clay Surfaces) */}
      <section className="w-full max-w-7xl mx-auto px-margin py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-caption-uppercase text-caption-uppercase text-muted bg-surface-card px-3 py-1 rounded-full mb-3 inline-block">
            CORE PERCEPTION STACK
          </span>
          <h2 className="font-display-md text-display-md text-primary tracking-tight">
            From a traffic image to a clearer picture.
          </h2>
          <p className="font-body-md text-body-md text-muted mt-2">
            Synthesize raw pixel captures into calibrated physical volumes, flow rates, and timing recommendations.
          </p>
        </div>

        {/* 3 Saturated Clay Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
          {/* Card 1: Deep Teal (#1A3A3A) Vehicle Detection */}
          <div className="bg-brand-teal text-on-secondary rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-transform duration-200 hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-canvas/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-canvas text-xl">view_in_ar</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-secondary mb-2">Vehicle Detection</h3>
              <p className="font-body-sm text-body-sm text-on-secondary/80 leading-relaxed mb-6">
                Identify supported vehicles in a traffic image using computer vision with multi-class localization.
              </p>
            </div>
            {/* Embedded Mini UI Preview Fragment */}
            <div className="bg-surface-dark-elevated rounded-xl p-4 mt-2 border border-white/5">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <span className="font-caption-uppercase text-[11px] text-canvas/70 tracking-widest">DETECTION FEED</span>
                <span className="font-caption text-[11px] text-brand-mint font-semibold">CONFIDENCE 92.4%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-1.5 text-xs text-canvas">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-ochre"></span> Car
                  </span>
                  <span className="font-caption font-semibold text-brand-ochre">94%</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-1.5 text-xs text-canvas">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-coral"></span> Bus
                  </span>
                  <span className="font-caption font-semibold text-brand-coral">89%</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-1.5 text-xs text-canvas">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-mint"></span> Truck
                  </span>
                  <span className="font-caption font-semibold text-brand-mint">91%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Lavender (#B8A4ED) Congestion Estimation */}
          <div className="bg-brand-lavender text-primary rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-transform duration-200 hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-canvas/60 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-xl">speed</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary mb-2">Congestion Estimation</h3>
              <p className="font-body-sm text-body-sm text-body leading-relaxed mb-6">
                Understand the estimated traffic load using detected vehicle information and lane saturation metrics.
              </p>
            </div>
            {/* Tactile Visual Congestion Meter Fragment */}
            <div className="bg-canvas rounded-xl p-4 mt-2 shadow-xs border border-black/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-caption-uppercase text-[11px] text-muted tracking-wider">LOAD LEVEL</span>
                <span className="font-caption text-caption font-semibold text-body-strong">Moderate Load</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display-sm text-display-sm font-semibold text-primary">68</span>
                <span className="font-caption text-caption text-muted">/ 100</span>
              </div>
              {/* Custom Gauge Bar */}
              <div className="w-full bg-surface-strong h-2.5 rounded-full overflow-hidden flex mb-3">
                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs font-caption text-muted pt-2 border-t border-hairline">
                <span>Light (&lt;35)</span>
                <span className="font-semibold text-primary">Moderate (36–75)</span>
                <span>Severe (&gt;75)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Peach (#FFB084) Signal Priority Advisory */}
          <div className="bg-brand-peach text-primary rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-transform duration-200 hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-canvas/60 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-xl">traffic</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary mb-2">Signal Priority Advisory</h3>
              <p className="font-body-sm text-body-sm text-body leading-relaxed mb-6">
                Explore a prototype recommendation based on estimated congestion to balance corridor throughput.
              </p>
            </div>
            {/* Traffic Light Advisory Badge Card */}
            <div className="bg-canvas rounded-xl p-4 mt-2 shadow-xs border border-black/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-14 bg-body-strong rounded-full p-1.5 flex flex-col justify-between items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-hairline/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-hairline/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
                </div>
                <div>
                  <p className="font-caption-uppercase text-[10px] text-muted tracking-wider">PHASE DIRECTIVE</p>
                  <p className="font-title-sm text-title-sm text-body-strong font-semibold">Extend Northbound Green</p>
                  <p className="font-caption text-caption text-secondary font-medium">+15s Extension Window</p>
                </div>
              </div>
              <div className="bg-surface-card rounded-lg px-2.5 py-1.5 text-center">
                <span className="font-caption-uppercase text-[10px] text-muted tracking-wider font-semibold">SIMULATION ADVISORY ONLY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: How The System Works (Horizontal Editorial Timeline) */}
      <section className="w-full max-w-7xl mx-auto px-margin py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-caption-uppercase text-caption-uppercase text-muted bg-surface-card px-3 py-1 rounded-full mb-3 inline-block">
              METHODOLOGY
            </span>
            <h2 className="font-display-md text-display-md text-primary tracking-tight">
              Four steps. One traffic insight.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-muted max-w-md mt-4 md:mt-0">
            Deterministic telemetry generated systematically from photographic frames to actionable advisory.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full border border-hairline">
            <div>
              <span className="font-display-sm text-display-sm font-semibold text-muted/40 block mb-4">01</span>
              <h4 className="font-title-md text-title-md text-body-strong mb-2">Image Ingestion</h4>
              <p className="font-body-sm text-body-sm text-muted leading-relaxed">
                Upload a high-resolution road, corridor, or intersection snapshot via file drop or camera frame ingest.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-2 text-xs font-caption text-muted">
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>Formats: JPG, PNG, WebP</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full border border-hairline">
            <div>
              <span className="font-display-sm text-display-sm font-semibold text-muted/40 block mb-4">02</span>
              <h4 className="font-title-md text-title-md text-body-strong mb-2">Vehicle Detection</h4>
              <p className="font-body-sm text-body-sm text-muted leading-relaxed">
                The neural vision model identifies supported vehicle classes including passenger cars, buses, and freight trucks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-2 text-xs font-caption text-muted">
              <span className="material-symbols-outlined text-sm">filter_center_focus</span>
              <span>Multi-class bounding box</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full border border-hairline">
            <div>
              <span className="font-display-sm text-display-sm font-semibold text-muted/40 block mb-4">03</span>
              <h4 className="font-title-md text-title-md text-body-strong mb-2">Congestion Estimation</h4>
              <p className="font-body-sm text-body-sm text-muted leading-relaxed">
                Detected vehicle information and road geometries are computed into a normalized congestion load index.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-2 text-xs font-caption text-muted">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>Volumetric index (0–100)</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full border border-hairline">
            <div>
              <span className="font-display-sm text-display-sm font-semibold text-muted/40 block mb-4">04</span>
              <h4 className="font-title-md text-title-md text-body-strong mb-2">Signal Recommendation</h4>
              <p className="font-body-sm text-body-sm text-muted leading-relaxed">
                Generate an intuitive signal priority advisory to relieve queue backlogs using transparent, rule-based heuristics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-2 text-xs font-caption text-muted">
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Adaptive phase guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Product Preview (Rich Realistic Analysis Card) */}
      <section className="w-full max-w-7xl mx-auto px-margin py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-caption-uppercase text-caption-uppercase text-muted bg-surface-card px-3 py-1 rounded-full mb-3 inline-block">
            INTERFACE DEMONSTRATION
          </span>
          <h2 className="font-display-md text-display-md text-primary tracking-tight">
            See what the analysis reveals.
          </h2>
        </div>

        {/* Main Realistic Analysis Card Container */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-sm border border-hairline">
          {/* Top Bar Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-hairline">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <div>
                <h3 className="font-title-sm text-title-sm text-body-strong">Sample Analysis · Intersection_North_Cam3.jpg</h3>
                <p className="font-caption text-caption text-muted">Uploaded Oct 24, 2025 · 1080p RGB Optical Sensor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-surface-card text-body-strong font-caption-uppercase text-[11px] px-3 py-1 rounded-full font-semibold">
                SAMPLE DATA
              </span>
              <span className="bg-surface-soft text-muted font-caption text-[11px] px-3 py-1 rounded-full">
                Inference: 42ms
              </span>
            </div>
          </div>

          {/* Split Preview Layout: 7 Cols Feed / 5 Cols Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left: Annotated Image Canvas with Bounding Boxes (7 cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-surface-dark min-h-[340px] flex items-center justify-center border border-hairline/80">
              <img 
                className="w-full h-full object-cover min-h-[340px] opacity-85" 
                alt="Authentic urban intersection preview" 
                src={SAMPLE_INTERSECTION_IMG} 
              />
              {/* Bounding Box Overlays */}
              <div className="absolute top-1/4 left-[20%] border-2 border-brand-ochre bg-brand-ochre/15 rounded-md px-2 py-1 flex flex-col pointer-events-none" style={{ width: '110px', height: '70px' }}>
                <span className="font-caption-uppercase text-[10px] font-bold text-canvas bg-body-strong px-1.5 py-0.5 rounded self-start">
                  CAR · 96%
                </span>
              </div>
              <div className="absolute top-1/3 right-[25%] border-2 border-brand-coral bg-brand-coral/15 rounded-md px-2 py-1 flex flex-col pointer-events-none" style={{ width: '140px', height: '90px' }}>
                <span className="font-caption-uppercase text-[10px] font-bold text-canvas bg-body-strong px-1.5 py-0.5 rounded self-start">
                  BUS · 91%
                </span>
              </div>
              <div className="absolute bottom-1/4 left-1/3 border-2 border-brand-mint bg-brand-mint/20 rounded-md px-2 py-1 flex flex-col pointer-events-none" style={{ width: '95px', height: '60px' }}>
                <span className="font-caption-uppercase text-[10px] font-bold text-canvas bg-body-strong px-1.5 py-0.5 rounded self-start">
                  CAR · 94%
                </span>
              </div>
              {/* Bottom Live Annotation Overlay Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-dark-elevated/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center justify-between text-canvas">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                  <span className="font-caption text-caption font-medium">3 Vehicle Classes Detected</span>
                </div>
                <span className="font-caption-uppercase text-[11px] text-canvas/70">Bounding Box IoU 0.88</span>
              </div>
            </div>

            {/* Right: Summary Metrics Deck (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Metric 1: Total Vehicles */}
              <div className="bg-surface-soft rounded-2xl p-5 border border-hairline/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-caption-uppercase text-caption-uppercase text-muted">TOTAL DETECTIONS</span>
                  <span className="material-symbols-outlined text-muted text-base">directions_car</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-md text-display-md font-semibold text-primary">24</span>
                  <span className="font-caption text-caption text-muted">vehicles in frame</span>
                </div>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-hairline font-caption text-caption text-body">
                  <span><strong>19</strong> Cars</span>
                  <span>•</span>
                  <span><strong>3</strong> Buses</span>
                  <span>•</span>
                  <span><strong>2</strong> Trucks</span>
                </div>
              </div>

              {/* Metric 2: Congestion Index */}
              <div className="bg-surface-soft rounded-2xl p-5 border border-hairline/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-caption-uppercase text-caption-uppercase text-muted">CONGESTION INDEX</span>
                  <span className="font-caption text-caption font-semibold text-brand-coral">High Density</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-md text-display-md font-semibold text-body-strong">72</span>
                  <span className="font-caption text-caption text-muted">/ 100</span>
                </div>
                <div className="w-full bg-hairline h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-brand-coral h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              {/* Metric 3: Recommended Action */}
              <div className="bg-surface-soft rounded-2xl p-5 border border-hairline/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-caption-uppercase text-caption-uppercase text-muted">RECOMMENDED ACTION</span>
                  <span className="material-symbols-outlined text-warning text-base">warning</span>
                </div>
                <p className="font-title-sm text-title-sm text-body-strong font-semibold mb-1">
                  Priority Phase B: Extend Green
                </p>
                <p className="font-caption text-caption text-muted leading-relaxed">
                  Recommended +20s release on East-West transit corridor to alleviate transit lane queuing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: Final CTA Band */}
      <section className="w-full max-w-7xl mx-auto px-margin py-16">
        <div className="bg-surface-soft rounded-3xl p-10 sm:p-16 text-center max-w-4xl mx-auto shadow-sm border border-hairline">
          <span className="font-caption-uppercase text-caption-uppercase text-muted bg-surface-card px-3 py-1 rounded-full mb-4 inline-block">
            GET STARTED
          </span>
          <h2 className="font-display-md text-display-md text-primary tracking-tight mb-4">
            Start with a traffic image.
          </h2>
          <p className="font-body-md text-body-md text-body max-w-lg mx-auto leading-relaxed mb-8">
            Upload a traffic scene and explore the insights generated by TrafficMind AI in a controlled simulation environment.
          </p>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className="bg-primary text-on-primary font-button text-base rounded-lg px-8 py-4 font-semibold hover:bg-primary-active transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Analyze Traffic</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
