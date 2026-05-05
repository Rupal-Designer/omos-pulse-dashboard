# Evolved Personas — Integration Guide

## What changed

Two persona files evolved from knowledge-only libraries to voice + knowledge models:

1. **noor.md** — Added Part 1 (Voice Model): 7 background memories, 25 voice samples across 7 contexts, vocabulary signature, 8 strong opinions with change conditions, 5 failure modes, relationship dynamics with Dev. Part 2 now references the original knowledge library instead of duplicating it.

2. **priya.md** — Created from scratch (was previously inline-only in design-critic SKILL.md). Contains: 7 background memories, 20+ voice samples across 6 contexts, vocabulary signature, 6 strong opinions with change conditions, 5 failure modes, relationship dynamics with Arjun/Meera/Zara, effort estimation calibration history, domain knowledge.

## How to deploy

### Step 1: Split original noor.md

The original `references/noor.md` becomes the knowledge library only:
```
.claude/skills/ux-ideator/references/
  ├── noor.md          ← replace with evolved-personas/noor.md (voice model + pointer to knowledge)
  ├── noor-knowledge.md ← rename the CURRENT noor.md to this (the rules, patterns, research)
  ├── dev.md           ← unchanged for now
  └── raj.md           ← unchanged for now
```

### Step 2: Add priya.md to design-critic

```
.claude/skills/design-critic/references/
  └── priya.md         ← copy from evolved-personas/priya.md
```

### Step 3: Update ux-ideator/SKILL.md reference block

Change the reference files section (around line 12-16) to:
```markdown
> **Reference files** — read at the phases noted:
> - `references/noor.md` — Noor's voice model: memories, voice samples, failure modes, relationship dynamics. Read by Noor before ANY output.
> - `references/noor-knowledge.md` — Noor's IA heuristics, screen consolidation decisions, patterns, anti-patterns, research. Read by Noor at Phase 2 and Phase 3.
> - `references/dev.md` — Dev's power user workflows, density benchmarks, non-negotiables, anti-patterns. Read by Dev at the start of Phase 2 (audit flags) and Phase 3.
> - `references/raj.md` — Platform principles ranked by tie-breaking weight, known persona conflicts and resolutions, business context. Read by Raj ONLY when Stalemate Protocol activates.
```

### Step 4: Update design-critic/SKILL.md

Add to the reference loading section (around line 14):
```markdown
> **Reference files:**
> - `references/priya.md` — Priya's voice model, estimation calibration, failure modes, relationship dynamics. Read by Priya before producing the Feasibility analysis.
```

Thin out Priya's inline persona block (lines 82-108) to a pointer:
```markdown
### Agent 1: Feasibility Agent — "Priya"

> Full voice model, background, and domain knowledge: `references/priya.md`. Read it before producing output.

**Lens:** Can we actually build this? At what cost?
[keep the evaluation criteria and output format as-is]
```

## What's next

The plan calls for evolving all 7 personas in sequence with eval gates between each. Order:
1. ✅ Noor (done)
2. ✅ Priya (done)
3. Dev — next (knowledge library is strong; needs voice model + failure modes + relationship with Noor)
4. Raj — needs voice model for stalemate moments
5. Arjun — needs reference file (currently inline only)
6. Meera — needs reference file (currently inline only)
7. Zara — needs reference file (currently inline only)

After Arjun/Meera/Zara are evolved, the structural change (adding deliberation to design-critic) should be considered — the personas need to be strong enough to argue with each other before we wire them into a conflict structure.
