import { useState, useEffect } from 'react';
import DeployGuide from '@/components/DeployGuide';
import DactyclawDocs from '@/components/DactyclawDocs';
import DactyclawExplorer from '@/components/DactyclawExplorer';

/**
 * DACTYCLAW - Simple Terminal UI like Basedaemon
 * Clean, minimal, focus on content
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState('deploy');

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'docs' || hash === 'explorer' || hash === 'deploy') {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-dashed border-accent bg-background py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-2">
            [ DACTYCLAW ]
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
            Agent Monitor & Deployer for Clawn Ecosystem
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b-2 border-dashed border-accent bg-background/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex gap-4 md:gap-8">
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 px-4 uppercase text-xs md:text-sm font-bold tracking-wider transition-colors border-b-2 ${
              activeTab === 'deploy'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            [ DEPLOY ]
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`py-3 px-4 uppercase text-xs md:text-sm font-bold tracking-wider transition-colors border-b-2 ${
              activeTab === 'explorer'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            [ EXPLORER ]
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`py-3 px-4 uppercase text-xs md:text-sm font-bold tracking-wider transition-colors border-b-2 ${
              activeTab === 'docs'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            [ DOCS ]
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'deploy' && <DeployGuide />}
          {activeTab === 'explorer' && <DactyclawExplorer />}
          {activeTab === 'docs' && <DactyclawDocs />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-dashed border-accent bg-background/50 py-4 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            [ DACTYCLAW v2.2 ] — Live Agent Infrastructure for Clawn Ecosystem on Base
          </div>
        </div>
      </footer>
    </div>
  );
}
