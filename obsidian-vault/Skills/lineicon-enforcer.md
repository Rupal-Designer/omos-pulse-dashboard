---
type: skill
name: lineicon-enforcer
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-04-29T18:00:00Z
tags: [skill, code-quality, icons]
---

# lineicon-enforcer

Scans all JSX components for hand-rolled SVG icons and replaces them with matching named exports from `src/ui/atoms/Icon.jsx` (or the Figma design system if no match exists).

## What it catches

- Raw `<svg viewBox="0 0 24 24">` blocks inside JSX
- Local `function InfoIcon()` / `function DownloadIcon()` definitions that duplicate named exports
- `function Ico({ d, ... })` micro-wrapper functions

## Related Components

- [[Components/atoms/Icon]]
- [[Skills/component-reuse-enforcer]] — catches badge/button/drawer duplications (icons handled by this skill)
