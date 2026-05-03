import { CalendarIcon, CheckIcon, Icon } from '../../../../ui';

const FONT      = "'Open Sans', sans-serif";
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const BORDER    = 'var(--osmos-border)';
const BG        = 'var(--osmos-bg)';
const BG_SUB    = 'var(--osmos-bg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const GREEN     = 'var(--osmos-brand-green)';
const GREEN_M   = 'var(--osmos-brand-green-muted)';
const AMBER     = 'var(--osmos-brand-amber)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const DollarSignIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

const TargetIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </Icon>
);

// ── ReviewStep ────────────────────────────────────────────────────────────────
export function ReviewStep({ data }) {
  const totalBudget = Number.parseFloat(data.totalBudget) || 0;
  const dailyBudget = Number.parseFloat(data.dailyBudget) || 0;

  const overviewItems = [
    {
      label:    'Schedule',
      value:    `${data.startDate} ${data.endDate ? `- ${data.endDate}` : '(Ongoing)'}`,
      IconComp: CalendarIcon,
      iconBg:   ACCENT_M,
      iconColor: ACCENT,
    },
    {
      label:    'Budget',
      value:    `$${totalBudget.toLocaleString()} total · $${dailyBudget.toLocaleString()}/day`,
      IconComp: DollarSignIcon,
      iconBg:   GREEN_M,
      iconColor: GREEN,
    },
    {
      label:    'Bidding',
      value:    `${data.biddingStrategy} · ${data.pacing} pacing`.toUpperCase(),
      IconComp: TargetIcon,
      iconBg:   'var(--osmos-brand-amber-muted)',
      iconColor: AMBER,
    },
    {
      label:    'Ad Groups',
      value:    `${data.adGroups.length} ad group(s) configured`,
      IconComp: LayersIcon,
      iconBg:   'var(--osmos-brand-violet-muted)',
      iconColor: 'var(--osmos-brand-violet)',
    },
  ];

  const checklistItems = [
    'Campaign name and objective set',
    'Schedule configured',
    'Budget and wallet selected',
    'Bidding strategy defined',
    `${data.adGroups.length} ad group(s) created`,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Review &amp; Launch
        </h2>
        <p style={{ color: TEXT_MID }}>
          Review your campaign settings before launching.
        </p>
      </div>

      {/* Campaign Overview */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', background: BG_SUB, borderBottom: `1px solid ${BORDER}` }}>
          <h3 style={{ fontWeight: 600, color: TEXT }}>
            {data.name || 'Untitled Campaign'}
          </h3>
          <p style={{ fontSize: 13, color: TEXT_MID, textTransform: 'capitalize' }}>
            {data.objective.replace('_', ' ')} Campaign
          </p>
        </div>

        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {overviewItems.map(({ label, value, IconComp, iconBg, iconColor }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: iconBg,
              }}>
                <IconComp size={20} color={iconColor} />
              </div>
              <div>
                <h4 style={{ fontWeight: 500, color: TEXT, marginBottom: 4 }}>{label}</h4>
                <p style={{ fontSize: 13, color: TEXT_MID }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Groups Summary */}
      {data.adGroups.length > 0 && (
        <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${BORDER}` }}>
            <h3 style={{ fontWeight: 600, color: TEXT }}>Ad Groups Summary</h3>
          </div>
          <div>
            {data.adGroups.map((adGroup, index) => (
              <div
                key={adGroup.id}
                style={{
                  padding: 16,
                  borderTop: index > 0 ? `1px solid ${BORDER}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: ACCENT_M,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 500, color: ACCENT, flexShrink: 0,
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 500, color: TEXT }}>{adGroup.name}</h4>
                    <p style={{ fontSize: 12, color: TEXT_MID }}>
                      {adGroup.selectedPages.length} pages ·{' '}
                      {adGroup.adFormat || 'No format'} ·{' '}
                      {adGroup.creatives.length} creative(s)
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckIcon size={16} color={GREEN} />
                  <span style={{ fontSize: 13, color: GREEN }}>Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      <div style={{
        background: GREEN_M,
        borderRadius: 12, border: `1px solid var(--alert-success-lighter)`,
        padding: 24,
      }}>
        <h3 style={{
          fontWeight: 600, color: GREEN, marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <CheckIcon size={20} color={GREEN} />
          Ready to Launch
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {checklistItems.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: TEXT }}>
              <CheckIcon size={14} color={GREEN} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
