import { useState } from 'react';
import { CalendarIcon, InfoIcon, Icon } from '../../../../ui';

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

// ── Icons ─────────────────────────────────────────────────────────────────────
const ClockIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </Icon>
);

// ── Shared date-input style ───────────────────────────────────────────────────
const dateInputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '12px 16px 12px 44px',
  border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, color: TEXT, background: BG,
  fontFamily: FONT, outline: 'none',
};

// ── ScheduleStep ──────────────────────────────────────────────────────────────
export function ScheduleStep({ data, updateData }) {
  const [hoveredQuick, setHoveredQuick] = useState(null);

  const quickOptions = [
    { label: 'Start Today',      days: 0 },
    { label: 'Start Tomorrow',   days: 1 },
    { label: 'Start Next Week',  days: 7 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Campaign Schedule
        </h2>
        <p style={{ color: TEXT_MID }}>
          Set when your campaign should start and end.
        </p>
      </div>

      {/* Date range */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>

          {/* Start Date */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8 }}>
              Start Date <span style={{ color: ERROR }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => updateData({ startDate: e.target.value })}
                style={dateInputStyle}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <CalendarIcon size={18} color={ACCENT} />
              </span>
            </div>
            <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 8 }}>
              Campaign will start at 12:00 AM on this date
            </p>
          </div>

          {/* End Date */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8 }}>
              End Date{' '}
              <span style={{ fontSize: 12, color: TEXT_SUB, fontStyle: 'italic' }}>(Optional)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={data.endDate}
                onChange={(e) => updateData({ endDate: e.target.value })}
                style={dateInputStyle}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <CalendarIcon size={18} color={ACCENT} />
              </span>
            </div>
            <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 8 }}>
              Leave empty for an ongoing campaign
            </p>
          </div>
        </div>

        {/* Timezone info banner */}
        <div style={{
          marginTop: 24, padding: 16,
          background: ACCENT_M, borderRadius: 8,
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{ marginTop: 2, flexShrink: 0 }}>
            <InfoIcon size={16} color={ACCENT} />
          </span>
          <div>
            <p style={{ fontSize: 13, color: TEXT, fontWeight: 500, marginBottom: 4 }}>Timezone</p>
            <p style={{ fontSize: 12, color: TEXT_MID }}>
              All dates and times will be set in{' '}
              <span style={{ fontWeight: 500 }}>Asia/Kolkata (IST)</span> timezone.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Schedule */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 16 }}>
          Quick Schedule
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {quickOptions.map((option) => {
            const date = new Date();
            date.setDate(date.getDate() + option.days);
            const dateStr = date.toISOString().split('T')[0];
            const isSelected = data.startDate === dateStr;
            const isHovered  = hoveredQuick === option.label;
            return (
              <button
                key={option.label}
                onClick={() => updateData({ startDate: dateStr })}
                onMouseEnter={() => setHoveredQuick(option.label)}
                onMouseLeave={() => setHoveredQuick(null)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 8,
                  border: `${isSelected ? '2px' : '1px'} solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  color: isSelected ? ACCENT : TEXT_MID,
                  fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <ClockIcon size={14} color={isSelected ? ACCENT : TEXT_MID} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
