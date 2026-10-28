import type { LeetCodeProblem } from '../../types/problem';

export const binaryTreeGeneralProblems: LeetCodeProblem[] = [
  {
    id: 104,
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      },
      {
        input: 'root = [1,null,2]',
        output: '2'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    bruteForce: {
      name: 'Level-Order BFS Queue Traversal',
      code: `function maxDepthBrute(root: any): number {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Traverses the tree level by level using an explicit FIFO queue and increments depth at each level.'
    },
    optimal: {
      name: 'Divide and Conquer Recursive DFS',
      code: `function maxDepth(root: any): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H) recursion stack'
      },
      explanation: 'Maximum depth is defined recursively: the depth of any tree is 1 + maximum of the depths of its left and right subtrees. Base case of null returns 0.',
      whyOptimalIsPreferred: 'Compact recursive divide-and-conquer implementation with O(H) call stack memory, avoiding queue buffer allocations.',
      patternInvariant: 'Subtree optimality: root height depends solely on max(leftHeight, rightHeight) + 1.'
    },
    defaultInputDescription: 'root = [3, 9, 20, null, null, 15, 7]'
  },
  {
    id: 100,
    slug: 'same-tree',
    title: 'Same Tree',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
    examples: [
      {
        input: 'p = [1,2,3], q = [1,2,3]',
        output: 'true'
      },
      {
        input: 'p = [1,2], q = [1,null,2]',
        output: 'false'
      },
      {
        input: 'p = [1,2,1], q = [1,1,2]',
        output: 'false'
      }
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4'
    ],
    bruteForce: {
      name: 'Tree String Serialization Comparison',
      code: `function isSameTreeBrute(p: any, q: any): boolean {
  function serialize(node: any): string {
    if (!node) return '#';
    return \`\${node.val}(\${serialize(node.left)})(\${serialize(node.right)})\`;
  }
  return serialize(p) === serialize(q);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Converts both trees to parenthesized string representations and compares strings for equality.'
    },
    optimal: {
      name: 'Simultaneous Recursive Tree Traversal',
      code: `function isSameTree(p: any, q: any): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Traverse p and q simultaneously. If both are null, return true. If exactly one is null or their values differ, return false. Otherwise recurse on both left and right subtrees.',
      whyOptimalIsPreferred: 'Short-circuits immediately upon the first mismatch without allocating serialization strings.',
      patternInvariant: 'Tree equivalence invariant: p and q match iff root values match and respective subtrees match recursively.'
    },
    defaultInputDescription: 'p = [1, 2, 3], q = [1, 2, 3]'
  },
  {
    id: 226,
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a binary tree, invert the tree, and return its root.',
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]'
      },
      {
        input: 'root = [2,1,3]',
        output: '[2,3,1]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    bruteForce: {
      name: 'Level-Order Queue Inversion',
      code: `function invertTreeBrute(root: any): any {
  if (!root) return null;
  const q = [root];
  while (q.length > 0) {
    const node = q.shift()!;
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
  return root;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Breadth-first search that swaps left and right children using an explicit queue.'
    },
    optimal: {
      name: 'Post-Order Recursive Child Swap',
      code: `function invertTree(root: any): any {
  if (!root) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);

  root.left = right;
  root.right = left;

  return root;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Recursively invert left and right subtrees, then swap root.left and root.right. Returns root in clean O(H) stack space.',
      whyOptimalIsPreferred: 'Direct in-place pointer swapping that requires zero heap data structure allocations.',
      patternInvariant: 'Mirror inversion symmetry: inverting a binary tree requires inverting each subtree and swapping the child pointers.'
    },
    defaultInputDescription: 'root = [4, 2, 7, 1, 3, 6, 9]'
  },
  {
    id: 101,
    slug: 'symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    examples: [
      {
        input: 'root = [1,2,2,3,4,4,3]',
        output: 'true'
      },
      {
        input: 'root = [1,2,2,null,3,null,3]',
        output: 'false'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000].',
      '-100 <= Node.val <= 100'
    ],
    bruteForce: {
      name: 'Level-Order Palindrome Array Testing',
      code: `function isSymmetricBrute(root: any): boolean {
  if (!root) return true;
  let q: any[] = [root];
  while (q.length > 0) {
    const vals = q.map(n => n ? n.val : null);
    let l = 0, r = vals.length - 1;
    while (l < r) { if (vals[l++] !== vals[r--]) return false; }
    const nextQ: any[] = [];
    for (const n of q) {
      if (n) { nextQ.push(n.left); nextQ.push(n.right); }
    }
    q = nextQ;
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Inspects each tree level by converting to an array with null placeholders and checking palindromic equality.'
    },
    optimal: {
      name: 'Dual Subtree Mirror Recursion',
      code: `function isSymmetric(root: any): boolean {
  if (!root) return true;

  function isMirror(t1: any, t2: any): boolean {
    if (!t1 && !t2) return true;
    if (!t1 || !t2 || t1.val !== t2.val) return false;

    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }

  return isMirror(root.left, root.right);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'A tree is symmetric if its left and right subtrees are mirrors. Recursively compare t1.left with t2.right and t1.right with t2.left, aborting immediately on mismatch.',
      whyOptimalIsPreferred: 'Short-circuits on the first asymmetry in O(H) stack space without allocating level arrays.',
      patternInvariant: 'Mirror symmetry invariant: t1.left matches t2.right and t1.right matches t2.left.'
    },
    defaultInputDescription: 'root = [1, 2, 2, 3, 4, 4, 3]'
  },
  {
    id: 105,
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
    examples: [
      {
        input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        output: '[3,9,20,null,null,15,7]'
      },
      {
        input: 'preorder = [-1], inorder = [-1]',
        output: '[-1]'
      }
    ],
    constraints: [
      '1 <= preorder.length <= 3000',
      'inorder.length == preorder.length',
      '-3000 <= preorder[i], inorder[i] <= 3000',
      'preorder and inorder consist of unique values.',
      'Each value of inorder also appears in preorder.'
    ],
    bruteForce: {
      name: 'Linear Inorder Slicing (O(N^2))',
      code: `function buildTreeBrute(preorder: number[], inorder: number[]): any {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootVal = preorder[0];
  const rootIdx = inorder.indexOf(rootVal);
  const leftIn = inorder.slice(0, rootIdx);
  const rightIn = inorder.slice(rootIdx + 1);
  const leftPre = preorder.slice(1, 1 + leftIn.length);
  const rightPre = preorder.slice(1 + leftIn.length);
  return {
    val: rootVal,
    left: buildTreeBrute(leftPre, leftIn),
    right: buildTreeBrute(rightPre, rightIn)
  };
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      },
      explanation: 'Uses indexOf to locate root and slices arrays recursively, causing quadratic array copies.'
    },
    optimal: {
      name: 'Hash Map Inorder Index Lookups & Pointer Bounds',
      code: `function buildTree(preorder: number[], inorder: number[]): any {
  const inMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inMap.set(inorder[i], i);
  }

  let preIdx = 0;

  function build(inLeft: number, inRight: number): any {
    if (inLeft > inRight) return null;

    const rootVal = preorder[preIdx++];
    const inPivot = inMap.get(rootVal)!;

    const root = {
      val: rootVal,
      left: build(inLeft, inPivot - 1),
      right: build(inPivot + 1, inRight)
    };

    return root;
  }

  return build(0, inorder.length - 1);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Precompute value -> index mapping of inorder array in a Hash Map for O(1) pivot lookups. Pass index boundaries (inLeft, inRight) rather than slicing arrays, running in optimal linear O(N) time.',
      whyOptimalIsPreferred: 'Linear O(N) time execution avoiding all array slicing operations and O(N) linear scans for root location.',
      patternInvariant: 'Preorder supplies the root (first element), while Inorder partitions the root into left and right subtrees.'
    },
    defaultInputDescription: 'preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]'
  },
  {
    id: 106,
    slug: 'construct-binary-tree-from-inorder-and-postorder-traversal',
    title: 'Construct Binary Tree from Inorder and Postorder Traversal',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.',
    examples: [
      {
        input: 'inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]',
        output: '[3,9,20,null,null,15,7]'
      },
      {
        input: 'inorder = [-1], postorder = [-1]',
        output: '[-1]'
      }
    ],
    constraints: [
      '1 <= inorder.length <= 3000',
      'postorder.length == inorder.length',
      '-3000 <= inorder[i], postorder[i] <= 3000',
      'inorder and postorder consist of unique values.',
      'Each value of postorder also appears in inorder.'
    ],
    bruteForce: {
      name: 'Array Slicing via Postorder Root Extraction',
      code: `function buildTreePostBrute(inorder: number[], postorder: number[]): any {
  if (inorder.length === 0 || postorder.length === 0) return null;
  const rootVal = postorder[postorder.length - 1];
  const pivot = inorder.indexOf(rootVal);
  const leftIn = inorder.slice(0, pivot);
  const rightIn = inorder.slice(pivot + 1);
  const leftPost = postorder.slice(0, leftIn.length);
  const rightPost = postorder.slice(leftIn.length, postorder.length - 1);
  return {
    val: rootVal,
    left: buildTreePostBrute(leftIn, leftPost),
    right: buildTreePostBrute(rightIn, rightPost)
  };
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      },
      explanation: 'Slices inorder and postorder arrays recursively, copying elements at each depth.'
    },
    optimal: {
      name: 'Hash Map Inorder Index Lookups (Right-First Build)',
      code: `function buildTree(inorder: number[], postorder: number[]): any {
  const inMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inMap.set(inorder[i], i);
  }

  let postIdx = postorder.length - 1;

  function build(inLeft: number, inRight: number): any {
    if (inLeft > inRight) return null;

    const rootVal = postorder[postIdx--];
    const inPivot = inMap.get(rootVal)!;

    const root: any = { val: rootVal, left: null, right: null };
    // Build right subtree before left subtree because postorder ends with root preceded by right subtree
    root.right = build(inPivot + 1, inRight);
    root.left = build(inLeft, inPivot - 1);

    return root;
  }

  return build(0, inorder.length - 1);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'The root is the last element of postorder. Precompute inMap for O(1) lookups. By decrementing postIdx and constructing root.right before root.left, the postorder sequence is consumed cleanly in O(N) time.',
      whyOptimalIsPreferred: 'Linear O(N) execution that constructs nodes without array copying or linear search scans.',
      patternInvariant: 'Postorder right-first consumption: scanning postorder from right to left yields root, then right subtree, then left subtree.'
    },
    defaultInputDescription: 'inorder = [9, 3, 15, 20, 7], postorder = [9, 15, 7, 20, 3]'
  },
  {
    id: 117,
    slug: 'populating-next-right-pointers-in-each-node-ii',
    title: 'Populating Next Right Pointers in Each Node II',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given a binary tree, populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Initially, all next pointers are set to NULL.',
    examples: [
      {
        input: 'root = [1,2,3,4,5,null,7]',
        output: '[1,#,2,3,#,4,5,7,#]',
        explanation: 'Given the above binary tree, your function should populate each next pointer to point to its next right node.'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 6000].',
      '-100 <= Node.val <= 100'
    ],
    bruteForce: {
      name: 'Level-Order Queue Pointer Linking',
      code: `function connectBrute(root: any): any {
  if (!root) return null;
  const q = [root];
  while (q.length > 0) {
    const sz = q.length;
    for (let i = 0; i < sz; i++) {
      const node = q.shift();
      if (i < sz - 1) node.next = q[0];
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return root;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Uses a standard BFS queue to link next pointers across each level, consuming O(N) space.'
    },
    optimal: {
      name: 'Sentinel Dummy Head Pointer Stitching (O(1) Space)',
      code: `function connect(root: any): any {
  if (!root) return null;

  let curr = root;

  while (curr !== null) {
    const dummy = { val: 0, next: null as any };
    let tail = dummy;

    while (curr !== null) {
      if (curr.left) {
        tail.next = curr.left;
        tail = tail.next;
      }
      if (curr.right) {
        tail.next = curr.right;
        tail = tail.next;
      }
      curr = curr.next; // Move across current level via established next pointers
    }

    curr = dummy.next; // Drop down to next level
  }

  return root;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'Traverse the current level like a linked list using .next pointers. As we walk, stitch together the next level using a sentinel dummy head. When current level finishes, advance to dummy.next in constant space.',
      whyOptimalIsPreferred: 'Satisfies the strict constant O(1) space constraint by using already established next pointers as the traversal queue.',
      patternInvariant: 'Use the previous level\'s next pointers as an implicit queue to construct the next level\'s linked list.'
    },
    defaultInputDescription: 'root = [1, 2, 3, 4, 5, null, 7]'
  },
  {
    id: 114,
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a binary tree, flatten the tree into a "linked list": The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null. The "linked list" should be in the same order as a pre-order traversal of the binary tree.',
    examples: [
      {
        input: 'root = [1,2,5,3,4,null,6]',
        output: '[1,null,2,null,3,null,4,null,5,null,6]'
      },
      {
        input: 'root = []',
        output: '[]'
      },
      {
        input: 'root = [0]',
        output: '[0]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-100 <= Node.val <= 100'
    ],
    bruteForce: {
      name: 'Preorder Array Collection and Relinking',
      code: `function flattenBrute(root: any): void {
  if (!root) return;
  const nodes: any[] = [];
  function preorder(node: any) {
    if (!node) return;
    nodes.push(node);
    preorder(node.left);
    preorder(node.right);
  }
  preorder(root);
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].left = null;
    nodes[i].right = nodes[i + 1];
  }
  nodes[nodes.length - 1].left = null;
  nodes[nodes.length - 1].right = null;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Dumps nodes into a preorder array and relinks left to null and right to adjacent node.'
    },
    optimal: {
      name: 'Morris-Style In-Place Splicing (O(1) Auxiliary Space)',
      code: `function flatten(root: any): void {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      // Find rightmost node of left subtree
      let rightmost = curr.left;
      while (rightmost.right !== null) {
        rightmost = rightmost.right;
      }

      // Splice original right subtree to rightmost of left subtree
      rightmost.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'For each node with a left child, find the predecessor (rightmost node of the left subtree). Connect predecessor.right to curr.right. Move left subtree to curr.right and set left to null. Advance to curr.right in O(1) space.',
      whyOptimalIsPreferred: 'Fully in-place flattening in O(1) extra space without recursion stack or auxiliary node lists.',
      patternInvariant: 'Morris predecessor connection: in preorder traversal, the right subtree is visited immediately after the rightmost node of the left subtree.'
    },
    defaultInputDescription: 'root = [1, 2, 5, 3, 4, null, 6]'
  },
  {
    id: 112,
    slug: 'path-sum',
    title: 'Path Sum',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum. A leaf is a node with no children.',
    examples: [
      {
        input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
        output: 'true',
        explanation: 'The root-to-leaf path with the target sum is 5 -> 4 -> 11 -> 2.'
      },
      {
        input: 'root = [1,2,3], targetSum = 5',
        output: 'false'
      },
      {
        input: 'root = [], targetSum = 0',
        output: 'false'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000'
    ],
    bruteForce: {
      name: 'All Paths Collection and Summation',
      code: `function hasPathSumBrute(root: any, targetSum: number): boolean {
  if (!root) return false;
  const paths: number[][] = [];
  function collect(node: any, cur: number[]) {
    if (!node) return;
    cur.push(node.val);
    if (!node.left && !node.right) paths.push([...cur]);
    collect(node.left, cur);
    collect(node.right, cur);
    cur.pop();
  }
  collect(root, []);
  return paths.some(p => p.reduce((a,b) => a+b, 0) === targetSum);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      },
      explanation: 'Collects all root-to-leaf path arrays and sums their elements.'
    },
    optimal: {
      name: 'Recursive Subtraction Down to Leaf',
      code: `function hasPathSum(root: any, targetSum: number): boolean {
  if (!root) return false;

  // Leaf check
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  const remainder = targetSum - root.val;
  return hasPathSum(root.left, remainder) || hasPathSum(root.right, remainder);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Subtract root.val from targetSum as you recurse downward. When reaching a leaf, return whether the remaining targetSum equals root.val.',
      whyOptimalIsPreferred: 'Short-circuits immediately upon finding any valid path, requiring O(H) stack memory and zero array allocations.',
      patternInvariant: 'Path sum decomposition: path(node, target) = path(child, target - node.val).'
    },
    defaultInputDescription: 'root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22'
  },
  {
    id: 129,
    slug: 'sum-root-to-leaf-numbers',
    title: 'Sum Root to Leaf Numbers',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123. Return the total sum of all root-to-leaf numbers. A leaf node is a node with no children.',
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '25',
        explanation: 'The root-to-leaf path 1->2 represents number 12. The root-to-leaf path 1->3 represents number 13. Therefore, sum = 12 + 13 = 25.'
      },
      {
        input: 'root = [4,9,0,5,1]',
        output: '1026',
        explanation: 'The root-to-leaf path 4->9->5 represents number 495. The root-to-leaf path 4->9->1 represents number 491. The root-to-leaf path 4->0 represents number 40. Therefore, sum = 495 + 491 + 40 = 1026.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000].',
      '0 <= Node.val <= 9',
      'The depth of the tree will not exceed 10.'
    ],
    bruteForce: {
      name: 'String Concatenation Paths Collection',
      code: `function sumNumbersBrute(root: any): number {
  const nums: string[] = [];
  function dfs(node: any, path: string) {
    if (!node) return;
    path += node.val;
    if (!node.left && !node.right) nums.push(path);
    dfs(node.left, path);
    dfs(node.right, path);
  }
  dfs(root, '');
  return nums.reduce((acc, s) => acc + parseInt(s, 10), 0);
}`,
      complexity: {
        time: 'O(N * H)',
        space: 'O(N * H)'
      },
      explanation: 'Accumulates string representations of numbers along paths and parses them back into numbers.'
    },
    optimal: {
      name: 'Recursive Horner\'s Method Accumulation',
      code: `function sumNumbers(root: any): number {
  function dfs(node: any, currentSum: number): number {
    if (!node) return 0;

    currentSum = currentSum * 10 + node.val;

    if (!node.left && !node.right) {
      return currentSum;
    }

    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  }

  return dfs(root, 0);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Carry running number as integer: currentSum = currentSum * 10 + node.val. If leaf, return currentSum directly; else return the sum of results from left and right children.',
      whyOptimalIsPreferred: 'Linear O(N) single pass using pure arithmetic registers with zero string allocations.',
      patternInvariant: 'Decimal shift property: passing current * 10 + val naturally shifts digits down the tree path.'
    },
    defaultInputDescription: 'root = [1, 2, 3]'
  },
  {
    id: 124,
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum of a path is the sum of the node\'s values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.',
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '6',
        explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.'
      },
      {
        input: 'root = [-10,9,20,null,null,15,7]',
        output: '42',
        explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    bruteForce: {
      name: 'Pairwise Path Calculation for All Pairs of Nodes',
      code: `function maxPathSumBrute(root: any): number {
  let maxSum = -Infinity;
  function maxGainFromNode(node: any): number {
    if (!node) return 0;
    return Math.max(0, node.val + Math.max(maxGainFromNode(node.left), maxGainFromNode(node.right)));
  }
  function checkAllNodes(node: any) {
    if (!node) return;
    const l = Math.max(0, maxGainFromNode(node.left));
    const r = Math.max(0, maxGainFromNode(node.right));
    maxSum = Math.max(maxSum, node.val + l + r);
    checkAllNodes(node.left);
    checkAllNodes(node.right);
  }
  checkAllNodes(root);
  return maxSum;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(H)'
      },
      explanation: 'Re-evaluates maximum branch paths from scratch for every node, producing quadratic runtime.'
    },
    optimal: {
      name: 'Post-Order DFS Single-Branch Gain Aggregation',
      code: `function maxPathSum(root: any): number {
  let maxSum = -Infinity;

  function maxGain(node: any): number {
    if (!node) return 0;

    // Discard negative gains from subtrees
    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    // Price of the new path where 'node' is the highest turning point
    const priceNewPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewPath);

    // Return the max gain if continuing the path through parent
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'In post-order DFS, each node calculates the max gain it can contribute to a parent path: node.val + max(0, leftGain, rightGain). Concurrently, test if the arch path (node.val + leftGain + rightGain) beats global maxSum.',
      whyOptimalIsPreferred: 'Linear O(N) execution that computes both the arch path maximum and linear branch contribution in a single traversal.',
      patternInvariant: 'Arch vs Branch duality: an optimal path can only fork (turn) at one highest node; parent paths can only extend along a single branch.'
    },
    defaultInputDescription: 'root = [-10, 9, 20, null, null, 15, 7]'
  },
  {
    id: 173,
    slug: 'binary-search-tree-iterator',
    title: 'Binary Search Tree Iterator',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST): BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. int next() Moves the pointer to the right, then returns the number at the pointer. Notice that next() and hasNext() should run in average O(1) time and use O(h) memory, where h is the height of the tree.',
    examples: [
      {
        input: '["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"], [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]',
        output: '[null, 3, 7, true, 9, true, 15, true, 20, false]',
        explanation: 'BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]); bSTIterator.next(); // return 3; bSTIterator.next(); // return 7; bSTIterator.hasNext(); // return True; bSTIterator.next(); // return 9; bSTIterator.hasNext(); // return True; bSTIterator.next(); // return 15; bSTIterator.hasNext(); // return True; bSTIterator.next(); // return 20; bSTIterator.hasNext(); // return False'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^5].',
      '0 <= Node.val <= 10^6',
      'At most 10^5 calls will be made to hasNext, and next.'
    ],
    bruteForce: {
      name: 'Full Array In-Order Flattening',
      code: `class BSTIteratorBrute {
  private vals: number[] = [];
  private ptr: number = 0;
  constructor(root: any) {
    const inorder = (node: any) => {
      if (!node) return;
      inorder(node.left);
      this.vals.push(node.val);
      inorder(node.right);
    };
    inorder(root);
  }
  next(): number { return this.vals[this.ptr++]; }
  hasNext(): boolean { return this.ptr < this.vals.length; }
}`,
      complexity: {
        time: 'O(N) initialization, O(1) next/hasNext',
        space: 'O(N)'
      },
      explanation: 'Flattens all N nodes of the tree into an array upon initialization, violating the O(H) space constraint.'
    },
    optimal: {
      name: 'Controlled Recursion Stack (O(H) Memory)',
      code: `class BSTIterator {
  private stack: any[] = [];

  constructor(root: any) {
    this.pushAllLeft(root);
  }

  private pushAllLeft(node: any) {
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next(): number {
    const node = this.stack.pop();
    if (node.right) {
      this.pushAllLeft(node.right);
    }
    return node.val;
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }
}`,
      complexity: {
        time: 'O(1) amortized for next(), O(1) for hasNext()',
        space: 'O(H) memory'
      },
      explanation: 'Simulate iterative in-order traversal. Push all left descendants onto the stack up to depth H. On next(), pop the top element, push all left descendants of its right child, and return val. Each node is pushed and popped exactly once, yielding amortized O(1) time in O(H) space.',
      whyOptimalIsPreferred: 'Strictly satisfies the O(H) memory constraint and O(1) amortized time requirement without pre-flattening the entire tree.',
      patternInvariant: 'Controlled recursion stack invariant: stack top always stores the next in-order predecessor.'
    },
    defaultInputDescription: 'root = [7, 3, 15, null, null, 9, 20]'
  },
  {
    id: 222,
    slug: 'count-complete-tree-nodes',
    title: 'Count Complete Tree Nodes',
    difficulty: 'Easy',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given the root of a complete binary tree, return the number of the nodes in the tree. According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. Design an algorithm that runs in less than O(n) time complexity.',
    examples: [
      {
        input: 'root = [1,2,3,4,5,6]',
        output: '6'
      },
      {
        input: 'root = []',
        output: '0'
      },
      {
        input: 'root = [1]',
        output: '1'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5 * 10^4].',
      '0 <= Node.val <= 5 * 10^4',
      'The tree is guaranteed to be complete.'
    ],
    bruteForce: {
      name: 'Standard Recursive DFS Traversal (O(N))',
      code: `function countNodesBrute(root: any): number {
  if (!root) return 0;
  return 1 + countNodesBrute(root.left) + countNodesBrute(root.right);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Visits every node in the tree recursively without exploiting the complete tree property.'
    },
    optimal: {
      name: 'Subtree Height Binary Search (O((log N)^2))',
      code: `function countNodes(root: any): number {
  if (!root) return 0;

  function getLeftHeight(node: any): number {
    let h = 0;
    while (node) {
      h++;
      node = node.left;
    }
    return h;
  }

  function getRightHeight(node: any): number {
    let h = 0;
    while (node) {
      h++;
      node = node.right;
    }
    return h;
  }

  const leftHeight = getLeftHeight(root);
  const rightHeight = getRightHeight(root);

  // If left and right heights match, it is a perfect binary tree of 2^h - 1 nodes
  if (leftHeight === rightHeight) {
    return (1 << leftHeight) - 1;
  }

  // Otherwise, recurse on left and right
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
      complexity: {
        time: 'O((log N)^2)',
        space: 'O(log N)'
      },
      explanation: 'Compare left height and right height. If equal, the subtree is a perfect binary tree with exactly 2^h - 1 nodes computed in O(1). If unequal, recurse; at least one child is always guaranteed to be a perfect tree, executing in O((log N)^2) time.',
      whyOptimalIsPreferred: 'Meets the sublinear requirement O((log N)^2) by bypassing complete subtrees using the bitwise closed form 2^h - 1.',
      patternInvariant: 'Complete binary tree property: if leftHeight == rightHeight, the tree is perfect with 2^h - 1 nodes.'
    },
    defaultInputDescription: 'root = [1, 2, 3, 4, 5, 6]'
  },
  {
    id: 236,
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    pattern: 'binary-tree-general',
    category: 'Binary Tree General',
    statement: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes, p and q. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).',
    examples: [
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        output: '3',
        explanation: 'The LCA of nodes 5 and 1 is 3.'
      },
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4',
        output: '5',
        explanation: 'The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the tree.'
    ],
    bruteForce: {
      name: 'Root-to-Node Path Trace and Convergence Search',
      code: `function lowestCommonAncestorBrute(root: any, p: any, q: any): any {
  function getPath(node: any, target: any, path: any[]): boolean {
    if (!node) return false;
    path.push(node);
    if (node === target) return true;
    if (getPath(node.left, target, path) || getPath(node.right, target, path)) return true;
    path.pop();
    return false;
  }
  const pathP: any[] = [];
  const pathQ: any[] = [];
  getPath(root, p, pathP);
  getPath(root, q, pathQ);
  let lca = root;
  for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {
    if (pathP[i] === pathQ[i]) lca = pathP[i];
    else break;
  }
  return lca;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Finds root-to-p path and root-to-q path as arrays and finds the last common element.'
    },
    optimal: {
      name: 'Recursive Divide-and-Conquer Post-Order Bubble Up',
      code: `function lowestCommonAncestor(root: any, p: any, q: any): any {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root; // p and q found in different subtrees; root is LCA
  }

  return left !== null ? left : right;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Recurse down tree. If current node is null, p, or q, return it. If both left and right return non-null, p and q reside in opposite subtrees, making root their LCA. If only one child returns non-null, propagate that non-null result upward.',
      whyOptimalIsPreferred: 'Linear O(N) single-pass bottom-up tree traversal that eliminates the overhead of tracking path arrays.',
      patternInvariant: 'LCA convergence: the LCA is the unique node where p and q are reported from separate subtrees (or one is the ancestor of the other).'
    },
    defaultInputDescription: 'root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1'
  }
];
