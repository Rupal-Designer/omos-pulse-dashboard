---
type: component
layer: molecule
name: FormDrawer
source-file: src/ui/molecules/FormDrawer.jsx
figma-node: none
last-updated: 2026-05-25T06:30:01Z
tags: [molecule, ui-component]
---

# FormDrawer

Right-side slide panel pre-wired with a sticky Header, scrollable Body, and fixed Footer (Cancel / Submit buttons).

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Controls drawer visibility |
| onClose | () => void | — | Called when the drawer is dismissed (close trigger or Cancel button) |
| title | string | — | Drawer header title |
| subtitle | string | — | Optional subtitle / description rendered below the title |
| onSubmit | () => void | — | Called when the Submit button is clicked |
| submitLabel | string | `'Save'` | Label for the submit button |
| isLoading | boolean | `false` | Disables both buttons and dims the body with `opacity: 0.6` while saving |
| width | number | `460` | Drawer panel width in pixels (capped at `100vw`) |
| children | ReactNode | — | Form content rendered inside the scrollable body |

---

## Usage

```jsx
import { FormDrawer } from '../../ui';

<FormDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Create Advertiser"
  onSubmit={handleSubmit}
  submitLabel="Create"
  isLoading={saving}
  width={480}
>
  <FormField label="Name" required><Input /></FormField>
</FormDrawer>
```

---

## Notes

- Internally uses `Drawer` from `@rishikeshjoshi-morpheus/ui` with `D.Header`, `D.Body`, `D.Footer` sub-components.
- The body becomes non-interactive (`pointerEvents: none`) when `isLoading` is true; the submit button label changes to `'Saving…'`.
- This component replaced 15+ inline drawer implementations that each duplicated the overlay + panel + field layout structure.
- For drawers that do not need a form footer, use the lower-level [[Components/molecules/Drawer]] directly.
