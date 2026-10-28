import type { VisualizerStep } from '../../types/visualizer';

export const LINKED_LIST_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 141: Linked List Cycle
  141: [
    {
      stepIndex: 0,
      title: "Initialize Floyd's Cycle Detection (Tortoise and Hare)",
      description: 'Slow and fast pointers start at head (val: 3). Nodes: 3 -> 2 -> 0 -> -4, with -4 pointing back to 2 (cycle present).',
      codeLineHighlight: 2,
      variables: { slow: 3, fast: 3, cycleDetected: false },
      linkedListState: {
        nodes: [
          { id: 'node-1', value: 3, status: 'slow', nextId: 'node-2' },
          { id: 'node-2', value: 2, status: 'fast', nextId: 'node-3' },
          { id: 'node-3', value: 0, status: 'default', nextId: 'node-4' },
          { id: 'node-4', value: -4, status: 'default', nextId: 'node-2' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Advance Slow 1 Step, Fast 2 Steps',
      description: 'Slow advances to node 2. Fast advances two steps through node 0 to node -4.',
      codeLineHighlight: 4,
      variables: { slow: 2, fast: -4, cycleDetected: false },
      linkedListState: {
        nodes: [
          { id: 'node-1', value: 3, status: 'visited', nextId: 'node-2' },
          { id: 'node-2', value: 2, status: 'slow', nextId: 'node-3' },
          { id: 'node-3', value: 0, status: 'default', nextId: 'node-4' },
          { id: 'node-4', value: -4, status: 'fast', nextId: 'node-2' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Fast Pointer Loops Around Cycle to Node 0',
      description: 'Slow advances to node 0. Fast follows next pointer from -4 back to 2, then to 0. Pointers are converging!',
      codeLineHighlight: 4,
      variables: { slow: 0, fast: 0, cycleDetected: false },
      linkedListState: {
        nodes: [
          { id: 'node-1', value: 3, status: 'visited', nextId: 'node-2' },
          { id: 'node-2', value: 2, status: 'visited', nextId: 'node-3' },
          { id: 'node-3', value: 0, status: 'curr', nextId: 'node-4' },
          { id: 'node-4', value: -4, status: 'default', nextId: 'node-2' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Pointers Collide: slow === fast (Cycle Confirmed)',
      description: 'Fast and slow meet at node 0 inside the cycle. The loop is detected in O(N) time and O(1) memory.',
      codeLineHighlight: 6,
      variables: { slow: 0, fast: 0, cycleDetected: true, hasCycle: true },
      linkedListState: {
        nodes: [
          { id: 'node-1', value: 3, status: 'visited', nextId: 'node-2' },
          { id: 'node-2', value: 2, status: 'visited', nextId: 'node-3' },
          { id: 'node-3', value: 0, status: 'fast', nextId: 'node-4' },
          { id: 'node-4', value: -4, status: 'default', nextId: 'node-2' },
        ],
      },
    },
  ],

  // Problem 2: Add Two Numbers
  2: [
    {
      stepIndex: 0,
      title: 'Initialize Addition: l1 = [2, 4, 3], l2 = [5, 6, 4]',
      description: 'Create dummy head. Carry initialized to 0. Lists represent numbers 342 and 465 in reverse order.',
      codeLineHighlight: 2,
      variables: { carry: 0, sum: 0 },
      linkedListState: {
        nodes: [
          { id: 'dummy', value: 'Dummy', status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Add First Digits: 2 + 5 + 0(carry) = 7',
      description: 'New digit is 7, carry is 0. Append node with value 7 to result list.',
      codeLineHighlight: 5,
      variables: { val1: 2, val2: 5, carry: 0, sum: 7, newDigit: 7 },
      linkedListState: {
        nodes: [
          { id: 'dummy', value: 'Dummy', status: 'default', nextId: 'res-1' },
          { id: 'res-1', value: 7, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Add Second Digits: 4 + 6 + 0(carry) = 10',
      description: 'Sum is 10 >= 10. New digit is 10 % 10 = 0, carry becomes 1. Append node 0.',
      codeLineHighlight: 5,
      variables: { val1: 4, val2: 6, carry: 1, sum: 10, newDigit: 0 },
      linkedListState: {
        nodes: [
          { id: 'dummy', value: 'Dummy', status: 'default', nextId: 'res-1' },
          { id: 'res-1', value: 7, status: 'visited', nextId: 'res-2' },
          { id: 'res-2', value: 0, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Add Third Digits: 3 + 4 + 1(carry) = 8',
      description: 'Sum is 8. New digit is 8, carry becomes 0. Append node 8. Both lists exhausted.',
      codeLineHighlight: 5,
      variables: { val1: 3, val2: 4, carry: 0, sum: 8, newDigit: 8 },
      linkedListState: {
        nodes: [
          { id: 'dummy', value: 'Dummy', status: 'default', nextId: 'res-1' },
          { id: 'res-1', value: 7, status: 'visited', nextId: 'res-2' },
          { id: 'res-2', value: 0, status: 'visited', nextId: 'res-3' },
          { id: 'res-3', value: 8, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 4,
      title: 'Addition Complete: Return dummy.next -> [7, 0, 8]',
      description: 'Result list represents 807 (342 + 465 = 807). Time: O(max(N, M)), Space: O(max(N, M)).',
      codeLineHighlight: 8,
      variables: { result: '[7, 0, 8]', carry: 0, completed: true },
      linkedListState: {
        nodes: [
          { id: 'res-1', value: 7, status: 'visited', nextId: 'res-2' },
          { id: 'res-2', value: 0, status: 'visited', nextId: 'res-3' },
          { id: 'res-3', value: 8, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 21: Merge Two Sorted Lists
  21: [
    {
      stepIndex: 0,
      title: 'Initialize Dummy Head and Pointers for list1 & list2',
      description: 'list1: [1, 2, 4], list2: [1, 3, 4]. Sentinel dummy node initialized to build merged chain.',
      codeLineHighlight: 2,
      variables: { p1: 1, p2: 1, dummy: 'active' },
      linkedListState: {
        nodes: [
          { id: 'd', value: 'Dummy', status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Compare 1 <= 1: Attach list1 node (1)',
      description: 'Attach list1 node to tail. Advance list1 pointer to 2.',
      codeLineHighlight: 5,
      variables: { attached: 1, list1_next: 2, list2: 1 },
      linkedListState: {
        nodes: [
          { id: 'd', value: 'Dummy', status: 'default', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Compare 2 > 1: Attach list2 node (1)',
      description: 'list2 node 1 is smaller than list1 node 2. Attach node 1 and advance list2 to 3.',
      codeLineHighlight: 7,
      variables: { attached: 1, list1: 2, list2_next: 3 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 1, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Compare 2 <= 3: Attach list1 node (2)',
      description: 'Attach list1 node 2. Advance list1 pointer to 4.',
      codeLineHighlight: 5,
      variables: { attached: 2, list1_next: 4, list2: 3 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 1, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 2, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 4,
      title: 'Merge Remaining Nodes: [3, 4, 4]',
      description: 'Attach remaining elements sequentially: 3, 4, 4. Final list: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null.',
      codeLineHighlight: 9,
      variables: { result: '[1, 1, 2, 3, 4, 4]', time: 'O(N+M)' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 1, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 2, status: 'visited', nextId: 'n4' },
          { id: 'n4', value: 3, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 4, status: 'visited', nextId: 'n6' },
          { id: 'n6', value: 4, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 138: Copy List with Random Pointer
  138: [
    {
      stepIndex: 0,
      title: 'Original Linked List with Random Pointers',
      description: 'Nodes A (7) -> B (13) -> C (11). A.random -> null, B.random -> A, C.random -> B.',
      codeLineHighlight: 2,
      variables: { pass: 1, action: 'scan' },
      linkedListState: {
        nodes: [
          { id: 'A', value: '7', status: 'curr', nextId: 'B' },
          { id: 'B', value: '13', status: 'default', nextId: 'C', randomId: 'A' },
          { id: 'C', value: '11', status: 'default', nextId: null, randomId: 'B' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Pass 1: Interleave Cloned Nodes in Original Chain',
      description: 'Create duplicate nodes right after each original: A -> A\' -> B -> B\' -> C -> C\'.',
      codeLineHighlight: 5,
      variables: { pass: 1, interleaved: true },
      linkedListState: {
        nodes: [
          { id: 'A', value: '7', status: 'visited', nextId: "A'" },
          { id: "A'", value: "7'", status: 'curr', nextId: 'B' },
          { id: 'B', value: '13', status: 'visited', nextId: "B'", randomId: 'A' },
          { id: "B'", value: "13'", status: 'curr', nextId: 'C' },
          { id: 'C', value: '11', status: 'visited', nextId: "C'", randomId: 'B' },
          { id: "C'", value: "11'", status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Pass 2: Set Random Pointers for Copies',
      description: "curr.next.random = curr.random ? curr.random.next : null. B'.random points to A'.",
      codeLineHighlight: 9,
      variables: { pass: 2, randomLinked: true },
      linkedListState: {
        nodes: [
          { id: "A'", value: "7'", status: 'visited', nextId: 'B' },
          { id: "B'", value: "13'", status: 'visited', nextId: 'C', randomId: "A'" },
          { id: "C'", value: "11'", status: 'visited', nextId: null, randomId: "B'" },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Pass 3: Unweave and Return Cloned Head',
      description: "Separate original list and cloned list. Return cloned head A'. Time: O(N), Auxiliary Space: O(1).",
      codeLineHighlight: 12,
      variables: { pass: 3, cloneHead: "7'", complete: true },
      linkedListState: {
        nodes: [
          { id: "A'", value: "7'", status: 'visited', nextId: "B'" },
          { id: "B'", value: "13'", status: 'visited', nextId: "C'", randomId: "A'" },
          { id: "C'", value: "11'", status: 'visited', nextId: null, randomId: "B'" },
        ],
      },
    },
  ],

  // Problem 92: Reverse Linked List II
  92: [
    {
      stepIndex: 0,
      title: 'Locate Left Boundary: left = 2, right = 4',
      description: 'Original list: 1 -> 2 -> 3 -> 4 -> 5. Sentinel dummy at head. prev pointer positioned at node 1.',
      codeLineHighlight: 3,
      variables: { left: 2, right: 4, prevVal: 1, currVal: 2 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'prev', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'curr', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'next', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Splice Node 3 to Front of Reversal Window',
      description: 'Move node 3 ahead of node 2: 1 -> 3 -> 2 -> 4 -> 5.',
      codeLineHighlight: 6,
      variables: { left: 2, right: 4, moved: 3 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'prev', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'curr', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'next', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Splice Node 4 to Front of Reversal Window',
      description: 'Move node 4 ahead of node 3: 1 -> 4 -> 3 -> 2 -> 5. Subsegment [2..4] reversed!',
      codeLineHighlight: 6,
      variables: { left: 2, right: 4, moved: 4, windowReversed: true },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'prev', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Reversal Complete: Return dummy.next',
      description: 'Subsegment successfully reversed in one pass. Time: O(N), Space: O(1).',
      codeLineHighlight: 10,
      variables: { result: '1 -> 4 -> 3 -> 2 -> 5 -> null' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 25: Reverse Nodes in k-Group
  25: [
    {
      stepIndex: 0,
      title: 'Identify Group Size k = 2 in [1, 2, 3, 4, 5]',
      description: 'Check if at least k = 2 nodes remain in current segment [1, 2]. Yes, proceed to reverse.',
      codeLineHighlight: 3,
      variables: { k: 2, group: '[1, 2]' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'curr', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'next', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'default', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Reverse First k-Group [1, 2] -> [2, 1]',
      description: 'In-place pointer reversal for first group: 2 -> 1 -> 3 -> 4 -> 5.',
      codeLineHighlight: 6,
      variables: { reversedGroup1: '[2, 1]', nextGroupStart: 3 },
      linkedListState: {
        nodes: [
          { id: 'n2', value: 2, status: 'visited', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'prev', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'curr', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'next', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Reverse Second k-Group [3, 4] -> [4, 3]',
      description: 'Connect tail of group 1 (node 1) to head of group 2 (node 4): 2 -> 1 -> 4 -> 3 -> 5.',
      codeLineHighlight: 6,
      variables: { reversedGroup2: '[4, 3]', remaining: '[5]' },
      linkedListState: {
        nodes: [
          { id: 'n2', value: 2, status: 'visited', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'visited', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'prev', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Incomplete Final Group (< k): Leave Unaltered',
      description: 'Only 1 node remaining (node 5). Condition length < k met, keep as is. Final: 2 -> 1 -> 4 -> 3 -> 5 -> null.',
      codeLineHighlight: 10,
      variables: { result: '2 -> 1 -> 4 -> 3 -> 5', time: 'O(N)', space: 'O(1)' },
      linkedListState: {
        nodes: [
          { id: 'n2', value: 2, status: 'visited', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'visited', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 19: Remove Nth Node From End of List
  19: [
    {
      stepIndex: 0,
      title: 'Initialize Fast and Slow Pointers at Sentinel Dummy',
      description: 'List: 1 -> 2 -> 3 -> 4 -> 5 -> null, n = 2. Dummy placed before head.',
      codeLineHighlight: 2,
      variables: { n: 2, fastIndex: 0, slowIndex: 0 },
      linkedListState: {
        nodes: [
          { id: 'd', value: 'Dummy', status: 'slow', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'default', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'default', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'default', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Advance Fast Pointer by n + 1 = 3 Nodes',
      description: 'Fast creates an (n + 1) node gap ahead of slow pointer. Fast is at node 2.',
      codeLineHighlight: 4,
      variables: { n: 2, fastVal: 2, slowVal: 'Dummy', gap: 3 },
      linkedListState: {
        nodes: [
          { id: 'd', value: 'Dummy', status: 'slow', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'default', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'fast', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'default', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Advance Both Pointers Simultaneously Until Fast Reaches Null',
      description: 'Slow lands directly before the node to delete (node 3). Fast is past the end.',
      codeLineHighlight: 6,
      variables: { slowVal: 3, targetToDelete: 4 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'prev', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'curr', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'next', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Delete Node 4: slow.next = slow.next.next',
      description: 'Node 4 unlinked. Result: 1 -> 2 -> 3 -> 5 -> null. One pass O(N) time, O(1) space.',
      codeLineHighlight: 8,
      variables: { deleted: 4, result: '1 -> 2 -> 3 -> 5' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 82: Remove Duplicates from Sorted List II
  82: [
    {
      stepIndex: 0,
      title: 'Initialize Sentinel Node Before Head',
      description: 'List: 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5 -> null. Sentinel dummy attached before head 1.',
      codeLineHighlight: 2,
      variables: { prevVal: 'Dummy', currVal: 1 },
      linkedListState: {
        nodes: [
          { id: 'd', value: 'Dummy', status: 'prev', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'curr', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'default', nextId: 'n3a' },
          { id: 'n3a', value: 3, status: 'default', nextId: 'n3b' },
          { id: 'n3b', value: 3, status: 'default', nextId: 'n4a' },
          { id: 'n4a', value: 4, status: 'default', nextId: 'n4b' },
          { id: 'n4b', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Verify Unique Nodes 1 and 2',
      description: 'Nodes 1 and 2 have no adjacent duplicates. Advance prev to node 2.',
      codeLineHighlight: 4,
      variables: { confirmedUnique: '[1, 2]', nextVal: 3 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'prev', nextId: 'n3a' },
          { id: 'n3a', value: 3, status: 'curr', nextId: 'n3b' },
          { id: 'n3b', value: 3, status: 'next', nextId: 'n4a' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Detect Duplicates for Value 3 & Value 4: Bypass All',
      description: 'Skip duplicate values 3 and 4 entirely: prev.next bridges directly to node 5.',
      codeLineHighlight: 7,
      variables: { skippedDuplicates: '[3, 4]', linkedTo: 5 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'prev', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'curr', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Complete List Cleanup: Return dummy.next -> [1, 2, 5]',
      description: 'All duplicate nodes purged. Time: O(N), Space: O(1).',
      codeLineHighlight: 11,
      variables: { result: '1 -> 2 -> 5 -> null' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 61: Rotate List
  61: [
    {
      stepIndex: 0,
      title: 'Measure Length = 5 and Connect Tail to Head (Circular Ring)',
      description: 'List: 1 -> 2 -> 3 -> 4 -> 5, k = 2. Tail (5) connects to head (1). Length = 5.',
      codeLineHighlight: 3,
      variables: { length: 5, k: 2, effectiveK: 2 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'curr', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'default', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'default', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'default', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'prev', nextId: 'n1' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Locate New Tail at Index length - (k % length) - 1 = 2 (Node 3)',
      description: 'Traverse to node 3. The new head will be node 4 (index 3).',
      codeLineHighlight: 6,
      variables: { newTail: 3, newHead: 4 },
      linkedListState: {
        nodes: [
          { id: 'n3', value: 3, status: 'prev', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'curr', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'default', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'default', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'default', nextId: 'n3' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Sever Ring at Node 3 (node3.next = null)',
      description: 'Break circular link to finalize rotated list: 4 -> 5 -> 1 -> 2 -> 3 -> null.',
      codeLineHighlight: 9,
      variables: { result: '4 -> 5 -> 1 -> 2 -> 3 -> null', time: 'O(N)' },
      linkedListState: {
        nodes: [
          { id: 'n4', value: 4, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: 'n1' },
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2' },
          { id: 'n2', value: 2, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 86: Partition List
  86: [
    {
      stepIndex: 0,
      title: 'Initialize Less and Greater Dummy Sentinels for x = 3',
      description: 'Input list: 1 -> 4 -> 3 -> 2 -> 5 -> 2. Two dummy pointers split elements relative to pivot x = 3.',
      codeLineHighlight: 2,
      variables: { pivot: 3, lessHead: 'dLess', greaterHead: 'dGreater' },
      linkedListState: {
        nodes: [
          { id: 'dL', value: '<3', status: 'prev', nextId: null },
          { id: 'dG', value: '>=3', status: 'next', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Distribute Elements to Respective Partitions',
      description: 'Nodes < 3: 1, 2, 2 -> less list. Nodes >= 3: 4, 3, 5 -> greater list.',
      codeLineHighlight: 6,
      variables: { lessCount: 3, greaterCount: 3 },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'slow', nextId: 'n2a' },
          { id: 'n2a', value: 2, status: 'slow', nextId: 'n2b' },
          { id: 'n2b', value: 2, status: 'slow', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Link Less Partition Tail to Greater Partition Head',
      description: 'Concatenate partitions: lessTail.next = greaterHead.next; greaterTail.next = null.',
      codeLineHighlight: 9,
      variables: { mergedList: '1 -> 2 -> 2 -> 4 -> 3 -> 5 -> null', time: 'O(N)' },
      linkedListState: {
        nodes: [
          { id: 'n1', value: 1, status: 'visited', nextId: 'n2a' },
          { id: 'n2a', value: 2, status: 'visited', nextId: 'n2b' },
          { id: 'n2b', value: 2, status: 'visited', nextId: 'n4' },
          { id: 'n4', value: 4, status: 'visited', nextId: 'n3' },
          { id: 'n3', value: 3, status: 'visited', nextId: 'n5' },
          { id: 'n5', value: 5, status: 'visited', nextId: null },
        ],
      },
    },
  ],

  // Problem 146: LRU Cache
  146: [
    {
      stepIndex: 0,
      title: 'Initialize LRU Cache (Capacity = 2) with Sentinel Head & Tail',
      description: 'Doubly linked list with dummy Head and dummy Tail. Hash map stores key -> node pointers.',
      codeLineHighlight: 2,
      variables: { capacity: 2, size: 0 },
      linkedListState: {
        nodes: [
          { id: 'H', value: 'Head', status: 'prev', nextId: 'T' },
          { id: 'T', value: 'Tail', status: 'next', nextId: null },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'put(1, 1) and put(2, 2): Add Nodes at Front',
      description: 'Nodes inserted right after Head: Head <-> [2:2] <-> [1:1] <-> Tail.',
      codeLineHighlight: 5,
      variables: { size: 2, mostRecent: '[2:2]', leastRecent: '[1:1]' },
      linkedListState: {
        nodes: [
          { id: 'H', value: 'Head', status: 'prev', nextId: 'k2' },
          { id: 'k2', value: '2:2', status: 'curr', nextId: 'k1' },
          { id: 'k1', value: '1:1', status: 'default', nextId: 'T' },
          { id: 'T', value: 'Tail', status: 'next', nextId: null },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'get(1): Hit! Move [1:1] to Front as Most Recently Used',
      description: 'Extract [1:1] and insert right after Head: Head <-> [1:1] <-> [2:2] <-> Tail. Return 1.',
      codeLineHighlight: 8,
      variables: { returnedVal: 1, mostRecent: '[1:1]', leastRecent: '[2:2]' },
      linkedListState: {
        nodes: [
          { id: 'H', value: 'Head', status: 'prev', nextId: 'k1' },
          { id: 'k1', value: '1:1', status: 'visited', nextId: 'k2' },
          { id: 'k2', value: '2:2', status: 'slow', nextId: 'T' },
          { id: 'T', value: 'Tail', status: 'next', nextId: null },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'put(3, 3): Capacity Exceeded! Evict LRU Node [2:2]',
      description: 'Evict node before Tail ([2:2]). Insert new node [3:3] at Head: Head <-> [3:3] <-> [1:1] <-> Tail.',
      codeLineHighlight: 12,
      variables: { evictedKey: 2, insertedKey: 3, finalState: '[3:3], [1:1]' },
      linkedListState: {
        nodes: [
          { id: 'H', value: 'Head', status: 'prev', nextId: 'k3' },
          { id: 'k3', value: '3:3', status: 'curr', nextId: 'k1' },
          { id: 'k1', value: '1:1', status: 'visited', nextId: 'T' },
          { id: 'T', value: 'Tail', status: 'next', nextId: null },
        ],
      },
    },
  ],
};
