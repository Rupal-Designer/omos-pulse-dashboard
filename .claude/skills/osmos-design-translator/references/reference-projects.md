# Reference Projects — Curated, Annotated for Osmos

When the user says "make it like X," look up X here. Each entry has: what's good, what to steal, what to drop for Osmos, and the named recipe to fall back on.

---

## Linear

**What's good:** Density without feeling cramped. Keyboard-first. Hover-revealed actions on table rows. Sub-200ms feel for navigation. Status pills with colored dots. Empty states with specific, action-oriented copy.

**Steal for Osmos Pulse:**
- 32-36px row height in the issues list — adopt directly for campaigns table
- Cmd+K command palette pattern (Osmos has this in `src/ui/`, expand it)
- Status pill style (small dot + text, muted bg) — adopt for campaign status badges
- Date format ("2d ago", "yesterday") instead of full timestamps in tables — adopt for activity feeds

**Drop for Osmos:**
- The dark-only aesthetic (Osmos must support light)
- Heavy use of subtle gradients on cards — Osmos prefers flat surfaces with borders
- The "comments thread" pattern — Osmos has different stakeholder dynamics

**Falls back to recipes:** Recipe 3 (Data Table Pulse density), Recipe 9 (Status Badge), Recipe 1 (Empty State rich)

---

## Vercel / Geist

**What's good:** Type contrast (very large headings, very small caption). Calm color palette (mostly grayscale + brand). Generous whitespace on marketing surfaces, dense on dashboard. Framer Motion polish without being distracting.

**Steal for OsmosX (brand-side) and marketing surfaces:**
- Hero typography contrast (40-72px headings paired with 13-14px body)
- Subtle hover scale on cards (scale 1.02, 200ms)
- Gradient accents used sparingly (single color stops, no rainbow gradients)

**Steal for Osmos Pulse (carefully):**
- Project switcher pattern in top-left (Osmos has account switcher there — same pattern)
- Inline edit affordance (click name → becomes input)

**Drop for Osmos:**
- The deploy-log style (Osmos has different async patterns — agentic debugger)
- Multi-tenant team switcher complexity (Osmos has retailer / advertiser context, not teams)

**Falls back to recipes:** Recipe 8 (Toolbar / Page Header), Recipe 6 (Dashboard)

---

## Stripe Dashboard

**What's good:** The gold standard for B2B financial UX. Charts that read in dark mode. Tables that handle 30+ columns gracefully. Drawer-over-modal for any non-trivial flow. Inline editing on cells. Excellent empty states.

**Steal for Osmos Pulse:**
- Drawer-over-modal default (Osmos already does this — reinforce in recipes)
- Hover-revealed "..." → bulk action discovery
- Date range picker pattern with presets + custom range
- Filter pill UI (applied filters shown as removable chips above the table)

**Drop for Osmos:**
- The very dense type ramp (Stripe uses 12px body — Osmos uses 13)
- The "Test mode" affordance (Osmos doesn't have a test/live mode)
- Some of Stripe's color palette feels neutral-cold for Osmos's warmer brand

**Falls back to recipes:** Recipe 3 (Data Table), Recipe 4 (Drawer), Recipe 5 (Modal destructive confirm)

---

## Notion

**What's good:** Block-based composability. Inline-everything. Subtle hover affordances. The "/ command" pattern for content creation. Rich empty states with templates.

**Steal for Osmos:**
- "/ command" pattern for the agentic debugger input (Osmos has this in BYOT / debugger)
- Block hover handles (small grip on left of row to drag/edit) — adapt for ad creative editor
- Slash-templated content creation (e.g. "/ campaign brief" → templates)

**Drop for Osmos:**
- The "infinite canvas" feel (Osmos surfaces are bounded — campaigns, packages, wallets)
- The drag-to-reorder-everything pattern (most Osmos lists are sorted by data, not user-curated)

**Falls back to recipes:** Recipe 1 (Empty State rich, with templates option)

---

## GitHub (PRs, Issues, Repository view)

**What's good:** Information density done right. Status indicators that work at scale (1000+ PRs). Conversation threads that don't get unwieldy. Code diff view that reads in dark mode.

**Steal for Osmos Pulse:**
- Filter dropdown with search inside (when filter has 50+ options — adapt for advertiser/retailer pickers)
- "Open / Closed" tab pattern for status filtering (adapt to "Active / Paused / Archived" for campaigns)
- Inline approval / action UI on rows (adapt for campaign-debugger one-click fixes)

**Drop for Osmos:**
- The diff/code-specific patterns (no parallel in retail media)
- The "merge conflict" UX (no parallel)

---

## Atlassian / Jira / Polaris (Atlassian DS)

**What's good:** Designed for power users in enterprise. Excellent component library docs. Strong patterns for permission-gated UI. Good multi-tenant patterns.

**Steal for Osmos:**
- Permission-empty-state pattern (small lock icon + "Request access from admin" CTA)
- Filter-bar applied-count badge style
- The "lozenge" status badge pattern (adopted via Recipe 9)

**Drop for Osmos:**
- The Atlassian visual style — too cold for Osmos
- Confluence-style content blocks (no parallel)

---

## IBM Carbon

**What's good:** Strong accessibility. Detailed component specs. Dark/light parity from the start. Data viz guidelines that scale.

**Steal for Osmos:**
- The accessibility checklists (WCAG 2.1 AA minimum on every component)
- The data table specification (column types, sorting affordances)
- The notification severity hierarchy (info → success → warning → error → critical)

**Drop for Osmos:**
- Carbon's specific visual language (very enterprise-cold — Osmos brand is warmer)

---

## Material 3 / Apple HIG

**Use as reference for:** Mobile patterns (iOS/Android-specific UI when Osmos ships mobile views), motion principles (the timing functions), accessibility minimums.

**Don't use as reference for:** Desktop B2B SaaS (the sensibilities don't transfer cleanly — Material is too playful, HIG is too consumer-focused for ad ops).

---

## Refactoring UI (Steve Schoger book)

**What's good:** Tactical, opinionated rules that improve any UI. Specifically:
- "Establish a hierarchy" (every screen has one most-important element)
- "Choose a personality" (pick one type family, one brand color, commit)
- "Use color and weight to create hierarchy" (not size alone)
- "Don't use grayscale shadows" (use a tinted shadow that matches your bg)
- "Compress dense info into smaller text" (12-13px is fine for B2B power users)

**Apply to Osmos:** All of the above are already encoded in `osmos-constraints.md` and `component-recipes.md`. When in doubt, this book's heuristics win.

---

## Anti-references — what NOT to look at

- **Salesforce / SAP / Oracle UIs** — these are how B2B got its bad reputation. Generations of accreted complexity. Don't reference.
- **Random Dribbble shots** — beautiful but not shipped. Often violate density / accessibility rules. Use as inspiration for *visual interest* only, never structure.
- **Generic "B2B SaaS template" libraries** (Tailwind UI, Untitled UI dashboards) — useful as starting points but every product that uses them looks identical. The whole point of this skill is to differentiate.

---

## How to use this file

When the user says "make it like X":

1. Look up X here
2. If X is in this file: surface the "steal" / "drop" lists, ask the user which portal it's for, then proceed
3. If X is NOT in this file: ask the user to send a screenshot or URL, then describe what they're pointing at in observable terms (Phase 1 — Inspiration Capture), and proceed
4. Always finish with the recipe-fallback path so the output is structured

This file is a curation, not exhaustive. Add new entries when the user references a project repeatedly — the goal is to compound institutional design knowledge over time.
