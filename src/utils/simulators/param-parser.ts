import type { InputFieldDef, InputPreset } from './types';
import type { LeetCodeProblem } from '../../types/problem';

/**
 * Parses an example input string like:
 * 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3'
 * or 's = "anagram", t = "nagaram"'
 * or 'grid = [["1","1","0"],["1","1","0"]]'
 * or 'root = [3,9,20,null,null,15,7]'
 * into a structured dictionary of parameter names and values.
 */
export function parseExampleInputString(inputStr: string): Record<string, any> {
  const result: Record<string, any> = {};
  if (!inputStr || typeof inputStr !== 'string') return result;

  // Normalize quotes and trim
  const trimmed = inputStr.trim();

  // Match patterns like: key = value, where value can be [...], "...", or primitive
  // Split carefully by top-level commas (avoid commas inside brackets [ ] or quotes)
  const tokens: string[] = [];
  let current = '';
  let bracketDepth = 0;
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if ((char === '"' || char === "'") && trimmed[i - 1] !== '\\') {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (quoteChar === char) {
        inQuotes = false;
      }
    } else if (!inQuotes) {
      if (char === '[' || char === '{' || char === '(') bracketDepth++;
      else if (char === ']' || char === '}' || char === ')') bracketDepth--;
      else if (char === ',' && bracketDepth === 0) {
        tokens.push(current.trim());
        current = '';
        continue;
      }
    }
    current += char;
  }
  if (current.trim()) {
    tokens.push(current.trim());
  }

  for (const token of tokens) {
    const eqIdx = token.indexOf('=');
    if (eqIdx !== -1) {
      const key = token.slice(0, eqIdx).trim();
      const rawVal = token.slice(eqIdx + 1).trim();
      result[key] = cleanValue(rawVal);
    } else if (tokens.length === 1) {
      // If no '=' was found, e.g. raw array "[1, 2, 3]"
      result['input'] = cleanValue(token);
    }
  }

  return result;
}

function cleanValue(val: string): any {
  const v = val.trim();
  // Strip surrounding quotes if string
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  // If JSON array or object
  if ((v.startsWith('[') && v.endsWith(']')) || (v.startsWith('{') && v.endsWith('}'))) {
    try {
      // Replace single quotes with double quotes for JSON parsing
      const jsonStr = v.replace(/'/g, '"');
      return JSON.parse(jsonStr);
    } catch {
      return v;
    }
  }
  // If boolean
  if (v === 'true') return true;
  if (v === 'false') return false;
  // If number
  const num = Number(v);
  if (!isNaN(num) && v !== '') return num;

  return v;
}

/**
 * Deduce input field definitions (key, label, type, placeholder, defaultValue)
 * from problem's examples and category.
 */
export function extractFieldsAndPresetsFromProblem(problem: LeetCodeProblem): {
  fields: InputFieldDef[];
  presets: InputPreset[];
} {
  const examples = problem.examples || [];
  const parsedExamples = examples.map((ex, idx) => ({
    label: `Example ${idx + 1}`,
    values: parseExampleInputString(ex.input),
  }));

  const primaryValues = parsedExamples[0]?.values || {};
  const keys = Object.keys(primaryValues);

  const pattern = (problem.pattern || '').toLowerCase();
  const category = (problem.category || '').toLowerCase();

  // If no keys could be extracted, synthesize sensible defaults based on pattern
  if (keys.length === 0) {
    return getSynthesizedPatternFields(problem);
  }

  const fields: InputFieldDef[] = keys.map((key) => {
    const sampleVal = primaryValues[key];
    const isMatrix = Array.isArray(sampleVal) && sampleVal.length > 0 && Array.isArray(sampleVal[0]);
    const isTree = key.toLowerCase() === 'root' || pattern.includes('tree');
    const isList = key.toLowerCase() === 'head' || key.toLowerCase().startsWith('l') || pattern.includes('linked-list');

    let type: InputFieldDef['type'] = 'string';
    let placeholder = 'Enter value';
    let helpText = '';

    if (isMatrix) {
      type = 'array';
      placeholder = 'e.g. [[1,2,3],[4,5,6]]';
      helpText = '2D Grid / Matrix rows';
    } else if (isTree) {
      type = 'array';
      placeholder = 'e.g. [3, 9, 20, null, null, 15, 7]';
      helpText = 'Level-order binary tree nodes';
    } else if (isList) {
      type = 'array';
      placeholder = 'e.g. 1, 2, 3, 4, 5';
      helpText = 'Linked list node sequence';
    } else if (Array.isArray(sampleVal)) {
      type = 'array';
      placeholder = 'e.g. 1, 2, 3, 4, 5';
      helpText = 'Comma-separated values';
    } else if (typeof sampleVal === 'number') {
      type = 'number';
      placeholder = 'e.g. 0';
      helpText = 'Integer value';
    } else {
      type = 'string';
      placeholder = 'e.g. text string';
      helpText = 'String input';
    }

    return {
      key,
      label: formatFieldLabel(key, type),
      type,
      placeholder,
      defaultValue: sampleVal,
      helpText,
    };
  });

  // Build presets
  const presets: InputPreset[] = parsedExamples.map((ex) => ({
    label: ex.label,
    values: ex.values,
  }));

  return { fields, presets };
}

function formatFieldLabel(key: string, type: string): string {
  if (key === 'nums' || key === 'nums1' || key === 'nums2') return `${key} (Array)`;
  if (key === 'target') return 'target (Target Value)';
  if (key === 'k') return 'k (Size / Count)';
  if (key === 'n') return 'n (Count / Number)';
  if (key === 's') return 's (Input String)';
  if (key === 't') return 't (Second String)';
  if (key === 'grid' || key === 'matrix') return `${key} (2D Matrix)`;
  if (key === 'root') return 'root (Binary Tree)';
  if (key === 'head') return 'head (Linked List)';
  if (key === 'intervals') return 'intervals (2D Pairs)';
  return `${key} (${type})`;
}

function getSynthesizedPatternFields(problem: LeetCodeProblem): {
  fields: InputFieldDef[];
  presets: InputPreset[];
} {
  const p = (problem.pattern || '').toLowerCase();

  if (p.includes('tree')) {
    return {
      fields: [
        {
          key: 'root',
          label: 'root (Binary Tree)',
          type: 'array',
          placeholder: 'e.g. 3, 9, 20, null, null, 15, 7',
          defaultValue: [3, 9, 20, null, null, 15, 7],
          helpText: 'Level-order node values',
        },
      ],
      presets: [
        { label: 'Example 1', values: { root: [3, 9, 20, null, null, 15, 7] } },
        { label: 'Symmetric Tree', values: { root: [1, 2, 2, 3, 4, 4, 3] } },
      ],
    };
  }

  if (p.includes('matrix') || p.includes('graph')) {
    return {
      fields: [
        {
          key: 'matrix',
          label: 'matrix (2D Grid)',
          type: 'array',
          placeholder: 'e.g. [[1,2,3],[4,5,6],[7,8,9]]',
          defaultValue: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          helpText: '2D matrix rows',
        },
      ],
      presets: [
        { label: '3x3 Matrix', values: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
        { label: 'Binary Island Grid', values: { matrix: [['1', '1', '0'], ['1', '0', '0'], ['0', '0', '1']] } },
      ],
    };
  }

  if (p.includes('linked-list')) {
    return {
      fields: [
        {
          key: 'head',
          label: 'head (Linked List)',
          type: 'array',
          placeholder: 'e.g. 1, 2, 3, 4, 5',
          defaultValue: [1, 2, 3, 4, 5],
          helpText: 'Node values from head to tail',
        },
      ],
      presets: [
        { label: 'Example 1 [1..5]', values: { head: [1, 2, 3, 4, 5] } },
        { label: 'Short List [1, 2]', values: { head: [1, 2] } },
      ],
    };
  }

  // Default array fallback
  return {
    fields: [
      {
        key: 'nums',
        label: 'nums (Array)',
        type: 'array',
        placeholder: 'e.g. 1, 2, 3, 4, 5',
        defaultValue: [1, 2, 3, 4, 5],
        helpText: 'Input numbers',
      },
    ],
    presets: [
      { label: 'Example 1', values: { nums: [1, 2, 3, 4, 5] } },
    ],
  };
}
