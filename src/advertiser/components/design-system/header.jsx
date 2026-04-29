"use client";

import { ChevronDown } from "lucide-react";

// ============================================================================
// ICON BUTTON COMPONENT
// ============================================================================

export function IconButton({
  icon,
  onClick,
  badge,
  badgeColor = "var(--error-primary)",
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 flex items-center justify-center border rounded-lg transition-colors ${className}`}
      style={{
        borderColor: "var(--stroke)",
        color: "var(--text-secondary)",
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--surface-1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {icon}
      {badge && (
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2"
          style={{
            backgroundColor: badgeColor,
            borderColor: "var(--screen-bg)",
          }}
        />
      )}
    </button>
  );
}

// ============================================================================
// DROPDOWN COMPONENT
// ============================================================================

export function Dropdown({ label, icon, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer ${className}`}
      style={{ borderColor: "var(--stroke)" }}
    >
      {icon}
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </span>
      <ChevronDown size={16} style={{ color: "var(--text-secondary)" }} />
    </div>
  );
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

export function Header({ logo, companyName, actions, className = "" }) {
  return (
    <div
      className={`border-b px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30 ${className}`}
      style={{
        backgroundColor: "var(--screen-bg)",
        borderColor: "var(--stroke)",
      }}
    >
      <div className="flex items-center gap-4">
        {logo}
        {companyName && <Dropdown label={companyName} />}
      </div>

      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
