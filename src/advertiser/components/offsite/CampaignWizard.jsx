import { useState, useEffect } from 'react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT         = "'Open Sans', sans-serif";
const BLUE         = '#1970E1';
const BLUE_BG      = '#E8F1FC';
const BLUE_LIGHT   = '#F0F6FF';
const GREY_TEXT    = '#404040';
const GREY_MID     = '#7B7B7B';
const GREY_BORDER  = '#DEDEDE';
const GREY_SURF    = '#FAFAFA';
const GREY_SURF2   = '#EFEFEF';
const GREY_DIS     = '#CCCCCC';
const SIDEBAR_DARK = '#455A64';
const TBL_BORDER   = '#EDF0F5';

// ── Channel display names ─────────────────────────────────────────────────────
const CHANNEL_NAMES = {
  meta: 'Meta Ads', google: 'Google Ads', tiktok: 'TikTok Ads',
  snapchat: 'Snapchat Ads', youtube: 'YouTube Ads', dv360: 'DV360 Ads',
};

// ── Step configs ──────────────────────────────────────────────────────────────
// Sales: Product Selection → Targeting → Ads Upload → Config (4 steps)
// All other objectives (awareness, reach, traffic, engagement, leads): 3 steps
function getSteps(objective) {
  if (objective === 'sales') {
    return [
      { num: 1, key: 'product',    label: 'Product Selection' },
      { num: 2, key: 'targeting',  label: 'Targeting' },
      { num: 3, key: 'ads-upload', label: 'Ads Upload' },
      { num: 4, key: 'config',     label: 'Config' },
    ];
  }
  // awareness, reach, traffic, engagement, leads → 3 steps
  return [
    { num: 1, key: 'targeting',  label: 'Targeting' },
    { num: 2, key: 'ads-upload', label: 'Ads Upload' },
    { num: 3, key: 'config',     label: 'Config' },
  ];
}

// ── Mock product data (45 products — used by Manual Selection) ───────────────
const ALL_PRODUCTS = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: 'Ben & Jerrys Ice Cream Strawber...',
  brand: 'Whitakers',
  category: 'Frozen > Frozen Desserts > Ice Cream',
  availability: 'In Stock',
  price: '$10',
  salePrice: '$10',
}));

const PRODUCT_IMG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23c7d8f5" rx="4"/><text x="50%25" y="58%25" font-size="18" text-anchor="middle" dominant-baseline="middle">🍦</text></svg>';

// ── Preview products — All Products panel (matches Figma) ─────────────────────
const PREVIEW_PRODUCTS = [
  { id: 1,  name: 'Classic Vanilla Drumstick Delight',  cats: 'Dairy & Eggs > Yogurt > Icelandic',          brand: 'Nestle',        price: '$5.75', inStock: true  },
  { id: 2,  name: 'Chocolate Chip Ice Cream',           cats: 'Dairy & Eggs > Ice Cream > Premium',          brand: "Ben & Jerry's", price: '$6.25', inStock: true  },
  { id: 3,  name: 'Yogurt Almond Milk',                 cats: 'Dairy & Eggs > Yogurt > Non-Dairy',           brand: 'Silk',          price: '$4.25', inStock: true  },
  { id: 4,  name: 'Strawberry Ice Cream',               cats: 'Dairy & Eggs > Ice Cream > Gourmet',          brand: 'Haagen-Dazs',   price: '$7.50', inStock: true  },
  { id: 5,  name: 'Honey-Infused Greek Yogurt',         cats: 'Dairy & Eggs > Yogurt > Greek',               brand: 'FAGE',          price: '$4.75', inStock: true  },
  { id: 6,  name: 'Chocolate Mint Chips',               cats: 'Dairy & Eggs > Ice Cream > Classic',          brand: 'Breyers',       price: '$5.25', inStock: false },
  { id: 7,  name: 'Yogurt with Vanilla Bean',           cats: 'Dairy & Eggs > Yogurt > Regular',             brand: 'Chobani',       price: '$3.75', inStock: true  },
  { id: 8,  name: 'Ice Cream with Pistachio Nuts',      cats: 'Dairy & Eggs > Ice Cream > Traditional',      brand: 'Talenti',       price: '$6.75', inStock: true  },
  { id: 9,  name: 'Greek Yogurt with Honey',            cats: 'Dairy & Eggs > Yogurt > Greek',               brand: 'Oikos',         price: '$4.50', inStock: true  },
  { id: 10, name: 'Frozen Yogurt Mango Swirl',          cats: 'Dairy & Eggs > Frozen Desserts > Yogurt',     brand: 'TCBY',          price: '$5.00', inStock: true  },
  { id: 11, name: 'Salted Caramel Ice Cream Pint',      cats: 'Dairy & Eggs > Ice Cream > Premium',          brand: 'Jeni\'s',       price: '$8.25', inStock: true  },
  { id: 12, name: 'Low-Fat Blueberry Yogurt',           cats: 'Dairy & Eggs > Yogurt > Low-Fat',             brand: 'Stonyfield',    price: '$3.25', inStock: true  },
  { id: 13, name: 'Coconut Milk Ice Cream',             cats: 'Dairy & Eggs > Ice Cream > Non-Dairy',        brand: 'So Delicious',  price: '$6.00', inStock: false },
  { id: 14, name: 'Peach Melba Gelato',                 cats: 'Dairy & Eggs > Frozen Desserts > Gelato',     brand: 'Ciao Bella',    price: '$7.00', inStock: true  },
  { id: 15, name: 'Vanilla Bean Greek Yogurt',          cats: 'Dairy & Eggs > Yogurt > Greek',               brand: 'Siggi\'s',      price: '$4.00', inStock: true  },
];

// ── CampaignWizard ────────────────────────────────────────────────────────────
export function CampaignWizard({ open, onClose, onBack, campaignInfo }) {
  const objective = campaignInfo?.objective || 'awareness';
  const steps     = getSteps(objective);

  const [step, setStep]               = useState(1);
  // Product Selection
  const [selectionMode, setSelectionMode]       = useState('dynamic');
  const [conditions, setConditions]             = useState([{ id: 1, type: '', condition: '', value: '' }]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [addProductsOpen, setAddProductsOpen]   = useState(false);
  const [addProductsSearch, setAddProductsSearch] = useState('');
  const [addSelection, setAddSelection]         = useState(new Set());
  // Targeting — state is managed internally by StepTargeting
  // Ads Upload
  const [adFormat, setAdFormat]   = useState('image-carousel');
  const [ads, setAds]             = useState([]);
  const [newAdOpen, setNewAdOpen] = useState(false);
  // Config
  const [config, setConfig] = useState({
    budgetType: 'daily',
    startDate: '08 May 25', endDate: '14 May 25',
    dailyBudget: '', totalSpendCap: '',
    wallet: 'Default Wallet',
    cpm: '$100',
    customAttribution: false,
    frequencyCaps: false,
  });
  // Success flash
  const [launched, setLaunched] = useState(false);

  // ── Reset to step 1 every time the wizard is freshly opened ──────────────────
  useEffect(() => {
    if (open) {
      setStep(1);
      setLaunched(false);
      setSelectionMode('dynamic');
      setConditions([{ id: 1, type: '', condition: '', value: '' }]);
      setSelectedProducts([]);
      const firstFmt = getAdFormats(campaignInfo?.channel)?.[0]?.id || 'image-carousel';
      setAdFormat(firstFmt);
      setAds([]);
      setNewAdOpen(false);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const channelName  = CHANNEL_NAMES[campaignInfo?.channel] || 'Campaign';
  const campaignName = campaignInfo?.campaignName || 'New Campaign';
  const currentStep  = steps[step - 1];
  const isLastStep   = step === steps.length;

  const canAdvance = () => {
    if (currentStep.key === 'product') {
      if (selectionMode === 'dynamic')
        return conditions.some(c => c.type && c.condition && c.value);
      return selectedProducts.length > 0;
    }
    return true;
  };

  const handleBack = () => {
    if (step === 1) {
      onBack?.();
    } else {
      setStep(s => s - 1);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      setLaunched(true);
      return;
    }
    setStep(s => s + 1);
  };

  // Add products from sub-drawer
  const handleAddProducts = () => {
    const newProducts = Array.from(addSelection).map(id =>
      ALL_PRODUCTS.find(p => p.id === id)
    ).filter(Boolean);
    setSelectedProducts(newProducts);
    setAddProductsOpen(false);
    setAddSelection(new Set());
    setAddProductsSearch('');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      display: 'flex', fontFamily: FONT,
    }}>
      {/* Dark left strip (backdrop simulation) */}
      <div style={{ width: 130, background: 'rgba(60,60,60,0.88)', flexShrink: 0 }} />

      {/* Wizard panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'white', overflow: 'hidden', position: 'relative',
      }}>

        {/* ── Success flash overlay ───────────────────────────────────── */}
        {launched && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16, fontFamily: FONT,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#E6F4EA',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: GREY_TEXT, marginBottom: 6 }}>
                Campaign Created!
              </div>
              <div style={{ fontSize: 13, color: GREY_MID }}>
                <strong style={{ color: GREY_TEXT }}>{campaignName}</strong> via {channelName || 'your channel'} is pending review.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button
                onClick={() => { setLaunched(false); onClose(); }}
                style={{
                  padding: '8px 20px', borderRadius: 6,
                  border: `1px solid ${GREY_BORDER}`, background: 'white',
                  fontSize: 13, fontWeight: 600, color: GREY_TEXT,
                  cursor: 'pointer', fontFamily: FONT,
                }}
              >
                Back to Campaigns
              </button>
              <button
                onClick={() => { setLaunched(false); onClose(); }}
                style={{
                  padding: '8px 20px', borderRadius: 6,
                  border: 'none', background: BLUE,
                  fontSize: 13, fontWeight: 600, color: 'white',
                  cursor: 'pointer', fontFamily: FONT,
                }}
              >
                View Campaign
              </button>
            </div>
          </div>
        )}

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{
          background: BLUE_BG, padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${GREY_BORDER}`, flexShrink: 0,
        }}>
          {/* Left: channel label + campaign name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: GREY_MID, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {channelName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: GREY_TEXT }}>{campaignName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', flexShrink: 0 }}>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
          </div>
          {/* Right: help + close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>How to create and modify a campaign ?</span>
            </div>
            <button onClick={onClose} style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: GREY_MID, padding: 4, borderRadius: 4,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Step tabs (pill style matching Figma) ──────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '10px 20px', gap: 6, background: 'white',
          borderBottom: `1px solid ${GREY_BORDER}`,
          flexShrink: 0,
        }}>
          {steps.map((s, idx) => {
            const isActive    = s.num === step;
            const isCompleted = s.num < step;
            const isInactive  = s.num > step;
            return (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => isCompleted && setStep(s.num)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 14px 6px 8px',
                    borderRadius: 20,
                    background: isActive ? BLUE_BG : 'transparent',
                    border: 'none',
                    cursor: isCompleted ? 'pointer' : 'default',
                  }}
                >
                  {/* Step circle */}
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isInactive ? GREY_DIS : BLUE,
                    fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                  }}>
                    {isCompleted ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : s.num}
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                    color: isActive ? BLUE : isCompleted ? GREY_TEXT : GREY_DIS,
                  }}>
                    {s.label}
                  </span>
                </button>
                {/* Separator dot between steps */}
                {idx < steps.length - 1 && (
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: GREY_DIS, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Main content */}
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {currentStep.key === 'product' && (
              <StepProductSelection
                selectionMode={selectionMode}
                setSelectionMode={setSelectionMode}
                conditions={conditions}
                setConditions={setConditions}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                onOpenAddProducts={() => setAddProductsOpen(true)}
              />
            )}
            {currentStep.key === 'targeting' && <StepTargeting />}
            {currentStep.key === 'ads-upload' && (
              <StepAdsUpload
                channel={campaignInfo?.channel}
                adFormat={adFormat}
                setAdFormat={setAdFormat}
                ads={ads}
                onNewAdClick={() => setNewAdOpen(true)}
              />
            )}
            {currentStep.key === 'config' && (
              <StepConfig config={config} setConfig={setConfig} />
            )}
          </div>

          {/* Campaign Summary sidebar — shown on all steps except product */}
          {currentStep.key !== 'product' && (
            <CampaignSummarySidebar
              steps={steps}
              currentStep={step}
            />
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div style={{
          padding: '14px 20px',
          background: BLUE_BG,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, flexShrink: 0,
        }}>
          {/* Left group: Cancel + inline hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
            <button onClick={onClose} style={{
              padding: '9px 22px', borderRadius: 8, height: 40,
              border: `1px solid ${BLUE}`, background: 'white',
              color: BLUE, fontSize: 14, fontWeight: 600,
              fontFamily: FONT, cursor: 'pointer',
            }}>
              Cancel
            </button>
            {!canAdvance() && currentStep.key === 'product' && (
              <span style={{ fontSize: 12, color: GREY_MID }}>
                Select products to continue
              </span>
            )}
          </div>

          {/* Right group: Back + Next/Save */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleBack}
              style={{
                padding: '9px 22px', borderRadius: 8, height: 40,
                border: `1px solid ${BLUE}`, background: 'white',
                color: BLUE, fontSize: 14, fontWeight: 600,
                fontFamily: FONT, cursor: 'pointer',
              }}
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canAdvance()}
              style={{
                padding: '9px 22px', borderRadius: 8, height: 40, border: 'none',
                background: canAdvance() ? BLUE : GREY_DIS,
                color: 'white', fontSize: 14, fontWeight: 600,
                fontFamily: FONT, cursor: canAdvance() ? 'pointer' : 'not-allowed',
              }}
            >
              {isLastStep ? 'Save' : 'Next'}
            </button>
          </div>
        </div>

        {/* ── Add Products overlay ────────────────────────────────────── */}
        {addProductsOpen && (
          <AddProductsOverlay
            channelName={channelName}
            search={addProductsSearch}
            setSearch={setAddProductsSearch}
            selection={addSelection}
            setSelection={setAddSelection}
            onAdd={handleAddProducts}
            onClose={() => {
              setAddProductsOpen(false);
              setAddSelection(new Set());
              setAddProductsSearch('');
            }}
          />
        )}

        {/* ── Create New Ad overlay ───────────────────────────────────── */}
        {newAdOpen && (
          <CreateNewAdOverlay
            channelName={channelName}
            channel={campaignInfo?.channel}
            adFormatId={adFormat}
            onClose={() => setNewAdOpen(false)}
            onSave={(newAd) => {
              setAds(prev => [...prev, { id: Date.now(), ...newAd }]);
              setNewAdOpen(false);
            }}
          />
        )}

      </div>
    </div>
  );
}

// ── Step 1 (sales) / not used (others): Product Selection ────────────────────
function StepProductSelection({
  selectionMode, setSelectionMode,
  conditions, setConditions,
  selectedProducts, setSelectedProducts,
  onOpenAddProducts,
}) {
  const [search, setSearch] = useState('');

  const filteredProducts = PREVIEW_PRODUCTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (id) => selectedProducts.some(p => p.id === id);

  const toggleProduct = (id) => {
    if (isSelected(id)) {
      setSelectedProducts(prev => prev.filter(p => p.id !== id));
    } else {
      const product = PREVIEW_PRODUCTS.find(p => p.id === id);
      if (product) setSelectedProducts(prev => [...prev, product]);
    }
  };

  const allChecked = filteredProducts.length > 0 &&
    filteredProducts.every(p => isSelected(p.id));

  const toggleAll = () => {
    if (allChecked) {
      const filteredIds = new Set(filteredProducts.map(p => p.id));
      setSelectedProducts(prev => prev.filter(p => !filteredIds.has(p.id)));
    } else {
      const newOnes = filteredProducts.filter(p => !isSelected(p.id));
      setSelectedProducts(prev => [...prev, ...newOnes]);
    }
  };

  const addCondition = () =>
    setConditions(c => [...c, { id: Date.now(), type: '', condition: '', value: '' }]);
  const removeCondition = (id) =>
    setConditions(c => c.length > 1 ? c.filter(r => r.id !== id) : c);
  const updateCondition = (id, field, value) =>
    setConditions(c => c.map(r => r.id === id ? { ...r, [field]: value } : r));

  const dropStyle = {
    height: 36, border: `1px solid ${GREY_BORDER}`, borderRadius: 6,
    padding: '0 10px', fontSize: 13, fontFamily: FONT, color: GREY_MID,
    background: 'white', outline: 'none', cursor: 'pointer',
    appearance: 'none', WebkitAppearance: 'none', flex: 1, minWidth: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237B7B7B' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    paddingRight: 32,
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>

      {/* ── Mode toggle ── */}
      <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['dynamic', 'Dynamic Selection'], ['manual', 'Manual Selection']].map(([mode, label]) => {
            const on = selectionMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setSelectionMode(mode)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 14px', borderRadius: 6,
                  border: on ? `1.5px solid ${BLUE}` : `1px solid ${GREY_BORDER}`,
                  background: on ? BLUE_BG : 'white',
                  cursor: 'pointer', fontFamily: FONT, transition: 'all 0.12s',
                }}
              >
                <div style={{
                  width: 15, height: 15, borderRadius: '50%', flexShrink: 0,
                  border: on ? `5px solid ${BLUE}` : `1.5px solid ${GREY_BORDER}`,
                  background: 'white', boxSizing: 'border-box', transition: 'all 0.12s',
                }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: on ? BLUE : GREY_TEXT }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Split body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', marginTop: 14, minHeight: 0 }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 20px', minWidth: 0 }}>

          {selectionMode === 'dynamic' ? (
            /* Dynamic: condition builder */
            <div style={{
              border: `1.5px solid ${BLUE}`, borderRadius: 8, padding: '16px 16px 14px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT, marginBottom: 14 }}>
                Define condition to select products
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {conditions.map((row) => (
                  <div key={row.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      value={row.type}
                      onChange={e => updateCondition(row.id, 'type', e.target.value)}
                      style={dropStyle}
                    >
                      <option value="">Select Type</option>
                      <option value="brand">Brand</option>
                      <option value="category">Category</option>
                      <option value="availability">Availability</option>
                      <option value="price">Price</option>
                    </select>
                    <select
                      value={row.condition}
                      onChange={e => updateCondition(row.id, 'condition', e.target.value)}
                      style={dropStyle}
                    >
                      <option value="">Select Condition</option>
                      <option value="is">Is</option>
                      <option value="is_not">Is Not</option>
                      <option value="contains">Contains</option>
                      <option value="greater_than">Greater Than</option>
                      <option value="less_than">Less Than</option>
                    </select>
                    <select
                      value={row.value}
                      onChange={e => updateCondition(row.id, 'value', e.target.value)}
                      style={dropStyle}
                    >
                      <option value="">Select Value</option>
                      <option value="nestle">Nestle</option>
                      <option value="ben_jerrys">Ben &amp; Jerry's</option>
                      <option value="haagen_dazs">Haagen-Dazs</option>
                      <option value="in_stock">In Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                      <option value="dairy_eggs">Dairy &amp; Eggs</option>
                    </select>
                    {conditions.length > 1 && (
                      <button
                        onClick={() => removeCondition(row.id)}
                        style={{
                          border: 'none', background: 'transparent', cursor: 'pointer',
                          color: GREY_MID, padding: 4, display: 'flex', alignItems: 'center', flexShrink: 0,
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addCondition}
                style={{
                  marginTop: 14, border: 'none', background: 'transparent',
                  color: BLUE, fontSize: 13, fontWeight: 600, fontFamily: FONT,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add More
              </button>
            </div>
          ) : (
            /* Manual: Sofie banner + product table */
            <>
              {/* Sofie AI suggestion banner */}
              <div style={{
                background: '#F3EFFF', border: '1px solid #D8CEFF',
                borderRadius: 8, padding: '12px 14px', marginBottom: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 9 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
                    <path d="M5 3v4"/><path d="M19 17v4"/>
                    <path d="M3 5h4"/><path d="M17 19h4"/>
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#5B2EBF' }}>Sofie Suggested Products</span>
                </div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {['Top Performing Products', 'High Potential Products', 'High ROI Products', 'Trending Products'].map(chip => (
                    <button key={chip} style={{
                      padding: '3px 11px', borderRadius: 20,
                      border: '1px solid #C4AEFF', background: 'white',
                      fontSize: 11, fontWeight: 500, color: '#5B2EBF',
                      fontFamily: FONT, cursor: 'pointer',
                    }}>
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT }}>
                  All Products ({PREVIEW_PRODUCTS.length})
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 10px', borderRadius: 6,
                    border: `1px solid ${GREY_BORDER}`, background: 'white',
                    fontSize: 12, fontWeight: 600, color: GREY_TEXT, fontFamily: FONT, cursor: 'pointer',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                    </svg>
                    Bulk Upload
                  </button>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    border: `1px solid ${GREY_BORDER}`, borderRadius: 6, padding: '5px 10px', width: 160,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search product"
                      style={{ border: 'none', outline: 'none', fontSize: 12, fontFamily: FONT, color: GREY_TEXT, flex: 1, minWidth: 0 }}
                    />
                  </div>
                </div>
              </div>

              {/* Filter chip */}
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 11px', borderRadius: 20, marginBottom: 12,
                border: `1px solid ${GREY_BORDER}`, background: 'white',
                fontSize: 12, fontWeight: 500, color: GREY_TEXT, fontFamily: FONT, cursor: 'pointer',
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add a Filter
              </button>

              {/* Product table */}
              <div style={{ border: `1px solid ${GREY_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
                  <thead>
                    <tr style={{ background: GREY_SURF, borderBottom: `1px solid ${TBL_BORDER}` }}>
                      <th style={thStyle('center', 44)}>
                        <WizardCheckbox checked={allChecked} onChange={toggleAll} />
                      </th>
                      <th style={thStyle('left')}>Product Name</th>
                      <th style={thStyle('left', 80)}>Brand</th>
                      <th style={thStyle('left', 100)}>Category</th>
                      <th style={thStyle('left', 90)}>Availability</th>
                      <th style={thStyle('right', 65)}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => {
                      const checked = isSelected(p.id);
                      return (
                        <tr key={p.id} onClick={() => toggleProduct(p.id)} style={{
                          background: checked ? BLUE_LIGHT : 'white',
                          borderBottom: `1px solid ${TBL_BORDER}`,
                          cursor: 'pointer', transition: 'background 0.1s',
                        }}>
                          <td style={tdStyle('center')}>
                            <WizardCheckbox checked={checked} onChange={() => toggleProduct(p.id)} />
                          </td>
                          <td style={{ ...tdStyle('left'), padding: '8px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                              <img src={PRODUCT_IMG} alt="" width="34" height="34" style={{ borderRadius: 4, flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 500, color: GREY_TEXT }}>{p.name}</div>
                                <div style={{ fontSize: 10, color: GREY_MID, marginTop: 1 }}>{p.cats}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ ...tdStyle('left'), fontSize: 12 }}>{p.brand}</td>
                          <td style={{ ...tdStyle('left'), fontSize: 12 }}>{p.cats.split(' > ')[0]}</td>
                          <td style={tdStyle('left')}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: p.inStock ? '#2E7D32' : '#C62828' }}>
                              {p.inStock ? 'in stock' : 'out of stock'}
                            </span>
                          </td>
                          <td style={{ ...tdStyle('right'), fontSize: 13, fontWeight: 500 }}>{p.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          width: 238, borderLeft: `1px solid ${GREY_BORDER}`,
          display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
        }}>
          {/* Panel header */}
          <div style={{
            padding: '14px 14px 10px', borderBottom: `1px solid ${GREY_BORDER}`, flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: GREY_TEXT }}>
              {selectionMode === 'dynamic' ? 'All Products' : 'Selected Products'}{' '}
              <span style={{ color: GREY_MID, fontWeight: 400 }}>
                ({selectionMode === 'dynamic' ? 100 : selectedProducts.length})
              </span>
            </span>
          </div>

          {selectionMode === 'dynamic' ? (
            /* All Products cards */
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PREVIEW_PRODUCTS.map(p => (
                <div key={p.id} style={{
                  border: `1px solid ${GREY_BORDER}`, borderRadius: 7, padding: '9px 10px',
                  display: 'flex', gap: 8, background: 'white',
                }}>
                  <img src={PRODUCT_IMG} alt="" width="40" height="40" style={{ borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 600, color: GREY_TEXT, lineHeight: '1.3',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      marginBottom: 2,
                    }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 10, color: GREY_MID, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.cats}
                    </div>
                    <div style={{ fontSize: 10, color: GREY_MID }}>{p.brand}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: GREY_TEXT }}>{p.price}</span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: p.inStock ? '#2E7D32' : '#C62828' }}>
                        {p.inStock ? 'in stock' : 'out of stock'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedProducts.length === 0 ? (
            /* Empty selected state */
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '20px 16px', textAlign: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GREY_DIS} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREY_MID }}>No products selected yet</div>
              <div style={{ fontSize: 11, color: GREY_DIS, marginTop: 5, lineHeight: 1.5, padding: '0 16px' }}>
                Add products from the table to include them in this campaign.
              </div>
            </div>
          ) : (
            /* Selected products list */
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {selectedProducts.map(p => (
                <div key={p.id} style={{
                  border: `1px solid #C5D9F5`, borderRadius: 7, padding: '9px 10px',
                  display: 'flex', alignItems: 'center', gap: 8, background: BLUE_LIGHT,
                }}>
                  <img src={PRODUCT_IMG} alt="" width="34" height="34" style={{ borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 600, color: GREY_TEXT, lineHeight: '1.3',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>
                      {p.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: p.inStock ? '#2E7D32' : '#C62828' }}>
                        {p.inStock ? 'in stock' : 'out of stock'}
                      </span>
                      <span style={{ fontSize: 10, color: GREY_MID }}>· {p.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleProduct(p.id); }}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: GREY_MID, padding: 2, display: 'flex', flexShrink: 0 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mock audience segments data ───────────────────────────────────────────────
const MOCK_SEGMENTS = [
  { id: 1, name: 'Highest Spending Audience', reach: '4,300,000', premium: '10%', sofie: true,  metaAudience: false },
  { id: 2, name: 'Loyal Customers',           reach: '4,300,000', premium: '20%', sofie: true,  metaAudience: false },
  { id: 3, name: 'Recent Purchasers',         reach: '800,000',   premium: '25%', sofie: false, metaAudience: false },
  { id: 4, name: 'Gpay Customers',            reach: '1,800,000', premium: '10%', sofie: false, metaAudience: true  },
  { id: 5, name: 'Target Group Delta',        reach: '1,800,000', premium: '10%', sofie: false, metaAudience: false },
  { id: 6, name: 'Target Group Zeta',         reach: '8,300,000', premium: null,  sofie: false, metaAudience: false },
];

// ── Step: Targeting ───────────────────────────────────────────────────────────
function StepTargeting() {
  const [ageFrom, setAgeFrom]             = useState('18');
  const [ageTo, setAgeTo]                 = useState('60');
  const [gender, setGender]               = useState('All');
  const [language, setLanguage]           = useState('English');
  const [geoLocation, setGeoLocation]     = useState('All Locations');
  const [placementAuto, setPlacementAuto] = useState(true);
  const [audienceOpen, setAudienceOpen]   = useState(false);

  const dropStyle = {
    height: 36, border: `1px solid ${GREY_BORDER}`, borderRadius: 6,
    padding: '0 30px 0 10px', fontSize: 13, fontFamily: FONT, color: GREY_TEXT,
    background: 'white', outline: 'none', cursor: 'pointer',
    appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237B7B7B' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
  };

  const FieldRow = ({ label, children }) => (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '16px 28px',
      borderBottom: `1px solid ${GREY_BORDER}`,
    }}>
      <div style={{ width: 160, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>{label}</span>
        <span style={{ color: '#C62828', fontSize: 14 }}>*</span>
        <InfoIcon />
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>

      {/* Age */}
      <FieldRow label="Age">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={ageFrom} onChange={e => setAgeFrom(e.target.value)} style={{ ...dropStyle, width: 85 }}>
            {['13','18','21','25','30','35','40','45','50','55','60','65','70'].map(a => <option key={a}>{a}</option>)}
          </select>
          <span style={{ fontSize: 13, color: GREY_MID, fontWeight: 500 }}>To</span>
          <select value={ageTo} onChange={e => setAgeTo(e.target.value)} style={{ ...dropStyle, width: 85 }}>
            {['18','21','25','30','35','40','45','50','55','60','65','70','75','80'].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
      </FieldRow>

      {/* Gender */}
      <FieldRow label="Gender">
        <select value={gender} onChange={e => setGender(e.target.value)} style={{ ...dropStyle, width: 180 }}>
          {['All','Male','Female','Non-binary'].map(g => <option key={g}>{g}</option>)}
        </select>
      </FieldRow>

      {/* Language */}
      <FieldRow label="Language">
        <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...dropStyle, width: 180 }}>
          {['English','Spanish','French','German','Portuguese','Arabic','Hindi','Japanese','Chinese'].map(l => <option key={l}>{l}</option>)}
        </select>
      </FieldRow>

      {/* Geo Location */}
      <FieldRow label="Geo Location">
        <select value={geoLocation} onChange={e => setGeoLocation(e.target.value)} style={{ ...dropStyle, width: 210 }}>
          {['All Locations','United States','United Kingdom','Canada','Australia','India','Germany','France','Brazil','Japan'].map(g => <option key={g}>{g}</option>)}
        </select>
      </FieldRow>

      {/* Ad Placement */}
      <div style={{ padding: '16px 28px', borderBottom: `1px solid ${GREY_BORDER}` }}>
        <div style={{
          border: `1px solid ${GREY_BORDER}`, borderRadius: 8,
          padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16,
          background: GREY_SURF,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>Ad Placement</span>
            <span style={{ color: '#C62828', fontSize: 14 }}>*</span>
            <InfoIcon />
          </div>
          <div
            onClick={() => setPlacementAuto(v => !v)}
            style={{
              width: 42, height: 24, borderRadius: 12, cursor: 'pointer',
              background: placementAuto ? '#22C55E' : GREY_DIS,
              position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: 'white',
              position: 'absolute', top: 3, transition: 'left 0.2s',
              left: placementAuto ? 21 : 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          {placementAuto && (
            <span style={{
              fontSize: 12, fontWeight: 700, color: '#16A34A',
              border: '1px solid #22C55E', borderRadius: 4, padding: '2px 10px',
            }}>Auto</span>
          )}
        </div>
      </div>

      {/* Audience Segment — inline accordion */}
      <div style={{ padding: '16px 28px' }}>
        {/* Accordion header */}
        <div
          onClick={() => setAudienceOpen(v => !v)}
          style={{
            border: `1px solid ${GREY_BORDER}`, borderRadius: audienceOpen ? '8px 8px 0 0' : 8,
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', background: 'white', gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>Audience Segment</span>
            </div>
            <p style={{ fontSize: 12, color: GREY_MID, margin: 0, lineHeight: 1.5 }}>
              Create audience segment using 1st party audience data. The highest premium among the selected audience segments will be applied.
            </p>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={GREY_MID} strokeWidth="2" strokeLinecap="round"
            style={{ flexShrink: 0, transform: audienceOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>

        {/* Expanded content */}
        {audienceOpen && (
          <div style={{
            border: `1px solid ${GREY_BORDER}`, borderTop: 'none',
            borderRadius: '0 0 8px 8px', background: '#FAFAFA',
            padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <AudienceSegmentCard type="include" />
            <AudienceSegmentCard type="exclude" />
          </div>
        )}
      </div>

    </div>
  );
}

// ── Audience Segment Card (Include / Exclude) ─────────────────────────────────
function AudienceSegmentCard({ type }) {
  const isInclude = type === 'include';
  const accentColor = isInclude ? '#16A34A' : '#DC2626';
  const accentBg    = isInclude ? '#F0FDF4' : '#FEF2F2';
  const accentBorder = isInclude ? '#86EFAC' : '#FCA5A5';
  const placeholder = isInclude
    ? 'Search Audience Segment to Include'
    : 'Search Audience Segment to Exclude';

  const [search, setSearch]         = useState('');
  const [dropOpen, setDropOpen]     = useState(false);
  const [checked, setChecked]       = useState(new Set());
  const [selected, setSelected]     = useState([]); // applied segments as pills

  const SOFIE_COLOR  = '#7C3AED';
  const SOFIE_BG     = '#F5F3FF';

  const filtered = search
    ? MOCK_SEGMENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    : MOCK_SEGMENTS;

  const toggle = (id) => {
    setChecked(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleInclude = () => {
    const toAdd = Array.from(checked)
      .filter(id => !selected.find(s => s.id === id))
      .map(id => MOCK_SEGMENTS.find(s => s.id === id))
      .filter(Boolean);
    setSelected(prev => [...prev, ...toAdd]);
    setChecked(new Set());
    setSearch('');
    setDropOpen(false);
  };

  const removePill = (id) => setSelected(prev => prev.filter(s => s.id !== id));

  return (
    <div style={{
      border: `1px solid ${accentBorder}`, borderRadius: 8,
      background: 'white', overflow: 'visible',
    }}>
      {/* Card header */}
      <div style={{
        background: accentColor, borderRadius: '7px 7px 0 0',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          {isInclude
            ? <><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></>
            : <><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="10" y1="15" x2="14" y2="15"/></>
          }
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
          {isInclude ? 'Include Audience Segments' : 'Exclude Audience Segments'}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px' }}>

        {/* Search input + dropdown trigger */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <div
            onClick={() => setDropOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1px solid ${GREY_BORDER}`, borderRadius: 6,
              padding: '0 10px', height: 38, cursor: 'pointer', background: 'white',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setDropOpen(true); }}
              onClick={e => { e.stopPropagation(); setDropOpen(true); }}
              placeholder={placeholder}
              style={{
                flex: 1, border: 'none', outline: 'none', fontSize: 13,
                fontFamily: FONT, color: GREY_TEXT, background: 'transparent',
              }}
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Dropdown */}
          {dropOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
              background: 'white', border: `1px solid ${GREY_BORDER}`,
              borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              overflow: 'hidden',
            }}>
              {filtered.map(seg => (
                <div
                  key={seg.id}
                  onClick={() => toggle(seg.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', cursor: 'pointer',
                    background: seg.sofie ? SOFIE_BG : 'white',
                    borderBottom: `1px solid ${GREY_BORDER}`,
                  }}
                >
                  {/* Checkbox */}
                  <div style={{
                    width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                    border: `1.5px solid ${checked.has(seg.id) ? BLUE : GREY_BORDER}`,
                    background: checked.has(seg.id) ? BLUE : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {checked.has(seg.id) && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>

                  {/* Segment info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT }}>{seg.name}</span>
                      {seg.sofie && (
                        <span style={{
                          display: 'flex', alignItems: 'center', gap: 3,
                          fontSize: 11, fontWeight: 600, color: SOFIE_COLOR,
                          background: SOFIE_BG, border: `1px solid ${SOFIE_COLOR}`,
                          borderRadius: 4, padding: '1px 6px',
                        }}>
                          <span style={{ fontSize: 10 }}>✦</span> Sofie's Recommended
                        </span>
                      )}
                      {seg.metaAudience && (
                        <span style={{
                          fontSize: 11, fontWeight: 600, color: GREY_MID,
                          background: '#F3F4F6', border: `1px solid ${GREY_BORDER}`,
                          borderRadius: 4, padding: '1px 6px',
                        }}>
                          Meta Audience
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: GREY_MID, marginTop: 2 }}>
                      Estimated reach: {seg.reach}
                      {seg.premium && (
                        <> | <strong style={{ color: GREY_TEXT }}>{seg.premium}</strong> premium on eCPM</>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderTop: `1px solid ${GREY_BORDER}`,
                background: GREY_SURF,
              }}>
                <span style={{ fontSize: 12, color: GREY_MID }}>
                  Audience Segment Selected: <strong style={{ color: GREY_TEXT }}>{checked.size}</strong>
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleInclude(); }}
                  disabled={checked.size === 0}
                  style={{
                    padding: '6px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    border: `1.5px solid ${checked.size === 0 ? GREY_DIS : BLUE}`,
                    color: checked.size === 0 ? GREY_DIS : BLUE,
                    background: 'white', cursor: checked.size === 0 ? 'default' : 'pointer',
                    fontFamily: FONT,
                  }}
                >
                  {isInclude ? 'Include' : 'Exclude'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Applied pills */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {selected.map(seg => (
              <div key={seg.id} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                border: `1px solid ${accentColor}`, borderRadius: 20,
                padding: '4px 10px', background: accentBg, fontSize: 12, fontWeight: 600, color: accentColor,
              }}>
                <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {seg.name.length > 22 ? seg.name.slice(0, 22) + '…' : seg.name}
                </span>
                {seg.premium && <span>+{seg.premium}</span>}
                <button
                  onClick={() => removePill(seg.id)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: accentColor, padding: 0, lineHeight: 1, fontSize: 14 }}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// ── Per-channel ad formats (text-only, grouped) ────────────────────────────────
// Each entry is either { id, label } (flat item) or { groupLabel, items: [...] } (group header).
function getAdFormats(channel) {
  const fmts = {
    meta: [
      { id: 'image-carousel', label: 'Image/Carousel Ad' },
      { id: 'video',          label: 'Video Ad'          },
      { id: 'collection',     label: 'Collection Ad'     },
    ],
    google: [
      { groupLabel: 'Auction Campaign', items: [
        { id: 'display-carousel', label: 'Display Carousel Ad' },
        { id: 'display-banner',   label: 'Display Banner Ad'   },
        { id: 'display',          label: 'Display Ad'          },
      ]},
    ],
    tiktok: [
      { id: 'in-feed-video', label: 'In-Feed Video' },
      { id: 'spark-ad',      label: 'Spark Ad'      },
      { id: 'topview',       label: 'TopView'        },
    ],
    snapchat: [
      { id: 'snap-ad',    label: 'Snap Ad'       },
      { id: 'story-ad',   label: 'Story Ad'      },
      { id: 'collection', label: 'Collection Ad' },
    ],
    youtube: [
      { id: 'youtube-partners', label: 'YouTube & Partners' },
      { id: 'audio',            label: 'Audio'              },
    ],
    dv360: [
      { groupLabel: 'Upload', items: [
        { id: 'upload-display',  label: 'Display Ad'          },
        { id: 'upload-video',    label: 'Video Ad'            },
        { id: 'upload-yt',       label: 'YouTube & Partners'  },
        { id: 'upload-audio',    label: 'Audio'               },
      ]},
      { groupLabel: 'Third Party', items: [
        { id: 'third-display',   label: 'Display Ad'  },
        { id: 'third-video',     label: 'Video Ad'    },
        { id: 'third-audio',     label: 'Audio'       },
      ]},
    ],
  };
  return fmts[channel] || fmts.meta;
}

// Flatten grouped formats to a plain list for iteration in non-list contexts
function flattenFormats(formats) {
  return formats.flatMap(f => f.groupLabel ? f.items : [f]);
}

// ── Ads Upload ─────────────────────────────────────────────────────────────────
function StepAdsUpload({ channel, adFormat, setAdFormat, ads, onNewAdClick }) {
  const formats = getAdFormats(channel);
  const flatFormats = flattenFormats(formats);

  // Sync format when channel changes
  useEffect(() => {
    if (!flatFormats.find(f => f.id === adFormat)) {
      setAdFormat(flatFormats[0]?.id || 'image-carousel');
    }
  }, [channel]); // eslint-disable-line

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Left: Ad formats panel */}
      <div style={{
        width: 210, borderRight: `1px solid ${GREY_BORDER}`,
        flexShrink: 0, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${GREY_BORDER}`, flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT }}>Ad formats</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {formats.map((entry, entryIdx) => {
            if (entry.groupLabel) {
              // Group header + its items
              return (
                <div key={entry.groupLabel + entryIdx}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: GREY_MID,
                    textTransform: 'uppercase', letterSpacing: 0.8,
                    padding: '8px 10px 4px',
                  }}>
                    {entry.groupLabel}
                  </div>
                  {entry.items.map(fmt => {
                    const isSel = adFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        onClick={() => setAdFormat(fmt.id)}
                        style={{
                          display: 'flex', alignItems: 'center',
                          padding: '8px 10px 8px 18px', borderRadius: 6, textAlign: 'left',
                          width: '100%', cursor: 'pointer',
                          border: isSel ? `1.5px solid ${BLUE}` : '1px solid transparent',
                          background: isSel ? BLUE_BG : 'transparent',
                          transition: 'all 0.12s',
                          fontFamily: FONT,
                        }}
                      >
                        <span style={{ fontSize: 13, fontWeight: isSel ? 600 : 400, color: isSel ? BLUE : GREY_TEXT }}>
                          {fmt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            }
            // Flat item
            const isSel = adFormat === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => setAdFormat(entry.id)}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '9px 10px', borderRadius: 6, textAlign: 'left',
                  width: '100%', cursor: 'pointer',
                  border: isSel ? `1.5px solid ${BLUE}` : '1px solid transparent',
                  background: isSel ? BLUE_BG : 'transparent',
                  transition: 'all 0.12s',
                  fontFamily: FONT,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: isSel ? 600 : 400, color: isSel ? BLUE : GREY_TEXT }}>
                  {entry.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Create Ads */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: GREY_TEXT }}>Create Ads</div>
          <div style={{ fontSize: 13, color: GREY_MID, marginTop: 4 }}>
            Create Ads for the selected inventory position. These are the Ads that customer's will interact with.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ads.map(ad => <AdCard key={ad.id} ad={ad} />)}

          {/* + New Ad */}
          <div
            onClick={onNewAdClick}
            style={{
              width: 180, height: 180, background: GREY_SURF,
              border: `1.5px dashed ${GREY_BORDER}`, borderRadius: 8,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 8, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = BLUE_LIGHT; e.currentTarget.style.borderColor = BLUE; }}
            onMouseLeave={e => { e.currentTarget.style.background = GREY_SURF; e.currentTarget.style.borderColor = GREY_BORDER; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: BLUE_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>New Ad</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Saved ad card thumbnail
const AD_CARD_GRADIENTS = [
  ['#667eea','#764ba2'],['#f093fb','#f5576c'],['#4facfe','#00f2fe'],
  ['#43e97b','#38f9d7'],['#fa709a','#fee140'],['#a18cd1','#fbc2eb'],
  ['#ffecd2','#fcb69f'],['#84fab0','#8fd3f4'],
];
function AdCard({ ad }) {
  const [c1, c2] = AD_CARD_GRADIENTS[ad.id % AD_CARD_GRADIENTS.length] || AD_CARD_GRADIENTS[0];
  return (
    <div style={{
      width: 180, height: 180, borderRadius: 8, overflow: 'hidden',
      border: `1px solid ${GREY_BORDER}`, position: 'relative',
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      cursor: 'pointer', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 10 }}>
        <div style={{ flex: 1 }} />
        <div style={{ background: 'rgba(0,0,0,0.42)', borderRadius: 5, padding: '7px 9px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'white', lineHeight: '1.3', marginBottom: 2 }}>
            {ad.headline || ad.name || 'Ad Creative'}
          </div>
          {ad.cta && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{ad.cta}</div>}
        </div>
      </div>
      <div style={{
        position: 'absolute', top: 7, right: 7,
        background: 'rgba(0,0,0,0.38)', borderRadius: 3, padding: '2px 5px',
        fontSize: 9, color: 'white', fontWeight: 600,
      }}>
        {ad.subFormat === 'carousel' ? 'Carousel' : ad.subFormat === 'video' ? 'Video' : 'Image'}
      </div>
    </div>
  );
}

// ── Sub-format options per channel + format ────────────────────────────────────
function getSubFormats(channel, formatId) {
  const imgVidIcon = (c) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  );
  const carouselIcon = (c) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <rect x="1" y="5" width="7" height="14" rx="1"/><rect x="8.5" y="3" width="7" height="18" rx="1"/><rect x="16" y="5" width="7" height="14" rx="1"/>
    </svg>
  );
  const vidIcon = (c) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  );
  const sparkIcon = (c) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
    </svg>
  );

  const map = {
    meta: {
      'image-carousel':   [ { id: 'image-video', label: 'Image / Video', icon: imgVidIcon }, { id: 'carousel', label: 'Carousel', icon: carouselIcon } ],
      'video':            [ { id: 'single-video', label: 'Single Video', icon: vidIcon },    { id: 'stories',  label: 'Stories',  icon: vidIcon       } ],
      'collection':       [ { id: 'collection',   label: 'Collection',   icon: carouselIcon },{ id: 'instant',  label: 'Instant Exp.', icon: imgVidIcon } ],
    },
    google: {
      'display-carousel': [ { id: 'responsive', label: 'Responsive',  icon: imgVidIcon }, { id: 'upload',  label: 'Upload Ad', icon: imgVidIcon } ],
      'display-banner':   [ { id: 'static',     label: 'Static',      icon: imgVidIcon }, { id: 'animated',label: 'Animated',  icon: carouselIcon} ],
      'display':          [ { id: 'standard',   label: 'Standard',    icon: imgVidIcon }, { id: 'smart',   label: 'Smart',     icon: sparkIcon   } ],
    },
    tiktok: {
      'in-feed-video': [ { id: 'video',    label: 'Video',    icon: vidIcon   }, { id: 'spark',   label: 'Spark Ad', icon: sparkIcon } ],
      'spark-ad':      [ { id: 'spark',    label: 'Spark',    icon: sparkIcon }, { id: 'boost',   label: 'Boost',    icon: sparkIcon } ],
      'topview':       [ { id: 'topview',  label: 'TopView',  icon: vidIcon   }, { id: 'lite',    label: 'Lite',     icon: vidIcon   } ],
    },
    snapchat: {
      'snap-ad':   [ { id: 'single-image', label: 'Single Image', icon: imgVidIcon }, { id: 'video',     label: 'Video',      icon: vidIcon      } ],
      'story-ad':  [ { id: 'story',        label: 'Story',        icon: carouselIcon},{ id: 'video',     label: 'Video',      icon: vidIcon      } ],
      'collection':[ { id: 'collection',   label: 'Collection',   icon: carouselIcon},{ id: 'dynamic',   label: 'Dynamic',    icon: sparkIcon    } ],
    },
    youtube: {
      'youtube-partners': [ { id: 'skippable',  label: 'Skippable',  icon: vidIcon }, { id: 'bumper',    label: 'Bumper',     icon: vidIcon   } ],
      'audio':            [ { id: 'audio-std',  label: 'Standard',   icon: vidIcon }, { id: 'audio-seq', label: 'Sequential', icon: vidIcon   } ],
    },
    dv360: {
      'upload-display':  [ { id: 'static',   label: 'Static',    icon: imgVidIcon }, { id: 'animated', label: 'Animated',   icon: carouselIcon} ],
      'upload-video':    [ { id: 'instream', label: 'In-stream', icon: vidIcon    }, { id: 'outstream',label: 'Out-stream',  icon: vidIcon     } ],
      'upload-yt':       [ { id: 'skippable',label: 'Skippable', icon: vidIcon    }, { id: 'bumper',   label: 'Bumper',      icon: vidIcon     } ],
      'upload-audio':    [ { id: 'audio-std',label: 'Standard',  icon: vidIcon    }, { id: 'audio-seq',label: 'Sequential',  icon: vidIcon     } ],
      'third-display':   [ { id: 'static',   label: 'Static',    icon: imgVidIcon }, { id: 'animated', label: 'Animated',   icon: carouselIcon} ],
      'third-video':     [ { id: 'instream', label: 'In-stream', icon: vidIcon    }, { id: 'outstream',label: 'Out-stream',  icon: vidIcon     } ],
      'third-audio':     [ { id: 'audio-std',label: 'Standard',  icon: vidIcon    }, { id: 'audio-seq',label: 'Sequential',  icon: vidIcon     } ],
    },
  };
  return (map[channel]?.[formatId]) || [
    { id: 'image-video', label: 'Image / Video', icon: imgVidIcon },
    { id: 'carousel',    label: 'Carousel',      icon: carouselIcon },
  ];
}

// ── Preview config per channel ─────────────────────────────────────────────────
function getPreviewConfig(channel) {
  const configs = {
    meta:     { color: '#1877F2', name: 'Facebook Ad Page', feed: 'Facebook Feed',    story: 'Facebook Story',   hasStory: true  },
    google:   { color: '#4285F4', name: 'Google Ads',       feed: 'Display Banner',   story: null,               hasStory: false },
    tiktok:   { color: '#010101', name: 'TikTok',           feed: 'TikTok In-Feed',   story: 'TikTok Story',     hasStory: true  },
    snapchat: { color: '#FFFC00', name: 'Snapchat',         feed: 'Snap Ad',          story: 'Snapchat Story',   hasStory: true  },
    youtube:  { color: '#FF0000', name: 'YouTube',          feed: 'YouTube Pre-roll', story: null,               hasStory: false },
    dv360:    { color: '#1A73E8', name: 'DV360',            feed: 'Display Banner',   story: null,               hasStory: false },
  };
  return configs[channel] || configs.meta;
}

// ── Create New Ad Overlay ──────────────────────────────────────────────────────
function CreateNewAdOverlay({ channelName, channel, adFormatId, onClose, onSave }) {
  const [adName, setAdName]         = useState('');
  const [subFormat, setSubFormat]   = useState('');
  const [bodyText, setBodyText]     = useState('');
  const [headline, setHeadline]     = useState('');
  const [destUrl, setDestUrl]       = useState('');
  const [cta, setCta]               = useState('');
  const [device, setDevice]         = useState('desktop');

  const subFormats = getSubFormats(channel, adFormatId);
  const preview    = getPreviewConfig(channel);

  // Default to first sub-format
  const selectedSub = subFormat || subFormats[0]?.id || 'image-video';

  const inputStyle = {
    height: 36, border: `1px solid ${GREY_BORDER}`, borderRadius: 6,
    padding: '0 12px', fontSize: 13, fontFamily: FONT, color: GREY_TEXT,
    outline: 'none', width: '100%', boxSizing: 'border-box', background: 'white',
  };
  const selectStyle = {
    ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237B7B7B' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 32,
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: GREY_TEXT, marginBottom: 6,
    display: 'flex', alignItems: 'center', gap: 4,
  };
  const reqStar = <span style={{ color: '#C62828' }}>*</span>;
  const gap = { marginBottom: 16 };

  const ctaLabel = (val) => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'CTA';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 20, display: 'flex', flexDirection: 'column', fontFamily: FONT }}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{
        background: BLUE_BG, padding: '10px 20px 12px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        borderBottom: `1px solid ${GREY_BORDER}`, flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 11, color: GREY_MID, marginBottom: 3 }}>
            {channelName} &rsaquo; Ad Upload
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: GREY_TEXT }}>Create New Ad</div>
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: GREY_MID, display: 'flex', marginTop: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px 24px' }}>

          {/* Ad Name */}
          <div style={gap}>
            <div style={labelStyle}>Ad Name {reqStar} <InfoIcon /></div>
            <input value={adName} onChange={e => setAdName(e.target.value)} placeholder="Enter here" style={inputStyle} />
          </div>

          {/* Ad Format sub-options */}
          <div style={gap}>
            <div style={labelStyle}>Ad Format {reqStar} <InfoIcon /></div>
            <div style={{ display: 'flex', gap: 10 }}>
              {subFormats.map(sf => {
                const isSel = selectedSub === sf.id;
                return (
                  <button
                    key={sf.id}
                    onClick={() => setSubFormat(sf.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '8px 14px', borderRadius: 6, cursor: 'pointer',
                      border: isSel ? `1.5px solid ${BLUE}` : `1px solid ${GREY_BORDER}`,
                      background: isSel ? BLUE_BG : 'white',
                      fontFamily: FONT, transition: 'all 0.12s',
                    }}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                      border: isSel ? `4px solid ${BLUE}` : `1.5px solid ${GREY_BORDER}`,
                      background: 'white', boxSizing: 'border-box',
                    }} />
                    {sf.icon(isSel ? BLUE : GREY_MID)}
                    <span style={{ fontSize: 13, fontWeight: 600, color: isSel ? BLUE : GREY_TEXT }}>{sf.label}</span>
                    <InfoIcon />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section label */}
          <div style={{ fontSize: 14, fontWeight: 700, color: GREY_TEXT, marginBottom: 14 }}>
            {subFormats.find(s => s.id === selectedSub)?.label || subFormats[0]?.label || 'Image / Video'} Ad
          </div>

          {/* Main Body Text */}
          <div style={gap}>
            <div style={labelStyle}>Main Body Text {reqStar} <InfoIcon /></div>
            <div style={{ position: 'relative' }}>
              <textarea
                value={bodyText}
                onChange={e => setBodyText(e.target.value)}
                placeholder="Enter here"
                rows={3}
                style={{ ...inputStyle, height: 'auto', padding: '9px 44px 9px 12px', resize: 'none', lineHeight: '1.5' }}
              />
              <div style={{ position: 'absolute', right: 8, top: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, color: GREY_MID, display: 'flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, color: GREY_MID, display: 'flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Headline + Upload Image side by side */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={labelStyle}>Headline {reqStar} <InfoIcon /></div>
              <input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Enter here" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={labelStyle}>Upload Image{reqStar} <InfoIcon /></div>
              <div style={{
                border: `1px dashed ${GREY_BORDER}`, borderRadius: 6,
                height: 80, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                background: GREY_SURF, cursor: 'pointer', position: 'relative',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
                <span style={{ fontSize: 11, color: GREY_MID }}>Upload Image</span>
              </div>
              <div style={{ fontSize: 10, color: GREY_MID, marginTop: 4 }}>1:1 ratio, 1200×1200 px, max 5MB.</div>
            </div>
          </div>

          {/* Destination URL */}
          <div style={gap}>
            <div style={labelStyle}>Destination URL {reqStar} <InfoIcon /></div>
            <input value={destUrl} onChange={e => setDestUrl(e.target.value)} placeholder="Enter here" style={inputStyle} />
          </div>

          {/* Select CTA */}
          <div style={gap}>
            <div style={labelStyle}>Select CTA {reqStar} <InfoIcon /></div>
            <select value={cta} onChange={e => setCta(e.target.value)} style={selectStyle}>
              <option value="">Select CTA</option>
              <option value="order_now">Order Now</option>
              <option value="shop_now">Shop Now</option>
              <option value="learn_more">Learn More</option>
              <option value="sign_up">Sign Up</option>
              <option value="get_offer">Get Offer</option>
              <option value="book_now">Book Now</option>
              <option value="download">Download</option>
              <option value="watch_more">Watch More</option>
            </select>
          </div>
        </div>

        {/* Right: Ad Preview */}
        <div style={{
          width: 300, borderLeft: `1px solid ${GREY_BORDER}`,
          display: 'flex', flexDirection: 'column',
          background: GREY_SURF, flexShrink: 0,
        }}>
          {/* Preview header */}
          <div style={{
            padding: '12px 14px', background: 'white',
            borderBottom: `1px solid ${GREY_BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: GREY_TEXT }}>Ad Preview</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[
                { id: 'desktop', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
                { id: 'mobile',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg> },
              ].map(d => (
                <button key={d.id} onClick={() => setDevice(d.id)} style={{
                  width: 30, height: 28, border: `1px solid ${GREY_BORDER}`, borderRadius: 5,
                  background: device === d.id ? BLUE_BG : 'white',
                  color: device === d.id ? BLUE : GREY_MID,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {d.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable previews */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>

            {/* ── Feed Preview ── */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: preview.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: GREY_TEXT }}>{preview.feed}</span>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </div>
              <div style={{ background: 'white', borderRadius: 8, border: `1px solid ${GREY_BORDER}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {/* Post header */}
                <div style={{ padding: '9px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: preview.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: GREY_TEXT }}>{preview.name}</div>
                    <div style={{ fontSize: 9, color: GREY_MID }}>Sponsored</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                {/* Body text */}
                <div style={{ padding: '0 10px 8px', fontSize: 11, color: GREY_TEXT, lineHeight: '1.5' }}>
                  {bodyText || <span style={{ color: '#ABABAB' }}>Place holder for main body text. Lorem ipsum lorem ipsum lorem ispum lorem ipsum.</span>}
                </div>
                {/* Image area */}
                <div style={{ background: '#E0E0E0', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                {/* Headline + CTA */}
                <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${GREY_BORDER}` }}>
                  <span style={{ fontSize: 11, color: headline ? GREY_TEXT : '#ABABAB', flex: 1, marginRight: 8, lineHeight: '1.3' }}>
                    {headline || 'Headline for ad will be displayed here'}
                  </span>
                  <div style={{
                    background: cta ? BLUE : GREY_SURF2, borderRadius: 4,
                    padding: '5px 10px', fontSize: 10, fontWeight: 700,
                    color: cta ? 'white' : GREY_MID, flexShrink: 0, whiteSpace: 'nowrap',
                  }}>
                    {cta ? ctaLabel(cta) : 'CTA'}
                  </div>
                </div>
                {/* Interactions */}
                <div style={{ padding: '7px 10px', display: 'flex', gap: 16, borderTop: `1px solid ${GREY_BORDER}` }}>
                  {['Like','Comment','Share'].map(l => (
                    <span key={l} style={{ fontSize: 10, color: GREY_MID, fontWeight: 500 }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Story Preview (if channel supports stories) ── */}
            {preview.hasStory && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: preview.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: GREY_TEXT }}>{preview.story}</span>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </div>
                <div style={{ background: 'white', borderRadius: 8, border: `1px solid ${GREY_BORDER}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {/* Story progress */}
                  <div style={{ padding: '7px 8px 2px', display: 'flex', gap: 3 }}>
                    {[0.45, 1].map((w, i) => (
                      <div key={i} style={{ flex: 1, height: 2.5, background: '#E0E0E0', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${w * 100}%`, background: '#9E9E9E', borderRadius: 2 }} />
                      </div>
                    ))}
                  </div>
                  {/* Story header */}
                  <div style={{ padding: '4px 8px 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: preview.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: GREY_TEXT }}>{preview.name}</div>
                      <div style={{ fontSize: 8, color: GREY_MID }}>Sponsored</div>
                    </div>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  {/* Story image */}
                  <div style={{ background: '#E8E8E8', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  {/* Swipe up */}
                  <div style={{ padding: '8px', textAlign: 'center' }}>
                    <div style={{
                      background: cta ? BLUE : GREY_SURF2, borderRadius: 20,
                      padding: '5px 16px', fontSize: 10, fontWeight: 700,
                      color: cta ? 'white' : GREY_MID, display: 'inline-block',
                    }}>
                      {cta ? ctaLabel(cta) : 'Swipe Up'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${GREY_BORDER}`, display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
        <button onClick={onClose} style={{
          padding: '8px 20px', borderRadius: 6, border: `1px solid ${GREY_BORDER}`,
          background: 'white', color: GREY_TEXT, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: 'pointer',
        }}>
          Cancel
        </button>
        <button
          onClick={() => onSave({ name: adName || 'New Ad', subFormat: selectedSub, headline, bodyText, cta })}
          style={{
            padding: '8px 24px', borderRadius: 6, border: 'none',
            background: BLUE, color: 'white', fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ── Step 4 (sales) / Step 3 (others): Config ─────────────────────────────────
function StepConfig({ config, setConfig }) {
  const update = (field, value) => setConfig(c => ({ ...c, [field]: value }));

  const inputStyle = {
    height: 40, border: `1px solid ${GREY_BORDER}`, borderRadius: 8,
    padding: '0 12px', fontSize: 14, fontFamily: FONT, color: GREY_TEXT,
    outline: 'none', boxSizing: 'border-box', width: 204, background: 'white',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237B7B7B' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    paddingRight: 32,
  };

  const labelStyle = {
    fontSize: 14, fontWeight: 600, color: GREY_TEXT,
    display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8,
  };

  const requiredStar = <span style={{ color: '#C62828' }}>*</span>;

  const sectionStyle = {
    borderBottom: `1px solid ${GREY_BORDER}`, paddingBottom: 24, marginBottom: 24,
  };

  const noteStyle = {
    fontSize: 12, fontStyle: 'italic', color: '#B3B3B3', marginTop: 4,
  };

  return (
    <div style={{ padding: '20px 20px', overflowY: 'auto' }}>

      {/* Section 1: Budget Type */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Select Budget type {requiredStar} <InfoIcon /></div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {[['daily', 'Avg. Daily Budget'], ['lifetime', 'Lifetime Budget']].map(([val, label]) => {
            const on = config.budgetType === val;
            return (
              <button
                key={val}
                onClick={() => update('budgetType', val)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  height: 40, padding: '0 16px', width: 204, borderRadius: 8,
                  border: on ? `1.5px solid ${BLUE}` : `1px solid ${GREY_BORDER}`,
                  background: 'white', cursor: 'pointer', fontFamily: FONT,
                  boxSizing: 'border-box',
                }}
              >
                {/* Radio dot */}
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  border: on ? `4.5px solid ${BLUE}` : `1.5px solid ${GREY_MID}`,
                  background: 'white', boxSizing: 'border-box',
                }} />
                <span style={{ fontSize: 14, color: GREY_TEXT }}>{label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ ...noteStyle, marginTop: 6 }}>
          Note* The budget type cannot be changed after the campaign goes live
        </div>
      </div>

      {/* Section 2: Budget + Wallet */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Avg. Daily Budget */}
          <div>
            <div style={labelStyle}>
              {config.budgetType === 'daily' ? 'Avg. Daily Budget ($)' : 'Lifetime Budget ($)'} {requiredStar} <InfoIcon />
            </div>
            <input
              value={config.dailyBudget}
              onChange={e => update('dailyBudget', e.target.value)}
              placeholder="Enter here"
              style={inputStyle}
            />
            <div style={noteStyle}>Minimum budget should be $10</div>
          </div>
          {/* Total Spend Cap */}
          <div>
            <div style={labelStyle}>Total Spend Cap ($) <InfoIcon /></div>
            <input
              value={config.totalSpendCap}
              onChange={e => update('totalSpendCap', e.target.value)}
              placeholder="Enter here"
              style={inputStyle}
            />
            <div style={noteStyle}>Minimum budget should be $10</div>
          </div>
          {/* Wallet */}
          <div>
            <div style={labelStyle}>Choose Wallet {requiredStar} <InfoIcon /></div>
            <select value={config.wallet} onChange={e => update('wallet', e.target.value)} style={selectStyle}>
              <option>Default Wallet</option>
              <option>Campaign Wallet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: CPM */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Enter CPM {requiredStar}</div>
        <input
          value={config.cpm}
          onChange={e => update('cpm', e.target.value)}
          placeholder="Enter here"
          style={inputStyle}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 12, fontStyle: 'italic', color: GREY_MID }}>
            You can customize CPM for individual inventories.
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: 'none', background: 'transparent',
            color: BLUE, fontSize: 14, fontWeight: 600,
            fontFamily: FONT, cursor: 'pointer', padding: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Customize
          </button>
        </div>
      </div>

      {/* Section 4: Date Range */}
      <div style={{ paddingBottom: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Start Date */}
          <div>
            <div style={labelStyle}>Start Date</div>
            <div style={{
              ...inputStyle, display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', color: GREY_MID,
            }}>
              <CalendarIcon />
              <span style={{ fontSize: 14 }}>{config.startDate}</span>
            </div>
          </div>
          {/* End Date */}
          <div>
            <div style={labelStyle}>End Date</div>
            <div style={{
              ...inputStyle, display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', color: GREY_MID,
            }}>
              <CalendarIcon />
              <span style={{ fontSize: 14 }}>{config.endDate}</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, fontStyle: 'italic', color: '#B3B3B3', marginTop: 8 }}>
          Date range will be set in the Asia / Kolkata timezone
        </div>

        {/* Custom Attribution Window */}
        <div style={{ marginTop: 20, borderBottom: `1px solid ${GREY_BORDER}`, paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>Custom Attribution Window</span>
            <InfoIcon />
            <Toggle on={config.customAttribution} onChange={() => update('customAttribution', !config.customAttribution)} />
          </div>
          <div style={{ fontSize: 12, fontStyle: 'italic', color: GREY_MID }}>
            Default attribution is set by the retailer. Turn on the toggle to customise.
          </div>
        </div>
      </div>

      {/* Section 5: Frequency Caps */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>Frequency Caps</span>
          <InfoIcon />
          <Toggle on={config.frequencyCaps} onChange={() => update('frequencyCaps', !config.frequencyCaps)} />
        </div>
        <div style={{ fontSize: 12, fontStyle: 'italic', color: GREY_MID }}>Set per user frequency</div>
      </div>

      {/* Advanced / Publisher links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Advanced Settings', 'Publisher Settings'].map(label => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: 'none', background: 'transparent',
            color: BLUE, fontSize: 14, fontWeight: 600,
            fontFamily: FONT, cursor: 'pointer', padding: 0, alignSelf: 'flex-start',
          }}>
            {label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Campaign Summary Sidebar ───────────────────────────────────────────────────
const SIMULATION_METRICS = [
  { label: 'Est. Spend',   value: '$9.9K - $10.5K' },
  { label: 'Impressions',  value: '3.6M - 3.8M'    },
  { label: 'Page Views',   value: '71.3K - 75K'     },
  { label: 'Orders',       value: '28.5K - 30K'     },
  { label: 'Revenue',      value: '$156.5K - $164.7K' },
  { label: 'ROI',          value: '11.5x'           },
];
const AI_VIOLET      = '#7349A1';
const AI_VIOLET_LIGHT = '#F2EFFF';

function CampaignSummarySidebar({ steps, currentStep }) {
  return (
    <div style={{
      width: 220, borderLeft: `1px solid ${GREY_BORDER}`,
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflowY: 'auto', background: 'white',
    }}>
      {/* Dark header — "Campaign Summary" */}
      <div style={{
        background: SIDEBAR_DARK, padding: '13px 18px', flexShrink: 0,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: 0.1 }}>Campaign Summary</span>
      </div>

      {/* Step rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.filter(s => s.key !== 'product').map(s => {
          const isCurrent = s.num === currentStep;
          return (
            <div key={s.num} style={{
              padding: '13px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'white',
              borderBottom: `1px solid ${GREY_BORDER}`,
            }}>
              <span style={{
                fontSize: 14, fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? GREY_TEXT : GREY_MID,
              }}>
                {s.label}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Add Products Overlay ──────────────────────────────────────────────────────
function AddProductsOverlay({ channelName, search, setSearch, selection, setSelection, onAdd, onClose }) {
  const filtered = ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleProduct = (id) => {
    const next = new Set(selection);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelection(next);
  };

  const toggleAll = () => {
    if (selection.size === filtered.length) {
      setSelection(new Set());
    } else {
      setSelection(new Set(filtered.map(p => p.id)));
    }
  };

  const allSelected = filtered.length > 0 && selection.size === filtered.length;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'white', zIndex: 10,
      display: 'flex', flexDirection: 'column', fontFamily: FONT,
    }}>
      {/* Header */}
      <div style={{
        background: BLUE_BG, padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${GREY_BORDER}`, flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 11, color: GREY_MID, marginBottom: 2 }}>
            {channelName} › Product Selection
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: GREY_TEXT }}>Add Products</div>
        </div>
        <button onClick={onClose} style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: GREY_MID, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Toolbar */}
      <div style={{
        padding: '12px 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: `1px solid ${GREY_BORDER}`,
        flexShrink: 0,
      }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 6, border: `1px solid ${GREY_BORDER}`,
          background: 'white', fontSize: 13, fontWeight: 600, color: GREY_TEXT,
          fontFamily: FONT, cursor: 'pointer',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add a Filter
        </button>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          border: `1px solid ${GREY_BORDER}`, borderRadius: 6,
          padding: '6px 12px', width: 240,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Product"
            style={{ border: 'none', outline: 'none', fontSize: 13, fontFamily: FONT, color: GREY_TEXT, flex: 1 }}
          />
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '10px 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT }}>
          {ALL_PRODUCTS.length} Products
          {selection.size > 0 && (
            <span style={{ color: GREY_MID, fontWeight: 400 }}> ({selection.size} Products Selected)</span>
          )}
        </span>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
          <thead style={{ position: 'sticky', top: 0, background: GREY_SURF, zIndex: 1 }}>
            <tr style={{ borderBottom: `1px solid ${TBL_BORDER}` }}>
              <th style={thStyle('center', 48)}>
                <WizardCheckbox checked={allSelected} onChange={toggleAll} />
              </th>
              <th style={thStyle('center', 60)}>Image</th>
              <th style={thStyle('left')}>Name</th>
              <th style={thStyle('left', 100)}>Brand</th>
              <th style={thStyle('left')}>Category</th>
              <th style={thStyle('left', 90)}>Availability</th>
              <th style={thStyle('right', 70)}>Price</th>
              <th style={thStyle('right', 90)}>Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const isChecked = selection.has(p.id);
              return (
                <tr
                  key={p.id}
                  onClick={() => toggleProduct(p.id)}
                  style={{
                    background: isChecked ? BLUE_LIGHT : 'white',
                    borderBottom: `1px solid ${TBL_BORDER}`,
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                >
                  <td style={tdStyle('center')}>
                    <WizardCheckbox checked={isChecked} onChange={() => toggleProduct(p.id)} />
                  </td>
                  <td style={tdStyle('center')}>
                    <img src={PRODUCT_IMG} alt="product" width="36" height="36"
                      style={{ borderRadius: 4, display: 'block', margin: '0 auto' }} />
                  </td>
                  <td style={{ ...tdStyle('left'), fontSize: 13, color: GREY_TEXT }}>{p.name}</td>
                  <td style={tdStyle('left')}>{p.brand}</td>
                  <td style={tdStyle('left')}>{p.category}</td>
                  <td style={tdStyle('left')}>
                    <span style={{ color: GREY_MID }}>{p.availability}</span>
                  </td>
                  <td style={tdStyle('right')}>{p.price}</td>
                  <td style={tdStyle('right')}>{p.salePrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 20px', borderTop: `1px solid ${GREY_BORDER}`,
        display: 'flex', justifyContent: 'flex-end', flexShrink: 0,
      }}>
        <button
          onClick={onAdd}
          disabled={selection.size === 0}
          style={{
            padding: '9px 28px', borderRadius: 6, border: 'none',
            background: selection.size > 0 ? BLUE : GREY_DIS,
            color: 'white', fontSize: 14, fontWeight: 600,
            fontFamily: FONT, cursor: selection.size > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ── Product Empty Illustration ────────────────────────────────────────────────
function ProductEmptyIllustration() {
  const cardStyle = (rotate, z, x, y, bg) => ({
    position: 'absolute', width: 140, height: 160,
    background: bg, border: `1.5px dashed ${GREY_BORDER}`,
    borderRadius: 12, transform: `rotate(${rotate}deg)`,
    zIndex: z, left: x, top: y,
  });

  return (
    <div style={{ position: 'relative', width: 260, height: 220 }}>
      {/* Back card */}
      <div style={cardStyle(-12, 1, 20, 20, '#FFFAEB')}>
        <div style={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}>
          <div style={{ height: 8, background: '#F5E6C8', borderRadius: 4, marginBottom: 6 }} />
          <div style={{ height: 8, background: '#F5E6C8', borderRadius: 4, width: '60%' }} />
        </div>
      </div>
      {/* Right card */}
      <div style={cardStyle(10, 1, 100, 20, '#FFF0F4')}>
        <div style={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}>
          <div style={{ height: 8, background: '#F5C8D3', borderRadius: 4, marginBottom: 6 }} />
          <div style={{ height: 8, background: '#F5C8D3', borderRadius: 4, width: '60%' }} />
        </div>
      </div>
      {/* Center card (front) */}
      <div style={{
        ...cardStyle(0, 3, 58, 10, 'white'),
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        border: `1px solid ${GREY_BORDER}`,
        zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#E8EEFF', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B9FE8" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 14, right: 14 }}>
          <div style={{ height: 7, background: GREY_SURF2, borderRadius: 4, marginBottom: 5 }} />
          <div style={{ height: 7, background: GREY_SURF2, borderRadius: 4, width: '70%' }} />
        </div>
      </div>
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 36, height: 20, borderRadius: 10, position: 'relative', cursor: 'pointer',
        background: on ? BLUE : GREY_DIS,
        transition: 'background 0.18s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 2,
        left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: 'white', transition: 'left 0.18s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
      }} />
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function WizardCheckbox({ checked, onChange }) {
  return (
    <div onClick={e => { e.stopPropagation(); onChange(); }} style={{
      width: 16, height: 16, borderRadius: 3, cursor: 'pointer', flexShrink: 0,
      border: `1.5px solid ${checked ? BLUE : GREY_BORDER}`,
      background: checked ? BLUE : 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.1s',
    }}>
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </div>
  );
}

function thStyle(align = 'left', width) {
  return {
    padding: '12px 14px', textAlign: align, fontSize: 12, fontWeight: 700,
    color: GREY_TEXT, whiteSpace: 'nowrap', userSelect: 'none',
    background: GREY_SURF,
    ...(width ? { width } : {}),
  };
}

function tdStyle(align = 'left') {
  return { padding: '10px 14px', textAlign: align, fontSize: 13, color: GREY_MID, verticalAlign: 'middle' };
}
