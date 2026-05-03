import React, { useState } from 'react';

const SEGMENTS = [
  { name: 'test',                                          visibility: 'Everyone', merchants: null,  createdBy: 'Shailendra',      createdOn: '11 Jun 25, 03:57 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'sam',                                           visibility: 'Everyone', merchants: 1,     createdBy: 'Vitthal Samant',  createdOn: '13 Apr 26, 03:52 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'sam',                                           visibility: 'Everyone', merchants: 1,     createdBy: 'Vitthal Samant',  createdOn: '13 Apr 26, 03:51 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'sam',                                           visibility: 'Everyone', merchants: 1,     createdBy: 'Vitthal Samant',  createdOn: '13 Apr 26, 03:50 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'pendo sync test name changes',                  visibility: 'Everyone', merchants: 81,    createdBy: 'Darshak Talaviya',createdOn: '02 Jun 25, 10:46 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'mera naam',                                     visibility: 'Everyone', merchants: null,  createdBy: 'Rajesh',          createdOn: '11 Aug 25, 10:49 AM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'TestQA643',                                     visibility: 'Everyone', merchants: 286,   createdBy: 'Rajesh',          createdOn: '20 Apr 26, 05:39 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'TestQA622',                                     visibility: 'Everyone', merchants: 286,   createdBy: 'Rajesh',          createdOn: '20 Apr 26, 03:31 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Test Sync Cloud',                               visibility: 'Everyone', merchants: 86,    createdBy: 'Darshak Talaviya',createdOn: '30 May 25, 11:10 AM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'NewSegmentforTestCampaigns',                    visibility: 'Everyone', merchants: 22,    createdBy: 'Rajesh',          createdOn: '17 Jul 25, 05:11 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'New Segment',                                   visibility: 'Everyone', merchants: 264,   createdBy: 'Rajesh',          createdOn: '07 Aug 25, 04:43 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'EmptySegment',                                  visibility: 'Everyone', merchants: null,  createdBy: 'Rajesh',          createdOn: '18 Jul 25, 02:57 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Copy of test',                                  visibility: 'Everyone', merchants: null,  createdBy: 'Rajesh',          createdOn: '31 Dec 25, 12:24 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Copy of test',                                  visibility: 'Everyone', merchants: null,  createdBy: 'Rajesh',          createdOn: '11 Aug 25, 10:50 AM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Copy of TestQA643',                             visibility: 'Everyone', merchants: 286,   createdBy: 'Rajesh',          createdOn: '20 Apr 26, 05:39 PM', lastUpdate: '22 Apr 26, 11:58 AM' },
  { name: 'Copy of TestQA622',                             visibility: 'Everyone', merchants: 286,   createdBy: 'Rajesh',          createdOn: '20 Apr 26, 03:31 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Copy of NewSegmentforTestCampaignscjdbc bd jcdbkjb', visibility: 'Everyone', merchants: 22, createdBy: 'Rajesh',       createdOn: '17 Jul 25, 05:11 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Copy of EmptySegment',                          visibility: 'Everyone', merchants: null,  createdBy: 'Rajesh',          createdOn: '18 Jul 25, 02:57 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'All Brands',                                    visibility: 'Everyone', merchants: 12,    createdBy: 'System',          createdOn: '09 Apr 26, 03:51 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'All Brands',                                    visibility: 'Everyone', merchants: 12,    createdBy: 'System',          createdOn: '01 Jul 24, 12:41 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'All Advertisers',                               visibility: 'Everyone', merchants: 273,   createdBy: 'System',          createdOn: '09 Apr 26, 03:51 PM', lastUpdate: '22 Apr 26, 11:57 AM' },
  { name: 'Ajiogram',                                      visibility: 'Everyone', merchants: null,  createdBy: 'Vitthal Samant',  createdOn: '13 Apr 26, 11:29 AM', lastUpdate: '22 Apr 26, 11:58 AM' },
];

const FILTER_OPTIONS = {
  Performance: [
    'Overall Product Views Last 14 days','Pareto Merchant','Attributed GMV Last 30 days',
    'Overall Add2carts Last 30 days','Attributed GMV Last 14 days','Attributed GMV Last 7 days',
    'Ad Revenue Last 14 days','Ad Impressions Last 14 days','Attributed Orders Last 30 days',
    'Overall Product Views Last 7 days','Overall Salecompletes Last 7 days','Overall GMV Last 7 days',
    'Ad Impressions Last 30 days','Attributed Product Views Last 30 days','Ad Revenue Last 30 days',
    'Category L1 Quadrant','Ad Impressions Last 7 days','Attributed Orders Last 14 days',
    'Ad Clicks Last 7 days','Overall Orders Last 7 days','Attributed Product Views Last 7 days',
    'Overall Salecompletes Last 30 days','Overall GMV Last 30 days','Ad Revenue Last 7 days',
    'Overall Add2carts Last 14 days','Overall Product Views Last 30 days','Overall Orders Last 30 days',
    'Attributed Product Views Last 14 days','Overall Salecompletes Last 14 days',
    'Attributed Orders Last 7 days','Overall Orders Last 14 days','Ad Clicks Last 14 days',
    'Overall GMV Last 14 days','Category L2 Quadrant','Ad Clicks Last 30 days',
    'Share Of Value','Overall Add2carts Last 7 days',
  ],
  General: [
    'Merchant Id','Client Id','Persona','Merchant Name','Quality Score',
    'Merchant Selector','Merchant Status','New Merchant',
  ],
  Campaigns: [
    'Active Auction Display Campaigns','Active Display Campaigns','Total Campaign Count',
    'Active PLA Campaigns','Total Active Campaigns','Active Guaranteed Display Campaigns',
  ],
  Feed: [
    'Category L2','Total Product Count','Category L3','Selected Skus',
    'In Stock Product Count','Category L1','Out Of Stock Skus',
  ],
  Wallet: [
    'Incentive Topup Amount','Avg Topup Value','Wallet Balance',
    'Total Topup Amount','Total Amount Spent',
  ],
};

/* ── Create Segment Drawer ─────────────────────────────────────── */
function CreateSegmentDrawer({ onClose }) {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('Everyone');
  const [filterSearch, setFilterSearch] = useState('');
  const [expandedGroup, setExpandedGroup] = useState('Performance');
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [filters, setFilters] = useState([]);

  const filteredOptions = Object.entries(FILTER_OPTIONS).reduce((acc, [group, opts]) => {
    const matched = opts.filter(o => o.toLowerCase().includes(filterSearch.toLowerCase()));
    if (matched.length) acc[group] = matched;
    return acc;
  }, {});

  function addFilter(group, option) {
    setFilters(f => [...f, { group, option, value: '' }]);
    setShowFilterPicker(false);
    setFilterSearch('');
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      display: 'flex', justifyContent: 'flex-end',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

      {/* Drawer */}
      <div style={{
        position: 'relative', width: 560, background: '#fff',
        display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        height: '100%',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)' }}>Create Segment</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', padding: 4, borderRadius: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            {/* Left: form */}
            <div style={{ flex: 1 }}>
              {/* Segment Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'block', marginBottom: 6 }}>
                  Segment Name:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value.slice(0, 50))}
                    placeholder="Enter name"
                    maxLength={50}
                    style={{
                      width: '100%', height: 36, padding: '0 40px 0 12px',
                      border: '1px solid var(--osmos-border)', borderRadius: 6,
                      fontSize: 12, color: 'var(--osmos-fg)', outline: 'none',
                      fontFamily: "'Open Sans', sans-serif", boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--osmos-brand-primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--osmos-border)'}
                  />
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>
                    {name.length}/50
                  </span>
                </div>
              </div>

              {/* Segment Visibility */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'block', marginBottom: 6 }}>
                  Segment Visibility:
                </label>
                <div style={{ display: 'flex', border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden', width: 'fit-content' }}>
                  {['Only Me', 'Everyone'].map(v => (
                    <button key={v} onClick={() => setVisibility(v)} style={{
                      padding: '6px 16px', border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: visibility === v ? 600 : 400,
                      background: visibility === v ? 'var(--osmos-brand-primary)' : '#fff',
                      color: visibility === v ? '#fff' : 'var(--osmos-fg-muted)',
                      fontFamily: "'Open Sans', sans-serif",
                      transition: 'all 0.15s',
                    }}>{v}</button>
                  ))}
                </div>
              </div>

              {/* Filter builder */}
              <div>
                {filters.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px', background: 'var(--osmos-bg-subtle)',
                    borderRadius: 6, marginBottom: 8,
                    border: '1px solid var(--osmos-border)',
                  }}>
                    <span style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {f.group}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--osmos-fg)', flex: 1 }}>{f.option}</span>
                    <button onClick={() => setFilters(fls => fls.filter((_, j) => j !== i))} style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add filter button + picker */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowFilterPicker(p => !p)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: '50%',
                      border: '1.5px dashed var(--osmos-border)', background: '#fff',
                      cursor: 'pointer', color: 'var(--osmos-fg-muted)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>

                  {showFilterPicker && (
                    <div style={{
                      position: 'absolute', top: 36, left: 0,
                      width: 300, background: '#fff',
                      border: '1px solid var(--osmos-border)', borderRadius: 8,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100,
                    }}>
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--osmos-border)' }}>
                        <input
                          autoFocus
                          value={filterSearch}
                          onChange={e => setFilterSearch(e.target.value)}
                          placeholder="Search filters…"
                          style={{
                            width: '100%', padding: '5px 8px',
                            border: '1px solid var(--osmos-border)', borderRadius: 5,
                            fontSize: 11, outline: 'none', fontFamily: "'Open Sans', sans-serif",
                          }}
                        />
                      </div>
                      <div style={{ maxHeight: 300, overflowY: 'auto', padding: '4px 0' }}>
                        {Object.entries(filteredOptions).map(([group, opts]) => (
                          <div key={group}>
                            <button
                              onClick={() => setExpandedGroup(g => g === group ? null : group)}
                              style={{
                                width: '100%', textAlign: 'left', padding: '6px 12px',
                                background: 'var(--osmos-bg-subtle)', border: 'none', cursor: 'pointer',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                fontFamily: "'Open Sans', sans-serif",
                              }}
                            >
                              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)' }}>{group}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-subtle)" strokeWidth="2.5" strokeLinecap="round"
                                style={{ transform: expandedGroup === group ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                                <polyline points="6 9 12 15 18 9"/>
                              </svg>
                            </button>
                            {expandedGroup === group && opts.map(opt => (
                              <button key={opt} onClick={() => addFilter(group, opt)} style={{
                                width: '100%', textAlign: 'left', padding: '6px 20px',
                                border: 'none', background: 'transparent', cursor: 'pointer',
                                fontSize: 12, color: 'var(--osmos-fg)',
                                fontFamily: "'Open Sans', sans-serif",
                              }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Eligible Merchants */}
            <div style={{ width: 140, flexShrink: 0, textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                Eligible Merchants
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--osmos-fg)' }}>286</div>
              <div style={{ width: '100%', height: 1, background: 'var(--osmos-border)', marginTop: 8 }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            height: 34, padding: '0 20px', borderRadius: 6,
            border: '1px solid var(--osmos-border)', background: '#fff',
            fontSize: 12, fontWeight: 500, cursor: 'pointer', marginRight: 8,
            fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg-muted)',
          }}>Cancel</button>
          <button style={{
            height: 34, padding: '0 20px', borderRadius: 6,
            border: 'none', background: 'var(--osmos-brand-primary)',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#fff',
            fontFamily: "'Open Sans', sans-serif",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ── Segment Manager Page ──────────────────────────────────────── */
export default function SegmentManagerPage() {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = SEGMENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>
          Segments <span style={{ color: 'var(--osmos-fg-subtle)', fontWeight: 400 }}>({SEGMENTS.length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Filter */}
          <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M7 12h10M10 18h4"/>
            </svg>
          </button>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 32 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              style={{ border: 'none', outline: 'none', fontSize: 11, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 140 }}
            />
          </div>
          {/* Add Segment */}
          <button onClick={() => setDrawerOpen(true)} style={{
            height: 32, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 5,
            background: 'var(--osmos-brand-primary)', border: 'none', borderRadius: 6,
            cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#fff',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Segment
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--osmos-bg-muted)', borderBottom: '1px solid var(--osmos-border)' }}>
              {['Segment Name', 'Visibility', 'Merchants in Segment', 'Created by', 'Created on', 'Last Update', ''].map((h, i) => (
                <th key={i} style={{ padding: '9px 14px', textAlign: i > 1 ? 'left' : 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap', fontSize: 11 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((seg, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seg.name}</td>
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)' }}>{seg.visibility}</td>
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg)', textAlign: 'center' }}>{seg.merchants ?? '—'}</td>
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)' }}>{seg.createdBy}</td>
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{seg.createdOn}</td>
                <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{seg.lastUpdate}</td>
                <td style={{ padding: '9px 14px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: '0 4px', fontSize: 16, lineHeight: 1 }}>⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {drawerOpen && <CreateSegmentDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
