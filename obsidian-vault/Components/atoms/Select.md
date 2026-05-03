---
type: component
layer: atom
name: Select
tags: [atom, ui-component, form, interactive]
source-file: src/ui/atoms/Input.jsx
export-name: Select
last-updated: 2026-04-29T12:00:00Z
---

# Select

Dropdown with label above. Co-exported with `Input` from `src/ui/atoms/Input.jsx`.

## Import

```js
import { Select } from '../../ui';
// or direct
import { Input, Select } from '../../ui/atoms/Input';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| label | string | — | Label rendered above dropdown |
| value | string | — | |
| onChange | function | — | |
| options | `[{value, label}]` | — | |
| required | boolean | — | |
| disabled | boolean | — | |
| style | object | — | |

## Notes

Access Role display in user tables is **not** a real Select dropdown — render as display text + ▾ chevron per quality rule #4.

## Used By

- [[Pages/OpsUsersPage]]
- [[Pages/SuperAdminUsersPage]]
- [[Pages/WalletRulesPage]]

## Related Components

- [[Components/atoms/Input]]
