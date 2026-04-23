import React, { useState } from 'react';

/* ── tokens ───────────────────────────────────────────────────── */
const BORDER = 'var(--osmos-border)';
const FG     = 'var(--osmos-fg)';
const FG_MUT = 'var(--osmos-fg-muted)';
const FG_SUB = 'var(--osmos-fg-subtle)';
const BG_SUB = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const FONT   = "'Open Sans', sans-serif";

/* ── sample data ──────────────────────────────────────────────── */
const ROWS = [
  { id:1, status:'Active', name:'Age Group',      attrId:'Age_Group',      dataType:'String', advertisers:10, campaigns:45,  userCount:'2K',   userPct:'2K',   createdBy:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', dropdownEnabled:'Yes', visibility:15  },
  { id:2, status:'Active', name:'Gender',          attrId:'Gender',         dataType:'String', advertisers:75, campaigns:235, userCount:'10K',  userPct:'10K',  createdBy:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', dropdownEnabled:'Yes', visibility:100 },
  { id:3, status:'Active', name:'Payment Method',  attrId:'Payment_Method', dataType:'String', advertisers:67, campaigns:312, userCount:'1.2K', userPct:'1.2K', createdBy:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', dropdownEnabled:'Yes', visibility:100 },
  { id:4, status:'Active', name:'CIBIL Score',     attrId:'CIBIL_Score',    dataType:'String', advertisers:9,  campaigns:41,  userCount:'2K',   userPct:'2K',   createdBy:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', dropdownEnabled:'Yes', visibility:15  },
];

const COLS = [
  { key:'status',           label:'Status' },
  { key:'name',             label:'Attribute Name' },
  { key:'attrId',           label:'Attribute ID' },
  { key:'dataType',         label:'Data Type' },
  { key:'advertisers',      label:'Advertisers Using Attributes' },
  { key:'campaigns',        label:'Campaign Count' },
  { key:'userCount',        label:'User Count' },
  { key:'userPct',          label:'User %' },
  { key:'createdBy',        label:'Created By' },
  { key:'createdOn',        label:'Created On' },
  { key:'dropdownEnabled',  label:'Dropdown Enabled' },
  { key:'visibility',       label:'Advertiser Visibility' },
];

/* ── icons ────────────────────────────────────────────────────── */
function Ic({ children, size = 14, color = FG_MUT, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>{children}</svg>
  );
}
const RefreshIc = () => <Ic><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Ic>;
const ColIc = () => <Ic><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></Ic>;
const SearchIc = () => <Ic size={13} color={FG_SUB}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Ic>;
const DlIc = () => <Ic><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Ic>;
const CloseIc = () => <Ic size={18} color={FG_MUT}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ic>;
const ChevDownIc = () => <Ic size={12}><polyline points="6 9 12 15 18 9"/></Ic>;

/* ── small reusable pieces ────────────────────────────────────── */
function StatusBadge({ s }) {
  const active = s === 'Active';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 8px',
      borderRadius:12, fontSize:11, fontWeight:500,
      background: active ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)', color: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)' }}>
      <span style={{ width:6, height:6, borderRadius:'50%',
        background: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)', display:'inline-block' }} />
      {s}
    </span>
  );
}

function DataTypeBadge({ t }) {
  return (
    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:500,
      background:'var(--osmos-brand-primary-muted)', color:'var(--osmos-brand-primary)' }}>{t}</span>
  );
}

function YesNoBadge({ v }) {
  const yes = v === 'Yes';
  return (
    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:500,
      background: yes ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)', color: yes ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)' }}>{v}</span>
  );
}

function AttrIdChip({ id }) {
  return (
    <span style={{ fontFamily:'monospace', fontSize:11, padding:'2px 8px',
      background:BG_SUB, border:`1px solid ${BORDER}`, borderRadius:6, color:FG_MUT }}>{id}</span>
  );
}

/* ── Toast ────────────────────────────────────────────────────── */
function Toast({ msg, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{ position:'fixed', top:20, right:20, zIndex:9999,
      background:'var(--osmos-brand-green)', color:'#fff', fontFamily:FONT, fontSize:13,
      padding:'12px 20px', borderRadius:8, boxShadow:'0 4px 16px rgba(0,0,0,.18)',
      display:'flex', alignItems:'center', gap:10 }}>
      <span>✓</span> {msg}
    </div>
  );
}

/* ── Drawer ───────────────────────────────────────────────────── */
function CreateAttributeDrawer({ onClose }) {
  const [form, setForm] = useState({
    id: 'Marital_Status', alias: 'Marital Status', type: 'String',
    dropdownMode: 'Fixed List', values: '',
  });
  const [toast, setToast] = useState(false);

  function set(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function handleCreate() {
    setToast(true);
  }
  function handleToastDone() {
    setToast(false);
    onClose();
  }

  const fieldLabel = { fontSize:12, fontWeight:600, color:FG_MUT, fontFamily:FONT, marginBottom:4, display:'block' };
  const input = {
    width:'100%', boxSizing:'border-box', height:36, border:`1px solid ${BORDER}`,
    borderRadius:6, padding:'0 10px', fontSize:13, fontFamily:FONT, color:FG,
    background:'#fff', outline:'none',
  };
  const hint = { fontSize:11, color:FG_SUB, fontFamily:FONT, marginTop:3, display:'block' };
  const field = { marginBottom:18 };

  return (
    <>
      {toast && <Toast msg="Attribute created successfully" onDone={handleToastDone} />}
      {/* overlay */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', zIndex:800 }} />
      {/* panel */}
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:440, zIndex:801,
        background:'var(--osmos-bg)', display:'flex', flexDirection:'column', boxShadow:'-4px 0 24px rgba(0,0,0,.12)' }}>
        {/* header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 24px', borderBottom:`1px solid ${BORDER}` }}>
          <span style={{ fontSize:15, fontWeight:700, fontFamily:FONT, color:FG }}>Create Attribute</span>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex' }}>
            <CloseIc />
          </button>
        </div>
        {/* body */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px' }}>
          <div style={field}>
            <label style={fieldLabel}>id <span style={{ color:'#EF4444' }}>*</span></label>
            <input style={input} value={form.id} maxLength={50}
              onChange={e => set('id', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
          <div style={field}>
            <label style={fieldLabel}>alias <span style={{ color:'#EF4444' }}>*</span></label>
            <input style={input} value={form.alias} maxLength={50}
              onChange={e => set('alias', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Type <span style={{ color:'#EF4444' }}>*</span></label>
            <div style={{ position:'relative' }}>
              <select style={{ ...input, appearance:'none', paddingRight:28, cursor:'pointer' }}
                value={form.type} onChange={e => set('type', e.target.value)}>
                {['String','Number','Boolean','Date'].map(o => <option key={o}>{o}</option>)}
              </select>
              <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                <ChevDownIc />
              </span>
            </div>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Advertiser Visibility <span style={{ color:'#EF4444' }}>*</span></label>
            <button style={{ height:36, padding:'0 14px', border:`1px solid ${BORDER}`,
              borderRadius:6, background:'#fff', fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
              100 Advertisers
            </button>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Enable Dropdown <span style={{ color:'#EF4444' }}>*</span></label>
            <div style={{ display:'flex', gap:20 }}>
              {['Fixed List','Input Value'].map(opt => (
                <label key={opt} style={{ display:'flex', alignItems:'center', gap:7,
                  fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
                  <input type="radio" name="dropdownMode" value={opt}
                    checked={form.dropdownMode === opt}
                    onChange={() => set('dropdownMode', opt)}
                    style={{ accentColor: ACCENT }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Values <span style={{ color:'#EF4444' }}>*</span></label>
            <input style={input} placeholder="Enter here" value={form.values}
              onChange={e => set('values', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
        </div>
        {/* footer */}
        <div style={{ padding:'16px 24px', borderTop:`1px solid ${BORDER}`,
          display:'flex', justifyContent:'flex-end', gap:10 }}>
          <button onClick={onClose} style={{ height:36, padding:'0 18px', border:`1px solid ${BORDER}`,
            borderRadius:6, background:'#fff', fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
            Cancel
          </button>
          <button onClick={handleCreate} style={{ height:36, padding:'0 18px',
            border:'none', borderRadius:6, background:ACCENT, color:'#fff',
            fontSize:13, fontFamily:FONT, fontWeight:600, cursor:'pointer' }}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function ManageAttributesPage() {
  const [activeTab, setActiveTab] = useState('Auction Campaign');
  const [search, setSearch] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);

  const thStyle = {
    padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:600,
    color:FG_SUB, fontFamily:FONT, whiteSpace:'nowrap',
    borderBottom:`1px solid ${BORDER}`, background:BG_SUB,
  };
  const tdStyle = {
    padding:'10px 14px', fontSize:12, fontFamily:FONT, color:FG_MUT,
    whiteSpace:'nowrap', borderBottom:`1px solid ${BORDER}`, verticalAlign:'middle',
  };
  const btnOutline = {
    height:32, padding:'0 14px', border:`1px solid ${BORDER}`, borderRadius:6,
    background:'#fff', fontSize:12, fontFamily:FONT, color:FG_MUT, cursor:'pointer',
    display:'inline-flex', alignItems:'center', gap:6,
  };
  const btnPrimary = {
    height:32, padding:'0 14px', border:'none', borderRadius:6,
    background:ACCENT, color:'#fff', fontSize:12, fontFamily:FONT,
    fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6,
  };

  return (
    <div style={{ fontFamily:FONT, color:FG, minHeight:'100vh', background:BG_SUB }}>
      {/* breadcrumb */}
      <div style={{ padding:'12px 24px', borderBottom:`1px solid ${BORDER}`,
        background:'#fff', display:'flex', alignItems:'center', gap:6, fontSize:12, color:FG_SUB }}>
        <span>Control Center</span>
        <span>›</span>
        <span>Audience Manager</span>
        <span>›</span>
        <span style={{ color:FG, fontWeight:600 }}>Manage Attributes</span>
      </div>

      {/* toolbar */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${BORDER}`,
        padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        {/* left */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {['Auction Campaign','All'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ height:30, padding:'0 14px', border:`1px solid ${activeTab===tab ? ACCENT : BORDER}`,
                borderRadius:20, fontSize:12, fontFamily:FONT, cursor:'pointer',
                background: activeTab===tab ? ACCENT_M : '#fff',
                color: activeTab===tab ? ACCENT : FG_MUT, fontWeight: activeTab===tab ? 600 : 400 }}>
              {tab}
            </button>
          ))}
          <button style={{ height:30, padding:'0 12px', border:`1px dashed ${BORDER}`,
            borderRadius:20, fontSize:12, fontFamily:FONT, color:FG_SUB, background:'#fff',
            cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 }}>
            + Add a Filter
          </button>
        </div>
        {/* right */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:12, color:FG_SUB, fontFamily:FONT }}>Attributes (4)</span>
          <button style={btnOutline}><RefreshIc /></button>
          <button style={btnOutline}><ColIc /></button>
          <div style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 10px',
            border:`1px solid ${BORDER}`, borderRadius:6, background:'#fff' }}>
            <SearchIc />
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
              style={{ border:'none', outline:'none', fontSize:12, fontFamily:FONT, color:FG, width:100 }} />
          </div>
          <button style={btnOutline}><DlIc /></button>
          <button style={btnOutline}>Manage User Data</button>
          <button style={btnPrimary} onClick={() => setShowDrawer(true)}>Create Attribute</button>
        </div>
      </div>

      {/* table */}
      <div style={{ padding:'0 24px 24px', overflowX:'auto' }}>
        <div style={{ background:'#fff', border:`1px solid ${BORDER}`, borderRadius:8, marginTop:16, overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:1100 }}>
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} style={thStyle}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.id} style={{ background:'#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background = BG_SUB}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <td style={tdStyle}><StatusBadge s={row.status} /></td>
                  <td style={{ ...tdStyle, fontWeight:500, color:FG }}>{row.name}</td>
                  <td style={tdStyle}><AttrIdChip id={row.attrId} /></td>
                  <td style={tdStyle}><DataTypeBadge t={row.dataType} /></td>
                  <td style={{ ...tdStyle, textAlign:'center' }}>{row.advertisers}</td>
                  <td style={{ ...tdStyle, textAlign:'center' }}>{row.campaigns}</td>
                  <td style={tdStyle}>{row.userCount}</td>
                  <td style={tdStyle}>{row.userPct}</td>
                  <td style={tdStyle}>{row.createdBy}</td>
                  <td style={tdStyle}>{row.createdOn}</td>
                  <td style={tdStyle}><YesNoBadge v={row.dropdownEnabled} /></td>
                  <td style={{ ...tdStyle, textAlign:'center' }}>{row.visibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && <CreateAttributeDrawer onClose={() => setShowDrawer(false)} />}
    </div>
  );
}
