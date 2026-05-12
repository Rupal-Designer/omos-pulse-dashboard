# skills-onboarding

**Trigger:** Invoke when a team member asks how to get Claude skills set up, how to install the skills package, how the vault works, or what to do after forking/cloning this repo.

---

## What this skill does

Guides a user through setting up the full Claude Code skills suite for this repo, covering two paths:

1. **Fork path** — user has cloned/forked this repo directly
2. **Package path** — user is in a different repo and wants to install the skills via pnpm

---

## Path 1: Fork / clone of this repo

The skills are already committed at `.claude/skills/`. Claude Code discovers them automatically. The only setup steps are:

### Required
```bash
pnpm install
```

### For full vault depth (recommended)
```bash
# Build AST knowledge graph (fast, no API cost)
python3 -m venv .venv && .venv/bin/pip install graphifyy
.venv/bin/graphify update .

# Register daily 12pm vault rebuild cron
pnpm setup:vault-cron
```

### For Figma-dependent skills
Skills that require the Figma MCP: `figma-batch-builder`, `figma-wireframer`, `screen-interpreter`, `design-orchestrator`, `ux-ideator`.

1. Install the Figma MCP server (see Figma's MCP docs)
2. Add to `.claude/settings.local.json` (gitignored — per-developer):
```json
{
  "permissions": {
    "allow": ["mcp__<your-figma-mcp-id>__use_figma"]
  }
}
```

### For Anthropic plugin skills
These are user-level, not in the repo:
```bash
claude plugin install skill-creator
claude plugin install osmos-pmm
claude plugin install osmos-brand
claude plugin install osmos-figma-tokens
```

### Full checklist
```
[ ] pnpm install
[ ] python3 -m venv .venv && .venv/bin/pip install graphifyy
[ ] .venv/bin/graphify update .
[ ] pnpm setup:vault-cron
[ ] Connect Figma MCP + add permission to settings.local.json
[ ] claude plugin install <any anthropic-skills needed>
[ ] Say "sync obsidian vault" to Claude for an initial full vault build
```

---

## Path 2: Different repo — install via pnpm

### Step 1 — Prerequisites
- Claude Code installed: `npm install -g @anthropic-ai/claude-code`
- GitHub PAT with `read:packages` scope, set as `NPM_TOKEN` in shell profile

### Step 2 — Add registry to `.npmrc`
```
@rishikeshjoshi-morpheus:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Step 3 — Install
```bash
pnpm add -D @rishikeshjoshi-morpheus/claude-skills
```
All 13 skills are copied to `.claude/skills/` via postinstall. No restart needed.

### Step 4 — Daily vault rebuild (optional)
```bash
pnpm setup:vault-cron
```
Registers a crontab entry: daily 12pm, full src/ scan → vault notes updated. Logs to `.claude/vault-rebuild.log`.

### Updating skills
```bash
pnpm update @rishikeshjoshi-morpheus/claude-skills
```

---

## How the vault grows

| Trigger | What happens |
|---|---|
| Claude writes any `src/` file | `vault-sync.py` PostToolUse hook updates the matching vault note immediately |
| Every day at 12:00pm | `rebuild-vault.sh` processes all `src/` files — catches anything the hook missed |
| On demand | Say "sync obsidian vault" in any Claude session |

The vault accumulates component docs, import graphs, prop signatures, and page metadata. The more Claude works in the repo, the richer the vault.

---

## Publishing a new version of the skills package

When skills are updated in `.claude/skills/`, publish a new version:

```bash
# From repo root
NPM_TOKEN=ghp_... pnpm publish:skills
```

This runs `pnpm sync:skills` (copies `.claude/skills/` → `claude-skills/skills/`), then publishes to GitHub Package Registry. Bump the version in `claude-skills/package.json` first if this is a meaningful update.

---

## Available skills (13)

| Skill | Category | Needs Figma MCP |
|---|---|---|
| `screen-interpreter` | Design pipeline | Optional |
| `figma-wireframer` | Design pipeline | Yes |
| `react-implementer` | Design pipeline | No |
| `design-orchestrator` | Design pipeline | Yes |
| `figma-batch-builder` | Design pipeline | Yes |
| `ux-ideator` | Design pipeline | Yes |
| `ux-auditor` | UX research | No |
| `design-critic` | UX research | No |
| `token-enforcer` | Code quality | No |
| `lineicon-enforcer` | Code quality | No |
| `component-reuse-enforcer` | Code quality | No |
| `shadcn-to-osmos` | Code quality | No |
| `obsidian-knowledge-graph` | Knowledge | No |
