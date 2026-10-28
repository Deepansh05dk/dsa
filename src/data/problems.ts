/**
 * Canonical LeetCode 150 Problem Store
 * Aggregates all 150 problems modularly partitioned under src/data/problems/
 *
 * Seed problem references:
 * - id: 1 (Two Sum)
 * - id: 15 (3Sum)
 * - id: 20 (Valid Parentheses)
 * - id: 200 (Number of Islands)
 */
import type { LeetCodeProblem } from '../types/problem';
import {
  ALL_PROBLEMS,
  getAllProblems,
  getProblemById,
  getProblemBySlug,
  getProblemsByPattern,
  arrayStringProblems,
  twoPointersProblems,
  slidingWindowProblems,
  matrixProblems,
  hashmapProblems,
  intervalsProblems,
  stackProblems,
  linkedListProblems,
  binaryTreeGeneralProblems,
  binaryTreeBfsProblems,
  binarySearchTreeProblems,
  graphGeneralProblems,
  graphBfsProblems,
  trieProblems,
  backtrackingProblems,
  divideAndConquerProblems,
  kadanesAlgorithmProblems,
  binarySearchProblems,
  heapProblems,
  bitManipulationProblems,
  mathProblems,
  oneDDpProblems,
  multidimensionalDpProblems
} from './problems/index';

export const INITIAL_PROBLEMS: LeetCodeProblem[] = ALL_PROBLEMS;

export {
  ALL_PROBLEMS,
  getAllProblems,
  getProblemById,
  getProblemBySlug,
  getProblemsByPattern,
  arrayStringProblems,
  twoPointersProblems,
  slidingWindowProblems,
  matrixProblems,
  hashmapProblems,
  intervalsProblems,
  stackProblems,
  linkedListProblems,
  binaryTreeGeneralProblems,
  binaryTreeBfsProblems,
  binarySearchTreeProblems,
  graphGeneralProblems,
  graphBfsProblems,
  trieProblems,
  backtrackingProblems,
  divideAndConquerProblems,
  kadanesAlgorithmProblems,
  binarySearchProblems,
  heapProblems,
  bitManipulationProblems,
  mathProblems,
  oneDDpProblems,
  multidimensionalDpProblems
};
