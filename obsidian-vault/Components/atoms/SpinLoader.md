---
type: component
layer: atom
name: Spin Loader
figma-component-key: "07e786860228ad9be057839ff65426d19c9f52f6"
figma-alt-key: "380c8c256f7797e8bba83d1a5242b5ce634cb59a"
figma-node-id: "5664:34408"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Spin Loader"
tags: [atom, feedback, loading, state]
png: ../Assets/Components/atoms/SpinLoader.png
last-updated: 2026-05-15
---

# Spin Loader

![SpinLoader](../Assets/Components/atoms/SpinLoader.png)

Animated spinner indicating an in-progress operation. Two variants: bare spinner and spinner with a background pill.

## Variants

| Name | Key | Description |
|------|-----|-------------|
| Spin Loader | `07e786860228ad9be057839ff65426d19c9f52f6` | Bare SVG spinner, no background |
| Spiner With BG | `380c8c256f7797e8bba83d1a5242b5ce634cb59a` | Spinner inside a rounded pill with bg fill |
| loading-01 | `6279fea632255441a390607fdcf8257f0ad0044a` | Icon variant (single 24px path) |

## Sizes

| Size | Diameter |
|------|----------|
| xs | 16px |
| sm | 20px |
| md (default) | 24px |
| lg | 32px |
| xl | 48px |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| size | xs\|sm\|md\|lg\|xl | md | |
| color | string | brand-primary | CSS color or token |
| withBg | boolean | false | Enables pill background |

## Usage Guidelines
- Inline inside [[Components/atoms/Button]] via `isLoading` prop — don't compose manually
- Use full-page or section-level spinner for initial data fetch
- Prefer skeleton screens for list/table loading (less jarring than spinner)

## Code Import
```js
import { Spinner, Loader } from '@onlinesales-ai/ui';
```

## Figma Reference
Component key: `07e786860228ad9be057839ff65426d19c9f52f6`
Library: Design System OS
