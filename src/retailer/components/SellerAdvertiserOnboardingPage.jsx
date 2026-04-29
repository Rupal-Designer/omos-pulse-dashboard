import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

/* ── Mock data ─────────────────────────────────────────────────── */
const INITIAL_DATA = [
  { advertiserId: 'OS_M002', merchantId: 'M002', advertiserName: 'Sports World',          retentionStatus: 'Active',   persona: 'Platinum', productSyncedViaFeed: 1240, productSyncedViaRule: 320, onboardedOn: '12 Jan 25', onboardedBy: 'Admin', spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click', sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click', accountManagerName: 'John Smith',        accountManagerEmail: 'johnsmith@example.com',    advertiserUsersCount: 7,  advertiserSegmentsCount: 5 },
  { advertiserId: 'OS_M003', merchantId: 'M003', advertiserName: 'Tech Retailers',        retentionStatus: 'Active',   persona: 'Gold',     productSyncedViaFeed: 890,  productSyncedViaRule: 210, onboardedOn: '15 Jan 25', onboardedBy: 'Admin', spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click', sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click', accountManagerName: 'James Taylor',      accountManagerEmail: 'sarahconnor@example.com',  advertiserUsersCount: 12, advertiserSegmentsCount: 10 },
  { advertiserId: 'OS_M004', merchantId: 'M004', advertiserName: 'Gourmet Grocery',       retentionStatus: 'Active',   persona: 'Silver',   productSyncedViaFeed: 560,  productSyncedViaRule: 140, onboardedOn: '20 Jan 25', onboardedBy: 'Admin', spaAttributionType: 'View-Through',  spaAttributionWindow: '7 Days View',  sdaAttributionType: 'View-Through',  sdaAttributionWindow: '7 Days View',  accountManagerName: 'Sophia Brown',      accountManagerEmail: 'emilyclark@example.com',   advertiserUsersCount: 10, advertiserSegmentsCount: 6 },
  { advertiserId: 'OS_M005', merchantId: 'M006', advertiserName: 'Home Essentials Mart',  retentionStatus: 'Inactive', persona: 'Gold',     productSyncedViaFeed: 720,  productSyncedViaRule: 180, onboardedOn: '22 Jan 25', onboardedBy: 'Ops',   spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click', sdaAttributionType: 'View-Through',  sdaAttributionWindow: '7 Days View',  accountManagerName: 'Olivia Martinez',   accountManagerEmail: 'tombrown@example.com',     advertiserUsersCount: 13, advertiserSegmentsCount: 11 },
  { advertiserId: 'OS_M006', merchantId: 'M007', advertiserName: 'Electronics Hub',       retentionStatus: 'Active',   persona: 'Platinum', productSyncedViaFeed: 1100, productSyncedViaRule: 290, onboardedOn: '25 Jan 25', onboardedBy: 'Admin', spaAttributionType: 'View-Through',  spaAttributionWindow: '7 Days View',  sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click', accountManagerName: 'Emily Davis',       accountManagerEmail: 'davidjohnson@example.com', advertiserUsersCount: 8,  advertiserSegmentsCount: 9 },
  { advertiserId: 'OS_M007', merchantId: 'M009', advertiserName: 'Beauty Boutique',       retentionStatus: 'Active',   persona: 'Silver',   productSyncedViaFeed: 430,  productSyncedViaRule: 100, onboardedOn: '28 Jan 25', onboardedBy: 'Ops',   spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click', sdaAttributionType: 'View-Through',  sdaAttributionWindow: '7 Days View',  accountManagerName: 'Isabella Anderson', accountManagerEmail: 'michaeljones@example.com', advertiserUsersCount: 11, advertiserSegmentsCount: 7 },
  { advertiserId: 'OS_M008', merchantId: 'M008', advertiserName: 'Garden Supplies Co',    retentionStatus: 'Inactive', persona: 'Gold',     productSyncedViaFeed: 670,  productSyncedViaRule: 160, onboardedOn: '01 Feb 25', onboardedBy: 'Admin', spaAttributionType: 'View-Through',  spaAttributionWindow: '7 Days View',  sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click', accountManagerName: 'Michael Johnson',   accountManagerEmail: 'lisawhite@example.com',    advertiserUsersCount: 9,  advertiserSegmentsCount: 12 },
  { advertiserId: 'OS_M009', merchantId: 'M010', advertiserName: 'Pet Paradise',          retentionStatus: 'Active',   persona: 'Silver',   productSyncedViaFeed: 310,  productSyncedViaRule: 80,  onboardedOn: '03 Feb 25', onboardedBy: 'Ops',   spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click', sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click', accountManagerName: 'Ethan Thomas',      accountManagerEmail: 'kevinsmith@example.com',   advertiserUsersCount: 14, advertiserSegmentsCount: 5 },
  { advertiserId: 'OS_M010', merchantId: 'M020', advertiserName: 'Fitness Equipment Store',retentionStatus: 'Active',  persona: 'Platinum', productSyncedViaFeed: 980,  productSyncedViaRule: 250, onboardedOn: '05 Feb 25', onboardedBy: 'Admin', spaAttributionType: 'View-Through',  spaAttributionWindow: '7 Days View',  sdaAttributionType: 'View-Through',  sdaAttributionWindow: '7 Days View',  accountManagerName: 'Liam Wilson',       accountManagerEmail: 'janedoe@example.com',      advertiserUsersCount: 7,  advertiserSegmentsCount: 8 },
];

const SEGMENTS_DATA = [
  { name: 'New Segment',   visibility: 'Everyone', createdBy: 'John Smith',    createdOn: '03 Feb 26, 11:03 AM', lastUpdate: '05 Feb 26, 01:45 PM' },
  { name: 'All Brands',    visibility: 'Everyone', createdBy: 'Michael Brown', createdOn: '05 Feb 26, 01:45 PM', lastUpdate: '05 Feb 26, 01:45 PM' },
  { name: 'New Brands',    visibility: 'Everyone', createdBy: 'Alice Johnson', createdOn: '03 Feb 26, 11:03 AM', lastUpdate: '05 Feb 26, 01:45 PM' },
  { name: 'All Segments',  visibility: 'Everyone', createdBy: 'Emma Davis',    createdOn: '06 Feb 26, 02:30 PM', lastUpdate: '05 Feb 26, 01:45 PM' },
  { name: 'Test Campaign', visibility: 'Everyone', createdBy: 'John Smith',    createdOn: '04 Feb 26, 12:15 PM', lastUpdate: '05 Feb 26, 01:45 PM' },
];

const ATTRIBUTION_TYPES   = ['Click-Through', 'View-Through', 'View-Click-Through'];
const ATTRIBUTION_WINDOWS = ['7 Days Click', '7 Days View', '14 Days Click', '14 Days View', '30 Days Click', '30 Days View'];
const PERSONAS            = ['Platinum', 'Gold', 'Silver'];

/* ── SVG icon helper ──────────────────────────────────────────── */
function Ico({ d, size = 14, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

/* ── Shared button styles ─────────────────────────────────────── */
const btnBase = {
  display: 'flex', alignItems: 'center', gap: 5,
  border: '1px solid var(--osmos-border)', borderRadius: 6,
  padding: '5px 10px', cursor: 'pointer', fontSize: 12,
  fontFamily: "'Open Sans', sans-serif", background: 'var(--osmos-bg)',
  color: 'var(--osmos-fg-muted)',
};
const btnPrimary = {
  ...btnBase, background: 'var(--osmos-brand-primary)',
  color: '#fff', border: '1px solid var(--osmos-brand-primary)',
};

/* ── Persona badge ───────────────────────────────────────────── */
const PERSONA_COLOR = { Platinum: '#6366f1', Gold: '#f59e0b', Silver: '#64748b' };
function PersonaBadge({ persona }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
      background: PERSONA_COLOR[persona] + '18',
      color: PERSONA_COLOR[persona],
      border: `1px solid ${PERSONA_COLOR[persona]}40`,
    }}>{persona}</span>
  );
}

/* ── Status badge ─────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const active = status === 'Active';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: active ? '#22c55e' : '#ef4444', flexShrink: 0,
      }} />
      <span style={{ color: active ? '#15803d' : '#dc2626', fontWeight: 500 }}>{status}</span>
    </span>
  );
}

/* ── Inline editable select ───────────────────────────────────── */
function InlineSelect({ value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        border: '1px solid var(--osmos-border)', borderRadius: 4,
        padding: '2px 6px', fontSize: 11, background: 'var(--osmos-bg)',
        color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif",
        cursor: 'pointer', outline: 'none',
      }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/* ── Modal wrapper ───────────────────────────────────────────── */
function Modal({ title, onClose, children, footer, width = 420 }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--osmos-bg)', borderRadius: 10, width, maxWidth: '95vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', borderBottom: '1px solid var(--osmos-border)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2 }}>
            <Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={16} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '18px 18px 8px' }}>{children}</div>
        {/* Footer */}
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 18px 16px', borderTop: '1px solid var(--osmos-border)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Field input ─────────────────────────────────────────────── */
function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 5 }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, maxLength, type = 'text' }) {
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} maxLength={maxLength}
      style={{
        width: '100%', boxSizing: 'border-box', border: '1px solid var(--osmos-border)',
        borderRadius: 6, padding: '7px 10px', fontSize: 12, outline: 'none',
        fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)',
      }}
    />
  );
}

/* ── Drawer ──────────────────────────────────────────────────── */
function Drawer({ title, subtitle, onClose, children, footer, width = 560 }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      display: 'flex', justifyContent: 'flex-end', zIndex: 1000,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        width, maxWidth: '95vw', background: 'var(--osmos-bg)', height: '100%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>{title}</div>
              {subtitle && <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 2 }}>{subtitle}</div>}
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 4 }}>
              <Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={18} />
            </button>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>{children}</div>
        {/* Footer */}
        {footer && (
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function SellerAdvertiserOnboardingPage() {
  const [data, setData]                   = useState(INITIAL_DATA);
  const [activeTab, setActiveTab]         = useState('All');
  const [search, setSearch]               = useState('');

  // Modals
  const [amModal, setAmModal]             = useState(null);  // { row }
  const [amName, setAmName]               = useState('');
  const [amEmail, setAmEmail]             = useState('');

  const [personaModal, setPersonaModal]   = useState(null);  // { row, newPersona }
  const [attrModal, setAttrModal]         = useState(null);  // { row, field, newVal }
  const [daysClick, setDaysClick]         = useState('7');
  const [daysView, setDaysView]           = useState('1');

  const [createOpen, setCreateOpen]       = useState(false);
  const [newMerchantId, setNewMerchantId] = useState('');
  const [newAdvName, setNewAdvName]       = useState('');
  const [newPersona, setNewPersona]       = useState('Gold');
  const [newAmName, setNewAmName]         = useState('');
  const [newAmEmail, setNewAmEmail]       = useState('');

  // Drawers
  const [segDrawer, setSegDrawer]         = useState(null);  // row
  const [bulkDrawer, setBulkDrawer]       = useState(false);

  // Bulk upload state
  const [dragOver, setDragOver]           = useState(false);

  // Toast
  const { toast, showToast } = useToast();

  const TH = {
    padding: '9px 12px', textAlign: 'left', fontWeight: 600,
    color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap',
    background: 'var(--osmos-bg-subtle)', borderBottom: '2px solid var(--osmos-border)',
    position: 'sticky', top: 0,
  };
  const TD = {
    padding: '9px 12px', fontSize: 12, color: 'var(--osmos-fg)',
    borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap',
  };

  const filtered = data.filter(r =>
    (activeTab === 'All' || r.advertiserName.includes(activeTab)) &&
    (r.advertiserName.toLowerCase().includes(search.toLowerCase()) ||
     r.merchantId.toLowerCase().includes(search.toLowerCase()) ||
     r.advertiserId.toLowerCase().includes(search.toLowerCase()))
  );

  function handlePersonaChange(row, val) {
    if (val === row.persona) return;           // no change — skip modal
    setPersonaModal({ row, newPersona: val });
  }
  function confirmPersonaChange() {
    setData(d => d.map(r => r.advertiserId === personaModal.row.advertiserId
      ? { ...r, persona: personaModal.newPersona } : r));
    setPersonaModal(null);
    showToast('Persona updated successfully');
  }

  // Attribution TYPE → confirmation modal; WINDOW → direct update
  function handleAttrTypeChange(row, field, newVal) {
    if (newVal === row[field]) return;
    setAttrModal({ row, field, newVal });
    setDaysClick('7'); setDaysView('1');
  }
  function handleAttrWindowChange(row, field, newVal) {
    setData(d => d.map(r => r.advertiserId === row.advertiserId
      ? { ...r, [field]: newVal } : r));
    showToast('Attribution window updated');
  }
  function confirmAttrChange() {
    setData(d => d.map(r => r.advertiserId === attrModal.row.advertiserId
      ? { ...r, [attrModal.field]: attrModal.newVal } : r));
    setAttrModal(null);
    showToast('Attribution updated successfully');
  }

  function openAmModal(row) {
    setAmName(row.accountManagerName);
    setAmEmail(row.accountManagerEmail);
    setAmModal({ row });
  }
  function saveAmChanges() {
    if (!amName.trim() || !amEmail.trim()) return;
    setData(d => d.map(r => r.advertiserId === amModal.row.advertiserId
      ? { ...r, accountManagerName: amName, accountManagerEmail: amEmail } : r));
    setAmModal(null);
    showToast('Account manager updated');
  }

  function handleCreateAdvertiser() {
    if (!newMerchantId.trim() || !newAdvName.trim()) return;
    const id = `OS_${newMerchantId.trim()}`;
    const newRow = {
      advertiserId: id, merchantId: newMerchantId.trim(),
      advertiserName: newAdvName.trim(), retentionStatus: 'Active',
      persona: newPersona, productSyncedViaFeed: 0, productSyncedViaRule: 0,
      onboardedOn: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' }),
      onboardedBy: 'Admin',
      spaAttributionType: 'Click-Through', spaAttributionWindow: '7 Days Click',
      sdaAttributionType: 'Click-Through', sdaAttributionWindow: '7 Days Click',
      accountManagerName: newAmName.trim() || '—',
      accountManagerEmail: newAmEmail.trim() || '—',
      advertiserUsersCount: 0, advertiserSegmentsCount: 0,
    };
    setData(d => [newRow, ...d]);
    setCreateOpen(false);
    setNewMerchantId(''); setNewAdvName(''); setNewPersona('Gold');
    setNewAmName(''); setNewAmEmail('');
    showToast(`${newAdvName} onboarded successfully`);
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>

      {/* Info banner */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        background: 'var(--osmos-brand-primary-muted)', border: '1px solid var(--osmos-border)', borderRadius: 8,
        padding: '10px 14px', marginBottom: 16, fontSize: 12, color: 'var(--osmos-brand-primary)',
      }}>
        <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={15} stroke="var(--osmos-brand-primary)" />
        <span>
          Onboard advertisers, configure catalog rules, update configuration settings (persona, attribution, account manager) and manage bulk operations.{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Learn more</span>
        </span>
      </div>

      {/* Card */}
      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid var(--osmos-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden' }}>
              {['All', 'Auction Campaign'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: '5px 12px', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: activeTab === t ? 700 : 400,
                  background: activeTab === t ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
                  color: activeTab === t ? '#fff' : 'var(--osmos-fg-muted)',
                  fontFamily: "'Open Sans', sans-serif",
                  borderRight: t === 'All' ? '1px solid var(--osmos-border)' : 'none',
                }}>{t}</button>
              ))}
            </div>
            {/* Add filter */}
            <button style={btnBase}>
              <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={11} sw={2.5} />
              Add a Filter
            </button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontWeight: 500 }}>
              {filtered.length} Advertisers Onboarded
            </span>
            {/* Refresh */}
            <button style={{ ...btnBase, padding: '5px 8px' }}>
              <Ico d={<><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>} size={13} />
            </button>
            {/* Columns */}
            <button style={btnBase}>
              <Ico d={<><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></>} size={13} />
              Columns
            </button>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 10px', background: 'var(--osmos-bg)' }}>
              <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" size={13} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search Merchant ID"
                style={{ border: 'none', outline: 'none', fontSize: 12, fontFamily: "'Open Sans', sans-serif", width: 150, color: 'var(--osmos-fg)' }}
              />
            </div>
            {/* Download */}
            <button style={{ ...btnBase, padding: '5px 8px' }}>
              <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} size={13} />
            </button>
            {/* Bulk onboarding */}
            <button onClick={() => setBulkDrawer(true)} style={btnBase}>
              <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>} size={13} />
              Bulk Onboarding
            </button>
            {/* Create advertiser */}
            <button onClick={() => setCreateOpen(true)} style={btnPrimary}>
              <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={12} stroke="#fff" />
              Create Advertiser
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                <th style={TH}>Advertiser ID</th>
                <th style={TH}>Merchant ID</th>
                <th style={TH}>Advertiser Name</th>
                <th style={TH}>Retention Status</th>
                <th style={TH}>Persona</th>
                <th style={{ ...TH, textAlign: 'right' }}>Synced via Feed</th>
                <th style={{ ...TH, textAlign: 'right' }}>Synced via Rule</th>
                <th style={TH}>Onboarded On</th>
                <th style={TH}>Onboarded By</th>
                <th style={TH}>SPA Attr. Type</th>
                <th style={TH}>SPA Attr. Window</th>
                <th style={TH}>SDA Attr. Type</th>
                <th style={TH}>SDA Attr. Window</th>
                <th style={TH}>Account Manager</th>
                <th style={TH}>AM Email</th>
                <th style={{ ...TH, textAlign: 'right' }}>Users</th>
                <th style={{ ...TH, textAlign: 'right' }}>Segments</th>
                <th style={TH}>Catalog Rules</th>
                <th style={{ ...TH, textAlign: 'center' }}>History</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.advertiserId}
                  style={{ background: i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)'}
                >
                  <td style={{ ...TD, fontWeight: 600, color: 'var(--osmos-brand-primary)' }}>{row.advertiserId}</td>
                  <td style={TD}>{row.merchantId}</td>
                  <td style={{ ...TD, fontWeight: 500 }}>{row.advertiserName}</td>
                  <td style={TD}><StatusBadge status={row.retentionStatus} /></td>
                  <td style={TD}>
                    <InlineSelect
                      value={row.persona} options={PERSONAS}
                      onChange={v => handlePersonaChange(row, v)}
                    />
                  </td>
                  <td style={{ ...TD, textAlign: 'right' }}>{row.productSyncedViaFeed.toLocaleString()}</td>
                  <td style={{ ...TD, textAlign: 'right' }}>{row.productSyncedViaRule.toLocaleString()}</td>
                  <td style={{ ...TD, color: 'var(--osmos-fg-muted)' }}>{row.onboardedOn}</td>
                  <td style={{ ...TD, color: 'var(--osmos-fg-muted)' }}>{row.onboardedBy}</td>
                  <td style={TD}>
                    <InlineSelect
                      value={row.spaAttributionType} options={ATTRIBUTION_TYPES}
                      onChange={v => handleAttrTypeChange(row, 'spaAttributionType', v)}
                    />
                  </td>
                  <td style={TD}>
                    <InlineSelect
                      value={row.spaAttributionWindow} options={ATTRIBUTION_WINDOWS}
                      onChange={v => handleAttrWindowChange(row, 'spaAttributionWindow', v)}
                    />
                  </td>
                  <td style={TD}>
                    <InlineSelect
                      value={row.sdaAttributionType} options={ATTRIBUTION_TYPES}
                      onChange={v => handleAttrTypeChange(row, 'sdaAttributionType', v)}
                    />
                  </td>
                  <td style={TD}>
                    <InlineSelect
                      value={row.sdaAttributionWindow} options={ATTRIBUTION_WINDOWS}
                      onChange={v => handleAttrWindowChange(row, 'sdaAttributionWindow', v)}
                    />
                  </td>
                  <td style={TD}>
                    <button onClick={() => openAmModal(row)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      color: 'var(--osmos-brand-primary)', fontFamily: "'Open Sans', sans-serif",
                      fontSize: 12, fontWeight: 500, textDecoration: 'underline',
                    }}>{row.accountManagerName}</button>
                  </td>
                  <td style={{ ...TD, color: 'var(--osmos-fg-muted)' }}>{row.accountManagerEmail}</td>
                  <td style={{ ...TD, textAlign: 'right' }}>{row.advertiserUsersCount}</td>
                  <td style={{ ...TD, textAlign: 'right' }}>
                    <button onClick={() => setSegDrawer(row)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      color: 'var(--osmos-brand-primary)', fontFamily: "'Open Sans', sans-serif",
                      fontSize: 12, fontWeight: 600, textDecoration: 'underline',
                    }}>{row.advertiserSegmentsCount}</button>
                  </td>
                  <td style={TD}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--osmos-brand-primary)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", textDecoration: 'underline' }}>Add</button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--osmos-fg-muted)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", textDecoration: 'underline' }}>Edit</button>
                    </div>
                  </td>
                  <td style={{ ...TD, textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)' }}>
                      <Ico d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: '10px 14px', borderTop: '1px solid var(--osmos-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--osmos-fg-muted)',
        }}>
          <span>Showing {filtered.length} of {data.length} advertisers</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1].map(p => (
              <button key={p} style={{
                width: 28, height: 28, border: '1px solid var(--osmos-border)', borderRadius: 4,
                background: 'var(--osmos-brand-primary)', color: '#fff',
                cursor: 'pointer', fontSize: 12, fontFamily: "'Open Sans', sans-serif",
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Edit Account Manager Modal ── */}
      {amModal && (
        <Modal
          title="Edit Account Manager Details"
          onClose={() => setAmModal(null)}
          footer={<>
            <button onClick={() => setAmModal(null)} style={btnBase}>Cancel</button>
            <button onClick={saveAmChanges} style={btnPrimary}>Save Changes</button>
          </>}
        >
          <Field label="Account Manager Name" required>
            <TextInput value={amName} onChange={setAmName} placeholder="John Smith" maxLength={50} />
            <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 3, textAlign: 'right' }}>{amName.length}/50</div>
          </Field>
          <Field label="Account Manager Email" required>
            <TextInput value={amEmail} onChange={setAmEmail} placeholder="john@example.com" maxLength={50} />
            <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 3, textAlign: 'right' }}>{amEmail.length}/50</div>
          </Field>
        </Modal>
      )}

      {/* ── Confirm Persona Change Modal ── */}
      {personaModal && (
        <Modal
          title="Confirm Persona Change"
          onClose={() => setPersonaModal(null)}
          footer={<>
            <button onClick={() => setPersonaModal(null)} style={btnBase}>Cancel</button>
            <button onClick={confirmPersonaChange} style={btnPrimary}>Confirm</button>
          </>}
        >
          <div style={{ fontSize: 13, color: 'var(--osmos-fg)', marginBottom: 6 }}>
            <strong>{personaModal.row.advertiserName}</strong> — Persona change:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <PersonaBadge persona={personaModal.row.persona} />
            <Ico d={<polyline points="9 18 15 12 9 6"/>} size={16} stroke="var(--osmos-fg-muted)" />
            <PersonaBadge persona={personaModal.newPersona} />
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', background: 'rgba(245,166,35,0.08)', borderRadius: 6, border: '1px solid rgba(245,166,35,0.3)', fontSize: 12, color: 'var(--osmos-brand-amber)' }}>
            This change will affect all campaigns and billing settings for this advertiser.
          </div>
        </Modal>
      )}

      {/* ── Confirm Attribution Change Modal ── */}
      {attrModal && (
        <Modal
          title="Confirm Attribution Change"
          onClose={() => setAttrModal(null)}
          width={460}
          footer={<>
            <button onClick={() => setAttrModal(null)} style={btnBase}>Cancel</button>
            <button onClick={confirmAttrChange} style={btnPrimary}>Confirm</button>
          </>}
        >
          <div style={{ fontSize: 13, color: 'var(--osmos-fg)', marginBottom: 14 }}>
            <strong>{attrModal.row.advertiserName}</strong> — Attribution:{' '}
            <span style={{ color: 'var(--osmos-fg-muted)' }}>{attrModal.row[attrModal.field]}</span>
            {' → '}
            <strong style={{ color: 'var(--osmos-brand-primary)' }}>{attrModal.newVal}</strong>
          </div>
          <Field label="Days Click" required>
            <TextInput value={daysClick} onChange={setDaysClick} type="number" placeholder="7" />
            <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 3 }}>Select between 1 to 07 days</div>
          </Field>
          <Field label="Days View" required>
            <TextInput value={daysView} onChange={setDaysView} type="number" placeholder="1" />
            <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 3 }}>Select between 1 to 07 days</div>
          </Field>
        </Modal>
      )}

      {/* ── Segments Drawer ── */}
      {segDrawer && (
        <Drawer
          title={`Segments (0${segDrawer.advertiserSegmentsCount})`}
          subtitle={segDrawer.advertiserName}
          onClose={() => setSegDrawer(null)}
          width={640}
          footer={<>
            <button onClick={() => setSegDrawer(null)} style={btnBase}>Cancel</button>
            <button onClick={() => setSegDrawer(null)} style={btnBase}>Back</button>
          </>}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                {['Segment Name', 'Visibility', 'Created By', 'Created On', 'Last Update', ''].map(h => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: 'var(--osmos-fg-muted)', borderBottom: '2px solid var(--osmos-border)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SEGMENTS_DATA.map((seg, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '9px 10px', fontWeight: 500, color: 'var(--osmos-fg)' }}>{seg.name}</td>
                  <td style={{ padding: '9px 10px', color: 'var(--osmos-fg-muted)' }}>{seg.visibility}</td>
                  <td style={{ padding: '9px 10px', color: 'var(--osmos-fg-muted)' }}>{seg.createdBy}</td>
                  <td style={{ padding: '9px 10px', color: 'var(--osmos-fg-muted)', fontSize: 11 }}>{seg.createdOn}</td>
                  <td style={{ padding: '9px 10px', color: 'var(--osmos-fg-muted)', fontSize: 11 }}>{seg.lastUpdate}</td>
                  <td style={{ padding: '9px 10px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-brand-primary)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", textDecoration: 'underline' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Drawer>
      )}

      {/* ── Create Advertiser Drawer ── */}
      {createOpen && (
        <Drawer
          title="Create Advertiser"
          onClose={() => setCreateOpen(false)}
          width={480}
          footer={<>
            <button onClick={() => setCreateOpen(false)} style={btnBase}>Cancel</button>
            <button
              onClick={handleCreateAdvertiser}
              style={{ ...btnPrimary, opacity: (!newMerchantId.trim() || !newAdvName.trim()) ? 0.5 : 1 }}
              disabled={!newMerchantId.trim() || !newAdvName.trim()}
            >
              Create Advertiser
            </button>
          </>}
        >
          <Field label="Merchant ID" required>
            <TextInput value={newMerchantId} onChange={setNewMerchantId} placeholder="e.g. M025" />
          </Field>
          <Field label="Advertiser Name" required>
            <TextInput value={newAdvName} onChange={setNewAdvName} placeholder="e.g. Sports World" />
          </Field>
          <Field label="Persona">
            <select
              value={newPersona} onChange={e => setNewPersona(e.target.value)}
              style={{ width: '100%', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '7px 10px', fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none' }}
            >
              {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Account Manager Name">
            <TextInput value={newAmName} onChange={setNewAmName} placeholder="John Smith" maxLength={50} />
          </Field>
          <Field label="Account Manager Email">
            <TextInput value={newAmEmail} onChange={setNewAmEmail} placeholder="john@example.com" maxLength={50} />
          </Field>
          <div style={{ padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, fontSize: 12, color: '#15803d', marginTop: 4 }}>
            The advertiser will be onboarded with default SPA and SDA attribution settings. These can be updated from the table.
          </div>
        </Drawer>
      )}

      {/* ── Bulk Onboarding Drawer ── */}
      {bulkDrawer && (
        <Drawer
          title="Bulk Upload — Advertiser Persona Allocation"
          subtitle="All Merchants"
          onClose={() => setBulkDrawer(false)}
          width={500}
          footer={<>
            <button onClick={() => setBulkDrawer(false)} style={btnBase}>Cancel</button>
          </>}
        >
          {/* Download template */}
          <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 16, border: '1px solid var(--osmos-border)' }}>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg)', fontWeight: 600, marginBottom: 4 }}>Download Template</div>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginBottom: 10 }}>
              Excel template with sample data. Get the template file with the correct format and structure.
            </div>
            <button style={{ ...btnBase, color: 'var(--osmos-brand-primary)', borderColor: 'var(--osmos-brand-primary)' }}>
              <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} size={13} stroke="var(--osmos-brand-primary)" />
              Download
            </button>
          </div>

          {/* File upload dropzone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); }}
            style={{
              border: `2px dashed ${dragOver ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
              borderRadius: 8, padding: '32px 20px', textAlign: 'center',
              background: dragOver ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
              marginBottom: 20, cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>} size={28} stroke="var(--osmos-fg-subtle)" />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginTop: 10 }}>Upload Your File</div>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 4 }}>Upload your .xlsx file here</div>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginTop: 4 }}>Up to 1,000 campaigns can be created at once</div>
          </div>

          {/* How it works */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 12 }}>How it works?</div>
            {[
              'Click on the "Download file for all merchants" link above to download the persona information for all merchants.',
              'Update the persona for the merchants you want to update in the file.',
              'Save the file.',
              'Upload the file back to apply the changes.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--osmos-brand-primary)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
              </div>
            ))}
          </div>
        </Drawer>
      )}

      <Toast {...toast} />
    </div>
  );
}
