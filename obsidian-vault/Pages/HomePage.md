---
type: page
name: HomePage
nav-id: home
section:
group:
screen-type: dashboard
status: wired
source-file: src/retailer/components/HomePage.jsx
last-updated: 2026-05-02T00:00:00Z
tags: [page, home, dashboard, wired]
---

# HomePage (Retailer)

**Nav ID:** `home`
**Screen type:** dashboard

## Components Used

- [[Components/molecules/StatCard]] — 4-column grid with `compValue`/`compPct` props; `gap: 20`

## Notes

- Local `StatCard` definition removed (2026-05-02) — now uses `src/ui` `StatCard` directly
- `gap` fixed from 12 → 20 to match Figma spec
- Dead code `ArrowUpRightIcon` removed (was only used inside deleted local MetricCard)
- Multiple hardcoded colors (#D0D0D0, #F0F4FF, #EFEFEF) remain — run [[Skills/token-enforcer]]
