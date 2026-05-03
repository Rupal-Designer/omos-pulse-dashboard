---
name: obsidian-knowledge-graph
description: "Build or rebuild the Obsidian knowledge vault for this repo. Use when someone says 'sync obsidian', 'rebuild the vault', 'update knowledge graph', 'document components', 'refresh vault', 'generate obsidian notes', 'obsidian sync', 'update the obsidian vault', or 'build obsidian'. Also trigger automatically after a full figma-batch-builder run to register new screens and components in the vault."
---

# Obsidian Knowledge Graph

Synthesizes existing knowledge sources into a live, interlinked Obsidian vault at `obsidian-vault/`.

**Sources consumed (read-only):**
- `.claude/skills/figma-batch-builder/knowledge-graph.md` — wired pages, Figma frames, nav structure, component patterns
- `.claude/skills/` — all installed skills (one vault note per skill)
- `src/ui/index.js` — shared component library exports
- `src/retailer/components/*.jsx` — retailer page component sources (imports, screen types)
- `src/advertiser/components/*.jsx` — advertiser page component sources
- `graphify-out/GRAPH_REPORT.md` — community/hub context

**Output:** `obsidian-vault/` — Obsidian-compatible Markdown with YAML frontmatter and `[[wikilinks]]`.

---

## Phase 0 — Pre-flight

Read the vault schema before writing a single note:
```
.claude/skills/obsidian-knowledge-graph/vault-schema.md
```

Then check the last full rebuild:
```
obsidian-vault/_meta/last-sync.md   (may not exist yet — that's fine)
```

Then load source data in parallel:
1. `.claude/skills/figma-batch-builder/knowledge-graph.md` — full file
2. `src/ui/index.js` — component exports
3. `graphify-out/GRAPH_REPORT.md` — community/hub context

> If `knowledge-graph.md` cannot be read, stop and tell the user — the vault rebuild requires it.

---

## Phase 1 — Component Inventory

**Goal:** Build a list of every reusable component + which pages use it.

1. Parse `src/ui/index.js` exports → categorize as `atom` or `molecule` or `pattern`
2. For each export, read its source file (e.g. `src/ui/atoms/Button.jsx`) to extract:
   - Named export name
   - Props (from destructured params or JSDoc `@param`)
   - Brief description from first JSDoc comment if present
3. Scan `src/retailer/components/*.jsx` import statements to build a **reverse map**: component → list of retailer pages that import it
4. Scan `src/advertiser/components/*.jsx` import statements to build the same reverse map for advertiser pages

**Note:** Page source files are at `src/retailer/components/` and `src/advertiser/components/`. There is no `src/components/` directory — do not use that path.

Result: a structured list ready to become `Components/atoms/*.md` and `Components/molecules/*.md` notes.

---

## Phase 2 — Page Inventory

**Goal:** One note per wired page, fully cross-linked.

1. Parse **§1 Wired Pages Registry** table from `knowledge-graph.md`
2. For each row (nav-id, component file, section, group, screen type):
   - Read `src/components/{ComponentFile}` — extract top-level import statements that match UI components
   - This gives the "Components Used" wikilinks for the page note
3. Also list **unwired pages** (in LeftNav, no App.jsx case) from §1 with a `status: unwired` frontmatter tag

Result: data for `Pages/index.md` + one `Pages/{ComponentName}.md` per page.

---

## Phase 3 — Skills Inventory

**Goal:** One note per skill in `.claude/skills/`, cross-linked to the components and pages they operate on.

1. List all subdirectories in `.claude/skills/` — each is a skill
2. For each skill, read its `SKILL.md` frontmatter and first section to extract:
   - `name` — from YAML frontmatter
   - `description` — from YAML frontmatter (truncate to 2 sentences for the note)
   - **Category** — classify as one of: `design-pipeline`, `code-quality`, `ux-research`, `knowledge`
   - **Requires Figma MCP?** — yes if SKILL.md mentions `use_figma`, `figma MCP`, or `figma-batch-builder`
   - **Auto-fixes?** — yes if SKILL.md describes applying edits or auto-replacing
   - **Key arguments** — list `--flag` patterns found in SKILL.md
3. Note which components each skill operates on (e.g. `component-reuse-enforcer` → links to all `src/ui/` components; `token-enforcer` → links to Tokens/audit)

**Skill categories:**

| Category | Skills |
|---|---|
| `design-pipeline` | screen-interpreter, figma-wireframer, figma-batch-builder, react-implementer, design-orchestrator, ux-ideator |
| `code-quality` | token-enforcer, lineicon-enforcer, component-reuse-enforcer, shadcn-to-osmos |
| `ux-research` | ux-auditor, design-critic |
| `knowledge` | obsidian-knowledge-graph |

Result: data for `Skills/index.md` + one `Skills/{skill-name}.md` per skill.

---

## Phase 4 — Figma Frame Inventory

**Goal:** One note per known Figma frame.

1. Parse **§7 Figma Frame ID → Screen Mapping** from `knowledge-graph.md`
2. For each frame (node ID, screen name, component file):
   - Compute the linked page note path: `[[Pages/{ComponentFile without .jsx}]]`
3. Note: Figma frame notes are informational only — do not call any Figma MCP tool during vault rebuild

Result: `Figma/frames/{FrameId}.md` for each mapped frame.

---

## Phase 4 — Nav Structure

**Goal:** A single navigable map of the left-nav tree.

Parse **§3 LeftNav Section → Group Structure** from `knowledge-graph.md` and produce `Navigation/structure.md` with:
- One H2 per top-level section (Control Center, Analytics, Finance, etc.)
- One H3 per group within a section
- Bullet list of `[[Pages/{NavId}]]` wikilinks under each group

---

## Phase 5 — Token Audit Snapshot

**Goal:** Surface hardcoded design value violations in the vault.

Run a lightweight grep (no LLM needed):
```bash
grep -rn --include="*.jsx" --include="*.css" -E "(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|px [0-9])" src/ | grep -v "node_modules" | head -80
```

Write the top violations to `Tokens/audit.md` using the token-audit note template.
If `Tokens/audit.md` already exists and `last-updated` is today, skip and reuse it.

---

## Phase 6 — Write All Vault Notes

Write notes in this order (parent directories before children):

1. `obsidian-vault/index.md` — master entry point
2. `obsidian-vault/_meta/last-sync.md` — ISO timestamp
3. `obsidian-vault/_meta/sync-log.md` — create if missing, append if exists
4. `obsidian-vault/Components/index.md` — component table
5. `obsidian-vault/Components/atoms/{Name}.md` — one per atom
6. `obsidian-vault/Components/molecules/{Name}.md` — one per molecule
7. `obsidian-vault/Pages/index.md` — full wired-pages registry table
8. `obsidian-vault/Pages/{ComponentName}.md` — one per page
9. `obsidian-vault/Navigation/structure.md` — nav tree
10. `obsidian-vault/Figma/index.md` — frame list
11. `obsidian-vault/Figma/frames/{FrameId}.md` — one per frame
12. `obsidian-vault/Tokens/audit.md` — token violations
13. `obsidian-vault/Skills/index.md` — skills registry table (all 14 skills)
14. `obsidian-vault/Skills/{skill-name}.md` — one per skill in `.claude/skills/`

**Wikilink rules:**
- Component → Pages: `[[Pages/ComponentName]]`
- Page → Components: `[[Components/atoms/Button]]` or `[[Components/molecules/StatCard]]`
- Page → Figma frame: `[[Figma/frames/13-92792]]`
- Figma frame → Page: `[[Pages/PersonaConfigPage]]`
- Nav structure → Pages: `[[Pages/ComponentName]]`
- Skill → Components it enforces: `[[Components/atoms/Button]]`
- Skill → Skill it chains to: `[[Skills/react-implementer]]`

**Never** fabricate imports or usages you did not confirm by reading source files. If unsure, omit the link and leave a `<!-- TODO: verify -->` comment.

---

## Phase 7 — Summary Report

After all notes are written, output a summary to the user:

```
✅ Obsidian vault rebuilt at obsidian-vault/

Components:   {N} atoms, {M} molecules, {P} patterns
Pages:        {W} wired, {U} unwired
Skills:       {S} documented
Figma frames: {F} mapped
Token issues: {T} violations found

Open obsidian-vault/ in Obsidian Desktop to explore.
Incremental updates active — vault syncs automatically on every src/ file save.
```

---

## Quality Rules

1. **Never invent a component usage** — only link pages to components you confirmed via import statements in the source file
2. **Frontmatter is required** — every note must have the YAML block from vault-schema.md; Obsidian Dataview won't index it otherwise
3. **Wikilinks use relative vault paths** — `[[Components/atoms/Button]]` not `[[Button]]` (avoids ambiguity)
4. **One entity per file** — do not combine two components or two pages into a single note
5. **Preserve existing wikilinks** — when updating a note that already exists, never remove wikilinks that are present in the current file unless the source confirms the relationship no longer exists
6. **Pages with no component file** — unwired pages get a note with `status: unwired`; do not fabricate a file path
7. **Figma frames are historical** — only record frames from §7 of knowledge-graph.md; never add frames by guessing
8. **Tokens/audit.md is ephemeral** — it reflects the state at rebuild time; add a `last-updated` frontmatter field so the user knows when to trust it
