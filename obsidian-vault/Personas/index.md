---
type: personas-index
last-updated: 2026-05-05T00:00:00Z
tags: [index, personas, design-pipeline]
---

# Personas Registry

Seven first-person agents that drive the Osmos design pipeline. Each has a full voice model with background memories grounded in real Osmos data, voice samples across multiple contexts, vocabulary signature, strong opinions with change conditions, failure modes, and relationship dynamics.

## ux-ideator personas (Phase 2-4 deliberation)

| Persona | Role | Reference |
|---|---|---|
| [[Personas/Noor]] | Minimalist IA architect — leads Concept A | `ux-ideator/references/noor.md` + `noor-knowledge.md` |
| [[Personas/Dev]] | Power-user advocate — leads Concept B | `ux-ideator/references/dev.md` |
| [[Personas/Raj]] | Overseer / arbitrator — speaks only on stalemate | `ux-ideator/references/raj.md` |

## design-critic personas (Phase 5 Rigor Matrix)

| Persona | Lens | Reference |
|---|---|---|
| [[Personas/Priya]] | Feasibility | `design-critic/references/priya.md` |
| [[Personas/Arjun]] | UX | `design-critic/references/arjun.md` |
| [[Personas/Meera]] | Business | `design-critic/references/meera.md` |
| [[Personas/Zara]] | Delight | `design-critic/references/zara.md` |

## Cross-pipeline activation

In the expanded ux-ideator pipeline, design-critic personas now also activate at earlier phases:

| Phase | Personas active |
|---|---|
| 1. PRD Ingestion | [[Personas/Meera]] (business reframe) |
| 2. IA Map | [[Personas/Noor]] + [[Personas/Dev]] + [[Personas/Arjun]] (research audit) |
| 3. Lo-fi | [[Personas/Noor]] + [[Personas/Dev]] |
| 4. Deliberation | [[Personas/Noor]] + [[Personas/Dev]] (+ [[Personas/Raj]] on stalemate) |
| 5. Rigor Matrix | All 4 critic personas |
| 5.5. Delight | [[Personas/Zara]] |
| 6. Final UI | [[Personas/Priya]] (feasibility sanity) |

## Notion-grounding (2026-05-05)

All 7 persona memories were rewritten to cite real Osmos events, replacing fabricated fintech / consumer backstories. Sources include:

- **Campaign Debugging PRD** — 143 tickets/60 days breakdown, 9-agent chain, side-panel IA decision
- **Sofie Suggestions v2 PRD** — 343 feedback responses, <5% acceptance, 64% dismissal, 33% panel-collapse, 47-suggestion wall
- **Budgeting PRD** — "Not editable" budget type verbatim, R=5 pacing curves, 4 lifetime modes, bulk action spec
- **Sofie Pricing & Rollout** — $2-$4 daily floor, CoGS+100% markup, July 2026 transition
- **Unique GMV Tech Spec** — double-counting mechanism, M%G calculation
- **Real customer list** — Wakefern, GPA, PicknPay, FirstCry, Takealot, Mr. D, DFI/Yuu

Pre-Osmos backstories preserved as brief color, but all primary memories now cite Osmos PRDs and metrics.

## Used by

- [[Skills/ux-ideator]] — invokes 7 personas across 7 phases
- [[Skills/design-critic]] — invokes Priya, Arjun, Meera, Zara at Phase 5
