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
import LiveAnalyticsPage from './components/LiveAnalyticsPage';
import DemandSupplyPage from './components/DemandSupplyPage';
import AdvertiserInsightsPage from './components/AdvertiserInsightsPage';
import SegmentManagerPage from './components/SegmentManagerPage';
import ScheduledReportsPage from './components/ScheduledReportsPage';
import HealthReportPage from './components/HealthReportPage';
import SellerAdvertiserOnboardingPage from './components/SellerAdvertiserOnboardingPage';
import BrandAdvertiserOnboardingPage from './components/BrandAdvertiserOnboardingPage';
import SuperAdminUsersPage from './components/SuperAdminUsersPage';
import OpsUsersPage from './components/OpsUsersPage';
import AdvertiserUsersPage from './components/AdvertiserUsersPage';
import ActivityLogPage from './components/ActivityLogPage';
import PersonaConfigPage from './components/PersonaConfigPage';
import PersonaAllocationPage from './components/PersonaAllocationPage';
import WalletRulesPage from './components/WalletRulesPage';
import FinanceDashboardPage from './components/FinanceDashboardPage';
import WalletTopUpPage from './components/WalletTopUpPage';
import FinanceAdvertiserManagementPage from './components/FinanceAdvertiserManagementPage';
import CampaignBudgetDrawer from './components/CampaignBudgetDrawer';

/* ── Analytics dashboard (the original page) ─────────────────── */
function AnalyticsDashboard({ bare = false }) {
  if (bare) {
    return (
      <div style={{ padding: '24px', fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg-muted)', fontSize: 14 }}>
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
  const [activePage, setActivePage] = useState('campaign-budget');

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'control-center':
        return <AdvertisersPage />;
      case 'manage-segments':
        return (
          <>
            <TopBar section="Control Center" page="Segment Manager" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <SegmentManagerPage />
            </main>
          </>
        );
      case 'advertiser-insights':
        return (
          <>
            <TopBar section="Analytics" page="Advertiser Insights" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <AdvertiserInsightsPage />
            </main>
          </>
        );
      case 'live-insights':
        return (
          <>
            <TopBar section="Analytics" page="Live Insights" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <LiveAnalyticsPage />
            </main>
          </>
        );
      case 'demand-supply':
        return (
          <>
            <TopBar section="Analytics" page="Demand & Supply" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <DemandSupplyPage />
            </main>
          </>
        );
      case 'scheduled-reports':
        return (
          <>
            <TopBar section="Analytics" page="Scheduled Reports" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <ScheduledReportsPage />
            </main>
          </>
        );
      case 'bu-analytics':
        return (
          <>
            <TopBar section="Analytics" page="BU Analytics" />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <AnalyticsDashboard bare />
            </main>
          </>
        );
      case 'brand-onboarding':
        return (
          <>
            <TopBar section="Control Center" page="Brand Advertiser Onboarding" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <BrandAdvertiserOnboardingPage />
            </main>
          </>
        );
      case 'seller-onboarding':
        return (
          <>
            <TopBar section="Control Center" page="Seller Advertiser Onboarding" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <SellerAdvertiserOnboardingPage />
            </main>
          </>
        );
      case 'super-admin':
        return (
          <>
            <TopBar section="Control Center" page="Super Admin Users" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <SuperAdminUsersPage />
            </main>
          </>
        );
      case 'ops-users':
        return (
          <>
            <TopBar section="Control Center" page="Ops Users" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <OpsUsersPage />
            </main>
          </>
        );
      case 'advertiser-users':
        return (
          <>
            <TopBar section="Control Center" page="Advertiser Users" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <AdvertiserUsersPage />
            </main>
          </>
        );
      case 'activity-log':
      case 'event-logs':
      case 'product-ads-request-logs':
      case 'display-ads-request-logs':
        return (
          <>
            <TopBar section="Control Center" page="Activity Log" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <ActivityLogPage />
            </main>
          </>
        );
      case 'persona-config':
        return (
          <>
            <TopBar section="Control Center" page="Persona Configuration" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <PersonaConfigPage />
            </main>
          </>
        );
      case 'persona-allocation':
        return (
          <>
            <TopBar section="Control Center" page="Advertiser Persona Allocation" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <PersonaAllocationPage />
            </main>
          </>
        );
      case 'wallet-rules':
        return (
          <>
            <TopBar section="Control Center" page="Wallet Rules" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <WalletRulesPage />
            </main>
          </>
        );
      case 'finance-dashboard':
        return (
          <>
            <TopBar section="Finance" page="Finance Dashboard" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <FinanceDashboardPage />
            </main>
          </>
        );
      case 'wallet-topup':
        return (
          <>
            <TopBar section="Finance" page="Wallet Top Up" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <WalletTopUpPage />
            </main>
          </>
        );
      case 'campaign-budget':
        return (
          <>
            <TopBar section="Campaigns" page="Campaign Budget" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)', position: 'relative' }}>
              <CampaignBudgetDrawer onClose={() => setActivePage('advertiser-insights')} />
            </main>
          </>
        );
      case 'finance-advertisers':
        return (
          <>
            <TopBar section="Finance" page="Advertiser Management" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <FinanceAdvertiserManagementPage />
            </main>
          </>
        );
      case 'overview':
      case 'budget-health':
      case 'delivery-health':
        return (
          <>
            <TopBar section="Health" page="Health Report" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <HealthReportPage />
            </main>
          </>
        );
      default:
        return <AnalyticsDashboard />;
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--osmos-bg-subtle)' }}>
      <LeftNav activePage={activePage} onPageChange={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {renderPage()}
      </div>
    </div>
  );
}
