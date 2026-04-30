import React, { useState, useRef, useEffect } from 'react';
import { ThemeDropdown, GlobalSearch } from '../../ui';

const SEGMENTS = [
  { name: 'test',                                    count: 0   },
  { name: 'sam',                                     count: 1   },
  { name: 'sam',                                     count: 1   },
  { name: 'sam',                                     count: 1   },
  { name: 'pendo sync test name changes',            count: 81  },
  { name: 'mera naam',                               count: 0   },
  { name: 'TestQA643',                               count: 286 },
  { name: 'TestQA622',                               count: 286 },
  { name: 'Test Sync Cloud',                         count: 86  },
  { name: 'NewSegmentforTestCampaigns',              count: 22  },
  { name: 'New Segment',                             count: 264 },
  { name: 'EmptySegment',                            count: 0   },
  { name: 'Copy of test',                            count: 0   },
  { name: 'Copy of test',                            count: 0   },
  { name: 'Copy of TestQA643',                       count: 286 },
  { name: 'Copy of TestQA622',                       count: 286 },
  { name: 'Copy of NewSegmentforTestCampaigns…',    count: 22  },
  { name: 'Copy of EmptySegment',                    count: 0   },
  { name: 'All Brands',                              count: 12  },
  { name: 'All Brands',                              count: 12  },
  { name: 'All Advertisers',                         count: 273 },
  { name: 'Ajiogram',                                count: 0   },
];

function IconBtn({ children, title }) {
  return (
    <button title={title} aria-label={title} style={{
      width: 32, height: 32,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)', flexShrink: 0,
      transition: 'background 0.12s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-muted)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--osmos-bg)'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

function AllMerchantsDropdown({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = SEGMENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          height: 30, padding: '0 10px', minWidth: 130,
          display: 'flex', alignItems: 'center', gap: 5,
          background: open ? 'var(--osmos-bg-muted)' : 'var(--osmos-bg)',
          border: `1px solid ${open ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
          borderRadius: 6, cursor: 'pointer', fontSize: 11, color: 'var(--osmos-fg)',
          fontFamily: "'Open Sans', sans-serif",
          outline: open ? `2px solid var(--osmos-brand-primary-muted)` : 'none',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="var(--osmos-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? selected.name : 'All Merchants'}
        </span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="var(--osmos-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          width: 280, background: '#fff',
          border: '1px solid var(--osmos-border)', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 1000,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--osmos-border)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--osmos-bg-subtle)', borderRadius: 5,
              padding: '5px 8px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search segments…"
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 11, color: 'var(--osmos-fg)', width: '100%',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Segment list */}
          <div style={{ maxHeight: 260, overflowY: 'auto' }}>
            {/* All Merchants option */}
            <button
              onClick={() => { setSelected(null); setOpen(false); }}
              style={{
                width: '100%', textAlign: 'left', padding: '8px 12px',
                background: !selected ? 'var(--osmos-brand-primary-muted)' : 'transparent',
                border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={e => { if (selected) e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
              onMouseLeave={e => { if (selected) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 12, color: !selected ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg)', fontWeight: !selected ? 600 : 400 }}>
                All Merchants
              </span>
            </button>

            {filtered.map((seg, i) => (
              <button key={i}
                onClick={() => { setSelected(seg); setOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '7px 12px',
                  background: selected === seg ? 'var(--osmos-brand-primary-muted)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: "'Open Sans', sans-serif",
                }}
                onMouseEnter={e => { if (selected !== seg) e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
                onMouseLeave={e => { if (selected !== seg) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 12, color: selected === seg ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg)', fontWeight: selected === seg ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                  {seg.name}
                </span>
                <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', flexShrink: 0, marginLeft: 8 }}>
                  {seg.count || '—'}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid var(--osmos-border)', padding: '8px 12px' }}>
            <button
              onClick={() => { setOpen(false); onNavigate?.('manage-segments'); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontSize: 12, fontWeight: 600, color: 'var(--osmos-brand-primary)',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              + Create Segment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function UserViewDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Osmos View');
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options = [
    {
      label: 'Osmos View',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <polyline points="16 11 18 13 22 9"/>
        </svg>
      ),
    },
    {
      label: 'View as Retailer',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        title="User View"
        aria-label="User View"
        onClick={() => setOpen(o => !o)}
        style={{
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'var(--osmos-bg-muted)' : 'var(--osmos-bg)',
          border: `1px solid ${open ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
          borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)', flexShrink: 0,
          transition: 'background 0.12s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <polyline points="16 11 18 13 22 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: '#fff', border: '1px solid var(--osmos-border)',
          borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 1000, overflow: 'hidden', minWidth: 180,
        }}>
          {options.map(opt => (
            <button
              key={opt.label}
              onClick={() => { setSelected(opt.label); setOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', border: 'none', cursor: 'pointer',
                background: selected === opt.label ? 'var(--osmos-bg-subtle)' : 'transparent',
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={e => { if (selected !== opt.label) e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
              onMouseLeave={e => { if (selected !== opt.label) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center' }}>{opt.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--osmos-fg)', fontWeight: selected === opt.label ? 500 : 400 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopBar({ section = 'Analytics', page = 'Dashboard', onNavigate }) {
  return (
    <header style={{
      height: 52,
      background: 'var(--osmos-bg)',
      borderBottom: '1px solid var(--osmos-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      gap: 12,
    }}>
      {/* Left: breadcrumb + title */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, overflow: 'hidden' }}>
        <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {section} &gt; {page}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {page}
        </div>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <ThemeDropdown />
        <GlobalSearch />
        <UserViewDropdown />
        <IconBtn title="Filter">
          <path d="M4 6h16M7 12h10M10 18h4"/>
        </IconBtn>
        <IconBtn title="Refresh">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </IconBtn>

        <div style={{ width: 1, height: 18, background: 'var(--osmos-border)' }} />

        <AllMerchantsDropdown onNavigate={onNavigate} />

        {/* Date range */}
        <button style={{
          height: 30, padding: '0 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
          borderRadius: 6, cursor: 'pointer', fontSize: 11, color: 'var(--osmos-fg)',
          fontFamily: "'Open Sans', sans-serif", flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          08 May 25 – 14 May 25
        </button>

      </div>
    </header>
  );
}
