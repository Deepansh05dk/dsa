import React, { useState, useMemo } from 'react';
import type { LeetCodeProblem } from '../../types/problem';
import type { VisualizerStep } from '../../types/visualizer';
import { getSimulatorConfigForProblem } from '../../utils/simulators/registry';
import { Play, RotateCcw, ChevronDown, ChevronUp, Sparkles, Terminal } from 'lucide-react';

interface VisualizerCustomInputProps {
  problem?: LeetCodeProblem;
  onSimulate: (steps: VisualizerStep[]) => void;
  onReset: () => void;
  isCustomActive: boolean;
  generatedStepCount?: number;
}

export const VisualizerCustomInput: React.FC<VisualizerCustomInputProps> = ({
  problem,
  onSimulate,
  onReset,
  isCustomActive,
  generatedStepCount,
}) => {
  if (!problem) return null;

  const config = useMemo(() => getSimulatorConfigForProblem(problem), [problem]);

  // Initialize input state from field defaultValues
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.fields.forEach((f) => {
      initial[f.key] = Array.isArray(f.defaultValue) ? f.defaultValue.join(', ') : f.defaultValue;
    });
    return initial;
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setActivePresetIndex(null);
  };

  const handleApplyPreset = (presetIndex: number) => {
    const preset = config.presets[presetIndex];
    if (!preset) return;

    const newInputs: Record<string, any> = {};
    config.fields.forEach((f) => {
      const val = preset.values[f.key] ?? f.defaultValue;
      newInputs[f.key] = Array.isArray(val) ? val.join(', ') : val;
    });

    setInputs(newInputs);
    setActivePresetIndex(presetIndex);

    // Auto-run simulation on preset selection
    try {
      const steps = config.simulate(newInputs, problem);
      if (steps && steps.length > 0) {
        onSimulate(steps);
      }
    } catch (err) {
      console.error('Simulation error on preset apply:', err);
    }
  };

  const handleRunSimulation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const steps = config.simulate(inputs, problem);
      if (steps && steps.length > 0) {
        onSimulate(steps);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    }
  };

  const handleResetToDefault = () => {
    const initial: Record<string, any> = {};
    config.fields.forEach((f) => {
      initial[f.key] = Array.isArray(f.defaultValue) ? f.defaultValue.join(', ') : f.defaultValue;
    });
    setInputs(initial);
    setActivePresetIndex(null);
    onReset();
  };

  return (
    <div className="bg-[#0d0d0d] border-b border-[#222222] text-xs font-sans">
      {/* Top Accordion Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#111111]/80 select-none">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-accent-cyan font-mono font-medium text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Interactive Input Runner</span>
          </div>

          {isCustomActive ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#062817] text-[#34d399] border border-[#059669]/40 animate-pulse">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Dynamic: {generatedStepCount} real steps</span>
            </span>
          ) : (
            <span className="text-[10px] font-mono text-text-dim">
              (Default curated trace)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isCustomActive && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-white transition-colors cursor-pointer"
              title="Reset to default trace"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1 rounded text-text-muted hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            aria-label={isExpanded ? 'Collapse custom input' : 'Expand custom input'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Controls & Fields Form */}
      {isExpanded && (
        <form onSubmit={handleRunSimulation} className="p-3 sm:p-4 space-y-3 bg-[#0a0a0a]">
          {/* Preset Buttons */}
          {config.presets && config.presets.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-text-dim mr-1">Presets:</span>
              {config.presets.map((preset, idx) => {
                const isActive = activePresetIndex === idx;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(idx)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-all border ${
                      isActive
                        ? 'bg-[#1e293b] text-accent-cyan border-accent-cyan/50 shadow-sm'
                        : 'bg-[#141414] text-text-muted hover:text-text-primary border-[#262626] hover:border-[#383838]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {config.fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`input-${field.key}`}
                    className="text-[11px] font-mono font-medium text-text-primary"
                  >
                    {field.label}
                  </label>
                  {field.helpText && (
                    <span className="text-[10px] text-text-dim font-sans truncate max-w-[140px]">
                      {field.helpText}
                    </span>
                  )}
                </div>
                <input
                  id={`input-${field.key}`}
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={inputs[field.key] ?? ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-white font-mono text-xs focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 placeholder:text-text-dim transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
            <p className="text-[11px] text-text-dim font-sans">
              💡 <span className="text-text-muted">Type any custom values — the algorithm runs live and adapts all visualizer steps!</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-mono transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Run & Visualize</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
