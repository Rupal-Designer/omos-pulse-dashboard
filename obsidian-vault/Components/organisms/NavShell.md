---
type: component
layer: organism
name: Open Nav / NavShell
figma-component-key: "65aed72b7e8ed06e51211eb5c1a43b6ef574d606"
figma-node-id: "2352:93971"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Open Nav - Os"
tags: [organism, navigation, sidebar, shell, layout]
png: ../Assets/Components/organisms/NavShell.png
last-updated: 2026-05-15
---

# Open Nav / NavShell

![NavShell](../Assets/Components/organisms/NavShell.png)

The primary application shell: collapsible left sidebar navigation + top bar. This is the outermost layout wrapper for every authenticated screen in Osmos.

## Sub-components

| Component | Key | Description |
|-----------|-----|-------------|
| Open Nav - Os | `65aed72b7e8ed06e51211eb5c1a43b6ef574d606` | Full open sidebar variant |
| Action Item | `7074f1d42f0d31350c5764acec751be2768554a2` | Individual nav item (icon + label) |
| Setting | `1bd5734764b58fa7ad29c32882027848005363c0` | Settings icon nav item |

## Layout

```
┌─────────────────────────────────────────┐
│  TopBar (logo + global search + avatar)  │
├──────────┬──────────────────────────────┤
│  Sidebar │  Main Content Area           │
│  (240px) │  (flex: 1)                   │
│  Nav     │                              │
│  Items   │                              │
└──────────┴──────────────────────────────┘
```

## States

| State | Width | Behavior |
|-------|-------|----------|
| Open | 240px | Icon + label visible |
| Collapsed | 64px | Icon only, label in tooltip |
| Mobile | 0px | Hidden, hamburger trigger |

## Action Item Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| icon | ReactNode | — | 20px icon |
| label | string | — | |
| isActive | boolean | false | Highlighted state |
| href | string | — | Route path |
| badge | number | — | Notification count |

## Usage Guidelines
- All routes must register a nav item in `domainConfig/configs/secure/configs/routes.js`
- Active state driven by current route — don't manage manually
- Use `packages/sidebar-v2` for the React implementation (not raw NavShell)

## src/ui Wrapper Props (`src/ui/molecules/NavShell.jsx`)

The local `src/ui` wrapper is a lighter adapter used in app-level pages. Props:

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| items | array | — | `{ id, label, icon, subnav?: [{ id, label }], badge? }` |
| activeId | string | — | Currently active nav item id |
| onSelect | function | — | Called with `(id)` on item click |

**Icon rule** — `icon` must be a component reference, not a JSX element:
```jsx
// ✅ Correct
{ id: 'campaigns', icon: CampaignsIcon, label: 'Campaigns' }

// ❌ Wrong — causes React render error #130
{ id: 'campaigns', icon: <CampaignsIcon />, label: 'Campaigns' }
```

## Code Import
```js
// App-level (src/ui wrapper)
import { NavShell } from '../ui';

// Full sidebar package
import Sidebar from '@onlinesales-ai/sidebar-v2';
```

## Full-screen Layout Reference

![LeftNav in context](../Assets/Components/organisms/LeftNav.png)

*Frame `4255:19523` — Left Nav in full 1440×960 app context (advertiser view)*

## Related Components
- [[Components/molecules/Tabs]] — secondary in-page navigation
- [[Navigation/structure]] — full nav hierarchy doc

## Figma Reference
Component key: `65aed72b7e8ed06e51211eb5c1a43b6ef574d606`
Full-screen frame: node `4255:19523` (Left Nav page, Design System OS)
Library: Design System OS
