import { describe, it, expect, beforeEach } from 'vitest';
import {
  EXPECTED_150_PROBLEMS,
  EXPECTED_PATTERNS,
  filterProblems,
  SolutionTabController,
  VisualizerStateMachine
} from '../harness/reference-spec';

describe('Tier 3: Cross-Feature Interactions (Search, Filtering, Tab Switching)', () => {
  describe('Tier 3.1: Pattern Categorization and Filtering', () => {
    it('partitions all 150 problems cleanly across the 23 patterns with no orphan problems', () => {
      const patternProblemMap = new Map<string, typeof EXPECTED_150_PROBLEMS>();

      for (const pattern of EXPECTED_PATTERNS) {
        const matches = EXPECTED_150_PROBLEMS.filter((p) => p.pattern === pattern);
        patternProblemMap.set(pattern, matches);
        expect(matches.length).toBeGreaterThan(0);
      }

      let totalGrouped = 0;
      for (const [pattern, problems] of patternProblemMap.entries()) {
        totalGrouped += problems.length;
        for (const p of problems) {
          expect(p.pattern).toBe(pattern);
        }
      }

      expect(totalGrouped).toBe(150);
    });

    it('correctly filters problems when pattern filter is applied in filterProblems', () => {
      const twoPointerProblems = filterProblems(EXPECTED_150_PROBLEMS, '', 'All', 'Two Pointers');
      expect(twoPointerProblems.length).toBe(5);
      for (const p of twoPointerProblems) {
        expect(p.pattern).toBe('Two Pointers');
      }

      const slidingWindowProblems = filterProblems(EXPECTED_150_PROBLEMS, '', 'All', 'Sliding Window');
      expect(slidingWindowProblems.length).toBe(4);
      for (const p of slidingWindowProblems) {
        expect(p.pattern).toBe('Sliding Window');
      }
    });
  });

  describe('Tier 3.2: Global Search Engine (⌘K) Query & Filter Matching', () => {
    it('finds problems by title substring match', () => {
      const lruResults = filterProblems(EXPECTED_150_PROBLEMS, 'LRU Cache');
      expect(lruResults.length).toBe(1);
      expect(lruResults[0].id).toBe(146);
      expect(lruResults[0].title).toBe('LRU Cache');

      const subarrayResults = filterProblems(EXPECTED_150_PROBLEMS, 'Subarray');
      expect(subarrayResults.length).toBeGreaterThanOrEqual(2);
      const titles = subarrayResults.map((p) => p.title);
      expect(titles).toContain('Maximum Subarray');
      expect(titles).toContain('Minimum Size Subarray Sum');
    });

    it('finds problems by problem number query', () => {
      const id42Results = filterProblems(EXPECTED_150_PROBLEMS, '42');
      expect(id42Results.some((p) => p.id === 42)).toBe(true);
      const exactMatch = id42Results.find((p) => p.id === 42);
      expect(exactMatch?.title).toBe('Trapping Rain Water');

      const id146Results = filterProblems(EXPECTED_150_PROBLEMS, '146');
      expect(id146Results.length).toBe(1);
      expect(id146Results[0].title).toBe('LRU Cache');
    });

    it('executes case-insensitive search queries identically', () => {
      const lowerResults = filterProblems(EXPECTED_150_PROBLEMS, 'two sum');
      const upperResults = filterProblems(EXPECTED_150_PROBLEMS, 'TWO SUM');
      const mixedResults = filterProblems(EXPECTED_150_PROBLEMS, 'tWo SuM');

      expect(lowerResults.length).toBeGreaterThanOrEqual(2);
      expect(lowerResults).toEqual(upperResults);
      expect(lowerResults).toEqual(mixedResults);
    });

    it('filters problems strictly by difficulty level', () => {
      const easyProblems = filterProblems(EXPECTED_150_PROBLEMS, '', 'Easy');
      for (const p of easyProblems) {
        expect(p.difficulty).toBe('Easy');
      }

      const mediumProblems = filterProblems(EXPECTED_150_PROBLEMS, '', 'Medium');
      for (const p of mediumProblems) {
        expect(p.difficulty).toBe('Medium');
      }

      const hardProblems = filterProblems(EXPECTED_150_PROBLEMS, '', 'Hard');
      for (const p of hardProblems) {
        expect(p.difficulty).toBe('Hard');
      }

      expect(easyProblems.length + mediumProblems.length + hardProblems.length).toBe(150);
    });

    it('executes compound queries: title query + difficulty filter + pattern filter', () => {
      // Find "Hard" problem in "Array / String" pattern
      const hardArrayString = filterProblems(EXPECTED_150_PROBLEMS, '', 'Hard', 'Array / String');
      expect(hardArrayString.length).toBe(3); // Candy (#135), Trapping Rain Water (#42), Text Justification (#68)
      const ids = hardArrayString.map((p) => p.id);
      expect(ids).toContain(42);
      expect(ids).toContain(135);
      expect(ids).toContain(68);

      // Compound: search "median" with Hard difficulty
      const medianResults = filterProblems(EXPECTED_150_PROBLEMS, 'median', 'Hard');
      expect(medianResults.length).toBeGreaterThanOrEqual(1);
      const medianTitles = medianResults.map((p) => p.title);
      expect(medianTitles).toContain('Median of Two Sorted Arrays');
    });

    it('handles empty query and whitespace-only queries gracefully', () => {
      const emptyResults = filterProblems(EXPECTED_150_PROBLEMS, '');
      expect(emptyResults.length).toBe(150);

      const whitespaceResults = filterProblems(EXPECTED_150_PROBLEMS, '   \t\n  ');
      expect(whitespaceResults.length).toBe(150);
    });

    it('returns empty array when no problem matches query without throwing error', () => {
      const nonExistent = filterProblems(EXPECTED_150_PROBLEMS, 'quantum_quicksort_xyz_9999');
      expect(Array.isArray(nonExistent)).toBe(true);
      expect(nonExistent.length).toBe(0);
    });

    it('adversarial: handles queries with special regex meta-characters without crashing', () => {
      const regexChars = ['[', ']', '(', ')', '{', '}', '*', '+', '?', '^', '$', '\\', '|'];
      for (const char of regexChars) {
        expect(() => filterProblems(EXPECTED_150_PROBLEMS, `test${char}query`)).not.toThrow();
      }

      // Query with parentheses matching actual title (e.g. O(1))
      const o1Results = filterProblems(EXPECTED_150_PROBLEMS, 'O(1)');
      expect(o1Results.length).toBe(1);
      expect(o1Results[0].title).toBe('Insert Delete GetRandom O(1)');
    });
  });

  describe('Tier 3.3: Solution Tab Switching & Visualizer Decoupling', () => {
    let tabCtrl: SolutionTabController;
    let visualizer: VisualizerStateMachine;

    beforeEach(() => {
      tabCtrl = new SolutionTabController('optimal');
      visualizer = new VisualizerStateMachine(10, 0);
    });

    it('defaults activeTab to optimal', () => {
      expect(tabCtrl.activeTab).toBe('optimal');
    });

    it('allows switching to bruteForce and patternCue tabs', () => {
      tabCtrl.selectTab('bruteForce');
      expect(tabCtrl.activeTab).toBe('bruteForce');

      tabCtrl.selectTab('patternCue');
      expect(tabCtrl.activeTab).toBe('patternCue');

      tabCtrl.selectTab('optimal');
      expect(tabCtrl.activeTab).toBe('optimal');
    });

    it('preserves visualizer step index when switching tabs back and forth', () => {
      // Advance visualizer to step 4
      visualizer.seek(4);
      expect(visualizer.currentStep).toBe(4);

      // User switches to brute force tab
      tabCtrl.selectTab('bruteForce');
      expect(tabCtrl.activeTab).toBe('bruteForce');
      // Visualizer step must remain 4
      expect(visualizer.currentStep).toBe(4);

      // User switches to pattern cue tab
      tabCtrl.selectTab('patternCue');
      expect(tabCtrl.activeTab).toBe('patternCue');
      expect(visualizer.currentStep).toBe(4);

      // User steps visualizer forward while on pattern cue tab
      visualizer.next();
      expect(visualizer.currentStep).toBe(5);

      // User returns to optimal tab
      tabCtrl.selectTab('optimal');
      expect(tabCtrl.activeTab).toBe('optimal');
      expect(visualizer.currentStep).toBe(5);
    });
  });

  describe('Tier 3.4: Cross-Pattern Difficulty Balance Invariants', () => {
    it('verifies difficulty distribution spans Easy, Medium, and Hard across the 150 problems', () => {
      const easyCount = EXPECTED_150_PROBLEMS.filter((p) => p.difficulty === 'Easy').length;
      const mediumCount = EXPECTED_150_PROBLEMS.filter((p) => p.difficulty === 'Medium').length;
      const hardCount = EXPECTED_150_PROBLEMS.filter((p) => p.difficulty === 'Hard').length;

      // Exact LeetCode Top 150 distribution from PROJECT.md
      expect(easyCount).toBe(40);
      expect(mediumCount).toBe(92);
      expect(hardCount).toBe(18);
      expect(easyCount + mediumCount + hardCount).toBe(150);
    });
  });
});
