---
type: component
layer: molecule
name: Search
figma-component-key: "cc6ba912896e63e87532351d9b587167494c6565"
figma-node-id: "922:12552"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Search"
tags: [molecule, input, search, filter]
source-file: src/ui/molecules/SearchBar.jsx
export-name: SearchBar
png: ../Assets/Components/molecules/Search.png
last-updated: 2026-05-15
---

# Search

![Search](../Assets/Components/molecules/Search.png)

Search input with magnifier icon. Always placed in the right slot of [[Components/molecules/Toolbar]]. Emits `onChange` on every keystroke (debounce externally if needed).

## Variants

| Variant | Description |
|---------|-------------|
| Default | Outlined input with leading search icon |
| Filled | With current value text |
| Active / Focused | Expanded with blue ring |
| Disabled | Greyed out |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | string | — | Controlled |
| onChange | function | — | Called on every keystroke |
| placeholder | string | "Search..." | |
| width | number\|string | 200px | |
| style | object | — | |

## Usage Guidelines
- Right slot of Toolbar — `<Toolbar right={<SearchBar value={q} onChange={setQ} />} />`
- Debounce onChange externally (300–500ms) before hitting API
- Clear button (×) appears when value is non-empty

## Code Import
```js
import { SearchBar } from '../../ui';
```

## Related Components
- [[Components/molecules/Toolbar]] — always wraps SearchBar
- [[Components/molecules/DropdownMenu]] — for filtered selection from a list

## Figma Reference
Component key: `cc6ba912896e63e87532351d9b587167494c6565`
Library: Design System OS
