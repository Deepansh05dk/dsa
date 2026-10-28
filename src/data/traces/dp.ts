import type { VisualizerStep } from '../../types/visualizer';

export const DP_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 70: Climbing Stairs (1D DP)
  70: [
    {
      stepIndex: 0,
      title: 'Initialize Base Cases: dp[1] = 1, dp[2] = 2',
      description: 'To reach step 1, there is 1 way. To reach step 2, there are 2 ways (1+1 or 2). Goal is n = 5.',
      codeLineHighlight: 2,
      variables: { n: 5, 'dp[1]': 1, 'dp[2]': 2 },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, '-', '-', '-'],
        activeCell: 1,
        formula: 'dp[i] = dp[i-1] + dp[i-2]',
      },
    },
    {
      stepIndex: 1,
      title: 'Compute Step 3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3',
      description: 'Ways to reach step 3 is the sum of ways to reach step 2 and step 1.',
      codeLineHighlight: 4,
      variables: { i: 3, 'dp[3]': 3 },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, '-', '-'],
        activeCell: 2,
        formula: 'dp[3] = dp[2] (2) + dp[1] (1) = 3',
      },
    },
    {
      stepIndex: 2,
      title: 'Compute Step 4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5',
      description: 'Ways to reach step 4 is sum of ways to reach step 3 and step 2.',
      codeLineHighlight: 4,
      variables: { i: 4, 'dp[4]': 5 },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, 5, '-'],
        activeCell: 3,
        formula: 'dp[4] = dp[3] (3) + dp[2] (2) = 5',
      },
    },
    {
      stepIndex: 3,
      title: 'Compute Step 5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8',
      description: 'Final step reached: total distinct ways to climb 5 steps is 8. Time: O(N), Space: O(1) rolling registers.',
      codeLineHighlight: 5,
      variables: { result: 8, timeComplexity: 'O(N)' },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, 5, 8],
        activeCell: 4,
        formula: 'dp[5] = dp[4] (5) + dp[3] (3) = 8',
      },
    },
  ],

  // Problem 198: House Robber
  198: [
    {
      stepIndex: 0,
      title: 'Initialize DP Table for Houses: [2, 7, 9, 3, 1]',
      description: 'dp[0] = nums[0] = 2. dp[1] = max(nums[0], nums[1]) = max(2, 7) = 7.',
      codeLineHighlight: 3,
      variables: { 'dp[0]': 2, 'dp[1]': 7 },
      dpTableState: {
        dimensions: '1D',
        values: [2, 7, '-', '-', '-'],
        activeCell: 1,
        formula: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
      },
    },
    {
      stepIndex: 1,
      title: 'Evaluate House 2 (val: 9): max(7, 2 + 9) = 11',
      description: 'Rob house 2 + house 0 (2 + 9 = 11) > rob house 1 (7). Store dp[2] = 11.',
      codeLineHighlight: 5,
      variables: { i: 2, robHouse2: 11, skipHouse2: 7, maxProfit: 11 },
      dpTableState: {
        dimensions: '1D',
        values: [2, 7, 11, '-', '-'],
        activeCell: 2,
        formula: 'dp[2] = max(dp[1]=7, dp[0]+nums[2]=2+9=11) = 11',
      },
    },
    {
      stepIndex: 2,
      title: 'Evaluate House 3 (val: 3): max(11, 7 + 3) = 11',
      description: 'Skipping house 3 gives 11, robbing house 3 gives 7 + 3 = 10. Better to skip: dp[3] = 11.',
      codeLineHighlight: 5,
      variables: { i: 3, robHouse3: 10, skipHouse3: 11, maxProfit: 11 },
      dpTableState: {
        dimensions: '1D',
        values: [2, 7, 11, 11, '-'],
        activeCell: 3,
        formula: 'dp[3] = max(dp[2]=11, dp[1]+nums[3]=7+3=10) = 11',
      },
    },
    {
      stepIndex: 3,
      title: 'Evaluate House 4 (val: 1): max(11, 11 + 1) = 12',
      description: 'Rob house 4 + dp[2] (11 + 1 = 12) > dp[3] (11). Final max amount robbed is 12.',
      codeLineHighlight: 7,
      variables: { result: 12, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
      dpTableState: {
        dimensions: '1D',
        values: [2, 7, 11, 11, 12],
        activeCell: 4,
        formula: 'dp[4] = max(dp[3]=11, dp[2]+nums[4]=11+1=12) = 12',
      },
    },
  ],

  // Problem 322: Coin Change
  322: [
    {
      stepIndex: 0,
      title: 'Initialize DP Array for amount = 11, coins = [1, 2, 5]',
      description: 'dp[0] = 0 (0 coins for amount 0). All other dp[1..11] initialized to infinity (12).',
      codeLineHighlight: 2,
      variables: { targetAmount: 11, coins: '[1, 2, 5]' },
      dpTableState: {
        dimensions: '1D',
        values: [0, '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞'],
        activeCell: 0,
        formula: 'dp[a] = min(dp[a], 1 + dp[a - coin])',
      },
    },
    {
      stepIndex: 1,
      title: 'Fill Small Amounts 1 to 5',
      description: 'dp[1]=1 (coin 1), dp[2]=1 (coin 2), dp[3]=2 (1+2), dp[4]=2 (2+2), dp[5]=1 (coin 5).',
      codeLineHighlight: 5,
      variables: { 'dp[5]': 1, bestCoin: 5 },
      dpTableState: {
        dimensions: '1D',
        values: [0, 1, 1, 2, 2, 1, '∞', '∞', '∞', '∞', '∞', '∞'],
        activeCell: 5,
        formula: 'dp[5] = min(dp[5-1]+1, dp[5-2]+1, dp[5-5]+1) = 1',
      },
    },
    {
      stepIndex: 2,
      title: 'Compute dp[10] = 1 + dp[10 - 5] = 1 + 1 = 2 Coins',
      description: 'Two 5-cent coins produce amount 10. dp[10] = 2.',
      codeLineHighlight: 5,
      variables: { 'dp[10]': 2 },
      dpTableState: {
        dimensions: '1D',
        values: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, '∞'],
        activeCell: 10,
        formula: 'dp[10] = 1 + dp[10 - 5] = 1 + 1 = 2',
      },
    },
    {
      stepIndex: 3,
      title: 'Compute dp[11] = 1 + dp[11 - 5] = 1 + dp[6] = 1 + 2 = 3 Coins',
      description: 'Optimal solution for amount 11: two 5s and one 1 (5 + 5 + 1 = 11). Minimum coins = 3.',
      codeLineHighlight: 8,
      variables: { minCoins: 3, combination: '[5, 5, 1]', timeComplexity: 'O(amount * len(coins))' },
      dpTableState: {
        dimensions: '1D',
        values: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
        activeCell: 11,
        formula: 'dp[11] = 1 + dp[11 - 5] = 1 + 2 = 3',
      },
    },
  ],

  // Problem 64: Minimum Path Sum (2D DP)
  64: [
    {
      stepIndex: 0,
      title: 'Initialize 2D DP Table for 3x3 Grid: [[1,3,1],[1,5,1],[4,2,1]]',
      description: 'Base case: dp[0][0] = grid[0][0] = 1. Top row and left column accumulate cumulative sums.',
      codeLineHighlight: 2,
      variables: { 'dp[0][0]': 1 },
      dpTableState: {
        dimensions: '2D',
        values: [
          [1, '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
        ],
        activeCell: [0, 0],
        formula: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])',
      },
    },
    {
      stepIndex: 1,
      title: 'Initialize Boundaries: First Row & First Column',
      description: 'Row 0: [1, 1+3=4, 4+1=5]. Col 0: [1, 1+1=2, 2+4=6].',
      codeLineHighlight: 4,
      variables: { row0: '[1, 4, 5]', col0: '[1, 2, 6]' },
      dpTableState: {
        dimensions: '2D',
        values: [
          [1, 4, 5],
          [2, '-', '-'],
          [6, '-', '-'],
        ],
        activeCell: [0, 2],
        formula: 'dp[0][j] = dp[0][j-1] + grid[0][j]',
      },
    },
    {
      stepIndex: 2,
      title: 'Compute Interior Cell (1, 1): grid[1][1]=5 + min(dp[0][1]=4, dp[1][0]=2) = 7',
      description: 'Coming from top costs 4, coming from left costs 2. Left is cheaper: 5 + 2 = 7.',
      codeLineHighlight: 6,
      variables: { r: 1, c: 1, fromTop: 4, fromLeft: 2, 'dp[1][1]': 7 },
      dpTableState: {
        dimensions: '2D',
        values: [
          [1, 4, 5],
          [2, 7, 6],
          [6, 8, '-'],
        ],
        activeCell: [1, 1],
        formula: 'dp[1][1] = 5 + min(4, 2) = 7',
      },
    },
    {
      stepIndex: 3,
      title: 'Compute Bottom-Right Destination (2, 2): grid[2][2]=1 + min(6, 8) = 7',
      description: 'Minimum path sum from top-left (0, 0) to bottom-right (2, 2) is 7. Path: 1 -> 3 -> 1 -> 1 -> 1.',
      codeLineHighlight: 9,
      variables: { result: 7, timeComplexity: 'O(M * N)', spaceComplexity: 'O(1)' },
      dpTableState: {
        dimensions: '2D',
        values: [
          [1, 4, 5],
          [2, 7, 6],
          [6, 8, 7],
        ],
        activeCell: [2, 2],
        formula: 'dp[2][2] = 1 + min(dp[1][2]=6, dp[2][1]=8) = 7',
      },
    },
  ],

  // Problem 72: Edit Distance (2D DP)
  72: [
    {
      stepIndex: 0,
      title: 'Initialize Edit Distance Matrix for word1 = "horse", word2 = "ros"',
      description: 'Row 0 represents empty string deletions (0..3). Col 0 represents insertions (0..5).',
      codeLineHighlight: 2,
      variables: { len1: 5, len2: 3 },
      dpTableState: {
        dimensions: '2D',
        values: [
          [0, 1, 2, 3],
          [1, '-', '-', '-'],
          [2, '-', '-', '-'],
          [3, '-', '-', '-'],
        ],
        activeCell: [0, 0],
        formula: 'dp[i][j] = if chars match: dp[i-1][j-1] else 1 + min(insert, delete, replace)',
      },
    },
    {
      stepIndex: 1,
      title: 'Compare "h" vs "r": Mismatch -> 1 + min(0, 1, 1) = 1 (Replace)',
      description: 'Replace "h" with "r" costs 1 operation. dp[1][1] = 1.',
      codeLineHighlight: 5,
      variables: { char1: 'h', char2: 'r', 'dp[1][1]': 1 },
      dpTableState: {
        dimensions: '2D',
        values: [
          [0, 1, 2, 3],
          [1, 1, 2, 3],
          [2, 2, 1, 2],
          [3, 2, 2, 2],
        ],
        activeCell: [1, 1],
        formula: 'dp[1][1] = 1 + min(dp[0][1], dp[1][0], dp[0][0]) = 1',
      },
    },
    {
      stepIndex: 2,
      title: 'Compare "o" vs "o": Exact Match! dp[2][2] = dp[1][1] = 1',
      description: 'Characters match without edit cost: diagonal value propagates directly.',
      codeLineHighlight: 4,
      variables: { char1: 'o', char2: 'o', 'dp[2][2]': 1, match: true },
      dpTableState: {
        dimensions: '2D',
        values: [
          [0, 1, 2, 3],
          [1, 1, 2, 3],
          [2, 2, 1, 2],
          [3, 2, 2, 2],
        ],
        activeCell: [2, 2],
        formula: 'dp[2][2] = dp[1][1] = 1 (Zero-cost match)',
      },
    },
    {
      stepIndex: 3,
      title: 'Complete Table: Minimum Edit Distance is 3',
      description: 'Transform "horse" -> "ros" in 3 steps: replace \'h\'->\'r\', remove \'r\', remove \'e\'. Time: O(M * N).',
      codeLineHighlight: 9,
      variables: { minDistance: 3, timeComplexity: 'O(M * N)' },
      dpTableState: {
        dimensions: '2D',
        values: [
          [0, 1, 2, 3],
          [1, 1, 2, 3],
          [2, 2, 1, 2],
          [3, 2, 2, 3],
        ],
        activeCell: [3, 3],
        formula: 'dp[m][n] = 3 operations',
      },
    },
  ],
};

/**
 * Universal generator for all other 1D DP and Multidimensional DP problems
 */
export function generateDPTrace(_problemId: number, title: string, category: string, complexityTime: string): VisualizerStep[] {
  const is2D = category.toLowerCase().includes('multi') || category.toLowerCase().includes('2d');

  if (is2D) {
    return [
      {
        stepIndex: 0,
        title: `Initialize 2D DP Table for ${title}`,
        description: `Allocating memoization matrix and establishing base cases for ${title}.`,
        codeLineHighlight: 2,
        variables: { rows: 3, cols: 3, status: 'base_cases_set' },
        dpTableState: {
          dimensions: '2D',
          values: [
            [0, 1, 2],
            [1, '-', '-'],
            [2, '-', '-'],
          ],
          activeCell: [0, 0],
          formula: 'dp[i][j] = optimal(subproblems)',
        },
      },
      {
        stepIndex: 1,
        title: 'Evaluate Transition Invariant for Row 1',
        description: 'Combining optimal overlapping subproblem solutions from top, left, and diagonal predecessors.',
        codeLineHighlight: 5,
        variables: { row: 1, col: 1, 'dp[1][1]': 2 },
        dpTableState: {
          dimensions: '2D',
          values: [
            [0, 1, 2],
            [1, 2, 3],
            [2, '-', '-'],
          ],
          activeCell: [1, 1],
          formula: 'dp[1][1] = transition(dp[0][1], dp[1][0])',
        },
      },
      {
        stepIndex: 2,
        title: 'Propagate Recurrence Across Target Dimension',
        description: 'Bottom-up DP recurrence fills all required prefixes without redundant recomputation.',
        codeLineHighlight: 7,
        variables: { row: 2, col: 2, 'dp[2][2]': 4 },
        dpTableState: {
          dimensions: '2D',
          values: [
            [0, 1, 2],
            [1, 2, 3],
            [2, 3, 4],
          ],
          activeCell: [2, 2],
          formula: 'dp[2][2] = transition(dp[1][2], dp[2][1])',
        },
      },
      {
        stepIndex: 3,
        title: 'Optimal Substructure Resolved: Return Solution',
        description: `Global optimum identified in ${complexityTime} time complexity.`,
        codeLineHighlight: 10,
        variables: { result: 4, timeComplexity: complexityTime },
        dpTableState: {
          dimensions: '2D',
          values: [
            [0, 1, 2],
            [1, 2, 3],
            [2, 3, 4],
          ],
          activeCell: [2, 2],
          formula: 'Optimal value = dp[M-1][N-1]',
        },
      },
    ];
  }

  // 1D DP
  return [
    {
      stepIndex: 0,
      title: `Initialize 1D DP Array for ${title}`,
      description: `Setting up base cases dp[0] and establishing recurrence boundaries for ${title}.`,
      codeLineHighlight: 2,
      variables: { 'dp[0]': 1, status: 'initialized' },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, '-', '-', '-'],
        activeCell: 0,
        formula: 'dp[i] = optimal(dp[i-1], dp[i-2])',
      },
    },
    {
      stepIndex: 1,
      title: 'Compute Next Step from Overlapping Subproblems',
      description: 'Applying optimal recurrence relation to determine state value at index i.',
      codeLineHighlight: 5,
      variables: { i: 2, 'dp[2]': 3 },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, '-', '-'],
        activeCell: 2,
        formula: 'dp[i] = transition(dp[i-1], dp[i-2])',
      },
    },
    {
      stepIndex: 2,
      title: 'Advance State Evaluation to Target Index',
      description: 'Updating DP table iteratively in linear time.',
      codeLineHighlight: 7,
      variables: { i: 3, 'dp[3]': 5 },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, 5, '-'],
        activeCell: 3,
        formula: 'dp[3] = transition(dp[2], dp[1])',
      },
    },
    {
      stepIndex: 3,
      title: 'Dynamic Programming Complete: Return dp[N]',
      description: `Final answer computed in ${complexityTime} time complexity.`,
      codeLineHighlight: 10,
      variables: { result: 8, timeComplexity: complexityTime },
      dpTableState: {
        dimensions: '1D',
        values: [1, 2, 3, 5, 8],
        activeCell: 4,
        formula: 'Final answer = dp[N]',
      },
    },
  ];
}
