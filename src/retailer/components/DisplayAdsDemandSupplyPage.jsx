import React, { useState } from "react";
import { Icon, CalendarIcon, SearchIcon, FilterIcon, DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from '../../ui/atoms/Icon';

const SortIcon = () => <span style={{ marginLeft: 4, opacity: 0.5, display: 'inline-flex' }}><Icon size={10} strokeWidth={2}><polyline points="12 3 12 21" /><polyline points="7 8 12 3 17 8" /><polyline points="7 16 12 21 17 16" /></Icon></span>;

const rows = [
  { placement: "Homepage Banner",  requests: "1.2M",  fillRate: "65%", revenue: "$42K", cpm: "$3.50", impressions: "12.0M", budgetUtil: 78 },
  { placement: "Product Sidebar",  requests: "850K",  fillRate: "58%", revenue: "$28K", cpm: "$3.29", impressions: "8.5M",  budgetUtil: 70 },
  { placement: "Search Results",   requests: "2.1M",  fillRate: "72%", revenue: "$68K", cpm: "$3.24", impressions: "21.0M", budgetUtil: 82 },
  { placement: "Category Page",    requests: "640K",  fillRate: "55%", revenue: "$19K", cpm: "$2.97", impressions: "6.4M",  budgetUtil: 62 },
  { placement: "Cart Page",        requests: "380K",  fillRate: "48%", revenue: "$12K", cpm: "$3.16", impressions: "3.8M",  budgetUtil: 58 },
  { placement: "Brand Store",      requests: "290K",  fillRate: "61%", revenue: "$9K",  cpm: "$3.10", impressions: "2.9M",  budgetUtil: 74 },
  { placement: "Checkout Page",    requests: "210K",  fillRate: "44%", revenue: "$7K",  cpm: "$3.33", impressions: "2.1M",  budgetUtil: 55 },
  { placement: "Mobile App Feed",  requests: "1.8M",  fillRate: "69%", revenue: "$55K", cpm: "$3.06", impressions: "18.0M", budgetUtil: 80 },
];

function getBudgetPillStyle(val) {
  if (val >= 75) {
    return {
      color: "var(--osmos-brand-green)",
      background: "var(--osmos-brand-green-muted)",
    };
  } else if (val >= 60) {
    return {
      color: "var(--osmos-brand-amber)",
      background: "var(--osmos-brand-amber-muted)",
    };
  } else {
    return {
      color: "var(--osmos-fg-muted)",
      background: "var(--osmos-bg-subtle)",
    };
  }
}

const pillBase = {
  display: "inline-block",
  padding: "2px 9px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.01em",
};

export default function DisplayAdsDemandSupplyPage() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const pageStyle = {
    fontFamily: "'Open Sans', sans-serif",
    background: "var(--osmos-bg-subtle)",
    minHeight: "100vh",
    padding: '20px 24px',
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "var(--osmos-bg)",
    border: "1px solid var(--osmos-border)",
    borderRadius: 10,
    overflow: "hidden",
  };

  const toolbarStyle = {
    ...cardStyle,
    overflow: "visible",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  };

  const toolbarRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  };

  const dateButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: 6,
    background: "var(--osmos-bg)",
    color: "var(--osmos-fg)",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Open Sans', sans-serif",
    whiteSpace: "nowrap",
  };

  const searchWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    border: "1px solid var(--osmos-border)",
    borderRadius: 6,
    background: "var(--osmos-bg)",
    color: "var(--osmos-fg-muted)",
  };

  const searchInputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 13,
    color: "var(--osmos-fg)",
    fontFamily: "'Open Sans', sans-serif",
    width: 160,
  };

  const filterButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: 6,
    background: "var(--osmos-bg)",
    color: "var(--osmos-fg)",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Open Sans', sans-serif",
  };

  const changeLogStyle = {
    fontSize: 13,
    color: "var(--osmos-brand-primary)",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };

  const iconButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "1px solid var(--osmos-border)",
    borderRadius: 6,
    background: "var(--osmos-bg)",
    color: "var(--osmos-fg-muted)",
    cursor: "pointer",
  };

  const theadThStyle = {
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--osmos-fg-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    borderBottom: "1px solid var(--osmos-border)",
    background: "var(--osmos-bg)",
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--osmos-fg)",
    borderBottom: "1px solid var(--osmos-border)",
    whiteSpace: "nowrap",
  };

  const paginationStyle = {
    borderTop: "1px solid var(--osmos-border)",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "var(--osmos-bg)",
  };

  const paginationBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "5px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: 6,
    background: "var(--osmos-bg)",
    color: "var(--osmos-fg)",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "'Open Sans', sans-serif",
  };

  return (
    <div style={pageStyle}>
      {/* Toolbar */}
      <div style={toolbarStyle}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--osmos-fg)", whiteSpace: "nowrap" }}>
          Demand &amp; Supply Gap Analytics
        </span>
        <div style={toolbarRightStyle}>
          <button style={dateButtonStyle}>
            <CalendarIcon />
            08 May 25 - 14 May 25
          </button>
          <div style={searchWrapStyle}>
            <SearchIcon />
            <input
              style={searchInputStyle}
              placeholder="Search Placement"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          <button style={filterButtonStyle}>
            <FilterIcon />
            Add a Filter
          </button>
          <span style={changeLogStyle}>Change Log</span>
          <button style={iconButtonStyle} title="Download">
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={cardStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ ...theadThStyle, textAlign: "left", minWidth: 200 }}>Placement / Ad Unit</th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Requests <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Fill Rate (%) <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Ad Revenue <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  CPM <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Impressions <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Budget Utilization (%) <SortIcon />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isHovered = hoveredRow === i;
              const rowBg = isHovered ? "var(--osmos-brand-primary-muted)" : "var(--osmos-bg)";
              const pillStyle = { ...pillBase, ...getBudgetPillStyle(row.budgetUtil) };
              return (
                <tr
                  key={i}
                  style={{ background: rowBg, transition: "background 0.15s" }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{ ...tdStyle, textAlign: "left", fontWeight: 500 }}>{row.placement}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.requests}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.fillRate}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.revenue}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.cpm}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.impressions}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <span style={pillStyle}>{row.budgetUtil}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={paginationStyle}>
          <span style={{ fontSize: 12, color: "var(--osmos-fg-subtle)" }}>
            Showing 1-8 of 8 placements
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={paginationBtnStyle}>
              <ChevronLeftIcon />
              Prev
            </button>
            <button style={paginationBtnStyle}>
              Next
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
