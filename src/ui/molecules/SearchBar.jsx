import React from 'react';
import { SearchIcon } from '../atoms/Icon';

const FONT = "'Open Sans', sans-serif";

/**
 * SearchBar — magnifier icon + controlled text input.
 * value, onChange, placeholder, width (default 200)
 */
export function SearchBar({ value, onChange, placeholder = 'Search...', width = 200, style }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: '1px solid var(--osmos-border)',
      borderRadius: 6,
      padding: '6px 10px',
      background: 'var(--osmos-bg)',
      width,
      ...style,
    }}>
      <SearchIcon size={14} color="var(--osmos-fg-subtle)" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          border: 'none',
          outline: 'none',
          fontFamily: FONT,
          fontSize: 12,
          color: 'var(--osmos-fg)',
          background: 'transparent',
          flex: 1,
          minWidth: 0,
        }}
      />
    </div>
  );
}
