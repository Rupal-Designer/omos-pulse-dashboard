---
type: component-index
last-updated: 2026-05-18
tags: [index, components, atomic-design, design-system-os]
---

# Component Library Index

Two sources are tracked here:
- **App-level wrappers** — `src/ui/index.js` in OMOS TEST (import: `import { X } from '../../ui'`)
- **Design System OS** — Figma team library + `@onlinesales-ai/ui` shared-ui package

Full Figma component map with nodeIds: [[Figma/design-system-map]]  
Design System cover: [[Assets/Components/design-system-cover.png]]

---

## Atoms

> Basic, indivisible UI building blocks. No internal composition of other components.

| Component | Figma nodeId | PNG | App Source | Notes |
|-----------|-------------|-----|------------|-------|
| [[Components/atoms/Button]] | `409:107991` | ✅ | src/ui/atoms/Button.jsx | 5 variants, sm/md/lg |
| [[Components/atoms/RadioButton]] | `848:10944` | ✅ | — | RadioLabel + RadioGroup |
| [[Components/atoms/Checkbox]] | `692:8204` | ✅ | src/ui/atoms/Checkbox.jsx | Figma name: `check` |
| [[Components/atoms/Tag]] | `692:5206` | ✅ | src/ui/atoms/Tag.jsx | Figma name: `tag-01` |
| [[Components/atoms/Badge]] | `5491:1574` | ✅ | src/ui/atoms/Badge.jsx | Status badge (Active/Paused/etc.) |
| [[Components/atoms/TypeBadge]] | `5491:1574` | — | src/ui/atoms/Badge.jsx | Category badge with custom colorMap |
| [[Components/atoms/Input]] | `2952:69107` | ✅ | src/ui/atoms/Input.jsx | Input + Select |
| [[Components/atoms/Toast]] | `99:18351` | ✅ | src/ui/atoms/Toast.jsx | useToast hook |
| [[Components/atoms/SpinLoader]] | `5664:34408` | ✅ | src/ui/atoms/SpinLoader.jsx | Bare + With BG variants |
| [[Components/atoms/Toggle]] | `925:30922` | ✅ | src/ui/atoms/Toggle.jsx | Toggle & Switch |
| [[Components/atoms/Icon]] | `1706:39354` | ✅ | src/ui/atoms/Icon.jsx | 21 named exports |
| [[Components/atoms/Chips]] | `858:62926` | ✅ | — | Figma: Chips → Code: Badge; dismissible filters |
| [[Components/atoms/LogoMark]] | — | — | src/ui/atoms/LogoMark.jsx | Brand mark |
| [[Components/atoms/Select]] | — | — | src/ui/atoms/Input.jsx | Co-exported with Input |
| [[Components/atoms/FilterIcon]] | — | — | — | filter-lines icon |

**Atom count: 15**

---

## Molecules

> Atoms combined into functional UI units with their own internal logic.

| Component | Figma nodeId | PNG | App Source | Notes |
|-----------|-------------|-----|------------|-------|
| [[Components/molecules/Search]] | `922:12552` | ✅ | src/ui/molecules/SearchBar.jsx | Always in Toolbar right slot |
| [[Components/molecules/Toolbar]] | — | — | src/ui/molecules/Toolbar.jsx | Left + right slots |
| [[Components/molecules/DropdownMenu]] | `1947:23250` | ✅ | src/ui/molecules/DropdownMenu.jsx | Select + Context menu |
| [[Components/molecules/Calendar]] | `1026:7846` | ✅ | — | Single + Range date picker |
| [[Components/molecules/Tabs]] | `69:12409` | ✅ | src/ui/molecules/Tabs.jsx | Line / Pill / **Vertical** variants; vertical key `12e11bf1...` |
| [[Components/molecules/Popover]] | `1:2394` | ✅ | src/ui/molecules/Popover.jsx | Info popup + footer variant |
| [[Components/molecules/UploadFile]] | `6493:52281` | ✅ | src/ui/molecules/UploadDropzone.jsx | Drag-drop zone |
| [[Components/molecules/Drawer]] | `1506:3155` | ✅ | src/ui/molecules/Drawer.jsx | Right-side slide panel |
| [[Components/molecules/Modal]] | — | — | src/ui/molecules/Modal.jsx | Centered dialog |
| [[Components/molecules/InfoBanner]] | `4454:77373` | ✅ | src/ui/molecules/InfoBanner.jsx | Alert/notification banner |
| [[Components/molecules/StatCard]] | `996:7697` | ✅ | src/ui/molecules/StatCard.jsx | KPI metric card |
| [[Components/molecules/KPIChip]] | — | — | src/ui/molecules/KPIChip.jsx | Compact metric chip |
| [[Components/molecules/EmptyState]] | — | — | src/ui/molecules/EmptyState.jsx | No-data placeholder |
| [[Components/molecules/SectionCard]] | — | — | src/ui/molecules/SectionCard.jsx | Bordered form group |
| [[Components/molecules/Stepper]] | `883:57076` | ✅ | src/ui/molecules/Stepper.jsx | Multi-step indicator |
| [[Components/molecules/Filter]] | `925:24344` | ✅ | — | Filter panel trigger |
| [[Components/molecules/DataTable]] | `1555:32943` | ✅ | src/ui/DataTable.jsx | TanStack Table v8 wrapper |
| [[Components/molecules/RadioCard]] | — | — | src/ui/molecules/RadioCard.jsx | Card-style radio |
| [[Components/molecules/ThemeDropdown]] | — | — | src/ui/molecules/ThemeDropdown.jsx | Light/dark toggle |
| [[Components/molecules/GlobalSearch]] | — | — | src/ui/molecules/GlobalSearch.jsx | App-level search overlay |
| [[Components/molecules/Pagination]] | — | — | src/ui/molecules/Pagination.jsx | Table page controls |
| [[Components/molecules/Accordion]] | `5684:1685` | ✅ | src/ui/molecules/Accordion.jsx | Collapsible disclosure panels |
| [[Components/molecules/FormField]] | — | — | src/ui/molecules/FormField.jsx | Label + hint + error wrapper for form inputs |
| [[Components/molecules/FormDrawer]] | — | — | src/ui/molecules/FormDrawer.jsx | Drawer with header/body/footer + submit/cancel actions |
| [[Components/molecules/HeatMap]] | `190:8678` | ✅ | — | Grid color-intensity chart |
| [[Components/molecules/TimeTicker]] | `3704:26772` | ✅ | — | Countdown / elapsed timer |
| [[Components/molecules/ErrorStates]] | `5629:27041` | ✅ | — | Full-page + inline error patterns |
| [[Components/molecules/Tooltip]] | `2727:101995` | ✅ | — | Hover label for icon-only elements |

**Molecule count: 28** (added FormField, FormDrawer)

---

## Organisms

> Complex, domain-aware UI sections composed of multiple molecules.

| Component | Figma nodeId | PNG | Notes |
|-----------|-------------|-----|-------|
| [[Components/organisms/NavShell]] | `2352:93971` | ✅ | App shell: sidebar + topbar |
| [[Components/organisms/TopBar]] | `1605:135` | ✅ | Application top bar |
| [[Components/organisms/DataCharts]] | `3738:50722` | ✅ | Pie + Budget Trend + Today Trend |
| [[Components/organisms/AdCreatives]] | `661:3400` | — | Sponsorship / ad preview tiles |
| [[Components/organisms/Offsite]] | `3473:8947` | ✅ | Package commitments wizard step |
| [[Components/organisms/PackageAdmin]] | `3473:13908` | ✅ | Package rules wizard step |
| [[Components/organisms/Funnels]] | `841:21962` | ✅ | Conversion funnel visualization |

**Organism count: 7**

---

## Tokens

> Design tokens — color, type, and spacing reference.

| Token | Figma nodeId | PNG | Notes |
|-------|-------------|-----|-------|
| [[Components/tokens/Colors]] | `442:30838` | ✅ | 84 variables, Light + Dark mode (fully documented) |
| [[Components/tokens/Typography]] | `23:8522` | ✅ | Type scale, Inter font |
| [[Components/tokens/GridLayout]] | `483:25240` | ✅ | Column grid, gutters, breakpoints |
| [[Components/tokens/Spacing]] | — | — | Full spacing scale + icon sizing (Figma vars) |
| [[Components/tokens/CornerRadius]] | — | — | Radius scale + Drawer widths (Figma vars) |
| [[Components/tokens/Shadows]] | — | — | 5 semantic shadow tokens (Figma vars) |

**Token count: 6**

---

## Patterns

> Full self-contained screen patterns composed of organisms + molecules.

| Component | App Source | Notes |
|-----------|------------|-------|
| [[Components/patterns/UploadPage]] | src/ui/patterns/UploadPage.jsx | InfoBanner + UploadDropzone + howItWorks |
| [[Components/patterns/DataListPage]] | src/ui/patterns/DataListPage.jsx | Toolbar + DataTable + Pagination + FormDrawer + EmptyState |
| [[Components/patterns/AnalyticsDashPage]] | src/ui/patterns/AnalyticsDashPage.jsx | StatCard grid + chart grid + optional table slot |
| [[Components/patterns/SettingsPage]] | src/ui/patterns/SettingsPage.jsx | SectionCard + Tabs + optional toolbar slot |
| [[Components/patterns/OnboardingWizard]] | src/ui/patterns/OnboardingWizard.jsx | Stepper + content slot + nav buttons |

**Pattern count: 5**

---

## Advertiser-Specific Components

> Domain components for the advertiser-facing UI. See [[Components/advertiser/]] directory.

15 components: LeftNav, TopBar, sidebar, campaign-table, filter-builder, performance-table, performance-trend, metrics-cards, funnel-simulation-section, ai-debugger-panel, ai-suggestions-panel, sofie-chat-panel, budget-adjust-drawer, theme-provider, header

---

## Key Figma DS Organisms (not yet as app wrappers)

| Component | nodeId | Figma DS Key | Description |
|-----------|--------|-------------|-------------|
| Action Item | — | `7074f1d42f0...` | Icon+label nav item |
| Open Nav - Os | `2352:93971` | `65aed72b7e8...` | Full sidebar nav frame |
| Table Footer | — | `ccb857e59cd...` | Pagination row in tables |
| Status/Table's Icon | — | `740631df091...` | Status icon for table cells |
| Page level contribution 1 | — | `0f060509e36...` | Analytics contribution widget |
| Download Campaign Report | — | `df30d80342d...` | Report download CTA panel |
| Outframe | — | `4682b37eecf...` | Device/screen frame wrapper |
| Sponsorship Ads | `661:3400` | `eb6e93b7b77...` | Ad creative preview |
