# src/ui Component API Reference

**Source of truth:** `src/ui/index.js` barrel + component source files  
**Import path (from `src/retailer/components/*.jsx`):** `import { X } from '../../ui'`  
**Import path (from `src/advertiser/components/*.jsx`):** `import { X } from '../../ui'`  
**Last verified:** 2026-05-02

> This file documents the **actual** `src/ui/` library used in OMOS TEST.  
> Do NOT confuse with `@rishikeshjoshi-morpheus/ui` (a different project's Chakra-based library).

---

## Atoms

### Button

```jsx
import { Button } from '../../ui';

<Button
  variant="primary"   // 'primary' | 'outline' | 'ghost' | 'icon' | 'link'
  disabled={false}
  onClick={fn}
  style={{}}          // merged onto root element
>
  Label
</Button>
```

**Variants:** `primary` (filled brand blue), `outline` (border only), `ghost` (no border/bg), `icon` (square, no padding for icon-only), `link` (text-only, underline on hover)

---

### Badge + TypeBadge

```jsx
import { Badge, TypeBadge } from '../../ui';

// Status badge — predefined color semantics
<Badge
  status="Active"     // 'Active' | 'Inactive' | 'Paused' | 'Live' | 'Draft' | 'Error'
  showDot={true}      // boolean — renders colored dot before label (default true)
  style={{}}
/>

// Type badge — custom color map
<TypeBadge
  type="Gold"         // string — key into colorMap
  colorMap={{
    Gold:   { bg: 'var(--osmos-brand-amber)',   color: '#fff' },
    Silver: { bg: 'var(--osmos-fg-subtle)',      color: '#fff' },
  }}
  style={{}}
/>
```

**Badge color semantics:**
| Status | Background | Text |
|--------|-----------|------|
| Active / Live | `--osmos-brand-green-muted` | `--osmos-brand-green` |
| Inactive / Draft | `--osmos-bg-muted` | `--osmos-fg-muted` |
| Paused | amber muted | amber |
| Error | red muted | red |

---

### Input + Select

```jsx
import { Input, Select } from '../../ui';

<Input
  value={val}
  onChange={fn}          // receives event — use e.target.value
  placeholder="..."
  label="Field label"    // renders label above input
  type="text"            // 'text' | 'number' | 'email' | 'password' | 'search'
  disabled={false}
  required={false}
  inputStyle={{}}        // styles on <input> element
  style={{}}             // styles on wrapper div
  id="field-id"
/>

<Select
  value={val}
  onChange={fn}          // receives event — use e.target.value
  options={[{ value: 'a', label: 'Option A' }]}
  placeholder="Select..."
  label="Field label"
  disabled={false}
  style={{}}
/>
```

---

### Icon + Named Icons

```jsx
import { Icon,
         SearchIcon, PlusIcon, TrashIcon, EditIcon, CloseIcon,
         ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
         UploadIcon, DownloadIcon, FilterIcon, RefreshIcon,
         FileIcon, CheckIcon, SortIcon, CalendarIcon, EyeIcon,
         ColumnsIcon, InfoIcon, MoreIcon } from '../../ui';

// Base Icon — wrap any SVG path
<Icon
  size={16}              // number, pixels (default 16)
  color="currentColor"   // CSS color string
  strokeWidth={1.8}      // SVG stroke-width
>
  <path d="M5 12h14" />  // raw SVG path children
</Icon>

// Named icons — accept size + color props only
<SearchIcon size={20} color="var(--osmos-fg-muted)" />
<InfoIcon size={16} color="var(--osmos-brand-primary)" />
<CloseIcon size={16} />
// ... all 20 named icons follow the same pattern
```

**All 20 named icons:** `SearchIcon` `PlusIcon` `TrashIcon` `EditIcon` `CloseIcon` `ChevronDownIcon` `ChevronLeftIcon` `ChevronRightIcon` `UploadIcon` `DownloadIcon` `FilterIcon` `RefreshIcon` `FileIcon` `CheckIcon` `SortIcon` `CalendarIcon` `EyeIcon` `ColumnsIcon` `InfoIcon` `MoreIcon`

---

### Checkbox

```jsx
import { Checkbox } from '../../ui';

<Checkbox
  checked={bool}
  onChange={fn}       // receives event — use e.target.checked
  label="Select row"
  disabled={false}
  style={{}}
/>
```

---

### Tag

```jsx
import { Tag } from '../../ui';

<Tag
  colorScheme="green" // 'green' | 'amber' | 'blue' | 'gray' | 'red'
  style={{}}
>
  Label text
</Tag>
```

---

### Toast + useToast

```jsx
import { Toast, useToast } from '../../ui';

// In component body:
const { toast, showToast } = useToast();

// Trigger (e.g. after save):
showToast('Saved successfully', 'success');
// type: 'success' | 'error' | 'info'

// Render once, near root of page:
<Toast
  visible={toast.visible}
  message={toast.message}
  type={toast.type}
/>
```

---

## Molecules

### Drawer

```jsx
import { Drawer } from '../../ui';

<Drawer
  open={bool}
  onClose={fn}
  title="Drawer Title"
  subtitle="Optional subtitle line"   // small muted text below title
  footer={
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
  width={480}    // number, pixels (default 480)
>
  {/* drawer body content */}
</Drawer>
```

**Figma-verified layout (ia-patterns.md §5):**
- Header: `padding: '16px 20px'`
- Body: `padding: 20` (all sides — never 16)
- Footer: `padding: '14px 20px'`

---

### StatCard

```jsx
import { StatCard } from '../../ui';

<StatCard
  label="Total Revenue"
  value="₹4.2L"
  trend="+12.4%"           // string — trend label text
  trendDir="up"            // 'up' | 'down' — controls arrow direction + color
  compValue="₹3.8L"       // optional — comparison period value
  compPct={12.4}           // optional — number; positive = green, negative = red
  sub="vs last month"      // optional — subtitle below main value
  icon={<InfoIcon size={14} />}             // optional — icon in top-right
  iconColor="var(--osmos-brand-primary)"    // optional — icon color
  style={{}}
/>
```

**Grid layout — ALWAYS `gap: 20`, never `gap: 12` or `gap: 16`:**
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
  <StatCard label="Impressions" value="1.2M" trendDir="up" trend="+8%" />
  <StatCard label="Clicks" value="34.5K" trendDir="up" trend="+12%" />
  <StatCard label="CTR" value="2.88%" trendDir="down" trend="-0.3pp" />
  <StatCard label="ROAS" value="4.2x" trendDir="up" trend="+0.6x" />
</div>
```

---

### SearchBar

```jsx
import { SearchBar } from '../../ui';

<SearchBar
  value={query}
  onChange={fn}           // called with string value directly (not event)
  placeholder="Search..."
  width={200}             // number, pixels (default 200)
  style={{}}
/>
```

---

### Toolbar

```jsx
import { Toolbar } from '../../ui';

<Toolbar
  left={[
    <SearchBar value={q} onChange={setQ} />,
    <Select value={filter} onChange={e => setFilter(e.target.value)} options={...} />,
  ]}
  right={[
    <Button variant="outline"><DownloadIcon size={14} /> Export</Button>,
    <Button variant="primary"><PlusIcon size={14} /> Create</Button>,
  ]}
  noBorder={false}   // boolean — hides bottom border divider
  style={{}}
/>
```

---

### Pagination

```jsx
import { Pagination } from '../../ui';

<Pagination
  total={248}           // total record count
  page={currentPage}    // 1-indexed current page
  perPage={20}          // records per page (default 20)
  onChange={fn}         // called with new page number (1-indexed)
  entityLabel="records" // label in "Showing X–Y of Z records"
/>
```

---

### Modal

```jsx
import { Modal } from '../../ui';

<Modal
  open={bool}
  onClose={fn}
  title="Modal Title"
  footer={
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit}>Confirm</Button>
    </>
  }
  maxWidth={640}   // number, pixels (default 640)
  zIndex={200}
>
  {/* modal body — forms, confirmation text, etc. */}
</Modal>
```

---

### SectionCard

```jsx
import { SectionCard } from '../../ui';

<SectionCard
  title="Performance Overview"
  titleRight={<Button variant="outline">View All</Button>}   // optional
  headerSize="sm"       // 'sm' | 'md'
  bodyBg="var(--osmos-bg)"    // optional body background
  bodyPad={16}          // body padding, number (default 16)
  style={{}}
>
  {/* charts, tables, any content */}
</SectionCard>
```

---

### InfoBanner

```jsx
import { InfoBanner } from '../../ui';

<InfoBanner
  fileName="upload-template.xlsx"
  fileDesc="Download the template to see the expected column format"
  downloadText="Download Template"
  onDownload={fn}
/>
```

---

### KPIChip

```jsx
import { KPIChip } from '../../ui';

<KPIChip
  label="CTR"
  value="3.4%"
  style={{}}
/>
```

---

### EmptyState

```jsx
import { EmptyState } from '../../ui';

<EmptyState
  icon={<SearchIcon size={32} />}
  message="No results found"
  iconBg="var(--osmos-bg-subtle)"
  iconColor="var(--osmos-fg-muted)"
  paddingY={80}    // top + bottom padding (default 80)
>
  {/* optional CTA children */}
  <Button variant="primary">Create First Item</Button>
</EmptyState>
```

---

### UploadDropzone

```jsx
import { UploadDropzone } from '../../ui';

<UploadDropzone
  onFile={fn}                          // called with File object
  accept=".xlsx"                       // accepted extension (default '.xlsx')
  label="Drag & drop or click to upload"
  successMessage="File uploaded successfully"
/>
```

---

### Stepper

```jsx
import { Stepper } from '../../ui';

<Stepper
  steps={[
    { label: 'Basic Info' },
    { label: 'Configuration' },
    { label: 'Review & Submit' },
  ]}
  current={2}    // 1-indexed active step number
/>
```

---

### RadioCard + RadioDot

```jsx
import { RadioCard, RadioDot } from '../../ui';

{options.map(opt => (
  <RadioCard
    key={opt.value}
    selected={selected === opt.value}
    onClick={() => setSelected(opt.value)}
    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
  >
    <RadioDot selected={selected === opt.value} size={16} />
    {opt.label}
  </RadioCard>
))}
```

---

## Patterns

### UploadPage

```jsx
import { UploadPage } from '../../ui';

<UploadPage
  fileName="bulk-upload-template.xlsx"
  fileDesc="Use this template to bulk-upload items"
  downloadText="Download Template"
  howItWorksBullets={[
    'Download the template above',
    'Fill in required fields (marked with *)',
    'Upload the completed file below',
  ]}
  accept=".xlsx"
  onFile={fn}    // called with File object when user selects or drops
/>
```

---

## Full Export List

```js
// Atoms (7 exports + 20 named icons)
export { Button }                    from './atoms/Button';
export { Badge, TypeBadge }          from './atoms/Badge';
export { Input, Select }             from './atoms/Input';
export { Icon,
         SearchIcon, PlusIcon, TrashIcon, EditIcon, CloseIcon,
         ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
         UploadIcon, DownloadIcon, FilterIcon, RefreshIcon,
         FileIcon, CheckIcon, SortIcon, CalendarIcon, EyeIcon,
         ColumnsIcon, InfoIcon, MoreIcon }  from './atoms/Icon';
export { Checkbox }                  from './atoms/Checkbox';
export { Tag }                       from './atoms/Tag';
export { Toast, useToast }           from './atoms/Toast';

// Molecules (16 exports)
export { Drawer }                    from './molecules/Drawer';
export { StatCard }                  from './molecules/StatCard';
export { SearchBar }                 from './molecules/SearchBar';
export { Toolbar }                   from './molecules/Toolbar';
export { Pagination }                from './molecules/Pagination';
export { InfoBanner }                from './molecules/InfoBanner';
export { Modal }                     from './molecules/Modal';
export { KPIChip }                   from './molecules/KPIChip';
export { EmptyState }                from './molecules/EmptyState';
export { UploadDropzone }            from './molecules/UploadDropzone';
export { SectionCard }               from './molecules/SectionCard';
export { Stepper }                   from './molecules/Stepper';
export { RadioCard, RadioDot }       from './molecules/RadioCard';

// Patterns (1 export)
export { UploadPage }                from './patterns/UploadPage';
```

---

## Common Patterns

### Page outer wrapper

```jsx
// Figma-verified (ia-patterns.md §5)
<div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
  {/* KPI row */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
    <StatCard label="Impressions" value="..." trendDir="up" trend="..." />
    <StatCard label="Clicks"      value="..." trendDir="up" trend="..." />
    <StatCard label="CTR"         value="..." trendDir="down" trend="..." />
    <StatCard label="ROAS"        value="..." trendDir="up" trend="..." />
  </div>
  {/* Section cards — also gap: 20 between them */}
  <SectionCard title="Performance Chart">...</SectionCard>
  <SectionCard title="Detail Table">...</SectionCard>
</div>
```

### Data table (no Table component in src/ui — always raw HTML)

```jsx
const TH = { fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
             background: 'var(--osmos-bg-muted)', padding: '8px 12px', textAlign: 'left' };
const TD = { fontSize: 13, color: 'var(--osmos-fg)', padding: '10px 12px',
             borderBottom: '1px solid var(--osmos-border)' };

<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={TH}><Checkbox checked={allSelected} onChange={toggleAll} /></th>
      <th style={TH}>Name</th>
      <th style={TH}>Status</th>
      <th style={TH}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.id}>
        <td style={TD}><Checkbox checked={selected.has(row.id)} onChange={() => toggle(row.id)} /></td>
        <td style={TD}>{row.name}</td>
        <td style={TD}><Badge status={row.status} /></td>
        <td style={TD}>
          <Button variant="icon" onClick={() => edit(row)}><EditIcon size={14} /></Button>
          <Button variant="icon" onClick={() => del(row)}><TrashIcon size={14} /></Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### Color constants (declare at top of every file)

```jsx
const WHITE      = 'var(--osmos-bg)';
const BG_SUBTLE  = 'var(--osmos-bg-subtle)';
const BG_MUTED   = 'var(--osmos-bg-muted)';
const TEXT       = 'var(--osmos-fg)';
const TEXT_MID   = 'var(--osmos-fg-muted)';
const TEXT_LIGHT = 'var(--osmos-fg-subtle)';
const BORDER     = 'var(--osmos-border)';
const ACCENT     = 'var(--osmos-brand-primary)';
const ACCENT_M   = 'var(--osmos-brand-primary-muted)';
const GREEN      = 'var(--osmos-brand-green)';
const GREEN_M    = 'var(--osmos-brand-green-muted)';
const AMBER      = 'var(--osmos-brand-amber)';
const FONT       = "'Open Sans', sans-serif";
```
