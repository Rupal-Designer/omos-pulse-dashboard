import { Spinner } from '@rishikeshjoshi-morpheus/ui';

/**
 * SpinLoader — animated spinner for loading states.
 * Figma node: 5664:34408
 *
 * Usage:
 *   <SpinLoader />
 *   <SpinLoader size="lg" withBg />
 */
const SIZE_MAP = { xs: '16px', sm: '20px', md: '24px', lg: '32px', xl: '48px' };

export function SpinLoader({ size = 'md', withBg = false, style }) {
  const diameter = SIZE_MAP[size] ?? SIZE_MAP.md;

  const spinner = (
    <Spinner
      style={{ width: diameter, height: diameter, ...(!withBg ? style : undefined) }}
    />
  );

  if (!withBg) return spinner;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 10px',
      background: 'var(--osmos-bg-subtle)',
      borderRadius: 20,
      ...style,
    }}>
      {spinner}
    </span>
  );
}
