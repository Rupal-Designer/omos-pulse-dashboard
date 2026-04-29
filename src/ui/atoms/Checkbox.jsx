import React from 'react';

/**
 * Checkbox — custom 16×16 brand-primary checkbox.
 * checked: boolean
 * onChange: () => void
 * label: optional string rendered to the right
 */
export function Checkbox({ checked, onChange, label, disabled = false, style }) {
  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
      onClick={disabled ? undefined : onChange}
    >
      <div style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        border: checked
          ? '2px solid var(--osmos-brand-primary)'
          : '2px solid var(--osmos-border)',
        background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.15s',
        userSelect: 'none',
        opacity: disabled ? 0.45 : 1,
      }}>
        {checked && (
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label && (
        <span style={{ fontSize: 13, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", userSelect: 'none' }}>
          {label}
        </span>
      )}
    </div>
  );
}
