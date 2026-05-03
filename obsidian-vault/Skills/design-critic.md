---
type: skill
name: design-critic
category: ux-research
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-04-29T18:00:00Z
tags: [skill, ux-research, critique]
---

# design-critic

Multi-agent design critique. Four agents evaluate any screen, workflow, or feature idea, then synthesize a Rigor Matrix with a Verdict.

## Agents

- **Priya** (Feasibility) — senior engineer, 8 yrs adtech, identifies engineering blockers and infra cost
- **Arjun** (UX) — researcher with 200+ ad ops user sessions, catches friction and missing states
- **Meera** (Business) — ex-media sales, thinks in M%G and ROAS, anchors to PRD corpus
- **Zara** (Delight) — consumer-app designer, refuses to accept B2B boredom

## Output — Rigor Matrix

| Dimension | Score (1–5) | Key Finding | Recommendation | Priority |
|---|---|---|---|---|
| Feasibility | | | | P0/P1/P2 |
| UX | | | | |
| Business | | | | |
| Delight | | | | |

**Composite Score: X/20**

## Arguments

`--prd <path>` · `--focus <feasibility|ux|business|delight>`

## Used By

- [[Skills/ux-ideator]] — Phase 5 inline integration
