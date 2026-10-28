import type { VisualizerStep } from '../../types/visualizer';

export const HEAP_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 215: Kth Largest Element in an Array (Min-Heap of size k = 2)
  215: [
    {
      stepIndex: 0,
      title: 'Initialize Min-Heap of Capacity k = 2 for nums = [3, 2, 1, 5, 6, 4]',
      description: 'Min-Heap keeps the k largest elements seen so far at all times. Heap root is the current kth candidate.',
      codeLineHighlight: 2,
      variables: { k: 2, heapSize: 0 },
      heapState: {
        type: 'min',
        elements: [
          { value: 3, status: 'root' },
          { value: 2, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Push 5: Heap Exceeds Size k -> Evict Minimum Element 2',
      description: 'Heap contains [2, 3, 5]. Root 2 is popped. Heap rebalances to [3, 5] with 3 as root.',
      codeLineHighlight: 5,
      variables: { incoming: 5, evicted: 2, currentKth: 3 },
      heapState: {
        type: 'min',
        elements: [
          { value: 3, status: 'root' },
          { value: 5, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Push 6: Sift Up and Pop Minimum Element 3',
      description: '6 > root 3. Pop 3 and push 6. Heap rebalances: root becomes 5, right child 6.',
      codeLineHighlight: 6,
      variables: { incoming: 6, evicted: 3, currentKth: 5 },
      heapState: {
        type: 'min',
        elements: [
          { value: 5, status: 'root' },
          { value: 6, status: 'sifting' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Compare 4 with Root 5: 4 < 5 (Ignore 4)',
      description: 'Incoming element 4 is strictly smaller than current kth largest (5). No change to heap.',
      codeLineHighlight: 7,
      variables: { incoming: 4, action: 'ignored', finalKth: 5 },
      heapState: {
        type: 'min',
        elements: [
          { value: 5, status: 'root' },
          { value: 6, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 4,
      title: 'Algorithm Complete: Return Root (5) as 2nd Largest Element',
      description: 'All elements processed. Root of size-k min-heap is the kth largest element (5). Time: O(N log k), Space: O(k).',
      codeLineHighlight: 10,
      variables: { kthLargest: 5, timeComplexity: 'O(N log k)', spaceComplexity: 'O(k)' },
      heapState: {
        type: 'min',
        elements: [
          { value: 5, status: 'root' },
          { value: 6, status: 'default' },
        ],
      },
    },
  ],

  // Problem 295: Find Median from Data Stream (Two Heaps: Max-Heap & Min-Heap)
  295: [
    {
      stepIndex: 0,
      title: 'Initialize Dual Heaps: Small (Max-Heap) & Large (Min-Heap)',
      description: 'Small heap stores lower half of numbers (max at root). Large heap stores upper half (min at root).',
      codeLineHighlight: 2,
      variables: { smallSize: 0, largeSize: 0 },
      heapState: {
        type: 'max',
        elements: [
          { value: 1, status: 'root' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'addNum(1): Insert into Max-Heap Small',
      description: 'Small has [1]. Balanced: small.size == large.size + 1. Median = small.root = 1.0.',
      codeLineHighlight: 4,
      variables: { added: 1, median: 1.0 },
      heapState: {
        type: 'max',
        elements: [
          { value: 1, status: 'root' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'addNum(2): Insert into Min-Heap Large',
      description: 'Small has [1], Large has [2]. Equal sizes! Median = (1 + 2) / 2.0 = 1.5.',
      codeLineHighlight: 6,
      variables: { added: 2, median: 1.5 },
      heapState: {
        type: 'min',
        elements: [
          { value: 1, status: 'root' },
          { value: 2, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'addNum(3): Rebalance Heaps -> Median = 2.0',
      description: 'Small has [2, 1], Large has [3]. Odd count, Small has one more element. Median is small.root = 2.0.',
      codeLineHighlight: 8,
      variables: { added: 3, median: 2.0, timeComplexity: 'O(log N)' },
      heapState: {
        type: 'max',
        elements: [
          { value: 2, status: 'root' },
          { value: 1, status: 'default' },
          { value: 3, status: 'default' },
        ],
      },
    },
  ],

  // Problem 373: Find K Pairs with Smallest Sums
  373: [
    {
      stepIndex: 0,
      title: 'Initialize Min-Heap with First Column Pairs (nums1[i], nums2[0])',
      description: 'nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3. Seed heap with pair sums [1+2=3, 7+2=9, 11+2=13].',
      codeLineHighlight: 3,
      variables: { k: 3, heapSize: 3, minSum: 3 },
      heapState: {
        type: 'min',
        elements: [
          { value: 3, status: 'root' },
          { value: 9, status: 'default' },
          { value: 13, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Extract Min Pair (1, 2) [Sum 3] -> Push Next Pair (1, 4) [Sum 5]',
      description: 'First smallest pair added to result: [1, 2]. Advance nums2 pointer for row 0: push 1 + 4 = 5.',
      codeLineHighlight: 6,
      variables: { pair: '[1, 2]', result: '[[1, 2]]', newSum: 5 },
      heapState: {
        type: 'min',
        elements: [
          { value: 5, status: 'root' },
          { value: 9, status: 'default' },
          { value: 13, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Extract Min Pair (1, 4) [Sum 5] -> Push (1, 6) [Sum 7]',
      description: 'Second smallest pair recorded: [1, 4]. Push 1 + 6 = 7. Root rebalances to next smallest: 7.',
      codeLineHighlight: 6,
      variables: { pair: '[1, 4]', result: '[[1, 2], [1, 4]]', newSum: 7 },
      heapState: {
        type: 'min',
        elements: [
          { value: 7, status: 'root' },
          { value: 9, status: 'default' },
          { value: 13, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Extract 3rd Min Pair (1, 6) [Sum 7]: Return Top 3 Pairs',
      description: 'k = 3 pairs collected: [[1, 2], [1, 4], [1, 6]]. Time: O(k log k), Space: O(k).',
      codeLineHighlight: 9,
      variables: { result: '[[1, 2], [1, 4], [1, 6]]', complete: true },
      heapState: {
        type: 'min',
        elements: [
          { value: 7, status: 'root' },
          { value: 9, status: 'default' },
          { value: 13, status: 'default' },
        ],
      },
    },
  ],

  // Problem 502: IPO (Max Capital via Dual Heaps)
  502: [
    {
      stepIndex: 0,
      title: 'Sort Projects by Capital & Initialize Max-Heap for Available Profits',
      description: 'k = 2 projects, initial capital W = 0. Profits: [1, 2, 3], Capitals: [0, 1, 1]. Project 0 is available.',
      codeLineHighlight: 2,
      variables: { k: 2, capital: 0, availableProjects: 1 },
      heapState: {
        type: 'max',
        elements: [
          { value: 1, status: 'root' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Select Project 0 (Profit 1): Capital Becomes W = 0 + 1 = 1',
      description: 'Greedily pick maximum available profit (1). Capital increases to 1. Now projects 1 and 2 become affordable!',
      codeLineHighlight: 5,
      variables: { pickedProfit: 1, newCapital: 1, unlocked: 'Projects 1 & 2' },
      heapState: {
        type: 'max',
        elements: [
          { value: 3, status: 'root' },
          { value: 2, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Select Project 2 (Profit 3): Capital Becomes W = 1 + 3 = 4',
      description: 'Max profit available is 3. Greedily execute project 2. Capital increases to 4. k = 2 reached!',
      codeLineHighlight: 8,
      variables: { pickedProfit: 3, finalCapital: 4, complete: true },
      heapState: {
        type: 'max',
        elements: [
          { value: 4, status: 'root' },
          { value: 2, status: 'default' },
        ],
      },
    },
  ],
};
