import React, { useState } from 'react';
import { RefreshIcon, ColumnsIcon, SearchIcon, DownloadIcon, ChevronDownIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Badge } from '../../ui/atoms/Badge';
import { Toast, useToast } from '../../ui/atoms/Toast';
import { Toolbar } from '../../ui/molecules/Toolbar';
import { Tabs } from '../../ui/molecules/Tabs';
import { FormDrawer } from '../../ui/molecules/FormDrawer';
import { FormField } from '../../ui/molecules/FormField';
import { Input, Select } from '../../ui/atoms/Input';
import { DataTable } from '../../shared/components/data-table/DataTable';
import { useOsmosTable } from '../../shared/components/data-table/useOsmosTable';
import { createColumnHelper } from '@tanstack/react-table';

const ROWS = [
  { id:1, status:'Active', name:'Age Group',      attrId:'Age_Group',      dataType:'String', advertisers:10, campaigns:45,  userCount:'2K',   userPct:'2K',   createdBy:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', dropdownEnabled:'Yes', visibility:15  },
  { id:2, status:'Active', name:'Gender',          attrId:'Gender',         dataType:'String', advertisers:75, campaigns:235, userCount:'10K',  userPct:'10K',  createdBy:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', dropdownEnabled:'Yes', visibility:100 },
  { id:3, status:'Active', name:'Payment Method',  attrId:'Payment_Method', dataType:'String', advertisers:67, campaigns:312, userCount:'1.2K', userPct:'1.2K', createdBy:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', dropdownEnabled:'Yes', visibility:100 },
  { id:4, status:'Active', name:'CIBIL Score',     attrId:'CIBIL_Score',    dataType:'String', advertisers:9,  campaigns:41,  userCount:'2K',   userPct:'2K',   createdBy:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', dropdownEnabled:'Yes', visibility:15  },
];

const TAB_ITEMS = [
  { id: 'Auction Campaign', label: 'Auction Campaign' },
  { id: 'All', label: 'All' },
];

const colHelper = createColumnHelper();

function AttrIdChip({ id }) {
  return (
    <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 8px', background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: 6, color: 'var(--osmos-fg-muted)' }}>{id}</span>
  );
}

export default function ManageAttributesPage() {
  const [activeTab, setActiveTab]   = useState('Auction Campaign');
  const [search, setSearch]         = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm]             = useState({ id: 'Marital_Status', alias: 'Marital Status', type: 'String', dropdownMode: 'Fixed List', values: '' });
  const { toast, showToast }        = useToast();

  function set(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function handleCreate() {
    showToast('Attribute created successfully');
    setDrawerOpen(false);
  }

  const columns = [
    colHelper.accessor('status',          { header: 'Status',                       cell: info => <Badge status={info.getValue()} /> }),
    colHelper.accessor('name',            { header: 'Attribute Name',               cell: info => <span style={{ fontWeight: 500, color: 'var(--osmos-fg)' }}>{info.getValue()}</span> }),
    colHelper.accessor('attrId',          { header: 'Attribute ID',                 cell: info => <AttrIdChip id={info.getValue()} /> }),
    colHelper.accessor('dataType',        { header: 'Data Type',                    cell: info => <Badge label={info.getValue()} colorScheme="blue" /> }),
    colHelper.accessor('advertisers',     { header: 'Advertisers Using Attributes', cell: info => <span style={{ textAlign: 'center', display: 'block' }}>{info.getValue()}</span> }),
    colHelper.accessor('campaigns',       { header: 'Campaign Count',               cell: info => <span style={{ textAlign: 'center', display: 'block' }}>{info.getValue()}</span> }),
    colHelper.accessor('userCount',       { header: 'User Count' }),
    colHelper.accessor('userPct',         { header: 'User %' }),
    colHelper.accessor('createdBy',       { header: 'Created By' }),
    colHelper.accessor('createdOn',       { header: 'Created On' }),
    colHelper.accessor('dropdownEnabled', { header: 'Dropdown Enabled',             cell: info => <Badge label={info.getValue()} colorScheme={info.getValue() === 'Yes' ? 'green' : 'gray'} /> }),
    colHelper.accessor('visibility',      { header: 'Advertiser Visibility',        cell: info => <span style={{ textAlign: 'center', display: 'block' }}>{info.getValue()}</span> }),
  ];

  const table = useOsmosTable({ data: ROWS, columns });

  return (
    <div style={{ color: 'var(--osmos-fg)', minHeight: '100vh', background: 'var(--osmos-bg-subtle)' }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <Toolbar
        style={{ background: 'var(--osmos-bg)', borderBottom: '1px solid var(--osmos-border)', padding: '10px 24px' }}
        left={
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} items={TAB_ITEMS} variant="pill" />
            <button style={{ height: 30, padding: '0 12px', border: '1px dashed var(--osmos-border)', borderRadius: 20, fontSize: 12, color: 'var(--osmos-fg-subtle)', background: 'var(--osmos-bg)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              + Add a Filter
            </button>
          </>
        }
        right={
          <>
            <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>Attributes ({ROWS.length})</span>
            <Button variant="icon" title="Refresh" onClick={() => showToast('Refreshed')}><RefreshIcon size={14} color="var(--osmos-fg-muted)" /></Button>
            <Button variant="icon" title="Columns" onClick={() => showToast('Column picker coming soon')}><ColumnsIcon size={14} color="var(--osmos-fg-muted)" /></Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 10px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)' }}>
              <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
              <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', width: 100, background: 'transparent' }} />
            </div>
            <Button variant="icon" title="Download" onClick={() => showToast('Downloading...')}><DownloadIcon size={14} color="var(--osmos-fg-muted)" /></Button>
            <Button variant="outline" onClick={() => showToast('Manage user data coming soon')}>Manage User Data</Button>
            <Button onClick={() => setDrawerOpen(true)}>Create Attribute</Button>
          </>
        }
      />

      <div style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 10, marginTop: 16, overflowX: 'auto' }}>
          <DataTable table={table} />
        </div>
      </div>

      <FormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Create Attribute"
        onSubmit={handleCreate}
        submitLabel="Create"
      >
        <FormField label="id" required hint="Help text here">
          <Input value={form.id} maxLength={50} onChange={e => set('id', e.target.value)} />
        </FormField>
        <FormField label="alias" required hint="Help text here">
          <Input value={form.alias} maxLength={50} onChange={e => set('alias', e.target.value)} />
        </FormField>
        <FormField label="Type" required>
          <div style={{ position: 'relative' }}>
            <select
              value={form.type}
              onChange={e => set('type', e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', height: 36, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 28px 0 10px', fontSize: 13, color: 'var(--osmos-fg)', background: 'var(--osmos-bg)', outline: 'none', appearance: 'none', cursor: 'pointer' }}
            >
              {['String', 'Number', 'Boolean', 'Date'].map(o => <option key={o}>{o}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <ChevronDownIcon size={12} color="var(--osmos-fg-muted)" />
            </span>
          </div>
        </FormField>
        <FormField label="Advertiser Visibility" required>
          <button style={{ height: 36, padding: '0 14px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)', fontSize: 13, color: 'var(--osmos-fg-muted)', cursor: 'pointer' }}>
            100 Advertisers
          </button>
        </FormField>
        <FormField label="Enable Dropdown" required>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Fixed List', 'Input Value'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--osmos-fg-muted)', cursor: 'pointer' }}>
                <input type="radio" name="dropdownMode" value={opt} checked={form.dropdownMode === opt} onChange={() => set('dropdownMode', opt)} style={{ accentColor: 'var(--osmos-brand-primary)' }} />
                {opt}
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="Values" required hint="Help text here">
          <Input placeholder="Enter here" value={form.values} onChange={e => set('values', e.target.value)} />
        </FormField>
      </FormDrawer>
    </div>
  );
}
