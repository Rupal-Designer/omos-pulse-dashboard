import React, { useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Input, Select } from '../../ui/atoms/Input';
import { Drawer } from '../../ui/molecules/Drawer';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

const TRIGGER_TYPES = [
  { value: 'On Wallet Top-up',         label: 'On Wallet Top-up',         desc: 'Trigger when advertiser tops-up their wallet' },
  { value: 'On New Advertiser onboard', label: 'On New Advertiser onboard', desc: '' },
];

const LOOKBACK_OPTIONS = [
  { value: 'None',         label: 'None' },
  { value: 'Last 15 days', label: 'Last 15 days' },
  { value: 'Last 30 days', label: 'Last 30 days' },
  { value: 'Last 45 days', label: 'Last 45 days' },
  { value: 'Custom',       label: 'Custom' },
];

const SCHEDULE_OPTIONS = [
  { value: 'Once',   label: 'Once' },
  { value: 'Daily',  label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
];

const ACTIONS_OPTIONS = [
  { value: '',                                                                label: 'Select Action' },
  { value: 'Add promotional balance as a percentage of the top-up amt',      label: 'Add promotional balance as a percentage of the top-up amt' },
  { value: 'Add fixed incentive amount',                                      label: 'Add fixed incentive amount' },
  { value: 'New Advertiser Incentive Addition',                               label: 'New Advertiser Incentive Addition' },
];

const NOTIFY_OPTIONS = [
  { value: 'None',  label: 'None' },
  { value: 'Email', label: 'Email' },
  { value: 'SMS',   label: 'SMS' },
];

const INITIAL_RULES = [
  { id:  1, enabled: true,  rule: 'new Merchant incenti...',   desc: 'give $100 when merc...',       type: 'Trigger',  actions: 'New Advertiser Incentive Addition',                    lastExec: '20 Dec 22, 07:34 PM +05:30', createdBy: 'Vishal Khandate',    createdOn: '21 Dec 22, 06:12 PM +05:30', lastEditedBy: 'Vishal Khandate'    },
  { id:  2, enabled: true,  rule: 'Merchant Management...',    desc: 'get 500 joining topup',        type: 'Trigger',  actions: 'New Advertiser Incentive Addition',                    lastExec: '-',                          createdBy: 'Deep Patel',         createdOn: '22 Dec 22, 12:20 PM +05:30', lastEditedBy: 'Shantanu Harkut'    },
  { id:  3, enabled: true,  rule: 'Add Signup amount..',       desc: 'add $999 to the walle',        type: 'Trigger',  actions: 'New Advertiser Incentive Addition',                    lastExec: '-',                          createdBy: 'Shantanu Harkut',    createdOn: '02 Mar 23, 11:59 AM +05:30', lastEditedBy: 'Yuvaraj'            },
  { id:  4, enabled: true,  rule: 'Get 10% incentive on...',   desc: 'Get 10% incentive on...',      type: 'Trigger',  actions: 'Add fixed incentive amount',                           lastExec: '18 Jun 24, 06:26 PM +05:30', createdBy: '-',                  createdOn: '24 Jul 24, 10:03 AM +05:30', lastEditedBy: 'Deepankal personal' },
  { id:  5, enabled: true,  rule: 'Get incentive to all M...', desc: 'Get incentive to all Me',      type: 'Trigger',  actions: 'Add fixed incentive',                                  lastExec: '17 Jan 23, 03:45 PM +05:30', createdBy: 'Rahul Tah',          createdOn: '08 Jan 25, 09:59 AM +05:30', lastEditedBy: 'Akshay'             },
  { id:  6, enabled: true,  rule: 'Add fixed incentive o...',  desc: 'Add fixed incentive o...',     type: 'Trigger',  actions: 'Add fixed incentive amount',                           lastExec: '17 Jan 23, 03:45 PM +05:30', createdBy: 'Praveen Choudhary',  createdOn: '24 Feb 25, 01:08 PM +05:30', lastEditedBy: 'Vijay Bang'          },
  { id:  7, enabled: true,  rule: 'Add Wallet Balance',        desc: 'Add Wallet Balance',           type: 'Everyone', actions: 'New Advertiser Incentive Addition',                    lastExec: '03 Apr 24, 06:08 PM +05:30', createdBy: 'Deep Patel',         createdOn: '23 Apr 25, 03:31 PM +05:30', lastEditedBy: 'Vivek'              },
  { id:  8, enabled: true,  rule: 'onboarding incentives',     desc: 'get 500 joining topup',        type: 'Trigger',  actions: 'New Advertiser Incentive Addition',                    lastExec: '-',                          createdBy: 'Divyesh',            createdOn: '15 Dec 22, 03:12 PM +05:30', lastEditedBy: 'Vishal Khandate'    },
  { id:  9, enabled: true,  rule: 'Modify Wallet Balance',     desc: 'Description',                  type: 'Trigger',  actions: 'Add fixed incentive',                                  lastExec: '27 Jun 23, 07:21 PM +05:30', createdBy: 'Pavan Gunta',        createdOn: '29 Dec 22, 05:51 PM +05:30', lastEditedBy: 'Vivek'              },
  { id: 10, enabled: false, rule: 'Deomo Incenticwe',          desc: 'Incentive for the the...',     type: 'Trigger',  actions: 'Add incentive as percentage of t...',                  lastExec: '-',                          createdBy: 'Deepankal personal', createdOn: '06 Jan 23, 03:10 PM +05:30', lastEditedBy: 'Vivek'              },
  { id: 11, enabled: true,  rule: 'QaTestingYIkE6',            desc: 'Sample Data about..',          type: 'Schedule', actions: 'Add fixed incentive',                                  lastExec: '07 Jan 25, 02:20 AM +05:30', createdBy: 'Rajesh',             createdOn: '27 Jun 23, 06:46 PM +05:30', lastEditedBy: 'Rahul Waghmare'     },
  { id: 12, enabled: false, rule: 'Ak rule',                   desc: 'Ak rule',                      type: 'Schedule', actions: 'Add fixed incentive',                                  lastExec: '-',                          createdBy: 'Akshay',             createdOn: '20 Jan 23, 02:12 PM +05:30', lastEditedBy: 'Akshay'             },
  { id: 13, enabled: true,  rule: 'Add Incentives',            desc: 'Promotional budgets',          type: 'Schedule', actions: 'Add fixed incentive',                                  lastExec: '-',                          createdBy: 'Vijay Bang',         createdOn: '22 Dec 22, 01:37 PM +05:30', lastEditedBy: 'Vijay Bang'          },
  { id: 14, enabled: true,  rule: 'RDF',                       desc: 'asdasdasdasd',                 type: 'Schedule', actions: 'Add fixed incentive',                                  lastExec: '-',                          createdBy: 'Rahul Waghmare',     createdOn: '06 Jan 25, 05:41 PM +05:30', lastEditedBy: 'Vivek'              },
];

const EMPTY_FORM = {
  name: '', description: '', ruleType: 'Trigger',
  triggerType: 'On Wallet Top-up', lookback: 'None',
  action: '', scheduleFreq: 'Once', scheduleDate: '', scheduleTime: '',
  notifyMe: 'None', internalOnly: false,
};

// TYPE BADGE
const TYPE_COLORS = {
  Trigger:  { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  Schedule: { bg: 'rgba(245,158,11,0.12)',             color: '#d97706' },
  Everyone: { bg: 'rgba(27,168,122,0.10)',             color: 'var(--osmos-brand-green)' },
};

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || TYPE_COLORS.Trigger;
  return (
    <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                   background: c.bg, color: c.color, whiteSpace: 'nowrap', fontFamily: FONT }}>
      {type}
    </span>
  );
}

// TOGGLE SWITCH
function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 32, height: 18, borderRadius: 9, cursor: 'pointer', flexShrink: 0,
      background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)',
      position: 'relative', transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', top: 2, left: checked ? 16 : 2,
        width: 14, height: 14, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );
}

export default function AutomatedRulesPage() {
  const [data, setData]         = useState(INITIAL_RULES);
  const [search, setSearch]     = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRow, setEditRow]   = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const { toast, showToast }    = useToast();

  function openCreate() {
    setEditRow(null);
    setForm(EMPTY_FORM);
    setShowDrawer(true);
  }

  function openEdit(row) {
    setEditRow(row);
    setForm({
      name: row.rule, description: row.desc, ruleType: row.type === 'Schedule' ? 'Schedule' : 'Trigger',
      triggerType: 'On Wallet Top-up', lookback: 'None',
      action: row.actions, scheduleFreq: 'Once', scheduleDate: '', scheduleTime: '',
      notifyMe: 'None', internalOnly: false,
    });
    setShowDrawer(true);
  }

  function handleToggleEnable(id) {
    setData(d => d.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  }

  function handleDelete(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('Rule deleted');
  }

  function handleSave() {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    if (editRow) {
      setData(d => d.map(r => r.id === editRow.id ? { ...r, rule: form.name, desc: form.description, type: form.ruleType, actions: form.action } : r));
      showToast('Rule updated successfully');
    } else {
      setData(d => [...d, {
        id: Date.now(), enabled: true, rule: form.name, desc: form.description,
        type: form.ruleType, actions: form.action || '-',
        lastExec: '-', createdBy: '-', createdOn: '28 Apr 25', lastEditedBy: '-',
      }]);
      showToast('Rule created successfully');
    }
    setShowDrawer(false);
  }

  const filtered = data.filter(r =>
    r.rule.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const drawerFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button variant="outline" onClick={() => showToast('Preview not available in demo')}>Preview</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </div>
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: FONT }}>
      <Toast {...toast} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderBottom: '1px solid var(--osmos-border)', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Segment</span>
            <span style={{ background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)',
                           borderRadius: 10, fontSize: 11, fontWeight: 700, padding: '2px 8px' }}>
              {data.length}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)',
                          border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 32 }}>
              <SearchIcon size={13} color="var(--osmos-fg-subtle)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
                style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)',
                         fontFamily: FONT, width: 160, background: 'transparent' }} />
            </div>
            <Button variant="primary" onClick={openCreate}>
              <PlusIcon size={12} color="#fff" />
              Add Rule
            </Button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: FONT }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Segment Name', 'Rule', 'Description', 'Rule Type', 'Actions', 'Last executed on', 'Created by', 'Created on', 'Last Edited by', ''].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700,
                                       color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap',
                                       borderRight: h === '' ? 'none' : '1px solid var(--osmos-border)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', padding: 40,
                      color: 'var(--osmos-fg-muted)', fontSize: 13 }}>No rules found.</td></tr>
              ) : filtered.map(row => (
                <tr key={row.id}
                  style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Segment Name — toggle */}
                  <td style={{ padding: '10px 14px', borderRight: '1px solid var(--osmos-border)' }}>
                    <Toggle checked={row.enabled} onChange={() => handleToggleEnable(row.id)} />
                  </td>
                  {/* Rule */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500, maxWidth: 160,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.rule}
                  </td>
                  {/* Description */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', maxWidth: 160,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.desc}
                  </td>
                  {/* Rule Type */}
                  <td style={{ padding: '10px 14px', borderRight: '1px solid var(--osmos-border)' }}>
                    <TypeBadge type={row.type} />
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', maxWidth: 180,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.actions}
                  </td>
                  {/* Last executed on */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-subtle)', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.lastExec}
                  </td>
                  {/* Created by */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.createdBy}
                  </td>
                  {/* Created on */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-subtle)', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.createdOn}
                  </td>
                  {/* Last Edited by */}
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap',
                                borderRight: '1px solid var(--osmos-border)' }}>
                    {row.lastEditedBy}
                  </td>
                  {/* Edit / Delete */}
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button onClick={() => openEdit(row)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                                 display: 'flex', color: 'var(--osmos-fg-muted)' }}>
                        <EditIcon size={13} color="var(--osmos-fg-muted)" />
                      </button>
                      <button onClick={() => handleDelete(row.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                        <TrashIcon size={13} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Drawer */}
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title={editRow ? 'Wallet > Edit Rule' : 'Wallet > Create Rule'}
        width={540}
        footer={drawerFooter}
      >
        {/* Help link */}
        <div style={{ marginBottom: 20 }}>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontSize: 12, color: 'var(--osmos-brand-primary)', fontFamily: FONT, textDecoration: 'underline' }}>
            How to create and modify a campaign ?
          </button>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                          display: 'flex', gap: 3, marginBottom: 6, fontFamily: FONT }}>
            Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--osmos-border)',
                        borderRadius: 6, overflow: 'hidden', background: 'var(--osmos-bg)' }}>
            <span style={{ padding: '0 10px', fontSize: 13, color: 'var(--osmos-fg-muted)',
                           borderRight: '1px solid var(--osmos-border)', lineHeight: '34px',
                           background: 'var(--osmos-bg-subtle)', fontFamily: FONT }}>$</span>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Enter Name"
              maxLength={50}
              style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 10px',
                       fontSize: 13, color: 'var(--osmos-fg)', fontFamily: FONT, background: 'transparent' }}
            />
            <span style={{ padding: '0 10px', fontSize: 11, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
              {form.name.length}/50
            </span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                          display: 'flex', gap: 3, marginBottom: 6, fontFamily: FONT }}>
            Description <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Enter Name"
            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)',
                     borderRadius: 6, fontSize: 13, fontFamily: FONT, color: 'var(--osmos-fg)',
                     outline: 'none', boxSizing: 'border-box', height: 72, resize: 'vertical',
                     background: 'var(--osmos-bg)' }}
          />
        </div>

        {/* Rule Type */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                          marginBottom: 8, display: 'block', fontFamily: FONT }}>Rule Type</label>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Trigger', 'Schedule'].map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
                                      cursor: 'pointer', color: 'var(--osmos-fg)', fontFamily: FONT }}>
                <input type="radio" name="ruleType" value={t}
                  checked={form.ruleType === t}
                  onChange={() => setForm(f => ({ ...f, ruleType: t }))}
                  style={{ accentColor: 'var(--osmos-brand-primary)', cursor: 'pointer' }} />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Trigger Type (only when Trigger) */}
        {form.ruleType === 'Trigger' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TRIGGER_TYPES.map(tt => (
                <label key={tt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 8,
                  padding: 12, border: `1px solid ${form.triggerType === tt.value ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                  borderRadius: 6, cursor: 'pointer',
                  background: form.triggerType === tt.value ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg)' }}>
                  <input type="radio" name="triggerType" value={tt.value}
                    checked={form.triggerType === tt.value}
                    onChange={() => setForm(f => ({ ...f, triggerType: tt.value }))}
                    style={{ accentColor: 'var(--osmos-brand-primary)', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>{tt.label}</div>
                    {tt.desc && (
                      <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 2, fontFamily: FONT }}>{tt.desc}</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Look back period */}
        <div style={{ marginBottom: 16 }}>
          <Select
            label="Look back period"
            value={form.lookback}
            onChange={e => setForm(f => ({ ...f, lookback: e.target.value }))}
            options={LOOKBACK_OPTIONS}
          />
        </div>

        {/* Conditions */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
              Conditions
            </span>
            <Button variant="outline" onClick={() => showToast('Conditions builder — coming soon')}>
              Add conditions
            </Button>
          </div>
          <div style={{ padding: 12, background: 'var(--osmos-bg-subtle)', borderRadius: 6,
                        fontSize: 12, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
            No conditions added yet.
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                            display: 'flex', gap: 3, fontFamily: FONT }}>
              Actions <span style={{ color: '#ef4444' }}>*</span>
            </label>
          </div>
          <select
            value={form.action}
            onChange={e => setForm(f => ({ ...f, action: e.target.value }))}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)', borderRadius: 6,
                     fontSize: 13, fontFamily: FONT, color: form.action ? 'var(--osmos-fg)' : 'var(--osmos-fg-subtle)',
                     background: 'var(--osmos-bg)', outline: 'none', cursor: 'pointer' }}
          >
            {ACTIONS_OPTIONS.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
          {form.action === 'Add promotional balance as a percentage of the top-up amt' && (
            <div style={{ marginTop: 8, padding: 10, background: 'var(--osmos-bg-subtle)', borderRadius: 6,
                          fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
              This action will add promotional balance based on the top-up done by the merchant
            </div>
          )}
        </div>

        {/* Schedule fields (only when Schedule) */}
        {form.ruleType === 'Schedule' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Select
                label="Schedule"
                value={form.scheduleFreq}
                onChange={e => setForm(f => ({ ...f, scheduleFreq: e.target.value }))}
                options={SCHEDULE_OPTIONS}
              />
            </div>
            <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                                marginBottom: 6, display: 'block', fontFamily: FONT }}>Select Date</label>
                <input type="date" value={form.scheduleDate}
                  onChange={e => setForm(f => ({ ...f, scheduleDate: e.target.value }))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)',
                           borderRadius: 6, fontSize: 13, fontFamily: FONT, color: 'var(--osmos-fg)',
                           background: 'var(--osmos-bg)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)',
                                marginBottom: 6, display: 'block', fontFamily: FONT }}>Select Time</label>
                <input type="time" value={form.scheduleTime}
                  onChange={e => setForm(f => ({ ...f, scheduleTime: e.target.value }))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)',
                           borderRadius: 6, fontSize: 13, fontFamily: FONT, color: 'var(--osmos-fg)',
                           background: 'var(--osmos-bg)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </>
        )}

        {/* Notify me */}
        <div style={{ marginBottom: 16 }}>
          <Select
            label="Notify me"
            value={form.notifyMe}
            onChange={e => setForm(f => ({ ...f, notifyMe: e.target.value }))}
            options={NOTIFY_OPTIONS}
          />
        </div>

        {/* For internal use only */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', background: 'var(--osmos-bg-subtle)', borderRadius: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--osmos-fg)', fontFamily: FONT }}>
            For internal use only
          </span>
          <Toggle
            checked={form.internalOnly}
            onChange={() => setForm(f => ({ ...f, internalOnly: !f.internalOnly }))}
          />
        </div>
      </Drawer>
    </div>
  );
}
