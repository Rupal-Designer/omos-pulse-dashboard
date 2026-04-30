import React, { useState } from 'react';
import {
  Toolbar, SearchBar, Button, TypeBadge, Drawer,
  Input, Select, PlusIcon, DownloadIcon, RefreshIcon,
  ColumnsIcon, InfoBanner, UploadDropzone,
  Toast, useToast,
} from '../../ui';

/* ── Design tokens ──────────────────────────────────────────────── */
const FONT     = "'Open Sans', sans-serif";
const WHITE    = 'var(--osmos-bg)';
const BORDER   = 'var(--osmos-border)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';

/* ── Persona colors ─────────────────────────────────────────────── */
const PERSONA_COLORS = {
  Platinum: { bg: 'rgba(148,163,184,0.15)', color: '#64748b' },
  Gold:     { bg: 'rgba(245,158,11,0.12)',  color: '#d97706' },
  Silver:   { bg: 'rgba(100,116,139,0.12)', color: '#475569' },
  Beta:     { bg: 'rgba(139,92,246,0.12)',  color: '#7c3aed' },
};

/* ── Condition field options ────────────────────────────────────── */
const CONDITION_FIELDS = [
  { value: 'brands',                       label: 'Brand'                        },
  { value: 'sellers',                      label: 'Seller'                       },
  { value: 'manufacturers',                label: 'Manufacturer'                 },
  { value: 'catalog_source_merchant_ids',  label: 'Catalog Source Merchant IDs'  },
  { value: 'category_l1',                  label: 'Category L1'                  },
  { value: 'category_l2',                  label: 'Category L2'                  },
  { value: 'category_l3',                  label: 'Category L3'                  },
  { value: 'custom_label_0',               label: 'Custom Label 0'               },
  { value: 'custom_label_1',               label: 'Custom Label 1'               },
  { value: 'custom_label_2',               label: 'Custom Label 2'               },
  { value: 'custom_label_3',               label: 'Custom Label 3'               },
  { value: 'custom_label_4',               label: 'Custom Label 4'               },
];

/* ── Sample advertiser data (verbatim from Figma) ───────────────── */
const INIT_ADVERTISERS = [
  { id: 'OS_M002', merchantId: 'M002', name: 'Sports World',            persona: 'Platinum', syncedFeed: 11,  syncedRule: null, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'jane.smith@example.com'      },
  { id: 'OS_M003', merchantId: 'M003', name: 'Tech Retailers',          persona: 'Platinum', syncedFeed: 23,  syncedRule: 23,   onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'mike.johnson@example.com'    },
  { id: 'OS_M004', merchantId: 'M004', name: 'Gourmet Grocery',         persona: 'Gold',     syncedFeed: 12,  syncedRule: 22,   onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'linda.brown@example.com'    },
  { id: 'OS_M005', merchantId: 'M006', name: 'Home Essentials Mart',    persona: 'Silver',   syncedFeed: 14,  syncedRule: 31,   onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'emily.williams@example.com' },
  { id: 'OS_M006', merchantId: 'M007', name: 'Electronics Hub',         persona: 'Beta',     syncedFeed: 20,  syncedRule: 52,   onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'robert.jones@example.com'   },
  { id: 'OS_M007', merchantId: 'M009', name: 'Beauty Boutique',         persona: 'Platinum', syncedFeed: 12,  syncedRule: null, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'susan.davis@example.com'    },
  { id: 'OS_M008', merchantId: 'M008', name: 'Garden Supplies Co',      persona: 'Gold',     syncedFeed: 11,  syncedRule: null, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'david.miller@example.com'   },
  { id: 'OS_M009', merchantId: 'M010', name: 'Pet Paradise',            persona: 'Platinum', syncedFeed: 17,  syncedRule: 18,   onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'james.taylor@example.com'   },
  { id: 'OS_M010', merchantId: 'M020', name: 'Fitness Equipment Store', persona: 'Silver',   syncedFeed: 34,  syncedRule: null, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'patricia.thomas@example.com'},
];

/* ── Sample rules per advertiser ─────────────────────────────────── */
const INIT_RULES = {
  OS_M002: [
    { id: 'r1', conditions: [{ field: 'brands', value: 'Whitakers' }] },
  ],
  OS_M003: [
    { id: 'r2', conditions: [{ field: 'category_l1', value: 'Frozen' }, { field: 'sellers', value: 'S001; S002' }] },
  ],
  OS_M004: [],
  OS_M005: [
    { id: 'r3', conditions: [{ field: 'manufacturers', value: 'Widget One' }] },
    { id: 'r4', conditions: [{ field: 'custom_label_0', value: 'Label_02_46' }] },
  ],
  OS_M006: [],
  OS_M007: [],
  OS_M008: [],
  OS_M009: [
    { id: 'r5', conditions: [{ field: 'catalog_source_merchant_ids', value: 'M011; M012' }] },
  ],
  OS_M010: [],
};

/* ── Empty condition/rule templates ─────────────────────────────── */
const emptyCondition = () => ({ field: 'brands', value: '' });
const emptyRule      = () => ({ id: `r_${Date.now()}`, conditions: [emptyCondition()] });

/* ── Table TD style ─────────────────────────────────────────────── */
const TD = {
  padding: '10px 14px',
  fontSize: 13,
  color: TEXT_HI,
  borderBottom: `1px solid ${BORDER}`,
  whiteSpace: 'nowrap',
  fontFamily: FONT,
  verticalAlign: 'middle',
};

/* ── Inline Info Banner (generic note strip) ────────────────────── */
function InfoStrip({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      background: 'rgba(99,108,255,0.06)', border: `1px solid rgba(99,108,255,0.18)`,
      borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: TEXT_MID,
    }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={ACCENT}
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>{children}</span>
    </div>
  );
}

/* ── Notes section in rule drawer ───────────────────────────────── */
function RuleNotes() {
  const notes = [
    'For a SKU-Advertiser mapping present through direct feed as well as catalog rule, availability & other SKU attributes follow the most recent advertiser update',
    'If the same SKU is mapped to multiple advertisers, a single order\'s GMV is attributed to all of them.',
    'Rule chaining isn\'t supported—if Advertiser "A" maps to "B" and "B" maps to "C", "A" won\'t automatically map to "C".',
  ];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_MID, marginBottom: 8 }}>Notes :</div>
      {notes.map((note, i) => (
        <div key={i} style={{
          display: 'flex', gap: 8, alignItems: 'flex-start',
          marginBottom: 6, fontSize: 12, color: TEXT_MID,
        }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={ACCENT}
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{note} <span style={{ color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}>Learn more</span></span>
        </div>
      ))}
    </div>
  );
}

/* ── Rule condition builder ─────────────────────────────────────── */
function RuleBuilder({ rules, onChange }) {
  function updateCondition(ruleIdx, condIdx, key, val) {
    const next = rules.map((r, ri) => ri !== ruleIdx ? r : {
      ...r,
      conditions: r.conditions.map((c, ci) =>
        ci !== condIdx ? c : { ...c, [key]: val }
      ),
    });
    onChange(next);
  }

  function addCondition(ruleIdx) {
    const next = rules.map((r, ri) =>
      ri !== ruleIdx ? r : { ...r, conditions: [...r.conditions, emptyCondition()] }
    );
    onChange(next);
  }

  function removeCondition(ruleIdx, condIdx) {
    const next = rules.map((r, ri) =>
      ri !== ruleIdx ? r : { ...r, conditions: r.conditions.filter((_, ci) => ci !== condIdx) }
    );
    onChange(next.filter(r => r.conditions.length > 0));
  }

  function addRule() {
    onChange([...rules, emptyRule()]);
  }

  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_MID, marginBottom: 10 }}>
        Apply Condition <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
      </div>

      {rules.map((rule, ruleIdx) => (
        <div key={rule.id}>
          {ruleIdx > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <span style={{
                padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700,
                background: 'rgba(99,108,255,0.10)', color: ACCENT, letterSpacing: 0.5,
              }}>OR</span>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
            </div>
          )}

          <div style={{
            border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12,
            background: BG_SUB, marginBottom: 4,
          }}>
            {rule.conditions.map((cond, condIdx) => (
              <div key={condIdx}>
                {condIdx > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '6px 0' }}>
                    <div style={{ flex: 1, height: 1, background: BORDER }} />
                    <span style={{
                      padding: '1px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700,
                      background: 'rgba(27,168,122,0.10)', color: 'var(--osmos-brand-green)',
                    }}>AND</span>
                    <div style={{ flex: 1, height: 1, background: BORDER }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ flex: '0 0 180px' }}>
                    <Select
                      label=""
                      value={cond.field}
                      onChange={e => updateCondition(ruleIdx, condIdx, 'field', e.target.value)}
                      options={CONDITION_FIELDS}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input
                      label=""
                      value={cond.value}
                      onChange={e => updateCondition(ruleIdx, condIdx, 'value', e.target.value)}
                      placeholder="Enter values (semicolon separated)"
                    />
                  </div>
                  {rule.conditions.length > 1 && (
                    <Button variant="icon" onClick={() => removeCondition(ruleIdx, condIdx)}
                      style={{ marginBottom: 4 }}>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
                        stroke={TEXT_MID} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={() => addCondition(ruleIdx)}
              style={{
                marginTop: 8, border: 'none', background: 'none', color: ACCENT,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: FONT,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
              <PlusIcon size={12} color={ACCENT} /> Add condition
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addRule}
        style={{
          marginTop: 10, border: `1px dashed ${BORDER}`, borderRadius: 7, background: 'none',
          color: TEXT_MID, fontSize: 12, fontWeight: 600, cursor: 'pointer', width: '100%',
          padding: '8px 0', fontFamily: FONT, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 4,
        }}>
        <PlusIcon size={12} color={TEXT_MID} /> Add rule (OR)
      </button>
    </div>
  );
}

/* ── Expandable Catalog Rules sub-table ─────────────────────────── */
function CatalogRulesSubTable({ advertiserId, advertiserName, rules, onAdd, onEdit }) {
  if (!rules) return null;

  const conditionSummary = (conditions) =>
    conditions.map(c => {
      const label = CONDITION_FIELDS.find(f => f.value === c.field)?.label || c.field;
      return `${label}: ${c.value || '—'}`;
    }).join(' AND ');

  return (
    <tr>
      <td colSpan={9} style={{ padding: 0, background: BG_SUB }}>
        <div style={{ padding: '12px 20px 16px 40px', borderBottom: `1px solid ${BORDER}` }}>
          {/* Catalog Rules header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TEXT_MID, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Catalog Rules
            </span>
            <Button variant="outline" onClick={() => onAdd(advertiserId, advertiserName)}>
              <PlusIcon size={12} color={ACCENT} /> Add
            </Button>
          </div>

          {rules.length === 0 ? (
            <div style={{ fontSize: 12, color: TEXT_LO, fontStyle: 'italic', padding: '6px 0' }}>
              No catalog rules configured. Click "Add" to create a rule.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: WHITE }}>
                  {['#', 'Conditions', 'Action'].map(col => (
                    <th key={col} style={{
                      padding: '6px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                      color: TEXT_MID, borderBottom: `1px solid ${BORDER}`,
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, idx) => (
                  <tr key={rule.id} style={{ background: WHITE }}>
                    <td style={{ ...TD, fontSize: 12, color: TEXT_LO, width: 40 }}>{idx + 1}</td>
                    <td style={{ ...TD, fontSize: 12, whiteSpace: 'normal' }}>
                      {conditionSummary(rule.conditions)}
                    </td>
                    <td style={{ ...TD, fontSize: 12, width: 80 }}>
                      <Button variant="ghost" onClick={() => onEdit(advertiserId, advertiserName, rule)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function AdvertiserOnboardingCatalogPage() {
  const { toast, showToast } = useToast();

  /* ── Tab state ─────────────── */
  const [activeTab, setActiveTab] = useState('Onboard merchants');

  /* ── Table state ───────────── */
  const [advertisers, setAdvertisers]   = useState(INIT_ADVERTISERS);
  const [rules, setRules]               = useState(INIT_RULES);
  const [expandedRows, setExpandedRows] = useState({});
  const [search, setSearch]             = useState('');

  /* ── Create Advertiser drawer ─ */
  const [createOpen, setCreateOpen]     = useState(false);
  const [newMerchantId, setNewMerchantId] = useState('');
  const [newAdvName, setNewAdvName]     = useState('');
  const [newPersona, setNewPersona]     = useState('Gold');

  /* ── Bulk Upload drawer ──────── */
  const [uploadOpen, setUploadOpen]     = useState(false);

  /* ── Rule drawer ─────────────── */
  const [ruleDrawerOpen, setRuleDrawerOpen] = useState(false);
  const [ruleMode, setRuleMode]             = useState('add'); // 'add' | 'edit'
  const [ruleTargetAdvId, setRuleTargetAdvId] = useState(null);
  const [ruleTargetAdvName, setRuleTargetAdvName] = useState('');
  const [editingRuleId, setEditingRuleId]     = useState(null);
  const [ruleConditions, setRuleConditions]   = useState([emptyRule()]);

  /* ── Derived data ─────────────── */
  const filtered = advertisers.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.merchantId.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  /* ── Handlers ─────────────────── */
  function toggleRow(id) {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleCreateSave() {
    if (!newMerchantId.trim() || !newAdvName.trim()) {
      showToast('Merchant ID and Advertiser Name are required', 'error');
      return;
    }
    const newId = `OS_${newMerchantId.trim().toUpperCase()}`;
    setAdvertisers(prev => [...prev, {
      id: newId, merchantId: newMerchantId.trim(),
      name: newAdvName.trim(), persona: newPersona,
      syncedFeed: 0, syncedRule: null,
      onboardedOn: 'Just now', onboardedBy: 'you@example.com',
    }]);
    setRules(prev => ({ ...prev, [newId]: [] }));
    setCreateOpen(false);
    setNewMerchantId(''); setNewAdvName(''); setNewPersona('Gold');
    showToast('Advertiser Added Successfully');
  }

  function openAddRule(advId, advName) {
    setRuleTargetAdvId(advId);
    setRuleTargetAdvName(advName);
    setRuleMode('add');
    setEditingRuleId(null);
    setRuleConditions([emptyRule()]);
    setRuleDrawerOpen(true);
  }

  function openEditRule(advId, advName, rule) {
    setRuleTargetAdvId(advId);
    setRuleTargetAdvName(advName);
    setRuleMode('edit');
    setEditingRuleId(rule.id);
    setRuleConditions([{ ...rule, conditions: [...rule.conditions] }]);
    setRuleDrawerOpen(true);
  }

  function handleRuleSave() {
    const allFilled = ruleConditions.every(r =>
      r.conditions.every(c => c.field && c.value.trim())
    );
    if (!allFilled) {
      showToast('Please fill all condition values', 'error');
      return;
    }
    setRules(prev => {
      const existing = prev[ruleTargetAdvId] || [];
      if (ruleMode === 'add') {
        return { ...prev, [ruleTargetAdvId]: [...existing, ...ruleConditions] };
      }
      return {
        ...prev,
        [ruleTargetAdvId]: existing.map(r =>
          r.id === editingRuleId ? { ...ruleConditions[0], id: editingRuleId } : r
        ),
      };
    });
    setRuleDrawerOpen(false);
    showToast(ruleMode === 'add' ? 'Rule created successfully' : 'Rule updated successfully');
  }

  /* ── Tabs ─────────────────────── */
  const tabs = ['Onboard merchants', 'Map Catalog'];

  /* ── Persona options for Select ─ */
  const PERSONA_OPTIONS = [
    { value: 'Platinum', label: 'Platinum' },
    { value: 'Gold',     label: 'Gold'     },
    { value: 'Silver',   label: 'Silver'   },
    { value: 'Beta',     label: 'Beta'     },
  ];

  /* ── Bulk upload how-it-works ─── */
  const HOW_IT_WORKS = [
    'Excel Format (.xlsx with 2 sheets):',
    'Sheet 1: Advertisers (required) — merchant_id, advertiser_name, persona (gold, silver, or platinum)',
    'Sheet 2: Rules (optional) — merchant_id, brands, sellers, manufacturers, catalog_source_merchant_ids, category_l1/l2/l3, custom_label_0 through custom_label_4',
  ];

  return (
    <div style={{ fontFamily: FONT, background: BG_SUB, minHeight: '100vh', padding: 24 }}>
      <Toast {...toast} />

      {/* ── Info strip ────────────────────────────────────────────── */}
      <InfoStrip>
        Onboard Advertisers and configure catalog rules. You can do this directly from the UI or upload a file to manage them in bulk.{' '}
        <span style={{ color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}>Learn more</span>
      </InfoStrip>

      {/* ── Card ──────────────────────────────────────────────────── */}
      <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden' }}>

        {/* ── Tabs row ──────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${BORDER}`, padding: '0 16px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                border: 'none', borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : '2px solid transparent',
                background: 'none', padding: '12px 16px',
                fontFamily: FONT, fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? ACCENT : TEXT_MID,
                cursor: 'pointer', transition: 'all 0.15s', marginBottom: -1,
              }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Onboard merchants' ? (
          <>
            {/* ── Toolbar ───────────────────────────────────────── */}
            <Toolbar
              left={
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_HI }}>
                    {advertisers.length} Advertiser's Onboarded
                  </span>
                  <button
                    onClick={() => showToast('Refreshed')}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                    <RefreshIcon size={14} color={TEXT_MID} />
                  </button>
                </span>
              }
              right={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SearchBar
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search Merchant ID"
                    width={200}
                  />
                  <button
                    onClick={() => showToast('Download triggered')}
                    style={{ border: `1px solid ${BORDER}`, borderRadius: 7, background: WHITE, padding: '6px 9px', cursor: 'pointer', display: 'flex' }}>
                    <DownloadIcon size={14} color={TEXT_MID} />
                  </button>
                  <Button variant="outline" onClick={() => setUploadOpen(true)}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Bulk Upload
                  </Button>
                  <Button variant="primary" onClick={() => setCreateOpen(true)}>
                    <PlusIcon size={13} color="#fff" /> Create Advertiser
                  </Button>
                </span>
              }
            />

            {/* ── Table ─────────────────────────────────────────── */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                <thead>
                  <tr style={{ background: BG_SUB }}>
                    <th style={TH}></th>
                    {['Advertiser ID', 'Merchant ID', 'Advertiser Name', 'Persona',
                      'Product Synced Via Feed', 'Product Synced Via Rule',
                      'Onboarded On', 'Onboarded By'].map(col => (
                      <th key={col} style={TH}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((adv, i) => {
                    const isExpanded = !!expandedRows[adv.id];
                    return (
                      <React.Fragment key={adv.id}>
                        <tr
                          style={{ background: i % 2 === 0 ? WHITE : BG_SUB }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-brand-primary-muted)'}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? WHITE : BG_SUB}
                        >
                          {/* Expand chevron */}
                          <td style={{ ...TD, width: 40, textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => toggleRow(adv.id)}>
                            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
                              stroke={TEXT_MID} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                              style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </td>
                          <td style={TD}><code style={{ fontSize: 12, background: BG_SUB, borderRadius: 4, padding: '2px 6px' }}>{adv.id}</code></td>
                          <td style={TD}>{adv.merchantId}</td>
                          <td style={TD}>{adv.name}</td>
                          <td style={TD}>
                            <TypeBadge type={adv.persona} colorMap={PERSONA_COLORS} />
                          </td>
                          <td style={{ ...TD, textAlign: 'center' }}>{adv.syncedFeed}</td>
                          <td style={{ ...TD, textAlign: 'center' }}>{adv.syncedRule ?? '—'}</td>
                          <td style={{ ...TD, fontSize: 12, color: TEXT_MID }}>{adv.onboardedOn}</td>
                          <td style={{ ...TD, fontSize: 12, color: TEXT_MID, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {adv.onboardedBy}
                          </td>
                        </tr>
                        {isExpanded && (
                          <CatalogRulesSubTable
                            advertiserId={adv.id}
                            advertiserName={adv.name}
                            rules={rules[adv.id] || []}
                            onAdd={openAddRule}
                            onEdit={openEditRule}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9}>
                        <div style={{ padding: '40px 0', textAlign: 'center', color: TEXT_LO, fontSize: 13 }}>
                          No advertisers found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Footer ────────────────────────────────────────── */}
            <div style={{
              padding: '10px 16px', borderTop: `1px solid ${BORDER}`,
              fontSize: 12, color: TEXT_LO, display: 'flex', justifyContent: 'flex-end',
            }}>
              Showing {filtered.length} of {advertisers.length} records
            </div>
          </>
        ) : (
          /* ── Map Catalog tab placeholder ──────────────────────── */
          <div style={{ padding: '60px 0', textAlign: 'center', color: TEXT_LO }}>
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none"
              stroke={BORDER} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
              style={{ marginBottom: 12 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: TEXT_MID, marginBottom: 4 }}>Map Catalog</p>
            <p style={{ fontSize: 12 }}>Feed standardization view coming soon</p>
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Drawer 1 — Create Advertiser                                */}
      {/* ──────────────────────────────────────────────────────────── */}
      <Drawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Advertiser"
        width={480}
        footer={
          <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateSave}>Save</Button>
          </span>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Merchant ID *"
            value={newMerchantId}
            onChange={e => setNewMerchantId(e.target.value)}
            placeholder="e.g. M001"
            required
          />
          <Input
            label="Advertiser Name *"
            value={newAdvName}
            onChange={e => setNewAdvName(e.target.value)}
            placeholder="e.g. Sports World"
            required
          />
          <Select
            label="Persona"
            value={newPersona}
            onChange={e => setNewPersona(e.target.value)}
            options={PERSONA_OPTIONS}
          />
        </div>
      </Drawer>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Drawer 2 — Bulk Upload                                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <Drawer
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Bulk Upload"
        width={540}
        footer={
          <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setUploadOpen(false); showToast('File uploaded successfully'); }}>Save</Button>
          </span>
        }
      >
        {/* Download template section */}
        <InfoBanner
          fileName="Sample_Template.xlsx"
          fileDesc="Excel template with sample data. Get the template file with the correct format and structure"
          downloadText="Download"
          onDownload={() => showToast('Template downloading...')}
        />

        {/* Upload dropzone */}
        <div style={{ margin: '16px 0 8px', fontSize: 12, fontWeight: 600, color: TEXT_MID }}>
          Upload Your File
        </div>
        <UploadDropzone
          accept=".xlsx"
          label="Upload your .xlsx file here"
          successMessage="File uploaded successfully"
          onFile={() => showToast('File selected')}
        />

        {/* How it works */}
        <div style={{
          marginTop: 20, padding: '14px 16px',
          background: BG_SUB, border: `1px solid ${BORDER}`, borderRadius: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={ACCENT}
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: TEXT_HI }}>
              Excel Format (.xlsx with 2 sheets):
            </span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_HI, marginBottom: 4 }}>
              Sheet 1: Advertisers (required)
            </div>
            {['merchant_id (required)', 'advertiser_name (required)', 'persona (gold, silver, or platinum)'].map(item => (
              <div key={item} style={{ fontSize: 12, color: TEXT_MID, paddingLeft: 12, lineHeight: 1.8 }}>• {item}</div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_HI, marginBottom: 4 }}>
              Sheet 2: Rules (optional)
            </div>
            {[
              'merchant_id (required)',
              'brands (semicolon separated, optional)',
              'sellers (semicolon separated, optional)',
              'manufacturers (semicolon separated, optional)',
              'catalog_source_merchant_ids (semicolon separated, optional)',
              'category_l1, category_l2, category_l3 (semicolon separated, optional)',
              'custom_label_0 through custom_label_4 (semicolon separated, optional)',
            ].map(item => (
              <div key={item} style={{ fontSize: 12, color: TEXT_MID, paddingLeft: 12, lineHeight: 1.8 }}>• {item}</div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* Drawer 3 — Add / Edit Rule                                  */}
      {/* ──────────────────────────────────────────────────────────── */}
      <Drawer
        open={ruleDrawerOpen}
        onClose={() => setRuleDrawerOpen(false)}
        title={ruleMode === 'add' ? 'Add Rule' : 'Edit Rule'}
        width={560}
        footer={
          <span style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={() => setRuleDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleRuleSave}>
              {ruleMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </span>
        }
      >
        {/* Breadcrumb */}
        <div style={{ fontSize: 11, color: TEXT_LO, marginBottom: 14 }}>
          Advertiser Management &rsaquo;{' '}
          <span style={{ color: TEXT_MID }}>{ruleTargetAdvName}</span>
        </div>

        <RuleNotes />

        <RuleBuilder
          rules={ruleConditions}
          onChange={setRuleConditions}
        />
      </Drawer>
    </div>
  );
}

/* ── Table TH style ─────────────────────────────────────────────── */
const TH = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--osmos-fg-muted)',
  borderBottom: `1px solid var(--osmos-border)`,
  whiteSpace: 'nowrap',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  fontFamily: "'Open Sans', sans-serif",
};
