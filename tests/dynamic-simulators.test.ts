import { describe, it, expect } from 'vitest';
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
} from '../src/utils/simulators/algorithms';
import {
  simulateTreePattern,
  simulateMatrixPattern,
  simulateLinkedListPattern,
  simulateIntervalsPattern,
  simulateHashMapPattern,
} from '../src/utils/simulators/pattern-engines';
import {
  parseExampleInputString,
  extractFieldsAndPresetsFromProblem,
} from '../src/utils/simulators/param-parser';
import { getSimulatorConfigForProblem } from '../src/utils/simulators/registry';
import type { LeetCodeProblem } from '../src/types/problem';

describe('Dynamic Visualizer Simulators Suite', () => {
  describe('1. Two Sum Simulation', () => {
    it('simulates Two Sum when pair exists in array', () => {
      const steps = simulateTwoSum([2, 7, 11, 15], 9);
      expect(steps.length).toBeGreaterThan(2);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Pair Found');
      expect(lastStep.arrayState?.elements.some((e) => e.status === 'matched')).toBe(true);
      expect(lastStep.hashMapState?.entries.length).toBeGreaterThanOrEqual(1);
    });

    it('simulates Two Sum when pair does not exist', () => {
      const steps = simulateTwoSum([1, 2, 3], 100);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('No Valid Pair Found');
      expect(lastStep.variables?.result).toBe('None');
    });
  });

  describe('2. Valid Palindrome Simulation', () => {
    it('identifies valid palindrome string with pointers converging', () => {
      const steps = simulateValidPalindrome('racecar');
      expect(steps.length).toBeGreaterThan(2);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Valid Palindrome');
      expect(lastStep.variables?.isValid).toBe(true);
    });

    it('identifies invalid palindrome string and marks failure', () => {
      const steps = simulateValidPalindrome('hello');
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Not a Valid Palindrome');
      expect(lastStep.variables?.isValid).toBe(false);
    });
  });

  describe('3. Container With Most Water Simulation', () => {
    it('computes max area with moving boundaries', () => {
      const steps = simulateContainerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]);
      expect(steps.length).toBeGreaterThan(4);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Max Water Container Found');
      expect(lastStep.variables?.maxArea).toBe(49);
    });
  });

  describe('4. Best Time to Buy and Sell Stock Simulation', () => {
    it('tracks min price and max profit accurately', () => {
      const steps = simulateBestTimeStock([7, 1, 5, 3, 6, 4]);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Optimal Transaction');
      expect(lastStep.variables?.maxProfit).toBe(5);
    });

    it('handles strictly decreasing prices with zero profit', () => {
      const steps = simulateBestTimeStock([7, 6, 4, 3, 1]);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.variables?.maxProfit).toBe(0);
    });
  });

  describe('5. Binary Search Simulation', () => {
    it('finds target in sorted array with logarithmic step count', () => {
      const steps = simulateBinarySearch([1, 3, 5, 7, 9, 11], 7);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Target Found');
      expect(lastStep.variables?.foundIndex).toBe(3);
    });

    it('reports target missing when not in array', () => {
      const steps = simulateBinarySearch([1, 3, 5, 7, 9], 4);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Target Not in Array');
      expect(lastStep.variables?.result).toBe(-1);
    });
  });

  describe('6. Valid Parentheses Simulation', () => {
    it('simulates stack push/pop for balanced nested brackets', () => {
      const steps = simulateValidParentheses('{[()]}');
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Valid Parentheses');
      expect(lastStep.variables?.isValid).toBe(true);
    });

    it('catches immediate mismatched brackets', () => {
      const steps = simulateValidParentheses('(]');
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Mismatched Bracket');
      expect(lastStep.variables?.isValid).toBe(false);
    });
  });

  describe('7. Kadane Algorithm Simulation', () => {
    it('computes maximum contiguous subarray sum', () => {
      const steps = simulateKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('Maximum Subarray Sum');
      expect(lastStep.variables?.maxSum).toBe(6);
    });
  });

  describe('8. 3Sum Simulation', () => {
    it('finds zero-sum triplets in array', () => {
      const steps = simulateThreeSum([-1, 0, 1, 2, -1, -4]);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('3Sum');
      expect(lastStep.variables?.totalTriplets).toBeGreaterThanOrEqual(1);
    });
  });

  describe('9. Sliding Window Simulation', () => {
    it('computes longest substring without repeating characters', () => {
      const steps = simulateSlidingWindowSubstr('abcabcbb');
      const lastStep = steps[steps.length - 1];
      expect(lastStep.variables?.maxLen).toBe(3);
    });
  });

  describe('10. Reverse Linked List Simulation', () => {
    it('inverts node links step-by-step', () => {
      const steps = simulateReverseLinkedList([1, 2, 3]);
      expect(steps.length).toBeGreaterThan(2);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.title).toContain('List Reversal Complete');
      expect(lastStep.linkedListState?.nodes.length).toBe(3);
    });
  });

  describe('11. Climbing Stairs DP Simulation', () => {
    it('computes DP progression table for n = 5', () => {
      const steps = simulateClimbingStairs(5);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.variables?.answer).toBe(8);
      expect(lastStep.dpTableState?.values).toHaveLength(6);
    });
  });

  describe('12. Universal Fallback Simulator', () => {
    it('runs two-pointer sweep on arbitrary array', () => {
      const steps = simulateUniversalArray([10, 20, 30, 40]);
      expect(steps.length).toBeGreaterThan(2);
      expect(steps[steps.length - 1].variables?.status).toBe('complete');
    });
  });

  describe('13. Pattern-Specific Simulation Engines', () => {
    const mockProblem: LeetCodeProblem = {
      id: 999,
      slug: 'mock-problem',
      title: 'Mock Problem',
      difficulty: 'Medium',
      pattern: 'binary-tree-general',
      category: 'Binary Tree',
      statement: 'Mock statement',
      examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
      constraints: [],
      bruteForce: { name: 'B', code: '', complexity: { time: 'O(N)', space: 'O(N)' }, explanation: '' },
      optimal: { name: 'O', code: '', complexity: { time: 'O(N)', space: 'O(H)' }, explanation: '', whyOptimalIsPreferred: '', patternInvariant: '' },
      defaultInputDescription: '',
    };

    it('simulates Tree pattern and emits treeState with nodes', () => {
      const steps = simulateTreePattern({ root: [3, 9, 20, null, null, 15, 7] }, mockProblem);
      expect(steps.length).toBeGreaterThan(2);
      expect(steps[0].treeState).toBeDefined();
      expect(steps[0].treeState?.nodes.length).toBe(5); // 3, 9, 20, 15, 7 non-null nodes
    });

    it('simulates Matrix pattern and emits matrixState', () => {
      const matrixProb: LeetCodeProblem = { ...mockProblem, pattern: 'matrix', category: 'Matrix' };
      const steps = simulateMatrixPattern({ matrix: [[1, 2], [3, 4]] }, matrixProb);
      expect(steps[0].matrixState).toBeDefined();
      expect(steps[0].matrixState?.grid).toHaveLength(2);
    });

    it('simulates Intervals pattern and merges overlapping pairs', () => {
      const intProb: LeetCodeProblem = { ...mockProblem, pattern: 'intervals', category: 'Intervals' };
      const steps = simulateIntervalsPattern({ intervals: [[1, 3], [2, 6], [8, 10]] }, intProb);
      expect(steps.length).toBeGreaterThan(2);
      const last = steps[steps.length - 1];
      expect(last.variables?.finalCount).toBe(2);
    });

    it('simulates Linked List pattern and emits linkedListState', () => {
      const listProb: LeetCodeProblem = { ...mockProblem, pattern: 'linked-list', category: 'Linked List' };
      const steps = simulateLinkedListPattern({ head: [10, 20, 30] }, listProb);
      expect(steps[0].linkedListState?.nodes).toHaveLength(3);
    });

    it('simulates Hash Map pattern and increments frequencies', () => {
      const hashProb: LeetCodeProblem = { ...mockProblem, pattern: 'hashmap', category: 'Hashmap' };
      const steps = simulateHashMapPattern({ s: 'banana' }, hashProb);
      expect(steps[0].hashMapState).toBeDefined();
      expect(steps[steps.length - 1].variables?.totalUniqueKeys).toBe(3); // b, a, n
    });
  });

  describe('14. Universal Example Parameter Parser', () => {
    it('parses multiple assignment variables from input string', () => {
      const parsed = parseExampleInputString('nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3');
      expect(parsed.nums1).toEqual([1, 2, 3, 0, 0, 0]);
      expect(parsed.m).toBe(3);
      expect(parsed.nums2).toEqual([2, 5, 6]);
      expect(parsed.n).toBe(3);
    });

    it('parses string assignments accurately', () => {
      const parsed = parseExampleInputString('s = "anagram", t = "nagaram"');
      expect(parsed.s).toBe('anagram');
      expect(parsed.t).toBe('nagaram');
    });

    it('parses 2D grid matrix assignments', () => {
      const parsed = parseExampleInputString('grid = [["1","1","0"],["1","1","0"]]');
      expect(parsed.grid).toEqual([['1', '1', '0'], ['1', '1', '0']]);
    });

    it('extracts non-Two-Sum fields for Problem 88 (Merge Sorted Array)', () => {
      const p88: LeetCodeProblem = {
        id: 88,
        slug: 'merge-sorted-array',
        title: 'Merge Sorted Array',
        difficulty: 'Easy',
        pattern: 'array-string',
        category: 'Array / String',
        statement: '',
        examples: [
          { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' },
        ],
        constraints: [],
        bruteForce: { name: '', code: '', complexity: { time: '', space: '' }, explanation: '' },
        optimal: { name: '', code: '', complexity: { time: '', space: '' }, explanation: '', whyOptimalIsPreferred: '', patternInvariant: '' },
        defaultInputDescription: '',
      };

      const config = getSimulatorConfigForProblem(p88);
      const fieldKeys = config.fields.map((f) => f.key);
      expect(fieldKeys).toContain('nums1');
      expect(fieldKeys).toContain('nums2');
      expect(fieldKeys).not.toContain('target'); // NO Two Sum target!
      expect(config.presets[0].values.m).toBe(3);
    });

    it('extracts non-Two-Sum fields for Problem 242 (Valid Anagram)', () => {
      const p242: LeetCodeProblem = {
        id: 242,
        slug: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        pattern: 'hashmap',
        category: 'Hashmap',
        statement: '',
        examples: [
          { input: 's = "anagram", t = "nagaram"', output: 'true' },
        ],
        constraints: [],
        bruteForce: { name: '', code: '', complexity: { time: '', space: '' }, explanation: '' },
        optimal: { name: '', code: '', complexity: { time: '', space: '' }, explanation: '', whyOptimalIsPreferred: '', patternInvariant: '' },
        defaultInputDescription: '',
      };

      const config = getSimulatorConfigForProblem(p242);
      const fieldKeys = config.fields.map((f) => f.key);
      expect(fieldKeys).toEqual(['s', 't']);
      expect(config.presets[0].values.s).toBe('anagram');
      expect(config.presets[0].values.t).toBe('nagaram');
    });
  });
});
