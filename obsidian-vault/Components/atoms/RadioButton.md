---
type: component
layer: atom
name: Radio Button
figma-component-key: "d671724fea1b279112262b3472580d0668c820e5"
figma-alt-key: "6a4418cab35e5c45d8e7234e7ae4fd473aa96e65"
figma-node-id: "848:10944"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Radio Button"
tags: [atom, form, selection, input]
png: ../Assets/Components/atoms/RadioButton.png
last-updated: 2026-05-15
---

# Radio Button

![RadioButton](../Assets/Components/atoms/RadioButton.png)

Single-selection control for mutually exclusive options. Always used inside a [[Components/atoms/RadioGroup]] — never in isolation.

## Variants

| Variant | Description |
|---------|-------------|
| Default | Unchecked state |
| Selected | Inner dot visible, brand-primary ring |
| Disabled | Greyed out, not interactive |
| Error | Red ring, used with validation |

## Sub-components

| Component | Key | Purpose |
|-----------|-----|---------|
| Radio Button | `d671724fea1b279112262b3472580d0668c820e5` | The circle control itself |
| Radio Label | `552a67fbc7f14bb8c245cc337ebe326e2969dda2` | Text label paired with control |
| Radio Group | `3064ef87ca3a7610abbbd6171439c6b34a67ebef` | Container for a set of options |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | string | — | Option value |
| checked | boolean | false | Controlled |
| onChange | function | — | |
| label | string | — | Label text |
| disabled | boolean | false | |
| description | string | — | Helper text below label |

## Usage Guidelines
- Use for 2–5 mutually exclusive options visible at once
- Use [[Components/molecules/DropdownMenu]] when options > 5
- Always pair with a visible label

## Code Import
```js
import { Radio, RadioGroup } from '@onlinesales-ai/ui';
```

## Related Components
- [[Components/atoms/Checkbox]] — multi-select equivalent
- [[Components/molecules/RadioCard]] — card-style radio for richer options

## Figma Reference
Component key: `d671724fea1b279112262b3472580d0668c820e5`
Library: Design System OS
