import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Menu, X } from 'lucide-react';
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { useClawnchpadTokens } from '@/hooks/useClawnchpadTokens';
import TerminalLog from '@/components/TerminalLog';
import AgentLeaderboard from '@/components/AgentLeaderboard';
import AgentDeployer from '@/components/AgentDeployer';
import DocsPanel from '@/components/DocsPanel';

/**
 * DACTYLOG - Stasiun Pemantau & Peluncuran Agent
 * 
 * Sekarang dengan live data dari Clawnchpad!
 * Mengambil data real-time dari top tokens di Clawnchpad
 */

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('monitor');
  const { logs, stats, isLoading, error } = useBlockchainData(5000);
  const { tokens: clawnchTokens, isLoading: tokensLoading, error: tokensError } = useClawnchpadTokens(30000);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-dashed border-accent bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold uppercase tracking-widest">
              [ DACTYLOG ]
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider hidden sm:block">
              {isLoading ? 'Connecting...' : 'Agent Monitor & Deployer'}
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-accent/20 rounded transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`
          w-64 border-r-2 border-dashed border-accent bg-card/30 p-6 
          flex flex-col gap-4 overflow-y-auto
          absolute md:relative left-0 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full z-40 md:z-auto
          transition-all duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-background/95 md:bg-card/30
        `}
        >
          <nav className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleTabChange('monitor')}
                className={`w-full justify-start text-left uppercase tracking-wider text-xs font-bold p-3 rounded transition-colors ${
                  activeTab === 'monitor'
                    ? 'bg-accent/20 text-accent'
                    : 'hover:bg-accent/10'
                }`}
              >
                [ MONITOR ]
              </button>
              <button
                onClick={() => handleTabChange('deploy')}
                className={`w-full justify-start text-left uppercase tracking-wider text-xs font-bold p-3 rounded transition-colors ${
                  activeTab === 'deploy'
                    ? 'bg-accent/20 text-accent'
                    : 'hover:bg-accent/10'
                }`}
              >
                [ DEPLOY ]
              </button>
              <button
                onClick={() => handleTabChange('docs')}
                className={`w-full justify-start text-left uppercase tracking-wider text-xs font-bold p-3 rounded transition-colors ${
                  activeTab === 'docs'
                    ? 'bg-accent/20 text-accent'
                    : 'hover:bg-accent/10'
                }`}
              >
                [ DOCS ]
              </button>
            </div>
          </nav>

          {/* Stats Panel */}
          <div className="terminal-card mt-auto">
            <div className="text-xs uppercase tracking-wider font-bold mb-3 text-accent">
              [ SYSTEM STATUS ]
            </div>
            <div className="space-y-2 text-xs">
              {isLoading ? (
                <div className="text-muted-foreground animate-pulse">[ LOADING... ]</div>
              ) : error ? (
                <div className="text-red-500">[ ERROR ]</div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>Block:</span>
                    <span className="text-accent font-bold">{stats?.currentBlock || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens:</span>
                    <span className="text-accent font-bold">{clawnchTokens.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-accent font-bold">LIVE</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* MONITOR TAB */}
          {activeTab === 'monitor' && (
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold uppercase tracking-widest">
                    [ LIVE ACTIVITY MONITOR ]
                  </h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {isLoading ? 'Connecting to Base blockchain...' : 'Real-time agent activity from blockchain'}
                  </p>
                </div>

                {/* Live Log Terminal */}
                {error && (
                  <div className="terminal-card border-red-500 text-red-500">
                    <div className="text-xs">[ CONNECTION ERROR ]</div>
                    <div className="text-xs mt-2">{error}</div>
                  </div>
                )}

                {logs.length > 0 ? (
                  <TerminalLog logs={logs} maxHeight="max-h-96" />
                ) : isLoading ? (
                  <div className="terminal-card max-h-96 overflow-y-auto space-y-1 font-mono text-sm flex items-center justify-center">
                    <div className="text-muted-foreground animate-pulse">
                      [ FETCHING BLOCKCHAIN DATA... ]
                    </div>
                  </div>
                ) : error ? (
                  <div className="terminal-card max-h-96 border-red-500 text-red-500 flex items-center justify-center">
                    <div className="text-xs">[ CONNECTION ERROR: {error} ]</div>
                  </div>
                ) : (
                  <div className="terminal-card max-h-96 overflow-y-auto space-y-1 font-mono text-sm flex items-center justify-center">
                    <div className="text-muted-foreground">
                      [ NO RECENT ACTIVITY ]
                    </div>
                  </div>
                )}
              </div>

              {/* Clawnchpad Top Tokens */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest">
                  [ TOP TOKENS FROM CLAWNCHPAD ] {tokensLoading && <span className="text-xs text-muted-foreground">[ LOADING... ]</span>}
                </h3>
                {tokensError ? (
                  <div className="terminal-card text-center py-8 text-red-500">
                    [ ERROR: {tokensError} ]
                  </div>
                ) : clawnchTokens.length > 0 ? (
                  <AgentLeaderboard agents={clawnchTokens} />
                ) : (
                  <div className="terminal-card text-center py-8 text-muted-foreground">
                    [ LOADING TOKENS FROM CLAWNCHPAD... ]
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DEPLOY TAB */}
          {activeTab === 'deploy' && (
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest">
                  [ AGENT DEPLOYER ]
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Configure & launch your agent
                </p>
              </div>

              <AgentDeployer />
            </div>
          )}

          {/* DOCS TAB */}
          {activeTab === 'docs' && (
            <div className="p-4 md:p-6 space-y-6">
              <DocsPanel />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-dashed border-accent bg-card/30 p-4 text-center text-xs text-muted-foreground uppercase tracking-wider">
        <div>[ DACTYLOG v1.3 ] — Live Agent Infrastructure for Clawn Ecosystem on Base</div>
      </footer>
    </div>
  );
}
