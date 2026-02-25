import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Menu, X } from 'lucide-react';
import { useLiveAgentData } from '@/hooks/useLiveAgentData';
import TerminalLog from '@/components/TerminalLog';
import AgentLeaderboard from '@/components/AgentLeaderboard';
import AgentDeployer from '@/components/AgentDeployer';

/**
 * DACTYLOG - Stasiun Pemantau & Peluncuran Agent
 * 
 * Design Philosophy:
 * - Terminal-first dark mode dengan hijau neon accent
 * - CRT scanline effects dan dashed borders (ala clawn.ch)
 * - Live data streaming dengan animasi pulse
 * - Estetika underground/hacker yang serius
 */

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logs, stats } = useLiveAgentData(20);

  // Mock archive data
  const archiveData = [
    { id: 'AGENT-001', deployed: '2 days ago', status: 'ACTIVE', burn: '$125K' },
    { id: 'AGENT-002', deployed: '5 days ago', status: 'ACTIVE', burn: '$98K' },
    { id: 'AGENT-003', deployed: '1 week ago', status: 'INACTIVE', burn: '$45K' },
    { id: 'AGENT-004', deployed: '2 weeks ago', status: 'ACTIVE', burn: '$156K' },
  ];

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
              Agent Monitor & Deployer
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
            <Tabs defaultValue="monitor" className="w-full" onValueChange={() => setSidebarOpen(false)}>
              <TabsList className="flex flex-col w-full bg-transparent h-auto gap-2">
                <TabsTrigger
                  value="monitor"
                  className="w-full justify-start text-left uppercase tracking-wider text-xs font-bold data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
                >
                  [ MONITOR ]
                </TabsTrigger>
                <TabsTrigger
                  value="deploy"
                  className="w-full justify-start text-left uppercase tracking-wider text-xs font-bold data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
                >
                  [ DEPLOY ]
                </TabsTrigger>
                <TabsTrigger
                  value="archive"
                  className="w-full justify-start text-left uppercase tracking-wider text-xs font-bold data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
                >
                  [ ARCHIVE ]
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>

          {/* Stats Panel */}
          <div className="terminal-card mt-auto">
            <div className="text-xs uppercase tracking-wider font-bold mb-3 text-accent">
              [ SYSTEM STATUS ]
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Active Agents:</span>
                <span className="text-accent font-bold">47</span>
              </div>
              <div className="flex justify-between">
                <span>Total Burned:</span>
                <span className="text-accent font-bold">$2.3M</span>
              </div>
              <div className="flex justify-between">
                <span>24h Volume:</span>
                <span className="text-accent font-bold">$15.8M</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Tabs defaultValue="monitor" className="w-full h-full">
            {/* MONITOR TAB */}
            <TabsContent value="monitor" className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold uppercase tracking-widest">
                    [ LIVE ACTIVITY MONITOR ]
                  </h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Real-time agent activity stream
                  </p>
                </div>

                {/* Live Log Terminal */}
                <TerminalLog logs={logs} maxHeight="max-h-96" />
              </div>

              {/* Agent Leaderboard */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest">
                  [ TOP AGENTS ]
                </h3>
                <AgentLeaderboard agents={stats} />
              </div>
            </TabsContent>

            {/* DEPLOY TAB */}
            <TabsContent value="deploy" className="p-4 md:p-6 space-y-6">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest">
                  [ AGENT DEPLOYER ]
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Configure & launch your agent
                </p>
              </div>

              <AgentDeployer />
            </TabsContent>

            {/* ARCHIVE TAB */}
            <TabsContent value="archive" className="p-4 md:p-6 space-y-6">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest">
                  [ ARCHIVE ]
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Historical agent data & statistics
                </p>
              </div>

              <div className="terminal-card space-y-4">
                <div className="text-xs uppercase tracking-wider font-bold mb-4 text-accent">
                  [ DEPLOYED AGENTS ]
                </div>
                <div className="space-y-3">
                  {archiveData.map((agent, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs py-3 px-2 border-b border-dashed border-accent/30 last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">[{agent.id}]</span>
                        <span className="font-bold">{agent.deployed}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={
                            agent.status === 'ACTIVE' ? 'text-accent' : 'text-muted-foreground'
                          }
                        >
                          {agent.status}
                        </span>
                        <span className="text-accent">{agent.burn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-dashed border-accent bg-card/30 p-4 text-center text-xs text-muted-foreground uppercase tracking-wider">
        <div>[ DACTYLOG v1.0 ] — Agent Infrastructure for Clawn Ecosystem</div>
      </footer>
    </div>
  );
}
