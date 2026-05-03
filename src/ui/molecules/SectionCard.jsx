const FONT     = "'Open Sans', sans-serif";
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const BORDER   = 'var(--osmos-border)';
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';

/**
 * SectionCard — white card with an optional labeled header bar + body.
 *
 * title:       string     — section label in the header bar (omit to hide header)
 * titleRight:  ReactNode  — optional right-side content in the header (badges, buttons)
 * headerSize:  'sm'|'md'  — 'sm' = 13px muted label (default), 'md' = 14px bold dark label
 * bodyBg:      string     — body background (default: bg-subtle for form area feel)
 * bodyPad:     number     — body padding in px (default: 16)
 * children:    ReactNode  — body content
 * style:       object     — styles applied to the outer card wrapper
 */
export function SectionCard({
  title,
  titleRight,
  headerSize = 'sm',
  bodyBg     = BG_SUB,
  bodyPad    = 16,
  children,
  style,
}) {
  const headerLabel = headerSize === 'md'
    ? { fontSize: 14, fontWeight: 600, color: TEXT }
    : { fontSize: 13, fontWeight: 500, color: TEXT_MID };

  return (
    <div style={{
      border: `1px solid ${BORDER}`,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: BG,
      fontFamily: FONT,
      ...style,
    }}>
      {title !== undefined && (
        <div style={{
          padding: '10px 16px',
          borderBottom: `1px solid ${BORDER}`,
          backgroundColor: BG,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={headerLabel}>{title}</span>
          {titleRight && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{titleRight}</div>}
        </div>
      )}

      <div style={{ padding: bodyPad, backgroundColor: bodyBg }}>
        {children}
      </div>
    </div>
  );
}
