import type { LeetCodeProblem } from '../../types/problem';

import { arrayStringProblems } from './array-string';
import { twoPointersProblems } from './two-pointers';
import { slidingWindowProblems } from './sliding-window';
import { matrixProblems } from './matrix';
import { hashmapProblems } from './hashmap';
import { intervalsProblems } from './intervals';
import { stackProblems } from './stack';
import { linkedListProblems } from './linked-list';
import { binaryTreeGeneralProblems } from './binary-tree-general';
import { binaryTreeBfsProblems } from './binary-tree-bfs';
import { binarySearchTreeProblems } from './binary-search-tree';
import { graphGeneralProblems } from './graph-general';
import { graphBfsProblems } from './graph-bfs';
import { trieProblems } from './trie';
import { backtrackingProblems } from './backtracking';
import { divideAndConquerProblems } from './divide-and-conquer';
import { kadanesAlgorithmProblems } from './kadanes-algorithm';
import { binarySearchProblems } from './binary-search';
import { heapProblems } from './heap';
import { bitManipulationProblems } from './bit-manipulation';
import { mathProblems } from './math';
import { oneDDpProblems } from './1d-dp';
import { multidimensionalDpProblems } from './multidimensional-dp';

export {
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

export const ALL_PROBLEMS: LeetCodeProblem[] = [
  ...arrayStringProblems,
  ...twoPointersProblems,
  ...slidingWindowProblems,
  ...matrixProblems,
  ...hashmapProblems,
  ...intervalsProblems,
  ...stackProblems,
  ...linkedListProblems,
  ...binaryTreeGeneralProblems,
  ...binaryTreeBfsProblems,
  ...binarySearchTreeProblems,
  ...graphGeneralProblems,
  ...graphBfsProblems,
  ...trieProblems,
  ...backtrackingProblems,
  ...divideAndConquerProblems,
  ...kadanesAlgorithmProblems,
  ...binarySearchProblems,
  ...heapProblems,
  ...bitManipulationProblems,
  ...mathProblems,
  ...oneDDpProblems,
  ...multidimensionalDpProblems
].sort((a, b) => a.id - b.id);

export function getAllProblems(): LeetCodeProblem[] {
  return ALL_PROBLEMS;
}

export function getProblemById(id: number | string): LeetCodeProblem | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return ALL_PROBLEMS.find((p) => p.id === numericId);
}

export function getProblemBySlug(slug: string): LeetCodeProblem | undefined {
  return ALL_PROBLEMS.find((p) => p.slug === slug);
}

export function getProblemsByPattern(patternSlugOrName: string): LeetCodeProblem[] {
  const query = patternSlugOrName.toLowerCase();
  return ALL_PROBLEMS.filter(
    (p) =>
      p.pattern.toLowerCase() === query ||
      p.category.toLowerCase() === query
  );
}
