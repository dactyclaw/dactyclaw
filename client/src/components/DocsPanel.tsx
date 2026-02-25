/**
 * Documentation Panel untuk DACTYLOG
 */

export default function DocsPanel() {
  const docs = [
    {
      title: 'What is DACTYLOG?',
      content: 'DACTYLOG is a real-time monitoring and deployment station for AI agents in the Clawn ecosystem. Monitor live token activity on Base blockchain and deploy new agents using Clawncher SDK.',
    },
    {
      title: 'Monitor Tab',
      content: 'View live activity from Base blockchain including token deployments, trades, and burns. Top tokens from Clawnchpad are displayed with real-time price and market cap data. Updates every 30 seconds.',
    },
    {
      title: 'Deploy Tab',
      content: 'Configure and generate deployment commands for your AI agent token. Set parameters like name, symbol, liquidity, and fees. Copy the generated command to launch your agent.',
    },
    {
      title: 'System Status',
      content: 'Left sidebar shows current block number, number of tokens tracked, and system status. All data is fetched live from Base blockchain and Clawnchpad.',
    },
    {
      title: 'Resources',
      content: 'Visit https://clawn.ch/ for Clawncher SDK documentation. Visit https://clawn.ch/pad/ to see all deployed tokens on Clawnchpad.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold uppercase tracking-widest">
          [ DOCUMENTATION ]
        </h2>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Learn how to use DACTYLOG
        </p>
      </div>

      <div className="space-y-4">
        {docs.map((doc, idx) => (
          <div key={idx} className="terminal-card space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              [{idx + 1}] {doc.title}
            </h3>
            <p className="text-xs text-foreground leading-relaxed">
              {doc.content}
            </p>
          </div>
        ))}
      </div>

      <div className="terminal-card space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
          [ QUICK LINKS ]
        </h3>
        <div className="space-y-2">
          <a
            href="https://clawn.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-green-400 hover:text-green-300 transition-colors underline"
          >
            → Clawnch Official Website
          </a>
          <a
            href="https://clawn.ch/pad/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-green-400 hover:text-green-300 transition-colors underline"
          >
            → Clawnchpad - Token Dashboard
          </a>
          <a
            href="https://clawn.ch/er/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-green-400 hover:text-green-300 transition-colors underline"
          >
            → Clawncher SDK Documentation
          </a>
          <a
            href="https://github.com/clawnch"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-green-400 hover:text-green-300 transition-colors underline"
          >
            → Clawnch GitHub Repository
          </a>
        </div>
      </div>

      <div className="terminal-card">
        <p className="text-xs text-muted-foreground">
          [ DACTYLOG v1.3 ] — Real-time agent monitoring & deployment for Clawn ecosystem on Base
        </p>
      </div>
    </div>
  );
}
