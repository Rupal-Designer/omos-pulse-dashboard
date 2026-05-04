import React, { useState, useEffect, useRef } from 'react';

/* ─── colour constants ────────────────────────────────────────────── */
const SOFIE_PURPLE   = '#636CFF';
const SOFIE_LIGHT    = 'rgba(99, 108, 255, 0.10)';
const SOFIE_MUTED    = 'rgba(99, 108, 255, 0.18)';
const GREEN          = '#1BA87A';
const GREEN_LIGHT    = 'rgba(27, 168, 122, 0.10)';
const AMBER          = '#F5A623';

/* ─── helpers ─────────────────────────────────────────────────────── */
function fmt(n) {
  if (n >= 1_000_000) return `₹${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
}
function fmtNum(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

/* ─── 30-day forecast data generator ─────────────────────────────── */
function genForecast(dailyBudget, products) {
  const base = Math.max(dailyBudget || 500, 100);
  const scale = 1 + Math.min(products, 200) / 200;
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const noise = 0.8 + Math.random() * 0.4;
    const trend = 1 + (day / 30) * 0.15;
    const spend = Math.round(base * noise * 0.85);
    const revenue = Math.round(base * scale * noise * trend * 3.8);
    const clicks = Math.round(spend / 4.2);
    const impressions = clicks * 18;
    const pageViews = Math.round(clicks * 2.8);
    const orders = Math.round(clicks * 0.048);
    return { day: `D${day}`, spend, revenue, clicks, impressions, pageViews, orders };
  });
}

/* placeholder — not rendered, safe to keep */
function KpiStat({ label, loading }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0 }}>
      <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{label}</span>
      {loading ? (
        <div style={{ height: 18, width: '70%', background: 'var(--osmos-bg-subtle)', borderRadius: 4 }} />
      ) : (
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', fontVariantNumeric: 'tabular-nums' }}>{range}</span>
      )}
      <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{sub}</span>
    </div>
  );
}


/* ─── Info tooltip for metric definitions ────────────────────────── */
function InfoTip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'help', marginLeft: 4 }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
      {show && (
        <div style={{
          position: 'absolute', left: '50%', bottom: 'calc(100% + 8px)',
          transform: 'translateX(-50%)',
          background: '#1e2531', color: '#e8eaf0',
          fontSize: 11, lineHeight: 1.55,
          padding: '7px 10px', borderRadius: 6,
          width: 220, zIndex: 300,
          boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
          pointerEvents: 'none', whiteSpace: 'normal',
        }}>
          {text}
          <div style={{
            position: 'absolute', left: '50%', top: '100%',
            transform: 'translateX(-50%)',
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderTop: '5px solid #1e2531',
          }} />
        </div>
      )}
    </span>
  );
}

/* ─── MAIN: 30-Day Simulation Section ────────────────────────────── */
const LEARNING_THRESHOLD = 200;

function SimulationSection({ dailyBudget, products, onReset }) {
  const [curData,  setCurData]  = useState(() => genForecast(dailyBudget, products));
  const [loading,  setLoading]  = useState(false);
  const [updated,  setUpdated]  = useState(null);
  const prevBudget              = useRef(dailyBudget);
  const prevProducts            = useRef(products);

  const budget       = Number(dailyBudget) || 0;
  const idealBudget  = Math.ceil(budget * 1.35 / 100) * 100;
  const idealDataRef = useRef(genForecast(idealBudget, products));
  const isLearning   = budget > 0 && budget < LEARNING_THRESHOLD;

  useEffect(() => {
    const field =
      prevBudget.current !== dailyBudget  ? 'Daily Budget'
      : prevProducts.current !== products ? 'Product Selection'
      : null;
    if (!field) return;
    prevBudget.current   = dailyBudget;
    prevProducts.current = products;
    setLoading(true);
    setUpdated(null);
    const t = setTimeout(() => {
      const nb = Number(dailyBudget) || 0;
      setCurData(genForecast(nb, products));
      idealDataRef.current = genForecast(Math.ceil(nb * 1.35 / 100) * 100, products);
      setLoading(false);
      setUpdated(field);
    }, 800);
    return () => clearTimeout(t);
  }, [dailyBudget, products]);

  function sumData(data) {
    return data.reduce((acc, d) => ({
      spend:       acc.spend       + d.spend,
      revenue:     acc.revenue     + d.revenue,
      clicks:      acc.clicks      + d.clicks,
      impressions: acc.impressions + d.impressions,
      pageViews:   acc.pageViews   + d.pageViews,
      orders:      acc.orders      + d.orders,
    }), { spend: 0, revenue: 0, clicks: 0, impressions: 0, pageViews: 0, orders: 0 });
  }

  const cur   = sumData(curData);
  const ideal = sumData(idealDataRef.current);
  const curRoi   = cur.spend   > 0 ? (cur.revenue   / cur.spend).toFixed(1)   : 0;
  const idealRoi = ideal.spend > 0 ? (ideal.revenue / ideal.spend).toFixed(1) : 0;

  /* ── Shared header strip ─────────────────────────────────────── */
  function SimHeader({ showReset }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 16px', borderBottom: '1px solid var(--osmos-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={SOFIE_PURPLE}>
            <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>30 Day Simulation</span>
          {loading && <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', fontStyle: 'italic' }}>Updating…</span>}
          {updated && !loading && (
            <span style={{ fontSize: 11, color: GREEN, display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Updated
            </span>
          )}
        </div>
        {showReset && (
          <button onClick={() => onReset && onReset(idealBudget)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: SOFIE_PURPLE,
            display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px',
            borderRadius: 5,
          }}
            onMouseEnter={e => e.currentTarget.style.background = SOFIE_LIGHT}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SOFIE_PURPLE} strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
            Reset to Ideal Settings
          </button>
        )}
      </div>
    );
  }

  /* ── Empty state ─────────────────────────────────────────────── */
  if (!budget) {
    return (
      <div style={{
        border: '1px solid var(--osmos-border)', borderRadius: 8,
        background: '#fafafe', padding: '24px 18px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={SOFIE_PURPLE} opacity={0.35}>
            <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-subtle)' }}>30 Day Simulation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
          {[50,35,65,45,80,40,60,50,70,42].map((h, i) => (
            <div key={i} style={{ width: 9, height: `${h}%`, borderRadius: 3, background: 'var(--osmos-border)' }} />
          ))}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg-muted)' }}>
          Enter a daily budget to see your 30-day simulation
        </span>
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
          Sofie will estimate spend, impressions, page views, orders, revenue & ROI
        </span>
      </div>
    );
  }

  /* ── Learning Mode state ─────────────────────────────────────── */
  if (isLearning) {
    return (
      <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '11px 16px', borderBottom: '1px solid var(--osmos-border)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={SOFIE_PURPLE}>
            <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>30 Day Simulation</span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: AMBER,
            background: 'rgba(245,166,35,0.12)', borderRadius: 4,
            padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill={AMBER}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            Learning Mode
          </span>
        </div>
        <div style={{
          padding: '32px 24px', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(245,166,35,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill={AMBER}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>
              Simulation in Learning Mode
            </div>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.65, maxWidth: 360 }}>
              The system is still gathering enough recent data to make accurate projections.
              Once data thresholds are met, estimates will automatically appear.
            </div>
          </div>
          <div style={{
            fontSize: 11, color: 'var(--osmos-fg-subtle)',
            background: 'var(--osmos-bg-subtle)', borderRadius: 6,
            padding: '8px 16px', border: '1px solid var(--osmos-border)',
          }}>
            Set a daily budget of ₹{LEARNING_THRESHOLD}+ to unlock full simulation
          </div>
        </div>
      </div>
    );
  }

  /* Range helpers */
  const curRange = (val) => [Math.round(val * 0.88), Math.round(val * 1.14)];
  const fmtRange = (lo, hi, fn) => `${fn(lo)} – ${fn(hi)}`;
  const uplift   = (cVal, iVal) => cVal > 0 ? Math.round(((iVal - cVal) / cVal) * 100) : 0;

  const rows = [
    {
      label: 'Est. Spend',
      def:   'Predicted ad spend over 30 days based on your daily budget and marketplace competition',
      cVal: cur.spend,       iVal: ideal.spend,       fn: fmt,
    },
    {
      label: 'Est. Impressions',
      def:   'Estimated number of times your ads will be displayed to shoppers',
      cVal: cur.impressions,  iVal: ideal.impressions,  fn: fmtNum,
    },
    {
      label: 'Est. Page Views',
      def:   'Predicted product page views driven by your ads',
      cVal: cur.pageViews,    iVal: ideal.pageViews,    fn: fmtNum,
    },
    {
      label: 'Est. Orders',
      def:   'Forecasted number of orders resulting from ad-driven product views',
      cVal: cur.orders,       iVal: ideal.orders,       fn: fmtNum,
    },
    {
      label: 'Est. Revenue',
      def:   'Predicted revenue generated from orders driven by your ads',
      cVal: cur.revenue,      iVal: ideal.revenue,      fn: fmt,
    },
    {
      label: 'Est. ROI',
      def:   'Estimated return on investment — revenue earned per rupee spent on ads',
      cVal: Number(curRoi),   iVal: Number(idealRoi),   fn: v => `${Number(v).toFixed(1)}x`,
    },
  ];

  const GRID = '130px 1fr 1fr';
  const colLabel = { fontSize: 11, fontWeight: 600, letterSpacing: '0.02em' };

  /* Overall avg uplift across all metrics for the summary line */
  const avgUplift = Math.round(
    rows.reduce((sum, r) => sum + uplift(r.cVal, r.iVal), 0) / rows.length
  );

  return (
    <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <SimHeader showReset />

      {/* ── Column headers ─────────────────────────────────────── */}
      <div style={{
        display: 'grid', gridTemplateColumns: GRID,
        padding: '7px 16px', gap: 0,
        borderBottom: '1px solid var(--osmos-border)',
      }}>
        <div />
        {/* Current Potential */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: '#94a3b8', flexShrink: 0 }} />
          <span style={{ ...colLabel, color: 'var(--osmos-fg-muted)' }}>Current Potential</span>
          <span style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', fontWeight: 400 }}>₹{budget}/day</span>
        </div>
        {/* Ideal Potential */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          borderLeft: `2px solid ${SOFIE_MUTED}`, paddingLeft: 10,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: SOFIE_PURPLE, flexShrink: 0 }} />
          <span style={{ ...colLabel, color: SOFIE_PURPLE }}>Ideal Potential</span>
          <span style={{
            fontSize: 10, color: SOFIE_PURPLE, background: SOFIE_LIGHT,
            borderRadius: 8, padding: '1px 6px', fontWeight: 600,
          }}>Sofie AI · ₹{idealBudget}/day</span>
        </div>
      </div>

      {/* ── Rows ───────────────────────────────────────────────── */}
      <div>
        {rows.map((row, i) => {
          const [cLo, cHi] = curRange(row.cVal);
          const [iLo, iHi] = curRange(row.iVal);
          const pct = uplift(row.cVal, row.iVal);
          const isLast = i === rows.length - 1;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: GRID,
              padding: '9px 16px', gap: 0, alignItems: 'center',
              borderBottom: isLast ? 'none' : '1px solid var(--osmos-border)',
            }}>
              {/* Label + info tooltip */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)' }}>{row.label}</span>
                <InfoTip text={row.def} />
              </div>

              {/* Current range */}
              {loading ? (
                <div style={{ height: 14, width: '65%', background: 'var(--osmos-bg-subtle)', borderRadius: 4 }} />
              ) : (
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', fontVariantNumeric: 'tabular-nums' }}>
                  {fmtRange(cLo, cHi, row.fn)}
                </span>
              )}

              {/* Ideal range + uplift */}
              {loading ? (
                <div style={{ height: 14, width: '65%', background: 'var(--osmos-bg-subtle)', borderRadius: 4, borderLeft: `2px solid ${SOFIE_MUTED}`, paddingLeft: 10 }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, borderLeft: `2px solid ${SOFIE_MUTED}`, paddingLeft: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: SOFIE_PURPLE, fontVariantNumeric: 'tabular-nums' }}>
                    {fmtRange(iLo, iHi, row.fn)}
                  </span>
                  {pct > 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: GREEN,
                      background: 'rgba(27,168,122,0.10)', borderRadius: 4,
                      padding: '1px 5px', whiteSpace: 'nowrap',
                    }}>↑ {pct}%</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Summary line (replaces redundant legend) ───────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '9px 16px', borderTop: '1px solid var(--osmos-border)',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill={SOFIE_PURPLE}>
          <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
        </svg>
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>
          Sofie AI estimates{' '}
          <strong style={{ color: GREEN, fontWeight: 600 }}>~{avgUplift}% uplift</strong>
          {' '}potential by increasing your budget to{' '}
          <strong style={{ color: SOFIE_PURPLE, fontWeight: 600 }}>₹{idealBudget}/day</strong>
        </span>
      </div>

      {/* ── Footnote ───────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 6,
        padding: '9px 16px', borderTop: '1px solid var(--osmos-border)',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', lineHeight: 1.55 }}>
          * See how current campaign settings can impact your ad traffic. This simulation is based on overall data from{' '}
          <strong style={{ fontWeight: 600, color: 'var(--osmos-fg-muted)' }}>Apr 23, 2026 – Apr 29, 2026</strong>.
          {' '}Forecast modelled on {products} products, traffic patterns, and auction competition.
          <strong style={{ fontWeight: 600, color: 'var(--osmos-fg-muted)' }}> Ranges are estimates — actual results may vary.</strong>
        </span>
      </div>
    </div>
  );
}

/* ─── Right sidebar nav item ──────────────────────────────────────── */
function SideNavItem({ icon, label, sub, active, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '14px 8px',
      borderLeft: active ? `3px solid ${SOFIE_PURPLE}` : '3px solid transparent',
      cursor: 'pointer',
      background: active ? SOFIE_LIGHT : 'transparent',
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg)', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
      {sub && (
        <span style={{ fontSize: 10, color: color || SOFIE_PURPLE, fontWeight: 600 }}>{sub}</span>
      )}
    </div>
  );
}

/* ─── FULL DRAWER ─────────────────────────────────────────────────── */
export default function CampaignBudgetDrawer({ onClose }) {
  const [budgetType,   setBudgetType]   = useState('daily');
  const [dailyBudget,  setDailyBudget]  = useState('');
  const [spendCap,     setSpendCap]     = useState('');
  const [startDate,    setStartDate]    = useState('2026-06-03');
  const [endDate,      setEndDate]      = useState('2026-06-05');
  const [products]                      = useState(173);   // from campaign context

  const inputStyle = {
    width: '100%', padding: '8px 10px', fontSize: 13,
    border: '1px solid var(--osmos-border)', borderRadius: 6,
    outline: 'none', color: 'var(--osmos-fg)', background: '#fff',
    fontFamily: 'inherit',
  };
  const labelStyle = {
    fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)',
    display: 'block', marginBottom: 5,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />

      {/* Drawer shell */}
      <div style={{
        position: 'relative', background: '#fff', height: '100%',
        display: 'flex', flexDirection: 'row',
        width: 940, boxShadow: '-6px 0 32px rgba(0,0,0,0.14)',
        overflow: 'hidden',
      }}>

        {/* ── Main form panel ─────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Drawer header */}
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid var(--osmos-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: GREEN }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)' }}>New_Campaign_P00AH</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-muted)" strokeWidth="2" strokeLinecap="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={SOFIE_PURPLE} strokeWidth="2" strokeLinecap="round">
                <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="#" style={{ fontSize: 12, color: SOFIE_PURPLE, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                How to create and modify a campaign
              </a>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', padding: 4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px' }}>

            {/* Budget type toggle */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', marginBottom: 10 }}>Select Budget Type</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['daily', 'lifetime'].map(t => (
                  <button key={t} onClick={() => setBudgetType(t)} style={{
                    padding: '8px 18px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    border: `1.5px solid ${budgetType === t ? SOFIE_PURPLE : 'var(--osmos-border)'}`,
                    background: budgetType === t ? SOFIE_LIGHT : '#fff',
                    color: budgetType === t ? SOFIE_PURPLE : 'var(--osmos-fg)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: `2px solid ${budgetType === t ? SOFIE_PURPLE : 'var(--osmos-border)'}`,
                      background: budgetType === t ? SOFIE_PURPLE : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {budgetType === t && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    {t === 'daily' ? 'Average Daily Budget' : 'Lifetime Budget'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 22 }}>
              <div>
                <label style={labelStyle}>Average Daily Budget: ℹ</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--osmos-fg-muted)', fontSize: 13 }}>₹</span>
                  <input
                    type="number" value={dailyBudget}
                    onChange={e => setDailyBudget(Number(e.target.value))}
                    style={{ ...inputStyle, paddingLeft: 24 }}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Total Spend Cap: ℹ <span style={{ color: 'var(--osmos-fg-subtle)' }}>(Optional)</span></label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--osmos-fg-muted)', fontSize: 13 }}>₹</span>
                  <input type="number" value={spendCap} onChange={e => setSpendCap(e.target.value)} style={{ ...inputStyle, paddingLeft: 24 }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Wallet</label>
                <select style={{ ...inputStyle, appearance: 'none' }}>
                  <option>Select wallet</option>
                </select>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginTop: 4 }}>Wallet Balance: ₹18,549.55</div>
              </div>
            </div>

            {/* Budget increase row */}
            <div style={{
              background: 'var(--osmos-bg-subtle)', borderRadius: 8, padding: '12px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22,
              border: '1px solid var(--osmos-border)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  Average Daily Budget Increase <span style={{ color: '#EF4444' }}>*</span> ℹ
                </div>
                <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 3 }}>
                  Limit spend to specified Average Daily Budget
                </div>
              </div>
              <a href="#" style={{ fontSize: 13, color: SOFIE_PURPLE, textDecoration: 'none', fontWeight: 500 }}>Click to Change</a>
            </div>

            {/* Date inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
              <div>
                <label style={labelStyle}>Start Date ℹ</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginTop: 4 }}>* Date will be set in the Asia/Kolkata (+05:30) timezone</div>
              </div>
              <div>
                <label style={labelStyle}>End Date ℹ <span style={{ color: 'var(--osmos-fg-subtle)' }}>(Optional)</span></label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Attribution window */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>Custom Attribution Window</span>
                <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>ℹ</span>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: 'var(--osmos-border)', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 3, left: 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>Default attribution is set by the retailer. Turn on the toggle to customise.</div>
            </div>

            {/* ── 30-Day Simulation ───────────────────────────── */}
            <SimulationSection
              dailyBudget={dailyBudget}
              products={products}
              onReset={(ideal) => setDailyBudget(ideal)}
            />
          </div>

          {/* Footer actions */}
          <div style={{
            padding: '14px 24px', borderTop: '1px solid var(--osmos-border)',
            display: 'flex', justifyContent: 'center', gap: 12, background: '#fff',
          }}>
            <button onClick={onClose} style={{
              padding: '9px 32px', borderRadius: 6, border: '1.5px solid var(--osmos-border)',
              background: '#fff', color: 'var(--osmos-fg)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>Cancel</button>
            <button style={{
              padding: '9px 32px', borderRadius: 6, border: 'none',
              background: SOFIE_PURPLE, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Save</button>
          </div>
        </div>

        {/* ── Right sidebar (Campaign Settings) ───────────────── */}
        <div style={{
          width: 110, background: '#fff', borderLeft: '1px solid var(--osmos-border)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '14px 8px', borderBottom: '1px solid var(--osmos-border)',
            fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)', textAlign: 'center',
          }}>
            Campaign Settings
          </div>
          <SideNavItem icon="🛒" label="Product Selection" sub="173 products added" color={AMBER} />
          <SideNavItem icon="💲" label="Bid Settings" sub="2 bids added" color={GREEN} />
          <SideNavItem icon="🔑" label="Keyword Settings" sub="20 keywords added" color={SOFIE_PURPLE} />
          <SideNavItem icon="🌐" label="Network Targeting" sub="ALL" color={SOFIE_PURPLE} active />
          <SideNavItem icon="⚙️" label="Advanced Settings" />
        </div>
      </div>
    </div>
  );
}
