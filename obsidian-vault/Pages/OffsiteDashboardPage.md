---
type: page
name: OffsiteDashboardPage
nav-id: offsite-ads
section: Offsite Ads
group:
screen-type: dashboard
status: wired
source-file: src/advertiser/pages/OffsiteDashboardPage.jsx
last-updated: 2026-05-14T00:00:00Z
tags: [page, offsite, dashboard, wired]
---

# OffsiteDashboardPage

**Nav ID:** `offsite-ads`
**Section:** Offsite Ads
**Screen type:** dashboard

Phase 4/5. Offsite Ads campaign dashboard — entry point for the multi-channel campaign wizard.

## Components Used

<!-- Confirmed by reading import statements in the source file -->
- [[Components/atoms/Button]]
- [[Components/atoms/Icon]]
- [[Components/atoms/Toast]]
- [[Components/molecules/StatCard]]
- [[Components/molecules/Toolbar]]

## Notable Patterns

- Hosts both `OffsiteCampaignWizard` and `MetaDPAWizard` — opened by "+ Create Campaign" CTA
- Uses shared `DataTable` component and `PerformanceTrend` sub-component

## Related Docs

- PRD: `docs/prd/offsite-ads-campaign-wizard.md`
- IA + Design Spec: `docs/prd/offsite-wizard-ia-design.md`
