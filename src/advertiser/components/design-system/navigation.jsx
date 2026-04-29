"use client";

import { useState } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";

// ============================================================================
// NAV ITEM COMPONENT
// ============================================================================

export function NavItem({
  icon,
  label,
  active,
  expanded,
  hasSubmenu,
  isOpen,
  onClick,
  badge,
  badgeColor = "error",
}) {
  const badgeColors = {
    error: "var(--error-primary)",
    warning: "var(--warning-primary)",
    success: "var(--success-primary)",
    violet: "var(--violet-primary)",
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
        ${expanded ? "" : "justify-center"}
      `}
      style={{
        backgroundColor: active ? "rgba(99, 102, 241, 0.3)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!active)
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div
        className="flex-shrink-0"
        style={{ color: active ? "white" : "rgba(255, 255, 255, 0.7)" }}
      >
        {icon}
      </div>
      {expanded && (
        <>
          <span
            className="flex-1 text-sm font-medium"
            style={{ color: active ? "white" : "rgba(255, 255, 255, 0.7)" }}
          >
            {label}
          </span>
          {badge && (
            <span
              className="px-2 py-0.5 text-white text-xs rounded-full"
              style={{ backgroundColor: badgeColors[badgeColor] }}
            >
              {badge}
            </span>
          )}
          {hasSubmenu && (
            <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              {isOpen ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================================
// SUB ITEM COMPONENT
// ============================================================================

export function SubItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors"
      style={{
        backgroundColor: active ? "#6366f1" : "transparent",
        color: active ? "white" : "rgba(255, 255, 255, 0.7)",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.color = "white";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
        }
      }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

export function Sidebar({
  brandLogo,
  brandName = "QA",
  items,
  activeItem,
  onItemClick,
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState([items[0]?.label || ""]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  return (
    <div
      className={`${isExpanded ? "w-64" : "w-16"} bg-gradient-to-b from-[#3d4a99] to-[#1e1f5e] flex flex-col py-4 transition-all duration-300 h-screen fixed top-0 left-0 z-40 overflow-y-auto ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Brand Logo */}
      <div
        className={`flex items-center gap-3 px-3 mb-6 ${isExpanded ? "" : "justify-center"}`}
      >
        {brandLogo || (
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {brandName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {isExpanded && (
          <span className="text-white font-semibold text-lg">{brandName}</span>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-1 px-2">
        {items.map((item, index) => {
          const isOpen = openMenus.includes(item.label);
          const isActive =
            activeItem === item.label ||
            item.subItems?.some((sub) => sub.label === activeItem);

          return (
            <div key={index}>
              <NavItem
                icon={item.icon}
                label={item.label}
                expanded={isExpanded}
                hasSubmenu={item.hasSubmenu}
                isOpen={isOpen}
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleMenu(item.label);
                  } else if (onItemClick) {
                    onItemClick(item.label);
                  }
                }}
                active={isActive}
                badge={item.badge}
                badgeColor={item.badgeColor}
              />

              {/* Submenu */}
              {isExpanded && isOpen && item.subItems && (
                <div className="ml-2 flex flex-col gap-1 mt-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <SubItem
                      key={subIndex}
                      icon={subItem.icon}
                      label={subItem.label}
                      active={activeItem === subItem.label}
                      onClick={() => onItemClick?.(subItem.label)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
