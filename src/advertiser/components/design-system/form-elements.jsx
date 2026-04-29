"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export function DSInput({
  label,
  error,
  helperText,
  icon,
  iconPosition = "left",
  className,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}
          >
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors",
            "focus:ring-2 focus:ring-opacity-50",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-error-primary",
            className,
          )}
          style={{
            borderColor: error ? "var(--error-primary)" : "var(--stroke)",
            backgroundColor: "var(--screen-bg)",
            color: "var(--text-primary)",
          }}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}
          >
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs" style={{ color: "var(--error-primary)" }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export function DSSearchInput({ className, ...props }) {
  return (
    <DSInput
      icon={<Search size={16} />}
      iconPosition="left"
      placeholder="Search..."
      className={className}
      {...props}
    />
  );
}

export function DSSelect({
  label,
  error,
  helperText,
  className,
  children,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors appearance-none bg-no-repeat bg-right pr-10",
          error && "border-error-primary",
          className,
        )}
        style={{
          borderColor: error ? "var(--error-primary)" : "var(--stroke)",
          backgroundColor: "var(--screen-bg)",
          color: "var(--text-primary)",
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237b7b7b' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1.5em 1.5em",
        }}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs" style={{ color: "var(--error-primary)" }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export function DSTextarea({ label, error, helperText, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors resize-none",
          "focus:ring-2 focus:ring-opacity-50",
          error && "border-error-primary",
          className,
        )}
        style={{
          borderColor: error ? "var(--error-primary)" : "var(--stroke)",
          backgroundColor: "var(--screen-bg)",
          color: "var(--text-primary)",
        }}
        {...props}
      />

      {error && (
        <p className="text-xs" style={{ color: "var(--error-primary)" }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export function DSCheckbox({ label, className, ...props }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn("w-4 h-4 rounded border cursor-pointer", className)}
        style={{
          borderColor: "var(--stroke)",
          accentColor: "var(--blue-primary)",
        }}
        {...props}
      />

      {label && (
        <span className="text-sm" style={{ color: "var(--text-primary)" }}>
          {label}
        </span>
      )}
    </label>
  );
}

export function DSRadio({ label, className, ...props }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        className={cn("w-4 h-4 cursor-pointer", className)}
        style={{ accentColor: "var(--blue-primary)" }}
        {...props}
      />

      {label && (
        <span className="text-sm" style={{ color: "var(--text-primary)" }}>
          {label}
        </span>
      )}
    </label>
  );
}
