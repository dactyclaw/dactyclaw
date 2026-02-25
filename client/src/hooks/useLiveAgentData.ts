import { useState, useEffect, useCallback } from 'react';

export interface AgentLog {
  id: string;
  timestamp: string;
  action: string;
  agent: string;
  value: string;
  type: 'spawn' | 'trade' | 'burn' | 'liquidity' | 'fee';
}

export interface AgentStats {
  name: string;
  volume: string;
  burned: string;
  activeTime: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const ACTIONS = [
  { action: 'AGENT_SPAWN', type: 'spawn' as const },
  { action: 'TOKEN_LAUNCH', type: 'spawn' as const },
  { action: 'LIQUIDITY_ADD', type: 'liquidity' as const },
  { action: 'BURN_EXECUTED', type: 'burn' as const },
  { action: 'TRADE_VOLUME', type: 'trade' as const },
  { action: 'FEE_COLLECTED', type: 'fee' as const },
];

const AGENTS = [
  'AlphaBot',
  'TradeGhost',
  'LiquidityDaemon',
  'BurnKeeper',
  'VoidAgent',
  'ShadowTrader',
  'NexusBot',
  'CryptoPhantom',
];

/**
 * Hook untuk mensimulasikan live agent activity stream
 * Menghasilkan log baru setiap 2-3 detik dengan data yang realistis
 */
export const useLiveAgentData = (maxLogs: number = 20) => {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [stats, setStats] = useState<AgentStats[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  const generateLog = useCallback((): AgentLog => {
    const actionData = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
    const value = (Math.random() * 5000000 + 100000).toFixed(0);
    
    return {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      action: actionData.action,
      agent,
      value: `$${(parseInt(value) / 1000).toFixed(1)}K`,
      type: actionData.type,
    };
  }, []);

  // Simulasi live log streaming
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [generateLog(), ...prev.slice(0, maxLogs - 1)]);
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [generateLog, maxLogs]);

  // Update stats setiap 5 detik
  useEffect(() => {
    const updateStats = () => {
      const newStats: AgentStats[] = AGENTS.slice(0, 5).map((agent) => ({
        name: agent,
        volume: `$${(Math.random() * 5 + 1).toFixed(1)}M`,
        burned: `$${(Math.random() * 200 + 10).toFixed(0)}K`,
        activeTime: `${Math.floor(Math.random() * 20 + 1)} days`,
        status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE',
      }));
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    logs,
    stats,
    isConnected,
  };
};

/**
 * Hook untuk mengelola form deploy dengan validasi
 */
export const useDeployForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    liquidityCurve: 'exponential',
  });

  const [generatedCode, setGeneratedCode] = useState('');

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const generateDeployCode = useCallback(() => {
    if (!formData.name || !formData.symbol || !formData.supply) {
      return '';
    }

    const code = `npx clawncher deploy \\
  --name "${formData.name}" \\
  --symbol "${formData.symbol.toUpperCase()}" \\
  --supply ${formData.supply} \\
  --liquidity-curve ${formData.liquidityCurve} \\
  --anti-human-auth enabled`;

    setGeneratedCode(code);
    return code;
  }, [formData]);

  const copyToClipboard = useCallback(async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      return true;
    }
    return false;
  }, [generatedCode]);

  return {
    formData,
    handleChange,
    generateDeployCode,
    generatedCode,
    copyToClipboard,
  };
};
