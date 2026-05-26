import { CheckIcon } from '../atoms/Icon';

/**
 * RadioCard — selectable bordered card.
 * Highlights border + background when selected.
 *
 * selected:  boolean
 * onClick:   () => void
 * children:  ReactNode
 * style:     object — extra styles on the card wrapper
 */
export function RadioCard({ selected, onClick, children, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${selected ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
        borderRadius: 12, padding: 16, cursor: 'pointer',
        backgroundColor: selected ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg)',
        boxShadow: selected ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.15s',
        ...style,
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--osmos-fg-subtle)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--osmos-border)'; }}
    >
      {children}
    </div>
  );
}

/**
 * RadioDot — round radio-button indicator (16px default).
 * Filled + check when selected, empty ring when not.
 *
 * selected: boolean
 * size:     number (default 16)
 */
export function RadioDot({ selected, size = 16 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `2px solid ${selected ? 'var(--osmos-brand-primary)' : 'var(--border)'}`,
      backgroundColor: selected ? 'var(--osmos-brand-primary)' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all 0.15s',
    }}>
      {selected && <CheckIcon size={Math.max(8, size - 8)} color="#fff" />}
    </div>
  );
}
