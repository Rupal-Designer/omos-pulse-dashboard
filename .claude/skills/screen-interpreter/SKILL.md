---
name: screen-interpreter
description: "Interpret any UI input — screenshot, sketch photo, Figma URL, or text brief — and produce a structured Screen Spec JSON. Use this skill whenever someone says 'interpret this screen', 'what components do I need', 'analyze this mockup', 'break down this UI', or provides an image/URL/description of a screen they want built. Also trigger when the design-orchestrator chains to this skill. This is always the FIRST step in the design-to-code pipeline."
---

## ⚡ CARDINAL RULE — Figma is the Source of Truth

> **Every label, structure, group name, column header, button text, nav item name, and data value in the implementation MUST match the Figma design verbatim.** No paraphrasing. No inventing. No "close enough."
>
> - If Figma says `"Manage CPM/CPC Rules"` → code says `"Manage CPM/CPC Rules"` (not "Manage CPM Rules")
> - If Figma says `"Ops User"` (singular) → code says `"Ops User"` (not "Ops Users")
> - If Figma says `"Super Admin users"` (lowercase u) → code says `"Super Admin users"`
> - If Figma groups "Manage Segments" under **Audience Manager** → the nav puts it under Audience Manager (not Advertiser Settings)
> - If a text node is unreadable → mark it `[UNREADABLE]` and surface it to the user before writing any code
>
> **Do not trust your own inference about what a label "should" be.** Read the Figma text node. Copy it. Done.
>
> This rule overrides all other heuristics, templates, and defaults in this skill.

---

# Screen Interpreter

Takes any visual or textual description of a UI screen and produces a **structured Screen Spec JSON** that downstream skills (figma-wireframer, react-implementer) can consume.

## Accepted Inputs

1. **Screenshot or sketch photo** — Use vision to identify UI regions, components, layout hierarchy, navigation patterns, and data zones
2. **Figma URL** — Use `use_figma` MCP tool to traverse the node tree, read layer names, auto-layout settings, component instances, and text content
3. **Text brief / PRD** — Parse requirements into screen zones, infer information architecture

## Process

### Step 1: Identify Screen Type

Classify the input into one of these common patterns:
- `data-management-list` — Table with CRUD actions (like Advertisers)
- `dashboard` — KPI cards + charts + summary tables
- `settings-form` — Tabbed forms with configuration options
- `wizard-flow` — Multi-step guided process
- `detail-view` — Single entity with sections
- `report` — Filters + data visualization + export
- `permission-matrix` — Cross-table where **rows = features/items** and **columns = categories/personas/roles** with checkboxes or toggles per cell. DO NOT confuse this with tabs — the categories are columns rendered side-by-side, NOT tab-switched views.

> ⚠️ **Critical distinction — Matrix vs Tabs:**
> - If you see multiple column headers (e.g. Platinum / Gold / Silver / Beta) each with their own column of checkboxes rendered simultaneously → it is a `permission-matrix`. Implement as a single table.
> - If only one category is visible at a time and the user clicks to switch → it is tabs. 
> When in doubt from Figma node names: look for sibling `[Frame]` nodes at the same depth each labelled with a category name — that is a matrix, not tabs.

### Step 2: Zone Mapping

Break the screen into zones. Every screen has some subset of:
- `breadcrumb` — Navigation path
- `topBar` — Page header with title and actions
- `infoBanner` — Alert/notification banner
- `tabs` — Tab navigation
- `toolbar` — Filters, search, action buttons
- `dataTable` — Primary data display
- `pagination` — Table pagination
- `sidebar` — Side navigation or filters
- `modals` — Overlay dialogs triggered from the page
- `cards` — KPI or info cards
- `charts` — Data visualizations

### Step 3: Component Intent Mapping

For each zone, identify the **intent** (what it does) and the **`src/ui/` component** to use. All component names below are importable from `'../ui'`.

| UI Pattern Detected | `src/ui/` Component | Key Props |
|---------------------|---------------------|-----------|
| Action button | `Button` | `variant`: primary\|outline\|ghost\|icon\|link |
| Status pill | `Badge` | `status`: Active\|Inactive\|Paused\|Live\|Draft\|Error |
| Custom type chip | `TypeBadge` | `type`, `colorMap` |
| Coloured category tag | `Tag` | `colorScheme`: green\|amber\|blue\|gray\|red |
| Text input with label | `Input` | `label`, `value`, `onChange`, `required`, `helperText` |
| Dropdown selector | `Select` | `label`, `value`, `onChange`, `options`: [{value, label}] |
| Checkbox cell / toggle | `Checkbox` | `checked`, `onChange`, `label` |
| Search input with magnifier | `SearchBar` | `value`, `onChange`, `placeholder`, `width` |
| Toolbar (left + right slots) | `Toolbar` | `left`, `right`, `noBorder` |
| Right-side slide panel | `Drawer` | `open`, `onClose`, `title`, `footer`, `width` |
| Toast notification | `Toast` + `useToast` | `const { toast, showToast } = useToast()` |
| KPI metric card | `StatCard` | `label`, `value`, `trend`, `trendDir` |
| Compact metric chip | `KPIChip` | `label`, `value` |
| Table pagination controls | `Pagination` | `total`, `page`, `perPage`, `onChange`, `entityLabel` |
| File download info bar | `InfoBanner` | `fileName`, `fileDesc`, `downloadText`, `onDownload` |
| Dashed upload dropzone | `UploadDropzone` | `onFile`, `accept`, `label`, `successMessage` |
| Full upload page | `UploadPage` | `fileName`, `fileDesc`, `downloadText`, `howItWorksBullets[]` |
| Any SVG icon | Named icon export or `Icon` with SVG children | `SearchIcon`, `PlusIcon`, `EditIcon`, … |
| Data grid / table | `raw-table` (use raw `<table>` HTML — no Table molecule in `src/ui/`) | — |
| Centered dialog overlay | `hand-rolled-overlay` (fixed-position div — no Modal molecule in `src/ui/`) | — |
| Tab navigation bar | `hand-rolled-tabs` (row of `Button` atoms) | — |
| Activity log / timeline | `hand-rolled-timeline` (raw `<div>` list with CSS vars) | — |
| Charts | `recharts` | `LineChart`, `BarChart`, `AreaChart` |

### Step 4: Output Screen Spec JSON

Produce a JSON object with this structure:

```json
{
  "componentLibrary": "src/ui/",
  "screenType": "data-management-list",
  "title": "Advertisers",
  "description": "Manage advertisers with CRUD, bulk upload, rules, and history",
  "zones": {
    "breadcrumb": {
      "items": ["Online Ad Management", "Space World"]
    },
    "infoBanner": {
      "component": "InfoBanner",
      "text": "Edit Advertiser info..."
    },
    "toolbar": {
      "component": "Toolbar",
      "left": [{ "component": "Select", "purpose": "status-filter" }],
      "right": [
        { "component": "Button", "variant": "outline", "label": "Bulk Upload" },
        { "component": "Button", "variant": "primary", "label": "Create Advertiser" }
      ]
    },
    "dataTable": {
      "component": "raw-table",
      "columns": ["checkbox", "Advertiser ID", "Store ID", "Name", "Persona", "Spend YTD", "Spend YoY", "Rules", "Actions"],
      "features": ["row-selection", "sortable", "action-column"],
      "statusColumn": { "component": "Badge", "prop": "status" }
    },
    "pagination": { "component": "Pagination" }
  },
  "drawers": [
    {
      "name": "AddAdvertiser",
      "trigger": "Create Advertiser button",
      "component": "Drawer",
      "width": 480,
      "fields": [
        { "component": "Input", "label": "Store(s) ID", "required": true },
        { "component": "Input", "label": "Advertiser Name", "required": true },
        { "component": "Select", "label": "Persona", "required": true }
      ]
    }
  ],
  "dataRequirements": {
    "entities": ["Advertiser"],
    "fields": ["id", "storeId", "name", "persona", "productSpendYtd", "productSpendYoY", "catalogRules", "createdAt"]
  }
}
```

### Step 5: Pass to Next Agent

Output the Screen Spec JSON and announce:

> "Screen Spec ready. All `"component"` values in this spec reference **`src/ui/`** exports — the import path is `import { X } from '../ui'`. Pass this spec to:
> - **`figma-batch-builder`** — use the `screenType` field to select the correct template, then fill in verbatim content. All imports come from `'../ui'`.
> - **`react-implementer`** — implement every `"component"` field using its `src/ui/` import. `"raw-table"` → use raw `<table>` HTML. `"hand-rolled-overlay"` → fixed-position div. `"hand-rolled-tabs"` → row of `Button` atoms."

## Important Rules

- **Always use `src/ui/` component names** — never say "dropdown", say `Select`. Never say "popup", say `Drawer`. All component names in the spec must match a `src/ui/` export or one of the `hand-rolled-*` / `raw-table` / `recharts` fallback keywords.
- **No compound dot-notation** — `src/ui/` has no compound sub-components. Never write `Table.Row`, `Modal.Body`, `Steps.Item`, etc. in the spec. Use the flat names (`raw-table`, `Drawer`, `Button`) instead.
- **Identify ALL drawers** — this codebase uses right-side `Drawer` panels, not centered modals. Look for any button that opens a form or detail panel. Emit them in the `"drawers"` array (not `"modals"`).
- **`"upload-page"` screenType** — always emit `"component": "UploadPage"` for the main zone. Do NOT decompose it into `InfoBanner` + `UploadDropzone` + how-it-works card separately — `UploadPage` already composes all three.
- **Capture data relationships** — note which fields are editable vs. display-only, which columns trigger actions, and which buttons open drawers.
- **`"componentLibrary": "src/ui/"` is mandatory** — always include this field at the top level of the output JSON so downstream skills know which library to import from.

---

## ⛔ NEVER INVENT CONTENT — Verbatim Extraction Rule

This is the most critical rule when the input is a Figma URL.

**Every label, column name, row name, feature name, button text, placeholder, and data value in the Screen Spec JSON MUST be copied verbatim from the Figma node text.** Do not paraphrase, generalise, or substitute with plausible-sounding alternatives.

If the Figma text says `"App Level Config > Enable Announcement"` — that exact string goes into the spec.  
If the Figma text says `"Performance Dashboard > Dashboard Header > Enable Wallet Balance"` — copy it exactly.

**If you cannot read a text node clearly, mark it as `"[UNREADABLE - verify in Figma]"` in the spec.** Never fill in a guess.

### Figma Extraction Checklist (run before producing the Screen Spec)

When using `use_figma` on a Figma URL, you MUST extract and include in the spec:

1. **All table/matrix row labels** — the exact text of every row header or feature name
2. **All table/matrix column headers** — exact text (these become column names, NOT tab names)
3. **Layout axis** — explicitly state whether categories appear as *columns (side-by-side)* or *tabs (one at a time)*. Look at the Figma node tree: sibling frames at the same depth = columns; frames inside a tab component = tabs.
4. **All button labels** — exact wording
5. **All modal/drawer field labels** — exact wording including asterisks for required fields
6. **Any descriptive/help text** — copy verbatim, do not summarise

### Matrix Table Spec Format

When screen type is `permission-matrix`, the spec MUST include:

```json
{
  "screenType": "permission-matrix",
  "layout": {
    "rowAxis": "feature",
    "columnAxis": "persona",
    "cellControl": "checkbox"
  },
  "rows": [
    "App Level Config > Enable Announcement",
    "App Level Config > Enable ask for rating",
    "Performance Dashboard > Enable Performance Dashboard",
    "Performance Dashboard > Dashboard Header > Enable Header"
  ],
  "columns": ["Platinum", "Gold", "Silver", "Beta"],
  "note": "Columns are rendered SIMULTANEOUSLY as a wide table — NOT as tabs"
}
```
