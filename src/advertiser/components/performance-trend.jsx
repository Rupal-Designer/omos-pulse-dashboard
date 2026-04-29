import { Icon, InfoIcon, DownloadIcon } from '../../ui';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT       = "'Open Sans', sans-serif";
const BG         = 'var(--osmos-bg)';
const BG_SUBTLE  = 'var(--osmos-bg-subtle)';
const BORDER     = 'var(--osmos-border)';
const TEXT       = 'var(--osmos-fg)';
const TEXT_MID   = 'var(--osmos-fg-muted)';
const ACCENT     = 'var(--osmos-brand-primary)';
const GREEN      = 'var(--osmos-brand-green)';
const AMBER      = 'var(--osmos-brand-amber)';
const AI_COLOR   = '#8b5cf6';
const AI_BG      = 'rgba(124,58,237,0.12)';

// ── Hand-rolled Sparkles icon ─────────────────────────────────────────────────
const SparklesIcon = ({ size = 14, color = AI_COLOR }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

// ── Mock data ────────────────────────────────────────────────────────────────
const performanceData = {
  'Product Ads': {
    chartData: [
      { date: '05/08', ctr: 2,   clicks: 2,   impressions: 45,  conversions: 1.2, spend: 850 },
      { date: '05/08', ctr: 3,   clicks: 2.5, impressions: 52,  conversions: 1.5, spend: 920 },
      { date: '05/08', ctr: 4,   clicks: 3,   impressions: 58,  conversions: 1.8, spend: 1050 },
      { date: '05/08', ctr: 3.5, clicks: 4,   impressions: 65,  conversions: 2.1, spend: 1200 },
      { date: '05/08', ctr: 3,   clicks: 8,   impressions: 72,  conversions: 2.5, spend: 1380 },
      { date: '05/08', ctr: 2.5, clicks: 6,   impressions: 68,  conversions: 2.2, spend: 1250 },
      { date: '05/08', ctr: 2,   clicks: 3,   impressions: 55,  conversions: 1.6, spend: 980 },
    ],
    metrics: {
      CTR:         { value: '1.58%',    color: '#4bae4f' },   // green
      'Ad Clicks': { value: '730.2 K',  color: '#ef6c00' },   // amber/orange
      Impressions: { value: '2.5 M',    color: '#1976d2' },   // blue
      Conversions: { value: '15.2 K',   color: '#7c3aed' },   // violet
      Spend:       { value: '$8,920',   color: '#d32f2f' },   // red
    },
  },
  'Display Ads': {
    chartData: [
      { date: '05/08', ctr: 1.5, clicks: 1.8, impressions: 35,  conversions: 0.8, spend: 650 },
      { date: '05/08', ctr: 2.2, clicks: 2.3, impressions: 42,  conversions: 1.1, spend: 720 },
      { date: '05/08', ctr: 3.8, clicks: 4.1, impressions: 58,  conversions: 1.5, spend: 950 },
      { date: '05/08', ctr: 4.5, clicks: 5.2, impressions: 72,  conversions: 2.2, spend: 1150 },
      { date: '05/08', ctr: 5.2, clicks: 6.8, impressions: 85,  conversions: 2.8, spend: 1380 },
      { date: '05/08', ctr: 4.8, clicks: 7.5, impressions: 92,  conversions: 3.1, spend: 1520 },
      { date: '05/08', ctr: 3.9, clicks: 5.2, impressions: 75,  conversions: 2.5, spend: 1280 },
    ],
    metrics: {
      CTR:         { value: '3.21%',    color: '#4bae4f' },
      'Ad Clicks': { value: '2.1 M',    color: '#ef6c00' },
      Impressions: { value: '5.8 M',    color: '#1976d2' },
      Conversions: { value: '42.5 K',   color: '#7c3aed' },
      Spend:       { value: '$12,580',  color: '#d32f2f' },
    },
  },
  'Offsite Ads': {
    chartData: [
      { date: '05/08', ctr: 12, clicks: 6,    impressions: 120, conversions: 8.5,  spend: 2100 },
      { date: '05/08', ctr: 15, clicks: 7.5,  impressions: 145, conversions: 10.2, spend: 2450 },
      { date: '05/08', ctr: 18, clicks: 8.2,  impressions: 168, conversions: 12.1, spend: 2850 },
      { date: '05/08', ctr: 22, clicks: 9.5,  impressions: 192, conversions: 14.8, spend: 3250 },
      { date: '05/08', ctr: 20, clicks: 10.2, impressions: 185, conversions: 13.9, spend: 3100 },
      { date: '05/08', ctr: 19, clicks: 8.8,  impressions: 172, conversions: 12.5, spend: 2900 },
      { date: '05/08', ctr: 17, clicks: 7.9,  impressions: 155, conversions: 11.2, spend: 2650 },
    ],
    metrics: {
      CTR:         { value: '19.7%',    color: '#4bae4f' },
      'Ad Clicks': { value: '8.9 M',    color: '#ef6c00' },
      Impressions: { value: '18.5 M',   color: '#1976d2' },
      Conversions: { value: '125.8 K',  color: '#7c3aed' },
      Spend:       { value: '$28,300',  color: '#d32f2f' },
    },
  },
};

// chart colors are intentional brand assignments per metric — kept as hex
const metricKeyMap = {
  CTR: 'ctr', 'Ad Clicks': 'clicks', Impressions: 'impressions',
  Conversions: 'conversions', Spend: 'spend',
};
const metricColors = {
  CTR: '#4bae4f', 'Ad Clicks': '#ef6c00', Impressions: '#1976d2',
  Conversions: '#7c3aed', Spend: '#d32f2f',
};

// ── PerformanceTrend ──────────────────────────────────────────────────────────
export function PerformanceTrend({
  activeAdType    = 'Product Ads',
  selectedMetrics = ['CTR', 'Ad Clicks'],
}) {
  const adData              = performanceData[activeAdType] || performanceData['Product Ads'];
  const { chartData, metrics } = adData;
  const hasMetrics          = selectedMetrics && selectedMetrics.length > 0;

  const renderTrendLines = () =>
    selectedMetrics.map((metric, index) => {
      const dataKey = metricKeyMap[metric];
      if (!dataKey) return null;
      const yAxisId = index === 0 ? 'left' : index === 1 ? 'right' : `axis-${index}`;
      return (
        <Line
          key={metric}
          yAxisId={yAxisId}
          type="monotone"
          dataKey={dataKey}
          stroke={metricColors[metric]}
          strokeWidth={2}
          dot={false}
          isAnimationActive
        />
      );
    });

  const renderYAxes = () => {
    const axes = [];
    for (let i = 0; i < selectedMetrics.length && i < 5; i++) {
      const isLeft  = i === 0;
      const isRight = i === 1;
      const yAxisId = isLeft ? 'left' : isRight ? 'right' : `axis-${i}`;
      const orient  = isLeft ? 'left' : isRight ? 'right' : i < 3 ? 'left' : 'right';
      axes.push(
        <YAxis
          key={`y-axis-${i}`}
          yAxisId={yAxisId}
          orientation={orient}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#7b7b7b' }}
          domain={[0, 'auto']}
          width={i > 1 ? 40 : 50}
        />,
      );
    }
    return axes;
  };

  return (
    <div style={{
      borderRadius: 8, border: `1px solid ${BORDER}`, padding: 16,
      position: 'relative', transition: 'all 0.3s',
      backgroundColor: BG, fontFamily: FONT,
    }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* AI indicator dot */}
          <div style={{
            width: 24, height: 24, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: AI_BG,
          }}>
            <SparklesIcon size={14} color={AI_COLOR} />
          </div>
          <span style={{ fontWeight: 500, color: TEXT }}>Performance Trend</span>
          <InfoIcon size={14} color={TEXT_MID} />
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* D/W/M granularity toggle */}
          <div style={{
            display: 'flex', border: `1px solid ${BORDER}`,
            borderRadius: 8, overflow: 'hidden',
          }}>
            {['D', 'W', 'M'].map((period, i) => (
              <button
                key={period}
                style={{
                  padding: '6px 12px', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: i === 0 ? 500 : 400, fontFamily: FONT,
                  backgroundColor: i === 0 ? BG_SUBTLE : 'transparent',
                  color: i === 0 ? TEXT : TEXT_MID,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (i !== 0) e.currentTarget.style.opacity = '0.8'; }}
                onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.opacity = '1'; }}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Download */}
          <button style={{
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${BORDER}`, borderRadius: 8,
            background: 'transparent', cursor: 'pointer',
          }}>
            <DownloadIcon size={14} color={TEXT_MID} />
          </button>
        </div>
      </div>

      {/* ── Chart (fades in/out with selectedMetrics) ── */}
      <div style={{
        transition: 'all 0.3s', overflow: 'hidden',
        opacity: hasMetrics ? 1 : 0,
        maxHeight: hasMetrics ? 300 : 0,
      }}>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#efefef" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#7b7b7b' }}
              />
              {renderYAxes()}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#354a67', border: 'none',
                  borderRadius: 8, padding: '8px 12px',
                }}
                labelStyle={{ color: '#fff', fontSize: 12 }}
                itemStyle={{ color: '#fff', fontSize: 12 }}
                formatter={(value, name) => {
                  const label = Object.entries(metricKeyMap).find(([_, k]) => k === name)?.[0] || name;
                  if (name === 'ctr')         return [`${value.toFixed(2)}%`, label];
                  if (name === 'impressions' || name === 'conversions')
                                              return [`${(value * 1000).toFixed(0)}`, label];
                  if (name === 'spend')       return [`$${value.toFixed(0)}`, label];
                  return [value.toFixed(1), label];
                }}
              />
              {renderTrendLines()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Legend ── */}
      {hasMetrics && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          marginTop: 16, marginLeft: 40, flexWrap: 'wrap',
        }}>
          {selectedMetrics.map((metric) => (
            <div key={metric} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 12, height: 12, borderRadius: 2,
                backgroundColor: metricColors[metric],
              }} />
              <span style={{ fontSize: 12, color: TEXT_MID }}>{metric}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>
                {metrics[metric]?.value || '-'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
