# Obsidian Vault — Note Templates

Reference this before writing any vault note. Every note must match one of the schemas below exactly.

---

## 1. Component Note (atom / molecule / pattern)

**File path:** `obsidian-vault/Components/{layer}/{ComponentName}.md`
**Layer values:** `atoms`, `molecules`, `patterns`

```markdown
---
type: component
layer: atom
name: Button
tags: [atom, ui-component, interactive]
source-file: src/ui/atoms/Button/index.jsx
export-name: Button
last-updated: 2026-04-29T12:00:00Z
---

# Button

Brief one-line description of what this component does.

## Import

```js
import { Button } from '../ui';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| variant | primary\|outline\|ghost\|icon\|link | — | Controls visual style |
| onClick | function | — | |
| disabled | boolean | false | |
| size | string | — | |

## Used By

<!-- Pages that import this component — confirmed by reading their source files -->
- [[Pages/HomePage]]
- [[Pages/AdvertiserInsightsPage]]

## Related Components

- [[Components/atoms/Icon]]

## Figma

<!-- Link if this component maps to a known Figma frame — omit if unknown -->
```

**Tag vocabulary:**
- Layer tags: `atom`, `molecule`, `pattern`
- Category tags: `ui-component`, `interactive`, `display`, `layout`, `navigation`, `form`, `data`
- One tag per word, lowercase, hyphenated

---

## 2. Page Note

**File path:** `obsidian-vault/Pages/{ComponentFileName without .jsx}.md`
**Example:** `AdvertiserInsightsPage.jsx` → `Pages/AdvertiserInsightsPage.md`

```markdown
---
type: page
name: AdvertiserInsightsPage
nav-id: advertiser-insights
section: Analytics
group:
screen-type: dashboard
status: wired
source-file: src/components/AdvertiserInsightsPage.jsx
last-updated: 2026-04-29T12:00:00Z
tags: [page, analytics, dashboard, wired]
---

# AdvertiserInsightsPage

**Nav ID:** `advertiser-insights`
**Section:** Analytics
**Screen type:** dashboard

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/molecules/StatCard]]
- [[Components/molecules/KPIChip]]
- [[Components/atoms/Button]]

## Figma Frames

<!-- Link to known frames for this page — from knowledge-graph.md §7 -->
- [[Figma/frames/6-76364]]

## Notes

Any non-obvious implementation details, quality rules applied, or known gaps.
```

**Status values:**
- `wired` — present in both App.jsx routing and LeftNav.jsx
- `unwired` — present in LeftNav.jsx but no App.jsx case yet

---

## 3. Figma Frame Note

**File path:** `obsidian-vault/Figma/frames/{FrameId}.md`
**Frame ID format:** use hyphens instead of colons (e.g. `6:76364` → `6-76364`)

```markdown
---
type: figma-frame
frame-id: "6:76364"
name: Event Debugging / Debug Console
screen-type: log-viewer
component-file: DeveloperSettingsPage.jsx
last-imported: 2026-04-20
last-updated: 2026-04-29T12:00:00Z
tags: [figma-frame, log-viewer]
---

# Frame 6:76364 — Event Debugging / Debug Console

**Screen type:** log-viewer
**Component:** [[Pages/DeveloperSettingsPage]]
**Last imported:** 2026-04-20

## Notes

Any observations about the frame — deviations from the implementation, unreadable text nodes, etc.
```

---

## 4. Navigation Structure Note

**File path:** `obsidian-vault/Navigation/structure.md`
**Single note** — not one per section.

```markdown
---
type: nav-structure
last-updated: 2026-04-29T12:00:00Z
tags: [navigation, structure]
---

# Navigation Structure

Mirrors LeftNav.jsx NAV_SECTIONS. Each nav-id links to its page note.

## Control Center

### User Access Management
- [[Pages/SuperAdminUsersPage]] — `super-admin`
- [[Pages/OpsUsersPage]] — `ops-users`
...

### User Role Management
...

## Analytics

- [[Pages/AdvertiserInsightsPage]] — `advertiser-insights`
...

## Unwired (LeftNav only, no App.jsx case)

- `integrations` — Apps section
- `display-ads-bulk` — Display Ads section
...
```

---

## 5. Components Index Note

**File path:** `obsidian-vault/Components/index.md`

```markdown
---
type: component-index
last-updated: 2026-04-29T12:00:00Z
tags: [index, components]
---

# Component Library Index

Source: `src/ui/index.js`

## Atoms ({N} total)

| Component | Export | Source |
|-----------|--------|--------|
| [[Components/atoms/Button]] | `Button` | src/ui/atoms/Button |
| [[Components/atoms/Badge]] | `Badge`, `TypeBadge` | src/ui/atoms/Badge |
...

## Molecules ({N} total)

| Component | Export | Source |
|-----------|--------|--------|
| [[Components/molecules/StatCard]] | `StatCard` | src/ui/molecules/StatCard |
...

## Patterns ({N} total)

| Component | Export | Source |
|-----------|--------|--------|
| [[Components/patterns/UploadPage]] | `UploadPage` | src/ui/patterns/UploadPage |
```

---

## 6. Pages Index Note

**File path:** `obsidian-vault/Pages/index.md`

```markdown
---
type: page-index
last-updated: 2026-04-29T12:00:00Z
tags: [index, pages]
---

# Pages Registry

Mirrors §1 Wired Pages Registry from figma-batch-builder/knowledge-graph.md.

## Wired Pages ({N})

| Nav ID | Page | Section | Group | Screen Type |
|--------|------|---------|-------|-------------|
| `home` | [[Pages/HomePage]] | — | — | dashboard |
| `advertiser-insights` | [[Pages/AdvertiserInsightsPage]] | Analytics | — | dashboard |
...

## Unwired Pages ({N})

| Nav ID | Section | Notes |
|--------|---------|-------|
| `integrations` | Apps | No App.jsx case |
...
```

---

## 7. Figma Index Note

**File path:** `obsidian-vault/Figma/index.md`

```markdown
---
type: figma-index
last-updated: 2026-04-29T12:00:00Z
tags: [index, figma]
---

# Figma Frames Index

All frames recorded in §7 of figma-batch-builder/knowledge-graph.md.

| Frame ID | Screen Name | Component |
|----------|-------------|-----------|
| [[Figma/frames/13-92792]] | Persona Configuration | [[Pages/PersonaConfigPage]] |
| [[Figma/frames/6-76364]] | Event Debugging | [[Pages/DeveloperSettingsPage]] |
...
```

---

## 8. Token Audit Note

**File path:** `obsidian-vault/Tokens/audit.md`

```markdown
---
type: token-audit
last-updated: 2026-04-29T12:00:00Z
tags: [tokens, design-system, audit]
violation-count: 12
---

# Token Audit

Generated by: `grep -rn --include="*.jsx" --include="*.css" -E "(#[0-9a-fA-F]{3,8}|rgb\(|rgba\()" src/`
Run date: 2026-04-29

## Summary

{N} hardcoded color values found across {M} files.
Run `/token-enforcer` to replace violations with design tokens.

## Violations

| File | Line | Value | Suggested Token |
|------|------|-------|----------------|
| src/components/HomePage.jsx | 42 | `#3b4ea6` | `var(--osmos-brand-primary)` |
...

## Clean Files

Files with zero violations:
- src/ui/atoms/Button/index.jsx
...
```

---

## 9. Vault Index Note

**File path:** `obsidian-vault/index.md`

```markdown
---
type: vault-index
last-updated: 2026-04-29T12:00:00Z
tags: [index, vault]
---

# OMOS TEST — Knowledge Vault

Auto-generated by the `obsidian-knowledge-graph` skill.
Last full rebuild: 2026-04-29T12:00:00Z

## Quick Stats

| Entity | Count |
|--------|-------|
| Components (atoms) | 20 |
| Components (molecules) | 8 |
| Pages (wired) | 66 |
| Pages (unwired) | 7 |
| Figma frames | 10 |

## Sections

- [[Components/index]] — All UI components with import paths and usage maps
- [[Pages/index]] — All pages with nav IDs, sections, and screen types
- [[Navigation/structure]] — Full LeftNav tree with wikilinks
- [[Figma/index]] — All known Figma frames
- [[Tokens/audit]] — Latest token violation report

## Recently Modified

<!-- Updated by vault-sync.py on every src/ file save -->
| Time | Note | Trigger |
|------|------|---------|
| 2026-04-29T12:00:00Z | Full rebuild | obsidian-knowledge-graph skill |
```

---

## 10. Skill Note

**File path:** `obsidian-vault/Skills/{skill-name}.md`
**Skill name format:** use the exact directory name from `.claude/skills/` (e.g. `component-reuse-enforcer`)

```markdown
---
type: skill
name: component-reuse-enforcer
category: code-quality
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-04-29T12:00:00Z
tags: [skill, code-quality, components]
---

# component-reuse-enforcer

Audits JSX files for locally-defined components that duplicate or near-duplicate exports from `src/ui/`, then enforces reuse using a Figma-style variation system.

## Category

`code-quality` — Run after writing new screens to enforce `src/ui/` library reuse.

## When to use

- After any PR that adds new JSX components
- After `react-implementer` produces a new screen file
- On demand: `component-reuse-enforcer --no-fix --dir src/retailer/components`

## Arguments

| Flag | Effect |
|---|---|
| `--file <path>` | Scan one file |
| `--dir <path>` | Scan directory |
| `--no-fix` | Report only |
| `--extend-library` | Auto-apply Tier 2 library extensions |
| `--focus <Name>` | Audit one component type |

## Requires

- No external tools — reads `src/ui/index.js` and source files directly

## Chains to / from

- Triggered after: [[Skills/react-implementer]], [[Skills/figma-batch-builder]]
- Works alongside: [[Skills/token-enforcer]], [[Skills/lineicon-enforcer]]

## Operates on components

- [[Components/atoms/Button]]
- [[Components/atoms/Badge]]
- [[Components/molecules/Drawer]]
- [[Components/molecules/StatCard]]
- (all `src/ui/` exports)
```

**Category values:**
- `design-pipeline` — screen-interpreter, figma-wireframer, figma-batch-builder, react-implementer, design-orchestrator, ux-ideator
- `code-quality` — token-enforcer, lineicon-enforcer, component-reuse-enforcer, shadcn-to-osmos
- `ux-research` — ux-auditor, design-critic
- `knowledge` — obsidian-knowledge-graph

---

## 11. Skills Index Note

**File path:** `obsidian-vault/Skills/index.md`

```markdown
---
type: skills-index
last-updated: 2026-04-29T12:00:00Z
tags: [index, skills]
---

# Skills Registry

All Claude Code skills in `.claude/skills/`. Invoke any skill by typing its name in Claude Code chat.

## Design Pipeline (requires Figma MCP for full functionality)

| Skill | Description | Figma required? |
|---|---|---|
| [[Skills/screen-interpreter]] | Parse any UI input into Screen Spec JSON | Optional |
| [[Skills/figma-wireframer]] | Create hi-fi Figma wireframes from a spec | Yes |
| [[Skills/figma-batch-builder]] | Batch-import Figma section → wired React screens | Yes |
| [[Skills/react-implementer]] | Generate production React from spec or wireframe | No |
| [[Skills/design-orchestrator]] | Full pipeline: interpret → wireframe → implement → audit | Partial |
| [[Skills/ux-ideator]] | PRD → IA map → lo-fi concepts → critique → React UI | Partial |

## Code Quality (no external tools required)

| Skill | Description | Auto-fixes? |
|---|---|---|
| [[Skills/token-enforcer]] | Replace hardcoded design values with `var(--osmos-*)` tokens | Yes (Tier 1/2) |
| [[Skills/lineicon-enforcer]] | Replace hand-rolled SVG icons with named icon exports | Yes |
| [[Skills/component-reuse-enforcer]] | Enforce `src/ui/` reuse; create Figma-style variants | Tier 1 yes; Tier 2 asks |
| [[Skills/shadcn-to-osmos]] | Migrate shadcn/Tailwind pages to Osmos components | Yes |

## UX Research

| Skill | Description |
|---|---|
| [[Skills/design-critic]] | Multi-agent Rigor Matrix critique (Priya · Arjun · Meera · Zara) |
| [[Skills/ux-auditor]] | UX Honeycomb scoring on any screen, screenshot, or code |

## Knowledge

| Skill | Description |
|---|---|
| [[Skills/obsidian-knowledge-graph]] | Build or rebuild this vault |
```

---

## Wikilink Conventions

| Relationship | Link format |
|---|---|
| Page imports component | `[[Components/atoms/Button]]` |
| Component used by page | `[[Pages/AdvertiserInsightsPage]]` |
| Page linked to Figma frame | `[[Figma/frames/6-76364]]` |
| Figma frame linked to page | `[[Pages/PersonaConfigPage]]` |
| Nav structure to page | `[[Pages/ComponentName]]` |
| Index to section index | `[[Components/index]]` |
| Skill chains to skill | `[[Skills/react-implementer]]` |
| Skill enforces component | `[[Components/atoms/Button]]` |

Always use the **full vault-relative path** in wikilinks. Never use bare `[[ComponentName]]` — Obsidian resolves ambiguous short links incorrectly when multiple notes share similar names.
