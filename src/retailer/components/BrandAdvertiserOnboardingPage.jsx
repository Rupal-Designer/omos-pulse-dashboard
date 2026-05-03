import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { TypeBadge } from '../../ui/atoms/Badge';
import { Drawer } from '../../ui/molecules/Drawer';
import { Toast, useToast } from '../../ui/atoms/Toast';

/* ── Mock data ─────────────────────────────────────────────────── */
const INITIAL_DATA = [
  { advertiserId: 'OS_M002', merchantId: 'M002', advertiserName: 'Sports World',           persona: 'Platinum', productSyncedViaFeed: 11, productSyncedViaRule: 22, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'jane.smith@example.com',      catalogRules: 3 },
  { advertiserId: 'OS_M003', merchantId: 'M003', advertiserName: 'Tech Retailers',         persona: 'Gold',     productSyncedViaFeed: 23, productSyncedViaRule: 31, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'mike.johnson@example.com',    catalogRules: 1 },
  { advertiserId: 'OS_M004', merchantId: 'M004', advertiserName: 'Gourmet Grocery',        persona: 'Silver',   productSyncedViaFeed: 12, productSyncedViaRule: 52, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'linda.brown@example.com',     catalogRules: 2 },
  { advertiserId: 'OS_M005', merchantId: 'M006', advertiserName: 'Home Essentials Mart',   persona: 'Gold',     productSyncedViaFeed: 14, productSyncedViaRule: 18, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'emily.williams@example.com',  catalogRules: 0 },
  { advertiserId: 'OS_M006', merchantId: 'M007', advertiserName: 'Electronics Hub',        persona: 'Platinum', productSyncedViaFeed: 20, productSyncedViaRule: 22, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'robert.jones@example.com',    catalogRules: 4 },
  { advertiserId: 'OS_M007', merchantId: 'M009', advertiserName: 'Beauty Boutique',        persona: 'Silver',   productSyncedViaFeed: 17, productSyncedViaRule: 31, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'susan.davis@example.com',     catalogRules: 1 },
  { advertiserId: 'OS_M008', merchantId: 'M008', advertiserName: 'Garden Supplies Co',     persona: 'Gold',     productSyncedViaFeed: 34, productSyncedViaRule: 52, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'david.miller@example.com',    catalogRules: 2 },
  { advertiserId: 'OS_M009', merchantId: 'M010', advertiserName: 'Pet Paradise',           persona: 'Silver',   productSyncedViaFeed: 11, productSyncedViaRule: '-', onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'james.taylor@example.com',   catalogRules: 0 },
  { advertiserId: 'OS_M010', merchantId: 'M020', advertiserName: 'Fitness Equipment Store',persona: 'Platinum', productSyncedViaFeed: 23, productSyncedViaRule: 18, onboardedOn: '13 Nov 25, 12:05 PM', onboardedBy: 'patricia.thomas@example.com', catalogRules: 5 },
];

const PERSONAS = ['Platinum', 'Gold', 'Silver', 'Beta'];

const CONDITION_FIELDS = ['Brand Name', 'Brand ID', 'Category L1', 'Category L2', 'Category L3', 'Seller Name', 'Seller ID', 'Manufacturer Name', 'Manufacturer ID', 'Custom Label 0', 'Custom Label 1'];
const CONDITION_OPS    = ['Is', 'Is not', 'Contains', 'Has any of'];

const SAMPLE_PRODUCTS = [
  { name: "Ben & Jerry's Ice Cream Strawberry", brand: 'Whitakers', brandId: 'B002', category: 'Frozen > Frozen Desserts > Ice Cream', availability: 'In Stock', price: '$10', salePrice: '-', network: 'India', sellerName: "Alice's Boutique", sellerId: 'S001', mfrName: 'Widget One', mfrId: 'M011' },
  { name: 'Nike Air Max 90', brand: 'Nike', brandId: 'B003', category: 'Footwear > Sneakers', availability: 'In Stock', price: '$120', salePrice: '$99', network: 'USA', sellerName: "Bob's Bakery", sellerId: 'S002', mfrName: 'Gadget Two', mfrId: 'M012' },
  { name: 'Adidas Ultraboost 22', brand: 'Adidas', brandId: 'B004', category: 'Footwear > Running', availability: 'In Stock', price: '$180', salePrice: '$150', network: 'Malaysia', sellerName: "Cathy's Crafts", sellerId: 'S003', mfrName: 'Device Three', mfrId: 'M013' },
  { name: 'Puma Suede Classic', brand: 'Puma', brandId: 'B005', category: 'Footwear > Casual', availability: 'Out of Stock', price: '$75', salePrice: '-', network: 'Australia', sellerName: "Dan's Deli", sellerId: 'S004', mfrName: 'Apparatus Four', mfrId: 'M014' },
  { name: 'Eco Home Garden Gloves', brand: 'Eco Home Goods', brandId: 'B006', category: 'Home Decor > Gardening Tool', availability: 'In Stock', price: '$25', salePrice: '$20', network: 'China', sellerName: "Eve's Emporium", sellerId: 'S005', mfrName: 'Instrument Five', mfrId: 'M015' },
];

const CHANGE_HISTORY = [
  {
    date: '28th August 2025, 10:30am', by: 'Aiko Tanaka', action: 'Rule Updated',
    rules: [
      ['Brand is Puma', 'and', 'Category L1 is Shoes'],
      ['OR'],
      ['Brand is Dexter Homes & Gardens', 'Category L1 is Home Decor', 'Category L2 has any of Gardening Tool | Gardening Equipments | Gardening Gloves'],
      ['OR'],
      ['Brand is Eco Home Goods', 'Category L2 is Indoor Plants'],
    ],
  },
  { date: '24th August 2025, 10:30am', by: 'Aiko Tanaka', action: 'Rule Updated', rules: [['Category L2 has any of Gardening Tool | Gardening Equipments']], collapsed: true },
  { date: '21st August 2025, 10:30am', by: 'Aiko Tanaka', action: 'Rule Updated', rules: [], collapsed: true },
  { date: '18th August 2025, 10:30am', by: 'Aiko Tanaka', action: 'Rule Updated', rules: [], collapsed: true },
  { date: '16th August 2025, 10:30am', by: 'Alex Tanaka', action: 'Rule Created', rules: [] },
  { date: '14th August 2025, 09:00am', by: 'Admin', action: 'Advertiser Onboarded', rules: [] },
];

/* ── Persona color map ───────────────────────────────────────── */
const PERSONA_COLORS = {
  Platinum: { bg: '#6366f118', color: '#6366f1' },
  Gold:     { bg: '#f59e0b18', color: '#f59e0b' },
  Silver:   { bg: '#64748b18', color: '#64748b' },
  Beta:     { bg: '#8b5cf618', color: '#8b5cf6' },
};

/* ── Field ───────────────────────────────────────────────────── */
function Field({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 5 }}>
        {label}{required && <span style={{ color: 'var(--alert-error-primary)', marginLeft: 2 }}>*</span>}
      </label>}
      {children}
      {hint && <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, style: s }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '7px 10px', fontSize: 12, outline: 'none', fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', ...s }} />
  );
}

/* ── Condition builder row ───────────────────────────────────── */
function ConditionRow({ cond, onChange, onRemove, showLogic, logic, onLogicChange, isFirst }) {
  return (
    <div>
      {showLogic && !isFirst && (
        <div style={{ display: 'flex', gap: 6, margin: '8px 0' }}>
          {['AND', 'OR'].map(l => (
            <button key={l} onClick={() => onLogicChange(l)} style={{
              display: 'flex', alignItems: 'center', gap: 5, borderRadius: 6, padding: '3px 10px',
              cursor: 'pointer', fontSize: 11, fontFamily: "'Open Sans', sans-serif",
              background: logic === l ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
              color: logic === l ? '#fff' : 'var(--osmos-fg-muted)',
              border: `1px solid ${logic === l ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
            }}>{l}</button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg-subtle)', borderRadius: 8, padding: '8px 10px', border: '1px solid var(--osmos-border)' }}>
        <select value={cond.field} onChange={e => onChange({ ...cond, field: e.target.value })}
          style={{ flex: 1, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 8px', fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none', background: 'var(--osmos-bg)' }}>
          {CONDITION_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={cond.op} onChange={e => onChange({ ...cond, op: e.target.value })}
          style={{ flex: '0 0 110px', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 8px', fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none', background: 'var(--osmos-bg)' }}>
          {CONDITION_OPS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <input value={cond.value} onChange={e => onChange({ ...cond, value: e.target.value })}
          placeholder="Enter value…"
          style={{ flex: 1.5, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 8px', fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none' }} />
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--alert-error-primary)', padding: 2, flexShrink: 0 }}>
          <Icon size={14} color="var(--alert-error-primary)" strokeWidth={1.8}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>
        </button>
      </div>
    </div>
  );
}

/* ── Rule drawer (shared Add / Edit) ──────────────────────────── */
function RuleDrawer({ advertiser, editMode, existingConditions, onClose, onSave }) {
  const [conditions, setConditions] = useState(existingConditions || [
    { id: 1, field: 'Brand Name', op: 'Is', value: 'Nike', logic: 'AND' }
  ]);
  const [productCount] = useState(20);
  const [showProducts, setShowProducts] = useState(false);

  function addCondition() {
    setConditions(c => [...c, { id: Date.now(), field: 'Brand Name', op: 'Is', value: '', logic: 'AND' }]);
  }
  function updateCondition(id, updated) {
    setConditions(c => c.map(x => x.id === id ? { ...x, ...updated } : x));
  }
  function removeCondition(id) {
    setConditions(c => c.filter(x => x.id !== id));
  }

  if (showProducts) {
    return (
      <Drawer
        open={true}
        title="Products Selected"
        subtitle={`${advertiser.advertiserName} › Rules`}
        onClose={() => setShowProducts(false)}
        width={800}
        footer={<>
          <Button variant="outline" onClick={() => setShowProducts(false)}>Back</Button>
          <Button variant="outline" onClick={() => setShowProducts(false)}>Close</Button>
        </>}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>{productCount} Products</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 10px' }}>
            <Icon size={13} color="var(--osmos-fg-subtle)" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
            <input placeholder="Search Product" style={{ border: 'none', outline: 'none', fontSize: 12, fontFamily: "'Open Sans', sans-serif", width: 140, color: 'var(--osmos-fg)' }} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)' }}>
                {['Name', 'Brand', 'Brand ID', 'Category', 'Avail.', 'Price', 'Sale Price', 'Network', 'Seller Name', 'Seller ID', 'Mfr Name', 'Mfr ID'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', borderBottom: '2px solid var(--osmos-border)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PRODUCTS.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '8px 10px', fontWeight: 500, color: 'var(--osmos-fg)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.brand}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.brandId}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.category}</td>
                  <td style={{ padding: '8px 10px' }}>
                    <span style={{ color: p.availability === 'In Stock' ? '#15803d' : 'var(--alert-error-primary)', fontSize: 11, fontWeight: 500 }}>{p.availability}</span>
                  </td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.price}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.salePrice}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.network}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.sellerName}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.sellerId}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.mfrName}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--osmos-fg-muted)' }}>{p.mfrId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={true}
      title={editMode ? 'Edit Rule' : 'Add Rule'}
      subtitle={`Advertiser Management › ${advertiser.advertiserName}`}
      onClose={onClose}
      width={580}
      footer={<>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={() => onSave(conditions)}>{editMode ? 'Update' : 'Create'}</Button>
      </>}
    >
      {/* Notes */}
      <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: 'var(--osmos-brand-amber)', marginBottom: 6 }}>Notes:</div>
        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--osmos-fg-muted)', lineHeight: 1.7 }}>
          <li>If the same SKU is mapped to multiple advertisers, a single order's GMV is attributed to all of them.</li>
          <li>Rule chaining isn't supported — if Advertiser "A" maps to "B" and "B" maps to "C", "A" won't automatically map to "C".</li>
        </ul>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-brand-amber)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", padding: 0, marginTop: 4, textDecoration: 'underline' }}>
          Learn more
        </button>
      </div>

      {/* Apply Condition label */}
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 10 }}>
        Apply Condition <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
      </div>

      {/* Condition rows */}
      <div style={{ marginBottom: 12 }}>
        {conditions.map((cond, idx) => (
          <ConditionRow
            key={cond.id}
            cond={cond}
            isFirst={idx === 0}
            showLogic={true}
            logic={cond.logic}
            onLogicChange={l => updateCondition(cond.id, { logic: l })}
            onChange={updated => updateCondition(cond.id, updated)}
            onRemove={() => removeCondition(cond.id)}
          />
        ))}
      </div>

      {/* Add condition */}
      <button onClick={addCondition} style={{ display:'flex', alignItems:'center', gap:5, border:'1px solid var(--osmos-border)', borderRadius:6, padding:'5px 10px', cursor:'pointer', fontSize:12, fontFamily:"'Open Sans', sans-serif", background:'var(--osmos-bg)', color:'var(--osmos-fg-muted)', marginBottom:16 }}>
        <Icon size={12} color="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
        Add Condition
      </button>

      {/* Products selected counter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon size={15} color="var(--osmos-brand-primary)" strokeWidth={1.8}><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><polyline points="16 21 12 17 8 21"/><polyline points="8 7 12 3 16 7"/></Icon>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>{productCount} Products Selected</span>
        </div>
        <button onClick={() => setShowProducts(true)} style={{ display:'flex', alignItems:'center', gap:5, border:'1px solid var(--osmos-border)', borderRadius:6, padding:'5px 10px', cursor:'pointer', fontSize:11, fontFamily:"'Open Sans', sans-serif", background:'var(--osmos-bg)', color:'var(--osmos-fg-muted)' }}>
          View Products
          <Icon size={12} color="currentColor" strokeWidth={1.8}><polyline points="9 18 15 12 9 6"/></Icon>
        </button>
      </div>
    </Drawer>
  );
}

/* ── Change History drawer ───────────────────────────────────── */
function ChangeHistoryDrawer({ advertiser, onClose }) {
  const [expanded, setExpanded] = useState({ 0: true });

  return (
    <Drawer
      open={true}
      title="Change History"
      subtitle={`Advertiser Management › ${advertiser.advertiserName}`}
      onClose={onClose}
      width={500}
      footer={<>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </>}
    >
      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, background: 'var(--osmos-border)', zIndex: 0 }} />

        {CHANGE_HISTORY.map((event, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: 30, marginBottom: 20 }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: 2, top: 4,
              width: 16, height: 16, borderRadius: '50%',
              background: event.action === 'Advertiser Onboarded' ? 'var(--osmos-brand-green)'
                : event.action === 'Rule Created' ? 'var(--osmos-brand-primary)'
                : 'var(--osmos-brand-amber)',
              border: '2px solid var(--osmos-bg)',
              boxShadow: '0 0 0 2px var(--osmos-border)',
              zIndex: 1,
            }} />

            {/* Event card */}
            <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                    background: event.action === 'Advertiser Onboarded' ? 'var(--osmos-brand-green-muted)'
                      : event.action === 'Rule Created' ? 'var(--osmos-brand-primary-muted)'
                      : 'var(--osmos-brand-amber-muted)',
                    color: event.action === 'Advertiser Onboarded' ? 'var(--osmos-brand-green)'
                      : event.action === 'Rule Created' ? 'var(--osmos-brand-primary)'
                      : 'var(--osmos-brand-amber)',
                    marginBottom: 4,
                  }}>{event.action}</span>
                  <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
                    {event.date} by <strong style={{ color: 'var(--osmos-fg-muted)' }}>{event.by}</strong>
                  </div>
                </div>
                {event.rules && event.rules.length > 0 && (
                  <button onClick={() => setExpanded(e => ({ ...e, [i]: !e[i] }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2 }}>
                    <Icon size={14} color="currentColor" strokeWidth={1.8}>
                      {expanded[i] ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                    </Icon>
                  </button>
                )}
              </div>

              {/* Rule detail */}
              {expanded[i] && event.rules && event.rules.length > 0 && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--osmos-border)' }}>
                  {event.rules.map((group, gi) => (
                    <div key={gi}>
                      {group[0] === 'OR'
                        ? <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#6366f1', margin: '6px 0' }}>OR</div>
                        : (
                          <div style={{ background: 'var(--osmos-bg-subtle)', borderRadius: 6, padding: '6px 10px', marginBottom: 4 }}>
                            {group.map((line, li) => (
                              <div key={li} style={{ fontSize: 12, color: line === 'and' ? 'var(--osmos-fg-subtle)' : 'var(--osmos-fg)', fontStyle: line === 'and' ? 'italic' : 'normal', marginBottom: li < group.length - 1 ? 2 : 0 }}>
                                {line}
                              </div>
                            ))}
                          </div>
                        )
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}

/* ── Bulk Upload drawer ──────────────────────────────────────── */
function BulkUploadDrawer({ onClose, onSuccess }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    setUploaded(true);
    setTimeout(() => { onSuccess(); onClose(); }, 1500);
  }

  return (
    <Drawer
      open={true}
      title="Bulk Upload"
      subtitle="Advertiser Management"
      onClose={onClose}
      width={500}
      footer={<>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={() => { if (uploaded) { onSuccess(); onClose(); } }} style={{ opacity: uploaded ? 1 : 0.5 }}>Save</Button>
      </>}
    >
      {/* Excel format spec */}
      <div style={{ background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '12px 14px', marginBottom: 16, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: 'var(--osmos-fg)', marginBottom: 8 }}>Excel Format (.xlsx with 2 sheets):</div>
        <div style={{ fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 4 }}>Sheet 1: Advertisers (required)</div>
        <ul style={{ margin: '0 0 10px', paddingLeft: 18, color: 'var(--osmos-fg-muted)', lineHeight: 1.8 }}>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>merchant_id</code> (required)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>advertiser_name</code> (required)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>persona</code> (gold, silver, or platinum)</li>
        </ul>
        <div style={{ fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 4 }}>Sheet 2: Rules (optional)</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--osmos-fg-muted)', lineHeight: 1.8, fontSize: 11 }}>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>brands</code> (semicolon separated)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>sellers</code> (semicolon separated)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>manufacturers</code> (semicolon separated)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>category_l1, category_l2, category_l3</code> (semicolon separated)</li>
          <li><code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>custom_label_0</code> through <code style={{ background: 'var(--osmos-bg-subtle)', padding: '1px 4px', borderRadius: 3 }}>custom_label_4</code></li>
        </ul>
      </div>

      {/* Rule logic explanation */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#1e40af' }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Rule Logic & Rule Creation</div>
        <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
          <li><strong>Multiple rows for same Merchant ID</strong> = OR logic</li>
          <li><strong>Multiple values in one column (use ;)</strong> = OR logic (e.g. Nike;Adidas = Nike OR Adidas)</li>
          <li><strong>Multiple columns in the same row</strong> = AND logic — all filled columns must match</li>
        </ul>
      </div>

      {/* Download template */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--osmos-bg-subtle)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)' }}>Sample_Template.xlsx</div>
          <div style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginTop: 2 }}>Excel template with sample data. Get the template file with the correct format and structure</div>
        </div>
        <Button variant="outline" onClick={() => {}} style={{ flexShrink: 0, color: 'var(--osmos-brand-primary)', borderColor: 'var(--osmos-brand-primary)' }}>
          <Icon size={13} color="var(--osmos-brand-primary)" strokeWidth={1.8}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>
          Download
        </Button>
      </div>

      {/* Upload zone */}
      {!uploaded ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => setUploaded(true)}
          style={{
            border: `2px dashed ${dragOver ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
            borderRadius: 8, padding: '28px 20px', textAlign: 'center',
            background: dragOver ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <Icon size={26} color="var(--osmos-fg-subtle)" strokeWidth={1.8}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginTop: 10 }}>Upload Your File</div>
          <div style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 4 }}>Upload your .xlsx file here</div>
          <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginTop: 4 }}>Up to 1,000 campaigns can be created at once</div>
        </div>
      ) : (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <Icon size={18} color="#16a34a" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></Icon>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>Uploaded Successfully</div>
            <div style={{ fontSize: 12, color: '#15803d', marginTop: 3 }}>Your file has been uploaded and is currently processing. You can check the uploaded records in the table.</div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a', fontSize: 12, fontFamily: "'Open Sans', sans-serif", padding: 0, marginTop: 6, textDecoration: 'underline', fontWeight: 600 }}>View</button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

/* ── Create Advertiser drawer ────────────────────────────────── */
function CreateAdvertiserDrawer({ onClose, onSave }) {
  const [merchantId, setMerchantId] = useState('');
  const [name, setName]             = useState('');
  const [persona, setPersona]       = useState('Gold');

  return (
    <Drawer
      open={true}
      title="Create Advertiser"
      onClose={onClose}
      width={440}
      footer={<>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button
          variant="primary"
          onClick={() => { if (merchantId && name) onSave({ merchantId, name, persona }); }}
          style={{ opacity: (!merchantId || !name) ? 0.5 : 1 }}
          disabled={!merchantId || !name}
        >Create Advertiser</Button>
      </>}
    >
      <Field label="Merchant ID" required>
        <TextInput value={merchantId} onChange={setMerchantId} placeholder="e.g. M025" />
      </Field>
      <Field label="Advertiser Name" required>
        <TextInput value={name} onChange={setName} placeholder="e.g. Sports World" />
      </Field>
      <Field label="Persona">
        <select value={persona} onChange={e => setPersona(e.target.value)}
          style={{ width: '100%', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '7px 10px', fontSize: 12, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none' }}>
          {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '10px 12px', fontSize: 12, color: '#15803d' }}>
        The advertiser will be onboarded with default settings. Catalog rules can be added from the table.
      </div>
    </Drawer>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function BrandAdvertiserOnboardingPage() {
  const [data, setData]           = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('Onboard merchants');
  const [search, setSearch]       = useState('');

  // Drawer state
  const [ruleDrawer, setRuleDrawer]         = useState(null); // { row, editMode }
  const [historyDrawer, setHistoryDrawer]   = useState(null); // row
  const [bulkDrawer, setBulkDrawer]         = useState(false);
  const [createDrawer, setCreateDrawer]     = useState(false);

  // Toast
  const { toast, showToast } = useToast();

  const filtered = data.filter(r =>
    r.advertiserName.toLowerCase().includes(search.toLowerCase()) ||
    r.merchantId.toLowerCase().includes(search.toLowerCase()) ||
    r.advertiserId.toLowerCase().includes(search.toLowerCase())
  );

  const TH = { padding: '9px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap', background: 'var(--osmos-bg-subtle)', borderBottom: '2px solid var(--osmos-border)', position: 'sticky', top: 0 };
  const TD = { padding: '9px 12px', fontSize: 12, color: 'var(--osmos-fg)', borderBottom: '1px solid var(--osmos-border)', whiteSpace: 'nowrap' };

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>

      {/* Info banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--osmos-brand-primary-muted)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: 'var(--osmos-brand-primary)' }}>
        <Icon size={15} color="var(--osmos-brand-primary)" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>
        <span>
          Onboard brand advertisers and map their product catalog rules to ensure accurate ad attribution and spend tracking.{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Learn more</span>
        </span>
      </div>

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', border: '1px solid var(--osmos-border)', borderRadius: 6, overflow: 'hidden' }}>
              {['Onboard merchants', 'Map Catalog'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: '5px 14px', border: 'none', cursor: 'pointer', fontSize: 12,
                  fontWeight: activeTab === t ? 700 : 400,
                  background: activeTab === t ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
                  color: activeTab === t ? '#fff' : 'var(--osmos-fg-muted)',
                  fontFamily: "'Open Sans', sans-serif",
                  borderRight: t === 'Onboard merchants' ? '1px solid var(--osmos-border)' : 'none',
                }}>{t}</button>
              ))}
            </div>
            <Button variant="outline" onClick={() => {}}>
              <Icon size={11} color="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
              Add a Filter
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Icon size={12} color="currentColor" strokeWidth={1.8}><path d="M3 3h18v4H3z"/><path d="M3 11h18v4H3z"/><path d="M3 19h18v4H3z"/></Icon>
              Change Log
            </Button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontWeight: 500 }}>{filtered.length} Advertiser's Onboarded</span>
            <Button variant="outline" onClick={() => {}} style={{ padding: '5px 8px' }}>
              <Icon size={13} color="currentColor" strokeWidth={1.8}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Icon size={13} color="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></Icon>
              Columns
            </Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '5px 10px', background: 'var(--osmos-bg)' }}>
              <Icon size={13} color="var(--osmos-fg-subtle)" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Merchant ID"
                style={{ border: 'none', outline: 'none', fontSize: 12, fontFamily: "'Open Sans', sans-serif", width: 150, color: 'var(--osmos-fg)' }} />
            </div>
            <Button variant="outline" onClick={() => {}} style={{ padding: '5px 8px' }}>
              <Icon size={13} color="currentColor" strokeWidth={1.8}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>
            </Button>
            <Button variant="outline" onClick={() => setBulkDrawer(true)}>
              <Icon size={13} color="currentColor" strokeWidth={1.8}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>
              Bulk Upload
            </Button>
            <Button variant="primary" onClick={() => setCreateDrawer(true)}>
              <Icon size={12} color="#fff" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
              Create Advertiser
            </Button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 270px)', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                <th style={TH}>Advertiser ID</th>
                <th style={TH}>Merchant ID</th>
                <th style={TH}>Advertiser Name</th>
                <th style={TH}>Persona</th>
                <th style={{ ...TH, textAlign: 'right' }}>Synced via Feed</th>
                <th style={{ ...TH, textAlign: 'right' }}>Synced via Rule</th>
                <th style={TH}>Onboarded On</th>
                <th style={TH}>Onboarded By</th>
                <th style={TH}>Catalog Rules</th>
                <th style={{ ...TH, textAlign: 'center' }}>History</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.advertiserId}
                  style={{ background: i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--osmos-bg)' : 'var(--osmos-bg-subtle)'}
                >
                  <td style={{ ...TD, fontWeight: 600, color: 'var(--osmos-brand-primary)' }}>{row.advertiserId}</td>
                  <td style={TD}>{row.merchantId}</td>
                  <td style={{ ...TD, fontWeight: 500 }}>{row.advertiserName}</td>
                  <td style={TD}><TypeBadge type={row.persona} colorMap={PERSONA_COLORS} /></td>
                  <td style={{ ...TD, textAlign: 'right' }}>{row.productSyncedViaFeed}</td>
                  <td style={{ ...TD, textAlign: 'right' }}>{row.productSyncedViaRule}</td>
                  <td style={{ ...TD, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>{row.onboardedOn}</td>
                  <td style={{ ...TD, color: 'var(--osmos-fg-muted)', fontSize: 11 }}>{row.onboardedBy}</td>
                  <td style={TD}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {row.catalogRules > 0 && (
                        <span style={{ fontSize: 11, background: '#eff6ff', color: 'var(--osmos-brand-primary)', border: '1px solid #bfdbfe', borderRadius: 10, padding: '1px 7px', fontWeight: 600 }}>
                          {row.catalogRules}
                        </span>
                      )}
                      <button
                        onClick={() => setRuleDrawer({ row, editMode: false })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-brand-primary)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", textDecoration: 'underline', padding: 0 }}>
                        Add
                      </button>
                      {row.catalogRules > 0 && (
                        <button
                          onClick={() => setRuleDrawer({ row, editMode: true })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)', fontSize: 12, fontFamily: "'Open Sans', sans-serif", textDecoration: 'underline', padding: 0 }}>
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                  <td style={{ ...TD, textAlign: 'center' }}>
                    <button
                      onClick={() => setHistoryDrawer(row)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-subtle)', padding: 2 }}
                      title="Change History"
                    >
                      <Icon size={16} color="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
          <span>Showing {filtered.length} of {data.length} advertisers</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 28, height: 28, border: '1px solid var(--osmos-border)', borderRadius: 4, background: 'var(--osmos-brand-primary)', color: '#fff', cursor: 'pointer', fontSize: 12, fontFamily: "'Open Sans', sans-serif" }}>1</button>
          </div>
        </div>
      </div>

      {/* ── Add / Edit Rule Drawer ── */}
      {ruleDrawer && (
        <RuleDrawer
          advertiser={ruleDrawer.row}
          editMode={ruleDrawer.editMode}
          existingConditions={ruleDrawer.editMode ? [
            { id: 1, field: 'Brand Name', op: 'Is', value: 'Nike', logic: 'AND' },
            { id: 2, field: 'Category L1', op: 'Is', value: 'Footwear', logic: 'AND' },
          ] : undefined}
          onClose={() => setRuleDrawer(null)}
          onSave={() => {
            setData(d => d.map(r => r.advertiserId === ruleDrawer.row.advertiserId
              ? { ...r, catalogRules: r.catalogRules + (ruleDrawer.editMode ? 0 : 1) } : r));
            setRuleDrawer(null);
            showToast(ruleDrawer.editMode ? 'Rule updated successfully' : 'Rule created successfully');
          }}
        />
      )}

      {/* ── Change History Drawer ── */}
      {historyDrawer && (
        <ChangeHistoryDrawer advertiser={historyDrawer} onClose={() => setHistoryDrawer(null)} />
      )}

      {/* ── Bulk Upload Drawer ── */}
      {bulkDrawer && (
        <BulkUploadDrawer
          onClose={() => setBulkDrawer(false)}
          onSuccess={() => showToast('Advertiser Added Successfully')}
        />
      )}

      {/* ── Create Advertiser Drawer ── */}
      {createDrawer && (
        <CreateAdvertiserDrawer
          onClose={() => setCreateDrawer(false)}
          onSave={({ merchantId, name, persona }) => {
            setData(d => [{
              advertiserId: `OS_${merchantId}`, merchantId, advertiserName: name,
              persona, productSyncedViaFeed: 0, productSyncedViaRule: '-',
              onboardedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) + ', 12:00 PM',
              onboardedBy: 'Admin', catalogRules: 0,
            }, ...d]);
            setCreateDrawer(false);
            showToast(`${name} onboarded successfully`);
          }}
        />
      )}

      <Toast {...toast} />
    </div>
  );
}
