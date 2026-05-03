import { useState } from 'react';
import {
  Button, Icon,
  CloseIcon, EditIcon, InfoIcon, ChevronDownIcon,
  CalendarIcon, SearchIcon, RefreshIcon, DownloadIcon, PlusIcon, MoreIcon,
} from '../../../ui';
import { EmptyState } from '../../../ui';
import { SectionCard } from '../../../ui';
import { CreateAdGroupDrawer } from './create-ad-group-drawer';

// ── Design tokens ─────────────────────────────────────────────────────────────
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

// ── Hand-rolled icons ─────────────────────────────────────────────────────────
const TrendingUpIcon = ({ size = 14, color = TEXT_MID }) => (
  <Icon size={size} color={color}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>
);

// ── Status badge for ad groups ────────────────────────────────────────────────
const STATUS_STYLE = {
  active: { bg: 'var(--osmos-brand-green-muted)', color: GREEN,    dot: GREEN },
  paused: { bg: 'var(--osmos-brand-amber-muted)',          color: 'var(--osmos-brand-amber)', dot: 'var(--osmos-brand-amber)' },
  draft:  { bg: BG_SUBTLE,                         color: TEXT_MID, dot: TEXT_MID },
};

// ── Shared form-select style ──────────────────────────────────────────────────
const SELECT = {
  padding: '8px 32px 8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, color: TEXT, backgroundColor: BG, appearance: 'none',
  outline: 'none', width: '100%', fontFamily: FONT, cursor: 'pointer',
};

// ── CreateCampaignDrawer ──────────────────────────────────────────────────────
export function CreateCampaignDrawer({ open, onClose }) {
  const [activeTab,           setActiveTab]           = useState('estimator');
  const [adGroupDrawerOpen,   setAdGroupDrawerOpen]   = useState(false);
  const [adGroups,            setAdGroups]            = useState([]);
  const [editingAdGroupIndex, setEditingAdGroupIndex] = useState(null);
  const [hoveredRow,          setHoveredRow]          = useState(null);

  const handleAddAdGroup = (adGroupData) => {
    const newAdGroup = {
      id:              `ag-${Date.now()}`,
      name:            adGroupData.name || `Ad Group ${adGroups.length + 1}`,
      status:          'draft',
      biddingStrategy: 'CPM',
      creationDate:    new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }),
      dailyBudget:     '$500',
      adSpend:         '$0',
      impressions:     '0',
      clicks:          '0',
    };

    if (editingAdGroupIndex !== null) {
      const updated = [...adGroups];
      updated[editingAdGroupIndex] = { ...updated[editingAdGroupIndex], ...newAdGroup };
      setAdGroups(updated);
      setEditingAdGroupIndex(null);
    } else {
      setAdGroups([...adGroups, newAdGroup]);
    }
  };

  const handleEditAdGroup = (index) => {
    setEditingAdGroupIndex(index);
    setAdGroupDrawerOpen(true);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.3)' }}
      />

      {/* Panel — 90% width */}
      <div style={{
        position: 'fixed', right: 0, top: 0, zIndex: 50,
        height: '100%', width: '90%',
        backgroundColor: BG_SUBTLE,
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        fontFamily: FONT,
      }}>
        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>
              Campaign Name (8th September | 10:00)
            </span>
            <button style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', color: TEXT_MID }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MID)}
            >
              <EditIcon size={16} color="currentColor" />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: ACCENT, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              <InfoIcon size={14} color={ACCENT} />
              How to create and modify a campaign?
            </a>
            <button onClick={onClose} style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex' }}>
              <CloseIcon size={20} color={TEXT_MID} />
            </button>
          </div>
        </div>

        {/* ── Body (main content + right sidebar) ── */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* ── Main content ── */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Campaign Settings card */}
            <SectionCard title="Campaign Settings" bodyBg={BG} bodyPad={24}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Bidding + Schedule */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  {/* Bidding Strategy */}
                  <div>
                    <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: TEXT }}>Bidding Strategy</h3>
                    <SectionCard bodyBg={BG_SUBTLE} bodyPad={16}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: TEXT, marginBottom: 8 }}>
                        Select buying type <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                        <InfoIcon size={12} color={TEXT_SUB} />
                      </label>
                      <div style={{ position: 'relative', width: 208 }}>
                        <select style={SELECT}>
                          <option>Choose strategy</option>
                          <option>CPM</option>
                          <option>CPC</option>
                          <option>CPA</option>
                        </select>
                        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <ChevronDownIcon size={14} color={TEXT_MID} />
                        </div>
                      </div>
                      <p style={{ margin: '8px 0 0', fontSize: 11, color: TEXT_SUB }}>You can select the buying type like CPM/CPC</p>
                    </SectionCard>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: TEXT }}>Schedule</h3>
                    <SectionCard bodyBg={BG_SUBTLE} bodyPad={16}>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>Start date</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, backgroundColor: BG }}>
                            <CalendarIcon size={16} color={ACCENT} />
                            <span style={{ fontSize: 13, color: TEXT }}>08 Sept 2025</span>
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>
                            End date{' '}
                            <span style={{ fontSize: 11, color: TEXT_SUB, fontStyle: 'italic' }}>(Optional)</span>
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, backgroundColor: BG }}>
                            <CalendarIcon size={16} color={ACCENT} />
                            <span style={{ fontSize: 13, color: TEXT }}>28 Sept 2025</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ margin: '10px 0 0', fontSize: 11, color: TEXT_SUB }}>* Date range will be set in the Asia/Kolkata timezone</p>
                    </SectionCard>
                  </div>
                </div>

                {/* Budget + Wallet */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  {/* Budget */}
                  <div>
                    <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: TEXT }}>Budget</h3>
                    <SectionCard bodyBg={BG_SUBTLE} bodyPad={16}>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>
                            Enter Total Budget ($) <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                          </label>
                          <input placeholder="Enter here" style={{ ...SELECT, width: '100%', boxSizing: 'border-box', paddingRight: 12 }} />
                          <p style={{ margin: '4px 0 0', fontSize: 11, color: TEXT_SUB }}>Minimum budget should be $10</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>
                            Enter Daily Budget ($) <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                          </label>
                          <input placeholder="Enter here" style={{ ...SELECT, width: '100%', boxSizing: 'border-box', paddingRight: 12 }} />
                          <p style={{ margin: '4px 0 0', fontSize: 11, color: TEXT_SUB }}>Minimum budget should be $10</p>
                        </div>
                      </div>
                    </SectionCard>
                  </div>

                  {/* Wallet */}
                  <div>
                    <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: TEXT }}>Wallet</h3>
                    <SectionCard bodyBg={ACCENT_M} bodyPad={16} style={{ border: `1px solid rgba(99,108,255,0.2)` }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: TEXT, marginBottom: 8 }}>
                        Choose wallet <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                        <InfoIcon size={12} color={TEXT_SUB} />
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select style={SELECT}>
                          <option>Default wallet</option>
                        </select>
                        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <ChevronDownIcon size={14} color={TEXT_MID} />
                        </div>
                      </div>
                      <p style={{ margin: '8px 0 0', fontSize: 12, color: GREEN, fontWeight: 500 }}>Wallet Balance: $5,850,489.59</p>
                    </SectionCard>
                  </div>
                </div>

                {/* Additional Setting */}
                <div>
                  <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: TEXT }}>Additional Setting</h3>
                  <SectionCard bodyBg={BG_SUBTLE} bodyPad={16}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: TEXT, marginBottom: 8 }}>
                          Campaign Priority <InfoIcon size={12} color={TEXT_SUB} />
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select style={SELECT}>
                            <option>Guaranteed</option>
                            <option>Standard</option>
                            <option>Low</option>
                          </select>
                          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <ChevronDownIcon size={14} color={TEXT_MID} />
                          </div>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: TEXT, marginBottom: 8 }}>
                          Campaign Pacing <InfoIcon size={12} color={TEXT_SUB} />
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select style={SELECT}>
                            <option>Accelerated</option>
                            <option>Standard</option>
                            <option>Smooth</option>
                          </select>
                          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <ChevronDownIcon size={14} color={TEXT_MID} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>

                {/* Advance Setting link */}
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: ACCENT, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Advance Setting
                  <ChevronDownIcon size={14} color={ACCENT} style={{ transform: 'rotate(-90deg)' }} />
                </button>
              </div>
            </SectionCard>

            {/* Ad Groups card */}
            <SectionCard
              title="Ad Groups"
              headerSize="md"
              titleRight={
                <>
                  <span style={{ fontSize: 11, padding: '2px 8px', backgroundColor: BG_SUBTLE, color: TEXT_MID, borderRadius: 999 }}>
                    {adGroups.length}
                  </span>
                  <IconBtn onClick={() => {}}><RefreshIcon size={14} color={TEXT_MID} /></IconBtn>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, backgroundColor: BG }}>
                    <SearchIcon size={14} color={TEXT_SUB} />
                    <input type="text" placeholder="Search Ad Groups" style={{ border: 'none', outline: 'none', width: 140, fontSize: 13, color: TEXT, background: 'transparent', fontFamily: FONT }} />
                  </div>
                  <IconBtn onClick={() => {}}><DownloadIcon size={14} color={TEXT_MID} /></IconBtn>
                  <Button variant="primary" onClick={() => { setEditingAdGroupIndex(null); setAdGroupDrawerOpen(true); }}>
                    <PlusIcon size={14} color="#fff" />
                    <span style={{ marginLeft: 4 }}>Add Ad Group</span>
                  </Button>
                </>
              }
              bodyBg={BG}
              bodyPad={0}
            >
              {/* Ad groups table */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE }}>
                    {['Name', 'Status', 'Bidding Strategy', 'Creation Date', 'Daily Budget', 'Ad Spend', 'Impressions', 'Clicks', 'Actions'].map((col, i) => (
                      <th key={col} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 600, color: TEXT_MID, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {col === 'Bidding Strategy' || col === 'Daily Budget'
                          ? <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{col} <InfoIcon size={10} color={TEXT_SUB} /></span>
                          : col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adGroups.map((ag, index) => {
                    const s = STATUS_STYLE[ag.status] || STATUS_STYLE.draft;
                    return (
                      <tr
                        key={ag.id}
                        style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: hoveredRow === index ? BG_SUBTLE : BG, transition: 'background 0.1s' }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ fontSize: 13, color: ACCENT, fontWeight: 500, cursor: 'pointer' }} onClick={() => handleEditAdGroup(index)}>
                            {ag.name}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, backgroundColor: s.bg, color: s.color }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: s.dot }} />
                            {ag.status.charAt(0).toUpperCase() + ag.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.biddingStrategy}</td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.creationDate}</td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.dailyBudget}</td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.adSpend}</td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.impressions}</td>
                        <td style={{ padding: '10px 12px', fontSize: 13, color: TEXT_MID }}>{ag.clicks}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <IconBtn><TrendingUpIcon size={14} color={TEXT_MID} /></IconBtn>
                            <IconBtn><MoreIcon size={14} color={TEXT_MID} /></IconBtn>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty state */}
              {adGroups.length === 0 && (
                <EmptyState message="Start building your Campaign by adding Ad Groups">
                  <Button variant="primary" onClick={() => { setEditingAdGroupIndex(null); setAdGroupDrawerOpen(true); }}>
                    <PlusIcon size={14} color="#fff" />
                    <span style={{ marginLeft: 4 }}>Add Your First Ad Group</span>
                  </Button>
                </EmptyState>
              )}
            </SectionCard>
          </div>

          {/* ── Right sidebar — Media Estimator ── */}
          <div style={{ width: 288, backgroundColor: BG, borderLeft: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}` }}>
              {[{ id: 'estimator', label: 'Media Estimator' }, { id: 'delivery', label: 'Delivery so far' }].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, fontFamily: FONT, transition: 'all 0.15s',
                    borderBottom: activeTab === id ? `2px solid ${ACCENT}` : '2px solid transparent',
                    backgroundColor: activeTab === id ? ACCENT_M : 'transparent',
                    color: activeTab === id ? ACCENT : TEXT_MID,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sidebar content */}
            <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[{ label: 'Impressions', hint: 'Your estimated and max impressions will be displayed here.' },
                { label: 'Pricing',     hint: 'Your suggested CPM and suggested total budget will be displayed here.' }].map(({ label, hint }) => (
                <div key={label} style={{ padding: 16, backgroundColor: BG_SUBTLE, borderRadius: 8, border: `1px solid ${BORDER}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8 }}>
                    {label} <InfoIcon size={12} color={TEXT_SUB} />
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: TEXT_SUB, fontStyle: 'italic', lineHeight: 1.5 }}>{hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '16px 24px', backgroundColor: BG, borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => {}} disabled={adGroups.length === 0}
            style={{ opacity: adGroups.length === 0 ? 0.5 : 1, cursor: adGroups.length === 0 ? 'not-allowed' : 'pointer' }}>
            Launch Campaign
          </Button>
        </div>
      </div>

      {/* Nested Ad Group Drawer */}
      <CreateAdGroupDrawer
        open={adGroupDrawerOpen}
        onClose={() => setAdGroupDrawerOpen(false)}
        onSave={handleAddAdGroup}
      />
    </>
  );
}

// ── IconBtn — small icon-only button ─────────────────────────────────────────
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
        background: hover ? BG_SUBTLE : 'transparent', transition: 'all 0.15s', padding: 0,
      }}
    >
      {children}
    </button>
  );
}
