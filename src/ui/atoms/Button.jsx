import { Button as MorpheusButton } from '@rishikeshjoshi-morpheus/ui';

// ── Design-system color overrides ────────────────────────────────────────────
// Chakra resolves colorPalette="blue" → --osmos-colors-blue-* vars.
// The morpheus theme ships blue.600 = #2563eb, but our Figma spec calls for
// --primary (#1970e1).  Override the blue palette vars on the element so the
// full Chakra recipe (default, hover/90%, disabled) resolves to our values.
// Hover is handled automatically: Chakra uses colorPalette.solid/90 → #1970e1 @ 90%
const BLUE_PALETTE = {
  '--osmos-colors-blue-solid':    'var(--primary)',      /* #1970e1 — solid bg  */
  '--osmos-colors-blue-contrast': '#ffffff',             /* text on solid        */
  '--osmos-colors-blue-fg':       'var(--primary)',      /* outline/ghost text   */
  '--osmos-colors-blue-subtle':   'var(--primary-bg)',   /* ghost/outline hover  */
  '--osmos-colors-blue-muted':    'var(--primary-bg)',   /* active press bg      */
  '--osmos-colors-blue-border':   'var(--primary)',      /* outline border       */
};

// ── Horizontal padding override ───────────────────────────────────────────────
// Chakra md=16px, sm=14px — both too wide for our compact product UI.
// Design system spec (token CSV "ONLY DS Spacing"): Medium=12px, Small=8px.
const SIZE_PADDING = {
  sm: { paddingInline: '8px'  },
  md: { paddingInline: '12px' },
};

const VARIANT_MAP = {
  primary: 'solid',
  outline: 'outline',
  ghost:   'ghost',
  icon:    'outline',
  link:    'plain',
};

const SIZE_MAP = { sm: 'sm', md: 'md' };

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  style,
  type = 'button',
  title,
  ...rest
}) {
  return (
    <MorpheusButton
      colorPalette="blue"
      variant={VARIANT_MAP[variant] ?? 'solid'}
      size={SIZE_MAP[size] ?? 'md'}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{ ...BLUE_PALETTE, ...(SIZE_PADDING[size] ?? SIZE_PADDING.md), ...style }}
      {...rest}
    >
      {children}
    </MorpheusButton>
  );
}
