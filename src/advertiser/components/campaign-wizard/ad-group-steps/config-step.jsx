import { useState } from 'react';
import { CalendarIcon, InfoIcon, Icon, Select } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';

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
const daysOfWeek   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const periodOptions = [
  { value: 'hour',  label: 'Hour'  },
  { value: 'day',   label: 'Day'   },
  { value: 'week',  label: 'Week'  },
  { value: 'month', label: 'Month' },
];

const deliveryOptions = [
  { id: 'standard',    label: 'Standard',    description: 'Evenly distribute impressions throughout the day' },
  { id: 'accelerated', label: 'Accelerated', description: 'Deliver impressions as quickly as possible'       },
];

// ── ConfigStep ────────────────────────────────────────────────────────────────
export function ConfigStep({ data, updateData }) {
  const [hoveredDelivery, setHoveredDelivery] = useState(null);
  const [hoveredDay,      setHoveredDay]      = useState(null);

  const updateConfig = (field, value) => {
    updateData({ config: { ...data.config, [field]: value } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Configuration
        </h2>
        <p style={{ color: TEXT_MID }}>
          Fine-tune delivery settings for your ad group.
        </p>
      </div>

      {/* Frequency Capping */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <ClockIcon size={20} color={TEXT_MID} />
          <h4 style={{ fontWeight: 500, color: TEXT }}>Frequency Capping</h4>
          <InfoIcon size={14} color={TEXT_SUB} />
        </div>
        <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>
          Limit how often a user sees your ad to prevent ad fatigue.
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: TEXT_MID, marginBottom: 8 }}>
              Max impressions
            </label>
            <input
              type="number"
              value={data.config.frequencyCap}
              onChange={(e) => updateConfig('frequencyCap', e.target.value)}
              style={{
                width: 96, padding: '8px 12px',
                border: `1px solid ${BORDER}`, borderRadius: 8,
                fontSize: 13, color: TEXT, background: BG,
                fontFamily: FONT, outline: 'none',
              }}
            />
          </div>
          <div style={{ minWidth: 120 }}>
            <Select
              label="Per"
              value={data.config.frequencyPeriod}
              onChange={(e) => updateConfig('frequencyPeriod', e.target.value)}
              options={periodOptions}
            />
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <ZapIcon size={20} color={TEXT_MID} />
          <h4 style={{ fontWeight: 500, color: TEXT }}>Delivery Type</h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {deliveryOptions.map(({ id, label, description }) => {
            const isSelected = data.config.deliveryType === id;
            const isHovered  = hoveredDelivery === id;
            return (
              <button
                key={id}
                onClick={() => updateConfig('deliveryType', id)}
                onMouseEnter={() => setHoveredDelivery(id)}
                onMouseLeave={() => setHoveredDelivery(null)}
                style={{
                  padding: 16, borderRadius: 8, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <h5 style={{ fontWeight: 500, marginBottom: 4, color: isSelected ? ACCENT : TEXT }}>
                  {label}
                </h5>
                <p style={{ fontSize: 12, color: TEXT_MID }}>{description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Parting */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <CalendarIcon size={20} color={TEXT_MID} />
          <h4 style={{ fontWeight: 500, color: TEXT }}>Day Parting</h4>
          <span style={{ fontSize: 12, color: TEXT_SUB }}>(Optional)</span>
        </div>
        <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>
          Select specific days and hours when your ads should run.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {daysOfWeek.map((day) => {
            const isSelected = data.config.dayParting.some((d) => d.startsWith(day));
            const isHovered  = hoveredDay === day;
            return (
              <button
                key={day}
                onClick={() => {
                  if (isSelected) {
                    updateConfig('dayParting', data.config.dayParting.filter((d) => !d.startsWith(day)));
                  } else {
                    updateConfig('dayParting', [...data.config.dayParting, `${day}-all`]);
                  }
                }}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  color: isSelected ? ACCENT : TEXT_MID,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {data.config.dayParting.length > 0 && (
          <div style={{ padding: 12, background: BG_SUB, borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: TEXT_MID }}>
              Ads will run on:{' '}
              {data.config.dayParting.map((d) => d.split('-')[0]).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
