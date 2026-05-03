# Design Critic: Rigor Matrix
## ManageCPMRulesPage — CPM Floor Price & Yield Optimization Rules
_2026-04-24 | Input type: React component code (ManageCPMRulesPage.jsx)_

---

## Rigor Matrix

| Dimension   | Score | Key Finding | Recommendation | Priority |
|-------------|-------|-------------|----------------|----------|
| Feasibility | 3/5   | Prototype shell with hardcoded data, no API integration, no validation on pricing fields, and a dual-submit path that will cause double-submit bugs on first real API call | Replace raw `<table>`/`<input>`/`<select>` with `react-table-v2` and `@onlinesales-ai/ui` form components; add numeric validation with min/max on CPM/CPC fields before any API wiring | P1 |
| UX          | 2/5   | Dual submit buttons ("Create User Activity Rule" in body + "Create" in footer), truncated rule names with no tooltip, 4 of 11 columns are audit trail bloat, zero accessibility on all icon buttons, all form help text is placeholder | Fix dual-submit as P0; add `title` on truncated cells; add `aria-label` to icon buttons; collapse audit columns into expandable "Change Log" | P0 (submit bug), P1 (rest) |
| Business    | 3/5   | Revenue-critical screen (CPM floors affect 120 advertisers per rule) with high adoption risk: dual-submit bug and placeholder help text will erode retailer confidence during onboarding; no Inactive/Paused state means ops managers can't test safely | Add Draft/Paused rule state before launch; replace "Help text here" with real field documentation explaining additive vs. multiplier semantics and valid ranges | P0 (help text), P1 (draft state) |
| Delight     | 2/5   | Audience Reach gradient gauge is the one clever element but is fully static (hardcoded position and reach count); no revenue impact feedback loop means the page is a set-and-forget config screen with no reason to return; 4 audit columns signal surveillance rather than empowerment | Make the reach gauge live (responds to filter changes); add a "Yield Impact" column showing estimated/actual revenue uplift per rule this week | P1 |

**Composite Score: 10/20**

---

## Conflicts (Needs Human Judgment)

1. **Effort vs. Differentiation — reach gauge vs. table package.** Feasibility recommends migrating to `react-table-v2` for free pagination and column management. Delight says the custom audience reach visualizer is the one moment of genuine product thinking worth investing in. These are not mutually exclusive (the drawer is separate from the table), but the reach gauge requires a live data pipeline that doesn't exist yet. **Human judgment needed:** should the live reach gauge block the table migration, or ship the table with a "coming soon" static gauge and build the pipeline in the next sprint?

2. **"Ship now" vs. "Not yet."** Business says this screen is revenue-critical and delay costs yield revenue. UX says the current state will actively damage retailer trust at onboarding. Both are correct. **Human judgment needed:** the P0 fixes (dual-submit bug, placeholder help text) are 1–2 days of work — decide whether to hot-fix and ship, or hold for a fuller polish pass including the live reach gauge.

---

## Verdict

Ship this page only after fixing two P0 defects that should never reach a retailer: (1) remove the "Create User Activity Rule" button inside the drawer body — it has no `onClick` handler, sits above the real "Create" button in the footer, and will be clicked first by every new user who then thinks nothing happened; (2) replace every "Help text here" placeholder with real copy explaining CPM/CPC premium semantics, valid ranges, and what the field controls. These two issues will destroy first impressions during onboarding and they are 1–2 days of work, not a reason to delay the screen for weeks. Beyond the P0s: add a Draft/Paused rule state before launch — ops managers cannot safely experiment if every saved rule immediately goes live. For P1 sprint: collapse the four audit columns into an expandable "Change Log" to recover horizontal space, make the audience reach gauge respond to filter changes (it's hardcoded today), and add a "Yield Impact" column showing per-rule revenue uplift. That last item is the single change that transforms this from a forgettable config screen into the optimization workspace Osmos's ceiling-break narrative requires.

---

<details>
<summary>Feasibility Agent — Full Report</summary>

## Feasibility Analysis

**Score: 3/5** — The screen's visual structure is implementable, but the current code is a prototype shell, not a production component: it uses hardcoded data, raw HTML primitives, and inline styles everywhere — making it expensive to productionize correctly.

**Blockers:** None that prevent shipping a demo. For production: no API integration exists, no real filter/search logic, no error state handling, no pagination.

**Risks:**
1. The `CreateRuleDrawer` has a "Create User Activity Rule" button INSIDE the body AND a "Create" button in the footer — two submit paths with no deduplication guard. This will cause double-submit bugs the moment real API calls are added. The body button has no `onClick` handler at all — it silently does nothing, which is arguably worse than double-submit.
2. All filtering (tabs, search, "Add a Filter") is wired to UI state but performs no actual filtering — zero business logic exists. Implementing real multi-condition filtering across rule type, reach range, and advertiser count is non-trivial.
3. CPM% and CPC% fields accept any string (`maxLength:50` with no numeric validation). On production these fields control advertiser pricing floors — a value like "abc%" would silently pass through with no error.

**Effort:** L — The prototype shell is done (~2 days). Production-ready requires: real API integration, input validation with business rules, pagination, bulk actions, column visibility management, error/loading/empty states — approximately 2 additional weeks.

**Simpler alternative:** Use `@onlinesales-ai/ui` Table + Form components and the existing `react-table-v2` package to get pagination, sorting, column visibility, and form validation for free — cutting implementation effort by ~40%.

</details>

<details>
<summary>UX Agent — Full Report</summary>

## UX Analysis

**Score: 2/5** — The layout is structurally legible but the cognitive load is dangerously high, error states are missing entirely, and multiple UX anti-patterns will frustrate ad ops managers doing time-sensitive work.

| Dimension   | Score | Key Finding |
|-------------|-------|-------------|
| Useful      | B     | CPM floor rules and audience reach signal are genuinely useful for yield optimization — the core value prop is sound. |
| Usable      | D     | Two submit buttons in the drawer (one inside body with label "Create User Activity Rule", one in footer with label "Create") with different labels and no visible relationship — the body button has no onClick handler and silently does nothing. Task completion is ambiguous and failure is silent. |
| Findable    | C     | Tab filter ("Auction Campaign" / "All") is too sparse — with 3 distinct rule types (User Attribute, Activity, Segment) there is no way to filter by type from the main view without opening every row. |
| Credible    | C     | Truncated rule names ("Frequent Coke Bu...", "Highest spending cu...") with no tooltip or expand-on-hover mechanism destroys trust — users cannot verify which rule they are editing without opening the drawer. |
| Accessible  | D     | No `aria-label` on any icon-only toolbar buttons (Refresh, Columns, Download). No visible keyboard focus styles anywhere. Native `<select>` with a custom chevron overlay positioned via `pointerEvents:none` is a known screen reader trap. All radio inputs use raw `<input type="radio">` without `<fieldset>`/`<legend>` grouping. |
| Desirable   | C     | Osmos token usage is partial — `FG`, `BORDER`, `ACCENT` are tokenized correctly, but badge colors for "User Activity" (`#FFF7ED`, `#C2410C`) and "User Segment" (`#FAF5FF`, `#7C3AED`) are hardcoded hex values that will break in dark mode and diverge from the design system during token updates. |
| Valuable    | A     | Removing this screen would directly break the yield optimization workflow — this is a core ops tool, not a vanity feature. Ad ops managers at retailers have no alternative path to set CPM floors. |

**Top friction points:**

1. **DUAL SUBMIT BUG (P0):** "Create User Activity Rule" (full-width, blue, prominent — inside the drawer body) has no `onClick` handler. "Create" in the footer calls `handleCreate`. Ad ops managers will click the body button first — it looks like the primary CTA. Nothing happens. They click again. Still nothing. They scroll down, find the footer button, click it. By this point they have lost trust in the form. This is not a minor polish issue — it is a silent failure on the primary task.

2. **11-COLUMN TABLE WITH NO STICKY FIRST COLUMN:** On realistic 1440px screens, horizontal scroll pushes "Rule Name" off the visible area. Users lose context of which rule they are examining mid-scroll. The four audit columns (Creator Name, Created On, Last Edited By, Last Edited On) consume 36% of column real estate and should be collapsed into a "Change Log" expandable panel or deprioritized to a detail drawer.

3. **ALL HELP TEXT IS PLACEHOLDER:** Every field in the Create Rule drawer displays "Help text here". For CPM/CPC % fields specifically, ad ops managers need to understand: Is this value additive to base CPM? Is it a multiplier? What is the valid range? What happens if two rules with different premiums both apply to the same user? Without this, the form is a liability — users will enter incorrect values and silently mis-price inventory for hundreds of advertisers.

**Quick wins:**
1. Add `title={row.name}` on the rule name `<span>` — browser native tooltip costs zero effort and immediately fixes the truncation credibility gap.
2. Add `aria-label="Refresh rules"`, `aria-label="Manage columns"`, `aria-label="Download"` to the three icon-only toolbar buttons — 10 minutes each, immediate WCAG 2.1 AA improvement.

</details>

<details>
<summary>Business Agent — Full Report</summary>

## Business Analysis

**Score: 3/5** — The screen sits at the heart of Osmos's yield optimization story and directly controls advertiser CPM floors, making it revenue-critical — but the current implementation has gaps that make it a confidence liability rather than an asset for retailer adoption.

**Revenue tie:** Direct — CPM and CPC Premium % fields literally set price floors for ad inventory. Incorrect values or user input errors here directly reduce retailer yield. The "Advertisers Applicable to" column (showing 120 advertisers for the top rules) means a single misconfigured rule simultaneously mis-prices inventory for 120 advertiser accounts. There is no confirmation dialog, no validation, and no undo mechanism.

**Retention hook:** Strong in concept, weak in execution — ad ops teams who configure yield rules here become deeply embedded in the platform. However, the absence of rule conflict detection (no visual indicator when two rules overlap on the same audience), no performance feedback (no revenue lift shown per rule), and no safe experimentation mode (Draft/Paused state) means that confident power users may accidentally overwrite each other's rules without knowing it, creating churn-inducing trust damage at exactly the wrong moment.

**Adoption risk:** High — despite being a core tool, adoption risk is HIGH for three compounding reasons: (a) the dual-submit bug will cause first-time users to abandon the Create Rule flow or submit incomplete rules; (b) "Help text here" placeholders throughout the form signal an unfinished product, which directly erodes retailer confidence during the onboarding window when first impressions matter most; (c) no Draft/Paused rule state means there is no safe way to stage a rule before it goes live — risk-averse ops managers will not experiment, which means fewer rules configured, which means lower yield optimization, which means the ceiling-break narrative stalls.

**Strategic fit:** Core — yield optimization via CPM floors is Osmos's primary differentiation against basic retail media platforms that offer only flat CPM rates. This is not a nice-to-have.

**Time-to-value:** Immediate — once rules are set, they affect the next auction cycle. This is one of the fastest time-to-value screens in the entire platform. The cost of delay or user abandonment here is measured in missed auction yield, not weeks of setup time.

**PRD alignment:** No PRD context provided. However, the "Rule Priority" button's existence as a non-functional UI element strongly suggests a planned priority/stacking feature that is incomplete — this creates a dangerous gap where rule priority is implied by the UI but unenforceable in the system, meaning overlapping rules resolve with undefined behavior.

</details>

<details>
<summary>Delight Agent — Full Report</summary>

## Delight Analysis

**Score: 2/5** — The Audience Reach visualizer is the one moment of genuine product thinking; everything else is functional scaffolding with no emotional design investment, and the reach gauge itself is fully static.

**Wow moment present?** Barely — and it's broken. The Audience Reach gradient bar in the Create Rule drawer (Too Narrow → Too Broad with a colored gradient and an indicator dot) is conceptually the right idea. A live gauge that responds to audience filter changes and tells you whether your targeting will reach 10K or 10M users is exactly the kind of contextual intelligence that makes Osmos feel smarter than competitors. But in the current implementation the indicator is hardcoded to 48% position (`left:'48%'`) and the reach number is a hardcoded string (`1,231,664`) that never changes. A static gauge is not a wow moment — it is a mockup element that will feel actively broken in production when a user changes the Product Category or Brand filter and the gauge does not respond. Users will trust it less than if it weren't there at all.

**Emotional tone:** Neutral, verging on frustrating — the density of audit columns (Creator Name, Created On, Last Edited By, Last Edited On: four of eleven visible columns) signals distrust rather than helpfulness. The product feels like it is watching users rather than empowering them. Ad ops managers who open this page want to see which rules are performing, not who created each rule 6 weeks ago. The information architecture communicates "compliance and accountability" when it should communicate "optimize and grow."

**Stickiness pattern:** None identified — there is no saved view, no per-rule performance metric visible in the table (no click-through-rate lift, no revenue uplift attributed to each rule), no insight that would give a manager a reason to return to this page weekly to optimize. Without a feedback loop showing "this rule generated $4.2K in additional yield this week versus last week," the page becomes a set-and-forget configuration screen that users visit once during setup and then avoid. That is the opposite of a sticky pattern — it is an island.

**Top delight upgrade:** Add a "Yield Impact" column to the table showing estimated or actual revenue uplift per rule (e.g., "+$4.2K this week" or "+12% CPM lift"). This single column transforms the page from a CRUD configuration screen into an active optimization workspace — it gives managers a reason to return weekly, compare rules against each other, pause underperforming rules, and amplify the ones working. It directly embeds the ceiling-break narrative ("your rules are generating real yield") into the daily workflow. This is also a strong competitive moat signal: no competitor shows per-rule revenue attribution inline in the rules table.

</details>
