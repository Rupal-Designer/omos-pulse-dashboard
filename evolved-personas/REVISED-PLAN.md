# Revised Persona Evolution Plan — Grounded in Real Osmos Data

> The original plan fabricated plausible backstories. This revision grounds every persona memory and opinion in **actual Osmos product decisions, PRDs, metrics, and technical architecture** from Notion.

---

## What Changed

The Notion workspace contains:
- **26+ PRDs** covering campaigns, budgeting, Sofie AI, BYOT, audience targeting, offsite ads, debugging, onboarding
- **Real metrics**: 143 debug tickets/60 days (65 "not spending", 53 "keyword", 25 "not responding"), Sofie 343 feedback responses with critically low adoption, <5% suggestion acceptance rate
- **Real architecture**: Agentic debugger with 6 sub-agents (Campaign → Hygiene → Performance → Audit → Optimization → Debugger), campaign status 7 states 12 transitions, Budgeting pacing engine (4 modes, curve-based allocation)
- **Real design decisions**: Budget type irreversible mid-flight, Sofie 47 suggestions shown with equal weight, side-panel debugger not modal, drawer vs page patterns throughout
- **Real customers**: Wakefern/Shoprite, GPA, PicknPay, FirstCry, Takealot, Mr. D, DFI/Yuu
- **Real technical context**: REST not GraphQL, React Query, offset-based pagination, Highcharts, no WebSocket infra, design system migration in progress

## Memory Source Map

Each persona's "Background as Memory" section should cite real Osmos events. Here's what maps to whom:

### Noor (IA Architect) — Real Osmos IA Decisions
| Memory | Source in Notion | Why it matters for Noor |
|---|---|---|
| Sofie 47 suggestions with equal weight | Sofie Suggestions v2 PRD | Classic IA failure — no hierarchy, no prioritization, everything at equal visual weight |
| Campaign Debugger: side panel vs page | Campaign Debugging PRD | Noor's "debugging is triggered FROM a campaign" argument — maps to her drawer-over-page principle |
| Budget type as one-time irreversible choice | Budgeting PRD: "Only one budget type active. Not editable." | Her failure mode #4 (mistaking infrequency for unimportance) — this is the canonical example |
| Audience targeting progressive disclosure | Audience Targeting PLA PRD | Real progressive disclosure: basic targeting → advanced (existing customer suppression) |
| Feed Standardization renaming (OS Client ID → Advertiser ID) | Feed Standardization PRD | Nav/labeling IA decision — naming affects findability |
| Offsite DV360 Information Architecture | Offsite DV360 IA page | Real IA work: Line Item Edit View, read/write permissions-based components |

### Dev (Power User Advocate) — Real Ad Ops Workflows
| Memory | Source | Why it matters for Dev |
|---|---|---|
| 143 tickets/60 days broken down | Campaign Debugging PRD | Proves ad ops managers are drowning — "65 for not spending, 53 for keyword, 25 for not responding" |
| Bulk actions spec in Budgeting PRD | Budgeting PRD: Pause, Activate, Update ADB, Update Total Budget, Update Multiplier, Update Dates, Archive | Dev's non-negotiable: bulk actions on every list — and here's the real spec |
| Campaign Performance Report filters | CPR Filter PRD | "Filter by Advertiser Name/ID" — date range, status, advertiser as workflow infrastructure |
| SOP: Campaign Not Spending | Campaign Not Spending SOP | The actual debug workflow ad ops follows today — manual, slow, multi-step |
| Pacing controls: Standard/Accelerated/Even | Budgeting PRD intraday pacing | Power user needs: "when does my budget spend?" is daily-use data, not hide-behind-advanced |
| Bulk upload CSV format for PLA campaigns | Budgeting PRD bulk actions | Real column spec Dev would reference for "what an ad ops manager's day looks like" |

### Raj (Arbitrator) — Real Platform Principle Decisions
| Memory | Source | Why it matters for Raj |
|---|---|---|
| Budget type irreversible mid-flight | Budgeting PRD | His canonical Rank 3 (Intentionality) override of Noor hiding it behind "Advanced" |
| Sofie suggestion tiering: critical/urgent/growth | Sofie Suggestions v2 PRD funnel data | Real evidence for alert prioritization — not aesthetic, data-driven |
| Persona configuration controls per retailer | Campaign Debugging PRD + Budgeting PRD | Rank 1 (Retailer governs): retailer controls which advertisers get which features |
| M%G = Unique GMV calculation complexity | Unique GMV Tech Spec + GMV mismatch | Attribution honesty (Rank 2): GMV counted multiple times in joins, requires deduplication |
| Sofie <5% acceptance, 64% immediate dismissal | Sofie Suggestions v2 PRD | Business baselines Raj cites when arbitrating Sofie-related design debates |
| DFI HK audience reach discrepancy | Campaign not spending due to audience reach | Real case where design decision had operational consequences across retailer |

### Priya (Feasibility) — Real Technical Complexity
| Memory | Source | Why it matters for Priya |
|---|---|---|
| Agentic debugger: 6 sub-agents, tool orchestration | Campaign Debugging PRD architecture | Her "this is XL not M" canonical example — Orchestrator → Campaign → Hygiene → Performance → Audit → Optimization → Debugger → Insight → Comms |
| Campaign status 7 states 12 transitions | Campaign Debugging PRD | Her "state machine nobody drew" — real Osmos example |
| Pacing engine: 4 types, curve-based, replanning | Budgeting PRD pacing spec | Complex math: exponential decay/growth curves, remaining budget recalculation, calendar multipliers |
| Design system migration across seller + pulse | Design System Implementation task | Real effort: "standardise the UI with reusable components, removing unnecessary colours, backgrounds, borders" |
| Sofie orchestration service API contract | Sofie Orchestration UI API Contract | Frontend tool execution, toolResults, WebSocket-like async patterns |
| Audit Service 504s blocking ad creation | Audit Service 504 page | Real prod incident: gateway timeouts impacting core workflow |
| Campaign cloning bug: cloned campaign not spending | RCA: Campaign Cloning Not Spending | Real state machine failure: cloning didn't replicate all required state |

### Arjun (UX) — Real User Pain Points
| Memory | Source | Why it matters for Arjun |
|---|---|---|
| Sofie: 343 feedback responses, most dismissed | Sofie v2 PRD | Real user research data: "advertisers are dismissing, ignoring, or canceling at nearly every stage" |
| Campaign Not Spending SOP: multi-step manual debug | Campaign Not Spending SOP | Actual friction: navigate to hygiene page, check buybox, check wallet, check bids — one by one |
| "0 products available — all 12 out of stock" | Sofie v2 suggestion example | Real empty state / error state that users encounter |
| Campaign creation timestamp feature request | Timestamp Feature PRD | User-requested: "requirement to have timestamp at time of creation for both Product Ads and Display Ads" |
| Advertiser filter in Campaign Performance Report | CPR Filter PRD | "searchable advertiser filter" — findability problem in real reporting |
| 48-hour response lag for routine advertiser issues | Content page (support data) | Real credibility/trust failure: advertisers spending while waiting for support |

### Meera (Business) — Real Business Metrics
| Memory | Source | Why it matters for Meera |
|---|---|---|
| M%G on Pulse: Unique GMV calculation | Unique GMV Tech Spec | The north-star metric she thinks in — and it's technically fragile (double-counting in joins) |
| Sofie pricing & rollout: Sofie Wallet concept | Sofie Pricing and Rollout page | Real monetization decision: protect continuity during launch, instrument advanced suggestions |
| Real customers by type | Campaign Debugging PRD | Enterprise: Wakefern, GPA, PicknPay. Marketplaces: FirstCry, Takealot, Mr. D |
| Campaign debugger as competitive differentiator | Campaign Debugging GTM | "World's first Agentic AI Campaign debugger" positioning |
| BYOT revenue model | BYOT PRD | New revenue stream: bridge external marketing to commerce attribution |
| Ad Packages: omni-channel flexible packages | Flexible Omni-channel Ad Packages PRD | Multi-channel selling: cumulative metrics, Sofie suggestions to Ad Ops |

### Zara (Delight) — Real Delight Opportunities
| Memory | Source | Why it matters for Zara |
|---|---|---|
| Agentic debugger thinking animation | Campaign Debugging PRD Phase 0 | "Always show what the agent is doing / reasoning, thinking" — the wow moment |
| Sofie suggested prompts: dynamic + static | Campaign Debugging PRD | 2 dynamic + 2 static prompt chips — personalization hook |
| "Hi! I can help you understand and fix issues" | Campaign Debugging PRD welcome message | Emotional tone: helpful, not clinical |
| Campaign duplication one-click | Existing feature | Structural delight: "Copy" action saves hours of repetitive campaign creation |
| Calendar multiplier visualization | Budgeting PRD | Opportunity: visualizing how spend shifts across sale days — data made tangible |
| Multi-modal debugger responses: tables, charts, CTAs | Campaign Debugging Phase 3-4 | Progressive delight: text → tables → charts → one-click actions |

---

## Revised Build Order

### Phase 1: Rewrite Noor and Priya (already done — need Notion-grounding pass)
- Replace fabricated memories with real Osmos events from the map above
- Keep voice samples, vocabulary, failure modes, relationships intact
- Add Notion source citations as comments (not visible in output, but traceable)

### Phase 2: Build Dev, Raj (have existing knowledge libraries — add voice model + real memories)
- Dev: ground in 143 tickets, bulk action specs, CPR filters, pacing controls
- Raj: ground in budget type irreversibility, Sofie metrics, persona configuration, M%G

### Phase 3: Build Arjun, Meera, Zara (no existing reference files — build from scratch)
- Arjun: ground in Sofie 343 feedback, campaign not spending SOP, real user requests
- Meera: ground in M%G, Sofie pricing, customer list, BYOT revenue, competitive positioning
- Zara: ground in debugger thinking animation, Sofie prompts, calendar multiplier viz, multi-modal responses

### Phase 4: Notion-grounding pass on Noor + Priya
- Update existing evolved files to replace fabricated fintech memories with real Osmos events
- Keep the fintech backstory as "pre-Osmos" context but add 3-4 more Osmos-specific memories

### Phase 5: Integration + Verification
- Update SKILL.md loading references
- Run verification agent comparing voice quality with vs without Notion-grounded memories
