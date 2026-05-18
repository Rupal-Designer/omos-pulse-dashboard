---
type: component
layer: molecule
name: DataTable
figma-node-id: "1555:32943"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Tables & Layout"
tags: [molecule, data, table, list, grid]
png: ../Assets/Components/molecules/Table.png
last-updated: 2026-05-15
---

# DataTable

![DataTable](../Assets/Components/molecules/Table.png)

Sortable, filterable data table built on TanStack Table v8. The primary list/grid pattern across all dashboard pages. Shared via the `shared-DataTable` component exported from `src/ui/`.

## Variants

| Variant | Description |
|---------|-------------|
| Default | White rows, header with sort icons |
| Compact | Reduced row height (32px vs 48px) |
| Striped | Alternating row tones (disabled per spec — uniform bg only) |
| Selectable | Checkbox column at left for bulk actions |
| Loading | Skeleton rows while data fetches |

## Column Config

```js
const columns = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <Badge status={row.original.status} /> },
];
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| data | any[] | — | Row data array |
| columns | ColumnDef[] | — | TanStack column definitions |
| isLoading | boolean | false | Shows skeleton |
| onRowClick | function | — | Optional row click handler |
| selectable | boolean | false | Enables checkbox column |
| emptyState | ReactNode | — | Custom empty state |

## Usage Guidelines
- Always use `DataTable` — never hand-roll a `<table>` element
- Pagination via [[Components/molecules/Pagination]] below the table
- Filter via [[Components/molecules/Filter]] above in [[Components/molecules/Toolbar]]

## Code Import
```js
import { DataTable } from '../../ui';
// or:
import DataTable from 'packages/react-table-v2';
```

## Related Components
- [[Components/molecules/Toolbar]] — sits above DataTable
- [[Components/molecules/Pagination]] — sits below DataTable
- [[Components/atoms/Checkbox]] — row selection
- [[Components/atoms/Badge]] — status cells

## Figma Reference
Node ID: `1555:32943`
Library: Design System OS
