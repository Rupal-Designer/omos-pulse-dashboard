"use client";

import { cn } from "@/lib/utils";

export function DSCard({
  children,
  className,
  padding = "md",
  hover = false,
  onClick,
}) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-lg border transition-all",
        paddings[padding],
        hover && "hover:shadow-sm cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        backgroundColor: "var(--screen-bg)",
        borderColor: "var(--stroke)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function DSCardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
