---
type: component
layer: molecule
name: Dropdown Menu
figma-component-key: "22ce992b290442c680c30a27ff64fcf1d91becc4"
figma-node-id: "1947:23250"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Dropdown Menu"
tags: [molecule, input, select, menu, overlay]
png: ../Assets/Components/molecules/DropdownMenu.png
last-updated: 2026-05-15
---

# Dropdown Menu

![DropdownMenu](../Assets/Components/molecules/DropdownMenu.png)

Trigger + floating list overlay. Used for single-select from a list of options, contextual action menus, and option pickers. When options > 5, prefer this over RadioGroup.

## Variants

| Variant | Description |
|---------|-------------|
| Select | Single-value picker (replaces native `<select>`) |
| Context Menu | Right-click / kebab action menu (no selection state) |
| Multi-select | Checkbox-inside-list for multi-pick |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| options | {label, value}[] | — | |
| value | string | — | Controlled single value |
| onChange | function | — | |
| placeholder | string | "Select..." | |
| isMulti | boolean | false | |
| disabled | boolean | false | |
| menuWidth | number | trigger width | |

## Usage Guidelines
- Use for 5+ options that would clutter the screen as RadioGroup
- Use [[Components/atoms/RadioButton]] + RadioGroup for 2–4 visible options
- In tables, contextual menus (edit, delete, view) use context-menu variant

## Code Import
```js
import { Select, Menu } from '@onlinesales-ai/ui';
```

## Related Components
- [[Components/atoms/RadioButton]] — visible options when count ≤ 4
- [[Components/molecules/Calendar]] — date-picking dropdown

## Figma Reference
Component key: `22ce992b290442c680c30a27ff64fcf1d91becc4`
Library: Design System OS
