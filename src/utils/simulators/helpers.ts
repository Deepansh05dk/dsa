/**
 * Robust parsing and sanitization utilities for user-supplied visualizer inputs.
 */

export function parseNumberArray(input: any, fallback: number[] = [2, 7, 11, 15], maxLen = 20): number[] {
  if (Array.isArray(input)) {
    const nums = input.map(Number).filter((n) => !isNaN(n));
    return nums.length > 0 ? nums.slice(0, maxLen) : fallback;
  }
  if (typeof input === 'string') {
    // If JSON array
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        const nums = parsed.map(Number).filter((n) => !isNaN(n));
        if (nums.length > 0) return nums.slice(0, maxLen);
      }
    } catch {
      // Fall through to regex cleaning
    }
    const cleaned = input.replace(/[\[\]]/g, '').trim();
    if (!cleaned) return fallback;
    const parts = cleaned.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
    const nums = parts.map(Number).filter((n) => !isNaN(n));
    return nums.length > 0 ? nums.slice(0, maxLen) : fallback;
  }
  return fallback;
}

export function parseSingleNumber(input: any, fallback = 0): number {
  if (typeof input === 'number' && !isNaN(input)) return input;
  const parsed = Number(input);
  return isNaN(parsed) ? fallback : parsed;
}

export function parseStringInput(input: any, fallback = 'racecar', maxLen = 40): string {
  if (typeof input === 'string') {
    const cleaned = input.replace(/^["']|["']$/g, '').trim();
    return cleaned ? cleaned.slice(0, maxLen) : fallback;
  }
  return fallback;
}

/**
 * Parses 2D matrix / grid from string or array.
 * Supports: '[[1,2],[3,4]]' or '[["1","0"],["0","1"]]'
 */
export function parse2DArray(
  input: any,
  fallback: Array<Array<string | number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  maxRows = 6,
  maxCols = 6
): Array<Array<string | number>> {
  if (Array.isArray(input) && input.length > 0 && Array.isArray(input[0])) {
    return input.slice(0, maxRows).map((row) => row.slice(0, maxCols));
  }
  if (typeof input === 'string') {
    try {
      const jsonStr = input.replace(/'/g, '"').trim();
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
        return parsed.slice(0, maxRows).map((row) => row.slice(0, maxCols));
      }
    } catch {
      // Regex parsing for bracketed rows: [1,2], [3,4]
      const rowMatches = input.match(/\[[^\[\]]+\]/g);
      if (rowMatches && rowMatches.length > 0) {
        const rows = rowMatches.map((r) => {
          const inner = r.replace(/[\[\]]/g, '').trim();
          return inner.split(/[\s,]+/).map((s) => {
            const trimmed = s.replace(/^["']|["']$/g, '').trim();
            const num = Number(trimmed);
            return isNaN(num) ? trimmed : num;
          });
        });
        if (rows.length > 0 && rows[0].length > 0) {
          return rows.slice(0, maxRows).map((row) => row.slice(0, maxCols));
        }
      }
    }
  }
  return fallback;
}

/**
 * Parses interval pairs e.g. '[[1,3],[2,6]]' or '[[5,10],[11,15]]'
 */
export function parseIntervalPairs(
  input: any,
  fallback: Array<[number, number]> = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]
): Array<[number, number]> {
  const parsed2D = parse2DArray(input, fallback as any, 10, 2);
  const pairs: Array<[number, number]> = [];

  for (const row of parsed2D) {
    if (row.length >= 2) {
      const a = Number(row[0]);
      const b = Number(row[1]);
      if (!isNaN(a) && !isNaN(b)) {
        pairs.push([a, b]);
      }
    }
  }

  return pairs.length > 0 ? pairs : fallback;
}

/**
 * Parses level-order tree nodes from array or string:
 * '[3, 9, 20, null, null, 15, 7]'
 */
export function parseTreeLevelOrder(
  input: any,
  fallback: Array<string | number | null> = [3, 9, 20, null, null, 15, 7]
): Array<string | number | null> {
  if (Array.isArray(input)) {
    return input.slice(0, 15);
  }
  if (typeof input === 'string') {
    try {
      const jsonStr = input.replace(/'/g, '"').trim();
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, 15);
      }
    } catch {
      // Regex parsing
    }
    const cleaned = input.replace(/[\[\]]/g, '').trim();
    if (!cleaned) return fallback;
    const parts = cleaned.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
    const nodes = parts.map((s) => {
      const v = s.replace(/^["']|["']$/g, '').trim();
      if (v === 'null' || v === '') return null;
      const num = Number(v);
      return isNaN(num) ? v : num;
    });
    return nodes.length > 0 ? nodes.slice(0, 15) : fallback;
  }
  return fallback;
}
