---
type: component
layer: atom
name: SpinLoader
source-file: src/ui/atoms/SpinLoader.jsx
figma-node: "5664:34408"
last-updated: 2026-05-25T06:30:05Z
tags: [atom, ui-component]
---

# SpinLoader

Animated spinner for loading states; available as a bare spinner or inside a rounded background pill.

![[Assets/Components/atoms/SpinLoader.png]]

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls spinner diameter (xs=16px, sm=20px, md=24px, lg=32px, xl=48px) |
| withBg | boolean | `false` | Wraps the spinner in a rounded pill with `bg-subtle` background |
| style | CSSProperties | — | Applied to the spinner element (or the pill wrapper when `withBg` is true) |

---

## Usage

```jsx
import { SpinLoader } from '../../ui';

// Bare spinner
<SpinLoader />

// Large spinner with background pill
<SpinLoader size="lg" withBg />

// Full-page loading overlay (xl, centered by parent)
<SpinLoader size="xl" />
```

---

## Notes

- Wraps `Spinner` from `@rishikeshjoshi-morpheus/ui`.
- When `withBg` is true, the `style` prop is applied to the outer pill `<span>`, not the inner `Spinner`.
- Figma node `5664:34408`; Figma library: Design System OS. Two Figma variants: bare (`07e786860...`) and With BG (`380c8c256...`).
- Prefer skeleton screens for table/list loading; use SpinLoader for overlay blocking states and button loading indicators.
