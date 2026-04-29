import React, { useState } from 'react';
import { Icon, PlusIcon, UploadIcon, CloseIcon } from '../../ui/atoms/Icon';

const FONT = "'Open Sans', sans-serif";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ADVERTISERS = [
  { id: 'CA_08001', storeId: 'B002',  name: 'Garnier Fresh',         persona: 'Mass.con', pSpendYtd: '-',  pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08011', storeId: 'B001',  name: 'Tata Madisons',         persona: 'Mass.con', pSpendYtd: 15,   pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 3:19 PM' },
  { id: 'CA_08014', storeId: 'B034',  name: 'Gourmet Grocers',       persona: 'Luxe',     pSpendYtd: '-',  pSpendYoY: '-',  autoPopulate: false, catalogRules: 0, created: '2 May 25, 6:19 PM' },
  { id: 'CA_08003', storeId: 'B001',  name: 'Luma Brand Mall Store', persona: 'Econ',     pSpendYtd: 18,   pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 6:19 PM' },
  { id: 'CA_08005', storeId: 'B001',  name: 'John Artesia Ltd',      persona: 'Luxe',     pSpendYtd: 14,   pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 4:11 PM' },
  { id: 'CA_08007', storeId: 'B001',  name: 'Beauty Essentials',     persona: 'Mass.con', pSpendYtd: '-',  pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08009', storeId: 'B001',  name: 'Garden Supplies Co',    persona: 'Luxe',     pSpendYtd: 12,   pSpendYoY: '-',  autoPopulate: false, catalogRules: 0, created: '2 May 25, 3:11 PM' },
  { id: 'CA_08010', storeId: 'RES_5', name: 'Tia Treasures',         persona: 'Mass.con', pSpendYtd: '-',  pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 3:19 PM' },
  { id: 'CA_08013', storeId: 'M100',  name: 'Natural Foods Inc',     persona: 'Econ',     pSpendYtd: 15,   pSpendYoY: '-',  autoPopulate: true,  catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08Y11', storeId: 'M100',  name: 'Beauty Equipment Store', persona: 'Econ',    pSpendYtd: '-',  pSpendYoY: 17,   autoPopulate: true,  catalogRules: 0, created: '2 May 25, 3:19 PM' },
];

const CHANGE_HISTORY = [
  {
    date: '26th August 2025, 10:10am by Alice Tanaka', status: 'Deactivated',
    changes: [
      { field: 'Advertiser ID', from: 'CA_08001', to: 'CA_08001', category: 'Targeting/Qualify', prodType: 'Super Category Cosmetics | OldsFlap Cosmetics | Umbrella Soap' },
      { field: 'Brand Name', from: 'Micromatic', to: "Johnson's", category: 'In Media Bids', prodType: 'Super Category Media/Bids' },
      { field: 'Transaction body', from: 'old', to: 'Category 3.9 Media Group', category: 'Product Media' },
      { field: 'Brand Model Max', from: '', to: 'Category 3.5 Generic Toiletries', category: 'Lookup Lot/Inventories' },
    ],
  },
  {
    date: '24th August 2025, 10:10am by Alice Tanaka', status: 'Deactivated',
    changes: [
      { field: 'Offer ID filter', from: 'PremiumNQ', to: 'New Brand', category: 'opt_kly-typ and "category_id_updated"', prodType: 'File Folder Mods' },
      { field: 'Brand/Mfr Batch Read', from: 'Category 3.9 Media Group', to: 'Category: This is All Mode', prodType: 'File Filter Mode' },
    ],
  },
  {
    date: '21st August 2025, 10:10am by Alice Tanaka', status: 'Activated',
    changes: [
      { field: 'Advertiser ID', from: 'CA_08001', to: 'CA_08001', category: 'Targeting/Qualify', prodType: 'Super Category: "NewBigQuality Cosmetics | Category_Desc"' },
      { field: 'Brand Name', from: 'Micromatic', to: 'Johnson & White Micro', category: 'In Product Mode', prodType: 'Whole Mode' },
    ],
  },
];

const RULE_FIELD_OPTIONS = [
  { label: 'Brand Name', value: 'brand_name' },
  { label: 'Category', value: 'category' },
  { label: 'Product ID', value: 'product_id' },
  { label: 'Product Name', value: 'product_name' },
  { label: 'Price', value: 'price' },
  { label: 'SKU', value: 'sku' },
];

const RULE_OPERATOR_OPTIONS = [
  { label: '=', value: 'eq' },
  { label: '!=', value: 'neq' },
  { label: '>', value: 'gt' },
  { label: '<', value: 'lt' },
  { label: 'contains', value: 'contains' },
  { label: 'in', value: 'in' },
];

// ─── Persona badge colors ─────────────────────────────────────────────────────

const PERSONA_STYLE = {
  'Luxe':     { bg: 'var(--osmos-brand-green-muted)',   color: 'var(--osmos-brand-green)' },
  'Mass.con': { bg: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)' },
  'Econ':     { bg: 'rgba(245,166,35,0.12)',             color: 'var(--osmos-brand-amber)' },
};

// ─── Shared UI helpers ────────────────────────────────────────────────────────

const INPUT_STYLE = {
  width: '100%', padding: '7px 10px', border: '1px solid var(--osmos-border)',
  borderRadius: 6, fontSize: 13, outline: 'none',
  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', fontFamily: FONT,
  boxSizing: 'border-box',
};

const SELECT_STYLE = {
  padding: '7px 10px', border: '1px solid var(--osmos-border)',
  borderRadius: 6, fontSize: 13, outline: 'none',
  background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', fontFamily: FONT,
  cursor: 'pointer',
};

function FieldLabel({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4, fontFamily: FONT }}>
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, ariaLabel }) {
  return (
    <div
      onClick={onChange}
      aria-label={ariaLabel}
      role="checkbox"
      aria-checked={checked}
      style={{
        width: 16, height: 16, borderRadius: 4, cursor: 'pointer', flexShrink: 0,
        border: checked ? 'none' : '1.5px solid var(--osmos-border)',
        background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 32, height: 18, borderRadius: 9, background: checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: checked ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
    </div>
  );
}

function Overlay({ onClose }) {
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 800 }} />;
}

function ModalPanel({ children, width = 520 }) {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto',
      background: 'var(--osmos-bg)', borderRadius: 10,
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)', zIndex: 801, fontFamily: FONT,
    }}>
      {children}
    </div>
  );
}

function ModalHeader({ title, onClose, extra }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>{title}</span>
        {extra}
      </div>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 4 }}>
        <CloseIcon size={16} color="var(--osmos-fg-muted)" />
      </button>
    </div>
  );
}

function ModalBody({ children }) {
  return <div style={{ padding: '20px' }}>{children}</div>;
}

function ModalFooter({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: '14px 20px', borderTop: '1px solid var(--osmos-border)' }}>
      {children}
    </div>
  );
}

function BtnPrimary({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {children}
    </button>
  );
}

function BtnOutline({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: 'var(--osmos-bg)', color: 'var(--osmos-fg-muted)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
      {children}
    </button>
  );
}

const TH = {
  textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 600,
  color: 'var(--osmos-fg-muted)', background: 'var(--osmos-bg-subtle)',
  borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap', fontFamily: FONT,
};
const TD = {
  padding: '10px 16px', fontSize: 13, color: 'var(--osmos-fg)',
  borderBottom: '1px solid var(--osmos-border)', verticalAlign: 'middle', fontFamily: FONT,
};

// ─── Add Advertiser Modal ─────────────────────────────────────────────────────

function AddAdvertiserModal({ open, onClose }) {
  const [storeId, setStoreId] = useState('');
  const [advName, setAdvName] = useState('');
  const [persona, setPersona] = useState('');

  if (!open) return null;
  function handleAdd() { onClose(); setStoreId(''); setAdvName(''); setPersona(''); }

  return (
    <>
      <Overlay onClose={onClose} />
      <ModalPanel width={440}>
        <ModalHeader title="Add Advertiser" onClose={onClose} />
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><FieldLabel>Store(s) ID *</FieldLabel><input style={INPUT_STYLE} placeholder="e.g. B002" value={storeId} onChange={e => setStoreId(e.target.value)} /></div>
            <div><FieldLabel>Advertiser Name *</FieldLabel><input style={INPUT_STYLE} placeholder="Garnier Fresh" value={advName} onChange={e => setAdvName(e.target.value)} /></div>
            <div><FieldLabel>Persona *</FieldLabel><input style={INPUT_STYLE} placeholder="Luxe" value={persona} onChange={e => setPersona(e.target.value)} /></div>
          </div>
        </ModalBody>
        <ModalFooter>
          <BtnOutline onClick={onClose}>Cancel</BtnOutline>
          <BtnPrimary onClick={handleAdd}>Add</BtnPrimary>
        </ModalFooter>
      </ModalPanel>
    </>
  );
}

// ─── Bulk Upload Modal ────────────────────────────────────────────────────────

function BulkUploadModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [helpTab, setHelpTab] = useState('basic');

  if (!open) return null;
  function handleClose() { setStep(0); onClose(); }

  return (
    <>
      <Overlay onClose={handleClose} />
      <ModalPanel width={600}>
        <ModalHeader
          title="Bulk Upload"
          onClose={handleClose}
          extra={step === 1 ? (
            <span style={{ background: 'var(--osmos-brand-green-muted)', color: 'var(--osmos-brand-green)', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
              Advertiser Added Successfully
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12 }}>
              <Icon size={13} color="var(--osmos-brand-primary)"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>
              <span style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', fontFamily: FONT }}>Sample_Template.xlsx</span>
              <span style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', fontFamily: FONT }}>Download</span>
            </div>
          )}
        />
        <ModalBody>
          {step === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
                Bulk upload/edit advertiser data and link the corresponding root link creation rules / Root logics.
              </p>
              {/* Drop zone */}
              <div
                onClick={() => setStep(1)}
                style={{ border: '2px dashed var(--osmos-border)', borderRadius: 8, padding: '40px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--osmos-bg-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
              >
                <Icon size={32} color="var(--osmos-fg-subtle)" strokeWidth={1.2}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </Icon>
                <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>upload your .csv files here</span>
              </div>
              {/* Help tabs */}
              <div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--osmos-border)', gap: 0 }}>
                  {['basic', 'root'].map(t => (
                    <button key={t} onClick={() => setHelpTab(t)} style={{ padding: '8px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: helpTab === t ? 600 : 400, color: helpTab === t ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)', borderBottom: helpTab === t ? '2px solid var(--osmos-brand-primary)' : '2px solid transparent', marginBottom: -1, fontFamily: FONT }}>
                      {t === 'basic' ? 'Basic Format: Links with a directory' : 'Root Logic & Rule Creation'}
                    </button>
                  ))}
                </div>
                <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {helpTab === 'basic' ? (
                    <>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Sheet 1 : Advertisers</span>
                      <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: '10px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT, lineHeight: 1.8 }}>
                        advertiser_id<br/>store_id<br/>advertiser_name<br/>persona<br/>billing_advertiser_id (optional)<br/>billing_invoice_name (optional)
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Sheet 2 : Rules</span>
                      <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: '10px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT, lineHeight: 1.8 }}>
                        advertiser_id<br/>rule_name<br/>field_name<br/>operator<br/>value
                      </div>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Root Logic Configuration</span>
                      <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: '10px 12px' }}>
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
                          Configure root-level rules and conditional branching. Use the template to set up multi-condition rules with AND/OR logic.
                        </p>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
                        <strong>Note:</strong> For root-level architectures, use dedicated column markers in the spreadsheet. A root link is for a set of Rules. To use <strong>&gt;= 2</strong> conditions in the root rule bundle multiple fields.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '24px 0' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--osmos-brand-green-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={56} color="var(--osmos-brand-green)" strokeWidth={1.5}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </Icon>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Uploaded Successfully</span>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--osmos-fg-muted)', textAlign: 'center', fontFamily: FONT }}>
                File has been processed and uploaded successfully. You can<br/>create the associated accounts in the table.
              </p>
              <BtnPrimary onClick={handleClose}>Done</BtnPrimary>
            </div>
          )}
        </ModalBody>
      </ModalPanel>
    </>
  );
}

// ─── Rule Modal (Add / Edit) ──────────────────────────────────────────────────

function RuleModal({ open, onClose, editMode = false, initialConditions = null }) {
  const emptyCondition = { field: '', operator: '', value: '' };
  const [conditions, setConditions] = useState(initialConditions || [{ ...emptyCondition }]);
  const [applyCondition, setApplyCondition] = useState(true);

  if (!open) return null;

  function addCondition() { setConditions([...conditions, { ...emptyCondition }]); }
  function removeCondition(idx) { setConditions(conditions.filter((_, i) => i !== idx)); }
  function updateCondition(idx, field, val) {
    const updated = [...conditions];
    updated[idx] = { ...updated[idx], [field]: val };
    setConditions(updated);
  }
  function handleSave() { onClose(); if (!editMode) setConditions([{ ...emptyCondition }]); }
  function handleClose() { onClose(); if (!editMode) setConditions([{ ...emptyCondition }]); }

  return (
    <>
      <Overlay onClose={handleClose} />
      <ModalPanel width={580}>
        <ModalHeader
          title={editMode ? 'Edit Rule' : 'Add Rule'}
          onClose={handleClose}
          extra={
            <span style={{ background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600, marginLeft: 8 }}>
              Advertiser's Onboard Code
            </span>
          }
        />
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Info alert */}
            <div style={{ background: 'var(--osmos-brand-primary-muted)', border: '1px solid var(--osmos-brand-primary)', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: FONT }}>
              A rule is associated mapping of product through a set of conditions to an advertising tier. If a line with CIID is required for at-least one primary key within the CID slot in addition to criteria. This is useful for organizing &gt; 10 rule sets at the same tier level.{' '}
              <span style={{ color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontWeight: 500 }}>Learn more</span>
            </div>
            {/* Apply condition toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', fontFamily: FONT }}>Apply Condition *</span>
              <Toggle checked={applyCondition} onChange={() => setApplyCondition(v => !v)} />
              {applyCondition && (
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontWeight: 500, fontFamily: FONT }}>
                  Advanced Suggestion
                </span>
              )}
            </div>
            {applyCondition && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {conditions.map((cond, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    {idx > 0 && (
                      <span style={{ background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)', whiteSpace: 'nowrap', alignSelf: 'center', fontFamily: FONT }}>
                        AND
                      </span>
                    )}
                    <div style={{ flex: 1 }}>
                      {idx === 0 && <FieldLabel>Field Name</FieldLabel>}
                      <select style={SELECT_STYLE} value={cond.field} onChange={e => updateCondition(idx, 'field', e.target.value)}>
                        <option value="">Brand Name</option>
                        {RULE_FIELD_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: '0 0 80px' }}>
                      {idx === 0 && <FieldLabel>&nbsp;</FieldLabel>}
                      <select style={SELECT_STYLE} value={cond.operator} onChange={e => updateCondition(idx, 'operator', e.target.value)}>
                        <option value="">=</option>
                        {RULE_OPERATOR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      {idx === 0 && <FieldLabel>Value</FieldLabel>}
                      <input style={INPUT_STYLE} placeholder="Nike" value={cond.value} onChange={e => updateCondition(idx, 'value', e.target.value)} />
                    </div>
                    {conditions.length > 1 && (
                      <button onClick={() => removeCondition(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 4px', marginBottom: 6 }}>
                        <CloseIcon size={15} color="#dc2626" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addCondition} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--osmos-brand-primary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0, fontFamily: FONT, alignSelf: 'flex-start' }}>
                  <PlusIcon size={13} color="var(--osmos-brand-primary)" /> Add
                </button>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <BtnOutline onClick={handleClose}>Cancel</BtnOutline>
          <BtnPrimary onClick={handleSave}>{editMode ? 'Update' : 'Create'}</BtnPrimary>
        </ModalFooter>
      </ModalPanel>
    </>
  );
}

// ─── Change History Modal ─────────────────────────────────────────────────────

function ChangeHistoryModal({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <Overlay onClose={onClose} />
      <ModalPanel width={600}>
        <ModalHeader title="Change History" onClose={onClose} />
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHANGE_HISTORY.map((entry, ei) => (
              <div key={ei} style={{ display: 'flex', gap: 14 }}>
                {/* Timeline indicator */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: entry.status === 'Activated' ? 'var(--osmos-brand-green)' : '#dc2626', flexShrink: 0 }} />
                  {ei < CHANGE_HISTORY.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--osmos-border)', minHeight: 20 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>{entry.date}</span>
                    <span style={{
                      background: entry.status === 'Activated' ? 'var(--osmos-brand-green-muted)' : 'rgba(220,38,38,0.1)',
                      color: entry.status === 'Activated' ? 'var(--osmos-brand-green)' : '#dc2626',
                      borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600, fontFamily: FONT,
                    }}>
                      {entry.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {entry.changes.map((change, ci) => (
                      <div key={ci} style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', paddingLeft: 10, borderLeft: '2px solid var(--osmos-border)', fontFamily: FONT }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
                          <span style={{ background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', borderRadius: 4, padding: '1px 6px', fontSize: 11, fontWeight: 500 }}>{change.field}</span>
                          <span>from</span>
                          <strong style={{ color: 'var(--osmos-fg)' }}>{change.from || '(empty)'}</strong>
                          <span>to</span>
                          <strong style={{ color: 'var(--osmos-fg)' }}>{change.to}</strong>
                          {change.category && (
                            <>
                              <span>·</span>
                              <span>Category:</span>
                              <span style={{ border: '1px solid var(--osmos-border)', borderRadius: 4, padding: '1px 6px', fontSize: 11 }}>{change.category}</span>
                            </>
                          )}
                        </div>
                        {change.prodType && (
                          <div style={{ marginTop: 4, fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
                            Product Type: {change.prodType}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {ei < CHANGE_HISTORY.length - 1 && (
                    <span style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontWeight: 500, fontFamily: FONT }}>See More</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <BtnOutline onClick={onClose}>Close</BtnOutline>
        </ModalFooter>
      </ModalPanel>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdvertisersPage() {
  const [showAddAdvertiser, setShowAddAdvertiser] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAddRule, setShowAddRule] = useState(false);
  const [showEditRule, setShowEditRule] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('advertisers');
  const [hovRow, setHovRow] = useState(null);

  const allSelected = selected.length === ADVERTISERS.length;
  function toggleAll() { setSelected(allSelected ? [] : ADVERTISERS.map(a => a.id)); }
  function toggleOne(id) { setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }

  const filtered = ADVERTISERS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, background: 'var(--osmos-bg-subtle)', fontFamily: FONT }}>

      {/* Page-level header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: 'var(--osmos-bg)', borderBottom: '1px solid var(--osmos-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'var(--osmos-bg-subtle)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon size={16} color="var(--osmos-fg-muted)"><polyline points="15 18 9 12 15 6"/></Icon>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Online Ad Management › Space World</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Advertisers</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Icon size={14} color="var(--osmos-fg-muted)"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></Icon>
          </button>
          <button style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Icon size={14} color="var(--osmos-fg-muted)"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
          </button>
          <span style={{ background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', border: '1px solid var(--osmos-brand-primary)', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, fontFamily: FONT }}>
            Advertiser's Onboard Code
          </span>
        </div>
      </div>

      <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

        {/* Info banner */}
        <div style={{ background: 'var(--osmos-brand-primary-muted)', border: '1px solid var(--osmos-brand-primary)', borderRadius: 6, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: 'var(--osmos-fg)', fontFamily: FONT }}>
          Edit Advertiser info and configure tracking codes. You can set the directly from the tab above, or edit the settings from the bulk action button below.
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--osmos-border)', marginBottom: 16 }}>
          {[{ key: 'advertisers', label: 'Advertisers' }, { key: 'onboard-code', label: "Advertiser's Onboard Code" }].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeTab === t.key ? 600 : 400, color: activeTab === t.key ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)', borderBottom: activeTab === t.key ? '2px solid var(--osmos-brand-primary)' : '2px solid transparent', marginBottom: -1, fontFamily: FONT }}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'advertisers' ? (
          <>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--osmos-bg)', padding: 14, borderRadius: 8, border: '1px solid var(--osmos-border)', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <select style={SELECT_STYLE}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>All</option>
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 34, background: 'var(--osmos-bg)' }}>
                  <Icon size={13} color="var(--osmos-fg-muted)"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search advertisers..." style={{ border: 'none', outline: 'none', fontSize: 13, color: 'var(--osmos-fg)', fontFamily: FONT, width: 200, background: 'transparent' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BtnOutline onClick={() => setShowBulkUpload(true)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <Icon size={13} color="var(--osmos-fg-muted)"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>
                    Bulk Upload
                  </span>
                </BtnOutline>
                <BtnPrimary onClick={() => setShowAddAdvertiser(true)}>
                  <PlusIcon size={12} color="#fff" /> Create Advertiser
                </BtnPrimary>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginBottom: 12, paddingLeft: 2, fontFamily: FONT }}>
              Showing {filtered.length} of {ADVERTISERS.length} advertisers
            </div>

            {/* Table */}
            <div style={{ background: 'var(--osmos-bg)', borderRadius: 8, border: '1px solid var(--osmos-border)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                  <thead>
                    <tr>
                      <th style={{ ...TH, width: 40, textAlign: 'center' }}>
                        <Checkbox checked={allSelected} onChange={toggleAll} ariaLabel="Select all" />
                      </th>
                      <th style={TH}>Advertiser ID</th>
                      <th style={TH}>Store/Unit ID</th>
                      <th style={TH}>Advertiser Name</th>
                      <th style={TH}>Persona</th>
                      <th style={{ ...TH, textAlign: 'center' }}>Product Spend for Year</th>
                      <th style={{ ...TH, textAlign: 'center' }}>Product Spend for Role</th>
                      <th style={{ ...TH, textAlign: 'center' }}>Catalog Rules</th>
                      <th style={{ ...TH, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((adv) => (
                      <tr
                        key={adv.id}
                        onMouseEnter={() => setHovRow(adv.id)}
                        onMouseLeave={() => setHovRow(null)}
                        style={{ background: hovRow === adv.id ? 'var(--osmos-bg-subtle)' : 'transparent', transition: 'background 0.12s' }}
                      >
                        <td style={{ ...TD, textAlign: 'center' }}>
                          <Checkbox checked={selected.includes(adv.id)} onChange={() => toggleOne(adv.id)} ariaLabel={`Select ${adv.name}`} />
                        </td>
                        <td style={TD}><span style={{ fontSize: 12, fontWeight: 500 }}>{adv.id}</span></td>
                        <td style={TD}><span style={{ fontSize: 12 }}>{adv.storeId}</span></td>
                        <td style={TD}><span style={{ fontSize: 12, fontWeight: 500 }}>{adv.name}</span></td>
                        <td style={TD}>
                          <span style={{ ...(PERSONA_STYLE[adv.persona] || {}), borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
                            {adv.persona}
                          </span>
                        </td>
                        <td style={{ ...TD, textAlign: 'center', color: adv.pSpendYtd === '-' ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)' }}>
                          <span style={{ fontSize: 12 }}>{adv.pSpendYtd}</span>
                        </td>
                        <td style={{ ...TD, textAlign: 'center', color: adv.pSpendYoY === '-' ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)' }}>
                          <span style={{ fontSize: 12 }}>{adv.pSpendYoY}</span>
                        </td>
                        <td style={{ ...TD, textAlign: 'center' }}>
                          <span
                            onClick={() => setShowAddRule(true)}
                            style={{ background: adv.catalogRules > 0 ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)', color: adv.catalogRules > 0 ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                          >
                            {adv.catalogRules > 0 ? adv.catalogRules : 'Add'}
                          </span>
                        </td>
                        <td style={{ ...TD, textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                            <span onClick={() => setShowEditRule(true)} style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontWeight: 500 }}>Edit</span>
                            <span onClick={() => setShowHistory(true)} style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', cursor: 'pointer', fontWeight: 500 }}>History</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--osmos-border)', background: 'var(--osmos-bg-subtle)', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
                <span>Showing {filtered.length} of {ADVERTISERS.length} advertisers</span>
                <span>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: 'var(--osmos-bg)', padding: 24, borderRadius: 8, border: '1px solid var(--osmos-border)' }}>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
              Onboard code configuration will appear here. Use this tab to manage tracking pixels and integration scripts for each advertiser.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddAdvertiserModal open={showAddAdvertiser} onClose={() => setShowAddAdvertiser(false)} />
      <BulkUploadModal open={showBulkUpload} onClose={() => setShowBulkUpload(false)} />
      <RuleModal open={showAddRule} onClose={() => setShowAddRule(false)} editMode={false} />
      <RuleModal open={showEditRule} onClose={() => setShowEditRule(false)} editMode={true}
        initialConditions={[
          { field: 'brand_name', operator: 'eq', value: 'Nike' },
          { field: 'category', operator: 'contains', value: 'Footwear' },
          { field: 'price', operator: 'gt', value: '1000' },
        ]}
      />
      <ChangeHistoryModal open={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}
