"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export function DSModal({
  open,
  onClose,
  children,
  title,
  subtitle,
  size = "md",
  showCloseButton = true,
}) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full ${sizes[size]} rounded-xl shadow-2xl overflow-hidden`}
        style={{ backgroundColor: "var(--screen-bg)" }}
      >
        {/* Header */}
        {(title || subtitle || showCloseButton) && (
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
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-80 transition-all"
                style={{ color: "var(--text-secondary)" }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
