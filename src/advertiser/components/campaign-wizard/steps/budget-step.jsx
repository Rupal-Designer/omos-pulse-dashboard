import { useState } from 'react';
import { Input, Select, InfoIcon, SearchIcon, Icon } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const GREEN_M  = 'var(--osmos-brand-green-muted)';
const AMBER    = 'var(--osmos-brand-amber)';
const ERROR    = 'var(--alert-error-primary)';
const VIOLET   = '#7349a1'; // brand-secondary — no osmos token yet

// ── Icons ─────────────────────────────────────────────────────────────────────
const DollarSignIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

const WalletIcon = (props) => (
  <Icon {...props}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
  </Icon>
);

const AlertCircleIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </Icon>
);

const ZapIcon = (props) => (
  <Icon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </Icon>
);

const BarChartIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="20" y2="10"/>
    <line x1="18" x2="18" y1="20" y2="4"/>
    <line x1="6"  x2="6"  y1="20" y2="16"/>
  </Icon>
);

const RocketIcon = (props) => (
  <Icon {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const walletOptions = [
  { id: 'default',     name: 'Default',          balance: 1904753.59,  promoBalance: 6089649.19 },
  { id: 'sale2024-pla',name: 'Sale 2024 - PLA',  balance: 11748280,    promoBalance: 0          },
  { id: '2024q3',      name: '2024 Q3',           balance: 11599459,    promoBalance: 0          },
  { id: 'sale23',      name: 'Sale23',            balance: 10000,       promoBalance: 0          },
  { id: 'awareness',   name: 'Awareness Ads',     balance: 19521925.4,  promoBalance: 0          },
];

const budgetTypes = [
  { id: 'daily',    label: 'Daily Budget',    description: 'Set a daily spending limit'           },
  { id: 'lifetime', label: 'Lifetime Budget', description: 'Total budget for campaign duration'   },
];

const pacingOptions = [
  { id: 'standard',    label: 'Standard (Even Distribution)', IconComp: BarChartIcon, iconColor: ACCENT,
    description: 'Spread your budget evenly throughout the day to maintain consistent visibility' },
  { id: 'accelerated', label: 'Accelerated',                  IconComp: RocketIcon,   iconColor: AMBER,
    description: 'Spend budget as quickly as possible to maximize early impressions and reach'    },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        position: 'relative', width: 44, height: 24, borderRadius: 999,
        background: checked ? ACCENT : TEXT_SUB, border: 'none', cursor: 'pointer',
        transition: 'background 0.15s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 4, width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transform: checked ? 'translateX(24px)' : 'translateX(4px)', transition: 'transform 0.15s', display: 'block',
      }} />
    </button>
  );
}

function PacingCard({ option, selected, onClick }) {
  const [hov, setHov] = useState(false);
  const { IconComp, iconColor, label, description } = option;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16, borderRadius: 8, textAlign: 'left',
        border: `2px solid ${selected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: selected ? ACCENT_M : hov ? BG_SUB : BG,
        cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT,
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 2 }}>
        <IconComp size={24} color={iconColor} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, color: selected ? ACCENT : TEXT, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 12, color: TEXT_MID }}>{description}</div>
      </div>
      {selected && (
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: ACCENT, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
      )}
    </button>
  );
}

// ── BudgetStep ────────────────────────────────────────────────────────────────
export function BudgetStep({ data, updateData, onFieldChange, adType = 'display' }) {
  const [budgetType,        setBudgetType]        = useState(data.budgetType || 'daily');
  const [cboEnabled,        setCboEnabled]        = useState(data.cboEnabled || false);
  const [walletSearch,      setWalletSearch]      = useState('');
  const [walletDropdownOpen,setWalletDropdownOpen]= useState(false);
  const [hovBudgetType,     setHovBudgetType]     = useState(null);

  const isProductAds = adType === 'product';

  const totalBudget    = Number.parseFloat(data.totalBudget) || 0;
  const dailyBudget    = Number.parseFloat(data.dailyBudget) || 0;
  const estimatedDays  = dailyBudget > 0 ? Math.ceil(totalBudget / dailyBudget) : 0;

  const handleBudgetTypeChange = (type) => {
    setBudgetType(type);
    updateData({ budgetType: type });
  };

  const handleCboToggle = () => {
    const newValue = !cboEnabled;
    setCboEnabled(newValue);
    updateData({ cboEnabled: newValue });
  };

  const handleFieldChange = (field, value) => {
    if (onFieldChange) onFieldChange(field, value);
    else updateData({ [field]: value });
  };

  const filteredWallets = walletOptions.filter((w) =>
    w.name.toLowerCase().includes(walletSearch.toLowerCase()),
  );

  const selectedWallet = walletOptions.find((w) => w.id === data.wallet);

  const cardStyle = {
    background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24, fontFamily: FONT,
  };

  const dollarWrapStyle = { position: 'relative', display: 'inline-flex', alignItems: 'center' };
  const dollarIconStyle = { position: 'absolute', left: 10, pointerEvents: 'none', zIndex: 1 };

  const rawInputStyle = (width) => ({
    width, paddingLeft: 28, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
    border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT,
    background: BG, fontFamily: FONT, outline: 'none', boxSizing: 'border-box',
  });

  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8 };
  const hintStyle  = { fontSize: 12, color: TEXT_SUB, marginTop: 4 };

  // ── Product Ads Layout ─────────────────────────────────────────────────────
  if (isProductAds) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT, maxWidth: 720, margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 }}>Campaign Setup</h2>
          <p style={{ fontSize: 13, color: TEXT_MID }}>Configure your Product Ads campaign budget and schedule.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Daily Budget */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Daily Budget:</label>
              <InfoIcon size={14} color={TEXT_SUB} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={dollarWrapStyle}>
                <span style={{ ...dollarIconStyle, fontSize: 13, color: TEXT_MID }}>$</span>
                <input
                  type="number"
                  value={data.dailyBudget}
                  onChange={(e) => handleFieldChange('dailyBudget', e.target.value)}
                  placeholder="100"
                  style={rawInputStyle(128)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: TEXT_MID }}>FlexiBudget</span>
                <InfoIcon size={14} color={TEXT_SUB} />
                <Toggle
                  checked={!!data.flexiBudget}
                  onChange={() => updateData({ flexiBudget: !data.flexiBudget })}
                />
              </div>
            </div>
            <p style={hintStyle}>
              Your average daily budget can be in the range from $12,250 to $15,925.
              This is based on overall data from 2nd Dec, 2025 - 8th Dec, 2025.
            </p>
          </div>

          {/* Wallet Selection */}
          <div style={cardStyle}>
            <label style={labelStyle}>Choose Wallet</label>
            <div style={{ position: 'relative' }}>
              <WalletDropdown
                data={data}
                updateData={updateData}
                walletSearch={walletSearch}
                setWalletSearch={setWalletSearch}
                walletDropdownOpen={walletDropdownOpen}
                setWalletDropdownOpen={setWalletDropdownOpen}
                filteredWallets={filteredWallets}
                selectedWallet={selectedWallet}
              />
            </div>
          </div>

          {/* Start & End Date */}
          <div style={cardStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Start Date</label>
                  <InfoIcon size={14} color={TEXT_SUB} />
                </div>
                <input
                  type="date"
                  value={data.startDate}
                  onChange={(e) => handleFieldChange('startDate', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>End Date</label>
                  <span style={{ fontSize: 12, color: TEXT_SUB }}>(Optional)</span>
                </div>
                <input
                  type="date"
                  value={data.endDate}
                  onChange={(e) => handleFieldChange('endDate', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
                />
              </div>
            </div>
            <p style={hintStyle}>* Date will be set in the Asia/Kolkata (+05:30) timezone</p>
          </div>

          {/* Maximum Spend Cap */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Maximum Spend Cap:</label>
              <InfoIcon size={14} color={TEXT_SUB} />
              <span style={{ fontSize: 12, color: TEXT_SUB }}>(Optional)</span>
            </div>
            <div style={dollarWrapStyle}>
              <span style={{ ...dollarIconStyle, fontSize: 13, color: TEXT_MID }}>$</span>
              <input
                type="number"
                value={data.maxSpendCap}
                onChange={(e) => updateData({ maxSpendCap: e.target.value })}
                placeholder="Enter amount"
                style={rawInputStyle(192)}
              />
            </div>
          </div>

          {/* Pacing */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Pacing</h3>
            <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>
              Choose how your budget should be distributed over time
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {pacingOptions.map((option) => (
                <PacingCard
                  key={option.id}
                  option={option}
                  selected={data.pacing === option.id}
                  onClick={() => updateData({ pacing: option.id })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Display Ads Layout ─────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT, maxWidth: 720, margin: '0 auto' }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Budget &amp; Schedule</h2>
        <p style={{ color: TEXT_MID }}>Configure your campaign budget, schedule, and payment settings.</p>
      </div>

      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Campaign Name */}
        <div>
          <label style={labelStyle}>
            Campaign Name <span style={{ color: ERROR }}>*</span>
          </label>
          <input
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="e.g., Summer Sale 2025"
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
          />
        </div>

        {/* Budget Type chips */}
        <div style={{ paddingBottom: 24, borderBottom: `1px solid ${BG_SUB}` }}>
          <label style={labelStyle}>Budget Type</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {budgetTypes.map((type) => {
              const isSelected = budgetType === type.id;
              const isHov      = hovBudgetType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleBudgetTypeChange(type.id)}
                  onMouseEnter={() => setHovBudgetType(type.id)}
                  onMouseLeave={() => setHovBudgetType(null)}
                  style={{
                    padding: '8px 12px', borderRadius: 8, fontSize: 13, border: 'none',
                    cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT,
                    background: isSelected ? ACCENT : isHov ? BG_SUB : BG_SUB,
                    color: isSelected ? '#fff' : TEXT_MID,
                  }}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CBO Toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 24, borderBottom: `1px solid ${BG_SUB}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ZapIcon size={16} color={VIOLET} />
            <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Campaign Budget Optimization</span>
            <InfoIcon size={12} color={TEXT_SUB} />
          </div>
          <Toggle checked={cboEnabled} onChange={handleCboToggle} />
        </div>

        {/* Budget Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, paddingBottom: 24, borderBottom: `1px solid ${BG_SUB}` }}>
          <div>
            <label style={labelStyle}>
              Total Budget <span style={{ color: ERROR }}>*</span>
            </label>
            <div style={dollarWrapStyle}>
              <span style={{ ...dollarIconStyle, left: 10, fontSize: 13, color: TEXT_MID }}>
                <DollarSignIcon size={14} color={TEXT_MID} />
              </span>
              <input
                type="number"
                value={data.totalBudget}
                onChange={(e) => updateData({ totalBudget: e.target.value })}
                placeholder="10,000"
                style={{ ...rawInputStyle('100%'), paddingLeft: 32 }}
              />
            </div>
            <p style={hintStyle}>Min: $10</p>
          </div>
          <div>
            <label style={labelStyle}>
              Daily Budget <span style={{ color: ERROR }}>*</span>
            </label>
            <div style={dollarWrapStyle}>
              <span style={{ ...dollarIconStyle, left: 10, fontSize: 13, color: TEXT_MID }}>
                <DollarSignIcon size={14} color={TEXT_MID} />
              </span>
              <input
                type="number"
                value={data.dailyBudget}
                onChange={(e) => updateData({ dailyBudget: e.target.value })}
                placeholder="500"
                style={{ ...rawInputStyle('100%'), paddingLeft: 32 }}
              />
            </div>
            <p style={hintStyle}>Min: $10</p>
          </div>
        </div>

        {/* Budget estimation messages */}
        {estimatedDays > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: GREEN, paddingBottom: 24, borderBottom: `1px solid ${BG_SUB}` }}>
            <InfoIcon size={14} color={GREEN} />
            <span>Estimated duration: <strong>{estimatedDays} days</strong></span>
          </div>
        )}

        {dailyBudget > totalBudget && totalBudget > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: AMBER, paddingBottom: 24, borderBottom: `1px solid ${BG_SUB}` }}>
            <AlertCircleIcon size={14} color={AMBER} />
            <span>Daily budget exceeds total budget</span>
          </div>
        )}

        {/* Schedule + Wallet */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div>
            <label style={labelStyle}>
              Start Date <span style={{ color: ERROR }}>*</span>
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
            />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
            />
          </div>
          <div>
            <label style={labelStyle}>
              Wallet <span style={{ color: ERROR }}>*</span>
            </label>
            <select
              value={data.wallet || ''}
              onChange={(e) => updateData({ wallet: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, background: BG, fontFamily: FONT, outline: 'none' }}
            >
              <option value="">Select</option>
              {walletOptions.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Wallet Balance */}
        {selectedWallet && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <WalletIcon size={14} color={GREEN} />
            <span style={{ color: GREEN }}>Balance: ${selectedWallet.balance.toLocaleString()}</span>
          </div>
        )}

        {/* Pacing */}
        <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 20 }}>
          <h3 style={{ fontWeight: 600, color: TEXT, marginBottom: 8 }}>Pacing</h3>
          <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>
            Choose how your budget should be distributed over time
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {pacingOptions.map((option) => (
              <PacingCard
                key={option.id}
                option={option}
                selected={data.pacing === option.id}
                onClick={() => updateData({ pacing: option.id })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── WalletDropdown (Product Ads) ───────────────────────────────────────────────
function WalletDropdown({ data, updateData, walletSearch, setWalletSearch, walletDropdownOpen, setWalletDropdownOpen, filteredWallets, selectedWallet }) {
  const [hovBtn, setHovBtn] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        style={{
          width: '100%', padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 8,
          textAlign: 'left', background: hovBtn ? BG_SUB : BG, cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif", fontSize: 13, transition: 'all 0.15s',
        }}
      >
        {selectedWallet ? (
          <span style={{ color: 'var(--osmos-fg)' }}>
            {selectedWallet.name} (${selectedWallet.balance.toLocaleString()})
          </span>
        ) : (
          <span style={{ color: 'var(--osmos-fg-subtle)' }}>Select Wallet</span>
        )}
      </button>

      {walletDropdownOpen && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)',
          borderRadius: 8, boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 50,
          maxHeight: 320, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          {/* Search */}
          <div style={{ padding: 8, borderBottom: '1px solid var(--osmos-border)' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={14} color='var(--osmos-fg-subtle)' style={{ position: 'absolute', left: 10, pointerEvents: 'none' }} />
              <input
                value={walletSearch}
                onChange={(e) => setWalletSearch(e.target.value)}
                placeholder="Search"
                style={{
                  width: '100%', boxSizing: 'border-box', padding: '7px 12px 7px 30px',
                  border: '1px solid var(--osmos-border)', borderRadius: 8, fontSize: 13,
                  color: 'var(--osmos-fg)', background: 'var(--osmos-bg)',
                  fontFamily: "'Open Sans', sans-serif", outline: 'none',
                }}
              />
            </div>
          </div>
          {/* Wallet list */}
          <div style={{ overflowY: 'auto', maxHeight: 240 }}>
            {filteredWallets.map((wallet) => (
              <WalletRow
                key={wallet.id}
                wallet={wallet}
                selected={data.wallet === wallet.id}
                onSelect={() => {
                  updateData({ wallet: wallet.id });
                  setWalletDropdownOpen(false);
                  setWalletSearch('');
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WalletRow({ wallet, selected, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none',
        background: selected ? 'var(--osmos-brand-primary-muted)' : hov ? 'var(--osmos-bg-subtle)' : 'transparent',
        cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--osmos-fg)' }}>
        {wallet.name} (${wallet.balance.toLocaleString()})
      </div>
      <div style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>
        Promotion Balance ${wallet.promoBalance.toLocaleString()}
      </div>
    </button>
  );
}
