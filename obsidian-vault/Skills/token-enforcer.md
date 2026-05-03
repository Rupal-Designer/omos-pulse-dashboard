---
type: skill
name: token-enforcer
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-04-29T18:00:00Z
tags: [skill, code-quality, tokens]
---

# token-enforcer

Audits JSX/TSX/CSS files for hardcoded design values and replaces them with `var(--osmos-*)` CSS tokens. Four-tier system.

## Tiers

| Tier | Action |
|---|---|
| 1 | Exact replacement available → auto-apply |
| 2 | Brand token needed → auto-apply |
| 3 | Intentional (chart colors, semantic deltas) → skip |
| 4 | Needs human decision → ask |

## Arguments

`--file <path>` · `--dir <path>` · `--no-fix`

## Related

- [[Tokens/audit]] — latest violation snapshot
- [[Skills/component-reuse-enforcer]] — companion skill for structural duplication
