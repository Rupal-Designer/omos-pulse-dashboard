---
type: component
layer: molecule
name: Popover
source-file: src/ui/molecules/Popover.jsx
figma-node: "1:2394"
last-updated: 2026-05-25T06:30:02Z
tags: [molecule, ui-component]
---

# Popover

Anchored floating panel triggered by a child element; supports an optional title, body content, and footer slot.

![[Assets/Components/molecules/Popover.png]]

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactNode | — | Element that opens the popover (rendered via `asChild`) |
| title | string | — | Optional bold heading inside the panel |
| content | ReactNode | — | Main body content of the popover |
| footer | ReactNode | — | Optional footer content (rendered below a top border) |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred placement relative to the trigger |
| width | number | `280` | Panel width in pixels (capped at `90vw`) |

---

## Usage

```jsx
import { Popover } from '../../ui';

// Basic info popup
<Popover
  trigger={<Button>Info</Button>}
  content={<p>Details about this field.</p>}
/>

// With title and footer action
<Popover
  trigger={<InfoIcon />}
  title="Help"
  content={<p>Learn more about this setting.</p>}
  footer={<Button size="sm">Got it</Button>}
  placement="top"
/>
```

---

## Notes

- Wraps `Popover` from `@rishikeshjoshi-morpheus/ui` using `.Root` + `.Trigger` + `.Content` + `.Body` + `.Footer` sub-components.
- Uses `lazyMount` and `unmountOnExit` — the panel DOM is not rendered until first open and is destroyed on close.
- Footer is separated from the body by a `1px var(--osmos-border)` top border; padding is 8 px top, 8 px margin-top.
- Keep body content to ≤ 3 lines; for longer content use [[Components/molecules/Drawer]] instead.
- Figma node `1:2394`; Figma library: Design System OS.
