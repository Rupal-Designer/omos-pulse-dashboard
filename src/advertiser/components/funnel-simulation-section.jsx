import { useState } from 'react';
import { SectionCard, InfoIcon, Icon } from '../../ui';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const GREEN    = 'var(--osmos-brand-green)';
const AMBER    = 'var(--osmos-brand-amber)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const CalendarIcon = (props) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

// ── Format helpers ─────────────────────────────────────────────────────────────
function fmtVal(v, type) {
  if (type === 'multiplier') return v.toFixed(1).replace(/\.0$/, '') + 'x';
  const abs = Math.abs(v);
  let s;
  if (abs >= 1_000_000) s = (v / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  else if (abs >= 1_000)  s = (v / 1_000).toFixed(0) + 'K';
  else                    s = String(v);
  return type === 'currency' ? '₹' + s : s;
}

function fmtRange(min, max, type) {
  if (min === max) return fmtVal(min, type);
  return `${fmtVal(min, type)} – ${fmtVal(max, type)}`;
}

// ── Dynamic metric computation (driven by entered budget) ─────────────────────
// Scale factors derived from the 5,000/day baseline in the original PRD mock.
function computeFromBudget(b) {
  b = Math.round(b);
  const ai  = Math.max(Math.round(b * 1.64 / 100) * 100, b + 100);
  const ax  = 1.25; // 25% headroom above ideal on the axis
  return {
    aiSuggested: ai,
    metrics: [
      { label: 'Est. Spend',       currentMin: Math.round(b * 30 * 0.95),    currentMax: b * 30,                   ideal: ai * 30,                   axisMax: Math.round(ai * 30 * ax),    type: 'currency'   },
      { label: 'Est. Impressions', currentMin: Math.round(b * 840 * 0.95),   currentMax: b * 840,                  ideal: ai * 840,                  axisMax: Math.round(ai * 840 * ax),   type: 'compact'    },
      { label: 'Est. Page Views',  currentMin: Math.round(b * 360 * 0.95),   currentMax: b * 360,                  ideal: ai * 360,                  axisMax: Math.round(ai * 360 * ax),   type: 'compact'    },
      { label: 'Est. Orders',      currentMin: Math.round(b * 0.124 * 0.95), currentMax: Math.round(b * 0.124),    ideal: Math.round(ai * 0.124),    axisMax: Math.round(ai * 0.124 * ax), type: 'number'     },
      { label: 'Est. Revenue',     currentMin: Math.round(b * 186 * 0.95),   currentMax: b * 186,                  ideal: ai * 186,                  axisMax: Math.round(ai * 186 * ax),   type: 'currency'   },
      { label: 'Est. ROI',         currentMin: 6.2,                           currentMax: 6.2,                      ideal: 6.2,                       axisMax: 10,                          type: 'multiplier' },
    ],
  };
}

const MOCK_LEARNING = {
  campaignName: 'New Campaign',
  campaignType: 'Smart Shopping',
  criteria: [
    { label: 'Smart Shopping campaign',          met: true,  detail: null },
    { label: 'Campaign active with recent data', met: true,  detail: null },
    { label: 'Product organic activity',         met: false, detail: '12% of 30% threshold' },
    { label: 'Sufficient marketplace signals',   met: false, detail: 'Needs 2–3 more days' },
  ],
};

// ── MetricBar ─────────────────────────────────────────────────────────────────
function MetricBar({ metric }) {
  const { label, currentMin, currentMax, ideal, axisMax, type } = metric;
  const isROI      = type === 'multiplier';
  // clamp to 98% so markers never overflow the right edge
  const currentPct = Math.min((currentMax / axisMax) * 100, 97);
  const idealPct   = Math.min((ideal   / axisMax) * 100, 97);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '20px 0',
      borderBottom: `1px solid ${BORDER}`,
    }}>
      {/* Metric label */}
      <div style={{ width: 132, fontSize: 13, color: TEXT, flexShrink: 0 }}>{label}</div>

      {/* Bar + labels */}
      <div style={{ flex: 1, position: 'relative', paddingTop: 30 }}>

        {/* Current range pill — floats above the tick */}
        <div style={{
          position: 'absolute', top: 0,
          left: `${currentPct}%`,
          transform: 'translateX(-50%)',
          background: ACCENT, color: '#fff',
          borderRadius: 20, padding: '3px 10px',
          fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
          zIndex: 2,
        }}>
          {fmtRange(currentMin, currentMax, type)}
        </div>

        {/* Track */}
        <div style={{ position: 'relative', height: 8, borderRadius: 4, background: BG_SUB }}>

          {/* Blue fill (0 → current) */}
          <div style={{
            position: 'absolute', inset: '0 auto 0 0',
            width: `${currentPct}%`,
            background: ACCENT, borderRadius: 4,
          }} />

          {/* Current tick */}
          <div style={{
            position: 'absolute', top: -5, bottom: -5, width: 3,
            left: `${currentPct}%`, transform: 'translateX(-50%)',
            background: ACCENT, borderRadius: 2,
          }} />

          {/* Ideal dot (green) */}
          <div style={{
            position: 'absolute', top: '50%',
            left: `${idealPct}%`,
            transform: 'translate(-50%, -50%)',
            width: 14, height: 14,
            background: GREEN, borderRadius: '50%',
            border: '2px solid #fff', zIndex: 1,
            // hide when same position as current (ROI scenario)
            opacity: isROI ? 0 : 1,
          }} />

        </div>

        {/* Axis labels */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 6, fontSize: 11, color: TEXT_SUB,
        }}>
          <span>{type === 'multiplier' ? '0x' : '0'}</span>
          <span>{fmtVal(axisMax, type)}</span>
        </div>
      </div>
    </div>
  );
}

// ── FunnelSimulationSection ───────────────────────────────────────────────────
// budgetPerDay  — when provided (wizard context), metrics are computed live from this value
// onUseIdealBudget — when provided, "Reset to Ideal Settings" writes AI value back to the form
export function FunnelSimulationSection({ budgetPerDay, onUseIdealBudget, onAdjustBudget, lastActionedAt = null }) {
  const [isLearning] = useState(false);

  const live     = budgetPerDay && parseFloat(budgetPerDay) > 0
                     ? computeFromBudget(parseFloat(budgetPerDay))
                     : null;
  const learning = isLearning ? MOCK_LEARNING : null;

  const handleIdealCTA = () => {
    if (live && onUseIdealBudget) onUseIdealBudget(String(live.aiSuggested));
    else if (onAdjustBudget)      onAdjustBudget();
  };

  const actionedLabel = lastActionedAt
    ? (() => {
        const days = Math.floor((Date.now() - lastActionedAt.getTime()) / 86_400_000);
        if (days === 0) return 'You adjusted your budget today';
        if (days === 1) return 'You adjusted your budget yesterday';
        return `You adjusted your budget ${days} days ago`;
      })()
    : null;

  return (
    <SectionCard bodyBg={BG} bodyPad={0} style={{ fontFamily: FONT }} title={undefined}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarIcon size={16} color={ACCENT} />
          <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>30 Day Simulation</span>
          <button
            title="How forecasts are generated: Our AI analyses your campaign's past performance, daily budget, product activity, and recent marketplace signals to project 30-day outcomes."
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <InfoIcon size={14} color={TEXT_SUB} />
          </button>
        </div>
        <button
          onClick={handleIdealCTA}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: ACCENT,
            fontFamily: FONT, padding: 0,
          }}
        >
          Reset to Ideal Settings
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 20px 20px' }}>

        {/* Disclaimer */}
        <p style={{ fontSize: 12, color: TEXT_MID, margin: '0 0 8px', lineHeight: 1.6 }}>
          * See how current campaign settings can impact your ad traffic. Simulation is based on your category and recent marketplace signals.
        </p>

        {/* Last-actioned indicator */}
        {actionedLabel && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: TEXT_SUB, marginBottom: 8 }}>
            <CheckCircleIcon size={12} color={GREEN} />
            {actionedLabel} · Here's how the forecast updated
          </div>
        )}

        {isLearning ? (
          <LearningModeState data={learning} />
        ) : (
          <>
            {/* Metric rows */}
            <div>
              {live.metrics.map((m) => (
                <MetricBar key={m.label} metric={m} />
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: ACCENT, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: TEXT_MID }}>Current Potential</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: TEXT_MID }}>Ideal Potential</span>
              </div>
            </div>

            {/* Footer disclaimer */}
            <p style={{
              fontSize: 11, color: TEXT_SUB,
              margin: '14px 0 0', lineHeight: 1.6,
              borderTop: `1px solid ${BORDER}`, paddingTop: 12,
            }}>
              ⚠ AI-generated estimates. Actual results may vary based on market conditions, product mix, and campaign changes.
              {' '}<button style={{ background: 'none', border: 'none', padding: 0, color: ACCENT, fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>
                Learn more
              </button>
            </p>
          </>
        )}
      </div>
    </SectionCard>
  );
}

// ── LearningModeState ─────────────────────────────────────────────────────────
function LearningModeState({ data }) {
  const metMet    = data.criteria.filter(c => c.met).length;
  const totalCrit = data.criteria.length;
  const pct       = Math.round((metMet / totalCrit) * 100);

  return (
    <div style={{
      padding: '32px 24px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--osmos-brand-amber-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <HourglassIcon size={28} color={AMBER} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 400 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>
          Your campaign is building momentum
        </span>
        <span style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6 }}>
          We're gathering enough data to make your first forecast. Here's where things stand:
        </span>
      </div>

      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: '100%', height: 6, borderRadius: 99, background: BORDER, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: AMBER, transition: 'width 0.5s ease' }} />
        </div>
        <span style={{ fontSize: 11, color: TEXT_SUB, textAlign: 'right' }}>
          {metMet} of {totalCrit} signals collected
        </span>
      </div>

      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
        {data.criteria.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              {c.met
                ? <CheckCircleIcon size={15} color={GREEN} />
                : <XCircleIcon    size={15} color={TEXT_SUB} />
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 13, color: c.met ? TEXT : TEXT_MID }}>{c.label}</span>
              {c.detail && <span style={{ fontSize: 11, color: TEXT_SUB }}>{c.detail}</span>}
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
