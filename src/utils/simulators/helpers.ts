/**
 * Robust parsing and sanitization utilities for user-supplied visualizer inputs.
 */

export function parseNumberArray(input: any, fallback: number[] = [2, 7, 11, 15], maxLen = 20): number[] {
  if (Array.isArray(input)) {
    const nums = input.map(Number).filter((n) => !isNaN(n));
    return nums.length > 0 ? nums.slice(0, maxLen) : fallback;
  }
  if (typeof input === 'string') {
    // Strip brackets and split by comma or spaces
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
