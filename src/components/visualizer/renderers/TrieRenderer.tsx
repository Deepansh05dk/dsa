import React from 'react';

export interface TrieNodeState {
  id: string;
  char: string;
  isEndOfWord?: boolean;
  children?: string[]; // IDs of child nodes
  status?: 'default' | 'current' | 'matched' | 'inserted' | 'highlighted';
}

export interface TrieVisualState {
  rootId?: string;
  nodes: TrieNodeState[];
  activeWord?: string;
  searchWord?: string;
}

// Module augmentation to extend VisualizerStep with trieState
declare module '../../../types/visualizer' {
  interface VisualizerStep {
    trieState?: TrieVisualState;
  }
}

export interface TrieRendererProps {
  state?: TrieVisualState;
}

interface ComputedTriePos {
  id: string;
  char: string;
  isEndOfWord?: boolean;
  status: 'default' | 'current' | 'matched' | 'inserted' | 'highlighted';
  x: number;
  y: number;
  depth: number;
}

export const TrieRenderer: React.FC<TrieRendererProps> = ({ state }) => {
  if (!state || !state.nodes || state.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Trie State ]
      </div>
    );
  }

  const { nodes, rootId, activeWord, searchWord } = state;

  // Build node lookup map
  const nodeMap = new Map<string, TrieNodeState>();
  const childIds = new Set<string>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
    if (node.children) {
      for (const c of node.children) {
        childIds.add(c);
      }
    }
  }

  // Find root node
  let rootNode: TrieNodeState | undefined;
  if (rootId && nodeMap.has(rootId)) {
    rootNode = nodeMap.get(rootId);
  } else {
    // Find node with no incoming parent, or char === '' or id === 'root'
    rootNode =
      nodes.find((n) => n.id === 'root' || n.char === '' || n.char === '●' || n.char === '^') ||
      nodes.find((n) => !childIds.has(n.id)) ||
      nodes[0];
  }

  // Compute hierarchical layout coordinates
  const computedPositions = new Map<string, ComputedTriePos>();
  const edges: Array<{ from: ComputedTriePos; to: ComputedTriePos }> = [];

  let maxDepth = 0;
  const svgWidth = 620;
  const verticalSpacing = 68;
  const topPadding = 42;

  const layoutSubtree = (nodeId: string, depth: number, minX: number, maxX: number) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (depth > maxDepth) maxDepth = depth;
    const x = Math.round((minX + maxX) / 2);
    const y = topPadding + depth * verticalSpacing;

    const pos: ComputedTriePos = {
      id: node.id,
      char: node.char,
      isEndOfWord: node.isEndOfWord,
      status: node.status || 'default',
      x,
      y,
      depth,
    };
    computedPositions.set(nodeId, pos);

    const children = (node.children || []).filter((cid) => nodeMap.has(cid));
    const count = children.length;

    if (count > 0) {
      const sliceWidth = (maxX - minX) / count;
      children.forEach((childId, idx) => {
        const childMinX = minX + idx * sliceWidth;
        const childMaxX = childMinX + sliceWidth;
        layoutSubtree(childId, depth + 1, childMinX, childMaxX);
        const childPos = computedPositions.get(childId);
        if (childPos) {
          edges.push({ from: pos, to: childPos });
        }
      });
    }
  };

  if (rootNode) {
    layoutSubtree(rootNode.id, 0, 15, svgWidth - 15);
  }

  // Place any orphaned nodes at the bottom
  nodes.forEach((n, idx) => {
    if (!computedPositions.has(n.id)) {
      const extraDepth = maxDepth + 1;
      const x = 50 + (idx * 55) % (svgWidth - 100);
      const y = topPadding + extraDepth * verticalSpacing;
      computedPositions.set(n.id, {
        id: n.id,
        char: n.char,
        isEndOfWord: n.isEndOfWord,
        status: n.status || 'default',
        x,
        y,
        depth: extraDepth,
      });
    }
  });

  const svgHeight = Math.max(240, (maxDepth + 1) * verticalSpacing + 65);

  const getNodeColors = (status: string, isEOW?: boolean) => {
    switch (status) {
      case 'current':
        return {
          fill: 'rgba(0, 112, 243, 0.28)',
          stroke: '#0070f3',
          text: '#ffffff',
          glow: 'drop-shadow(0 0 8px rgba(0, 112, 243, 0.6))',
          strokeWidth: 2.5,
        };
      case 'matched':
        return {
          fill: 'rgba(0, 223, 114, 0.25)',
          stroke: '#00df72',
          text: '#00df72',
          glow: 'drop-shadow(0 0 6px rgba(0, 223, 114, 0.4))',
          strokeWidth: 2,
        };
      case 'inserted':
        return {
          fill: 'rgba(245, 166, 35, 0.25)',
          stroke: '#f5a623',
          text: '#f5a623',
          glow: 'drop-shadow(0 0 6px rgba(245, 166, 35, 0.4))',
          strokeWidth: 2,
        };
      case 'highlighted':
        return {
          fill: 'rgba(168, 85, 247, 0.25)',
          stroke: '#a855f7',
          text: '#d8b4fe',
          glow: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))',
          strokeWidth: 2,
        };
      case 'default':
      default:
        return {
          fill: isEOW ? 'rgba(0, 223, 114, 0.12)' : '#141414',
          stroke: isEOW ? '#00df72' : '#333333',
          text: '#ededed',
          glow: 'none',
          strokeWidth: isEOW ? 2 : 1.5,
        };
    }
  };

  const endOfWordNodes = nodes.filter((n) => n.isEndOfWord);

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Trie Metrics & Word Tracker Banner */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#ededed] font-semibold">
            Trie (Prefix Tree)
          </span>
          <span className="text-[#888888]">
            Nodes: <strong className="text-white">{nodes.length}</strong>
          </span>
          <span className="text-emerald-400">
            Words: <strong className="text-emerald-300">{endOfWordNodes.length}</strong>
          </span>
        </div>

        {/* Word Query or Target Indicator */}
        {(activeWord || searchWord) && (
          <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#0a192f] border border-[#0070f3]/40 text-blue-400 text-[11px]">
            <span>Query:</span>
            <span className="font-bold text-white tracking-wider font-mono">
              "{activeWord || searchWord}"
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full border border-emerald-400 bg-emerald-950" /> EOW (End of Word)
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-[#0070f3]" /> Active
          </span>
        </div>
      </div>

      {/* SVG Canvas for Trie Rendering */}
      <div className="w-full overflow-x-auto flex justify-center py-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[640px] select-none"
          style={{ minHeight: `${svgHeight}px` }}
        >
          {/* Edges */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const isHighlight =
                edge.from.status === 'current' ||
                edge.to.status === 'current' ||
                edge.to.status === 'matched';

              return (
                <line
                  key={idx}
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                  stroke={isHighlight ? '#0070f3' : '#262626'}
                  strokeWidth={isHighlight ? 2.5 : 1.5}
                  strokeDasharray={isHighlight ? 'none' : '3,3'}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {Array.from(computedPositions.values()).map((pos) => {
              const isRoot = rootNode && pos.id === rootNode.id;
              const isEOW = Boolean(pos.isEndOfWord);
              const colors = getNodeColors(pos.status, isEOW);

              return (
                <g
                  key={pos.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{ filter: colors.glow }}
                  className="transition-all duration-200"
                >
                  {/* Ping Animation for Current Step */}
                  {pos.status === 'current' && (
                    <circle
                      r={24}
                      fill="none"
                      stroke="#0070f3"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                      className="animate-ping"
                    />
                  )}

                  {/* Concentric Ring for End of Word (EOW) Nodes */}
                  {isEOW && (
                    <circle
                      r={22}
                      fill="none"
                      stroke="#00df72"
                      strokeWidth={1.5}
                      strokeDasharray="2,2"
                      className="animate-spin-slow"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r={17}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={colors.strokeWidth}
                  />

                  {/* Character Value */}
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={isRoot ? 10 : 13}
                    fontFamily="Geist Mono, ui-monospace, monospace"
                    fontWeight="bold"
                    fill={colors.text}
                  >
                    {isRoot ? 'ROOT' : pos.char || '•'}
                  </text>

                  {/* EOW Badge Indicator below node */}
                  {isEOW && (
                    <text
                      textAnchor="middle"
                      dy="27"
                      fontSize={8}
                      fontFamily="Geist Mono, monospace"
                      fontWeight="bold"
                      fill="#00df72"
                    >
                      ● EOW
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default TrieRenderer;
