import type { LeetCodeProblem } from '../../types/problem';

export const backtrackingProblems: LeetCodeProblem[] = [
  {
    id: 17,
    slug: 'letter-combinations-of-a-phone-number',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.',
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]'
      },
      {
        input: 'digits = ""',
        output: '[]'
      },
      {
        input: 'digits = "2"',
        output: '["a","b","c"]'
      }
    ],
    constraints: [
      '0 <= digits.length <= 4',
      'digits[i] is a digit in the range [\'2\', \'9\'].'
    ],
    bruteForce: {
      name: 'Iterative Queue Cartesian Product',
      code: `function letterCombinationsBrute(digits: string): string[] {
  if (!digits) return [];
  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  let queue: string[] = [''];
  for (const d of digits) {
    const letters = map[d];
    const nextQueue: string[] = [];
    for (const prefix of queue) {
      for (const char of letters) nextQueue.push(prefix + char);
    }
    queue = nextQueue;
  }
  return queue;
}`,
      complexity: {
        time: 'O(4^N * N)',
        space: 'O(4^N * N)'
      },
      explanation: 'Repeatedly builds full Cartesian products across all letters of each digit using queue replacement.'
    },
    optimal: {
      name: 'Recursive DFS Backtracking with String Buffer',
      code: `function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const digitMap: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result: string[] = [];
  const currentCombination: string[] = [];

  function backtrack(index: number) {
    if (index === digits.length) {
      result.push(currentCombination.join(''));
      return;
    }

    const letters = digitMap[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      currentCombination.push(letters[i]);
      backtrack(index + 1);
      currentCombination.pop(); // Backtrack
    }
  }

  backtrack(0);
  return result;
}`,
      complexity: {
        time: 'O(4^N * N)',
        space: 'O(N) recursion stack'
      },
      explanation: 'Branch recursively on the letters mapped to each digit. Push the letter into a shared path array, recurse on index + 1, and pop the letter upon return to restore state.',
      whyOptimalIsPreferred: 'Maintains a single reusable path buffer in O(N) recursion memory rather than allocating huge intermediate arrays at every step.',
      patternInvariant: 'State restoration invariant: push choice, recurse down sub-tree, pop choice to leave state clean for sibling branches.'
    },
    defaultInputDescription: 'digits = "23"'
  },
  {
    id: 77,
    slug: 'combinations',
    title: 'Combinations',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n]. You may return the answer in any order.',
    examples: [
      {
        input: 'n = 4, k = 2',
        output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]',
        explanation: '4 choose 2 = 6 combinations.'
      },
      {
        input: 'n = 1, k = 1',
        output: '[[1]]'
      }
    ],
    constraints: [
      '1 <= n <= 20',
      '1 <= k <= n'
    ],
    bruteForce: {
      name: 'Full Power Set Generation and Filter',
      code: `function combineBrute(n: number, k: number): number[][] {
  const allSubsets: number[][] = [[]];
  for (let i = 1; i <= n; i++) {
    const len = allSubsets.length;
    for (let j = 0; j < len; j++) {
      allSubsets.push([...allSubsets[j], i]);
    }
  }
  return allSubsets.filter(s => s.length === k);
}`,
      complexity: {
        time: 'O(2^N * N)',
        space: 'O(2^N * N)'
      },
      explanation: 'Generates all 2^N possible subsets and filters out subsets whose size is not equal to k.'
    },
    optimal: {
      name: 'Backtracking with Upper-Bound Pruning',
      code: `function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    // Pruning: need (k - current.length) more elements, so i can at most be n - (k - current.length) + 1
    const need = k - current.length;
    for (let i = start; i <= n - need + 1; i++) {
      current.push(i);
      backtrack(i + 1);
      current.pop();
    }
  }

  backtrack(1);
  return result;
}`,
      complexity: {
        time: 'O(C(n, k) * k)',
        space: 'O(k) recursion stack'
      },
      explanation: 'Iterate from start up to n - need + 1. If not enough numbers remain to complete a combination of size k, prune the loop immediately.',
      whyOptimalIsPreferred: 'Pruning stops unproductive branches that cannot form a complete size-k combination, achieving optimal O(C(n, k) * k) time.',
      patternInvariant: 'Combinatorial pruning bound: upper bound for branch index is n - (k - current.length) + 1.'
    },
    defaultInputDescription: 'n = 4, k = 2'
  },
  {
    id: 46,
    slug: 'permutations',
    title: 'Permutations',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]'
      },
      {
        input: 'nums = [0,1]',
        output: '[[0,1],[1,0]]'
      },
      {
        input: 'nums = [1]',
        output: '[[1]]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 6',
      '-10 <= nums[i] <= 10',
      'All the integers of nums are unique.'
    ],
    bruteForce: {
      name: 'Permutation Filtering via Array Scanning',
      code: `function permuteBrute(nums: number[]): number[][] {
  const res: number[][] = [];
  function generate(p: number[]) {
    if (p.length === nums.length) { res.push([...p]); return; }
    for (const num of nums) {
      if (!p.includes(num)) {
        p.push(num);
        generate(p);
        p.pop();
      }
    }
  }
  generate([]);
  return res;
}`,
      complexity: {
        time: 'O(N * N!)',
        space: 'O(N)'
      },
      explanation: 'Builds permutations by testing p.includes(num) using linear scans on every recursive call.'
    },
    optimal: {
      name: 'In-Place Swap Backtracking',
      code: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(first: number) {
    if (first === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = first; i < nums.length; i++) {
      // Swap nums[first] and nums[i]
      [nums[first], nums[i]] = [nums[i], nums[first]];
      backtrack(first + 1);
      // Undo swap
      [nums[first], nums[i]] = [nums[i], nums[first]];
    }
  }

  backtrack(0);
  return result;
}`,
      complexity: {
        time: 'O(N * N!)',
        space: 'O(N) call stack'
      },
      explanation: 'Permute array in-place by swapping nums[first] with each subsequent candidate nums[i]. Recurse on first + 1, then swap back upon return. Zero auxiliary visited flags or arrays required.',
      whyOptimalIsPreferred: 'In-place swap algorithm avoids maintaining boolean visited sets or array slice searches, minimizing memory overhead.',
      patternInvariant: 'In-place permutation invariant: swapping index first with candidate i partitions into fixed prefix and available suffix.'
    },
    defaultInputDescription: 'nums = [1, 2, 3]'
  },
  {
    id: 39,
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the answer in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
    examples: [
      {
        input: 'candidates = [2,3,6,7], target = 7',
        output: '[[2,2,3],[7]]',
        explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.'
      },
      {
        input: 'candidates = [2,3,5], target = 8',
        output: '[[2,2,2,2],[2,3,3],[3,5]]'
      },
      {
        input: 'candidates = [2], target = 1',
        output: '[]'
      }
    ],
    constraints: [
      '1 <= candidates.length <= 30',
      '2 <= candidates[i] <= 40',
      'All elements of candidates are distinct.',
      '1 <= target <= 40'
    ],
    bruteForce: {
      name: 'Unconstrained Recursion with Hash Set Deduplication',
      code: `function combinationSumBrute(candidates: number[], target: number): number[][] {
  const seen = new Set<string>();
  const res: number[][] = [];
  function search(remain: number, current: number[]) {
    if (remain === 0) {
      const sorted = [...current].sort((a,b) => a-b);
      const key = sorted.join(',');
      if (!seen.has(key)) { seen.add(key); res.push(sorted); }
      return;
    }
    if (remain < 0) return;
    for (const c of candidates) search(remain - c, [...current, c]);
  }
  search(target, []);
  return res;
}`,
      complexity: {
        time: 'O(N^(target / min))',
        space: 'O(target)'
      },
      explanation: 'Branches in all directions without maintaining a non-decreasing index pointer, resulting in duplicate permutations that require set deduplication.'
    },
    optimal: {
      name: 'Ordered Index-Branching Backtracking (Unlimited Reuse)',
      code: `function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number, remainingTarget: number) {
    if (remainingTarget === 0) {
      result.push([...current]);
      return;
    }
    if (remainingTarget < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      // Pass i as start (not i + 1) to permit reuse of the same element
      backtrack(i, remainingTarget - candidates[i]);
      current.pop();
    }
  }

  backtrack(0, target);
  return result;
}`,
      complexity: {
        time: 'O(2^target)',
        space: 'O(target / minCandidate)'
      },
      explanation: 'Enforce index monotonicity by passing start = i into the recursive call. This prevents duplicate permutations like [2, 3, 2] vs [2, 2, 3] while allowing unlimited reuse of the current candidate.',
      whyOptimalIsPreferred: 'Generates only strictly unique combinations without sorting or hash set deduplication.',
      patternInvariant: 'Index monotonicity constraint: only choose elements at index >= current index to eliminate duplicate permutations by construction.'
    },
    defaultInputDescription: 'candidates = [2, 3, 6, 7], target = 7'
  },
  {
    id: 52,
    slug: 'n-queens-ii',
    title: 'N-Queens II',
    difficulty: 'Hard',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions to the n-queens puzzle.',
    examples: [
      {
        input: 'n = 4',
        output: '2',
        explanation: 'There are two distinct solutions to the 4-queens puzzle.'
      },
      {
        input: 'n = 1',
        output: '1'
      }
    ],
    constraints: [
      '1 <= n <= 9'
    ],
    bruteForce: {
      name: 'Full Board Placement Verification',
      code: `function totalNQueensBrute(n: number): number {
  let count = 0;
  function isSafe(queens: number[], row: number, col: number) {
    for (let r = 0; r < row; r++) {
      const c = queens[r];
      if (c === col || Math.abs(c - col) === Math.abs(r - row)) return false;
    }
    return true;
  }
  function place(r: number, queens: number[]) {
    if (r === n) { count++; return; }
    for (let c = 0; c < n; c++) {
      if (isSafe(queens, r, c)) {
        queens.push(c);
        place(r + 1, queens);
        queens.pop();
      }
    }
  }
  place(0, []);
  return count;
}`,
      complexity: {
        time: 'O(N^N)',
        space: 'O(N)'
      },
      explanation: 'Verifies diagonal collisions by scanning all previously placed queens in O(N) at each placement.'
    },
    optimal: {
      name: 'Bitmask / Hash Set Diagonals Backtracking',
      code: `function totalNQueens(n: number): number {
  let count = 0;
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // (r - c)
  const diag2 = new Set<number>(); // (r + c)

  function backtrack(r: number) {
    if (r === n) {
      count++;
      return;
    }

    for (let c = 0; c < n; c++) {
      const d1 = r - c;
      const d2 = r + c;

      if (cols.has(c) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      cols.add(c);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(r + 1);

      cols.delete(c);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}`,
      complexity: {
        time: 'O(N!)',
        space: 'O(N)'
      },
      explanation: 'Check columns, major diagonals (r - c), and minor diagonals (r + c) in O(1) time using hash sets. Advance row by row, ensuring no two queens ever attack each other.',
      whyOptimalIsPreferred: 'Checks validity in O(1) time per cell rather than O(N) pairwise loops, achieving the theoretical best time bound O(N!).',
      patternInvariant: 'Diagonal coordinates invariant: all cells on the same positive diagonal share (r - c), and on the same negative diagonal share (r + c).'
    },
    defaultInputDescription: 'n = 4'
  },
  {
    id: 22,
    slug: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]'
      },
      {
        input: 'n = 1',
        output: '["()"]'
      }
    ],
    constraints: [
      '1 <= n <= 8'
    ],
    bruteForce: {
      name: 'Generate All 2^(2N) Sequences and Validate',
      code: `function generateParenthesisBrute(n: number): string[] {
  const res: string[] = [];
  function isValid(s: string): boolean {
    let bal = 0;
    for (const c of s) {
      if (c === '(') bal++;
      else bal--;
      if (bal < 0) return false;
    }
    return bal === 0;
  }
  function gen(curr: string) {
    if (curr.length === 2 * n) {
      if (isValid(curr)) res.push(curr);
      return;
    }
    gen(curr + '(');
    gen(curr + ')');
  }
  gen('');
  return res;
}`,
      complexity: {
        time: 'O(2^(2N) * N)',
        space: 'O(N)'
      },
      explanation: 'Generates all 2^(2N) binary bracket sequences and filters using a validity counter.'
    },
    optimal: {
      name: 'Bounded Pruning Backtracking (Open/Close Counters)',
      code: `function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(currentStr: string, openCount: number, closeCount: number) {
    if (currentStr.length === 2 * n) {
      result.push(currentStr);
      return;
    }

    if (openCount < n) {
      backtrack(currentStr + '(', openCount + 1, closeCount);
    }
    if (closeCount < openCount) {
      backtrack(currentStr + ')', openCount, closeCount + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}`,
      complexity: {
        time: 'O(4^N / sqrt(N)) (Catalan number C_n)',
        space: 'O(N) recursion stack'
      },
      explanation: 'Prune branches immediately: only add \'(\' if openCount < n, and only add \')\' if closeCount < openCount. Every branch generated is guaranteed to be valid.',
      whyOptimalIsPreferred: 'Explores only valid states, generating exactly C_n sequences (the Catalan number) without wasting work on invalid configurations.',
      patternInvariant: 'Parentheses prefix balance invariant: at any point in a valid prefix, closeCount <= openCount <= n.'
    },
    defaultInputDescription: 'n = 3'
  },
  {
    id: 79,
    slug: 'word-search',
    title: 'Word Search',
    difficulty: 'Medium',
    pattern: 'backtracking',
    category: 'Backtracking',
    statement: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true'
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: 'true'
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: 'false'
      }
    ],
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters.'
    ],
    bruteForce: {
      name: 'Separate Visited Matrix Allocation per Branch',
      code: `function existBrute(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;
  function dfs(r: number, c: number, k: number, visited: Set<string>): boolean {
    if (k === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n) return false;
    const key = \`\${r},\${c}\`;
    if (visited.has(key) || board[r][c] !== word[k]) return false;
    const nextVis = new Set(visited);
    nextVis.add(key);
    return dfs(r+1,c,k+1,nextVis) || dfs(r-1,c,k+1,nextVis) || dfs(r,c+1,k+1,nextVis) || dfs(r,c-1,k+1,nextVis);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0, new Set())) return true;
    }
  }
  return false;
}`,
      complexity: {
        time: 'O(M * N * 4^L * L)',
        space: 'O(L^2)'
      },
      explanation: 'Allocates new visited sets on each recursive call, causing heavy garbage collection and slow copying.'
    },
    optimal: {
      name: 'In-Place Character Mutation Backtracking',
      code: `function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;

  function dfs(r: number, c: number, k: number): boolean {
    if (k === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[k]) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = '#'; // Mark as visited in-place

    const found = (
      dfs(r + 1, c, k + 1) ||
      dfs(r - 1, c, k + 1) ||
      dfs(r, c + 1, k + 1) ||
      dfs(r, c - 1, k + 1)
    );

    board[r][c] = temp; // Restore original character
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}`,
      complexity: {
        time: 'O(M * N * 3^L)',
        space: 'O(L) recursion stack'
      },
      explanation: 'Temporarily overwrite board[r][c] with \'#\' to mark as visited in-place, recurse in 4 directions on k + 1, and restore the original character on backtrack.',
      whyOptimalIsPreferred: 'Modifies board in-place with zero memory allocation, reducing auxiliary space to the call stack depth O(L).',
      patternInvariant: 'In-place state marking: mutating the active grid cell to a sentinel (#) and restoring on return eliminates auxiliary visited sets.'
    },
    defaultInputDescription: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"'
  }
];
