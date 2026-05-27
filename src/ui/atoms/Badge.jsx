import { Badge as MorpheusBadge } from '@rishikeshjoshi-morpheus/ui';

const STATUS_TO_PALETTE = {
  Active:   'green',
  Inactive: 'gray',
  Paused:   'orange',
  Live:     'green',
  Draft:    'blue',
  Error:    'red',
};

export function Badge({ status, children, showDot, style }) {
  const label = status ?? children;
  const palette = STATUS_TO_PALETTE[label] ?? 'gray';
  return (
    <MorpheusBadge colorPalette={palette} variant="subtle" style={style}>
      {label}
    </MorpheusBadge>
  );
}

export function TypeBadge({ type, colorMap = {}, style }) {
  const colours = colorMap[type];
  if (colours) {
    return (
      <MorpheusBadge
        variant="subtle"
        style={{ background: colours.bg, color: colours.color, borderRadius: 6, ...style }}
      >
        {type}
      </MorpheusBadge>
    );
  }
  return (
    <MorpheusBadge colorPalette="gray" variant="subtle" style={{ borderRadius: 6, ...style }}>
      {type}
    </MorpheusBadge>
  );
}
