import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';

const KPI_CARDS = [
  { label: 'Ad Credits Spend (MTD)', value: '₹24,85,320', change: '+12.4%', positive: true, sub: 'vs ₹22,11,000 last month' },
  { label: 'Total Balance', value: '₹1,42,56,800', change: '+5.2%', positive: true, sub: 'Across all advertiser wallets' },
  { label: 'Pending Top-Ups', value: '₹3,20,000', change: '-8.1%', positive: false, sub: '4 top-ups awaiting approval' },
  { label: 'Active Advertiser Wallets', value: '187', change: '+2', positive: true, sub: 'of 193 total advertisers' },
];

const WALLET_DATA = [
  { advertiser: 'Sports World', id: 'OS_M002', balance: '₹4,20,000', spent: '₹1,80,000', topUpCount: 3, lastTopUp: '20 Apr 26', status: 'Active' },
  { advertiser: 'Tech Retailers', id: 'OS_M003', balance: '₹2,80,500', spent: '₹95,000', topUpCount: 2, lastTopUp: '18 Apr 26', status: 'Active' },
  { advertiser: 'Gourmet Grocery', id: 'OS_M004', balance: '₹60,000', spent: '₹2,40,000', topUpCount: 5, lastTopUp: '21 Apr 26', status: 'Low Balance' },
  { advertiser: 'Home Essentials Mart', id: 'OS_M005', balance: '₹0', spent: '₹1,20,000', topUpCount: 1, lastTopUp: '10 Mar 26', status: 'Exhausted' },
  { advertiser: 'Electronics Hub', id: 'OS_M006', balance: '₹8,90,000', spent: '₹3,10,000', topUpCount: 4, lastTopUp: '19 Apr 26', status: 'Active' },
  { advertiser: 'Beauty Boutique', id: 'OS_M007', balance: '₹1,20,000', spent: '₹80,000', topUpCount: 2, lastTopUp: '15 Apr 26', status: 'Active' },
];

const TRANSACTIONS = [
  { id: 'TXN-0421-001', date: '21 Apr 26, 10:30 AM', advertiser: 'Sports World (OS_M002)', type: 'Top-Up', amount: '₹2,00,000', method: 'Bank Transfer', status: 'Success', by: 'Alice Johnson' },
  { id: 'TXN-0421-002', date: '21 Apr 26, 09:15 AM', advertiser: 'Gourmet Grocery (OS_M004)', type: 'Top-Up', amount: '₹50,000', method: 'Credit Card', status: 'Success', by: 'Bob Smith' },
  { id: 'TXN-0420-003', date: '20 Apr 26, 04:45 PM', advertiser: 'Home Essentials Mart (OS_M005)', type: 'Top-Up', amount: '₹1,00,000', method: 'Bank Transfer', status: 'Failed', by: 'Carol Williams' },
  { id: 'TXN-0420-004', date: '20 Apr 26, 02:30 PM', advertiser: 'Electronics Hub (OS_M006)', type: 'Top-Up', amount: '₹5,00,000', method: 'NEFT', status: 'Success', by: 'David Brown' },
  { id: 'TXN-0419-005', date: '19 Apr 26, 11:00 AM', advertiser: 'Tech Retailers (OS_M003)', type: 'Top-Up', amount: '₹1,50,000', method: 'Bank Transfer', status: 'Pending', by: 'Emily Davis' },
];

const STATUS_COLORS = {
  Active: { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
  'Low Balance': { bg: 'rgba(245,166,35,0.12)', color: 'var(--osmos-brand-amber)' },
  Exhausted: { bg: 'rgba(220,38,38,0.1)', color: '#dc2626' },
  Success: { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
  Failed: { bg: 'rgba(220,38,38,0.1)', color: '#dc2626' },
  Pending: { bg: 'rgba(245,166,35,0.12)', color: 'var(--osmos-brand-amber)' },
};

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

export default function FinanceDashboardPage() {
  const [txnSearch, setTxnSearch] = useState('');
  const [walletSearch, setWalletSearch] = useState('');

  const filteredWallets = WALLET_DATA.filter(r =>
    r.advertiser.toLowerCase().includes(walletSearch.toLowerCase()) ||
    r.id.toLowerCase().includes(walletSearch.toLowerCase())
  );

  const filteredTxns = TRANSACTIONS.filter(r =>
    r.advertiser.toLowerCase().includes(txnSearch.toLowerCase()) ||
    r.id.toLowerCase().includes(txnSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif", display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {KPI_CARDS.map(card => (
          <div key={card.label} style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 6 }}>{card.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: card.positive ? 'var(--osmos-brand-green)' : '#dc2626' }}>{card.change}</span>
              <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Advertiser Wallet Snapshot */}
      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico stroke="var(--osmos-brand-primary)" d={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Advertiser Wallet Snapshot</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input value={walletSearch} onChange={e => setWalletSearch(e.target.value)} placeholder="Search advertisers…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Advertiser', 'Advertiser ID', 'Balance', 'Spent (MTD)', 'Top-Ups', 'Last Top-Up', 'Status'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredWallets.map(row => {
                const sc = STATUS_COLORS[row.status];
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.advertiser}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.id}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 600 }}>{row.balance}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.spent}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', textAlign: 'center' }}>{row.topUpCount}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-subtle)' }}>{row.lastTopUp}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{row.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions */}
      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico stroke="var(--osmos-brand-primary)" d={<><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Recent Transactions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input value={txnSearch} onChange={e => setTxnSearch(e.target.value)} placeholder="Search transactions…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Transaction ID', 'Date', 'Advertiser', 'Type', 'Amount', 'Method', 'Status', 'By'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(row => {
                const sc = STATUS_COLORS[row.status];
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-brand-primary)', fontFamily: 'monospace', fontSize: 11 }}>{row.id}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)' }}>{row.advertiser}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.type}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 600 }}>{row.amount}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.method}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{row.status}</span>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.by}</td>
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
