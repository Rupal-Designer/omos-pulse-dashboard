---
type: component
layer: molecule
name: Accordion
source-file: src/ui/molecules/Accordion.jsx
figma-node: "5684:1685"
last-updated: 2026-05-22T00:00:00Z
tags: [molecule, ui-component]
---

# Accordion

Vertically stacked collapsible disclosure panels; each item has a clickable header that expands or collapses its content area.

![[Assets/Components/molecules/Accordion.png]]

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `{ id: string, label: ReactNode, content?: ReactNode, children?: ReactNode }[]` | `[]` | Array of panel definitions |
| multiple | boolean | `false` | Allow more than one panel open at a time |
| defaultOpen | string[] | `[]` | IDs of panels open on first render (uncontrolled) |
| style | CSSProperties | — | Styles applied to the root element |

---

## Usage

```jsx
import { Accordion } from '../../ui';

// Items API (most common)
<Accordion
  items={[
    { id: 'a', label: 'Section A', content: <p>Content A</p> },
    { id: 'b', label: 'Section B', content: <p>Content B</p> },
  ]}
  multiple
  defaultOpen={['a']}
/>

// Compound API (custom content)
<Accordion.Root multiple>
  <Accordion.Item value="a">
    <Accordion.Trigger>Section A</Accordion.Trigger>
    <Accordion.Content>
      <Accordion.Body><p>Content A</p></Accordion.Body>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## Notes

- The convenience `items` API delegates to the full compound API internally.
- Compound sub-components exposed on `Accordion`: `.Root`, `.Item`, `.Trigger`, `.Content`, `.Body`.
- Each item's content can use either `content` or `children` key — both are supported.
- Figma node `5684:1685` in Design System OS library; Figma page: `❖Accordion`.
- Use for FAQs, settings groups, and long-form content with distinct sections. Default to single-expand (`multiple={false}`) to reduce cognitive load.
