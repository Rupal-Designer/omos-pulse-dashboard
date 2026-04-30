import React, { useState } from 'react';
import { Icon, SearchIcon, TrashIcon, CloseIcon, PlusIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Input, Select } from '../../ui/atoms/Input';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

const INITIAL_DATA = [
  { id: 1, name: 'Alice Johnson',  email: 'alice.johnson@onlinesales.ai',  access: 'Super Administrator' },
  { id: 2, name: 'Bob Smith',      email: 'bob.smith@onlinesales.ai',      access: 'Super Administrator' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@onlinesales.ai', access: 'Super Administrator' },
  { id: 4, name: 'David Brown',    email: 'david.brown@onlinesales.ai',    access: 'Administrator' },
  { id: 5, name: 'Emily Davis',    email: 'emily.davis@onlinesales.ai',    access: 'Super Administrator' },
];

const ACCESS_OPTIONS = ['Super Administrator', 'Administrator'];

export default function SuperAdminUsersPage() {
  const [data, setData]       = useState(INITIAL_DATA);
  const [search, setSearch]   = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]       = useState({ name: '', email: '', access: 'Super Administrator' });
  const { toast, showToast }  = useToast();

  const filtered = data
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  function handleAdd() {
    if (!form.name.trim() || !form.email.trim()) return;
    setData(d => [...d, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', access: 'Super Administrator' });
    setShowModal(false);
    showToast('Super admin user added successfully');
  }

  function handleDelete(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('User removed');
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: FONT }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      {/* Info banner */}
      <div style={{
        background: 'var(--osmos-bg-subtle)',
        border: '1px solid var(--osmos-border)',
        borderRadius: 6,
        padding: '14px 16px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'var(--osmos-brand-primary-muted)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={16} color="var(--osmos-brand-primary)">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </Icon>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 4, fontFamily: FONT }}>
            Super Admin User
          </div>
          <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, fontFamily: FONT }}>
            A super admin user can add another super admin user, modify access for admin and ops users,
            modify clients, and perform bulk actions. They can also access the Admin Dashboard.
          </div>
        </div>
      </div>

      {/* Table card */}
      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--osmos-border)',
          gap: 10,
        }}>
          <button
            onClick={() => showToast('Opening change log...')}
            style={{
              background: 'none', border: 'none',
              fontSize: 12, color: 'var(--osmos-brand-primary)',
              cursor: 'pointer', fontFamily: FONT,
              display: 'flex', alignItems: 'center', gap: 5, padding: 0,
            }}
          >
            <Icon size={13} color="var(--osmos-brand-primary)">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </Icon>
            Change Log
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--osmos-bg)',
              border: '1px solid var(--osmos-border)',
              borderRadius: 6, padding: '0 10px', height: 30,
            }}>
              <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Name"
                style={{
                  border: 'none', outline: 'none', fontSize: 12,
                  color: 'var(--osmos-fg)', fontFamily: FONT,
                  width: 160, background: 'transparent',
                }}
              />
            </div>

            <Button onClick={() => setShowModal(true)} size="sm">
              <PlusIcon size={12} color="#fff" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: FONT }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                <th
                  onClick={() => setSortAsc(v => !v)}
                  style={{
                    padding: '9px 16px', textAlign: 'left', fontWeight: 600,
                    color: 'var(--osmos-fg-muted)', fontSize: 11,
                    whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none',
                  }}
                >
                  Name {sortAsc ? '▲' : '▼'}
                </th>
                <th style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>Email</th>
                <th style={{ padding: '9px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>Access Role</th>
                <th style={{ padding: '9px 16px', width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: 40, color: 'var(--osmos-fg-muted)', fontSize: 13 }}>
                    No users found.
                  </td>
                </tr>
              ) : filtered.map(row => (
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>{row.email}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--osmos-fg-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
                        {row.access}
                      </span>
                      <span style={{ color: 'var(--osmos-fg-subtle)', fontSize: 10 }}>▾</span>
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(row.id)}
                      title="Delete user"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', color: 'var(--alert-error-primary)' }}
                    >
                      <TrashIcon size={14} color="var(--alert-error-primary)" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--osmos-bg)', borderRadius: 10, width: 420,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden',
            }}
          >
            {/* Modal header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--osmos-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: FONT }}>Add New User</span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
              >
                <CloseIcon size={14} color="var(--osmos-fg-muted)" />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Input
                label="Name" required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Enter full name"
              />
              <Input
                label="Email" required type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Enter email address"
              />
              <Select
                label="Access Role" required
                value={form.access}
                onChange={e => setForm(f => ({ ...f, access: e.target.value }))}
                options={ACCESS_OPTIONS}
              />
            </div>

            {/* Modal footer */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--osmos-border)',
              display: 'flex', justifyContent: 'flex-end', gap: 10,
            }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Add User</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
