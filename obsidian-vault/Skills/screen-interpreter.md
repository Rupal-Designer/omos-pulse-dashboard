---
type: skill
name: screen-interpreter
category: design-pipeline
requires-figma-mcp: false
auto-fixes: false
last-updated: 2026-04-29T18:00:00Z
tags: [skill, design-pipeline]
---

# screen-interpreter

Interprets any UI input — screenshot, sketch photo, Figma URL, or text brief — and produces a structured Screen Spec JSON that downstream skills consume.

## When to Use

First step in the design-to-code pipeline. Use before [[Skills/react-implementer]] or [[Skills/figma-wireframer]].

## Inputs

- Screenshot or photo
- Figma URL (requires Figma MCP for node tree access)
- Text brief or PRD

## Output

Screen Spec JSON with: `screenType`, `zones` (breadcrumb, topBar, toolbar, dataTable, pagination, drawers), `dataRequirements`

## Chains To

- [[Skills/figma-wireframer]]
- [[Skills/react-implementer]]
- [[Skills/design-orchestrator]]
