"use client";

import React from "react";
import { Filter, Info } from "lucide-react";
import {
  DataTable as SharedDataTable,
  useOsmosTable,
} from "../../../shared/components/data-table";

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
      style={{ color: "var(--osmos-fg-muted)", width }}
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
      style={{ color: "var(--osmos-fg)", textAlign: align }}
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
      style={{ borderColor: "var(--osmos-border)" }}
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
  // Remap legacy column format { key, label, hasFilter, hasInfo, width, render }
  // to TanStack column defs, preserving existing TableHeaderCell + TableCell rendering.
  const tsColumns = React.useMemo(() => columns.map((col) => ({
    id: col.key,
    accessorKey: col.key,
    enableSorting: false,
    header: () => (
      <TableHeaderCell hasFilter={col.hasFilter} hasInfo={col.hasInfo} width={col.width}>
        {col.label}
      </TableHeaderCell>
    ),
    cell: (info) =>
      col.render
        ? col.render(info.getValue(), info.row.original)
        : <TableCell>{info.getValue()}</TableCell>,
  })), [columns]);

  const { table } = useOsmosTable({
    columns: tsColumns,
    data,
    features: { select: selectable },
    onRowSelect,
  });

  return (
    <SharedDataTable
      table={table}
      footer={footer}
      className={className}
    />
  );
}
