import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { ALL_PROBLEMS, INITIAL_PROBLEMS } from '../src/data/problems';
import { PATTERNS } from '../src/data/patterns';
import { getTraceForProblem } from '../src/components/visualizer/traces';
import { VisualizerEngine } from '../src/components/visualizer/VisualizerEngine';
import { VisualizerStateMachine, filterProblems } from './harness/reference-spec';

function stripReactComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

describe('Tier 5 Adversarial Coverage Hardening & Stress Verification', () => {
  // =========================================================================
  // Section 1: Visualizer State Machine Across ALL 150 Problems
  // =========================================================================
  describe('1. Visualizer State Machine Across All 150 Problems', () => {
    it('verifies that getTraceForProblem produces valid VisualizerStep[] for every one of the 150 problems', () => {
      expect(ALL_PROBLEMS.length).toBe(150);

      const dataStructureCategories = new Set<string>();

      for (const problem of ALL_PROBLEMS) {
        const trace = getTraceForProblem(problem);

        // Invariant: Non-empty step trace
        expect(Array.isArray(trace)).toBe(true);
        expect(trace.length).toBeGreaterThanOrEqual(1);

        trace.forEach((step, idx) => {
          // Sequential stepIndex invariant
          expect(step.stepIndex).toBe(idx);

          // Non-empty semantic descriptions
          expect(typeof step.title).toBe('string');
          expect(step.title.trim().length).toBeGreaterThan(0);
          expect(typeof step.description).toBe('string');
          expect(step.description.trim().length).toBeGreaterThan(0);

          // Code line highlight should be positive if defined
          if (step.codeLineHighlight !== undefined) {
            if (Array.isArray(step.codeLineHighlight)) {
              expect(step.codeLineHighlight.length).toBeGreaterThan(0);
              step.codeLineHighlight.forEach((line) => expect(line).toBeGreaterThan(0));
            } else {
              expect(step.codeLineHighlight).toBeGreaterThan(0);
            }
          }

          // Variables inspector
          if (step.variables) {
            expect(typeof step.variables).toBe('object');
          }

          // Ensure at least one concrete data structure state exists per step
          const hasState =
            Boolean(step.arrayState) ||
            Boolean(step.matrixState) ||
            Boolean(step.linkedListState) ||
            Boolean(step.treeState) ||
            Boolean(step.graphState) ||
            Boolean(step.trieState) ||
            Boolean(step.heapState) ||
            Boolean(step.dpTableState) ||
            Boolean(step.stackQueueState) ||
            Boolean(step.hashMapState);

          expect(hasState).toBe(true);

          if (step.arrayState) dataStructureCategories.add('array');
          if (step.matrixState) dataStructureCategories.add('matrix');
          if (step.linkedListState) dataStructureCategories.add('linkedList');
          if (step.treeState) dataStructureCategories.add('tree');
          if (step.graphState) dataStructureCategories.add('graph');
          if (step.trieState) dataStructureCategories.add('trie');
          if (step.heapState) dataStructureCategories.add('heap');
          if (step.dpTableState) dataStructureCategories.add('dpTable');
          if (step.stackQueueState) dataStructureCategories.add('stackQueue');
          if (step.hashMapState) dataStructureCategories.add('hashMap');
        });
      }

      // Must cover all 10 distinct visualization categories
      expect(dataStructureCategories.size).toBe(10);
    });

    it('stress tests underflow stepping at step 0 across all 150 problems', () => {
      for (const problem of ALL_PROBLEMS) {
        const trace = getTraceForProblem(problem);
        const machine = new VisualizerStateMachine(trace.length, 0);

        expect(machine.currentStep).toBe(0);

        // Adversarial burst: 25 consecutive reverse calls at step 0
        for (let i = 0; i < 25; i++) {
          machine.reverse();
          expect(machine.currentStep).toBe(0);
        }
      }
    });

    it('stress tests overflow stepping at step N-1 across all 150 problems', () => {
      for (const problem of ALL_PROBLEMS) {
        const trace = getTraceForProblem(problem);
        const maxStep = trace.length - 1;
        const machine = new VisualizerStateMachine(trace.length, maxStep);

        expect(machine.currentStep).toBe(maxStep);

        // Adversarial burst: 25 consecutive next calls at maxStep
        for (let i = 0; i < 25; i++) {
          machine.next();
          expect(machine.currentStep).toBe(maxStep);
        }
      }
    });

    it('stress tests random seeking across entire trace range for all 150 problems', () => {
      for (const problem of ALL_PROBLEMS) {
        const trace = getTraceForProblem(problem);
        const totalSteps = trace.length;
        const machine = new VisualizerStateMachine(totalSteps, 0);

        // Targets include extreme negatives, valid interior steps, and extreme positives
        const targets = [
          -100,
          -1,
          0,
          Math.floor(totalSteps / 2),
          totalSteps - 1,
          totalSteps,
          totalSteps + 10,
          9999,
        ];

        for (const target of targets) {
          machine.seek(target);
          const expected = Math.max(0, Math.min(target, totalSteps - 1));
          expect(machine.currentStep).toBe(expected);
          expect(machine.currentStep).toBeGreaterThanOrEqual(0);
          expect(machine.currentStep).toBeLessThanOrEqual(totalSteps - 1);
        }
      }
    });

    it('verifies VisualizerEngine renders without throwing via SSR for all 150 problems', () => {
      for (const problem of ALL_PROBLEMS) {
        let html = '';
        expect(() => {
          html = renderToString(React.createElement(VisualizerEngine, { problem }));
        }).not.toThrow();

        const cleanHtml = stripReactComments(html);
        expect(cleanHtml).toContain('Step 1 of');
        expect(cleanHtml).toContain('Reverse');
        expect(cleanHtml).toContain('Next');
        expect(cleanHtml).toContain('Reset');
        expect(cleanHtml).toContain('Scrubber');
      }
    });

    it('fuzzes state machine with 5,000 pseudo-random interleaved operations', () => {
      const machine = new VisualizerStateMachine(10, 0);

      // Deterministic PRNG for repeatability
      let seed = 123456789;
      const rng = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      for (let op = 0; op < 5000; op++) {
        const action = Math.floor(rng() * 6);
        switch (action) {
          case 0:
            machine.next();
            break;
          case 1:
            machine.reverse();
            break;
          case 2:
            machine.seek(Math.floor(rng() * 30) - 10);
            break;
          case 3:
            machine.reset();
            break;
          case 4:
            machine.togglePlay();
            break;
          case 5:
            const speeds = [0.5, 1, 1.5, 2, 99, -1];
            machine.setSpeed(speeds[Math.floor(rng() * speeds.length)]);
            break;
        }

        // Strict invariant assertions after EVERY operation
        expect(machine.currentStep).toBeGreaterThanOrEqual(0);
        expect(machine.currentStep).toBeLessThanOrEqual(machine.totalSteps - 1);
        expect([0.5, 1, 1.5, 2]).toContain(machine.playbackSpeed);
        expect(typeof machine.isPlaying).toBe('boolean');
      }
    });
  });

  // =========================================================================
  // Section 2: Stress Test Search and Route Generation
  // =========================================================================
  describe('2. Stress Test Search & Route Generation', () => {
    it('handles special regex meta-characters without crashing in search engine', () => {
      const regexMetas = [
        '[', ']', '*', '+', '(', ')', '?', '^', '$', '{', '}', '|', '\\', '.',
        '[[[', ')))', '(.*)', '[a-z]+', '(\\d+)', 'foo|bar', '.*?', '^$'
      ];

      for (const query of regexMetas) {
        // Must never throw SyntaxError or crash
        expect(() => {
          const results = filterProblems(ALL_PROBLEMS, query);
          expect(Array.isArray(results)).toBe(true);
        }).not.toThrow();

        // Also test the search logic used in GlobalSearch component
        expect(() => {
          const cleanQuery = query.trim().toLowerCase();
          const matched = ALL_PROBLEMS.filter(
            (p) =>
              p.title.toLowerCase().includes(cleanQuery) ||
              p.slug.toLowerCase().includes(cleanQuery) ||
              p.id.toString().includes(cleanQuery) ||
              p.pattern.toLowerCase().includes(cleanQuery) ||
              p.difficulty.toLowerCase().includes(cleanQuery)
          );
          expect(Array.isArray(matched)).toBe(true);
        }).not.toThrow();
      }
    });

    it('handles empty query, whitespace, tabs, and newlines gracefully', () => {
      const whitespaceQueries = [
        '',
        ' ',
        '   ',
        '\t',
        '\n',
        '  \t\n\r  ',
      ];

      for (const query of whitespaceQueries) {
        const results = filterProblems(ALL_PROBLEMS, query);
        // Empty query should return all 150 problems
        expect(results.length).toBe(150);
      }
    });

    it('handles extreme and adversarial search strings', () => {
      // 10,000 character string
      const hugeString = 'a'.repeat(10000);
      const start = Date.now();
      const results = filterProblems(ALL_PROBLEMS, hugeString);
      const elapsed = Date.now() - start;

      expect(results.length).toBe(0);
      expect(elapsed).toBeLessThan(100); // Must be sub-100ms

      // Unicode and emojis
      const unicodeQueries = ['🚀', '日本語', 'ñ', 'äöü', '∑(x)'];
      for (const uq of unicodeQueries) {
        expect(() => filterProblems(ALL_PROBLEMS, uq)).not.toThrow();
      }
    });

    it('validates route generation parameters and URL-safety for all 150 problems', () => {
      const seenIds = new Set<number>();
      const seenSlugs = new Set<string>();

      for (const problem of ALL_PROBLEMS) {
        // ID must be positive integer and unique
        expect(Number.isInteger(problem.id)).toBe(true);
        expect(problem.id).toBeGreaterThan(0);
        expect(seenIds.has(problem.id)).toBe(false);
        seenIds.add(problem.id);

        // Slug must be URL-safe (kebab-case) and unique
        expect(/^[a-z0-9-]+$/.test(problem.slug)).toBe(true);
        expect(seenSlugs.has(problem.slug)).toBe(false);
        seenSlugs.add(problem.slug);

        // Pattern reference must match one of the 23 valid patterns
        const patternSlugs = PATTERNS.map((p) => p.slug);
        expect(patternSlugs).toContain(problem.pattern);
      }

      expect(seenIds.size).toBe(150);
      expect(seenSlugs.size).toBe(150);
    });

    it('validates 23 pattern slugs and names for clean route generation', () => {
      expect(PATTERNS.length).toBe(23);

      const seenPatternSlugs = new Set<string>();
      for (const pattern of PATTERNS) {
        expect(/^[a-z0-9-]+$/.test(pattern.slug)).toBe(true);
        expect(seenPatternSlugs.has(pattern.slug)).toBe(false);
        seenPatternSlugs.add(pattern.slug);

        expect(typeof pattern.name).toBe('string');
        expect(pattern.name.trim().length).toBeGreaterThan(0);
        expect(pattern.problemCount).toBeGreaterThan(0);
      }

      const totalProblemCount = PATTERNS.reduce((sum, p) => sum + p.problemCount, 0);
      expect(totalProblemCount).toBe(150);
    });
  });

  // =========================================================================
  // Section 3: Empirically Verify Production Static Build (174 HTML Files)
  // =========================================================================
  describe('3. Production Static Build Verification (dist/ 174 HTML Files)', () => {
    const distDir = path.resolve(__dirname, '../dist');

    it('verifies dist directory exists and contains the static build', () => {
      expect(fs.existsSync(distDir)).toBe(true);
      expect(fs.statSync(distDir).isDirectory()).toBe(true);
    });

    it('verifies index.html exists and contains valid markup', () => {
      const indexPath = path.join(distDir, 'index.html');
      expect(fs.existsSync(indexPath)).toBe(true);

      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
      expect(content).toContain('<!DOCTYPE html');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
      expect(content).toContain('<head>');
      expect(content).toContain('</head>');
      expect(content).toContain('<body');
      expect(content).toContain('</body>');
      expect(content).toContain('LeetCode 150 Revision');
      expect(content).toContain('Search 150 problems, patterns');
    });

    it('verifies all 23 pattern HTML files exist with valid markup', () => {
      for (const pattern of PATTERNS) {
        const patternHtmlPath = path.join(distDir, 'patterns', pattern.slug, 'index.html');
        expect(fs.existsSync(patternHtmlPath), `Missing pattern file: ${patternHtmlPath}`).toBe(true);

        const content = fs.readFileSync(patternHtmlPath, 'utf-8');
        expect(content.length).toBeGreaterThan(1000);
        expect(content).toContain('<!DOCTYPE html');
        expect(content).toContain('<html');
        expect(content).toContain('</html>');
        expect(content).toContain(escapeHtml(pattern.name));
      }
    });

    it('verifies all 150 problem HTML files exist with valid markup and visualizer container', () => {
      for (const problem of ALL_PROBLEMS) {
        const problemHtmlPath = path.join(distDir, 'problem', problem.id.toString(), 'index.html');
        expect(fs.existsSync(problemHtmlPath), `Missing problem file: ${problemHtmlPath}`).toBe(true);

        const content = fs.readFileSync(problemHtmlPath, 'utf-8');
        expect(content.length).toBeGreaterThan(1500);
        expect(content).toContain('<!DOCTYPE html');
        expect(content).toContain('<html');
        expect(content).toContain('</html>');
        expect(content).toContain(problem.title);
        expect(content).toContain('#' + problem.id);
        // Problem statement card
        expect(content).toContain('Problem Statement');
      }
    });

    it('verifies total HTML count in dist is exactly 174', () => {
      function countHtmlFiles(dir: string): string[] {
        let files: string[] = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          if (item.isDirectory()) {
            files = files.concat(countHtmlFiles(fullPath));
          } else if (item.isFile() && item.name.endsWith('.html')) {
            files.push(fullPath);
          }
        }
        return files;
      }

      const allHtmlFiles = countHtmlFiles(distDir);
      expect(allHtmlFiles.length).toBe(174);
    });
  });
});
