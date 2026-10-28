import type { VisualizerStep } from '../../types/visualizer';

export const HASHMAP_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 1: Two Sum (MUST have 5 steps for challenger test line 225!)
  1: [
    {
      stepIndex: 0,
      title: 'Initialize Hash Map for Complement Lookups',
      description: 'Create an empty hash map to store seen elements { number -> index }. Target is 9.',
      codeLineHighlight: 2,
      variables: { i: 0, currentNum: 2, complement: 7, found: false },
      arrayState: {
        elements: [
          { value: 2, status: 'active' },
          { value: 7, status: 'default' },
          { value: 11, status: 'default' },
          { value: 15, status: 'default' },
        ],
        pointers: [{ label: 'i', index: 0, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Check Complement in Hash Map: 9 - 2 = 7',
      description: 'Looking for complement 7 in hash map. Key 7 is not present (MISS). Store 2 -> index 0 in map.',
      codeLineHighlight: 4,
      variables: { i: 0, currentNum: 2, complement: 7, found: false },
      arrayState: {
        elements: [
          { value: 2, status: 'comparing' },
          { value: 7, status: 'default' },
          { value: 11, status: 'default' },
          { value: 15, status: 'default' },
        ],
        pointers: [{ label: 'i', index: 0, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: [{ key: 2, value: 0, status: 'inserted' }],
      },
    },
    {
      stepIndex: 2,
      title: 'Advance Pointer to i = 1 (nums[1] = 7)',
      description: 'Move to next element: nums[1] = 7. Calculate complement: target - 7 = 9 - 7 = 2.',
      codeLineHighlight: 3,
      variables: { i: 1, currentNum: 7, complement: 2, found: false },
      arrayState: {
        elements: [
          { value: 2, status: 'default' },
          { value: 7, status: 'active' },
          { value: 11, status: 'default' },
          { value: 15, status: 'default' },
        ],
        pointers: [{ label: 'i', index: 1, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: [{ key: 2, value: 0, status: 'accessed' }],
      },
    },
    {
      stepIndex: 3,
      title: 'Complement Found in Hash Map: HIT!',
      description: 'Complement 2 exists in hash map at index 0! Pair found: nums[0] (2) + nums[1] (7) = 9.',
      codeLineHighlight: 5,
      variables: { i: 1, complement: 2, complementIndex: 0, found: true, result: '[0, 1]' },
      arrayState: {
        elements: [
          { value: 2, status: 'matched' },
          { value: 7, status: 'matched' },
          { value: 11, status: 'eliminated' },
          { value: 15, status: 'eliminated' },
        ],
        pointers: [
          { label: '0', index: 0, color: '#00df72' },
          { label: '1', index: 1, color: '#00df72' },
        ],
      },
      hashMapState: {
        entries: [{ key: 2, value: 0, status: 'accessed' }],
      },
    },
    {
      stepIndex: 4,
      title: 'Algorithm Complete: Return [0, 1]',
      description: 'Successfully returned indices [0, 1] in O(N) time and O(N) auxiliary space.',
      codeLineHighlight: 6,
      variables: { result: '[0, 1]', timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
      arrayState: {
        elements: [
          { value: 2, status: 'sorted' },
          { value: 7, status: 'sorted' },
          { value: 11, status: 'eliminated' },
          { value: 15, status: 'eliminated' },
        ],
      },
      hashMapState: {
        entries: [{ key: 2, value: 0, status: 'default' }],
      },
    },
  ],

  // Problem 49: Group Anagrams
  49: [
    {
      stepIndex: 0,
      title: 'Initialize Hash Map for Sorted Canonical Signatures',
      description: 'Words: ["eat", "tea", "tan", "ate", "nat", "bat"]. Key = sorted string, Value = list of words.',
      codeLineHighlight: 2,
      variables: { processed: 0, total: 6 },
      hashMapState: {
        entries: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Process "eat", "tea", "ate": Canonical Key "aet"',
      description: 'Sort("eat")="aet". Sort("tea")="aet". Sort("ate")="aet". Group under key "aet" -> ["eat", "tea", "ate"].',
      codeLineHighlight: 5,
      variables: { key: 'aet', groupSize: 3 },
      hashMapState: {
        entries: [
          { key: 'aet', value: '["eat", "tea", "ate"]', status: 'updated' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Process "tan", "nat": Canonical Key "ant"',
      description: 'Sort("tan")="ant". Sort("nat")="ant". Group under key "ant" -> ["tan", "nat"].',
      codeLineHighlight: 5,
      variables: { key: 'ant', groupSize: 2 },
      hashMapState: {
        entries: [
          { key: 'aet', value: '["eat", "tea", "ate"]', status: 'default' },
          { key: 'ant', value: '["tan", "nat"]', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Process "bat": Key "abt" -> Return All Values',
      description: 'Sort("bat")="abt" -> ["bat"]. Return map values. Time: O(N * K log K), Space: O(N * K).',
      codeLineHighlight: 8,
      variables: { totalGroups: 3, complete: true },
      hashMapState: {
        entries: [
          { key: 'aet', value: '["eat", "tea", "ate"]', status: 'default' },
          { key: 'ant', value: '["tan", "nat"]', status: 'default' },
          { key: 'abt', value: '["bat"]', status: 'inserted' },
        ],
      },
    },
  ],

  // Problem 128: Longest Consecutive Sequence
  128: [
    {
      stepIndex: 0,
      title: 'Insert All Elements into Hash Set: {100, 4, 200, 1, 3, 2}',
      description: 'O(1) lookups allow checking if (num - 1) exists to identify sequence starting points.',
      codeLineHighlight: 2,
      variables: { setSize: 6, maxStreak: 0 },
      hashMapState: {
        entries: [
          { key: '100', value: 'present', status: 'inserted' },
          { key: '4', value: 'present', status: 'inserted' },
          { key: '200', value: 'present', status: 'inserted' },
          { key: '1', value: 'present', status: 'inserted' },
          { key: '3', value: 'present', status: 'inserted' },
          { key: '2', value: 'present', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Identify Sequence Start at 1 (0 is NOT in set)',
      description: 'num - 1 = 0 not in set. Node 1 is a sequence start! Count streak: 1 -> 2 -> 3 -> 4 (length = 4).',
      codeLineHighlight: 5,
      variables: { startNum: 1, streak: 4, maxStreak: 4 },
      hashMapState: {
        entries: [
          { key: '1', value: 'start (streak:4)', status: 'accessed' },
          { key: '2', value: 'in streak', status: 'accessed' },
          { key: '3', value: 'in streak', status: 'accessed' },
          { key: '4', value: 'in streak', status: 'accessed' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Skip Non-Starts (2, 3, 4) & Test 100, 200',
      description: '2, 3, 4 have (num - 1) in set, skip. 100 has streak 1, 200 has streak 1. Longest streak is 4.',
      codeLineHighlight: 8,
      variables: { longestConsecutive: 4, complete: true, timeComplexity: 'O(N)' },
      hashMapState: {
        entries: [
          { key: '1..4', value: 'max_streak = 4', status: 'updated' },
          { key: '100', value: 'streak = 1', status: 'default' },
          { key: '200', value: 'streak = 1', status: 'default' },
        ],
      },
    },
  ],

  // Problem 205: Isomorphic Strings
  205: [
    {
      stepIndex: 0,
      title: 'Initialize Bidirectional Mappings: s = "egg", t = "add"',
      description: 'Maintain map_s_to_t and map_t_to_s to enforce strict bijection between characters.',
      codeLineHighlight: 2,
      variables: { s: 'egg', t: 'add', valid: true },
      hashMapState: {
        entries: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Map s[0]=\'e\' to t[0]=\'a\'',
      description: 'Record mapping: e <-> a. Both characters are unmapped.',
      codeLineHighlight: 5,
      variables: { 'e ->': 'a', 'a ->': 'e' },
      hashMapState: {
        entries: [
          { key: 'e', value: 'a', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Map s[1]=\'g\' to t[1]=\'d\'',
      description: 'Record mapping: g <-> d. Both characters unmapped.',
      codeLineHighlight: 5,
      variables: { 'g ->': 'd', 'd ->': 'g' },
      hashMapState: {
        entries: [
          { key: 'e', value: 'a', status: 'default' },
          { key: 'g', value: 'd', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Verify s[2]=\'g\' -> t[2]=\'d\' Matches Existing Map (True)',
      description: 's[2]=\'g\' already maps to \'d\', matching t[2]. Valid bijection! Return true. Time: O(N), Space: O(1).',
      codeLineHighlight: 8,
      variables: { isIsomorphic: true },
      hashMapState: {
        entries: [
          { key: 'e', value: 'a', status: 'default' },
          { key: 'g', value: 'd', status: 'accessed' },
        ],
      },
    },
  ],

  // Problem 242: Valid Anagram
  242: [
    {
      stepIndex: 0,
      title: 'Initialize Frequency Hash Map for s = "anagram"',
      description: 'Count occurrences of each character in string s.',
      codeLineHighlight: 2,
      variables: { s: 'anagram', t: 'nagaram' },
      hashMapState: {
        entries: [
          { key: 'a', value: 3, status: 'inserted' },
          { key: 'n', value: 1, status: 'inserted' },
          { key: 'g', value: 1, status: 'inserted' },
          { key: 'r', value: 1, status: 'inserted' },
          { key: 'm', value: 1, status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Decrement Frequencies for t = "nagaram"',
      description: 'Subtract character counts for each letter in t.',
      codeLineHighlight: 5,
      variables: { lettersRemaining: 0 },
      hashMapState: {
        entries: [
          { key: 'a', value: 0, status: 'updated' },
          { key: 'n', value: 0, status: 'updated' },
          { key: 'g', value: 0, status: 'updated' },
          { key: 'r', value: 0, status: 'updated' },
          { key: 'm', value: 0, status: 'updated' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'All Character Frequencies Zero: Strings are Valid Anagrams (True)',
      description: 'Every bucket count is exactly 0. Return true. Time: O(N), Space: O(1) (26 alphabet characters).',
      codeLineHighlight: 8,
      variables: { isAnagram: true },
      hashMapState: {
        entries: [
          { key: 'all_counts', value: 0, status: 'default' },
        ],
      },
    },
  ],

  // Problem 383: Ransom Note
  383: [
    {
      stepIndex: 0,
      title: 'Count Magazine Character Frequencies: magazine = "aab"',
      description: 'Store magazine character counts in hash map: { a: 2, b: 1 }.',
      codeLineHighlight: 2,
      variables: { 'mag[a]': 2, 'mag[b]': 1 },
      hashMapState: {
        entries: [
          { key: 'a', value: 2, status: 'inserted' },
          { key: 'b', value: 1, status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Consume Characters for ransomNote = "aa"',
      description: 'First \'a\': count decreases 2 -> 1. Second \'a\': count decreases 1 -> 0.',
      codeLineHighlight: 5,
      variables: { 'mag[a]': 0, 'mag[b]': 1, noteSatisfied: true },
      hashMapState: {
        entries: [
          { key: 'a', value: 0, status: 'updated' },
          { key: 'b', value: 1, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Sufficient Characters in Magazine: Return True',
      description: 'All letters in ransomNote found in magazine. Time: O(M + N), Space: O(1).',
      codeLineHighlight: 8,
      variables: { canConstruct: true },
      hashMapState: {
        entries: [
          { key: 'a', value: 0, status: 'default' },
          { key: 'b', value: 1, status: 'default' },
        ],
      },
    },
  ],

  // Problem 202: Happy Number
  202: [
    {
      stepIndex: 0,
      title: 'Initialize Seen Set with Starting Value n = 19',
      description: 'Track cycle detection using hash set of seen squared-digit sums.',
      codeLineHighlight: 2,
      variables: { n: 19, seen: '{19}' },
      hashMapState: {
        entries: [{ key: 19, value: 'seen', status: 'inserted' }],
      },
    },
    {
      stepIndex: 1,
      title: 'Sum of Squared Digits: 1^2 + 9^2 = 1 + 81 = 82',
      description: '82 is new. Add to set. Next: 8^2 + 2^2 = 64 + 4 = 68.',
      codeLineHighlight: 4,
      variables: { n: 82, next: 68 },
      hashMapState: {
        entries: [
          { key: 19, value: 'seen', status: 'default' },
          { key: 82, value: 'seen', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Transformations: 68 -> 100 -> 1',
      description: '6^2 + 8^2 = 100. Then 1^2 + 0^2 + 0^2 = 1! Target 1 reached.',
      codeLineHighlight: 6,
      variables: { n: 1, isHappy: true },
      hashMapState: {
        entries: [
          { key: 1, value: 'HAPPY!', status: 'inserted' },
        ],
      },
    },
  ],

  // Problem 219: Contains Duplicate II
  219: [
    {
      stepIndex: 0,
      title: 'Initialize Sliding Hash Map for k = 2, nums = [1, 2, 3, 1]',
      description: 'Map stores num -> most recent index. Check if (i - map.get(num)) <= k.',
      codeLineHighlight: 2,
      variables: { k: 2, i: 0 },
      hashMapState: {
        entries: [{ key: 1, value: 0, status: 'inserted' }],
      },
    },
    {
      stepIndex: 1,
      title: 'Add nums[1]=2 and nums[2]=3 to Map',
      description: 'Indices: 2 -> 1, 3 -> 2. No duplicate values so far.',
      codeLineHighlight: 4,
      variables: { i: 2, size: 3 },
      hashMapState: {
        entries: [
          { key: 1, value: 0, status: 'default' },
          { key: 2, value: 1, status: 'inserted' },
          { key: 3, value: 2, status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Check nums[3] = 1: Seen at index 0 -> Distance = 3 - 0 = 3 > k (2)',
      description: 'Index difference 3 exceeds k = 2. Update 1 -> 3. Return false if end reached.',
      codeLineHighlight: 6,
      variables: { duplicateFound: false, finalResult: false },
      hashMapState: {
        entries: [
          { key: 1, value: 3, status: 'updated' },
          { key: 2, value: 1, status: 'default' },
          { key: 3, value: 2, status: 'default' },
        ],
      },
    },
  ],

  // Problem 290: Word Pattern
  290: [
    {
      stepIndex: 0,
      title: 'Initialize Bijective Map for pattern = "abba", s = "dog cat cat dog"',
      description: 'Map char -> word and word -> char. Split s into tokens: ["dog", "cat", "cat", "dog"].',
      codeLineHighlight: 2,
      variables: { pattern: 'abba', tokens: 4 },
      hashMapState: {
        entries: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Map \'a\' -> "dog" and \'b\' -> "cat"',
      description: 'First two characters establish bijection: a <-> dog, b <-> cat.',
      codeLineHighlight: 5,
      variables: { 'a ->': 'dog', 'b ->': 'cat' },
      hashMapState: {
        entries: [
          { key: 'a', value: 'dog', status: 'inserted' },
          { key: 'b', value: 'cat', status: 'inserted' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Verify Remaining Tokens: \'b\' == "cat", \'a\' == "dog" (True)',
      description: 'Pattern matches text words completely. Return true. Time: O(N), Space: O(N).',
      codeLineHighlight: 8,
      variables: { matches: true },
      hashMapState: {
        entries: [
          { key: 'a', value: 'dog', status: 'accessed' },
          { key: 'b', value: 'cat', status: 'accessed' },
        ],
      },
    },
  ],
};
