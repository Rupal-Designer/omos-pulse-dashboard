import { CheckIcon } from '../atoms/Icon';

/**
 * Stepper — horizontal numbered step indicator.
 *
 * steps:   Array<{ label: string }>
 * current: number — 1-indexed active step
 */
export function Stepper({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontFamily: "'Open Sans', sans-serif" }}>
      {steps.map((step, i) => {
        const num       = i + 1;
        const active    = num === current;
        const completed = num < current;
        const dotBg     = active ? 'var(--osmos-brand-primary)' : completed ? 'var(--osmos-brand-green)' : 'var(--osmos-bg-subtle)';
        const dotColor  = (active || completed) ? '#fff' : 'var(--osmos-fg-muted)';
        const labelColor = active ? 'var(--osmos-brand-primary)' : completed ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)';

        return (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600,
              backgroundColor: dotBg, color: dotColor,
              transition: 'all 0.2s',
            }}>
              {completed ? <CheckIcon size={14} color="#fff" /> : num}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
