# Decision Trees — Branching Logic

When the user gives an ambiguous brief, walk these trees to converge on the right recipe. Each tree starts with one question and branches into a specific recipe path.

---

## Tree 1: "What kind of surface is this?"

```
Is the user creating, editing, or viewing data?
├── Creating
│   ├── ≤3 fields → Modal (centered, 480px wide)
│   ├── 4-10 fields → Drawer (right side, 480px wide)
│   ├── >10 fields or multi-step → Wizard (full page or 720px centered column)
│   └── Bulk creating (CSV / list) → Drawer with file upload + preview table
├── Editing
│   ├── Single field, low friction → Inline edit (click to edit, Enter to save, Esc to cancel)
│   ├── Single record, multiple fields → Drawer (right side, preserves row context)
│   ├── Multiple records (bulk edit) → Bulk action bar above table + Drawer for confirmation
│   └── Settings (rare, infrequent) → Full settings page with sections
└── Viewing
    ├── List of items → Table (Pulse: dense; Advertiser: medium; OsmosX: card grid acceptable)
    ├── Single item detail → Drawer if it lives in a list context, Page if it's a destination
    ├── Multi-metric overview → Dashboard with KPI row + chart + supporting tables
    └── Long-form (PRD, spec, agreement) → Article layout with sidebar TOC
```

---

## Tree 2: "Which persona density target?"

```
Who is this for?
├── Pulse ad ops manager (200+ campaigns, daily user, keyboard-driven)
│   → HIGH density: 32-36px rows, 12+ columns possible, hover-reveal actions, bulk-everything,
│     keyboard shortcuts mandatory, no decorative motion, tabular numbers throughout
├── Advertiser portal user (single brand, weekly user, mouse-driven)
│   → MEDIUM density: 40-48px rows, 6-8 columns, always-visible actions,
│     guided affordances (helper text, examples), light micro-animation acceptable
├── First-time advertiser (just signed up)
│   → ONBOARDING density: empty states with rich CTA, tooltips on first use,
│     progress indication, more whitespace, "Skip for now" escape hatches
└── OsmosX brand explorer (executive, monthly user, narrative-driven)
    → LOW density: card grid, magazine-style layout, 16-24px type, hero imagery acceptable,
      polish over speed, animation as delight, dark-mode parity still required
```

---

## Tree 3: "Empty state — which kind?"

```
Why is the surface empty?
├── First-time (user has never created an X)
│   → Rich empty state: 48px icon, 16/600 heading, 13/400 description (max 2 lines),
│     primary CTA, optional secondary "Learn how" link to docs
│   Example copy: "No campaigns yet. Create your first campaign to start running ads."
├── Filter-induced (user filtered to nothing)
│   → Compact empty state: 32px icon, 14/500 heading, no description,
│     "Clear filters" button as primary action
│   Example copy: "No campaigns match these filters."
├── Permission-gated (user can't see, doesn't have access)
│   → Permission empty state: padlock icon (32px muted), 14/500 heading,
│     description naming the missing role, "Request access" CTA → opens Drawer to admin
│   Example copy: "You don't have access to Finance reports. Request access from your admin."
├── Permanent (this surface only fills under specific conditions, not user error)
│   → Quiet empty state: small icon, single line caption-grey text, no CTA
│   Example copy: "No alerts in the last 30 days."
└── Loading-disguised-as-empty (data is fetching, looks empty)
    → NEVER show empty here. Show skeleton until data resolves OR error fires.
```

---

## Tree 4: "Modal vs Drawer vs Page"

```
Does the action need the user to keep the underlying context visible?
├── No, it's a focused single decision (delete confirm, simple form, info display)
│   → Modal (centered, 400-560px wide depending on content)
├── Yes, but it's an edit/configure of a row in a list
│   → Drawer (right, 480px standard, 640px for richer flows)
└── Yes, and it's a multi-step task that may take 5+ minutes
    → Page (with breadcrumb back, save-and-continue, draft state)

Then: is it dismissible by clicking outside?
├── Destructive or irreversible action → No (require explicit Cancel button)
├── Information / view-only → Yes (click outside dismisses)
└── Standard edit → Yes, but warn if unsaved changes (confirm dialog)
```

---

## Tree 5: "Visual interest — but how much?"

```
Where is this surface in the user's day?
├── A surface they hit 50+ times/day (list, dashboard, debugger)
│   → MINIMAL visual interest. Speed > delight. No animations beyond functional feedback.
│     Density and signal-to-noise ratio is the craft.
├── A surface they hit 1-5 times/week (settings, billing, integrations)
│   → MODERATE polish. Hover affordances, subtle illustrations on empty states,
│     section dividers, ordered visual hierarchy. Polish without slowing.
├── A surface they hit 1-5 times/month or once-ever (onboarding, first-run, success states)
│   → HIGH polish + delight. Illustrations, micro-animation, celebration moments
│     (success states for first campaign launch, first ad served, first revenue).
│     This is where Zara earns her keep.
└── A marketing / OsmosX surface
    → MAXIMUM polish. Hero imagery, gradient accents (within brand), narrative typography,
      decorative motion. This is where the design-skill (broad) applies, not Pulse rules.
```

---

## Tree 6: "Which chart for this data?"

```
What is the user trying to learn?
├── Trend over time (revenue, impressions, ROAS over 30 days)
│   → Line chart (Highcharts via package). Single metric = one line. Two metrics = dual axis.
│     Three+ metrics = small multiples grid, not stacked lines.
├── Comparison across categories (campaign A vs B vs C)
│   → Horizontal bar (better than vertical at scale) OR sortable table with mini-bars in cells
├── Distribution (how many campaigns spend in each $ range)
│   → Histogram (bucketed) or box plot (if outliers matter)
├── Composition (what % of spend goes where)
│   → Stacked bar (preferred) or 100%-stacked area. NOT pie chart unless ≤3 slices.
├── Relationship (does CTR predict ROAS?)
│   → Scatter plot with trendline. Small multiples if also faceted by segment.
└── Single number with trend context (KPI card)
    → Big number + delta + sparkline (12-24 data points, no axis labels)
```

Charts MUST have: explicit dark-mode color tokens, accessible color (no red/green only — use shape/pattern + color), labeled axes, hover tooltips, exportable data.

---

## Tree 7: "Should this be a separate page, a tab, or a section?"

```
How often does the user visit this content compared to its parent?
├── Equal frequency (visited together) → Section on the same page
├── Less frequent than parent (occasional context) → Tab on the same page
├── More frequent / standalone task → Separate page in nav
└── Once-per-account-setup → Wizard accessible from settings, not in main nav
```

If the user is asking "should this be a tab or a page" they're really asking "how often will they use it" — answer the underlying question, not the surface one.

---

## Tree 8: "When to break a rule"

The rules above are defaults. Break them when:

- The data shape demands it (a 25-column report cannot follow the "8 columns medium-density" rule — it becomes a Pulse-only surface with horizontal scroll)
- The user is power-using (an "Advanced view" toggle that flips Advertiser-density to Pulse-density for one user who's outgrown the default)
- The surface is cross-portal (a shared component on Pulse and Advertiser must pick one density — usually the lower one)

When you break a rule, NAME IT in the recipe's "Judgment call" section. Don't break silently.
