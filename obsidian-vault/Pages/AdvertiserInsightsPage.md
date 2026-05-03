---
type: page
name: AdvertiserInsightsPage
nav-id: advertiser-insights
section: Analytics
group:
screen-type: dashboard
status: wired
source-file: src/retailer/components/AdvertiserInsightsPage.jsx
last-updated: 2026-04-29T18:00:00Z
tags: [page, analytics, dashboard, wired]
---

# AdvertiserInsightsPage

**Nav ID:** `advertiser-insights`
**Section:** Analytics
**Screen type:** dashboard

## Notes

High-complexity dashboard with funnel visualization, recharts bar/pie charts, and advertiser drill-down table. Contains several local component definitions (PersonaBadge, StatusBadge, icon aliases) — target for [[Skills/component-reuse-enforcer]].

## Known Token Violations

Multiple hardcoded hex colors (#ECFDF5, #FEF3C7, #059669, #D97706, #F0F4FF, #10B981, #8B5CF6) — run [[Skills/token-enforcer]].

## Figma Frames

<!-- TODO: verify -->
