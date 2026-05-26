import { useState } from 'react';
import {
  Button, Tabs,
  RefreshIcon, DownloadIcon, FilterIcon, InfoIcon,
} from '../../ui';
import { LineChart, Line, ResponsiveContainer, Tooltip as RTooltip } from 'recharts';

// ── Mock data ─────────────────────────────────────────────────────────────────

const WALLET_SUMMARY = {
  balance:      43000342.41,
  promoBalance: 0,
  maxUsage:     43000342.41,
};

const SPEND_SPARKLINES = {
  'Offsite Ads':             [0, 0, 0, 0, 0, 0, 0],
  'Sponsored Product Ads':   [30, 50, 45, 60, 55, 70, 65],
  'Sponsored Display Ads':   [40, 55, 70, 45, 80, 60, 75],
  'In-Store Digital Ads':    [20, 35, 55, 30, 50, 40, 60],
};

const TABLE_ROWS = [
  { type: 'Offsite Ads',            walletCount: 1,  maxUsage: 43000000.00, balance: 43000342,    promoBalance: 0 },
  { type: 'Sponsored Product Ads',  walletCount: 19, maxUsage: 43497300.00, balance: 43497300,    promoBalance: 0 },
  { type: 'Sponsored Display Ads',  walletCount: 21, maxUsage: 43535287.00, balance: 43535007,    promoBalance: 280 },
  { type: 'In-Store Digital Ads',   walletCount: 10, maxUsage: 48878515.00, balance: 48878515,    promoBalance: 0 },
];

const QUICK_AMOUNTS = [500, 1000, 1500];

const TAB_ITEMS = [
  { id: 'campaign-type', label: 'Campaign Type' },
  { id: 'wallet',        label: 'Wallet' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n === 0) return '₹0';
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function SparkLine({ type }) {
  const raw = SPEND_SPARKLINES[type] ?? [0, 0, 0, 0, 0, 0, 0];
  const data = raw.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width={100} height={30}>
      <LineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke="#0BC5A4"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
        <RTooltip
          contentStyle={{ fontSize: 11, padding: '2px 6px' }}
          formatter={(v) => [`₹${v}`, 'Spend']}
          labelFormatter={() => ''}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ManageBillingPage() {
  const [activeTab, setActiveTab]     = useState('campaign-type');
  const [topupAmount, setTopupAmount] = useState('');
  const [search, setSearch]           = useState('');

  const filteredRows = TABLE_ROWS.filter(r =>
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '24px 32px', minHeight: '100vh', background: 'var(--osmos-bg)', fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── Wallet Details ── */}
      <div style={{ marginBottom: 24 }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>
            Wallet Details
          </span>
          <button style={ghostBtnStyle}>
            <span style={{ fontSize: 13, color: 'var(--osmos-brand-primary)' }}>↺ Change History</span>
          </button>
        </div>

        {/* TDS info banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--osmos-brand-primary-muted)',
          border: '1px solid var(--osmos-brand-primary)',
          borderRadius: 6, padding: '8px 14px', marginBottom: 16,
          fontSize: 12, color: 'var(--osmos-fg)', lineHeight: 1.5,
        }}>
          <InfoIcon size={14} color="var(--osmos-brand-primary)" style={{ flexShrink: 0 }} />
          <span>
            <strong>NOTE:</strong> The base recharge is subject to TDS. The service receiver must deduct the TDS to the
            government and submit the form 26AS or form 16A along with Bank details.
            The TDS amount will be reimbursed within 20 days.
          </span>
        </div>

        {/* Inline stat row: Default Profile | Balance | Promo Balance | Max usage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, flexWrap: 'wrap' }}>
          {/* Default Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 24, marginRight: 24, borderRight: '1px solid var(--osmos-border)' }}>
            <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>Default Profile</span>
            <select style={{
              padding: '5px 10px', border: '1px solid var(--osmos-border)',
              borderRadius: 6, background: 'var(--osmos-bg)', color: 'var(--osmos-fg)',
              fontSize: 13, cursor: 'pointer',
            }}>
              <option>Default Profile</option>
              <option>Profile 2</option>
            </select>
          </div>
          <KpiStat label="Balance"              value={fmt(WALLET_SUMMARY.balance)}      divider />
          <KpiStat label="Promotional Balance"  value={fmt(WALLET_SUMMARY.promoBalance)} divider />
          <KpiStat label="Max usage allowed"    value={fmt(WALLET_SUMMARY.maxUsage)} />
        </div>

        {/* Top-up row */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 8 }}>
            Top-up Amount:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden',
              background: 'var(--osmos-bg)',
            }}>
              <span style={{
                padding: '7px 10px', fontSize: 14, color: 'var(--osmos-fg-muted)',
                borderRight: '1px solid var(--osmos-border)', background: 'var(--osmos-bg-subtle)',
              }}>₹</span>
              <input
                type="number"
                value={topupAmount}
                onChange={e => setTopupAmount(e.target.value)}
                placeholder="Enter Amount"
                style={{
                  padding: '7px 12px', border: 'none', outline: 'none',
                  fontSize: 13, color: 'var(--osmos-fg)', background: 'var(--osmos-bg)', width: 160,
                }}
              />
            </div>
            {QUICK_AMOUNTS.map(amt => (
              <Button key={amt} variant="outline" size="sm" onClick={() => setTopupAmount(String(amt))}>
                +₹{amt.toLocaleString('en-IN')}
              </Button>
            ))}
            <Button variant="primary" onClick={() => {}} style={{ marginLeft: 'auto' }}>
              Add Money
            </Button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', marginTop: 6 }}>
            Minimum Top-up Amount ₹1
          </div>
        </div>

        {/* Invoice info banner (read-only) */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--osmos-brand-primary-muted)', borderRadius: 6,
          padding: '8px 14px', fontSize: 13, color: 'var(--osmos-fg-muted)',
        }}>
          <InfoIcon size={14} color="var(--osmos-brand-primary)" style={{ flexShrink: 0 }} />
          <span>Invoice will be issued in next 4 working days to your registered Email ID</span>
        </div>
      </div>

      {/* ── Tabs + Table ── */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} items={TAB_ITEMS} variant="pill">
          <Tabs.Content value="campaign-type">
            <CampaignTypeTab rows={filteredRows} search={search} onSearch={setSearch} />
          </Tabs.Content>
          <Tabs.Content value="wallet">
            <EmptyTab label="Wallet details — coming soon" />
          </Tabs.Content>
        </Tabs>
      </div>

    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiStat({ label, value, divider }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 2,
      paddingRight: divider ? 24 : 0,
      marginRight: divider ? 24 : 0,
      borderRight: divider ? '1px solid var(--osmos-border)' : 'none',
    }}>
      <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{label} ⓘ</span>
      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--osmos-fg)' }}>{value}</span>
    </div>
  );
}

function CampaignTypeTab({ rows, search, onSearch }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Button variant="outline" size="sm">
          <FilterIcon size={14} style={{ marginRight: 4 }} />
          + Add Filter
        </Button>
        <div style={{ flex: 1 }} />
        <button onClick={() => {}} style={iconBtnStyle} title="Refresh">
          <RefreshIcon size={15} color="var(--osmos-fg-muted)" />
        </button>
        <button onClick={() => {}} style={iconBtnStyle} title="Download">
          <DownloadIcon size={15} color="var(--osmos-fg-muted)" />
        </button>
      </div>
      <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
              <th style={thStyle}>Campaign Type</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Wallet</th>
              <th style={thStyle}>Spend <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--osmos-fg-subtle)' }}>last 7 days</span></th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Max usage allowed</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Balance</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Promotion Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--osmos-border)' : 'none' }}>
                <td style={tdStyle}>{row.type}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--osmos-brand-primary)', fontWeight: 600 }}>
                  {row.walletCount}
                </td>
                <td style={tdStyle}><SparkLine type={row.type} /></td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{fmt(row.maxUsage)}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{fmt(row.balance)}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{fmt(row.promoBalance)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--osmos-fg-subtle)' }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyTab({ label }) {
  return (
    <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 14 }}>
      {label}
    </div>
  );
}

// ── Style constants ───────────────────────────────────────────────────────────

const thStyle = {
  padding: '10px 16px', textAlign: 'left',
  fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '12px 16px', color: 'var(--osmos-fg)', verticalAlign: 'middle',
};

const iconBtnStyle = {
  width: 30, height: 30,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent', border: '1px solid var(--osmos-border)',
  borderRadius: 6, cursor: 'pointer', padding: 0,
};

const ghostBtnStyle = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
};
