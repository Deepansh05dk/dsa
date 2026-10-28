export interface VisualizerStep {
  stepIndex: number;
  title: string;
  description: string;
  codeLineHighlight?: number | number[];
  variables?: Record<string, string | number | boolean | null>;
  arrayState?: {
    elements: Array<{
      value: string | number;
      status: 'default' | 'active' | 'comparing' | 'sorted' | 'swapped' | 'matched' | 'eliminated';
    }>;
    pointers?: Array<{
      label: string;
      index: number;
      color?: string;
    }>;
    window?: {
      left: number;
      right: number;
    };
  };
  matrixState?: {
    grid: Array<Array<{
      value: string | number;
      status: 'default' | 'active' | 'visited' | 'path' | 'obstacle';
    }>>;
    rowPointer?: number;
    colPointer?: number;
  };
  linkedListState?: {
    nodes: Array<{
      id: string;
      value: string | number;
      status: 'default' | 'curr' | 'prev' | 'next' | 'fast' | 'slow' | 'visited';
      nextId?: string | null;
      randomId?: string | null;
    }>;
  };
  treeState?: {
    nodes: Array<{
      id: string;
      value: string | number;
      status: 'default' | 'current' | 'visited' | 'matched' | 'highlighted';
      leftId?: string | null;
      rightId?: string | null;
    }>;
  };
  stackQueueState?: {
    type: 'stack' | 'queue';
    items: Array<{
      value: string | number;
      status: 'default' | 'top' | 'popped' | 'pushed';
    }>;
  };
  hashMapState?: {
    entries: Array<{
      key: string | number;
      value: string | number;
      status: 'default' | 'accessed' | 'updated' | 'inserted';
    }>;
  };
  dpTableState?: {
    dimensions: '1D' | '2D';
    values: Array<string | number> | Array<Array<string | number>>;
    activeCell?: [number, number] | number;
    formula?: string;
  };
  heapState?: {
    type: 'min' | 'max';
    elements: Array<{
      value: number;
      status: 'default' | 'root' | 'sifting' | 'swapping';
    }>;
  };
  graphState?: {
    nodes: Array<{ id: string; label: string; status: 'unvisited' | 'visiting' | 'visited' }>;
    edges: Array<{ from: string; to: string; weight?: number; active?: boolean }>;
  };
}

export interface ProblemTrace {
  problemId: number;
  initialStep: number;
  steps: VisualizerStep[];
}

export interface VisualizerControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number; // 0.5, 1, 1.5, 2
  onNext: () => void;
  onReverse: () => void;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
  onSeek: (stepIndex: number) => void;
  onReset: () => void;
}
