import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';
import { ALL_PROBLEM_TRACES, getTraceForProblem as getModularTrace } from '../../data/traces';

/**
 * Curated authentic execution traces for all 150 LeetCode problems,
 * partitioned modularly by algorithmic pattern in src/data/traces/.
 */
export const PROBLEM_TRACES: Record<number, VisualizerStep[]> = ALL_PROBLEM_TRACES;

/**
 * Universal trace generator & dispatcher for LeetCode 150 problems.
 * Resolves curated problem-specific traces or pattern-specific multi-step
 * state transitions matching the exact visualizer renderer for that problem's category.
 */
export function getTraceForProblem(problem: LeetCodeProblem): VisualizerStep[] {
  return getModularTrace(problem);
}
