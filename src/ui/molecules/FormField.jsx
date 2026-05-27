/**
 * FormField — label + input + hint/error wrapper.
 *
 * Replaces the locally-duplicated `fieldLabel`, `hint`, `field` style objects
 * that appear in 15+ drawer files. Children receive a red border automatically
 * when `error` is set.
 *
 * Usage:
 *   <FormField label="Store ID" required hint="Enter your store identifier">
 *     <Input value={val} onChange={setVal} />
 *   </FormField>
 */
export function FormField({ label, required, hint, error, children, style }) {
  return (
    <div style={{ marginBottom: 18, ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--osmos-fg-muted)',
          marginBottom: 4,
        }}>
          {label}
          {required && (
            <span style={{ color: 'var(--osmos-colors-red-500, #ef4444)', marginLeft: 2 }}>*</span>
          )}
        </label>
      )}

      {/* Inject error border onto child inputs via a wrapper */}
      <div style={error ? { outline: '1px solid var(--osmos-colors-red-500, #ef4444)', borderRadius: 6 } : undefined}>
        {children}
      </div>

      {error && (
        <span style={{
          display: 'block',
          fontSize: 11,
          color: 'var(--osmos-colors-red-500, #ef4444)',
          marginTop: 3,
        }}>
          {error}
        </span>
      )}

      {hint && !error && (
        <span style={{
          display: 'block',
          fontSize: 11,
          color: 'var(--osmos-fg-subtle)',
          marginTop: 3,
        }}>
          {hint}
        </span>
      )}
    </div>
  );
}
