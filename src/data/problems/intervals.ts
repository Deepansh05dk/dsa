import type { LeetCodeProblem } from '../../types/problem';

export const intervalsProblems: LeetCodeProblem[] = [
  {
    id: 228,
    slug: 'summary-ranges',
    title: 'Summary Ranges',
    difficulty: 'Easy',
    pattern: 'intervals',
    category: 'Intervals',
    statement: 'You are given a sorted unique integer array nums. A range [a,b] is the set of all integers from a to b, inclusive. Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.',
    examples: [
      {
        input: 'nums = [0,1,2,4,5,7]',
        output: '["0->2","4->5","7"]',
        explanation: 'The ranges are: [0,2] --> "0->2", [4,5] --> "4->5", [7,7] --> "7".'
      },
      {
        input: 'nums = [0,2,3,4,6,8,9]',
        output: '["0","2->4","6","8->9"]'
      }
    ],
    constraints: [
      '0 <= nums.length <= 20',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'All the values of nums are unique.',
      'nums is sorted in ascending order.'
    ],
    bruteForce: {
      name: 'Nested Boundary Lookahead',
      code: `function summaryRangesBrute(nums: number[]): string[] {
  const res: string[] = [];
  let i = 0;
  while (i < nums.length) {
    let j = i;
    while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) {
      j++;
    }
    if (i === j) {
      res.push(\`\${nums[i]}\`);
    } else {
      res.push(\`\${nums[i]}->\${nums[j]}\`);
    }
    i = j + 1;
  }
  return res;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) extra'
      },
      explanation: 'Iterates through array, for each index expands forward while adjacent difference is 1.'
    },
    optimal: {
      name: 'Linear In-Place Two-Pointer Range Compression',
      code: `function summaryRanges(nums: number[]): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < nums.length) {
    const start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }
    const end = nums[i];
    if (start === end) {
      result.push(\`\${start}\`);
    } else {
      result.push(\`\${start}->\${end}\`);
    }
    i++;
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'Pin start of consecutive streak and advance pointer i until the next element is not nums[i] + 1. Format single value or interval string in a single linear pass.',
      whyOptimalIsPreferred: 'Direct single-pass execution in O(N) time with zero extra state allocations, processing every element once.',
      patternInvariant: 'Sequential contiguous streak condition: nums[i + 1] - nums[i] == 1.'
    },
    defaultInputDescription: 'nums = [0, 1, 2, 4, 5, 7]'
  },
  {
    id: 56,
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    pattern: 'intervals',
    category: 'Intervals',
    statement: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= starti <= endi <= 10^4'
    ],
    bruteForce: {
      name: 'Graph Connected Components Overlap Merge',
      code: `function mergeBrute(intervals: number[][]): number[][] {
  const n = intervals.length;
  const merged: boolean[] = new Array(n).fill(false);
  const result: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (merged[i]) continue;
    let [s, e] = intervals[i];
    let changed = true;
    while (changed) {
      changed = false;
      for (let j = 0; j < n; j++) {
        if (!merged[j] && j !== i) {
          if (Math.max(s, intervals[j][0]) <= Math.min(e, intervals[j][1])) {
            s = Math.min(s, intervals[j][0]);
            e = Math.max(e, intervals[j][1]);
            merged[j] = true;
            changed = true;
          }
        }
      }
    }
    result.push([s, e]);
  }
  return result;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly scans for pairwise overlaps in an unordered list until no further intervals can be merged together.'
    },
    optimal: {
      name: 'Sort by Start Time & Greedy Sweep',
      code: `function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N) for output and sorting'
      },
      explanation: 'Sort intervals by starting time. Then iterate: if the current interval starts before or at the end of the previous merged interval, extend the previous interval\'s end time. Otherwise, append the interval as a disjoint range.',
      whyOptimalIsPreferred: 'Sorting takes O(N log N) which transforms a quadratic pairwise overlap graph problem into an optimal single linear scan.',
      patternInvariant: 'Sorting by start time ensures that any interval that could possibly overlap with previous intervals is immediately adjacent in iteration.'
    },
    defaultInputDescription: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]'
  },
  {
    id: 57,
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    pattern: 'intervals',
    category: 'Intervals',
    statement: 'You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).',
    examples: [
      {
        input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]',
        output: '[[1,5],[6,9]]'
      },
      {
        input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]',
        output: '[[1,2],[3,10],[12,16]]',
        explanation: 'Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].'
      }
    ],
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= starti <= endi <= 10^5',
      'intervals is sorted by starti in ascending order.',
      'newInterval.length == 2',
      '0 <= start <= end <= 10^5'
    ],
    bruteForce: {
      name: 'Append and Full Re-Sort Merge',
      code: `function insertBrute(intervals: number[][], newInterval: number[]): number[][] {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      },
      explanation: 'Appends newInterval into list, re-sorts all N+1 elements, and performs full interval merging.'
    },
    optimal: {
      name: 'Three-Phase Linear Merge',
      code: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i = 0;
  const n = intervals.length;

  // Phase 1: Add all intervals ending before newInterval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: Merge overlapping intervals into newInterval
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Phase 3: Add all remaining intervals that start after newInterval ends
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N) for output'
      },
      explanation: 'Because intervals are already sorted, partition into 3 contiguous phases: strictly left, overlapping middle (merge into newInterval), and strictly right.',
      whyOptimalIsPreferred: 'Linear O(N) execution that avoids the O(N log N) re-sorting overhead by leveraging the pre-sorted invariant.',
      patternInvariant: 'Pre-sorted intervals can be processed in a single pass partitioned into three stages: left-disjoint, overlapping, and right-disjoint.'
    },
    defaultInputDescription: 'intervals = [[1, 3], [6, 9]], newInterval = [2, 5]'
  },
  {
    id: 452,
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    pattern: 'intervals',
    category: 'Intervals',
    statement: 'There are some spherical balloons taped to a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend]. An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. Find the minimum number of arrows that must be shot to burst all balloons.',
    examples: [
      {
        input: 'points = [[10,16],[2,8],[1,6],[7,12]]',
        output: '2',
        explanation: 'The balloons can be burst by 2 arrows: shoot at x = 6 (bursting [2,8] and [1,6]) and x = 11 (bursting [10,16] and [7,12]).'
      },
      {
        input: 'points = [[1,2],[3,4],[5,6],[7,8]]',
        output: '4'
      },
      {
        input: 'points = [[1,2],[2,3],[3,4],[4,5]]',
        output: '2'
      }
    ],
    constraints: [
      '1 <= points.length <= 10^5',
      'points[i].length == 2',
      '-2^31 <= xstart < xend <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Coordinate Intersections Backtracking',
      code: `function findMinArrowShotsBrute(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[0] - b[0]);
  let arrows = 0;
  const burst = new Array(points.length).fill(false);
  for (let i = 0; i < points.length; i++) {
    if (burst[i]) continue;
    arrows++;
    let arrowPos = points[i][1];
    for (let j = i; j < points.length; j++) {
      if (points[j][0] <= arrowPos) {
        arrowPos = Math.min(arrowPos, points[j][1]);
        burst[j] = true;
      }
    }
  }
  return arrows;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Simulates shooting arrows and updating intersecting boundaries across unburst balloons.'
    },
    optimal: {
      name: 'Greedy Interval End-Point Scheduling',
      code: `function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let prevEnd = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > prevEnd) {
      arrows++;
      prevEnd = points[i][1];
    }
  }

  return arrows;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'Sort balloons by end coordinate xend. Greedily shoot arrow at the earliest ending balloon\'s right edge. All overlapping balloons covering that position are burst. When a balloon begins strictly after that position, a new arrow must be shot.',
      whyOptimalIsPreferred: 'Reduces the interval covering problem to interval scheduling in O(N log N) time with O(1) space.',
      patternInvariant: 'Shooting at the earliest available interval end maximizes the greedy probability of bursting subsequent overlapping intervals.'
    },
    defaultInputDescription: 'points = [[10, 16], [2, 8], [1, 6], [7, 12]]'
  }
];
