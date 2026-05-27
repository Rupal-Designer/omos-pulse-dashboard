---
type: component
layer: molecule
name: Error States
figma-node-id: "5629:27041"
figma-library: "Design System OS"
figma-page: "❖Error States"
tags: [molecule, error, empty-state, feedback, status]
png: ../Assets/Components/molecules/ErrorStates.png
last-updated: 2026-05-15
---

# Error States

![Error States](../Assets/Components/molecules/ErrorStates.png)

Standardized error and failure state patterns. Covers full-page errors, inline field errors, API failure states, and not-found screens. Ensures consistent user feedback across all error scenarios.

## Variants

| Variant | Description |
|---------|-------------|
| Full-page error | 404 / 500 / unauthorized — centered illustration + CTA |
| Inline error | Form field validation below input |
| API failure | Data-fetch failed in a card or table |
| No access | Permission-denied with contact CTA |

## Usage Guidelines
- Use full-page error for route-level failures (404, 500, access denied)
- Use inline error for form validation — never use Toast for field errors
- API failure states go inside the container where data would have appeared
- Always include a recovery action (retry / go home / contact support)
- Pair with [[Components/atoms/Toast]] only for transient, non-blocking errors

## Related Components
- [[Components/molecules/EmptyState]] — for no-data states (not failures)
- [[Components/atoms/Toast]] — for transient success/error notifications
- [[Components/molecules/InfoBanner]] — for page-level warnings

## Figma Reference
Page: ❖Error States (node `5629:27041`)
Library: Design System OS
