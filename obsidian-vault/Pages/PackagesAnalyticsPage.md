---
type: page
name: PackagesAnalyticsPage
nav-id:
section: Packages
group:
screen-type: dashboard
status: wired
source-file: src/advertiser/pages/PackagesAnalyticsPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, packages, dashboard, wired, alpha]
---

# PackagesAnalyticsPage

**Section:** Packages (Alpha)
**Screen type:** dashboard

Phase 7a. Packages analytics — 6 KPI cards + area chart trend + Package Level Report table.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Icon]]
- [[Components/molecules/StatCard]]

## Notes

Uses Recharts `AreaChart` for performance trend. No dedicated nav-id — accessed via Packages sub-navigation.
