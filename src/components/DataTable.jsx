import React, { useState } from 'react';

/* ── shared atoms ──────────────────────────────────────────────── */
function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function ChevronDown({ size = 11, color = '#888' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

/* ── Table section card ────────────────────────────────────────── */
export function TableCard({ icon, title, searchPlaceholder, children, footerLeft, footerRight }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #F0F0F0', overflow: 'hidden', marginBottom: 20 }}>
      {/* Card header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #F5F5F5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, background: '#F0F4FF', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {icon}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{title}</span>
          <InfoIcon />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* columns button */}
          <button style={{
            height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5,
            background: '#fff', border: '1px solid #E0E0E0', borderRadius: 6,
            cursor: 'pointer', fontSize: 11, color: '#555', fontFamily: 'inherit',
          }}>
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
            height: 32, padding: '0 10px',
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid #E0E0E0', borderRadius: 6, background: '#fff',
          }}>
            <SearchIcon />
            <input placeholder={searchPlaceholder || 'Search…'} style={{
              border: 'none', outline: 'none', fontSize: 11, color: '#333',
              fontFamily: 'inherit', width: 120, background: 'transparent',
            }} />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Add filter row */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #F5F5F5' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, color: '#5B6EF5', fontFamily: 'inherit', padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#5B6EF5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          padding: '8px 16px', background: '#F6FBFF',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 10, color: '#999',
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
          <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #F0F0F0' }}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '10px 20px',
                textAlign: i === 0 ? 'left' : 'right',
                fontWeight: 500, color: '#888', fontSize: 11,
                whiteSpace: 'nowrap',
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
              borderBottom: '1px solid #F8F8F8',
              background: ri % 2 === 0 ? '#fff' : '#FAFCFF',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F5F8FF'}
              onMouseLeave={e => e.currentTarget.style.background = ri % 2 === 0 ? '#fff' : '#FAFCFF'}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 20px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  color: ci === 1 ? '#5B6EF5' : '#333',
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
            <tr style={{ borderTop: '2px solid #F0F0F0', background: '#FAFAFA' }}>
              {totals.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 20px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  fontWeight: 700, color: '#222', fontSize: 12,
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
