import { useState, useEffect, useRef } from 'react';

const PURPLE      = '#636CFF';
const PURPLE_LIGHT = 'rgba(99, 108, 255, 0.10)';
const PURPLE_MUTED = 'rgba(99, 108, 255, 0.18)';
const GREEN       = '#1BA87A';
const AMBER       = '#F5A623';

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

function genForecast(dailyBudget, products) {
  const base  = Math.max(dailyBudget || 500, 100);
  const scale = 1 + Math.min(products, 200) / 200;
  return Array.from({ length: 30 }, (_, i) => {
    const day   = i + 1;
    const noise = 0.8 + Math.random() * 0.4;
    const trend = 1 + (day / 30) * 0.15;
    const spend       = Math.round(base * noise * 0.85);
    const revenue     = Math.round(base * scale * noise * trend * 3.8);
    const clicks      = Math.round(spend / 4.2);
    const impressions = clicks * 18;
    const pageViews   = Math.round(clicks * 2.8);
    const orders      = Math.round(clicks * 0.048);
    return { spend, revenue, clicks, impressions, pageViews, orders };
  });
}

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

const LEARNING_THRESHOLD = 200;

export function BudgetSimulation({ dailyBudget, products = 173, onApplyIdeal, idealApplied = false }) {
  const [curData,  setCurData]  = useState(() => genForecast(dailyBudget, products));
  const [loading,  setLoading]  = useState(false);
  const prevBudget              = useRef(dailyBudget);
  const prevProducts            = useRef(products);

  const budget      = Number(dailyBudget) || 0;
  const idealBudget = Math.ceil(budget * 1.35 / 100) * 100;
  const idealData   = useRef(genForecast(idealBudget, products));
  const isLearning  = budget > 0 && budget < LEARNING_THRESHOLD;

  useEffect(() => {
    if (prevBudget.current === dailyBudget && prevProducts.current === products) return;
    prevBudget.current   = dailyBudget;
    prevProducts.current = products;
    setLoading(true);
    const t = setTimeout(() => {
      const nb = Number(dailyBudget) || 0;
      setCurData(genForecast(nb, products));
      idealData.current = genForecast(Math.ceil(nb * 1.35 / 100) * 100, products);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, [dailyBudget, products]);

  function sum(data) {
    return data.reduce((acc, d) => ({
      spend:       acc.spend       + d.spend,
      revenue:     acc.revenue     + d.revenue,
      clicks:      acc.clicks      + d.clicks,
      impressions: acc.impressions + d.impressions,
      pageViews:   acc.pageViews   + d.pageViews,
      orders:      acc.orders      + d.orders,
    }), { spend: 0, revenue: 0, clicks: 0, impressions: 0, pageViews: 0, orders: 0 });
  }

  const cur      = sum(curData);
  const ideal    = sum(idealData.current);
  const curRoi   = cur.spend   > 0 ? (cur.revenue   / cur.spend).toFixed(1) : 0;
  const idealRoi = ideal.spend > 0 ? (ideal.revenue / ideal.spend).toFixed(1) : 0;

  const StarIcon = ({ color = PURPLE, size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"/>
    </svg>
  );

  /* ── Empty state ─────────────────────────────────────────────────── */
  if (!budget) {
    return (
      <div style={{
        border: '1px solid var(--osmos-border)', borderRadius: 8,
        background: '#fafafe', padding: '24px 18px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StarIcon color={PURPLE} size={14} />
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
          Estimates spend, impressions, page views, orders, revenue &amp; ROI
        </span>
      </div>
    );
  }

  /* ── Learning Mode ───────────────────────────────────────────────── */
  if (isLearning) {
    return (
      <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 16px', borderBottom: '1px solid var(--osmos-border)' }}>
          <StarIcon />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>30 Day Simulation</span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: AMBER,
            background: 'rgba(245,166,35,0.12)', borderRadius: 4, padding: '2px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill={AMBER}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            Learning Mode
          </span>
        </div>
        <div style={{ padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(245,166,35,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill={AMBER}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>Simulation in Learning Mode</div>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.65, maxWidth: 360 }}>
              The system is still gathering enough recent data to make accurate projections.
              Once data thresholds are met, estimates will automatically appear.
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: '8px 16px', border: '1px solid var(--osmos-border)' }}>
            Set a daily budget of ₹{LEARNING_THRESHOLD}+ to unlock full simulation
          </div>
        </div>
      </div>
    );
  }

  /* ── Active state helpers ────────────────────────────────────────── */
  const curRange = (val) => [Math.round(val * 0.88), Math.round(val * 1.14)];
  const fmtRange = (lo, hi, fn) => `${fn(lo)} – ${fn(hi)}`;
  const uplift   = (c, id) => c > 0 ? Math.round(((id - c) / c) * 100) : 0;

  const rows = [
    { label: 'Est. Spend',       def: 'Predicted ad spend over 30 days based on your daily budget and marketplace competition', cVal: cur.spend,       iVal: ideal.spend,       fn: fmt    },
    { label: 'Est. Impressions', def: 'Estimated number of times your ads will be displayed to shoppers',                      cVal: cur.impressions,  iVal: ideal.impressions,  fn: fmtNum },
    { label: 'Est. Page Views',  def: 'Predicted product page views driven by your ads',                                        cVal: cur.pageViews,    iVal: ideal.pageViews,    fn: fmtNum },
    { label: 'Est. Orders',      def: 'Forecasted number of orders resulting from ad-driven product views',                    cVal: cur.orders,       iVal: ideal.orders,       fn: fmtNum },
    { label: 'Est. Revenue',     def: 'Predicted revenue generated from orders driven by your ads',                            cVal: cur.revenue,      iVal: ideal.revenue,      fn: fmt    },
    { label: 'Est. ROI',         def: 'Estimated return on investment — revenue earned per rupee spent on ads',                cVal: Number(curRoi),   iVal: Number(idealRoi),   fn: v => `${Number(v).toFixed(1)}x` },
  ];

  const GRID       = idealApplied ? '140px 1fr' : '130px 1fr 1fr';
  const colLabel   = { fontSize: 11, fontWeight: 600, letterSpacing: '0.02em' };
  const avgUplift  = Math.round(rows.reduce((s, r) => s + uplift(r.cVal, r.iVal), 0) / rows.length);
  const deltaOrders   = Math.round(ideal.orders  - cur.orders);
  const deltaRevenue  = Math.round(ideal.revenue - cur.revenue);

  return (
    <div style={{ border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 16px', borderBottom: '1px solid var(--osmos-border)' }}>
        <StarIcon />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>30 Day Simulation</span>
        {loading && <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', fontStyle: 'italic' }}>Updating…</span>}
      </div>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: GRID, padding: '8px 16px', background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
        <div />
        {idealApplied ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ ...colLabel, color: GREEN }}>Applied Budget</span>
            <span style={{ fontSize: 10, color: GREEN, background: 'rgba(27,168,122,0.10)', borderRadius: 8, padding: '1px 7px', fontWeight: 600 }}>₹{budget}/day</span>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: '#94a3b8', flexShrink: 0 }} />
              <span style={{ ...colLabel, color: 'var(--osmos-fg-muted)' }}>Current Potential</span>
              <span style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', fontWeight: 400 }}>₹{budget}/day</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, borderLeft: `2px solid ${PURPLE_MUTED}`, paddingLeft: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: PURPLE, flexShrink: 0 }} />
              <span style={{ ...colLabel, color: PURPLE }}>Ideal Potential</span>
              <span style={{ fontSize: 10, color: PURPLE, background: PURPLE_LIGHT, borderRadius: 8, padding: '1px 6px', fontWeight: 600 }}>₹{idealBudget}/day</span>
            </div>
          </>
        )}
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => {
          const [cLo, cHi] = curRange(row.cVal);
          const [iLo, iHi] = curRange(row.iVal);
          const isLast = i === rows.length - 1;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: GRID, padding: '9px 16px', alignItems: 'center', borderBottom: isLast ? 'none' : '1px solid var(--osmos-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)' }}>{row.label}</span>
                <InfoTip text={row.def} />
              </div>
              {loading ? (
                <div style={{ height: 14, width: '65%', background: 'var(--osmos-bg-subtle)', borderRadius: 4 }} />
              ) : (
                <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums', fontWeight: idealApplied ? 600 : 500, color: idealApplied ? GREEN : 'var(--osmos-fg)' }}>
                  {fmtRange(cLo, cHi, row.fn)}
                </span>
              )}
              {!idealApplied && (
                loading ? (
                  <div style={{ height: 14, width: '65%', background: 'var(--osmos-bg-subtle)', borderRadius: 4, borderLeft: `2px solid ${PURPLE_MUTED}`, paddingLeft: 10 }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', borderLeft: `2px solid ${PURPLE_MUTED}`, paddingLeft: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: PURPLE, fontVariantNumeric: 'tabular-nums' }}>
                      {fmtRange(iLo, iHi, row.fn)}
                    </span>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Action zone */}
      {idealApplied ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderTop: '1px solid var(--osmos-border)', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Optimal budget applied</span>
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>— simulation updated to reflect your new budget</span>
          </div>
          <button style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            title="Ideal budget = your daily budget × 1.35, rounded to nearest ₹100. Projections use 30-day auction data weighted by product count and category competition.">
            How is this calculated?
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderTop: '1px solid var(--osmos-border)', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <StarIcon size={12} />
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', lineHeight: 1.4 }}>
              <strong style={{ color: GREEN, fontWeight: 600 }}>~{avgUplift}% uplift</strong>
              {' — '}~{deltaOrders} more orders,{' '}
              <strong style={{ color: PURPLE, fontWeight: 600 }}>{fmt(deltaRevenue)} more revenue</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              title="Ideal budget = your daily budget × 1.35, rounded to nearest ₹100. Projections use 30-day auction data weighted by product count and category competition.">
              How is this calculated?
            </button>
            <button
              onClick={() => onApplyIdeal && onApplyIdeal(idealBudget)}
              style={{ fontSize: 12, fontWeight: 600, color: PURPLE, background: 'none', border: `1.5px solid ${PURPLE}`, borderRadius: 6, padding: '5px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => e.currentTarget.style.background = PURPLE_LIGHT}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <StarIcon size={12} />
              Apply to ideal potential
            </button>
          </div>
        </div>
      )}

      {/* Footnote */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '9px 16px', borderTop: '1px solid var(--osmos-border)' }}>
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
