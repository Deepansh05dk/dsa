import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface ArrayRendererProps {
  state?: VisualizerStep['arrayState'];
}

export const ArrayRenderer: React.FC<ArrayRendererProps> = ({ state }) => {
  if (!state || !state.elements || state.elements.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Array State ]
      </div>
    );
  }

  const { elements, pointers = [], window: windowRange } = state;

  // Group pointers by element index
  const pointersByIndex: Record<number, Array<{ label: string; color?: string }>> = {};
  for (const p of pointers) {
    if (!pointersByIndex[p.index]) {
      pointersByIndex[p.index] = [];
    }
    pointersByIndex[p.index].push(p);
  }

  const getStatusClasses = (status: string, isInWindow: boolean) => {
    let base = 'transition-all duration-200 ';

    switch (status) {
      case 'active':
        base += 'bg-[rgba(0,112,243,0.18)] border-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.35)] ring-1 ring-[#0070f3] scale-105';
        break;
      case 'comparing':
        base += 'bg-[rgba(245,166,35,0.18)] border-[#f5a623] text-[#f5a623] ring-1 ring-[#f5a623]/60';
        break;
      case 'sorted':
        base += 'bg-[rgba(0,223,114,0.18)] border-[#00df72] text-[#00df72] shadow-[0_0_10px_rgba(0,223,114,0.25)]';
        break;
      case 'matched':
        base += 'bg-[rgba(0,223,114,0.22)] border-[#00df72] text-[#00df72] ring-2 ring-[#00df72]/70';
        break;
      case 'swapped':
        base += 'bg-[rgba(168,85,247,0.22)] border-[#a855f7] text-[#d8b4fe] ring-1 ring-[#a855f7]/60';
        break;
      case 'eliminated':
        base += 'bg-[#0a0a0a] border-[#222222] text-[#444444] opacity-35';
        break;
      case 'default':
      default:
        base += 'bg-[#141414] border-[#262626] text-[#ededed]';
        break;
    }

    if (isInWindow && status === 'default') {
      base += ' border-t-blue-500 border-b-blue-500 bg-[#0c1929]/50';
    }

    return base;
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Sliding Window Banner if active */}
      {windowRange && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a192f] border border-[#0070f3]/40 text-[11px] font-mono text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>Sliding Window:</span>
          <span className="font-semibold text-white">
            [{windowRange.left} .. {windowRange.right}]
          </span>
          <span className="text-[#888888]">
            (Length: {Math.max(0, windowRange.right - windowRange.left + 1)})
          </span>
        </div>
      )}

      {/* Array Elements Row with Pointers */}
      <div className="w-full overflow-x-auto pb-2 pt-1 flex justify-center">
        <div className="inline-flex gap-2.5 items-end px-2">
          {elements.map((el, idx) => {
            const elPointers = pointersByIndex[idx] || [];
            const isInWindow =
              windowRange !== undefined &&
              idx >= windowRange.left &&
              idx <= windowRange.right;

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Pointer Indicators (above cell) */}
                <div className="flex flex-col items-center gap-1 min-h-[28px] justify-end mb-1">
                  {elPointers.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex flex-col items-center text-[10px] font-mono font-bold leading-none animate-bounce"
                      style={{ color: p.color || '#38bdf8' }}
                    >
                      <span className="px-1.5 py-0.5 rounded bg-[#111111] border border-current shadow-sm">
                        {p.label}
                      </span>
                      <span className="text-[10px] -mt-0.5">▼</span>
                    </div>
                  ))}
                </div>

                {/* Array Box */}
                <div
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-sm sm:text-base ${getStatusClasses(
                    el.status,
                    isInWindow
                  )}`}
                >
                  <span>{el.value}</span>
                </div>

                {/* Index Caption */}
                <span className="text-[10px] font-mono text-[#666666] mt-1.5">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArrayRenderer;
