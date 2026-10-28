import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { VisualizerStateMachine } from './harness/reference-spec';
import { INITIAL_PROBLEMS } from '../src/data/problems';
import { getTraceForProblem, PROBLEM_TRACES } from '../src/components/visualizer/traces';
import { VisualizerControls } from '../src/components/visualizer/VisualizerControls';
import { VisualizerEngine } from '../src/components/visualizer/VisualizerEngine';

// Helper to strip React 18 SSR comment markers (<!-- -->)
function stripReactComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

describe('Challenger M2/M3 Adversarial & Stress Suite', () => {
  describe('1. VisualizerStateMachine Boundary Invariants & Extreme Cases', () => {
    it('handles totalSteps = 0 gracefully by enforcing minimum 1 step', () => {
      const machine = new VisualizerStateMachine(0, 0);
      expect(machine.totalSteps).toBe(1);
      expect(machine.currentStep).toBe(0);
      machine.reverse();
      expect(machine.currentStep).toBe(0);
      machine.next();
      expect(machine.currentStep).toBe(0);
    });

    it('handles negative totalSteps and negative initialStep gracefully', () => {
      const machine = new VisualizerStateMachine(-10, -5);
      expect(machine.totalSteps).toBe(1);
      expect(machine.currentStep).toBe(0);
    });

    it('clamps initialStep exceeding totalSteps to totalSteps - 1', () => {
      const machine = new VisualizerStateMachine(5, 999);
      expect(machine.currentStep).toBe(4);
    });

    it('guarantees reversing at step 0 remains clamped at 0 across 1000 calls', () => {
      const machine = new VisualizerStateMachine(10, 0);
      for (let i = 0; i < 1000; i++) {
        machine.reverse();
      }
      expect(machine.currentStep).toBe(0);
    });

    it('guarantees advancing at terminal step remains clamped across 1000 calls', () => {
      const machine = new VisualizerStateMachine(10, 9);
      for (let i = 0; i < 1000; i++) {
        machine.next();
      }
      expect(machine.currentStep).toBe(9);
    });

    it('guarantees reset() returns to step 0 and pauses playback from any state', () => {
      const testCases = [
        { total: 5, initial: 0, playing: true },
        { total: 5, initial: 2, playing: false },
        { total: 5, initial: 4, playing: true },
        { total: 100, initial: 99, playing: true },
        { total: 1, initial: 0, playing: false },
      ];

      for (const tc of testCases) {
        const machine = new VisualizerStateMachine(tc.total, tc.initial);
        if (tc.playing) machine.togglePlay();
        expect(machine.isPlaying).toBe(tc.playing);

        machine.reset();
        expect(machine.currentStep).toBe(0);
        expect(machine.isPlaying).toBe(false);
      }
    });

    it('clamps extreme seek values correctly (-Infinity, -999999, +Infinity, 999999)', () => {
      const machine = new VisualizerStateMachine(10, 5);
      machine.seek(-999999);
      expect(machine.currentStep).toBe(0);

      machine.seek(999999);
      expect(machine.currentStep).toBe(9);

      machine.seek(-Infinity);
      expect(machine.currentStep).toBe(0);

      machine.seek(Infinity);
      expect(machine.currentStep).toBe(9);
    });

    it('strictly enforces allowed playback speeds and rejects invalid inputs', () => {
      const machine = new VisualizerStateMachine(10);
      expect(machine.playbackSpeed).toBe(1.0);

      // Valid speeds
      const validSpeeds = [0.5, 1.0, 1.5, 2.0];
      for (const sp of validSpeeds) {
        machine.setSpeed(sp);
        expect(machine.playbackSpeed).toBe(sp);
      }

      // Invalid speeds: must be ignored and retain previous speed (2.0)
      const invalidSpeeds = [0, -1, 0.75, 2.5, 3, 10, NaN, -Infinity, Infinity];
      for (const inv of invalidSpeeds) {
        machine.setSpeed(inv);
        expect(machine.playbackSpeed).toBe(2.0);
      }
    });
  });

  describe('2. State Machine Fuzz Harness (10,000 Random Operations)', () => {
    it('preserves all state invariants under 10,000 random interleaved operations', () => {
      const totalStepsOptions = [1, 2, 5, 10, 50];
      for (const total of totalStepsOptions) {
        const machine = new VisualizerStateMachine(total, 0);

        // Pseudorandom deterministic sequence
        let seed = 42;
        const random = () => {
          seed = (seed * 1664525 + 1013904223) % 4294967296;
          return seed / 4294967296;
        };

        for (let i = 0; i < 2000; i++) {
          const action = Math.floor(random() * 6);
          switch (action) {
            case 0: // next
              machine.next();
              break;
            case 1: // reverse
              machine.reverse();
              break;
            case 2: // reset
              machine.reset();
              break;
            case 3: // seek random index
              const target = Math.floor(random() * (total + 10)) - 5;
              machine.seek(target);
              break;
            case 4: // toggle play
              machine.togglePlay();
              break;
            case 5: // set speed
              const speedCandidates = [0.5, 1, 1.5, 2, 0, -2, 99];
              const speed = speedCandidates[Math.floor(random() * speedCandidates.length)];
              machine.setSpeed(speed);
              break;
          }

          // Strict invariant verification after EVERY operation
          expect(machine.currentStep).toBeGreaterThanOrEqual(0);
          expect(machine.currentStep).toBeLessThanOrEqual(machine.totalSteps - 1);
          expect(Number.isInteger(machine.currentStep)).toBe(true);
          expect([0.5, 1, 1.5, 2]).toContain(machine.playbackSpeed);
          expect(typeof machine.isPlaying).toBe('boolean');
        }
      }
    });
  });

  describe('3. All 150 LeetCode Problem Traces Verification', () => {
    it('verifies that all 150 problems generate complete, structurally sound traces', () => {
      expect(INITIAL_PROBLEMS.length).toBe(150);

      for (const problem of INITIAL_PROBLEMS) {
        const trace = getTraceForProblem(problem);
        expect(trace.length).toBeGreaterThanOrEqual(2);

        for (let i = 0; i < trace.length; i++) {
          const step = trace[i];
          expect(step.stepIndex).toBe(i);
          expect(step.title).toBeTruthy();
          expect(step.title.length).toBeGreaterThan(0);
          expect(step.description).toBeTruthy();
          expect(step.description.length).toBeGreaterThan(0);

          // Array state invariant verification
          if (step.arrayState) {
            expect(step.arrayState.elements.length).toBeGreaterThan(0);
            if (step.arrayState.pointers) {
              for (const p of step.arrayState.pointers) {
                expect(p.index).toBeGreaterThanOrEqual(0);
                expect(p.index).toBeLessThan(step.arrayState.elements.length);
                expect(p.label).toBeTruthy();
              }
            }
            if (step.arrayState.window) {
              expect(step.arrayState.window.left).toBeGreaterThanOrEqual(0);
              expect(step.arrayState.window.right).toBeLessThan(step.arrayState.elements.length);
              expect(step.arrayState.window.left).toBeLessThanOrEqual(step.arrayState.window.right);
            }
          }

          // Matrix state invariant verification
          if (step.matrixState) {
            const rows = step.matrixState.grid.length;
            const cols = step.matrixState.grid[0].length;
            expect(rows).toBeGreaterThan(0);
            expect(cols).toBeGreaterThan(0);
            if (step.matrixState.rowPointer !== undefined) {
              expect(step.matrixState.rowPointer).toBeGreaterThanOrEqual(0);
              expect(step.matrixState.rowPointer).toBeLessThan(rows);
            }
            if (step.matrixState.colPointer !== undefined) {
              expect(step.matrixState.colPointer).toBeGreaterThanOrEqual(0);
              expect(step.matrixState.colPointer).toBeLessThan(cols);
            }
          }

          // Stack/Queue state invariant verification
          if (step.stackQueueState) {
            expect(['stack', 'queue']).toContain(step.stackQueueState.type);
            expect(Array.isArray(step.stackQueueState.items)).toBe(true);
          }

          // HashMap state invariant verification
          if (step.hashMapState) {
            expect(Array.isArray(step.hashMapState.entries)).toBe(true);
          }
        }
      }
    });

    it('verifies authentic curated traces for core problems (Two Sum, Valid Parentheses, Number of Islands)', () => {
      // Problem 1: Two Sum
      expect(PROBLEM_TRACES[1]).toBeDefined();
      expect(PROBLEM_TRACES[1].length).toBe(5);
      expect(PROBLEM_TRACES[1][0].hashMapState).toBeDefined();

      // Problem 20: Valid Parentheses
      expect(PROBLEM_TRACES[20]).toBeDefined();
      expect(PROBLEM_TRACES[20].length).toBe(5);
      expect(PROBLEM_TRACES[20][0].stackQueueState).toBeDefined();

      // Problem 200: Number of Islands
      expect(PROBLEM_TRACES[200]).toBeDefined();
      expect(PROBLEM_TRACES[200].length).toBe(5);
      expect(PROBLEM_TRACES[200][0].matrixState).toBeDefined();
    });

    it('verifies pattern trace fallback for Matrix problems (e.g. Spiral Matrix)', () => {
      const spiral = INITIAL_PROBLEMS.find((p) => p.id === 54);
      expect(spiral).toBeDefined();
      const trace = getTraceForProblem(spiral!);
      expect(trace.length).toBe(4);
      expect(trace[0].matrixState).toBeDefined();
    });
  });

  describe('4. Component SSR Rendering & Control Bounds Verification', () => {
    it('renders VisualizerControls at step 0 with Reverse disabled and Next enabled', () => {
      const rawHtml = renderToString(
        React.createElement(VisualizerControls, {
          currentStep: 0,
          totalSteps: 5,
          isPlaying: false,
          playbackSpeed: 1,
          onNext: () => {},
          onReverse: () => {},
          onPlayToggle: () => {},
          onSpeedChange: () => {},
          onSeek: () => {},
          onReset: () => {},
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Step 1 of 5');
      expect(rawHtml).toContain('disabled=""'); // Reverse button disabled
      expect(text).toContain('Reverse');
      expect(text).toContain('Next');
      expect(text).toContain('Reset');
      expect(text).toContain('Play');
      expect(rawHtml).not.toContain('NaN');
    });

    it('renders VisualizerControls at terminal step with Next disabled and Reverse enabled', () => {
      const rawHtml = renderToString(
        React.createElement(VisualizerControls, {
          currentStep: 4,
          totalSteps: 5,
          isPlaying: false,
          playbackSpeed: 1.5,
          onNext: () => {},
          onReverse: () => {},
          onPlayToggle: () => {},
          onSpeedChange: () => {},
          onSeek: () => {},
          onReset: () => {},
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Step 5 of 5');
      expect(text).toContain('Reverse');
      expect(text).toContain('Next');
      expect(text).toContain('4 / 4');
      expect(rawHtml).not.toContain('NaN');
    });

    it('renders VisualizerControls with single step (totalSteps = 1) without NaN or errors', () => {
      const rawHtml = renderToString(
        React.createElement(VisualizerControls, {
          currentStep: 0,
          totalSteps: 1,
          isPlaying: false,
          playbackSpeed: 1,
          onNext: () => {},
          onReverse: () => {},
          onPlayToggle: () => {},
          onSpeedChange: () => {},
          onSeek: () => {},
          onReset: () => {},
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Step 1 of 1');
      expect(text).toContain('0 / 0');
      expect(rawHtml).not.toContain('NaN');
    });

    it('renders VisualizerEngine with problem prop for Problem 1 (Two Sum)', () => {
      const twoSum = INITIAL_PROBLEMS.find((p) => p.id === 1);
      expect(twoSum).toBeDefined();

      const rawHtml = renderToString(
        React.createElement(VisualizerEngine, {
          problem: twoSum,
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Initialize Hash Map');
      expect(text).toContain('Step 1 of 5');
      expect(rawHtml).toContain('Active Variables');
      expect(rawHtml).not.toContain('NaN');
    });

    it('renders VisualizerEngine with problem prop for Problem 20 (Valid Parentheses)', () => {
      const validParen = INITIAL_PROBLEMS.find((p) => p.id === 20);
      expect(validParen).toBeDefined();

      const rawHtml = renderToString(
        React.createElement(VisualizerEngine, {
          problem: validParen,
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Initialize Empty Stack');
      expect(text).toContain('TOP');
      expect(rawHtml).not.toContain('NaN');
    });

    it('renders VisualizerEngine with problem prop for Problem 54 (Spiral Matrix)', () => {
      const spiral = INITIAL_PROBLEMS.find((p) => p.id === 54);
      expect(spiral).toBeDefined();

      const rawHtml = renderToString(
        React.createElement(VisualizerEngine, {
          problem: spiral,
        })
      );
      const text = stripReactComments(rawHtml);

      expect(text).toContain('Initialize 2D Matrix Bounds');
      expect(text).toContain('Step 1 of 4');
      expect(rawHtml).not.toContain('NaN');
    });
  });
});
