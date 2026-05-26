---
type: component
layer: molecule
name: FormField
source-file: src/ui/molecules/FormField.jsx
figma-node: none
last-updated: 2026-05-25T06:30:04Z
tags: [molecule, ui-component]
---

# FormField

Label + input + hint/error wrapper that standardises form field layout across the app.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | — | Field label text rendered above the input |
| required | boolean | — | Appends a red `*` to the label when true |
| hint | string | — | Helper text shown below the input (hidden when `error` is set) |
| error | string | — | Error message; also adds a red outline around the child input |
| children | ReactNode | — | The input control(s) to wrap |
| style | CSSProperties | — | Additional styles applied to the outermost container |

---

## Usage

```jsx
import { FormField } from '../../ui';

// Basic
<FormField label="Store ID" required hint="Enter your store identifier">
  <Input value={val} onChange={setVal} />
</FormField>

// With validation error
<FormField label="Email" required error="Invalid email address">
  <Input value={email} onChange={setEmail} />
</FormField>
```

---

## Notes

- `error` takes precedence over `hint` — when both are supplied, only the error message is shown.
- The error outline is applied via a wrapper `<div>` so it works with any child input component without requiring props injection.
- Bottom margin is 18 px by default; override via the `style` prop.
- Use this component instead of writing `fieldLabel` / `hint` style objects inline — it replaced 15+ duplicated drawer implementations.
