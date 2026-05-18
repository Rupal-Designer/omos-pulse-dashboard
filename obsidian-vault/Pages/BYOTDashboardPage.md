---
type: page
name: BYOTDashboardPage
nav-id: byot
section: BYOT
group:
screen-type: dashboard
status: wired
source-file: src/advertiser/pages/BYOTDashboardPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, byot, dashboard, wired, beta]
---

# BYOTDashboardPage

**Nav ID:** `byot`
**Section:** BYOT (Beta)
**Screen type:** dashboard

Phase 6 implementation. Bring Your Own Tracker — campaign + tracker management dashboard.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Button]]
- [[Components/atoms/Badge]]
- [[Components/atoms/Input]]
- [[Components/atoms/Select]]
- [[Components/atoms/Toast]]
- [[Components/atoms/Icon]]
- [[Components/molecules/SearchBar]]
- [[Components/molecules/Toolbar]]
- [[Components/molecules/Pagination]]
- [[Components/molecules/Drawer]]
- [[Components/molecules/KPIChip]]

## Key Features

- **Dual-tab table:** Campaigns tab + Trackers tab
- **Trackers tab columns:** Status toggle · Tracker Name · Destination URL · Tracker Link · Creation Date
- **Campaigns tab columns:** Status · Name · No. of Trackers · Creation Date · Link Clicks · Product Views · ATC · Orders
- **Bulk Upload CTA** + CSV validation modal + summary report
- **Campaign detail drawer** with tracker management + persistent Guides right panel

## Token Violations

Hardcoded colors: `#dc2626`, `#fff`, `#cbd5e1`, rgba overlay values. Run `/token-enforcer` to fix.
