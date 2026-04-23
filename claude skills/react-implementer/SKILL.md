---
name: react-implementer
description: "Generate production React code from a Screen Spec, Figma wireframe, or verbal description using ONLY the @rishikeshjoshi-morpheus/ui component library. Use this skill whenever someone says 'implement this screen', 'build the React for this', 'code this UI', 'create the component', 'generate the frontend', or when the design-orchestrator chains to this skill. NEVER use raw HTML elements, inline styles, or other component libraries. Every element must come from the Osmos UI library. Also trigger when someone asks to 'migrate' an existing screen to use proper components."
---

# React Implementer

Generates production-ready React code using **exclusively** the `@rishikeshjoshi-morpheus/ui` component library. Zero inline styles. Zero raw HTML. Every UI element maps to a library component.

## Before You Start

**Read `references/component-api.md`** for the complete API reference of all 108 components.

## ⛔ Stop-and-Verify Rule — Never Implement Invented Content

Before writing a single line of code, scan the Screen Spec (or any input) for these red flags:

| Red flag | Example | Action |
|---|---|---|
| Generic-sounding feature names not tied to the product | `"Smart Shopping Campaign"`, `"Manual CPC"`, `"Display Ads"` as row labels in a config table | **STOP** — ask the user to confirm the real feature names |
| Placeholder text still in the spec | `"Lorem Ipsum"`, `"Title *"`, `"New Title"`, `"Help Text here"` | **STOP** — mark as `[NEEDS REAL COPY]` and ask |
| Column headers that look like tab names but the spec says matrix | Spec says `screenType: permission-matrix` but you're tempted to render tabs | **STOP** — render as a wide table, not tabs |
| Any data that feels like it was guessed rather than extracted | Feature list that sounds like a generic ad-tech product rather than the specific product in the design | **STOP** — refuse to invent, ask for the real list |

**The rule:** If you are not 100% certain a string came from the actual Figma/screenshot/spec, do not put it in the code. Mark it `[UNVERIFIED]` and surface it to the user before proceeding.

---

## Permission Matrix Implementation Guide

When the Screen Spec has `screenType: "permission-matrix"`, implement as a **single wide table** — NOT as tabs:

```jsx
// ✅ CORRECT — all columns visible simultaneously
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Platinum</th>
      <th>Gold</th>
      <th>Silver</th>
      <th>Beta</th>
    </tr>
  </thead>
  <tbody>
    {FEATURES.map(feature => (
      <tr key={feature.id}>
        <td>{feature.label}</td>
        {PERSONAS.map(persona => (
          <td key={persona}>
            <input type="checkbox"
              checked={config[persona][feature.id]}
              onChange={() => handleToggle(persona, feature.id)} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

// ❌ WRONG — do NOT render as tabs when the design shows columns
<Tabs>
  <Tab label="Platinum">...</Tab>
  <Tab label="Gold">...</Tab>
</Tabs>
```

## Critical Rules (Non-Negotiable)

### 1. ONLY use `@rishikeshjoshi-morpheus/ui`

```jsx
// ✅ CORRECT
import { Button, Table, Modal, Input, Select, Alert } from '@rishikeshjoshi-morpheus/ui';

// ❌ WRONG — never do any of these
import { Button } from '@chakra-ui/react';      // NO direct Chakra
<div style={{ padding: 16 }}>                     // NO inline styles
<button onClick={handleClick}>                    // NO raw HTML
<table><tr><td>                                   // NO raw HTML tables
```

### 2. Compound components use DOT NOTATION only

Sub-components are attached as properties. They do NOT exist as flat imports.

```jsx
// ✅ CORRECT
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Name</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

// ❌ WRONG — these will crash
import { TableRow, TableCell } from '@rishikeshjoshi-morpheus/ui';
import { ModalBody, ModalContent } from '@rishikeshjoshi-morpheus/ui';
```

### 3. Style via Chakra props — never inline

```jsx
// ✅ CORRECT
<Box p="4" bg="white" borderRadius="lg" borderWidth="1px" borderColor="border" />
<Text fontSize="xs" color="fg.muted" fontWeight="medium" />
<Flex gap="3" alignItems="center" justifyContent="space-between" />

// ❌ WRONG
<div style={{ padding: 16, background: 'white', borderRadius: 8 }} />
```

### 4. Controlled state patterns

```jsx
// Modal/Drawer open/close
const [open, setOpen] = useState(false);
<Modal open={open} onOpenChange={(d) => { if (!d.open) setOpen(false); }}>

// Select/Tabs value
const [value, setValue] = useState('tab1');
<Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>

// Checkbox/Switch
<Checkbox checked={val} onCheckedChange={(e) => setVal(e.checked)} />
<Switch checked={val} onCheckedChange={(e) => setVal(e.checked)} />
```

## Component Quick Reference

### Layout
| Need | Use |
|------|-----|
| Generic container | `Box` |
| Horizontal layout | `Flex` or `HStack` |
| Vertical layout | `Stack` or `VStack` |
| Grid layout | `Grid` |
| Push items apart | `Spacer` inside `Flex` |

### Data Display
| Need | Use |
|------|-----|
| Data grid | `Table.Root` → `.Header` → `.Body` → `.Row` → `.Cell` / `.ColumnHeader` |
| KPI metric | `Stat.Root` → `.Label` → `.ValueText` |
| Key-value list | `DataList.Root` → `.Item` → `.ItemLabel` → `.ItemValue` |
| Timeline/history | `Timeline.Root` → `.Item` → `.Indicator` → `.Connector` → `.Content` |

### Forms
| Need | Use |
|------|-----|
| Text input | `Input` (label, helperText, errorText, required, invalid) |
| Dropdown | `Select` (label, placeholder, options: [{label, value}]) |
| Toggle | `Switch` (label, checked, onCheckedChange) |
| Checkbox | `Checkbox` (label, checked, onCheckedChange) |
| Text area | `Textarea` |

### Feedback
| Need | Use |
|------|-----|
| Info/warning banner | `Alert` (status: info/warning/error/success, title, closable) |
| Status label | `Badge` (colorPalette, variant: solid/subtle/outline) |
| Category tag | `Tag` (colorPalette, variant, size) |
| Tooltip | `Tooltip` |

### Overlays
| Need | Use |
|------|-----|
| Center dialog | `Modal` → `.Content` → `.Header` → `.Body` → `.Footer` |
| Side panel | `Drawer` → `.Content` → `.Header` → `.Body` → `.Footer` |
| Dropdown menu | `Menu.Root` → `.Trigger` → `.Content` → `.Item` |
| Popover | `Popover.Root` → `.Trigger` → `.Content` |

### Navigation
| Need | Use |
|------|-----|
| Breadcrumbs | `Breadcrumb.Root` → `.List` → `.Item` → `.Link` |
| Tab navigation | `Tabs.Root` → `.List` → `.Trigger` → `.Content` |
| Step wizard | `Steps.Root` → `.List` → `.Item` → `.Content` → `.NextTrigger` |
| Pagination | `Pagination` (Root, Items, PrevTrigger, NextTrigger) |

### Actions
| Need | Use |
|------|-----|
| Primary action | `Button` (colorPalette="blue" or "green") |
| Secondary action | `Button` (variant="outline") |
| Subtle action | `Button` (variant="ghost") |
| Icon button | `Button` with Icon child |

## Spacing Token Reference

| Token | Pixels |
|-------|--------|
| `"1"` | 4px |
| `"2"` | 8px |
| `"3"` | 12px |
| `"4"` | 16px |
| `"5"` | 20px |
| `"6"` | 24px |
| `"8"` | 32px |
| `"10"` | 40px |

## Semantic Color Tokens

Use these instead of hex values:
- `fg` — primary text
- `fg.muted` — secondary text
- `fg.subtle` — tertiary/disabled text
- `bg` — primary background
- `bg.muted` — secondary background
- `bg.subtle` — tertiary background
- `border` — primary border
- `border.muted` — subtle border
- `blue.500`, `green.500`, `red.500` etc. — palette colors

## File Structure

Output a single `.jsx` file per screen, placed in `src/components/`:

```
src/components/
  AdvertisersPage.jsx    ← main page + all modals in one file
```

For complex pages with many modals, keep them in the same file as internal components unless the user asks for separation.

## Process

1. Read the Screen Spec JSON or analyze the input
2. Map each zone to the correct library component
3. Generate the complete React component with:
   - All imports from `@rishikeshjoshi-morpheus/ui`
   - Mock data constants at the top
   - Internal modal/drawer components
   - Main page component as default export
   - All state management (useState for modals, selections, filters)
4. Write the file to `src/components/`
5. Update `App.jsx` to import and route to the new page

## Known Gaps — Package Fallbacks

These components don't exist in the UI library. Use these monorepo packages instead:
- **Sidebar/Left Nav** → `packages/sidebar-v2`
- **Header/Top Bar** → `packages/header-v2`
- **Charts** → `recharts` (already installed) or `packages/highchart-v2`
- **Calendar** → `packages/full-calendar-v2`
- **Complex filters** → `packages/filter-form-v2`

For these, inline SVG icons or simple styled Box components are acceptable as temporary stand-ins.
