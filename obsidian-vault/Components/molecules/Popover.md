---
type: component
layer: molecule
name: Popover / Informational Popup
figma-node-id: "1:2394"
figma-component-key: "f4e386989a555550494efc4f5501fa5433e49c59"
figma-alt-key: "8c575aac15dc475dd8241c0379c7b1df93606df2"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Informational Popup"
tags: [molecule, overlay, tooltip, popup, info]
png: ../Assets/Components/molecules/Popover.png
last-updated: 2026-05-15
---

# Popover / Informational Popup

![Popover](../Assets/Components/molecules/Popover.png)

Anchored floating panel triggered by hover or click. Two flavors: **Informational Popup** (rich content with optional footer) and **Popover Footers** (action-bearing popover).

## Sub-components

| Component | Key | Description |
|-----------|-----|-------------|
| Informational Popup | `f4e386989a555550494efc4f5501fa5433e49c59` | Rich hover/click popup with header + body |
| Popover - Footers | `8c575aac15dc475dd8241c0379c7b1df93606df2` | Popover with confirm/cancel footer actions |

## Variants

| Variant | Trigger | Footer |
|---------|---------|--------|
| Info only | hover | none |
| Info + action | click | CTA button |
| Confirm popover | click | confirm + cancel |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| open | boolean | false | Controlled |
| onOpenChange | function | — | `(e) => setOpen(e.open)` |
| trigger | ReactNode | — | Element that opens the popover |
| title | string | — | |
| content | ReactNode | — | |
| placement | top\|bottom\|left\|right | bottom | |

## Usage Guidelines
- Use for contextual help, metric explanations, inline editing
- Keep content ≤ 3 lines; longer content → [[Components/molecules/Drawer]]
- Never nest interactive elements inside info-only popovers

## Code Import
```js
import { Popover, HoverCard } from '@onlinesales-ai/ui';
```

## Figma Reference
Informational Popup key: `f4e386989a555550494efc4f5501fa5433e49c59`
Popover - Footers key: `8c575aac15dc475dd8241c0379c7b1df93606df2`
Library: Design System OS
