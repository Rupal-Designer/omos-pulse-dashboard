---
type: skill
name: osmos-design-translator
category: design-pipeline
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-05-05T00:00:00Z
tags: [skill, design-pipeline, judgment-layer, visual-craft]
---

# osmos-design-translator

The judgment layer between broad design inspiration and Osmos-specific output. Sits between [[Skills/ux-ideator]] (strategy) and [[Skills/react-implementer]] (execution). Produces concrete recipes anchored to Osmos tokens, `src/ui/` components, and ad-ops density requirements.

## What it does (and doesn't)

| Does | Doesn't |
|---|---|
| Takes a reference (screenshot, Figma URL, "make it like Linear") and produces an Osmos-clipped recipe | Generate palettes from scratch — that's `osmos-figma-tokens` |
| Catches generic-SaaS lookalike traps with named fixes | Migrate shadcn code — that's [[Skills/shadcn-to-osmos]] |
| Names the one contestable judgment call in every recipe | Audit hardcoded values — that's [[Skills/token-enforcer]] |
| Asks ONE question if portal/persona is ambiguous, then proceeds | Implement React code — that's [[Skills/react-implementer]] |
| Outputs structured recipes consumable by react-implementer or figma-wireframer | Score quality — that's [[Skills/design-critic]] |

## 5-phase pipeline

1. **Inspiration capture** — describe the reference in observable terms ("the tight 8px row height with hover-revealed actions" not "the table layout")
2. **Constraint mapping** — portal (Pulse / Advertiser / OsmosX), persona density target, surface type, dark-mode parity
3. **Translation** — concrete tokens, exact `src/ui/` imports, layout numbers, type ramp, all states (default/hover/focus/disabled/loading/empty/error)
4. **Anti-pattern check** — walk the 10 traps; name any triggered + the specific fix
5. **Output** — structured recipe + named judgment call

## Reference files

| File | Purpose | Read when |
|---|---|---|
| `references/osmos-constraints.md` | Non-negotiables (portal density, nav shell, tokens, dark mode parity, type ramp, state coverage) | FIRST, every invocation |
| `references/decision-trees.md` | 8 branching trees (surface, persona, empty state, modal vs drawer, visual interest, chart, page vs tab, when to break a rule) | Phase 2 |
| `references/component-recipes.md` | 10 concrete recipes (empty states, tables, drawers, modals, dashboards, forms, toolbars, badges, KPI cards) | Phase 3 |
| `references/anti-patterns.md` | 6 generic-SaaS traps + 4 Osmos-specific traps | Phase 4 |
| `references/reference-projects.md` | Linear, Vercel, Stripe, Notion, GitHub, Atlassian, Carbon — annotated with what to steal/drop for Osmos | Phase 1 if user names one |
| `references/laws.md` | UX laws indexed by decision (Hick's, Fitts's, Tesler's, Aesthetic-Usability, Doherty, Peak-End, WCAG, Pareto, Common Region, Proximity) | Phase 4 |

## Activation triggers

- "make this look better" / "add visual interest" / "this feels generic"
- "this looks like every other B2B SaaS"
- "translate this Linear/Vercel/Stripe pattern to Osmos"
- "what's the right way to design [a thing] in Osmos"
- "design this empty state / dashboard / form / table with craft"

## How it integrates

```
                                 osmos-design-translator
                                          ▲
                                          │ "translate this to Osmos"
                                          │
ux-ideator → (Phase 3.5 lo-fi recipes) ───┤
                                          │
ux-ideator → (Phase 6 Step 1 visual) ─────┤
                                          │
direct user invocation ───────────────────┘

 → produces recipe → react-implementer | figma-wireframer
```

When invoked from `ux-ideator`, returns ONLY the structured recipe (no IA discussion). When invoked directly, full 5-phase flow applies.

## Output schema

```markdown
# Osmos Recipe: [Artifact name]
**Inspiration anchor:** [what we're stealing]
**Portal:** Pulse | Advertiser | OsmosX
**Surface type:** [list/table | form | dashboard | empty state | modal | drawer | toolbar]
**Persona density target:** ad-ops-power | advertiser-mid | first-time-user

## Tokens
- Spacing rhythm, colors (only var(--osmos-*)), type ramp, radius, shadow

## Components (src/ui/ only)
- [Component]: [purpose, key props]

## Layout
[ASCII or structural with concrete numbers]

## States
Default / Hover / Focus / Disabled / Loading / Empty / Error

## Anti-patterns avoided
- [Trap name]: [how this recipe avoids it]

## Judgment call
[The one contestable decision and conditions to flip it]

## Hands off to
- react-implementer | figma-wireframer | ux-ideator (if upstream IA needs revisiting)
```

## Anti-anti-pattern: it has opinions

Refuses to produce a recipe without portal context, persona, or surface type. If the brief is ambiguous, asks **one** question — then proceeds with one opinionated recipe. Never generates three concepts. Never asks five clarifying questions.

## Related

- [[Skills/ux-ideator]] — invokes this at Phase 3.5 + Phase 6 Step 1
- [[Skills/react-implementer]] — consumes the recipe to write code
- [[Skills/figma-wireframer]] — consumes the recipe to build hi-fi
- [[Skills/token-enforcer]] — runs after to audit final code against tokens used in recipe
- [[Skills/design-critic]] — separate skill for scoring/critiquing

## Source

`/Users/rishikeshjoshi/OMOS TEST/.claude/skills/osmos-design-translator/`
