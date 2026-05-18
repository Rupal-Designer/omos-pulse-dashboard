---
type: component
layer: atom
name: Toast
figma-node-id: "99:18351"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Toast"
tags: [atom, ui-component, notification, interactive]
source-file: src/ui/atoms/Toast.jsx
export-name: Toast
png: ../Assets/Components/atoms/Toast.png
last-updated: 2026-05-15
---

# Toast

![Toast](../Assets/Components/atoms/Toast.png)

Fixed top-right notification banner. Always use the `useToast` hook — never manage toast state manually.

## Import

```js
import { Toast, useToast } from '../../ui';
```

## Usage

```jsx
const { toast, showToast } = useToast();

// Trigger:
showToast('User deleted', 'success');     // type: success | error | info
showToast('Something failed', 'error', 5000); // custom duration ms

// Render at component root:
<Toast visible={toast.visible} message={toast.message} type={toast.type} />
```

## Used By

- [[Pages/SetupDetailsPage]]
- All data-management-list pages (delete/save confirmations)
<!-- TODO: verify via import scan -->
