import React, { useState } from 'react';
import { Icon, InfoIcon, SearchIcon, DownloadIcon, ChevronDownIcon } from '../../ui/atoms/Icon';

function SortIcon() {
  return (
    <Icon size={11} color="var(--osmos-fg-subtle)" strokeWidth={2}>
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </Icon>
  );
}

function ChevronDown({ size = 11, color = '#888' }) {
  return <ChevronDownIcon size={size} color={color} strokeWidth={2.5} />;
}

/* ── Table section card ────────────────────────────────────────── */
export function TableCard({ icon, title, searchPlaceholder, children, footerLeft, footerRight }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--osmos-border)', overflow: 'hidden', marginBottom: 20 }}>
      {/* Card header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--osmos-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, background: 'var(--osmos-bg-muted)', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {icon}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>{title}</span>
          <InfoIcon />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* columns button */}
          <button aria-label="Toggle visible columns" style={{
            height: 36, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5,
            background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6,
            cursor: 'pointer', fontSize: 11, color: 'var(--osmos-fg-muted)', fontFamily: 'inherit',
            transition: 'background 0.12s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
              <line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
            <ChevronDown size={10} />
          </button>
          {/* search */}
          <div style={{
            height: 36, padding: '0 10px',
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid var(--osmos-border)', borderRadius: 6, background: '#fff',
          }}>
            <SearchIcon />
            <input placeholder={searchPlaceholder || 'Search…'} aria-label={searchPlaceholder || 'Search'} style={{
              border: 'none', outline: 'none', fontSize: 11, color: 'var(--osmos-fg)',
              fontFamily: 'inherit', width: 120, background: 'transparent',
            }} />
          </div>
          <button aria-label="Download table data" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Add filter row */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--osmos-border)' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, color: 'var(--osmos-brand-primary)', fontFamily: 'inherit', padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-brand-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add a Filter
        </button>
      </div>

      {/* Table */}
      {children}

      {/* Footer */}
      {(footerLeft || footerRight) && (
        <div style={{
          padding: '8px 16px', background: 'var(--osmos-bg-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 10, color: 'var(--osmos-fg-subtle)',
        }}>
          <span>{footerLeft || ''}</span>
          <span>{footerRight || ''}</span>
        </div>
      )}
    </div>
  );
}

/* ── Generic data table ────────────────────────────────────────── */
export function DataTable({ columns, rows, totals }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: 'var(--osmos-bg-muted)', borderBottom: '1px solid var(--osmos-border)' }}>
            {columns.map((col, i) => (
              <th key={i}
                aria-sort={col.sort ? 'none' : undefined}
                scope="col"
                style={{
                  padding: '10px 20px',
                  textAlign: i === 0 ? 'left' : 'right',
                  fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11,
                  whiteSpace: 'nowrap',
                  cursor: col.sort ? 'pointer' : 'default',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: i === 0 ? 'flex-start' : 'flex-end' }}>
                  {col.label}
                  {col.info && <InfoIcon />}
                  {col.sort && <SortIcon />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{
              borderBottom: '1px solid var(--osmos-border)',
              background: ri % 2 === 0 ? '#fff' : 'var(--osmos-bg-muted)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
              onMouseLeave={e => e.currentTarget.style.background = ri % 2 === 0 ? '#fff' : 'var(--osmos-bg-muted)'}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 20px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  color: ci === 1 ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg)',
                  fontWeight: ci === 1 ? 600 : 400,
                }}>
                  {cell === '-' ? <span style={{ color: '#CCC' }}>-</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {totals && (
          <tfoot>
            <tr style={{ borderTop: '2px solid var(--osmos-border)', background: 'var(--osmos-bg-muted)' }}>
              {totals.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 20px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  fontWeight: 700, color: 'var(--osmos-fg)', fontSize: 12,
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
