---
type: token-semantic
title: Semantic Surface Tokens
last-updated: 2026-05-18
tags: [tokens, semantic, bg, fg, border]
---

# Semantic Surface Tokens

These are the tokens you use in **99% of component code**. They are theme-aware — they flip automatically between light and dark mode.

> Source: `src/figma-tokens.css` + `src/index.css`

---

## Background

| Token | Figma Token | Light | Dark | Use |
|-------|-------------|-------|------|-----|
| `var(--osmos-bg)` | `--bg-screen` | `#ffffff` | `#212121` | Main page / card / drawer background |
| `var(--osmos-bg-subtle)` | `--bg-screen-2` | `#edf0f5` | `#1b1b1b` | Page wrapper, table header row, hover state |
| `var(--osmos-bg-muted)` | `--surface-2` | `#efefef` | `#3e3e3e` | Input backgrounds, section insets |

**Also available (Figma-direct, not aliased):**
- `var(--surface-1)` = `#fafafa` / dark `#2f2f2f` — very subtle surface
- `var(--surface-3)` = `#ffffff` / dark `#1b1b1b` — panel / popover

---

## Foreground (Text)

| Token | Figma Token | Light | Dark | Use |
|-------|-------------|-------|------|-----|
| `var(--osmos-fg)` | `--text` | `#404040` | `#f2f2f2` | Primary body text, heading text |
| `var(--osmos-fg-muted)` | `--text-muted` | `#7b7b7b` | `#b3b3b3` | Labels, column headers, secondary info |
| `var(--osmos-fg-subtle)` | `--text-info` | `#b3b3b3` | `#9b9b9b` | Placeholder, hint, disabled text |

**Strong text:** `var(--text-strong)` = `#262626` / dark `#1e1e1e` — page titles, modal headings.

---

## Border

| Token | Figma Token | Light | Dark | Use |
|-------|-------------|-------|------|-----|
| `var(--osmos-border)` | `--border` | `#dedede` | `#4d4d4d` | Card borders, input outlines, dividers |
| `var(--osmos-border-muted)` | `--border` | same | same | Subtle dividers (aliases same Figma token) |

**Strong border:** `var(--border-strong)` = `#dedede` / dark `#4d4d4d` — same as `--osmos-border` currently.
**Table border:** `var(--border-table)` = `#edf0f5` / dark `#2f2f2f` — subtler row separator.

---

## Alert / Status

| State | Primary Text | BG Fill | Light Text | Light BG | Dark Text | Dark BG |
|-------|-------------|---------|-----------|----------|-----------|---------|
| Error | `var(--alert-error-primary)` | `var(--alert-error-bg)` | `#c62828` | `#f9eaea` | `#e37878` | `#5c1f1f` |
| Warning | `var(--alert-warning-primary)` | `var(--alert-warning-bg)` | `#e67a00` | `#fef8f0` | `#ff8a00` | `#4a2300` |
| Success | `var(--alert-success-primary)` | `var(--alert-success-bg)` | `#2e7d32` | `#eaf2eb` | `#3fab45` | `#0f3320` |
| Info (blue) | `var(--primary)` | `var(--primary-bg)` | `#1970e1` | `#e8f1fc` | `#7aadf0` | `#1f2a3a` |

**Extended alert variants:**
- `var(--alert-error-lighter)` = `#edbcbc` — lighter tint for error fills
- `var(--alert-success-lighter)` = `#bed7bf` — lighter tint for success fills
- `var(--alert-error-darkest)` = `#a21c1c` — dark mode deepest error
- `var(--alert-success-darkest)` = `#18601c` — dark mode deepest success

---

## Brand

| Token | Figma Token | Light | Dark | Use |
|-------|-------------|-------|------|-----|
| `var(--osmos-brand-primary)` | `--brand-primary` | `#636cff` | `#636cff` | CTAs, tabs active, focus ring |
| `var(--osmos-brand-primary-muted)` | _(derived)_ | `rgba(99,108,255,0.12)` | same | Brand badge backgrounds |
| `var(--osmos-brand-green)` | `--chart-mintgreen` | `#1ca678` | `#1ca678` | Success badge text/dot |
| `var(--osmos-brand-green-muted)` | `--alert-success-bg` | `#eaf2eb` | `#0f3320` | Success badge bg |
| `var(--osmos-brand-amber)` | `--chart-yellow` | `#f9a825` | `#f9a825` | Warning badge text/dot |
| `var(--osmos-brand-amber-muted)` | _(derived)_ | `rgba(245,166,35,0.12)` | same | Warning badge bg |
| `var(--osmos-brand-violet)` | _(hardcoded)_ | `#7c3aed` | `#7c3aed` | AI feature accents |
| `var(--osmos-brand-violet-muted)` | _(derived)_ | `rgba(124,58,237,0.10)` | same | AI feature bg tints |

---

## Chakra Semantic Tokens (component props)

These are the tokens used when writing `bg="bg.subtle"` in Chakra/Morpheus component props:

| Prop | Light | Dark |
|------|-------|------|
| `bg` / `bg.DEFAULT` | `#ffffff` | `#09090B` |
| `bg.subtle` | `#fafafa` (gray.50) | `#111111` (gray.950) |
| `bg.muted` | `#f4f4f5` (gray.100) | `#18181b` (gray.900) |
| `fg` / `fg.DEFAULT` | `#09090B` (black) | `#fafafa` (gray.50) |
| `fg.muted` | `#52525b` (gray.600) | `#a1a1aa` (gray.400) |
| `fg.subtle` | `#a1a1aa` (gray.400) | `#71717a` (gray.500) |
| `border` / `border.DEFAULT` | `#e4e4e7` (gray.200) | `#27272a` (gray.800) |

> Note: Chakra semantic tokens (`bg.subtle`, `fg.muted`) differ slightly from the Figma-sourced Osmos tokens (`--osmos-bg-subtle`, `--osmos-fg-muted`). Use `var(--osmos-*)` in inline styles; use Chakra prop names when using component props.

---

## Primary Blue (Figma `Blue/Blue/PrimaryButton`)

| Token | Figma | Light | Dark | Use |
|-------|-------|-------|------|-----|
| `var(--primary)` | `Blue/Blue/PrimaryButton` | `#1970e1` | `#7aadf0` | Primary action color, step text |
| `var(--primary-bg)` | — | `#e8f1fc` | `#1f2a3a` | Info chip bg, tab selected bg |
| `var(--primary-hover)` | — | `#1766cd` | `#a9caf5` | Button hover |
| `var(--primary-pressed)` | — | `#1250a0` | `#6893cc` | Button active/pressed |
| `var(--primary-tint-1)` | — | `#b8d3f6` | `#2b3d54` | Very light blue tint |
| `var(--primary-tint-2)` | — | `#95bdf1` | `#597eaf` | Light blue tint |

> `--primary` is the Figma `Blue/Blue/PrimaryButton` variable (`#1970e1`), used in the CTA button and nav step indicator. Different from `--brand-primary` (`#636cff`). Use `--primary` for the primary action button; use `--brand-primary` for brand identity / active tab indicators.

---

## Violet (Legacy nav / deep brand)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `var(--violet)` | `#3e266d` | `#a08acb` | Nav deep brand secondary |
| `var(--violet-bg)` | `#f2efff` | `#100639` | Violet chip bg |
| `var(--violet-icon)` | `#7c69bf` | `#5b4b93` | Violet icon color |
| `var(--violet-selected)` | `#8d54ff` | `#8d54ff` | Selected violet state |
| `var(--ai-text)` | `#7349a1` | `#9d78c4` | AI-generated text color |

---

## Tab Colors

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `var(--tab-bg)` | `#e8f1fc` | `#1b1b1b` | Tab list background |
| `var(--tab-selected)` | `#ffffff` | `#2f2f2f` | Selected tab |
| `var(--vtab-selected)` | `#e8f1fc` | `#3e3e3e` | Vertical tab selected |
