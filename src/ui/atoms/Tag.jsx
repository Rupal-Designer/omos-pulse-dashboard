import { Tag as MorpheusTag } from '@rishikeshjoshi-morpheus/ui';

const SCHEME_TO_PALETTE = {
  green: 'green',
  amber: 'orange',
  blue:  'blue',
  gray:  'gray',
  red:   'red',
};

export function Tag({ children, colorScheme = 'gray', style }) {
  return (
    <MorpheusTag
      colorPalette={SCHEME_TO_PALETTE[colorScheme] ?? 'gray'}
      variant="subtle"
      style={style}
    >
      {children}
    </MorpheusTag>
  );
}
