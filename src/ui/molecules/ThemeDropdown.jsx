import { useState, useEffect } from 'react';
import { Icon, CheckIcon } from '../atoms/Icon';

const FONT   = "'Open Sans', sans-serif";
const ACCENT = 'var(--osmos-brand-primary)';

// ── Hand-rolled theme icons ───────────────────────────────────────────────────
const SunIcon = ({ size = 14, color = 'var(--osmos-fg-muted)' }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/><path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/><path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </Icon>
);

const MoonIcon = ({ size = 14, color = 'var(--osmos-fg-muted)' }) => (
  <Icon size={size} color={color}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </Icon>
);

const MonitorIcon = ({ size = 14, color = 'var(--osmos-fg-muted)' }) => (
  <Icon size={size} color={color}>
    <rect width="20" height="14" x="2" y="3" rx="2"/>
    <path d="M8 21h8"/><path d="M12 17v4"/>
  </Icon>
);

// Restore persisted theme on initial load (runs once at module evaluation)
(function initTheme() {
  try {
    const saved = localStorage.getItem('osmos-theme') || 'light';
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (saved === 'system' && prefersDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } catch (_) { /* localStorage unavailable */ }
})();

const THEME_OPTIONS = [
  { value: 'light',  IconComp: SunIcon,     label: 'Light'  },
  { value: 'dark',   IconComp: MoonIcon,    label: 'Dark'   },
  { value: 'system', IconComp: MonitorIcon, label: 'System' },
];

// ── ThemeDropdown ─────────────────────────────────────────────────────────────
// Self-contained: renders the trigger button + dropdown menu.
// Drop <ThemeDropdown /> anywhere in a header row — no parent state needed.
export function ThemeDropdown() {
  const [open,  setOpen]  = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('osmos-theme') || 'light');

  // Click-outside closes dropdown
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!e.target.closest('[data-theme-dropdown]')) setOpen(false);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [open]);

  // Escape closes dropdown
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const CurrentIcon = theme === 'dark' ? MoonIcon : theme === 'system' ? MonitorIcon : SunIcon;

  // Apply [data-theme] to <html> so figma-tokens.css dark-mode overrides kick in
  const applyTheme = (value) => {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const isDark = value === 'dark' || (value === 'system' && prefersDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('osmos-theme', value);
  };

  return (
    <div style={{ position: 'relative', flexShrink: 0 }} data-theme-dropdown>
      {/* Trigger button — matches the standard TopBar IconBtn style */}
      <button
        title="Theme"
        aria-label="Change theme"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        style={{
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'var(--osmos-bg-muted)' : 'var(--osmos-bg)',
          border: `1px solid ${open ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
          borderRadius: 6, cursor: 'pointer',
          color: 'var(--osmos-fg-muted)',
          transition: 'background 0.12s, border-color 0.12s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'var(--osmos-bg-muted)'; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'var(--osmos-bg)'; }}
      >
        <CurrentIcon size={14} color="var(--osmos-fg-muted)" />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)',
          width: 160,
          background: 'var(--osmos-bg)',
          border: '1px solid var(--osmos-border)',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          zIndex: 50,
          fontFamily: FONT,
        }}>
          <div style={{ padding: '4px 0' }}>
            {THEME_OPTIONS.map(({ value, IconComp, label }) => (
              <button
                key={value}
                onClick={() => { setTheme(value); applyTheme(value); setOpen(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  fontFamily: FONT, fontSize: 13, color: 'var(--osmos-fg)',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--osmos-bg-subtle)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <IconComp size={15} color="var(--osmos-fg-muted)" />
                <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
                {theme === value && <CheckIcon size={13} color={ACCENT} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
