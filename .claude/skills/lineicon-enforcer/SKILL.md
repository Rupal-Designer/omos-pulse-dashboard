---
name: lineicon-enforcer
description: "Scans all JSX components for hand-rolled SVG icons and replaces them with matching icons from the Free LINE icons Figma file (WAZd1M7J9YzwnhoO7BRjcV). Use this skill whenever someone says 'use line icons', 'replace icons with line icons', 'enforce line icons', or 'make icons consistent'. The skill audits, looks up Figma, extracts SVG paths, and applies replacements."
---

# LINE Icon Enforcer

Scans every `src/components/*.jsx` file for hand-rolled inline SVG paths, identifies the icon's intent from context, fetches the matching LINE icon from the Figma design library, and replaces the old path with the correct line-style SVG.

**Figma icon library:** `https://www.figma.com/design/WAZd1M7J9YzwnhoO7BRjcV/Free-LINE-icons`  
**Primary icon page:** `Interface, Essential` (3000 icons, page node 0:1)

---

## Phase 0 — Pre-flight

Understand the current icon pattern used in this codebase. Icons are rendered via a shared `Ico` helper:

```jsx
function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}
```

The `d` prop is a JSX fragment with `<path>`, `<circle>`, `<line>`, `<polyline>`, `<rect>` elements.

LINE icons from the Figma file are **outline/stroke icons** on a 24×24 viewBox — perfectly compatible with this pattern.

---

## Phase 1 — Audit

### Step 0 (run FIRST): Scan for emoji icons

Emojis used as icons are a hard violation — they render as OS-native glyphs, are uncontrollable in size/color, and break visual consistency completely.

```bash
python3 -c "
import os, re
emoji_pattern = re.compile(
    '[' '\U0001F300-\U0001F9FF' '\U00002600-\U000027BF'
    '\U0000FE0F' '\U00002702-\U000027B0' ']+', flags=re.UNICODE)
base = 'src/components'
for fname in sorted(os.listdir(base)):
    if not fname.endswith('.jsx'): continue
    with open(os.path.join(base, fname), encoding='utf-8') as f:
        for i, line in enumerate(f, 1):
            if emoji_pattern.search(line):
                print(f'{fname}:{i}: {line.rstrip()}')
"
```

**For every emoji found, replace immediately with an SVG icon.** Common mappings:

| Emoji | Intent | SVG replacement |
|-------|--------|----------------|
| 🗑 🗑️ | trash / delete | `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>` |
| ✕ ✖ ✗ | close / dismiss | `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>` |
| ✓ ✔ | check / success | `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` |
| 🔄 | refresh / change-log | `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>` |
| ➕ ＋ | add / plus | `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>` |
| 🔍 | search | `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` |
| ⚙️ | settings | Use Ico helper with settings path |
| 📊 📈 | chart | Use Ico helper with chart path |

Also remove any `fontSize` prop on the button/container wrapping the emoji — the SVG has its own `width`/`height`.

---

### Step 1: Find all files with inline SVG

```bash
grep -rl "viewBox=\"0 0 24 24\"" src/components/
```

### Step 2: For each file, extract every `Ico` usage

Scan for patterns like:
```
<Ico d={<><path d="M..."/></>} />
<Ico d={<><circle cx="..." .../><path d="..."/></>} />
```

Also look for raw `<svg>` tags not using the `Ico` helper — these need the same treatment.

### Step 3: Identify icon intent from context

For each `Ico` usage, determine intent by reading:
1. The **surrounding button label** or `aria-label`  
2. The **variable name** or comment nearby  
3. The **SVG path shape** (use the known shape → intent table below)

### Step 4: Classify each icon

| Intent | Confidence |
|--------|-----------|
| Context clearly says "search", "trash", "edit" etc. | HIGH — replace immediately |
| Path shape recognisable from known patterns | MEDIUM — replace with note |
| Cannot determine intent | LOW — mark `[NEEDS REVIEW]`, skip |

---

## Phase 2 — Figma Lookup

### Known Icon Lookup Table

Pre-mapped Figma node IDs for the most common UI icons. Use these before fetching from Figma:

| Intent | Figma Node ID | Icon Full Name |
|--------|--------------|----------------|
| search / zoom | `9:1999` | Interface, Essential/Search, Zoom, Plus |
| trash / delete / remove | `9:474` | Interface, Essential/Trash, Delete, Remove |
| user / person / profile | `9:335` | Interface, Essential/User, Single, Select |
| refresh / reload | `9:2523` | Interface, Essential/Refresh, Update |
| settings / gear / config | `9:1387` | Interface, Essential/Settings, Switches |
| plus / add | `9:3057` | Interface, Essential/Plus, Minus, Circle |
| edit / pen / pencil | `9:3178` | Interface, Essential/Pen, Stop |
| bell / notification | `9:3516` | Interface, Essential/Notification, Document |
| menu / hamburger | `9:3826` | Interface, Essential/Menu, Square |
| lock / padlock | `9:4072` | Interface, Essential/Lock, Warning |
| info / information | `9:4891` | Interface, Essential/Information, Info |
| home / house | `9:4980` | Interface, Essential/Home, House, Line |
| grid / layout | `9:5232` | Interface, Essential/Grid, Layout, Square |
| chart / analytics / graph | `9:5443` | Interface, Essential/Graph, Analytics, Square |
| filter / funnel | `9:5728` | Interface, Essential/Filter, Sort |
| document / file / page | `9:5809` | Interface, Essential/FileUp, Mail |
| eye / view / visible | `9:5901` | Interface, Essential/Eye, Square |
| download | `9:6156` | Interface, Essential/Download, Save |
| calendar / date / schedule | `9:7592` | Interface, Essential/Calendar, Schedule |
| upload | `9:11655` | Interface, Essential/upload-loading-arrow |
| close / cross / dismiss | `9:19052` | Interface, Essential/cross-delete-circle |

### For icons NOT in the table above:

Use the Figma MCP tool to search:

```javascript
// Search Interface Essential page for a new icon
const page = figma.root.children.find(p => p.name.includes('Interface'));
const results = page.children
  .filter(f => f.name.toLowerCase().includes('KEYWORD'))
  .map(f => ({ name: f.name, id: f.id }))
  .slice(0, 10);
return JSON.stringify(results);
```

Replace `KEYWORD` with the icon intent (e.g. `'arrow'`, `'check'`, `'star'`).

Also search these secondary pages for domain-specific icons:
- **Users** (page 6:28169) — avatar, group, team icons
- **Files** (page 6:8525) — document, folder, attachment icons  
- **Content/Edit** (page 6:3170) — edit, text, formatting icons
- **Money** (page 6:13849) — wallet, currency, payment icons
- **Arrows Diagrams** (page 6:169) — chevron, arrow, direction icons
- **Business Products** (page 6:1238) — box, product, catalog icons

---

## Phase 3 — Extract SVG Paths

Once you have the Figma node ID for an icon, extract its path data:

```javascript
// Get SVG path data from a LINE icon node
const node = await figma.getNodeByIdAsync('NODE_ID');
const vectors = node.findAll(n => n.type === 'VECTOR');

const pathData = vectors.map(v => {
  const paths = v.vectorPaths || [];
  return paths.map(p => p.data).join(' ');
}).join('|');

return JSON.stringify({ name: node.name, paths: pathData, childCount: vectors.length });
```

### SVG Assembly Rules

After extracting paths, build the replacement JSX fragment:

**Single vector node → single `<path>`:**
```jsx
<path d="M... [extracted path data]"/>
```

**Multiple vector nodes → multiple `<path>` elements:**
```jsx
<>
  <path d="M... [path 1]"/>
  <path d="M... [path 2]"/>
</>
```

**Important:** LINE icons use stroke rendering. Ensure the wrapping `<svg>` or `Ico` has:
- `fill="none"`
- `stroke="currentColor"` (or `stroke={stroke}`)
- `strokeWidth={1.8}` (or `sw={1.8}`)
- `strokeLinecap="round"`
- `strokeLinejoin="round"`
- `viewBox="0 0 24 24"`

---

## Phase 4 — Apply Replacements

For each identified icon, edit the JSX file using the Edit tool.

### Replacement Pattern

**Before (hand-rolled icon):**
```jsx
<Ico d={<><path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="8"/></>} stroke="var(--osmos-fg-subtle)" />
```

**After (LINE icon):**
```jsx
<Ico d={<><path d="M [LINE icon path data here]"/></>} stroke="var(--osmos-fg-subtle)" />
```

### Batch Processing Rules

- Process up to **5 files in parallel** using Agent tool
- Keep all other props (`size`, `stroke`, `sw`) unchanged — only replace the `d` prop content
- If a file has multiple icons, replace all of them in one Edit operation
- Do NOT change the `Ico` helper function itself

---

## Phase 5 — Build Verification

```bash
cd "/Users/rishikeshjoshi/OMOS TEST" && npx vite build --mode development 2>&1 | tail -20
```

Fix any JSX syntax errors from malformed path data before proceeding.

---

## Phase 6 — Report

```
## LINE Icon Enforcement Complete

| File | Icons Found | Icons Replaced | Skipped |
|------|-------------|----------------|---------|
| AdminUserPage.jsx | 3 | 3 (trash, search, change-log) | 0 |
| PersonaConfigPage.jsx | 4 | 3 (search, change-log, shield) | 1 (custom) |

**Total:** X icons replaced across Y files
**Skipped:** Z icons marked [NEEDS REVIEW]

Build: ✅ Clean
```

---

## ⛔ Negative Patterns — Always Flag, Always Fix

These are **never acceptable** in this codebase:

| Violation | Example | Why it's wrong |
|-----------|---------|----------------|
| Emoji used as icon | `🗑`, `✕`, `✓`, `🔄`, `➕`, `🔍`, `⚙️` | OS-rendered glyph — uncontrollable size/color, looks different on every OS/browser |
| `<polygon>` for icons | `<polygon points="22 3 2 3..."/>` | Auto-closes shape, harder to reason about than `<path>` |
| Inline `fontSize` on emoji container | `style={{ fontSize: 18 }}` around emoji | Leftover from emoji sizing — remove when replacing with SVG |
| Raw string characters as icons | `▲`, `▼`, `▾`, `›`, `«` used as visual icons | Use SVG chevron paths instead |

Detection command for emoji:
```bash
python3 -c "
import os, re
p = re.compile('[\\U0001F300-\\U0001F9FF\\U00002600-\\U000027BF\\U0000FE0F\\U00002702-\\U000027B0]+', flags=re.UNICODE)
base = 'src/components'
for f in sorted(os.listdir(base)):
    if not f.endswith('.jsx'): continue
    for i, ln in enumerate(open(os.path.join(base, f), encoding='utf-8'), 1):
        if p.search(ln): print(f'{f}:{i}: {ln.rstrip()}')
"
```

---

## Known Intentional Exceptions (Do NOT Replace)

These SVG patterns are intentional and must be kept as-is:

| Pattern | Reason |
|---------|--------|
| Checkmark inside custom `<Checkbox>` component | Brand-specific 10×10 SVG, not a UI icon |
| `▲` `▼` in table sort headers | Text sort indicator, not a standalone icon — acceptable |
| `＋` in "＋ Add New User" button label text | Part of button label string, not a standalone icon — acceptable |
| Heatmap cell SVGs | Generated/computed, not icons |
| Chart SVGs rendered by recharts | Library-managed |
| SVG logos or brand marks | Not icon replacements |

---

## Quality Rules

1. **Never guess a path** — always extract from Figma. If extraction fails, mark `[NEEDS REVIEW]`
2. **Match intent, not shape** — a "trash" icon should come from the trash node, even if the old path looked different
3. **Keep stroke props** — LINE icons look wrong if `fill` is not `none` or `strokeLinecap` is missing
4. **One icon per Figma lookup** — batch your `use_figma` calls (fetch 5-10 icons at once)
5. **Verify visually** — after replacement, do a build and note any icons that look off

---

## Common Icon → Figma Node Quick Reference

For the fastest workflow, use this condensed lookup:

```
search      → 9:1999    trash    → 9:474     user     → 9:335
refresh     → 9:2523    settings → 9:1387    plus     → 9:3057
edit/pen    → 9:3178    bell     → 9:3516    menu     → 9:3826
lock        → 9:4072    info     → 9:4891    home     → 9:4980
grid        → 9:5232    chart    → 9:5443    filter   → 9:5728
file/doc    → 9:5809    eye      → 9:5901    download → 9:6156
calendar    → 9:7592    upload   → 9:11655   close    → 9:19052
```

All node IDs are in the file: `WAZd1M7J9YzwnhoO7BRjcV`
