import type { LeetCodeProblem } from '../../types/problem';

export const kadanesAlgorithmProblems: LeetCodeProblem[] = [
  {
    id: 53,
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    pattern: 'kadanes-algorithm',
    category: "Kadane's Algorithm",
    statement: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    bruteForce: {
      name: 'All Subarrays Summation',
      code: `function maxSubArrayBrute(nums: number[]): number {
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Compute sum of every possible subarray [i..j] and maintain the maximum seen.'
    },
    optimal: {
      name: 'Kadane\'s Dynamic Sum Reset',
      code: `function maxSubArray(nums: number[]): number {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'At each position, decide whether to append nums[i] to existing sum or restart fresh from nums[i]. Update global max at each step.',
      whyOptimalIsPreferred: 'Reduces time from quadratic O(N^2) to a single linear pass O(N) using O(1) space.',
      patternInvariant: 'Discard running prefix sums that become negative because they strictly decrease the potential sum of any subsequent subarray.'
    },
    defaultInputDescription: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]'
  },
  {
    id: 918,
    slug: 'maximum-sum-circular-subarray',
    title: 'Maximum Sum Circular Subarray',
    difficulty: 'Medium',
    pattern: 'kadanes-algorithm',
    category: "Kadane's Algorithm",
    statement: 'Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums. A circular array means the end of the array connects to the beginning of the array.',
    examples: [
      {
        input: 'nums = [1,-2,3,-2]',
        output: '3',
        explanation: 'Subarray [3] has maximum sum 3.'
      },
      {
        input: 'nums = [5,-3,5]',
        output: '10',
        explanation: 'Subarray [5,5] has maximum sum 5 + 5 = 10.'
      },
      {
        input: 'nums = [-3,-2,-3]',
        output: '-2',
        explanation: 'Subarray [-2] has maximum sum -2.'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4'
    ],
    bruteForce: {
      name: 'Circular Prefix Sums at All Offsets',
      code: `function maxSubarraySumCircularBrute(nums: number[]): number {
  const n = nums.length;
  let maxSum = -Infinity;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let len = 1; len <= n; len++) {
      sum += nums[(i + len - 1) % n];
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Computes subarray sums for all possible start offsets i and lengths len modulo n.'
    },
    optimal: {
      name: 'Dual Kadane (Max Subarray & Total - Min Subarray)',
      code: `function maxSubarraySumCircular(nums: number[]): number {
  let totalSum = 0;
  let currMax = 0, maxSum = nums[0];
  let currMin = 0, minSum = nums[0];

  for (const num of nums) {
    currMax = Math.max(num, currMax + num);
    maxSum = Math.max(maxSum, currMax);

    currMin = Math.min(num, currMin + num);
    minSum = Math.min(minSum, currMin);

    totalSum += num;
  }

  // If all elements are negative, maxSum is the largest single negative element
  if (maxSum < 0) {
    return maxSum;
  }

  return Math.max(maxSum, totalSum - minSum);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Two possible configurations for the maximum circular subarray: 1) Non-wrapping subarray (standard Kadane maxSum), or 2) Wrapping subarray spanning edges, which equals totalSum - minSubarraySum. Running both Kadane sweeps in a single pass resolves in O(N) time.',
      whyOptimalIsPreferred: 'Linear O(N) execution that neatly solves the wrap-around case by taking the complement of the minimum contiguous subarray.',
      patternInvariant: 'Circular wrap duality: max circular subarray is either internal max subarray or totalSum minus internal min subarray.'
    },
    defaultInputDescription: 'nums = [5, -3, 5]'
  }
];
