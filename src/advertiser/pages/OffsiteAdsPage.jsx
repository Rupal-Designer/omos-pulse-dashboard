import { useState } from 'react';
import { OffisteCampaignsTable }    from '../components/offsite/OffisteCampaignsTable';
import { ChannelPerformanceReport } from '../components/offsite/ChannelPerformanceReport';
import { ProductsPerformance }      from '../components/offsite/ProductsPerformance';
import { PerformanceTrend }         from '../components/performance-trend';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT        = "'Open Sans', sans-serif";
const BLUE        = '#1970E1';
const BLUE_BG     = '#E8F1FC';
const GREY_TEXT   = '#404040';
const GREY_MID    = '#7B7B7B';
const GREY_BORDER = '#DEDEDE';
const GREY_SURF1  = '#FAFAFA';
const BG_PAGE     = '#EDF0F5';

// ── KPI metrics data (matching Figma prototype values) ────────────────────────
const KPI_METRICS = [
  { label: 'Ad Spend',      value: '0.28%',  hasDropdown: true },
  { label: 'Ad Impression', value: '7.9 B',  hasDropdown: true },
  { label: 'Ad Clicks',     value: '129 M',  hasDropdown: true },
  { label: 'Ad Revenue',    value: '$23.7 M',hasDropdown: true },
  { label: 'ROAS',          value: '12.73',  hasDropdown: true },
  { label: 'ROAS',          value: '$302 M', hasDropdown: true },
];

// ── OffsiteAdsPage ────────────────────────────────────────────────────────────
export default function OffsiteAdsPage() {
  const [selectedMetrics, setSelectedMetrics] = useState(['Ad Clicks', 'Ad Revenue']);
  const [sofieOpen, setSofieOpen]             = useState(false);

  const toggleMetric = (label) => {
    setSelectedMetrics(prev =>
      prev.includes(label)
        ? prev.filter(m => m !== label)
        : prev.length < 2 ? [...prev, label] : [prev[1], label]
    );
  };

  return (
    <main style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      background: BG_PAGE,
      fontFamily: FONT,
      minHeight: '100%',
    }}>

      {/* ── KPI Metrics Row ─────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {KPI_METRICS.map((metric, i) => (
          <MetricChip
            key={i}
            metric={metric}
            isSelected={selectedMetrics.includes(metric.label)}
            onClick={() => toggleMetric(metric.label)}
          />
        ))}
      </div>

      {/* ── Performance Trend + Sofie Panel ─────────────────────────────── */}
      <div style={{ position: 'relative', display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <PerformanceTrend
            activeAdType="Offsite Ads"
            selectedMetrics={selectedMetrics}
          />
        </div>

        {/* Sofie suggestions side tab */}
        <div style={{
          position: 'absolute', right: sofieOpen ? 0 : -4, top: 0,
          height: '100%', display: 'flex',
        }}>
          {sofieOpen ? (
            <div style={{
              width: 260, background: 'white', border: `1px solid ${GREY_BORDER}`,
              borderRadius: '0 8px 8px 0', padding: 16, fontSize: 13, color: GREY_MID,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: GREY_TEXT, fontSize: 14 }}>✨ Sofie Suggestions</span>
                <button onClick={() => setSofieOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: GREY_MID, fontSize: 16 }}>‹</button>
              </div>
              <div style={{ fontSize: 12, color: GREY_MID }}>999 Critical suggestions available</div>
            </div>
          ) : (
            <button onClick={() => setSofieOpen(true)} style={{
              writing: 'vertical-rl', textOrientation: 'mixed',
              background: BLUE, color: 'white', border: 'none',
              borderRadius: '0 6px 6px 0',
              padding: '16px 8px', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, fontFamily: FONT,
              writingMode: 'vertical-rl',
            }}>
              ✨ 999 Suggestions by Sofie (999 Critical)
            </button>
          )}
        </div>
      </div>

      {/* ── Campaigns Table ──────────────────────────────────────────────── */}
      <SectionCard>
        <OffisteCampaignsTable />
      </SectionCard>

      {/* ── Channel Performance Report ───────────────────────────────────── */}
      <SectionCard>
        <ChannelPerformanceReport />
      </SectionCard>

      {/* ── Products / Categories Performance ───────────────────────────── */}
      <SectionCard>
        <ProductsPerformance />
      </SectionCard>

    </main>
  );
}

// ── MetricChip ────────────────────────────────────────────────────────────────
function MetricChip({ metric, isSelected, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '12px 14px', borderRadius: 8,
        border: 'none', cursor: 'pointer', textAlign: 'left',
        fontFamily: FONT, transition: 'all 0.15s',
        background: isSelected ? BLUE_BG : hover ? '#F5F5F5' : 'white',
        outline: `1px solid ${isSelected ? BLUE : GREY_BORDER}`,
        boxShadow: isSelected ? `0 0 0 2px ${BLUE_BG}` : 'none',
      }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: isSelected ? BLUE : GREY_MID, fontWeight: isSelected ? 600 : 400 }}>
          {metric.label}
        </span>
        {metric.hasDropdown && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isSelected ? BLUE : GREY_MID} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        )}
        <span style={{ marginLeft: 'auto' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </span>
      </div>
      {/* Value */}
      <p style={{ fontSize: 20, fontWeight: 700, color: GREY_TEXT, margin: 0, lineHeight: 1.2 }}>
        {metric.value}
      </p>
    </button>
  );
}

// ── SectionCard (white card wrapper) ─────────────────────────────────────────
function SectionCard({ children }) {
  return (
    <div style={{
      background: 'white', borderRadius: 8,
      border: `1px solid ${GREY_BORDER}`,
      padding: '16px 20px',
    }}>
      {children}
    </div>
  );
}
