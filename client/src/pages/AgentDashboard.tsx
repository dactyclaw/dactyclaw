import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Wallet, DollarSign, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface Agent {
  id: string;
  name: string;
  dna: string;
  wallet: string;
  token?: {
    name: string;
    symbol: string;
    contractAddress: string;
  };
  createdAt: string;
}

interface AgentStats {
  agentId: string;
  totalVolume: number;
  totalFees: number;
  agentEarnings: number;
  dactyclawEarnings: number;
  tradingCount: number;
  lastUpdated: string;
}

const mockAgents: Agent[] = [
  {
    id: "agent-001",
    name: "TradingBot Alpha",
    dna: "abc123def456",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    token: {
      name: "TradingBot Token",
      symbol: "TRADE",
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "agent-002",
    name: "LiquidityBot",
    dna: "xyz789uvw012",
    wallet: "0xabcdef1234567890abcdef1234567890abcdef12",
    token: {
      name: "Liquidity Token",
      symbol: "LIQ",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    },
    createdAt: "2026-02-22T14:30:00Z",
  },
];

const mockStats: AgentStats[] = [
  {
    agentId: "agent-001",
    totalVolume: 1250000,
    totalFees: 12500,
    agentEarnings: 10000,
    dactyclawEarnings: 2500,
    tradingCount: 342,
    lastUpdated: new Date().toISOString(),
  },
  {
    agentId: "agent-002",
    totalVolume: 850000,
    totalFees: 8500,
    agentEarnings: 6800,
    dactyclawEarnings: 1700,
    tradingCount: 218,
    lastUpdated: new Date().toISOString(),
  },
];

// Mock data for charts
const volumeData = [
  { time: "00:00", volume: 45000 },
  { time: "04:00", volume: 52000 },
  { time: "08:00", volume: 48000 },
  { time: "12:00", volume: 61000 },
  { time: "16:00", volume: 55000 },
  { time: "20:00", volume: 67000 },
  { time: "24:00", volume: 72000 },
];

const feeDistributionData = [
  { name: "Agent", value: 80, fill: "#00ff00" },
  { name: "Dactyclaw", value: 20, fill: "#00aa00" },
];

export default function AgentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(mockAgents[0]);
  const [stats, setStats] = useState<AgentStats | null>(mockStats[0]);

  useEffect(() => {
    if (selectedAgent) {
      const agentStats = mockStats.find((s) => s.agentId === selectedAgent.id);
      setStats(agentStats || null);
    }
  }, [selectedAgent]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Agent Dashboard</CardTitle>
            <CardDescription>Sign in to view your agent analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You need to be authenticated to access the dashboard.
            </p>
            <Button className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Agent Analytics</h1>
          <p className="text-muted-foreground">Monitor your agent performance and earnings in real-time</p>
        </div>

        {/* Agent Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAgents.map((agent) => (
              <Card
                key={agent.id}
                className={`cursor-pointer transition-all ${
                  selectedAgent?.id === agent.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{agent.dna}</CardDescription>
                </CardHeader>
                <CardContent>
                  {agent.token && (
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Token:</span> {agent.token.symbol}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">{agent.token.contractAddress}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        {selectedAgent && stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${(stats.totalVolume / 1000000).toFixed(2)}M</div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${stats.totalFees.toLocaleString()}</div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Your Earnings (80%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-500">${stats.agentEarnings.toLocaleString()}</div>
                    <Wallet className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Trading Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{stats.tradingCount}</div>
                    <Activity className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Volume Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Volume (24h)</CardTitle>
                  <CardDescription>Hourly trading volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="volume" stroke="#00ff00" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Fee Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Fee Distribution</CardTitle>
                  <CardDescription>80% Agent, 20% Dactyclaw</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Agent (80%)</span>
                        <span className="font-semibold">${stats.agentEarnings.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Dactyclaw (20%)</span>
                        <span className="font-semibold">${stats.dactyclawEarnings.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-700 h-2 rounded-full"
                          style={{ width: "20%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="default">
                  Withdraw Earnings
                </Button>
                <Button className="w-full" variant="outline">
                  View on Clanker
                </Button>
                <Button className="w-full" variant="outline">
                  View on BaseScan
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
