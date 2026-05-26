---
type: token-colors
title: Primitive Color Palette
last-updated: 2026-05-18
tags: [tokens, colors, palette]
figma-node: "442:30838"
---

# Primitive Color Palette

Full palette as defined in `@rishikeshjoshi-morpheus/ui` theme tokens. Access via `var(--osmos-colors-{family}-{step})`.

> Screenshot: [[Assets/tokens/Colors.png]]
> Source: `shared-ui/components/src/theme/tokens/colors.ts`

---

## Grays

| Step | Token | Hex | Use |
|------|-------|-----|-----|
| 50 | `var(--osmos-colors-gray-50)` | `#fafafa` | Hover rows, surface-1 |
| 100 | `var(--osmos-colors-gray-100)` | `#f4f4f5` | |
| 200 | `var(--osmos-colors-gray-200)` | `#e4e4e7` | Default borders (light mode) |
| 300 | `var(--osmos-colors-gray-300)` | `#d4d4d8` | Emphasized borders |
| 400 | `var(--osmos-colors-gray-400)` | `#a1a1aa` | Subtle text (light), muted text (dark) |
| 500 | `var(--osmos-colors-gray-500)` | `#71717a` | |
| 600 | `var(--osmos-colors-gray-600)` | `#52525b` | Muted text (light) |
| 700 | `var(--osmos-colors-gray-700)` | `#3f3f46` | |
| 800 | `var(--osmos-colors-gray-800)` | `#27272a` | Default borders (dark mode) |
| 900 | `var(--osmos-colors-gray-900)` | `#18181b` | Dark bg muted |
| 950 | `var(--osmos-colors-gray-950)` | `#111111` | Dark bg subtle |

**Special:** `black = #09090B`, `white = #FFFFFF`

---

## Red

| Step | Token | Hex |
|------|-------|-----|
| 50 | `var(--osmos-colors-red-50)` | `#fef2f2` |
| 100 | `var(--osmos-colors-red-100)` | `#fee2e2` |
| 200 | `var(--osmos-colors-red-200)` | `#fecaca` |
| 300 | `var(--osmos-colors-red-300)` | `#fca5a5` |
| 400 | `var(--osmos-colors-red-400)` | `#f87171` |
| **500** | `var(--osmos-colors-red-500)` | **`#ef4444`** | ← violation/error indicator |
| 600 | `var(--osmos-colors-red-600)` | `#dc2626` |
| 700 | `var(--osmos-colors-red-700)` | `#991919` |

---

## Green

| Step | Token | Hex |
|------|-------|-----|
| 50 | `var(--osmos-colors-green-50)` | `#f0fdf4` |
| 100 | `var(--osmos-colors-green-100)` | `#dcfce7` |
| **500** | `var(--osmos-colors-green-500)` | **`#22c55e`** |
| **600** | `var(--osmos-colors-green-600)` | **`#16a34a`** | ← Chakra success solid |

> Note: Osmos brand green is `#1ca678` (`var(--osmos-brand-green)`) — different from Chakra green-600. Use brand green for status badges; Chakra green for Chakra component `colorPalette="green"`.

---

## Blue

| Step | Token | Hex |
|------|-------|-----|
| 50 | `var(--osmos-colors-blue-50)` | `#eff6ff` |
| 100 | `var(--osmos-colors-blue-100)` | `#dbeafe` |
| 300 | `var(--osmos-colors-blue-300)` | `#a3cfff` |
| **500** | `var(--osmos-colors-blue-500)` | **`#3b82f6`** | ← Chakra info/focus |
| **600** | `var(--osmos-colors-blue-600)` | **`#2563eb`** | ← Chakra blue solid |

> Note: Osmos primary blue is `#1970e1` (`var(--primary)`) — the Figma `Blue/Blue/PrimaryButton` token. Different from Chakra blue-500/600.

---

## Orange

| Step | Token | Hex |
|------|-------|-----|
| 100 | `var(--osmos-colors-orange-100)` | `#ffedd5` |
| **500** | `var(--osmos-colors-orange-500)` | **`#f97316`** |
| **600** | `var(--osmos-colors-orange-600)` | **`#ea580c`** |

---

## Purple

| Step | Token | Hex |
|------|-------|-----|
| 100 | `var(--osmos-colors-purple-100)` | `#f3e8ff` |
| 500 | `var(--osmos-colors-purple-500)` | `#a855f7` |
| **600** | `var(--osmos-colors-purple-600)` | **`#9333ea`** |

> Note: Osmos AI violet is `#7c3aed` (`var(--osmos-brand-violet)`) — not in the Chakra purple scale.

---

## Teal

| Step | Token | Hex |
|------|-------|-----|
| 100 | `var(--osmos-colors-teal-100)` | `#ccfbf1` |
| 500 | `var(--osmos-colors-teal-500)` | `#14b8a6` |
| **600** | `var(--osmos-colors-teal-600)` | **`#0d9488`** |

---

## Yellow / Amber

| Step | Token | Hex |
|------|-------|-----|
| 300 | `var(--osmos-colors-yellow-300)` | `#fde047` |
| **500** | `var(--osmos-colors-yellow-500)` | **`#eab308`** |
| 600 | `var(--osmos-colors-yellow-600)` | `#ca8a04` |

> Note: Osmos brand amber is `#f9a825` (`var(--osmos-brand-amber)`) — not in the Chakra yellow scale. Use brand amber for status/UI; Chakra yellow for component colorPalette.

---

## Pink / Cyan

| Family | Key step | Token | Hex |
|--------|----------|-------|-----|
| Pink | 500 | `var(--osmos-colors-pink-500)` | `#ec4899` |
| Cyan | 500 | `var(--osmos-colors-cyan-500)` | `#06b6d4` |

---

## When to Use Primitive vs Semantic

| Situation | Use |
|-----------|-----|
| Background, text, border | Semantic: `var(--osmos-bg)`, `var(--osmos-fg)`, `var(--osmos-border)` |
| Status indicators | Alert tokens: `var(--alert-error-primary)`, etc. |
| Custom badge / chip | Primitive + opacity OR tag presets |
| Chart series | Chart palette: `var(--chart-royalblue)`, etc. |
| Chakra `colorPalette` prop | Primitive family name: `"blue"`, `"red"`, etc. |
| Inline hardcode | **Never** — always use a token |
