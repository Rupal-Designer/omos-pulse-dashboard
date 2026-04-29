# OMOS Pulse Dashboard

Retail media analytics dashboard for the OnlineSales/Localium platform. Built with React, Vite, and the Osmos design system (`@rishikeshjoshi-morpheus/ui`).

---

## Getting started

```bash
pnpm install
pnpm dev              # all three apps (chooser, retailer, advertiser)
pnpm dev:retailer     # retailer console only
pnpm dev:advertiser   # advertiser Beat console only
pnpm build
```

---

## Claude Code setup (for forks)

This repo ships with a full Claude Code skill suite in `.claude/skills/`. Some skills work immediately after cloning; others require external tools or plugins that are **not committed to git**.

### Skills that work immediately

No setup needed — pure file reads and code generation:

| Skill | What it does |
|-------|-------------|
| `react-implementer` | Generates production React from a Screen Spec or wireframe |
| `token-enforcer` | Audits JSX/CSS for hardcoded design values |
| `lineicon-enforcer` | Replaces hand-rolled SVG icons with design-system icons |
| `shadcn-to-osmos` | Migrates shadcn/ui + Tailwind pages to Osmos components |
| `ux-auditor` | UX honeycomb audit on any screen or code |
| `design-critic` | Multi-agent design critique |
| `obsidian-knowledge-graph` | Builds an Obsidian vault from component + page metadata |

### Skills that need the Figma MCP

These skills call the Figma API via an MCP server. Without it they either fail or fall back to screenshot-only mode:

| Skill | Degraded without MCP |
|-------|---------------------|
| `figma-batch-builder` | Fully blocked — requires Figma node access |
| `figma-wireframer` | Fully blocked |
| `screen-interpreter` | Works for screenshots/text; Figma URLs blocked |
| `design-orchestrator` | Screenshot path works; Figma path blocked |
| `ux-ideator` | IA + lo-fi works; Figma wireframe step blocked |

**How to connect the Figma MCP:**

1. Install the Figma MCP server (follow [Figma's MCP docs](https://www.figma.com/developers/mcp))
2. Once connected, add the `use_figma` permission to your local `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "mcp__<your-figma-mcp-id>__use_figma"
    ]
  }
}
```

> `settings.local.json` is gitignored — each developer configures their own MCP IDs.

### Skills that need `graphify`

The `obsidian-knowledge-graph` skill reads `graphify-out/graph.json` for import-edge data during full vault rebuilds. The `.venv/` directory is gitignored.

```bash
python3 -m venv .venv
.venv/bin/pip install graphifyy
.venv/bin/graphify update .   # generates graphify-out/
```

The skill still works without graphify — it falls back to reading source files directly. You just won't get cross-file import edges in the vault.

### Skills that need Claude Code plugins (user-level install)

These are **not in the repo** — they live in `~/.claude/` and must be installed per developer via the Claude Code plugin marketplace:

| Plugin / Skill | Install command |
|----------------|----------------|
| `anthropic-skills:skill-creator` | `claude plugin install skill-creator` |
| `anthropic-skills:osmos-pmm` | `claude plugin install osmos-pmm` |
| `anthropic-skills:osmos-brand` | `claude plugin install osmos-brand` |
| `anthropic-skills:osmos-figma-tokens` | `claude plugin install osmos-figma-tokens` |
| `anthropic-skills:pdf`, `pptx`, `docx`, `xlsx` | `claude plugin install <name>` |
| `anthropic-skills:consolidate-memory` | `claude plugin install consolidate-memory` |
| `osmos-product-marketing:osmos-pmm` | Install from Osmos org marketplace |
| `cowork-plugin-management:*` | Install from Cowork marketplace |

> These plugins provide document handling, brand guidelines, and product marketing skills. The core design-to-code pipeline works without them.

### Full setup checklist for a new fork

```
[ ] pnpm install
[ ] python3 -m venv .venv && .venv/bin/pip install graphifyy
[ ] .venv/bin/graphify update .
[ ] Connect Figma MCP server + add permission to settings.local.json
[ ] claude plugin install <any anthropic-skills you need>
[ ] Say "sync obsidian vault" to Claude to build the knowledge vault
```

---

## Knowledge systems

The repo maintains three layered knowledge sources that Claude reads before working:

| Source | Location | What it tracks |
|--------|----------|---------------|
| Skill knowledge graph | `.claude/skills/figma-batch-builder/knowledge-graph.md` | All wired pages, nav IDs, Figma frame history, component patterns |
| AST code graph | `graphify-out/` | File-level import edges and community clusters |
| Obsidian vault | `obsidian-vault/` | Interlinked notes for components, pages, Figma frames, nav structure, token audit |

The Obsidian vault updates automatically every time Claude writes a `src/` file (via a `PostToolUse` hook in `.claude/settings.json`). For a full rebuild, say **"sync obsidian vault"** in any Claude Code session.

---

## Project structure

```
src/
├── retailer/          Legacy retailer console (50+ pages)
├── advertiser/        Advertiser "Beat" console (shadcn + Tailwind → Osmos migration in progress)
├── chooser/           Landing page / app selector
└── ui/                Shared component library (atoms, molecules, patterns)

.claude/
├── skills/            13 Claude Code skills (design-to-code pipeline)
└── settings.json      Hooks: PreToolUse graphify hint + PostToolUse vault sync

graphify-out/          AST knowledge graph (generated, committed)
obsidian-vault/        Obsidian-compatible knowledge vault (generated, committed)
scripts/
└── vault-sync.py      Incremental vault updater (called by PostToolUse hook)
```
