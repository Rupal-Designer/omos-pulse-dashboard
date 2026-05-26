---
type: component
layer: molecule
name: Stepper
figma-node-id: "883:57076"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Steps"
tags: [molecule, ui-component, navigation, form]
source-file: src/ui/molecules/Stepper.jsx
export-name: Stepper
png: ../Assets/Components/molecules/Stepper.png
last-updated: 2026-05-15
---

# Stepper

![Stepper](../Assets/Components/molecules/Stepper.png)

Step indicator for multi-step wizard flows. Displays numbered steps with active/completed/pending states.

## Import

```js
import { Stepper } from '../../ui';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| steps | string[] | — | Step label array |
| current | number | 0 | Active step index (0-based) |
| style | object | — | |
