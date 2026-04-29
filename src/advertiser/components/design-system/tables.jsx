"use client";

import React from "react";

import { Filter, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// ============================================================================
// TABLE HEADER CELL
// ============================================================================

export function TableHeaderCell({
  children,
  hasFilter,
  hasInfo,
  width,
  className = "",
}) {
  return (
    <th
      className={`p-3 text-xs font-medium ${className}`}
      style={{ color: "var(--text-secondary)", width }}
    >
      <div className="flex items-center gap-1">
        {children}
        {hasFilter && <Filter size={12} />}
        {hasInfo && (
          <Info size={12} style={{ color: "var(--text-tertiary)" }} />
        )}
      </div>
    </th>
  );
}

// ============================================================================
// TABLE CELL
// ============================================================================

export function TableCell({ children, align = "left", className = "" }) {
  return (
    <td
      className={`p-3 text-sm ${className}`}
      style={{ color: "var(--text-primary)", textAlign: align }}
    >
      {children}
    </td>
  );
}

// ============================================================================
// TABLE ROW
// ============================================================================

export function TableRow({ children, hoverable = true, className = "" }) {
  return (
    <tr
      className={`border-b ${hoverable ? "hover:bg-surface-1" : ""} ${className}`}
      style={{ borderColor: "var(--stroke-light)" }}
    >
      {children}
    </tr>
  );
}

// ============================================================================
// DATA TABLE COMPONENT
// ============================================================================

export function DataTable({
  columns,
  data,
  selectable,
  onRowSelect,
  footer,
  className = "",
}) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
      onRowSelect?.(data);
    }
  };

  const toggleRow = (index) => {
    const newSelection = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection.map((i) => data[i]));
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr
            className="border-b text-left"
            style={{ borderColor: "var(--stroke)" }}
          >
            {selectable && (
              <th
                className="p-3 w-10"
                style={{ backgroundColor: "var(--screen-bg)" }}
              >
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={toggleAll}
                  style={{ borderColor: "var(--stroke)" }}
                />
              </th>
            )}
            {columns.map((col) => (
              <TableHeaderCell
                key={col.key}
                hasFilter={col.hasFilter}
                hasInfo={col.hasInfo}
                width={col.width}
              >
                {col.label}
              </TableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {selectable && (
                <td
                  className="p-3"
                  style={{ backgroundColor: "var(--screen-bg)" }}
                >
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onCheckedChange={() => toggleRow(index)}
                    style={{ borderColor: "var(--stroke)" }}
                  />
                </td>
              )}
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
        {footer && <tfoot>{footer}</tfoot>}
      </table>
    </div>
  );
}
