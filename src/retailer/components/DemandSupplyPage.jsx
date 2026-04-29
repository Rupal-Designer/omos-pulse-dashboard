import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Icon, SearchIcon, FilterIcon, ColumnsIcon, DownloadIcon, PlusIcon, ChevronDownIcon, CalendarIcon, MoreIcon } from '../../ui/atoms/Icon';

const FONT = "'Open Sans', sans-serif";

// ─── Constants & Mock Data ────────────────────────────────────────────────────

const GAP_ROWS = [
  { categoryL1: 'Body Care',             requests: '257 M', if: '30%', responseRate: '—', adRevenue: '$150 K', computedDailyBudget: '$120 K', budgetUtilization: '—', campaignCount: '7 K' },
  { categoryL1: 'Skin Care',             requests: '200 M', if: '50%', responseRate: '—', adRevenue: '$175 K', computedDailyBudget: '$150 K', budgetUtilization: '—', campaignCount: '12 K' },
  { categoryL1: 'Makeup',                requests: '400 M', if: '45%', responseRate: '—', adRevenue: '$210 K', computedDailyBudget: '$200 K', budgetUtilization: '—', campaignCount: '14 K' },
  { categoryL1: 'Body Care',             requests: '650 M', if: '50%', responseRate: '—', adRevenue: '$350 K', computedDailyBudget: '$320 K', budgetUtilization: '—', campaignCount: '9 K' },
  { categoryL1: 'Oral Care',             requests: '600 M', if: '52%', responseRate: '—', adRevenue: '$330 K', computedDailyBudget: '$300 K', budgetUtilization: '—', campaignCount: '6 K' },
  { categoryL1: 'Fragrance',             requests: '750 M', if: '75%', responseRate: '—', adRevenue: '$520 K', computedDailyBudget: '$480 K', budgetUtilization: '—', campaignCount: '11 K' },
  { categoryL1: 'Sun Care',              requests: '900 M', if: '60%', responseRate: '—', adRevenue: '$420 K', computedDailyBudget: '$400 K', budgetUtilization: '—', campaignCount: '7 K' },
  { categoryL1: 'Hair Care',             requests: '1 B',   if: '80%', responseRate: '—', adRevenue: '$680 K', computedDailyBudget: '$640 K', budgetUtilization: '—', campaignCount: '18 K' },
  { categoryL1: 'Hair Care',             requests: '1.2 B', if: '90%', responseRate: '—', adRevenue: '$850 K', computedDailyBudget: '$820 K', budgetUtilization: '—', campaignCount: '22 K' },
  { categoryL1: 'Hair Styling Products', requests: '1 M',   if: '30%', responseRate: '—', adRevenue: '$50 K',  computedDailyBudget: '$40 K',  budgetUtilization: '—', campaignCount: '10%' },
];

const GMV_DATA = [
  { name: 'Skin Care',   adv: 22, nonAdv: 0  },
  { name: 'Body Care',   adv: 78, nonAdv: 10 },
  { name: 'Hair Care',   adv: 38, nonAdv: 0  },
  { name: 'Makeup',      adv: 12, nonAdv: 0  },
  { name: 'Fragrance',   adv: 96, nonAdv: 0  },
  { name: 'Oral Care',   adv: 28, nonAdv: 0  },
  { name: 'Sun Care',    adv: 62, nonAdv: 0  },
  { name: 'Body Care 2', adv: 26, nonAdv: 0  },
  { name: 'Fragrance 2', adv: 50, nonAdv: 0  },
];

const CAT_PERF_ROWS = [
  { categoryL1: 'Body Care', adRevenue: '$150 K', programCpc: '$1.05', programCpm: '$1.4', adImpressions: '1.4 B', adClicks: '13.6 M', attributedAtc: '175 K', attributedOrders: '12 K' },
  { categoryL1: 'Foot Care', adRevenue: '$175 K', programCpc: '$0.82', programCpm: '$1.6', adImpressions: '1.8 B', adClicks: '18.7 M', attributedAtc: '192 K', attributedOrders: '16 K' },
  { categoryL1: 'Makeup',    adRevenue: '$200 K', programCpc: '$1.52', programCpm: '$2.1', adImpressions: '2.2 B', adClicks: '21.1 M', attributedAtc: '201 K', attributedOrders: '17 K' },
  { categoryL1: 'Oral Care', adRevenue: '$225 K', programCpc: '$0.94', programCpm: '$2.2', adImpressions: '2.6 B', adClicks: '24.2 M', attributedAtc: '229 K', attributedOrders: '19 K' },
  { categoryL1: 'Hair Care', adRevenue: '$280 K', programCpc: '$0.45', programCpm: '$1.8', adImpressions: '3.3 B', adClicks: '18.1 M', attributedAtc: '251 K', attributedOrders: '21 K' },
  { categoryL1: 'Body Care', adRevenue: '$400 K', programCpc: '$1.35', programCpm: '$2.7', adImpressions: '5.1 B', adClicks: '31.5 M', attributedAtc: '312 K', attributedOrders: '28 K' },
];

// ─── Heatmap (hand-rolled CSS grid) ──────────────────────────────────────────

const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
const HEAT_PALETTE = ['#1a1f3d', '#2e5a4a', '#2f7d56', '#3aa874', '#56c57d', '#9ad557', '#d4e05a'];

function seedHeatmap(seed) {
  const cells = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const n = Math.sin((d + 1) * (h + 1) * seed) * 10000;
      const v = Math.abs(n - Math.floor(n));
      const level = v < 0.15 ? 0 : v < 0.3 ? 1 : v < 0.5 ? 2 : v < 0.7 ? 3 : v < 0.85 ? 4 : v < 0.95 ? 5 : 6;
      cells.push({ day: d, hour: h, level, value: `$0.${Math.floor(v * 100)}` });
    }
  }
  return cells;
}

const HEAT_A = seedHeatmap(0.313);
const HEAT_B = seedHeatmap(0.721);

function Heatmap({ cells }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(24, 1fr)', gap: 2, minWidth: 720 }}>
        <div />
        {Array.from({ length: 24 }).map((_, h) => (
          <div key={h} style={{ fontSize: 10, color: 'var(--osmos-fg-muted)', textAlign: 'center', paddingBottom: 4, fontFamily: FONT }}>
            {h % 2 === 0 ? `${h}:00` : ''}
          </div>
        ))}
        {DAYS.map((day, d) => (
          <React.Fragment key={day}>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', paddingRight: 8, fontFamily: FONT }}>
              {day}
            </div>
            {cells
              .filter((c) => c.day === d)
              .map((c) => (
                <div
                  key={`${c.day}-${c.hour}`}
                  title={`${day} ${c.hour}:00 — ${c.value}`}
                  style={{
                    background: HEAT_PALETTE[c.level],
                    height: 22, borderRadius: 2,
                    fontSize: 9, color: 'rgba(255,255,255,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 600, fontFamily: FONT,
                  }}
                >
                  {c.level >= 3 ? c.value : ''}
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Shared panel primitives ──────────────────────────────────────────────────

const TH = {
  textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 600,
  color: 'var(--osmos-fg-muted)', background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap', fontFamily: FONT,
};
const TD = {
  padding: '10px 16px', fontSize: 13, color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)', verticalAlign: 'middle', fontFamily: FONT,
};
const TD_BOLD = { ...TD, fontWeight: 700, background: 'var(--osmos-bg-subtle)' };

function Panel({ title, icon, toolbar, children, footerNote }) {
  return (
    <div style={{
      background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
      borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px 12px', flexWrap: 'wrap' }}>
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

function IconBtn({ children, ariaLabel }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={ariaLabel}
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

function SearchInput({ placeholder }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      border: '1px solid var(--osmos-border)', borderRadius: 6,
      padding: '4px 10px', background: 'var(--osmos-bg)', minWidth: 200, height: 28,
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
          <path d="M3 3v18h18"/>
          <path d="M7 14l4-4 4 4 4-4"/>
        </Icon>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Demand &amp; Supply</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconBtn ariaLabel="Search"><SearchIcon size={14} /></IconBtn>
        <IconBtn ariaLabel="Filter"><FilterIcon size={14} /></IconBtn>
        <IconBtn ariaLabel="Column settings"><ColumnsIcon size={14} /></IconBtn>
        <div style={{ width: 1, height: 18, background: 'var(--osmos-border)', margin: '0 4px' }} />
        <DropdownPill label="All Pages" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid var(--osmos-border)', borderRadius: 6,
          padding: '4px 10px', background: 'var(--osmos-bg)', height: 28, marginLeft: 4,
        }}>
          <CalendarIcon size={13} color="var(--osmos-fg-muted)" />
          <span style={{ fontSize: 12, color: 'var(--osmos-fg)', fontFamily: FONT }}>08 May 26 - 14 May 26</span>
          <ChevronDownIcon size={12} color="var(--osmos-fg-muted)" />
        </div>
      </div>
    </div>
  );
}

function DataTable({ columns, rows, totals }) {
  const [hovRow, setHovRow] = useState(null);
  return (
    <div style={{ overflowX: 'auto', borderTop: '1px solid var(--osmos-border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ ...TH, textAlign: c.align === 'right' ? 'right' : 'left' }}>
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
                <td key={c.key} style={{ ...TD, textAlign: c.align === 'right' ? 'right' : 'left' }}>
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr>
              {columns.map((c) => (
                <td key={c.key} style={{ ...TD_BOLD, textAlign: c.align === 'right' ? 'right' : 'left' }}>
                  {totals[c.key]}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SeasonalityTabs({ value, onChange }) {
  const tabs = ['days-hours', 'days', 'hours'];
  const labels = { 'days-hours': 'Days & Hours', days: 'Days', hours: 'Hours' };
  return (
    <div style={{ display: 'flex', background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: 2 }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            padding: '4px 12px', border: 'none', borderRadius: 5, cursor: 'pointer',
            fontSize: 12, fontWeight: value === t ? 600 : 400,
            background: value === t ? 'var(--osmos-bg)' : 'transparent',
            color: value === t ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
            boxShadow: value === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            fontFamily: FONT,
          }}
        >
          {labels[t]}
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DemandSupplyPage() {
  const [tabA, setTabA] = useState('days-hours');
  const [tabB, setTabB] = useState('days-hours');

  const gapCols = [
    { key: 'categoryL1',          label: 'Category L1' },
    { key: 'requests',            label: 'Requests',                align: 'right' },
    { key: 'if',                  label: 'IF',                      align: 'right' },
    { key: 'responseRate',        label: 'Response Rate (%)',        align: 'right' },
    { key: 'adRevenue',           label: 'Ad Revenue',              align: 'right' },
    { key: 'computedDailyBudget', label: 'Computed Daily Budget',   align: 'right' },
    { key: 'budgetUtilization',   label: 'Budget Utilization (%)',  align: 'right' },
    { key: 'campaignCount',       label: 'Campaign Count',          align: 'right' },
  ];

  const perfCols = [
    { key: 'categoryL1',       label: 'category L1' },
    { key: 'adRevenue',        label: 'Ad Revenue',              align: 'right' },
    { key: 'programCpc',       label: 'Program CPC',             align: 'right' },
    { key: 'programCpm',       label: 'Program CPM',             align: 'right' },
    { key: 'adImpressions',    label: 'Ad Impressions',          align: 'right' },
    { key: 'adClicks',         label: 'Ad Clicks',               align: 'right' },
    { key: 'attributedAtc',    label: 'Attributed Add to cart',  align: 'right' },
    { key: 'attributedOrders', label: 'Attributed Orders',       align: 'right' },
  ];

  const perfTotals = {
    categoryL1: 'Total', adRevenue: '$27 M', programCpc: '$27', programCpm: '$2.1',
    adImpressions: '19 B', adClicks: '108 M', attributedAtc: '7 M', attributedOrders: '',
  };

  const trendIcon = <Icon size={14}><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 4-4"/></Icon>;
  const clockIcon = <Icon size={14}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
  const barIcon   = <Icon size={14}><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></Icon>;
  const checkIcon = <Icon size={14}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></Icon>;

  return (
    <div style={{ fontFamily: FONT }}>
      <PageToolbar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>

        {/* Gap Analytics */}
        <Panel
          title="Demand & Supply Gap Analytics"
          icon={trendIcon}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--osmos-brand-primary)', fontFamily: FONT }}>
                <PlusIcon size={12} color="var(--osmos-brand-primary)" /> Add a Filter
              </button>
              <div style={{ flex: 1 }} />
              <SearchInput placeholder="Search category L1" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
              <IconBtn ariaLabel="More"><MoreIcon size={14} /></IconBtn>
            </div>
          }
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={gapCols} rows={GAP_ROWS} />
        </Panel>

        {/* Seasonality pair */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[{ cells: HEAT_A, tab: tabA, setTab: setTabA }, { cells: HEAT_B, tab: tabB, setTab: setTabB }].map((s, i) => (
            <Panel
              key={i}
              title="Seasonality"
              icon={clockIcon}
              toolbar={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SeasonalityTabs value={s.tab} onChange={s.setTab} />
                  <DropdownPill label="All Impressions" />
                  <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
                </div>
              }
              footerNote="Data from Ans.Taxa"
            >
              <div style={{ padding: '12px 16px' }}>
                <Heatmap cells={s.cells} />
              </div>
            </Panel>
          ))}
        </div>

        {/* Advertiser Overall GMV */}
        <Panel
          title="Advertiser Overall GMV"
          icon={barIcon}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--osmos-brand-amber)' }} />
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Non-Advertiser Members</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--osmos-brand-green)' }} />
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Advertiser Members</span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <DropdownPill label="All Impressions" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
            </div>
          }
        >
          <div style={{ height: 280, padding: '4px 0 8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GMV_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} />
                <YAxis stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} contentStyle={{ fontSize: '12px', borderRadius: '6px', fontFamily: FONT }} />
                <Bar dataKey="adv"    stackId="a" fill="var(--osmos-brand-amber)" name="Non-Advertiser Members" radius={[0, 0, 0, 0]} />
                <Bar dataKey="nonAdv" stackId="a" fill="var(--osmos-brand-green)" name="Advertiser Members"     radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Search Demand Planner — empty state */}
        <Panel
          title="Search Demand Planner"
          icon={<SearchIcon size={14} color="var(--osmos-brand-primary)" />}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SearchInput placeholder="Search category L1" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
            </div>
          }
        >
          <div style={{ borderTop: '1px solid var(--osmos-border)' }}>
            <div style={{ display: 'flex', background: 'var(--osmos-bg-subtle)', padding: '10px 16px', gap: 32 }}>
              {['Category L1', 'Total Search Volume', 'High Demand Search Queries', 'Response Rate of High Demand Search Queries'].map((c) => (
                <span key={c} style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', flex: 1, fontFamily: FONT }}>{c}</span>
              ))}
            </div>
            <div style={{ padding: '56px 16px', textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 13, fontFamily: FONT }}>
              No Data Available
            </div>
          </div>
        </Panel>

        {/* Category Performance */}
        <Panel
          title="Category Performance Report"
          icon={checkIcon}
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SearchInput placeholder="Search category L1" />
              <IconBtn ariaLabel="Download"><DownloadIcon size={14} /></IconBtn>
            </div>
          }
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={perfCols} rows={CAT_PERF_ROWS} totals={perfTotals} />
        </Panel>

      </div>
    </div>
  );
}
