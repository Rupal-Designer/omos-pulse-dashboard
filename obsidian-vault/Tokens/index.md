---
type: token-index
title: Design Token System
last-updated: 2026-05-18
tags: [tokens, design-system, figma, css]
---

# Design Token System

Osmos uses a **three-layer token architecture**. Every colour, spacing value, and type style in Figma has a direct CSS counterpart.

```
Figma Variables
      ↓
figma-tokens.css   ← generated, do not edit
(--bg-screen, --brand-primary, --alert-error-primary …)
      ↓
src/index.css aliases
(--osmos-bg, --osmos-brand-primary, --osmos-border …)
      ↓
Component code
var(--osmos-bg), var(--osmos-brand-primary) …
```

**Source files:**
- Figma variables → `src/figma-tokens.css` (auto-generated from Figma)
- Alias layer → `src/index.css` (maps `--osmos-*` → Figma tokens)
- Chakra semantic tokens → `@rishikeshjoshi-morpheus/ui` theme (for component props like `bg="bg.subtle"`)

---

## Token Files in This Vault

| File | Contents |
|------|----------|
| [[Tokens/figma-to-code]] | **Start here** — Figma layer style → CSS variable mapping |
| [[Tokens/colors]] | Full primitive palette (gray, red, green, blue … + hex values) |
| [[Tokens/semantic]] | Semantic surface tokens: bg, fg, border, alerts, nav |
| [[Tokens/typography]] | Type scale — sizes, weights, line-height |
| [[Tokens/spacing]] | Spacing scale, gap, radius, icon sizes, shadows |

---

## Quick Decision Rules

**Picking a color token:**
1. Need a surface? → `var(--osmos-bg)` / `var(--osmos-bg-subtle)` / `var(--osmos-bg-muted)`
2. Need text? → `var(--osmos-fg)` / `var(--osmos-fg-muted)` / `var(--osmos-fg-subtle)`
3. Need a border? → `var(--osmos-border)`
4. Need brand accent? → `var(--osmos-brand-primary)` (indigo `#636cff`)
5. Need success/error/warning? → `var(--alert-success-primary)` / `var(--alert-error-primary)` / `var(--alert-warning-primary)`
6. Need a specific palette step (e.g. for a custom badge)? → `var(--osmos-colors-blue-500)` etc.
7. **Never hardcode a hex value** unless it's an exempt third-party brand color (Meta, Google, TikTok, etc.)

**Muted fills for badges/chips:**
Use `var(--osmos-brand-primary-muted)` = `rgba(99,108,255,0.12)` for brand-tinted backgrounds. No Figma token exists yet — keep as-is.

---

## Dark Mode

Dark mode is toggled via `[data-theme="dark"]` on the root element. All `--osmos-*` aliases and Figma tokens resolve correctly in both themes — **never hardcode light-mode hex values** in component code.
