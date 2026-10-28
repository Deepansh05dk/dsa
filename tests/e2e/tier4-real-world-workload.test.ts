import { describe, it, expect } from 'vitest';
import {
  EXPECTED_150_PROBLEMS,
  EXPECTED_PATTERNS,
  filterProblems,
  VisualizerStateMachine,
  SolutionTabController
} from '../harness/reference-spec';

describe('Tier 4: Real-World Application Scenarios (Interview Revision Workflows)', () => {
  describe('Tier 4.1: Fast Core Pattern Sprint Walkthrough', () => {
    it('simulates candidate revising 6 high-yield questions across core patterns', () => {
      const coreSprintProblemIds = [
        11,  // Container With Most Water (Two Pointers)
        3,   // Longest Substring Without Repeating Characters (Sliding Window)
        20,  // Valid Parentheses (Stack)
        141, // Linked List Cycle (Linked List)
        33,  // Search in Rotated Sorted Array (Binary Search)
        70   // Climbing Stairs (1D DP)
      ];

      for (const id of coreSprintProblemIds) {
        const problem = EXPECTED_150_PROBLEMS.find((p) => p.id === id);
        expect(problem).toBeDefined();
        expect(problem!.id).toBe(id);
        expect(problem!.title.length).toBeGreaterThan(0);

        // Candidate checks the solution tabs
        const tabCtrl = new SolutionTabController('optimal');
        expect(tabCtrl.activeTab).toBe('optimal');

        // Candidate verifies brute-force baseline
        tabCtrl.selectTab('bruteForce');
        expect(tabCtrl.activeTab).toBe('bruteForce');

        // Candidate switches back to recommended optimal solution
        tabCtrl.selectTab('optimal');
        expect(tabCtrl.activeTab).toBe('optimal');

        // Candidate steps through the visualizer for the problem
        const TOTAL_DEMO_STEPS = 6;
        const visualizer = new VisualizerStateMachine(TOTAL_DEMO_STEPS, 0);

        // Step forward twice
        visualizer.next();
        visualizer.next();
        expect(visualizer.currentStep).toBe(2);

        // Reverse one step to re-inspect state transition
        visualizer.reverse();
        expect(visualizer.currentStep).toBe(1);

        // Step to completion
        for (let s = visualizer.currentStep; s < TOTAL_DEMO_STEPS - 1; s++) {
          visualizer.next();
        }
        expect(visualizer.currentStep).toBe(TOTAL_DEMO_STEPS - 1);

        // Terminal clamp
        visualizer.next();
        expect(visualizer.currentStep).toBe(TOTAL_DEMO_STEPS - 1);
      }
    });
  });

  describe('Tier 4.2: Hard Interview Problem Deep Dive Walkthrough', () => {
    it('simulates thorough revision session on 4 classic Hard interview problems', () => {
      const hardProblemsToStudy = [
        { id: 42, title: 'Trapping Rain Water', pattern: 'Array / String' },
        { id: 224, title: 'Basic Calculator', pattern: 'Stack' },
        { id: 124, title: 'Binary Tree Maximum Path Sum', pattern: 'Binary Tree General' },
        { id: 127, title: 'Word Ladder', pattern: 'Graph BFS' }
      ];

      for (const item of hardProblemsToStudy) {
        // Candidate searches for the hard problem via ⌘K GlobalSearch
        const searchMatches = filterProblems(EXPECTED_150_PROBLEMS, item.title, 'Hard');
        expect(searchMatches.length).toBeGreaterThanOrEqual(1);

        const problem = searchMatches.find((p) => p.id === item.id);
        expect(problem).toBeDefined();
        expect(problem!.difficulty).toBe('Hard');
        expect(problem!.pattern).toBe(item.pattern);

        // Candidate exercises visualizer playback simulation:
        // totalSteps = 8, start playing, pause at step 4, seek to terminal step 7, reset
        const visualizer = new VisualizerStateMachine(8, 0);
        visualizer.togglePlay();
        expect(visualizer.isPlaying).toBe(true);

        // Simulate stepping while playing
        visualizer.next();
        visualizer.next();
        visualizer.next();
        visualizer.next();
        expect(visualizer.currentStep).toBe(4);

        // Candidate pauses to inspect complex intermediate state
        visualizer.togglePlay();
        expect(visualizer.isPlaying).toBe(false);

        // Candidate scrubs directly to the final answer step
        visualizer.seek(7);
        expect(visualizer.currentStep).toBe(7);

        // Candidate resets back to step 0
        visualizer.reset();
        expect(visualizer.currentStep).toBe(0);
        expect(visualizer.isPlaying).toBe(false);
      }
    });
  });

  describe('Tier 4.3: Visualizer Control Workout Across Data Structures', () => {
    it('simulates scrub and stepping across Array, Tree, Matrix, and DP state machines', () => {
      const dataStructureTestCases = [
        { type: 'Array Two Pointers', steps: 12 },
        { type: 'Binary Tree DFS', steps: 9 },
        { type: '2D Grid BFS', steps: 15 },
        { type: '2D DP Matrix', steps: 20 },
        { type: 'Stack Parentheses', steps: 8 }
      ];

      for (const tc of dataStructureTestCases) {
        const vm = new VisualizerStateMachine(tc.steps, 0);

        // Initial invariant
        expect(vm.currentStep).toBe(0);

        // Forward stepping
        vm.next();
        vm.next();
        vm.next();
        expect(vm.currentStep).toBe(3);

        // Scrub directly to 50% midpoint
        const midPoint = Math.floor(tc.steps / 2);
        vm.seek(midPoint);
        expect(vm.currentStep).toBe(midPoint);

        // Backward stepping
        vm.reverse();
        expect(vm.currentStep).toBe(midPoint - 1);

        // Speed adjustment
        vm.setSpeed(1.5);
        expect(vm.playbackSpeed).toBe(1.5);

        // Scrub to terminal step
        vm.seek(tc.steps - 1);
        expect(vm.currentStep).toBe(tc.steps - 1);

        // Reset
        vm.reset();
        expect(vm.currentStep).toBe(0);
      }
    });
  });

  describe('Tier 4.4: 23-Pattern Comprehensive Survey Walkthrough', () => {
    it('verifies candidate can select and walk through at least 1 problem from each of the 23 patterns', () => {
      const surveyedPatterns = new Set<string>();

      for (const patternName of EXPECTED_PATTERNS) {
        // 1. Candidate filters problems by the pattern
        const patternProblems = EXPECTED_150_PROBLEMS.filter((p) => p.pattern === patternName);
        expect(patternProblems.length).toBeGreaterThan(0);

        // 2. Candidate selects the first problem in the pattern
        const selectedProblem = patternProblems[0];
        expect(selectedProblem.pattern).toBe(patternName);
        expect(selectedProblem.id).toBeGreaterThan(0);
        expect(selectedProblem.slug.length).toBeGreaterThan(0);

        // 3. Candidate verifies tab switching
        const tabCtrl = new SolutionTabController('optimal');
        expect(tabCtrl.activeTab).toBe('optimal');
        tabCtrl.selectTab('bruteForce');
        expect(tabCtrl.activeTab).toBe('bruteForce');
        tabCtrl.selectTab('optimal');
        expect(tabCtrl.activeTab).toBe('optimal');

        // 4. Candidate interacts with the problem visualizer
        const visualizer = new VisualizerStateMachine(5, 0);
        visualizer.next();
        expect(visualizer.currentStep).toBe(1);
        visualizer.reverse();
        expect(visualizer.currentStep).toBe(0);
        visualizer.seek(4);
        expect(visualizer.currentStep).toBe(4);
        visualizer.reset();
        expect(visualizer.currentStep).toBe(0);

        surveyedPatterns.add(patternName);
      }

      // Assert all 23 patterns were successfully exercised end-to-end
      expect(surveyedPatterns.size).toBe(23);
    });
  });
});
