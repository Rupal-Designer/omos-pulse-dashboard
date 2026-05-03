---
type: skill
name: ux-auditor
category: ux-research
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-04-29T18:00:00Z
tags: [skill, ux-research, audit]
---

# ux-auditor

Runs a structured UX audit on any screen using Peter Morville's UX Honeycomb framework, customized for Osmos's retail media context.

## Honeycomb Dimensions

Useful · Usable · Findable · Credible · Desirable · Accessible · Valuable

**Score:** each dimension 1–3 → max 21 total. Pass threshold: **14/21**.

## Inputs

- File path to a `.jsx` screen component
- Screenshot
- Figma URL

## Output

- Scored table per dimension
- Prioritised fix list
- Re-run recommendation if score < 14

## Used By

- [[Skills/design-orchestrator]] — Phase 4
- [[Skills/ux-ideator]] — Phase 6
