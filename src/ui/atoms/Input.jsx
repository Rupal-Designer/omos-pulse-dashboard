import React from 'react';

const FONT = "'Open Sans', sans-serif";

const BASE_INPUT = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid var(--osmos-border)',
  borderRadius: 6,
  fontSize: 13,
  fontFamily: FONT,
  color: 'var(--osmos-fg)',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'var(--osmos-bg)',
};

const LABEL_STYLE = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--osmos-fg-muted)',
  marginBottom: 4,
  fontFamily: FONT,
};

/**
 * Input atom.
 * label: optional string rendered above the input
 * type: 'text' | 'email' | 'number' | 'password' etc
 * inputStyle: extra style overrides applied to the <input> element
 */
export function Input({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  disabled = false,
  required = false,
  inputStyle,
  style,
  id,
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label htmlFor={inputId} style={LABEL_STYLE}>
          {label}{required && <span style={{ color: 'var(--osmos-brand-primary)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{ ...BASE_INPUT, ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}), ...inputStyle }}
      />
    </div>
  );
}

/**
 * Select atom — same visual as Input but renders a <select>.
 */
export function Select({ value, onChange, options = [], label, disabled = false, required = false, style, id }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label htmlFor={inputId} style={LABEL_STYLE}>
          {label}{required && <span style={{ color: 'var(--osmos-brand-primary)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <select
        id={inputId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{ ...BASE_INPUT, cursor: 'pointer', ...(disabled ? { opacity: 0.5 } : {}) }}
      >
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
