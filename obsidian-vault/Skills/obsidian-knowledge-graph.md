---
type: skill
name: obsidian-knowledge-graph
category: knowledge
requires-figma-mcp: false
auto-fixes: true
last-updated: 2026-04-29T18:00:00Z
tags: [skill, knowledge, vault]
---

# obsidian-knowledge-graph

Builds or rebuilds this Obsidian vault from three source knowledge systems.

## Sources

- `.claude/skills/figma-batch-builder/knowledge-graph.md` — wired pages, Figma frames, nav structure
- `src/ui/index.js` — component library exports
- `src/retailer/components/` + `src/advertiser/components/` — page import scanning
- `.claude/skills/` — all installed skills

## Output Structure

```
obsidian-vault/
├── index.md
├── _meta/
├── Components/  (atoms / molecules / patterns)
├── Pages/       (one note per component file)
├── Navigation/  (full LeftNav tree)
├── Figma/       (frames/)
├── Tokens/      (audit.md)
└── Skills/      (one note per skill)
```

## Triggers

- [[Skills/figma-batch-builder]] — triggers full rebuild after new screens wired
- PostToolUse hook in `.claude/settings.json` — incremental sync on every `src/` file write

## Vault Schema

See `.claude/skills/obsidian-knowledge-graph/vault-schema.md` for all note templates.
