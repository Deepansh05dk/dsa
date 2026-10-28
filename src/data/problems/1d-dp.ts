import type { LeetCodeProblem } from '../../types/problem';

export const oneDDpProblems: LeetCodeProblem[] = [
  {
    id: 70,
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    pattern: '1d-dp',
    category: '1D DP',
    statement: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1 step + 1 step, or 2 steps.'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: '1 step + 1 step + 1 step, 1 step + 2 steps, or 2 steps + 1 step.'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    bruteForce: {
      name: 'Naive Recursion (Branching 2^N)',
      code: `function climbStairsBrute(n: number): number {
  if (n <= 1) return 1;
  return climbStairsBrute(n - 1) + climbStairsBrute(n - 2);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N) recursion stack'
      },
      explanation: 'Branch recursively for 1 step and 2 steps without memoization, leading to exponential recalculation of overlapping states.'
    },
    optimal: {
      name: 'Constant-Space Bottom-Up DP',
      code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Base cases: 1 way for 1 step, 2 ways for 2 steps. For any step i, ways = ways(i-1) + ways(i-2). Only two previous states need to be preserved.',
      whyOptimalIsPreferred: 'Transforms exponential O(2^N) execution into O(N) time with O(1) memory, preventing stack overflow.',
      patternInvariant: 'Optimal substructure with overlapping subproblems: Fibonacci-like state transitions only require remembering the last 2 states.'
    },
    defaultInputDescription: 'n = 5'
  },
  {
    id: 198,
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    pattern: '1d-dp',
    category: '1D DP',
    statement: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '4',
        explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.'
      },
      {
        input: 'nums = [2,7,9,3,1]',
        output: '12',
        explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 400'
    ],
    bruteForce: {
      name: 'Exponential Subsets Search (O(2^N))',
      code: `function robBrute(nums: number[]): number {
  function helper(idx: number): number {
    if (idx >= nums.length) return 0;
    const robCurrent = nums[idx] + helper(idx + 2);
    const skipCurrent = helper(idx + 1);
    return Math.max(robCurrent, skipCurrent);
  }
  return helper(0);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N) recursion stack'
      },
      explanation: 'Branches recursively to rob or skip each house without caching computed subproblem answers.'
    },
    optimal: {
      name: 'Two-Variable Rolling DP State Optimization',
      code: `function rob(nums: number[]): number {
  let rob1 = 0; // Max profit up to house i - 2
  let rob2 = 0; // Max profit up to house i - 1

  for (const n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }

  return rob2;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'At each house n, decide between robbing house n + rob1 (max from 2 houses back) or skipping it and keeping rob2 (max from 1 house back). Track states using two rolling variables.',
      whyOptimalIsPreferred: 'Linear O(N) execution that eliminates exponential branching while reducing memory to O(1) space.',
      patternInvariant: 'State transition decision: max(rob(i - 1), rob(i - 2) + nums[i]); only the last two optimal outcomes are needed.'
    },
    defaultInputDescription: 'nums = [2, 7, 9, 3, 1]'
  },
  {
    id: 139,
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    pattern: '1d-dp',
    category: '1D DP',
    statement: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.',
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: 'true',
        explanation: 'Return true because "leetcode" can be segmented as "leet code".'
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: 'true',
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.'
      },
      {
        input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 300',
      '1 <= wordDict.length <= 1000',
      '1 <= wordDict[i].length <= 20',
      's and wordDict[i] consist of only lowercase English letters.',
      'All the strings of wordDict are unique.'
    ],
    bruteForce: {
      name: 'Recursive String Prefix Slicing',
      code: `function wordBreakBrute(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  function check(str: string): boolean {
    if (str.length === 0) return true;
    for (let i = 1; i <= str.length; i++) {
      if (dict.has(str.substring(0, i)) && check(str.substring(i))) {
        return true;
      }
    }
    return false;
  }
  return check(s);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly slices prefixes matching dictionary words and recurses on remainder, leading to redundant work.'
    },
    optimal: {
      name: '1D Prefix Feasibility DP Table',
      code: `function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set<string>(wordDict);
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string is always segmentable

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}`,
      complexity: {
        time: 'O(N^2 * L)',
        space: 'O(N + totalDictSize)'
      },
      explanation: 'dp[i] denotes whether s[0..i] is segmentable. For each position i, check all previous valid cut points j where dp[j] is true; if substring s[j..i] is in wordSet, mark dp[i] = true and break.',
      whyOptimalIsPreferred: 'Polynomial O(N^2) dynamic programming with memoized boundary states avoids exponential 2^N recursion trees.',
      patternInvariant: 'Prefix decomposition invariant: s[0..i] is valid if there exists j < i such that s[0..j] is valid and s[j..i] is in the dictionary.'
    },
    defaultInputDescription: 's = "leetcode", wordDict = ["leet", "code"]'
  },
  {
    id: 322,
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    pattern: '1d-dp',
    category: '1D DP',
    statement: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    bruteForce: {
      name: 'Unmemoized Recursive Tree Search',
      code: `function coinChangeBrute(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  if (amount < 0) return -1;
  let minCoins = Infinity;
  for (const c of coins) {
    const res = coinChangeBrute(coins, amount - c);
    if (res >= 0) minCoins = Math.min(minCoins, res + 1);
  }
  return minCoins === Infinity ? -1 : minCoins;
}`,
      complexity: {
        time: 'O(C^amount)',
        space: 'O(amount)'
      },
      explanation: 'Branches on all coins at every step, creating an exponential depth tree.'
    },
    optimal: {
      name: 'Bottom-Up 1D Knapsack DP Table',
      code: `function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}`,
      complexity: {
        time: 'O(amount * coins.length)',
        space: 'O(amount)'
      },
      explanation: 'dp[i] records minimum coins to form amount i. Fill table iteratively from 1 to amount: for each coin, dp[i] = min(dp[i], dp[i - coin] + 1). If dp[amount] remains above amount, return -1.',
      whyOptimalIsPreferred: 'Transforms an exponential search into an O(amount * |coins|) pseudo-polynomial bottom-up table pass.',
      patternInvariant: 'Unbounded knapsack recurrence: dp[i] = min_{c in coins}(dp[i - c] + 1).'
    },
    defaultInputDescription: 'coins = [1, 2, 5], amount = 11'
  },
  {
    id: 300,
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    pattern: '1d-dp',
    category: '1D DP',
    statement: 'Given an integer array nums, return the length of the longest strictly increasing subsequence. Can you come up with an algorithm that runs in O(n log(n)) time complexity?',
    examples: [
      {
        input: 'nums = [10,9,2,5,3,7,101,18]',
        output: '4',
        explanation: 'The longest increasing subsequence is [2,3,7,101], therefore the length is 4.'
      },
      {
        input: 'nums = [0,1,0,3,2,3]',
        output: '4'
      },
      {
        input: 'nums = [7,7,7,7,7,7,7]',
        output: '1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    bruteForce: {
      name: 'Quadratic DP Table (O(N^2))',
      code: `function lengthOfLISBrute(nums: number[]): number {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Nested loops comparing each element with all preceding elements to build dp[i].'
    },
    optimal: {
      name: 'Patience Sorting with Binary Search (O(N log N))',
      code: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const x of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(x);
    } else {
      tails[left] = x;
    }
  }

  return tails.length;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      },
      explanation: 'tails[len] stores the smallest tail value among all increasing subsequences of length len + 1. For each number, use binary search to find its insertion or replacement point in tails. The length of tails is the max LIS.',
      whyOptimalIsPreferred: 'Reduces time from quadratic O(N^2) to optimal O(N log N) using patience sorting and binary search.',
      patternInvariant: 'Patience sorting invariant: maintaining minimal tail values greedily maximizes future subsequence extension opportunities.'
    },
    defaultInputDescription: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]'
  }
];
