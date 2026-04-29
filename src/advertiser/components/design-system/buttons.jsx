"use client";

import { cn } from "@/lib/utils";

export function DSButton({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  className,
  children,
  disabled,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all rounded-lg outline-none";

  const variants = {
    primary: "text-white hover:opacity-90 active:opacity-80",
    secondary: "hover:opacity-80 active:opacity-70",
    ghost: "hover:opacity-80 active:opacity-70",
    danger: "text-white hover:opacity-90 active:opacity-80",
    success: "text-white hover:opacity-90 active:opacity-80",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: "var(--blue-primary)" };
      case "secondary":
        return {
          backgroundColor: "var(--surface-1)",
          color: "var(--text-primary)",
          border: "1px solid var(--stroke)",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "var(--text-secondary)",
        };
      case "danger":
        return { backgroundColor: "var(--error-primary)" };
      case "success":
        return { backgroundColor: "var(--success-primary)" };
    }
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      style={getBackgroundColor()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
}

export function DSIconButton({
  icon,
  size = "md",
  variant = "default",
  className,
  ...props
}) {
  const sizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const variants = {
    default: "border hover:opacity-80 transition-all",
    primary: "hover:opacity-90",
    ghost: "hover:opacity-80",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "default":
        return {
          borderColor: "var(--stroke)",
          color: "var(--text-secondary)",
          backgroundColor: "var(--screen-bg)",
        };
      case "primary":
        return { backgroundColor: "var(--blue-primary)", color: "white" };
      case "ghost":
        return {
          color: "var(--text-secondary)",
          backgroundColor: "transparent",
        };
    }
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-lg",
        sizes[size],
        variants[variant],
        className,
      )}
      style={getVariantStyles()}
      {...props}
    >
      {icon}
    </button>
  );
}
