"use client";

import { useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { MetricsCards } from "@/components/metrics-cards";
import { PerformanceTrend } from "@/components/performance-trend";

export function InteractiveDashboard({
  activeAdType = "Product Ads",
  onAdTypeChange,
  initialSelectedMetrics = [],
}) {
  const [selectedMetrics, setSelectedMetrics] = useState(
    initialSelectedMetrics.length > 0
      ? initialSelectedMetrics
      : ["CTR", "Ad Clicks"],
  );
  const [animatingMetric, setAnimatingMetric] = useState(null);

  // Track if any metrics are selected
  const hasSelectedMetrics = selectedMetrics.length > 0;

  // Determine which metrics to display with smooth transitions
  const displayMetrics = useMemo(() => selectedMetrics, [selectedMetrics]);

  const handleMetricToggle = (metric) => {
    setAnimatingMetric(metric);
    setTimeout(() => setAnimatingMetric(null), 300);

    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric],
    );
  };

  const EmptyChartState = () => (
    <div
      className="rounded-lg border p-12 flex flex-col items-center justify-center min-h-[300px] transition-all duration-300"
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
        No Metrics Selected
      </h3>
      <p
        className="text-sm text-center max-w-md mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Select one or multiple metrics from the cards above to view performance
        trends and analyze their correlation.
      </p>
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        Click on any metric card to get started
      </p>
    </div>
  );

  return (
    <div className="space-y-2">
      {/* Metrics Selection Cards */}
      <div>
        <MetricsCards
          activeAdType={activeAdType}
          selectedMetrics={selectedMetrics}
          onMetricToggle={handleMetricToggle}
        />
      </div>

      {/* Performance Trend Chart - Conditional Rendering */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          opacity: hasSelectedMetrics ? 1 : 0.5,
          maxHeight: hasSelectedMetrics ? "500px" : "0px",
          pointerEvents: hasSelectedMetrics ? "auto" : "none",
        }}
      >
        {hasSelectedMetrics ? (
          <div
            className="animate-in fade-in slide-in-from-top-2 duration-500"
            key={`trend-${selectedMetrics.join("-")}`}
          >
            <PerformanceTrend
              activeAdType={activeAdType}
              selectedMetrics={selectedMetrics}
            />
          </div>
        ) : (
          <EmptyChartState />
        )}
      </div>

      {/* Metrics Summary Info */}
      {hasSelectedMetrics && (
        <div
          className="rounded-lg border p-4 animate-in fade-in duration-500"
          style={{
            backgroundColor: "var(--surface-1)",
            borderColor: "var(--stroke)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              Displaying {selectedMetrics.length}
            </span>{" "}
            metric{selectedMetrics.length !== 1 ? "s" : ""}:{" "}
            {selectedMetrics.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
