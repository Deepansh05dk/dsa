import type { LeetCodeProblem } from '../../types/problem';

export const binaryTreeBfsProblems: LeetCodeProblem[] = [
  {
    id: 199,
    slug: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    pattern: 'binary-tree-bfs',
    category: 'Binary Tree BFS',
    statement: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
    examples: [
      {
        input: 'root = [1,2,3,null,5,null,4]',
        output: '[1,3,4]'
      },
      {
        input: 'root = [1,null,3]',
        output: '[1,3]'
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
      name: 'Full Level Order Traversal with Last Element Extraction',
      code: `function rightSideViewBrute(root: any): number[] {
  if (!root) return [];
  const levels: number[][] = [];
  const queue = [{ node: root, level: 0 }];
  while (queue.length > 0) {
    const { node, level } = queue.shift()!;
    if (!levels[level]) levels[level] = [];
    levels[level].push(node.val);
    if (node.left) queue.push({ node: node.left, level: level + 1 });
    if (node.right) queue.push({ node: node.right, level: level + 1 });
  }
  return levels.map(lvl => lvl[lvl.length - 1]);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Collects all nodes into an array of levels and takes the last item of each level array.'
    },
    optimal: {
      name: 'BFS Level Batch Snapshot / Last Element Capture',
      code: `function rightSideView(root: any): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: any[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(D) where D is tree diameter'
      },
      explanation: 'Process tree level by level. At each level, capture the node at index levelSize - 1 as the visible rightmost node, without buffering the entire level in auxiliary arrays.',
      whyOptimalIsPreferred: 'Only records the exact rightmost node per level, keeping memory strictly bounded to the current level width.',
      patternInvariant: 'Queue length snapshot at the start of a BFS level loop isolates that level\'s elements cleanly.'
    },
    defaultInputDescription: 'root = [1, 2, 3, null, 5, null, 4]'
  },
  {
    id: 637,
    slug: 'average-of-levels-in-binary-tree',
    title: 'Average of Levels in Binary Tree',
    difficulty: 'Easy',
    pattern: 'binary-tree-bfs',
    category: 'Binary Tree BFS',
    statement: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10^-5 of the actual answer will be accepted.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[3.00000,14.50000,11.00000]',
        explanation: 'The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].'
      },
      {
        input: 'root = [3,9,20,15,7]',
        output: '[3.00000,14.50000,11.00000]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Recursive DFS Matrix Accumulation',
      code: `function averageOfLevelsBrute(root: any): number[] {
  const sums: number[] = [];
  const counts: number[] = [];
  function dfs(node: any, level: number) {
    if (!node) return;
    sums[level] = (sums[level] || 0) + node.val;
    counts[level] = (counts[level] || 0) + 1;
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  return sums.map((s, i) => s / counts[i]);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      },
      explanation: 'Traverses tree with DFS, accumulating sums and counts in arrays indexed by depth.'
    },
    optimal: {
      name: 'BFS Level Summation Streaming',
      code: `function averageOfLevels(root: any): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: any[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let sum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(sum / levelSize);
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(M) where M is maximum tree width'
      },
      explanation: 'Maintain a BFS queue. For each level, iterate levelSize times, accumulate the node values in a single running scalar sum, and divide by levelSize to compute level average directly.',
      whyOptimalIsPreferred: 'Linear O(N) single-pass streaming level processing with zero intermediate arrays or depth maps.',
      patternInvariant: 'BFS queue length fixed before inner loop gives the exact denominator for that level\'s mean.'
    },
    defaultInputDescription: 'root = [3, 9, 20, null, null, 15, 7]'
  },
  {
    id: 102,
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    pattern: 'binary-tree-bfs',
    category: 'Binary Tree BFS',
    statement: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]'
      },
      {
        input: 'root = [1]',
        output: '[[1]]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    bruteForce: {
      name: 'Depth-Bounded Tree Traversal Queries',
      code: `function levelOrderBrute(root: any): number[][] {
  function getDepth(node: any): number {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
  }
  function getLevelNodes(node: any, target: number, current: number, acc: number[]) {
    if (!node) return;
    if (current === target) { acc.push(node.val); return; }
    getLevelNodes(node.left, target, current + 1, acc);
    getLevelNodes(node.right, target, current + 1, acc);
  }
  const h = getDepth(root);
  const res: number[][] = [];
  for (let d = 1; d <= h; d++) {
    const level: number[] = [];
    getLevelNodes(root, d, 1, level);
    res.push(level);
  }
  return res;
}`,
      complexity: {
        time: 'O(N * H)',
        space: 'O(H)'
      },
      explanation: 'Finds tree height and repeatedly runs DFS from root for each level d from 1 to H.'
    },
    optimal: {
      name: 'FIFO Queue Level Partitioning',
      code: `function levelOrder(root: any): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: any[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Use a FIFO queue. At each level, determine the current queue size, dequeue exactly that many nodes to build the level list, and enqueue their children.',
      whyOptimalIsPreferred: 'Linear O(N) execution that visits each node exactly once, avoiding redundant root-to-level traversals.',
      patternInvariant: 'FIFO queue processes nodes in strictly non-decreasing distance order from the root.'
    },
    defaultInputDescription: 'root = [3, 9, 20, null, null, 15, 7]'
  },
  {
    id: 103,
    slug: 'binary-tree-zigzag-level-order-traversal',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'Medium',
    pattern: 'binary-tree-bfs',
    category: 'Binary Tree BFS',
    statement: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[20,9],[15,7]]'
      },
      {
        input: 'root = [1]',
        output: '[[1]]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    bruteForce: {
      name: 'Standard BFS with Post-Processing Array Reversal',
      code: `function zigzagLevelOrderBrute(root: any): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const q: any[] = [root];
  while (q.length > 0) {
    const sz = q.length;
    const lvl: number[] = [];
    for (let i = 0; i < sz; i++) {
      const n = q.shift();
      lvl.push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    res.push(lvl);
  }
  for (let i = 1; i < res.length; i += 2) {
    res[i].reverse();
  }
  return res;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Collects all levels in standard order, then loops through odd-indexed levels and reverses them.'
    },
    optimal: {
      name: 'Direction-Toggled Deque Insertion',
      code: `function zigzagLevelOrder(root: any): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: any[] = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = new Array(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      const index = leftToRight ? i : levelSize - 1 - i;
      currentLevel[index] = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Use a boolean flag leftToRight. Place node values directly into their destination index (i or levelSize - 1 - i) inside a pre-sized array on the fly.',
      whyOptimalIsPreferred: 'Pre-assigns directly into indexed array slots without allocating extra deque structures or performing expensive array reversal sweeps.',
      patternInvariant: 'Direct index reflection: write to index i if leftToRight else (levelSize - 1 - i).'
    },
    defaultInputDescription: 'root = [3, 9, 20, null, null, 15, 7]'
  }
];
