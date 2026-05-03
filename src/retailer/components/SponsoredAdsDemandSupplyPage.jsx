import React, { useState } from "react";
import { Icon, CalendarIcon, SearchIcon, FilterIcon, DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from '../../ui/atoms/Icon';

const SortIcon = () => <span style={{ marginLeft: 4, opacity: 0.5, display: 'inline-flex' }}><Icon size={10} strokeWidth={2}><polyline points="12 3 12 21" /><polyline points="7 8 12 3 17 8" /><polyline points="7 16 12 21 17 16" /></Icon></span>;

const rows = [
  { adUnit: "Search Top",       requests: "3.2M",  fillRate: "78%", revenue: "$85K", cpc: "$0.38", clicks: "223.6K", budgetUtil: 84 },
  { adUnit: "Search Bottom",    requests: "1.8M",  fillRate: "62%", revenue: "$42K", cpc: "$0.35", clicks: "120.0K", budgetUtil: 72 },
  { adUnit: "Category Top",     requests: "950K",  fillRate: "55%", revenue: "$24K", cpc: "$0.40", clicks: "60.0K",  budgetUtil: 68 },
  { adUnit: "Product Detail",   requests: "2.4M",  fillRate: "70%", revenue: "$62K", cpc: "$0.37", clicks: "167.6K", budgetUtil: 80 },
  { adUnit: "Brand Showcase",   requests: "680K",  fillRate: "48%", revenue: "$16K", cpc: "$0.35", clicks: "45.7K",  budgetUtil: 60 },
  { adUnit: "Deals Page",       requests: "420K",  fillRate: "52%", revenue: "$11K", cpc: "$0.38", clicks: "28.9K",  budgetUtil: 65 },
  { adUnit: "Related Products", requests: "1.1M",  fillRate: "65%", revenue: "$28K", cpc: "$0.36", clicks: "77.8K",  budgetUtil: 76 },
  { adUnit: "Homepage Slots",   requests: "560K",  fillRate: "58%", revenue: "$14K", cpc: "$0.37", clicks: "37.8K",  budgetUtil: 70 },
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

export default function SponsoredAdsDemandSupplyPage() {
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
                  CPC <SortIcon />
                </span>
              </th>
              <th style={{ ...theadThStyle, textAlign: "right" }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  Clicks <SortIcon />
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
                  <td style={{ ...tdStyle, textAlign: "left", fontWeight: 500 }}>{row.adUnit}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.requests}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.fillRate}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.revenue}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.cpc}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{row.clicks}</td>
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
