---
type: skill
name: ux-ideator
category: design-pipeline
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-05-02T00:00:00Z
tags: [skill, design-pipeline, ux-research]
---

# ux-ideator

Full-pipeline UX ideation: PRD → Information Architecture map → two competing lo-fi wireframe concepts (Noor vs Dev deliberation) → design-critic Rigor Matrix quality gate → finished React UI.

## Agents

- **Noor** — minimalist IA architect (progressive disclosure, task-first)
- **Dev** — power-user advocate (data-dense, bulk ops, keyboard shortcuts)
- **Raj** — overseer, activates only on stalemates via Stalemate Protocol

## Phases

1. PRD ingestion + knowledge graph context
2. IA map (Noor proposes, Dev audits)
3. Lo-fi wireframes (Concept A vs Concept B)
4. Deliberation (5 dimensions, 4 rounds)
5. [[Skills/design-critic]] inline Rigor Matrix quality gate
6. [[Skills/figma-wireframer]] → [[Skills/react-implementer]] → [[Skills/ux-auditor]]

## Key Reference

`references/ia-patterns.md` — consulted by Noor and Dev for every IA map. **§5 Layout & Spacing Guide** (added 2026-05-02): Figma-verified 20px layout rules for dashboards and drawers. Source nodes: `6:62027`, `6:77233`, `6:77154`, `6:77006` in Figma file `2Ez19zUlOmQ94LaHTw53Kx`.

## Arguments

| Flag | Effect |
|---|---|
| `--prd <path>` | Load additional PRD file |
| `--focus <ia\|lofi\|deliberation\|critique\|ui>` | Resume from a phase |
| `--concept <noor\|dev>` | Skip deliberation, commit to one concept |
| `--no-figma` | Skip figma-wireframer in Phase 6 |
