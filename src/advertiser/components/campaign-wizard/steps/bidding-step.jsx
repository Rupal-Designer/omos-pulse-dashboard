import { useState } from 'react';
import { InfoIcon, Icon } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const ERROR    = 'var(--alert-error-primary)';
const GREEN    = 'var(--osmos-brand-green)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const ClockIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </Icon>
);

const ZapIcon = (props) => (
  <Icon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const strategies = [
  { id: 'cpm',  label: 'CPM',  description: 'Cost per 1,000 impressions',          recommended: true  },
  { id: 'cpc',  label: 'CPC',  description: 'Cost per click'                                          },
  { id: 'cpa',  label: 'CPA',  description: 'Cost per acquisition'                                    },
  { id: 'vcpm', label: 'vCPM', description: 'Viewable cost per 1,000 impressions'                     },
];

const pacingOptions = [
  { id: 'standard',    label: 'Standard',    description: 'Evenly distribute budget throughout the day', IconComp: ClockIcon },
  { id: 'accelerated', label: 'Accelerated', description: 'Spend budget as quickly as possible',         IconComp: ZapIcon   },
];

const priorityOptions = [
  { id: 'guaranteed', label: 'Guaranteed', description: 'Highest priority delivery' },
  { id: 'standard',   label: 'Standard',   description: 'Normal priority'           },
  { id: 'house',      label: 'House',       description: 'Fill unsold inventory'    },
];

// ── BiddingStep ───────────────────────────────────────────────────────────────
export function BiddingStep({ data, updateData }) {
  const [hoveredStrategy, setHoveredStrategy] = useState(null);
  const [hoveredPacing,   setHoveredPacing]   = useState(null);
  const [hoveredPriority, setHoveredPriority] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Bidding Strategy
        </h2>
        <p style={{ color: TEXT_MID }}>
          Choose how you want to pay for your ads and control delivery.
        </p>
      </div>

      {/* Buying Type */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 16 }}>
          Select Buying Type <span style={{ color: ERROR }}>*</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {strategies.map((strategy) => {
            const isSelected = data.biddingStrategy === strategy.id;
            const isHovered  = hoveredStrategy === strategy.id;
            return (
              <button
                key={strategy.id}
                onClick={() => updateData({ biddingStrategy: strategy.id })}
                onMouseEnter={() => setHoveredStrategy(strategy.id)}
                onMouseLeave={() => setHoveredStrategy(null)}
                style={{
                  position: 'relative',
                  padding: 16, borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                {strategy.recommended && (
                  <span style={{
                    position: 'absolute', top: -8, right: -8,
                    padding: '2px 8px', background: GREEN, color: '#fff',
                    fontSize: 10, fontWeight: 500, borderRadius: 999,
                  }}>
                    Recommended
                  </span>
                )}
                <h4 style={{ fontWeight: 600, marginBottom: 4, color: isSelected ? ACCENT : TEXT }}>
                  {strategy.label}
                </h4>
                <p style={{ fontSize: 12, color: TEXT_MID }}>{strategy.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pacing */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 16 }}>
          Campaign Pacing
          <InfoIcon size={12} color={TEXT_SUB} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {pacingOptions.map(({ id, label, description, IconComp }) => {
            const isSelected = data.pacing === id;
            const isHovered  = hoveredPacing === id;
            return (
              <button
                key={id}
                onClick={() => updateData({ pacing: id })}
                onMouseEnter={() => setHoveredPacing(id)}
                onMouseLeave={() => setHoveredPacing(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: 20, borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSelected ? ACCENT : BG_SUB,
                }}>
                  <IconComp size={20} color={isSelected ? '#fff' : TEXT_MID} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 500, marginBottom: 4, color: isSelected ? ACCENT : TEXT }}>
                    {label}
                  </h4>
                  <p style={{ fontSize: 12, color: TEXT_MID }}>{description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 16 }}>
          Campaign Priority
          <InfoIcon size={12} color={TEXT_SUB} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {priorityOptions.map((option) => {
            const isSelected = data.priority === option.id;
            const isHovered  = hoveredPriority === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateData({ priority: option.id })}
                onMouseEnter={() => setHoveredPriority(option.id)}
                onMouseLeave={() => setHoveredPriority(null)}
                style={{
                  padding: '12px 20px', borderRadius: 8, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <h4 style={{ fontWeight: 500, fontSize: 13, marginBottom: 2, color: isSelected ? ACCENT : TEXT }}>
                  {option.label}
                </h4>
                <p style={{ fontSize: 12, color: TEXT_MID }}>{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
