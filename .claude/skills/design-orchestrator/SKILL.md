---
name: design-orchestrator
description: "Run the full design-to-code pipeline: interpret a screen → wireframe in Figma → implement in React → audit UX. Use this skill whenever someone says 'build this screen end to end', 'full pipeline', 'create this from scratch', 'design and implement this', or provides an image/sketch/PRD and expects both a Figma file and working React code. Also trigger when someone says 'run the chain', 'agent chain', or 'orchestrate'. This skill chains together screen-interpreter → figma-wireframer → react-implementer → ux-auditor in sequence, re-running steps if the audit returns scores below B."
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

# Design Orchestrator

Chains the 4 agent skills in sequence to go from any input to a fully implemented, audited screen.

## The Chain

```
Input (image/Figma/PRD)
  │
  ▼
┌─────────────────────┐
│  1. SCREEN INTERPRETER  │  → Screen Spec JSON
│  skill: screen-interpreter │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. FIGMA WIREFRAMER    │  → Figma URL + component map
│  skill: figma-wireframer │
│  (skip if no Figma PAT)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. REACT IMPLEMENTER   │  → .jsx files in src/components/
│  skill: react-implementer│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  4. UX AUDITOR          │  → Scored audit report
│  skill: ux-auditor       │
└──────────┬──────────┘
           │
           ▼
     Score check
     ┌──────────┐
     │ All ≥ B? │──Yes──→ Package deliverables ✓
     └────┬─────┘
          │ No
          ▼
     Route fixes to
     relevant agent
     and re-audit
```

## How to Run

### Full Pipeline
When the user provides an input and wants everything:

1. **Invoke screen-interpreter** — analyze the input, produce Screen Spec JSON
2. **Check: Figma MCP available?**
   - Yes → Invoke figma-wireframer with the Screen Spec
   - No → Skip to step 3, note that Figma wireframe was skipped
3. **Invoke react-implementer** — generate React code from Screen Spec + component map
4. **Invoke ux-auditor** — audit the generated code and/or screenshot
5. **Check audit scores:**
   - All dimensions ≥ B → Package and deliver
   - Any dimension < B → Route the fix:
     - Accessibility/Usability fix → re-invoke react-implementer with specific patches
     - Visual/Desirable fix → re-invoke figma-wireframer + react-implementer
     - Findable fix → update navigation/routing in App.jsx
   - Re-audit after fixes (max 2 fix loops)

### Partial Pipeline
If the user only wants specific steps:
- "Just interpret" → Only screen-interpreter
- "Just implement" → Only react-implementer
- "Just audit" → Only ux-auditor
- "Interpret and implement" → screen-interpreter → react-implementer
- "Figma only" → screen-interpreter → figma-wireframer

### Fix Mode
If the user has an existing screen and audit report:
- Read the audit report
- Identify which dimensions scored < B
- Apply fixes to the relevant files
- Re-run ux-auditor to verify

## Deliverables Package

At the end of a full pipeline run, present:

1. **Figma file URL** (if created)
2. **React component file(s)** — linked with `computer://` paths
3. **UX Audit report** — inline in the chat or as an HTML file
4. **Screen Spec JSON** — for reference/future modifications

## Important Rules

- **Always run the auditor** — even if the user doesn't ask for it. Quality control is automatic.
- **Max 2 fix loops** — don't get stuck in an infinite fix cycle. After 2 loops, present the best result with remaining issues noted.
- **Skip Figma gracefully** — if no Figma MCP is connected, skip step 2 and proceed. The pipeline works without Figma.
- **Announce each step** — tell the user what's happening: "Step 1: Interpreting your wireframe..." "Step 3: Generating React code..."
- **Chain via Agent tool** — use sub-agents for each step so they run with their own context and skill loaded.
- **Present files at the end** — use `present_files` to give the user access to all generated files.

## Example Invocation

```
User: "Build the Campaign Dashboard screen. Here's a sketch." [image]

Orchestrator:
  → "Step 1: Interpreting your sketch..."
    [spawns screen-interpreter agent]
    → Screen Spec: { screenType: "dashboard", zones: {...} }

  → "Step 2: Skipping Figma wireframe (no PAT configured)"

  → "Step 3: Generating React code..."
    [spawns react-implementer agent with Screen Spec]
    → CampaignDashboard.jsx created

  → "Step 4: Running UX audit..."
    [spawns ux-auditor agent]
    → Audit: Useful=A, Usable=B, Desirable=B, Findable=A, Accessible=C, Credible=B, Valuable=A
    → Fix needed: Accessibility (C)

  → "Fixing accessibility issues..."
    [re-invokes react-implementer with specific patches]
    → Added aria-labels, keyboard nav, contrast fixes

  → "Re-auditing..."
    [re-invokes ux-auditor]
    → All dimensions ≥ B ✓

  → "Done! Here are your deliverables:"
    [presents files]
```
