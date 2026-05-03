import { useState } from 'react';
import { Icon, SearchIcon, InfoIcon } from '../../ui';
import { Toast, useToast } from '../../ui';

// ── Design tokens ────────────────────────────────────────────────────────────
const WHITE    = 'var(--osmos-bg)';
const BORDER   = 'var(--osmos-border)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const GREEN_M  = 'var(--osmos-brand-green-muted)';
const AMBER    = 'var(--osmos-brand-amber)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const BG_MUT   = 'var(--osmos-bg-muted)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const FONT     = "'Open Sans', sans-serif";

// ── Tab list ─────────────────────────────────────────────────────────────────
const TABS = ['General', 'Advertiser Access', 'Limits & Quotas', 'Wallet Rules'];

// ── Mock data ─────────────────────────────────────────────────────────────────
const KPI_DATA = [
  { label: 'BYOT Revenue (30d)', value: '$124,500', delta: '+12%', up: true },
  { label: 'Active Campaigns',   value: '47',       delta: '+5',   up: true },
  { label: 'Advertisers Enabled', value: '12',      delta: null,   up: null },
  { label: 'Total Clicks (30d)', value: '89,234',   delta: '+8%',  up: true },
];

const ADVERTISERS = [
  { id: 'a1', name: 'Nike Global',       status: true,  campaigns: 8,  trackers: 340, spend: '$28,400' },
  { id: 'a2', name: 'Adidas Sports',     status: true,  campaigns: 5,  trackers: 210, spend: '$19,800' },
  { id: 'a3', name: 'Apple Inc.',        status: true,  campaigns: 3,  trackers: 95,  spend: '$31,200' },
  { id: 'a4', name: 'Samsung Mobile',    status: false, campaigns: 0,  trackers: 0,   spend: '$0' },
  { id: 'a5', name: 'Levi\'s Apparel',   status: true,  campaigns: 6,  trackers: 280, spend: '$14,900' },
  { id: 'a6', name: 'Unilever FMCG',    status: true,  campaigns: 4,  trackers: 190, spend: '$9,600' },
  { id: 'a7', name: 'Nestlé Foods',     status: false, campaigns: 0,  trackers: 0,   spend: '$0' },
  { id: 'a8', name: 'Sony Electronics', status: true,  campaigns: 2,  trackers: 78,  spend: '$7,200' },
];

// ── Inline icon helpers ───────────────────────────────────────────────────────
const LinkIcon = () => (
  <Icon size={16} color={ACCENT}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </Icon>
);
const SaveIcon = () => (
  <Icon size={14} color="#fff">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </Icon>
);
const ArrowUpIcon = () => (
  <Icon size={12} color={GREEN}><polyline points="18 15 12 9 6 15"/></Icon>
);
const ArrowDownIcon = () => (
  <Icon size={12} color="#EF4444"><polyline points="6 9 12 15 18 9"/></Icon>
);

// ── Toggle switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      title={checked ? 'Enabled — click to disable' : 'Disabled — click to enable'}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: disabled ? 'default' : 'pointer',
        background: checked ? ACCENT : '#d1d5db',
        position: 'relative', transition: 'background 0.2s',
        flexShrink: 0, opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: 9, background: '#fff',
        position: 'absolute', top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      }} />
    </button>
  );
}

// ── Section card ─────────────────────────────────────────────────────────────
function Card({ children, style: extra }) {
  return (
    <div style={{
      background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10,
      padding: '20px 24px', marginBottom: 16, ...extra,
    }}>
      {children}
    </div>
  );
}

// ── Row for a single config setting ─────────────────────────────────────────
function SettingRow({ label, help, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: `1px solid ${BORDER}`,
    }}>
      <div style={{ flex: 1, maxWidth: 420 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_HI, marginBottom: 2 }}>{label}</div>
        {help && <div style={{ fontSize: 12, color: TEXT_MID }}>{help}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

// ── Inline select ─────────────────────────────────────────────────────────────
function InlineSelect({ value, onChange, options, width = 180 }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width, border: `1px solid ${BORDER}`, borderRadius: 7, padding: '7px 12px',
        fontFamily: FONT, fontSize: 13, color: TEXT_HI, background: WHITE, cursor: 'pointer',
        outline: 'none',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ── Inline input ─────────────────────────────────────────────────────────────
function InlineInput({ value, onChange, type = 'text', width = 200, prefix, suffix }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 7, overflow: 'hidden', width }}>
      {prefix && (
        <span style={{ padding: '7px 10px', background: BG_SUB, fontSize: 13, color: TEXT_MID, borderRight: `1px solid ${BORDER}` }}>
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          flex: 1, border: 'none', outline: 'none', padding: '7px 12px',
          fontFamily: FONT, fontSize: 13, color: TEXT_HI, background: WHITE,
        }}
      />
      {suffix && (
        <span style={{ padding: '7px 10px', background: BG_SUB, fontSize: 13, color: TEXT_MID, borderLeft: `1px solid ${BORDER}` }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_HI }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: TEXT_MID, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

// ── Read-only field ───────────────────────────────────────────────────────────
function ReadOnlyField({ value, note }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={{
        padding: '7px 14px', background: BG_MUT, border: `1px solid ${BORDER}`,
        borderRadius: 7, fontSize: 13, fontWeight: 600, color: TEXT_MID,
      }}>
        {value}
      </div>
      {note && <div style={{ fontSize: 11, color: TEXT_LO }}>{note}</div>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function BYOTAdminConfigPage() {
  const [activeTab, setActiveTab]       = useState('General');
  const [search, setSearch]             = useState('');
  const [advStatus, setAdvStatus]       = useState(
    Object.fromEntries(ADVERTISERS.map(a => [a.id, a.status]))
  );
  const { toast, showToast } = useToast();

  // ── General tab state ─────────────────────────────────────────────────────
  const [byotEnabled, setByotEnabled]         = useState(true);
  const [attrWindow, setAttrWindow]           = useState('24h');
  const [sessionWindow, setSessionWindow]     = useState('30min');
  const [allowedDomain, setAllowedDomain]     = useState('tracker.yourretailer.com');

  // ── Limits tab state ─────────────────────────────────────────────────────
  const [limitPerCampaign, setLimitPerCampaign] = useState('100');
  const [limitPerBrand, setLimitPerBrand]       = useState('1000');
  const [limitPerRetailer, setLimitPerRetailer] = useState('10000');

  // ── Wallet Rules tab state ────────────────────────────────────────────────
  const [gracePeriod, setGracePeriod]     = useState('24h');
  const [minBalance, setMinBalance]       = useState('50');
  const [autoPause, setAutoPause]         = useState(true);
  const [alertEmail, setAlertEmail]       = useState('ops@retailer.com');

  // ── Derived ─────────────────────────────────────────────────────────────
  const filteredAdvs = ADVERTISERS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => showToast('Configuration saved successfully');

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: '20px 24px' }}>
      <Toast {...toast} />

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <LinkIcon />
            <span style={{ fontSize: 20, fontWeight: 700, color: TEXT_HI }}>BYOT Configuration</span>
            <span style={{
              padding: '2px 8px', background: ACCENT_M, color: ACCENT,
              borderRadius: 999, fontSize: 11, fontWeight: 700,
            }}>Beta</span>
          </div>
          <div style={{ fontSize: 13, color: TEXT_MID }}>
            Manage Bring Your Own Traffic settings, advertiser access, and attribution rules.
          </div>
        </div>
        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 20px', background: ACCENT, border: 'none',
            borderRadius: 8, color: '#fff', fontFamily: FONT,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <SaveIcon />
          Save Changes
        </button>
      </div>

      {/* ── KPI bar ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 20 }}>
        {KPI_DATA.map(k => (
          <div key={k.label} style={{
            background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10,
            padding: '16px 20px',
          }}>
            <div style={{ fontSize: 12, color: TEXT_MID, marginBottom: 6 }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: TEXT_HI }}>{k.value}</span>
              {k.delta && (
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 2,
                  fontSize: 12, fontWeight: 600,
                  color: k.up ? GREEN : '#EF4444',
                }}>
                  {k.up ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {k.delta}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 0, borderBottom: `2px solid ${BORDER}`, marginBottom: 20,
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px', border: 'none', borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : '2px solid transparent',
              marginBottom: -2,
              background: 'transparent', fontFamily: FONT, fontSize: 13, fontWeight: 600,
              color: activeTab === tab ? ACCENT : TEXT_MID, cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── General tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'General' && (
        <div>
          <Card>
            <SectionHeader
              title="Feature Availability"
              subtitle="Control whether BYOT is available to advertisers on this platform."
            />
            <SettingRow
              label="Enable BYOT"
              help="When disabled, advertisers cannot create campaigns or generate tracker links."
            >
              <Toggle checked={byotEnabled} onChange={setByotEnabled} />
            </SettingRow>
          </Card>

          <Card>
            <SectionHeader
              title="Attribution Settings"
              subtitle="Configure how clicks are attributed to orders. v1 uses session-based attribution."
            />
            <SettingRow
              label="Attribution Model"
              help="Session-based attribution (v1). Multi-touch and halo models are out of scope."
            >
              <ReadOnlyField value="Session-based (v1)" note="Not configurable in v1" />
            </SettingRow>
            <SettingRow
              label="Attribution Window"
              help="How long after a click an order can be attributed to the BYOT campaign."
            >
              <InlineSelect
                value={attrWindow}
                onChange={setAttrWindow}
                options={[
                  { value: '6h',  label: '6 hours' },
                  { value: '12h', label: '12 hours' },
                  { value: '24h', label: '24 hours (default)' },
                  { value: '48h', label: '48 hours' },
                  { value: '72h', label: '72 hours' },
                  { value: '7d',  label: '7 days' },
                ]}
              />
            </SettingRow>
            <SettingRow
              label="Session Window"
              help="Maximum gap between events before a new session is started."
            >
              <InlineSelect
                value={sessionWindow}
                onChange={setSessionWindow}
                options={[
                  { value: '15min', label: '15 minutes' },
                  { value: '30min', label: '30 minutes (default)' },
                  { value: '60min', label: '60 minutes' },
                ]}
              />
            </SettingRow>
          </Card>

          <Card>
            <SectionHeader
              title="Redirect & Security"
              subtitle="Technical constraints that apply to all tracker links. Some are fixed by the platform SLA."
            />
            <SettingRow
              label="Redirect Type"
              help="302 (temporary) redirects are used to allow tracker URL rotation."
            >
              <ReadOnlyField value="302 Redirect" note="Fixed — not configurable" />
            </SettingRow>
            <SettingRow
              label="HTTPS Enforcement"
              help="All tracker links must use HTTPS. HTTP destinations are blocked."
            >
              <ReadOnlyField value="Enforced" note="Fixed — not configurable" />
            </SettingRow>
            <SettingRow
              label="Latency SLA"
              help="Maximum allowed redirect latency before a timeout error is returned."
            >
              <ReadOnlyField value="< 100ms" note="Platform guarantee" />
            </SettingRow>
            <SettingRow
              label="Allowed Tracker Domain"
              help="The subdomain advertisers will use for tracker URLs (e.g. tracker.yourretailer.com/abc123)."
            >
              <InlineInput
                value={allowedDomain}
                onChange={setAllowedDomain}
                width={280}
                prefix="https://"
              />
            </SettingRow>
          </Card>
        </div>
      )}

      {/* ── Advertiser Access tab ────────────────────────────────────────────── */}
      {activeTab === 'Advertiser Access' && (
        <div>
          <Card style={{ padding: '16px 20px' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_HI }}>
                Advertisers ({ADVERTISERS.length})
                <span style={{
                  marginLeft: 8, fontSize: 12, fontWeight: 400,
                  color: TEXT_MID,
                }}>
                  {Object.values(advStatus).filter(Boolean).length} enabled
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: `1px solid ${BORDER}`, borderRadius: 7, padding: '6px 10px', background: WHITE,
                }}>
                  <SearchIcon />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search advertisers..."
                    style={{
                      border: 'none', outline: 'none', fontSize: 13,
                      color: TEXT_HI, background: 'transparent', width: 200, fontFamily: FONT,
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    const allOn = Object.values(advStatus).every(Boolean);
                    const next = Object.fromEntries(ADVERTISERS.map(a => [a.id, !allOn]));
                    setAdvStatus(next);
                    showToast(allOn ? 'All advertisers disabled' : 'All advertisers enabled');
                  }}
                  style={{
                    padding: '7px 14px', border: `1px solid ${BORDER}`, borderRadius: 7,
                    background: WHITE, fontFamily: FONT, fontSize: 13, color: TEXT_MID, cursor: 'pointer',
                  }}
                >
                  Toggle All
                </button>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
              <thead>
                <tr style={{ background: BG_SUB }}>
                  {['Advertiser', 'BYOT Status', 'Campaigns', 'Trackers Used', 'Monthly Spend', 'Action'].map(col => (
                    <th key={col} style={{
                      padding: '10px 14px', textAlign: 'left', fontSize: 11,
                      fontWeight: 700, color: TEXT_MID, textTransform: 'uppercase',
                      letterSpacing: '0.04em', borderBottom: `1px solid ${BORDER}`,
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAdvs.map((adv, i) => {
                  const enabled = advStatus[adv.id];
                  return (
                    <tr key={adv.id} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : BG_SUB }}>
                      <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: TEXT_HI }}>
                        {adv.name}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                          background: enabled ? GREEN_M : BG_MUT,
                          color: enabled ? GREEN : TEXT_MID,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: enabled ? GREEN : '#d1d5db' }} />
                          {enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: TEXT_HI }}>{adv.campaigns}</td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: TEXT_HI }}>{adv.trackers}</td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: TEXT_HI }}>{adv.spend}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <Toggle
                          checked={enabled}
                          onChange={v => {
                            setAdvStatus(prev => ({ ...prev, [adv.id]: v }));
                            showToast(`${adv.name} BYOT ${v ? 'enabled' : 'disabled'}`);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* ── Limits & Quotas tab ──────────────────────────────────────────────── */}
      {activeTab === 'Limits & Quotas' && (
        <div>
          <Card>
            <SectionHeader
              title="Global Defaults"
              subtitle="These limits apply to all advertisers unless overridden at the advertiser level."
            />

            {/* Info note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              padding: '12px 14px', background: ACCENT_M, borderRadius: 8, marginBottom: 16,
              border: `1px solid ${ACCENT}22`,
            }}>
              <InfoIcon />
              <div style={{ fontSize: 12, color: TEXT_HI }}>
                PRD constraints: 100 trackers/campaign (max), 1000 trackers/brand (max).
                Increasing limits requires backend config change in addition to updating here.
              </div>
            </div>

            <SettingRow
              label="Trackers per Campaign"
              help="Maximum number of tracker links an advertiser can create in a single campaign."
            >
              <InlineInput
                value={limitPerCampaign}
                onChange={setLimitPerCampaign}
                type="number"
                width={140}
                suffix="links"
              />
            </SettingRow>
            <SettingRow
              label="Trackers per Brand"
              help="Total tracker links a brand can have across all their campaigns."
            >
              <InlineInput
                value={limitPerBrand}
                onChange={setLimitPerBrand}
                type="number"
                width={140}
                suffix="links"
              />
            </SettingRow>
            <SettingRow
              label="Trackers per Retailer"
              help="Total tracker links active on your platform at any given time."
            >
              <InlineInput
                value={limitPerRetailer}
                onChange={setLimitPerRetailer}
                type="number"
                width={140}
                suffix="links"
              />
            </SettingRow>
          </Card>

          <Card>
            <SectionHeader
              title="Out of Scope (v1)"
              subtitle="The following features are explicitly excluded from the current release."
            />
            {[
              'Custom tracker domains per advertiser',
              'URL shortener / vanity links',
              'Tag-level tracking',
              'MMP integration (Appsflyer, Adjust, Branch)',
              'SDK / API-based attribution',
              'Halo Views & Tagged PDP Views',
              'Product-level attribution',
            ].map(item => (
              <div key={item} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 0', borderBottom: `1px solid ${BORDER}`,
                fontSize: 13, color: TEXT_MID,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 3, background: BG_MUT,
                  border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: TEXT_LO, flexShrink: 0,
                }}>✕</span>
                {item}
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── Wallet Rules tab ─────────────────────────────────────────────────── */}
      {activeTab === 'Wallet Rules' && (
        <div>
          <Card>
            <SectionHeader
              title="Grace Period"
              subtitle="How long a campaign can run after the wallet balance reaches zero before auto-pause triggers."
            />
            <SettingRow
              label="Grace Period Duration"
              help="PRD default: 24 hours. Campaigns in grace period continue running but cannot generate new tracker links."
            >
              <InlineSelect
                value={gracePeriod}
                onChange={setGracePeriod}
                options={[
                  { value: '0',   label: 'Immediate (no grace)' },
                  { value: '12h', label: '12 hours' },
                  { value: '24h', label: '24 hours (default)' },
                  { value: '48h', label: '48 hours' },
                ]}
              />
            </SettingRow>
          </Card>

          <Card>
            <SectionHeader
              title="Minimum Balance & Alerts"
              subtitle="Configure the threshold below which advertisers receive a wallet low-balance notification."
            />
            <SettingRow
              label="Low Balance Alert Threshold"
              help="When an advertiser wallet falls below this amount, they receive an email notification."
            >
              <InlineInput
                value={minBalance}
                onChange={setMinBalance}
                type="number"
                width={160}
                prefix="$"
              />
            </SettingRow>
            <SettingRow
              label="Auto-Pause on Depletion"
              help="Automatically pause all campaigns for an advertiser when their wallet balance reaches $0 (after grace period)."
            >
              <Toggle checked={autoPause} onChange={setAutoPause} />
            </SettingRow>
            <SettingRow
              label="Ops Alert Email"
              help="Retailer operations team email that receives wallet depletion alerts across all advertisers."
            >
              <InlineInput
                value={alertEmail}
                onChange={setAlertEmail}
                type="email"
                width={260}
              />
            </SettingRow>
          </Card>

          <Card>
            <SectionHeader
              title="Wallet Requirement"
              subtitle="Wallet must be positive (above zero) for campaigns to run. This is a platform constraint — not configurable."
            />
            <SettingRow
              label="Require Positive Wallet Balance"
              help="Campaigns cannot launch or continue if the associated wallet balance is zero or negative."
            >
              <ReadOnlyField value="Required" note="Platform constraint — fixed" />
            </SettingRow>
          </Card>
        </div>
      )}
    </div>
  );
}
