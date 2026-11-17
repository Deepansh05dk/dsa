import type { VisualizerStep } from '../../types/visualizer';
import type { LeetCodeProblem } from '../../types/problem';

export type InputFieldType = 'array' | 'number' | 'string' | 'boolean' | 'linked-list';

export interface InputFieldDef {
  key: string;
  label: string;
  type: InputFieldType;
  placeholder: string;
  defaultValue: any;
  helpText?: string;
}

export interface InputPreset {
  label: string;
  description?: string;
  values: Record<string, any>;
}

export interface ProblemInputConfig {
  problemId: number;
  title: string;
  fields: InputFieldDef[];
  presets: InputPreset[];
  simulate: (input: Record<string, any>, problem: LeetCodeProblem) => VisualizerStep[];
}
