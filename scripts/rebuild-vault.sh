#!/usr/bin/env bash
# Daily vault rebuild — processes every tracked src/ file through vault-sync.py.
# Scheduled via crontab at 12:00 daily. Logs to .claude/vault-rebuild.log.

set -euo pipefail
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

echo "=== vault rebuild $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="

find src -type f \( -name "*.jsx" -o -name "*.js" \) | while read -r f; do
  python3 scripts/vault-sync.py "$f" 2>/dev/null || true
done

echo "=== done ==="
