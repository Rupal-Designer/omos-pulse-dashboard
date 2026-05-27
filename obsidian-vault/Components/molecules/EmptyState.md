---
type: component
layer: molecule
name: EmptyState
tags: [molecule, ui-component, display]
source-file: src/ui/molecules/EmptyState.jsx
export-name: EmptyState
last-updated: 2026-05-25T06:30:01Z
---

# EmptyState

Centered empty-state placeholder for tables and lists when there are no records.

## Import

```js
import { EmptyState } from '../../ui';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| title | string | — | Primary empty message |
| description | string | — | Sub-text |
| action | ReactNode | — | Optional CTA button |
