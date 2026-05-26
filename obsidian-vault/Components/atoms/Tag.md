---
type: component
layer: atom
name: Tag
figma-component-key: "274c46c0ba3082231045da17e4843b2f6307fc4a"
figma-node-id: "692:5206"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/tag-01"
tags: [atom, ui-component, display, label, category, taxonomy]
source-file: src/ui/atoms/Tag.jsx
export-name: Tag
png: ../Assets/Components/atoms/Tag.png
last-updated: 2026-05-25T06:30:05Z
---

# Tag

![Tag](../Assets/Components/atoms/Tag.png)

Colored category label pill. Use for non-status category chips where the color is semantic (green = success, amber = warning, etc.). Not interactive — for interactive filters use a chip/toggle pattern.

## Import

```js
import { Tag } from '../../ui';
// or from shared-ui:
import { Tag } from '@onlinesales-ai/ui';
```

## Color Schemes

| colorScheme | Visual | Typical use |
|-------------|--------|-------------|
| green | Green bg, dark text | Active, success, live |
| amber | Amber bg, dark text | Warning, pending, paused |
| blue | Blue bg, dark text | Info, in-progress |
| gray | Gray bg, dark text | Inactive, draft, disabled |
| red | Red bg, white text | Error, rejected, revoked |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| colorScheme | green\|amber\|blue\|gray\|red | gray | |
| style | object | — | |
| children | ReactNode | — | Label text |

## Notes

Use `TypeBadge` (from [[Components/atoms/Badge]]) instead of `Tag` when the color needs to be driven by arbitrary domain data with a custom color map.

## Related Components
- [[Components/atoms/Badge]] — status pills (Active/Inactive/Paused/Live/Draft/Error)

## Figma Reference
Component key: `274c46c0ba3082231045da17e4843b2f6307fc4a`
Figma name in library: `tag-01`
Library: Design System OS
