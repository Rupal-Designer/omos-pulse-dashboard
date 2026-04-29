import React, { useState } from 'react';
import { Icon, SearchIcon, PlusIcon, CloseIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Input, Select } from '../../ui/atoms/Input';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

const INITIAL_DATA = [
  { id: 1, name: 'Rahul Sharma',  phone: '+91 98100 12345', email: 'rahul.sharma@company.com',  access: 'Write' },
  { id: 2, name: 'Priya Patel',   phone: '+91 99200 23456', email: 'priya.patel@company.com',   access: 'Read'  },
  { id: 3, name: 'Amit Kumar',    phone: '+91 97300 34567', email: 'amit.kumar@company.com',    access: 'Write' },
  { id: 4, name: 'Sneha Gupta',   phone: '+91 96400 45678', email: 'sneha.gupta@company.com',   access: 'Read'  },
  { id: 5, name: 'Vikram Singh',  phone: '+91 95500 56789', email: 'vikram.singh@company.com',  access: 'Write' },
];

const ACCESS_OPTIONS = ['Read', 'Write'];

export default function OpsUsersPage() {
  const [data, setData]         = useState(INITIAL_DATA);
  const [search, setSearch]     = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', phone: '', access: 'Read' });
  const { toast, showToast }    = useToast();

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!form.name.trim() || !form.email.trim()) return;
    setData(d => [...d, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', phone: '', access: 'Read' });
    setShowModal(false);
    showToast('Ops user added successfully');
  }

  function handleChangeAccess(id, value) {
    setData(d => d.map(r => r.id === id ? { ...r, access: value } : r));
    showToast('Access updated');
  }

  function handleRemove(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('User removed');
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: FONT }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Section header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28,
            background: 'var(--osmos-brand-primary-muted)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={13} color="var(--osmos-brand-primary)">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </Icon>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Ops Users</span>
        </div>

        {/* Toolbar */}
        <div style={{
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--osmos-border)', gap: 10,
        }}>
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
              placeholder="Search users…"
              style={{
                border: 'none', outline: 'none', fontSize: 12,
                color: 'var(--osmos-fg)', fontFamily: FONT,
                width: 180, background: 'transparent',
              }}
            />
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <PlusIcon size={12} color="#fff" />
            Add New User
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: FONT }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Name', 'Phone', 'Email', 'Access', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '9px 14px', textAlign: 'left',
                    fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--osmos-fg-muted)', fontSize: 13 }}>
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
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.phone}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.email}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                      background: row.access === 'Write' ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-brand-green-muted)',
                      color: row.access === 'Write' ? 'var(--osmos-brand-primary)' : 'var(--osmos-brand-green)',
                    }}>
                      {row.access}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      value={row.access}
                      onChange={e => handleChangeAccess(row.id, e.target.value)}
                      style={{
                        fontSize: 11, border: '1px solid var(--osmos-border)',
                        borderRadius: 5, padding: '3px 6px',
                        color: 'var(--osmos-fg-muted)', cursor: 'pointer', fontFamily: FONT,
                        background: 'var(--osmos-bg)',
                      }}
                    >
                      {ACCESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <button
                      onClick={() => handleRemove(row.id)}
                      style={{
                        background: 'none', border: '1px solid #ef4444',
                        borderRadius: 5, color: '#ef4444',
                        fontSize: 11, padding: '3px 10px',
                        cursor: 'pointer', fontFamily: FONT,
                      }}
                    >
                      Remove
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
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--osmos-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: FONT }}>Add New Ops User</span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
              >
                <CloseIcon size={16} color="var(--osmos-fg-muted)" />
              </button>
            </div>

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
              <Input
                label="Phone"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
              <Select
                label="Access Level" required
                value={form.access}
                onChange={e => setForm(f => ({ ...f, access: e.target.value }))}
                options={ACCESS_OPTIONS}
              />
            </div>

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
