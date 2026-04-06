# Claude/AI Assistant Guide for shared-ui

This file serves as an index for AI assistants (like Claude) to understand the project structure and find relevant documentation.

> **Building any UI?** Read `.claude/component-index.md` FIRST — it lists all 113 available components with props, variants, sizes, and code examples. Never write custom HTML/CSS when an Osmos component exists.

## Project Overview

This is a monorepo containing shared UI components and applications for the OnlineSales/Localium platform. The main application is `localium-pulse-ui`.

## Documentation Index

When working on specific tasks, refer to these guides:

### Routes, Pages & Navigation

**For creating new routes, pages, tabs, or navigation items:**

- **Guide:** `docs/ROUTE-PAGE-GUIDE.md`
- **Use when:** Adding settings tabs, standalone pages, menu items, or any new route
- **Key files:**
  - Component: `apps/localium-pulse-ui/src/pages/pulse/component/<name>/index.js`
  - Route config: `apps/localium-pulse-ui/src/domainConfig/configs/secure/configs/routes.js`
  - Page config: `apps/localium-pulse-ui/src/domainConfig/configs/pulse/pageConfigs/reporting.js`
  - Component registration: `apps/localium-pulse-ui/src/app/routes/routes.js`

### Testing

**For adding tests to components:**

- **Guide:** `templates/COMPONENT-TEST-GUIDE.md`
- **Overview:** `TESTING.md`
- **Use when:** Writing unit tests, integration tests, or setting up test infrastructure

### Form Components

**For creating or modifying forms:**

- **Guide:** `packages/form-components-v2/README.md`
- **Use when:** Building forms with validation, dynamic fields, or custom form components

### Tables

**For creating or modifying tables:**

- **Guide:** `packages/react-table-v2/README.md`
- **Use when:** Building data tables with sorting, filtering, pagination, or API integration

### Query Builder

**For creating query/filter interfaces:**

- **Guide:** `packages/query-builder-v2/README.md`
- **Use when:** Building complex query interfaces with multiple conditions

### UI Config Settings

**For metric visibility configuration:**

- **Guide:** `packages/ui-config-settings-v2/README.md`
- **Use when:** Managing report metric visibility settings

## Quick Reference: Common Tasks

| Task                 | Primary Guide                           |
| -------------------- | --------------------------------------- |
| Add new settings tab | `docs/ROUTE-PAGE-GUIDE.md`              |
| Add new page/route   | `docs/ROUTE-PAGE-GUIDE.md`              |
| Create form          | `packages/form-components-v2/README.md` |
| Create table         | `packages/react-table-v2/README.md`     |
| Add tests            | `templates/COMPONENT-TEST-GUIDE.md`     |
| Create query builder | `packages/query-builder-v2/README.md`   |

## Project Structure

```
shared-ui/
├── apps/
│   └── localium-pulse-ui/          # Main application
│       └── src/
│           ├── app/routes/         # Route registration
│           ├── domainConfig/       # Route & page configs
│           ├── pages/              # Page components
│           └── components/         # Shared components
├── packages/                       # Shared packages
│   ├── form-components-v2/
│   ├── react-table-v2/
│   ├── query-builder-v2/
│   └── ...
├── docs/                           # Development guides
│   └── ROUTE-PAGE-GUIDE.md
└── templates/                      # Code templates & guides
    └── COMPONENT-TEST-GUIDE.md
```

## Important Patterns

1. **Always use `configHocV2`** wrapper for page components
2. **Use lazy loading** for component registration in routes.js
3. **Match keys across files** - configDefinitionKey, component key, and export names must match
4. **Follow existing patterns** - look at similar existing implementations (e.g., ROOFTOP_ONBOARDING for settings tabs)

## UI Component Rules (Design System)

**These rules apply whenever writing any React UI code in this repo.**

> **Full reference:** `docs/UI-COMPONENT-REFERENCE.md` — all 113 components with exact import patterns, sub-component structure, props, and usage examples.
> **Full Claude rules:** `docs/CLAUDE-UI-INSTRUCTIONS.md` — copy-paste this into any new project's CLAUDE.md.

### 1. Always use `@onlinesales-ai/ui` — never alternatives

Before writing any custom component, check if it exists in the Osmos design system:
- Use the MCP tool `search_components` to find by intent (e.g. "dropdown", "notification")
- Use `list_components` to browse all 113 available components by category
- Check `docs/UI-COMPONENT-REFERENCE.md` for the exact import pattern

**Never use:**
- Raw HTML (`<div>`, `<button>`, `<input>`, `<table>`) when a component exists
- Inline `style={{ }}` — use Chakra style props instead
- Other component libraries (Chakra directly, MUI, Ant Design, Shadcn, etc.)

```tsx
// ✅ CORRECT
import { Button, Card, Input, Alert } from "@onlinesales-ai/ui";

// ❌ WRONG
import { Button } from "@chakra-ui/react";
<div style={{ padding: "16px" }}>...</div>
```

### 2. Compound components — always use dot notation

Complex components attach sub-parts as properties. **Sub-parts do not exist as flat named imports.**

| ❌ Will crash (flat import) | ✅ Correct (dot notation) |
|---------------------------|--------------------------|
| `import { CardHeader }` | `Card.Header` |
| `import { TableRow, TableCell }` | `Table.Row`, `Table.Cell` |
| `import { TabsList, TabsTrigger }` | `Tabs.List`, `Tabs.Trigger` |
| `import { ModalContent, ModalBody }` | `Modal.Content`, `Modal.Body` |
| `import { DrawerBody }` | `Drawer.Body` |
| `import { MenuItem }` | `Menu.Item` |
| `import { RadioCardItem }` | `RadioCard.Item` |
| `import { StepsItem }` | `Steps.Item` |
| `import { AccordionItem }` | `Accordion.Item` |
| `import { AvatarGroup }` | `Avatar.Group` |

**Components that always use `.Root` + dot notation:**
Card, Table, Tabs, Modal, Drawer, Menu, Popover, Steps, Breadcrumb, RadioCard, CheckboxCard,
Accordion, Collapsible, Avatar, Stat, DataList, Timeline, ActionBar, Blockquote, CodeBlock,
Carousel, ColorPicker, Combobox, DatePicker, Editable, EmptyState, Fieldset, FileUpload,
Listbox, Loader, Marquee, Pagination, PinInput, ProgressCircle, QrCode, Rating, ScrollArea,
SegmentedControl, Slider, Splitter, Status, TagsInput, Toggle, TreeView, Wrap, SkipNav,
List, Clipboard, HoverCard

### 3. Wrap apps in OsmosProvider + import tokens.css

Every app entry point must have both:
```tsx
import { OsmosProvider } from "@onlinesales-ai/ui";
import "@onlinesales-ai/ui/tokens.css"; // makes --osmos-* CSS vars available

function App() {
  return (
    <OsmosProvider defaultColorMode="light">
      {/* your app */}
    </OsmosProvider>
  );
}
```

### 4. Use token-based style props — never hardcode values

```tsx
// ✅ CORRECT — uses design tokens
<Box p="4" color="fg.muted" bg="bg.subtle" borderRadius="md" shadow="sm" />

// ❌ WRONG — hardcoded values
<Box style={{ padding: "16px" }} color="#666" bg="#f5f5f5" />
```

**Spacing:** `1`=4px `2`=8px `3`=12px `4`=16px `5`=20px `6`=24px `8`=32px `10`=40px `12`=48px
**Semantic color tokens:** `fg` `fg.muted` `fg.subtle` `bg` `bg.muted` `bg.subtle` `border` `border.muted`
**colorPalette values:** `blue` `red` `green` `gray` `orange` `yellow` `purple` `teal` `cyan` `pink`
**Border radius:** `sm` `md` `lg` `xl` `2xl` `full`

### 5. Use CSS tokens in .css/.less files

When writing styles outside JSX, use `--osmos-*` variables (available after importing `tokens.css`):

```css
/* ✅ CORRECT */
.my-card {
  padding: var(--osmos-spacing-4);
  color: var(--osmos-fg-muted);
  border-radius: var(--osmos-radii-md);
  font-size: var(--osmos-fontSizes-sm);
  border: 1px solid var(--osmos-border);
}

/* ❌ WRONG */
.my-card { padding: 16px; color: #666; border-radius: 8px; }
```

Available: `--osmos-colors-*` `--osmos-spacing-*` `--osmos-fontSizes-*` `--osmos-radii-*`
`--osmos-shadows-*` `--osmos-zIndex-*` `--osmos-borders-*`
Semantic (light/dark): `--osmos-bg` `--osmos-fg` `--osmos-fg-muted` `--osmos-border`

### 6. Controlled state patterns

```tsx
// Open/close (Modal, Drawer, Popover, Collapsible)
const [open, setOpen] = React.useState(false);
<Modal.Root open={open} onOpenChange={(e) => setOpen(e.open)}>

// Value (Tabs, RadioCard, RadioGroup, Steps, SegmentedControl)
const [value, setValue] = React.useState("tab1");
<Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>

// Checkbox / Switch
<Checkbox checked={val} onCheckedChange={(e) => setVal(e.checked)} />
```

### 7. Figma → Code name mapping

| Figma Name | Code Component |
|---|---|
| Chips | `Badge` |
| Info Box | `Alert` |
| Spin Loader | `Spinner` / `Loader` |
| Toggle & Switch | `Switch` |
| Tags | `Tag` / `TagsInput` |
| Dropdowns | `Select` / `Menu` / `Combobox` |
| Input Fields | `Input` |
| Radio Buttons | `Radio` / `RadioCard` |

Full mapping: `mcp/osmos-ui-mcp/data/figma-code-map.json`

### 8. Known gaps — use package fallbacks

| Figma Component | Use Instead |
|---|---|
| Left Nav / Sidebar | `packages/sidebar-v2` |
| Top Bar / Header | `packages/header-v2` |
| Calendar | `packages/full-calendar-v2` |
| Graphs & Charts | `packages/highchart-v2` or `packages/linechart-v2` |
| Filter | `packages/filter-form-v2` |

### 9. Design System Docs

- **Full component reference:** `docs/UI-COMPONENT-REFERENCE.md` — all 113 components
- **Claude rules (copy to new projects):** `docs/CLAUDE-UI-INSTRUCTIONS.md`
- **Component library README:** `components/README.md`
- **Theme system:** `components/src/theme/THEME.md`
- **Figma ↔ Code audit:** `docs/FIGMA-STORYBOOK-AUDIT.md`
- **Figma file:** https://www.figma.com/design/58jL2Gbe53rBhxOysvHM82/Design-System-OS
