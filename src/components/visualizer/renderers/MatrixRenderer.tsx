import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface MatrixRendererProps {
  state?: VisualizerStep['matrixState'];
}

export const MatrixRenderer: React.FC<MatrixRendererProps> = ({ state }) => {
  if (!state || !state.grid || state.grid.length === 0 || !state.grid[0]) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty 2D Matrix State ]
      </div>
    );
  }

  const { grid, rowPointer, colPointer } = state;
  const numRows = grid.length;
  const numCols = grid[0].length;

  const getStatusClasses = (status: string, isPointerFocus: boolean) => {
    let base = 'transition-all duration-200 ';

    switch (status) {
      case 'active':
        base += 'bg-[rgba(0,112,243,0.25)] border-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.4)] ring-2 ring-[#0070f3] scale-105';
        break;
      case 'visited':
        base += 'bg-[rgba(0,223,114,0.18)] border-[#00df72] text-[#00df72] shadow-[0_0_8px_rgba(0,223,114,0.25)]';
        break;
      case 'path':
        base += 'bg-[rgba(245,166,35,0.22)] border-[#f5a623] text-[#f5a623] ring-1 ring-[#f5a623]/70';
        break;
      case 'obstacle':
        base += 'bg-[rgba(239,68,68,0.2)] border-[#ef4444] text-[#f87171] opacity-75';
        break;
      case 'default':
      default:
        base += 'bg-[#141414] border-[#262626] text-[#ededed]';
        break;
    }

    if (isPointerFocus && status === 'default') {
      base += ' ring-2 ring-blue-400 border-blue-400 bg-blue-950/40 text-white';
    }

    return base;
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Matrix Metadata & Pointers Banner */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#888888]">
        <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#262626]">
          Grid: {numRows} × {numCols}
        </span>
        {rowPointer !== undefined && (
          <span className="px-2 py-0.5 rounded bg-[#0a192f] border border-[#0070f3]/40 text-blue-400 font-semibold">
            Row Pointer: {rowPointer}
          </span>
        )}
        {colPointer !== undefined && (
          <span className="px-2 py-0.5 rounded bg-[#0a192f] border border-[#0070f3]/40 text-blue-400 font-semibold">
            Col Pointer: {colPointer}
          </span>
        )}
      </div>

      {/* 2D Grid with Row & Column Indices */}
      <div className="overflow-x-auto max-w-full pb-2">
        <div className="inline-block">
          {/* Column Indices Header */}
          <div className="flex pl-10 mb-1 gap-1.5">
            {Array.from({ length: numCols }).map((_, c) => (
              <div
                key={c}
                className={`w-11 sm:w-12 text-center font-mono text-[11px] transition-colors ${
                  colPointer === c
                    ? 'text-blue-400 font-bold'
                    : 'text-[#666666]'
                }`}
              >
                {colPointer === c ? `c=${c} ▼` : `c${c}`}
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          <div className="flex flex-col gap-1.5">
            {grid.map((row, r) => (
              <div key={r} className="flex items-center gap-1.5">
                {/* Row Index Header */}
                <div
                  className={`w-9 text-right pr-2 font-mono text-[11px] transition-colors ${
                    rowPointer === r
                      ? 'text-blue-400 font-bold'
                      : 'text-[#666666]'
                  }`}
                >
                  {rowPointer === r ? `▶ r${r}` : `r${r}`}
                </div>

                {/* Row Cells */}
                {row.map((cell, c) => {
                  const isPointerFocus =
                    rowPointer === r && colPointer === c;

                  return (
                    <div
                      key={c}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-xs sm:text-sm ${getStatusClasses(
                        cell.status,
                        isPointerFocus
                      )}`}
                      title={`Cell [${r}, ${c}]: ${cell.value} (${cell.status})`}
                    >
                      <span>{cell.value}</span>
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
      </div>
    </div>
  );
};

export default MatrixRenderer;
