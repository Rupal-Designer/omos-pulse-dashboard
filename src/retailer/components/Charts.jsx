import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const dates = ['05/08','05/09','05/10','05/11','05/12','05/13','05/14'];

const clicksData = [
  { date: '05/08', clicks: 12000, views: 8000 },
  { date: '05/09', clicks: 18000, views: 13000 },
  { date: '05/10', clicks: 26000, views: 22000 },
  { date: '05/11', clicks: 22000, views: 19000 },
  { date: '05/12', clicks: 17000, views: 15000 },
  { date: '05/13', clicks: 14000, views: 11000 },
  { date: '05/14', clicks: 10000, views: 8500 },
];

const cartOrdersData = [
  { date: '05/08', carts: 4200, orders: 1800 },
  { date: '05/09', carts: 5100, orders: 2200 },
  { date: '05/10', carts: 7800, orders: 3100 },
  { date: '05/11', carts: 6500, orders: 2900 },
  { date: '05/12', carts: 5200, orders: 2100 },
  { date: '05/13', carts: 4100, orders: 1700 },
  { date: '05/14', carts: 3800, orders: 1500 },
];

function formatYAxis(val) {
  if (val >= 1000) return `${(val/1000).toFixed(0)}K`;
  return val;
}

function formatYAxisM(val) {
  if (val >= 1000) return `${(val/1000).toFixed(1)}K`;
  return val;
}

function ChevronDown({ color = '#555' }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function MetricTag({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }}/>
      <span style={{ fontSize: 11, color: 'var(--osmos-fg)', fontWeight: 500 }}>{label}</span>
      <ChevronDown />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: 160,
    }}>
      <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginBottom: 8, fontWeight: 500 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: i < payload.length - 1 ? 6 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 2, background: p.color, borderRadius: 2 }}/>
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{p.name}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg)' }}>
            {p.value >= 1000000
              ? `${(p.value / 1000000).toFixed(1)}M`
              : p.value >= 1000
              ? `${(p.value / 1000).toFixed(1)}K`
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

function ChartCard({ title, children, leftMetrics, rightMetric }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, flex: 1,
      border: '1px solid var(--osmos-border)', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--osmos-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, background: 'var(--osmos-bg-muted)', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {leftMetrics}
            <span style={{ color: '#CCC', fontSize: 12 }}>Vs</span>
            {rightMetric}
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Download chart data">
          <DownloadIcon />
        </button>
      </div>
      {/* Chart */}
      <div style={{ padding: '12px 8px 8px' }}>
        {children}
      </div>
      <div style={{ padding: '4px 16px 10px', fontSize: 10, color: 'var(--osmos-fg-subtle)', textAlign: 'right' }}>
        1 Filter Applicable: <span style={{ color: 'var(--osmos-brand-primary)', fontWeight: 500 }}>Date</span>
      </div>
    </div>
  );
}

export default function Charts() {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
      {/* Chart 1: Link Clicks vs Landing Page views */}
      <ChartCard
        leftMetrics={<MetricTag color="var(--osmos-brand-primary)" label="Link Clicks" />}
        rightMetric={<MetricTag color="var(--osmos-brand-amber)" label="Landing Page views" />}
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={clicksData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
            aria-label="Line chart showing Link Clicks vs Landing Page Views over the selected date range">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--osmos-fg-subtle)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: 'var(--osmos-fg-subtle)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom" height={28} iconType="plainline"
              formatter={(val) => <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', fontFamily: "'Open Sans', sans-serif" }}>{val}</span>}
            />
            <Line type="monotone" dataKey="clicks" stroke="var(--osmos-brand-primary)" strokeWidth={2}
              dot={false} activeDot={{ r: 4, fill: 'var(--osmos-brand-primary)' }} name="Link Clicks" />
            <Line type="monotone" dataKey="views" stroke="var(--osmos-brand-amber)" strokeWidth={2}
              strokeDasharray="5 3"
              dot={false} activeDot={{ r: 4, fill: 'var(--osmos-brand-amber)' }} name="Landing Page views" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Chart 2: Overall Add to Carts vs Orders */}
      <ChartCard
        leftMetrics={<MetricTag color="var(--osmos-brand-primary)" label="Overall Add to Carts" />}
        rightMetric={<MetricTag color="var(--osmos-brand-amber)" label="Orders" />}
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cartOrdersData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
            aria-label="Line chart showing Overall Add to Carts vs Orders over the selected date range">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--osmos-fg-subtle)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatYAxisM} tick={{ fontSize: 11, fill: 'var(--osmos-fg-subtle)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom" height={28} iconType="plainline"
              formatter={(val) => <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', fontFamily: "'Open Sans', sans-serif" }}>{val}</span>}
            />
            <Line type="monotone" dataKey="carts" stroke="var(--osmos-brand-primary)" strokeWidth={2}
              dot={false} activeDot={{ r: 5, fill: 'var(--osmos-brand-primary)' }} name="Overall Add to Carts" />
            <Line type="monotone" dataKey="orders" stroke="var(--osmos-brand-amber)" strokeWidth={2}
              strokeDasharray="5 3"
              dot={false} activeDot={{ r: 5, fill: 'var(--osmos-brand-amber)' }} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
