---
name: osmos-design-translator
description: "The judgment layer between broad design inspiration and Osmos-specific output. Use whenever someone says 'make this look better', 'why does this feel generic', 'this looks like every other B2B SaaS', 'add visual interest', 'translate this Linear/Vercel/Stripe pattern to Osmos', 'design this dashboard/form/table/empty state with craft', 'what's the right pattern for X in Osmos', 'how do we avoid the generic SaaS look', or shares a screenshot of a well-designed product and wants to adapt it. Sits between ux-ideator (strategy) and react-implementer (execution) — feeds both. Produces concrete recipes anchored to Osmos tokens, src/ui/ components, and ad-ops density requirements."
---

# Osmos Design Translator

A judgment engine that takes broad design inspiration and clips it to Osmos.

The fundamental problem: most design skills are data dumps (palettes, fonts, stacks). They tell you *what's available* but not *what's right*. This skill is opinionated. It knows Osmos is a B2B retail media OS used by ad ops managers running 200 campaigns at once on a dark nav shell with `--osmos-*` tokens — and it makes design decisions accordingly.

What it does NOT do:
- Generate color palettes from scratch (that's `osmos-figma-tokens`)
- Migrate shadcn code (that's `shadcn-to-osmos`)
- Audit hardcoded values (that's `token-enforcer`)
- Propose IA / screen inventory (that's `ux-ideator`)
- Implement React (that's `react-implementer`)

What it DOES:
- Takes a reference (screenshot, Figma URL, "make this like Linear's settings page", text description) and produces an **Osmos-clipped recipe** — concrete tokens, components, layout, and constraints
- Catches anti-patterns ("this is the generic B2B SaaS dashboard trap")
- Names what to steal from the reference and what to drop because it doesn't fit Osmos density / persona / portal
- Outputs a structured recipe consumable by `react-implementer` or `figma-wireframer`

---

## Reference files (read at the phases noted)

> - `references/osmos-constraints.md` — non-negotiable Osmos rules: nav shell, density, persona density, portal contracts, dark mode parity. Read FIRST on every invocation.
> - `references/decision-trees.md` — "if you're building X, check Y" branching logic. Read at Phase 2 (constraint mapping).
> - `references/anti-patterns.md` — generic-SaaS traps with named examples. Read at Phase 4 (anti-pattern check).
> - `references/component-recipes.md` — concrete recipes for empty states, tables, forms, dashboards, drawers, modals, toolbars. Read at Phase 3 (translation) when the artifact maps to a recipe.
> - `references/reference-projects.md` — best-in-class examples (Linear, Vercel, Stripe, Atlassian, Polaris, Carbon, GitHub Primer) annotated with what to steal vs. what to drop for Osmos. Read at Phase 1 if user references one of them.
> - `references/laws.md` — UX laws and design rules indexed by decision type. Read at Phase 4 to verify recipe against universal principles.

---

## Activation triggers (refine: not just "any design question")

This skill activates ONLY when the user wants to translate inspiration → Osmos. Not when they want raw exploration, not when they want IA, not when they want to migrate code.

**ACTIVATE when user says:**
- "make this look better" / "add visual interest" / "this feels generic"
- "this looks like every other B2B SaaS"
- "translate [Linear/Vercel/Stripe/named product] pattern to Osmos"
- "what's the right way to design [a thing] in Osmos"
- "design this [empty state/dashboard/form/table] with craft"
- "how should this feel"
- Pastes a screenshot/Figma URL and asks "how would we do this in Osmos"

**DO NOT ACTIVATE when:**
- User wants information architecture → use `ux-ideator`
- User wants migration → use `shadcn-to-osmos`
- User wants token audit → use `token-enforcer`
- User wants implementation → use `react-implementer`
- User wants critique → use `design-critic`

---

## Pipeline (5 phases, runs in this session — not as sub-agents)

### Phase 1 — Inspiration Capture

Identify the reference. Three input shapes:

1. **Named reference** — "make it like Linear's settings page" → look up in `references/reference-projects.md` for the curated annotation
2. **Screenshot / Figma URL** — describe what's visible in plain text (component types, density, color usage, spacing rhythm, typography weight contrast)
3. **Text only** — "I want this to feel premium / modern / fast / dense / playful" → translate the feeling into observable design properties (e.g. "premium" → tighter type leading, restrained color, generous whitespace where it doesn't hurt density)

**Output:** a 3-5 line "what we're stealing" summary. Be specific — *"the tight 8px row height with hover-revealed actions"* not *"the table layout."*

### Phase 2 — Constraint Mapping

Read `references/osmos-constraints.md` and `references/decision-trees.md`. Map the inspiration against:

- **Portal context** — Pulse (ad ops, dark nav, dense) vs. Advertiser Portal (lighter, more guided) vs. OsmosX (brand-side, marketing-grade polish acceptable)
- **Persona density target** — ad ops manager (200 campaigns) needs density; first-time advertiser needs guidance
- **Surface type** — list/table, form, dashboard, empty state, modal/drawer, marketing surface
- **State coverage** — does this surface have empty/loading/error states? They are part of the recipe, not afterthoughts
- **Dark mode parity** — every recipe MUST work in both modes; if the inspiration is light-mode-only, name what changes in dark

**Output:** a constraint matrix — what from the inspiration survives, what must change, what must be added (e.g. "Linear's spacing rhythm — keep. Linear's color usage — replace with Osmos brand tokens. Linear doesn't have a dark/light toggle in this view — we need both.")

### Phase 3 — Translation

Read the relevant section of `references/component-recipes.md` for the artifact type. Produce a concrete recipe with:

- **Tokens** — exact `--osmos-*` variables for spacing, color, typography, radius, shadow
- **Components** — exact `src/ui/` imports (Card, Button, Input, Badge, etc.) — never invent new components
- **Layout** — grid / flex structure with concrete numbers (px, %, fr)
- **Type ramp** — concrete sizes and weights for hierarchy (e.g. heading 16/600, body 13/400, caption 12/400)
- **Interaction** — hover/focus/disabled/loading states named explicitly
- **Empty/error/loading states** — present, not deferred

**Output format:** structured recipe (see "Recipe schema" below).

### Phase 4 — Anti-Pattern Check

Read `references/anti-patterns.md`. Check the recipe against:

- The 6 generic-SaaS traps (gradient hero, kitchen-sink dashboard, undifferentiated card grid, etc.)
- The 4 Osmos-specific traps (hidden bulk actions, advertiser-portal-density-on-Pulse, dark-mode-afterthought, infinite-table-scroll without pagination)

Read `references/laws.md` for any law triggered by the artifact type (Hick's, Fitts', Miller's, Aesthetic-Usability, etc.).

If a trap is hit: name it, explain why it triggers in this recipe, propose the specific fix. Do not silently fix — call it out.

### Phase 5 — Output

Produce the final recipe in the schema below, plus a 2-3 line "judgment call" paragraph naming the *one* contestable decision in the recipe (e.g. "I went tight on row height — 32px not 40px. Open to going looser if Pulse advertiser-side users are the primary persona, but Pulse ad ops users will thank us for the density.")

---

## Recipe schema

```markdown
# Osmos Recipe: [Artifact name]

**Inspiration anchor:** [3-5 line summary from Phase 1 — what we're stealing]
**Portal:** Pulse | Advertiser | OsmosX
**Surface type:** [list/table | form | dashboard | empty state | modal | drawer | toolbar | marketing]
**Persona density target:** ad-ops-power | advertiser-mid | first-time-user

## Tokens
- Spacing rhythm: var(--osmos-spacing-*) progression — name the scale
- Colors: only var(--osmos-*) tokens — list every one used
- Typography: ramp (size/weight) — list every step
- Radius: var(--osmos-radii-*) — name it
- Shadow: var(--osmos-shadows-*) or "none — flat surface"

## Components (src/ui/ only)
- [Component]: [purpose, key props]
- (...)

## Layout
[ASCII or structural description with concrete numbers]

## States
- Default: [...]
- Hover: [...]
- Focus: [...]
- Disabled: [...]
- Loading: [...]
- Empty: [...]
- Error: [...]

## Anti-patterns avoided
- [Trap name]: [how this recipe avoids it]

## Judgment call
[The one contestable decision and the conditions under which to flip it]

## Hands off to
- react-implementer (for code) | figma-wireframer (for hi-fi) | ux-ideator (if upstream IA needs revisiting)
```

---

## How this skill connects to others

```
                                  osmos-design-translator
                                          ▲
                                          │ "translate this to Osmos"
                                          │
ux-ideator → (Phase 3 lo-fi consults) ────┤
                                          │
ux-ideator → (Phase 6 final UI consults) ─┤
                                          │
direct user invocation ───────────────────┘

osmos-design-translator → produces recipe → react-implementer (code) | figma-wireframer (hi-fi)
```

When invoked from `ux-ideator` Phase 3, return ONLY the recipe — don't restart the IA conversation. When invoked directly, the full 5-phase flow applies.

---

## Anti-anti-pattern: do not become a data dump

This skill has strong opinions. It says "no" to inspirations that don't fit Osmos. It names judgment calls explicitly. It refuses to produce a recipe without a portal context, persona, or surface type.

If the user gives an ambiguous brief ("make the dashboard nicer"), the skill asks **one** question — which surface, which persona — and proceeds. It does not generate three concepts. It does not ask five clarifying questions. One question, one opinionated recipe.
