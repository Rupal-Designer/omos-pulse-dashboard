import { InfoIcon, ChevronDownIcon } from '../../ui';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT       = "'Open Sans', sans-serif";
const BG         = 'var(--osmos-bg)';
const BG_MUTED   = 'var(--osmos-bg-muted)';
const BORDER     = 'var(--osmos-border)';
const TEXT       = 'var(--osmos-fg)';
const TEXT_MID   = 'var(--osmos-fg-muted)';
const TEXT_SUBTLE= 'var(--osmos-fg-subtle)';
const ACCENT     = 'var(--osmos-brand-primary)';
const ACCENT_M   = 'var(--osmos-brand-primary-muted)';

// ── Mock data ────────────────────────────────────────────────────────────────
const metricsData = {
  'Product Ads': [
    { label: 'Ad Spend',       value: '$7.3 M',  hasDropdown: true },
    { label: 'Ad Impressions', value: '7.3 M',   hasDropdown: true },
    { label: 'Ad Clicks',      value: '7.3 M',   hasDropdown: true },
    { label: 'CTR',            value: '2%',      hasDropdown: true },
    { label: 'CPC',            value: '$7.3 M',  hasDropdown: true },
    { label: 'CPM',            value: '$7.3 M',  hasDropdown: true },
  ],
  'Display Ads': [
    { label: 'Ad Spend',       value: '$12.5 M', hasDropdown: true },
    { label: 'Ad Impressions', value: '15.8 M',  hasDropdown: true },
    { label: 'Ad Clicks',      value: '2.1 M',   hasDropdown: true },
    { label: 'CTR',            value: '3.2%',    hasDropdown: true },
    { label: 'CPC',            value: '$5.95',   hasDropdown: true },
    { label: 'CPM',            value: '$0.79',   hasDropdown: true },
  ],
  'Offsite Ads': [
    { label: 'Ad Spend',       value: '$24.8 M', hasDropdown: true },
    { label: 'Ad Impressions', value: '45.2 M',  hasDropdown: true },
    { label: 'Ad Clicks',      value: '8.9 M',   hasDropdown: true },
    { label: 'CTR',            value: '19.7%',   hasDropdown: true },
    { label: 'CPC',            value: '$2.79',   hasDropdown: true },
    { label: 'CPM',            value: '$0.55',   hasDropdown: true },
  ],
};

// ── MetricsCards ─────────────────────────────────────────────────────────────
export function MetricsCards({
  activeAdType    = 'Product Ads',
  selectedMetrics = ['CTR', 'Ad Clicks'],
  onMetricToggle,
}) {
  const metrics = metricsData[activeAdType] || metricsData['Product Ads'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, fontFamily: FONT }}>
      {metrics.map((metric, index) => {
        const isSelected = selectedMetrics.includes(metric.label);
        return (
          <MetricCard
            key={index}
            metric={metric}
            isSelected={isSelected}
            onClick={() => onMetricToggle && onMetricToggle(metric.label)}
          />
        );
      })}
    </div>
  );
}

// ── MetricCard (extracted to manage its own hover state) ─────────────────────
function MetricCard({ metric, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 16, borderRadius: 8, border: 'none', cursor: 'pointer',
        textAlign: 'left', transition: 'all 0.15s', fontFamily: FONT,
        backgroundColor: isSelected ? ACCENT_M : BG,
        outline: `1px solid ${isSelected ? ACCENT : BORDER}`,
        boxShadow: isSelected ? `0 0 0 2px ${ACCENT_M}` : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = BG_MUTED;
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = BG;
      }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <span style={{
          fontSize: 12,
          color: isSelected ? ACCENT : TEXT_MID,
          fontWeight: isSelected ? 500 : 400,
        }}>
          {metric.label}
        </span>
        {metric.hasDropdown && (
          <ChevronDownIcon size={12} color={isSelected ? ACCENT : TEXT_MID} />
        )}
        <span style={{ marginLeft: 'auto' }}>
          <InfoIcon size={12} color={TEXT_SUBTLE} />
        </span>
      </div>

      {/* Value */}
      <p style={{ fontSize: 18, fontWeight: 600, color: TEXT, margin: 0 }}>
        {metric.value}
      </p>
    </button>
  );
}
