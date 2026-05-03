---
name: token-enforcer
description: "Audit any JSX, CSS, or TSX file (or the whole codebase) for hardcoded design values — hex colors, rgba strings, px sizes, font sizes — and replace them with the correct Osmos design tokens. Trigger this skill when someone says 'check my tokens', 'are we using variables', 'token audit', 'design system compliance', 'replace hardcoded colors', 'fix my tokens', 'enforce tokens', 'scan for hardcoded values', or 'are we using our CSS variables'. Also run automatically before committing any new UI page or component."
---

# Token Enforcer

Scans JSX/TSX/CSS files for hardcoded design values and produces exact replacement suggestions using the Osmos token system.

## Token Inventory

### Brand tokens (defined in `src/index.css` `:root`)

| Token | Value | Use for |
|---|---|---|
| `var(--osmos-brand-primary)` | `#636CFF` | Primary actions, active links, chart line 1 |
| `var(--osmos-brand-primary-muted)` | `rgba(99,108,255,0.12)` | Primary badge backgrounds |
| `var(--osmos-brand-green)` | `#1BA87A` | Positive KPIs, success states |
| `var(--osmos-brand-green-muted)` | `rgba(27,168,122,0.10)` | Positive badge backgrounds |
| `var(--osmos-brand-amber)` | `#F5A623` | Secondary chart line, warnings |
| `var(--osmos-nav-bg)` | `#1e2266` | Left navigation background |
| `var(--osmos-nav-panel-bg)` | `#212563` | Left nav sub-panel background |
| `var(--osmos-nav-accent)` | `#7B82F8` | Active nav item color, nav icons |
| `var(--osmos-nav-border)` | `rgba(123,130,248,0.25)` | Nav dividers |
| `var(--osmos-nav-active-bg)` | `rgba(123,130,248,0.20)` | Nav active item background |

### Semantic tokens (defined in `src/index.css` `:root` — same file as brand tokens)

| Token | Use for |
|---|---|
| `var(--osmos-bg)` | White/light surface (card, page bg in dark mode) |
| `var(--osmos-bg-subtle)` | Page background (light gray in light mode) |
| `var(--osmos-bg-muted)` | Table header, subtle fills |
| `var(--osmos-fg)` | Primary text |
| `var(--osmos-fg-muted)` | Secondary text |
| `var(--osmos-fg-subtle)` | Tertiary text, placeholders |
| `var(--osmos-border)` | All borders and dividers |

### Styling approach for this codebase

This project uses **inline style objects with CSS vars only**. Chakra-style props (e.g. `bg="bg.subtle"`, `color="fg.muted"`) do not apply — if a file uses them, treat it as a critical violation and flag it to the user immediately.

### Intentional exceptions (do NOT replace)

These hardcoded values are intentional and should never be flagged:

- `#EF4444` / `#22C55E` — semantic red/green for metric delta arrows (positive/negative)
- Heatmap cell intensities (inline computed background in heatmap grid)
- Chart dot colors that match their line's brand token (they reference the token already)
- `#fff` inside SVG `fill` or `stroke` attributes for icon rendering
- Values already using `var(--osmos-*)` tokens

## Audit Process

### Step 1 — Discover

Grep the target file(s) for:
```
#[0-9a-fA-F]{3,8}           # hex colors
rgba?\([^)]+\)               # rgb/rgba colors
font-size:\s*\d+px           # hardcoded font sizes
padding:\s*\d+px             # hardcoded padding
margin:\s*\d+px              # hardcoded margins
```

Run: `grep -rn --include="*.jsx" --include="*.tsx" --include="*.css" -E "(#[0-9a-fA-F]{6}|rgba?\()" src/`

### Step 1.5 — Component Duplication Audit

After the color grep, scan every target file for locally-defined functions that duplicate components already available in `src/ui/`. These are violations **even if they use CSS vars correctly** — the fix is to import from `src/ui/` instead.

**Grep command:**
```bash
grep -rn --include="*.jsx" -E "^(export )?function (Badge|Button|Toast|Checkbox|Tag|SearchBar|Toolbar|Drawer|Pagination|StatCard|KPIChip|InfoBanner)\b" src/
```

Also detect inline upload dropzones:
```bash
grep -rn --include="*.jsx" "dashed.*border\|border.*dashed" src/components/
```

| Pattern detected | `src/ui/` replacement |
|---|---|
| `function Badge(` | `import { Badge } from '../ui'` |
| `function Button(` | `import { Button } from '../ui'` |
| `function Toast(` + local `setToast` state | `import { Toast, useToast } from '../ui'` |
| `function Checkbox(` (custom 16×16 div) | `import { Checkbox } from '../ui'` |
| `function Tag(` (coloured chip) | `import { Tag } from '../ui'` |
| `function SearchBar(` | `import { SearchBar } from '../ui'` |
| `function Toolbar(` | `import { Toolbar } from '../ui'` |
| `function Drawer(` | `import { Drawer } from '../ui'` |
| `function Pagination(` | `import { Pagination } from '../ui'` |
| `function StatCard(` | `import { StatCard } from '../ui'` |
| `function KPIChip(` | `import { KPIChip } from '../ui'` |
| `function InfoBanner(` | `import { InfoBanner } from '../ui'` |
| Dashed-border dropzone div | `import { UploadDropzone } from '../ui'` |

**Classification:**
- **Tier C (Component Duplication):** Local function matches a `src/ui/` export and implements the same UI element. Action: (1) remove the local function, (2) add `import { X } from '../ui'`, (3) update all call sites to use the imported component's prop API.
- **Exception:** If the local function name matches but the implementation is fundamentally different (e.g. a multi-select `function Select(`), flag for user review rather than auto-replacing.

### Step 2 — Triage

For each match, classify:
- **Tier 1 (Replace now)**: Color/value has a direct semantic token mapping
- **Tier 2 (Replace with brand token)**: Brand color with a `--osmos-brand-*` match
- **Tier 3 (Intentional exception)**: Heatmap, delta arrows, SVG fills — note it and skip
- **Tier 4 (Unknown)**: Color not in the token inventory — surface to user for decision
- **Tier C (Component Duplication)**: Locally-defined function duplicating a `src/ui/` export — replace with import

### Step 3 — Report

Produce a table:

| File | Line | Hardcoded Value | Replacement | Tier |
|---|---|---|---|---|
| `StatCards.jsx` | 56 | `#22C55E` | intentional (positive delta) | 3 |
| `TopBar.jsx` | 122 | `#E53E3E` | `var(--osmos-brand-primary)` | 1 |

### Step 4 — Apply

For all Tier 1 and Tier 2 items, use the Edit tool to apply replacements.
For Tier 4 items, ask the user which token to use before replacing.

## Output Format

```
## Token Audit Report

**Files scanned:** N
**Violations found:** X (Tier 1: A, Tier 2: B, Tier 3: C intentional, Tier 4: D unknown, Tier C: E component duplications)

### Tier 1 — Applied ✅
[table of replacements made]

### Tier 2 — Applied ✅
[table of brand token replacements made]

### Tier 3 — Intentional (skipped) ℹ️
[list of exceptions with reason]

### Tier 4 — Needs decision ❓
[list of unknown values requiring user input]

### Tier C — Component Duplications ⚠️

| File | Line | Local Function | src/ui/ Replacement | Action |
|------|------|---------------|---------------------|--------|
| ManageSegmentsPage.jsx | 12 | `function Badge(` | `Badge` from `'../ui'` | Remove + import |
| ActivityLogPage.jsx | 45 | `function Toast(` | `Toast, useToast` from `'../ui'` | Remove + import |

[Apply replacements: remove local function, add import, update call sites]

**All token violations and component duplications addressed. Codebase is compliant.**
```
