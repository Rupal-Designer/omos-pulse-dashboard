---
type: token-spacing
title: Spacing, Layout & Effects
last-updated: 2026-05-18
tags: [tokens, spacing, radius, shadows, icons]
---

# Spacing, Layout & Effects

> Source: `src/figma-tokens.css`

---

## Spacing Scale

Two naming conventions exist: **atomic** (component padding) and **compositional** (gaps between elements).

### Atomic Spacing (`--space-*`)

| Token | Value | Use |
|-------|-------|-----|
| `var(--space-0)` | `0px` | — |
| `var(--space-xs)` | `4px` | Icon margins, tight internal padding |
| `var(--space-sm)` | `8px` | Input padding, small gaps |
| `var(--space-md)` | `12px` | Toolbar padding (vertical), chip padding |
| `var(--space-lg)` | `16px` | Card padding, section padding |
| `var(--space-xl)` | `20px` | Drawer body padding |
| `var(--space-xxl)` | `24px` | Page content padding |
| `var(--space-3xl)` | `32px` | Section vertical gap |
| `var(--space-4xl)` | `40px` | Page top/bottom padding |

### Compositional Gaps (`--gap-*`)

| Token | Value | Use |
|-------|-------|-----|
| `var(--gap-0)` | `0px` | — |
| `var(--gap-xs)` | `4px` | Icon ↔ label gap |
| `var(--gap-sm)` | `8px` | Button group gap, chip list gap |
| `var(--gap-md)` | `16px` | Card grid gap, form field gap |
| `var(--gap-lg)` | `24px` | Section gap |
| `var(--gap-xl)` | `32px` | Major layout section gap |
| `var(--gap-xxl)` | `40px` | Page layout gap |

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `var(--radius-sm)` | `4px` | Buttons, chips, badges, input corners |
| `var(--radius-md)` | `8px` | Cards, modals, drawers, popovers |
| `var(--radius-lg)` | `12px` | Large cards, panels, full-card modals |
| `border-radius: 50%` | — | Avatar / dot indicators (no token) |
| `border-radius: 20px` | — | Pill badges (no token — use `9999px` or `20px`) |

**Chakra semantic radii** (from `@rishikeshjoshi-morpheus/ui`):

| Prop | Resolves To | Value |
|------|-------------|-------|
| `borderRadius="l1"` | `radii.xs` | `2px` |
| `borderRadius="l2"` | `radii.sm` | `4px` |
| `borderRadius="l3"` | `radii.md` | `6px` |

---

## Shadows

| Token | Value | Use |
|-------|-------|-----|
| `var(--shadow-button)` | `0 1px 2px 0 rgba(64,64,64,0.16)` | Button shadow |
| `var(--shadow-card)` | `0 2px 8px 0 rgba(64,64,64,0.10)` | Card / panel |
| `var(--shadow-raised)` | `0 4px 16px 0 rgba(64,64,64,0.08)` | Elevated modal / dropdown |
| `var(--shadow-sm)` | `0 1px 4px 0 rgba(123,123,123,0.10)` | Subtle lift |
| `var(--shadow-table-scroll)` | `0 0 8px 0 #ffffff` | Table sticky column scroll fade |

**Chakra shadow props:**

| Prop | Use |
|------|-----|
| `shadow="xs"` | Minimal depth |
| `shadow="sm"` | Cards, tooltips |
| `shadow="md"` | Modals, drawers |
| `shadow="lg"` | Elevated overlays |

---

## Icon Sizes

| Token | Value | Use |
|-------|-------|-----|
| `var(--icon-sm)` | `12px` | Button icons, inline icons in compact rows |
| `var(--icon-md)` | `16px` | Standard toolbar icons |
| `var(--icon-lg)` | `20px` | Nav icons, feature icons |
| `var(--icon-xl)` | `24px` | Hero / empty state icons |

In JSX, pass as `size` prop to `<Icon>`: `<Icon size={16}>`.

---

## Drawer Widths

Figma specifies exact drawer widths. Use these — don't invent custom widths:

| Token | Value | Use |
|-------|-------|-----|
| `var(--drawer-sm)` | `1028px` | — |
| `var(--drawer-md)` | `1140px` | Standard detail drawer |
| `var(--drawer-lg)` | `1252px` | Wide drawer (multi-column form) |
| `var(--drawer-h)` | `960px` | Height-constrained drawer |

For side drawers (right-side panel), use pixel widths: `400–480px` for form drawers (no Figma token; established by convention). `<FormDrawer>` defaults to `460px`.

---

## Borders (Width)

| Token | Value |
|-------|-------|
| `var(--osmos-borders-xs)` | `0.5px solid` |
| `var(--osmos-borders-sm)` | `1px solid` |
| `var(--osmos-borders-md)` | `2px solid` |
| `var(--osmos-borders-lg)` | `4px solid` |
| `var(--osmos-borders-xl)` | `8px solid` |
