import { PlusIcon } from '../atoms/Icon';

const FONT     = "'Open Sans', sans-serif";
const TEXT_MID = 'var(--osmos-fg-muted)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';

/**
 * EmptyState — centred icon + message + optional action.
 *
 * icon:      ReactNode  — icon placed inside the circle (default: PlusIcon)
 * message:   string     — descriptive text below the icon
 * children:  ReactNode  — optional CTA buttons rendered below the message
 * iconBg:    string     — circle background (default: brand-primary-muted)
 * iconColor: string     — icon color when using the default PlusIcon
 * paddingY:  number     — vertical padding of the container (default: 80)
 */
export function EmptyState({
  icon,
  message,
  children,
  iconBg    = ACCENT_M,
  iconColor = ACCENT,
  paddingY  = 80,
}) {
  const defaultIcon = <PlusIcon size={24} color={iconColor} />;

  return (
    <div style={{
      padding: `${paddingY}px 0`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 12, fontFamily: FONT,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        backgroundColor: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon ?? defaultIcon}
      </div>

      {message && (
        <p style={{ margin: 0, fontSize: 13, color: TEXT_MID, textAlign: 'center', maxWidth: 320 }}>
          {message}
        </p>
      )}

      {children && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {children}
        </div>
      )}
    </div>
  );
}
