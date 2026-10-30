import React from 'react';

const STAGE1_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBHWftawhgyryANiSJKSKjfTCurYVfgUTJIqwFYpX65SuJ-HxjqB3lLnfo_V1pdK9R5yxVZIf_PVmQQGEihLcWroD_9LmzqUnkOXI8-ZnDqca2ahO541kUcYpoQNMgl5oZjKXq4AaBNqbpQRtwnUPgmPHimESYeckBZa3AqHhX-zF5c6uZAXQwROEAN4CMtAaGIklxoQTr93OBbf0r0WitKur7OmSx4mCxOp9au3O0";
const STAGE2_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBslmch52Ma26Bc8ojtiibBabIIjctwnz-U1KDk8Q0_92lJLnZYeCZ83JEug_1ocBsSDwUjKK8bFcU_bRXwWpz5VQ0FUv0ZBXsAMAV_FP6yGIVV5om_Zg1iXlr1eRXKNm6bwsbwDucgSdatXT9ZmjejrkDBXMNsBUq6Fyl-xuUthHj9JFwi5GCXrVMSdL4v8mfCKRcNTMcjykopMm9OEjWJoMAZzrZ9zgE6vPKA41Y";

export default function HowItWorksView({ onNavigate }) {
  return (
    <div className="flex flex-col w-full">
      <section className="max-w-7xl mx-auto px-margin py-space-xl w-full">
        {/* Header Section */}
        <div className="max-w-3xl mb-space-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card mb-4 border border-hairline/60">
            <span className="w-2 h-2 rounded-full bg-brand-coral"></span>
            <span className="font-caption-uppercase text-caption-uppercase text-body-strong tracking-widest text-[11px]">
              SYSTEM ARCHITECTURE SPECIFICATION
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-body-strong tracking-tight">
            How TrafficMind AI works.
          </h1>
          <p className="font-title-md text-title-md text-body mt-2">
            An image-based workflow that turns vehicle detections into traffic insights.
          </p>
        </div>

        {/* Technical Summary Box */}
        <div className="max-w-5xl bg-surface-soft rounded-2xl p-space-lg mb-space-xl shadow-sm border border-hairline">
          <div className="flex items-center justify-between pb-space-md mb-space-md bg-canvas/60 px-space-md py-space-xs rounded-lg border border-hairline/40">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-body-strong text-xl">tune</span>
              <span className="font-caption-uppercase text-caption-uppercase text-body-strong text-[11px]">Pipeline Parameters</span>
            </div>
            <span className="font-caption text-caption text-muted">v2.4-lite • Static Frame Engine</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="p-space-md rounded-xl bg-canvas shadow-xs border border-hairline/60">
              <span className="font-caption text-caption text-muted block mb-1">Model Architecture</span>
              <span className="font-title-sm text-title-sm text-body-strong block">YOLOv8 Vehicle Detection</span>
              <div className="mt-2 text-[11px] font-caption text-secondary">Spatial pyramid pooling (mAP@0.5: 88.4%)</div>
            </div>
            <div className="p-space-md rounded-xl bg-canvas shadow-xs border border-hairline/60">
              <span className="font-caption text-caption text-muted block mb-1">Input Format</span>
              <span className="font-title-sm text-title-sm text-body-strong block">Static Image (JPG, PNG)</span>
              <div className="mt-2 text-[11px] font-caption text-secondary">416x416 to 1920x1080 tensor scaling</div>
            </div>
            <div className="p-space-md rounded-xl bg-canvas shadow-xs border border-hairline/60">
              <span className="font-caption text-caption text-muted block mb-1">Output Data</span>
              <span className="font-title-sm text-title-sm text-body-strong block">Bounding Boxes &amp; Index</span>
              <div className="mt-2 text-[11px] font-caption text-secondary">Class vector, coordinate tensors, congestion %</div>
            </div>
            <div className="p-space-md rounded-xl bg-canvas shadow-xs border border-hairline/60">
              <span className="font-caption text-caption text-muted block mb-1">Advisory Engine</span>
              <span className="font-title-sm text-title-sm text-body-strong block">Priority Rules (Simulation)</span>
              <div className="mt-2 text-[11px] font-caption text-secondary">Heuristic transit-weighted duration calc</div>
            </div>
          </div>
        </div>

        {/* 4 Alternating Step Sections */}
        <div className="flex flex-col gap-24">
          {/* STEP 01: Image Ingestion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-ochre text-body-strong font-caption-uppercase text-caption-uppercase text-[11px]">
                  STAGE 01
                </span>
                <span className="font-caption text-caption text-muted">Input Ingestion &amp; Preprocessing</span>
              </div>
              <h2 className="font-display-sm text-display-sm text-body-strong">01 — Image Ingestion</h2>
              <p className="font-body-md text-body-md text-body leading-relaxed">
                Users upload a road, intersection, or highway image. The pipeline inspects image resolution, formats the tensor, and validates aspect ratio without cropping vehicles or altering geometry.
              </p>
              <div className="flex flex-wrap gap-2 pt-space-xs">
                <span className="px-3 py-1 bg-surface-card rounded-full font-caption text-caption text-body-strong border border-hairline">Aspect Normalization</span>
                <span className="px-3 py-1 bg-surface-card rounded-full font-caption text-caption text-body-strong border border-hairline">RGB 3-Channel Normalization</span>
                <span className="px-3 py-1 bg-surface-card rounded-full font-caption text-caption text-body-strong border border-hairline">EXIF Orientation Clean</span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-surface-soft p-space-lg rounded-2xl shadow-sm border border-hairline">
                <div className="bg-canvas rounded-xl p-space-md shadow-xs border border-hairline/60">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-surface-soft px-3 py-2 rounded-lg border border-hairline/60">
                    <span className="font-caption-uppercase text-caption-uppercase text-body-strong text-[11px]">INGEST_STREAM_BUFFER // CAM_04</span>
                    <span className="flex items-center gap-1 font-caption text-caption text-success font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-success"></span> READY
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="relative rounded-lg overflow-hidden h-52 bg-surface-strong">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="Aerial roundabout traffic ingestion specimen" 
                        src={STAGE1_IMG} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-on-primary font-caption text-caption bg-primary/70 px-2 py-0.5 rounded">1920 × 1080px (RGB)</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-3 rounded-lg bg-surface-soft border border-hairline/50">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted font-caption">Target Array</span>
                          <span className="font-caption text-body-strong font-medium">Tensor (1, 3, 640, 640)</span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden">
                          <div className="bg-brand-ochre h-full w-full"></div>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1">
                          <span className="text-muted font-caption">Integrity Digest</span>
                          <span className="font-caption text-body-strong font-medium">SHA256 Validated</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted font-caption">Exposure Ratio</span>
                          <span className="font-caption text-body-strong font-medium">0.82 (Balanced)</span>
                        </div>
                      </div>
                      <div className="mt-4 p-2.5 rounded bg-canvas flex items-center gap-2 border border-hairline/60">
                        <span className="material-symbols-outlined text-brand-teal text-lg">check_circle</span>
                        <span className="font-caption text-caption text-body-strong">Zero geometrical shearing applied</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 02: Vehicle Detection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-brand-teal text-on-primary p-space-lg rounded-2xl shadow-sm border border-hairline">
                <div className="flex items-center justify-between mb-4 pb-2 bg-surface-dark-elevated px-3 py-2 rounded-lg border border-white/5">
                  <span className="font-caption-uppercase text-caption-uppercase text-brand-mint text-[11px]">BOUNDING_BOX_INFERENCE // YOLO_LAYER</span>
                  <span className="font-caption text-caption text-brand-mint font-semibold">Inference Latency: 34ms</span>
                </div>
                <div className="relative rounded-lg overflow-hidden h-64 bg-surface-dark border border-white/10">
                  <img 
                    className="w-full h-full object-cover opacity-80" 
                    alt="Dense multi-lane intersection detection" 
                    src={STAGE2_IMG} 
                  />
                  {/* Bounding Box 1: Bus */}
                  <div className="absolute top-1/4 left-1/4 w-36 h-20 bg-brand-coral/20 rounded shadow-sm flex flex-col justify-between p-1.5 pointer-events-none border border-brand-coral">
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-coral text-on-primary font-caption-uppercase text-[10px] px-1 py-0.5 rounded font-semibold">BUS 97.4%</span>
                      <span className="text-on-primary font-caption text-[10px] bg-black/60 px-1 rounded">ID #401</span>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[9px] font-caption text-on-primary bg-black/50 px-1 rounded">[x:120, y:280]</span>
                    </div>
                  </div>
                  {/* Bounding Box 2: Car */}
                  <div className="absolute bottom-8 right-1/3 w-24 h-16 bg-brand-mint/20 rounded shadow-sm flex flex-col justify-between p-1 pointer-events-none border border-brand-mint">
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-mint text-body-strong font-caption-uppercase text-[10px] px-1 py-0.5 rounded font-semibold">CAR 94.1%</span>
                      <span className="text-body-strong font-caption text-[10px] bg-white/80 px-1 rounded">ID #402</span>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[9px] font-caption text-white bg-black/50 px-1 rounded">[x:450, y:310]</span>
                    </div>
                  </div>
                  {/* Bounding Box 3: Motorcycle */}
                  <div className="absolute top-1/3 right-1/4 w-14 h-12 bg-brand-peach/20 rounded shadow-sm flex flex-col justify-between p-1 pointer-events-none border border-brand-peach">
                    <span className="bg-brand-peach text-body-strong font-caption-uppercase text-[9px] px-1 py-0.5 rounded font-semibold">MOTO 89%</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                  <div className="bg-surface-dark-elevated p-2 rounded-lg border border-white/5">
                    <span className="block text-brand-mint font-title-sm text-title-sm">18</span>
                    <span className="font-caption text-[11px] text-brand-mint/80">Cars</span>
                  </div>
                  <div className="bg-surface-dark-elevated p-2 rounded-lg border border-white/5">
                    <span className="block text-brand-coral font-title-sm text-title-sm">03</span>
                    <span className="font-caption text-[11px] text-brand-mint/80">Buses</span>
                  </div>
                  <div className="bg-surface-dark-elevated p-2 rounded-lg border border-white/5">
                    <span className="block text-brand-peach font-title-sm text-title-sm">05</span>
                    <span className="font-caption text-[11px] text-brand-mint/80">Trucks</span>
                  </div>
                  <div className="bg-surface-dark-elevated p-2 rounded-lg border border-white/5">
                    <span className="block text-brand-ochre font-title-sm text-title-sm">04</span>
                    <span className="font-caption text-[11px] text-brand-mint/80">2-Wheelers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-mint text-body-strong font-caption-uppercase text-caption-uppercase text-[11px]">
                  STAGE 02
                </span>
                <span className="font-caption text-caption text-muted">Neural Localization</span>
              </div>
              <h2 className="font-display-sm text-display-sm text-body-strong">02 — Vehicle Detection</h2>
              <p className="font-body-md text-body-md text-body leading-relaxed">
                The computer vision model detects supported classes—cars, buses, trucks, motorcycles, and bicycles. Each bounding box is localized with coordinates and confidence thresholds.
              </p>
              <div className="flex flex-col gap-2 pt-space-xs">
                <div className="p-3 bg-surface-card rounded-xl flex items-start gap-3 border border-hairline">
                  <span className="material-symbols-outlined text-body-strong mt-0.5">category</span>
                  <div>
                    <span className="font-title-sm text-title-sm text-body-strong block">Multi-class Vectorization</span>
                    <span className="font-body-sm text-body-sm text-body">Distinguishes standard commercial footprints from long articulated heavy vehicles.</span>
                  </div>
                </div>
                <div className="p-3 bg-surface-card rounded-xl flex items-start gap-3 border border-hairline">
                  <span className="material-symbols-outlined text-body-strong mt-0.5">speed</span>
                  <div>
                    <span className="font-title-sm text-title-sm text-body-strong block">Confidence Pruning (≥ 0.25)</span>
                    <span className="font-body-sm text-body-sm text-body">Suppresses duplicate overlapping candidates using non-maximum suppression (NMS).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 03: Congestion Estimation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-lavender text-body-strong font-caption-uppercase text-caption-uppercase text-[11px]">
                  STAGE 03
                </span>
                <span className="font-caption text-caption text-muted">Density Analytics</span>
              </div>
              <h2 className="font-display-sm text-display-sm text-body-strong">03 — Congestion Estimation</h2>
              <p className="font-body-md text-body-md text-body leading-relaxed">
                Detected vehicles are weighted by vehicle footprint and road occupancy to generate a prototype congestion score between 0 and 100, categorizing flow into Low, Moderate, or Heavy.
              </p>
              <div className="p-4 bg-surface-card rounded-2xl space-y-3 border border-hairline">
                <div className="font-caption-uppercase text-caption-uppercase text-body-strong text-[11px]">WEIGHT EQUATION SPEC</div>
                <div className="p-3 bg-canvas rounded-lg font-caption text-caption text-body-strong leading-relaxed font-mono border border-hairline/60">
                  Score = Σ (Count<sub>i</sub> × Weight<sub>i</sub>) / RoadAreaNorm × 100
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-canvas rounded-lg border border-hairline/60">
                    <span className="text-muted block">Bus Weight</span>
                    <span className="font-title-sm text-title-sm text-body-strong">3.2x</span>
                  </div>
                  <div className="p-2 bg-canvas rounded-lg border border-hairline/60">
                    <span className="text-muted block">Truck Weight</span>
                    <span className="font-title-sm text-title-sm text-body-strong">2.5x</span>
                  </div>
                  <div className="p-2 bg-canvas rounded-lg border border-hairline/60">
                    <span className="text-muted block">Car Weight</span>
                    <span className="font-title-sm text-title-sm text-body-strong">1.0x</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-brand-lavender text-body-strong p-space-lg rounded-2xl shadow-sm border border-hairline">
                <div className="bg-canvas rounded-xl p-space-md shadow-xs border border-hairline/60">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-surface-soft px-3 py-2 rounded-lg border border-hairline/60">
                    <span className="font-caption-uppercase text-caption-uppercase text-body-strong text-[11px]">DENSITY_SCORING_MODULE</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-coral text-on-primary font-caption text-caption font-semibold">HEAVY FLOW</span>
                  </div>
                  {/* SVG Density Chart Diagram */}
                  <div className="mb-4 bg-surface-soft p-4 rounded-xl border border-hairline/60">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-title-sm text-title-sm text-body-strong">Congestion Index Meter</span>
                      <span className="font-title-lg text-title-lg text-body-strong">74 <span className="text-sm font-normal text-muted">/ 100</span></span>
                    </div>
                    {/* Linear Meter */}
                    <div className="w-full bg-surface-strong h-4 rounded-full overflow-hidden flex mb-3">
                      <div className="bg-brand-mint h-full" style={{ width: '30%' }}></div>
                      <div className="bg-brand-ochre h-full" style={{ width: '30%' }}></div>
                      <div className="bg-brand-coral h-full" style={{ width: '14%' }}></div>
                      <div className="bg-canvas h-full opacity-20" style={{ width: '26%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted font-caption px-1">
                      <span>0 (Free Flow)</span>
                      <span>35 (Moderate)</span>
                      <span>65 (Critical)</span>
                      <span>100 (Gridlock)</span>
                    </div>
                  </div>
                  {/* Inline SVG Flow Distribution Sparkline */}
                  <div className="bg-canvas p-3 rounded-xl flex items-center justify-between gap-4 border border-hairline/60">
                    <div>
                      <span className="font-caption text-caption text-muted block">Road Surface Occupancy</span>
                      <span className="font-title-sm text-title-sm text-body-strong">68.2% Saturated</span>
                    </div>
                    <div className="w-36 h-10">
                      <svg className="w-full h-full text-brand-teal" fill="none" viewBox="0 0 140 40">
                        <path d="M0 35 C 20 30, 40 38, 60 22 C 80 8, 100 18, 120 12 C 130 8, 135 4, 140 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                        <path d="M0 35 C 20 30, 40 38, 60 22 C 80 8, 100 18, 120 12 C 130 8, 135 4, 140 2 L 140 40 L 0 40 Z" fill="currentColor" fillOpacity="0.1"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 04: Signal Priority Advisory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-brand-peach text-body-strong p-space-lg rounded-2xl shadow-sm border border-hairline">
                <div className="bg-canvas rounded-xl p-space-md shadow-xs border border-hairline/60">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-surface-soft px-3 py-2 rounded-lg border border-hairline/60">
                    <span className="font-caption-uppercase text-caption-uppercase text-body-strong text-[11px]">SIGNAL_HEURISTIC_OUTPUT</span>
                    <span className="font-caption text-caption text-body">Target: Phase 02 Green Extension</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {/* Physical Traffic Light Representation */}
                    <div className="bg-surface-dark p-4 rounded-xl flex flex-col items-center justify-around h-48 shadow-inner border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-error/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-error/40"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-warning/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-warning/40"></div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-success ring-4 ring-white/30 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex flex-col justify-between bg-surface-soft p-3 rounded-xl border border-hairline/60">
                      <div>
                        <span className="font-caption-uppercase text-caption-uppercase text-brand-coral block mb-1 text-[11px]">Transit Priority Flagged</span>
                        <h3 className="font-title-sm text-title-sm text-body-strong mb-1">3 Transit Units in Queue</h3>
                        <p className="font-body-sm text-body-sm text-body mb-2">High occupant volume warrants an estimated +15s green phase extension to prevent transit cluster delay.</p>
                      </div>
                      <div className="p-2.5 bg-canvas rounded-lg flex items-center justify-between border border-hairline/60">
                        <span className="font-caption text-caption text-muted">Baseline Split</span>
                        <span className="font-caption text-caption text-body-strong">45s / 45s</span>
                      </div>
                      <div className="p-2.5 bg-canvas rounded-lg flex items-center justify-between mt-1 border border-hairline/60">
                        <span className="font-caption text-caption text-muted">Proposed Split</span>
                        <span className="font-caption text-caption text-body-strong font-semibold">60s / 30s (+15s)</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-soft rounded-xl flex items-center justify-between border border-hairline/60">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-body-strong text-lg">lightbulb</span>
                      <span className="font-caption text-caption text-body-strong">Simulated queue dissipation benefit</span>
                    </div>
                    <span className="font-caption text-caption text-success font-semibold">-22% Wait Time</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-peach text-body-strong font-caption-uppercase text-caption-uppercase text-[11px]">
                  STAGE 04
                </span>
                <span className="font-caption text-caption text-muted">Simulation Engine</span>
              </div>
              <h2 className="font-display-sm text-display-sm text-body-strong">04 — Signal Priority Advisory</h2>
              <p className="font-body-md text-body-md text-body leading-relaxed">
                Based on vehicle class distribution (prioritizing high-capacity public transit vehicles) and localized congestion density, the heuristic engine calculates prototype signal adjustments.
              </p>
              <div className="p-3 bg-surface-card rounded-xl flex items-start gap-3 border border-hairline">
                <span className="material-symbols-outlined text-body-strong mt-0.5">transit_enterexit</span>
                <div>
                  <span className="font-title-sm text-title-sm text-body-strong block">Public Transit Favoring</span>
                  <span className="font-body-sm text-body-sm text-body">Multi-passenger vehicles receive triple weight in the split calculation to balance passenger throughput rather than pure vehicle volume.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Disclaimer / Scope Statement */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="p-space-lg rounded-2xl bg-surface-card shadow-sm flex flex-col sm:flex-row items-start gap-space-md border border-hairline">
            <div className="w-10 h-10 rounded-full bg-brand-ochre flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-body-strong text-xl">gavel</span>
            </div>
            <div>
              <h4 className="font-title-sm text-title-sm text-body-strong mb-1">Prototype Limitations &amp; Architecture Boundaries</h4>
              <p className="font-body-sm text-body-sm text-body leading-relaxed">
                TrafficMind AI is an educational computer vision prototype designed for image-based assessment. It does not interface with municipal SCATS/SCOOT systems, real-time cameras, or live signal controllers. All mathematical recommendations are heuristic simulation representations produced for static test scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center max-w-xl mx-auto flex flex-col items-center gap-space-md">
          <h3 className="font-title-lg text-title-lg text-body-strong">Ready to test the inference model?</h3>
          <p className="font-body-md text-body-md text-muted">
            Upload an intersection image to evaluate detection accuracy, vehicle distributions, and automated phase recommendations.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-button text-button px-space-lg py-space-sm rounded-lg hover:bg-primary-active transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">upload_file</span>
            <span>Analyze Traffic Now</span>
          </button>
        </div>
      </section>
    </div>
  );
}
