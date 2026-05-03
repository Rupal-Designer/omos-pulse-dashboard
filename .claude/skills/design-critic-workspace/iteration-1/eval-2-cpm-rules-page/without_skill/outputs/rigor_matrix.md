# Design Critique: ManageCPMRulesPage
**Evaluated by:** Claude (without design-critic skill)
**Date:** 2026-04-24
**File:** `/Users/rishikeshjoshi/OMOS TEST/src/components/ManageCPMRulesPage.jsx`
**Context:** Ad ops managers at retailers use this screen to set CPM floor prices and yield optimization rules. Business-critical.

---

## Verdict Up Front

**Needs major work.** The screen is structurally sound — it has the right bones (table, drawer, badges, filters) — but it fails on several dimensions that matter significantly for a business-critical tool. The problems are not cosmetic; they are architectural, informational, and interaction-level. The most serious issues are the absence of row actions, incomplete form validation, hardcoded placeholder data, and a design-system compliance gap that will cause visual drift as the codebase scales.

---

## 1. Feasibility (Technical Quality)

### What is here
- Token-based CSS variables used consistently via constants (`BORDER`, `FG`, `BG_SUB`, etc.) — good discipline.
- SVG icons are inlined as hand-rolled components (`RefreshIc`, `ColIc`, etc.) rather than an icon library — a known project pattern but redundant since `lineicon-enforcer` is available.
- State is minimal and correct: `activeTab`, `search`, `showDrawer` are the right shape for the current feature surface.
- The drawer uses a fixed-position overlay + panel pattern. Implementation is correct.
- `onMouseEnter`/`onMouseLeave` inline style mutations on the `<tr>` are a React anti-pattern (direct DOM style writes). CSS class toggling or a `hoveredRow` state would be more idiomatic and less fragile.

### Problems
| Severity | Issue |
|---|---|
| High | **All data is hardcoded.** `ROWS` and `COLS` are static arrays. There is no data-fetching layer, loading state, empty state, or error boundary. For a business-critical page, this means the component cannot actually be used. |
| High | **Search input is wired to state but never filters rows.** `search` is set but never applied — `ROWS.map(...)` always renders all 8 rows regardless of query. |
| High | **Tab filter ("Auction Campaign" vs "All") does nothing.** `activeTab` state is set on click but never used to filter or segment data. |
| Medium | **Form validation is absent.** Required fields (marked with red asterisk) have no validation logic. `handleCreate` fires the toast unconditionally — an empty rule name or zero CPM % would silently "succeed." |
| Medium | **Inline style objects** recreated on every render (`thStyle`, `tdStyle`, `btnOutline`, `btnPrimary` defined inside the component body). These should be `useMemo` or extracted to constants. |
| Medium | **`RULE_COLORS` uses hardcoded hex values** (`#FFF7ED`, `#C2410C`, `#FAF5FF`, `#7C3AED`) instead of design tokens. Breaks dark mode and token governance. |
| Medium | **`Toast` component hardcodes `background='var(--osmos-brand-green)'`** directly in a style prop rather than using a semantic token. |
| Low | `onDone` reference in `Toast`'s `useEffect` dependency array will trigger on every render if the parent passes an inline arrow function — it should be `useCallback`-wrapped at the call site. |
| Low | The `Ic` generic SVG wrapper is a micro-abstraction that saves 2 lines but makes icon naming opaque. The codebase has a `lineicon-enforcer` skill specifically to standardize this. |

### Score: 4 / 10
Fundamentally incomplete as a real component. The shell is correct but the core behaviors (filtering, searching, validation) are stubbed out without even TODO comments.

---

## 2. UX Quality

### Information Architecture
The table has 11 columns. At `minWidth: 1300px` this will overflow on most laptop viewports. Columns like "Creator Name", "Created On", "Last Edited By", "Last Edited On" are audit metadata — useful but not primary. They should be:
- Hidden by default behind the column picker (the `ColIc` button exists but does nothing)
- Or progressively disclosed on row expand

The "Advertisers Applicable to" column shows a raw integer (120, 20, 18). Without context — 120 out of how many total? — this number means nothing to the ops manager.

### Missing Row Actions
There are zero per-row actions. For a CPM rules management screen, the expected actions are:
- Edit rule
- Duplicate rule
- Enable / Disable toggle
- Delete
- View affected advertisers

None of these exist. The "Create Rules" button creates new rules but there is no way to modify or delete existing ones. This is a critical UX gap for a management tool.

### Rule Priority Button
"Rule Priority" appears in the toolbar as a plain outline button. CPM floor rules often stack or conflict — priority ordering is one of the most consequential operations on this screen. It should not be a tertiary action buried in the toolbar at the same visual weight as Refresh and Download. It warrants a dedicated affordance (e.g., a drag-to-reorder mode or a numbered priority column in the table itself).

### Drawer UX
The "Create Rule" drawer has two submit paths:
1. A "Create User Activity Rule" button **inside the body scroll area** (line 264–268)
2. A "Create" button in the **footer** (line 278)

These are redundant and contradictory. The body button is always labeled "Create User Activity Rule" regardless of the `setRuleBy` radio selection (which can be "User Attributes" or "Custom List"). The footer "Create" button fires `handleCreate`. Having two action paths with different labels and potentially different behaviors is a serious usability error on a financial-configuration form.

### Audience Reach Visualisation
The gradient bar (Too Narrow → Too Broad) is decorative — the indicator dot is hardcoded to `left: 48%` regardless of actual reach. The "Potential Reach: 1,231,664" text is static. On a screen where reach directly affects CPM pricing strategy, showing fake data is actively misleading.

### Accessibility
- No `aria-label` on icon-only buttons (Refresh, Column picker, Download).
- Radio buttons use native `<input type="radio">` which is acceptable, but the group lacks a `<fieldset>`/`<legend>` for screen reader context.
- Table has no `scope="col"` on `<th>` elements.
- Search input has no `<label>` — only a placeholder.
- Color-only status indication: `StatusBadge` uses green color + dot with no text differentiation beyond the label "Active". There is no "Inactive" state rendered to verify contrast.

### Score: 3 / 10
The layout scaffolding is correct. The actual interaction model is broken: no row editing, non-functional search/filter, contradictory drawer submit paths, and static visualisation passed off as live data.

---

## 3. Business Value

### What works
- The three rule types (User Attribute, User Activity, User Segment) are visually distinguished with color-coded badges — good at a glance differentiation.
- Showing both CPM% and CPC% side by side in the table is the right call — ops managers need to compare these simultaneously.
- Estimated Reach in the table is high-value for bid strategy decisions.
- The "Advertisers Applicable to" column gives a sense of blast radius per rule.

### What is missing
- **No rule effectiveness signal.** CPM rules affect revenue directly. The table should surface whether a rule is performing (e.g., impression uplift, spend attributed to the rule, win rate). Without it, ops managers cannot tell if a rule is working or should be removed.
- **No conflict detection.** If two rules apply to overlapping audiences with different CPM%, which one wins? There is no indication. For yield optimization this is a first-class concern.
- **No bulk actions.** With 8+ rules (and presumably many more in production), enabling/disabling groups of rules or bulk-editing CPM% across a segment type requires row selection + bulk action bar. Neither exists.
- **No rule history / changelog.** "Last Edited By" and "Last Edited On" are shown but there is no way to see what was changed. For financial configuration, an audit trail viewer is expected.
- **The "Rule Priority" action is present but unimplemented.** This is arguably the most business-critical operation on the page — priority determines which rule fires when multiple rules match. Its absence turns the screen into a read-only list with a create button.

### Score: 4 / 10
The data model surfaces the right fields, but the page lacks the decision-support signals (performance, conflicts, history) that make it actionable for an ops manager.

---

## 4. Product Delight

### Strengths
- Token system is being used: `--osmos-border`, `--osmos-fg`, `--osmos-bg-subtle` etc. are correctly applied in most places.
- Badge system (StatusBadge, RuleTypeBadge) is clean and visually consistent.
- The "and" connector between Product Category and Brand in the drawer is a nice touch — it communicates compound logic without overwhelming the form.
- Hover state on table rows gives appropriate interactive feedback.
- The toast success message ("Rule created successfully. You can now set rule priority.") is well-written — it tells the user what to do next.

### Weaknesses
- **The page is a dead end.** After creating a rule, there is nothing to do except look at the list. No row-level interaction, no drill-down, no history, no performance data.
- **Help text is "Help text here" throughout the drawer.** Every field has an identical placeholder hint. For a financial configuration form, contextual help is important — what is a valid CPM% range? What does "User Activity" vs "User Attribute" actually mean for floor pricing? These placeholders signal the UI is not ready for real users.
- **Static data presented as live.** The audience reach bar with a hardcoded dot position, the "Potential Reach: 1,231,664" static number, and all 8 rows showing "16 Jun 25, 01:25 PM" or "13 Jun 25, 12:24 PM" as timestamps — these will be jarring the moment real data is connected and the carefully positioned dot jumps to a wrong position.
- **No empty state.** If no rules match a filter or if the retailer has zero rules configured, the table renders an empty `<tbody>`. There should be an empty state with a clear call to action.
- **Rule Name truncation is inconsistent.** Row 3 shows "Frequent Coke Bu..." in the data but the table renders all names with `textOverflow: ellipsis` — the truncation in the raw data string and the CSS truncation are both fighting each other. The data should be full strings; only CSS should truncate.

### Score: 5 / 10
The visual design vocabulary is correct and the token usage is mostly disciplined. But delight requires polish in the details, and the details here — placeholder copy, static visuals, no row actions, dead-end navigation — are all unfinished.

---

## Rigor Matrix Summary

| Dimension | Score | Key Finding |
|---|---|---|
| **Feasibility** | 4/10 | Search/filter/tab are wired but non-functional; no data layer; form submits without validation |
| **UX** | 3/10 | No row actions, two conflicting submit buttons in drawer, static reach visualisation, accessibility gaps |
| **Business Value** | 4/10 | Right fields surfaced but no performance signals, no conflict detection, rule priority unimplemented |
| **Product Delight** | 5/10 | Token discipline and badge system are good; undermined by placeholder copy, dead-end UX, and static data |
| **Overall** | **4/10** | Shell is solid. Feature is not shippable. |

---

## Priority Fix List (ordered)

1. **Wire search and tab filters to actual row filtering** — 30 min of work, highest visibility gap.
2. **Add row action menu (Edit, Enable/Disable, Delete, Duplicate)** — this is the core of a management screen.
3. **Remove the duplicate submit button from the drawer body** — replace with a single footer "Create Rule" button whose label reflects the current `setRuleBy` selection.
4. **Add form validation** before firing `handleCreate` — at minimum: non-empty rule name, numeric CPM/CPC%, valid range.
5. **Replace "Help text here" with real contextual copy** for each field.
6. **Implement the column picker** (`ColIc` button) to hide audit columns by default.
7. **Replace hardcoded hex colors** in `RULE_COLORS` with design tokens.
8. **Add empty state component** for zero-results scenarios.
9. **Make the reach bar dynamic** or remove it until real data is available — static visuals are misleading.
10. **Implement Rule Priority** as a first-class interaction (drag-to-reorder or numbered column), not a toolbar button that goes nowhere.

---

## One-Line Verdict

The ManageCPMRulesPage has the right visual vocabulary and data schema, but it is an unfinished prototype — not a shippable screen. The non-functional filters, absent row actions, duplicate form submission paths, and static visualisations make it unsuitable for ad ops managers who need to act on live data with confidence.
