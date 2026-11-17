import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';
import { parseNumberArray, parseSingleNumber, parseStringInput } from './helpers';

/**
 * 1. Tree Pattern Engine (binary-tree-general, binary-tree-bfs, binary-search-tree)
 * Emits treeState with authentic parent-child node connections and traversal highlights.
 */
export function simulateTreePattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawRoot = input.root ?? input.input ?? [3, 9, 20, null, null, 15, 7];

  // Parse level-order values
  let values: Array<string | number | null> = [];
  if (Array.isArray(rawRoot)) {
    values = rawRoot;
  } else if (typeof rawRoot === 'string') {
    const cleaned = rawRoot.replace(/[\[\]]/g, '').trim();
    values = cleaned.split(/[\s,]+/).map((s) => {
      const v = s.trim();
      if (v === 'null' || v === '') return null;
      const num = Number(v);
      return isNaN(num) ? v : num;
    });
  }

  if (values.length === 0 || values[0] === null) {
    return [
      {
        stepIndex: 0,
        title: 'Empty Tree (root = null)',
        description: 'The binary tree is empty. Depth is 0 and traversal returns empty.',
        codeLineHighlight: 2,
        variables: { root: 'null', result: 0 },
        treeState: { nodes: [] },
      },
    ];
  }

  // Construct level-order binary tree nodes
  interface TreeNodeObj {
    id: string;
    value: string | number;
    leftId?: string | null;
    rightId?: string | null;
    depth: number;
  }

  const treeNodes: TreeNodeObj[] = [];
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    if (val !== null && val !== undefined) {
      const leftChildIdx = 2 * i + 1;
      const rightChildIdx = 2 * i + 2;

      treeNodes.push({
        id: `node-${i}`,
        value: val,
        leftId: leftChildIdx < values.length && values[leftChildIdx] !== null ? `node-${leftChildIdx}` : null,
        rightId: rightChildIdx < values.length && values[rightChildIdx] !== null ? `node-${rightChildIdx}` : null,
        depth: Math.floor(Math.log2(i + 1)),
      });
    }
  }

  // Initial Step
  steps.push({
    stepIndex: 0,
    title: `Initialize Tree Traversal for ${problem.title}`,
    description: `Constructed binary tree with ${treeNodes.length} active node(s). Root node is ${treeNodes[0]?.value}. Ready to execute optimal algorithmic traversal.`,
    codeLineHighlight: 2,
    variables: { rootVal: treeNodes[0]?.value, totalNodes: treeNodes.length, currentDepth: 1 },
    treeState: {
      nodes: treeNodes.map((n, idx) => ({
        id: n.id,
        value: n.value,
        status: idx === 0 ? 'current' : 'default',
        leftId: n.leftId,
        rightId: n.rightId,
      })),
    },
  });

  // Step through nodes level by level (BFS / In-order simulation)
  let maxDepthSeen = 1;
  for (let i = 0; i < treeNodes.length; i++) {
    const curr = treeNodes[i];
    maxDepthSeen = Math.max(maxDepthSeen, curr.depth + 1);

    steps.push({
      stepIndex: steps.length,
      title: `Visit Node ${curr.value} (Depth: ${curr.depth + 1})`,
      description: `Evaluating node ${curr.value}. Left child: ${curr.leftId ? 'exists' : 'null'}, Right child: ${
        curr.rightId ? 'exists' : 'null'
      }. Updating traversal invariant.`,
      codeLineHighlight: 4,
      variables: {
        currentNode: curr.value,
        depth: curr.depth + 1,
        hasLeft: Boolean(curr.leftId),
        hasRight: Boolean(curr.rightId),
      },
      treeState: {
        nodes: treeNodes.map((n, idx) => ({
          id: n.id,
          value: n.value,
          status: idx === i ? 'current' : idx < i ? 'visited' : 'default',
          leftId: n.leftId,
          rightId: n.rightId,
        })),
      },
    });
  }

  // Final step
  steps.push({
    stepIndex: steps.length,
    title: `Tree Algorithm Complete for ${problem.title}`,
    description: `Traversal completed across all ${treeNodes.length} nodes. Maximum depth reached: ${maxDepthSeen}. Optimal complexity satisfied.`,
    codeLineHighlight: 8,
    variables: { totalNodes: treeNodes.length, maxDepth: maxDepthSeen, status: 'complete' },
    treeState: {
      nodes: treeNodes.map((n) => ({
        id: n.id,
        value: n.value,
        status: 'visited',
        leftId: n.leftId,
        rightId: n.rightId,
      })),
    },
  });

  return steps;
}

/**
 * 2. Matrix & 2D Grid Pattern Engine (matrix, graph-bfs, graph-general)
 * Emits matrixState with live (row, col) pointers and cell status.
 */
export function simulateMatrixPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawGrid = input.matrix ?? input.grid ?? input.board ?? [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let grid: Array<Array<string | number>> = [];
  if (Array.isArray(rawGrid) && Array.isArray(rawGrid[0])) {
    grid = rawGrid.map((row) => row.slice(0, 6)).slice(0, 6);
  } else {
    grid = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
  }

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  steps.push({
    stepIndex: 0,
    title: `Initialize 2D Grid Scan (${rows}×${cols}) for ${problem.title}`,
    description: `Loaded matrix of size ${rows} rows × ${cols} columns. Pointer at top-left cell (0, 0).`,
    codeLineHighlight: 2,
    variables: { rows, cols, r: 0, c: 0, currentValue: grid[0]?.[0] ?? '' },
    matrixState: {
      grid: grid.map((r, rIdx) =>
        r.map((val, cIdx) => ({
          value: val,
          status: rIdx === 0 && cIdx === 0 ? 'active' : 'default',
        }))
      ),
      rowPointer: 0,
      colPointer: 0,
    },
  });

  // Perimeter / traversal steps across grid
  const visitedSet = new Set<string>();
  const traversalOrder: Array<[number, number]> = [];

  // Generate bounded traversal path (e.g. raster or perimeter)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      traversalOrder.push([r, c]);
      if (traversalOrder.length >= 10) break;
    }
    if (traversalOrder.length >= 10) break;
  }

  for (let step = 0; step < traversalOrder.length; step++) {
    const [r, c] = traversalOrder[step];
    visitedSet.add(`${r},${c}`);

    steps.push({
      stepIndex: steps.length,
      title: `Traverse Cell (${r}, ${c}) = ${grid[r][c]}`,
      description: `Evaluating cell at row ${r}, column ${c} (value: ${grid[r][c]}). Updating state matrix.`,
      codeLineHighlight: 4,
      variables: { r, c, cellValue: grid[r][c], visitedCount: visitedSet.size },
      matrixState: {
        grid: grid.map((row, rIdx) =>
          row.map((val, cIdx) => ({
            value: val,
            status:
              rIdx === r && cIdx === c
                ? 'active'
                : visitedSet.has(`${rIdx},${cIdx}`)
                ? 'visited'
                : 'default',
          }))
        ),
        rowPointer: r,
        colPointer: c,
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Matrix Traversal Complete for ${problem.title}`,
    description: `Processed 2D bounds successfully. Final state recorded.`,
    codeLineHighlight: 8,
    variables: { rows, cols, status: 'complete' },
    matrixState: {
      grid: grid.map((row) =>
        row.map((val) => ({
          value: val,
          status: 'visited',
        }))
      ),
    },
  });

  return steps;
}

/**
 * 3. Linked List Pattern Engine (linked-list)
 * Emits linkedListState with nodes, next pointers, and curr/prev/fast/slow pointers.
 */
export function simulateLinkedListPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawVals = input.head ?? input.l1 ?? input.values ?? [1, 2, 3, 4, 5];
  const vals = parseNumberArray(rawVals, [1, 2, 3, 4, 5], 10);

  const nodes = vals.map((v, idx) => ({
    id: `node-${idx}`,
    value: v,
    nextId: idx < vals.length - 1 ? `node-${idx + 1}` : null,
  }));

  steps.push({
    stepIndex: 0,
    title: `Initialize Linked List (${vals.length} Nodes) for ${problem.title}`,
    description: `List: ${vals.join(' -> ')} -> null. Initializing head pointer at ${vals[0]}.`,
    codeLineHighlight: 2,
    variables: { length: vals.length, headVal: vals[0], curr: vals[0] },
    linkedListState: {
      nodes: nodes.map((n, idx) => ({
        id: n.id,
        value: n.value,
        status: idx === 0 ? 'curr' : 'default',
        nextId: n.nextId,
      })),
    },
  });

  for (let i = 0; i < vals.length; i++) {
    steps.push({
      stepIndex: steps.length,
      title: `Node ${vals[i]}: Advance Pointer to Next Node`,
      description: `Pointer at index ${i} (${vals[i]}). Next node is ${i < vals.length - 1 ? vals[i + 1] : 'null'}.`,
      codeLineHighlight: 4,
      variables: { currentIndex: i, value: vals[i], next: i < vals.length - 1 ? vals[i + 1] : 'null' },
      linkedListState: {
        nodes: nodes.map((n, idx) => ({
          id: n.id,
          value: n.value,
          status: idx === i ? 'curr' : idx === i - 1 ? 'prev' : idx < i ? 'visited' : 'default',
          nextId: n.nextId,
        })),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Linked List Traversal Complete for ${problem.title}`,
    description: `Reached tail null. Completed in O(n) linear scan.`,
    codeLineHighlight: 8,
    variables: { totalNodes: vals.length, status: 'complete' },
    linkedListState: {
      nodes: nodes.map((n) => ({
        id: n.id,
        value: n.value,
        status: 'visited',
        nextId: n.nextId,
      })),
    },
  });

  return steps;
}

/**
 * 4. Intervals Pattern Engine (intervals)
 * Emits arrayState showing interval merging and boundary comparison.
 */
export function simulateIntervalsPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawIntervals = input.intervals ?? [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ];

  let intervals: Array<[number, number]> = [];
  if (Array.isArray(rawIntervals)) {
    intervals = rawIntervals
      .map((item) => (Array.isArray(item) && item.length >= 2 ? [Number(item[0]), Number(item[1])] as [number, number] : null))
      .filter((x): x is [number, number] => x !== null && !isNaN(x[0]) && !isNaN(x[1]))
      .slice(0, 8);
  }
  if (intervals.length === 0) {
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  steps.push({
    stepIndex: 0,
    title: `Sort Intervals by Start Time for ${problem.title}`,
    description: `Sorted intervals: ${intervals.map((i) => `[${i[0]},${i[1]}]`).join(', ')}. Initializing merge scan.`,
    codeLineHighlight: 2,
    variables: { totalIntervals: intervals.length, sorted: true },
    arrayState: {
      elements: intervals.map((inv) => ({ value: `[${inv[0]},${inv[1]}]`, status: 'default' })),
      pointers: [{ label: 'Curr', index: 0, color: '#38bdf8' }],
    },
  });

  const merged: Array<[number, number]> = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    const overlaps = curr[0] <= prev[1];

    if (overlaps) {
      prev[1] = Math.max(prev[1], curr[1]);
      steps.push({
        stepIndex: steps.length,
        title: `Merge Overlapping Intervals: [${prev[0]},${prev[1]}]`,
        description: `Current interval [${curr[0]},${curr[1]}] start (${curr[0]}) <= previous end (${prev[1]}). Merging into [${prev[0]},${prev[1]}].`,
        codeLineHighlight: 4,
        variables: { mergedCount: merged.length, activeInterval: `[${prev[0]},${prev[1]}]`, overlaps: true },
        arrayState: {
          elements: intervals.map((inv, idx) => ({
            value: idx === i - 1 ? `[${prev[0]},${prev[1]}]` : `[${inv[0]},${inv[1]}]`,
            status: idx === i || idx === i - 1 ? 'matched' : idx < i ? 'visited' : 'default',
          })),
          pointers: [
            { label: 'Merged', index: i - 1, color: '#34d399' },
            { label: 'Next', index: i, color: '#fbbf24' },
          ],
        },
      });
    } else {
      merged.push(curr);
      steps.push({
        stepIndex: steps.length,
        title: `Non-Overlapping Interval: Append [${curr[0]},${curr[1]}]`,
        description: `Current interval [${curr[0]},${curr[1]}] does not overlap (start ${curr[0]} > previous end ${prev[1]}). Appending as distinct interval.`,
        codeLineHighlight: 6,
        variables: { mergedCount: merged.length, appended: `[${curr[0]},${curr[1]}]`, overlaps: false },
        arrayState: {
          elements: intervals.map((inv, idx) => ({
            value: `[${inv[0]},${inv[1]}]`,
            status: idx === i ? 'active' : idx < i ? 'visited' : 'default',
          })),
          pointers: [{ label: 'Curr', index: i, color: '#38bdf8' }],
        },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Intervals Processed: ${merged.length} Final Disjoint Intervals`,
    description: `Result: ${merged.map((i) => `[${i[0]},${i[1]}]`).join(', ')}. Completed in O(n log n).`,
    codeLineHighlight: 8,
    variables: { finalCount: merged.length, result: merged.map((i) => `[${i[0]},${i[1]}]`).join(', ') },
    arrayState: {
      elements: merged.map((inv) => ({ value: `[${inv[0]},${inv[1]}]`, status: 'matched' })),
    },
  });

  return steps;
}

/**
 * 5. Hash Map Pattern Engine (hashmap)
 * Emits hashMapState with dynamic key-value entries.
 */
export function simulateHashMapPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawStr = input.s ?? input.ransomNote ?? input.word ?? 'anagram';
  const str = parseStringInput(rawStr, 'anagram', 20);
  const chars = str.split('');
  const freqMap = new Map<string, number>();

  steps.push({
    stepIndex: 0,
    title: `Initialize Frequency Hash Map for ${problem.title}`,
    description: `Building hash map for string "${str}". Initializing empty bucket table.`,
    codeLineHighlight: 2,
    variables: { stringLength: chars.length, mapSize: 0 },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'default' })),
    },
    hashMapState: { entries: [] },
  });

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const prevCount = freqMap.get(c) || 0;
    const newCount = prevCount + 1;
    freqMap.set(c, newCount);

    steps.push({
      stepIndex: steps.length,
      title: `Character '${c}': Increment Frequency in Map (${prevCount} -> ${newCount})`,
      description: `Hashing character '${c}'. New frequency count is ${newCount}. Map size is ${freqMap.size}.`,
      codeLineHighlight: 4,
      variables: { char: c, count: newCount, mapSize: freqMap.size },
      arrayState: {
        elements: chars.map((ch, idx) => ({
          value: ch,
          status: idx === i ? 'active' : idx < i ? 'visited' : 'default',
        })),
        pointers: [{ label: 'i', index: i, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: Array.from(freqMap.entries()).map(([k, v]) => ({
          key: k,
          value: v,
          status: k === c ? 'updated' : 'default',
        })),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Hash Map Construction Complete for ${problem.title}`,
    description: `All ${chars.length} characters mapped across ${freqMap.size} unique keys.`,
    codeLineHighlight: 8,
    variables: { totalUniqueKeys: freqMap.size, status: 'complete' },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'matched' })),
    },
    hashMapState: {
      entries: Array.from(freqMap.entries()).map(([k, v]) => ({
        key: k,
        value: v,
        status: 'default',
      })),
    },
  });

  return steps;
}
