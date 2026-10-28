import type { PatternMeta } from '../types/problem';

export const PATTERNS: PatternMeta[] = [
  {
    slug: 'array-string',
    name: 'Array / String',
    description: 'Fundamental in-place manipulations, two-pass traversals, prefix running sums, and string parsing.',
    keyInvariant: 'Linear indices with sequential access; maintain bounds and track prefix/suffix state.',
    recognitionCues: [
      'In-place element removal or deduplication without allocating extra memory',
      'Stock trading profit maximization with single or multi-transaction limits',
      'Roman numeral conversion, word reversing, or text formatting'
    ],
    icon: 'Layers',
    problemCount: 24,
  },
  {
    slug: 'two-pointers',
    name: 'Two Pointers',
    description: 'Converging or parallel pointers moving inward or in lockstep across sorted or linear sequences.',
    keyInvariant: 'Monotonicity in sorted data allows eliminating redundant search spaces in O(1) per step.',
    recognitionCues: [
      'Sorted array search for target pair sums or triplets (e.g., 2Sum II, 3Sum)',
      'Palindrome verification by comparing outer characters moving inward',
      'Container area maximization constrained by the shorter boundary line'
    ],
    icon: 'ArrowLeftRight',
    problemCount: 5,
  },
  {
    slug: 'sliding-window',
    name: 'Sliding Window',
    description: 'Dynamic range [L, R] expanding and contracting to find optimal contiguous subarrays or substrings.',
    keyInvariant: 'Window validity preserves monotonic condition; expand R to satisfy, shrink L to minimize.',
    recognitionCues: [
      'Contiguous subarray with sum >= target or exact length constraint',
      'Longest substring without repeating characters or with k distinct characters',
      'Minimum window substring containing all characters of a template'
    ],
    icon: 'Maximize2',
    problemCount: 4,
  },
  {
    slug: 'matrix',
    name: 'Matrix',
    description: '2D grid transformations, spiral boundaries, cell simulations, and 90-degree in-place rotations.',
    keyInvariant: 'Coordinate mappings (r, c) with boundary shrinkage and state bitflags for in-place updates.',
    recognitionCues: [
      'Spiral or diagonal traversal with 4 dynamic wall boundaries',
      'In-place grid rotation by transposing and reversing rows',
      'Conway Game of Life or Zeroing matrix without secondary grid memory'
    ],
    icon: 'Grid',
    problemCount: 5,
  },
  {
    slug: 'hashmap',
    name: 'Hashmap',
    description: 'Constant-time O(1) key-value lookups, frequency counting, complement matching, and group clustering.',
    keyInvariant: 'Trading O(N) space for O(1) access to previously seen values or canonical sorted keys.',
    recognitionCues: [
      'Finding pair complement: target - current_val in single pass',
      'Anagram grouping by sorted signature or character count tuple',
      'Isomorphic character mapping verification with bidirectional maps'
    ],
    icon: 'Hash',
    problemCount: 9,
  },
  {
    slug: 'intervals',
    name: 'Intervals',
    description: 'Sorting intervals by start/end times and resolving overlaps, merges, or minimal resource cuts.',
    keyInvariant: 'Ordering by start time transforms 2D overlapping checks into 1D adjacent comparisons.',
    recognitionCues: [
      'Merging overlapping calendar meetings or contiguous ranges',
      'Inserting new interval into an already sorted non-overlapping list',
      'Minimum arrows to burst balloons by tracking greedy interval endpoints'
    ],
    icon: 'Split',
    problemCount: 4,
  },
  {
    slug: 'stack',
    name: 'Stack',
    description: 'LIFO evaluation for nested syntax, bracket validation, monotonic scans, and expression parsing.',
    keyInvariant: 'Most recent unresolved scope or open delimiter must match first before earlier ones.',
    recognitionCues: [
      'Nested bracket balancing: parentheses, braces, square brackets',
      'Directory path normalization containing relative ../ and ./ segments',
      'Arithmetic expression evaluation with precedence (RPN or infix calculator)'
    ],
    icon: 'SquareStack',
    problemCount: 5,
  },
  {
    slug: 'linked-list',
    name: 'Linked List',
    description: 'Sequential pointer manipulations, sentinel dummy nodes, fast/slow cycle detection, and list reversals.',
    keyInvariant: 'Sentinel dummy node eliminates edge cases for head updates; pointer order avoids orphan nodes.',
    recognitionCues: [
      'Reversing single subsegment or entire linked list in-place',
      'Cycle detection or finding middle node using Floyd slow/fast pointers',
      'Merging k sorted lists or partitioned nodes around pivot value'
    ],
    icon: 'Link2',
    problemCount: 11,
  },
  {
    slug: 'binary-tree-general',
    name: 'Binary Tree General',
    description: 'Recursive divide-and-conquer, depth-first traversals (pre/in/post-order), and tree reconstructions.',
    keyInvariant: 'Subtree optimality: root combines answers computed independently from left and right children.',
    recognitionCues: [
      'Maximum tree depth, diameter, or path sum calculation',
      'Lowest Common Ancestor (LCA) in recursive tree traversal',
      'Reconstructing tree from preorder and inorder traversal arrays'
    ],
    icon: 'GitFork',
    problemCount: 14,
  },
  {
    slug: 'binary-tree-bfs',
    name: 'Binary Tree BFS',
    description: 'Level-order breadth-first search using queues, level batch processing, and zigzag traversals.',
    keyInvariant: 'Queue length snapshot at start of each iteration processes exact tree levels independently.',
    recognitionCues: [
      'Level-order list of node values from top to bottom',
      'Right-side view or left-side view of a tree',
      'Average value of nodes on each level'
    ],
    icon: 'Network',
    problemCount: 4,
  },
  {
    slug: 'binary-search-tree',
    name: 'Binary Search Tree',
    description: 'BST ordering properties: left < root < right; in-order traversal yields strictly sorted sequence.',
    keyInvariant: 'In-order traversal visits BST keys in strictly monotonic increasing order.',
    recognitionCues: [
      'Validating whether a binary tree satisfies the BST invariant',
      'Finding the kth smallest or largest value in a BST',
      'Minimum absolute difference between any two nodes in BST'
    ],
    icon: 'GitCommit',
    problemCount: 3,
  },
  {
    slug: 'graph-general',
    name: 'Graph General',
    description: 'Depth-first search, connected components, cycle detection, topological sorting, and cloning.',
    keyInvariant: 'Visited tracking prevents infinite cycles; in-degree array detects DAG topological ordering.',
    recognitionCues: [
      'Number of islands in a grid via connected component exploration',
      'Course prerequisite dependencies (topological sort via Kahn algorithm or DFS)',
      'Deep cloning a connected undirected graph with cycle memory'
    ],
    icon: 'Share2',
    problemCount: 6,
  },
  {
    slug: 'graph-bfs',
    name: 'Graph BFS',
    description: 'Shortest path exploration in unweighted graphs, state transitions, and minimum mutation ladders.',
    keyInvariant: 'First time a state is visited via BFS queue marks the globally shortest path distance.',
    recognitionCues: [
      'Shortest word transformation sequence (Word Ladder)',
      'Minimum dice throws on Snakes and Ladders board',
      'Minimum genetic mutations between starting and target gene strings'
    ],
    icon: 'Compass',
    problemCount: 3,
  },
  {
    slug: 'trie',
    name: 'Trie',
    description: 'Prefix tree data structure for dictionary lookups, autocomplete, wildcard searching, and word boggles.',
    keyInvariant: 'Shared prefix paths reduce space and allow O(L) lookup independent of dictionary size.',
    recognitionCues: [
      'Prefix-based word search with startsWith and insert operations',
      'Wildcard pattern matching with . substituting any character',
      '2D grid word boggle search with multiple dictionary words'
    ],
    icon: 'FolderTree',
    problemCount: 3,
  },
  {
    slug: 'backtracking',
    name: 'Backtracking',
    description: 'Systematic exploration of decision trees with choice making, constraint pruning, and state restoration.',
    keyInvariant: 'Always undo state modifications after returning from recursive exploration branch.',
    recognitionCues: [
      'Generating all permutations, combinations, or power set subsets',
      'Solving N-Queens, Sudoku, or grid word searches',
      'Generating well-formed parentheses pairs'
    ],
    icon: 'Undo2',
    problemCount: 7,
  },
  {
    slug: 'divide-and-conquer',
    name: 'Divide & Conquer',
    description: 'Splitting problems into independent subproblems, solving recursively, and recombining solutions.',
    keyInvariant: 'Master Theorem efficiency: reducing problem size logarithmically at each recursion depth.',
    recognitionCues: [
      'Sorting a linked list in O(N log N) using merge sort',
      'Constructing balanced BST from sorted array',
      'Merging k sorted lists using divide-and-conquer pair merges'
    ],
    icon: 'Scissors',
    problemCount: 4,
  },
  {
    slug: 'kadanes-algorithm',
    name: "Kadane's Algorithm",
    description: 'Optimal maximum subarray sum tracking contiguous positive momentum in linear time.',
    keyInvariant: 'At index i, max sum is either extending previous sum or resetting to current element.',
    recognitionCues: [
      'Finding contiguous subarray with largest sum in one pass',
      'Maximum sum circular subarray with wrap-around boundaries'
    ],
    icon: 'TrendingUp',
    problemCount: 2,
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    description: 'Logarithmic O(log N) search space reduction via monotonic predicate evaluation.',
    keyInvariant: 'Search predicate partitions space into [true, ..., true, false, ..., false].',
    recognitionCues: [
      'Finding target index or insertion position in sorted sequence',
      'Finding peak element or rotation pivot in shifted sorted array',
      'Median of two sorted arrays by binary searching partition splits'
    ],
    icon: 'Search',
    problemCount: 7,
  },
  {
    slug: 'heap',
    name: 'Heap',
    description: 'Priority queue tracking top-k extreme elements or streaming medians in logarithmic time.',
    keyInvariant: 'Root element always maintains min or max invariant for immediate O(1) retrieval.',
    recognitionCues: [
      'Kth largest or smallest element in unsorted array without full sorting',
      'Continuous median calculation from data stream using dual min/max heaps',
      'IPO capital maximization with greedy priority queues'
    ],
    icon: 'Mountain',
    problemCount: 4,
  },
  {
    slug: 'bit-manipulation',
    name: 'Bit Manipulation',
    description: 'Bitwise operations (AND, OR, XOR, shifts) for constant-time arithmetic and unique element isolation.',
    keyInvariant: 'XOR self-cancellation: a ^ a = 0 and a ^ 0 = a isolates odd-occurring elements.',
    recognitionCues: [
      'Single non-repeating number where others repeat twice or thrice',
      'Hamming weight: counting number of set 1-bits via n & (n - 1)',
      'Binary addition or bit reversal of 32-bit integers'
    ],
    icon: 'Cpu',
    problemCount: 6,
  },
  {
    slug: 'math',
    name: 'Math',
    description: 'Numerical algorithms, base arithmetic, geometry, modular arithmetic, and integer square roots.',
    keyInvariant: 'Mathematical properties bypass brute force simulation through direct closed forms or bounds.',
    recognitionCues: [
      'Integer palindrome check without converting number to string',
      'Factorial trailing zeroes by counting factors of 5',
      'Fast exponentiation (Pow(x, n)) using logarithmic binary squaring'
    ],
    icon: 'Calculator',
    problemCount: 6,
  },
  {
    slug: '1d-dp',
    name: '1D DP',
    description: 'One-dimensional optimal substructure with overlapping subproblems and memoized transitions.',
    keyInvariant: 'State at index i depends on a fixed constant number of previous optimal states.',
    recognitionCues: [
      'Climbing stairs or Fibonacci recurrence: dp[i] = dp[i-1] + dp[i-2]',
      'House Robber: dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
      'Coin Change: minimum coins to achieve target amount'
    ],
    icon: 'ListOrdered',
    problemCount: 5,
  },
  {
    slug: 'multidimensional-dp',
    name: 'Multidimensional DP',
    description: '2D grid DP, sequence alignment, string edits, and state-machine stock trading with transaction limits.',
    keyInvariant: 'Matrix cell dp[i][j] represents subproblem optimal value up to prefix lengths i and j.',
    recognitionCues: [
      'Minimum path sum or unique paths across a 2D grid with obstacles',
      'Edit distance between two strings with insert/delete/replace operations',
      'Longest palindromic substring or interleaving string validation'
    ],
    icon: 'Table',
    problemCount: 9,
  },
];
