# Test Infrastructure & Test Methodology

## 1. Overview & Test Philosophy

This document defines the testing architecture, methodology, and execution instructions for the **LeetCode 150 Revision Web Application in Astro JS**.

The test infrastructure is designed according to the following foundational principles:

1. **Opaque-Box Testing**:
   Tests are written strictly against the requirements specified in `ORIGINAL_REQUEST.md` and interface contracts in `PROJECT.md`. Tests validate external behavior, public contracts, and user interactions without coupling to internal implementation quirks.

2. **Requirement-Driven & Single Source of Truth**:
   Every test assertion traces directly to:
   - **R1 (Pattern Organization & Solutions)**: 150 problems across 23 patterns, Brute-Force solution, Optimal solution, explanation of *why the optimal solution is preferred*, and pattern recognition cues.
   - **R2 (Interactive Visualizations)**: Step-by-step visualizers with functional **Next Step** and **Reverse Step** controls, clamping, and data structure state representations.
   - **R3 (Vercel-Inspired UI & Ergonomics)**: Clean dark mode tokens, instant search modal (`⌘K`), tab switching, and seamless revision navigation.

3. **Progressive Testability & Decoupled Execution**:
   Tests are self-contained and run cleanly across multiple execution environments:
   - Running directly via **Vitest** (`npx vitest run tests/e2e` or `npm test`).
   - Running directly via **Node.js** (`node tests/runner.ts`) with zero external dependency requirements, enabling fast, isolated verification even before build artifacts or node_modules are finalized.

4. **Adversarial & Boundary Verification**:
   The test suite systematically probes boundary states (step limits, step 0 reverses, max step overflows, rapid clicks), search edge cases (punctuation, empty strings, case insensitivity), and complete cross-pattern walkthroughs.

---

## 2. 4-Tier Test Methodology

The E2E test suite is organized into 4 distinct testing tiers:

```
tests/e2e/
├── tier1-feature-coverage.test.ts     # Tier 1: 150 Problems, Brute/Optimal, Visualizers
├── tier2-boundary-controls.test.ts    # Tier 2: Visualizer Next/Reverse Clamping & Bounds
├── tier3-cross-feature.test.ts        # Tier 3: Pattern Categorization, Search, Tabs
└── tier4-real-world-workload.test.ts  # Tier 4: End-to-End Interview Study Scenarios
```

### Tier 1: Feature Coverage
*Target File*: `tests/e2e/tier1-feature-coverage.test.ts`
- **Catalog Totality**: Verifies that exactly **150 LeetCode problems** are defined across all **23 algorithmic patterns**.
- **Dual Solution Requirement**: Every problem has:
  - Valid `bruteForce` approach with non-empty code, time complexity, and space complexity.
  - Valid `optimal` approach with non-empty code, time complexity, and space complexity.
- **Optimal Approach Justification**: Every problem includes `optimal.whyOptimalIsPreferred` detailing the algorithmic advantage (e.g. hash table lookup vs quadratic scan, two-pointer pruning vs cubic enumeration).
- **Pattern Recognition Cues**: Every problem contains `optimal.patternInvariant` providing transferable cues for interviews ("When you see X, think Y").
- **Visualizer Dataset Presence**: Every problem contains or references an interactive step execution trace with step descriptions and state snapshots.

### Tier 2: Boundary & Corner Cases
*Target File*: `tests/e2e/tier2-boundary-controls.test.ts`
- **Reverse Step Clamping**: At step 0, triggering "Reverse Step" must clamp at step 0 without underflowing to negative indices.
- **Next Step Clamping**: At the final step (`totalSteps - 1`), triggering "Next Step" must clamp at the final step without overflowing.
- **Scrubber / Seek Bounds**: Seeking to valid indices `[0, totalSteps - 1]` transitions correctly; seeking to out-of-bounds indices is safely clamped.
- **Reset Invariant**: Triggering "Reset" from any step immediately returns state to step 0.
- **Rapid Alternating Transitions**: Simulates high-frequency forward and backward stepping without desynchronization or race conditions.
- **Single-Step Minimal Traces**: Handles boundary cases where an algorithm executes in a single state without throwing division-by-zero or scrubber NaN errors.
- **Data Structure State Continuity**: Verifies state snapshot continuity across step transitions (active pointers, window boundaries, highlights).

### Tier 3: Cross-Feature Interactions
*Target File*: `tests/e2e/tier3-cross-feature.test.ts`
- **Pattern Categorization & Filtering**:
  - Validates that all 23 patterns (Array/String, Two Pointers, Sliding Window, Matrix, Hashmap, Intervals, Stack, Linked List, Binary Tree General, Binary Tree BFS, Binary Search Tree, Graph General, Graph BFS, Trie, Backtracking, Divide & Conquer, Kadane's Algorithm, Binary Search, Heap, Bit Manipulation, Math, 1D DP, Multidimensional DP) correctly partition all 150 problems.
- **Global Search Engine (`⌘K`)**:
  - Fuzzy/substring search on problem titles (e.g. "Two Sum", "LRU Cache", "Trapping Rain Water").
  - Search by problem number (e.g. "1", "146", "42").
  - Difficulty filter ("Easy", "Medium", "Hard").
  - Pattern name filter.
  - Case-insensitive search queries.
  - Empty or non-matching queries gracefully return empty lists without runtime exceptions.
- **Solution Tab Switching**:
  - Toggling between "Optimal Approach (Recommended)", "Brute Force", and "Pattern Recognition Cues".
  - Verifies that visualizer state is preserved across tab toggles and code blocks reflect the selected approach.

### Tier 4: Real-World Application Scenarios
*Target File*: `tests/e2e/tier4-real-world-workload.test.ts`
- **Realistic Study Walkthrough 1: Fast Core Pattern Sprint**:
  - Simulates a candidate revising essential patterns (Two Pointers, Sliding Window, Stack, Linked List, Binary Search, DP).
  - Inspects brute force vs optimal tradeoffs, executes forward steps, pauses, reviews state, and advances to the next problem.
- **Realistic Study Walkthrough 2: Hard Interview Problem Deep Dive**:
  - Walkthrough of classic hard problems (#42 Trapping Rain Water, #224 Basic Calculator, #124 Binary Tree Maximum Path Sum, #127 Word Ladder).
  - Validates multi-pointer state transitions, stack evaluate operations, and tree path sum state.
- **Realistic Study Walkthrough 3: Visualizer Control Workout**:
  - Simulates intensive user interaction with visualizer controls: Next Step, Reverse Step, Scrub, Reset across various data structure types (Array, Tree, Graph, DP Table, Matrix, Stack, Hashmap).
- **Realistic Study Walkthrough 4: 23-Pattern Comprehensive Survey**:
  - Iterates through all 23 patterns, verifying that a candidate can revise at least one representative problem per pattern end-to-end without layout or state errors.

---

## 3. Coverage Thresholds & Pass/Fail Semantics

| Tier | Focus Area | Required Pass Threshold | Description |
|---|---|---|---|
| **Tier 1** | Feature Coverage | **100% (150/150 problems)** | All 150 problems must exist, satisfy schema contracts, and have brute force + optimal + whyOptimalIsPreferred + visualizer traces. |
| **Tier 2** | Boundary Controls | **100% of boundary cases** | Clamping at step 0, clamping at max step, reset, seek bounds, and rapid stepping must have zero failures. |
| **Tier 3** | Cross-Feature Interactions | **100% of interaction specs** | Search query matching, pattern filtering, tab switching, and difficulty mapping must pass completely. |
| **Tier 4** | Real-World Study Scenarios | **100% of simulated workflows** | All multi-step user revision walkthroughs must execute without errors. |

### Pass/Fail Semantics:
- **PASS**: All assertions across all 4 tiers evaluate to true. Exit code `0`.
- **FAIL**: Any individual assertion failure triggers an explicit error report with problem ID, pattern, expected contract, and observed value. Exit code `1`.

---

## 4. Test Execution Guide

### Option 1: Standalone Runner (Zero Dependencies)
Runs the test suites using Node.js directly:
```bash
node tests/runner.ts
```
Or with specific tier filters:
```bash
node tests/runner.ts --tier=1
node tests/runner.ts --tier=2
node tests/runner.ts --tier=3
node tests/runner.ts --tier=4
```

### Option 2: Vitest Test Runner
Once npm packages are installed:
```bash
npx vitest run tests/e2e
```
Or run a specific tier:
```bash
npx vitest run tests/e2e/tier1-feature-coverage.test.ts
```

### Option 3: NPM Test Script
```bash
npm test
```
