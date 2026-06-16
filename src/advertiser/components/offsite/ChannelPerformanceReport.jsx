import { useState } from 'react';

const FONT        = "'Open Sans', sans-serif";
const BLUE        = '#1970E1';
const GREY_TEXT   = '#404040';
const GREY_MID    = '#7B7B7B';
const GREY_BORDER = '#DEDEDE';
const GREY_SURF1  = '#FAFAFA';
const TBL_BORDER  = '#EDF0F5';

const DATA = [
  { channel: 'Facebook Ad', adSpend: '$5,854.66', adImpressions: '911.8 K', adClicks: '10.9 K', cpc: '$0.10', cpm: '$0.10', viewProduct: '17.5 K', addToCart: '11.2 K' },
  { channel: 'Google Ad',   adSpend: '$6,123.45', adImpressions: '1.2 M',   adClicks: '15.3 K', cpc: '$0.45', cpm: '$0.45', viewProduct: '19.1 K', addToCart: '12.6 K' },
  { channel: 'TikTok Ad',   adSpend: '$6,432.10', adImpressions: '1.4 M',   adClicks: '18.7 K', cpc: '$0.56', cpm: '$0.9',  viewProduct: '26.5 K', addToCart: '15.1 K' },
];

export function ChannelPerformanceReport() {
  const [search, setSearch] = useState('');

  const filtered = DATA.filter(r =>
    r.channel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChannelIcon />
          <span style={{ fontSize: 16, fontWeight: 600, color: GREY_TEXT }}>Channel Performance Report</span>
          <InfoCircle />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={iconBtnStyle} title="Configure columns"><ColsIcon /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${GREY_BORDER}`, borderRadius: 8, padding: '6px 10px', background: 'white' }}>
            <SearchIcon />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search category L1" style={{ border: 'none', outline: 'none', fontSize: 13, fontFamily: FONT, color: GREY_TEXT, width: 140 }} />
          </div>
          <button style={iconBtnStyle} title="Download"><DownloadIcon /></button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ marginBottom: 12 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'white', border: `1px solid ${GREY_BORDER}`, borderRadius: 20, fontSize: 13, color: GREY_MID, fontFamily: FONT, cursor: 'pointer' }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add a Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${GREY_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: GREY_SURF1, borderBottom: `1px solid ${TBL_BORDER}` }}>
              {['Channel', 'Ad Spend', 'Ad Impressions', 'Ad Clicks', 'CPC', 'CPM', 'View Product', 'Add to Cart'].map((col, i) => (
                <th key={col} style={{ padding: '14px 16px', textAlign: i === 0 ? 'left' : 'right', fontSize: 13, fontWeight: 600, color: GREY_TEXT, whiteSpace: 'nowrap' }}>
                  {col} <InfoCircle />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${TBL_BORDER}`, background: 'white' }}>
                <td style={{ padding: '14px 16px', fontSize: 13, color: GREY_TEXT, fontWeight: 500 }}>{row.channel}</td>
                <td style={tdR}>{row.adSpend}</td>
                <td style={tdR}>{row.adImpressions}</td>
                <td style={tdR}>{row.adClicks}</td>
                <td style={tdR}>{row.cpc}</td>
                <td style={tdR}>{row.cpm}</td>
                <td style={tdR}>{row.viewProduct}</td>
                <td style={tdR}>{row.addToCart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px', fontSize: 12, color: GREY_MID }}>
        <span>Comparison mode not applicable</span>
        <span>One Filter Applicable: <span style={{ color: BLUE }}>Date</span></span>
      </div>
    </div>
  );
}

const tdR = { padding: '14px 16px', fontSize: 13, color: GREY_MID, textAlign: 'right' };
const iconBtnStyle = { border: `1px solid ${GREY_BORDER}`, borderRadius: 8, background: 'white', padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' };

function InfoCircle() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
}
function SearchIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function ColsIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/></svg>;
}
function DownloadIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function ChannelIcon() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1877F2' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EA4335' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#010101' }} />
    </div>
  );
}
