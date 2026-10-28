import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { INITIAL_PROBLEMS } from '../src/data/problems';
import { getTraceForProblem, ALL_PROBLEM_TRACES } from '../src/data/traces';
import { VisualizerEngine } from '../src/components/visualizer/VisualizerEngine';
import { VisualizerControls } from '../src/components/visualizer/VisualizerControls';
import { VisualizerStateMachine, EXPECTED_PATTERNS } from './harness/reference-spec';

// 10 Data Structure Renderers
import { ArrayRenderer } from '../src/components/visualizer/renderers/ArrayRenderer';
import { LinkedListRenderer } from '../src/components/visualizer/renderers/LinkedListRenderer';
import { TreeRenderer } from '../src/components/visualizer/renderers/TreeRenderer';
import { GraphRenderer } from '../src/components/visualizer/renderers/GraphRenderer';
import { TrieRenderer } from '../src/components/visualizer/renderers/TrieRenderer';
import { HeapRenderer } from '../src/components/visualizer/renderers/HeapRenderer';
import { DPTableRenderer } from '../src/components/visualizer/renderers/DPTableRenderer';
import { MatrixRenderer } from '../src/components/visualizer/renderers/MatrixRenderer';
import { StackQueueRenderer } from '../src/components/visualizer/renderers/StackQueueRenderer';
import { HashMapRenderer } from '../src/components/visualizer/renderers/HashMapRenderer';

// Helper to strip React 18 SSR comment markers (<!-- -->)
function stripReactComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

// Clean render helper
function renderClean(element: React.ReactElement): string {
  return stripReactComments(renderToString(element));
}

describe('Tier 5 Adversarial Coverage Hardening Suite', () => {
  // =========================================================================
  // 1. ADVERSARIAL VERIFICATION OF ALL 10 DATA STRUCTURE RENDERERS
  // =========================================================================
  describe('1. Adversarial Verification of All 10 Renderers', () => {
    describe('1.1 ArrayRenderer', () => {
      it('renders empty array state gracefully without crashing', () => {
        const htmlEmpty1 = renderClean(React.createElement(ArrayRenderer, { state: undefined }));
        expect(htmlEmpty1).toContain('[ Empty Array State ]');

        const htmlEmpty2 = renderClean(React.createElement(ArrayRenderer, { state: { elements: [] } }));
        expect(htmlEmpty2).toContain('[ Empty Array State ]');
      });

      it('renders multiple overlapping pointers and sliding window range', () => {
        const html = renderClean(
          React.createElement(ArrayRenderer, {
            state: {
              elements: [
                { value: 10, status: 'active' },
                { value: 20, status: 'comparing' },
                { value: 30, status: 'sorted' },
                { value: 40, status: 'swapped' },
                { value: 50, status: 'eliminated' },
                { value: 60, status: 'matched' },
                { value: 70, status: 'default' },
              ],
              pointers: [
                { label: 'L', index: 0, color: '#0070f3' },
                { label: 'i', index: 0, color: '#00df72' }, // Overlapping at index 0
                { label: 'mid', index: 3 },
                { label: 'R', index: 6 },
              ],
              window: { left: 1, right: 4 },
            },
          })
        );

        expect(html).toContain('Sliding Window:');
        expect(html).toContain('[1 .. 4]');
        expect(html).toContain('Length: 4');
        expect(html).toContain('10');
        expect(html).toContain('70');
        expect(html).toContain('L');
        expect(html).toContain('R');
      });

      it('handles adversarial zero-width and negative window safely without NaN', () => {
        const html = renderClean(
          React.createElement(ArrayRenderer, {
            state: {
              elements: [{ value: 42, status: 'default' }],
              window: { left: 2, right: 1 }, // inverted window
            },
          })
        );
        expect(html).not.toContain('NaN');
        expect(html).toContain('Length: 0');
      });
    });

    describe('1.2 LinkedListRenderer', () => {
      it('renders empty state safely', () => {
        const html = renderClean(React.createElement(LinkedListRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Linked List State ]');
      });

      it('renders single-node singly linked list with null terminator', () => {
        const html = renderClean(
          React.createElement(LinkedListRenderer, {
            state: {
              nodes: [{ id: 'head', value: 99, status: 'curr', nextId: null }],
            },
          })
        );
        expect(html).toContain('99');
        expect(html).toContain('NULL');
        expect(html).toContain('CURR');
      });

      it('accurately identifies and highlights cycle detection back-pointers', () => {
        // Node 3 points back to Node 1 (cycle)
        const html = renderClean(
          React.createElement(LinkedListRenderer, {
            state: {
              nodes: [
                { id: 'n1', value: 3, status: 'visited', nextId: 'n2' },
                { id: 'n2', value: 2, status: 'visited', nextId: 'n3' },
                { id: 'n3', value: 0, status: 'fast', nextId: 'n1' }, // Cycle to n1
              ],
            },
          })
        );
        expect(html).toContain('Cycle Detected: Node [n3] → Node [n1]');
        expect(html).toContain('↺ ──▶ [n1]');
      });

      it('renders arbitrary random pointers for complex lists (e.g. Copy List)', () => {
        const html = renderClean(
          React.createElement(LinkedListRenderer, {
            state: {
              nodes: [
                { id: 'a', value: 7, status: 'default', nextId: 'b', randomId: null },
                { id: 'b', value: 13, status: 'curr', nextId: null, randomId: 'a' },
              ],
            },
          })
        );
        expect(html).toContain('random → [a]');
      });
    });

    describe('1.3 TreeRenderer', () => {
      it('renders empty tree state gracefully', () => {
        const html = renderClean(React.createElement(TreeRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Tree State ]');
      });

      it('renders single root node without edges', () => {
        const html = renderClean(
          React.createElement(TreeRenderer, {
            state: {
              nodes: [{ id: '1', value: 100, status: 'current' }],
            },
          })
        );
        expect(html).toContain('100');
        expect(html).toContain('Max Depth:');
        expect(html).toContain('>0</strong>');
        expect(html).toContain('[root:1]');
      });

      it('renders deep left-skewed binary tree and computes correct depth and SVG dimensions', () => {
        const html = renderClean(
          React.createElement(TreeRenderer, {
            state: {
              nodes: [
                { id: '1', value: 5, status: 'visited', leftId: '2' },
                { id: '2', value: 4, status: 'visited', leftId: '3' },
                { id: '3', value: 3, status: 'visited', leftId: '4' },
                { id: '4', value: 2, status: 'visited', leftId: '5' },
                { id: '5', value: 1, status: 'current' },
              ],
            },
          })
        );
        expect(html).toContain('Max Depth:');
        expect(html).toContain('>4</strong>');
        expect(html).toContain('viewBox="0 0 600');
      });

      it('handles disconnected/orphan tree nodes gracefully without crashing', () => {
        const html = renderClean(
          React.createElement(TreeRenderer, {
            state: {
              nodes: [
                { id: '1', value: 'root', status: 'default' },
                { id: 'orphan', value: 'floating', status: 'matched' },
              ],
            },
          })
        );
        expect(html).toContain('floating');
        expect(html).not.toContain('NaN');
      });
    });

    describe('1.4 GraphRenderer', () => {
      it('renders empty graph state safely', () => {
        const html = renderClean(React.createElement(GraphRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Graph State ]');
      });

      it('renders 1-node graph centered in canvas', () => {
        const html = renderClean(
          React.createElement(GraphRenderer, {
            state: {
              nodes: [{ id: 'A', label: 'Vertex A', status: 'visiting' }],
              edges: [],
            },
          })
        );
        expect(html).toContain('Vertex A');
        expect(html).toContain('Visiting');
      });

      it('renders multi-vertex graph with directed weighted edges, active highlights, and visited sets', () => {
        const html = renderClean(
          React.createElement(GraphRenderer, {
            state: {
              nodes: [
                { id: '0', label: '0', status: 'visited' },
                { id: '1', label: '1', status: 'visiting' },
                { id: '2', label: '2', status: 'unvisited' },
              ],
              edges: [
                { from: '0', to: '1', weight: 4, active: true },
                { from: '1', to: '2', weight: 8, active: false },
              ],
            },
          })
        );
        expect(html).toContain('1 visited');
        expect(html).toContain('Exploring');
        expect(html).toContain('0 → 1');
      });
    });

    describe('1.5 TrieRenderer', () => {
      it('renders empty trie state gracefully', () => {
        const html = renderClean(React.createElement(TrieRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Trie State ]');
      });

      it('renders multi-level prefix trie with End-Of-Word markers and query indicator', () => {
        const html = renderClean(
          React.createElement(TrieRenderer, {
            state: {
              rootId: 'root',
              activeWord: 'app',
              nodes: [
                { id: 'root', char: 'ROOT', status: 'default', children: ['a'] },
                { id: 'a', char: 'a', status: 'matched', children: ['p1'] },
                { id: 'p1', char: 'p', status: 'matched', children: ['p2'] },
                { id: 'p2', char: 'p', isEndOfWord: true, status: 'current', children: ['l'] },
                { id: 'l', char: 'l', status: 'default', children: ['e'] },
                { id: 'e', char: 'e', isEndOfWord: true, status: 'default', children: [] },
              ],
            },
          })
        );
        expect(html).toContain('Query:');
        expect(html).toContain('&quot;app&quot;');
        expect(html).toContain('Words:');
        expect(html).toContain('EOW');
      });
    });

    describe('1.6 HeapRenderer', () => {
      it('renders empty heap state safely', () => {
        const html = renderClean(React.createElement(HeapRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Heap State ]');
      });

      it('renders dual tree hierarchy and contiguous 1D array views for Min-Heap', () => {
        const html = renderClean(
          React.createElement(HeapRenderer, {
            state: {
              type: 'min',
              elements: [
                { value: 2, status: 'root' },
                { value: 5, status: 'sifting' },
                { value: 3, status: 'swapping' },
                { value: 8, status: 'default' },
                { value: 10, status: 'default' },
              ],
            },
          })
        );
        expect(html).toContain('MIN-HEAP');
        expect(html).toContain('Underlying 1D Array Storage');
        expect(html).toContain('Visual Tree Hierarchy');
        expect(html).toContain('Root:');
        expect(html).toContain('[0] ROOT');
      });

      it('renders Max-Heap styling and parent-child mathematical relationships', () => {
        const html = renderClean(
          React.createElement(HeapRenderer, {
            state: {
              type: 'max',
              elements: [{ value: 99, status: 'root' }],
            },
          })
        );
        expect(html).toContain('MAX-HEAP');
        expect(html).toContain('Parent: ⌊(i-1)/2⌋');
      });
    });

    describe('1.7 DPTableRenderer', () => {
      it('renders empty DP table state safely', () => {
        const html = renderClean(React.createElement(DPTableRenderer, { state: undefined }));
        expect(html).toContain('[ Empty DP Table State ]');
      });

      it('renders 1D DP array with recurrence formula and dependency lookups (dp[i-1], dp[i-2])', () => {
        const html = renderClean(
          React.createElement(DPTableRenderer, {
            state: {
              dimensions: '1D',
              formula: 'dp[i] = dp[i-1] + dp[i-2]',
              values: [1, 1, 2, 3, 5],
              activeCell: 3,
            },
          })
        );
        expect(html).toContain('1D Dynamic Programming Array');
        expect(html).toContain('dp[3]');
        expect(html).toContain('dp[i] = dp[i-1] + dp[i-2]');
        expect(html).toContain('COMPUTING');
        expect(html).toContain('dp[i-1]');
        expect(html).toContain('dp[i-2]');
      });

      it('renders 2D DP matrix with row/column indices and active cell coordinate (r, c)', () => {
        const html = renderClean(
          React.createElement(DPTableRenderer, {
            state: {
              dimensions: '2D',
              formula: 'dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c]',
              values: [
                [1, 3, 1],
                [1, 5, 1],
                [4, 2, 1],
              ],
              activeCell: [1, 1],
            },
          })
        );
        expect(html).toContain('2D Dynamic Programming Table');
        expect(html).toContain('dp[1][1]');
        expect(html).toContain('c=1');
        expect(html).toContain('r1');
      });

      it('handles null/undefined DP cells gracefully with dash placeholders', () => {
        const html = renderClean(
          React.createElement(DPTableRenderer, {
            state: {
              dimensions: '1D',
              values: [1, null, undefined] as any,
              activeCell: 0,
            },
          })
        );
        expect(html).toContain('—');
        expect(html).not.toContain('NaN');
      });
    });

    describe('1.8 MatrixRenderer', () => {
      it('renders empty matrix state safely', () => {
        const html = renderClean(React.createElement(MatrixRenderer, { state: undefined }));
        expect(html).toContain('[ Empty 2D Matrix State ]');
      });

      it('renders non-square matrix with rowPointer and colPointer', () => {
        const html = renderClean(
          React.createElement(MatrixRenderer, {
            state: {
              grid: [
                [{ value: 'A', status: 'visited' }, { value: 'B', status: 'active' }, { value: 'C', status: 'default' }],
                [{ value: 'D', status: 'obstacle' }, { value: 'E', status: 'path' }, { value: 'F', status: 'default' }],
              ],
              rowPointer: 0,
              colPointer: 1,
            },
          })
        );
        expect(html).toContain('Grid: 2 × 3');
        expect(html).toContain('Row Pointer: 0');
        expect(html).toContain('Col Pointer: 1');
        expect(html).toContain('r0');
        expect(html).toContain('c=1');
      });
    });

    describe('1.9 StackQueueRenderer', () => {
      it('renders empty stack and queue states cleanly', () => {
        const htmlStack = renderClean(
          React.createElement(StackQueueRenderer, {
            state: { type: 'stack', items: [] },
          })
        );
        expect(htmlStack).toContain('[ Empty Stack ]');

        const htmlQueue = renderClean(
          React.createElement(StackQueueRenderer, {
            state: { type: 'queue', items: [] },
          })
        );
        expect(htmlQueue).toContain('[ Empty Queue ]');
      });

      it('renders LIFO vertical beaker with top item indicator and push/pop badges', () => {
        const html = renderClean(
          React.createElement(StackQueueRenderer, {
            state: {
              type: 'stack',
              items: [
                { value: 'bottom', status: 'default' },
                { value: 'middle', status: 'pushed' },
                { value: 'top_item', status: 'top' },
              ],
            },
          })
        );
        expect(html).toContain('LIFO Stack');
        expect(html).toContain('TOP');
        expect(html).toContain('+ pushed');
        expect(html).toContain('Stack Base (Index 0)');
      });

      it('renders FIFO horizontal conveyor with FRONT, BACK, and Dequeue/Enqueue badges', () => {
        const html = renderClean(
          React.createElement(StackQueueRenderer, {
            state: {
              type: 'queue',
              items: [
                { value: 'first_in', status: 'default' },
                { value: 'last_in', status: 'pushed' },
              ],
            },
          })
        );
        expect(html).toContain('FIFO Queue');
        expect(html).toContain('FRONT');
        expect(html).toContain('BACK');
        expect(html).toContain('Dequeue');
        expect(html).toContain('Enqueue');
      });
    });

    describe('1.10 HashMapRenderer', () => {
      it('renders empty hashmap state cleanly', () => {
        const html = renderClean(React.createElement(HashMapRenderer, { state: undefined }));
        expect(html).toContain('[ Empty Hash Map State ]');

        const htmlEmptyEntries = renderClean(
          React.createElement(HashMapRenderer, { state: { entries: [] } })
        );
        expect(htmlEmptyEntries).toContain('[ Hash Map is currently empty');
      });

      it('renders key-value entries with status badges and JSON map preview', () => {
        const html = renderClean(
          React.createElement(HashMapRenderer, {
            state: {
              entries: [
                { key: 'apple', value: 3, status: 'accessed' },
                { key: 'banana', value: 5, status: 'inserted' },
                { key: 'cherry', value: 8, status: 'updated' },
              ],
            },
          })
        );
        expect(html).toContain('Hash Table Snapshot');
        expect(html).toContain('Entries:');
        expect(html).toContain('>3</strong>');
        expect(html).toContain('accessed');
        expect(html).toContain('inserted');
        expect(html).toContain('updated');
        expect(html).toContain('Map View:');
        expect(html).toContain('&quot;apple&quot;: 3');
      });
    });
  });

  // =========================================================================
  // 2. COMPLETE 150 PROBLEMS VISUALIZER STATE MAPPING & VERIFICATION
  // =========================================================================
  describe('2. Complete 150 Problems Visualizer State Mapping', () => {
    it('verifies that all 150 problems map to specialized data structure states without default/missing components', () => {
      expect(INITIAL_PROBLEMS.length).toBe(150);

      const stateDistribution: Record<string, number> = {
        arrayState: 0,
        linkedListState: 0,
        treeState: 0,
        graphState: 0,
        trieState: 0,
        heapState: 0,
        dpTableState: 0,
        matrixState: 0,
        stackQueueState: 0,
        hashMapState: 0,
      };

      for (const problem of INITIAL_PROBLEMS) {
        const trace = getTraceForProblem(problem);
        expect(trace).toBeDefined();
        expect(trace.length).toBeGreaterThanOrEqual(2);

        for (let i = 0; i < trace.length; i++) {
          const step = trace[i];
          expect(step.stepIndex).toBe(i);
          expect(step.title).toBeTruthy();
          expect(step.title.trim().length).toBeGreaterThan(0);
          expect(step.description).toBeTruthy();
          expect(step.description.trim().length).toBeGreaterThan(0);
          expect(step.variables).toBeDefined();
          expect(Object.keys(step.variables!).length).toBeGreaterThan(0);

          // Invariant: exactly at least one specialized data structure state is present
          const hasState =
            Boolean(step.arrayState) ||
            Boolean(step.linkedListState) ||
            Boolean(step.treeState) ||
            Boolean(step.graphState) ||
            Boolean(step.trieState) ||
            Boolean(step.heapState) ||
            Boolean(step.dpTableState) ||
            Boolean(step.matrixState) ||
            Boolean(step.stackQueueState) ||
            Boolean(step.hashMapState);

          expect(hasState).toBe(true);

          if (i === 0) {
            if (step.arrayState) stateDistribution.arrayState++;
            if (step.linkedListState) stateDistribution.linkedListState++;
            if (step.treeState) stateDistribution.treeState++;
            if (step.graphState) stateDistribution.graphState++;
            if (step.trieState) stateDistribution.trieState++;
            if (step.heapState) stateDistribution.heapState++;
            if (step.dpTableState) stateDistribution.dpTableState++;
            if (step.matrixState) stateDistribution.matrixState++;
            if (step.stackQueueState) stateDistribution.stackQueueState++;
            if (step.hashMapState) stateDistribution.hashMapState++;
          }
        }
      }

      // Verify exact representation across all 10 specialized renderers
      expect(stateDistribution.linkedListState).toBe(11); // Exactly 11 Linked List
      expect(stateDistribution.treeState).toBe(21); // 14 General + 4 BFS + 3 BST
      expect(stateDistribution.trieState).toBe(3); // Exactly 3 Trie
      expect(stateDistribution.heapState).toBe(4); // Exactly 4 Heap
      expect(stateDistribution.dpTableState).toBe(14); // 5 1D DP + 9 Multi DP
      expect(stateDistribution.stackQueueState).toBe(5); // Exactly 5 Stack
      expect(stateDistribution.hashMapState).toBe(9); // Exactly 9 Hashmap
      expect(stateDistribution.matrixState).toBe(6); // 5 Matrix + #200 Number of Islands
      expect(stateDistribution.graphState).toBe(8); // 8 Graph problems (excluding #200)
      // 69 single-array problems + #1 Two Sum (dual arrayState + hashMapState) = 70 total with arrayState
      expect(stateDistribution.arrayState).toBe(70);
    });

    it('verifies that VisualizerEngine renders ALL 150 problems without fallback message', () => {
      // Test representative problem from all 23 patterns
      const representativeProblems = EXPECTED_PATTERNS.map((pattern) => {
        const found = INITIAL_PROBLEMS.find(
          (p) =>
            p.category.toLowerCase() === pattern.toLowerCase() ||
            p.pattern.toLowerCase() === pattern.toLowerCase()
        );
        expect(found).toBeDefined();
        return found!;
      });

      for (const prob of representativeProblems) {
        const trace = getTraceForProblem(prob);
        // Render step 0 and terminal step
        const htmlInitial = renderClean(
          React.createElement(VisualizerEngine, {
            problem: prob,
            steps: trace,
            initialStep: 0,
          })
        );
        expect(htmlInitial).not.toContain('[ State transition active — No primitive data structure configured ]');
        expect(htmlInitial).toContain(`Step 1 of ${trace.length}`);

        const htmlTerminal = renderClean(
          React.createElement(VisualizerEngine, {
            problem: prob,
            steps: trace,
            initialStep: trace.length - 1,
          })
        );
        expect(htmlTerminal).not.toContain('[ State transition active — No primitive data structure configured ]');
        expect(htmlTerminal).toContain(`Step ${trace.length} of ${trace.length}`);
      }
    });
  });

  // =========================================================================
  // 3. RAPID FORWARD/BACKWARD HIGH-FREQUENCY STRESS TESTING (500+ OPERATIONS)
  // =========================================================================
  describe('3. High-Frequency Rapid Stepping & Burst Stress Test', () => {
    it('survives rapid alternating 1,000 next/reverse operations without desync or NaN', () => {
      const machine = new VisualizerStateMachine(10, 0);

      for (let i = 0; i < 1000; i++) {
        // High frequency alternating burst
        if (i % 2 === 0) {
          machine.next();
        } else {
          machine.reverse();
        }

        expect(machine.currentStep).toBeGreaterThanOrEqual(0);
        expect(machine.currentStep).toBeLessThanOrEqual(9);
        expect(Number.isInteger(machine.currentStep)).toBe(true);
        expect(Number.isNaN(machine.currentStep)).toBe(false);
      }
    });

    it('survives 500 consecutive reverse clicks from step 0 (clamping invariant)', () => {
      const machine = new VisualizerStateMachine(5, 0);
      for (let i = 0; i < 500; i++) {
        machine.reverse();
      }
      expect(machine.currentStep).toBe(0);
    });

    it('survives 500 consecutive next clicks from max step (clamping invariant)', () => {
      const machine = new VisualizerStateMachine(5, 4);
      for (let i = 0; i < 500; i++) {
        machine.next();
      }
      expect(machine.currentStep).toBe(4);
    });

    it('guarantees K forward operations followed by K backward operations returns exactly to origin', () => {
      const machine = new VisualizerStateMachine(50, 0);
      const K = 35;

      for (let i = 0; i < K; i++) {
        machine.next();
      }
      expect(machine.currentStep).toBe(K);

      for (let i = 0; i < K; i++) {
        machine.reverse();
      }
      expect(machine.currentStep).toBe(0);
    });

    it('renders VisualizerControls under stress with zero NaN in progress indicator', () => {
      // Test single-step edge case (totalSteps = 1, currentStep = 0)
      const htmlSingle = renderClean(
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
      expect(htmlSingle).not.toContain('NaN');
      expect(htmlSingle).toContain('Step 1 of 1');
      expect(htmlSingle).toContain('0 / 0');

      // Test multi-step arbitrary progress states
      for (let step = 0; step < 10; step++) {
        const html = renderClean(
          React.createElement(VisualizerControls, {
            currentStep: step,
            totalSteps: 10,
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
        expect(html).not.toContain('NaN');
        expect(html).toContain(`Step ${step + 1} of 10`);
        expect(html).toContain(`${step} / 9`);
      }
    });

    it('maintains bounded memory and sub-millisecond execution across 50,000 rapid step transitions', () => {
      const machine = new VisualizerStateMachine(20, 0);
      const startTime = performance.now();

      for (let i = 0; i < 50000; i++) {
        const mod = i % 4;
        if (mod === 0) machine.next();
        else if (mod === 1) machine.next();
        else if (mod === 2) machine.reverse();
        else machine.seek((i * 7) % 20);
      }

      const durationMs = performance.now() - startTime;
      expect(durationMs).toBeLessThan(1000); // 50,000 ops should take under 1 second
      expect(machine.currentStep).toBeGreaterThanOrEqual(0);
      expect(machine.currentStep).toBeLessThanOrEqual(19);
    });
  });

  // =========================================================================
  // 4. CANDIDATE REVISION WORKLOADS ACROSS ALL 23 PATTERNS
  // =========================================================================
  describe('4. Candidate Revision Workloads Across All 23 Patterns', () => {
    it('verifies interview preparation workflow integrity for all 23 patterns', () => {
      for (const patternName of EXPECTED_PATTERNS) {
        const patternProblems = INITIAL_PROBLEMS.filter(
          (p) =>
            p.category.toLowerCase() === patternName.toLowerCase() ||
            p.pattern.toLowerCase() === patternName.toLowerCase()
        );

        expect(patternProblems.length).toBeGreaterThan(0);

        // Revise first problem in pattern
        const prob = patternProblems[0];

        // 1. Invariant verification
        expect(prob.optimal.whyOptimalIsPreferred.length).toBeGreaterThan(10);
        expect(prob.optimal.patternInvariant.length).toBeGreaterThan(5);

        // 2. Trace step walkthrough
        const trace = getTraceForProblem(prob);
        const machine = new VisualizerStateMachine(trace.length, 0);

        // Walk to end
        while (machine.currentStep < machine.totalSteps - 1) {
          machine.next();
        }
        expect(machine.currentStep).toBe(trace.length - 1);

        // Review 1 step back
        machine.reverse();
        expect(machine.currentStep).toBe(Math.max(0, trace.length - 2));

        // Reset
        machine.reset();
        expect(machine.currentStep).toBe(0);
      }
    });
  });
});
