# Anti-Patterns — What Not to Do

Six generic-SaaS traps and four Osmos-specific traps. Each has the symptom, why it's bad, and the specific fix.

---

## Generic-SaaS traps (industry-wide)

### 1. The Kitchen-Sink Dashboard

**Symptom:** First impression is 4 KPI cards in a row + 2 charts side-by-side + a table below + a sidebar with 5 widgets. Every metric the team wanted to surface, all at equal weight.

**Why it's bad:** Hick's Law (decision time scales log with options) is being violated. Users skim once, get overwhelmed, learn to ignore the dashboard. The "north star" metric is invisible because it's at the same visual weight as everything else.

**Fix:** One hero KPI gets 2x the visual weight (typography size, card area, color emphasis). Other metrics nest below it as supporting context. Charts are tied to that hero KPI, not floating.

**Osmos example done right:** Pulse home shows M%G as the hero metric; ad spend, impressions, ROAS are supporting context. The hero is in a card 2x wider than supporting cards.

---

### 2. The Undifferentiated Card Grid

**Symptom:** A list of items rendered as a 3-column card grid where every card looks identical — same size, same border, same internal layout. Looks "designed" but conveys no signal about which card is most important.

**Why it's bad:** Card grids work for browsing (Pinterest, Dribbble) where every item is equally browseable. They fail for working surfaces where items have meaningful priority (active campaigns vs. paused, error vs. healthy).

**Fix:** Either go to a table (where row order, color, and density convey priority cheaply) OR lean into card variation (active campaigns get a colored left border + pulse animation, paused get muted opacity). Never an undifferentiated grid for working surfaces.

**Osmos signal:** if the card grid contains anything sortable, statusful, or operational, it should be a table.

---

### 3. The Gradient Hero / Aspirational Marketing-on-Product

**Symptom:** A blue-purple gradient banner at the top of a working surface with copy like "Welcome back, ready to grow your business?" 

**Why it's bad:** Confuses marketing surfaces with product surfaces. The user came here to do a task, not be re-marketed to. Wastes prime real estate. Looks dated by 2024 standards.

**Fix:** Working surfaces get a Toolbar / Page Header with the page title, breadcrumb, and primary CTA. No gradient. No motivational copy. If the user needs onboarding nudges, they belong in an EmptyState (when relevant) or a contextual ProgressBar — not a permanent banner.

**Allowed exception:** OsmosX marketing surfaces, success states for milestone moments (first campaign launched), and signed-out / onboarding flows.

---

### 4. Toast for Everything

**Symptom:** Every action (form save, filter change, item delete, fetch error) triggers a toast in the bottom-right corner. Toasts pile up, dismiss themselves, the user misses the important ones.

**Why it's bad:** Toasts are for transient, low-priority confirmation. Using them for errors (which need attention) and for high-frequency actions (which become noise) breaks the pattern.

**Fix:** Inline confirmation for in-context save ("Saved 2 seconds ago" next to the field). Toast for *cross-context* confirmation (you saved on one screen, the toast confirms while you've moved on). Inline error for fetch failures (with retry). Modal for destructive confirmation.

**Rule of thumb:** If the user is still on the same screen, use inline. If they've navigated away, use toast.

---

### 5. The Centered-Modal Default

**Symptom:** Every action opens a centered modal with a title, body, and two-button footer (Cancel + Confirm).

**Why it's bad:** Centered modals tear the user out of context. They're appropriate for focused, terminal decisions ("Are you sure you want to delete?"). They're inappropriate for editing flows where the user needs to refer to the surrounding data.

**Fix:** Drawer (right side) for editing flows that need row context. Inline edit for single fields. Page for multi-step. Centered modal ONLY for: confirmation, simple info display, single decisions ≤3 fields.

**Litmus test:** Will the user need to look at the surrounding screen while in this UI? If yes, drawer. If no, modal.

---

### 6. The "Empty Box" Empty State

**Symptom:** No data → a stock illustration of an empty box, magnifying glass, or sad cloud, with copy "Nothing here yet" and a generic "Create" button.

**Why it's bad:** It's a missed product moment. The empty state is when the user is most uncertain about what to do next — generic copy fails them. Stock illustrations make the product look templated.

**Fix:** Specific copy referencing what should be here and why ("No campaigns yet. Once you create your first campaign, you'll see ad spend and impression trends here."). Custom illustration or icon (Osmos has a brand icon library — use it). Primary CTA labeled with the action verb, not "Create" / "Get started."

**Test:** Cover the page title — can you tell what feature this empty state is for? If not, the copy is too generic.

---

## Osmos-specific traps

### 7. Hidden Bulk Actions

**Symptom:** A table where bulk-select is enabled, but bulk actions are inside a kebab menu or only revealed after a row is selected.

**Why it's bad:** Dev's reference file is explicit: ad ops managers expect bulk actions to be **discoverable before** they select rows, not after. Hidden bulk actions force them to select first, then hunt for the action — slower than the alternative they have today (CSV export, edit in Excel, re-import).

**Fix:** Bulk action bar appears with the table, all actions visible. When 0 rows selected, actions are disabled with a tooltip ("Select rows to enable"). When ≥1 row selected, count appears next to the actions ("3 selected · Pause · Update budget · Export").

---

### 8. Advertiser-Portal Density on Pulse

**Symptom:** A Pulse table with 40px+ row height, 5 columns, big icons, gentle whitespace.

**Why it's bad:** Pulse users have 100-500 campaigns. Whitespace that looks "premium" on Advertiser portal is friction here — every line of whitespace = one less campaign visible per screen.

**Fix:** 32-36px row height, 8-12+ columns, hover-revealed actions, sticky header. The recipe should never look like Stripe Dashboard for ad ops surfaces. It should look like Linear Issues or GitHub Pull Requests — designed for high-frequency operators.

---

### 9. Dark Mode Afterthought

**Symptom:** A recipe that specifies colors as `#FFFFFF` for background, `#000000` for text, with a comment "TODO: dark mode."

**Why it's bad:** Dark mode in Osmos is not optional. ~40% of users are on dark mode. Designing for light-mode-only and porting later means dark mode always feels like an afterthought (low contrast, awkward shadow handling, illustration that disappears on dark bg).

**Fix:** Every recipe uses semantic tokens (`--osmos-fg`, `--osmos-bg`) that adapt automatically. The recipe explicitly tests one tricky case mentally — usually shadows (which are weaker in dark) and brand-muted backgrounds (which need more saturation in dark).

---

### 10. Infinite Scroll on Operational Tables

**Symptom:** A campaign list that loads 50 rows, then loads more on scroll forever.

**Why it's bad:** Operational surfaces need pagination because users need predictable position ("page 3, row 47") to refer to in conversations with teammates, in support tickets, in screenshots. Infinite scroll destroys the URL contract — you can't share "this exact list state."

**Fix:** Pagination component (already in `src/ui/`) at the bottom of the table. Page size 25, 50, 100. URL params reflect current page. `n` and `p` keyboard shortcuts to navigate.

**Allowed:** Infinite scroll on browse-style surfaces (image galleries, marketplace listings) where order doesn't matter and items are roughly equivalent.

---

## How to use this file

When checking a recipe at Phase 4:

1. Walk down all 10 traps
2. For each trap, ask "Does this recipe trigger this trap?"
3. If yes, NAME the trap in the recipe's anti-pattern section, explain how the recipe avoids it (specifically, not vaguely)
4. If the recipe DOES trigger a trap, propose the specific fix from this file before producing final output

Don't silently fix. Naming the trap is part of teaching the user — and part of building Osmos's design discipline over time.
