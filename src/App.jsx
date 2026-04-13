import React, { useState } from 'react';
import LeftNav from './components/LeftNav';
import TopBar from './components/TopBar';
import StatCards from './components/StatCards';
import Charts from './components/Charts';
import CampaignsTable from './components/CampaignsTable';
import DeviceTable from './components/DeviceTable';
import ReferrerTable from './components/ReferrerTable';
import GeoTable from './components/GeoTable';
import HomePage from './components/HomePage';
import AdvertisersPage from './components/AdvertisersPage';
import AdvertiserInsightsPage from './components/AdvertiserInsightsPage';

/* ── Analytics dashboard (the original page) ─────────────────── */
function AnalyticsDashboard({ bare = false }) {
  if (bare) {
    return (
      <div style={{ padding: '24px', fontFamily: "'Open Sans', sans-serif", color: '#7B7B7B', fontSize: 14 }}>
        Page coming soon…
      </div>
    );
  }
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <TopBar section="Analytics" page="Sponsored Ads" />
      <main style={{ flex: 1, padding: '24px 24px 40px', overflowY: 'auto' }}>
        <StatCards />
        <Charts />
        <CampaignsTable />
        <DeviceTable />
        <ReferrerTable />
        <GeoTable />
      </main>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState('advertiser-insights');

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'control-center':
        return <AdvertisersPage />;
      case 'advertiser-insights':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TopBar section="Analytics" page="Advertiser Insights" />
            <main style={{ flex: 1, overflowY: 'auto', background: '#EDF0F5' }}>
              <AdvertiserInsightsPage />
            </main>
          </div>
        );
      case 'live-insights':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TopBar section="Analytics" page="Live Insights" />
            <main style={{ flex: 1, overflowY: 'auto', background: '#EDF0F5' }}>
              <AnalyticsDashboard bare />
            </main>
          </div>
        );
      case 'scheduled-reports':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TopBar section="Analytics" page="Scheduled Reports" />
            <main style={{ flex: 1, overflowY: 'auto', background: '#EDF0F5' }}>
              <AnalyticsDashboard bare />
            </main>
          </div>
        );
      case 'bu-analytics':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <TopBar section="Analytics" page="BU Analytics" />
            <main style={{ flex: 1, overflowY: 'auto', background: '#EDF0F5' }}>
              <AnalyticsDashboard bare />
            </main>
          </div>
        );
      default:
        return <AnalyticsDashboard />;
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EDF0F5' }}>
      <LeftNav activePage={activePage} onPageChange={setActivePage} />
      {renderPage()}
    </div>
  );
}
