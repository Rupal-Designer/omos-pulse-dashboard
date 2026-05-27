---
type: token
layer: token
name: Spacing
figma-variable-collection: "ONLY DS Spacing"
figma-library: "Design System OS"
tags: [token, spacing, layout, padding, gap]
last-updated: 2026-05-15
---

# Spacing Tokens

Design system spacing scale sourced directly from Figma variable collections. Two collections govern spacing:

1. **ONLY DS Spacing** — component-level padding and layout gaps (vertical + horizontal)
2. **Spacing's (Inbetween)** — inter-element spacing between sections/cards

---

## ONLY DS Spacing (Component Spacing)

Figma collection: `ONLY DS Spacing` — modes: Vertical, Horizontal (same values)

| Token Name | Value | CSS Token | Use |
|-----------|-------|-----------|-----|
| Huge | 40px | `--osmos-spacing-10` | Page section separation |
| XXXLarge | 32px | `--osmos-spacing-8` | Major block gap |
| XXLarge | 24px | `--osmos-spacing-6` | Card padding |
| XLarge | 20px | `--osmos-spacing-5` | Section header margin |
| Large | 16px | `--osmos-spacing-4` | Standard padding |
| Medium | 12px | `--osmos-spacing-3` | Compact padding |
| Small | 8px | `--osmos-spacing-2` | Tight gaps, icons |
| VSmall | 4px | `--osmos-spacing-1` | Micro gaps |
| Zero | 0px | `0` | Reset |

## Spacing's (Inbetween)

Figma collection: `Spacing's (Inbetween)` — inter-element spacing

| Token Name | Value | Use |
|-----------|-------|-----|
| XXLarge | 40px | Between major page sections |
| XLarge | 32px | Between card groups |
| Large | 24px | Between cards |
| Medium | 16px | Between form fields |
| Small | 8px | Between chips/tags |
| XSmall | 4px | Between label + icon |
| Zero | 0px | Reset |

---

## Icon Sizing

Figma collection: `Icons` — icon size scale

| Token Name | Value | Use |
|-----------|-------|-----|
| XLarge | 24px | Default icon size |
| Large | 20px | Compact icon (nav items) |
| Medium | 16px | Inline icons in text |
| Small | 12px | Micro icons (badges) |

---

## Code Usage

```css
/* In .css/.less files */
.card { padding: var(--osmos-spacing-6); }          /* 24px */
.chip-group { gap: var(--osmos-spacing-2); }        /* 8px */
.section + .section { margin-top: var(--osmos-spacing-10); } /* 40px */
```

```tsx
/* In JSX — Chakra style props */
<Box p="6" gap="2" mt="10" />  /* 24px / 8px / 40px */
```

## Related Tokens
- [[Components/tokens/Colors]] — color system
- [[Components/tokens/CornerRadius]] — border radius scale
- [[Components/tokens/GridLayout]] — column grid + breakpoints
