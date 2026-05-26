---
type: component
layer: molecule
name: InfoBanner
figma-node-id: "4454:77373"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Info Box"
tags: [molecule, ui-component, notification, display]
source-file: src/ui/molecules/InfoBanner.jsx
export-name: InfoBanner
png: ../Assets/Components/molecules/InfoBanner.png
last-updated: 2026-05-25T06:30:03Z
---

# InfoBanner

![InfoBanner](../Assets/Components/molecules/InfoBanner.png)

Alert or notification banner rendered above page content. Used in [[Components/patterns/UploadPage]] internally.

## Import

```js
import { InfoBanner } from '../../ui';
```

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| type | info\|warning\|error\|success | info | |
| message | string | — | Banner text |
| fileName | string | — | Upload page variant: file name display |
| fileDesc | string | — | Upload page variant: file description |
| downloadText | string | — | Upload page variant: download link label |
| onDownload | function | — | Upload page variant: download handler |
