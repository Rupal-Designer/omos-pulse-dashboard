import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, DownloadIcon, ChevronDownIcon } from '../../../ui/atoms/Icon';
import { Checkbox } from '../../../ui/atoms/Checkbox';

// ── Column visibility dropdown ────────────────────────────────────────────────
function ColumnVisibilityMenu({ table }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cols = table.getAllLeafColumns().filter(c => c.id !== 'select');
  const getLabel = (col) => {
    if (typeof col.columnDef.header === 'string') return col.columnDef.header;
    return col.columnDef.meta?.label ?? col.id;
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle visible columns"
        style={{
          height: 36, padding: '0 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
          borderRadius: 6, cursor: 'pointer',
          fontSize: 11, color: 'var(--osmos-fg-muted)', fontFamily: 'inherit',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
        <ChevronDownIcon size={10} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', right: 0,
          background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
          borderRadius: 8, padding: '6px 0', zIndex: 100, minWidth: 190,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
          {cols.map(col => (
            <div
              key={col.id}
              onClick={() => col.toggleVisibility()}
              style={{
                padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'pointer', fontSize: 12, color: 'var(--osmos-fg)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Checkbox checked={col.getIsVisible()} onChange={() => {}} />
              <span>{getLabel(col)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab switcher (for GeoTable-style country/city views) ─────────────────────
function TabSwitcher({ tabs, activeTab, onTabChange }) {
  return (
    <div style={{
      display: 'inline-flex', background: '#EAF1F4', borderRadius: 8, padding: 3, marginBottom: 12,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          style={{
            padding: '5px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
            fontSize: 12, fontFamily: 'inherit',
            fontWeight: activeTab === tab.value ? 600 : 400,
            background: activeTab === tab.value ? 'var(--osmos-bg)' : 'transparent',
            color: activeTab === tab.value ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
            boxShadow: activeTab === tab.value ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── TableCard ─────────────────────────────────────────────────────────────────
/**
 * TableCard — card container for DataTable. Provides header with title, search,
 * column visibility toggle, download, optional tabs, and a filter row.
 *
 * @param {ReactNode}  props.icon             - Icon shown in card header
 * @param {string}     props.title            - Card title
 * @param {string}     props.searchPlaceholder
 * @param {object}     props.table            - TanStack table instance (enables column visibility)
 * @param {string}     props.globalFilter     - Controlled search value
 * @param {Function}   props.onSearch         - Called on search input change; omit to hide search bar
 * @param {Array}      props.tabs             - [{ value, label }] for tab-switching views (e.g. country/city)
 * @param {string}     props.activeTab        - Currently active tab value
 * @param {Function}   props.onTabChange      - Called when tab changes
 * @param {string}     props.footerLeft       - Optional card footer left text
 * @param {string}     props.footerRight      - Optional card footer right text
 */
export function TableCard({
  icon,
  title,
  searchPlaceholder,
  children,
  footerLeft,
  footerRight,
  table,
  globalFilter = '',
  onSearch,
  tabs,
  activeTab,
  onTabChange,
}) {
  return (
    <div style={{
      background: 'var(--osmos-bg)',
      borderRadius: 8,
      border: '1px solid var(--osmos-border)',
      overflow: 'hidden',
      marginBottom: 20,
    }}>

      {/* ── Card header ── */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--osmos-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && (
            <div style={{
              width: 28, height: 28, background: 'var(--osmos-bg-muted)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {icon}
            </div>
          )}
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>{title}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {table && <ColumnVisibilityMenu table={table} />}

          {onSearch !== undefined && (
            <div style={{
              height: 36, padding: '0 10px',
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--osmos-border)', borderRadius: 6, background: 'var(--osmos-bg)',
            }}>
              <SearchIcon size={13} />
              <input
                placeholder={searchPlaceholder || 'Search…'}
                value={globalFilter}
                onChange={e => onSearch(e.target.value)}
                aria-label={searchPlaceholder || 'Search'}
                style={{
                  border: 'none', outline: 'none', fontSize: 11,
                  color: 'var(--osmos-fg)', fontFamily: 'inherit',
                  width: 120, background: 'transparent',
                }}
              />
            </div>
          )}

          <button
            aria-label="Download table data"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
          >
            <DownloadIcon size={14} />
          </button>
        </div>
      </div>

      {/* ── Optional tab switcher ── */}
      {tabs && tabs.length > 0 && (
        <div style={{ padding: '12px 20px 0', borderBottom: '1px solid var(--osmos-border)' }}>
          <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      )}

      {/* ── Filter trigger row ── */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--osmos-border)' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, color: 'var(--osmos-brand-primary)', fontFamily: 'inherit', padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--osmos-brand-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add a Filter
        </button>
      </div>

      {/* ── Table content ── */}
      {children}

      {/* ── Card footer ── */}
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
