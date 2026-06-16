import { useState } from 'react';
import { CreateCampaignModal } from './CreateCampaignModal';
import { CampaignWizard } from './CampaignWizard';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT        = "'Open Sans', sans-serif";
const BLUE        = '#1970E1';
const BLUE_BG     = '#E8F1FC';
const GREY_TEXT   = '#404040';
const GREY_MID    = '#7B7B7B';
const GREY_BORDER = '#DEDEDE';
const GREY_SURF1  = '#FAFAFA';
const TBL_BORDER  = '#EDF0F5';

// ── Mock data ─────────────────────────────────────────────────────────────────
const CAMPAIGNS = [
  { id: 1, status: 'ACTIVE',    name: 'Spark Joy & Wonder',     channel: 'Meta',     objective: 'Awareness',  dailyBudget: '$300',    adSpend: '$5,854.66', adImpressions: '911.8 K' },
  { id: 2, status: 'DRAFT',     name: 'Tap to Celebrate',       channel: 'Google',   objective: 'Sales',      dailyBudget: '$750',    adSpend: '-',         adImpressions: '-' },
  { id: 3, status: 'ACTIVE',    name: 'Uncover the Magic',      channel: 'TikTok',   objective: 'Traffic',    dailyBudget: '$1,250',  adSpend: '$6,432.10', adImpressions: '1.4 M' },
  { id: 4, status: 'ACTIVE',    name: 'Venture into Festivities',channel: 'Facebook', objective: 'Engagement', dailyBudget: '$1,800',  adSpend: '$6,785.90', adImpressions: '1.2 M' },
  { id: 5, status: 'ACTIVE',    name: 'Ignite Your Spirit',     channel: 'TikTok',   objective: 'Traffic',    dailyBudget: '$2,400',  adSpend: '$6,920.25', adImpressions: '1.3 M' },
  { id: 6, status: 'PAUSED',    name: 'Celebrate Your Journey', channel: 'Meta',     objective: 'Leads',      dailyBudget: '$3,200',  adSpend: '$7,100.99', adImpressions: '980.5 K' },
  { id: 7, status: 'DELIVERED', name: 'Trail to Triumph',       channel: 'Google',   objective: 'Engagement', dailyBudget: '$4,600',  adSpend: '$7,500.00', adImpressions: '1.1 M' },
  { id: 8, status: 'REJECTED',  name: 'Enhance Your Festive Fun',channel: 'Facebook', objective: 'Traffic',   dailyBudget: '$5,000',  adSpend: '-',         adImpressions: '-' },
];

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    ACTIVE:    { dot: '#22C55E', text: '#16A34A', icon: 'dot' },
    DRAFT:     { dot: GREY_MID,  text: GREY_MID,  icon: 'file' },
    PAUSED:    { dot: '#EF4444', text: '#DC2626',  icon: 'dot' },
    DELIVERED: { dot: '#22C55E', text: '#16A34A',  icon: 'check' },
    REJECTED:  { dot: '#EF4444', text: '#DC2626',  icon: 'warn' },
  }[status] || { dot: GREY_MID, text: GREY_MID, icon: 'dot' };

  const iconEl = {
    dot:   <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot }} />,
    file:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={cfg.dot} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={cfg.dot} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    warn:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={cfg.dot} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  }[cfg.icon];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {iconEl}
      <span style={{ fontSize: 11, fontWeight: 600, color: cfg.text, letterSpacing: 0.3 }}>{status}</span>
    </div>
  );
}

// ── OffisteCampaignsTable ─────────────────────────────────────────────────────
export function OffisteCampaignsTable() {
  const [selected, setSelected]       = useState(new Set());
  const [modalOpen, setModalOpen]     = useState(false);
  const [searchVal, setSearchVal]     = useState('');
  const [hoverRow, setHoverRow]       = useState(null);
  const [wizardOpen, setWizardOpen]   = useState(false);
  const [campaignInfo, setCampaignInfo] = useState(null);

  const toggleAll = () => {
    if (selected.size === CAMPAIGNS.length) setSelected(new Set());
    else setSelected(new Set(CAMPAIGNS.map(c => c.id)));
  };
  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const filtered = CAMPAIGNS.filter(c =>
    c.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  const allSelected = selected.size === CAMPAIGNS.length;

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        {/* Icon + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🚀</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: GREY_TEXT }}>Campaigns</span>
          <InfoCircle />
        </div>

        {/* Right controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Column config */}
          <button style={iconBtnStyle} title="Configure columns">
            <ColsIcon />
          </button>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: `1px solid ${GREY_BORDER}`, borderRadius: 8,
            padding: '6px 10px', background: 'white',
          }}>
            <SearchIcon />
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search category L1"
              style={{ border: 'none', outline: 'none', fontSize: 13, fontFamily: FONT, color: GREY_TEXT, width: 140 }}
            />
          </div>
          {/* Create Campaign */}
          <button onClick={() => setModalOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', background: BLUE, color: 'white',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
            fontFamily: FONT, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
            Create Campaign
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ marginBottom: 12 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', background: 'white',
          border: `1px solid ${GREY_BORDER}`, borderRadius: 20,
          fontSize: 13, color: GREY_MID, fontFamily: FONT, cursor: 'pointer',
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add a Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${GREY_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
          <thead>
            <tr style={{ background: GREY_SURF1, borderBottom: `1px solid ${TBL_BORDER}` }}>
              <th style={thStyle('center', 44)}>
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>
              <th style={thStyle('left', 90)}>Status</th>
              <th style={thStyle('left')}>Campaign names <InfoCircle /></th>
              <th style={thStyle('left', 100)}>Channel <InfoCircle /></th>
              <th style={thStyle('left', 110)}>Objective <InfoCircle /></th>
              <th style={thStyle('right', 120)}>Daily Budget <InfoCircle /></th>
              <th style={thStyle('right', 120)}>Ad Spend <InfoCircle /></th>
              <th style={thStyle('right', 130)}>Ad Impressions <InfoCircle /></th>
              <th style={thStyle('center', 72)}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr
                key={row.id}
                onMouseEnter={() => setHoverRow(row.id)}
                onMouseLeave={() => setHoverRow(null)}
                style={{
                  background: hoverRow === row.id ? '#F5F8FF' : 'white',
                  borderBottom: `1px solid ${TBL_BORDER}`,
                  transition: 'background 0.1s',
                }}
              >
                <td style={tdStyle('center')}>
                  <Checkbox checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} />
                </td>
                <td style={tdStyle('center')}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={tdStyle('left')}>
                  <span style={{ color: BLUE, fontWeight: 500, cursor: 'pointer' }}>{row.name}</span>
                </td>
                <td style={tdStyle('left')}>{row.channel}</td>
                <td style={tdStyle('left')}>{row.objective}</td>
                <td style={{ ...tdStyle('right'), color: BLUE, fontWeight: 500 }}>{row.dailyBudget}</td>
                <td style={tdStyle('right')}>{row.adSpend}</td>
                <td style={tdStyle('right')}>{row.adImpressions}</td>
                <td style={tdStyle('center')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button style={rowActionBtnStyle} title="Edit">
                      <EditIcon />
                    </button>
                    <button style={rowActionBtnStyle} title="More options">
                      <MoreIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 4px', fontSize: 12, color: GREY_MID,
      }}>
        <span>Comparison mode not applicable</span>
        <span>One Filter Applicable: <span style={{ color: BLUE }}>Date</span></span>
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onNext={(data) => {
          setCampaignInfo(data);
          setModalOpen(false);
          setWizardOpen(true);
        }}
      />

      {/* Campaign Wizard */}
      <CampaignWizard
        open={wizardOpen}
        onClose={() => { setWizardOpen(false); setCampaignInfo(null); }}
        onBack={() => { setWizardOpen(false); setModalOpen(true); }}
        campaignInfo={campaignInfo}
      />
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────────────────────────
function thStyle(align = 'left', width) {
  return {
    padding: '14px 16px', textAlign: align, fontSize: 13, fontWeight: 600,
    color: GREY_TEXT, whiteSpace: 'nowrap', userSelect: 'none',
    ...(width ? { width } : {}),
    display: 'table-cell', verticalAlign: 'middle',
  };
}
function tdStyle(align = 'left') {
  return { padding: '12px 16px', textAlign: align, fontSize: 13, color: GREY_MID, verticalAlign: 'middle' };
}

const iconBtnStyle = {
  border: `1px solid ${GREY_BORDER}`, borderRadius: 8, background: 'white',
  padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
};

const rowActionBtnStyle = {
  border: 'none', background: 'none', cursor: 'pointer',
  padding: '4px', display: 'flex', alignItems: 'center', color: GREY_MID,
  borderRadius: 4,
};

// ── Micro-icons ───────────────────────────────────────────────────────────────
function InfoCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function ColsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
    </svg>
  );
}
function Checkbox({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{
      width: 16, height: 16, borderRadius: 2, cursor: 'pointer',
      border: `1.5px solid ${checked ? BLUE : GREY_BORDER}`,
      background: checked ? BLUE : 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.1s',
    }}>
      {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>
  );
}
