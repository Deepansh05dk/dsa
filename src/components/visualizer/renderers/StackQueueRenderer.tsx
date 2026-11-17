import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface StackQueueRendererProps {
  state?: VisualizerStep['stackQueueState'];
}

export const StackQueueRenderer: React.FC<StackQueueRendererProps> = ({ state }) => {
  if (!state) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Stack/Queue State ]
      </div>
    );
  }

  const { type, items = [] } = state;
  const isStack = type === 'stack';

  const getItemClasses = (status: string, isTopOrFront: boolean) => {
    let base = 'transition-all duration-200 ';

    switch (status) {
      case 'top':
        base += 'bg-[rgba(0,112,243,0.22)] border-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.35)] ring-2 ring-[#0070f3] font-bold';
        break;
      case 'pushed':
        base += 'bg-[rgba(0,223,114,0.2)] border-[#00df72] text-[#00df72] shadow-[0_0_8px_rgba(0,223,114,0.25)]';
        break;
      case 'popped':
        base += 'bg-[rgba(239,68,68,0.2)] border-[#ef4444] text-[#f87171] line-through opacity-60';
        break;
      case 'default':
      default:
        base += isTopOrFront
          ? 'bg-[#1a1a1a] border-[#0070f3]/60 text-[#ededed] ring-1 ring-[#0070f3]/40'
          : 'bg-[#141414] border-[#262626] text-[#ededed]';
        break;
    }

    return base;
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center gap-4 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Structure Type & Size Header */}
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#262626] text-[#ededed] font-semibold uppercase">
          {type === 'stack' ? 'LIFO Stack' : 'FIFO Queue'}
        </span>
        <span className="text-[#888888]">
          Elements: <strong className="text-white">{items.length}</strong>
        </span>
      </div>

      {isStack ? (
        /* Vertical Stack Beaker */
        <div className="flex flex-col items-center">
          {/* Top of Stack Entry Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#0070f3] mb-1 animate-pulse">
            <span>↓</span>
            <span>Push / Pop (TOP)</span>
            <span>↓</span>
          </div>

          {/* Open-top Beaker Box */}
          <div className="w-56 sm:w-64 min-h-[160px] p-2.5 rounded-b-xl border-b-2 border-l-2 border-r-2 border-[#333333] bg-[#0a0a0a]/80 flex flex-col justify-end gap-2 shadow-inner">
            {items.length === 0 ? (
              <div className="text-center py-10 text-xs font-mono text-[#555555] italic">
                [ Empty Stack ]
              </div>
            ) : (
              // Display items from top (highest index) down to bottom (index 0)
              [...items].reverse().map((item, rIdx) => {
                const originalIdx = items.length - 1 - rIdx;
                const isTop = originalIdx === items.length - 1;

                return (
                  <div
                    key={originalIdx}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border font-mono text-xs sm:text-sm ${getItemClasses(
                      item.status,
                      isTop
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#666666]">
                        [{originalIdx}]
                      </span>
                      <span className="font-semibold">{item.value}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.status === 'pushed' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          + pushed
                        </span>
                      )}
                      {item.status === 'popped' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-800">
                          - popped
                        </span>
                      )}
                      {isTop && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-[#0070f3] text-white shadow-sm">
                          TOP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono text-[#555555] mt-1">
            Stack Base (Index 0)
          </span>
        </div>
      ) : (
        /* Horizontal Queue Conveyor */
        <div className="w-full max-w-full min-w-0 flex flex-col items-center">
          <div className="w-full max-w-full overflow-x-auto pb-3 pt-2 visualizer-scroll">
            <div className="min-w-full w-max flex items-center justify-center gap-2 px-4">
              <div className="flex flex-col items-center text-[10px] font-mono text-emerald-400 font-semibold px-2 flex-shrink-0">
                <span>◀ Dequeue</span>
                <span className="text-[#888888]">(Front)</span>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] border border-[#262626] rounded-xl min-w-[200px] justify-center flex-shrink-0">
                {items.length === 0 ? (
                  <span className="text-xs font-mono text-[#555555] italic px-4">
                    [ Empty Queue ]
                  </span>
                ) : (
                  items.map((item, idx) => {
                    const isFront = idx === 0;
                    const isBack = idx === items.length - 1;

                    return (
                      <div
                        key={idx}
                        className={`min-w-[48px] h-14 rounded-lg flex flex-col items-center justify-center px-3 border font-mono text-xs sm:text-sm flex-shrink-0 ${getItemClasses(
                          item.status,
                          isFront
                        )}`}
                      >
                        <span className="font-semibold">{item.value}</span>
                        <span className="text-[9px] font-mono text-[#666666]">
                          {isFront ? 'FRONT' : isBack ? 'BACK' : `[${idx}]`}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col items-center text-[10px] font-mono text-blue-400 font-semibold px-2 flex-shrink-0">
                <span>Enqueue ◀</span>
                <span className="text-[#888888]">(Back)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StackQueueRenderer;
