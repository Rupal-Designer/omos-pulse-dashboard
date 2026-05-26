---
type: component
layer: molecule
name: Filter
figma-node-id: "925:24344"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Filter"
tags: [molecule, input, filter, query, data-management]
png: ../Assets/Components/molecules/Filter.png
last-updated: 2026-05-15
---

# Filter

![Filter](../Assets/Components/molecules/Filter.png)

Filter trigger + overlay panel for applying data filters to tables and lists. Combines a button trigger with a popover that contains filter controls (checkboxes, dropdowns, date ranges).

## Variants

| Variant | Description |
|---------|-------------|
| Closed | Trigger button only (shows active filter count badge) |
| Open | Trigger + filter panel expanded |
| Applied | Active filters shown as chips below toolbar |

## Usage Guidelines
- Place filter trigger in the left slot of [[Components/molecules/Toolbar]]
- Show active filter count as a badge on the trigger button
- Each applied filter renders as a dismissible [[Components/atoms/Tag]] chip
- "Clear all" link removes all filters at once

## Code Import
```js
import { FilterForm } from '@onlinesales-ai/filter-form-v2';
```
> For complex multi-condition queries, use `packages/filter-form-v2` instead of composing raw filter components.

## Related Components
- [[Components/molecules/Toolbar]] — hosts the filter trigger
- [[Components/atoms/Tag]] — applied filter chips
- [[Components/molecules/DropdownMenu]] — individual filter option pickers

## Figma Reference
Node ID: `925:24344`
Library: Design System OS
