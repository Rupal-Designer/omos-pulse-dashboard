import React from 'react';

const FONT = "'Open Sans', sans-serif";

const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  fontFamily: FONT,
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 6,
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.15s',
  textDecoration: 'none',
};

const VARIANTS = {
  primary: {
    background: 'var(--osmos-brand-primary)',
    color: '#fff',
    padding: '8px 18px',
    border: 'none',
  },
  outline: {
    background: 'var(--osmos-bg)',
    color: 'var(--osmos-fg-muted)',
    padding: '7px 14px',
    border: '1px solid var(--osmos-border)',
  },
  ghost: {
    background: 'none',
    color: 'var(--osmos-fg-muted)',
    padding: '7px 14px',
    border: 'none',
  },
  icon: {
    background: 'var(--osmos-bg)',
    color: 'var(--osmos-fg-muted)',
    padding: '6px',
    border: '1px solid var(--osmos-border)',
    borderRadius: 6,
  },
  link: {
    background: 'none',
    color: 'var(--osmos-brand-primary)',
    padding: '0',
    border: 'none',
    fontWeight: 600,
    fontSize: 13,
    textDecoration: 'underline',
    textUnderlineOffset: 2,
  },
};

const DISABLED = { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' };
const SM = { fontSize: 12, padding: '5px 12px' };

/**
 * Button atom.
 * variant: 'primary' | 'outline' | 'ghost' | 'icon' | 'link'
 * size: 'sm' | 'md' (default)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  style,
  type = 'button',
  title,
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyle = size === 'sm' ? SM : {};
  const disabledStyle = disabled ? DISABLED : {};

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{ ...BASE, ...variantStyle, ...sizeStyle, ...disabledStyle, ...style }}
    >
      {children}
    </button>
  );
}
