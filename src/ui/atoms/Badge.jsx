import React from 'react';

const FONT = "'Open Sans', sans-serif";

// Status → colour map (CSS vars only — no hardcoded hex)
const STATUS_MAP = {
  Active:   { bg: 'var(--osmos-brand-green-muted)',    color: 'var(--osmos-brand-green)' },
  Inactive: { bg: 'var(--osmos-bg-subtle)',            color: 'var(--osmos-fg-muted)' },
  Paused:   { bg: 'var(--osmos-brand-amber-muted)',             color: 'var(--osmos-brand-amber)' },
  Live:     { bg: 'var(--osmos-brand-green-muted)',    color: 'var(--osmos-brand-green)' },
  Draft:    { bg: 'var(--osmos-brand-primary-muted)',  color: 'var(--osmos-brand-primary)' },
  Error:    { bg: 'var(--tag-bg-error)',                color: 'var(--tag-fg-error)' },
};

const BASE_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '3px 8px',
  borderRadius: 10,
  fontSize: 11,
  fontWeight: 600,
  fontFamily: FONT,
  whiteSpace: 'nowrap',
};

/**
 * Badge — coloured pill for status values.
 * status: 'Active' | 'Inactive' | 'Paused' | 'Live' | 'Draft' | 'Error'
 * showDot: boolean (default true) — renders a 6×6 filled circle before the label
 */
export function Badge({ status, children, showDot = true, style }) {
  const colours = STATUS_MAP[status] || STATUS_MAP[children] || { bg: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' };
  return (
    <span style={{ ...BASE_STYLE, background: colours.bg, color: colours.color, ...style }}>
      {showDot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: colours.color, flexShrink: 0,
        }} />
      )}
      {status || children}
    </span>
  );
}

/**
 * TypeBadge — coloured pill for arbitrary category types.
 * type: string key into colorMap
 * colorMap: { [type]: { bg, color } }
 * Falls back to gray if type not found in map.
 */
export function TypeBadge({ type, colorMap = {}, style }) {
  const colours = colorMap[type] || { bg: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' };
  return (
    <span style={{ ...BASE_STYLE, borderRadius: 6, background: colours.bg, color: colours.color, ...style }}>
      {type}
    </span>
  );
}
