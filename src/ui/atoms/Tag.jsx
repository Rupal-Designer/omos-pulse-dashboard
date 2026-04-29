import React from 'react';

const FONT = "'Open Sans', sans-serif";

const COLOR_SCHEMES = {
  green: {
    background: 'rgba(27, 168, 122, 0.10)',
    color: 'var(--osmos-brand-green)',
    border: '1px solid rgba(27, 168, 122, 0.30)',
  },
  amber: {
    background: 'rgba(245, 166, 35, 0.10)',
    color: 'var(--osmos-brand-amber)',
    border: '1px solid rgba(245, 166, 35, 0.30)',
  },
  blue: {
    background: 'var(--osmos-brand-primary-muted)',
    color: 'var(--osmos-brand-primary)',
    border: '1px solid rgba(99, 108, 255, 0.30)',
  },
  gray: {
    background: 'var(--osmos-bg-subtle)',
    color: 'var(--osmos-fg-muted)',
    border: '1px solid var(--osmos-border)',
  },
  red: {
    background: 'rgba(239, 68, 68, 0.10)',
    color: '#EF4444',
    border: '1px solid rgba(239, 68, 68, 0.30)',
  },
};

/**
 * Tag — coloured chip for labels/categories.
 * colorScheme: 'green' | 'amber' | 'blue' | 'gray' | 'red'
 */
export function Tag({ children, colorScheme = 'gray', style }) {
  const colours = COLOR_SCHEMES[colorScheme] || COLOR_SCHEMES.gray;
  return (
    <span style={{
      ...colours,
      padding: '4px 10px',
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: FONT,
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  );
}
