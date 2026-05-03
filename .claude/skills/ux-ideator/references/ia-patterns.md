# IA Patterns Reference
> Used by ux-ideator — Noor and Dev consult this when proposing IA maps and lo-fi wireframes.
> Assembled from: screen-interpreter, figma-batch-builder/knowledge-graph, react-implementer.

---

## 1. Screen Type Taxonomy

Use these exact type names in IA maps and Screen Spec JSON:

| Type | Description | When to use |
|---|---|---|
| `data-management-list` | Table with CRUD actions | Campaign lists, rule lists, user lists, segment lists |
| `dashboard` | KPI cards + charts + summary tables | Analytics, health, finance overview |
| `settings-form` | Tabbed forms with config options | Onboarding, advertiser settings, persona config |
| `wizard-flow` | Multi-step guided process | Onboarding journeys, campaign creation |
| `detail-view` | Single entity with sections | Campaign detail, advertiser detail |
| `report` | Filters + data viz + export | Scheduled reports, analytics drilldowns |
| `permission-matrix` | Rows = features, columns = personas/roles, checkboxes per cell | Persona config, role management |
| `upload-page` | Drag-drop upload + validation + history | Bulk actions, CSV imports, attribution overrides |
| `log-viewer` | Timestamped event stream with filters | Activity logs, request logs, debug console |

> ⚠️ **Critical:** `permission-matrix` is NOT tabs. Columns are rendered side-by-side simultaneously. Never use tab navigation for a permission matrix.

---

## 2. Zone Taxonomy

Every screen is composed of zones. Use these exact zone names in lo-fi wireframes and Screen Spec JSON:

| Zone key | Description | Component |
|---|---|---|
| `breadcrumb` | Navigation path trail | Text nodes with `>` separators |
| `topBar` | Page header with title + primary CTA | `Toolbar` left=title, right=CTA buttons |
| `infoBanner` | Alert / notification banner | `InfoBanner` |
| `tabs` | Tab navigation (only when one view at a time) | Hand-rolled `<div>` tab bar |
| `toolbar` | Filters, search, secondary actions | `Toolbar` left=search/filters, right=actions |
| `dataTable` | Primary data display | Raw `<table>` HTML with `Badge`, `Button`, `Checkbox` |
| `pagination` | Table pagination | `Pagination` |
| `sidebar` | Side navigation or contextual filters | Custom side panel |
| `modals` | Overlay dialogs (not drawers) | Raw `<div>` overlay with `Button` |
| `drawers` | Right-side slide panels | `Drawer` |
| `cards` | KPI or info cards | `StatCard`, `KPIChip` |
| `charts` | Data visualizations | `recharts` (LineChart, BarChart, AreaChart) |

---

## 3. Component Quick Reference (`src/ui/`)

Import path: `import { ... } from '../ui'`

### Atoms
| Component | Use for | Key props |
|---|---|---|
| `Button` | All clickable actions | `variant`: primary\|outline\|ghost\|icon\|link |
| `Badge` | Status display | `status`: Active\|Inactive\|Paused\|Live\|Draft\|Error |
| `TypeBadge` | Custom type chips | `type`, `colorMap` |
| `Tag` | Colored category labels | `colorScheme`: green\|amber\|blue\|gray\|red |
| `Input` | Text input with label | `label`, `value`, `onChange`, `required`, `helperText` |
| `Select` | Dropdown | `label`, `value`, `onChange`, `options: [{value, label}]` |
| `Checkbox` | Checkbox cell / toggle | `checked`, `onChange`, `label` |
| `Toast` / `useToast` | Success/error notifications | `useToast()` hook |

### Molecules
| Component | Use for | Key props |
|---|---|---|
| `SearchBar` | Search input | `value`, `onChange`, `placeholder`, `width` |
| `Toolbar` | Left+right action bar | `left`, `right`, `noBorder` |
| `Drawer` | Right-side slide panel | `open`, `onClose`, `title`, `footer`, `width` |
| `Pagination` | Table pagination | `page`, `pageSize`, `total`, `onChange` |
| `InfoBanner` | Alert/notification | `type`: info\|warning\|error\|success, `message` |
| `StatCard` | KPI metric card | `label`, `value`, `delta`, `icon` |
| `KPIChip` | Inline metric chip | `label`, `value`, `trend` |
| `UploadDropzone` | File drag-drop | `onUpload`, `accept`, `maxSize` |

### Patterns
| Component | Use for |
|---|---|
| `UploadPage` | Full upload flow (dropzone + table + history) |

### Icons (all accept `size` prop)
```
SearchIcon, FilterIcon, RefreshIcon, DownloadIcon, PlusIcon, TrashIcon,
EditIcon, CloseIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
UploadIcon, FileIcon, CheckIcon, SortIcon, CalendarIcon, EyeIcon,
ColumnsIcon, InfoIcon, MoreIcon, Icon
```

### NOT in `src/ui/` (use raw HTML or recharts)
- Tables → use raw `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`
- Tab navigation → hand-roll with `<div>` and CSS var borders
- Modal dialogs → raw `<div>` overlay
- Charts → `recharts` (LineChart, BarChart, AreaChart, PieChart)

---

## 4. CSS Design Tokens

Use `var(--osmos-*)` in inline styles. Never hardcode hex values.

```css
/* Semantic (light/dark aware) */
var(--osmos-bg)              /* page background */
var(--osmos-bg-subtle)       /* table header, sidebar */
var(--osmos-bg-muted)        /* hover states */
var(--osmos-fg)              /* primary text */
var(--osmos-fg-muted)        /* secondary text, labels */
var(--osmos-fg-subtle)       /* disabled, placeholder */
var(--osmos-border)          /* borders, dividers */

/* Brand */
var(--osmos-brand-primary)         /* #636CFF — CTAs, links, active states */
var(--osmos-brand-primary-muted)   /* light blue — hover, backgrounds */
var(--osmos-brand-green)           /* #1BA87A — success, positive delta */
var(--osmos-brand-green-muted)     /* light green — success backgrounds */
var(--osmos-brand-amber)           /* #F5A623 — warning, caution */
```

**Spacing:** 4, 8, 12, 16, 20, 24, 32, 40, 48px (use as numeric values in inline styles)
**Border radius:** 4, 6, 8, 10, 12px
**Font sizes:** 11, 12, 13, 14, 16, 18, 20, 24px

---

## 5. Layout & Spacing Guide

> **Source of truth:** Verified from Figma file `2Ez19zUlOmQ94LaHTw53Kx` nodes `6:62027` (Advertiser Insights dashboard), `6:77233` / `6:77154` / `6:77006` (Create/Edit Segment drawer). These are non-negotiable — every react-implementer, figma-wireframer, and shadcn-to-osmos output must conform.

### The Universal Rule: 20px is the primary layout unit

**20px** is used for every major structural gap and padding in the product. When in doubt, use 20px.

### Dashboard / Page Layout

| Zone | Padding | Gap |
|---|---|---|
| **Page outer wrapper** | `padding: '20px 24px'` | — |
| **Top Bar** | `20px` all sides | — |
| **KPI stat card grid** | — | `gap: 20` between cards |
| **Sections vertical stack** | — | `gap: 20` between section cards |
| **Side-by-side section columns** | — | `gap: 20` between columns |
| **Section card — header row** | `padding: '14px 16px'` (or `20px` all sides) | — |
| **Section card — chart body** | `padding: '12px 20px 20px'` (tight top, full sides/bottom) | — |
| **Section card — toolbar row** | `padding: '10px 14px'` or `'10px 20px'` | — |
| **Section card — table rows** | `padding: '10px 14px'` (td) | — |

### Drawers

| Zone | Padding |
|---|---|
| **Drawer header** | `padding: '16px 20px'` |
| **Drawer body** | `padding: 20` (all sides) |
| **Drawer footer** | `padding: '14px 20px'` |
| **Form field rows within drawer** | `gap: 16` between fields; `gap: 20` between field groups |

### Quick rules for React code

```jsx
// ✅ Page outer wrapper
<div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

// ✅ KPI card grid (always 4-column with 20px gap)
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>

// ✅ Section card outer shell
<div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

// ✅ Section card header
<div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

// ✅ Section card chart body
<div style={{ padding: '12px 20px 20px' }}>

// ✅ Table header cell
<th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>

// ✅ Table body cell
<td style={{ padding: '10px 14px', color: 'var(--osmos-fg)' }}>

// ✅ Drawer body
<div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

// ✅ Two-column chart row
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
```

### Common violations to avoid

| ❌ Wrong | ✅ Correct | Why |
|---|---|---|
| `gap: 12` between KPI cards | `gap: 20` | Figma spec: 20px |
| `gap: 16` between KPI cards | `gap: 20` | Figma spec: 20px |
| `gap: 14` between sections | `gap: 20` | Figma spec: 20px |
| `padding: 16` on drawer body | `padding: 20` | Figma spec: 20px |
| `padding: '24px 24px'` on page | `padding: '20px 24px'` | Top/bottom 20, sides 24 |
| `padding: 32` on page | `padding: '20px 24px'` | Figma spec verified |

---

## 7. LeftNav Structure (Existing Navigation)

Use this to place new screens in the correct nav section/group. Check nav IDs before proposing new ones.

```
Control Center (top-level)
  ├── Onboarding:              brand-onboarding, seller-onboarding
  ├── User Access Management:  super-admin, ops-users, advertiser-users, account-manager-mapping
  ├── User Role Management:    admin-user-role, advertiser-user-role
  ├── Advertiser Persona:      persona-config, persona-allocation
  ├── Audience Manager:        manage-attributes, manage-cpm-rules, attribute-targeting
  ├── Advertiser Settings:     manage-segments, attribution-overrides, automated-rules, wallet-rules, debug-console
  ├── Product Catalog:         product-catalog
  └── Activity Log:            event-logs, product-ads-request-logs, display-ads-request-logs, activity-log

Analytics (top-level, no groups)
  demand-supply, live-insights, advertiser-insights, scheduled-reports, bu-analytics

Finance (top-level, no groups)
  finance-dashboard, wallet-topup, finance-advertisers

Health (top-level, no groups)
  overview, budget-health, delivery-health

Sponsored Ads (top-level)
  ├── Analytics:             sponsored-ads-analytics, sponsored-ads-demand-supply, sponsored-ads-live
  └── Campaign Management:   sponsored-ads-campaigns, sponsored-ads-inventory

Display Ads (top-level)
  ├── Analytics:             display-ads-analytics, display-ads-demand-supply, display-ads-live
  └── Campaign Management:   display-ads-campaigns

Product Ads (top-level)
  ├── Analytics:             product-ads-analytics, product-ads-demand-supply, product-ads-live
  └── Campaign Management:   product-ads-yield, product-ads-keyword, product-ads-bulk

Apps (top-level, no groups)
  app-store, integrations
```

**Nav ID derivation rule:** lowercase + hyphens, e.g. "Admin User" → `admin-user`

**All existing nav IDs (check for duplicates before proposing new ones):**
```
home, control-center, advertiser-insights, live-insights, demand-supply, scheduled-reports,
bu-analytics, brand-onboarding, seller-onboarding, super-admin, ops-users, advertiser-users,
account-manager-mapping, admin-user-role, advertiser-user-role, persona-config, persona-allocation,
manage-attributes, manage-cpm-rules, attribute-targeting, manage-segments,
attribution-overrides, automated-rules, wallet-rules, debug-console, product-catalog,
event-logs, product-ads-request-logs, display-ads-request-logs, activity-log,
finance-dashboard, wallet-topup, finance-advertisers, overview, budget-health, delivery-health,
app-store, integrations,
product-ads-analytics, product-ads-demand-supply, product-ads-live, product-ads-yield,
product-ads-keyword, product-ads-bulk,
sponsored-ads-analytics, sponsored-ads-demand-supply, sponsored-ads-live,
sponsored-ads-campaigns, sponsored-ads-inventory, sponsored-ads-ad-format,
display-ads-analytics, display-ads-demand-supply, display-ads-live, display-ads-campaigns,
display-ads-bulk, display-ads-inventory, display-ads-page-setup, display-ads-ad-format,
display-ads-targeting
```

---

## 8. Osmos Platform Context (for Noor, Dev, and Raj)

**Portals:** Pulse (retailer / Ad Ops / Media Sales) and Advertiser Portal (brand / agency)

**Core user types:**
- **Ad Ops Manager** — power user, time-scarce, manages 50-200 campaigns simultaneously, uses platform daily
- **Media Sales** — sells packages to advertisers, needs clean list views and quick filters
- **Retailer Admin** — configures platform settings, less frequent usage, needs confidence over speed
- **Advertiser (brand)** — less expert, needs guidance, motivated by ROAS and spend efficiency
- **Agency** — manages multiple brands, needs bulk operations and cross-account visibility

**Revenue metric:** M%G = Media % of GMV. Every design decision should be evaluated against whether it helps retailers push past the M%G ceiling.

**Sticky patterns that work for this platform:**
- Saved views / saved filters (power users return to the same configuration)
- Inline editing without leaving the list view (reduces clicks for repetitive tasks)
- Bulk selection + bulk actions (ad ops manages hundreds of campaigns simultaneously)
- Real-time performance signals in-line with data (CTR, spend pacing visible without navigating away)
- One-click campaign duplication (high-frequency workflow)
- Smart defaults derived from historical data (reduces decision fatigue)
- Proactive alerts before problems occur (low wallet balance, pacing issues)

**Design principles (from PRD corpus):**
1. Intentionality over automation — force explicit choices for high-stakes decisions
2. Impact transparency — every recommendation shows projected outcome
3. Non-extractive AI — "spend smarter" not "spend more"
4. Audit trail always — log actor + timestamp for CPM rules, budget changes, targeting changes
5. Graceful degradation — auto-pause within 60s of token revocation; 24h grace on wallet exhaustion
6. Retailer governs, advertiser self-serves — retailer sets guardrails; advertiser operates within them
7. Attribution honesty — ROAS at correct scope; anonymize competitor data

---

## 9. Screen Spec JSON Schema

Output from Phase 6 screen-spec translation. All zone keys from Section 2 map 1:1 to JSON keys.

```json
{
  "componentLibrary": "src/ui/",
  "screenType": "data-management-list",
  "title": "Screen Name",
  "description": "One-line description",
  "navId": "nav-id-here",
  "navSection": "Control Center",
  "navGroup": "Audience Manager",
  "zones": {
    "breadcrumb": { "path": ["Control Center", "Audience Manager", "Screen Name"] },
    "topBar": {
      "title": "Screen Name",
      "primaryCTA": { "label": "Add Rule", "component": "Button", "variant": "primary" }
    },
    "infoBanner": null,
    "toolbar": {
      "left": [{ "component": "SearchBar", "placeholder": "Search..." }],
      "right": [{ "component": "Button", "label": "Export", "variant": "outline" }]
    },
    "dataTable": {
      "columns": [
        { "key": "name", "label": "Rule Name", "sortable": true },
        { "key": "status", "label": "Status", "component": "Badge" }
      ],
      "rowActions": ["Edit", "Delete", "Enable/Disable"],
      "bulkActions": ["Delete", "Enable", "Disable"]
    },
    "pagination": { "component": "Pagination" }
  },
  "drawers": [
    {
      "id": "add-rule-drawer",
      "title": "Add Rule",
      "trigger": "topBar primaryCTA",
      "fields": [
        { "key": "name", "label": "Rule Name", "component": "Input", "required": true }
      ],
      "footerActions": ["Cancel", "Save"]
    }
  ],
  "dataRequirements": {
    "entities": ["Rule"],
    "fields": ["id", "name", "status", "createdAt", "updatedAt"]
  }
}
```
