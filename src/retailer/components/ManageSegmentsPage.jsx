import React, { useState } from 'react';
import { RefreshIcon, ColumnsIcon, SearchIcon, DownloadIcon, PlusIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Badge, TypeBadge } from '../../ui/atoms/Badge';
import { Toast, useToast } from '../../ui/atoms/Toast';
import { Input } from '../../ui/atoms/Input';
import { Toolbar } from '../../ui/molecules/Toolbar';
import { Tabs } from '../../ui/molecules/Tabs';
import { FormDrawer } from '../../ui/molecules/FormDrawer';
import { FormField } from '../../ui/molecules/FormField';
import { Stepper } from '../../ui/molecules/Stepper';

const DATA = [
  { id:1,  status:'Active', name:'Highest Spending Customers',             creator:1, usage:25,  campaigns:68,  type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'16 Jun 25, 01:25 PM', reach:'20K - 30K',  cpmRule:'Yes (20)', cpcRule:'Yes (20)', cpmPct:'20%', cpcPct:'19%', visibility:27  },
  { id:2,  status:'Active', name:'Top Chocolate Purchasing Customers',     creator:1, usage:80,  campaigns:200, type:'User Attributes',  createdBy:'Shailendra Singh Test', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Shantanu Harkut',    lastEditedOn:'16 Jun 25, 01:25 PM', reach:'40K - 50K',  cpmRule:'Yes (50)', cpcRule:'Yes (50)', cpmPct:'5%',  cpcPct:'4%',  visibility:100 },
  { id:3,  status:'Active', name:'Sweets Purchasing Customers',            creator:1, usage:0,   campaigns:0,   type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Yuvaraj',            lastEditedOn:'13 Jun 25, 12:24 PM', reach:'0',          cpmRule:'Yes (0)',  cpcRule:'No',       cpmPct:'10%', cpcPct:'0',   visibility:0   },
  { id:4,  status:'Active', name:'Top Biscuits Purchasing Customers',      creator:2, usage:87,  campaigns:240, type:'User Attributes',  createdBy:'Shailendra Singh Test', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Deepankal personal', lastEditedOn:'13 Jun 25, 12:24 PM', reach:'80K - 100K', cpmRule:'Yes (40)', cpcRule:'Yes (40)', cpmPct:'12%', cpcPct:'17%', visibility:100 },
  { id:5,  status:'Active', name:'Electronics category Customers',         creator:1, usage:0,   campaigns:0,   type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'11 Jun 25, 06:00 PM', lastEditedBy:'Akshay',             lastEditedOn:'11 Jun 25, 06:00 PM', reach:'0',          cpmRule:'Yes (0)',  cpcRule:'No',       cpmPct:'20%', cpcPct:'0',   visibility:0   },
  { id:6,  status:'Active', name:'Home Appliances category Customers',     creator:2, usage:1,   campaigns:2,   type:'User Activity',   createdBy:'Shailendra Singh Test', createdOn:'11 Jun 25, 06:00 PM', lastEditedBy:'Vijay Bang',         lastEditedOn:'11 Jun 25, 06:00 PM', reach:'40K - 50K',  cpmRule:'Yes (1)',  cpcRule:'Yes (1)',  cpmPct:'3%',  cpcPct:'2%',  visibility:'-' },
  { id:7,  status:'Active', name:'Clothing category Customers',            creator:1, usage:1,   campaigns:3,   type:'User Activity',   createdBy:'QA tester',             createdOn:'10 Jun 25, 04:00 PM', lastEditedBy:'Vivek',              lastEditedOn:'10 Jun 25, 04:00 PM', reach:'20K - 30K',  cpmRule:'No',       cpcRule:'Yes (0)',  cpmPct:'0',   cpcPct:'21%', visibility:'-' },
  { id:8,  status:'Active', name:'Sports Equipment category Customers',    creator:2, usage:86,  campaigns:230, type:'Custom List',     createdBy:'QA tester',             createdOn:'10 Jun 25, 04:00 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'10 Jun 25, 04:00 PM', reach:'40K - 50K',  cpmRule:'Yes (35)', cpcRule:'Yes (35)', cpmPct:'8%',  cpcPct:'6%',  visibility:100 },
  { id:9,  status:'Active', name:'Beauty Products category Customers',     creator:1, usage:75,  campaigns:210, type:'Custom List',     createdBy:'QA tester',             createdOn:'20 Dec 24, 04:27 PM', lastEditedBy:'Vivek',              lastEditedOn:'20 Dec 24, 04:27 PM', reach:'20K - 30K',  cpmRule:'Yes (55)', cpcRule:'Yes (55)', cpmPct:'15%', cpcPct:'14%', visibility:100 },
  { id:10, status:'Active', name:'Books and Stationery category Customers',creator:2, usage:1,   campaigns:2,   type:'User Activity',   createdBy:'Fahad',                 createdOn:'17 Dec 24, 06:06 PM', lastEditedBy:'Rahul Waghmare',     lastEditedOn:'17 Dec 24, 06:06 PM', reach:'20K - 30K',  cpmRule:'No',       cpcRule:'No',       cpmPct:'0',   cpcPct:'0',   visibility:'-' },
  { id:11, status:'Active', name:'Gpay Customers',                         creator:1, usage:1,   campaigns:1,   type:'User Attributes',  createdBy:'jeetesh',               createdOn:'14 Nov 24, 07:00 PM', lastEditedBy:'Vivek',              lastEditedOn:'14 Nov 24, 07:00 PM', reach:'30K - 40K',  cpmRule:'Yes (1)',  cpcRule:'Yes (1)',  cpmPct:'25%', cpcPct:'13%', visibility:1   },
];

const TYPE_MAP = {
  'Custom List':     { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  'User Attributes': { bg: 'var(--osmos-brand-violet-muted)', color: '#8b5cf6' },
  'User Activity':   { bg: 'var(--osmos-brand-amber-muted)',  color: 'var(--osmos-brand-amber)' },
};

const TAB_ITEMS = [
  { id: 'auction', label: 'Auction Campaign' },
  { id: 'all',     label: 'All' },
];

const WIZARD_STEPS = [
  { label: 'Segment Creation' },
  { label: 'Eligible Users' },
  { label: 'Inventory Setup' },
];

function RuleBadge({ value }) {
  const isYes = value !== 'No' && value !== '0' && value !== '';
  return (
    <span style={{
      display: 'inline-block', padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: isYes ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)',
      color: isYes ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)',
    }}>
      {value || 'No'}
    </span>
  );
}

function Th({ children, sub, minW = 120, sticky = false }) {
  return (
    <th style={{
      padding: '9px 14px', textAlign: 'left', whiteSpace: 'nowrap',
      fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)',
      background: 'var(--osmos-bg-subtle)',
      textTransform: 'uppercase', letterSpacing: '0.04em',
      borderBottom: '1px solid var(--osmos-border)', minWidth: minW,
      position: sticky ? 'sticky' : 'static',
      left: sticky ? 0 : undefined,
      zIndex: sticky ? 2 : undefined,
    }}>
      {children}
      {sub && <div style={{ fontSize: 10, fontWeight: 400, color: 'var(--osmos-fg-subtle)', marginTop: 1 }}>{sub}</div>}
    </th>
  );
}

function Td({ children, sticky = false }) {
  return (
    <td style={{
      padding: '10px 14px', fontSize: 13, color: 'var(--osmos-fg)', whiteSpace: 'nowrap',
      borderBottom: '1px solid var(--osmos-border)',
      position: sticky ? 'sticky' : 'static',
      left: sticky ? 0 : undefined,
      background: sticky ? 'var(--osmos-bg)' : undefined,
      zIndex: sticky ? 1 : undefined,
    }}>
      {children}
    </td>
  );
}

function CreateSegmentDrawer({ open, onClose, onSuccess }) {
  const [segType, setSegType]   = useState('Custom List');
  const [name, setName]         = useState('');
  const [desc, setDesc]         = useState('');
  const [duration, setDuration] = useState('');
  const [cpmPct, setCpmPct]     = useState('20%');
  const [cpcPct, setCpcPct]     = useState('10%');

  return (
    <FormDrawer
      open={open}
      onClose={onClose}
      title="Create Segment"
      onSubmit={onSuccess}
      submitLabel="Create"
      width={480}
    >
      <div style={{ marginBottom: 24 }}>
        <Stepper steps={WIZARD_STEPS} current={1} />
      </div>

      <FormField label="Create Segment By" required>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {['Custom List', 'User Activity', 'User Attributes'].map(opt => (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--osmos-fg)', cursor: 'pointer' }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${segType === opt ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                background: segType === opt ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {segType === opt && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </span>
              <input type="radio" value={opt} checked={segType === opt} onChange={() => setSegType(opt)} style={{ display: 'none' }} />
              {opt}
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Name" required>
        <div style={{ position: 'relative' }}>
          <Input placeholder="Enter here" maxLength={50} value={name} onChange={e => setName(e.target.value)} />
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--osmos-fg-subtle)', pointerEvents: 'none' }}>{name.length}/50</span>
        </div>
      </FormField>

      <FormField label="Description" required>
        <Input placeholder="Enter here" value={desc} onChange={e => setDesc(e.target.value)} />
      </FormField>

      <FormField label="Segment Duration (Days)" required hint="90 max">
        <Input type="number" placeholder="Enter here" value={duration} onChange={e => setDuration(e.target.value)} />
      </FormField>

      <FormField label="CPM Premium %" required>
        <div style={{ position: 'relative' }}>
          <Input placeholder="Enter here" maxLength={50} value={cpmPct} onChange={e => setCpmPct(e.target.value)} />
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--osmos-fg-subtle)', pointerEvents: 'none' }}>{cpmPct.length}/50</span>
        </div>
      </FormField>

      <FormField label="CPC Premium %" required>
        <div style={{ position: 'relative' }}>
          <Input placeholder="Enter here" maxLength={50} value={cpcPct} onChange={e => setCpcPct(e.target.value)} />
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--osmos-fg-subtle)', pointerEvents: 'none' }}>{cpcPct.length}/50</span>
        </div>
      </FormField>

      <FormField label="Advertiser Visibility" required>
        <button style={{ padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, border: '1px solid var(--osmos-brand-primary)', color: 'var(--osmos-brand-primary)', background: 'var(--osmos-brand-primary-muted)', cursor: 'pointer' }}>
          Choose Advertisers
        </button>
      </FormField>
    </FormDrawer>
  );
}

export default function ManageSegmentsPage() {
  const [activeTab, setActiveTab] = useState('auction');
  const [search, setSearch]       = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast, showToast }      = useToast();

  const filtered = DATA.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreate() {
    setDrawerOpen(false);
    showToast('Segment created successfully');
  }

  return (
    <div style={{ color: 'var(--osmos-fg)', display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--osmos-bg-subtle)' }}>
      <Toast {...toast} />

      <div style={{ flex: 1, margin: '0 20px 20px', background: 'var(--osmos-bg)', borderRadius: 10, border: '1px solid var(--osmos-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Toolbar
          left={
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} items={TAB_ITEMS} variant="pill" />
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px dashed var(--osmos-border)', background: 'var(--osmos-bg)', color: 'var(--osmos-fg-muted)', cursor: 'pointer' }}>
                <PlusIcon size={12} color="var(--osmos-fg-muted)" />
                Add a Filter
              </button>
            </>
          }
          right={
            <>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>
                Audience Segments (13)
              </span>
              <Button variant="icon" title="Refresh" onClick={() => showToast('Refreshed')}><RefreshIcon size={14} /></Button>
              <Button variant="icon" title="Columns" onClick={() => showToast('Column picker coming soon')}><ColumnsIcon size={14} /></Button>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: 8, display: 'flex', pointerEvents: 'none' }}>
                  <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
                </span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                  style={{ paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6, borderRadius: 6, border: '1px solid var(--osmos-border)', fontSize: 12, color: 'var(--osmos-fg)', outline: 'none', width: 150, background: 'var(--osmos-bg)' }}
                />
              </div>
              <Button variant="icon" title="Download" onClick={() => showToast('Downloading...')}><DownloadIcon size={14} /></Button>
              <Button onClick={() => setDrawerOpen(true)}>+ Create Segment</Button>
            </>
          }
        />

        <div style={{ flex: 1, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1600 }}>
            <thead>
              <tr>
                <Th minW={90} sticky>Status</Th>
                <Th minW={220}>Segment Name</Th>
                <Th minW={80}>Creator</Th>
                <Th minW={130} sub="At Present">Usage (Advertisers)</Th>
                <Th minW={110}>Campaign Count</Th>
                <Th minW={130}>Segment Type</Th>
                <Th minW={160}>Created By</Th>
                <Th minW={160}>Created On</Th>
                <Th minW={160}>Last Edited by</Th>
                <Th minW={160}>Last Edited On</Th>
                <Th minW={130} sub="At Present">Estimated Reach</Th>
                <Th minW={190}>CPM Rule Applied (Advertisers)</Th>
                <Th minW={190}>CPC Rule Applied (Advertisers)</Th>
                <Th minW={110}>CPM Premium %</Th>
                <Th minW={110}>CPC Premium %</Th>
                <Th minW={140}>Advertiser Visibility</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={16} style={{ padding: 40, textAlign: 'center', fontSize: 13, color: 'var(--osmos-fg-subtle)' }}>
                    No segments found.
                  </td>
                </tr>
              )}
              {filtered.map(row => (
                <tr key={row.id}>
                  <Td sticky><Badge status={row.status} /></Td>
                  <Td><span style={{ fontWeight: 500, color: 'var(--osmos-fg)' }}>{row.name}</span></Td>
                  <Td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', fontSize: 11, fontWeight: 700 }}>
                      {row.creator}
                    </span>
                  </Td>
                  <Td>{row.usage}</Td>
                  <Td>{row.campaigns}</Td>
                  <Td><TypeBadge type={row.type} colorMap={TYPE_MAP} /></Td>
                  <Td><span style={{ color: 'var(--osmos-fg-muted)' }}>{row.createdBy}</span></Td>
                  <Td><span style={{ color: 'var(--osmos-fg-muted)' }}>{row.createdOn}</span></Td>
                  <Td><span style={{ color: 'var(--osmos-fg-muted)' }}>{row.lastEditedBy}</span></Td>
                  <Td><span style={{ color: 'var(--osmos-fg-muted)' }}>{row.lastEditedOn}</span></Td>
                  <Td>{row.reach}</Td>
                  <Td><RuleBadge value={row.cpmRule} /></Td>
                  <Td><RuleBadge value={row.cpcRule} /></Td>
                  <Td>{row.cpmPct}</Td>
                  <Td>{row.cpcPct}</Td>
                  <Td>{row.visibility === '-' ? <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span> : row.visibility}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateSegmentDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={handleCreate}
      />
    </div>
  );
}
