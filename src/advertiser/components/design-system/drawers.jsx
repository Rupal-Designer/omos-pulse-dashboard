"use client";

import { X } from "lucide-react";

// ============================================================================
// DRAWER OVERLAY
// ============================================================================

export function DrawerOverlay({ onClick }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// DRAWER HEADER
// ============================================================================

export function DrawerHeader({ title, onClose, actions, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 border-b ${className}`}
      style={{ borderColor: "var(--stroke)" }}
    >
      <div className="flex-1">{title}</div>
      <div className="flex items-center gap-4">
        {actions}
        <button
          onClick={onClose}
          className="transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// DRAWER CONTENT
// ============================================================================

export function DrawerContent({ children, className = "" }) {
  return (
    <div
      className={`flex-1 overflow-y-auto ${className}`}
      style={{ backgroundColor: "var(--surface-1)" }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// DRAWER FOOTER
// ============================================================================

export function DrawerFooter({ children, className = "" }) {
  return (
    <div
      className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${className}`}
      style={{
        borderColor: "var(--stroke)",
        backgroundColor: "var(--screen-bg)",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// DRAWER (Partial - Slides from Right)
// ============================================================================

export function Drawer({
  open,
  onClose,
  children,
  width = "large",
  className = "",
}) {
  if (!open) return null;

  const widthMap = {
    small: "40%",
    medium: "60%",
    large: "75%",
    xlarge: "85%",
  };

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <div
        className={`fixed right-0 top-0 z-[60] h-full shadow-xl flex flex-col transition-transform duration-300 ${className}`}
        style={{
          width: widthMap[width],
          backgroundColor: "var(--screen-bg)",
        }}
      >
        {children}
      </div>
    </>
  );
}

// ============================================================================
// FULL SCREEN MODAL
// ============================================================================

export function FullScreenModal({ open, onClose, children, className = "" }) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex h-screen overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--screen-bg)" }}
    >
      {children}
    </div>
  );
}
