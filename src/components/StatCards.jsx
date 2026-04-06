import React from 'react';

const STATS = [
  { label: 'Link Clicks', value: '258.6 K', trend: 'down' },
  { label: 'Total Product Views', value: '132.1 K', trend: 'down' },
  { label: 'Add To Carts', value: '22.8 K', trend: 'down' },
  { label: 'Orders', value: '12.8 K', trend: 'down' },
];

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function StatCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
      {STATS.map(stat => (
        <div key={stat.label} style={{
          background: '#fff', borderRadius: 8,
          padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 8,
          border: '1px solid #F0F0F0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#444', fontWeight: 500 }}>{stat.label}</span>
              <ChevronDown />
            </div>
            <InfoIcon />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.5px' }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
