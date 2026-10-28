import type { LeetCodeProblem } from '../../types/problem';

export const stackProblems: LeetCodeProblem[] = [
  {
    id: 20,
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    pattern: 'stack',
    category: 'Stack',
    statement: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    bruteForce: {
      name: 'Repeated String Replacement',
      code: `function isValidBrute(s: string): boolean {
  let prev = '';
  while (s.length !== prev.length) {
    prev = s;
    s = s.replace('()', '').replace('[]', '').replace('{}', '');
  }
  return s.length === 0;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly scan and replace matching pairs until no pairs remain. If empty, string was valid.'
    },
    optimal: {
      name: 'LIFO Stack Matching',
      code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Push open brackets onto a stack. When a closing bracket is encountered, pop the top of the stack and assert that it matches the complementary bracket.',
      whyOptimalIsPreferred: 'Linear O(N) single-pass execution directly reflects the nested syntax grammar of balanced delimiters.',
      patternInvariant: 'LIFO stack matches innermost unresolved brackets first before progressing to outer scopes.'
    },
    defaultInputDescription: 's = "()[]{}"'
  },
  {
    id: 71,
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'Medium',
    pattern: 'stack',
    category: 'Stack',
    statement: 'Given an absolute path for a Unix-style file system, which begins with a slash \'/\', transform this path into its simplified canonical path. In Unix-style file systems, a period \'.\' refers to the current directory, a double period \'..\' refers to the directory up a level, and multiple consecutive slashes are treated as a single slash \'/\'.',
    examples: [
      {
        input: 'path = "/home/"',
        output: '"/home"',
        explanation: 'Note that there is no trailing slash after the last directory name.'
      },
      {
        input: 'path = "/../"',
        output: '"/"',
        explanation: 'Going one level up from the root directory is a no-op, as the root level is the highest level you can go.'
      },
      {
        input: 'path = "/home//foo/"',
        output: '"/home/foo"',
        explanation: 'Multiple consecutive slashes are replaced by a single one.'
      }
    ],
    constraints: [
      '1 <= path.length <= 3000',
      'path consists of English letters, digits, period \'.\', slash \'/\' or \'_\'.',
      'path is a valid absolute Unix path.'
    ],
    bruteForce: {
      name: 'Recursive String Path Splicing',
      code: `function simplifyPathBrute(path: string): string {
  let parts = path.split('/').filter(p => p !== '' && p !== '.');
  let i = 0;
  while (i < parts.length) {
    if (parts[i] === '..') {
      if (i > 0) {
        parts.splice(i - 1, 2);
        i--;
      } else {
        parts.splice(i, 1);
      }
    } else {
      i++;
    }
  }
  return '/' + parts.join('/');
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Splits path into components and iteratively removes segments using quadratic array splice operations.'
    },
    optimal: {
      name: 'Directory Token LIFO Stack',
      code: `function simplifyPath(path: string): string {
  const stack: string[] = [];
  const tokens = path.split('/');

  for (const token of tokens) {
    if (token === '' || token === '.') {
      continue;
    } else if (token === '..') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(token);
    }
  }

  return '/' + stack.join('/');
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Tokenize by slash. Ignore empty segments and \'.\'. When \'..\' is encountered, pop the previous directory from the stack. Otherwise push directory names to the stack. Finally, join with \'/\'.',
      whyOptimalIsPreferred: 'Linear O(N) execution that models hierarchical directory traversal natively with push and pop in O(1) per token.',
      patternInvariant: 'Parent directory reference ".." naturally pops the most recently entered directory level.'
    },
    defaultInputDescription: 'path = "/home//foo/"'
  },
  {
    id: 155,
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    pattern: 'stack',
    category: 'Stack',
    statement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class: MinStack() initializes the stack object. void push(int val) pushes the element val onto the stack. void pop() removes the element on the top of the stack. int top() gets the top element of the stack. int getMin() retrieves the minimum element in the stack. You must implement a solution with O(1) time complexity for each function.',
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation: 'MinStack minStack = new MinStack(); minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin(); // return -3; minStack.pop(); minStack.top(); // return 0; minStack.getMin(); // return -2'
      }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'Methods pop, top and getMin operations will always be called on non-empty stacks.',
      'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'
    ],
    bruteForce: {
      name: 'Single Stack with Linear Search on getMin',
      code: `class MinStackBrute {
  private stack: number[] = [];
  push(val: number): void { this.stack.push(val); }
  pop(): void { this.stack.pop(); }
  top(): number { return this.stack[this.stack.length - 1]; }
  getMin(): number {
    let min = Infinity;
    for (const v of this.stack) min = Math.min(min, v);
    return min;
  }
}`,
      complexity: {
        time: 'O(N) for getMin, O(1) for others',
        space: 'O(N)'
      },
      explanation: 'Stores elements in a standard array stack, but scans all elements upon each getMin() invocation.'
    },
    optimal: {
      name: 'Paired Dual Stack (Value & Running Minimum)',
      code: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}`,
      complexity: {
        time: 'O(1) for all operations',
        space: 'O(N)'
      },
      explanation: 'Maintain a secondary stack that tracks minimums. Whenever a new value is <= the current minimum, push it onto minStack. When popping, if the popped value equals minStack top, pop minStack as well.',
      whyOptimalIsPreferred: 'Guarantees strict O(1) time complexity for getMin() without performing any scans.',
      patternInvariant: 'Prefix minimum monotonicity: historical minimums remain valid until the element that caused them is popped.'
    },
    defaultInputDescription: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()'
  },
  {
    id: 150,
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    pattern: 'stack',
    category: 'Stack',
    statement: 'You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value of the expression. Note that the division between two integers always truncates toward zero.',
    examples: [
      {
        input: 'tokens = ["2","1","+","3","*"]',
        output: '9',
        explanation: '((2 + 1) * 3) = 9'
      },
      {
        input: 'tokens = ["4","13","5","/","+"]',
        output: '6',
        explanation: '(4 + (13 / 5)) = 6'
      },
      {
        input: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',
        output: '22'
      }
    ],
    constraints: [
      '1 <= tokens.length <= 10^4',
      'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].'
    ],
    bruteForce: {
      name: 'Scan and In-Place Array Collapse',
      code: `function evalRPNBrute(tokens: string[]): number {
  let arr = [...tokens];
  while (arr.length > 1) {
    let idx = arr.findIndex(t => ['+', '-', '*', '/'].includes(t));
    const op = arr[idx];
    const a = parseInt(arr[idx - 2], 10);
    const b = parseInt(arr[idx - 1], 10);
    let val = 0;
    if (op === '+') val = a + b;
    else if (op === '-') val = a - b;
    else if (op === '*') val = a * b;
    else val = Math.trunc(a / b);
    arr.splice(idx - 2, 3, val.toString());
  }
  return parseInt(arr[0], 10);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly scans for the first operator, applies it to the preceding two numbers, and collapses the array using splice.'
    },
    optimal: {
      name: 'Single-Pass Operand LIFO Stack',
      code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.trunc(a / b)); break;
      }
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Push numbers onto stack. When encountering an operator, pop the right operand b, then the left operand a, execute operation, and push result back onto stack.',
      whyOptimalIsPreferred: 'Linear O(N) evaluation in a single pass without quadratic array memory shifting.',
      patternInvariant: 'Postfix notation directly corresponds to stack execution: operator applies to the two most recently resolved operands.'
    },
    defaultInputDescription: 'tokens = ["2", "1", "+", "3", "*"]'
  },
  {
    id: 224,
    slug: 'basic-calculator',
    title: 'Basic Calculator',
    difficulty: 'Hard',
    pattern: 'stack',
    category: 'Stack',
    statement: 'Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().',
    examples: [
      {
        input: 's = "1 + 1"',
        output: '2'
      },
      {
        input: 's = " 2-1 + 2 "',
        output: '3'
      },
      {
        input: 's = "(1+(4+5+2)-3)+(6+8)"',
        output: '23'
      }
    ],
    constraints: [
      '1 <= s.length <= 3 * 10^5',
      's consists of digits, \'+\', \'-\', \'(\', \')\', and \' \'.'
    ],
    bruteForce: {
      name: 'Recursive Parentheses Unwrapping',
      code: `function calculateBrute(s: string): number {
  function evalSimple(expr: string): number {
    let sum = 0, sign = 1, num = 0;
    for (let i = 0; i < expr.length; i++) {
      const c = expr[i];
      if (c >= '0' && c <= '9') num = num * 10 + parseInt(c, 10);
      if (c === '+' || c === '-' || i === expr.length - 1) {
        sum += sign * num;
        num = 0;
        sign = c === '+' ? 1 : -1;
      }
    }
    return sum;
  }
  while (s.includes('(')) {
    s = s.replace(/\\(([^()]+)\\)/g, (_, inner) => evalSimple(inner).toString());
  }
  return evalSimple(s);
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Repeatedly evaluates innermost parentheses with regex string substitutions until no parentheses remain.'
    },
    optimal: {
      name: 'Sign & Scope Stack Accumulator',
      code: `function calculate(s: string): number {
  let result = 0;
  let sign = 1;
  let currentNum = 0;
  const stack: number[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + (char.charCodeAt(0) - '0'.charCodeAt(0));
    } else if (char === '+') {
      result += sign * currentNum;
      currentNum = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * currentNum;
      currentNum = 0;
      sign = -1;
    } else if (char === '(') {
      // Save current result and outer sign
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * currentNum;
      currentNum = 0;
      const prevSign = stack.pop()!;
      const prevResult = stack.pop()!;
      result = prevResult + prevSign * result;
    }
  }

  result += sign * currentNum;
  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Maintain running result and sign. On \'(\', save current [result, sign] onto stack and reset context. On \')\', resolve parenthesized value and combine with saved outer scope.',
      whyOptimalIsPreferred: 'Linear O(N) single scan parsing without string recursion, regex overhead, or multi-pass tokenization.',
      patternInvariant: 'Parenthesized scopes preserve context on stack: scopeResult = outerResult + outerSign * innerResult.'
    },
    defaultInputDescription: 's = "(1+(4+5+2)-3)+(6+8)"'
  }
];
