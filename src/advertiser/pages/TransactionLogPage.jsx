import { useState } from 'react';
import { Button, RefreshIcon, DownloadIcon, FilterIcon } from '../../ui';

// ── Mock data ─────────────────────────────────────────────────────────────────

const TXN_ROWS = [
  { id: '01KRXJK7R3K628K866CB9ZS2', date: '18 May 26, 06:27 PM +05:30', wallet: 'test',             type: 'Transfer In',  amount:    3,      status: 'Successful', desc: '3 rupees not allowed from test',     user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXQK6WE91AFJKVT79XC8R', date: '18 May 26, 06:27 PM +05:30', wallet: 'wallet rname',     type: 'Transfer Out', amount:   -3,      status: 'Successful', desc: '3 rupees not allowed from test',     user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXH2MQ56XZ7CB7FAE2X',   date: '18 May 26, 06:00 PM +05:30', wallet: 'wallet rname',     type: 'Transfer In',  amount:   10,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXH2KN6A1JP2AYGN6N',    date: '18 May 26, 06:00 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount:  -10,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDEN3HN3KN6KFQ8NDP',   date: '18 May 26, 04:57 PM +05:30', wallet: 'test',             type: 'Transfer In',  amount:    3,      status: 'Successful', desc: 'test',                               user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDEM59K3B09WESGA3K',    date: '18 May 26, 04:57 PM +05:30', wallet: 'wallet rname',     type: 'Transfer Out', amount:   -3,      status: 'Successful', desc: 'test',                               user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDC8RECEK9TW0VVNX',    date: '18 May 26, 04:56 PM +05:30', wallet: 'test',             type: 'Transfer In',  amount:    3,      status: 'Successful', desc: 'df',                                 user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDC7XBEGBA71ECFVB9',    date: '18 May 26, 04:56 PM +05:30', wallet: 'wallet rname',     type: 'Transfer Out', amount:   -3,      status: 'Successful', desc: 'df',                                 user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDB5YFQ1ZTB909078H',    date: '18 May 26, 04:55 PM +05:30', wallet: 'test',             type: 'Transfer In',  amount:  344,      status: 'Successful', desc: 'df',                                 user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXDB4D5ZJ6V8Y6AJ2G7Z',   date: '18 May 26, 04:55 PM +05:30', wallet: 'wallet rname',     type: 'Transfer Out', amount: -344,      status: 'Successful', desc: 'df',                                 user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRXD0PVWHVHB3ACN45C',     date: '18 May 26, 04:49 PM +05:30', wallet: 'Default Profile',  type: 'Prepaid',      amount:  111,      status: 'Expired',    desc: '',                                   user: 'Astra IT VAPT Admin',  campaignType: 'Sponsored Product Ads', paymentMode: 'Razorpay Test', gatewayTxnId: 'order_SqoAeKaxU18c14' },
  { id: '01KRN5YD3N4J62AAQPNDHE',    date: '15 May 26, 06:01 PM +05:30', wallet: 'Sofie Wallet',     type: 'Transfer In',  amount:  200,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Divyaprakash Singh',   campaignType: 'SOFIE',                 paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRN5YC34TVR2T5VPCB1C',    date: '15 May 26, 06:01 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount: -200,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Divyaprakash Singh',   campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRKBPZXG7EMKYKRG5058A',   date: '14 May 26, 07:14 PM +05:30', wallet: 'Sofie Wallet',     type: 'Prepaid',      amount: 7390,      status: 'Successful', desc: 'Adding Money',                       user: 'System',               campaignType: 'SOFIE',                 paymentMode: 'Razorpay Test', gatewayTxnId: '-' },
  { id: '01KRKWJ83Q77J1WQJPC95QCB',  date: '14 May 26, 02:49 PM +05:30', wallet: 'wallet rname',     type: 'Transfer In',  amount: 8888,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Soham Kumbhar',        campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRKWJ74STPMFWHY0G3S2',    date: '14 May 26, 02:49 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount: -8888,     status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Soham Kumbhar',        campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRKWAZ1NHMXMXAXBWPC',     date: '14 May 26, 02:45 PM +05:30', wallet: 'wallet rname',     type: 'Transfer In',  amount:   10,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRKWAXBKKAAWV553MVVG',    date: '14 May 26, 02:45 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount:  -10,      status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRK4S4BW4M0TKGN83MFBP',   date: '14 May 26, 01:49 PM +05:30', wallet: 'Default Profile',  type: 'Prepaid',      amount:  111,      status: 'Draft',      desc: '',                                   user: 'Soham Kumbhar',        campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRK1QXH5E5YA5G0MAKW',     date: '14 May 26, 01:13 PM +05:30', wallet: 'wallet rname',     type: 'Transfer In',  amount: 23456,     status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRK1Q1W497Q6E4JCW1JD3E',  date: '14 May 26, 01:13 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount: -23456,    status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Rajani Bongane',       campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRGE5G200CV760F4WAB3',     date: '13 May 26, 04:10 PM +05:30', wallet: 'Default Profile',  type: 'Prepaid',      amount: 23344,     status: 'Expired',    desc: '',                                   user: 'Hupendra Deore',       campaignType: 'Sponsored Product Ads', paymentMode: 'Razorpay Test', gatewayTxnId: 'order_SoopHRbSRE2iT' },
  { id: '01KRGERVA34WC6NBJFCR6Z',    date: '13 May 26, 04:10 PM +05:30', wallet: 'Default Profile',  type: 'Prepaid',      amount: 23344,     status: 'Expired',    desc: '',                                   user: 'Hupendra Deore',       campaignType: 'Sponsored Product Ads', paymentMode: 'Razorpay Test', gatewayTxnId: 'order_SoopM7qkSPpDr5' },
  { id: '01KRGERK156KENN84X0GWZ',     date: '13 May 26, 04:10 PM +05:30', wallet: 'Default Profile',  type: 'Prepaid',      amount: 23344,     status: 'Expired',    desc: '',                                   user: 'Hupendra Deore',       campaignType: 'Sponsored Product Ads', paymentMode: 'Razorpay Test', gatewayTxnId: 'order_SoopDCk1GmhzqP' },
  { id: '01KRGAH547QV2S9T00WMS',      date: '13 May 26, 02:56 PM +05:30', wallet: 'Sofie Wallet',     type: 'Prepaid',      amount: 2000,      status: 'Successful', desc: '',                                   user: 'Divyaprakash Singh',   campaignType: 'SOFIE',                 paymentMode: 'Razorpay Test', gatewayTxnId: 'order_Son2RB6QlBGyRj' },
  { id: '01KRGB3E2QBTSN0STV2PV1',    date: '13 May 26, 02:37 PM +05:30', wallet: 'Sofie Wallet',     type: 'Transfer In',  amount: 5000,      status: 'Successful', desc: 'Transferred from sample wallet',     user: 'Vivek',                campaignType: 'SOFIE',                 paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG9D0B5WQJGBZVF79W9F',   date: '13 May 26, 02:36 PM +05:30', wallet: 'sample wallet tx', type: 'Transfer In',  amount: 1000000,   status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Vivek',                campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG9DASF6JKG1819QBH4C',   date: '13 May 26, 02:36 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount: -1000000,  status: 'Successful', desc: 'Transferred from Default Profile',   user: 'Vivek',                campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2RT6AR6PJ7R7P29X56',   date: '13 May 26, 12:40 PM +05:30', wallet: 'Default Profile',  type: 'Transfer In',  amount:  100,      status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Vivek',                campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2RQXT5BE2MXXT7K',      date: '13 May 26, 12:40 PM +05:30', wallet: 'Sofie Wallet',     type: 'Transfer Out', amount: -100,      status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Vivek',                campaignType: 'SOFIE',                 paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2RS5B0B3V30SBYQ2B',    date: '13 May 26, 12:40 PM +05:30', wallet: 'Sofie Wallet',     type: 'Transfer In',  amount: 10000,     status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Vivek',                campaignType: 'SOFIE',                 paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2R35SXP3K0CYPKE27C',   date: '13 May 26, 12:40 PM +05:30', wallet: 'Default Profile',  type: 'Transfer Out', amount: -10000,    status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Vivek',                campaignType: 'Sponsored Product Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2QFW0F0BHCHQJSFZZ',    date: '13 May 26, 12:39 PM +05:30', wallet: 'Display Ads',      type: 'Transfer In',  amount:  500,      status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Prasad Kute',          campaignType: 'Sponsored Display Ads', paymentMode: '-',             gatewayTxnId: '-' },
  { id: '01KRG2QEV41JAZV6PA15D9B',   date: '13 May 26, 12:39 PM +05:30', wallet: 'Sofie Wallet',     type: 'Transfer Out', amount: -500,      status: 'Successful', desc: 'Transferred from Sofie Wallet',      user: 'Prasad Kute',          campaignType: 'SOFIE',                 paymentMode: '-',             gatewayTxnId: '-' },
];

const TXN_TYPES    = ['All', 'Transfer In', 'Transfer Out', 'Prepaid'];
const TXN_STATUSES = ['All', 'Successful', 'Expired', 'Draft'];

const STATUS_STYLE = {
  Successful: { color: 'var(--osmos-brand-green)',  background: 'var(--osmos-brand-green-muted)' },
  Expired:    { color: 'var(--osmos-brand-amber)',   background: 'var(--osmos-brand-amber-muted)' },
  Draft:      { color: '#64748b',                    background: '#f1f5f9' },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TransactionLogPage() {
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [sortDir,      setSortDir]      = useState('desc');

  const fmtAmt = (n) => {
    const abs = Math.abs(n).toLocaleString('en-IN');
    return n < 0 ? `-₹${abs}` : `₹${abs}`;
  };

  const filtered = TXN_ROWS
    .filter(r => typeFilter   === 'All' || r.type   === typeFilter)
    .filter(r => statusFilter === 'All' || r.status === statusFilter)
    .filter(r =>
      search === '' ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.wallet.toLowerCase().includes(search.toLowerCase())
    );

  // Client-side date sort (rows are already ordered; toggle reverses display)
  const rows = sortDir === 'desc' ? filtered : [...filtered].reverse();

  return (
    <div style={{ padding: '20px 24px', minHeight: '100vh', background: 'var(--osmos-bg)', fontFamily: "'Open Sans', sans-serif" }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>

        {/* + Add Filter */}
        <Button variant="outline" size="sm">
          <FilterIcon size={14} style={{ marginRight: 4 }} />
          + Add Filter
        </Button>

        {/* Type quick-filter */}
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={selectStyle}>
          {TXN_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>

        {/* Status quick-filter */}
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          {TXN_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid var(--osmos-border)', borderRadius: 6,
          padding: '0 10px', height: 30, background: 'var(--osmos-bg)',
        }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-fg-subtle)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search ID, user, wallet…"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 180,
            }}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Row count badge */}
        {filtered.length !== TXN_ROWS.length && (
          <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
            {filtered.length} of {TXN_ROWS.length}
          </span>
        )}

        {/* Refresh */}
        <button style={iconBtnStyle} title="Refresh" onClick={() => {}}>
          <RefreshIcon size={15} color="var(--osmos-fg-muted)" />
        </button>

        {/* Download */}
        <button style={iconBtnStyle} title="Download" onClick={() => {}}>
          <DownloadIcon size={15} color="var(--osmos-fg-muted)" />
        </button>

        {/* Column settings */}
        <button style={iconBtnStyle} title="Column settings" onClick={() => {}}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-fg-muted)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <line x1="8"  y1="6"  x2="21"   y2="6"/>
            <line x1="8"  y1="12" x2="21"   y2="12"/>
            <line x1="8"  y1="18" x2="21"   y2="18"/>
            <line x1="3"  y1="6"  x2="3.01" y2="6"/>
            <line x1="3"  y1="12" x2="3.01" y2="12"/>
            <line x1="3"  y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Table — horizontally scrollable */}
      <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 1180 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                <th
                  style={{ ...th, cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                >
                  Date {sortDir === 'desc' ? '↓' : '↑'}
                </th>
                <th style={th}>Transaction ID</th>
                <th style={th}>Wallet</th>
                <th style={th}>Transaction Type</th>
                <th style={{ ...th, textAlign: 'right' }}>Amount</th>
                <th style={th}>Status</th>
                <th style={{ ...th, maxWidth: 200 }}>Description</th>
                <th style={th}>User</th>
                <th style={th}>Campaign Type</th>
                <th style={th}>Payment Mode</th>
                <th style={th}>Gateway Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const ss = STATUS_STYLE[row.status] ?? STATUS_STYLE.Draft;
                return (
                  <tr
                    key={row.id}
                    style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--osmos-border)' : 'none' }}
                  >
                    {/* Date */}
                    <td style={{ ...td, whiteSpace: 'nowrap', fontSize: 11, color: 'var(--osmos-fg-muted)' }}>
                      {row.date}
                    </td>

                    {/* Transaction ID */}
                    <td style={{ ...td, maxWidth: 160 }}>
                      <div
                        title={row.id}
                        style={{
                          fontFamily: 'monospace', fontSize: 11,
                          color: 'var(--osmos-brand-primary)', cursor: 'pointer',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                      >
                        {row.id}
                      </div>
                    </td>

                    {/* Wallet */}
                    <td style={{ ...td, whiteSpace: 'nowrap' }}>{row.wallet}</td>

                    {/* Transaction Type */}
                    <td style={{ ...td, whiteSpace: 'nowrap' }}>{row.type}</td>

                    {/* Amount */}
                    <td style={{
                      ...td, textAlign: 'right', fontWeight: 600, whiteSpace: 'nowrap',
                      color: row.amount < 0
                        ? 'var(--alert-error-primary, #dc2626)'
                        : 'var(--osmos-brand-green, #16a34a)',
                    }}>
                      {fmtAmt(row.amount)}
                    </td>

                    {/* Status */}
                    <td style={td}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 10,
                        fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
                        color: ss.color, background: ss.background,
                      }}>
                        {row.status}
                      </span>
                    </td>

                    {/* Description */}
                    <td style={{ ...td, maxWidth: 200 }}>
                      <div
                        title={row.desc}
                        style={{
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          color: 'var(--osmos-fg-muted)',
                        }}
                      >
                        {row.desc || '—'}
                      </div>
                    </td>

                    {/* User */}
                    <td style={{ ...td, whiteSpace: 'nowrap' }}>{row.user}</td>

                    {/* Campaign Type */}
                    <td style={{ ...td, maxWidth: 160 }}>
                      <div
                        title={row.campaignType}
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {row.campaignType}
                      </div>
                    </td>

                    {/* Payment Mode */}
                    <td style={{
                      ...td, whiteSpace: 'nowrap',
                      color: row.paymentMode === '-' ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)',
                    }}>
                      {row.paymentMode === '-' ? '—' : row.paymentMode}
                    </td>

                    {/* Gateway Transaction ID */}
                    <td style={{ ...td, maxWidth: 180 }}>
                      {row.gatewayTxnId === '-'
                        ? <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span>
                        : (
                          <div
                            title={row.gatewayTxnId}
                            style={{
                              fontFamily: 'monospace', fontSize: 11,
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}
                          >
                            {row.gatewayTxnId}
                          </div>
                        )
                      }
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 13 }}>
                    No transactions match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const th = {
  padding: '10px 14px',
  textAlign: 'left', fontSize: 12, fontWeight: 600,
  color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap',
};

const td = {
  padding: '11px 14px',
  color: 'var(--osmos-fg)', verticalAlign: 'middle',
};

const iconBtnStyle = {
  width: 30, height: 30,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent', border: '1px solid var(--osmos-border)',
  borderRadius: 6, cursor: 'pointer', padding: 0,
};

const selectStyle = {
  padding: '4px 8px', height: 30,
  border: '1px solid var(--osmos-border)', borderRadius: 6,
  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)',
  fontSize: 12, cursor: 'pointer',
};
