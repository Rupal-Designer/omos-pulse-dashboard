---
type: component
layer: molecule
name: Upload File
figma-component-key: "c9e4315ab258f04a4c125075014c32a46c084322"
figma-node-id: "6493:52281"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/components/Upload File"
tags: [molecule, input, upload, drag-drop, file]
source-file: src/ui/molecules/UploadDropzone.jsx
export-name: UploadDropzone
png: ../Assets/Components/molecules/UploadFile.png
last-updated: 2026-05-15
---

# Upload File

![UploadFile](../Assets/Components/molecules/UploadFile.png)

Dashed-border drag-and-drop upload zone. Composes into [[Components/patterns/UploadPage]] automatically. Used for CSV bulk-upload flows.

## Variants

| Variant | Description |
|---------|-------------|
| Default | Empty zone with icon + instructions |
| Hover / Drag-over | Highlighted border, "Drop here" text |
| Uploading | Progress indicator inside zone |
| Success | File name shown with green check |
| Error | Red border + error message |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| onUpload | function | — | Called with File object |
| accept | string | — | MIME types e.g. "text/csv" |
| label | string | — | Zone label text |
| maxSize | number | — | Max bytes |
| successMessage | string | — | Shown after upload |

## Usage Guidelines
- Always show accepted formats and max file size
- Show [[Components/molecules/InfoBanner]] above the zone with template download link
- After upload, replace zone with success state — don't navigate away

## Code Import
```js
import { UploadDropzone } from '../../ui';
```

## Used In
- [[Components/patterns/UploadPage]] — full upload flow
- [[Pages/AccountManagerMappingPage]]
- [[Pages/AttributionOverridesPage]]

## Figma Reference
Component key: `c9e4315ab258f04a4c125075014c32a46c084322`
Library: Design System OS
