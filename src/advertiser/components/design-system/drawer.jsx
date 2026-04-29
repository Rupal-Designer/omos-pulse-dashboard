"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export function DSDrawer({
  open,
  onClose,
  children,
  title,
  subtitle,
  size = "large",
}) {
  const sizes = {
    small: "85%",
    medium: "90%",
    large: "95%",
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col shadow-2xl"
        style={{
          width: sizes[size],
          backgroundColor: "var(--screen-bg)",
        }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div
            className="flex items-start justify-between p-6 border-b"
            style={{ borderColor: "var(--stroke)" }}
          >
            <div>
              {title && (
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-80 transition-all"
              style={{ color: "var(--text-secondary)" }}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
