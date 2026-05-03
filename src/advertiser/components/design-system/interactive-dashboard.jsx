import { useState, useMemo } from 'react';
import { Icon } from '../../../ui';
import { MetricsCards } from '../metrics-cards';
import { PerformanceTrend } from '../performance-trend';

// AlertCircle — hand-rolled (replaced lucide-react)
const AlertCircle = ({ size = 28, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);

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
    <div style={{
      borderRadius: 8,
      border: '1px solid var(--osmos-border)',
      padding: 48,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 300,
      background: 'var(--osmos-bg)',
      transition: 'all 0.3s',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16, background: 'var(--osmos-brand-primary-muted)',
      }}>
        <AlertCircle size={28} color="var(--osmos-brand-primary)" />
      </div>
      <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)' }}>
        No Metrics Selected
      </h3>
      <p style={{ margin: '0 0 24px', fontSize: 13, textAlign: 'center', maxWidth: 400, color: 'var(--osmos-fg-muted)' }}>
        Select one or multiple metrics from the cards above to view performance
        trends and analyze their correlation.
      </p>
      <p style={{ fontSize: 12, margin: 0, color: 'var(--osmos-fg-subtle)' }}>
        Click on any metric card to get started
      </p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        style={{
          overflow: 'hidden',
          transition: 'all 0.5s',
          opacity: hasSelectedMetrics ? 1 : 0.5,
          maxHeight: hasSelectedMetrics ? '500px' : '0px',
          pointerEvents: hasSelectedMetrics ? 'auto' : 'none',
        }}
      >
        {hasSelectedMetrics ? (
          <div
            style={{ animation: 'fadeIn 0.5s ease' }}
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
          style={{
            borderRadius: 8,
            border: '1px solid var(--osmos-border)',
            padding: 16,
            backgroundColor: 'var(--osmos-bg-subtle)',
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <p style={{ fontSize: 12, margin: 0, color: 'var(--osmos-fg-muted)' }}>
            <span style={{ color: 'var(--osmos-fg)', fontWeight: 500 }}>
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
