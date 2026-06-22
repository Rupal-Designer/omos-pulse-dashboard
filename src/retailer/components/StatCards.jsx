import React from 'react';

const STATS = [
  { label: 'Total Cohort',      value: '247'     },
  { label: 'Active Advertiser', value: '158'     },
  { label: 'Active Campaign',   value: '412'     },
  { label: 'Total Revenue',     value: '₹12.8L'  },
];

export default function StatCards({ data = STATS }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 20 }}>
      {data.map(stat => (
        <div
          key={stat.label}
          style={{
            background: 'var(--bg-screen)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.2 }}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
