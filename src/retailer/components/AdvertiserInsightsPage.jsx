import React from 'react';
import { Icon } from '../../ui/atoms/Icon';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart, Bar, Area,
  PieChart, Pie, Cell,
} from 'recharts';

/* ── tokens ───────────────────────────────────────────────────── */
const WHITE  = 'var(--osmos-bg)';
const BORDER = 'var(--osmos-border)';
const ACCENT = 'var(--osmos-brand-primary)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const GREEN  = 'var(--alert-success-primary)';          // semantic positive — keep
const RED    = 'var(--alert-error-primary)';          // semantic negative — keep
const ORANGE = 'var(--osmos-brand-amber)';
const COLORS = ['var(--osmos-brand-primary)','#8B5CF6','#10B981','#F59E0B','#EC4899']; // chart palette

/* ── Local icon aliases (use imported Icon atom) ─────────────── */
const ChevDown = ({ size = 11, color = TEXT_MID }) =>
  <Icon size={size} color={color}><polyline points="6 9 12 15 18 9"/></Icon>;
const InfoIcon = ({ color = TEXT_LO }) =>
  <Icon size={13} color={color}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const FilterIcon = () =>
  <Icon size={13} color={TEXT_MID}><path d="M4 6h16M7 12h10M10 18h4"/></Icon>;
const SearchIcon = () =>
  <Icon size={13} color={TEXT_LO}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const DlIcon = () =>
  <Icon size={13} color={TEXT_MID}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const ColIcon = () =>
  <Icon size={13} color={TEXT_MID}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></Icon>;
const SortIcon = () =>
  <Icon size={10} color={TEXT_LO}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></Icon>;

/* ── Badges ───────────────────────────────────────────────────── */
function StatusBadge({ s }) {
  const on = s === 'Active';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px',
      borderRadius:12, fontSize:11, fontWeight:500,
      background: on ? '#ECFDF5' : '#FEF3C7', color: on ? '#059669' : '#D97706' }}>
      <span style={{ width:5, height:5, borderRadius:'50%',
        background: on ? '#059669' : '#D97706', display:'inline-block' }} />
      {s}
    </span>
  );
}
function PersonaBadge({ p }) {
  const map = { Silver:['#F1F5F9','#64748B'], Gold:['#FEF9C3','#CA8A04'],
                Platinum:['#F3E8FF','#7C3AED'], Bronze:['#FEF3C7','#D97706'] };
  const [bg,fg] = map[p] || map.Silver;
  return (
    <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:10,
      fontSize:11, fontWeight:600, background:bg, color:fg }}>{p}</span>
  );
}

/* ── Funnel cards ─────────────────────────────────────────────── */
const FUNNEL = [
  { label:'Ad Revenue',     value:'$24.8 M', comp:'$25.1 M', pct:-1.5 },
  { label:'Ad Impression',  value:'8.4 B',   comp:'8.3 B',   pct:+0.6 },
  { label:'Ad Clicks',      value:'136.6 M', comp:'135.5 M', pct:-0.7 },
  { label:'ROAS',           value:'13.05',   comp:'12.05',   pct:+4.5 },
  { label:'Attributed GMV', value:'7.3 M',   comp:'8.9 M',   pct:+17.6 },
];
function FunnelCard({ stat, i, last }) {
  const pos = stat.pct >= 0;
  return (
    <div style={{ background:WHITE, flex:1, minWidth:0, padding:'10px 14px',
      borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`,
      borderRight: last ? `1px solid ${BORDER}` : 'none',
      borderLeft:`1px solid ${BORDER}`,
      borderRadius: i===0 ? '8px 0 0 8px' : last ? '0 8px 8px 0' : 0,
      position:'relative', display:'flex', flexDirection:'column', gap:4 }}>
      {!last && (
        <div style={{ position:'absolute', right:-10, top:'50%', transform:'translateY(-50%)',
          width:0, height:0, borderTop:'6px solid transparent',
          borderBottom:'6px solid transparent', borderLeft:`8px solid ${BORDER}`, zIndex:2 }}/>
      )}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, color:TEXT_MID, fontWeight:500 }}>{stat.label}</span>
        <InfoIcon />
      </div>
      <div style={{ fontSize:16, fontWeight:700, color:TEXT_HI, letterSpacing:'-0.3px', whiteSpace:'nowrap' }}>
        {stat.value}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ fontSize:10, color:TEXT_MID }}>{stat.comp}</span>
        <span style={{ fontSize:10, fontWeight:600, padding:'1px 4px', borderRadius:3,
          background: pos ? '#ECFDF5' : '#FEF2F2', color: pos ? GREEN : RED }}>
          {pos ? '▲' : '▼'} {Math.abs(stat.pct)}%
        </span>
      </div>
    </div>
  );
}

/* ── Chart data ───────────────────────────────────────────────── */
const DATES = ['05/07','05/08','05/09','05/10','05/11','05/12','05/13','05/14'];
const revenueCtData = DATES.map((d,i) => ({
  date:d, revenue:[22.1,23.4,21.8,24.1,25.2,23.8,24.8,24.5][i],
  ctr:[1.4,1.6,1.3,1.7,1.9,1.5,1.8,1.7][i],
}));
const clicksCpcData = DATES.map((d,i) => ({
  date:d, clicks:[128,132,125,134,139,135,137,136][i],
  cpc:[0.09,0.10,0.08,0.11,0.12,0.10,0.11,0.10][i],
}));

/* ── Toolbar ──────────────────────────────────────────────────── */
function Toolbar({ title, icon, count, countLabel }) {
  return (
    <div style={{ padding:'14px 20px', borderBottom:`1px solid var(--osmos-border)` }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, background:'#F0F4FF', borderRadius:6,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon size={13} color={ACCENT}>{icon}</Icon>
          </div>
          <span style={{ fontSize:14, fontWeight:600, color:TEXT_HI }}>{title}</span>
          {count != null && <span style={{ fontSize:11, color:TEXT_LO }}>({count} {countLabel})</span>}
          <InfoIcon />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ height:30, padding:'0 10px', display:'flex', alignItems:'center', gap:6,
            border:`1px solid ${BORDER}`, borderRadius:6 }}>
            <SearchIcon />
            <input placeholder="Search…" style={{ border:'none', outline:'none', fontSize:11,
              fontFamily:"'Open Sans',sans-serif", width:120, background:'transparent', color:'#333' }} />
          </div>
          <Btn icon={<FilterIcon />} label="Filter" />
          <Btn icon={<DlIcon />} label="Export" />
          {/* D / W toggle */}
          <div style={{ display:'flex', borderRadius:6, border:`1px solid ${BORDER}`, overflow:'hidden' }}>
            {['D','W'].map((l,i) => (
              <button key={l} style={{ width:30, height:30, border:'none', cursor:'pointer',
                fontSize:11, fontWeight:600, background: i===0 ? ACCENT : WHITE,
                color: i===0 ? '#fff' : TEXT_MID, fontFamily:"'Open Sans',sans-serif" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop:8 }}>
        <button style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:11, color:ACCENT, padding:0, fontFamily:"'Open Sans',sans-serif" }}>
          + Add a Filter
        </button>
      </div>
    </div>
  );
}
function Btn({ icon, label, primary }) {
  return (
    <button style={{ height:30, padding:'0 10px', display:'flex', alignItems:'center', gap:5,
      background: primary ? ACCENT : WHITE, color: primary ? '#fff' : TEXT_MID,
      border: primary ? 'none' : `1px solid ${BORDER}`, borderRadius:6,
      cursor:'pointer', fontSize:11, fontFamily:"'Open Sans',sans-serif", fontWeight: primary ? 600 : 400 }}>
      {icon}{label}
    </button>
  );
}

/* ── TH / TD ──────────────────────────────────────────────────── */
function TH({ children, sortable, align='left', nowrap=true }) {
  return (
    <th style={{ padding:'9px 14px', textAlign:align, fontWeight:500, color:TEXT_MID,
      fontSize:11, whiteSpace: nowrap ? 'nowrap' : 'normal',
      background:'var(--osmos-bg-muted)', borderBottom:`1px solid ${BORDER}` }}>
      <div style={{ display:'flex', alignItems:'center', gap:3,
        justifyContent: align==='right' ? 'flex-end' : 'flex-start' }}>
        {children}{sortable && <SortIcon />}
      </div>
    </th>
  );
}
function TD({ children, align='left', bold, accent, mono }) {
  return (
    <td style={{ padding:'9px 14px', fontSize:12, color: accent ? ACCENT : TEXT_HI,
      borderBottom:`1px solid var(--osmos-border)`, textAlign:align,
      fontWeight: bold ? 600 : 400,
      fontFamily: mono ? 'monospace' : "'Open Sans',sans-serif",
      cursor: accent ? 'pointer' : 'default',
      textDecoration:'none' }}>
      {children}
    </td>
  );
}
function TR({ children }) {
  return (
    <tr onMouseEnter={e=>e.currentTarget.style.background='#FAFBFF'}
        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      {children}
    </tr>
  );
}
function TotalRow({ children }) {
  return (
    <tr style={{ background:'#F8F9FC', fontWeight:600 }}>
      {children}
    </tr>
  );
}
function FooterNote() {
  return (
    <div style={{ padding:'8px 20px', borderTop:`1px solid var(--osmos-border)` }}>
      <span style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>1 Filter applicable: Date</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — Campaign Performance Report
   Columns: Campaign Name | Campaign Type | Campaign Status |
            Daily Budget | Ad Impressions | Ad Clicks | Attributed GMV
═══════════════════════════════════════════════════════════════ */
const CAMPAIGNS = [
  { name:'Spring Blossom Campaign',    type:'Display Product Ads',   status:'Active', budget:'$57', impr:'123K', clicks:'123K', gmv:'$852K'  },
  { name:'Summer Adventure Initiative',type:'Sponsored Product Ads', status:'Paused', budget:'$54', impr:'456K', clicks:'456K', gmv:'$413K'  },
  { name:'Autumn Harvest Drive',       type:'Carousel Ad',           status:'Active', budget:'$59', impr:'789K', clicks:'789K', gmv:'$678K'  },
  { name:'Winter Wonderland Project',  type:'In-Store Ad',           status:'Paused', budget:'$52', impr:'321K', clicks:'321K', gmv:'$239K'  },
  { name:'Community Care Campaign',    type:'Display Ad',            status:'Active', budget:'$60', impr:'654K', clicks:'654K', gmv:'$965K'  },
  { name:'Health & Wellness Initiative',type:'Video Ads',            status:'Paused', budget:'$55', impr:'987K', clicks:'987K', gmv:'$321K'  },
  { name:'Eco-Friendly Awareness Drive',type:'Social Media Ads',     status:'Active', budget:'$56', impr:'234K', clicks:'234K', gmv:'$704K'  },
  { name:'Tech for Tomorrow Campaign', type:'Product Ads',           status:'Paused', budget:'$58', impr:'567K', clicks:'567K', gmv:'$586K'  },
];
function CampaignTable() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Campaign performance report" count={CAMPAIGNS.length} countLabel="campaigns"
        icon={<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>}
      />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH sortable>Campaign Name</TH>
              <TH sortable>Campaign Type</TH>
              <TH>Campaign Status</TH>
              <TH sortable align="right">Daily Budget</TH>
              <TH sortable align="right">Ad Impressions</TH>
              <TH sortable align="right">Ad Clicks</TH>
              <TH sortable align="right">Attributed GMV</TH>
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map((r,i) => (
              <TR key={i}>
                <TD accent>{r.name}</TD>
                <TD>
                  <span style={{ padding:'2px 8px', borderRadius:4, fontSize:11,
                    background:'#F0F4FF', color:ACCENT, fontWeight:500 }}>{r.type}</span>
                </TD>
                <TD><StatusBadge s={r.status} /></TD>
                <TD align="right">{r.budget}</TD>
                <TD align="right">{r.impr}</TD>
                <TD align="right">{r.clicks}</TD>
                <TD align="right" bold>{r.gmv}</TD>
              </TR>
            ))}
            <TotalRow>
              <TD bold>Total</TD><TD /><TD />
              <TD align="right" bold>$53</TD>
              <TD align="right" bold>890K</TD>
              <TD align="right" bold>890K</TD>
              <TD align="right" bold>$490K</TD>
            </TotalRow>
          </tbody>
        </table>
      </div>
      <FooterNote />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — Advertiser Snapshot
   Columns: Category | Yet to advertised | Yet to topup |
            Yet to activate | Merchants w/ active campaigns & no SKUs |
            Merchant w/ budget & no active campaigns |
            About to exhaust merchants | About to churn merchants |
            Spending Merchants (Last 7d) | Overall GMV (Last 30d) |
            Total Ad Revenue (Last 30d)
═══════════════════════════════════════════════════════════════ */
const SNAPSHOT = [
  { cat:'Category 1', ytAdv:13, ytTopup:23, ytAct:23, actNoSku:42, budNoAct:27, exhaust:22, churn:27, spending:12, gmv:'$352 M',  revenue:'$450 M',  totalGmv:'$3.2 B', totalRev:'$13 B' },
  { cat:'Category 2', ytAdv:34, ytTopup:37, ytAct:37, actNoSku:51, budNoAct:34, exhaust:39, churn:30, spending:19, gmv:'$65 M',   revenue:'$300 M',  totalGmv:'$1.5 B', totalRev:'$700 M' },
  { cat:'Category 3', ytAdv:45, ytTopup:45, ytAct:45, actNoSku:37, budNoAct:39, exhaust:17, churn:24, spending:23, gmv:'$328 M',  revenue:'$650 M',  totalGmv:'$4.8 B', totalRev:'$4.5 B' },
  { cat:'Category 4', ytAdv:13, ytTopup:29, ytAct:29, actNoSku:48, budNoAct:31, exhaust:41, churn:29, spending:15, gmv:'$72 M',   revenue:'$700 M',  totalGmv:'$2.1 B', totalRev:'$500 M' },
  { cat:'Category 5', ytAdv:58, ytTopup:41, ytAct:41, actNoSku:55, budNoAct:36, exhaust:29, churn:26, spending:22, gmv:'$360 M',  revenue:'$520 M',  totalGmv:'$5 B',   totalRev:'$12 B' },
  { cat:'Category 6', ytAdv:21, ytTopup:34, ytAct:34, actNoSku:39, budNoAct:29, exhaust:12, churn:28, spending:17, gmv:'$68 M',   revenue:'$380 M',  totalGmv:'$3.7 B', totalRev:'$0.9 B' },
  { cat:'Category 7', ytAdv:25, ytTopup:48, ytAct:48, actNoSku:34, budNoAct:38, exhaust:45, churn:25, spending:26, gmv:'$340 M',  revenue:'$590 M',  totalGmv:'$4.3 B', totalRev:'$3.7 B' },
  { cat:'Category 8', ytAdv:29, ytTopup:26, ytAct:26, actNoSku:53, budNoAct:23, exhaust:36, churn:23, spending:14, gmv:'$75 M',   revenue:'$410 M',  totalGmv:'$2.9 B', totalRev:'$7 B' },
];
function NumCell({ v, warn }) {
  return (
    <td style={{ padding:'9px 14px', fontSize:12, color: warn && v > 40 ? RED : TEXT_HI,
      fontWeight: warn && v > 40 ? 600 : 400, textAlign:'right',
      borderBottom:`1px solid var(--osmos-border)` }}>{v}</td>
  );
}
function AdvertiserSnapshot() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Advertiser snapshot" count={SNAPSHOT.length} countLabel="categories"
        icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
      />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH sortable>Category L1</TH>
              <TH sortable align="right" nowrap={false}>Yet to advertised</TH>
              <TH sortable align="right" nowrap={false}>Yet to topup</TH>
              <TH sortable align="right" nowrap={false}>Yet to activate a campaign</TH>
              <TH sortable align="right" nowrap={false}>Merchants with active campaigns and no SKUs</TH>
              <TH sortable align="right" nowrap={false}>Merchant having budget and no active campaigns</TH>
              <TH sortable align="right" nowrap={false}>About to exhaust merchants</TH>
              <TH sortable align="right" nowrap={false}>About to churn merchants</TH>
              <TH sortable align="right" nowrap={false}>Spending Merchants (Last 7 days)</TH>
              <TH sortable align="right" nowrap={false}>Overall GMV (Last 30 days)</TH>
              <TH sortable align="right" nowrap={false}>Total Ad Revenue (Last 30 days)</TH>
            </tr>
          </thead>
          <tbody>
            {SNAPSHOT.map((r,i) => (
              <TR key={i}>
                <TD accent>{r.cat}</TD>
                <NumCell v={r.ytAdv} />
                <NumCell v={r.ytTopup} />
                <NumCell v={r.ytAct} />
                <NumCell v={r.actNoSku} warn />
                <NumCell v={r.budNoAct} warn />
                <NumCell v={r.exhaust} warn />
                <NumCell v={r.churn} />
                <NumCell v={r.spending} />
                <TD align="right">{r.gmv}</TD>
                <TD align="right">{r.revenue}</TD>
              </TR>
            ))}
            <TotalRow>
              <TD bold>Total</TD>
              {[112,90,100,89,102,114,99,89].map((v,i) => <td key={i} style={{ padding:'9px 14px', textAlign:'right', fontSize:12, fontWeight:600, background:'#F8F9FC' }}>{v}</td>)}
              <td style={{ padding:'9px 14px', textAlign:'right', fontSize:12, fontWeight:600, background:'#F8F9FC' }}>$3.5 B</td>
              <td style={{ padding:'9px 14px', textAlign:'right', fontSize:12, fontWeight:600, background:'#F8F9FC' }}>$20 B</td>
            </TotalRow>
          </tbody>
        </table>
      </div>
      <div style={{ padding:'8px 20px', borderTop:`1px solid var(--osmos-border)`, display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>Comparison mode not applicable • One Filter Applicable: Date</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — Budget Utilization Trend (bar + line combo)
═══════════════════════════════════════════════════════════════ */
const BUDGET_DATA = [
  { date:'05/08', pct:92,  ctr:1.4 },
  { date:'05/09', pct:87,  ctr:1.3 },
  { date:'05/10', pct:105, ctr:1.7 },
  { date:'05/11', pct:98,  ctr:1.5 },
  { date:'05/12', pct:115, ctr:1.9 },
  { date:'05/13', pct:88,  ctr:1.4 },
  { date:'05/14', pct:93,  ctr:1.6 },
];
function BudgetChart() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, overflow:'hidden', flex:1 }}>
      <div style={{ padding:'14px 20px', borderBottom:`1px solid var(--osmos-border)`,
        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, background:'#FFF0F0', borderRadius:6,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon size={13} color="#E53E3E"><path d="M18 20V10M12 20V4M6 20v-6"/></Icon>
          </div>
          <span style={{ fontSize:14, fontWeight:600, color:TEXT_HI }}>Budget Utilization Trend</span>
          <InfoIcon />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:10, height:10, borderRadius:2, background:'#10B981' }}/>
            <span style={{ fontSize:10, color:TEXT_MID }}>Budget Utilization %</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:12, height:2, background:ORANGE }}/>
            <span style={{ fontSize:10, color:TEXT_MID }}>CTR</span>
          </div>
          <button style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}><DlIcon /></button>
        </div>
      </div>
      <div style={{ padding:'12px 8px 8px' }}>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={BUDGET_DATA} margin={{ top:4, right:40, left:-10, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" domain={[0,130]} ticks={[30,60,90,120]}
              tickFormatter={v=>`${v}%`} tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" domain={[0,7]}
              ticks={[0,1.5,3,4.5,6]} tickFormatter={v=>`${v}M`}
              tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar yAxisId="left" dataKey="pct" fill="#10B981" opacity={0.75} radius={[3,3,0,0]} name="Budget Utilization %" />
            <Line yAxisId="right" type="monotone" dataKey="ctr" stroke={ORANGE} strokeWidth={2}
              dot={{ r:3, fill:ORANGE, strokeWidth:0 }} name="CTR" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — Movers and Shakers
   Columns: Advertiser ID | Product Ads Revenue | Display Ads Revenue |
            Offsite Ads Revenue | Ad Impressions | CTR | CPM |
            Attributed GMV | Attributed ROI
═══════════════════════════════════════════════════════════════ */
const MOVERS = [
  { id:'M12345', pRev:'$13.9 M', dRev:'$13.9 K', oRev:'$23 B',   impr:'13.9 M', ctr:'13.9%', cpm:'$9.5',  gmv:'$13.9 M', roi:'14.0 M' },
  { id:'M67890', pRev:'$13.9 M', dRev:'$13.3 K', oRev:'$13.9 M', impr:'13.9 M', ctr:'13.9%', cpm:'$8.7',  gmv:'$13.9 M', roi:'14.2 M' },
  { id:'M54321', pRev:'$13.9 M', dRev:'$17 K',   oRev:'$45.9 B', impr:'13.9 M', ctr:'13.9%', cpm:'$6.8',  gmv:'$13.9 M', roi:'14.0 M' },
  { id:'M98765', pRev:'$12.1 K', dRev:'$12.1 K', oRev:'$12.1 K', impr:'9.8 M',  ctr:'9.8%',  cpm:'$3.7',  gmv:'$12.1 K', roi:'10.0 M' },
  { id:'M13579', pRev:'$12.5 M', dRev:'$12.5 B', oRev:'-',       impr:'13.0 M', ctr:'13.0%', cpm:'$9.9',  gmv:'$12.5 M', roi:'14.0 M' },
  { id:'M24680', pRev:'$13.0 M', dRev:'$32 K',   oRev:'$43.0 M', impr:'-',      ctr:'-',     cpm:'$1.8',  gmv:'$13.0 M', roi:'$13.0 M' },
  { id:'M11223', pRev:'$14.5 M', dRev:'$34 K',   oRev:'$14.5 M', impr:'12.1 K', ctr:'12.1%', cpm:'$7.6',  gmv:'$14.5 M', roi:'12.5 K' },
  { id:'M44556', pRev:'$15.6 K', dRev:'$15.6 K', oRev:'$15.6 M', impr:'15.6 K', ctr:'15.6%', cpm:'-',     gmv:'$15.6 K', roi:'16.0 K' },
];
function MoversTable() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Movers And Shakers" count={MOVERS.length} countLabel="advertisers"
        icon={<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>}
      />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH sortable>Advertiser ID</TH>
              <TH sortable align="right">Product Ads Revenue</TH>
              <TH sortable align="right">Display Ads Revenue</TH>
              <TH sortable align="right">Offsite Ads Revenue</TH>
              <TH sortable align="right">Ad Impressions</TH>
              <TH sortable align="right">CTR</TH>
              <TH sortable align="right">CPM</TH>
              <TH sortable align="right">Attributed GMV</TH>
              <TH sortable align="right">Attributed ROI</TH>
            </tr>
          </thead>
          <tbody>
            {MOVERS.map((r,i) => (
              <TR key={i}>
                <TD accent mono>{r.id}</TD>
                <TD align="right" bold>{r.pRev}</TD>
                <TD align="right">{r.dRev}</TD>
                <TD align="right">{r.oRev}</TD>
                <TD align="right">{r.impr}</TD>
                <TD align="right">{r.ctr}</TD>
                <TD align="right">{r.cpm}</TD>
                <TD align="right" bold>{r.gmv}</TD>
                <TD align="right">{r.roi}</TD>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding:'8px 20px', borderTop:`1px solid var(--osmos-border)` }}>
        <span style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>Comparison mode not applicable • One Filter Applicable: Date</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — Ad Format Performance + Donut (side by side)
   Columns: Ad Format | Ad Revenue | Ad Clicks | Ad Impressions |
            CPC | CPM | Attributed View Products |
            Attributed Add to Cart | Attributed Orders (SKU) | Attributed GMV
═══════════════════════════════════════════════════════════════ */
const AD_FORMATS = [
  { fmt:'PLA Ad',             rev:'$23 M', clicks:'32 M', impr:'$23 M', cpc:'$0.10', cpm:'$0.10', viewProd:'32 M', addCart:'32 M', orders:'$54 M', gmv:'13' },
  { fmt:'Image Ad',           rev:'$3.7 M',clicks:'7.3 M',impr:'$3.7 M',cpc:'$0.25', cpm:'$0.25', viewProd:'7.3 M',addCart:'7.3 M',orders:'$15 M', gmv:'34' },
  { fmt:'Product Display Ad', rev:'$20 K', clicks:'25 K', impr:'$20 K', cpc:'$0.33', cpm:'$0.33', viewProd:'25 K', addCart:'25 K', orders:'$7.3 M',gmv:'45' },
  { fmt:'Product Display Ad', rev:'$12 M', clicks:'15 M', impr:'$12 M', cpc:'$0.45', cpm:'$0.45', viewProd:'15 M', addCart:'15 M', orders:'$25 K', gmv:'13' },
];
const DONUT_DATA = [
  { name:'PLA Ad',             value:42, color:ACCENT },
  { name:'Image Ad',           value:28, color:'#8B5CF6' },
  { name:'Product Display Ad', value:18, color:'#10B981' },
  { name:'Other',              value:12, color:ORANGE },
];
function AdFormatSection() {
  return (
    <div style={{ display:'flex', gap:16, marginBottom:16 }}>
      {/* Donut */}
      <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`,
        overflow:'hidden', width:300, flexShrink:0 }}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid var(--osmos-border)`,
          display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, background:'#F0F4FF', borderRadius:6,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={13} color={ACCENT}><circle cx="12" cy="12" r="10"/></Icon>
            </div>
            <span style={{ fontSize:14, fontWeight:600, color:TEXT_HI }}>Ad Format Performance Report</span>
          </div>
          <button style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}><DlIcon /></button>
        </div>
        <div style={{ padding:'16px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          {/* Donut chart with CPC in center */}
          <div style={{ position:'relative', width:180, height:180 }}>
            <PieChart width={180} height={180}>
              <Pie data={DONUT_DATA} cx={90} cy={90} innerRadius={55} outerRadius={85}
                dataKey="value" strokeWidth={0}>
                {DONUT_DATA.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
            {/* Center label */}
            <div style={{ position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)', textAlign:'center', pointerEvents:'none' }}>
              <div style={{ fontSize:18, fontWeight:700, color:TEXT_HI }}>$100</div>
              <div style={{ fontSize:11, color:TEXT_MID }}>CPC</div>
            </div>
          </div>
          {/* Legend */}
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:6 }}>
            {DONUT_DATA.map((d,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:d.color }}/>
                  <span style={{ fontSize:11, color:TEXT_MID }}>{d.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:TEXT_HI }}>{d.value}%</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic', alignSelf:'flex-start' }}>
            1 Filter applicable: Date
          </div>
        </div>
      </div>

      {/* Ad Format table */}
      <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, overflow:'hidden', flex:1 }}>
        <Toolbar title="Ad Format Preferences Report" count={AD_FORMATS.length} countLabel="formats"
          icon={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>} />
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <TH>Ad Format</TH>
                <TH sortable align="right">Ad Revenue</TH>
                <TH sortable align="right">Ad Clicks</TH>
                <TH sortable align="right">Ad Impressions</TH>
                <TH sortable align="right">CPC</TH>
                <TH sortable align="right">CPM</TH>
                <TH sortable align="right">Attributed View Products</TH>
                <TH sortable align="right">Attributed Add to Cart</TH>
                <TH sortable align="right">Attributed Orders (SKU)</TH>
                <TH sortable align="right">Attributed GMV</TH>
              </tr>
            </thead>
            <tbody>
              {AD_FORMATS.map((r,i) => (
                <TR key={i}>
                  <TD>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <div style={{ width:6, height:6, borderRadius:2, background:COLORS[i%COLORS.length] }}/>
                      <span style={{ fontWeight:500 }}>{r.fmt}</span>
                    </div>
                  </TD>
                  <TD align="right" bold>{r.rev}</TD>
                  <TD align="right">{r.clicks}</TD>
                  <TD align="right">{r.impr}</TD>
                  <TD align="right">{r.cpc}</TD>
                  <TD align="right">{r.cpm}</TD>
                  <TD align="right">{r.viewProd}</TD>
                  <TD align="right">{r.addCart}</TD>
                  <TD align="right">{r.orders}</TD>
                  <TD align="right" bold>{r.gmv}</TD>
                </TR>
              ))}
              <TotalRow>
                <TD bold>Total</TD>
                <TD align="right" bold>$45 M</TD>
                <TD align="right" bold>54 M</TD>
                <TD align="right" bold>$45 M</TD>
                <TD align="right" bold>$0.56</TD>
                <TD align="right" bold>$0.56</TD>
                <TD align="right" bold>54 M</TD>
                <TD align="right" bold>54 M</TD>
                <TD align="right" bold>$32 M</TD>
                <TD align="right" bold>112</TD>
              </TotalRow>
            </tbody>
          </table>
        </div>
        <FooterNote />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 6 — Channel Performance Report
   Columns: Channel Type | Advertiser Count | Ad Revenue | CPC |
            Ad Clicks | CPM | Ad Impressions |
            Attributed View Products | Attributed Add to Cart |
            Attributed Orders (SKU) | Attributed GMV
═══════════════════════════════════════════════════════════════ */
const CHANNELS = [
  { type:'Sponsored Display Ad', adv:17, rev:'$23 M',  cpc:'$0.10', clicks:'32 M', cpm:'$0.10', impr:'$23 M',  vp:'32 M', ac:'25 K',  ao:'$54 M', gmv:'13' },
  { type:'Sponsored Product Ad', adv:14, rev:'$3.7 M', cpc:'$0.45', clicks:'7.3 M',cpm:'$0.45', impr:'$3.7 M', vp:'7.3 M',ac:'15 M',  ao:'$25 K', gmv:'13' },
];
function ChannelTable() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Channel performance report" count={CHANNELS.length} countLabel="channels"
        icon={<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>} />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH>Channel Type</TH>
              <TH sortable align="right">Advertiser Count</TH>
              <TH sortable align="right">Ad Revenue</TH>
              <TH sortable align="right">CPC</TH>
              <TH sortable align="right">Ad Clicks</TH>
              <TH sortable align="right">CPM</TH>
              <TH sortable align="right">Ad Impressions</TH>
              <TH sortable align="right">Attributed View Products</TH>
              <TH sortable align="right">Attributed Add to Cart</TH>
              <TH sortable align="right">Attributed Orders (SKU)</TH>
              <TH sortable align="right">Attributed GMV</TH>
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((r,i) => (
              <TR key={i}>
                <TD>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:COLORS[i] }}/>
                    <span style={{ fontWeight:500 }}>{r.type}</span>
                  </div>
                </TD>
                <TD align="right">{r.adv}</TD>
                <TD align="right" bold>{r.rev}</TD>
                <TD align="right">{r.cpc}</TD>
                <TD align="right">{r.clicks}</TD>
                <TD align="right">{r.cpm}</TD>
                <TD align="right">{r.impr}</TD>
                <TD align="right">{r.vp}</TD>
                <TD align="right">{r.ac}</TD>
                <TD align="right">{r.ao}</TD>
                <TD align="right" bold>{r.gmv}</TD>
              </TR>
            ))}
            <TotalRow>
              <TD bold>Total</TD>
              <TD align="right" bold>46</TD>
              <TD align="right" bold>$45 M</TD>
              <TD align="right" bold>$0.56</TD>
              <TD align="right" bold>54 M</TD>
              <TD align="right" bold>$0.56</TD>
              <TD align="right" bold>$45 M</TD>
              <TD align="right" bold>54 M</TD>
              <TD align="right" bold>54 M</TD>
              <TD align="right" bold>$32 M</TD>
              <TD align="right" bold>112</TD>
            </TotalRow>
          </tbody>
        </table>
      </div>
      <FooterNote />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 7 — Audience Performance Report
   Columns: Audience Segment | Advertiser Count | Campaign Count |
            Ad Revenue | CPC | Ad Clicks | CPM | Ad Impressions |
            Spends | CTR | ROAS
═══════════════════════════════════════════════════════════════ */
const AUDIENCES = [
  { seg:'Highest Spending Customers',     adv:12, cmp:20, rev:'$852K', cpc:'$8',  clicks:'23K', cpm:'$10', impr:'123K', spend:'$24K', ctr:'5%', roas:'10' },
  { seg:'Top Chocolate Purchasing Cust..', adv:14, cmp:28, rev:'$413K', cpc:'$4',  clicks:'56K', cpm:'$9',  impr:'456K', spend:'$54K', ctr:'5%', roas:'12' },
  { seg:'Sweets Purchasing Customers',     adv:16, cmp:25, rev:'$678K', cpc:'$6',  clicks:'89K', cpm:'$12', impr:'789K', spend:'$59K', ctr:'7%', roas:'12' },
  { seg:'Top Biscuits Purchasing Cust..',  adv:10, cmp:20, rev:'$239K', cpc:'$5',  clicks:'21K', cpm:'$20', impr:'321K', spend:'$52K', ctr:'8%', roas:'11' },
];
function AudienceTable() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Audience Performance Report" count={AUDIENCES.length} countLabel="segments"
        icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>} />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH>Audience Segment</TH>
              <TH sortable align="right">Advertiser Count</TH>
              <TH sortable align="right">Campaign Count</TH>
              <TH sortable align="right">Ad Revenue</TH>
              <TH sortable align="right">CPC</TH>
              <TH sortable align="right">Ad Clicks</TH>
              <TH sortable align="right">CPM</TH>
              <TH sortable align="right">Ad Impressions</TH>
              <TH sortable align="right">Spends</TH>
              <TH sortable align="right">CTR</TH>
              <TH sortable align="right">ROAS</TH>
            </tr>
          </thead>
          <tbody>
            {AUDIENCES.map((r,i) => (
              <TR key={i}>
                <TD>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:COLORS[i] }}/>
                    <span accent style={{ color:ACCENT, cursor:'pointer', fontWeight:500 }}>{r.seg}</span>
                  </div>
                </TD>
                <TD align="right">{r.adv}</TD>
                <TD align="right">{r.cmp}</TD>
                <TD align="right" bold>{r.rev}</TD>
                <TD align="right">{r.cpc}</TD>
                <TD align="right">{r.clicks}</TD>
                <TD align="right">{r.cpm}</TD>
                <TD align="right">{r.impr}</TD>
                <TD align="right">{r.spend}</TD>
                <TD align="right">{r.ctr}</TD>
                <TD align="right" bold>{r.roas}</TD>
              </TR>
            ))}
            <TotalRow>
              <TD bold>Total</TD><TD /><TD />
              <TD align="right" bold>$1.5 M</TD><TD />
              <TD align="right" bold>290K</TD><TD />
              <TD align="right" bold>890K</TD>
              <TD align="right" bold>$167K</TD>
              <TD /><TD />
            </TotalRow>
          </tbody>
        </table>
      </div>
      <FooterNote />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 8 — Advertiser Dimension Report
   Columns: Advertiser Name | Advertiser ID | Persona | Last Login |
            Advertiser Status | Last Spend Date | Onboarding Date |
            First Topup Date | Last Topup Date | Last Feed Sync Time |
            Last Feed Sync Count | Lifetime Ad Spend |
            Lifetime Topup | Remaining Budget
═══════════════════════════════════════════════════════════════ */
const ADV_DIM = [
  { name:'Ounass_5834_154 L_o…',  id:'RMN_10097981_SE…', persona:'Silver',   login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'08 Apr 25',firstTopup:'08 Apr 25',lastTopup:'15 May 25',syncTime:'15 May 25',syncCnt:'–', lifeSpend:'$51.7 K', lifeTopup:'$127.8 K',remaining:'$76 K'    },
  { name:'Test Seller 6 (2799)',   id:'2799',             persona:'Platinum', login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'05 May 21',firstTopup:'10 May 21',lastTopup:'23 Oct 24',syncTime:'10 May 21',syncCnt:'–', lifeSpend:'$6,658',  lifeTopup:'$114.5 K',remaining:'$107.8 K' },
  { name:'Test Seller 9 (2960)',   id:'2960',             persona:'Platinum', login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'05 May 21',firstTopup:'10 May 21',lastTopup:'09 Aug 24',syncTime:'10 May 21',syncCnt:'–', lifeSpend:'$1.2 M',  lifeTopup:'$1.3 M',  remaining:'$107.4 K' },
  { name:'Test Seller 13 (2595)',  id:'2595',             persona:'Platinum', login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'05 May 21',firstTopup:'10 May 21',lastTopup:'09 Aug 24',syncTime:'10 May 21',syncCnt:'–', lifeSpend:'$28 K',   lifeTopup:'$121 K',  remaining:'$93 K'    },
  { name:'Test Seller 10 (2084)',  id:'2084',             persona:'Platinum', login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'05 May 21',firstTopup:'10 May 21',lastTopup:'09 Aug 24',syncTime:'10 May 21',syncCnt:'–', lifeSpend:'$4,895',  lifeTopup:'$115.2 K',remaining:'$110.3 K' },
  { name:'Ounass_5834_154 Nes…',  id:'RMN_10099292_SE…', persona:'Silver',   login:'11 Jun 25',status:'Active',lastSpend:'–',        onboard:'16 Apr 25',firstTopup:'15 May 25',lastTopup:'15 May 25',syncTime:'15 May 25',syncCnt:'2', lifeSpend:'$526 K',  lifeTopup:'$1.1 M',  remaining:'$555.7 K' },
  { name:'Paper Mate (Paper Ma…)', id:'Paper Mate',       persona:'Platinum', login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'30 Aug 22',firstTopup:'30 Aug 22',lastTopup:'15 May 25',syncTime:'15 May 25',syncCnt:'–', lifeSpend:'$71.4 K', lifeTopup:'$172.3 K',remaining:'$100.9 K' },
  { name:'Ounass_5834_154 Dis…',  id:'RMN_10097989_SE…', persona:'Silver',   login:'10 Mar 22',status:'Active',lastSpend:'12 Jun 25',onboard:'08 Apr 25',firstTopup:'08 Apr 25',lastTopup:'15 May 25',syncTime:'15 May 25',syncCnt:'–', lifeSpend:'$44.3 K', lifeTopup:'$125.7 K',remaining:'$81.4 K'  },
];
function AdvDimTable() {
  return (
    <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, marginBottom:16, overflow:'hidden' }}>
      <Toolbar title="Advertiser Dimension Report" count={ADV_DIM.length} countLabel="advertisers"
        icon={<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
      />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <TH sortable>Advertiser Name</TH>
              <TH sortable>Advertiser ID</TH>
              <TH>Persona</TH>
              <TH sortable>Last Login</TH>
              <TH>Advertiser Status</TH>
              <TH sortable>Last Spend Date</TH>
              <TH sortable>Onboarding Date</TH>
              <TH sortable>First Topup Date</TH>
              <TH sortable>Last Topup Date</TH>
              <TH sortable>Last Feed Sync Time</TH>
              <TH sortable align="right">Last Feed Sync Count</TH>
              <TH sortable align="right">Lifetime Ad Spend</TH>
              <TH sortable align="right">Lifetime Topup</TH>
              <TH sortable align="right">Remaining Budget</TH>
            </tr>
          </thead>
          <tbody>
            {ADV_DIM.map((r,i) => (
              <TR key={i}>
                <TD accent>{r.name}</TD>
                <TD mono>{r.id}</TD>
                <TD><PersonaBadge p={r.persona} /></TD>
                <TD>{r.login}</TD>
                <TD><StatusBadge s={r.status} /></TD>
                <TD>{r.lastSpend}</TD>
                <TD>{r.onboard}</TD>
                <TD>{r.firstTopup}</TD>
                <TD>{r.lastTopup}</TD>
                <TD>{r.syncTime}</TD>
                <TD align="right">{r.syncCnt}</TD>
                <TD align="right" bold>{r.lifeSpend}</TD>
                <TD align="right">{r.lifeTopup}</TD>
                <TD align="right" bold>
                  <span style={{ color: parseFloat(r.remaining.replace(/[^0-9.]/g,'')) > 100 ? GREEN : ORANGE }}>
                    {r.remaining}
                  </span>
                </TD>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding:'10px 20px', borderTop:`1px solid var(--osmos-border)`,
        display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>
          Comparison mode not applicable • Showing {ADV_DIM.length} advertisers
        </span>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {[1,2,3].map(p => (
            <button key={p} style={{ width:26, height:26, borderRadius:4, fontSize:11,
              background: p===1 ? ACCENT : WHITE, color: p===1 ? '#fff' : TEXT_MID,
              border: p===1 ? 'none' : `1px solid ${BORDER}`, cursor:'pointer', fontWeight: p===1 ? 600:400 }}>{p}</button>
          ))}
          <span style={{ fontSize:11, color:TEXT_LO }}>…</span>
          <button style={{ height:26, padding:'0 10px', borderRadius:4, fontSize:11,
            background:WHITE, border:`1px solid ${BORDER}`, cursor:'pointer', color:TEXT_MID }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT PAGE — sections flow directly, no tab container
═══════════════════════════════════════════════════════════════ */
export default function AdvertiserInsightsPage() {
  return (
    <div style={{ padding:'24px', fontFamily:"'Open Sans',sans-serif" }}>

      {/* ── Funnel stat cards ── */}
      <div style={{ display:'flex', gap:0, marginBottom:20 }}>
        {FUNNEL.map((s,i) => <FunnelCard key={s.label} stat={s} i={i} last={i===FUNNEL.length-1} />)}
      </div>

      {/* ── Two line charts: Ad Revenue vs CTR | Clicks vs CPC ── */}
      <div style={{ display:'flex', gap:16, marginBottom:16 }}>
        {[
          { left:'Ad Revenue', lKey:'revenue', lColor:ACCENT,    lFmt:v=>`$${v}M`,
            right:'CTR',       rKey:'ctr',     rColor:'#8B5CF6', rFmt:v=>`${v}%`, data:revenueCtData },
          { left:'Clicks',     lKey:'clicks',  lColor:'#EC4899', lFmt:v=>`${v}M`,
            right:'CPC',       rKey:'cpc',     rColor:'#10B981', rFmt:v=>`$${v}`, data:clicksCpcData },
        ].map((chart,ci) => (
          <div key={ci} style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`,
            overflow:'hidden', flex:1 }}>
            <div style={{ padding:'12px 16px', borderBottom:`1px solid var(--osmos-border)`,
              display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:26, height:26, background:'#F0F4FF', borderRadius:6,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={13} color={ACCENT}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  {[{label:chart.left,color:chart.lColor},{label:chart.right,color:chart.rColor}].map((m,mi) => (
                    <React.Fragment key={mi}>
                      {mi>0 && <span style={{ fontSize:11, color:TEXT_LO }}>vs</span>}
                      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                        <div style={{ width:10, height:10, borderRadius:2, background:m.color }}/>
                        <span style={{ fontSize:11, color:TEXT_HI, fontWeight:500 }}>{m.label}</span>
                        <ChevDown size={10}/>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}><DlIcon /></button>
            </div>
            <div style={{ padding:'12px 8px 4px' }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chart.data} margin={{ top:4, right:8, left:-12, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l" tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} tickFormatter={chart.lFmt} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize:10, fill:'#999' }} axisLine={false} tickLine={false} tickFormatter={chart.rFmt} />
                  <Tooltip />
                  <Line yAxisId="l" type="monotone" dataKey={chart.lKey} stroke={chart.lColor} strokeWidth={2} dot={{ r:3, fill:chart.lColor, strokeWidth:0 }} name={chart.left} />
                  <Line yAxisId="r" type="monotone" dataKey={chart.rKey} stroke={chart.rColor} strokeWidth={2} dot={{ r:3, fill:chart.rColor, strokeWidth:0 }} name={chart.right} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ padding:'4px 16px 10px', borderTop:`1px solid var(--osmos-border)` }}>
              <span style={{ fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>1 Filter applicable: Date</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── All report sections, directly on page (no tab wrapper) ── */}
      <CampaignTable />
      <AdvertiserSnapshot />
      <BudgetChart />
      <div style={{ height:16 }}/>
      <MoversTable />
      <AdFormatSection />
      <ChannelTable />
      <AudienceTable />
      <AdvDimTable />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'8px 0 16px', fontSize:10, color:TEXT_LO, fontStyle:'italic' }}>
        <span>Data as of 14 May 2025 • Refresh every 4 hours</span>
        <span style={{ fontStyle:'normal' }}>© 2017 - 2026 OSK Techlabs Private Ltd. All rights reserved.</span>
      </div>
    </div>
  );
}
