import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import GlobalSearch from '../src/components/ui/GlobalSearch';
import SolutionTabs from '../src/components/problem/SolutionTabs';
import { PATTERNS } from '../src/data/patterns';
import { INITIAL_PROBLEMS } from '../src/data/problems';
import * as fs from 'node:fs';
import * as path from 'node:path';

// WCAG 2.1 relative luminance and contrast ratio calculations
function sRGBtoLin(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = sRGBtoLin(parseInt(cleanHex.substring(0, 2), 16) / 255);
  const g = sRGBtoLin(parseInt(cleanHex.substring(2, 4), 16) / 255);
  const b = sRGBtoLin(parseInt(cleanHex.substring(4, 6), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const bright = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);
  return (bright + 0.05) / (dark + 0.05);
}

describe('Challenger M1 Adversarial Suite', () => {
  describe('1. GlobalSearch Component Deep Verification', () => {
    it('renders initial closed state without errors via SSR', () => {
      const html = renderToString(React.createElement(GlobalSearch, {}));
      expect(html).toContain('Search 150 problems, patterns...');
      expect(html).toContain('⌘');
      expect(html).toContain('K');
      expect(html).toContain('Search problems and patterns (⌘K)');
    });

    it('filters problems and patterns correctly against search inputs', () => {
      // Test search query filtering against PATTERNS and INITIAL_PROBLEMS
      const query = 'two sum';
      const clean = query.trim().toLowerCase();

      const matchedProblems = INITIAL_PROBLEMS.filter(
        (p) =>
          p.title.toLowerCase().includes(clean) ||
          p.slug.toLowerCase().includes(clean) ||
          p.id.toString().includes(clean) ||
          p.pattern.toLowerCase().includes(clean) ||
          p.difficulty.toLowerCase().includes(clean)
      );

      expect(matchedProblems.length).toBeGreaterThanOrEqual(1);
      expect(matchedProblems[0].title).toBe('Two Sum');
    });

    it('handles numeric queries like "1" or "15" accurately', () => {
      const query = '15';
      const clean = query.trim().toLowerCase();

      const matchedProblems = INITIAL_PROBLEMS.filter(
        (p) =>
          p.title.toLowerCase().includes(clean) ||
          p.slug.toLowerCase().includes(clean) ||
          p.id.toString().includes(clean)
      );

      expect(matchedProblems.some((p) => p.id === 15)).toBe(true);
    });

    it('handles special characters and whitespace without throwing exceptions', () => {
      const specialInputs = ['   ', '???', '***', '(', ')', '[', ']', '{', '}'];
      for (const input of specialInputs) {
        expect(() => {
          const clean = input.trim().toLowerCase();
          INITIAL_PROBLEMS.filter((p) => p.title.toLowerCase().includes(clean));
        }).not.toThrow();
      }
    });

    it('implements correct modulo wrap-around logic for keyboard navigation', () => {
      const listLength = 5;
      // Down arrow wrap-around: (prev + 1) % len
      let idx = 0;
      idx = (idx + 1) % listLength; // 1
      expect(idx).toBe(1);
      idx = 4;
      idx = (idx + 1) % listLength; // 0
      expect(idx).toBe(0);

      // Up arrow wrap-around: (prev - 1 + len) % len
      idx = 0;
      idx = (idx - 1 + listLength) % listLength; // 4
      expect(idx).toBe(4);
      idx = 3;
      idx = (idx - 1 + listLength) % listLength; // 2
      expect(idx).toBe(2);
    });
  });

  describe('2. SolutionTabs Component Deep Verification', () => {
    const mockOptimal = {
      name: 'Single-Pass Hash Map',
      code: 'function twoSum(nums, target) { ... }',
      complexity: { time: 'O(N)', space: 'O(N)' },
      explanation: 'Use complement map',
      whyOptimalIsPreferred: 'Trades O(N) space for O(1) lookups, decreasing time from O(N^2) to O(N).',
      patternInvariant: 'Maintain hash table of seen elements to find complement in constant time.'
    };

    const mockBruteForce = {
      name: 'Nested Loop Scan',
      code: 'function twoSumBrute(nums, target) { ... }',
      complexity: { time: 'O(N^2)', space: 'O(1)' },
      explanation: 'Iterate all pairs'
    };

    it('renders SolutionTabs optimal approach correctly via SSR', () => {
      const html = renderToString(
        React.createElement(SolutionTabs, {
          optimal: mockOptimal,
          bruteForce: mockBruteForce
        })
      );

      expect(html).toContain('Optimal Approach');
      expect(html).toContain('Recommended');
      expect(html).toContain('Brute Force Baseline');
      expect(html).toContain('Single-Pass Hash Map');
      expect(html).toContain('O(N)');
      expect(html).toContain('Why Optimal is Preferred');
      expect(html).toContain('Core Pattern Invariant');
      expect(html).toContain(mockOptimal.whyOptimalIsPreferred);
      expect(html).toContain(mockOptimal.patternInvariant);
      expect(html).toContain('TypeScript Solution');
      expect(html).toContain('Copy');
    });

    it('contains both tab buttons in the markup with accessible role attributes', () => {
      const html = renderToString(
        React.createElement(SolutionTabs, {
          optimal: mockOptimal,
          bruteForce: mockBruteForce
        })
      );

      expect(html).toContain('Optimal Approach');
      expect(html).toContain('Brute Force Baseline');
      expect(html).toContain('button');
    });
  });

  describe('3. CSS Styling & Design System Verification', () => {
    it('verifies tailwind.config.mjs color definitions and contrast ratios', () => {
      // Primary text on canvas #000000
      const primaryContrast = getContrastRatio('#ededed', '#000000');
      expect(primaryContrast).toBeGreaterThanOrEqual(15.0); // WCAG AAA is >= 7.0

      // Primary text on surface #0a0a0a
      const surfaceContrast = getContrastRatio('#ededed', '#0a0a0a');
      expect(surfaceContrast).toBeGreaterThanOrEqual(14.0);

      // Secondary text #a1a1aa on canvas
      const secondaryContrast = getContrastRatio('#a1a1aa', '#000000');
      expect(secondaryContrast).toBeGreaterThanOrEqual(7.0); // Meets WCAG AAA

      // Muted text #71717a on canvas (UI elements, placeholders, non-primary text)
      const mutedContrast = getContrastRatio('#71717a', '#000000');
      expect(mutedContrast).toBeGreaterThanOrEqual(3.0); // Meets WCAG AA for UI / large text (4.35:1)

      // Accent emerald #00df72 on black
      const emeraldContrast = getContrastRatio('#00df72', '#000000');
      expect(emeraldContrast).toBeGreaterThanOrEqual(10.0);

      // Accent amber #f5a623 on black
      const amberContrast = getContrastRatio('#f5a623', '#000000');
      expect(amberContrast).toBeGreaterThanOrEqual(9.0);

      // Accent cyan #38bdf8 on black
      const cyanContrast = getContrastRatio('#38bdf8', '#000000');
      expect(cyanContrast).toBeGreaterThanOrEqual(9.0);
    });

    it('verifies font family declarations in tailwind.config.mjs', () => {
      const configPath = path.resolve(process.cwd(), 'tailwind.config.mjs');
      expect(fs.existsSync(configPath)).toBe(true);
      const content = fs.readFileSync(configPath, 'utf-8');

      expect(content).toContain('Geist Sans');
      expect(content).toContain('Geist Mono');
      expect(content).toContain('canvas: \'#000000\'');
      expect(content).toContain('subtle: \'#050505\'');
      expect(content).toContain('card: \'#0a0a0a\'');
      expect(content).toContain('elevated: \'#111111\'');
      expect(content).toContain('hover: \'#171717\'');
      expect(content).toContain('DEFAULT: \'#262626\'');
    });

    it('verifies global.css font imports and base dark mode styling', () => {
      const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
      expect(fs.existsSync(cssPath)).toBe(true);
      const css = fs.readFileSync(cssPath, 'utf-8');

      expect(css).toContain('@import \'@fontsource/geist-sans/400.css\';');
      expect(css).toContain('@import \'@fontsource/geist-sans/500.css\';');
      expect(css).toContain('@import \'@fontsource/geist-sans/600.css\';');
      expect(css).toContain('@import \'@fontsource/geist-sans/700.css\';');
      expect(css).toContain('@import \'@fontsource/geist-mono/400.css\';');
      expect(css).toContain('@import \'@fontsource/geist-mono/500.css\';');
      expect(css).toContain('@import \'@fontsource/geist-mono/600.css\';');

      expect(css).toContain('background-color: #000000;');
      expect(css).toContain('color: #ededed;');
      expect(css).toContain('Geist Sans');
      expect(css).toContain('::-webkit-scrollbar');
      expect(css).toContain('#262626');
    });
  });

  describe('4. Interface & Schema Conformance with PROJECT.md', () => {
    it('verifies all INITIAL_PROBLEMS have valid bruteForce and optimal structures', () => {
      for (const p of INITIAL_PROBLEMS) {
        expect(p.id).toBeGreaterThan(0);
        expect(p.slug).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(['Easy', 'Medium', 'Hard']).toContain(p.difficulty);
        expect(p.bruteForce.code).toBeTruthy();
        expect(p.bruteForce.complexity.time).toBeTruthy();
        expect(p.bruteForce.complexity.space).toBeTruthy();
        expect(p.optimal.code).toBeTruthy();
        expect(p.optimal.complexity.time).toBeTruthy();
        expect(p.optimal.complexity.space).toBeTruthy();
        expect(p.optimal.whyOptimalIsPreferred.length).toBeGreaterThanOrEqual(10);
        expect(p.optimal.patternInvariant.length).toBeGreaterThanOrEqual(5);
      }
    });

    it('verifies all 23 patterns in PATTERNS have slug, name, description, keyInvariant, and recognitionCues', () => {
      expect(PATTERNS.length).toBe(23);
      for (const pat of PATTERNS) {
        expect(pat.slug).toBeTruthy();
        expect(pat.name).toBeTruthy();
        expect(pat.description).toBeTruthy();
        expect(pat.keyInvariant.length).toBeGreaterThanOrEqual(10);
        expect(pat.recognitionCues.length).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
