---
type: component
layer: atom
name: Toggle
source-file: src/ui/atoms/Toggle.jsx
figma-node: "925:30922"
last-updated: 2026-05-22T00:00:00Z
tags: [atom, ui-component]
---

# Toggle

Boolean on/off control (Figma name: "Toggle & Switch") for feature flags, notification preferences, and any immediate binary setting.

![[Assets/Components/atoms/Toggle.png]]

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | — | Controlled on/off state |
| onCheckedChange | `(checked: boolean) => void` | — | Called with the new boolean value when toggled |
| disabled | boolean | `false` | Prevents interaction and applies reduced opacity |
| label | string | — | Inline label text rendered via `Switch.Label` |
| size | `'sm' \| 'md'` | `'md'` | Toggle size |
| style | CSSProperties | — | Forwarded to the root `Switch` element |

---

## Usage

```jsx
import { Toggle } from '../../ui';

<Toggle
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Enable feature"
/>

// Disabled state
<Toggle checked={false} onCheckedChange={() => {}} disabled label="Read-only setting" />
```

---

## Notes

- Wraps `Switch` from `@rishikeshjoshi-morpheus/ui`. The `onCheckedChange` callback unwraps the event object so callers receive a plain `boolean` directly (not `e.checked`).
- Figma node `925:30922`; Figma page: `❖Toggle & Switch`.
- Use for settings that apply immediately on toggle — no Save button required. For conditional form sections use [[Components/atoms/Checkbox]] instead.
- Always supply a `label` so the control is accessible; if the label must be visually hidden, apply a screen-reader-only CSS class externally.
