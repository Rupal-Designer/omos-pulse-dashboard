import { useState } from 'react';
import {
  Icon, InfoIcon, RefreshIcon, DownloadIcon, PlusIcon, FilterIcon,
  ChevronDownIcon, SearchIcon, CloseIcon, CheckIcon, Button, Checkbox,
} from '../../ui';
import { CreateCampaignModal }    from './campaign-wizard/create-campaign-modal';
import { CampaignWizard }         from './campaign-wizard/campaign-wizard';
import { InstoreCampaignWizard }  from './campaign-wizard/instore-campaign-wizard';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT     = "'Open Sans', sans-serif";
const BG       = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER   = 'var(--osmos-border)';
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const AMBER_M  = 'rgba(245,166,35,0.12)';

// ── Hand-rolled icons ─────────────────────────────────────────────────────────
const BarChartIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6"  x2="6"  y1="20" y2="14" />
  </Icon>
);

const MoreVerticalIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="5"  r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

// ── Cell style constants ──────────────────────────────────────────────────────
const TH = { padding: 12, fontSize: 12, fontWeight: 500, color: TEXT_MID, textAlign: 'left', background: BG };
const TD = { padding: 12, fontSize: 13, color: TEXT, background: BG };

// ── Form style ────────────────────────────────────────────────────────────────
const SELECT_STYLE = {
  flex: 1, padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, outline: 'none', color: TEXT, background: BG, fontFamily: FONT, cursor: 'pointer',
};

// ── Mock data ────────────────────────────────────────────────────────────────
const campaignsData = {
  'Product Ads': [
    { status: 'ACTIVE', name: 'Summer Sale - Electronics',  bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 300 K', spend: '',        showContinue: true  },
    { status: 'ACTIVE', name: 'Back to School Campaign',    bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 250 K', spend: '',        showContinue: true  },
    { status: 'PAUSED', name: 'Holiday Gift Guide',         bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 350 K', spend: '',        showContinue: true  },
    { status: 'ACTIVE', name: 'Flash Sale - Home & Garden', bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 200 K', spend: '',        showContinue: false },
    { status: 'DRAFT',  name: 'New Arrivals Showcase',      bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 400 K', spend: '',        showContinue: false },
  ],
  'Display Ads': [
    { status: 'ACTIVE', name: 'Banner - Homepage Takeover',  bidding: 'CPM', date: '12 Nov 25, 09:30 AM +05:30', budget: '$ 500 K', spend: '$ 125 K', showContinue: false },
    { status: 'ACTIVE', name: 'Video Ad - Product Launch',   bidding: 'CPM', date: '11 Nov 25, 02:15 PM +05:30', budget: '$ 800 K', spend: '$ 342 K', showContinue: false },
    { status: 'PAUSED', name: 'Carousel - Category Showcase',bidding: 'CPM', date: '10 Nov 25, 11:45 AM +05:30', budget: '$ 450 K', spend: '$ 289 K', showContinue: true  },
    { status: 'ACTIVE', name: 'Story Ads - Brand Awareness', bidding: 'CPM', date: '09 Nov 25, 04:20 PM +05:30', budget: '$ 350 K', spend: '$ 198 K', showContinue: false },
  ],
  'Offsite Ads': [
    { status: 'ACTIVE', name: 'Meta - Spring Collection Launch', bidding: 'CPC', date: '14 Nov 25, 10:00 AM +05:30', budget: '$ 2.5 M', spend: '$ 1.2 M', showContinue: false },
    { status: 'ACTIVE', name: 'Google - Search Campaign Q4',     bidding: 'CPC', date: '13 Nov 25, 03:45 PM +05:30', budget: '$ 3.8 M', spend: '$ 2.1 M', showContinue: false },
    { status: 'PAUSED', name: 'TikTok - Gen Z Targeting',        bidding: 'CPM', date: '12 Nov 25, 01:30 PM +05:30', budget: '$ 1.2 M', spend: '$ 890 K', showContinue: true  },
    { status: 'ACTIVE', name: 'Meta - Retargeting Campaign',     bidding: 'CPC', date: '11 Nov 25, 09:15 AM +05:30', budget: '$ 1.5 M', spend: '$ 678 K', showContinue: false },
    { status: 'DRAFT',  name: 'Google - Display Network Test',   bidding: 'CPM', date: '10 Nov 25, 11:00 AM +05:30', budget: '$ 900 K', spend: '',        showContinue: false },
  ],
  'In-Store Digital Ads': [
    { status: 'ACTIVE', name: 'Holiday Promo - Video Screens',  bidding: 'CPP', date: '15 Nov 25, 09:00 AM +05:30', budget: '$ 180 K', spend: '$ 45 K', showContinue: false },
    { status: 'ACTIVE', name: 'Checkout Counter - Audio Ads',   bidding: 'CPP', date: '14 Nov 25, 11:30 AM +05:30', budget: '$ 120 K', spend: '$ 67 K', showContinue: false },
    { status: 'PAUSED', name: 'Entrance Display - Image Ads',   bidding: 'CPP', date: '12 Nov 25, 02:15 PM +05:30', budget: '$ 95 K',  spend: '$ 54 K', showContinue: true  },
    { status: 'DRAFT',  name: 'Aisle Screens - Native Ads',     bidding: 'CPP', date: '10 Nov 25, 04:45 PM +05:30', budget: '$ 200 K', spend: '',        showContinue: false },
  ],
};

const adGroupsData = {
  'Product Ads': [
    { status: 'ACTIVE', name: 'Electronics - Premium Segment', campaign: 'Summer Sale - Electronics',  bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 100 K', spend: '$ 45 K' },
    { status: 'ACTIVE', name: 'Electronics - Budget Range',    campaign: 'Summer Sale - Electronics',  bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 150 K', spend: '$ 67 K' },
    { status: 'ACTIVE', name: 'School Supplies',               campaign: 'Back to School Campaign',    bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 120 K', spend: '$ 54 K' },
    { status: 'PAUSED', name: 'Tech Accessories',              campaign: 'Back to School Campaign',    bidding: 'CPM', date: '13 Nov 25, 12:05 PM +05:30', budget: '$ 80 K',  spend: '$ 38 K' },
  ],
  'Display Ads': [
    { status: 'ACTIVE', name: 'Hero Banner - Desktop',   campaign: 'Banner - Homepage Takeover', bidding: 'CPM', date: '12 Nov 25, 09:30 AM +05:30', budget: '$ 300 K', spend: '$ 78 K'  },
    { status: 'ACTIVE', name: 'Hero Banner - Mobile',    campaign: 'Banner - Homepage Takeover', bidding: 'CPM', date: '12 Nov 25, 09:30 AM +05:30', budget: '$ 200 K', spend: '$ 47 K'  },
    { status: 'ACTIVE', name: 'Launch Video - YouTube',  campaign: 'Video Ad - Product Launch',  bidding: 'CPM', date: '11 Nov 25, 02:15 PM +05:30', budget: '$ 500 K', spend: '$ 213 K' },
    { status: 'ACTIVE', name: 'Launch Video - Social',   campaign: 'Video Ad - Product Launch',  bidding: 'CPM', date: '11 Nov 25, 02:15 PM +05:30', budget: '$ 300 K', spend: '$ 129 K' },
  ],
  'Offsite Ads': [
    { status: 'ACTIVE', name: 'Meta Feed - Women 25-34', campaign: 'Meta - Spring Collection Launch', bidding: 'CPC', date: '14 Nov 25, 10:00 AM +05:30', budget: '$ 1.2 M', spend: '$ 567 K' },
    { status: 'ACTIVE', name: 'Meta Stories - Gen Z',    campaign: 'Meta - Spring Collection Launch', bidding: 'CPC', date: '14 Nov 25, 10:00 AM +05:30', budget: '$ 800 K', spend: '$ 389 K' },
    { status: 'ACTIVE', name: 'Google Search - Branded', campaign: 'Google - Search Campaign Q4',     bidding: 'CPC', date: '13 Nov 25, 03:45 PM +05:30', budget: '$ 1.5 M', spend: '$ 892 K' },
    { status: 'ACTIVE', name: 'Google Search - Generic', campaign: 'Google - Search Campaign Q4',     bidding: 'CPC', date: '13 Nov 25, 03:45 PM +05:30', budget: '$ 2.0 M', spend: '$ 1.1 M' },
  ],
  'In-Store Digital Ads': [
    { status: 'ACTIVE', name: 'Pickcel Screens - 15s slots',  campaign: 'Holiday Promo - Video Screens',  bidding: 'CPP', date: '15 Nov 25, 09:00 AM +05:30', budget: '$ 80 K',  spend: '$ 23 K' },
    { status: 'ACTIVE', name: 'Signage Screens - 30s slots',  campaign: 'Holiday Promo - Video Screens',  bidding: 'CPP', date: '15 Nov 25, 09:00 AM +05:30', budget: '$ 100 K', spend: '$ 22 K' },
    { status: 'ACTIVE', name: 'Audio Loop - Morning Shift',   campaign: 'Checkout Counter - Audio Ads',   bidding: 'CPP', date: '14 Nov 25, 11:30 AM +05:30', budget: '$ 60 K',  spend: '$ 34 K' },
    { status: 'ACTIVE', name: 'Audio Loop - Evening Shift',   campaign: 'Checkout Counter - Audio Ads',   bidding: 'CPP', date: '14 Nov 25, 11:30 AM +05:30', budget: '$ 60 K',  spend: '$ 33 K' },
  ],
};

const filterFields = [
  { label: 'Status',           value: 'status'  },
  { label: 'Name',             value: 'name'    },
  { label: 'Bidding Strategy', value: 'bidding' },
  { label: 'CPC',              value: 'cpc'     },
  { label: 'CPM',              value: 'cpm'     },
  { label: 'CPP',              value: 'cpp'     },
  { label: 'Budget',           value: 'budget'  },
  { label: 'Ad Spend',         value: 'spend'   },
];

const filterOperators = [
  { label: 'equals (=)',    value: 'equals'     },
  { label: 'not equals (≠)',value: 'not_equals' },
  { label: 'contains',      value: 'contains'   },
  { label: 'greater than (>)', value: 'gt'      },
  { label: 'less than (<)', value: 'lt'         },
];

// ── CampaignTable ─────────────────────────────────────────────────────────────
export function CampaignTable({ activeAdType = 'Product Ads' }) {
  const [modalOpen,                  setModalOpen]                  = useState(false);
  const [wizardOpen,                 setWizardOpen]                 = useState(false);
  const [initialData,                setInitialData]                = useState(null);
  const [currentAdType,              setCurrentAdType]              = useState('product');
  const [view,                       setView]                       = useState('campaigns');
  const [campaignSelectModalOpen,    setCampaignSelectModalOpen]    = useState(false);
  const [selectedCampaignForAdGroup, setSelectedCampaignForAdGroup] = useState(null);
  const [wizardMode,                 setWizardMode]                 = useState('create_campaign');
  const [wizardSelectedCampaign,     setWizardSelectedCampaign]     = useState(null);
  const [hoveredRow,                 setHoveredRow]                 = useState(null);

  const [filterBuilderRows, setFilterBuilderRows] = useState([]);
  const [appliedFilters,    setAppliedFilters]    = useState([]);
  const [expandedFilter,    setExpandedFilter]    = useState(null);

  const campaigns = campaignsData[activeAdType] || campaignsData['Product Ads'];
  const adGroups  = adGroupsData[activeAdType]  || adGroupsData['Product Ads'];

  // ── Filter handlers ──
  const handleAddFilterRow = () => {
    const newId = Date.now().toString();
    setFilterBuilderRows([...filterBuilderRows, { id: newId, field: '', operator: '', value: '' }]);
    setExpandedFilter(newId);
  };

  const handleRemoveFilterRow = (id) =>
    setFilterBuilderRows(filterBuilderRows.filter((row) => row.id !== id));

  const handleApplyFilter = (rowId) => {
    const row = filterBuilderRows.find((r) => r.id === rowId);
    if (!row || !row.field || !row.operator || !row.value) return;
    const fieldLabel    = filterFields.find((f)  => f.value === row.field)?.label    || row.field;
    const operatorLabel = filterOperators.find((o) => o.value === row.operator)?.label || row.operator;
    const existingIndex = appliedFilters.findIndex((f) => f.field === row.field && f.operator === row.operator);
    if (existingIndex >= 0) {
      const updated = [...appliedFilters];
      updated[existingIndex] = { ...row, label: `${fieldLabel} ${operatorLabel} ${row.value}` };
      setAppliedFilters(updated);
    } else {
      setAppliedFilters([...appliedFilters, { ...row, label: `${fieldLabel} ${operatorLabel} ${row.value}` }]);
    }
    setFilterBuilderRows(filterBuilderRows.filter((r) => r.id !== rowId));
    setExpandedFilter(null);
  };

  const handleRemoveAppliedFilter = (id) =>
    setAppliedFilters(appliedFilters.filter((f) => f.id !== id));

  const handleFieldChange    = (id, field)    => setFilterBuilderRows(filterBuilderRows.map((r) => r.id === id ? { ...r, field }    : r));
  const handleOperatorChange = (id, operator) => setFilterBuilderRows(filterBuilderRows.map((r) => r.id === id ? { ...r, operator } : r));
  const handleValueChange    = (id, value)    => setFilterBuilderRows(filterBuilderRows.map((r) => r.id === id ? { ...r, value }    : r));

  // ── Wizard handlers ──
  const handleModalContinue = (data) => { setInitialData(data); setModalOpen(false); setWizardOpen(true); };
  const handleWizardClose   = ()     => { setWizardOpen(false); setInitialData(null); };

  const handleCreateCampaign = () => {
    const adType = activeAdType === 'Display Ads' ? 'display'
      : activeAdType === 'Offsite Ads' ? 'offsite'
      : activeAdType === 'In-Store Digital Ads' ? 'instore'
      : 'product';
    setCurrentAdType(adType);
    setModalOpen(true);
  };

  const handleCreateAdGroup = () => setCampaignSelectModalOpen(true);

  const handleCampaignSelectConfirm = () => {
    if (!selectedCampaignForAdGroup) return;
    const adType = activeAdType === 'Display Ads' ? 'display'
      : activeAdType === 'Offsite Ads' ? 'offsite'
      : activeAdType === 'In-Store Digital Ads' ? 'instore'
      : 'product';
    setCurrentAdType(adType);
    setWizardMode('add_ad_group');
    setWizardSelectedCampaign({ id: selectedCampaignForAdGroup, name: selectedCampaignForAdGroup, adType });
    setCampaignSelectModalOpen(false);
    setSelectedCampaignForAdGroup(null);
    setWizardOpen(true);
  };

  return (
    <>
      <div style={{ borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: BG, fontFamily: FONT }}>

        {/* ── Header bar ── */}
        <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ACCENT_M }}>
              <BarChartIcon size={16} color={ACCENT} />
            </div>
            <span style={{ fontWeight: 500, color: TEXT }}>
              {view === 'campaigns' ? 'CAMPAIGN' : 'AD GROUP'}
            </span>
            <InfoIcon size={14} color={TEXT_SUB} />
            {activeAdType !== 'Product Ads' && (
              <span style={{ marginLeft: 8, padding: '2px 8px', fontSize: 12, borderRadius: 999, backgroundColor: ACCENT_M, color: ACCENT }}>
                {activeAdType}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBtn><RefreshIcon size={14} color={TEXT_MID} /></IconBtn>
            <IconBtn><DownloadIcon size={14} color={TEXT_MID} /></IconBtn>
            {/* Chart type picker */}
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
              <button style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <BarChartIcon size={14} color={TEXT_MID} />
              </button>
              <ChevronDownIcon size={14} color={TEXT_MID} style={{ marginRight: 8 }} />
            </div>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
              <SearchIcon size={14} color={TEXT_SUB} />
              <input
                type="text"
                placeholder={view === 'campaigns' ? 'Search Campaign' : 'Search Ad Group'}
                style={{ border: 'none', outline: 'none', width: 128, fontSize: 13, color: TEXT, background: 'transparent', fontFamily: FONT }}
              />
            </div>
            <IconBtn><DownloadIcon size={14} color={TEXT_MID} /></IconBtn>
            <Button variant="primary" onClick={view === 'campaigns' ? handleCreateCampaign : handleCreateAdGroup}>
              <PlusIcon size={13} color="#fff" />
              {view === 'campaigns' ? 'Create Campaign' : 'Create Ad Group'}
            </Button>
          </div>
        </div>

        {/* ── View tabs ── */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4, borderRadius: 8, backgroundColor: BG_SUBTLE, width: 'fit-content' }}>
            {[['campaigns', `Campaigns (${campaigns.length})`], ['adGroups', `Ad Groups (${adGroups.length})`]].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, fontFamily: FONT, transition: 'all 0.15s',
                  backgroundColor: view === v ? BG : 'transparent',
                  color: view === v ? TEXT : TEXT_MID,
                  boxShadow: view === v ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: TEXT_MID }}>
            {view === 'campaigns' ? 'Manage campaigns across all ad types' : 'Manage ad groups within campaigns'}
          </span>
        </div>

        {/* ── Filter builder ── */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filterBuilderRows.map((row) => (
              <div key={row.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={() => setExpandedFilter(expandedFilter === row.id ? null : row.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                    border: expandedFilter === row.id ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                    backgroundColor: BG, fontFamily: FONT, fontSize: 13,
                    color: expandedFilter === row.id ? ACCENT : TEXT_MID, transition: 'all 0.15s',
                  }}
                >
                  <PlusIcon size={14} color={expandedFilter === row.id ? ACCENT : TEXT_MID} />
                  Add a Filter
                </button>

                {expandedFilter === row.id && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: 12, borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, color: TEXT_MID }}>Field</label>
                      <select value={row.field} onChange={(e) => handleFieldChange(row.id, e.target.value)} style={SELECT_STYLE}>
                        <option value="">Select Field</option>
                        {filterFields.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, color: TEXT_MID }}>Operator</label>
                      <select value={row.operator} onChange={(e) => handleOperatorChange(row.id, e.target.value)} style={SELECT_STYLE}>
                        <option value="">Select Operator</option>
                        {filterOperators.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, color: TEXT_MID }}>Value</label>
                      <input
                        type="text" value={row.value}
                        onChange={(e) => handleValueChange(row.id, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter(row.id)}
                        placeholder="Enter value"
                        style={{ ...SELECT_STYLE, cursor: 'text' }}
                      />
                    </div>
                    <button
                      onClick={() => handleApplyFilter(row.id)}
                      style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: ACCENT, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => handleRemoveFilterRow(row.id)}
                      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4 }}
                    >
                      <CloseIcon size={14} color={TEXT_MID} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Applied filter chips */}
            {appliedFilters.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <button
                  onClick={handleAddFilterRow}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 999, border: `1px solid ${BORDER}`, backgroundColor: BG, cursor: 'pointer', fontSize: 13, color: TEXT_MID, fontFamily: FONT }}
                >
                  <PlusIcon size={14} color={TEXT_MID} />
                </button>
                {appliedFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleRemoveAppliedFilter(filter.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE, color: TEXT, fontSize: 13, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}
                  >
                    <span>{filter.label}</span>
                    <CloseIcon size={12} color={TEXT_MID} />
                  </button>
                ))}
              </div>
            )}

            {/* Empty state — first Add a Filter */}
            {filterBuilderRows.length === 0 && appliedFilters.length === 0 && (
              <button
                onClick={handleAddFilterRow}
                style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', fontSize: 13, color: TEXT_MID, cursor: 'pointer', fontFamily: FONT, transition: 'opacity 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <PlusIcon size={14} color={TEXT_MID} />
                Add a Filter
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        {view === 'campaigns' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                <th style={{ ...TH, width: 40 }}><Checkbox checked={false} onChange={() => {}} /></th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Status <FilterIcon size={12} color={TEXT_MID} />
                  </div>
                </th>
                <th style={TH}>Name</th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Bidding Strategy <InfoIcon size={12} color={TEXT_SUB} />
                  </div>
                </th>
                <th style={TH}>Creation Date</th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Daily Budget <InfoIcon size={12} color={TEXT_SUB} />
                  </div>
                </th>
                <th style={TH}>Ad Spend</th>
                <th style={{ ...TH, width: 96 }} />
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredRow(`c${index}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: hoveredRow === `c${index}` ? BG_SUBTLE : BG }}
                >
                  <td style={TD}><Checkbox checked={false} onChange={() => {}} /></td>
                  <td style={TD}><StatusBadge status={campaign.status} /></td>
                  <td style={TD}>
                    <span style={{ color: ACCENT, cursor: 'pointer', textDecoration: hoveredRow === `c${index}` ? 'underline' : 'none' }}>
                      {campaign.name}
                    </span>
                  </td>
                  <td style={TD}>{campaign.bidding}</td>
                  <td style={TD}>{campaign.date}</td>
                  <td style={{ ...TD, fontWeight: 500, color: ACCENT }}>{campaign.budget}</td>
                  <td style={TD}>{campaign.spend}</td>
                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                      {campaign.showContinue ? (
                        <button style={{ padding: '4px 12px', fontSize: 12, border: `1px solid ${BORDER}`, borderRadius: 4, backgroundColor: BG, color: TEXT_MID, cursor: 'pointer', fontFamily: FONT }}>
                          Continue
                        </button>
                      ) : (
                        <button style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <BarChartIcon size={14} color={TEXT_MID} />
                        </button>
                      )}
                      <button style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <MoreVerticalIcon size={14} color={TEXT_MID} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: BG_SUBTLE }}>
                <td colSpan={6} style={{ padding: 12 }} />
                <td style={{ padding: 12, fontSize: 13, fontWeight: 500, color: TEXT }}>$13.9 k</td>
                <td style={{ padding: 12 }} />
              </tr>
            </tfoot>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                <th style={{ ...TH, width: 40 }}><Checkbox checked={false} onChange={() => {}} /></th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Status <FilterIcon size={12} color={TEXT_MID} />
                  </div>
                </th>
                <th style={TH}>Ad Group Name</th>
                <th style={TH}>Campaign</th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Bidding Strategy <InfoIcon size={12} color={TEXT_SUB} />
                  </div>
                </th>
                <th style={TH}>Creation Date</th>
                <th style={TH}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    Daily Budget <InfoIcon size={12} color={TEXT_SUB} />
                  </div>
                </th>
                <th style={TH}>Ad Spend</th>
                <th style={{ ...TH, width: 96 }} />
              </tr>
            </thead>
            <tbody>
              {adGroups.map((adGroup, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredRow(`ag${index}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: hoveredRow === `ag${index}` ? BG_SUBTLE : BG }}
                >
                  <td style={TD}><Checkbox checked={false} onChange={() => {}} /></td>
                  <td style={TD}><StatusBadge status={adGroup.status} /></td>
                  <td style={TD}>
                    <span style={{ color: ACCENT, cursor: 'pointer', textDecoration: hoveredRow === `ag${index}` ? 'underline' : 'none' }}>
                      {adGroup.name}
                    </span>
                  </td>
                  <td style={{ ...TD, fontSize: 12, color: TEXT_MID }}>{adGroup.campaign}</td>
                  <td style={TD}>{adGroup.bidding}</td>
                  <td style={TD}>{adGroup.date}</td>
                  <td style={{ ...TD, fontWeight: 500, color: ACCENT }}>{adGroup.budget}</td>
                  <td style={TD}>{adGroup.spend}</td>
                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                      <button style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <BarChartIcon size={14} color={TEXT_MID} />
                      </button>
                      <button style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <MoreVerticalIcon size={14} color={TEXT_MID} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: BG_SUBTLE }}>
                <td colSpan={7} style={{ padding: 12 }} />
                <td style={{ padding: 12, fontSize: 13, fontWeight: 500, color: TEXT }}>$8.7 k</td>
                <td style={{ padding: 12 }} />
              </tr>
            </tfoot>
          </table>
        )}

        {/* ── Footer ── */}
        <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_MID, borderTop: `1px solid ${BORDER}` }}>
          <span>Comparison mode not applicable</span>
          <span>One Filter Applicable: <span style={{ color: TEXT, fontWeight: 500 }}>Date</span></span>
        </div>
      </div>

      {/* ── Campaign select modal ── */}
      {campaignSelectModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setCampaignSelectModalOpen(false)} />
          <div style={{ position: 'relative', backgroundColor: BG, borderRadius: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: 512, margin: '0 16px', overflow: 'hidden', fontFamily: FONT }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: TEXT }}>Select Campaign</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: TEXT_MID }}>Choose which campaign to add the ad group to</p>
              </div>
              <button
                onClick={() => setCampaignSelectModalOpen(false)}
                style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_SUBTLE)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <CloseIcon size={18} color={TEXT_MID} />
              </button>
            </div>

            {/* Campaign list */}
            <div style={{ padding: 20, maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {campaigns.map((campaign, index) => {
                const selected = selectedCampaignForAdGroup === campaign.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCampaignForAdGroup(campaign.name)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: 16, borderRadius: 8, textAlign: 'left', cursor: 'pointer',
                      border: selected ? `2px solid ${ACCENT}` : `2px solid ${BORDER}`,
                      backgroundColor: selected ? ACCENT_M : BG,
                      transition: 'all 0.15s', fontFamily: FONT,
                    }}
                    onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = TEXT_MID; e.currentTarget.style.backgroundColor = BG_SUBTLE; }}}
                    onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.backgroundColor = BG; }}}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: TEXT }}>{campaign.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <StatusBadge status={campaign.status} />
                        <span style={{ fontSize: 12, color: TEXT_MID }}>Budget: {campaign.budget}</span>
                      </div>
                    </div>
                    {selected && (
                      <div style={{ width: 24, height: 24, borderRadius: 999, backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckIcon size={14} color="#fff" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, padding: 20, borderTop: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE }}>
              <Button variant="outline" onClick={() => setCampaignSelectModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleCampaignSelectConfirm} disabled={!selectedCampaignForAdGroup}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Wizard overlays ── */}
      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleModalContinue}
        adType={currentAdType}
      />

      {wizardOpen && currentAdType === 'instore' ? (
        <InstoreCampaignWizard open={wizardOpen} onClose={handleWizardClose} campaignData={initialData} />
      ) : (
        wizardOpen && (
          <CampaignWizard
            open={wizardOpen}
            onClose={handleWizardClose}
            initialData={initialData}
            adType={currentAdType}
            mode={wizardMode}
            selectedCampaign={wizardSelectedCampaign || undefined}
          />
        )
      )}
    </>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const COLORS = {
    ACTIVE: { bg: 'transparent', text: GREEN,     dot: GREEN     },
    PAUSED: { bg: 'transparent', text: '#EF4444', dot: '#EF4444' },
    DRAFT:  { bg: 'transparent', text: TEXT_MID,  dot: 'transparent' },
  };
  const c = COLORS[status] || COLORS.DRAFT;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {status !== 'DRAFT' ? (
        <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: c.dot }} />
      ) : (
        <div style={{ width: 16, height: 16, border: `1px solid ${BORDER}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 8, height: 12, border: `1px solid ${TEXT_SUB}`, borderRadius: 2 }} />
        </div>
      )}
      <span style={{ fontSize: 10, fontWeight: 500, color: c.text, fontFamily: FONT }}>{status}</span>
    </div>
  );
}

// ── IconBtn helper ────────────────────────────────────────────────────────────
function IconBtn({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${BORDER}`, borderRadius: 8, cursor: 'pointer',
        background: hover ? BG_SUBTLE : 'transparent', transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}
