# PRD: Offsite Ads — Unified Campaign Creation Wizard

**Product Area:** Campaigns → Offsite Ads  
**Status:** Draft — Ready for UX Ideation  
**Branch:** offsite-flow  
**Last Updated:** 2026-05-06  
**Author:** Rishi Joshi (design-team@onlinesales.ai)  
**Informed by:** Live UX audit of Figma prototype — Campaigns / Ad Types / New Offsite page

---

## 1. Context & Problem Statement

### What exists today

The current Offsite Ads campaign creation flow is a fragmented 3-container experience:

1. **Modal 1** — Campaign name + channel selection
2. **Modal 2** — Brand profile + campaign objective  
3. **Full-page wizard** — 4 locked linear steps: Product Selection → Targeting → Ads Upload → Config

This creates a jarring UX: two modal dialogs before the user enters the main wizard, a campaign name asked before any context is set, and a step order that inverts the logical decision-making sequence ad ops managers actually use.

### What channels are supported

| Channel | Supported Ad Types | Design Status |
|---|---|---|
| Meta | Facebook, Instagram, Messenger, Audience Network | ✅ Done |
| Google | Search, Display, YouTube, Shopping, Discover | 🔵 Demo |
| TikTok | In-Feed Ads, Spark Ads, Pangle Network | 🔵 Demo |
| Snapchat | Snap Ads, Story Ads, Collection Ads | 🔵 Demo |
| YouTube | Skippable, Non-skippable, Bumper Ads | 🔵 Demo |
| DV-360 | Display & Video 360, Programmatic Ads | 🔵 Demo |

### Current UX Audit Score: C+ (62%)

The live UX audit (May 2026) identified the following critical issues:

| Issue | Severity |
|---|---|
| Campaign name asked before channel/objective context | High |
| 2 modals → full-page wizard = jarring context switch | High |
| Product Selection before Targeting (backwards logic) | High |
| Stepper is fully locked — no non-linear navigation | High |
| Radio buttons = single channel only, no multi-channel | Medium |
| Bulk Upload vs Add Products — no distinction explained | Medium |
| Campaign Summary sidebar empty until wizard is complete | Medium |
| Status badges use color only (accessibility gap) | Medium |

---

## 2. Goals

### Primary Goal
Reduce advertiser time-to-launch from the current 7-step, 3-container flow to a **single-transition, 6-step non-linear wizard** that matches the mental model of how ad ops managers actually plan campaigns.

### Secondary Goals
- Support multi-channel campaign creation (select multiple channels in one session)
- Make the wizard non-linear so users can jump between completed steps
- Give the advertiser live feedback through a Campaign Summary that fills progressively
- Reduce re-work by asking for context (channel, objective) before commitment (name)

### Success Metrics
- **Time-to-first-launch** < 5 minutes for a first-time user
- **Wizard completion rate** > 70% (from step 1 → submission)
- **Draft save rate** increases (implies users trust the flow can be resumed)
- **Support ticket volume** for "how do I create a campaign" decreases by 30%

---

## 3. User Personas

### Head Advertisers (large retailers, brand teams)
- Run campaigns across 3–5 channels simultaneously
- Have dedicated ad ops staff who use the platform daily
- Need bulk product upload and precise audience targeting
- Expect multi-channel creation to be a single workflow, not 5 separate ones
- Pain: currently forced to create one campaign per channel, manually replicating settings

### Torso Advertisers (mid-market, category managers)
- Run 1–2 channels (Meta + Google most common)
- Platform is one of several tools they use — context switching is costly
- Need smart defaults so they don't have to make every micro-decision
- Pain: campaign name required before they've made any real decisions

### Tail Advertisers (small brands, first-time users)
- May have never run offsite ads before
- Need guidance at each step — what is "Audience Network"?
- Need to see the full wizard structure upfront so they know what's coming
- Pain: locked stepper means they can't preview step 4 while filling step 2

---

## 4. Proposed Information Architecture

### Entry Point
`Campaigns > Offsite Ads Dashboard` → `+ Create Campaign` button

### New Wizard Structure

The wizard replaces both pre-wizard modals. Single full-page transition on `+ Create Campaign` click.

```
Step 1: Channel & Objective
  └── Select one or more channels (checkbox cards, not radio)
  └── Select campaign objective per channel (Awareness / Sales / Traffic / Reach)
  └── Live "Estimated Reach" chip updates per channel selection

Step 2: Audience & Targeting
  └── Target audience definition (demographics, interest, location, custom audiences)
  └── Channel-specific targeting options appear inline (e.g. Meta Custom Audiences,
      Google Audience Segments, TikTok Interest & Behavior)
  └── "Audience Overlap" indicator if multiple channels selected

Step 3: Product Selection
  └── Now contextualised by the audience defined in Step 2
  └── "How to choose products" dropdown: Browse Catalog / Upload CSV / Use Saved Group
  └── Product table: Image, Name, Brand, Category, Availability, Price, Sale Price
  └── Recently used products surfaced first
  └── Search + filter by category available by default

Step 4: Creative / Ads Upload
  └── Channel-specific creative specs shown inline
  └── Upload per channel if multi-channel (tabbed per channel, or smart format detection)
  └── Preview per placement (Feed, Story, Banner, etc.)

Step 5: Budget & Schedule
  └── Daily or lifetime budget toggle
  └── Start date / end date
  └── Bid strategy (channel-specific options)
  └── Pacing options

Step 6: Review & Launch
  └── Campaign name entry — auto-suggested as "{Channel} · {Objective} · {Date}"
  └── Full summary of all steps (editable via "Edit" links per section)
  └── Channel-specific warnings (missing creative format, low budget, etc.)
  └── "Save as Draft" secondary CTA
  └── "Launch Campaign" primary CTA
```

### Stepper Behaviour
- All steps visible from the start (locked but visible, like a preview)
- Steps become clickable once completed
- Clicking a completed step number jumps back to it
- Incomplete steps show a "Not started" chip in Campaign Summary
- Completed steps show a green checkmark in the stepper

### Campaign Summary Sidebar (right panel)
- Always visible on right side of wizard
- Shows progressive state: empty chip → filled chip per step
- Each chip is clickable (deep-links to that step)
- Collapses to an icon strip on smaller viewports

---

## 5. Multi-Channel Support

The current design uses radio buttons (single-select). The new design uses **checkbox cards** for channel selection, enabling multi-channel campaigns.

### Multi-channel wizard behaviour
- Steps 2–4 adapt to show channel-specific sections in **tabs** or **inline accordions** per channel
- Settings that are identical across channels (budget, schedule, audience basics) are shared
- Settings that diverge (creative specs, bid strategies, pixel/tracking) are shown per-channel
- On Review (Step 6), show a per-channel summary table with any channel that has gaps flagged in amber

### Example: Meta + TikTok campaign
- Step 2 Targeting: shared Age/Gender/Location section + Meta Custom Audiences tab + TikTok Interest tab
- Step 4 Creative: Meta section (1080×1080 feed + 1080×1920 story) + TikTok section (9:16 video)
- Budget: shared daily budget with optional per-channel allocation

---

## 6. Channel-Specific Step Variations

Each channel introduces unique fields that appear inline at the relevant step:

| Channel | Step 2 Addition | Step 4 Addition | Step 5 Addition |
|---|---|---|---|
| Meta | Custom Audiences, Pixel events | Carousel / Single Image / Video | Campaign Budget Optimization |
| Google | Audience Segments, Keywords | Responsive Search Ad / Display | Smart Bidding (Target ROAS, CPA) |
| TikTok | Interest & Behavior, Lookalike | TopView / In-Feed / Spark | oCPC / CPM |
| Snapchat | Snap Audience Match | Story / Collection / AR Lens | Auto-bid / Manual |
| YouTube | Affinity, In-Market | TrueView / Bumper / Non-skip | CPV / Target CPM |
| DV-360 | Programmatic Segments | Display / Video / Native | CPM / vCPM / dCPM |

---

## 7. Dashboard Improvements (Offsite Home)

The dashboard is the entry and return point for all campaign management.

### Current state
- KPI chips (Ad Spend, Ad Impressions, Ad Clicks, Ad Revenue, ROAS ×2)
- Performance Trend chart (line, D/W/M toggle)
- Campaigns table (Status, Campaign Name, Channel, Objective, Daily Budget, Ad Spend, Ad Impressions)
- "+ Create Campaign" button
- "Add a Filter" button

### Proposed additions
- **Channel filter chips** above the table: All | Meta | Google | TikTok | Snapchat | YouTube | DV-360 — one-click filter
- **Status badge accessibility fix**: all status badges show icon + text label (not color-only)
- **"Last synced X min ago"** in table footer
- **Bulk actions bar**: when rows are selected → Pause / Resume / Duplicate / Archive
- **Performance Trend** chart: add channel toggle (show one or all channels on the trend line)

---

## 8. Accessibility Requirements

All screens must meet WCAG 2.1 AA:

- Status indicators must use **text label + color** (not color alone): `● Active`, `⏸ Paused`, `⚠ Rejected`
- All form fields must have associated `<label>` elements (no placeholder-only labels)
- Stepper steps must be keyboard navigable with `Tab` and `Enter`
- Channel cards must support keyboard selection (Space to toggle)
- Modal-to-wizard transition must move focus to the wizard header on mount
- Product table rows must have `aria-label="Select {productName}"` on checkboxes
- Campaign Summary sidebar must be keyboard accessible with proper tab order

---

## 9. Empty States

| Location | Empty State Copy | CTA |
|---|---|---|
| Product Selection (no products added) | "No products selected yet. Browse your catalog or upload a list." | Browse Catalog / Upload CSV |
| Product table (after filter returns 0) | "No products match your filters. Try adjusting the category or availability." | Clear Filters |
| Campaigns table (no campaigns) | "No campaigns yet. Create your first offsite campaign to start driving traffic." | + Create Campaign |
| Campaign Summary (step not started) | Shows "Not configured" chip per step | — |

---

## 10. Out of Scope (for this sprint)

- Automated creative generation (AI-assisted ad copy / image gen)
- Cross-campaign budget allocation dashboard
- Campaign cloning / duplication from existing campaign
- Real-time preview of live ad placement
- Attribution window configuration (post-click vs post-view)

---

## 11. Open Questions

1. **Multi-channel campaigns: shared budget or per-channel budget?** The current prototype has a single daily budget — should head advertisers be able to allocate differently per channel?
2. **DV-360 branching**: DV-360 has significantly different settings (line items, insertion orders). Should it share the same wizard or get a dedicated flow?
3. **YouTube vs Google**: YouTube appears as a separate channel in the prototype but is also listed as a Google ad type. Is this intentional? Needs alignment with product.
4. **Saved audiences**: Will targeting allow saving and reusing audience segments across campaigns?
5. **Product groups**: Can products be saved as groups ("Holiday SKUs") for reuse across campaigns?

---

## 12. References

- Live prototype: https://www.figma.com/proto/5oYahjtT5SC0d5G6gVHNl0/Campaigns---Ad-Types?node-id=4069-48934&page-id=4069%3A48934
- Figma design file: https://www.figma.com/design/5oYahjtT5SC0d5G6gVHNl0/Campaigns---Ad-Types
- UX audit (May 2026): see discussion thread — scored C+ (62%) overall
- Existing PRD corpus: `docs/prd/osmos-prd-corpus.md`
- Advertiser management PRD: `docs/prd/advertiser-management-pulse.md`
