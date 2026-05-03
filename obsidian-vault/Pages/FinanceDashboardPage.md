---
type: page
name: FinanceDashboardPage
nav-id: finance-dashboard
section: Finance
group:
screen-type: dashboard
status: wired
source-file: src/retailer/components/FinanceDashboardPage.jsx
last-updated: 2026-05-02T00:00:00Z
tags: [page, finance, dashboard, wired]
---

# FinanceDashboardPage

**Nav ID:** `finance-dashboard`
**Section:** Finance
**Screen type:** dashboard

## Components Used

- [[Components/molecules/StatCard]] — 4-column KPI grid with `trend`/`trendDir`/`sub` props; `gap: 20`

## Notes

- KPI cards migrated (2026-05-02) from inline div map to `StatCard` from `src/ui/`
- Gap fixed 14 → 20 to match Figma spec
- Contains Advertiser Wallet Snapshot table + Recent Transactions table
