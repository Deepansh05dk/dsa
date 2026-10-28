import type { VisualizerStep } from '../../types/visualizer';

export const TREE_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 104: Maximum Depth of Binary Tree
  104: [
    {
      stepIndex: 0,
      title: 'Initialize Recursive DFS at Root Node (3)',
      description: 'Binary Tree: Root (3) with left child (9) and right child (20) having children (15, 7).',
      codeLineHighlight: 2,
      variables: { currentVal: 3, currentDepth: 1, maxDepthSoFar: 1 },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'current', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'default' },
          { id: '20', value: 20, status: 'default', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'default' },
          { id: '7', value: 7, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Traverse Left Subtree: Visit Node 9 (Leaf Node)',
      description: 'Node 9 has no children. Left depth = 0, right depth = 0. Depth of node 9 = 1 + 0 = 1.',
      codeLineHighlight: 4,
      variables: { currentVal: 9, depth: 1, returnTo: 3 },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'current' },
          { id: '20', value: 20, status: 'default', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'default' },
          { id: '7', value: 7, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Traverse Right Subtree: Visit Node 20',
      description: 'Recurse on node 20. Explore children 15 and 7 at depth 3.',
      codeLineHighlight: 5,
      variables: { currentVal: 20, depth: 2 },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'matched' },
          { id: '20', value: 20, status: 'current', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'default' },
          { id: '7', value: 7, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Explore Leaves 15 and 7 (Depth 3)',
      description: 'Leaves 15 and 7 return height 1 each. Subtree rooted at 20 returns 1 + max(1, 1) = 2.',
      codeLineHighlight: 4,
      variables: { leftSubtreeDepth: 1, rightSubtreeDepth: 2, totalMaxDepth: 3 },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'matched' },
          { id: '20', value: 20, status: 'visited', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'matched' },
          { id: '7', value: 7, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 4,
      title: 'Return Global Max Depth = 1 + max(1, 2) = 3',
      description: 'Maximum depth is 3. Time: O(N), Space: O(H) recursion stack.',
      codeLineHighlight: 6,
      variables: { maxDepth: 3, complete: true },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'highlighted', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'matched' },
          { id: '20', value: 20, status: 'matched', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'matched' },
          { id: '7', value: 7, status: 'matched' },
        ],
      },
    },
  ],

  // Problem 100: Same Tree
  100: [
    {
      stepIndex: 0,
      title: 'Initialize Simultaneous Traversal of Trees p and q',
      description: 'Comparing p and q roots: p.val = 1, q.val = 1. Values match! Recurse on left children.',
      codeLineHighlight: 3,
      variables: { pVal: 1, qVal: 1, match: true },
      treeState: {
        nodes: [
          { id: '1', value: '1==1', status: 'current', leftId: '2', rightId: '3' },
          { id: '2', value: '2==2', status: 'default' },
          { id: '3', value: '3==3', status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Compare Left Children: p.left.val = 2, q.left.val = 2',
      description: 'Left children match (2 === 2). Both have null left and right subtrees. Return true for left branch.',
      codeLineHighlight: 4,
      variables: { pLeft: 2, qLeft: 2, match: true },
      treeState: {
        nodes: [
          { id: '1', value: '1==1', status: 'visited', leftId: '2', rightId: '3' },
          { id: '2', value: '2==2', status: 'matched' },
          { id: '3', value: '3==3', status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Compare Right Children: p.right.val = 3, q.right.val = 3',
      description: 'Right children match (3 === 3). Both have null left and right subtrees. Return true for right branch.',
      codeLineHighlight: 4,
      variables: { pRight: 3, qRight: 3, match: true },
      treeState: {
        nodes: [
          { id: '1', value: '1==1', status: 'visited', leftId: '2', rightId: '3' },
          { id: '2', value: '2==2', status: 'matched' },
          { id: '3', value: '3==3', status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Trees are Structurally Identical (True)',
      description: 'All corresponding nodes match. Return true. Time: O(N), Space: O(H).',
      codeLineHighlight: 6,
      variables: { isSame: true },
      treeState: {
        nodes: [
          { id: '1', value: '1', status: 'highlighted', leftId: '2', rightId: '3' },
          { id: '2', value: '2', status: 'matched' },
          { id: '3', value: '3', status: 'matched' },
        ],
      },
    },
  ],

  // Problem 101: Symmetric Tree
  101: [
    {
      stepIndex: 0,
      title: 'Initialize Mirror Reflection Check at Root (1)',
      description: 'Root has left child (2) and right child (2). Mirror invariant: left.val === right.val.',
      codeLineHighlight: 2,
      variables: { root: 1, leftChild: 2, rightChild: 2 },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'visited', leftId: '2L', rightId: '2R' },
          { id: '2L', value: 2, status: 'current', leftId: '3L', rightId: '4L' },
          { id: '2R', value: 2, status: 'current', leftId: '4R', rightId: '3R' },
          { id: '3L', value: 3, status: 'default' },
          { id: '4L', value: 4, status: 'default' },
          { id: '4R', value: 4, status: 'default' },
          { id: '3R', value: 3, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Compare Outer Children: 2L.left (3) vs 2R.right (3)',
      description: 'Outer mirror nodes match: 3 === 3. Recurse down outer subtrees.',
      codeLineHighlight: 4,
      variables: { outerLeft: 3, outerRight: 3, match: true },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'visited', leftId: '2L', rightId: '2R' },
          { id: '2L', value: 2, status: 'visited', leftId: '3L', rightId: '4L' },
          { id: '2R', value: 2, status: 'visited', leftId: '4R', rightId: '3R' },
          { id: '3L', value: 3, status: 'matched' },
          { id: '4L', value: 4, status: 'default' },
          { id: '4R', value: 4, status: 'default' },
          { id: '3R', value: 3, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Compare Inner Children: 2L.right (4) vs 2R.left (4)',
      description: 'Inner mirror nodes match: 4 === 4. Invariant holds for all mirror pairs.',
      codeLineHighlight: 4,
      variables: { innerLeft: 4, innerRight: 4, match: true },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'highlighted', leftId: '2L', rightId: '2R' },
          { id: '2L', value: 2, status: 'matched', leftId: '3L', rightId: '4L' },
          { id: '2R', value: 2, status: 'matched', leftId: '4R', rightId: '3R' },
          { id: '3L', value: 3, status: 'matched' },
          { id: '4L', value: 4, status: 'matched' },
          { id: '4R', value: 4, status: 'matched' },
          { id: '3R', value: 3, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Mirror Symmetry Verified: Return True',
      description: 'Tree is completely symmetric around vertical center axis. Time: O(N), Space: O(H).',
      codeLineHighlight: 6,
      variables: { isSymmetric: true },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'highlighted', leftId: '2L', rightId: '2R' },
          { id: '2L', value: 2, status: 'matched', leftId: '3L', rightId: '4L' },
          { id: '2R', value: 2, status: 'matched', leftId: '4R', rightId: '3R' },
          { id: '3L', value: 3, status: 'matched' },
          { id: '4L', value: 4, status: 'matched' },
          { id: '4R', value: 4, status: 'matched' },
          { id: '3R', value: 3, status: 'matched' },
        ],
      },
    },
  ],

  // Problem 226: Invert Binary Tree
  226: [
    {
      stepIndex: 0,
      title: 'Initialize Inversion at Root Node (4)',
      description: 'Tree before inversion: Root (4) with left (2 -> 1, 3) and right (7 -> 6, 9).',
      codeLineHighlight: 2,
      variables: { root: 4, leftSubtree: 2, rightSubtree: 7 },
      treeState: {
        nodes: [
          { id: '4', value: 4, status: 'current', leftId: '2', rightId: '7' },
          { id: '2', value: 2, status: 'default', leftId: '1', rightId: '3' },
          { id: '7', value: 7, status: 'default', leftId: '6', rightId: '9' },
          { id: '1', value: 1, status: 'default' },
          { id: '3', value: 3, status: 'default' },
          { id: '6', value: 6, status: 'default' },
          { id: '9', value: 9, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Swap Root Children: 2 and 7 Swapped',
      description: 'Swap left and right pointers of root 4. Now 4.left = 7 and 4.right = 2.',
      codeLineHighlight: 4,
      variables: { root: 4, newLeft: 7, newRight: 2 },
      treeState: {
        nodes: [
          { id: '4', value: 4, status: 'visited', leftId: '7', rightId: '2' },
          { id: '7', value: 7, status: 'current', leftId: '6', rightId: '9' },
          { id: '2', value: 2, status: 'current', leftId: '1', rightId: '3' },
          { id: '6', value: 6, status: 'default' },
          { id: '9', value: 9, status: 'default' },
          { id: '1', value: 1, status: 'default' },
          { id: '3', value: 3, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Recursively Invert Subtrees (Swap 6/9 and 1/3)',
      description: 'Node 7 swaps children 6 and 9 (now 9, 6). Node 2 swaps children 1 and 3 (now 3, 1).',
      codeLineHighlight: 5,
      variables: { invertedSubtrees: true },
      treeState: {
        nodes: [
          { id: '4', value: 4, status: 'highlighted', leftId: '7', rightId: '2' },
          { id: '7', value: 7, status: 'matched', leftId: '9', rightId: '6' },
          { id: '2', value: 2, status: 'matched', leftId: '3', rightId: '1' },
          { id: '9', value: 9, status: 'matched' },
          { id: '6', value: 6, status: 'matched' },
          { id: '3', value: 3, status: 'matched' },
          { id: '1', value: 1, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Binary Tree Inversion Complete',
      description: 'Entire tree mirror inverted. Time: O(N), Space: O(H).',
      codeLineHighlight: 7,
      variables: { complete: true },
      treeState: {
        nodes: [
          { id: '4', value: 4, status: 'highlighted', leftId: '7', rightId: '2' },
          { id: '7', value: 7, status: 'matched', leftId: '9', rightId: '6' },
          { id: '2', value: 2, status: 'matched', leftId: '3', rightId: '1' },
          { id: '9', value: 9, status: 'matched' },
          { id: '6', value: 6, status: 'matched' },
          { id: '3', value: 3, status: 'matched' },
          { id: '1', value: 1, status: 'matched' },
        ],
      },
    },
  ],

  // Problem 102: Binary Tree Level Order Traversal (BFS)
  102: [
    {
      stepIndex: 0,
      title: 'Level 0: Enqueue Root Node (3)',
      description: 'Queue contains [3]. Level 0 size = 1. Process node 3 and enqueue its children (9, 20).',
      codeLineHighlight: 3,
      variables: { level: 0, queue: '[3]', levelValues: '[3]' },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'current', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'default' },
          { id: '20', value: 20, status: 'default', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'default' },
          { id: '7', value: 7, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Level 1: Process Nodes [9, 20]',
      description: 'Pop 9 (no children). Pop 20, enqueue children 15 and 7. Level 1 values: [9, 20].',
      codeLineHighlight: 6,
      variables: { level: 1, processed: '[9, 20]', queue: '[15, 7]' },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'matched' },
          { id: '20', value: 20, status: 'matched', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'current' },
          { id: '7', value: 7, status: 'current' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Level 2: Process Leaves [15, 7]',
      description: 'Pop 15 and 7. Both have no children. Level 2 values: [15, 7]. Queue is now empty.',
      codeLineHighlight: 6,
      variables: { level: 2, processed: '[15, 7]', queue: '[]' },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'visited', leftId: null, rightId: null },
          { id: '20', value: 20, status: 'visited', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'matched' },
          { id: '7', value: 7, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'BFS Complete: Return [[3], [9, 20], [15, 7]]',
      description: 'All 3 levels collected in FIFO order. Time: O(N), Space: O(W) where W is maximum tree width.',
      codeLineHighlight: 9,
      variables: { result: '[[3], [9, 20], [15, 7]]' },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'highlighted', leftId: '9', rightId: '20' },
          { id: '9', value: 9, status: 'matched' },
          { id: '20', value: 20, status: 'matched', leftId: '15', rightId: '7' },
          { id: '15', value: 15, status: 'matched' },
          { id: '7', value: 7, status: 'matched' },
        ],
      },
    },
  ],

  // Problem 199: Binary Tree Right Side View
  199: [
    {
      stepIndex: 0,
      title: 'Level 0: Process Root (1)',
      description: 'Rightmost node at level 0 is 1. Record 1 in right-side view: [1]. Enqueue children (2, 3).',
      codeLineHighlight: 4,
      variables: { level: 0, rightmostVal: 1, view: '[1]' },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'highlighted', leftId: '2', rightId: '3' },
          { id: '2', value: 2, status: 'default', rightId: '5' },
          { id: '3', value: 3, status: 'default', rightId: '4' },
          { id: '5', value: 5, status: 'default' },
          { id: '4', value: 4, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Level 1: Process [2, 3] -> Rightmost is 3',
      description: 'Rightmost node at level 1 is 3. Record 3: [1, 3]. Enqueue children 5 and 4.',
      codeLineHighlight: 6,
      variables: { level: 1, rightmostVal: 3, view: '[1, 3]' },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'visited', leftId: '2', rightId: '3' },
          { id: '2', value: 2, status: 'default', rightId: '5' },
          { id: '3', value: 3, status: 'highlighted', rightId: '4' },
          { id: '5', value: 5, status: 'default' },
          { id: '4', value: 4, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Level 2: Process [5, 4] -> Rightmost is 4',
      description: 'Rightmost node at level 2 is 4. Record 4: [1, 3, 4]. Tree fully traversed.',
      codeLineHighlight: 6,
      variables: { level: 2, rightmostVal: 4, view: '[1, 3, 4]' },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'visited', leftId: '2', rightId: '3' },
          { id: '2', value: 2, status: 'visited', rightId: '5' },
          { id: '3', value: 3, status: 'visited', rightId: '4' },
          { id: '5', value: 5, status: 'default' },
          { id: '4', value: 4, status: 'highlighted' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Return Right-Side View: [1, 3, 4]',
      description: 'Visual observer looking from the right sees nodes 1, 3, 4. Time: O(N), Space: O(W).',
      codeLineHighlight: 9,
      variables: { result: '[1, 3, 4]' },
      treeState: {
        nodes: [
          { id: '1', value: 1, status: 'highlighted', leftId: '2', rightId: '3' },
          { id: '2', value: 2, status: 'default', rightId: '5' },
          { id: '3', value: 3, status: 'highlighted', rightId: '4' },
          { id: '5', value: 5, status: 'default' },
          { id: '4', value: 4, status: 'highlighted' },
        ],
      },
    },
  ],

  // Problem 98: Validate Binary Search Tree
  98: [
    {
      stepIndex: 0,
      title: 'Validate Root (2) with Bounds (-∞, +∞)',
      description: 'Root value 2 satisfies -∞ < 2 < +∞. Recurse on left child with (-∞, 2) and right with (2, +∞).',
      codeLineHighlight: 2,
      variables: { val: 2, minBound: '-Infinity', maxBound: '+Infinity', valid: true },
      treeState: {
        nodes: [
          { id: '2', value: 2, status: 'current', leftId: '1', rightId: '3' },
          { id: '1', value: 1, status: 'default' },
          { id: '3', value: 3, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Validate Left Child (1) with Bounds (-∞, 2)',
      description: 'Left child value 1 satisfies -∞ < 1 < 2. Left subtree is a valid BST.',
      codeLineHighlight: 4,
      variables: { val: 1, minBound: '-Infinity', maxBound: 2, valid: true },
      treeState: {
        nodes: [
          { id: '2', value: 2, status: 'visited', leftId: '1', rightId: '3' },
          { id: '1', value: 1, status: 'matched' },
          { id: '3', value: 3, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Validate Right Child (3) with Bounds (2, +∞)',
      description: 'Right child value 3 satisfies 2 < 3 < +∞. Right subtree is a valid BST.',
      codeLineHighlight: 5,
      variables: { val: 3, minBound: 2, maxBound: '+Infinity', valid: true },
      treeState: {
        nodes: [
          { id: '2', value: 2, status: 'visited', leftId: '1', rightId: '3' },
          { id: '1', value: 1, status: 'matched' },
          { id: '3', value: 3, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'BST Invariant Confirmed Across All Subtrees',
      description: 'Every node strictly satisfies min < val < max. Return true. Time: O(N), Space: O(H).',
      codeLineHighlight: 7,
      variables: { isValidBST: true },
      treeState: {
        nodes: [
          { id: '2', value: 2, status: 'highlighted', leftId: '1', rightId: '3' },
          { id: '1', value: 1, status: 'matched' },
          { id: '3', value: 3, status: 'matched' },
        ],
      },
    },
  ],

  // Problem 236: Lowest Common Ancestor of a Binary Tree
  236: [
    {
      stepIndex: 0,
      title: 'Search for Target Nodes p = 5 and q = 1 from Root (3)',
      description: 'p (5) is in left subtree, q (1) is in right subtree. Recurse down both branches.',
      codeLineHighlight: 2,
      variables: { root: 3, targetP: 5, targetQ: 1 },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'current', leftId: '5', rightId: '1' },
          { id: '5', value: 5, status: 'default', leftId: '6', rightId: '2' },
          { id: '1', value: 1, status: 'default', leftId: '0', rightId: '8' },
          { id: '6', value: 6, status: 'default' },
          { id: '2', value: 2, status: 'default' },
          { id: '0', value: 0, status: 'default' },
          { id: '8', value: 8, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Left Branch Returns Node 5 (Target p Found)',
      description: 'Root.left matches p = 5! Left recursion returns node 5.',
      codeLineHighlight: 3,
      variables: { leftResult: 5, pFound: true },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '5', rightId: '1' },
          { id: '5', value: 5, status: 'matched', leftId: '6', rightId: '2' },
          { id: '1', value: 1, status: 'default', leftId: '0', rightId: '8' },
          { id: '6', value: 6, status: 'default' },
          { id: '2', value: 2, status: 'default' },
          { id: '0', value: 0, status: 'default' },
          { id: '8', value: 8, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Right Branch Returns Node 1 (Target q Found)',
      description: 'Root.right matches q = 1! Right recursion returns node 1.',
      codeLineHighlight: 3,
      variables: { rightResult: 1, qFound: true },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'visited', leftId: '5', rightId: '1' },
          { id: '5', value: 5, status: 'matched', leftId: '6', rightId: '2' },
          { id: '1', value: 1, status: 'matched', leftId: '0', rightId: '8' },
          { id: '6', value: 6, status: 'default' },
          { id: '2', value: 2, status: 'default' },
          { id: '0', value: 0, status: 'default' },
          { id: '8', value: 8, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Both Left & Right Return Non-Null: Root 3 is the LCA!',
      description: 'Because p is in the left subtree and q is in the right subtree, node 3 is the Lowest Common Ancestor. Return 3.',
      codeLineHighlight: 6,
      variables: { lca: 3, time: 'O(N)', space: 'O(H)' },
      treeState: {
        nodes: [
          { id: '3', value: 3, status: 'highlighted', leftId: '5', rightId: '1' },
          { id: '5', value: 5, status: 'matched', leftId: '6', rightId: '2' },
          { id: '1', value: 1, status: 'matched', leftId: '0', rightId: '8' },
          { id: '6', value: 6, status: 'default' },
          { id: '2', value: 2, status: 'default' },
          { id: '0', value: 0, status: 'default' },
          { id: '8', value: 8, status: 'default' },
        ],
      },
    },
  ],
};

/**
 * Universal generator for all other Binary Tree & BST problems
 */
export function generateTreeTrace(_problemId: number, title: string, complexityTime: string): VisualizerStep[] {
  return [
    {
      stepIndex: 0,
      title: `Initialize Tree Traversal for ${title}`,
      description: `Starting recursive tree traversal at root node. Evaluating algorithmic invariant for ${title}.`,
      codeLineHighlight: 2,
      variables: { rootVal: 10, status: 'started' },
      treeState: {
        nodes: [
          { id: 'root', value: 10, status: 'current', leftId: 'left-1', rightId: 'right-1' },
          { id: 'left-1', value: 5, status: 'default', leftId: 'leaf-1', rightId: 'leaf-2' },
          { id: 'right-1', value: 15, status: 'default', leftId: null, rightId: 'leaf-3' },
          { id: 'leaf-1', value: 2, status: 'default' },
          { id: 'leaf-2', value: 7, status: 'default' },
          { id: 'leaf-3', value: 20, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Traverse Left Subtree and Evaluate Subproblem',
      description: 'Processing left branch nodes. Combining subproblem returns from bottom-up.',
      codeLineHighlight: 5,
      variables: { currentNode: 'left-1', val: 5, leftVisited: true },
      treeState: {
        nodes: [
          { id: 'root', value: 10, status: 'visited', leftId: 'left-1', rightId: 'right-1' },
          { id: 'left-1', value: 5, status: 'current', leftId: 'leaf-1', rightId: 'leaf-2' },
          { id: 'right-1', value: 15, status: 'default', leftId: null, rightId: 'leaf-3' },
          { id: 'leaf-1', value: 2, status: 'matched' },
          { id: 'leaf-2', value: 7, status: 'matched' },
          { id: 'leaf-3', value: 20, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Traverse Right Subtree and Aggregate Results',
      description: 'Processing right branch nodes. Aggregating values to root invariant.',
      codeLineHighlight: 7,
      variables: { currentNode: 'right-1', val: 15, rightVisited: true },
      treeState: {
        nodes: [
          { id: 'root', value: 10, status: 'visited', leftId: 'left-1', rightId: 'right-1' },
          { id: 'left-1', value: 5, status: 'matched', leftId: 'leaf-1', rightId: 'leaf-2' },
          { id: 'right-1', value: 15, status: 'current', leftId: null, rightId: 'leaf-3' },
          { id: 'leaf-1', value: 2, status: 'matched' },
          { id: 'leaf-2', value: 7, status: 'matched' },
          { id: 'leaf-3', value: 20, status: 'matched' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Tree Traversal Complete: Return Optimal Metric',
      description: `All nodes evaluated. Execution finished in ${complexityTime} time complexity.`,
      codeLineHighlight: 10,
      variables: { completed: true, timeComplexity: complexityTime },
      treeState: {
        nodes: [
          { id: 'root', value: 10, status: 'highlighted', leftId: 'left-1', rightId: 'right-1' },
          { id: 'left-1', value: 5, status: 'matched', leftId: 'leaf-1', rightId: 'leaf-2' },
          { id: 'right-1', value: 15, status: 'matched', leftId: null, rightId: 'leaf-3' },
          { id: 'leaf-1', value: 2, status: 'matched' },
          { id: 'leaf-2', value: 7, status: 'matched' },
          { id: 'leaf-3', value: 20, status: 'matched' },
        ],
      },
    },
  ];
}
