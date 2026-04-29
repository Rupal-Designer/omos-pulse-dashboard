import { AlertCircle } from "lucide-react";

export function ChartEmptyState({
  title = "No Data Available",
  description = "Select metrics to view trends and performance data",
  actionText = "Click on any metric card to get started",
}) {
  return (
    <div
      className="rounded-lg border p-12 flex flex-col items-center justify-center min-h-[300px]"
      style={{
        backgroundColor: "var(--screen-bg)",
        borderColor: "var(--stroke)",
      }}
    >
      <div
        className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--violet-bg)" }}
      >
        <AlertCircle size={28} style={{ color: "var(--violet-primary)" }} />
      </div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-center max-w-md mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        {actionText}
      </p>
    </div>
  );
}
