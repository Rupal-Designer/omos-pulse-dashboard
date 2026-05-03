/**
 * OsmosLogoMark — the brand mark: purple circle with white ring.
 * Used in nav headers across all portals.
 *
 * Props:
 *   size  number  — diameter in px (default 36)
 */
export function OsmosLogoMark({ size = 36 }) {
  const r  = size / 2;
  const rr = size * 0.28;   // ring radius  (~56% of total)
  const sw = size * 0.14;   // ring stroke  (~28% of ring r, visually balanced)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Background circle */}
      <circle cx={r} cy={r} r={r} fill="var(--osmos-brand-primary)" />
      {/* White ring */}
      <circle cx={r} cy={r} r={rr} stroke="#fff" strokeWidth={sw} />
    </svg>
  );
}
