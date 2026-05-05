import { useState } from 'react';
import { Icon, ChevronRightIcon } from '../../ui';

// ── Tokens ────────────────────────────────────────────────────────────────────
const FONT   = "'Open Sans', sans-serif";
const BG     = 'var(--osmos-bg)';
const BG_S   = 'var(--osmos-bg-subtle)';
const BORDER = 'var(--osmos-border)';
const TEXT   = 'var(--osmos-fg)';
const MID    = 'var(--osmos-fg-muted)';
const VI     = 'var(--osmos-brand-violet)';
const VI_IC  = '#8b5cf6';
const VI_HV  = 'var(--osmos-brand-violet-hover)';
const ERR    = '#EF4444';
const ERR_BG = 'rgba(239,68,68,0.06)';
const ERR_BD = 'rgba(239,68,68,0.15)';

const GRAD = `linear-gradient(135deg, var(--osmos-brand-violet) 0%, #8b5cf6 50%, #5b21b6 100%)`;

// ── Responsive width based on viewport ───────────────────────────────────────
function panelWidth(vw) {
  if (vw >= 1400) return 360;
  if (vw >= 1200) return 320;
  if (vw >= 1024) return 290;
  return 260;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = ({ size = 15, color = '#fff' }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const AlertIcon = ({ size = 14, color = ERR }) => (
  <Icon size={size} color={color}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" /><path d="M12 17h.01" />
  </Icon>
);

const LayoutGridIcon = ({ size = 15, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Icon>
);

const ListIcon = ({ size = 15, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { id: '1', title: 'Increase Daily Budget',                               campaigns: 6, critical: true  },
  { id: '2', title: 'Add New Keywords To Campaigns (Product Display Ads)',  campaigns: 6, critical: false },
  { id: '3', title: 'Add New Keywords To Campaigns',                        campaigns: 6, critical: false },
  { id: '4', title: 'Increase Bids for Higher Reach',                       campaigns: 5, critical: false },
  { id: '5', title: "Increase Campaign's Total Budget Cap",                  campaigns: 6, critical: false },
];
const TOTAL    = 55;
const CRITICAL = 6;

// ── SofieInlinePanel ──────────────────────────────────────────────────────────
export function SofieInlinePanel({ windowWidth = 1440, chartHeight = null, onViewAll }) {
  const [open,     setOpen]     = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const expandedW = panelWidth(windowWidth);

  return (
    <div style={{
      width: open ? expandedW : 44,
      // Height locked to chart — never taller, never shorter
      height: chartHeight ? chartHeight : undefined,
      alignSelf: chartHeight ? undefined : 'stretch',
      flexShrink: 0,
      transition: 'width 0.22s ease',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 10,
      border: `1px solid ${BORDER}`,
      fontFamily: FONT,
      background: open ? BG : 'transparent',
      boxShadow: open ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
    }}>
      {open
        ? <ExpandedPanel
            onClose={() => setOpen(false)}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onViewAll={onViewAll}
          />
        : <CollapsedStrip onOpen={() => setOpen(true)} />
      }
    </div>
  );
}

// ── Collapsed strip ───────────────────────────────────────────────────────────
function CollapsedStrip({ onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 44, height: '100%', minHeight: 200,
        background: hover ? VI_HV : GRAD,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 18, paddingBottom: 18,
        cursor: 'pointer', transition: 'background 0.15s',
        userSelect: 'none', borderRadius: 10,
      }}
    >
      <SparklesIcon size={17} color="rgba(255,255,255,0.9)" />
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        fontSize: 12, fontWeight: 600, color: '#fff',
        letterSpacing: '0.04em', whiteSpace: 'nowrap',
        padding: '12px 0',
      }}>
        {TOTAL} Suggestions by Sofie ({CRITICAL} Critical)
      </div>
      <div style={{
        width: 24, height: 24, borderRadius: 6,
        background: 'rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ChevronRightIcon size={13} color="#fff" />
      </div>
    </div>
  );
}

// ── Expanded panel ────────────────────────────────────────────────────────────
function ExpandedPanel({ onClose, viewMode, setViewMode, onViewAll }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: BG, borderRadius: 10, overflow: 'hidden' }}>

      {/* ── Gradient header ── */}
      <div style={{ background: GRAD, padding: '12px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Chevron — collapses the panel */}
          <button
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: 24, height: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: 5, cursor: 'pointer', transition: 'background 0.13s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          >
            <Icon size={12} color="#fff">
              <polyline points="9 18 15 12 9 6" />
            </Icon>
          </button>

          <SparklesIcon size={15} color="#fff" />

          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3, flex: 1 }}>
            {TOTAL} Suggestions by Sofie ({CRITICAL} Critical)
          </span>
        </div>
      </div>

      {/* ── View mode toggle row ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 12px',
        borderBottom: `1px solid ${BORDER}`,
        background: BG, flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', gap: 2,
          background: BG_S, borderRadius: 6, padding: 3,
          border: `1px solid ${BORDER}`,
        }}>
          {[['list', <ListIcon key="l" />], ['card', <LayoutGridIcon key="g" />]].map(([mode, ic]) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: viewMode === mode ? BG : 'transparent',
                border: viewMode === mode ? `1px solid ${BORDER}` : '1px solid transparent',
                borderRadius: 4, cursor: 'pointer', transition: 'all 0.13s',
                color: viewMode === mode ? VI_IC : MID,
              }}
            >
              {ic}
            </button>
          ))}
        </div>
      </div>

      {/* ── Suggestions list — scrolls within the remaining height ── */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {SUGGESTIONS.map((s, i) => (
          <SuggestionRow
            key={s.id}
            suggestion={s}
            isLast={i === SUGGESTIONS.length - 1}
          />
        ))}
      </div>

      {/* ── View all link ── */}
      <div style={{
        padding: '10px 14px',
        borderTop: `1px solid ${BORDER}`,
        background: BG, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <button
          onClick={onViewAll}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, color: VI_IC,
            padding: 0, transition: 'color 0.13s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = VI_HV)}
          onMouseLeave={(e) => (e.currentTarget.style.color = VI_IC)}
        >
          View All
        </button>
      </div>
    </div>
  );
}

// ── SuggestionRow ─────────────────────────────────────────────────────────────
function SuggestionRow({ suggestion, isLast }) {
  const [hover, setHover] = useState(false);
  const isCrit = suggestion.critical;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 14px',
        borderBottom: isLast ? 'none' : `1px solid ${isCrit ? ERR_BD : BORDER}`,
        background: isCrit
          ? hover ? 'rgba(239,68,68,0.09)' : ERR_BG
          : hover ? BG_S : BG,
        cursor: 'pointer', transition: 'background 0.13s',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: TEXT,
          lineHeight: 1.4, marginBottom: 2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {suggestion.title}
        </div>
        <div style={{ fontSize: 12, color: MID }}>
          in {suggestion.campaigns} campaigns
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        {isCrit && <AlertIcon size={14} color={ERR} />}
        <ChevronRightIcon size={14} color={MID} />
      </div>
    </div>
  );
}
