---
type: component
layer: molecule
name: DropdownMenu
source-file: src/ui/molecules/DropdownMenu.jsx
figma-node: "1947:23250"
last-updated: 2026-05-25T06:30:02Z
tags: [molecule, ui-component]
---

# DropdownMenu

Trigger-anchored dropdown with a list of action items; supports separators, icons, disabled items, and danger styling.

![[Assets/Components/molecules/DropdownMenu.png]]

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactNode | — | Element that opens the menu (rendered via `asChild`) |
| items | `Item[]` | `[]` | Array of menu item definitions (see Item shape below) |
| placement | string | `'bottom-end'` | Positioning relative to the trigger |

### Item shape

| Key | Type | Description |
|-----|------|-------------|
| label | string | Display text for the item |
| icon | ReactNode | Optional icon rendered to the left of the label |
| onClick | () => void | Click handler |
| disabled | boolean | Greys out the item and blocks clicks |
| danger | boolean | Renders the label in red (`--osmos-colors-red-500`) |
| separator | boolean | Renders a `Menu.Separator` rule instead of a clickable item |

---

## Usage

```jsx
import { DropdownMenu } from '../../ui';

<DropdownMenu
  trigger={<Button variant="ghost">Actions</Button>}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { separator: true },
    { label: 'Delete', icon: <TrashIcon />, onClick: handleDelete, danger: true },
  ]}
/>
```

---

## Notes

- Wraps `Menu` from `@rishikeshjoshi-morpheus/ui` using `.Root` + `.Trigger` + `.Content` + `.Item` + `.Separator`.
- When `item.separator` is true all other item keys are ignored for that entry.
- Item icons are rendered in a `<span>` with `opacity: 0.7` and `marginRight: 8px`.
- Figma node `1947:23250`; Figma library: Design System OS.
- For a value-selection dropdown (single or multi), use the `Select` component from the design system instead.
