import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OverviewView from './components/OverviewView';
import AnalyzeTrafficView from './components/AnalyzeTrafficView';
import HowItWorksView from './components/HowItWorksView';

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('/dashboard') || p.includes('/analyze') || p.includes('/traffic')) {
        return '/dashboard';
      }
      if (p.includes('/how-it-works')) {
        return '/how-it-works';
      }
    }
    return '/';
  });

  // Support browser Back and Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('/dashboard') || p.includes('/analyze') || p.includes('/traffic')) {
        setCurrentPath('/dashboard');
      } else if (p.includes('/how-it-works')) {
        setCurrentPath('/how-it-works');
      } else {
        setCurrentPath('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    let normalized = path;
    if (path === 'overview') normalized = '/';
    if (path === 'analyze') normalized = '/dashboard';
    if (path === 'how-it-works') normalized = '/how-it-works';

    setCurrentPath(normalized);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-canvas text-body font-body-md min-h-screen flex flex-col selection:bg-surface-card selection:text-body-strong">
      {/* Fixed Sticky Header */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="w-full pt-16 bg-canvas flex-grow">
        {currentPath === '/how-it-works' ? (
          <HowItWorksView onNavigate={handleNavigate} />
        ) : currentPath === '/dashboard' || currentPath === '/analyze' ? (
          <AnalyzeTrafficView onNavigate={handleNavigate} />
        ) : (
          <OverviewView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
