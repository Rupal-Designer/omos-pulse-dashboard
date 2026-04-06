import React from 'react';
import LeftNav from './components/LeftNav';
import TopBar from './components/TopBar';
import StatCards from './components/StatCards';
import Charts from './components/Charts';
import CampaignsTable from './components/CampaignsTable';
import DeviceTable from './components/DeviceTable';
import ReferrerTable from './components/ReferrerTable';
import GeoTable from './components/GeoTable';

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EDF0F5' }}>
      {/* Sidebar */}
      <LeftNav />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar />

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px 24px 40px', overflowY: 'auto' }}>
          <StatCards />
          <Charts />
          <CampaignsTable />
          <DeviceTable />
          <ReferrerTable />
          <GeoTable />
        </main>
      </div>
    </div>
  );
}
