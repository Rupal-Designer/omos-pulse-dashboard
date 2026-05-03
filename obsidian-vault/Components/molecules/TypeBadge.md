---
type: component
layer: molecule
name: TypeBadge
tags: [molecule, ui-component, display]
source-file: src/ui/atoms/Badge.jsx
export-name: TypeBadge
last-updated: 2026-04-29T12:00:00Z
---

# TypeBadge

Custom badge for arbitrary categories with user-supplied color map. Used in log-viewer screen type for event type coloring.

## Import

```js
import { TypeBadge } from '../../ui';
// or direct
import { Badge, TypeBadge } from '../../ui/atoms/Badge';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| type | string | — | Category key looked up in `colorMap` |
| colorMap | `{type: {bg, color}}` | — | Provides background and text color per type |
| style | object | — | |

## Usage Example

```jsx
const EVENT_COLORS = {
  info:    { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  error:   { bg: 'rgba(220,38,38,0.1)',              color: '#dc2626' },
  warning: { bg: 'rgba(245,166,35,0.12)',            color: 'var(--osmos-brand-amber)' },
  success: { bg: 'var(--osmos-brand-green-muted)',   color: 'var(--osmos-brand-green)' },
};
<TypeBadge type={row.eventType} colorMap={EVENT_COLORS} />
```

## Used By

- [[Pages/ActivityLogPage]]
- [[Pages/DeveloperSettingsPage]]

## Related Components

- [[Components/atoms/Badge]]
