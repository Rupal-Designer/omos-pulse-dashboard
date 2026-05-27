# Design Reference Loading Guide

> Maps which CSVs from `Design_skill_reference/data/` each persona loads, when, and why. This guide should be referenced by the SKILL.md files when defining reference loading.

---

## CSV Inventory

| CSV | Rows | Content | Primary Personas |
|---|---|---|---|
| `ux-guidelines.csv` | 99 | UX heuristics: nav, animation, layout, touch, interaction, accessibility, forms, feedback, performance, content, AI, spatial | Arjun, Noor, Dev |
| `app-interface.csv` | 30 | Mobile/app rules: accessibility, touch targets, navigation, feedback, forms, animation, typography, theming | Arjun, Priya |
| `charts.csv` | 25 | Chart type selection: data type → chart type, volume thresholds, color guidance, accessibility grades, library recommendations | Zara, Dev, Meera |
| `react-performance.csv` | 44 | React/Next.js patterns: async waterfalls, bundle size, server components, client state, rerender optimization, rendering, JS perf | Priya |
| `styles.csv` | 85 | Visual style patterns: effects, animation specs, accessibility, performance, implementation checklists, design system variables | Zara |
| `colors.csv` | 161 | Product-type color palettes: primary, secondary, accent, background, foreground, card, muted, border, destructive | Zara, Meera |
| `typography.csv` | 74 | Font pairings: heading + body, mood/keywords, best-for, Google Fonts URLs, Tailwind config | Zara, Noor |
| `products.csv` | 162 | Product-type → style/dashboard/landing/color recommendations | Meera, Raj |
| `ui-reasoning.csv` | 161 | Product-type-specific UI patterns: style priority, color mood, typography mood, key effects, decision rules, anti-patterns | Meera |
| `icons.csv` | — | Icon guidelines | Noor (nav/IA) |
| `landing.csv` | — | Landing page patterns | Meera (GTM) |
| `stacks/react.csv` | — | React-specific implementation patterns | Priya |
| `stacks/nextjs.csv` | — | Next.js-specific patterns | Priya |

---

## Loading by Skill Phase

### ux-ideator (Noor, Dev, Raj)

**Phase 2 — IA Map:**
- Noor loads: `ux-guidelines.csv` (nav, layout, forms, content rules), `app-interface.csv` (navigation rules)
- Dev loads: `ux-guidelines.csv` (interaction, feedback, bulk actions), `charts.csv` (data visualization for dashboards)

**Phase 3 — Lo-fi Wireframes:**
- Same as Phase 2 plus:
- Noor loads: `typography.csv` (hierarchy decisions), `products.csv` (SaaS dashboard patterns)
- Dev loads: `react-performance.csv` (interaction speed patterns)

**Phase 4 — Deliberation / Stalemate Protocol (if Raj activates):**
- Raj loads: `ux-guidelines.csv` (to verify competing claims), `charts.csv` (to check accessibility grades), `products.csv` (to check product-type conventions)

### design-critic (Priya, Arjun, Meera, Zara)

**Agent 1 — Priya (Feasibility):**
- Always loads: `react-performance.csv` (44 patterns — her primary technical reference)
- Conditional: `charts.csv` (if design includes data visualization — checks volume thresholds and library requirements), `stacks/react.csv` (if implementation-specific review)

**Agent 2 — Arjun (UX):**
- Always loads: `ux-guidelines.csv` (99 rules — his primary UX reference), `app-interface.csv` (30 mobile rules)
- Conditional: `charts.csv` (if design includes charts — checks accessibility grades)

**Agent 3 — Meera (Business):**
- Always loads: `charts.csv` (KPI visualization types for business dashboards), `products.csv` (product-type conventions for competitive context)
- Conditional: `ui-reasoning.csv` (if evaluating against competitor UX), `colors.csv` (if brand/trust assessment)

**Agent 4 — Zara (Delight):**
- Always loads: `ux-guidelines.csv` (animation, feedback, empty state rules), `styles.csv` (visual style patterns)
- Conditional: `charts.csv` (if data visualization delight), `colors.csv` (if palette assessment), `typography.csv` (if type hierarchy assessment)

---

## Token Budget Consideration

Loading all CSVs for all personas would exceed token budgets. The loading guide above is designed to be selective:
- Each persona loads 1-2 primary CSVs always + 1-2 conditionally
- The largest CSVs (styles.csv 142KB, colors.csv 32KB, products.csv 50KB) should be filtered to relevant rows, not loaded in full
- The most cost-effective CSVs to load are: `ux-guidelines.csv` (15KB, 99 high-value rules), `charts.csv` (15KB, 25 types), `react-performance.csv` (15KB, 44 patterns), `app-interface.csv` (7KB, 30 rules)
- For large CSVs, personas should reference specific row numbers from their Design Reference Index rather than loading the full file

---

## Integration with SKILL.md

Add to the reference file sections of each SKILL.md:

### ux-ideator/SKILL.md
```
> **Design reference data** — broad design intelligence loaded alongside persona knowledge:
> - `Design_skill_reference/data/ux-guidelines.csv` — 99 UX heuristics. Loaded by Noor and Dev at Phase 2-3.
> - `Design_skill_reference/data/charts.csv` — 25 chart type selection rules. Loaded by Dev at Phase 2-3.
> - `Design_skill_reference/data/react-performance.csv` — 44 React performance patterns. Loaded by Dev at Phase 3.
> - `Design_skill_reference/data/app-interface.csv` — 30 mobile/app rules. Loaded by Noor at Phase 2.
> - `Design_skill_reference/data/ux-guidelines.csv` + `charts.csv` + `products.csv` — Loaded by Raj ONLY during Stalemate Protocol.
```

### design-critic/SKILL.md
```
> **Design reference data** — loaded per agent:
> - Priya: `Design_skill_reference/data/react-performance.csv` (always) + `charts.csv` (if data viz)
> - Arjun: `Design_skill_reference/data/ux-guidelines.csv` + `app-interface.csv` (always) + `charts.csv` (if charts)
> - Meera: `Design_skill_reference/data/charts.csv` + `products.csv` (always) + `ui-reasoning.csv` (competitive)
> - Zara: `Design_skill_reference/data/ux-guidelines.csv` + `styles.csv` (always) + `charts.csv` + `colors.csv` (conditional)
```
