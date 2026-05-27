---
name: figma-batch-builder
description: "End-to-end pipeline that converts a Figma URL (section or page, max 10-15 screens) into fully wired React pages. Use this skill whenever someone says 'build this Figma section', 'implement these screens from Figma', 'here is the Figma link build it', or shares a Figma URL and expects production React code. This skill chains screen-interpreter → react-implementer → app-wirer automatically. The user only needs to share the Figma URL."
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

# Figma Batch Builder

One command turns a Figma URL into production React pages, wired into the app and verified with a build check.

**User input:** A Figma URL pointing to a page or named section (max 10–15 screens recommended).  
**Output:** Working React components in `src/components/`, routes in `App.jsx`, nav items in `LeftNav.jsx`, clean build.

---

## Phase 0 — Pre-flight

Before touching any code, read the knowledge graph so you know exactly what already exists:

```
.claude/skills/figma-batch-builder/knowledge-graph.md
```

This tells you:
- Every nav ID already wired in LeftNav.jsx
- Every `case` already in App.jsx
- Every component file already in `src/components/`
- Which screen type templates to use for fast implementation

**Never build a page that already exists.** If the Figma screen matches an existing nav ID, skip it and report it as already done.

---

## Phase 0.5 — Visual Interpretation (PNG Export)

**Run this BEFORE text extraction.** Export each screen frame as PNG and read it visually to understand:
- Layout structure (which elements are side-by-side vs stacked)
- Component types (donut chart ≠ bar chart ≠ stat card)
- Grouped column headers (colspan relationships)
- Color coding and visual hierarchy

### Export a frame as PNG:

```javascript
const node = await figma.getNodeByIdAsync('FRAME_ID');
const bytes = await node.exportAsync({
  format: 'PNG',
  constraint: { type: 'SCALE', value: 0.5 }
});
return figma.base64Encode(bytes);
```

The returned base64 string can be read as an image by Claude's vision capability. Export up to **5 frames at a time**.

### What to look for in the PNG:
1. **KPI cards** — small rectangles in a row with a number and label → `stat-card`
2. **Donut/pie charts** — circular charts with center text → recharts `<PieChart>` with `innerRadius`
3. **Dual-axis line charts** — two Y-axes on left/right → recharts `<ComposedChart>` or dual `<YAxis>`
4. **Grouped table headers** — multi-row `<thead>` with `colSpan`
5. **Color-coded table cells** — table with background colors on cells (NOT a CSS grid heatmap)
6. **Sticky footer buttons** — "Save" pinned to bottom → `position: sticky; bottom: 0`
7. **Horizontal settings bar** — form fields in a row above content (not a side panel)
8. **Upload steps** — numbered 1/2 on left margin with content on right

### Critical errors prevented by PNG inspection:
- ❌ Never build a heatmap grid when the design shows a colored data table
- ❌ Never build stat cards when the design shows donut charts
- ❌ Never build a side panel when the design shows a horizontal settings bar at top
- ❌ Never add internal tabs when the design shows a simple single-action page
- ❌ Never guess layout from text order — text extraction loses all spatial relationships

---

## Phase 1 — Enumerate Screens

Use the Figma MCP tool to traverse the target URL:

```
mcp__ddfd2dfc-29f3-47b3-a66a-050992a7326d__use_figma
```

Extract from each top-level frame:
1. **Screen title** — the frame name verbatim (e.g. "Admin User", "Attribution Overrides")
2. **Breadcrumb path** — text nodes that read like "Control Center > User Access Management"
3. **Screen type** — classify using the taxonomy below
4. **Nav section** — which LeftNav group this belongs to

### Screen Type Taxonomy

| Type | Signals | Template |
|------|---------|----------|
| `upload-page` | Dashed dropzone + "How it works?" card + xlsx filename in banner | `TEMPLATE_UPLOAD` |
| `user-table` | Name / Email / Access Role columns + "Add New User" button | `TEMPLATE_USER_TABLE` |
| `permission-matrix` | Feature rows × Persona/Role columns with checkboxes side-by-side | `TEMPLATE_PERMISSION_MATRIX` |
| `data-management-list` | Table with CRUD: status badge + many columns + create drawer | `TEMPLATE_DATA_TABLE` |
| `log-viewer` | Timestamp / Event Type / Device ID columns + Log Tracker input zone | `TEMPLATE_LOG_VIEWER` |
| `dashboard` | KPI stat cards + charts + summary tables | `TEMPLATE_DASHBOARD` |
| `settings-form` | Tabbed form sections with config toggles/inputs | `TEMPLATE_SETTINGS_FORM` |

Stop at 15 screens. If there are more, list the extras and tell the user to share a more focused URL.

---

## Phase 2 — Extract Verbatim Content

For each screen, run the verbatim extraction checklist (from screen-interpreter rules):

- [ ] All table column headers — exact text
- [ ] All table row labels (for matrices) — exact text
- [ ] All button labels — exact wording
- [ ] All modal/drawer field labels — exact wording
- [ ] All placeholder text — exact wording
- [ ] Sample data rows — as many as visible in the frame
- [ ] Breadcrumb path — full hierarchy

**⛔ NEVER invent content.** If a text node is unreadable, mark it `[UNREADABLE]` and report it to the user before proceeding.

---

## Phase 3 — Determine Nav Wiring

For each screen, resolve:

1. **Nav ID** — match against the knowledge graph's `nav-ids` registry. If the screen's title fuzzy-matches an existing nav item label, use that ID. If no match, derive a slug: lowercase, hyphens, e.g. "Admin User" → `admin-user`.

2. **LeftNav group** — read from the breadcrumb. "Control Center > User Access Management" → group `User Access Management` in the `control-center` section.

3. **TopBar props** — `section` = first breadcrumb segment, `page` = screen title.

4. **App.jsx case key** — the nav ID.

Check the knowledge graph's `wired-pages` list. If the nav ID is already there → **skip, report as already done**.

---

## Phase 4 — Implement Components

For each screen (process up to 3 in parallel using Agent tool):

### Style Rules (non-negotiable for this codebase)
- **Always import from `src/ui/`** using `import { X } from '../ui'` before writing any raw HTML — check the Component Library table below first
- NO `@rishikeshjoshi-morpheus/ui`, NO Chakra, NO MUI, NO external component libraries
- CSS vars for anything `src/ui/` doesn't cover: `var(--osmos-border)`, `var(--osmos-fg)`, `var(--osmos-fg-muted)`, `var(--osmos-fg-subtle)`, `var(--osmos-bg-subtle)`, `var(--osmos-brand-primary)`, `var(--osmos-brand-primary-muted)`
- Font: `'Open Sans', sans-serif` — set on the page wrapper div only
- Inline styles ONLY for structural elements not covered by `src/ui/` (e.g. `<table>` rows, chart wrappers, tab bars)
- For charts: `recharts` is allowed
- For icons: follow the **3-tier priority** below — never hand-roll when a Figma source exists

#### Icon Sourcing Priority (apply in this order)

1. **First — named exports from `src/ui/`** (`SearchIcon`, `PlusIcon`, `TrashIcon`, `EditIcon`, `RefreshIcon`, `DownloadIcon`, `CloseIcon`, `ChevronDownIcon`, etc.) — zero Figma lookup needed
2. **Second — Design-System-OS** (`58jL2Gbe53rBhxOysvHM82`, Icons page `1511:805`) — use `use_figma` to fetch the node and extract the vector path; see the Quick Reference node IDs below
3. **Fallback — Free LINE icons** (`WAZd1M7J9YzwnhoO7BRjcV`, Interface Essential page) — only when not found in Design-System-OS
4. **Last resort** — hand-roll inline SVG only if no Figma match exists

**Design-System-OS Quick Reference (file `58jL2Gbe53rBhxOysvHM82`):**

| Intent | DS Node ID | Name | Intent | DS Node ID | Name |
|--------|-----------|------|--------|-----------|------|
| search | `7391:30070` | search-lg | trash | `7391:30064` | trash-03 |
| edit | `7391:30049` | edit-03 | eye | `7391:30050` | eye |
| filter-funnel | `7391:30051` | filter-funnel-02 | filter-lines | `7391:30052` | filter-lines |
| menu | `7391:30053` | menu-01 | refresh | `7391:30054` | refresh-cw-02 |
| close/x | `7391:30072` | x-close | plus | `7391:30069` | plus |
| download | `7391:30071` | download-01 | upload | `7391:30127` | upload-01 |
| chevron-left | `7391:30067` | chevron-left | chevron-right | `7391:30068` | chevron-right |
| arrow-left | `7391:30065` | arrow-narrow-left | arrow-right | `7391:30066` | arrow-narrow-right |
| home | `7391:30059` | home-03 | help | `7391:30058` | help-circle |
| info | `7391:30090` | i icon | wallet | `7391:30057` | wallet-03 |
| more/dots | `7391:30073` | dots-vertical | link-external | `7391:30048` | link-external-01 |
| check | `7391:30092` | check-circle | alert/warning | `7391:30095` | alert-triangle |
| calendar | `7391:30110` | calendar | user | `7391:30115` | user-01 |
| users | `7391:30135` | users-01 | file | `7391:30117` | file-02 |
| activity | `7391:30047` | Activity | control-center | `7391:30074` | Control Center |
| finance | `7391:30076` | Finance | onboarding | `7391:30075` | Onboarding |
| dev-settings | `7391:30061` | Dev Settings | settings/config | `7391:30107` | Config |

### Component Library Quick Reference — always check before writing raw HTML

Import path from any page file: `import { X } from '../ui'`

| Need | Use from src/ui/ | Key Props |
|------|-----------------|-----------|
| Primary / outline / ghost / icon / link button | `Button` | variant: primary\|outline\|ghost\|icon\|link |
| Status pill (Active/Inactive/Paused/Live/Draft/Error) | `Badge` | status= |
| Custom type chip with arbitrary colors | `TypeBadge` | type=, colorMap={type:{bg,color}} |
| Text input with label | `Input` | label, value, onChange, required, type |
| Dropdown select | `Select` | label, value, onChange, options=[{value,label}] |
| 16×16 brand-primary custom checkbox | `Checkbox` | checked, onChange, label |
| Coloured chip/tag | `Tag` | colorScheme: green\|amber\|blue\|gray\|red |
| Toast notification | `Toast` + `useToast` | visible, message, type / hook |
| Search input with magnifier icon | `SearchBar` | value, onChange, placeholder, width |
| Toolbar row (left + right slots) | `Toolbar` | left, right, noBorder |
| "Showing X-Y of Z" + Prev/Next | `Pagination` | total, page, perPage, onChange, entityLabel |
| Right-side slide-in overlay panel | `Drawer` | open, onClose, title, children, footer, width=480 |
| File download info banner | `InfoBanner` | fileName, fileDesc, downloadText, onDownload |
| Dashed upload dropzone + drag-drop | `UploadDropzone` | onFile, accept, label, successMessage |
| KPI metric card | `StatCard` | label, value, trend, trendDir: up\|down\|neutral |
| Compact metric chip | `KPIChip` | label, value |
| Full upload page layout | `UploadPage` | fileName, fileDesc, downloadText, howItWorksBullets[] |
| Common SVG icons | `SearchIcon`, `FilterIcon`, `RefreshIcon`, `DownloadIcon`, `PlusIcon`, `TrashIcon`, `EditIcon`, `CloseIcon`, `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `UploadIcon`, `FileIcon`, `CheckIcon`, `SortIcon`, `CalendarIcon`, `EyeIcon`, `ColumnsIcon`, `InfoIcon`, `MoreIcon` | size, color, strokeWidth |
| Custom icon shape | `Icon` | size, color, strokeWidth, children=SVG paths |

**Before writing any button, badge, input, checkbox, toast, search bar, drawer, or pagination as raw HTML — import it from `src/ui/` instead.**

### Template Patterns

#### TEMPLATE_UPLOAD
```jsx
import { UploadPage } from '../ui';
// UploadPage already composes InfoBanner + UploadDropzone + "How it works?" card.
// Do NOT hand-roll any of those three — just pass props:
export default function MyUploadPage() {
  return (
    <div style={{ padding: 32, background: 'var(--osmos-bg-subtle)', minHeight: '100vh' }}>
      <UploadPage
        fileName="merchant_account_manager_mapping.xlsx"
        fileDesc="Excel template with sample data. Get the template with the correct format and structure"
        downloadText="↓ Download file for all advertisers"
        howItWorksBullets={[
          'Click on the "Download file for all advertisers".',
          'This file will contain the account manager mapping for all your advertisers.',
          'Update the account manager for the advertisers you want to change.',
          'Save your file and upload it back to the platform.',
        ]}
      />
    </div>
  );
}
```

#### TEMPLATE_USER_TABLE
```jsx
import { Toolbar, SearchBar, Button, Drawer, Input, Select, Badge,
         PlusIcon, TrashIcon, RefreshIcon, SortIcon,
         Toast, useToast } from '../ui';

// Toolbar with Change Log link + search + Add button:
<Toolbar
  left={
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <RefreshIcon size={13} color="var(--osmos-brand-primary)" />
      <span style={{ fontSize: 13, color: 'var(--osmos-brand-primary)', fontWeight: 600, cursor: 'pointer' }}>
        Change Log
      </span>
    </span>
  }
  right={
    <span style={{ display: 'flex', gap: 8 }}>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Name" width={200} />
      <Button variant="primary" onClick={() => setDrawerOpen(true)}>
        <PlusIcon size={13} color="#fff" /> Add New User
      </Button>
    </span>
  }
/>

// Table rows — raw <table> is fine here (no Table molecule in src/ui/), but:
// - Status column → <Badge status={row.status} />  (NOT a hand-rolled pill)
// - Sort toggle → <SortIcon size={12} />           (NOT a custom span)
// - Delete → <Button variant="icon" onClick={() => handleDelete(row.id)}><TrashIcon size={14} /></Button>

// Create / Edit drawer:
<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add New User"
  footer={
    <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </span>
  }
>
  <Input label="Name *" value={name} onChange={e => setName(e.target.value)} required />
  <Input label="Email *" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
  <Select label="Access Role *" value={role} onChange={e => setRole(e.target.value)}
    options={[
      { value: 'administrator', label: 'Administrator' },
      { value: 'viewer', label: 'Viewer' },
      { value: 'editor', label: 'Editor' },
    ]} />
</Drawer>

// Toast:
const { toast, showToast } = useToast();
<Toast {...toast} />
// trigger: showToast('User added successfully') or showToast('User deleted', 'error')
```

#### TEMPLATE_PERMISSION_MATRIX
```jsx
import { Toolbar, SearchBar, Button, Checkbox, Toast, useToast } from '../ui';

// Toolbar with tab group (left) + search + Change Log (right):
<Toolbar
  left={/* tab group — hand-rolled pill tabs since no Tabs molecule in src/ui/ */}
  right={
    <span style={{ display: 'flex', gap: 8 }}>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search Feature Name" width={200} />
      <Button variant="outline">Change Log</Button>
    </span>
  }
/>

// Per-cell checkbox — use Checkbox atom, NOT a hand-rolled 16×16 div:
<Checkbox
  checked={config[persona][featureId]}
  onChange={() => handleToggle(persona, featureId)}
/>
// The Checkbox atom IS already a custom 16×16 brand-primary box with white check SVG.
// Never rebuild it inline.

// Footer save:
const { toast, showToast } = useToast();
<Button variant="primary" onClick={() => showToast('Configuration saved successfully')}>Save</Button>
<Toast {...toast} />
```

#### TEMPLATE_DATA_TABLE
```jsx
import { Toolbar, SearchBar, Button, Badge, Drawer, Input, Select,
         Pagination, EditIcon, TrashIcon, PlusIcon, DownloadIcon,
         Toast, useToast } from '../ui';

// Toolbar:
<Toolbar
  left={
    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>
      Segments ({total})
    </span>
  }
  right={
    <span style={{ display: 'flex', gap: 8 }}>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      <Button variant="outline"><DownloadIcon size={14} /> Export</Button>
      <Button variant="primary" onClick={() => setDrawerOpen(true)}>
        <PlusIcon size={13} color="#fff" /> Create Segment
      </Button>
    </span>
  }
/>

// Table row status and actions:
<Badge status={row.status} />   // 'Active' | 'Inactive' | 'Paused'
<Button variant="icon" onClick={() => openEdit(row)}><EditIcon size={14} /></Button>
<Button variant="icon" onClick={() => handleDelete(row.id)}><TrashIcon size={14} /></Button>

// Create/Edit drawer:
<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Create Segment" width={480}
  footer={
    <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </span>
  }
>
  <Input label="Segment Name *" value={name} onChange={e => setName(e.target.value)} required />
  <Select label="Status" value={status} onChange={e => setStatus(e.target.value)}
    options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
</Drawer>

// Pagination at table footer:
<Pagination total={total} page={page} perPage={20} onChange={setPage} entityLabel="segments" />

// Toast:
const { toast, showToast } = useToast();
<Toast {...toast} />
```

#### TEMPLATE_LOG_VIEWER
```jsx
import { Toolbar, Button, Input, TypeBadge, Toast, useToast } from '../ui';

// Zone 1 — Log Tracker: use Input + Button atoms, NOT raw <input> + <button>
<div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 8 }}>
  <Input label="Device ID / Tag" value={tag} onChange={e => setTag(e.target.value)}
    placeholder="Enter device ID or tag" style={{ flex: 1 }} />
  <Button variant="outline" onClick={handleAdd}>Add</Button>
  <Button variant="primary" onClick={handleStart}>Start Logging</Button>
</div>

// Event type badge — use TypeBadge with colorMap, NOT hand-rolled pills:
const EVENT_COLORS = {
  info:    { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  error:   { bg: 'rgba(239,68,68,0.10)', color: '#EF4444' },
  warning: { bg: 'rgba(245,166,35,0.12)', color: 'var(--osmos-brand-amber)' },
  success: { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
};
<TypeBadge type={row.eventType} colorMap={EVENT_COLORS} />

// "View" link in Logs column → toast:
const { toast, showToast } = useToast();
<span style={{ color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontSize: 12 }}
  onClick={() => showToast(`Log: ${row.logs}`)}>View</span>
<Toast {...toast} />
```

### Component File Rules
- One `.jsx` file per screen in `src/components/`
- Filename: PascalCase matching the page title, suffix `Page` — e.g. `AdminUserPage.jsx`
- Default export: the page function
- All mock data as constants at the top of the file
- No props — all state is internal

---

## Phase 5 — Wire Into App

Edit `src/App.jsx`:

```jsx
// 1. Add import at the top (with other imports):
import NewPageComponent from './components/NewPageComponent';

// 2. Add case in renderPage() switch:
case 'nav-id':
  return (
    <>
      <TopBar section="Section Name" page="Page Title" onNavigate={setActivePage} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
        <NewPageComponent />
      </main>
    </>
  );
```

If the nav ID already has a case → skip (do not overwrite).

---

## Phase 6 — Wire Into LeftNav

Edit `src/components/LeftNav.jsx` — add to the correct section's `items` array:

```js
{ id: 'nav-id', label: 'Page Title', group: 'Group Name' },
```

Match the section by the breadcrumb's first segment:
- "Control Center" → `control-center` section
- "Analytics" → `analytics` section
- "Finance" → `finance` section
- "Health" → `health` section

Place the new item in the correct group, near other items with the same group label.

If the nav ID already exists in LeftNav → skip.

---

## Phase 7 — Build Verification

```bash
cd "/Users/rishikeshjoshi/OMOS TEST" && npx vite build --mode development 2>&1 | tail -20
```

- ✅ "built in Xms" with no errors → success
- ❌ Import errors → fix the offending import and rebuild
- ❌ JSX syntax errors → fix and rebuild

---

## Phase 8 — Update Knowledge Graph

After a successful build, append the newly wired pages to the knowledge graph:

```
.claude/skills/figma-batch-builder/knowledge-graph.md
```

Add each new page to the `wired-pages` registry and update `nav-ids` with any new IDs.

---

## Reporting Format

After completing all phases, report to the user:

```
## Build Complete — X screens added

| Screen | Component | Nav ID | Status |
|--------|-----------|--------|--------|
| Admin User | AdminUserPage.jsx | admin-user | ✅ Built |
| Attribution Overrides | AttributionOverridesPage.jsx | attribution-overrides | ✅ Built |
| Wallet Rules | — | wallet-rules | ⏭ Already existed |

Build: ✅ Clean (2741 modules, 0 errors)
```

---

## Error Handling

| Situation | Action |
|-----------|--------|
| Figma node unreadable | Mark `[UNREADABLE]`, skip that screen, report to user |
| Screen matches existing page | Skip, report as "already exists" |
| Build error after wiring | Show the error, auto-fix if it's a missing import, otherwise report |
| More than 15 screens in URL | Process first 15, list the rest for user to decide |
| Ambiguous nav ID | Use the exact frame name, slugified — don't guess |

---

## Quality Rules

1. One `.jsx` file per screen — no multi-screen files.
2. All mock data as constants at the top of the file — never inline in JSX.
3. No external component libraries — only hand-rolled inline styles with CSS vars.
4. Every nav ID must be unique across `App.jsx` and `LeftNav.jsx`.
5. Never overwrite an existing `case` in `App.jsx` — skip and report.
6. Always use `'Open Sans', sans-serif` for all text.
7. Always use CSS token vars (`var(--osmos-*)`) — never hardcode colors or sizes.
8. Build must be clean (0 errors) before marking a screen as done.
9. Never invent copy — if text is unreadable in Figma, mark `[UNREADABLE]`.
10. Keep components self-contained — no props, no context, no external state.
11. **PNG before text** — Always export the frame as PNG and visually interpret it before reading text nodes. Text extraction is for verbatim copy only; layout must be read from the visual.
12. **Color-coded tables ≠ heatmap grids** — If cells have background colors in a table structure, implement as a `<table>` with conditional cell `background` style, not a CSS grid.
13. **Donut charts ≠ stat cards** — "86.5 M Requests" repeated 4 times = 4 donut charts (recharts PieChart with innerRadius), not 4 stat cards.
14. **Always import from `src/ui/`** — check the Component Library Quick Reference table before writing any UI element as raw JSX/HTML. If it exists in `src/ui/`, import it; never duplicate it inline.
15. **No local function re-implementations** — never define `function Badge(`, `function Toast(`, `function Button(`, `function Drawer(`, `function Checkbox(`, `function Pagination(`, or any function matching a `src/ui/` export name. Import from `'../ui'` instead.
