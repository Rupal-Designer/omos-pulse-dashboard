import { useState, useEffect } from 'react';
import {
  Icon,
  SearchIcon, ChevronDownIcon, ChevronRightIcon,
  CalendarIcon, CheckIcon, RefreshIcon,
} from '../../ui';
import { AISuggestionsPanel } from './ai-suggestions-panel';

// ── Theme stub (no next-themes in Vite) ──────────────────────────────────────
const useTheme = () => ({ theme: 'light', setTheme: () => {}, resolvedTheme: 'light' });

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT       = "'Open Sans', sans-serif";
const BG         = 'var(--osmos-bg)';
const BG_SUBTLE  = 'var(--osmos-bg-subtle)';
const BORDER     = 'var(--osmos-border)';
const TEXT       = 'var(--osmos-fg)';
const TEXT_MID   = 'var(--osmos-fg-muted)';
const ACCENT     = 'var(--osmos-brand-primary)';
const AI_COLOR   = '#8b5cf6';   // violet — no osmos token yet
const AI_BG      = 'rgba(139,92,246,0.12)';
const ERROR      = '#EF4444';   // intentional — wallet/error states
const WARN_BG    = 'rgba(245,166,35,0.12)';

// ── Hand-rolled icons (Lucide paths) ─────────────────────────────────────────
const SparklesIcon = ({ size = 16, color = AI_COLOR }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const SunIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" /><path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </Icon>
);

const MoonIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </Icon>
);

const MonitorIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <path d="M8 21h8" /><path d="M12 17v4" />
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

// ── Theme dropdown data ───────────────────────────────────────────────────────
const THEME_OPTIONS = [
  { value: 'light',  IconComp: SunIcon,     label: 'Light' },
  { value: 'dark',   IconComp: MoonIcon,    label: 'Dark' },
  { value: 'system', IconComp: MonitorIcon, label: 'System' },
];

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
  const [showAISuggestions, setShowAISuggestions]   = useState(false);
  const [showGlobalSearch, setShowGlobalSearch]     = useState(false);
  const [showThemeDropdown, setShowThemeDropdown]   = useState(false);
  const { theme, setTheme, resolvedTheme }          = useTheme();
  const [mounted, setMounted]                       = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Keyboard shortcuts: "/" to open search, Escape to close overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        const t = e.target;
        if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
        e.preventDefault();
        setShowGlobalSearch(true);
      }
      if (e.key === 'Escape') {
        if (showGlobalSearch) setShowGlobalSearch(false);
        if (showThemeDropdown) setShowThemeDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGlobalSearch, showThemeDropdown]);

  // Click-outside to close theme dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showThemeDropdown && !e.target.closest('[data-theme-dropdown]')) {
        setShowThemeDropdown(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showThemeDropdown]);

  const getThemeIcon = () => {
    if (!mounted)                  return <SunIcon size={14} />;
    if (theme === 'system')        return <MonitorIcon size={14} />;
    if (resolvedTheme === 'dark')  return <MoonIcon size={14} />;
    return <SunIcon size={14} />;
  };

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
          {/* Global search */}
          <IconButton
            icon={<SearchIcon size={14} color={TEXT_MID} />}
            onClick={() => setShowGlobalSearch(true)}
          />

          {/* Theme switcher */}
          <div style={{ position: 'relative' }} data-theme-dropdown>
            <button
              onClick={(e) => { e.stopPropagation(); setShowThemeDropdown(!showThemeDropdown); }}
              style={{
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${BORDER}`, borderRadius: 8,
                background: 'transparent', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_SUBTLE)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {getThemeIcon()}
            </button>

            {showThemeDropdown && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                width: 160, border: `1px solid ${BORDER}`, borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                backgroundColor: BG, overflow: 'hidden', zIndex: 50,
              }}>
                <div style={{ padding: '4px 0' }}>
                  {THEME_OPTIONS.map(({ value, IconComp, label }) => (
                    <button
                      key={value}
                      onClick={() => { setTheme(value); setShowThemeDropdown(false); }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                        padding: '8px 12px', border: 'none', background: 'transparent',
                        cursor: 'pointer', color: TEXT, fontSize: 13, fontFamily: FONT,
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_SUBTLE)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <IconComp size={16} color={TEXT_MID} />
                      <span>{label}</span>
                      {theme === value && (
                        <span style={{ marginLeft: 'auto' }}>
                          <CheckIcon size={14} color={ACCENT} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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

      {/* ── Global search modal ──────────────────────────────────────────── */}
      {showGlobalSearch && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 80,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onClick={() => setShowGlobalSearch(false)}
        >
          <div
            style={{
              width: '100%', maxWidth: 672,
              borderRadius: 8,
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              backgroundColor: BG,
              fontFamily: FONT,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16, borderBottom: `1px solid ${BORDER}`,
            }}>
              <SearchIcon size={20} color={TEXT_MID} />
              <input
                type="text"
                placeholder="Search campaigns, ad groups, products... (Press / to focus)"
                autoFocus
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 13, color: TEXT, background: 'transparent',
                  fontFamily: FONT,
                }}
              />
              <kbd style={{
                padding: '4px 8px', fontSize: 11,
                color: TEXT_MID, backgroundColor: BG_SUBTLE,
                border: `1px solid ${BORDER}`, borderRadius: 4,
              }}>
                ESC
              </kbd>
            </div>

            {/* Empty state */}
            <div style={{ padding: 16, maxHeight: 384, overflowY: 'auto' }}>
              <div style={{ fontSize: 13, textAlign: 'center', padding: '32px 0', color: TEXT_MID }}>
                Start typing to search across campaigns, ad groups, and products...
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
