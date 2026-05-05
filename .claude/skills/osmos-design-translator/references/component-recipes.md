# Component Recipes — Concrete Patterns

Each recipe is opinionated. Tokens, sizes, components are named. The judgment call is named. These are starting points; the user can argue against any specific number, but the structure should hold.

---

## Recipe 1: Empty State (rich, first-time)

**When:** User hits a surface for the first time, no data exists yet.

```
Layout: vertical stack, centered, max-width 480px, padded 48px top
├── Icon — 48×48px, color var(--osmos-fg-muted), from icon library
├── Spacing var(--osmos-spacing-4)
├── Heading — 16/600, color var(--osmos-fg), one line
├── Spacing var(--osmos-spacing-2)
├── Description — 13/400, color var(--osmos-fg-muted), max 2 lines
├── Spacing var(--osmos-spacing-6)
└── Primary CTA — Button variant=primary, size=md, with verb-first label
```

**Components:** `EmptyState` from `src/ui/`, `Button`, `Icon`.

**Copy formula:** "No [thing] yet. [What happens when you have one]. [What to do first]."
Example: "No campaigns yet. Once you create one, you'll see ad spend and ROAS here."

**Don't:** Use stock empty-box illustrations, "Get started" button label (use the verb), three columns of feature explainer.

**Judgment call:** Whether to add a secondary "Learn more" link below the CTA. Default no. Add if onboarding telemetry shows users need education before action.

---

## Recipe 2: Empty State (compact, filter-induced)

**When:** User filtered to nothing.

```
Layout: vertical stack, centered, padded 32px top
├── Icon — 32×32px, color var(--osmos-fg-subtle)
├── Spacing var(--osmos-spacing-3)
├── Heading — 14/500, color var(--osmos-fg-muted), one line
└── Spacing var(--osmos-spacing-3)
   └── Button variant=outline size=sm, label "Clear filters"
```

No description text. The user already knows what they did.

---

## Recipe 3: Data Table (Pulse density)

**When:** Listing 25-500 records on Pulse where ad-ops users will scan, sort, bulk-select.

```
Top toolbar (Toolbar component)
├── Left: search input (260px wide), filter button (with applied count badge)
├── Right: bulk actions row (only enabled when ≥1 row selected) | column config | export | primary "Create" button

Bulk action bar (above table, shows when ≥1 selected)
├── "{N} selected" — 13/500
├── Action buttons (Pause, Update budget, Update dates, Archive) — Button variant=outline size=sm
└── Right: × close

Table body
├── Sticky header — 36px, 12/500 caps, color var(--osmos-fg-muted), bg var(--osmos-bg-subtle)
│   ├── Checkbox column — 40px wide, centered
│   ├── Status column — 80px, Badge component
│   ├── Name column — flex-1, 240px min, with row-hover-revealed actions on right
│   ├── Numeric columns (Spend, Impressions, ROAS) — right-aligned, tabular-nums, 13/500
│   └── Date column — 120px
├── Body rows — 32px height, hover bg var(--osmos-bg-subtle), 13/400 body text, var(--osmos-spacing-3) horizontal padding
└── No internal row borders (use bg-subtle alternation if needed for groups, never zebra-stripe)

Footer: Pagination component (page size selector, page nav, total count)
```

**Components:** `Toolbar`, `Input`, `Button`, `Badge`, `Pagination`, `Checkbox`. The table itself is raw `<table>` HTML (this is the Osmos convention — see ia-patterns.md).

**Don't:** Hide bulk actions in a kebab. Use card grid. Add inline expandable rows on Pulse (use Drawer instead). Use icons for column headers (use words).

**Judgment call:** Whether the row hover reveals action buttons (icon-only) or shows them always. Default: reveal-on-hover for ad-ops density. Show-always for advertiser portal.

---

## Recipe 4: Drawer (edit flow with row context)

**When:** User clicked "Edit" on a row, needs to modify 4-10 fields, wants to keep the surrounding table visible.

```
Drawer right side, 480px wide (640px if rich content like ad creative + preview)
├── Header — 56px, var(--osmos-spacing-4) horizontal padding
│   ├── Title (16/600) + subtitle (12/400 muted) showing what's being edited
│   └── Close × (top right, 32×32px button hover bg)
├── Body — scrollable, var(--osmos-spacing-6) padding, var(--osmos-spacing-5) gap between fields
│   ├── Each field: Label (13/500 above) + Input (40px tall) + Helper text (12/400 muted below if present)
│   ├── Group related fields with section heading (14/600) and divider (1px var(--osmos-border))
│   └── Required fields marked with * after label (color var(--alert-error-primary))
└── Footer — 64px, sticky bottom, var(--osmos-spacing-4) horizontal, top border
    ├── Left: secondary "Cancel" (variant=outline)
    ├── Right: primary "Save changes" (variant=primary, disabled when no changes)
    └── Optional: "Save and create another" between (only if frequent action)
```

**Components:** `Drawer`, `Input`, `Select`, `Button`, `Label`.

**Don't:** Open a centered modal for >3 fields. Put the close X in the body. Forget the unsaved-changes confirm dialog.

**Judgment call:** Width. Default 480px. Go to 640 if there's a preview pane (ad creative editor) or if the form has 2 logical columns (rare).

---

## Recipe 5: Modal (destructive confirmation)

**When:** Irreversible action (delete, archive, cancel campaign).

```
Modal centered, 440px wide, var(--osmos-radii-xl) (12px) corners, var(--osmos-shadows-2xl)
├── Header — var(--osmos-spacing-6) padding, no separator
│   ├── Icon (48×48, color var(--alert-error-primary)) — for destructive only
│   └── Title (18/600) — "Delete [thing]?"
├── Body — var(--osmos-spacing-6) horizontal, var(--osmos-spacing-3) bottom
│   └── Description (14/400) explaining what will happen, naming consequences specifically
└── Footer — var(--osmos-spacing-6) padding, var(--osmos-spacing-3) gap, right-aligned
    ├── Cancel (variant=outline, size=md)
    └── "Delete" (variant=danger, size=md)
```

**Critical:** The destructive button uses the verb ("Delete", "Archive"), not "Confirm" or "Yes". This is a Hick's Law correction — the user's eye and finger need to confirm what's about to happen before clicking.

**Don't:** Auto-focus the destructive button. Allow Enter to confirm without explicit button click. Dismiss on outside-click for destructive modals.

---

## Recipe 6: Dashboard (KPI row + chart + supporting tables)

**When:** Overview surface — Pulse home, advertiser dashboard.

```
Page header (Toolbar pattern)
├── Title (20/600) + subtitle with date range
└── Right: date range picker, refresh, export

KPI row — grid 5 cols × 1 row (or 4 cols if fewer metrics)
├── Hero KPI — 2 cols wide, larger card, big number (28/600), delta + sparkline
└── Supporting KPIs — 1 col each, smaller card, number (20/600), delta only

Chart section (full width)
├── Section heading (16/600) + chart-type tabs (Line / Bar / Stacked)
└── Chart canvas — 320px tall on desktop, library-rendered, dark-mode-aware tokens

Supporting tables (2 cols × 1 row)
├── Top campaigns by spend — compact table, 5 rows
└── Recent activity — compact list with timestamps
```

**Components:** `Toolbar`, `SectionCard`, `Card`, plus chart library (Highcharts via package).

**Don't:** Show 6+ KPI cards in one row at equal weight. Use a pie chart. Use stacked bars when totals don't matter. Forget the dark-mode chart palette.

**Judgment call:** Whether to add a "compare to previous period" toggle on the KPI row. Default yes for Pulse, optional for Advertiser. Powers the delta values.

---

## Recipe 7: Form (multi-section, single page)

**When:** Settings, campaign create wizard step, account edit.

```
Page max-width 720px centered
├── Page title (20/600) + subtitle (13/400 muted) — top, var(--osmos-spacing-8) bottom
├── Sections — each is a Card with var(--osmos-spacing-6) padding
│   ├── Section heading (14/600) + helper text (12/400 muted)
│   ├── Spacing var(--osmos-spacing-4)
│   ├── Fields — single column, var(--osmos-spacing-4) gap
│   │   └── Label (13/500) + Input (40px) + Helper (12/400 muted)
│   └── Last section bottom: no shadow (handled in footer)
└── Footer — sticky bottom on scroll, blur backdrop
    ├── Left: "Discard changes" (variant=ghost, only if dirty)
    └── Right: Primary "Save" (variant=primary)
```

**Don't:** Two-column forms (rare exception: paired fields like first/last name). Vertical tabs on a single-page form (use anchored sections). Save button in the top toolbar (use sticky footer).

---

## Recipe 8: Toolbar / Page Header

**When:** Top of every working page.

```
Toolbar — 56px tall, var(--osmos-spacing-6) horizontal padding, bottom border
├── Left
│   ├── Breadcrumb (12/400 muted) — only if depth >2
│   ├── Title (20/600)
│   └── Optional subtitle / status (12/400)
└── Right
    ├── Secondary actions (Filter, Sort, Export — Button variant=outline size=md)
    └── Primary CTA (Button variant=primary, size=md)
```

**Don't:** Stack title and CTA vertically. Put navigation tabs in the Toolbar (use a dedicated TabBar below). Use icon-only primary CTA on Pulse (always include label).

---

## Recipe 9: Status Badge

**When:** Inline row-level state (campaign Active / Paused / Draft / Archived).

```
Badge component
├── Size: sm (height 20px, padding 4×8, font 11/500)
├── Color mapping (semantic):
│   ├── Active → var(--osmos-brand-green-muted) bg, var(--osmos-brand-green) text
│   ├── Paused → var(--osmos-brand-amber)-muted bg, --osmos-brand-amber text
│   ├── Draft → var(--osmos-bg-muted) bg, var(--osmos-fg-muted) text
│   ├── Archived → var(--osmos-bg-subtle) bg, var(--osmos-fg-subtle) text
│   └── Error → var(--alert-error-muted) bg, var(--alert-error-primary) text
└── Optional dot indicator (6px circle) for "live" states (Active, Paused) — pulse animation only on Active
```

**Don't:** Use color alone (add dot or icon for accessibility). Use brand-primary for status (reserve for actions). Apply pulse animation to non-live states.

---

## Recipe 10: KPI Card (single metric tile)

**When:** Dashboard, summary surfaces.

```
Card — var(--osmos-spacing-5) padding, var(--osmos-radii-xl) (12px), border 1px var(--osmos-border)
├── Label row
│   ├── Metric name (12/500 caps, color var(--osmos-fg-muted)) on left
│   └── Info icon (14×14, hover tooltip) on right — explaining what the metric measures
├── Spacing var(--osmos-spacing-3)
├── Value — 24/600 (or 28/600 for hero KPI), tabular-nums
├── Spacing var(--osmos-spacing-2)
├── Delta row
│   ├── Arrow icon + percent (14/500) — green for positive metrics moving up, red for negative
│   └── Comparison period (12/400 muted) — "vs. previous 7 days"
└── Spacing var(--osmos-spacing-3)
└── Optional sparkline — 60px tall, sparse points, no axis labels
```

**Don't:** Use big icons next to the number (distracts from the value). Stack 4 metrics in one card (split them). Show delta without comparison period (ambiguous).

---

## How to use these recipes

These are starting points, not laws. When the user's brief calls for a recipe:

1. Find the closest recipe match
2. Apply the constraint matrix from `osmos-constraints.md` (does the portal/persona shift any defaults?)
3. Modify specific values where the user's brief justifies it (e.g. "we need 8 columns visible, not 12, because the data is denser per cell")
4. Name the deviations from the default in the recipe's "Judgment call" section
5. Run anti-pattern check from `anti-patterns.md`

Don't paste a recipe verbatim if the constraints say it should differ. The recipe is a thinking tool, not a template.
