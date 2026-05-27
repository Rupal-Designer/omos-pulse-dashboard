---
type: component
layer: pattern
name: SettingsPage
source-file: src/ui/patterns/SettingsPage.jsx
figma-node: none
last-updated: 2026-05-25T06:30:06Z
tags: [pattern, ui-component]
---

# SettingsPage

Section title + optional icon + optional tab bar + content area wrapped in a `SectionCard`; covers the 12 settings pages sharing this layout.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Page/section heading rendered inside the card header |
| icon | ReactNode | — | Optional icon rendered to the left of the title (opacity 0.7) |
| tabs | `{ id: string, label: string }[]` | `[]` | When non-empty, renders a `Tabs` bar below the card header |
| activeTab | string | — | Controlled active tab ID |
| onTabChange | `(id: string) => void` | — | Called when the user selects a different tab |
| toolbar | ReactNode | — | Optional action(s) rendered in the top-right of the card header |
| children | ReactNode | — | Page content rendered below the tab bar (or header when no tabs) |
| style | CSSProperties | — | Applied to the outermost container |

---

## Usage

```jsx
import { SettingsPage } from '../../ui';

// With tabs
<SettingsPage
  title="Account Settings"
  icon={<SettingsIcon />}
  tabs={[{ id: 'general', label: 'General' }, { id: 'billing', label: 'Billing' }]}
  activeTab={tab}
  onTabChange={setTab}
  toolbar={<Button onClick={handleSave}>Save</Button>}
>
  {tab === 'general' && <GeneralForm />}
  {tab === 'billing' && <BillingForm />}
</SettingsPage>

// Without tabs
<SettingsPage title="Notification Preferences" icon={<BellIcon />}>
  <Toggle checked={emailOn} onCheckedChange={setEmailOn} label="Email alerts" />
</SettingsPage>
```

---

## Notes

- When `tabs` is empty no `Tabs` component is rendered and children receive `paddingTop: 0`.
- The `Tabs` component sits inside `SectionCard`'s body, flush with the bottom border of the card header (bottom margin of -1 px to merge tab underline with the card border).
- `toolbar` is passed to `SectionCard`'s `titleRight` slot.
- Composed from: [[Components/molecules/SectionCard]], [[Components/molecules/Tabs]].
