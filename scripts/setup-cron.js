'use strict';
/**
 * Registers a daily 12:00 crontab entry to rebuild the Obsidian vault.
 * Safe to re-run — won't add duplicate entries.
 *
 * Usage: node scripts/setup-cron.js
 */

const { execSync } = require('child_process');
const path = require('path');
const os   = require('os');

const repoRoot   = path.resolve(__dirname, '..');
const scriptPath = path.join(repoRoot, 'scripts', 'rebuild-vault.sh');
const logPath    = path.join(repoRoot, '.claude', 'vault-rebuild.log');

// Make the rebuild script executable
try {
  execSync(`chmod +x "${scriptPath}"`);
} catch (_) {}

const cronEntry = `0 12 * * * "${scriptPath}" >> "${logPath}" 2>&1`;
const marker    = 'rebuild-vault.sh'; // uniqueness check

// Read existing crontab (empty string if none)
let existing = '';
try {
  existing = execSync('crontab -l 2>/dev/null', { encoding: 'utf8' });
} catch (_) {}

if (existing.includes(marker)) {
  console.log('[setup-cron] Vault rebuild cron already registered — nothing to do.');
  process.exit(0);
}

const updated = existing.trimEnd() + (existing ? '\n' : '') + cronEntry + '\n';

try {
  execSync(`echo ${JSON.stringify(updated)} | crontab -`);
  console.log('[setup-cron] Registered: vault rebuild daily at 12:00.');
  console.log(`             Script : ${scriptPath}`);
  console.log(`             Log    : ${logPath}`);
} catch (err) {
  console.error('[setup-cron] Failed to register crontab:', err.message);
  console.error('             Run manually: crontab -e');
  console.error(`             Add: ${cronEntry}`);
  process.exit(1);
}
