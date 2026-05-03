import React, { useState } from 'react';
import { SearchIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Checkbox } from '../../ui/atoms/Checkbox';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

const INITIAL_DATA = [
  { name: 'Gillette',          id: '12345', categoryTargeting: true,  brandTargeting: false },
  { name: 'Colgate Palmolive', id: '67890', categoryTargeting: false, brandTargeting: true  },
  { name: 'HUL',               id: '54321', categoryTargeting: true,  brandTargeting: true  },
  { name: 'Nestle',            id: '98765', categoryTargeting: false, brandTargeting: false },
  { name: 'HUL',               id: '13579', categoryTargeting: true,  brandTargeting: false },
  { name: 'P&G',               id: '24680', categoryTargeting: false, brandTargeting: true  },
  { name: 'Britannia',         id: '11223', categoryTargeting: true,  brandTargeting: false },
  { name: 'Gillette',          id: '33445', categoryTargeting: false, brandTargeting: true  },
];

const COLS = ['Advertiser Name', 'Advertiser Id', 'Enable Category Targeting', 'Enable Brand Targeting'];

const TD = {
  padding: '10px 16px',
  fontSize: 13,
  color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)',
  fontFamily: FONT,
};

export default function ManageAttributeTargetingPage() {
  const [rows, setRows]     = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const { toast, showToast } = useToast();

  function toggleField(idx, field) {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: !r[field] } : r));
    showToast('Targeting updated');
  }

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search)
  );

  return (
    <div style={{ fontFamily: FONT, background: 'var(--osmos-bg-subtle)', minHeight: '100vh', padding: '20px 24px' }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 10, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--osmos-border)', flexWrap: 'wrap' }}>
          {/* Count badge */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--osmos-bg-subtle)', borderRadius: 20, padding: '4px 12px', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)', fontFamily: FONT }}>Advertisers</span>
            <span style={{ background: 'var(--osmos-brand-primary)', color: '#fff', borderRadius: 12, fontSize: 11, fontWeight: 700, padding: '1px 7px' }}>120</span>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--osmos-border)', borderRadius: 7, padding: '6px 10px', background: 'var(--osmos-bg)', minWidth: 180 }}>
            <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              style={{ border: 'none', outline: 'none', fontFamily: FONT, fontSize: 12, color: 'var(--osmos-fg)', background: 'transparent', flex: 1 }}
            />
          </div>

          <div style={{ flex: 1 }} />

          <Button onClick={() => showToast('Create Rules coming soon')}>Create Rules</Button>
          <Button variant="outline" onClick={() => showToast('Create Campaign coming soon')}>Create Campaign</Button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                {COLS.map(col => (
                  <th key={col} style={{
                    padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700,
                    color: 'var(--osmos-fg-muted)', borderBottom: '1px solid var(--osmos-border)',
                    whiteSpace: 'nowrap', letterSpacing: '0.03em', textTransform: 'uppercase', fontFamily: FONT,
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={COLS.length}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: 12 }}>
                      <SearchIcon size={36} color="var(--osmos-fg-subtle)" />
                      <span style={{ fontSize: 14, color: 'var(--osmos-fg-subtle)', fontWeight: 500, fontFamily: FONT }}>No Data Available</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((row, i) => (
                <tr
                  key={row.id + i}
                  style={{ borderBottom: '1px solid var(--osmos-border)', background: 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {row.name[0]}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>{row.name}</span>
                    </div>
                  </td>

                  <td style={TD}>
                    <code style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 4, padding: '2px 7px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: 'monospace' }}>
                      {row.id}
                    </code>
                  </td>

                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Checkbox
                        checked={row.categoryTargeting}
                        onChange={() => toggleField(rows.indexOf(row), 'categoryTargeting')}
                      />
                      <span style={{ fontSize: 12, color: row.categoryTargeting ? 'var(--osmos-fg)' : 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
                        {row.categoryTargeting ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>

                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Checkbox
                        checked={row.brandTargeting}
                        onChange={() => toggleField(rows.indexOf(row), 'brandTargeting')}
                      />
                      <span style={{ fontSize: 12, color: row.brandTargeting ? 'var(--osmos-fg)' : 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
                        {row.brandTargeting ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--osmos-border)', fontSize: 12, color: 'var(--osmos-fg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT }}>
          <span>Showing {filtered.length} of {rows.length} advertisers</span>
          <span style={{ color: 'var(--osmos-fg-muted)' }}>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
