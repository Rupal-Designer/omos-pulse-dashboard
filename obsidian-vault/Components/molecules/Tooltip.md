---
type: component
layer: molecule
name: Tooltip
figma-node-id: "2727:101995"
figma-library: "Design System OS"
figma-page: "❖Tooltip"
tags: [molecule, tooltip, hover, contextual-help]
png: ../Assets/Components/molecules/Tooltip.png
last-updated: 2026-05-15
---

# Tooltip

![Tooltip](../Assets/Components/molecules/Tooltip.png)

Small contextual label that appears on hover over an interactive element. Provides brief supplemental information without cluttering the UI.

## Variants

| Variant | Trigger | Position |
|---------|---------|----------|
| Default | hover | top |
| Bottom | hover | bottom |
| Left / Right | hover | side |
| Dark | hover | top — dark bg |
| With arrow | hover | any — includes caret |

## Props / API

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| label | string | — | Tooltip text content |
| placement | top\|bottom\|left\|right | top | |
| delay | number | 300 | Open delay in ms |
| children | ReactNode | — | The trigger element |

## Code Import
```js
import { Tooltip } from '@onlinesales-ai/ui';

<Tooltip label="Edit campaign">
  <IconButton icon={<EditIcon />} />
</Tooltip>
```

## Usage Guidelines
- Use for icon-only buttons that need a label
- Keep tooltip text under 10 words — longer explanations use [[Components/molecules/Popover]]
- Never put interactive content (links, buttons) inside a tooltip
- Don't use on touch-only targets — tooltips are hover-only

## Related Components
- [[Components/molecules/Popover]] — for richer contextual content with actions
- [[Components/atoms/Icon]] — typically the element being labelled

## Figma Reference
Page: ❖Tooltip (node `2727:101995`)
Library: Design System OS
