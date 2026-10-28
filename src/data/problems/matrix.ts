import type { LeetCodeProblem } from '../../types/problem';

export const matrixProblems: LeetCodeProblem[] = [
  {
    id: 36,
    slug: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    pattern: 'matrix',
    category: 'Matrix',
    statement: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.',
    examples: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true'
      }
    ],
    constraints: [
      'board.length == 9',
      'board[i].length == 9',
      'board[i][j] is a digit 1-9 or \'.\'.'
    ],
    bruteForce: {
      name: 'Separate Row, Column, and Box Passes',
      code: `function isValidSudokuBrute(board: string[][]): boolean {
  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set<string>();
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== '.') {
        if (seen.has(board[r][c])) return false;
        seen.add(board[r][c]);
      }
    }
  }
  // Check cols
  for (let c = 0; c < 9; c++) {
    const seen = new Set<string>();
    for (let r = 0; r < 9; r++) {
      if (board[r][c] !== '.') {
        if (seen.has(board[r][c])) return false;
        seen.add(board[r][c]);
      }
    }
  }
  // Check 3x3 boxes
  for (let b = 0; b < 9; b++) {
    const seen = new Set<string>();
    const startR = Math.floor(b / 3) * 3;
    const startC = (b % 3) * 3;
    for (let r = startR; r < startR + 3; r++) {
      for (let c = startC; c < startC + 3; c++) {
        if (board[r][c] !== '.') {
          if (seen.has(board[r][c])) return false;
          seen.add(board[r][c]);
        }
      }
    }
  }
  return true;
}`,
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      },
      explanation: 'Performs 3 sequential nested loops across rows, columns, and 3x3 boxes using hash sets for deduplication.'
    },
    optimal: {
      name: 'Single-Pass Bitmask / Boolean Array Hashing',
      code: `function isValidSudoku(board: string[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<string>());
  const cols = Array.from({ length: 9 }, () => new Set<string>());
  const boxes = Array.from({ length: 9 }, () => new Set<string>());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
        return false;
      }

      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIdx].add(val);
    }
  }
  return true;
}`,
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      },
      explanation: 'Traverses each of the 81 cells exactly once, mapping (r, c) to row r, column c, and boxIndex = Math.floor(r/3)*3 + Math.floor(c/3), validating all constraints simultaneously.',
      whyOptimalIsPreferred: 'Visits each cell only once in a single pass instead of making three separate full-board passes, achieving cleaner code and better cache performance.',
      patternInvariant: 'Direct mathematical coordinate projection: sub-box index = floor(r/3)*3 + floor(c/3) maps 2D cell to 1D box identifier.'
    },
    defaultInputDescription: 'board = 9x9 Sudoku configuration'
  },
  {
    id: 54,
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    pattern: 'matrix',
    category: 'Matrix',
    statement: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]'
      },
      {
        input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]'
      }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100'
    ],
    bruteForce: {
      name: 'Auxiliary Visited Matrix Simulation',
      code: `function spiralOrderBrute(matrix: number[][]): number[] {
  const m = matrix.length;
  const n = matrix[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const res: number[] = [];
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let r = 0, c = 0, di = 0;

  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    visited[r][c] = true;
    const nextR = r + dr[di];
    const nextC = c + dc[di];
    if (nextR >= 0 && nextR < m && nextC >= 0 && nextC < n && !visited[nextR][nextC]) {
      r = nextR;
      c = nextC;
    } else {
      di = (di + 1) % 4;
      r += dr[di];
      c += dc[di];
    }
  }
  return res;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N)'
      },
      explanation: 'Simulates the path by walking in directional vectors (right, down, left, up) and keeping an auxiliary visited matrix to detect walls.'
    },
    optimal: {
      name: 'Four-Boundary Layer Inward Shrinkage',
      code: `function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;

    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(1) extra'
      },
      explanation: 'Define boundaries top, bottom, left, right. Traverse across the top row and increment top, down right column and decrement right, across bottom row and decrement bottom, and up left column and increment left until boundaries cross.',
      whyOptimalIsPreferred: 'Eliminates the auxiliary M x N visited matrix, executing strictly in O(M*N) time with O(1) auxiliary memory.',
      patternInvariant: 'Traverse 4 outer perimeter walls sequentially, then shrink the bounding box inward by 1 unit.'
    },
    defaultInputDescription: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]'
  },
  {
    id: 48,
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    pattern: 'matrix',
    category: 'Matrix',
    statement: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[[7,4,1],[8,5,2],[9,6,3]]'
      },
      {
        input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]'
      }
    ],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000'
    ],
    bruteForce: {
      name: 'Secondary Matrix Allocation',
      code: `function rotateBrute(matrix: number[][]): void {
  const n = matrix.length;
  const temp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      temp[c][n - 1 - r] = matrix[r][c];
    }
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      matrix[r][c] = temp[r][c];
    }
  }
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      },
      explanation: 'Maps each cell (r, c) to its rotated destination (c, n - 1 - r) in an auxiliary grid, then copies elements back.'
    },
    optimal: {
      name: 'In-Place Transpose and Row Reversal',
      code: `function rotate(matrix: number[][]): void {
  const n = matrix.length;
  // Step 1: Transpose matrix along main diagonal
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  // Step 2: Reverse each row horizontally
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      },
      explanation: 'A 90-degree clockwise rotation is mathematically identical to transposing the matrix across its main diagonal followed by reversing each row horizontally.',
      whyOptimalIsPreferred: 'Fully in-place O(1) auxiliary space operation satisfying strict problem constraints without extra memory allocation.',
      patternInvariant: 'Rotate 90 degrees clockwise = Transpose matrix(i, j) <-> matrix(j, i) + Horizontal reflection.'
    },
    defaultInputDescription: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]'
  },
  {
    id: 73,
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    pattern: 'matrix',
    category: 'Matrix',
    statement: 'Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0\'s. You must do it in place.',
    examples: [
      {
        input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
        output: '[[1,0,1],[0,0,0],[1,0,1]]'
      },
      {
        input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]',
        output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]'
      }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 <= m, n <= 200',
      '-2^31 <= matrix[i][j] <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Auxiliary Row and Column Marker Arrays',
      code: `function setZeroesBrute(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  const zeroRows = new Set<number>();
  const zeroCols = new Set<number>();

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === 0) {
        zeroRows.add(r);
        zeroCols.add(c);
      }
    }
  }

  for (const r of zeroRows) {
    for (let c = 0; c < n; c++) matrix[r][c] = 0;
  }
  for (const c of zeroCols) {
    for (let r = 0; r < m; r++) matrix[r][c] = 0;
  }
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M + N)'
      },
      explanation: 'Records indices of zero rows and zero columns in sets, then zeros those entire rows and columns in a second pass.'
    },
    optimal: {
      name: 'In-Place First Row and Column Sentinel Markers',
      code: `function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  let firstColZero = false;

  for (let r = 0; r < m; r++) {
    if (matrix[r][0] === 0) firstColZero = true;
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  for (let r = m - 1; r >= 0; r--) {
    for (let c = n - 1; c >= 1; c--) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
    if (firstColZero) {
      matrix[r][0] = 0;
    }
  }
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(1)'
      },
      explanation: 'Use matrix[r][0] and matrix[0][c] as flags to indicate whether row r or col c should be zeroed. Track the first column status separately with a boolean variable firstColZero.',
      whyOptimalIsPreferred: 'Requires zero auxiliary memory allocations, reducing space complexity from O(M+N) to strictly O(1).',
      patternInvariant: 'Use the first row and first column of the matrix itself as the state indicator bitboard.'
    },
    defaultInputDescription: 'matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]'
  },
  {
    id: 289,
    slug: 'game-of-life',
    title: 'Game of Life',
    difficulty: 'Medium',
    pattern: 'matrix',
    category: 'Matrix',
    statement: 'According to Conway\'s Game of Life: Any live cell with fewer than two live neighbors dies (underpopulation). Any live cell with two or three live neighbors lives on to the next generation. Any live cell with more than three live neighbors dies (overpopulation). Any dead cell with exactly three live neighbors becomes a live cell (reproduction). Compute the next state of the board in place.',
    examples: [
      {
        input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]',
        output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]'
      },
      {
        input: 'board = [[1,1],[1,0]]',
        output: '[[1,1],[1,1]]'
      }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 25',
      'board[i][j] is 0 or 1.'
    ],
    bruteForce: {
      name: 'Full Board Snapshot Clone',
      code: `function gameOfLifeBrute(board: number[][]): void {
  const m = board.length;
  const n = board[0].length;
  const clone = board.map(row => [...row]);
  const dirs = [-1, 0, 1];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let live = 0;
      for (const dr of dirs) {
        for (const dc of dirs) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
            live += clone[nr][nc];
          }
        }
      }
      if (clone[r][c] === 1 && (live < 2 || live > 3)) board[r][c] = 0;
      if (clone[r][c] === 0 && live === 3) board[r][c] = 1;
    }
  }
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N)'
      },
      explanation: 'Creates a deep copy of the board to compute next state transitions without corrupting active neighbor calculations.'
    },
    optimal: {
      name: 'Two-Bit State Transition Encoding',
      code: `function gameOfLife(board: number[][]): void {
  const m = board.length;
  const n = board[0].length;
  // State transitions encoded in 2 bits:
  // 0: dead -> dead (00)
  // 1: live -> live (01)
  // 2: live -> dead (10)
  // 3: dead -> live (11)

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let liveNeighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
            if (board[nr][nc] === 1 || board[nr][nc] === 2) {
              liveNeighbors++;
            }
          }
        }
      }

      if (board[r][c] === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[r][c] = 2; // live -> dead
        }
      } else {
        if (liveNeighbors === 3) {
          board[r][c] = 3; // dead -> live
        }
      }
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 2) board[r][c] = 0;
      else if (board[r][c] === 3) board[r][c] = 1;
    }
  }
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(1)'
      },
      explanation: 'Encode states using 2 bits: bit 0 represents current state, bit 1 represents next state. Intermediate states 2 (live->dead) and 3 (dead->live) preserve original state for neighbors while recording new state.',
      whyOptimalIsPreferred: 'Operates completely in-place with O(1) extra space, eliminating the O(M*N) auxiliary snapshot clone.',
      patternInvariant: 'Bitwise state encoding packs both current and next state into a single integer cell for in-place cellular automata.'
    },
    defaultInputDescription: 'board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]'
  }
];
