# Rigor Matrix: Smart Budget Recommender
**Feature:** Smart Budget Recommender — inline budget suggestion card in the campaign setup flow
**Evaluated by:** Claude Sonnet 4.6 (without design-critic skill)
**Date:** 2026-04-24

---

## Executive Summary

The Smart Budget Recommender is a genuinely valuable feature idea with strong product-market fit for a retail media platform. However, the full vision as described — historical ML scoring, seasonal trend signals, inventory-aware recommendations, and a multi-tier projection graph — is substantially more complex to build correctly than it appears. The good news: a stripped-down version that delivers 70% of the value at 15% of the engineering risk is well within reach and should be the v1 target.

**Verdict:** Build — but scope down hard for v1. Cut the inventory integration and seasonal modeling. Ship a budget range card with a simple projection line. Revisit the richer signals in v2 once you have signal-to-noise data on adoption.

---

## Lens 1: Technical Feasibility

### What the Feature Actually Requires

The proposed feature decomposes into three distinct backend systems, each with its own complexity profile:

**1. Historical Campaign Similarity Engine**
- Requires defining "similar campaigns" — by category, audience overlap, flight duration, retailer vertical, or some weighted combination
- Needs a corpus of completed campaigns with performance outcomes (impressions, CTR, spend pacing) to train or query against
- Cold-start problem is real: new advertisers or new categories have no comparable history
- Data quality risk: if historical campaigns were paused, budget-capped, or externally influenced, their performance data is biased

**2. Seasonal Trend Model**
- Category-level seasonality (Fragrance spikes around Diwali/Valentine's, Hair Care stable year-round) requires at minimum 12 months of impression data per category
- Inference: the codebase shows category-level breakdowns in `DemandSupplyPage.jsx` (Body Care, Skin Care, Hair Care, Fragrance, etc.) which means category taxonomy is already established — a positive signal
- However, "seasonal trends" computed server-side and surfaced in real-time during a form flow requires an API call on the critical path of campaign creation — adding latency to a user action that should feel instant

**3. Retailer Inventory Level Integration**
- This is the highest-risk dependency. Inventory levels require a live or near-live data feed from the retailer's catalog/ERP system
- Looking at the codebase: `ProductCatalogPage.jsx`, `CatalogStatusPage.jsx`, and `AdvertiserOnboardingCatalogPage.jsx` exist, suggesting product feeds are already ingested — but ad-serving inventory availability (how many impression slots exist for a given SKU or category) is a different concept from product catalog completeness
- Inventory-aware budget suggestions require the platform to model: available ad slots × estimated fill rate × competitive pressure — this is effectively a first-price auction simulation
- Assessment: Do not build for v1. This is 6-8 weeks of backend work for a signal that may add marginal improvement over the historical similarity baseline

### Data Infrastructure Readiness

Based on codebase evidence:
- Budget tracking exists: `computedDailyBudget` column appears in `DemandSupplyPage.jsx` gap analysis table — the platform already computes daily budget figures per category
- Impression metrics exist: `ProductAdsAnalyticsPage.jsx` shows Ad Impression, Ad Clicks, CTR, CPC, and Ad Revenue KPIs
- The recharts library is already in use for line and donut charts — the projection graph is feasible to render with existing dependencies
- No existing budget recommendation or prediction endpoint was found in the component code

### API Latency Risk

The inline card renders "after they choose their target audience and flight dates" — meaning the recommendation fires mid-form-flow. If the recommendation API takes >800ms, the user stalls. Mitigation options:
- Pre-fetch budget ranges when flight dates are selected (optimistic loading)
- Cache recommendations by category × flight duration bucket (e.g., 7-day, 14-day, 30-day) rather than computing per-request
- Show skeleton state immediately; fill in the specific numbers asynchronously

**Feasibility Rating: Medium** — achievable for a simplified version; full three-signal model is high risk for v1.

---

## Lens 2: UX Quality

### What Works Well

The inline card placement is correct. Showing the recommendation at the moment of budget decision — after audience and dates are set but before the user commits to a number — respects the natural mental model of "I know what I want, now tell me what it costs." This follows established patterns from Google Ads's budget guidance and Meta's Advantage Campaign Budget.

The projected impressions graph at different budget tiers is the right visualization choice. A user asking "what do I get for $500/day?" wants a curve, not a table. The recharts line chart already used in `ProductAdsAnalyticsPage.jsx` (with `ResponsiveContainer`, `LineChart`, `Tooltip`) provides the component foundation.

### What Could Fail Badly

**1. Anchoring bias risk.** If the recommendation is $500/day and the advertiser was going to spend $200/day, you may increase their spend (good for revenue). But if they had budget for $1,000/day and your anchor is $500, you leave money on the table. The card framing matters enormously: present it as a "suggested starting point" with an explicit range, not as "the right answer."

**2. Confidence opacity.** A recommendation based on 3 similar campaigns is very different from one based on 300. If you don't surface confidence signals (sample size, how closely the comparable campaigns match), power users will distrust the feature and dismiss it as marketing fluff.

**3. Flow interruption.** An inline card that requires the user to interpret a graph, weigh three budget tiers, and then make a decision adds cognitive load to an already multi-step form. If the card isn't dismissible, it becomes an obstacle. If it's too easy to dismiss, it gets ignored.

**4. Misalignment between recommendation and actual results.** If an advertiser follows the recommendation and gets materially different results than projected, the trust damage compounds — they'll distrust the platform more than if no recommendation had been shown.

### UX Recommendations

- Make the card collapsible and remember the preference per advertiser (if they always dismiss it, stop showing it)
- Show exactly three budget tiers: Conservative (P25 of similar campaigns), Recommended (P50-P75), and Aggressive (P90)
- For each tier, show a single number (projected daily impressions), not a range — ranges feel hedged and unhelpful
- Add a "How this was calculated" tooltip that lists: N similar campaigns, date range, category
- Pre-populate the budget input with the recommended tier when the user clicks "Use this budget" — don't just show the card and leave the user to type
- On mobile/narrow viewports, collapse the graph and show the three tiers as a segmented control with the selected tier's projection below

**UX Rating: Good potential, medium execution risk.** The concept is sound; the failure modes are in details of framing and dismissibility.

---

## Lens 3: Business Value

### Revenue Impact

Budget recommenders in retail media platforms consistently increase average campaign budgets. The mechanism is straightforward: advertisers without strong performance benchmarks default to conservative budgets driven by loss aversion. A credible recommendation from the platform gives them permission to spend more. Based on industry benchmarks (Google Ads, Amazon DSP), platforms that surface budget guidance see 15–30% higher average initial budgets on first campaigns.

For the Osmos platform specifically:
- `DemandSupplyPage.jsx` shows `budgetUtilization: '—'` for many categories — suggesting campaigns are either under-budgeted or over-budgeted with unclear signals. A recommender would directly address this gap.
- Campaigns labeled "No Spends in last 30 days" (visible in the campaigns table) represent a retention risk. A budget recommender could help identify under-budgeted campaigns before they go dark, potentially surfaced as a post-launch nudge.

### Retailer Value

Retailers benefit when advertiser campaigns run healthily and spend their budgets. Idle campaign budgets reduce fill rates on ad slots. If the recommender increases average budget utilization from (hypothetically) 60% to 75%, that directly improves retailer yield metrics — a strong argument when selling the feature to retailer partnerships.

### Advertiser Value and Churn Risk

New advertisers face the highest risk of setting a bad budget and abandoning the platform after seeing poor results. A recommender that meaningfully reduces the "bad first campaign" rate has long-term LTV implications that outweigh the short-term revenue gain from higher budgets.

### Misuse Risk

If the recommendation model is biased toward higher budgets (because the training data over-represents larger advertisers), it could recommend budgets that smaller advertisers cannot sustain, leading to early wallet depletion and churn. The model must be constrained to recommend within the advertiser's wallet balance or stated budget ceiling.

**Business Value Rating: High** — clear revenue lever, measurable, aligned with both advertiser and retailer interests.

---

## Lens 4: Product Delight

### The "Aha" Potential

The feature has genuine delight potential if it feels genuinely intelligent rather than generic. The bar for delight in B2B SaaS is different from consumer: it is not about animation or polish, but about the moment when a professional thinks "this tool knows my business." That moment arrives when:

- The recommendation is specific to their category (not a generic "$100/day" placeholder)
- The projected impressions feel credible and are later validated by actual results
- The feature gets smarter — if a returning advertiser sees "Based on your last 3 campaigns, we suggest..." the personalization creates genuine stickiness

### The "Disappointment" Risk

Delight collapses immediately if:
- The recommendation is obviously generic or too wide (e.g., "$50–$5,000/day")
- The projection graph doesn't match reality — even one bad outcome after following the recommendation damages trust
- The card appears but the numbers don't update when the user changes their flight dates or audience — the recommendation must be reactive to form state

### Delight Multipliers

- After campaign launch, show a "How you're tracking vs. projection" widget on the campaign detail view — this closes the loop and builds credibility over time
- Surface the recommender as a re-engagement tool: "Campaigns similar to yours that increased budget by 20% saw 40% more impressions" shown on under-performing campaign cards

### Delight Killers to Avoid

- Showing the card on every budget input field across all campaign types (overuse kills perceived intelligence)
- Making it feel like an upsell to a higher budget tier rather than a genuine tool (trust-destroying)
- Showing confidence intervals so wide that the projection graph is a meaningless band

**Product Delight Rating: Medium-High** — ceiling is high, but requires execution discipline to avoid falling into "generic advice" territory.

---

## Build vs. Cut Matrix

| Component | Verdict | Rationale |
|---|---|---|
| Budget tier card (3 tiers, P25/P50/P90) | BUILD | Core value, low complexity, high impact |
| Projected impressions line chart | BUILD | Already have recharts + impression data in codebase |
| Historical campaign similarity engine | BUILD (simplified) | Use category + flight duration buckets; skip ML for v1 |
| "How this was calculated" tooltip | BUILD | Essential for trust; zero engineering cost |
| One-click "Use this budget" action | BUILD | Reduces friction; closes the UX loop |
| Seasonal trend signals | DEFER to v2 | Requires 12 months of data; adds API latency |
| Live inventory level integration | CUT | 6-8 weeks of backend; marginal marginal improvement over baseline |
| Personalization ("your last 3 campaigns") | DEFER to v2 | Needs session history tracking; high value but not v1 |
| Post-campaign projection tracking widget | DEFER to v2 | Closes the loop; essential for trust-building over time |
| Mobile-optimized segmented control view | BUILD alongside card | The form is used on tablet; don't build desktop-only |

---

## Implementation Notes for This Codebase

1. **Rendering the card:** The natural insertion point is between the audience/targeting step and the budget input step in the campaign setup flow. Currently `SetupDetailsPage.jsx` is a stub ("Coming soon"). The recommender card should be a standalone component dropped into that multi-step form, not a modal.

2. **Chart component:** Use `recharts` `AreaChart` (already a dependency based on `ProductAdsAnalyticsPage.jsx`) with three data points for the three tiers. A stepped line or area fill between P25–P75 range with a separate point for the recommended value creates the right visual hierarchy.

3. **Token compliance:** The card must use `var(--osmos-brand-primary)` for the recommended tier highlight, `var(--osmos-border)` for the card container, and `var(--osmos-bg-subtle)` for the tier background rows. No hardcoded hex colors. The existing codebase has several token violations — do not add more.

4. **Budget input pre-fill:** The recommender card should emit an `onSelectBudget(amount)` prop callback that the parent form uses to set the budget field value. This keeps the recommender stateless and composable.

5. **Loading state:** The card should render immediately with a skeleton (three gray tier rows + a flat gray chart area) and populate once the async fetch resolves. The existing pattern from `WalletTopUpPage.jsx` (staged loading with `uploading` state) provides a precedent.

---

## Final Verdict

**Build it. Scope it to the four core components (tier card, projection chart, tooltip, one-click apply). Defer seasonal and inventory signals entirely. Plan v2 before v1 ships.**

The feature addresses a real and measurable gap: advertisers don't know what budget to set, and the platform has enough campaign history data to provide a credible answer. The risk is not in the concept — it is in over-engineering the intelligence signals and under-engineering the trust and framing details. A well-framed P50 recommendation backed by category history will outperform a poorly-framed ML recommendation with three data signals.

The highest leverage thing you can do is design the error state and the "recommendation was way off" outcome *before* writing the happy-path code. That discipline will force the right scoping decisions.
