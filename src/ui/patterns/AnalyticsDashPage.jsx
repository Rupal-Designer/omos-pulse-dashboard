import React from 'react';
import { StatCard } from '../molecules/StatCard';
import { SpinLoader } from '../atoms/SpinLoader';

/**
 * AnalyticsDashPage — KPI cards + chart grid + optional table slot.
 * Covers the 9 analytics pages sharing this layout.
 *
 * Usage:
 *   <AnalyticsDashPage
 *     kpis={[
 *       { label: 'Revenue', value: '$42K', trend: '+12%', trendDir: 'up' },
 *       { label: 'Spend',   value: '$8.1K', compPct: -3.2, sub: 'vs last month' },
 *     ]}
 *     charts={[
 *       { title: 'Impressions', component: <LineChart />, span: 2 },
 *       { title: 'CTR',        component: <BarChart /> },
 *     ]}
 *     table={<DataListPage ... />}
 *     isLoading={loading}
 *   />
 *
 * chart.span: 1 (default, half-width) | 2 (full-width)
 */
export function AnalyticsDashPage({
  kpis = [],
  charts = [],
  table,
  isLoading = false,
  style,
}) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
        <SpinLoader size="xl" />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      fontFamily: "'Open Sans', sans-serif",
      ...style,
    }}>
      {kpis.length > 0 && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {kpis.map((kpi, i) => (
            <StatCard
              key={kpi.label ?? i}
              style={{ flex: '1 1 220px', width: undefined }}
              {...kpi}
            />
          ))}
        </div>
      )}

      {charts.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}>
          {charts.map((chart, i) => (
            <div
              key={chart.title ?? i}
              style={{
                gridColumn: chart.span === 2 ? '1 / -1' : undefined,
                background: 'var(--osmos-bg)',
                border: '1px solid var(--osmos-border)',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {chart.title && (
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--osmos-border)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--osmos-fg)',
                }}>
                  {chart.title}
                </div>
              )}
              <div style={{ padding: 16 }}>{chart.component}</div>
            </div>
          ))}
        </div>
      )}

      {table && (
        <div>{table}</div>
      )}
    </div>
  );
}
