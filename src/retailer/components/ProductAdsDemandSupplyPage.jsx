import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

const IconCalendar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconFilter = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

const IconDownload = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconSort = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginLeft: 4, opacity: 0.55 }}
  >
    <path d="M12 5v14M5 12l7-7 7 7" opacity="0.6" />
    <path d="M19 12l-7 7-7-7" opacity="0.6" />
  </svg>
);

const IconChevronLeft = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TABLE_DATA = [
  { category: 'Body Care',     requests: '257.5K', responseRate: '20%', adRevenue: '$150K', computedDailyBudget: '$200K', budgetUtilization: 75,  campaignCount: 12 },
  { category: 'Skin Care',     requests: '200K',   responseRate: '30%', adRevenue: '$200K', computedDailyBudget: '$250K', budgetUtilization: 80,  campaignCount: 15 },
  { category: 'Makeup',        requests: '350K',   responseRate: '40%', adRevenue: '$175K', computedDailyBudget: '$300K', budgetUtilization: 58,  campaignCount: 18 },
  { category: 'Hair Care',     requests: '180K',   responseRate: '25%', adRevenue: '$120K', computedDailyBudget: '$180K', budgetUtilization: 67,  campaignCount: 10 },
  { category: 'Oral Care',     requests: '290K',   responseRate: '35%', adRevenue: '$230K', computedDailyBudget: '$320K', budgetUtilization: 72,  campaignCount: 14 },
  { category: 'Nail Care',     requests: '150K',   responseRate: '18%', adRevenue: '$90K',  computedDailyBudget: '$140K', budgetUtilization: 64,  campaignCount: 8  },
  { category: 'Foot Care',     requests: '220K',   responseRate: '28%', adRevenue: '$160K', computedDailyBudget: '$210K', budgetUtilization: 76,  campaignCount: 11 },
  { category: 'Sun Care',      requests: '130K',   responseRate: '22%', adRevenue: '$80K',  computedDailyBudget: '$120K', budgetUtilization: 67,  campaignCount: 7  },
  { category: 'Personal Care', requests: '310K',   responseRate: '45%', adRevenue: '$280K', computedDailyBudget: '$350K', budgetUtilization: 80,  campaignCount: 20 },
  { category: 'Eye Care',      requests: '95K',    responseRate: '15%', adRevenue: '$60K',  computedDailyBudget: '$100K', budgetUtilization: 60,  campaignCount: 6  },
];

// ---------------------------------------------------------------------------
// Budget utilization badge helper
// ---------------------------------------------------------------------------

function getBudgetBadgeStyle(value) {
  if (value >= 75) {
    return {
      color: 'var(--osmos-brand-green)',
      background: 'var(--osmos-brand-green-muted)',
    };
  }
  if (value >= 60) {
    return {
      color: 'var(--osmos-brand-amber)',
      background: 'var(--osmos-brand-amber-muted)',
    };
  }
  return {
    color: 'var(--osmos-fg-muted)',
    background: 'var(--osmos-bg-subtle)',
  };
}

// ---------------------------------------------------------------------------
// Styles (all inline, CSS-var-based)
// ---------------------------------------------------------------------------

const S = {
  page: {
    fontFamily: "'Open Sans', sans-serif",
    background: 'var(--osmos-bg-subtle)',
    minHeight: '100vh',
    padding: '20px 24px',
    boxSizing: 'border-box',
  },

  // --- Toolbar card ---
  toolbarCard: {
    background: 'var(--osmos-bg)',
    border: '1px solid var(--osmos-border)',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--osmos-fg)',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },

  // Outline button base
  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 500,
    color: 'var(--osmos-fg)',
    background: 'var(--osmos-bg)',
    border: '1px solid var(--osmos-border)',
    borderRadius: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
  },

  // Icon-only outline button
  btnIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontFamily: "'Open Sans', sans-serif",
    color: 'var(--osmos-fg-muted)',
    background: 'var(--osmos-bg)',
    border: '1px solid var(--osmos-border)',
    borderRadius: '6px',
    padding: '5px 8px',
    cursor: 'pointer',
  },

  // Search wrapper
  searchWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid var(--osmos-border)',
    borderRadius: '6px',
    padding: '5px 10px',
    background: 'var(--osmos-bg)',
    color: 'var(--osmos-fg-subtle)',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '12px',
    fontFamily: "'Open Sans', sans-serif",
    color: 'var(--osmos-fg)',
    background: 'transparent',
    width: '140px',
  },

  // Change Log link
  changeLogLink: {
    fontSize: '12px',
    fontFamily: "'Open Sans', sans-serif",
    color: 'var(--osmos-brand-primary)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '0 2px',
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },

  // --- Table card ---
  tableCard: {
    background: 'var(--osmos-bg)',
    border: '1px solid var(--osmos-border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  // TH
  th: {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--osmos-fg-muted)',
    padding: '10px 14px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    borderBottom: '1px solid var(--osmos-border)',
    background: 'var(--osmos-bg-subtle)',
    whiteSpace: 'nowrap',
  },
  thLeft: {
    textAlign: 'left',
  },
  thRight: {
    textAlign: 'right',
  },

  // TD
  td: {
    fontSize: '13px',
    color: 'var(--osmos-fg)',
    padding: '11px 14px',
    borderBottom: '1px solid var(--osmos-border)',
    whiteSpace: 'nowrap',
  },
  tdLeft: {
    textAlign: 'left',
  },
  tdRight: {
    textAlign: 'right',
  },

  // Budget badge pill
  budgetPill: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '20px',
    padding: '2px 9px',
  },

  // --- Pagination footer ---
  paginationFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid var(--osmos-border)',
    padding: '10px 16px',
  },
  paginationInfo: {
    fontSize: '12px',
    color: 'var(--osmos-fg-subtle)',
    fontFamily: "'Open Sans', sans-serif",
  },
  paginationButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductAdsDemandSupplyPage() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    { key: 'category',            label: 'Category L1',           align: 'left',  sortable: false, minWidth: '180px' },
    { key: 'requests',            label: 'Requests',              align: 'right', sortable: true  },
    { key: 'responseRate',        label: 'Response Rate (%)',     align: 'right', sortable: false },
    { key: 'adRevenue',           label: 'Ad Revenue',            align: 'right', sortable: false },
    { key: 'computedDailyBudget', label: 'Computed Daily Budget', align: 'right', sortable: false },
    { key: 'budgetUtilization',   label: 'Budget Utilization (%)',align: 'right', sortable: false },
    { key: 'campaignCount',       label: 'Campaign Count',        align: 'right', sortable: false },
  ];

  const filteredData = searchValue.trim()
    ? TABLE_DATA.filter(row =>
        row.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    : TABLE_DATA;

  return (
    <div style={S.page}>

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Toolbar                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div style={S.toolbarCard}>

        {/* Left: title */}
        <p style={S.toolbarTitle}>Demand &amp; Supply Gap Analytics</p>

        {/* Right: controls */}
        <div style={S.toolbarRight}>

          {/* Date range button */}
          <button style={S.btnOutline}>
            <IconCalendar />
            08 May 25 - 14 May 25
          </button>

          {/* Search input */}
          <div style={S.searchWrapper}>
            <span style={{ color: 'var(--osmos-fg-subtle)', display: 'flex' }}>
              <IconSearch />
            </span>
            <input
              style={S.searchInput}
              placeholder="Search Category"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>

          {/* Add a Filter */}
          <button style={S.btnOutline}>
            <IconFilter />
            Add a Filter
          </button>

          {/* Change Log */}
          <button style={S.changeLogLink}>Change Log</button>

          {/* Download icon */}
          <button style={{ ...S.btnIcon, color: 'var(--osmos-fg-muted)' }}>
            <IconDownload />
          </button>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Main table                                              */}
      {/* ------------------------------------------------------------------ */}
      <div style={S.tableCard}>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>

            {/* Header */}
            <thead>
              <tr>
                {columns.map(col => (
                  <th
                    key={col.key}
                    style={{
                      ...S.th,
                      ...(col.align === 'left' ? S.thLeft : S.thRight),
                      ...(col.minWidth ? { minWidth: col.minWidth } : {}),
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      {col.label}
                      {col.sortable && <IconSort />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredData.map((row, idx) => {
                const isHovered = hoveredRow === idx;
                const isLast = idx === filteredData.length - 1;
                const badgeStyle = getBudgetBadgeStyle(row.budgetUtilization);

                return (
                  <tr
                    key={row.category}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: isHovered
                        ? 'var(--osmos-brand-primary-muted)'
                        : 'var(--osmos-bg)',
                      transition: 'background 0.12s ease',
                    }}
                  >
                    {/* Category L1 */}
                    <td
                      style={{
                        ...S.td,
                        ...S.tdLeft,
                        fontWeight: 500,
                        borderBottom: isLast ? 'none' : S.td.borderBottom,
                      }}
                    >
                      {row.category}
                    </td>

                    {/* Requests */}
                    <td style={{ ...S.td, ...S.tdRight, borderBottom: isLast ? 'none' : S.td.borderBottom }}>
                      {row.requests}
                    </td>

                    {/* Response Rate */}
                    <td style={{ ...S.td, ...S.tdRight, borderBottom: isLast ? 'none' : S.td.borderBottom }}>
                      {row.responseRate}
                    </td>

                    {/* Ad Revenue */}
                    <td style={{ ...S.td, ...S.tdRight, borderBottom: isLast ? 'none' : S.td.borderBottom }}>
                      {row.adRevenue}
                    </td>

                    {/* Computed Daily Budget */}
                    <td style={{ ...S.td, ...S.tdRight, borderBottom: isLast ? 'none' : S.td.borderBottom }}>
                      {row.computedDailyBudget}
                    </td>

                    {/* Budget Utilization — colored pill */}
                    <td
                      style={{
                        ...S.td,
                        ...S.tdRight,
                        borderBottom: isLast ? 'none' : S.td.borderBottom,
                      }}
                    >
                      <span
                        style={{
                          ...S.budgetPill,
                          color: badgeStyle.color,
                          background: badgeStyle.background,
                        }}
                      >
                        {row.budgetUtilization}%
                      </span>
                    </td>

                    {/* Campaign Count */}
                    <td style={{ ...S.td, ...S.tdRight, borderBottom: isLast ? 'none' : S.td.borderBottom }}>
                      {row.campaignCount}
                    </td>
                  </tr>
                );
              })}

              {/* Empty state */}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      ...S.td,
                      textAlign: 'center',
                      color: 'var(--osmos-fg-subtle)',
                      padding: '32px 14px',
                      border: 'none',
                    }}
                  >
                    No categories match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Pagination footer                                               */}
        {/* -------------------------------------------------------------- */}
        <div style={S.paginationFooter}>
          <span style={S.paginationInfo}>
            Showing 1-{filteredData.length} of {filteredData.length} categor{filteredData.length === 1 ? 'y' : 'ies'}
          </span>
          <div style={S.paginationButtons}>
            <button style={{ ...S.btnOutline, color: 'var(--osmos-fg-muted)', gap: '3px' }} disabled>
              <IconChevronLeft />
              Prev
            </button>
            <button style={{ ...S.btnOutline, color: 'var(--osmos-fg-muted)', gap: '3px' }} disabled>
              Next
              <IconChevronRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
