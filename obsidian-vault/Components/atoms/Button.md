---
type: component
layer: atom
name: Button
figma-component-key: "adc3823b45722db32dc567c38afe90d015a33ab7"
figma-alt-key: "f491d2d907847f56f2536a3fd1be4618ca22730a"
figma-node-id: "409:107991"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Button"
tags: [atom, interactive, action, cta]
png: ../Assets/Components/atoms/Button.png
last-updated: 2026-05-15T06:30:04Z
source-file: src/ui/atoms/Button.jsx
---

# Button

![Button](../Assets/Components/atoms/Button.png)

The primary action trigger in the design system. Every CTA, form submit, and toolbar action runs through this component. Never use raw `<button>` or local `BtnPrimary` objects.

## Variants

| Variant | Usage |
|---------|-------|
| Primary | Main action — one per view |
| Secondary / Outline | Secondary action, cancel, reset |
| Ghost | Inline actions, icon-only contexts |
| Danger | Destructive actions (delete, revoke) |
| Link | Inline text-based navigation |

## Sizes

| Size | Height | Font |
|------|--------|------|
| sm | 32px | 12px |
| md (default) | 40px | 14px |
| lg | 48px | 16px |

## States
- Default, Hover, Focus, Active, Disabled (opacity 0.45, pointer-events none)

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| variant | primary\|outline\|ghost\|link\|danger | primary | Controls visual style |
| size | sm\|md\|lg | md | |
| onClick | function | — | |
| disabled | boolean | false | |
| type | button\|submit | button | |
| leftIcon | ReactNode | — | Icon before label |
| rightIcon | ReactNode | — | Icon after label |
| isLoading | boolean | false | Shows Spin Loader inside |

## Usage Guidelines
- Use **primary** for the single most important action on a screen
- Use **outline** for secondary actions placed next to a primary
- Use **ghost** or **icon** for toolbar actions where ink would crowd
- Never stack two primaries side-by-side

## Code Import
```js
import { Button } from '@onlinesales-ai/ui';
```

## Related Components
- [[Components/atoms/SpinLoader]] — renders inside Button when isLoading=true
- [[Components/molecules/Toolbar]] — wraps Buttons in header rows
- [[Components/atoms/RadioButton]] — alternative selection control

## Figma Reference
Component key: `adc3823b45722db32dc567c38afe90d015a33ab7`
Library: Design System OS
