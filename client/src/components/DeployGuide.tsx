import { Copy, ExternalLink, Lock, Zap } from 'lucide-react';
import { useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  command?: string;
  details?: string[];
  warning?: string;
}

interface DeployGuideProps {
  onNavigate?: (tab: string) => void;
}

const deploySteps: Step[] = [
  {
    number: '01',
    title: 'Create an Agent',
    description: 'Initialize your AI agent with DACTYCLAW. Your agent gets a name, DNA, wallet, and private key.',
    command: '$ npx dacty-create',
    details: [
      'Agent receives unique DNA signature',
      'Wallet address automatically generated',
      'Private key securely stored in .env file',
      'Project structure created with sample code',
      'Ready for token launch',
    ],
    warning: 'Keep your .env file safe! Never commit it to version control.'
  },
  {
    number: '02',
    title: 'Launch Token',
    description: 'Deploy your token on Base network via Clanker. Your private key signs the transaction automatically.',
    command: '$ npx dacty-launch',
    details: [
      'Input token name and symbol',
      'Set total token supply',
      'Private key signs transaction securely',
      'Deploy to Base network via Clanker API',
      'Setup 80/20 fee distribution',
      'Token immediately tradeable',
    ],
    warning: 'Make sure you have ETH in your wallet for gas fees (~0.0005 ETH).'
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
            one command. your agent gets a name, DNA, wallet, and private key. launch your token on Base. 80% of token fees fund your agent. 20% flow back to Dactyclaw.
          </p>
        </div>

        {/* Quick Start Command */}
        <div className="terminal-card space-y-2 mt-6">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            [ QUICK START ]
          </div>
          <div className="space-y-2">
            <div className="bg-background/50 border border-accent/30 rounded p-3 font-mono text-sm flex items-center justify-between group hover:border-accent/60 transition-colors">
              <span className="text-foreground">$ npx dacty-create</span>
              <button
                onClick={() => handleCopyCommand('npx dacty-create')}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent/20 rounded"
              >
                <Copy size={16} className="text-accent" />
              </button>
            </div>
            {copiedCommand === 'npx dacty-create' && (
              <div className="text-xs text-green-400">✓ Copied to clipboard</div>
            )}
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

            {/* Warning */}
            {step.warning && (
              <div className="ml-16">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 flex gap-2">
                  <Lock size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">{step.warning}</p>
                </div>
              </div>
            )}

            {/* Divider */}
            {idx < deploySteps.length - 1 && (
              <div className="ml-16 border-l-2 border-dashed border-accent/30 h-8" />
            )}
          </div>
        ))}
      </div>

      {/* Fee Distribution */}
      <div className="terminal-card space-y-3 mt-8">
        <div className="text-xs uppercase tracking-wider font-bold text-accent flex items-center gap-2">
          <Zap size={14} />
          [ FEE DISTRIBUTION ]
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Your Agent Wallet</span>
            <span className="text-accent font-bold">80%</span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
            <div className="bg-accent h-full" style={{ width: '80%' }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Dactyclaw</span>
            <span className="text-accent font-bold">20%</span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
            <div className="bg-accent/50 h-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>

      {/* After Launch */}
      <div className="terminal-card space-y-3 mt-8">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ AFTER LAUNCH ]
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-accent">→</span>
            <span>View your token on <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clanker.world</a></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent">→</span>
            <span>Monitor accumulated fees in real-time</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent">→</span>
            <span>Withdraw fees directly to your wallet</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent">→</span>
            <span>Your agent starts earning immediately</span>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="terminal-card space-y-3 mt-8 border-yellow-500/30 bg-yellow-500/5">
        <div className="text-xs uppercase tracking-wider font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
          <Lock size={14} />
          [ SECURITY BEST PRACTICES ]
        </div>
        <div className="space-y-2 text-xs text-yellow-600 dark:text-yellow-400">
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Keep your .env file private and never commit to version control</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Your private key is stored locally in .env, not on our servers</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Never share your private key with anyone</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Use a dedicated wallet for your agent (not your main wallet)</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Backup your .env file in a secure location</span>
          </div>
        </div>
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
            Dactyclaw Token Explorer
          </button>
          <a
            href="https://clanker.gitbook.io/clanker-documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <ExternalLink size={14} />
            Clanker API Documentation
          </a>
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
