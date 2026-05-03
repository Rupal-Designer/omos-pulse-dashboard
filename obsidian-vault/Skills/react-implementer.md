---
type: skill
name: react-implementer
category: design-pipeline
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-05-02T00:00:00Z
tags: [skill, design-pipeline]
---

# react-implementer

Generates production React code from a Screen Spec, Figma wireframe, or verbal description using **only** the `src/ui/` component library and inline CSS vars. Never uses raw HTML when a `src/ui/` component exists.

## Rules

- Import all components from `'../../ui'`
- Use `var(--osmos-*)` tokens, never hardcoded hex
- Raw `<table>` HTML for data tables (no Table molecule in `src/ui/`)
- `recharts` for charts

## Layout & Spacing (§5 — Figma-verified, 2026-05-02)

**20px is the primary layout unit.** Violations are rejected.

| Zone | Value |
|---|---|
| Page outer wrapper | `padding: '20px 24px'`, `gap: 20` |
| KPI card grid | `gap: 20` — **never** 12 or 16 |
| Section-to-section stack | `gap: 20` |
| Side-by-side columns | `gap: 20` |
| Section card header | `padding: '14px 16px'` |
| Table th | `padding: '9px 14px'` |
| Table td | `padding: '10px 14px'` |
| Drawer body | `padding: 20` |

Source: Figma nodes `6:62027`, `6:77233`, `6:77154`, `6:77006` in file `2Ez19zUlOmQ94LaHTw53Kx`.

## Chains From

- [[Skills/screen-interpreter]]
- [[Skills/figma-wireframer]]

## Triggers

- [[Skills/component-reuse-enforcer]] — run after to catch any library duplications
- [[Skills/token-enforcer]] — run after to catch hardcoded values
