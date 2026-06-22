import React, { useState } from 'react';

/* ── Channel icon bubbles ───────────────────────────────────────── */
const ChannelIcon = ({ ch }) => {
  const icons = {
    Meta: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    Google: (
      <svg width="12" height="12" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    TikTok: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#000">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z"/>
      </svg>
    ),
    DV360: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1A73E8"/>
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">DV</text>
      </svg>
    ),
  };
  return (
    <span style={{
      width: 22, height: 22, borderRadius: '50%', border: '1.5px solid var(--border)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', flexShrink: 0,
    }}>
      {icons[ch] || <span style={{ fontSize: 7, fontWeight: 700 }}>{ch[0]}</span>}
    </span>
  );
};

/* ── Data ───────────────────────────────────────────────────────── */
const DATA = [
  { cohort: 'High-Value Shoppers',   source: 'Import by ID', advertisers: 4, channels: ['Meta','Google','TikTok','DV360'], size: '5.08M', revenue: '$44,640' },
  { cohort: 'Baby & Kids Intenders', source: 'Import by ID', advertisers: 3, channels: ['Meta','Google','TikTok'],          size: '4.17M', revenue: '$32,760' },
  { cohort: 'Premium Parents',       source: 'Import by ID', advertisers: 2, channels: ['Meta','Google'],                   size: '3.85M', revenue: '$33,420' },
  { cohort: 'New Parents Segment',   source: 'Import by ID', advertisers: 2, channels: ['Meta','TikTok'],                   size: '4.95M', revenue: '$42,020' },
];

const COLS = [
  { key: 'cohort',       label: 'Cohort' },
  { key: 'source',       label: 'Source' },
  { key: 'advertisers',  label: 'Advertisers' },
  { key: 'channels',     label: 'Channels' },
  { key: 'size',         label: 'Audience Size' },
  { key: 'revenue',      label: 'Revenue' },
];

export default function CampaignsTable() {
  const [search, setSearch] = useState('');

  const filtered = DATA.filter(r =>
    r.cohort.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: 'var(--bg-screen)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
    }}>
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>Advertiser Performance</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid var(--border)', borderRadius: 8,
          padding: '6px 12px', minWidth: 200,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="var(--text-muted)" strokeWidth="1.2"/>
            <path d="M9 9l2.5 2.5" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cohorts..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: 'var(--text)', width: '100%' }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ padding: '0 20px 16px' }}>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-1)' }}>
              {COLS.map(col => (
                <th key={col.key} style={{
                  padding: '10px 20px', textAlign: 'left',
                  fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
                }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)' }} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, ri) => (
              <tr
                key={ri}
                style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-1)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                {/* Cohort */}
                <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>
                  {row.cohort}
                </td>
                {/* Source */}
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    background: '#eff6ff', color: '#2563eb',
                    padding: '3px 10px', borderRadius: 20,
                    border: '1px solid #bfdbfe', whiteSpace: 'nowrap',
                  }}>
                    {row.source}
                  </span>
                </td>
                {/* Advertisers */}
                <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text)', textAlign: 'left' }}>
                  {row.advertisers}
                </td>
                {/* Channels */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {row.channels.map(ch => <ChannelIcon key={ch} ch={ch} />)}
                  </div>
                </td>
                {/* Audience Size */}
                <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  {row.size}
                </td>
                {/* Revenue */}
                <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#16a34a', whiteSpace: 'nowrap' }}>
                  {row.revenue}
                </td>
                {/* View */}
                <td style={{ padding: '14px 20px' }}>
                  <button style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, color: 'var(--primary)',
                    padding: 0,
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
