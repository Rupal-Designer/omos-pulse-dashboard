import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

const PAYMENT_TYPES = ['Prepaid', 'Postpaid', 'Credit'];
const STATUSES = ['Active', 'Inactive', 'Suspended'];

const INITIAL_DATA = [
  { id: 'OS_M002', name: 'Sports World', paymentType: 'Prepaid', status: 'Active', multiWallet: true, autoSwipe: true, walletCount: 3, topUpBalance: '₹4,20,000' },
  { id: 'OS_M003', name: 'Tech Retailers', paymentType: 'Postpaid', status: 'Active', multiWallet: false, autoSwipe: false, walletCount: 1, topUpBalance: '₹2,80,500' },
  { id: 'OS_M004', name: 'Gourmet Grocery', paymentType: 'Prepaid', status: 'Active', multiWallet: true, autoSwipe: true, walletCount: 2, topUpBalance: '₹60,000' },
  { id: 'OS_M005', name: 'Home Essentials Mart', paymentType: 'Credit', status: 'Inactive', multiWallet: false, autoSwipe: false, walletCount: 1, topUpBalance: '₹0' },
  { id: 'OS_M006', name: 'Electronics Hub', paymentType: 'Prepaid', status: 'Active', multiWallet: true, autoSwipe: true, walletCount: 4, topUpBalance: '₹8,90,000' },
  { id: 'OS_M007', name: 'Beauty Boutique', paymentType: 'Postpaid', status: 'Active', multiWallet: false, autoSwipe: true, walletCount: 1, topUpBalance: '₹1,20,000' },
  { id: 'OS_M008', name: 'Garden Supplies Co', paymentType: 'Credit', status: 'Suspended', multiWallet: false, autoSwipe: false, walletCount: 1, topUpBalance: '₹0' },
  { id: 'OS_M009', name: 'Pet Paradise', paymentType: 'Prepaid', status: 'Active', multiWallet: false, autoSwipe: true, walletCount: 1, topUpBalance: '₹75,000' },
  { id: 'OS_M010', name: 'Fitness Equipment Store', paymentType: 'Postpaid', status: 'Active', multiWallet: true, autoSwipe: true, walletCount: 2, topUpBalance: '₹3,50,000' },
];

const STATUS_COLORS = {
  Active: { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
  Inactive: { bg: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' },
  Suspended: { bg: 'rgba(220,38,38,0.1)', color: 'var(--alert-error-primary)' },
};

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 32, height: 18, borderRadius: 9, background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: checked ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
    </div>
  );
}

export default function FinanceAdvertiserManagementPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { toast, showToast } = useToast();

  function toggleField(row, field) {
    setData(d => d.map(r => r.id === row.id ? { ...r, [field]: !r[field] } : r));
    showToast(`${field === 'multiWallet' ? 'Multi Wallet' : 'Auto Swipe'} ${!row[field] ? 'enabled' : 'disabled'}`);
  }

  const filtered = data.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      <Toast {...toast} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico stroke="var(--osmos-brand-primary)" d={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Finance — Advertiser Management</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>{filtered.length} advertisers</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--osmos-border)' }}>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ fontSize: 12, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 10px', color: 'var(--osmos-fg-muted)', fontFamily: "'Open Sans', sans-serif", background: '#fff', cursor: 'pointer' }}>
            {['All', ...STATUSES].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search advertisers…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 180 }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Advertiser Name', 'Advertiser ID', 'Payment Type', 'Status', 'Multi Wallet', 'Auto Swipe', 'Wallet Count', 'Wallet Balance'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const sc = STATUS_COLORS[row.status];
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.id}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, background: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' }}>{row.paymentType}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{row.status}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Toggle checked={row.multiWallet} onChange={() => toggleField(row, 'multiWallet')} />
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Toggle checked={row.autoSwipe} onChange={() => toggleField(row, 'autoSwipe')} />
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', textAlign: 'center' }}>{row.walletCount}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 600 }}>{row.topUpBalance}</td>
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
