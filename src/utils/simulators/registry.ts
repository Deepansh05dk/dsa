import type { ProblemInputConfig } from './types';
import type { LeetCodeProblem } from '../../types/problem';
import {
  parseNumberArray,
  parseSingleNumber,
  parseStringInput,
} from './helpers';
import {
  simulateTwoSum,
  simulateValidPalindrome,
  simulateContainerWithMostWater,
  simulateBestTimeStock,
  simulateBinarySearch,
  simulateValidParentheses,
  simulateKadane,
  simulateThreeSum,
  simulateSlidingWindowSubstr,
  simulateReverseLinkedList,
  simulateClimbingStairs,
  simulateUniversalArray,
} from './algorithms';
import { extractFieldsAndPresetsFromProblem } from './param-parser';
import {
  simulateTreePattern,
  simulateMatrixPattern,
  simulateLinkedListPattern,
  simulateIntervalsPattern,
  simulateHashMapPattern,
} from './pattern-engines';

/**
 * Registry of interactive input schemas and executable simulators.
 */
export const PROBLEM_SIMULATORS: Record<number, ProblemInputConfig> = {
  // 1. Two Sum
  1: {
    problemId: 1,
    title: 'Two Sum',
    fields: [
      {
        key: 'nums',
        label: 'nums (Array)',
        type: 'array',
        placeholder: 'e.g. 2, 7, 11, 15',
        defaultValue: [2, 7, 11, 15],
        helpText: 'Comma or space separated integers',
      },
      {
        key: 'target',
        label: 'target (Target Sum)',
        type: 'number',
        placeholder: 'e.g. 9',
        defaultValue: 9,
        helpText: 'Desired sum to find in nums',
      },
    ],
    presets: [
      { label: 'Example 1', values: { nums: [2, 7, 11, 15], target: 9 } },
      { label: 'Example 2', values: { nums: [3, 2, 4], target: 6 } },
      { label: 'Duplicates [3, 3]', values: { nums: [3, 3], target: 6 } },
      { label: 'Not Found', values: { nums: [1, 2, 3, 9], target: 8 } },
      { label: 'Negative Values', values: { nums: [-3, 4, 3, 90], target: 0 } },
    ],
    simulate: (input) => {
      const nums = parseNumberArray(input.nums, [2, 7, 11, 15]);
      const target = parseSingleNumber(input.target, 9);
      return simulateTwoSum(nums, target);
    },
  },

  // 125. Valid Palindrome
  125: {
    problemId: 125,
    title: 'Valid Palindrome',
    fields: [
      {
        key: 's',
        label: 's (Input String)',
        type: 'string',
        placeholder: 'e.g. A man, a plan, a canal: Panama',
        defaultValue: 'A man, a plan, a canal: Panama',
        helpText: 'Letters, spaces, symbols, or numbers',
      },
    ],
    presets: [
      { label: 'Example 1 (Panama)', values: { s: 'A man, a plan, a canal: Panama' } },
      { label: 'Example 2 (race a car)', values: { s: 'race a car' } },
      { label: 'Short Palindrome (racecar)', values: { s: 'racecar' } },
      { label: 'Number Palindrome', values: { s: '12321' } },
      { label: 'Invalid String', values: { s: 'leetcode' } },
    ],
    simulate: (input) => {
      const s = parseStringInput(input.s, 'A man, a plan, a canal: Panama');
      return simulateValidPalindrome(s);
    },
  },

  // 11. Container With Most Water
  11: {
    problemId: 11,
    title: 'Container With Most Water',
    fields: [
      {
        key: 'height',
        label: 'height (Heights Array)',
        type: 'array',
        placeholder: 'e.g. 1, 8, 6, 2, 5, 4, 8, 3, 7',
        defaultValue: [1, 8, 6, 2, 5, 4, 8, 3, 7],
        helpText: 'Vertical line heights (at least 2 integers)',
      },
    ],
    presets: [
      { label: 'Example 1', values: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] } },
      { label: 'Example 2 [1, 1]', values: { height: [1, 1] } },
      { label: 'Decreasing Heights', values: { height: [9, 8, 7, 6, 5, 4, 3] } },
      { label: 'V-Shape', values: { height: [8, 2, 1, 1, 2, 8] } },
    ],
    simulate: (input) => {
      const heights = parseNumberArray(input.height ?? input.heights, [1, 8, 6, 2, 5, 4, 8, 3, 7]);
      return simulateContainerWithMostWater(heights.length >= 2 ? heights : [1, 1]);
    },
  },

  // 121. Best Time to Buy and Sell Stock
  121: {
    problemId: 121,
    title: 'Best Time to Buy and Sell Stock',
    fields: [
      {
        key: 'prices',
        label: 'prices (Stock Prices)',
        type: 'array',
        placeholder: 'e.g. 7, 1, 5, 3, 6, 4',
        defaultValue: [7, 1, 5, 3, 6, 4],
        helpText: 'Daily stock prices over time',
      },
    ],
    presets: [
      { label: 'Example 1', values: { prices: [7, 1, 5, 3, 6, 4] } },
      { label: 'Monotonic Drop [7, 6, 4, 3, 1]', values: { prices: [7, 6, 4, 3, 1] } },
      { label: 'Dip and Surge', values: { prices: [3, 2, 6, 5, 0, 3] } },
      { label: 'Steady Rise', values: { prices: [1, 2, 3, 4, 5, 6] } },
    ],
    simulate: (input) => {
      const prices = parseNumberArray(input.prices, [7, 1, 5, 3, 6, 4]);
      return simulateBestTimeStock(prices.length >= 2 ? prices : [7, 1]);
    },
  },

  // 15. 3Sum
  15: {
    problemId: 15,
    title: '3Sum',
    fields: [
      {
        key: 'nums',
        label: 'nums (Integer Array)',
        type: 'array',
        placeholder: 'e.g. -1, 0, 1, 2, -1, -4',
        defaultValue: [-1, 0, 1, 2, -1, -4],
        helpText: 'Find all unique triplets [a, b, c] summing to 0',
      },
    ],
    presets: [
      { label: 'Example 1', values: { nums: [-1, 0, 1, 2, -1, -4] } },
      { label: 'Example 2 [0, 1, 1]', values: { nums: [0, 1, 1] } },
      { label: 'All Zeros [0, 0, 0, 0]', values: { nums: [0, 0, 0, 0] } },
      { label: 'Multiple Solutions', values: { nums: [-2, 0, 1, 1, 2] } },
    ],
    simulate: (input) => {
      const nums = parseNumberArray(input.nums, [-1, 0, 1, 2, -1, -4]);
      return simulateThreeSum(nums);
    },
  },

  // 20. Valid Parentheses
  20: {
    problemId: 20,
    title: 'Valid Parentheses',
    fields: [
      {
        key: 's',
        label: 's (Bracket String)',
        type: 'string',
        placeholder: 'e.g. ()[]{}',
        defaultValue: '()[]{}',
        helpText: 'Consists of brackets: (, ), {, }, [, ]',
      },
    ],
    presets: [
      { label: 'Example 1 ()', values: { s: '()' } },
      { label: 'Example 2 ()[]{}', values: { s: '()[]{}' } },
      { label: 'Example 3 (]', values: { s: '(]' } },
      { label: 'Nested Valid {[]}', values: { s: '{[]}' } },
      { label: 'Interleaved Invalid ([)]', values: { s: '([)]' } },
    ],
    simulate: (input) => {
      const s = parseStringInput(input.s, '()[]{}');
      return simulateValidParentheses(s);
    },
  },

  // 53. Maximum Subarray (Kadane's)
  53: {
    problemId: 53,
    title: 'Maximum Subarray',
    fields: [
      {
        key: 'nums',
        label: 'nums (Integer Array)',
        type: 'array',
        placeholder: 'e.g. -2, 1, -3, 4, -1, 2, 1, -5, 4',
        defaultValue: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        helpText: 'Find contiguous subarray with largest sum',
      },
    ],
    presets: [
      { label: 'Example 1', values: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] } },
      { label: 'Single Element [1]', values: { nums: [1] } },
      { label: 'All Positive [5, 4, -1, 7, 8]', values: { nums: [5, 4, -1, 7, 8] } },
      { label: 'All Negative [-4, -2, -5, -1]', values: { nums: [-4, -2, -5, -1] } },
    ],
    simulate: (input) => {
      const nums = parseNumberArray(input.nums, [-2, 1, -3, 4, -1, 2, 1, -5, 4]);
      return simulateKadane(nums);
    },
  },

  // 3. Longest Substring Without Repeating Characters
  3: {
    problemId: 3,
    title: 'Longest Substring Without Repeating Characters',
    fields: [
      {
        key: 's',
        label: 's (Input String)',
        type: 'string',
        placeholder: 'e.g. abcabcbb',
        defaultValue: 'abcabcbb',
        helpText: 'Any alphanumeric string (max 25 characters)',
      },
    ],
    presets: [
      { label: 'Example 1 (abcabcbb)', values: { s: 'abcabcbb' } },
      { label: 'Example 2 (bbbbb)', values: { s: 'bbbbb' } },
      { label: 'Example 3 (pwwkew)', values: { s: 'pwwkew' } },
      { label: 'Unique (abcdef)', values: { s: 'abcdef' } },
    ],
    simulate: (input) => {
      const s = parseStringInput(input.s, 'abcabcbb');
      return simulateSlidingWindowSubstr(s);
    },
  },

  // 35. Search Insert Position (Binary Search)
  35: {
    problemId: 35,
    title: 'Search Insert Position',
    fields: [
      {
        key: 'nums',
        label: 'nums (Sorted Array)',
        type: 'array',
        placeholder: 'e.g. 1, 3, 5, 6',
        defaultValue: [1, 3, 5, 6],
        helpText: 'Strictly increasing sorted numbers',
      },
      {
        key: 'target',
        label: 'target (Target Value)',
        type: 'number',
        placeholder: 'e.g. 5',
        defaultValue: 5,
        helpText: 'Value to search or find insertion index for',
      },
    ],
    presets: [
      { label: 'Target Exists (5)', values: { nums: [1, 3, 5, 6], target: 5 } },
      { label: 'Insert Middle (2)', values: { nums: [1, 3, 5, 6], target: 2 } },
      { label: 'Insert End (7)', values: { nums: [1, 3, 5, 6], target: 7 } },
      { label: 'Insert Front (0)', values: { nums: [1, 3, 5, 6], target: 0 } },
    ],
    simulate: (input) => {
      const nums = parseNumberArray(input.nums, [1, 3, 5, 6]);
      const target = parseSingleNumber(input.target, 5);
      return simulateBinarySearch(nums, target);
    },
  },

  // 70. Climbing Stairs
  70: {
    problemId: 70,
    title: 'Climbing Stairs',
    fields: [
      {
        key: 'n',
        label: 'n (Number of Stairs)',
        type: 'number',
        placeholder: 'e.g. 5',
        defaultValue: 5,
        helpText: 'Integer from 1 to 15',
      },
    ],
    presets: [
      { label: 'n = 2', values: { n: 2 } },
      { label: 'n = 3', values: { n: 3 } },
      { label: 'n = 5', values: { n: 5 } },
      { label: 'n = 8', values: { n: 8 } },
    ],
    simulate: (input) => {
      const n = parseSingleNumber(input.n, 5);
      return simulateClimbingStairs(n);
    },
  },

  // 206. Reverse Linked List
  206: {
    problemId: 206,
    title: 'Reverse Linked List',
    fields: [
      {
        key: 'head',
        label: 'head (Linked List Nodes)',
        type: 'array',
        placeholder: 'e.g. 1, 2, 3, 4, 5',
        defaultValue: [1, 2, 3, 4, 5],
        helpText: 'Node sequence from head to tail (max 10 nodes)',
      },
    ],
    presets: [
      { label: 'Example 1 [1, 2, 3, 4, 5]', values: { head: [1, 2, 3, 4, 5] } },
      { label: 'Example 2 [1, 2]', values: { head: [1, 2] } },
      { label: 'Single Node [42]', values: { head: [42] } },
    ],
    simulate: (input) => {
      const vals = parseNumberArray(input.head ?? input.values, [1, 2, 3, 4, 5], 10);
      return simulateReverseLinkedList(vals);
    },
  },

  // 56. Merge Intervals
  56: {
    problemId: 56,
    title: 'Merge Intervals',
    fields: [
      {
        key: 'intervals',
        label: 'intervals (2D Array)',
        type: 'array',
        placeholder: 'e.g. [[1,3],[2,6],[8,10],[15,18]]',
        defaultValue: [[1, 3], [2, 6], [8, 10], [15, 18]],
        helpText: 'List of start-end interval pairs',
      },
    ],
    presets: [
      { label: 'Example 1', values: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] } },
      { label: 'Example 2 [[1,4],[4,5]]', values: { intervals: [[1, 4], [4, 5]] } },
      { label: 'Nested [[1,4],[2,3]]', values: { intervals: [[1, 4], [2, 3]] } },
    ],
    simulate: (input, prob) => simulateIntervalsPattern(input, prob),
  },

  // 200. Number of Islands
  200: {
    problemId: 200,
    title: 'Number of Islands',
    fields: [
      {
        key: 'grid',
        label: 'grid (2D Binary Matrix)',
        type: 'array',
        placeholder: 'e.g. [["1","1","0"],["1","1","0"],["0","0","1"]]',
        defaultValue: [
          ['1', '1', '0'],
          ['1', '1', '0'],
          ['0', '0', '1'],
        ],
        helpText: '2D binary grid ("1" for land, "0" for water)',
      },
    ],
    presets: [
      {
        label: 'Example 1 (1 Big Island)',
        values: {
          grid: [
            ['1', '1', '1', '0'],
            ['1', '1', '0', '0'],
            ['1', '1', '0', '0'],
          ],
        },
      },
      {
        label: 'Example 2 (3 Islands)',
        values: {
          grid: [
            ['1', '1', '0', '0'],
            ['1', '1', '0', '0'],
            ['0', '0', '1', '0'],
            ['0', '0', '0', '1'],
          ],
        },
      },
    ],
    simulate: (input, prob) => simulateMatrixPattern(input, prob),
  },

  // 54. Spiral Matrix
  54: {
    problemId: 54,
    title: 'Spiral Matrix',
    fields: [
      {
        key: 'matrix',
        label: 'matrix (2D Grid)',
        type: 'array',
        placeholder: 'e.g. [[1,2,3],[4,5,6],[7,8,9]]',
        defaultValue: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        helpText: 'm x n matrix of integers',
      },
    ],
    presets: [
      {
        label: 'Example 1 (3x3)',
        values: {
          matrix: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        },
      },
      {
        label: 'Example 2 (3x4)',
        values: {
          matrix: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
          ],
        },
      },
    ],
    simulate: (input, prob) => simulateMatrixPattern(input, prob),
  },

  // 104. Maximum Depth of Binary Tree
  104: {
    problemId: 104,
    title: 'Maximum Depth of Binary Tree',
    fields: [
      {
        key: 'root',
        label: 'root (Binary Tree Nodes)',
        type: 'array',
        placeholder: 'e.g. 3, 9, 20, null, null, 15, 7',
        defaultValue: [3, 9, 20, null, null, 15, 7],
        helpText: 'Level-order node values',
      },
    ],
    presets: [
      { label: 'Example 1 [3,9,20,...]', values: { root: [3, 9, 20, null, null, 15, 7] } },
      { label: 'Example 2 [1,null,2]', values: { root: [1, null, 2] } },
    ],
    simulate: (input, prob) => simulateTreePattern(input, prob),
  },
};

/**
 * Universal input configuration resolver for ALL 150 LeetCode problems.
 * Automatically extracts real variable names, types, and presets from problem.examples,
 * and routes to the appropriate pattern execution interpreter.
 */
export function getSimulatorConfigForProblem(problem: LeetCodeProblem): ProblemInputConfig {
  // 1. Dedicated flagship simulator if available
  if (PROBLEM_SIMULATORS[problem.id]) {
    return PROBLEM_SIMULATORS[problem.id];
  }

  // 2. Automatically extract authentic parameter definitions and presets from problem.examples
  const { fields, presets } = extractFieldsAndPresetsFromProblem(problem);

  const pattern = (problem.pattern || '').toLowerCase();
  const category = (problem.category || '').toLowerCase();

  // 3. Pattern execution dispatcher
  let simulatorFn: (input: Record<string, any>, p: LeetCodeProblem) => any;

  if (pattern.includes('tree') || category.includes('tree')) {
    simulatorFn = (input, p) => simulateTreePattern(input, p);
  } else if (pattern.includes('matrix') || category.includes('matrix') || pattern.includes('graph') || category.includes('graph')) {
    simulatorFn = (input, p) => simulateMatrixPattern(input, p);
  } else if (pattern.includes('linked-list') || category.includes('linked list')) {
    simulatorFn = (input, p) => simulateLinkedListPattern(input, p);
  } else if (pattern.includes('intervals') || category.includes('intervals')) {
    simulatorFn = (input, p) => simulateIntervalsPattern(input, p);
  } else if (pattern.includes('hashmap') || category.includes('hashmap')) {
    simulatorFn = (input, p) => simulateHashMapPattern(input, p);
  } else if (pattern.includes('stack') || category.includes('stack')) {
    simulatorFn = (input) => simulateValidParentheses(input.s ?? input.input ?? '()[]{}');
  } else if (pattern.includes('sliding-window') || category.includes('sliding window')) {
    simulatorFn = (input) => simulateSlidingWindowSubstr(input.s ?? input.input ?? 'abcabcbb');
  } else if (pattern.includes('binary-search') || category.includes('binary search')) {
    simulatorFn = (input) => {
      const nums = parseNumberArray(input.nums ?? input.input, [1, 3, 5, 7, 9, 11]);
      const target = parseSingleNumber(input.target, 7);
      return simulateBinarySearch(nums, target);
    };
  } else if (pattern.includes('1d-dp') || category.includes('1d dp')) {
    simulatorFn = (input) => {
      const n = parseSingleNumber(input.n ?? input.amount ?? input.input, 5);
      return simulateClimbingStairs(n);
    };
  } else {
    // Universal Array / Two-Pointers fallback
    simulatorFn = (input) => {
      const nums = parseNumberArray(
        input.nums ?? input.nums1 ?? input.prices ?? input.heights ?? input.input,
        [2, 7, 11, 15]
      );
      const target = parseSingleNumber(input.target ?? input.val ?? input.k, 0);
      return simulateUniversalArray(nums, target);
    };
  }

  return {
    problemId: problem.id,
    title: problem.title,
    fields,
    presets,
    simulate: simulatorFn,
  };
}
