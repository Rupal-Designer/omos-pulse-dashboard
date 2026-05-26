---
type: page
name: PackagesDashboardPage
nav-id: packages
section: Packages
group:
screen-type: data-management-list
status: wired
source-file: src/advertiser/pages/PackagesDashboardPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, packages, data-management-list, wired, alpha]
---

# PackagesDashboardPage

**Nav ID:** `packages`
**Section:** Packages (Alpha)
**Screen type:** data-management-list

Phase 7a. Packages catalog — browse and book ad packages.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Icon]]

## Table Columns

Image · Name · Status · Available Until · Flight Start · Flight End · Cost · Line Items · Book Now CTA

## Notable Patterns

- **Status badges:** Available (green) · Newly Launched (orange) — via inline TypeBadge-style color map
- Opens `FlexiPackageBookingDrawer` on "Book Now"

## Token Violations

Hardcoded: `#dc2626`, `#dcfce7`, `#16a34a`, `#ffedd5`, `#EA580C`, `#1e293b`, `#fff`. Run `/token-enforcer`.
