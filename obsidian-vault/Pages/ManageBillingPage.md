---
type: page
name: ManageBillingPage
nav-id: finance/manage-billing
section: Finance
portal: advertiser
screen-type: finance-billing
status: built
source-file: src/advertiser/pages/ManageBillingPage.jsx
last-updated: 2026-05-25T00:00:00Z
tags: [page, advertiser, finance, billing, wallet, topup]
---

# ManageBillingPage

**Portal:** Advertiser Console  
**Nav:** Finance → Manage Billing  
**Source:** `src/advertiser/pages/ManageBillingPage.jsx`  
**Route:** `/finance/manage-billing` (case in `src/advertiser/App.jsx`)

---

## Screenshots

Preview (built implementation — 1440×900):
![[../../.temp/screenshots/manage-billing-built.png]]

Staging reference — full viewport:
![[../../.temp/screenshots/manage-billing-staging-full.png]]

Staging reference — content crop:
![[../../.temp/screenshots/manage-billing-staging-content.png]]

> Screenshots stored in `.temp/screenshots/` (gitignored). Share offline with team.

---

## Zone Map

```
┌─────────────────────────────────────────────────────────────────┐
│ Wallet Details                          [↺ Change History]       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ⓘ NOTE: Base recharge subject to TDS. Submit form 26AS...  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ Default Profile [▼] │ Balance ₹X │ Promo Balance ₹0 │ Max ₹X    │
│                                                                   │
│ Top-up Amount:                                                    │
│ [ ₹ | Enter Amount ] [+₹500] [+₹1,000] [+₹1,500]  [Add Money→] │
│ Minimum Top-up Amount ₹1                                         │
│                                                                   │
│ ⓘ Invoice will be issued in next 4 working days...               │
├─────────────────────────────────────────────────────────────────┤
│ [Campaign Type] [Transaction Log] [Wallet]   ← pill tabs         │
├─────────────────────────────────────────────────────────────────┤
│ [+ Add Filter]                         [↻] [↓]                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Campaign Type │ Wallet │ Spend (7d) │ Max usage │ Bal │ Promo│ │
│ │ Offsite Ads   │    1   │  ～～～    │ ₹43,000k  │ ... │  ₹0 │ │
│ │ Sponsored...  │   19   │  ／‾‾＼   │ ₹43,497k  │ ... │  ₹0 │ │
│ │ ...           │   21   │  ～～～   │ ₹43,535k  │ ... │ ₹280│ │
│ │ In-Store...   │   10   │  ～～～   │ ₹48,878k  │ ... │  ₹0 │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Map

| Zone | Component | Source |
|------|-----------|--------|
| TDS banner | Inline info banner (`InfoIcon` + flex row) | `src/ui` InfoIcon |
| Invoice banner | Same banner pattern, no border | `src/ui` InfoIcon |
| KPI row | `KpiStat` sub-component | Local (inline) |
| Default Profile | Raw `<select>` | HTML |
| Quick amount pills | `<Button variant="outline" size="sm">` | `src/ui` Button |
| Add Money | `<Button variant="primary">` | `src/ui` Button |
| Tabs | `<Tabs variant="pill" items={TAB_ITEMS}>` | [[Components/molecules/Tabs]] |
| Toolbar icons | Raw `<button>` + `RefreshIcon`/`DownloadIcon` | `src/ui` icons |
| Table | Raw `<table>` with `<thead>`/`<tbody>` | HTML |
| Spend sparkline | `<LineChart>` (recharts) | recharts |
| Filter button | `<Button variant="outline" size="sm">` | `src/ui` Button |

---

## Data Shapes

### WALLET_SUMMARY
```js
{
  balance:      43000342.41,   // ₹ float
  promoBalance: 0,
  maxUsage:     43000342.41,
}
```

### TABLE_ROWS (Campaign Type tab)
```js
[
  {
    type:        'Offsite Ads',      // Campaign type name (also sparkline key)
    walletCount: 1,                  // Integer — shown in brand-primary colour
    maxUsage:    43000000.00,        // ₹ float
    balance:     43000342,           // ₹ float
    promoBalance: 0,                 // ₹ float
  },
  // ...
]
```

### SparkLine data
```js
SPEND_SPARKLINES['Sponsored Product Ads'] = [30, 50, 45, 60, 55, 70, 65]
// 7-point array keyed by campaign type name
// Rendered as: recharts LineChart, teal stroke #0BC5A4, no dot, no fill
```

### TAB_ITEMS
```js
[
  { id: 'campaign-type',   label: 'Campaign Type' },
  { id: 'transaction-log', label: 'Transaction Log' },
  { id: 'wallet',          label: 'Wallet' },
]
```

---

## Sparkline Spec

| Property | Value |
|----------|-------|
| Library | `recharts` `LineChart` |
| Type | `LineChart` (NOT AreaChart — no fill) |
| Stroke colour | `#0BC5A4` (teal) |
| Stroke width | `1.5` |
| Dot | `false` |
| Animation | `isAnimationActive={false}` |
| Dimensions | `100×30` via `ResponsiveContainer` |
| Tooltip | Yes — `₹{v}` / "Spend" label |

---

## KPI Row Layout

The four stats are rendered as a single **inline flex row** — NOT separate cards.

```jsx
<div style={{ display:'flex', alignItems:'center' }}>
  {/* Default Profile — label + select */}
  <div style={{ paddingRight:24, marginRight:24, borderRight:'1px solid var(--osmos-border)' }}>
    <span>Default Profile</span>  <select>...</select>
  </div>

  {/* Balance, Promo Balance, Max usage — KpiStat sub-component */}
  <KpiStat label="Balance"             value="₹43,000,342.41" divider />
  <KpiStat label="Promotional Balance" value="₹0"             divider />
  <KpiStat label="Max usage allowed"   value="₹43,000,342.41" />
</div>
```

`KpiStat` renders `border-right` divider via the `divider` prop.  
Label: `fontSize:12 color:var(--osmos-fg-muted)` with ⓘ suffix.  
Value: `fontSize:16 fontWeight:700 color:var(--osmos-fg)`.

---

## Top-up Form

- `₹` prefix adornment: left-side div with `background:var(--osmos-bg-subtle)`, `border-right`
- Input: `type="number"` width 160, no-border, no-outline
- Quick amounts: `QUICK_AMOUNTS = [500, 1000, 1500]` rendered as `+₹{n}` outline buttons
- "Add Money" primary button: `marginLeft:'auto'` to push to the right end
- Helper text: "Minimum Top-up Amount ₹1" below the row

---

## Info Banners

Two separate info banners with slightly different styling:

| Banner | Background | Border | Content |
|--------|-----------|--------|---------|
| TDS note | `var(--osmos-brand-primary-muted)` | `1px solid var(--osmos-brand-primary)` | TDS + 26AS + reimbursement text |
| Invoice | `var(--osmos-brand-primary-muted)` | none | Invoice email timing |

Both use `InfoIcon` (14px, brand-primary) + text. **Neither is a form input** — they are read-only informational rows.

---

## Tabs

```jsx
<Tabs
  value={activeTab}
  onValueChange={setActiveTab}
  items={TAB_ITEMS}
  variant="pill"         // ← pill, NOT line
>
  <Tabs.Content value="campaign-type">   <CampaignTypeTab /> </Tabs.Content>
  <Tabs.Content value="transaction-log"> <EmptyTab />        </Tabs.Content>
  <Tabs.Content value="wallet">          <EmptyTab />        </Tabs.Content>
</Tabs>
```

Transaction Log and Wallet tabs are placeholder stubs ("coming soon").

---

## Sidebar Wiring

`src/advertiser/components/sidebar.jsx`:

```js
{
  id: 'finance',
  label: 'Finance',
  icon: ICON_DOLLAR,
  subItems: [
    {
      id: 'manage-billing',
      label: 'Manage Billing',
      active: currentRoute === '/finance/manage-billing',
      onClick: () => navigate('/finance/manage-billing'),
    }
  ]
}
```

`activeId` logic: `currentRoute.startsWith('/finance') ? 'finance' : ...`

---

## Design Decisions & Lessons Learned

### What we got wrong on first build (vs staging)

| # | Area | First attempt | Correct (from staging) |
|---|------|---------------|------------------------|
| 1 | KPI layout | 3 separate bordered cards | Single inline row with `border-right` dividers |
| 2 | Invoice section | HTML `<checkbox>` input | Read-only info banner |
| 3 | Tab variant | `variant="line"` | `variant="pill"` |
| 4 | Wallet column | Campaign name string | **Integer count** in brand-primary colour |
| 5 | Spend column | AreaChart with gradient fill | Thin teal `LineChart` — no fill |
| 6 | Quick amounts | ₹500/₹1,000/₹2,000/₹5,000 | `+₹500` / `+₹1,000` / `+₹1,500` (3 items) |
| 7 | Change History | Missing | `↺ Change History` ghost button, top-right of header |
| 8 | Section borders | Outer card border | No outer border — flush on bg |

### Root cause
All errors came from building against a **partially-obscured screenshot** (theme dropdown was open, blocking the KPI row and top-up form). Fix: always get a clean full-viewport, no-overlay screenshot before designing.

### Process improvement
- Created `.temp/screenshots/` (gitignored) for offline reference captures
- Screenshot naming convention: `{page-slug}-{source}-{variant}.png`
  - e.g. `manage-billing-built.png`, `manage-billing-staging-full.png`

---

## TODOs

- [ ] Wire Transaction Log tab to real API
- [ ] Wire Wallet tab to real API
- [ ] Replace raw `<table>` with `DataTable` + `useOsmosTable`
- [ ] Replace raw `<select>` (Default Profile) with `Select` from `src/ui`
- [ ] Add real top-up API call on "Add Money"
- [ ] Connect Change History button to history drawer/modal
