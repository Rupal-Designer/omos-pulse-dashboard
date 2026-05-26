---
type: component
layer: organism
name: Data Charts
figma-component-key-pie: "1f5a2899a81e6df8b07a4acc1be9f2859085767c"
figma-component-key-budget: "fb066cb99af3503809a13c98bc0363a13b32e8ff"
figma-component-key-today-trend: "cfa38b9c92d262f0e7a954057d9d09421bfdd39f"
figma-node-id: "3738:50722"
figma-library: "Design System OS"
tags: [organism, chart, data-viz, analytics, graph]
png: ../Assets/Components/organisms/DataCharts.png
last-updated: 2026-05-15
---

# Data Charts

![DataCharts](../Assets/Components/organisms/DataCharts.png)

Charting organisms used across dashboard and analytics pages. Three distinct chart types published in Design System OS.

## Components

### Pie Chart
**Key:** `1f5a2899a81e6df8b07a4acc1be9f2859085767c`
- Donut/pie slice breakdown (e.g. spend distribution by channel)
- Variants: Pie, Donut, with/without legend

### Budget Utilization Trend
**Key:** `fb066cb99af3503809a13c98bc0363a13b32e8ff`
- Line/area trend showing budget burn rate over time
- Paired x-axis = date, y-axis = spend vs. cap

### Today Performance Trend
**Key:** `cfa38b9c92d262f0e7a954057d9d09421bfdd39f`
- Real-time intraday performance line (impressions, clicks, revenue)
- Updated: 2026-03-11 (most recently updated chart in DS)

## Implementation

All charts use `packages/highchart-v2` or `packages/linechart-v2` — not raw Highcharts or recharts.

```js
import HighChart from '@onlinesales-ai/highchart-v2';
import LineChart from '@onlinesales-ai/linechart-v2';
```

## Usage Guidelines
- Dashboard KPI cards (StatCard) sit above charts — never replace one with the other
- Charts require a defined `height` prop or they render 0px
- Use empty state (`<EmptyState />`) when data is empty — don't render an empty axes frame

## Related Components
- [[Components/molecules/StatCard]] — KPI numbers without trend lines
- [[Components/molecules/KPIChip]] — compact inline metric

## Figma References
- Pie Chart: `1f5a2899a81e6df8b07a4acc1be9f2859085767c`
- Budget Utilization Trend: `fb066cb99af3503809a13c98bc0363a13b32e8ff`
- Today Performance Trend: `cfa38b9c92d262f0e7a954057d9d09421bfdd39f`
Library: Design System OS
