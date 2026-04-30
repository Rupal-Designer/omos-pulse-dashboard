import React from 'react';

const FONT = "'Open Sans', sans-serif";

const COLOR_SCHEMES = {
  green: {
    background: 'var(--tag-bg-success)',
    color:      'var(--tag-fg-success)',
    border:     '1px solid var(--alert-success-lighter)',
  },
  amber: {
    background: 'var(--tag-bg-warning)',
    color:      'var(--tag-fg-warning)',
    border:     '1px solid var(--alert-warning-lighter)',
  },
  blue: {
    background: 'var(--tag-bg-linked)',
    color:      'var(--tag-fg-linked)',
    border:     '1px solid var(--primary-tint-1)',
  },
  gray: {
    background: 'var(--surface-2)',
    color:      'var(--text-muted)',
    border:     '1px solid var(--border)',
  },
  red: {
    background: 'var(--tag-bg-error)',
    color:      'var(--tag-fg-error)',
    border:     '1px solid var(--alert-error-lighter)',
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
