---
type: skills-index
last-updated: 2026-05-05T00:00:00Z
tags: [index, skills]
---

# Skills Registry

All 15 Claude Code skills in `.claude/skills/`. Invoke any skill by typing its name in Claude Code.

## Design Pipeline

Skills that build UI from design inputs. Most require the Figma MCP for full functionality.

| Skill | Description | Figma MCP? |
|---|---|---|
| [[Skills/screen-interpreter]] | Parse any UI input (screenshot, Figma URL, text) into Screen Spec JSON | Optional |
| [[Skills/figma-wireframer]] | Create hi-fi Figma wireframes from a Screen Spec or verbal description | Required |
| [[Skills/figma-batch-builder]] | Batch-import a Figma section (max 10–15 screens) → fully wired React pages | Required |
| [[Skills/react-implementer]] | Generate production React from a Screen Spec, Figma wireframe, or description | No |
| [[Skills/design-orchestrator]] | Full pipeline: interpret → wireframe → implement → audit in one command | Partial |
| [[Skills/ux-ideator]] | **7 phases, 7 personas** — PRD → IA → lo-fi → deliberation → Rigor Matrix → delight pass → React UI | Partial |
| [[Skills/osmos-design-translator]] | **NEW (2026-05-05)** — judgment layer between broad design inspiration and Osmos-specific output | No |

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
| [[Skills/design-critic]] | Multi-agent Rigor Matrix critique — [[Personas/Priya]] · [[Personas/Arjun]] · [[Personas/Meera]] · [[Personas/Zara]] |
| [[Skills/ux-auditor]] | UX Honeycomb scoring on any screen, screenshot, or React code |

## Knowledge

| Skill | Description |
|---|---|
| [[Skills/obsidian-knowledge-graph]] | Build or rebuild this vault |

## Personas (cross-skill, first-class citizens)

The 7 personas now have full voice models with real Osmos memories. They activate across skill boundaries — design-critic personas appear in ux-ideator phases beyond the Rigor Matrix.

| Persona | Primary skill | Cross-skill activations |
|---|---|---|
| [[Personas/Noor]] | ux-ideator | — |
| [[Personas/Dev]] | ux-ideator | — |
| [[Personas/Raj]] | ux-ideator | Phase 5 fallback (revision directive) |
| [[Personas/Priya]] | design-critic | ux-ideator Phase 6 (feasibility sanity) |
| [[Personas/Arjun]] | design-critic | ux-ideator Phase 2 (research-grounded audit) |
| [[Personas/Meera]] | design-critic | ux-ideator Phase 1 (business reframe) |
| [[Personas/Zara]] | design-critic | ux-ideator Phase 5.5 (delight pass) |

See [[Personas/index]] for the full registry with relationship dynamics and Notion-grounded memory sources.

## Review Workflow (for PRs and forks)

**Before building:**
1. [[Skills/ux-ideator]] — PRD → IA → wireframes → quality gate → visual recipe → delight pass → React
2. [[Skills/design-critic]] — structured second opinion before committing
3. [[Skills/osmos-design-translator]] — invoke directly when adapting external inspiration to Osmos

**After building:**
1. [[Skills/component-reuse-enforcer]] `--no-fix` → review report → approve Tier 2 extensions
2. [[Skills/token-enforcer]] → auto-applies Tier 1/2
3. [[Skills/lineicon-enforcer]] → replaces hand-rolled SVGs
4. [[Skills/ux-auditor]] → score; re-run if < 14/21
