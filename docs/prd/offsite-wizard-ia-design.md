# Offsite Campaign Wizard — IA + Design Spec
_ux-ideator output | Branch: offsite-flow | 2026-05-06_

## Pipeline Summary

| Phase | Output | Status |
|---|---|---|
| 1. PRD Ingestion | 5 stories, 2 task flows, 8 candidate screens, Meera reframe ✓ | ✅ |
| 2. IA Map | 8 screens, 3 flows, Arjun research audit ✓ | ✅ |
| 3. Lo-fi Concepts | Concept A (Noor) + Concept B (Dev) | ✅ |
| 4. Deliberation | Merge: Noor IA + Dev table density. No Raj stalemate. | ✅ |
| 5. design-critic | Rigor Matrix: 16/20 ✅ | ✅ |
| 5.5. Zara delight | 🚀 Launch button animation + row slide-in + typewriter name | ✅ |
| 6. Final UI | Screen Spec JSON below | ✅ |

---

## Agreed Design: Final Spec

### Dashboard

- 10-column table: Status (badge+text), Campaign Name, Channel (TypeBadge), Objective, Daily Budget, Ad Spend, ROAS, CTR, Impressions, row actions
- Status badges: icon + text label (● Active, ⏸ Paused, ■ Draft, ⚠ Rejected, ✓ Delivered, 🔍 Under Review)
- Default sort: descending by Last Updated
- Default page size: 50
- Channel filter chips above toolbar: All | Meta | Google | TikTok | Snapchat | YouTube | DV-360
- Bulk action bar (appears on row selection): Pause / Resume / Duplicate / Archive
- Export CSV in toolbar
- Footer: "Last synced X min ago"
- KPI chips: scrollable row of 6 (Ad Spend, Ad Impression, Ad Clicks, Ad Revenue, ROAS ×2)
- Performance Trend: per-channel toggle lines + D/W/M granularity

### Wizard Step 1 — Channel & Objective

- No pre-wizard modals — single full-page transition on "+ Create Campaign"
- Brand Profile dropdown at top
- Channel cards: single-column vertical stack, checkbox selection (not radio)
- "Most popular" badge on Meta (per Arjun's research flag)
- Micro-illustrations per channel (48×48 ad format preview)
- Inline objective row appears below channel card immediately on checkbox tick
- Reach estimate: StatCard top-right, updates live per channel selection
- Campaign Summary sidebar: single growing card (empty on load, adds row per completed step)
- Footer: Save Draft (ghost left) + Next → (primary right)

### Wizard Step 2 — Audience & Targeting

- Shared demographic section: Age, Gender, Location
- Channel-specific sections as inline accordions (one per selected channel)
- "Audience Overlap" callout when 2+ channels selected
- Cap: max 3 channel-specific sections visible at once, "Show more" expand for 4+
- Campaign Summary sidebar grows: Step 1 chip now shows "Meta + Google | Sales + Awareness"

### Wizard Step 3 — Product Selection

- "How to choose products?" dropdown: Browse Catalog / Upload CSV / Use Saved Group
- Default: Browse Catalog
- SearchBar always visible at top of product table
- Product table: Image, Name, Brand, Category, Availability, Price, Sale Price
- Recently used products surfaced first
- Filter by: Category, Availability, Price range
- Empty state: "No products selected yet. Browse your catalog or upload a list." + CTAs

### Wizard Step 4 — Creative / Ads Upload

- Channel tabs (one per selected channel) or single channel view for single-channel campaigns
- Per-channel creative specs shown inline (static spec table: dimensions, file type, max size, length)
- Upload dropzone per format (Feed image, Story image, Video)
- Preview per placement
- InfoBanner if a required format is missing (amber, not blocking — review step catches gaps)

### Wizard Step 5 — Budget & Schedule

- Budget type toggle: Daily / Lifetime
- Daily budget input with currency
- Start date / End date pickers (paired inline)
- Bid strategy: channel-specific dropdown (Meta: CBO / Manual; Google: Target ROAS / CPA; TikTok: oCPC / CPM; etc.)
- Pacing: channel-specific where applicable
- Summary of total estimated spend at bottom

### Wizard Step 6 — Review & Launch

- Campaign name input: auto-suggested as "{Channel} · {Objective} · {Date}", typewriter fill animation (150ms)
- Review sections (one per completed step) with "Edit →" deep-link to that step
- Per-channel validation warnings as InfoBanner type="warning" (non-blocking)
- Footer: Save as Draft (ghost left) + 🚀 Launch Campaign (primary right)
- Launch button animation: 600ms rocket rise → "Launching..." → green checkmark 1200ms → redirect to dashboard
- Dashboard: new campaign row slides in from top with 200ms highlight flash

---

## Open Questions for Product Alignment (before Phase 6 implementation)

1. **YouTube vs Google account:** Are these the same Google Ads account? If yes, YouTube should be a sub-objective under Google, not a separate channel card.
2. **Channel creative spec API:** Is there an API endpoint for per-channel creative specs, or should Step 4 use a hardcoded static spec table per channel?
3. **Multi-channel budget:** Shared daily budget or per-channel allocation? PRD is ambiguous.
4. **DV-360 architecture:** DV-360 uses line items and insertion orders. Does it share the wizard structure or require a dedicated flow?
5. **Saved audiences:** Should Step 2 allow saving audience segments for reuse?

---

## Implementation Order (Recommended)

### Pass 1 (~3 weeks) — Meta single-channel complete flow
- Dashboard improvements (table columns, status badges, bulk actions, channel chips, footer)
- Wizard Step 1 (Meta only, no multi-channel)
- Wizard Step 2 (Meta targeting: demographics + Custom Audiences)
- Wizard Step 3 (Product picker drawer)
- Wizard Step 4 (Meta creative: Feed image + Story + Video)
- Wizard Step 5 (Budget + schedule)
- Wizard Step 6 (Review + launch animation)

### Pass 2 (~6 weeks) — All channels + multi-channel
- Add Google, TikTok, Snapchat, YouTube, DV-360 to Step 1
- Multi-channel inline accordions in Steps 2–4
- Channel-specific bid strategies in Step 5
- Per-channel warnings in Step 6

---

## Component Map

| Zone | Component | Props |
|---|---|---|
| Status badge | `Badge` | `status` + explicit text label alongside dot |
| Channel filter chips | `TypeBadge` | `type=channel`, `colorMap` per channel |
| KPI chips | `KPIChip` | `label`, `value`, `trend` |
| Dashboard table | raw `<table>` | 10 cols |
| Bulk action bar | `Toolbar` (contextual) | `left=selection count`, `right=Pause/Resume/Duplicate/Archive` |
| Channel cards | `Checkbox` + custom card wrapper | `checked`, `onChange` |
| Objective selector | `RadioCard.Item` group | inline below channel card |
| Reach estimate | `StatCard` | `label="Estimated Reach"`, `value` (live) |
| Campaign Summary | custom sidebar using `StatCard` rows | grows per completed step |
| Product table | raw `<table>` | Image/Name/Brand/Category/Availability/Price/SalePrice |
| Product drawer | `Drawer` | `open`, `onClose`, `title="Browse Catalog"`, `width=640` |
| Creative upload | `UploadDropzone` | `onUpload`, `accept`, `maxSize` per channel spec |
| Budget type | `Toolbar` toggle (Daily/Lifetime) | controlled state |
| InfoBanner | `InfoBanner` | `type=warning`, `message` per validation gap |
| Launch button | `Button` variant=primary + CSS animation | `onClick` triggers animation then redirect |
| Toast | `useToast()` | "Campaign launched successfully" |
