import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  KPIChip, Button, useToast, Toast, Toolbar,
  DownloadIcon, PlusIcon, RefreshIcon,
} from '../../ui';
import { DataTable } from '../components/design-system/tables';
import { PerformanceTrend } from '../components/performance-trend';
import OffsiteCampaignWizard from '../components/offsite-wizard/OffsiteCampaignWizard';

const RED      = '#EF4444';

// ── Mock data ─────────────────────────────────────────────────────────────────
const KPI_DATA = [
  { label: 'Ad Spend',       value: '₹24.6L' },
  { label: 'Ad Impressions', value: '4.2M'   },
  { label: 'Ad Clicks',      value: '82.4K'  },
  { label: 'Ad Revenue',     value: '₹1.8Cr' },
  { label: 'ROAS',           value: '7.3×'   },
  { label: 'Blended ROAS',   value: '5.1×'   },
];

const CHANNELS = ['All', 'Meta', 'Google', 'TikTok', 'Snapchat', 'YouTube', 'DV-360'];

const CHANNEL_COLORS = {
  Meta: '#1877F2', Google: '#EA4335', TikTok: '#000000',
  Snapchat: '#FFFC00', YouTube: '#FF0000', 'DV-360': '#4285F4',
};

const STATUS_CONFIG = {
  Active:         { color: 'var(--osmos-brand-green)', icon: '●' },
  Paused:         { color: 'var(--osmos-brand-amber)', icon: '⏸' },
  Draft:          { color: 'var(--osmos-fg-subtle)', icon: '■' },
  Rejected:       { color: RED, icon: '⚠' },
  Delivered:      { color: 'var(--osmos-brand-green)', icon: '✓' },
  'Under Review': { color: 'var(--osmos-brand-amber)', icon: '🔍' },
};

const MOCK_CAMPAIGNS = [
  { id: 1, status: 'Active',       name: 'Summer Sale — Apparel',      channel: 'Meta',     objective: 'Sales',     budget: '₹5,000',  spend: '₹4,230',  roas: '8.2×',  ctr: '3.4%', impressions: '980K',  lastUpdated: '2026-05-06' },
  { id: 2, status: 'Active',       name: 'Brand Awareness Q2',         channel: 'Google',   objective: 'Awareness', budget: '₹8,000',  spend: '₹6,100',  roas: '5.1×',  ctr: '2.1%', impressions: '1.2M',  lastUpdated: '2026-05-05' },
  { id: 3, status: 'Paused',       name: 'Electronics Retargeting',    channel: 'Meta',     objective: 'Sales',     budget: '₹3,500',  spend: '₹1,800',  roas: '4.6×',  ctr: '1.8%', impressions: '450K',  lastUpdated: '2026-05-04' },
  { id: 4, status: 'Draft',        name: 'TikTok Gifting Campaign',    channel: 'TikTok',   objective: 'Reach',     budget: '₹4,000',  spend: '—',        roas: '—',     ctr: '—',    impressions: '—',     lastUpdated: '2026-05-03' },
  { id: 5, status: 'Delivered',    name: 'Diwali Flash Sale',          channel: 'Meta',     objective: 'Sales',     budget: '₹12,000', spend: '₹11,980', roas: '11.4×', ctr: '5.2%', impressions: '2.1M',  lastUpdated: '2026-04-30' },
  { id: 6, status: 'Under Review', name: 'Snap Story — New Arrivals',  channel: 'Snapchat', objective: 'Traffic',   budget: '₹2,500',  spend: '₹800',    roas: '3.2×',  ctr: '1.2%', impressions: '210K',  lastUpdated: '2026-04-28' },
  { id: 7, status: 'Active',       name: 'YouTube Pre-roll Skincare',  channel: 'YouTube',  objective: 'Awareness', budget: '₹6,000',  spend: '₹5,420',  roas: '6.8×',  ctr: '2.9%', impressions: '880K',  lastUpdated: '2026-05-01' },
  { id: 8, status: 'Rejected',     name: 'DV360 Programmatic Test',    channel: 'DV-360',   objective: 'Reach',     budget: '₹10,000', spend: '—',        roas: '—',     ctr: '—',    impressions: '—',     lastUpdated: '2026-04-25' },
];

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { color: 'var(--osmos-fg-subtle)', icon: '●' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 500, color: cfg.color }}>
      <span style={{ fontSize: 10 }}>{cfg.icon}</span>
      {status}
    </span>
  );
}

// ── ChannelBadge ──────────────────────────────────────────────────────────────
function ChannelBadge({ channel }) {
  const color = CHANNEL_COLORS[channel] || 'var(--osmos-brand-primary)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
      borderRadius: 20, border: `1px solid ${color}33`, background: `${color}11`,
      fontSize: 11, fontWeight: 600, color, fontFamily: "'Open Sans', sans-serif",
    }}>
      {channel}
    </span>
  );
}

// ── RowActions ────────────────────────────────────────────────────────────────
function RowActions({ row }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <Button variant="outline">Edit</Button>
      <Button variant="outline">
        {row.status === 'Active' ? 'Pause' : 'Resume'}
      </Button>
    </div>
  );
}

// ── BulkActionBar ─────────────────────────────────────────────────────────────
function BulkActionBar({ count, onClear }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
      background: `var(--osmos-brand-primary)0D`, border: `1px solid var(--osmos-brand-primary)33`, borderRadius: 8,
      marginBottom: 8, fontFamily: "'Open Sans', sans-serif",
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-brand-primary)', flexShrink: 0 }}>{count} selected</span>
      <div style={{ flex: 1, display: 'flex', gap: 6 }}>
        {['Pause', 'Resume', 'Duplicate', 'Archive'].map(action => (
          <Button key={action} variant="outline">{action}</Button>
        ))}
      </div>
      <Button variant="ghost" onClick={onClear}>Clear</Button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OffsiteDashboardPage() {
  const [activeChannel, setActiveChannel] = useState('All');
  const [selectedRows, setSelectedRows]   = useState([]);
  const [wizardOpen, setWizardOpen]       = useState(false);
  const [campaigns, setCampaigns]         = useState(MOCK_CAMPAIGNS);
  const { showToast }                     = useToast();

  const filteredCampaigns = activeChannel === 'All'
    ? campaigns
    : campaigns.filter(c => c.channel === activeChannel);

  const TABLE_COLUMNS = [
    { key: 'status',      label: 'Status',       width: 130, render: (v) => <StatusBadge status={v} /> },
    { key: 'name',        label: 'Campaign Name', width: 200 },
    { key: 'channel',     label: 'Channel',       width: 110, render: (v) => <ChannelBadge channel={v} /> },
    { key: 'objective',   label: 'Objective',     width: 100 },
    { key: 'budget',      label: 'Daily Budget',  width: 110 },
    { key: 'spend',       label: 'Ad Spend',      width: 100 },
    { key: 'roas',        label: 'ROAS',          width: 80  },
    { key: 'ctr',         label: 'CTR',           width: 70  },
    { key: 'impressions', label: 'Impressions',   width: 100 },
    { key: '_actions',    label: '',              width: 130, render: (_, row) => <RowActions row={row} /> },
  ];

  function handleLaunch(campaignData) {
    const newCampaign = {
      id: Date.now(),
      status: 'Active',
      name: campaignData.campaignName || `Meta · ${campaignData.channels?.[0]?.objective || 'Sales'} · ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`,
      channel: 'Meta',
      objective: campaignData.channels?.[0]?.objective || 'Sales',
      budget: campaignData.budget?.dailyBudget ? `₹${Number(campaignData.budget.dailyBudget).toLocaleString('en-IN')}` : '₹5,000',
      spend: '₹0',
      roas: '—',
      ctr: '—',
      impressions: '—',
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setWizardOpen(false);
    showToast('Campaign launched successfully', 'success');
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'Open Sans', sans-serif", background: 'var(--osmos-bg-subtle)', minHeight: '100%' }}>

      {/* Page header — matches BYOT pattern */}
      <Toolbar
        noBorder
        left={<span style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)' }}>Offsite Ads</span>}
        right={
          <Button variant="primary" onClick={() => setWizardOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <PlusIcon size={14} /> Create Campaign
          </Button>
        }
        style={{ background: 'transparent', padding: 0 }}
      />

      {/* KPI grid — equal-width cards, matches BYOT repeat(N, 1fr) pattern */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {KPI_DATA.map(kpi => (
          <KPIChip key={kpi.label} label={kpi.label} value={kpi.value} />
        ))}
      </div>

      {/* Performance trend card */}
      <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, padding: '16px 20px' }}>
        <PerformanceTrend />
      </div>

      {/* Campaigns table card */}
      <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, overflow: 'hidden' }}>

        {/* Table toolbar — uses Toolbar component like BYOT */}
        <Toolbar
          left={<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Campaigns</span>}
          right={
            <Button variant="outline" onClick={() => {}} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <DownloadIcon size={13} /> Export CSV
            </Button>
          }
        />

        {/* Channel filter chips */}
        <div style={{ display: 'flex', gap: 8, padding: '10px 16px', borderBottom: `1px solid var(--osmos-border)`, flexWrap: 'wrap' }}>
          {CHANNELS.map(ch => {
            const isActive = activeChannel === ch;
            return (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 12,
                  fontWeight: isActive ? 600 : 400, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                  border: `1px solid ${isActive ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                  background: isActive ? `var(--osmos-brand-primary)11` : 'transparent',
                  color: isActive ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {ch}
              </button>
            );
          })}
        </div>

        {/* Bulk action bar */}
        {selectedRows.length > 0 && (
          <div style={{ padding: '8px 16px 0' }}>
            <BulkActionBar count={selectedRows.length} onClear={() => setSelectedRows([])} />
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={TABLE_COLUMNS}
          data={filteredCampaigns.map(c => ({ ...c, _actions: null }))}
          selectable
          onRowSelect={setSelectedRows}
          footer={
            <tr>
              <td colSpan={TABLE_COLUMNS.length + 1} style={{ padding: '10px 16px', borderTop: `1px solid var(--osmos-border)` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <RefreshIcon size={12} /> Last synced 3 min ago
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
                    {filteredCampaigns.length} campaigns
                  </span>
                </div>
              </td>
            </tr>
          }
        />
      </div>

      {wizardOpen && createPortal(
        <OffsiteCampaignWizard onClose={() => setWizardOpen(false)} onLaunch={handleLaunch} />,
        document.body
      )}

      <Toast />
    </div>
  );
}
