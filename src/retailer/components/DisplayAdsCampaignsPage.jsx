import React, { useState } from 'react';
import { SearchIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Toast, useToast } from '../../ui/atoms/Toast';

const INITIAL_CAMPAIGNS = [
  { id: 1, campaignName: 'Copy of TestQA588', merchantName: 'HP (HP)', status: 'Active', createdOn: '16 Jun 25, 01:25 PM +05:30', labels: [] },
  { id: 2, campaignName: 'TestQA588', merchantName: 'Tropicana', status: 'Active', createdOn: '16 Jun 25, 01:25 PM +05:30', labels: ['Highest Shopper'] },
  { id: 3, campaignName: 'Copy of TestQA462', merchantName: "Whitaker's", status: 'Active', createdOn: '13 Jun 25, 12:24 PM +05:30', labels: [] },
  { id: 4, campaignName: 'TestQA462', merchantName: 'Nescafe', status: 'Active', createdOn: '13 Jun 25, 12:24 PM +05:30', labels: ['No Spends in last 30 days'] },
  { id: 5, campaignName: 'Copy of TestQA541', merchantName: 'HP (HP)', status: 'Active', createdOn: '13 Jun 25, 12:24 PM +05:30', labels: [] },
  { id: 6, campaignName: 'TestQA541', merchantName: "Whitaker's", status: 'Active', createdOn: '13 Jun 25, 12:24 PM +05:30', labels: [] },
  { id: 7, campaignName: 'Copy of TestQA380', merchantName: 'HP (HP)', status: 'Active', createdOn: '12 Jun 25, 11:00 AM +05:30', labels: [] },
  { id: 8, campaignName: 'TestQA380', merchantName: 'Nescafe', status: 'Active', createdOn: '12 Jun 25, 11:00 AM +05:30', labels: [] },
  { id: 9, campaignName: 'Paper Mate Spring Promo', merchantName: 'Paper Mate', status: 'Active', createdOn: '10 Jun 25, 09:15 AM +05:30', labels: ['Highest Shopper'] },
  { id: 10, campaignName: 'Head Brands Awareness', merchantName: 'Head Brands', status: 'Active', createdOn: '09 Jun 25, 03:45 PM +05:30', labels: ['No Spends in last 30 days'] },
];

const LABEL_STYLES = {
  'Highest Shopper': {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--osmos-brand-green)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  'No Spends in last 30 days': {
    background: 'rgba(245, 158, 11, 0.1)',
    color: 'var(--osmos-brand-amber)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
};

const PAGE_SIZE = 8;

const TH = {
  textAlign: 'left', padding: '10px 16px', fontSize: '12px', fontWeight: '600',
  color: 'var(--osmos-fg-muted)', background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap',
};
const TD = {
  padding: '11px 16px', fontSize: '13px', color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)', verticalAlign: 'middle',
};
const TD_MUTED = { ...TD, color: 'var(--osmos-fg-muted)' };
const STATUS_PILL = {
  display: 'inline-block',
  background: 'rgba(16, 185, 129, 0.1)',
  color: 'var(--osmos-brand-green)',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  borderRadius: '20px', padding: '2px 10px', fontSize: '12px', fontWeight: '600',
};

function pageBtn(active, disabled) {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '28px', height: '28px', borderRadius: '5px',
    border: '1px solid var(--osmos-border)',
    background: active ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
    color: active ? '#fff' : disabled ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '12px', fontWeight: '600',
    fontFamily: "'Open Sans', sans-serif",
    opacity: disabled ? 0.5 : 1,
  };
}

export default function DisplayAdsCampaignsPage() {
  const [campaigns] = useState(INITIAL_CAMPAIGNS);
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(1);
  const { toast, showToast } = useToast();

  const filtered = campaigns.filter(
    (c) =>
      c.campaignName.toLowerCase().includes(search.toLowerCase()) ||
      c.merchantName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", padding: '20px 24px', background: 'var(--osmos-bg)', minHeight: '100vh', color: 'var(--osmos-fg)' }}>
      <Toast {...toast} />

      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--osmos-fg)', marginBottom: '16px' }}>
        Display Ads — Campaign Review
      </div>

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: '10px', overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: '6px', padding: '4px 10px', fontSize: '13px', fontWeight: '600', color: 'var(--osmos-fg)', whiteSpace: 'nowrap' }}>
            Campaigns ({filtered.length})
          </span>

          <div style={{ position: 'relative', flex: '1', maxWidth: '320px', minWidth: '180px' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={14} color="var(--osmos-fg-muted)" />
            </span>
            <input
              style={{ width: '100%', paddingLeft: '32px', paddingRight: '10px', paddingTop: '7px', paddingBottom: '7px', border: '1px solid var(--osmos-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", boxSizing: 'border-box' }}
              type="text"
              placeholder="Search campaigns or merchants…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <div style={{ flex: 1 }} />

          <Button onClick={() => showToast('Create Campaign clicked')}>
            <PlusIcon size={12} color="#fff" />
            Create Campaign
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={TH}>Campaign Name</th>
                <th style={TH}>Merchant Name</th>
                <th style={TH}>Status</th>
                <th style={TH}>Campaign Created on</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ ...TD, textAlign: 'center', color: 'var(--osmos-fg-subtle)', padding: '32px 16px' }}>
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ background: hoveredRow === row.id ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)', transition: 'background 0.12s' }}
                  >
                    <td style={TD}>
                      <span style={{ fontWeight: '500' }}>{row.campaignName}</span>
                      {row.labels.map((lbl) => (
                        <span key={lbl} style={{ display: 'inline-block', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: '600', marginLeft: '6px', ...(LABEL_STYLES[lbl] || {}) }}>
                          {lbl}
                        </span>
                      ))}
                    </td>
                    <td style={TD_MUTED}>{row.merchantName}</td>
                    <td style={TD}><span style={STATUS_PILL}>{row.status}</span></td>
                    <td style={TD_MUTED}>{row.createdOn}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--osmos-border)', fontSize: '13px', color: 'var(--osmos-fg-muted)', flexWrap: 'wrap', gap: '8px' }}>
          <span>Showing {pageRows.length} of {filtered.length} campaigns</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={pageBtn(false, safePage === 1)} disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous page">
              <ChevronLeftIcon size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button key={pg} style={pageBtn(pg === safePage, false)} onClick={() => setPage(pg)}>{pg}</button>
            ))}
            <button style={pageBtn(false, safePage === totalPages)} disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} aria-label="Next page">
              <ChevronRightIcon size={14} />
            </button>
            <span style={{ marginLeft: '8px', color: 'var(--osmos-fg-subtle)', fontSize: '12px' }}>
              Page {safePage} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
