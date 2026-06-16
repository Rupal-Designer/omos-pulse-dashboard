import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

/* ─── Token aliases (matching reference) ─────────────────────── */
const BG       = 'var(--bg-screen)';
const BG_SUBTLE= 'var(--surface-1)';
const BORDER   = 'var(--border)';
const FG       = 'var(--text-strong)';
const FG_MUTED = 'var(--text-muted)';
const FG_SUBTLE= 'var(--text-info)';
const PRIMARY  = 'var(--primary)';
const PRIMARY_BG = 'var(--primary-bg)';
const GREEN    = 'var(--alert-success-primary)';
const AMBER    = 'var(--alert-warning-primary)';
const FONT     = "'Open Sans', sans-serif";

/* ─── Mock data ───────────────────────────────────────────────── */
const SEGMENTS = [
  { id:'s1',  name:'High-Value Shoppers',         category:'Purchase Behavior', desc:'Consumers with high purchase frequency and average order value above $150',            users:2.4,  price:3.40, cpe:2.1,  tags:['High AOV','Frequent Buyers'] },
  { id:'s2',  name:'Health & Wellness Enthusiasts',category:'Interest',          desc:'Users interested in fitness, organic products, and healthy lifestyle',                  users:5.1,  price:4.20, model:'CPM', tags:['Fitness','Organic','Wellness'] },
  { id:'s3',  name:'New Parents (0-12 months)',    category:'Life Stage',         desc:'Households with newborns, high intent for baby products',                             users:1.8,  price:4.80, tags:['Parents','Baby Products'] },
  { id:'s4',  name:'Tech Early Adopters',          category:'Interest',           desc:'First movers on technology products and gadgets',                                     users:3.2,  price:3.90, model:'CPE', tags:['Technology','Gadgets','Innovation'] },
  { id:'s5',  name:'Luxury Brand Buyers',          category:'Purchase Behavior',  desc:'Consumers who regularly purchase premium and luxury brands',                          users:0.89, price:6.80, model:'CPM', tags:['Premium','Luxury','High Income'] },
  { id:'s6',  name:'Pet Owners - Dogs',            category:'Lifestyle',          desc:'Verified dog owners with regular pet product purchases',                              users:4.5,  price:2.55, cpe:2.2,  tags:['Pets','Dogs','Pet Products'] },
  { id:'s7',  name:'Home Improvement Intenders',   category:'Intent',             desc:'Users showing intent for home renovation and DIY projects',                          users:2.8,  price:3.60, model:'CPE', tags:['Home','DIY','Renovation'] },
  { id:'s8',  name:'Eco-Conscious Consumers',      category:'Values',             desc:'Environmentally aware shoppers preferring sustainable products',                     users:3.6,  price:2.70, tags:['Sustainable','Eco-Friendly','Green'] },
  { id:'s9',  name:'Frequent Travelers',           category:'Lifestyle',          desc:'Users booking flights or hotels at least four times a year',                         users:2.1,  price:4.50, model:'CPE', tags:['Travel','Hotels','Airlines'] },
  { id:'s10', name:'Gaming Enthusiasts',           category:'Interest',           desc:'Active console and PC gamers engaging with gaming content weekly',                   users:4.8,  price:3.50, model:'CPM', tags:['Gaming','Consoles','Esports'] },
  { id:'s11', name:'Fitness Buffs',                category:'Lifestyle',          desc:'Gym members and activewear purchasers with weekly workout habits',                   users:3.9,  price:2.65, tags:['Gym','Activewear','Supplements'] },
  { id:'s12', name:'College Students',             category:'Life Stage',         desc:'Enrolled students aged 18-24 with budget-driven shopping patterns',                 users:5.6,  price:2.45, tags:['Students','Budget','Campus'] },
  { id:'s13', name:'Working Professionals',        category:'Life Stage',         desc:'Full-time professionals aged 25-45 in metro areas',                                 users:6.2,  price:3.80, cpe:2.4,  tags:['Career','Office','Commuters'] },
  { id:'s14', name:'Beauty & Skincare Shoppers',   category:'Purchase Behavior',  desc:'Repeat purchasers of beauty, skincare, and cosmetics products',                     users:3.4,  price:5.10, model:'CPM', tags:['Beauty','Skincare','Cosmetics'] },
  { id:'s15', name:'Foodies & Home Chefs',         category:'Interest',           desc:'Users engaging with cooking content and gourmet ingredient purchases',               users:2.9,  price:2.60, tags:['Cooking','Gourmet','Recipes'] },
  { id:'s16', name:'Auto Intenders',               category:'Intent',             desc:'In-market users researching vehicle purchases in the next 6 months',                 users:1.4,  price:4.10, tags:['Cars','Auto','Test Drive'] },
];

const PENDING_DEFAULT = new Set(['s3', 's16']);

const ACTIONS = [
  { id:'dsp',       title:'Push to DSP',                  desc:'Activate this audience directly in your preferred Demand-Side Platform for immediate campaign targeting', iconBg:'#EAF1FC', iconColor:'var(--primary)' },
  { id:'lookalike', title:'Seed for Look-alike Audience', desc:'Use this audience as a seed to generate similar high-value prospects and expand your reach',              iconBg:'#F3EEFE', iconColor:'#7C3AED' },
  { id:'enrich',    title:'Enrich Audience',              desc:'Enhance this audience with additional data attributes for deeper insights and better targeting',          iconBg:'#FEF3DC', iconColor:'#D9930B' },
];

const CHANNELS = [
  { id:'dv360',    label:'DV360' },
  { id:'meta',     label:'Meta' },
  { id:'google',   label:'Google' },
  { id:'snapchat', label:'Snapchat' },
  { id:'tiktok',   label:'TikTok' },
];

const EXPANSION_SIZES = ['1%', '3%', '5%', '10%'];
const OPTIMIZE_FOR = [
  { id:'purchase', title:'Purchase',   desc:'Optimize for completed purchases' },
  { id:'cart',     title:'Add to Cart',desc:'Optimize for cart additions' },
  { id:'ltv',      title:'High LTV',   desc:'Optimize for high lifetime value' },
];
const ENRICH_AUDIENCES = [
  { id:'luxury',    name:'Luxury Shoppers',  size:'2.4M', desc:'Users with affinity for luxury brands' },
  { id:'travel',    name:'Travel Intenders', size:'5.1M', desc:'Active travel planners and bookers' },
  { id:'newparents',name:'New Parents',      size:'1.8M', desc:'Parents with children under 2 years' },
  { id:'highincome',name:'High Income HH',   size:'3.2M', desc:'Household income $150K+' },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
function fmtUsers(n) { return n >= 1 ? `${n.toFixed(1).replace(/\.0$/, '')}M` : `${Math.round(n * 1000)}K`; }
function fmtPrice(n) { return `$${n.toFixed(2)}`; }

/* ─── Small shared pieces ─────────────────────────────────────── */
function CategoryBadge({ label }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:999, fontSize:11, fontWeight:600, background:BG_SUBTLE, color:FG_MUTED, border:`1px solid ${BORDER}`, whiteSpace:'nowrap' }}>
      {label}
    </span>
  );
}

function TagPill({ label }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 8px', borderRadius:6, fontSize:11, fontWeight:500, background:PRIMARY_BG, color:PRIMARY, whiteSpace:'nowrap' }}>
      {label}
    </span>
  );
}

function CheckBox({ checked }) {
  return (
    <span style={{ width:18, height:18, borderRadius:'var(--radius-sm)', flexShrink:0, border:`1.5px solid ${checked ? PRIMARY : BORDER}`, background:checked ? PRIMARY : BG, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
      {checked && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </span>
  );
}

function CheckIcon({ color = GREEN }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ─── Segment Card ────────────────────────────────────────────── */
function SegmentCard({ segment: s, purchased, pending, onPurchase, onActivate }) {
  return (
    <div style={{ background:BG, border:`1px solid ${purchased ? GREEN : BORDER}`, borderRadius:10, display:'flex', flexDirection:'column', overflow:'hidden', transition:'box-shadow 0.15s', minHeight:243, fontFamily:FONT }}>
      {/* Top section */}
      <div style={{ padding:'14px 16px 0', display:'flex', flexDirection:'column', gap:10, flex:1 }}>
        {/* Name + badge */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
          <div style={{ fontSize:14, fontWeight:600, color:FG, lineHeight:1.3 }}>{s.name}</div>
          {purchased ? (
            <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600, color:GREEN, flexShrink:0 }}>
              <CheckIcon /> Purchased
            </span>
          ) : pending ? (
            <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600, color:AMBER, flexShrink:0 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:AMBER }} /> Pending approval
            </span>
          ) : (
            <div style={{ flexShrink:0 }}><CategoryBadge label={s.category} /></div>
          )}
        </div>
        {/* Desc */}
        <div style={{ fontSize:12, color:FG_MUTED, lineHeight:1.5 }}>{s.desc}</div>
        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, minHeight:22 }}>
          {s.tags.map(t => <TagPill key={t} label={t} />)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop:`1px solid #EDF0F5`, margin:'0 16px' }} />

      {/* Stats row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px' }}>
        <span style={{ textAlign:'left' }}>
          <span style={{ fontSize:16, fontWeight:700, color:FG }}>{fmtUsers(s.users)}</span>
          <span style={{ display:'block', fontSize:10, color:'#7b7b7b', lineHeight:1.2 }}>Users</span>
        </span>
        <span style={{ display:'inline-flex', alignItems:'flex-start', gap:20 }}>
          <span style={{ textAlign:'right' }}>
            <span style={{ fontSize:16, fontWeight:700, color:PRIMARY }}>{fmtPrice(s.price)}</span>
            <span style={{ display:'block', fontSize:10, color:'#7b7b7b', lineHeight:1.2 }}>{s.model || 'CPM'}</span>
          </span>
          {s.cpe != null && (
            <span style={{ textAlign:'right' }}>
              <span style={{ fontSize:16, fontWeight:700, color:PRIMARY }}>{fmtPrice(s.cpe)}</span>
              <span style={{ display:'block', fontSize:10, color:'#7b7b7b', lineHeight:1.2 }}>CPE</span>
            </span>
          )}
        </span>
      </div>

      {/* CTA */}
      <div style={{ padding:'6px 16px 14px', display:'flex', flexDirection:'column', gap:6 }}>
        <button
          disabled={purchased || pending}
          onClick={purchased || pending ? undefined : () => onPurchase(s)}
          style={{ width:'100%', padding:'8px 0', borderRadius:'var(--radius-md)', border:`1px solid ${purchased || pending ? BORDER : PRIMARY}`, background: purchased || pending ? BG_SUBTLE : 'transparent', fontSize:12, fontWeight:600, color: purchased || pending ? FG_MUTED : PRIMARY, cursor: purchased || pending ? 'not-allowed' : 'pointer', transition:'all 0.15s', fontFamily:FONT }}
          onMouseEnter={e => { if (!purchased && !pending) e.currentTarget.style.background = PRIMARY_BG; }}
          onMouseLeave={e => { if (!purchased && !pending) e.currentTarget.style.background = 'transparent'; }}
        >
          {purchased ? 'Added to your audiences' : pending ? 'Purchase pending' : 'Purchase audience'}
        </button>
        {purchased && (
          <button
            onClick={() => onActivate(s)}
            style={{ width:'100%', padding:'8px 0', borderRadius:'var(--radius-md)', border:'none', background:PRIMARY, fontSize:12, fontWeight:600, color:'#fff', cursor:'pointer', transition:'opacity 0.15s', fontFamily:FONT }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Purchase Confirmation Modal ─────────────────────────────── */
function PurchaseModal({ segment: s, onClose, onConfirm }) {
  const prices = [{ model: s.model || 'CPM', amount: s.price }, ...(s.cpe != null ? [{ model: 'CPE', amount: s.cpe }] : [])];
  return createPortal(
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(15,23,42,0.45)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()} style={{ width:460, maxWidth:'100%', background:BG, borderRadius:12, overflow:'hidden', boxShadow:'0 20px 48px rgba(0,0,0,0.24)', display:'flex', flexDirection:'column' }}>
        {/* Header */}
        <div style={{ background:'#E8F1FC', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <span style={{ fontSize:14, fontWeight:600, color:FG }}>Confirm Purchase</span>
          <button onClick={onClose} style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', cursor:'pointer', color:FG_MUTED }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        {/* Body */}
        <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ border:`1px solid ${BORDER}`, borderRadius:10, background:'#FAFAFA', padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:FG, lineHeight:1.3 }}>{s.name}</div>
            <div style={{ fontSize:12, color:FG_MUTED, lineHeight:1.5, marginTop:4 }}>{s.desc}</div>
            <div style={{ borderTop:`1px solid #EDF0F5`, margin:'14px 0 12px' }} />
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, color:FG_MUTED }}>Audience Size</span>
                <span style={{ fontSize:14, fontWeight:600, color:FG }}>{fmtUsers(s.users)}</span>
              </div>
              {prices.map(p => (
                <div key={p.model} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:13, color:FG_MUTED }}>
                    Price · {p.model} <span style={{ color:FG_SUBTLE }}>({p.model === 'CPE' ? 'per engagement' : 'per 1K impressions'})</span>
                  </span>
                  <span style={{ fontSize:16, fontWeight:700, color:PRIMARY }}>{fmtPrice(p.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Terms note */}
          <div style={{ display:'flex', gap:10, alignItems:'flex-start', background:'#FEF8F0', border:'1px solid #F7D6B0', borderRadius:8, padding:'12px 14px', fontSize:12, color:'#7b7b7b', lineHeight:1.5 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7b7b7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>By purchasing this audience, you agree to the data usage terms and privacy compliance requirements.</span>
          </div>
        </div>
        {/* Footer */}
        <div style={{ background:'#E8F1FC', padding:'14px 20px', display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'8px 18px', borderRadius:'var(--radius-md)', border:`1px solid ${BORDER}`, background:BG, fontSize:13, fontWeight:600, color:FG, cursor:'pointer', fontFamily:FONT }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding:'8px 18px', borderRadius:'var(--radius-md)', border:'none', background:PRIMARY, fontSize:13, fontWeight:600, color:'#fff', cursor:'pointer', fontFamily:FONT }}>Confirm Purchase</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── Activation Drawer ───────────────────────────────────────── */
function ActivationDrawer({ segment: s, onClose, onActivate }) {
  const [selectedAction, setSelectedAction]   = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(new Set());
  const [expandSize, setExpandSize]           = useState(null);
  const [optimizeFor, setOptimizeFor]         = useState(null);
  const [enrichAudience, setEnrichAudience]   = useState(null);

  const toggleAction = (id) => {
    setSelectedAction(prev => prev === id ? null : id);
    setSelectedChannels(new Set());
    setExpandSize(null);
    setOptimizeFor(null);
    setEnrichAudience(null);
  };

  const toggleChannel = (id) => {
    setSelectedChannels(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const hasAction   = !!selectedAction;
  const hasChannels = selectedChannels.size > 0;
  const isLookalike = selectedAction === 'lookalike';
  const isEnrich    = selectedAction === 'enrich';
  const channelLabel = (CHANNELS.find(c => selectedChannels.has(c.id)) || {}).label || 'DV360';
  const canSubmit   = hasAction && hasChannels && (!isLookalike || (expandSize && optimizeFor)) && (!isEnrich || enrichAudience);

  return createPortal(
    <>
      <style>{`@keyframes slideInActivate { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.45)', zIndex:1100 }} />
      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:1252, maxWidth:'100vw', background:BG, boxShadow:'0 20px 48px rgba(0,0,0,0.24)', zIndex:1101, display:'flex', flexDirection:'column', fontFamily:FONT, animation:'slideInActivate 0.22s ease-out' }}>
        {/* Drawer header */}
        <div style={{ padding:'18px 28px', borderBottom:`1px solid ${BORDER}`, background:'#E8F1FC', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div>
            <h2 style={{ margin:0, fontSize:15, fontWeight:600, color:FG }}>Activate Audience</h2>
            <div style={{ fontSize:12, color:FG_MUTED, marginTop:2 }}>{s.name} · {fmtUsers(s.users)} users</div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', cursor:'pointer', color:FG_MUTED }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Drawer body */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px', display:'flex', flexDirection:'column', gap:28 }}>

          {/* Select Action */}
          <div>
            <label style={{ fontSize:14, fontWeight:600, color:FG, display:'block', marginBottom:12 }}>Select an Action</label>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
              {ACTIONS.map(a => {
                const active = selectedAction === a.id;
                return (
                  <button key={a.id} onClick={() => toggleAction(a.id)}
                    style={{ display:'flex', alignItems:'flex-start', gap:12, textAlign:'left', padding:16, borderRadius:10, fontFamily:FONT, cursor:'pointer', border:`1px solid ${active ? PRIMARY : BORDER}`, background:active ? PRIMARY_BG : BG, transition:'all 0.15s' }}>
                    <CheckBox checked={active} />
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      <span style={{ width:36, height:36, borderRadius:8, background:a.iconBg, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {a.id === 'dsp'       && <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>}
                          {a.id === 'lookalike' && <><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></>}
                          {a.id === 'enrich'    && <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>}
                        </svg>
                      </span>
                      <span style={{ fontSize:14, fontWeight:600, color:FG, lineHeight:1.3 }}>{a.title}</span>
                      <span style={{ fontSize:12, color:FG_MUTED, lineHeight:1.5 }}>{a.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Channel */}
          <div style={{ opacity: hasAction ? 1 : 0.5 }}>
            <label style={{ fontSize:14, fontWeight:600, color:FG, display:'block', marginBottom:12 }}>Select Channel</label>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10 }}>
              {CHANNELS.map(ch => {
                const active = selectedChannels.has(ch.id);
                return (
                  <button key={ch.id} onClick={() => hasAction && toggleChannel(ch.id)} disabled={!hasAction}
                    style={{ display:'flex', alignItems:'center', gap:10, textAlign:'left', padding:'10px 14px', borderRadius:'var(--radius-md)', fontFamily:FONT, cursor: hasAction ? 'pointer' : 'not-allowed', border:`1px solid ${active ? PRIMARY : BORDER}`, background: active ? PRIMARY_BG : BG, fontSize:13, fontWeight:500, color:FG, transition:'all 0.15s' }}>
                    <CheckBox checked={active} />
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                      <ChannelIcon id={ch.id} />
                      {ch.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lookalike options */}
          {isLookalike && hasChannels && (
            <>
              <div>
                <label style={{ fontSize:14, fontWeight:600, color:FG, display:'block', marginBottom:12 }}>Expansion Size</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
                  {EXPANSION_SIZES.map(sz => {
                    const active = expandSize === sz;
                    return (
                      <button key={sz} onClick={() => setExpandSize(sz)}
                        style={{ height:44, borderRadius:'var(--radius-md)', fontFamily:FONT, cursor:'pointer', fontSize:14, fontWeight:600, border:`1px solid ${active ? PRIMARY : BORDER}`, background: active ? PRIMARY_BG : BG, color: active ? PRIMARY : FG, transition:'all 0.15s' }}>
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={{ fontSize:14, fontWeight:600, color:FG, display:'block', marginBottom:12 }}>Optimized For</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
                  {OPTIMIZE_FOR.map(opt => {
                    const active = optimizeFor === opt.id;
                    return (
                      <button key={opt.id} onClick={() => setOptimizeFor(opt.id)}
                        style={{ display:'flex', alignItems:'flex-start', gap:12, textAlign:'left', padding:16, borderRadius:10, fontFamily:FONT, cursor:'pointer', border:`1px solid ${active ? PRIMARY : BORDER}`, background: active ? PRIMARY_BG : BG, transition:'all 0.15s' }}>
                        <CheckBox checked={active} />
                        <span>
                          <span style={{ display:'block', fontSize:14, fontWeight:600, color:FG }}>{opt.title}</span>
                          <span style={{ display:'block', fontSize:12, color:FG_MUTED, marginTop:2 }}>{opt.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Enrich options */}
          {isEnrich && hasChannels && (
            <div>
              <label style={{ fontSize:14, fontWeight:600, color:FG, display:'block', marginBottom:12 }}>Available Audiences from {channelLabel}</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
                {ENRICH_AUDIENCES.map(ea => {
                  const active = enrichAudience === ea.id;
                  return (
                    <button key={ea.id} onClick={() => setEnrichAudience(ea.id)}
                      style={{ display:'flex', alignItems:'flex-start', gap:12, textAlign:'left', padding:16, borderRadius:10, fontFamily:FONT, cursor:'pointer', border:`1px solid ${active ? PRIMARY : BORDER}`, background: active ? PRIMARY_BG : BG, transition:'all 0.15s' }}>
                      <CheckBox checked={active} />
                      <span style={{ display:'flex', flexDirection:'column', gap:4 }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:14, fontWeight:600, color:FG }}>{ea.name}</span>
                          <span style={{ fontSize:11, fontWeight:600, color:FG_MUTED, background:BG_SUBTLE, border:`1px solid ${BORDER}`, borderRadius:999, padding:'1px 8px' }}>{ea.size}</span>
                        </span>
                        <span style={{ fontSize:12, color:FG_MUTED, lineHeight:1.5 }}>{ea.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div style={{ padding:'14px 28px', borderTop:`1px solid ${BORDER}`, background:'#E8F1FC', flexShrink:0, display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'8px 18px', borderRadius:'var(--radius-md)', border:`1px solid ${BORDER}`, background:BG, fontSize:13, fontWeight:600, color:FG, cursor:'pointer', fontFamily:FONT }}>Cancel</button>
          <button onClick={() => onActivate(selectedAction, selectedChannels)} disabled={!canSubmit}
            style={{ padding:'8px 18px', borderRadius:'var(--radius-md)', border:'none', background: canSubmit ? PRIMARY : 'var(--primary-tint-1)', fontSize:13, fontWeight:600, color:'#fff', cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily:FONT }}>
            Submit Request
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ─── Channel icon ────────────────────────────────────────────── */
function ChannelIcon({ id }) {
  if (id === 'dv360')    return <span style={{ width:16, height:16, borderRadius:3, background:'#1A73E8', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:7, fontWeight:700, color:'#fff', letterSpacing:'-0.5px' }}>DV</span>;
  if (id === 'meta')     return <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === 'google')   return <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
  if (id === 'snapchat') return <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFC00" stroke="#111" strokeWidth="0.6"><path d="M12 2c2.7 0 4.4 2 4.5 4.6 0 .6 0 1.2-.1 1.7.3.2.7.2 1 .1.6-.2 1.2.5.8 1.1-.3.5-1 .7-1.5.9-.2.6.9 2.2 2.6 2.8.5.2.4.9-.1 1-.4.1-.8.4-.9.8 0 .3-.4.4-1 .3-.7-.1-1.4 0-1.9.5-.7.7-1.6 1.3-3.4 1.3s-2.7-.6-3.4-1.3c-.5-.5-1.2-.6-1.9-.5-.6.1-1 0-1-.3-.1-.4-.5-.7-.9-.8-.5-.1-.6-.8-.1-1 1.7-.6 2.8-2.2 2.6-2.8-.5-.2-1.2-.4-1.5-.9-.4-.6.2-1.3.8-1.1.3.1.7.1 1-.1-.1-.5-.1-1.1-.1-1.7C7.6 4 9.3 2 12 2z"/></svg>;
  if (id === 'tiktok')   return <svg width="15" height="15" viewBox="0 0 24 24" fill="#000"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>;
  return null;
}

/* ─── My Purchases Drawer ─────────────────────────────────────── */
function MyPurchasesDrawer({ purchased, segments, onClose, onRemove }) {
  const items = segments.filter(s => purchased.has(s.id));
  return createPortal(
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.35)', zIndex:900 }} />
      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:480, maxWidth:'100vw', background:BG, boxShadow:'0 20px 48px rgba(0,0,0,0.2)', zIndex:901, display:'flex', flexDirection:'column', fontFamily:FONT }}>
        <div style={{ padding:'18px 24px', borderBottom:`1px solid ${BORDER}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <h2 style={{ margin:0, fontSize:15, fontWeight:700, color:FG }}>My purchases</h2>
            <div style={{ fontSize:12, color:FG_MUTED, marginTop:2 }}>
              {items.length ? `${items.length} audience segment${items.length === 1 ? '' : 's'} available for targeting` : 'Purchased audience segments appear here'}
            </div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', cursor:'pointer', color:FG_MUTED }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:20 }}>
          {items.length === 0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, textAlign:'center', padding:'40px 24px' }}>
              <span style={{ width:48, height:48, borderRadius:'50%', background:BG_SUBTLE, border:`1px solid ${BORDER}`, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={FG_SUBTLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </span>
              <span style={{ fontSize:13, color:FG_MUTED, lineHeight:1.5, maxWidth:320 }}>You haven't purchased any audience segments yet. Purchased segments become available in campaign targeting.</span>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {items.map(s => (
                <div key={s.id} style={{ border:`1px solid ${BORDER}`, borderRadius:8, padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:FG, display:'flex', alignItems:'center', gap:6 }}>
                      <CheckIcon /> {s.name}
                    </div>
                    <div style={{ fontSize:11, color:FG_MUTED, marginTop:2 }}>{s.category} · {fmtUsers(s.users)} users · {fmtPrice(s.price)} {s.model || 'CPM'}</div>
                  </div>
                  <button onClick={() => onRemove(s.id)} style={{ padding:'5px 12px', borderRadius:'var(--radius-md)', border:`1px solid ${BORDER}`, background:'transparent', fontSize:12, fontWeight:600, color:FG_MUTED, cursor:'pointer', whiteSpace:'nowrap', fontFamily:FONT }}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

/* ─── Toast ───────────────────────────────────────────────────── */
function Toast({ msg, onDismiss }) {
  return createPortal(
    <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:9999, background:'#2e7d32', color:'#fff', padding:'13px 20px', borderRadius:10, fontSize:14, fontWeight:500, boxShadow:'0 6px 24px rgba(0,0,0,0.22)', display:'flex', alignItems:'center', gap:12, minWidth:280, maxWidth:440, animation:'slideDown 0.25s ease', whiteSpace:'nowrap' }}>
      <div style={{ width:24, height:24, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span style={{ flex:1 }}>{msg}</span>
      <button onClick={onDismiss} style={{ border:'none', background:'none', color:'rgba(255,255,255,0.85)', cursor:'pointer', fontSize:18, lineHeight:1, padding:0, marginLeft:4, fontWeight:300 }}>×</button>
    </div>,
    document.body
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function AudienceMarketplacePage() {
  const [query,          setQuery]          = useState('');
  const [purchaseModal,  setPurchaseModal]  = useState(null);   // segment to confirm
  const [activatePanel,  setActivatePanel]  = useState(null);   // segment to activate
  const [purchased,      setPurchased]      = useState(new Set());
  const [showMyPurchases,setShowMyPurchases] = useState(false);
  const [toast,          setToast]          = useState(null);
  const [successData,    setSuccessData]    = useState(null);   // { segment, action, channelLabel }

  // Derived: filtered + sorted
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...SEGMENTS
      .filter(s => !q || `${s.name} ${s.desc} ${s.category} ${s.tags.join(' ')}`.toLowerCase().includes(q))
    ].sort((a, b) => b.users - a.users);
  }, [query]);

  const myPurchasedList = SEGMENTS.filter(s => purchased.has(s.id));

  function handleConfirmPurchase() {
    const s = purchaseModal;
    setPurchased(prev => new Set(prev).add(s.id));
    setPurchaseModal(null);
    setActivatePanel(s);
  }

  function handleActivate(action, channels) {
    const channelLabel = (CHANNELS.find(c => channels.has(c.id)) || {}).label || 'DV360';
    setSuccessData({ segment: activatePanel, action, channelLabel });
    setActivatePanel(null);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function handleRemove(id) {
    setPurchased(prev => { const n = new Set(prev); n.delete(id); return n; });
    showToast(`Audience removed from your purchases`);
  }

  const totalReach = SEGMENTS.reduce((acc, s) => acc + s.users, 0);

  const stats = [
    { label: 'Audience Segments', value: SEGMENTS.length },
    { label: 'Total Reach',       value: `${fmtUsers(totalReach)}+` },
    { label: 'My Purchases',      value: 10 + purchased.size },
    { label: 'Pending Purchases', value: String(PENDING_DEFAULT.size).padStart(2, '0') },
  ];

  return (
    <div style={{ fontFamily:FONT, background:'var(--bg-screen-2, var(--surface-1))', minHeight:'100%' }}>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-12px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }`}</style>

      {/* ── Stats cards ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, padding:'16px 24px 20px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:BG, border:`1px solid ${BORDER}`, borderRadius:10, padding:12, display:'flex', flexDirection:'column', gap:4 }}>
            <span style={{ fontSize:13, fontWeight:500, color:FG_MUTED }}>{s.label}</span>
            <span style={{ fontSize:18, fontWeight:500, color:FG, lineHeight:1.2 }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* ── Main card ── */}
      <div style={{ margin:'0 24px 24px', background:BG, border:`1px solid ${BORDER}`, borderRadius:12 }}>

        {/* Sticky toolbar */}
        <div style={{ position:'sticky', top:0, zIndex:10, background:BG, borderRadius:'12px 12px 0 0', padding:'14px 20px', borderBottom:`1px solid ${BORDER}` }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            <h2 style={{ margin:0, fontSize:15, fontWeight:700, color:FG }}>Available Audience Segments</h2>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              {/* Search */}
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 12px', height:40, borderRadius:8, border:`1px solid ${BORDER}`, background:BG, width:220 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={FG_MUTED} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search audiences…"
                  style={{ border:'none', outline:'none', background:'transparent', fontSize:13, color:FG, width:'100%', fontFamily:FONT }} />
              </div>
              {/* My purchases button */}
              <button onClick={() => setShowMyPurchases(true)}
                style={{ display:'inline-flex', alignItems:'center', gap:6, height:40, padding:'0 14px', borderRadius:8, border:`1px solid ${BORDER}`, background:BG, fontSize:13, fontWeight:500, color:FG, cursor:'pointer', fontFamily:FONT }}
                onMouseEnter={e => e.currentTarget.style.background = BG_SUBTLE}
                onMouseLeave={e => e.currentTarget.style.background = BG}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={FG_MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                My purchases
                {purchased.size > 0 && (
                  <span style={{ minWidth:16, height:16, borderRadius:8, padding:'0 4px', background:PRIMARY, color:'#fff', fontSize:10, fontWeight:700, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>{purchased.size}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding:20 }}>
          {filtered.length === 0 ? (
            <div style={{ padding:'40px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12, textAlign:'center' }}>
              <span style={{ width:48, height:48, borderRadius:'50%', background:BG_SUBTLE, border:`1px solid ${BORDER}`, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={FG_SUBTLE} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <span style={{ fontSize:13, color:FG_MUTED, lineHeight:1.5 }}>No audience segments match "{query.trim()}".</span>
              <button onClick={() => setQuery('')} style={{ padding:'7px 16px', borderRadius:'var(--radius-md)', border:`1px solid ${BORDER}`, background:'transparent', fontSize:12, fontWeight:600, color:PRIMARY, cursor:'pointer', fontFamily:FONT }}>Clear search</button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(270px, 1fr))', gap:16 }}>
              {filtered.map(s => (
                <SegmentCard
                  key={s.id}
                  segment={s}
                  purchased={purchased.has(s.id)}
                  pending={PENDING_DEFAULT.has(s.id) && !purchased.has(s.id)}
                  onPurchase={setPurchaseModal}
                  onActivate={setActivatePanel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals & drawers ── */}
      {purchaseModal && (
        <PurchaseModal
          segment={purchaseModal}
          onClose={() => setPurchaseModal(null)}
          onConfirm={handleConfirmPurchase}
        />
      )}
      {activatePanel && (
        <ActivationDrawer segment={activatePanel} onClose={() => setActivatePanel(null)} onActivate={handleActivate} />
      )}
      {showMyPurchases && (
        <MyPurchasesDrawer
          purchased={purchased}
          segments={SEGMENTS}
          onClose={() => setShowMyPurchases(false)}
          onRemove={handleRemove}
        />
      )}
      {toast && <Toast msg={toast} onDismiss={() => setToast(null)} />}

      {/* ── Success modal (createPortal, matches PurchaseModal style) ── */}
      {successData && createPortal(
        <div onClick={() => setSuccessData(null)} style={{ position:'fixed', inset:0, zIndex:1200, background:'rgba(15,23,42,0.45)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:FONT }}>
          <div onClick={e => e.stopPropagation()} style={{ width:480, maxWidth:'100%', background:BG, borderRadius:12, overflow:'hidden', boxShadow:'0 20px 48px rgba(0,0,0,0.24)', display:'flex', flexDirection:'column' }}>
            {/* Header */}
            <div style={{ background:'#E8F1FC', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <span style={{ fontSize:14, fontWeight:600, color:FG }}>Request Submitted</span>
              <button onClick={() => setSuccessData(null)} style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', cursor:'pointer', color:FG_MUTED }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Body */}
            <div style={{ padding:'32px 24px 28px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
              {/* Green check circle */}
              <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--alert-success-bg)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--alert-success-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              {/* Title */}
              <h2 style={{ margin:'0 0 10px', fontSize:20, fontWeight:700, color:'var(--text-strong)', letterSpacing:'-0.01em', lineHeight:1.25 }}>
                Request Submitted Successfully
              </h2>
              {/* Description */}
              <p style={{ margin:0, fontSize:13, color:'var(--text-muted)', lineHeight:1.7, maxWidth:360 }}>
                Your {successData.action.replace(/-/g,' ')} request for "{successData.segment.name}" has been submitted to {successData.channelLabel}. You will receive a notification once processing is complete.
              </p>
            </div>
            {/* Footer */}
            <div style={{ background:'#E8F1FC', padding:'14px 20px', display:'flex' }}>
              <button
                onClick={() => setSuccessData(null)}
                style={{ flex:1, padding:'10px 0', borderRadius:'var(--radius-md)', border:'none', background:PRIMARY, fontSize:13, fontWeight:600, color:'#fff', cursor:'pointer', fontFamily:FONT, transition:'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
