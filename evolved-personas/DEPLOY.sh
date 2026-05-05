#!/bin/bash
# ============================================================
# DEPLOYMENT SCRIPT — Evolved Personas + Design References
# Run from: /Users/rishikeshjoshi/OMOS TEST/
# ============================================================

set -e
echo "Starting deployment..."

# --- Step 1: ux-ideator — rename originals to knowledge libraries ---
echo "Step 1: Renaming original knowledge libraries..."
if [ -f .claude/skills/ux-ideator/references/noor.md ] && ! [ -f .claude/skills/ux-ideator/references/noor-knowledge.md ]; then
  mv .claude/skills/ux-ideator/references/noor.md .claude/skills/ux-ideator/references/noor-knowledge.md
  echo "  Renamed noor.md → noor-knowledge.md"
fi
if [ -f .claude/skills/ux-ideator/references/dev.md ] && ! [ -f .claude/skills/ux-ideator/references/dev-knowledge.md ]; then
  mv .claude/skills/ux-ideator/references/dev.md .claude/skills/ux-ideator/references/dev-knowledge.md
  echo "  Renamed dev.md → dev-knowledge.md"
fi
if [ -f .claude/skills/ux-ideator/references/raj.md ] && ! [ -f .claude/skills/ux-ideator/references/raj-knowledge.md ]; then
  mv .claude/skills/ux-ideator/references/raj.md .claude/skills/ux-ideator/references/raj-knowledge.md
  echo "  Renamed raj.md → raj-knowledge.md"
fi

# --- Step 2: ux-ideator — copy evolved voice models ---
echo "Step 2: Deploying ux-ideator voice models..."
cp evolved-personas/noor.md .claude/skills/ux-ideator/references/noor.md
cp evolved-personas/dev.md .claude/skills/ux-ideator/references/dev.md
cp evolved-personas/raj.md .claude/skills/ux-ideator/references/raj.md
echo "  Copied noor.md, dev.md, raj.md"

# --- Step 3: design-critic — create references folder + copy personas ---
echo "Step 3: Deploying design-critic personas..."
mkdir -p .claude/skills/design-critic/references
cp evolved-personas/priya.md .claude/skills/design-critic/references/priya.md
cp evolved-personas/arjun.md .claude/skills/design-critic/references/arjun.md
cp evolved-personas/meera.md .claude/skills/design-critic/references/meera.md
cp evolved-personas/zara.md .claude/skills/design-critic/references/zara.md
echo "  Copied priya.md, arjun.md, meera.md, zara.md"

# --- Step 4: Copy loading guides ---
echo "Step 4: Copying design reference loading guide..."
cp evolved-personas/DESIGN-REFERENCE-LOADING.md .claude/skills/design-critic/references/DESIGN-REFERENCE-LOADING.md
cp evolved-personas/DESIGN-REFERENCE-LOADING.md .claude/skills/ux-ideator/references/DESIGN-REFERENCE-LOADING.md
echo "  Copied DESIGN-REFERENCE-LOADING.md to both skills"

# --- Step 5: Update design-critic SKILL.md ---
echo "Step 5: Updating design-critic SKILL.md..."
cp .claude/skills/design-critic/SKILL.md .claude/skills/design-critic/SKILL.md.backup
cp evolved-personas/design-critic-SKILL-UPDATED.md .claude/skills/design-critic/SKILL.md
echo "  Replaced SKILL.md (backup at SKILL.md.backup)"

# --- Done ---
echo ""
echo "✅ Deployment complete!"
echo ""
echo "Files in ux-ideator/references/:"
ls -1 .claude/skills/ux-ideator/references/
echo ""
echo "Files in design-critic/references/:"
ls -1 .claude/skills/design-critic/references/
echo ""
echo "design-critic/SKILL.md updated (backup saved)"
