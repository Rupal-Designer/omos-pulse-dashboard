import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

const ROWS = [
  { category: 'Body Care',     floorCpc: '$10',     ceilingCpc: '$15',     bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '0.75', spend: '1.5 M',  revenue: '15.8 M' },
  { category: 'Foot Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '18.7 M', clicks: '18.7 M', ctr: '4.75%', cpc: '0.75', spend: '2.5 M',  revenue: '18.7 M' },
  { category: 'Oral Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '30.2 M', clicks: '30.2 M', ctr: '6.24%', cpc: '1.50', spend: '4.0 M',  revenue: '30.2 M' },
  { category: 'Skin Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '22.1 M', clicks: '22.1 M', ctr: '3.50%', cpc: '1.25', spend: '2.0 M',  revenue: '22.1 M' },
  { category: 'Nail Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '25.3 M', clicks: '25.3 M', ctr: '5.89%', cpc: '2.25', spend: '3.0 M',  revenue: '25.3 M' },
  { category: 'Hair Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '20.4 M', clicks: '20.4 M', ctr: '2.34%', cpc: '1.75', spend: '3.5 M',  revenue: '20.4 M' },
  { category: 'Sun Care',      floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '27.6 M', clicks: '27.6 M', ctr: '7.80%', cpc: '1.00', spend: '4.5 M',  revenue: '27.6 M' },
  { category: 'Body Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '2.00', spend: '1.5 M',  revenue: '15.8 M' },
  { category: 'Body Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '2.00', spend: '1.5 M',  revenue: '15.8 M' },
  { category: 'Body Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '2.00', spend: '1.5 M',  revenue: '15.8 M' },
  { category: 'Body Care',     floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '2.00', spend: '1.5 M',  revenue: '15.8 M' },
  { category: 'Personal Care', floorCpc: 'Default', ceilingCpc: 'Default', bidMult: 'Default', impression: '15.8 M', clicks: '15.8 M', ctr: '1.16%', cpc: '2.00', spend: '1.5 M',  revenue: '15.8 M' },
];

const RefreshIcon = () => (
  <span style={{ verticalAlign: 'middle', display: 'inline-flex' }}>
    <Icon size={14} strokeWidth={2}>
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Icon>
  </span>
);

const GridIcon = () => (
  <Icon size={16} strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </Icon>
);

const InfoIcon = () => (
  <span style={{ verticalAlign: 'middle', marginLeft: 4, display: 'inline-flex' }}>
    <Icon size={13} strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </Icon>
  </span>
);

export default function ProductAdsYieldControlPage() {
  const [form, setForm] = useState({ floorCpc: '$15', ceilingCpc: '$15', bidMultiplier: '5' });
  const [search, setSearch] = useState('');
  const [checkedRows, setCheckedRows] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const { toast, showToast } = useToast();
  const [hoveredRow, setHoveredRow] = useState(null);

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    const map = {};
    ROWS.forEach((_, i) => { map[i] = next; });
    setCheckedRows(map);
  };

  const toggleRow = (i) => {
    setCheckedRows(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const filteredRows = ROWS.filter(r =>
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  const thBase = {
    padding: '10px 14px',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--osmos-fg-muted)',
    background: 'var(--osmos-bg)',
    borderBottom: '1px solid var(--osmos-border)',
    whiteSpace: 'nowrap',
    fontFamily: "'Open Sans', sans-serif",
  };

  const thCenter = {
    ...thBase,
    textAlign: 'center',
  };

  const thGroup = {
    padding: '6px 14px',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--osmos-brand-primary)',
    background: 'var(--osmos-bg-subtle)',
    borderBottom: '1px solid var(--osmos-border)',
    borderTop: '2px solid var(--osmos-brand-primary)',
    whiteSpace: 'nowrap',
    fontFamily: "'Open Sans', sans-serif",
  };

  const tdBase = {
    padding: '11px 14px',
    borderBottom: '1px solid var(--osmos-border)',
    color: 'var(--osmos-fg-muted)',
    fontSize: 13,
    fontFamily: "'Open Sans', sans-serif",
    verticalAlign: 'middle',
    textAlign: 'center',
  };

  const fieldGroup = (label, key) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", display: 'flex', alignItems: 'center' }}>
        {label}&nbsp;<span style={{ color: 'var(--alert-error-primary)' }}>*</span>
        <InfoIcon />
      </label>
      <input
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{
          border: '1px solid var(--osmos-border)',
          borderRadius: 6,
          padding: '6px 10px',
          fontSize: 13,
          width: 180,
          fontFamily: "'Open Sans', sans-serif",
          color: 'var(--osmos-fg)',
          background: 'var(--osmos-bg)',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );

  const Checkbox = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      style={{
        width: 16,
        height: 16,
        border: `2px solid ${checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
        borderRadius: 3,
        background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return (
    <div style={{
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--osmos-bg)',
    }}>

      {/* ── Top Settings Bar ── */}
      <div style={{
        background: 'var(--osmos-bg)',
        borderBottom: '1px solid var(--osmos-border)',
        padding: '16px 24px',
        display: 'flex',
        gap: 24,
        alignItems: 'flex-end',
        flexShrink: 0,
      }}>
        {fieldGroup('Default Floor CPC', 'floorCpc')}
        <div style={{ width: 1, height: 48, background: 'var(--osmos-border)', alignSelf: 'center' }} />
        {fieldGroup('Default Ceiling CPC', 'ceilingCpc')}
        <div style={{ width: 1, height: 48, background: 'var(--osmos-border)', alignSelf: 'center' }} />
        {fieldGroup('Default CPC Bid Multiplier', 'bidMultiplier')}
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        background: 'var(--osmos-bg)',
      }}>
        {/* Left: Change Log */}
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          color: 'var(--osmos-brand-primary)',
          fontSize: 13,
          fontFamily: "'Open Sans', sans-serif",
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          fontWeight: 500,
        }}>
          <RefreshIcon /> Change Log
        </button>

        {/* Right: grid icon + search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            border: '1px solid var(--osmos-border)',
            borderRadius: 6,
            background: 'var(--osmos-bg)',
            cursor: 'pointer',
            color: 'var(--osmos-fg-muted)',
          }}>
            <GridIcon />
          </button>
          <div style={{ position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search category"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '7px 10px 7px 30px',
                border: '1px solid var(--osmos-border)',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "'Open Sans', sans-serif",
                color: 'var(--osmos-fg)',
                background: 'var(--osmos-bg)',
                outline: 'none',
                width: 200,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ flex: 1, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: "'Open Sans', sans-serif" }}>
          <thead>
            {/* Group header row */}
            <tr>
              <th style={{ ...thBase, textAlign: 'center', width: 40 }} rowSpan={2}>
                <Checkbox checked={allChecked} onChange={toggleAll} />
              </th>
              <th style={{ ...thBase, textAlign: 'left' }} rowSpan={2}>Category</th>
              <th colSpan={3} style={thGroup}>Yield Control</th>
              <th colSpan={6} style={{ ...thGroup, borderLeft: '1px solid var(--osmos-border)' }}>
                Category Performance (last 7 days)
              </th>
            </tr>
            {/* Column name row */}
            <tr>
              <th style={thCenter}>Floor CPC</th>
              <th style={thCenter}>Ceiling CPC</th>
              <th style={thCenter}>CPC Bid Multiplier</th>
              <th style={{ ...thCenter, borderLeft: '1px solid var(--osmos-border)' }}>Impression</th>
              <th style={thCenter}>Clicks</th>
              <th style={thCenter}>CTR</th>
              <th style={thCenter}>CPC</th>
              <th style={thCenter}>Spend</th>
              <th style={thCenter}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => {
              const isChecked = !!checkedRows[i];
              const isHovered = hoveredRow === i;
              const cpcColor = (val) =>
                val && val.startsWith('$') ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)';

              return (
                <tr
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ background: isHovered ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)' }}
                >
                  <td style={{ ...tdBase, textAlign: 'center', width: 40 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Checkbox checked={isChecked} onChange={() => toggleRow(i)} />
                    </div>
                  </td>
                  <td style={{ ...tdBase, textAlign: 'left', color: 'var(--osmos-fg)', fontWeight: 600 }}>
                    {row.category}
                  </td>
                  <td style={{ ...tdBase, color: cpcColor(row.floorCpc) }}>{row.floorCpc}</td>
                  <td style={{ ...tdBase, color: cpcColor(row.ceilingCpc) }}>{row.ceilingCpc}</td>
                  <td style={tdBase}>{row.bidMult}</td>
                  <td style={{ ...tdBase, borderLeft: '1px solid var(--osmos-border)' }}>{row.impression}</td>
                  <td style={tdBase}>{row.clicks}</td>
                  <td style={tdBase}>{row.ctr}</td>
                  <td style={tdBase}>{row.cpc}</td>
                  <td style={tdBase}>{row.spend}</td>
                  <td style={tdBase}>{row.revenue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Sticky Footer ── */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: 'var(--osmos-bg)',
        borderTop: '1px solid var(--osmos-border)',
        padding: '12px 24px',
        textAlign: 'center',
        flexShrink: 0,
        zIndex: 10,
      }}>
        <button
          onClick={() => showToast('Settings saved successfully')}
          style={{
            width: 120,
            padding: '9px 0',
            background: 'var(--osmos-brand-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Open Sans', sans-serif",
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>

      <Toast {...toast} />
    </div>
  );
}
