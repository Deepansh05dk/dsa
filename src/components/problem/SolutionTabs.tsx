import { useState } from 'react';
import { Sparkles, Zap, Copy, Check, Info } from 'lucide-react';
import type { ApproachInfo, OptimalApproachInfo } from '../../types/problem';

interface SolutionTabsProps {
  optimal: OptimalApproachInfo;
  bruteForce: ApproachInfo;
}

export default function SolutionTabs({ optimal, bruteForce }: SolutionTabsProps) {
  const [activeTab, setActiveTab] = useState<'optimal' | 'brute-force'>('optimal');
  const [copied, setCopied] = useState(false);

  const currentApproach = activeTab === 'optimal' ? optimal : bruteForce;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentApproach.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-[#262626] rounded-xl overflow-hidden">
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-[#0d0d0d]">
        <div className="inline-flex p-1 rounded-lg bg-[#141414] border border-[#262626]">
          <button
            type="button"
            onClick={() => setActiveTab('optimal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'optimal'
                ? 'bg-[#222222] text-[#ededed] shadow-sm border border-[#383838]'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />
            <span>Optimal Approach</span>
            <span className="text-[10px] font-mono px-1 rounded bg-[#062817] text-[#34d399] border border-[#059669]/30">
              Recommended
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brute-force')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'brute-force'
                ? 'bg-[#222222] text-[#ededed] shadow-sm border border-[#383838]'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-accent-amber" />
            <span>Brute Force Baseline</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-muted hover:text-text-primary hover:bg-[#1a1a1a] rounded border border-[#262626] transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-280px)]">
        {/* Title & Complexities */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1f1f1f]">
          <div>
            <h3 className="text-sm font-semibold text-text-primary font-sans">{currentApproach.name}</h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#111111] border border-[#262626] text-text-primary">
              <span className="text-text-dim">Time:</span>
              <span className="text-accent-cyan font-semibold">{currentApproach.complexity.time}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#111111] border border-[#262626] text-text-primary">
              <span className="text-text-dim">Space:</span>
              <span className="text-accent-purple font-semibold">{currentApproach.complexity.space}</span>
            </span>
          </div>
        </div>

        {/* Optimal Justification Callout */}
        {activeTab === 'optimal' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-[#07130b] border border-[#0d3b1f] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#34d399] font-medium font-sans">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>Why Optimal is Preferred</span>
              </div>
              <p className="text-text-secondary leading-relaxed pl-6">{optimal.whyOptimalIsPreferred}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0e1726] border border-[#1e293b] text-xs space-y-2">
              <div className="flex items-center gap-2 text-accent-cyan font-medium font-sans">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>Core Pattern Invariant</span>
              </div>
              <p className="text-text-secondary leading-relaxed pl-6">{optimal.patternInvariant}</p>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">Approach Logic</h4>
          <p className="text-xs text-text-secondary leading-relaxed font-sans">{currentApproach.explanation}</p>
        </div>

        {/* Code Snippet */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-text-dim font-mono">
            <span>TypeScript Solution</span>
          </div>
          <div className="relative rounded-lg bg-[#050505] border border-[#222222] p-4 overflow-x-auto">
            <pre className="font-mono text-xs text-[#ededed] leading-relaxed">
              <code>{currentApproach.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
