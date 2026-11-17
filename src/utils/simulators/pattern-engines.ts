import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';
import {
  parseNumberArray,
  parseSingleNumber,
  parseStringInput,
  parse2DArray,
  parseIntervalPairs,
  parseTreeLevelOrder,
} from './helpers';

/**
 * 1. Tree Pattern Engine (binary-tree-general, binary-tree-bfs, binary-search-tree)
 * Emits treeState with authentic parent-child node connections and traversal highlights.
 */
export function simulateTreePattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawRoot = input.root ?? input.input ?? [3, 9, 20, null, null, 15, 7];
  const values = parseTreeLevelOrder(rawRoot);

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
    description: `Constructed binary tree with ${treeNodes.length} active node(s): [${values.filter((v) => v !== null).join(', ')}]. Root node is ${treeNodes[0]?.value}. Ready to execute optimal algorithmic traversal.`,
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

  const grid = parse2DArray(rawGrid);
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
  const rawIntervals = input.intervals ?? input.input ?? [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ];

  const intervals = parseIntervalPairs(rawIntervals);

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

/**
 * 6. Trie Pattern Engine (trie)
 * Emits trieState with authentic prefix tree root, child connections, and end-of-word flags.
 */
export function simulateTriePattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  let words: string[] = ['apple', 'app', 'ape'];
  if (Array.isArray(input.words)) {
    words = input.words.map(String).slice(0, 4);
  } else if (typeof input.word === 'string' && input.word.trim()) {
    words = [input.word.trim(), 'app', 'apple'].slice(0, 3);
  } else if (typeof input.words === 'string') {
    words = input.words.replace(/[\[\]'"]/g, '').split(/[\s,]+/).filter(Boolean).slice(0, 4);
  }
  if (words.length === 0) words = ['apple', 'app', 'ape'];

  interface TrieNodeData {
    id: string;
    char: string;
    isEndOfWord: boolean;
    children: Map<string, string>;
    depth: number;
  }

  const nodesMap = new Map<string, TrieNodeData>();
  nodesMap.set('root', {
    id: 'root',
    char: 'ROOT',
    isEndOfWord: false,
    children: new Map(),
    depth: 0,
  });

  const getTrieNodes = (activeId?: string, matchedIds?: Set<string>): any[] => {
    return Array.from(nodesMap.values()).map((n) => ({
      id: n.id,
      char: n.char,
      isEndOfWord: n.isEndOfWord,
      children: Array.from(n.children.values()),
      status: n.id === activeId ? 'current' : matchedIds?.has(n.id) ? 'matched' : 'default',
    }));
  };

  steps.push({
    stepIndex: 0,
    title: `Initialize Empty Trie for ${problem.title}`,
    description: `Created root Trie node. Ready to index words: [${words.map((w) => `"${w}"`).join(', ')}].`,
    codeLineHighlight: 2,
    variables: { root: 'ROOT', totalWords: words.length, activeWord: '' },
    trieState: {
      rootId: 'root',
      nodes: getTrieNodes('root'),
      activeWord: '',
    },
  });

  let nodeCounter = 1;

  for (const word of words) {
    let currId = 'root';
    const pathIds = new Set<string>(['root']);

    steps.push({
      stepIndex: steps.length,
      title: `Begin Inserting Word: "${word}"`,
      description: `Traversing from ROOT down character prefix path for "${word}".`,
      codeLineHighlight: 3,
      variables: { insertingWord: word, currChar: '', depth: 0 },
      trieState: {
        rootId: 'root',
        nodes: getTrieNodes(currId, pathIds),
        activeWord: word,
      },
    });

    for (let cIdx = 0; cIdx < word.length; cIdx++) {
      const char = word[cIdx];
      const currNode = nodesMap.get(currId)!;
      let nextId = currNode.children.get(char);
      const isNew = !nextId;

      if (!nextId) {
        nextId = `node_${nodeCounter++}_${char}`;
        const newNode: TrieNodeData = {
          id: nextId,
          char,
          isEndOfWord: cIdx === word.length - 1,
          children: new Map(),
          depth: currNode.depth + 1,
        };
        nodesMap.set(nextId, newNode);
        currNode.children.set(char, nextId);
      } else if (cIdx === word.length - 1) {
        nodesMap.get(nextId)!.isEndOfWord = true;
      }

      pathIds.add(nextId);
      currId = nextId;

      steps.push({
        stepIndex: steps.length,
        title: `${isNew ? 'Create New Node' : 'Follow Existing Prefix'}: '${char}' (char ${cIdx + 1}/${word.length})`,
        description: isNew
          ? `No child edge for '${char}' under parent. Allocated new TrieNode('${char}').`
          : `Edge '${char}' already exists. Reusing prefix branch.`,
        codeLineHighlight: isNew ? 5 : 4,
        variables: {
          word,
          char,
          isEndOfWord: cIdx === word.length - 1,
          prefix: word.slice(0, cIdx + 1),
        },
        trieState: {
          rootId: 'root',
          nodes: getTrieNodes(currId, pathIds),
          activeWord: word,
        },
      });
    }

    steps.push({
      stepIndex: steps.length,
      title: `Mark End-Of-Word: "${word}"`,
      description: `Reached end of "${word}". Flagged node '${nodesMap.get(currId)?.char}' with isEndOfWord = true.`,
      codeLineHighlight: 6,
      variables: { word, isEndOfWord: true, status: 'inserted' },
      trieState: {
        rootId: 'root',
        nodes: getTrieNodes(currId, pathIds),
        activeWord: word,
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Trie Construction Complete for ${problem.title}`,
    description: `Successfully indexed ${words.length} words in Trie across ${nodesMap.size} nodes. Lookups run in O(L) time.`,
    codeLineHighlight: 8,
    variables: { totalWords: words.length, totalNodes: nodesMap.size, status: 'complete' },
    trieState: {
      rootId: 'root',
      nodes: getTrieNodes(),
    },
  });

  return steps;
}

/**
 * 7. Heap Pattern Engine (heap)
 * Emits heapState with complete binary tree nodes and 1D array representation.
 */
export function simulateHeapPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawNums = input.nums ?? input.input ?? [3, 2, 1, 5, 6, 4];
  const nums = parseNumberArray(rawNums, [3, 2, 1, 5, 6, 4], 8);
  const k = parseSingleNumber(input.k, 2);
  const isMaxHeap = true;

  const heap: number[] = [];

  const getHeapElements = (swappingIndices?: number[], rootIndex = 0) => {
    return heap.map((val, idx) => ({
      value: val,
      status: (swappingIndices?.includes(idx)
        ? 'swapping'
        : idx === rootIndex
        ? 'root'
        : 'default') as 'default' | 'root' | 'sifting' | 'swapping',
    }));
  };

  steps.push({
    stepIndex: 0,
    title: `Initialize Empty ${isMaxHeap ? 'Max' : 'Min'}-Heap for ${problem.title}`,
    description: `Starting heapification on input array: [${nums.join(', ')}]. Target k = ${k}.`,
    codeLineHighlight: 2,
    variables: { heapSize: 0, k, heapType: isMaxHeap ? 'Max-Heap' : 'Min-Heap' },
    heapState: {
      type: isMaxHeap ? 'max' : 'min',
      elements: [],
    },
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    heap.push(val);
    let curr = heap.length - 1;

    steps.push({
      stepIndex: steps.length,
      title: `Push Element ${val} into Heap (Index ${curr})`,
      description: `Appended ${val} at the end of the complete binary tree. Ready to sift up to restore heap invariant.`,
      codeLineHighlight: 3,
      variables: { inserted: val, currentIndex: curr, heapSize: heap.length },
      heapState: {
        type: isMaxHeap ? 'max' : 'min',
        elements: getHeapElements([curr]),
      },
    });

    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      const shouldSwap = isMaxHeap ? heap[curr] > heap[parent] : heap[curr] < heap[parent];

      if (shouldSwap) {
        steps.push({
          stepIndex: steps.length,
          title: `Sift-Up Swap: Child ${heap[curr]} > Parent ${heap[parent]}`,
          description: `Heap violation at index ${curr}: child (${heap[curr]}) is greater than parent at index ${parent} (${heap[parent]}). Swapping nodes.`,
          codeLineHighlight: 4,
          variables: { child: heap[curr], parent: heap[parent], childIdx: curr, parentIdx: parent },
          heapState: {
            type: isMaxHeap ? 'max' : 'min',
            elements: getHeapElements([curr, parent]),
          },
        });

        const temp = heap[curr];
        heap[curr] = heap[parent];
        heap[parent] = temp;
        curr = parent;
      } else {
        break;
      }
    }
  }

  if (heap.length > 0) {
    steps.push({
      stepIndex: steps.length,
      title: `Heap Property Satisfied — Root Max Element is ${heap[0]}`,
      description: `Root node holds maximal element ${heap[0]}. Any extract operation yields O(1) top access and O(log n) rebalance.`,
      codeLineHighlight: 6,
      variables: { maxRoot: heap[0], heapSize: heap.length, k },
      heapState: {
        type: isMaxHeap ? 'max' : 'min',
        elements: getHeapElements([], 0),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Heap Algorithm Complete for ${problem.title}`,
    description: `Constructed valid binary heap with ${heap.length} elements in O(n) time. Root = ${heap[0]}.`,
    codeLineHighlight: 8,
    variables: { rootVal: heap[0], totalElements: heap.length, status: 'complete' },
    heapState: {
      type: isMaxHeap ? 'max' : 'min',
      elements: getHeapElements([], 0),
    },
  });

  return steps;
}

/**
 * 8. Multidimensional DP Pattern Engine (multidimensional-dp)
 * Emits dpTableState (2D table) with cell coordinates, active cell, and recurrence formulas.
 */
export function simulateMultidimensionalDPPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rows = 4;
  const cols = 5;
  const table: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) table[r][0] = 1;
  for (let c = 0; c < cols; c++) table[0][c] = 1;

  steps.push({
    stepIndex: 0,
    title: `Initialize 2D DP Table (${rows}×${cols}) for ${problem.title}`,
    description: `Initialized DP table of dimensions ${rows} rows × ${cols} columns. Establishing base case boundaries dp[r][0] = 1 and dp[0][c] = 1.`,
    codeLineHighlight: 2,
    variables: { rows, cols, activeCell: '[0, 0]', baseCaseValue: 1 },
    dpTableState: {
      dimensions: '2D',
      values: table.map((row) => [...row]),
      activeCell: [0, 0],
      formula: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
    },
  });

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      const fromTop = table[r - 1][c];
      const fromLeft = table[r][c - 1];
      table[r][c] = fromTop + fromLeft;

      steps.push({
        stepIndex: steps.length,
        title: `Compute dp[${r}][${c}] = ${table[r][c]}`,
        description: `Applying recurrence: dp[${r}][${c}] = dp[${r - 1}][${c}] (${fromTop}) + dp[${r}][${c - 1}] (${fromLeft}) = ${table[r][c]}.`,
        codeLineHighlight: 4,
        variables: {
          r,
          c,
          'dp[r-1][c]': fromTop,
          'dp[r][c-1]': fromLeft,
          'dp[r][c]': table[r][c],
        },
        dpTableState: {
          dimensions: '2D',
          values: table.map((row) => [...row]),
          activeCell: [r, c],
          formula: `dp[${r}][${c}] = dp[${r - 1}][${c}] + dp[${r}][${c - 1}] = ${table[r][c]}`,
        },
      });
    }
  }

  const finalAns = table[rows - 1][cols - 1];
  steps.push({
    stepIndex: steps.length,
    title: `Optimal Solution Found: dp[${rows - 1}][${cols - 1}] = ${finalAns}`,
    description: `Bottom-right cell dp[${rows - 1}][${cols - 1}] stores the globally optimal solution: ${finalAns}. Solved in O(M×N) time.`,
    codeLineHighlight: 8,
    variables: { answer: finalAns, totalCells: rows * cols, status: 'complete' },
    dpTableState: {
      dimensions: '2D',
      values: table.map((row) => [...row]),
      activeCell: [rows - 1, cols - 1],
      formula: `Answer = dp[${rows - 1}][${cols - 1}] = ${finalAns}`,
    },
  });

  return steps;
}

/**
 * 9. 1D DP Pattern Engine (1d-dp)
 * Emits dpTableState (1D array) with active index and transition formulas.
 */
export function simulate1DDPPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const n = parseSingleNumber(input.n ?? input.amount ?? input.input, 6);
  const size = Math.min(Math.max(n + 1, 3), 10);
  const dp: number[] = new Array(size).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  steps.push({
    stepIndex: 0,
    title: `Initialize 1D DP Array (Size ${size}) for ${problem.title}`,
    description: `Base cases defined: dp[0] = 1, dp[1] = 1. Subproblems will be memoized linearly.`,
    codeLineHighlight: 2,
    variables: { n: size - 1, 'dp[0]': 1, 'dp[1]': 1 },
    dpTableState: {
      dimensions: '1D',
      values: [...dp],
      activeCell: 1,
      formula: 'dp[i] = dp[i-1] + dp[i-2]',
    },
  });

  for (let i = 2; i < size; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      stepIndex: steps.length,
      title: `Calculate dp[${i}] = ${dp[i]}`,
      description: `Transition recurrence: dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}.`,
      codeLineHighlight: 4,
      variables: {
        i,
        'dp[i-1]': dp[i - 1],
        'dp[i-2]': dp[i - 2],
        'dp[i]': dp[i],
      },
      dpTableState: {
        dimensions: '1D',
        values: [...dp],
        activeCell: i,
        formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}`,
      },
    });
  }

  const finalVal = dp[size - 1];
  steps.push({
    stepIndex: steps.length,
    title: `1D DP Complete — Result: ${finalVal}`,
    description: `Optimal solution for subproblem index ${size - 1} computed in O(N) time and O(N) space.`,
    codeLineHighlight: 8,
    variables: { result: finalVal, status: 'complete' },
    dpTableState: {
      dimensions: '1D',
      values: [...dp],
      activeCell: size - 1,
      formula: `Optimal result = dp[${size - 1}] = ${finalVal}`,
    },
  });

  return steps;
}

/**
 * 10. Graph Pattern Engine (graph-general, graph-bfs)
 * Emits graphState with vertices, directed edges, and active traversal frontiers.
 */
export function simulateGraphPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];

  const nodes = [
    { id: '0', label: 'Node 0' },
    { id: '1', label: 'Node 1' },
    { id: '2', label: 'Node 2' },
    { id: '3', label: 'Node 3' },
    { id: '4', label: 'Node 4' },
  ];

  const edges = [
    { from: '0', to: '1' },
    { from: '0', to: '2' },
    { from: '1', to: '3' },
    { from: '2', to: '3' },
    { from: '3', to: '4' },
  ];

  const visited = new Set<string>();
  const visiting = new Set<string>();

  const getGraphState = (activeEdge?: { from: string; to: string }) => ({
    nodes: nodes.map((n) => ({
      id: n.id,
      label: n.label,
      status: (visited.has(n.id)
        ? 'visited'
        : visiting.has(n.id)
        ? 'visiting'
        : 'unvisited') as 'unvisited' | 'visiting' | 'visited',
    })),
    edges: edges.map((e) => ({
      from: e.from,
      to: e.to,
      active: activeEdge ? e.from === activeEdge.from && e.to === activeEdge.to : false,
    })),
  });

  steps.push({
    stepIndex: 0,
    title: `Initialize Graph Traversal for ${problem.title}`,
    description: `Graph initialized with ${nodes.length} vertices and ${edges.length} directed edges. Root starting vertex is Node 0.`,
    codeLineHighlight: 2,
    variables: { totalNodes: nodes.length, totalEdges: edges.length, startNode: 'Node 0' },
    graphState: getGraphState(),
  });

  const queue = ['0'];
  visiting.add('0');

  steps.push({
    stepIndex: steps.length,
    title: `Enqueue Start Vertex Node 0`,
    description: `Added start node '0' to BFS exploration queue. Marking status as visiting.`,
    codeLineHighlight: 3,
    variables: { queue: queue.join(', '), visitingNode: '0' },
    graphState: getGraphState(),
  });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    visiting.delete(curr);
    visited.add(curr);

    const neighbors = edges.filter((e) => e.from === curr).map((e) => e.to);

    steps.push({
      stepIndex: steps.length,
      title: `Visit Node ${curr} — Inspect Outgoing Neighbors`,
      description: `Popped Node ${curr} from frontier. Discovered outgoing edges to neighbors: [${neighbors.join(', ')}].`,
      codeLineHighlight: 4,
      variables: { currentNode: curr, neighbors: neighbors.join(', '), visitedCount: visited.size },
      graphState: getGraphState(),
    });

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !visiting.has(neighbor)) {
        visiting.add(neighbor);
        queue.push(neighbor);

        steps.push({
          stepIndex: steps.length,
          title: `Traverse Edge (${curr} -> ${neighbor})`,
          description: `Discovered unvisited neighbor Node ${neighbor}. Traversed edge and pushed to queue.`,
          codeLineHighlight: 5,
          variables: { from: curr, to: neighbor, queue: queue.join(', ') },
          graphState: getGraphState({ from: curr, to: neighbor }),
        });
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Graph Traversal Complete for ${problem.title}`,
    description: `All reachable vertices explored. Completed in O(V + E) linear time.`,
    codeLineHighlight: 8,
    variables: { totalVisited: visited.size, status: 'complete' },
    graphState: getGraphState(),
  });

  return steps;
}

/**
 * 11. Backtracking Pattern Engine (backtracking)
 * Emits treeState representing the recursive decision state tree.
 */
export function simulateBacktrackingPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const treeNodes: Array<{
    id: string;
    value: string;
    status: 'default' | 'current' | 'visited' | 'matched' | 'highlighted';
    leftId?: string | null;
    rightId?: string | null;
  }> = [
    { id: 'n0', value: '[] (Root)', status: 'default', leftId: 'n1', rightId: 'n2' },
    { id: 'n1', value: '[1]', status: 'default', leftId: 'n3', rightId: 'n4' },
    { id: 'n2', value: '[2]', status: 'default', leftId: 'n5', rightId: 'n6' },
    { id: 'n3', value: '[1, 2] (Valid)', status: 'default' },
    { id: 'n4', value: '[1, 3] (Valid)', status: 'default' },
    { id: 'n5', value: '[2, 1] (Pruned)', status: 'default' },
    { id: 'n6', value: '[2, 3] (Valid)', status: 'default' },
  ];

  const getTreeState = (currId?: string, matchedId?: string) => ({
    nodes: treeNodes.map((n) => ({
      ...n,
      status: (n.id === currId
        ? 'current'
        : n.id === matchedId
        ? 'matched'
        : n.value.includes('Valid')
        ? 'matched'
        : n.value.includes('Pruned')
        ? 'highlighted'
        : 'default') as any,
    })),
  });

  steps.push({
    stepIndex: 0,
    title: `Initialize Backtracking State Space Tree for ${problem.title}`,
    description: `Starting recursive depth-first search from empty decision state []. Exploration begins at root.`,
    codeLineHighlight: 2,
    variables: { currentDecision: '[]', depth: 0, solutionsFound: 0 },
    treeState: getTreeState('n0'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Make Choice: Pick Element 1 -> State [1]`,
    description: `Branching left: appending 1 to current path. State transition: [] -> [1].`,
    codeLineHighlight: 3,
    variables: { currentDecision: '[1]', depth: 1, action: 'choose(1)' },
    treeState: getTreeState('n1'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Make Choice: Pick Element 2 -> State [1, 2]`,
    description: `Base condition met: path length reaches target. Added [1, 2] to final result list!`,
    codeLineHighlight: 4,
    variables: { currentDecision: '[1, 2]', depth: 2, validSolution: true, solutionsFound: 1 },
    treeState: getTreeState('n3', 'n3'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Backtrack: Undo Choice 2 -> Restore State [1]`,
    description: `Backtracking to parent frame: popping 2 from path. Restored path [1] to explore next candidate.`,
    codeLineHighlight: 5,
    variables: { currentDecision: '[1]', depth: 1, action: 'backtrack(pop 2)' },
    treeState: getTreeState('n1'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Make Choice: Pick Element 3 -> State [1, 3]`,
    description: `Branching right: added 3 to path. Second valid solution [1, 3] recorded!`,
    codeLineHighlight: 4,
    variables: { currentDecision: '[1, 3]', depth: 2, validSolution: true, solutionsFound: 2 },
    treeState: getTreeState('n4', 'n4'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Backtrack to Root [] and Explore Right Subtree [2]`,
    description: `Unwound recursive calls back to root. Proceeding to explore branch [2].`,
    codeLineHighlight: 6,
    variables: { currentDecision: '[2]', depth: 1, action: 'choose(2)' },
    treeState: getTreeState('n2'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Prune Branch [2, 1] — Violates Ordering Invariant`,
    description: `Candidate [2, 1] pruned early: violates combination monotonicity. Pruning avoids redundant work!`,
    codeLineHighlight: 7,
    variables: { currentDecision: '[2, 1]', action: 'prune' },
    treeState: getTreeState('n5'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Backtracking Complete for ${problem.title}`,
    description: `All decision branches systematically explored. Systematic backtracking guarantees completeness.`,
    codeLineHighlight: 8,
    variables: { totalSolutions: 3, status: 'complete' },
    treeState: getTreeState(),
  });

  return steps;
}

/**
 * 12. Divide & Conquer Pattern Engine (divide-and-conquer)
 * Emits treeState showing partitioning and subproblem recombination.
 */
export function simulateDivideAndConquerPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawNums = input.nums ?? input.input ?? [5, 2, 9, 1, 7, 3];
  const nums = parseNumberArray(rawNums, [5, 2, 9, 1, 7, 3], 6);

  const treeNodes = [
    { id: 'top', value: `[${nums.join(',')}]`, status: 'default' as const, leftId: 'left', rightId: 'right' },
    { id: 'left', value: `[${nums.slice(0, 3).join(',')}]`, status: 'default' as const, leftId: 'l1', rightId: 'l2' },
    { id: 'right', value: `[${nums.slice(3).join(',')}]`, status: 'default' as const, leftId: 'r1', rightId: 'r2' },
    { id: 'l1', value: `[${nums[0]}]`, status: 'default' as const },
    { id: 'l2', value: `[${nums.slice(1, 3).join(',')}]`, status: 'default' as const },
    { id: 'r1', value: `[${nums[3]}]`, status: 'default' as const },
    { id: 'r2', value: `[${nums.slice(4).join(',')}]`, status: 'default' as const },
  ];

  const getTreeState = (activeId?: string) => ({
    nodes: treeNodes.map((n) => ({
      ...n,
      status: (n.id === activeId ? 'current' : 'default') as any,
    })),
  });

  steps.push({
    stepIndex: 0,
    title: `Initialize Divide & Conquer on Problem: ${problem.title}`,
    description: `Original problem of size N = ${nums.length}: [${nums.join(', ')}]. Dividing into balanced subproblems.`,
    codeLineHighlight: 2,
    variables: { problemSize: nums.length, mid: Math.floor(nums.length / 2) },
    treeState: getTreeState('top'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Divide: Partition Left Subproblem [${nums.slice(0, 3).join(', ')}]`,
    description: `Split at midpoint. Recursively solving left half: [${nums.slice(0, 3).join(', ')}].`,
    codeLineHighlight: 3,
    variables: { leftHalf: nums.slice(0, 3).join(','), phase: 'divide' },
    treeState: getTreeState('left'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Divide: Partition Right Subproblem [${nums.slice(3).join(', ')}]`,
    description: `Recursively solving right half: [${nums.slice(3).join(', ')}].`,
    codeLineHighlight: 4,
    variables: { rightHalf: nums.slice(3).join(','), phase: 'divide' },
    treeState: getTreeState('right'),
  });

  const sortedNums = [...nums].sort((a, b) => a - b);
  steps.push({
    stepIndex: steps.length,
    title: `Conquer & Combine: Merge Subproblem Solutions`,
    description: `Subproblems conquered. Recombining left and right sorted segments into final merged result: [${sortedNums.join(', ')}].`,
    codeLineHighlight: 6,
    variables: { mergedResult: sortedNums.join(', '), phase: 'combine' },
    treeState: getTreeState('top'),
  });

  steps.push({
    stepIndex: steps.length,
    title: `Divide & Conquer Complete for ${problem.title}`,
    description: `Recurrence T(n) = 2T(n/2) + O(n) yields optimal O(n log n) running time.`,
    codeLineHighlight: 8,
    variables: { finalResult: sortedNums.join(', '), status: 'complete' },
    treeState: getTreeState('top'),
  });

  return steps;
}

/**
 * 13. Bit Manipulation Pattern Engine (bit-manipulation)
 * Emits arrayState showing bit registers and bitwise masks without any false sliding windows.
 */
export function simulateBitManipulationPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const val = parseSingleNumber(input.n ?? input.a ?? input.num ?? 13, 13);
  const bitString = (val >>> 0).toString(2).padStart(8, '0');
  const bits = bitString.split('');

  steps.push({
    stepIndex: 0,
    title: `Initialize 8-Bit Register for ${problem.title} (Value: ${val})`,
    description: `Binary representation of ${val} in 8-bit register: ${bitString}. Pointer at most significant bit.`,
    codeLineHighlight: 2,
    variables: { decimal: val, binary: bitString, setBitsCount: 0 },
    arrayState: {
      elements: bits.map((b) => ({ value: b, status: 'default' })),
      pointers: [{ label: 'Bit 7', index: 0, color: '#38bdf8' }],
    },
  });

  let setBits = 0;
  for (let i = 0; i < bits.length; i++) {
    const bitPos = 7 - i;
    const isOne = bits[i] === '1';
    if (isOne) setBits++;

    steps.push({
      stepIndex: steps.length,
      title: `Inspect Bit Position 2^${bitPos}: Bit = '${bits[i]}'`,
      description: `Testing mask (1 << ${bitPos}). Bit is ${isOne ? 'SET (1)' : 'UNSET (0)'}. Running set-bit count: ${setBits}.`,
      codeLineHighlight: 4,
      variables: {
        bitIndex: bitPos,
        bitValue: bits[i],
        mask: `1 << ${bitPos}`,
        setBits,
      },
      arrayState: {
        elements: bits.map((b, idx) => ({
          value: b,
          status: idx === i ? (isOne ? 'matched' : 'active') : idx < i ? 'visited' : 'default',
        })),
        pointers: [{ label: `2^${bitPos}`, index: i, color: isOne ? '#34d399' : '#38bdf8' }],
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Bit Manipulation Complete for ${problem.title}`,
    description: `Evaluated all bits in O(1) word time. Total set bits (Hamming Weight): ${setBits}.`,
    codeLineHighlight: 8,
    variables: { totalSetBits: setBits, decimal: val, status: 'complete' },
    arrayState: {
      elements: bits.map((b) => ({ value: b, status: b === '1' ? 'matched' : 'default' })),
    },
  });

  return steps;
}

/**
 * 14. Math Pattern Engine (math)
 * Emits arithmetic evaluation steps without false sliding windows.
 */
export function simulateMathPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const x = parseSingleNumber(input.x ?? input.n ?? input.num ?? 121, 121);
  const digits = Math.abs(x).toString().split('');

  steps.push({
    stepIndex: 0,
    title: `Initialize Mathematical Evaluation for ${problem.title} (x = ${x})`,
    description: `Analyzing numerical properties of ${x}. Decomposed into ${digits.length} base-10 digits: [${digits.join(', ')}].`,
    codeLineHighlight: 2,
    variables: { inputNumber: x, digitCount: digits.length },
    arrayState: {
      elements: digits.map((d) => ({ value: d, status: 'default' })),
      pointers: [{ label: 'Digit 0', index: 0, color: '#38bdf8' }],
    },
  });

  let reversed = 0;
  let temp = Math.abs(x);

  for (let i = 0; i < digits.length; i++) {
    const rem = temp % 10;
    reversed = reversed * 10 + rem;
    temp = Math.floor(temp / 10);

    steps.push({
      stepIndex: steps.length,
      title: `Step ${i + 1}: Extract Last Digit (${rem}) -> Update Accumulator`,
      description: `Digit extracted: ${rem}. Accumulator: reversed = reversed * 10 + ${rem} = ${reversed}. Remaining quotient: ${temp}.`,
      codeLineHighlight: 4,
      variables: { currentDigit: rem, reversedAccumulator: reversed, remainingQuotient: temp },
      arrayState: {
        elements: digits.map((d, idx) => ({
          value: d,
          status: idx === i ? 'active' : idx < i ? 'visited' : 'default',
        })),
        pointers: [{ label: 'Curr', index: i, color: '#38bdf8' }],
      },
    });
  }

  const isPal = x >= 0 && reversed === x;
  steps.push({
    stepIndex: steps.length,
    title: `Calculation Complete — ${problem.title}: ${isPal ? 'True (Valid)' : reversed}`,
    description: `Mathematical operations evaluated in O(log10(N)) time with O(1) auxiliary space.`,
    codeLineHighlight: 8,
    variables: { result: isPal ? 'True' : reversed, status: 'complete' },
    arrayState: {
      elements: digits.map((d) => ({ value: d, status: 'matched' })),
    },
  });

  return steps;
}

/**
 * 15. Stack Pattern Engine (stack)
 * Emits stackQueueState with type: 'stack' and LIFO operations.
 */
export function simulateStackPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawStr = input.s ?? input.input ?? '()[]{}';
  const s = parseStringInput(rawStr, '()[]{}', 12);
  const chars = s.split('');

  const stack: string[] = [];

  const getStackState = () => ({
    type: 'stack' as const,
    items: stack.map((val, idx) => ({
      value: val,
      status: (idx === stack.length - 1 ? 'top' : 'default') as 'default' | 'top' | 'popped' | 'pushed',
    })),
  });

  steps.push({
    stepIndex: 0,
    title: `Initialize LIFO Stack for ${problem.title}`,
    description: `Evaluating input stream "${s}". Stack initialized empty.`,
    codeLineHighlight: 2,
    variables: { inputLength: chars.length, stackSize: 0, top: 'null' },
    stackQueueState: getStackState(),
  });

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const isOpening = ch === '(' || ch === '[' || ch === '{';

    if (isOpening) {
      stack.push(ch);
      steps.push({
        stepIndex: steps.length,
        title: `Push Opening Delimiter '${ch}' to Stack`,
        description: `Encountered open bracket '${ch}'. Pushed onto stack. New top is '${ch}'.`,
        codeLineHighlight: 4,
        variables: { char: ch, action: 'push', stackSize: stack.length, top: ch },
        stackQueueState: getStackState(),
      });
    } else {
      const top = stack.pop() ?? 'null';
      steps.push({
        stepIndex: steps.length,
        title: `Pop Matching Delimiter '${top}' for Closing '${ch}'`,
        description: `Encountered closing bracket '${ch}'. Popped matching opening bracket '${top}' from top of stack.`,
        codeLineHighlight: 5,
        variables: { char: ch, popped: top, stackSize: stack.length, top: stack[stack.length - 1] ?? 'null' },
        stackQueueState: getStackState(),
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Stack Processing Complete for ${problem.title}`,
    description: `All tokens processed. Stack is ${stack.length === 0 ? 'empty (Valid balanced structure)' : 'non-empty'}.`,
    codeLineHighlight: 8,
    variables: { finalStackSize: stack.length, isValid: stack.length === 0, status: 'complete' },
    stackQueueState: getStackState(),
  });

  return steps;
}

/**
 * 16. Sliding Window Pattern Engine (sliding-window)
 * Authentic sliding window with explicit dynamic window highlight and bounds.
 */
export function simulateSlidingWindowPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  if (input.nums || Array.isArray(input.input)) {
    const nums = parseNumberArray(input.nums ?? input.input, [2, 3, 1, 2, 4, 3], 8);
    const target = parseSingleNumber(input.target, 7);

    let left = 0;
    let sum = 0;
    let minLen = Infinity;

    steps.push({
      stepIndex: 0,
      title: `Initialize Sliding Window for ${problem.title}`,
      description: `Array: [${nums.join(', ')}]. Target sum >= ${target}. Window [left, right] starts at [0, 0].`,
      codeLineHighlight: 2,
      variables: { left: 0, right: 0, currentSum: 0, target, minLen: 'Infinity' },
      arrayState: {
        elements: nums.map((v) => ({ value: v, status: 'default' })),
        pointers: [{ label: 'L,R', index: 0, color: '#38bdf8' }],
        window: { left: 0, right: 0, label: 'Sliding Window' },
      },
    });

    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];

      steps.push({
        stepIndex: steps.length,
        title: `Expand Right to ${right} — Add nums[${right}] (${nums[right]}) -> Sum = ${sum}`,
        description: `Window expanded to [${left}..${right}]. Current window sum is ${sum}.`,
        codeLineHighlight: 4,
        variables: { left, right, windowSum: sum, target, windowSize: right - left + 1 },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx >= left && idx <= right ? 'active' : 'default',
          })),
          pointers: [
            { label: 'L', index: left, color: '#38bdf8' },
            { label: 'R', index: right, color: '#fbbf24' },
          ],
          window: { left, right, label: 'Sliding Window' },
        },
      });

      while (sum >= target) {
        const curLen = right - left + 1;
        minLen = Math.min(minLen, curLen);

        steps.push({
          stepIndex: steps.length,
          title: `Condition Satisfied: Sum ${sum} >= ${target}! Shrink Left from ${left}`,
          description: `Window [${left}..${right}] achieves target sum ${sum} with length ${curLen}. Subtracting nums[${left}] (${nums[left]}) to find minimal window.`,
          codeLineHighlight: 5,
          variables: { left, right, windowSum: sum, minLen, windowSize: curLen },
          arrayState: {
            elements: nums.map((v, idx) => ({
              value: v,
              status: idx >= left && idx <= right ? 'matched' : 'default',
            })),
            pointers: [
              { label: 'L', index: left, color: '#34d399' },
              { label: 'R', index: right, color: '#fbbf24' },
            ],
            window: { left, right, label: 'Sliding Window' },
          },
        });

        sum -= nums[left];
        left++;
      }
    }

    steps.push({
      stepIndex: steps.length,
      title: `Sliding Window Complete — Minimal Length: ${minLen === Infinity ? 0 : minLen}`,
      description: `Optimal contiguous window evaluated in linear O(N) time with two pointers.`,
      codeLineHighlight: 8,
      variables: { minLen: minLen === Infinity ? 0 : minLen, status: 'complete' },
      arrayState: {
        elements: nums.map((v) => ({ value: v, status: 'matched' })),
      },
    });

    return steps;
  }

  const str = parseStringInput(input.s ?? input.input, 'abcabcbb', 10);
  const chars = str.split('');
  let left = 0;
  let maxLen = 0;
  const seen = new Map<string, number>();

  steps.push({
    stepIndex: 0,
    title: `Initialize Sliding Window on String: "${str}"`,
    description: `Window [left, right] starts at [0, 0].`,
    codeLineHighlight: 2,
    variables: { left: 0, right: 0, maxLen: 0 },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'default' })),
      pointers: [{ label: 'L,R', index: 0, color: '#38bdf8' }],
      window: { left: 0, right: 0, label: 'Sliding Window' },
    },
  });

  for (let right = 0; right < chars.length; right++) {
    const ch = chars[right];
    if (seen.has(ch) && seen.get(ch)! >= left) {
      left = seen.get(ch)! + 1;
    }
    seen.set(ch, right);
    const curLen = right - left + 1;
    maxLen = Math.max(maxLen, curLen);

    steps.push({
      stepIndex: steps.length,
      title: `Slide Window to [${left}..${right}] — Substring: "${str.slice(left, right + 1)}"`,
      description: `Window contains unique characters "${str.slice(left, right + 1)}" with length ${curLen}. Max length: ${maxLen}.`,
      codeLineHighlight: 4,
      variables: { left, right, currentLen: curLen, maxLen, substring: `"${str.slice(left, right + 1)}"` },
      arrayState: {
        elements: chars.map((c, idx) => ({
          value: c,
          status: idx >= left && idx <= right ? 'active' : 'default',
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#fbbf24' },
        ],
        window: { left, right, label: 'Sliding Window' },
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Sliding Window Complete — Max Length: ${maxLen}`,
    description: `Finished processing in O(N) time. Longest unique window size is ${maxLen}.`,
    codeLineHighlight: 8,
    variables: { maxLen, status: 'complete' },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'matched' })),
    },
  });

  return steps;
}

/**
 * 17. Binary Search Pattern Engine (binary-search)
 * Low, Mid, High pointers without false sliding windows.
 */
export function simulateBinarySearchPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const rawNums = input.nums ?? input.input ?? [1, 3, 5, 7, 9, 11, 13, 15];
  const nums = parseNumberArray(rawNums, [1, 3, 5, 7, 9, 11, 13, 15], 10).sort((a, b) => a - b);
  const target = parseSingleNumber(input.target, 7);

  const steps: VisualizerStep[] = [];
  let low = 0;
  let high = nums.length - 1;

  steps.push({
    stepIndex: 0,
    title: `Initialize Binary Search for Target ${target}`,
    description: `Sorted array of ${nums.length} elements: [${nums.join(', ')}]. Low = ${low}, High = ${high}.`,
    codeLineHighlight: 2,
    variables: { low, high, target },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [
        { label: 'L', index: low, color: '#38bdf8' },
        { label: 'R', index: high, color: '#a78bfa' },
      ],
    },
  });

  let foundIdx = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    steps.push({
      stepIndex: steps.length,
      title: `Inspect Midpoint nums[${mid}] = ${midVal}`,
      description: `Mid = floor((${low} + ${high}) / 2) = ${mid}. Comparing ${midVal} with target ${target}.`,
      codeLineHighlight: 4,
      variables: { low, mid, high, midVal, target },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === mid ? 'active' : (idx >= low && idx <= high ? 'comparing' : 'eliminated'),
        })),
        pointers: [
          { label: 'L', index: low, color: '#38bdf8' },
          { label: 'Mid', index: mid, color: '#fbbf24' },
          { label: 'R', index: high, color: '#a78bfa' },
        ],
      },
    });

    if (midVal === target) {
      foundIdx = mid;
      steps.push({
        stepIndex: steps.length,
        title: `Target ${target} Found at Index ${mid}!`,
        description: `nums[${mid}] matches target ${target}. Search completed successfully in O(log n) time.`,
        codeLineHighlight: 5,
        variables: { foundIndex: mid, target, iterations: steps.length },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx === mid ? 'matched' : (idx >= low && idx <= high ? 'default' : 'eliminated'),
          })),
          pointers: [{ label: 'Match', index: mid, color: '#34d399' }],
        },
      });
      break;
    } else if (midVal < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (foundIdx === -1) {
    steps.push({
      stepIndex: steps.length,
      title: `Search Exhausted — Insert Position at Index ${low}`,
      description: `Target ${target} not in array. Binary search narrowed candidate insertion point to index ${low}.`,
      codeLineHighlight: 8,
      variables: { insertionIndex: low, target, status: 'complete' },
      arrayState: {
        elements: nums.map((v) => ({ value: v, status: 'default' })),
        pointers: [{ label: 'Insert', index: Math.min(low, nums.length - 1), color: '#fbbf24' }],
      },
    });
  }

  return steps;
}

/**
 * 18. Two Pointers Pattern Engine (two-pointers)
 * Inward/outward converging pointers without false sliding windows.
 */
export function simulateTwoPointersPattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawNums = input.nums ?? input.numbers ?? input.height ?? input.input ?? [1, 2, 3, 4, 6, 8, 11];
  const nums = parseNumberArray(rawNums, [1, 2, 3, 4, 6, 8, 11], 10);
  const target = parseSingleNumber(input.target, 10);

  let left = 0;
  let right = nums.length - 1;

  steps.push({
    stepIndex: 0,
    title: `Initialize Two Pointers for ${problem.title}`,
    description: `Array with ${nums.length} elements: [${nums.join(', ')}]. Left pointer at 0, Right pointer at ${right}.`,
    codeLineHighlight: 2,
    variables: { left, right, target, sum: nums[left] + nums[right] },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [
        { label: 'L', index: left, color: '#38bdf8' },
        { label: 'R', index: right, color: '#a78bfa' },
      ],
    },
  });

  while (left < right) {
    const sum = nums[left] + nums[right];

    steps.push({
      stepIndex: steps.length,
      title: `Compare Pointers: nums[${left}] (${nums[left]}) + nums[${right}] (${nums[right]}) = ${sum}`,
      description: `Evaluating pair sum ${sum} against target ${target}.`,
      codeLineHighlight: 4,
      variables: { left, right, leftVal: nums[left], rightVal: nums[right], sum, target },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === left || idx === right ? 'active' : (idx > left && idx < right ? 'comparing' : 'visited'),
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
      },
    });

    if (sum === target) {
      steps.push({
        stepIndex: steps.length,
        title: `Target Pair Found: indices [${left}, ${right}]!`,
        description: `nums[${left}] (${nums[left]}) + nums[${right}] (${nums[right]}) equals target ${target}.`,
        codeLineHighlight: 6,
        variables: { left, right, leftVal: nums[left], rightVal: nums[right], matched: true },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx === left || idx === right ? 'matched' : 'default',
          })),
          pointers: [
            { label: 'Matched L', index: left, color: '#34d399' },
            { label: 'Matched R', index: right, color: '#34d399' },
          ],
        },
      });
      return steps;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Two Pointers Completed for ${problem.title}`,
    description: `All pointer pairs scanned in O(N) linear time without quadratic comparisons.`,
    codeLineHighlight: 8,
    variables: { status: 'complete' },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'visited' })),
    },
  });

  return steps;
}

/**
 * 19. Kadane's Algorithm Pattern Engine (kadanes-algorithm)
 * Running contiguous sum without false sliding windows.
 */
export function simulateKadanePattern(input: Record<string, any>, problem: LeetCodeProblem): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const rawNums = input.nums ?? input.input ?? [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const nums = parseNumberArray(rawNums, [-2, 1, -3, 4, -1, 2, 1, -5, 4], 12);

  let currentSum = nums[0];
  let maxSum = nums[0];
  let windowStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  steps.push({
    stepIndex: 0,
    title: `Initialize Kadane's Maximum Subarray for ${problem.title}`,
    description: `Array of ${nums.length} elements: [${nums.join(', ')}]. Initial sum = ${nums[0]}.`,
    codeLineHighlight: 2,
    variables: { currentSum, maxSum, i: 0 },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [{ label: 'i', index: 0, color: '#38bdf8' }],
    },
  });

  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    const shouldReset = val > currentSum + val;

    if (shouldReset) {
      currentSum = val;
      windowStart = i;
    } else {
      currentSum += val;
    }

    const isNewMax = currentSum > maxSum;
    if (isNewMax) {
      maxSum = currentSum;
      bestStart = windowStart;
      bestEnd = i;
    }

    steps.push({
      stepIndex: steps.length,
      title: `Index ${i} (${val}): currentSum = ${currentSum}`,
      description: shouldReset
        ? `Element ${val} > currentSum + ${val}. Resetting subarray start to index ${i}.`
        : `Extending subarray [${windowStart}..${i}]. Cumulative sum is ${currentSum}.${
            isNewMax ? ` New maximum sum: ${maxSum}!` : ''
          }`,
      codeLineHighlight: 4,
      variables: { i, val, currentSum, maxSum, subarray: `[${windowStart}..${i}]` },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx >= windowStart && idx <= i ? (isNewMax ? 'matched' : 'active') : 'default',
        })),
        pointers: [
          { label: 'Start', index: windowStart, color: '#34d399' },
          { label: 'i', index: i, color: '#38bdf8' },
        ],
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Optimal Maximum Subarray Sum: ${maxSum}`,
    description: `Maximum contiguous subarray is [${bestStart}..${bestEnd}] with total sum = ${maxSum}. Solved in O(N) time.`,
    codeLineHighlight: 8,
    variables: { maxSum, bestStart, bestEnd },
    arrayState: {
      elements: nums.map((v, idx) => ({
        value: v,
        status: idx >= bestStart && idx <= bestEnd ? 'matched' : 'default',
      })),
      pointers: [
        { label: 'Best L', index: bestStart, color: '#34d399' },
        { label: 'Best R', index: bestEnd, color: '#34d399' },
      ],
    },
  });

  return steps;
}
