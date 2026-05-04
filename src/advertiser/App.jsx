import { useState, useEffect } from 'react';
import './globals.css'; // Tailwind v4 + v0 design tokens (advertiser-scoped)
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import DesignSystemPage from './pages/DesignSystemPage';
import BYOTDashboardPage from './pages/BYOTDashboardPage';
import BYOTCampaignDetailPage from './pages/BYOTCampaignDetailPage';
import CPCControlsPage from './pages/CPCControlsPage';
import CPMControlsPage from './pages/CPMControlsPage';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';

/**
 * Advertiser ("Beat") Console — root.
 *
 * Hand-rolled hash-router so URLs survive reload + back/forward,
 * matching the simple state-switch pattern used by the retailer app.
 *
 *   #/             → DashboardPage  (main campaign performance dashboard)
 *   #/home         → HomePage       (executive overview)
 *   #/design-system → DesignSystemPage (component gallery)
 *   #/byot         → BYOTDashboardPage (Bring Your Own Traffic)
 *
 * BYOT campaign detail is rendered inside BYOTDashboardPage via state
 * (not a separate route) to maintain the wizard-drawer context.
 */

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export default function App() {
  const [route, setRoute]           = useState(getRoute());
  const [activeAdType, setActiveAdType] = useState('Product Ads');
  // BYOT sub-navigation state (campaign detail is not a separate route)
  const [byotView, setByotView]     = useState('dashboard'); // 'dashboard' | 'detail'
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      // Reset BYOT sub-view when navigating away and back
      setByotView('dashboard');
      setSelectedCampaign(null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setByotView('detail');
  };

  const handleBackToBYOT = () => {
    setByotView('dashboard');
    setSelectedCampaign(null);
  };

  const renderPage = () => {
    // BYOT sub-routing
    if (route === '/byot') {
      if (byotView === 'detail' && selectedCampaign) {
        return (
          <BYOTCampaignDetailPage
            campaign={selectedCampaign}
            onBack={handleBackToBYOT}
          />
        );
      }
      return (
        <BYOTDashboardPage onViewCampaign={handleViewCampaign} />
      );
    }

    // Standard routes
    switch (route) {
      case '':
      case '/':
        return <DashboardPage activeAdType={activeAdType} onAdTypeChange={setActiveAdType} />;
      case '/home':
        return <HomePage />;
      case '/yield-control/cpc':
        return <CPCControlsPage />;
      case '/yield-control/cpm':
        return <CPMControlsPage />;
      case '/design-system':
        return <DesignSystemPage />;
      default:
        return <DashboardPage activeAdType={activeAdType} onAdTypeChange={setActiveAdType} />;
    }
  };

  // Pages that use the sidebar layout (most pages)
  const hasSidebar = route !== '/design-system';

  if (!hasSidebar) return renderPage();

  // DashboardPage and HomePage include their own Sidebar internally — don't wrap them
  if (route === '/' || route === '' || route === '/home') {
    return renderPage();
  }

  // BYOT and other new pages — add sidebar + header wrapper
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#edf0f5' }}>
      <Sidebar onAdTypeChange={setActiveAdType} activeAdType={activeAdType} onNavigate={(r) => { window.location.hash = r; }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--osmos-bg)' }}>
          <Header activeAdType={activeAdType} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
