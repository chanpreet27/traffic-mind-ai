import React from 'react';
import logoUrl from '../assets/trafficmind-logo.png';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-surface-soft border-t border-hairline py-space-xl mt-auto">
      <div className="max-w-7xl mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-gutter pb-space-lg border-b border-hairline">
          <div 
            className="flex items-center gap-space-sm cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <img 
              alt="TrafficMind AI Logo" 
              className="h-9 w-auto object-contain rounded-md" 
              src={logoUrl} 
            />
          </div>
          <nav className="flex flex-wrap items-center gap-space-lg">
            <button 
              type="button" 
              onClick={() => onNavigate('/')}
              className="font-nav-link text-nav-link text-muted hover:text-on-surface transition-colors"
            >
              Overview
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('/dashboard')}
              className="font-nav-link text-nav-link text-muted hover:text-on-surface transition-colors"
            >
              Analyze Traffic
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('/how-it-works')}
              className="font-nav-link text-nav-link text-muted hover:text-on-surface transition-colors"
            >
              How It Works
            </button>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pt-space-xs">
          <p className="font-caption text-caption text-muted max-w-2xl">
            TrafficMind AI is an image-based simulation prototype. It is not connected to real-world traffic signal infrastructure.
          </p>
          <p className="font-caption text-caption text-muted">
            © 2025 TrafficMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
