import type { LeetCodeProblem } from '../../types/problem';

export const slidingWindowProblems: LeetCodeProblem[] = [
  {
    id: 209,
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    pattern: 'sliding-window',
    category: 'Sliding Window',
    statement: 'Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.',
    examples: [
      {
        input: 'target = 7, nums = [2,3,1,2,4,3]',
        output: '2',
        explanation: 'The subarray [4,3] has the minimal length under the problem constraint.'
      },
      {
        input: 'target = 4, nums = [1,4,4]',
        output: '1'
      },
      {
        input: 'target = 11, nums = [1,1,1,1,1,1,1,1]',
        output: '0'
      }
    ],
    constraints: [
      '1 <= target <= 10^9',
      '1 <= nums.length <= 10^5',
      '1 <= nums[i] <= 10^4'
    ],
    bruteForce: {
      name: 'All Subarrays Summation',
      code: `function minSubArrayLenBrute(target: number, nums: number[]): number {
  let minLen = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Iterates through each starting index and computes prefix sums until target is met, updating min length.'
    },
    optimal: {
      name: 'Dynamic Expanding/Shrinking Window',
      code: `function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Expand window by adding nums[right]. Whenever sum meets or exceeds target, contract window from left to find minimal valid length. Each element enters and exits the window at most once.',
      whyOptimalIsPreferred: 'Linear O(N) execution compared to quadratic O(N^2) pairwise evaluation because both left and right pointers only move forward.',
      patternInvariant: 'Monotonic sum expansion: all elements are positive, so expanding right strictly increases sum and contracting left strictly decreases sum.'
    },
    defaultInputDescription: 'target = 7, nums = [2, 3, 1, 2, 4, 3]'
  },
  {
    id: 3,
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    pattern: 'sliding-window',
    category: 'Sliding Window',
    statement: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    bruteForce: {
      name: 'All Substring Uniqueness Check',
      code: `function lengthOfLongestSubstringBrute(s: string): number {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set<string>();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(min(N, M))'
      },
      explanation: 'Iterate over all possible starting positions and expand until encountering a repeated character.'
    },
    optimal: {
      name: 'Sliding Window with Last Index Map',
      code: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char)! >= left) {
      left = map.get(char)! + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(min(N, M))'
      },
      explanation: 'Maintain a window [left, right]. When character at right has been seen within current window, jump left pointer to previous position + 1 immediately.',
      whyOptimalIsPreferred: 'Processes each character at most twice (or jumps directly via index map), completing in strict O(N) time instead of O(N^2).',
      patternInvariant: 'Sliding window validity: maintain a non-repeating invariant; when violated, contract left boundary until restored.'
    },
    defaultInputDescription: 's = "abcabcbb"'
  },
  {
    id: 30,
    slug: 'substring-with-concatenation-of-all-words',
    title: 'Substring with Concatenation of All Words',
    difficulty: 'Hard',
    pattern: 'sliding-window',
    category: 'Sliding Window',
    statement: 'You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated. Return an array of the starting indices of all the concatenated substrings in s.',
    examples: [
      {
        input: 's = "barfoothefoobarman", words = ["foo","bar"]',
        output: '[0,9]',
        explanation: 'Substrings starting at 0 and 9 are "barfoo" and "foobar" respectively.'
      },
      {
        input: 's = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]',
        output: '[]'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      '1 <= words.length <= 5000',
      '1 <= words[i].length <= 30',
      's and words[i] consist of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Naive Frequency Count at Every Index',
      code: `function findSubstringBrute(s: string, words: string[]): number[] {
  const wordLen = words[0].length;
  const totalLen = words.length * wordLen;
  const wordCount = new Map<string, number>();
  for (const w of words) wordCount.set(w, (wordCount.get(w) || 0) + 1);

  const res: number[] = [];
  for (let i = 0; i <= s.length - totalLen; i++) {
    const seen = new Map<string, number>();
    let j = 0;
    while (j < words.length) {
      const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);
      if (!wordCount.has(word)) break;
      seen.set(word, (seen.get(word) || 0) + 1);
      if (seen.get(word)! > wordCount.get(word)!) break;
      j++;
    }
    if (j === words.length) res.push(i);
  }
  return res;
}`,
      complexity: {
        time: 'O(|s| * K * L)',
        space: 'O(K * L)'
      },
      explanation: 'At each character position i in s, slice K chunks of length L and verify if their frequency matches words array.'
    },
    optimal: {
      name: 'Chunked Multi-Offset Sliding Window',
      code: `function findSubstring(s: string, words: string[]): number[] {
  const wordLen = words[0].length;
  const numWords = words.length;
  const totalLen = wordLen * numWords;
  if (s.length < totalLen) return [];

  const wordCount = new Map<string, number>();
  for (const w of words) wordCount.set(w, (wordCount.get(w) || 0) + 1);

  const result: number[] = [];
  for (let offset = 0; offset < wordLen; offset++) {
    let left = offset;
    let right = offset;
    const currentCount = new Map<string, number>();
    let matchedWords = 0;

    while (right + wordLen <= s.length) {
      const w = s.substring(right, right + wordLen);
      right += wordLen;

      if (wordCount.has(w)) {
        currentCount.set(w, (currentCount.get(w) || 0) + 1);
        matchedWords++;
        while (currentCount.get(w)! > wordCount.get(w)!) {
          const leftWord = s.substring(left, left + wordLen);
          currentCount.set(leftWord, currentCount.get(leftWord)! - 1);
          matchedWords--;
          left += wordLen;
        }
        if (matchedWords === numWords) {
          result.push(left);
        }
      } else {
        currentCount.clear();
        matchedWords = 0;
        left = right;
      }
    }
  }
  return result;
}`,
      complexity: {
        time: 'O(wordLen * (|s| / wordLen)) = O(|s|)',
        space: 'O(words.length * wordLen)'
      },
      explanation: 'Run wordLen separate sliding window passes with start offsets from 0 to wordLen - 1. Each pass moves in chunks of wordLen, shifting left and right in amortized linear time.',
      whyOptimalIsPreferred: 'Eliminates redundant substring comparisons by reusing word frequencies across sliding windows, lowering complexity to O(|s|).',
      patternInvariant: 'Partition the search by word length modulo offsets, treating each offset as an independent token sequence.'
    },
    defaultInputDescription: 's = "barfoothefoobarman", words = ["foo", "bar"]'
  },
  {
    id: 76,
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    pattern: 'sliding-window',
    category: 'Sliding Window',
    statement: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.'
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"'
      },
      {
        input: 's = "a", t = "aa"',
        output: '""',
        explanation: 'Both \'a\'s from t must be included in the window, so no valid substring exists.'
      }
    ],
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    bruteForce: {
      name: 'All Substrings Verification',
      code: `function minWindowBrute(s: string, t: string): string {
  let minStr = '';
  let minLen = Infinity;
  const tMap = new Map<string, number>();
  for (const c of t) tMap.set(c, (tMap.get(c) || 0) + 1);

  for (let i = 0; i < s.length; i++) {
    const sMap = new Map<string, number>();
    for (let j = i; j < s.length; j++) {
      sMap.set(s[j], (sMap.get(s[j]) || 0) + 1);
      let valid = true;
      for (const [k, v] of tMap) {
        if ((sMap.get(k) || 0) < v) { valid = false; break; }
      }
      if (valid && (j - i + 1) < minLen) {
        minLen = j - i + 1;
        minStr = s.substring(i, j + 1);
        break;
      }
    }
  }
  return minStr;
}`,
      complexity: {
        time: 'O(|s|^2 * |t|)',
        space: 'O(|s| + |t|)'
      },
      explanation: 'Evaluates all substrings of s and checks if each contains required character counts from t.'
    },
    optimal: {
      name: 'Two-Pointer Sliding Window with Character Deficit Counter',
      code: `function minWindow(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return '';
  const targetMap = new Map<string, number>();
  for (const c of t) targetMap.set(c, (targetMap.get(c) || 0) + 1);

  let left = 0;
  let minLeft = 0;
  let minLen = Infinity;
  let count = targetMap.size;
  const windowMap = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
      count--;
    }

    while (count === 0) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minLeft = left;
      }
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar)! - 1);
      if (targetMap.has(leftChar) && windowMap.get(leftChar)! < targetMap.get(leftChar)!) {
        count++;
      }
      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minLeft, minLeft + minLen);
}`,
      complexity: {
        time: 'O(|s| + |t|)',
        space: 'O(|s| + |t|)'
      },
      explanation: 'Expand right pointer until all characters in t are satisfied (count drops to 0). Then contract left pointer to minimize window length while preserving validity.',
      whyOptimalIsPreferred: 'Linear O(|s| + |t|) runtime by ensuring left and right pointers only move forward monotonically without redundant scans.',
      patternInvariant: 'Expand right to achieve feasibility; contract left to achieve optimality while feasibility holds.'
    },
    defaultInputDescription: 's = "ADOBECODEBANC", t = "ABC"'
  }
];
