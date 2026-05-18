---
type: token
layer: token
name: Grid Layout
figma-node-id: "483:25240"
figma-library: "Design System OS"
figma-page: "❖Grid Layout"
tags: [token, grid, layout, spacing, columns]
png: ../Assets/Components/tokens/GridLayout.png
last-updated: 2026-05-15
---

# Grid Layout

![Grid Layout](../Assets/Components/tokens/GridLayout.png)

Layout grid reference defining column counts, gutter widths, and margin spacing across breakpoints. Used to ensure consistent page-level layout structure across all dashboard screens.

## Grid Specs

| Breakpoint | Columns | Gutter | Margin |
|-----------|---------|--------|--------|
| Desktop (≥1280px) | 12 | 24px | 24px |
| Tablet (768–1279px) | 8 | 16px | 16px |
| Mobile (< 768px) | 4 | 16px | 16px |

## CSS Token Reference

```css
/* Column span helpers (use with Chakra SimpleGrid or CSS grid) */
--osmos-grid-columns: 12;
--osmos-grid-gutter: var(--osmos-spacing-6);   /* 24px */
--osmos-grid-margin: var(--osmos-spacing-6);   /* 24px */
```

## Usage Guidelines
- All dashboard content areas use 12-column desktop grid
- Card widths should snap to column spans (3, 4, 6, 8, or 12 cols)
- Use `--osmos-spacing-*` tokens for gutters — never hardcode gap values
- Sidebar (NavShell) occupies fixed 76px (closed) or 297px (open), not counted in content grid

## Related Tokens
- [[Components/tokens/Colors]] — color palette
- [[Components/tokens/Typography]] — type scale

## Figma Reference
Page: ❖Grid Layout (node `483:25240`)
Library: Design System OS
