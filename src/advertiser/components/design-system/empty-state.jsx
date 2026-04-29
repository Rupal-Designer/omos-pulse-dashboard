"use client";

export function DSEmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--surface-1)" }}
      >
        <div style={{ color: "var(--text-secondary)" }}>{icon}</div>
      </div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm mb-6 max-w-md"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all"
          style={{ backgroundColor: "var(--blue-primary)" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
