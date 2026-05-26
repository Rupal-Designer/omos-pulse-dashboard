---
type: component
layer: pattern
name: AnalyticsDashPage
source-file: src/ui/patterns/AnalyticsDashPage.jsx
figma-node: none
last-updated: 2026-05-25T06:30:06Z
tags: [pattern, ui-component]
---

# AnalyticsDashPage

KPI stat-card row + two-column chart grid + optional table slot; covers the 9 analytics pages sharing this layout.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| kpis | `KPI[]` | `[]` | Array of KPI card definitions; each spread onto `StatCard` (see shape below) |
| charts | `ChartSlot[]` | `[]` | Array of chart panel definitions (see shape below) |
| table | ReactNode | — | Optional content rendered below the chart grid (typically a `DataListPage`) |
| isLoading | boolean | `false` | When true, renders a centred `xl` SpinLoader instead of the full layout |
| style | CSSProperties | — | Applied to the root flex container |

### KPI shape (spread onto StatCard)

| Key | Type | Description |
|-----|------|-------------|
| label | string | Metric name |
| value | string | Formatted metric value (e.g. `'$42K'`) |
| trend | string | Trend label (e.g. `'+12%'`) |
| trendDir | `'up' \| 'down'` | Trend direction for colour coding |
| compPct | number | Comparison percentage (alternative to trend) |
| sub | string | Sub-label (e.g. `'vs last month'`) |

### ChartSlot shape

| Key | Type | Description |
|-----|------|-------------|
| title | string | Panel header text |
| component | ReactNode | The chart component to render |
| span | `1 \| 2` | `1` = half-width (default), `2` = full-width across both columns |

---

## Usage

```jsx
import { AnalyticsDashPage } from '../../ui';

<AnalyticsDashPage
  kpis={[
    { label: 'Revenue', value: '$42K', trend: '+12%', trendDir: 'up' },
    { label: 'Spend',   value: '$8.1K', compPct: -3.2, sub: 'vs last month' },
  ]}
  charts={[
    { title: 'Impressions', component: <LineChart />, span: 2 },
    { title: 'CTR',         component: <BarChart /> },
    { title: 'Conversions', component: <BarChart /> },
  ]}
  table={<DataListPage columns={cols} data={rows} />}
  isLoading={loading}
/>
```

---

## Notes

- KPI cards use `flex: 1 1 220px` so they wrap gracefully on narrower viewports.
- Chart grid is a fixed 2-column CSS grid; `span: 2` sets `gridColumn: '1 / -1'`.
- Chart panels have a `10px` border-radius, a `1px var(--osmos-border)` border, and an internal title bar separated by a bottom border.
- When `isLoading` is true the entire layout is replaced by a single centred spinner at `height: 320px` — no partial render.
- Composed from: [[Components/molecules/StatCard]], [[Components/atoms/SpinLoader]].
