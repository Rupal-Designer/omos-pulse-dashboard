import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { InfoIcon, DownloadIcon, StatCard } from '../../ui';

// ─── Constants & Mock Data ────────────────────────────────────────────────────

const KPI_CARDS = [
  { label: 'Requests',      value: '70%',    trend: true },
  { label: 'Response (%)',  value: '70%',    trend: true },
  { label: 'Program CPC',  value: '$0.42',  trend: false },
  { label: 'Program CPM',  value: '$5.47',  trend: false },
  { label: 'CTR',          value: '1.3%',   trend: false },
  { label: 'Ad Impression', value: '78.6 M', trend: false },
  { label: 'Ad Clicks',    value: '1 M',    trend: false },
];

const AD_REVENUE_DATA = [
  { x: '05/08', adRevenue: 4, ctr: 7 },
  { x: '05/08', adRevenue: 6, ctr: 5 },
  { x: '05/08', adRevenue: 5, ctr: 8 },
  { x: '05/08', adRevenue: 8, ctr: 6 },
  { x: '05/08', adRevenue: 6, ctr: 9 },
  { x: '05/08', adRevenue: 9, ctr: 7 },
  { x: '05/08', adRevenue: 7, ctr: 8 },
];

const CLICKS_CPC_DATA = [
  { x: '05/08', clicks: 5, cpc: 8 },
  { x: '05/08', clicks: 7, cpc: 6 },
  { x: '05/08', clicks: 6, cpc: 9 },
  { x: '05/08', clicks: 9, cpc: 5 },
  { x: '05/08', clicks: 7, cpc: 7 },
  { x: '05/08', clicks: 8, cpc: 6 },
  { x: '05/08', clicks: 6, cpc: 8 },
];

const DONUT_COLORS = ['#2563eb', '#f59e0b', '#16a34a', 'var(--osmos-brand-violet)', 'var(--alert-error-primary)'];
const DONUT_DATA = [
  { name: 'Blue',   value: 55 },
  { name: 'Orange', value: 20 },
  { name: 'Green',  value: 10 },
  { name: 'Purple', value: 8  },
  { name: 'Red',    value: 7  },
];
const DONUTS = [
  { label: 'Requests',     center: '86.5 M' },
  { label: 'Response (%)', center: '70%'    },
  { label: 'Ad Impression', center: '78.6 M' },
  { label: 'Ad Clicks',    center: '1 M'    },
];

const TREND_DATA = [
  { x: '05/08', category: 1.58, custom: 0.73, home: 1.58, product: 0.73, purchase: 0.73, search: 1.58 },
  { x: '05/08', category: 1.4,  custom: 0.8,  home: 1.4,  product: 0.8,  purchase: 0.8,  search: 1.4  },
  { x: '05/08', category: 1.6,  custom: 0.7,  home: 1.6,  product: 0.7,  purchase: 0.7,  search: 1.6  },
  { x: '05/08', category: 1.5,  custom: 0.75, home: 1.5,  product: 0.75, purchase: 0.75, search: 1.5  },
  { x: '05/08', category: 1.7,  custom: 0.65, home: 1.7,  product: 0.65, purchase: 0.65, search: 1.7  },
  { x: '05/08', category: 1.45, custom: 0.78, home: 1.45, product: 0.78, purchase: 0.78, search: 1.45 },
  { x: '05/08', category: 1.55, custom: 0.72, home: 1.55, product: 0.72, purchase: 0.72, search: 1.55 },
];
const LINE_COLORS = {
  category: 'var(--osmos-brand-violet)',
  custom:   '#f59e0b',
  home:     '#16a34a',
  product:  'var(--alert-error-primary)',
  purchase: '#2563eb',
  search:   '#0891b2',
};
const TREND_LEGEND = [
  { key: 'category', label: 'Category', value: '1.58M'  },
  { key: 'custom',   label: 'Custom',   value: '730.2K' },
  { key: 'home',     label: 'Home',     value: '1.58M'  },
  { key: 'product',  label: 'Product',  value: '730.2K' },
  { key: 'purchase', label: 'Purchase', value: '730.2K' },
  { key: 'search',   label: 'Search',   value: '1.58M'  },
];

const SKU_DATA = [
  { date: '30 June 25', h1: 141664, h2: 85945,  h3: 141664, h4: 141664, h5: 141664, h6: 141664 },
  { date: '29 June 25', h1: 178900, h2: 182300, h3: 178900, h4: 178900, h5: 178900, h6: 178900 },
  { date: '28 June 25', h1: 141664, h2: 175600, h3: 141664, h4: 141664, h5: 141664, h6: 141664 },
  { date: '27 June 25', h1: 145002, h2: 190450, h3: 145002, h4: 145002, h5: 145002, h6: 145002 },
  { date: '26 June 25', h1: 164271, h2: 200750, h3: 164271, h4: 164271, h5: 164271, h6: 164271 },
  { date: '25 June 25', h1: 159425, h2: 185100, h3: 159425, h4: 159425, h5: 159425, h6: 159425 },
  { date: '24 June 25', h1: 152348, h2: 178000, h3: 152348, h4: 152348, h5: 152348, h6: 152348 },
];
const SKU_COLS = [
  { key: 'h1', label: '00:00–04:00 Hours' },
  { key: 'h2', label: '04:00–08:00 Hours' },
  { key: 'h3', label: '08:00–12:00 Hours' },
  { key: 'h4', label: '12:00–16:00 Hours' },
  { key: 'h5', label: '16:00–20:00 Hours' },
  { key: 'h6', label: '20:00–24:00 Hours' },
];

function skuCellStyle(value) {
  if (value < 120000) return { background: '#fecaca', color: '#7f1d1d' };
  if (value < 160000) return { background: '#fee2e2', color: '#991b1b' };
  if (value < 180000) return { background: '#dcfce7', color: '#166534' };
  return { background: '#bbf7d0', color: '#14532d' };
}

// ─── Shared Primitives ────────────────────────────────────────────────────────

const card = {
  background: 'var(--osmos-bg)',
  border: '1px solid var(--osmos-border)',
  borderRadius: 8,
  padding: 16,
};


const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--osmos-fg-subtle)', cursor: 'pointer', flexShrink: 0 }}>
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--osmos-fg-subtle)', cursor: 'pointer', flexShrink: 0 }}>
    <polyline points="1,12 5,7 9,9 15,3" />
  </svg>
);

const FilterLabel = () => (
  <span style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--osmos-brand-primary)', whiteSpace: 'nowrap' }}>
    1 Filter Applicable: Date
  </span>
);

const tooltipStyle = {
  fontSize: 11,
  fontFamily: "'Open Sans', sans-serif",
  border: '1px solid var(--osmos-border)',
  borderRadius: 6,
  background: 'var(--osmos-bg)',
  color: 'var(--osmos-fg)',
};

// ─── 1. KPI Stat Cards ────────────────────────────────────────────────────────

const KpiRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 20 }}>
    {KPI_CARDS.map((card) => (
      <StatCard key={card.label} label={card.label} value={card.value} />
    ))}
  </div>
);

// ─── 2. Dual Line Charts ──────────────────────────────────────────────────────

const MetricPill = ({ label, color }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    background: color,
    borderRadius: 99,
    padding: '2px 9px',
    cursor: 'pointer',
  }}>
    {label} <span style={{ fontSize: 9 }}>▼</span>
  </span>
);

const DualLineChart = ({ title, data, line1Key, line1Label, line2Key, line2Label, line1Color, line2Color }) => (
  <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 0 }}>
    {/* header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <ChartIcon />
        <MetricPill label={line1Label} color={line1Color} />
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>vs</span>
        <MetricPill label={line2Label} color={line2Color} />
      </div>
      <DownloadIcon size={14} color="var(--osmos-fg-subtle)" />
    </div>

    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" />
        <XAxis dataKey="x" tick={{ fontSize: 10, fill: 'var(--osmos-fg-muted)' }} />
        <YAxis tick={{ fontSize: 10, fill: 'var(--osmos-fg-muted)' }} width={36} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey={line1Key}
          stroke={line1Color}
          strokeWidth={2}
          dot={{ r: 3, fill: line1Color }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey={line2Key}
          stroke={line2Color}
          strokeWidth={2}
          strokeDasharray="4 2"
          dot={{ r: 3, fill: line2Color }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>

    {/* filter label bottom-right */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <FilterLabel />
    </div>
  </div>
);

const DualChartsRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
    <DualLineChart
      data={AD_REVENUE_DATA}
      line1Key="adRevenue"
      line1Label="Ad Revenue"
      line1Color="var(--osmos-brand-primary)"
      line2Key="ctr"
      line2Label="CTR"
      line2Color="var(--osmos-brand-amber)"
    />
    <DualLineChart
      data={CLICKS_CPC_DATA}
      line1Key="clicks"
      line1Label="Clicks"
      line1Color="var(--osmos-brand-primary)"
      line2Key="cpc"
      line2Label="CPC"
      line2Color="var(--osmos-brand-amber)"
    />
  </div>
);

// ─── 3. Page Level Contribution (4 Donuts) ────────────────────────────────────

const DonutChart = ({ centerValue, centerLabel }) => {
  const cx = 90;
  const cy = 90;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        <PieChart width={180} height={180}>
          <Pie
            data={DONUT_DATA}
            cx={cx}
            cy={cy}
            innerRadius={55}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          >
            {DONUT_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={DONUT_COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        {/* Center label overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', lineHeight: 1.2 }}>
            {centerValue}
          </div>
          <div style={{ fontSize: 10, color: 'var(--osmos-fg-muted)', marginTop: 2 }}>
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

const PageLevelContribution = () => (
  <div style={{ ...card, marginTop: 16 }}>
    {/* header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>Page Level Contribution</span>
        <InfoIcon size={13} color="var(--osmos-fg-subtle)" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FilterLabel />
        <DownloadIcon size={14} color="var(--osmos-fg-subtle)" />
      </div>
    </div>

    {/* 4 donuts */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {DONUTS.map((d, i) => (
        <DonutChart key={i} centerValue={d.center} centerLabel={d.label} />
      ))}
    </div>

    {/* shared color legend */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
      {DONUT_DATA.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: DONUT_COLORS[i], flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{entry.name}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── 4. Daily Page Performance Trend ─────────────────────────────────────────

const DailyTrend = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div style={{ ...card, marginTop: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>Daily Page Performance Trend</span>
          <InfoIcon size={13} color="var(--osmos-fg-subtle)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* dropdown pill */}
          <button
            onClick={() => setDropdownOpen(p => !p)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--osmos-fg)',
              background: 'var(--osmos-bg-subtle)',
              border: '1px solid var(--osmos-border)',
              borderRadius: 99,
              padding: '4px 12px',
              cursor: 'pointer',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Lorem Ipsum <span style={{ fontSize: 9 }}>▼</span>
          </button>
          <GridIcon />
          <ChartIcon />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={TREND_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" />
          <XAxis dataKey="x" tick={{ fontSize: 10, fill: 'var(--osmos-fg-muted)' }} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--osmos-fg-muted)' }} width={36} domain={[0, 2]} />
          <Tooltip contentStyle={tooltipStyle} />
          {Object.entries(LINE_COLORS).map(([key, color]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* custom legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 20px',
        marginTop: 16,
        paddingTop: 12,
        borderTop: '1px solid var(--osmos-border)',
      }}>
        {TREND_LEGEND.map(item => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 24, height: 3, background: LINE_COLORS[item.key], borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>
              {item.label}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg)' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 5. Available Advertising SKU By Hours ────────────────────────────────────

const SkuTable = () => (
  <div style={{ ...card, marginTop: 16 }}>
    {/* header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <GridIcon />
        {/* Figma typo preserved verbatim */}
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>
          Available Advetising SKU By Hours
        </span>
        <InfoIcon size={13} color="var(--osmos-fg-subtle)" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <GridIcon />
        <ChartIcon />
        <DownloadIcon size={14} color="var(--osmos-fg-subtle)" />
      </div>
    </div>

    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Open Sans', sans-serif" }}>
        <thead>
          <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
            <th style={{
              textAlign: 'left',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--osmos-fg-muted)',
              padding: '8px 12px',
              borderBottom: '1px solid var(--osmos-border)',
              whiteSpace: 'nowrap',
            }}>
              Date
            </th>
            {SKU_COLS.map(col => (
              <th key={col.key} style={{
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--osmos-fg-muted)',
                padding: '8px 12px',
                borderBottom: '1px solid var(--osmos-border)',
                whiteSpace: 'nowrap',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SKU_DATA.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}>
              <td style={{
                fontSize: 12,
                color: 'var(--osmos-fg-muted)',
                padding: '8px 12px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}>
                {row.date}
              </td>
              {SKU_COLS.map(col => {
                const val = row[col.key];
                const cellColors = skuCellStyle(val);
                return (
                  <td key={col.key} style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '8px 12px',
                    background: cellColors.background,
                    color: cellColors.color,
                  }}>
                    {val.toLocaleString()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductAdsAnalyticsPage() {
  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--osmos-bg-subtle)',
      minHeight: '100vh',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* 1. KPI Stat Cards */}
      <KpiRow />

      {/* 2. Dual Line Charts */}
      <DualChartsRow />

      {/* 3. Page Level Contribution Donuts */}
      <PageLevelContribution />

      {/* 4. Daily Page Performance Trend */}
      <DailyTrend />

      {/* 5. Available Advertising SKU By Hours */}
      <SkuTable />
    </div>
  );
}
