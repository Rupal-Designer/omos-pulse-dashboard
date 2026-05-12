---
type: reference
name: shared-ui — Canonical Design System Reference
tags: [design-system, morpheus, chakra, reference]
path: /Users/rishikeshjoshi/shared-ui
package-name: "@rishikeshjoshi-morpheus/ui"
package-version: "1.1.0"
last-updated: 2026-05-04T00:00:00Z
---

# shared-ui — Canonical Design System

**Location:** `/Users/rishikeshjoshi/shared-ui/`
**Published as:** `@rishikeshjoshi-morpheus/ui` v1.1.0
**Foundation:** Chakra UI v3 + custom `--osmos-*` CSS variable system

This is the **single source of truth** for all visual design decisions. When OMOS TEST's UI diverges from this, run the migration skills.

---

## Directory Structure

```
shared-ui/
├── components/
│   └── src/
│       ├── ui/               ← 113 component folders (each has ComponentName.tsx + index.ts)
│       ├── theme/
│       │   ├── recipes/      ← Chakra recipes: button.ts, badge.ts, input.ts, etc.
│       │   ├── semantic-tokens/
│       │   │   ├── colors.ts   ← bg.*, fg.*, border.*, colorPalette definitions
│       │   │   ├── radii.ts    ← l1(2px), l2(4px), l3(6px)
│       │   │   └── shadows.ts  ← xs, sm, md, lg, xl, 2xl
│       │   ├── text-styles.ts  ← 2xs(10px) xs(12px) sm(14px) md(16px) lg(18px)
│       │   └── index.ts
│       ├── providers/        ← OsmosProvider, ColorModeProvider
│       └── index.ts          ← barrel export for entire library
```

---

## Key Files for Visual Reference

| What you want to check | File |
|---|---|
| Button sizes / variants / padding | `theme/recipes/button.ts` |
| Badge sizes / variants / padding | `theme/recipes/badge.ts` |
| Input sizes / variants / padding | `theme/recipes/input.ts` |
| Font sizes and line heights | `theme/text-styles.ts` |
| Semantic color tokens (bg, fg, border) | `theme/semantic-tokens/colors.ts` |
| Border radius scale | `theme/semantic-tokens/radii.ts` |
| Shadow scale | `theme/semantic-tokens/shadows.ts` |
| Component implementation | `ui/<ComponentName>/<ComponentName>.tsx` |

---

## Design Token Quick Reference

### Spacing Scale (Chakra, 1 unit = 4px)
`1`=4px `2`=8px `2.5`=10px `3`=12px `3.5`=14px `4`=16px `4.5`=18px `5`=20px `6`=24px `8`=32px `10`=40px `12`=48px

### Font Sizes (textStyle tokens)
| Token | Size | Line height |
|---|---|---|
| `2xs` | 10px | 0.75rem |
| `xs` | 12px | 1rem |
| `sm` | 14px | 1.25rem |
| `md` | 16px | 1.5rem |
| `lg` | 18px | 1.75rem |
| `xl` | 20px | 1.875rem |

### Border Radius
| Token | Resolves to | Raw |
|---|---|---|
| `l1` | `xs` | 2px |
| `l2` | `sm` | 4px |
| `l3` | `md` | 6px |

### Semantic Colors (light mode)
| Token | Light mode value |
|---|---|
| `bg` | white |
| `bg.subtle` | gray.50 |
| `bg.muted` | gray.100 |
| `fg` | black |
| `fg.muted` | gray.600 |
| `fg.subtle` | gray.400 |
| `border` | gray.200 |
| `border.muted` | gray.100 |

### colorPalette — Brand (default colorPalette not set; callers pass e.g. `colorPalette="blue"`)
Each palette has: `.solid` `.subtle` `.muted` `.emphasized` `.fg` `.contrast` `.focusRing` `.border`

---

## Component Pattern Rules

### 1. `Object.assign` compound pattern
All compound components attach sub-parts to the Root via `Object.assign`:
```ts
export const Card = Object.assign(Root, { Header, Body, Footer, Title, Description });
```
This means `Card` IS the root — there is **no `Card.Root`**. Same for Modal, Drawer, Tabs, etc.

### 2. Prop API conventions
```tsx
// Open/close (Modal, Drawer, Collapsible)
open={boolean}  onOpenChange={(e) => setOpen(e.open)}  onClose={() => {}}

// Value (Tabs, RadioCard, Steps, SegmentedControl)
value={string}  onValueChange={(e) => setValue(e.value)}

// Checkbox / Switch
checked={bool}  onCheckedChange={(e) => setChecked(e.checked)}
```

### 3. colorPalette usage
All color-aware components use `colorPalette` (not `colorScheme`):
```tsx
<Badge colorPalette="green" variant="subtle">Active</Badge>
<Button colorPalette="blue" variant="solid">Save</Button>
```

### 4. CSS token variables
After importing `tokens.css`, all Chakra tokens are available as `--osmos-*` CSS variables:
```css
var(--osmos-spacing-4)   /* 16px */
var(--osmos-fg-muted)    /* gray.600 */
var(--osmos-border)      /* gray.200 */
var(--osmos-radii-md)    /* 6px */
```

---

## Component Inventory (113 total)

Accordion, ActionBar, Alert, AspectRatio, Avatar, Badge, Bleed, Blockquote, Box, Breadcrumb,
Button, Card, Carousel, Center, Checkbox, CheckboxCard, Checkmark, ClientOnly, Clipboard,
CloseButton, Code, CodeBlock, Collapsible, ColorModeToggle, ColorPicker, ColorSwatch, Combobox,
Container, DataList, DatePicker, DownloadTrigger, Drawer, Editable, Em, EmptyState, Environment,
Field, Fieldset, FileUpload, Flex, Float, FocusTrap, For, Format, Grid, Group, Heading,
Highlight, HoverCard, Icon, Image, Input, InputAddon, InputElement, InputGroup, Kbd, Link,
List, Listbox, Loader, Locale, Mark, Marquee, Menu, Modal, NativeSelect, NumberInput, Pagination,
PinInput, Popover, Portal, Presence, Progress, ProgressCircle, QrCode, Quote, Radio, RadioCard,
Radiomark, Rating, ScrollArea, SegmentedControl, Select, Separator, Show, Skeleton, SkipNav,
Slider, Spacer, Span, Spinner, Splitter, Stack, Stat, Status, Steps, Sticky, Strong, Switch,
Table, Tabs, Tag, TagsInput, Text, Textarea, Timeline, Toast, Toggle, Tooltip, TreeView,
VisuallyHidden, Wrap

---

## Relationship to OMOS TEST

| Layer | Location | Role |
|---|---|---|
| shared-ui source | `/Users/rishikeshjoshi/shared-ui/components/src/ui/` | Canonical implementations |
| published package | `@rishikeshjoshi-morpheus/ui` (node_modules) | What OMOS TEST imports |
| OMOS TEST atoms | `src/ui/atoms/` | Backward-compat wrappers → delegates to morpheus |
| OMOS TEST molecules | `src/ui/molecules/` | Backward-compat wrappers OR custom (no morpheus equiv) |

See [[Components/shared-ui-comparison]] for the full 1:1 visual comparison with pixel-level specs.
