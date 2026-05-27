---
type: component
layer: molecule
name: Tabs
figma-component-key: "0604a4b6b972eef2732246e1f2611c16b3a43d36"
figma-alt-key: "117bb356a54ee267d8a699d94f1a56367b568321"
figma-node-id: "69:12409"
figma-vertical-key: "12e11bf1a1297af37490a74e128e4e2d283d4fba"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Tabs"
tags: [molecule, navigation, tabs, section, vertical-tabs]
png: ../Assets/Components/molecules/Tabs.png
last-updated: 2026-05-25T06:30:02Z
source-file: src/ui/molecules/Tabs.jsx
---

# Tabs

![Tabs](../Assets/Components/molecules/Tabs.png)

Horizontal tab bar for switching between sections of a page without navigation. Two sub-components: **Tabs** (full tab strip) and **Text Tab** (individual tab item).

## Sub-components

| Component | Key | Description |
|-----------|-----|-------------|
| Tabs | `0604a4b6b972eef2732246e1f2611c16b3a43d36` | Full tab strip container |
| Text Tab | `117bb356a54ee267d8a699d94f1a56367b568321` | Individual tab item |
| Tab Item - Vertical | `12e11bf1a1297af37490a74e128e4e2d283d4fba` | Vertical tab variant |

## Variants

| Variant | Description |
|---------|-------------|
| Line | Underline active tab (default) |
| Pill | Active tab has filled background |
| Vertical | Tab items stacked vertically (sidebar nav) |

## States
Active, Inactive, Hover, Disabled

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | string | — | Active tab id |
| onValueChange | function | — | `(e) => setValue(e.value)` |
| items | {id, label, icon?}[] | — | |

## Usage Guidelines
- Max 5–6 tabs before considering a dropdown or secondary nav
- Tabs switch VIEWS, not pages — content renders below, no route change
- For route-level navigation use the sidebar ([[Components/organisms/NavShell]])

## Code Import — Horizontal (default)
```jsx
import { Tabs } from '@onlinesales-ai/ui';

<Tabs.Root value={tab} onValueChange={e => setTab(e.value)}>
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">…</Tabs.Content>
  <Tabs.Content value="settings">…</Tabs.Content>
</Tabs.Root>
```

## Vertical Tabs

The **Vertical** variant stacks tab items in a column — used for sidebar-style section navigation within a settings page or detail view. Same `Tabs` component, not a separate import.

**Figma component key:** `12e11bf1a1297af37490a74e128e4e2d283d4fba` (Tab Item - Vertical)
**Token:** `Vertical Tabs/Selection` → `Blue/Bg` (`#e8f1fc` light / `#3e3e3e` dark)

### When to use Vertical vs Horizontal

| Situation | Use |
|-----------|-----|
| In-page section switching (≤6 items, short labels) | Horizontal (Line or Pill) |
| Settings page with many sections (6+) or long labels | Vertical |
| Sidebar-within-a-page layout (left col = nav, right = content) | Vertical |
| Top-level route navigation | **Don't** — use [[Components/organisms/NavShell]] |

### Usage
```jsx
import { Tabs } from '@onlinesales-ai/ui';

<Tabs.Root
  value={section}
  onValueChange={e => setSection(e.value)}
  orientation="vertical"
>
  <Tabs.List flexDirection="column" borderRight="1px solid" borderColor="border">
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile" flex="1" pl="6">…</Tabs.Content>
  <Tabs.Content value="billing"  flex="1" pl="6">…</Tabs.Content>
  <Tabs.Content value="notifications" flex="1" pl="6">…</Tabs.Content>
</Tabs.Root>
```

> Active selection uses `var(--osmos-colors-blue-bg)` (`#e8f1fc`).

## Related Components
- [[Components/organisms/NavShell]] — route-level navigation
- [[Components/molecules/ActionItem]] — icon+label nav items

## Figma Reference
Tabs key: `0604a4b6b972eef2732246e1f2611c16b3a43d36`
Text Tab key: `117bb356a54ee267d8a699d94f1a56367b568321`
Library: Design System OS
