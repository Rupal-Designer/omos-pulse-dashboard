import { useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';
import { InteractiveDashboard } from '../components/design-system/interactive-dashboard';
import { CampaignTable } from '../components/campaign-table';
import { PerformanceTable } from '../components/performance-table';
import { AIDebuggerPanel } from '../components/ai-debugger-panel';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';

// ── DashboardPage ─────────────────────────────────────────────────────────────
export default function DashboardPage({ activeAdType: propAdType, onAdTypeChange: propOnChange }) {
  const [localAdType, setLocalAdType] = useState('Product Ads');
  const [debugCampaign, setDebugCampaign] = useState(null);

  // Support both controlled (from App.jsx) and standalone usage
  const activeAdType = propAdType ?? localAdType;
  const handleAdTypeChange = (adType) => {
    setLocalAdType(adType);
    propOnChange && propOnChange(adType);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: BG_SUBTLE, fontFamily: FONT }}>
      <Sidebar onAdTypeChange={handleAdTypeChange} activeAdType={activeAdType} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 64, minWidth: 0 }}>
        {/* Sticky topbar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: BG }}>
          <Header activeAdType={activeAdType} />
        </div>

        {/* Main content — gap: 20 between all sections (ia-patterns.md §5) */}
        <main style={{
          flex: 1, overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex', flexDirection: 'column', gap: 20,
          background: BG_SUBTLE,
        }}>
          <InteractiveDashboard
            activeAdType={activeAdType}
            onAdTypeChange={handleAdTypeChange}
            initialSelectedMetrics={['CTR', 'Ad Clicks']}
          />
          <CampaignTable activeAdType={activeAdType} onDebugCampaign={setDebugCampaign} />
          <PerformanceTable />
        </main>
      </div>

      <AIDebuggerPanel
        open={!!debugCampaign}
        campaign={debugCampaign}
        onClose={() => setDebugCampaign(null)}
      />
    </div>
  );
}
