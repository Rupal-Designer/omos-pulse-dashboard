import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

/* ── Sparkline data ─────────────────────────────────────────────── */
const impressionsSpark = [
  { v: 392 }, { v: 415 }, { v: 465 }, { v: 504 },
  { v: 487 }, { v: 481 }, { v: 433 },
];
const revenueSpark = [
  { v: 3193 }, { v: 4308 }, { v: 4973 }, { v: 5894 },
  { v: 6001 }, { v: 4858 }, { v: 4264 },
];

/* ── Table data ─────────────────────────────────────────────────── */
const TABLE_DATA = [
  { date: '09 Jun', impressions: '433K', impDod: '-48K',   revenue: '$4,264', revDod: '+$594'   },
  { date: '08 Jun', impressions: '481K', impDod: '-5K',    revenue: '$4,858', revDod: '$1,143'  },
  { date: '07 Jun', impressions: '487K', impDod: '-18K',   revenue: '$6,001', revDod: '+$107'   },
  { date: '06 Jun', impressions: '504K', impDod: '+40K',   revenue: '$5,894', revDod: '+$921'   },
  { date: '05 Jun', impressions: '465K', impDod: '+49K',   revenue: '$4,973', revDod: '+$665'   },
  { date: '04 Jun', impressions: '415K', impDod: '+23K',   revenue: '$4,308', revDod: '+$1,115' },
  { date: '03 Jun', impressions: '392K', impDod: '+18K',   revenue: '$3,193', revDod: '$161'    },
];

const TABS = ['Overall', 'Cohort', 'Advertiser', 'Source'];

function Sparkline({ data, color = '#ef4444' }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 4 }}>
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 6, padding: '4px 8px', fontSize: 11 }}>
                {payload[0].value}K
              </div>
            ) : null
          }
        />
        <Line
          type="monotone" dataKey="v" stroke={color}
          strokeWidth={1.5} dot={false}
          activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function DodCell({ value }) {
  const isPos = value.startsWith('+');
  const isNeg = value.startsWith('-');
  const color = isPos ? '#16a34a' : isNeg ? '#ef4444' : '#ef4444';
  return <span style={{ color, fontWeight: 500 }}>{value}</span>;
}

export default function Charts() {
  const [activeTab, setActiveTab] = useState('Overall');
  const [view, setView] = useState('Day-on-Day');
  const [search, setSearch] = useState('');

  const filtered = TABLE_DATA.filter(r =>
    r.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
    }}>
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>Performance Report</span>
        </div>
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {['Day-on-Day', 'By Source'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: 'none', background: view === v ? 'var(--surface-1)' : 'transparent',
                color: view === v ? 'var(--text-strong)' : 'var(--text-muted)',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sparkline cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 20px' }}>
        {[
          { label: 'Impressions', value: '44K', comp: '40K', pct: '-4%', spark: impressionsSpark },
          { label: 'Revenue',     value: '$4.3K', comp: '$4.9K', pct: '-12%', spark: revenueSpark },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{card.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{card.comp}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                  background: '#fef2f2', color: '#ef4444',
                  display: 'inline-flex', alignItems: 'center', gap: 2,
                }}>
                  ↓ {card.pct}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>vs yesterday</span>
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.2, marginBottom: 8 }}>{card.value}</div>
            <Sparkline data={card.spark} />
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
      }}>
        <div style={{
          display: 'flex', gap: 2, padding: 4,
          background: 'var(--tab-bg)', borderRadius: 10,
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 16px', fontSize: 13, cursor: 'pointer',
                border: 'none', borderRadius: 7,
                background: activeTab === tab ? '#fff' : 'transparent',
                color: activeTab === tab ? 'var(--text-strong)' : 'var(--text-muted)',
                fontWeight: activeTab === tab ? 700 : 500,
                boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid var(--border)', borderRadius: 8,
          padding: '6px 12px', minWidth: 200,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="var(--text-muted)" strokeWidth="1.2"/>
            <path d="M9 9l2.5 2.5" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: 'var(--text)', width: '100%' }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ padding: '0 20px 16px' }}>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-1)' }}>
              {['Date', 'Impressions', 'DOD', 'Revenue', 'DOD'].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: '10px 20px', textAlign: i === 0 ? 'left' : 'right',
                    fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, ri) => (
              <tr
                key={ri}
                style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-1)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--text-muted)' }}>{row.date}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>{row.impressions}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, textAlign: 'right' }}><DodCell value={row.impDod} /></td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: '#16a34a', textAlign: 'right', fontWeight: 600 }}>{row.revenue}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, textAlign: 'right' }}><DodCell value={row.revDod} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
