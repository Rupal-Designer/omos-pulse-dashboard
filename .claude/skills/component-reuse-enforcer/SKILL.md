---
name: component-reuse-enforcer
description: "Audits JSX files for locally-defined components that duplicate or near-duplicate exports from src/ui/, then enforces reuse using a Figma-style variation system. Tier 1 exact duplicates are replaced with imports immediately. Tier 2 near-duplicates trigger an extension of the src/ui/ component (new prop or variant added to the library), then replacement. Tier 3 components are proposed for promotion to src/ui/ as new atoms or molecules. Tier 4 screen-specific logic is explicitly skipped and documented. Trigger when someone says 'enforce component reuse', 'clean up duplicate components', 'audit local components', 'standardize our UI components', 'why are there multiple Badge or Button or Drawer implementations', 'reduce component duplication', 'consolidate our UI', 'are we reusing components', or 'component audit'. Also run after react-implementer or figma-batch-builder produce new screen files."
---

# Component Reuse Enforcer

The shared UI library lives at `src/ui/` and its public API is the barrel file `src/ui/index.js`. Every locally-defined component that duplicates a library export is a debt payment deferred — it means two things to maintain, two things to update when the design changes, and two things to audit.

This skill clears that debt. It does not simply delete local components and import the library version. It first asks whether the library version can cover the local use case as-is, and if not, it **extends the library** with a minimal, non-breaking prop addition — the same way Figma component properties work. New prop on the base component rather than a whole new component.

---

## Cardinal Rules

These rules override everything else:

1. **Never remove a local component before confirming the `src/ui/` replacement covers its exact visual output.** Read both implementations before acting.
2. **Tier 2 extensions go in the library file first, screen file second.** The order matters — if the library edit fails the build, stop before touching screen files.
3. **Run `pnpm build` after every batch of 5 files.** Do not accumulate 20 changes then discover a broken import.
4. **Never promote a component that contains business logic, API calls, mock data, or domain state.** Only pure presentational primitives belong in `src/ui/`.
5. **`src/advertiser/components/design-system/` and `src/advertiser/components/ui/` are out of scope.** That parallel shadcn-based library is handled by the `shadcn-to-osmos` skill.
6. **Tier 3 (new library candidates) are never auto-applied.** Present the proposal, wait for explicit user confirmation before creating any file.

---

## Phase 0 — Arguments and Scope

Parse optional arguments from the invocation message before doing any scanning.

| Argument | Behavior |
|---|---|
| `--file <path>` | Scan only the named file |
| `--dir <path>` | Scan all `.jsx` files under that directory |
| `--focus <ComponentName>` | Audit for one component type only (e.g. `--focus Badge`, `--focus Drawer`) |
| `--no-fix` | Produce the full report but apply zero edits |
| `--extend-library` | Auto-apply Tier 2 library extensions without asking first (default is to ask) |

**Default scope when no arguments given:** `src/retailer/components/`

Read `src/ui/index.js` first to build the live component inventory — the canonical list of what is and is not in the library. Do not rely on memory for this list.

---

## Phase 1 — Discovery

Run all seven greps in parallel. Collect every match into a flat candidate list: file path, line number, local name, initial category guess.

**Grep 1 — Local function definitions whose names exactly match a `src/ui/` export:**
```bash
grep -rn --include="*.jsx" -E "^(export )?(default )?function (Badge|TypeBadge|Button|Toast|Checkbox|Tag|SearchBar|Toolbar|Drawer|Pagination|Modal|StatCard|KPIChip|InfoBanner|EmptyState|SectionCard|Stepper|RadioCard|UploadDropzone)\b" src/
```

**Grep 2 — Badge-family name variants (near-duplicates by intent):**
```bash
grep -rn --include="*.jsx" -E "^function (StatusBadge|PersonaBadge|RuleTypeBadge|DataTypeBadge|YesNoBadge|LabelBadge|DSStatusBadge|DSLabelBadge)\b" src/
```

**Grep 3 — Local icon aliases (functions or consts wrapping named Icon exports):**
```bash
grep -rn --include="*.jsx" -E "^(export )?(const|function) (InfoIcon|DownloadIcon|ChevDown|ChevronDown|FilterIcon|SearchIcon|DlIcon|ColIcon|SortIcon|BarChartIcon|MoreVerticalIcon|CalendarIcon|PlusIcon|EditIcon|TrashIcon|CloseIcon|EyeIcon|CheckIcon|UploadIcon)\b" src/
```

**Grep 4 — Inline button style objects (Button variant duplicates):**
```bash
grep -rn --include="*.jsx" -E "(btnBase|btnPrimary|btnDanger|btnOutline|BtnPrimary|BtnOutline|BtnDanger)\s*[=\{]" src/
```

**Grep 5 — Raw SVG icon components (cross-reference against the 18 named icons in `src/ui/atoms/Icon.jsx`):**
```bash
grep -rn --include="*.jsx" -E 'viewBox="0 0 24 24"' src/retailer/ src/advertiser/components/campaign-table.jsx
```
Match each `viewBox` against the SVG paths in `src/ui/atoms/Icon.jsx`. If a match exists, it is a Tier 1 candidate. If no match exists, route to the `lineicon-enforcer` skill — that skill handles raw SVG path replacement from the Figma icon library.

**Grep 6 — Local `Ico` micro-wrapper definitions:**
```bash
grep -rn --include="*.jsx" -E "^function Ico\b" src/
```
The `Ico` function `({ d, size, stroke, sw })` is a thin wrapper around `Icon` from `src/ui`. Every file that defines it is duplicating the interface. Remove the wrapper; replace `<Ico d={<>...</>}>` call sites with the appropriate named icon import or with `<Icon size={...} color={...}>` directly.

**Grep 7 — Custom upload dropzone divs (dashed-border patterns not using `UploadDropzone`):**
```bash
grep -rn --include="*.jsx" -E "border.*2px dashed|dashed.*border.*2px" src/retailer/
```
Cross-reference each hit against the file's imports. If the file does not import `UploadDropzone` from `src/ui`, it is a candidate. Confirm that `src/ui/molecules/UploadDropzone` covers the local `onDragOver`/`onDrop` behavior before classifying — if the local zone has behavior `UploadDropzone` does not support, this becomes Tier 2 or Tier 3.

---

## Phase 2 — Classification

For each candidate from Phase 1, read both the local implementation and the corresponding `src/ui/` component. Classify into one of four tiers. Do not guess — read the source.

---

### Tier 1 — Exact Duplicate

**Criteria:** The local component produces visually identical output to its `src/ui/` counterpart for the same input. Same prop names, same token usage, same markup shape. The only difference is the definition lives in the wrong file.

**Action:** Remove the local function definition. Add named import from `'../../ui'`. Update all JSX call sites. If prop names differ between the local function and the library component (e.g. local uses `value=` but library uses `status=`), update the call sites to use the library's prop names.

**Known Tier 1 hits in this codebase:**

| File | Line (approx) | Local | src/ui/ Replacement | Prop rename needed? |
|---|---|---|---|---|
| `PersonaConfigPage.jsx` | 40 | `function Checkbox(` | `Checkbox` | No |
| `AdvertisersPage.jsx` | 97 | `function Checkbox(` | `Checkbox` | No |
| `SellerAdvertiserOnboardingPage.jsx` | 95 | `function Modal(` | `Modal` | Check footer/title prop alignment |
| `AdvertisersPage.jsx` | 133–170 | `ModalPanel`, `ModalHeader`, `ModalBody`, `ModalFooter` | `Modal` with `title`, `children`, `footer` slots | Yes — collapse sub-components |
| `ManageSegmentsPage.jsx` | 33 | `function StatusBadge({ value })` | `<Badge status={value}>` | `value` → `status` |
| `ManageAttributesPage.jsx` | 37 | `function StatusBadge({ s })` | `<Badge status={s}>` | `s` → `status` |
| `ManageCPMRulesPage.jsx` | 46 | `function StatusBadge({ s })` | `<Badge status={s}>` | `s` → `status` |
| `AutomatedRulesPage.jsx` | 73 | `function TypeBadge({ type })` | `<TypeBadge type={type} colorMap={TYPE_COLORS}>` | Keep local `TYPE_COLORS` const — only the function definition is removed |
| `ManageSegmentsPage.jsx` | 48 | `function TypeBadge({ type })` | `<TypeBadge type={type} colorMap={TYPE_MAP}>` | Same — keep local color map |
| `AdvertisersPage.jsx` | 172 | `function BtnPrimary(` | `<Button variant="primary">` | Remove wrapper entirely |
| `SellerAdvertiserOnboardingPage.jsx` | 36–46 | `btnBase`/`btnPrimary` style objects + `<button style={btnPrimary}>` | `<Button variant="primary">` / `<Button variant="outline">` | Replace `<button>` with `<Button>` |
| `HomePage.jsx` | top | `ChevDown`, `InfoIcon`, `DownloadIcon` wrappers | `ChevronDownIcon`, `InfoIcon`, `DownloadIcon` from `'../../ui'` | None |
| `AdvertiserInsightsPage.jsx` | top | 7 local icon aliases (`ChevDown`, `InfoIcon`, `FilterIcon`, `SearchIcon`, `DlIcon`, `ColIcon`, `SortIcon`) | Corresponding named icon imports from `'../../ui'` | None |
| `DataTable.jsx` | 4–57 | Raw SVG `InfoIcon`, `SortIcon`, `SearchIcon`, `DownloadIcon`, `ChevronDown` | Named icon imports from `'../../ui'` | None |
| `LeftNav.jsx` | 208 | Local `function Icon(` re-definition | `Icon` from `'../../ui'` | None |
| 8 files with `function Ico(` | various | `Ico` micro-wrapper | Remove function; replace `<Ico d={...}>` with named icon import or `<Icon>` | Call-site update required |
| `PersonaConfigPage.jsx`, `SellerAdvertiserOnboardingPage.jsx`, `BrandAdvertiserOnboardingPage.jsx` | various | `function PersonaBadge(` with hardcoded hex | `<TypeBadge type={p} colorMap={PERSONA_COLORS}>` — keep `PERSONA_COLORS` const local | `PersonaBadge p=` → `TypeBadge type=` |

**Before/after example:**
```jsx
// BEFORE — ManageCPMRulesPage.jsx line 46
function StatusBadge({ s }) {
  const active = s === 'Active';
  return (
    <span style={{
      background: active ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)',
      color: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)',
      borderRadius: 10, padding: '3px 8px', fontSize: 12, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 5
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%',
        background: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)' }} />
      {s}
    </span>
  );
}
// usage: <StatusBadge s={row.status} />

// AFTER
import { Badge } from '../../ui';
// usage: <Badge status={row.status} />
```

---

### Tier 2 — Near-Duplicate with Variation Needed

**Criteria:** The local component is visually similar to a `src/ui/` component but requires something the library does not yet expose — an additional optional prop, a new value in a variant map, an extra text slot. The delta is **purely cosmetic**. No state. No API calls. No domain logic.

**The Variation Creation Algorithm:**

Step 1 — Read both implementations side by side. Write down the exact delta.

Step 2 — Verify the delta is cosmetic: a new optional prop, a new value in a style variant map, or a conditional extra render. If the delta requires state management, API calls, or domain-specific child components, escalate to Tier 3 or 4.

Step 3 — Determine the prop shape. Follow the CSS-in-JS pattern already used in `src/ui/`: a `const VARIANTS = { ... }` map, or a simple conditional render gated on truthiness.

Step 4 — Edit the `src/ui/` component. The extension must be non-breaking: all existing callers that don't pass the new prop are unaffected. Use optional props with undefined defaults.

Step 5 — Check `src/ui/index.js`. Prop additions to existing components do not need a new export. If a new named component was created, add it to the barrel.

Step 6 — Edit the screen file: remove the local function definition, use the extended component, update prop names.

Step 7 — Run `pnpm build`.

**Known Tier 2 hits:**

| File | Local | Target | Extension required |
|---|---|---|---|
| `BrandAdvertiserOnboardingPage.jsx` | `function Drawer({ title, subtitle, ... })` | `src/ui/molecules/Drawer.jsx` | Add optional `subtitle` prop — 11px muted text below title |
| `SellerAdvertiserOnboardingPage.jsx` | `function Drawer({ title, subtitle, ... })` | Same extension (apply once, use in both files) | Replace only after library updated |
| `HomePage.jsx` | `function StatCard({ label, value, compValue, compPct })` | `src/ui/molecules/StatCard.jsx` | Add optional `compValue` + `compPct` props — colored comparison row below value |

**Extension code — `Drawer` subtitle prop:**

In `src/ui/molecules/Drawer.jsx`, inside the header block, immediately after the title `<span>`:
```jsx
{subtitle && (
  <span style={{
    fontSize: 11,
    color: 'var(--osmos-fg-subtle)',
    marginTop: 2,
    display: 'block',
    fontWeight: 400,
  }}>
    {subtitle}
  </span>
)}
```
Add `subtitle` to the destructured props. No change to `src/ui/index.js` required.

**Extension code — `StatCard` compValue/compPct props:**

In `src/ui/molecules/StatCard.jsx`, below the main value `<span>`:
```jsx
{compPct !== undefined && (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
    {compValue && (
      <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{compValue}</span>
    )}
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      color: compPct >= 0 ? 'var(--osmos-brand-green)' : '#ef4444',
    }}>
      ({compPct >= 0 ? '+' : ''}{compPct}%)
    </span>
  </div>
)}
```
Add `compValue` and `compPct` to the destructured props with `undefined` defaults. The `#ef4444` red is an intentional semantic delta (negative financial performance) — same exception category as token-enforcer. No change to `src/ui/index.js` required.

**Before/after example — Tier 2:**
```jsx
// BEFORE — BrandAdvertiserOnboardingPage.jsx (local Drawer definition)
function Drawer({ open, onClose, title, subtitle, children, footer, width = 480 }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 800, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
        onClick={onClose} />
      <div style={{ position: 'relative', width, background: 'var(--osmos-bg)', ... }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)' }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{title}</span>
          <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', display: 'block' }}>{subtitle}</span>
          <button onClick={onClose}>...</button>
        </div>
        {children}
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}

// AFTER — extension applied to src/ui/molecules/Drawer.jsx
// Screen file now uses:
import { Drawer } from '../../ui';
// <Drawer open={open} onClose={onClose} title="Add Advertiser" subtitle="Fill in the details below" footer={...}>
```

---

### Tier 3 — New Library Candidate

**Criteria:** Purely presentational, zero business logic, appears in 3+ files in similar or identical form, no equivalent in `src/ui/`.

**Action:** Do NOT auto-apply. Present the proposal table (below) and wait for explicit user confirmation per candidate. If approved: create the component file following the library's style pattern, add export to `src/ui/index.js`, replace local usages, run `pnpm build`.

**Library style pattern for new atoms:**
```jsx
import React from 'react';

const FONT = "'Open Sans', sans-serif";

const BASE = {
  fontFamily: FONT,
  // base styles
};

const VARIANTS = {
  default: { /* ... */ },
  // additional variants
};

export function ComponentName({ variant = 'default', style, ...props }) {
  return (
    <div style={{ ...BASE, ...VARIANTS[variant], ...style }} {...props} />
  );
}
```

**Known Tier 3 candidates in this codebase:**

| Component | Appears in | Proposed location | Props needed |
|---|---|---|---|
| `Toggle` (32×18 pill switch, animated thumb) | `AdvertisersPage.jsx`, `AutomatedRulesPage.jsx`, `FinanceAdvertiserManagementPage.jsx` | `src/ui/atoms/Toggle.jsx`, export `{ Toggle }` | `checked: boolean`, `onChange: fn`, `disabled?: boolean`, `size?: 'sm' \| 'md'` |
| `DataTable` / `TableCard` (table-in-card with search, download, columns controls) | `DataTable.jsx` (already a shared utility) | `src/ui/molecules/DataTable.jsx`, export `{ DataTable }` | `columns`, `data`, `onSearch`, `onDownload`, `onColumnsChange` |
| `AttrIdChip` (monospace code pill for IDs/SKUs) | `ManageAttributesPage.jsx` | Consider as `Tag variant="code"` addition to existing `Tag` atom | `variant="code"` — monospace font, gray background |

Present this table and await user response. If user approves `Toggle`: create `src/ui/atoms/Toggle.jsx`, add `export { Toggle }` to `src/ui/index.js`, replace local usages in all three files.

---

### Tier 4 — Genuinely Screen-Specific

These components must never be flagged, proposed for removal, or modified by this skill. Document them in the skip list in the final report.

| Component | File | Reason |
|---|---|---|
| `FunnelCard` | `AdvertiserInsightsPage.jsx` | Screen-specific funnel visualization with CSS arrow rendering; no general use |
| `CreateAttributeDrawer` | `ManageAttributesPage.jsx` | Full form drawer with its own state and validation; `Drawer` from `src/ui/` is used *inside* it |
| `Field`, `TextInput` form wrappers | `BrandAdvertiserOnboardingPage.jsx` | Form layout glue tightly coupled to specific drawer content structure |
| `InlineSelect` | `SellerAdvertiserOnboardingPage.jsx` | Table-cell embedded select with specific cell sizing; appears once |
| `DSButton`, `DSModal`, `DSDrawer`, `DSStatusBadge`, `DSLabelBadge` | `src/advertiser/components/design-system/` | Parallel shadcn-based library — scope of `shadcn-to-osmos` skill |
| All of `src/advertiser/components/ui/` | advertiser app | shadcn shadow copy — scope of `shadcn-to-osmos` skill |
| Nav icon path literals | `LeftNav.jsx` | SVG paths embedded in a JS data object (not component definitions); different pattern |
| Chart SVG wrappers | Analytics pages | recharts-internal SVG; not icon atoms |
| `PersonaBadge` with domain hex colors (Platinum `#6366f1`, Gold `#f59e0b`, Silver `#64748b`) | 3 files | Hex values are intentional domain-semantic; correct fix is `TypeBadge` + screen-local `colorMap` (Tier 1 redirect), not library extension |
| `BarChartIcon`, `MoreVerticalIcon` in `campaign-table.jsx` | advertiser | Advertiser-scope icons — route to `lineicon-enforcer` for Figma icon replacement, not this skill |

---

## Phase 3 — Report

Emit the report before applying any fixes. If `--no-fix` is passed, the report is the only output.

```
## Component Reuse Audit Report

**Scope:** [directory or file scanned]
**Files scanned:** N
**Candidates found:** X total
  Tier 1 (exact duplicate → replace): A
  Tier 2 (variation needed → extend + replace): B
  Tier 3 (new library candidate → propose): C
  Tier 4 (screen-specific → skip): D

---

### Tier 1 — Exact Duplicates ✅
[table: File | Line | Local | src/ui/ Replacement | Prop rename]
[before/after code example for the highest-impact fix]

### Tier 2 — Variations Applied (or proposed if --no-fix) ✅
[table: File | Local | src/ui/ Target | Extension Added | Action]
[extension code block for each library change]

### Tier 3 — New Library Candidates ❓
[table: Component | Files | Proposed location | Props needed]
Awaiting confirmation before creating any files.

### Tier 4 — Intentional Skips ℹ️
[table: Component | File | Reason]
```

---

## Phase 4 — Apply Fixes

### Tier 1 batch (auto-apply, 5 files at a time)

For each file in the batch:
1. Open the import block. Add named imports from `'../../ui'` for every component being replaced.
2. Delete the local function definition entirely (function keyword through the closing brace).
3. Find all JSX call sites of the old local function. Update prop names where the library API differs (e.g. `StatusBadge s=` → `Badge status=`, `StatusBadge value=` → `Badge status=`).
4. After the 5-file batch: run `pnpm build`. Fix any import errors before the next batch.

### Tier 2 (extend library first, always)

1. Edit the `src/ui/molecules/<Component>.jsx` file — add the new prop using the extension code from Phase 2.
2. Run `pnpm build`. If it fails, fix the library edit before touching any screen file.
3. Edit the screen file: remove the local function definition, update the import, update JSX call sites.
4. Run `pnpm build` again.

If `--extend-library` was NOT passed, confirm with the user before applying library edits for Tier 2. Show the exact diff of the proposed library change.

### Tier 3 (user-gated, never auto-apply)

1. Present the proposal table from Phase 3.
2. Wait for explicit go/no-go per candidate. No partial approvals assumed.
3. If approved: create the component file in `src/ui/atoms/` or `src/ui/molecules/` following the `const FONT / const BASE / const VARIANTS / named export` pattern. Add the export to `src/ui/index.js`. Replace local usages in all affected files. Run `pnpm build`.

---

## Phase 5 — Build Verification

```bash
cd "/Users/rishikeshjoshi/OMOS TEST" && pnpm build 2>&1 | tail -20
```

Expected: `✓ built in [N]s` with 0 errors.

Most common error after this skill runs: a component is used but the named import was not added to the file's import block. Fix: add the import. Second most common: a new `src/ui/` component was created but not added to `src/ui/index.js`. Fix: add the export to the barrel.

---

## Phase 6 — Final Report

```
## Component Reuse Enforcement Complete

**Scope:** [scanned path]
**Files modified:** N
**Local duplicates removed:** X
**src/ui/ library extensions applied:** Y
**New library candidates proposed:** Z
**Intentional skips documented:** W

Build: clean

### Library Extensions Applied
- src/ui/molecules/Drawer.jsx — added optional `subtitle` prop
- src/ui/molecules/StatCard.jsx — added optional `compValue` + `compPct` props

### New Candidates Awaiting Confirmation
- Toggle atom (src/ui/atoms/Toggle.jsx) — appears in 3 files
- DataTable molecule (src/ui/molecules/DataTable.jsx) — already shared

### What This Skill Did Not Touch
- src/advertiser/components/design-system/ → use shadcn-to-osmos skill
- src/advertiser/components/ui/ → use shadcn-to-osmos skill
- Raw SVG icon paths without matching src/ui/ export → use lineicon-enforcer skill
```

---

## Permanent Skip List

Run this reference on every invocation. Do not re-evaluate these.

**Never flag:**
- `src/advertiser/components/design-system/**` — shadcn parallel library, wrong skill
- `src/advertiser/components/ui/**` — shadcn shadow copy, wrong skill
- `src/advertiser/components/campaign-wizard/**` — complex multi-step form, wrong skill
- `LeftNav.jsx` nav icon path literals — data object, not component definitions
- Any file under `src/ui/` itself — that is the source of truth
- `src/retailer/App.jsx`, `src/advertiser/App.jsx` — routing, no UI components
- Heatmap cells, chart SVG fill computations — recharts internals
- `PersonaBadge` with domain hex values — correct fix is TypeBadge + local colorMap (Tier 1), not library extension

**Ask before acting:**
- `UploadDropzone` candidates — confirm the local drag-state behavior (`onDragOver` border change, file validation) is covered by `src/ui/molecules/UploadDropzone`'s prop API before replacing. If not covered, classify as Tier 2 and propose the extension.
