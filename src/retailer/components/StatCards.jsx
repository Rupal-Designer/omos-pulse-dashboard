import React from 'react';
import { StatCard } from '../../ui';

const STATS = [
  { label: 'Link Clicks',        value: '258.6 K', compValue: '281.3 K', compPct: -8.1  },
  { label: 'Total Product Views', value: '132.1 K', compValue: '158.4 K', compPct: -16.6 },
  { label: 'Add To Carts',        value: '22.8 K',  compValue: '26.1 K',  compPct: -12.6 },
  { label: 'Orders',              value: '12.8 K',  compValue: '14.2 K',  compPct: -9.9  },
];

export default function StatCards({ data = STATS }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 20 }}>
      {data.map(stat => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          compValue={stat.compValue}
          compPct={stat.compPct ?? stat.pct}
        />
      ))}
    </div>
  );
}
