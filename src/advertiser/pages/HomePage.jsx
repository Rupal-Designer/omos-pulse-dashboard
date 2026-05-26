import { useState } from 'react';
import { Icon, EyeIcon, StatCard } from '../../ui';
import { Sidebar } from '../components/sidebar';
import { Header }  from '../components/header';

// chart/icon brand colors — intentional hex assignments, not osmos semantic tokens
const C_RED    = '#d32f2f';
const C_BLUE   = '#636CFF';  // 'var(--osmos-brand-primary)' hex equivalent
const C_ORANGE = '#ef6c00';
const C_GREEN  = '#1BA87A';  // 'var(--osmos-brand-green)' hex equivalent
const C_VIOLET = 'var(--osmos-brand-violet)';

// ── Hand-rolled icons ─────────────────────────────────────────────────────────
const TrendingUpIcon = ({ size = 18, color }) => (
  <Icon size={size} color={color}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>
);

const DollarSignIcon = ({ size = 20, color }) => (
  <Icon size={size} color={color}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

const MousePointerClickIcon = ({ size = 20, color }) => (
  <Icon size={size} color={color}>
    <path d="M14 4.1 12 6" />
    <path d="m5.1 8-2.9-.8" />
    <path d="m6 12-1.9 2" />
    <path d="M7.2 2.2 8 5.1" />
    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041-1.041 4.35a.5.5 0 0 1-.949.074z" />
  </Icon>
);

const ShoppingCartIcon = ({ size = 18, color }) => (
  <Icon size={size} color={color}>
    <circle cx="8"  cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Icon>
);

const BarChart3Icon = ({ size = 18, color }) => (
  <Icon size={size} color={color}>
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6"  x2="6"  y1="20" y2="14" />
  </Icon>
);

// ── HomePage ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeAdType, setActiveAdType] = useState('Product Ads');

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--osmos-bg-subtle)', fontFamily: "'Open Sans', sans-serif" }}>
      <Sidebar onAdTypeChange={setActiveAdType} activeAdType={activeAdType} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky topbar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: 'var(--osmos-bg)' }}>
          <Header activeAdType={activeAdType} />
        </div>

        <main style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ── Welcome header ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--osmos-fg)' }}>Dashboard Overview</h1>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--osmos-fg-muted)' }}>Unified view of all advertising campaigns performance</p>
            </div>
            <a
              href="/"
              style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid var(--osmos-brand-primary)`, backgroundColor: 'var(--osmos-brand-primary)', color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: "'Open Sans', sans-serif" }}
            >
              View Detailed Reports
            </a>
          </div>

          {/* ── Key Metrics — 4-column grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <StatCard label="Total Spend"       value="$45.6M" trend="+12.3%" trendDir="up" icon={<DollarSignIcon        size={20} color={C_RED}    />} iconColor={C_RED    + '20'} />
            <StatCard label="Total Impressions"  value="68.6M"  trend="+8.7%"  trendDir="up" icon={<EyeIcon               size={20} color={C_BLUE}   />} iconColor={C_BLUE   + '20'} />
            <StatCard label="Total Clicks"       value="18.3M"  trend="+15.2%" trendDir="up" icon={<MousePointerClickIcon size={20} color={C_ORANGE} />} iconColor={C_ORANGE + '20'} />
            <StatCard label="Conversions"        value="183.5K" trend="+9.8%"  trendDir="up" icon={<ShoppingCartIcon      size={20} color={C_GREEN}  />} iconColor={C_GREEN  + '20'} />
          </div>

          {/* ── Ad Type Performance — 2-column grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <AdTypePerformanceCard
              adType="Product Ads" color={C_BLUE}
              icon={<ShoppingCartIcon size={18} color={C_BLUE} />}
              metrics={{ spend: '$7.3M', impressions: '7.3M', clicks: '730K', ctr: '2.0%' }}
              trend={[2, 3, 4, 3.5, 3, 2.5, 2]}
            />
            <AdTypePerformanceCard
              adType="Display Ads" color={C_VIOLET}
              icon={<BarChart3Icon size={18} color={C_VIOLET} />}
              metrics={{ spend: '$12.5M', impressions: '15.8M', clicks: '2.1M', ctr: '3.2%' }}
              trend={[1.5, 2.2, 3.8, 4.5, 5.2, 4.8, 3.9]}
            />
            <AdTypePerformanceCard
              adType="Offsite Ads" color={C_ORANGE}
              icon={<TrendingUpIcon size={18} color={C_ORANGE} />}
              metrics={{ spend: '$24.8M', impressions: '45.2M', clicks: '8.9M', ctr: '19.7%' }}
              trend={[12, 15, 18, 22, 20, 19, 17]}
            />
            <AdTypePerformanceCard
              adType="In-Store Digital" color={C_GREEN}
              icon={<EyeIcon size={18} color={C_GREEN} />}
              metrics={{ spend: '$595K', impressions: '2.3M', clicks: '145K', ctr: '6.3%' }}
              trend={[4, 5, 6, 5.5, 6.5, 7, 6.3]}
            />
          </div>

          {/* ── Top Performing Campaigns ── */}
          <div style={{ borderRadius: 8, border: `1px solid var(--osmos-border)`, padding: 24, backgroundColor: 'var(--osmos-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)' }}>Top Performing Campaigns</h2>
              <a href="/" style={{ fontSize: 13, color: 'var(--osmos-brand-primary)', textDecoration: 'none', fontFamily: "'Open Sans', sans-serif" }}>View All →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CampaignRow name="Meta - Spring Collection Launch" adType="Offsite Ads"  spend="$2.5M"  roas="4.2x" status="active" />
              <CampaignRow name="Google - Search Campaign Q4"     adType="Offsite Ads"  spend="$3.8M"  roas="3.8x" status="active" />
              <CampaignRow name="Banner - Homepage Takeover"      adType="Display Ads"  spend="$500K"  roas="3.5x" status="active" />
              <CampaignRow name="Holiday Gift Guide"              adType="Product Ads"  spend="$350K"  roas="3.2x" status="active" />
            </div>
          </div>

          {/* ── Budget + Platform — 2-column grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {/* Budget Utilization */}
            <div style={{ borderRadius: 8, border: `1px solid var(--osmos-border)`, padding: 24, backgroundColor: 'var(--osmos-bg)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)' }}>Budget Utilization</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <BudgetBar label="Product Ads"      used={85} color={C_BLUE}   />
                <BudgetBar label="Display Ads"      used={72} color={C_VIOLET} />
                <BudgetBar label="Offsite Ads"      used={93} color={C_ORANGE} />
                <BudgetBar label="In-Store Digital" used={68} color={C_GREEN}  />
              </div>
            </div>

            {/* Performance by Platform */}
            <div style={{ borderRadius: 8, border: `1px solid var(--osmos-border)`, padding: 24, backgroundColor: 'var(--osmos-bg)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)' }}>Performance by Platform</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PlatformRow platform="Meta"     spend="$15.2M" impressions="42.3M" ctr="18.5%" />
                <PlatformRow platform="Google"   spend="$18.8M" impressions="38.9M" ctr="16.2%" />
                <PlatformRow platform="TikTok"   spend="$4.2M"  impressions="12.5M" ctr="14.8%" />
                <PlatformRow platform="In-Store" spend="$595K"  impressions="2.3M"  ctr="6.3%"  />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

// MetricCard — replaced by StatCard from src/ui (with icon + trend props)

// ── AdTypePerformanceCard ─────────────────────────────────────────────────────
function AdTypePerformanceCard({ adType, icon, metrics, trend, color }) {
  const max    = Math.max(...trend);
  const points = trend.map((v, i) => {
    const x = (i / (trend.length - 1)) * 100;
    const y = 100 - (v / max) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ borderRadius: 8, border: `1px solid var(--osmos-border)`, padding: 20, backgroundColor: 'var(--osmos-bg)', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color + '20' }}>
            {icon}
          </div>
          <h3 style={{ margin: 0, fontWeight: 600, color: 'var(--osmos-fg)' }}>{adType}</h3>
        </div>
        <a href={`/?adType=${adType}`} style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', textDecoration: 'none', fontFamily: "'Open Sans', sans-serif" }}>View Details →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
        {[['Spend', metrics.spend], ['Impressions', metrics.impressions], ['Clicks', metrics.clicks], ['CTR', metrics.ctr]].map(([lbl, val]) => (
          <div key={lbl}>
            <p style={{ margin: '0 0 2px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{lbl}</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)' }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Mini sparkline */}
      <svg width="100%" height={48} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
}

// ── CampaignRow ───────────────────────────────────────────────────────────────
function CampaignRow({ name, adType, spend, roas, status }) {
  const isActive = status === 'active';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, border: `1px solid var(--osmos-border)`, backgroundColor: 'var(--osmos-bg-subtle)', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 500, color: 'var(--osmos-fg)' }}>{name}</p>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{adType}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13 }}>
        <div>
          <p style={{ margin: '0 0 2px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>Spend</p>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--osmos-fg)' }}>{spend}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 2px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>ROAS</p>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--osmos-brand-green)' }}>{roas}</p>
        </div>
        <div style={{
          padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500,
          backgroundColor: isActive ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-brand-amber-muted)',
          color: isActive ? 'var(--osmos-brand-green)' : 'var(--osmos-brand-amber)',
        }}>
          {status}
        </div>
      </div>
    </div>
  );
}

// ── BudgetBar ─────────────────────────────────────────────────────────────────
function BudgetBar({ label, used, color }) {
  const pct = used;
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{pct}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, overflow: 'hidden', backgroundColor: 'var(--osmos-bg-muted)' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, backgroundColor: color, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

// ── PlatformRow ───────────────────────────────────────────────────────────────
function PlatformRow({ platform, spend, impressions, ctr }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, backgroundColor: 'var(--osmos-bg-subtle)', fontFamily: "'Open Sans', sans-serif" }}>
      <span style={{ fontWeight: 500, color: 'var(--osmos-fg)' }}>{platform}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12 }}>
        <div>
          <span style={{ color: 'var(--osmos-fg-muted)' }}>Spend: </span>
          <span style={{ fontWeight: 600, color: 'var(--osmos-fg)' }}>{spend}</span>
        </div>
        <div>
          <span style={{ color: 'var(--osmos-fg-muted)' }}>Impressions: </span>
          <span style={{ fontWeight: 600, color: 'var(--osmos-fg)' }}>{impressions}</span>
        </div>
        <div>
          <span style={{ color: 'var(--osmos-fg-muted)' }}>CTR: </span>
          <span style={{ fontWeight: 600, color: 'var(--osmos-brand-green)' }}>{ctr}</span>
        </div>
      </div>
    </div>
  );
}
