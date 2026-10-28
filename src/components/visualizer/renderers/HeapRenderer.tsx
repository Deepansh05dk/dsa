import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface HeapRendererProps {
  state?: VisualizerStep['heapState'];
}

export const HeapRenderer: React.FC<HeapRendererProps> = ({ state }) => {
  if (!state || !state.elements || state.elements.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Heap State ]
      </div>
    );
  }

  const { type = 'min', elements } = state;
  const numElements = elements.length;

  // Maximum depth of complete binary tree: floor(log2(N))
  const maxDepth = Math.floor(Math.log2(numElements));
  const svgWidth = 540;
  const verticalSpacing = 58;
  const topPadding = 35;
  const svgHeight = Math.max(180, (maxDepth + 1) * verticalSpacing + 35);

  // Compute node coordinates based on complete binary tree formulas
  const nodePositions = elements.map((el, i) => {
    const depth = Math.floor(Math.log2(i + 1));
    const levelStart = Math.pow(2, depth) - 1;
    const offsetInLevel = i - levelStart;
    const totalSlotsInLevel = Math.pow(2, depth);
    const slotWidth = svgWidth / totalSlotsInLevel;
    const x = Math.round(offsetInLevel * slotWidth + slotWidth / 2);
    const y = topPadding + depth * verticalSpacing;

    return {
      index: i,
      value: el.value,
      status: el.status,
      depth,
      x,
      y,
    };
  });

  // Calculate parent-child edges: node i connects to 2i + 1 and 2i + 2
  const edges: Array<{ from: typeof nodePositions[0]; to: typeof nodePositions[0] }> = [];
  for (let i = 0; i < numElements; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < numElements) {
      edges.push({ from: nodePositions[i], to: nodePositions[leftIdx] });
    }
    if (rightIdx < numElements) {
      edges.push({ from: nodePositions[i], to: nodePositions[rightIdx] });
    }
  }

  const getNodeColors = (status: string) => {
    switch (status) {
      case 'root':
        return {
          fill: 'rgba(0, 112, 243, 0.28)',
          stroke: '#0070f3',
          text: '#ffffff',
          glow: 'drop-shadow(0 0 8px rgba(0, 112, 243, 0.6))',
          strokeWidth: 2.5,
        };
      case 'sifting':
        return {
          fill: 'rgba(245, 166, 35, 0.25)',
          stroke: '#f5a623',
          text: '#f5a623',
          glow: 'drop-shadow(0 0 8px rgba(245, 166, 35, 0.5))',
          strokeWidth: 2.5,
        };
      case 'swapping':
        return {
          fill: 'rgba(168, 85, 247, 0.25)',
          stroke: '#a855f7',
          text: '#d8b4fe',
          glow: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))',
          strokeWidth: 2.5,
        };
      case 'default':
      default:
        return {
          fill: '#141414',
          stroke: '#333333',
          text: '#ededed',
          glow: 'none',
          strokeWidth: 1.5,
        };
    }
  };

  const getArrayElementClasses = (status: string) => {
    switch (status) {
      case 'root':
        return 'bg-[rgba(0,112,243,0.22)] border-[#0070f3] text-white shadow-[0_0_10px_rgba(0,112,243,0.4)] ring-2 ring-[#0070f3] scale-105';
      case 'sifting':
        return 'bg-[rgba(245,166,35,0.22)] border-[#f5a623] text-[#f5a623] ring-2 ring-[#f5a623]/70 scale-105';
      case 'swapping':
        return 'bg-[rgba(168,85,247,0.22)] border-[#a855f7] text-[#d8b4fe] ring-2 ring-[#a855f7]/70 scale-105';
      case 'default':
      default:
        return 'bg-[#141414] border-[#262626] text-[#ededed]';
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Heap Type & Ordering Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded uppercase font-semibold border ${
              type === 'min'
                ? 'bg-blue-950/60 text-blue-400 border-blue-500/40'
                : 'bg-purple-950/60 text-purple-400 border-purple-500/40'
            }`}
          >
            {type.toUpperCase()}-HEAP
          </span>
          <span className="text-[#888888]">
            Elements: <strong className="text-white">{numElements}</strong>
          </span>
          <span className="text-[#888888]">
            Root: <strong className="text-white">{elements[0]?.value}</strong>
          </span>
        </div>

        {/* Index Relationships Tooltip */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#666666]">
          <span>Parent: ⌊(i-1)/2⌋</span>
          <span>•</span>
          <span>Left: 2i+1</span>
          <span>•</span>
          <span>Right: 2i+2</span>
        </div>
      </div>

      {/* View 1: Complete Binary Heap Tree View */}
      <div className="w-full overflow-x-auto flex flex-col items-center py-1">
        <div className="text-[10px] font-mono uppercase text-[#666666] mb-1">
          Visual Tree Hierarchy
        </div>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] select-none"
          style={{ minHeight: `${svgHeight}px` }}
        >
          {/* Tree Edges */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const isHighlight =
                edge.from.status === 'sifting' ||
                edge.to.status === 'sifting' ||
                edge.from.status === 'swapping' ||
                edge.to.status === 'swapping';

              return (
                <line
                  key={idx}
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                  stroke={isHighlight ? '#f5a623' : '#262626'}
                  strokeWidth={isHighlight ? 2 : 1.5}
                  strokeDasharray={isHighlight ? '3,2' : 'none'}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Heap Tree Nodes */}
          <g className="nodes">
            {nodePositions.map((pos) => {
              const colors = getNodeColors(pos.status);
              const isRoot = pos.index === 0;

              return (
                <g
                  key={pos.index}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{ filter: colors.glow }}
                  className="transition-all duration-200"
                >
                  {/* Ping Animation for Sifting / Swapping */}
                  {(pos.status === 'sifting' || pos.status === 'swapping') && (
                    <circle
                      r={24}
                      fill="none"
                      stroke={pos.status === 'sifting' ? '#f5a623' : '#a855f7'}
                      strokeWidth={1}
                      strokeOpacity={0.5}
                      className="animate-ping"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={17}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={colors.strokeWidth}
                  />

                  {/* Node Value */}
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={12}
                    fontFamily="Geist Mono, ui-monospace, monospace"
                    fontWeight="bold"
                    fill={colors.text}
                  >
                    {pos.value}
                  </text>

                  {/* Index Label above node */}
                  <text
                    textAnchor="middle"
                    dy="-23"
                    fontSize={9}
                    fontFamily="Geist Mono, monospace"
                    fill={isRoot ? '#0070f3' : '#666666'}
                    fontWeight={isRoot ? 'bold' : 'normal'}
                  >
                    {isRoot ? '[0] ROOT' : `[${pos.index}]`}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* View 2: Underlying 1D Array Representation */}
      <div className="w-full flex flex-col items-center gap-1.5 pt-2 border-t border-[#1a1a1a]">
        <div className="text-[10px] font-mono uppercase text-[#666666]">
          Underlying 1D Array Storage (Contiguous Memory)
        </div>
        <div className="w-full overflow-x-auto pb-1 flex justify-center">
          <div className="inline-flex gap-2 items-center px-2">
            {elements.map((el, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Array Box */}
                <div
                  className={`w-11 h-12 sm:w-12 sm:h-14 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-xs sm:text-sm ${getArrayElementClasses(
                    el.status
                  )}`}
                >
                  <span>{el.value}</span>
                </div>

                {/* Index Caption */}
                <span className="text-[10px] font-mono text-[#666666] mt-1">
                  [{idx}]
                </span>

                {/* Status Indicator Badge */}
                {el.status !== 'default' && (
                  <span
                    className={`text-[8px] font-mono font-semibold px-1 rounded mt-0.5 ${
                      el.status === 'root'
                        ? 'text-blue-400 bg-blue-950/60'
                        : el.status === 'sifting'
                        ? 'text-amber-400 bg-amber-950/60'
                        : 'text-purple-400 bg-purple-950/60'
                    }`}
                  >
                    {el.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapRenderer;
