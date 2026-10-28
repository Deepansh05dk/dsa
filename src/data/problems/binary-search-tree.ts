import type { LeetCodeProblem } from '../../types/problem';

export const binarySearchTreeProblems: LeetCodeProblem[] = [
  {
    id: 530,
    slug: 'minimum-absolute-difference-in-bst',
    title: 'Minimum Absolute Difference in BST',
    difficulty: 'Easy',
    pattern: 'binary-search-tree',
    category: 'Binary Search Tree',
    statement: 'Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.',
    examples: [
      {
        input: 'root = [4,2,6,1,3]',
        output: '1'
      },
      {
        input: 'root = [1,0,48,null,null,12,49]',
        output: '1'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^4].',
      '0 <= Node.val <= 10^5'
    ],
    bruteForce: {
      name: 'All-Pairs Comparison or Array Sort',
      code: `function getMinimumDifferenceBrute(root: any): number {
  const vals: number[] = [];
  function collect(node: any) {
    if (!node) return;
    vals.push(node.val);
    collect(node.left);
    collect(node.right);
  }
  collect(root);
  vals.sort((a, b) => a - b);
  let minDiff = Infinity;
  for (let i = 1; i < vals.length; i++) {
    minDiff = Math.min(minDiff, vals[i] - vals[i - 1]);
  }
  return minDiff;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      },
      explanation: 'Dumps all values into an array, sorts the array, and scans adjacent values for the minimal difference.'
    },
    optimal: {
      name: 'In-Order Traversal with Previous Value Tracking',
      code: `function getMinimumDifference(root: any): number {
  let minDiff = Infinity;
  let prev: number | null = null;

  function inOrder(node: any) {
    if (!node) return;

    inOrder(node.left);

    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;

    inOrder(node.right);
  }

  inOrder(root);
  return minDiff;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'In-order traversal visits BST keys in strictly monotonic ascending order. We compare each node with only its immediate predecessor prev, updating the global minimum difference in a single pass.',
      whyOptimalIsPreferred: 'Linear O(N) execution utilizing BST ordering directly, avoiding the O(N log N) sorting overhead and O(N) auxiliary array storage.',
      patternInvariant: 'BST in-order traversal yields a strictly sorted sequence: node.val - prev is guaranteed to test the smallest possible gap for node.val.'
    },
    defaultInputDescription: 'root = [4, 2, 6, 1, 3]'
  },
  {
    id: 230,
    slug: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    pattern: 'binary-search-tree',
    category: 'Binary Search Tree',
    statement: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
    examples: [
      {
        input: 'root = [3,1,4,null,2], k = 1',
        output: '1'
      },
      {
        input: 'root = [5,3,6,2,4,null,null,1], k = 3',
        output: '3'
      }
    ],
    constraints: [
      'The number of nodes in the tree is n.',
      '1 <= k <= n <= 10^4',
      '0 <= Node.val <= 10^4'
    ],
    bruteForce: {
      name: 'Full Tree In-Order Collection',
      code: `function kthSmallestBrute(root: any, k: number): number {
  const vals: number[] = [];
  function inorder(node: any) {
    if (!node) return;
    inorder(node.left);
    vals.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return vals[k - 1];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Collects all N tree values into an array using in-order traversal and returns the element at index k - 1.'
    },
    optimal: {
      name: 'Iterative In-Order Early Termination with Stack',
      code: `function kthSmallest(root: any, k: number): number {
  const stack: any[] = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    k--;
    if (k === 0) {
      return curr.val;
    }

    curr = curr.right;
  }

  return -1;
}`,
      complexity: {
        time: 'O(H + k)',
        space: 'O(H)'
      },
      explanation: 'Perform an iterative in-order traversal with a stack. Push left children until leftmost node, pop and decrement k. When k drops to 0, terminate immediately without traversing the rest of the tree.',
      whyOptimalIsPreferred: 'Terminates early after visiting only k nodes in O(H + k) time rather than doing a full O(N) traversal of all nodes.',
      patternInvariant: 'In-order traversal visits nodes in ascending order; early termination after k steps avoids exploring the remaining tree.'
    },
    defaultInputDescription: 'root = [3, 1, 4, null, 2], k = 1'
  },
  {
    id: 98,
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    pattern: 'binary-search-tree',
    category: 'Binary Search Tree',
    statement: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node\'s key. The right subtree of a node contains only nodes with keys strictly greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true'
      },
      {
        input: 'root = [5,1,4,null,null,3,6]',
        output: 'false',
        explanation: 'The root node\'s value is 5 but its right child\'s value is 4.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Full Subtree Max/Min Recursion',
      code: `function isValidBSTBrute(root: any): boolean {
  function getMax(node: any): number {
    if (!node) return -Infinity;
    return Math.max(node.val, getMax(node.left), getMax(node.right));
  }
  function getMin(node: any): number {
    if (!node) return Infinity;
    return Math.min(node.val, getMin(node.left), getMin(node.right));
  }
  if (!root) return true;
  if (root.left && getMax(root.left) >= root.val) return false;
  if (root.right && getMin(root.right) <= root.val) return false;
  return isValidBSTBrute(root.left) && isValidBSTBrute(root.right);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(H)'
      },
      explanation: 'At every node, recursively traverses the entire left subtree to find its max and entire right subtree to find its min, resulting in quadratic time.'
    },
    optimal: {
      name: 'Recursive Valid Range Boundary Propagation',
      code: `function isValidBST(root: any): boolean {
  function validate(node: any, low: number, high: number): boolean {
    if (!node) return true;

    if (node.val <= low || node.val >= high) {
      return false;
    }

    return (
      validate(node.left, low, node.val) &&
      validate(node.right, node.val, high)
    );
  }

  return validate(root, -Infinity, Infinity);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Pass valid numeric bounds (low, high) down the recursive tree. The left child must satisfy low < val < root.val, and the right child must satisfy root.val < val < high. Each node is validated in O(1) time.',
      whyOptimalIsPreferred: 'Linear O(N) execution that inspects each node once, eliminating redundant O(N^2) subtree scans.',
      patternInvariant: 'BST validity constraint propagates downwards: each subtree must lie strictly within (ancestorLow, ancestorHigh).'
    },
    defaultInputDescription: 'root = [2, 1, 3]'
  }
];
