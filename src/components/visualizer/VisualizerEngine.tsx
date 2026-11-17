import React, { useState, useEffect, useMemo } from 'react';
import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';
import { VisualizerControls } from './VisualizerControls';
import { VisualizerCustomInput } from './VisualizerCustomInput';
import { ArrayRenderer } from './renderers/ArrayRenderer';
import { MatrixRenderer } from './renderers/MatrixRenderer';
import { StackQueueRenderer } from './renderers/StackQueueRenderer';
import { HashMapRenderer } from './renderers/HashMapRenderer';
import { LinkedListRenderer } from './renderers/LinkedListRenderer';
import { TreeRenderer } from './renderers/TreeRenderer';
import { GraphRenderer } from './renderers/GraphRenderer';
import { TrieRenderer } from './renderers/TrieRenderer';
import { HeapRenderer } from './renderers/HeapRenderer';
import { DPTableRenderer } from './renderers/DPTableRenderer';
import { getTraceForProblem } from './traces';

export interface VisualizerEngineProps {
  steps?: VisualizerStep[];
  problem?: LeetCodeProblem;
  initialStep?: number;
}

export const VisualizerEngine: React.FC<VisualizerEngineProps> = ({
  steps,
  problem,
  initialStep = 0,
}) => {
  // Resolve default steps from explicit prop, problem trace, or fallback
  const defaultSteps = useMemo<VisualizerStep[]>(() => {
    if (steps && steps.length > 0) {
      return steps;
    }
    if (problem) {
      return getTraceForProblem(problem);
    }
    return [
      {
        stepIndex: 0,
        title: 'Initial Algorithm State',
        description: 'Engine loaded. Ready for interactive step execution.',
        variables: { status: 'ready' },
        arrayState: {
          elements: [{ value: 0, status: 'default' }],
        },
      },
    ];
  }, [steps, problem]);

  // Dynamically simulated steps from user input
  const [customSteps, setCustomSteps] = useState<VisualizerStep[] | null>(null);

  const effectiveSteps = customSteps || defaultSteps;
  const totalSteps = Math.max(1, effectiveSteps.length);

  // Clamped current step index within [0, totalSteps - 1]
  const [currentStep, setCurrentStep] = useState<number>(() =>
    Math.max(0, Math.min(initialStep, totalSteps - 1))
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Synchronize when totalSteps changes
  useEffect(() => {
    setCurrentStep((prev) => Math.max(0, Math.min(prev, totalSteps - 1)));
  }, [totalSteps]);

  // Handlers for dynamic custom simulation
  const handleSimulateCustom = (newSteps: VisualizerStep[]) => {
    setIsPlaying(false);
    setCustomSteps(newSteps);
    setCurrentStep(0);
  };

  const handleResetSimulation = () => {
    setIsPlaying(false);
    setCustomSteps(null);
    setCurrentStep(0);
  };

  // Interval auto-advance loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = Math.round(1000 / playbackSpeed);
    const timerId = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          // Terminal step reached: automatically pause
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [isPlaying, playbackSpeed, totalSteps]);

  // Step Controllers with strict boundary clamping
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleReverse = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleSeek = (index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSteps - 1));
    setCurrentStep(clamped);
  };

  const handlePlayToggle = () => {
    setIsPlaying((prev) => {
      if (!prev) {
        // If at the end, reset to step 0 and start playing
        if (currentStep >= totalSteps - 1) {
          setCurrentStep(0);
        }
        return true;
      }
      return false;
    });
  };

  const handleSpeedChange = (speed: number) => {
    if ([0.5, 1, 1.5, 2].includes(speed)) {
      setPlaybackSpeed(speed);
    }
  };

  const currentStepData = effectiveSteps[currentStep] || effectiveSteps[0];
  const hasRenderableStructure =
    Boolean(currentStepData.arrayState) ||
    Boolean(currentStepData.matrixState) ||
    Boolean(currentStepData.stackQueueState) ||
    Boolean(currentStepData.hashMapState) ||
    Boolean(currentStepData.linkedListState) ||
    Boolean(currentStepData.treeState) ||
    Boolean(currentStepData.graphState) ||
    Boolean(currentStepData.trieState) ||
    Boolean(currentStepData.heapState) ||
    Boolean(currentStepData.dpTableState);

  return (
    <div className="flex flex-col rounded-xl bg-[#0a0a0a] border border-[#262626] overflow-hidden shadow-2xl">
      {/* Interactive Custom Input Runner */}
      {problem && (
        <VisualizerCustomInput
          problem={problem}
          onSimulate={handleSimulateCustom}
          onReset={handleResetSimulation}
          isCustomActive={customSteps !== null}
          generatedStepCount={customSteps ? customSteps.length : undefined}
        />
      )}

      {/* Visualizer Interactive Controls Toolbar */}
      <VisualizerControls
        currentStep={currentStep}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        onNext={handleNext}
        onReverse={handleReverse}
        onPlayToggle={handlePlayToggle}
        onSpeedChange={handleSpeedChange}
        onSeek={handleSeek}
        onReset={handleReset}
      />

      {/* Pedagogical Step Invariant & Explanation Banner */}
      <div className="p-4 bg-[#0d1520] border-b border-[#17253b] space-y-1.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#112240] text-blue-400 border border-blue-500/30">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <h3 className="font-sans font-semibold text-sm text-[#ededed]">
              {currentStepData.title}
            </h3>
          </div>
          {currentStepData.codeLineHighlight && (
            <span className="text-[11px] font-mono text-[#888888] bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#262626]">
              Line{' '}
              {Array.isArray(currentStepData.codeLineHighlight)
                ? currentStepData.codeLineHighlight.join(', ')
                : currentStepData.codeLineHighlight}{' '}
              in Optimal Code
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-[#a0aec0] leading-relaxed font-sans">
          {currentStepData.description}
        </p>
      </div>

      {/* Dynamic Data Structure Visualizer Canvas */}
      <div className="p-4 sm:p-6 min-h-[300px] flex flex-col items-center justify-center bg-[#050505] border-b border-[#1f1f1f] gap-4 w-full max-w-full min-w-0">
        {hasRenderableStructure ? (
          <div className="w-full max-w-full min-w-0 flex flex-col gap-4 items-center">
            {currentStepData.arrayState && (
              <ArrayRenderer state={currentStepData.arrayState} />
            )}
            {currentStepData.matrixState && (
              <MatrixRenderer state={currentStepData.matrixState} />
            )}
            {currentStepData.stackQueueState && (
              <StackQueueRenderer state={currentStepData.stackQueueState} />
            )}
            {currentStepData.hashMapState && (
              <HashMapRenderer state={currentStepData.hashMapState} />
            )}
            {currentStepData.linkedListState && (
              <LinkedListRenderer state={currentStepData.linkedListState} />
            )}
            {currentStepData.treeState && (
              <TreeRenderer state={currentStepData.treeState} />
            )}
            {currentStepData.graphState && (
              <GraphRenderer state={currentStepData.graphState} />
            )}
            {currentStepData.trieState && (
              <TrieRenderer state={currentStepData.trieState} />
            )}
            {currentStepData.heapState && (
              <HeapRenderer state={currentStepData.heapState} />
            )}
            {currentStepData.dpTableState && (
              <DPTableRenderer state={currentStepData.dpTableState} />
            )}
          </div>
        ) : (
          <div className="text-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
            [ State transition active — No primitive data structure configured ]
          </div>
        )}
      </div>

      {/* Dynamic Active Variables & Registers Inspector */}
      {currentStepData.variables && Object.keys(currentStepData.variables).length > 0 && (
        <div className="p-4 bg-[#0a0a0a] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#888888]">
            <span>Active Variables & Registers</span>
            <span className="text-emerald-400">Sub-16ms Transitions</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            {Object.entries(currentStepData.variables).map(([key, val]) => (
              <div
                key={key}
                className="p-2 rounded bg-[#0f0f0f] border border-[#1f1f1f] flex flex-col"
              >
                <span className="text-[#666666] text-[10px] block truncate">
                  {key}
                </span>
                <span className="text-blue-400 font-semibold truncate">
                  {val === null
                    ? 'null'
                    : val === undefined
                    ? 'undefined'
                    : typeof val === 'boolean'
                    ? val
                      ? 'true'
                      : 'false'
                    : String(val)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizerEngine;
