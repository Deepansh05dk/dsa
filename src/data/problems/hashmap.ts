import type { LeetCodeProblem } from '../../types/problem';

export const hashmapProblems: LeetCodeProblem[] = [
  {
    id: 383,
    slug: 'ransom-note',
    title: 'Ransom Note',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote.',
    examples: [
      {
        input: 'ransomNote = "a", magazine = "b"',
        output: 'false'
      },
      {
        input: 'ransomNote = "aa", magazine = "ab"',
        output: 'false'
      },
      {
        input: 'ransomNote = "aa", magazine = "aab"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= ransomNote.length, magazine.length <= 10^5',
      'ransomNote and magazine consist of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Linear Scan and Splice',
      code: `function canConstructBrute(ransomNote: string, magazine: string): boolean {
  let mag = magazine;
  for (const char of ransomNote) {
    const idx = mag.indexOf(char);
    if (idx === -1) return false;
    mag = mag.slice(0, idx) + mag.slice(idx + 1);
  }
  return true;
}`,
      complexity: {
        time: 'O(R * M)',
        space: 'O(M)'
      },
      explanation: 'For each character in ransomNote, locate its index in magazine, remove that character by slicing the string, and fail if not found.'
    },
    optimal: {
      name: 'Fixed-Size Character Frequency Table',
      code: `function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false;
  const counts = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < magazine.length; i++) {
    counts[magazine.charCodeAt(i) - aCode]++;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const idx = ransomNote.charCodeAt(i) - aCode;
    counts[idx]--;
    if (counts[idx] < 0) {
      return false;
    }
  }
  return true;
}`,
      complexity: {
        time: 'O(M + R)',
        space: 'O(1)'
      },
      explanation: 'Tally available characters in magazine into a 26-slot frequency array. Decrement for each character in ransomNote, failing immediately if count drops below zero.',
      whyOptimalIsPreferred: 'Linear execution in O(M+R) time with O(1) bounded space compared to costly O(R*M) string slicing operations.',
      patternInvariant: 'Counting character frequencies converts element search into O(1) arithmetic decrements.'
    },
    defaultInputDescription: 'ransomNote = "aa", magazine = "aab"'
  },
  {
    id: 205,
    slug: 'isomorphic-strings',
    title: 'Isomorphic Strings',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.',
    examples: [
      {
        input: 's = "egg", t = "add"',
        output: 'true'
      },
      {
        input: 's = "foo", t = "bar"',
        output: 'false'
      },
      {
        input: 's = "paper", t = "title"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= s.length <= 5 * 10^4',
      't.length == s.length',
      's and t consist of any valid ascii character.'
    ],
    bruteForce: {
      name: 'Nested Pairwise Mapping Verification',
      code: `function isIsomorphicBrute(s: string, t: string): boolean {
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if ((s[i] === s[j] && t[i] !== t[j]) || (s[i] !== s[j] && t[i] === t[j])) {
        return false;
      }
    }
  }
  return true;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Compares all pairs (i, j) to assert that s[i] == s[j] if and only if t[i] == t[j].'
    },
    optimal: {
      name: 'Bidirectional Hash Maps / Last Seen Index Tracking',
      code: `function isIsomorphic(s: string, t: string): boolean {
  const mapST = new Map<string, string>();
  const mapTS = new Map<string, string>();

  for (let i = 0; i < s.length; i++) {
    const c1 = s[i];
    const c2 = t[i];

    if ((mapST.has(c1) && mapST.get(c1) !== c2) ||
        (mapTS.has(c2) && mapTS.get(c2) !== c1)) {
      return false;
    }

    mapST.set(c1, c2);
    mapTS.set(c2, c1);
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) bounded ASCII'
      },
      explanation: 'Maintain two maps: mapST (s -> t) and mapTS (t -> s) to enforce a strict bijection. If either character is already mapped to a different target, return false.',
      whyOptimalIsPreferred: 'Linear O(N) execution with O(1) space (limited to ASCII alphabet size) completely eliminating the quadratic O(N^2) pairwise comparisons.',
      patternInvariant: 'Isomorphism is an equivalence relation requiring a bijective (1-to-1 and onto) character mapping.'
    },
    defaultInputDescription: 's = "egg", t = "add"'
  },
  {
    id: 290,
    slug: 'word-pattern',
    title: 'Word Pattern',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.',
    examples: [
      {
        input: 'pattern = "abba", s = "dog cat cat dog"',
        output: 'true'
      },
      {
        input: 'pattern = "abba", s = "dog cat cat fish"',
        output: 'false'
      },
      {
        input: 'pattern = "aaaa", s = "dog cat cat dog"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= pattern.length <= 300',
      'pattern contains only lower-case English letters.',
      '1 <= s.length <= 3000',
      's contains only lowercase English letters and spaces \' \'.',
      's does not contain any leading or trailing spaces.',
      'All the words in s are separated by a single space.'
    ],
    bruteForce: {
      name: 'Pairwise Cross Validation',
      code: `function wordPatternBrute(pattern: string, s: string): boolean {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    for (let j = i + 1; j < pattern.length; j++) {
      if ((pattern[i] === pattern[j] && words[i] !== words[j]) ||
          (pattern[i] !== pattern[j] && words[i] === words[j])) {
        return false;
      }
    }
  }
  return true;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Splits s into words and compares every pair of indices for bidirectional correspondence.'
    },
    optimal: {
      name: 'Bidirectional Hash Mapping',
      code: `function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  const charToWord = new Map<string, string>();
  const wordToChar = new Map<string, string>();

  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    const word = words[i];

    if (charToWord.has(ch) && charToWord.get(ch) !== word) return false;
    if (wordToChar.has(word) && wordToChar.get(word) !== ch) return false;

    charToWord.set(ch, word);
    wordToChar.set(word, ch);
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Use two hash maps: charToWord and wordToChar. For each character and corresponding word, verify that neither key is bound to a differing value.',
      whyOptimalIsPreferred: 'Linear O(N) single pass tracking guarantees a true bijection between tokens and symbols in O(N) space.',
      patternInvariant: 'Bidirectional bijection: ensure both forward (pattern -> word) and reverse (word -> pattern) mappings are unique.'
    },
    defaultInputDescription: 'pattern = "abba", s = "dog cat cat dog"'
  },
  {
    id: 242,
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Sort and Compare',
      code: `function isAnagramBrute(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      },
      explanation: 'Sort both strings alphabetically and compare for equality.'
    },
    optimal: {
      name: 'Single 26-Bucket Frequency Array',
      code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - aCode]++;
    count[t.charCodeAt(i) - aCode]--;
  }

  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) return false;
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Increment counts for characters in s and decrement counts for characters in t in a single pass. If all 26 counters return to 0, strings are identical anagrams.',
      whyOptimalIsPreferred: 'Executes in linear O(N) time with O(1) space, avoiding the O(N log N) sorting overhead and intermediate array string conversions.',
      patternInvariant: 'Anagram invariant: the multiset of characters in both strings must have identical element counts.'
    },
    defaultInputDescription: 's = "anagram", t = "nagaram"'
  },
  {
    id: 49,
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    bruteForce: {
      name: 'Pairwise Anagram Matching',
      code: `function groupAnagramsBrute(strs: string[]): string[][] {
  const isAna = (a: string, b: string) => a.split('').sort().join('') === b.split('').sort().join('');
  const visited = new Array(strs.length).fill(false);
  const result: string[][] = [];

  for (let i = 0; i < strs.length; i++) {
    if (visited[i]) continue;
    const group = [strs[i]];
    visited[i] = true;
    for (let j = i + 1; j < strs.length; j++) {
      if (!visited[j] && isAna(strs[i], strs[j])) {
        group.push(strs[j]);
        visited[j] = true;
      }
    }
    result.push(group);
  }
  return result;
}`,
      complexity: {
        time: 'O(N^2 * K log K)',
        space: 'O(N)'
      },
      explanation: 'Iterate over all pairs of words, testing if they are anagrams and grouping matched indices.'
    },
    optimal: {
      name: 'Canonical Sorted Key Hash Map Grouping',
      code: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(s);
  }

  return Array.from(map.values());
}`,
      complexity: {
        time: 'O(N * K log K)',
        space: 'O(N * K)'
      },
      explanation: 'Sort each string of length K to obtain its canonical signature key. Insert strings into a hash map where all anagrams share the identical sorted key.',
      whyOptimalIsPreferred: 'Reduces search from quadratic O(N^2) to near linear O(N * K log K) by partitioning all strings directly into their canonical bucket in O(1) hash lookups.',
      patternInvariant: 'Canonical representation: all anagrams collapse to the exact same canonical string when sorted.'
    },
    defaultInputDescription: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]'
  },
  {
    id: 1,
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    bruteForce: {
      name: 'Exhaustive Pair Scan',
      code: `function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'Check all N*(N-1)/2 possible pairs using nested loops until pair summing to target is found.'
    },
    optimal: {
      name: 'Single-Pass Hash Map',
      code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'As we iterate through the array, calculate complement = target - nums[i]. Check if complement is already stored in the hash map. If so, return stored index and current index. Otherwise record nums[i] -> i in map.',
      whyOptimalIsPreferred: 'Trades O(N) additional space to reduce the time complexity from quadratic O(N^2) to linear O(N), avoiding costly nested iterations.',
      patternInvariant: 'Trading space for time via a hash map converts an inner linear search into an O(1) average lookup.'
    },
    defaultInputDescription: 'nums = [2, 7, 11, 15], target = 9'
  },
  {
    id: 202,
    slug: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy.',
    examples: [
      {
        input: 'n = 19',
        output: 'true',
        explanation: '1^2 + 9^2 = 82; 8^2 + 2^2 = 68; 6^2 + 8^2 = 100; 1^2 + 0^2 + 0^2 = 1.'
      },
      {
        input: 'n = 2',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Arbitrary Iteration Limit Guard',
      code: `function isHappyBrute(n: number): boolean {
  function getNext(num: number): number {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }
  let curr = n;
  for (let step = 0; step < 1000; step++) {
    if (curr === 1) return true;
    curr = getNext(curr);
  }
  return false;
}`,
      complexity: {
        time: 'O(K * log N)',
        space: 'O(1)'
      },
      explanation: 'Repeatedly replaces number with digit squares sum up to an arbitrary threshold like 1000 iterations.'
    },
    optimal: {
      name: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare)',
      code: `function isHappy(n: number): boolean {
  function getNext(num: number): number {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n;
  let fast = getNext(n);
  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }
  return fast === 1;
}`,
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      },
      explanation: 'Treat the digit square sequence as a linked list with next pointer getNext. Use Floyd slow and fast pointers: if a cycle exists not containing 1, fast and slow will meet in O(1) space.',
      whyOptimalIsPreferred: 'Guarantees termination without maintaining an auxiliary hash set of previously seen numbers, running in strict O(1) extra space.',
      patternInvariant: 'Cycle detection invariant: two pointers moving at speeds 1 and 2 in a finite state space must eventually meet.'
    },
    defaultInputDescription: 'n = 19'
  },
  {
    id: 219,
    slug: 'contains-duplicate-ii',
    title: 'Contains Duplicate II',
    difficulty: 'Easy',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.',
    examples: [
      {
        input: 'nums = [1,2,3,1], k = 3',
        output: 'true'
      },
      {
        input: 'nums = [1,0,1,1], k = 1',
        output: 'true'
      },
      {
        input: 'nums = [1,2,3,1,2,3], k = 2',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
      '0 <= k <= 10^5'
    ],
    bruteForce: {
      name: 'Nested Window Scan',
      code: `function containsNearbyDuplicateBrute(nums: number[], k: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= Math.min(nums.length - 1, i + k); j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}`,
      complexity: {
        time: 'O(N * k)',
        space: 'O(1)'
      },
      explanation: 'For each index i, scan forward up to i + k to look for duplicate values.'
    },
    optimal: {
      name: 'Sliding Window Hash Set of Size K',
      code: `function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const windowSet = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    if (windowSet.has(nums[i])) {
      return true;
    }
    windowSet.add(nums[i]);

    if (windowSet.size > k) {
      windowSet.delete(nums[i - k]);
    }
  }
  return false;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(min(N, k))'
      },
      explanation: 'Maintain a hash set containing only the elements within the current window of length k. If an element already exists in the set, a duplicate within distance k is found. Remove nums[i - k] when window size exceeds k.',
      whyOptimalIsPreferred: 'Linear O(N) single pass execution with memory bounded to O(min(N, k)), far superior to O(N * k) quadratic scans.',
      patternInvariant: 'Sliding window hash set maintains uniqueness invariant for elements strictly within distance k.'
    },
    defaultInputDescription: 'nums = [1, 2, 3, 1], k = 3'
  },
  {
    id: 128,
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    pattern: 'hashmap',
    category: 'Hashmap',
    statement: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
    examples: [
      {
        input: 'nums = [100,4,200,1,3,2]',
        output: '4',
        explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.'
      },
      {
        input: 'nums = [0,3,7,2,5,8,4,6,0,1]',
        output: '9'
      }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    bruteForce: {
      name: 'Sort and Adjacent Check',
      code: `function longestConsecutiveBrute(nums: number[]): number {
  if (nums.length === 0) return 0;
  nums.sort((a, b) => a - b);
  let longest = 1;
  let current = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue;
    if (nums[i] === nums[i - 1] + 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) or O(N)'
      },
      explanation: 'Sort the array and scan adjacent elements to measure contiguous incrementing chains.'
    },
    optimal: {
      name: 'Hash Set Sequence Start Pruning',
      code: `function longestConsecutive(nums: number[]): number {
  const numSet = new Set<number>(nums);
  let longestStreak = 0;

  for (const num of numSet) {
    // Only attempt sequence expansion if num is the start of a streak
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Populate a Hash Set with all elements. For each number, check if num - 1 is in the set. If it is NOT, num is the beginning of a sequence; count forward until the sequence ends. Every element is visited at most twice.',
      whyOptimalIsPreferred: 'Meets the strict O(N) linear time requirement specified in the problem statement without sorting.',
      patternInvariant: 'Sequence root invariant: only initiate forward scans from sequence start points (where num - 1 is absent).'
    },
    defaultInputDescription: 'nums = [100, 4, 200, 1, 3, 2]'
  }
];
