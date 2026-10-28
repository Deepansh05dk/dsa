import React, { useEffect } from 'react';
import type { VisualizerControllerProps } from '../../types/visualizer';

export const VisualizerControls: React.FC<VisualizerControllerProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onNext,
  onReverse,
  onPlayToggle,
  onSpeedChange,
  onSeek,
  onReset,
}) => {
  const isAtStart = currentStep <= 0;
  const isAtEnd = currentStep >= Math.max(0, totalSteps - 1);
  const maxStep = Math.max(0, totalSteps - 1);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (!isAtEnd) {
          onNext();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!isAtStart) {
          onReverse();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        onPlayToggle();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAtStart, isAtEnd, onNext, onReverse, onPlayToggle, onReset]);

  return (
    <div className="flex flex-col gap-2.5 bg-[#0a0a0a] border-b border-[#262626] p-3 sm:p-4 text-xs select-none">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Step Indicator Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-[#666666]'
            }`}
          />
          <span className="font-mono text-xs font-semibold text-[#ededed]">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#141414] hover:bg-[#1f1f1f] text-[#888888] hover:text-[#ededed] border border-[#262626] transition-colors font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Reset to Step 0 (r / R)"
            aria-label="Reset step to beginning"
          >
            <span>⏮</span>
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Reverse Step Button */}
          <button
            type="button"
            onClick={onReverse}
            disabled={isAtStart}
            className={`flex items-center gap-1 px-3 py-1.5 rounded font-mono text-xs border transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isAtStart
                ? 'bg-[#0d0d0d] text-[#444444] border-[#1a1a1a] cursor-not-allowed'
                : 'bg-[#141414] hover:bg-[#1f1f1f] text-[#ededed] border-[#262626] cursor-pointer'
            }`}
            title="Reverse Step (ArrowLeft)"
            aria-label="Reverse Step"
          >
            <span>◀</span>
            <span>Reverse</span>
          </button>

          {/* Next Step Button */}
          <button
            type="button"
            onClick={onNext}
            disabled={isAtEnd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded font-mono text-xs font-medium border transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isAtEnd
                ? 'bg-[#0d0d0d] text-[#444444] border-[#1a1a1a] cursor-not-allowed'
                : 'bg-[#0070f3] hover:bg-[#0060df] text-white border-[#0070f3] cursor-pointer shadow-sm'
            }`}
            title="Next Step (ArrowRight)"
            aria-label="Next Step"
          >
            <span>Next</span>
            <span>▶</span>
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={onPlayToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs border transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isPlaying
                ? 'bg-[#1a1200] text-[#f5a623] border-[#f5a623]/40 hover:bg-[#261a00]'
                : 'bg-[#141414] text-[#ededed] border-[#262626] hover:bg-[#1f1f1f]'
            }`}
            title="Toggle Play / Pause (Space)"
            aria-label={isPlaying ? 'Pause playback' : 'Play auto-advance'}
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Playback Speed Selector */}
          <div className="flex items-center gap-1 ml-1 pl-2 border-l border-[#262626]">
            <span className="text-[11px] font-mono text-[#888888] hidden sm:inline">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              aria-label="Playback speed"
              className="bg-[#111111] text-[#ededed] border border-[#262626] rounded px-2 py-1 font-mono text-xs cursor-pointer focus:outline-none focus:border-[#0070f3]"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Scrubber Bar */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-[11px] font-mono text-[#666666] hidden sm:inline">Scrubber:</span>
        <input
          type="range"
          min={0}
          max={maxStep}
          value={currentStep}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label="Progress scrubber"
          className="w-full h-1.5 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#ededed] focus:outline-none"
        />
        <span className="text-[11px] font-mono text-[#888888] whitespace-nowrap min-w-[42px] text-right">
          {currentStep} / {maxStep}
        </span>
      </div>
    </div>
  );
};

export default VisualizerControls;
