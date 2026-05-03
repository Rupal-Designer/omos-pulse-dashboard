# Design Critic: Rigor Matrix
## Smart Budget Recommender — Campaign Setup Flow
_2026-04-24 | Input type: description_

---

## Rigor Matrix

| Dimension   | Score | Key Finding | Recommendation | Priority |
|-------------|-------|-------------|----------------|----------|
| Feasibility | 2/5   | Requires three distinct ML/data pipelines (similarity engine, seasonality model, live inventory API) — none currently exist; this is a new infrastructure build, not a UI feature | Ship a statistical "Budget Range Benchmark" (P25/median/P75 by category + flight duration) as v1; defer ML recommendation layer to v2 | P0 |
| UX          | 3/5   | Core concept is well-placed and genuinely useful, but the inline graph risks cognitive overload at a high-stakes funnel step, and trust scaffolding (provenance, confidence, cold-start fallback) is entirely unspecified | Lead with the recommended number as hero text, graph behind progressive disclosure; add one-line data provenance; define explicit cold-start fallback state | P0 |
| Business    | 4/5   | Directly targets the highest-leverage advertiser moment (budget commitment at creation); strong revenue tie via budget anchoring lift; genuine moat if live inventory signal is unique | Label v1 as "Benchmark Range" not "AI Recommendation" to set appropriate expectations and avoid trust cliff on launch | P1 |
| Delight     | 3/5   | Latent wow moment exists but is not guaranteed by current spec; accuracy is the prerequisite for stickiness, and the feedback loop is too long without an explicit post-campaign accuracy reveal | Build a post-campaign "Budget Accuracy Report" micro-card (actual vs. projected impressions) as a phase-2 feature to close the trust loop and compound stickiness | P2 |

**Composite Score: 12/20**

---

## Conflicts (Needs Human Judgment)

**1. Feasibility says "defer the tiered graph" vs. Delight says "the graph is the wow moment."**
Feasibility argues the multi-tier projection chart adds engineering weight and in-flow cognitive load; the simpler alternative is a P25/median/P75 range display. Delight argues that the tiered graph — when fast and accurate — is exactly the memorable, differentiated moment that makes the feature worth building. These are not mutually exclusive across versions, but they are mutually exclusive in v1 scope. Human judgment required: prioritize launch speed and reliability (range in v1), or prioritize differentiated experience (graph in v1) and accept higher risk?

**Recommended resolution:** Ship the number range in v1 as the budget anchor. Build the tiered projection graph for v2 once the data pipeline is validated at scale and the similarity model is proven accurate. This avoids a trust-destroying first impression if the graph shows inaccurate projections at launch.

**2. Business says "high revenue impact — ship now" vs. Feasibility says "XL effort — 6–10 weeks."**
These are not in philosophical conflict — both agree the feature is worth building — but they imply different urgency levels. Business sees immediate revenue leverage; Feasibility sees a significant coordination cost across data, backend, and frontend teams. The benchmark-first alternative resolves this tension by enabling a shippable v1 in 2–3 weeks that captures most of the business value while the full ML stack is built in parallel.

---

## Verdict

Build this — but not the way it's currently specified. The Smart Budget Recommender concept is strategically correct: budget-setting is the highest-stakes, highest-abandonment moment in campaign creation, and a data-backed anchor has well-documented lift on initial spend commitment. However, the current spec packages three hard engineering problems (ML similarity matching, seasonal trend modeling, real-time inventory querying) inside what is described as a "UI feature," which will either delay the ship date by a quarter or result in a low-confidence v1 that actively damages advertiser trust.

**Ship now (v1 — 2–3 weeks):** A "Budget Range Benchmark" card that shows P25/median/P75 daily budgets for campaigns with the same category and flight duration, sourced from aggregated historical data only. No ML inference. No real-time inventory. The card leads with the median as the hero number ("$95/day is typical for campaigns like yours"), offers a one-click "Use this budget" button that pre-fills the field, and includes a single-line provenance footnote ("Based on 62 similar campaigns | Updated daily"). Define explicit fallback states for cold-start (< 10 comparable campaigns: show a wider range or hide the card). Match Osmos design tokens throughout — this must not look like a widget bolted on.

**Build next (v2 — parallel track, 6–10 weeks):** Layer the ML similarity engine and the tiered impression projection graph on top of the v1 benchmark card once the data pipelines are proven. Gate the graph behind progressive disclosure ("See projections at different budgets →") so it enriches the experience for curious users without adding cognitive load for everyone.

**Defer (v3 or later):** The live inventory signal. This is the genuine moat — no competitor can offer retailer-specific, real-time inventory as a budget input signal — but it requires a live API integration with the retailer's catalog system that does not exist today. Do not promise this in v1 copy or the roadmap will lie.

**Kill:** The idea of shipping the full three-signal ML recommendation in v1. An inaccurate "AI recommendation" is worse than no recommendation — it triggers trust collapse with exactly the power users whose opinion shapes platform reputation across their retailer accounts.

---

<details>
<summary>Feasibility Agent — Full Report</summary>

## Feasibility Analysis

**Score: 2/5** — The feature requires three distinct ML/data pipelines (historical similarity matching, seasonal trend detection, real-time inventory querying) plus a charting layer, none of which likely exist in their current form; this is a significant new infrastructure build, not a UI feature.

**Blockers:**
- No evidence of a "similar campaigns" similarity index or ML inference endpoint in the current codebase. Building one requires labeled campaign data, feature engineering, a model serving layer, and latency budgets under ~500ms to not break the campaign-creation flow.
- Real-time inventory level access from the retailer's catalog system must be available as an API — if it's batch-synced (e.g., nightly), the "current inventory levels" signal is stale by definition and misleads advertisers.
- Seasonal trend data requires at least 12–18 months of per-category spend history to be statistically meaningful. New retailer accounts on Osmos will have insufficient data, creating a cold-start problem that must be explicitly handled in UX and data logic.

**Risks:**
1. **ML model drift and trust collapse** — If the budget recommendation is wrong even a few times (over- or underestimates impressions by >30%), advertisers will stop trusting the feature entirely and it becomes a liability rather than an asset. Without a confidence interval displayed alongside the projection, every recommendation is an implicit false promise.
2. **Inline graph performance** — Rendering a multi-tier impression projection chart inside an already-complex campaign creation flow adds rendering weight at a moment of high user task load. If the chart fetch takes >1s, it creates perceived slowness at the most critical conversion funnel step.
3. **Data pipeline coupling** — The feature sits at the intersection of three data sources (campaign history, seasonal signals, inventory). Any one going stale or unavailable breaks the entire recommendation, with no graceful degradation currently specified.

**Effort:** XL — The UI card + graph is M effort on its own; the three backend pipelines (similarity engine, seasonality model, live inventory API) each range M–L individually. Total engineering effort across data, backend, and frontend is likely 6–10 weeks of coordinated work across multiple teams.

**Simpler alternative:** Ship a "Budget Range Benchmark" first — a purely statistical lookup that shows P25/median/P75 daily budget for campaigns with the same category and flight duration, sourced from aggregated historical data only. No ML, no real-time inventory. This is an L→M effort, delivers 60% of the value (a credible starting anchor), and can be built in 2–3 weeks. Add the ML recommendation layer in v2 once the data pipelines mature.

</details>

<details>
<summary>UX Agent — Full Report</summary>

## UX Analysis

**Score: 3/5** — The core concept is genuinely useful and contextually placed, but the inline graph risks overloading an already-complex funnel step, and trust scaffolding (data freshness, confidence, explainability) is entirely unspecified.

| Dimension   | Score | Key Finding |
|-------------|-------|-------------|
| Useful      | A | Advertisers genuinely struggle with budget-setting on new campaigns; a data-backed anchor directly addresses a top drop-off point in campaign creation funnels. |
| Usable      | B | "Inline card with a graph" is one interaction, but it's unclear how the advertiser applies the recommendation — is it a one-click "use this" or do they manually key it in? The application action must be ≤1 click or it will be ignored. |
| Findable    | B | Placed in-flow after audience + flight dates — correct placement. Risk: if buried below the fold in a long form, users miss it without scrolling. |
| Credible    | C | Three data sources are cited but not surfaced to the user. Without "Based on 47 similar campaigns in your category" or "Last updated: 2h ago," the recommendation reads as a made-up number. Data provenance is a critical trust signal for data-driven ad ops managers. |
| Accessible  | C | Graph-heavy content is inherently difficult for screen readers. No specification for chart alt-text, keyboard-navigable tier selection, or color-blind safe palette. The multi-tier visualization must not rely on color alone to distinguish tiers. |
| Desirable   | B | An inline projection card is on-brand for a data-forward platform. Risk: if the visual style doesn't match Osmos tokens (navy/blue-violet/mint), it will feel like a third-party widget bolted in. |
| Valuable    | A | Removing this from a completed implementation would directly hurt campaign creation confidence; advertisers with a budget anchor convert at materially higher rates than those shown a blank input. |

**Top friction points:**
1. **No "apply" affordance specified.** The recommendation appears as a card with a graph, but the spec does not define how the advertiser accepts it. If they still have to type the number manually, the feature's utility collapses to "decorative chart." There must be a "Use $X/day" button that pre-fills the budget field with one click.
2. **Cold-start silent failure.** For new retailers or niche categories with <10 historical campaigns, the feature either shows no card (confusing absence) or shows a low-confidence recommendation that looks identical to a high-confidence one. This is a credibility landmine. The spec must define the fallback state explicitly.
3. **Graph cognitive overload at funnel crunch point.** Campaign creation is already a multi-step, high-stakes flow. Adding a multi-tier projection graph here competes for attention with the primary task of setting the budget. If the chart requires >10 seconds to interpret, it adds friction rather than reducing it. Consider leading with the recommended number (large, prominent) and making the graph a progressive-disclosure toggle ("See projections →").

**Quick wins:**
1. Lead with the number, not the chart — show "$120/day recommended" as the hero text, with the graph collapsed behind a "see full breakdown" toggle. This takes <1 day to implement and removes the cognitive overload risk immediately.
2. Add a one-line data provenance footnote: "Based on [N] similar campaigns | Updated daily." This is a single line of text that transforms credibility from C to A.

</details>

<details>
<summary>Business Agent — Full Report</summary>

## Business Analysis

**Score: 4/5** — This directly addresses the single highest-leverage moment in the advertiser lifecycle (campaign creation budget commitment) and has a strong revenue tie, but adoption risk is real if the recommendation quality is poor at launch.

**Revenue tie:** Direct — Budget anchoring at campaign creation is one of the most well-documented conversion levers in self-serve ad platforms. Advertisers who receive a credible "start here" recommendation commit higher initial budgets than those presented with a blank field (typical lift: 15–30% higher initial daily budget). This directly increases GMV on the platform in the first campaign cycle and sets a higher baseline for subsequent campaigns if the recommendation proves accurate.

**Retention hook:** Strong — If the recommendation is accurate (impressions delivered match the projection within an acceptable range), advertisers will trust the model and use it on every future campaign. This creates a behavioral loop: advertiser sets budget → model prediction validates → advertiser returns to Osmos for next campaign with higher confidence. The feedback loop is the retention mechanism; accuracy is the prerequisite.

**Adoption risk:** Medium — Two scenarios threaten adoption. First, if the ML recommendations are wrong at launch (plausible given cold-start and data quality concerns from Feasibility), early adopters who act on bad advice will churn and actively warn others. Second, sophisticated ad ops managers may distrust algorithmic recommendations on principle and ignore the card entirely. Mitigation: label v1 as "Benchmark range" (not "Recommended budget") to set lower expectations and avoid the trust cliff.

**Strategic fit:** Core — This aligns directly with the ceiling-break narrative: replacing manual, trial-and-error budget calibration with data-driven self-service. It's differentiated from generic self-serve ad platforms because the signal includes retailer-specific inventory, which competitors (DV360, TTD) cannot access. This is a genuine moat if the inventory signal is live.

**Time-to-value:** Weeks — Once shipped, an advertiser sees and can act on the recommendation in their first session. If the "use this" button pre-fills the budget, the time-to-value is immediate within that session. However, value validation (did the recommendation prove accurate?) takes the length of the campaign flight (days to weeks).

**PRD alignment:** No PRD context provided.

</details>

<details>
<summary>Delight Agent — Full Report</summary>

## Delight Analysis

**Score: 3/5** — There is a genuine "oh, that's clever" moment latent in this feature, but the current spec is built around data display rather than designed around the emotional peak — the moment an advertiser realizes the platform knows their business context and is actively helping them succeed.

**Wow moment present?** Potentially yes, but not guaranteed by the current spec. The wow moment would be: "I just picked my audience and dates, and the platform already knows what campaigns like mine have achieved — here's exactly what to expect at each spend level." That is compelling. But the wow moment is destroyed if: (a) the graph takes >1s to load, (b) the numbers feel generic rather than specific to the advertiser's context, or (c) the recommendation card is visually indistinct from the rest of the form. To guarantee the wow moment, the card needs a distinct visual treatment (not just another form section) and the recommendation must reference specific context ("For home goods campaigns in Q4...").

**Emotional tone:** Helpful — when it works. The intent is collaborative intelligence, and that's the right emotional register for Osmos's power-user audience. Risk of tipping to "frustrating" if: the card shows no data (cold-start), the numbers are stale, or the graph is slow. Ad ops managers are highly attuned to data quality; a bad recommendation doesn't just get ignored — it actively damages trust in everything else on the platform.

**Stickiness pattern:** Behavioral loop with validation delay. Advertiser uses recommendation → campaign runs → checks performance vs. projection → if accurate, returns with higher trust next cycle. This is a high-value loop, but it has a long feedback cycle (days to weeks per campaign). To accelerate stickiness, consider a "How did we do?" micro-card post-campaign that shows actual vs. projected impressions. This closes the loop explicitly and turns a passive feature into an active trust-builder.

**Top delight upgrade:** After a campaign completes, send a "Budget Accuracy Report" — a single-stat card in the campaign dashboard that shows "Your projected impressions: 240K | Actual: 228K (95% accuracy)." This one post-hoc touchpoint transforms the recommender from a one-time tool into a trust-accumulating system that compounds with each campaign. It also creates a natural upsell moment ("Your next campaign has 18% more inventory available — want to increase budget?"). This is buildable as a separate phase and would raise delight from a 3 to a 4.

</details>
