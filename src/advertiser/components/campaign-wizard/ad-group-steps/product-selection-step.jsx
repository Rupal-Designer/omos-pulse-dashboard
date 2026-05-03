import { useState } from 'react';
import { Select, SearchIcon, CheckIcon, Icon } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const AMBER    = 'var(--osmos-brand-amber)';
const VIOLET   = '#7349a1'; // brand-secondary — no osmos token yet

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/>
    <path d="M3 5h4"/><path d="M17 19h4"/>
  </Icon>
);

const PackageIcon = (props) => (
  <Icon {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <line x1="12" x2="12" y1="22" y2="12"/>
  </Icon>
);

const TrendingUpIcon = (props) => (
  <Icon {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </Icon>
);

const DollarSignIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const sampleProducts = [
  { id: 'p1', name: 'Wireless Headphones Pro', sku: 'WHP-001', price: 199.99, category: 'Electronics',    brand: 'TechSound'  },
  { id: 'p2', name: 'Organic Green Tea',        sku: 'OGT-002', price:  24.99, category: 'Food & Beverage', brand: 'NatureTea'  },
  { id: 'p3', name: 'Running Shoes X1',          sku: 'RSX-003', price: 129.99, category: 'Sports',          brand: 'ActiveRun'  },
  { id: 'p4', name: 'Smart Watch Elite',          sku: 'SWE-004', price: 299.99, category: 'Electronics',    brand: 'TechWear'   },
  { id: 'p5', name: 'Vitamin D3 Supplement',     sku: 'VD3-005', price:  19.99, category: 'Health',          brand: 'VitaLife'   },
  { id: 'p6', name: 'Yoga Mat Premium',           sku: 'YMP-006', price:  49.99, category: 'Sports',          brand: 'ZenFit'     },
];

const categories    = ['Electronics', 'Food & Beverage', 'Sports', 'Health'];

const categoryOptions = [{ value: 'all', label: 'All Categories' }, ...categories.map((c) => ({ value: c, label: c }))];
const brandOptions    = [{ value: 'all', label: 'All Brands' }, { value: 'TechSound', label: 'TechSound' }, { value: 'ActiveRun', label: 'ActiveRun' }];
const priceOptions    = [
  { value: 'any',  label: 'Any Price'    },
  { value: '<50',  label: 'Under $50'    },
  { value: '50-100', label: '$50 - $100' },
  { value: '>100', label: 'Over $100'    },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function ModeCard({ isSelected, onClick, IconComp, title, description }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 24, borderRadius: 12, textAlign: 'left',
        border: `2px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT,
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 8, marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isSelected ? ACCENT : BG_SUB,
      }}>
        <IconComp size={24} color={isSelected ? '#fff' : TEXT_MID} />
      </div>
      <h4 style={{ fontWeight: 600, marginBottom: 4, color: isSelected ? ACCENT : TEXT }}>{title}</h4>
      <p style={{ fontSize: 13, color: TEXT_MID }}>{description}</p>
    </button>
  );
}

function ProductRow({ product, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 12, borderRadius: 8, cursor: 'pointer',
        border: `1px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 3, flexShrink: 0,
          border: `2px solid ${isSelected ? ACCENT : BORDER}`,
          background: isSelected ? ACCENT : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isSelected && <CheckIcon size={12} color="#fff" />}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{product.name}</p>
          <p style={{ fontSize: 12, color: TEXT_MID }}>{product.sku} · {product.category}</p>
        </div>
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>${product.price}</span>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        position: 'relative', width: 44, height: 24, borderRadius: 999,
        background: value ? VIOLET : TEXT_SUB,
        border: 'none', cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 4,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transform: value ? 'translateX(24px)' : 'translateX(4px)',
        transition: 'transform 0.15s', display: 'block',
      }} />
    </button>
  );
}

// ── ProductSelectionStep ──────────────────────────────────────────────────────
export function ProductSelectionStep({ data, updateData }) {
  const [mode,            setMode]            = useState('smart');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [showCategoryBids, setShowCategoryBids] = useState(false);
  const [categoryBids,    setCategoryBids]    = useState(data.categoryBids || {});
  const [showKeywordBids,  setShowKeywordBids]  = useState(false);
  const [keywordBids,     setKeywordBids]     = useState(data.keywordBids || {});
  const [categoryFilter,  setCategoryFilter]  = useState('all');
  const [brandFilter,     setBrandFilter]     = useState('all');
  const [priceFilter,     setPriceFilter]     = useState('any');
  const [clearHovered,    setClearHovered]    = useState(false);

  const filteredProducts = sampleProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleProduct = (id) => {
    setSelectedProducts((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const updateCategoryBid = (category, value) => {
    const updated = { ...categoryBids, [category]: value };
    setCategoryBids(updated);
    updateData({ categoryBids: updated });
  };

  const updateKeywordBid = (keyword, value) => {
    const updated = { ...keywordBids, [keyword]: value };
    setKeywordBids(updated);
    updateData({ keywordBids: updated });
  };

  const bidInputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '8px 12px 8px 32px',
    border: `1px solid ${BORDER}`, borderRadius: 8,
    fontSize: 13, color: TEXT, background: BG,
    fontFamily: FONT, outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Product Selection
        </h2>
        <p style={{ color: TEXT_MID }}>
          Choose which products to advertise in this ad group.
        </p>
      </div>

      {/* Mode Selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <ModeCard
          isSelected={mode === 'smart'} onClick={() => setMode('smart')}
          IconComp={SparklesIcon} title="Smart Selection"
          description="Automatically select products based on category, brand, or price filters"
        />
        <ModeCard
          isSelected={mode === 'manual'} onClick={() => setMode('manual')}
          IconComp={PackageIcon} title="Manual Selection"
          description="Manually pick individual products to include or exclude"
        />
      </div>

      {/* Smart Selection Filters */}
      {mode === 'smart' && (
        <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
          <h4 style={{ fontWeight: 500, color: TEXT, marginBottom: 16 }}>Filter Products</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <Select label="Category"    value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} options={categoryOptions} />
            <Select label="Brand"       value={brandFilter}    onChange={(e) => setBrandFilter(e.target.value)}    options={brandOptions} />
            <Select label="Price Range" value={priceFilter}    onChange={(e) => setPriceFilter(e.target.value)}    options={priceOptions} />
          </div>
          <div style={{ marginTop: 16, padding: 12, background: BG_SUB, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: TEXT_MID }}>Matching products: </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>156 products</span>
          </div>
        </div>
      )}

      {/* Manual Selection */}
      {mode === 'manual' && (
        <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8, background: BG }}>
            <SearchIcon size={16} color={TEXT_SUB} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or SKU..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: TEXT, background: 'transparent', fontFamily: FONT }}
            />
          </div>

          {/* Product list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onClick={() => toggleProduct(product.id)}
              />
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <div style={{
              marginTop: 16, padding: 12,
              background: ACCENT_M, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: ACCENT }}>{selectedProducts.length} product(s) selected</span>
              <button
                onClick={() => setSelectedProducts([])}
                onMouseEnter={() => setClearHovered(true)}
                onMouseLeave={() => setClearHovered(false)}
                style={{ fontSize: 13, color: ACCENT, background: 'none', border: 'none', cursor: 'pointer', textDecoration: clearHovered ? 'underline' : 'none', fontFamily: FONT }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Category Bidding */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUpIcon size={20} color={VIOLET} />
            <div>
              <h4 style={{ fontWeight: 500, color: TEXT }}>Category Bidding</h4>
              <p style={{ fontSize: 12, color: TEXT_MID }}>Set custom bids for specific product categories</p>
            </div>
          </div>
          <Toggle value={showCategoryBids} onChange={setShowCategoryBids} />
        </div>
        {showCategoryBids && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
            {categories.map((category) => (
              <div key={category} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{category}</label>
                </div>
                <div style={{ width: 160, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <DollarSignIcon size={14} color={TEXT_MID} />
                  </span>
                  <input
                    type="number"
                    value={categoryBids[category] || ''}
                    onChange={(e) => updateCategoryBid(category, e.target.value)}
                    placeholder="Default"
                    style={bidInputStyle}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keyword Bidding */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DollarSignIcon size={20} color={VIOLET} />
            <div>
              <h4 style={{ fontWeight: 500, color: TEXT }}>Keyword Bidding</h4>
              <p style={{ fontSize: 12, color: TEXT_MID }}>Set custom bids for specific keywords</p>
            </div>
          </div>
          <Toggle value={showKeywordBids} onChange={setShowKeywordBids} />
        </div>
        {showKeywordBids && (
          <div style={{ paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16 }}>
              Customize bids for keywords selected in the Targeting step. Higher bids increase visibility for those keywords.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.targeting.keywords.length > 0 ? (
                data.targeting.keywords.map((keyword) => (
                  <div key={keyword} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{keyword}</label>
                    </div>
                    <div style={{ width: 160, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <DollarSignIcon size={14} color={TEXT_MID} />
                      </span>
                      <input
                        type="number"
                        value={keywordBids[keyword] || ''}
                        onChange={(e) => updateKeywordBid(keyword, e.target.value)}
                        placeholder="Default"
                        style={bidInputStyle}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  padding: 16, background: 'rgba(245,166,35,0.12)',
                  borderRadius: 8, border: `1px solid ${AMBER}`,
                }}>
                  <p style={{ fontSize: 13, color: AMBER }}>
                    No keywords selected yet. Add keywords in the Targeting step to enable keyword bidding.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
