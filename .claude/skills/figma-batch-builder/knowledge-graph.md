# Figma Batch Builder — Knowledge Graph

> Auto-updated every hour by a cron job that re-reads App.jsx, LeftNav.jsx, and src/components/.
> Last updated: 2026-04-24 (manual refresh — corrected manage-segments group, removed duplicate manage-cpm-rules, added apps section)

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

**Unwired (LeftNav present, no App.jsx case yet):**
| Nav ID | Section | Notes |
|--------|---------|-------|
| app-store | Apps | No case in App.jsx — falls to default |
| integrations | Apps | No case in App.jsx — falls to default |

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
app-store, integrations
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
**Key elements:**
- Gray info banner: file icon + `filename.xlsx` (bold) + description + "↓ Download file for all advertisers" blue link (right-aligned)
- "Upload Your File" label with upload icon
- Large dashed blue-border rectangle dropzone (150px tall): circle upload icon + "Drag and drop or Upload your .xlsx file here"
- Hidden `<input type="file" accept=".xlsx">` triggered by clicking dropzone
- "How it works?" card: gray bg, half-page width, document icon header, bullet-point instructions
- Toast "File uploaded successfully" on file select

### user-table
**Examples:** SuperAdminUsersPage (Admin User), AdvertiserUsersPage (Advertiser User), OpsUsersPage  
**Key elements:**
- Optional "Select Advertiser:" filter row (Advertiser User only)
- Top bar: SVG refresh icon + "Change Log" blue link (left) + search "Search Name" + "＋ Add New User" blue button (right)
- Table columns: **Name** (with ▲▼ sort toggle) | **Email** | **Access Role** (truncated, ▾ chevron) | SVG trash icon
- Access Role shows full text truncated at ~200px with ellipsis
- "Add New User" modal: Name (required), Email (required), Access Role select
- Delete: removes row from state + toast "User deleted"
- Search: case-insensitive filter on name
- **Icon rule:** Use SVG icons only — NO emoji (🗑 🔄 etc.)

### permission-matrix
**Examples:** PersonaConfigPage  
**Key elements:**
- Toolbar: tab group (Auction Campaign | All) left + search + Change Log button right
- Single wide scrollable table — ALL persona columns visible simultaneously
- First column sticky (Feature, minWidth 320px) with `position: sticky; left: 0`
- Persona columns 90px wide, centered
- Group header rows between feature groups (different bg color per group)
- Custom 16×16 checkbox: brand-primary bg + white SVG check when checked, border-only when unchecked
- Persona dot colors: Platinum=#94a3b8, Gold=#f59e0b, Silver=#64748b, Beta=#8b5cf6
- Footer Save button → toast

### data-management-list
**Examples:** ManageSegmentsPage, ManageAttributesPage, ManageCPMRulesPage  
**Key elements:**
- Toolbar: count badge (e.g. "Segments (11)") + search + icon buttons + primary action + secondary action
- Table with Status badge column (Active=green pill, Inactive=gray, Paused=orange)
- Right-aligned action icons per row (edit pencil, trash) — SVG only, no emoji
- Create/Edit drawer (right side, 480px width): slides in on action button click
- Drawer has header + scrollable body + sticky footer (Cancel + Save)
- Multi-step drawers: numbered step indicators at top, Next/Back navigation
- Pagination: "Showing X-Y of Z" + prev/next arrows

### log-viewer
**Examples:** DeveloperSettingsPage, ActivityLogPage  
**Key elements:**
- Zone 1 (Log Tracker): text input with placeholder + "Add" outline button + "Start Logging" primary button
- Helper text below input
- Zone 2 (Event Log table): Event Timestamp | Field | Event Type | Device ID | Request ID | Logs
- Tab bar: All Events / Errors / Warnings (with counts)
- Event Type badges: info=blue, error=red, warning=orange, success=green
- "View" link in Logs column → side panel or toast

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
