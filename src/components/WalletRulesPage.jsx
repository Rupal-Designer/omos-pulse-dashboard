import React, { useState } from 'react';

const INITIAL_RULES = [
  { id: 1, segmentName: 'High Value Advertisers', label: 'HVA Rule', rule: 'Balance < ₹5,000', description: 'Auto top-up when balance falls below ₹5,000', ruleType: 'Auto Top-Up', actions: 'Enabled', lastExecuted: '21 Apr 26, 09:00 AM', createdBy: 'Alice Johnson', createdOn: '15 Jan 25', lastEditedBy: 'Alice Johnson' },
  { id: 2, segmentName: 'Platinum Advertisers', label: 'Platinum Alert', rule: 'Balance < ₹10,000', description: 'Send alert when balance falls below ₹10,000', ruleType: 'Alert', actions: 'Enabled', lastExecuted: '21 Apr 26, 08:30 AM', createdBy: 'Bob Smith', createdOn: '20 Jan 25', lastEditedBy: 'Carol Williams' },
  { id: 3, segmentName: 'Inactive Advertisers', label: 'Inactivity Cap', rule: 'No spend > 7 days', description: 'Flag advertisers with no spend for 7+ days', ruleType: 'Flag', actions: 'Disabled', lastExecuted: '20 Apr 26, 06:00 PM', createdBy: 'David Brown', createdOn: '01 Feb 25', lastEditedBy: 'David Brown' },
  { id: 4, segmentName: 'New Advertisers', label: 'Onboarding Credit', rule: 'Account age < 30 days', description: 'Apply welcome credit for new advertisers', ruleType: 'Credit', actions: 'Enabled', lastExecuted: '19 Apr 26, 12:00 PM', createdBy: 'Emily Davis', createdOn: '05 Feb 25', lastEditedBy: 'Emily Davis' },
];

const RULE_TYPES = ['Auto Top-Up', 'Alert', 'Flag', 'Credit'];
const SEGMENTS = ['High Value Advertisers', 'Platinum Advertisers', 'Gold Advertisers', 'Silver Advertisers', 'Inactive Advertisers', 'New Advertisers'];

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

export default function WalletRulesPage() {
  const [data, setData] = useState(INITIAL_RULES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState({ segmentName: SEGMENTS[0], label: '', rule: '', description: '', ruleType: RULE_TYPES[0] });
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() {
    setEditRow(null);
    setForm({ segmentName: SEGMENTS[0], label: '', rule: '', description: '', ruleType: RULE_TYPES[0] });
    setShowModal(true);
  }

  function openEdit(row) {
    setEditRow(row);
    setForm({ segmentName: row.segmentName, label: row.label, rule: row.rule, description: row.description, ruleType: row.ruleType });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.label || !form.rule) return;
    if (editRow) {
      setData(d => d.map(r => r.id === editRow.id ? { ...r, ...form, lastEditedBy: 'Admin', lastExecuted: 'Just now' } : r));
      showToast('Rule updated successfully');
    } else {
      setData(d => [...d, { id: Date.now(), ...form, actions: 'Enabled', lastExecuted: '—', createdBy: 'Admin', createdOn: '23 Apr 26', lastEditedBy: 'Admin' }]);
      showToast('Wallet rule added successfully');
    }
    setShowModal(false);
  }

  function toggleAction(row) {
    setData(d => d.map(r => r.id === row.id ? { ...r, actions: r.actions === 'Enabled' ? 'Disabled' : 'Enabled' } : r));
    showToast(`Rule ${row.actions === 'Enabled' ? 'disabled' : 'enabled'}`);
  }

  const filtered = data.filter(r =>
    r.segmentName.toLowerCase().includes(search.toLowerCase()) ||
    r.label.toLowerCase().includes(search.toLowerCase()) ||
    r.ruleType.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)', borderRadius: 6,
    fontSize: 13, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4, display: 'block' };

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: 'var(--osmos-brand-green)', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{toast}</div>
      )}

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico stroke="var(--osmos-brand-primary)" d={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Wallet Rules</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rules…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 180 }} />
          </div>
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
            <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={12} stroke="#fff" sw={2.5} />
            Add Rule
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Segment Name', 'Label', 'Rule', 'Description', 'Rule Type', 'Actions', 'Last Executed', 'Created By', 'Created On', 'Last Edited By', ''].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.segmentName}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.label}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontFamily: 'monospace', fontSize: 11 }}>{row.rule}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', maxWidth: 200 }}>{row.description}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' }}>{row.ruleType}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => toggleAction(row)} style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", background: row.actions === 'Enabled' ? 'var(--osmos-brand-green-muted)' : '#fef2f2', color: row.actions === 'Enabled' ? 'var(--osmos-brand-green)' : '#dc2626' }}>
                      {row.actions}
                    </button>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-subtle)', fontSize: 11, whiteSpace: 'nowrap' }}>{row.lastExecuted}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.createdBy}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-subtle)', whiteSpace: 'nowrap' }}>{row.createdOn}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.lastEditedBy}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => openEdit(row)} style={{ background: 'none', border: '1px solid var(--osmos-border)', borderRadius: 5, color: 'var(--osmos-fg-muted)', fontSize: 11, padding: '3px 10px', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--osmos-bg)', borderRadius: 10, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>{editRow ? 'Edit Wallet Rule' : 'Add Wallet Rule'}</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)' }}><Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Segment Name <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={form.segmentName} onChange={e => setForm(f => ({ ...f, segmentName: e.target.value }))} style={{ ...inputStyle }}>
                  {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Label <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. HVA Rule" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Rule Condition <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.rule} onChange={e => setForm(f => ({ ...f, rule: e.target.value }))} placeholder="e.g. Balance < ₹5,000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe what this rule does" style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Rule Type <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={form.ruleType} onChange={e => setForm(f => ({ ...f, ruleType: e.target.value }))} style={{ ...inputStyle }}>
                  {RULE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 18px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)', color: 'var(--osmos-fg-muted)', fontSize: 13, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: 'var(--osmos-brand-primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Save Rule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
