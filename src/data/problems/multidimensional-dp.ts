import type { LeetCodeProblem } from '../../types/problem';

export const multidimensionalDpProblems: LeetCodeProblem[] = [
  {
    id: 120,
    slug: 'triangle',
    title: 'Triangle',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given a triangle array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.',
    examples: [
      {
        input: 'triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]',
        output: '11',
        explanation: 'The triangle path with the minimum sum is 2 + 3 + 5 + 1 = 11.'
      },
      {
        input: 'triangle = [[-10]]',
        output: '-10'
      }
    ],
    constraints: [
      '1 <= triangle.length <= 200',
      'triangle[0].length == 1',
      'triangle[i].length == triangle[i - 1].length + 1',
      '-10^4 <= triangle[i][j] <= 10^4'
    ],
    bruteForce: {
      name: 'Recursive Top-Down Branching (O(2^N))',
      code: `function minimumTotalBrute(triangle: number[][]): number {
  function dfs(r: number, c: number): number {
    if (r === triangle.length - 1) return triangle[r][c];
    return triangle[r][c] + Math.min(dfs(r + 1, c), dfs(r + 1, c + 1));
  }
  return dfs(0, 0);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N) recursion stack'
      },
      explanation: 'Branches down both paths for each cell, recalculating overlapping subproblems repeatedly.'
    },
    optimal: {
      name: 'Bottom-Up 1D In-Place DP Collapse',
      code: `function minimumTotal(triangle: number[][]): number {
  const n = triangle.length;
  // Initialize dp array with the bottom row values
  const dp = [...triangle[n - 1]];

  // Work upward row by row
  for (let r = n - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
    }
  }

  return dp[0];
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Start at the bottom row. Working upwards, each cell (r, c) aggregates triangle[r][c] + min(dp[c], dp[c + 1]). The top cell dp[0] contains the global minimum path sum.',
      whyOptimalIsPreferred: 'Bottom-up progression avoids path branching and collapses memory into a single 1D array of size N.',
      patternInvariant: 'Bottom-up triangle recurrence: dp[c] = triangle[r][c] + min(dp[c], dp[c + 1]) converges upward to the root.'
    },
    defaultInputDescription: 'triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]'
  },
  {
    id: 64,
    slug: 'minimum-path-sum',
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.',
    examples: [
      {
        input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]',
        output: '7',
        explanation: 'Because the path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.'
      },
      {
        input: 'grid = [[1,2,3],[4,5,6]]',
        output: '12'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 200',
      '0 <= grid[i][j] <= 200'
    ],
    bruteForce: {
      name: 'Exhaustive Directional DFS',
      code: `function minPathSumBrute(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  function dfs(r: number, c: number): number {
    if (r === m - 1 && c === n - 1) return grid[r][c];
    if (r >= m || c >= n) return Infinity;
    return grid[r][c] + Math.min(dfs(r + 1, c), dfs(r, c + 1));
  }
  return dfs(0, 0);
}`,
      complexity: {
        time: 'O(2^(M + N))',
        space: 'O(M + N)'
      },
      explanation: 'Branches right and down from every cell without memoization, exploring all 2^(M+N) combinations.'
    },
    optimal: {
      name: '1D Rolling Array Dynamic Programming',
      code: `function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;

  for (let r = 0; r < m; r++) {
    dp[0] += grid[r][0];
    for (let c = 1; c < n; c++) {
      dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
    }
  }

  return dp[n - 1];
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      },
      explanation: 'dp[c] stores the minimum path sum to reach the current row at column c. dp[c] before the update represents the top cell, while dp[c - 1] represents the left cell. Only a single 1D array of width n is maintained.',
      whyOptimalIsPreferred: 'Linear memory O(N) instead of full O(M*N) matrix allocation, running in optimal O(M*N) time.',
      patternInvariant: 'Grid recurrence: cell(r, c) depends strictly on top and left neighbors; row-wise compression reduces space to O(N).'
    },
    defaultInputDescription: 'grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]'
  },
  {
    id: 63,
    slug: 'unique-paths-ii',
    title: 'Unique Paths II',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle. Return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
    examples: [
      {
        input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]',
        output: '2',
        explanation: 'There is one obstacle in the middle of the 3x3 grid above. There are two ways to reach the bottom-right corner: 1. Right -> Right -> Down -> Down, 2. Down -> Down -> Right -> Right.'
      },
      {
        input: 'obstacleGrid = [[0,1],[0,0]]',
        output: '1'
      }
    ],
    constraints: [
      'm == obstacleGrid.length',
      'n == obstacleGrid[i].length',
      '1 <= m, n <= 100',
      'obstacleGrid[i][j] is 0 or 1.'
    ],
    bruteForce: {
      name: 'DFS Path Enumeration with Obstacle Avoidance',
      code: `function uniquePathsWithObstaclesBrute(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  function dfs(r: number, c: number): number {
    if (r >= m || c >= n || grid[r][c] === 1) return 0;
    if (r === m - 1 && c === n - 1) return 1;
    return dfs(r + 1, c) + dfs(r, c + 1);
  }
  return dfs(0, 0);
}`,
      complexity: {
        time: 'O(2^(M + N))',
        space: 'O(M + N)'
      },
      explanation: 'Recursively explores paths down and right, stopping at obstacles or grid edges.'
    },
    optimal: {
      name: '1D Rolling DP Array with Zeroed Obstacle Cells',
      code: `function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) {
        dp[c] = 0; // Obstacle allows zero paths through this cell
      } else if (c > 0) {
        dp[c] += dp[c - 1];
      }
    }
  }

  return dp[n - 1];
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      },
      explanation: 'Maintain a 1D DP array of size n. When encountering an obstacle cell, set dp[c] = 0. Otherwise, add paths from the left cell: dp[c] += dp[c - 1].',
      whyOptimalIsPreferred: 'Linear memory O(N) with optimal O(M*N) time, zeroing obstacle cells in-place.',
      patternInvariant: 'Path aggregation: paths(r, c) = (grid[r][c] === 1 ? 0 : paths(r - 1, c) + paths(r, c - 1)).'
    },
    defaultInputDescription: 'obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]'
  },
  {
    id: 5,
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      {
        input: 's = "cbbd"',
        output: '"bb"'
      }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.'
    ],
    bruteForce: {
      name: 'All Substrings Palindrome Test',
      code: `function longestPalindromeBrute(s: string): string {
  const isPal = (str: string) => {
    let l = 0, r = str.length - 1;
    while (l < r) { if (str[l++] !== str[r--]) return false; }
    return true;
  };
  let best = '';
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sub = s.substring(i, j + 1);
      if (sub.length > best.length && isPal(sub)) best = sub;
    }
  }
  return best;
}`,
      complexity: {
        time: 'O(N^3)',
        space: 'O(1)'
      },
      explanation: 'Iterates over all O(N^2) substrings and tests palindrome symmetry in O(N).'
    },
    optimal: {
      name: 'Expand Around Centers (Constant Space)',
      code: `function longestPalindrome(s: string): string {
  if (s.length <= 1) return s;

  let start = 0;
  let maxLen = 1;

  function expand(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLen = right - left + 1;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd-length palindromes (center at char i)
    expand(i, i + 1); // Even-length palindromes (center between i and i+1)
  }

  return s.substring(start, start + maxLen);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Every palindrome has either a single-character center (odd length) or a two-character center (even length). There are exactly 2N - 1 centers. Expand outward symmetrically from each center in O(1) space.',
      whyOptimalIsPreferred: 'Provides optimal O(N^2) runtime while reducing auxiliary space from O(N^2) (for DP matrix) to strictly O(1).',
      patternInvariant: 'Palindromic center expansion: s[i..j] is a palindrome iff s[i+1..j-1] is a palindrome and s[i] == s[j].'
    },
    defaultInputDescription: 's = "babad"'
  },
  {
    id: 97,
    slug: 'interleaving-string',
    title: 'Interleaving String',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2. An interleaving of two strings s and t is a configuration where they are divided into non-empty substrings such that s = s1 + s2 + ... + sn, t = t1 + t2 + ... + tm, and |n - m| <= 1.',
    examples: [
      {
        input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"',
        output: 'true'
      },
      {
        input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
        output: 'false'
      },
      {
        input: 's1 = "", s2 = "", s3 = ""',
        output: 'true'
      }
    ],
    constraints: [
      '0 <= s1.length, s2.length <= 100',
      '0 <= s3.length <= 200',
      's1, s2, and s3 consist of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Dual Pointer Recursive Branching',
      code: `function isInterleaveBrute(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;
  function check(i: number, j: number, k: number): boolean {
    if (k === s3.length) return true;
    let valid = false;
    if (i < s1.length && s1[i] === s3[k]) valid = valid || check(i + 1, j, k + 1);
    if (j < s2.length && s2[j] === s3[k]) valid = valid || check(i, j + 1, k + 1);
    return valid;
  }
  return check(0, 0, 0);
}`,
      complexity: {
        time: 'O(2^(N + M))',
        space: 'O(N + M)'
      },
      explanation: 'Branches recursively whenever both s1 and s2 characters match s3 without memoizing overlapping index states.'
    },
    optimal: {
      name: '1D Rolling Boolean Dynamic Programming',
      code: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;

  const dp = new Array(s2.length + 1).fill(false);
  dp[0] = true;

  // Initialize with s2 prefix
  for (let j = 1; j <= s2.length; j++) {
    dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= s1.length; i++) {
    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= s2.length; j++) {
      const matchS1 = dp[j] && s1[i - 1] === s3[i + j - 1];
      const matchS2 = dp[j - 1] && s2[j - 1] === s3[i + j - 1];
      dp[j] = matchS1 || matchS2;
    }
  }

  return dp[s2.length];
}`,
      complexity: {
        time: 'O(N * M)',
        space: 'O(M)'
      },
      explanation: 'dp[j] represents whether s1[0..i] and s2[0..j] can interleave to form s3[0..i+j]. Check transitions from top (using s1) and left (using s2). Compress into a single 1D rolling array of size s2.length + 1.',
      whyOptimalIsPreferred: 'Linear space O(M) and polynomial O(N*M) runtime avoiding exponential 2^(N+M) recursion overhead.',
      patternInvariant: '2D sequence interleaving: state (i, j) valid if (i-1, j) matched s1[i-1] or (i, j-1) matched s2[j-1].'
    },
    defaultInputDescription: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"'
  },
  {
    id: 72,
    slug: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.',
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: '3',
        explanation: 'horse -> rorse (replace \'h\' with \'r\'), rorse -> rose (remove \'r\'), rose -> ros (remove \'e\').'
      },
      {
        input: 'word1 = "intention", word2 = "execution"',
        output: '5'
      }
    ],
    constraints: [
      '0 <= word1.length, word2.length <= 500',
      'word1 and word2 consist of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Levenshtein Unmemoized Recursion',
      code: `function minDistanceBrute(w1: string, w2: string): number {
  function dfs(i: number, j: number): number {
    if (i === 0) return j;
    if (j === 0) return i;
    if (w1[i - 1] === w2[j - 1]) return dfs(i - 1, j - 1);
    return 1 + Math.min(
      dfs(i - 1, j),     // Delete
      dfs(i, j - 1),     // Insert
      dfs(i - 1, j - 1)  // Replace
    );
  }
  return dfs(w1.length, w2.length);
}`,
      complexity: {
        time: 'O(3^(N + M))',
        space: 'O(N + M)'
      },
      explanation: 'Branches into 3 recursive choices (insert, delete, replace) on mismatch, producing an exponential call tree.'
    },
    optimal: {
      name: 'Levenshtein Distance 1D Rolling DP Array',
      code: `function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  let dp = new Array(n + 1).fill(0).map((_, idx) => idx);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(0);
    nextDp[0] = i;

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        nextDp[j] = dp[j - 1];
      } else {
        nextDp[j] = 1 + Math.min(
          dp[j],       // Deletion from word1
          nextDp[j - 1], // Insertion into word1
          dp[j - 1]    // Replacement
        );
      }
    }
    dp = nextDp;
  }

  return dp[n];
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      },
      explanation: 'Levenshtein DP: if characters match, cost is dp[i-1][j-1]. If they mismatch, cost is 1 + min(delete: dp[i-1][j], insert: dp[i][j-1], replace: dp[i-1][j-1]). Compress rows into O(N) space.',
      whyOptimalIsPreferred: 'Transforms exponential O(3^(M+N)) branching into quadratic O(M*N) time with O(N) memory.',
      patternInvariant: 'Edit distance recurrence: 1 + min(insert, delete, replace) captures all three string mutations.'
    },
    defaultInputDescription: 'word1 = "horse", word2 = "ros"'
  },
  {
    id: 123,
    slug: 'best-time-to-buy-and-sell-stock-iii',
    title: 'Best Time to Buy and Sell Stock III',
    difficulty: 'Hard',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete at most two transactions. Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).',
    examples: [
      {
        input: 'prices = [3,3,5,0,0,3,1,4]',
        output: '6',
        explanation: 'Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3 - 0 = 3. Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4 - 1 = 3.'
      },
      {
        input: 'prices = [1,2,3,4,5]',
        output: '4',
        explanation: 'Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5 - 1 = 4.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^5'
    ],
    bruteForce: {
      name: 'Partition Day Splitting Scan (O(N^2))',
      code: `function maxProfitIIIBrute(prices: number[]): number {
  function oneTx(l: number, r: number): number {
    let minP = Infinity, maxP = 0;
    for (let i = l; i <= r; i++) {
      minP = Math.min(minP, prices[i]);
      maxP = Math.max(maxP, prices[i] - minP);
    }
    return maxP;
  }
  let maxP = oneTx(0, prices.length - 1);
  for (let split = 1; split < prices.length - 1; split++) {
    maxP = Math.max(maxP, oneTx(0, split) + oneTx(split + 1, prices.length - 1));
  }
  return maxP;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Tests every potential split day between transaction 1 and transaction 2 in quadratic time.'
    },
    optimal: {
      name: '4-State Dynamic Programming Machine',
      code: `function maxProfit(prices: number[]): number {
  let buy1 = -Infinity;
  let sell1 = 0;
  let buy2 = -Infinity;
  let sell2 = 0;

  for (const price of prices) {
    buy1 = Math.max(buy1, -price);
    sell1 = Math.max(sell1, buy1 + price);
    buy2 = Math.max(buy2, sell1 - price);
    sell2 = Math.max(sell2, buy2 + price);
  }

  return sell2;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain 4 variables tracking maximum balance after: 1) buying 1st stock, 2) selling 1st stock, 3) buying 2nd stock (reinvesting sell1 profit), and 4) selling 2nd stock. Update each day in O(1) space.',
      whyOptimalIsPreferred: 'Linear O(N) single-pass execution in O(1) space, avoiding quadratic split evaluations.',
      patternInvariant: 'State machine capital chain: sell2 depends on buy2 which reinvests sell1 which depends on buy1.'
    },
    defaultInputDescription: 'prices = [3, 3, 5, 0, 0, 3, 1, 4]'
  },
  {
    id: 188,
    slug: 'best-time-to-buy-and-sell-stock-iv',
    title: 'Best Time to Buy and Sell Stock IV',
    difficulty: 'Hard',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k. Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times. Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).',
    examples: [
      {
        input: 'k = 2, prices = [2,4,1]',
        output: '2',
        explanation: 'Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4 - 2 = 2.'
      },
      {
        input: 'k = 2, prices = [3,2,6,5,0,3]',
        output: '7',
        explanation: 'Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6 - 2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3 - 0 = 3.'
      }
    ],
    constraints: [
      '1 <= k <= 100',
      '1 <= prices.length <= 1000',
      '0 <= prices[i] <= 1000'
    ],
    bruteForce: {
      name: 'Unconstrained Recursion with Transaction Counter',
      code: `function maxProfitIVBrute(k: number, prices: number[]): number {
  function dfs(day: number, txLeft: number, holding: boolean): number {
    if (day >= prices.length || txLeft === 0) return 0;
    const skip = dfs(day + 1, txLeft, holding);
    if (holding) {
      const sell = prices[day] + dfs(day + 1, txLeft - 1, false);
      return Math.max(skip, sell);
    } else {
      const buy = -prices[day] + dfs(day + 1, txLeft, true);
      return Math.max(skip, buy);
    }
  }
  return dfs(0, k, false);
}`,
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      },
      explanation: 'Branches on buy/sell/skip at every day with remaining transaction counters.'
    },
    optimal: {
      name: 'K-Transaction Array State Machine DP',
      code: `function maxProfit(k: number, prices: number[]): number {
  const n = prices.length;
  if (n <= 1 || k === 0) return 0;

  // Optimization: If k >= n / 2, equivalent to unlimited transactions
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }

  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (const price of prices) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - price);
      sell[j] = Math.max(sell[j], buy[j] + price);
    }
  }

  return sell[k];
}`,
      complexity: {
        time: 'O(k * N)',
        space: 'O(k)'
      },
      explanation: 'Maintain two arrays buy[j] and sell[j] for j in 1..k. buy[j] = max(buy[j], sell[j - 1] - price) records maximum profit when buying the j-th stock. sell[j] = max(sell[j], buy[j] + price) records selling the j-th stock.',
      whyOptimalIsPreferred: 'Generalizes stock trading state transitions to k slots, running in O(k * N) time with O(k) memory.',
      patternInvariant: 'Generalized multi-stage state transition: sell[j] chains from buy[j] which chains from sell[j - 1].'
    },
    defaultInputDescription: 'k = 2, prices = [3, 2, 6, 5, 0, 3]'
  },
  {
    id: 221,
    slug: 'maximal-square',
    title: 'Maximal Square',
    difficulty: 'Medium',
    pattern: 'multidimensional-dp',
    category: 'Multidimensional DP',
    statement: 'Given an m x n binary matrix filled with 0\'s and 1\'s, find the largest square containing only 1\'s and return its area.',
    examples: [
      {
        input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]',
        output: '4'
      },
      {
        input: 'matrix = [["0","1"],["1","0"]]',
        output: '1'
      },
      {
        input: 'matrix = [["0"]]',
        output: '0'
      }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 300',
      'matrix[i][j] is \'0\' or \'1\'.'
    ],
    bruteForce: {
      name: 'Check Every Square by Expanding Size',
      code: `function maximalSquareBrute(matrix: string[][]): number {
  const m = matrix.length, n = matrix[0].length;
  let maxSide = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === '1') {
        let side = 1;
        let valid = true;
        while (r + side < m && c + side < n && valid) {
          for (let k = 0; k <= side; k++) {
            if (matrix[r + side][c + k] !== '1' || matrix[r + k][c + side] !== '1') {
              valid = false;
              break;
            }
          }
          if (valid) side++;
        }
        maxSide = Math.max(maxSide, side);
      }
    }
  }
  return maxSide * maxSide;
}`,
      complexity: {
        time: 'O(M * N * min(M, N)^2)',
        space: 'O(1)'
      },
      explanation: 'At each cell with \'1\', iteratively expands square bounds checking all border elements for \'1\'.'
    },
    optimal: {
      name: '2D DP Matrix Corner Minimum',
      code: `function maximalSquare(matrix: string[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  let maxSide = 0;

  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (matrix[r - 1][c - 1] === '1') {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        maxSide = Math.max(maxSide, dp[r][c]);
      }
    }
  }

  return maxSide * maxSide;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N)'
      },
      explanation: 'dp[r][c] represents the max square side length with bottom-right corner at (r-1, c-1). A square can only expand if top, left, and top-left diagonal squares are valid: dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]). Return maxSide * maxSide.',
      whyOptimalIsPreferred: 'Linear in matrix size O(M*N), reducing complexity from O(M*N*min(M,N)^2) via 3-neighbor overlapping subproblem reuse.',
      patternInvariant: 'Square expansion invariant: size of largest square ending at (r, c) is limited by the minimum of its top, left, and diagonal neighbors.'
    },
    defaultInputDescription: 'matrix = 4x5 binary matrix'
  }
];
