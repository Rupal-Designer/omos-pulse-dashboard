---
name: figma-wireframer
description: "Create Figma wireframes and hi-fi mockups from a Screen Spec JSON or verbal description. Use this skill whenever someone says 'wireframe this', 'create a Figma mockup', 'design this screen in Figma', 'make a Figma file for this', or when the design-orchestrator or screen-interpreter chains to this skill. Requires Figma MCP tools (create_new_file, use_figma, search_design_system). Always check the Osmos design system library before creating components from scratch."
---

## ⚡ CARDINAL RULE — Figma is the Source of Truth

> **Every label, structure, group name, column header, button text, nav item name, and data value in the implementation MUST match the Figma design verbatim.** No paraphrasing. No inventing. No "close enough."
>
> - If Figma says `"Manage CPM/CPC Rules"` → code says `"Manage CPM/CPC Rules"` (not "Manage CPM Rules")
> - If Figma says `"Ops User"` (singular) → code says `"Ops User"` (not "Ops Users")
> - If Figma says `"Super Admin users"` (lowercase u) → code says `"Super Admin users"`
> - If Figma groups "Manage Segments" under **Audience Manager** → the nav puts it under Audience Manager (not Advertiser Settings)
> - If a text node is unreadable → mark it `[UNREADABLE]` and surface it to the user before writing any code
>
> **Do not trust your own inference about what a label "should" be.** Read the Figma text node. Copy it. Done.
>
> This rule overrides all other heuristics, templates, and defaults in this skill.

---

# Figma Wireframer

Takes a Screen Spec JSON (from screen-interpreter) or a verbal description and builds a proper Figma file using the Figma MCP tools.

## Prerequisites

- Figma MCP must be connected with a valid PAT
- Run `whoami` to get the plan key if you don't have it
- The Osmos Design System file key is: `58jL2Gbe53rBhxOysvHM82`

## Process

### Step 1: Create or Open File

If creating a new screen:
```
create_new_file(fileName: "Screen Name - Wireframe", planKey: "<plan_key>", editorType: "design")
```

If updating an existing file, use the provided file key.

### Step 2: Search Design System First

**ALWAYS** check the design system before creating anything from scratch:
```
search_design_system(query: "button", fileKey: "58jL2Gbe53rBhxOysvHM82")
search_design_system(query: "table", fileKey: "58jL2Gbe53rBhxOysvHM82")
search_design_system(query: "modal", fileKey: "58jL2Gbe53rBhxOysvHM82")
```

If a component exists in the library, import it via `importComponentByKeyAsync` instead of recreating it.

### Step 3: Build Frame Hierarchy

Using `use_figma`, create the frame structure matching the Screen Spec zones:

```javascript
// Example: Advertisers page
const page = figma.currentPage;

// Main frame (1440x900 desktop)
const mainFrame = figma.createFrame();
mainFrame.name = "Advertisers - Desktop";
mainFrame.resize(1440, 900);
mainFrame.layoutMode = "VERTICAL";
mainFrame.primaryAxisAlignItems = "MIN";
mainFrame.counterAxisAlignItems = "MIN";
mainFrame.paddingTop = 0;
mainFrame.paddingBottom = 0;
mainFrame.fills = [{ type: 'SOLID', color: { r: 0.929, g: 0.941, b: 0.961 } }]; // #EDF0F5
```

### Step 4: Apply Osmos Brand Tokens

**Read the `osmos-brand` skill** for the full token set. Key values:

| Token | Value | Use |
|-------|-------|-----|
| Navy gradient | `#2C266D → #3E266D → #4849B6` | Hero/dark sections |
| Content bg | `#F2F2FC` | Light backgrounds |
| White | `#FFFFFF` | Cards, modals |
| Border | `#E9E9E9` | Dividers |
| Blue accent | `#636CFF` | CTAs, links, active states |
| Mint | `#89F1D9` | Pop accents |
| Ink | `#181818` | Primary text |
| Ink muted | `#595959` | Secondary text |
| Headings | Montserrat 600-700 | Display type |
| Body | Lato 400 | Body text |
| Card radius | 10px | All cards |
| Table header bg | `#4849B6` | Table headers |

### Step 5: Build Each Zone

For each zone in the Screen Spec, create the corresponding Figma elements:

**Breadcrumb:** Text node with `>` separators, Lato 12px, color #888
**Alert banner:** Rounded rect (#E8F4FD bg), info icon, text
**Toolbar:** Auto-layout horizontal frame with buttons and filters
**Table:** Structured rows with auto-layout, alternating row colors (#FFFFFF, #FAFCFF)
**Modals:** Separate frames outside the main frame, with backdrop overlay

### Step 6: Output

Return:
1. **Figma file URL** — the link to the created file
2. **PNG screenshot** — export a preview image
3. **Component map** — which Figma components were used where (for the react-implementer)

```json
{
  "figmaUrl": "https://www.figma.com/design/...",
  "componentMap": {
    "toolbar.createButton": "Button/Primary/Green",
    "dataTable": "Table/Default",
    "modals.addAdvertiser": "Modal/Small"
  }
}
```

## Important Rules

- **Never recreate what exists in the design system** — always `search_design_system` first
- **Use auto-layout everywhere** — no absolute positioning
- **Name every frame meaningfully** — "Toolbar", "DataTable", "AddAdvertiserModal"
- **Match the wireframe fidelity to the request** — lo-fi = gray rectangles with labels, hi-fi = full brand tokens
- **Create modals as separate frames** — not inside the main frame
- **Always read the osmos-brand skill** for token values before applying colors
