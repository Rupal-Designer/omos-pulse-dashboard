# Figma Batch Builder — Knowledge Graph

> Auto-updated every hour by a cron job that re-reads App.jsx, LeftNav.jsx, and src/components/.
> Last updated: 2026-04-24 (added dedicated Demand & Supply Gap Analytics pages for Product Ads, Display Ads, Sponsored Ads; wired product-ads-yield/keyword/bulk; added SponsoredAdsCampaignsPage + SponsoredAdsInventoryPage; rebuilt ProductAdsAnalyticsPage, ProductAdsYieldControlPage, ProductAdsLivePage, ProductAdsBulkActionsPage from screenshots)

---

## 1. Wired Pages Registry

Every page that is currently routed in App.jsx + present in LeftNav.jsx.

| Nav ID | Component File | Section | Group | Screen Type |
|--------|---------------|---------|-------|-------------|
| home | HomePage.jsx | — | — | dashboard |
| control-center | AdvertisersPage.jsx | Control Center | — | data-management-list |
| advertiser-insights | AdvertiserInsightsPage.jsx | Analytics | — | dashboard |
| live-insights | LiveAnalyticsPage.jsx | Analytics | — | dashboard |
| demand-supply | DemandSupplyPage.jsx | Analytics | — | dashboard |
| scheduled-reports | ScheduledReportsPage.jsx | Analytics | — | report |
| bu-analytics | — (bare) | Analytics | — | dashboard |
| brand-onboarding | BrandAdvertiserOnboardingPage.jsx | Control Center | Onboarding | settings-form |
| seller-onboarding | SellerAdvertiserOnboardingPage.jsx | Control Center | Onboarding | settings-form |
| super-admin | SuperAdminUsersPage.jsx | Control Center | User Access Management | user-table |
| ops-users | OpsUsersPage.jsx | Control Center | User Access Management | user-table |
| advertiser-users | AdvertiserUsersPage.jsx | Control Center | User Access Management | user-table |
| account-manager-mapping | AccountManagerMappingPage.jsx | Control Center | User Access Management | upload-page |
| admin-user-role | AdminUserPage.jsx | Control Center | User Role Management | user-table |
| advertiser-user-role | AdvertiserUserRolePage.jsx | Control Center | User Role Management | user-table |
| persona-config | PersonaConfigPage.jsx | Control Center | Advertiser Persona Management | permission-matrix |
| persona-allocation | PersonaAllocationPage.jsx | Control Center | Advertiser Persona Management | data-management-list |
| manage-attributes | ManageAttributesPage.jsx | Control Center | Audience Manager | data-management-list |
| manage-cpm-rules | ManageCPMRulesPage.jsx | Control Center | Audience Manager | data-management-list |
| attribute-targeting | ManageAttributeTargetingPage.jsx | Control Center | Audience Manager | data-management-list |
| manage-segments | ManageSegmentsPage.jsx | Control Center | Advertiser Settings | data-management-list |
| attribution-overrides | AttributionOverridesPage.jsx | Control Center | Advertiser Settings | upload-page |
| automated-rules | AutomatedRulesPage.jsx | Control Center | Advertiser Settings | data-management-list |
| wallet-rules | WalletRulesPage.jsx | Control Center | Advertiser Settings | data-management-list |
| debug-console | DeveloperSettingsPage.jsx | Control Center | Advertiser Settings | log-viewer |
| product-catalog | ProductCatalogPage.jsx | Control Center | Product Catalog | data-management-list |
| event-logs | ActivityLogPage.jsx | Control Center | Activity Log | log-viewer |
| product-ads-request-logs | ActivityLogPage.jsx | Control Center | Activity Log | log-viewer |
| display-ads-request-logs | ActivityLogPage.jsx | Control Center | Activity Log | log-viewer |
| activity-log | ActivityLogPage.jsx | Control Center | Activity Log | log-viewer |
| finance-dashboard | FinanceDashboardPage.jsx | Finance | — | dashboard |
| wallet-topup | WalletTopUpPage.jsx | Finance | — | upload-page |
| finance-advertisers | FinanceAdvertiserManagementPage.jsx | Finance | — | data-management-list |
| overview | HealthReportPage.jsx | Health | — | dashboard |
| budget-health | HealthReportPage.jsx | Health | — | dashboard |
| delivery-health | HealthReportPage.jsx | Health | — | dashboard |
| app-store | AppStorePage.jsx | Apps | — | app-marketplace |
| display-ads-analytics | DisplayAdsAnalyticsPage.jsx | Display Ads | Analytics | dashboard |
| display-ads-demand-supply | DisplayAdsDemandSupplyPage.jsx | Display Ads | Analytics | data-management-list |
| display-ads-live | DisplayAdsAnalyticsPage.jsx | Display Ads | Analytics | dashboard |
| display-ads-campaigns | DisplayAdsCampaignsPage.jsx | Display Ads | Campaign Management | data-management-list |
| sponsored-ads-analytics | SponsoredAdsAnalyticsPage.jsx | Sponsored Ads | Analytics | dashboard |
| sponsored-ads-demand-supply | SponsoredAdsDemandSupplyPage.jsx | Sponsored Ads | Analytics | data-management-list |
| sponsored-ads-live | SponsoredAdsAnalyticsPage.jsx | Sponsored Ads | Analytics | dashboard |
| sponsored-ads-campaigns | SponsoredAdsCampaignsPage.jsx | Sponsored Ads | Campaign Management | data-management-list |
| sponsored-ads-inventory | SponsoredAdsInventoryPage.jsx | Sponsored Ads | Campaign Management | data-management-list |
| product-ads-analytics | ProductAdsAnalyticsPage.jsx | Product Ads | Analytics | dashboard |
| product-ads-demand-supply | ProductAdsDemandSupplyPage.jsx | Product Ads | Analytics | data-management-list |
| product-ads-live | ProductAdsLivePage.jsx | Product Ads | Analytics | dashboard |
| product-ads-yield | ProductAdsYieldControlPage.jsx | Product Ads | Campaign Management | data-management-list |
| product-ads-keyword | ProductAdsKeywordBidPage.jsx | Product Ads | Campaign Management | upload-page |
| product-ads-bulk | ProductAdsBulkActionsPage.jsx | Product Ads | Campaign Management | upload-page |

**Unwired (LeftNav present, no App.jsx case yet):**
| Nav ID | Section | Notes |
|--------|---------|-------|
| integrations | Apps | No case in App.jsx — falls to default |
| sponsored-ads-ad-format | Sponsored Ads | No component yet |
| display-ads-bulk | Display Ads | No component yet |
| display-ads-inventory | Display Ads | No component yet |
| display-ads-page-setup | Display Ads | No component yet |
| display-ads-ad-format | Display Ads | No component yet |
| display-ads-targeting | Display Ads | No component yet |

---

## 2. Nav ID Registry

All known nav IDs from LeftNav.jsx (NAV_SECTIONS). Use this to detect duplicates before building.

```
home, control-center, advertiser-insights, live-insights, demand-supply, scheduled-reports,
bu-analytics, brand-onboarding, seller-onboarding, super-admin, ops-users, advertiser-users,
account-manager-mapping, admin-user-role, advertiser-user-role, persona-config, persona-allocation,
manage-attributes, manage-cpm-rules, attribute-targeting, manage-segments,
attribution-overrides, automated-rules, wallet-rules, debug-console, product-catalog,
event-logs, product-ads-request-logs, display-ads-request-logs, activity-log,
finance-dashboard, wallet-topup, finance-advertisers,
overview, budget-health, delivery-health,
app-store, integrations,
product-ads-analytics, product-ads-demand-supply, product-ads-live, product-ads-yield, product-ads-keyword, product-ads-bulk,
sponsored-ads-analytics, sponsored-ads-demand-supply, sponsored-ads-live, sponsored-ads-campaigns, sponsored-ads-inventory, sponsored-ads-ad-format,
display-ads-analytics, display-ads-demand-supply, display-ads-live, display-ads-campaigns,
display-ads-bulk, display-ads-inventory, display-ads-page-setup, display-ads-ad-format, display-ads-targeting
```

---

## 3. LeftNav Section → Group Structure

```
control-center
  ├── User Access Management:  super-admin, ops-users, advertiser-users, account-manager-mapping
  ├── User Role Management:  admin-user-role, advertiser-user-role
  ├── Advertiser Persona Management:  persona-config, persona-allocation
  ├── Audience Manager:  manage-attributes, manage-cpm-rules, attribute-targeting
  ├── Advertiser Settings:  manage-segments, attribution-overrides, automated-rules, wallet-rules, debug-console
  ├── Product Catalog:  product-catalog
  └── Activity Log:  event-logs, product-ads-request-logs, display-ads-request-logs, activity-log

analytics
  └── (no groups):  demand-supply, live-insights, advertiser-insights, scheduled-reports, bu-analytics

finance
  └── (no groups):  finance-dashboard, wallet-topup, finance-advertisers

health
  └── (no groups):  overview, budget-health, delivery-health

apps
  └── (no groups):  app-store, integrations
```

---

## 4. App.jsx Routing Pattern

Every page case follows this exact wrapper:

```jsx
case 'nav-id':
  return (
    <>
      <TopBar section="Section" page="Page Title" onNavigate={setActivePage} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
        <ComponentName />
      </main>
    </>
  );
```

Exceptions (pages that return their own full layout without TopBar wrapper):
- `home` → `<HomePage />`
- `control-center` → `<AdvertisersPage />`

---

## 5. Screen Type → Implementation Patterns

Learned from building the following screens in this session:

### upload-page
**Examples:** AccountManagerMappingPage, AttributionOverridesPage, WalletTopUpPage  
**Component imports:** `import { UploadPage } from '../ui'`  
**Key elements:**
- Use `<UploadPage fileName=... fileDesc=... howItWorksBullets={[...]} />` — composes InfoBanner + UploadDropzone + "How it works?" card automatically
- Never hand-roll the info banner, dropzone, or how-it-works card individually when using this pattern

### user-table
**Examples:** SuperAdminUsersPage (Admin User), AdvertiserUsersPage (Advertiser User), OpsUsersPage  
**Component imports:** `import { Toolbar, SearchBar, Button, Drawer, Input, Select, Badge, PlusIcon, TrashIcon, RefreshIcon, SortIcon, Toast, useToast } from '../ui'`  
**Key elements:**
- Optional "Select Advertiser:" filter row (Advertiser User only)
- Toolbar (left: RefreshIcon + "Change Log" link) (right: SearchBar + Button variant="primary")
- Table columns: **Name** (SortIcon) | **Email** | **Access Role** (truncated, ▾ chevron) | Button variant="icon" with TrashIcon
- Access Role shows full text truncated at ~200px with ellipsis
- "Add New User" Drawer: Input label="Name", Input label="Email", Select label="Access Role"
- Delete: removes row from state + showToast('User deleted')
- Search: case-insensitive filter on name using SearchBar
- **Icon rule:** Use named icon exports from src/ui/ — NO emoji (🗑 🔄 etc.), NO raw SVG blocks

### permission-matrix
**Examples:** PersonaConfigPage  
**Component imports:** `import { Toolbar, SearchBar, Button, Checkbox, Toast, useToast } from '../ui'`  
**Key elements:**
- Toolbar (left: tab group hand-rolled pill tabs) (right: SearchBar + Button variant="outline" "Change Log")
- Single wide scrollable table — ALL persona columns visible simultaneously
- First column sticky (Feature, minWidth 320px) with `position: sticky; left: 0`
- Persona columns 90px wide, centered
- Per-cell: `<Checkbox checked={config[persona][featureId]} onChange={...} />` — do NOT hand-roll a custom 16×16 div
- Group header rows between feature groups (different bg color per group)
- Persona dot colors: Platinum=#94a3b8, Gold=#f59e0b, Silver=#64748b, Beta=#8b5cf6
- Footer: Button variant="primary" → showToast('Configuration saved successfully')

### data-management-list
**Examples:** ManageSegmentsPage, ManageAttributesPage, ManageCPMRulesPage  
**Component imports:** `import { Toolbar, SearchBar, Button, Badge, Drawer, Input, Select, Pagination, EditIcon, TrashIcon, PlusIcon, DownloadIcon, Toast, useToast } from '../ui'`  
**Key elements:**
- Toolbar (left: count label e.g. "Segments (11)") (right: SearchBar + Button outline + Button primary)
- Table: `<Badge status={row.status} />` per row (Active/Inactive/Paused)
- Row actions: Button variant="icon" with EditIcon, Button variant="icon" with TrashIcon
- Drawer (480px): Input + Select fields; footer = Cancel (outline) + Save (primary) Buttons
- Multi-step drawers: numbered step indicators at top, Next/Back navigation
- `<Pagination total={total} page={page} perPage={20} onChange={setPage} entityLabel="items" />`

### log-viewer
**Examples:** DeveloperSettingsPage, ActivityLogPage  
**Component imports:** `import { Toolbar, Button, Input, TypeBadge, Toast, useToast } from '../ui'`  
**Key elements:**
- Zone 1 (Log Tracker): `<Input label=... />` + `<Button variant="outline">Add</Button>` + `<Button variant="primary">Start Logging</Button>`
- Helper text below input
- Zone 2 (Event Log table): Event Timestamp | Field | Event Type | Device ID | Request ID | Logs
- Tab bar: All Events / Errors / Warnings (with counts) — hand-rolled pill tabs (no Tabs molecule in src/ui/)
- Event Type: `<TypeBadge type={row.eventType} colorMap={EVENT_COLORS} />` with colorMap for info/error/warning/success
- "View" link in Logs column → showToast(log details)

---

## 6. CSS Variable Quick Reference

| Var | Use |
|-----|-----|
| `var(--osmos-fg)` | Primary text (#1e293b approx) |
| `var(--osmos-fg-muted)` | Secondary text (#64748b approx) |
| `var(--osmos-fg-subtle)` | Placeholder / tertiary (#94a3b8 approx) |
| `var(--osmos-bg-subtle)` | Page background (#f8fafc approx) |
| `var(--osmos-border)` | Table/card borders (#e2e8f0 approx) |
| `var(--osmos-brand-primary)` | Buttons, links, active states (#3b4ea6 approx) |
| `var(--osmos-brand-primary-muted)` | Icon backgrounds, hover tints (#eef0fb approx) |
| `var(--osmos-brand-green)` | Success toasts, positive states |
| `var(--osmos-brand-green-muted)` | Success badge backgrounds |
| `var(--osmos-brand-amber)` | Warning states, paused badges |

---

## 7. Figma Frame ID → Screen Mapping (Session History)

Frames already interpreted — skip re-interpreting these if the same node ID appears:

| Figma Node ID | Screen | Component |
|---------------|--------|-----------|
| 13-92792 | Persona Configuration (permission matrix) | PersonaConfigPage.jsx |
| 6:76364 | Event Debugging / Debug Console | DeveloperSettingsPage.jsx |
| 6:72255 | Manage Segment (list) | ManageSegmentsPage.jsx |
| 6:89285 | Manage Segment (create drawer) | ManageSegmentsPage.jsx |
| 6:74544 | Manage Attributes (list) | ManageAttributesPage.jsx |
| 6:88983 | Manage Attributes (create drawer) | ManageAttributesPage.jsx |
| 6:73936 | Manage CPM Rules (list) | ManageCPMRulesPage.jsx |
| 6:89877 | Manage CPM Rules (create drawer) | ManageCPMRulesPage.jsx |

---

## 8. Quality Rules Learned

These were identified as failure modes in this session and must be enforced:

1. **Never invent feature names** — all row labels in permission matrices MUST come verbatim from Figma text nodes
2. **Latest frame wins** — when two frames have similar names, higher node ID = more recent. Always use the higher one
3. **Permission matrix ≠ tabs** — sibling column frames = wide table, NOT Tabs component
4. **Access Role is NOT a real dropdown** — render as display text + ▾ chevron, not a `<select>`
5. **Upload pages share a template** — they differ only in filename and "How it works?" bullet text
6. **Drawer widths** — create drawers are 480px; detail drawers can be 560px
7. **TopBar receives `onNavigate={setActivePage}`** — every page case must pass this prop
8. **Build verify always** — run `npx vite build --mode development` after every wiring session
9. **No emoji as icons** — all icons must be inline SVG with `fill="none"`, `stroke`, `strokeWidth`, `strokeLinecap/Join` round. Emoji (🗑 🔄 ✕ ✓ etc.) are hard violations caught by lineicon-enforcer
10. **No `<polygon>` for icons** — use `<path>` equivalents; polygon auto-closes and is harder to maintain

---

## 9. Component File Index

All files currently in `src/components/` that are page-level components:

AccountManagerMappingPage.jsx, ActivityLogPage.jsx, AdminUserPage.jsx,
AdvertiserInsightsPage.jsx, AdvertiserUserRolePage.jsx, AdvertiserUsersPage.jsx,
AdvertisersPage.jsx, AttributionOverridesPage.jsx, AutomatedRulesPage.jsx,
BrandAdvertiserOnboardingPage.jsx, CampaignsTable.jsx, Charts.jsx, DataTable.jsx,
DemandSupplyPage.jsx, DeveloperSettingsPage.jsx, DeviceTable.jsx,
FinanceAdvertiserManagementPage.jsx, FinanceDashboardPage.jsx,
GeoTable.jsx, HealthReportPage.jsx, HomePage.jsx,
LeftNav.jsx, LiveAnalyticsPage.jsx, ManageAttributeTargetingPage.jsx,
ManageAttributesPage.jsx, ManageCPMRulesPage.jsx, ManageSegmentsPage.jsx,
OpsUsersPage.jsx, PersonaAllocationPage.jsx, PersonaConfigPage.jsx,
ProductCatalogPage.jsx, ReferrerTable.jsx, ScheduledReportsPage.jsx, SegmentManagerPage.jsx,
SellerAdvertiserOnboardingPage.jsx, StatCards.jsx, SuperAdminUsersPage.jsx,
TopBar.jsx, WalletRulesPage.jsx, WalletTopUpPage.jsx

---

## 10. Component Library — `src/ui/` (OMOS TEST)

**This project's shared component library.** Import from any page file in `src/components/`:
```js
import { X, Y, Z } from '../ui';
```

Read this section before writing any UI element as raw JSX/HTML. If a component exists here, import it — never reimplement it.

### Atoms

| Export | Props | Notes |
|--------|-------|-------|
| `Icon` | size=16, color="currentColor", strokeWidth=1.8, children=SVG paths | Generic SVG wrapper |
| `Button` | variant: primary\|outline\|ghost\|icon\|link, onClick, disabled, size, style | Primary = brand-primary bg; icon = square with border |
| `Badge` | status: Active\|Inactive\|Paused\|Live\|Draft\|Error, showDot=true, children, style | Colored pill with dot |
| `TypeBadge` | type, colorMap={type:{bg,color}}, style | Custom badge for arbitrary categories |
| `Input` | label, value, onChange, placeholder, type="text", required, disabled, style | Text field with label above |
| `Select` | label, value, onChange, options=[{value,label}], required, disabled, style | Dropdown with label above |
| `Checkbox` | checked, onChange, label, disabled=false, style | 16×16 brand-primary custom checkbox |
| `Tag` | colorScheme: green\|amber\|blue\|gray\|red, children, style | Coloured chip label |
| `Toast` | visible, message, type="success"\|"error"\|"info" | Fixed top-right notification |
| `useToast` | — | Hook: returns `{ toast, showToast(message, type?, duration?) }` |

### Named Icon Exports (all accept size, color, strokeWidth)

`SearchIcon`, `FilterIcon`, `RefreshIcon`, `DownloadIcon`, `PlusIcon`, `TrashIcon`, `EditIcon`, `CloseIcon`, `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `UploadIcon`, `FileIcon`, `CheckIcon`, `SortIcon`, `CalendarIcon`, `EyeIcon`, `ColumnsIcon`, `InfoIcon`, `MoreIcon`

### Molecules

| Export | Props | Notes |
|--------|-------|-------|
| `SearchBar` | value, onChange, placeholder="Search...", width=200, style | Magnifier icon + input |
| `Toolbar` | left, right, noBorder=false, style | Flex row with spacer; bottom border unless noBorder |
| `Pagination` | total, page (1-indexed), perPage=20, onChange(newPage), entityLabel="records" | "Showing X-Y of Z" + Prev/Next |
| `Drawer` | open, onClose, title, children, footer, width=480 | Right-side slide panel with overlay |
| `InfoBanner` | fileName, fileDesc, downloadText, onDownload | File icon + text + download link |
| `UploadDropzone` | onFile(file), accept=".xlsx", label="Upload Your File", successMessage | Dashed dropzone + drag-drop |
| `StatCard` | label, value, trend, trendDir: up\|down\|neutral, style | KPI metric card |
| `KPIChip` | label, value, style | Compact metric chip (min-width 160px) |

### Patterns

| Export | Props | Notes |
|--------|-------|-------|
| `UploadPage` | fileName, fileDesc, downloadText, howItWorksBullets[], accept, onFile | InfoBanner + UploadDropzone + How-it-works card |

### What does NOT exist in `src/ui/` — use raw HTML or recharts

| Need | Approach |
|------|----------|
| Data table / grid | Raw `<table><thead><tbody><tr><td>` with CSS var inline styles |
| Centered modal/dialog | Hand-rolled `position:fixed` overlay + white card |
| Tab navigation bar | Hand-rolled pill tabs using Button atoms or styled divs |
| Multi-step wizard steps | Hand-rolled numbered circles + connector lines |
| Timeline / activity log | Raw `<div>` structure with CSS vars |
| Charts | `recharts` — PieChart, LineChart, BarChart, ComposedChart |
| Left nav, top bar | `src/components/LeftNav.jsx` and `TopBar.jsx` — do not reimplement |
