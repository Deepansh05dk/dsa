import { describe, it, expect } from 'vitest';
import { INITIAL_PROBLEMS } from '../src/data/problems';
import { getSimulatorConfigForProblem } from '../src/utils/simulators/registry';
import { getTraceForProblem } from '../src/data/traces';

describe('Audit 150 problems visualizer and simulator behavior', () => {
  it('checks which problems have visualizer traces and simulator configurations', () => {
    console.log(`Total problems: ${INITIAL_PROBLEMS.length}`);
    const byPattern: Record<string, { total: number; problems: Array<{ id: number; title: string }> }> = {};

    for (const p of INITIAL_PROBLEMS) {
      if (!byPattern[p.pattern]) {
        byPattern[p.pattern] = { total: 0, problems: [] };
      }
      byPattern[p.pattern].total++;
      byPattern[p.pattern].problems.push({ id: p.id, title: p.title });
    }

    console.log('\n--- PATTERNS SUMMARY ---');
    for (const [pattern, data] of Object.entries(byPattern)) {
      console.log(`${pattern}: ${data.total} problems`);
    }

    console.log('\n--- AUDIT SIMULATOR FOR EACH PROBLEM ---');
    const simulatorFallbacks: Array<{ id: number; title: string; pattern: string; type: string }> = [];
    const sliderWindowIssues: Array<{ id: number; title: string; pattern: string }> = [];

    for (const p of INITIAL_PROBLEMS) {
      const config = getSimulatorConfigForProblem(p);
      const trace = getTraceForProblem(p);

      // Check default trace renderer
      const firstTraceStep = trace[0] || {};
      const traceRenderer = firstTraceStep.matrixState
        ? 'matrix'
        : firstTraceStep.treeState
        ? 'tree'
        : firstTraceStep.linkedListState
        ? 'linkedList'
        : firstTraceStep.stackQueueState
        ? 'stackQueue'
        : firstTraceStep.hashMapState
        ? 'hashMap'
        : firstTraceStep.dpTableState
        ? 'dpTable'
        : firstTraceStep.heapState
        ? 'heap'
        : firstTraceStep.graphState
        ? 'graph'
        : firstTraceStep.trieState
        ? 'trie'
        : firstTraceStep.arrayState
        ? 'array'
        : 'unknown';

      // Test simulate with default inputs
      const dummyInput: Record<string, any> = {};
      config.fields.forEach((f) => {
        dummyInput[f.key] = f.defaultValue;
      });

      let simSteps: any[] = [];
      try {
        simSteps = config.simulate(dummyInput, p);
      } catch (e: any) {
        console.error(`Error simulating #${p.id} ${p.title}: ${e.message}`);
      }

      const firstSimStep = simSteps[0] || {};
      const simRenderer = (p.pattern === 'sliding-window' && firstSimStep.arrayState)
        ? 'array'
        : (p.id === 200 || p.id === 130) && firstSimStep.matrixState
        ? 'graph' // Grid graphs visualize via 2D matrix
        : firstSimStep.matrixState
        ? 'matrix'
        : firstSimStep.treeState
        ? 'tree'
        : firstSimStep.linkedListState
        ? 'linkedList'
        : firstSimStep.stackQueueState
        ? 'stackQueue'
        : firstSimStep.hashMapState
        ? 'hashMap'
        : firstSimStep.dpTableState
        ? 'dpTable'
        : firstSimStep.heapState
        ? 'heap'
        : firstSimStep.graphState
        ? 'graph'
        : firstSimStep.trieState
        ? 'trie'
        : firstSimStep.arrayState
        ? 'array'
        : 'unknown';

      // Check if any step in simulation has windowRange when pattern is NOT sliding-window
      const hasWindow = simSteps.some((s) => s.arrayState && s.arrayState.window !== undefined);
      if (hasWindow && !p.pattern.includes('sliding-window')) {
        sliderWindowIssues.push({ id: p.id, title: p.title, pattern: p.pattern });
      }

      // Check if renderer matches pattern expectation
      const patternExpectation: Record<string, string> = {
        'array-string': 'array',
        'two-pointers': 'array',
        'sliding-window': 'array',
        'matrix': 'matrix',
        'hashmap': 'hashMap',
        'intervals': 'array',
        'stack': 'stackQueue',
        'linked-list': 'linkedList',
        'binary-tree-general': 'tree',
        'binary-tree-bfs': 'tree',
        'binary-search-tree': 'tree',
        'graph-general': 'graph',
        'graph-bfs': 'graph',
        'trie': 'trie',
        'backtracking': 'tree',
        'divide-and-conquer': 'tree',
        'kadanes-algorithm': 'array',
        'binary-search': 'array',
        'heap': 'heap',
        'bit-manipulation': 'array',
        'math': 'array',
        '1d-dp': 'dpTable',
        'multidimensional-dp': 'dpTable',
      };

      const expected = patternExpectation[p.pattern];
      if (expected && simRenderer !== expected) {
        simulatorFallbacks.push({ id: p.id, title: p.title, pattern: p.pattern, type: `sim:${simRenderer} vs expected:${expected}` });
      }
    }

    console.log(`\nFound ${sliderWindowIssues.length} problems with unexpected 'Slider window':`);
    sliderWindowIssues.forEach((issue) => console.log(`  #${issue.id} [${issue.pattern}] ${issue.title}`));

    console.log(`\nFound ${simulatorFallbacks.length} problems where simulator renderer does not match pattern:`);
    simulatorFallbacks.forEach((issue) => console.log(`  #${issue.id} [${issue.pattern}] ${issue.title} -> ${issue.type}`));

    expect(sliderWindowIssues).toEqual([]);
    expect(simulatorFallbacks).toEqual([]);
  });
});
