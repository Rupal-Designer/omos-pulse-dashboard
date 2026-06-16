import { useState } from 'react';

const FONT        = "'Open Sans', sans-serif";
const GREY_TEXT   = '#404040';
const GREY_MID    = '#7B7B7B';
const GREY_BORDER = '#DEDEDE';
const GREY_SURF1  = '#FAFAFA';
const TBL_BORDER  = '#EDF0F5';

// Product placeholder image (generic blue gradient)
const PRODUCT_IMG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23c7d8f5" rx="2"/><text x="50%25" y="55%25" font-size="18" text-anchor="middle" fill="%231970E1">📦</text></svg>';

const PRODUCTS = [
  { name: 'Inkjoy Pens by Paper Mate.', campaign: 'Meta Dynamic Ads (5th May | 16:20)', brand: 'Paper Mate', category: 'Office Supplies>Writing Suppl...', sku: '1002803__Anet', price: '$30', salePrice: '$25' },
  { name: 'Clearpoint Mechanical',       campaign: 'Office and writing supplies',         brand: 'Paper Mate', category: 'Office Supplies>Writing Suppl...', sku: '1002803__Anet', price: '$45', salePrice: '$38' },
  { name: 'Erasable Colored Pencils by P...', campaign: 'Meta Dynamic Ads (5th May | 16:20)', brand: 'Paper Mate', category: 'Office Supplies>Writing Suppl...', sku: '1002803__Anet', price: '$57', salePrice: '$49' },
  { name: 'SharpWriter Pencils from Pape...', campaign: 'Office and writing supplies',    brand: 'Paper Mate', category: 'Office Supplies>Writing Suppl...', sku: '1002803__Anet', price: '$35', salePrice: '$29' },
  { name: 'Write Bros Ballpoint Pens Pape...', campaign: 'Meta Dynamic Ads (5th May | 16:20)', brand: 'Paper Mate', category: 'Office Supplies>Writing Suppl...', sku: '1002803__Anet', price: '$78', salePrice: '$65' },
];

const CATEGORIES = [
  { name: 'Office Supplies',     campaignCount: 3, adSpend: '$12,432', impressions: '2.1 M', clicks: '24.5 K', revenue: '$45,200' },
  { name: 'Writing Instruments', campaignCount: 5, adSpend: '$18,756', impressions: '3.4 M', clicks: '38.2 K', revenue: '$72,100' },
  { name: 'Paper Products',      campaignCount: 2, adSpend: '$7,890',  impressions: '1.2 M', clicks: '14.1 K', revenue: '$28,450' },
];

export function ProductsPerformance() {
  const [activeTab, setActiveTab] = useState('Products');
  const [search, setSearch] = useState('');

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PerfIcon />
          <span style={{ fontSize: 16, fontWeight: 600, color: GREY_TEXT }}>Performance</span>
          <InfoCircle />
        </div>
      </div>

      {/* Tab bar + controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${GREY_BORDER}`, flexShrink: 0 }}>
          {['Products', 'Categories'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 20px', border: 'none', background: 'none',
              fontSize: 14, fontFamily: FONT, cursor: 'pointer',
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? '#1970E1' : GREY_MID,
              borderBottom: activeTab === tab ? '2px solid #1970E1' : '2px solid transparent',
              marginBottom: -2,
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={iconBtnStyle} title="Refresh"><RefreshIcon /></button>
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
      {activeTab === 'Products' ? (
        <div style={{ border: `1px solid ${GREY_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: GREY_SURF1, borderBottom: `1px solid ${TBL_BORDER}` }}>
                <th style={{ width: 52, padding: '12px 16px' }}></th>
                <th style={thL}>Product Name</th>
                <th style={thL}>Campaign Name</th>
                <th style={thL}>Brand Name</th>
                <th style={thL}>Category</th>
                <th style={thL}>SKU ID</th>
                <th style={thR}>Price <InfoCircle /></th>
                <th style={thR}>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${TBL_BORDER}`, background: 'white' }}>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <img src={PRODUCT_IMG} alt={row.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                  </td>
                  <td style={tdL}>{row.name}</td>
                  <td style={tdL}>{row.campaign}</td>
                  <td style={tdL}>{row.brand}</td>
                  <td style={tdL}>{row.category}</td>
                  <td style={tdL}>{row.sku}</td>
                  <td style={tdR2}>{row.price}</td>
                  <td style={tdR2}>{row.salePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ border: `1px solid ${GREY_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: GREY_SURF1, borderBottom: `1px solid ${TBL_BORDER}` }}>
                <th style={thL}>Category Name</th>
                <th style={thR}>Campaigns <InfoCircle /></th>
                <th style={thR}>Ad Spend <InfoCircle /></th>
                <th style={thR}>Ad Impressions <InfoCircle /></th>
                <th style={thR}>Ad Clicks <InfoCircle /></th>
                <th style={thR}>Revenue <InfoCircle /></th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${TBL_BORDER}`, background: 'white' }}>
                  <td style={tdL}>{row.name}</td>
                  <td style={tdR2}>{row.campaignCount}</td>
                  <td style={tdR2}>{row.adSpend}</td>
                  <td style={tdR2}>{row.impressions}</td>
                  <td style={tdR2}>{row.clicks}</td>
                  <td style={tdR2}>{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const thL = { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: GREY_TEXT, whiteSpace: 'nowrap' };
const thR = { padding: '12px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: GREY_TEXT, whiteSpace: 'nowrap' };
const tdL = { padding: '12px 16px', fontSize: 13, color: GREY_MID };
const tdR2 = { padding: '12px 16px', fontSize: 13, color: GREY_MID, textAlign: 'right' };
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
function RefreshIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
}
function PerfIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1970E1" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
