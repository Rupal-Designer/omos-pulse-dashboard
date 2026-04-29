# Osmos / OsmosX Retail Media OS — PRD Corpus Summary
> Designed as a context pack for a chain-of-agents skill
> (Product · Design · Business · Tech · PR · Customer Success)
> Source: Notion "Product Req Documents / Funcspec" database, onlinesales-ai workspace.

---

## 0. How to use this document

Each PRD section below is written in a six-lens structure so each agent in the
chain can parse the lens most relevant to it:

- **[Product]** – Problem, solution shape, scope, personas, lifecycle/state machine
- **[Business]** – Objective, KPI, revenue model, M%G impact, GTM
- **[Design]** – UX pattern, surfaces, priority system, interaction rules
- **[Tech]** – Key architecture, data model, APIs, non-functional requirements
- **[PR]** – Positioning line, differentiator, launch narrative
- **[CS]** – Onboarding, retailer governance, failure modes, adoption risks

---

## 1. Platform Vision — the "why" behind every PRD

### 1.1 Osmos — Retail Media OS for retailers

- **Osmos** is a Retail Media Operating System sold to **retailers / Retail
  Media Networks (RMNs)** — marketplaces (Flipkart, BigBasket, FirstCry, Takealot,
  Purplle, Tira, Nykaa, 1mg, Apollo, Truemeds, Zepto, Blinkit, Instamart,
  Wakefern, GPA, PicknPay, FPG, DFI, JK Tyres, Paypal).
- Integration shapes: "Osmos API" (full stack), "User-based" / self-built, or
  third-party (Citrus, Celtra, Pubmatic, DV360, TTD).
- Portals: **Pulse** (retailer / Ad Ops / Media Sales) and **Advertiser Portal**
  (brand / agency ops).
- Core modules: Sponsored Product Ads (SPA/PLA), Sponsored Display Ads
  (SDA/PDA), In-store digital + analog, Offsite / RMN DSP, Ad Packages,
  Billing & Wallets, Sofie AI, Localium (local dealer / hyperlocal),
  BYOT attribution, Hades RBAC.

### 1.2 OsmosX — the brand-side flywheel

- **"OsmosX supports Osmos. Osmos is for retailers. OsmosX is for brands."**
- A single pane of glass for brands/agencies across every RMN:
  media activation + non-media (competition, share of market, pricing, SKU tracking).
- **Why retailers agree to it:** OsmosX publishes retailer packages to brands
  the retailer's own sales team can't reach → lead magnet.
- **FOMO lever:** OsmosX can spotlight retailers with better ROAS / margin / OS
  commercials, pressuring every retailer to show up with best offer.
- **GTM posture:** product-led growth (brand self-signs, no gated demo).
- **Economics:** OsmosX always bills the brand = platform fee + % of ad spend + per-module pricing.
- **Apps inside OsmosX Hub:** Package Marketplace, Agency Marketplace, IFTTT rules engine,
  Creative Builder, Offsite 360, InStore 360, Onsite 360, **SofieX** (agentic layer),
  **Prism** (brand scorecard — SoM, share of keywords, sales share, competitor SKU/price tracking),
  Audience Rental exchange, Osmos Retail Media DSP.

### 1.3 Core structural problems OsmosX solves

1. **Fragmentation** — brands juggle dozens of RMNs with no unified governance.
2. **Trust/Transparency deficit** — inconsistent attribution, reporting, incrementality.
3. **Operational drag** — separate dashboards, billing, creative specs per RMN.
4. **Agency incentive mis-alignment** — hidden rebates bias media mix.
5. **Signal dilution for torso retailers** — mid-tier RMNs lose narrative control.

---

## 2. Canonical PRDs (deep summaries)

### 2.1 Flexible Omni-Channel Ad Packages

**[Product]** Reusable "package templates" (bundles of inventory across SPA/SDA/in-store).
Package states: DRAFT → SCHEDULED → ACTIVE → PAUSED → ARCHIVED → INACTIVE.
Booking states add ON HOLD and DELIVERED. Cloning with "Copy of <name>" + DRAFT state.
Booking-level attribution (last-touch, 1-day view-through, X-day click). ROAS shown only at booking level.
Real-time alerts on creative deadlines (T-7/-3/-1/+1).

**[Business]** Demarcate self-serve vs package inventory; enforce campaign prioritization
(Guaranteed = FCFS; Auction = Network > Package > Price > House); enable inventory fill-rate calendar;
support omni-channel wallet.

**[Design]** Calendar view of sellable inventory at package level; package-level impression cap;
conflict detection UX on overlapping guaranteed bookings; public vs private inventories;
mid-flight edits allowed (end date, targeting, caps — but NOT start date once passed).

**[Tech]** Integrates Pulse and Advertiser portals via API. Omni-channel wallet requires
explicit "is this an omni wallet?" toggle up front.

**[CS]** M0: retailer package creation + SDA line items + creative review.
M1: Ad Ops booking flow. M2: SDA delivery + analytics. M3: PLA + Guaranteed in packages.
M4: Sofie suggestions to sales. M5: self-serve proposal builder.

---

### 2.2 Retailer Onboarding & Infra

**[Product]** Guided "Offsite-Ready" onboarding: Choose operating model → Connect ad platforms
(Meta/Google/DV360/Snapchat/TikTok via OAuth) → Identity mapping → Governance → Pulse measurement validation.

**[Business]** Net Media Spend vs Retailer Markup (e.g., 15%) vs OSMOS platform fee.
Billing dashboard per brand per channel.

**[Design]** Retailer "Command Center" flyout. **Connector Health Grid** with green/amber/red status
+ one-click "Fix All" re-auth. **Measurement Pulse Validation**: last 10 Purchase/AddToCart events
+ Identity Match Score (% of events with hashed PII).

**[Tech]** DV360 Partner→Advertiser isolation; Snapchat Org↔AdAccount mapping.
Acceptance: Match Rate >70%, auto-pause all campaigns within 60s of token revocation,
catalog sync flags >20% price delta as Data Integrity error.

**[CS]** Approval Gatekeeper toggle (manual creative review per brand). Creative Review Sandbox
previews Snap Story / Meta Feed with retailer handle as sponsor.
Platform Discrepancy Report flags >1% variance vs DSP-reported spend.

---

### 2.3 Campaign Debugging Agentic Capabilities (PLA + Display)

**[Product]** Replace static hygiene-check "Campaign Troubleshooter" with an **Agentic AI Campaign Debugger**.
Baseline pain: 143 tickets in 60 days (65 "not spending", 53 "keyword not performing", 25 "not responding").
Capability tiers: hygiene checks → pacing → keyword health → keyword-category mapping →
high-volume competitor keywords → bid optimization → product availability → price competitiveness →
share-of-voice → attributed-sales drop-off → cannibalization → system/data freshness checks →
display inventory fill-rate, frequency cap, audience size, placement performance.

**[Business]** Targets: ticket reduction, advertiser empowerment, spend utilization, AI differentiation.
Case study: "Takealot reduced advertiser support tickets by 45% with AI Campaign Debugger."

**[Design]** Chat-style AI in modal/side panel on same screen as campaign.
Accessed via ellipsis → "Debug using AI / Ask AI". Dynamic + static prompts seeded by current performance.
Output modalities: tables, line/bar charts, buttons/links, bullet paragraphs.

**[Tech]** Phase 0: chat skeleton. Phase 1: PLA debugging unimodal. Phase 2: extend to Display.
Phase 3: multi-modal + deep-link CTAs. Phase 4: one-click apply. Phase 5: proactive background agent.
**Anonymize competitor names** (Johnson's must never see that competing bids are from Mamaearth).

**[CS]** Keep old Troubleshooter alongside initially. Success metrics: debugger invocation count,
sessions/campaign, ticket reduction, repeat-usage rate, suggestion acceptance rate.

---

### 2.4 SKU Selection Optimizer

**[Product]** Cap loaded products per campaign (default 1,000) with **breadcrumb diversity**
and **exploration buffer** to avoid feedback-loop lock-in.

**[Business]** +10% campaign CTR, +15% campaign ROAS, ad-server CPU spike reduced from >80% for 30s to <40%.

**[Design]** Composite Eligibility Score is an **entry gate, not an auction signal** —
once a product is in the pool it competes on Bid × pCTR alone.
Two eviction lists: load_priority_rank + eviction_rank (at 75%/50%/25%/10% budget milestones).

**[Tech]** Sub-scores: Popularity (7/14/30d with 50/30/20 recency weighting), Sales (conversions + GMV),
Ad Program Score, Campaign History Score (min 500 impressions, 90d staleness cutoff, 5-10% exploration slots).

---

### 2.5 Audience Targeting in PLA Campaigns

**[Product]** Single-cohort-per-campaign model: New / Existing / Dormant.
Smart mode = ALL_SHOPPERS (default). Each shopper maps to exactly one cohort at bid time.
"Forces intentionality, keeps attribution clean, mirrors Amazon Sponsored Products."

**[Business]** Drive higher advertiser ROAS → more spend → improved retailer M%G.

**[Design]** "Audience Settings" block under campaign settings. Radio with tooltips +
live Estimated Reach number. Mandatory, single-select.

**[Tech]** Cohort match against **cached purchase recency index** keyed by (shopper_id, brand_id) →
last_purchase_date, refreshed daily (no live DB call at bid time).

---

### 2.6 Sofie Suggestions v2 — "From Noise to Action"

**[Product]** Current state: 47 suggestions per advertiser, no prioritization, 33% panel-collapse rate,
repeat nudges to 3-product catalog advertisers. Redesign: smart prioritization, contextual inline delivery,
impact transparency, actionable task management.
Task lifecycle: New → Viewed → Accepted/Rejected/Snoozed/Muted → Completed/Expired.

**[Business]** Baselines: <15% view rate, <5% accept rate, 64% immediate panel dismissal.
Targets: 50%+ view, 25%+ accept, 5+ applied/advertiser/month, +15% ROAS for acting advertisers.

**[Design]** Kill sidebar-only model. Deliver via:
(a) Global red alert bar (wallet/pause events)
(b) Campaign-list inline badges
(c) Inline Campaign Settings
(d) Home Dashboard widget (top-3)
(e) Notification Center
Priority system: Critical (red) / Urgent (orange) / Growth (blue) / Optimization (gray).
Every card shows projected impact, time sensitivity, one-click action. Target flow: 3 steps (not 7).

**[Tech]** Rejection reasons feed the relevance model. Auto-action rules engine (auto-budget top-up,
auto-wallet top-up, auto-add keywords) with max-increase %, per-type opt-in, global kill switch.

**[PR]** Rebalance from "spend more" (extractive) toward **"spend smarter"** —
pause zero-conversion keywords, reallocate budgets, detect creative fatigue,
switch to cheaper inventory slots.

---

### 2.7 BYOT — Bring Your Own Traffic

**[Product]** Link-based commerce attribution: link click → tagged PDP view → halo view → ATC → order → revenue.
Campaigns = "commercial intent containers"; one campaign → many tracker links.
Bulk tracker generation via CSV.

**[Business]** Monetization: prepaid brand wallet, hourly click deductions + daily active-link deductions.
Retailer billing: post-paid/monthly; brand billing: prepaid wallet.

**[Design]** Funnel shown explicitly: Link Clicks → Tagged PDP Views → Halo Views → ATC → Product Orders → Revenue.
Low-balance alerts, 24-hour grace on wallet exhaustion.

**[Tech]** 302 redirects, HTTPS-only, <100ms redirect latency. Session-based attribution v1.
MMP integration + SDK + API paths.

---

### 2.8 Ad Packages — Custom Line Items

**[Product]** Introduce **Custom Line-Items**: retailer-defined, Osmos-tracked, externally-executed
commitments (sponsored emails, push notifications, in-app, video/editorial/live shopping, influencer,
in-store analog/digital).

**[Business]** Enable full-funnel package sales; remove manual workarounds. Target: FPG, DFI.

**[Design]** Under Packages → **Custom Channels** admin area (Google-Forms-style builder).
Admin picks activation type, then composes asset-collection form from elements: H1/H2/H3, text,
text-box, textarea, single/multi-select, file/image/video upload, Geo Targeting, Product Selection,
Audience Selection, URL, CTA.

**[Tech]** At booking time: Ad Ops fills assets, uploads metric CSV, uploads proof of delivery.

---

### 2.9 Budgeting & Pacing for Display + Product Ads

**[Product]** Unified budgeting hierarchy: Campaign Group → Campaign.
Three budget types: **Average Daily Budget (ADB)** with optional Max Cap,
**Lifetime Budget** (fixed flight), **Metric-Based Budget** (internal/packages only).

**[Design]** ADB intraday modes: Standard / Accelerated / Even.
Lifetime flight pacing: Standard / Frontload / Backload / ASAP.
**Spend Flexibility** is implicit: Conservative (1.2× ADB) default, Standard (2.0× ADB) opt-in.

**[Tech]** All pacing calculations MUST use remaining_budget and remaining_days.
Daily allowance recomputed continuously. Full audit log: field, old, new, actor, timestamp.

---

### 2.10 SMS — Survey Ads (Survey Management System)

**[Product]** Multi-step in-brand-page survey capturing zero-party data.
Inventory types: SURVEY_INLINE, SURVEY_FULLSCREEN, SURVEY_CTA.
Question types: multiple choice (2-N options) and open text.

**[Business]** New revenue bucket + zero-party data for brands.

**[Design]** Native card with brand logo/colors, Q1-of-N progress bar.
On completion: user never sees same survey again.

**[Tech]** Two APIs: fetch entire survey (cached, low latency) + submit all answers.
BI events: surveyAdShown, surveyStart, surveyStep, surveyDropOff, surveyComplete.

---

### 2.11 Billing Management — Transactions API v2

**[Product]** v2 introduces unified `transaction_type` taxonomy + `mode`, `os_payment_id`, `user` fields.
v1 endpoints remain unchanged; migration is opt-in.

**[Business]** Unblocks automated invoicing for FirstCry, BigBasket; incentive workflows for Purplle, TAL.

---

## 3. Personas Model

| Persona | Portal | Primary Concern |
|---|---|---|
| Retailer / RMN Admin | Pulse | Inventory, yield, governance |
| Ad Ops Manager | Pulse | Campaign health, yield rules, troubleshooting |
| Media Sales | Pulse | Package creation, advertiser relationships |
| Advertiser (brand) | Advertiser Portal | Campaign ROI, spend control, self-service |
| Agency | OsmosX / Advertiser Portal | Multi-RMN media mix, reporting |
| Creative Reviewer | Pulse | Brand safety, creative approval |

---

## 4. Key Business Metrics (M%G ceiling model)

- **M%G** = Media % of GMV — the core revenue metric for retailers. Goal: push past the ceiling.
- **ROAS** — advertiser-facing north star. Higher ROAS → more spend → higher M%G.
- **Fill Rate** — unsold inventory = lost revenue. Yield optimization closes this gap.
- **Wallet Health** — budget exhaustion kills campaigns. Low-balance alerts + auto-top-up protect M%G.
- **Suggestion Acceptance Rate** — Sofie's effectiveness proxy. <5% today, target >25%.

---

## 5. Cross-Cutting Design Principles (from PRD patterns)

1. **Intentionality over automation** — force explicit choices for high-stakes decisions
   (single-cohort audience model, omni-wallet toggle). Don't auto-select.
2. **Impact transparency** — every recommendation must show projected outcome (+X impressions, ₹Y saved).
3. **Non-extractive AI** — Sofie should say "spend smarter" not "spend more."
   AI suggestions that feel like upsells destroy trust.
4. **Audit trail always** — CPM rules, budget changes, targeting changes must log actor + timestamp.
5. **Graceful degradation** — token revocation auto-pauses within 60s; wallet exhaustion has 24h grace;
   cold-start has sensible fallback (ALL_SHOPPERS).
6. **Retailer governs, advertiser self-serves** — retailer sets guard rails (caps, approval toggles,
   domain whitelists); advertiser operates within them.
7. **Attribution honesty** — ROAS shown only at correct attribution scope (booking-level, not line-item);
   anonymize competitor data; no cross-brand data leakage.
