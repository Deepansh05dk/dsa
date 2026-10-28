import type { LeetCodeProblem } from '../../types/problem';

export const heapProblems: LeetCodeProblem[] = [
  {
    id: 215,
    slug: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    pattern: 'heap',
    category: 'Heap',
    statement: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?',
    examples: [
      {
        input: 'nums = [3,2,1,5,6,4], k = 2',
        output: '5'
      },
      {
        input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
        output: '4'
      }
    ],
    constraints: [
      '1 <= k <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    bruteForce: {
      name: 'Full Array Sort',
      code: `function findKthLargestBrute(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'Sorts the entire array descending and returns the element at index k - 1.'
    },
    optimal: {
      name: 'Quickselect (Average Linear Selection)',
      code: `function findKthLargest(nums: number[], k: number): number {
  const targetIndex = nums.length - k;

  function quickSelect(left: number, right: number): number {
    const pivot = nums[right];
    let pIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        const temp = nums[i];
        nums[i] = nums[pIndex];
        nums[pIndex] = temp;
        pIndex++;
      }
    }

    nums[right] = nums[pIndex];
    nums[pIndex] = pivot;

    if (pIndex === targetIndex) {
      return nums[pIndex];
    } else if (pIndex < targetIndex) {
      return quickSelect(pIndex + 1, right);
    } else {
      return quickSelect(left, pIndex - 1);
    }
  }

  return quickSelect(0, nums.length - 1);
}`,
      complexity: {
        time: 'O(N) average, O(N^2) worst case',
        space: 'O(1) extra'
      },
      explanation: 'Quickselect partitions array around a pivot element. Only recurse into the partition containing the target rank targetIndex = nums.length - k. Sum of subproblem sizes N + N/2 + N/4 + ... converges to O(2N) = O(N) average time.',
      whyOptimalIsPreferred: 'Linear average runtime O(N) without full sorting or extra heap allocations.',
      patternInvariant: 'Partitioning places the chosen pivot at its exact final sorted index in O(N); discard the unneeded half.'
    },
    defaultInputDescription: 'nums = [3, 2, 1, 5, 6, 4], k = 2'
  },
  {
    id: 373,
    slug: 'find-k-pairs-with-smallest-sums',
    title: 'Find K Pairs with Smallest Sums',
    difficulty: 'Medium',
    pattern: 'heap',
    category: 'Heap',
    statement: 'You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k. Define a pair (u, v) which consists of one element from nums1 and one element from nums2. Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.',
    examples: [
      {
        input: 'nums1 = [1,7,11], nums2 = [2,4,6], k = 3',
        output: '[[1,2],[1,4],[1,6]]',
        explanation: 'The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]'
      },
      {
        input: 'nums1 = [1,1,2], nums2 = [1,2,3], k = 2',
        output: '[[1,1],[1,1]]'
      }
    ],
    constraints: [
      '1 <= nums1.length, nums2.length <= 10^5',
      '-10^9 <= nums1[i], nums2[i] <= 10^9',
      'nums1 and nums2 are sorted in non-decreasing order.',
      '1 <= k <= 10^4'
    ],
    bruteForce: {
      name: 'Cartesian Product Generation and Sort',
      code: `function kSmallestPairsBrute(nums1: number[], nums2: number[], k: number): number[][] {
  const pairs: number[][] = [];
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    for (let j = 0; j < Math.min(nums2.length, k); j++) {
      pairs.push([nums1[i], nums2[j]]);
    }
  }
  pairs.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
  return pairs.slice(0, k);
}`,
      complexity: {
        time: 'O(k^2 log(k^2))',
        space: 'O(k^2)'
      },
      explanation: 'Generates up to k^2 candidate pairs, sorts them all by sum, and takes the top k.'
    },
    optimal: {
      name: 'Min-Heap Multi-Way Merge',
      code: `class MinHeapPairs {
  private data: Array<[number, number, number]> = []; // [sum, i, j]
  push(val: [number, number, number]) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }
  pop(): [number, number, number] | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.sinkDown(0);
    }
    return top;
  }
  size() { return this.data.length; }
  private bubbleUp(idx: number) {
    while (idx > 0) {
      const p = Math.floor((idx - 1) / 2);
      if (this.data[idx][0] < this.data[p][0]) {
        [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];
        idx = p;
      } else break;
    }
  }
  private sinkDown(idx: number) {
    const len = this.data.length;
    while (true) {
      let smallest = idx;
      const l = 2 * idx + 1, r = 2 * idx + 2;
      if (l < len && this.data[l][0] < this.data[smallest][0]) smallest = l;
      if (r < len && this.data[r][0] < this.data[smallest][0]) smallest = r;
      if (smallest !== idx) {
        [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
        idx = smallest;
      } else break;
    }
  }
}

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const result: number[][] = [];
  if (nums1.length === 0 || nums2.length === 0 || k === 0) return result;

  const heap = new MinHeapPairs();
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  while (result.length < k && heap.size() > 0) {
    const [, i, j] = heap.pop()!;
    result.push([nums1[i], nums2[j]]);

    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }

  return result;
}`,
      complexity: {
        time: 'O(k log(min(N1, k)))',
        space: 'O(min(N1, k))'
      },
      explanation: 'View nums1 as k sorted streams paired with nums2. Push the first pair of each stream into a Min-Heap. Repeatedly extract the minimum pair and push its successor from nums2, completing in O(k log k) time.',
      whyOptimalIsPreferred: 'Consumes only O(min(N1, k)) space and visits only the k minimal pairs, avoiding generating the entire quadratic Cartesian product.',
      patternInvariant: 'Sorted pair monotonic progression: after (i, j) is consumed, the next smallest candidate in row i is (i, j + 1).'
    },
    defaultInputDescription: 'nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3'
  },
  {
    id: 295,
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    pattern: 'heap',
    category: 'Heap',
    statement: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class: MedianFinder() initializes the MedianFinder object. void addNum(int num) adds the integer num from the data stream to the data structure. double findMedian() returns the median of all elements so far.',
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"], [[], [1], [2], [], [3], []]',
        output: '[null, null, null, 1.5, null, 2.0]',
        explanation: 'MedianFinder medianFinder = new MedianFinder(); medianFinder.addNum(1); medianFinder.addNum(2); medianFinder.findMedian(); // return 1.5; medianFinder.addNum(3); medianFinder.findMedian(); // return 2.0'
      }
    ],
    constraints: [
      '-10^5 <= num <= 10^5',
      'There will be at least one element in the data structure before calling findMedian.',
      'At most 5 * 10^4 calls will be made to addNum and findMedian.'
    ],
    bruteForce: {
      name: 'Insertion Sort into Dynamic Array',
      code: `class MedianFinderBrute {
  private arr: number[] = [];
  addNum(num: number): void {
    let l = 0, r = this.arr.length;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (this.arr[mid] < num) l = mid + 1;
      else r = mid;
    }
    this.arr.splice(l, 0, num);
  }
  findMedian(): number {
    const n = this.arr.length;
    const mid = Math.floor(n / 2);
    return n % 2 === 1 ? this.arr[mid] : (this.arr[mid - 1] + this.arr[mid]) / 2;
  }
}`,
      complexity: {
        time: 'O(N) for addNum, O(1) for findMedian',
        space: 'O(N)'
      },
      explanation: 'Uses binary search to find insertion position and shifts the array using splice in O(N) time per insertion.'
    },
    optimal: {
      name: 'Two Heaps (Max-Heap Lower Half, Min-Heap Upper Half)',
      code: `class BinaryHeap {
  private data: number[] = [];
  constructor(private isMin: boolean) {}
  push(val: number) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[p])) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.sink(0);
    }
    return top;
  }
  peek(): number { return this.data[0]; }
  size(): number { return this.data.length; }
  private compare(a: number, b: number): boolean {
    return this.isMin ? a < b : a > b;
  }
  private sink(i: number) {
    const len = this.data.length;
    while (true) {
      let best = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < len && this.compare(this.data[l], this.data[best])) best = l;
      if (r < len && this.compare(this.data[r], this.data[best])) best = r;
      if (best !== i) {
        [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
        i = best;
      } else break;
    }
  }
}

class MedianFinder {
  private small = new BinaryHeap(false); // Max-heap: holds smaller half
  private large = new BinaryHeap(true);  // Min-heap: holds larger half

  addNum(num: number): void {
    if (this.small.size() === 0 || num <= this.small.peek()) {
      this.small.push(num);
    } else {
      this.large.push(num);
    }

    // Rebalance: small can have at most 1 more element than large
    if (this.small.size() > this.large.size() + 1) {
      this.large.push(this.small.pop()!);
    } else if (this.large.size() > this.small.size()) {
      this.small.push(this.large.pop()!);
    }
  }

  findMedian(): number {
    if (this.small.size() > this.large.size()) {
      return this.small.peek();
    }
    return (this.small.peek() + this.large.peek()) / 2;
  }
}`,
      complexity: {
        time: 'O(log N) for addNum, O(1) for findMedian',
        space: 'O(N)'
      },
      explanation: 'Partition numbers into two balanced halves: lower half in Max-Heap and upper half in Min-Heap. The median is always available at the root(s) in O(1) time, while insertion takes logarithmic O(log N) time.',
      whyOptimalIsPreferred: 'Maintains median dynamically in O(log N) per stream update and O(1) retrieval without array shifting.',
      patternInvariant: 'Dual heap balancing invariant: max(lowerHalf) <= min(upperHalf) with sizes differing by at most 1.'
    },
    defaultInputDescription: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()'
  },
  {
    id: 502,
    slug: 'ipo',
    title: 'IPO',
    difficulty: 'Hard',
    pattern: 'heap',
    category: 'Heap',
    statement: 'Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it. Initially, you have w capital. Pick a list of at most k distinct projects to maximize your total capital.',
    examples: [
      {
        input: 'k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]',
        output: '4',
        explanation: 'Since your initial capital is 0, you can only start project index 0. After finishing it, you will get profit 1 and your capital becomes 1. With capital 1, you can either start project index 1 or project index 2. As you can choose at most 2 projects, choose project 2 to get maximum capital = 1 + 3 = 4.'
      },
      {
        input: 'k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]',
        output: '6'
      }
    ],
    constraints: [
      '1 <= k <= 10^5',
      '0 <= w <= 10^9',
      'n == profits.length == capital.length',
      '1 <= n <= 10^5',
      '0 <= profits[i] <= 10^4',
      '0 <= capital[i] <= 10^9'
    ],
    bruteForce: {
      name: 'Greedy Linear Search Across Projects Each Round',
      code: `function findMaximizedCapitalBrute(k: number, w: number, profits: number[], capital: number[]): number {
  const n = profits.length;
  const used = new Array(n).fill(false);
  for (let step = 0; step < k; step++) {
    let bestIdx = -1;
    let maxP = -1;
    for (let i = 0; i < n; i++) {
      if (!used[i] && capital[i] <= w && profits[i] > maxP) {
        maxP = profits[i];
        bestIdx = i;
      }
    }
    if (bestIdx === -1) break;
    used[bestIdx] = true;
    w += maxP;
  }
  return w;
}`,
      complexity: {
        time: 'O(k * N)',
        space: 'O(N)'
      },
      explanation: 'At each of the k steps, scans all N projects to locate the project with the highest profit affordable with current capital.'
    },
    optimal: {
      name: 'Sorted Capital Index + Max-Heap for Available Profits',
      code: `class MaxHeapIPO {
  private data: number[] = [];
  push(val: number) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[i] > this.data[p]) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.sink(0);
    }
    return top;
  }
  size(): number { return this.data.length; }
  private sink(i: number) {
    const len = this.data.length;
    while (true) {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < len && this.data[l] > this.data[largest]) largest = l;
      if (r < len && this.data[r] > this.data[largest]) largest = r;
      if (largest !== i) {
        [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
        i = largest;
      } else break;
    }
  }
}

function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  const n = profits.length;
  const projects: Array<{ c: number; p: number }> = [];
  for (let i = 0; i < n; i++) {
    projects.push({ c: capital[i], p: profits[i] });
  }

  projects.sort((a, b) => a.c - b.c);

  const availableProfits = new MaxHeapIPO();
  let ptr = 0;

  for (let i = 0; i < k; i++) {
    while (ptr < n && projects[ptr].c <= w) {
      availableProfits.push(projects[ptr].p);
      ptr++;
    }

    if (availableProfits.size() === 0) {
      break;
    }

    w += availableProfits.pop()!;
  }

  return w;
}`,
      complexity: {
        time: 'O(N log N + k log N)',
        space: 'O(N)'
      },
      explanation: 'Sort projects by capital requirement. Push all newly affordable projects into a Max-Heap based on profit. At each round, pop the maximum profit project in O(log N) time to add to capital.',
      whyOptimalIsPreferred: 'Reduces time from O(k * N) to O(N log N + k log N) by sorting capital and extracting top profit via Max-Heap.',
      patternInvariant: 'Two-stage greedy: unlock projects monotonically by increasing capital threshold, then greedily harvest maximum profit from the available pool.'
    },
    defaultInputDescription: 'k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]'
  }
];
