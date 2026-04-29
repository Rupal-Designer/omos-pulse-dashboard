import { cn } from "@/lib/utils";

export function DSStatusBadge({ status, className }) {
  const statusConfig = {
    Active: {
      backgroundColor: "var(--success-bg)",
      color: "var(--success-primary)",
      border: "1px solid var(--success-lighter)",
    },
    Paused: {
      backgroundColor: "var(--warning-bg)",
      color: "var(--warning-primary)",
      border: "1px solid var(--warning-lighter)",
    },
    Ended: {
      backgroundColor: "var(--surface-1)",
      color: "var(--text-secondary)",
      border: "1px solid var(--stroke)",
    },
    Draft: {
      backgroundColor: "var(--surface-1)",
      color: "var(--text-secondary)",
      border: "1px solid var(--stroke)",
    },
  };

  const config = statusConfig[status] || statusConfig.Draft;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
        className,
      )}
      style={config}
    >
      {status}
    </span>
  );
}

export function DSLabelBadge({ children, variant = "secondary", className }) {
  const variants = {
    primary: {
      backgroundColor: "var(--blue-bg)",
      color: "var(--blue-primary)",
      border: "1px solid var(--blue-lighter-1)",
    },
    secondary: {
      backgroundColor: "var(--surface-1)",
      color: "var(--text-primary)",
      border: "1px solid var(--stroke)",
    },
    success: {
      backgroundColor: "var(--success-bg)",
      color: "var(--success-primary)",
      border: "1px solid var(--success-lighter)",
    },
    warning: {
      backgroundColor: "var(--warning-bg)",
      color: "var(--warning-primary)",
      border: "1px solid var(--warning-lighter)",
    },
    error: {
      backgroundColor: "var(--error-bg)",
      color: "var(--error-primary)",
      border: "1px solid var(--error-lighter)",
    },
    violet: {
      backgroundColor: "var(--violet-bg)",
      color: "var(--violet-primary)",
    },
    alpha: {
      backgroundColor: "#f45858",
      color: "white",
    },
    beta: {
      backgroundColor: "var(--blue-primary)",
      color: "white",
    },
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        className,
      )}
      style={variants[variant]}
    >
      {children}
    </span>
  );
}
