'use strict';
const fs   = require('fs');
const path = require('path');

// INIT_CWD = the project root where `pnpm install` ran.
// __dirname = inside node_modules/…/claude-skills/ — wrong destination.
const projectRoot = process.env.INIT_CWD;

if (!projectRoot) {
  console.warn('[claude-skills] INIT_CWD not set — skipping install.');
  process.exit(0);
}

const src  = path.join(__dirname, 'skills');
const dest = path.join(projectRoot, '.claude', 'skills');

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to,   entry.name);
    entry.isDirectory() ? copyRecursive(s, d) : fs.copyFileSync(s, d);
  }
}

console.log(`[claude-skills] Installing to ${dest} …`);
try {
  copyRecursive(src, dest);
  console.log('[claude-skills] Done.');
} catch (err) {
  console.warn('[claude-skills] Warning:', err.message); // non-fatal
}
