import { useState, useEffect } from 'react';
import {
  Icon,
  ChevronDownIcon, ChevronRightIcon,
  CalendarIcon, RefreshIcon,
  ThemeDropdown, GlobalSearch,
} from '../../ui';
import { AISuggestionsPanel } from './ai-suggestions-panel';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT       = "'Open Sans', sans-serif";
const BG         = 'var(--osmos-bg)';
const BG_SUBTLE  = 'var(--osmos-bg-subtle)';
const BORDER     = 'var(--osmos-border)';
const TEXT       = 'var(--osmos-fg)';
const TEXT_MID   = 'var(--osmos-fg-muted)';
const ACCENT     = 'var(--osmos-brand-primary)';
const AI_COLOR   = '#8b5cf6';   // violet — no osmos token yet
const AI_BG      = 'var(--osmos-brand-violet-muted)';
const ERROR      = 'var(--alert-error-primary)';   // intentional — wallet/error states
const WARN_BG    = 'var(--osmos-brand-amber-muted)';

// ── Hand-rolled icons (Lucide paths) ─────────────────────────────────────────
const SparklesIcon = ({ size = 16, color = AI_COLOR }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const UsersNavIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const BellIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);

// ── IconButton ────────────────────────────────────────────────────────────────
function IconButton({ icon, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${BORDER}`, borderRadius: 8,
        background: hover ? BG_SUBTLE : 'transparent',
        color: TEXT_MID, cursor: 'pointer',
        transition: 'all 0.15s', fontFamily: FONT,
      }}
    >
      {icon}
    </button>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
export function Header({ activeAdType = 'Product Ads' }) {
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 30,
        backgroundColor: BG,
        fontFamily: FONT,
      }}>
        {/* Left — advertiser picker + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Advertiser selector pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            border: `1px solid ${BORDER}`, borderRadius: 8,
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>
              Whitakers (Whitakers)
            </span>
            <ChevronDownIcon size={16} color={TEXT_MID} />
          </div>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} aria-label="Breadcrumb">
            <a
              href="/home"
              style={{
                fontSize: 12, color: TEXT_MID, lineHeight: 1.5,
                textDecoration: 'none', letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Home
            </a>
            <ChevronRightIcon size={12} color={BORDER} />
            <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, letterSpacing: '0.02em', lineHeight: 1.5 }}>
              {activeAdType}
            </span>
          </nav>
        </div>

        {/* Right — action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Global search — shared molecule */}
          <GlobalSearch />

          {/* Theme switcher — shared molecule */}
          <ThemeDropdown />

          <IconButton icon={<UsersNavIcon size={14} color={TEXT_MID} />} />
          <IconButton icon={<BellIcon size={14} color={TEXT_MID} />} />

          {/* AI suggestions button */}
          <button
            onClick={() => setShowAISuggestions(true)}
            style={{
              position: 'relative',
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${AI_COLOR}`,
              borderRadius: 8,
              background: AI_BG, color: AI_COLOR,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <SparklesIcon size={16} color={AI_COLOR} />
            {/* notification dot */}
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 10, height: 10, borderRadius: '50%',
              backgroundColor: ERROR,
              border: `2px solid ${BG}`,
            }} />
          </button>

          {/* Wallet balance */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px',
            border: `1px solid ${BORDER}`, borderRadius: 8,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: WARN_BG, fontSize: 14,
            }}>
              💰
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: ERROR }}>
              ₹ 19,56,95,967.02
            </span>
          </div>

          <IconButton icon={<RefreshIcon size={14} color={TEXT_MID} />} />

          {/* Date range */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', marginLeft: 8,
            border: `1px solid ${BORDER}`, borderRadius: 8,
          }}>
            <CalendarIcon size={14} color={ERROR} />
            <span style={{ fontSize: 13, color: TEXT }}>02 Dec 25 - 08 Dec 25</span>
          </div>
        </div>
      </div>

      {/* ── AI suggestions panel ─────────────────────────────────────────── */}
      <AISuggestionsPanel
        open={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
      />

    </>
  );
}
