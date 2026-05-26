---
type: figma-map
title: Design System OS — Complete Component Map
figma-file: "https://www.figma.com/design/58jL2Gbe53rBhxOysvHM82/Design-System-OS"
figma-file-key: "58jL2Gbe53rBhxOysvHM82"
figma-library-key: "lk-379480b9390449045fbb75453807e4e0bd82a20f83bbcfed967739adc7eaf61a9ec121c8b60ece1da71fdde5846c1893a7c543e298ced4e190254c8223142a84"
last-synced: 2026-05-15
---

# Design System OS — Complete Component Map

Source: Figma file `58jL2Gbe53rBhxOysvHM82` — Design-System-OS  
Library name: **Design System OS** (team library, published)

> **Cover PNG:** [[Assets/Components/design-system-cover.png]]

---

## How to Use This Map

Each row gives:
- **nodeId** — the Figma node ID for `get_screenshot` / `get_design_context` calls
- **componentKey** — the stable library key for `importComponentByKeyAsync`

To take a fresh screenshot of any component:
```bash
# In Claude Code:
use_figma(fileKey="58jL2Gbe53rBhxOysvHM82", code="return figma.root.children.find(p=>p.id==='PAGE_ID').children.find(n=>n.id==='NODE_ID')")
get_screenshot(nodeId="NODE_ID", fileKey="58jL2Gbe53rBhxOysvHM82", maxDimension=1200)
```

---

## File Pages (all 40 pages discovered 2026-05-15)

| Page Name | Page ID | Notes |
|-----------|---------|-------|
| Cover | `0:1` | Design system cover |
| Organisms | `3416:2` | Full-page organism components |
| Documentation | `1:1150` | Dev guides, to-do list |
| ❖Grid Layout | `483:25240` | Layout grid reference |
| ❖Colors | `1:1151` | Full color palette |
| ❖Typography | `1:2390` | Type scale |
| ❖Buttons | `1:2391` | Button variants |
| ❖Tooltip | `1:2393` | Tooltip variants |
| ❖Input Fields | `2:2792` | Text inputs |
| ❖ Tags | `187:6556` | Tag + Chips |
| ❖ Chips | `858:62722` | Badge/chip variants |
| ❖Checkbox | `543:73558` | Checkbox |
| ❖ Graphs & Charts | `708:255` | Charts |
| ❖Dropdowns | `1:2392` | Dropdowns |
| ❖ Radio Buttons | `38:883914` | Radio controls |
| ❖ Tables & Layout | `99:18675` | Tables |
| ❖ Tabs | `48:444` | Tabs |
| ❖ Toast | `87:5027` | Toast notification |
| ❖ Steps | `60:1520` | Step/Stepper |
| ❖ Filter | `925:11922` | Filter panel |
| ❖ Toggle & Switch | `189:8174` | Toggle/Switch |
| ❖ Cards | `946:9784` | StatCard / KPI cards |
| ❖ Calendar | `1015:8859` | Date picker |
| ❖Popover | `1:2394` | Popover |
| ❖ Heat Map | `190:8678` | Heat map |
| ❖ Search | `920:47977` | Search bar |
| ❖ Funnels | `841:21962` | Funnel components |
| ❖ Left Nav | `525:31225` | Sidebar nav |
| ❖ Top Bar | `1578:45251` | Top bar |
| ❖Empty State (Ongoing) | `3671:68451` | Empty state |
| ❖ Icons | `1511:805` | Icon set |
| ❖ Drawers | `1217:20089` | Drawer panel |
| ❖Time Ticker | `3704:26772` | Time display |
| ❖Info Box | `4454:77252` | InfoBanner |
| ❖Badges | `5484:1479` | Badge components |
| ❖Spin Loader | `5568:119124` | Spinner |
| ❖Error States | `5629:27041` | Error state patterns |
| ❖Accordion | `5684:1685` | Accordion |
| Bulk Upload UI | `6493:52281` | Upload flow |
| Testing Page | `8085:81817` | QA testing |

---

## Atoms

| Component | nodeId | componentKey | PNG | Page |
|-----------|--------|--------------|-----|------|
| Button | `409:107991` | `adc3823b45...` | ✅ atoms/Button.png | ❖Buttons |
| Button (alt) | — | `f491d2d907...` | — | ❖Buttons |
| Radio Button | `848:10944` | `d671724fea...` | ✅ atoms/RadioButton.png | ❖ Radio Buttons |
| Radio Button (alt) | — | `6a4418cab3...` | — | ❖ Radio Buttons |
| Radio Label | — | `552a67fbc7...` | — | ❖ Radio Buttons |
| Radio Group | — | `3064ef87ca...` | — | ❖ Radio Buttons |
| Checkbox | `692:8204` | `7aa1d4091c...` | ✅ atoms/Checkbox.png | ❖Checkbox |
| Tag (tag-01) | `692:5206` | `274c46c0ba...` | ✅ atoms/Tag.png | ❖ Tags |
| Spin Loader | `5664:34408` | `07e7868602...` | ✅ atoms/SpinLoader.png | ❖Spin Loader |
| Spinner With BG | — | `380c8c256f...` | — | ❖Spin Loader |
| loading-01 (icon) | — | `6279fea632...` | — | ❖Spin Loader |
| filter-lines (icon) | — | `9666e018da...` | — | ❖ Filter |
| life-buoy-02 (icon) | — | `440b73cab5...` | — | ❖ Icons |
| Badge | `5491:1574` | — | ✅ atoms/Badge.png | ❖Badges |
| Input Field | `2952:69107` | — | ✅ atoms/Input.png | ❖Input Fields |
| Toggle / Switch | `925:30922` | — | ✅ atoms/Toggle.png | ❖ Toggle & Switch |
| Toast | `99:18351` | — | ✅ atoms/Toast.png | ❖ Toast |

---

## Molecules

| Component | nodeId | componentKey | PNG | Page |
|-----------|--------|--------------|-----|------|
| Search | `922:12552` | `cc6ba91289...` | ✅ molecules/Search.png | ❖ Search |
| Dropdown Menu | `1947:23250` | `22ce992b29...` | ✅ molecules/DropdownMenu.png | ❖Dropdowns |
| Calendar | `1026:7846` | `85c3fc1345...` | ✅ molecules/Calendar.png | ❖ Calendar |
| Informational Popup | `1:2394` | `f4e386989a...` | ✅ molecules/Popover.png | ❖Popover |
| Popover - Footers | — | `8c575aac15...` | — | ❖Popover |
| Tabs | `69:12409` | `0604a4b6b9...` | ✅ molecules/Tabs.png | ❖ Tabs |
| Text Tab | — | `117bb356a5...` | — | ❖ Tabs |
| Tab Item - Vertical | — | `12e11bf1a1...` | — | ❖ Tabs |
| Upload File | `6493:52281` | `c9e4315ab2...` | ✅ molecules/UploadFile.png | Bulk Upload UI |
| Table Footer | — | `ccb857e59c...` | — | ❖ Tables & Layout |
| DataTable (Main) | `1555:32943` | — | ✅ molecules/Table.png | ❖ Tables & Layout |
| Drawer | `1506:3155` | — | ✅ molecules/Drawer.png | ❖ Drawers |
| Stepper / Steps | `883:57076` | — | ✅ molecules/Stepper.png | ❖ Steps |
| Filter | `925:24344` | — | ✅ molecules/Filter.png | ❖ Filter |
| InfoBanner (Info Box) | `4454:77373` | — | ✅ molecules/InfoBanner.png | ❖Info Box |
| StatCard (Cards) | `996:7697` | — | ✅ molecules/StatCard.png | ❖ Cards |
| Top Bar | `1605:135` | — | ✅ organisms/TopBar.png | ❖ Top Bar |
| Tooltip | — | — | ✅ molecules/Tooltip.png | ❖Tooltip |
| Accordion | `5684:1685` | — | ✅ molecules/Accordion.png | ❖Accordion |
| Heat Map | `190:8678` | — | ✅ molecules/HeatMap.png | ❖ Heat Map |
| Time Ticker | `3704:26772` | — | ✅ molecules/TimeTicker.png | ❖Time Ticker |
| Error States | `5629:27041` | — | ✅ molecules/ErrorStates.png | ❖Error States |

---

## Organisms / Patterns

| Component | nodeId | componentKey | PNG | Page |
|-----------|--------|--------------|-----|------|
| Open Nav - Os | `2352:93971` | `65aed72b7e...` | ✅ organisms/NavShell.png | ❖Colors |
| Left Nav (full frame) | `4255:19523` | — | ✅ organisms/LeftNav.png | ❖ Left Nav |
| Action Item | — | `7074f1d42f...` | — | ❖Dropdowns |
| Setting | — | `1bd5734764...` | — | ❖ Left Nav |
| Pie Chart | `3738:50722` | `1f5a2899a8...` | ✅ organisms/DataCharts.png | ❖ Graphs & Charts |
| Budget Utilization Trend | — | `fb066cb99a...` | — | ❖ Graphs & Charts |
| Today Performance Trend | — | `cfa38b9c92...` | — | ❖ Graphs & Charts |
| Sponsorship Ads | `661:3400` | `eb6e93b7b7...` | — | ❖Colors |
| Package Admin / Commitments | `3473:8947` | — | ✅ organisms/Offsite.png | Organisms |
| Package Admin / Rules | `3473:13908` | — | ✅ organisms/PackageAdmin.png | Organisms |
| Funnels | `841:21962` | — | ✅ organisms/Funnels.png | ❖ Funnels |

---

## Tokens

| Token | nodeId | PNG | Page |
|-------|--------|-----|------|
| Colors (New Final Palettes) | `442:30838` | ✅ tokens/Colors.png | ❖Colors |
| Typography | `23:8522` | ✅ tokens/Typography.png | ❖Typography |
| Grid Layout | `483:25240` | ✅ tokens/GridLayout.png | ❖Grid Layout |
| Cover | `1:244` | ✅ design-system-cover.png | Cover |

---

## PNG Screenshot Status

**Counts:** 40 PNGs downloaded across atoms/molecules/organisms/tokens (as of 2026-05-15 sweep 2)

| Tier | Total | PNGs Downloaded |
|------|-------|-----------------|
| Atoms | 17 variants | 9 (Button, Badge, Checkbox, Icons, Input, RadioButton, SpinLoader, Tag, Toggle, Toast) |
| Molecules | 22+ | 18 (Accordion, Calendar, Drawer, DropdownMenu, ErrorStates, Filter, HeatMap, InfoBanner, Popover, Search, StatCard, Stepper, Table, Tabs, TimeTicker, Tooltip, UploadFile, TopBar) |
| Organisms | 8 | 7 (DataCharts, Funnels, LeftNav, NavShell, Offsite, PackageAdmin, TopBar) |
| Tokens | 3 | 3 (Colors, GridLayout, Typography) |

**Remaining without PNGs:** Modal, RadioCard, EmptyState, KPIChip, Pagination, GlobalSearch, ThemeDropdown, SectionCard

**Cover image:** ✅ `Assets/Components/design-system-cover.png`
