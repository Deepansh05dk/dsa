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
        label: 'Array of Numbers (nums)',
        type: 'array',
        placeholder: 'e.g. 2, 7, 11, 15',
        defaultValue: [2, 7, 11, 15],
        helpText: 'Comma or space separated integers (max 15)',
      },
      {
        key: 'target',
        label: 'Target Sum (target)',
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
        label: 'Input String (s)',
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
        key: 'heights',
        label: 'Heights Array (height)',
        type: 'array',
        placeholder: 'e.g. 1, 8, 6, 2, 5, 4, 8, 3, 7',
        defaultValue: [1, 8, 6, 2, 5, 4, 8, 3, 7],
        helpText: 'Vertical line heights (at least 2 integers)',
      },
    ],
    presets: [
      { label: 'Example 1', values: { heights: [1, 8, 6, 2, 5, 4, 8, 3, 7] } },
      { label: 'Example 2 [1, 1]', values: { heights: [1, 1] } },
      { label: 'Decreasing Heights', values: { heights: [9, 8, 7, 6, 5, 4, 3] } },
      { label: 'V-Shape', values: { heights: [8, 2, 1, 1, 2, 8] } },
    ],
    simulate: (input) => {
      const heights = parseNumberArray(input.heights, [1, 8, 6, 2, 5, 4, 8, 3, 7]);
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
        label: 'Stock Prices Array (prices)',
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
        label: 'Integer Array (nums)',
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
        label: 'Bracket String (s)',
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
        label: 'Integer Array (nums)',
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
        label: 'Input String (s)',
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
        label: 'Sorted Array (nums)',
        type: 'array',
        placeholder: 'e.g. 1, 3, 5, 6',
        defaultValue: [1, 3, 5, 6],
        helpText: 'Strictly increasing sorted numbers',
      },
      {
        key: 'target',
        label: 'Target Value (target)',
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
        label: 'Number of Stairs (n)',
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
        key: 'values',
        label: 'Node Values (comma-separated)',
        type: 'array',
        placeholder: 'e.g. 1, 2, 3, 4, 5',
        defaultValue: [1, 2, 3, 4, 5],
        helpText: 'Node sequence from head to tail (max 10 nodes)',
      },
    ],
    presets: [
      { label: 'Example 1 [1, 2, 3, 4, 5]', values: { values: [1, 2, 3, 4, 5] } },
      { label: 'Example 2 [1, 2]', values: { values: [1, 2] } },
      { label: 'Single Node [42]', values: { values: [42] } },
    ],
    simulate: (input) => {
      const vals = parseNumberArray(input.values, [1, 2, 3, 4, 5], 10);
      return simulateReverseLinkedList(vals);
    },
  },
};

/**
 * Resolves or synthesizes an interactive input configuration for ANY LeetCode problem.
 */
export function getSimulatorConfigForProblem(problem: LeetCodeProblem): ProblemInputConfig {
  // 1. Direct problem-specific simulator
  if (PROBLEM_SIMULATORS[problem.id]) {
    return PROBLEM_SIMULATORS[problem.id];
  }

  const p = (problem.pattern || '').toLowerCase();
  const cat = (problem.category || '').toLowerCase();

  // 2. Binary Search family
  if (p.includes('binary-search') || cat.includes('binary search')) {
    return {
      problemId: problem.id,
      title: problem.title,
      fields: [
        {
          key: 'nums',
          label: 'Sorted Array (nums)',
          type: 'array',
          placeholder: 'e.g. 1, 3, 5, 7, 9, 11',
          defaultValue: [1, 3, 5, 7, 9, 11],
          helpText: 'Comma-separated sorted numbers',
        },
        {
          key: 'target',
          label: 'Search Target',
          type: 'number',
          placeholder: 'e.g. 7',
          defaultValue: 7,
          helpText: 'Value to search for',
        },
      ],
      presets: [
        { label: 'Present [7]', values: { nums: [1, 3, 5, 7, 9, 11], target: 7 } },
        { label: 'Left Boundary [1]', values: { nums: [1, 3, 5, 7, 9, 11], target: 1 } },
        { label: 'Right Boundary [11]', values: { nums: [1, 3, 5, 7, 9, 11], target: 11 } },
        { label: 'Missing [4]', values: { nums: [1, 3, 5, 7, 9, 11], target: 4 } },
      ],
      simulate: (input) => {
        const nums = parseNumberArray(input.nums, [1, 3, 5, 7, 9, 11]);
        const target = parseSingleNumber(input.target, 7);
        return simulateBinarySearch(nums, target);
      },
    };
  }

  // 3. Stack family
  if (p.includes('stack') || cat.includes('stack')) {
    return {
      problemId: problem.id,
      title: problem.title,
      fields: [
        {
          key: 's',
          label: 'Stack Expression / Sequence',
          type: 'string',
          placeholder: 'e.g. ()[]{}',
          defaultValue: '()[]{}',
          helpText: 'Tokens or bracket string',
        },
      ],
      presets: [
        { label: 'Valid Parentheses', values: { s: '()[]{}' } },
        { label: 'Nested Brackets', values: { s: '{[()]}' } },
        { label: 'Mismatched', values: { s: '(]' } },
      ],
      simulate: (input) => {
        const s = parseStringInput(input.s, '()[]{}');
        return simulateValidParentheses(s);
      },
    };
  }

  // 4. Linked List family
  if (p.includes('linked-list') || cat.includes('linked list')) {
    return {
      problemId: problem.id,
      title: problem.title,
      fields: [
        {
          key: 'values',
          label: 'Node Values',
          type: 'array',
          placeholder: 'e.g. 1, 2, 3, 4, 5',
          defaultValue: [1, 2, 3, 4, 5],
          helpText: 'Comma-separated node values (max 10)',
        },
      ],
      presets: [
        { label: 'Sequential [1..5]', values: { values: [1, 2, 3, 4, 5] } },
        { label: 'Short [1, 2]', values: { values: [1, 2] } },
      ],
      simulate: (input) => {
        const vals = parseNumberArray(input.values, [1, 2, 3, 4, 5], 10);
        return simulateReverseLinkedList(vals);
      },
    };
  }

  // 5. 1D DP family
  if (p.includes('1d-dp') || cat.includes('1d dp')) {
    return {
      problemId: problem.id,
      title: problem.title,
      fields: [
        {
          key: 'n',
          label: 'Step Count / Size (n)',
          type: 'number',
          placeholder: 'e.g. 6',
          defaultValue: 6,
          helpText: 'Integer from 1 to 15',
        },
      ],
      presets: [
        { label: 'Small (n = 4)', values: { n: 4 } },
        { label: 'Medium (n = 7)', values: { n: 7 } },
      ],
      simulate: (input) => {
        const n = parseSingleNumber(input.n, 6);
        return simulateClimbingStairs(n);
      },
    };
  }

  // 6. Sliding Window family
  if (p.includes('sliding-window') || cat.includes('sliding window')) {
    return {
      problemId: problem.id,
      title: problem.title,
      fields: [
        {
          key: 's',
          label: 'Window Stream / String',
          type: 'string',
          placeholder: 'e.g. abcabcbb',
          defaultValue: 'abcabcbb',
          helpText: 'String to sweep with window',
        },
      ],
      presets: [
        { label: 'Sample (abcabcbb)', values: { s: 'abcabcbb' } },
        { label: 'Unique (abcdef)', values: { s: 'abcdef' } },
      ],
      simulate: (input) => {
        const s = parseStringInput(input.s, 'abcabcbb');
        return simulateSlidingWindowSubstr(s);
      },
    };
  }

  // 7. Universal Array / Two-Pointers fallback for all remaining problems
  return {
    problemId: problem.id,
    title: problem.title,
    fields: [
      {
        key: 'nums',
        label: 'Array Elements',
        type: 'array',
        placeholder: 'e.g. 3, 8, 12, 17, 24',
        defaultValue: [3, 8, 12, 17, 24],
        helpText: 'Comma or space separated numbers (max 15)',
      },
      {
        key: 'target',
        label: 'Condition / Target Value',
        type: 'number',
        placeholder: 'e.g. 17',
        defaultValue: 17,
        helpText: 'Search or comparison target',
      },
    ],
    presets: [
      { label: 'Default Array', values: { nums: [3, 8, 12, 17, 24], target: 17 } },
      { label: 'Small Array', values: { nums: [5, 10, 15], target: 10 } },
      { label: 'Negative Numbers', values: { nums: [-8, -2, 4, 9, 13], target: 4 } },
    ],
    simulate: (input) => {
      const nums = parseNumberArray(input.nums, [3, 8, 12, 17, 24]);
      const target = parseSingleNumber(input.target, 17);
      return simulateUniversalArray(nums, target);
    },
  };
}
