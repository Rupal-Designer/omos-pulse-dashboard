---
type: token
layer: token
name: Shadows
figma-variable-collection: "Shadows"
figma-library: "Design System OS"
tags: [token, shadow, elevation, depth]
last-updated: 2026-05-15
---

# Shadow Tokens

Figma collection: `Shadows` — semantic shadow colors used across all elevation levels.

| Token Name | Hex (RGBA) | CSS Token | Use |
|-----------|-----------|-----------|-----|
| Button Shadow | `#40404029` (16% opacity) | `--osmos-shadows-button` | Buttons, active states |
| Card Shadow & Funnels | `#4040401a` (10% opacity) | `--osmos-shadows-card` | StatCards, funnel panels |
| Big Containers | `#40404014` (8% opacity) | `--osmos-shadows-container` | Modals, drawers, popovers |
| Miscellaneous | `#7b7b7b1a` (10% opacity, grey) | `--osmos-shadows-misc` | Secondary surfaces |
| Table Scroll | `#ffffff` | `--osmos-shadows-table-scroll` | White fade at table scroll edge |

## Code Usage

```css
/* In .css/.less */
.stat-card {
  box-shadow: 0 2px 8px var(--osmos-shadows-card);
}
.modal {
  box-shadow: 0 4px 24px var(--osmos-shadows-container);
}
.primary-button {
  box-shadow: 0 2px 4px var(--osmos-shadows-button);
}
```

```tsx
/* In JSX — Chakra shadow prop maps to these tokens */
<Box shadow="sm" />   /* card-level */
<Box shadow="md" />   /* container-level */
<Box shadow="lg" />   /* modal-level */
```

## Elevation Hierarchy

```
Level 0 — Screen background (no shadow)
Level 1 — Cards / StatCards          → Card Shadow (#4040401a)
Level 2 — Dropdowns / Popovers       → Miscellaneous (#7b7b7b1a)
Level 3 — Modals / Drawers           → Big Containers (#40404014)
Level 4 — Buttons (active)           → Button Shadow (#40404029)
```

## Related Tokens
- [[Components/tokens/Colors]] — color palette (shadows use grey/neutral base)
- [[Components/tokens/CornerRadius]] — pairs with shadow for card shapes
