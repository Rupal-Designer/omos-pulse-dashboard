import React, { useState } from 'react';
import { DataTable } from './DataTable';

const COUNTRY_COLUMNS = [
  { label: 'Country Name', sort: true },
  { label: 'No. of Campaigns', info: true },
  { label: 'Link Clicks', info: true },
  { label: 'Total Product Views', info: true },
  { label: 'Add to Carts', info: true },
  { label: 'Orders', info: true },
  { label: 'Total Revenue', info: true },
];

const COUNTRY_ROWS = [
  ['United States', '09', '4.1M', '3.5M', '450K', '140K', '$230K'],
  ['South Korea',   '11', '2.7M', '1.2M', '770K', '370K', '$370K'],
  ['New Zealand',   '14', '934K', '810K', '530K', '438K', '$910K'],
  ['United Kingdom','11', '750K', '615K', '360K', '190K', '$560K'],
  ['India',         '04', '769K', '610K', '430K', '280K', '$140K'],
];

const CITY_ROWS = [
  ['New York',   '07', '1.2M', '980K', '220K', '88K',  '$120K'],
  ['Seoul',      '09', '980K', '720K', '340K', '180K', '$190K'],
  ['Auckland',   '11', '540K', '490K', '280K', '210K', '$450K'],
  ['London',     '08', '430K', '370K', '190K', '95K',  '$310K'],
  ['Mumbai',     '03', '380K', '290K', '210K', '130K', '$80K'],
];

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function ChevronDown({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

export default function GeoTable() {
  const [tab, setTab] = useState('country');

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #F0F0F0', overflow: 'hidden', marginBottom: 20 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #F5F5F5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>Geo Performance</span>
          <InfoIcon />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{
            height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5,
            background: '#fff', border: '1px solid #E0E0E0', borderRadius: 6,
            cursor: 'pointer', fontSize: 11, color: '#555', fontFamily: 'inherit',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
              <line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
            <ChevronDown size={10} />
          </button>
          <div style={{
            height: 32, padding: '0 10px',
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid #E0E0E0', borderRadius: 6,
          }}>
            <SearchIcon />
            <input placeholder="Search" style={{
              border: 'none', outline: 'none', fontSize: 11, color: '#333',
              fontFamily: 'inherit', width: 100, background: 'transparent',
            }} />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Country / City tabs */}
      <div style={{ padding: '12px 20px 0', borderBottom: '1px solid #F5F5F5', display: 'flex', gap: 0 }}>
        <div style={{
          display: 'inline-flex',
          background: '#EAF1F4', borderRadius: 8, padding: 3, marginBottom: 12,
        }}>
          {['country','city'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '5px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontSize: 12, fontFamily: 'inherit', fontWeight: tab === t ? 600 : 400,
              background: tab === t ? '#fff' : 'transparent',
              color: tab === t ? '#1A1A2E' : '#888',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
              transition: 'all 0.15s',
            }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Add filter row */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #F5F5F5' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, color: '#5B6EF5', fontFamily: 'inherit', padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#5B6EF5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add a Filter
        </button>
      </div>

      {/* Table */}
      <DataTable columns={COUNTRY_COLUMNS} rows={tab === 'country' ? COUNTRY_ROWS : CITY_ROWS} />

      {/* Footer */}
      <div style={{
        padding: '8px 16px', background: '#F6FBFF',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10, color: '#999',
      }}>
        <span>Comparison mode not applicable</span>
        <span>One Filter Applicable: <span style={{ color: '#5B6EF5', fontWeight: 500 }}>Date</span></span>
      </div>
    </div>
  );
}
