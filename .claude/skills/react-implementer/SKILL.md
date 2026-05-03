---
name: react-implementer
description: "Generate production React code from a Screen Spec, Figma wireframe, or verbal description using ONLY the src/ui/ component library (hand-rolled atoms/molecules/patterns with inline CSS vars). Use this skill whenever someone says 'implement this screen', 'build the React for this', 'code this UI', 'create the component', 'generate the frontend', or when the design-orchestrator chains to this skill. NEVER use @rishikeshjoshi-morpheus/ui, Chakra, MUI, or any external component libraries. Every reusable element (buttons, inputs, badges, drawers, pagination, search, toasts, upload pages) must come from src/ui/. Also trigger when someone asks to 'migrate' an existing screen to use proper components."
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

# React Implementer

Generates production-ready React code using **exclusively** the `src/ui/` component library — hand-rolled atoms, molecules, and patterns with inline CSS vars. Inline styles are the styling mechanism. Raw HTML is acceptable for structural elements (`<table>`, `<tbody>`, `<tr>`, `<td>`, `<hr>`) that have no equivalent in `src/ui/`, but every reusable atom/molecule/pattern must be imported from `src/ui/`.

**This codebase does NOT use `@rishikeshjoshi-morpheus/ui`.** See `references/component-api.md` in this skill folder for the complete `src/ui/` component API — every atom, molecule, and pattern with exact prop signatures and usage examples.

## Import Path

```jsx
import { Button, Badge, TypeBadge, Toolbar, SearchBar, Drawer, Pagination,
         Input, Select, Checkbox, Tag, Toast, useToast,
         StatCard, KPIChip, InfoBanner, UploadDropzone, UploadPage,
         SearchIcon, FilterIcon, RefreshIcon, DownloadIcon, PlusIcon, TrashIcon,
         EditIcon, CloseIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
         UploadIcon, FileIcon, CheckIcon, SortIcon, CalendarIcon, EyeIcon,
         ColumnsIcon, InfoIcon, MoreIcon, Icon } from '../ui';
```

## ⛔ Stop-and-Verify Rule — Never Implement Invented Content

Before writing a single line of code, scan the Screen Spec (or any input) for these red flags:

| Red flag | Example | Action |
|---|---|---|
| Generic-sounding feature names not tied to the product | `"Smart Shopping Campaign"`, `"Manual CPC"`, `"Display Ads"` as row labels in a config table | **STOP** — ask the user to confirm the real feature names |
| Placeholder text still in the spec | `"Lorem Ipsum"`, `"Title *"`, `"New Title"`, `"Help Text here"` | **STOP** — mark as `[NEEDS REAL COPY]` and ask |
| Column headers that look like tab names but the spec says matrix | Spec says `screenType: permission-matrix` but you're tempted to render tabs | **STOP** — render as a wide table, not tabs |
| Any data that feels like it was guessed rather than extracted | Feature list that sounds like a generic ad-tech product rather than the specific product in the design | **STOP** — refuse to invent, ask for the real list |

**The rule:** If you are not 100% certain a string came from the actual Figma/screenshot/spec, do not put it in the code. Mark it `[UNVERIFIED]` and surface it to the user before proceeding.

---

## Permission Matrix Implementation Guide

When the Screen Spec has `screenType: "permission-matrix"`, implement as a **single wide table** — NOT as tabs:

```jsx
// ✅ CORRECT — all columns visible simultaneously
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Platinum</th>
      <th>Gold</th>
      <th>Silver</th>
      <th>Beta</th>
    </tr>
  </thead>
  <tbody>
    {FEATURES.map(feature => (
      <tr key={feature.id}>
        <td>{feature.label}</td>
        {PERSONAS.map(persona => (
          <td key={persona} style={{ textAlign: 'center' }}>
            <Checkbox
              checked={config[persona][feature.id]}
              onChange={() => handleToggle(persona, feature.id)} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

// ❌ WRONG — do NOT render as tabs when the design shows columns
<Tabs>
  <Tab label="Platinum">...</Tab>
  <Tab label="Gold">...</Tab>
</Tabs>
```

## Critical Rules (Non-Negotiable)

### 1. Import ONLY from `src/ui/`

```jsx
// ✅ CORRECT
import { Button, Badge, Toolbar, SearchBar, Drawer, Pagination,
         Input, Select, Checkbox, Tag, Toast, useToast } from '../ui';

// ❌ WRONG — never import from any of these
import { Button } from '@rishikeshjoshi-morpheus/ui';  // wrong library, not installed
import { Button } from '@chakra-ui/react';              // wrong library
import { Button } from 'shadcn/ui';                    // wrong library
```

### 2. Inline styles with CSS vars — no Chakra props

```jsx
// ✅ CORRECT
<div style={{ padding: 16, background: 'var(--osmos-bg)', borderRadius: 8,
              border: '1px solid var(--osmos-border)' }}>
  <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)' }}>Label</span>
</div>

// ❌ WRONG — Chakra prop syntax does not work here
<Box p="4" bg="bg" borderRadius="lg" />
<Text color="fg.muted" />
```

### 3. Raw HTML for structural table elements — no Table molecule

```jsx
// ✅ CORRECT — raw <table> HTML with CSS var styles:
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11,
                   fontWeight: 700, color: 'var(--osmos-fg-muted)',
                   borderBottom: '1px solid var(--osmos-border)',
                   background: 'var(--osmos-bg-subtle)' }}>
        Name <SortIcon size={11} />
      </th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}>
        <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--osmos-fg)' }}>
          {row.name}
        </td>
        <td><Badge status={row.status} /></td>
        <td>
          <Button variant="icon" onClick={() => openEdit(row)}><EditIcon size={14} /></Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

// ❌ WRONG — Table.Root does not exist in src/ui/
<Table.Root><Table.Body><Table.Row><Table.Cell>
```

### 4. Controlled state patterns for `src/ui/` components

```jsx
// Drawer open/close:
const [open, setOpen] = useState(false);
<Drawer open={open} onClose={() => setOpen(false)} title="Create Item" width={480}
  footer={
    <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </span>
  }
>
  <Input label="Name *" value={name} onChange={e => setName(e.target.value)} required />
  <Select label="Status" value={status} onChange={e => setStatus(e.target.value)}
    options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
</Drawer>

// Toast:
const { toast, showToast } = useToast();
<Toast {...toast} />
// Trigger: showToast('Saved successfully') or showToast('Error occurred', 'error')

// Pagination:
const [page, setPage] = useState(1);
<Pagination total={total} page={page} perPage={20} onChange={setPage} entityLabel="records" />

// Checkbox:
<Checkbox checked={val} onChange={() => setVal(!val)} label="Optional label" />
```

### 5. Layout & Spacing — Figma-verified rules

> **Source of truth:** Figma file `2Ez19zUlOmQ94LaHTw53Kx`, nodes `6:62027` (Advertiser Insights dashboard) and `6:77233`/`6:77154`/`6:77006` (Create/Edit Segment drawer). **20px is the primary layout unit.**

```jsx
// ✅ Page outer wrapper
<div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20,
              background: 'var(--osmos-bg-subtle)', minHeight: '100vh',
              fontFamily: "'Open Sans', sans-serif" }}>

// ✅ KPI card grid — ALWAYS gap: 20, NEVER gap: 12 or gap: 16
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>

// ✅ Section card outer shell
<div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
              borderRadius: 8, overflow: 'hidden' }}>
  {/* Section header */}
  <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  {/* Chart body — tight top, full sides */}
  <div style={{ padding: '12px 20px 20px' }}>
  {/* Table toolbar row */}
  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--osmos-border)' }}>

// ✅ Two-column layout (chart side-by-side)
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

// ✅ Sections stacked vertically
<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

// ✅ Drawer body — padding: 20 all sides
// (Drawer from src/ui handles header/footer padding; child content gets this)
<Drawer open={open} onClose={...} title="..." footer={...}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* form fields gap: 16 within group, gap: 20 between groups */}
  </div>
</Drawer>

// ✅ Table th / td — these values are non-negotiable
<th style={{ padding: '9px 14px' }}>
<td style={{ padding: '10px 14px' }}>
```

**Violations to refuse:**
- `gap: 12` between metric cards → must be `gap: 20`
- `gap: 16` between section cards → must be `gap: 20`
- `padding: 32` on page wrapper → must be `padding: '20px 24px'`
- `padding: 24` on page wrapper → must be `padding: '20px 24px'`
- `padding: 16` on drawer body → must be `padding: 20`

---

## Component Quick Reference

Check this table **before** writing any UI element as raw HTML. If it exists in `src/ui/`, import it — never duplicate it inline.

### Atoms (import from `'../ui'`)
| Need | Component | Key Props |
|------|-----------|-----------|
| Primary / outline / ghost button | `Button` | `variant`: primary\|outline\|ghost\|icon\|link |
| Status pill | `Badge` | `status`: Active\|Inactive\|Paused\|Live\|Draft\|Error |
| Custom type chip | `TypeBadge` | `type`, `colorMap` |
| Coloured category tag | `Tag` | `colorScheme`: green\|amber\|blue\|gray\|red |
| Text input with label | `Input` | `label`, `value`, `onChange`, `required`, `helperText` |
| Dropdown selector | `Select` | `label`, `value`, `onChange`, `options`: [{value, label}] |
| Checkbox | `Checkbox` | `checked`, `onChange`, `label` |
| Toast notification | `Toast` + `useToast` | `const { toast, showToast } = useToast()` |

### Molecules (import from `'../ui'`)
| Need | Component | Key Props |
|------|-----------|-----------|
| Search input | `SearchBar` | `value`, `onChange`, `placeholder`, `width` |
| Toolbar row | `Toolbar` | `left`, `right`, `noBorder` |
| Right-side panel | `Drawer` | `open`, `onClose`, `title`, `footer`, `width` (default 480) |
| Table pagination | `Pagination` | `total`, `page`, `perPage`, `onChange`, `entityLabel` |
| File download info bar | `InfoBanner` | `fileName`, `fileDesc`, `downloadText`, `onDownload` |
| Dashed upload dropzone | `UploadDropzone` | `onFile`, `accept`, `label`, `successMessage` |
| KPI metric card | `StatCard` | `label`, `value`, `trend`, `trendDir` |
| Compact metric chip | `KPIChip` | `label`, `value` |

### Patterns (import from `'../ui'`)
| Need | Component | Key Props |
|------|-----------|-----------|
| Full upload page | `UploadPage` | `fileName`, `fileDesc`, `downloadText`, `howItWorksBullets[]` |

### Icons (import from `'../ui'`)
| Need | Use |
|------|-----|
| Common icons | `SearchIcon`, `FilterIcon`, `RefreshIcon`, `DownloadIcon`, `PlusIcon`, `TrashIcon`, `EditIcon`, `CloseIcon`, `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `UploadIcon`, `FileIcon`, `CheckIcon`, `SortIcon`, `CalendarIcon`, `EyeIcon`, `ColumnsIcon`, `InfoIcon`, `MoreIcon` |
| Custom SVG shape | `Icon` with SVG path children — `<Icon size={16} color="..."><path d="..." /></Icon>` |

### Not in `src/ui/` — use raw HTML
| Need | How to implement |
|------|-----------------|
| Data grid | Raw `<table>` HTML with CSS var styles |
| Centered dialog overlay | Hand-rolled `position: fixed` overlay div |
| Tab navigation bar | Hand-rolled using `Button` atoms |
| Activity log / timeline | Raw `<div>` list with CSS var styles |
| Charts | `recharts` (already installed) |

## CSS Variable Reference

Use these tokens in inline style objects — never hardcode hex values.

### Semantic tokens
| Variable | Use for |
|----------|---------|
| `var(--osmos-bg)` | White/light card surface |
| `var(--osmos-bg-subtle)` | Page background (light gray) |
| `var(--osmos-bg-muted)` | Table header, subtle fills |
| `var(--osmos-fg)` | Primary text |
| `var(--osmos-fg-muted)` | Secondary / label text |
| `var(--osmos-fg-subtle)` | Tertiary / placeholder text |
| `var(--osmos-border)` | All borders and dividers |

### Brand tokens
| Variable | Value | Use for |
|----------|-------|---------|
| `var(--osmos-brand-primary)` | `#636CFF` | Primary buttons, active links |
| `var(--osmos-brand-primary-muted)` | `rgba(99,108,255,0.12)` | Primary badge backgrounds |
| `var(--osmos-brand-green)` | `#1BA87A` | Success states, positive KPIs |
| `var(--osmos-brand-green-muted)` | `rgba(27,168,122,0.10)` | Success badge backgrounds |
| `var(--osmos-brand-amber)` | `#F5A623` | Warnings, secondary chart line |

## File Structure

Output a single `.jsx` file per screen, placed in `src/components/`:

```
src/components/
  AdvertisersPage.jsx    ← main page + all modals in one file
```

For complex pages with many modals, keep them in the same file as internal components unless the user asks for separation.

## Process

1. Read the Screen Spec JSON or analyze the input
2. Check the Component Quick Reference table above — map each zone to a `src/ui/` component before reaching for raw HTML
3. Generate the complete React component with:
   - All imports from `'../ui'` (never from `@rishikeshjoshi-morpheus/ui` or any external library)
   - Mock data constants at the top
   - Internal drawer components (not centered modals — this codebase uses right-side Drawers)
   - Main page component as default export
   - All state management (useState for drawers, selections, filters)
4. Write the file to `src/components/`
5. Update `App.jsx` to import and route to the new page

## Known Gaps — What `src/ui/` Does NOT Cover

These patterns are NOT in `src/ui/`. Implement as described:

| Gap | Implementation |
|-----|---------------|
| Data grid / table | Raw `<table>` HTML with inline CSS var styles (see Rule 3 above) |
| Centered modal overlay | Hand-rolled `position: fixed; top: 0; left: 0; width: 100%; height: 100%` overlay with a centered content box |
| Tab navigation bar | Row of `Button` atoms — active tab gets `background: var(--osmos-brand-primary-muted)` |
| Activity log / timeline | Raw `<div>` list — each row has an icon, timestamp, and description |
| Charts | `recharts` (already installed) — `LineChart`, `BarChart`, etc. |
| Left nav / sidebar | Already exists in `src/components/LeftNav.jsx` — do not rebuild |
| Top bar / header | Already exists in `src/components/TopBar.jsx` — do not rebuild |

## Icon Sourcing Priority

When any icon is needed beyond those already exported from `src/ui/`, always follow this order:

1. **First — Design-System-OS** (`58jL2Gbe53rBhxOysvHM82`, Icons page `1511:805`)  
   Use `use_figma` to fetch the node, extract the vector path, and render it via the `Icon` wrapper from `src/ui/`.

2. **Fallback — Free LINE icons** (`WAZd1M7J9YzwnhoO7BRjcV`, Interface Essential page)  
   Use only when the needed icon is absent from Design-System-OS.

3. **Last resort** — Hand-roll an SVG path only if neither Figma source has a match.

### Design-System-OS Quick Reference (file `58jL2Gbe53rBhxOysvHM82`, page `1511:805`)

| Intent | DS Node ID | Icon name |
|--------|-----------|-----------|
| search | `7391:30070` | search-lg |
| trash / delete | `7391:30064` | trash-03 |
| edit / pencil | `7391:30049` | edit-03 |
| eye / view | `7391:30050` | eye |
| filter / funnel | `7391:30051` | filter-funnel-02 |
| filter lines | `7391:30052` | filter-lines |
| menu / hamburger | `7391:30053` | menu-01 |
| refresh / reload | `7391:30054` | refresh-cw-02 |
| close / x | `7391:30072` | x-close |
| plus / add | `7391:30069` | plus |
| minus | `7391:30091` | minus |
| download | `7391:30071` | download-01 |
| upload | `7391:30127` | upload-01 |
| chevron-left | `7391:30067` | chevron-left |
| chevron-right | `7391:30068` | chevron-right |
| arrow-left | `7391:30065` | arrow-narrow-left |
| arrow-right | `7391:30066` | arrow-narrow-right |
| home | `7391:30059` | home-03 |
| help / question | `7391:30058` | help-circle |
| info | `7391:30090` | i icon |
| wallet | `7391:30057` | wallet-03 |
| more / dots-vertical | `7391:30073` | dots-vertical |
| external-link | `7391:30048` | link-external-01 |
| check / success | `7391:30092` | check-circle |
| clock / time | `7391:30093` | clock |
| alert / warning | `7391:30095` | alert-triangle |
| calendar | `7391:30110` | calendar |
| grid / layout | `7391:30099` | grid-01 |
| user | `7391:30115` | user-01 |
| users / group | `7391:30135` | users-01 |
| file / document | `7391:30117` | file-02 |
| chart / analytics | `7391:30109` | bar-line-chart |
| line-chart | `7391:30096` | line-chart-up-01 |
| loading / spinner | `7391:30112` | loading-01 |
| expand | `7391:30119` | expand-01 |
| copy | `7391:30139` | copy-06 |
| share | `7391:30133` | share-07 |
| link | `7391:30116` | link-01 |
| image | `7391:30063` | image-01 |
| tag | `7391:30106` | tag-01 |
| bookmark | `7391:30105` | bookmark |
| send | `7391:30140` | send-01 |
| target | `7391:30089` | target-04 |
| settings / config | `7391:30107` | Config |
| log-in | `7391:30081` | log-in-03 |
| activity | `7391:30047` | Activity |
| scheduled-reports | `7391:30084` | Scheduled Reports |
| live-insights | `7391:30082` | Live Insights |
| advertiser-insights | `7391:30083` | Advertiser Insights |
| control-center | `7391:30074` | Control Center |
| finance | `7391:30076` | Finance |
| onboarding | `7391:30075` | Onboarding |
| automated-rules | `7391:30080` | Automated rules |
| dev-settings | `7391:30061` | Dev Settings |
