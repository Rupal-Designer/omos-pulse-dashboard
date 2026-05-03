import { CheckIcon } from '../atoms/Icon';

const FONT      = "'Open Sans', sans-serif";
const ACCENT    = 'var(--osmos-brand-primary)';
const GREEN     = 'var(--osmos-brand-green)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const TEXT_MID  = 'var(--osmos-fg-muted)';

/**
 * Stepper — horizontal numbered step indicator.
 *
 * steps:   Array<{ label: string }>
 * current: number — 1-indexed active step
 */
export function Stepper({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontFamily: FONT }}>
      {steps.map((step, i) => {
        const num       = i + 1;
        const active    = num === current;
        const completed = num < current;
        const dotBg     = active ? ACCENT : completed ? GREEN : BG_SUBTLE;
        const dotColor  = (active || completed) ? '#fff' : TEXT_MID;
        const labelColor = active ? ACCENT : completed ? GREEN : TEXT_MID;

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
