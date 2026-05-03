---
type: page
name: ProductAdsAnalyticsPage
nav-id: product-ads-analytics
section: Product Ads
group: Analytics
screen-type: dashboard
status: wired
source-file: src/retailer/components/ProductAdsAnalyticsPage.jsx
last-updated: 2026-05-02T00:00:00Z
tags: [page, product-ads, analytics, dashboard, wired]
---

# ProductAdsAnalyticsPage

**Nav ID:** `product-ads-analytics`
**Section:** Product Ads › Analytics
**Screen type:** dashboard

## Components Used

- [[Components/molecules/StatCard]] — 4-column KPI grid; `gap: 20`

## Notes

- KPI cards migrated (2026-05-02) from inline div map to `StatCard` from `src/ui/`; gap fixed 12 → 20
- Contains heatmap cells with hardcoded color computations (#fecaca, #fee2e2, #dcfce7, #bbf7d0) — these are intentional semantic values, not token violations
