---
type: page
name: DisplayAdsDashboardPage
nav-id: display-ads
section: Display Ads
group:
screen-type: dashboard
status: wired
source-file: src/advertiser/pages/DisplayAdsDashboardPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, display-ads, dashboard, wired]
---

# DisplayAdsDashboardPage

**Nav ID:** `display-ads`
**Section:** Display Ads
**Screen type:** dashboard

Phase 2. Full custom Display Ads dashboard.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Button]]
- [[Components/atoms/Badge]]
- [[Components/atoms/Icon]]
- [[Components/molecules/StatCard]]

## Key Metrics

Tagged Product Orders (SKU) · Ad Revenue · Ad Spend · Ad Impressions · Ad Clicks

## Notable Patterns

- Campaign table: Subtype column (Auction / Guaranteed) + Under Review status badge
- **INVENTORY_AUCTION** — 4-step CreateCampaignDrawer
- **INVENTORY_GUARANTEED** — 2-step booking drawer
