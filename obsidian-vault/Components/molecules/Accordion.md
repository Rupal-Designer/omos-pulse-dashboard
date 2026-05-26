---
type: component
layer: molecule
name: Accordion
figma-node-id: "5684:1685"
figma-library: "Design System OS"
figma-page: "❖Accordion"
tags: [molecule, accordion, collapsible, disclosure]
png: ../Assets/Components/molecules/Accordion.png
last-updated: 2026-05-15
---

# Accordion

![Accordion](../Assets/Components/molecules/Accordion.png)

Vertically stacked disclosure panels. Each item has a clickable header that expands or collapses its content area.

## Variants

| Variant | Description |
|---------|-------------|
| Default | Single expand at a time |
| Multiple | Multiple panels can be open |
| Flush | No border/card wrapper — flush with parent |

## Props / API

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | string[] | [] | Controlled open items |
| onValueChange | function | — | `(e) => setValue(e.value)` |
| multiple | boolean | false | Allow multiple open |
| collapsible | boolean | false | Allow closing all |

## Code Import
```js
import { Accordion } from '@onlinesales-ai/ui';

// Usage (dot notation):
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
    <Accordion.ItemContent>Content</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

## Usage Guidelines
- Use for FAQs, settings panels, and long-form content with clear sections
- Keep header labels concise — one line max
- Default to single-expand to reduce cognitive load

## Related Components
- [[Components/molecules/Drawer]] — for more complex side-panel content
- [[Components/molecules/Tabs]] — for peer-level content switching

## Figma Reference
Page: ❖Accordion (node `5684:1685`)
Library: Design System OS
