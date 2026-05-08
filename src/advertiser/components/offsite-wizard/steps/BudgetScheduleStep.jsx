import { Input, Select } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';

const BID_STRATEGIES = {
  Meta: ['CBO (Campaign Budget Optimisation)', 'Manual CPC', 'Lowest Cost', 'Bid Cap'],
  Google: ['Target ROAS', 'Target CPA', 'Maximise Conversions', 'Manual CPC'],
  TikTok: ['oCPC', 'CPM', 'Lowest Cost'],
  Snapchat: ['Auto-bid', 'Manual CPM', 'Target CPA'],
  YouTube: ['CPV', 'Target CPM', 'Maximise Lift'],
  'DV-360': ['CPM', 'vCPM', 'dCPM'],
};

const PACING_OPTIONS = ['Standard', 'Accelerated'];

function FieldRow({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MID }}>{label}</label>
        {hint && <span style={{ fontSize: 11, color: TEXT_LO }}>({hint})</span>}
      </div>
      {children}
    </div>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '20px', marginBottom: 16, fontFamily: FONT }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT_HI, margin: '0 0 4px' }}>{title}</h3>
      {description && <p style={{ fontSize: 12, color: TEXT_MID, margin: '0 0 16px' }}>{description}</p>}
      {children}
    </div>
  );
}

export default function BudgetScheduleStep({ campaignData, onChange }) {
  const budget = campaignData.budget || {
    type: 'daily',
    dailyBudget: '',
    lifetimeBudget: '',
    startDate: '',
    endDate: '',
    bidStrategy: '',
    pacing: 'Standard',
  };

  const channels = campaignData.channels?.map(c => c.channel) || [];
  const primaryChannel = channels[0] || 'Meta';
  const bidOptions = BID_STRATEGIES[primaryChannel] || BID_STRATEGIES.Meta;

  function update(partial) {
    onChange({ budget: { ...budget, ...partial } });
  }

  // Compute estimated total spend
  function estimatedTotal() {
    if (!budget.dailyBudget || !budget.startDate || !budget.endDate) return null;
    const start = new Date(budget.startDate);
    const end   = new Date(budget.endDate);
    if (isNaN(start) || isNaN(end) || end <= start) return null;
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const total = days * Number(budget.dailyBudget);
    return { days, total };
  }

  const est = budget.type === 'daily' ? estimatedTotal() : null;

  return (
    <div style={{ fontFamily: FONT, maxWidth: 600 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_HI, margin: '0 0 4px' }}>
        Budget & Schedule
      </h2>
      <p style={{ fontSize: 13, color: TEXT_MID, margin: '0 0 24px' }}>
        Set how much you want to spend and when your campaign runs.
      </p>

      {/* Budget type toggle */}
      <SectionCard title="Budget" description="Choose a daily or lifetime budget for your campaign.">
        <div style={{ display: 'flex', gap: 0, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16, width: 'fit-content' }}>
          {[
            { value: 'daily',    label: 'Daily Budget' },
            { value: 'lifetime', label: 'Lifetime Budget' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => update({ type: opt.value })}
              style={{
                padding: '7px 18px', border: 'none', cursor: 'pointer', fontFamily: FONT,
                background: budget.type === opt.value ? ACCENT : BG_SUB,
                color: budget.type === opt.value ? '#fff' : TEXT_MID,
                fontSize: 13, fontWeight: budget.type === opt.value ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <FieldRow label={budget.type === 'daily' ? 'Daily Budget' : 'Lifetime Budget'} hint="INR">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden', background: BG }}>
            <span style={{ padding: '8px 12px', background: BG_SUB, borderRight: `1px solid ${BORDER}`, fontSize: 13, color: TEXT_MID, fontWeight: 600 }}>₹</span>
            <input
              type="number" min={0} placeholder="0"
              value={budget.type === 'daily' ? budget.dailyBudget : budget.lifetimeBudget}
              onChange={e => update({ [budget.type === 'daily' ? 'dailyBudget' : 'lifetimeBudget']: e.target.value })}
              style={{ flex: 1, border: 'none', padding: '8px 12px', fontSize: 14, fontFamily: FONT, outline: 'none', background: 'transparent', color: TEXT_HI }}
            />
          </div>
        </FieldRow>
      </SectionCard>

      {/* Schedule */}
      <SectionCard title="Schedule" description="Set when your campaign starts and ends.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FieldRow label="Start Date">
            <input
              type="date"
              value={budget.startDate}
              onChange={e => update({ startDate: e.target.value })}
              style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, fontFamily: FONT, color: TEXT_HI, background: BG }}
            />
          </FieldRow>
          <FieldRow label="End Date">
            <input
              type="date"
              value={budget.endDate}
              onChange={e => update({ endDate: e.target.value })}
              style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, fontFamily: FONT, color: TEXT_HI, background: BG }}
            />
          </FieldRow>
        </div>
      </SectionCard>

      {/* Bid strategy */}
      <SectionCard title="Bid Strategy & Pacing" description={`Options for ${primaryChannel}`}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FieldRow label="Bid Strategy">
            <Select
              value={budget.bidStrategy}
              onChange={e => update({ bidStrategy: e.target.value })}
              options={[{ value: '', label: 'Select strategy...' }, ...bidOptions.map(opt => ({ value: opt, label: opt }))]}
              style={{ fontFamily: FONT }}
            />
          </FieldRow>
          <FieldRow label="Pacing">
            <Select
              value={budget.pacing}
              onChange={e => update({ pacing: e.target.value })}
              options={PACING_OPTIONS.map(opt => ({ value: opt, label: opt }))}
              style={{ fontFamily: FONT }}
            />
          </FieldRow>
        </div>
      </SectionCard>

      {/* Estimated total spend */}
      {est && (
        <div style={{
          background: BG_SUB, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: TEXT_LO, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
              Estimated Total Spend
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: TEXT_HI, margin: 0, fontFamily: FONT }}>
              ₹{est.total.toLocaleString('en-IN')}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: TEXT_MID, margin: '0 0 2px' }}>Duration</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: TEXT_HI, margin: 0 }}>
              {est.days} day{est.days !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
