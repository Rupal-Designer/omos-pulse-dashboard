import React, { useState } from 'react';

/* ── tokens ─────────────────────────────────────────────────────── */
const WHITE   = 'var(--osmos-bg)';
const BORDER  = 'var(--osmos-border)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M= 'var(--osmos-brand-primary-muted)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const TEXT_HI = 'var(--osmos-fg)';
const TEXT_MID= 'var(--osmos-fg-muted)';
const TEXT_LO = 'var(--osmos-fg-subtle)';
const FONT    = "'Open Sans', sans-serif";

/* ── Toast ───────────────────────────────────────────────────────── */
function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      background: 'var(--osmos-brand-green)', color: '#fff',
      padding: '10px 18px', borderRadius: 8,
      fontFamily: FONT, fontSize: 13, fontWeight: 500,
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {message}
    </div>
  );
}

/* ── Custom Checkbox ─────────────────────────────────────────────── */
function Checkbox({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 16, height: 16, borderRadius: 4, cursor: 'pointer',
        border: checked ? `2px solid ${ACCENT}` : `2px solid var(--osmos-border)`,
        background: checked ? ACCENT : WHITE,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.15s',
        userSelect: 'none',
      }}>
      {checked && (
        <svg width={10} height={10} viewBox="0 0 12 12" fill="none"
          stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2 6 5 9 10 3"/>
        </svg>
      )}
    </div>
  );
}

/* ── Search icon ─────────────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      stroke={TEXT_LO} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

/* ── Initial data ────────────────────────────────────────────────── */
const INITIAL_DATA = [
  { name: 'Gillette',          id: '12345', categoryTargeting: true,  brandTargeting: false },
  { name: 'Colgate Palmolive', id: '67890', categoryTargeting: false, brandTargeting: true  },
  { name: 'HUL',               id: '54321', categoryTargeting: true,  brandTargeting: true  },
  { name: 'Nestle',            id: '98765', categoryTargeting: false, brandTargeting: false },
  { name: 'HUL',               id: '13579', categoryTargeting: true,  brandTargeting: false },
  { name: 'P&G',               id: '24680', categoryTargeting: false, brandTargeting: true  },
  { name: 'Britannia',         id: '11223', categoryTargeting: true,  brandTargeting: false },
  { name: 'Gillette',          id: '33445', categoryTargeting: false, brandTargeting: true  },
];

const COLS = ['Advertiser Name', 'Advertiser Id', 'Enable Category Targeting', 'Enable Brand Targeting'];

/* ── Page ────────────────────────────────────────────────────────── */
export default function ManageAttributeTargetingPage() {
  const [rows, setRows]         = useState(INITIAL_DATA);
  const [search, setSearch]     = useState('');
  const [toast, setToast]       = useState({ visible: false, message: '' });

  function showToast(msg) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  }

  function toggleField(idx, field) {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: !r[field] } : r));
    showToast('Targeting updated');
  }

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.id.includes(search)
  );

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: '24px' }}>
      <Toast visible={toast.visible} message={toast.message} />

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: TEXT_LO, marginBottom: 6, display: 'flex', gap: 6, alignItems: 'center' }}>
        <span>Control Center</span>
        <span style={{ color: BORDER }}>/</span>
        <span>Audience Manager</span>
        <span style={{ color: BORDER }}>/</span>
        <span style={{ color: TEXT_MID, fontWeight: 600 }}>Manage Activity Targeting</span>
      </div>

      {/* Page heading */}
      <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT_HI, margin: '0 0 20px' }}>
        Manage Activity Targeting
      </h1>

      {/* ── Table card ──────────────────────────────────────────────── */}
      <div style={{
        background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderBottom: `1px solid ${BORDER}`,
          flexWrap: 'wrap',
        }}>
          {/* Left: count badge + search */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: BG_SUB, borderRadius: 20,
            padding: '4px 12px', gap: 6,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_HI }}>Advertisers</span>
            <span style={{
              background: ACCENT, color: '#fff', borderRadius: 12,
              fontSize: 11, fontWeight: 700, padding: '1px 7px',
            }}>120</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: `1px solid ${BORDER}`, borderRadius: 7, padding: '6px 10px',
            background: WHITE, minWidth: 180,
          }}>
            <SearchIcon />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              style={{
                border: 'none', outline: 'none', fontFamily: FONT,
                fontSize: 12, color: TEXT_HI, background: 'transparent', flex: 1,
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* Right: action buttons */}
          <button
            onClick={() => showToast('Create Rules coming soon')}
            style={{
              background: ACCENT, color: '#fff', border: 'none',
              borderRadius: 7, padding: '8px 18px',
              fontFamily: FONT, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            Create Rules
          </button>

          <button
            onClick={() => showToast('Create Campaign coming soon')}
            style={{
              background: WHITE, color: TEXT_HI,
              border: `1px solid ${BORDER}`,
              borderRadius: 7, padding: '8px 18px',
              fontFamily: FONT, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            Create Campaign
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
            <thead>
              <tr style={{ background: BG_SUB }}>
                {COLS.map(col => (
                  <th key={col} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, color: TEXT_MID,
                    borderBottom: `1px solid ${BORDER}`,
                    whiteSpace: 'nowrap', letterSpacing: '0.03em', textTransform: 'uppercase',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={COLS.length}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '48px 0', gap: 12,
                    }}>
                      <svg width={40} height={40} viewBox="0 0 24 24" fill="none"
                        stroke={TEXT_LO} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                      </svg>
                      <span style={{ fontSize: 14, color: TEXT_LO, fontWeight: 500 }}>
                        No Data Available
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr key={row.id + i}
                    style={{ background: i % 2 === 0 ? WHITE : BG_SUB, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = ACCENT_M}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? WHITE : BG_SUB}
                  >
                    {/* Advertiser Name */}
                    <td style={TD}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: ACCENT_M, color: ACCENT,
                          fontWeight: 700, fontSize: 11,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {row.name[0]}
                        </div>
                        <span style={{ fontWeight: 600, color: TEXT_HI }}>{row.name}</span>
                      </div>
                    </td>

                    {/* Advertiser Id */}
                    <td style={TD}>
                      <code style={{
                        background: BG_SUB, borderRadius: 4, padding: '2px 7px',
                        fontSize: 12, color: TEXT_MID,
                      }}>
                        {row.id}
                      </code>
                    </td>

                    {/* Enable Category Targeting */}
                    <td style={TD}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Checkbox
                          checked={row.categoryTargeting}
                          onChange={() => toggleField(rows.indexOf(row), 'categoryTargeting')}
                        />
                        <span style={{ fontSize: 12, color: row.categoryTargeting ? TEXT_HI : TEXT_LO }}>
                          {row.categoryTargeting ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </td>

                    {/* Enable Brand Targeting */}
                    <td style={TD}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Checkbox
                          checked={row.brandTargeting}
                          onChange={() => toggleField(rows.indexOf(row), 'brandTargeting')}
                        />
                        <span style={{ fontSize: 12, color: row.brandTargeting ? TEXT_HI : TEXT_LO }}>
                          {row.brandTargeting ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 16px', borderTop: `1px solid ${BORDER}`,
          fontSize: 12, color: TEXT_LO, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Showing {filtered.length} of {rows.length} advertisers</span>
          <span style={{ color: TEXT_MID }}>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

const TD = {
  padding: '10px 16px',
  fontSize: 13,
  color: 'var(--osmos-fg)',
  borderBottom: `1px solid var(--osmos-border)`,
  fontFamily: "'Open Sans', sans-serif",
};
