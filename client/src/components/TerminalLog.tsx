import { useEffect, useRef } from 'react';
import { AgentLog } from '@/hooks/useLiveAgentData';

interface TerminalLogProps {
  logs: AgentLog[];
  maxHeight?: string;
}

/**
 * Komponen untuk menampilkan live agent activity dalam format terminal
 * Dengan animasi fade-in dan auto-scroll ke bawah
 */
export const TerminalLog = ({ logs, maxHeight = 'max-h-96' }: TerminalLogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke bawah saat ada log baru
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getActionColor = (type: AgentLog['type']) => {
    switch (type) {
      case 'spawn':
        return 'text-accent';
      case 'burn':
        return 'text-red-500';
      case 'trade':
        return 'text-blue-400';
      case 'liquidity':
        return 'text-green-400';
      case 'fee':
        return 'text-yellow-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        terminal-card ${maxHeight} overflow-y-auto space-y-1 font-mono text-xs
        bg-background/50 border-2 border-dashed border-accent
      `}
    >
      {logs.length === 0 ? (
        <div className="text-muted-foreground animate-pulse p-4">
          [ WAITING FOR DATA STREAM... ]
        </div>
      ) : (
        logs.map((log) => (
          <div
            key={log.id}
            className="flex gap-2 px-2 py-1 animate-in fade-in duration-300 hover:bg-accent/5 transition-colors"
          >
            <span className="text-muted-foreground flex-shrink-0 w-8">
              {log.timestamp}
            </span>
            <span className={`font-bold flex-shrink-0 w-20 ${getActionColor(log.type)}`}>
              {log.action}
            </span>
            <span className="text-foreground flex-shrink-0 w-24">
              {log.agent}
            </span>
            <span className="text-accent ml-auto flex-shrink-0">
              {log.value}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default TerminalLog;
