import React from 'react';

const STATS = [
  { label: 'Link Clicks',        value: '258.6 K', compValue: '281.3 K', pct: -8.1  },
  { label: 'Total Product Views', value: '132.1 K', compValue: '158.4 K', pct: -16.6 },
  { label: 'Add To Carts',        value: '22.8 K',  compValue: '26.1 K',  pct: -12.6 },
  { label: 'Orders',              value: '12.8 K',  compValue: '14.2 K',  pct: -9.9  },
];

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function ChevronDown({ color = '#888' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

export default function StatCards({ data = STATS }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
      {data.map(stat => {
        const isPositive = stat.pct >= 0;
        return (
          <div key={stat.label} style={{
            background: '#fff', borderRadius: 8,
            padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: 8,
            border: '1px solid var(--osmos-border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--osmos-fg)', fontWeight: 500 }}>{stat.label}</span>
                <ChevronDown />
              </div>
              <InfoIcon />
            </div>
            <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 700, color: 'var(--osmos-fg)', letterSpacing: '-0.5px' }}>
              {stat.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="tabular-nums" style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{stat.compValue}</span>
              <span className="tabular-nums" style={{
                fontSize: 11, fontWeight: 600,
                color: isPositive ? '#22C55E' : '#EF4444',
              }}>
                {isPositive ? '↑' : '↓'} {Math.abs(stat.pct)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
