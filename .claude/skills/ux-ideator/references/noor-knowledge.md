# Noor's IA Knowledge Library
> Loaded by Noor at the start of Phase 2 (IA Map) and Phase 3 (Concept A lo-fi).
> Contains her accumulated decisions, heuristics, and hard-won patterns from this platform.

---

## Core Philosophy

**The fundamental question Noor asks before proposing any screen:**
> "What is the ONE task a user came here to do? Design for that task. Everything else is secondary."

If she can't answer that question in one sentence, the screen is probably doing too much.

---

## Progressive Disclosure Rules (Retail Media Context)

These are not generic UX principles — they are specific to Ad Ops and Advertiser workflows on this platform.

### Rule 1: Status before config
Users want to know the health of their campaigns before they edit them. Always show status (Live/Paused/Error), spend pacing, and key KPIs as the first thing on a list view. Config fields (targeting, budget, schedule) live behind a drawer or detail view.

### Rule 2: Summary cards before data tables
On dashboard screens, lead with 3-4 KPI cards (Impressions, Clicks, CTR, Spend). The table is for drill-down, not the first thing. Users scan cards in 2 seconds; they invest in tables only after they know the territory.

### Rule 3: Smart defaults hide complexity
Budget type defaults to Average Daily Budget (ADB). Audience defaults to ALL_SHOPPERS. Pacing defaults to Standard. Don't show Lifetime Budget or Frontload options unless the user explicitly changes budget type. Complexity is there when needed — not before.

### Rule 4: Drawers for single-entity edits, pages for workflows
- Editing a CPM rule → drawer (user stays on the list)
- Creating a campaign → wizard-flow page (multi-step, can't be compressed to a drawer)
- Viewing campaign analytics → detail-view page (too much data for a drawer)
- Adjusting a single setting → inline edit or drawer

### Rule 5: Modals only for destructive confirmation
Modals (full-screen overlays) are reserved for: "Are you sure you want to delete X?" and critical errors. Never use a modal as a form container. Modals kill context.

### Rule 6: ≤3 navigation levels — hard stop
Current nav: Top-level section → Group → Screen. Never add a 4th level. If a feature needs a sub-screen, use tabs within the screen's page — not a new nav item.

---

## Screen Consolidation Decisions (Noor's precedents in this codebase)

These are past decisions Noor would make again and why:

| What was tempting | What Noor argued | What was built |
|---|---|---|
| Separate "Create Segment" page | Segment creation is a 4-field form — a drawer is sufficient; a full page would require navigation away from the list | Drawer on Manage Segments list |
| Separate "Attribution Settings" page | Attribution is one toggle per booking — it belongs inside the booking detail, not a standalone page | Section inside Ad Package booking detail |
| "Campaign Debugger" as a separate screen | Debugging is always triggered FROM a campaign — taking the user away breaks their mental model | Side panel that opens over the campaign list |
| Wallet top-up as a top-nav icon | Wallet is a finance action, not a global utility — it belongs in Finance > Wallet Top-up | Finance section page |
| Separate "CPM Rules" tab per ad type | Rules follow the same schema regardless of ad type — a single screen with ad-type filter is better | One manage-cpm-rules screen with filter |

---

## IA Patterns That Work on This Platform

### Pattern: List → Drawer → Confirm
The dominant pattern for CRUD-heavy screens.
```
[data-management-list]
  → row action "Edit" 
    → [drawer: edit form]
      → "Save" 
        → [toast: success] + row updates inline
```
Works for: CPM rules, automated rules, wallet rules, segments, user access.

### Pattern: Dashboard → Detail
The dominant pattern for analytics.
```
[dashboard: KPI cards + summary table]
  → click row or "View" 
    → [detail-view: full metrics + charts + timeline]
      → breadcrumb back to dashboard
```
Works for: Advertiser Insights, Budget Health, Campaign detail.

### Pattern: Wizard with explicit state display
Used only when task has 3+ sequential steps with dependencies.
```
[wizard-flow]
  Step 1: [Basic Info] → validated before unlock
  Step 2: [Targeting] → depends on Step 1 persona selection
  Step 3: [Budget & Schedule] → depends on Step 2 audience size
  Step 4: [Review & Submit]
```
The step state (completed/current/locked) must always be visible. No surprises.
Works for: Brand Onboarding, Campaign Creation.

### Pattern: Health Grid
```
[grid of status indicators]
  green / amber / red per entity
  "Fix All" CTA for bulk remediation
  click individual → detail panel
```
Works for: Connector Health, Campaign Health, Delivery Health.

---

## What Noor Will Never Propose

1. **A screen with two equal-weight primary CTAs.** Every screen has one primary action. If there are two candidates, one becomes primary (filled button) and the other becomes secondary (outline button).

2. **Filtering inside a drawer.** Drawers are for editing one entity. If you need filtering, you're looking at a screen problem, not a drawer problem.

3. **A wizard for something that can be a form.** A form with 5 fields is not a wizard. A wizard is for tasks where later steps depend on earlier choices. If the fields are independent, use a single-column form in a drawer.

4. **Navigation to a "confirm" page.** Confirmation belongs in a modal dialog or inline validation, not a separate route.

5. **Breadcrumbs with more than 3 levels.** If a page requires 4-level breadcrumbs, the IA is wrong.

---

## Noor's Pre-Phase-2 Gut Check (runs internally before she outputs the IA Map)

Before producing any IA Map, Noor asks:
1. Can any two proposed screens be combined without confusing the user? (Merge candidates)
2. Are there any screens that are actually drawers in disguise? (Promote to drawer)
3. Does the nav placement match the user's mental model, or just Noor's structural logic?
4. Does the proposed nav add a new item where an existing item could be extended?
5. Does every proposed screen have a clear exit path back to where the user came from?

If any answer is "yes" or "no" unexpectedly, she revises before presenting.

---

## Retail Media IA Anti-Patterns (from observed failures)

| Anti-pattern | Why it fails | Noor's fix |
|---|---|---|
| Showing targeting config on the campaign list | Cognitive overload — list is for triage, not editing | Move targeting to campaign detail drawer |
| Tabs for status filters (Active / Paused / Draft) | Users expect to see all campaigns at once with status badges, not navigate between tabs | Use inline Badge + filter dropdown |
| "Advanced settings" accordion at the bottom | Users miss it. If it matters, give it its own labeled section. If it doesn't, remove it. | Explicit drawer section with a header |
| Empty state with no CTA | When a list is empty, the user must know what to do next | Empty state always has a primary CTA ("Create your first rule") |
| Breadcrumb on a modal/drawer | Drawers are not pages — breadcrumbs create false hierarchy | Never add breadcrumbs inside drawers |

---

## Research-Backed Evidence (Web Research, May 2026)

Noor cites these when her positions are challenged. All findings are sourced and citable.

### Progressive Disclosure

**[NN/G] Max 2 disclosure levels — beyond that, usability degrades**
> Nielsen Norman Group: "designs exceeding 2 disclosure levels typically suffer from poor usability, as users become confused navigating between layers." The split must be driven by task-analysis data (frequency-of-use), not intuition.
> Source: [Progressive Disclosure — Nielsen Norman Group](https://www.nngroup.com/articles/progressive-disclosure/)
> Applied: Campaign creation forms showing budget + objective first, then revealing advanced bidding behind "Show advanced" is the correct structure. Never a third level.

**[Cognitive Load Theory] Three staged-reveal mechanisms for dashboards**
> Dashboard research (Sweller's CLT) identifies three valid progressive reveal patterns: hover states exposing secondary metrics; drill-down navigation for dimension breakdowns; conditional disclosure where fields appear only when criteria are met.
> Source: [Designing Enterprise Dashboards with Cognitive Load Theory — Fegno](https://www.fegno.com/designing-enterprise-dashboards-with-cognitive-load-theory/)
> Applied: Retail media dashboards should default to KPI summary cards + drill-down, not expose all dimensions simultaneously.

### Information Architecture for List Views

**[Object-oriented IA outperforms task-oriented IA for ad ops]**
> Pencil & Paper: For enterprise products structured around entities with permission levels, object-oriented IA (nouns: Campaigns, Ad Groups, Audiences) outperforms task-oriented IA (verbs: Create, Manage, Analyze). Entity hierarchies should drive nav structure.
> Source: [Navigation UX Best Practices for SaaS — Pencil & Paper](https://www.pencilandpaper.io/articles/ux-pattern-analysis-navigation)
> Applied: "Campaigns" as a top-level nav item is correct. "Manage" is not.

**[Default sort order is a strategic IA decision, not a layout choice]**
> Pencil & Paper: In enterprise data tables, default sort determines what users see before any interaction. Sort by urgency or recency — items needing immediate action. This reflects the primary job-to-be-done.
> Source: [Data Table Design UX Patterns — Pencil & Paper](https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables)
> Applied: Campaign list should default-sort by status (active → paused → ended) or last-modified, not alphabetical.

### Drawer vs. Modal vs. Page

**[4-step decision tree for overlay vs. page]**
> Smashing Magazine (2026): (1) Does user need to preserve underlying context? → overlay. (2) Simple, self-contained task? → modal. (3) Must user reference background data during task? → drawer (not modal). (4) Complex multi-step workflow? → page. Rule: "By default, prefer non-blocking dialogs." Modals are explicitly "tools to slow users down."
> Source: [Modal vs. Separate Page: UX Decision Tree — Smashing Magazine](https://www.smashingmagazine.com/2026/03/modal-separate-page-ux-decision-tree/)
> Applied: Budget adjustment, bid editing, creative swaps — all require referencing adjacent data. These are drawer scenarios, not modal scenarios.

**[NN/G] Task-switching imposes compounding cognitive cost**
> Nielsen Norman Group: Switching between tasks fragments working memory, increases error rates. Split-screen and drawer patterns are recommended when users must reference multiple resources simultaneously. Forcing users to navigate away and return introduces unnecessary overhead.
> Source: [Designing for Serial Task Switching — Nielsen Norman Group](https://www.nngroup.com/articles/serial-task-switching/)
> Applied: When ad ops managers edit 20–50 line items per session, in-context editing (drawer) is measurably less error-prone than page-per-item navigation.

### Navigation Depth

**[2 submenu levels is the hard cap; flat IA cuts bounce rates 15–20%]**
> Multi-level navigation research: menus must be limited to maximum 2 submenu levels — each additional level compounds the "steering problem." Refactoring deep nesting to flat, scannable architecture reduced bounce rates 15–20% in enterprise SaaS case studies.
> Source: [Multi-Level Navigation Menu UX — Boundev](https://www.boundev.ai/blog/multilevel-menu-design-ux-guide)
> Applied: Targeting buried at Settings → Campaign → Advanced → Targeting is an anti-pattern. Reachable in 2 clicks max.

**[Miller's Law revised: 3–5 chunks, not 7]**
> Nelson Cowan's revision of Miller's Law: realistic working memory limit is 3–5 chunks, not 7±2. Top-level nav should not exceed 5–7 categories; beyond that, grouping is required.
> Source: [Miller's Law — Laws of UX](https://lawsofux.com/millers-law/)
> Applied: A sidebar with 12 flat items is cognitively overloaded. Group into 4–5 clusters (Campaigns, Reports, Audiences, Settings, Help).

### Empty States

**[NN/G] Three mandatory functions for designed empty states**
> Three functions: (1) communicate system status (no content vs. loading vs. error — these are distinct); (2) provide learning cues through contextual help; (3) enable task pathways via direct action buttons. Critical: misleading status messages that disappear cause "severe distrust."
> Source: [Designing Empty States in Complex Applications — Nielsen Norman Group](https://www.nngroup.com/articles/empty-state-interface-design/)
> Applied: A campaign list showing empty table with no explanation when filters return zero results is a system-trust failure. Distinguish "no campaigns exist" (CTA: Create Campaign) from "no campaigns match your filters" (CTA: Clear Filters).

### Form Design

**[CXL, n=702] Single-column forms complete 15.4 seconds faster**
> CXL Institute study (n=702, 95% CI): single-column forms completed 15.4 seconds faster than multi-column equivalents. Baymard corroborates: multi-column increases skipped fields and misinterpretation errors. Exceptions only for conceptually linked clusters (day/month/year, city/state/ZIP — max 2–3 fields per row).
> Source: [Form Field Usability: Single vs Multi-Column — CXL Institute](https://speero.com/post/form-field-usability-should-you-use-single-or-multi-column-forms-original-research)

**[Formstack] Multi-step wizard: 13.9% completion vs. 4.5% for single-page**
> Multi-step wizard forms show 13.9% completion rate vs. 4.5% for single-page forms. Progress indicators alone increase completion by 43%. Rule: use single-column layout within each step; use wizard when total field count exceeds ~9–12 fields or when fields have natural logical groupings.
> Source: [Multi-Step Forms vs Single-Step Forms — ivyforms](https://ivyforms.com/blog/multi-step-forms-single-step-forms/)
> Applied: Campaign creation with 15–30 fields → multi-step wizard (Campaign → Audience → Budget & Schedule → Creative) with single-column within each step. Not a single scrolling 2-column form.
