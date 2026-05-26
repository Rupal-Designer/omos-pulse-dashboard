import { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../../ui';

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = ({ size = 16, color = '#8b5cf6' }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const CloseIcon = ({ size = 16, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </Icon>
);

const SendIcon = ({ size = 16, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
);

const PlusIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M5 12h14" /><path d="M12 5v14" />
  </Icon>
);

const CopyIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </Icon>
);

const ThumbUpIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </Icon>
);

const ThumbDownIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </Icon>
);

const ChevDownIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

const MessageIcon = ({ size = 16, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

const ExpandIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="m15 3 6 6-6 6" /><path d="M9 21l-6-6 6-6" />
    <path d="M21 9H3" /><path d="M3 15h18" />
  </Icon>
);

const AtIcon = ({ size = 14, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </Icon>
);

// ── Suggested prompts by ad-type (capped at 3 — Arjun research flag: overwhelm risk)
// ── Dynamic detected-issue chip rendered ABOVE these when a signal is available ──
const SUGGESTED_PROMPTS = {
  'Product Ads': [
    'Summarise performance of my Product Ads in the last week',
    'Show me top 5 products by CTR',
    'Which products should I promote more?',
  ],
  'Display Ads': [
    'Summarise performance of my Display Ads last week',
    'Which inventory placements are performing best?',
    "What's affecting my CTR?",
  ],
  'Sponsorship Ads': [
    'How are my Sponsorship Ads performing this week?',
    'Which placements are driving the most impressions?',
    'Compare my sponsored vs. organic visibility',
  ],
  'Offsite Ads': [
    'Show me click-through performance for my Offsite campaigns',
    'Which external channels are converting best?',
    'Analyse my Offsite spend efficiency',
  ],
  'In-Store Digital Ads': [
    'How are my in-store screens performing today?',
    'Which store locations are driving most dwell time?',
    'Summarise footfall-to-engagement rate for my campaigns',
  ],
};

// ── Mock AI response generator ────────────────────────────────────────────────
function getMockResponse(prompt) {
  const p = prompt.toLowerCase();

  if (p.includes('not spending') || p.includes('not spend')) {
    return {
      type: 'debugger',
      agentLabel: 'Campaign Debugger Agent',
      steps: [
        'Checking campaign status and eligibility…',
        'Analysing daily budget vs. average CPC…',
        'Reviewing product availability and catalogue sync…',
        'Checking bid floors and competition…',
      ],
      content: [
        { type: 'heading', text: 'Campaign "Summer Sale" — Not Spending' },
        { type: 'paragraph', text: 'I found 3 issues preventing your campaign from spending:' },
        {
          type: 'issues',
          items: [
            { severity: 'high', title: 'Daily budget too low', detail: 'Budget of ₹120/day is below the average CPC of ₹145. The campaign cannot win a single impression. Recommended: ₹250/day minimum.' },
            { severity: 'medium', title: 'Bid floor not met', detail: 'Your keyword "moisturiser" has a max bid of ₹8.00 but the floor is ₹11.40. Increase bid or remove the keyword.' },
            { severity: 'low', title: '4 products out of stock', detail: 'SKUs P1023, P1087, P1203, P1445 are marked out of stock in the catalogue and are excluded from serving.' },
          ],
        },
        { type: 'cta', text: 'Update Budget', action: 'update-budget' },
      ],
      citations: ['Campaign: Summer Sale', 'Catalogue Sync Log: 2 hours ago'],
    };
  }

  if (p.includes('top performing') || p.includes('top 5')) {
    return {
      type: 'insights',
      agentLabel: 'Campaign & Reporting Insights Agent',
      steps: [
        'Querying campaign performance data for last 7 days…',
        'Ranking by CTR × impressions composite…',
      ],
      content: [
        { type: 'heading', text: 'Top 5 Campaigns — Last 7 Days' },
        {
          type: 'table',
          columns: ['Campaign', 'Impressions', 'CTR', 'Ad Spend', 'ROAS'],
          rows: [
            ['Summer Essentials', '1,24,500', '3.2%', '₹18,400', '4.1×'],
            ['Face Care Q4', '98,200', '2.9%', '₹14,300', '3.8×'],
            ['Hair Oil Promo', '87,100', '2.6%', '₹12,600', '3.5×'],
            ['Skincare Bundl.', '74,300', '2.4%', '₹10,800', '3.2×'],
            ['Baby Products', '61,200', '2.1%', '₹9,100', '2.9×'],
          ],
        },
        { type: 'paragraph', text: '"Summer Essentials" is your top performer. It\'s spending 18% below its daily budget ceiling — consider increasing budget to capture remaining demand.' },
      ],
      citations: ['Report: Campaign Performance Dashboard', 'Date range: Last 7 days'],
    };
  }

  if (p.includes('keyword') || p.includes('underbid') || p.includes('sov')) {
    return {
      type: 'keyword',
      agentLabel: 'Keyword Analyzer Agent',
      steps: [
        'Pulling SOV data across active keywords…',
        'Comparing your bids to auction floor prices…',
        'Identifying underbidding patterns…',
      ],
      content: [
        { type: 'heading', text: 'Keyword Analysis — Underbidding Detected' },
        { type: 'paragraph', text: '3 high-volume keywords have SOV below 30% because your bids are under the competitive floor:' },
        {
          type: 'table',
          columns: ['Keyword', 'Your Bid', 'Floor', 'SOV', 'Lost Impressions/day'],
          rows: [
            ['moisturiser', '₹8.00', '₹11.40', '22%', '~4,200'],
            ['face wash', '₹6.50', '₹9.80', '27%', '~3,100'],
            ['sunscreen spf50', '₹7.20', '₹10.60', '19%', '~2,800'],
          ],
        },
        { type: 'paragraph', text: 'Raising these 3 bids to the floor price would recover an estimated 10,100 impressions/day and ~₹1,400/day in attributed revenue.' },
        { type: 'cta', text: 'Update All 3 Bids', action: 'update-bids' },
      ],
      citations: ['Keyword Report: Product Ads', 'Auction data: last 48h'],
    };
  }

  if (p.includes('summar') || p.includes('performance')) {
    return {
      type: 'insights',
      agentLabel: 'Campaign & Reporting Insights Agent',
      steps: [
        'Loading performance summary for last 7 days…',
        'Calculating week-over-week deltas…',
      ],
      content: [
        { type: 'heading', text: 'Product Ads — Weekly Summary' },
        {
          type: 'metrics',
          items: [
            { label: 'Total Ad Spend', value: '₹1,24,300', delta: '+12%', positive: true },
            { label: 'Total Impressions', value: '8,42,100', delta: '+8%', positive: true },
            { label: 'Average CTR', value: '2.4%', delta: '-0.3pp', positive: false },
            { label: 'Attributed GMV', value: '₹4,81,200', delta: '+15%', positive: true },
            { label: 'Overall ROAS', value: '3.87×', delta: '+0.22×', positive: true },
          ],
        },
        { type: 'paragraph', text: "Spend and GMV are up strongly week-over-week. CTR dipped slightly — this is likely driven by 2 underperforming Display creatives. I'd recommend reviewing banner \"Summer Banner v1\" which is pulling your CTR average down." },
        { type: 'cta', text: 'View CTR Detail', action: 'view-ctr' },
      ],
      citations: ['Performance Report: Last 7 days vs. previous 7 days', 'Campaigns: All active (7)'],
    };
  }

  if (p.includes('impression') && (p.includes('drop') || p.includes('fell') || p.includes('low'))) {
    return {
      type: 'debugger',
      agentLabel: 'Campaign Debugger Agent',
      steps: [
        'Checking impression timeseries for anomalies…',
        'Cross-referencing with bid changes and budget…',
        'Analysing catalogue availability changes…',
      ],
      content: [
        { type: 'heading', text: 'Impression Drop — Root Cause Analysis' },
        { type: 'paragraph', text: 'Impressions dropped 34% on Dec 4. I traced it to two causes:' },
        {
          type: 'issues',
          items: [
            { severity: 'high', title: 'Platform-wide traffic dip (Dec 3–4)', detail: 'Marketplace had a 22% traffic dip on Dec 3–4 affecting all advertisers. This accounts for ~60% of your drop. Not actionable.' },
            { severity: 'medium', title: 'Budget exhaustion by 4pm', detail: 'Your campaign "Skincare Q4" hit its daily budget cap at 16:04 on Dec 4, cutting 6 hours of peak-evening traffic. Consider increasing daily budget from ₹800 to ₹1,200.' },
          ],
        },
      ],
      citations: ['Impression Report: Dec 1–8', 'Platform Ops Log: Dec 3–4 traffic event'],
    };
  }

  // Generic fallback
  return {
    type: 'insights',
    agentLabel: 'Campaign & Reporting Insights Agent',
    steps: ['Analysing your question…', 'Querying campaign data…'],
    content: [
      { type: 'paragraph', text: `I can help you with that. Here's what I found for: "${prompt}"` },
      { type: 'paragraph', text: 'To give you a more specific answer, try asking about a particular campaign by name, or use the + button to add a campaign as context for this conversation.' },
      { type: 'cta', text: 'Add Campaign Context', action: 'add-context' },
    ],
    citations: [],
  };
}

// ── Mock thread data ──────────────────────────────────────────────────────────
const INITIAL_THREADS = [
  { id: 't1', name: 'Summer Sale campaign not spending', updatedAt: '2h ago' },
  { id: 't2', name: 'Keyword analysis — Face Care', updatedAt: 'Yesterday' },
  { id: 't3', name: 'Weekly performance summary', updatedAt: '3 days ago' },
];

// ── Mock campaigns for context picker ────────────────────────────────────────
const MOCK_CAMPAIGNS = [
  { id: 'c1', name: 'Summer Essentials', type: 'Product Ads', status: 'Active' },
  { id: 'c2', name: 'Face Care Q4', type: 'Product Ads', status: 'Active' },
  { id: 'c3', name: 'Hair Oil Promo', type: 'Product Ads', status: 'Active' },
  { id: 'c4', name: 'Skincare Bundle', type: 'Product Ads', status: 'Paused' },
  { id: 'c5', name: 'Baby Products', type: 'Display Ads', status: 'Active' },
  { id: 'c6', name: 'Home Essentials Banner', type: 'Display Ads', status: 'Active' },
  { id: 'c7', name: 'Summer Sale', type: 'Product Ads', status: 'Paused' },
];

// ── Severity colours ──────────────────────────────────────────────────────────
const SEVERITY_STYLE = {
  high:   { dot: '#EF4444',                        bg: '#FEF2F2',                  text: '#991B1B' },
  medium: { dot: 'var(--osmos-brand-amber)',        bg: '#FFFBEB',                  text: '#92400E' },
  low:    { dot: 'var(--osmos-fg-muted)',           bg: 'var(--osmos-bg-subtle)',   text: 'var(--osmos-fg-muted)' },
};

// ── Rendered message content ──────────────────────────────────────────────────
function RenderContent({ blocks, onCTAClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <div key={i} style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>
              {block.text}
            </div>
          );
        }
        if (block.type === 'paragraph') {
          return (
            <div key={i} style={{ fontSize: 13, color: 'var(--osmos-fg)', lineHeight: 1.6 }}>
              {block.text}
            </div>
          );
        }
        if (block.type === 'table') {
          return (
            <div key={i} style={{ overflowX: 'auto', borderRadius: 6, border: `1px solid var(--osmos-border)` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: "'Open Sans', sans-serif" }}>
                <thead>
                  <tr style={{ background: 'var(--osmos-bg-muted)' }}>
                    {block.columns.map(col => (
                      <th key={col} style={{
                        padding: '7px 10px', textAlign: 'left',
                        fontWeight: 600, color: 'var(--osmos-fg-muted)',
                        borderBottom: `1px solid var(--osmos-border)`,
                        whiteSpace: 'nowrap',
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: ri < block.rows.length - 1 ? `1px solid var(--osmos-border)` : 'none' }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: '7px 10px', color: 'var(--osmos-fg)', whiteSpace: 'nowrap' }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === 'metrics') {
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 8, padding: 2,
            }}>
              {block.items.map((m, mi) => (
                <div key={mi} style={{
                  padding: '8px 10px', borderRadius: 6,
                  border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 2 }}>{m.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)' }}>{m.value}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: m.positive ? 'var(--osmos-brand-green)' : '#EF4444',
                    }}>{m.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (block.type === 'issues') {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {block.items.map((issue, ii) => {
                const s = SEVERITY_STYLE[issue.severity] || SEVERITY_STYLE.low;
                return (
                  <div key={ii} style={{
                    padding: '8px 10px', borderRadius: 6,
                    background: s.bg, border: `1px solid var(--osmos-border)`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                        background: s.dot,
                      }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: s.text }}>
                        {issue.title}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.5, paddingLeft: 12 }}>
                      {issue.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        if (block.type === 'cta') {
          return (
            <div key={i}>
              <button
                onClick={() => onCTAClick?.(block)}
                style={{
                  padding: '7px 14px', borderRadius: 6, border: 'none',
                  background: '#8b5cf6', color: '#fff',
                  fontSize: 12, fontWeight: 600, fontFamily: "'Open Sans', sans-serif",
                  cursor: 'pointer',
                }}>
                {block.text}
              </button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 2px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6',
          animation: `sofie-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes sofie-dot-bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Agent step reveal ─────────────────────────────────────────────────────────
function AgentSteps({ steps, label }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 8px', borderRadius: 10,
        background: 'rgba(139,92,246,0.10)', marginBottom: 8,
      }}>
        <SparklesIcon size={12} color="#8b5cf6" />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6' }}>{label}</span>
      </div>
      {steps.map((step, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: 'var(--osmos-fg-subtle)', padding: '2px 0',
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--osmos-fg-subtle)', flexShrink: 0 }} />
          {step}
        </div>
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ message, onCopy, onUpvote, onDownvote, onCTAClick }) {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [showDownvoteFeedback, setShowDownvoteFeedback] = useState(false);
  const [copiedPulse, setCopiedPulse] = useState(false);
  const [downvoteReason, setDownvoteReason] = useState('');

  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <div style={{
          maxWidth: '80%', padding: '9px 12px', borderRadius: '10px 10px 2px 10px',
          background: '#8b5cf6', color: '#fff',
          fontSize: 13, lineHeight: 1.5, fontFamily: "'Open Sans', sans-serif",
        }}>
          {message.text}
        </div>
      </div>
    );
  }

  // Sofie response
  return (
    <div style={{ marginBottom: 16 }}>
      {/* Agent label + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          background: 'rgba(139,92,246,0.10)', border: `1px solid #8b5cf6`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <SparklesIcon size={12} color="#8b5cf6" />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6' }}>Sofie</span>
      </div>

      {/* Response card */}
      <div style={{
        padding: '10px 12px', borderRadius: '2px 10px 10px 10px',
        background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`,
        marginLeft: 28,
      }}>
        {message.typing ? (
          <TypingDots />
        ) : (
          <>
            {message.response?.agentLabel && (
              <AgentSteps steps={message.response.steps} label={message.response.agentLabel} />
            )}
            <RenderContent blocks={message.response?.content || []} onCTAClick={onCTAClick} />

            {/* Citations */}
            {message.response?.citations?.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid var(--osmos-border)` }}>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 3, fontWeight: 600 }}>Sources</div>
                {message.response.citations.map((c, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#8b5cf6', cursor: 'pointer' }}>
                    · {c}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Feedback actions (only after full response) */}
      {!message.typing && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          marginLeft: 28, marginTop: 4,
        }}>
          {/* Copy */}
          <button
            onClick={() => { onCopy(message); setCopiedPulse(true); setTimeout(() => setCopiedPulse(false), 1500); }}
            title="Copy response"
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '3px 6px', borderRadius: 4,
              color: copiedPulse ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)',
              display: 'flex', alignItems: 'center', gap: 3,
              fontSize: 11, fontFamily: "'Open Sans', sans-serif",
              transition: 'color 0.15s',
            }}
          >
            <CopyIcon size={12} color={copiedPulse ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)'} />
            {copiedPulse ? 'Copied' : 'Copy'}
          </button>

          {/* Upvote */}
          <button
            onClick={() => { setFeedbackGiven('up'); onUpvote(message); }}
            title="Good response"
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '3px 6px', borderRadius: 4,
              color: feedbackGiven === 'up' ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)',
              display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
          >
            <ThumbUpIcon size={12} color={feedbackGiven === 'up' ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)'} />
          </button>

          {/* Downvote */}
          <button
            onClick={() => { setFeedbackGiven('down'); setShowDownvoteFeedback(true); }}
            title="Not helpful"
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '3px 6px', borderRadius: 4,
              color: feedbackGiven === 'down' ? '#EF4444' : 'var(--osmos-fg-subtle)',
              display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
          >
            <ThumbDownIcon size={12} color={feedbackGiven === 'down' ? '#EF4444' : 'var(--osmos-fg-subtle)'} />
          </button>
        </div>
      )}

      {/* Downvote feedback form */}
      {showDownvoteFeedback && (
        <div style={{
          marginLeft: 28, marginTop: 6, padding: '8px 10px',
          borderRadius: 6, border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg-subtle)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6 }}>
            What went wrong?
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
            {['Wrong agent used', 'Hallucination', 'Too long', 'Wrong recommendation', 'Not relevant'].map(reason => (
              <button
                key={reason}
                onClick={() => setDownvoteReason(reason)}
                style={{
                  padding: '3px 8px', borderRadius: 10, fontSize: 11, cursor: 'pointer',
                  fontFamily: "'Open Sans', sans-serif",
                  border: `1px solid ${downvoteReason === reason ? '#8b5cf6' : 'var(--osmos-border)'}`,
                  background: downvoteReason === reason ? 'rgba(139,92,246,0.10)' : 'var(--osmos-bg)',
                  color: downvoteReason === reason ? '#8b5cf6' : 'var(--osmos-fg-muted)',
                }}
              >{reason}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => { onDownvote(message, downvoteReason); setShowDownvoteFeedback(false); }}
              style={{
                padding: '4px 10px', borderRadius: 5, border: 'none',
                background: '#8b5cf6', color: '#fff',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
              }}
            >Submit</button>
            <button
              onClick={() => setShowDownvoteFeedback(false)}
              style={{
                padding: '4px 10px', borderRadius: 5,
                border: `1px solid var(--osmos-border)`, background: 'transparent',
                fontSize: 11, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg-muted)',
              }}
            >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Context popover ───────────────────────────────────────────────────────────
function ContextPopover({ onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = MOCK_CAMPAIGNS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: 'absolute', bottom: '100%', left: 0, zIndex: 100,
      width: 280, marginBottom: 6,
      background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`,
      borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '8px 10px', borderBottom: `1px solid var(--osmos-border)` }}>
        <input
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search campaigns…"
          style={{
            width: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)',
          }}
        />
      </div>
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        <div style={{ padding: '5px 10px 3px', fontSize: 10, fontWeight: 700, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Campaigns
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '8px 10px', fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>No results</div>
        )}
        {filtered.map(c => (
          <button
            key={c.id}
            onClick={() => { onSelect(c); onClose(); }}
            style={{
              width: '100%', textAlign: 'left', padding: '6px 10px',
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: "'Open Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: 12, color: 'var(--osmos-fg)' }}>{c.name}</span>
            <span style={{
              fontSize: 10, padding: '1px 5px', borderRadius: 8,
              background: c.status === 'Active' ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-muted)',
              color: c.status === 'Active' ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)',
            }}>{c.status}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Thread list dropdown ──────────────────────────────────────────────────────
function ThreadDropdown({ threads, currentId, onSelect, onNew, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0, zIndex: 100,
      width: 240, marginTop: 4,
      background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`,
      borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => { onNew(); onClose(); }}
        style={{
          width: '100%', textAlign: 'left', padding: '8px 12px',
          border: 'none', borderBottom: `1px solid var(--osmos-border)`,
          background: 'transparent', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
          display: 'flex', alignItems: 'center', gap: 6,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <PlusIcon size={13} color="#8b5cf6" />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#8b5cf6' }}>New conversation</span>
      </button>
      {threads.map(t => (
        <button
          key={t.id}
          onClick={() => { onSelect(t.id); onClose(); }}
          style={{
            width: '100%', textAlign: 'left', padding: '7px 12px',
            border: 'none', background: currentId === t.id ? 'rgba(139,92,246,0.10)' : 'transparent',
            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
          }}
          onMouseEnter={e => e.currentTarget.style.background = currentId === t.id ? 'rgba(139,92,246,0.10)' : 'var(--osmos-bg-subtle)'}
          onMouseLeave={e => e.currentTarget.style.background = currentId === t.id ? 'rgba(139,92,246,0.10)' : 'transparent'}
        >
          <div style={{ fontSize: 12, color: 'var(--osmos-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {t.name}
          </div>
          <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 1 }}>{t.updatedAt}</div>
        </button>
      ))}
    </div>
  );
}

// ── Main SofieChatPanel ───────────────────────────────────────────────────────
// detectedIssue: { text, promptText } — pre-surfaced signal from Suggestions v2 feed
// promptsUsed: number — for usage meter in footer (0–8 range, mock)
export function SofieChatPanel({ open, onClose, activeAdType = 'Product Ads', detectedIssue = null }) {
  const [messages, setMessages]           = useState([]);
  const [inputValue, setInputValue]       = useState('');
  const [isTyping, setIsTyping]           = useState(false);
  const [threads, setThreads]             = useState(INITIAL_THREADS);
  const [currentThreadId, setCurrentThreadId] = useState('current');
  const [currentThreadName, setCurrentThreadName] = useState('New conversation');
  const [showThreadMenu, setShowThreadMenu] = useState(false);
  const [showContextPicker, setShowContextPicker] = useState(false);
  // Multi-entity context (Agreed Design: array architecture, single-entity default UX)
  const [contextEntities, setContextEntities] = useState([]);
  const [expanded, setExpanded]           = useState(false);
  const [panelMounted, setPanelMounted]   = useState(false);
  // Usage meter — mock state, real-time API integration needed (Priya P0 flag)
  const [promptsUsed, setPromptsUsed]     = useState(3);
  // Zara delight: follow-up message after CTA action
  const [pendingFollowup, setPendingFollowup] = useState(null);
  // Billing gate state: null | 'amber' | 'red-soft' | 'red-hard' | 'red-managed'
  // TODO: wire to real wallet API (Pillar 3). Mock-state only.
  const [billingGate, setBillingGate]     = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Slide-in animation
  useEffect(() => {
    if (open) {
      setTimeout(() => setPanelMounted(true), 10);
    } else {
      setPanelMounted(false);
    }
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Close thread/context menus on outside click
  useEffect(() => {
    if (!showThreadMenu && !showContextPicker) return;
    const handler = () => { setShowThreadMenu(false); setShowContextPicker(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showThreadMenu, showContextPicker]);

  const prompts = SUGGESTED_PROMPTS[activeAdType] || [];

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    setInputValue('');
    setShowContextPicker(false);
    setPendingFollowup(null);

    // Auto-name thread after FIRST user message (not "a few" — Dev flag)
    setMessages(prev => {
      if (prev.length === 0) {
        const name = text.length > 50 ? text.slice(0, 50) + '…' : text;
        setCurrentThreadName(name);
      }
      return prev;
    });

    const userMsg = { id: Date.now(), role: 'user', text };
    const typingMsg = { id: Date.now() + 1, role: 'sofie', typing: true };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setIsTyping(true);
    setPromptsUsed(n => Math.min(n + 1, 8));

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(text);
      setMessages(prev =>
        prev.map(m => m.id === typingMsg.id
          ? { ...m, typing: false, response }
          : m
        )
      );
      setIsTyping(false);
    }, 1600 + Math.random() * 800);
  }, []);

  const handleNewConversation = useCallback(() => {
    // Archive current thread
    if (messages.length > 0) {
      setThreads(prev => [
        { id: currentThreadId, name: currentThreadName, updatedAt: 'Just now' },
        ...prev.filter(t => t.id !== currentThreadId).slice(0, 4),
      ]);
    }
    setMessages([]);
    setCurrentThreadId(`t${Date.now()}`);
    setCurrentThreadName('New conversation');
    setContextEntities([]);
    setInputValue('');
    setPendingFollowup(null);
  }, [messages.length, currentThreadId, currentThreadName]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
  };

  // Zara: check for pending follow-up on panel focus/open
  useEffect(() => {
    if (open && pendingFollowup) {
      const delay = setTimeout(() => {
        const followupMsg = {
          id: Date.now(),
          role: 'sofie',
          typing: false,
          response: {
            agentLabel: 'Insights Agent',
            steps: ['Checking if your change made an impact…'],
            content: [
              { type: 'paragraph', text: `I noticed you updated the ${pendingFollowup.action} on '${pendingFollowup.entityName}' ✓ I'll monitor performance over the next 7 days — ask me any time how it's going.` },
              { type: 'cta', text: 'Check current performance now', action: 'check-now' },
            ],
            citations: [],
          },
        };
        const typingId = Date.now() - 1;
        setMessages(prev => [...prev, { id: typingId, role: 'sofie', typing: true }]);
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === typingId ? followupMsg : m));
          setPendingFollowup(null);
        }, 800);
      }, 600);
      return () => clearTimeout(delay);
    }
  }, [open, pendingFollowup]);

  const handleContextSelect = (campaign) => {
    setContextEntities([campaign]);
    // Adding context resets the conversation
    setMessages([]);
    setCurrentThreadName(`${campaign.name} — analysis`);
    setPendingFollowup(null);
  };

  if (!open) return null;

  const panelWidth = expanded ? 720 : 440;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(0,0,0,0.25)',
          opacity: panelMounted ? 1 : 0,
          transition: 'opacity 0.22s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: panelWidth, zIndex: 810,
        display: 'flex', flexDirection: 'column',
        background: 'var(--osmos-bg)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.16)',
        transform: panelMounted ? 'translateX(0)' : `translateX(${panelWidth}px)`,
        transition: 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), width 0.22s ease',
        fontFamily: "'Open Sans', sans-serif",
      }}>

        {/* ── Panel header (dark navy) ──────────────────────────────────── */}
        <div style={{
          background: 'var(--osmos-nav-bg)', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid var(--osmos-nav-border)`,
          flexShrink: 0,
        }}>
          {/* Left — Sofie branding + thread picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
            {/* Sofie avatar */}
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7B82F8 0%, #a78bfa 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <SparklesIcon size={15} color="#fff" />
            </div>

            {/* Thread name + dropdown */}
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
                ASK SOFIE
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowThreadMenu(v => !v); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  padding: '0 2px', color: '#fff',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentThreadName}
                </span>
                <ChevDownIcon size={12} color="rgba(255,255,255,0.6)" />
              </button>
            </div>

            {showThreadMenu && (
              <div onMouseDown={e => e.stopPropagation()}>
                <ThreadDropdown
                  threads={threads}
                  currentId={currentThreadId}
                  onSelect={(id) => {
                    const t = threads.find(t => t.id === id);
                    if (t) { setCurrentThreadId(id); setCurrentThreadName(t.name); setMessages([]); }
                  }}
                  onNew={handleNewConversation}
                  onClose={() => setShowThreadMenu(false)}
                />
              </div>
            )}
          </div>

          {/* Right — expand + new + close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => setExpanded(v => !v)}
              title={expanded ? 'Collapse panel' : 'Expand panel'}
              style={{
                width: 28, height: 28, border: `1px solid var(--osmos-nav-border)`, borderRadius: 6,
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <ExpandIcon size={13} color="rgba(255,255,255,0.6)" />
            </button>
            <button
              onClick={handleNewConversation}
              title="New conversation"
              style={{
                width: 28, height: 28, border: `1px solid var(--osmos-nav-border)`, borderRadius: 6,
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <MessageIcon size={13} color="rgba(255,255,255,0.6)" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              style={{
                width: 28, height: 28, border: `1px solid var(--osmos-nav-border)`, borderRadius: 6,
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <CloseIcon size={14} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        </div>

        {/* ── Active context banner (multi-entity) ─────────────────────── */}
        {contextEntities.length > 0 && (
          <div style={{
            padding: '6px 14px', background: 'rgba(139,92,246,0.10)',
            borderBottom: `1px solid var(--osmos-nav-border)`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0, gap: 8, flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <AtIcon size={12} color="#8b5cf6" />
              <span style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 600 }}>Context:</span>
              {contextEntities.map(e => (
                <span key={e.id} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px', borderRadius: 12,
                  background: 'rgba(123,130,248,0.15)', color: '#8b5cf6', fontSize: 11,
                }}>
                  {e.name}
                  <button
                    onClick={() => {
                      const updated = contextEntities.filter(x => x.id !== e.id);
                      setContextEntities(updated);
                      if (updated.length === 0) { setMessages([]); setCurrentThreadName('New conversation'); }
                    }}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#8b5cf6', padding: 0, fontSize: 12, lineHeight: 1 }}
                  >×</button>
                </span>
              ))}
            </div>
            <button
              onClick={() => { setContextEntities([]); setMessages([]); setCurrentThreadName('New conversation'); }}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#8b5cf6', fontSize: 11, fontFamily: "'Open Sans', sans-serif" }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── Messages area ─────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>

          {/* Empty state — detected issue chip + suggested prompts */}
          {messages.length === 0 && (
            <div>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '24px 0 20px', textAlign: 'center',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(123,130,248,0.15) 0%, rgba(167,139,250,0.15) 100%)',
                  border: `1px solid #8b5cf6`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                }}>
                  <SparklesIcon size={22} color="#8b5cf6" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 4 }}>
                  Hi, I'm Sofie
                </div>
                <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, maxWidth: 300 }}>
                  Your AI copilot for ad performance. Ask me anything about your campaigns.
                </div>
              </div>

              {/* Dynamic detected-issue chip (rendered first when signal available — Dev/Meera: key differentiator) */}
              {detectedIssue && (
                <button
                  onClick={() => sendMessage(detectedIssue.promptText)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 12px',
                    marginBottom: 8, borderRadius: 8, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                    border: `1px solid var(--osmos-brand-amber)`,
                    background: 'rgba(245,166,35,0.07)',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.13)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.07)'; }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>⚡</span>
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg)', lineHeight: 1.5 }}>
                    {detectedIssue.text}
                  </span>
                </button>
              )}

              {/* Suggested prompts (max 3 — Arjun research-validated cap) */}
              {prompts.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Try asking
                  </div>
                  {prompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(p)}
                      style={{
                        textAlign: 'left', padding: '9px 12px', borderRadius: 8,
                        border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg)',
                        fontSize: 12, color: 'var(--osmos-fg)', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                        lineHeight: 1.5, transition: 'all 0.12s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.10)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--osmos-border)'; e.currentTarget.style.background = 'var(--osmos-bg)'; }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Message list */}
          {messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onCopy={(m) => {
                const text = m.response?.content?.map(b => b.text || '').filter(Boolean).join('\n') || '';
                navigator.clipboard?.writeText(text).catch(() => {});
              }}
              onUpvote={(m) => console.log('[Sofie] Upvote', m.id)}
              onDownvote={(m, reason) => console.log('[Sofie] Downvote', m.id, reason)}
              onCTAClick={(block) => {
                // Zara delight: record pending follow-up so Sofie checks back on re-open
                const entityName = contextEntities[0]?.name || 'your campaign';
                setPendingFollowup({ action: block.action, entityName });
                console.log('[Sofie] CTA clicked', block.action, 'entity:', entityName);
              }}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Billing gate banner (auto-triggered — Pillar 3 integration point) ── */}
        {billingGate && (
          <div style={{
            padding: '8px 14px', flexShrink: 0,
            borderTop: `1px solid var(--osmos-border)`,
            background: billingGate === 'amber' ? 'rgba(245,166,35,0.08)' : 'rgba(239,68,68,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          }}>
            <span style={{ fontSize: 12, color: billingGate === 'amber' ? 'var(--osmos-brand-amber)' : '#EF4444', lineHeight: 1.4, flex: 1 }}>
              {billingGate === 'amber' && 'Free usage limit reached · Resets in 6h · Further usage will be billable'}
              {billingGate === 'red-soft' && 'Your Sofie wallet and daily free limit is exhausted'}
              {billingGate === 'red-hard' && 'Usage limit reached · Resets in 6h · Contact your administrator'}
              {billingGate === 'red-managed' && 'Contact your administrator to add money to your Sofie Wallet'}
            </span>
            {billingGate === 'amber' && (
              <button
                onClick={() => setBillingGate(null)}
                style={{ padding: '4px 10px', borderRadius: 5, border: `1px solid var(--osmos-brand-amber)`, background: 'transparent', color: 'var(--osmos-brand-amber)', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", flexShrink: 0 }}
              >Continue</button>
            )}
            {billingGate === 'red-soft' && (
              <button
                style={{ padding: '4px 10px', borderRadius: 5, border: 'none', background: '#EF4444', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", flexShrink: 0 }}
              >Recharge</button>
            )}
          </div>
        )}

        {/* ── Input area ────────────────────────────────────────────────── */}
        <div style={{
          padding: '10px 12px 14px', borderTop: `1px solid var(--osmos-border)`,
          background: 'var(--osmos-bg)', flexShrink: 0,
        }}>
          {/* Input row */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: 6,
            padding: '8px 10px', borderRadius: 10,
            border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg-subtle)',
            position: 'relative',
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#8b5cf6'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--osmos-border)'}
          >
            {/* Context picker popover */}
            {showContextPicker && (
              <div onMouseDown={e => e.stopPropagation()}>
                <ContextPopover
                  onSelect={handleContextSelect}
                  onClose={() => setShowContextPicker(false)}
                />
              </div>
            )}

            {/* + context button */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowContextPicker(v => !v); }}
              title="Add context"
              style={{
                width: 24, height: 24, borderRadius: 5, flexShrink: 0,
                border: `1px solid var(--osmos-border)`, background: 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: showContextPicker ? '#8b5cf6' : 'var(--osmos-fg-subtle)',
                marginBottom: 1,
              }}
            >
              <PlusIcon size={13} color={showContextPicker ? '#8b5cf6' : 'var(--osmos-fg-subtle)'} />
            </button>

            {/* Textarea */}
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Sofie about your campaigns…"
              rows={1}
              disabled={isTyping}
              style={{
                flex: 1, border: 'none', outline: 'none', resize: 'none',
                background: 'transparent', fontSize: 13, fontFamily: "'Open Sans', sans-serif",
                color: 'var(--osmos-fg)', lineHeight: 1.5,
                maxHeight: 100, overflowY: 'auto',
                opacity: isTyping ? 0.5 : 1,
              }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
            />

            {/* Send button */}
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: 28, height: 28, borderRadius: 6, border: 'none',
                background: inputValue.trim() && !isTyping ? '#8b5cf6' : 'var(--osmos-bg-muted)',
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: 1, transition: 'background 0.15s',
              }}
            >
              <SendIcon size={14} color={inputValue.trim() && !isTyping ? '#fff' : 'var(--osmos-fg-subtle)'} />
            </button>
          </div>

          {/* Footer — usage meter (ambient, shifts amber when >5) + disclaimer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{
              fontSize: 10,
              color: promptsUsed > 5 ? 'var(--osmos-brand-amber)' : 'var(--osmos-fg-subtle)',
              transition: 'color 0.2s',
            }}>
              {promptsUsed} of 8 free prompts used today
            </span>
            <span style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>
              Sofie may make mistakes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
