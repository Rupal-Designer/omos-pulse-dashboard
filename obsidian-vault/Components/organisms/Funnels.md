---
type: component
layer: organism
name: Funnels
figma-node-id: "841:21962"
figma-library: "Design System OS"
figma-page: "❖ Funnels"
tags: [organism, funnel, analytics, chart, conversion]
png: ../Assets/Components/organisms/Funnels.png
last-updated: 2026-05-15
---

# Funnels

![Funnels](../Assets/Components/organisms/Funnels.png)

Multi-stage conversion funnel visualization. Renders each stage as a tapered bar with absolute and percentage metrics, showing drop-off between steps. Used in campaign analytics to trace impressions → clicks → conversions.

## Variants

| Variant | Description |
|---------|-------------|
| Vertical funnel | Stacked stages top-to-bottom |
| Horizontal funnel | Left-to-right stage flow |
| Mini funnel | Compact inline funnel chip |

## Typical Stages

| Stage | Metric |
|-------|--------|
| Impressions | Total ad views |
| Clicks | CTR-qualified visits |
| Add to cart | Intent actions |
| Conversions | Completed purchases |

## Usage Guidelines
- Always label each stage with an absolute value and relative % of top
- Use 3–6 stages max — more stages lose readability
- Pair with [[Components/molecules/StatCard]] for headline metrics above the funnel
- Used in Product Ads and Sponsorship analytics screens

## Related Components
- [[Components/organisms/DataCharts]] — pie and trend charts
- [[Components/molecules/StatCard]] — KPI headline cards
- [[Pages/ProductAdsDashboardPage]] — primary host

## Figma Reference
Page: ❖ Funnels (node `841:21962`)
Library: Design System OS
