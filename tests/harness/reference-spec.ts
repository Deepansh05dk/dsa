/**
 * Authoritative Reference Specification for LeetCode 150 Revision Web Application
 * Derived strictly from ORIGINAL_REQUEST.md and PROJECT.md
 */

export interface ExpectedProblemMeta {
  id: number;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
}

export const EXPECTED_PATTERNS = [
  'Array / String',
  'Two Pointers',
  'Sliding Window',
  'Matrix',
  'Hashmap',
  'Intervals',
  'Stack',
  'Linked List',
  'Binary Tree General',
  'Binary Tree BFS',
  'Binary Search Tree',
  'Graph General',
  'Graph BFS',
  'Trie',
  'Backtracking',
  'Divide & Conquer',
  "Kadane's Algorithm",
  'Binary Search',
  'Heap',
  'Bit Manipulation',
  'Math',
  '1D DP',
  'Multidimensional DP'
] as const;

export const EXPECTED_150_PROBLEMS: ExpectedProblemMeta[] = [
  // 1. Array / String (24 problems)
  { id: 88, slug: 'merge-sorted-array', title: 'Merge Sorted Array', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 27, slug: 'remove-element', title: 'Remove Element', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 26, slug: 'remove-duplicates-from-sorted-array', title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 80, slug: 'remove-duplicates-from-sorted-array-ii', title: 'Remove Duplicates from Sorted Array II', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 169, slug: 'majority-element', title: 'Majority Element', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 189, slug: 'rotate-array', title: 'Rotate Array', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 121, slug: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 122, slug: 'best-time-to-buy-and-sell-stock-ii', title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 55, slug: 'jump-game', title: 'Jump Game', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 45, slug: 'jump-game-ii', title: 'Jump Game II', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 274, slug: 'h-index', title: 'H-Index', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 380, slug: 'insert-delete-getrandom-o1', title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 238, slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 134, slug: 'gas-station', title: 'Gas Station', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 135, slug: 'candy', title: 'Candy', difficulty: 'Hard', pattern: 'Array / String' },
  { id: 42, slug: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Array / String' },
  { id: 13, slug: 'roman-to-integer', title: 'Roman to Integer', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 12, slug: 'integer-to-roman', title: 'Integer to Roman', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 58, slug: 'length-of-last-word', title: 'Length of Last Word', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 14, slug: 'longest-common-prefix', title: 'Longest Common Prefix', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 151, slug: 'reverse-words-in-a-string', title: 'Reverse Words in a String', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 6, slug: 'zigzag-conversion', title: 'Zigzag Conversion', difficulty: 'Medium', pattern: 'Array / String' },
  { id: 28, slug: 'find-the-index-of-the-first-occurrence-in-a-string', title: 'Find the Index of the First Occurrence in a String', difficulty: 'Easy', pattern: 'Array / String' },
  { id: 68, slug: 'text-justification', title: 'Text Justification', difficulty: 'Hard', pattern: 'Array / String' },

  // 2. Two Pointers (5 problems)
  { id: 125, slug: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'Easy', pattern: 'Two Pointers' },
  { id: 392, slug: 'is-subsequence', title: 'Is Subsequence', difficulty: 'Easy', pattern: 'Two Pointers' },
  { id: 167, slug: 'two-sum-ii-input-array-is-sorted', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', pattern: 'Two Pointers' },
  { id: 11, slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'Medium', pattern: 'Two Pointers' },
  { id: 15, slug: '3sum', title: '3Sum', difficulty: 'Medium', pattern: 'Two Pointers' },

  // 3. Sliding Window (4 problems)
  { id: 209, slug: 'minimum-size-subarray-sum', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', pattern: 'Sliding Window' },
  { id: 3, slug: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', pattern: 'Sliding Window' },
  { id: 30, slug: 'substring-with-concatenation-of-all-words', title: 'Substring with Concatenation of All Words', difficulty: 'Hard', pattern: 'Sliding Window' },
  { id: 76, slug: 'minimum-window-substring', title: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window' },

  // 4. Matrix (5 problems)
  { id: 36, slug: 'valid-sudoku', title: 'Valid Sudoku', difficulty: 'Medium', pattern: 'Matrix' },
  { id: 54, slug: 'spiral-matrix', title: 'Spiral Matrix', difficulty: 'Medium', pattern: 'Matrix' },
  { id: 48, slug: 'rotate-image', title: 'Rotate Image', difficulty: 'Medium', pattern: 'Matrix' },
  { id: 73, slug: 'set-matrix-zeroes', title: 'Set Matrix Zeroes', difficulty: 'Medium', pattern: 'Matrix' },
  { id: 289, slug: 'game-of-life', title: 'Game of Life', difficulty: 'Medium', pattern: 'Matrix' },

  // 5. Hashmap (9 problems)
  { id: 383, slug: 'ransom-note', title: 'Ransom Note', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 205, slug: 'isomorphic-strings', title: 'Isomorphic Strings', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 290, slug: 'word-pattern', title: 'Word Pattern', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 242, slug: 'valid-anagram', title: 'Valid Anagram', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 49, slug: 'group-anagrams', title: 'Group Anagrams', difficulty: 'Medium', pattern: 'Hashmap' },
  { id: 1, slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 202, slug: 'happy-number', title: 'Happy Number', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 219, slug: 'contains-duplicate-ii', title: 'Contains Duplicate II', difficulty: 'Easy', pattern: 'Hashmap' },
  { id: 128, slug: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', difficulty: 'Medium', pattern: 'Hashmap' },

  // 6. Intervals (4 problems)
  { id: 228, slug: 'summary-ranges', title: 'Summary Ranges', difficulty: 'Easy', pattern: 'Intervals' },
  { id: 56, slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', pattern: 'Intervals' },
  { id: 57, slug: 'insert-interval', title: 'Insert Interval', difficulty: 'Medium', pattern: 'Intervals' },
  { id: 452, slug: 'minimum-number-of-arrows-to-burst-balloons', title: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', pattern: 'Intervals' },

  // 7. Stack (5 problems)
  { id: 20, slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', pattern: 'Stack' },
  { id: 71, slug: 'simplify-path', title: 'Simplify Path', difficulty: 'Medium', pattern: 'Stack' },
  { id: 155, slug: 'min-stack', title: 'Min Stack', difficulty: 'Medium', pattern: 'Stack' },
  { id: 150, slug: 'evaluate-reverse-polish-notation', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', pattern: 'Stack' },
  { id: 224, slug: 'basic-calculator', title: 'Basic Calculator', difficulty: 'Hard', pattern: 'Stack' },

  // 8. Linked List (11 problems)
  { id: 141, slug: 'linked-list-cycle', title: 'Linked List Cycle', difficulty: 'Easy', pattern: 'Linked List' },
  { id: 2, slug: 'add-two-numbers', title: 'Add Two Numbers', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 21, slug: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'Easy', pattern: 'Linked List' },
  { id: 138, slug: 'copy-list-with-random-pointer', title: 'Copy List with Random Pointer', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 92, slug: 'reverse-linked-list-ii', title: 'Reverse Linked List II', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 25, slug: 'reverse-nodes-in-k-group', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', pattern: 'Linked List' },
  { id: 19, slug: 'remove-nth-node-from-end-of-list', title: 'Remove Nth Node From End of List', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 82, slug: 'remove-duplicates-from-sorted-list-ii', title: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 61, slug: 'rotate-list', title: 'Rotate List', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 86, slug: 'partition-list', title: 'Partition List', difficulty: 'Medium', pattern: 'Linked List' },
  { id: 146, slug: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium', pattern: 'Linked List' },

  // 9. Binary Tree General (14 problems)
  { id: 104, slug: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 100, slug: 'same-tree', title: 'Same Tree', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 226, slug: 'invert-binary-tree', title: 'Invert Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 101, slug: 'symmetric-tree', title: 'Symmetric Tree', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 105, slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 106, slug: 'construct-binary-tree-from-inorder-and-postorder-traversal', title: 'Construct Binary Tree from Inorder and Postorder Traversal', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 117, slug: 'populating-next-right-pointers-in-each-node-ii', title: 'Populating Next Right Pointers in Each Node II', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 114, slug: 'flatten-binary-tree-to-linked-list', title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 112, slug: 'path-sum', title: 'Path Sum', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 129, slug: 'sum-root-to-leaf-numbers', title: 'Sum Root to Leaf Numbers', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 124, slug: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', pattern: 'Binary Tree General' },
  { id: 173, slug: 'binary-search-tree-iterator', title: 'Binary Search Tree Iterator', difficulty: 'Medium', pattern: 'Binary Tree General' },
  { id: 222, slug: 'count-complete-tree-nodes', title: 'Count Complete Tree Nodes', difficulty: 'Easy', pattern: 'Binary Tree General' },
  { id: 236, slug: 'lowest-common-ancestor-of-a-binary-tree', title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', pattern: 'Binary Tree General' },

  // 10. Binary Tree BFS (4 problems)
  { id: 199, slug: 'binary-tree-right-side-view', title: 'Binary Tree Right Side View', difficulty: 'Medium', pattern: 'Binary Tree BFS' },
  { id: 637, slug: 'average-of-levels-in-binary-tree', title: 'Average of Levels in Binary Tree', difficulty: 'Easy', pattern: 'Binary Tree BFS' },
  { id: 102, slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', pattern: 'Binary Tree BFS' },
  { id: 103, slug: 'binary-tree-zigzag-level-order-traversal', title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', pattern: 'Binary Tree BFS' },

  // 11. Binary Search Tree (3 problems)
  { id: 530, slug: 'minimum-absolute-difference-in-bst', title: 'Minimum Absolute Difference in BST', difficulty: 'Easy', pattern: 'Binary Search Tree' },
  { id: 230, slug: 'kth-smallest-element-in-a-bst', title: 'Kth Smallest Element in a BST', difficulty: 'Medium', pattern: 'Binary Search Tree' },
  { id: 98, slug: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'Medium', pattern: 'Binary Search Tree' },

  // 12. Graph General (6 problems)
  { id: 200, slug: 'number-of-islands', title: 'Number of Islands', difficulty: 'Medium', pattern: 'Graph General' },
  { id: 130, slug: 'surrounded-regions', title: 'Surrounded Regions', difficulty: 'Medium', pattern: 'Graph General' },
  { id: 133, slug: 'clone-graph', title: 'Clone Graph', difficulty: 'Medium', pattern: 'Graph General' },
  { id: 399, slug: 'evaluate-division', title: 'Evaluate Division', difficulty: 'Medium', pattern: 'Graph General' },
  { id: 207, slug: 'course-schedule', title: 'Course Schedule', difficulty: 'Medium', pattern: 'Graph General' },
  { id: 210, slug: 'course-schedule-ii', title: 'Course Schedule II', difficulty: 'Medium', pattern: 'Graph General' },

  // 13. Graph BFS (3 problems)
  { id: 909, slug: 'snakes-and-ladders', title: 'Snakes and Ladders', difficulty: 'Medium', pattern: 'Graph BFS' },
  { id: 433, slug: 'minimum-genetic-mutation', title: 'Minimum Genetic Mutation', difficulty: 'Medium', pattern: 'Graph BFS' },
  { id: 127, slug: 'word-ladder', title: 'Word Ladder', difficulty: 'Hard', pattern: 'Graph BFS' },

  // 14. Trie (3 problems)
  { id: 208, slug: 'implement-trie-prefix-tree', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Trie' },
  { id: 211, slug: 'design-add-and-search-words-data-structure', title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', pattern: 'Trie' },
  { id: 212, slug: 'word-search-ii', title: 'Word Search II', difficulty: 'Hard', pattern: 'Trie' },

  // 15. Backtracking (7 problems)
  { id: 17, slug: 'letter-combinations-of-a-phone-number', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', pattern: 'Backtracking' },
  { id: 77, slug: 'combinations', title: 'Combinations', difficulty: 'Medium', pattern: 'Backtracking' },
  { id: 46, slug: 'permutations', title: 'Permutations', difficulty: 'Medium', pattern: 'Backtracking' },
  { id: 39, slug: 'combination-sum', title: 'Combination Sum', difficulty: 'Medium', pattern: 'Backtracking' },
  { id: 52, slug: 'n-queens-ii', title: 'N-Queens II', difficulty: 'Hard', pattern: 'Backtracking' },
  { id: 22, slug: 'generate-parentheses', title: 'Generate Parentheses', difficulty: 'Medium', pattern: 'Backtracking' },
  { id: 79, slug: 'word-search', title: 'Word Search', difficulty: 'Medium', pattern: 'Backtracking' },

  // 16. Divide & Conquer (4 problems)
  { id: 108, slug: 'convert-sorted-array-to-binary-search-tree', title: 'Convert Sorted Array to Binary Search Tree', difficulty: 'Easy', pattern: 'Divide & Conquer' },
  { id: 148, slug: 'sort-list', title: 'Sort List', difficulty: 'Medium', pattern: 'Divide & Conquer' },
  { id: 427, slug: 'construct-quad-tree', title: 'Construct Quad Tree', difficulty: 'Medium', pattern: 'Divide & Conquer' },
  { id: 23, slug: 'merge-k-sorted-lists', title: 'Merge k Sorted Lists', difficulty: 'Hard', pattern: 'Divide & Conquer' },

  // 17. Kadane's Algorithm (2 problems)
  { id: 53, slug: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'Medium', pattern: "Kadane's Algorithm" },
  { id: 918, slug: 'maximum-sum-circular-subarray', title: 'Maximum Sum Circular Subarray', difficulty: 'Medium', pattern: "Kadane's Algorithm" },

  // 18. Binary Search (7 problems)
  { id: 35, slug: 'search-insert-position', title: 'Search Insert Position', difficulty: 'Easy', pattern: 'Binary Search' },
  { id: 74, slug: 'search-a-2d-matrix', title: 'Search a 2D Matrix', difficulty: 'Medium', pattern: 'Binary Search' },
  { id: 162, slug: 'find-peak-element', title: 'Find Peak Element', difficulty: 'Medium', pattern: 'Binary Search' },
  { id: 33, slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search' },
  { id: 34, slug: 'find-first-and-last-position-of-element-in-sorted-array', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', pattern: 'Binary Search' },
  { id: 153, slug: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search' },
  { id: 4, slug: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', pattern: 'Binary Search' },

  // 19. Heap (4 problems)
  { id: 215, slug: 'kth-largest-element-in-an-array', title: 'Kth Largest Element in an Array', difficulty: 'Medium', pattern: 'Heap' },
  { id: 373, slug: 'find-k-pairs-with-smallest-sums', title: 'Find K Pairs with Smallest Sums', difficulty: 'Medium', pattern: 'Heap' },
  { id: 295, slug: 'find-median-from-data-stream', title: 'Find Median from Data Stream', difficulty: 'Hard', pattern: 'Heap' },
  { id: 502, slug: 'ipo', title: 'IPO', difficulty: 'Hard', pattern: 'Heap' },

  // 20. Bit Manipulation (6 problems)
  { id: 67, slug: 'add-binary', title: 'Add Binary', difficulty: 'Easy', pattern: 'Bit Manipulation' },
  { id: 190, slug: 'reverse-bits', title: 'Reverse Bits', difficulty: 'Easy', pattern: 'Bit Manipulation' },
  { id: 191, slug: 'number-of-1-bits', title: 'Number of 1 Bits', difficulty: 'Easy', pattern: 'Bit Manipulation' },
  { id: 136, slug: 'single-number', title: 'Single Number', difficulty: 'Easy', pattern: 'Bit Manipulation' },
  { id: 137, slug: 'single-number-ii', title: 'Single Number II', difficulty: 'Medium', pattern: 'Bit Manipulation' },
  { id: 201, slug: 'bitwise-and-of-numbers-range', title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', pattern: 'Bit Manipulation' },

  // 21. Math (6 problems)
  { id: 9, slug: 'palindrome-number', title: 'Palindrome Number', difficulty: 'Easy', pattern: 'Math' },
  { id: 66, slug: 'plus-one', title: 'Plus One', difficulty: 'Easy', pattern: 'Math' },
  { id: 172, slug: 'factorial-trailing-zeroes', title: 'Factorial Trailing Zeroes', difficulty: 'Medium', pattern: 'Math' },
  { id: 69, slug: 'sqrtx', title: 'Sqrt(x)', difficulty: 'Easy', pattern: 'Math' },
  { id: 50, slug: 'powx-n', title: 'Pow(x, n)', difficulty: 'Medium', pattern: 'Math' },
  { id: 149, slug: 'max-points-on-a-line', title: 'Max Points on a Line', difficulty: 'Hard', pattern: 'Math' },

  // 22. 1D DP (5 problems)
  { id: 70, slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', pattern: '1D DP' },
  { id: 198, slug: 'house-robber', title: 'House Robber', difficulty: 'Medium', pattern: '1D DP' },
  { id: 139, slug: 'word-break', title: 'Word Break', difficulty: 'Medium', pattern: '1D DP' },
  { id: 322, slug: 'coin-change', title: 'Coin Change', difficulty: 'Medium', pattern: '1D DP' },
  { id: 300, slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', pattern: '1D DP' },

  // 23. Multidimensional DP (9 problems)
  { id: 120, slug: 'triangle', title: 'Triangle', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 64, slug: 'minimum-path-sum', title: 'Minimum Path Sum', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 63, slug: 'unique-paths-ii', title: 'Unique Paths II', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 5, slug: 'longest-palindromic-substring', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 97, slug: 'interleaving-string', title: 'Interleaving String', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 72, slug: 'edit-distance', title: 'Edit Distance', difficulty: 'Medium', pattern: 'Multidimensional DP' },
  { id: 123, slug: 'best-time-to-buy-and-sell-stock-iii', title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', pattern: 'Multidimensional DP' },
  { id: 188, slug: 'best-time-to-buy-and-sell-stock-iv', title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', pattern: 'Multidimensional DP' },
  { id: 221, slug: 'maximal-square', title: 'Maximal Square', difficulty: 'Medium', pattern: 'Multidimensional DP' }
];

/**
 * Validates problem object against Project Interface Contract
 */
export function validateProblemSchema(problem: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!problem || typeof problem !== 'object') {
    return { valid: false, errors: ['Problem is not an object'] };
  }

  // Mandatory fields
  if (typeof problem.id !== 'number') errors.push(`Invalid or missing id: ${problem.id}`);
  if (typeof problem.slug !== 'string' || problem.slug.trim() === '') errors.push(`Missing slug for problem #${problem.id}`);
  if (typeof problem.title !== 'string' || problem.title.trim() === '') errors.push(`Missing title for problem #${problem.id}`);
  if (!['Easy', 'Medium', 'Hard'].includes(problem.difficulty)) errors.push(`Invalid difficulty '${problem.difficulty}' for problem #${problem.id}`);
  if (typeof problem.pattern !== 'string' || problem.pattern.trim() === '') errors.push(`Missing pattern for problem #${problem.id}`);
  if (typeof problem.statement !== 'string' || problem.statement.trim() === '') errors.push(`Missing statement for problem #${problem.id}`);

  // Examples
  if (!Array.isArray(problem.examples) || problem.examples.length === 0) {
    errors.push(`Problem #${problem.id} must have at least one example`);
  } else {
    for (const [idx, eg] of problem.examples.entries()) {
      if (!eg.input || typeof eg.input !== 'string') errors.push(`Problem #${problem.id} example[${idx}] missing input string`);
      if (eg.output === undefined || eg.output === null) errors.push(`Problem #${problem.id} example[${idx}] missing output`);
    }
  }

  // Brute Force solution
  if (!problem.bruteForce || typeof problem.bruteForce !== 'object') {
    errors.push(`Problem #${problem.id} missing bruteForce approach object`);
  } else {
    if (!problem.bruteForce.name) errors.push(`Problem #${problem.id} bruteForce missing name`);
    if (!problem.bruteForce.code || typeof problem.bruteForce.code !== 'string') errors.push(`Problem #${problem.id} bruteForce missing code`);
    if (!problem.bruteForce.complexity || !problem.bruteForce.complexity.time || !problem.bruteForce.complexity.space) {
      errors.push(`Problem #${problem.id} bruteForce missing time/space complexity`);
    }
    if (!problem.bruteForce.explanation) errors.push(`Problem #${problem.id} bruteForce missing explanation`);
  }

  // Optimal solution
  if (!problem.optimal || typeof problem.optimal !== 'object') {
    errors.push(`Problem #${problem.id} missing optimal approach object`);
  } else {
    if (!problem.optimal.name) errors.push(`Problem #${problem.id} optimal missing name`);
    if (!problem.optimal.code || typeof problem.optimal.code !== 'string') errors.push(`Problem #${problem.id} optimal missing code`);
    if (!problem.optimal.complexity || !problem.optimal.complexity.time || !problem.optimal.complexity.space) {
      errors.push(`Problem #${problem.id} optimal missing time/space complexity`);
    }
    if (!problem.optimal.explanation) errors.push(`Problem #${problem.id} optimal missing explanation`);

    // Key Original Request R1 requirement: why optimal is preferred
    if (!problem.optimal.whyOptimalIsPreferred || typeof problem.optimal.whyOptimalIsPreferred !== 'string' || problem.optimal.whyOptimalIsPreferred.trim().length < 10) {
      errors.push(`Problem #${problem.id} missing or trivial whyOptimalIsPreferred explanation`);
    }

    // Pattern Recognition Cue
    if (!problem.optimal.patternInvariant || typeof problem.optimal.patternInvariant !== 'string' || problem.optimal.patternInvariant.trim().length < 5) {
      errors.push(`Problem #${problem.id} missing patternInvariant recognition cue`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Contract Model: Visualizer State Machine
 * Implements the contract in PROJECT.md Controller Actions Contract
 */
export class VisualizerStateMachine {
  public currentStep: number;
  public totalSteps: number;
  public isPlaying: boolean;
  public playbackSpeed: number;

  constructor(totalSteps: number, initialStep: number = 0) {
    this.totalSteps = Math.max(1, totalSteps);
    this.currentStep = Math.max(0, Math.min(initialStep, this.totalSteps - 1));
    this.isPlaying = false;
    this.playbackSpeed = 1.0;
  }

  public next(): void {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep += 1;
    }
  }

  public reverse(): void {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  public reset(): void {
    this.currentStep = 0;
    this.isPlaying = false;
  }

  public seek(stepIndex: number): void {
    // Clamped seek behavior
    this.currentStep = Math.max(0, Math.min(stepIndex, this.totalSteps - 1));
  }

  public togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  public setSpeed(speed: number): void {
    if ([0.5, 1, 1.5, 2].includes(speed)) {
      this.playbackSpeed = speed;
    }
  }
}

/**
 * Contract Model: Global Search Engine (⌘K)
 */
export function filterProblems(
  problems: ExpectedProblemMeta[],
  query: string,
  difficultyFilter?: 'Easy' | 'Medium' | 'Hard' | 'All',
  patternFilter?: string
): ExpectedProblemMeta[] {
  const q = (query || '').trim().toLowerCase();

  return problems.filter((problem) => {
    // Difficulty filter
    if (difficultyFilter && difficultyFilter !== 'All' && problem.difficulty !== difficultyFilter) {
      return false;
    }

    // Pattern filter
    if (patternFilter && patternFilter !== 'All' && problem.pattern.toLowerCase() !== patternFilter.toLowerCase()) {
      return false;
    }

    // Empty query matches all eligible
    if (!q) return true;

    // Search by title, problem id, or pattern
    const matchesTitle = problem.title.toLowerCase().includes(q);
    const matchesId = problem.id.toString() === q || problem.id.toString().startsWith(q);
    const matchesPattern = problem.pattern.toLowerCase().includes(q);
    const matchesSlug = problem.slug.toLowerCase().includes(q);

    return matchesTitle || matchesId || matchesPattern || matchesSlug;
  });
}

/**
 * Contract Model: Solution Tabs Switcher
 */
export type SolutionTab = 'optimal' | 'bruteForce' | 'patternCue';

export class SolutionTabController {
  public activeTab: SolutionTab;

  constructor(initialTab: SolutionTab = 'optimal') {
    this.activeTab = initialTab;
  }

  public selectTab(tab: SolutionTab): void {
    this.activeTab = tab;
  }
}
