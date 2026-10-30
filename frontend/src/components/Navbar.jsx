import React from 'react';

export default function Navbar({ currentPath, onNavigate }) {
  const isOverview = currentPath === '/' || currentPath === 'overview';
  const isAnalyze = currentPath === '/dashboard' || currentPath === '/analyze' || currentPath === 'analyze';
  const isHowItWorks = currentPath === '/how-it-works' || currentPath === 'how-it-works';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-canvas border-b border-hairline">
      <div className="h-16 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
        {/* Brand Group */}
        <div 
          className="flex items-center gap-space-sm cursor-pointer select-none"
          onClick={() => onNavigate('/')}
        >
          <img 
            alt="TrafficMind AI Logo" 
            className="h-10 w-auto object-contain rounded-md" 
            src="/trafficmind-logo.png" 
          />
          <span className="bg-surface-card text-body-strong rounded-full px-2.5 py-0.5 font-caption-uppercase text-caption-uppercase text-[11px] border border-hairline/60">
            PROTOTYPE
          </span>
        </div>

        {/* Center Navigation Pill Strip */}
        <nav className="hidden md:flex items-center gap-space-sm bg-canvas p-1">
          <button 
            type="button"
            onClick={() => onNavigate('/')}
            className={`px-space-md py-space-xs transition-colors rounded-full font-nav-link text-nav-link ${
              isOverview 
                ? 'bg-surface-card text-on-surface font-semibold' 
                : 'text-muted hover:text-on-surface'
            }`}
          >
            Overview
          </button>
          <button 
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className={`px-space-md py-space-xs transition-colors rounded-full font-nav-link text-nav-link ${
              isAnalyze 
                ? 'bg-surface-card text-on-surface font-semibold' 
                : 'text-muted hover:text-on-surface'
            }`}
          >
            Analyze Traffic
          </button>
          <button 
            type="button"
            onClick={() => onNavigate('/how-it-works')}
            className={`px-space-md py-space-xs transition-colors rounded-full font-nav-link text-nav-link ${
              isHowItWorks 
                ? 'bg-surface-card text-on-surface font-semibold' 
                : 'text-muted hover:text-on-surface'
            }`}
          >
            How It Works
          </button>
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex items-center gap-space-xs bg-surface-card px-space-sm py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span className="font-caption text-caption text-body">Prototype Active</span>
          </div>
          
          <button 
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className="bg-primary text-on-primary font-button text-button rounded-lg px-space-md py-space-sm hover:bg-primary-active transition-colors flex items-center"
          >
            Analyze Traffic
          </button>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
