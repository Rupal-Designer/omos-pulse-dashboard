import React, { useState } from 'react';
import { RefreshIcon, ColumnsIcon, SearchIcon, DownloadIcon, CloseIcon, ChevronDownIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
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
  { id:1, status:'Active', name:'Age is 20-30 or 31-40 and Gender is Male', cpmPct:'10%', cpcPct:'10%', ruleType:'User Attribute', reach:'20K - 30K', creatorName:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'16 Jun 25, 01:25 PM', advertisers:120 },
  { id:2, status:'Active', name:'Gender (any value)',                        cpmPct:'10%', cpcPct:'10%', ruleType:'User Attribute', reach:'40K - 50K', creatorName:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'16 Jun 25, 01:25 PM', advertisers:120 },
  { id:3, status:'Active', name:'Frequent Coke Bu...',                       cpmPct:'20%', cpcPct:'20%', ruleType:'User Activity',  reach:'80K - 100K',creatorName:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Shantanu Harkut',    lastEditedOn:'16 Jun 25, 01:25 PM', advertisers:120 },
  { id:4, status:'Active', name:'Nike custom buyers',                        cpmPct:'20%', cpcPct:'20%', ruleType:'User Activity',  reach:'40K - 50K', creatorName:'Shailendra Singh', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Shantanu Harkut',    lastEditedOn:'16 Jun 25, 01:25 PM', advertisers:120 },
  { id:5, status:'Active', name:'Highest spending cu...',                    cpmPct:'20%', cpcPct:'20%', ruleType:'User Segment',   reach:'20K - 30K', creatorName:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Yuvaraj',            lastEditedOn:'13 Jun 25, 12:24 PM', advertisers:20  },
  { id:6, status:'Active', name:'Gpay Users',                                cpmPct:'20%', cpcPct:'20%', ruleType:'User Segment',   reach:'20K - 30K', creatorName:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Yuvaraj',            lastEditedOn:'13 Jun 25, 12:24 PM', advertisers:20  },
  { id:7, status:'Active', name:'Ice cream shoppers',                        cpmPct:'10%', cpcPct:'10%', ruleType:'User Activity',  reach:'20K - 30K', creatorName:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Deepankal personal', lastEditedOn:'13 Jun 25, 12:24 PM', advertisers:18  },
  { id:8, status:'Active', name:'Frozen yogurt lovers',                      cpmPct:'10%', cpcPct:'10%', ruleType:'User Activity',  reach:'30K - 40K', creatorName:'Shailendra Singh', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Deepankal personal', lastEditedOn:'13 Jun 25, 12:24 PM', advertisers:18  },
];

const COLS = [
  { key:'status',      label:'Status' },
  { key:'name',        label:'Rule Name' },
  { key:'cpmPct',      label:'CPM Premium %' },
  { key:'cpcPct',      label:'CPC Premium %' },
  { key:'ruleType',    label:'Rule Type' },
  { key:'reach',       label:'Estimated Reach' },
  { key:'creatorName', label:'Creator Name' },
  { key:'createdOn',   label:'Created On' },
  { key:'lastEditedBy',  label:'Last Edited by' },
  { key:'lastEditedOn',  label:'Last Edited On' },
  { key:'advertisers', label:'Advertisers Applicable to' },
];

const RULE_COLORS = {
  'User Attribute': { bg: ACCENT_M,                     color: ACCENT },
  'User Activity':  { bg: 'rgba(245,166,35,0.12)',       color: 'var(--osmos-brand-amber)' },
  'User Segment':   { bg: 'rgba(139,92,246,0.12)',       color: '#8b5cf6' },
};

function StatusBadge({ s }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 8px',
      borderRadius:12, fontSize:11, fontWeight:500, background:'var(--osmos-brand-green-muted)', color:'var(--osmos-brand-green)' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--osmos-brand-green)', display:'inline-block' }} />
      {s}
    </span>
  );
}

function RuleTypeBadge({ t }) {
  const { bg, color } = RULE_COLORS[t] || RULE_COLORS['User Attribute'];
  return (
    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:500, background:bg, color }}>{t}</span>
  );
}

function CreateRuleDrawer({ onClose, showToast }) {
  const [form, setForm] = useState({
    setRuleBy: 'User Attributes',
    ruleName: '',
    cpmPct: '20%',
    cpcPct: '10%',
    productCategory: 'Electronics',
    brand: 'All Brands',
  });

  function set(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function handleCreate() {
    showToast('Rule created successfully. You can now set rule priority.');
    onClose();
  }

  const fieldLabel = { fontSize:12, fontWeight:600, color:FG_MUT, fontFamily:FONT, marginBottom:4, display:'block' };
  const inputStyle = {
    width:'100%', boxSizing:'border-box', height:36, border:`1px solid ${BORDER}`,
    borderRadius:6, padding:'0 10px', fontSize:13, fontFamily:FONT, color:FG,
    background:'var(--osmos-bg)', outline:'none',
  };
  const hint = { fontSize:11, color:FG_SUB, fontFamily:FONT, marginTop:3, display:'block' };
  const field = { marginBottom:18 };

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.35)', zIndex:800 }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:480, zIndex:801,
        background:'var(--osmos-bg)', display:'flex', flexDirection:'column', boxShadow:'-4px 0 24px rgba(0,0,0,.12)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', borderBottom:`1px solid ${BORDER}` }}>
          <span style={{ fontSize:15, fontWeight:700, fontFamily:FONT, color:FG }}>Create Rule</span>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex' }}>
            <CloseIcon size={18} color={FG_MUT} />
          </button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'24px' }}>
          <div style={field}>
            <label style={fieldLabel}>Set Rule By <span style={{ color:'#EF4444' }}>*</span></label>
            <div style={{ display:'flex', gap:20 }}>
              {['User Attributes','User Activity','Custom List'].map(opt => (
                <label key={opt} style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
                  <input type="radio" name="setRuleBy" value={opt} checked={form.setRuleBy === opt} onChange={() => set('setRuleBy', opt)} style={{ accentColor: ACCENT }} />
                  {opt}
                </label>
              ))}
            </div>
            <span style={hint}>Help text here</span>
          </div>

          <div style={field}>
            <label style={fieldLabel}>Rule Name <span style={{ color:'#EF4444' }}>*</span></label>
            <input style={inputStyle} placeholder="Young Adults Audience" value={form.ruleName} onChange={e => set('ruleName', e.target.value)} />
            <span style={hint}>Help text here</span>
          </div>

          <div style={{ display:'flex', gap:14, marginBottom:18 }}>
            <div style={{ flex:1 }}>
              <label style={fieldLabel}>CPM Premium % <span style={{ color:'#EF4444' }}>*</span></label>
              <input style={inputStyle} value={form.cpmPct} onChange={e => set('cpmPct', e.target.value)} />
              <span style={hint}>Help text here</span>
            </div>
            <div style={{ flex:1 }}>
              <label style={fieldLabel}>CPC Premium % <span style={{ color:'#EF4444' }}>*</span></label>
              <input style={inputStyle} value={form.cpcPct} onChange={e => set('cpcPct', e.target.value)} />
              <span style={hint}>Help text here</span>
            </div>
          </div>

          <div style={field}>
            <label style={fieldLabel}>Advertiser Applicability</label>
            <button style={{ height:36, padding:'0 14px', border:`1px solid ${BORDER}`, borderRadius:6, background:'var(--osmos-bg)', fontSize:13, fontFamily:FONT, color:FG_MUT, cursor:'pointer' }}>
              100 Advertisers
            </button>
          </div>

          <div style={field}>
            <label style={fieldLabel}>Product Category <span style={{ color:'#EF4444' }}>*</span></label>
            <div style={{ position:'relative' }}>
              <select style={{ ...inputStyle, appearance:'none', paddingRight:28, cursor:'pointer' }}
                value={form.productCategory} onChange={e => set('productCategory', e.target.value)}>
                <option>Select from here</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Food &amp; Beverage</option>
              </select>
              <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                <ChevronDownIcon size={12} color={FG_MUT} />
              </span>
            </div>
            <span style={hint}>Help text here</span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
            <div style={{ flex:1, height:1, background:BORDER }} />
            <span style={{ fontSize:11, fontWeight:600, color:FG_SUB, fontFamily:FONT, padding:'0 8px', background:'var(--osmos-bg)', border:`1px solid ${BORDER}`, borderRadius:10 }}>and</span>
            <div style={{ flex:1, height:1, background:BORDER }} />
          </div>

          <div style={field}>
            <label style={fieldLabel}>Brand <span style={{ color:'#EF4444' }}>*</span></label>
            <div style={{ position:'relative' }}>
              <select style={{ ...inputStyle, appearance:'none', paddingRight:28, cursor:'pointer' }}
                value={form.brand} onChange={e => set('brand', e.target.value)}>
                <option>Select from here</option>
                <option>All Brands</option>
                <option>Nike</option>
                <option>Adidas</option>
              </select>
              <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                <ChevronDownIcon size={12} color={FG_MUT} />
              </span>
            </div>
            <span style={hint}>Help text here</span>
          </div>

          <div style={{ border:`1px solid ${BORDER}`, borderRadius:8, padding:'14px 16px', background:BG_SUB, marginBottom:18 }}>
            <div style={{ fontSize:12, fontWeight:600, color:FG, fontFamily:FONT, marginBottom:6 }}>Audience Reach</div>
            <div style={{ fontSize:11, color:FG_SUB, fontFamily:FONT, marginBottom:12 }}>Potential Reach : 1,231,664</div>
            <div style={{ position:'relative' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:FG_SUB, fontFamily:FONT, marginBottom:6 }}>
                <span>Too Narrow</span><span>Too Broad</span>
              </div>
              <div style={{ height:6, borderRadius:3, position:'relative', background:'linear-gradient(to right, #EF4444 0%, var(--osmos-brand-amber) 25%, #22C55E 50%, var(--osmos-brand-amber) 75%, #EF4444 100%)' }}>
                <div style={{ position:'absolute', left:'48%', top:'50%', transform:'translate(-50%, -50%)', width:14, height:14, borderRadius:'50%', background:'var(--osmos-bg)', border:`2px solid ${ACCENT}`, boxShadow:'0 1px 4px rgba(0,0,0,.2)' }} />
              </div>
            </div>
          </div>

          <button style={{ width:'100%', height:38, border:'none', borderRadius:6, background:ACCENT, color:'#fff', fontSize:13, fontFamily:FONT, fontWeight:600, cursor:'pointer' }}>
            Create User Activity Rule
          </button>
        </div>

        <div style={{ padding:'16px 24px', borderTop:`1px solid ${BORDER}`, display:'flex', justifyContent:'flex-end', gap:10 }}>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </>
  );
}

export default function ManageCPMRulesPage() {
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
          <span style={{ fontSize:12, color:FG_SUB, fontFamily:FONT }}>Rules (8)</span>
          <Button variant="icon" title="Refresh" onClick={() => showToast('Refreshed')}><RefreshIcon size={14} color={FG_MUT} /></Button>
          <Button variant="icon" title="Columns" onClick={() => showToast('Column picker coming soon')}><ColumnsIcon size={14} color={FG_MUT} /></Button>
          <div style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 10px', border:`1px solid ${BORDER}`, borderRadius:6, background:'var(--osmos-bg)' }}>
            <SearchIcon size={13} color={FG_SUB} />
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
              style={{ border:'none', outline:'none', fontSize:12, fontFamily:FONT, color:FG, width:100, background:'transparent' }} />
          </div>
          <Button variant="icon" title="Download" onClick={() => showToast('Downloading...')}><DownloadIcon size={14} color={FG_MUT} /></Button>
          <Button variant="outline" onClick={() => showToast('Rule priority coming soon')}>Rule Priority</Button>
          <Button onClick={() => setShowDrawer(true)}>Create Rules</Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding:'0 24px 24px', overflowX:'auto' }}>
        <div style={{ background:'var(--osmos-bg)', border:`1px solid ${BORDER}`, borderRadius:8, marginTop:16, overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:1300 }}>
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} style={thStyle}>
                    {c.key === 'reach' ? (
                      <span>{c.label}<br /><span style={{ fontSize:10, fontWeight:400, color:FG_SUB }}>At Present</span></span>
                    ) : c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.id} style={{ background:'var(--osmos-bg)' }}
                  onMouseEnter={e => e.currentTarget.style.background = BG_SUB}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--osmos-bg)'}>
                  <td style={tdStyle}><StatusBadge s={row.status} /></td>
                  <td style={{ ...tdStyle, fontWeight:500, color:FG, maxWidth:220 }}>
                    <span style={{ display:'block', overflow:'hidden', textOverflow:'ellipsis', maxWidth:220 }}>{row.name}</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign:'center', fontWeight:600 }}>{row.cpmPct}</td>
                  <td style={{ ...tdStyle, textAlign:'center', fontWeight:600 }}>{row.cpcPct}</td>
                  <td style={tdStyle}><RuleTypeBadge t={row.ruleType} /></td>
                  <td style={tdStyle}>{row.reach}</td>
                  <td style={tdStyle}>{row.creatorName}</td>
                  <td style={tdStyle}>{row.createdOn}</td>
                  <td style={tdStyle}>{row.lastEditedBy}</td>
                  <td style={tdStyle}>{row.lastEditedOn}</td>
                  <td style={{ ...tdStyle, textAlign:'center' }}>{row.advertisers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && <CreateRuleDrawer onClose={() => setShowDrawer(false)} showToast={showToast} />}
    </div>
  );
}
