import { useState } from 'react';
import { Drawer, Button, Input, Badge, Icon, Toast, useToast } from '../../ui';


// ── Inline icons ──────────────────────────────────────────────────────────────
const SparkleIcon = ({ size = 14, color = 'var(--osmos-brand-primary)' }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const TrendUpIcon = ({ size = 13, color = 'var(--osmos-brand-green)' }) => (
  <Icon size={size} color={color}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </Icon>
);

// ── BudgetAdjustDrawer ────────────────────────────────────────────────────────
/**
 * Props:
 *   open             boolean
 *   onClose          () => void
 *   campaignName     string    — e.g. "Summer Sale PLA"
 *   currentBudget    number    — current daily budget in ₹ (numeric)
 *   aiSuggestedBudget number   — AI-recommended daily budget in ₹ (numeric)
 *   projectedRevUplift string  — e.g. "+₹6,00,000"
 *   projectedUpliftPct string  — e.g. "+65%"
 *   onSave           (newBudget: number) => void   — called when user confirms
 */
export function BudgetAdjustDrawer({
  open,
  onClose,
  campaignName     = 'Summer Sale PLA',
  currentBudget    = 5000,
  aiSuggestedBudget = 8200,
  projectedRevUplift = '+₹6,00,000',
  projectedUpliftPct = '+65%',
  onSave,
}) {
  const [value, setValue]     = useState(String(aiSuggestedBudget));
  const [error, setError]     = useState('');
  const [saving, setSaving]   = useState(false);
  const { toast, showToast }  = useToast();

  const numVal     = parseFloat(value.replace(/,/g, '')) || 0;
  const isAISuggested = numVal === aiSuggestedBudget;
  const isIncrease = numVal > currentBudget;
  const deltaAmt   = Math.abs(numVal - currentBudget).toLocaleString('en-IN');
  const deltaPct   = currentBudget > 0
    ? Math.round(((numVal - currentBudget) / currentBudget) * 100)
    : 0;

  function handleChange(e) {
    const raw = e.target.value.replace(/[^\d.]/g, '');
    setValue(raw);
    if (error) setError('');
  }

  function handleApplyAI() {
    setValue(String(aiSuggestedBudget));
    setError('');
  }

  function validate() {
    if (!value || numVal <= 0) return 'Please enter a valid daily budget.';
    if (numVal < 500)          return 'Minimum daily budget is ₹500.';
    if (numVal > 1000000)      return 'Maximum daily budget is ₹10,00,000.';
    return '';
  }

  async function handleSave() {
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true);
    // Phase 0: simulate API latency
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    onSave?.(numVal);
    showToast(`Daily budget updated to ₹${numVal.toLocaleString('en-IN')}`, 'success');
    onClose();
  }

  // Reset value when drawer opens
  function handleOpen() {
    setValue(String(aiSuggestedBudget));
    setError('');
  }

  // Call reset on open transition
  if (open && value === '' ) handleOpen();

  const footer = (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
      <Button variant="outline" onClick={onClose} disabled={saving}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave} disabled={saving} style={{ minWidth: 120 }}>
        {saving ? 'Saving…' : 'Apply Budget'}
      </Button>
    </div>
  );

  return (
    <>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
      <Drawer
        open={open}
        onClose={onClose}
        title="Adjust Daily Budget"
        subtitle={campaignName}
        footer={footer}
        width={440}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'Open Sans', sans-serif" }}>

          {/* ── AI Recommendation banner ──────────────────────────────── */}
          <div style={{
            background: 'var(--osmos-brand-primary-muted)',
            border: `1px solid var(--osmos-brand-primary)`,
            borderRadius: 10, padding: '14px 16px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--osmos-brand-primary)' }}>
                <SparkleIcon size={13} color="var(--osmos-brand-primary)" /> AI Recommendation
              </span>
              <Badge status="warning" style={{ fontSize: 10 }}>Beta</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--osmos-brand-primary)' }}>
                ₹{aiSuggestedBudget.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)' }}>/ day</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendUpIcon />
              <span style={{ fontSize: 12, color: 'var(--osmos-brand-green)', fontWeight: 600 }}>
                {projectedRevUplift} projected revenue uplift ({projectedUpliftPct})
              </span>
            </div>
            <button
              onClick={handleApplyAI}
              style={{
                marginTop: 4, alignSelf: 'flex-start',
                fontSize: 12, color: 'var(--osmos-brand-primary)', fontWeight: 600,
                background: 'none', border: `1px solid var(--osmos-brand-primary)`,
                borderRadius: 6, padding: '4px 12px', cursor: 'pointer',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Use AI suggestion
            </button>
          </div>

          {/* ── Current vs New comparison ─────────────────────────────── */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          }}>
            <div style={{
              background: 'var(--osmos-bg-subtle)', borderRadius: 8,
              border: `1px solid var(--osmos-border)`, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>Current</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)' }}>
                ₹{currentBudget.toLocaleString('en-IN')}
                <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--osmos-fg-muted)' }}> /day</span>
              </div>
            </div>
            <div style={{
              background: numVal > 0 ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)', borderRadius: 8,
              border: `1px solid ${numVal > 0 ? 'var(--osmos-brand-green)' : 'var(--osmos-border)'}`, padding: '12px 14px',
              transition: 'background 0.2s, border-color 0.2s',
            }}>
              <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>New</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: numVal > 0 ? 'var(--osmos-brand-green)' : 'var(--osmos-fg)' }}>
                {numVal > 0 ? `₹${numVal.toLocaleString('en-IN')}` : '—'}
                {numVal > 0 && <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--osmos-fg-muted)' }}> /day</span>}
              </div>
            </div>
          </div>

          {/* ── Delta callout (shown when new !== current) ─────────────── */}
          {numVal > 0 && numVal !== currentBudget && (
            <div style={{
              background: isIncrease ? 'var(--osmos-brand-green-muted)' : `rgba(239,68,68,0.08)`,
              border: `1px solid ${isIncrease ? 'var(--osmos-brand-green)' : '#ef4444'}`,
              borderRadius: 8, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 12, color: isIncrease ? 'var(--osmos-brand-green)' : '#ef4444', fontWeight: 600,
            }}>
              <span style={{ fontSize: 16 }}>{isIncrease ? '↑' : '↓'}</span>
              {isIncrease ? '+' : '-'}₹{deltaAmt}/day
              <span style={{ fontWeight: 400, color: 'var(--osmos-fg-muted)' }}>
                ({isIncrease ? '+' : ''}{deltaPct}% change from current budget)
              </span>
            </div>
          )}

          {/* ── Budget input ──────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Input
              label="Daily Budget (₹)"
              value={value}
              onChange={handleChange}
              placeholder="Enter daily budget"
              type="text"
              inputMode="numeric"
              required
              style={error ? { borderColor: '#ef4444' } : {}}
            />
            {error && (
              <span style={{ fontSize: 11, color: '#ef4444' }}>{error}</span>
            )}
            <span style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)' }}>
              Minimum ₹500/day · Maximum ₹10,00,000/day
            </span>
          </div>

          {/* ── Pacing note ───────────────────────────────────────────── */}
          <div style={{
            background: 'var(--osmos-bg-subtle)', borderRadius: 8,
            border: `1px solid var(--osmos-border)`, padding: '10px 14px',
            fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--osmos-fg)' }}>Even pacing</strong> — Your budget will be distributed
            evenly throughout the day for consistent delivery. Budget changes take effect within
            1–2 hours.
          </div>

        </div>
      </Drawer>
    </>
  );
}
