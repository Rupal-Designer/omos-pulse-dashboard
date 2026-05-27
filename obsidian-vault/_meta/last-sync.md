---
type: meta
last-updated: 2026-05-14T00:00:00Z
tags: [meta, sync]
---

# Last Sync

**ISO timestamp:** 2026-05-14T00:00:00Z

**Triggered by:** obsidian-knowledge-graph skill (incremental sync — phases 5–7b)

**Stats:**
- Components: 8 atoms, 16 molecules (NavShell fully documented), 1 pattern
- Pages: 57 wired nav IDs + 6 sub-pages, 7 unwired
- Skills: **17 documented (NEW: anuj, ui-consistency-enforcer)**
- Personas: 7 notes (unchanged)
- Figma frames: 8 mapped (unchanged)
- Token violations: ~40 files (phases 5–7b added new violations — run `/token-enforcer`)

**Changes this sync:**

### New pages registered (phases 5–7b)
- [[Pages/InStoreDashboardPage]] — `in-store-digital` — DOOH dashboard + 3-step InStoreBookingDrawer
- [[Pages/BYOTDashboardPage]] — `byot` — Campaigns + Trackers dual-tab
- [[Pages/BYOTCampaignDetailPage]] — BYOT drill-down
- [[Pages/PackagesDashboardPage]] — `packages` — packages catalog
- [[Pages/PackagesAnalyticsPage]] — packages analytics
- [[Pages/PackagesBooking1Page]] — PRE_AUCTION bookings
- [[Pages/PackagesBooking2Page]] — Flexi bookings + upload progress bar
- [[Pages/OffsiteDashboardPage]] — `offsite-ads` — multi-channel wizard entry
- [[Pages/DisplayAdsDashboardPage]] — `display-ads`
- [[Pages/ProductAdsDashboardPage]] — `product-ads` + Sofie AI panel
- [[Pages/CPCControlsPage]] — CPC floor/ceiling controls
- [[Pages/CPMControlsPage]] — CPM floor/ceiling controls

### New skills registered
- [[Skills/anuj]] — power user persona (formerly "Dev" in ux-ideator)
- [[Skills/ui-consistency-enforcer]] — cross-page layout drift enforcer

### Updated notes
- [[Components/molecules/NavShell]] — stub → full documentation (props, icon rule, usage map)
- [[Navigation/structure]] — added Product Ads, Display Ads, Offsite Ads, In-Store, BYOT, Packages sections
- [[Pages/index]] — count updated to 57 nav IDs + 6 sub-pages
- [[Skills/index]] — count updated to 17; anuj + ui-consistency-enforcer added
- [[Tokens/audit]] — rebuilt for phases 5–7b (~40 violations)
- [[index]] — master entry updated
