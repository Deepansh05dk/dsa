/**
 * Standalone Test Runner Script for LeetCode 150 Revision E2E Test Suite
 * Usage:
 *   node tests/runner.ts               (Runs all 4 tiers)
 *   node tests/runner.ts --tier=1      (Runs Tier 1 Feature Coverage)
 *   node tests/runner.ts --tier=2      (Runs Tier 2 Boundary Controls)
 *   node tests/runner.ts --tier=3      (Runs Tier 3 Cross-Feature Interactions)
 *   node tests/runner.ts --tier=4      (Runs Tier 4 Real-World Application Workloads)
 */

import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

interface TierConfig {
  tierNumber: number;
  name: string;
  file: string;
  description: string;
}

const TIERS: TierConfig[] = [
  {
    tierNumber: 1,
    name: 'Tier 1: Feature Coverage',
    file: 'tests/e2e/tier1-feature-coverage.test.ts',
    description: '150 Problems catalog, Brute Force & Optimal solutions, why optimal is preferred, 23 patterns'
  },
  {
    tierNumber: 2,
    name: 'Tier 2: Boundary & Corner Cases',
    file: 'tests/e2e/tier2-boundary-controls.test.ts',
    description: 'Visualizer controls clamping (step 0 reverse, max step next), reset, seek bounds, rapid clicks'
  },
  {
    tierNumber: 3,
    name: 'Tier 3: Cross-Feature Interactions',
    file: 'tests/e2e/tier3-cross-feature.test.ts',
    description: 'Pattern categorization, Global Search (⌘K) matching, difficulty filters, tab switching'
  },
  {
    tierNumber: 4,
    name: 'Tier 4: Real-World Application Scenarios',
    file: 'tests/e2e/tier4-real-world-workload.test.ts',
    description: 'Candidate interview study walkthroughs: sprint, hard problem drills, 23-pattern survey'
  }
];

function parseArguments(): { selectedTier?: number; help: boolean } {
  const args = process.argv.slice(2);
  let selectedTier: number | undefined;
  let help = false;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      help = true;
    } else if (arg.startsWith('--tier=')) {
      const num = parseInt(arg.replace('--tier=', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= 4) {
        selectedTier = num;
      }
    }
  }

  return { selectedTier, help };
}

function printBanner() {
  console.log('\n================================================================');
  console.log('       LEETCODE 150 REVISION PLATFORM — E2E TEST RUNNER         ');
  console.log('================================================================');
  console.log('Test Philosophy: Opaque-box, requirement-driven verification');
  console.log('Authoritative Source: ORIGINAL_REQUEST.md & PROJECT.md');
  console.log('================================================================\n');
}

function runTier(tier: TierConfig): { success: boolean; durationMs: number } {
  console.log(`\n▶ Running ${tier.name}`);
  console.log(`  File: ${tier.file}`);
  console.log(`  Scope: ${tier.description}`);
  console.log('----------------------------------------------------------------');

  const startTime = Date.now();
  const isWindows = process.platform === 'win32';
  const npmCmd = isWindows ? 'npx.cmd' : 'npx';

  const result = spawnSync(npmCmd, ['vitest', 'run', tier.file], {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: isWindows
  });

  const durationMs = Date.now() - startTime;
  const success = result.status === 0;

  if (success) {
    console.log(`✔ ${tier.name} PASSED in ${durationMs}ms`);
  } else {
    console.error(`✘ ${tier.name} FAILED (Exit Code ${result.status})`);
  }

  return { success, durationMs };
}

function main() {
  const { selectedTier, help } = parseArguments();

  if (help) {
    console.log(`
Usage:
  node tests/runner.ts [options]

Options:
  --tier=1    Run Tier 1 (Feature Coverage)
  --tier=2    Run Tier 2 (Boundary & Corner Cases)
  --tier=3    Run Tier 3 (Cross-Feature Interactions)
  --tier=4    Run Tier 4 (Real-World Workload Scenarios)
  --help, -h  Show this help screen
    `);
    process.exit(0);
  }

  printBanner();

  const tiersToRun = selectedTier
    ? TIERS.filter((t) => t.tierNumber === selectedTier)
    : TIERS;

  const results: Array<{ tier: TierConfig; success: boolean; durationMs: number }> = [];

  for (const tier of tiersToRun) {
    const res = runTier(tier);
    results.push({ tier, ...res });
  }

  console.log('\n================================================================');
  console.log('                         TEST SUMMARY                           ');
  console.log('================================================================');

  let allPassed = true;
  for (const r of results) {
    const statusIcon = r.success ? '✔ PASS' : '✘ FAIL';
    console.log(` ${statusIcon.padEnd(8)} | ${r.tier.name.padEnd(35)} | ${r.durationMs}ms`);
    if (!r.success) allPassed = false;
  }

  console.log('================================================================');
  if (allPassed) {
    console.log('🎉 ALL TEST SUITES PASSED (100% PASS RATE)');
    console.log('================================================================\n');
    process.exit(0);
  } else {
    console.error('⚠️ ONE OR MORE TEST SUITES FAILED');
    console.log('================================================================\n');
    process.exit(1);
  }
}

main();
