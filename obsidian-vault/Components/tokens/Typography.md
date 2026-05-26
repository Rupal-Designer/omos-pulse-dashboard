---
type: token
layer: token
name: Typography
figma-node-id: "23:8522"
figma-page-id: "1:2390"
figma-library: "Design System OS"
figma-path: "design_systems/Design System OS/❖Typography/Typography"
tags: [token, typography, font, text, design-system]
png: ../Assets/Components/tokens/Typography.png
last-updated: 2026-05-15
---

# Typography

![Typography](../Assets/Components/tokens/Typography.png)

The type scale for the OnlineSales.ai Design System. Uses **Inter** as the primary typeface. All text sizes are available as CSS tokens via `--osmos-fontSizes-*`.

## Text Styles (Figma → CSS)

| Figma Style | Size | Weight | Usage |
|-------------|------|--------|-------|
| H1 XL | 40px | Bold | Hero headers |
| H1 Large | 32px | Bold | Page titles |
| H1 | 28px | Semi Bold | Section headers |
| H2 | 24px | Semi Bold | Sub-section headers |
| H3 | 20px | Semi Bold | Card/drawer titles |
| H4 (Title) | 18px | Semi Bold | Component titles |
| H5 (Sub Title) | 16px | Medium | Sub-titles |
| Body Text Large | 16px | Regular | Primary body copy |
| Body Text Medium | 14px | Regular | Default body text |
| Body Text Small (Default) | 13px | Regular | Table cells, labels |
| Body Text XSmall | 12px | Regular | Helper text, timestamps |
| Body Text Italic - 12px | 12px | Italic | Captions, quotes |

## CSS Tokens

```css
--osmos-fontSizes-xs: 12px;
--osmos-fontSizes-sm: 13px;
--osmos-fontSizes-md: 14px;
--osmos-fontSizes-lg: 16px;
--osmos-fontSizes-xl: 18px;
--osmos-fontSizes-2xl: 20px;
--osmos-fontSizes-3xl: 24px;
--osmos-fontSizes-4xl: 28px;
```

## Usage Guidelines
- Use semantic text tokens, not raw px values
- Inter "Semi Bold" has a space — not "SemiBold" (Figma spelling rule)
- Headings use `color="fg"`, body uses `color="fg"`, muted uses `color="fg.muted"`

## Figma Reference
Page: `❖Typography` (id: `1:2390`)
Typography frame: `23:8522`
Library: Design System OS
