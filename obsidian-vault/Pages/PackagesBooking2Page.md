---
type: page
name: PackagesBooking2Page
nav-id:
section: Packages
group:
screen-type: data-management-list
status: wired
source-file: src/advertiser/pages/PackagesBooking2Page.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, packages, data-management-list, wired, alpha]
---

# PackagesBooking2Page

**Section:** Packages (Alpha)
**Screen type:** data-management-list

Phase 7a. Flexi bookings list — 4 KPI stat cards + table with Upload Ads progress bar + FlexiPackageBookingDrawer.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Icon]]
- [[Components/molecules/StatCard]]

## Notable Patterns

- Upload Ads progress bar inline in table rows (adsUploaded / adsTotal)
- Status values: Active · Draft · Scheduled · Cancelled

## Notes

Opens `FlexiPackageBookingDrawer` with `isBookingPage=true`. No dedicated nav-id — accessed via Packages sub-navigation.
