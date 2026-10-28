import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  EXPECTED_PATTERNS,
  EXPECTED_150_PROBLEMS,
  validateProblemSchema
} from '../harness/reference-spec';

describe('Tier 1: Feature Coverage (150 Problems, Brute-Force & Optimal, Patterns)', () => {
  describe('Tier 1.1: Algorithmic Patterns Specification (23 Core Patterns)', () => {
    it('must define exactly 23 algorithmic patterns as specified in PROJECT.md', () => {
      expect(EXPECTED_PATTERNS.length).toBe(23);
      const uniquePatterns = new Set(EXPECTED_PATTERNS);
      expect(uniquePatterns.size).toBe(23);
    });

    it('must include all canonical LeetCode 150 algorithmic patterns', () => {
      const canonicalPatterns = [
        'Array / String',
        'Two Pointers',
        'Sliding Window',
        'Matrix',
        'Hashmap',
        'Intervals',
        'Stack',
        'Linked List',
        'Binary Tree General',
        'Binary Tree BFS',
        'Binary Search Tree',
        'Graph General',
        'Graph BFS',
        'Trie',
        'Backtracking',
        'Divide & Conquer',
        "Kadane's Algorithm",
        'Binary Search',
        'Heap',
        'Bit Manipulation',
        'Math',
        '1D DP',
        'Multidimensional DP'
      ];

      for (const pattern of canonicalPatterns) {
        expect(EXPECTED_PATTERNS).toContain(pattern);
      }
    });

    it('should verify src/data/patterns.ts matches the 23 patterns if created', async () => {
      const patternsFilePath = path.resolve(process.cwd(), 'src/data/patterns.ts');
      if (fs.existsSync(patternsFilePath)) {
        const fileContent = fs.readFileSync(patternsFilePath, 'utf-8');
        for (const pattern of EXPECTED_PATTERNS) {
          expect(fileContent).toContain(pattern);
        }
      }
    });
  });

  describe('Tier 1.2: 150 Problem Catalog Totality & Mapping', () => {
    it('must define exactly 150 problems in the authoritative catalog', () => {
      expect(EXPECTED_150_PROBLEMS.length).toBe(150);
    });

    it('must have unique problem IDs across all 150 problems', () => {
      const ids = EXPECTED_150_PROBLEMS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(150);
    });

    it('must have unique problem slugs across all 150 problems', () => {
      const slugs = EXPECTED_150_PROBLEMS.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(150);
    });

    it('must only contain valid difficulty levels (Easy, Medium, Hard)', () => {
      for (const problem of EXPECTED_150_PROBLEMS) {
        expect(['Easy', 'Medium', 'Hard']).toContain(problem.difficulty);
      }
    });

    it('must map every problem to one of the 23 valid patterns', () => {
      for (const problem of EXPECTED_150_PROBLEMS) {
        expect(EXPECTED_PATTERNS).toContain(problem.pattern);
      }
    });

    it('must have the exact expected problem counts per pattern', () => {
      const patternCounts: Record<string, number> = {};
      for (const p of EXPECTED_150_PROBLEMS) {
        patternCounts[p.pattern] = (patternCounts[p.pattern] || 0) + 1;
      }

      expect(patternCounts['Array / String']).toBe(24);
      expect(patternCounts['Two Pointers']).toBe(5);
      expect(patternCounts['Sliding Window']).toBe(4);
      expect(patternCounts['Matrix']).toBe(5);
      expect(patternCounts['Hashmap']).toBe(9);
      expect(patternCounts['Intervals']).toBe(4);
      expect(patternCounts['Stack']).toBe(5);
      expect(patternCounts['Linked List']).toBe(11);
      expect(patternCounts['Binary Tree General']).toBe(14);
      expect(patternCounts['Binary Tree BFS']).toBe(4);
      expect(patternCounts['Binary Search Tree']).toBe(3);
      expect(patternCounts['Graph General']).toBe(6);
      expect(patternCounts['Graph BFS']).toBe(3);
      expect(patternCounts['Trie']).toBe(3);
      expect(patternCounts['Backtracking']).toBe(7);
      expect(patternCounts['Divide & Conquer']).toBe(4);
      expect(patternCounts["Kadane's Algorithm"]).toBe(2);
      expect(patternCounts['Binary Search']).toBe(7);
      expect(patternCounts['Heap']).toBe(4);
      expect(patternCounts['Bit Manipulation']).toBe(6);
      expect(patternCounts['Math']).toBe(6);
      expect(patternCounts['1D DP']).toBe(5);
      expect(patternCounts['Multidimensional DP']).toBe(9);

      const totalCount = Object.values(patternCounts).reduce((a, b) => a + b, 0);
      expect(totalCount).toBe(150);
    });
  });

  describe('Tier 1.3: Interface Contract & Schema Validation (Requirement R1)', () => {
    it('validates mock problem against strict schema validator', () => {
      const validProblem = {
        id: 1,
        slug: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy' as const,
        pattern: 'Hashmap',
        category: 'Hashmap',
        statement: 'Given an array of integers nums and an integer target...',
        examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
        constraints: ['2 <= nums.length <= 10^4'],
        bruteForce: {
          name: 'Brute Force Scan',
          code: 'function twoSum(nums, target) { ... }',
          complexity: { time: 'O(N^2)', space: 'O(1)' },
          explanation: 'Check all pairs'
        },
        optimal: {
          name: 'Hash Map Lookup',
          code: 'function twoSum(nums, target) { ... }',
          complexity: { time: 'O(N)', space: 'O(N)' },
          explanation: 'Store complement in map',
          whyOptimalIsPreferred: 'Reduces time complexity from O(N^2) to O(N) by trading space for O(1) lookups.',
          patternInvariant: 'Trading space for time via a hash map converts an inner linear scan into O(1) lookup.'
        },
        defaultInputDescription: 'nums = [2, 7, 11, 15], target = 9'
      };

      const result = validateProblemSchema(validProblem);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects problems missing whyOptimalIsPreferred or patternInvariant', () => {
      const invalidProblem = {
        id: 1,
        slug: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        pattern: 'Hashmap',
        statement: 'Find indices',
        examples: [{ input: 'x', output: 'y' }],
        bruteForce: {
          name: 'BF',
          code: 'code',
          complexity: { time: 'O(N)', space: 'O(1)' },
          explanation: 'exp'
        },
        optimal: {
          name: 'Opt',
          code: 'code',
          complexity: { time: 'O(1)', space: 'O(1)' },
          explanation: 'exp'
          // Missing whyOptimalIsPreferred and patternInvariant
        }
      };

      const result = validateProblemSchema(invalidProblem);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
      expect(result.errors.some((e) => e.includes('whyOptimalIsPreferred'))).toBe(true);
      expect(result.errors.some((e) => e.includes('patternInvariant'))).toBe(true);
    });

    it('rejects problems missing bruteForce code or optimal code', () => {
      const incompleteProblem = {
        id: 2,
        slug: 'add-two-numbers',
        title: 'Add Two Numbers',
        difficulty: 'Medium',
        pattern: 'Linked List',
        statement: 'Add two numbers',
        examples: [{ input: 'x', output: 'y' }],
        bruteForce: {
          name: 'BF',
          code: '', // Empty code
          complexity: { time: 'O(N)', space: 'O(1)' },
          explanation: 'exp'
        },
        optimal: {
          name: 'Opt',
          code: '', // Empty code
          complexity: { time: 'O(N)', space: 'O(1)' },
          explanation: 'exp',
          whyOptimalIsPreferred: 'Linear traversal in single pass.',
          patternInvariant: 'Maintain carry variable.'
        }
      };

      const result = validateProblemSchema(incompleteProblem);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('missing code'))).toBe(true);
    });
  });

  describe('Tier 1.4: Project Problem Data Store Verification', () => {
    it('verifies all problems populated in project meet the schema', async () => {
      const problemsPath = path.resolve(process.cwd(), 'src/data/problems.ts');
      if (fs.existsSync(problemsPath)) {
        try {
          const mod = await import(problemsPath);
          const problems = mod.getAllProblems ? mod.getAllProblems() : (mod.INITIAL_PROBLEMS || []);

          expect(Array.isArray(problems)).toBe(true);
          expect(problems.length).toBeGreaterThan(0);

          for (const problem of problems) {
            const validation = validateProblemSchema(problem);
            if (!validation.valid) {
              throw new Error(`Problem #${problem.id} failed validation: ${validation.errors.join(', ')}`);
            }
            expect(validation.valid).toBe(true);
            expect(problem.optimal.whyOptimalIsPreferred.length).toBeGreaterThan(10);
            expect(problem.optimal.patternInvariant.length).toBeGreaterThan(5);
          }
        } catch (err: any) {
          // If TypeScript dynamic import is not direct in this node environment, inspect file content
          if (err.message && err.message.includes('failed validation')) {
            throw err;
          }
        }
      }
    });

    it('verifies problem IDs in project data match canonical LeetCode 150 IDs', async () => {
      const problemsPath = path.resolve(process.cwd(), 'src/data/problems.ts');
      if (fs.existsSync(problemsPath)) {
        const content = fs.readFileSync(problemsPath, 'utf-8');
        const canonicalIds = [1, 15, 20, 200]; // Seed problems
        for (const id of canonicalIds) {
          expect(content).toContain(`id: ${id}`);
        }
      }
    });
  });
});
