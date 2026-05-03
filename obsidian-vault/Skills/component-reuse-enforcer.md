---
type: skill
name: component-reuse-enforcer
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-04-29T18:00:00Z
tags: [skill, code-quality, components]
---

# component-reuse-enforcer

Audits JSX files for locally-defined components that duplicate or near-duplicate exports from `src/ui/`, then enforces reuse using a Figma-style variation system.

## Tier System

| Tier | Criteria | Action |
|---|---|---|
| 1 | Exact duplicate of a `src/ui/` export | Auto-replace with import |
| 2 | Near-duplicate needing a new prop/variant | Extend `src/ui/` first, then replace |
| 3 | New component — appears in 3+ files, no `src/ui/` equivalent | Propose to user, wait for confirmation |
| 4 | Screen-specific — local state, API calls, domain logic | Skip, document reason |

## Arguments

`--file <path>` · `--dir <path>` · `--no-fix` · `--extend-library` · `--focus <ComponentName>`

## Known Tier 1 Hits (this codebase)

- `StatusBadge` in 3+ files → `<Badge status={s}>`
- `function Checkbox(` in 2 files → `Checkbox` from `src/ui/`
- `BtnPrimary`/`btnBase` style objects → `<Button variant="primary">`
- `function Ico(` in 8 files → named icon imports

## Known Tier 2 Extensions Applied

- `Drawer` — added `subtitle` prop (2026-04-29)
- `StatCard` — added `compValue` + `compPct` props (2026-04-29)

## Operates On

- [[Components/atoms/Button]]
- [[Components/atoms/Badge]]
- [[Components/molecules/Drawer]]
- [[Components/molecules/StatCard]]
- [[Components/atoms/Checkbox]]
- [[Components/atoms/Icon]] (icon aliases — also handled by [[Skills/lineicon-enforcer]])

## Highest Priority File

[[Pages/SellerAdvertiserOnboardingPage]] — contains every violation category simultaneously.
