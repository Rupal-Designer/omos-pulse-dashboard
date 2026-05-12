import { Checkbox as MorpheusCheckbox } from '@rishikeshjoshi-morpheus/ui';

export function Checkbox({ checked, onChange, label, disabled = false, style }) {
  return (
    <MorpheusCheckbox
      checked={checked}
      onCheckedChange={() => onChange?.()}
      disabled={disabled}
      label={label}
      style={style}
    />
  );
}
