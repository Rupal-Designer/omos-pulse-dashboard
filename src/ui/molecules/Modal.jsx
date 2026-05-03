import { CloseIcon } from '../atoms/Icon';

const FONT    = "'Open Sans', sans-serif";
const BG      = 'var(--osmos-bg)';
const BORDER  = 'var(--osmos-border)';
const TEXT    = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';

/**
 * Modal — centred overlay dialog.
 *
 * open:      boolean
 * onClose:   () => void
 * title:     string
 * children:  ReactNode  — scrollable body content
 * footer:    ReactNode  — sticky footer (Cancel/Save etc)
 * maxWidth:  number     — default 640
 * zIndex:    number     — default 200
 */
export function Modal({ open, onClose, title, children, footer, maxWidth = 640, zIndex = 200 }) {
  if (!open) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex }}
      />

      {/* Dialog */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex + 1,
        width: '100%', maxWidth,
        maxHeight: '80vh',
        backgroundColor: BG,
        borderRadius: 12,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        fontFamily: FONT,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>{title}</span>
          <button
            onClick={onClose}
            style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--osmos-bg-subtle)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CloseIcon size={18} color={TEXT_MID} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '12px 20px', borderTop: `1px solid ${BORDER}`,
            flexShrink: 0, display: 'flex', gap: 8, justifyContent: 'flex-end',
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
