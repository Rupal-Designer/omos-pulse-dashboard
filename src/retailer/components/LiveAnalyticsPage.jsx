import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Icon, SearchIcon, FilterIcon, ColumnsIcon, DownloadIcon, ChevronDownIcon } from '../../ui/atoms/Icon';

const FONT = "'Open Sans', sans-serif";

// ─── Constants & Mock Data ────────────────────────────────────────────────────

const KPI_CHIPS = [
  { label: 'Global Ratio',       value: '70%', tone: 'neutral'  },
  { label: 'Product Ad Revenue', value: '70%', tone: 'positive' },
  { label: 'Display Ad Revenue', value: '70%', tone: 'positive' },
  { label: 'Display Ad CPM',     value: '70%', tone: 'positive' },
  { label: 'Product Ad CPM',     value: '70%', tone: 'positive' },
];

const TREND_DATA = [
  { time: '00:00', yesterday: 0.28, tomorrow: 0.32, lastWeek: 0.30 },
  { time: '02:00', yesterday: 0.35, tomorrow: 0.41, lastWeek: 0.38 },
  { time: '04:00', yesterday: 0.42, tomorrow: 0.52, lastWeek: 0.47 },
  { time: '06:00', yesterday: 0.48, tomorrow: 0.60, lastWeek: 0.55 },
  { time: '08:00', yesterday: 0.55, tomorrow: 0.68, lastWeek: 0.62 },
  { time: '10:00', yesterday: 0.60, tomorrow: 0.66, lastWeek: 0.64 },
  { time: '12:00', yesterday: 0.62, tomorrow: 0.64, lastWeek: 0.63 },
  { time: '14:00', yesterday: 0.58, tomorrow: 0.70, lastWeek: 0.65 },
  { time: '16:00', yesterday: 0.68, tomorrow: 0.78, lastWeek: 0.72 },
  { time: '18:00', yesterday: 0.74, tomorrow: 0.80, lastWeek: 0.76 },
  { time: '20:00', yesterday: 0.66, tomorrow: 0.70, lastWeek: 0.68 },
  { time: '22:00', yesterday: 0.52, tomorrow: 0.58, lastWeek: 0.55 },
  { time: '23:00', yesterday: 0.48, tomorrow: 0.52, lastWeek: 0.50 },
];

const ADVERTISER_ROWS = Array.from({ length: 7 }, (_, i) => ({
  advertiserName: `Advertiser ${i + 1}`,
  adRevenue: '', if: '', adImpressions: '', adClicks: '', cpc: '', cpm: '', ctr: '',
}));

const CAMPAIGN_ROWS = [
  { campaignName: 'African Holidays and destinations', campaignId: '410037', if: '$612',  dailyBudget: '$1.35',   adRevenue: '$1.4', adClicks: '7.6 B',  cpc: '15.8 M', cpm: '0.75', ctr: '0.43', budgetUtilization: '57%' },
  { campaignName: 'South American Escapes',            campaignId: '410037', if: '$562',  dailyBudget: '$18.7 M', adRevenue: '$1.6', adClicks: '15.8 B', cpc: '18.7 M', cpm: '0.82', ctr: '0.46', budgetUtilization: '62%' },
  { campaignName: 'Asian Getaways and suppliers',      campaignId: '410037', if: '$641',  dailyBudget: '$2.1',    adRevenue: '$1.8', adClicks: '21.1 B', cpc: '18.7 M', cpm: '0.89', ctr: '0.51', budgetUtilization: '68%' },
  { campaignName: 'North American Travel',             campaignId: '410037', if: '$662',  dailyBudget: '$1.2',    adRevenue: '$1.5', adClicks: '19.5 B', cpc: '21.1 M', cpm: '0.78', ctr: '0.48', budgetUtilization: '65%' },
  { campaignName: 'Australian Journey',                campaignId: '410037', if: '$643',  dailyBudget: '$82.5',   adRevenue: '$2.7', adClicks: '24.2 B', cpc: '19.5 M', cpm: '0.95', ctr: '0.55', budgetUtilization: '71%' },
  { campaignName: 'European Adventures and vendors',   campaignId: '410037', if: '$625',  dailyBudget: '$5.8',    adRevenue: '$2.7', adClicks: '31.5 B', cpc: '24.2 M', cpm: '0.98', ctr: '0.58', budgetUtilization: '74%' },
  { campaignName: 'Antarctic Expeditions and vendors', campaignId: '410037', if: '$571',  dailyBudget: '$31.5',   adRevenue: '$3.1', adClicks: '38.1 B', cpc: '31.5 M', cpm: '1.02', ctr: '0.62', budgetUtilization: '78%' },
  { campaignName: 'African Holidays and destinations', campaignId: '410037', if: '$607',  dailyBudget: '$31.5',   adRevenue: '$3.3', adClicks: '38.1 B', cpc: '31.5 M', cpm: '1.05', ctr: '0.65', budgetUtilization: '82%' },
];

// ─── Local Components ─────────────────────────────────────────────────────────

function KpiChip({ label, value, tone }) {
  const color = tone === 'positive' ? 'var(--osmos-brand-green)' : 'var(--osmos-brand-primary)';
  const bg    = tone === 'positive' ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-brand-primary-muted)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 8, padding: '8px 12px', flex: 1, minWidth: 150,
      fontFamily: FONT,
    }}>
      <span style={{ background: bg, color, borderRadius: 99, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>
        {value}
      </span>
      <span style={{ fontSize: 12, color: 'var(--osmos-fg)', fontWeight: 500, flex: 1 }}>
        {label}
      </span>
    </div>
  );
}

function IconBtn({ children, ariaLabel, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--osmos-bg-subtle)' : 'none',
        border: 'none', cursor: 'pointer', padding: '4px 6px',
        borderRadius: 4, display: 'flex', alignItems: 'center',
        color: 'var(--osmos-fg-muted)',
      }}
    >
      {children}
    </button>
  );
}

function DropdownPill({ label }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500,
      color: 'var(--osmos-fg-muted)', cursor: 'pointer', fontFamily: FONT,
    }}>
      {label}
      <ChevronDownIcon size={12} />
    </button>
  );
}

function SearchInput({ placeholder, minW = '220px' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      border: '1px solid var(--osmos-border)', borderRadius: 6,
      padding: '4px 10px', background: 'var(--osmos-bg)', minWidth: minW, height: 28,
    }}>
      <SearchIcon size={13} color="var(--osmos-fg-muted)" />
      <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>{placeholder}</span>
    </div>
  );
}

function PageToolbar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', background: 'var(--osmos-bg)',
      borderBottom: '1px solid var(--osmos-border)', fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={18} color="var(--osmos-brand-primary)">
          <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
        </Icon>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>
          Live Insights
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconBtn ariaLabel="Search"><SearchIcon size={14} /></IconBtn>
        <IconBtn ariaLabel="Filter"><FilterIcon size={14} /></IconBtn>
        <IconBtn ariaLabel="Column settings"><ColumnsIcon size={14} /></IconBtn>
        <div style={{ width: 1, height: 18, background: 'var(--osmos-border)', margin: '0 4px' }} />
        <DropdownPill label="All Pages" />
      </div>
    </div>
  );
}

function Panel({ title, icon, toolbar, children, footerNote }) {
  return (
    <div style={{
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '16px 20px 12px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && <span style={{ display: 'flex', alignItems: 'center', color: 'var(--osmos-brand-primary)' }}>{icon}</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>{title}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 14, height: 14, borderRadius: '50%',
            background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)',
            fontSize: 9, color: 'var(--osmos-fg-subtle)', fontWeight: 700,
          }}>i</span>
        </div>
        {toolbar}
      </div>
      {children}
      {footerNote && (
        <div style={{ padding: '8px 20px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
          {footerNote}
        </div>
      )}
    </div>
  );
}

const TH_STYLE = {
  textAlign: 'left', padding: '8px 16px', fontSize: 12, fontWeight: 600,
  color: 'var(--osmos-fg-muted)', background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap', fontFamily: FONT,
};
const TD_STYLE = {
  padding: '9px 16px', fontSize: 13, color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)', fontFamily: FONT,
};

function DataTable({ columns, rows, emptyRows = false }) {
  const [hovRow, setHovRow] = useState(null);
  return (
    <div style={{ overflowX: 'auto', borderTop: '1px solid var(--osmos-border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ ...TH_STYLE, textAlign: c.align === 'right' ? 'right' : 'left' }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
              style={{ background: hovRow === i ? 'var(--osmos-bg-subtle)' : 'transparent', transition: 'background 0.12s' }}
            >
              {columns.map((c) => (
                <td key={c.key} style={{
                  ...TD_STYLE,
                  textAlign: c.align === 'right' ? 'right' : 'left',
                  color: emptyRows && c.key !== columns[0].key ? 'var(--osmos-fg-muted)' : 'var(--osmos-fg)',
                }}>
                  {row[c.key] || (emptyRows && c.key !== columns[0].key ? '—' : '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      padding: '10px 12px', minWidth: 160, fontFamily: FONT,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 8 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
            <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
              {p.dataKey === 'yesterday' ? 'Yesterday' : p.dataKey === 'tomorrow' ? 'Tomorrow' : 'Same day (last week)'}
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)' }}>
            {`${(p.value * 100).toFixed(1)} K`}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LiveAnalyticsPage() {
  const advertiserCols = [
    { key: 'advertiserName', label: 'Advertiser Name' },
    { key: 'adRevenue',      label: 'Ad Revenue',      align: 'right' },
    { key: 'if',             label: 'IF',              align: 'right' },
    { key: 'adImpressions',  label: 'Ad Impressions',  align: 'right' },
    { key: 'adClicks',       label: 'Ad Clicks',       align: 'right' },
    { key: 'cpc',            label: 'CPC',             align: 'right' },
    { key: 'cpm',            label: 'CPM',             align: 'right' },
    { key: 'ctr',            label: 'CTR',             align: 'right' },
  ];
  const campaignCols = [
    { key: 'campaignName',       label: 'Campaign Name' },
    { key: 'campaignId',         label: 'Campaign ID',         align: 'right' },
    { key: 'if',                 label: 'IF',                  align: 'right' },
    { key: 'dailyBudget',        label: 'Daily Budget',        align: 'right' },
    { key: 'adRevenue',          label: 'Ad Revenue',          align: 'right' },
    { key: 'adClicks',           label: 'Ad Clicks',           align: 'right' },
    { key: 'cpc',                label: 'CPC',                 align: 'right' },
    { key: 'cpm',                label: 'CPM',                 align: 'right' },
    { key: 'ctr',                label: 'CTR',                 align: 'right' },
    { key: 'budgetUtilization',  label: 'Budget Utilization',  align: 'right' },
  ];

  const trendIcon = (
    <Icon size={14}>
      <polyline points="3 17 9 11 13 15 21 7"/>
      <polyline points="14 7 21 7 21 14"/>
    </Icon>
  );
  const advertiserIcon = (
    <Icon size={14}>
      <path d="M16 11V3H8v8H2l10 10 10-10z"/>
    </Icon>
  );
  const campaignIcon = (
    <Icon size={14}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </Icon>
  );

  const trendToolbar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 2, background: 'var(--osmos-brand-amber)' }} />
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Yesterday</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 2, background: 'var(--osmos-brand-green)' }} />
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Tomorrow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 2, background: 'var(--osmos-brand-primary)' }} />
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Same day (last week)</span>
        </div>
      </div>
      <DropdownPill label="Current Epoch" />
      <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
    </div>
  );

  return (
    <div style={{ fontFamily: FONT }}>
      <PageToolbar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>

        {/* KPI chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {KPI_CHIPS.map((chip) => <KpiChip key={chip.label} {...chip} />)}
        </div>

        {/* Today Performance Trend */}
        <Panel title="Today Performance Trend" icon={trendIcon} toolbar={trendToolbar}>
          <div style={{ height: 300, padding: '0 4px 16px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="var(--osmos-fg-subtle)" fontSize={11}
                  tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }}
                />
                <YAxis
                  stroke="var(--osmos-fg-subtle)" fontSize={11}
                  tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }}
                  tickFormatter={(v) => `${Math.round(v * 100)}%`}
                  domain={[0, 1]}
                />
                <Tooltip content={<TrendTooltip />} />
                <ReferenceLine x="12:00" stroke="#D4D7E0" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="yesterday" stroke="var(--osmos-brand-amber)"   strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tomorrow"  stroke="var(--osmos-brand-green)"   strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="lastWeek"  stroke="var(--osmos-brand-primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Advertiser Performance Report */}
        <Panel
          title="Advertiser Performance Report"
          icon={advertiserIcon}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SearchInput placeholder="Search advertiser" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
            </div>
          }
        >
          <DataTable columns={advertiserCols} rows={ADVERTISER_ROWS} emptyRows />
        </Panel>

        {/* Campaign Performance Report */}
        <Panel
          title="Product Ads - Campaign Performance Report"
          icon={campaignIcon}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SearchInput placeholder="Search campaign" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
            </div>
          }
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={campaignCols} rows={CAMPAIGN_ROWS} />
        </Panel>

      </div>
    </div>
  );
}
