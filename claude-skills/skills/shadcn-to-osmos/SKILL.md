---
name: shadcn-to-osmos
description: "Migrate a single shadcn/ui + Tailwind + lucide-react page (in src/advertiser/) to use the Osmos `src/ui/` library, inline-style CSS-var tokens, and our named icon exports. Trigger this skill whenever the user says 'migrate this page to osmos', 'convert this to src/ui', 'replace shadcn with our components', 'port this to osmos tokens', or pastes a shadcn page and wants it Osmos-ified. Designed to run page-by-page (not bulk) so each migration produces a clean diff that's easy to review. Always preserves the page's behavior — only swaps presentation primitives."
---

# Shadcn → Osmos Migration

This skill takes a `.jsx` page from `src/advertiser/` (originally cloned from a v0.app / Next.js + shadcn project) and produces an equivalent page that imports from `src/ui/`, uses inline CSS-variable styles, and uses our named icon exports.

The advertiser app was bulk-imported in Phase B with shadcn + Tailwind + lucide left intact, so all 50+ pages render in their original form. This skill is what the user invokes to migrate one page at a time, on their schedule.

## ⚡ Cardinal Rules

1. **One page per invocation.** Don't migrate multiple files in one go — the diff becomes unreviewable. If the user asks for "all pages", push back: ask which one to start with.
2. **Behavior must be identical** before and after. State, event handlers, data flow, conditional rendering — all preserved verbatim. This is a presentation-layer migration, nothing else.
3. **No emoji, no extra commentary in code.** Match the existing `src/retailer/components/*` style: terse comments, structural sections, inline styles.
4. **Always run `pnpm build` after** and confirm 0 errors before declaring done.
5. **Never leave a half-migrated file.** If a Tailwind class has no clean inline equivalent (e.g. `bg-gradient-to-b`), keep it as a hand-rolled inline style with linear-gradient — don't leave the class.

---

## Migration Process (per page)

### Step 1 — Read the source page

```
Read /Users/rishikeshjoshi/OMOS TEST/src/advertiser/<path>.jsx
```

Identify which of these patterns are present:
- `import { X } from "@/components/ui/<atom>"` — shadcn atom imports
- `import { X } from "lucide-react"` — icon imports
- `className="..."` with Tailwind utility classes
- `cn(...)` calls combining Tailwind classes conditionally
- `style={{ ... 'var(--surface-1)' ... }}` — v0 tokens (rename to `var(--osmos-*)`)
- `'use client'` directive — remove (Vite doesn't need it)

### Step 2 — Plan the swaps

Build a swap list before editing. Use the maps in this skill (below) to fill in each row:

| From (shadcn / lucide / Tailwind / v0 token) | To (src/ui / inline style / osmos token) |
|---|---|
| `<Button variant="default">` | `<Button variant="primary">` |
| `<Card>` … `<CardContent>` | raw `<div style={{ background: WHITE, border, borderRadius }}>` |
| `<TrendingUp size={20} />` | (no direct match — keep `Icon` with custom SVG path) |
| `className="flex items-center gap-2"` | `style={{ display: 'flex', alignItems: 'center', gap: 8 }}` |
| `var(--surface-1)` | `var(--osmos-bg)` |
| `var(--text-primary)` | `var(--osmos-fg)` |

### Step 3 — Rewrite the file

Apply the swaps via `Edit` (preferred) or `Write` (if the file is being substantially restructured). Keep imports at top, mock data at top, component below — match the retailer convention.

### Step 4 — Verify

```bash
cd "/Users/rishikeshjoshi/OMOS TEST" && pnpm build 2>&1 | tail -10
```

Must show "✓ built in" with 0 errors. If errors mention missing exports from `'../../ui'`, double-check the named exports list in `src/ui/index.js`.

### Step 5 — Smoke check (when significant)

If the migration changes layout meaningfully, ask the user to visit `/advertiser.html#/<route>` in preview and confirm visual parity with the pre-migration version. For pure component swaps (Button → Button), skipping the visual check is fine.

---

## Mapping Reference

### Shadcn atoms → `src/ui/` components

The **import path always becomes** `import { X } from '../../ui'` (assuming the page lives at `src/advertiser/components/<file>.jsx` or `src/advertiser/pages/<file>.jsx`).

| Shadcn import | Osmos replacement | Notes |
|---|---|---|
| `Button` from `@/components/ui/button` | `Button` from `'../../ui'` | Variant map: `default`→`primary`, `outline`→`outline`, `ghost`→`ghost`, `secondary`→`outline`, `link`→`link`, `destructive`→ keep `outline` + red color via inline style |
| `Badge` from `@/components/ui/badge` | `Badge` (status) or `TypeBadge` (custom) from `'../../ui'` | If status text matches `'Active' \| 'Inactive' \| 'Paused' \| 'Live' \| 'Draft' \| 'Error'` → use `Badge status=…`. Otherwise use `TypeBadge type=… colorMap={…}` |
| `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `CardFooter` from `@/components/ui/card` | raw `<div>` with inline style: `{ background: WHITE, border: '1px solid var(--osmos-border)', borderRadius: 10, padding: '16px 20px' }` | No Card atom in `src/ui/` — hand-roll. Match the retailer's "card" pattern from any existing page (e.g. `AdvertiserOnboardingCatalogPage.jsx`) |
| `Input` from `@/components/ui/input` | `Input` from `'../../ui'` | Wrap in `Input label=…` if there's a label nearby |
| `Label` from `@/components/ui/label` | (folded into Input's `label` prop) | If standalone, use a styled `<span style={{ fontSize: 12, fontWeight: 600, color: TEXT_MID }}>` |
| `Checkbox` from `@/components/ui/checkbox` | `Checkbox` from `'../../ui'` | Direct swap; props: `checked`, `onChange` (NOT `onCheckedChange`) |
| `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` from `@/components/ui/select` | `Select` from `'../../ui'` | Flatten the compound API: collect items into `options=[{value,label}]` |
| `Switch` from `@/components/ui/switch` | hand-roll: a `<button>` with two states + inline transition | No Switch atom yet; steal pattern from `AutomatedRulesPage.jsx` toggle |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `@/components/ui/tabs` | hand-rolled tabs (row of `Button` atoms or styled `<button>`s) | See pattern in `AdvertiserOnboardingCatalogPage.jsx` |
| `Textarea` from `@/components/ui/textarea` | hand-roll `<textarea style={{ ... }}>` matching `Input` styling | No Textarea atom |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` from `@/components/ui/tooltip` | hand-roll a `<span title="...">` for now | Tooltip atom not in `src/ui/` |
| `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` from `@/components/ui/accordion` | hand-roll with `<details>`/`<summary>` or `useState` open flag | Accordion atom not in `src/ui/` |
| `cn(...)` from `@/lib/utils` | inline style merging — write `style={{ ...base, ...(condition ? extra : {}) }}` | Don't import `cn`; we don't ship Tailwind in migrated pages |

### lucide-react icons → `src/ui/` named icons

For each lucide icon used in the source, look it up here. If a row says **"hand-roll Icon"**, wrap a custom SVG path in our `Icon` atom: `<Icon size={...} color={...}><path d="..."/></Icon>`.

| lucide-react | src/ui equivalent |
|---|---|
| `Search` | `SearchIcon` |
| `Plus` | `PlusIcon` |
| `Trash`, `Trash2` | `TrashIcon` |
| `Edit`, `Edit2`, `Edit3`, `Pencil` | `EditIcon` |
| `X`, `XCircle` | `CloseIcon` |
| `ChevronDown` | `ChevronDownIcon` |
| `ChevronLeft` | `ChevronLeftIcon` |
| `ChevronRight` | `ChevronRightIcon` |
| `ChevronUp` | hand-roll `Icon` with rotated chevron path |
| `Upload` | `UploadIcon` |
| `Download`, `DownloadIcon` | `DownloadIcon` |
| `Filter` | `FilterIcon` |
| `RefreshCw`, `RefreshCcw` | `RefreshIcon` |
| `File`, `FileText` | `FileIcon` |
| `Check`, `CheckIcon` | `CheckIcon` |
| `ArrowUpDown`, `Sort` | `SortIcon` |
| `Calendar` | `CalendarIcon` |
| `Eye` | `EyeIcon` |
| `Columns` | `ColumnsIcon` |
| `Info` | `InfoIcon` |
| `MoreHorizontal`, `MoreVertical` | `MoreIcon` |
| `TrendingUp`, `TrendingDown` | hand-roll `Icon` with arrow path |
| `DollarSign` | hand-roll `Icon` |
| `Rocket`, `Megaphone`, `MonitorPlay`, `MessageSquare`, `LayoutGrid`, `Activity`, `Settings`, `HelpCircle`, `ImageIcon`, `ShoppingCart`, `BarChart3`, `MousePointerClick`, `ArrowUpRight` | hand-roll `Icon` with custom SVG path (or look up in Design-System-OS Figma `58jL2Gbe53rBhxOysvHM82` per the figma-batch-builder skill) |

### Tailwind → inline styles

This is the bulk of the work. Most v0 pages have ~40–80 unique Tailwind classes. Don't try to memorize — use this lookup table for the common ones, and fall back to MDN for less common values.

#### Layout
| Tailwind | Inline equivalent |
|---|---|
| `flex` | `display: 'flex'` |
| `inline-flex` | `display: 'inline-flex'` |
| `grid` | `display: 'grid'` |
| `block` / `inline-block` / `hidden` | `display: 'block' / 'inline-block' / 'none'` |
| `flex-col` | `flexDirection: 'column'` |
| `flex-row` | `flexDirection: 'row'` |
| `flex-1` | `flex: 1` |
| `flex-wrap` | `flexWrap: 'wrap'` |
| `items-center` / `items-start` / `items-end` / `items-stretch` | `alignItems: 'center' / 'flex-start' / 'flex-end' / 'stretch'` |
| `justify-center` / `justify-between` / `justify-start` / `justify-end` | `justifyContent: 'center' / 'space-between' / 'flex-start' / 'flex-end'` |
| `grid-cols-N` | `gridTemplateColumns: 'repeat(N, 1fr)'` |

#### Spacing — Tailwind 4 = 16 px (1 = 4 px)
| Tailwind | Inline equivalent |
|---|---|
| `gap-N` | `gap: N*4` (e.g. `gap-2` → `gap: 8`) |
| `p-N` / `px-N` / `py-N` / `pt-N` / `pr-N` / `pb-N` / `pl-N` | `padding`, `padding{Left,Right}`, `padding{Top,Bottom}`, `padding{Top/Right/Bottom/Left}` × N*4 |
| `m-N` / `mx-N` / `my-N` / `mt-N` etc. | same pattern with `margin*` |
| `space-y-N` | parent: `display: 'flex', flexDirection: 'column', gap: N*4` (cleaner than the negative-margin trick) |
| `space-x-N` | parent: `display: 'flex', gap: N*4` |

> **⚠️ Layout override — Figma-verified spacing (these take priority over Tailwind arithmetic):**
> When migrating a page-level layout or KPI card grid, do NOT blindly convert `gap-4` → `gap: 16`. Apply the Osmos layout rules verified from Figma:
> - KPI card grid → `gap: 20` (always, regardless of what Tailwind says)
> - Section-to-section vertical gap → `gap: 20`
> - Page outer wrapper → `padding: '20px 24px'`
> - Drawer body → `padding: 20`
> - Section card header → `padding: '14px 16px'`
> - Table th → `padding: '9px 14px'`, td → `padding: '10px 14px'`
> See `ia-patterns.md §5` for the full guide.

#### Sizing
| Tailwind | Inline equivalent |
|---|---|
| `w-full` / `h-full` | `width: '100%'` / `height: '100%'` |
| `w-screen` / `h-screen` | `width: '100vw'` / `height: '100vh'` |
| `min-h-screen` | `minHeight: '100vh'` |
| `w-N` / `h-N` | `width: N*4` / `height: N*4` |
| `min-w-0` | `minWidth: 0` |
| `max-w-7xl` / `max-w-6xl` etc. | `maxWidth: 1280` / `1152` / `1024` / etc. |

#### Typography
| Tailwind | Inline equivalent |
|---|---|
| `text-xs` | `fontSize: 12, lineHeight: 1.4` |
| `text-sm` | `fontSize: 13, lineHeight: 1.5` |
| `text-base` | `fontSize: 14, lineHeight: 1.55` |
| `text-lg` | `fontSize: 16` |
| `text-xl` | `fontSize: 20, fontWeight: 600` |
| `text-2xl` / `text-3xl` / `text-4xl` | `fontSize: 24 / 30 / 36` |
| `font-medium` / `font-semibold` / `font-bold` | `fontWeight: 500 / 600 / 700` |
| `tracking-tight` / `tracking-wide` | `letterSpacing: '-0.01em' / '0.05em'` |
| `text-center` / `text-left` / `text-right` | `textAlign: 'center' / 'left' / 'right'` |
| `truncate` | `overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'` |
| `uppercase` | `textTransform: 'uppercase'` |

#### Colors (v0 → osmos)
Replace any `text-*` / `bg-*` / `border-*` Tailwind utility with the closest CSS-var equivalent below.

| v0 token (`var(--…)`) | Osmos token (`var(--osmos-…)`) | Use for |
|---|---|---|
| `--screen-bg` (`#fff`) | `--osmos-bg` | Page background, card background |
| `--screen-bg-2` (`#edf0f5`) | `--osmos-bg-subtle` | Page wrapper, subtle backgrounds |
| `--surface-1` (`#fafafa`) | `--osmos-bg-subtle` | Card alt background |
| `--surface-2` (`#efefef`) | `--osmos-bg-muted` (or `--osmos-bg-subtle`) | Pressed states, secondary surfaces |
| `--text-primary` (`#404040`) | `--osmos-fg` | Primary text |
| `--text-secondary` (`#7b7b7b`) | `--osmos-fg-muted` | Secondary text |
| `--text-grey-900` (`#262626`) | `--osmos-fg` | Headings (slightly darker — leave as fg) |
| `--stroke` (`#dedede`) | `--osmos-border` | Borders, dividers |
| `--stroke-table` (`#edf0f5`) | `--osmos-border` | Table dividers |
| `--blue-primary` (`#1970e1`) | `--osmos-brand-primary` | Primary action color |
| `--blue-bg` (`#e8f1fc`) | `--osmos-brand-primary-muted` | Primary background fills |
| `--violet-primary`, `--brand-secondary` (`#3e266d`) | keep as inline `#3e266d` for now | Brand-secondary (no osmos token yet) |
| `--success-primary` (`#2e7d32`) | `--osmos-brand-green` | Success/positive |
| `--success-bg` | `--osmos-brand-green-muted` | Success fills |
| `--error-primary` (`#c62828`) | inline `#EF4444` | Error/destructive (no osmos token) |
| `--warning-primary` (`#ff8a00`) | `--osmos-brand-amber` | Warnings |
| `--nav-main` (`#212563`) | `--osmos-nav-bg` | Sidebar backgrounds |

For Tailwind utility classes that map to v0 tokens (e.g. `text-text-primary`, `bg-surface-1`, `border-stroke`), follow the chain: tailwind class → v0 token → osmos token.

#### Borders & Radius
| Tailwind | Inline equivalent |
|---|---|
| `border` | `border: '1px solid var(--osmos-border)'` |
| `border-2` | `border: '2px solid var(--osmos-border)'` |
| `border-t` / `border-b` etc. | `borderTop: '1px solid var(--osmos-border)'` etc. |
| `rounded` | `borderRadius: 4` |
| `rounded-md` | `borderRadius: 6` |
| `rounded-lg` | `borderRadius: 8` |
| `rounded-xl` | `borderRadius: 12` |
| `rounded-full` | `borderRadius: 999` |

#### Effects
| Tailwind | Inline equivalent |
|---|---|
| `shadow-sm` | `boxShadow: '0 1px 2px rgba(0,0,0,0.05)'` |
| `shadow-md` / `shadow-lg` | `boxShadow: '0 4px 6px rgba(0,0,0,0.07)'` / `'0 10px 15px rgba(0,0,0,0.1)'` |
| `transition-colors` / `transition-all` | `transition: 'all 0.15s'` |
| `cursor-pointer` | `cursor: 'pointer'` |
| `overflow-hidden` / `overflow-y-auto` / `overflow-x-auto` | `overflow: 'hidden'` / `overflowY: 'auto'` / `overflowX: 'auto'` |
| `sticky top-0 z-30` | `position: 'sticky', top: 0, zIndex: 30` |

#### Hover/focus states
Tailwind's `hover:` and `focus:` prefixes don't have a direct inline-style equivalent. Use one of:
- React state: `const [hover, setHover] = useState(false)` + `onMouseEnter`/`onMouseLeave` (matches retailer pattern)
- `:hover` selectors via styled-components or CSS modules — **don't introduce these**, stick with state

---

## Worked Example

### Source (shadcn — `src/advertiser/components/sidebar.jsx`)

```jsx
"use client"
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavItem({ icon, label, active }) {
  return (
    <button
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg w-full text-sm font-medium transition-colors",
        active ? "bg-blue-bg text-blue-primary" : "text-text-secondary hover:bg-surface-1"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
```

### Migrated (`src/ui/` + inline styles)

```jsx
import { useState } from 'react';
import { Icon } from '../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT_MID = 'var(--osmos-fg-muted)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const BG_SUB   = 'var(--osmos-bg-subtle)';

const RocketIcon = (props) => (
  <Icon size={18} {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
  </Icon>
);

export function NavItem({ icon, label, active }) {
  const [hover, setHover] = useState(false);
  const bg = active ? ACCENT_M : (hover ? BG_SUB : 'transparent');
  const color = active ? ACCENT : TEXT_MID;

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 12px', width: '100%',
        borderRadius: 8, border: 'none',
        background: bg, color,
        fontFamily: FONT, fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      {icon}
      {label}
    </button>
  );
}
```

Note the trade-offs:
- `cn()` removed → conditional inline style with `useState`
- `hover:` pseudo-class → React state
- `bg-blue-bg` → `var(--osmos-brand-primary-muted)` (closest osmos token)
- `transition-colors` → `transition: 'all 0.15s'`
- lucide `<Rocket>` → hand-rolled `<Icon>` with the same SVG path data (copy from lucide source)

---

## Output Checklist

Before declaring a migration done, verify each:

- [ ] No imports from `@/components/ui/*` remain
- [ ] No imports from `lucide-react` remain
- [ ] No imports from `@/lib/utils` (`cn` is gone)
- [ ] No `className=` attributes remain (or only one or two, with a justification comment if necessary)
- [ ] No `var(--surface-*)`, `var(--text-*)`, `var(--blue-*)`, `var(--stroke*)` v0 tokens remain
- [ ] No `"use client"` directive at top
- [ ] All icons render via `Icon` from `'../../ui'` or our named `*Icon` exports
- [ ] All buttons / inputs / badges / etc. import from `'../../ui'`
- [ ] `pnpm build` passes with 0 errors
- [ ] **Layout spacing compliant:** KPI card grid uses `gap: 20`, page wrapper uses `padding: '20px 24px'`, drawer body uses `padding: 20` — see `ia-patterns.md §5`
- [ ] Visual check (if user wants it): `/advertiser.html#/<route>` matches pre-migration look

---

## When to Push Back

- User asks to migrate >1 page in one invocation → tell them to pick one
- User asks to migrate the campaign-wizard subtree (8+ files) in one go → break into 8 separate migrations, do the parent first
- A Tailwind utility has no clean inline equivalent (rare — usually only complex CSS like `backdrop-blur` or `mix-blend`) → flag it, ask the user if they want to skip / inline a CSS rule / accept the original
- A shadcn atom has features `src/ui/` doesn't (e.g. shadcn `Select` supports search-in-options, ours doesn't) → flag the gap, ask whether to add it to `src/ui/` first or simplify the page

---

## Skill Cross-References

After migrating, run **`token-enforcer`** on the same file to catch any hardcoded hex values that snuck in. Run **`lineicon-enforcer`** if you used hand-rolled SVG icons that have a Design-System-OS equivalent (Figma file `58jL2Gbe53rBhxOysvHM82`, Icons page node `1511:805`).
