export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Complexity {
  time: string;
  space: string;
}

export interface ApproachInfo {
  name: string;
  code: string;
  complexity: Complexity;
  explanation: string;
}

export interface OptimalApproachInfo extends ApproachInfo {
  whyOptimalIsPreferred: string;
  patternInvariant: string;
}

export interface LeetCodeProblem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  pattern: string;
  category: string;
  statement: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  bruteForce: ApproachInfo;
  optimal: OptimalApproachInfo;
  defaultInputDescription: string;
}

export interface PatternMeta {
  slug: string;
  name: string;
  description: string;
  keyInvariant: string;
  recognitionCues: string[];
  icon: string;
  problemCount?: number;
  problemIds?: number[];
}
