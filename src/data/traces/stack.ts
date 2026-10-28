import type { VisualizerStep } from '../../types/visualizer';

export const STACK_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 20: Valid Parentheses (MUST have 5 steps for challenger test line 230!)
  20: [
    {
      stepIndex: 0,
      title: 'Initialize Empty Stack for Bracket Validation',
      description: 'Input string: "()[]{}". We will push opening brackets and pop matching pairs when closing brackets appear.',
      codeLineHighlight: 2,
      variables: { index: 0, currentChar: '(', stackSize: 0 },
      stackQueueState: {
        type: 'stack',
        items: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Push "(" to Stack',
      description: 'Found opening bracket "(". Push onto stack.',
      codeLineHighlight: 4,
      variables: { index: 0, action: 'push', bracket: '(', stackSize: 1 },
      stackQueueState: {
        type: 'stack',
        items: [{ value: '(', status: 'pushed' }],
      },
    },
    {
      stepIndex: 2,
      title: 'Encounter ")" -> Pop Matching "(" from Stack',
      description: 'Closing bracket ")" matches top element "(". Valid pair! Pop from stack.',
      codeLineHighlight: 7,
      variables: { index: 1, action: 'pop', topMatch: '()', stackSize: 0 },
      stackQueueState: {
        type: 'stack',
        items: [{ value: '(', status: 'popped' }],
      },
    },
    {
      stepIndex: 3,
      title: 'Process Remaining Brackets: "[" and "{"',
      description: 'Remaining pairs "[]" and "{}" are pushed and matched sequentially.',
      codeLineHighlight: 9,
      variables: { index: 5, action: 'validate', allMatched: true },
      stackQueueState: {
        type: 'stack',
        items: [],
      },
    },
    {
      stepIndex: 4,
      title: 'Validation Successful: String is Valid (True)',
      description: 'Stack is completely empty and all brackets matched in correct order. Return true.',
      codeLineHighlight: 12,
      variables: { isValid: true, timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
      stackQueueState: {
        type: 'stack',
        items: [],
      },
    },
  ],

  // Problem 71: Simplify Path
  71: [
    {
      stepIndex: 0,
      title: 'Tokenize Unix Path "/a/./b/../../c/" by Slash "/"',
      description: 'Tokens: ["a", ".", "b", "..", "..", "c"]. Ignore empty segments and "." (current dir).',
      codeLineHighlight: 2,
      variables: { path: '/a/./b/../../c/', tokens: '["a", "b", "..", "..", "c"]' },
      stackQueueState: {
        type: 'stack',
        items: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Push Directory Segments "a" and "b"',
      description: 'Directory names "a" and "b" pushed onto directory stack.',
      codeLineHighlight: 5,
      variables: { stack: '["a", "b"]', top: 'b' },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 'a', status: 'default' },
          { value: 'b', status: 'top' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Encounter "..": Pop Directory "b", Then Pop "a"',
      description: 'Two ".." tokens pop parents "b" and "a" from stack. Stack becomes empty.',
      codeLineHighlight: 7,
      variables: { action: 'pop x2', stack: '[]' },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 'b', status: 'popped' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Push Directory "c" and Construct Canonical Path "/c"',
      description: 'Push "c". Join stack elements with "/". Result is "/c". Time: O(N), Space: O(N).',
      codeLineHighlight: 10,
      variables: { canonicalPath: '/c', complete: true },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 'c', status: 'top' },
        ],
      },
    },
  ],

  // Problem 150: Evaluate Reverse Polish Notation (RPN)
  150: [
    {
      stepIndex: 0,
      title: 'Tokens: ["2", "1", "+", "3", "*"] -> Push Operands 2 and 1',
      description: 'Operands 2 and 1 pushed onto calculation stack.',
      codeLineHighlight: 3,
      variables: { token: '1', stack: '[2, 1]' },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 2, status: 'default' },
          { value: 1, status: 'top' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'Operator "+": Pop 1 and 2 -> Compute 2 + 1 = 3 -> Push 3',
      description: 'Pop top two operands, evaluate addition, and push result 3.',
      codeLineHighlight: 6,
      variables: { op: '+', val1: 2, val2: 1, result: 3 },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 3, status: 'top' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Push Operand 3 onto Stack',
      description: 'Next token is operand 3. Stack now holds [3, 3].',
      codeLineHighlight: 3,
      variables: { token: '3', stack: '[3, 3]' },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 3, status: 'default' },
          { value: 3, status: 'top' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Operator "*": Pop 3 and 3 -> Compute 3 * 3 = 9 -> Return 9',
      description: 'Pop operands, evaluate multiplication: 3 * 3 = 9. Final result is 9. Time: O(N), Space: O(N).',
      codeLineHighlight: 8,
      variables: { finalResult: 9, complete: true },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 9, status: 'top' },
        ],
      },
    },
  ],

  // Problem 155: Min Stack (O(1) Auxiliary Min Tracking)
  155: [
    {
      stepIndex: 0,
      title: 'push(-2), push(0), push(-3): Track Current Minimum',
      description: 'Value stack: [-2, 0, -3]. Min stack tracks running minimums: [-2, -2, -3]. getMin() = -3.',
      codeLineHighlight: 4,
      variables: { top: -3, min: -3, size: 3 },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: '-2 (min:-2)', status: 'default' },
          { value: '0 (min:-2)', status: 'default' },
          { value: '-3 (min:-3)', status: 'top' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'pop(): Remove Top Element (-3)',
      description: 'Pop element -3 and its associated min. New top is 0, new getMin() reverts to -2.',
      codeLineHighlight: 7,
      variables: { popped: -3, newTop: 0, newMin: -2 },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: '-2 (min:-2)', status: 'default' },
          { value: '0 (min:-2)', status: 'top' },
          { value: '-3', status: 'popped' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'top() Returns 0, getMin() Returns -2 in O(1)',
      description: 'Both operations executed in constant O(1) time without searching.',
      codeLineHighlight: 10,
      variables: { top: 0, getMin: -2, timeComplexity: 'O(1)' },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: '-2 (min:-2)', status: 'default' },
          { value: '0 (min:-2)', status: 'top' },
        ],
      },
    },
  ],

  // Problem 224: Basic Calculator
  224: [
    {
      stepIndex: 0,
      title: 'Evaluate Expression "(1 + (4 + 5 + 2) - 3) + (6 + 8)"',
      description: 'Maintain running result and current sign (+1/-1). Push result and sign onto stack upon "(".',
      codeLineHighlight: 2,
      variables: { runningResult: 0, sign: 1 },
      stackQueueState: {
        type: 'stack',
        items: [],
      },
    },
    {
      stepIndex: 1,
      title: 'Encounter "(": Push [runningResult=1, sign=+1] to Stack',
      description: 'Opening parenthesis saves outer context to stack before evaluating sub-expression (4 + 5 + 2).',
      codeLineHighlight: 6,
      variables: { savedState: '[1, +1]', innerSum: 11 },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 'Saved Scope: [res:1, sign:+1]', status: 'top' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Encounter ")": Multiply by Saved Sign and Add Saved Result',
      description: 'Inner expression evaluates to 11. result = 1 + (+1 * 11) = 12. Pop saved scope.',
      codeLineHighlight: 9,
      variables: { restoredResult: 12 },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 'Result: 12', status: 'top' },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'Complete Entire Evaluation: Return Total Result 23',
      description: 'Final expression evaluated correctly in linear time. Return 23. Time: O(N), Space: O(N).',
      codeLineHighlight: 12,
      variables: { finalResult: 23, complete: true },
      stackQueueState: {
        type: 'stack',
        items: [
          { value: 23, status: 'top' },
        ],
      },
    },
  ],
};
