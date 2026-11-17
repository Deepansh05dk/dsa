import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface HashMapRendererProps {
  state?: VisualizerStep['hashMapState'];
}

export const HashMapRenderer: React.FC<HashMapRendererProps> = ({ state }) => {
  if (!state || !state.entries) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Hash Map State ]
      </div>
    );
  }

  const { entries } = state;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accessed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0a192f] text-blue-400 border border-[#0070f3]/40 animate-pulse">
            👁 accessed
          </span>
        );
      case 'inserted':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#062817] text-emerald-400 border border-emerald-500/40">
            + inserted
          </span>
        );
      case 'updated':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#2a1b04] text-amber-400 border border-amber-500/40">
            ↻ updated
          </span>
        );
      case 'default':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#666666] border border-[#222222]">
            stored
          </span>
        );
    }
  };

  const getRowClasses = (status: string) => {
    switch (status) {
      case 'accessed':
        return 'bg-[rgba(0,112,243,0.12)] border-[#0070f3]/60';
      case 'inserted':
        return 'bg-[rgba(0,223,114,0.12)] border-[#00df72]/60';
      case 'updated':
        return 'bg-[rgba(245,166,35,0.12)] border-[#f5a623]/60';
      case 'default':
      default:
        return 'bg-[#0f0f0f] hover:bg-[#141414] border-[#1f1f1f]';
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Header with Entry Count */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#ededed] font-semibold">
            Hash Table Snapshot
          </span>
          <span className="text-[#888888]">
            Entries: <strong className="text-white">{entries.length}</strong>
          </span>
        </div>
        <span className="text-[11px] text-[#666666]">O(1) Avg Lookup</span>
      </div>

      {/* Hash Map Table */}
      <div className="w-full max-w-full overflow-x-auto pb-2 visualizer-scroll">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#262626] text-[#888888] text-[11px] uppercase tracking-wider">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Key (Hash)</th>
              <th className="py-2 px-3">Value</th>
              <th className="py-2 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-[#555555] italic text-xs"
                >
                  [ Hash Map is currently empty: &#123; &#125; ]
                </td>
              </tr>
            ) : (
              entries.map((entry, idx) => (
                <tr
                  key={idx}
                  className={`border transition-colors ${getRowClasses(
                    entry.status
                  )}`}
                >
                  <td className="py-2.5 px-3 text-[#666666] text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-white">
                    {typeof entry.key === 'string' ? `"${entry.key}"` : entry.key}
                  </td>
                  <td className="py-2.5 px-3 text-blue-400 font-medium">
                    {typeof entry.value === 'string' ? `"${entry.value}"` : entry.value}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {getStatusBadge(entry.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* JSON representation preview */}
      {entries.length > 0 && (
        <div className="w-full p-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] font-mono text-[11px] text-[#888888] overflow-x-auto visualizer-scroll flex items-center gap-2">
          <span className="text-[#555555]">Map View:</span>
          <span className="text-emerald-400">
            &#123;{' '}
            {entries
              .map(
                (e) =>
                  `${typeof e.key === 'string' ? `"${e.key}"` : e.key}: ${e.value}`
              )
              .join(', ')}{' '}
            &#125;
          </span>
        </div>
      )}
    </div>
  );
};

export default HashMapRenderer;
