---
type: component
layer: atom
name: Input
figma-component-key: "2952:69107"
figma-node-id: "2952:69107"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Input Fields"
tags: [atom, ui-component, form, interactive]
source-file: src/ui/atoms/Input.jsx
export-name: Input
png: ../Assets/Components/atoms/Input.png
last-updated: 2026-05-25T06:30:04Z
---

# Input

![Input](../Assets/Components/atoms/Input.png)

Text input field with label and optional required indicator. Same file also exports `Select` (dropdown).

## Import

```js
import { Input, Select } from '../../ui';
```

## Props — Input

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| label | string | — | Renders above input |
| value | string | — | |
| onChange | function | — | |
| placeholder | string | — | |
| type | text\|email\|number\|password | text | |
| required | boolean | false | Appends red * to label |
| disabled | boolean | false | opacity 0.5 |
| style | object | — | Wrapper div styles |
| inputStyle | object | — | Input element styles |

## Props — Select

Same as Input plus:

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| options | [{value, label}] | — | Dropdown options |

## Used By

- Drawer forms across all data-management-list pages
<!-- TODO: verify via import scan -->
