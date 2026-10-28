import type { LeetCodeProblem } from '../../types/problem';

export const divideAndConquerProblems: LeetCodeProblem[] = [
  {
    id: 108,
    slug: 'convert-sorted-array-to-binary-search-tree',
    title: 'Convert Sorted Array to Binary Search Tree',
    difficulty: 'Easy',
    pattern: 'divide-and-conquer',
    category: 'Divide & Conquer',
    statement: 'Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.',
    examples: [
      {
        input: 'nums = [-10,-3,0,5,9]',
        output: '[0,-3,9,-10,null,5]',
        explanation: '[0,-10,5,null,-3,null,9] is also accepted.'
      },
      {
        input: 'nums = [1,3]',
        output: '[3,1]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums is sorted in a strictly increasing order.'
    ],
    bruteForce: {
      name: 'Sequential Insertion without Balance',
      code: `function sortedArrayToBSTBrute(nums: number[]): any {
  function insert(root: any, val: number): any {
    if (!root) return { val, left: null, right: null };
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
  }
  let root = null;
  for (const n of nums) root = insert(root, n);
  return root;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Sequentially inserts sorted elements into a BST, which produces a completely degenerate skewed linked-list-like tree of height N.'
    },
    optimal: {
      name: 'Divide and Conquer Midpoint Splitting',
      code: `function sortedArrayToBST(nums: number[]): any {
  function build(left: number, right: number): any {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const node = {
      val: nums[mid],
      left: build(left, mid - 1),
      right: build(mid + 1, right)
    };

    return node;
  }

  return build(0, nums.length - 1);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(log N) call stack'
      },
      explanation: 'Choose the exact middle element nums[mid] as root. Recursively construct the left subtree from [left, mid - 1] and right subtree from [mid + 1, right]. Subtrees differ in size by at most 1, guaranteeing strict height balance.',
      whyOptimalIsPreferred: 'Linear O(N) execution that guarantees height balance O(log N) without requiring complex AVL or Red-Black tree rebalancing rotations.',
      patternInvariant: 'Binary search partitioning: selecting the median element as root guarantees balanced subproblem sizes on left and right.'
    },
    defaultInputDescription: 'nums = [-10, -3, 0, 5, 9]'
  },
  {
    id: 148,
    slug: 'sort-list',
    title: 'Sort List',
    difficulty: 'Medium',
    pattern: 'divide-and-conquer',
    category: 'Divide & Conquer',
    statement: 'Given the head of a linked list, return the list after sorting it in ascending order. Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?',
    examples: [
      {
        input: 'head = [4,2,1,3]',
        output: '[1,2,3,4]'
      },
      {
        input: 'head = [-1,5,3,4,0]',
        output: '[-1,0,3,4,5]'
      },
      {
        input: 'head = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5 * 10^4].',
      '-10^5 <= Node.val <= 10^5'
    ],
    bruteForce: {
      name: 'Collect Values in Array, Sort and Rebuild',
      code: `function sortListBrute(head: any): any {
  const vals: number[] = [];
  let curr = head;
  while (curr) { vals.push(curr.val); curr = curr.next; }
  vals.sort((a, b) => a - b);
  curr = head;
  for (const v of vals) { curr.val = v; curr = curr.next; }
  return head;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      },
      explanation: 'Extracts all node values into an array, sorts the array, and overwrites node values.'
    },
    optimal: {
      name: 'Divide and Conquer Merge Sort with Fast/Slow Pointers',
      code: `function sortList(head: any): any {
  if (!head || !head.next) return head;

  // Split list into two halves using slow and fast pointers
  let prev: any = null;
  let slow: any = head;
  let fast: any = head;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = null; // Sever the link

  const left = sortList(head);
  const right = sortList(slow);

  // Merge two sorted lists
  const dummy = { val: 0, next: null as any };
  let tail = dummy;
  let l = left, r = right;

  while (l && r) {
    if (l.val <= r.val) {
      tail.next = l;
      l = l.next;
    } else {
      tail.next = r;
      r = r.next;
    }
    tail = tail.next;
  }
  tail.next = l ?? r;

  return dummy.next;
}`,
      complexity: {
        time: 'O(N log N)',
        space: 'O(log N) recursion stack'
      },
      explanation: 'Use Floyd\'s fast and slow pointers to locate the list midpoint and sever into two halves. Recursively sort each half, then merge them in-place with a sentinel dummy head in O(N log N) time.',
      whyOptimalIsPreferred: 'Meets the optimal O(N log N) time bound without allocating auxiliary value arrays, splicing existing pointers directly.',
      patternInvariant: 'Merge sort naturally adapts to linked lists because merging two sorted chains requires only pointer manipulation in O(1) auxiliary space.'
    },
    defaultInputDescription: 'head = [4, 2, 1, 3]'
  },
  {
    id: 427,
    slug: 'construct-quad-tree',
    title: 'Construct Quad Tree',
    difficulty: 'Medium',
    pattern: 'divide-and-conquer',
    category: 'Divide & Conquer',
    statement: 'Given a n * n matrix grid of 0\'s and 1\'s only. We want to represent grid with a Quad-Tree. Return the root of the Quad-Tree representing grid. A Quad-Tree is a tree data structure in which each internal node has exactly four children: topLeft, topRight, bottomLeft, and bottomRight. Each node has two attributes: val: True if the node represents a grid of 1\'s or False if the node represents a grid of 0\'s. isLeaf: True if the node is a leaf node on the tree or False if the node has the 4 children.',
    examples: [
      {
        input: 'grid = [[0,1],[1,0]]',
        output: '[[0,1],[1,0],[1,1],[1,1],[1,0]]'
      },
      {
        input: 'grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]',
        output: '[[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]'
      }
    ],
    constraints: [
      'n == grid.length == grid[i].length',
      'n == 2^x where 0 <= x <= 6'
    ],
    bruteForce: {
      name: 'Exhaustive Region Cell Scan at Every Level',
      code: `class _QuadNode {
  val: boolean; isLeaf: boolean;
  topLeft: any; topRight: any; bottomLeft: any; bottomRight: any;
  constructor(v: boolean, l: boolean) { this.val = v; this.isLeaf = l; }
}
function constructBrute(grid: number[][]): any {
  function build(r: number, c: number, size: number): any {
    let same = true;
    const v = grid[r][c];
    for (let i = r; i < r + size; i++) {
      for (let j = c; j < c + size; j++) {
        if (grid[i][j] !== v) { same = false; break; }
      }
      if (!same) break;
    }
    if (same) return new _QuadNode(v === 1, true);
    const half = Math.floor(size / 2);
    const node = new _QuadNode(true, false);
    node.topLeft = build(r, c, half);
    node.topRight = build(r, c + half, half);
    node.bottomLeft = build(r + half, c, half);
    node.bottomRight = build(r + half, c + half, half);
    return node;
  }
  return build(0, 0, grid.length);
}`,
      complexity: {
        time: 'O(N^2 log N)',
        space: 'O(log N)'
      },
      explanation: 'Checks uniformity by inspecting every single cell in the subgrid before recurring into quadrants.'
    },
    optimal: {
      name: 'Bottom-Up Quad Leaf Aggregation',
      code: `class QuadNode {
  val: boolean;
  isLeaf: boolean;
  topLeft: QuadNode | null = null;
  topRight: QuadNode | null = null;
  bottomLeft: QuadNode | null = null;
  bottomRight: QuadNode | null = null;

  constructor(val: boolean, isLeaf: boolean) {
    this.val = val;
    this.isLeaf = isLeaf;
  }
}

function construct(grid: number[][]): QuadNode {
  function build(r: number, c: number, size: number): QuadNode {
    if (size === 1) {
      return new QuadNode(grid[r][c] === 1, true);
    }

    const half = Math.floor(size / 2);
    const tl = build(r, c, half);
    const tr = build(r, c + half, half);
    const bl = build(r + half, c, half);
    const br = build(r + half, c + half, half);

    if (tl.isLeaf && tr.isLeaf && bl.isLeaf && br.isLeaf &&
        tl.val === tr.val && tr.val === bl.val && bl.val === br.val) {
      return new QuadNode(tl.val, true);
    }

    const node = new QuadNode(true, false);
    node.topLeft = tl;
    node.topRight = tr;
    node.bottomLeft = bl;
    node.bottomRight = br;
    return node;
  }

  return build(0, 0, grid.length);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(log N)'
      },
      explanation: 'Recurse down to base size 1 first. If all four children are leaves with identical values, collapse them into a single parent leaf. Otherwise assemble as an internal node with four branches.',
      whyOptimalIsPreferred: 'Bottom-up aggregation visits each cell once in O(N^2) time, eliminating the top-down redundant subgrid scans of O(N^2 log N).',
      patternInvariant: '2D spatial divide-and-conquer: four quadrant leaves with identical values merge into a single parent leaf.'
    },
    defaultInputDescription: 'grid = [[0, 1], [1, 0]]'
  },
  {
    id: 23,
    slug: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    pattern: 'divide-and-conquer',
    category: 'Divide & Conquer',
    statement: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'The linked-lists are: [1->4->5, 1->3->4, 2->6]. Merging them into one sorted list: 1->1->2->3->4->4->5->6.'
      },
      {
        input: 'lists = []',
        output: '[]'
      },
      {
        input: 'lists = [[]]',
        output: '[]'
      }
    ],
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'lists[i] is sorted in ascending order.',
      'The sum of lists[i].length will not exceed 10^4.'
    ],
    bruteForce: {
      name: 'Sequential One-by-One Accumulation',
      code: `function mergeKListsBrute(lists: any[]): any {
  function mergeTwo(l1: any, l2: any): any {
    const dummy = { val: 0, next: null as any };
    let tail = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
      else { tail.next = l2; l2 = l2.next; }
      tail = tail.next;
    }
    tail.next = l1 ?? l2;
    return dummy.next;
  }
  let res: any = null;
  for (const l of lists) res = mergeTwo(res, l);
  return res;
}`,
      complexity: {
        time: 'O(k * N)',
        space: 'O(1)'
      },
      explanation: 'Merges list 1 with list 2, then the result with list 3, and so on, accumulating elements up to O(k * N) work.'
    },
    optimal: {
      name: 'Divide and Conquer Pairwise Merging',
      code: `function mergeKLists(lists: any[]): any {
  if (!lists || lists.length === 0) return null;

  function mergeTwoLists(l1: any, l2: any): any {
    const dummy = { val: 0, next: null as any };
    let tail = dummy;

    while (l1 && l2) {
      if (l1.val <= l2.val) {
        tail.next = l1;
        l1 = l1.next;
      } else {
        tail.next = l2;
        l2 = l2.next;
      }
      tail = tail.next;
    }
    tail.next = l1 ?? l2;
    return dummy.next;
  }

  let interval = 1;
  const n = lists.length;
  while (interval < n) {
    for (let i = 0; i + interval < n; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }

  return lists[0];
}`,
      complexity: {
        time: 'O(N log k)',
        space: 'O(1) iterative extra'
      },
      explanation: 'Merge lists in pairs iteratively with doubling interval (stride 1, 2, 4, 8...). In each pass, the number of lists is halved. With log k passes and O(N) work per pass, total time is O(N log k).',
      whyOptimalIsPreferred: 'Reduces time from O(k * N) to O(N log k) by balancing the tree of merges, consuming only O(1) auxiliary space.',
      patternInvariant: 'Tournament bracket merging: pairwise reduction cuts candidate list count in half every iteration.'
    },
    defaultInputDescription: 'lists = [[1, 4, 5], [1, 3, 4], [2, 6]]'
  }
];
