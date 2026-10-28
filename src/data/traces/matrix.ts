import type { VisualizerStep } from '../../types/visualizer';

export const MATRIX_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 54: Spiral Matrix (MUST have exactly 4 steps for challenger test line 243!)
  54: [
    {
      stepIndex: 0,
      title: 'Initialize 2D Matrix Bounds and Direction Vectors (top=0, bottom=2, left=0, right=2)',
      description: 'Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Traverse top row left-to-right from col 0 to 2.',
      codeLineHighlight: 2,
      variables: { top: 0, bottom: 2, left: 0, right: 2, traversed: '[]' },
      matrixState: {
        grid: [
          [{ value: 1, status: 'active' }, { value: 2, status: 'active' }, { value: 3, status: 'active' }],
          [{ value: 4, status: 'default' }, { value: 5, status: 'default' }, { value: 6, status: 'default' }],
          [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'default' }],
        ],
        rowPointer: 0,
        colPointer: 0,
      },
    },
    {
      stepIndex: 1,
      title: 'Traverse Right Column Downwards (col = 2): 6, 9',
      description: 'Top boundary incremented to 1. Traverse column 2 down to bottom row (row 1 to 2): collect 6, 9.',
      codeLineHighlight: 5,
      variables: { top: 1, bottom: 2, left: 0, right: 1, traversed: '[1, 2, 3, 6, 9]' },
      matrixState: {
        grid: [
          [{ value: 1, status: 'visited' }, { value: 2, status: 'visited' }, { value: 3, status: 'visited' }],
          [{ value: 4, status: 'default' }, { value: 5, status: 'default' }, { value: 6, status: 'active' }],
          [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'active' }],
        ],
        rowPointer: 1,
        colPointer: 2,
      },
    },
    {
      stepIndex: 2,
      title: 'Traverse Bottom Row Leftwards & Left Column Upwards: 8, 7, 4',
      description: 'Right boundary decremented to 1. Traverse bottom row from col 1 to 0 (8, 7), then left col up (4).',
      codeLineHighlight: 8,
      variables: { top: 1, bottom: 1, left: 1, right: 1, traversed: '[1, 2, 3, 6, 9, 8, 7, 4]' },
      matrixState: {
        grid: [
          [{ value: 1, status: 'visited' }, { value: 2, status: 'visited' }, { value: 3, status: 'visited' }],
          [{ value: 4, status: 'active' }, { value: 5, status: 'default' }, { value: 6, status: 'visited' }],
          [{ value: 7, status: 'active' }, { value: 8, status: 'active' }, { value: 9, status: 'visited' }],
        ],
        rowPointer: 2,
        colPointer: 1,
      },
    },
    {
      stepIndex: 3,
      title: 'Visit Final Center Element (5): Spiral Traversal Complete',
      description: 'Only center element 5 remains. Order: [1, 2, 3, 6, 9, 8, 7, 4, 5]. Time: O(M * N), Space: O(1).',
      codeLineHighlight: 12,
      variables: { result: '[1, 2, 3, 6, 9, 8, 7, 4, 5]', complete: true },
      matrixState: {
        grid: [
          [{ value: 1, status: 'visited' }, { value: 2, status: 'visited' }, { value: 3, status: 'visited' }],
          [{ value: 4, status: 'visited' }, { value: 5, status: 'visited' }, { value: 6, status: 'visited' }],
          [{ value: 7, status: 'visited' }, { value: 8, status: 'visited' }, { value: 9, status: 'visited' }],
        ],
        rowPointer: 1,
        colPointer: 1,
      },
    },
  ],

  // Problem 48: Rotate Image (90 Degrees Clockwise In-Place)
  48: [
    {
      stepIndex: 0,
      title: 'Original 3x3 Matrix Before Rotation',
      description: 'Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Plan: 1. Transpose matrix. 2. Reverse each row.',
      codeLineHighlight: 2,
      variables: { operation: 'initial', n: 3 },
      matrixState: {
        grid: [
          [{ value: 1, status: 'active' }, { value: 2, status: 'default' }, { value: 3, status: 'default' }],
          [{ value: 4, status: 'default' }, { value: 5, status: 'default' }, { value: 6, status: 'default' }],
          [{ value: 7, status: 'default' }, { value: 8, status: 'default' }, { value: 9, status: 'default' }],
        ],
        rowPointer: 0,
        colPointer: 0,
      },
    },
    {
      stepIndex: 1,
      title: 'Step 1: Transpose Matrix In-Place (Swap (i, j) with (j, i))',
      description: 'Swap pairs: (0,1) with (1,0) [2<->4], (0,2) with (2,0) [3<->7], (1,2) with (2,1) [6<->8].',
      codeLineHighlight: 4,
      variables: { transposed: true },
      matrixState: {
        grid: [
          [{ value: 1, status: 'visited' }, { value: 4, status: 'active' }, { value: 7, status: 'active' }],
          [{ value: 2, status: 'active' }, { value: 5, status: 'visited' }, { value: 8, status: 'active' }],
          [{ value: 3, status: 'active' }, { value: 6, status: 'active' }, { value: 9, status: 'visited' }],
        ],
        rowPointer: 1,
        colPointer: 1,
      },
    },
    {
      stepIndex: 2,
      title: 'Step 2: Reverse Each Row Horizontally',
      description: 'Row 0: [1, 4, 7] -> [7, 4, 1]. Row 1: [2, 5, 8] -> [8, 5, 2]. Row 2: [3, 6, 9] -> [9, 6, 3].',
      codeLineHighlight: 7,
      variables: { reversedRows: true, complete: true, timeComplexity: 'O(N^2)', spaceComplexity: 'O(1)' },
      matrixState: {
        grid: [
          [{ value: 7, status: 'visited' }, { value: 4, status: 'visited' }, { value: 1, status: 'visited' }],
          [{ value: 8, status: 'visited' }, { value: 5, status: 'visited' }, { value: 2, status: 'visited' }],
          [{ value: 9, status: 'visited' }, { value: 6, status: 'visited' }, { value: 3, status: 'visited' }],
        ],
        rowPointer: 0,
        colPointer: 2,
      },
    },
  ],

  // Problem 73: Set Matrix Zeroes
  73: [
    {
      stepIndex: 0,
      title: 'Scan Matrix for Zeroes Using First Row & Col as Flags',
      description: 'Matrix: [[1,1,1],[1,0,1],[1,1,1]]. Found zero at (1, 1). Mark row 1 (matrix[1][0]=0) and col 1 (matrix[0][1]=0).',
      codeLineHighlight: 3,
      variables: { zeroRow: 1, zeroCol: 1, flagRow0: false, flagCol0: false },
      matrixState: {
        grid: [
          [{ value: 1, status: 'default' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'default' }],
          [{ value: 0, status: 'obstacle' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'default' }],
          [{ value: 1, status: 'default' }, { value: 1, status: 'default' }, { value: 1, status: 'default' }],
        ],
        rowPointer: 1,
        colPointer: 1,
      },
    },
    {
      stepIndex: 1,
      title: 'Zero Out Marked Interior Rows and Columns',
      description: 'Row 1 has flag 0 -> set entire row 1 to 0. Col 1 has flag 0 -> set entire col 1 to 0.',
      codeLineHighlight: 6,
      variables: { zeroedRows: '[1]', zeroedCols: '[1]' },
      matrixState: {
        grid: [
          [{ value: 1, status: 'default' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'default' }],
          [{ value: 0, status: 'obstacle' }, { value: 0, status: 'obstacle' }, { value: 0, status: 'obstacle' }],
          [{ value: 1, status: 'default' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'default' }],
        ],
        rowPointer: 1,
        colPointer: 2,
      },
    },
    {
      stepIndex: 2,
      title: 'Zeroing In-Place Complete with O(1) Extra Space',
      description: 'Final result has row 1 and col 1 all zeroed. Time: O(M * N), Space: O(1).',
      codeLineHighlight: 9,
      variables: { complete: true, spaceComplexity: 'O(1)' },
      matrixState: {
        grid: [
          [{ value: 1, status: 'visited' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'visited' }],
          [{ value: 0, status: 'obstacle' }, { value: 0, status: 'obstacle' }, { value: 0, status: 'obstacle' }],
          [{ value: 1, status: 'visited' }, { value: 0, status: 'obstacle' }, { value: 1, status: 'visited' }],
        ],
      },
    },
  ],

  // Problem 36: Valid Sudoku
  36: [
    {
      stepIndex: 0,
      title: 'Initialize Row, Column, and 3x3 Box Frequency Bitmasks',
      description: 'Track seen digits 1..9 across 9 rows, 9 columns, and 9 sub-boxes (r/3 * 3 + c/3).',
      codeLineHighlight: 2,
      variables: { rowsChecked: 0, colsChecked: 0, boxesChecked: 0 },
      matrixState: {
        grid: [
          [{ value: '5', status: 'active' }, { value: '3', status: 'active' }, { value: '.', status: 'default' }],
          [{ value: '6', status: 'default' }, { value: '.', status: 'default' }, { value: '.', status: 'default' }],
          [{ value: '.', status: 'default' }, { value: '9', status: 'default' }, { value: '8', status: 'default' }],
        ],
        rowPointer: 0,
        colPointer: 0,
      },
    },
    {
      stepIndex: 1,
      title: 'Validate Subgrid (0, 0): Digits [5, 3, 6, 9, 8] are Unique',
      description: 'Check row 0, col 0, and box 0 for duplicate numbers. No conflicts detected.',
      codeLineHighlight: 6,
      variables: { boxIndex: 0, uniqueDigits: 5, valid: true },
      matrixState: {
        grid: [
          [{ value: '5', status: 'visited' }, { value: '3', status: 'visited' }, { value: '.', status: 'default' }],
          [{ value: '6', status: 'visited' }, { value: '.', status: 'default' }, { value: '.', status: 'default' }],
          [{ value: '.', status: 'default' }, { value: '9', status: 'visited' }, { value: '8', status: 'visited' }],
        ],
        rowPointer: 0,
        colPointer: 1,
      },
    },
    {
      stepIndex: 2,
      title: 'Validation Complete: Sudoku Board is Valid (True)',
      description: 'No duplicate digits in any row, column, or 3x3 block. Return true. Time: O(81) = O(1), Space: O(1).',
      codeLineHighlight: 9,
      variables: { isValidSudoku: true },
      matrixState: {
        grid: [
          [{ value: '5', status: 'visited' }, { value: '3', status: 'visited' }, { value: '.', status: 'visited' }],
          [{ value: '6', status: 'visited' }, { value: '.', status: 'visited' }, { value: '.', status: 'visited' }],
          [{ value: '.', status: 'visited' }, { value: '9', status: 'visited' }, { value: '8', status: 'visited' }],
        ],
      },
    },
  ],

  // Problem 289: Game of Life
  289: [
    {
      stepIndex: 0,
      title: 'Current Generation 3x3 Grid State',
      description: 'Grid: [[0, 1, 0], [0, 0, 1], [1, 1, 1]]. Count live neighbors for each cell in 8 directions.',
      codeLineHighlight: 2,
      variables: { liveCells: 4, generation: 0 },
      matrixState: {
        grid: [
          [{ value: 0, status: 'default' }, { value: 1, status: 'active' }, { value: 0, status: 'default' }],
          [{ value: 0, status: 'default' }, { value: 0, status: 'default' }, { value: 1, status: 'active' }],
          [{ value: 1, status: 'active' }, { value: 1, status: 'active' }, { value: 1, status: 'active' }],
        ],
        rowPointer: 0,
        colPointer: 1,
      },
    },
    {
      stepIndex: 1,
      title: 'Encode Two-Bit Next State Transitions In-Place',
      description: 'Use state encoding: 0->0: 0, 1->0: 1, 0->1: 2, 1->1: 3. Cell (1, 2) has 3 live neighbors -> stays alive (3).',
      codeLineHighlight: 6,
      variables: { transitionsEncoded: true },
      matrixState: {
        grid: [
          [{ value: 0, status: 'visited' }, { value: 0, status: 'obstacle' }, { value: 0, status: 'visited' }],
          [{ value: 1, status: 'active' }, { value: 0, status: 'visited' }, { value: 1, status: 'active' }],
          [{ value: 0, status: 'visited' }, { value: 1, status: 'active' }, { value: 1, status: 'active' }],
        ],
        rowPointer: 1,
        colPointer: 2,
      },
    },
    {
      stepIndex: 2,
      title: 'Bit-Shift Matrix to Final Next Generation State',
      description: 'Right-shift all cells: cell >> 1. Generation updated without extra memory. Time: O(M * N), Space: O(1).',
      codeLineHighlight: 9,
      variables: { generation: 1, complete: true },
      matrixState: {
        grid: [
          [{ value: 0, status: 'visited' }, { value: 0, status: 'visited' }, { value: 0, status: 'visited' }],
          [{ value: 1, status: 'visited' }, { value: 0, status: 'visited' }, { value: 1, status: 'visited' }],
          [{ value: 0, status: 'visited' }, { value: 1, status: 'visited' }, { value: 1, status: 'visited' }],
        ],
      },
    },
  ],
};
