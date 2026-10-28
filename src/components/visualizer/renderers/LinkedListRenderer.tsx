import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface LinkedListRendererProps {
  state?: VisualizerStep['linkedListState'];
}

export const LinkedListRenderer: React.FC<LinkedListRendererProps> = ({ state }) => {
  if (!state || !state.nodes || state.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Linked List State ]
      </div>
    );
  }

  const { nodes } = state;

  // Build a lookup map of node ID to index in array
  const nodeIndexMap = new Map<string, number>();
  nodes.forEach((n, idx) => {
    nodeIndexMap.set(n.id, idx);
  });

  const getNodeClasses = (status: string) => {
    let base = 'transition-all duration-200 ';

    switch (status) {
      case 'curr':
        base += 'bg-[rgba(0,112,243,0.22)] border-[#0070f3] text-white shadow-[0_0_12px_rgba(0,112,243,0.35)] ring-2 ring-[#0070f3] scale-105';
        break;
      case 'prev':
        base += 'bg-[rgba(168,85,247,0.2)] border-[#a855f7] text-[#d8b4fe] ring-1 ring-[#a855f7]/60';
        break;
      case 'next':
        base += 'bg-[rgba(56,189,248,0.2)] border-[#38bdf8] text-[#38bdf8] ring-1 ring-[#38bdf8]/60';
        break;
      case 'fast':
        base += 'bg-[rgba(245,166,35,0.2)] border-[#f5a623] text-[#f5a623] ring-1 ring-[#f5a623]/60';
        break;
      case 'slow':
        base += 'bg-[rgba(236,72,153,0.2)] border-[#ec4899] text-[#f472b6] ring-1 ring-[#ec4899]/60';
        break;
      case 'visited':
        base += 'bg-[rgba(0,223,114,0.18)] border-[#00df72] text-[#00df72] shadow-[0_0_8px_rgba(0,223,114,0.25)]';
        break;
      case 'default':
      default:
        base += 'bg-[#141414] border-[#262626] text-[#ededed]';
        break;
    }

    return base;
  };

  const getPointerBadgeColor = (status: string) => {
    switch (status) {
      case 'curr':
        return 'bg-[#0070f3] text-white border-blue-400';
      case 'prev':
        return 'bg-purple-950 text-purple-300 border-purple-600';
      case 'next':
        return 'bg-sky-950 text-sky-300 border-sky-600';
      case 'fast':
        return 'bg-amber-950 text-amber-300 border-amber-600';
      case 'slow':
        return 'bg-pink-950 text-pink-300 border-pink-600';
      case 'visited':
        return 'bg-emerald-950 text-emerald-300 border-emerald-600';
      default:
        return 'bg-[#222222] text-[#888888] border-[#333333]';
    }
  };

  // Detect cycle if any node has nextId pointing to an earlier or existing node
  let cycleDetected: { fromId: string; toId: string } | null = null;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nextId) {
      const targetIdx = nodeIndexMap.get(node.nextId);
      if (targetIdx !== undefined && targetIdx <= i) {
        cycleDetected = { fromId: node.id, toId: node.nextId };
        break;
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Linked List Info & Cycle Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#ededed] font-semibold">
            Linked List Chain
          </span>
          <span className="text-[#888888]">
            Nodes: <strong className="text-white">{nodes.length}</strong>
          </span>
        </div>

        {cycleDetected ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/50 text-amber-400 text-[11px] animate-pulse">
            <span>↺</span>
            <span>Cycle Detected: Node [{cycleDetected.fromId}] → Node [{cycleDetected.toId}]</span>
          </div>
        ) : (
          <span className="text-[11px] text-[#666666]">Singly Linked List</span>
        )}
      </div>

      {/* Linked List Horizontal Node Chain */}
      <div className="w-full overflow-x-auto pb-4 pt-2 flex justify-center">
        <div className="inline-flex items-center gap-3 px-4 min-w-max">
          {nodes.map((node, idx) => {
            const hasNext = Boolean(node.nextId);
            const isCycleSource = cycleDetected && cycleDetected.fromId === node.id;
            const isCycleTarget = cycleDetected && cycleDetected.toId === node.id;
            const isLastNode = idx === nodes.length - 1;

            return (
              <React.Fragment key={node.id || idx}>
                {/* Node Container with Pointers */}
                <div className="flex flex-col items-center">
                  {/* Status Pointer Badges (Above Node) */}
                  <div className="flex flex-col items-center gap-1 min-h-[26px] justify-end mb-1.5">
                    {node.status !== 'default' && (
                      <div className="flex flex-col items-center animate-bounce">
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] border shadow-sm ${getPointerBadgeColor(
                            node.status
                          )}`}
                        >
                          {node.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-[#888888] -mt-0.5">▼</span>
                      </div>
                    )}
                  </div>

                  {/* Node Box with Value and Next Pointer Compartment */}
                  <div
                    className={`flex items-center rounded-xl border shadow-lg overflow-hidden font-mono ${getNodeClasses(
                      node.status
                    )} ${isCycleTarget ? 'ring-2 ring-amber-400' : ''}`}
                  >
                    {/* Value Compartment */}
                    <div className="px-4 py-3 min-w-[54px] text-center font-bold text-base sm:text-lg">
                      {node.value}
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] h-9 bg-current opacity-25" />

                    {/* Next Pointer Dot Compartment */}
                    <div className="px-2.5 py-3 flex items-center justify-center bg-black/30 text-[10px] text-[#888888] title='Next Pointer'">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400/80 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
                    </div>
                  </div>

                  {/* Node ID & Optional Random Pointer Sub-label */}
                  <div className="flex flex-col items-center mt-1.5 text-[10px] font-mono text-[#666666]">
                    <span>id: {node.id}</span>
                    {node.randomId && (
                      <span className="text-purple-400 font-semibold">
                        random → [{node.randomId}]
                      </span>
                    )}
                  </div>
                </div>

                {/* Connecting Arrow or Terminator */}
                {isCycleSource ? (
                  /* Cycle Back-Pointer Indicator */
                  <div className="flex items-center px-1 text-amber-400 font-mono text-xs">
                    <span className="px-2 py-1 rounded bg-amber-950/60 border border-amber-500/50 flex items-center gap-1 shadow-sm">
                      ↺ ──▶ [{cycleDetected?.toId}]
                    </span>
                  </div>
                ) : hasNext ? (
                  /* Standard Forward Pointer Arrow */
                  <div className="flex items-center text-blue-400/80 text-xl font-bold px-0.5 select-none animate-pulse">
                    →
                  </div>
                ) : isLastNode || node.nextId === null ? (
                  /* NULL Terminator Badge */
                  <div className="flex items-center gap-1.5 pl-1">
                    <span className="text-blue-400/80 text-xl font-bold select-none">→</span>
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] text-[#888888] font-mono text-xs font-semibold">
                      <span className="text-red-400">⊘</span>
                      <span>NULL</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-blue-400/80 text-xl font-bold px-0.5 select-none">
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkedListRenderer;
