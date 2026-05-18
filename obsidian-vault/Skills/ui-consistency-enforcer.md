---
type: skill
name: ui-consistency-enforcer
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-05-14T00:00:00Z
tags: [skill, code-quality, consistency, layout]
---

# ui-consistency-enforcer

Cross-page UI consistency auditor and auto-fixer. Scans multiple JSX pages in a section and enforces a single visual standard across table headers, table rows, page wrappers, status badges, border radius, and spacing.

## Category

`code-quality` — Run after any batch of new pages is shipped, or before a section release.

## When to use

- "make the UI consistent", "check consistency", "pages look different"
- "standardize the design", "UI drift"
- After shipping a batch of new pages in a section

## How it differs from sibling skills

| Skill | Fixes |
|---|---|
| [[Skills/token-enforcer]] | Hardcoded hex/rgba color values |
| [[Skills/component-reuse-enforcer]] | Duplicate locally-defined components |
| **ui-consistency-enforcer** | Structural layout drift across pages (spacing, wrapper, table structure) |

## Reference standard

Derived from the most recent reference-quality page in the section. As of May 2026: `AdvertiserManagementPage.jsx`.

## Chains to / from

- Run after: [[Skills/react-implementer]], [[Skills/figma-batch-builder]]
- Run alongside: [[Skills/token-enforcer]]
