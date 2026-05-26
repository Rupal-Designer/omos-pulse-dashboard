import { Switch } from '@rishikeshjoshi-morpheus/ui';

/**
 * Toggle / Switch — boolean on/off control.
 * Figma node: 925:30922  (Figma name: "Toggle & Switch")
 *
 * WCAG 4.1.2 — role + aria-checked:
 *   The Morpheus Switch is built on Ark UI's Switch primitive, which renders a
 *   <button role="switch" aria-checked={checked} aria-disabled={disabled}>
 *   automatically on Switch.Control. No manual role/aria-checked needed here.
 *
 *   aria-label association:
 *   - When `label` is provided, Switch.Label is rendered and Ark UI links it to
 *     the control via aria-labelledby automatically.
 *   - When no `label` is provided, callers MUST pass `aria-label` via the
 *     `aria-label` prop (forwarded to the root element by Morpheus Switch).
 *
 * Usage:
 *   <Toggle checked={val} onCheckedChange={setVal} label="Enable feature" />
 *   // icon-only usage — supply aria-label:
 *   <Toggle checked={val} onCheckedChange={setVal} aria-label="Enable notifications" />
 */
export function Toggle({ checked, onCheckedChange, disabled = false, label, size = 'md', style, 'aria-label': ariaLabel }) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={(e) => onCheckedChange?.(e.checked)}
      disabled={disabled}
      size={size}
      style={style}
      // aria-label forwarded for unlabeled (icon-only) usages — WCAG 4.1.2
      aria-label={!label ? ariaLabel : undefined}
    >
      {label && <Switch.Label>{label}</Switch.Label>}
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.HiddenInput />
    </Switch>
  );
}
