import { useState, useRef } from 'react';
import {
  SearchIcon, DownloadIcon, UploadIcon,
  CloseIcon, EditIcon, MoreIcon,
} from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { SearchBar } from '../../ui/molecules/SearchBar';
import { Toolbar } from '../../ui/molecules/Toolbar';
import { Drawer } from '../../ui/molecules/Drawer';
import { Pagination } from '../../ui/molecules/Pagination';
import { InfoBanner } from '../../ui/molecules/InfoBanner';
import { UploadDropzone } from '../../ui/molecules/UploadDropzone';
import { TypeBadge } from '../../ui/atoms/Badge';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { Input, Select } from '../../ui/atoms/Input';
import { Tabs } from '../../ui/molecules/Tabs';
import { Modal } from '../../ui/molecules/Modal';
import { SectionCard } from '../../ui/molecules/SectionCard';

// ── Status / persona color maps ───────────────────────────────────────────────
const STATUS_COLORS = {
  Active:          { bg: 'var(--osmos-brand-green-muted)',   color: 'var(--osmos-brand-green)',  dot: 'var(--osmos-brand-green)' },
  Exhausted:       { bg: 'rgba(245,166,35,0.12)',            color: 'var(--osmos-brand-amber)',  dot: 'var(--osmos-brand-amber)' },
  Churned:         { bg: 'rgba(239,68,68,0.10)',             color: '#EF4444',                   dot: '#EF4444' },
  'Not Activated': { bg: 'var(--osmos-bg-subtle)',           color: 'var(--osmos-fg-muted)',     dot: 'var(--osmos-fg-subtle)' },
};

const PERSONA_COLORS = {
  Platinum: { bg: 'rgba(99,102,241,0.12)', color: '#6366F1' },
  Gold:     { bg: 'rgba(245,158,11,0.12)', color: '#D97706' },
  Silver:   { bg: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' },
  Mass:     { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  Economy:  { bg: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)' },
};

// ── Mock data ─────────────────────────────────────────────────────────────────
const RETAILER_ATTR_LIMITS = {
  SPA: { clickMax: 20, viewMax: 7 },
  SDA: { clickMax: 30, viewMax: 7 },
};

const PERSONAS = ['Platinum', 'Gold', 'Silver', 'Mass', 'Economy'];

const MOCK_ADVERTISERS = [
  { id: 'CA_08001', merchantId: 'B002', name: 'Whitakers Grocery',     persona: 'Platinum', status: 'Active',        spaType: 'Click-through', spaWindow: 14, sdaType: 'Hybrid',        sdaClickWindow: 7,  sdaViewWindow: 1,    amName: 'Rahul Arora', amEmail: 'rahul.a@pulse.co', segments: 3, users: 4 },
  { id: 'CA_08011', merchantId: 'B001', name: 'Tata Madison Foods',    persona: 'Gold',     status: 'Active',        spaType: 'Click-through', spaWindow: 7,  sdaType: 'Click-through', sdaClickWindow: 7,  sdaViewWindow: null, amName: 'Maya Singh',  amEmail: 'maya.s@pulse.co',  segments: 1, users: 2 },
  { id: 'CA_08014', merchantId: 'B034', name: 'Gourmet Grocers',       persona: 'Silver',   status: 'Exhausted',     spaType: 'View-through',  spaWindow: 3,  sdaType: 'View-through',  sdaClickWindow: null, sdaViewWindow: 3,  amName: 'Preet Kaur',  amEmail: 'preet.k@pulse.co', segments: 0, users: 1 },
  { id: 'CA_08003', merchantId: 'B001', name: 'Luma Brand Stores',     persona: 'Mass',     status: 'Active',        spaType: 'Hybrid',        spaWindow: 10, sdaType: 'Hybrid',        sdaClickWindow: 10, sdaViewWindow: 1,    amName: 'Rahul Arora', amEmail: 'rahul.a@pulse.co', segments: 5, users: 3 },
  { id: 'CA_08005', merchantId: 'B001', name: 'John Artesia Ltd',      persona: 'Gold',     status: 'Not Activated', spaType: 'Click-through', spaWindow: 20, sdaType: 'Click-through', sdaClickWindow: 20, sdaViewWindow: null, amName: '',            amEmail: '',              segments: 0, users: 0 },
  { id: 'CA_08007', merchantId: 'B001', name: 'Beauty Essentials',     persona: 'Platinum', status: 'Active',        spaType: 'Click-through', spaWindow: 14, sdaType: 'View-through',  sdaClickWindow: null, sdaViewWindow: 1,  amName: 'Maya Singh',  amEmail: 'maya.s@pulse.co',  segments: 2, users: 5 },
  { id: 'CA_08009', merchantId: 'B001', name: 'Garden Supplies Co',    persona: 'Economy',  status: 'Churned',       spaType: 'Click-through', spaWindow: 7,  sdaType: 'Click-through', sdaClickWindow: 7,  sdaViewWindow: null, amName: '',            amEmail: '',              segments: 0, users: 1 },
  { id: 'CA_08010', merchantId: 'RES5', name: 'Tia Treasures',         persona: 'Silver',   status: 'Active',        spaType: 'Hybrid',        spaWindow: 14, sdaType: 'Hybrid',        sdaClickWindow: 14, sdaViewWindow: 7,    amName: 'Preet Kaur',  amEmail: 'preet.k@pulse.co', segments: 1, users: 2 },
  { id: 'CA_08013', merchantId: 'M100', name: 'Natural Foods Inc',     persona: 'Mass',     status: 'Active',        spaType: 'Click-through', spaWindow: 7,  sdaType: 'Click-through', sdaClickWindow: 7,  sdaViewWindow: null, amName: 'Rahul Arora', amEmail: 'rahul.a@pulse.co', segments: 4, users: 6 },
  { id: 'CA_08Y11', merchantId: 'M100', name: 'Beauty Equipment Store', persona: 'Gold',    status: 'Not Activated', spaType: 'Click-through', spaWindow: 14, sdaType: 'Click-through', sdaClickWindow: 14, sdaViewWindow: null, amName: '',            amEmail: '',              segments: 0, users: 0 },
  { id: 'CA_08015', merchantId: 'B010', name: 'Fresh Mart Online',     persona: 'Platinum', status: 'Active',        spaType: 'Hybrid',        spaWindow: 14, sdaType: 'Hybrid',        sdaClickWindow: 14, sdaViewWindow: 7,    amName: 'Maya Singh',  amEmail: 'maya.s@pulse.co',  segments: 6, users: 8 },
  { id: 'CA_08016', merchantId: 'B010', name: 'Sunrise Electronics',   persona: 'Silver',   status: 'Exhausted',     spaType: 'Click-through', spaWindow: 14, sdaType: 'View-through',  sdaClickWindow: null, sdaViewWindow: 1,  amName: 'Preet Kaur',  amEmail: 'preet.k@pulse.co', segments: 0, users: 1 },
];

const MOCK_HISTORY = [
  { id: 1, ts: '2026-05-05 14:32', advName: 'Whitakers Grocery',  advId: 'CA_08001', field: 'Persona',              changeType: 'Persona Updated',                  oldVal: 'Gold',                 newVal: 'Platinum',          changedBy: 'Rahul Arora' },
  { id: 2, ts: '2026-05-05 11:15', advName: 'Fresh Mart Online',  advId: 'CA_08015', field: 'Attribution Settings', changeType: 'SPA Attribution Type Updated',      oldVal: 'Click-through | 14d',  newVal: 'Hybrid | 14d + 7d', changedBy: 'Maya Singh' },
  { id: 3, ts: '2026-05-04 16:45', advName: 'Natural Foods Inc',  advId: 'CA_08013', field: 'Account Manager',      changeType: 'Account Manager Updated',           oldVal: 'Preet Kaur',           newVal: 'Rahul Arora',       changedBy: 'Preet Kaur' },
  { id: 4, ts: '2026-05-04 09:22', advName: 'Tia Treasures',      advId: 'CA_08010', field: 'Attribution Settings', changeType: 'SPA Attribution Window Updated',    oldVal: '7 days',               newVal: '14 days',           changedBy: 'Maya Singh' },
  { id: 5, ts: '2026-05-03 17:10', advName: 'Beauty Essentials',  advId: 'CA_08007', field: 'Persona',              changeType: 'Persona Updated',                  oldVal: 'Silver',               newVal: 'Platinum',          changedBy: 'Rahul Arora' },
];

const ATTR_TYPES = [
  { value: 'Click-through', label: 'Click-through' },
  { value: 'View-through',  label: 'View-through'  },
  { value: 'Hybrid',        label: 'Hybrid'        },
];

const STATUS_OPTIONS = [
  { value: '',              label: 'All Statuses'   },
  { value: 'Active',        label: 'Active'         },
  { value: 'Exhausted',     label: 'Exhausted'      },
  { value: 'Churned',       label: 'Churned'        },
  { value: 'Not Activated', label: 'Not Activated'  },
];

const PERSONA_OPTIONS = [
  { value: '', label: 'All Personas' },
  ...PERSONAS.map(p => ({ value: p, label: p })),
];

// ── Small atoms ───────────────────────────────────────────────────────────────
function StatusDot({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS['Not Activated'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 8px', borderRadius: 10, fontSize: 12, fontWeight: 600,
      background: c.bg, color: c.color }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot }} />
      {status}
    </span>
  );
}

function PersonaChip({ persona }) {
  const c = PERSONA_COLORS[persona] || PERSONA_COLORS['Silver'];
  return (
    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.color }}>
      {persona}
    </span>
  );
}

// ── Attribution Tab ─────────────────────────────────────────────────────────
function AttributionTab({ advertiser }) {
  const [editing, setEditing]   = useState(false);
  const [spaType, setSpaType]   = useState(advertiser.spaType);
  const [spaWindow, setSpaWindow] = useState(advertiser.spaWindow);
  const [sdaType, setSdaType]   = useState(advertiser.sdaType);
  const [sdaClickWindow, setSdaClickWindow] = useState(advertiser.sdaClickWindow);
  const [sdaViewWindow,  setSdaViewWindow]  = useState(advertiser.sdaViewWindow);
  const [confirm, setConfirm]   = useState(false);
  const [saved, setSaved]       = useState(false);
  const [spaWindowFlash, setSpaWindowFlash] = useState(false);
  const [sdaClickFlash,  setSdaClickFlash]  = useState(false);
  const [sdaViewFlash,   setSdaViewFlash]   = useState(false);

  const limits = RETAILER_ATTR_LIMITS;

  function getWindowBounds(type, adType) {
    const lim = limits[adType];
    if (type === 'Click-through') return { clickMax: lim.clickMax, viewMax: 0, hasView: false };
    if (type === 'View-through')  return { clickMax: 0, viewMax: lim.viewMax, hasView: true, clickOnly: false };
    if (type === 'Hybrid')        return { clickMax: lim.clickMax, viewMax: lim.viewMax, hasView: true };
    return { clickMax: lim.clickMax, viewMax: lim.viewMax, hasView: false };
  }

  function handleSpaTypeChange(newType) {
    setSpaType(newType);
    const b = getWindowBounds(newType, 'SPA');
    if (newType !== 'View-through' && spaWindow > b.clickMax) {
      setSpaWindow(b.clickMax);
      setSpaWindowFlash(true);
      setTimeout(() => setSpaWindowFlash(false), 600);
    }
  }

  function handleSdaTypeChange(newType) {
    setSdaType(newType);
    const b = getWindowBounds(newType, 'SDA');
    if (newType !== 'View-through' && sdaClickWindow > b.clickMax) {
      setSdaClickWindow(b.clickMax);
      setSdaClickFlash(true);
      setTimeout(() => setSdaClickFlash(false), 600);
    }
    if (newType !== 'Click-through' && sdaViewWindow > b.viewMax) {
      setSdaViewWindow(b.viewMax);
      setSdaViewFlash(true);
      setTimeout(() => setSdaViewFlash(false), 600);
    }
  }

  const spaBounds = getWindowBounds(spaType, 'SPA');
  const sdaBounds = getWindowBounds(sdaType, 'SDA');

  const hasChanges = spaType !== advertiser.spaType || spaWindow !== advertiser.spaWindow
    || sdaType !== advertiser.sdaType || sdaClickWindow !== advertiser.sdaClickWindow
    || sdaViewWindow !== advertiser.sdaViewWindow;

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setConfirm(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const fieldStyle = (flash) => ({
    border: `1px solid ${flash ? 'var(--osmos-brand-amber)' : 'var(--osmos-border)'}`,
    borderRadius: 6, padding: '6px 10px', fontSize: 13,
    color: 'var(--osmos-fg)', background: 'var(--osmos-bg)',
    width: '100%', boxSizing: 'border-box', transition: 'border-color 0.3s', outline: 'none',
  });

  return (
    <div style={{ padding: 20 }}>
      {saved && (
        <InfoBanner type="success" message="Attribution settings updated successfully." style={{ marginBottom: 16 }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>Attribution Configuration</div>
        {!editing && (
          <Button variant="outline" onClick={() => setEditing(true)}>
            <EditIcon size={13} /> Edit Attribution
          </Button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* SPA */}
        <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--osmos-fg-muted)', letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: 12 }}>SPA Attribution</div>

          {!editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 2 }}>Type</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>{spaType}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 2 }}>Window</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>
                  {spaType === 'Hybrid' ? `Click ${spaWindow}d · View 1d` : `${spaWindow} days`}
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>
                Retailer limit: Click max {limits.SPA.clickMax}d · View max {limits.SPA.viewMax}d
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Select label="Attribution Type" value={spaType}
                onChange={e => handleSpaTypeChange(e.target.value)}
                options={ATTR_TYPES} />

              {spaType !== 'View-through' && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4 }}>
                    Click Window (1–{spaBounds.clickMax}d)
                  </div>
                  <input type="number" min={1} max={spaBounds.clickMax}
                    value={spaWindow} onChange={e => setSpaWindow(Math.min(Number(e.target.value), spaBounds.clickMax))}
                    style={fieldStyle(spaWindowFlash)} />
                  {spaWindowFlash && (
                    <div style={{ fontSize: 11, color: 'var(--osmos-brand-amber)', marginTop: 3 }}>
                      Adjusted to retailer ceiling ({spaBounds.clickMax} days)
                    </div>
                  )}
                </div>
              )}

              <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)',
                background: 'rgba(245,166,35,0.12)', padding: '6px 8px', borderRadius: 4 }}>
                Retailer limit: Click max {limits.SPA.clickMax}d · View max {limits.SPA.viewMax}d
              </div>
            </div>
          )}
        </div>

        {/* SDA */}
        <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--osmos-fg-muted)', letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: 12 }}>SDA Attribution</div>

          {!editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 2 }}>Type</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>{sdaType}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 2 }}>Window</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>
                  {sdaType === 'Hybrid'
                    ? `Click ${sdaClickWindow}d · View ${sdaViewWindow}d`
                    : sdaType === 'Click-through'
                    ? `${sdaClickWindow} days`
                    : `${sdaViewWindow} days`}
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>
                Retailer limit: Click max {limits.SDA.clickMax}d · View max {limits.SDA.viewMax}d
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Select label="Attribution Type" value={sdaType}
                onChange={e => handleSdaTypeChange(e.target.value)}
                options={ATTR_TYPES} />

              {sdaType !== 'View-through' && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4 }}>
                    Click Window (1–{sdaBounds.clickMax}d)
                  </div>
                  <input type="number" min={1} max={sdaBounds.clickMax}
                    value={sdaClickWindow} onChange={e => setSdaClickWindow(Math.min(Number(e.target.value), sdaBounds.clickMax))}
                    style={fieldStyle(sdaClickFlash)} />
                  {sdaClickFlash && (
                    <div style={{ fontSize: 11, color: 'var(--osmos-brand-amber)', marginTop: 3 }}>
                      Adjusted to retailer ceiling ({sdaBounds.clickMax} days)
                    </div>
                  )}
                </div>
              )}

              {sdaType !== 'Click-through' && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4 }}>
                    View Window (1–{sdaBounds.viewMax}d)
                  </div>
                  <input type="number" min={1} max={sdaBounds.viewMax}
                    value={sdaViewWindow} onChange={e => setSdaViewWindow(Math.min(Number(e.target.value), sdaBounds.viewMax))}
                    style={fieldStyle(sdaViewFlash)} />
                  {sdaViewFlash && (
                    <div style={{ fontSize: 11, color: 'var(--osmos-brand-amber)', marginTop: 3 }}>
                      Adjusted to retailer ceiling ({sdaBounds.viewMax} days)
                    </div>
                  )}
                </div>
              )}

              <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)',
                background: 'rgba(245,166,35,0.12)', padding: '6px 8px', borderRadius: 4 }}>
                Retailer limit: Click max {limits.SDA.clickMax}d · View max {limits.SDA.viewMax}d
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Before/after preview strip */}
      {editing && hasChanges && (
        <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--osmos-bg-subtle)', borderRadius: 6,
          border: '1px solid var(--osmos-border)', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
          <span style={{ fontWeight: 600, color: 'var(--osmos-fg)' }}>Preview: </span>
          <span style={{ opacity: 0.6 }}>SPA {advertiser.spaType} {advertiser.spaWindow}d</span>
          <span style={{ margin: '0 8px', color: 'var(--osmos-brand-primary)' }}>→</span>
          <span style={{ color: 'var(--osmos-fg)' }}>
            SPA {spaType} {spaType !== 'View-through' ? `${spaWindow}d click` : `${sdaViewWindow}d view`}
          </span>
          <span style={{ margin: '0 12px', opacity: 0.35 }}>|</span>
          <span style={{ opacity: 0.6 }}>SDA {advertiser.sdaType}</span>
          <span style={{ margin: '0 8px', color: 'var(--osmos-brand-primary)' }}>→</span>
          <span style={{ color: 'var(--osmos-fg)' }}>SDA {sdaType}</span>
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
            Effective today — historical attribution data is unaffected.
          </div>
        </div>
      )}

      {editing && (
        <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingTop: 16,
          borderTop: '1px solid var(--osmos-border)' }}>
          <Button variant="outline" onClick={() => { setEditing(false); setSpaType(advertiser.spaType); setSpaWindow(advertiser.spaWindow); setSdaType(advertiser.sdaType); }}>Cancel</Button>
          <Button variant="primary" onClick={() => setConfirm(true)} disabled={!hasChanges}>
            Save Attribution
          </Button>
        </div>
      )}

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Update Attribution Settings"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Confirm Change</Button>
          </div>
        }>
        <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, margin: 0 }}>
          This change affects active campaigns and reporting from today. SPA: {advertiser.spaType} → {spaType}. SDA: {advertiser.sdaType} → {sdaType}. Historical attribution data remains unchanged.
        </p>
      </Modal>
    </div>
  );
}

// ── Persona Tab ───────────────────────────────────────────────────────────────
function PersonaTab({ advertiser }) {
  const [persona, setPersona] = useState(advertiser.persona);
  const [confirm, setConfirm] = useState(false);
  const [saved, setSaved]     = useState(false);

  const hasChange = persona !== advertiser.persona;

  function handleSave() {
    setSaved(true);
    setConfirm(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ padding: 20 }}>
      {saved && (
        <InfoBanner type="success" message={`Persona updated to ${persona} successfully.`} style={{ marginBottom: 16 }} />
      )}

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 16 }}>Persona Management</div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 6 }}>
          Current Persona
        </div>
        <PersonaChip persona={advertiser.persona} />
      </div>

      <Select label="New Persona" value={persona}
        onChange={e => setPersona(e.target.value)}
        options={PERSONAS.map(p => ({ value: p, label: p }))} />

      {hasChange && (
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(245,166,35,0.12)', borderRadius: 6,
          border: '1px solid var(--osmos-brand-amber)', fontSize: 12, color: 'var(--osmos-fg)' }}>
          <span style={{ fontWeight: 600 }}>⚠ Downstream impact: </span>
          Changing persona from <strong>{advertiser.persona}</strong> to <strong>{persona}</strong> will
          affect campaign targeting behavior for all active campaigns under this advertiser from today.
          Estimated impact: {advertiser.segments} active segment(s).
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingTop: 16,
        borderTop: '1px solid var(--osmos-border)' }}>
        <Button variant="outline" onClick={() => setPersona(advertiser.persona)}>Reset</Button>
        <Button variant="primary" disabled={!hasChange} onClick={() => setConfirm(true)}>
          Save Persona
        </Button>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Update Persona"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Confirm Change</Button>
          </div>
        }>
        <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, margin: 0 }}>
          Persona will change from {advertiser.persona} to {persona}. This may impact downstream campaign behavior for active campaigns. This change will take effect immediately.
        </p>
      </Modal>
    </div>
  );
}

// ── Account Manager Tab ────────────────────────────────────────────────────
function AccountManagerTab({ advertiser }) {
  const [name, setName]         = useState(advertiser.amName);
  const [email, setEmail]       = useState(advertiser.amEmail);
  const [emailStatus, setEmailStatus] = useState('idle');
  const [confirm, setConfirm]   = useState(false);
  const [saved, setSaved]       = useState(false);
  const debounceRef             = useRef(null);

  const MOCK_VALID_EMAILS = ['rahul.a@pulse.co', 'maya.s@pulse.co', 'preet.k@pulse.co', 'arjun.v@pulse.co'];

  function handleEmailChange(val) {
    setEmail(val);
    setEmailStatus('checking');
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setEmailStatus(MOCK_VALID_EMAILS.includes(val) ? 'valid' : val.includes('@') ? 'notFound' : 'idle');
      if (MOCK_VALID_EMAILS.includes(val) && !name) {
        const inferred = val.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase());
        setName(inferred);
      }
    }, 400);
  }

  const hasChange = name !== advertiser.amName || email !== advertiser.amEmail;
  const canSave = hasChange && (emailStatus === 'valid' || !email);

  function handleSave() {
    setSaved(true);
    setConfirm(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ padding: 20 }}>
      {saved && (
        <InfoBanner type="success" message="Account manager updated successfully." style={{ marginBottom: 16 }} />
      )}

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 16 }}>Account Manager</div>

      {advertiser.amName ? (
        <div style={{ padding: '10px 14px', background: 'var(--osmos-bg-subtle)', borderRadius: 6,
          border: '1px solid var(--osmos-border)', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--osmos-brand-primary-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--osmos-brand-primary)' }}>
            {advertiser.amName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>{advertiser.amName}</div>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{advertiser.amEmail}</div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '10px 14px', background: 'var(--osmos-bg-subtle)', borderRadius: 6,
          border: '1px dashed var(--osmos-border)', marginBottom: 16, fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
          No account manager assigned
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <Input label="Account Manager Email" value={email}
            onChange={e => handleEmailChange(e.target.value)}
            placeholder="name@pulse.co" />
          {emailStatus === 'checking' && (
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginTop: 3 }}>Checking…</div>
          )}
          {emailStatus === 'valid' && (
            <div style={{ fontSize: 11, color: 'var(--osmos-brand-green)', marginTop: 3 }}>✓ Found in system</div>
          )}
          {emailStatus === 'notFound' && (
            <div style={{ fontSize: 11, color: '#EF4444', marginTop: 3 }}>Email not found in system — account manager must have a Pulse account</div>
          )}
        </div>

        <Input label="Account Manager Name (auto-filled from email)" value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Inferred from email when valid" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingTop: 16,
        borderTop: '1px solid var(--osmos-border)' }}>
        <Button variant="outline" onClick={() => { setName(advertiser.amName); setEmail(advertiser.amEmail); setEmailStatus('idle'); }}>Reset</Button>
        <Button variant="primary" disabled={!canSave} onClick={() => setConfirm(true)}>
          Save Account Manager
        </Button>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Update Account Manager"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Confirm Change</Button>
          </div>
        }>
        <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, margin: 0 }}>
          Account manager will be changed from "{advertiser.amName || 'None'}" to "{name}" ({email}). This change takes effect immediately.
        </p>
      </Modal>
    </div>
  );
}

// ── Wallet Tab ────────────────────────────────────────────────────────────────
function WalletTab({ advertiser }) {
  const [amount, setAmount]   = useState('');
  const [note, setNote]       = useState('');
  const [confirm, setConfirm] = useState(false);
  const [saved, setSaved]     = useState(false);

  const mockBalance = advertiser.status === 'Exhausted' || advertiser.status === 'Not Activated' ? '₹0.00' : '₹ 2,45,000.00';

  function handleSave() {
    setSaved(true);
    setConfirm(false);
    setAmount('');
    setNote('');
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div style={{ padding: 20 }}>
      {saved && (
        <InfoBanner type="success" message={`Wallet top-up of ₹${amount} processed successfully.`} style={{ marginBottom: 16 }} />
      )}

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 16 }}>Wallet Management</div>

      <div style={{ padding: '14px 16px', background: 'var(--osmos-bg-subtle)', borderRadius: 8,
        border: '1px solid var(--osmos-border)', marginBottom: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginBottom: 4 }}>Current Balance</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: advertiser.status === 'Exhausted' ? '#EF4444' : 'var(--osmos-fg)' }}>
            {mockBalance}
          </div>
        </div>
        <StatusDot status={advertiser.status} />
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 12 }}>Top Up Wallet</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Top-up Amount (₹)" value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00" type="number" />
        <Input label="Notes (optional)" value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. Q2 budget allocation" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingTop: 16,
        borderTop: '1px solid var(--osmos-border)' }}>
        <Button variant="primary" disabled={!amount || Number(amount) <= 0} onClick={() => setConfirm(true)}>
          + Top Up
        </Button>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Confirm Wallet Top-Up"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Confirm Change</Button>
          </div>
        }>
        <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, margin: 0 }}>
          You are adding ₹{amount} to {advertiser.name}'s wallet. Note: "{note || 'None'}". This action cannot be reversed.
        </p>
      </Modal>
    </div>
  );
}

// ── History Tab ───────────────────────────────────────────────────────────────
function HistoryTab({ entries, showAdvName = false }) {
  const [filterField, setFilterField] = useState('');
  const [filterUser,  setFilterUser]  = useState('');

  const filtered = entries.filter(e =>
    (!filterField || e.field === filterField) &&
    (!filterUser || e.changedBy === filterUser)
  );

  const fieldOpts = [{ value: '', label: 'All Fields' }, ...Array.from(new Set(entries.map(e => e.field))).map(f => ({ value: f, label: f }))];
  const userOpts  = [{ value: '', label: 'All Users' },  ...Array.from(new Set(entries.map(e => e.changedBy))).map(u => ({ value: u, label: u }))];

  if (!entries.length) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>No changes yet</div>
        <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>All configuration changes will appear here with a full audit trail.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <Select value={filterField} onChange={e => setFilterField(e.target.value)} options={fieldOpts} style={{ flex: 1 }} />
        <Select value={filterUser}  onChange={e => setFilterUser(e.target.value)}  options={userOpts}  style={{ flex: 1 }} />
        <Button variant="ghost" onClick={() => setFilterUser('')}>
          <DownloadIcon size={14} /> Export
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filtered.map(e => (
          <div key={e.id} style={{ padding: '12px 14px', background: 'var(--osmos-bg)', borderRadius: 6,
            border: '1px solid var(--osmos-border)', display: 'grid',
            gridTemplateColumns: showAdvName ? '160px 1fr 120px 160px' : '1fr 120px 160px', gap: 12, alignItems: 'center' }}>
            {showAdvName && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)' }}>{e.advName}</div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{e.advId}</div>
              </div>
            )}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)' }}>{e.changeType}</div>
              <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginTop: 2 }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{e.oldVal}</span>
                <span style={{ margin: '0 6px', color: 'var(--osmos-brand-primary)' }}>→</span>
                <span style={{ fontWeight: 600 }}>{e.newVal}</span>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{e.changedBy}</div>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>{e.ts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ advertiser }) {
  const fields = [
    { label: 'Advertiser ID', value: advertiser.id },
    { label: 'Merchant ID',   value: advertiser.merchantId },
    { label: 'Status',        value: <StatusDot status={advertiser.status} /> },
    { label: 'Persona',       value: <PersonaChip persona={advertiser.persona} /> },
    { label: 'Segments',      value: advertiser.segments || '—' },
    { label: 'Users',         value: advertiser.users || '—' },
    { label: 'Account Manager', value: advertiser.amName || '—' },
    { label: 'AM Email',      value: advertiser.amEmail || '—' },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
        {fields.map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginBottom: 4 }}>{f.label}</div>
            {typeof f.value === 'string' || typeof f.value === 'number'
              ? <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>{f.value}</div>
              : f.value
            }
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Advertiser Detail Drawer ──────────────────────────────────────────────────
const DRAWER_TABS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'persona',      label: 'Persona'  },
  { id: 'attribution',  label: 'Attribution' },
  { id: 'am',           label: 'Account Manager' },
  { id: 'wallet',       label: 'Wallet'   },
  { id: 'history',      label: 'History'  },
];

function AdvertiserDetailDrawer({ advertiser, onClose }) {
  const [tab, setTab] = useState('overview');
  const advHistory = MOCK_HISTORY.filter(h => h.advId === advertiser.id);

  return (
    <Drawer open={true} onClose={onClose} title={advertiser.name} width={580} footer={null}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px 12px',
        borderBottom: '1px solid var(--osmos-border)', marginTop: -8 }}>
        <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>{advertiser.id}</span>
        <StatusDot status={advertiser.status} />
      </div>

      <div style={{ padding: '0 20px' }}>
        <Tabs items={DRAWER_TABS} value={tab} onValueChange={setTab} />
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }}>
        {tab === 'overview'    && <OverviewTab advertiser={advertiser} />}
        {tab === 'persona'     && <PersonaTab advertiser={advertiser} />}
        {tab === 'attribution' && <AttributionTab advertiser={advertiser} />}
        {tab === 'am'          && <AccountManagerTab advertiser={advertiser} />}
        {tab === 'wallet'      && <WalletTab advertiser={advertiser} />}
        {tab === 'history'     && <HistoryTab entries={advHistory} />}
      </div>
    </Drawer>
  );
}

// ── Bulk Edit Drawer ──────────────────────────────────────────────────────────
function BulkEditDrawer({ open, onClose }) {
  const [step, setStep]       = useState('upload');
  const [errors, setErrors]   = useState([]);
  const [validCount, setValidCount] = useState(0);

  function handleUpload() {
    setStep('validating');
    setTimeout(() => {
      setErrors([
        { row: 3, field: 'SPA Attribution Window', issue: 'Window 25d exceeds retailer limit of 20d' },
        { row: 7, field: 'Account Manager Email', issue: 'Email not found in system: unknown@test.com' },
      ]);
      setValidCount(10);
      setStep('review');
    }, 1200);
  }

  function handleConfirm() {
    setStep('done');
    setTimeout(() => { setStep('upload'); setErrors([]); onClose(); }, 2000);
  }

  return (
    <Drawer open={open} onClose={onClose} title="Bulk Edit Advertisers" width={700} footer={null}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {step === 'done' && (
          <InfoBanner type="success" message={`${validCount} advertisers updated successfully.`} />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>Step 1 — Download Template</div>
          <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6 }}>
            Download a pre-filled CSV with current values for all advertisers.
            Update Persona, SPA/SDA Attribution, Account Manager Name and Email.
          </div>
          <Button variant="outline" style={{ alignSelf: 'flex-start' }}>
            <DownloadIcon size={14} /> Download CSV Template
          </Button>
        </div>

        <div style={{ height: 1, background: 'var(--osmos-border)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>Step 2 — Upload Completed File</div>
          {step === 'upload' && (
            <UploadDropzone onUpload={handleUpload} accept=".csv"
              label="Drag & drop your CSV or click to upload" />
          )}
          {step === 'validating' && (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--osmos-fg-muted)', fontSize: 13 }}>
              Validating file…
            </div>
          )}
        </div>

        {step === 'review' && (
          <>
            <div style={{ display: 'flex', gap: 12, padding: '12px 14px',
              background: 'var(--osmos-bg-subtle)', borderRadius: 8,
              border: '1px solid var(--osmos-border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--osmos-brand-green)' }}>{validCount}</div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>Valid rows</div>
              </div>
              <div style={{ width: 1, background: 'var(--osmos-border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444' }}>{errors.length}</div>
                <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)' }}>Errors</div>
              </div>
            </div>

            {errors.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>Errors to fix:</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                      {['Row', 'Field', 'Issue'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px',
                          color: 'var(--osmos-fg-muted)', fontWeight: 600, fontSize: 11,
                          borderBottom: '1px solid var(--osmos-border)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((e, i) => (
                      <tr key={i} style={{ background: 'rgba(245,166,35,0.12)' }}>
                        <td style={{ padding: '8px 12px', color: 'var(--osmos-fg)' }}>{e.row}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--osmos-fg)' }}>{e.field}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--osmos-fg-muted)' }}>{e.issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" onClick={() => setStep('upload')}>Re-upload</Button>
              <Button variant="primary" onClick={handleConfirm}>
                Proceed with {validCount} valid rows
              </Button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}

// ── Bulk Action Bar ────────────────────────────────────────────────────────────
function BulkActionBar({ selected, onClear }) {
  const [personaAction, setPersonaAction] = useState('');
  const [amAction, setAmAction]           = useState('');

  return (
    <div style={{ padding: '8px 16px', background: 'var(--osmos-brand-primary-muted)',
      border: '1px solid var(--osmos-brand-primary)',
      borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 8px' }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-brand-primary)' }}>
        {selected.length} advertiser{selected.length > 1 ? 's' : ''} selected
      </span>
      <div style={{ flex: 1, display: 'flex', gap: 8 }}>
        <select value={personaAction} onChange={e => setPersonaAction(e.target.value)}
          style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6,
            border: '1px solid var(--osmos-border)',
            background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', cursor: 'pointer' }}>
          <option value="">Change Persona…</option>
          {PERSONAS.map(p => <option key={p} value={p}>→ {p}</option>)}
        </select>
        <select value={amAction} onChange={e => setAmAction(e.target.value)}
          style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6,
            border: '1px solid var(--osmos-border)',
            background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', cursor: 'pointer' }}>
          <option value="">Reassign Account Manager…</option>
          <option value="rahul.a@pulse.co">Rahul Arora</option>
          <option value="maya.s@pulse.co">Maya Singh</option>
          <option value="preet.k@pulse.co">Preet Kaur</option>
        </select>
      </div>
      <Button variant="ghost" onClick={onClear}>
        <CloseIcon size={12} /> Clear
      </Button>
    </div>
  );
}

// ── Page-level tab config ──────────────────────────────────────────────────────
const PAGE_TABS = [
  { id: 'advertisers', label: 'Advertisers' },
  { id: 'history',     label: 'History' },
];

const COL_HEADERS = ['Advertiser ID', 'Name', 'Status', 'Persona', 'SPA Attribution', 'SDA Attribution', 'Account Manager', 'Segments', 'Users'];

// ── Main Page ─────────────────────────────────────────────────────────────────
export function AdvertiserManagementPage() {
  const [pageTab,    setPageTab]   = useState('advertisers');
  const [search,     setSearch]    = useState('');
  const [statusFilt, setStatusFilt]= useState('');
  const [personaFilt,setPersonaFilt]= useState('');
  const [page,       setPage]      = useState(1);
  const [selected,   setSelected]  = useState([]);
  const [drawerAdv,  setDrawerAdv] = useState(null);
  const [bulkOpen,   setBulkOpen]  = useState(false);
  const PAGE_SIZE = 10;

  const filtered = MOCK_ADVERTISERS.filter(a => {
    const matchSearch  = !search      || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus  = !statusFilt  || a.status  === statusFilt;
    const matchPersona = !personaFilt || a.persona === personaFilt;
    return matchSearch && matchStatus && matchPersona;
  });

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allPageSelected = paged.length > 0 && paged.every(a => selected.includes(a.id));

  function toggleAll() {
    if (allPageSelected) setSelected(s => s.filter(id => !paged.find(a => a.id === id)));
    else setSelected(s => [...new Set([...s, ...paged.map(a => a.id)])]);
  }

  function toggleRow(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  return (
    <div style={{ padding: '20px 24px', background: 'var(--osmos-bg-subtle)', minHeight: '100vh' }}>

      {/* ── Breadcrumb ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        {['Pulse', 'Control Panel', 'Advertiser Management'].map((crumb, i, arr) => (
          <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="#" style={{ fontSize: 12, color: i === arr.length - 1 ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
              fontWeight: i === arr.length - 1 ? 500 : 400, textDecoration: 'none' }}>{crumb}</a>
            {i < arr.length - 1 && <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>›</span>}
          </span>
        ))}
      </div>

      {/* ── Top Bar ──────────────────────────────────────────────────────────── */}
      <Toolbar
        left={<span style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)' }}>Advertiser Management</span>}
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={() => {}}>
              <DownloadIcon size={14} /> Export
            </Button>
            <Button variant="outline" onClick={() => setBulkOpen(true)}>
              <UploadIcon size={14} /> Bulk Edit
            </Button>
          </div>
        }
        style={{ marginBottom: 16 }}
      />

      <SectionCard style={{ overflow: 'hidden' }}>
        {/* ── Page tabs ──────────────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px', borderBottom: '1px solid var(--osmos-border)' }}>
          <Tabs items={PAGE_TABS} value={pageTab} onValueChange={v => { setPageTab(v); setSelected([]); }} />
        </div>

        {pageTab === 'advertisers' && (
          <>
            {/* ── Filter toolbar ───────────────────────────────────────────── */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--osmos-border)',
              display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <SearchBar value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name or Advertiser ID…" width={240} />
              <select value={statusFilt} onChange={e => { setStatusFilt(e.target.value); setPage(1); }}
                style={{ fontSize: 12, padding: '6px 10px', borderRadius: 6,
                  border: '1px solid var(--osmos-border)',
                  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', cursor: 'pointer' }}>
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select value={personaFilt} onChange={e => { setPersonaFilt(e.target.value); setPage(1); }}
                style={{ fontSize: 12, padding: '6px 10px', borderRadius: 6,
                  border: '1px solid var(--osmos-border)',
                  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', cursor: 'pointer' }}>
                {PERSONA_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{filtered.length} advertisers</span>
            </div>

            {/* ── Bulk action bar ───────────────────────────────────────────── */}
            {selected.length > 0 && (
              <div style={{ padding: '8px 16px' }}>
                <BulkActionBar
                  selected={selected.map(id => MOCK_ADVERTISERS.find(a => a.id === id)).filter(Boolean)}
                  onClear={() => setSelected([])} />
              </div>
            )}

            {/* ── Table ────────────────────────────────────────────────────── */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                    <th style={{ width: 40, padding: '9px 14px', textAlign: 'center',
                      borderBottom: '1px solid var(--osmos-border)' }}>
                      <Checkbox checked={allPageSelected} onChange={toggleAll} />
                    </th>
                    {COL_HEADERS.map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '9px 14px',
                        color: 'var(--osmos-fg-muted)', fontWeight: 600, fontSize: 11,
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                        borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                    <th style={{ width: 40, borderBottom: '1px solid var(--osmos-border)' }} />
                  </tr>
                </thead>
                <tbody>
                  {paged.map(adv => {
                    const isSelected = selected.includes(adv.id);
                    const spaLabel = adv.spaType === 'Hybrid'
                      ? `Hybrid · ${adv.spaWindow}d`
                      : `${adv.spaType.split('-')[0]} · ${adv.spaWindow}d`;
                    const sdaLabel = adv.sdaType === 'Hybrid'
                      ? `Hybrid · ${adv.sdaClickWindow}d+${adv.sdaViewWindow}d`
                      : adv.sdaType === 'Click-through'
                      ? `Click · ${adv.sdaClickWindow}d`
                      : `View · ${adv.sdaViewWindow}d`;

                    return (
                      <tr key={adv.id}
                        style={{ background: isSelected ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg)',
                          cursor: 'pointer', transition: 'background 0.1s' }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--osmos-bg-subtle)'; }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'var(--osmos-bg)'; }}>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}
                          onClick={e => { e.stopPropagation(); toggleRow(adv.id); }}>
                          <Checkbox checked={isSelected} onChange={() => toggleRow(adv.id)} />
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12 }}
                          onClick={() => setDrawerAdv(adv)}>{adv.id}</td>
                        <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--osmos-fg)' }}
                          onClick={() => setDrawerAdv(adv)}>{adv.name}</td>
                        <td style={{ padding: '10px 14px' }}
                          onClick={() => setDrawerAdv(adv)}><StatusDot status={adv.status} /></td>
                        <td style={{ padding: '10px 14px' }}
                          onClick={() => setDrawerAdv(adv)}><PersonaChip persona={adv.persona} /></td>
                        <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12 }}
                          onClick={() => setDrawerAdv(adv)}>{spaLabel}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12 }}
                          onClick={() => setDrawerAdv(adv)}>{sdaLabel}</td>
                        <td style={{ padding: '10px 14px', color: adv.amName ? 'var(--osmos-fg)' : 'var(--osmos-fg-subtle)', fontSize: 12 }}
                          onClick={() => setDrawerAdv(adv)}>{adv.amName || '—'}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12, textAlign: 'center' }}
                          onClick={() => setDrawerAdv(adv)}>{adv.segments}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12, textAlign: 'center' }}
                          onClick={() => setDrawerAdv(adv)}>{adv.users}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <button onClick={e => { e.stopPropagation(); setDrawerAdv(adv); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer',
                              color: 'var(--osmos-fg-muted)', padding: 4, borderRadius: 4 }}>
                            <MoreIcon size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={11} style={{ padding: '40px 20px', textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>No advertisers found</div>
                        <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>Try adjusting your search or filter criteria.</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Pagination ────────────────────────────────────────────────── */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--osmos-border)' }}>
              <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={setPage} />
            </div>
          </>
        )}

        {pageTab === 'history' && (
          <HistoryTab entries={MOCK_HISTORY} showAdvName={true} />
        )}
      </SectionCard>

      {/* ── Advertiser detail drawer ──────────────────────────────────────── */}
      {drawerAdv && (
        <AdvertiserDetailDrawer advertiser={drawerAdv} onClose={() => setDrawerAdv(null)} />
      )}

      {/* ── Bulk edit drawer ───────────────────────────────────────────────── */}
      <BulkEditDrawer open={bulkOpen} onClose={() => setBulkOpen(false)} />

    </div>
  );
}

export default AdvertiserManagementPage;
