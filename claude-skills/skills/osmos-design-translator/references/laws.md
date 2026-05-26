# Laws of UX — Indexed by Decision Type

When checking a recipe at Phase 4, look up the relevant law(s) for the decision being made. Each law has: when it applies, the rule, and the Osmos-specific implication.

---

## Decision: How many options to show

### Hick's Law
**Rule:** Decision time scales logarithmically with the number of options.

**When applies:** Designing menus, dashboards with many KPIs, action lists.

**Osmos implication:** A dashboard with 4 KPIs + 1 hero is faster to read than a dashboard with 8 equal KPIs. Always elevate one option to be visually 2x weight (size, color, position).

### Miller's Law
**Rule:** Working memory holds 7±2 items.

**When applies:** Lists, navigation menus, table column counts, multi-step forms.

**Osmos implication:** Top-level nav has 6 items, not 12. Wizard steps cap at 5. Table columns visible by default cap at ~9 on Pulse, ~7 on Advertiser, ~5 on OsmosX.

---

## Decision: How to lay out interactive elements

### Fitts's Law
**Rule:** Time to acquire a target = function of distance + size. Bigger and closer = faster.

**When applies:** Button placement, primary actions, destructive confirm distance.

**Osmos implication:** Primary CTAs are at least 40px tall on Pulse, 44px on Advertiser. Destructive actions are NOT placed close to non-destructive actions (Cancel and Delete have visible separation in Recipe 5). Save buttons are sticky at the bottom of forms because that's where the eye lands after the last field.

### Tesler's Law (Law of Conservation of Complexity)
**Rule:** Every system has irreducible complexity. The question is: who absorbs it — the user or the designer?

**When applies:** Designing power-user features (bulk actions, advanced filters, agentic debugger).

**Osmos implication:** Ad ops managers WILL absorb complexity (they expect 12 columns, keyboard shortcuts, advanced filters). First-time advertisers will NOT (they get a guided wizard, hidden advanced options). The complexity exists either way — design decides who carries it.

---

## Decision: Visual hierarchy

### Aesthetic-Usability Effect
**Rule:** Users perceive aesthetically pleasing designs as more usable, even when they're not.

**When applies:** First impressions, executive demos, marketing surfaces (OsmosX).

**Osmos implication:** Spend more polish on first-impression surfaces (sign-in, onboarding, dashboard home). On well-trodden surfaces (campaign list, debugger), polish matters less than density and speed. This is also why marketing-style landing pages can get away with less density.

### Von Restorff Effect (Isolation Effect)
**Rule:** Items that stand out from their group are more likely to be remembered.

**When applies:** Highlighting one option (the recommended one, the AI-suggested one, the new feature).

**Osmos implication:** "Use AI Suggestion" buttons on Sofie suggestions get accent color (`--osmos-brand-primary`) while sibling actions stay neutral. New badges (`--osmos-brand-amber-muted`) on newly released features. Don't overuse — if everything stands out, nothing does.

---

## Decision: How quickly to respond

### Doherty Threshold
**Rule:** Productivity soars when system response is <400ms.

**When applies:** Any interactive element on a power-user surface.

**Osmos implication:** Keyboard navigation between table rows must be <100ms. Filter application <300ms. Drawer open <200ms. If a backend operation is slower, fake it locally first (optimistic UI) and reconcile on response.

### Goal-Gradient Effect
**Rule:** Users accelerate as they near a goal.

**When applies:** Wizards, multi-step forms, onboarding flows.

**Osmos implication:** Show progress (3 of 5 steps). Final step gets a celebratory micro-animation on completion (Zara territory). Pre-fill optional fields when possible to reduce time-to-finish.

---

## Decision: Trust and credibility

### Jakob's Law
**Rule:** Users spend most of their time on OTHER sites. They expect your site to work like the ones they know.

**When applies:** Conventional patterns (logout in top-right, settings under user menu, save buttons at bottom-right).

**Osmos implication:** Don't break conventions just to be different. Innovate on the *unique* parts of Osmos (campaign debugger, agentic AI, attribution) — but for nav, menus, forms, follow ad-tech industry conventions (which mirror Stripe, Meta Ads Manager, Google Ads).

### Peak-End Rule
**Rule:** Users judge an experience by its peak (best/worst moment) and its ending.

**When applies:** Multi-step flows (campaign creation, debugging session), long-running operations.

**Osmos implication:** Don't end campaign create with "Saved." End with "Campaign created. Ad spend will start within 2 hours. We'll alert you when first impression serves." Make the ending payoff specific. The peak should be a delight moment — first campaign launch animation, debugger insight, optimization accept.

---

## Decision: Accessibility & inclusion

### WCAG 2.1 AA — minimum bars to cite

| Decision | Bar |
|---|---|
| Body text contrast | 4.5:1 against background |
| Large text (18+ or 14+ bold) | 3:1 |
| Interactive element (button, link) contrast | 3:1 against bg AND adjacent colors |
| Focus indicator | Visible, 2px outline, 3:1 contrast against bg |
| Color alone | Never. Always pair with shape/icon/text. |
| Touch target | 44×44px minimum (Apple HIG matches) |

**Osmos implication:** Status badges always have a dot or icon, not just color. Charts have pattern + color. Hover states are not the only feedback (focus must work too).

### Postel's Law (Robustness Principle)
**Rule:** Be conservative in what you do, be liberal in what you accept from others.

**When applies:** Form input parsing.

**Osmos implication:** Accept budget input as "5,000", "5000", "5K", "$5,000" — normalize to number internally. Date fields should accept multiple formats. Phone numbers should accept with/without country code. The UI does the work, not the user.

---

## Decision: Information density

### Pareto Principle (80/20)
**Rule:** 80% of users only do 20% of available actions.

**When applies:** Power-user features on otherwise mass-market surfaces.

**Osmos implication:** Default surfaces show the 20% (active campaigns, today's spend, top KPI). Advanced features ("Manage CSV bulk upload", "Configure API integration") are accessible via menus but not on the default view. Pulse vs. Advertiser portal density splits along this line — Pulse shows more of the 20% by default because power users use more.

### Law of Common Region
**Rule:** Elements in the same region (border, bg color, container) are perceived as related.

**When applies:** Card grouping, form sections, filter groups.

**Osmos implication:** Use Card or SectionCard to group related fields. Don't rely on whitespace alone for grouping in dense surfaces — the user's eye won't trace it. On dashboards, KPIs that are related (e.g. all spend metrics) sit in the same Card.

### Law of Proximity
**Rule:** Elements near each other are perceived as related.

**When applies:** Spacing decisions in forms, between table rows, between actions.

**Osmos implication:** Form fields use `--osmos-spacing-4` between them, `--osmos-spacing-6` between sections. Action button groups use `--osmos-spacing-2` (tight) for related actions, `--osmos-spacing-6` to separate destructive from constructive.

---

## Decision: Reducing friction

### Occam's Razor
**Rule:** Among competing solutions, the simplest is usually best.

**When applies:** Every design decision.

**Osmos implication:** If you can use a simpler component, use it. If you can drop a feature without the user noticing, drop it. Add complexity only when the data demands it (Tesler's Law).

### Law of Prägnanz
**Rule:** Users perceive the simplest possible form.

**When applies:** Visual structure, layout, iconography.

**Osmos implication:** Icons should be recognizable as their type at 16px. Layout grids should follow a simple repeating rhythm (8px / 12-col). Type hierarchy uses 3-4 sizes max, not 8.

---

## How to use this file

At Phase 4 anti-pattern check, for each major decision in the recipe, look up the relevant law:

- "Why this many KPI cards?" → Hick's, Miller's
- "Why this button placement?" → Fitts's, Aesthetic-Usability
- "Why this contrast?" → WCAG 2.1 AA
- "Why this animation?" → Doherty, Peak-End
- "Why this empty state copy?" → Peak-End, Goal-Gradient

If the recipe doesn't satisfy the law, fix the recipe. If the law doesn't apply, skip it. Don't cite laws as a checklist — cite them when they explain a specific decision.

Sources: Laws of UX (lawsofux.com), Refactoring UI (Schoger), WCAG 2.1, Anthony Hobday's "Visual design rules you can safely follow every time."
