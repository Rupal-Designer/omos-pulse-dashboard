# PRD: Sofie AI — Consolidated Product Specification

**Status:** In Development  
**Sources:** Sofie UI Base Framework · Sofie Suggestions v2 · Suggestions Adoption Drivers · Sofie AI Pricing & Rollout · Sofie Pricing (PRD) · Sofie Wallet Tech Spec  
**Last synthesised:** 2026-05-05

---

## Table of Contents
1. [Overview & Vision](#1-overview--vision)
2. [Problem Statement](#2-problem-statement)
3. [Business Objectives](#3-business-objectives)
4. [Scope](#4-scope)
5. [Three Pillars of Sofie](#5-three-pillars-of-sofie)
6. [Pillar 1 — Agentic Chat Interface (UX)](#6-pillar-1--agentic-chat-interface-ux)
7. [Pillar 2 — Intelligent Suggestions v2](#7-pillar-2--intelligent-suggestions-v2)
8. [Pillar 3 — Commercial Layer (Wallet + Pricing)](#8-pillar-3--commercial-layer-wallet--pricing)
9. [Touchpoints across the Advertiser Portal](#9-touchpoints-across-the-advertiser-portal)
10. [Agent Permissions, Data Access & Guardrails](#10-agent-permissions-data-access--guardrails)
11. [Retailer (Pulse Portal) — Sofie App](#11-retailer-pulse-portal--sofie-app)
12. [Rollout Plan](#12-rollout-plan)
13. [Success Metrics](#13-success-metrics)
14. [Open Questions & Risks](#14-open-questions--risks)

---

## 1. Overview & Vision

Sofie is Osmos' AI copilot for advertisers. Today it surfaces static, proactive recommendations (budget tweaks, bid suggestions, product additions) as a bundled free feature. Adoption is critically low — recommendations are ignored, misunderstood, or dismissed because advertisers don't understand *why* a suggestion is made or *what to do next*.

**The transformation:** Sofie moves from a passive recommendation engine to an **interactive, agent-driven assistant** embedded into the daily advertiser workflow. This means:

- A persistent **Ask Sofie** chat surface omnipresent across the advertiser portal
- A set of **specialised agents** (Debugger, Insights, Keyword Analyzer) that reason over campaign data
- A redesigned **Suggestions v2** UX — fewer, higher-quality, task-framed suggestions
- A **prepaid Sofie Wallet** that prices advanced capabilities without gating the free baseline

> **Key framing:** Sofie is for Advertisers. Retailers are resellers and distribution channels. Every design decision should centre on advertiser value.

---

## 2. Problem Statement

### 2.1 Suggestions are broken
Across 343 NPS feedback responses, the data is clear:

- **Overwhelming volume, no prioritisation.** The sandbox shows 47 suggestions for a single advertiser — all at equal visual weight, no ranking.
- **No impact quantification.** Advertisers don't know what accepting a suggestion is worth in revenue/impressions terms.
- **Passive, push-style UX.** Suggestions appear and disappear. There's no acknowledgement, no history, no way to snooze or dismiss.
- **No follow-up path.** After a suggestion is accepted, there's no confirmation of what changed or whether it worked.
- **Not conversational.** Advertisers can't ask "why" or request clarification.

### 2.2 The assistant is absent
- Sofie has no chat interface. Advertisers cannot ask freeform questions.
- There's no way to investigate underperformance without calling the Ad Ops team.
- AI is positioned as a feature button, not as an intelligent partner in the workflow.

### 2.3 Monetisation gap
- Sofie is entirely bundled and free. No pricing infrastructure exists for new agents (Media Planner, Creative Generation).
- Every Sofie prompt has real CoGS (LLM + BigQuery + Redis ~$0.15/query). There's no mechanism to recover costs or build a sustainable model.

---

## 3. Business Objectives

1. **Differentiated AI offering for retailers** — Position Sofie as premium AI capability retailers use to attract, retain, and upsell advertisers. Strengthen Osmos' AI-first positioning.

2. **Increase advertiser satisfaction** — Help advertisers understand *why* campaigns underperform and *what to do next* in a contextual, conversational manner. Reduce reliance on Ad Ops support.

3. **Drive Sofie adoption** — Shift from ignored static suggestions to interactive, on-demand assistance. Target: ≥10% of DAU engaging with Sofie daily.

4. **Scalable agent framework** — Build a foundation on which new agents (Media Planner, Creative Generation, etc.) can be added without rethinking UX primitives.

5. **Sustainable monetisation** — Free daily floor for all users drives adoption; metered wallet beyond that covers CoGS + margin.

---

## 4. Scope

This PRD covers:

| In Scope | Out of Scope |
|---|---|
| Agentic chat interface UX | Subscription / tier-based pricing |
| Suggestions v2 redesign | Per-advertiser invoice detail (available on request) |
| Entry points (touchpoints) across the portal | Capability toggle per advertiser |
| Agent guardrails and data access rules | Bulk promo balance granting via custom button |
| Sofie Wallet (prepaid model) | Payment gateway integration specifics |
| Retailer Pulse portal — Manage, Usage Analytics, Finance | Creative Generation Agent (coming soon) |
| Advertiser portal — Sofie Credits section | Media Planner Agent (coming soon) |
| Free daily usage floor mechanics | MCP cost tracking (P1 followup) |
| Rollout & onboarding plan | |

---

## 5. Three Pillars of Sofie

```
┌─────────────────────────────────────────────────────────┐
│                     SOFIE AI                            │
├──────────────────┬──────────────────┬───────────────────┤
│ PILLAR 1         │ PILLAR 2         │ PILLAR 3          │
│ Agentic Chat     │ Intelligent      │ Commercial Layer  │
│ Interface        │ Suggestions v2   │ (Wallet + Pricing)│
│                  │                  │                   │
│ Ask Sofie        │ Prioritised      │ Sofie Wallet      │
│ overlay panel    │ suggestions with │ Free daily floor  │
│ + 3 core agents  │ impact + actions │ Metered beyond    │
└──────────────────┴──────────────────┴───────────────────┘
```

---

## 6. Pillar 1 — Agentic Chat Interface (UX)

### 6.1 Entry Point — Ask Sofie CTA

A persistent **Ask Sofie** button is omnipresent in the advertiser portal — pinned in the global header or as a floating action. Clicking it opens a **chat overlay panel sliding in from the right**.

### 6.2 On-open State

When opened directly from the global CTA (no prior context):
- Sofie identifies the most recent campaign activity and surfaces a **contextual summary** in inline/push-notification format — effectively the top suggestion that would otherwise appear in the Suggestions panel.
- Below that, **dynamically generated suggested prompts** based on current screen and account activity:

| Trigger condition | Suggested prompt shown |
|---|---|
| On Product Ads screen | "Summarise performance of my Product Ads in the last week" / "Show me top 5 products by CTR" / "Which products should I promote more?" |
| On Display Ads screen | "Summarise performance of my Display Ads last week" / "Which inventory placements are performing best?" / "Show me my top 5 performing Ads" |
| Spend in last 48h < x% of expected pacing | "Why is my campaign not spending?" |
| Impressions dropped >30% WoW | "Why did my impressions drop suddenly?" |
| CTR < historical avg by 25% | "What's affecting my CTR?" |
| No dynamic triggers available | *"Ask Sofie about a specific campaign or reporting insights"* (no prompts shown) |

### 6.3 Chat Interface Capabilities

**Conversation management**
- Start a new conversation thread (default name "New conversation with Sofie"; auto-renamed after first few messages, like ChatGPT)
- View past conversation history / switch between threads
- Minimize / maximize and undock / redock the panel (min width + height enforced)

**Context system**
- `+` icon opens a popover with entitylists: Sponsored Product Ads (→ campaigns), Sponsored Display Ads (→ campaigns), Reports
- Search within the popover to find a specific entity
- `@mention` syntax to reference a **campaign, report, ad, product, or category** inline in a prompt

| Method | Behaviour |
|---|---|
| Adding via `+` (context) | Persistent context for the whole thread — all prompts reference it |
| `@mention` in prompt | One-shot reference for that specific message only |

> Refer to Gemini's UX for this interaction pattern.

- Changing or clearing context starts a new thread.

**Agent reasoning (Goal Decomposition)**
- Agent breaks user goals into sub-tasks ("Why is this campaign not spending?" → Task 1 … Task 4)
- Shows the abstracted plan while formulating the response (nice-to-have, may expose internals — evaluate carefully)

**Multi-turn & transparency**
- Plans, executes, and adjusts steps dynamically as new information emerges
- Always shows what the agent is doing / reasoning / thinking
- Explains *why* it did something — data sources, steps, logic (builds trust)
- Must call out limitations when it has no context for a question

### 6.4 Response Actions

| Element | Behaviour |
|---|---|
| Copy button | On every prompt and every response |
| Upvote | Records positive signal |
| Downvote | Requests more feedback; records context + prompt + response + user-provided info. Used to cluster problem areas: wrong agent invoked, hallucination, response too long, wrong recommendations |

### 6.5 Output Modality

| Format | Used for |
|---|---|
| Tables | Keyword/category/inventory metrics |
| Buttons / Links | CTAs when Sofie wants the user to act on a recommendation |
| Paragraphs + bullets | Explanations, narrative responses |
| Line charts / bar graphs | Trends and comparisons |

### 6.6 Citations

- If a response uses campaign settings, cite the campaigns with direct links
- If multiple reports were used, cite each report with a direct link

### 6.7 Core Agents (Phase 1)

| Agent | Purpose |
|---|---|
| **Campaign Debugger Agent** | Diagnoses why a campaign is underperforming — spend issues, bid floors, product availability, budget exhaustion |
| **Campaign & Reporting Insights Agent** | Surfaces performance summaries, trends, and anomalies across campaigns and reports |
| **Keyword Analyzer Agent** | Analyses keyword performance, SOV gaps, underbidding, and suggests additions |

*Creative Generation Agent and Media Planner Agent are roadmap items.*

---

## 7. Pillar 2 — Intelligent Suggestions v2

### 7.1 Problem (from NPS data)

- 47 suggestions shown simultaneously with no rank → decision paralysis
- Impact of accepting a suggestion is never quantified
- No feedback loop after accepting (did it work?)
- Suggestions are not task-framed — advertiser doesn't know what action to take
- Can't dismiss, snooze, or mark done

### 7.2 Proposed Solution

Redesign suggestions as a **Task-List model** — not a feed of recommendations, but a prioritised, actionable to-do list. Max 5–7 visible at a time. Each suggestion shows: what to do, why, and what the projected impact ($, impressions, CTR) is.

### 7.3 Suggestion Actions per Card

Each suggestion card supports:
- ✅ **Approve / Accept** — one-click to apply the recommendation
- ❌ **Reject** — removes permanently, records signal
- 💤 **Snooze** — hides for N days; can configure "don't show this type again"
- ⚡ **Auto-action** — opt into automation (Sofie applies this class of suggestion automatically in future)
- **Ask Sofie** — opens chat with this suggestion as context (bridges Pillar 1 and Pillar 2)

### 7.4 High-Impact Suggestions Catalogue

All suggestions below include an **impact estimate** shown on the card.

#### Product Ads — Spend & Budget

| # | Suggestion | Example | Impact Shown | Applicable to |
|---|---|---|---|---|
| 1 | **Increase campaign budget** | "Your 'Summer Sale' campaign is pacing 40% below target" | Possible weekly spend increment: (Suggested daily budget − current daily budget) × 7 | Product Ads |
| 2 | **Low wallet balance** | "At current spend rate, your wallet runs out in 2 days" | Weekly potential spend loss: (7 − wallet remaining days) × daily budget | Product Ads, Display Ads |
| 3 | **Max-cap approaching** | "Campaign will hit monthly cap by Day 20" | Potential weekly spend loss after cap: max spend last 7 days × 7 | Product Ads |
| 4 | **Budget lower than marketplace CPC** | "Your daily budget of $5 is below the average CPC of $6.20 — campaign will rarely serve" | Estimated zero impressions until resolved | Product Ads |

#### Product Ads — Keyword & Bid

| # | Suggestion | Example | Impact Shown | Applicable to |
|---|---|---|---|---|
| 5 | **Keyword underbidding / Low SOV** | "3 high-volume keywords have <30% SOV" | Impressions lost: SOV gap × request volume for those keywords | Product Ads |
| 6 | **Suggest new keywords to target** | "Products in 'Skincare' category have 12 unaddressed high-volume keywords" | Potential reach based on request volume of suggested keywords | Product Ads |
| 7 | **Underbidding category-level bids** | "Category 'Face Wash' has 60% of spend going to competitors due to bid gap" | Estimated impressions uplift at recommended bid | Product Ads |
| 8 | **Missing category-level bids** | "You have no category bid for 'Hair Oil' — you're missing 4,200 daily requests" | Request volume for uncovered category | Product Ads |
| 9 | **Low campaign ROI target** | "ROI target of 200% is blocking 40% of eligible ad slots" | Estimated impression uplift if ROI target is relaxed to 150% | Product Ads |

#### Product Ads — Inventory & Creative

| # | Suggestion | Example | Impact Shown | Applicable to |
|---|---|---|---|---|
| 10 | **No available products in campaign** | "Campaign 'Q4 Push' has 0 eligible products — it's not serving" | Weekly spend loss: max spend last 7 days × 7 (or weekly budget) | Product Ads |
| 11 | **Product expansion** | "8 top-performing SKUs from your catalogue are not in this campaign" | Estimated reach based on historical impressions for those products | Product Ads |

#### Display Ads

| # | Suggestion | Example | Impact Shown | Applicable to |
|---|---|---|---|---|
| 12 | **Underperforming creatives** | "Banner 'Summer Banner v1' has CTR 0.3% vs. account avg 1.2%" | Estimated CTR uplift by pausing and reallocating budget | Display Ads |
| 13 | **Audience segment gap** | "Segment 'Loyal shoppers' drives 3× ROAS but has low budget allocation" | Potential ROAS-weighted impressions uplift | Display Ads |
| 14 | **Low wallet balance** | (same as #2 above) | — | Display Ads |

### 7.5 Suggestions UX Design Principles

- **Max 5–7 suggestions** shown at once, ranked by projected impact descending
- Each card shows: title, one-line rationale, projected impact ($, impressions, or CTR), primary action CTA
- Suggestions panel accessible from the main nav (not buried in a submenu)
- Accepted suggestions show a brief "✓ Applied — we'll track if this improves performance over 7 days" message
- Rejected / snoozed suggestions move to a history view accessible from the panel header
- Inside Product Ads screens, high-value suggestions surface as **"Sofie Recommends"** inline within Product Selection tab

---

## 8. Pillar 3 — Commercial Layer (Wallet + Pricing)

### 8.1 Core Pricing Philosophy

| Principle | Detail |
|---|---|
| **Embedded, not opt-in** | Sofie is part of Osmos.ai. No separate SKU, no procurement exercise. CS-led switch to enable. |
| **Free daily floor** | Every user (advertiser or Ad Ops) gets **$3/day** of free Sofie usage (~5–8 prompts). Resets every 24h. |
| **Wallet beyond the floor** | Once daily floor is exhausted, advertiser usage draws from their Sofie Wallet. Ad Ops usage counts against the retailer's monthly bill. |
| **CoGS + 100% markup** | Billed at 2× our actual cost. Provides negotiation headroom; CS can discount up to 50% for strategic retailers. |
| **Continuity protected** | Basic/hygiene suggestions are free forever. All suggestions are free through June 2026. |

### 8.2 What Counts as Sofie Usage

| Type | Examples | Billed? |
|---|---|---|
| **Basic suggestions** | Low wallet balance alert, campaign inactive alert | Free forever |
| **Advanced suggestions** | Bid strategy shifts, cross-campaign optimisation, keyword recommendations using ML | Free through Jun 2026; metered from Jul 2026 |
| **Chat / Agentic** | Any user-initiated chat prompt, agentic bulk action | Metered (free within daily floor, wallet beyond) |

### 8.3 Indicative CoGS & Pricing

| Query type | Est. tokens | CoGS | Billed (2×) |
|---|---|---|---|
| "What are my top performing campaigns?" | ~300K | ~$0.20 | ~$0.40 |
| "Identify low performing keywords" | ~200K | ~$0.16 | ~$0.32 |
| "Summarise last week's Product Ads performance" | ~100K | ~$0.14 | ~$0.28 |

Planning assumption: **~$0.15 average CoGS per prompt** with ~$0.30 billed rate.

### 8.4 Sofie Wallet Model

**Two balance buckets per advertiser:**

| Balance Type | Source | Redeemable? | Notes |
|---|---|---|---|
| **Paid Balance** | Advertiser recharges from Media Wallet or payment gateway | Yes — transfers back 1:1 to Media Wallet | |
| **Promotional Balance** | Granted by Osmos (GTM) or by the retailer (incentives) | No | Promotional consumed before Paid |

**Wallet creation:** One SOFIE wallet per advertiser entity (not per user). Auto-created at onboarding via `defaultBillingProfiles`. Wallet ID: `{entityId}_SOFIE`.

**$10 promotional seed:** All existing advertisers receive $10 promotional balance on day-1 wallet launch (non-redeemable, not charged to retailers).

**Recharge flows:**
1. Transfer from Media Wallet (instant, atomic)
2. Direct top-up via payment gateway
3. Retailer-funded (offline arrangement)

**Retailer AdOps billing:** Daily spend cap per user (configurable by retailer admin). Usage beyond daily free floor is billed to the retailer in arrears monthly. Cap = hard block when reached; no impact on advertiser wallet.

### 8.5 Billing Gating — In-Product States

Four inline banner states (shown between message thread and input bar, non-blocking):

| User | State | Trigger | Colour | Action |
|---|---|---|---|---|
| Ad Ops | **Free Limit Reached** | Daily $3 cap exhausted | Amber | "Free Usage Limit Reached · Resets in Xh · Further usage will be billable [Continue]" — shown once per 30 days; Continue unblocks input |
| Ad Ops | **Hard Limit Hit** | Admin daily cap reached | Red | "Usage limit reached · Resets in Xh · Contact your administrator" — input blocked |
| Advertiser (self-serve enabled) | **Wallet Empty** | Wallet $0 + daily floor exhausted | Red | "Your Sofie wallet and daily free limit is exhausted · [Recharge]" |
| Advertiser (managed) | **Wallet Empty** | Same, but self-serve disabled | Red | "Contact your administrator to add money to your Sofie Wallet" — no CTA |

**Basic/hygiene suggestions always continue regardless of gate state.**

---

## 9. Touchpoints across the Advertiser Portal

When Sofie is invoked from a specific screen, the context is pre-set in the chat thread.

| Screen | Touchpoint |
|---|---|
| Product Ads → Individual Campaign | Ask Sofie (sets campaign as context) |
| Product Ads → Product Performance Report | Ask Sofie |
| Product Ads → Categories Performance Report | Ask Sofie |
| Product Ads → Keyword Performance Report | Ask Sofie |
| Display Ads → Individual Campaign | Ask Sofie |
| Display Ads → Ads Performance Report | Ask Sofie |
| Display Ads → Inventory Performance Report | Ask Sofie |
| Display Ads → Audience Performance Report | Ask Sofie |
| Instore Digital Ads → Individual Campaign | Ask Sofie |
| Instore Digital Ads → Screen Performance Report | Ask Sofie |
| Instore Digital Ads → Store Performance Report | Ask Sofie |
| Instore Digital Ads → Placement Performance Report | Ask Sofie |

---

## 10. Agent Permissions, Data Access & Guardrails

**Data the AI engine must have access to:**
- Campaign configuration data (individual campaign context)
- Real-time performance data (impressions, clicks, CTR, conversions)
- Competitive context data (for benchmarking — **anonymised**)
- Historical baselines
- Event tracking logs (clicks vs. purchases)
- Feed and creative metadata

> **Privacy rule:** Competitor names must never be revealed. If AI uses competitive bid data to explain performance, the competitor must be anonymised. (e.g., "a competing brand" — not "Mamaearth".)

**Action guardrails:**
- Any action suggested by the AI must require **explicit user opt-in** — Sofie never autonomously applies changes
- All user-initiated actions through the AI agent must be logged in audit history
- Such actions must be **reversible** with a single click

---

## 11. Retailer (Pulse Portal) — Sofie App

Sofie appears as an installed app in the Pulse portal's **Installed Apps** section with two sub-pages:

### 11.1 Manage

**Free Usage Offer Banner** (dismissable)
- Title: "Free Usage Offer"
- Body: "Each team and advertiser user receives $3 of free Sofie usage daily, allowing them to try approximately 5–8 prompts."
- Expandable: bullets on reset policy, billing post-limit, and wallet deduction

**Enable Sofie for All Advertisers (toggle)**
- Controls whether advertisers see the Sofie chat surface in the Advertiser Portal
- When enabled, Advanced Sofie suggestions are also generated daily for advertisers

**Your Team Snapshot (table)**

| Column | Description |
|---|---|
| User Name | — |
| User Email | — |
| Enable Sofie | Toggle — disabling blocks all paid Sofie capabilities for this user |
| Daily Spend Cap ($) | Editable inline; blank = no cap |
| Last 30 Days Spend | Total $ spent in last 30 days |

Changes take effect immediately.

### 11.2 Usage Analytics

**Summary Ribbon (4 metrics)**
1. Total Amount Spent (all Sofie spend)
2. Spent by Advertisers
3. Spent by Your Team (Ad Ops)
4. Osmos Promotional Balance Used (not billed)

**Trend Graphs** — 2×2 grid of daily line charts, one per ribbon metric

**Usage Detail Table**

| Column | Description |
|---|---|
| Date | Timestamp |
| Category | Advanced Suggestions / Keyword Analysis / Performance Analysis / Campaign Debugging / Campaign Optimisation |
| Event | "X suggestions generated" or "Chat Message" |
| Initiated By | "System" or user name |
| Amount ($) | Spend for this event |
| FREE badge | Strikethrough amount + green FREE pill if within daily free allowance |
| Advertiser Name | Account context |
| Advertiser ID | — |

Filterable by date range, category, initiated by, advertiser. Exportable as CSV.

### 11.3 Finance Dashboard — Sofie Tab

Under **Finance → Dashboard → Payment Summary**, add a **Sofie** tab alongside Media:

**Summary Ribbon**

| Metric | Definition |
|---|---|
| Credits Used by Advertisers | Total $ by advertiser users in the period |
| Credits Used by Your Team | Total $ by Ad Ops users in the period |
| Osmos Promotional Credits Used | Not billed |
| Billable to Advertisers | Credits Used by Advertisers − Osmos Promo Used |
| Amount Payable to Osmos | Billable to Advertisers + Credits Used by Team |
| Total Sofie Credits Balance | Sum of all advertiser Sofie Wallet balances |

Under **Finance → Dashboard → Advertiser Wallet Snapshot**, add **Sofie tab**:

| Column |
|---|
| Advertiser Name |
| Advertiser ID |
| Osmos Promo Amount |
| Retailer Promo Amount |
| Balance |
| Last 30 Days Usage |

---

## 12. Advertiser Portal — Sofie Credits Section

A dedicated **Sofie** entry in the left nav with three stacked sections:

### Wallet Balance Card
- Paid Balance + Promotional Balance shown as distinct line items
- Total available balance prominently displayed
- "Spent in last 7 days" quick stat
- Low-balance warning banner (threshold: $5.00)
- **Add Money** CTA → modal with $10/$25/$50/$100/custom; debits Media Wallet, credits Sofie Paid Balance; shows resulting balance
- **Transfer to Media Wallet** CTA → partial or full transfer of Paid Balance only; Promotional excluded (tooltip explains why)

### Recharge History Table

| Column |
|---|
| Date |
| Type ("Money Added" / "Transfer to Media Wallet") |
| Amount (+$25.00 / −$10.00) |
| Media Wallet Impact |
| Balance After |

### Usage Table

| Column |
|---|
| Date & Time |
| Category |
| Action (e.g. "Data Insights Report — Holiday Campaign") |
| Amount Deducted ($) |
| Balance After |
| FREE badge (if within daily floor) |

Default: last 30 days. Filterable by date range + capability. Exportable as CSV.

---

## 12. Rollout Plan

| Week | Step | Who |
|---|---|---|
| 0 | CS + Product pitch Sofie to retailer. Present Launch Offer (daily free floor). Secure testimonial/feedback commitments in writing. | CS |
| 1 | Enable Sofie for retailer's own Ad Ops team only. Let them get fluent and become internal advocates. | CS |
| 2+ | Enable Sofie chat for advertiser users. Recommend initial wallet top-up levels for heavy users (starter: $10/active advertiser). Pendo tour fires on first login. | CS + Product |
| Monthly | Calculate total retailer Sofie usage beyond daily floors. Invoice as new line item on existing Osmos invoice. | Finance |

**CS last-resort lever:** For strategic accounts only, offer a retailer-level free pool (~$2,000/month for first 2 months). Must be authorised; not a standard fallback.

**Transition period:** All suggestions (basic + advanced) are free through **June 2026**. From July 2026, advanced suggestions and chat begin drawing from the wallet (basic/hygiene suggestions remain free indefinitely).

---

## 13. Success Metrics

### Adoption
- ≥ 10% of DAU engaging with Sofie on a daily basis
- Average messages per active Sofie user per week ≥ 3
- % of retailer Ad Ops users who sent ≥ 5 prompts/month

### Quality
- Significantly more upvotes than downvotes on AI responses
- Downvote cluster analysis: no single failure mode >20% of downvotes

### Suggestions
- Suggestion acceptance rate ≥ 30% (up from critically low baseline)
- % of suggestions with quantified impact shown: 100%

### Commercial (first 90 days per retailer)
- % of active advertisers with at least one Sofie interaction
- ROAS lift on campaigns touched by Sofie vs. matched control set
- % of retailers on full-rate billing without bespoke discount or last-resort lever
- At least one documented outcome/case study per retailer by end of month 2

---

## 14. Open Questions & Risks

| # | Question / Risk | Status |
|---|---|---|
| 1 | Exact reconciliation of $0.15 avg CoGS vs. $3/day floor (implies ~20 prompts free/day — higher than intended 5–8) | Open |
| 2 | Whether `billing_profile_balance_cache` is updated by `marketing_campaign_spend_data_daily` | Open (tech) |
| 3 | Changing context mid-conversation starts a new thread — UX needs clear affordance | Open |
| 4 | Goal decomposition / showing internal reasoning may expose too much — evaluate in prototype | Open |
| 5 | Promo balance ifttt service: current system only supports default wallet; SOFIE wallet needs separate hook | Open (tech) |
| 6 | Advertiser-level capability toggle is out of scope now — risk: no way to disable a capability that generates excessive spend | Accepted for now |
| 7 | Competitor anonymisation in competitive context: need a mechanism at the data layer, not just at the LLM output layer | Open |

---

*This document is synthesised from 10 Notion source documents. For implementation questions, refer to:*
- *UI/UX mocks: https://v0-advertiser-portal-prototype.vercel.app/*
- *Pulse mocks: https://v0-feed-manager-design-liart.vercel.app/*
- *Wallet tech spec: Sofie: Pricing (Notion)*
- *Suggestions data: NPS spreadsheet + suggestions catalogue (Google Sheets)*
