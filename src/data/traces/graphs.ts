import type { VisualizerStep } from '../../types/visualizer';

export const GRAPH_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 207: Course Schedule (Cycle Detection in Directed Graph)
  207: [
    {
      stepIndex: 0,
      title: 'Build Adjacency List & Compute In-Degrees',
      description: 'Courses: 0, 1, 2, 3. Prerequisites: [1, 0] (0->1), [2, 0] (0->2), [3, 1] (1->3), [3, 2] (2->3). In-degrees: {0: 0, 1: 1, 2: 1, 3: 2}.',
      codeLineHighlight: 2,
      variables: { inDegree_0: 0, inDegree_1: 1, inDegree_2: 1, inDegree_3: 2, queue: '[0]' },
      graphState: {
        nodes: [
          { id: '0', label: 'C0 (in:0)', status: 'visiting' },
          { id: '1', label: 'C1 (in:1)', status: 'unvisited' },
          { id: '2', label: 'C2 (in:1)', status: 'unvisited' },
          { id: '3', label: 'C3 (in:2)', status: 'unvisited' },
        ],
        edges: [
          { from: '0', to: '1', active: true },
          { from: '0', to: '2', active: true },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Process Course 0 (In-degree 0): Decrement Neighbors',
      description: 'Take Course 0. Decrement in-degree of Course 1 (1->0) and Course 2 (1->0). Both reach in-degree 0 and enter BFS queue.',
      codeLineHighlight: 6,
      variables: { taken: 1, queue: '[1, 2]', activeCourse: 0 },
      graphState: {
        nodes: [
          { id: '0', label: 'C0', status: 'visited' },
          { id: '1', label: 'C1 (in:0)', status: 'visiting' },
          { id: '2', label: 'C2 (in:0)', status: 'visiting' },
          { id: '3', label: 'C3 (in:2)', status: 'unvisited' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3', active: true },
          { from: '2', to: '3', active: true },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Process Courses 1 and 2: Decrement Course 3',
      description: 'Take Course 1 and Course 2. Decrement in-degree of Course 3 from 2 down to 0. Enqueue Course 3.',
      codeLineHighlight: 7,
      variables: { taken: 3, queue: '[3]', inDegree_3: 0 },
      graphState: {
        nodes: [
          { id: '0', label: 'C0', status: 'visited' },
          { id: '1', label: 'C1', status: 'visited' },
          { id: '2', label: 'C2', status: 'visited' },
          { id: '3', label: 'C3 (in:0)', status: 'visiting' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Process Course 3: All 4 Courses Successfully Completed',
      description: 'Total courses completed = 4 === numCourses. No cycle detected in prerequisite DAG. Return true.',
      codeLineHighlight: 10,
      variables: { completedCourses: 4, canFinish: true, timeComplexity: 'O(V + E)' },
      graphState: {
        nodes: [
          { id: '0', label: 'C0', status: 'visited' },
          { id: '1', label: 'C1', status: 'visited' },
          { id: '2', label: 'C2', status: 'visited' },
          { id: '3', label: 'C3', status: 'visited' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
  ],

  // Problem 210: Course Schedule II (Topological Sort Order)
  210: [
    {
      stepIndex: 0,
      title: 'Initialize Topological Order & Kahn Algorithm',
      description: 'Prerequisites form DAG with courses [0, 1, 2, 3]. Find source node with in-degree 0.',
      codeLineHighlight: 2,
      variables: { order: '[]', queue: '[0]' },
      graphState: {
        nodes: [
          { id: '0', label: '0', status: 'visiting' },
          { id: '1', label: '1', status: 'unvisited' },
          { id: '2', label: '2', status: 'unvisited' },
          { id: '3', label: '3', status: 'unvisited' },
        ],
        edges: [
          { from: '0', to: '1', active: true },
          { from: '0', to: '2', active: true },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Append Course 0 to Topological Order',
      description: 'Order: [0]. Neighbors 1 and 2 become ready (in-degree = 0).',
      codeLineHighlight: 5,
      variables: { order: '[0]', queue: '[1, 2]' },
      graphState: {
        nodes: [
          { id: '0', label: '0', status: 'visited' },
          { id: '1', label: '1', status: 'visiting' },
          { id: '2', label: '2', status: 'visiting' },
          { id: '3', label: '3', status: 'unvisited' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3', active: true },
          { from: '2', to: '3', active: true },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Append Courses 1 and 2 to Order -> [0, 1, 2]',
      description: 'Order: [0, 1, 2]. Course 3 in-degree decremented to 0. Enqueue course 3.',
      codeLineHighlight: 7,
      variables: { order: '[0, 1, 2]', queue: '[3]' },
      graphState: {
        nodes: [
          { id: '0', label: '0', status: 'visited' },
          { id: '1', label: '1', status: 'visited' },
          { id: '2', label: '2', status: 'visited' },
          { id: '3', label: '3', status: 'visiting' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Final Topological Order: [0, 1, 2, 3]',
      description: 'Valid curriculum sequence produced. Time: O(V + E), Space: O(V + E).',
      codeLineHighlight: 11,
      variables: { result: '[0, 1, 2, 3]', complete: true },
      graphState: {
        nodes: [
          { id: '0', label: '0', status: 'visited' },
          { id: '1', label: '1', status: 'visited' },
          { id: '2', label: '2', status: 'visited' },
          { id: '3', label: '3', status: 'visited' },
        ],
        edges: [
          { from: '0', to: '1' },
          { from: '0', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '3' },
        ],
      },
    },
  ],

  // Problem 127: Word Ladder (Shortest BFS Path in Word Graph)
  127: [
    {
      stepIndex: 0,
      title: 'Initialize BFS Frontier at beginWord = "hit"',
      description: 'Target endWord: "cog". Word list: ["hot", "dot", "dog", "lot", "log", "cog"]. Level 1: "hit".',
      codeLineHighlight: 2,
      variables: { level: 1, currentWord: 'hit', queue: '["hit"]' },
      graphState: {
        nodes: [
          { id: 'hit', label: 'hit', status: 'visiting' },
          { id: 'hot', label: 'hot', status: 'unvisited' },
          { id: 'dot', label: 'dot', status: 'unvisited' },
          { id: 'dog', label: 'dog', status: 'unvisited' },
          { id: 'cog', label: 'cog', status: 'unvisited' },
        ],
        edges: [
          { from: 'hit', to: 'hot', active: true },
          { from: 'hot', to: 'dot' },
          { from: 'dot', to: 'dog' },
          { from: 'dog', to: 'cog' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Level 2: Mutate 1 Char -> "hot"',
      description: 'Only valid 1-letter mutation from "hit" is "hot". Enqueue "hot". Distance = 2.',
      codeLineHighlight: 5,
      variables: { level: 2, queue: '["hot"]', visited: '{"hit", "hot"}' },
      graphState: {
        nodes: [
          { id: 'hit', label: 'hit', status: 'visited' },
          { id: 'hot', label: 'hot', status: 'visiting' },
          { id: 'dot', label: 'dot', status: 'unvisited' },
          { id: 'dog', label: 'dog', status: 'unvisited' },
          { id: 'cog', label: 'cog', status: 'unvisited' },
        ],
        edges: [
          { from: 'hit', to: 'hot' },
          { from: 'hot', to: 'dot', active: true },
          { from: 'dot', to: 'dog' },
          { from: 'dog', to: 'cog' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Level 3 & 4: Advance Frontier through "dot" -> "dog"',
      description: 'From "hot" -> "dot" (dist: 3). From "dot" -> "dog" (dist: 4). Active edge approaches "cog".',
      codeLineHighlight: 7,
      variables: { level: 4, current: 'dog', targetNeighbor: 'cog' },
      graphState: {
        nodes: [
          { id: 'hit', label: 'hit', status: 'visited' },
          { id: 'hot', label: 'hot', status: 'visited' },
          { id: 'dot', label: 'dot', status: 'visited' },
          { id: 'dog', label: 'dog', status: 'visiting' },
          { id: 'cog', label: 'cog', status: 'unvisited' },
        ],
        edges: [
          { from: 'hit', to: 'hot' },
          { from: 'hot', to: 'dot' },
          { from: 'dot', to: 'dog' },
          { from: 'dog', to: 'cog', active: true },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Target "cog" Reached! Shortest Transformation Length = 5',
      description: 'Path: "hit" -> "hot" -> "dot" -> "dog" -> "cog". Total 5 words. Time: O(M^2 * N), Space: O(M^2 * N).',
      codeLineHighlight: 10,
      variables: { shortestLength: 5, targetFound: true },
      graphState: {
        nodes: [
          { id: 'hit', label: 'hit', status: 'visited' },
          { id: 'hot', label: 'hot', status: 'visited' },
          { id: 'dot', label: 'dot', status: 'visited' },
          { id: 'dog', label: 'dog', status: 'visited' },
          { id: 'cog', label: 'cog', status: 'visited' },
        ],
        edges: [
          { from: 'hit', to: 'hot' },
          { from: 'hot', to: 'dot' },
          { from: 'dot', to: 'dog' },
          { from: 'dog', to: 'cog' },
        ],
      },
    },
  ],

  // Problem 133: Clone Graph
  133: [
    {
      stepIndex: 0,
      title: 'Initialize Deep Clone with Node Map',
      description: 'Undirected graph with connected vertices 1, 2, 3, 4. Clone root node 1.',
      codeLineHighlight: 2,
      variables: { clonedNodes: 1, queue: '[1]' },
      graphState: {
        nodes: [
          { id: '1', label: '1 (Orig)', status: 'visiting' },
          { id: '2', label: '2', status: 'unvisited' },
          { id: '3', label: '3', status: 'unvisited' },
          { id: '4', label: '4', status: 'unvisited' },
        ],
        edges: [
          { from: '1', to: '2', active: true },
          { from: '1', to: '4', active: true },
          { from: '2', to: '3' },
          { from: '3', to: '4' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Clone Neighbors of Node 1 (Nodes 2 and 4)',
      description: 'Instantiate cloned nodes 2\' and 4\'. Add edges 1\' <-> 2\' and 1\' <-> 4\'.',
      codeLineHighlight: 5,
      variables: { clonedNodes: 3, queue: '[2, 4]' },
      graphState: {
        nodes: [
          { id: '1', label: "1'", status: 'visited' },
          { id: '2', label: "2'", status: 'visiting' },
          { id: '3', label: '3', status: 'unvisited' },
          { id: '4', label: "4'", status: 'visiting' },
        ],
        edges: [
          { from: '1', to: '2' },
          { from: '1', to: '4' },
          { from: '2', to: '3', active: true },
          { from: '4', to: '3', active: true },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Clone Node 3 & Wire Remaining Edges',
      description: 'Clone node 3\'. Connect 2\' <-> 3\' and 4\' <-> 3\'. All 4 vertices cloned.',
      codeLineHighlight: 7,
      variables: { clonedNodes: 4, complete: true },
      graphState: {
        nodes: [
          { id: '1', label: "1'", status: 'visited' },
          { id: '2', label: "2'", status: 'visited' },
          { id: '3', label: "3'", status: 'visited' },
          { id: '4', label: "4'", status: 'visited' },
        ],
        edges: [
          { from: '1', to: '2' },
          { from: '1', to: '4' },
          { from: '2', to: '3' },
          { from: '3', to: '4' },
        ],
      },
    },
  ],
};

/**
 * Universal generator for all other Graph General & Graph BFS problems
 */
export function generateGraphTrace(_problemId: number, title: string, complexityTime: string): VisualizerStep[] {
  return [
    {
      stepIndex: 0,
      title: `Initialize Graph Traversal for ${title}`,
      description: `Constructing adjacency representation and queue/visited registry for ${title}.`,
      codeLineHighlight: 2,
      variables: { visitedCount: 1, currentVertex: 'A', status: 'init' },
      graphState: {
        nodes: [
          { id: 'A', label: 'A (Start)', status: 'visiting' },
          { id: 'B', label: 'B', status: 'unvisited' },
          { id: 'C', label: 'C', status: 'unvisited' },
          { id: 'D', label: 'D', status: 'unvisited' },
        ],
        edges: [
          { from: 'A', to: 'B', active: true },
          { from: 'A', to: 'C', active: true },
          { from: 'B', to: 'D' },
          { from: 'C', to: 'D' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Traverse Adjacency Frontiers (A -> B, A -> C)',
      description: 'Expanding outward along directed edges. Updating shortest distances or connectivity sets.',
      codeLineHighlight: 5,
      variables: { visitedCount: 3, frontier: '[B, C]' },
      graphState: {
        nodes: [
          { id: 'A', label: 'A', status: 'visited' },
          { id: 'B', label: 'B', status: 'visiting' },
          { id: 'C', label: 'C', status: 'visiting' },
          { id: 'D', label: 'D', status: 'unvisited' },
        ],
        edges: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'B', to: 'D', active: true },
          { from: 'C', to: 'D', active: true },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Visit Target Vertex D and Verify Convergence',
      description: 'Frontier reaches destination component. Cycle or shortest path invariant successfully resolved.',
      codeLineHighlight: 8,
      variables: { visitedCount: 4, destination: 'D', reached: true },
      graphState: {
        nodes: [
          { id: 'A', label: 'A', status: 'visited' },
          { id: 'B', label: 'B', status: 'visited' },
          { id: 'C', label: 'C', status: 'visited' },
          { id: 'D', label: 'D', status: 'visited' },
        ],
        edges: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'B', to: 'D' },
          { from: 'C', to: 'D' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Graph Traversal Complete: Return Result',
      description: `Graph exploration concluded in optimal ${complexityTime} time complexity.`,
      codeLineHighlight: 11,
      variables: { timeComplexity: complexityTime, completed: true },
      graphState: {
        nodes: [
          { id: 'A', label: 'A', status: 'visited' },
          { id: 'B', label: 'B', status: 'visited' },
          { id: 'C', label: 'C', status: 'visited' },
          { id: 'D', label: 'D', status: 'visited' },
        ],
        edges: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'B', to: 'D' },
          { from: 'C', to: 'D' },
        ],
      },
    },
  ];
}
