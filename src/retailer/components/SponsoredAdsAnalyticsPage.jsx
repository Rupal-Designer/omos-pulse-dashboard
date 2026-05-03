import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { StatCard } from '../../ui';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const trendData = [
  { label: '05/08', value: 400 },
  { label: '05/08', value: 650 },
  { label: '05/08', value: 500 },
  { label: '05/08', value: 750 },
  { label: '05/08', value: 600 },
  { label: '05/08', value: 800 },
  { label: '05/08', value: 700 },
];

const barData = [
  { name: 'story_ads_6',  value: 4200 },
  { name: 'story_ads_10', value: 3800 },
  { name: 'story_ads_7',  value: 4500 },
  { name: 'story_ads_11', value: 3200 },
  { name: 'story_ads_8',  value: 4100 },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function randomHeat() {
  return Math.random();
}

const heatData = DAYS.map(day => ({
  day,
  hours: HOURS.map(() => randomHeat()),
}));

function heatColor(v) {
  if (v < 0.33) return '#e0e7ff';
  if (v < 0.66) return '#818cf8';
  return 'var(--osmos-brand-primary)';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const FilterBadge = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--osmos-fg-muted)',
    background: 'var(--osmos-bg-subtle)',
    border: '1px solid var(--osmos-border)',
    borderRadius: 99,
    padding: '2px 8px',
  }}>
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
    </svg>
    1 Filter applicable: Date
  </span>
);

const SectionCard = ({ children, style }) => (
  <div style={{
    background: 'var(--osmos-bg)',
    border: '1px solid var(--osmos-border)',
    borderRadius: 8,
    padding: 20,
    ...style,
  }}>
    {children}
  </div>
);

const CardTitle = ({ title, showBadge = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>{title}</span>
    {showBadge && <FilterBadge />}
  </div>
);

// ─── Filter Toolbar ───────────────────────────────────────────────────────────

const FilterToolbar = () => {
  const [advertiser, setAdvertiser] = useState('Advertiser 5');

  return (
    <div style={{
      background: 'var(--osmos-bg)',
      borderBottom: '1px solid var(--osmos-border)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      borderRadius: '8px 8px 0 0',
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--osmos-fg)',
          background: 'transparent',
          border: '1px solid var(--osmos-border)',
          borderRadius: 6,
          padding: '5px 12px',
          cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif",
        }}>
          + Add a Filter
        </button>

        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--osmos-brand-primary)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif",
          padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v5h5" />
            <path d="M15 12V7h-5" />
            <path d="M13.5 7A6 6 0 0 0 2.5 9" />
            <path d="M2.5 9a6 6 0 0 0 11 2" />
          </svg>
          Change Log
        </button>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <select
          value={advertiser}
          onChange={e => setAdvertiser(e.target.value)}
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--osmos-fg)',
            background: 'var(--osmos-bg)',
            border: '1px solid var(--osmos-border)',
            borderRadius: 6,
            padding: '5px 28px 5px 10px',
            cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif",
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 8px center',
          }}
        >
          <option>Advertiser 5</option>
          <option>Advertiser 1</option>
          <option>Advertiser 2</option>
        </select>

        <div style={{
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--osmos-fg-muted)',
          background: 'var(--osmos-bg-subtle)',
          border: '1px solid var(--osmos-border)',
          borderRadius: 6,
          padding: '5px 10px',
        }}>
          08 May 25 – 14 May 25
        </div>
      </div>
    </div>
  );
};

// ─── KPI Cards ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  { value: '86.5 M', label: 'Requests' },
  { value: '86.5 M', label: 'Requests' },
  { value: '86.5 M', label: 'Requests' },
  { value: '86.5 M', label: 'Requests' },
];

const KpiRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
    {KPI_CARDS.map((card, i) => (
      <StatCard key={i} label={card.label} value={card.value} />
    ))}
  </div>
);

// ─── Page Performance Trend ───────────────────────────────────────────────────

const PagePerformanceTrend = ({ title = 'Page Performance Trend' }) => (
  <SectionCard>
    <CardTitle title={title} />
    <div style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', marginBottom: 16 }}>
      Ad Impression
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={trendData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--osmos-fg-muted)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--osmos-fg-muted)' }} width={40} />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            fontFamily: "'Open Sans', sans-serif",
            border: '1px solid var(--osmos-border)',
            borderRadius: 6,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--osmos-brand-primary)"
          strokeWidth={2}
          dot={{ r: 3, fill: 'var(--osmos-brand-primary)' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </SectionCard>
);

// ─── Page Level Contribution ──────────────────────────────────────────────────

const PageLevelContribution = () => (
  <SectionCard>
    <CardTitle title="Page Level Contribution" />
    <div style={{ height: 12 }} />
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={barData} margin={{ top: 4, right: 16, bottom: 24, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--osmos-fg-muted)' }} angle={-15} textAnchor="end" />
        <YAxis tick={{ fontSize: 11, fill: 'var(--osmos-fg-muted)' }} width={48} />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            fontFamily: "'Open Sans', sans-serif",
            border: '1px solid var(--osmos-border)',
            borderRadius: 6,
          }}
        />
        <Bar dataKey="value" fill="var(--osmos-brand-primary)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </SectionCard>
);

// ─── Heatmap ──────────────────────────────────────────────────────────────────

const HeatmapSection = ({ title = 'Available Advertising SKU By Hours' }) => (
  <SectionCard>
    <CardTitle title={title} />
    <div style={{ height: 16 }} />
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 4, paddingLeft: 32 }}>
        {HOURS.map(h => (
          <div key={h} style={{
            width: 22,
            textAlign: 'center',
            fontSize: 9,
            color: 'var(--osmos-fg-subtle)',
            flexShrink: 0,
          }}>
            {h}
          </div>
        ))}
      </div>
      {heatData.map(row => (
        <div key={row.day} style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
          <div style={{
            width: 28,
            fontSize: 10,
            color: 'var(--osmos-fg-muted)',
            textAlign: 'right',
            paddingRight: 4,
            flexShrink: 0,
          }}>
            {row.day}
          </div>
          {row.hours.map((v, i) => (
            <div key={i} style={{
              width: 22,
              height: 22,
              borderRadius: 3,
              background: heatColor(v),
              flexShrink: 0,
              cursor: 'default',
              transition: 'opacity 0.15s',
            }} title={`${row.day} ${i}:00 — ${(v * 100).toFixed(0)}%`} />
          ))}
        </div>
      ))}
      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>Low</div>
        {['#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', 'var(--osmos-brand-primary)'].map((c, i) => (
          <div key={i} style={{ width: 16, height: 10, borderRadius: 2, background: c }} />
        ))}
        <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>High</div>
      </div>
    </div>
  </SectionCard>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SponsoredAdsAnalyticsPage() {
  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--osmos-bg-subtle)',
      minHeight: '100vh',
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {/* Filter Toolbar Card */}
      <div style={{
        background: 'var(--osmos-bg)',
        border: '1px solid var(--osmos-border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <FilterToolbar />
      </div>

      {/* KPI Cards */}
      <KpiRow />

      {/* Charts */}
      <PagePerformanceTrend title="Page Performance Trend" />
      <PageLevelContribution />
      <HeatmapSection title="Available Advertising SKU By Hours" />
    </div>
  );
}
