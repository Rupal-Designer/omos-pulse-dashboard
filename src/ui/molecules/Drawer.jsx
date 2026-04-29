import React from 'react';
import { CloseIcon } from '../atoms/Icon';

const FONT = "'Open Sans', sans-serif";

/**
 * Drawer — right-side overlay panel.
 * open: boolean
 * onClose: () => void  (called on overlay click or X button)
 * title: string
 * children: ReactNode  (scrollable body content)
 * footer: ReactNode    (optional sticky footer — Cancel/Save buttons etc)
 * width: number (default 480)
 */
export function Drawer({ open, onClose, title, children, footer, width = 480 }) {
  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 800,
        }}
      />
      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width,
        background: 'var(--osmos-bg)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        zIndex: 801,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--osmos-border)',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'none', cursor: 'pointer',
              padding: 4, display: 'flex', alignItems: 'center',
              color: 'var(--osmos-fg-muted)',
            }}
          >
            <CloseIcon size={16} />
          </button>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--osmos-border)',
            flexShrink: 0,
            display: 'flex', gap: 10, justifyContent: 'flex-end',
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
