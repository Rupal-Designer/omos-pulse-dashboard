import React, { useState } from 'react';

const INITIAL_DATA = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@onlinesales.ai', access: 'Super Administrator' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@onlinesales.ai', access: 'Super Administrator' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@onlinesales.ai', access: 'Super Administrator' },
  { id: 4, name: 'David Brown', email: 'david.brown@onlinesales.ai', access: 'Administrator' },
  { id: 5, name: 'Emily Davis', email: 'emily.davis@onlinesales.ai', access: 'Super Administrator' },
];

const ACCESS_OPTIONS = ['Super Administrator', 'Administrator'];

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

export default function SuperAdminUsersPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', access: 'Super Administrator' });
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const filtered = data
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  function handleAdd() {
    if (!form.name || !form.email) return;
    setData(d => [...d, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', access: 'Super Administrator' });
    setShowModal(false);
    showToast('Super admin user added successfully');
  }

  function handleDelete(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('User removed');
  }

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

      {/* Info banner */}
      <div style={{ background: '#f9fafb', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 36, height: 36, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Ico stroke="var(--osmos-brand-primary)" size={16} d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 4 }}>Super Admin User</div>
          <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6 }}>
            A super admin user can add another super admin user, modify access for admin and ops users, modify clients, and perform bulk actions. They can also access the Admin Dashboard.
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <button style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}
            onClick={() => showToast('Opening change log...')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Change Log
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Name" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }} />
            </div>
            <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
              ＋ Add New User
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                <th onClick={() => setSortAsc(v => !v)} style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>
                  Name {sortAsc ? '▲' : '▼'}
                </th>
                <th style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>Email</th>
                <th style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>Access Role</th>
                <th style={{ padding: '9px 16px', width: 48 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40, color: 'var(--osmos-fg-muted)', fontSize: 13 }}>No users found.</td></tr>
              ) : filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>{row.email}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>{row.access}</span>
                      <span style={{ color: 'var(--osmos-fg-muted)', fontSize: 10 }}>▾</span>
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(row.id)} title="Delete user" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ef4444', lineHeight: 1 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--osmos-bg)', borderRadius: 10, width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>Add New User</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', lineHeight: 1 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Enter email address" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Access Role <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={form.access} onChange={e => setForm(f => ({ ...f, access: e.target.value }))} style={{ ...inputStyle }}>
                  {ACCESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 18px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: '#fff', color: 'var(--osmos-fg-muted)', fontSize: 13, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: 'var(--osmos-brand-primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
