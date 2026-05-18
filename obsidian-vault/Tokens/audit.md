---
type: token-audit
last-updated: 2026-05-14T00:00:00Z
tags: [tokens, design-system, audit]
violation-count: 40+
---

# Token Audit

Run date: 2026-05-14
Command: `grep -rn --include="*.jsx" -E "(#[0-9a-fA-F]{3,8}|rgb\(|rgba\()" src/advertiser/pages/`

## Summary

40+ hardcoded color values found across new pages (phases 5–7b). Run `/token-enforcer` to replace with `var(--osmos-*)` tokens.

## New Violations (phases 5–7b)

| File | Value | Suggested Token |
|------|-------|----------------|
| InStoreDashboardPage.jsx | `#dc2626` | `var(--osmos-brand-red)` |
| InStoreDashboardPage.jsx | `#0d9488` | `var(--osmos-brand-teal)` |
| InStoreDashboardPage.jsx | `#7c3aed` | `var(--osmos-brand-purple)` |
| InStoreDashboardPage.jsx | `#ea580c` | `var(--osmos-brand-orange)` |
| InStoreDashboardPage.jsx | `#fef3c7` | `var(--osmos-brand-amber-muted)` |
| InStoreDashboardPage.jsx | `#b45309` | `var(--osmos-brand-amber-dark)` |
| InStoreDashboardPage.jsx | `#e2e8f0` | `var(--osmos-border)` |
| InStoreDashboardPage.jsx | `#94a3b8` | `var(--osmos-fg-subtle)` |
| PackagesDashboardPage.jsx | `#dc2626` | `var(--osmos-brand-red)` |
| PackagesDashboardPage.jsx | `#dcfce7` | `var(--osmos-brand-green-muted)` |
| PackagesDashboardPage.jsx | `#16a34a` | `var(--osmos-brand-green)` |
| PackagesDashboardPage.jsx | `#ffedd5` | `var(--osmos-brand-orange-muted)` |
| PackagesDashboardPage.jsx | `#1e293b` | `var(--osmos-fg)` |
| OffsiteDashboardPage.jsx | `#ef4444` | `var(--osmos-brand-red)` |
| OffsiteDashboardPage.jsx | `#2563eb` | `var(--osmos-brand-blue)` |
| OffsiteDashboardPage.jsx | `#1877F2` | channel brand color (Meta — exempt) |
| OffsiteDashboardPage.jsx | `#EA4335` | channel brand color (Google — exempt) |
| OffsiteDashboardPage.jsx | `#000000` | channel brand color (TikTok — exempt) |
| OffsiteDashboardPage.jsx | `#FFFC00` | channel brand color (Snapchat — exempt) |
| OffsiteDashboardPage.jsx | `#FF0000` | channel brand color (YouTube — exempt) |
| OffsiteDashboardPage.jsx | `#4285F4` | channel brand color (DV-360 — exempt) |
| DisplayAdsDashboardPage.jsx | `#7c3aed` | `var(--osmos-brand-purple)` |
| DisplayAdsDashboardPage.jsx | `#2563eb` | `var(--osmos-brand-blue)` |
| DisplayAdsDashboardPage.jsx | `#dc2626` | `var(--osmos-brand-red)` |
| DisplayAdsDashboardPage.jsx | `#16a34a` | `var(--osmos-brand-green)` |
| BYOTDashboardPage.jsx | `#dc2626` | `var(--osmos-brand-red)` |
| BYOTDashboardPage.jsx | `#cbd5e1` | `var(--osmos-border)` |
| PackagesBooking2Page.jsx | `#dc2626` | `var(--osmos-brand-red)` |
| PackagesBooking2Page.jsx | `#16a34a` | `var(--osmos-brand-green)` |
| PackagesBooking2Page.jsx | `#d97706` | `var(--osmos-brand-amber)` |
| PackagesBooking2Page.jsx | `#7c3aed` | `var(--osmos-brand-purple)` |
| PackagesBooking2Page.jsx | `#e2e8f0` | `var(--osmos-border)` |

## Exempt Values

Channel brand colors in `OffsiteDashboardPage.jsx` (Meta `#1877F2`, Google `#EA4335`, TikTok `#000000`, Snapchat `#FFFC00`, YouTube `#FF0000`, DV-360 `#4285F4`) — these are third-party brand identities and must not be replaced with Osmos tokens.

## Clean Files (phases 5–7b)

- `PackagesBooking1Page.jsx` — no raw hex values
- `PackagesAnalyticsPage.jsx` — no raw hex values

## Notes

`#fff` used as icon color in several pages is acceptable where needed for contrast on colored backgrounds (e.g. primary button text). All other hardcoded values should be tokenized.
