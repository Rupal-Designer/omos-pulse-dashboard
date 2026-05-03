---
type: skill
name: shadcn-to-osmos
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-05-02T00:00:00Z
tags: [skill, code-quality, migration]
---

# shadcn-to-osmos

Migrates a single shadcn/ui + Tailwind + lucide-react page from `src/advertiser/` to use the Osmos `src/ui/` library with inline CSS vars.

## Scope

`src/advertiser/` only. For `src/retailer/` components, use [[Skills/component-reuse-enforcer]] instead.

## What it replaces

- `@/components/ui/button` → `Button` from `src/ui/`
- `@/components/ui/badge` → `Badge` from `src/ui/`
- `@/components/ui/input` → `Input` from `src/ui/`
- `@/components/ui/card` → `SectionCard` from `src/ui/`
- Tailwind classes → inline `style={{ var(--osmos-*) }}`
- `lucide-react` icons → named icon exports from `src/ui/atoms/Icon.jsx`

## Layout Override (2026-05-02)

Do NOT blindly convert `gap-N → N*4`. Apply Figma-verified layout rules:
- KPI card grid → `gap: 20` (never 12 or 16)
- Page wrapper → `padding: '20px 24px'`
- Drawer body → `padding: 20`

See [[Skills/ux-ideator]] `ia-patterns.md §5` for the full guide.
