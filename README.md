# LeetCode 150 Interactive Pattern Revision Platform

An interactive revision web application built with [Astro](https://astro.build) and [React](https://react.dev), styled with a modern Vercel-inspired dark theme. It covers all **LeetCode Top Interview 150** problems, categorized by **23 core algorithmic patterns**, featuring dual brute-force and optimal complexity analyses alongside bidirectional step-by-step interactive visualizations.

🌐 **Live Demo:** [https://Deepansh05dk.github.io/dsa/](https://Deepansh05dk.github.io/dsa/)

---

## ✨ Features

- **23 Algorithmic Patterns:** Array & String, Two Pointers, Sliding Window, Matrix, Hashmap, Intervals, Stack, Linked List, Binary Tree General, Binary Tree BFS, BST, Graph General, Graph BFS, Trie, Backtracking, Divide & Conquer, Kadane's Algorithm, Binary Search, Heap, Bit Manipulation, Math, 1D DP, and Multidimensional DP.
- **150 Problem Deep Dives:** Every problem provides authentic brute-force code, optimal code, time & space Big-O complexity, detailed explanations of why the optimal approach is preferred, and transferable interview pattern recognition invariants.
- **Bidirectional Step-by-Step Visualizer:** Forward (**Next Step** `→`), backward (**Reverse Step** `←`), Play/Pause, speed adjustment (0.5x–2.0x), reset, and interactive scrubbing.
- **10 Custom Visualizer Renderers:**
  - Linked Lists (with pointer links, cycle detection badges, and fast/slow pointers)
  - Binary Trees & BSTs (hierarchical tree layouts and recursive call stacks)
  - Graphs (nodes, edges, visited queues)
  - Prefix Tries (character nodes and word terminations)
  - Dual Heaps (min/max heap structures)
  - 1D & 2D Dynamic Programming Tables (memoization recurrence states)
  - Arrays, Matrices, Stacks, and HashMaps
- **Vercel-Inspired Dark UI:** Deep monochrome design, ambient glows, Geist Sans & Geist Mono typography.
- **Global Search (`⌘K` / `Ctrl+K`):** Instant search modal across all 150 problems and 23 patterns.

---

## 🛠️ Tech Stack

- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation)
- **UI Islands:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Typography:** @fontsource/geist-sans & @fontsource/geist-mono
- **Testing:** Vitest (138 unit & integration tests) + 4-Tier E2E test harness
- **Deployment:** GitHub Pages via GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.14.1 or later)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Deepansh05dk/dsa.git
cd dsa

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

Open `http://localhost:4321/dsa/` (or `http://localhost:4321/`) in your browser.

### Build & Preview

```bash
# Compile static production build
npm run build

# Preview static build locally
npm run preview
```

### Running Tests

```bash
# Run unit & integration test suites
npm test

# Run multi-tier E2E test harness
npx tsx tests/runner.ts
```

---

## 📄 License

MIT
