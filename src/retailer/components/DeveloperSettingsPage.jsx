import React, { useState } from 'react';
import { Icon, SearchIcon, FilterIcon, RefreshIcon, DownloadIcon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';


const NoDataIcon = () =>
  <Icon size={40} color={'var(--osmos-fg-subtle)'} sw={1.2}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
  </Icon>;

/* ── Sample data — starts empty (Figma shows "No Data Available") ── */
const SAMPLE_DATA = [];

const COLS = ['Event Timestamp', 'Field', 'Event Type', 'Device ID', 'Request ID', 'Logs'];

/* ── Page ────────────────────────────────────────────────────────── */
export default function DeveloperSettingsPage() {
  const [inputVal, setInputVal]     = useState('');
  const [activeTab, setActiveTab]   = useState('All Events');
  const [searchVal, setSearchVal]   = useState('');
  const { toast, showToast } = useToast();

  const tabs = ['All Events', 'Errors', 'Warnings'];

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: 'var(--osmos-bg-subtle)', minHeight: '100vh', padding: '20px 24px' }}>
      <Toast {...toast} />

      {/* ── Zone 1: Log Tracker ─────────────────────────────────────── */}
      <div style={{
        background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 10,
        padding: '18px 20px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
          {/* Labelled input + Add */}
          <div style={{ flex: 1, maxWidth: 460 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 5, fontFamily: "'Open Sans', sans-serif" }}>
              Enter Device ID
            </label>
            <div style={{ display: 'flex', alignItems: 'center',
              border: '1px solid var(--osmos-border)', borderRadius: 7, overflow: 'hidden', background: 'var(--osmos-bg)' }}>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Enter here"
                style={{
                  flex: 1, border: 'none', outline: 'none', padding: '8px 12px',
                  fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: 'var(--osmos-fg)', background: 'transparent',
                }}
              />
              <button
                onClick={() => { if (inputVal.trim()) { setInputVal(''); showToast('ID added successfully'); } }}
                style={{
                  border: 'none', borderLeft: '1px solid var(--osmos-border)',
                  background: 'var(--osmos-bg-subtle)', padding: '8px 16px',
                  fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  color: 'var(--osmos-fg-muted)', cursor: 'pointer',
                }}>
                Add
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Start Logging */}
          <button
            onClick={() => showToast('Logging started')}
            style={{
              background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none',
              borderRadius: 7, padding: '8px 20px',
              fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            Start Logging
          </button>
        </div>

        <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', margin: '10px 0 0', fontWeight: 400 }}>
          You can track logs for <strong style={{ color: 'var(--osmos-fg)' }}>20 unique</strong> cli_ubids / device_ids in a day
        </p>
      </div>

      {/* ── Zone 2: Event Log table ──────────────────────────────────── */}
      <div style={{
        background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 10, overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderBottom: '1px solid var(--osmos-border)',
          flexWrap: 'wrap',
        }}>
          {/* Tab toggle */}
          <div style={{ display: 'flex', background: 'var(--osmos-bg-subtle)', borderRadius: 7, padding: 3, gap: 2 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                border: 'none', borderRadius: 5,
                padding: '5px 12px', fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === t ? 'var(--osmos-bg)' : 'transparent',
                color: activeTab === t ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
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
            border: '1px solid var(--osmos-border)', borderRadius: 7, padding: '6px 10px',
            background: 'var(--osmos-bg)', minWidth: 200,
          }}>
            <SearchIcon />
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search category L1"
              style={{
                border: 'none', outline: 'none', fontFamily: "'Open Sans', sans-serif",
                fontSize: 12, color: 'var(--osmos-fg)', background: 'transparent', flex: 1,
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
                border: '1px solid var(--osmos-border)', borderRadius: 7,
                background: 'var(--osmos-bg)', padding: '6px 9px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              {icon}
            </button>
          ))}

          {/* Change log */}
          <button onClick={() => showToast('Change log coming soon')} style={{
            border: '1px solid var(--osmos-border)', borderRadius: 7, background: 'var(--osmos-bg)',
            padding: '6px 14px', fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
            color: 'var(--osmos-fg-muted)', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            Change log
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                {COLS.map(col => (
                  <th key={col} style={{
                    padding: '10px 14px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, color: 'var(--osmos-fg-muted)',
                    borderBottom: '1px solid var(--osmos-border)',
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
                      <span style={{ fontSize: 14, color: 'var(--osmos-fg-subtle)', fontWeight: 500 }}>
                        No Data Available
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                SAMPLE_DATA.map((row, i) => (
                  <tr key={i} style={{
                    background: i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-brand-primary-muted)'}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)'}
                  >
                    <td style={TD}>{row.timestamp}</td>
                    <td style={TD}>
                      <code style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 4, padding: '2px 6px', fontSize: 12 }}>
                        {row.field}
                      </code>
                    </td>
                    <td style={TD}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 10,
                        fontSize: 11, fontWeight: 600,
                        background: row.eventType === 'PageView' ? 'var(--osmos-brand-primary-muted)'
                          : row.eventType === 'Purchase' ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-brand-amber-muted)',
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
                          color: 'var(--osmos-brand-primary)', fontFamily: "'Open Sans', sans-serif", fontSize: 13,
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
          padding: '10px 16px', borderTop: '1px solid var(--osmos-border)',
          fontSize: 12, color: 'var(--osmos-fg-subtle)', display: 'flex', justifyContent: 'flex-end',
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
