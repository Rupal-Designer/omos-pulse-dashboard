import { useState } from 'react';
import { SectionCard, Badge, Button, InfoIcon, Icon } from '../../ui';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const GREEN_M  = 'var(--osmos-brand-green-muted)';
const AMBER    = 'var(--osmos-brand-amber)';

// ── Inline icons (paths only — no wrapper, used inside <Icon>) ────────────────
const SparkleIcon = ({ size = 14, color = ACCENT }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const ClockIcon = ({ size = 13, color = TEXT_SUB }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

const CheckCircleIcon = ({ size = 14, color = GREEN }) => (
  <Icon size={size} color={color}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);

const XCircleIcon = ({ size = 14, color = TEXT_SUB }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </Icon>
);

const HourglassIcon = ({ size = 28, color = AMBER }) => (
  <Icon size={size} color={color}>
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </Icon>
);

// ── Mock data (Phase 0 — replace with API in Phase 1) ─────────────────────────
const MOCK_SIMULATION = {
  campaignName: 'Summer Sale PLA',
  campaignType: 'Smart Shopping',
  updatedAgo: '2h ago',
  // Budget scenario
  currentBudgetPerDay: '₹5,000',
  currentBudgetTotal:  '₹1,50,000',
  idealBudgetPerDay:   '₹8,200',
  idealBudgetTotal:    '₹2,46,000',
  // Metrics: [label, currentValue, idealValue, uplift, isROI]
  metrics: [
    { label: 'Est. Spend',       current: '₹1,50,000',  ideal: '₹2,46,000',  uplift: '+64%', isROI: false },
    { label: 'Est. Impressions', current: '42,00,000',  ideal: '69,00,000',  uplift: '+64%', isROI: false },
    { label: 'Est. Page Views',  current: '18,00,000',  ideal: '29,50,000',  uplift: '+64%', isROI: false },
    { label: 'Est. Orders',      current: '620',         ideal: '1,020',      uplift: '+65%', isROI: false },
    { label: 'Est. Revenue',     current: '₹9,30,000',  ideal: '₹15,30,000', uplift: '+65%', isROI: false },
    { label: 'Est. ROI',         current: '6.2x',        ideal: '6.2x',       uplift: '—',   isROI: true  },
  ],
  netRevenueUplift: '+₹6,00,000',
  netRevenueUpliftPct: '+65%',
};

// Learning mode mock (toggle `isLearning` in the component for demo)
const MOCK_LEARNING = {
  campaignName: 'New Campaign',
  campaignType: 'Smart Shopping',
  updatedAgo: '30m ago',
  criteria: [
    { label: 'Smart Shopping campaign',          met: true,  detail: null },
    { label: 'Campaign active with recent data', met: true,  detail: null },
    { label: 'Product organic activity',         met: false, detail: '12% of 30% threshold' },
    { label: 'Sufficient marketplace signals',   met: false, detail: 'Needs 2–3 more days' },
  ],
};

// ── FunnelSimulationSection ───────────────────────────────────────────────────
export function FunnelSimulationSection({ onAdjustBudget }) {
  // Toggle between simulation and learning mode for demo purposes
  const [isLearning] = useState(false);

  const data     = isLearning ? null : MOCK_SIMULATION;
  const learning = isLearning ? MOCK_LEARNING : null;
  const campaign = isLearning ? MOCK_LEARNING : MOCK_SIMULATION;

  return (
    <SectionCard
      bodyBg={BG}
      bodyPad={0}
      style={{ fontFamily: FONT }}
      title={undefined}
    >
      {/* ── Section Header ───────────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px 12px',
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 12,
      }}>
        {/* Left: title + campaign context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SparkleIcon size={15} color={ACCENT} />
            <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
              AI-Powered 30-Day Forecast
            </span>
            <Badge status="warning" style={{ fontSize: 10, padding: '1px 6px' }}>Beta</Badge>
          </div>
          <span style={{ fontSize: 12, color: TEXT_MID }}>
            {campaign.campaignName}
            <span style={{ margin: '0 6px', color: TEXT_SUB }}>·</span>
            {campaign.campaignType}
          </span>
        </div>

        {/* Right: freshness + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingTop: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ClockIcon />
            <span style={{ fontSize: 11, color: TEXT_SUB }}>Updated {campaign.updatedAgo}</span>
          </div>
          <button
            title="How forecasts are generated: Our AI analyses your campaign's past performance, daily budget, product activity, and recent marketplace signals to project 30-day outcomes."
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <InfoIcon size={14} color={TEXT_SUB} />
          </button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {isLearning ? (
          /* ── Learning Mode State ─────────────────────────────────────── */
          <LearningModeState data={learning} />
        ) : (
          <>
            {/* ── Budget Compare Bar ──────────────────────────────────── */}
            <BudgetCompareBar data={data} onAdjustBudget={onAdjustBudget} />

            {/* ── Metric Table ────────────────────────────────────────── */}
            <MetricTable data={data} />
          </>
        )}

        {/* ── Footer disclaimer ───────────────────────────────────────── */}
        <p style={{
          fontSize: 11, color: TEXT_SUB, margin: 0,
          borderTop: `1px solid ${BORDER}`, paddingTop: 12,
          lineHeight: 1.6,
        }}>
          ⚠ AI-generated estimates. Actual results may vary based on market conditions, product mix, and campaign changes.
          {' '}<button style={{ background: 'none', border: 'none', padding: 0, color: ACCENT, fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>Learn more</button>
        </p>
      </div>
    </SectionCard>
  );
}

// ── BudgetCompareBar ──────────────────────────────────────────────────────────
function BudgetCompareBar({ data, onAdjustBudget }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {/* Current budget */}
      <div style={{
        padding: '14px 16px', borderRadius: 10,
        border: `1px solid ${BORDER}`, background: BG_SUB,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_MID, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          At Your Budget
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>
          {data.currentBudgetPerDay}
          <span style={{ fontSize: 13, fontWeight: 400, color: TEXT_MID }}> / day</span>
        </span>
        <span style={{ fontSize: 12, color: TEXT_MID }}>{data.currentBudgetTotal} over 30 days</span>
      </div>

      {/* AI ideal budget */}
      <div style={{
        padding: '14px 16px', borderRadius: 10,
        border: `1px solid ${ACCENT}`,
        background: ACCENT_M,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: ACCENT, textTransform: 'uppercase', letterSpacing: 0.4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <SparkleIcon size={12} color={ACCENT} /> AI Suggested Budget
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={onAdjustBudget}
            style={{ fontSize: 11, padding: '3px 10px', height: 24 }}
          >
            Adjust Budget →
          </Button>
        </div>
        <span style={{ fontSize: 20, fontWeight: 700, color: ACCENT }}>
          {data.idealBudgetPerDay}
          <span style={{ fontSize: 13, fontWeight: 400, color: TEXT_MID }}> / day</span>
        </span>
        <span style={{ fontSize: 12, color: TEXT_MID }}>{data.idealBudgetTotal} over 30 days</span>
      </div>
    </div>
  );
}

// ── MetricTable ───────────────────────────────────────────────────────────────
function MetricTable({ data }) {
  const TH_STYLE = {
    padding: '8px 14px', fontSize: 11, fontWeight: 600,
    color: TEXT_MID, textAlign: 'left',
    borderBottom: `1px solid ${BORDER}`,
    background: BG_SUB,
    textTransform: 'uppercase', letterSpacing: 0.4,
  };
  const TD_STYLE = {
    padding: '10px 14px', fontSize: 13, color: TEXT,
    borderBottom: `1px solid ${BORDER}`,
  };
  const TD_IDEAL = {
    ...TD_STYLE,
    color: ACCENT, fontWeight: 500,
  };
  const TD_UPLIFT = {
    ...TD_STYLE,
    fontWeight: 600,
  };

  return (
    <div style={{ borderRadius: 10, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
        <caption style={{ display: 'none' }}>30-Day Performance Forecast Comparison</caption>
        <thead>
          <tr>
            <th scope="col" style={TH_STYLE}>Metric</th>
            <th scope="col" style={{ ...TH_STYLE, textAlign: 'right' }}>At Your Budget</th>
            <th scope="col" style={{ ...TH_STYLE, textAlign: 'right', color: ACCENT }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                <SparkleIcon size={11} color={ACCENT} /> At AI Budget
              </span>
            </th>
            <th scope="col" style={{ ...TH_STYLE, textAlign: 'right' }}>Uplift</th>
          </tr>
        </thead>
        <tbody>
          {data.metrics.map((m, i) => {
            const isROI = m.isROI;
            const rowBg = isROI ? ACCENT_M : (i % 2 === 0 ? BG : BG_SUB);
            return (
              <tr key={m.label} style={{ background: rowBg }}>
                <td style={{ ...TD_STYLE, background: rowBg, fontWeight: isROI ? 600 : 400 }}>
                  {m.label}
                  {isROI && (
                    <span style={{
                      marginLeft: 6, fontSize: 10, color: ACCENT, fontWeight: 400,
                      background: ACCENT_M, borderRadius: 4, padding: '1px 5px',
                    }}>
                      efficiency preserved
                    </span>
                  )}
                </td>
                <td style={{ ...TD_STYLE, background: rowBg, textAlign: 'right' }}>{m.current}</td>
                <td style={{ ...TD_IDEAL, background: rowBg, textAlign: 'right' }}>
                  {isROI ? (
                    <span style={{ color: TEXT_MID }}>{m.ideal}</span>
                  ) : (
                    m.ideal
                  )}
                </td>
                <td style={{ ...TD_UPLIFT, background: rowBg, textAlign: 'right' }}>
                  {m.uplift === '—' ? (
                    <span style={{ color: TEXT_SUB, fontWeight: 400 }}>—</span>
                  ) : (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      background: GREEN_M, color: GREEN,
                      borderRadius: 20, padding: '2px 8px', fontSize: 11,
                    }}>
                      {m.uplift}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ background: GREEN_M }}>
            <td colSpan={2} style={{
              padding: '12px 14px', fontSize: 13, fontWeight: 700,
              color: TEXT, borderTop: `2px solid ${BORDER}`,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <SparkleIcon size={14} color={GREEN} />
                Net Revenue Uplift
              </span>
            </td>
            <td colSpan={2} style={{
              padding: '12px 14px', textAlign: 'right',
              borderTop: `2px solid ${BORDER}`,
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: GREEN }}>
                {data.netRevenueUplift}
              </span>
              <span style={{ fontSize: 12, color: GREEN, marginLeft: 6 }}>
                ({data.netRevenueUpliftPct} more)
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── LearningModeState ─────────────────────────────────────────────────────────
function LearningModeState({ data }) {
  const metMet     = data.criteria.filter(c => c.met).length;
  const totalCrit  = data.criteria.length;
  const pct        = Math.round((metMet / totalCrit) * 100);

  return (
    <div style={{
      padding: '32px 24px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    }}>
      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--osmos-brand-amber-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <HourglassIcon size={28} color={AMBER} />
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 400 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>
          Your campaign is building momentum
        </span>
        <span style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6 }}>
          We're gathering enough data to make your first forecast. Here's where things stand:
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          width: '100%', height: 6, borderRadius: 99,
          background: BORDER, overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%', borderRadius: 99,
            background: AMBER, transition: 'width 0.5s ease',
          }} />
        </div>
        <span style={{ fontSize: 11, color: TEXT_SUB, textAlign: 'right' }}>
          {metMet} of {totalCrit} signals collected
        </span>
      </div>

      {/* Criteria checklist */}
      <div style={{
        width: '100%', maxWidth: 400,
        display: 'flex', flexDirection: 'column', gap: 8,
        textAlign: 'left',
      }}>
        {data.criteria.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              {c.met
                ? <CheckCircleIcon size={15} color={GREEN} />
                : <XCircleIcon size={15} color={TEXT_SUB} />
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 13, color: c.met ? TEXT : TEXT_MID }}>
                {c.label}
              </span>
              {c.detail && (
                <span style={{ fontSize: 11, color: TEXT_SUB }}>{c.detail}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <span style={{ fontSize: 12, color: TEXT_SUB, maxWidth: 360, lineHeight: 1.6 }}>
        Estimates typically appear within 2–3 days of consistent campaign activity.
      </span>
    </div>
  );
}
