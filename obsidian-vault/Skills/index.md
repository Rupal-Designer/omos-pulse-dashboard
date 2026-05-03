---
type: skills-index
last-updated: 2026-04-29T18:00:00Z
tags: [index, skills]
---

# Skills Registry

All 13 Claude Code skills in `.claude/skills/`. Invoke any skill by typing its name in Claude Code.

## Design Pipeline

Skills that build UI from design inputs. Most require the Figma MCP for full functionality.

| Skill | Description | Figma MCP? |
|---|---|---|
| [[Skills/screen-interpreter]] | Parse any UI input (screenshot, Figma URL, text) into Screen Spec JSON | Optional |
| [[Skills/figma-wireframer]] | Create hi-fi Figma wireframes from a Screen Spec or verbal description | Required |
| [[Skills/figma-batch-builder]] | Batch-import a Figma section (max 10–15 screens) → fully wired React pages | Required |
| [[Skills/react-implementer]] | Generate production React from a Screen Spec, Figma wireframe, or description | No |
| [[Skills/design-orchestrator]] | Full pipeline: interpret → wireframe → implement → audit in one command | Partial |
| [[Skills/ux-ideator]] | PRD → IA map → lo-fi concepts (Noor vs Dev) → Rigor Matrix → React UI | Partial |

## Code Quality

Skills that audit and fix the codebase. No external tools required.

| Skill | What it catches | Auto-fixes? |
|---|---|---|
| [[Skills/token-enforcer]] | Hardcoded hex/rgb colors, px sizes — replaces with `var(--osmos-*)` | Yes (Tier 1/2) |
| [[Skills/lineicon-enforcer]] | Hand-rolled `<svg>` icons — replaces with named exports from `src/ui/atoms/Icon.jsx` | Yes |
| [[Skills/component-reuse-enforcer]] | Local components duplicating `src/ui/` — extends library with Figma-style variants | Tier 1 yes; Tier 2 asks |
| [[Skills/shadcn-to-osmos]] | Migrates `src/advertiser/` shadcn/Tailwind pages to Osmos `src/ui/` components | Partial |

## UX Research

| Skill | Description |
|---|---|
| [[Skills/design-critic]] | Multi-agent Rigor Matrix critique — Priya (feasibility) · Arjun (UX) · Meera (business) · Zara (delight) |
| [[Skills/ux-auditor]] | UX Honeycomb scoring on any screen, screenshot, or React code |

## Knowledge

| Skill | Description |
|---|---|
| [[Skills/obsidian-knowledge-graph]] | Build or rebuild this vault |

## Review Workflow (for PRs and forks)

**Before building:**
1. [[Skills/ux-ideator]] — PRD → IA → wireframes → quality gate
2. [[Skills/design-critic]] — structured second opinion before committing

**After building:**
1. [[Skills/component-reuse-enforcer]] `--no-fix` → review report → approve Tier 2 extensions
2. [[Skills/token-enforcer]] → auto-applies Tier 1/2
3. [[Skills/lineicon-enforcer]] → replaces hand-rolled SVGs
4. [[Skills/ux-auditor]] → score; re-run if < 14/21
