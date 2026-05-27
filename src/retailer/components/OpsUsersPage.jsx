import React, { useState } from 'react';
import { SearchIcon, PlusIcon, Icon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Input, Select } from '../../ui/atoms/Input';
import { Toast, useToast } from '../../ui/atoms/Toast';
import { TypeBadge } from '../../ui';
import { Toolbar } from '../../ui/molecules/Toolbar';
import { FormDrawer } from '../../ui/molecules/FormDrawer';
import { FormField } from '../../ui/molecules/FormField';
import { SearchBar } from '../../ui/molecules/SearchBar';
import { DataTable } from '../../shared/components/data-table/DataTable';
import { useOsmosTable } from '../../shared/components/data-table/useOsmosTable';
import { createColumnHelper } from '@tanstack/react-table';

const INITIAL_DATA = [
  { id: 1, name: 'Rahul Sharma',  phone: '+91 98100 12345', email: 'rahul.sharma@company.com',  access: 'Write' },
  { id: 2, name: 'Priya Patel',   phone: '+91 99200 23456', email: 'priya.patel@company.com',   access: 'Read'  },
  { id: 3, name: 'Amit Kumar',    phone: '+91 97300 34567', email: 'amit.kumar@company.com',    access: 'Write' },
  { id: 4, name: 'Sneha Gupta',   phone: '+91 96400 45678', email: 'sneha.gupta@company.com',   access: 'Read'  },
  { id: 5, name: 'Vikram Singh',  phone: '+91 95500 56789', email: 'vikram.singh@company.com',  access: 'Write' },
];

const ACCESS_OPTIONS = ['Read', 'Write'];

const ACCESS_COLOR_MAP = {
  'Write': { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  'Read':  { bg: 'var(--osmos-brand-green-muted)',   color: 'var(--osmos-brand-green)'   },
};

const colHelper = createColumnHelper();

export default function OpsUsersPage() {
  const [data, setData]       = useState(INITIAL_DATA);
  const [search, setSearch]   = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm]       = useState({ name: '', email: '', phone: '', access: 'Read' });
  const { toast, showToast }  = useToast();

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!form.name.trim() || !form.email.trim()) return;
    setData(d => [...d, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', phone: '', access: 'Read' });
    setDrawerOpen(false);
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

  const columns = [
    colHelper.accessor('name', {
      header: 'Name',
      cell: info => <span style={{ fontWeight: 500 }}>{info.getValue()}</span>,
    }),
    colHelper.accessor('phone',  { header: 'Phone' }),
    colHelper.accessor('email',  { header: 'Email' }),
    colHelper.accessor('access', {
      header: 'Access',
      cell: info => <TypeBadge type={info.getValue()} colorMap={ACCESS_COLOR_MAP} />,
    }),
    colHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={row.original.access}
            onChange={e => handleChangeAccess(row.original.id, e.target.value)}
            style={{
              fontSize: 11, border: '1px solid var(--osmos-border)',
              borderRadius: 5, padding: '3px 6px',
              color: 'var(--osmos-fg-muted)', cursor: 'pointer',
              background: 'var(--osmos-bg)',
            }}
          >
            {ACCESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <Button
            size="xs"
            variant="outline"
            onClick={() => handleRemove(row.original.id)}
            style={{ color: '#ef4444', borderColor: '#ef4444' }}
          >
            Remove
          </Button>
        </div>
      ),
    }),
  ];

  const table = useOsmosTable({ data: filtered, columns });

  return (
    <div style={{ padding: '20px 24px' }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 10, overflow: 'hidden' }}>
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
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Ops Users</span>
        </div>

        <Toolbar
          left={
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users…"
                style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', width: 180, background: 'transparent' }}
              />
            </div>
          }
          right={
            <Button size="sm" onClick={() => setDrawerOpen(true)}>
              <PlusIcon size={12} color="#fff" />
              Add New User
            </Button>
          }
        />

        <DataTable table={table} />
      </div>

      <FormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add New Ops User"
        onSubmit={handleAdd}
        submitLabel="Add User"
      >
        <FormField label="Name" required>
          <Input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Enter full name"
          />
        </FormField>
        <FormField label="Email" required>
          <Input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Enter email address"
          />
        </FormField>
        <FormField label="Phone">
          <Input
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="Enter phone number"
          />
        </FormField>
        <FormField label="Access Level" required>
          <Select
            value={form.access}
            onChange={e => setForm(f => ({ ...f, access: e.target.value }))}
            options={ACCESS_OPTIONS}
          />
        </FormField>
      </FormDrawer>
    </div>
  );
}
