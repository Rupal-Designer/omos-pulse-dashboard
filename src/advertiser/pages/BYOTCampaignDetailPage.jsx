import { useState } from 'react';
import {
  Button, Badge, SearchBar, Toolbar, Pagination, Drawer,
  Input, Select, Toast, useToast,
  PlusIcon, DownloadIcon, CloseIcon, CheckIcon, ChevronLeftIcon, Icon,
} from '../../ui';

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
const WHITE    = '#fff';

// ── Icons ─────────────────────────────────────────────────────────────────────
function CopyIcon(props) {
  return (
    <Icon size={14} {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

function PauseIcon(props) {
  return (
    <Icon size={14} {...props}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </Icon>
  );
}

function ArchiveIcon(props) {
  return (
    <Icon size={14} {...props}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </Icon>
  );
}

// ── Mock tracker data ─────────────────────────────────────────────────────────
function makeTrackers(campaign) {
  return Array.from({ length: campaign?.trackers || 5 }, (_, i) => ({
    id: `t${i + 1}`,
    name: `${campaign?.name?.split(' ')[0] || 'Tracker'}-${String(i + 1).padStart(2, '0')}`,
    destinationUrl: `https://retailer.com/product/${1000 + i}`,
    trackerLink: `https://retailer.com/product/${1000 + i}?tag=byot-${Math.random().toString(36).slice(2, 8)}`,
    clicks: Math.floor(Math.random() * 5000 + 200),
    status: i % 5 === 3 ? 'Paused' : 'Active',
    created: `2026-04-${String(15 + i).padStart(2, '0')}`,
    createdBy: ['Priya S.', 'Arjun M.', 'Meera K.', 'Dev R.', 'Zara T.'][i % 5],
  }));
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BYOTCampaignDetailPage({ campaign, onBack }) {
  const trackers = makeTrackers(campaign);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('trackers'); // 'trackers' | 'diagnostics'
  const [copiedId, setCopiedId] = useState(null);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [newTracker, setNewTracker] = useState({ name: '', url: '' });
  const { toast, showToast } = useToast();

  const filtered = trackers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const allSelected = filtered.length > 0 && selected.length === filtered.length;
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map(t => t.id));
  const toggleRow = id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleCopy = (tracker) => {
    navigator.clipboard?.writeText(tracker.trackerLink).catch(() => {});
    setCopiedId(tracker.id);
    setTimeout(() => setCopiedId(null), 1500);
    showToast('Tracker link copied to clipboard');
  };

  const handleBulkCopy = () => {
    const links = filtered.filter(t => selected.includes(t.id)).map(t => t.trackerLink).join('\n');
    navigator.clipboard?.writeText(links).catch(() => {});
    showToast(`${selected.length} tracker link(s) copied`);
    setSelected([]);
  };

  const totalClicks = trackers.reduce((s, t) => s + t.clicks, 0);

  // Campaign stats from prop or fallback
  const stats = campaign || { clicks: totalClicks, atcs: 3200, orders: 920, revenue: 46000 };

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: 24 }}>
      <Toast {...toast} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: ACCENT, fontSize: 13, padding: 0 }}
        >
          <ChevronLeftIcon size={14} color={ACCENT} /> BYOT
        </button>
        <span style={{ fontSize: 13, color: TEXT_MID }}>›</span>
        <span style={{ fontSize: 13, color: TEXT }}>{campaign?.name || 'Campaign Detail'}</span>
      </div>

      {/* Top bar */}
      <Toolbar
        noBorder
        left={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{campaign?.name || 'Campaign Detail'}</span>
            {campaign?.status && <Badge status={campaign.status} />}
          </div>
        }
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Pause Campaign</Button>
          </div>
        }
        style={{ marginBottom: 16, background: 'transparent' }}
      />

      {/* Stat bar */}
      <div style={{
        display: 'flex', gap: 0,
        background: BG, border: `1px solid ${BORDER}`, borderRadius: 10,
        marginBottom: 20, overflow: 'hidden',
      }}>
        {[
          { label: 'Link Clicks', value: stats.clicks?.toLocaleString() || totalClicks.toLocaleString() },
          { label: 'Add to Carts', value: stats.atcs?.toLocaleString() || '—' },
          { label: 'Orders', value: stats.orders?.toLocaleString() || '—' },
          { label: 'Total Revenue', value: stats.revenue ? `₹${stats.revenue.toLocaleString()}` : '—' },
          { label: 'Active Trackers', value: trackers.filter(t => t.status === 'Active').length },
        ].map((stat, i, arr) => (
          <div key={stat.label} style={{
            flex: 1, padding: '14px 20px', textAlign: 'center',
            borderRight: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: TEXT_MID, marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: `2px solid ${BORDER}`, marginBottom: 20,
      }}>
        {[
          { key: 'trackers', label: 'Tracker Links' },
          { key: 'diagnostics', label: 'Attribution Diagnostics' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px', border: 'none', background: 'none',
              cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? ACCENT : TEXT_MID,
              borderBottom: activeTab === tab.key ? `2px solid ${ACCENT}` : '2px solid transparent',
              marginBottom: -2,
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'trackers' && (
        <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 10 }}>
          {/* Toolbar */}
          <Toolbar
            left={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trackers…" width={200} />
                <Select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'Active', label: 'Active' },
                    { value: 'Paused', label: 'Paused' },
                    { value: 'Archived', label: 'Archived' },
                  ]}
                />
              </div>
            }
            right={
              selected.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: TEXT_MID }}>{selected.length} selected</span>
                  <Button variant="outline" onClick={handleBulkCopy}>Copy Links</Button>
                  <Button variant="outline" onClick={() => { showToast(`${selected.length} tracker(s) paused`); setSelected([]); }}>Pause</Button>
                  <Button variant="outline" onClick={() => { showToast(`${selected.length} tracker(s) archived`); setSelected([]); }}>Archive</Button>
                  <Button variant="icon" onClick={() => setSelected([])}><CloseIcon size={14} /></Button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="outline"><DownloadIcon size={14} /> Export</Button>
                  <Button variant="outline">Bulk Upload</Button>
                  <Button variant="primary" onClick={() => setAddDrawerOpen(true)}>
                    <PlusIcon size={13} color={WHITE} /> Add Tracker
                  </Button>
                </div>
              )
            }
          />

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
              <thead>
                <tr style={{ background: BG_SUB, borderBottom: `1px solid ${BORDER}` }}>
                  {['', 'Tracker Name', 'Destination URL', 'Clicks', 'Status', 'Created', 'Created By', 'Actions'].map(col => (
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
                    <td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: TEXT_SUB, fontSize: 13 }}>
                      No trackers found. Add your first tracker link above.
                    </td>
                  </tr>
                ) : filtered.map(t => (
                  <TrackerRow
                    key={t.id}
                    tracker={t}
                    selected={selected.includes(t.id)}
                    onToggle={() => toggleRow(t.id)}
                    onCopy={() => handleCopy(t)}
                    copied={copiedId === t.id}
                    onPause={() => showToast(`"${t.name}" paused`)}
                    onArchive={() => showToast(`"${t.name}" archived`)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '12px 16px', borderTop: `1px solid ${BORDER}` }}>
            <Pagination total={filtered.length} page={page} perPage={20} onChange={setPage} entityLabel="trackers" />
          </div>
        </div>
      )}

      {activeTab === 'diagnostics' && (
        <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '32px 24px' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Attribution Diagnostics</p>
          <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 20 }}>
            Shows sessions where a tracker link click was recorded but no downstream commerce event (ATC, order) was attributed. Use this to identify tracking gaps or validate attribution.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: BG_SUB, borderBottom: `1px solid ${BORDER}` }}>
                {['Tracker Name', 'Click Time', 'Session ID', 'Attribution Status', 'Reason'].map(col => (
                  <th key={col} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: TEXT_MID }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Influencer1-01', time: '2026-04-29 14:32', session: 'sess_abc123', status: 'MISS', reason: 'No PDP view in session' },
                { name: 'Influencer1-02', time: '2026-04-29 15:10', session: 'sess_def456', status: 'MISS', reason: 'Session expired before ATC' },
                { name: 'Beauty-03', time: '2026-04-30 09:45', session: 'sess_ghi789', status: 'PARTIAL', reason: 'ATC recorded, no order' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT_MID }}>{row.time}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: TEXT_SUB, fontFamily: 'monospace' }}>{row.session}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: row.status === 'MISS' ? 'rgba(239,68,68,0.1)' : 'rgba(245,166,35,0.1)',
                      color: row.status === 'MISS' ? '#EF4444' : 'var(--osmos-brand-amber)',
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT_MID }}>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Tracker Drawer */}
      <Drawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        title="Add Tracker Link"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="outline" onClick={() => setAddDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              setAddDrawerOpen(false);
              showToast(`Tracker "${newTracker.name}" generated successfully`);
              setNewTracker({ name: '', url: '' });
            }}>
              Generate Tracker Link
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input
            label="Tracker Name *"
            value={newTracker.name}
            onChange={e => setNewTracker(d => ({ ...d, name: e.target.value }))}
            placeholder="e.g. Influencer1, WinterPromo"
          />
          <Input
            label="Destination URL *"
            value={newTracker.url}
            onChange={e => setNewTracker(d => ({ ...d, url: e.target.value }))}
            placeholder="https://retailer.com/product/..."
          />
          <p style={{ fontSize: 12, color: TEXT_SUB }}>
            A tracker link will be generated by appending a unique tracking tag to your destination URL. Only HTTPS URLs from allowed retailer domains are accepted.
          </p>
        </div>
      </Drawer>
    </div>
  );
}

// ── Tracker Row ───────────────────────────────────────────────────────────────
function TrackerRow({ tracker: t, selected, onToggle, onCopy, copied, onPause, onArchive }) {
  const [hover, setHover] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? BG_SUB : BG, borderBottom: `1px solid ${BORDER}` }}
    >
      <td style={{ padding: '10px 14px' }}>
        <input type="checkbox" checked={selected} onChange={onToggle}
          style={{ cursor: 'pointer', width: 14, height: 14 }} />
      </td>
      <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 500, color: TEXT }}>{t.name}</td>
      <td style={{ padding: '10px 14px' }}>
        <span style={{
          fontSize: 12, color: TEXT_MID, maxWidth: 180,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          display: 'inline-block',
        }} title={t.destinationUrl}>
          {t.destinationUrl}
        </span>
      </td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: TEXT }}>{t.clicks.toLocaleString()}</td>
      <td style={{ padding: '10px 14px' }}><Badge status={t.status} /></td>
      <td style={{ padding: '10px 14px', fontSize: 12, color: TEXT_MID }}>{t.created}</td>
      <td style={{ padding: '10px 14px', fontSize: 12, color: TEXT_MID }}>{t.createdBy}</td>
      <td style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            variant="icon"
            onClick={onCopy}
            title="Copy tracker link"
            style={{ color: copied ? GREEN : TEXT_MID }}
          >
            {copied ? <CheckIcon size={14} color={GREEN} /> : <CopyIcon color={TEXT_MID} />}
          </Button>
          <Button variant="icon" onClick={onPause} title="Pause tracker">
            <PauseIcon color={TEXT_MID} />
          </Button>
          <Button variant="icon" onClick={onArchive} title="Archive tracker">
            <ArchiveIcon color={TEXT_MID} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
