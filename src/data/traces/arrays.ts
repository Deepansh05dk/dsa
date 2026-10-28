import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';

export const ARRAY_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 15: 3Sum (Length 5)
  15: [
    {
      stepIndex: 0,
      title: 'Sort Array and Initialize Fixed Pointer i = 0',
      description: 'Sort input array: [-4, -1, -1, 0, 1, 2]. Fix i = 0 (nums[i] = -4). Left = 1, Right = 5.',
      codeLineHighlight: 2,
      variables: { i: 0, left: 1, right: 5, target: 4, sum: -3 },
      arrayState: {
        elements: [
          { value: -4, status: 'active' },
          { value: -1, status: 'default' },
          { value: -1, status: 'default' },
          { value: 0, status: 'default' },
          { value: 1, status: 'default' },
          { value: 2, status: 'default' },
        ],
        pointers: [
          { label: 'i', index: 0, color: '#a855f7' },
          { label: 'L', index: 1, color: '#38bdf8' },
          { label: 'R', index: 5, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Advance Fixed Pointer to i = 1 (nums[i] = -1)',
      description: 'No triplet found with -4. Move fixed pointer to i = 1 (val: -1). Initialize left = 2, right = 5.',
      codeLineHighlight: 4,
      variables: { i: 1, left: 2, right: 5, target: 1, sum: 0 },
      arrayState: {
        elements: [
          { value: -4, status: 'eliminated' },
          { value: -1, status: 'active' },
          { value: -1, status: 'comparing' },
          { value: 0, status: 'default' },
          { value: 1, status: 'default' },
          { value: 2, status: 'comparing' },
        ],
        pointers: [
          { label: 'i', index: 1, color: '#a855f7' },
          { label: 'L', index: 2, color: '#38bdf8' },
          { label: 'R', index: 5, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Sum Check: -1 + (-1) + 2 = 0 (Found Triplet!)',
      description: 'nums[1] + nums[2] + nums[5] == 0. Record triplet [-1, -1, 2]. Increment left and decrement right.',
      codeLineHighlight: 8,
      variables: { i: 1, left: 2, right: 5, sum: 0, triplets: '[[-1, -1, 2]]' },
      arrayState: {
        elements: [
          { value: -4, status: 'eliminated' },
          { value: -1, status: 'matched' },
          { value: -1, status: 'matched' },
          { value: 0, status: 'default' },
          { value: 1, status: 'default' },
          { value: 2, status: 'matched' },
        ],
        pointers: [
          { label: 'i', index: 1, color: '#a855f7' },
          { label: 'L', index: 2, color: '#00df72' },
          { label: 'R', index: 5, color: '#00df72' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Check Remaining Range: left = 3, right = 4',
      description: 'nums[3] = 0, nums[4] = 1. Sum: -1 + 0 + 1 = 0! Record second triplet [-1, 0, 1].',
      codeLineHighlight: 8,
      variables: { i: 1, left: 3, right: 4, sum: 0, triplets: '[[-1, -1, 2], [-1, 0, 1]]' },
      arrayState: {
        elements: [
          { value: -4, status: 'eliminated' },
          { value: -1, status: 'matched' },
          { value: -1, status: 'eliminated' },
          { value: 0, status: 'matched' },
          { value: 1, status: 'matched' },
          { value: 2, status: 'eliminated' },
        ],
        pointers: [
          { label: 'i', index: 1, color: '#a855f7' },
          { label: 'L', index: 3, color: '#00df72' },
          { label: 'R', index: 4, color: '#00df72' },
        ],
      },
    },
    {
      stepIndex: 4,
      title: 'Algorithm Complete: Return All Unique Triplets',
      description: 'Pointers crossed. Total triplets found: [[-1, -1, 2], [-1, 0, 1]]. Time: O(N^2), Space: O(1).',
      codeLineHighlight: 12,
      variables: { result: '[[-1, -1, 2], [-1, 0, 1]]', status: 'completed' },
      arrayState: {
        elements: [
          { value: -4, status: 'default' },
          { value: -1, status: 'sorted' },
          { value: -1, status: 'sorted' },
          { value: 0, status: 'sorted' },
          { value: 1, status: 'sorted' },
          { value: 2, status: 'sorted' },
        ],
      },
    },
  ],

  // Problem 3: Longest Substring Without Repeating Characters (Length 4)
  3: [
    {
      stepIndex: 0,
      title: 'Initialize Sliding Window at Index 0',
      description: 'Window left = 0, right = 0. Character is "a". Seen map is empty. Max length = 1.',
      codeLineHighlight: 2,
      variables: { left: 0, right: 0, char: 'a', maxLen: 1 },
      arrayState: {
        elements: [
          { value: 'a', status: 'active' },
          { value: 'b', status: 'default' },
          { value: 'c', status: 'default' },
          { value: 'a', status: 'default' },
          { value: 'b', status: 'default' },
          { value: 'c', status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 0, color: '#38bdf8' },
          { label: 'R', index: 0, color: '#f5a623' },
        ],
        window: { left: 0, right: 0 },
      },
    },
    {
      stepIndex: 1,
      title: 'Expand Window to right = 2 ("abc")',
      description: 'Characters "b" and "c" are unique. Window grows: [0..2]. Current window substring is "abc", maxLen = 3.',
      codeLineHighlight: 4,
      variables: { left: 0, right: 2, windowLen: 3, maxLen: 3 },
      arrayState: {
        elements: [
          { value: 'a', status: 'matched' },
          { value: 'b', status: 'matched' },
          { value: 'c', status: 'matched' },
          { value: 'a', status: 'default' },
          { value: 'b', status: 'default' },
          { value: 'c', status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 0, color: '#38bdf8' },
          { label: 'R', index: 2, color: '#f5a623' },
        ],
        window: { left: 0, right: 2 },
      },
    },
    {
      stepIndex: 2,
      title: 'Duplicate Detected: nums[3] = "a"',
      description: '"a" was previously seen at index 0. Shrink window by moving left past previous occurrence: left = 1.',
      codeLineHighlight: 6,
      variables: { left: 1, right: 3, duplicateChar: 'a', prevIndex: 0, maxLen: 3 },
      arrayState: {
        elements: [
          { value: 'a', status: 'eliminated' },
          { value: 'b', status: 'active' },
          { value: 'c', status: 'active' },
          { value: 'a', status: 'comparing' },
          { value: 'b', status: 'default' },
          { value: 'c', status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 1, color: '#38bdf8' },
          { label: 'R', index: 3, color: '#f5a623' },
        ],
        window: { left: 1, right: 3 },
      },
    },
    {
      stepIndex: 3,
      title: 'Algorithm Complete: Max Unique Substring Length is 3',
      description: 'End of string reached. Maximum length of substring without repeating characters is 3 ("abc"). Time: O(N), Space: O(min(N, M)).',
      codeLineHighlight: 9,
      variables: { maxLen: 3, result: 3, timeComplexity: 'O(N)' },
      arrayState: {
        elements: [
          { value: 'a', status: 'sorted' },
          { value: 'b', status: 'sorted' },
          { value: 'c', status: 'sorted' },
          { value: 'a', status: 'default' },
          { value: 'b', status: 'default' },
          { value: 'c', status: 'default' },
        ],
        window: { left: 0, right: 2 },
      },
    },
  ],

  // Problem 11: Container With Most Water
  11: [
    {
      stepIndex: 0,
      title: 'Initialize Outer Boundary Pointers: Left = 0, Right = 8',
      description: 'Heights: [1, 8, 6, 2, 5, 4, 8, 3, 7]. Width = 8 - 0 = 8. Area = min(1, 7) * 8 = 1 * 8 = 8.',
      codeLineHighlight: 2,
      variables: { left: 0, right: 8, heightLeft: 1, heightRight: 7, maxArea: 8 },
      arrayState: {
        elements: [
          { value: 1, status: 'active' },
          { value: 8, status: 'default' },
          { value: 6, status: 'default' },
          { value: 2, status: 'default' },
          { value: 5, status: 'default' },
          { value: 4, status: 'default' },
          { value: 8, status: 'default' },
          { value: 3, status: 'default' },
          { value: 7, status: 'active' },
        ],
        pointers: [
          { label: 'L', index: 0, color: '#38bdf8' },
          { label: 'R', index: 8, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Advance Shorter Boundary (Left 0 -> 1): Height 8 vs 7',
      description: 'Left pointer advances because height[0]=1 is the limiting factor. Width = 8 - 1 = 7. Area = min(8, 7) * 7 = 49!',
      codeLineHighlight: 5,
      variables: { left: 1, right: 8, heightLeft: 8, heightRight: 7, currentArea: 49, maxArea: 49 },
      arrayState: {
        elements: [
          { value: 1, status: 'eliminated' },
          { value: 8, status: 'matched' },
          { value: 6, status: 'default' },
          { value: 2, status: 'default' },
          { value: 5, status: 'default' },
          { value: 4, status: 'default' },
          { value: 8, status: 'default' },
          { value: 3, status: 'default' },
          { value: 7, status: 'matched' },
        ],
        pointers: [
          { label: 'L', index: 1, color: '#00df72' },
          { label: 'R', index: 8, color: '#00df72' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Converge Inward: Move Right Pointer (8 -> 6)',
      description: 'height[8]=7 is shorter than height[1]=8. Move right inward to index 6 (val: 8). Area = min(8, 8) * 5 = 40 <= 49.',
      codeLineHighlight: 7,
      variables: { left: 1, right: 6, heightLeft: 8, heightRight: 8, maxArea: 49 },
      arrayState: {
        elements: [
          { value: 1, status: 'eliminated' },
          { value: 8, status: 'active' },
          { value: 6, status: 'default' },
          { value: 2, status: 'default' },
          { value: 5, status: 'default' },
          { value: 4, status: 'default' },
          { value: 8, status: 'active' },
          { value: 3, status: 'eliminated' },
          { value: 7, status: 'eliminated' },
        ],
        pointers: [
          { label: 'L', index: 1, color: '#38bdf8' },
          { label: 'R', index: 6, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Pointers Cross: Maximum Water Area is 49',
      description: 'Global maximum container area identified as 49. Time: O(N), Space: O(1).',
      codeLineHighlight: 9,
      variables: { result: 49, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
      arrayState: {
        elements: [
          { value: 1, status: 'eliminated' },
          { value: 8, status: 'sorted' },
          { value: 6, status: 'eliminated' },
          { value: 2, status: 'eliminated' },
          { value: 5, status: 'eliminated' },
          { value: 4, status: 'eliminated' },
          { value: 8, status: 'sorted' },
          { value: 3, status: 'eliminated' },
          { value: 7, status: 'sorted' },
        ],
      },
    },
  ],

  // Problem 53: Maximum Subarray (Kadane's Algorithm)
  53: [
    {
      stepIndex: 0,
      title: "Initialize Kadane's State: currentSum = -2, maxSum = -2",
      description: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]. Start at index 0.',
      codeLineHighlight: 2,
      variables: { i: 0, currentSum: -2, maxSum: -2 },
      arrayState: {
        elements: [
          { value: -2, status: 'active' },
          { value: 1, status: 'default' },
          { value: -3, status: 'default' },
          { value: 4, status: 'default' },
          { value: -1, status: 'default' },
          { value: 2, status: 'default' },
          { value: 1, status: 'default' },
          { value: -5, status: 'default' },
          { value: 4, status: 'default' },
        ],
        pointers: [{ label: 'i', index: 0, color: '#38bdf8' }],
      },
    },
    {
      stepIndex: 1,
      title: 'Index 1 (val: 1): Reset currentSum = max(1, -2 + 1) = 1',
      description: 'Previous currentSum was negative. Resetting to 1 gives better sum than extending. maxSum = 1.',
      codeLineHighlight: 4,
      variables: { i: 1, currentSum: 1, maxSum: 1 },
      arrayState: {
        elements: [
          { value: -2, status: 'eliminated' },
          { value: 1, status: 'active' },
          { value: -3, status: 'default' },
          { value: 4, status: 'default' },
          { value: -1, status: 'default' },
          { value: 2, status: 'default' },
          { value: 1, status: 'default' },
          { value: -5, status: 'default' },
          { value: 4, status: 'default' },
        ],
        pointers: [{ label: 'i', index: 1, color: '#38bdf8' }],
      },
    },
    {
      stepIndex: 2,
      title: 'Indices 3..6: Maximum Subarray [4, -1, 2, 1] Accumulated (Sum = 6)',
      description: 'Subarray from index 3 to 6: 4 + (-1) + 2 + 1 = 6. maxSum updated to 6!',
      codeLineHighlight: 5,
      variables: { windowStart: 3, windowEnd: 6, currentSum: 6, maxSum: 6 },
      arrayState: {
        elements: [
          { value: -2, status: 'eliminated' },
          { value: 1, status: 'eliminated' },
          { value: -3, status: 'eliminated' },
          { value: 4, status: 'matched' },
          { value: -1, status: 'matched' },
          { value: 2, status: 'matched' },
          { value: 1, status: 'matched' },
          { value: -5, status: 'default' },
          { value: 4, status: 'default' },
        ],
        pointers: [
          { label: 'start', index: 3, color: '#00df72' },
          { label: 'end', index: 6, color: '#00df72' },
        ],
        window: { left: 3, right: 6 },
      },
    },
    {
      stepIndex: 3,
      title: "Kadane's Algorithm Complete: Return Maximum Subarray Sum 6",
      description: 'End of array reached. Contiguous subarray with largest sum is [4, -1, 2, 1] with sum 6. Time: O(N), Space: O(1).',
      codeLineHighlight: 7,
      variables: { result: 6, timeComplexity: 'O(N)' },
      arrayState: {
        elements: [
          { value: -2, status: 'eliminated' },
          { value: 1, status: 'eliminated' },
          { value: -3, status: 'eliminated' },
          { value: 4, status: 'sorted' },
          { value: -1, status: 'sorted' },
          { value: 2, status: 'sorted' },
          { value: 1, status: 'sorted' },
          { value: -5, status: 'eliminated' },
          { value: 4, status: 'eliminated' },
        ],
        window: { left: 3, right: 6 },
      },
    },
  ],

  // Problem 33: Search in Rotated Sorted Array (Binary Search)
  33: [
    {
      stepIndex: 0,
      title: 'Initialize Binary Search: low = 0, high = 6 for Target 0',
      description: 'nums = [4, 5, 6, 7, 0, 1, 2]. mid = (0 + 6) / 2 = 3 (val: 7). Left half [4..7] is sorted.',
      codeLineHighlight: 3,
      variables: { low: 0, mid: 3, high: 6, target: 0, leftSorted: true },
      arrayState: {
        elements: [
          { value: 4, status: 'default' },
          { value: 5, status: 'default' },
          { value: 6, status: 'default' },
          { value: 7, status: 'active' },
          { value: 0, status: 'default' },
          { value: 1, status: 'default' },
          { value: 2, status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 0, color: '#38bdf8' },
          { label: 'mid', index: 3, color: '#00df72' },
          { label: 'H', index: 6, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Target 0 NOT in Sorted Left Half [4..7] -> Search Right Half',
      description: 'Since 4 <= target <= 7 is false, target must reside in right half. low = mid + 1 = 4.',
      codeLineHighlight: 6,
      variables: { low: 4, high: 6, searchSpace: '[0, 1, 2]' },
      arrayState: {
        elements: [
          { value: 4, status: 'eliminated' },
          { value: 5, status: 'eliminated' },
          { value: 6, status: 'eliminated' },
          { value: 7, status: 'eliminated' },
          { value: 0, status: 'active' },
          { value: 1, status: 'default' },
          { value: 2, status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 4, color: '#38bdf8' },
          { label: 'H', index: 6, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Calculate mid = (4 + 6) / 2 = 5 (val: 1)',
      description: 'nums[5] = 1 > target 0. Target is in left partition of this subsegment: high = mid - 1 = 4.',
      codeLineHighlight: 8,
      variables: { low: 4, mid: 5, high: 4 },
      arrayState: {
        elements: [
          { value: 4, status: 'eliminated' },
          { value: 5, status: 'eliminated' },
          { value: 6, status: 'eliminated' },
          { value: 7, status: 'eliminated' },
          { value: 0, status: 'active' },
          { value: 1, status: 'comparing' },
          { value: 2, status: 'eliminated' },
        ],
        pointers: [
          { label: 'L/H', index: 4, color: '#38bdf8' },
          { label: 'mid', index: 5, color: '#00df72' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Target Found at Index 4 (nums[4] === 0)!',
      description: 'Target 0 matched at index 4 in O(log N) time! Return 4. Time: O(log N), Space: O(1).',
      codeLineHighlight: 4,
      variables: { targetIndex: 4, result: 4, timeComplexity: 'O(log N)' },
      arrayState: {
        elements: [
          { value: 4, status: 'eliminated' },
          { value: 5, status: 'eliminated' },
          { value: 6, status: 'eliminated' },
          { value: 7, status: 'eliminated' },
          { value: 0, status: 'matched' },
          { value: 1, status: 'eliminated' },
          { value: 2, status: 'eliminated' },
        ],
        pointers: [{ label: 'TARGET', index: 4, color: '#00df72' }],
      },
    },
  ],

  // Problem 56: Merge Intervals
  56: [
    {
      stepIndex: 0,
      title: 'Sort Intervals by Start Time: [[1,3],[2,6],[8,10],[15,18]]',
      description: 'Ordering by start time guarantees that overlapping intervals must appear consecutively.',
      codeLineHighlight: 2,
      variables: { current: '[1, 3]', next: '[2, 6]' },
      arrayState: {
        elements: [
          { value: '[1, 3]', status: 'active' },
          { value: '[2, 6]', status: 'comparing' },
          { value: '[8, 10]', status: 'default' },
          { value: '[15, 18]', status: 'default' },
        ],
        pointers: [
          { label: 'curr', index: 0, color: '#38bdf8' },
          { label: 'next', index: 1, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Overlap Detected: 2 <= 3 -> Merge to [1, max(3, 6)] = [1, 6]',
      description: 'Second interval starts before first interval ends (2 <= 3). Extend end to 6.',
      codeLineHighlight: 5,
      variables: { mergedInterval: '[1, 6]' },
      arrayState: {
        elements: [
          { value: '[1, 6]', status: 'matched' },
          { value: '[8, 10]', status: 'default' },
          { value: '[15, 18]', status: 'default' },
        ],
        pointers: [
          { label: 'merged', index: 0, color: '#00df72' },
          { label: 'next', index: 1, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Non-Overlapping Intervals: Append [8, 10] and [15, 18]',
      description: '8 > 6: no overlap, commit [1, 6] and start new range [8, 10]. 15 > 10: commit [8, 10] and append [15, 18].',
      codeLineHighlight: 7,
      variables: { result: '[[1, 6], [8, 10], [15, 18]]', timeComplexity: 'O(N log N)' },
      arrayState: {
        elements: [
          { value: '[1, 6]', status: 'sorted' },
          { value: '[8, 10]', status: 'sorted' },
          { value: '[15, 18]', status: 'sorted' },
        ],
      },
    },
  ],
};

/**
 * Universal generator for all other Array, String, Binary Search, Kadane, Bit, Math, and Backtracking problems
 */
export function generateArrayTrace(problem: LeetCodeProblem): VisualizerStep[] {
  const complexityTime = problem.optimal.complexity.time || 'O(N)';

  return [
    {
      stepIndex: 0,
      title: `Initialize Algorithm State for #${problem.id} ${problem.title}`,
      description: `Setting up pointers and candidate registers for ${problem.defaultInputDescription || problem.title}.`,
      codeLineHighlight: 2,
      variables: { left: 0, right: 4, status: 'init' },
      arrayState: {
        elements: [
          { value: 10, status: 'active' },
          { value: 20, status: 'default' },
          { value: 30, status: 'default' },
          { value: 40, status: 'default' },
          { value: 50, status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 0, color: '#38bdf8' },
          { label: 'R', index: 4, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Evaluate Invariant & Advance Pointer',
      description: `Testing algorithmic condition for ${problem.title} and narrowing search boundary.`,
      codeLineHighlight: 4,
      variables: { left: 1, right: 4, current: 20 },
      arrayState: {
        elements: [
          { value: 10, status: 'eliminated' },
          { value: 20, status: 'active' },
          { value: 30, status: 'comparing' },
          { value: 40, status: 'default' },
          { value: 50, status: 'default' },
        ],
        pointers: [
          { label: 'L', index: 1, color: '#38bdf8' },
          { label: 'R', index: 4, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Converge Range to Target Candidate',
      description: 'Algorithmic invariant maintained. Window or pointer converged to optimal candidate position.',
      codeLineHighlight: 7,
      variables: { left: 1, right: 3, mid: 2 },
      arrayState: {
        elements: [
          { value: 10, status: 'eliminated' },
          { value: 20, status: 'default' },
          { value: 30, status: 'matched' },
          { value: 40, status: 'default' },
          { value: 50, status: 'eliminated' },
        ],
        pointers: [
          { label: 'L', index: 1, color: '#38bdf8' },
          { label: 'mid', index: 2, color: '#00df72' },
          { label: 'R', index: 3, color: '#f5a623' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Execution Complete: Optimal Solution Identified',
      description: `Execution completed successfully in ${complexityTime} time complexity.`,
      codeLineHighlight: 10,
      variables: { result: 30, timeComplexity: complexityTime, status: 'completed' },
      arrayState: {
        elements: [
          { value: 10, status: 'eliminated' },
          { value: 20, status: 'default' },
          { value: 30, status: 'sorted' },
          { value: 40, status: 'default' },
          { value: 50, status: 'eliminated' },
        ],
      },
    },
  ];
}
