---
type: component
layer: atom
name: Checkbox
figma-component-key: "7aa1d4091cc916ef935325939dc05593ccb6b85c"
figma-node-id: "692:8204"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/check"
tags: [atom, ui-component, form, interactive, multi-select]
source-file: src/ui/atoms/Checkbox.jsx
export-name: Checkbox
png: ../Assets/Components/atoms/Checkbox.png
last-updated: 2026-05-15T06:30:04Z
---

# Checkbox

![Checkbox](../Assets/Components/atoms/Checkbox.png)

Multi-select form control. 16×16 brand-primary custom checkbox. Used in table row selection and permission matrices.

## Import

```js
import { Checkbox } from '../../ui';
// or from shared-ui:
import { Checkbox } from '@onlinesales-ai/ui';
```

## Variants

| Variant | Description |
|---------|-------------|
| Unchecked | Empty square |
| Checked | Checkmark (✓), brand-primary fill |
| Indeterminate | Dash (–), used for "select all" partial state |
| Disabled | Greyed out, pointer-events none |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| checked | boolean | — | Controlled |
| indeterminate | boolean | false | Partial-select state |
| onChange | function | — | `(e) => setVal(e.checked)` |
| label | string | — | Optional inline label |
| disabled | boolean | false | |
| style | object | — | |

## Usage Guidelines
- Use for multi-select scenarios (table rows, permission matrices, bulk actions)
- Use RadioButton for single-selection from a list
- "Select all" checkbox should use indeterminate when some but not all rows are selected

## Notes

Never hand-roll a checkbox div. Several retailer pages define a local `function Checkbox(` — run [[Skills/component-reuse-enforcer]] to replace them.

## Used By

- [[Pages/PersonaConfigPage]] — permission matrix cells

## Related Components
- [[Components/atoms/RadioButton]] — single-select equivalent
- [[Components/molecules/DataTable]] — primary host for row selection checkboxes

## Figma Reference
Component key: `7aa1d4091cc916ef935325939dc05593ccb6b85c`
Figma name in library: `check`
Library: Design System OS
