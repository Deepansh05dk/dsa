import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const astroDir = path.join(distDir, '_astro');
const distSwPath = path.join(distDir, 'sw.js');
const publicSwPath = path.resolve('public', 'sw.js');

if (!fs.existsSync(astroDir)) {
  console.log('[inject-sw-assets] No _astro directory found in dist. Skipping.');
  process.exit(0);
}

// Collect all JS, CSS, and WOFF2 bundles
const files = fs.readdirSync(astroDir);
const bundles = files
  .filter((f) => f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.woff2'))
  .map((f) => `_astro/${f}`);

console.log(`[inject-sw-assets] Found ${bundles.length} asset bundles in dist/_astro`);

function updateSwFile(swPath) {
  if (!fs.existsSync(swPath)) return;
  let content = fs.readFileSync(swPath, 'utf8');

  const bundleListJs = JSON.stringify(bundles, null, 2);
  const bundleCode = `const ASTRO_BUNDLE_PATHS = ${bundleListJs};\n`;

  if (content.includes('const ASTRO_BUNDLE_PATHS =')) {
    content = content.replace(/const ASTRO_BUNDLE_PATHS = \[[\s\S]*?\];\n/, bundleCode);
  } else {
    content = bundleCode + content;
  }

  fs.writeFileSync(swPath, content, 'utf8');
  console.log(`[inject-sw-assets] Updated bundle manifest in ${swPath}`);
}

updateSwFile(distSwPath);
updateSwFile(publicSwPath);
