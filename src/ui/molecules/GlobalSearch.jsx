import { useState, useEffect } from 'react';
import { SearchIcon } from '../atoms/Icon';

const FONT = "'Open Sans', sans-serif";

// ── GlobalSearch ──────────────────────────────────────────────────────────────
// Self-contained: renders the trigger button + full-screen search overlay.
// Drop <GlobalSearch /> anywhere in a header row — no parent state needed.
// Keyboard: press "/" to open, "Escape" to close.
export function GlobalSearch() {
  const [open, setOpen] = useState(false);

  // "/" shortcut + Escape
  useEffect(() => {
    const handler = (e) => {
      // "/" to open — skip if focus is inside a text field
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !open) {
        const t = e.target;
        if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        title="Search (Press /)"
        aria-label="Search (Press /)"
        onClick={() => setOpen(true)}
        style={{
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--osmos-bg)',
          border: '1px solid var(--osmos-border)',
          borderRadius: 6, cursor: 'pointer',
          color: 'var(--osmos-fg-muted)', flexShrink: 0,
          transition: 'background 0.12s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--osmos-bg-muted)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--osmos-bg)')}
      >
        <SearchIcon size={14} color="var(--osmos-fg-muted)" />
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 80,
            background: 'rgba(0,0,0,0.45)',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              width: '100%', maxWidth: 672,
              borderRadius: 10,
              background: 'var(--osmos-bg)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              fontFamily: FONT,
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderBottom: '1px solid var(--osmos-border)',
            }}>
              <SearchIcon size={18} color="var(--osmos-fg-muted)" />
              <input
                type="text"
                placeholder="Search pages, campaigns, advertisers…"
                autoFocus
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 14, color: 'var(--osmos-fg)',
                  background: 'transparent', fontFamily: FONT,
                }}
              />
              <kbd style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px 8px', fontSize: 11,
                color: 'var(--osmos-fg-muted)',
                background: 'var(--osmos-bg-subtle)',
                border: '1px solid var(--osmos-border)',
                borderRadius: 4, fontFamily: FONT,
                cursor: 'pointer',
              }}
                onClick={() => setOpen(false)}
              >
                ESC
              </kbd>
            </div>

            {/* Placeholder body */}
            <div style={{ padding: 24, maxHeight: 360, overflowY: 'auto' }}>
              <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', textAlign: 'center', margin: 0, paddingTop: 24, paddingBottom: 24 }}>
                Start typing to search across pages, campaigns, and advertisers…
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
