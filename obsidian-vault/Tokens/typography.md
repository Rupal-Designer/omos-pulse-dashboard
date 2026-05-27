---
type: token-typography
title: Typography Scale
last-updated: 2026-05-18
tags: [tokens, typography, fonts]
figma-node: "23:8522"
---

# Typography Scale

All text in Osmos uses **Open Sans**. No other typeface is used in production UI.

> Source: Figma Typography page (`23:8522`) + `src/figma-tokens.css`
> Screenshot: [[Assets/tokens/Typography.png]]

---

## Font Family

```css
font-family: 'Open Sans', sans-serif;
```

Set globally in `body` via `src/index.css`. Never override with a different family.

---

## Type Scale (from Figma)

All text styles use `line-height: 1.5`, `letter-spacing: 0`.

| Figma Name | Size | Weight | Use In Code |
|------------|------|--------|-------------|
| H1 XL / Bold | 40px | 700 | Hero / landing headings |
| H1 XL / Semi Bold | 40px | 600 | — |
| H1 Large / Bold | 32px | 700 | Page section titles |
| H1 Large / Semi B | 32px | 600 | — |
| **H1 / Bold** | **24px** | **700** | Modal titles, card headings |
| H1 / Semi Bold | 24px | 600 | — |
| **H2 / Bold** | **20px** | **700** | Sub-section headings |
| H2 / Semi B _(Default)_ | 20px | 600 | — |
| **H3 / Bold** | **18px** | **700** | Drawer titles |
| H3 / Semi B _(Default)_ | 18px | 600 | — |
| **H4 (Title) / Semi B** | **16px** | **600** | Page titles, card titles |
| H4 (Title) / Bold | 16px | 700 | — |
| **H5 (Sub Title) / Semi B** | **14px** | **600** | Sub-titles, toolbar labels |
| H5 (Sub Title) / Regular | 14px | 400 | — |
| **Body Text Large** | **16px** | **400 / 600 / 700** | Large body copy |
| **Body Text Medium** | **14px** | **400 / 600 / 700** | Standard body (most UI text) |
| **Body Text Small _(Default)_** | **12px** | **400 / 600 / 700** | Labels, badges, captions |
| Body Text XSmall | 10px | 400 / 600 / 700 | Micro labels, audit logs |
| Body Text Italic 12px | 12px | italic variants | Hints, placeholders |

---

## Practical Size Reference

| Size | Usage |
|------|-------|
| `10px / fw:600–700` | Table column subheaders, micro badges |
| `11px / fw:600` | Badge/chip labels, uppercase column headers |
| `12px / fw:400` | Helper text, hints, secondary metadata |
| `12px / fw:600` | Form field labels, toolbar count chips |
| `13px / fw:400` | Table cell body text, form inputs |
| `13px / fw:500–600` | Row names, semi-prominent values |
| `14px / fw:400` | Standard body |
| `14px / fw:600` | Sub-section labels, nav items |
| `15px / fw:600–700` | Drawer titles, modal titles |
| `16px / fw:600` | Page / card main title |
| `18–24px / fw:700` | Section headings |

---

## CSS Conventions

```css
/* Always use Open Sans — never override */
font-family: 'Open Sans', sans-serif;

/* Line height — always 1.5 unless overriding for specific cases */
line-height: 1.5;

/* Letter spacing — 0 for body; 0.04–0.06em for UPPERCASE table headers */
letter-spacing: 0.04em; /* col headers */
```

---

## Uppercase Labels

Table column headers and stat card labels use uppercase + letter-spacing:

```css
text-transform: uppercase;
letter-spacing: 0.04em;
font-size: 11px;
font-weight: 600;
color: var(--osmos-fg-muted);
```
