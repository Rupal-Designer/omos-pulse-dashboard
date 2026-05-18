---
type: token
layer: token
name: Corner Radius
figma-variable-collection: "Corner Radius"
figma-library: "Design System OS"
tags: [token, border-radius, corner-radius, shape]
last-updated: 2026-05-15
---

# Corner Radius Tokens

Figma collection: `Corner Radius` — mode: Radius

| Token Name | Value | CSS Token | Use |
|-----------|-------|-----------|-----|
| Large | 12px | `--osmos-radii-lg` | Cards, modals, drawers |
| Medium | 8px | `--osmos-radii-md` | Buttons, inputs, chips |
| Small | 4px | `--osmos-radii-sm` | Tags, badges, tooltips |

## Code Usage

```css
/* In .css/.less */
.card { border-radius: var(--osmos-radii-lg); }     /* 12px */
.button { border-radius: var(--osmos-radii-md); }   /* 8px */
.badge { border-radius: var(--osmos-radii-sm); }    /* 4px */
```

```tsx
/* In JSX */
<Box borderRadius="lg" />  /* 12px */
<Box borderRadius="md" />  /* 8px */
<Box borderRadius="sm" />  /* 4px */
```

## Drawer Widths

Figma collection: `Drawer's Width`

| Token Name | Value | Use |
|-----------|-------|-----|
| Large (First) | 1252px | Primary wizard drawers |
| Medium (Second) | 1140px | Secondary configuration drawers |
| Small (Third) | 1028px | Tertiary / nested drawers |
| Height | 960px | Standard viewport height |

## Related Tokens
- [[Components/tokens/Spacing]] — spacing scale
- [[Components/tokens/Shadows]] — shadow tokens
- [[Components/molecules/Drawer]] — uses Drawer Width tokens
