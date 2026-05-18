---
type: component
layer: atom
name: Chips
figma-node-id: "858:62926"
figma-library: "Design System OS"
figma-page: "❖ Chips"
figma-code-name: "Badge"
tags: [atom, chip, badge, tag, filter, selection]
png: ../Assets/Components/atoms/Chips.png
last-updated: 2026-05-15
---

# Chips

![Chips](../Assets/Components/atoms/Chips.png)

Compact interactive label used for multi-select filtering, category selection, and dismissible tags. Distinct from [[Components/atoms/Badge]] (which is non-interactive status display) — Chips are tappable and often carry an `×` dismiss action.

> **Figma → Code mapping:** Figma calls these "Chips"; the code component is `Badge` from `@onlinesales-ai/ui`. See CLAUDE.md §7.

## Variants

| Variant | State | Description |
|---------|-------|-------------|
| Default | unselected | Outlined, no fill |
| Selected | active | Filled with primary color |
| Dismissible | any | Trailing `×` icon |
| With icon | any | Leading icon + label |
| Disabled | — | Greyed out, non-interactive |

## Props / API

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| variant | solid\|outline\|subtle | outline | Visual style |
| colorPalette | string | gray | DS color token |
| size | sm\|md\|lg | md | |
| closable | boolean | false | Show × dismiss button |
| onClick | function | — | Selection handler |
| onClose | function | — | Dismiss handler |

## Code Import
```js
import { Badge } from '@onlinesales-ai/ui';

// Dismissible chip
<Badge variant="outline" colorPalette="blue" closable onClose={() => remove(id)}>
  Campaign A
</Badge>
```

## Usage Guidelines
- Use in filter bars to show active filter selections
- Use in multi-select inputs to represent chosen values
- Max ~20 chars per chip label — truncate with ellipsis if needed
- Chips group: wrap in `Wrap` component to allow multi-row flow
- Don't use chips for static status display — use [[Components/atoms/Badge]] or [[Components/atoms/Tag]] instead

## Related Components
- [[Components/atoms/Badge]] — non-interactive status badge (Figma: Badges)
- [[Components/atoms/Tag]] — static labels (Figma: Tags)
- [[Components/molecules/Filter]] — filter panel that produces chips

## Figma Reference
Page: ❖ Chips (node `858:62926`)
Library: Design System OS
