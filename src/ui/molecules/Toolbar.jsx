import React from 'react';

/**
 * Toolbar — flex row with left + right slots separated by a spacer.
 * Sits at the top of a white card, with a bottom border.
 * left: ReactNode  — count badge, search, tabs etc
 * right: ReactNode — action buttons
 * noBorder: boolean — omit the bottom border (e.g. inside a sub-section)
 */
export function Toolbar({ left, right, noBorder = false, style }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderBottom: noBorder ? 'none' : '1px solid var(--osmos-border)',
      flexWrap: 'wrap',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, flexWrap: 'wrap' }}>
        {left}
      </div>
      {right && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {right}
        </div>
      )}
    </div>
  );
}
