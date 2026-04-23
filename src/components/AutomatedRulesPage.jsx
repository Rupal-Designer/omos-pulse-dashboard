import React, { useState } from 'react';

const TRIGGER_OPTIONS = ['On Wallet Top-up', 'On New Advertiser onboard'];
const LOOKBACK_OPTIONS = ['None', 'Last 15 days', 'Last 30 days'];

const INITIAL_RULES = [
  { id: 1, status: 'Active', name: 'Top-up Bonus Rule', type: 'Trigger', triggerSchedule: 'On Wallet Top-up', createdOn: '12 Jan 2025' },
  { id: 2, status: 'Active', name: 'New Advertiser Welcome', type: 'Trigger', triggerSchedule: 'On New Advertiser onboard', createdOn: '15 Jan 2025' },
  { id: 3, status: 'Active', name: 'Monthly Budget Alert', type: 'Schedule', triggerSchedule: 'Last 30 days', createdOn: '20 Jan 2025' },
  { id: 4, status: 'Inactive', name: 'Weekly Spend Review', type: 'Schedule', triggerSchedule: 'Last 15 days', createdOn: '25 Jan 2025' },
  { id: 5, status: 'Active', name: 'Zero Balance Alert', type: 'Trigger', triggerSchedule: 'On Wallet Top-up', createdOn: '01 Feb 2025' },
];

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

const EMPTY_FORM = { name: '', description: '', type: 'Trigger', trigger: TRIGGER_OPTIONS[0], lookback: LOOKBACK_OPTIONS[0] };

export default function AutomatedRulesPage() {
  const [data, setData] = useState(INITIAL_RULES);
  const [search, setSearch] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function openCreate() {
    setEditRow(null);
    setForm(EMPTY_FORM);
    setShowDrawer(true);
  }

  function openEdit(row) {
    setEditRow(row);
    setForm({
      name: row.name,
      description: '',
      type: row.type,
      trigger: row.type === 'Trigger' ? row.triggerSchedule : TRIGGER_OPTIONS[0],
      lookback: row.type === 'Schedule' ? row.triggerSchedule : LOOKBACK_OPTIONS[0],
    });
    setShowDrawer(true);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    const triggerSchedule = form.type === 'Trigger' ? form.trigger : form.lookback;
    if (editRow) {
      setData(d => d.map(r => r.id === editRow.id ? { ...r, name: form.name, type: form.type, triggerSchedule } : r));
      showToast('Rule updated successfully');
    } else {
      setData(d => [...d, { id: Date.now(), status: 'Active', name: form.name, type: form.type, triggerSchedule, createdOn: '23 Apr 2025' }]);
      showToast('Rule created successfully');
    }
    setShowDrawer(false);
  }

  function handleDelete(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('Rule deleted');
  }

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)', borderRadius: 6,
    fontSize: 13, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none', boxSizing: 'border-box', background: 'var(--osmos-bg)',
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4, display: 'block' };

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: 'var(--osmos-brand-green)', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{toast}</div>
      )}

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>
              Rules
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', borderRadius: 10, fontSize: 11, fontWeight: 700, padding: '1px 8px', marginLeft: 6 }}>{data.length}</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rules…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }} />
            </div>
            <button onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
              ＋ Create Rule
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Status', 'Rule Name', 'Rule Type', 'Trigger / Schedule', 'Created On', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--osmos-fg-muted)', fontSize: 13 }}>No rules found.</td></tr>
              ) : filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: row.status === 'Active' ? 'var(--osmos-brand-green-muted)' : '#f3f4f6', color: row.status === 'Active' ? 'var(--osmos-brand-green)' : '#6b7280' }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>{row.type}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>{row.triggerSchedule}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-subtle)', whiteSpace: 'nowrap' }}>{row.createdOn}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button onClick={() => openEdit(row)} style={{ background: 'none', border: '1px solid var(--osmos-border)', borderRadius: 5, color: 'var(--osmos-fg-muted)', fontSize: 11, padding: '3px 10px', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Edit</button>
                      <button onClick={() => handleDelete(row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ef4444', lineHeight: 1 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer overlay */}
      {showDrawer && (
        <div onClick={() => setShowDrawer(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 480, background: 'var(--osmos-bg)', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>{editRow ? 'Edit Rule' : 'Create Rule'}</span>
              <button onClick={() => setShowDrawer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', lineHeight: 1 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Rule Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter rule name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe this rule" style={{ ...inputStyle, height: 72, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Rule Type</label>
                <div style={{ display: 'flex', gap: 20 }}>
                  {['Trigger', 'Schedule'].map(t => (
                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--osmos-fg)' }}>
                      <input type="radio" name="ruleType" value={t} checked={form.type === t} onChange={() => setForm(f => ({ ...f, type: t }))} style={{ accentColor: 'var(--osmos-brand-primary)', cursor: 'pointer' }} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
              {form.type === 'Trigger' && (
                <div>
                  <label style={labelStyle}>Select Trigger</label>
                  <select value={form.trigger} onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))} style={{ ...inputStyle }}>
                    {TRIGGER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              )}
              {form.type === 'Schedule' && (
                <div>
                  <label style={labelStyle}>Look back period</label>
                  <select value={form.lookback} onChange={e => setForm(f => ({ ...f, lookback: e.target.value }))} style={{ ...inputStyle }}>
                    {LOOKBACK_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
              <button onClick={() => setShowDrawer(false)} style={{ padding: '8px 18px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)', color: 'var(--osmos-fg-muted)', fontSize: 13, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: 'var(--osmos-brand-primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
