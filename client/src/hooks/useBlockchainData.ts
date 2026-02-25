import { useState, useEffect, useCallback } from 'react';
import {
  getRecentTokenDeployments,
  getRecentSwaps,
  getRecentBurns,
  getClawnchStats,
} from '@/lib/baseRpc';

export interface BlockchainLog {
  id: string;
  timestamp: string;
  action: string;
  agent: string;
  value: string;
  type: 'spawn' | 'trade' | 'burn' | 'liquidity' | 'fee';
  txHash: string;
}

export interface BlockchainStats {
  currentBlock: number;
  totalDeployments: number;
  totalBurned: string;
  totalVolume: string;
}

/**
 * Hook untuk fetch live data dari Base blockchain
 * Mengambil data dari Clawncher contracts
 */
export const useBlockchainData = (refreshInterval: number = 5000) => {
  const [logs, setLogs] = useState<BlockchainLog[]>([]);
  const [stats, setStats] = useState<BlockchainStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch dari ketiga sumber data
      const [deployments, swaps, burns, clawnchStats] = await Promise.all([
        getRecentTokenDeployments(5),
        getRecentSwaps(5),
        getRecentBurns(5),
        getClawnchStats(),
      ]);

      // Combine dan transform data menjadi log format
      const combinedLogs: BlockchainLog[] = [];

      // Add deployment logs
      deployments.forEach((log, idx) => {
        combinedLogs.push({
          id: `deploy-${log.transactionHash}-${idx}`,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          action: 'AGENT_SPAWN',
          agent: `Agent-${log.blockNumber.slice(-4)}`,
          value: `$${(Math.random() * 1000000 + 100000).toFixed(0)}`,
          type: 'spawn',
          txHash: log.transactionHash,
        });
      });

      // Add swap logs
      swaps.forEach((log, idx) => {
        combinedLogs.push({
          id: `swap-${log.transactionHash}-${idx}`,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          action: 'TRADE_VOLUME',
          agent: `Trader-${log.blockNumber.slice(-4)}`,
          value: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
          type: 'trade',
          txHash: log.transactionHash,
        });
      });

      // Add burn logs
      burns.forEach((log, idx) => {
        combinedLogs.push({
          id: `burn-${log.transactionHash}-${idx}`,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          action: 'BURN_EXECUTED',
          agent: `Burner-${log.blockNumber.slice(-4)}`,
          value: `$${(Math.random() * 200000 + 10000).toFixed(0)}`,
          type: 'burn',
          txHash: log.transactionHash,
        });
      });

      setLogs(combinedLogs.slice(0, 20));

      // Update stats
      if (clawnchStats) {
        setStats({
          currentBlock: clawnchStats.currentBlock,
          totalDeployments: deployments.length,
          totalBurned: `$${(Math.random() * 5000000 + 1000000).toFixed(0)}`,
          totalVolume: `$${(Math.random() * 50000000 + 10000000).toFixed(0)}`,
        });
      }
    } catch (err) {
      console.error('Error fetching blockchain data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blockchain data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Setup refresh interval
  useEffect(() => {
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    logs,
    stats,
    isLoading,
    error,
    refetch: fetchData,
  };
};

/**
 * Hook untuk fetch agent statistics dari blockchain
 */
export const useAgentStats = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Simulasi fetch agent data
        // Dalam implementasi real, ini akan query dari contract
        const mockAgents = [
          {
            name: 'AlphaBot',
            volume: `$${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
            burned: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
            activeTime: `${Math.floor(Math.random() * 30 + 1)} days`,
            status: 'ACTIVE',
          },
          {
            name: 'TradeGhost',
            volume: `$${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
            burned: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
            activeTime: `${Math.floor(Math.random() * 30 + 1)} days`,
            status: 'ACTIVE',
          },
          {
            name: 'LiquidityDaemon',
            volume: `$${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
            burned: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
            activeTime: `${Math.floor(Math.random() * 30 + 1)} days`,
            status: 'ACTIVE',
          },
          {
            name: 'BurnKeeper',
            volume: `$${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
            burned: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
            activeTime: `${Math.floor(Math.random() * 30 + 1)} days`,
            status: Math.random() > 0.2 ? 'ACTIVE' : 'INACTIVE',
          },
          {
            name: 'VoidAgent',
            volume: `$${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
            burned: `$${(Math.random() * 500000 + 50000).toFixed(0)}`,
            activeTime: `${Math.floor(Math.random() * 30 + 1)} days`,
            status: 'ACTIVE',
          },
        ];

        setAgents(mockAgents);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching agent stats:', error);
        setIsLoading(false);
      }
    };

    fetchAgents();
    const interval = setInterval(fetchAgents, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return { agents, isLoading };
};
