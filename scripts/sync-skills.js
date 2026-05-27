'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, '.claude', 'skills');
const DEST = path.join(ROOT, 'claude-skills', 'skills');
const SKIP = new Set(['design-critic-workspace']); // eval data, not a real skill

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue; // skip .DS_Store etc.
    const s = path.join(from, entry.name);
    const d = path.join(to,   entry.name);
    entry.isDirectory() ? copyRecursive(s, d) : fs.copyFileSync(s, d);
  }
}

// Clean slate so renamed/deleted skills don't linger in the package
if (fs.existsSync(DEST)) fs.rmSync(DEST, { recursive: true, force: true });

let count = 0;
for (const entry of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (SKIP.has(entry.name)) { console.log(`  skip  ${entry.name}`); continue; }
  copyRecursive(path.join(SRC, entry.name), path.join(DEST, entry.name));
  console.log(`  copy  ${entry.name}`);
  count++;
}
console.log(`\nDone — ${count} skills synced to claude-skills/skills/`);
