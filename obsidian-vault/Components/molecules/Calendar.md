---
type: component
layer: molecule
name: Calendar
figma-component-key: "85c3fc13452948d020710146d70f7ee2ed732cbd"
figma-node-id: "1026:7846"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Calendar"
tags: [molecule, input, date, picker, calendar]
png: ../Assets/Components/molecules/Calendar.png
last-updated: 2026-05-15
---

# Calendar

![Calendar](../Assets/Components/molecules/Calendar.png)

Date and date-range picker. Shown inline or as a dropdown. Used in report filters, campaign scheduling, and date-range controls.

## Variants

| Variant | Description |
|---------|-------------|
| Single | Pick one date |
| Range | Pick start + end date (two-panel layout) |
| Inline | Always visible, no trigger |
| Dropdown | Triggered from a date input field |

## Props / API (React)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | Date\|[Date, Date] | — | Single or range |
| onChange | function | — | |
| mode | single\|range | single | |
| minDate | Date | — | Earliest selectable |
| maxDate | Date | — | Latest selectable |
| open | boolean | false | For dropdown variant |

## Usage Guidelines
- Report date filters: always show last 30/7/custom presets alongside calendar
- Campaign scheduling: disable past dates with `minDate={new Date()}`
- Use `packages/full-calendar-v2` for event/slot calendar (not this component)

## Code Import
```js
import { DatePicker } from '@onlinesales-ai/ui';
// or full calendar:
import FullCalendar from '@onlinesales-ai/full-calendar-v2';
```

## Related Components
- [[Components/molecules/DropdownMenu]] — wraps Calendar as a date-picker dropdown

## Figma Reference
Component key: `85c3fc13452948d020710146d70f7ee2ed732cbd`
Library: Design System OS
