export default function DactyclawDocs() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold uppercase tracking-widest">
          [ DACTYCLAW DOCUMENTATION ]
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete guide to creating and launching AI agents with Dactyclaw
        </p>
      </div>

      {/* Quick Start */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ QUICK START ]
        </div>
        <div className="space-y-2 text-sm">
          <p>Get started with Dactyclaw in 2 commands:</p>
          <pre className="bg-background/50 p-3 rounded text-xs overflow-x-auto">
{`# Step 1: Create agent
$ npx dacty-create

# Step 2: Launch token
$ npx dacty-launch`}
          </pre>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ CORE CONCEPTS ]
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold mb-1">Agent</h4>
            <p className="text-xs text-muted-foreground">
              An autonomous entity with unique DNA, wallet address, and private key. Each agent can launch one or more tokens and earn fees from trading activity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Agent DNA</h4>
            <p className="text-xs text-muted-foreground">
              A unique identifier for your agent. Generated automatically when you run `npx dacty-create`. Used to link tokens and track earnings.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Private Key</h4>
            <p className="text-xs text-muted-foreground">
              Securely stored in .env file. Used to sign token deployment transactions. Never share or commit to version control.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Fee Distribution</h4>
            <p className="text-xs text-muted-foreground">
              80% of trading fees go to your agent wallet. 20% flow to Dactyclaw protocol. Fees are automatically distributed from every trade.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Base Network</h4>
            <p className="text-xs text-muted-foreground">
              Dactyclaw agents and tokens are deployed on Base mainnet. Tokens are deployed via Clanker for instant trading capability.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ STEP-BY-STEP GUIDE ]
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold font-mono mb-2">Step 1: Create Agent</h4>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto mb-2">
{`$ npx dacty-create

? Agent name: MyAgent

✓ Agent created with DNA: abc123...
✓ Wallet: 0x...
✓ Private key saved in .env`}
            </pre>
            <p className="text-xs text-muted-foreground">
              Creates a new agent with unique DNA, wallet address, and private key. Project structure is generated with all necessary files.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-2">Step 2: Launch Token</h4>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto mb-2">
{`$ npx dacty-launch

? Token name: My Token
? Token symbol: MYTKN

✓ Token deployed to Base
✓ Fee distribution configured (80% Agent, 20% Dactyclaw)
✓ Token address: 0x...`}
            </pre>
            <p className="text-xs text-muted-foreground">
              Deploys your token to Base network via Clanker. Token is immediately tradeable. Fees are automatically distributed.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-2">Step 3: Monitor Earnings</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Visit <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clanker.world</a> to:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>• Find your token by symbol</li>
              <li>• Monitor trading volume</li>
              <li>• Track accumulated fees (80% to your wallet)</li>
              <li>• Withdraw earnings anytime</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CLI Commands */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ CLI COMMANDS ]
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">npx dacty-create</h4>
            <p className="text-xs text-muted-foreground">
              Create a new agent with unique DNA and wallet. Generates project structure with .env file containing private key.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">npx dacty-launch</h4>
            <p className="text-xs text-muted-foreground">
              Launch token for your agent. Deploys to Base via Clanker. Requires agent DNA and token configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ SECURITY ]
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• Private keys are stored locally in .env (never on servers)</p>
          <p>• .env is automatically added to .gitignore</p>
          <p>• Keep .env file safe and backed up</p>
          <p>• Never share your private key</p>
          <p>• Use dedicated wallet for agent (not main wallet)</p>
        </div>
      </div>

      {/* Requirements */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ REQUIREMENTS ]
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• Node.js 18 or higher</p>
          <p>• 0.0005 ETH on Base network (for gas fees)</p>
          <p>• Internet connection for blockchain interaction</p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ TROUBLESHOOTING ]
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold mb-1">Private key not found</h4>
            <p className="text-xs text-muted-foreground">
              Ensure .env file exists in your agent directory with PRIVATE_KEY set. Run `npx dacty-create` again if needed.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Insufficient gas</h4>
            <p className="text-xs text-muted-foreground">
              Ensure your wallet has at least 0.0005 ETH on Base network. Send ETH to your agent wallet address.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Token not appearing</h4>
            <p className="text-xs text-muted-foreground">
              Check Clanker.world for your token. Token address is shown after successful deployment. May take a few seconds to appear.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Transaction failed</h4>
            <p className="text-xs text-muted-foreground">
              Verify private key is correct and wallet has sufficient balance. Check Base network status and try again.
            </p>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ RESOURCES ]
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• <a href="https://github.com/dactyclaw/dactyclaw" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub Repository</a></p>
          <p>• <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clanker.world</a> - Token deployment and monitoring</p>
          <p>• <a href="https://www.npmjs.com/package/dacty-create" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">dacty-create on npm</a></p>
          <p>• <a href="https://www.npmjs.com/package/dacty-launch" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">dacty-launch on npm</a></p>
        </div>
      </div>
    </div>
  );
}
