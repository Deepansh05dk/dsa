import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface TreeRendererProps {
  state?: VisualizerStep['treeState'];
}

interface ComputedNodePosition {
  id: string;
  value: string | number;
  status: 'default' | 'current' | 'visited' | 'matched' | 'highlighted';
  leftId?: string | null;
  rightId?: string | null;
  x: number;
  y: number;
  depth: number;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({ state }) => {
  if (!state || !state.nodes || state.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Tree State ]
      </div>
    );
  }

  const { nodes } = state;

  // Build node lookup map
  const nodeMap = new Map<string, typeof nodes[0]>();
  const childIds = new Set<string>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
    if (node.leftId) childIds.add(node.leftId);
    if (node.rightId) childIds.add(node.rightId);
  }

  // Find root node (node not referenced as child of any other node)
  const roots = nodes.filter((n) => !childIds.has(n.id));
  const root = roots.length > 0 ? roots[0] : nodes[0];

  // Compute 2D layout coordinates via binary space partitioning
  const computedPositions = new Map<string, ComputedNodePosition>();
  const edges: Array<{ from: ComputedNodePosition; to: ComputedNodePosition; isLeft: boolean }> = [];

  let maxDepth = 0;
  const svgWidth = 600;
  const verticalSpacing = 70;
  const topPadding = 45;

  const layoutSubtree = (nodeId: string, depth: number, minX: number, maxX: number) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (depth > maxDepth) maxDepth = depth;
    const x = Math.round((minX + maxX) / 2);
    const y = topPadding + depth * verticalSpacing;

    const pos: ComputedNodePosition = {
      ...node,
      x,
      y,
      depth,
    };
    computedPositions.set(nodeId, pos);

    if (node.leftId && nodeMap.has(node.leftId)) {
      layoutSubtree(node.leftId, depth + 1, minX, x);
      const childPos = computedPositions.get(node.leftId);
      if (childPos) {
        edges.push({ from: pos, to: childPos, isLeft: true });
      }
    }

    if (node.rightId && nodeMap.has(node.rightId)) {
      layoutSubtree(node.rightId, depth + 1, x, maxX);
      const childPos = computedPositions.get(node.rightId);
      if (childPos) {
        edges.push({ from: pos, to: childPos, isLeft: false });
      }
    }
  };

  layoutSubtree(root.id, 0, 20, svgWidth - 20);

  // Position any disconnected nodes at the bottom
  nodes.forEach((n, idx) => {
    if (!computedPositions.has(n.id)) {
      const extraDepth = maxDepth + 1;
      const x = 50 + (idx * 60) % (svgWidth - 100);
      const y = topPadding + extraDepth * verticalSpacing;
      computedPositions.set(n.id, {
        ...n,
        x,
        y,
        depth: extraDepth,
      });
    }
  });

  const svgHeight = Math.max(240, (maxDepth + 1) * verticalSpacing + 65);

  const getNodeColors = (status: string) => {
    switch (status) {
      case 'current':
        return {
          fill: 'rgba(0, 112, 243, 0.28)',
          stroke: '#0070f3',
          text: '#ffffff',
          glow: 'drop-shadow(0 0 8px rgba(0, 112, 243, 0.6))',
          strokeWidth: 2.5,
        };
      case 'visited':
        return {
          fill: 'rgba(0, 223, 114, 0.22)',
          stroke: '#00df72',
          text: '#00df72',
          glow: 'drop-shadow(0 0 6px rgba(0, 223, 114, 0.4))',
          strokeWidth: 2,
        };
      case 'matched':
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
          fill: '#141414',
          stroke: '#333333',
          text: '#ededed',
          glow: 'none',
          strokeWidth: 1.5,
        };
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Tree Status & Legend Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#ededed] font-semibold">
            Binary Tree / BST Hierarchy
          </span>
          <span className="text-[#888888]">
            Nodes: <strong className="text-white">{nodes.length}</strong>
          </span>
          <span className="text-[#888888]">
            Max Depth: <strong className="text-white">{maxDepth}</strong>
          </span>
        </div>

        {/* Status Legend Pills */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-[#0070f3]" /> Current
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#00df72]" /> Visited
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-[#f5a623]" /> Matched
          </span>
        </div>
      </div>

      {/* SVG Canvas for Tree Rendering */}
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[640px] select-none"
          style={{ minHeight: `${svgHeight}px` }}
        >
          {/* Connecting Parent-Child Edges */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const isHighlight =
                edge.from.status === 'current' ||
                edge.to.status === 'current' ||
                edge.to.status === 'visited';

              return (
                <line
                  key={idx}
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                  stroke={isHighlight ? '#0070f3' : '#262626'}
                  strokeWidth={isHighlight ? 2.5 : 1.5}
                  strokeDasharray={isHighlight ? 'none' : '2,2'}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Tree Nodes */}
          <g className="nodes">
            {Array.from(computedPositions.values()).map((pos) => {
              const colors = getNodeColors(pos.status);
              const isRoot = pos.id === root.id;

              return (
                <g
                  key={pos.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{ filter: colors.glow }}
                  className="transition-all duration-200 cursor-pointer"
                >
                  {/* Outer Ring for Active Nodes */}
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

                  {/* Circular Node Body */}
                  <circle
                    r={18}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={colors.strokeWidth}
                  />

                  {/* Node Value Label */}
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

                  {/* Node ID / Role Caption */}
                  <text
                    textAnchor="middle"
                    dy="28"
                    fontSize={9}
                    fontFamily="Geist Mono, ui-monospace, monospace"
                    fill="#666666"
                  >
                    {isRoot ? `[root:${pos.id}]` : `[${pos.id}]`}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default TreeRenderer;
