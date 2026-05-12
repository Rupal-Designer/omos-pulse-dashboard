import React from 'react';
import { flexRender } from '@tanstack/react-table';

// ── Sort indicator ────────────────────────────────────────────────────────────
function SortIndicator({ direction }) {
  if (!direction) {
    return <span style={{ fontSize: 9, color: 'var(--osmos-fg-subtle)', opacity: 0.35 }}>↕</span>;
  }
  return (
    <span style={{ fontSize: 9, color: 'var(--osmos-brand-primary)', fontWeight: 700 }}>
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );
}

// ── Pagination bar ────────────────────────────────────────────────────────────
function PaginationBar({ table }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
      padding: '10px 12px', borderTop: '1px solid var(--osmos-border)',
    }}>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        style={{ ...PAGE_BTN, opacity: table.getCanPreviousPage() ? 1 : 0.4 }}
      >
        ← Prev
      </button>
      <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        style={{ ...PAGE_BTN, opacity: table.getCanNextPage() ? 1 : 0.4 }}
      >
        Next →
      </button>
    </div>
  );
}

const PAGE_BTN = {
  padding: '4px 10px', fontSize: 11,
  border: '1px solid var(--osmos-border)', borderRadius: 6,
  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', cursor: 'pointer',
};

// ── ColHeader helper — re-exported for callers to build info-icon column headers
export function ColHeader({ label, info = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {label}
      {info && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )}
    </div>
  );
}

// ── DataTable ─────────────────────────────────────────────────────────────────
/**
 * DataTable — renders a TanStack table instance using Osmos design tokens.
 *
 * @param {object}  props.table     - TanStack table instance from useOsmosTable()
 * @param {object}  props.features  - { paginate } — controls which chrome renders
 * @param {Array}   props.footer    - Optional static footer row values (one per column)
 * @param {string}  props.className
 */
export function DataTable({ table, features = {}, footer, className = '' }) {
  return (
    <div style={{ overflowX: 'auto' }} className={className}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              style={{
                background: 'var(--osmos-bg-muted)',
                borderBottom: '1px solid var(--osmos-border)',
              }}
            >
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: 'var(--osmos-fg-muted)',
                    fontSize: 11,
                    whiteSpace: 'nowrap',
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {!header.isPlaceholder && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <SortIndicator direction={header.column.getIsSorted()} />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, ri) => (
            <tr
              key={row.id}
              style={{
                borderBottom: '1px solid var(--osmos-border)',
                background: ri % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-muted)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ri % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-muted)'; }}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{ padding: '10px 12px', fontSize: 13, color: 'var(--osmos-fg)' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {footer && footer.length > 0 && (
          <tfoot>
            <tr style={{ borderTop: '2px solid var(--osmos-border)', background: 'var(--osmos-bg-muted)' }}>
              {footer.map((cell, ci) => (
                <td
                  key={ci}
                  style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--osmos-fg)', fontSize: 12 }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>

      {features.paginate && <PaginationBar table={table} />}
    </div>
  );
}
