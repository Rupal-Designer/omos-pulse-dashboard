---
type: component
layer: pattern
name: DataListPage
source-file: src/ui/patterns/DataListPage.jsx
figma-node: none
last-updated: 2026-05-22T00:00:00Z
tags: [pattern, ui-component]
---

# DataListPage

Standard list-page shell composing Toolbar + DataTable + Pagination + FormDrawer + EmptyState in a single bordered card container.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| toolbar | `{ left?: ReactNode, right?: ReactNode }` | — | Passed to `Toolbar`; `left` for search/filters, `right` for action buttons |
| columns | TanStack `ColumnDef[]` | `[]` | Column definitions forwarded to `DataTable` |
| data | object[] | `[]` | Row data forwarded to `DataTable` |
| isLoading | boolean | `false` | Shows a centred `SpinLoader` overlay above the table |
| pagination | `{ total, page, perPage, onChange }` | — | Omit to hide the pagination footer |
| drawer | DrawerConfig | — | Omit to suppress the `FormDrawer`; see shape below |
| empty | ReactNode | — | Rendered when `data` is empty and not loading |
| tableProps | object | — | Any extra props forwarded to `DataTable` |
| style | CSSProperties | — | Applied to the outermost container |

### DrawerConfig shape

| Key | Type | Description |
|-----|------|-------------|
| open | boolean | Controls drawer visibility |
| onClose | () => void | Dismiss handler |
| title | string | Drawer header title |
| subtitle | string | Optional subtitle |
| onSubmit | () => void | Submit handler |
| submitLabel | string | Submit button label |
| isLoading | boolean | Loading state forwarded to `FormDrawer` |
| width | number | Drawer panel width in px |
| children | ReactNode | Form fields rendered inside the drawer |

---

## Usage

```jsx
import { DataListPage } from '../../ui';

<DataListPage
  toolbar={{
    left: <SearchBar value={q} onChange={setQ} />,
    right: <Button onClick={() => setDrawerOpen(true)}>Add Item</Button>,
  }}
  columns={columnDefs}
  data={rows}
  isLoading={loading}
  pagination={{ total: 120, page, perPage: 20, onChange: setPage }}
  drawer={{
    open: drawerOpen,
    onClose: () => setDrawerOpen(false),
    title: 'Add Item',
    onSubmit: handleSave,
    children: <MyForm />,
  }}
  empty={<EmptyState title="No items yet" />}
/>
```

---

## Notes

- Container uses `height: 100%` — it fills whatever height the parent gives it.
- Pagination is hidden when the table is empty (avoids "0 of 0" confusion).
- The loading overlay is absolutely positioned inside the scroll container so the toolbar remains interactive.
- Covers the 37 app pages sharing this Toolbar + Table + Pagination structure.
- Composed from: [[Components/molecules/Toolbar]], [[Components/molecules/DataTable]], [[Components/molecules/Pagination]], [[Components/molecules/FormDrawer]], [[Components/molecules/EmptyState]], [[Components/atoms/SpinLoader]].
