import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';

const LOGS = [
  { id: 1, creationTime: '21 Apr 26, 10:30 AM', user: 'Alice Johnson', action: 'Create Advertiser', description: 'Created new advertiser account for Sports World', merchantsAffected: 'OS_M002', fileStatus: '—', file: '—' },
  { id: 2, creationTime: '21 Apr 26, 10:15 AM', user: 'Bob Smith', action: 'Bulk Upload', description: 'Uploaded persona allocation file', merchantsAffected: 'OS_M002, OS_M003', fileStatus: 'Success', file: 'persona_alloc_apr.xlsx' },
  { id: 3, creationTime: '21 Apr 26, 09:55 AM', user: 'Carol Williams', action: 'Update Attribution', description: 'Changed SPA attribution type to Click-Through', merchantsAffected: 'OS_M004', fileStatus: '—', file: '—' },
  { id: 4, creationTime: '21 Apr 26, 09:40 AM', user: 'David Brown', action: 'Catalog Rule Added', description: 'Added catalog rule: Category = Electronics', merchantsAffected: 'OS_M006', fileStatus: '—', file: '—' },
  { id: 5, creationTime: '21 Apr 26, 09:20 AM', user: 'Alice Johnson', action: 'Bulk Upload', description: 'Uploaded wallet top-up file', merchantsAffected: 'OS_M002, OS_M005, OS_M007', fileStatus: 'Partial Success', file: 'wallet_topup_apr.xlsx' },
  { id: 6, creationTime: '20 Apr 26, 05:10 PM', user: 'Emily Davis', action: 'Update Persona', description: 'Changed persona from Silver to Gold', merchantsAffected: 'OS_M003', fileStatus: '—', file: '—' },
  { id: 7, creationTime: '20 Apr 26, 04:45 PM', user: 'Bob Smith', action: 'Create User', description: 'Added new ops user rahul.sharma@company.com', merchantsAffected: '—', fileStatus: '—', file: '—' },
  { id: 8, creationTime: '20 Apr 26, 04:20 PM', user: 'Carol Williams', action: 'Bulk Upload', description: 'Uploaded seller advertiser onboarding file', merchantsAffected: 'OS_M008, OS_M009', fileStatus: 'Failed', file: 'onboarding_apr.xlsx' },
];

const STATUS_COLORS = {
  'Success': { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
  'Partial Success': { bg: 'var(--osmos-brand-amber-muted)', color: 'var(--osmos-brand-amber)' },
  'Failed': { bg: 'rgba(220,38,38,0.1)', color: 'var(--alert-error-primary)' },
  '—': { bg: 'transparent', color: 'var(--osmos-fg-muted)' },
};


export default function ActivityLogPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const actions = ['All', ...Array.from(new Set(LOGS.map(l => l.action)))];

  const filtered = LOGS.filter(r => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.action.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'All' || r.action === actionFilter;
    return matchSearch && matchAction;
  });

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={13} color="var(--osmos-brand-primary)" strokeWidth={1.8}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Icon>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Activity Log</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>{filtered.length} entries</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--osmos-border)', flexWrap: 'wrap' }}>
          <select value={actionFilter} onChange={e => setActionFilter(e.target.value)} style={{ fontSize: 12, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 10px', color: 'var(--osmos-fg-muted)', fontFamily: "'Open Sans', sans-serif", background: 'var(--osmos-bg)', cursor: 'pointer' }}>
            {actions.map(a => <option key={a} value={a}>{a === 'All' ? 'All Actions' : a}</option>)}
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Icon size={13} color="var(--osmos-fg-subtle)" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 200 }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Creation Time', 'User', 'Action', 'Description', 'Merchants Affected', 'File Status', 'File'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const sc = STATUS_COLORS[row.fileStatus] || STATUS_COLORS['—'];
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{row.creationTime}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.user}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' }}>{row.action}</span>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', maxWidth: 260 }}>{row.description}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 11 }}>{row.merchantsAffected}</td>
                    <td style={{ padding: '10px 14px' }}>
                      {row.fileStatus !== '—' ? (
                        <span style={{ padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{row.fileStatus}</span>
                      ) : <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      {row.file !== '—' ? (
                        <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--osmos-brand-primary)', fontSize: 11, textDecoration: 'none' }}>{row.file}</a>
                      ) : <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
