---
type: component
layer: organism
name: Top Bar
figma-node-id: "1605:135"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Top Bar"
tags: [organism, navigation, header, shell, topbar]
png: ../Assets/Components/organisms/TopBar.png
last-updated: 2026-05-15
---

# Top Bar

![TopBar](../Assets/Components/organisms/TopBar.png)

Application-level top bar. Contains the page title/breadcrumb on the left and global actions (notifications, user avatar, GlobalSearch) on the right. Always full-width, fixed at the top of the page content area.

## Variants

| Variant | Description |
|---------|-------------|
| Default | Title + right actions |
| With Breadcrumb | Breadcrumb trail instead of simple title |
| With Date Range | Date picker embedded in header (analytics pages) |

## Composition

| Slot | Content |
|------|---------|
| Left | Page title or Breadcrumb |
| Center | (Optional) context tabs or date range |
| Right | GlobalSearch + Notifications + Avatar |

## Usage Guidelines
- One TopBar per page — lives inside [[Components/organisms/NavShell]]
- Never add custom buttons directly to TopBar — use [[Components/molecules/Toolbar]] below it
- For analytics pages, the date range picker lives in TopBar's center slot

## Code Package
```js
import TopBar from 'packages/header-v2';
```

## Related Components
- [[Components/organisms/NavShell]] — NavShell contains TopBar + Sidebar + page content
- [[Components/molecules/GlobalSearch]] — rendered in TopBar right slot
- [[Components/molecules/Toolbar]] — page-level action bar below TopBar

## Figma Reference
Node ID: `1605:135`
Library: Design System OS
