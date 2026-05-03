import React, { useState } from 'react';
import { Icon, DownloadIcon } from '../../ui/atoms/Icon';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── Static Data ──────────────────────────────────────────────────────────────

const CHIPS = [
  { label: 'Ad Revenue',         value: '70%' },
  { label: 'Product Ad Revenue', value: '70%' },
  { label: 'Display Ad Revenue', value: '70%' },
  { label: 'Display Ad CPM',     value: '70%' },
  { label: 'Product Ad CPM',     value: '70%' },
  { label: 'Ad Impression',      value: '70%' },
];

const TREND_DATA = [
  { time: '00:00', today: 2,  yesterday: 4,  lastWeek: 1  },
  { time: '02:00', today: 3,  yesterday: 5,  lastWeek: 2  },
  { time: '04:00', today: 2,  yesterday: 3,  lastWeek: 2  },
  { time: '06:00', today: 4,  yesterday: 4,  lastWeek: 3  },
  { time: '08:00', today: 5,  yesterday: 6,  lastWeek: 4  },
  { time: '10:00', today: 6,  yesterday: 8,  lastWeek: 5  },
  { time: '12:00', today: 7,  yesterday: 10, lastWeek: 6  },
  { time: '14:00', today: 6,  yesterday: 7,  lastWeek: 7  },
  { time: '16:00', today: 8,  yesterday: 9,  lastWeek: 6  },
  { time: '18:00', today: 7,  yesterday: 8,  lastWeek: 8  },
  { time: '20:00', today: 5,  yesterday: 6,  lastWeek: 5  },
  { time: '22:00', today: 4,  yesterday: 5,  lastWeek: 4  },
];

const ADVERTISER_DATA = [
  { name: 'Advertiser 1', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 2', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 3', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 4', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 5', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 6', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
  { name: 'Advertiser 7', adRevenue: 0, adImpressions: 0, adClicks: 0, cpc: 0, cpm: 0, ctr: 0 },
];

const CAMPAIGN_DATA = [
  { name: 'African Holidays and distributors', id: 45434, budget: '$437', revenue: '15.8 M', clicks: '15.8 M', cpc: '0.75', cpm: '0.75', ctr: '1.16%', utilization: '' },
  { name: 'South American Escapes',            id: 45437, budget: '$410', revenue: '18.7 M', clicks: '18.7 M', cpc: '0.75', cpm: '0.75', ctr: '4.75%', utilization: '' },
  { name: 'Asian Getaways and suppliers',      id: 45438, budget: '$562', revenue: '30.2 M', clicks: '30.2 M', cpc: '1.50', cpm: '1.50', ctr: '6.24%', utilization: '' },
  { name: 'North American Travel',             id: 45435, budget: '$750', revenue: '22.1 M', clicks: '22.1 M', cpc: '1.25', cpm: '1.25', ctr: '3.50%', utilization: '' },
  { name: 'Australian Journey',                id: 45439, budget: '$615', revenue: '25.3 M', clicks: '25.3 M', cpc: '2.25', cpm: '2.25', ctr: '5.89%', utilization: '' },
  { name: 'European Adventures and vendors',   id: 45436, budget: '$289', revenue: '20.4 M', clicks: '20.4 M', cpc: '1.75', cpm: '1.75', ctr: '2.34%', utilization: '' },
  { name: 'Antarctic Expeditions and brokers', id: 45440, budget: '$820', revenue: '27.6 M', clicks: '27.6 M', cpc: '1.00', cpm: '1.00', ctr: '7.80%', utilization: '' },
  { name: 'African Holidays and distributors', id: 45434, budget: '$437', revenue: '15.8 M', clicks: '15.8 M', cpc: '2.00', cpm: '2.00', ctr: '1.16%', utilization: '' },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

const cardStyle = {
  background: 'var(--osmos-bg)',
  border: '1px solid var(--osmos-border)',
  borderRadius: 8,
  padding: 16,
  boxSizing: 'border-box',
};

const thStyle = {
  padding: '10px 12px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--osmos-fg-muted)',
  background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)',
  whiteSpace: 'nowrap',
  fontFamily: "'Open Sans', sans-serif",
};

const thCenterStyle = { ...thStyle, textAlign: 'center' };

const tdStyle = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--osmos-border)',
  color: 'var(--osmos-fg-muted)',
  fontSize: 13,
  fontFamily: "'Open Sans', sans-serif",
  verticalAlign: 'middle',
};

const tdCenterStyle = { ...tdStyle, textAlign: 'center' };

// ─── Sub-components ───────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <Icon size={16} strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </Icon>
  );
}


function ChartIcon() {
  return (
    <Icon size={16} color="var(--osmos-brand-primary)" strokeWidth={2}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </Icon>
  );
}

function InfoCircle() {
  return (
    <span style={{ verticalAlign: 'middle', display: 'inline-flex' }}>
      <Icon size={14} color="var(--osmos-fg-muted)" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </Icon>
    </span>
  );
}

function SearchInput({ placeholder, value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'inline-flex' }}>
        <Icon size={13} color="var(--osmos-fg-subtle)" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Icon>
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: '6px 10px 6px 28px',
          border: '1px solid var(--osmos-border)',
          borderRadius: 6,
          fontSize: 12,
          fontFamily: "'Open Sans', sans-serif",
          color: 'var(--osmos-fg)',
          background: 'var(--osmos-bg)',
          outline: 'none',
          width: 210,
        }}
      />
    </div>
  );
}

function IconBtn({ children }) {
  return (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      border: '1px solid var(--osmos-border)',
      borderRadius: 6,
      background: 'var(--osmos-bg)',
      cursor: 'pointer',
      color: 'var(--osmos-fg-muted)',
    }}>
      {children}
    </button>
  );
}

// Custom legend above chart
function TrendLegend() {
  const items = [
    { label: 'Today',              color: 'var(--osmos-brand-primary)', dashed: false },
    { label: 'Yesterday',          color: 'var(--osmos-brand-amber)',   dashed: true  },
    { label: 'Same day last week', color: 'var(--osmos-brand-green)',   dashed: true  },
  ];
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
      {items.map(({ label, color, dashed }) => (
        <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <svg width="24" height="10" style={{ flexShrink: 0 }}>
            {dashed
              ? <line x1="0" y1="5" x2="24" y2="5" stroke={color} strokeWidth="2" strokeDasharray={label === 'Yesterday' ? '4 2' : '2 2'} />
              : <line x1="0" y1="5" x2="24" y2="5" stroke={color} strokeWidth="2" />
            }
          </svg>
          <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: "'Open Sans', sans-serif" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductAdsLivePage() {
  const [selectedChip, setSelectedChip] = useState(0);
  const [advSearch, setAdvSearch] = useState('');
  const [campSearch, setCampSearch] = useState('');
  const [advHover, setAdvHover] = useState(null);
  const [campHover, setCampHover] = useState(null);

  const filteredAdvertisers = ADVERTISER_DATA.filter(r =>
    r.name.toLowerCase().includes(advSearch.toLowerCase())
  );

  const filteredCampaigns = CAMPAIGN_DATA.filter(r =>
    r.name.toLowerCase().includes(campSearch.toLowerCase())
  );

  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--osmos-bg-subtle)',
      minHeight: '100vh',
      fontFamily: "'Open Sans', sans-serif",
      boxSizing: 'border-box',
    }}>

      {/* ── KPI Chips Row ── */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {CHIPS.map((chip, i) => {
          const active = selectedChip === i;
          return (
            <button
              key={i}
              onClick={() => setSelectedChip(i)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 6,
                border: `1px solid ${active ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                background: active ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'Open Sans', sans-serif",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 12, color: active ? '#fff' : 'var(--osmos-fg-muted)' }}>
                {chip.label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: active ? '#fff' : 'var(--osmos-fg)' }}>
                {chip.value}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Today Performance Trend Card ── */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChartIcon />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
              Today Performance Trend
            </span>
            <InfoCircle />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '5px 10px',
              border: '1px solid var(--osmos-border)',
              borderRadius: 6,
              background: 'var(--osmos-bg)',
              fontSize: 12,
              fontFamily: "'Open Sans', sans-serif",
              color: 'var(--osmos-fg)',
              cursor: 'pointer',
            }}>
              Lorem Ipsum
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <IconBtn><DownloadIcon /></IconBtn>
          </div>
        </div>

        {/* Custom legend above chart */}
        <TrendLegend />

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={TREND_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fontFamily: "'Open Sans', sans-serif", fill: 'var(--osmos-fg-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(v) => v === 10 ? '10 M' : v}
              tick={{ fontSize: 11, fontFamily: "'Open Sans', sans-serif", fill: 'var(--osmos-fg-muted)' }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid var(--osmos-border)',
                background: 'var(--osmos-bg)',
                color: 'var(--osmos-fg)',
              }}
            />
            <Line
              type="monotone"
              dataKey="today"
              name="Today"
              stroke="var(--osmos-brand-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="yesterday"
              name="Yesterday"
              stroke="var(--osmos-brand-amber)"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="lastWeek"
              name="Same day last week"
              stroke="var(--osmos-brand-green)"
              strokeWidth={2}
              strokeDasharray="2 2"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Advertiser Performance Report ── */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChartIcon />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
              Advertiser Performance Report
            </span>
            <InfoCircle />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBtn><GridIcon /></IconBtn>
            <SearchInput
              placeholder="Search Advertiser Name"
              value={advSearch}
              onChange={e => setAdvSearch(e.target.value)}
            />
            <IconBtn><DownloadIcon /></IconBtn>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Open Sans', sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={thStyle}>Advertiser Name</th>
                <th style={thCenterStyle}>Ad Revenue</th>
                <th style={thCenterStyle}>
                  Ad Impressions&nbsp;
                  <span style={{ color: 'var(--osmos-brand-primary)', cursor: 'pointer' }}>&#8597;</span>
                </th>
                <th style={thCenterStyle}>Ad Clicks</th>
                <th style={thCenterStyle}>CPC</th>
                <th style={thCenterStyle}>CPM</th>
                <th style={thCenterStyle}>CTR</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvertisers.map((row, i) => (
                <tr
                  key={i}
                  onMouseEnter={() => setAdvHover(i)}
                  onMouseLeave={() => setAdvHover(null)}
                  style={{ background: advHover === i ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)' }}
                >
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--osmos-fg)' }}>{row.name}</td>
                  <td style={tdCenterStyle}>{row.adRevenue}</td>
                  <td style={tdCenterStyle}>{row.adImpressions}</td>
                  <td style={tdCenterStyle}>{row.adClicks}</td>
                  <td style={tdCenterStyle}>{row.cpc}</td>
                  <td style={tdCenterStyle}>{row.cpm}</td>
                  <td style={tdCenterStyle}>{row.ctr}</td>
                </tr>
              ))}
              {/* Footer totals row */}
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderTop: '2px solid var(--osmos-border)' }}>
                <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>Total</td>
                {[0, 0, 0, 0, 0, 0].map((v, i) => (
                  <td key={i} style={{ ...tdCenterStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Filter note */}
        <div style={{ textAlign: 'right', marginTop: 8, fontSize: 11, fontStyle: 'italic', color: 'var(--osmos-brand-primary)' }}>
          One Filter Applicable: Date
        </div>
      </div>

      {/* ── Product Ads - Campaign Performance Report ── */}
      <div style={{ ...cardStyle, marginTop: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChartIcon />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
              Product Ads - Campaign Performance Report
            </span>
            <InfoCircle />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBtn><GridIcon /></IconBtn>
            <SearchInput
              placeholder="Search Advertiser Name"
              value={campSearch}
              onChange={e => setCampSearch(e.target.value)}
            />
            <IconBtn><DownloadIcon /></IconBtn>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Open Sans', sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={thStyle}>Campaign Name</th>
                <th style={thCenterStyle}>
                  Campaign ID&nbsp;
                  <span style={{ color: 'var(--osmos-brand-primary)', cursor: 'pointer' }}>&#8597;</span>
                </th>
                <th style={thCenterStyle}>Daily Budget</th>
                <th style={thCenterStyle}>Ad Revenue</th>
                <th style={thCenterStyle}>Ad Clicks</th>
                <th style={thCenterStyle}>CPC</th>
                <th style={thCenterStyle}>CPM</th>
                <th style={thCenterStyle}>CTR</th>
                <th style={thCenterStyle}>Budget Utilization</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((row, i) => (
                <tr
                  key={i}
                  onMouseEnter={() => setCampHover(i)}
                  onMouseLeave={() => setCampHover(null)}
                  style={{ background: campHover === i ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)' }}
                >
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--osmos-fg)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.name}
                  </td>
                  <td style={tdCenterStyle}>{row.id}</td>
                  <td style={tdCenterStyle}>{row.budget}</td>
                  <td style={tdCenterStyle}>{row.revenue}</td>
                  <td style={tdCenterStyle}>{row.clicks}</td>
                  <td style={tdCenterStyle}>{row.cpc}</td>
                  <td style={tdCenterStyle}>{row.cpm}</td>
                  <td style={tdCenterStyle}>{row.ctr}</td>
                  <td style={tdCenterStyle}>{row.utilization}</td>
                </tr>
              ))}
              {/* Footer totals row */}
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderTop: '2px solid var(--osmos-border)' }}>
                <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>Total</td>
                <td style={{ ...tdCenterStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>0</td>
                <td style={{ ...tdCenterStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>0</td>
                <td style={{ ...tdCenterStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>0</td>
                <td style={{ ...tdCenterStyle, fontWeight: 700, color: 'var(--osmos-fg)' }}>0</td>
                <td style={tdCenterStyle} />
                <td style={tdCenterStyle} />
                <td style={tdCenterStyle} />
                <td style={tdCenterStyle} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Filter note */}
        <div style={{ textAlign: 'right', marginTop: 8, fontSize: 11, fontStyle: 'italic', color: 'var(--osmos-brand-primary)' }}>
          One Filter Applicable: Date
        </div>
      </div>

    </div>
  );
}
