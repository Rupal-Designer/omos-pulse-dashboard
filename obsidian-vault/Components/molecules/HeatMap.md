---
type: component
layer: molecule
name: Heat Map
figma-node-id: "190:8678"
figma-library: "Design System OS"
figma-page: "❖ Heat Map"
tags: [molecule, chart, heatmap, analytics, visualization]
png: ../Assets/Components/molecules/HeatMap.png
last-updated: 2026-05-15
---

# Heat Map

![Heat Map](../Assets/Components/molecules/HeatMap.png)

Grid-based data visualization component that encodes values as color intensity. Used to surface patterns across two-dimensional datasets (e.g., day × hour traffic, product × region performance).

## Variants

| Variant | Description |
|---------|-------------|
| Day/Hour | Weekday columns × time-of-day rows |
| Category grid | Custom row/column axis labels |
| Compact | Reduced cell size for dense data |

## Props / API

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| data | number[][] | — | 2D array of values |
| xLabels | string[] | — | Column labels |
| yLabels | string[] | — | Row labels |
| colorScale | string[] | DS palette | Low → high intensity colors |
| tooltip | boolean | true | Show value on hover |

## Usage Guidelines
- Use for time-pattern analytics (e.g., ad performance by day/hour)
- Always include a color legend below the chart
- Not suitable for small datasets — use [[Components/organisms/DataCharts]] for single-series data

## Related Components
- [[Components/organisms/DataCharts]] — Pie, budget trend, and performance trend charts
- [[Components/molecules/StatCard]] — Single KPI callout

## Figma Reference
Page: ❖ Heat Map (node `190:8678`)
Library: Design System OS
