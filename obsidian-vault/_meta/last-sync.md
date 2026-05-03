---
type: meta
last-updated: 2026-05-02T00:00:00Z
tags: [meta, sync]
---

# Last Sync

**ISO timestamp:** 2026-05-02T00:00:00Z

**Triggered by:** obsidian-knowledge-graph skill (incremental update)

**Stats:**
- Components: 8 atoms, 15 molecules, 1 pattern
- Pages: 51 wired nav IDs (45 unique components), 7 unwired
- Skills: 14 documented (layout-spacing rules added to react-implementer, shadcn-to-osmos, ux-ideator)
- Figma frames: 8 mapped
- Token violations: ~30 files with hardcoded colors (run `/token-enforcer` to fix)

**Changes this sync:**
- `StatCard` molecule — added `sub`, `icon`, `iconColor` props (Tier 2, 2026-05-02)
- `HomePage.md` (retailer) — local StatCard removed → src/ui StatCard; gap 12→20
- `FinanceDashboardPage.md` — StatCard added to Components Used; gap 14→20
- `ProductAdsAnalyticsPage.md` — StatCard added; gap 12→20
- `DisplayAdsAnalyticsPage.md` — StatCard added; gap 12→20
- `SponsoredAdsAnalyticsPage.md` — StatCard added; gap 12→20
- `ia-patterns.md §5` — NEW Layout & Spacing Guide (Figma-verified, source of truth)
- `react-implementer.md` Skill — added §5 Layout & Spacing rules
- `shadcn-to-osmos.md` Skill — added layout override section
- `ux-ideator.md` Skill — added ia-patterns §5 reference
