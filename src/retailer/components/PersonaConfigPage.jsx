import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { Toast, useToast } from '../../ui/atoms/Toast';

const PERSONAS = [
  { key: 'Platinum', dot: '#94a3b8' },
  { key: 'Gold',     dot: '#f59e0b' },
  { key: 'Silver',   dot: '#64748b' },
  { key: 'Beta',     dot: '#8b5cf6' },
];

const INITIAL_ROWS = [
  { id: 'enable_announcement',      label: 'App Level Config > Enable Announcement',                                    group: 'App Level Config',        Platinum: true,  Gold: true,  Silver: false, Beta: false },
  { id: 'enable_ask_rating',        label: 'App Level Config > Enable ask for rating',                                 group: 'App Level Config',        Platinum: true,  Gold: false, Silver: true,  Beta: false },
  { id: 'enable_suggestions',       label: 'App Level Config > Enable Suggestions',                                    group: 'App Level Config',        Platinum: false, Gold: false, Silver: true,  Beta: true  },
  { id: 'enable_hygiene',           label: 'App Level Config > Enable Hygiene',                                        group: 'App Level Config',        Platinum: false, Gold: true,  Silver: false, Beta: true  },
  { id: 'enable_app_header',        label: 'App Level Config > Enable App Header',                                     group: 'App Level Config',        Platinum: true,  Gold: false, Silver: true,  Beta: false },
  { id: 'hide_wallet_balance',      label: 'App Level Config > Hide wallet balance & promotional balance split',       group: 'App Level Config',        Platinum: false, Gold: true,  Silver: false, Beta: true  },
  { id: 'enable_change_history',    label: 'App Level Config > Enable Change History For Billing',                    group: 'App Level Config',        Platinum: true,  Gold: false, Silver: true,  Beta: false },
  { id: 'enable_sofie',             label: 'App Level Config > Enable Sofie Suggestions',                             group: 'App Level Config',        Platinum: false, Gold: false, Silver: false, Beta: true  },
  { id: 'agentic_ai_debugger',      label: 'App Level Config > Agentic AI Campaign Debugger',                         group: 'App Level Config',        Platinum: true,  Gold: true,  Silver: false, Beta: true  },
  { id: 'enable_perf_dashboard',    label: 'Performance Dashboard > Enable Performance Dashboard',                    group: 'Performance Dashboard',   Platinum: true,  Gold: true,  Silver: true,  Beta: false },
  { id: 'enable_header',            label: 'Performance Dashboard > Dashboard Header > Enable Header',                 group: 'Performance Dashboard',   Platinum: true,  Gold: true,  Silver: false, Beta: false },
  { id: 'enable_navigation',        label: 'Performance Dashboard > Dashboard Header > Enable Navigation',             group: 'Performance Dashboard',   Platinum: true,  Gold: false, Silver: true,  Beta: false },
  { id: 'enable_global_date',       label: 'Performance Dashboard > Dashboard Header > Enable Global Date Selection', group: 'Performance Dashboard',   Platinum: false, Gold: true,  Silver: false, Beta: true  },
  { id: 'enable_wallet_balance',    label: 'Performance Dashboard > Dashboard Header > Enable Wallet Balance',        group: 'Performance Dashboard',   Platinum: false, Gold: true,  Silver: false, Beta: true  },
  { id: 'enable_transactions_log',  label: 'Performance Dashboard > Dashboard Header > Enable Transactions Log',      group: 'Performance Dashboard',   Platinum: true,  Gold: false, Silver: true,  Beta: false },
  { id: 'enable_email_comm',        label: 'Performance Dashboard > Dashboard Header > Enable Email Communication Setting', group: 'Performance Dashboard', Platinum: true, Gold: true, Silver: true, Beta: true },
  { id: 'enable_scheduled_reports', label: 'Performance Dashboard > Dashboard Header > Enable Scheduled Reports',    group: 'Performance Dashboard',   Platinum: true,  Gold: true,  Silver: true,  Beta: true  },
];

const GROUP_STYLES = {
  'App Level Config':      { bg: 'var(--osmos-bg)',       headerBg: 'var(--osmos-bg-subtle)',          headerColor: 'var(--osmos-fg-muted)' },
  'Performance Dashboard': { bg: 'var(--osmos-bg-subtle)', headerBg: 'var(--osmos-brand-primary-muted)', headerColor: 'var(--osmos-brand-primary)' },
};



export default function PersonaConfigPage() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Auction Campaign');
  const { toast, showToast } = useToast();

  function handleToggle(rowId, persona) {
    setRows(prev => prev.map(r =>
      r.id === rowId ? { ...r, [persona]: !r[persona] } : r
    ));
  }

  const filtered = rows.filter(r =>
    r.label.toLowerCase().includes(search.toLowerCase())
  );

  // Group rows preserving order, inserting group headers when group changes
  const grouped = [];
  let lastGroup = null;
  filtered.forEach(row => {
    if (row.group !== lastGroup) {
      grouped.push({ type: 'header', group: row.group });
      lastGroup = row.group;
    }
    grouped.push({ type: 'row', ...row });
  });

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      <Toast {...toast} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Card Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={13} color="var(--osmos-brand-primary)" strokeWidth={1.8}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Persona Configuration</span>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Left: Tab group */}
          <div style={{ display: 'flex', border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden' }}>
            {['Auction Campaign', 'All'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '5px 14px', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: activeTab === tab ? 700 : 400,
                fontFamily: "'Open Sans', sans-serif",
                background: activeTab === tab ? 'var(--osmos-brand-primary)' : '#fff',
                color: activeTab === tab ? '#fff' : 'var(--osmos-fg-muted)',
                borderRight: tab === 'Auction Campaign' ? '1px solid var(--osmos-border)' : 'none',
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Right: Search + Change Log */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <Icon size={13} color="var(--osmos-fg-subtle)" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Feature Name"
                style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 180 }}
              />
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 5, height: 30, padding: '0 12px',
              border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)',
              fontSize: 12, color: 'var(--osmos-fg-muted)', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            }}>
              <Icon size={12} color="currentColor" strokeWidth={1.8}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Icon>
              Change Log
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '2px solid var(--osmos-border)' }}>
                <th style={{
                  padding: '10px 16px', textAlign: 'left', fontWeight: 600,
                  color: 'var(--osmos-fg-muted)', fontSize: 11, minWidth: 340,
                  position: 'sticky', left: 0, background: 'var(--osmos-bg-subtle)',
                  borderRight: '1px solid var(--osmos-border)',
                }}>
                  Feature
                </th>
                {PERSONAS.map(p => (
                  <th key={p.key} style={{
                    padding: '10px 16px', textAlign: 'center', fontWeight: 600,
                    color: 'var(--osmos-fg-muted)', fontSize: 11, width: 100, minWidth: 90,
                    borderRight: '1px solid var(--osmos-border)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.dot, display: 'inline-block', flexShrink: 0 }} />
                      {p.key}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grouped.map((item, idx) => {
                if (item.type === 'header') {
                  const gs = GROUP_STYLES[item.group] || GROUP_STYLES['App Level Config'];
                  return (
                    <tr key={`header-${item.group}`} style={{ background: gs.headerBg }}>
                      <td colSpan={5} style={{
                        padding: '6px 16px',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                        textTransform: 'uppercase', color: gs.headerColor,
                        borderBottom: '1px solid var(--osmos-border)',
                        borderTop: idx > 0 ? '2px solid var(--osmos-border)' : 'none',
                      }}>
                        {item.group}
                      </td>
                    </tr>
                  );
                }

                const gs = GROUP_STYLES[item.group] || GROUP_STYLES['App Level Config'];
                return (
                  <tr
                    key={item.id}
                    style={{ borderBottom: '1px solid var(--osmos-border)', background: gs.bg }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = gs.bg}
                  >
                    <td style={{
                      padding: '10px 16px', color: 'var(--osmos-fg)', fontSize: 12,
                      position: 'sticky', left: 0, background: 'inherit',
                      borderRight: '1px solid var(--osmos-border)',
                    }}>
                      {item.label}
                    </td>
                    {PERSONAS.map(p => (
                      <td key={p.key} style={{
                        padding: '10px 16px', textAlign: 'center',
                        borderRight: '1px solid var(--osmos-border)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Checkbox
                            checked={item[p.key]}
                            onChange={() => handleToggle(item.id, p.key)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 16px', borderTop: '1px solid var(--osmos-border)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button
            onClick={() => showToast('Configuration saved successfully')}
            style={{
              background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none',
              borderRadius: 6, padding: '8px 24px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
