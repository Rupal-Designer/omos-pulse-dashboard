import React, { useState, useCallback } from 'react';

const FONT = "'Open Sans', sans-serif";

/**
 * Toast — fixed notification that auto-dismisses.
 * visible: boolean
 * message: string
 * type: 'success' | 'error' | 'info' (default: 'success')
 */
export function Toast({ visible, message, type = 'success' }) {
  if (!visible) return null;

  const BG = {
    success: 'var(--alert-success-primary)',
    error:   'var(--alert-error-primary)',
    info:    'var(--brand-primary)',
  }[type] || 'var(--alert-success-primary)';

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 9999,
      background: BG,
      color: '#fff',
      padding: '10px 18px',
      borderRadius: 8,
      fontFamily: FONT,
      fontSize: 13,
      fontWeight: 500,
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      maxWidth: 380,
      pointerEvents: 'none',
    }}>
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {type === 'success'
          ? <polyline points="20 6 9 17 4 12" />
          : type === 'error'
          ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
          : <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
        }
      </svg>
      {message}
    </div>
  );
}

/**
 * useToast — hook that manages toast state.
 * Returns: { toast, showToast(message, type, durationMs) }
 *
 * Usage:
 *   const { toast, showToast } = useToast();
 *   <Toast {...toast} />
 *   <button onClick={() => showToast('Saved!')}>Save</button>
 */
export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), duration);
  }, []);

  return { toast, showToast };
}
