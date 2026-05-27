# Design Critic: Rigor Matrix
## Duplicate Campaign — Sponsored Ads Campaign Table
_2026-04-24 | Input type: description_

---

## Rigor Matrix

| Dimension   | Score | Key Finding | Recommendation | Priority |
|-------------|-------|-------------|----------------|----------|
| Feasibility | 3/5   | Current codebase has zero drawer/form infrastructure; full pre-filled form + copy highlighting + dual-save logic lands at L effort (2–3 sprint weeks) | Ship the lean version first: backend-duplicate-then-redirect. Add drawer in Phase 2 only if user research shows the rename-and-review flow is a common need. | P1 |
| UX          | 3/5   | Full campaign form in a drawer is high cognitive load for a task most users resolve in 2 clicks (rename, save); dual CTA creates decision paralysis | Default to immediate duplicate (paused draft, "Copy of …" name), confirm via inline toast with "Edit" link. Reserve the drawer for power-user edit path only. | P0 |
| Business    | 4/5   | Demand is already proven — 50% of the rows in the existing dataset are "Copy of …" campaigns; this is demand-capture, not demand-creation | Build this now. It is table stakes and a velocity multiplier on advertiser spend. Every sprint it is delayed is a sprint advertisers are doing this manually. | P0 |
| Delight     | 2/5   | One genuine wow moment (copy highlighting) buried under a long form that creates anxiety instead of confidence; "Copy of Copy of" naming is already a visible failure mode | Preserve the highlighting concept but apply it only to the 3–4 fields shown on first open. Add smart auto-rename ("Copy of [Name] (2)" if duplicate already exists). | P2 |

**Composite Score: 12/20**

---

## Conflicts (Needs Human Judgment)

**1. Drawer vs Redirect — Feasibility vs Delight**
Feasibility recommends skipping the drawer entirely: backend-duplicate + redirect to the existing edit page ships in ~20% of the effort. Delight argues the copy-highlighting moment is the one differentiating experience in the flow and worth preserving. This is a genuine tension. The simpler approach ships faster and reduces implementation risk; the drawer approach is more polished but costs 2x the engineering time. Recommended resolution: ship redirect first, instrument whether users immediately click into edit after duplication. If >60% do, the drawer adds no value. If <30% do, users are fine with the duplicate-and-come-back-later pattern and the drawer is still unnecessary.

**2. "Launch Now" vs Default-to-Draft — Business vs UX**
Business wants "Launch Now" as a prominent CTA to drive immediate campaign activation and spend velocity. UX says competing CTAs at the bottom of a long pre-filled form will cause form abandonment. Resolution requires an A/B test — this cannot be decided at design time. Ship with Draft as the primary CTA and measure abandonment rate vs. launch conversion rate before promoting "Launch Now" to equal prominence.

---

## Verdict

Build campaign duplication, but not as described. The proposed drawer-with-full-form is the right destination, not the right starting point. The correct build sequence is: (1) Ship the lean version now — a "Duplicate" button in the row actions that calls a backend copy endpoint, creates a paused draft prefixed "Copy of [Name]", handles the "Copy of Copy of" naming collision by appending "(2)", and confirms via an inline toast with an Edit link. This is an S-to-M effort, ships real value immediately, and captures the proven latent demand visible in the existing campaign data. (2) Instrument it — measure what percentage of users immediately click through to edit vs. let duplicates sit. (3) If the data shows users want to rename/configure at duplication time, then build the drawer with the pre-filled form, restrict the initial view to Name, Start Date, Budget, and Status only, and apply the copy-highlighting to those four fields only. (4) The dual-CTA ("Save as Draft" vs "Launch Now") should be deferred until the drawer is built, and then A/B tested — never shipped as a design assumption. Kill the "highlight everything that was copied" version — a full-form highlight is visual noise. The smart rename logic is the highest-ROI delight investment and should be in Phase 1, not Phase 2.

---

<details>
<summary>Feasibility Agent — Full Report</summary>

## Feasibility Analysis

**Score: 3/5** — Mechanically achievable, but the form pre-filling + copy highlighting + dual-save logic compounds into a medium-to-large engineering lift that the current component architecture does not support at all.

**Blockers:** None that are absolute, but the absence of any drawer or form infrastructure in the current codebase is a significant starting-point debt. The existing `SponsoredAdsCampaignsPage.jsx` has no actions column, no drawer component, and no form state management beyond the search input.

**Risks:**
1. **Campaign settings shape complexity** — Campaigns likely have nested ad groups, targeting rules, bid strategies, and budget periods. Copying all settings correctly (deep clone vs shallow) and surfacing them in a form that was originally designed for blank-slate creation is brittle. Any field the original form does not render becomes silently dropped in the duplicate.
2. **Dual-save semantics** — "Save as Draft" vs "Launch Now" requires the backend to support a `status` flag on creation, and the frontend form must gate validation differently for each path (draft skips bid/budget validation, launch does not). This is non-trivial to retrofit if the existing creation API always validates fully.
3. **Highlight "what was copied"** — There is no established visual pattern for field-level highlighting in the current design system usage shown in this codebase. This requires a new UI pattern that must degrade gracefully and not confuse users who are editing the fields (highlight should clear on first keystroke).

**Effort: L** — Table action column: S. Drawer shell: S. Pre-filled form with all campaign settings: M–L on its own depending on field count. Field-level copy highlighting: M. Dual-save logic with different validation paths: M. Combined: L, realistically 2–3 sprint weeks for one engineer.

**Simpler alternative:** Skip the drawer entirely. On "Duplicate", immediately create a paused/draft copy server-side (name prefixed "Copy of …", handling collisions with "(2)" suffix), then show a toast with "Campaign duplicated — [Edit]" link that navigates to the existing campaign edit page. This is approximately 20% of the effort and delivers the core value — users can duplicate and then modify — without needing a new drawer, pre-fill highlighting, or dual-save logic. The existing "Copy of TestQA588" naming pattern already in the dataset confirms this workflow is in active use on the platform.

</details>

<details>
<summary>UX Agent — Full Report</summary>

## UX Analysis

**Score: 3/5** — Solves the right problem but introduces a high-cognitive-load interaction when a lighter-weight pattern would serve the same user need with significantly less friction.

| Dimension   | Score | Key Finding |
|-------------|-------|-------------|
| Useful      | A     | Duplicate is a genuine power-user need — the existing dataset shows "Copy of …" campaigns are a real behavioral pattern on this platform (5 of 10 rows are copies) |
| Usable      | C     | Full campaign form in a drawer is 5–15 clicks minimum to complete; the simpler "duplicate then redirect to edit" path is 2 clicks |
| Findable    | B     | Row-level action button on hover is standard and discoverable; but the button label "Duplicate Campaign" must be explicit text — an icon-only button will not work for this action |
| Credible    | B     | Pre-filled form with copy highlighting creates trust that data was copied correctly — this is a genuine UX strength of the proposed approach and worth preserving in some form |
| Accessible  | C     | Drawer with a full form has significant keyboard-trap and focus-management requirements; if not implemented carefully it will fail WCAG 2.1 AA. Focus must move to drawer on open, be trapped inside while open, and return to the triggering button on close. The current codebase has no drawer patterns to reference. |
| Desirable   | B     | Matches Osmos brand patterns; side-drawer for campaign configuration is consistent with how major ad platforms (Google Ads, Meta Ads Manager) handle duplication |
| Valuable    | A     | Removing this feature would meaningfully hurt power users who run recurring seasonal campaigns — it is a high-frequency workflow for active advertisers |

**Top friction points:**
1. The full form in a drawer is too heavy for what most users want to do (rename + save). Showing 20+ pre-filled fields forces the user to scroll and assess everything before they can act, when they typically only need to change the name and possibly the date range.
2. "Save as Draft" vs "Launch Now" at the bottom of a long form creates a false-choice moment — users who want to duplicate-and-edit-later will be confused about which button is safe to press. Visually competing CTAs of equal weight introduce decision paralysis at the most vulnerable point in the flow.
3. No undo/cancel affordance is mentioned in the description. If a user clicks Duplicate accidentally, they need an obvious, prominent way to dismiss without creating anything.

**Quick wins:**
1. Default the "Duplicate" action to immediately create a paused draft server-side, then show an inline toast with "Campaign duplicated — [Edit]" link. No drawer needed for the happy path. This is deliverable in a fraction of the time.
2. If the drawer is kept, show only 3–4 editable fields on open (Name, Status, Start Date, Budget) with a "Show all copied settings" expand control. This reduces cognitive load dramatically on first interaction and makes the copy-highlighting actually legible.

</details>

<details>
<summary>Business Agent — Full Report</summary>

## Business Analysis

**Score: 4/5** — Strong business case because it directly reduces friction in the campaign creation loop, which is the primary driver of advertiser spend on the platform.

**Revenue tie:** Indirect but strong. Faster campaign iteration leads to more active campaigns leads to more spend. Advertisers who can replicate a proven campaign structure for a new product or time period are less likely to reduce spend or churn to a competing platform. This is a velocity multiplier on existing advertiser behavior, not a new monetization mechanism.

**Retention hook:** Strong. Once advertisers build a library of proven campaign structures through duplication, they are more invested in the platform. The "Copy of …" pattern creates a network of related campaigns that gives the account historical depth. Switching platforms means starting that library from zero — a real switching cost.

**Adoption risk:** Low. The existing "Copy of …" campaigns in the dataset are proof that users already want this. Five of ten rows in the current data are duplicates created through whatever manual workaround exists today. This is demand-capture, not demand-creation.

**Strategic fit:** Core. Self-service campaign management is central to the ceiling-break narrative of moving retailers past the M%G revenue plateau. Reducing the time to launch a new campaign from "recreate from scratch" (~20 minutes) to "duplicate and rename" (~60 seconds) is exactly the kind of operational efficiency that enables advertisers to scale spend without scaling headcount.

**Competitive differentiation:** Table stakes. Every major ad platform has campaign duplication: Google Ads, Meta Ads Manager, DV360, Amazon DSP, The Trade Desk. Not having it is a competitive gap that sophisticated advertisers will notice and cite in renewal conversations. Having it does not differentiate Osmos; not having it actively hurts.

**Time-to-value:** Immediate upon ship. The first time an advertiser clicks Duplicate, they save 10–20 minutes of form-filling. This is among the highest time-to-value features possible — there is no onboarding period, no learning curve, no configuration required.

**PRD alignment:** No PRD context provided.

</details>

<details>
<summary>Delight Agent — Full Report</summary>

## Delight Analysis

**Score: 2/5** — The core mechanic is correct but the execution as described is workmanlike, not delightful. The highlighting idea is the one spark worth preserving; the dual-CTA and full-form presentation are active delight-killers.

**Wow moment present?** Potentially yes, but not guaranteed. The "highlights what was copied" concept is clever — it tells the user "we remembered everything for you." But this only works as a wow moment if the highlighting is subtle (a gentle blue tint on pre-filled fields, not a banner for every field) and clears on first edit. If it is heavy-handed, it creates visual noise and becomes a cognitive burden rather than a confidence signal. As described, the wow moment depends entirely on execution quality, which makes it unreliable.

**Emotional tone:** Currently neutral-to-anxious. The full-form-in-drawer approach feels like work. The better emotional arc: clicking Duplicate should feel like pressing a fast-forward button — something happens quickly, the user feels in control, and there is a clear confirmation that the system did the heavy lifting. The proposed flow instead asks the user to review everything the system did before they can proceed, which inverts the intended emotional contract from "the system helped me" to "the system gave me homework."

**Stickiness pattern:** Moderate. Campaign duplication creates a library of campaign structures over time, which increases platform investment. But this only becomes a true stickiness pattern if users can manage their duplicated campaigns as a group (lineage view, original/copy relationship). The current proposal does not address lineage. "Copy of Copy of TestQA380" is already a failure mode visible in the existing dataset — without smart naming, the library becomes chaotic and reduces rather than increases stickiness.

**Top delight upgrade:** Add smart auto-rename logic. Instead of naively prefixing "Copy of [Name]", detect whether a "Copy of [Name]" already exists and name the new campaign "Copy of [Name] (2)" or — better — offer a date-stamped variant like "[Name] — Apr 2026" when the campaign is a seasonal repeat. This one-sentence change eliminates the most common post-duplicate friction (disambiguating confusingly-named campaigns) and makes the system feel intelligent rather than mechanical. Implement this in Phase 1 alongside the lean duplicate flow — it costs almost nothing and delivers outsized perceived quality.

</details>
