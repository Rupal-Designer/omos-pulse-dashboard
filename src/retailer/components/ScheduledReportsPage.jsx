import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';

const REPORTS = [
  { enabled: true,  name: 'QATestingIQUi4JALLB',       type: 'Analytics > Advertiser ...', source: 'Dashboard Report', period: 'Last 14 Days', lastRun: '16 Mar 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Rajesh' },
  { enabled: true,  name: 'QATestingIeIfZFFBXd',        type: 'Analytics > Advertiser ...', source: 'Dashboard Report', period: 'Last 14 Days', lastRun: '16 Mar 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Rajesh' },
  { enabled: true,  name: 'QATestingI84ijIFJNE',        type: 'Analytics > Advertiser ...', source: 'Dashboard Report', period: 'Last 14 Days', lastRun: '16 Mar 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Rajesh' },
  { enabled: false, name: 'Copy of dsvhcgsvedited',     type: '—',                          source: 'Dashboard Report', period: 'Last 7 Days',  lastRun: '—', nextRun: '26 Apr 26, 11:00 AM +05:30', emails: 2, createdBy: 'Rajesh' },
  { enabled: false, name: 'TU6wydjss',                  type: 'Analytics > Advertiser ...', source: 'Dashboard Report', period: 'Last 7 Days',  lastRun: '—', nextRun: '23 Apr 26, 11:00 AM +05:30', emails: 2, createdBy: 'Rajesh' },
  { enabled: true,  name: 'dsvhcgsvedited',             type: 'Analytics > Advertiser ...', source: 'Dashboard Report', period: 'Last 7 Days',  lastRun: '02 Mar 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Rajesh' },
  { enabled: true,  name: 'Testing Ad Format Fo...',    type: 'In-Store Digital > In-St...', source: 'Dashboard Report', period: 'Last 14 Days', lastRun: '—', nextRun: '—', emails: 1, createdBy: 'Harsh Jain' },
  { enabled: true,  name: 'Test QA Report',             type: 'Category Level GMV R...',    source: 'System Report',    period: 'Last 30 Days', lastRun: '—', nextRun: '—', emails: 1, createdBy: 'Harsh Jain' },
  { enabled: true,  name: 'Packages All Bookings...',   type: 'Packages > All Bookin...',   source: 'Dashboard Report', period: 'Last 30 Days', lastRun: '18 Feb 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Divyaprakash Singh' },
  { enabled: true,  name: 'Sales Planner',              type: 'Packages > Sales Plan...',   source: 'Dashboard Report', period: 'Last 30 Days', lastRun: '—', nextRun: '—', emails: 1, createdBy: 'Divyaprakash Singh' },
  { enabled: true,  name: 'Packages Sales Planner',     type: 'Packages > Sales Plan...',   source: 'Dashboard Report', period: 'Last 30 Days', lastRun: '—', nextRun: '—', emails: 1, createdBy: 'Divyaprakash Singh' },
  { enabled: true,  name: 'Attributes of Report',       type: 'Packages > Packages ...',    source: 'Dashboard Report', period: 'Last 14 Days', lastRun: '27 Feb 26, 11:00 AM +05:30', nextRun: '—', emails: 1, createdBy: 'Divyaprakash Singh' },
];

const REPORT_TYPES = [
  'Analytics > Advertiser Insights',
  'Analytics > Live Insights',
  'Analytics > Demand & Supply',
  'In-Store Digital > In-Store Performance',
  'Category Level GMV Report',
  'Packages > All Bookings',
  'Packages > Sales Planner',
  'final_b_Keyword Performance',
];

const TIME_PERIODS = ['Last 7 Days', 'Last 14 Days', 'Last 30 Days', 'Last 90 Days', 'Last 6 Months'];

/* ── Icon helpers ─────────────────────────────────────────────── */
function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

/* ── Create Report Drawer ─────────────────────────────────────── */
function CreateReportDrawer({ onClose }) {
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState(REPORT_TYPES[7]);
  const [timePeriod, setTimePeriod] = useState('');
  const [delivery, setDelivery] = useState('Now');
  const [emails, setEmails] = useState('');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />

      {/* Panel */}
      <div style={{
        position: 'relative', width: 620, background: '#fff',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.13)', height: '100%',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)' }}>Create Report</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', padding: 4, borderRadius: 4 }}>
            <Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {/* Left column */}
            <div style={{ flex: 1 }}>
              {/* Report Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  Report Name
                  <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                  <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={12} stroke="var(--osmos-fg-subtle)" />
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    value={reportName}
                    onChange={e => setReportName(e.target.value.slice(0, 50))}
                    placeholder="Enter Report Name"
                    style={{
                      width: '100%', height: 36, padding: '0 40px 0 12px', boxSizing: 'border-box',
                      border: '1px solid var(--osmos-border)', borderRadius: 6,
                      fontSize: 12, color: 'var(--osmos-fg)', outline: 'none',
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--osmos-brand-primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--osmos-border)'}
                  />
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--osmos-fg-subtle)' }}>
                    {reportName.length}/50
                  </span>
                </div>
              </div>

              {/* Report Type */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  Report Type
                  <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={12} stroke="var(--osmos-fg-subtle)" />
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={reportType}
                    onChange={e => setReportType(e.target.value)}
                    style={{
                      width: '100%', height: 36, padding: '0 32px 0 12px', boxSizing: 'border-box',
                      border: '1px solid var(--osmos-border)', borderRadius: 6,
                      fontSize: 12, color: 'var(--osmos-fg)', outline: 'none',
                      fontFamily: "'Open Sans', sans-serif", background: '#fff',
                      appearance: 'none', cursor: 'pointer',
                    }}
                  >
                    {REPORT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <Ico d={<polyline points="6 9 12 15 18 9"/>} size={12} stroke="var(--osmos-fg-muted)" />
                  </div>
                </div>
              </div>

              {/* Report Time Period */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  Report Time Period
                  <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                  <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={12} stroke="var(--osmos-fg-subtle)" />
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={timePeriod}
                    onChange={e => setTimePeriod(e.target.value)}
                    style={{
                      width: '100%', height: 36, padding: '0 32px 0 12px', boxSizing: 'border-box',
                      border: '1px solid var(--osmos-border)', borderRadius: 6,
                      fontSize: 12, color: timePeriod ? 'var(--osmos-fg)' : 'var(--osmos-fg-subtle)',
                      outline: 'none', fontFamily: "'Open Sans', sans-serif",
                      background: '#fff', appearance: 'none', cursor: 'pointer',
                    }}
                  >
                    <option value="">Select Time Period</option>
                    {TIME_PERIODS.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--osmos-brand-primary)' }}>
                    <Ico d={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} size={13} stroke="var(--osmos-brand-primary)" />
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--osmos-fg-subtle)', marginTop: 4 }}>
                  Timezone: Asia/Kolkata (+05:30)
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--osmos-border)', margin: '20px 0' }} />

              {/* Email ids */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  Email ids
                  <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={12} stroke="var(--osmos-fg-subtle)" />
                </label>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  border: '1px solid var(--osmos-border)', borderRadius: 6,
                  padding: '6px 12px', minHeight: 36, background: '#fff',
                }}>
                  <input
                    value={emails}
                    onChange={e => setEmails(e.target.value)}
                    placeholder="Enter Email Addresses"
                    style={{
                      border: 'none', outline: 'none', fontSize: 12,
                      color: 'var(--osmos-fg)', width: '100%',
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  />
                  <Ico d={<polyline points="6 9 12 15 18 9"/>} size={12} stroke="var(--osmos-fg-muted)" />
                </div>
              </div>
            </div>

            {/* Right column — Report Delivery */}
            <div style={{ width: 220, flexShrink: 0 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                Report Delivery
                <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={12} stroke="var(--osmos-fg-subtle)" />
              </label>
              <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                {['Now', 'Daily', 'Weekly', 'Monthly'].map(opt => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
                    <input
                      type="radio" name="delivery" value={opt}
                      checked={delivery === opt}
                      onChange={() => setDelivery(opt)}
                      style={{ accentColor: 'var(--osmos-brand-primary)', cursor: 'pointer' }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', lineHeight: 1.5, margin: 0 }}>
                All scheduled reports will be generated and delivered by 11 AM in the [Asia/Kolkata (+05:30)] timezone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            height: 36, padding: '0 24px', borderRadius: 6,
            border: 'none', background: 'var(--osmos-brand-primary)',
            fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function ScheduledReportsPage() {
  const [tab, setTab] = useState('All Reports');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = REPORTS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif", minHeight: '100%' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden', width: 'fit-content' }}>
        {['All Reports', 'My Reports'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 18px', border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: tab === t ? 600 : 400,
            background: tab === t ? 'var(--osmos-bg-muted)' : '#fff',
            color: tab === t ? 'var(--osmos-fg)' : 'var(--osmos-fg-muted)',
            fontFamily: "'Open Sans', sans-serif",
            borderRight: t === 'All Reports' ? '1px solid var(--osmos-border)' : 'none',
          }}>{t}</button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>352 Reports</span>
          <Ico d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} size={13} stroke="var(--osmos-fg-subtle)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Refresh */}
          <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)' }}>
            <Ico d={<><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>} />
          </button>
          {/* Columns */}
          <button style={{ height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, cursor: 'pointer', color: 'var(--osmos-fg-muted)', fontSize: 11 }}>
            <Ico d={<><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></>} />
            <Ico d={<polyline points="6 9 12 15 18 9"/>} size={11} />
          </button>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 32 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search Report Name"
              style={{ border: 'none', outline: 'none', fontSize: 11, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 160 }}
            />
          </div>
          {/* Create Report */}
          <button onClick={() => setDrawerOpen(true)} style={{
            height: 32, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 5,
            background: 'var(--osmos-brand-primary)', border: 'none', borderRadius: 6,
            cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#fff',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={12} stroke="#fff" sw={2.5} />
            Create Report
          </button>
        </div>
      </div>

      {/* Add Filter */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: 5, marginBottom: 14,
        background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6,
        padding: '5px 10px', cursor: 'pointer', fontSize: 11, color: 'var(--osmos-fg-muted)',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={11} sw={2.5} />
        Add Filter
      </button>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--osmos-bg-muted)', borderBottom: '1px solid var(--osmos-border)' }}>
              {['', 'Report Name', 'Report Type', 'Source Type', 'Time Period', 'Last Run', 'Next Run', 'Emails', 'Created By', ''].map((h, i) => (
                <th key={i} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Status */}
                <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.enabled ? 'var(--alert-success-primary)' : 'var(--alert-error-primary)' }} />
                    <span style={{ fontSize: 9, fontWeight: 500, color: r.enabled ? 'var(--alert-success-primary)' : 'var(--alert-error-primary)' }}>
                      {r.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.type}</td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{r.source}</td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{r.period}</td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap', fontSize: 11 }}>{r.lastRun}</td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap', fontSize: 11 }}>{r.nextRun}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-brand-primary)' }}>{r.emails}</span>
                </td>
                <td style={{ padding: '9px 12px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap' }}>{r.createdBy}</td>
                {/* Actions */}
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2 }}>
                      <Ico d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />
                    </button>
                    {r.enabled && (
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2 }}>
                        <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />
                      </button>
                    )}
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2, fontSize: 16, lineHeight: 1 }}>⋮</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {drawerOpen && <CreateReportDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
