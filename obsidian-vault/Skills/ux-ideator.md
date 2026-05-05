---
type: skill
name: ux-ideator
category: design-pipeline
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-05-05T00:00:00Z
tags: [skill, design-pipeline, ux-research, multi-persona]
---

# ux-ideator

Full-pipeline UX ideation: PRD → IA map → lo-fi concepts → deliberation → Rigor Matrix → Osmos visual recipe → delight pass → finished React UI. **Seven phases, all seven personas active.**

As of 2026-05-05, the pipeline expanded from 6 → 7 phases with the addition of:
- **Meera business reframe** at Phase 1
- **Arjun research-grounded UX audit** at Phase 2
- **`osmos-design-translator` recipe pass** at Phase 3.5 (NEW)
- **Zara delight pass** at Phase 5.5 (NEW)
- **Priya feasibility sanity check** + **`osmos-design-translator` visual recipe** at Phase 6

## All 7 personas (when each speaks)

| Persona | Phase(s) | Reference | Role |
|---|---|---|---|
| [[Personas/Noor]] | 2, 3, 4 | `ux-ideator/references/noor.md` + `noor-knowledge.md` | Minimalist IA architect — leads IA + Concept A |
| [[Personas/Dev]] | 2, 3, 4 | `ux-ideator/references/dev.md` | Power-user advocate — audits + Concept B |
| [[Personas/Raj]] | 4 (stalemate) | `ux-ideator/references/raj.md` | Overseer — speaks ONLY when Stalemate Protocol fires |
| [[Personas/Meera]] | 1, 5 | `design-critic/references/meera.md` | Business framing — KPI mapping, segment, competitive parity |
| [[Personas/Arjun]] | 2, 5 | `design-critic/references/arjun.md` | UX research-grounded audit (Sofie 343 feedback, 143 tickets, SOPs) |
| [[Personas/Priya]] | 5, 6 | `design-critic/references/priya.md` | Feasibility — effort, state machines, dependencies, 20% lever |
| [[Personas/Zara]] | 5, 5.5 | `design-critic/references/zara.md` | Delight — adds exactly one moment OR says "no delight, speed is the craft" |

## 7-phase pipeline

| Phase | What | Personas active |
|---|---|---|
| 1. PRD Ingestion | PRD Digest + Meera business reframe | Meera |
| 2. IA Map | Noor leads, Dev audits power-user gaps, Arjun audits research-grounded gaps | Noor, Dev, Arjun (Raj on stalemate) |
| 3. Lo-fi Concepts | Concept A (Noor) + Concept B (Dev), text/ASCII only | Noor, Dev |
| **3.5. NEW** | Each concept's key surface routed through [[Skills/osmos-design-translator]] for component recipes | (translator) |
| 4. Deliberation | 5 dimensions × 4 rounds → Agreed Design | Noor, Dev (Raj on stalemate) |
| 5. design-critic | Rigor Matrix with full persona reference loading | Priya, Arjun, Meera, Zara |
| **5.5. NEW** | Zara delight pass — exactly one delight moment OR "no delight, speed is the craft" | Zara |
| 6. Final UI | Priya feasibility sanity → osmos-design-translator visual recipe → Screen Spec → Figma → React → UX Audit | Priya, all chain skills |

## Cross-skill integration

```
ux-ideator
  ├── Phase 3.5 → [[Skills/osmos-design-translator]] (component recipe per concept)
  ├── Phase 6 Step 1 → [[Skills/osmos-design-translator]] (final visual recipe)
  ├── Phase 6 Step 3 → [[Skills/figma-wireframer]] (hi-fi)
  ├── Phase 6 Step 4 → [[Skills/react-implementer]] (code)
  └── Phase 6 Step 5 → [[Skills/ux-auditor]] (Honeycomb)
```

## Reference files

### ux-ideator's own
| File | Purpose | Read when |
|---|---|---|
| `references/ia-patterns.md` | Screen taxonomy, zones, component library, nav structure, CSS tokens (incl. §5 Layout & Spacing Guide) | All agents on every IA/concept decision |
| `references/noor.md` | Noor voice model — memories, voice samples, failure modes, relationship dynamics | Noor before ANY output |
| `references/noor-knowledge.md` | Noor IA heuristics, screen consolidation decisions, patterns, anti-patterns, research | Noor at Phase 2 + 3 |
| `references/dev.md` | Dev voice model + power-user workflows, density benchmarks, non-negotiables | Dev at Phase 2 (audit) + 3 |
| `references/raj.md` | Raj voice model + platform principles, persona conflicts, business context | Raj only when Stalemate Protocol fires |

### Cross-skill (design-critic personas)
| File | Read when |
|---|---|
| `../design-critic/references/meera.md` | Phase 1 (business reframe) + Phase 5 (Rigor Matrix) |
| `../design-critic/references/arjun.md` | Phase 2 (research audit) + Phase 5 |
| `../design-critic/references/priya.md` | Phase 5 + Phase 6 (feasibility sanity) |
| `../design-critic/references/zara.md` | Phase 5 + Phase 5.5 (delight pass) |

### Design reference data (CSV)
- `Design_skill_reference/data/ux-guidelines.csv` (99 heuristics) — Noor + Dev at Phase 2-3
- `Design_skill_reference/data/charts.csv` (25 chart types) — Dev at Phase 2-3
- `Design_skill_reference/data/react-performance.csv` (44 patterns) — Priya at Phase 6
- `Design_skill_reference/data/app-interface.csv` (30 mobile rules) — Noor at Phase 2
- `Design_skill_reference/data/products.csv` + `ui-reasoning.csv` — Meera at Phase 1
- `Design_skill_reference/data/styles.csv` + `colors.csv` — Zara at Phase 5.5

## Persona grounding (Notion-grounded as of 2026-05-05)

All 7 personas now have memories grounded in real Osmos data:
- **143 debug tickets/60 days** breakdown (65 not spending, 53 keyword, 25 not responding) → Dev, Arjun, Meera
- **Sofie Suggestions v2** metrics (343 feedback, <5% acceptance, 64% dismissal, 33% panel-collapse) → Noor, Raj, Arjun, Zara
- **9-agent debugger chain** (Orchestrator → Campaign → Hygiene → Performance → Audit → Optimization → Debugger → InsightAnalyzer → UserCommunicator) → Priya, Zara, Meera
- **Budget type "Not editable"** PRD verbatim → Noor (failure mode), Raj (Rank 3 intentionality canonical example)
- **Pacing engine** R=5 curves, remaining_budget invariant → Priya, Dev
- **Sofie Wallet pricing** ($2-$4 daily floor, July 2026 transition) → Meera

## Arguments

| Flag | Effect |
|---|---|
| `--prd <path>` | Load additional PRD file beyond `docs/prd/osmos-prd-corpus.md` |
| `--focus <ia\|lofi\|deliberation\|critique\|ui>` | Resume from a phase |
| `--concept <noor\|dev>` | Skip deliberation, commit to one concept |
| `--no-figma` | Skip figma-wireframer in Phase 6 |

## Outputs

- `graphify-out/ux-ideator/[feature-slug]-prd.md` (with Meera reframe)
- `graphify-out/ux-ideator/[feature-slug]-ia-map.md`
- `graphify-out/ux-ideator/[feature-slug]-deliberation.md`
- `graphify-out/ux-ideator/[feature-slug]-rigor-matrix.md`
- `graphify-out/ux-ideator/[feature-slug]-ui-output.md` (with Zara delight pass + Priya feasibility)
- React component file in `src/retailer/` or `src/advertiser/`
- Optional: Figma file URL

## Source

`/Users/rishikeshjoshi/OMOS TEST/.claude/skills/ux-ideator/`
