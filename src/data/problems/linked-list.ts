import type { LeetCodeProblem } from '../../types/problem';

export const linkedListProblems: LeetCodeProblem[] = [
  {
    id: 141,
    slug: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.',
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
      },
      {
        input: 'head = [1,2], pos = 0',
        output: 'true'
      },
      {
        input: 'head = [1], pos = -1',
        output: 'false'
      }
    ],
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5',
      'pos is -1 or a valid index in the linked-list.'
    ],
    bruteForce: {
      name: 'Visited Node Hash Set',
      code: `function hasCycleBrute(head: any): boolean {
  const seen = new Set<any>();
  let curr = head;
  while (curr) {
    if (seen.has(curr)) return true;
    seen.add(curr);
    curr = curr.next;
  }
  return false;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Traverses the list and records visited node references into a Hash Set to detect revisits.'
    },
    optimal: {
      name: 'Floyd\'s Tortoise and Hare Cycle Detection',
      code: `function hasCycle(head: any): boolean {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Slow pointer moves 1 step while fast pointer moves 2 steps. If a cycle exists, the distance between them decreases by 1 on each step, guaranteeing they collide in O(N) time without allocating extra memory.',
      whyOptimalIsPreferred: 'Requires zero auxiliary memory allocations (O(1) space) compared to O(N) memory consumed by tracking all visited references.',
      patternInvariant: 'Two pointers moving at speeds 1 and 2 in a closed loop decrease their relative gap by 1 per tick.'
    },
    defaultInputDescription: 'head = [3, 2, 0, -4], pos = 1'
  },
  {
    id: 2,
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]'
      },
      {
        input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
        output: '[8,9,9,9,0,0,0,1]'
      }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    bruteForce: {
      name: 'Full Numeric Conversion via BigInt',
      code: `function addTwoNumbersBrute(l1: any, l2: any): any {
  let s1 = '', s2 = '';
  while (l1) { s1 = l1.val + s1; l1 = l1.next; }
  while (l2) { s2 = l2.val + s2; l2 = l2.next; }
  let sum = (BigInt(s1) + BigInt(s2)).toString();
  const dummy = { val: 0, next: null as any };
  let curr = dummy;
  for (let i = sum.length - 1; i >= 0; i--) {
    curr.next = { val: parseInt(sum[i], 10), next: null };
    curr = curr.next;
  }
  return dummy.next;
}`,
      complexity: {
        time: 'O(N + M)',
        space: 'O(N + M)'
      },
      explanation: 'Accumulates digits into strings, converts to BigInt, adds them, and converts back into a new linked list.'
    },
    optimal: {
      name: 'Simultaneous Stream Addition with Carry',
      code: `function addTwoNumbers(l1: any, l2: any): any {
  const dummyHead = { val: 0, next: null as any };
  let curr = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;
    const sum = carry + x + y;

    carry = Math.floor(sum / 10);
    curr.next = { val: sum % 10, next: null };
    curr = curr.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummyHead.next;
}`,
      complexity: {
        time: 'O(max(N, M))',
        space: 'O(max(N, M))'
      },
      explanation: 'Traverse l1 and l2 in lockstep from the head (least significant digit). Compute column sum and carry, appending each digit node directly to a sentinel dummy head.',
      whyOptimalIsPreferred: 'Linear streaming addition with O(1) auxiliary state that avoids string allocations or numeric precision limitations.',
      patternInvariant: 'Reverse-ordered digits naturally align lowest-order columns first, matching standard column-addition carry mechanics.'
    },
    defaultInputDescription: 'l1 = [2, 4, 3], l2 = [5, 6, 4]'
  },
  {
    id: 21,
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    bruteForce: {
      name: 'Collect Values, Sort, and Rebuild',
      code: `function mergeTwoListsBrute(l1: any, l2: any): any {
  const vals: number[] = [];
  while (l1) { vals.push(l1.val); l1 = l1.next; }
  while (l2) { vals.push(l2.val); l2 = l2.next; }
  vals.sort((a, b) => a - b);
  const dummy = { val: 0, next: null as any };
  let curr = dummy;
  for (const v of vals) {
    curr.next = { val: v, next: null };
    curr = curr.next;
  }
  return dummy.next;
}`,
      complexity: {
        time: 'O((N+M) log(N+M))',
        space: 'O(N+M)'
      },
      explanation: 'Dump all values into an array, sort the array, and allocate brand new linked list nodes.'
    },
    optimal: {
      name: 'In-Place Splice via Sentinel Dummy Node',
      code: `function mergeTwoLists(list1: any, list2: any): any {
  const dummy = { val: -1, next: null as any };
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 ?? list2;
  return dummy.next;
}`,
      complexity: {
        time: 'O(N + M)',
        space: 'O(1)'
      },
      explanation: 'Use a sentinel dummy head. Walk both lists, attaching the smaller node to tail. Once one list is exhausted, attach remainder of the other list in O(1).',
      whyOptimalIsPreferred: 'Operates in pure O(1) auxiliary memory by rewiring existing node pointers without creating new nodes or performing a full sort.',
      patternInvariant: 'A dummy sentinel node simplifies edge cases when constructing or merging linked lists.'
    },
    defaultInputDescription: 'list1 = [1, 2, 4], list2 = [1, 3, 4]'
  },
  {
    id: 138,
    slug: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Return the head of the copied linked list.',
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]'
      }
    ],
    constraints: [
      '0 <= n <= 1000',
      '-10^4 <= Node.val <= 10^4',
      'Node.random is null or is pointing to some node in the linked list.'
    ],
    bruteForce: {
      name: 'Hash Map Node Lookup Table',
      code: `function copyRandomListBrute(head: any): any {
  if (!head) return null;
  const map = new Map<any, any>();
  let curr = head;
  while (curr) {
    map.set(curr, { val: curr.val, next: null, random: null });
    curr = curr.next;
  }
  curr = head;
  while (curr) {
    map.get(curr).next = map.get(curr.next) || null;
    map.get(curr).random = map.get(curr.random) || null;
    curr = curr.next;
  }
  return map.get(head);
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Uses an auxiliary hash map to record original node -> cloned node pairs and links next/random in a second pass.'
    },
    optimal: {
      name: 'Interleaved Node Splice with O(1) Auxiliary Space',
      code: `function copyRandomList(head: any): any {
  if (!head) return null;

  // Step 1: Create interleaved copied nodes: A -> A' -> B -> B'
  let curr = head;
  while (curr) {
    const copy = { val: curr.val, next: curr.next, random: null as any };
    curr.next = copy;
    curr = copy.next;
  }

  // Step 2: Assign random pointers for copies
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // Step 3: Separate original list and cloned list
  curr = head;
  const clonedHead = head.next;
  while (curr) {
    const copy = curr.next;
    curr.next = copy.next;
    curr = curr.next;
    if (copy.next) {
      copy.next = copy.next.next;
    }
  }

  return clonedHead;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary'
      },
      explanation: 'Interleave copy nodes directly after their originals. Cloned random pointer is simply curr.random.next. Then unweave the two lists cleanly.',
      whyOptimalIsPreferred: 'Eliminates the auxiliary O(N) hash map memory by embedding node associations directly inside the linked list structure.',
      patternInvariant: 'Interleaving copy nodes into original sequence (curr -> copy -> curr.next) resolves arbitrary random pointer graph mapping in O(1) space.'
    },
    defaultInputDescription: 'head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]'
  },
  {
    id: 92,
    slug: 'reverse-linked-list-ii',
    title: 'Reverse Linked List II',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], left = 2, right = 4',
        output: '[1,4,3,2,5]'
      },
      {
        input: 'head = [5], left = 1, right = 1',
        output: '[5]'
      }
    ],
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= n <= 500',
      '-500 <= Node.val <= 500',
      '1 <= left <= right <= n'
    ],
    bruteForce: {
      name: 'Array Buffer Slice Reversal',
      code: `function reverseBetweenBrute(head: any, left: number, right: number): any {
  const nodes: any[] = [];
  let curr = head;
  while (curr) { nodes.push(curr); curr = curr.next; }
  let l = left - 1, r = right - 1;
  while (l < r) {
    const temp = nodes[l].val;
    nodes[l].val = nodes[r].val;
    nodes[r].val = temp;
    l++; r--;
  }
  return head;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Copies node references to an array, swaps values within range [left - 1, right - 1].'
    },
    optimal: {
      name: 'Single-Pass In-Place Head Insertion',
      code: `function reverseBetween(head: any, left: number, right: number): any {
  if (!head || left === right) return head;

  const dummy = { val: 0, next: head };
  let prev = dummy;

  for (let i = 0; i < left - 1; i++) {
    prev = prev.next;
  }

  const curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    const nextNode = curr.next;
    curr.next = nextNode.next;
    nextNode.next = prev.next;
    prev.next = nextNode;
  }

  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Locate node preceding left using dummy head. Iteratively pull nextNode to the front of the reversed segment (prev.next) in a single pass in O(1) space.',
      whyOptimalIsPreferred: 'Single linear pass that modifies pointers in-place without copying node values or allocating auxiliary arrays.',
      patternInvariant: 'Head-insertion sublist reversal: moving nextNode to prev.next incrementally reverses a chain in-place.'
    },
    defaultInputDescription: 'head = [1, 2, 3, 4, 5], left = 2, right = 4'
  },
  {
    id: 25,
    slug: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'Hard',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is. You may not alter the values in the list\'s nodes, only nodes themselves may be changed.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[2,1,4,3,5]'
      },
      {
        input: 'head = [1,2,3,4,5], k = 3',
        output: '[3,2,1,4,5]'
      }
    ],
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= k <= n <= 5000',
      '0 <= Node.val <= 1000'
    ],
    bruteForce: {
      name: 'Collect in Array and Re-link',
      code: `function reverseKGroupBrute(head: any, k: number): any {
  const nodes: any[] = [];
  let curr = head;
  while (curr) { nodes.push(curr); curr = curr.next; }
  const n = nodes.length;
  for (let i = 0; i + k <= n; i += k) {
    let l = i, r = i + k - 1;
    while (l < r) {
      const temp = nodes[l];
      nodes[l] = nodes[r];
      nodes[r] = temp;
      l++; r--;
    }
  }
  for (let i = 0; i < n - 1; i++) nodes[i].next = nodes[i + 1];
  if (n > 0) nodes[n - 1].next = null;
  return nodes[0] || null;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Dumps all nodes into an array, reverses chunks of k elements, and re-stitches the next pointers.'
    },
    optimal: {
      name: 'In-Place Group Lookahead & Iterative Reversal',
      code: `function reverseKGroup(head: any, k: number): any {
  if (!head || k <= 1) return head;

  const dummy = { val: 0, next: head };
  let groupPrev = dummy;

  while (true) {
    // Check if there are k nodes remaining
    let kth: any = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (!kth) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp;
  }

  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Check whether k nodes exist in the current group. If so, reverse the k nodes in-place by pointing them backward, reconnect groupPrev and groupNext, and advance.',
      whyOptimalIsPreferred: 'Strictly O(1) auxiliary memory execution satisfying all requirements without altering node values or allocating arrays.',
      patternInvariant: 'Lookahead boundary check ensures only complete k-sized sublists are inverted while tail fragments remain untouched.'
    },
    defaultInputDescription: 'head = [1, 2, 3, 4, 5], k = 2'
  },
  {
    id: 19,
    slug: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], n = 2',
        output: '[1,2,3,5]'
      },
      {
        input: 'head = [1], n = 1',
        output: '[]'
      },
      {
        input: 'head = [1,2], n = 1',
        output: '[1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 30',
      '0 <= Node.val <= 100',
      '1 <= n <= sz'
    ],
    bruteForce: {
      name: 'Two-Pass Length Counting',
      code: `function removeNthFromEndBrute(head: any, n: number): any {
  let len = 0;
  let curr = head;
  while (curr) { len++; curr = curr.next; }
  const dummy = { val: 0, next: head };
  curr = dummy;
  for (let i = 0; i < len - n; i++) curr = curr.next;
  curr.next = curr.next.next;
  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'First pass counts total list length L; second pass walks L - n steps to delete target.'
    },
    optimal: {
      name: 'One-Pass Dual Fast/Slow Pointers with N-Gap',
      code: `function removeNthFromEnd(head: any, n: number): any {
  const dummy = { val: 0, next: head };
  let fast: any = dummy;
  let slow: any = dummy;

  // Advance fast pointer n + 1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move fast to end, keeping slow n steps behind
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove nth node from end
  slow.next = slow.next.next;
  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Advance fast n + 1 steps ahead of slow. Then advance both together. When fast reaches null, slow is positioned directly before the node to remove.',
      whyOptimalIsPreferred: 'Solves problem in a single pass instead of two passes, handling head removals cleanly via sentinel dummy node.',
      patternInvariant: 'Maintain a fixed gap of size n between fast and slow runners to locate the nth node from the end.'
    },
    defaultInputDescription: 'head = [1, 2, 3, 4, 5], n = 2'
  },
  {
    id: 82,
    slug: 'remove-duplicates-from-sorted-list-ii',
    title: 'Remove Duplicates from Sorted List II',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.',
    examples: [
      {
        input: 'head = [1,2,3,3,4,4,5]',
        output: '[1,2,5]'
      },
      {
        input: 'head = [1,1,1,2,3]',
        output: '[2,3]'
      }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 300].',
      '-100 <= Node.val <= 100',
      'The list is guaranteed to be sorted in ascending order.'
    ],
    bruteForce: {
      name: 'Value Frequency Map and Reconstruction',
      code: `function deleteDuplicatesBrute(head: any): any {
  const counts = new Map<number, number>();
  let curr = head;
  while (curr) {
    counts.set(curr.val, (counts.get(curr.val) || 0) + 1);
    curr = curr.next;
  }
  const dummy = { val: 0, next: null as any };
  let tail = dummy;
  curr = head;
  while (curr) {
    if (counts.get(curr.val) === 1) {
      tail.next = { val: curr.val, next: null };
      tail = tail.next;
    }
    curr = curr.next;
  }
  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Counts frequencies of all node values with a hash map, then reconstructs a new list omitting values with frequency > 1.'
    },
    optimal: {
      name: 'Sentinel Dummy Node In-Place Duplicate Purge',
      code: `function deleteDuplicates(head: any): any {
  const dummy = { val: 0, next: head };
  let prev = dummy;

  while (head) {
    if (head.next && head.val === head.next.val) {
      // Move until end of duplicate streak
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      prev.next = head.next;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }

  return dummy.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Use a sentinel dummy node. When adjacent nodes share values, advance head to skip the entire contiguous streak and link prev.next to head.next.',
      whyOptimalIsPreferred: 'Operates in pure O(1) extra space in a single pass without allocating maps or new node objects.',
      patternInvariant: 'Sorted property ensures duplicates are contiguous; sentinel dummy node preserves valid preceding link.'
    },
    defaultInputDescription: 'head = [1, 2, 3, 3, 4, 4, 5]'
  },
  {
    id: 61,
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a linked list, rotate the list to the right by k places.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[4,5,1,2,3]'
      },
      {
        input: 'head = [0,1,2], k = 4',
        output: '[2,0,1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 500].',
      '-100 <= Node.val <= 100',
      '0 <= k <= 2 * 10^9'
    ],
    bruteForce: {
      name: 'Simulate Step-by-Step Rotation K Times',
      code: `function rotateRightBrute(head: any, k: number): any {
  if (!head || !head.next || k === 0) return head;
  let len = 0, curr = head;
  while (curr) { len++; curr = curr.next; }
  k = k % len;
  for (let step = 0; step < k; step++) {
    let prev = head;
    while (prev.next.next) prev = prev.next;
    const tail = prev.next;
    prev.next = null;
    tail.next = head;
    head = tail;
  }
  return head;
}`,
      complexity: {
        time: 'O(N * (k % N))',
        space: 'O(1)'
      },
      explanation: 'Repeatedly disconnects tail and inserts at head k % N times.'
    },
    optimal: {
      name: 'Ring Cycle Formation and Tail Cut',
      code: `function rotateRight(head: any, k: number): any {
  if (!head || !head.next || k === 0) return head;

  // Step 1: Compute length and find old tail
  let length = 1;
  let oldTail = head;
  while (oldTail.next) {
    oldTail = oldTail.next;
    length++;
  }

  // Step 2: Connect old tail to head to form a ring
  oldTail.next = head;

  // Step 3: Find new tail: (length - (k % length) - 1)th node
  k = k % length;
  let stepsToNewTail = length - k - 1;
  let newTail = head;
  for (let i = 0; i < stepsToNewTail; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Connect list into a circular ring. Advance to position length - (k % length) - 1 to find new tail, establish new head, and break the ring in O(1) space.',
      whyOptimalIsPreferred: 'Linear O(N) execution that executes at most 2N node traversals regardless of how large k is.',
      patternInvariant: 'Rotating a list is equivalent to closing a cycle and severing the link at (length - k % length).'
    },
    defaultInputDescription: 'head = [1, 2, 3, 4, 5], k = 2'
  },
  {
    id: 86,
    slug: 'partition-list',
    title: 'Partition List',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.',
    examples: [
      {
        input: 'head = [1,4,3,2,5,2], x = 3',
        output: '[1,2,2,4,3,5]'
      },
      {
        input: 'head = [2,1], x = 2',
        output: '[1,2]'
      }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 200].',
      '-100 <= Node.val <= 100',
      '-200 <= x <= 200'
    ],
    bruteForce: {
      name: 'Separate Arrays Filter and Re-link',
      code: `function partitionBrute(head: any, x: number): any {
  const small: any[] = [];
  const large: any[] = [];
  let curr = head;
  while (curr) {
    if (curr.val < x) small.push(curr);
    else large.push(curr);
    curr = curr.next;
  }
  const all = [...small, ...large];
  for (let i = 0; i < all.length - 1; i++) all[i].next = all[i + 1];
  if (all.length > 0) all[all.length - 1].next = null;
  return all[0] || null;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Splits nodes into two arrays based on x threshold and rebuilds links.'
    },
    optimal: {
      name: 'Dual Sentinel Dummy Chains Concatenation',
      code: `function partition(head: any, x: number): any {
  const beforeHead = { val: 0, next: null as any };
  const afterHead = { val: 0, next: null as any };
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr) {
    if (curr.val < x) {
      before.next = curr;
      before = before.next;
    } else {
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;

  return beforeHead.next;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Maintain two separate chains: before for nodes < x and after for nodes >= x. Traverse list, rewire nodes, and join before chain with afterHead.next in O(1) space.',
      whyOptimalIsPreferred: 'In-place linear execution in O(1) space without allocating arrays or new nodes, preserving relative stable ordering.',
      patternInvariant: 'Partitioning with stability: maintain two independent sub-chains with dummy sentinels, then concatenate.'
    },
    defaultInputDescription: 'head = [1, 4, 3, 2, 5, 2], x = 3'
  },
  {
    id: 146,
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    pattern: 'linked-list',
    category: 'Linked List',
    statement: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1. void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key. The functions get and put must each run in O(1) average time complexity.',
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); // returns 1; lRUCache.put(3, 3); // evicts key 2; lRUCache.get(2); // returns -1 (not found)'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    bruteForce: {
      name: 'Array of Key-Value Timestamp Pairs',
      code: `class LRUCacheBrute {
  private cap: number;
  private entries: Array<{ key: number; val: number; time: number }> = [];
  private timer: number = 0;
  constructor(capacity: number) { this.cap = capacity; }
  get(key: number): number {
    const e = this.entries.find(x => x.key === key);
    if (!e) return -1;
    e.time = ++this.timer;
    return e.val;
  }
  put(key: number, value: number): void {
    const e = this.entries.find(x => x.key === key);
    if (e) { e.val = value; e.time = ++this.timer; return; }
    if (this.entries.length >= this.cap) {
      let lruIdx = 0;
      for (let i = 1; i < this.entries.length; i++) {
        if (this.entries[i].time < this.entries[lruIdx].time) lruIdx = i;
      }
      this.entries.splice(lruIdx, 1);
    }
    this.entries.push({ key, val: value, time: ++this.timer });
  }
}`,
      complexity: {
        time: 'O(N) for get and put',
        space: 'O(capacity)'
      },
      explanation: 'Tracks access timestamps on an array, doing linear scans to locate elements or find minimum timestamp for eviction.'
    },
    optimal: {
      name: 'Hash Map + Doubly Linked List',
      code: `class DNode {
  key: number;
  val: number;
  prev: DNode | null = null;
  next: DNode | null = null;
  constructor(k = 0, v = 0) { this.key = k; this.val = v; }
}

class LRUCache {
  private capacity: number;
  private map = new Map<number, DNode>();
  private head = new DNode();
  private tail = new DNode();

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: DNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertAtHead(node: DNode) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.remove(node);
    this.insertAtHead(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = value;
      this.remove(node);
      this.insertAtHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        const lru = this.tail.prev!;
        this.remove(lru);
        this.map.delete(lru.key);
      }
      const newNode = new DNode(key, value);
      this.map.set(key, newNode);
      this.insertAtHead(newNode);
    }
  }
}`,
      complexity: {
        time: 'O(1) for both get and put',
        space: 'O(capacity)'
      },
      explanation: 'Hash Map provides O(1) key-to-node lookup. Doubly Linked List with head and tail dummy sentinels allows O(1) detachment and promotion to most-recently-used position.',
      whyOptimalIsPreferred: 'Strictly satisfies O(1) time complexity requirement for both read and write operations.',
      patternInvariant: 'Hybrid Doubly Linked List + Hash Map provides constant-time key lookup with constant-time arbitrary position node splicing.'
    },
    defaultInputDescription: 'capacity = 2, put(1, 1), put(2, 2), get(1), put(3, 3), get(2)'
  }
];
