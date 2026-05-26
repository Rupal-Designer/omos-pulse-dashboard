---
type: component
layer: atom
name: Toggle / Switch
figma-node-id: "925:30922"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Toggle & Switch"
tags: [atom, form, toggle, switch, boolean, interactive]
png: ../Assets/Components/atoms/Toggle.png
last-updated: 2026-05-15
---

# Toggle / Switch

![Toggle](../Assets/Components/atoms/Toggle.png)

Boolean on/off control. Two design variants: Toggle (rounded pill) and Switch (rectangular). Used for feature flags, notification preferences, and any binary setting.

## Variants

| Variant | Description |
|---------|-------------|
| Toggle On | Filled with brand-primary, thumb right |
| Toggle Off | Muted/gray fill, thumb left |
| Switch On | Rectangular filled |
| Switch Off | Rectangular muted |
| Disabled | Opacity 0.45, not interactive |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| checked | boolean | false | Controlled |
| onCheckedChange | function | — | `(e) => setVal(e.checked)` |
| disabled | boolean | false | |
| label | string | — | Inline label |
| size | sm\|md | md | |

## Usage Guidelines
- Use for immediate binary settings (no "Save" required — changes apply on toggle)
- Always include a label describing what is being toggled
- Don't use Toggle for conditional form sections — use [[Components/atoms/Checkbox]] instead

## Code Import
```js
import { Switch } from '@onlinesales-ai/ui';
// Usage:
<Switch checked={val} onCheckedChange={(e) => setVal(e.checked)} />
```

## Figma Reference
Node ID: `925:30922`
Library: Design System OS
