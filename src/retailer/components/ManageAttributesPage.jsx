import React, { useState } from 'react';
import { RefreshIcon, ColumnsIcon, SearchIcon, DownloadIcon, CloseIcon, ChevronDownIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Badge } from '../../ui/atoms/Badge';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";
const BORDER  = 'var(--osmos-border)';
const FG      = 'var(--osmos-fg)';
const FG_MUT  = 'var(--osmos-fg-muted)';
const FG_SUB  = 'var(--osmos-fg-subtle)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';

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


function DataTypeBadge({ t }) {
  return (
    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:500, background:ACCENT_M, color:ACCENT }}>{t}</span>
  );
}

function YesNoBadge({ v }) {
  const yes = v === 'Yes';
  return (
    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:500,
      background: yes ? 'var(--osmos-brand-green-muted)' : BG_SUB,
      color: yes ? 'var(--osmos-brand-green)' : FG_MUT }}>{v}</span>
  );
}

function AttrIdChip({ id }) {
  return (
    <span style={{ fontFamily:'monospace', fontSize:11, padding:'2px 8px', background:BG_SUB, border:`1px solid ${BORDER}`, borderRadius:6, color:FG_MUT }}>{id}</span>
  );
}

function CreateAttributeDrawer({ onClose, showToast }) {
  const [form, setForm] = useState({
    id: 'Marital_Status', alias: 'Marital Status', type: 'String',
    dropdownMode: 'Fixed List', values: '',
  });

  function set(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function handleCreate() {
    showToast('Attribute created successfully');
    onClose();
  }

  const fieldLabel = { fontSize:12, fontWeight:600, color:FG_MUT, fontFamily:FONT, marginBottom:4, display:'block' };
  const input = {
    width:'100%', boxSizing:'border-box', height:36, border:`1px solid ${BORDER}`,
    borderRadius:6, padding:'0 10px', fontSize:13, fontFamily:FONT, color:FG,
    background:'var(--osmos-bg)', outline:'none',
  };
  const hint = { fontSize:11, color:FG_SUB, fontFamily:FONT, marginTop:3, display:'block' };
  const field = { marginBottom:18 };

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', zIndex:800 }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:440, zIndex:801,
        background:'var(--osmos-bg)', display:'flex', flexDirection:'column', boxShadow:'-4px 0 24px rgba(0,0,0,.12)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:`1px solid ${BORDER}` }}>
          <span style={{ fontSize:15, fontWeight:700, fontFamily:FONT, color:FG }}>Create Attribute</span>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex' }}>
            <CloseIcon size={18} color={FG_MUT} />
          </button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:20 }}>
          <div style={field}>
            <label style={fieldLabel}>id <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <input style={input} value={form.id} maxLength={50} onChange={e => set('id', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
          <div style={field}>
            <label style={fieldLabel}>alias <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <input style={input} value={form.alias} maxLength={50} onChange={e => set('alias', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Type <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <div style={{ position:'relative' }}>
              <select style={{ ...input, appearance:'none', paddingRight:28, cursor:'pointer' }}
                value={form.type} onChange={e => set('type', e.target.value)}>
                {['String','Number','Boolean','Date'].map(o => <option key={o}>{o}</option>)}
              </select>
              <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                <ChevronDownIcon size={12} color={FG_MUT} />
              </span>
            </div>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Advertiser Visibility <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <button style={{ height:36, padding:'0 14px', border:`1px solid ${BORDER}`, borderRadius:6, background:'var(--osmos-bg)', fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
              100 Advertisers
            </button>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Enable Dropdown <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <div style={{ display:'flex', gap:20 }}>
              {['Fixed List','Input Value'].map(opt => (
                <label key={opt} style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
                  <input type="radio" name="dropdownMode" value={opt} checked={form.dropdownMode === opt} onChange={() => set('dropdownMode', opt)} style={{ accentColor: ACCENT }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={field}>
            <label style={fieldLabel}>Values <span style={{ color:'var(--alert-error-primary)' }}>*</span></label>
            <input style={input} placeholder="Enter here" value={form.values} onChange={e => set('values', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>
        </div>

        <div style={{ padding:'14px 20px', borderTop:`1px solid ${BORDER}`, display:'flex', justifyContent:'flex-end', gap:10 }}>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </>
  );
}

export default function ManageAttributesPage() {
  const [activeTab, setActiveTab] = useState('Auction Campaign');
  const [search, setSearch]       = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const { toast, showToast }      = useToast();

  const thStyle = {
    padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:600,
    color:FG_SUB, fontFamily:FONT, whiteSpace:'nowrap',
    borderBottom:`1px solid ${BORDER}`, background:BG_SUB,
  };
  const tdStyle = {
    padding:'10px 14px', fontSize:12, fontFamily:FONT, color:FG_MUT,
    whiteSpace:'nowrap', borderBottom:`1px solid ${BORDER}`, verticalAlign:'middle',
  };

  return (
    <div style={{ fontFamily:FONT, color:FG, minHeight:'100vh', background:BG_SUB }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      {/* Toolbar */}
      <div style={{ background:'var(--osmos-bg)', borderBottom:`1px solid ${BORDER}`, padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {['Auction Campaign','All'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ height:30, padding:'0 14px', border:`1px solid ${activeTab===tab ? ACCENT : BORDER}`,
                borderRadius:20, fontSize:12, fontFamily:FONT, cursor:'pointer',
                background: activeTab===tab ? ACCENT_M : 'var(--osmos-bg)',
                color: activeTab===tab ? ACCENT : FG_MUT, fontWeight: activeTab===tab ? 600 : 400 }}>
              {tab}
            </button>
          ))}
          <button style={{ height:30, padding:'0 12px', border:`1px dashed ${BORDER}`, borderRadius:20, fontSize:12, fontFamily:FONT, color:FG_SUB, background:'var(--osmos-bg)', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 }}>
            + Add a Filter
          </button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:12, color:FG_SUB, fontFamily:FONT }}>Attributes (4)</span>
          <Button variant="icon" title="Refresh" onClick={() => showToast('Refreshed')}><RefreshIcon size={14} color={FG_MUT} /></Button>
          <Button variant="icon" title="Columns" onClick={() => showToast('Column picker coming soon')}><ColumnsIcon size={14} color={FG_MUT} /></Button>
          <div style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 10px', border:`1px solid ${BORDER}`, borderRadius:6, background:'var(--osmos-bg)' }}>
            <SearchIcon size={13} color={FG_SUB} />
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
              style={{ border:'none', outline:'none', fontSize:12, fontFamily:FONT, color:FG, width:100, background:'transparent' }} />
          </div>
          <Button variant="icon" title="Download" onClick={() => showToast('Downloading...')}><DownloadIcon size={14} color={FG_MUT} /></Button>
          <Button variant="outline" onClick={() => showToast('Manage user data coming soon')}>Manage User Data</Button>
          <Button onClick={() => setShowDrawer(true)}>Create Attribute</Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding:'0 24px 24px', overflowX:'auto' }}>
        <div style={{ background:'var(--osmos-bg)', border:`1px solid ${BORDER}`, borderRadius:8, marginTop:16, overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:1100 }}>
            <thead>
              <tr>
                {COLS.map(c => <th key={c.key} style={thStyle}>{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.id} style={{ background:'var(--osmos-bg)' }}
                  onMouseEnter={e => e.currentTarget.style.background = BG_SUB}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--osmos-bg)'}>
                  <td style={tdStyle}><Badge status={row.status} /></td>
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

      {showDrawer && <CreateAttributeDrawer onClose={() => setShowDrawer(false)} showToast={showToast} />}
    </div>
  );
}
