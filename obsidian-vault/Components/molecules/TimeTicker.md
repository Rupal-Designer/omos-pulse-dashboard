---
type: component
layer: molecule
name: Time Ticker
figma-node-id: "3704:26772"
figma-library: "Design System OS"
figma-page: "❖Time Ticker"
tags: [molecule, timer, countdown, clock, live]
png: ../Assets/Components/molecules/TimeTicker.png
last-updated: 2026-05-15
---

# Time Ticker

![Time Ticker](../Assets/Components/molecules/TimeTicker.png)

Animated time display component. Shows a live countdown or elapsed time with formatted HH:MM:SS presentation. Used in auction timers, booking deadlines, and live campaign monitors.

## Variants

| Variant | Description |
|---------|-------------|
| Countdown | Counts down to a target timestamp |
| Elapsed | Counts up from a start time |
| Static | Non-animated time label |

## Props / API

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| mode | "countdown" \| "elapsed" \| "static" | "static" | |
| targetTime | Date \| number | — | Target for countdown |
| startTime | Date \| number | — | Start for elapsed |
| format | string | "HH:mm:ss" | Display format |
| onExpire | function | — | Callback when countdown hits zero |

## Usage Guidelines
- Use countdown mode for package auction deadlines and booking windows
- Use elapsed mode for active campaign runtime displays
- Always pair with a label explaining what the time represents

## Related Components
- [[Components/molecules/StatCard]] — for non-live metric display
- [[Pages/PackagesDashboardPage]] — primary host for auction countdowns

## Figma Reference
Page: ❖Time Ticker (node `3704:26772`)
Library: Design System OS
