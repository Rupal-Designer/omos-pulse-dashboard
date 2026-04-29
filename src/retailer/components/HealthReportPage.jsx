import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';

// v = array of 7 values; if omitted, defaults to fmt zeroes
const R = (category, impact, parameter, fmt, v) => ({ category, impact, parameter, fmt, values: v || null });

const ROWS = [
  R('Display Ads',  'Supply',      'Display Ads Ad Acceptance Rate (%)',                         'percent'),
  R('Display Ads',  'Supply',      'Ad Viewability Index (Display Ads)',                          'number'),
  R('Overall',      'Activation',  'Ad GMV Index (AGI) (%)',                                      'percent'),
  R('Product Ads',  'Supply',      'Ad Viewability Index (Product Ads)',                           'number'),
  R('Product Ads',  'Supply',      'Product Ad Penetration Per Order (APPO)',                      'number'),
  R('Display Ads',  'Supply',      'Display Ad Penetration Per Order (APPO)',                      'number'),
  R('Product Ads',  'Supply',      'Product Ads Ad Acceptance Rate (%)',                           'percent'),
  R('Product Ads',  'Performance', 'Product Ads Budget Utilization (%)',                           'percent'),
  R('Display Ads',  'Performance', 'Display Ads Budget Utilization (%)',                           'percent'),
  R('Product Ads',  'Performance', 'Product Ads CTR (%)',                                          'percent'),
  R('Product Ads',  'Performance', 'Smart Shopping Campaign CTR (%)',                               'percent'),
  R('Product Ads',  'Performance', 'Product Ads Search Campaigns CTR %',                           'percent'),
  R('Product Ads',  'Performance', 'Manual CPC Campaigns CTR (%)',                                 'percent'),
  R('Product Ads',  'Performance', 'Product Ads Conversion Rate (%)',                              'percent'),
  R('Product Ads',  'Performance', 'Product Ads ROAS',                                             'number'),
  R('Overall',      'Activation',  'Total Advertisers',                                            'number',  ['187','187','187','187','189','189','189']),
  R('Product Ads',  'Activation',  'Non Core Product Ads Advertisers',                             'number'),
  R('Overall',      'Activation',  'Spending Advertisers',                                         'number'),
  R('Overall',      'Activation',  'Core Advertising Advertisers (CAA)',                           'number'),
  R('Display Ads',  'Activation',  'Core Display Ads Advertisers',                                 'number'),
  R('Product Ads',  'Activation',  'Core Product Ads Advertisers',                                 'number'),
  R('Display Ads',  'Activation',  'Non Core Display Ads Advertisers',                             'number'),
  R('Product Ads',  'Adoption',    'Active Smart Shopping Campaigns Count',                        'number'),
  R('Product Ads',  'Adoption',    'Spending Product Ads Search Campaigns Count',                  'number'),
  R('Product Ads',  'Adoption',    'Product Ads Active Campaigns',                                 'number'),
  R('Product Ads',  'Adoption',    'Spending Smart Shopping Campaigns Count',                      'number'),
  R('Product Ads',  'Adoption',    'Active Product Ads Search Campaigns Count',                    'number'),
  R('Product Ads',  'Adoption',    'Product Ads Spending Campaigns Count',                         'number'),
  R('Product Ads',  'Adoption',    'Spending Manual CPC Campaign Count',                           'number'),
  R('Product Ads',  'Adoption',    'Active Manual CPC Campaign Count',                             'number'),
  R('Product Ads',  'Adoption',    'Smart Shopping Campaign Average Daily Budget',                 'number'),
  R('Product Ads',  'Adoption',    'Daily Budget Per Active Campaign (Product Ads Search)',        'number'),
  R('Display Ads',  'Adoption',    'Display Ads Avg. Daily Budget',                               'number'),
  R('Product Ads',  'Adoption',    'Product Ads Search Campaign Budget Share (%)',                 'raw',     ['1.24%','0.33%','0.16%','0.58%','0.58%','0.55%','1.66%']),
  R('Product Ads',  'Adoption',    'Manual CPC Campaigns Budget Share (%)',                        'raw',     ['1.21%','0.69%','0.4%','0.34%','1.13%','0.14%','1.89%']),
  R('Product Ads',  'Adoption',    'Smart Shopping Campaign Budget Share (%)',                     'raw',     ['96.14%','95.01%','94.94%','98.28%','97.03%','99.16%','96.46%']),
  R('Product Ads',  'Performance', 'Product Ads Avg. CPC',                                        'number'),
  R('Product Ads',  'Performance', 'Smart Shopping Campaign Average CPC',                          'number'),
  R('Product Ads',  'Performance', 'Product Ads Search Campaigns Avg. CPC',                       'number'),
  R('Product Ads',  'Performance', 'Manual CPC Campaigns Average CPC',                            'number'),
  R('Display Ads',  'Performance', 'Custom Ads Avg. CPM',                                         'number'),
  R('Display Ads',  'Performance', 'Display Ads Avg. CPM',                                        'number'),
  R('Overall',      'Activation',  'Total Core Advertisers (Pareto)',                              'number'),
  R('Display Ads',  'Performance', 'PDA Avg. CPM',                                                'number'),
  R('Display Ads',  'Performance', 'Image Ads Avg. CPM',                                          'number'),
  R('Display Ads',  'Performance', 'Video Ads Avg. CPM',                                          'number'),
  R('Product Ads',  'Performance', 'Response Fill Rate (%)',                                       'percent'),
  R('Product Ads',  'Performance', 'Product Ads Response Rate (%)',                               'percent'),
  R('Display Ads',  'Performance', 'Display Ads Response Rate (%)',                               'percent'),
  R('Product Ads',  'Adoption',    'Product Ad Spend Per Advertiser',                             'number'),
  R('Display Ads',  'Adoption',    'Display Ads Spend Per Advertiser',                            'number'),
  R('Overall',      'Supply',      'Product Ads Contribution',                                    'percent'),
  R('Display Ads',  'Adoption',    'PDA Spend Share (%)',                                         'percent'),
  R('Display Ads',  'Adoption',    'Image Ads Spend Share (%)',                                   'percent'),
  R('Display Ads',  'Adoption',    'Video Ads Spend Share (%)',                                   'percent'),
  R('Display Ads',  'Adoption',    'Custom Ads Spend Share (%)',                                  'percent'),
  R('Overall',      'Supply',      'Display Ads Contribution',                                    'percent'),
];

function formatVal(fmt) {
  if (fmt === 'currency') return '₹0';
  if (fmt === 'percent')  return '0%';
  return '0';
}

// Generate last 7 date labels like "21/04"
function getDateCols() {
  const cols = [];
  const base = new Date('2026-04-21');
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const day = String(d.getDate()).padStart(2, '0');
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    cols.push(`${day}/${mon}`);
  }
  return cols;
}
const DATE_COLS = getDateCols();

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

export default function HealthReportPage() {
  const [tab, setTab] = useState('D');
  const [search, setSearch] = useState('');

  const filtered = ROWS.filter(r =>
    r.parameter.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Card */}
      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Card header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico stroke="var(--osmos-brand-primary)" d={<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Health Report</span>
          <Ico stroke="var(--osmos-fg-subtle)" d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={13} />
        </div>

        {/* Toolbar */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* D/W tabs */}
            <div style={{ display: 'flex', border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden' }}>
              {['D', 'W'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  width: 34, height: 28, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: tab === t ? 700 : 400,
                  background: tab === t ? 'var(--osmos-brand-primary)' : '#fff',
                  color: tab === t ? '#fff' : 'var(--osmos-fg-muted)',
                  fontFamily: "'Open Sans', sans-serif",
                  borderRight: t === 'D' ? '1px solid var(--osmos-border)' : 'none',
                }}>{t}</button>
              ))}
            </div>

            {/* Add Filter */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6,
              padding: '5px 10px', cursor: 'pointer', fontSize: 11, color: 'var(--osmos-fg-muted)',
              fontFamily: "'Open Sans', sans-serif",
            }}>
              <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={11} sw={2.5} />
              Add Filter
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Columns button */}
            <button style={{ height: 30, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)' }}>
              <Ico d={<><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></>} />
              <Ico d={<polyline points="6 9 12 15 18 9"/>} size={11} />
            </button>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search Parameters"
                style={{ border: 'none', outline: 'none', fontSize: 11, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap', minWidth: 120 }}>Category</th>
                <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap', minWidth: 110 }}>Impact</th>
                <th style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, minWidth: 260 }}>Parameters</th>
                {DATE_COLS.map(d => (
                  <th key={d} style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap', minWidth: 70 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                      {d}
                      <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={11} stroke="var(--osmos-fg-subtle)" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)' }}>{row.category}</td>
                  <td style={{ padding: '9px 14px', color: 'var(--osmos-fg-muted)' }}>{row.impact}</td>
                  <td style={{ padding: '9px 14px', color: 'var(--osmos-fg)' }}>{row.parameter}</td>
                  {DATE_COLS.map((d, ci) => (
                    <td key={d} style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--osmos-fg-muted)' }}>
                      {row.values ? row.values[ci] : formatVal(row.fmt)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
