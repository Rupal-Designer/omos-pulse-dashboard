import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, Select, CalendarIcon, CheckIcon, ChevronRightIcon, ChevronLeftIcon, CloseIcon, InfoIcon, Icon } from '../../../ui';

const FONT    = "'Open Sans', sans-serif";
const TEXT    = 'var(--osmos-fg)';
const TEXT_MID= 'var(--osmos-fg-muted)';
const TEXT_SUB= 'var(--osmos-fg-subtle)';
const BORDER  = 'var(--osmos-border)';
const BG      = 'var(--osmos-bg)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M= 'var(--osmos-brand-primary-muted)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = (props) => (
  <Icon {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></Icon>
);
const TrendingUpIcon = (props) => (
  <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>
);
const TargetIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>
);
const DollarSignIcon = (props) => (
  <Icon {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Icon>
);
const BarChartIcon = (props) => (
  <Icon {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></Icon>
);
const ZapIcon = (props) => (
  <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const campaignTypes = [
  { id: 'smart-shopping',   name: 'Smart Shopping',   IconComp: SparklesIcon,  recommended: true,
    description: 'AI-powered campaign that automatically optimizes your product ads across all placements',
    features: ['Automatic bidding optimization', 'Cross-channel placement', 'Dynamic product selection'] },
  { id: 'manual',           name: 'Manual Campaign',  IconComp: TargetIcon,    recommended: false,
    description: 'Full control over targeting, bidding, and product selection',
    features: ['Custom targeting rules', 'Manual bid management', 'Granular product control'] },
  { id: 'performance-max',  name: 'Performance Max',  IconComp: TrendingUpIcon, recommended: false,
    description: 'Goal-based campaign that maximizes conversions across inventory',
    features: ['Conversion-focused', 'Automated creative', 'Full-funnel optimization'] },
];

const wallets = [
  { id: 'default',   name: 'Default',         balance: 1904753.59  },
  { id: 'sale-2024', name: 'Sale 2024 - PLA', balance: 11748280    },
  { id: '2024-q3',   name: '2024 Q3',         balance: 11599459    },
  { id: 'sale23',    name: 'Sale23',           balance: 10000       },
  { id: 'awareness', name: 'Awareness Ads',    balance: 19521925.4  },
  { id: 'display',   name: 'display',          balance: 1532113     },
];

const pacingOptions = [
  { id: 'standard',    label: 'Standard (Even Distribution)', IconComp: BarChartIcon, description: 'Spread your budget evenly throughout the day'       },
  { id: 'accelerated', label: 'Accelerated',                  IconComp: ZapIcon,      description: 'Spend budget as quickly as possible'                },
];

const walletSelectOptions = wallets.map((w) => ({ value: w.id, label: `${w.name} ($${w.balance.toLocaleString()})` }));

// ── Sub-components ────────────────────────────────────────────────────────────
function TypeCard({ type, selected, onClick }) {
  const [hov, setHov] = useState(false);
  const { IconComp, name, description, features, recommended } = type;
  const isSelected = selected;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', padding: 20, borderRadius: 12, cursor: 'pointer',
        border: `2px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        transition: 'all 0.15s', fontFamily: FONT,
      }}
    >
      {recommended && (
        <span style={{ position: 'absolute', top: 12, right: 12, padding: '2px 10px', background: ACCENT, color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 999 }}>
          Recommended
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isSelected ? ACCENT : BG_SUB }}>
          <IconComp size={24} color={isSelected ? '#fff' : TEXT_MID} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 600, color: isSelected ? ACCENT : TEXT, marginBottom: 4 }}>{name}</h3>
          <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 12 }}>{description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {features.map((f) => (
              <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: BG_SUB, borderRadius: 6, fontSize: 12, color: TEXT_MID }}>
                <CheckIcon size={12} color='var(--osmos-brand-green)' />
                {f}
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: `2px solid ${isSelected ? ACCENT : BORDER}`, background: isSelected ? ACCENT : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
          {isSelected && <CheckIcon size={14} color="#fff" />}
        </div>
      </div>
    </div>
  );
}

function PacingBtn({ option, selected, onClick }) {
  const [hov, setHov] = useState(false);
  const { IconComp, label, description } = option;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: 16, borderRadius: 8, textAlign: 'left',
        border: `2px solid ${selected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: selected ? ACCENT_M : hov ? BG_SUB : BG,
        cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT,
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}
    >
      <IconComp size={20} color={selected ? ACCENT : TEXT_MID} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, color: selected ? ACCENT : TEXT, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 12, color: TEXT_MID }}>{description}</div>
      </div>
      {selected && (
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: ACCENT, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon size={12} color="#fff" />
        </div>
      )}
    </button>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '8px 12px 8px 32px',
  border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT,
  background: BG, fontFamily: FONT, outline: 'none',
};

const dateInputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '8px 12px',
  border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT,
  background: BG, fontFamily: FONT, outline: 'none',
};

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8 };

// ── ProductAdsWizard ──────────────────────────────────────────────────────────
export function ProductAdsWizard({ open, onClose, onLaunch }) {
  const [mounted,       setMounted]       = useState(false);
  const [step,          setStep]          = useState('type-selection');
  const [selectedType,  setSelectedType]  = useState(null);
  const [dailyBudget,   setDailyBudget]   = useState('100');
  const [selectedWallet,setSelectedWallet]= useState('');
  const [startDate,     setStartDate]     = useState(new Date().toISOString().split('T')[0]);
  const [endDate,       setEndDate]       = useState('');
  const [maxSpendCap,   setMaxSpendCap]   = useState('');
  const [isLaunching,   setIsLaunching]   = useState(false);
  const [pacing,        setPacing]        = useState('standard');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else       document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  const handleClose = () => {
    setStep('type-selection'); setSelectedType(null); setDailyBudget('100');
    setSelectedWallet(''); setEndDate(''); setMaxSpendCap(''); setIsLaunching(false);
    onClose();
  };

  const handleContinue = () => { if (selectedType) setStep('configuration'); };
  const handleBack     = () => setStep('type-selection');

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onLaunch({ campaignType: selectedType || 'smart-shopping', dailyBudget, wallet: selectedWallet, startDate, endDate, maxSpendCap, pacing });
      handleClose();
    }, 1500);
  };

  const selectedWalletData = wallets.find((w) => w.id === selectedWallet);

  if (!open || !mounted) return null;

  const canLaunch = step === 'configuration' ? !!dailyBudget && !!selectedWallet && !isLaunching : !!selectedType;

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

      {/* Modal */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 900, maxHeight: '90vh', background: BG, borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,0.18)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {step === 'configuration' && (
              <button onClick={handleBack} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = BG_SUB)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <ChevronLeftIcon size={20} color={TEXT_MID} />
              </button>
            )}
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: TEXT }}>
                {step === 'type-selection' ? 'Create Product Ads Campaign' : 'Configure Campaign'}
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: TEXT_MID }}>
                {step === 'type-selection' ? 'Choose how you want to run your product ads' : 'Set your budget and schedule'}
              </p>
            </div>
          </div>
          <button onClick={handleClose} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = BG_SUB)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            <CloseIcon size={18} color={TEXT_MID} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* ── Step: type-selection ── */}
          {step === 'type-selection' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: TEXT_MID }}>Select a campaign type to get started</p>
              {campaignTypes.map((type) => (
                <TypeCard key={type.id} type={type} selected={selectedType === type.id} onClick={() => setSelectedType(type.id)} />
              ))}
            </div>
          )}

          {/* ── Step: configuration ── */}
          {step === 'configuration' && (
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32 }}>
              {/* Left: Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Daily Budget */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Daily Budget</label>
                    <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                    <InfoIcon size={14} color={TEXT_SUB} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <DollarSignIcon size={14} color={TEXT_MID} />
                    </span>
                    <input type="number" value={dailyBudget} onChange={(e) => setDailyBudget(e.target.value)} placeholder="Enter daily budget" style={inputStyle} />
                  </div>
                  <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 4 }}>Minimum daily budget is $10</p>
                </div>

                {/* Wallet */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Wallet</label>
                    <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                    <InfoIcon size={14} color={TEXT_SUB} />
                  </div>
                  <Select
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    options={walletSelectOptions}
                    label=""
                  />
                  {selectedWalletData && (
                    <p style={{ fontSize: 12, color: TEXT_MID, marginTop: 4 }}>
                      Wallet Balance: ${selectedWalletData.balance.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Schedule */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <label style={labelStyle}>Start Date</label>
                      <span style={{ color: 'var(--alert-error-primary)' }}>*</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <CalendarIcon size={14} color={TEXT_MID} />
                      </span>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ ...dateInputStyle, paddingLeft: 32 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <label style={labelStyle}>End Date</label>
                      <span style={{ fontSize: 12, color: TEXT_SUB }}>(Optional)</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <CalendarIcon size={14} color={TEXT_MID} />
                      </span>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ ...dateInputStyle, paddingLeft: 32 }} />
                    </div>
                  </div>
                </div>

                {/* Max Spend Cap */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Maximum Spend Cap</label>
                    <span style={{ fontSize: 12, color: TEXT_SUB }}>(Optional)</span>
                    <InfoIcon size={14} color={TEXT_SUB} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <DollarSignIcon size={14} color={TEXT_MID} />
                    </span>
                    <input type="number" value={maxSpendCap} onChange={(e) => setMaxSpendCap(e.target.value)} placeholder="No cap" style={inputStyle} />
                  </div>
                  <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 4 }}>Campaign will pause when this limit is reached</p>
                </div>
              </div>

              {/* Right: Pacing */}
              <div>
                <div style={{ position: 'sticky', top: 0, padding: 20, background: BG, borderRadius: 12, border: `1px solid ${BORDER}` }}>
                  <h3 style={{ fontWeight: 600, color: TEXT, marginBottom: 8 }}>Pacing</h3>
                  <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>Choose how your budget should be distributed over time</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {pacingOptions.map((option) => (
                      <PacingBtn key={option.id} option={option} selected={pacing === option.id} onClick={() => setPacing(option.id)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: `1px solid ${BORDER}`, background: BG_SUB, flexShrink: 0 }}>
          <div>
            {step === 'configuration' && selectedType && (
              <span style={{ padding: '4px 10px', background: BG_SUB, borderRadius: 6, fontSize: 13, fontWeight: 500, color: TEXT_MID }}>
                {campaignTypes.find((t) => t.id === selectedType)?.name}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button variant="outline" onClick={step === 'type-selection' ? handleClose : handleBack}>
              {step === 'type-selection' ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="primary"
              onClick={step === 'type-selection' ? handleContinue : handleLaunch}
              disabled={!canLaunch}
            >
              {isLaunching ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Launching...
                  <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
                </span>
              ) : step === 'type-selection' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  Continue <ChevronRightIcon size={16} color="#fff" />
                </span>
              ) : 'Launch Campaign'}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
