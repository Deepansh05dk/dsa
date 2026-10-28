import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';

import { LINKED_LIST_TRACES } from './linked-list';
import { TREE_TRACES, generateTreeTrace } from './trees';
import { GRAPH_TRACES, generateGraphTrace } from './graphs';
import { TRIE_TRACES } from './tries';
import { HEAP_TRACES } from './heaps';
import { DP_TRACES, generateDPTrace } from './dp';
import { MATRIX_TRACES } from './matrix';
import { STACK_TRACES } from './stack';
import { HASHMAP_TRACES } from './hashmap';
import { ARRAY_TRACES, generateArrayTrace } from './arrays';

// Problem 200 trace (Number of Islands) with matrixState as required by tests
const PROBLEM_200_TRACE: VisualizerStep[] = [
  {
    stepIndex: 0,
    title: 'Initialize Grid Traversal at (0, 0)',
    description: 'Starting DFS traversal on 3x3 binary grid. "1" represents land, "0" represents water.',
    codeLineHighlight: 2,
    variables: { r: 0, c: 0, islandsCount: 0, cellType: 'land' },
    matrixState: {
      grid: [
        [{ value: '1', status: 'active' }, { value: '1', status: 'default' }, { value: '0', status: 'obstacle' }],
        [{ value: '1', status: 'default' }, { value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }],
        [{ value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }, { value: '1', status: 'default' }],
      ],
      rowPointer: 0,
      colPointer: 0,
    },
  },
  {
    stepIndex: 1,
    title: 'Trigger DFS Sink: Sink Cell (0, 0) and Neighbors',
    description: 'Found unvisited land at (0, 0). Increment islands count to 1. Run DFS to mark connected land as visited.',
    codeLineHighlight: 5,
    variables: { r: 0, c: 0, islandsCount: 1, action: 'DFS sink' },
    matrixState: {
      grid: [
        [{ value: 'V', status: 'visited' }, { value: '1', status: 'active' }, { value: '0', status: 'obstacle' }],
        [{ value: '1', status: 'active' }, { value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }],
        [{ value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }, { value: '1', status: 'default' }],
      ],
      rowPointer: 0,
      colPointer: 1,
    },
  },
  {
    stepIndex: 2,
    title: 'First Island Fully Explored (3 Connected Cells)',
    description: 'Top-left island components (0,0), (0,1), (1,0) all sunk to "V". Continue raster scan.',
    codeLineHighlight: 7,
    variables: { r: 1, c: 1, islandsCount: 1 },
    matrixState: {
      grid: [
        [{ value: 'V', status: 'visited' }, { value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }],
        [{ value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }],
        [{ value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }, { value: '1', status: 'default' }],
      ],
      rowPointer: 1,
      colPointer: 1,
    },
  },
  {
    stepIndex: 3,
    title: 'Discover Second Island at (2, 2)',
    description: 'Encountered land cell at (2, 2). Increment islands count to 2. Sink cell.',
    codeLineHighlight: 5,
    variables: { r: 2, c: 2, islandsCount: 2 },
    matrixState: {
      grid: [
        [{ value: 'V', status: 'visited' }, { value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }],
        [{ value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }],
        [{ value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }, { value: 'V', status: 'visited' }],
      ],
      rowPointer: 2,
      colPointer: 2,
    },
  },
  {
    stepIndex: 4,
    title: 'Grid Traversal Complete: Return Total Islands = 2',
    description: 'Entire grid scanned. Total distinct island clusters found: 2. Time: O(M * N), Space: O(M * N).',
    codeLineHighlight: 10,
    variables: { totalIslands: 2, timeComplexity: 'O(M*N)', spaceComplexity: 'O(M*N)' },
    matrixState: {
      grid: [
        [{ value: 'V', status: 'visited' }, { value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }],
        [{ value: 'V', status: 'visited' }, { value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }],
        [{ value: '0', status: 'obstacle' }, { value: '0', status: 'obstacle' }, { value: 'V', status: 'visited' }],
      ],
    },
  },
];

// Unified catalog of all curated problem traces
export const ALL_PROBLEM_TRACES: Record<number, VisualizerStep[]> = {
  ...LINKED_LIST_TRACES,
  ...TREE_TRACES,
  ...GRAPH_TRACES,
  ...TRIE_TRACES,
  ...HEAP_TRACES,
  ...DP_TRACES,
  ...MATRIX_TRACES,
  ...STACK_TRACES,
  ...HASHMAP_TRACES,
  ...ARRAY_TRACES,
  200: PROBLEM_200_TRACE,
};

/**
 * Universal trace dispatcher ensuring every problem exercises the exact
 * visualizer renderer corresponding to its pattern category.
 */
export function getTraceForProblem(problem: LeetCodeProblem): VisualizerStep[] {
  // 1. Direct curated trace match
  if (ALL_PROBLEM_TRACES[problem.id]) {
    return ALL_PROBLEM_TRACES[problem.id];
  }

  const category = (problem.category || problem.pattern || '').toLowerCase();
  const pattern = (problem.pattern || '').toLowerCase();
  const timeComplexity = problem.optimal?.complexity?.time || 'O(N)';

  // 2. Linked List Pattern -> linkedListState
  if (pattern === 'linked-list' || category.includes('linked list')) {
    if (LINKED_LIST_TRACES[problem.id]) {
      return LINKED_LIST_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: `Initialize Linked List Pointers for ${problem.title}`,
        description: `Setting up head and sentinel pointers for ${problem.defaultInputDescription || problem.title}.`,
        codeLineHighlight: 2,
        variables: { head: 'node-1', curr: 'node-1' },
        linkedListState: {
          nodes: [
            { id: 'node-1', value: 1, status: 'curr', nextId: 'node-2' },
            { id: 'node-2', value: 2, status: 'next', nextId: 'node-3' },
            { id: 'node-3', value: 3, status: 'default', nextId: null },
          ],
        },
      },
      {
        stepIndex: 1,
        title: 'Advance Current Pointer & Reorder Nodes',
        description: 'Applying pointer transformations according to the optimal invariant.',
        codeLineHighlight: 5,
        variables: { prev: 'node-1', curr: 'node-2' },
        linkedListState: {
          nodes: [
            { id: 'node-1', value: 1, status: 'prev', nextId: 'node-2' },
            { id: 'node-2', value: 2, status: 'curr', nextId: 'node-3' },
            { id: 'node-3', value: 3, status: 'next', nextId: null },
          ],
        },
      },
      {
        stepIndex: 2,
        title: 'Reach Null Terminator & Verify Invariant',
        description: `Traversal complete. Pointer arrived at end of chain in ${timeComplexity} time.`,
        codeLineHighlight: 8,
        variables: { completed: true, timeComplexity },
        linkedListState: {
          nodes: [
            { id: 'node-1', value: 1, status: 'visited', nextId: 'node-2' },
            { id: 'node-2', value: 2, status: 'visited', nextId: 'node-3' },
            { id: 'node-3', value: 3, status: 'visited', nextId: null },
          ],
        },
      },
    ];
  }

  // 3. Binary Tree / BST Patterns -> treeState
  if (
    pattern.includes('tree') ||
    category.includes('tree') ||
    category.includes('bst')
  ) {
    return generateTreeTrace(problem.id, problem.title, timeComplexity);
  }

  // 4. Graph Patterns -> graphState
  if (pattern.includes('graph') || category.includes('graph')) {
    return generateGraphTrace(problem.id, problem.title, timeComplexity);
  }

  // 5. Trie Pattern -> trieState
  if (pattern.includes('trie') || category.includes('trie')) {
    if (TRIE_TRACES[problem.id]) {
      return TRIE_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: `Initialize Trie Prefix Root for ${problem.title}`,
        description: 'Root node represents empty prefix. Preparing character branch indexing.',
        codeLineHighlight: 2,
        variables: { root: 'ROOT', totalNodes: 1 },
        trieState: {
          rootId: 'root',
          nodes: [{ id: 'root', char: 'ROOT', status: 'current', children: [] }],
        },
      },
      {
        stepIndex: 1,
        title: 'Insert Key into Trie Hierarchy',
        description: 'Branching character nodes created with end-of-word indicator.',
        codeLineHighlight: 5,
        variables: { inserted: 'key', complete: true },
        trieState: {
          rootId: 'root',
          nodes: [
            { id: 'root', char: 'ROOT', status: 'default', children: ['k1'] },
            { id: 'k1', char: 'k', status: 'matched', children: ['e1'] },
            { id: 'e1', char: 'e', status: 'matched', children: ['y1'] },
            { id: 'y1', char: 'y', isEndOfWord: true, status: 'highlighted', children: [] },
          ],
        },
      },
    ];
  }

  // 6. Heap / Priority Queue Pattern -> heapState
  if (pattern.includes('heap') || category.includes('heap')) {
    if (HEAP_TRACES[problem.id]) {
      return HEAP_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: `Initialize Binary Heap for ${problem.title}`,
        description: 'Min-Heap binary tree ordering initialized. Root element tracks extreme value.',
        codeLineHighlight: 2,
        variables: { heapSize: 3, rootVal: 1 },
        heapState: {
          type: 'min',
          elements: [
            { value: 1, status: 'root' },
            { value: 3, status: 'default' },
            { value: 2, status: 'default' },
          ],
        },
      },
      {
        stepIndex: 1,
        title: 'Sift Element to Maintain Heap Invariant',
        description: 'Rebalancing parent-child indices (Parent = floor((i-1)/2)).',
        codeLineHighlight: 5,
        variables: { siftCompleted: true },
        heapState: {
          type: 'min',
          elements: [
            { value: 1, status: 'root' },
            { value: 2, status: 'default' },
            { value: 3, status: 'default' },
          ],
        },
      },
    ];
  }

  // 7. Dynamic Programming (1D & Multidimensional) -> dpTableState
  if (pattern.includes('dp') || category.includes('dp') || category.includes('dynamic')) {
    if (DP_TRACES[problem.id]) {
      return DP_TRACES[problem.id];
    }
    return generateDPTrace(problem.id, problem.title, category, timeComplexity);
  }

  // 8. Matrix Pattern -> matrixState
  if (pattern.includes('matrix') || category.includes('matrix')) {
    if (MATRIX_TRACES[problem.id]) {
      return MATRIX_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: 'Initialize 2D Matrix Bounds and Direction Vectors',
        description: `Preparing matrix traversal for: ${problem.defaultInputDescription || problem.title}.`,
        codeLineHighlight: 2,
        variables: { row: 0, col: 0, status: 'initialized' },
        matrixState: {
          grid: [
            [{ value: 1, status: 'active' }, { value: 2, status: 'default' }, { value: 3, status: 'default' }],
            [{ value: 4, status: 'default' }, { value: 5, status: 'default' }, { value: 6, status: 'default' }],
            [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'default' }],
          ],
          rowPointer: 0,
          colPointer: 0,
        },
      },
      {
        stepIndex: 1,
        title: 'Advance Along Current Row',
        description: 'Inspecting cells and applying boundary constraints according to the pattern.',
        codeLineHighlight: 4,
        variables: { row: 0, col: 1, status: 'scanning' },
        matrixState: {
          grid: [
            [{ value: 1, status: 'visited' }, { value: 2, status: 'active' }, { value: 3, status: 'default' }],
            [{ value: 4, status: 'default' }, { value: 5, status: 'default' }, { value: 6, status: 'default' }],
            [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'default' }],
          ],
          rowPointer: 0,
          colPointer: 1,
        },
      },
      {
        stepIndex: 2,
        title: 'Boundary Invariant Maintained: Shift Traversal Vector',
        description: 'Boundary reached or layer transformed in-place without auxiliary allocation.',
        codeLineHighlight: 7,
        variables: { row: 1, col: 1, status: 'transforming' },
        matrixState: {
          grid: [
            [{ value: 1, status: 'visited' }, { value: 2, status: 'visited' }, { value: 3, status: 'path' }],
            [{ value: 4, status: 'default' }, { value: 5, status: 'active' }, { value: 6, status: 'default' }],
            [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'default' }],
          ],
          rowPointer: 1,
          colPointer: 1,
        },
      },
      {
        stepIndex: 3,
        title: 'Finalize Matrix State & Return Result',
        description: `Optimal solution executed cleanly with ${timeComplexity} time complexity.`,
        codeLineHighlight: 10,
        variables: { timeComplexity, spaceComplexity: problem.optimal?.complexity?.space || 'O(1)' },
        matrixState: {
          grid: [
            [{ value: 1, status: 'visited' }, { value: 2, status: 'visited' }, { value: 3, status: 'visited' }],
            [{ value: 4, status: 'visited' }, { value: 5, status: 'visited' }, { value: 6, status: 'visited' }],
            [{ value: 7, status: 'visited' }, { value: 8, status: 'visited' }, { value: 9, status: 'visited' }],
          ],
        },
      },
    ];
  }

  // 9. Stack Pattern -> stackQueueState
  if (pattern.includes('stack') || category.includes('stack')) {
    if (STACK_TRACES[problem.id]) {
      return STACK_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: `Initialize LIFO Stack for ${problem.title}`,
        description: `Setting up stack for: ${problem.defaultInputDescription || problem.title}.`,
        codeLineHighlight: 2,
        variables: { size: 0, status: 'empty' },
        stackQueueState: {
          type: 'stack',
          items: [],
        },
      },
      {
        stepIndex: 1,
        title: 'Push First Element to Stack',
        description: 'New element pushed onto the top of the stack.',
        codeLineHighlight: 4,
        variables: { size: 1, top: 'item_1' },
        stackQueueState: {
          type: 'stack',
          items: [{ value: 'item_1', status: 'pushed' }],
        },
      },
      {
        stepIndex: 2,
        title: 'Evaluate Invariant and Pop Element',
        description: 'Top element popped as matching criteria or monotonic condition is met.',
        codeLineHighlight: 7,
        variables: { size: 0, popped: 'item_1' },
        stackQueueState: {
          type: 'stack',
          items: [{ value: 'item_1', status: 'popped' }],
        },
      },
    ];
  }

  // 10. Hashmap Pattern -> hashMapState
  if (pattern.includes('hash') || category.includes('hash')) {
    if (HASHMAP_TRACES[problem.id]) {
      return HASHMAP_TRACES[problem.id];
    }
    return [
      {
        stepIndex: 0,
        title: `Initialize Hash Map Table for ${problem.title}`,
        description: `Setting up key-value hash table for ${problem.defaultInputDescription || problem.title}.`,
        codeLineHighlight: 2,
        variables: { size: 0, status: 'empty' },
        hashMapState: {
          entries: [],
        },
      },
      {
        stepIndex: 1,
        title: 'Insert Key into Hash Map',
        description: 'Hashing key and placing into bucket.',
        codeLineHighlight: 4,
        variables: { size: 1, key: 'k1', value: 1 },
        hashMapState: {
          entries: [{ key: 'k1', value: 1, status: 'inserted' }],
        },
      },
      {
        stepIndex: 2,
        title: 'Execution Complete: Solution Found',
        description: `Optimal solution completed in ${timeComplexity}.`,
        codeLineHighlight: 8,
        variables: { timeComplexity, entries: 1 },
        hashMapState: {
          entries: [{ key: 'k1', value: 1, status: 'default' }],
        },
      },
    ];
  }

  // 11. Array / Two Pointers / Sliding Window / Binary Search / Kadane / Intervals / Bit / Math
  if (ARRAY_TRACES[problem.id]) {
    return ARRAY_TRACES[problem.id];
  }

  return generateArrayTrace(problem);
}
