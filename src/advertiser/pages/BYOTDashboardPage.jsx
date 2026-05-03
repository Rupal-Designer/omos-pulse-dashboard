import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Button, Badge, SearchBar, Toolbar, Pagination, Drawer,
  KPIChip, Input, Select, Toast, useToast,
  PlusIcon, DownloadIcon, CloseIcon, CheckIcon, InfoIcon,
  CalendarIcon, ChevronDownIcon, Icon,
} from '../../ui';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ── Tokens ────────────────────────────────────────────────────────────────────
const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const AMBER    = 'var(--osmos-brand-amber)';
const WHITE    = '#fff';

// ── Chart data ────────────────────────────────────────────────────────────────
const chartData = [
  { day: 'Apr 24', clicks: 2100, orders: 310, revenue: 15200 },
  { day: 'Apr 25', clicks: 3800, orders: 490, revenue: 24100 },
  { day: 'Apr 26', clicks: 2900, orders: 380, revenue: 18700 },
  { day: 'Apr 27', clicks: 4200, orders: 560, revenue: 27500 },
  { day: 'Apr 28', clicks: 5100, orders: 680, revenue: 33400 },
  { day: 'Apr 29', clicks: 3600, orders: 450, revenue: 22100 },
  { day: 'Apr 30', clicks: 6800, orders: 820, revenue: 41200 },
];

// ── Campaign mock data ────────────────────────────────────────────────────────
const CAMPAIGNS = [
  {
    id: 'c1', name: 'Beauty Deals – May', trackers: 12, clicks: 18400,
    atcs: 3200, orders: 920, revenue: 46000, wallet: 'Brand Wallet A', balance: 1240, status: 'Active',
    flightStart: '2026-04-15', flightEnd: '2026-05-15',
  },
  {
    id: 'c2', name: 'Influencer Collab – Nykaa', trackers: 5, clicks: 9100,
    atcs: 1450, orders: 310, revenue: 15500, wallet: 'Brand Wallet A', balance: 1240, status: 'Active',
    flightStart: '2026-04-20', flightEnd: '2026-05-20',
  },
  {
    id: 'c3', name: 'Festive Offers – Brand X', trackers: 28, clicks: 42000,
    atcs: 8100, orders: 2200, revenue: 110000, wallet: 'Brand Wallet B', balance: 350, status: 'Active',
    flightStart: '2026-03-01', flightEnd: '2026-04-30',
  },
  {
    id: 'c4', name: 'Cosmetic Sale Q1', trackers: 8, clicks: 6500,
    atcs: 890, orders: 180, revenue: 9000, wallet: 'Brand Wallet A', balance: 1240, status: 'Paused',
    flightStart: '2026-01-10', flightEnd: '2026-02-28',
  },
  {
    id: 'c5', name: 'Summer Skincare Push', trackers: 3, clicks: 1200,
    atcs: 180, orders: 42, revenue: 2100, wallet: 'Brand Wallet C', balance: 0, status: 'Draft',
    flightStart: '2026-05-01', flightEnd: '2026-06-30',
  },
];

const STEP_LABELS = ['Campaign Info', 'Wallet', 'Destination URL', 'Tracker Details', 'Review & Generate'];

const WALLET_OPTIONS = [
  { value: 'wallet-a', label: 'Brand Wallet A (₹1,240 available)' },
  { value: 'wallet-b', label: 'Brand Wallet B (₹350 available)' },
  { value: 'wallet-c', label: 'Brand Wallet C (₹0 — topped up required)' },
  { value: 'new', label: '+ Create new wallet…' },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function LinkIcon(props) {
  return (
    <Icon size={14} {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  );
}

function CopyIcon(props) {
  return (
    <Icon size={14} {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

function WalletIcon(props) {
  return (
    <Icon size={14} {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </Icon>
  );
}

function AlertIcon(props) {
  return (
    <Icon size={14} {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

// Wizard step component
function WizardStep({ step, wizardData, setWizardData }) {
  const [urlValid, setUrlValid] = useState(null); // null | 'validating' | 'valid' | 'invalid'
  const [copied, setCopied] = useState(false);

  const handleValidate = () => {
    setUrlValid('validating');
    setTimeout(() => {
      setUrlValid(wizardData.destinationUrl.startsWith('https://') ? 'valid' : 'invalid');
    }, 1200);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const generatedLink = wizardData.destinationUrl
    ? `${wizardData.destinationUrl}?tag=byot-${Math.random().toString(36).slice(2, 8)}`
    : '';

  if (step === 0) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input
        label="Campaign Name *"
        value={wizardData.name}
        onChange={e => setWizardData(d => ({ ...d, name: e.target.value }))}
        placeholder="e.g. Beauty Deals – May"
      />
      <div style={{ display: 'flex', gap: 16 }}>
        <Input
          label="Flight Start Date"
          type="date"
          value={wizardData.flightStart}
          onChange={e => setWizardData(d => ({ ...d, flightStart: e.target.value }))}
        />
        <Input
          label="Flight End Date"
          type="date"
          value={wizardData.flightEnd}
          onChange={e => setWizardData(d => ({ ...d, flightEnd: e.target.value }))}
        />
      </div>
    </div>
  );

  if (step === 1) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Select
        label="Select Wallet *"
        value={wizardData.wallet}
        onChange={e => setWizardData(d => ({ ...d, wallet: e.target.value }))}
        options={WALLET_OPTIONS}
      />
      {wizardData.wallet === 'wallet-c' && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', borderRadius: 8,
          background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
        }}>
          <AlertIcon color={AMBER} size={16} />
          <span style={{ fontSize: 13, color: AMBER }}>
            This wallet has ₹0 balance. New tracker links cannot be generated until topped up.
          </span>
        </div>
      )}
      <p style={{ fontSize: 12, color: TEXT_SUB }}>
        Wallet balance is deducted hourly for clicks. A 24-hour grace period applies when balance reaches zero.
      </p>
    </div>
  );

  if (step === 2) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <Input
            label="Destination URL (Inventory Position) *"
            value={wizardData.destinationUrl}
            onChange={e => {
              setWizardData(d => ({ ...d, destinationUrl: e.target.value }));
              setUrlValid(null);
            }}
            placeholder="https://retailer.com/product/..."
          />
        </div>
        <Button variant="outline" onClick={handleValidate} style={{ flexShrink: 0, marginBottom: 0 }}>
          {urlValid === 'validating' ? 'Validating…' : 'Validate URL'}
        </Button>
      </div>
      {urlValid === 'valid' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: GREEN, fontSize: 13 }}>
          <CheckIcon size={14} color={GREEN} /> URL is valid and resolves correctly.
        </div>
      )}
      {urlValid === 'invalid' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 13 }}>
          <AlertIcon size={14} color="#EF4444" /> URL is invalid or does not match an allowed retailer domain.
        </div>
      )}
      <p style={{ fontSize: 12, color: TEXT_SUB }}>
        Only HTTPS URLs from allowed retailer domains are accepted. Redirects are 302 (no caching).
      </p>
    </div>
  );

  if (step === 3) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input
        label="Tracker Name *"
        value={wizardData.trackerName}
        onChange={e => setWizardData(d => ({ ...d, trackerName: e.target.value }))}
        placeholder="e.g. Influencer1, WinterPromo"
      />
      <Input
        label="Number of Tracker Links Expected"
        type="number"
        value={wizardData.trackerCount}
        onChange={e => setWizardData(d => ({ ...d, trackerCount: e.target.value }))}
        placeholder="1"
      />
      <p style={{ fontSize: 12, color: TEXT_SUB }}>
        Each campaign supports up to 100 active tracker links. Your brand's total limit is 1,000 active trackers.
      </p>
    </div>
  );

  if (step === 4) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: BG_SUB, borderRadius: 10, padding: '16px 20px',
        border: `1px solid ${BORDER}`,
      }}>
        <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: TEXT }}>Campaign Summary</h4>
        {[
          ['Campaign Name', wizardData.name || '—'],
          ['Flight Dates', wizardData.flightStart && wizardData.flightEnd ? `${wizardData.flightStart} → ${wizardData.flightEnd}` : '—'],
          ['Wallet', WALLET_OPTIONS.find(w => w.value === wizardData.wallet)?.label || '—'],
          ['Destination URL', wizardData.destinationUrl || '—'],
          ['Tracker Name', wizardData.trackerName || '—'],
          ['Tracker Count', wizardData.trackerCount || '1'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
            <span style={{ color: TEXT_MID }}>{k}</span>
            <span style={{ color: TEXT, fontWeight: 500, maxWidth: 260, textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
          </div>
        ))}
      </div>

      {generatedLink && (
        <div style={{ background: ACCENT_M, borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontSize: 12, color: ACCENT, fontWeight: 600, marginBottom: 8 }}>Your Tracker Link</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <code style={{ flex: 1, fontSize: 12, color: TEXT, wordBreak: 'break-all', fontFamily: 'monospace' }}>
              {generatedLink}
            </code>
            <button
              onClick={() => handleCopyLink(generatedLink)}
              style={{
                border: `1px solid ${ACCENT}`, borderRadius: 6, padding: '6px 12px',
                background: copied ? ACCENT : 'transparent',
                color: copied ? WHITE : ACCENT, fontSize: 12, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
            >
              {copied ? <><CheckIcon size={12} color={WHITE} /> Copied!</> : <><CopyIcon color={ACCENT} /> Copy</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return null;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BYOTDashboardPage({ onViewCampaign }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    name: '', flightStart: '', flightEnd: '', wallet: 'wallet-a',
    destinationUrl: '', trackerName: '', trackerCount: '1',
  });
  const { toast, showToast } = useToast();

  // Filter campaigns
  const filtered = CAMPAIGNS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const allSelected = filtered.length > 0 && selected.length === filtered.length;
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map(c => c.id));
  const toggleRow = id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleBulkPause = () => {
    showToast(`${selected.length} campaign(s) paused`);
    setSelected([]);
  };
  const handleBulkArchive = () => {
    showToast(`${selected.length} campaign(s) archived`);
    setSelected([]);
  };

  const handleWizardNext = () => {
    if (wizardStep < STEP_LABELS.length - 1) setWizardStep(s => s + 1);
    else {
      setWizardOpen(false);
      setWizardStep(0);
      setWizardData({ name: '', flightStart: '', flightEnd: '', wallet: 'wallet-a', destinationUrl: '', trackerName: '', trackerCount: '1' });
      showToast('Campaign created and tracker link generated!');
    }
  };

  const handleExport = () => {
    showToast('Exporting campaigns as TSV…');
  };

  // Totals
  const totalClicks = CAMPAIGNS.reduce((s, c) => s + c.clicks, 0);
  const totalAtcs   = CAMPAIGNS.reduce((s, c) => s + c.atcs, 0);
  const totalOrders = CAMPAIGNS.reduce((s, c) => s + c.orders, 0);
  const totalRev    = CAMPAIGNS.reduce((s, c) => s + c.revenue, 0);

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: 24 }}>
      <Toast {...toast} />

      {/* Top bar */}
      <Toolbar
        noBorder
        left={<span style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>BYOT Campaigns</span>}
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline" onClick={handleExport}>
              <DownloadIcon size={14} /> Export
            </Button>
            <Button variant="primary" onClick={() => setWizardOpen(true)}>
              <PlusIcon size={13} color={WHITE} /> Create Campaign
            </Button>
          </div>
        }
        style={{ marginBottom: 20, background: 'transparent' }}
      />

      {/* KPI chips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <KPIChip label="Link Clicks" value={totalClicks.toLocaleString()} />
        <KPIChip label="Add to Carts" value={totalAtcs.toLocaleString()} />
        <KPIChip label="Orders" value={totalOrders.toLocaleString()} />
        <KPIChip label="Total Revenue" value={`₹${(totalRev / 1000).toFixed(0)}K`} />
      </div>

      {/* Chart */}
      <div style={{
        background: BG, border: `1px solid ${BORDER}`, borderRadius: 10,
        padding: '20px 24px', marginBottom: 20,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 16 }}>7-Day Trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: TEXT_MID }} />
            <YAxis tick={{ fontSize: 11, fill: TEXT_MID }} />
            <Tooltip contentStyle={{ fontFamily: FONT, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="clicks"  stroke={ACCENT} strokeWidth={2} dot={false} name="Clicks" />
            <Line type="monotone" dataKey="orders"  stroke={GREEN}  strokeWidth={2} dot={false} name="Orders" />
            <Line type="monotone" dataKey="revenue" stroke={AMBER}  strokeWidth={2} dot={false} name="Revenue (₹)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Toolbar */}
      <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 10 }}>
        <Toolbar
          left={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns…" width={220} />
              <Select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Paused', label: 'Paused' },
                  { value: 'Draft', label: 'Draft' },
                ]}
              />
            </div>
          }
          right={
            selected.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_MID }}>{selected.length} selected</span>
                <Button variant="outline" onClick={handleBulkPause}>Pause Selected</Button>
                <Button variant="outline" onClick={handleBulkArchive}>Archive Selected</Button>
                <Button variant="icon" onClick={() => setSelected([])}><CloseIcon size={14} /></Button>
              </div>
            ) : null
          }
        />

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
            <thead>
              <tr style={{ background: BG_SUB, borderBottom: `1px solid ${BORDER}` }}>
                {['', 'Campaign Name', 'Trackers', 'Clicks', 'ATCs', 'Orders', 'Revenue', 'Wallet', 'Status', 'Actions'].map(col => (
                  <th key={col} style={{
                    padding: '10px 14px', textAlign: 'left', fontSize: 12,
                    fontWeight: 600, color: TEXT_MID, whiteSpace: 'nowrap',
                  }}>
                    {col === '' ? (
                      <input type="checkbox" checked={allSelected} onChange={toggleAll}
                        style={{ cursor: 'pointer', width: 14, height: 14 }} />
                    ) : col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '48px 0', color: TEXT_SUB, fontSize: 13 }}>
                    No campaigns found. Create your first BYOT campaign to get started.
                  </td>
                </tr>
              ) : filtered.map(c => (
                <CampaignRow
                  key={c.id}
                  campaign={c}
                  selected={selected.includes(c.id)}
                  onToggle={() => toggleRow(c.id)}
                  onView={() => onViewCampaign && onViewCampaign(c)}
                  onPause={() => showToast(`"${c.name}" paused`)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '12px 16px', borderTop: `1px solid ${BORDER}` }}>
          <Pagination total={filtered.length} page={page} perPage={20} onChange={setPage} entityLabel="campaigns" />
        </div>
      </div>

      {/* Campaign creation wizard drawer */}
      {wizardOpen && createPortal(
        <Drawer
          open={wizardOpen}
          onClose={() => { setWizardOpen(false); setWizardStep(0); }}
          title="Create BYOT Campaign"
          width={600}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="ghost"
                onClick={() => wizardStep > 0 ? setWizardStep(s => s - 1) : setWizardOpen(false)}
              >
                {wizardStep === 0 ? 'Cancel' : '← Back'}
              </Button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_MID }}>Step {wizardStep + 1} of {STEP_LABELS.length}</span>
                <Button variant="primary" onClick={handleWizardNext}>
                  {wizardStep === STEP_LABELS.length - 1 ? 'Generate Tracker Link' : 'Next →'}
                </Button>
              </div>
            </div>
          }
        >
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
            {STEP_LABELS.map((label, i) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', height: 3, borderRadius: 2,
                  background: i <= wizardStep ? ACCENT : BORDER,
                  transition: 'background 0.2s',
                }} />
                <span style={{
                  fontSize: 10, color: i === wizardStep ? ACCENT : TEXT_MID,
                  fontWeight: i === wizardStep ? 600 : 400, textAlign: 'center',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <WizardStep step={wizardStep} wizardData={wizardData} setWizardData={setWizardData} />
        </Drawer>,
        document.body
      )}
    </div>
  );
}

// ── Campaign Row ──────────────────────────────────────────────────────────────
function CampaignRow({ campaign: c, selected, onToggle, onView, onPause }) {
  const [hover, setHover] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? BG_SUB : BG,
        borderBottom: `1px solid ${BORDER}`,
        cursor: 'pointer',
      }}
    >
      <td style={{ padding: '10px 14px' }}>
        <input type="checkbox" checked={selected} onChange={onToggle}
          style={{ cursor: 'pointer', width: 14, height: 14 }} />
      </td>
      <td style={{ padding: '10px 14px' }}>
        <button
          onClick={onView}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: ACCENT }}>{c.name}</span>
        </button>
        <br />
        <span style={{ fontSize: 11, color: TEXT_SUB }}>
          {c.flightStart} → {c.flightEnd}
        </span>
      </td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{c.trackers}</td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{c.clicks.toLocaleString()}</td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{c.atcs.toLocaleString()}</td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{c.orders.toLocaleString()}</td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>₹{c.revenue.toLocaleString()}</td>
      <td style={{ padding: '10px 14px' }}>
        <span style={{ fontSize: 12, color: c.balance === 0 ? '#EF4444' : TEXT_MID }}>
          {c.wallet}
          {c.balance === 0 && <span style={{ marginLeft: 4, color: '#EF4444' }}>⚠</span>}
        </span>
      </td>
      <td style={{ padding: '10px 14px' }}>
        <Badge status={c.status} />
      </td>
      <td style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <Button variant="outline" onClick={onView} style={{ padding: '4px 10px', fontSize: 12 }}>View</Button>
          <Button variant="icon" onClick={onPause} title="Pause campaign">
            <Icon size={14} color={TEXT_MID}>
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </Icon>
          </Button>
        </div>
      </td>
    </tr>
  );
}
