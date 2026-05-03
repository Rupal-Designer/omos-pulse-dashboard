import { useState } from 'react';
import { Button, CloseIcon, CheckIcon, EyeIcon } from '../../../ui';

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
const AMBER     = 'var(--osmos-brand-amber)';

// ── Mock data ─────────────────────────────────────────────────────────────────
const adSlots = [
  { id: 'slot-1', name: 'Header Banner',           position: 'Top of page',    dimensions: '728x90',    avgCTR: '2.4%', avgCPM: '$4.50', dailyImpressions: '125K', viewability: '92%' },
  { id: 'slot-2', name: 'Sidebar Rectangle',       position: 'Right sidebar',  dimensions: '300x250',   avgCTR: '1.8%', avgCPM: '$3.20', dailyImpressions: '98K',  viewability: '85%' },
  { id: 'slot-3', name: 'In-Content Banner',        position: 'Within content', dimensions: '728x90',    avgCTR: '2.1%', avgCPM: '$3.80', dailyImpressions: '110K', viewability: '88%' },
  { id: 'slot-4', name: 'Native Product Carousel',  position: 'Below hero',     dimensions: 'Responsive',avgCTR: '3.2%', avgCPM: '$5.50', dailyImpressions: '145K', viewability: '94%' },
  { id: 'slot-5', name: 'Footer Leaderboard',       position: 'Page footer',    dimensions: '970x90',    avgCTR: '0.9%', avgCPM: '$1.80', dailyImpressions: '180K', viewability: '65%' },
  { id: 'slot-6', name: 'Sticky Bottom Banner',     position: 'Fixed bottom',   dimensions: '320x50',    avgCTR: '1.5%', avgCPM: '$2.40', dailyImpressions: '200K', viewability: '98%' },
];

// ── InventoryDetailsDrawer ────────────────────────────────────────────────────
export function InventoryDetailsDrawer({ open, onClose, page }) {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
    );
  };

  const selectAll = () => {
    setSelectedSlots(selectedSlots.length === adSlots.length ? [] : adSlots.map((s) => s.id));
  };

  if (!open || !page) return null;

  const allSelected = selectedSlots.length === adSlots.length;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 70, backgroundColor: 'rgba(0,0,0,0.15)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', right: 0, top: 0, zIndex: 70,
        height: '100%', width: '70%',
        backgroundColor: BG_SUBTLE,
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        fontFamily: FONT,
      }}>
        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: TEXT }}>{page.name} - Ad Slots</h2>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: TEXT_MID }}>Select specific ad placement locations</p>
          </div>
          <button
            onClick={onClose}
            style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', transition: 'all 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <CloseIcon size={20} color={TEXT_MID} />
          </button>
        </div>

        {/* ── Page Summary ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '16px 24px', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
          <SummaryItem label="Est. Daily Impressions" value={page.estDailyImp} />
          <SummaryItem label="Total Slots"            value={page.totalInventories} />
          <SummaryItem label="Targeting Options"      value={page.targetingOptions} />
          <div style={{ display: 'flex', gap: 8 }}>
            {page.tags.map((tag, i) => (
              <span key={i} style={{ fontSize: 11, padding: '4px 8px', backgroundColor: ACCENT_M, color: ACCENT, borderRadius: 6, fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ backgroundColor: BG, borderRadius: 12, border: `1px solid ${BORDER}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>

            {/* Table header row */}
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SelectBox checked={allSelected} onClick={selectAll} size={20} />
                <span style={{ fontWeight: 600, fontSize: 14, color: TEXT }}>Available Ad Slots</span>
                <span style={{ fontSize: 11, padding: '2px 8px', backgroundColor: BG_SUBTLE, color: TEXT_MID, borderRadius: 999 }}>
                  {selectedSlots.length} selected
                </span>
              </div>
              <Button variant="outline" onClick={() => {}}>
                <EyeIcon size={14} />
                <span style={{ marginLeft: 4 }}>Preview Page</span>
              </Button>
            </div>

            {/* Slot cards grid */}
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {adSlots.map((slot) => {
                const sel   = selectedSlots.includes(slot.id);
                const vPct  = Number.parseInt(slot.viewability);
                const vColor = vPct >= 90 ? GREEN : vPct >= 80 ? AMBER : 'var(--alert-error-primary)';
                return (
                  <div
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    style={{
                      border: `1px solid ${sel ? ACCENT : BORDER}`,
                      borderRadius: 12, padding: 16, cursor: 'pointer',
                      backgroundColor: sel ? ACCENT_M : BG,
                      boxShadow: sel ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = TEXT_MID; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'; } }}
                    onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; } }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <SelectBox
                        checked={sel}
                        onClick={(e) => { e.stopPropagation(); toggleSlot(slot.id); }}
                        size={20}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <div style={{ flex: 1 }}>
                        {/* Name + dimensions pill */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <h4 style={{ margin: 0, fontWeight: 600, fontSize: 13, color: TEXT }}>{slot.name}</h4>
                          <span style={{ fontSize: 11, padding: '3px 8px', backgroundColor: BG_SUBTLE, color: TEXT_MID, borderRadius: 4 }}>
                            {slot.dimensions}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 10px', fontSize: 12, color: TEXT_MID }}>{slot.position}</p>
                        {/* Metrics 2×2 grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
                          <MetricRow label="Avg CTR"    value={slot.avgCTR}           valueColor={GREEN} />
                          <MetricRow label="Avg CPM"    value={slot.avgCPM}           valueColor={TEXT} />
                          <MetricRow label="Daily Imp"  value={slot.dailyImpressions} valueColor={TEXT} />
                          <MetricRow label="Viewability" value={slot.viewability}     valueColor={vColor} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '16px 24px', backgroundColor: BG, borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: TEXT_MID }}>
            <span style={{ fontWeight: 600, color: TEXT }}>{selectedSlots.length}</span> slots selected
            {selectedSlots.length > 0 && (
              <span style={{ marginLeft: 8 }}>
                • Est. combined impressions:{' '}
                <span style={{ fontWeight: 600, color: TEXT }}>485K/day</span>
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Confirm Selection</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── SummaryItem — stat label + value in drawer header ─────────────────────────
function SummaryItem({ label, value }) {
  return (
    <div>
      <span style={{ fontSize: 11, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <p style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 600, color: TEXT }}>{value}</p>
    </div>
  );
}

// ── MetricRow — key/value pair in slot card ───────────────────────────────────
function MetricRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
      <span style={{ color: TEXT_SUB }}>{label}</span>
      <span style={{ fontWeight: 500, color: valueColor }}>{value}</span>
    </div>
  );
}

// ── SelectBox — large checkbox for card selection ─────────────────────────────
function SelectBox({ checked, onClick, size = 20, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: 4,
        border: `2px solid ${checked ? ACCENT : BORDER}`,
        backgroundColor: checked ? ACCENT : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, padding: 0,
        transition: 'all 0.15s', ...style,
      }}
    >
      {checked && <CheckIcon size={size - 8} color="#fff" />}
    </button>
  );
}
