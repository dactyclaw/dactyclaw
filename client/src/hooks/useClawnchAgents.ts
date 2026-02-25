import { useState, useEffect, useCallback } from 'react';
import {
  getRecentAgentDeployments,
  getNetworkStats,
  getTotalVolume,
  getBurnStatistics,
  monitorAgentActivity,
  AgentData,
} from '@/lib/clawnchAgent';

export interface ClawnchStats {
  blockNumber: number;
  totalVolume: string;
  totalBurned: string;
  timestamp: number;
}

/**
 * Hook untuk fetch live agent data dari Clawncher blockchain
 */
export const useClawnchAgents = (refreshInterval: number = 10000) => {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [stats, setStats] = useState<ClawnchStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch agents dan stats in parallel
      const [agentsList, networkStats, totalVolume, totalBurned] = await Promise.all([
        getRecentAgentDeployments(5),
        getNetworkStats(),
        getTotalVolume(),
        getBurnStatistics(),
      ]);

      setAgents(agentsList);

      if (networkStats) {
        setStats({
          blockNumber: networkStats.blockNumber,
          totalVolume,
          totalBurned,
          timestamp: networkStats.timestamp,
        });
      }
    } catch (err) {
      console.error('Error fetching Clawnch agents:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Setup refresh interval
  useEffect(() => {
    const interval = setInterval(fetchAgents, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchAgents, refreshInterval]);

  // Setup real-time monitoring
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    (async () => {
      try {
        unsubscribe = await monitorAgentActivity((newAgents) => {
          setAgents(newAgents);
        });
      } catch (err) {
        console.error('Error setting up agent monitoring:', err);
      }
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    agents,
    stats,
    isLoading,
    error,
    refetch: fetchAgents,
  };
};
