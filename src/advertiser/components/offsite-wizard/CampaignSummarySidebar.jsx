import { StatCard } from '../../../ui';

const FONT     = "'Open Sans', sans-serif";
const BORDER   = 'var(--osmos-border)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';

const STEP_LABELS = {
  1: 'Channel & Objective',
  2: 'Audience',
  3: 'Products',
  4: 'Creative',
  5: 'Budget',
  6: 'Review',
};

function stepSummary(stepId, campaignData) {
  switch (stepId) {
    case 1: {
      const ch = campaignData.channels?.[0];
      if (!ch) return null;
      return `${ch.channel} · ${ch.objective}`;
    }
    case 2: {
      const a = campaignData.audience;
      if (!a?.location) return null;
      const genderLabel = a.gender === 'all' ? 'All genders' : a.gender === 'male' ? 'Male' : 'Female';
      return `Age ${a.ageMin}–${a.ageMax} · ${a.location} · ${genderLabel}`;
    }
    case 3: {
      const n = campaignData.selectedProducts?.length;
      if (!n) return null;
      return `${n} product${n !== 1 ? 's' : ''} selected`;
    }
    case 4: {
      const n = campaignData.creatives?.length;
      if (!n) return null;
      return `${n} creative${n !== 1 ? 's' : ''} uploaded`;
    }
    case 5: {
      const b = campaignData.budget;
      if (!b?.dailyBudget) return null;
      return `₹${Number(b.dailyBudget).toLocaleString('en-IN')}/day · ${b.bidStrategy || 'CBO'}`;
    }
    default:
      return null;
  }
}

export function CampaignSummarySidebar({ campaignData, completedSteps, onStepClick }) {
  const completedEntries = completedSteps
    .filter(id => id < 6)
    .map(id => ({ id, label: STEP_LABELS[id], summary: stepSummary(id, campaignData) }))
    .filter(e => e.summary);

  const reach = campaignData.channels?.length > 0 ? '2.4M – 5.1M' : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: FONT }}>
      {/* Reach estimate */}
      {reach && (
        <StatCard
          label="Estimated Reach"
          value={reach}
          sub="people / month"
          trendDir="neutral"
        />
      )}

      {/* Summary card */}
      <div style={{
        background: BG_SUB, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12,
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: TEXT_LO, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
          Campaign Summary
        </p>

        {completedEntries.length === 0 ? (
          <p style={{ fontSize: 12, color: TEXT_LO, lineHeight: 1.5, margin: 0 }}>
            Summary will appear as you complete each step.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {completedEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onStepClick?.(entry.id)}
                style={{
                  textAlign: 'left', padding: '6px 8px', borderRadius: 7,
                  border: `1px solid ${BORDER}`, background: 'var(--osmos-bg)',
                  cursor: 'pointer', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
              >
                <p style={{ fontSize: 10, fontWeight: 600, color: TEXT_LO, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {entry.label}
                </p>
                <p style={{ fontSize: 12, color: TEXT_HI, margin: 0, fontWeight: 500 }}>
                  {entry.summary}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
