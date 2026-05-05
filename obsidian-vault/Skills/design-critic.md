---
type: skill
name: design-critic
category: ux-research
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-05-05T00:00:00Z
tags: [skill, ux-research, multi-agent, rigor-matrix]
---

# design-critic

Multi-agent design critique that evaluates any screen, workflow, or feature across four lenses (Feasibility, UX, Business, Delight) and synthesizes findings into a **Rigor Matrix** with a crisp Verdict.

The goal is not a score. The goal is a clear answer to: *What should we build, what should we defer, and what should we kill?*

## Four agents

| Agent | Lens | Reference file |
|---|---|---|
| [[Personas/Priya]] | Feasibility — can we build it, at what cost? | `references/priya.md` |
| [[Personas/Arjun]] | UX — will users understand and love using this? | `references/arjun.md` |
| [[Personas/Meera]] | Business — does it move M%G, retention, GTM levers? | `references/meera.md` |
| [[Personas/Zara]] | Delight — wow moments, emotional tone, structural delight | `references/zara.md` |

Then a **Synthesis** agent (sometimes called "The Room") deliberates across their findings and produces the Rigor Matrix.

## Persona reference files (deployed 2026-05-05)

All 4 critic personas now have full voice models with:
- Background memories grounded in real Osmos events (Sofie 343 feedback, 143 debug tickets, 9-agent chain, Sofie Wallet pricing, M%G mechanics)
- 20+ voice samples across 6+ contexts each
- Vocabulary signature and strong opinions with change conditions
- Failure modes (when each agent gets it wrong)
- Relationship dynamics with the other 3 critics

Each agent **must read its reference file BEFORE producing output**. The reference files compound institutional knowledge — voice samples are reused across sessions for consistency.

## Design reference data per agent

| Agent | Always loads | Conditionally loads |
|---|---|---|
| Priya | `react-performance.csv` (44 patterns) | `charts.csv` if data viz, `stacks/react.csv` for impl review |
| Arjun | `ux-guidelines.csv` (99 rules), `app-interface.csv` (30 mobile rules) | `charts.csv` if charts |
| Meera | `charts.csv`, `products.csv` | `ui-reasoning.csv` (competitive), `colors.csv` (brand/trust) |
| Zara | `ux-guidelines.csv`, `styles.csv` (visual patterns) | `charts.csv`, `colors.csv`, `typography.csv` |

See `references/DESIGN-REFERENCE-LOADING.md` for full token-budget guide.

## Inputs accepted

- Description of a feature or workflow (text)
- Screenshot or photo of a screen (image path)
- Figma URL (read via `use_figma` MCP)
- Screen Spec JSON (from [[Skills/screen-interpreter]])
- React component code (file path)

## Output: Rigor Matrix

```
| Dimension   | Score | Key Finding | Recommendation | Priority |
|-------------|-------|-------------|----------------|----------|
| Feasibility | 1-5   | ...         | ...            | P0/P1/P2 |
| UX          | 1-5   | ...         | ...            | P0/P1/P2 |
| Business    | 1-5   | ...         | ...            | P0/P1/P2 |
| Delight     | 1-5   | ...         | ...            | P0/P1/P2 |

Composite Score: X/20

Conflicts: [or "agents are aligned"]
Verdict: [opinionated paragraph: build/defer/kill]
```

Score ≥ 10/20 → ship-ready. Score < 10/20 → revision pass with Raj directive.

## Cross-skill integration

- [[Skills/ux-ideator]] invokes design-critic inline at **Phase 5** as the quality gate
- [[Skills/ux-ideator]] also invokes individual agents at other phases:
  - Meera at Phase 1 (business reframe)
  - Arjun at Phase 2 (research audit)
  - Zara at Phase 5.5 (delight pass)
  - Priya at Phase 6 (feasibility sanity check)

## Arguments

| Flag | Effect |
|---|---|
| `--prd <path>` | Load PRD file/dir for business context (injected into Meera + Synthesis) |
| `--focus <feasibility\|ux\|business\|delight>` | Run only one lens |

## Used By

- [[Skills/ux-ideator]] — Phase 5 inline + Phases 1, 2, 5.5, 6 (individual agents)

## Source

`/Users/rishikeshjoshi/OMOS TEST/.claude/skills/design-critic/`
