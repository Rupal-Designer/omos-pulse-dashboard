import React, { useState, useEffect, useRef } from 'react';

/* ─── mock data ─────────────────────────────────────────────────── */
const COHORTS = [
  {
    id: 'c-1',
    name: 'High-Value Shoppers',
    description: 'Customers with 3+ purchases in the last 90 days',
    source: 'Platform', type: 'My Cohort', size: '1.2M', sizeNum: 1200000,
    sizeTrend: +8.3, visibility: 'Shared',
    channels: ['Google', 'Meta', 'DV360', 'ProductAds'],
    advertisers: 3, campaigns: 3, cpm: '$2.50', cpe: '$0.85', status: 'Active',
    audienceId: 'c-1', sourceNote: 'Created natively in Pulse',
    created: '15 Jan 26 · Aanya Sharma',
    createdDate: '15 Jan 26', createdBy: 'Aanya Sharma',
    lastRefresh: '5 hours ago',
    refreshNote: 'Auto-refresh every 24h', spend30d: '₹4.6L',
    activatedAdvertisers: 3, activatedChannels: 2, activatedChannelNames: 'Meta, Google',
    sharingAdvertisers: ['Baby Hug', 'Himalaya', 'Gold Merchant'],
    availableChannels: ['Google', 'Meta', 'TikTok', 'DV360', 'Product Ads', 'Display Ads'],
    heatmap: { Meta: [3,1,2,4,3,2,4,3,2,1,3,4,2,3], Google: [4,3,4,3,4,3,4,4,3,2,4,3,4,4] },
    spendByChannel: [{ ch: 'Meta', label: 'Meta', amount: '₹2.21L', pct: 48, color: '#1877F2' }, { ch: 'Google', label: 'Google', amount: '₹2.43L', pct: 52, color: '#34A853' }],
    campaignCount: 4,
    campaignDetails: [
      { status:'Paused',  name:'Lip Bar Launch',    advertiser:'Colorbar',        initials:'CB', color:'#E91E63', channel:'Meta',   spend:'₹99.2K'  },
      { status:'Active',  name:'New Drop · Vegan',  advertiser:'Sugar Cosmetics', initials:'SG', color:'#4CAF50', channel:'Google', spend:'₹110.3K' },
      { status:'Active',  name:'Influencer Collab', advertiser:'Renee Cosmetics', initials:'RC', color:'#9C27B0', channel:'Meta',   spend:'₹112K'   },
      { status:'Active',  name:'Summer Glow',       advertiser:'Colorbar',        initials:'CB', color:'#E91E63', channel:'Google', spend:'₹84.7K'  },
    ],
  },
  {
    id: 'c-2',
    name: 'Baby & Kids Intenders',
    description: 'Import by ID audience for baby products category',
    source: 'API', type: 'Import by ID', size: '845K', sizeNum: 845000,
    sizeTrend: -2.1, visibility: 'Shared',
    channels: ['DV360'],
    advertisers: 2, campaigns: 2, cpm: '$3.00', cpe: '$0.95', status: 'Active',
    audienceId: 'c-2', sourceNote: 'Imported via API',
    created: '10 Jan 26 · Priya Mehta',
    createdDate: '10 Jan 26', createdBy: 'Priya Mehta',
    lastRefresh: '2 hours ago',
    refreshNote: 'Auto-refresh every 12h', spend30d: '₹2.1L',
    activatedAdvertisers: 2, activatedChannels: 1, activatedChannelNames: 'DV360',
    sharingAdvertisers: ['MamaEarth', 'Himalaya'],
    availableChannels: ['Google', 'Meta', 'TikTok', 'DV360', 'Product Ads', 'Display Ads'],
    heatmap: { DV360: [2,3,2,3,2,1,2,3,2,3,2,1,2,3] },
    spendByChannel: [{ ch: 'DV360', label: 'DV360', amount: '₹2.1L', pct: 100, color: '#1A73E8' }],
    campaignCount: 2,
    campaignDetails: [
      { status:'Active', name:'Baby Care Q1',  advertiser:'MamaEarth', initials:'ME', color:'#4CAF50', channel:'DV360', spend:'₹1.1L' },
      { status:'Active', name:'Kids Bundle',   advertiser:'Himalaya',  initials:'HI', color:'#2196F3', channel:'DV360', spend:'₹1.0L' },
    ],
  },
  {
    id: 'c-3',
    name: 'Lapsed Buyers - 180d',
    description: 'Customers who purchased 6+ months ago, not since',
    source: 'API', type: 'My Cohort', size: '1.8M', sizeNum: 1800000,
    sizeTrend: +1.4, visibility: 'Public',
    channels: ['Meta', 'TikTok', 'Display'],
    advertisers: 1, campaigns: 2, cpm: '$1.00', cpe: '$0.35', status: 'Active',
    audienceId: 'c-3', sourceNote: 'Imported via API',
    created: '05 Jan 26 · Priya Nair',
    createdDate: '05 Jan 26', createdBy: 'Priya Nair',
    lastRefresh: '1 day ago',
    refreshNote: 'Auto-refresh every 48h', spend30d: '₹0.9L',
    activatedAdvertisers: 1, activatedChannels: 2, activatedChannelNames: 'Meta, TikTok',
    sharingAdvertisers: ['Nykaa'],
    availableChannels: ['Google', 'Meta', 'TikTok', 'DV360', 'Product Ads', 'Display Ads'],
    heatmap: { Meta: [1,2,1,2,1,1,2,1,1,2,1,1,2,1], TikTok: [1,1,2,1,1,1,2,1,1,1,2,1,1,2] },
    spendByChannel: [{ ch: 'Meta', label: 'Meta', amount: '₹55K', pct: 61, color: '#1877F2' }, { ch: 'TikTok', label: 'TikTok', amount: '₹35K', pct: 39, color: '#000' }],
    campaignCount: 2,
    campaignDetails: [
      { status:'Active', name:'Win Back Sale',    advertiser:'Nykaa', initials:'NY', color:'#E91E63', channel:'Meta',   spend:'₹55K' },
      { status:'Active', name:'Re-engage TikTok', advertiser:'Nykaa', initials:'NY', color:'#E91E63', channel:'TikTok', spend:'₹35K' },
    ],
  },
  {
    id: 'c-4',
    name: 'Enriched High-Value + Meta',
    description: 'High-Value Shoppers enriched with Meta lookalike signals',
    source: 'Platform', type: 'My Cohort', size: '1.5M', sizeNum: 1500000,
    sizeTrend: +12.7, visibility: 'Shared',
    channels: ['Meta', 'Google'],
    advertisers: 2, campaigns: 3, cpm: '$3.00', cpe: '$1.10', status: 'Active',
    audienceId: 'c-4', sourceNote: 'Created natively in Pulse',
    created: '18 Jan 26 · Aanya Sharma',
    createdDate: '18 Jan 26', createdBy: 'Aanya Sharma',
    lastRefresh: '3 hours ago',
    refreshNote: 'Auto-refresh every 24h', spend30d: '₹5.2L',
    activatedAdvertisers: 2, activatedChannels: 2, activatedChannelNames: 'Meta, Google',
    sharingAdvertisers: ['Colorbar', 'Sugar Cosmetics'],
    availableChannels: ['Google', 'Meta', 'TikTok', 'DV360', 'Product Ads', 'Display Ads'],
    heatmap: { Meta: [3,4,3,4,3,4,3,4,4,3,4,3,4,4], Google: [2,3,2,3,4,3,2,3,2,3,2,4,3,2] },
    spendByChannel: [{ ch: 'Meta', label: 'Meta', amount: '₹3.2L', pct: 62, color: '#1877F2' }, { ch: 'Google', label: 'Google', amount: '₹2.0L', pct: 38, color: '#34A853' }],
    campaignCount: 3,
    campaignDetails: [
      { status:'Active', name:'Premium Launch', advertiser:'Colorbar',        initials:'CB', color:'#E91E63', channel:'Meta',   spend:'₹1.8L' },
      { status:'Active', name:'Vegan Glow',     advertiser:'Sugar Cosmetics', initials:'SG', color:'#4CAF50', channel:'Google', spend:'₹2.0L' },
      { status:'Paused', name:'Lookalike Push', advertiser:'Colorbar',        initials:'CB', color:'#E91E63', channel:'Meta',   spend:'₹1.4L' },
    ],
  },
];

const SOURCE_FILTERS = ['All', 'Platform', 'Api', 'Csv'];
const VIS_FILTERS    = ['All', 'Private', 'Shared', 'Public'];

/* ─── Channel Icons ─────────────────────────────────────────────── */
const CHANNEL_ICONS = {
  Google: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  Meta: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  TikTok: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
    </svg>
  ),
  DV360: <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: '#1a73e8', borderRadius: 2, padding: '1px 3px', lineHeight: 1.4 }}>DV</span>,
  ProductAds: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F97316">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Display: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
};

const CHANNEL_LABELS = {
  Google: 'Google Display', Meta: 'Meta Audience Network', TikTok: 'TikTok Ads',
  DV360: 'Display & Video 360', ProductAds: 'Osmos Product Ads', Display: 'Display Ads',
};

/* ─── Tiny helpers ──────────────────────────────────────────────── */
function SourceBadge({ source }) {
  const isPlatform = source === 'Platform';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, height:26, padding:'0 8px', borderRadius:'var(--radius-md)', fontSize:11, fontWeight:500, border:'0.4px solid var(--text)', color:'var(--text)', background:'var(--surface-2)', boxSizing:'border-box' }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round">
        {isPlatform
          ? <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>
          : <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>
        }
      </svg>
      {source}
    </span>
  );
}

function TypeBadge({ type }) {
  const isImport = type === 'Import by ID';
  const isMyCohort = type === 'My Cohort';
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4, height:26, padding:'0 8px',
      borderRadius:'var(--radius-md)', fontSize:11, fontWeight:500, boxSizing:'border-box',
      border: isImport ? '1px solid var(--primary-tint-1)' : isMyCohort ? '0.4px solid var(--tag-fg-recommended)' : '1px solid var(--border)',
      color: isImport ? 'var(--tag-fg-linked)' : isMyCohort ? 'var(--tag-fg-recommended)' : 'var(--text)',
      background: isImport ? 'var(--tag-bg-linked)' : isMyCohort ? 'var(--tag-bg-recommended)' : 'var(--surface-2)',
    }}>{type}</span>
  );
}

function VisibilityPill({ vis }) {
  const c = { Shared:'var(--osmos-brand-primary)', Public:'var(--osmos-brand-green)', Private:'var(--osmos-fg-muted)' }[vis] || 'var(--osmos-fg-muted)';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'var(--osmos-fg)' }}>
      <span style={{ width:7, height:7, borderRadius:'50%', background:c, display:'inline-block', flexShrink:0 }} aria-hidden="true" />
      {vis}
    </span>
  );
}

function TrendBadge({ pct }) {
  const up = pct >= 0;
  return (
    <span title={`${up?'+':''}${pct}% WoW`} style={{ display:'inline-flex', alignItems:'center', gap:2, fontSize:10, fontWeight:600, color: up ? 'var(--osmos-brand-green)' : 'var(--alert-error-primary)' }}>
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
        {up ? <polyline points="1,8 5,2 9,8"/> : <polyline points="1,2 5,8 9,2"/>}
      </svg>
      {Math.abs(pct)}%
    </span>
  );
}

function CohortAvatar({ source }) {
  const isApi = source === 'API';
  return (
    <div style={{ width:34, height:34, borderRadius:8, background: isApi ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-brand-primary-muted)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      {isApi
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-brand-green)" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      }
    </div>
  );
}

/* ─── Sparkline (inline heatmap preview in table) ──────────────── */
function SparkHeatmap({ heatmap }) {
  const allVals = Object.values(heatmap).flat();
  const max = Math.max(...allVals, 1);
  const combined = allVals.slice(0, 14);
  return (
    <div style={{ display:'flex', gap:1.5, alignItems:'flex-end', height:16 }}>
      {combined.map((v, i) => (
        <div key={i} style={{ width:3, borderRadius:1, background:'var(--osmos-brand-primary)', opacity:0.15 + (v/max)*0.85, height: Math.max(3, (v/max)*14) }} />
      ))}
    </div>
  );
}

/* ─── Heatmap row ────────────────────────────────────────────────── */
function HeatmapRow({ label, values }) {
  const max = Math.max(...values, 1);
  const colors = { Meta:'#1877F2', Google:'#34A853', DV360:'#1a73e8', TikTok:'var(--text-strong)', Display:'#8B5CF6', ProductAds:'#F97316' };
  const c = colors[label] || 'var(--osmos-brand-primary)';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
      <div style={{ width:65, display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--osmos-fg-muted)', flexShrink:0 }}>
        <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[label] || null}</span>
        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
      </div>
      <div style={{ display:'flex', gap:2 }}>
        {values.map((v, i) => <div key={i} style={{ width:16, height:16, borderRadius:2, background:c, opacity:0.15+(v/max)*0.85 }} />)}
      </div>
    </div>
  );
}

/* ─── Toast notification ─────────────────────────────────────────── */
function Toast({ msg, type = 'success', onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 3500); return () => clearTimeout(t); }, [onDismiss]);
  const bg = type === 'success' ? '#2e7d32' : '#c62828';
  return (
    <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:9999, background:bg, color:'#fff', padding:'13px 20px', borderRadius:10, fontSize:14, fontWeight:500, boxShadow:'0 6px 24px rgba(0,0,0,0.22)', display:'flex', alignItems:'center', gap:12, minWidth:280, maxWidth:440, animation:'slideDown 0.25s ease', whiteSpace:'nowrap' }}>
      <div style={{ width:24, height:24, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {type === 'success' ? <polyline points="20 6 9 17 4 12"/> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
        </svg>
      </div>
      <span style={{ flex:1 }}>{msg}</span>
      <button onClick={onDismiss} style={{ border:'none', background:'none', color:'rgba(255,255,255,0.85)', cursor:'pointer', fontSize:18, lineHeight:1, padding:0, marginLeft:4, fontWeight:300 }}>×</button>
    </div>
  );
}

/* ─── Confirm Dialog ─────────────────────────────────────────────── */
function ConfirmDialog({ title, body, confirmLabel, confirmColor = 'var(--alert-error-primary)', onConfirm, onCancel }) {
  return (
    <>
      <div onClick={onCancel} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:150 }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:160, background:'var(--osmos-bg)', borderRadius:12, padding:24, width:380, boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
        <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:700 }}>{title}</h3>
        <p style={{ margin:'0 0 20px', fontSize:13, color:'var(--osmos-fg-muted)', lineHeight:1.5 }}>{body}</p>
        <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onCancel} style={{ padding:'8px 16px', borderRadius:6, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', fontSize:13, cursor:'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding:'8px 16px', borderRadius:6, border:'none', background:confirmColor, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>{confirmLabel}</button>
        </div>
      </div>
    </>
  );
}

/* ─── Drawer skeleton ────────────────────────────────────────────── */
function DrawerSkeleton() {
  const pulse = { animation:'pulse 1.4s ease-in-out infinite', background:'linear-gradient(90deg,var(--osmos-bg-subtle) 25%,var(--osmos-border) 50%,var(--osmos-bg-subtle) 75%)', backgroundSize:'200% 100%', borderRadius:6 };
  return (
    <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ ...pulse, width:80, height:22 }} />
        <div style={{ ...pulse, width:160, height:22 }} />
      </div>
      <div style={{ ...pulse, width:'60%', height:28 }} />
      <div style={{ ...pulse, width:'80%', height:16 }} />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginTop:8 }}>
        {[...Array(5)].map((_,i) => <div key={i} style={{ ...pulse, height:72, borderRadius:8 }} />)}
      </div>
      <div style={{ display:'flex', gap:16, marginTop:8 }}>
        {['Overview','Sharing','Activation'].map(t => <div key={t} style={{ ...pulse, width:80, height:18 }} />)}
      </div>
      {[...Array(6)].map((_,i) => (
        <div key={i} style={{ display:'flex', gap:12 }}>
          <div style={{ ...pulse, width:90, height:14 }} />
          <div style={{ ...pulse, width:'55%', height:14 }} />
        </div>
      ))}
    </div>
  );
}

/* ─── Inline Editable Pricing ────────────────────────────────────── */
function PricingEditor({ cpm, cpe, onSave }) {
  const [editing, setEditing]   = useState(false);
  const [draftCpm, setDraftCpm] = useState(cpm.replace('$',''));
  const [draftCpe, setDraftCpe] = useState(cpe.replace('$',''));
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  function handleSave() {
    if (!draftCpm || !draftCpe) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setEditing(false);
      onSave?.(`$${parseFloat(draftCpm).toFixed(2)}`, `$${parseFloat(draftCpe).toFixed(2)}`);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  }

  if (!editing) {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:15, fontWeight:700, color:'var(--alert-success-primary)' }}>${parseFloat(draftCpm).toFixed(2)}</span>
          <span style={{ fontSize:11, color:'var(--text-muted)', background:'var(--surface-2)', padding:'1px 6px', borderRadius:'var(--radius-sm)', fontWeight:600 }}>CPM</span>
          <span style={{ fontSize:12, color:'var(--text-info)', margin:'0 4px' }}>·</span>
          <span style={{ fontSize:15, fontWeight:700, color:'var(--alert-success-primary)' }}>${parseFloat(draftCpe).toFixed(2)}</span>
          <span style={{ fontSize:11, color:'var(--text-muted)', background:'var(--surface-2)', padding:'1px 6px', borderRadius:'var(--radius-sm)', fontWeight:600 }}>CPE</span>
        </div>
        {saved && <span style={{ fontSize:11, color:'var(--alert-success-primary)', display:'flex', alignItems:'center', gap:3 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>Saved</span>}
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit pricing"
          style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--bg-screen)', fontSize:12, cursor:'pointer', color:'var(--primary)', fontWeight:600, transition:'background 0.1s', boxShadow:'var(--shadow-button)' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--primary-bg)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--bg-screen)'}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ flex:1 }}>
          <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-muted)', marginBottom:4 }}>CPM (Cost per 1K impressions)</label>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--text-info)' }}>$</span>
            <input type="number" step="0.01" min="0" value={draftCpm} onChange={e => setDraftCpm(e.target.value)}
              style={{ width:'100%', padding:'8px 10px 8px 22px', borderRadius:'var(--radius-md)', border:'1.5px solid var(--primary)', fontSize:13, outline:'none', boxSizing:'border-box', color:'var(--text-strong)', background:'var(--bg-screen)', fontWeight:600 }} />
          </div>
        </div>
        <div style={{ flex:1 }}>
          <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-muted)', marginBottom:4 }}>CPE (Cost cost per 1000 entries)</label>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--text-info)' }}>$</span>
            <input type="number" step="0.01" min="0" value={draftCpe} onChange={e => setDraftCpe(e.target.value)}
              style={{ width:'100%', padding:'8px 10px 8px 22px', borderRadius:'var(--radius-md)', border:'1.5px solid var(--primary)', fontSize:13, outline:'none', boxSizing:'border-box', color:'var(--text-strong)', background:'var(--bg-screen)', fontWeight:600 }} />
          </div>
        </div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={handleSave} disabled={saving}
          style={{ padding:'7px 16px', borderRadius:'var(--radius-md)', border:'none', background:'var(--primary)', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:5, boxShadow:'var(--shadow-button)', opacity: saving ? 0.75 : 1 }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.background='var(--primary-hover)'; }}
          onMouseLeave={e => e.currentTarget.style.background='var(--primary)'}>
          {saving ? <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin 0.8s linear infinite' }}><polyline points="23 4 23 10 17 10"/><path d="M1 20A11 11 0 0 1 20.4 6.6"/></svg>Saving…</> : <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Save Pricing
          </>}
        </button>
        <button onClick={() => { setEditing(false); setDraftCpm(cpm.replace('$','')); setDraftCpe(cpe.replace('$','')); }}
          style={{ padding:'7px 14px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--bg-screen)', fontSize:12, cursor:'pointer', color:'var(--text-muted)', fontWeight:500, transition:'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--bg-screen)'}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Detail Drawer (compact, tabbed) ───────────────────────────── */
function CohortDrawer({ cohort, onClose, onDeactivated }) {
  const [tab,          setTab]          = useState('overview');
  const [loading,      setLoading]      = useState(true);
  const [confirm,      setConfirm]      = useState(null);
  const [savedVis,     setSavedVis]     = useState(cohort.visibility);
  const [pendingVis,   setPendingVis]   = useState(cohort.visibility);
  const [sharingDirty, setSharingDirty] = useState(false);
  const [saveMsg,      setSaveMsg]      = useState('');
  const [localCpm,     setLocalCpm]     = useState(cohort.cpm);
  const [localCpe,     setLocalCpe]     = useState(cohort.cpe);

  useEffect(() => {
    setLoading(true);
    setSavedVis(cohort.visibility); setPendingVis(cohort.visibility);
    setSharingDirty(false); setSaveMsg(''); setTab('overview');
    setLocalCpm(cohort.cpm); setLocalCpe(cohort.cpe);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [cohort.id]);

  function handleVisChange(v) { setPendingVis(v); setSharingDirty(v !== savedVis); }
  function handleSaveSharing() {
    setSavedVis(pendingVis); setSharingDirty(false);
    setSaveMsg('Sharing settings saved.'); setTimeout(() => setSaveMsg(''), 3000);
  }
  function confirmDeactivate() { setConfirm(null); onDeactivated(cohort.id); onClose(); }

  const TABS = [
    { id:'overview',   label:'Overview',
      icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { id:'sharing',    label:'Sharing',    count: cohort.sharingAdvertisers.length,
      icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> },
    { id:'activation', label:'Activation', count: cohort.campaignCount,
      icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ];

  const bottomPrimary = tab === 'sharing'
    ? { label:'Save Sharing Settings', onClick: handleSaveSharing, disabled: !sharingDirty }
    : null;

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:40 }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:520, background:'var(--osmos-bg)', boxShadow:'-6px 0 40px rgba(0,0,0,0.13)', zIndex:50, display:'flex', flexDirection:'column' }}
        role="dialog" aria-modal="true" aria-label={`${cohort.name} details`}>

        {loading ? <DrawerSkeleton /> : (
          <>
            {/* Header */}
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--osmos-border)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
                <SourceBadge source={cohort.source==='API'?'API':cohort.source} />
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'var(--osmos-fg)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:320 }}>{cohort.name}</div>
                  <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', marginTop:1 }}>Created {cohort.created}</div>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close panel"
                style={{ width:32, height:32, borderRadius:8, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg-subtle)', cursor:'pointer', color:'var(--osmos-fg-muted)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>×</button>
            </div>

            {/* Summary + tab strip (always visible) */}
            <div style={{ padding:'16px 20px 0', flexShrink:0 }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:14 }}>
                {[
                  { label:'Audience Size', value:cohort.size,     sub:'profiles' },
                  { label:'Spend · 30D',   value:cohort.spend30d, sub:`${cohort.activatedChannels} channels` },
                  { label:'Advertisers',   value:`${cohort.activatedAdvertisers}/${cohort.advertisers}`, sub:'activated' },
                  { label:'Channels',      value:cohort.activatedChannels, sub:cohort.activatedChannelNames||'—' },
                ].map(s => (
                  <div key={s.label} style={{ background:'var(--osmos-bg)', borderRadius:8, padding:'10px 12px', border:'1px solid var(--osmos-border)' }}>
                    <div style={{ fontSize:11, fontWeight:500, color:'var(--osmos-fg-muted)', marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.label}</div>
                    <div style={{ fontSize:17, fontWeight:700, color:'var(--osmos-fg)', marginBottom:2, lineHeight:1.2 }}>{s.value}</div>
                    <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              {/* Segmented tab strip */}
              <div style={{ display:'flex', gap:4, padding:'4px', background:'var(--osmos-bg-subtle)', borderRadius:10 }} role="tablist">
                {TABS.map(t => {
                  const active = tab === t.id;
                  return (
                    <button key={t.id} role="tab" aria-selected={active} onClick={() => setTab(t.id)}
                      style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px 10px', borderRadius:7, border:'none', cursor:'pointer', fontSize:13, fontWeight:active?600:500, color:active?'var(--osmos-brand-primary)':'var(--osmos-fg-muted)', background:active?'var(--osmos-bg)':'transparent', boxShadow:active?'0 1px 4px rgba(0,0,0,0.10)':'none', transition:'all 0.15s' }}>
                      <span style={{ color:active?'var(--osmos-brand-primary)':'var(--osmos-fg-muted)', display:'flex' }}>{t.icon}</span>
                      {t.label}
                      {t.count !== undefined && (
                        <span style={{ fontSize:10, fontWeight:700, padding:'1px 6px', borderRadius:10, background:active?'var(--osmos-brand-primary-muted)':'var(--osmos-border)', color:active?'var(--osmos-brand-primary)':'var(--osmos-fg-muted)', minWidth:18, textAlign:'center' }}>{t.count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab body */}
            <div style={{ flex:1, overflowY:'auto', padding:'20px' }} role="tabpanel">

              {/* ═══ OVERVIEW ═══ */}
              {tab === 'overview' && (
                <div>
                  {[
                    { label:'Audience ID',  val: <code style={{ fontSize:12, background:'var(--osmos-bg-subtle)', padding:'2px 8px', borderRadius:4, color:'var(--osmos-fg)' }}>{cohort.audienceId}</code> },
                    { label:'Source',       val: <span style={{ display:'flex', alignItems:'center', gap:6 }}><SourceBadge source={cohort.source==='API'?'API':cohort.source}/><span style={{ fontSize:12, color:'var(--osmos-fg-muted)' }}>{cohort.sourceNote}</span></span> },
                    { label:'Definition',   val: <span style={{ lineHeight:1.6 }}>{cohort.description}</span> },
                    { label:'Visibility',   val: <VisibilityPill vis={savedVis} /> },
                    { label:'Created',      val: cohort.created },
                    { label:'Last refresh', val: <span style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ width:8, height:8, borderRadius:'50%', background:'var(--osmos-brand-green)', flexShrink:0, display:'inline-block' }} aria-hidden="true"/><span>{cohort.lastRefresh}</span><span style={{ fontSize:11, color:'var(--osmos-fg-muted)' }}> · {cohort.refreshNote}</span></span> },
                  ].map(r => (
                    <div key={r.label} style={{ display:'flex', gap:16, fontSize:13, padding:'11px 0', borderBottom:'1px solid var(--osmos-border)' }}>
                      <div style={{ width:100, color:'var(--osmos-fg-muted)', flexShrink:0, fontWeight:500, paddingTop:1 }}>{r.label}</div>
                      <div style={{ color:'var(--osmos-fg)', lineHeight:1.5, flex:1 }}>{r.val}</div>
                    </div>
                  ))}
                  <div style={{ display:'flex', gap:16, fontSize:13, padding:'14px 0', borderBottom:'1px solid var(--osmos-border)' }}>
                    <div style={{ width:100, flexShrink:0, paddingTop:1 }}>
                      <div style={{ color:'var(--osmos-fg-muted)', fontWeight:500 }}>Pricing</div>
                      <div style={{ fontSize:10, marginTop:2, color:'var(--osmos-fg-muted)' }}>Per rental</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <PricingEditor cpm={localCpm} cpe={localCpe} onSave={(c,e) => { setLocalCpm(c); setLocalCpe(e); }} />
                    </div>
                  </div>
                  {/* Sharing summary cards */}
                  <div style={{ marginTop:20 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--osmos-fg-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:12 }}>Sharing Summary</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                      <div style={{ padding:'12px 14px', borderRadius:8, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)' }}>
                        <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', marginBottom:5 }}>Visibility</div>
                        <VisibilityPill vis={savedVis} />
                      </div>
                      <div style={{ padding:'12px 14px', borderRadius:8, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)' }}>
                        <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', marginBottom:5 }}>Advertisers with access</div>
                        <div style={{ fontSize:14, fontWeight:700, color:'var(--osmos-fg)' }}>{cohort.sharingAdvertisers.length}</div>
                      </div>
                      <div style={{ padding:'12px 14px', borderRadius:8, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', gridColumn:'1/-1' }}>
                        <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', marginBottom:6 }}>Active channels</div>
                        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                          {cohort.channels.length > 0
                            ? cohort.channels.map(ch => (
                                <span key={ch} style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 10px', borderRadius:20, border:'1px solid var(--osmos-border)', fontSize:12, color:'var(--osmos-fg)', background:'var(--osmos-bg-subtle)' }}>
                                  {CHANNEL_ICONS[ch]||null} {ch}
                                </span>
                              ))
                            : <span style={{ fontSize:12, color:'var(--osmos-fg-muted)' }}>No channels activated yet</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ SHARING ═══ */}
              {tab === 'sharing' && (
                <div>
                  {sharingDirty && (
                    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:8, background:'var(--osmos-brand-amber-muted)', border:'1px solid var(--osmos-brand-amber-muted)', marginBottom:16, fontSize:12, color:'var(--osmos-brand-amber)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span><strong>Unsaved changes</strong> — click "Save Sharing Settings" to apply.</span>
                    </div>
                  )}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--osmos-fg-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10 }}>Visibility</div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                      {[{id:'Private',icon:'🔒',desc:'Only you'},{id:'Shared',icon:'🤝',desc:'Selected advertisers'},{id:'Public',icon:'🌐',desc:'All advertisers'}].map(v => {
                        const active = pendingVis === v.id;
                        return (
                          <button key={v.id} onClick={() => handleVisChange(v.id)}
                            style={{ padding:'14px 10px', borderRadius:10, border:`2px solid ${active?'var(--osmos-brand-primary-bg)':'var(--osmos-border)'}`, background:'var(--osmos-bg)', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                            <div style={{ fontSize:18, marginBottom:5 }}>{v.icon}</div>
                            <div style={{ fontSize:13, fontWeight:700, marginBottom:3, color:'var(--osmos-fg)' }}>{v.id}</div>
                            <div style={{ fontSize:11, color:'var(--osmos-fg-muted)' }}>{v.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--osmos-fg-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10 }}>Available Channels</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                      {cohort.availableChannels.map(ch => (
                        <span key={ch} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:20, border:'1px solid var(--osmos-brand-primary)', fontSize:12, color:'var(--osmos-brand-primary)', fontWeight:500, background:'var(--osmos-brand-primary-muted)' }}>
                          {CHANNEL_ICONS[ch]||null}{ch}
                        </span>
                      ))}
                    </div>
                  </div>
                  {cohort.sharingAdvertisers.length > 0 && (
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--osmos-fg-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10, display:'flex', alignItems:'center', gap:6 }}>
                        Advertisers with Access
                        <span style={{ padding:'1px 7px', borderRadius:10, background:'var(--osmos-brand-primary-muted)', color:'var(--osmos-brand-primary)', fontSize:11, fontWeight:700 }}>{cohort.sharingAdvertisers.length}</span>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                        {cohort.sharingAdvertisers.map(adv => (
                          <div key={adv} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderRadius:8, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ width:28, height:28, borderRadius:8, background:'var(--osmos-brand-primary-muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--osmos-brand-primary)' }}>{adv[0].toUpperCase()}</div>
                              <span style={{ fontSize:13, fontWeight:500 }}>{adv}</span>
                            </div>
                            <span style={{ fontSize:11, color:'var(--osmos-brand-green)', fontWeight:600, background:'var(--osmos-brand-green-muted)', padding:'2px 8px', borderRadius:10 }}>Active</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {saveMsg && (
                    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:8, background:'var(--osmos-brand-green-muted)', border:'1px solid var(--osmos-brand-green-muted)', marginBottom:14, fontSize:12, color:'var(--osmos-brand-green)', fontWeight:500 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{saveMsg}
                    </div>
                  )}
                </div>
              )}

              {/* ═══ ACTIVATION ═══ */}
              {tab === 'activation' && (
                <div>
                  <div style={{ marginBottom:24 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                      <div style={{ fontSize:14, fontWeight:700 }}>Activation heatmap</div>
                      <div style={{ fontSize:11, color:'var(--osmos-fg-muted)', background:'var(--osmos-bg-subtle)', padding:'3px 8px', borderRadius:10 }}>Last 14 days</div>
                    </div>
                    <div style={{ background:'var(--osmos-bg-subtle)', borderRadius:10, padding:'12px 14px', border:'1px solid var(--osmos-border)' }}>
                      {Object.entries(cohort.heatmap).map(([ch,vals]) => <HeatmapRow key={ch} label={ch} values={vals} />)}
                      <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:10, fontSize:11, color:'var(--osmos-fg-muted)', justifyContent:'flex-end' }}>
                        <span>Low</span>
                        {[0.15,0.35,0.55,0.75,1].map((o,i) => <div key={i} style={{ width:12, height:12, borderRadius:2, background:'var(--osmos-brand-primary)', opacity:o }} />)}
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                      <div style={{ fontSize:14, fontWeight:700 }}>Spend by channel</div>
                      <div style={{ fontSize:13, color:'var(--osmos-brand-green)', fontWeight:700 }}>{cohort.spend30d} <span style={{ fontWeight:400, color:'var(--osmos-fg-muted)', fontSize:11 }}>· 30d</span></div>
                    </div>
                    <div style={{ background:'var(--osmos-bg-subtle)', borderRadius:10, padding:'12px 14px', border:'1px solid var(--osmos-border)', display:'flex', flexDirection:'column', gap:10 }}>
                      {cohort.spendByChannel.map(s => (
                        <div key={s.ch}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                            <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[s.ch]}</span>
                            <span style={{ fontSize:13, fontWeight:500, flex:1 }}>{s.ch}</span>
                            <span style={{ fontSize:13, fontWeight:700, color:'var(--osmos-brand-green)' }}>{s.amount}</span>
                            <span style={{ fontSize:11, color:'var(--osmos-fg-muted)', minWidth:30, textAlign:'right' }}>{s.pct}%</span>
                          </div>
                          <div style={{ height:6, borderRadius:4, background:'var(--osmos-border)' }}>
                            <div style={{ width:`${s.pct}%`, height:'100%', borderRadius:4, background:s.color, transition:'width 0.4s ease' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                      <div style={{ fontSize:14, fontWeight:700 }}>Campaigns using this audience</div>
                      <span style={{ fontSize:12, fontWeight:600, background:'var(--osmos-brand-primary-muted)', color:'var(--osmos-brand-primary)', padding:'2px 10px', borderRadius:10 }}>{cohort.campaignCount} active</span>
                    </div>
                    <div style={{ padding:'20px 16px', borderRadius:10, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg-subtle)', textAlign:'center' }}>
                      <svg style={{ color:'var(--osmos-fg-muted)', display:'block', margin:'0 auto 8px' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>Campaign list</div>
                      <div style={{ fontSize:12, color:'var(--osmos-fg-muted)' }}>Detailed campaign view coming in next release.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky bottom action bar */}
            <div style={{ padding:'12px 20px', borderTop:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => setConfirm({ type:'deactivate' })}
                  style={{ padding:'8px 16px', borderRadius:6, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', fontSize:13, fontWeight:500, cursor:'pointer', color:'var(--osmos-fg)', transition:'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--alert-error-lighter)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--osmos-border)'}>
                  Deactivate
                </button>
                <button onClick={() => setConfirm({ type:'delete' })}
                  style={{ padding:'8px 16px', borderRadius:6, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', fontSize:13, fontWeight:500, cursor:'pointer', color:'var(--alert-error-primary)', transition:'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--alert-error-lighter)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--osmos-border)'}>
                  Delete
                </button>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={onClose}
                  style={{ padding:'8px 18px', borderRadius:6, border:'1px solid var(--osmos-border)', background:'var(--osmos-bg)', fontSize:13, fontWeight:500, cursor:'pointer', color:'var(--osmos-fg)' }}>
                  Close
                </button>
                {bottomPrimary && (
                  <button onClick={bottomPrimary.onClick} disabled={bottomPrimary.disabled}
                    style={{ padding:'8px 18px', borderRadius:6, border:'none', background:bottomPrimary.disabled?'var(--osmos-brand-primary-muted)':'var(--osmos-brand-primary)', color:'#fff', fontSize:13, fontWeight:600, cursor:bottomPrimary.disabled?'default':'pointer', display:'flex', alignItems:'center', gap:6, transition:'background 0.15s' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {bottomPrimary.label}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {confirm?.type === 'deactivate' && (
        <ConfirmDialog title="Deactivate this cohort?"
          body={`This cohort is actively used in ${cohort.campaigns} running campaign${cohort.campaigns!==1?'s':''}. Deactivating will stop new impressions. This action can be reversed.`}
          confirmLabel="Deactivate cohort" confirmColor="var(--osmos-brand-amber)"
          onConfirm={confirmDeactivate} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.type === 'delete' && (
        <ConfirmDialog title={`Delete "${cohort.name}"?`}
          body={`This will permanently remove the cohort and unlink it from ${cohort.campaigns} campaign${cohort.campaigns!==1?'s':''}. This action cannot be undone.`}
          confirmLabel="Delete permanently" confirmColor="var(--alert-error-primary)"
          onConfirm={() => { setConfirm(null); onClose(); }} onCancel={() => setConfirm(null)} />
      )}
    </>
  );
}

/* ─── mock advertiser list for Manage Access ────────────────────── */
const ALL_ADVERTISERS = [
  { name:'Colorbar',        category:'Cosmetics',     defaultCpm:'2.50', defaultCpe:'0.40' },
  { name:'Sugar Cosmetics', category:'Cosmetics',     defaultCpm:'2.20', defaultCpe:'0.35' },
  { name:'MamaEarth',       category:'Personal Care', defaultCpm:'3.00', defaultCpe:'0.50' },
  { name:'Himalaya',        category:'Personal Care', defaultCpm:'2.75', defaultCpe:'0.45' },
  { name:'Nykaa',           category:'Beauty',        defaultCpm:'4.00', defaultCpe:'0.60' },
  { name:'Renee Cosmetics', category:'Cosmetics',     defaultCpm:'1.80', defaultCpe:'0.30' },
  { name:'Gold Merchant',   category:'Retail',        defaultCpm:'1.50', defaultCpe:'0.25' },
  { name:'Baby Hug',        category:'Baby Care',     defaultCpm:'2.00', defaultCpe:'0.40' },
  { name:'Pampers',         category:'Baby Care',     defaultCpm:'3.50', defaultCpe:'0.55' },
];
const ALL_CHANNELS = ['Google','Meta','TikTok','DV360','Product Ads','Display Ads'];
const MOCK_CAMPAIGNS = [
  { name:'Summer Sale — Retargeting',  channel:'Meta',   status:'Running', spend:'₹1.2L', impressions:'4.8M', ctr:'2.1%' },
  { name:'New User Acquisition Q1',    channel:'Google', status:'Running', spend:'₹0.9L', impressions:'3.2M', ctr:'1.8%' },
  { name:'Brand Awareness — DV360',    channel:'DV360',  status:'Paused',  spend:'₹0.6L', impressions:'2.1M', ctr:'0.9%' },
  { name:'Loyalty Re-engagement',      channel:'Meta',   status:'Running', spend:'₹0.4L', impressions:'1.5M', ctr:'3.2%' },
];

/* ─── Full Review Modal — 3-tab drawer ─────────────────────────── */
function CohortReviewModal({ cohort, onClose, onDeactivated, onSaved }) {
  const [loading,       setLoading]       = useState(true);
  const [activeTab,     setActiveTab]     = useState('cohort-details');
  const [confirm,       setConfirm]       = useState(null);
  const [localCpm,      setLocalCpm]      = useState(cohort.cpm);
  const [localCpe,      setLocalCpe]      = useState(cohort.cpe);
  /* Manage Access state */
  const [vis,           setVis]           = useState(cohort.visibility);
  const [selChannels,   setSelChannels]   = useState(new Set(cohort.availableChannels));
  const [selAdvs,       setSelAdvs]       = useState(new Set(cohort.sharingAdvertisers));
  const [accessSaved,   setAccessSaved]   = useState(false);
  const [visConfirm,    setVisConfirm]    = useState(null); // pending visibility change

  useEffect(() => {
    setLoading(true);
    setActiveTab('cohort-details');
    setVis(cohort.visibility);
    setSelChannels(new Set(cohort.availableChannels));
    setSelAdvs(new Set(cohort.sharingAdvertisers));
    setLocalCpm(cohort.cpm); setLocalCpe(cohort.cpe);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [cohort.id]);

  function confirmDeactivate() { setConfirm(null); onDeactivated(cohort.id); onClose(); }

  function toggleChannel(ch) {
    setSelChannels(s => { const n = new Set(s); n.has(ch) ? n.delete(ch) : n.add(ch); return n; });
  }
  function toggleAdv(adv) {
    setSelAdvs(s => { const n = new Set(s); n.has(adv) ? n.delete(adv) : n.add(adv); return n; });
  }
  function saveAccess() {
    setAccessSaved(true);
    setTimeout(() => setAccessSaved(false), 2800);
    onSaved?.(`"${cohort.name}" saved successfully`);
    onClose();
  }

  /* ── helpers ── */
  function Row({ label, children }) {
    return (
      <div style={{ display:'flex', alignItems:'flex-start', padding:'11px 0', borderBottom:'1px solid var(--border)' }}>
        <span style={{ width:140, fontSize:13, color:'var(--text-muted)', fontWeight:400, flexShrink:0, paddingTop:1 }}>{label}</span>
        <span style={{ fontSize:13, color:'var(--text)', flex:1, lineHeight:1.6 }}>{children}</span>
      </div>
    );
  }

  /* ── Visibility radio card ── */
  function VisCard({ id, label, desc }) {
    const active = vis === id;
    function handleClick() {
      if (active) return;
      setVisConfirm(id); // show confirmation before applying
    }
    return (
      <button onClick={handleClick}
        style={{ flex:1, display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:8, border:`1.5px solid ${active?'var(--primary)':'var(--border)'}`, background:active?'var(--primary-bg)':'var(--bg-screen)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', minWidth:0 }}>
        <span style={{ width:16, height:16, borderRadius:'50%', border:`2px solid ${active?'var(--primary)':'var(--border-strong)'}`, background:active?'var(--primary)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
          {active && <span style={{ width:5, height:5, borderRadius:'50%', background:'#fff', display:'block' }} />}
        </span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:active?'var(--primary)':'var(--text)', marginBottom:2, lineHeight:1.2 }}>{label}</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.3 }}>{desc}</div>
        </div>
      </button>
    );
  }

  /* ── Channel checkbox card ── */
  function ChannelCard({ ch }) {
    const active = selChannels.has(ch);
    return (
      <button onClick={() => toggleChannel(ch)}
        style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:8, border:`1.5px solid ${active?'var(--osmos-brand-primary-bg)':'var(--border)'}`, background:active?'var(--primary-bg)':'var(--bg-screen)', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
        <span style={{ width:18, height:18, borderRadius:4, border:`2px solid ${active?'var(--osmos-brand-primary-bg)':'var(--border-strong)'}`, background:active?'var(--osmos-brand-primary-bg)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
          {active && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
        </span>
        <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[ch]||null}</span>
        <span style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{ch}</span>
      </button>
    );
  }

  /* ── Visibility context banner ── */
  function VisBanner() {
    if (vis === 'Private') return (
      <div style={{ display:'flex', gap:16, padding:'20px 24px', borderRadius:10, background:'var(--primary-bg)', border:'1px solid var(--primary-tint-1)', marginTop:16 }}>
        {/* Lock icon — matches screenshot */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text-strong)', marginBottom:10 }}>This cohort will be Private</div>
          <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.9 }}>
            Only you can see and use this cohort across campaigns.<br/>
            It will not appear in the shared catalog for other advertisers.<br/>
            You can change visibility to Shared or Public later from the cohort detail.<br/>
            No advertiser or channel activation is required at creation time.
          </div>
        </div>
      </div>
    );
    if (vis === 'Public') return (
      <div style={{ display:'flex', gap:12, padding:'16px 20px', borderRadius:8, background:'var(--alert-success-bg)', border:'1px solid var(--alert-success-darker)', marginTop:16, alignItems:'flex-start' }}>
        {/* Eye icon matching screenshot */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--alert-success-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--alert-success-primary)', marginBottom:3 }}>Public Access</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.6 }}>This cohort will be visible to all advertisers on the platform. Any advertiser can purchase and use this audience for their campaigns.</div>
        </div>
      </div>
    );
    return null;
  }

  /* ── Visibility change confirmation dialog ── */
  function VisConfirmDialog() {
    if (!visConfirm) return null;
    /* Per-visibility dialog content */
    const dialogContent = {
      Private: {
        icon: null,
        title: 'Make Cohort Private?',
        body: (
          <span>This cohort currently has <strong>{cohort.activatedAdvertisers} advertiser{cohort.activatedAdvertisers !== 1 ? 's' : ''}</strong> with access. Making it private will remove all advertiser access and deactivate any running campaigns using this cohort.</span>
        ),
        confirmLabel: 'Yes, Make Private',
        confirmBg: 'var(--osmos-brand-primary-bg)',
      },
      Shared: {
        icon: null,
        title: 'Change to Shared?',
        body: 'This cohort will be visible only to the advertisers you assign below.',
        confirmLabel: 'Yes, Make Shared',
        confirmBg: 'var(--osmos-brand-primary-bg)',
      },
      Public: {
        icon: null,
        title: 'Make Cohort Public?',
        body: 'All advertisers on the platform will be able to see and use this cohort.',
        confirmLabel: 'Yes, Make Public',
        confirmBg: 'var(--osmos-brand-primary-bg)',
      },
    };
    const d = dialogContent[visConfirm];
    return (
      <>
        <div style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(0,0,0,0.35)' }} onClick={() => setVisConfirm(null)} />
        <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:61, width:420, background:'var(--bg-screen)', borderRadius:8, border:'1px solid var(--border)', boxShadow:'var(--shadow-card)', overflow:'hidden', display:'flex', flexDirection:'column' }}>
          {/* Header — Osmos modal style: primary-bg fill + close icon */}
          <div style={{ background:'var(--primary-bg)', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {d.icon}
              <span style={{ fontSize:15, fontWeight:700, color:'var(--text-strong)' }}>{d.title}</span>
            </div>
            <button onClick={() => setVisConfirm(null)} style={{ border:'none', background:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:18, lineHeight:1, padding:'2px 4px' }}>×</button>
          </div>
          {/* Body */}
          <div style={{ padding:'20px 20px 16px', fontSize:13, color:'var(--text-muted)', lineHeight:1.7 }}>{d.body}</div>
          {/* Footer */}
          <div style={{ padding:'12px 20px 16px', display:'flex', gap:10, justifyContent:'center' }}>
            <button onClick={() => setVisConfirm(null)}
              style={{ padding:'9px 24px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-screen)', fontSize:13, fontWeight:500, cursor:'pointer', color:'var(--text)', transition:'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--bg-screen)'}>
              Cancel
            </button>
            <button onClick={() => { setVis(visConfirm); setVisConfirm(null); }}
              style={{ padding:'9px 24px', borderRadius:6, border:'none', background:d.confirmBg, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'var(--shadow-button)', transition:'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
              {d.confirmLabel}
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ── COHORT DETAILS tab ── */
  function TabCohortDetails() {
    return (
      <div style={{ padding:'24px 28px 40px' }}>
        <Row label="Source">
          <span style={{ display:'flex', alignItems:'center', gap:8 }}>
            <SourceBadge source={cohort.source==='API'?'API':cohort.source} />
            <span style={{ color:'var(--text-muted)' }}>{cohort.sourceNote}</span>
          </span>
        </Row>
        <Row label="Type"><TypeBadge type={cohort.type} /></Row>
        <Row label="Definition">{cohort.description}</Row>
        <Row label="Created">{cohort.created}</Row>
        <Row label="Last refresh">
          <span style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--osmos-brand-green)', display:'inline-block', flexShrink:0 }} />
            {cohort.lastRefresh}
            <span style={{ color:'var(--text-muted)' }}>· {cohort.refreshNote}</span>
          </span>
        </Row>
        <Row label="Visibility"><VisibilityPill vis={cohort.visibility} /></Row>
        <Row label="Audience ID"><span style={{ fontFamily:'monospace', fontSize:12, color:'var(--text-muted)' }}>{cohort.audienceId}</span></Row>
        <div style={{ display:'flex', alignItems:'flex-start', padding:'11px 0' }}>
          <span style={{ width:140, fontSize:13, color:'var(--text-muted)', fontWeight:400, flexShrink:0, paddingTop:2 }}>Pricing</span>
          <div style={{ flex:1 }}>
            <PricingEditor cpm={localCpm} cpe={localCpe} onSave={(c,e) => { setLocalCpm(c); setLocalCpe(e); }} />
          </div>
        </div>
      </div>
    );
  }

  /* ── MANAGE ACCESS tab ── */
  function TabManageAccess() {
    // Per-advertiser CPM / CPE overrides  { [name]: { cpm: '', cpe: '' } }
    const [advOverrides, setAdvOverrides] = useState({});
    const setOverride = (name, field, val) =>
      setAdvOverrides(prev => ({ ...prev, [name]: { ...prev[name], [field]: val } }));

    return (
      <div style={{ padding:'24px 28px 40px' }}>
        {accessSaved && (
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:8, background:'var(--alert-success-bg)', border:'1px solid var(--alert-success-darker)', marginBottom:20, fontSize:13, color:'var(--alert-success-primary)', fontWeight:500 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Access settings saved successfully.
          </div>
        )}

        {/* Visibility */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>
            Visibility <span style={{ color:'var(--alert-error-primary)' }}>*</span>
          </div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Control who can see and use this cohort.</div>
          <div style={{ display:'flex', gap:12 }}>
            <VisCard id="Private" label="Private" desc="Only you can use this cohort" />
            <VisCard id="Shared"  label="Shared"  desc="Selected advertisers can use this" />
            <VisCard id="Public"  label="Public"  desc="All advertisers on the platform" />
          </div>
          {/* Private banner stays under radio cards */}
          {vis === 'Private' && <VisBanner />}
        </div>

        {/* Available Channels — hidden when Private */}
        {vis !== 'Private' && <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>
            Available Channels <span style={{ color:'var(--alert-error-primary)' }}>*</span>
          </div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Select channels where this cohort will be available.</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {ALL_CHANNELS.map(ch => <ChannelCard key={ch} ch={ch} />)}
          </div>
          {/* Public Access banner — below channels */}
          {vis === 'Public' && <VisBanner />}
        </div>}

        {/* Assign Advertisers — only when Shared */}
        {vis === 'Shared' && (
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>
              Assign Advertisers <span style={{ color:'var(--alert-error-primary)' }}>*</span>
            </div>
            <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Select advertisers who can access this audience cohort.</div>
            <div style={{ borderRadius:8, border:'1px solid var(--border-table)', overflow:'hidden' }}>
              {/* Header */}
              <div style={{ display:'grid', gridTemplateColumns:'44px 1fr 160px 130px 130px', background:'var(--surface-1)', borderBottom:'1px solid var(--border-table)', padding:'10px 16px', alignItems:'center' }}>
                <div>
                  <input type="checkbox"
                    checked={ALL_ADVERTISERS.every(a => selAdvs.has(a.name))}
                    onChange={e => setSelAdvs(e.target.checked ? new Set(ALL_ADVERTISERS.map(a=>a.name)) : new Set())}
                    style={{ cursor:'pointer', accentColor:'var(--osmos-brand-primary-bg)' }} />
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>Advertiser</div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>Category</div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>
                  CPM Override
                  <div style={{ fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:1 }}>per 1K impressions</div>
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>
                  CPE Override
                  <div style={{ fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:1 }}>cost per 1000 entries</div>
                </div>
              </div>

              {/* Rows */}
              {[...ALL_ADVERTISERS].sort((a,b) => {
                const ac = selAdvs.has(a.name), bc = selAdvs.has(b.name);
                return ac === bc ? 0 : ac ? -1 : 1;
              }).map((adv, i, arr) => {
                const chk = selAdvs.has(adv.name);
                const ov  = advOverrides[adv.name] || {};
                return (
                  <div key={adv.name}
                    style={{ display:'grid', gridTemplateColumns:'44px 1fr 160px 130px 130px', padding:'10px 16px', borderBottom: i < arr.length-1 ? '1px solid var(--border-table)' : 'none', background: chk ? 'var(--primary-bg)' : 'var(--bg-screen)', transition:'background 0.12s', alignItems:'center' }}
                    onMouseEnter={e => { if (!chk) e.currentTarget.style.background='var(--surface-1)'; }}
                    onMouseLeave={e => { if (!chk) e.currentTarget.style.background='var(--bg-screen)'; }}>

                    {/* Checkbox */}
                    <div onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={chk} onChange={() => toggleAdv(adv.name)} style={{ cursor:'pointer', accentColor:'var(--osmos-brand-primary-bg)' }} />
                    </div>

                    {/* Name — clicking row still toggles */}
                    <div onClick={() => toggleAdv(adv.name)} style={{ fontSize:13, color:'var(--text)', fontWeight: chk ? 600 : 400, cursor:'pointer' }}>{adv.name}</div>

                    {/* Category */}
                    <div onClick={() => toggleAdv(adv.name)} style={{ fontSize:13, color:'var(--text-muted)', cursor:'pointer' }}>{adv.category}</div>

                    {/* CPM override input */}
                    <div onClick={e => e.stopPropagation()}>
                      <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                        <span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span>
                        <input
                          type="number" min="0" step="0.01"
                          value={ov.cpm ?? ''}
                          onChange={e => setOverride(adv.name, 'cpm', e.target.value)}
                          placeholder={adv.defaultCpm}
                          disabled={!chk}
                          style={{
                            width:'100%', padding:'5px 8px 5px 18px',
                            fontSize:13, borderRadius:6,
                            border:'1px solid var(--border)',
                            background: chk ? 'var(--bg-screen)' : 'var(--surface-1)',
                            color:'var(--text)',
                            outline:'none',
                            opacity: chk ? 1 : 0.45,
                            cursor: chk ? 'text' : 'not-allowed',
                          }}
                          onFocus={e => e.target.style.borderColor='var(--osmos-brand-primary-bg)'}
                          onBlur={e => e.target.style.borderColor='var(--border)'}
                        />
                      </div>
                    </div>

                    {/* CPE override input */}
                    <div onClick={e => e.stopPropagation()}>
                      <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                        <span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span>
                        <input
                          type="number" min="0" step="0.01"
                          value={ov.cpe ?? ''}
                          onChange={e => setOverride(adv.name, 'cpe', e.target.value)}
                          placeholder={adv.defaultCpe}
                          disabled={!chk}
                          style={{
                            width:'100%', padding:'5px 8px 5px 18px',
                            fontSize:13, borderRadius:6,
                            border:'1px solid var(--border)',
                            background: chk ? 'var(--bg-screen)' : 'var(--surface-1)',
                            color:'var(--text)',
                            outline:'none',
                            opacity: chk ? 1 : 0.45,
                            cursor: chk ? 'text' : 'not-allowed',
                          }}
                          onFocus={e => e.target.style.borderColor='var(--osmos-brand-primary-bg)'}
                          onBlur={e => e.target.style.borderColor='var(--border)'}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── ACTIVATION tab ── */
  function TabActivation() {
    return (
      <div style={{ padding:'24px 28px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:28 }}>

          {/* Impression activity */}
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)' }}>Impression activity</span>
              <span style={{ fontSize:11, fontWeight:400, color:'var(--text-muted)' }}>Last 14 days</span>
            </div>
            <div style={{ borderRadius:8, padding:'14px', border:'1px solid var(--border)', background:'var(--bg-screen)' }}>
              {Object.entries(cohort.heatmap).map(([ch,vals]) => <HeatmapRow key={ch} label={ch} values={vals} />)}
              <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:10, fontSize:10, fontWeight:400, color:'var(--text-muted)', justifyContent:'flex-end' }}>
                <span>Low</span>
                {[0.15,0.35,0.55,0.75,1].map((o,i) => <div key={i} style={{ width:10, height:10, borderRadius:2, background:'var(--primary)', opacity:o }} />)}
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Spend by channel */}
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)' }}>Spend by channel</span>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--osmos-brand-green)' }}>{cohort.spend30d}</span>
            </div>
            <div style={{ borderRadius:8, padding:'14px', border:'1px solid var(--border)', background:'var(--bg-screen)', display:'flex', flexDirection:'column', gap:14 }}>
              {cohort.spendByChannel.map(s => (
                <div key={s.ch}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[s.ch]}</span>
                    <span style={{ fontSize:13, fontWeight:400, color:'var(--text)', flex:1 }}>{s.ch}</span>
                    <span style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{s.amount}</span>
                    <span style={{ fontSize:12, fontWeight:400, color:'var(--text-muted)', minWidth:32, textAlign:'right' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height:4, borderRadius:4, background:'var(--border)' }}>
                    <div style={{ width:`${s.pct}%`, height:'100%', borderRadius:4, background:s.color, transition:'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaigns table */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)' }}>Campaigns activating this audience</div>
          <span style={{ fontSize:11, color:'var(--text-muted)' }}>{cohort.campaignDetails?.length || 0} campaigns</span>
        </div>
        <div style={{ borderRadius:8, border:'1px solid var(--border-table)', overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'var(--surface-1)' }}>
                {['STATUS','CAMPAIGN','ADVERTISER','CHANNEL','SPEND · 30D'].map(h => (
                  <th key={h} style={{ padding:'6px 8px', textAlign:'left', fontSize:9, fontWeight:700, color:'var(--text-info)', letterSpacing:'0.06em', textTransform:'uppercase', borderBottom:'1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(cohort.campaignDetails || []).map((c, i) => (
                <tr key={c.name} style={{ borderBottom: i < (cohort.campaignDetails.length-1) ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding:'8px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background: c.status==='Active' ? 'var(--alert-success-primary)' : 'var(--text-info)' }} />
                      <span style={{ fontSize:11, color: c.status==='Active' ? 'var(--alert-success-darker)' : 'var(--text-muted)' }}>{c.status}</span>
                    </span>
                  </td>
                  <td style={{ padding:'8px', fontWeight:500, color:'var(--text)', fontSize:12 }}>{c.name}</td>
                  <td style={{ padding:'8px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:20, height:20, borderRadius:'50%', background:c.color, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff', flexShrink:0 }}>{c.initials}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>{c.advertiser}</span>
                    </span>
                  </td>
                  <td style={{ padding:'8px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                      <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[c.channel]||null}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>{c.channel}</span>
                    </span>
                  </td>
                  <td style={{ padding:'8px', fontWeight:600, color:'var(--alert-success-primary)', fontSize:12 }}>{c.spend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const TABS = [
    { id:'cohort-details', label:'Cohort Details' },
    { id:'manage-access',  label:'Manage Access'  },
    { id:'activation',     label:'Activation'     },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:48, background:'rgba(0,0,0,0.35)' }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:860, background:'var(--bg-screen)', boxShadow:'-4px 0 40px rgba(0,0,0,0.14)', zIndex:50, display:'flex', flexDirection:'column', animation:'fadeIn 0.18s ease' }}
        role="dialog" aria-modal="true" aria-label={`Review: ${cohort.name}`}>

        {loading ? <DrawerSkeleton /> : (
          <>
            {/* ── HEADER — bg-subtle, title + AI icon + close ── */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid var(--border)', flexShrink:0, background:'var(--primary-bg)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:16, fontWeight:700, color:'var(--text-strong)' }}>{cohort.name}</span>
              </div>
              <button onClick={onClose} aria-label="Close"
                style={{ width:32, height:32, borderRadius:8, border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', fontSize:22, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, lineHeight:1 }}>
                ×
              </button>
            </div>

            {/* ── Scrollable body — stat cards + tabs + content ── */}
            <div style={{ flex:1, overflowY:'auto', background:'var(--bg-screen)' }}>

              {/* Stat cards row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, padding:'20px 24px 0' }}>
                {[
                  { label:'Audience Size', value: cohort.size,    sub:'profiles' },
                  { label:'30-day Spend',  value: cohort.spend30d, sub:`across ${cohort.activatedChannels} channels` },
                  { label:'Advertisers',   value:`${cohort.activatedAdvertisers} of ${cohort.advertisers}`, sub:'with access activated' },
                ].map(s => (
                  <div key={s.label} style={{ borderRadius:10, padding:'14px 16px', border:'1px solid var(--border)', background:'var(--surface-1)' }}>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6, fontWeight:500 }}>{s.label}</div>
                    <div style={{ fontSize:22, fontWeight:700, color:'var(--text)', lineHeight:1, marginBottom:4 }}>{s.value}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.4 }}>{s.sub}</div>
                  </div>
                ))}

                {/* Channels card — separate for usage indicator */}
                <div style={{ borderRadius:10, padding:'14px 16px', border:'1px solid var(--border)', background:'var(--surface-1)' }}>
                  <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6, fontWeight:500 }}>Channels</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:4, lineHeight:1 }}>
                    <span style={{ fontSize:22, fontWeight:700, color:'var(--text)' }}>{cohort.activatedChannels}</span>
                    <span style={{ fontSize:22, fontWeight:700, color:'var(--text)' }}>of {cohort.channels.length}</span>
                  </div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.4 }}>{cohort.activatedChannelNames||'—'}</div>
                </div>
              </div>

              {/* Tab bar — pill style, 20px from stat cards above */}
              <div style={{ padding:'20px 24px 0' }}>
                <div style={{ display:'inline-flex', alignItems:'center', background:'var(--primary-bg)', borderRadius:10, padding:4, gap:2 }}>
                  {TABS.map(t => {
                    const active = activeTab === t.id;
                    return (
                      <button key={t.id} onClick={() => setActiveTab(t.id)}
                        style={{ padding:'7px 18px', borderRadius:8, border:'none', cursor:'pointer', fontSize:13, fontWeight: active ? 600 : 400, color: active ? 'var(--text-strong)' : 'var(--text-muted)', background: active ? 'var(--bg-screen)' : 'transparent', boxShadow: active ? 'var(--shadow-sm)' : 'none', transition:'all 0.15s', whiteSpace:'nowrap' }}>
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab content — 20px from tabs above */}
              <div style={{ paddingTop:20 }}>
                {activeTab === 'cohort-details' && <TabCohortDetails />}
                {activeTab === 'manage-access'  && <TabManageAccess />}
                {activeTab === 'activation'     && <TabActivation />}
              </div>
            </div>

            {/* ── FOOTER ── */}
            <div style={{ padding:'16px 24px', borderTop:'1px solid var(--border)', background:'var(--primary-bg)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              {/* Primary — Save */}
              <button onClick={saveAccess}
                style={{ padding:'9px 28px', borderRadius:6, border:'none', background:'var(--primary)', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'var(--shadow-button)', transition:'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                Save
              </button>
            </div>
          </>
        )}
      </div>

      <VisConfirmDialog />

      {confirm?.type === 'deactivate' && (
        <ConfirmDialog title="Deactivate this cohort?"
          body={`This cohort is used in ${cohort.campaigns} running campaign${cohort.campaigns!==1?'s':''}. Deactivating stops new impressions. Can be reversed.`}
          confirmLabel="Deactivate cohort" confirmColor="var(--osmos-brand-amber)"
          onConfirm={confirmDeactivate} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.type === 'delete' && (
        <ConfirmDialog title={`Delete "${cohort.name}"?`}
          body={`Permanently removes the cohort and unlinks it from ${cohort.campaigns} campaign${cohort.campaigns!==1?'s':''}. Cannot be undone.`}
          confirmLabel="Delete permanently" confirmColor="var(--alert-error-primary)"
          onConfirm={() => { setConfirm(null); onClose(); }} onCancel={() => setConfirm(null)} />
      )}
    </>
  );
}

/* ─── Create Cohort — constants & sub-components ────────────────── */
const CC_AUDIENCE_LIST = [
  { name:'High Value Customers Q4 2025', desc:'Top spenders Oct–Dec 2025',        size:'320K' },
  { name:'New Customers – Jan 2026',     desc:'First-time buyers in January',      size:'98K'  },
  { name:'Seasonal Buyers – Festive',    desc:'Active during festive season',      size:'540K' },
  { name:'Lapsed 90-Day Buyers',         desc:'No purchase in last 90 days',       size:'210K' },
  { name:'App-Only Shoppers',            desc:'Purchased only via mobile app',     size:'185K' },
  { name:'Beauty & Skincare Segment',    desc:'Category affinity > 70%',           size:'430K' },
];
const CC_ADVERTISERS = [
  { id:'a1', name:'Colorbar',        type:'Cosmetics',     defaultCpm:'2.50', defaultCpe:'0.40' },
  { id:'a2', name:'Sugar Cosmetics', type:'Cosmetics',     defaultCpm:'2.20', defaultCpe:'0.35' },
  { id:'a3', name:'MamaEarth',       type:'Personal Care', defaultCpm:'3.00', defaultCpe:'0.50' },
  { id:'a4', name:'Himalaya',        type:'Personal Care', defaultCpm:'2.75', defaultCpe:'0.45' },
  { id:'a5', name:'Nykaa',           type:'Beauty',        defaultCpm:'4.00', defaultCpe:'0.60' },
  { id:'a6', name:'Renee Cosmetics', type:'Cosmetics',     defaultCpm:'1.80', defaultCpe:'0.30' },
  { id:'a7', name:'Gold Merchant',   type:'Retail',        defaultCpm:'1.50', defaultCpe:'0.25' },
  { id:'a8', name:'Baby Hug',        type:'Baby',          defaultCpm:'2.00', defaultCpe:'0.40' },
];
const CC_CHANNELS     = ['google','meta','tiktok','dv360','product-ads','display-ads'];
const CC_CH_NAMES     = { google:'Google', meta:'Meta', tiktok:'TikTok', dv360:'DV360', 'product-ads':'Product Ads', 'display-ads':'Display Ads' };
const CC_PLATFORMS    = [
  { id:'google', label:'Google', ph:'e.g. 123456789/customer_list' },
  { id:'meta',   label:'Meta',   ph:'e.g. act_123456789/custom_audience/987654321' },
  { id:'tiktok', label:'TikTok', ph:'e.g. 7234567890123456789' },
  { id:'dv360',  label:'DV360',  ph:'e.g. firstpartyandpartneraudiences/123456789' },
];

function CCReq({ off=false }) {
  return <span style={{ color: off ? '#CCCCCC' : 'var(--alert-error-primary)', marginLeft:2 }}>*</span>;
}

function CCOptionCard({ active, label, desc, icon, onClick, compact=false }) {
  return (
    <button type="button" onClick={onClick} style={{
      position:'relative', padding: compact ? '14px 14px 14px 40px' : '16px 16px 16px 44px',
      borderRadius:'var(--radius-lg)', border:`1.5px solid ${active?'var(--primary)':'var(--border)'}`,
      background: active ? 'var(--primary-bg)' : 'var(--surface-3)',
      cursor:'pointer', textAlign:'left', transition:'all 0.15s', width:'100%',
    }}>
      <span style={{ position:'absolute', left:compact?14:16, top:compact?17:20, width:16, height:16, borderRadius:'50%', border:`1.5px solid ${active?'var(--primary)':'var(--border)'}`, background:'var(--surface-3)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
        {active && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary)' }} />}
      </span>
      {icon && (
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <div style={{ width:28, height:28, borderRadius:'var(--radius-md)', background: active?'var(--primary)':'var(--surface-2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active?'var(--surface-3)':'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
          </div>
          <span style={{ fontSize:13, fontWeight:600, color: active?'var(--primary)':'var(--text)' }}>{label}</span>
        </div>
      )}
      {!icon && <div style={{ fontSize:13, fontWeight:600, color: active?'var(--primary)':'var(--text)', marginBottom: desc?4:0 }}>{label}</div>}
      {desc && <p style={{ margin:0, fontSize:11, color:'var(--text-muted)', lineHeight:1.4 }}>{desc}</p>}
    </button>
  );
}

function CCStepBar({ current }) {
  const steps = ['Cohort Details','Manage Access'];
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:28, padding:'14px 28px 0', borderBottom:'1px solid var(--border)', background:'var(--surface-3)', flexShrink:0 }}>
      {steps.map((label, i) => {
        const n=i+1, done=n<current, active=n===current;
        return (
          <div key={n} style={{ display:'inline-flex', alignItems:'center', gap:10, height:40, padding:'0 18px 0 8px', borderTopLeftRadius:'var(--radius-md)', borderTopRightRadius:'var(--radius-md)', background:active?'var(--primary-bg)':'transparent', transition:'background 0.15s' }}>
            <div style={{ width:22, height:22, borderRadius:'50%', border:`1.5px solid ${active?'var(--primary)':done?'var(--alert-success-primary)':'var(--border)'}`, background:active?'var(--primary)':done?'var(--alert-success-primary)':'var(--surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:(active||done)?'var(--surface-3)':'#5B5F66', flexShrink:0 }}>
              {done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : n}
            </div>
            <span style={{ fontSize:14, fontWeight: active?600:500, color: active?'var(--primary)':done?'var(--alert-success-primary)':'var(--text-muted)', letterSpacing:'-0.005em' }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function CCConfirm({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:1100, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:400, background:'var(--surface-3)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-card)', padding:'20px 22px' }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:16 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--alert-warning-bg)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--alert-warning-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text-strong)', marginBottom:6 }}>{title}</div>
            <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.5 }}>{message}</div>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button onClick={onCancel} style={{ height:34, padding:'0 16px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', fontSize:12, fontWeight:600, color:'var(--text)' }}>Cancel</button>
          <button onClick={onConfirm} style={{ height:34, padding:'0 16px', borderRadius:'var(--radius-md)', border:'none', background:'var(--alert-warning-primary)', cursor:'pointer', fontSize:12, fontWeight:600, color:'#fff' }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Create Cohort Drawer (2-step) ─────────────────────────────── */
function CreateCohortDrawer({ onClose, onCreate }) {
  const [step, setStep]                       = useState(1);
  const [cohortType, setCohortType]           = useState(null);
  const [audienceSrc, setAudienceSrc]         = useState(null);
  const [name, setName]                       = useState('');
  const [desc, setDesc]                       = useState('');
  const [selAudiences, setSelAudiences]       = useState(new Set());
  const [audDropOpen, setAudDropOpen]         = useState(false);
  const [importPlatform, setImportPlatform]   = useState(null);
  const [audienceId, setAudienceId]           = useState('');
  const [createMode, setCreateMode]           = useState(null);
  const [cpmOn, setCpmOn]                     = useState(false);
  const [cpmVal, setCpmVal]                   = useState('');
  const [cpeOn, setCpeOn]                     = useState(false);
  const [cpeVal, setCpeVal]                   = useState('');
  const [confirmDlg, setConfirmDlg]           = useState(null);
  const [visibility, setVisibility]           = useState('private');
  const [selChannels, setSelChannels]         = useState(new Set(CC_CHANNELS));
  const [selAdvertisers, setSelAdvertisers]   = useState(new Set());
  const [advOverrides, setAdvOverrides]       = useState({});
  const setOverride = (id, field, val) =>
    setAdvOverrides(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }));

  function sizeToNum(s) { const n=parseFloat(s); return s.endsWith('M')?n*1e6:s.endsWith('K')?n*1e3:n; }
  function fmtSize(n)   { return n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(0)}K`:String(n); }
  const combinedSize = CC_AUDIENCE_LIST.filter(a=>selAudiences.has(a.name)).reduce((s,a)=>s+sizeToNum(a.size),0);

  function toggleAudience(n) { const s=new Set(selAudiences); s.has(n)?s.delete(n):s.add(n); setSelAudiences(s); }
  function toggleChannel(c)  { const s=new Set(selChannels);  s.has(c)?s.delete(c):s.add(c); setSelChannels(s); }
  function toggleAdv(id)     { const s=new Set(selAdvertisers); s.has(id)?s.delete(id):s.add(id); setSelAdvertisers(s); }

  function hasData() { return name.trim()||desc.trim()||selAudiences.size||audienceSrc||audienceId.trim()||cpmOn||cpeOn; }

  function switchType(t) {
    if (t===cohortType) return;
    if (!cohortType||!hasData()) { setCohortType(t); setAudienceSrc(null); setImportPlatform(null); setAudienceId(''); setSelAudiences(new Set()); return; }
    setConfirmDlg({ title:'Change cohort type?', message:'Switching will clear all entered details. This cannot be undone.', confirmLabel:'Yes, change', onConfirm:()=>{ setCohortType(t); setAudienceSrc(null); setImportPlatform(null); setAudienceId(''); setSelAudiences(new Set()); setName(''); setDesc(''); setCpmOn(false); setCpeOn(false); setCpmVal(''); setCpeVal(''); setConfirmDlg(null); }});
  }
  function switchVis(v) {
    if (v===visibility) return;
    const hasVisData = visibility!=='private' && (selChannels.size!==6||selAdvertisers.size>0);
    if (!hasVisData) { setVisibility(v); return; }
    setConfirmDlg({ title:'Change visibility?', message:'Switching will reset selected channels and advertisers.', confirmLabel:'Yes, change', onConfirm:()=>{ setVisibility(v); setSelChannels(new Set(CC_CHANNELS)); setSelAdvertisers(new Set()); setConfirmDlg(null); }});
  }

  const srcOk = cohortType==='my-cohort'
    ? audienceSrc==='pre-created' ? selAudiences.size>0 : audienceSrc==='upload-csv'||audienceSrc==='create-new'
    : cohortType==='import-by-id' ? !!importPlatform && audienceId.trim().length>0 : false;
  const feeOk = (cpmOn||cpeOn) && (!cpmOn||cpmVal.trim()) && (!cpeOn||cpeVal.trim());
  const step1Valid = !!cohortType && name.trim().length>0 && srcOk && feeOk;
  const step2Valid = visibility==='private' ? true : visibility==='shared' ? selChannels.size>0&&selAdvertisers.size>0 : selChannels.size>0;

  const showFee = (cohortType==='my-cohort' && audienceSrc) || cohortType==='import-by-id';

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:999 }} />
      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:'var(--drawer-sm)', background:'var(--surface-3)', boxShadow:'var(--shadow-card)', zIndex:1000, display:'flex', flexDirection:'column', fontFamily:"'Open Sans',sans-serif" }} role="dialog" aria-label="Create new cohort">

        {/* Header */}
        <div style={{ padding:'20px 28px', borderBottom:'1px solid var(--border)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--primary-bg)' }}>
          <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:'var(--text)' }}>Create New Cohort</h2>
          <button onClick={onClose} aria-label="Close" style={{ width:30, height:30, borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <CCStepBar current={step} />

        {/* Scrollable body */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px' }}>

          {/* ── STEP 1 ── */}
          {step===1 && (<>
            {/* Cohort Type */}
            <div style={{ marginBottom:28 }}>
              <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Cohort Type<CCReq /></label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <CCOptionCard active={cohortType==='my-cohort'} label="My Cohort" desc="Create by Pre-created audience, CSV upload or by New Audience"
                  icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                  onClick={()=>switchType('my-cohort')} />
                <CCOptionCard active={cohortType==='import-by-id'} label="Import by ID" desc="Import existing audience from Meta, Google etc."
                  icon={<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>}
                  onClick={()=>switchType('import-by-id')} />
              </div>
            </div>

            {cohortType && (<>
              {/* Name */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Cohort Name<CCReq /></label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. High-Value Shoppers"
                  style={{ width:316, height:40, padding:'0 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', fontSize:13, color:'var(--text)', outline:'none', boxSizing:'border-box' }} />
              </div>
              {/* Description */}
              <div style={{ marginBottom:28 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Description</label>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="e.g. Customers with 3+ purchases in last 90 days" rows={3}
                  style={{ width:316, padding:'10px 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', fontSize:13, color:'var(--text)', outline:'none', resize:'vertical', boxSizing:'border-box', lineHeight:1.5, fontFamily:'inherit' }} />
              </div>

              {/* ── My Cohort: Audience Source ── */}
              {cohortType==='my-cohort' && (
                <div style={{ marginBottom:24 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Audience Source<CCReq /></label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                    <CCOptionCard compact active={audienceSrc==='pre-created'} label="Pre-created Audience" desc="Select from existing segments"
                      icon={<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>}
                      onClick={()=>setAudienceSrc('pre-created')} />
                    <CCOptionCard compact active={audienceSrc==='upload-csv'} label="Upload CSV" desc="Audience IDs via file"
                      icon={<><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>}
                      onClick={()=>setAudienceSrc('upload-csv')} />
                    <CCOptionCard compact active={audienceSrc==='create-new'} label="Create New Audience" desc="Build from scratch"
                      icon={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>}
                      onClick={()=>setAudienceSrc('create-new')} />
                  </div>

                  {/* Pre-created dropdown */}
                  {audienceSrc==='pre-created' && (
                    <div style={{ marginTop:16, display:'flex', alignItems:'flex-end', gap:10 }}>
                      <div style={{ position:'relative', width:316 }}>
                        <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Select Audience List<CCReq /></label>
                        <button type="button" onClick={()=>setAudDropOpen(v=>!v)} onBlur={()=>setTimeout(()=>setAudDropOpen(false),180)}
                          style={{ width:'100%', height:40, padding:'0 14px', display:'flex', alignItems:'center', justifyContent:'space-between', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', fontSize:13, color: selAudiences.size?'var(--text-strong)':'#CCCCCC' }}>
                          <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {selAudiences.size===0?'Choose an audience list…':selAudiences.size===1?Array.from(selAudiences)[0]:`${selAudiences.size} audiences selected`}
                          </span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color:'var(--text-muted)', transform:audDropOpen?'rotate(180deg)':'none', transition:'transform 0.15s', flexShrink:0, marginLeft:8 }}><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        {audDropOpen && (
                          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, width:316, background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-card)', zIndex:200, padding:'6px 0', maxHeight:320, overflowY:'auto' }}>
                            {CC_AUDIENCE_LIST.map(a => {
                              const sel=selAudiences.has(a.name);
                              return (
                                <div key={a.name} onMouseDown={e=>{e.preventDefault();toggleAudience(a.name);}}
                                  style={{ padding:'10px 14px', display:'flex', alignItems:'flex-start', gap:12, cursor:'pointer' }}
                                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-1)'}
                                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                  <div style={{ width:18, height:18, borderRadius:'var(--radius-sm)', border:`1.5px solid ${sel?'var(--primary)':'var(--border)'}`, background:sel?'var(--primary)':'var(--surface-3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                                    {sel && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--surface-3)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                                  </div>
                                  <div style={{ flex:1, minWidth:0 }}>
                                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', lineHeight:1.3 }}>{a.name}</div>
                                    <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2, fontStyle:'italic' }}>{a.desc}</div>
                                  </div>
                                  <div style={{ fontSize:12, color:'var(--text-muted)', flexShrink:0 }}>{a.size}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div style={{ width:316, height:40, padding:'0 14px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>Audience size</span>
                        <span style={{ fontSize:14, fontWeight:700, color: selAudiences.size?'var(--text-strong)':'var(--text-info)' }}>
                          {selAudiences.size ? fmtSize(combinedSize) : '—'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Upload CSV */}
                  {audienceSrc==='upload-csv' && (
                    <div style={{ marginTop:16, padding:20, borderRadius:'var(--radius-md)', border:'1.5px dashed var(--border)', textAlign:'center', background:'var(--surface-1)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6" style={{ marginBottom:8 }}>
                        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                      </svg>
                      <div style={{ fontSize:12, color:'var(--text)', fontWeight:600 }}>Drop a CSV here or <span style={{ color:'var(--primary)', cursor:'pointer' }}>browse</span></div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>Max 50MB · Columns: audience_id, channel</div>
                    </div>
                  )}

                  {/* Create New */}
                  {audienceSrc==='create-new' && (
                    <div style={{ marginTop:20, padding:'20px 22px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)' }}>
                      <h3 style={{ margin:'0 0 16px', fontSize:12, fontWeight:700, color:'var(--text-strong)' }}>Create Audience</h3>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                        {[{id:'attribute',label:'By Attribute'},{id:'activity',label:'By User Activity'}].map(m=>{
                          const a=createMode===m.id;
                          return (
                            <button key={m.id} type="button" onClick={()=>setCreateMode(m.id)} style={{ height:56, padding:'0 18px', borderRadius:'var(--radius-md)', border:`1.5px solid ${a?'var(--primary)':'var(--border)'}`, background:a?'var(--primary-bg)':'var(--surface-3)', cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
                              <span style={{ width:20, height:20, borderRadius:'50%', border:`1.5px solid ${a?'var(--primary)':'var(--border)'}`, background:'var(--surface-3)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                {a && <span style={{ width:10, height:10, borderRadius:'50%', background:'var(--primary)' }} />}
                              </span>
                              <span style={{ fontSize:14, fontWeight:600, color:a?'var(--primary)':'var(--text)' }}>{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {createMode && (
                        <div style={{ fontSize:12, color:'var(--text-muted)', padding:'12px 14px', borderRadius:'var(--radius-md)', background:'var(--surface-3)', border:'1px dashed var(--border)' }}>
                          {createMode==='attribute' ? 'Attribute rule builder — select user attributes, operators, and values to filter your audience.' : 'Activity rule builder — filter by user events, product categories, and brands.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── Import by ID ── */}
              {cohortType==='import-by-id' && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <label style={{ fontSize:13, fontWeight:700, color:'var(--text-strong)' }}>Source Platform<CCReq /></label>
                  </div>
                  <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Select the platform where this audience exists</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
                    {CC_PLATFORMS.map(p=>{
                      const a=importPlatform?.id===p.id;
                      return (
                        <button key={p.id} type="button" onClick={()=>setImportPlatform(p)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:'var(--radius-md)', border:`1px solid ${a?'var(--primary)':'var(--border)'}`, background:a?'var(--primary-bg)':'var(--surface-3)', cursor:'pointer', fontSize:13, fontWeight:500, color:'var(--text)', transition:'all 0.15s', textAlign:'left' }}>
                          <span style={{ width:18, height:18, borderRadius:'50%', border:`1.5px solid ${a?'var(--primary)':'var(--border)'}`, background:'var(--surface-3)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            {a && <span style={{ width:9, height:9, borderRadius:'50%', background:'var(--primary)' }} />}
                          </span>
                          {CHANNEL_ICONS[p.id] || null}
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <label style={{ fontSize:13, fontWeight:700, color:'var(--text-strong)' }}>Audience ID<CCReq /></label>
                  </div>
                  <p style={{ margin:'0 0 8px', fontSize:11, color:'var(--text-muted)' }}>Enter the audience ID{importPlatform?` from ${importPlatform.label}`:''}</p>
                  <input value={audienceId} onChange={e=>setAudienceId(e.target.value)} disabled={!importPlatform}
                    placeholder={importPlatform?importPlatform.ph:'Select a source platform first'}
                    style={{ width:316, height:40, padding:'0 14px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:importPlatform?'var(--surface-3)':'var(--surface-1)', fontSize:13, color:importPlatform?'var(--text)':'#CCCCCC', outline:'none', boxSizing:'border-box', cursor:importPlatform?'text':'not-allowed' }} />
                </div>
              )}

              {/* ── Audience Fee ── */}
              {showFee && (
                <div style={{ marginTop:28 }}>
                  <label style={{ fontSize:13, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Audience Fee<CCReq /></label>
                  <p style={{ margin:'0 0 14px', fontSize:11, color:'var(--text-muted)' }}>Choose how this cohort is priced. You can charge by impressions, audience size, or both.</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    {[
                      { on:cpmOn, setOn:setCpmOn, title:'By Impressions',   sub:'$ CPM — fee per 1,000 impressions',   val:cpmVal, setVal:setCpmVal, suffix:'CPM', ph:'e.g. 2.50', lbl:'CPM Rate' },
                      { on:cpeOn, setOn:setCpeOn, title:'By Audience Size', sub:'$ per 1,000 active audience',          val:cpeVal, setVal:setCpeVal, suffix:'CPE', ph:'e.g. 0.50', lbl:'Cost per Thousand Entries (CPE)' },
                    ].map(fee=>(
                      <div key={fee.suffix} style={{ display:'flex', alignItems:'stretch', gap:16 }}>
                        <button type="button" onClick={()=>fee.setOn(!fee.on)}
                          style={{ width:316, height:66, textAlign:'left', cursor:'pointer', padding:'0 16px', borderRadius:'var(--radius-md)', border:`1.5px solid ${fee.on?'var(--primary)':'var(--border)'}`, background:fee.on?'var(--primary-bg)':'var(--surface-3)', transition:'all 0.15s', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                          <div style={{ width:22, height:22, borderRadius:'var(--radius-sm)', border:`1.5px solid ${fee.on?'var(--primary)':'var(--border)'}`, background:fee.on?'var(--primary)':'var(--surface-3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            {fee.on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--surface-3)" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </div>
                          <div>
                            <div style={{ fontSize:14, fontWeight:700, color:fee.on?'var(--primary)':'var(--text)' }}>{fee.title}</div>
                            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{fee.sub}</div>
                          </div>
                        </button>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          <label style={{ fontSize:12, fontWeight:600, color:fee.on?'var(--text)':'#CCCCCC' }}>{fee.lbl}<CCReq off={!fee.on} /></label>
                          <div style={{ position:'relative', width:316 }}>
                            <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:13, fontWeight:600, color:fee.on?'var(--text)':'#CCCCCC', pointerEvents:'none' }}>$</span>
                            <input value={fee.val} disabled={!fee.on} onChange={e=>fee.setVal(e.target.value)} placeholder={fee.ph}
                              style={{ width:'100%', height:40, paddingLeft:26, paddingRight:12, borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:fee.on?'var(--surface-3)':'var(--surface-1)', fontSize:13, color:fee.on?'var(--text)':'#CCCCCC', outline:'none', boxSizing:'border-box', cursor:fee.on?'text':'not-allowed' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>)}
          </>)}

          {/* ── STEP 2 ── */}
          {step===2 && (<>
            {/* Visibility */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Visibility<CCReq /></label>
              <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Control who can see and use this cohort.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                <CCOptionCard compact active={visibility==='private'} label="Private" desc="Only you can use this cohort"       onClick={()=>switchVis('private')} />
                <CCOptionCard compact active={visibility==='shared'}  label="Shared"  desc="Selected advertisers can use this"  onClick={()=>switchVis('shared')} />
                <CCOptionCard compact active={visibility==='public'}  label="Public"  desc="All advertisers on the platform"    onClick={()=>switchVis('public')} />
              </div>
            </div>

            {/* Private info box */}
            {visibility==='private' && (
              <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', borderRadius:'var(--radius-md)', border:'1px solid var(--primary-tint-1)', background:'var(--primary-bg)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0, marginTop:1 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text-strong)', marginBottom:4 }}>This cohort will be Private</div>
                  <ul style={{ margin:0, paddingLeft:16, fontSize:12, color:'var(--text-muted)', lineHeight:1.6 }}>
                    <li>Only you can see and use this cohort across campaigns.</li>
                    <li>It will not appear in the shared catalog for other advertisers.</li>
                    <li>You can change visibility to Shared or Public later from the cohort detail.</li>
                    <li>No advertiser or channel activation is required at creation time.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Shared: channels + advertisers */}
            {visibility==='shared' && (<>
              <div style={{ marginBottom:24 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Available Channels<CCReq /></label>
                <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Select channels where this cohort will be available.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
                  {CC_CHANNELS.map(ch=>{
                    const sel=selChannels.has(ch);
                    return (
                      <button key={ch} type="button" onClick={()=>toggleChannel(ch)}
                        style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:'var(--radius-md)', border:`1px solid ${sel?'var(--primary)':'var(--border)'}`, background:sel?'var(--primary-bg)':'var(--surface-3)', cursor:'pointer', fontSize:13, fontWeight:500, color:'var(--text)', transition:'all 0.15s', textAlign:'left' }}>
                        <span style={{ width:18, height:18, borderRadius:'var(--radius-sm)', border:`1.5px solid ${sel?'var(--primary)':'var(--border)'}`, background:sel?'var(--primary)':'var(--surface-3)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {sel && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--surface-3)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        </span>
                        {CHANNEL_ICONS[ch]||null}
                        <span>{CC_CH_NAMES[ch]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Assign Advertisers<CCReq /></label>
                <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Select advertisers who can access this audience cohort.</p>
                <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ background:'var(--surface-1)' }}>
                        <th style={{ width:40, padding:'10px 12px', textAlign:'left' }}>
                          <input type="checkbox" checked={selAdvertisers.size===CC_ADVERTISERS.length} onChange={e=>setSelAdvertisers(e.target.checked?new Set(CC_ADVERTISERS.map(a=>a.id)):new Set())} style={{ cursor:'pointer' }} />
                        </th>
                        <th style={{ padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'var(--text)', borderBottom:'1px solid var(--border)' }}>Advertiser</th>
                        <th style={{ padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'var(--text)', borderBottom:'1px solid var(--border)' }}>Category</th>
                        <th style={{ padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'var(--text)', borderBottom:'1px solid var(--border)', width:130 }}>
                          CPM Override
                          <div style={{ fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:1 }}>per 1K impressions</div>
                        </th>
                        <th style={{ padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'var(--text)', borderBottom:'1px solid var(--border)', width:130 }}>
                          CPE Override
                          <div style={{ fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:1 }}>cost per 1000 entries</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CC_ADVERTISERS.map((adv,i)=>{
                        const sel = selAdvertisers.has(adv.id);
                        const ov  = advOverrides[adv.id] || {};
                        return (
                          <tr key={adv.id} style={{ background:sel?'var(--primary-bg)':'var(--surface-3)', borderBottom:i<CC_ADVERTISERS.length-1?'1px solid var(--border)':'none' }}>
                            <td style={{ padding:'10px 12px' }} onClick={()=>toggleAdv(adv.id)}>
                              <input type="checkbox" checked={sel} onChange={()=>{}} style={{ cursor:'pointer' }} />
                            </td>
                            <td style={{ padding:'10px 12px', fontSize:13, fontWeight:500, color:'var(--text)', cursor:'pointer' }} onClick={()=>toggleAdv(adv.id)}>{adv.name}</td>
                            <td style={{ padding:'10px 12px', fontSize:12, color:'var(--text-muted)', cursor:'pointer' }} onClick={()=>toggleAdv(adv.id)}>{adv.type}</td>
                            <td style={{ padding:'6px 10px' }} onClick={e=>e.stopPropagation()}>
                              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                                <span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span>
                                <input type="number" min="0" step="0.01"
                                  value={ov.cpm??''} onChange={e=>setOverride(adv.id,'cpm',e.target.value)}
                                  placeholder={adv.defaultCpm} disabled={!sel}
                                  style={{ width:'100%', padding:'5px 8px 5px 18px', fontSize:12, borderRadius:6, border:'1px solid var(--border)', background:sel?'var(--bg-screen)':'var(--surface-1)', color:'var(--text)', outline:'none', opacity:sel?1:0.45, cursor:sel?'text':'not-allowed' }}
                                  onFocus={e=>e.target.style.borderColor='var(--primary)'}
                                  onBlur={e=>e.target.style.borderColor='var(--border)'}
                                />
                              </div>
                            </td>
                            <td style={{ padding:'6px 10px' }} onClick={e=>e.stopPropagation()}>
                              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                                <span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span>
                                <input type="number" min="0" step="0.01"
                                  value={ov.cpe??''} onChange={e=>setOverride(adv.id,'cpe',e.target.value)}
                                  placeholder={adv.defaultCpe} disabled={!sel}
                                  style={{ width:'100%', padding:'5px 8px 5px 18px', fontSize:12, borderRadius:6, border:'1px solid var(--border)', background:sel?'var(--bg-screen)':'var(--surface-1)', color:'var(--text)', outline:'none', opacity:sel?1:0.45, cursor:sel?'text':'not-allowed' }}
                                  onFocus={e=>e.target.style.borderColor='var(--primary)'}
                                  onBlur={e=>e.target.style.borderColor='var(--border)'}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {selAdvertisers.size>0 && <p style={{ margin:'8px 0 0', fontSize:11, color:'var(--text-muted)' }}>{selAdvertisers.size} advertiser{selAdvertisers.size>1?'s':''} selected</p>}
              </div>
            </>)}

            {/* Public: channels + info */}
            {visibility==='public' && (<>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Available Channels<CCReq /></label>
                <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Select channels where this cohort will be available.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
                  {CC_CHANNELS.map(ch=>{
                    const sel=selChannels.has(ch);
                    return (
                      <button key={ch} type="button" onClick={()=>toggleChannel(ch)}
                        style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:'var(--radius-md)', border:`1px solid ${sel?'var(--primary)':'var(--border)'}`, background:sel?'var(--primary-bg)':'var(--surface-3)', cursor:'pointer', fontSize:13, fontWeight:500, color:'var(--text)', transition:'all 0.15s', textAlign:'left' }}>
                        <span style={{ width:18, height:18, borderRadius:'var(--radius-sm)', border:`1.5px solid ${sel?'var(--primary)':'var(--border)'}`, background:sel?'var(--primary)':'var(--surface-3)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {sel && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--surface-3)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        </span>
                        {CHANNEL_ICONS[ch]||null}
                        <span>{CC_CH_NAMES[ch]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ padding:'12px 14px', borderRadius:'var(--radius-md)', border:'1px solid var(--alert-success-lighter)', background:'var(--alert-success-bg)', display:'flex', alignItems:'flex-start', gap:10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--alert-success-primary)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0, marginTop:1 }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--alert-success-primary)', marginBottom:2 }}>Public Access</div>
                  <div style={{ fontSize:12, color:'var(--alert-success-darker)', lineHeight:1.5 }}>This cohort will be visible to all advertisers on the platform. Any advertiser can purchase and use this audience for their campaigns.</div>
                </div>
              </div>
            </>)}
          </>)}
        </div>

        {/* Footer */}
        <div style={{ padding:'16px 28px', borderTop:'1px solid var(--border)', display:'flex', gap:10, justifyContent:'center', alignItems:'center', flexShrink:0, background:'var(--primary-bg)' }}>
          {step===2 && <button type="button" onClick={()=>setStep(1)} style={{ height:36, padding:'0 18px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', fontSize:12, fontWeight:600, color:'var(--text)' }}>Back</button>}
          {step===1
            ? <button type="button" onClick={()=>step1Valid&&setStep(2)} disabled={!step1Valid}
                style={{ height:36, padding:'0 20px', borderRadius:'var(--radius-md)', border:'none', background:step1Valid?'var(--primary)':'var(--primary-tint-1)', cursor:step1Valid?'pointer':'not-allowed', fontSize:12, fontWeight:600, color:'var(--surface-3)' }}>Next →</button>
            : <button type="button" onClick={()=>step2Valid&&onCreate(name.trim())} disabled={!step2Valid}
                style={{ height:36, padding:'0 20px', borderRadius:'var(--radius-md)', border:'none', background:step2Valid?'var(--primary)':'var(--primary-tint-1)', cursor:step2Valid?'pointer':'not-allowed', fontSize:12, fontWeight:600, color:'var(--surface-3)' }}>Create Cohort</button>
          }
        </div>
      </div>

      {confirmDlg && <CCConfirm title={confirmDlg.title} message={confirmDlg.message} confirmLabel={confirmDlg.confirmLabel} onConfirm={confirmDlg.onConfirm} onCancel={()=>setConfirmDlg(null)} />}
    </>
  );
}

/* ─── Edit Cohort Drawer (Option 2 — read-only except Pricing) ──── */
function EditCohortDrawer({ cohort, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [localCpm, setLocalCpm] = useState(cohort.cpm);
  const [localCpe, setLocalCpe] = useState(cohort.cpe);

  /* Manage Access state */
  const [vis,           setVis]           = useState(cohort.visibility);
  const [selChannels,   setSelChannels]   = useState(new Set(cohort.availableChannels));
  const [selAdvs,       setSelAdvs]       = useState(new Set(cohort.sharingAdvertisers));
  const [visConfirm,    setVisConfirm]    = useState(null);
  const [advOverrides,  setAdvOverrides]  = useState({});
  const setOverride = (name, field, val) =>
    setAdvOverrides(prev => ({ ...prev, [name]: { ...prev[name], [field]: val } }));

  function toggleChannel(ch) { setSelChannels(s => { const n = new Set(s); n.has(ch) ? n.delete(ch) : n.add(ch); return n; }); }
  function toggleAdv(adv)    { setSelAdvs(s => { const n = new Set(s); n.has(adv) ? n.delete(adv) : n.add(adv); return n; }); }

  /* ── VisCard ── */
  function VisCard({ id, label, desc }) {
    const active = vis === id;
    return (
      <button onClick={() => { if (!active) setVisConfirm(id); }}
        style={{ flex:1, display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:8, border:`1.5px solid ${active?'var(--primary)':'var(--border)'}`, background:active?'var(--primary-bg)':'var(--bg-screen)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', minWidth:0 }}>
        <span style={{ width:16, height:16, borderRadius:'50%', border:`2px solid ${active?'var(--primary)':'var(--border-strong)'}`, background:active?'var(--primary)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          {active && <span style={{ width:5, height:5, borderRadius:'50%', background:'#fff', display:'block' }} />}
        </span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:active?'var(--primary)':'var(--text)', marginBottom:2 }}>{label}</div>
          <div style={{ fontSize:12, color:'var(--text-muted)' }}>{desc}</div>
        </div>
      </button>
    );
  }

  /* ── ChannelCard ── */
  function ChannelCard({ ch }) {
    const active = selChannels.has(ch);
    return (
      <button onClick={() => toggleChannel(ch)}
        style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:8, border:`1.5px solid ${active?'var(--osmos-brand-primary-bg)':'var(--border)'}`, background:active?'var(--primary-bg)':'var(--bg-screen)', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
        <span style={{ width:18, height:18, borderRadius:4, border:`2px solid ${active?'var(--osmos-brand-primary-bg)':'var(--border-strong)'}`, background:active?'var(--osmos-brand-primary-bg)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          {active && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
        </span>
        <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[ch]||null}</span>
        <span style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{ch}</span>
      </button>
    );
  }

  /* ── VisConfirmDialog ── */
  function VisConfirmDialog() {
    if (!visConfirm) return null;
    const dialogContent = {
      Private: { title:'Make Cohort Private?', body:<span>Making it private will remove all advertiser access.</span>, confirmLabel:'Yes, Make Private', confirmBg:'var(--osmos-brand-primary-bg)' },
      Shared:  { title:'Change to Shared?',    body:'This cohort will be visible only to the advertisers you assign below.', confirmLabel:'Yes, Make Shared', confirmBg:'var(--osmos-brand-primary-bg)' },
      Public:  { title:'Make Cohort Public?',  body:'All advertisers on the platform will be able to see and use this cohort.', confirmLabel:'Yes, Make Public', confirmBg:'var(--osmos-brand-primary-bg)' },
    };
    const d = dialogContent[visConfirm];
    return (
      <>
        <div style={{ position:'fixed', inset:0, zIndex:1060, background:'rgba(0,0,0,0.35)' }} onClick={() => setVisConfirm(null)} />
        <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:1061, width:420, background:'var(--bg-screen)', borderRadius:8, border:'1px solid var(--border)', boxShadow:'var(--shadow-card)', overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ background:'var(--primary-bg)', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontSize:15, fontWeight:700, color:'var(--text-strong)' }}>{d.title}</span>
            <button onClick={() => setVisConfirm(null)} style={{ border:'none', background:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:18, lineHeight:1, padding:'2px 4px' }}>×</button>
          </div>
          <div style={{ padding:'20px 20px 16px', fontSize:13, color:'var(--text-muted)', lineHeight:1.7 }}>{d.body}</div>
          <div style={{ padding:'12px 20px 16px', display:'flex', gap:10, justifyContent:'center' }}>
            <button onClick={() => setVisConfirm(null)} style={{ padding:'9px 24px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-screen)', fontSize:13, fontWeight:500, cursor:'pointer', color:'var(--text)' }} onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'} onMouseLeave={e => e.currentTarget.style.background='var(--bg-screen)'}>Cancel</button>
            <button onClick={() => { setVis(visConfirm); setVisConfirm(null); }} style={{ padding:'9px 24px', borderRadius:6, border:'none', background:d.confirmBg, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'var(--shadow-button)' }} onMouseEnter={e => e.currentTarget.style.opacity='0.88'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>{d.confirmLabel}</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:999 }} />
      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:'var(--drawer-sm)', background:'var(--surface-3)', boxShadow:'var(--shadow-card)', zIndex:1000, display:'flex', flexDirection:'column', fontFamily:"'Open Sans',sans-serif" }} role="dialog" aria-label="Edit cohort">

        {/* Header */}
        <div style={{ padding:'20px 28px', borderBottom:'1px solid var(--border)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--primary-bg)' }}>
          <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:'var(--text)' }}>Edit Cohort</h2>
          <button onClick={onClose} aria-label="Close" style={{ width:30, height:30, borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <CCStepBar current={step} />

        {/* Scrollable body */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px' }}>

          {/* ── STEP 1: Read-only Cohort Details + editable Pricing ── */}
          {step === 1 && (
            <>
              {/* Info banner */}
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--primary-bg)', border:'1px solid var(--primary-tint-1)', borderRadius:'var(--radius-md)', padding:'10px 14px', marginBottom:24, fontSize:12, color:'var(--primary)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                ℹ️ Cohort configuration is read-only. Only pricing can be updated.
              </div>

              {/* Cohort Type — read-only card */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Cohort Type</label>
                <div style={{ position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div style={{ padding:'16px 16px 16px 44px', borderRadius:'var(--radius-lg)', border:'1.5px solid var(--primary)', background:'var(--primary-bg)', opacity:0.7, cursor:'not-allowed', userSelect:'none' }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--primary)', marginBottom:4 }}>{cohort.type === 'My Cohort' ? 'My Cohort' : 'Import by ID'}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{cohort.type === 'My Cohort' ? 'Created natively in Pulse' : 'Imported via external platform'}</div>
                  </div>
                  {/* Lock overlay */}
                  <div style={{ position:'absolute', top:8, right:8, fontSize:14, pointerEvents:'none' }}>🔒</div>
                </div>
              </div>

              {/* Cohort Name — disabled */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Cohort Name</label>
                <input disabled value={cohort.name}
                  style={{ width:316, height:40, padding:'0 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)', fontSize:13, color:'var(--text)', opacity:0.6, cursor:'not-allowed', boxSizing:'border-box' }} />
              </div>

              {/* Description — disabled */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Description</label>
                <textarea disabled value={cohort.description} rows={3}
                  style={{ width:316, padding:'10px 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)', fontSize:13, color:'var(--text)', opacity:0.6, cursor:'not-allowed', resize:'none', boxSizing:'border-box', lineHeight:1.5, fontFamily:'inherit' }} />
              </div>

              {/* Audience Source — read-only card */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Audience Source</label>
                <div style={{ position:'relative', display:'inline-block', width:316 }}>
                  <div style={{ padding:'12px 14px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)', opacity:0.7, cursor:'not-allowed', userSelect:'none', display:'flex', alignItems:'center', gap:8 }}>
                    <SourceBadge source={cohort.source === 'API' ? 'API' : cohort.source} />
                    <span style={{ fontSize:12, color:'var(--text-muted)' }}>{cohort.sourceNote}</span>
                  </div>
                  <div style={{ position:'absolute', top:8, right:8, fontSize:12, pointerEvents:'none' }}>🔒</div>
                </div>
              </div>

              {/* Audience ID — read-only */}
              <div style={{ marginBottom:28 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:8 }}>Audience ID</label>
                <input disabled value={cohort.audienceId}
                  style={{ width:316, height:40, padding:'0 12px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-1)', fontSize:13, color:'var(--text)', opacity:0.6, cursor:'not-allowed', boxSizing:'border-box', fontFamily:'monospace' }} />
              </div>

              {/* Pricing — EDITABLE */}
              <div style={{ marginBottom:28 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'var(--text)', display:'block', marginBottom:4 }}>Pricing</label>
                <p style={{ margin:'0 0 12px', fontSize:11, color:'var(--text-muted)' }}>Update CPM and CPE rates for this cohort.</p>
                <PricingEditor cpm={localCpm} cpe={localCpe} onSave={(c,e) => { setLocalCpm(c); setLocalCpe(e); }} />
              </div>
            </>
          )}

          {/* ── STEP 2: Manage Access (same as CohortReviewModal TabManageAccess) ── */}
          {step === 2 && (
            <div>
              {/* Visibility */}
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>Visibility <span style={{ color:'var(--alert-error-primary)' }}>*</span></div>
                <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Control who can see and use this cohort.</div>
                <div style={{ display:'flex', gap:12 }}>
                  <VisCard id="Private" label="Private" desc="Only you can use this cohort" />
                  <VisCard id="Shared"  label="Shared"  desc="Selected advertisers can use this" />
                  <VisCard id="Public"  label="Public"  desc="All advertisers on the platform" />
                </div>
              </div>

              {/* Available Channels */}
              {vis !== 'Private' && (
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>Available Channels <span style={{ color:'var(--alert-error-primary)' }}>*</span></div>
                  <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Select channels where this cohort will be available.</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                    {ALL_CHANNELS.map(ch => <ChannelCard key={ch} ch={ch} />)}
                  </div>
                </div>
              )}

              {/* Assign Advertisers — only when Shared */}
              {vis === 'Shared' && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text-strong)', marginBottom:3 }}>Assign Advertisers <span style={{ color:'var(--alert-error-primary)' }}>*</span></div>
                  <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14 }}>Select advertisers who can access this audience cohort.</div>
                  <div style={{ borderRadius:8, border:'1px solid var(--border-table)', overflow:'hidden' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'44px 1fr 160px 130px 130px', background:'var(--surface-1)', borderBottom:'1px solid var(--border-table)', padding:'10px 16px', alignItems:'center' }}>
                      <div><input type="checkbox" checked={ALL_ADVERTISERS.every(a => selAdvs.has(a.name))} onChange={e => setSelAdvs(e.target.checked ? new Set(ALL_ADVERTISERS.map(a=>a.name)) : new Set())} style={{ cursor:'pointer', accentColor:'var(--osmos-brand-primary-bg)' }} /></div>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>Advertiser</div>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>Category</div>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>CPM Override<div style={{ fontSize:10, fontWeight:400, marginTop:1 }}>per 1K impressions</div></div>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)' }}>CPE Override<div style={{ fontSize:10, fontWeight:400, marginTop:1 }}>cost per 1000 entries</div></div>
                    </div>
                    {[...ALL_ADVERTISERS].sort((a,b) => { const ac=selAdvs.has(a.name), bc=selAdvs.has(b.name); return ac===bc?0:ac?-1:1; }).map((adv,i,arr) => {
                      const chk = selAdvs.has(adv.name);
                      const ov  = advOverrides[adv.name] || {};
                      return (
                        <div key={adv.name} style={{ display:'grid', gridTemplateColumns:'44px 1fr 160px 130px 130px', padding:'10px 16px', borderBottom:i<arr.length-1?'1px solid var(--border-table)':'none', background:chk?'var(--primary-bg)':'var(--bg-screen)', alignItems:'center' }}
                          onMouseEnter={e => { if (!chk) e.currentTarget.style.background='var(--surface-1)'; }}
                          onMouseLeave={e => { if (!chk) e.currentTarget.style.background='var(--bg-screen)'; }}>
                          <div onClick={e => e.stopPropagation()}><input type="checkbox" checked={chk} onChange={() => toggleAdv(adv.name)} style={{ cursor:'pointer', accentColor:'var(--osmos-brand-primary-bg)' }} /></div>
                          <div onClick={() => toggleAdv(adv.name)} style={{ fontSize:13, color:'var(--text)', fontWeight:chk?600:400, cursor:'pointer' }}>{adv.name}</div>
                          <div onClick={() => toggleAdv(adv.name)} style={{ fontSize:13, color:'var(--text-muted)', cursor:'pointer' }}>{adv.category}</div>
                          <div onClick={e => e.stopPropagation()}><div style={{ position:'relative', display:'flex', alignItems:'center' }}><span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span><input type="number" min="0" step="0.01" value={ov.cpm??''} onChange={e => setOverride(adv.name,'cpm',e.target.value)} placeholder={adv.defaultCpm} disabled={!chk} style={{ width:'100%', padding:'5px 8px 5px 18px', fontSize:13, borderRadius:6, border:'1px solid var(--border)', background:chk?'var(--bg-screen)':'var(--surface-1)', color:'var(--text)', outline:'none', opacity:chk?1:0.45, cursor:chk?'text':'not-allowed' }} onFocus={e => e.target.style.borderColor='var(--osmos-brand-primary-bg)'} onBlur={e => e.target.style.borderColor='var(--border)'} /></div></div>
                          <div onClick={e => e.stopPropagation()}><div style={{ position:'relative', display:'flex', alignItems:'center' }}><span style={{ position:'absolute', left:8, fontSize:12, color:'var(--text-muted)', pointerEvents:'none' }}>$</span><input type="number" min="0" step="0.01" value={ov.cpe??''} onChange={e => setOverride(adv.name,'cpe',e.target.value)} placeholder={adv.defaultCpe} disabled={!chk} style={{ width:'100%', padding:'5px 8px 5px 18px', fontSize:13, borderRadius:6, border:'1px solid var(--border)', background:chk?'var(--bg-screen)':'var(--surface-1)', color:'var(--text)', outline:'none', opacity:chk?1:0.45, cursor:chk?'text':'not-allowed' }} onFocus={e => e.target.style.borderColor='var(--osmos-brand-primary-bg)'} onBlur={e => e.target.style.borderColor='var(--border)'} /></div></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:'16px 28px', borderTop:'1px solid var(--border)', display:'flex', gap:10, justifyContent:'center', alignItems:'center', flexShrink:0, background:'var(--primary-bg)' }}>
          {step === 2 && <button type="button" onClick={() => setStep(1)} style={{ height:36, padding:'0 18px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', fontSize:12, fontWeight:600, color:'var(--text)' }}>Back</button>}
          {step === 1
            ? <button type="button" onClick={() => setStep(2)} style={{ height:36, padding:'0 20px', borderRadius:'var(--radius-md)', border:'none', background:'var(--primary)', cursor:'pointer', fontSize:12, fontWeight:600, color:'var(--surface-3)' }}>Next →</button>
            : <button type="button" onClick={() => { onSave(cohort.name); onClose(); }} style={{ height:36, padding:'0 20px', borderRadius:'var(--radius-md)', border:'none', background:'var(--primary)', cursor:'pointer', fontSize:12, fontWeight:600, color:'var(--surface-3)' }}>Save Changes</button>
          }
        </div>
      </div>

      <VisConfirmDialog />
    </>
  );
}

/* ─── Cohort Analytics Drawer (Option 2) ─────────────────────────── */
/* ─── Analytics metric definitions ──────────────────────────────── */
const ANALYTICS_METRICS = [
  { key:'spend',       label:'Ad Spend',       value:'₹4.6L',  delta:'+12%', subLabel:'vs prev period' },
  { key:'impressions', label:'Ad Impressions',  value:'48.2M',  delta:'+8%',  subLabel:'vs prev period' },
  { key:'clicks',      label:'Ad Clicks',       value:'2.1M',   delta:'+5%',  subLabel:'vs prev period' },
  { key:'ctr',         label:'CTR',             value:'4.35%',  delta:'+3%',  subLabel:'vs prev period' },
  { key:'cpm',         label:'CPM',             value:'₹9.50',  delta:'-2%',  subLabel:'vs prev period' },
  { key:'cpe',         label:'CPE',             value:'₹2.19',  delta:'-1%',  subLabel:'vs prev period' },
];

/* Colour assigned to each selected slot — slot 0 = primary purple, slot 1 = orange */
const METRIC_SLOT_COLOR = ['var(--primary)', 'var(--chart-bruntorange)'];

/* 7 date labels for the chart x-axis */
const CHART_DATES = ['08 Jun','09 Jun','10 Jun','11 Jun','12 Jun','13 Jun','14 Jun'];

/* Per-metric synthetic series (7 points each) */
const METRIC_SERIES = {
  spend:       [3.8,4.1,3.6,4.5,4.2,4.8,4.6],
  impressions: [40,43,38,46,44,50,48],
  clicks:      [1.7,1.8,1.6,2.0,1.9,2.2,2.1],
  ctr:         [4.1,4.2,4.0,4.5,4.3,4.6,4.4],
  cpm:         [9.8,9.6,9.9,9.4,9.5,9.3,9.5],
  cpe:         [2.3,2.2,2.4,2.1,2.2,2.2,2.2],
};

function CohortAnalyticsDrawer({ cohort, onClose }) {
  /* Which two metrics are selected (by key) */
  const [sel, setSel] = useState(['spend','impressions']);
  /* D / W / M granularity */
  const [gran, setGran] = useState('D');
  /* Bottom tab */
  const [activeTab, setActiveTab] = useState('overview');
  /* Chart hover */
  const [hoverIdx, setHoverIdx] = useState(null);

  /* Toggle a metric: clicking an unselected card replaces the SECOND slot */
  function toggleMetric(key) {
    setSel(prev => {
      if (prev[0] === key) return prev; // first slot — don't toggle off (always need 2)
      if (prev[1] === key) {
        // deselect second → shift: make prev[0] stay, pick next unselected
        const next = ANALYTICS_METRICS.find(m => m.key !== prev[0] && m.key !== key);
        return [prev[0], next ? next.key : prev[0]];
      }
      return [prev[0], key]; // select as second
    });
  }

  /* Chart geometry */
  const svgW = 820, svgH = 180;
  const padL = 52, padR = 52, padT = 16, padB = 36;
  const cW = svgW - padL - padR;
  const cH = svgH - padT - padB;
  const n = CHART_DATES.length;

  function xAt(i) { return padL + (i / (n - 1)) * cW; }

  function yAxis(key) {
    const vals = METRIC_SERIES[key];
    const mn = Math.min(...vals), mx = Math.max(...vals);
    const range = mx - mn || 1;
    return {
      mn, mx, range,
      yAt: v => padT + cH - ((v - mn) / range) * cH,
    };
  }

  const ax0 = yAxis(sel[0]);
  const ax1 = yAxis(sel[1]);

  function polyline(key, ax) {
    return METRIC_SERIES[key].map((v, i) => `${xAt(i)},${ax.yAt(v)}`).join(' ');
  }

  function areaPath(key, ax) {
    const pts = METRIC_SERIES[key].map((v, i) => `${xAt(i)},${ax.yAt(v)}`).join(' ');
    return `${xAt(0)},${padT + cH} ${pts} ${xAt(n-1)},${padT + cH}`;
  }

  /* Y-axis tick labels */
  function yTicks(ax, side) {
    const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => ax.mn + t * ax.range);
    return ticks.map((v, i) => {
      const y = ax.yAt(v);
      const label = v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v % 1 !== 0 ? v.toFixed(1) : String(Math.round(v));
      return { y, label, side };
    });
  }

  const leftTicks  = yTicks(ax0, 'left');
  const rightTicks = yTicks(ax1, 'right');

  /* Bottom tabs config */
  const TABS = [
    { key:'overview',    label:'OVERVIEW' },
    { key:'campaigns',   label:'CAMPAIGNS' },
    { key:'channels',    label:'CHANNELS' },
    { key:'advertisers', label:'ADVERTISERS' },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', zIndex:48 }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:920, background:'var(--bg-screen)', boxShadow:'-6px 0 40px rgba(0,0,0,0.18)', zIndex:50, display:'flex', flexDirection:'column' }} role="dialog" aria-label={`${cohort.name} Analytics`}>

        {/* ── Drawer Header ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 24px', borderBottom:'1px solid var(--border)', flexShrink:0, background:'var(--primary-bg)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:'var(--text-strong)' }}>{cohort.name}</h2>
            <span style={{ fontSize:11, color:'var(--text-muted)', background:'var(--surface-2)', padding:'2px 10px', borderRadius:'var(--radius-md)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em' }}>Analytics</span>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width:32, height:32, borderRadius:8, border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', fontSize:22, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        </div>

        {/* ── Scrollable Body ── */}
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>

          {/* ─ Metric Selector Cards ─ */}
          <div style={{ padding:'20px 24px 0', display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10 }}>
              {ANALYTICS_METRICS.map((m, idx) => {
                const slotIdx = sel.indexOf(m.key);
                const isSelected = slotIdx !== -1;
                const slotColor = isSelected ? METRIC_SLOT_COLOR[slotIdx] : null;
                return (
                  <button key={m.key} onClick={() => toggleMetric(m.key)}
                    style={{
                      textAlign:'left', cursor:'pointer', padding:'12px 14px',
                      borderRadius:'var(--radius-md)',
                      border: isSelected ? `1.5px solid ${slotColor}` : '1px solid var(--border)',
                      borderLeft: isSelected ? `4px solid ${slotColor}` : '1px solid var(--border)',
                      background: isSelected ? 'var(--bg-screen)' : 'var(--bg-screen)',
                      boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
                      transition:'all 0.15s',
                      position:'relative',
                    }}>
                    {/* Row: label + icons */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ fontSize:10, fontWeight:600, color: isSelected ? slotColor : 'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.04em' }}>{m.label}</span>
                      <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0, opacity:0.45 }}>
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                          <text x="6" y="9" textAnchor="middle" fontSize="7" fill="currentColor" fontWeight="600">i</text>
                        </svg>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity:0.4 }}>
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    {/* Value */}
                    <div style={{ fontSize:18, fontWeight:700, color: isSelected ? slotColor : 'var(--text-strong)', lineHeight:1, marginBottom:4 }}>{m.value}</div>
                    {/* Delta + sub */}
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <span style={{ fontSize:10, fontWeight:600, color: m.delta.startsWith('+') ? 'var(--alert-success-darker)' : 'var(--alert-error-primary)', background: m.delta.startsWith('+') ? 'var(--alert-success-bg)' : 'var(--alert-error-bg)', padding:'1px 5px', borderRadius:4 }}>{m.delta}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─ Performance Summary Chart ─ */}
          <div style={{ margin:'16px 24px 0', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', background:'var(--bg-screen)', overflow:'hidden' }}>
            {/* Chart toolbar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 18px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polyline points="1,13 5,7 8,10 11,4 15,8" stroke="var(--primary)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize:13, fontWeight:700, color:'var(--text-strong)' }}>Performance Summary</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                {/* Granularity toggle */}
                <div style={{ display:'flex', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', overflow:'hidden' }}>
                  {['D','W','M'].map(g => (
                    <button key={g} onClick={() => setGran(g)}
                      style={{ padding:'4px 10px', fontSize:11, fontWeight:600, border:'none', cursor:'pointer', background: gran===g ? 'var(--primary-bg)' : 'transparent', color: gran===g ? 'var(--primary)' : 'var(--text-muted)', borderRight: g !== 'M' ? '1px solid var(--border)' : 'none', transition:'all 0.12s' }}>
                      {g}
                    </button>
                  ))}
                </div>
                {/* Date range */}
                <button style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', background:'transparent', cursor:'pointer', fontSize:11, fontWeight:500, color:'var(--text-muted)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2"/>
                    <line x1="4" y1="1" x2="4" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="8" y1="1" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  08 Jun 26 – 14 Jun 26
                </button>
                {/* Download */}
                <button style={{ width:28, height:28, border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)' }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1v7M3.5 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.5 10.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display:'flex', alignItems:'center', gap:20, padding:'10px 18px 0' }}>
              {sel.map((key, si) => {
                const m = ANALYTICS_METRICS.find(x => x.key === key);
                return (
                  <div key={key} style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ display:'inline-block', width:24, height:3, borderRadius:2, background: METRIC_SLOT_COLOR[si] }} />
                    <span style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)' }}>{m?.label}</span>
                  </div>
                );
              })}
            </div>

            {/* SVG dual-axis chart */}
            <div style={{ padding:'6px 18px 12px', position:'relative' }}
              onMouseLeave={() => setHoverIdx(null)}>
              <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height={svgH} style={{ overflow:'visible', display:'block' }}>
                <defs>
                  <linearGradient id="grad0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.12"/>
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-bruntorange)" stopOpacity="0.10"/>
                    <stop offset="100%" stopColor="var(--chart-bruntorange)" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0,0.25,0.5,0.75,1].map((t,i) => {
                  const y = padT + cH * (1 - t);
                  return <line key={i} x1={padL} y1={y} x2={svgW-padR} y2={y} stroke="var(--border)" strokeWidth="0.8" strokeDasharray="4 3"/>;
                })}

                {/* Left Y-axis ticks */}
                {leftTicks.map((t, i) => (
                  <text key={i} x={padL - 6} y={t.y + 4} textAnchor="end" fontSize={9} fill="var(--text-muted)">{t.label}</text>
                ))}

                {/* Right Y-axis ticks */}
                {rightTicks.map((t, i) => (
                  <text key={i} x={svgW - padR + 6} y={t.y + 4} textAnchor="start" fontSize={9} fill="var(--chart-bruntorange)">{t.label}</text>
                ))}

                {/* Left Y-axis label */}
                <text x={10} y={padT + cH/2} textAnchor="middle" fontSize={9} fill="var(--primary)" fontWeight="600" transform={`rotate(-90,10,${padT + cH/2})`}>{ANALYTICS_METRICS.find(m=>m.key===sel[0])?.label}</text>

                {/* Right Y-axis label */}
                <text x={svgW-8} y={padT + cH/2} textAnchor="middle" fontSize={9} fill="var(--chart-bruntorange)" fontWeight="600" transform={`rotate(90,${svgW-8},${padT + cH/2})`}>{ANALYTICS_METRICS.find(m=>m.key===sel[1])?.label}</text>

                {/* Area fills */}
                <polygon points={areaPath(sel[0], ax0)} fill="url(#grad0)"/>
                <polygon points={areaPath(sel[1], ax1)} fill="url(#grad1)"/>

                {/* Lines */}
                <polyline points={polyline(sel[0], ax0)} fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points={polyline(sel[1], ax1)} fill="none" stroke="var(--chart-bruntorange)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

                {/* Hover vertical rule */}
                {hoverIdx !== null && (
                  <line x1={xAt(hoverIdx)} y1={padT} x2={xAt(hoverIdx)} y2={padT+cH} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 3"/>
                )}

                {/* Dots */}
                {CHART_DATES.map((_, i) => (
                  <g key={i}>
                    <rect x={xAt(i)-14} y={padT} width={28} height={cH} fill="transparent"
                      onMouseEnter={() => setHoverIdx(i)} style={{ cursor:'crosshair' }}/>
                    <circle cx={xAt(i)} cy={ax0.yAt(METRIC_SERIES[sel[0]][i])} r={hoverIdx===i?5:3} fill="var(--primary)" stroke="var(--bg-screen)" strokeWidth="1.5"/>
                    <circle cx={xAt(i)} cy={ax1.yAt(METRIC_SERIES[sel[1]][i])} r={hoverIdx===i?5:3} fill="var(--chart-bruntorange)" stroke="var(--bg-screen)" strokeWidth="1.5"/>
                  </g>
                ))}

                {/* Hover tooltip */}
                {hoverIdx !== null && (() => {
                  const tx = xAt(hoverIdx);
                  const tooltipW = 140, tooltipH = 52;
                  const tx2 = tx + tooltipW + 6 > svgW - padR ? tx - tooltipW - 6 : tx + 6;
                  const ty2 = padT + 4;
                  const m0 = ANALYTICS_METRICS.find(m=>m.key===sel[0]);
                  const m1 = ANALYTICS_METRICS.find(m=>m.key===sel[1]);
                  return (
                    <g style={{ pointerEvents:'none' }}>
                      <rect x={tx2} y={ty2} width={tooltipW} height={tooltipH} rx={6} fill="var(--surface-1)" stroke="var(--border)" strokeWidth="1"/>
                      <text x={tx2+10} y={ty2+14} fontSize={9} fontWeight="600" fill="var(--text-muted)">{CHART_DATES[hoverIdx]}</text>
                      <circle cx={tx2+10} cy={ty2+25} r={3.5} fill="var(--primary)"/>
                      <text x={tx2+18} y={ty2+29} fontSize={9} fontWeight="600" fill="var(--text)">{m0?.label}: {METRIC_SERIES[sel[0]][hoverIdx]}</text>
                      <circle cx={tx2+10} cy={ty2+40} r={3.5} fill="var(--chart-bruntorange)"/>
                      <text x={tx2+18} y={ty2+44} fontSize={9} fontWeight="600" fill="var(--text)">{m1?.label}: {METRIC_SERIES[sel[1]][hoverIdx]}</text>
                    </g>
                  );
                })()}

                {/* X-axis labels */}
                {CHART_DATES.map((d, i) => (
                  <text key={i} x={xAt(i)} y={svgH - 6} textAnchor="middle" fontSize={9} fill="var(--text-muted)">{d}</text>
                ))}
              </svg>
            </div>
          </div>

          {/* ─ Bottom Tabs ─ */}
          <div style={{ margin:'16px 24px 0', flex:1 }}>
            {/* Tab strip */}
            <div style={{ display:'flex', borderBottom:'2px solid var(--border)', marginBottom:16 }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  style={{ padding:'8px 16px', fontSize:11, fontWeight:700, border:'none', background:'transparent', cursor:'pointer', color: activeTab===t.key ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab===t.key ? '2px solid var(--primary)' : '2px solid transparent', marginBottom:'-2px', letterSpacing:'0.04em', textTransform:'uppercase', whiteSpace:'nowrap', transition:'color 0.12s' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ paddingBottom:32 }}>

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {/* Spend by Channel */}
                  <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', padding:'16px 18px', background:'var(--bg-screen)' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'var(--text-strong)', marginBottom:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      Spend by Channel
                      <span style={{ fontSize:12, fontWeight:700, color:'var(--alert-success-primary)' }}>{cohort.spend30d}</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      {cohort.spendByChannel.map(s => (
                        <div key={s.ch}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                            <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[s.ch]}</span>
                            <span style={{ fontSize:12, fontWeight:500, flex:1, color:'var(--text)' }}>{s.ch}</span>
                            <span style={{ fontSize:12, fontWeight:700, color:'var(--alert-success-primary)' }}>{s.amount}</span>
                            <span style={{ fontSize:11, color:'var(--text-muted)', minWidth:28, textAlign:'right' }}>{s.pct}%</span>
                          </div>
                          <div style={{ height:6, borderRadius:3, background:'var(--border)' }}>
                            <div style={{ width:`${s.pct}%`, height:'100%', borderRadius:3, background:s.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channel Distribution */}
                  <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', padding:'16px 18px', background:'var(--bg-screen)' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'var(--text-strong)', marginBottom:14 }}>Channel Distribution</div>
                    <div style={{ display:'flex', height:20, borderRadius:6, overflow:'hidden', marginBottom:14 }}>
                      {cohort.spendByChannel.map(s => (
                        <div key={s.ch} title={`${s.ch}: ${s.pct}%`} style={{ width:`${s.pct}%`, background:s.color, height:'100%' }} />
                      ))}
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:20 }}>
                      {cohort.spendByChannel.map(s => (
                        <div key={s.ch} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--text-muted)' }}>
                          <span style={{ width:9, height:9, borderRadius:2, background:s.color, display:'inline-block', flexShrink:0 }} />
                          <span style={{ fontWeight:500, color:'var(--text)' }}>{s.ch}</span>
                          <span>{s.pct}%</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop:'1px solid var(--border)', paddingTop:14 }}>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:8, fontWeight:600 }}>Audience Activation</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11 }}>
                          <span style={{ color:'var(--text-muted)' }}>Activated Advertisers</span>
                          <span style={{ fontWeight:700, color:'var(--text)' }}>{cohort.activatedAdvertisers} of {cohort.advertisers}</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11 }}>
                          <span style={{ color:'var(--text-muted)' }}>Activated Channels</span>
                          <span style={{ fontWeight:700, color:'var(--text)' }}>{cohort.activatedChannels}</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11 }}>
                          <span style={{ color:'var(--text-muted)' }}>Running Campaigns</span>
                          <span style={{ fontWeight:700, color:'var(--text)' }}>{cohort.campaignCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGNS TAB */}
              {activeTab === 'campaigns' && (
                <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
                    <thead>
                      <tr style={{ background:'var(--surface-1)' }}>
                        {['STATUS','CAMPAIGN','ADVERTISER','CHANNEL','SPEND · 30D'].map(h => (
                          <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:9, fontWeight:700, color:'var(--text-info)', letterSpacing:'0.06em', textTransform:'uppercase', borderBottom:'1px solid var(--border)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(cohort.campaignDetails || []).map((c, i) => (
                        <tr key={c.name} style={{ borderBottom: i < (cohort.campaignDetails.length-1) ? '1px solid var(--border)' : 'none' }}>
                          <td style={{ padding:'11px 12px' }}>
                            <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                              <span style={{ width:6, height:6, borderRadius:'50%', background:c.status==='Active'?'var(--alert-success-primary)':'var(--text-info)', flexShrink:0 }} />
                              <span style={{ fontSize:11, color:c.status==='Active'?'var(--alert-success-darker)':'var(--text-muted)' }}>{c.status}</span>
                            </span>
                          </td>
                          <td style={{ padding:'11px 12px', fontWeight:600, color:'var(--text)', fontSize:12 }}>{c.name}</td>
                          <td style={{ padding:'11px 12px' }}>
                            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                              <span style={{ width:22, height:22, borderRadius:'50%', background:c.color, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff', flexShrink:0 }}>{c.initials}</span>
                              <span style={{ fontSize:11, color:'var(--text-muted)' }}>{c.advertiser}</span>
                            </span>
                          </td>
                          <td style={{ padding:'11px 12px' }}>
                            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                              <span style={{ flexShrink:0 }}>{CHANNEL_ICONS[c.channel]||null}</span>
                              <span style={{ fontSize:11, color:'var(--text-muted)' }}>{c.channel}</span>
                            </span>
                          </td>
                          <td style={{ padding:'11px 12px', fontWeight:700, color:'var(--alert-success-primary)', fontSize:12 }}>{c.spend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CHANNELS TAB */}
              {activeTab === 'channels' && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {cohort.spendByChannel.map(s => (
                    <div key={s.ch} style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', padding:'16px 20px', background:'var(--bg-screen)', display:'grid', gridTemplateColumns:'auto 1fr auto', gap:16, alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ width:36, height:36, borderRadius:'50%', background:'var(--surface-2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{CHANNEL_ICONS[s.ch]}</span>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{s.ch}</div>
                          <div style={{ fontSize:11, color:'var(--text-muted)' }}>{s.pct}% of total spend</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ height:8, borderRadius:4, background:'var(--border)' }}>
                          <div style={{ width:`${s.pct}%`, height:'100%', borderRadius:4, background:s.color }} />
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:16, fontWeight:700, color:'var(--alert-success-primary)' }}>{s.amount}</div>
                        <div style={{ fontSize:10, color:'var(--text-muted)' }}>30-day spend</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ADVERTISERS TAB */}
              {activeTab === 'advertisers' && (
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {(cohort.sharingAdvertisers || []).map((adv, i) => (
                    <div key={adv} style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-md)', padding:'14px 18px', background:'var(--bg-screen)', display:'flex', alignItems:'center', gap:14, justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ width:32, height:32, borderRadius:'50%', background:`hsl(${i*80},55%,55%)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>{adv.slice(0,2).toUpperCase()}</span>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{adv}</div>
                          <div style={{ fontSize:10, color:'var(--text-muted)' }}>Has access · Active</div>
                        </div>
                      </div>
                      <span style={{ fontSize:10, fontWeight:600, background:'var(--alert-success-bg)', color:'var(--alert-success-darker)', padding:'3px 10px', borderRadius:'var(--radius-sm)' }}>Active</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>{/* /scrollable body */}
      </div>
    </>
  );
}

/* ─── Channel icon cluster with tooltip ────────────────────────── */
function ChannelCluster({ channels }) {
  const [hovered, setHovered] = useState(null);
  const show = channels.slice(0, 4);
  const rest = channels.length - 4;

  return (
    <div style={{ display:'flex', alignItems:'center', gap:3, position:'relative' }}>
      {show.map(ch => (
        <div key={ch} style={{ position:'relative' }}
          onMouseEnter={() => setHovered(ch)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ width:22, height:22, borderRadius:'50%', background:'var(--osmos-bg-subtle)', border:'1px solid var(--osmos-border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {CHANNEL_ICONS[ch] || <span style={{ fontSize:8, fontWeight:700 }}>{ch[0]}</span>}
          </div>
          {hovered === ch && (
            <div style={{ position:'absolute', bottom:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)', background:'var(--osmos-tooltip-bg)', color:'#fff', fontSize:11, fontWeight:500, padding:'4px 8px', borderRadius:5, whiteSpace:'nowrap', zIndex:80, pointerEvents:'none' }}>
              {CHANNEL_LABELS[ch] || ch}
              <div style={{ position:'absolute', bottom:-4, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:'4px solid var(--osmos-tooltip-bg)' }} />
            </div>
          )}
        </div>
      ))}
      {rest > 0 && <span style={{ fontSize:10, color:'var(--osmos-fg-muted)', marginLeft:2 }}>+{rest}</span>}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function AudienceManagerCatalogPage() {
  const storageKey = 'audience-catalog-filters';

  const [filters, setFilters] = useState(() => {
    try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : { source:'All', vis:'All', q:'' }; }
    catch { return { source:'All', vis:'All', q:'' }; }
  });

  const [cohorts,        setCohorts]        = useState(COHORTS);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editTarget,     setEditTarget]     = useState(null);   // Option 2 — EditCohortDrawer
  const [analyticsTarget,setAnalyticsTarget]= useState(null);   // Option 2 — CohortAnalyticsDrawer
  const [viewMode,       setViewMode]       = useState(2);      // 1 = Option 1 (CohortReviewModal), 2 = Option 2 (EditCohortDrawer)
  const [showCreate,     setShowCreate]     = useState(false);
  const [toast,          setToast]          = useState(null);
  const [highlightId,    setHighlightId]    = useState(null);
  const [showFilters,    setShowFilters]    = useState(false);
  const [menuOpenId,     setMenuOpenId]     = useState(null);
  const [selectedIds,    setSelectedIds]    = useState(new Set());
  const tableRef = useRef(null);

  // Persist filters
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(filters)); }
    catch {}
  }, [filters]);

  function setFilter(key, val) { setFilters(f => ({ ...f, [key]: val })); }

  const sourceCounts = {
    All: cohorts.length,
    Platform: cohorts.filter(c => c.source === 'Platform').length,
    Api: cohorts.filter(c => c.source === 'API').length,
    Csv: 0,
  };
  const visCounts = {
    All: cohorts.length, Private: 0,
    Shared: cohorts.filter(c => c.visibility === 'Shared').length,
    Public: cohorts.filter(c => c.visibility === 'Public').length,
  };

  const filtered = cohorts.filter(c => {
    const srcOk = filters.source === 'All' || (filters.source === 'Api' ? c.source === 'API' : c.source === filters.source);
    const visOk = filters.vis === 'All' || c.visibility === filters.vis;
    const q     = filters.q.toLowerCase();
    const txtOk = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    return srcOk && visOk && txtOk;
  });

  function clearFilters() { setFilters({ source:'All', vis:'All', q:'' }); }

  function handleCreate(name) {
    const newCohort = {
      ...COHORTS[0],
      id: `c-${Date.now()}`, name,
      description: 'Newly created cohort',
      source: 'Platform', type: 'My Cohort',
      size: '0', sizeNum: 0, sizeTrend: 0,
      advertisers: 0, campaigns: 0, cpm: '$0.00', cpe: '$0.00',
      channels: [], sharingAdvertisers: [],
      heatmap: {}, spendByChannel: [], campaignCount: 0,
      created: `${new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' })} · You`,
      lastRefresh: 'Just now', spend30d: '₹0',
      activatedAdvertisers: 0, activatedChannels: 0, activatedChannelNames: '—',
    };
    setCohorts(prev => [newCohort, ...prev]);
    setShowCreate(false);
    setToast({ msg: `Cohort "${name}" created successfully`, type: 'success' });
    setHighlightId(newCohort.id);
    setTimeout(() => setHighlightId(null), 2000);
    // scroll table to top
    if (tableRef.current) tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleDeactivated(id) {
    const c = cohorts.find(x => x.id === id);
    setToast({ msg: `"${c?.name}" deactivated`, type: 'success' });
    setCohorts(prev => prev.map(x => x.id === id ? { ...x, status: 'Inactive' } : x));
  }

  /* ── Chip button factory */
  function FilterChip({ label, active, onClick }) {
    return (
      <button onClick={onClick} style={{ padding:'4px 12px', borderRadius:20, border:'none', cursor:'pointer', fontSize:12, fontWeight:active?700:400, background:active?'var(--osmos-brand-primary)':'var(--osmos-bg-subtle)', color:active?'#fff':'var(--osmos-fg-muted)', transition:'all 0.15s' }}>
        {label}
      </button>
    );
  }

  /* grid: checkbox | status | cohort-name | size | source | type | visibility | channels | active-adv | campaigns | cpm | cpe | spend | analytics | actions */
  const TABLE_COLS = '36px 70px 1fr 60px 90px 110px 90px 130px 100px 95px 60px 60px 70px 40px 44px';
  const hasActiveFilters = filters.source !== 'All' || filters.vis !== 'All' || filters.q !== '';

  /* ── Filter dropdown ── */
  function FilterDropdown() {
    const [open, setOpen] = useState(false);
    const isActive = open;
    const activeColor = isActive ? 'var(--primary)' : 'var(--text-muted)';
    return (
      <div style={{ position:'relative' }}>
        <button
          onClick={() => setOpen(v => !v)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          style={{ display:'inline-flex', alignItems:'center', gap:6, height:34, padding:'0 14px', borderRadius:'var(--radius-md)', border:`1px solid ${open ? 'var(--primary)' : 'var(--border)'}`, background:'var(--surface-1)', cursor:'pointer', fontSize:12, fontWeight:600, color:activeColor }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Filter
          {hasActiveFilters && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--primary)', display:'inline-block', marginLeft:2 }} />}
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, zIndex:20, background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'14px 16px', display:'flex', alignItems:'center', gap:10, boxShadow:'var(--shadow-card)', minWidth:460 }}>
            {/* Source select */}
            <FilterSelect label="Source" value={filters.source} options={SOURCE_FILTERS.map(f => ({ id:f, label:f, count:sourceCounts[f] }))} onChange={v => setFilter('source', v)} />
            {/* Visibility select */}
            <FilterSelect label="Visibility" value={filters.vis} options={VIS_FILTERS.map(f => ({ id:f, label:f, count:visCounts[f] }))} onChange={v => setFilter('vis', v)} />
            <div style={{ flex:1 }} />
            {hasActiveFilters && (
              <button onClick={() => { clearFilters(); setOpen(false); }}
                style={{ height:34, padding:'0 16px', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', background:'var(--surface-3)', cursor:'pointer', fontSize:12, fontWeight:500, color:'var(--text-muted)' }}>
                Clear
              </button>
            )}
            <button onClick={() => setOpen(false)}
              style={{ height:34, padding:'0 20px', borderRadius:'var(--radius-md)', border:'none', background:'var(--primary)', cursor:'pointer', fontSize:12, fontWeight:600, color:'#fff' }}>
              Apply
            </button>
          </div>
        )}
      </div>
    );
  }

  function FilterSelect({ label, value, options, onChange }) {
    const [open, setOpen] = useState(false);
    const selected = options.find(o => o.id === value) || options[0];
    return (
      <div style={{ position:'relative', width:180 }}>
        <button type="button" onClick={() => setOpen(v => !v)} onBlur={() => setTimeout(() => setOpen(false), 180)}
          style={{ width:'100%', height:38, padding:'0 12px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', cursor:'pointer', fontSize:13, color:'var(--text)', fontWeight:500 }}>
          <span>{label}: <strong>{selected.label}</strong></span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0, background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-card)', zIndex:50, overflow:'hidden' }}>
            {options.map(opt => (
              <button key={opt.id} onMouseDown={() => { onChange(opt.id); setOpen(false); }}
                style={{ width:'100%', padding:'10px 12px', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', background: value===opt.id ? 'var(--primary-bg)' : 'transparent', color: value===opt.id ? 'var(--primary)' : 'var(--text)', border:'none', cursor:'pointer', fontSize:12, fontWeight: value===opt.id ? 600 : 500 }}
                onMouseEnter={e => { if (value!==opt.id) e.currentTarget.style.background='var(--surface-1)'; }}
                onMouseLeave={e => { if (value!==opt.id) e.currentTarget.style.background='transparent'; }}>
                <span>{opt.label}</span>
                <span style={{ fontSize:11, color:'var(--text-muted)' }}>{opt.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, fontFamily:"'Open Sans',sans-serif", position:'relative' }} onClick={() => menuOpenId && setMenuOpenId(null)}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes spin  { to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-12px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
        @keyframes rowHL  { 0%,100% { background: var(--surface-3) } 30% { background: var(--primary-bg) } }
        @keyframes menuIn { from { opacity:0; transform:scale(0.95) translateY(-4px) } to { opacity:1; transform:scale(1) translateY(0) } }
      `}</style>

      {/* ── Content area ── */}
      <div style={{ flex:1, padding:'24px 24px 40px', overflowY:'auto', background:'var(--surface-1)', minWidth:0 }}>
        <div style={{ background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:20 }}>

          {/* ── Title + actions row ── */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:'var(--text)' }}>Audience Cohort</h1>
              {/* Option switcher */}
              <div style={{ display:'inline-flex', alignItems:'center', background:'var(--surface-1)', borderRadius:'var(--radius-md)', padding:3, gap:2, border:'1px solid var(--border)' }}>
                {[{ n:1, label:'Option 1' },{ n:2, label:'Option 2' }].map(({ n, label }) => {
                  const active = viewMode === n;
                  return (
                    <button key={n} onClick={() => setViewMode(n)}
                      style={{ padding:'4px 12px', borderRadius:6, border:'none', cursor:'pointer', fontSize:11, fontWeight:active?700:500, color:active?'var(--primary)':'var(--text-muted)', background:active?'var(--primary-bg)':'transparent', transition:'all 0.15s', whiteSpace:'nowrap' }}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0, alignItems:'center' }}>
              <div style={{ position:'relative' }}>
                <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text-info)', pointerEvents:'none' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={filters.q} onChange={e => setFilter('q', e.target.value)} placeholder="Search Cohort"
                  style={{ height:34, paddingLeft:30, paddingRight:filters.q?28:12, borderRadius:'var(--radius-md)', fontSize:12, border:'1px solid var(--border)', background:'var(--surface-3)', color:'var(--text)', width:220, outline:'none', boxSizing:'border-box' }} />
                {filters.q && <button onClick={() => setFilter('q','')} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', border:'none', background:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:14, lineHeight:1, padding:0 }}>×</button>}
              </div>
              <button onClick={() => setShowCreate(true)}
                style={{ height:34, padding:'0 16px', display:'flex', alignItems:'center', gap:6, background:'var(--primary)', border:'none', borderRadius:'var(--radius-md)', cursor:'pointer', fontSize:12, fontWeight:600, color:'#fff', whiteSpace:'nowrap' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Cohort
              </button>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
            <FilterDropdown />
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ fontSize:11, color:'var(--primary)', background:'none', border:'none', cursor:'pointer', padding:'5px 8px', fontWeight:500 }}>Clear all</button>
            )}
            {filters.source !== 'All' && <span style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, background:'var(--primary-bg)', border:'1px solid var(--border)', fontSize:11, color:'var(--primary)', fontWeight:600 }}>Source: {filters.source}<button onClick={() => setFilter('source','All')} style={{ border:'none', background:'none', cursor:'pointer', color:'var(--primary)', fontSize:13, lineHeight:1, padding:'0 0 0 2px' }}>×</button></span>}
            {filters.vis !== 'All' && <span style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, background:'var(--primary-bg)', border:'1px solid var(--border)', fontSize:11, color:'var(--primary)', fontWeight:600 }}>Visibility: {filters.vis}<button onClick={() => setFilter('vis','All')} style={{ border:'none', background:'none', cursor:'pointer', color:'var(--primary)', fontSize:13, lineHeight:1, padding:'0 0 0 2px' }}>×</button></span>}
          </div>

          {/* ── Bulk Action Bar ── */}
          {selectedIds.size > 0 && (
            <div style={{ display:'flex', alignItems:'stretch', background:'var(--primary)', borderRadius:'var(--radius-md)', overflow:'hidden', animation:'fadeIn 0.18s ease', boxShadow:'var(--shadow-raised)', height:44 }}>
              {/* Count */}
              <span style={{ padding:'0 20px', fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.9)', whiteSpace:'nowrap', borderRight:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', flexShrink:0 }}>
                {selectedIds.size} {selectedIds.size === 1 ? 'row' : 'rows'} selected
              </span>
              {/* Actions */}
              {[
                { icon:<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>, label:'Copy' },
                { icon:<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>, label:'Share...' },
                { icon:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>, label:'Make private' },
                { icon:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>, label:'Export' },
                { icon:<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>, label:'Delete' },
              ].map(({ icon, label }, idx, arr) => (
                <button key={label}
                  onClick={() => { setToast({ msg:`${label} applied to ${selectedIds.size} cohort${selectedIds.size>1?'s':''}`, type:'success' }); if(label==='Delete') setSelectedIds(new Set()); }}
                  style={{ display:'flex', alignItems:'center', gap:7, padding:'0 18px', border:'none', borderRight: idx < arr.length-1 ? '1px solid rgba(255,255,255,0.15)' : 'none', background:'transparent', fontSize:13, fontWeight:600, color: label==='Delete' ? 'rgba(255,255,255,0.55)' : '#fff', cursor:'pointer', transition:'background 0.12s', whiteSpace:'nowrap', flexShrink:0 }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: label==='Delete'?0.55:1 }}>{icon}</svg>
                  {label}
                </button>
              ))}
              {/* Spacer */}
              <div style={{ flex:1 }} />
              {/* Close × */}
              <button onClick={() => setSelectedIds(new Set())}
                style={{ padding:'0 20px', border:'none', borderLeft:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'rgba(255,255,255,0.8)', fontSize:20, fontWeight:300, cursor:'pointer', display:'flex', alignItems:'center', flexShrink:0, lineHeight:1, transition:'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                ×
              </button>
            </div>
          )}

          {/* ── Table ── */}
          <div ref={tableRef} style={{ borderRadius:'var(--radius-lg)', border:'1px solid var(--border)', background:'var(--surface-3)', overflow:'hidden' }}>

            {/* Table header */}
            <div style={{ display:'grid', gridTemplateColumns:TABLE_COLS, borderBottom:'1px solid var(--border)', background:'var(--surface-1)' }}>
              <div style={{ padding:'10px 12px', display:'flex', alignItems:'center' }}>
                <input type="checkbox" aria-label="Select all"
                  checked={filtered.length > 0 && filtered.every(c => selectedIds.has(c.id))}
                  ref={el => { if (el) el.indeterminate = selectedIds.size > 0 && !filtered.every(c => selectedIds.has(c.id)); }}
                  onChange={e => setSelectedIds(e.target.checked ? new Set(filtered.map(c => c.id)) : new Set())}
                  style={{ cursor:'pointer', accentColor:'var(--primary)', width:14, height:14 }} />
              </div>
              {[
                { label:'Status',          align:'center' },
                { label:'Cohort Name',     align:'left'   },
                { label:'Size',            align:'right'  },
                { label:'Source',          align:'left'   },
                { label:'Type',            align:'left'   },
                { label:'Visibility',      align:'left'   },
                { label:'Channels in Use', align:'left'   },
                { label:'Active Advertiser',align:'right' },
                { label:'Campaigns',       align:'right'  },
                { label:'CPM',             align:'right'  },
                { label:'CPE',             align:'right'  },
                { label:'Spend',           align:'right'  },
                { label:'',               align:'center' },
                { label:'',               align:'center' },
              ].map((h, idx) => (
                <div key={idx} style={{ padding:'10px 12px', fontSize:11, fontWeight:600, letterSpacing:'0.02em', color:'var(--text)', textAlign:h.align, borderBottom:0, whiteSpace:'nowrap' }}>
                  {h.label}
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div style={{ padding:'60px 24px', textAlign:'center', animation:'fadeIn 0.3s ease' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-info)" strokeWidth="1.5" style={{ marginBottom:12 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:6 }}>No cohorts match your filters</div>
                <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16 }}>Try broadening your search or clearing the active filters.</div>
                <button onClick={clearFilters} style={{ padding:'8px 18px', borderRadius:'var(--radius-md)', border:'1px solid var(--primary)', background:'transparent', color:'var(--primary)', fontSize:13, fontWeight:600, cursor:'pointer' }}>Clear filters</button>
              </div>
            ) : filtered.map((cohort, i) => {
              const isSelected = viewMode === 1 ? selectedReview?.id === cohort.id : editTarget?.id === cohort.id;
              const isBulkSelected = selectedIds.has(cohort.id);
              return (
                <div
                  key={cohort.id}
                  onClick={() => { if (viewMode === 1) { setSelectedReview(cohort); } else { setEditTarget(cohort); } setMenuOpenId(null); }}
                  style={{
                    display:'grid', gridTemplateColumns:TABLE_COLS,
                    borderBottom: i < filtered.length-1 ? '1px solid var(--border)' : 'none',
                    cursor:'pointer',
                    background: isSelected ? 'var(--primary-bg)' : isBulkSelected ? 'var(--primary-bg)' : highlightId === cohort.id ? 'var(--primary-bg)' : 'var(--surface-3)',
                    transition:'background 0.1s',
                    animation: highlightId === cohort.id ? 'rowHL 2s ease' : undefined,
                    alignItems:'center',
                    borderLeft: isSelected ? '3px solid var(--primary)' : isBulkSelected ? '3px solid var(--primary-tint-1)' : '3px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isSelected && highlightId !== cohort.id) e.currentTarget.style.background = 'var(--surface-1)'; }}
                  onMouseLeave={e => { if (!isSelected && highlightId !== cohort.id) e.currentTarget.style.background = 'var(--surface-3)'; }}
                >
                  {/* Checkbox */}
                  <div style={{ padding:'12px 12px', verticalAlign:'middle', display:'flex', alignItems:'center' }} onClick={e => e.stopPropagation()}>
                    <input type="checkbox" aria-label={`Select ${cohort.name}`}
                      checked={selectedIds.has(cohort.id)}
                      onChange={e => setSelectedIds(prev => { const n = new Set(prev); e.target.checked ? n.add(cohort.id) : n.delete(cohort.id); return n; })}
                      style={{ cursor:'pointer', accentColor:'var(--primary)', width:14, height:14 }} />
                  </div>

                  {/* Status */}
                  <div style={{ padding:'12px 12px', textAlign:'center' }}>
                    <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--alert-success-primary)' }} />
                      <span style={{ fontSize:11, fontWeight:500, color:'var(--alert-success-primary)' }}>Active</span>
                    </div>
                  </div>

                  {/* Cohort Name */}
                  <div style={{ padding:'12px 12px', display:'flex', alignItems:'center', minWidth:0 }}>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'var(--primary)', cursor:'pointer' }}>{cohort.name}</div>
                      <div style={{ fontSize:10, color:'var(--text-info)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:1 }}>{cohort.description}</div>
                    </div>
                  </div>

                  {/* Size */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <span style={{ fontSize:12, fontWeight:500, color:'var(--text-muted)' }}>{cohort.size}</span>
                  </div>

                  {/* Source */}
                  <div style={{ padding:'12px 12px' }}><SourceBadge source={cohort.source === 'API' ? 'API' : cohort.source} /></div>

                  {/* Type */}
                  <div style={{ padding:'12px 12px' }}><TypeBadge type={cohort.type} /></div>

                  {/* Visibility */}
                  <div style={{ padding:'12px 12px' }}>
                    <span style={{ fontSize:12, fontWeight:500, color:'var(--text-muted)' }}>{cohort.visibility}</span>
                  </div>

                  {/* Channels */}
                  <div style={{ padding:'12px 12px' }}><ChannelCluster channels={cohort.channels} /></div>

                  {/* Active Advertisers */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <div style={{ fontSize:12, fontWeight:500, color:'var(--text-muted)' }}>{String(cohort.advertisers).padStart(2,'0')}</div>
                  </div>

                  {/* Campaigns */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <div style={{ fontSize:12, fontWeight:500, color:'var(--text-muted)' }}>{String(cohort.campaigns).padStart(2,'0')}</div>
                  </div>

                  {/* CPM */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <span style={{ fontSize:12, fontWeight:500, color:'var(--alert-success-primary)' }}>{cohort.cpm}</span>
                  </div>

                  {/* CPE */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <span style={{ fontSize:12, fontWeight:500, color:'var(--alert-success-primary)' }}>{cohort.cpe}</span>
                  </div>

                  {/* Spend */}
                  <div style={{ padding:'12px 12px', textAlign:'right' }}>
                    <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{cohort.spend30d}</span>
                  </div>

                  {/* Analytics icon */}
                  <div style={{ padding:'12px 4px', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={e => e.stopPropagation()}>
                    <button
                      onClick={e => { e.stopPropagation(); setAnalyticsTarget(cohort); }}
                      title="View Analytics"
                      style={{ width:28, height:28, borderRadius:'var(--radius-md)', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', cursor:'pointer', color:'var(--text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                      </svg>
                    </button>
                  </div>

                  {/* 3-dot menu */}
                  <div style={{ padding:'12px 8px', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={e => e.stopPropagation()}>
                    <button
                      onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === cohort.id ? null : cohort.id); }}
                      style={{ width:28, height:28, borderRadius:'var(--radius-md)', display:'inline-flex', alignItems:'center', justifyContent:'center', background: menuOpenId===cohort.id ? 'var(--surface-2)' : 'transparent', border:'none', cursor:'pointer', color:'var(--text-muted)' }}
                      onMouseEnter={e => { if (menuOpenId!==cohort.id) e.currentTarget.style.background='var(--surface-1)'; }}
                      onMouseLeave={e => { if (menuOpenId!==cohort.id) e.currentTarget.style.background='transparent'; }}
                      aria-label={`Actions for ${cohort.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>
                    </button>
                    {menuOpenId === cohort.id && (
                      <div style={{ position:'absolute', right:0, top:'100%', zIndex:100, background:'var(--surface-3)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-card)', minWidth:160, padding:'4px 0', marginTop:4, overflow:'hidden' }}>
                        {[
                          { label:'Copy',       icon:<><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,  action:() => { setToast({ msg:`"${cohort.name}" copied`, type:'success' }); setMenuOpenId(null); } },
                          { label:'Deactivate', icon:<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,                                                   action:() => { setMenuOpenId(null); } },
                          { label:'Delete',     icon:<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,     action:() => { setMenuOpenId(null); }, danger:true },
                        ].map(item => (
                          <button key={item.label} onMouseDown={() => item.action()}
                            style={{ width:'100%', padding:'8px 12px', textAlign:'left', display:'flex', alignItems:'center', gap:10, background:'transparent', border:'none', cursor:'pointer', fontSize:12, fontWeight:500, color: item.danger ? 'var(--alert-error-primary)' : 'var(--text)' }}
                            onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'}
                            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer count */}
          {filtered.length > 0 && (
            <div style={{ marginTop:10, fontSize:12, color:'var(--text-muted)', paddingLeft:4 }}>
              Showing {filtered.length} of {cohorts.length} cohorts
            </div>
          )}

        </div>{/* /surface-3 card */}
      </div>{/* /surface-1 content area */}

      {/* Detail drawer (compact v1) */}
      {selectedCohort && !selectedReview && (
        <CohortDrawer cohort={selectedCohort} onClose={() => setSelectedCohort(null)} onDeactivated={handleDeactivated} />
      )}

      {/* Full Review modal — Option 1 */}
      {viewMode === 1 && selectedReview && (
        <CohortReviewModal cohort={selectedReview} onClose={() => setSelectedReview(null)} onDeactivated={handleDeactivated} onSaved={(msg) => setToast({ msg, type:'success' })} />
      )}

      {/* Option 2 — Edit Cohort drawer */}
      {editTarget && (
        <EditCohortDrawer cohort={editTarget} onClose={() => setEditTarget(null)} onSave={(name) => { setToast({ msg: `"${name}" saved successfully`, type:'success' }); }} />
      )}

      {/* Option 2 — Analytics drawer */}
      {analyticsTarget && (
        <CohortAnalyticsDrawer cohort={analyticsTarget} onClose={() => setAnalyticsTarget(null)} />
      )}

      {/* Create cohort drawer */}
      {showCreate && (
        <CreateCohortDrawer onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
}
