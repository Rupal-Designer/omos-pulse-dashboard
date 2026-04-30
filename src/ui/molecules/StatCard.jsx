import React from 'react';

const FONT = "'Open Sans', sans-serif";

/**
 * StatCard — KPI metric card.
 * label: string
 * value: string | number
 * trend: string | number (optional — displayed below value)
 * trendDir: 'up' | 'down' | 'neutral' (controls trend colour)
 * style: override card container style
 */
export function StatCard({ label, value, trend, trendDir = 'neutral', style }) {
  const trendColor =
    trendDir === 'up'   ? 'var(--alert-success-primary)' :
    trendDir === 'down' ? 'var(--alert-error-primary)'   :
    'var(--text-muted)';

  return (
    <div style={{
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: FONT,
      minWidth: 120,
      ...style,
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--osmos-fg)', lineHeight: 1.2 }}>
        {value}
      </span>
      {trend !== undefined && (
        <span style={{ fontSize: 12, fontWeight: 600, color: trendColor }}>
          {trend}
        </span>
      )}
    </div>
  );
}
