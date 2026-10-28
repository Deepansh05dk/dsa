import type { LeetCodeProblem } from '../../types/problem';

export const arrayStringProblems: LeetCodeProblem[] = [
  {
    id: 88,
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order in-place inside nums1.',
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6].'
      },
      {
        input: 'nums1 = [1], m = 1, nums2 = [], n = 0',
        output: '[1]'
      },
      {
        input: 'nums1 = [0], m = 0, nums2 = [1], n = 1',
        output: '[1]'
      }
    ],
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 <= m, n <= 200',
      '-10^9 <= nums1[i], nums2[j] <= 10^9'
    ],
    bruteForce: {
      name: 'Append and Full Sort',
      code: `function mergeBruteForce(nums1: number[], m: number, nums2: number[], n: number): void {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
}`,
      complexity: {
        time: 'O((m+n) log(m+n))',
        space: 'O(1)'
      },
      explanation: 'Copy elements from nums2 into the empty trailing slots of nums1, then run a standard library sort.'
    },
    optimal: {
      name: 'Three-Pointer Reverse Placement',
      code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
}`,
      complexity: {
        time: 'O(m + n)',
        space: 'O(1)'
      },
      explanation: 'Fill nums1 from the back (largest elements first). Compare nums1[p1] and nums2[p2] and write the larger one to nums1[p]. This never overwrites unread elements of nums1.',
      whyOptimalIsPreferred: 'Linear O(m + n) time and O(1) space with zero element displacement or sorting overhead.',
      patternInvariant: 'Working backwards from the end of an array allows in-place overwriting without clobbering active data.'
    },
    defaultInputDescription: 'nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3'
  },
  {
    id: 27,
    slug: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.',
    examples: [
      {
        input: 'nums = [3,2,2,3], val = 3',
        output: '2, nums = [2,2,_,_]',
        explanation: 'Your function should return k = 2, with the first two elements of nums being 2.'
      },
      {
        input: 'nums = [0,1,2,2,3,0,4,2], val = 2',
        output: '5, nums = [0,1,4,0,3,_,_,_]'
      }
    ],
    constraints: [
      '0 <= nums.length <= 100',
      '0 <= nums[i] <= 50',
      '0 <= val <= 100'
    ],
    bruteForce: {
      name: 'Linear Scan with Array Splice',
      code: `function removeElementBrute(nums: number[], val: number): number {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }
  return nums.length;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Scans the array and splices elements matching val, which causes quadratic element shifting.'
    },
    optimal: {
      name: 'Two-Pointer Fast/Slow Runner Filter',
      code: `function removeElement(nums: number[], val: number): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Use a slow pointer k to write valid non-val elements and a fast pointer i to scan the array. Only copy nums[i] to nums[k] when nums[i] !== val, running in a single pass.',
      whyOptimalIsPreferred: 'Linear O(N) execution that avoids costly array shifting in strictly constant O(1) space.',
      patternInvariant: 'In-place filter invariant: slow pointer k tracks the boundary of valid retained elements.'
    },
    defaultInputDescription: 'nums = [3, 2, 2, 3], val = 3'
  },
  {
    id: 26,
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.',
    examples: [
      {
        input: 'nums = [1,1,2]',
        output: '2, nums = [1,2,_]',
        explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.'
      },
      {
        input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
        output: '5, nums = [0,1,2,3,4,_,_,_,_,_]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-100 <= nums[i] <= 100',
      'nums is sorted in non-decreasing order.'
    ],
    bruteForce: {
      name: 'Set Deduplication and Array Rebuild',
      code: `function removeDuplicatesBrute(nums: number[]): number {
  const unique = Array.from(new Set(nums));
  for (let i = 0; i < unique.length; i++) {
    nums[i] = unique[i];
  }
  return unique.length;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Inserts all elements into a Set and writes unique values back, requiring auxiliary memory.'
    },
    optimal: {
      name: 'Two-Pointer In-Place Unique Boundary Write',
      code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let writeIndex = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Because array is sorted, duplicates are strictly contiguous. Advance scanner i; whenever nums[i] !== nums[i - 1], copy nums[i] to writeIndex and increment.',
      whyOptimalIsPreferred: 'Preserves sorted order in O(1) extra space with the minimum possible number of writes.',
      patternInvariant: 'Sorted uniqueness invariant: compare current element to the immediately preceding element to identify transitions.'
    },
    defaultInputDescription: 'nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]'
  },
  {
    id: 80,
    slug: 'remove-duplicates-from-sorted-array-ii',
    title: 'Remove Duplicates from Sorted Array II',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same. Return k after placing the final result in the first k slots of nums.',
    examples: [
      {
        input: 'nums = [1,1,1,2,2,3]',
        output: '5, nums = [1,1,2,2,3,_]',
        explanation: 'Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.'
      },
      {
        input: 'nums = [0,0,1,1,1,1,2,3,3]',
        output: '7, nums = [0,0,1,1,2,3,3,_,_]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums is sorted in non-decreasing order.'
    ],
    bruteForce: {
      name: 'Frequency Hash Map and In-Place Overwrite',
      code: `function removeDuplicatesIIBrute(nums: number[]): number {
  const counts = new Map<number, number>();
  const res: number[] = [];
  for (const n of nums) {
    const c = counts.get(n) || 0;
    if (c < 2) {
      counts.set(n, c + 1);
      res.push(n);
    }
  }
  for (let i = 0; i < res.length; i++) nums[i] = res[i];
  return res.length;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Uses a Hash Map to count occurrences and buffers up to 2 copies per number in an auxiliary array.'
    },
    optimal: {
      name: 'Two-Back Lookahead Writer Pointer',
      code: `function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;
  let k = 2;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Allow write at slow pointer k if nums[i] !== nums[k - 2]. Because the array is sorted, this automatically enforces that no number appears more than twice in the prefix [0..k-1].',
      whyOptimalIsPreferred: 'Solves the at-most-k duplicates problem in O(1) space with a single invariant comparison.',
      patternInvariant: 'At-most-k duplicates rule: compare current candidate nums[i] against the placed element k positions back nums[write - k].'
    },
    defaultInputDescription: 'nums = [1, 1, 1, 2, 2, 3]'
  },
  {
    id: 169,
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than floor(n / 2) times. You may assume that the majority element always exists in the array.',
    examples: [
      {
        input: 'nums = [3,2,3]',
        output: '3'
      },
      {
        input: 'nums = [2,2,1,1,1,2,2]',
        output: '2'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5 * 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    bruteForce: {
      name: 'Hash Map Frequency Counting',
      code: `function majorityElementBrute(nums: number[]): number {
  const counts = new Map<number, number>();
  const threshold = Math.floor(nums.length / 2);
  for (const n of nums) {
    const c = (counts.get(n) || 0) + 1;
    counts.set(n, c);
    if (c > threshold) return n;
  }
  return -1;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Counts frequencies of all elements in a Hash Map until an element exceeds floor(n/2).'
    },
    optimal: {
      name: 'Boyer-Moore Voting Algorithm',
      code: `function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate = nums[0];

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }

  return candidate;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain a candidate and a counter. If counter is 0, assign candidate = num. Increment count when seeing candidate, decrement on any other number. Since the majority element appears more than n/2 times, it is guaranteed to have a positive count balance at the end.',
      whyOptimalIsPreferred: 'Linear O(N) single pass in strictly O(1) space with zero heap allocations.',
      patternInvariant: 'Boyer-Moore cancellation invariant: pairing differing elements cancels out at most equal counts, leaving the true majority survivor.'
    },
    defaultInputDescription: 'nums = [2, 2, 1, 1, 1, 2, 2]'
  },
  {
    id: 189,
    slug: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.',
    examples: [
      {
        input: 'nums = [1,2,3,4,5,6,7], k = 3',
        output: '[5,6,7,1,2,3,4]',
        explanation: 'rotate 1 steps to the right: [7,1,2,3,4,5,6]; rotate 2 steps to the right: [6,7,1,2,3,4,5]; rotate 3 steps to the right: [5,6,7,1,2,3,4]'
      },
      {
        input: 'nums = [-1,-100,3,99], k = 2',
        output: '[3,99,-1,-100]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1',
      '0 <= k <= 10^5'
    ],
    bruteForce: {
      name: 'Auxiliary Array Placement',
      code: `function rotateBrute(nums: number[], k: number): void {
  const n = nums.length;
  k = k % n;
  const copy = [...nums];
  for (let i = 0; i < n; i++) {
    nums[(i + k) % n] = copy[i];
  }
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Copies the array and maps each element from index i to (i + k) % n.'
    },
    optimal: {
      name: 'Triple Reverse In-Place Algorithm',
      code: `function rotate(nums: number[], k: number): void {
  const n = nums.length;
  k = k % n;
  if (k === 0) return;

  function reverse(left: number, right: number) {
    while (left < right) {
      const temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  }

  // 1. Reverse the entire array
  reverse(0, n - 1);
  // 2. Reverse first k elements
  reverse(0, k - 1);
  // 3. Reverse remaining n - k elements
  reverse(k, n - 1);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Cyclic shifts decompose into reversals: reverse the whole array, then reverse [0..k-1] to restore order of shifted tail, and reverse [k..n-1] to restore shifted head. Exactly 2N total swaps in O(1) space.',
      whyOptimalIsPreferred: 'In-place O(1) auxiliary memory execution satisfying strict space constraints.',
      patternInvariant: 'Cyclic shift property: rotate(A, k) = reverse(reverse(A[0..n-1])[0..k-1]) + reverse(reverse(A[0..n-1])[k..n-1]).'
    },
    defaultInputDescription: 'nums = [1, 2, 3, 4, 5, 6, 7], k = 3'
  },
  {
    id: 121,
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    bruteForce: {
      name: 'All Pairs Buy/Sell Scan',
      code: `function maxProfitBrute(prices: number[]): number {
  let maxP = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      maxP = Math.max(maxP, prices[j] - prices[i]);
    }
  }
  return maxP;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Tests every valid pair (i, j) where j > i and finds the maximum positive difference.'
    },
    optimal: {
      name: 'Single-Pass Greedy Minimum Tracking',
      code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain running minPrice seen so far. At each day, calculate potential profit price - minPrice and update maxProfit. Complete in a single linear pass.',
      whyOptimalIsPreferred: 'Reduces quadratic O(N^2) search to linear O(N) time with O(1) space.',
      patternInvariant: 'Prefix minimum tracking: optimal sale today requires buying at the lowest historical price seen prior to today.'
    },
    defaultInputDescription: 'prices = [7, 1, 5, 3, 6, 4]'
  },
  {
    id: 122,
    slug: 'best-time-to-buy-and-sell-stock-ii',
    title: 'Best Time to Buy and Sell Stock II',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'You are given an integer array prices where prices[i] is the price of a given stock on the ith day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '7',
        explanation: 'Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3. Total profit is 4 + 3 = 7.'
      },
      {
        input: 'prices = [1,2,3,4,5]',
        output: '4',
        explanation: 'Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0'
      }
    ],
    constraints: [
      '1 <= prices.length <= 3 * 10^4',
      '0 <= prices[i] <= 10^4'
    ],
    bruteForce: {
      name: 'Recursive Decision Tree Simulation',
      code: `function maxProfitIIBrute(prices: number[]): number {
  function dfs(day: number, holding: boolean): number {
    if (day >= prices.length) return 0;
    const skip = dfs(day + 1, holding);
    if (holding) {
      const sell = prices[day] + dfs(day + 1, false);
      return Math.max(skip, sell);
    } else {
      const buy = -prices[day] + dfs(day + 1, true);
      return Math.max(skip, buy);
    }
  }
  return dfs(0, false);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      },
      explanation: 'Branches on all buy/sell/hold decisions at every day in exponential time.'
    },
    optimal: {
      name: 'Greedy Valley-to-Peak Accumulation',
      code: `function maxProfit(prices: number[]): number {
  let totalProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      totalProfit += prices[i] - prices[i - 1];
    }
  }

  return totalProfit;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'With unlimited transactions, every positive daily slope prices[i] - prices[i-1] can be harvested independently. Summing all adjacent gains is mathematically identical to holding across entire upward rallies.',
      whyOptimalIsPreferred: 'Optimal linear O(N) pass with O(1) space capturing all upward price movements.',
      patternInvariant: 'Telescoping property: a long rally (prices[d] - prices[a]) is equal to sum of daily gains (prices[i] - prices[i - 1]).'
    },
    defaultInputDescription: 'prices = [7, 1, 5, 3, 6, 4]'
  },
  {
    id: 55,
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.',
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: 'true',
        explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.'
      },
      {
        input: 'nums = [3,2,1,0,4]',
        output: 'false',
        explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    bruteForce: {
      name: 'Recursive Jump Length Branching',
      code: `function canJumpBrute(nums: number[]): boolean {
  function check(idx: number): boolean {
    if (idx >= nums.length - 1) return true;
    const maxJump = nums[idx];
    for (let j = maxJump; j >= 1; j--) {
      if (check(idx + j)) return true;
    }
    return false;
  }
  return check(0);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      },
      explanation: 'Recursively explores all jump lengths from each reachable index.'
    },
    optimal: {
      name: 'Greedy Maximum Reachable Boundary Frontier',
      code: `function canJump(nums: number[]): boolean {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false; // Trapped behind unreachable index
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain maxReach representing the furthest index reachable. If current index i exceeds maxReach, we cannot proceed further. Otherwise update maxReach = max(maxReach, i + nums[i]).',
      whyOptimalIsPreferred: 'Linear O(N) scan replacing exponential backtracking with constant O(1) state memory.',
      patternInvariant: 'Reachable boundary monotonicity: if index k is reachable, all indices 0..k are reachable.'
    },
    defaultInputDescription: 'nums = [2, 3, 1, 1, 4]'
  },
  {
    id: 45,
    slug: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n. Return the minimum number of jumps to reach nums[n - 1].',
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: '2',
        explanation: 'The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.'
      },
      {
        input: 'nums = [2,3,0,1,4]',
        output: '2'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 1000',
      'It\'s guaranteed that you can reach nums[n - 1].'
    ],
    bruteForce: {
      name: 'Recursive Jump Memoization Search (O(N^2))',
      code: `function jumpBrute(nums: number[]): number {
  const memo = new Array(nums.length).fill(Infinity);
  memo[nums.length - 1] = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = 1; j <= nums[i] && i + j < nums.length; j++) {
      memo[i] = Math.min(memo[i], 1 + memo[i + j]);
    }
  }
  return memo[0];
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Evaluates minimum jumps from each index backwards using nested loops.'
    },
    optimal: {
      name: 'Greedy Implicit BFS Range Extension',
      code: `function jump(nums: number[]): number {
  let jumps = 0;
  let currentEnd = 0;
  let furthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    furthest = Math.max(furthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = furthest;
      if (currentEnd >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Model jump levels as contiguous BFS windows. Track currentEnd (boundary of current jump level) and furthest. When i reaches currentEnd, increment jumps and update currentEnd = furthest.',
      whyOptimalIsPreferred: 'Linear O(N) execution that finds the true shortest path without explicit BFS queue memory.',
      patternInvariant: 'BFS level windowing: all indices within [currentStart, currentEnd] share the same jump count.'
    },
    defaultInputDescription: 'nums = [2, 3, 1, 1, 4]'
  },
  {
    id: 274,
    slug: 'h-index',
    title: 'H-Index',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher\'s h-index. According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.',
    examples: [
      {
        input: 'citations = [3,0,6,1,5]',
        output: '3',
        explanation: '[3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively. Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.'
      },
      {
        input: 'citations = [1,3,1]',
        output: '1'
      }
    ],
    constraints: [
      'n == citations.length',
      '1 <= n <= 5000',
      '0 <= citations[i] <= 1000'
    ],
    bruteForce: {
      name: 'Sort Descending Scan (O(N log N))',
      code: `function hIndexBrute(citations: number[]): number {
  citations.sort((a, b) => b - a);
  let h = 0;
  while (h < citations.length && citations[h] > h) h++;
  return h;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(1)'
      },
      explanation: 'Sorts citations descending and finds the largest index where citations[h] > h.'
    },
    optimal: {
      name: 'Counting Sort / Bucket Tally (O(N) Time)',
      code: `function hIndex(citations: number[]): number {
  const n = citations.length;
  const buckets = new Array(n + 1).fill(0);

  for (const c of citations) {
    if (c >= n) {
      buckets[n]++;
    } else {
      buckets[c]++;
    }
  }

  let totalPapers = 0;
  for (let i = n; i >= 0; i--) {
    totalPapers += buckets[i];
    if (totalPapers >= i) {
      return i;
    }
  }

  return 0;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Because h-index cannot exceed total papers n, bucket citations into array of size n + 1 (capping values > n at n). Accumulate total papers from n down to 0, returning first i where totalPapers >= i.',
      whyOptimalIsPreferred: 'Linear O(N) runtime by bounding citations to n using counting sort buckets.',
      patternInvariant: 'H-index upper bound: researcher with n papers cannot have h-index > n; all values > n collapse to bucket n.'
    },
    defaultInputDescription: 'citations = [3, 0, 6, 1, 5]'
  },
  {
    id: 380,
    slug: 'insert-delete-getrandom-o1',
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Implement the RandomizedSet class: RandomizedSet() Initializes the RandomizedSet object. bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise. bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise. int getRandom() Returns a random element from the current set of elements (it\'s guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned. You must implement the functions of the class such that each function works in average O(1) time complexity.',
    examples: [
      {
        input: '["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"], [[], [1], [2], [2], [], [1], [2], []]',
        output: '[null, true, false, true, 2, true, false, 2]',
        explanation: 'RandomizedSet randomizedSet = new RandomizedSet(); randomizedSet.insert(1); // Returns true. randomizedSet.remove(2); // Returns false. randomizedSet.insert(2); // Returns true. randomizedSet.getRandom(); // Returns 1 or 2 randomly. randomizedSet.remove(1); // Returns true. randomizedSet.insert(2); // Returns false. randomizedSet.getRandom(); // Returns 2.'
      }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'At most 2 * 10^5 calls will be made to insert, remove, and getRandom.',
      'There will be at least one element in the data structure when getRandom is called.'
    ],
    bruteForce: {
      name: 'Standard Dynamic Array or Set',
      code: `class RandomizedSetBrute {
  private set = new Set<number>();
  insert(val: number): boolean {
    if (this.set.has(val)) return false;
    this.set.add(val); return true;
  }
  remove(val: number): boolean { return this.set.delete(val); }
  getRandom(): number {
    const arr = Array.from(this.set);
    return arr[Math.floor(Math.random() * arr.length)];
  }
}`,
      complexity: {
        time: 'getRandom: O(N), insert/remove: O(1)',
        space: 'O(N)'
      },
      explanation: 'Uses a Hash Set, but getRandom() converts set to array in O(N) time.'
    },
    optimal: {
      name: 'Dynamic Array + Hash Map Tail-Swap Elimination',
      code: `class RandomizedSet {
  private list: number[] = [];
  private map: Map<number, number> = new Map(); // val -> index in list

  insert(val: number): boolean {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.map.has(val)) return false;

    const idx = this.map.get(val)!;
    const lastVal = this.list[this.list.length - 1];

    // Swap target element with last element
    this.list[idx] = lastVal;
    this.map.set(lastVal, idx);

    // Pop tail
    this.list.pop();
    this.map.delete(val);

    return true;
  }

  getRandom(): number {
    const randomIdx = Math.floor(Math.random() * this.list.length);
    return this.list[randomIdx];
  }
}`,
      complexity: {
        time: 'O(1) average for all operations',
        space: 'O(N)'
      },
      explanation: 'Combine a dynamic Array (for O(1) random index access) and a Hash Map (val -> array index for O(1) search). When deleting val, swap it with the last element of the array and pop in O(1).',
      whyOptimalIsPreferred: 'Strictly satisfies O(1) average time complexity for insert, remove, and getRandom simultaneously.',
      patternInvariant: 'Array tail deletion: swapping target element with last element allows O(1) deletion without array shifting.'
    },
    defaultInputDescription: 'insert(1), remove(2), insert(2), getRandom(), remove(1), getRandom()'
  },
  {
    id: 238,
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]'
      },
      {
        input: 'nums = [-1,1,0,-3,3]',
        output: '[0,0,9,0,0]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'
    ],
    bruteForce: {
      name: 'Nested Pairwise Multiplication (O(N^2))',
      code: `function productExceptSelfBrute(nums: number[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    let prod = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) prod *= nums[j];
    }
    res.push(prod);
  }
  return res;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1) extra'
      },
      explanation: 'Computes product of all other elements using an inner loop for each index.'
    },
    optimal: {
      name: 'Prefix and Suffix Running Passes (O(1) Extra Space)',
      code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Pass 1: compute prefix products
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Pass 2: accumulate suffix product backward
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary (excluding output array)'
      },
      explanation: 'Store prefix products in result array in forward pass. In backward pass, multiply result[i] by running suffix product. Solves without division in O(1) auxiliary memory.',
      whyOptimalIsPreferred: 'Linear O(N) execution that avoids division entirely and requires no auxiliary prefix/suffix arrays.',
      patternInvariant: 'Array decomposition invariant: product except self is prefixProduct[i - 1] * suffixProduct[i + 1].'
    },
    defaultInputDescription: 'nums = [1, 2, 3, 4]'
  },
  {
    id: 134,
    slug: 'gas-station',
    title: 'Gas Station',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.',
    examples: [
      {
        input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
        output: '3',
        explanation: 'Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 4. Travel to station 4. Cost is 1. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Cost is 2. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Cost is 3. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Cost is 4. Your tank = 6 - 4 + 3 = 5. Travel to station 3. Cost is 5. Your gas is just enough to travel back to station 3.'
      },
      {
        input: 'gas = [2,3,4], cost = [3,4,3]',
        output: '-1'
      }
    ],
    constraints: [
      'n == gas.length == cost.length',
      '1 <= n <= 10^5',
      '0 <= gas[i], cost[i] <= 10^4'
    ],
    bruteForce: {
      name: 'Simulate Journey from Every Station (O(N^2))',
      code: `function canCompleteCircuitBrute(gas: number[], cost: number[]): number {
  const n = gas.length;
  for (let start = 0; start < n; start++) {
    let tank = 0, count = 0, i = start;
    while (count < n) {
      tank += gas[i] - cost[i];
      if (tank < 0) break;
      i = (i + 1) % n;
      count++;
    }
    if (count === n) return start;
  }
  return -1;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Simulates traversing the full circular route starting from each station.'
    },
    optimal: {
      name: 'Single-Pass Greedy Deficit Reset',
      code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    const net = gas[i] - cost[i];
    totalTank += net;
    currentTank += net;

    // If tank drops below 0, no station between startStation and i can be the start
    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }

  return totalTank >= 0 ? startStation : -1;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'If total gas < total cost, completion is mathematically impossible. If tank drops below 0 at station i, no station between startStation and i can reach i + 1; reset startStation to i + 1 in a single linear pass.',
      whyOptimalIsPreferred: 'Linear O(N) single-pass execution in O(1) space, proving uniqueness of the starting point.',
      patternInvariant: 'Cumulative deficit property: if path A to B fails at B, every station between A and B will also fail at or before B.'
    },
    defaultInputDescription: 'gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]'
  },
  {
    id: 135,
    slug: 'candy',
    title: 'Candy',
    difficulty: 'Hard',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to the following requirements: Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.',
    examples: [
      {
        input: 'ratings = [1,0,2]',
        output: '5',
        explanation: 'You can allocate to the first, second and third child with 2, 1, 2 candies respectively.'
      },
      {
        input: 'ratings = [1,2,2]',
        output: '4',
        explanation: 'You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.'
      }
    ],
    constraints: [
      'n == ratings.length',
      '1 <= n <= 2 * 10^4',
      '0 <= ratings[i] <= 2 * 10^4'
    ],
    bruteForce: {
      name: 'Iterative Relaxation Array Sweeps',
      code: `function candyBrute(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < n; i++) {
      if (i > 0 && ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
        candies[i] = candies[i - 1] + 1;
        changed = true;
      }
      if (i < n - 1 && ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
        candies[i] = candies[i + 1] + 1;
        changed = true;
      }
    }
  }
  return candies.reduce((a, b) => a + b, 0);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly sweeps across the array adjusting candies until no neighbor violates rating constraints.'
    },
    optimal: {
      name: 'Two-Pass Bidirectional Greedy Sweeps',
      code: `function candy(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // Pass 1: Left to right (satisfy left neighbor constraint)
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Pass 2: Right to left (satisfy right neighbor constraint)
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((sum, count) => sum + count, 0);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Decouple bidirectional neighbor constraints into two passes: left-to-right pass ensures higher rating than left gets more candies. Right-to-left pass ensures higher rating than right gets more, taking max(candies[i], candies[i + 1] + 1).',
      whyOptimalIsPreferred: 'Linear O(N) execution that resolves bidirectional constraints without multiple relaxation passes.',
      patternInvariant: 'Constraint decoupling: decompose simultaneous left-and-right neighbor dependencies into two monotonic independent sweeps.'
    },
    defaultInputDescription: 'ratings = [1, 0, 2]'
  },
  {
    id: 42,
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    bruteForce: {
      name: 'Prefix and Suffix Max Scans at Every Position',
      code: `function trapBrute(height: number[]): number {
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    let lMax = 0, rMax = 0;
    for (let l = 0; l <= i; l++) lMax = Math.max(lMax, height[l]);
    for (let r = i; r < height.length; r++) rMax = Math.max(rMax, height[r]);
    water += Math.min(lMax, rMax) - height[i];
  }
  return water;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'For each bar i, scans all bars to the left and right to find ceiling boundaries.'
    },
    optimal: {
      name: 'Converging Two Pointers with Bounding Wall Ceilings',
      code: `function trap(height: number[]): number {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trappedWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        trappedWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        trappedWater += rightMax - height[right];
      }
      right--;
    }
  }

  return trappedWater;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain left and right pointers with leftMax and rightMax. Water level is governed by the smaller boundary. Advance the pointer with the smaller height, accumulating trapped water directly in O(1) space.',
      whyOptimalIsPreferred: 'Linear O(N) execution that eliminates prefix/suffix arrays to run in strict O(1) extra space.',
      patternInvariant: 'Water ceiling invariant: water trapped at index i is strictly bounded by min(leftMax, rightMax) - height[i].'
    },
    defaultInputDescription: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]'
  },
  {
    id: 13,
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.',
    examples: [
      {
        input: 's = "III"',
        output: '3',
        explanation: 'III = 3.'
      },
      {
        input: 's = "LVIII"',
        output: '58',
        explanation: 'L = 50, V= 5, III = 3.'
      },
      {
        input: 's = "MCMXCIV"',
        output: '1994',
        explanation: 'M = 1000, CM = 900, XC = 90 and IV = 4.'
      }
    ],
    constraints: [
      '1 <= s.length <= 15',
      's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
    ],
    bruteForce: {
      name: 'Regex Subtractive Pair Replacement',
      code: `function romanToIntBrute(s: string): number {
  const map: Record<string, number> = {
    'IV': 4, 'IX': 9, 'XL': 40, 'XC': 90, 'CD': 400, 'CM': 900,
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  let total = 0;
  let i = 0;
  while (i < s.length) {
    if (i < s.length - 1 && map[s.substring(i, i + 2)]) {
      total += map[s.substring(i, i + 2)];
      i += 2;
    } else {
      total += map[s[i]];
      i++;
    }
  }
  return total;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Checks 2-character subtractive substrings before falling back to 1-character numeral lookups.'
    },
    optimal: {
      name: 'Single Forward Scan with Subtractive Lookahead',
      code: `function romanToInt(s: string): number {
  const values: Record<string, number> = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const currentVal = values[s[i]];
    const nextVal = values[s[i + 1]] || 0;

    if (currentVal < nextVal) {
      total -= currentVal; // Subtractive notation (e.g. IV: 5 - 1 = 4)
    } else {
      total += currentVal;
    }
  }

  return total;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Compare current symbol with next symbol: if current value < next value, subtract it; otherwise add it. Linear single pass in O(1) space.',
      whyOptimalIsPreferred: 'Direct arithmetic evaluation that avoids substring allocations or multi-character lookup tables.',
      patternInvariant: 'Roman subtractive rule: if value(s[i]) < value(s[i+1]), subtract; otherwise add.'
    },
    defaultInputDescription: 's = "MCMXCIV"'
  },
  {
    id: 12,
    slug: 'integer-to-roman',
    title: 'Integer to Roman',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Convert a given integer num to a roman numeral.',
    examples: [
      {
        input: 'num = 3749',
        output: '"MMMDCCXLIX"',
        explanation: '3000 = MMM, 700 = DCC, 40 = XL, 9 = IX. Total = MMMDCCXLIX.'
      },
      {
        input: 'num = 58',
        output: '"LVIII"',
        explanation: '50 = L, 8 = VIII.'
      },
      {
        input: 'num = 1994',
        output: '"MCMXCIV"',
        explanation: '1000 = M, 900 = CM, 90 = XC, 4 = IV.'
      }
    ],
    constraints: [
      '1 <= num <= 3999'
    ],
    bruteForce: {
      name: 'Digit-by-Digit Position Switch Cases',
      code: `function intToRomanBrute(num: number): string {
  const M = ['', 'M', 'MM', 'MMM'];
  const C = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const X = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const I = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  return (
    M[Math.floor(num / 1000)] +
    C[Math.floor((num % 1000) / 100)] +
    X[Math.floor((num % 100) / 10)] +
    I[num % 10]
  );
}`,
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      },
      explanation: 'Hardcodes lookup tables for thousands, hundreds, tens, and units place values.'
    },
    optimal: {
      name: 'Greedy Value-Symbol Table Subtraction',
      code: `function intToRoman(num: number): string {
  const table: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  let result = '';
  for (const [value, symbol] of table) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}`,
      complexity: {
        time: 'O(1) (fixed 13 denominations)',
        space: 'O(1)'
      },
      explanation: 'Iterate through standard Roman numeral values in descending order. Greedily subtract the largest possible denomination and append its symbol to the result.',
      whyOptimalIsPreferred: 'Compact, clean greedy design naturally handling subtractive values without large multi-dimensional lookup tables.',
      patternInvariant: 'Greedy base representation: always extract the largest available Roman denomination first.'
    },
    defaultInputDescription: 'num = 1994'
  },
  {
    id: 58,
    slug: 'length-of-last-word',
    title: 'Length of Last Word',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.',
    examples: [
      {
        input: 's = "Hello World"',
        output: '5',
        explanation: 'The last word is "World" with length 5.'
      },
      {
        input: 's = "   fly me   to   the moon  "',
        output: '4',
        explanation: 'The last word is "moon" with length 4.'
      },
      {
        input: 's = "luffy is still joyboy"',
        output: '6',
        explanation: 'The last word is "joyboy" with length 6.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of only English letters and spaces \' \'.',
      'There will be at least one word in s.'
    ],
    bruteForce: {
      name: 'Trim, Split, and Array Pop',
      code: `function lengthOfLastWordBrute(s: string): number {
  const words = s.trim().split(/\\s+/);
  return words[words.length - 1].length;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Trims trailing whitespace, splits on whitespace regex, and returns the length of the last word.'
    },
    optimal: {
      name: 'Backward Two-Phase Pointer Scan',
      code: `function lengthOfLastWord(s: string): number {
  let i = s.length - 1;
  let length = 0;

  // Phase 1: Skip trailing spaces
  while (i >= 0 && s[i] === ' ') {
    i--;
  }

  // Phase 2: Count non-space characters of last word
  while (i >= 0 && s[i] !== ' ') {
    length++;
    i--;
  }

  return length;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Scan backward from the end of string. Skip trailing whitespace, then count consecutive non-space characters until encountering whitespace or string start. Aborts as soon as the last word ends.',
      whyOptimalIsPreferred: 'Avoids tokenizing the entire string into arrays, operating in O(1) space with early termination.',
      patternInvariant: 'Backward scanning invariant: the last word is the first sequence of non-spaces encountered from the right.'
    },
    defaultInputDescription: 's = "   fly me   to   the moon  "'
  },
  {
    id: 14,
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"'
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: 'There is no common prefix among the input strings.'
      }
    ],
    constraints: [
      '1 <= strs.length <= 200',
      '0 <= strs[i].length <= 200',
      'strs[i] consists of only lowercase English letters.'
    ],
    bruteForce: {
      name: 'Horizontal Prefix Reductions',
      code: `function longestCommonPrefixBrute(strs: string[]): string {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}`,
      complexity: {
        time: 'O(S) where S is sum of characters',
        space: 'O(1)'
      },
      explanation: 'Iteratively shrinks prefix against each string in sequence.'
    },
    optimal: {
      name: 'Vertical Column Character Scanning',
      code: `function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';

  for (let c = 0; c < strs[0].length; c++) {
    const char = strs[0][c];
    for (let r = 1; r < strs.length; r++) {
      if (c >= strs[r].length || strs[r][c] !== char) {
        return strs[0].substring(0, c);
      }
    }
  }

  return strs[0];
}`,
      complexity: {
        time: 'O(S) worst case, O(m * N) average',
        space: 'O(1)'
      },
      explanation: 'Inspect column c across all strings. If any string is shorter than c or has a differing character, return strs[0][0..c] immediately.',
      whyOptimalIsPreferred: 'Vertical scanning fails fast as soon as the first mismatch column is encountered without inspecting subsequent characters.',
      patternInvariant: 'Vertical alignment: index c is part of the common prefix iff every string has length > c and strs[i][c] == strs[0][c].'
    },
    defaultInputDescription: 'strs = ["flower", "flow", "flight"]'
  },
  {
    id: 151,
    slug: 'reverse-words-in-a-string',
    title: 'Reverse Words in a String',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words.',
    examples: [
      {
        input: 's = "the sky is blue"',
        output: '"blue is sky the"'
      },
      {
        input: 's = "  hello world  "',
        output: '"world hello"',
        explanation: 'Your reversed string should not contain leading or trailing spaces.'
      },
      {
        input: 's = "a good   example"',
        output: '"example good a"',
        explanation: 'You need to reduce multiple spaces between two words to a single space in the reversed string.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's contains English letters (upper-case and lower-case), digits, and spaces \' \'.',
      'There is at least one word in s.'
    ],
    bruteForce: {
      name: 'Regex Split, Filter, Reverse, and Join',
      code: `function reverseWordsBrute(s: string): string {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Splits on regex whitespace, reverses the word array, and joins with spaces.'
    },
    optimal: {
      name: 'Backward Two-Pointer Word Slicing',
      code: `function reverseWords(s: string): string {
  let right = s.length - 1;
  const result: string[] = [];

  while (right >= 0) {
    // Skip trailing spaces
    while (right >= 0 && s[right] === ' ') {
      right--;
    }
    if (right < 0) break;

    // Find start of word
    let left = right;
    while (left >= 0 && s[left] !== ' ') {
      left--;
    }

    result.push(s.substring(left + 1, right + 1));
    right = left;
  }

  return result.join(' ');
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Use two pointers scanning from the back. Skip spaces, isolate word boundaries [left + 1, right], push word to result, and join with a single space.',
      whyOptimalIsPreferred: 'Linear O(N) execution that avoids regular expression engine overhead and multiple full-string duplicate allocations.',
      patternInvariant: 'Backward two-pointer boundary: right marks word end and left marks word start when reading in reverse.'
    },
    defaultInputDescription: 's = "the sky is blue"'
  },
  {
    id: 6,
    slug: 'zigzag-conversion',
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: P   A   H   N / A P L S I I G / Y   I   R. And then read line by line: "PAHNAPLSIIGYIR". Write the code that will take a string and make this conversion given a number of rows.',
    examples: [
      {
        input: 's = "PAYPALISHIRING", numRows = 3',
        output: '"PAHNAPLSIIGYIR"'
      },
      {
        input: 's = "PAYPALISHIRING", numRows = 4',
        output: '"PINALSIGYAHRPI"',
        explanation: 'P     I    N / A   L S  I G / Y A   H R / P     I'
      },
      {
        input: 's = "A", numRows = 1',
        output: '"A"'
      }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consists of English letters (lower-case and upper-case), \',\' and \'.\'.',
      '1 <= numRows <= 1000'
    ],
    bruteForce: {
      name: 'Full 2D Matrix Simulation',
      code: `function convertBrute(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s;
  const grid: string[][] = Array.from({ length: numRows }, () => new Array(s.length).fill(''));
  let r = 0, c = 0, goingDown = false;
  for (const ch of s) {
    grid[r][c] = ch;
    if (r === 0 || r === numRows - 1) goingDown = !goingDown;
    if (goingDown) r++;
    else { r--; c++; }
  }
  let res = '';
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < s.length; j++) if (grid[i][j]) res += grid[i][j];
  }
  return res;
}`,
      complexity: {
        time: 'O(numRows * N)',
        space: 'O(numRows * N)'
      },
      explanation: 'Allocates a full 2D matrix of size numRows * N and writes characters into diagonal coordinates.'
    },
    optimal: {
      name: 'Row-Bouncing String Buckets Accumulator',
      code: `function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows: string[] = new Array(numRows).fill('');
  let currentRow = 0;
  let goingDown = false;

  for (let i = 0; i < s.length; i++) {
    rows[currentRow] += s[i];
    // Reverse direction at top and bottom rows
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }
    currentRow += goingDown ? 1 : -1;
  }

  return rows.join('');
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Simulate the zigzag path by maintaining numRows string builders. A direction flag goingDown flips whenever currentRow reaches 0 or numRows - 1, distributing each character to its target row in O(1) time.',
      whyOptimalIsPreferred: 'Linear O(N) execution that avoids allocating empty 2D matrix cells.',
      patternInvariant: 'Bouncing index motion: pointer oscillates continuously between 0 and numRows - 1.'
    },
    defaultInputDescription: 's = "PAYPALISHIRING", numRows = 3'
  },
  {
    id: 28,
    slug: 'find-the-index-of-the-first-occurrence-in-a-string',
    title: 'Find the Index of the First Occurrence in a String',
    difficulty: 'Easy',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
    examples: [
      {
        input: 'haystack = "sadbutsad", needle = "sad"',
        output: '0',
        explanation: '"sad" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0.'
      },
      {
        input: 'haystack = "leetcode", needle = "leeto"',
        output: '-1',
        explanation: '"leeto" did not occur in "leetcode", so we return -1.'
      }
    ],
    constraints: [
      '1 <= haystack.length, needle.length <= 10^4',
      'haystack and needle consist of only lowercase English characters.'
    ],
    bruteForce: {
      name: 'Sliding Substring Comparison (O(N * M))',
      code: `function strStrBrute(haystack: string, needle: string): number {
  const m = needle.length;
  for (let i = 0; i <= haystack.length - m; i++) {
    if (haystack.substring(i, i + m) === needle) return i;
  }
  return -1;
}`,
      complexity: {
        time: 'O((N - M + 1) * M)',
        space: 'O(1)'
      },
      explanation: 'Tests every candidate substring of length M in haystack.'
    },
    optimal: {
      name: 'Knuth-Morris-Pratt (KMP) Prefix Function (O(N + M))',
      code: `function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (haystack.length < needle.length) return -1;

  // Step 1: Precompute KMP Longest Proper Prefix-Suffix (LPS) array
  const lps = new Array(needle.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < needle.length) {
    if (needle[i] === needle[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Step 2: KMP search
  let h = 0;
  let n = 0;
  while (h < haystack.length) {
    if (haystack[h] === needle[n]) {
      h++;
      n++;
      if (n === needle.length) {
        return h - n;
      }
    } else {
      if (n !== 0) {
        n = lps[n - 1];
      } else {
        h++;
      }
    }
  }

  return -1;
}`,
      complexity: {
        time: 'O(N + M)',
        space: 'O(M)'
      },
      explanation: 'Precompute the LPS table for needle in O(M). When a mismatch occurs, use the LPS table to skip redundant comparisons without ever backtracking the haystack pointer h, achieving linear O(N + M) worst-case performance.',
      whyOptimalIsPreferred: 'Linear time O(N + M) matching that never backtracks haystack pointer, avoiding worst-case O(N * M) performance.',
      patternInvariant: 'KMP prefix table invariant: when mismatch occurs, lps[n - 1] specifies the longest prefix that is already verified to match.'
    },
    defaultInputDescription: 'haystack = "sadbutsad", needle = "sad"'
  },
  {
    id: 68,
    slug: 'text-justification',
    title: 'Text Justification',
    difficulty: 'Hard',
    pattern: 'array-string',
    category: 'Array / String',
    statement: 'Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified. You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces \' \' when necessary so that each line has exactly maxWidth characters. Extra spaces should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly, more spaces should be assigned on the left than the right. For the last line, it should be left-justified, and no extra space is inserted between words.',
    examples: [
      {
        input: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16',
        output: '["This    is    an","example  of text","justification.  "]'
      },
      {
        input: 'words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16',
        output: '["What   must   be","acknowledgment  ","shall be        "]'
      }
    ],
    constraints: [
      '1 <= words.length <= 300',
      '1 <= words[i].length <= 20',
      'words[i] consists of only English letters and symbols.',
      '1 <= maxWidth <= 100',
      'words[i].length <= maxWidth'
    ],
    bruteForce: {
      name: 'Greedy String Accumulation with Split Formatting',
      code: `function fullJustifyBrute(words: string[], maxWidth: number): string[] {
  const lines: string[][] = [];
  let cur: string[] = [];
  let curLen = 0;
  for (const w of words) {
    if (curLen + w.length + cur.length > maxWidth) {
      lines.push(cur);
      cur = [w];
      curLen = w.length;
    } else {
      cur.push(w);
      curLen += w.length;
    }
  }
  if (cur.length > 0) lines.push(cur);
  return lines.map((lineWords, idx) => {
    if (idx === lines.length - 1 || lineWords.length === 1) {
      const s = lineWords.join(' ');
      return s + ' '.repeat(maxWidth - s.length);
    }
    const totalW = lineWords.reduce((a, b) => a + b.length, 0);
    const totalSp = maxWidth - totalW;
    const gaps = lineWords.length - 1;
    const base = Math.floor(totalSp / gaps);
    const extra = totalSp % gaps;
    let s = '';
    for (let i = 0; i < lineWords.length; i++) {
      s += lineWords[i];
      if (i < gaps) s += ' '.repeat(base + (i < extra ? 1 : 0));
    }
    return s;
  });
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Packs words into lines and formats spaces using modulo arithmetic.'
    },
    optimal: {
      name: 'Deterministic Typesetting Line Formatting',
      code: `function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < words.length) {
    let lineLength = words[i].length;
    let j = i + 1;

    // Pack as many words as fit on the current line
    while (j < words.length && lineLength + 1 + words[j].length <= maxWidth) {
      lineLength += 1 + words[j].length;
      j++;
    }

    const numWords = j - i;
    const isLastLine = (j === words.length);

    // If single word or last line: left-justify
    if (numWords === 1 || isLastLine) {
      let line = words.slice(i, j).join(' ');
      line += ' '.repeat(maxWidth - line.length);
      result.push(line);
    } else {
      // Fully justify: distribute extra spaces evenly
      const totalWordChars = words.slice(i, j).reduce((sum, w) => sum + w.length, 0);
      const totalSpaces = maxWidth - totalWordChars;
      const gaps = numWords - 1;
      const baseSpace = Math.floor(totalSpaces / gaps);
      const extraSpaces = totalSpaces % gaps;

      let line = '';
      for (let k = 0; k < gaps; k++) {
        line += words[i + k];
        const spacesToAdd = baseSpace + (k < extraSpaces ? 1 : 0);
        line += ' '.repeat(spacesToAdd);
      }
      line += words[i + gaps]; // Append final word in line
      result.push(line);
    }

    i = j;
  }

  return result;
}`,
      complexity: {
        time: 'O(total characters in words)',
        space: 'O(maxWidth) per line'
      },
      explanation: 'Two-pointer greedy line packer. For each line, determine words [i..j-1] that fit. If last line or single word, left-justify. Otherwise, distribute totalSpaces across gaps = numWords - 1, allocating baseSpace + (k < extraSpaces ? 1 : 0) spaces.',
      whyOptimalIsPreferred: 'Linear single-pass typesetting complying with all strict formatting and spacing distribution constraints.',
      patternInvariant: 'Space distribution formula: totalSpaces = maxWidth - charSum; gaps = count - 1; base = floor(totalSpaces / gaps); extra = totalSpaces % gaps.'
    },
    defaultInputDescription: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16'
  }
];
