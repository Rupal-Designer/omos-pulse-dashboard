"use client";

import { cn } from "@/lib/utils";

export function DSTable({ children, className }) {
  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full">{children}</table>
    </div>
  );
}

export function DSTableHeader({ children }) {
  return (
    <thead>
      <tr className="border-b" style={{ borderColor: "var(--stroke)" }}>
        {children}
      </tr>
    </thead>
  );
}

export function DSTableHead({ children, className, sortable, onSort }) {
  return (
    <th
      className={cn(
        "p-3 text-left text-xs font-medium",
        sortable && "cursor-pointer hover:opacity-80",
        className,
      )}
      style={{ color: "var(--text-secondary)" }}
      onClick={sortable ? onSort : undefined}
    >
      {children}
    </th>
  );
}

export function DSTableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function DSTableRow({ children, className, onClick, hover = true }) {
  return (
    <tr
      className={cn(
        "border-b transition-colors",
        hover && "hover:bg-opacity-50",
        onClick && "cursor-pointer",
        className,
      )}
      style={{ borderColor: "var(--stroke-table)" }}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function DSTableCell({ children, className }) {
  return (
    <td
      className={cn("p-3 text-sm", className)}
      style={{ color: "var(--text-primary)" }}
    >
      {children}
    </td>
  );
}
