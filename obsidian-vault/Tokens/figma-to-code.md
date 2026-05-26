---
type: token-bridge
title: Figma → Code Token Mapping
last-updated: 2026-05-18
tags: [tokens, figma, css, bridge]
figma-file: "58jL2Gbe53rBhxOysvHM82"
---

# Figma → Code Token Mapping

Use this when you see a Figma layer style name and need the CSS variable to emit in code.

> **Screenshot reference:** [[Assets/tokens/Colors.png]]

---

## Brand Colors

| Figma Variable | Figma Raw Name | CSS Alias | Light | Dark | Use For |
|---|---|---|---|---|---|
| `--brand-primary` | `Brand Colour / Primary` | `var(--osmos-brand-primary)` | `#636cff` | `#636cff` | CTAs, active states, focus rings, links |
| `--brand-secondary` | `Brand Colour / Secondary` | `var(--brand-secondary)` | `#3e266d` | `#3e266d` | Deep violet; nav backgrounds |
| `--brand-accent` | `Brand Colour / Accent` | `var(--brand-accent)` | `#87deca` | `#87deca` | AI/Sofie teal accent highlight |
| `--chart-mintgreen` | (chart palette) | `var(--osmos-brand-green)` | `#1ca678` | `#1ca678` | Success states, positive trends, active badges |
| `--chart-yellow` | (chart palette) | `var(--osmos-brand-amber)` | `#f9a825` | `#f9a825` | Warning states, Exhausted status, amber chips |
| _(no Figma token)_ | — | `var(--osmos-brand-violet)` | `#7c3aed` | `#7c3aed` | AI features (Sofie, debugger, AI-generated labels) |

**Muted fills** (semi-transparent backgrounds for badges/chips — no Figma token, keep custom):

| CSS Alias | Value | Paired With |
|---|---|---|
| `var(--osmos-brand-primary-muted)` | `rgba(99,108,255,0.12)` | `var(--osmos-brand-primary)` text |
| `var(--osmos-brand-green-muted)` | `var(--alert-success-bg)` → `#eaf2eb` / dark `#0f3320` | `var(--osmos-brand-green)` text |
| `var(--osmos-brand-amber-muted)` | `rgba(245,166,35,0.12)` | `var(--osmos-brand-amber)` text |
| `var(--osmos-brand-violet-muted)` | `rgba(124,58,237,0.10)` | `var(--osmos-brand-violet)` text |

---

## Surface & Text

| Figma Layer / Fill | Figma Token | CSS Alias | Light | Dark |
|---|---|---|---|---|
| Page / screen background | `--bg-screen` | `var(--osmos-bg)` | `#ffffff` | `#212121` |
| Secondary page / card bg | `--bg-screen-2` | `var(--osmos-bg-subtle)` | `#edf0f5` | `#1b1b1b` |
| Muted / input bg | `--surface-2` | `var(--osmos-bg-muted)` | `#efefef` | `#3e3e3e` |
| Primary text | `--text` | `var(--osmos-fg)` | `#404040` | `#f2f2f2` |
| Secondary / label text | `--text-muted` | `var(--osmos-fg-muted)` | `#7b7b7b` | `#b3b3b3` |
| Placeholder / hint text | `--text-info` | `var(--osmos-fg-subtle)` | `#b3b3b3` | `#9b9b9b` |
| Dividers / input border | `--border` | `var(--osmos-border)` | `#dedede` | `#4d4d4d` |

---

## Status / Alert Colors

| Status | Text Token | Background Token | Light Text | Light BG | Dark Text | Dark BG |
|---|---|---|---|---|---|---|
| Error | `var(--alert-error-primary)` | `var(--alert-error-bg)` | `#c62828` | `#f9eaea` | `#e37878` | `#5c1f1f` |
| Warning | `var(--alert-warning-primary)` | `var(--alert-warning-bg)` | `#e67a00` | `#fef8f0` | `#ff8a00` | `#4a2300` |
| Success | `var(--alert-success-primary)` | `var(--alert-success-bg)` | `#2e7d32` | `#eaf2eb` | `#3fab45` | `#0f3320` |
| Info (blue) | `var(--primary)` | `var(--primary-bg)` | `#1970e1` | `#e8f1fc` | `#7aadf0` | `#1f2a3a` |

---

## Navigation Chrome

These tokens apply only to the left-nav band. They do **not** respond to light/dark page mode — the nav is always dark.

| Token | Value | Use For |
|---|---|---|
| `var(--osmos-nav-bg)` | `#212563` | Left nav background |
| `var(--osmos-nav-panel-bg)` | `#1b1e50` | Nav sub-panel / flyout |
| `var(--osmos-nav-accent)` | `#7b82f8` | Active indicator, separator |
| `var(--osmos-nav-border)` | `rgba(123,130,248,0.25)` | Subtle nav dividers |
| `var(--osmos-nav-active-bg)` | `rgba(123,130,248,0.20)` | Active nav item bg |

---

## Tag / Badge Preset Colors

Figma defines named tag color sets. Use these directly (do **not** create custom badge colors):

| Tag Type | BG Token | FG Token | Light BG | Light FG |
|---|---|---|---|---|
| recommended | `var(--tag-bg-recommended)` | `var(--tag-fg-recommended)` | `#e6f2f0` | `#00796b` |
| linked / info | `var(--tag-bg-linked)` | `var(--tag-fg-linked)` | `#e8f1fc` | `#1970e1` |
| success | `var(--tag-bg-success)` | `var(--tag-fg-success)` | `#eaf2eb` | `#2e7d32` |
| error | `var(--tag-bg-error)` | `var(--tag-fg-error)` | `#f9eaea` | `#c62828` |
| warning | `var(--tag-bg-warning)` | `var(--tag-fg-warning)` | `#fef8f0` | `#e67a00` |
| auto | `var(--tag-bg-auto)` | `var(--tag-fg-auto)` | `#f2efff` | `#7c69bf` |
| manual | `var(--tag-bg-manual)` | `var(--tag-fg-manual)` | `#efefef` | `#404040` |

---

## Chart Palette

Use in order for multi-series data visualizations:

| # | Token | Light Hex | Name |
|---|---|---|---|
| 1 | `var(--chart-royalblue)` | `#1680dd` | Royal Blue |
| 2 | `var(--chart-mintgreen)` | `#1ca678` | Mint Green |
| 3 | `var(--chart-yellow)` | `#f9a825` | Yellow |
| 4 | `var(--chart-crimsonred)` | `#d32f2f` | Crimson Red |
| 5 | `var(--chart-deeppurple)` | `#7b1fa2` | Deep Purple |
| 6 | `var(--chart-teal)` | `#00796b` | Teal |
| 7 | `var(--chart-bruntorange)` | `#ef6c00` | Burnt Orange |
| 8 | `var(--chart-indigo)` | `#303f9f` | Indigo |
| 9 | `var(--chart-olivegreen)` | `#689f38` | Olive Green |
| 10 | `var(--chart-raspberry)` | `#c2185b` | Raspberry |
| 11 | `var(--chart-slategrey)` | `#455a64` | Slate Grey |
| 12 | `var(--chart-brown)` | `#8d6e63` | Brown |

**HeatMap palette** (`--heatmap-teal-1` … `--heatmap-teal-6`): `#3a96a8` → `#cbdfe7` (dark to light).

---

## Chakra Component Props → CSS Vars

When using Morpheus/Chakra component props (`bg=`, `color=`), these resolve to the same tokens:

| Prop Value | Resolves To | CSS Var |
|---|---|---|
| `bg="bg"` | bg.DEFAULT | `var(--osmos-bg)` |
| `bg="bg.subtle"` | bg.subtle | `var(--osmos-bg-subtle)` |
| `bg="bg.muted"` | bg.muted | `var(--osmos-bg-muted)` |
| `color="fg"` | fg.DEFAULT | `var(--osmos-fg)` |
| `color="fg.muted"` | fg.muted | `var(--osmos-fg-muted)` |
| `color="fg.subtle"` | fg.subtle | `var(--osmos-fg-subtle)` |
| `borderColor="border"` | border.DEFAULT | `var(--osmos-border)` |
| `colorPalette="blue"` | blue.* scale | `var(--osmos-colors-blue-*)` |

---

## Exempt: Third-Party Brand Colors

These are hardcoded by necessity and **must not** be replaced with Osmos tokens:

| Brand | Hex |
|---|---|
| Meta | `#1877F2` |
| Google | `#EA4335` |
| TikTok | `#000000` |
| Snapchat | `#FFFC00` |
| YouTube | `#FF0000` |
| DV-360 | `#4285F4` |
