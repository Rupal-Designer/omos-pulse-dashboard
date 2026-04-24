import React, { useState } from 'react';

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const PERSONAS = [
  { key: 'Platinum', dot: '#94a3b8' },
  { key: 'Gold',     dot: '#f59e0b' },
  { key: 'Silver',   dot: '#64748b' },
  { key: 'Beta',     dot: '#8b5cf6' },
];

const CATEGORIES = [
  { key: 'app-config',  label: 'App Level Config' },
  { key: 'product-ads', label: 'Product Ads' },
  { key: 'display-ads', label: 'Display Ads' },
  { key: 'offsite-ads', label: 'Offsite Ads' },
  { key: 'instore-ads', label: 'In-Store Digital Ads' },
];

const INITIAL_DATA = {
  'app-config': {
    enabled: true,
    rows: [
      { id: 'enable_announcement',   label: 'App Level Config > Enable Announcement',                              group: 'App Level Config',      Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'enable_ask_rating',     label: 'App Level Config > Enable ask for rating',                           group: 'App Level Config',      Platinum: true,  Gold: false, Silver: true,  Beta: false },
      { id: 'enable_suggestions',    label: 'App Level Config > Enable Suggestions',                              group: 'App Level Config',      Platinum: false, Gold: false, Silver: true,  Beta: true  },
      { id: 'enable_hygiene',        label: 'App Level Config > Enable Hygiene',                                  group: 'App Level Config',      Platinum: false, Gold: true,  Silver: false, Beta: true  },
      { id: 'enable_app_header',     label: 'App Level Config > Enable App Header',                               group: 'App Level Config',      Platinum: true,  Gold: false, Silver: true,  Beta: false },
      { id: 'hide_wallet_balance',   label: 'App Level Config > Hide wallet balance & promotional balance split', group: 'App Level Config',      Platinum: false, Gold: true,  Silver: false, Beta: true  },
      { id: 'enable_change_history', label: 'App Level Config > Enable Change History For Billing',               group: 'App Level Config',      Platinum: true,  Gold: false, Silver: true,  Beta: false },
      { id: 'enable_sofie',          label: 'App Level Config > Enable Sofie Suggestions',                        group: 'App Level Config',      Platinum: false, Gold: false, Silver: false, Beta: true  },
      { id: 'enable_perf_dashboard', label: 'Performance Dashboard > Enable Performance Dashboard',               group: 'Performance Dashboard', Platinum: true,  Gold: true,  Silver: true,  Beta: false },
      { id: 'enable_header',         label: 'Performance Dashboard > Dashboard Header > Enable Header',           group: 'Performance Dashboard', Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'enable_navigation',     label: 'Performance Dashboard > Dashboard Header > Enable Navigation',       group: 'Performance Dashboard', Platinum: true,  Gold: false, Silver: true,  Beta: false },
      { id: 'enable_global_date',    label: 'Performance Dashboard > Dashboard Header > Enable Global Date Selection', group: 'Performance Dashboard', Platinum: false, Gold: true, Silver: false, Beta: true },
      { id: 'enable_wallet',         label: 'Performance Dashboard > Dashboard Header > Enable Wallet Balance',   group: 'Performance Dashboard', Platinum: false, Gold: true,  Silver: false, Beta: true  },
      { id: 'enable_transactions',   label: 'Performance Dashboard > Dashboard Header > Enable Transactions Log', group: 'Performance Dashboard', Platinum: true,  Gold: false, Silver: true,  Beta: false },
      { id: 'enable_email_comm',     label: 'Performance Dashboard > Dashboard Header > Enable Email Communication Setting', group: 'Performance Dashboard', Platinum: true, Gold: true, Silver: true, Beta: true },
      { id: 'enable_sched_reports',  label: 'Performance Dashboard > Dashboard Header > Enable Scheduled Reports', group: 'Performance Dashboard', Platinum: true, Gold: true, Silver: true, Beta: true },
    ],
  },
  'product-ads': {
    enabled: true,
    rows: [
      { id: 'pa_campaign',    label: 'Product Ads > Enable Campaign Creation',  group: 'Campaign Management', Platinum: true,  Gold: true,  Silver: true,  Beta: false },
      { id: 'pa_bulk',        label: 'Product Ads > Enable Bulk Upload',        group: 'Campaign Management', Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'pa_auto_bid',    label: 'Product Ads > Enable Auto Bidding',       group: 'Campaign Management', Platinum: true,  Gold: false, Silver: false, Beta: true  },
      { id: 'pa_reports',     label: 'Product Ads > Enable Advanced Reports',   group: 'Reporting',           Platinum: true,  Gold: true,  Silver: true,  Beta: true  },
      { id: 'pa_export',      label: 'Product Ads > Enable Export',             group: 'Reporting',           Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'pa_scheduled',   label: 'Product Ads > Enable Scheduled Reports',  group: 'Reporting',           Platinum: true,  Gold: false, Silver: true,  Beta: true  },
    ],
  },
  'display-ads': {
    enabled: true,
    rows: [
      { id: 'da_banner',      label: 'Display Ads > Enable Banner Ads',         group: 'Ad Formats',  Platinum: true,  Gold: true,  Silver: true,  Beta: false },
      { id: 'da_video',       label: 'Display Ads > Enable Video Ads',          group: 'Ad Formats',  Platinum: true,  Gold: false, Silver: false, Beta: false },
      { id: 'da_native',      label: 'Display Ads > Enable Native Ads',         group: 'Ad Formats',  Platinum: true,  Gold: true,  Silver: false, Beta: true  },
      { id: 'da_audience',    label: 'Display Ads > Enable Audience Targeting', group: 'Targeting',   Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'da_retargeting', label: 'Display Ads > Enable Retargeting',        group: 'Targeting',   Platinum: true,  Gold: true,  Silver: true,  Beta: false },
    ],
  },
  'offsite-ads': {
    enabled: true,
    rows: [
      { id: 'os_ad_buying',   label: 'Offsite Ads > Enable Programmatic Ad Buying',    group: 'Programmatic Display', Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'os_dsp',         label: 'Offsite Ads > Allow DSP Integration',            group: 'Programmatic Display', Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'os_retargeting', label: 'Offsite Ads > Enable Retargeting Campaigns',     group: 'Programmatic Display', Platinum: true,  Gold: true,  Silver: true,  Beta: false },
      { id: 'os_social',      label: 'Offsite Ads > Enable Social Media Ad Sync',      group: 'Social & Search',      Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'os_google',      label: 'Offsite Ads > Enable Google Ads Integration',    group: 'Social & Search',      Platinum: true,  Gold: false, Silver: false, Beta: false },
      { id: 'os_cross',       label: 'Offsite Ads > Enable Cross-Channel Attribution', group: 'Social & Search',      Platinum: true,  Gold: true,  Silver: false, Beta: false },
    ],
  },
  'instore-ads': {
    enabled: true,
    rows: [
      { id: 'is_signage',     label: 'In-Store > Enable Digital Signage',      group: 'Digital Signage', Platinum: true,  Gold: true,  Silver: false, Beta: false },
      { id: 'is_dynamic',     label: 'In-Store > Enable Dynamic Content',      group: 'Digital Signage', Platinum: true,  Gold: false, Silver: false, Beta: true  },
      { id: 'is_scheduling',  label: 'In-Store > Enable Ad Scheduling',        group: 'Digital Signage', Platinum: true,  Gold: true,  Silver: true,  Beta: false },
      { id: 'is_footfall',    label: 'In-Store > Enable Footfall Analytics',   group: 'Analytics',       Platinum: true,  Gold: false, Silver: false, Beta: false },
      { id: 'is_heatmap',     label: 'In-Store > Enable Heatmap Tracking',     group: 'Analytics',       Platinum: true,  Gold: false, Silver: false, Beta: false },
    ],
  },
};

const GROUP_STYLES = {
  'App Level Config':      { bg: '#fff',    headerBg: '#f8fafc', headerColor: '#475569' },
  'Performance Dashboard': { bg: '#fafbff', headerBg: '#f0f4ff', headerColor: '#3b4ea6' },
};
function groupStyle(group) {
  return GROUP_STYLES[group] || { bg: '#fff', headerBg: '#f8fafc', headerColor: '#475569' };
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */
function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

function Checkbox({ checked, onChange, disabled }) {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      style={{
        width: 16, height: 16, borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0,
        border: checked && !disabled ? 'none' : '1.5px solid #cbd5e1',
        background: disabled ? '#f1f5f9' : checked ? 'var(--osmos-brand-primary)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s', opacity: disabled ? 0.5 : 1,
      }}
    >
      {checked && !disabled && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function CategoryToggle({ checked, onChange }) {
  const w = 44, h = 24, thumb = 20, travel = w - thumb - 4;
  return (
    <div
      onClick={onChange}
      style={{
        width: w, height: h, borderRadius: h / 2, cursor: 'pointer',
        background: checked ? 'var(--osmos-brand-primary)' : '#cbd5e1',
        display: 'flex', alignItems: 'center', padding: '0 2px',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        width: thumb, height: thumb, borderRadius: '50%', background: '#fff',
        transform: checked ? `translateX(${travel}px)` : 'translateX(0)',
        transition: 'transform 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      }} />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export default function PersonaConfigPage() {
  const [data, setData]               = useState(INITIAL_DATA);
  const [activeCategory, setActiveCategory] = useState('app-config');
  const [search, setSearch]           = useState('');
  const [toast, setToast]             = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function toggleCategoryEnabled(catKey) {
    setData(prev => ({
      ...prev,
      [catKey]: { ...prev[catKey], enabled: !prev[catKey].enabled },
    }));
  }

  function handleToggle(catKey, rowId, persona) {
    setData(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey],
        rows: prev[catKey].rows.map(r =>
          r.id === rowId ? { ...r, [persona]: !r[persona] } : r
        ),
      },
    }));
  }

  const cat     = data[activeCategory];
  const catMeta = CATEGORIES.find(c => c.key === activeCategory);

  const filtered = cat.rows.filter(r =>
    r.label.toLowerCase().includes(search.toLowerCase())
  );

  // Build grouped list with header rows
  const grouped = [];
  let lastGroup = null;
  filtered.forEach(row => {
    if (row.group !== lastGroup) {
      grouped.push({ type: 'header', group: row.group });
      lastGroup = row.group;
    }
    grouped.push({ type: 'row', ...row });
  });

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, background: '#16a34a', color: '#fff',
          padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          {toast}
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* ── Card Header ── */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico stroke="var(--osmos-brand-primary)" d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Persona Configuration</span>
        </div>

        {/* ── Category Tabs + Search ── */}
        <div style={{ padding: '0 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1 }}>
            {CATEGORIES.map(c => {
              const isActive  = c.key === activeCategory;
              const isEnabled = data[c.key].enabled;
              return (
                <button
                  key={c.key}
                  onClick={() => { setActiveCategory(c.key); setSearch(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '12px 16px',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--osmos-brand-primary)' : '2px solid transparent',
                    background: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                    fontFamily: "'Open Sans', sans-serif",
                    marginBottom: -1, whiteSpace: 'nowrap', transition: 'color 0.15s',
                  }}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: isEnabled ? '#22c55e' : '#cbd5e1',
                  }} />
                  {c.label}
                </button>
              );
            })}
          </div>
          {/* Search aligned to the right of the tabs row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30, marginLeft: 12 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Feature Name"
              style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }}
            />
          </div>
        </div>

        {/* ── Category Header (Enable Category toggle) ── */}
        <div style={{
          padding: '10px 16px', borderBottom: '1px solid var(--osmos-border)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>
            {catMeta.label}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: cat.enabled ? '#dcfce7' : '#f1f5f9',
            color: cat.enabled ? '#16a34a' : '#64748b',
            fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: cat.enabled ? '#22c55e' : '#94a3b8',
            }} />
            {cat.enabled ? 'Category Enabled' : 'Category Disabled'}
          </span>
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>
            {cat.rows.filter(r => PERSONAS.some(p => r[p.key])).length} of {cat.rows.length} features active
          </span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontWeight: 500 }}>
            Enable Category
          </span>
          <CategoryToggle
            checked={cat.enabled}
            onChange={() => toggleCategoryEnabled(activeCategory)}
          />
        </div>


        {/* ── Matrix Table ── */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '2px solid var(--osmos-border)' }}>
                <th style={{
                  padding: '10px 16px', textAlign: 'left', fontWeight: 600,
                  color: 'var(--osmos-fg-muted)', fontSize: 11, minWidth: 340,
                  position: 'sticky', left: 0, background: 'var(--osmos-bg-subtle)',
                  borderRight: '1px solid var(--osmos-border)',
                }}>
                  Feature
                </th>
                {PERSONAS.map(p => (
                  <th key={p.key} style={{
                    padding: '10px 16px', textAlign: 'center', fontWeight: 600,
                    color: 'var(--osmos-fg-muted)', fontSize: 11, width: 100, minWidth: 90,
                    borderRight: '1px solid var(--osmos-border)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.dot, display: 'inline-block', flexShrink: 0 }} />
                      {p.key}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grouped.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 13 }}>
                    No features match your search.
                  </td>
                </tr>
              ) : grouped.map((item, idx) => {
                if (item.type === 'header') {
                  const gs = groupStyle(item.group);
                  return (
                    <tr key={`header-${item.group}`} style={{ background: gs.headerBg }}>
                      <td colSpan={5} style={{
                        padding: '6px 16px',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                        textTransform: 'uppercase', color: gs.headerColor,
                        borderBottom: '1px solid var(--osmos-border)',
                        borderTop: idx > 0 ? '2px solid var(--osmos-border)' : 'none',
                      }}>
                        {item.group}
                      </td>
                    </tr>
                  );
                }

                const gs = groupStyle(item.group);
                return (
                  <tr
                    key={item.id}
                    style={{ borderBottom: '1px solid var(--osmos-border)', background: gs.bg }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = gs.bg}
                  >
                    <td style={{
                      padding: '10px 16px', color: 'var(--osmos-fg)', fontSize: 12,
                      position: 'sticky', left: 0, background: 'inherit',
                      borderRight: '1px solid var(--osmos-border)',
                    }}>
                      {item.label}
                    </td>
                    {PERSONAS.map(p => (
                      <td key={p.key} style={{
                        padding: '10px 16px', textAlign: 'center',
                        borderRight: '1px solid var(--osmos-border)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Checkbox
                            checked={item[p.key]}
                            onChange={() => handleToggle(activeCategory, item.id, p.key)}
                            disabled={!cat.enabled}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '14px 16px', borderTop: '1px solid var(--osmos-border)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button
            onClick={() => showToast('Configuration saved successfully')}
            style={{
              background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none',
              borderRadius: 6, padding: '8px 24px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
