"use client";

import { Info, ChevronDown } from "lucide-react";

export function MetricSelectorCard({
  label,
  value,
  isSelected,
  hasDropdown = true,
  onToggle,
  isAnimating = false,
}) {
  return (
    <button
      onClick={onToggle}
      className={`rounded-lg p-4 border transition-all text-left transform duration-300 ${
        isAnimating ? "scale-95" : "scale-100"
      }`}
      style={{
        backgroundColor: isSelected ? "var(--blue-bg)" : "var(--screen-bg)",
        borderColor: isSelected ? "var(--blue-primary)" : "var(--stroke)",
        boxShadow: isSelected ? "0 0 0 2px var(--blue-bg)" : "none",
      }}
    >
      <div className="flex items-center gap-1 mb-1">
        <span
          className="text-xs"
          style={{
            color: isSelected ? "var(--blue-primary)" : "var(--text-secondary)",
            fontWeight: isSelected ? 500 : 400,
          }}
        >
          {label}
        </span>
        {hasDropdown && (
          <ChevronDown
            size={12}
            style={{
              color: isSelected
                ? "var(--blue-primary)"
                : "var(--text-secondary)",
            }}
          />
        )}
        <Info
          size={12}
          style={{ color: "var(--text-tertiary)" }}
          className="ml-auto"
        />
      </div>
      <p
        className="text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
    </button>
  );
}
