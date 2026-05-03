import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon, CloseIcon, TrashIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '../../ui';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BG_MUTED  = 'var(--osmos-bg-muted)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const TEXT_SUB  = 'var(--osmos-fg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const VI        = 'var(--osmos-brand-violet)';
const VI_BG     = 'var(--osmos-brand-violet-muted)';
const VI_LIGHT  = 'rgba(124,58,237,0.06)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = ({ size = 16, color = VI }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

// CopyIcon — DS copy-06 (node 7391:30139)
const CopyIcon = ({ size = 13, color = TEXT_MID }) => (
  <Icon size={size} color={color} strokeWidth={0} fill={color}>
    <path d="M14.5 7.7C14.5 7.12 14.499 6.75 14.476 6.468C14.453 6.196 14.416 6.095 14.391 6.046C14.295 5.858 14.142 5.705 13.954 5.609C13.905 5.584 13.804 5.547 13.532 5.524C13.249 5.501 12.876 5.5 12.3 5.5H4.2C3.624 5.5 3.251 5.501 2.968 5.524C2.696 5.547 2.595 5.584 2.546 5.609C2.358 5.705 2.205 5.858 2.109 6.046C2.084 6.095 2.047 6.196 2.024 6.468C2.001 6.751 2 7.124 2 7.7V15.8C2 16.376 2.001 16.749 2.024 17.032C2.047 17.304 2.084 17.405 2.109 17.454C2.205 17.642 2.358 17.795 2.546 17.891C2.595 17.916 2.696 17.953 2.968 17.976C3.251 17.999 3.624 18 4.2 18H12.3C12.876 18 13.249 17.999 13.532 17.976C13.804 17.953 13.905 17.916 13.954 17.891C14.142 17.795 14.295 17.642 14.391 17.454C14.416 17.405 14.453 17.304 14.476 17.032C14.499 16.749 14.5 16.376 14.5 15.8V7.7ZM18 14.5V7.4C18 6.264 17.9 5.471 17.85 4.854C17.8 4.249 17.807 3.901 17.673 3.638C17.385 3.073 16.927 2.615 16.362 2.327C16.099 2.193 15.751 2.1 15.146 2.051C14.529 2 13.736 2 12.6 2H5.5C4.948 2 4.5 1.552 4.5 1C4.5 0.448 4.948 0 5.5 0H12.6C13.703 0 14.591 0 15.309 0.058C16.037 0.117 16.677 0.243 17.27 0.545C18.21 1.024 18.976 1.79 19.455 2.73C19.757 3.323 19.883 3.963 19.942 4.691C20.001 5.409 20 6.297 20 7.4V14.5C20 15.052 19.552 15.5 19 15.5C18.448 15.5 18 15.052 18 14.5ZM16.5 15.8C16.5 16.343 16.501 16.812 16.47 17.195C16.437 17.591 16.366 17.984 16.173 18.362C15.885 18.927 15.427 19.385 14.862 19.673C14.484 19.866 14.091 19.937 13.695 19.97C13.312 20.001 12.843 20 12.3 20H4.2C3.657 20 3.188 20.001 2.805 19.97C2.409 19.937 2.016 19.866 1.638 19.673C1.073 19.385 0.615 18.927 0.327 18.362C0.134 17.984 0.063 17.591 0.03 17.195C-0.001 16.812 0 16.343 0 15.8V7.7C0 7.157 -0.001 6.688 0.03 6.305C0.063 5.909 0.134 5.516 0.327 5.138C0.615 4.573 1.073 4.115 1.638 3.827C2.016 3.634 2.409 3.563 2.805 3.53C3.188 3.499 3.657 3.5 4.2 3.5H12.3C12.843 3.5 13.312 3.499 13.695 3.53C14.091 3.563 14.484 3.634 14.862 3.827C15.427 4.115 15.885 4.573 16.173 5.138C16.366 5.516 16.437 5.909 16.47 6.305C16.501 6.688 16.5 7.157 16.5 7.7V15.8Z" />
  </Icon>
);

// ThumbUpIcon / ThumbDownIcon — not in DS, kept as custom
const ThumbUpIcon = ({ size = 13, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </Icon>
);

const ThumbDownIcon = ({ size = 13, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </Icon>
);

// SendIcon — DS send-01 (node 7391:30140)
const SendIcon = ({ size = 14, color = '#fff' }) => (
  <Icon size={size} color={color} strokeWidth={0} fill={color}>
    <path d="M19.27 0.084C19.431 0.037 19.732 -0.042 20.07 0.027L20.218 0.067L20.381 0.132C20.697 0.28 20.951 0.535 21.099 0.851L21.165 1.015L21.204 1.161C21.274 1.499 21.195 1.801 21.148 1.962C21.088 2.171 20.988 2.422 20.891 2.672L14.301 19.559C14.192 19.839 14.086 20.112 13.983 20.32C13.898 20.493 13.708 20.859 13.314 21.063C12.88 21.289 12.364 21.288 11.931 21.062C11.537 20.857 11.348 20.491 11.263 20.318C11.16 20.11 11.055 19.837 10.946 19.558L8.349 12.882L1.674 10.286C1.395 10.177 1.122 10.072 0.914 9.97C0.741 9.885 0.375 9.695 0.17 9.302C-0.056 8.868 -0.057 8.351 0.169 7.917C0.373 7.523 0.74 7.334 0.912 7.249C1.12 7.146 1.393 7.04 1.672 6.932L18.559 0.341C18.81 0.243 19.061 0.145 19.27 0.084ZM10.291 12.354L12.624 18.353L17.957 4.688L10.291 12.354ZM2.878 8.607L8.876 10.94L16.541 3.275L2.878 8.607Z" />
  </Icon>
);

// ── Mock AI response generator ─────────────────────────────────────────────────
const MOCK_RESPONSES = {
  spend: {
    steps: ['Analyzing campaign configuration', 'Checking hygiene signals', 'Reviewing spend pacing'],
    answer: `**I found 2 issues affecting spend:**

**1. Daily budget exhausted early**
Your daily budget is being hit by early afternoon on most days, pausing delivery for the remainder. Consider increasing the daily budget or switching to accelerated delivery for time-sensitive promotions.

**2. Keyword bid below floor price**
Several of your keywords are bidding below the estimated floor price for this category. Increasing bids for your top-performing keywords should restore auction eligibility.

*Note: This is a Beta feature. Diagnostics are illustrative — connect to live campaign data for accurate analysis.*`,
  },
  impressions: {
    steps: ['Analyzing campaign configuration', 'Checking impression delivery', 'Reviewing audience signals'],
    answer: `**Impressions dropped 34% week-over-week. Likely causes:**

**1. Audience segment size**
The targeted audience segment has shrunk — this can happen after a promotional period ends and shoppers return to baseline behavior.

**2. Competing bid increase**
Category competition has intensified. Other advertisers have raised bids for similar keywords, reducing your auction win rate.

**Recommended action:** Review your bid strategy and consider expanding to broader audience segments.

*Note: This is a Beta feature. Diagnostics are illustrative — connect to live campaign data for accurate analysis.*`,
  },
  keywords: {
    steps: ['Fetching keyword performance data', 'Analyzing impression share', 'Comparing bids vs. floor prices'],
    answer: `**3 keywords need attention:**

| Keyword | Issue | Recommended action |
|---|---|---|
| "summer dress" | Bid ₹2.1 vs floor ₹3.5 | Increase bid to ₹3.8 |
| "casual wear" | Low CTR (0.4%) | Review creative relevance |
| "fashion sale" | High cost, zero conversions | Consider pausing |

**2 keywords are performing well** and don't need changes.

*Note: This is a Beta feature. Diagnostics are illustrative — connect to live campaign data for accurate analysis.*`,
  },
  default: {
    steps: ['Analyzing campaign configuration', 'Running diagnostics', 'Compiling findings'],
    answer: `**Campaign summary:**

Your campaign is currently active with moderate performance. Here are the key observations:

- **Spend pacing:** On track at ~68% of expected daily budget utilization
- **CTR:** 1.2% — slightly below category average of 1.6%
- **Keyword coverage:** 12 active keywords; 3 below recommended bid floor

The most impactful improvement would be addressing the bid floor gaps for your top 3 keywords.

*Note: This is a Beta feature. Diagnostics are illustrative — connect to live campaign data for accurate analysis.*`,
  },
};

function getMockResponse(text) {
  const t = text.toLowerCase();
  if (t.includes('spend') || t.includes('spending') || t.includes('budget')) return MOCK_RESPONSES.spend;
  if (t.includes('impression') || t.includes('drop') || t.includes('delivery')) return MOCK_RESPONSES.impressions;
  if (t.includes('keyword')) return MOCK_RESPONSES.keywords;
  return MOCK_RESPONSES.default;
}

// ── Suggested prompts ─────────────────────────────────────────────────────────
const STATIC_PROMPTS = [
  'Summarize top issues with this campaign',
  'Are my ads being served?',
];

function getDynamicPrompts() {
  return [
    "Why isn't my campaign spending?",
    'Why did my impressions drop suddenly?',
  ];
}

// ── ThinkingSteps ─────────────────────────────────────────────────────────────
function ThinkingSteps({ steps, onDone }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) { onDone(); return; }
    const t = setTimeout(() => setCurrent((c) => c + 1), 600 + Math.random() * 400);
    return () => clearTimeout(t);
  }, [current, steps.length, onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="AI is analyzing your campaign"
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '12px 16px', borderRadius: 12, background: VI_LIGHT,
        border: `1px solid ${BORDER}`, maxWidth: '85%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
        <SparklesIcon size={13} color={VI} />
        <span style={{ fontSize: 12, fontWeight: 600, color: VI, fontFamily: FONT }}>Planning…</span>
      </div>
      {steps.map((step, i) => {
        const done    = i < current;
        const running = i === current;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: i > current ? 0.35 : 1, transition: 'opacity 0.3s' }}>
            <StepIcon done={done} running={running} />
            <span style={{ fontSize: 12, color: done ? TEXT : TEXT_MID, fontFamily: FONT, transition: 'color 0.3s' }}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

function StepIcon({ done, running }) {
  if (done) return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="rgba(124,58,237,0.15)" />
      <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke={VI} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (running) return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'ai-spin 1s linear infinite' }}>
      <circle cx="7" cy="7" r="5.5" stroke={BORDER} strokeWidth="1.5" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke={VI} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={BORDER} strokeWidth="1.5" />
    </svg>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg, onCopy, onRate }) {
  const [rating, setRating] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    onCopy && onCopy(msg.id);
  };

  const handleRate = (val) => { setRating(val); onRate && onRate(msg.id, val); };

  if (msg.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <div style={{
          maxWidth: '78%', padding: '10px 14px', borderRadius: '12px 12px 4px 12px',
          background: ACCENT, color: '#fff', fontSize: 13, lineHeight: 1.5, fontFamily: FONT,
        }}>
          {msg.text}
        </div>
      </div>
    );
  }

  // Parse simple markdown bold (**text**) and line breaks
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, maxWidth: '85%' }}>
        <div style={{ width: 26, height: 26, borderRadius: 999, background: VI_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
          <SparklesIcon size={13} color={VI} />
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: '12px 12px 12px 4px',
          background: BG_SUBTLE, border: `1px solid ${BORDER}`,
          fontSize: 13, lineHeight: 1.6, color: TEXT, fontFamily: FONT,
        }}>
          {renderText(msg.text)}
        </div>
      </div>
      {/* Actions row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 34, marginTop: 6 }}>
        <ActionBtn onClick={handleCopy} title={copied ? 'Copied!' : 'Copy response'} active={copied}>
          <CopyIcon size={12} color={copied ? ACCENT : TEXT_MID} />
          <span style={{ fontSize: 11, color: copied ? ACCENT : TEXT_MID }}>{copied ? 'Copied' : 'Copy'}</span>
        </ActionBtn>
        <ActionBtn onClick={() => handleRate('up')} title="This was helpful" active={rating === 'up'}>
          <ThumbUpIcon size={12} color={rating === 'up' ? ACCENT : TEXT_MID} />
        </ActionBtn>
        <ActionBtn onClick={() => handleRate('down')} title="This wasn't helpful" active={rating === 'down'}>
          <ThumbDownIcon size={12} color={rating === 'down' ? '#EF4444' : TEXT_MID} />
        </ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({ children, onClick, title, active }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4, padding: '3px 7px',
        border: `1px solid ${active || hover ? BORDER : 'transparent'}`,
        borderRadius: 6, background: hover ? BG_SUBTLE : 'transparent',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

// ── Thread sidebar ────────────────────────────────────────────────────────────
function ThreadSidebar({ threads, activeId, onSelect, onNew, onDelete, collapsed, onToggle }) {
  const [hoveredThread, setHoveredThread] = useState(null);

  if (collapsed) {
    return (
      <div style={{ width: 32, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 8, flexShrink: 0 }}>
        <button
          onClick={onToggle}
          title="Show threads"
          style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4 }}
        >
          <ChevronRightIcon size={14} color={TEXT_MID} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: 172, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
      {/* Sidebar header */}
      <div style={{ padding: '10px 12px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_MID, fontFamily: FONT, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Threads</span>
        <button onClick={onToggle} title="Collapse" style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 3 }}>
          <ChevronLeftIcon size={13} color={TEXT_MID} />
        </button>
      </div>

      {/* New thread button */}
      <button
        onClick={onNew}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', margin: '8px 8px 4px',
          border: `1px dashed ${BORDER}`, borderRadius: 6, background: 'transparent',
          cursor: 'pointer', fontSize: 12, color: TEXT_MID, fontFamily: FONT,
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_MID; }}
      >
        <PlusIcon size={12} color="currentColor" />
        New Thread
      </button>

      {/* Thread list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
        {threads.map((thread) => (
          <div
            key={thread.id}
            onMouseEnter={() => setHoveredThread(thread.id)}
            onMouseLeave={() => setHoveredThread(null)}
            style={{ position: 'relative', marginBottom: 2 }}
          >
            <button
              onClick={() => onSelect(thread.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: FONT,
                background: activeId === thread.id ? VI_BG : hoveredThread === thread.id ? BG_SUBTLE : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: activeId === thread.id ? 600 : 400, color: activeId === thread.id ? VI : TEXT, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {thread.name}
              </div>
              <div style={{ fontSize: 11, color: TEXT_SUB, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {thread.campaignName}
              </div>
              <div style={{ fontSize: 10, color: TEXT_SUB, marginTop: 1 }}>{thread.date}</div>
            </button>
            {/* Delete — visible on hover, not active thread */}
            {hoveredThread === thread.id && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(thread.id); }}
                title="Delete thread"
                aria-label="Delete thread"
                style={{
                  position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                  width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 3,
                  padding: 0,
                }}
              >
                <TrashIcon size={12} color={TEXT_MID} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Suggested prompts ─────────────────────────────────────────────────────────
function SuggestedPrompts({ campaign, onSelect }) {
  const prompts = [...getDynamicPrompts(), ...STATIC_PROMPTS];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '24px 20px', gap: 20 }}>
      {/* Welcome */}
      <div style={{ textAlign: 'center', maxWidth: 320 }}>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: VI_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <SparklesIcon size={20} color={VI} />
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: TEXT, fontFamily: FONT }}>
          Hi! I can help you debug
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: TEXT_MID, fontFamily: FONT, lineHeight: 1.5 }}>
          {campaign?.name || 'this campaign'}
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: TEXT_SUB, fontFamily: FONT }}>
          Here are a few things you can ask:
        </p>
      </div>

      {/* Prompt chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}>
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            style={{
              padding: '10px 14px', borderRadius: 20, border: `1px solid ${BORDER}`,
              background: BG, color: TEXT, fontSize: 13, fontFamily: FONT,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', lineHeight: 1.4,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT_M; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = BG; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT; }}
          >
            {prompt}
          </button>
        ))}
      </div>

      <p style={{ margin: 0, fontSize: 11, color: TEXT_SUB, fontFamily: FONT }}>
        Beta · Responses are illustrative
      </p>
    </div>
  );
}

// ── Delete confirm dialog ─────────────────────────────────────────────────────
function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={onCancel} />
      <div style={{ position: 'relative', background: BG, borderRadius: 10, padding: 24, width: 300, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', fontFamily: FONT }}>
        <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: TEXT }}>Delete thread?</p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>This conversation will be permanently deleted.</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '7px 16px', border: `1px solid ${BORDER}`, borderRadius: 6, background: BG, color: TEXT_MID, fontSize: 13, cursor: 'pointer', fontFamily: FONT }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '7px 16px', border: 'none', borderRadius: 6, background: '#EF4444', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Storage helpers ───────────────────────────────────────────────────────────
const STORAGE_KEY = 'osmos_ai_debugger_threads';

function loadThreads() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveThreads(threads) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(threads)); } catch {}
}

function newThread(campaign) {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return {
    id: `thread_${Date.now()}`,
    name: `${campaign?.name?.split(' ').slice(0, 3).join(' ') ?? 'Campaign'} — ${date}`,
    campaignName: campaign?.name ?? '',
    campaignAdType: campaign?.adType ?? '',
    date,
    messages: [],
  };
}

// ── AIDebuggerPanel ───────────────────────────────────────────────────────────
export function AIDebuggerPanel({ open, campaign, onClose }) {
  const [threads,        setThreads]        = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputValue,     setInputValue]     = useState('');
  const [isThinking,     setIsThinking]     = useState(false);
  const [thinkingSteps,  setThinkingSteps]  = useState([]);
  const [deleteTarget,   setDeleteTarget]   = useState(null);
  const chatEndRef  = useRef(null);
  const textareaRef = useRef(null);

  // Initialise or switch thread when campaign changes
  useEffect(() => {
    if (!open || !campaign) return;
    const stored = loadThreads();
    // Find existing thread for this campaign, or create one
    const existing = stored.find((t) => t.campaignName === campaign.name);
    if (existing) {
      setThreads(stored);
      setActiveThreadId(existing.id);
    } else {
      const thread = newThread(campaign);
      const updated = [thread, ...stored];
      saveThreads(updated);
      setThreads(updated);
      setActiveThreadId(thread.id);
    }
  }, [open, campaign?.name]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threads, isThinking]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 120);
  }, [open]);

  // Keyboard: Escape closes
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  const updateThread = useCallback((threadId, updater) => {
    setThreads((prev) => {
      const updated = prev.map((t) => t.id === threadId ? updater(t) : t);
      saveThreads(updated);
      return updated;
    });
  }, []);

  const handleSend = useCallback((text) => {
    const msg = text.trim() || inputValue.trim();
    if (!msg || isThinking || !activeThreadId) return;
    setInputValue('');

    const userMsg = { id: `m_${Date.now()}`, role: 'user', text: msg };
    updateThread(activeThreadId, (t) => ({ ...t, messages: [...t.messages, userMsg] }));

    const mock = getMockResponse(msg);
    setThinkingSteps(mock.steps);
    setIsThinking(true);
  }, [inputValue, isThinking, activeThreadId, updateThread]);

  const handleThinkingDone = useCallback(() => {
    setIsThinking(false);
    setThinkingSteps([]);
    const mock = getMockResponse(
      activeThread?.messages.findLast?.((m) => m.role === 'user')?.text ?? ''
    );
    const aiMsg = { id: `m_${Date.now()}`, role: 'ai', text: mock.answer };
    updateThread(activeThreadId, (t) => ({ ...t, messages: [...t.messages, aiMsg] }));
  }, [activeThread, activeThreadId, updateThread]);

  const handleNewThread = () => {
    const thread = newThread(campaign);
    const updated = [thread, ...threads];
    saveThreads(updated);
    setThreads(updated);
    setActiveThreadId(thread.id);
    textareaRef.current?.focus();
  };

  const handleDeleteThread = (threadId) => setDeleteTarget(threadId);

  const confirmDelete = () => {
    const updated = threads.filter((t) => t.id !== deleteTarget);
    saveThreads(updated);
    setThreads(updated);
    if (activeThreadId === deleteTarget) {
      setActiveThreadId(updated[0]?.id ?? null);
      if (updated.length === 0) onClose();
    }
    setDeleteTarget(null);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  if (!open) return null;

  const adTypeBadgeColor = campaign?.adType?.includes('Display') ? '#0ea5e9'
    : campaign?.adType?.includes('Offsite') ? '#8b5cf6'
    : campaign?.adType?.includes('In-Store') ? '#f59e0b'
    : ACCENT;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.18)' }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="AI Campaign Debugger"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 400,
          width: 560, display: 'flex', flexDirection: 'column',
          background: BG, borderLeft: `1px solid ${BORDER}`,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
          fontFamily: FONT, animation: 'ai-slide-in 0.22s ease-out',
        }}
      >
        {/* CSS for animations */}
        <style>{`
          @keyframes ai-slide-in { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes ai-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>

        {/* Context strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: VI_BG, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
          <SparklesIcon size={14} color={VI} />
          <span style={{ fontSize: 13, fontWeight: 600, color: VI, fontFamily: FONT }}>Sofie</span>
          <div style={{ width: 1, height: 14, background: BORDER }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: TEXT, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {campaign?.name ?? 'Campaign'}
          </span>
          {campaign?.status && (
            <StatusPill status={campaign.status} />
          )}
          {campaign?.adType && (
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: `${adTypeBadgeColor}18`, color: adTypeBadgeColor, fontWeight: 500 }}>
              {campaign.adType}
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Close AI Debugger"
            style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4, marginLeft: 4, flexShrink: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = BG_MUTED)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <CloseIcon size={14} color={TEXT_MID} />
          </button>
        </div>

        {/* Body: sidebar + chat */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Thread sidebar */}
          <ThreadSidebar
            threads={threads}
            activeId={activeThreadId}
            onSelect={setActiveThreadId}
            onNew={handleNewThread}
            onDelete={handleDeleteThread}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((v) => !v)}
          />

          {/* Chat area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Messages */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Campaign debugger conversation"
              style={{ flex: 1, overflowY: 'auto', padding: 20 }}
            >
              {/* Welcome / suggested prompts — shown when no messages */}
              {activeThread && activeThread.messages.length === 0 && !isThinking && (
                <SuggestedPrompts campaign={campaign} onSelect={handleSend} />
              )}

              {/* Messages */}
              {activeThread?.messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Thinking animation */}
              {isThinking && (
                <ThinkingSteps steps={thinkingSteps} onDone={handleThinkingDone} />
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input zone */}
            <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 8,
                border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 8px 8px 14px',
                background: BG, transition: 'border-color 0.15s',
              }}
                onFocusCapture={(e) => (e.currentTarget.style.borderColor = VI)}
                onBlurCapture={(e) => (e.currentTarget.style.borderColor = BORDER)}
              >
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about this campaign…"
                  aria-label="Ask a question about this campaign"
                  disabled={isThinking}
                  rows={1}
                  style={{
                    flex: 1, border: 'none', outline: 'none', resize: 'none',
                    fontSize: 13, color: TEXT, background: 'transparent', fontFamily: FONT,
                    lineHeight: 1.5, maxHeight: 100, overflowY: 'auto',
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                  }}
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isThinking}
                  title="Send (⌘ Enter)"
                  aria-label="Send message"
                  style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', borderRadius: 7, cursor: inputValue.trim() && !isThinking ? 'pointer' : 'default',
                    background: inputValue.trim() && !isThinking ? VI : BORDER,
                    transition: 'all 0.15s', flexShrink: 0,
                  }}
                >
                  <SendIcon size={14} color="#fff" />
                </button>
              </div>
              <p style={{ margin: '5px 0 0', fontSize: 11, color: TEXT_SUB, textAlign: 'right', fontFamily: FONT }}>
                ⌘ Enter to send · Esc to close
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteTarget && <DeleteConfirm onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}
    </>
  );
}

// ── StatusPill ────────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const colors = {
    ACTIVE: { dot: 'var(--osmos-brand-green)', text: 'var(--osmos-brand-green)', bg: 'var(--osmos-brand-green-muted)' },
    PAUSED: { dot: '#EF4444',                  text: '#EF4444',                  bg: 'rgba(239,68,68,0.10)' },
    DRAFT:  { dot: TEXT_MID,                   text: TEXT_MID,                   bg: BG_SUBTLE },
  };
  const c = colors[status] || colors.DRAFT;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 999, background: c.bg, fontSize: 11, fontWeight: 500, color: c.text }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}
