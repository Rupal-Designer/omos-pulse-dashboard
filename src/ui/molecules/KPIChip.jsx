import React from 'react';

const FONT = "'Open Sans', sans-serif";

/**
 * KPIChip — compact live-insights chip showing a metric label + value.
 * label: string
 * value: string | number
 * style: override chip container style
 */
export function KPIChip({ label, value, style }) {
  return (
    <div style={{
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 8,
      padding: '10px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      fontFamily: FONT,
      minWidth: 160,
      ...style,
    }}>
      <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)' }}>
        {value}
      </span>
    </div>
  );
}
