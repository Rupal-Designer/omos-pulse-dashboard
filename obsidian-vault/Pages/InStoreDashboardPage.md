---
type: page
name: InStoreDashboardPage
nav-id: in-store-digital
section: In-Store Digital Ads
group:
screen-type: dashboard
status: wired
source-file: src/advertiser/pages/InStoreDashboardPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, in-store, dashboard, wired]
---

# InStoreDashboardPage

**Nav ID:** `in-store-digital`
**Section:** In-Store Digital Ads
**Screen type:** dashboard

Phase 5 implementation. DOOH (Digital Out-of-Home) campaign management dashboard.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Button]]
- [[Components/atoms/Icon]]
- [[Components/molecules/StatCard]]

## Key Metrics

6 KPI stat cards: Booking Amount · Ad Plays · Cost Per Play · Slots Booked · Gross Impressions · OTS

## Campaign Table Columns

Status · Campaign Name · Screen Type · Campaign Priority · No. of Screens · No. of Stores · Approval Status · Booking Amount · Ad Plays · Cost Per Play

## Notable Patterns

- **ApprovalStatusBar** — green/grey segmented progress bar showing N/M approved screens
- **Status badges:** On Hold (amber) · Active (green) · Paused (amber)
- **3-step booking wizard** via `InStoreBookingDrawer` (Screen Selection → Ads Upload → Plays Booking)
- Footer CTAs: Back/Next on steps 1–2; Release Hold + Pay & Book Now on step 3

## Token Violations

Hardcoded colors present: `#dc2626`, `#0d9488` (teal), `#7c3aed` (purple), `#ea580c` (orange), `#fef3c7`, `#b45309`, `#e2e8f0`, `#94a3b8`. Run `/token-enforcer` to fix.

## Notes

All campaigns in the test account show `On Hold` status by default. The approval progress bar renders inline in the Approval Status column — not a separate component.
