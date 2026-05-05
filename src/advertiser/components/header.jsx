import { useState } from 'react';
import {
  Icon,
  ChevronDownIcon,
  CalendarIcon, RefreshIcon,
  ThemeDropdown, GlobalSearch,
} from '../../ui';
import { AISuggestionsPanel } from './ai-suggestions-panel';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const ACCENT    = 'var(--osmos-brand-primary)';
const AI_COLOR  = '#8b5cf6';
const AI_BG     = 'var(--osmos-brand-violet-muted)';
const ERROR     = 'var(--alert-error-primary)';
const WARN_BG   = 'var(--osmos-brand-amber-muted)';
const AMBER     = '#F5A623';

// ── Ad-type icon paths (Lucide SVG, same as sidebar) ─────────────────────────
const AD_TYPE_ICONS = {
  'Product Ads': (
    <>
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </>
  ),
  'Display Ads': (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </>
  ),
  'Sponsorship Ads': (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  'Offsite Ads': (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="m10 8 6 4-6 4V8z" />
      <path d="M12 17v4" /><path d="M8 21h8" />
    </>
  ),
  'In-Store Digital Ads': (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
};

const AD_TYPES = Object.keys(AD_TYPE_ICONS);

// ── Reusable primitives ───────────────────────────────────────────────────────
function VDivider() {
  return (
    <div style={{
      width: 1, height: 24, flexShrink: 0,
      background: BORDER, margin: '0 4px',
    }} />
  );
}

function FlatIconBtn({ children, onClick, active = false, accent = false }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: accent
          ? AI_BG
          : hover || active ? BG_SUBTLE : 'transparent',
        border: accent ? `1px solid ${AI_COLOR}` : '1px solid transparent',
        borderRadius: 8, cursor: 'pointer',
        transition: 'background 0.13s, border-color 0.13s',
        position: 'relative',
      }}
    >
      {children}
    </button>
  );
}

// ── Sparkles icon ─────────────────────────────────────────────────────────────
const SparklesIcon = ({ size = 15 }) => (
  <Icon size={size} color={AI_COLOR}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const UsersIcon = ({ size = 15 }) => (
  <Icon size={size} color={TEXT_MID}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const BellIcon = ({ size = 15 }) => (
  <Icon size={size} color={TEXT_MID}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);

const WalletIcon = ({ size = 15 }) => (
  <Icon size={size} color={AMBER}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </Icon>
);

// ── AdTypeDropdown ────────────────────────────────────────────────────────────
function AdTypeDropdown({ activeAdType, onAdTypeChange }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const icon = AD_TYPE_ICONS[activeAdType] ?? AD_TYPE_ICONS['Product Ads'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
      {/* Ad-type icon badge */}
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: BG_SUBTLE,
        border: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={16} color={TEXT_MID}>{icon}</Icon>
      </div>

      {/* Two-line label + dropdown trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          background: hover || open ? BG_SUBTLE : 'transparent',
          border: 'none', padding: '4px 6px', borderRadius: 6,
          cursor: 'pointer', transition: 'background 0.12s',
        }}
      >
        <span style={{ fontSize: 11, color: TEXT_MID, fontWeight: 400, lineHeight: 1.3, letterSpacing: '0.02em' }}>
          Campaigns
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.4 }}>
            {activeAdType}
          </span>
          <ChevronDownIcon
            size={12}
            color={TEXT_MID}
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
          />
        </div>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0,
            background: BG, border: `1px solid ${BORDER}`,
            borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            zIndex: 100, minWidth: 200, padding: '4px 0', overflow: 'hidden',
          }}>
            {AD_TYPES.map(type => (
              <AdTypeOption
                key={type}
                label={type}
                icon={AD_TYPE_ICONS[type]}
                active={type === activeAdType}
                onClick={() => { onAdTypeChange?.(type); setOpen(false); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function AdTypeOption({ label, icon, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%', padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        background: hover ? BG_SUBTLE : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s',
      }}
    >
      <Icon size={15} color={active ? ACCENT : TEXT_MID}>{icon}</Icon>
      <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? TEXT : TEXT_MID }}>
        {label}
      </span>
      {active && (
        <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
      )}
    </button>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
export function Header({ activeAdType = 'Product Ads', onAdTypeChange }) {
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  return (
    <>
      <div style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: '0 20px',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        backgroundColor: BG,
        fontFamily: FONT,
        gap: 12,
      }}>

        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
          {/* Advertiser selector */}
          <AdvertiserSelector />

          <VDivider />

          {/* Ad-type section header with dropdown */}
          <div style={{ paddingLeft: 12 }}>
            <AdTypeDropdown activeAdType={activeAdType} onAdTypeChange={onAdTypeChange} />
          </div>
        </div>

        {/* ── Right ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>

          {/* Group 1: theme + search */}
          <ThemeDropdown />
          <GlobalSearch />

          <VDivider />

          {/* Group 2: users + AI + bell */}
          <FlatIconBtn>
            <UsersIcon size={15} />
          </FlatIconBtn>

          <FlatIconBtn accent onClick={() => setShowAISuggestions(true)}>
            <SparklesIcon size={15} />
            <span style={{
              position: 'absolute', top: -3, right: -3,
              width: 9, height: 9, borderRadius: '50%',
              backgroundColor: ERROR, border: `2px solid ${BG}`,
            }} />
          </FlatIconBtn>

          <FlatIconBtn>
            <BellIcon size={15} />
          </FlatIconBtn>

          <VDivider />

          {/* Group 3: wallet + refresh */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px',
            background: BG_SUBTLE,
            border: `1px solid ${BORDER}`, borderRadius: 8,
            flexShrink: 0,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: WARN_BG,
            }}>
              <WalletIcon size={13} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: ERROR, whiteSpace: 'nowrap' }}>
              ₹ 5,66,52,206.32
            </span>
          </div>

          <FlatIconBtn>
            <RefreshIcon size={15} color={TEXT_MID} />
          </FlatIconBtn>

          <VDivider />

          {/* Group 4: date range */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 12px',
            background: BG_SUBTLE,
            border: `1px solid ${BORDER}`, borderRadius: 8,
            cursor: 'pointer', flexShrink: 0,
          }}>
            <CalendarIcon size={14} color={ACCENT} />
            <span style={{ fontSize: 13, color: TEXT, whiteSpace: 'nowrap' }}>
              27 Apr 26 – 03 May 26
            </span>
          </div>

        </div>
      </div>

      <AISuggestionsPanel
        open={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
      />
    </>
  );
}

// ── AdvertiserSelector ────────────────────────────────────────────────────────
function AdvertiserSelector() {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: hover ? BG_SUBTLE : 'transparent',
        border: 'none', borderRadius: 6,
        padding: '6px 8px', cursor: 'pointer',
        transition: 'background 0.12s', flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Test Seller 11</span>
      <ChevronDownIcon size={14} color={TEXT_MID} />
    </button>
  );
}
