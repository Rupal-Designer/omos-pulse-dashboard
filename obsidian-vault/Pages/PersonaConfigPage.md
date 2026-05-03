---
type: page
name: PersonaConfigPage
nav-id: persona-config
section: Control Center
group: Advertiser Persona Management
screen-type: permission-matrix
status: wired
source-file: src/retailer/components/PersonaConfigPage.jsx
last-updated: 2026-04-29T18:00:00Z
tags: [page, control-center, persona, permission-matrix, wired]
---

# PersonaConfigPage

**Nav ID:** `persona-config`
**Section:** Control Center › Advertiser Persona Management
**Screen type:** permission-matrix

## Implementation Notes

- Wide table with ALL persona columns visible simultaneously (NOT tabs)
- First column sticky (Feature, minWidth 320px)
- Per-cell: `<Checkbox checked={config[persona][featureId]} onChange={...} />`
- Persona dot colors: Platinum=#94a3b8, Gold=#f59e0b, Silver=#64748b, Beta=#8b5cf6

## Components Used

- [[Components/atoms/Checkbox]]
- [[Components/molecules/Toolbar]]
- [[Components/molecules/SearchBar]]
- [[Components/atoms/Button]]
- [[Components/atoms/Toast]]

## Figma Frames

- [[Figma/frames/13-92792]] — Persona Configuration
