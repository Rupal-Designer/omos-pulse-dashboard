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

/* ── Inline SVG icons ───────────────────────────────────────────── */
function Icon({ children, size = 16, color = 'currentColor', sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}
const SearchIcon = () =>
  <Icon size={14} color={TEXT_LO}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const FilterIcon = () =>
  <Icon size={14} color={TEXT_MID}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const RefreshIcon = () =>
  <Icon size={14} color={TEXT_MID}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>;
const DownloadIcon = () =>
  <Icon size={14} color={TEXT_MID}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const NoDataIcon = () =>
  <Icon size={40} color={TEXT_LO} sw={1.2}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
  </Icon>;

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
      transition: 'opacity 0.3s',
    }}>
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {message}
    </div>
  );
}

/* ── Sample data ─────────────────────────────────────────────────── */
const SAMPLE_DATA = [
  { timestamp: '21 Apr 26, 10:30:45 AM', field: 'cli_ubid_001', eventType: 'PageView',   deviceId: 'DEV_4829', requestId: 'REQ_9821', logs: 'View' },
  { timestamp: '21 Apr 26, 10:28:12 AM', field: 'cli_ubid_002', eventType: 'Purchase',   deviceId: 'DEV_3812', requestId: 'REQ_9820', logs: 'View' },
  { timestamp: '21 Apr 26, 10:25:58 AM', field: 'cli_ubid_003', eventType: 'AddToCart',  deviceId: 'DEV_2947', requestId: 'REQ_9819', logs: 'View' },
];

const COLS = ['Event Timestamp', 'Field', 'Event Type', 'Device ID', 'Request ID', 'Logs'];

/* ── Page ────────────────────────────────────────────────────────── */
export default function DeveloperSettingsPage() {
  const [inputVal, setInputVal]     = useState('');
  const [activeTab, setActiveTab]   = useState('All Events');
  const [searchVal, setSearchVal]   = useState('');
  const [toast, setToast]           = useState({ visible: false, message: '' });

  function showToast(msg) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  }

  const tabs = ['All Events', 'Errors', 'Warnings'];

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: '24px' }}>
      <Toast visible={toast.visible} message={toast.message} />

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: TEXT_LO, marginBottom: 6, display: 'flex', gap: 6, alignItems: 'center' }}>
        <span>Control Center</span>
        <span style={{ color: BORDER }}>/</span>
        <span>Developer Setting</span>
        <span style={{ color: BORDER }}>/</span>
        <span style={{ color: TEXT_MID, fontWeight: 600 }}>Event Debugging</span>
      </div>

      {/* Page heading */}
      <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT_HI, margin: '0 0 20px' }}>
        Event Debugging
      </h1>

      {/* ── Zone 1: Log Tracker ─────────────────────────────────────── */}
      <div style={{
        background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10,
        padding: '18px 20px', marginBottom: 16,
      }}>
        <p style={{ fontSize: 13, color: TEXT_MID, margin: '0 0 14px', fontWeight: 500 }}>
          You can track logs for <strong style={{ color: TEXT_HI }}>20 unique</strong> cli_ubids / device_ids in a day
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Input + Add */}
          <div style={{ display: 'flex', flex: 1, maxWidth: 460, alignItems: 'center',
            border: `1px solid ${BORDER}`, borderRadius: 7, overflow: 'hidden', background: WHITE }}>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Enter cli_ubid / device_id"
              style={{
                flex: 1, border: 'none', outline: 'none', padding: '8px 12px',
                fontFamily: FONT, fontSize: 13, color: TEXT_HI, background: 'transparent',
              }}
            />
            <button
              onClick={() => { if (inputVal.trim()) { setInputVal(''); showToast('ID added successfully'); } }}
              style={{
                border: 'none', borderLeft: `1px solid ${BORDER}`,
                background: BG_SUB, padding: '8px 16px',
                fontFamily: FONT, fontSize: 13, fontWeight: 600,
                color: TEXT_MID, cursor: 'pointer',
              }}>
              Add
            </button>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Start Logging */}
          <button
            onClick={() => showToast('Logging started')}
            style={{
              background: ACCENT, color: '#fff', border: 'none',
              borderRadius: 7, padding: '8px 20px',
              fontFamily: FONT, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            Start Logging
          </button>
        </div>
      </div>

      {/* ── Zone 2: Event Log table ──────────────────────────────────── */}
      <div style={{
        background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderBottom: `1px solid ${BORDER}`,
          flexWrap: 'wrap',
        }}>
          {/* Tab toggle */}
          <div style={{ display: 'flex', background: BG_SUB, borderRadius: 7, padding: 3, gap: 2 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                border: 'none', borderRadius: 5,
                padding: '5px 12px', fontFamily: FONT, fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === t ? WHITE : 'transparent',
                color: activeTab === t ? TEXT_HI : TEXT_MID,
                boxShadow: activeTab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: `1px solid ${BORDER}`, borderRadius: 7, padding: '6px 10px',
            background: WHITE, minWidth: 200,
          }}>
            <SearchIcon />
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search category L1"
              style={{
                border: 'none', outline: 'none', fontFamily: FONT,
                fontSize: 12, color: TEXT_HI, background: 'transparent', flex: 1,
              }}
            />
          </div>

          {/* Icon buttons */}
          {[
            { icon: <FilterIcon />,  label: 'Filter'   },
            { icon: <RefreshIcon />, label: 'Refresh'  },
            { icon: <DownloadIcon/>, label: 'Download' },
          ].map(({ icon, label }) => (
            <button key={label} title={label} onClick={() => showToast(`${label} triggered`)}
              style={{
                border: `1px solid ${BORDER}`, borderRadius: 7,
                background: WHITE, padding: '6px 9px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              {icon}
            </button>
          ))}

          {/* Change log */}
          <button onClick={() => showToast('Change log coming soon')} style={{
            border: `1px solid ${BORDER}`, borderRadius: 7, background: WHITE,
            padding: '6px 14px', fontFamily: FONT, fontSize: 12, fontWeight: 600,
            color: TEXT_MID, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            Change log
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr style={{ background: BG_SUB }}>
                {COLS.map(col => (
                  <th key={col} style={{
                    padding: '10px 14px', textAlign: 'left',
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
              {SAMPLE_DATA.length === 0 ? (
                <tr>
                  <td colSpan={COLS.length}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '48px 0', gap: 12,
                    }}>
                      <NoDataIcon />
                      <span style={{ fontSize: 14, color: TEXT_LO, fontWeight: 500 }}>
                        No Data Available
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                SAMPLE_DATA.map((row, i) => (
                  <tr key={i} style={{
                    background: i % 2 === 0 ? WHITE : BG_SUB,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = ACCENT_M}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? WHITE : BG_SUB}
                  >
                    <td style={TD}>{row.timestamp}</td>
                    <td style={TD}>
                      <code style={{ background: BG_SUB, borderRadius: 4, padding: '2px 6px', fontSize: 12 }}>
                        {row.field}
                      </code>
                    </td>
                    <td style={TD}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 10,
                        fontSize: 11, fontWeight: 600,
                        background: row.eventType === 'PageView' ? 'var(--osmos-brand-primary-muted)'
                          : row.eventType === 'Purchase' ? 'var(--osmos-brand-green-muted)' : 'rgba(245,166,35,0.12)',
                        color: row.eventType === 'PageView' ? 'var(--osmos-brand-primary)'
                          : row.eventType === 'Purchase' ? 'var(--osmos-brand-green)' : 'var(--osmos-brand-amber)',
                      }}>
                        {row.eventType}
                      </span>
                    </td>
                    <td style={TD}>{row.deviceId}</td>
                    <td style={TD}>{row.requestId}</td>
                    <td style={TD}>
                      <button
                        onClick={() => showToast('Log details coming soon')}
                        style={{
                          border: 'none', background: 'none',
                          color: ACCENT, fontFamily: FONT, fontSize: 13,
                          fontWeight: 600, cursor: 'pointer', padding: 0,
                          textDecoration: 'underline', textUnderlineOffset: 2,
                        }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer row count */}
        <div style={{
          padding: '10px 16px', borderTop: `1px solid ${BORDER}`,
          fontSize: 12, color: TEXT_LO, display: 'flex', justifyContent: 'flex-end',
        }}>
          Showing {SAMPLE_DATA.length} of {SAMPLE_DATA.length} records
        </div>
      </div>
    </div>
  );
}

const TD = {
  padding: '10px 14px',
  fontSize: 13,
  color: 'var(--osmos-fg)',
  borderBottom: `1px solid var(--osmos-border)`,
  whiteSpace: 'nowrap',
  fontFamily: "'Open Sans', sans-serif",
};
