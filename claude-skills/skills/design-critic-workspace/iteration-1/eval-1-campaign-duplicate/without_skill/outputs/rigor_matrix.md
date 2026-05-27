# Rigor Matrix: Duplicate Campaign Feature
**Feature:** "Duplicate Campaign" button per row in the Sponsored Ads Campaign Review table
**Evaluator:** Claude (without design-critic skill)
**Date:** 2026-04-24
**Codebase context:** `src/components/SponsoredAdsCampaignsPage.jsx`, `src/components/DisplayAdsCampaignsPage.jsx`

---

## The Proposed Design (restated for clarity)

- A "Duplicate Campaign" button appears in each row of the campaign table
- Clicking it copies all campaign settings from that row
- Opens a side drawer (pre-filled) with the campaign creation form
- The form highlights which fields were copied from the original
- User can rename the campaign
- Bottom of drawer has two CTAs: "Save as Draft" and "Launch Now"

---

## Dimension 1: Technical Feasibility

### What the codebase currently has

The `SponsoredAdsCampaignsPage` (and `DisplayAdsCampaignsPage`, which is structurally identical) is a self-contained, client-side component. The campaign table rows currently only surface: Campaign Name, Merchant Name, Status, and Campaign Created On. There is no row-level action column, no row action menu, and no side-drawer infrastructure anywhere in the page.

The current component has no state related to a "selected campaign" or "editing campaign" — it only manages `search`, `hoveredRow`, `page`, and a toast notification.

### Implementation complexity

| Piece | Effort | Notes |
|---|---|---|
| Add "Actions" column or hover-reveal button | Low | Requires adding a column and hover-state handling; hover state already exists |
| State management for selected campaign (to pass to drawer) | Low | One `useState(null)` for `duplicatingCampaign` |
| Side drawer component | Medium | No `Drawer` component is currently used in this file. Must import from `@onlinesales-ai/ui` using `Drawer.Root` + `Drawer.Body` dot-notation pattern |
| Campaign creation form (pre-filled) | High | The current codebase has no campaign creation form implemented — this is the biggest unknown. The form complexity depends entirely on how many fields a campaign has (budget, targeting, schedule, bid strategy, keywords, etc.) |
| "Highlight copied fields" affordance | Medium | Requires a visual treatment (e.g. a `bg.subtle` tinted wrapper or a "Copied" badge per field). Not technically hard but needs thoughtful implementation to avoid being noisy |
| "Save as Draft" vs "Launch Now" logic | Medium | Requires two distinct API calls with different payload states. Backend must support a `draft` status |
| Naming logic: "Copy of [original name]" | Trivial | Already evident in the mock data: rows 1, 3, 5, 7 are named "Copy of TestQA..." — the team already thought of this pattern |

### Feasibility verdict

**Technically feasible.** The hardest part is not the duplication trigger or the drawer — it is building the campaign creation form itself. If that form already exists in the real codebase (not the prototype), the entire feature is a medium-complexity addition. If the form does not exist, this feature cannot ship without first building it.

**Critical dependency:** The campaign object in the current prototype only has 4 fields (`campaignName`, `merchantName`, `status`, `createdOn`). A real campaign has many more (budget, bid strategy, targeting, schedule, products/keywords). The pre-fill logic must handle all of them, including fields that cannot or should not be blindly copied (e.g., campaign dates, budget spend, performance labels like "No Spends in last 30 days").

---

## Dimension 2: UX Quality

### What works well in the proposed design

1. **Side drawer is the right container.** It keeps the user in context (they can still see the campaign list behind the drawer), unlike a full-page navigation which would lose their scroll position and mental context.

2. **Pre-filling the form is correct.** The friction of re-entering everything is the primary reason advertisers duplicate campaigns. Pre-fill solves that.

3. **Renaming at the top is correct.** The first thing a user wants to change is the name. Surfacing it prominently is right.

4. **"Save as Draft" vs "Launch Now" is the right binary.** Advertisers often duplicate to set up future campaigns without going live immediately. Having both options at the point of action prevents an extra modal or confirmation step.

### UX problems with the proposed design

**Problem 1: "Highlights what was copied" is ambiguous and potentially noisy.**
If every field in a 15-field form is highlighted as "copied," the highlight conveys no useful information — everything is copied. Highlighting is only meaningful when it draws attention to fields the user *must review* before launching (e.g., dates, budget, targeting). The proposed spec doesn't make this distinction.

Recommendation: Instead of highlighting all copied fields, show a contextual banner at the top of the drawer: "Review these settings before saving — dates and budget from the original campaign have been carried over." Only flag fields with time-sensitive or spend-sensitive values.

**Problem 2: Placement of the Duplicate button is not specified.**
The table currently has no Actions column. Options:
- A. Show on row hover (inline, as an icon button)
- B. A "..." overflow menu per row (along with Edit, Pause, Archive)
- C. A dedicated "Duplicate" column

Option A (hover icon) is the most common SaaS pattern for single-action rows, but this table will likely need multiple row actions over time (Edit, Pause, Delete, Duplicate). Option B (overflow menu) is more scalable. The proposal doesn't address this — and it matters because it determines how discoverable the feature is.

**Problem 3: No undo / accidental-click safety.**
Clicking Duplicate immediately opens a form. If the user clicked it accidentally, they must dismiss the drawer. This is acceptable, but the drawer should have a clear X/close action and no auto-save behavior.

**Problem 4: The "Copy of [name]" naming convention can create clutter at scale.**
The existing mock data already shows this: "Copy of TestQA588", "Copy of TestQA462", etc. — and there is no mechanism to prevent "Copy of Copy of TestQA588." The form should auto-increment (e.g., "TestQA588 (2)") or let the user know if a campaign with that name already exists.

**Problem 5: Mobile/narrow viewport behavior is unaddressed.**
A side drawer + wide form is fine on desktop. On narrower viewports, the drawer needs to either be full-width or the feature should be hidden behind a different interaction. The current prototype's table is already scrollable (`overflowX: 'auto'`) — the drawer interaction needs the same care.

### UX quality verdict

**The core UX flow is sound. The detail-level design has 4 gaps that need resolution before implementation.** None are blockers, but Problem 2 (action placement) and Problem 4 (name clutter at scale) are the most important to resolve in the design spec before handoff.

---

## Dimension 3: Business Value

### Who benefits

- **Advertisers** who run seasonal or repeated campaign patterns (e.g., "Summer Sale" copied from last year's "Winter Sale") save significant setup time.
- **Account managers** who manage multiple brands can template a working campaign structure and duplicate it per merchant.
- **The platform** benefits from faster campaign creation velocity, which correlates with higher ad spend activation rates — a key revenue driver for a retail media platform.

### Evidence from the data

The mock data in the prototype is revealing: 7 of 10 campaigns are prefixed "Copy of TestQA..." — meaning the team has already been manually creating duplicates (presumably by hand or via test automation). This is a strong signal that the user behavior exists and is already happening through workarounds.

### Business risk of NOT building it

Advertisers who cannot duplicate campaigns through the UI will either:
1. Re-enter everything manually (high friction, may reduce campaign creation rate)
2. Ask account managers to do it for them (ops cost)
3. Export and re-import via bulk upload (if available) — a worse UX

All three outcomes are worse than having the feature.

### Business risk of building it wrong

- If the drawer form is slow or buggy, the feature trains users not to use it
- If "Launch Now" bypasses review steps (approval workflows, budget validation), it could cause compliance or overspend issues
- If draft campaigns pile up without cleanup mechanisms, it creates a management burden

### Business value verdict

**High business value. This is not a nice-to-have — it is a table-stakes feature for any campaign management platform.** Google Ads, Meta Ads Manager, Amazon Ads, and DV360 all support campaign duplication. Absence of this feature is a competitive gap.

---

## Dimension 4: Product Delight

### What could make this feel great

1. **Instant feedback on duplicate trigger.** When the user clicks Duplicate, the drawer should animate in smoothly (using `Drawer.Root` with a CSS transition). Avoid a loading spinner before the drawer opens — pre-fill from client-side data is instantaneous.

2. **Smart default name.** Auto-generate "Copy of [name]" (already the team's convention, evidenced by the data) and pre-select the name text on focus so the user can immediately type a new name without needing to clear the field.

3. **"You're duplicating [Campaign Name]" context header.** Show the source campaign name at the top of the drawer (above the form) so the user has a constant reminder of what they are duplicating. This removes any doubt after the drawer opens.

4. **Toast confirmation on save.** The prototype already has a toast system (`showToast`). Reuse it: "Campaign 'New Name' saved as draft" or "Campaign 'New Name' is now live." This closes the loop cleanly.

5. **The "Save as Draft" / "Launch Now" split.** This is genuinely delightful when done right — it respects the user's intent. "Launch Now" should have a primary button style (brand primary). "Save as Draft" should be secondary/ghost. They should NOT be equal weight — the primary action should be obvious.

6. **One thing to REMOVE from the proposal:** The "highlights what was copied" feature as originally described. If implemented naively, it makes the form feel chaotic (every field is highlighted). Replace it with a single summary banner as described in UX Problem 1. This is simpler to implement and more useful.

### Delight verdict

**The base proposal has good instincts but one misguided detail (the field-level copy highlights).** The toast system, side drawer pattern, and dual CTA are all strong. The delight ceiling is limited by whether the drawer form itself is well-designed — a pre-filled but poorly organized form is worse than no pre-fill.

---

## Overall Verdict

### Build it — but not exactly as described.

| Dimension | Score (1-5) | Rationale |
|---|---|---|
| Technical Feasibility | 4/5 | Straightforward if campaign creation form exists; medium effort overall |
| UX Quality | 3/5 | Core flow is right; 4 specific gaps need resolution |
| Business Value | 5/5 | Table-stakes feature; strong usage signal already in mock data |
| Product Delight | 3.5/5 | Good instincts; one noisy detail to remove |

### Recommended changes from the original spec

1. **REMOVE:** "Highlights what was copied" (every field) — replace with a single contextual banner listing only time-sensitive or spend-sensitive fields to review.

2. **ADD:** Specify the action entry point explicitly — recommend an overflow menu ("...") per row that includes Duplicate, Edit, Pause, and Archive. This scales to future actions and avoids a crowded row.

3. **REFINE:** Auto-name convention should be "Copy of [name]" but check for collisions and suggest "Copy of [name] (2)" if the name already exists.

4. **CLARIFY:** Define which fields are NOT copied (e.g., campaign performance labels like "No Spends in last 30 days" are metadata, not settings — they should not appear in the duplicate form).

5. **CONFIRM:** "Launch Now" requires validation of all required fields before submit. Do not skip any approval or budget-guard rails that the standard Create Campaign flow enforces — the duplicate path must pass through the same guards.

6. **SEQUENCE:** If the campaign creation form does not already exist in the platform, build it first as a standalone feature (Create Campaign). Duplicate Campaign is then a thin layer on top of it (pre-fill + source attribution). Do not build Duplicate Campaign in isolation with its own bespoke form.

### Minimum viable version to ship

Row-level overflow menu > "Duplicate" option > side drawer opens with pre-filled form > user can rename and edit > two CTAs: Save as Draft (secondary) | Launch Now (primary) > toast confirmation. No field-level copy highlights. No collision-detection on names in v1 (acceptable tech debt). 

This is a 1-sprint feature if the campaign creation form already exists.

---

*Critique produced without the design-critic skill — manual evaluation against Technical Feasibility, UX Quality, Business Value, and Product Delight dimensions.*
