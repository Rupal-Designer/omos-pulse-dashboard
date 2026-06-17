import { useState, useRef, useEffect, useCallback } from 'react';

// ── Mock data ─────────────────────────────────────────────────────────────────
const ACCOUNT_TREE = [
  {
    id: 'beiersdorf', label: 'Beiersdorf Global AG', type: 'Master Account',
    children: [
      { id: 'nivea',   label: 'Nivea',   type: 'Account' },
      { id: 'eucerin', label: 'Eucerin', type: 'Account' },
      { id: 'labello', label: 'Labello', type: 'Account' },
    ],
  },
  {
    id: 'boat', label: 'Boat Lifestyle', type: 'Master Account',
    children: [
      { id: 'boat-audio',     label: 'Boat Audio',     type: 'Account' },
      { id: 'boat-wearables', label: 'Boat Wearables', type: 'Account' },
    ],
  },
  {
    id: 'demo', label: 'Demo Account', type: 'Master Account',
    children: [
      { id: 'demo-sub1', label: 'Demo Sub 1', type: 'Account' },
      { id: 'demo-sub2', label: 'Demo Sub 2', type: 'Account' },
    ],
  },
  {
    id: 'hul', label: 'Hindustan Unilever OsmosX', type: 'Master Account',
    children: [
      { id: 'hul-dove', label: 'Dove',       type: 'Account' },
      { id: 'hul-surf', label: 'Surf Excel', type: 'Account' },
      { id: 'hul-lux',  label: 'Lux',        type: 'Account' },
    ],
  },
  {
    id: 'samsung', label: 'Samsung Electronics', type: 'Master Account',
    children: [
      { id: 'samsung-mobile', label: 'Samsung Mobile', type: 'Account' },
      { id: 'samsung-tv',     label: 'Samsung TV',     type: 'Account' },
    ],
  },
  {
    id: 'marico', label: 'Marico Limited', type: 'Master Account',
    children: [
      { id: 'marico-parachute', label: 'Parachute', type: 'Account' },
      { id: 'marico-saffola',   label: 'Saffola',   type: 'Account' },
    ],
  },
  {
    id: 'pepsico', label: 'PepsiCo India', type: 'Master Account',
    children: [
      { id: 'pepsi-lays',      label: 'Lays',      type: 'Account' },
      { id: 'pepsi-kurkure',   label: 'Kurkure',   type: 'Account' },
      { id: 'pepsi-tropicana', label: 'Tropicana', type: 'Account' },
    ],
  },
];

// Flat list for V2
const FLAT_LIST = ACCOUNT_TREE.flatMap(parent => [
  {
    id: parent.id, label: parent.label,
    path: parent.label, level: 'master',
    parentId: null, parentLabel: null,
    childCount: parent.children.length,
  },
  ...parent.children.map(c => ({
    id: c.id, label: c.label,
    path: `${parent.label} › ${c.label}`,
    level: 'account',
    parentId: parent.id, parentLabel: parent.label,
    childCount: 0,
  })),
]);

const TOTAL_MASTERS  = ACCOUNT_TREE.length;
const TOTAL_ACCOUNTS = ACCOUNT_TREE.reduce((s, p) => s + p.children.length, 0);

// ── Shared atoms ──────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PlusIcon({ color = '#2563eb' }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function DropChevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExpandChevron({ expanded }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.18s', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'block' }}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ── Hierarchy dot indicator ───────────────────────────────────────────────────
const DOT_COLORS = {
  master:  '#f59e0b',   // amber  — top-level
  account: '#8b5cf6',   // violet — child
};
function HierarchyDot({ level }) {
  return (
    <span style={{
      width: 8, height: 8, borderRadius: '50%',
      background: DOT_COLORS[level] || DOT_COLORS.account,
      flexShrink: 0, display: 'inline-block',
    }} />
  );
}

// ── rAF position sync ─────────────────────────────────────────────────────────
function useSyncedPosition(triggerRef, open) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const syncPos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left });
  }, [triggerRef]);

  useEffect(() => {
    if (!open) return;
    syncPos();
    let id;
    const loop = () => { syncPos(); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [open, syncPos]);

  return pos;
}

// ── Shared dropdown shell ─────────────────────────────────────────────────────
function useDropdown(triggerRef, dropRef, open, setOpen) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const onOut  = e => {
      if (!dropRef.current?.contains(e.target) && !triggerRef.current?.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOut);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOut); };
  }, [open, setOpen, triggerRef, dropRef]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT 1 — Accordion hierarchy, single selection, no tick/highlight
// ═══════════════════════════════════════════════════════════════════════════════
export function AccountSelector() {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState('boat');      // single ID
  const [expanded, setExpanded] = useState(new Set());
  const triggerRef = useRef(null);
  const searchRef  = useRef(null);
  const dropRef    = useRef(null);
  const pos        = useSyncedPosition(triggerRef, open);
  useDropdown(triggerRef, dropRef, open, setOpen);

  useEffect(() => { if (open) setTimeout(() => searchRef.current?.focus(), 50); }, [open]);

  // Auto-expand on search
  useEffect(() => {
    if (!query) return;
    const q = query.toLowerCase();
    setExpanded(prev => {
      const n = new Set(prev);
      ACCOUNT_TREE.forEach(p => {
        if (p.label.toLowerCase().includes(q) || p.children.some(c => c.label.toLowerCase().includes(q)))
          n.add(p.id);
      });
      return n;
    });
  }, [query]);

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const q        = query.toLowerCase();
  const filtered = ACCOUNT_TREE
    .map(p => ({ ...p, children: q ? p.children.filter(c => c.label.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)) : p.children }))
    .filter(p => !q || p.label.toLowerCase().includes(q) || p.children.length > 0);

  // Trigger label
  const allItems = ACCOUNT_TREE.flatMap(p => [p, ...p.children]);
  const selItem  = allItems.find(a => a.id === selected);
  const trigLabel = selItem ? selItem.label : 'Select Account';

  // Visible master/account counts from filtered result
  const filteredMasters  = filtered.length;
  const filteredAccounts = filtered.reduce((s, p) => s + p.children.length, 0);

  return (
    <>
      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox" aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
          border: `1.5px solid ${open ? '#2563eb' : 'var(--osmos-border, #e5e7eb)'}`,
          background: 'var(--osmos-bg, white)',
          boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.10)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: "'Open Sans', sans-serif",
          minWidth: 160, maxWidth: 260,
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: 500, flex: 1, textAlign: 'left',
          color: 'var(--osmos-fg, #111)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {trigLabel}
        </span>
        {selected && (
          <span
            onClick={e => { e.stopPropagation(); setSelected(null); }}
            role="button" aria-label="Clear"
            style={{ color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <XIcon size={12} />
          </span>
        )}
        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <DropChevron open={open} />
        </span>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          ref={dropRef}
          role="listbox"
          style={{
            position: 'fixed', top: pos.top, left: pos.left,
            width: 420, maxHeight: 440,
            background: 'var(--osmos-bg, white)',
            border: '1px solid var(--osmos-border, #e5e7eb)',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 9999, fontFamily: "'Open Sans', sans-serif",
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          {/* Search */}
          <div style={{
            padding: '10px 12px', flexShrink: 0,
            borderBottom: '1px solid var(--osmos-border, #e5e7eb)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <input
              ref={searchRef}
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search accounts…" aria-label="Search accounts"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: 'var(--osmos-fg, #111)', fontFamily: "'Open Sans', sans-serif",
              }}
            />
            <SearchIcon />
          </div>

          {/* Count summary bar */}
          <div style={{
            padding: '6px 12px', flexShrink: 0,
            borderBottom: '1px solid var(--osmos-border, #e5e7eb)',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--osmos-bg-subtle, #f9fafb)',
          }}>
            <span style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{filteredMasters}</span>
              Master{filteredMasters !== 1 ? 's' : ''}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#d1d5db', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{filteredAccounts}</span>
              Account{filteredAccounts !== 1 ? 's' : ''}
            </span>
          </div>

          {/* List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0
              ? <div style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No accounts match "{query}"</div>
              : filtered.map(parent => {
                const isExp = expanded.has(parent.id);
                return (
                  <div key={parent.id}>
                    {/* Parent row */}
                    <div
                      onClick={() => { setSelected(parent.id); setOpen(false); }}
                      role="option" aria-selected={selected === parent.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '9px 12px', cursor: 'pointer',
                        background: selected === parent.id ? '#eef2ff' : 'transparent',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (selected !== parent.id) e.currentTarget.style.background = '#f9fafb'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = selected === parent.id ? '#eef2ff' : 'transparent'; }}
                    >
                      <button
                        onClick={e => toggleExpand(parent.id, e)}
                        aria-label={isExp ? 'Collapse' : 'Expand'}
                        style={{
                          width: 20, height: 20, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                          color: '#9ca3af',
                        }}
                      >
                        <ExpandChevron expanded={isExp} />
                      </button>

                      <HierarchyDot level="master" />

                      <span style={{
                        flex: 1, fontSize: 13, fontWeight: 500,
                        color: 'var(--osmos-fg, #111)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {parent.label}
                      </span>

                      {/* child count */}
                      <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>
                        {parent.children.length} acct{parent.children.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Children + Add CTA */}
                    {isExp && (
                      <>
                        {parent.children.map(child => (
                          <div
                            key={child.id}
                            onClick={() => { setSelected(child.id); setOpen(false); }}
                            role="option" aria-selected={selected === child.id}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 8,
                              padding: '8px 12px 8px 16px',
                              marginLeft: 20, borderLeft: '2px solid #e0e7ff',
                              cursor: 'pointer', transition: 'background 0.1s',
                              background: selected === child.id ? '#eef2ff' : 'transparent',
                            }}
                            onMouseEnter={e => { if (selected !== child.id) e.currentTarget.style.background = '#f9fafb'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = selected === child.id ? '#eef2ff' : 'transparent'; }}
                          >
                            <HierarchyDot level="account" />
                            <span style={{
                              flex: 1, fontSize: 13, color: 'var(--osmos-fg, #374151)',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                              {child.label}
                            </span>
                          </div>
                        ))}

                        {/* Per-parent Add Account CTA */}
                        <div
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 12px 6px 16px',
                            marginLeft: 20, borderLeft: '2px solid #e0e7ff',
                            cursor: 'pointer', color: '#2563eb',
                            transition: 'background 0.1s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <PlusIcon />
                          <span style={{ fontSize: 12, fontWeight: 500 }}>
                            Add account under {parent.label}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid var(--osmos-border, #e5e7eb)',
            padding: '8px 12px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12, color: '#2563eb', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
                fontFamily: "'Open Sans', sans-serif", fontWeight: 500,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <PlusIcon />
              New Master Account
            </button>
            <button
              style={{
                fontSize: 12, color: '#6b7280', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              Manage Accounts
            </button>
          </div>
        </div>
      )}
    </>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT 2 — Flat list, single selection, breadcrumb labels, no accordion
// ═══════════════════════════════════════════════════════════════════════════════
export function AccountSelectorV2() {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState('boat-audio');   // single ID
  const triggerRef = useRef(null);
  const searchRef  = useRef(null);
  const dropRef    = useRef(null);
  const pos        = useSyncedPosition(triggerRef, open);
  useDropdown(triggerRef, dropRef, open, setOpen);

  useEffect(() => { if (open) setTimeout(() => searchRef.current?.focus(), 50); }, [open]);

  const q        = query.toLowerCase();
  const filtered = q ? FLAT_LIST.filter(item => item.path.toLowerCase().includes(q)) : FLAT_LIST;

  const filteredMasters  = filtered.filter(i => i.level === 'master').length;
  const filteredAccounts = filtered.filter(i => i.level === 'account').length;

  const selItem  = FLAT_LIST.find(i => i.id === selected);
  const trigLabel = selItem ? selItem.path : 'Select Account';

  return (
    <>
      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox" aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
          border: `1.5px solid ${open ? '#2563eb' : 'var(--osmos-border, #e5e7eb)'}`,
          background: 'var(--osmos-bg, white)',
          boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.10)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: "'Open Sans', sans-serif",
          minWidth: 180, maxWidth: 300,
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: 500, flex: 1, textAlign: 'left',
          color: 'var(--osmos-fg, #111)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {trigLabel}
        </span>
        {selected && (
          <span
            onClick={e => { e.stopPropagation(); setSelected(null); }}
            role="button" aria-label="Clear"
            style={{ color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <XIcon size={12} />
          </span>
        )}
        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <DropChevron open={open} />
        </span>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          ref={dropRef}
          role="listbox"
          style={{
            position: 'fixed', top: pos.top, left: pos.left,
            width: 460, maxHeight: 440,
            background: 'var(--osmos-bg, white)',
            border: '1px solid var(--osmos-border, #e5e7eb)',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 9999, fontFamily: "'Open Sans', sans-serif",
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          {/* Search */}
          <div style={{
            padding: '10px 12px', flexShrink: 0,
            borderBottom: '1px solid var(--osmos-border, #e5e7eb)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <input
              ref={searchRef}
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search accounts…" aria-label="Search accounts"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: 'var(--osmos-fg, #111)', fontFamily: "'Open Sans', sans-serif",
              }}
            />
            <SearchIcon />
          </div>

          {/* Count summary bar */}
          <div style={{
            padding: '6px 12px', flexShrink: 0,
            borderBottom: '1px solid var(--osmos-border, #e5e7eb)',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--osmos-bg-subtle, #f9fafb)',
          }}>
            <span style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{filteredMasters}</span>
              Master{filteredMasters !== 1 ? 's' : ''}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#d1d5db', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{filteredAccounts}</span>
              Account{filteredAccounts !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Flat list — no accordion */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0
              ? <div style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No accounts match "{query}"</div>
              : filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => { setSelected(item.id); setOpen(false); }}
                  role="option" aria-selected={selected === item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 12px',
                    paddingLeft: item.level === 'account' ? 24 : 12,
                    cursor: 'pointer', transition: 'background 0.1s',
                    background: selected === item.id ? '#eef2ff' : 'transparent',
                  }}
                  onMouseEnter={e => { if (selected !== item.id) e.currentTarget.style.background = '#f9fafb'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = selected === item.id ? '#eef2ff' : 'transparent'; }}
                >
                  {/* Descriptive hierarchy badge on the left */}
                  <HierarchyDot level={item.level} />

                  <span style={{
                    flex: 1, fontSize: 13,
                    fontWeight: item.level === 'master' ? 500 : 400,
                    color: 'var(--osmos-fg, #374151)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {/* Show breadcrumb path for accounts, plain label for masters */}
                    {item.path}
                  </span>

                  {/* Child count for master rows */}
                  {item.level === 'master' && (
                    <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>
                      {item.childCount} acct{item.childCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              ))
            }
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid var(--osmos-border, #e5e7eb)',
            padding: '8px 12px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12, color: '#2563eb', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
                fontFamily: "'Open Sans', sans-serif", fontWeight: 500,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <PlusIcon />
              New Master Account
            </button>
            <button
              style={{
                fontSize: 12, color: '#6b7280', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              Manage Accounts
            </button>
          </div>
        </div>
      )}
    </>
  );
}
