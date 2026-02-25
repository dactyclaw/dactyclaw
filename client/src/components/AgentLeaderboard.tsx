import { AgentStats } from '@/hooks/useLiveAgentData';

interface AgentLeaderboardProps {
  agents: AgentStats[];
}

/**
 * Komponen untuk menampilkan top agents dengan statistik real-time
 */
export const AgentLeaderboard = ({ agents }: AgentLeaderboardProps) => {
  return (
    <div className="terminal-card space-y-2">
      <div className="text-xs uppercase tracking-wider font-bold mb-4 text-accent">
        [ TOP AGENTS ]
      </div>
      <div className="space-y-0">
        {agents.length === 0 ? (
          <div className="text-xs text-muted-foreground p-4">
            [ LOADING AGENT DATA... ]
          </div>
        ) : (
          agents.map((agent, idx) => (
            <div
              key={`${agent.name}-${idx}`}
              className="flex justify-between items-center text-xs py-2 px-2 border-b border-dashed border-accent/30 last:border-0 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-muted-foreground w-6">
                  [{idx + 1}]
                </span>
                <div className="flex-1">
                  <div className="font-bold text-foreground">
                    {agent.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {agent.activeTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-accent font-bold">
                    {agent.volume}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    volume
                  </div>
                </div>
                <div className="text-right">
                  <div className={agent.status === 'ACTIVE' ? 'text-accent' : 'text-muted-foreground'}>
                    {agent.burned}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    burned
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`
                      text-xs font-bold uppercase tracking-wider px-2 py-1 rounded
                      ${agent.status === 'ACTIVE'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-muted/20 text-muted-foreground'
                      }
                    `}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentLeaderboard;
