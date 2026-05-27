import { Switch } from '@rishikeshjoshi-morpheus/ui';

/**
 * Toggle / Switch — boolean on/off control.
 * Figma node: 925:30922  (Figma name: "Toggle & Switch")
 *
 * Usage:
 *   <Toggle checked={val} onCheckedChange={setVal} label="Enable feature" />
 */
export function Toggle({ checked, onCheckedChange, disabled = false, label, size = 'md', style }) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={(e) => onCheckedChange?.(e.checked)}
      disabled={disabled}
      size={size}
      style={style}
    >
      {label && <Switch.Label>{label}</Switch.Label>}
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.HiddenInput />
    </Switch>
  );
}
