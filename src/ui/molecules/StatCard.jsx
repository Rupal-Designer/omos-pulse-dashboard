import React from 'react';

const FONT = "'Open Sans', sans-serif";

/**
 * StatCard — KPI metric card.
 *
 * Core props:
 *   label      string              Card label (uppercase, muted)
 *   value      string | number     Primary metric value
 *
 * Optional props:
 *   trend      string | number     Trend text below value (e.g. "+12.3%")
 *   trendDir   'up' | 'down' | 'neutral'  Controls trend colour (default: 'neutral')
 *
 *   compValue  string              Comparison period value (e.g. "281.3 K")
 *   compPct    number              Comparison percentage delta (e.g. -8.1 or +12.4)
 *                                  — renders coloured arrow+% row below value
 *
 *   sub        string              Subtitle / helper text below change% (e.g. "vs last month")
 *
 *   icon       ReactNode           Icon element rendered in a coloured 32×32 badge top-right
 *   iconColor  string              Background tint for the icon badge (e.g. '#4285f420')
 *
 *   style      object              Override card container style
 */
export function StatCard({
  label,
  value,
  trend,
  trendDir = 'neutral',
  compValue,
  compPct,
  sub,
  icon,
  iconColor,
  style,
}) {
  const trendColor =
    trendDir === 'up'   ? 'var(--osmos-brand-green)' :
    trendDir === 'down' ? 'var(--alert-error-primary)' :
    'var(--osmos-fg-muted)';

  const compColor = compPct !== undefined
    ? (compPct >= 0 ? 'var(--osmos-brand-green)' : '#ef4444')
    : undefined;

  return (
    <div style={{
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 10,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: FONT,
      width: 260,
      minHeight: 109,
      flexShrink: 0,
      boxSizing: 'border-box',
      ...style,
    }}>
      {/* Label row — with optional icon badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)',
          textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          {label}
        </span>
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: iconColor || 'var(--osmos-bg-muted)',
          }}>
            {icon}
          </div>
        )}
      </div>

      {/* Primary value */}
      <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--osmos-fg)', lineHeight: 1.2 }}>
        {value}
      </span>

      {/* trend prop (string label) */}
      {trend !== undefined && (
        <span style={{ fontSize: 12, fontWeight: 600, color: trendColor }}>
          {trend}
        </span>
      )}

      {/* compValue + compPct comparison row */}
      {compPct !== undefined && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          {compValue && (
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{compValue}</span>
          )}
          <span style={{ fontSize: 11, fontWeight: 600, color: compColor }}>
            {compPct >= 0 ? '↑' : '↓'} {Math.abs(compPct)}%
          </span>
        </div>
      )}

      {/* sub — supplementary text */}
      {sub && (
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{sub}</span>
      )}
    </div>
  );
}
