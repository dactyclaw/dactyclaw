import { Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  command?: string;
  details?: string[];
}

interface DeployGuideProps {
  onNavigate?: (tab: string) => void;
}

const deploySteps: Step[] = [
  {
    number: '01',
    title: 'Create an Agent',
    description: 'Initialize your AI agent with DACTYCLAW. Your agent gets a name, DNA, wallet, and token.',
    command: '$ npx dactyclaw-agent-create',
    details: [
      'Agent receives unique DNA signature',
      'Wallet automatically generated',
      'Ready for token launch',
    ],
  },
  {
    number: '02',
    title: 'Fund Your Wallet',
    description: 'Transfer ETH to your agent wallet for deployment gas fees.',
    command: '$ dactyclaw wallet:fund --amount 0.5',
    details: [
      'Minimum 0.0005 ETH required',
      'Supports Base mainnet',
      'Instant confirmation',
    ],
  },
  {
    number: '03',
    title: 'Generate Token DNA',
    description: 'Create unique token configuration with supply, fees, and distribution.',
    command: '$ dactyclaw token:generate --name "MyToken" --symbol "MYTKN"',
    details: [
      'Set initial supply (100B tokens)',
      'Configure LP fee (500 bps default)',
      'Setup protocol fee (100 bps default)',
    ],
  },
  {
    number: '04',
    title: 'Launch Token on Uniswap V4',
    description: 'Deploy your token with MEV protection and liquidity pool on Base.',
    command: '$ dactyclaw token:launch --config token.json',
    details: [
      'Creates ERC-20 token',
      'Initializes Uniswap V4 pool',
      'Enables MEV protection',
      'Immediately tradeable',
    ],
  },
  {
    number: '05',
    title: 'Register On-Chain',
    description: 'Register your agent and token on Clawn registry for discovery.',
    command: '$ dactyclaw agent:register --token 0x...',
    details: [
      'Appears in DACTYCLAW monitor',
      'Listed on Clawnchpad',
      'Discoverable by traders',
      '80% of fees fund your agent',
    ],
  },
  {
    number: '06',
    title: 'Monitor & Manage',
    description: 'Track your agent activity, token performance, and fee distribution in real-time.',
    command: '$ dactyclaw agent:monitor',
    details: [
      'Live trading volume',
      'Fee collection status',
      'Liquidity management',
      'Agent performance metrics',
    ],
  },
];

export default function DeployGuide() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm uppercase tracking-widest font-bold text-accent">
            SPAWN
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            become an<br />operator
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            one command. your agent gets a name, DNA, wallet, and token. 80% of token fees fund your agent. 20% flow back to Clawn.
          </p>
        </div>

        {/* Quick Start Command */}
        <div className="terminal-card space-y-2 mt-6">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            [ QUICK START ]
          </div>
          <div className="space-y-2">
            <div className="bg-background/50 border border-accent/30 rounded p-3 font-mono text-sm flex items-center justify-between group hover:border-accent/60 transition-colors">
              <span className="text-foreground">$ npx dactyclaw-spawner</span>
              <button
                onClick={() => handleCopyCommand('npx dactyclaw-spawner')}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent/20 rounded"
              >
                <Copy size={16} className="text-accent" />
              </button>
            </div>
            {copiedCommand === 'npx dactyclaw-spawner' && (
              <div className="text-xs text-green-400">✓ Copied to clipboard</div>
            )}
            <div className="text-xs text-muted-foreground">
              or use the web spawner →
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {deploySteps.map((step, idx) => (
          <div key={idx} className="space-y-3">
            {/* Step Number & Title */}
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-accent tracking-widest">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Command Box */}
            {step.command && (
              <div className="ml-16 space-y-2">
                <div className="terminal-card space-y-2">
                  <div className="bg-background/50 border border-accent/30 rounded p-3 font-mono text-sm flex items-center justify-between group hover:border-accent/60 transition-colors">
                    <span className="text-foreground">{step.command}</span>
                    <button
                      onClick={() => handleCopyCommand(step.command!)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent/20 rounded"
                    >
                      <Copy size={16} className="text-accent" />
                    </button>
                  </div>
                  {copiedCommand === step.command && (
                    <div className="text-xs text-green-400">✓ Copied to clipboard</div>
                  )}
                </div>
              </div>
            )}

            {/* Details */}
            {step.details && (
              <div className="ml-16 space-y-2">
                {step.details.map((detail, detailIdx) => (
                  <div
                    key={detailIdx}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-accent">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            {idx < deploySteps.length - 1 && (
              <div className="ml-16 border-l-2 border-dashed border-accent/30 h-8" />
            )}
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="terminal-card space-y-3 mt-8">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ RESOURCES ]
        </div>
        <div className="space-y-2 text-sm">
          <button
            onClick={() => window.location.hash = '#docs'}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors w-full text-left"
          >
            <ExternalLink size={14} />
            Dactyclaw Documentation
          </button>
          <button
            onClick={() => window.location.hash = '#explorer'}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors w-full text-left"
          >
            <ExternalLink size={14} />
            Dactyclaw - Token Explorer
          </button>
          <a
            href="https://github.com/dactyclaw/dactyclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <ExternalLink size={14} />
            DACTYCLAW GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
