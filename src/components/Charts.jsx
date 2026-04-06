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
  { date: '05/08', carts: 10000000, orders: 10000000 },
  { date: '05/09', carts: 10000000, orders: 10000000 },
  { date: '05/10', carts: 10000000, orders: 10000000 },
  { date: '05/11', carts: 10100000, orders: 10000100 },
  { date: '05/12', carts: 10050000, orders: 10000050 },
  { date: '05/13', carts: 10020000, orders: 10000020 },
  { date: '05/14', carts: 10000000, orders: 10000000 },
];

function formatYAxis(val) {
  if (val >= 1000) return `${(val/1000).toFixed(0)}K`;
  return val;
}

function formatYAxisM(val) {
  if (val >= 1000000) return `${(val/1000000).toFixed(0)}M`;
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
      <span style={{ fontSize: 11, color: '#333', fontWeight: 500 }}>{label}</span>
      <ChevronDown />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #E8E8E8', borderRadius: 8,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: 180,
    }}>
      {payload.map((p, i) => (
        <div key={i} style={{ marginBottom: i < payload.length - 1 ? 10 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 8, height: 2, background: p.color, borderRadius: 2 }}/>
            <span style={{ fontSize: 11, color: '#555' }}>{p.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontSize: 11, color: '#888' }}>15 Apr 25</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#222' }}>
              ${(p.value / 1000).toFixed(1)}K
            </span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? '#22C55E' : '#EF4444', marginTop: 2 }}>
            {i === 0 ? '↑ $5,822 (89%)' : '↓ 0.11 (-6.48%)'}
          </div>
        </div>
      ))}
    </div>
  );
};

function ChartCard({ title, children, leftMetrics, rightMetric }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, flex: 1,
      border: '1px solid #F0F0F0', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #F5F5F5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, background: '#F0F4FF', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {leftMetrics}
            <span style={{ color: '#CCC', fontSize: 12 }}>Vs</span>
            {rightMetric}
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <DownloadIcon />
        </button>
      </div>
      {/* Chart */}
      <div style={{ padding: '12px 8px 8px' }}>
        {children}
      </div>
      <div style={{ padding: '4px 16px 10px', fontSize: 10, color: '#999', textAlign: 'right' }}>
        1 Filter Applicable: <span style={{ color: '#5B6EF5', fontWeight: 500 }}>Date</span>
      </div>
    </div>
  );
}

export default function Charts() {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
      {/* Chart 1: Link Clicks vs Landing Page views */}
      <ChartCard
        leftMetrics={<MetricTag color="#5B6EF5" label="Link Clicks" />}
        rightMetric={<MetricTag color="#F5A623" label="Landing Page views" />}
      >
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={clicksData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
            <Tooltip content={<div/>} />
            <Line type="monotone" dataKey="clicks" stroke="#5B6EF5" strokeWidth={2}
              dot={false} activeDot={{ r: 4, fill: '#5B6EF5' }} name="Link Clicks" />
            <Line type="monotone" dataKey="views" stroke="#F5A623" strokeWidth={2}
              dot={false} activeDot={{ r: 4, fill: '#F5A623' }} name="Landing Page views" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Chart 2: Overall Add to Carts vs Orders */}
      <ChartCard
        leftMetrics={<MetricTag color="#5B6EF5" label="Overall Add to Carts" />}
        rightMetric={<MetricTag color="#F5A623" label="Orders" />}
      >
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={cartOrdersData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatYAxisM} tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="carts" stroke="#5B6EF5" strokeWidth={2}
              dot={false} activeDot={{ r: 5, fill: '#5B6EF5' }} name="Overall Add to Carts" />
            <Line type="monotone" dataKey="orders" stroke="#F5A623" strokeWidth={2}
              dot={false} activeDot={{ r: 5, fill: '#F5A623' }} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
