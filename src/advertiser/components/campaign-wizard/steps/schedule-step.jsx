import { useState } from 'react';
import { CalendarIcon, InfoIcon, Icon } from '../../../../ui';

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
  border: `1px solid ${'var(--osmos-border)'}`, borderRadius: 8,
  fontSize: 13, color: 'var(--osmos-fg)', background: 'var(--osmos-bg)',
  fontFamily: "'Open Sans', sans-serif", outline: 'none',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Open Sans', sans-serif" }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>
          Campaign Schedule
        </h2>
        <p style={{ color: 'var(--osmos-fg-muted)' }}>
          Set when your campaign should start and end.
        </p>
      </div>

      {/* Date range */}
      <div style={{ background: 'var(--osmos-bg)', borderRadius: 12, border: `1px solid ${'var(--osmos-border)'}`, padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>

          {/* Start Date */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', marginBottom: 8 }}>
              Start Date <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => updateData({ startDate: e.target.value })}
                style={dateInputStyle}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <CalendarIcon size={18} color={'var(--osmos-brand-primary)'} />
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', marginTop: 8 }}>
              Campaign will start at 12:00 AM on this date
            </p>
          </div>

          {/* End Date */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', marginBottom: 8 }}>
              End Date{' '}
              <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', fontStyle: 'italic' }}>(Optional)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={data.endDate}
                onChange={(e) => updateData({ endDate: e.target.value })}
                style={dateInputStyle}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <CalendarIcon size={18} color={'var(--osmos-brand-primary)'} />
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', marginTop: 8 }}>
              Leave empty for an ongoing campaign
            </p>
          </div>
        </div>

        {/* Timezone info banner */}
        <div style={{
          marginTop: 24, padding: 16,
          background: 'var(--osmos-brand-primary-muted)', borderRadius: 8,
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{ marginTop: 2, flexShrink: 0 }}>
            <InfoIcon size={16} color={'var(--osmos-brand-primary)'} />
          </span>
          <div>
            <p style={{ fontSize: 13, color: 'var(--osmos-fg)', fontWeight: 500, marginBottom: 4 }}>Timezone</p>
            <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
              All dates and times will be set in{' '}
              <span style={{ fontWeight: 500 }}>Asia/Kolkata (IST)</span> timezone.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Schedule */}
      <div style={{ background: 'var(--osmos-bg)', borderRadius: 12, border: `1px solid ${'var(--osmos-border)'}`, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', marginBottom: 16 }}>
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
                  border: `${isSelected ? '2px' : '1px'} solid ${isSelected ? 'var(--osmos-brand-primary)' : isHovered ? 'var(--osmos-fg-muted)' : 'var(--osmos-border)'}`,
                  background: isSelected ? 'var(--osmos-brand-primary-muted)' : isHovered ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)',
                  color: isSelected ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                  fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                <ClockIcon size={14} color={isSelected ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)'} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
