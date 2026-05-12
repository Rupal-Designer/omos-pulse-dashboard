import { useState, useMemo } from 'react';
import { Icon, InfoIcon, RefreshIcon, DownloadIcon, ChevronDownIcon, SearchIcon } from '../../ui';
import { FilterBuilder } from './filter-builder';
import { DataTable, ColHeader, useOsmosTable } from '../../shared/components/data-table';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const TEXT_SUB  = 'var(--osmos-fg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const GREEN     = 'var(--osmos-brand-green)';

// ── Hand-rolled BarChart2 icon ────────────────────────────────────────────────
const BarChartIcon = ({ size = 16, color = ACCENT }) => (
  <Icon size={size} color={color}>
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6"  x2="6"  y1="20" y2="14" />
  </Icon>
);

// ── Mock data ────────────────────────────────────────────────────────────────
const campaignPerformance = [
  { name: 'Summer Sale - Electronics', type: 'Product Ads',  impressions: '125.4K', clicks: '3,245',  spend: '$2,450', conversions: '145', ctr: '2.59%', roas: '3.2x' },
  { name: 'Meta - Spring Collection',  type: 'Offsite Ads',  impressions: '892.1K', clicks: '12,567', spend: '$8,920', conversions: '567', ctr: '1.41%', roas: '4.1x' },
  { name: 'Banner - Homepage',         type: 'Display Ads',  impressions: '456.8K', clicks: '5,678',  spend: '$4,120', conversions: '234', ctr: '1.24%', roas: '2.8x' },
];
const adGroupPerformance = [
  { name: 'Electronics - Premium',   campaign: 'Summer Sale - Electronics', impressions: '67.2K',  clicks: '1,890', spend: '$1,340', conversions: '89',  ctr: '2.81%', roas: '3.5x' },
  { name: 'Meta Feed - Women 25-34', campaign: 'Meta - Spring Collection',  impressions: '534.5K', clicks: '7,234', spend: '$5,120', conversions: '345', ctr: '1.35%', roas: '4.3x' },
  { name: 'Hero Banner - Desktop',   campaign: 'Banner - Homepage',         impressions: '289.3K', clicks: '3,456', spend: '$2,450', conversions: '145', ctr: '1.19%', roas: '2.9x' },
];
const adsPerformance = [
  { name: 'Premium Laptop Ad',       adGroup: 'Electronics - Premium',   impressions: '34.5K',  clicks: '945',   spend: '$670',   conversions: '45',  ctr: '2.74%', roas: '3.4x' },
  { name: 'Spring Dress Carousel',   adGroup: 'Meta Feed - Women 25-34', impressions: '267.2K', clicks: '3,612', spend: '$2,560', conversions: '172', ctr: '1.35%', roas: '4.5x' },
  { name: 'Homepage Hero - Desktop', adGroup: 'Hero Banner - Desktop',   impressions: '144.7K', clicks: '1,728', spend: '$1,225', conversions: '72',  ctr: '1.19%', roas: '2.9x' },
];
const inventoryPerformance = [
  { name: 'Home Page',           placement: 'Above Fold', impressions: '489.2K', clicks: '6,789', spend: '$4,890', conversions: '345', ctr: '1.39%', roas: '3.5x' },
  { name: 'Category Page',       placement: 'Sidebar',    impressions: '234.5K', clicks: '2,890', spend: '$2,120', conversions: '156', ctr: '1.23%', roas: '2.9x' },
  { name: 'Product Detail Page', placement: 'Bottom',     impressions: '156.8K', clicks: '1,678', spend: '$1,340', conversions: '89',  ctr: '1.07%', roas: '2.6x' },
];
const audiencePerformance = [
  { name: 'Clippers Non-Redeemers',  segment: '1st Party', impressions: '145.6K', clicks: '2,345', spend: '$1,890', conversions: '145', ctr: '1.61%', roas: '3.8x' },
  { name: 'Lapsed Shoppers: Sports', segment: '1st Party', impressions: '234.8K', clicks: '3,456', spend: '$2,670', conversions: '189', ctr: '1.47%', roas: '3.5x' },
  { name: 'High-Value Customers',    segment: 'Custom',    impressions: '89.4K',  clicks: '1,567', spend: '$1,230', conversions: '98',  ctr: '1.75%', roas: '4.2x' },
];

const VIEW_DATA = {
  campaigns: campaignPerformance,
  adGroups:  adGroupPerformance,
  ads:       adsPerformance,
  inventory: inventoryPerformance,
  audience:  audiencePerformance,
};

const FILTER_FIELDS_BASE = [
  { value: 'name',        label: 'Name' },
  { value: 'impressions', label: 'Impressions' },
  { value: 'clicks',      label: 'Clicks' },
  { value: 'spend',       label: 'Ad Spend' },
  { value: 'conversions', label: 'Conversions' },
  { value: 'ctr',         label: 'CTR' },
  { value: 'roas',        label: 'ROAS' },
];
const VIEW_EXTRA_FIELDS = {
  campaigns: [{ value: 'type',      label: 'Campaign Type' }],
  adGroups:  [{ value: 'campaign',  label: 'Campaign' }],
  ads:       [{ value: 'adGroup',   label: 'Ad Group' }],
  inventory: [{ value: 'placement', label: 'Placement' }],
  audience:  [{ value: 'segment',   label: 'Segment Type' }],
};

const VIEWS = ['campaigns', 'adGroups', 'ads', 'inventory', 'audience'];

// ── Filter application ────────────────────────────────────────────────────────
function applyFilters(data, filters) {
  if (!filters.length) return data;
  return data.filter(row =>
    filters.every(({ field, operator, value }) => {
      const cell = String(row[field] ?? '').toLowerCase();
      const val  = String(value ?? '').toLowerCase();
      switch (operator) {
        case 'contains':     return cell.includes(val);
        case 'not_contains': return !cell.includes(val);
        case 'equals':       return cell === val;
        case 'not_equals':   return cell !== val;
        case 'starts_with':  return cell.startsWith(val);
        case 'ends_with':    return cell.endsWith(val);
        default:             return cell.includes(val);
      }
    })
  );
}

// ── Column definitions ────────────────────────────────────────────────────────
const metricCols = [
  { id: 'impressions', accessorKey: 'impressions', enableSorting: false, header: () => <ColHeader label="Impressions"  info /> },
  { id: 'clicks',      accessorKey: 'clicks',      enableSorting: false, header: () => <ColHeader label="Clicks"       info /> },
  { id: 'spend',       accessorKey: 'spend',        enableSorting: false, header: () => <ColHeader label="Ad Spend"     info /> },
  { id: 'conversions', accessorKey: 'conversions',  enableSorting: false, header: () => <ColHeader label="Conversions"  info /> },
  { id: 'ctr',         accessorKey: 'ctr',          enableSorting: false, header: () => <ColHeader label="CTR"          info /> },
  {
    id: 'roas', accessorKey: 'roas', enableSorting: false,
    header: () => <ColHeader label="ROAS" info />,
    cell: info => <span style={{ fontWeight: 500, color: GREEN }}>{info.getValue()}</span>,
  },
];

const nameCol = {
  id: 'name', accessorKey: 'name',
  header: () => <ColHeader label="Name" info />,
  cell: info => <span style={{ color: ACCENT, cursor: 'pointer' }}>{info.getValue()}</span>,
};

const VIEW_SECOND_COL = {
  campaigns: { id: 'type',      accessorKey: 'type',      header: 'Type',         enableSorting: false },
  adGroups:  { id: 'campaign',  accessorKey: 'campaign',  header: 'Campaign',     enableSorting: false },
  ads:       { id: 'adGroup',   accessorKey: 'adGroup',   header: 'Ad Group',     enableSorting: false },
  inventory: { id: 'placement', accessorKey: 'placement', header: 'Placement',    enableSorting: false },
  audience:  { id: 'segment',   accessorKey: 'segment',   header: 'Segment Type', enableSorting: false },
};

// ── Footer computation (aggregates over filtered+pre-search data) ─────────────
function computeFooter(data) {
  const totalClicks      = data.reduce((s, i) => s + parseFloat(i.clicks.replace(/,/g, '')), 0).toLocaleString();
  const totalSpend       = '$' + data.reduce((s, i) => s + parseFloat(i.spend.replace(/[$,]/g, '')), 0).toLocaleString();
  const totalConversions = String(data.reduce((s, i) => s + parseInt(i.conversions, 10), 0));
  // 8 columns: name, secondCol, impressions, clicks, spend, conversions, ctr, roas
  return ['Total', '', '', totalClicks, totalSpend, totalConversions, '', ''];
}

// ── PerformanceTable ──────────────────────────────────────────────────────────
export function PerformanceTable() {
  const [view,          setView]          = useState('campaigns');
  const [activeFilters, setActiveFilters] = useState([]);

  const filterFields = [...(VIEW_EXTRA_FIELDS[view] || []), ...FILTER_FIELDS_BASE];
  const columns      = useMemo(() => [nameCol, VIEW_SECOND_COL[view], ...metricCols], [view]);
  const filteredData = useMemo(() => applyFilters(VIEW_DATA[view] || [], activeFilters), [view, activeFilters]);
  const footer       = useMemo(() => computeFooter(filteredData), [filteredData]);

  const { table, globalFilter, setGlobalFilter } = useOsmosTable({
    columns,
    data: filteredData,
    features: { sort: true, search: true },
  });

  function handleViewChange(v) {
    setView(v);
    setActiveFilters([]);
    setGlobalFilter('');
  }

  return (
    <div style={{ borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: BG, fontFamily: FONT }}>
      {/* ── Header bar ── */}
      <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ACCENT_M }}>
            <BarChartIcon size={16} color={ACCENT} />
          </div>
          <span style={{ fontWeight: 500, color: TEXT }}>PERFORMANCE</span>
          <InfoIcon size={14} color={TEXT_SUB} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconBtn><RefreshIcon size={14} color={TEXT_MID} /></IconBtn>
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
            <button style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer', color: TEXT_MID, display: 'flex', alignItems: 'center' }}>
              <BarChartIcon size={14} color={TEXT_MID} />
            </button>
            <ChevronDownIcon size={14} color={TEXT_MID} style={{ marginRight: 8 }} />
          </div>
          <IconBtn><DownloadIcon size={14} color={TEXT_MID} /></IconBtn>
        </div>
      </div>

      {/* ── View tabs + search ── */}
      <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4, borderRadius: 8, backgroundColor: BG_SUBTLE }}>
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => handleViewChange(v)}
              style={{
                padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 500, fontFamily: FONT, transition: 'all 0.15s',
                backgroundColor: view === v ? BG : 'transparent',
                color: view === v ? TEXT : TEXT_MID,
                boxShadow: view === v ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
          <SearchIcon size={14} color={TEXT_SUB} />
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder={`Search ${view}`}
            style={{ border: 'none', outline: 'none', width: 128, fontSize: 13, color: TEXT, background: 'transparent', fontFamily: FONT }}
          />
        </div>
      </div>

      {/* ── Filter builder ── */}
      <div style={{ padding: '8px 16px', borderBottom: `1px solid ${BORDER}` }}>
        <FilterBuilder filterFields={filterFields} onFiltersChange={setActiveFilters} />
      </div>

      {/* ── Table ── */}
      <DataTable table={table} footer={footer} />

      {/* ── Footer bar ── */}
      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_MID, borderTop: `1px solid ${BORDER}` }}>
        <span>Comparison mode not applicable</span>
        <span>One Filter Applicable: <span style={{ color: TEXT, fontWeight: 500 }}>Date</span></span>
      </div>
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
