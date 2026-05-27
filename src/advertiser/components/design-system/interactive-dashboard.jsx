import { useState, useMemo, useEffect, useRef } from 'react';
import { Icon } from '../../../ui';
import { MetricsCards } from '../metrics-cards';
import { PerformanceTrend } from '../performance-trend';
import { SofieInlinePanel } from '../sofie-inline-panel';

// AlertCircle — hand-rolled (replaced lucide-react)
const AlertCircle = ({ size = 28, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

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
  const windowWidth = useWindowWidth();
  const showSofie = windowWidth >= 900;

  // Measure chart card height so Sofie panel can match it exactly
  const chartRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setChartHeight(Math.round(entry.contentRect.height));
    });
    ro.observe(chartRef.current);
    return () => ro.disconnect();
  }, []);

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

      {/* Performance Trend + Sofie panel — separate sibling cards */}
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'stretch',
        opacity: hasSelectedMetrics ? 1 : 0.5,
        transition: 'opacity 0.3s',
        pointerEvents: hasSelectedMetrics ? 'auto' : 'none',
      }}>
        {/* Chart card — ref used to sync Sofie panel height */}
        <div ref={chartRef} style={{ flex: 1, minWidth: 0 }}>
          {hasSelectedMetrics ? (
            <div key={`trend-${selectedMetrics.join("-")}`} style={{ animation: 'fadeIn 0.5s ease' }}>
              <PerformanceTrend
                activeAdType={activeAdType}
                selectedMetrics={selectedMetrics}
              />
            </div>
          ) : (
            <EmptyChartState />
          )}
        </div>

        {/* Sofie panel — height locked to chart height */}
        {showSofie && (
          <SofieInlinePanel windowWidth={windowWidth} chartHeight={chartHeight} />
        )}
      </div>

    </div>
  );
}
