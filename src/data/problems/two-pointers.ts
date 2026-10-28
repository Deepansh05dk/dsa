import type { LeetCodeProblem } from '../../types/problem';

export const twoPointersProblems: LeetCodeProblem[] = [
  {
    id: 125,
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'two-pointers',
    category: 'Two Pointers',
    statement: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    bruteForce: {
      name: 'Filter and Reverse String',
      code: `function isPalindromeBrute(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = clean.split('').reverse().join('');
  return clean === reversed;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Cleans the string by converting to lowercase and stripping non-alphanumeric characters with regex, reverses the cleaned string, and checks for strict equality.'
    },
    optimal: {
      name: 'In-Place Inward Two Pointers',
      code: `function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  const isAlphaNum = (c: string) => /[a-z0-9]/i.test(c);

  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Pointers start at the extremes and converge inward, skipping non-alphanumeric characters on the fly and comparing corresponding valid characters without extra memory allocations.',
      whyOptimalIsPreferred: 'Requires zero additional heap memory allocations and aborts immediately on the first mismatch, whereas the filter-and-reverse approach always processes the entire string and creates multiple intermediate string copies.',
      patternInvariant: 'Palindromic symmetry requires s[left] == s[right] for all valid pairs converging symmetrically toward the center.'
    },
    defaultInputDescription: 's = "A man, a plan, a canal: Panama"'
  },
  {
    id: 392,
    slug: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'Easy',
    pattern: 'two-pointers',
    category: 'Two Pointers',
    statement: 'Given two strings s and t, return true if s is a subsequence of t, or false otherwise. A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.',
    examples: [
      {
        input: 's = "abc", t = "ahbgdc"',
        output: 'true'
      },
      {
        input: 's = "axc", t = "ahbgdc"',
        output: 'false'
      }
    ],
    constraints: [
      '0 <= s.length <= 100',
      '0 <= t.length <= 10^4',
      's and t consist only of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Exponential Subsequence Generation',
      code: `function isSubsequenceBrute(s: string, t: string): boolean {
  function generate(idx: number, current: string): boolean {
    if (current === s) return true;
    if (idx >= t.length) return false;
    return generate(idx + 1, current + t[idx]) || generate(idx + 1, current);
  }
  return generate(0, '');
}`,
      complexity: {
        time: 'O(2^|t|)',
        space: 'O(|t|)'
      },
      explanation: 'Recursively branches at every character of t, deciding whether to include or exclude it, and tests if any generated subsequence matches s.'
    },
    optimal: {
      name: 'Greedy Two-Pointer Scan',
      code: `function isSubsequence(s: string, t: string): boolean {
  let pS = 0;
  let pT = 0;
  while (pS < s.length && pT < t.length) {
    if (s[pS] === t[pT]) {
      pS++;
    }
    pT++;
  }
  return pS === s.length;
}`,
      complexity: {
        time: 'O(|t|)',
        space: 'O(1)'
      },
      explanation: 'Advance pointer pT across t continuously. Whenever t[pT] matches the character s[pS], advance pS. If pS traverses all of s, s is a valid subsequence.',
      whyOptimalIsPreferred: 'Linear time scan in O(1) extra space because greedily matching the earliest occurrence of each character leaves maximum room for subsequent characters.',
      patternInvariant: 'Order preservation invariant: greedily consuming the earliest matching symbol is strictly optimal for subsequence validation.'
    },
    defaultInputDescription: 's = "abc", t = "ahbgdc"'
  },
  {
    id: 167,
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    pattern: 'two-pointers',
    category: 'Two Pointers',
    statement: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.',
    examples: [
      {
        input: 'numbers = [2,7,11,15], target = 9',
        output: '[1,2]',
        explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].'
      },
      {
        input: 'numbers = [2,3,4], target = 6',
        output: '[1,3]'
      }
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order.',
      '-1000 <= target <= 1000',
      'The tests are generated such that there is exactly one solution.'
    ],
    bruteForce: {
      name: 'Nested Loop Exhaustive Pair Search',
      code: `function twoSumBrute(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
    }
  }
  return [];
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Inspects all possible pairs using two nested loops without taking advantage of the sorted ordering.'
    },
    optimal: {
      name: 'Converging Boundary Two Pointers',
      code: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Initialize left at start and right at end. If their sum is below target, increment left to increase sum; if above target, decrement right to decrease sum.',
      whyOptimalIsPreferred: 'Exploits the array sortedness to eliminate quadratic search and hash map allocations, operating in O(N) time and strictly O(1) space.',
      patternInvariant: 'Monotonic sum behavior in sorted array: increasing left increases sum, decreasing right decreases sum.'
    },
    defaultInputDescription: 'numbers = [2, 7, 11, 15], target = 9'
  },
  {
    id: 11,
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    pattern: 'two-pointers',
    category: 'Two Pointers',
    statement: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.'
      },
      {
        input: 'height = [1,1]',
        output: '1'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    bruteForce: {
      name: 'All Pair Boundary Area Scan',
      code: `function maxAreaBrute(height: number[]): number {
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      max = Math.max(max, area);
    }
  }
  return max;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Calculates area for all N*(N-1)/2 possible boundary line combinations and keeps track of the maximum area seen.'
    },
    optimal: {
      name: 'Shrinking Inward Two Pointers',
      code: `function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, width * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Start with the widest container at the ends. The water capacity is limited by the shorter line, so moving the shorter pointer inward is the only choice that could potentially yield a greater height that compensates for the decreased width.',
      whyOptimalIsPreferred: 'Reduces an O(N^2) pairwise evaluation to O(N) by systematically pruning lines that cannot possibly yield a larger area than the current maximum.',
      patternInvariant: 'Capacity bottleneck is min(h[left], h[right]); advancing the shorter line is the only way to find a taller boundary.'
    },
    defaultInputDescription: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]'
  },
  {
    id: 15,
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    pattern: 'two-pointers',
    category: 'Two Pointers',
    statement: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. Distinct triplets are [-1, -1, 2] and [-1, 0, 1].'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    bruteForce: {
      name: 'Cubic Triple Loop & Set Deduplication',
      code: `function threeSumBruteForce(nums: number[]): number[][] {
  const n = nums.length;
  const set = new Set<string>();
  const res: number[][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const trip = [nums[i], nums[j], nums[k]].sort((a,b) => a-b);
          const key = trip.join(',');
          if (!set.has(key)) {
            set.add(key);
            res.push(trip);
          }
        }
      }
    }
  }
  return res;
}`,
      complexity: {
        time: 'O(N^3)',
        space: 'O(N)'
      },
      explanation: 'Inspect all three-element combinations and insert sorted triplets into a Set to prune duplicate combinations.'
    },
    optimal: {
      name: 'Sort & Converging Two Pointers',
      code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1) extra'
      },
      explanation: 'Sort array first. Fix element i and use two pointers (left and right) to locate pairs summing to -nums[i]. Skip duplicates for i, left, and right to avoid redundant answers.',
      whyOptimalIsPreferred: 'Sorting takes O(N log N) which allows reducing the search from O(N^3) to O(N^2) using monotonicity, while skipping duplicate values directly eliminates expensive set hashing.',
      patternInvariant: 'In a sorted array, the sum of two pointers moves monotonically with their positions, allowing search space pruning in O(1).'
    },
    defaultInputDescription: 'nums = [-1, 0, 1, 2, -1, -4]'
  }
];
