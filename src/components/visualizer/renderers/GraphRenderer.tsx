import React from 'react';
import type { VisualizerStep } from '../../../types/visualizer';

export interface GraphRendererProps {
  state?: VisualizerStep['graphState'];
}

export const GraphRenderer: React.FC<GraphRendererProps> = ({ state }) => {
  if (!state || !state.nodes || state.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs font-mono text-[#666666] border border-dashed border-[#262626] rounded-lg">
        [ Empty Graph State ]
      </div>
    );
  }

  const { nodes, edges = [] } = state;
  const numNodes = nodes.length;

  // Compute node coordinates along an aesthetic circular layout
  const svgWidth = 520;
  const svgHeight = 280;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const radius = Math.min(105, 50 + numNodes * 8);

  const nodeCoords = new Map<string, { x: number; y: number }>();

  nodes.forEach((node, idx) => {
    if (numNodes === 1) {
      nodeCoords.set(node.id, { x: centerX, y: centerY });
    } else if (numNodes === 2) {
      nodeCoords.set(node.id, {
        x: idx === 0 ? centerX - 90 : centerX + 90,
        y: centerY,
      });
    } else {
      const angle = (2 * Math.PI * idx) / numNodes - Math.PI / 2;
      const x = Math.round(centerX + radius * Math.cos(angle));
      const y = Math.round(centerY + radius * Math.sin(angle));
      nodeCoords.set(node.id, { x, y });
    }
  });

  const getNodeColors = (status: string) => {
    switch (status) {
      case 'visiting':
        return {
          fill: 'rgba(0, 112, 243, 0.28)',
          stroke: '#0070f3',
          text: '#ffffff',
          glow: 'drop-shadow(0 0 8px rgba(0, 112, 243, 0.6))',
          strokeWidth: 2.5,
        };
      case 'visited':
        return {
          fill: 'rgba(0, 223, 114, 0.2)',
          stroke: '#00df72',
          text: '#00df72',
          glow: 'drop-shadow(0 0 6px rgba(0, 223, 114, 0.35))',
          strokeWidth: 2,
        };
      case 'unvisited':
      default:
        return {
          fill: '#141414',
          stroke: '#2e2e2e',
          text: '#888888',
          glow: 'none',
          strokeWidth: 1.5,
        };
    }
  };

  const visitedNodes = nodes.filter((n) => n.status === 'visited');
  const visitingNodes = nodes.filter((n) => n.status === 'visiting');
  const activeEdges = edges.filter((e) => e.active);

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1f1f1f]">
      {/* Graph Metrics & Status Banner */}
      <div className="w-full flex items-center justify-between text-xs font-mono px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#ededed] font-semibold">
            Adjacency Graph
          </span>
          <span className="text-[#888888]">
            Nodes: <strong className="text-white">{numNodes}</strong>
          </span>
          <span className="text-[#888888]">
            Edges: <strong className="text-white">{edges.length}</strong>
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-[#0070f3]" /> Visiting
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#00df72]" /> Visited
          </span>
          <span className="flex items-center gap-1 text-[#666666]">
            <span className="w-2 h-2 rounded-full bg-[#333333]" /> Unvisited
          </span>
        </div>
      </div>

      {/* SVG Canvas for Graph Rendering */}
      <div className="w-full max-w-full overflow-x-auto py-1 visualizer-scroll">
        <div className="min-w-full w-max flex justify-center px-4">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[540px] select-none"
            style={{ minHeight: `${svgHeight}px` }}
          >
          {/* Arrowhead marker definition */}
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="26"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#444444" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="26"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0070f3" />
            </marker>
          </defs>

          {/* Edges */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const fromCoord = nodeCoords.get(edge.from);
              const toCoord = nodeCoords.get(edge.to);
              if (!fromCoord || !toCoord) return null;

              const isActive = Boolean(edge.active);
              const midX = (fromCoord.x + toCoord.x) / 2;
              const midY = (fromCoord.y + toCoord.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={fromCoord.x}
                    y1={fromCoord.y}
                    x2={toCoord.x}
                    y2={toCoord.y}
                    stroke={isActive ? '#0070f3' : '#262626'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? '4,3' : 'none'}
                    markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-default)'}
                    className="transition-all duration-300"
                  />
                  {edge.weight !== undefined && (
                    <text
                      x={midX}
                      y={midY - 5}
                      textAnchor="middle"
                      fontSize={10}
                      fontFamily="Geist Mono, monospace"
                      fill={isActive ? '#0070f3' : '#888888'}
                      className="font-bold select-none"
                    >
                      {edge.weight}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const coord = nodeCoords.get(node.id);
              if (!coord) return null;
              const colors = getNodeColors(node.status);
              const isVisiting = node.status === 'visiting';

              return (
                <g
                  key={node.id}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  style={{ filter: colors.glow }}
                  className="transition-all duration-200"
                >
                  {isVisiting && (
                    <circle
                      r={25}
                      fill="none"
                      stroke="#0070f3"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                      className="animate-ping"
                    />
                  )}

                  {/* Circular Node Body */}
                  <circle
                    r={19}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={colors.strokeWidth}
                  />

                  {/* Node Label Text */}
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={12}
                    fontFamily="Geist Mono, ui-monospace, monospace"
                    fontWeight="bold"
                    fill={colors.text}
                  >
                    {node.label || node.id}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        </div>
      </div>

      {/* Traversal State Inspector (Visited Set & Queue Display) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
        {/* Visited Set Box */}
        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] text-[#888888] uppercase">
            <span>Visited Set &#123; &#125;</span>
            <span className="text-emerald-400 font-bold">{visitedNodes.length} visited</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap min-h-[22px]">
            {visitedNodes.length === 0 ? (
              <span className="text-[11px] text-[#555555] italic">empty &#123; &#125;</span>
            ) : (
              visitedNodes.map((n) => (
                <span
                  key={n.id}
                  className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold"
                >
                  {n.label || n.id}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Active Node / Edge Box */}
        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] text-[#888888] uppercase">
            <span>Active Frontiers</span>
            <span className="text-blue-400 font-bold">
              {visitingNodes.length > 0 ? 'Exploring' : 'Idle'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap min-h-[22px]">
            {visitingNodes.map((n) => (
              <span
                key={n.id}
                className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/40 text-[11px] font-semibold animate-pulse"
              >
                ● {n.label || n.id}
              </span>
            ))}
            {activeEdges.map((e, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-[#111111] text-blue-400 border border-blue-500/30 text-[11px]"
              >
                {e.from} → {e.to}
              </span>
            ))}
            {visitingNodes.length === 0 && activeEdges.length === 0 && (
              <span className="text-[11px] text-[#555555] italic">no active frontiers</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphRenderer;
