import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Zap } from 'lucide-react';
import { useDeployForm } from '@/hooks/useLiveAgentData';

/**
 * Komponen untuk konfigurasi dan deployment agent
 * Menghasilkan command yang siap di-copy untuk terminal
 */
export const AgentDeployer = () => {
  const { formData, handleChange, generateDeployCode, generatedCode, copyToClipboard } =
    useDeployForm();
  const [copied, setCopied] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    generateDeployCode();
    setIsGenerated(true);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Configuration Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-accent">
          [ CONFIG ]
        </h3>
        <div className="terminal-card space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider font-bold block mb-2 text-accent">
              Agent Name
            </label>
            <Input
              placeholder="MyAgent"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-input border-2 border-accent text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-bold block mb-2 text-accent">
              Token Symbol
            </label>
            <Input
              placeholder="AGENT"
              maxLength={6}
              value={formData.symbol}
              onChange={(e) => handleChange('symbol', e.target.value.toUpperCase())}
              className="bg-input border-2 border-accent text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-bold block mb-2 text-accent">
              Total Supply
            </label>
            <Input
              placeholder="1000000"
              type="number"
              value={formData.supply}
              onChange={(e) => handleChange('supply', e.target.value)}
              className="bg-input border-2 border-accent text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-bold block mb-2 text-accent">
              Liquidity Curve
            </label>
            <select
              value={formData.liquidityCurve}
              onChange={(e) => handleChange('liquidityCurve', e.target.value)}
              className="w-full bg-input border-2 border-accent text-foreground p-2 text-xs rounded font-mono focus:ring-2 focus:ring-accent"
            >
              <option value="exponential">exponential</option>
              <option value="linear">linear</option>
              <option value="sigmoid">sigmoid</option>
            </select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!formData.name || !formData.symbol || !formData.supply}
            className="w-full bg-accent text-background hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-wider text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Zap size={16} /> [ GENERATE CODE ]
          </Button>
        </div>
      </div>

      {/* Generated Code */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-accent">
          [ COMMAND ]
        </h3>
        <div className="terminal-card space-y-4">
          <div className="bg-background/50 p-4 rounded font-mono text-xs overflow-x-auto border border-accent/30">
            {isGenerated && generatedCode ? (
              <pre className="text-foreground whitespace-pre-wrap break-words leading-relaxed">
                {generatedCode}
              </pre>
            ) : (
              <div className="text-muted-foreground">
                [ CONFIGURE AGENT AND GENERATE CODE ]
              </div>
            )}
          </div>

          <Button
            onClick={handleCopy}
            disabled={!isGenerated || !generatedCode}
            className="w-full bg-accent/20 border-2 border-accent text-accent hover:bg-accent/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-wider text-xs flex items-center justify-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check size={16} /> [ COPIED ]
              </>
            ) : (
              <>
                <Copy size={16} /> [ COPY ]
              </>
            )}
          </Button>

          {isGenerated && generatedCode && (
            <div className="text-xs text-muted-foreground bg-background/50 p-3 rounded border border-accent/20">
              <div className="font-bold text-accent mb-1">[ NEXT STEPS ]</div>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Copy the command above</li>
                <li>Open your terminal</li>
                <li>Paste and execute the command</li>
                <li>Confirm the deployment parameters</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDeployer;
