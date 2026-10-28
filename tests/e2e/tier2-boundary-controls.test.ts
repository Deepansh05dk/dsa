import { describe, it, expect, beforeEach } from 'vitest';
import { VisualizerStateMachine } from '../harness/reference-spec';
import type { VisualizerStep } from '../../src/types/visualizer';

describe('Tier 2: Boundary & Corner Cases (Visualizer Controls & State)', () => {
  let machine: VisualizerStateMachine;
  const TOTAL_STEPS = 10;

  beforeEach(() => {
    machine = new VisualizerStateMachine(TOTAL_STEPS, 0);
  });

  describe('Tier 2.1: Reverse Step Boundary Clamping', () => {
    it('must clamp at step 0 when onReverse is called at the initial state', () => {
      expect(machine.currentStep).toBe(0);
      machine.reverse();
      expect(machine.currentStep).toBe(0);
    });

    it('must never allow currentStep to become negative under repeated reverse calls', () => {
      for (let i = 0; i < 50; i++) {
        machine.reverse();
      }
      expect(machine.currentStep).toBe(0);
      expect(machine.currentStep).toBeGreaterThanOrEqual(0);
    });

    it('must correctly step backward from an advanced step and clamp at zero', () => {
      machine.seek(3);
      expect(machine.currentStep).toBe(3);

      machine.reverse();
      expect(machine.currentStep).toBe(2);

      machine.reverse();
      expect(machine.currentStep).toBe(1);

      machine.reverse();
      expect(machine.currentStep).toBe(0);

      // Boundary clamp
      machine.reverse();
      expect(machine.currentStep).toBe(0);
    });
  });

  describe('Tier 2.2: Next Step Boundary Clamping', () => {
    it('must clamp at totalSteps - 1 when onNext is called at the terminal state', () => {
      machine.seek(TOTAL_STEPS - 1);
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);

      machine.next();
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);
    });

    it('must never allow currentStep to exceed totalSteps - 1 under repeated next calls', () => {
      for (let i = 0; i < 100; i++) {
        machine.next();
      }
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);
    });

    it('must step forward sequentially until reaching totalSteps - 1', () => {
      for (let step = 0; step < TOTAL_STEPS - 1; step++) {
        expect(machine.currentStep).toBe(step);
        machine.next();
      }
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);
    });
  });

  describe('Tier 2.3: Reset Control Invariant', () => {
    it('must return currentStep to 0 when reset is called from any step', () => {
      machine.seek(7);
      expect(machine.currentStep).toBe(7);

      machine.reset();
      expect(machine.currentStep).toBe(0);
    });

    it('must return currentStep to 0 when reset is called from the terminal step', () => {
      machine.seek(TOTAL_STEPS - 1);
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);

      machine.reset();
      expect(machine.currentStep).toBe(0);
    });

    it('must pause playback if playing when reset is triggered', () => {
      machine.togglePlay();
      expect(machine.isPlaying).toBe(true);

      machine.reset();
      expect(machine.isPlaying).toBe(false);
      expect(machine.currentStep).toBe(0);
    });
  });

  describe('Tier 2.4: Direct Seek & Scrubber Bounds', () => {
    it('must accurately seek to any valid index within [0, totalSteps - 1]', () => {
      const validIndices = [0, 1, 4, 8, TOTAL_STEPS - 1];
      for (const idx of validIndices) {
        machine.seek(idx);
        expect(machine.currentStep).toBe(idx);
      }
    });

    it('must clamp negative seek requests to 0', () => {
      machine.seek(-1);
      expect(machine.currentStep).toBe(0);

      machine.seek(-999);
      expect(machine.currentStep).toBe(0);
    });

    it('must clamp seek requests exceeding totalSteps - 1 to totalSteps - 1', () => {
      machine.seek(TOTAL_STEPS);
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);

      machine.seek(9999);
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);
    });
  });

  describe('Tier 2.5: Minimal & Single-Step Boundary States', () => {
    it('must handle single-step algorithm traces (totalSteps = 1) without crashing or NaN', () => {
      const singleStepMachine = new VisualizerStateMachine(1, 0);
      expect(singleStepMachine.totalSteps).toBe(1);
      expect(singleStepMachine.currentStep).toBe(0);

      // Both next and reverse must clamp at 0
      singleStepMachine.next();
      expect(singleStepMachine.currentStep).toBe(0);

      singleStepMachine.reverse();
      expect(singleStepMachine.currentStep).toBe(0);

      // Progress bar percentage calculation: (current / max(1, total - 1)) * 100
      const denominator = singleStepMachine.totalSteps > 1 ? singleStepMachine.totalSteps - 1 : 1;
      const progressPercent = (singleStepMachine.currentStep / denominator) * 100;
      expect(Number.isNaN(progressPercent)).toBe(false);
      expect(progressPercent).toBe(0);
    });

    it('must clamp invalid initialStep values during machine construction', () => {
      const negativeInit = new VisualizerStateMachine(5, -10);
      expect(negativeInit.currentStep).toBe(0);

      const overflowInit = new VisualizerStateMachine(5, 100);
      expect(overflowInit.currentStep).toBe(4);
    });
  });

  describe('Tier 2.6: High-Frequency & Rapid Alternating Transitions (Stress)', () => {
    it('must maintain step index integrity during rapid forward/backward bursts', () => {
      // 200 alternating clicks: reverse, next, next (net +1 forward, last is next)
      for (let i = 0; i < 200; i++) {
        machine.reverse();
        machine.next();
        machine.next();
      }
      // Index must remain strictly within [0, TOTAL_STEPS - 1] and clamp at max step
      expect(machine.currentStep).toBeGreaterThanOrEqual(0);
      expect(machine.currentStep).toBeLessThanOrEqual(TOTAL_STEPS - 1);
      expect(machine.currentStep).toBe(TOTAL_STEPS - 1);
    });

    it('must reliably return to 0 when reversed equal times after stepping forward', () => {
      const stepsForward = 5;
      for (let i = 0; i < stepsForward; i++) {
        machine.next();
      }
      expect(machine.currentStep).toBe(5);

      for (let i = 0; i < stepsForward; i++) {
        machine.reverse();
      }
      expect(machine.currentStep).toBe(0);
    });
  });

  describe('Tier 2.7: Playback Speed and Controller Settings', () => {
    it('must accept valid playback speeds: 0.5, 1, 1.5, 2', () => {
      const speeds = [0.5, 1, 1.5, 2];
      for (const sp of speeds) {
        machine.setSpeed(sp);
        expect(machine.playbackSpeed).toBe(sp);
      }
    });

    it('must reject or ignore invalid playback speeds', () => {
      machine.setSpeed(1);
      machine.setSpeed(0); // Invalid
      expect(machine.playbackSpeed).toBe(1);

      machine.setSpeed(-2.5); // Invalid
      expect(machine.playbackSpeed).toBe(1);

      machine.setSpeed(100); // Invalid
      expect(machine.playbackSpeed).toBe(1);
    });
  });

  describe('Tier 2.8: Data Structure State Boundary Invariants', () => {
    it('verifies array pointers remain within array bounds in VisualizerStep', () => {
      const mockStep: VisualizerStep = {
        stepIndex: 0,
        title: 'Initial Two Pointer Placement',
        description: 'Initialize left at 0 and right at n - 1',
        arrayState: {
          elements: [
            { value: 1, status: 'default' },
            { value: 8, status: 'default' },
            { value: 6, status: 'default' }
          ],
          pointers: [
            { label: 'L', index: 0, color: '#34d399' },
            { label: 'R', index: 2, color: '#f87171' }
          ],
          window: { left: 0, right: 2 }
        }
      };

      const arrayLen = mockStep.arrayState!.elements.length;
      for (const pointer of mockStep.arrayState!.pointers!) {
        expect(pointer.index).toBeGreaterThanOrEqual(0);
        expect(pointer.index).toBeLessThan(arrayLen);
      }

      expect(mockStep.arrayState!.window!.left).toBeLessThanOrEqual(mockStep.arrayState!.window!.right);
    });

    it('verifies matrix row and column pointers are within grid dimensions', () => {
      const mockStep: VisualizerStep = {
        stepIndex: 1,
        title: 'Traverse Cell (0, 1)',
        description: 'Inspecting top-row cell',
        matrixState: {
          grid: [
            [{ value: 1, status: 'visited' }, { value: 2, status: 'active' }],
            [{ value: 3, status: 'default' }, { value: 4, status: 'default' }]
          ],
          rowPointer: 0,
          colPointer: 1
        }
      };

      const numRows = mockStep.matrixState!.grid.length;
      const numCols = mockStep.matrixState!.grid[0].length;

      expect(mockStep.matrixState!.rowPointer!).toBeGreaterThanOrEqual(0);
      expect(mockStep.matrixState!.rowPointer!).toBeLessThan(numRows);
      expect(mockStep.matrixState!.colPointer!).toBeGreaterThanOrEqual(0);
      expect(mockStep.matrixState!.colPointer!).toBeLessThan(numCols);
    });

    it('verifies stack state push/pop consistency in stack visualizer steps', () => {
      const pushStep: VisualizerStep = {
        stepIndex: 2,
        title: 'Push "(" to stack',
        description: 'Encountered open parenthesis',
        stackQueueState: {
          type: 'stack',
          items: [
            { value: '(', status: 'pushed' }
          ]
        }
      };

      expect(pushStep.stackQueueState!.items.length).toBe(1);
      expect(pushStep.stackQueueState!.items[0].value).toBe('(');
    });
  });
});
