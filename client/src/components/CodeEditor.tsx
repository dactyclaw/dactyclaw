import { useState } from 'react';
import { Play, Copy, RotateCcw } from 'lucide-react';
import {
  parseDactyCode,
  executeDactyDeployment,
  generateExampleCode,
  getDactyDocumentation,
  DactyDeploymentResult,
} from '@/lib/dactySDK';

export default function CodeEditor() {
  const [code, setCode] = useState(generateExampleCode());
  const [result, setResult] = useState<DactyDeploymentResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [deploymentHistory, setDeploymentHistory] = useState<DactyDeploymentResult[]>([]);

  const handleExecute = () => {
    setIsExecuting(true);
    
    // Simulate execution delay
    setTimeout(() => {
      const config = parseDactyCode(code);
      
      if (!config) {
        setResult({
          success: false,
          message: 'Error: Invalid Dacty SDK syntax. Check documentation for correct format.',
          timestamp: new Date().toISOString(),
        });
      } else {
        const deploymentResult = executeDactyDeployment(config);
        setResult(deploymentResult);
        
        if (deploymentResult.success) {
          setDeploymentHistory([deploymentResult, ...deploymentHistory]);
        }
      }
      
      setIsExecuting(false);
    }, 1000);
  };

  const handleReset = () => {
    setCode(generateExampleCode());
    setResult(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-3 py-2 bg-accent/20 text-accent hover:bg-accent/30 disabled:opacity-50 rounded text-xs font-bold uppercase transition-colors"
        >
          <Play size={16} />
          {isExecuting ? 'Executing...' : 'Execute'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 bg-muted/20 text-muted-foreground hover:bg-muted/30 rounded text-xs font-bold uppercase transition-colors"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-2 px-3 py-2 bg-muted/20 text-muted-foreground hover:bg-muted/30 rounded text-xs font-bold uppercase transition-colors"
        >
          <Copy size={16} />
          Copy
        </button>
        <button
          onClick={() => setShowDocs(!showDocs)}
          className={`px-3 py-2 rounded text-xs font-bold uppercase transition-colors ${
            showDocs
              ? 'bg-accent/20 text-accent'
              : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
          }`}
        >
          Docs
        </button>
      </div>

      {/* Code Editor */}
      <div className="terminal-card space-y-2">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ CODE EDITOR ]
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 bg-background/50 border border-accent/30 rounded p-3 font-mono text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 resize-none"
          placeholder="Enter Dacty SDK code here..."
        />
      </div>

      {/* Documentation */}
      {showDocs && (
        <div className="terminal-card space-y-2 max-h-96 overflow-y-auto">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            [ DOCUMENTATION ]
          </div>
          <pre className="text-xs whitespace-pre-wrap break-words text-foreground/80">
            {getDactyDocumentation()}
          </pre>
        </div>
      )}

      {/* Execution Result */}
      {result && (
        <div
          className={`terminal-card space-y-2 border-l-4 ${
            result.success
              ? 'border-l-green-500 bg-green-500/5'
              : 'border-l-red-500 bg-red-500/5'
          }`}
        >
          <div className="text-xs uppercase tracking-wider font-bold">
            {result.success ? (
              <span className="text-green-400">[ DEPLOYMENT SUCCESS ]</span>
            ) : (
              <span className="text-red-400">[ DEPLOYMENT FAILED ]</span>
            )}
          </div>
          <pre className="text-xs whitespace-pre-wrap break-words text-foreground/80">
            {result.message}
          </pre>
          {result.tokenAddress && (
            <div className="space-y-1 text-xs">
              <div>
                <span className="text-muted-foreground">Token Address:</span>
                <span className="ml-2 text-green-400 font-mono">{result.tokenAddress}</span>
              </div>
              <div>
                <span className="text-muted-foreground">TX Hash:</span>
                <span className="ml-2 text-green-400 font-mono">{result.transactionHash}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="ml-2 text-green-400">{new Date(result.timestamp).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deployment History */}
      {deploymentHistory.length > 0 && (
        <div className="terminal-card space-y-2">
          <div className="text-xs uppercase tracking-wider font-bold mb-3 text-accent">
            [ DEPLOYMENT HISTORY ] ({deploymentHistory.length})
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {deploymentHistory.map((deploy, idx) => (
              <div
                key={idx}
                className="border border-dashed border-accent/30 rounded p-2 hover:bg-accent/5 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-green-400">
                      ${deploy.config?.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {deploy.config?.name}
                    </div>
                  </div>
                  <div className="text-xs text-right">
                    <div className="text-accent font-mono">
                      {deploy.tokenAddress?.slice(0, 10)}...
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(deploy.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
