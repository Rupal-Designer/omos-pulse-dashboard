import React, { useState } from 'react';
import { SearchIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon, TrashIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Toast, useToast } from '../../ui/atoms/Toast';

const PAGES = [
  { id: 1, pageName: 'Copy of TestQA588', apiId: 'home_pg', audience: 'Everyone', status: 'Active', tags: ['Highest Shopper'] },
  { id: 2, pageName: 'TestQA588',          apiId: 'home_pg', audience: 'Everyone', status: 'Active', tags: ['No Spends in last 30 days'] },
  { id: 3, pageName: 'Copy of TestQA462',  apiId: '—',       audience: 'Everyone', status: 'Active', tags: [] },
  { id: 4, pageName: 'TestQA462',          apiId: '—',       audience: 'Everyone', status: 'Active', tags: ['Low Attributed GMV in Last 30 day..'] },
  { id: 5, pageName: 'Copy of TestQA541',  apiId: '—',       audience: 'Everyone', status: 'Active', tags: [] },
  { id: 6, pageName: 'TestQA541',          apiId: '—',       audience: 'Everyone', status: 'Active', tags: [] },
  { id: 7, pageName: 'Copy of TestQA380',  apiId: '—',       audience: 'Everyone', status: 'Active', tags: [] },
  { id: 8, pageName: 'TestQA380',          apiId: '—',       audience: 'Everyone', status: 'Active', tags: [] },
];

const TAG_STYLES = {
  'Highest Shopper': {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--osmos-brand-green)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  'No Spends in last 30 days': {
    background: 'rgba(245, 158, 11, 0.1)',
    color: 'var(--osmos-brand-amber)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  'Low Attributed GMV in Last 30 day..': {
    background: 'rgba(245, 158, 11, 0.1)',
    color: 'var(--osmos-brand-amber)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
};

const PAGE_SIZE = 8;

const TH = {
  textAlign: 'left', padding: '10px 16px', fontSize: '12px', fontWeight: '600',
  color: 'var(--osmos-fg-muted)', background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap',
};
const TD = {
  padding: '11px 16px', fontSize: '13px', color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)', verticalAlign: 'middle',
};
const TD_MUTED = { ...TD, color: 'var(--osmos-fg-muted)' };
const STATUS_PILL = {
  display: 'inline-block',
  background: 'rgba(16, 185, 129, 0.1)',
  color: 'var(--osmos-brand-green)',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  borderRadius: '20px', padding: '2px 10px', fontSize: '12px', fontWeight: '600',
};
const CODE_STYLE = {
  background: 'var(--osmos-bg-subtle)',
  border: '1px solid var(--osmos-border)',
  borderRadius: '4px', padding: '2px 6px', fontSize: '12px',
  color: 'var(--osmos-fg-muted)', fontFamily: 'monospace',
};

function pageBtn(active, disabled) {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '28px', height: '28px', borderRadius: '5px',
    border: '1px solid var(--osmos-border)',
    background: active ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
    color: active ? '#fff' : disabled ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '12px', fontWeight: '600',
    fontFamily: "'Open Sans', sans-serif",
    opacity: disabled ? 0.5 : 1,
  };
}

export default function SponsoredAdsInventoryPage() {
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(1);
  const [hoveredAction, setHoveredAction] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = PAGES.filter((p) =>
    p.pageName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function actionBtnStyle(id, action) {
    const hovered = hoveredAction === `${id}-${action}`;
    return {
      background: 'none', border: 'none', padding: '4px', cursor: 'pointer',
      color: hovered ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
      display: 'flex', alignItems: 'center', borderRadius: '4px', transition: 'color 0.12s',
    };
  }

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", padding: '20px 24px', background: 'var(--osmos-bg)', minHeight: '100vh', color: 'var(--osmos-fg)' }}>
      <Toast {...toast} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: '10px', overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderBottom: '1px solid var(--osmos-border)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--osmos-fg)' }}>Pages</span>
            <span style={{ background: 'var(--osmos-brand-primary)', color: '#fff', borderRadius: '20px', padding: '1px 9px', fontSize: '12px', fontWeight: '700' }}>8</span>
          </div>

          <span style={{ background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', border: '1px solid var(--osmos-brand-primary)', borderRadius: '20px', padding: '4px 12px', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'default' }}>
            Segment (13)
          </span>

          <div style={{ flex: 1 }} />

          <div style={{ position: 'relative', flex: '1', maxWidth: '280px', minWidth: '160px' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={14} color="var(--osmos-fg-muted)" />
            </span>
            <input
              style={{ width: '100%', paddingLeft: '32px', paddingRight: '10px', paddingTop: '7px', paddingBottom: '7px', border: '1px solid var(--osmos-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", boxSizing: 'border-box' }}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <Button onClick={() => showToast('Create New Page coming soon')}>
            <PlusIcon size={12} color="#fff" />
            Create New Page
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={TH}>Page Name</th>
                <th style={TH}>API Identifier</th>
                <th style={TH}>Audience</th>
                <th style={TH}>Status</th>
                <th style={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ ...TD, textAlign: 'center', color: 'var(--osmos-fg-subtle)', padding: '32px 16px' }}>
                    No pages found.
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ background: hoveredRow === row.id ? 'var(--osmos-bg-subtle)' : 'transparent', transition: 'background 0.12s' }}
                  >
                    <td style={TD}>
                      <div style={{ fontWeight: '500' }}>{row.pageName}</div>
                      {row.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                          {row.tags.map((tag) => (
                            <span key={tag} style={{ display: 'inline-block', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: '600', marginTop: '4px', ...(TAG_STYLES[tag] || {}) }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={TD_MUTED}>
                      {row.apiId === '—'
                        ? <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span>
                        : <code style={CODE_STYLE}>{row.apiId}</code>
                      }
                    </td>
                    <td style={TD_MUTED}>{row.audience}</td>
                    <td style={TD}><span style={STATUS_PILL}>{row.status}</span></td>
                    <td style={{ ...TD, padding: '11px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          style={actionBtnStyle(row.id, 'edit')}
                          onMouseEnter={() => setHoveredAction(`${row.id}-edit`)}
                          onMouseLeave={() => setHoveredAction(null)}
                          onClick={() => showToast(`Edit "${row.pageName}"`)}
                          aria-label={`Edit ${row.pageName}`}
                        >
                          <EditIcon size={15} />
                        </button>
                        <button
                          style={actionBtnStyle(row.id, 'delete')}
                          onMouseEnter={() => setHoveredAction(`${row.id}-delete`)}
                          onMouseLeave={() => setHoveredAction(null)}
                          onClick={() => showToast(`Delete "${row.pageName}"`)}
                          aria-label={`Delete ${row.pageName}`}
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--osmos-border)', fontSize: '13px', color: 'var(--osmos-fg-muted)', flexWrap: 'wrap', gap: '8px' }}>
          <span>Showing {pageRows.length} of 8 pages</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={pageBtn(false, safePage === 1)} disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous page">
              <ChevronLeftIcon size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button key={pg} style={pageBtn(pg === safePage, false)} onClick={() => setPage(pg)}>{pg}</button>
            ))}
            <button style={pageBtn(false, safePage === totalPages)} disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} aria-label="Next page">
              <ChevronRightIcon size={14} />
            </button>
            <span style={{ marginLeft: '8px', color: 'var(--osmos-fg-subtle)', fontSize: '12px' }}>
              Page {safePage} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
