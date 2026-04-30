# shadcn-to-osmos Migration Knowledge Graph

Tracks every file in `src/advertiser/` that needs migration from shadcn/Tailwind/lucide to `src/ui/` inline-style pattern.

**Legend:**
- ✅ Done — migrated, build-verified
- 🔄 In Progress
- ⬜ Pending
- ⏭️ Skip — no migration needed (no shadcn/lucide/className)

**Complexity signals:**
- `lucide:N` — import lines from lucide-react
- `shadcn:N` — `@/components/ui/*` import lines
- `className:N` — count of `className=` attributes to convert

---

## Tier 0 — Infrastructure (migrate first, unblocks everything)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ✅ | `components/sidebar.jsx` | 184 | 1 | 0 | 11 | Nav + expand/collapse + sub-items. Done 2025-04-29. |
| ✅ | `components/header.jsx` | 314 | 1 | 0 | 29 | Topbar. Sparkles/Sun/Moon/Monitor/Users/Bell hand-rolled. Named: Search/ChevronDown/ChevronRight/Calendar/Check/Refresh. Done 2025-04-29. |

---

## Tier 1 — Dashboard display components (unblock DashboardPage)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ✅ | `components/metrics-cards.jsx` | 119 | 1 | 0 | 6 | KPI grid — InfoIcon/ChevronDownIcon, MetricCard extracted for hover state. Done 2025-04-29. |
| ✅ | `components/performance-trend.jsx` | 436 | 1 | 0 | 18 | recharts kept, Sparkles hand-rolled, DownloadIcon/InfoIcon named. Done 2025-04-29. |
| ✅ | `components/campaign-table.jsx` | 1308 | 1 | 2 | 137 | BarChartIcon + MoreVerticalIcon hand-rolled. Button/Checkbox from ui. Custom inline filter builder. Campaign select modal. StatusBadge with osmos tokens. Done 2025-04-29. |
| ✅ | `components/performance-table.jsx` | 612 | 1 | 0 | 60 | BarChartIcon hand-rolled. FilterBuilder integrated. hoveredRow index pattern. Done 2025-04-29. |
| ✅ | `components/ai-suggestions-panel.jsx` | 325 | 1 | 0 | 25 | Slide-in panel. 8 hand-rolled icons (Sparkles/LayoutGrid/List/AlertTriangle/TrendingUp/Dollar/Target/Users/Zap), CategoryChip extracted. Done 2025-04-29. |
| ✅ | `components/filter-builder.jsx` | 225 | 1 | 0 | 14 | PlusIcon/CloseIcon, native select/input kept. Done 2025-04-29. |

---

## Tier 2 — Pages (wire after their component deps are migrated)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ⏭️ | `pages/DashboardPage.jsx` | 40 | 0 | 0 | 4 | Thin shell — just composes Tier 1 components. Migrate last in tier. |
| ✅ | `pages/HomePage.jsx` | 594 | 1 | 0 | 67 | 5 hand-rolled + EyeIcon. Hex constants for chart colors (C_RED/C_BLUE/C_ORANGE/C_GREEN/C_VIOLET). Sidebar/Header imports fixed to relative paths. Done 2026-04-29. |
| ⬜ | `pages/DesignSystemPage.jsx` | 679 | 0 | 3 | 85 | Component gallery — low priority, can skip |

---

## Tier 3 — Drawers (used by campaign wizard)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ✅ | `drawers/create-campaign-drawer.jsx` | 552 | 1 | 2 | 145 | SectionCard+EmptyState from ui. TrendingUpIcon hand-rolled. Status dot badge inline. IconBtn helper. Done 2026-04-29. |
| ✅ | `drawers/create-ad-group-drawer.jsx` | 1581 | 1 | 2 | 211 | Stepper/Modal/RadioCard/RadioDot from ui. SparklesIcon hand-rolled. renderModalCheckboxRows DRY helper. RoundCheck local 20px. Done 2026-04-29. |
| ✅ | `drawers/inventory-details-drawer.jsx` | 305 | 1 | 1 | 58 | SelectBox local (20px card checkbox). SummaryItem+MetricRow helpers. Viewability color thresholds. Done 2026-04-29. |
| ✅ | `drawers/product-selection-drawer.jsx` | 1256 | 1 | 3 | 190 | RadioCard/RadioDot for mode+submode cards. Checkbox onChange (not onCheckedChange). EmptyState for preview. SectionCard for filter sidebar. SparklesIcon/PackageIcon/AlertCircleIcon/MinusIcon hand-rolled. INC=#22C55E/EXC=#EF4444 intentional. FilterSection+ExcludeBtn helpers. Done 2026-04-29. |
| ⏭️ | `drawers/campaign-settings-drawer.jsx` | 8 | 0 | 0 | 0 | Stub only — no migration needed |

---

## Tier 4 — Campaign wizard steps (leaf nodes, migrate before wizard shells)

### `campaign-wizard/steps/` — used by campaign-wizard.jsx

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ⬜ | `steps/campaign-basics.jsx` | 125 | 1 | 1 | 16 | |
| ⬜ | `steps/budget-step.jsx` | 575 | 1 | 3 | 121 | |
| ⬜ | `steps/schedule-step.jsx` | 113 | 1 | 0 | 27 | |
| ⬜ | `steps/bidding-step.jsx` | 166 | 1 | 0 | 26 | |
| ⬜ | `steps/ad-groups-step.jsx` | 150 | 1 | 1 | 40 | |
| ⬜ | `steps/review-step.jsx` | 156 | 1 | 0 | 53 | |

### `campaign-wizard/ad-group-steps/` — used by ad-group-wizard.jsx

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ⬜ | `ad-group-steps/config-step.jsx` | 185 | 1 | 0 | 35 | |
| ⬜ | `ad-group-steps/targeting-step.jsx` | 514 | 1 | 0 | 77 | |
| ⬜ | `ad-group-steps/product-selection-step.jsx` | 418 | 1 | 1 | 76 | |
| ⬜ | `ad-group-steps/inventory-step.jsx` | 205 | 1 | 0 | 31 | |
| ⬜ | `ad-group-steps/ad-creative-step.jsx` | 225 | 1 | 2 | 34 | |

---

## Tier 5 — Campaign wizard shells (migrate after all steps above are done)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ⬜ | `campaign-wizard/create-campaign-modal.jsx` | 847 | 1 | 3 | 102 | Entry point modal |
| ⬜ | `campaign-wizard/product-ads-wizard.jsx` | 518 | 1 | 4 | 92 | |
| ⬜ | `campaign-wizard/campaign-wizard.jsx` | 1384 | 1 | 4 | 241 | Main wizard shell |
| ⬜ | `campaign-wizard/ad-group-wizard.jsx` | 740 | 1 | 3 | 100 | |
| ⬜ | `campaign-wizard/product-ad-group-wizard.jsx` | 1536 | 1 | 4 | 212 | |
| ⬜ | `campaign-wizard/product-ad-settings-drawer.jsx` | 699 | 1 | 2 | 118 | |
| ⬜ | `campaign-wizard/instore-campaign-wizard.jsx` | 997 | 1 | 8 | 175 | |
| ⬜ | `campaign-wizard/instore-ad-group-wizard.jsx` | 1351 | 1 | 5 | 243 | |
| ⬜ | `campaign-wizard/offsite-ad-group-wizard.jsx` | 4200 | 1 | 12 | 619 | 🔴 Largest file — save for last |

---

## Tier 6 — Design system gallery (lowest priority)

| Status | File | Lines | lucide | shadcn | className | Notes |
|--------|------|-------|--------|--------|-----------|-------|
| ⬜ | `design-system/index.jsx` | — | — | — | — | Gallery root |
| ⬜ | `design-system/buttons.jsx` | — | — | — | — | |
| ⬜ | `design-system/card.jsx` | — | — | — | — | |
| ⬜ | `design-system/table.jsx` | — | — | — | — | |
| ⬜ | `design-system/tables.jsx` | — | — | — | — | |
| ⬜ | `design-system/drawer.jsx` | — | — | — | — | |
| ⬜ | `design-system/drawers.jsx` | — | — | — | — | |
| ⬜ | `design-system/modal.jsx` | — | — | — | — | |
| ⬜ | `design-system/form-elements.jsx` | — | — | — | — | |
| ⬜ | `design-system/navigation.jsx` | — | — | — | — | |
| ⬜ | `design-system/header.jsx` | — | — | — | — | |
| ⬜ | `design-system/status-badge.jsx` | — | — | — | — | |
| ⬜ | `design-system/steppers.jsx` | — | — | — | — | |
| ⬜ | `design-system/empty-state.jsx` | — | — | — | — | |
| ⬜ | `design-system/chart-empty-state.jsx` | — | — | — | — | |
| ⬜ | `design-system/metric-selector-card.jsx` | — | — | — | — | |
| ⬜ | `design-system/interactive-dashboard.jsx` | — | — | — | — | |

---

## shadcn/ui primitives to DELETE (after all consumers migrated)

These are the shadcn wrapper files cloned from the upstream repo. Once every file that `import`s from them has been migrated, delete the whole `components/ui/` folder.

| File | Imported by |
|------|-------------|
| `components/ui/button.jsx` | campaign-wizard, drawers, many |
| `components/ui/badge.jsx` | campaign-table, performance-table |
| `components/ui/card.jsx` | metrics-cards, home-page |
| `components/ui/input.jsx` | wizard steps, drawers |
| `components/ui/select.jsx` | filter-builder, wizard steps |
| `components/ui/checkbox.jsx` | product-selection, targeting |
| `components/ui/switch.jsx` | config-step |
| `components/ui/tabs.jsx` | campaign-wizard, instore-wizard |
| `components/ui/textarea.jsx` | ad-creative-step |
| `components/ui/label.jsx` | form fields across wizard |
| `components/ui/accordion.jsx` | offsite-ad-group-wizard |
| `components/ui/tooltip.jsx` | various |

---

## Migration stats

| | Count |
|---|---|
| ✅ Migrated | 13 |
| ⏭️ Skip (no work needed) | 2 |
| ⬜ Pending | 32 |
| **Total files** | **47** |

**New `src/ui/` additions (2026-04-29):**
- `molecules/EmptyState.jsx` — centred icon circle + message + optional CTA
- `molecules/SectionCard.jsx` — card with optional labeled header bar + body

*Last updated: 2026-04-29*
