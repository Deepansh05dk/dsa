import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface DPTableRendererProps {
  state?: VisualizerStep['dpTableState'];
}

export const DPTableRenderer: React.FC<DPTableRendererProps> = ({ state }) => {
  if (!state || !state.values || state.values.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty DP Table State ]
      </div>
    );
  }

  const { dimensions = '1D', values, activeCell, formula } = state;

  const is2D =
    dimensions === '2D' ||
    (Array.isArray(values) && Array.isArray(values[0]));

  // Resolve active cell indices
  let activeRow: number | null = null;
  let activeCol: number | null = null;

  if (activeCell !== undefined) {
    if (Array.isArray(activeCell)) {
      activeRow = activeCell[0];
      activeCol = activeCell[1];
    } else if (typeof activeCell === 'number') {
      if (is2D) {
        activeRow = 0;
        activeCol = activeCell;
      } else {
        activeCol = activeCell;
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Recurrence Formula Callout Banner */}
      <div className="w-full flex flex-col gap-2 p-3 bg-[#0a111a] border border-[#172a45] rounded-lg">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#112240] text-blue-400 border border-blue-500/30">
              {is2D ? '2D Dynamic Programming Table' : '1D Dynamic Programming Array'}
            </span>
            {activeCol !== null && (
              <span className="text-[11px] text-blue-300 font-mono">
                Active Cell:{' '}
                <strong className="text-white">
                  {is2D && activeRow !== null
                    ? `dp[${activeRow}][${activeCol}]`
                    : `dp[${activeCol}]`}
                </strong>
              </span>
            )}
          </div>

          <span className="text-[10px] font-mono text-[#666666]">
            Optimal Substructure & Overlapping Subproblems
          </span>
        </div>

        {formula && (
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-[#1a2d47]">
            <span className="text-[11px] font-mono text-[#888888]">
              Recurrence Relation:
            </span>
            <code className="px-2.5 py-1 rounded bg-[#050d1a] border border-blue-500/40 text-blue-300 font-mono font-bold text-xs sm:text-sm tracking-wide shadow-inner">
              {formula}
            </code>
          </div>
        )}
      </div>

      {/* Render 1D or 2D Dynamic Programming State */}
      {!is2D ? (
        /* 1D DP Array Display */
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full overflow-x-auto pb-3 pt-1 flex justify-center">
            <div className="inline-flex gap-2.5 items-end px-2">
              {(values as Array<string | number>).map((val, idx) => {
                const isActive = activeCol === idx;
                const isReferenced1 = activeCol !== null && idx === activeCol - 1;
                const isReferenced2 = activeCol !== null && idx === activeCol - 2;
                const isReferenced = isReferenced1 || isReferenced2;

                let cellClasses =
                  'w-12 h-14 sm:w-14 sm:h-16 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-sm sm:text-base transition-all duration-200 ';

                if (isActive) {
                  cellClasses +=
                    'bg-[rgba(0,112,243,0.25)] border-[#0070f3] text-white shadow-[0_0_14px_rgba(0,112,243,0.45)] ring-2 ring-[#0070f3] scale-105';
                } else if (isReferenced) {
                  cellClasses +=
                    'bg-[rgba(245,166,35,0.18)] border-[#f5a623] text-[#f5a623] ring-1 ring-[#f5a623]/60';
                } else if (activeCol !== null && idx < activeCol) {
                  cellClasses +=
                    'bg-[#0f1710] border-[#00df72]/40 text-emerald-400';
                } else if (activeCol !== null && idx > activeCol) {
                  cellClasses +=
                    'bg-[#0a0a0a] border-[#222222] text-[#444444] border-dashed';
                } else {
                  cellClasses +=
                    'bg-[#141414] border-[#262626] text-[#ededed]';
                }

                return (
                  <div key={idx} className="flex flex-col items-center">
                    {/* Top Callout for Active / Referenced cell */}
                    <div className="min-h-[24px] flex items-end mb-1">
                      {isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0070f3] text-white shadow animate-bounce">
                          COMPUTING ▼
                        </span>
                      )}
                      {isReferenced1 && !isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-amber-950 text-amber-400 border border-amber-500/40">
                          dp[i-1] ▼
                        </span>
                      )}
                      {isReferenced2 && !isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-amber-950 text-amber-400 border border-amber-500/40">
                          dp[i-2] ▼
                        </span>
                      )}
                    </div>

                    {/* Cell Box */}
                    <div className={cellClasses}>
                      <span>{val === null || val === undefined ? '—' : val}</span>
                    </div>

                    {/* Array Index Caption */}
                    <span className="text-[10px] font-mono text-[#666666] mt-1.5">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* 2D DP Matrix Display */
        <div className="w-full overflow-x-auto max-w-full pb-2">
          {(() => {
            const grid = values as Array<Array<string | number>>;
            const numCols = grid[0] ? grid[0].length : 0;

            return (
              <div className="inline-block min-w-max mx-auto">
                {/* Column Headers */}
                <div className="flex pl-10 mb-1 gap-1.5">
                  {Array.from({ length: numCols }).map((_, c) => (
                    <div
                      key={c}
                      className={`w-11 sm:w-12 text-center font-mono text-[11px] transition-colors ${
                        activeCol === c
                          ? 'text-blue-400 font-bold'
                          : 'text-[#666666]'
                      }`}
                    >
                      {activeCol === c ? `c=${c} ▼` : `c${c}`}
                    </div>
                  ))}
                </div>

                {/* Matrix Rows */}
                <div className="flex flex-col gap-1.5">
                  {grid.map((row, r) => (
                    <div key={r} className="flex items-center gap-1.5">
                      {/* Row Header */}
                      <div
                        className={`w-9 text-right pr-2 font-mono text-[11px] transition-colors ${
                          activeRow === r
                            ? 'text-blue-400 font-bold'
                            : 'text-[#666666]'
                        }`}
                      >
                        {activeRow === r ? `▶ r${r}` : `r${r}`}
                      </div>

                      {/* Row Cells */}
                      {row.map((cellVal, c) => {
                        const isActive =
                          activeRow === r && activeCol === c;
                        const isTopNeighbor =
                          activeRow !== null &&
                          activeCol !== null &&
                          r === activeRow - 1 &&
                          c === activeCol;
                        const isLeftNeighbor =
                          activeRow !== null &&
                          activeCol !== null &&
                          r === activeRow &&
                          c === activeCol - 1;
                        const isDiagNeighbor =
                          activeRow !== null &&
                          activeCol !== null &&
                          r === activeRow - 1 &&
                          c === activeCol - 1;
                        const isReferenced =
                          isTopNeighbor || isLeftNeighbor || isDiagNeighbor;

                        let cellClasses =
                          'w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-xs sm:text-sm transition-all duration-200 ';

                        if (isActive) {
                          cellClasses +=
                            'bg-[rgba(0,112,243,0.25)] border-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.45)] ring-2 ring-[#0070f3] scale-105';
                        } else if (isReferenced) {
                          cellClasses +=
                            'bg-[rgba(245,166,35,0.18)] border-[#f5a623] text-[#f5a623] ring-1 ring-[#f5a623]/60';
                        } else if (
                          activeRow !== null &&
                          (r < activeRow ||
                            (r === activeRow && activeCol !== null && c < activeCol))
                        ) {
                          cellClasses +=
                            'bg-[#0f1710] border-[#00df72]/30 text-emerald-400';
                        } else if (
                          activeRow !== null &&
                          (r > activeRow ||
                            (r === activeRow && activeCol !== null && c > activeCol))
                        ) {
                          cellClasses +=
                            'bg-[#0a0a0a] border-[#222222] text-[#444444] border-dashed';
                        } else {
                          cellClasses +=
                            'bg-[#141414] border-[#262626] text-[#ededed]';
                        }

                        return (
                          <div
                            key={c}
                            className={cellClasses}
                            title={`dp[${r}][${c}] = ${cellVal}`}
                          >
                            <span>
                              {cellVal === null || cellVal === undefined ? '—' : cellVal}
                            </span>
                            <span className="text-[8px] font-mono opacity-50 -mt-0.5">
                              {r},{c}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default DPTableRenderer;
