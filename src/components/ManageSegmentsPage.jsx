import React, { useState } from 'react';

/* ── tokens ───────────────────────────────────────────────────── */
const BG      = 'var(--osmos-bg)';
const BORDER  = 'var(--osmos-border)';
const FG      = 'var(--osmos-fg)';
const FG_MID  = 'var(--osmos-fg-muted)';
const FG_LO   = 'var(--osmos-fg-subtle)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M= 'var(--osmos-brand-primary-muted)';
const FONT    = "'Open Sans', sans-serif";

/* ── Data ─────────────────────────────────────────────────────── */
const DATA = [
  { id:1,  status:'Active', name:'Highest Spending Customers',             creator:1, usage:25,  campaigns:68,  type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'16 Jun 25, 01:25 PM', reach:'20K - 30K',  cpmRule:'Yes (20)', cpcRule:'Yes (20)', cpmPct:'20%', cpcPct:'19%', visibility:27  },
  { id:2,  status:'Active', name:'Top Chocolate Purchasing Customers',     creator:1, usage:80,  campaigns:200, type:'User Attributes',  createdBy:'Shailendra Singh Test', createdOn:'16 Jun 25, 01:25 PM', lastEditedBy:'Shantanu Harkut',    lastEditedOn:'16 Jun 25, 01:25 PM', reach:'40K - 50K',  cpmRule:'Yes (50)', cpcRule:'Yes (50)', cpmPct:'5%',  cpcPct:'4%',  visibility:100 },
  { id:3,  status:'Active', name:'Sweets Purchasing Customers',            creator:1, usage:0,   campaigns:0,   type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Yuvaraj',            lastEditedOn:'13 Jun 25, 12:24 PM', reach:'0',          cpmRule:'Yes (0)',  cpcRule:'No',       cpmPct:'10%', cpcPct:'0',   visibility:0   },
  { id:4,  status:'Active', name:'Top Biscuits Purchasing Customers',      creator:2, usage:87,  campaigns:240, type:'User Attributes',  createdBy:'Shailendra Singh Test', createdOn:'13 Jun 25, 12:24 PM', lastEditedBy:'Deepankal personal', lastEditedOn:'13 Jun 25, 12:24 PM', reach:'80K - 100K', cpmRule:'Yes (40)', cpcRule:'Yes (40)', cpmPct:'12%', cpcPct:'17%', visibility:100 },
  { id:5,  status:'Active', name:'Electronics category Customers',         creator:1, usage:0,   campaigns:0,   type:'Custom List',     createdBy:'Shailendra Singh Test', createdOn:'11 Jun 25, 06:00 PM', lastEditedBy:'Akshay',             lastEditedOn:'11 Jun 25, 06:00 PM', reach:'0',          cpmRule:'Yes (0)',  cpcRule:'No',       cpmPct:'20%', cpcPct:'0',   visibility:0   },
  { id:6,  status:'Active', name:'Home Appliances category Customers',     creator:2, usage:1,   campaigns:2,   type:'User Activity',   createdBy:'Shailendra Singh Test', createdOn:'11 Jun 25, 06:00 PM', lastEditedBy:'Vijay Bang',         lastEditedOn:'11 Jun 25, 06:00 PM', reach:'40K - 50K',  cpmRule:'Yes (1)',  cpcRule:'Yes (1)',  cpmPct:'3%',  cpcPct:'2%',  visibility:'-' },
  { id:7,  status:'Active', name:'Clothing category Customers',            creator:1, usage:1,   campaigns:3,   type:'User Activity',   createdBy:'QA tester',             createdOn:'10 Jun 25, 04:00 PM', lastEditedBy:'Vivek',              lastEditedOn:'10 Jun 25, 04:00 PM', reach:'20K - 30K',  cpmRule:'No',       cpcRule:'Yes (0)',  cpmPct:'0',   cpcPct:'21%', visibility:'-' },
  { id:8,  status:'Active', name:'Sports Equipment category Customers',    creator:2, usage:86,  campaigns:230, type:'Custom List',     createdBy:'QA tester',             createdOn:'10 Jun 25, 04:00 PM', lastEditedBy:'Vishal Khandate',    lastEditedOn:'10 Jun 25, 04:00 PM', reach:'40K - 50K',  cpmRule:'Yes (35)', cpcRule:'Yes (35)', cpmPct:'8%',  cpcPct:'6%',  visibility:100 },
  { id:9,  status:'Active', name:'Beauty Products category Customers',     creator:1, usage:75,  campaigns:210, type:'Custom List',     createdBy:'QA tester',             createdOn:'20 Dec 24, 04:27 PM', lastEditedBy:'Vivek',              lastEditedOn:'20 Dec 24, 04:27 PM', reach:'20K - 30K',  cpmRule:'Yes (55)', cpcRule:'Yes (55)', cpmPct:'15%', cpcPct:'14%', visibility:100 },
  { id:10, status:'Active', name:'Books and Stationery category Customers',creator:2, usage:1,   campaigns:2,   type:'User Activity',   createdBy:'Fahad',                 createdOn:'17 Dec 24, 06:06 PM', lastEditedBy:'Rahul Waghmare',     lastEditedOn:'17 Dec 24, 06:06 PM', reach:'20K - 30K',  cpmRule:'No',       cpcRule:'No',       cpmPct:'0',   cpcPct:'0',   visibility:'-' },
  { id:11, status:'Active', name:'Gpay Customers',                         creator:1, usage:1,   campaigns:1,   type:'User Attributes',  createdBy:'jeetesh',               createdOn:'14 Nov 24, 07:00 PM', lastEditedBy:'Vivek',              lastEditedOn:'14 Nov 24, 07:00 PM', reach:'30K - 40K',  cpmRule:'Yes (1)',  cpcRule:'Yes (1)',  cpmPct:'25%', cpcPct:'13%', visibility:1   },
];

/* ── Icons ────────────────────────────────────────────────────── */
function Icon({ children, size = 14, color = 'currentColor', sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}
const RefreshIcon = () => (
  <Icon size={14} color={FG_MID}>
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </Icon>
);
const ColsIcon = () => (
  <Icon size={14} color={FG_MID}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  </Icon>
);
const SearchIcon = () => (
  <Icon size={13} color={FG_LO}>
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </Icon>
);
const DownloadIcon = () => (
  <Icon size={14} color={FG_MID}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </Icon>
);
const PlusIcon = () => (
  <Icon size={12} color={FG_MID}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </Icon>
);
const CloseIcon = () => (
  <Icon size={16} color={FG_MID}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </Icon>
);
const CheckIcon = () => (
  <Icon size={14} color="#fff" sw={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </Icon>
);

/* ── Pill Badges ──────────────────────────────────────────────── */
function StatusBadge({ value }) {
  const active = value === 'Active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: active ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)',
      color: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: active ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-subtle)', flexShrink: 0,
      }} />
      {value}
    </span>
  );
}

function TypeBadge({ type }) {
  const map = {
    'Custom List':     { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
    'User Attributes': { bg: '#F5F3FF', color: '#7C3AED' },
    'User Activity':   { bg: '#FFF7ED', color: '#EA580C' },
  };
  const s = map[type] || { bg: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)' };
  return (
    <span style={{
      display: 'inline-block', padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, background: s.bg, color: s.color,
    }}>
      {type}
    </span>
  );
}

function RuleBadge({ value }) {
  const yes = value !== 'No' && value !== '0' && value !== '';
  return (
    <span style={{
      display: 'inline-block', padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: yes ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)',
      color: yes ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)',
    }}>
      {value || 'No'}
    </span>
  );
}

/* ── Th helper ────────────────────────────────────────────────── */
function Th({ children, sub, minW = 120, sticky = false }) {
  return (
    <th style={{
      padding: '10px 12px', textAlign: 'left', whiteSpace: 'nowrap',
      fontSize: 11, fontWeight: 600, color: FG_MID, background: BG_SUB,
      borderBottom: `1px solid ${BORDER}`, minWidth: minW,
      position: sticky ? 'sticky' : 'static',
      left: sticky ? 0 : undefined,
      zIndex: sticky ? 2 : undefined,
    }}>
      {children}
      {sub && <div style={{ fontSize: 10, fontWeight: 400, color: FG_LO, marginTop: 1 }}>{sub}</div>}
    </th>
  );
}

function Td({ children, sticky = false, minW }) {
  return (
    <td style={{
      padding: '10px 12px', fontSize: 12, color: FG, whiteSpace: 'nowrap',
      borderBottom: `1px solid ${BORDER}`,
      position: sticky ? 'sticky' : 'static',
      left: sticky ? 0 : undefined,
      background: sticky ? BG : undefined,
      zIndex: sticky ? 1 : undefined,
      minWidth: minW,
    }}>
      {children}
    </td>
  );
}

/* ── Step Indicator ───────────────────────────────────────────── */
function StepIndicator({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? ACCENT : active ? ACCENT : BG_SUB,
                border: `2px solid ${done || active ? ACCENT : BORDER}`,
                fontSize: 12, fontWeight: 700,
                color: done || active ? '#fff' : FG_LO,
                marginBottom: 4,
              }}>
                {done ? <CheckIcon /> : i + 1}
              </div>
              <span style={{
                fontSize: 11, fontWeight: active ? 600 : 400,
                color: active ? ACCENT : done ? FG_MID : FG_LO,
                textAlign: 'center', lineHeight: 1.3,
              }}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                height: 2, flex: 1, background: i < current ? ACCENT : BORDER,
                marginBottom: 20,
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Form Field ───────────────────────────────────────────────── */
function Field({ label, required, children, hint }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: FG, marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: 11, color: FG_LO, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '8px 12px', borderRadius: 6,
  border: `1px solid ${BORDER}`, fontSize: 13,
  color: FG, fontFamily: FONT, outline: 'none',
  background: BG,
};

/* ── Toast ────────────────────────────────────────────────────── */
function Toast({ message, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: 'fixed', top: 20, right: 24, zIndex: 9999,
      background: 'var(--osmos-brand-green)', color: '#fff',
      padding: '12px 20px', borderRadius: 8,
      fontSize: 13, fontWeight: 500, fontFamily: FONT,
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%',
        background: 'var(--osmos-brand-green)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CheckIcon />
      </span>
      {message}
    </div>
  );
}

/* ── Create Segment Drawer ────────────────────────────────────── */
function CreateSegmentDrawer({ onClose, onSuccess }) {
  const [segType, setSegType] = useState('Custom List');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('');
  const [cpmPct, setCpmPct] = useState('20%');
  const [cpcPct, setCpcPct] = useState('10%');

  const STEPS = ['Segment Creation', 'Elligible Users', 'Inventory Setup'];

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 500,
      }} />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 480,
        background: BG, zIndex: 501, display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', fontFamily: FONT,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: FG }}>Create Segment</span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: 4, borderRadius: 4,
          }}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>
          <StepIndicator steps={STEPS} current={0} />

          {/* Create Segment By */}
          <Field label="Create Segment By" required>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Custom List', 'User Activity', 'User Attributes'].map(opt => (
                <label key={opt} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontSize: 13, color: FG, cursor: 'pointer',
                }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${segType === opt ? ACCENT : BORDER}`,
                    background: segType === opt ? ACCENT : BG,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {segType === opt && (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                    )}
                  </span>
                  <input type="radio" value={opt} checked={segType === opt}
                    onChange={() => setSegType(opt)}
                    style={{ display: 'none' }} />
                  {opt}
                </label>
              ))}
            </div>
          </Field>

          {/* Name */}
          <Field label="Name" required>
            <div style={{ position: 'relative' }}>
              <input
                style={inputStyle}
                placeholder="Enter here"
                maxLength={50}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, color: FG_LO,
              }}>{name.length}/50</span>
            </div>
          </Field>

          {/* Description */}
          <Field label="Description" required>
            <input
              style={inputStyle}
              placeholder="Enter here"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </Field>

          {/* Segment Duration */}
          <Field label="Segment Duration (Days)" required hint="90 max">
            <input
              style={inputStyle}
              type="number"
              placeholder="Enter here"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              min={1} max={90}
            />
          </Field>

          {/* CPM Premium % */}
          <Field label="CPM Premium %" required>
            <div style={{ position: 'relative' }}>
              <input
                style={inputStyle}
                placeholder="Enter here"
                maxLength={50}
                value={cpmPct}
                onChange={e => setCpmPct(e.target.value)}
              />
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, color: FG_LO,
              }}>{cpmPct.length}/50</span>
            </div>
          </Field>

          {/* CPC Premium % */}
          <Field label="CPC Premium %" required>
            <div style={{ position: 'relative' }}>
              <input
                style={inputStyle}
                placeholder="Enter here"
                maxLength={50}
                value={cpcPct}
                onChange={e => setCpcPct(e.target.value)}
              />
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, color: FG_LO,
              }}>{cpcPct.length}/50</span>
            </div>
          </Field>

          {/* Advertiser Visibility */}
          <Field label="Advertiser Visibility" required>
            <button style={{
              padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
              border: `1px solid ${ACCENT}`, color: ACCENT, background: ACCENT_M,
              cursor: 'pointer', fontFamily: FONT,
            }}>
              Choose Advertisers
            </button>
          </Field>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px', borderTop: `1px solid ${BORDER}`,
          display: 'flex', justifyContent: 'flex-end', flexShrink: 0,
        }}>
          <button
            onClick={onSuccess}
            style={{
              padding: '9px 24px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              border: 'none', background: ACCENT, color: '#fff',
              cursor: 'pointer', fontFamily: FONT,
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function ManageSegmentsPage() {
  const [activeTab, setActiveTab] = useState('auction');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = DATA.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreate() {
    setDrawerOpen(false);
    setToast('Segment created successfully');
  }

  return (
    <div style={{ fontFamily: FONT, color: FG, display: 'flex', flexDirection: 'column', height: '100%', background: BG_SUB }}>
      {/* Breadcrumb */}
      <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, color: FG_LO }}>Control Center</span>
        <span style={{ fontSize: 12, color: FG_LO }}>/</span>
        <span style={{ fontSize: 12, color: FG_LO }}>Audience Manager</span>
        <span style={{ fontSize: 12, color: FG_LO }}>/</span>
        <span style={{ fontSize: 12, color: FG_MID, fontWeight: 600 }}>Manage Segment</span>
      </div>

      {/* Page header */}
      <div style={{ padding: '10px 20px 14px' }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: FG }}>Manage Segment</h1>
      </div>

      {/* Card */}
      <div style={{ flex: 1, margin: '0 20px 20px', background: BG, borderRadius: 10, border: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, flexWrap: 'wrap' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderRadius: 6, border: `1px solid ${BORDER}`, overflow: 'hidden', flexShrink: 0 }}>
              {[['auction', 'Auction Campaign'], ['all', 'All']].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: '6px 14px', fontSize: 12, fontWeight: activeTab === key ? 600 : 400,
                  border: 'none', cursor: 'pointer', fontFamily: FONT,
                  background: activeTab === key ? ACCENT : BG,
                  color: activeTab === key ? '#fff' : FG_MID,
                  borderRight: key === 'auction' ? `1px solid ${BORDER}` : 'none',
                }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Filter chip */}
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: `1px dashed ${BORDER}`, background: BG, color: FG_MID,
              cursor: 'pointer', fontFamily: FONT,
            }}>
              <PlusIcon />
              Add a Filter
            </button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {/* Count */}
            <span style={{ fontSize: 12, fontWeight: 600, color: FG_MID, whiteSpace: 'nowrap' }}>
              Audience Segments (13)
            </span>

            {/* Icon buttons */}
            {[
              { icon: <RefreshIcon />, title: 'Refresh' },
              { icon: <ColsIcon />, title: 'Columns' },
            ].map(({ icon, title }) => (
              <button key={title} title={title} style={{
                width: 30, height: 30, borderRadius: 6,
                border: `1px solid ${BORDER}`, background: BG,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                {icon}
              </button>
            ))}

            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: 8, display: 'flex' }}><SearchIcon /></span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                style={{
                  paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                  borderRadius: 6, border: `1px solid ${BORDER}`,
                  fontSize: 12, fontFamily: FONT, color: FG, outline: 'none',
                  width: 150, background: BG,
                }}
              />
            </div>

            {/* Download */}
            <button title="Download" style={{
              width: 30, height: 30, borderRadius: 6,
              border: `1px solid ${BORDER}`, background: BG,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <DownloadIcon />
            </button>

            {/* Create Segment CTA */}
            <button onClick={() => setDrawerOpen(true)} style={{
              padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: 'none', background: ACCENT, color: '#fff',
              cursor: 'pointer', fontFamily: FONT, whiteSpace: 'nowrap',
            }}>
              + Create Segment
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1600 }}>
            <thead>
              <tr>
                <Th minW={90} sticky>Status</Th>
                <Th minW={220}>Segment Name</Th>
                <Th minW={80}>Creator</Th>
                <Th minW={130} sub="At Present">Usage (Advertisers)</Th>
                <Th minW={110}>Campaign Count</Th>
                <Th minW={130}>Segment Type</Th>
                <Th minW={160}>Created By</Th>
                <Th minW={160}>Created On</Th>
                <Th minW={160}>Last Edited by</Th>
                <Th minW={160}>Last Edited On</Th>
                <Th minW={130} sub="At Present">Estimated Reach</Th>
                <Th minW={190}>CPM Rule Applied (Advertisers)</Th>
                <Th minW={190}>CPC Rule Applied (Advertisers)</Th>
                <Th minW={110}>CPM Premium %</Th>
                <Th minW={110}>CPC Premium %</Th>
                <Th minW={140}>Advertiser Visibility</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={16} style={{ padding: 40, textAlign: 'center', fontSize: 13, color: FG_LO }}>
                    No segments found.
                  </td>
                </tr>
              )}
              {filtered.map((row, idx) => (
                <tr key={row.id} style={{ background: idx % 2 === 0 ? BG : BG_SUB }}>
                  <Td sticky><StatusBadge value={row.status} /></Td>
                  <Td>
                    <span style={{ fontWeight: 500, color: FG }}>{row.name}</span>
                  </Td>
                  <Td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: ACCENT_M, color: ACCENT, fontSize: 11, fontWeight: 700,
                    }}>
                      {row.creator}
                    </span>
                  </Td>
                  <Td>{row.usage}</Td>
                  <Td>{row.campaigns}</Td>
                  <Td><TypeBadge type={row.type} /></Td>
                  <Td><span style={{ color: FG_MID }}>{row.createdBy}</span></Td>
                  <Td><span style={{ color: FG_MID }}>{row.createdOn}</span></Td>
                  <Td><span style={{ color: FG_MID }}>{row.lastEditedBy}</span></Td>
                  <Td><span style={{ color: FG_MID }}>{row.lastEditedOn}</span></Td>
                  <Td>{row.reach}</Td>
                  <Td><RuleBadge value={row.cpmRule} /></Td>
                  <Td><RuleBadge value={row.cpcRule} /></Td>
                  <Td>{row.cpmPct}</Td>
                  <Td>{row.cpcPct}</Td>
                  <Td>
                    {row.visibility === '-'
                      ? <span style={{ color: FG_LO }}>—</span>
                      : row.visibility}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <CreateSegmentDrawer
          onClose={() => setDrawerOpen(false)}
          onSuccess={handleCreate}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
