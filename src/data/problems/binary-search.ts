import type { LeetCodeProblem } from '../../types/problem';

export const binarySearchProblems: LeetCodeProblem[] = [
  {
    id: 35,
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [1,3,5,6], target = 5',
        output: '2'
      },
      {
        input: 'nums = [1,3,5,6], target = 2',
        output: '1'
      },
      {
        input: 'nums = [1,3,5,6], target = 7',
        output: '4'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums contains distinct values sorted in ascending order.',
      '-10^4 <= target <= 10^4'
    ],
    bruteForce: {
      name: 'Linear Scan Insertion Search',
      code: `function searchInsertBrute(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) return i;
  }
  return nums.length;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Scans the array from left to right until encountering an element >= target.'
    },
    optimal: {
      name: 'Standard Binary Search (Lower Bound)',
      code: `function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'Binary search continuously halves the search interval. If target is not found, left pointer points to the exact insertion index where target belongs.',
      whyOptimalIsPreferred: 'Meets the mandatory O(log N) runtime requirement using constant O(1) space.',
      patternInvariant: 'Binary search convergence: when loop terminates without match, left points to the smallest index where nums[left] > target.'
    },
    defaultInputDescription: 'nums = [1, 3, 5, 6], target = 5'
  },
  {
    id: 74,
    slug: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.',
    examples: [
      {
        input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
        output: 'true'
      },
      {
        input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
        output: 'false'
      }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 100',
      '-10^4 <= matrix[i][j], target <= 10^4'
    ],
    bruteForce: {
      name: 'Exhaustive Matrix Traversal',
      code: `function searchMatrixBrute(matrix: number[][], target: number): boolean {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === target) return true;
    }
  }
  return false;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(1)'
      },
      explanation: 'Scans every cell of the matrix sequentially without using the sorted layout.'
    },
    optimal: {
      name: 'Virtual 1D Flattened Binary Search',
      code: `function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const midVal = matrix[row][col];

    if (midVal === target) {
      return true;
    } else if (midVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}`,
      complexity: {
        time: 'O(log(M * N))',
        space: 'O(1)'
      },
      explanation: 'Treat the m x n matrix as a virtual 1D sorted array of length m * n. Midpoint index mid maps to row = Math.floor(mid / n) and col = mid % n in O(1) arithmetic, enabling pure logarithmic binary search.',
      whyOptimalIsPreferred: 'Direct O(log(M*N)) search in a single pass without two-stage row and column binary searches.',
      patternInvariant: 'Row-major 2D mapping invariant: index k in flattened array maps to cell (floor(k / cols), k % cols).'
    },
    defaultInputDescription: 'matrix = 3x4 sorted matrix, target = 3'
  },
  {
    id: 162,
    slug: 'find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'Medium',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that nums[-1] = nums[n] = -infinity. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array. You must write an algorithm that runs in O(log n) time.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '2',
        explanation: '3 is a peak element and your function should return the index number 2.'
      },
      {
        input: 'nums = [1,2,1,3,5,6,4]',
        output: '5',
        explanation: 'Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 1000',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'nums[i] != nums[i + 1] for all valid i.'
    ],
    bruteForce: {
      name: 'Linear Neighbor Comparison',
      code: `function findPeakElementBrute(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    const left = i > 0 ? nums[i - 1] : -Infinity;
    const right = i < nums.length - 1 ? nums[i + 1] : -Infinity;
    if (nums[i] > left && nums[i] > right) return i;
  }
  return 0;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Scans each element comparing with its adjacent neighbors in linear time.'
    },
    optimal: {
      name: 'Gradient Binary Search (Ascending Slope Following)',
      code: `function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) {
      // Ascending slope: a peak is guaranteed to exist on the right
      left = mid + 1;
    } else {
      // Descending slope: mid itself could be the peak, or peak is on left
      right = mid;
    }
  }

  return left;
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'Compare nums[mid] with nums[mid + 1]. If nums[mid] < nums[mid + 1], slope is ascending, so a peak must exist on the right. If nums[mid] > nums[mid + 1], slope is descending, so a peak exists at mid or to the left.',
      whyOptimalIsPreferred: 'Satisfies the mandatory O(log N) logarithmic constraint on unsorted arrays by following the positive gradient.',
      patternInvariant: 'Gradient ascent invariant: following the ascending neighbor in an array bounded by -infinity always converges to a local peak.'
    },
    defaultInputDescription: 'nums = [1, 2, 3, 1]'
  },
  {
    id: 33,
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4'
      },
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 3',
        output: '-1'
      },
      {
        input: 'nums = [1], target = 0',
        output: '-1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.',
      '-10^4 <= target <= 10^4'
    ],
    bruteForce: {
      name: 'Linear Scan',
      code: `function searchBrute(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Iterate through each element linearly until target is found or array ends.'
    },
    optimal: {
      name: 'Modified Binary Search with Sorted Half Detection',
      code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'At any pivot point in a rotated sorted array, at least one half [left..mid] or [mid..right] is guaranteed to be strictly sorted. Determine which half is sorted, check if target lies within that range, and discard the other half.',
      whyOptimalIsPreferred: 'Preserves the logarithmic O(log N) speed of binary search despite the rotation.',
      patternInvariant: 'Even with rotation, dividing the array at any midpoint produces at least one normally ordered half.'
    },
    defaultInputDescription: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0'
  },
  {
    id: 34,
    slug: 'find-first-and-last-position-of-element-in-sorted-array',
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [5,7,7,8,8,10], target = 8',
        output: '[3,4]'
      },
      {
        input: 'nums = [5,7,7,8,8,10], target = 6',
        output: '[-1,-1]'
      },
      {
        input: 'nums = [], target = 0',
        output: '[-1,-1]'
      }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
      'nums is a non-decreasing array.',
      '-10^9 <= target <= 10^9'
    ],
    bruteForce: {
      name: 'Linear Scan for First and Last Occurrences',
      code: `function searchRangeBrute(nums: number[], target: number): number[] {
  let first = -1, last = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }
  return [first, last];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Scans the array linearly, recording the index of the first and last matches.'
    },
    optimal: {
      name: 'Dual Binary Search for Left and Right Boundaries',
      code: `function searchRange(nums: number[], target: number): number[] {
  function findBound(isFirst: boolean): number {
    let left = 0;
    let right = nums.length - 1;
    let bound = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) {
          right = mid - 1; // Continue searching left
        } else {
          left = mid + 1;  // Continue searching right
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return bound;
  }

  return [findBound(true), findBound(false)];
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'Run two separate binary searches: one with right = mid - 1 to find the leftmost boundary, and one with left = mid + 1 to find the rightmost boundary. Both complete in O(log N) time.',
      whyOptimalIsPreferred: 'Meets the O(log N) requirement, avoiding O(N) degradation when target elements repeat across the entire array.',
      patternInvariant: 'Binary search boundary bias: continuing the search inward after a match isolates exact left and right limits.'
    },
    defaultInputDescription: 'nums = [5, 7, 7, 8, 8, 10], target = 8'
  },
  {
    id: 153,
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
    examples: [
      {
        input: 'nums = [3,4,5,1,2]',
        output: '1',
        explanation: 'The original array was [1,2,3,4,5] rotated 3 times.'
      },
      {
        input: 'nums = [4,5,6,7,0,1,2]',
        output: '0',
        explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.'
      },
      {
        input: 'nums = [11,13,15,17]',
        output: '11'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.',
      'nums is sorted and rotated between 1 and n times.'
    ],
    bruteForce: {
      name: 'Linear Minimum Scan',
      code: `function findMinBrute(nums: number[]): number {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) min = Math.min(min, nums[i]);
  return min;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Linear scan finding minimum value in O(N) time.'
    },
    optimal: {
      name: 'Binary Search Against Rightmost Element',
      code: `function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      // Inflection point / minimum lies strictly to the right of mid
      left = mid + 1;
    } else {
      // Minimum is at mid or to the left of mid
      right = mid;
    }
  }

  return nums[left];
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the pivot/minimum must be strictly to the right of mid. Otherwise, the minimum is at mid or in the left half. Halves search space on every step.',
      whyOptimalIsPreferred: 'Logarithmic O(log N) search leveraging the sorted inflection point property in constant O(1) space.',
      patternInvariant: 'Rotated array inflection property: if nums[mid] > nums[right], the rotation break point is in (mid, right].'
    },
    defaultInputDescription: 'nums = [4, 5, 6, 7, 0, 1, 2]'
  },
  {
    id: 4,
    slug: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    pattern: 'binary-search',
    category: 'Binary Search',
    statement: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    bruteForce: {
      name: 'Merge and Sort (O(M + N))',
      code: `function findMedianSortedArraysBrute(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const n = merged.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 1 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;
}`,
      complexity: {
        time: 'O((M + N) log(M + N))',
        space: 'O(M + N)'
      },
      explanation: 'Merges both arrays, sorts them, and retrieves the median from the middle index.'
    },
    optimal: {
      name: 'Binary Search on Shorter Array Partition',
      code: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Ensure nums1 is the shorter array
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const maxLeft1 = (i === 0) ? -Infinity : nums1[i - 1];
    const minRight1 = (i === m) ? Infinity : nums1[i];

    const maxLeft2 = (j === 0) ? -Infinity : nums2[j - 1];
    const minRight2 = (j === n) ? Infinity : nums2[j];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 1) {
        return Math.max(maxLeft1, maxLeft2);
      }
      return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
    } else if (maxLeft1 > minRight2) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }

  return 0;
}`,
      complexity: {
        time: 'O(log(min(M, N)))',
        space: 'O(1)'
      },
      explanation: 'Partition nums1 at cut i and nums2 at cut j such that the left halves contain (m + n + 1)/2 elements. Binary search for i in [0, m]. When maxLeft1 <= minRight2 and maxLeft2 <= minRight1, the partition is correct and median is computed directly in O(1).',
      whyOptimalIsPreferred: 'Meets the strict O(log(min(M, N))) logarithmic bound without merging or allocating memory.',
      patternInvariant: 'Partition balance invariant: partition cuts partition the combined arrays into two equal-sized halves where all left elements <= all right elements.'
    },
    defaultInputDescription: 'nums1 = [1, 3], nums2 = [2]'
  }
];
