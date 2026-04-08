import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

/* ── palette & tokens ─────────────────────────────────────────── */
const BG       = '#EDF0F5';
const WHITE    = '#fff';
const BORDER   = '#E8E8E8';
const NAV_BG   = '#212563';
const ACCENT   = '#5B6EF5';
const TEXT_HI  = '#404040';
const TEXT_MID = '#7B7B7B';
const TEXT_LO  = '#AAAAAA';
const GREEN    = '#22C55E';
const RED      = '#EF4444';
const ORANGE   = '#F5A623';

/* ── shared atoms ─────────────────────────────────────────────── */
function Icon({ children, size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

function ChevDown({ size = 11, color = TEXT_MID }) {
  return <Icon size={size} color={color}><polyline points="6 9 12 15 18 9"/></Icon>;
}
function InfoIcon({ color = TEXT_LO }) {
  return <Icon size={13} color={color}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
}
function DownloadIcon() {
  return <Icon size={14} color={TEXT_MID}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
}

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({ label, value, compValue, compPct, currency }) {
  const isPositive = compPct >= 0;
  return (
    <div style={{
      background: WHITE, borderRadius: 8, padding: '14px 16px',
      border: `1px solid ${BORDER}`, flex: 1, minWidth: 0,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, color: TEXT_MID, fontWeight: 500 }}>{label}</span>
          <ChevDown />
        </div>
        <InfoIcon />
      </div>
      {/* Values row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: TEXT_HI, letterSpacing: '-0.3px' }}>
          {currency && <span style={{ fontSize: 13 }}>{currency}</span>}{value}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 12, color: TEXT_MID }}>
            {currency && <span style={{ fontSize: 11 }}>{currency}</span>}{compValue}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: isPositive ? GREEN : RED }}>
            ({isPositive ? '+' : ''}{compPct}%)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Chart data ───────────────────────────────────────────────── */
const chartDates = ['03/31','04/01','04/02','04/03','04/04','04/05','04/06'];
const revenueData = chartDates.map(d => ({ date: d, revenue: 0, cpc: 0 }));
const clicksData  = chartDates.map(d => ({ date: d, clicks: 0, ctr: 0 }));

/* ── Chart card ───────────────────────────────────────────────── */
function MetricPill({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
      <div style={{ width: 10, height: 10, borderRadius: 2, background: color }}/>
      <span style={{ fontSize: 11, color: TEXT_HI, fontWeight: 500 }}>{label}</span>
      <ChevDown size={10} />
    </div>
  );
}

function ChartCard({ leftMetric, leftColor, rightMetric, rightColor, data, leftKey, rightKey, leftLabel, rightLabel }) {
  return (
    <div style={{
      background: WHITE, borderRadius: 8, flex: 1,
      border: `1px solid ${BORDER}`, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid #F8F8F8`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 26, height: 26, background: '#F0F4FF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={13} color={ACCENT}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>
          </div>
          <MetricPill color={leftColor} label={leftMetric} />
          <span style={{ fontSize: 11, color: TEXT_LO }}>vs</span>
          <MetricPill color={rightColor} label={rightMetric} />
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><DownloadIcon /></button>
      </div>
      {/* Chart */}
      <div style={{ padding: '12px 8px 4px' }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} domain={[0, 5]} ticks={[0,1,2,3,4,5]} />
            <Tooltip />
            <Line type="monotone" dataKey={leftKey} stroke={leftColor} strokeWidth={1.5} dot={false} name={leftLabel} />
            <Line type="monotone" dataKey={rightKey} stroke={rightColor} strokeWidth={1.5} dot={false} name={rightLabel} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ── Projects table (empty state) ─────────────────────────────── */
const PROJECT_COLS = [
  'Title','Status','Business Impact','Primary Owner',
  'New ETA','Completion (%)','Latest Summary','Last Updated On','Original ETA',
];

function ProjectsTable() {
  return (
    <div style={{ background: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`, overflow: 'hidden', marginBottom: 8 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid #F5F5F5`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#FFF0F0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={14} color="#E53E3E"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_HI }}>Projects</span>
          <InfoIcon />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{
            height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5,
            background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 6,
            cursor: 'pointer', fontSize: 11, color: '#555', fontFamily: "'Open Sans', sans-serif",
          }}>
            <Icon size={13} color="#666"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></Icon>
            <ChevDown size={10} />
          </button>
          <div style={{
            height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 6,
            border: `1px solid ${BORDER}`, borderRadius: 6,
          }}>
            <Icon size={13} color={TEXT_LO}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
            <input placeholder="Search" style={{
              border: 'none', outline: 'none', fontSize: 11, color: '#333',
              fontFamily: "'Open Sans', sans-serif", width: 100, background: 'transparent',
            }} />
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#FAFAFA', borderBottom: `1px solid #F0F0F0` }}>
              {PROJECT_COLS.map((col, i) => (
                <th key={col} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontWeight: 500, color: TEXT_MID, fontSize: 11,
                  whiteSpace: 'nowrap',
                  borderBottom: i === PROJECT_COLS.length - 2
                    ? `2px solid ${ACCENT}` : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {col}
                    {col === 'Last Updated On' && (
                      <Icon size={11} color={TEXT_LO}>
                        <line x1="8" y1="6" x2="21" y2="6"/>
                        <line x1="8" y1="12" x2="21" y2="12"/>
                        <line x1="8" y1="18" x2="21" y2="18"/>
                        <line x1="3" y1="6" x2="3.01" y2="6"/>
                        <line x1="3" y1="12" x2="3.01" y2="12"/>
                        <line x1="3" y1="18" x2="3.01" y2="18"/>
                      </Icon>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Empty state */}
      <div style={{ padding: '52px 20px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={24} color={ACCENT}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </Icon>
        </div>
        <span style={{ fontSize: 13, color: TEXT_MID, fontWeight: 600 }}>No projects yet</span>
        <span style={{ fontSize: 11, color: TEXT_LO, textAlign: 'center', maxWidth: 220 }}>
          Projects you create will appear here. Get started by adding your first one.
        </span>
        <button style={{
          marginTop: 4, height: 32, padding: '0 16px',
          background: ACCENT, color: '#fff', border: 'none', borderRadius: 6,
          fontSize: 12, fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif",
          transition: 'opacity 0.12s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 0 16px', fontSize: 10, color: TEXT_LO, fontStyle: 'italic',
    }}>
      <span>Date range mode not applicable</span>
      <span style={{ fontStyle: 'normal' }}>© 2017 - 2026 OSK Techlabs Private Ltd. All rights reserved.</span>
    </div>
  );
}

/* ── Chat bubble ──────────────────────────────────────────────── */
function ChatBubble() {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 999,
      width: 48, height: 48, borderRadius: '50%',
      background: NAV_BG, display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(33,37,99,0.35)', cursor: 'pointer',
    }}>
      <Icon size={22} color="#fff" strokeWidth={1.6}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </Icon>
    </div>
  );
}

/* ── Compare date bar ─────────────────────────────────────────── */
function CompareBanner() {
  return (
    <div style={{
      position: 'absolute', top: 72, right: 24,
      background: WHITE, border: `1px solid ${BORDER}`,
      borderRadius: '0 0 8px 8px', padding: '4px 12px',
      fontSize: 10, color: TEXT_MID, zIndex: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      Compare 24 Mar 26 - 30 Mar 26
    </div>
  );
}

/* ── Top bar (Home variant) ───────────────────────────────────── */
function HomeTopBar() {
  return (
    <header style={{
      height: 72, background: WHITE,
      borderBottom: `1px solid ${BORDER}`,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0, gap: 16,
      position: 'relative',
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, background: '#EFEFEF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={17} color={TEXT_MID}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Icon>
        </div>
        <div>
          <div style={{ fontSize: 11, color: TEXT_LO, marginBottom: 1 }}>Home &gt; Home</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TEXT_HI, lineHeight: 1 }}>Home</div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {[
          <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
          <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
          <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
        ].map((svg, i) => (
          <button key={i} style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: 'pointer', color: '#555',
          }}>
            <Icon size={15}>{svg}</Icon>
          </button>
        ))}

        {/* Date range */}
        <button style={{
          height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6,
          background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8,
          cursor: 'pointer', fontSize: 12, color: '#333', fontFamily: "'Open Sans', sans-serif",
        }}>
          <Icon size={13} color="#E53E3E">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </Icon>
          31 Mar 26 - 06 Apr 26
        </button>
      </div>
    </header>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function HomePage() {
  const STATS = [
    { label: 'M%G',           value: '0%',   compValue: '0%',  compPct: 0  },
    { label: 'Ad Revenue',    value: '0',    compValue: '0',   compPct: 0,  currency: '₹' },
    { label: 'Ad Impressions',value: '0',    compValue: '0',   compPct: 0  },
    { label: 'Ad Clicks',     value: '0',    compValue: '0',   compPct: 0  },
    { label: 'ROAS',          value: '0',    compValue: '0',   compPct: 0  },
    { label: 'Attributed GMV',value: '0',    compValue: '0',   compPct: 0,  currency: '₹' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
      <HomeTopBar />
      <CompareBanner />

      <main style={{ flex: 1, padding: '24px 24px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Stat cards — 6 across */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Charts */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <ChartCard
            leftMetric="Ad Revenue" leftColor={ACCENT} leftKey="revenue" leftLabel="Ad Revenue"
            rightMetric="CPC"       rightColor={ORANGE} rightKey="cpc"     rightLabel="CPC"
            data={revenueData}
          />
          <ChartCard
            leftMetric="Ad Clicks" leftColor={ACCENT} leftKey="clicks" leftLabel="Ad Clicks"
            rightMetric="CTR"      rightColor={ORANGE} rightKey="ctr"   rightLabel="CTR"
            data={clicksData}
          />
        </div>

        {/* Projects table */}
        <ProjectsTable />

        {/* Footer */}
        <Footer />
      </main>

      <ChatBubble />
    </div>
  );
}
