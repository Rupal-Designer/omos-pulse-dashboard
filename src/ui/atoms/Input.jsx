import React, { useState } from 'react';

const FONT = "'Open Sans', sans-serif";

const baseInputStyle = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid var(--osmos-border)',
  borderRadius: 6,
  fontSize: 13,
  fontFamily: FONT,
  color: 'var(--osmos-fg)',
  background: 'var(--osmos-bg)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--osmos-fg)',
  marginBottom: 5,
  fontFamily: FONT,
};

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
  const [focused, setFocused] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/[\s*]+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...baseInputStyle,
          borderColor: focused ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          ...inputStyle,
        }}
      />
    </div>
  );
}

export function Select({
  value,
  onChange,
  options = [],
  label,
  disabled = false,
  required = false,
  style,
  id,
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/[\s*]+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <select
        id={inputId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={{
          ...baseInputStyle,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          appearance: 'auto',
        }}
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
