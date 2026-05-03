import { useState, useMemo } from 'react';
import {
  Icon, CloseIcon, SearchIcon, FilterIcon,
  ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon,
  CheckIcon, TrashIcon, EyeIcon, PlusIcon,
  Button, Checkbox, RadioCard, RadioDot, EmptyState, SectionCard,
} from '../../../ui';

// ── hand-rolled icons ────────────────────────────────────────────────────────
const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </Icon>
);
const PackageIcon = (props) => (
  <Icon {...props}>
    <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </Icon>
);
const AlertCircleIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
  </Icon>
);
const MinusIcon = (props) => (
  <Icon {...props}><path d="M5 12h14" /></Icon>
);

// ── design tokens ─────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BG_MUTED  = 'var(--osmos-bg-muted)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const TEXT_SUB  = 'var(--osmos-fg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const VI        = 'var(--osmos-brand-violet)';   // AI/smart violet
const INC       = 'var(--alert-success-primary)';   // include semantic green — intentional
const EXC       = 'var(--alert-error-primary)';   // exclude semantic red — intentional

// ── mock data ─────────────────────────────────────────────────────────────────
const sampleProducts = [
  { id: 'P001', name: 'Wireless Bluetooth Headphones', sku: 'WBH-001', brand: 'SoundMax',   category: 'Electronics', subcategory: 'Audio',       price: 79.99,  stock: 245,  image: '/wireless-headphones.png',   rating: 4.5, reviews: 1247 },
  { id: 'P002', name: 'Organic Green Tea - 100 Bags',  sku: 'OGT-100', brand: 'TeaLeaf',    category: 'Grocery',     subcategory: 'Beverages',    price: 12.99,  stock: 892,  image: '/green-tea-box.png',          rating: 4.8, reviews: 3421 },
  { id: 'P003', name: "Running Shoes - Men's",          sku: 'RSM-042', brand: 'SprintPro',  category: 'Apparel',     subcategory: 'Footwear',     price: 129.99, stock: 156,  image: '/running-shoes.jpg',          rating: 4.3, reviews: 876  },
  { id: 'P004', name: 'Smart Watch Series 5',           sku: 'SWS-005', brand: 'TechWear',   category: 'Electronics', subcategory: 'Wearables',    price: 299.99, stock: 89,   image: '/smartwatch-lifestyle.png',   rating: 4.7, reviews: 2156 },
  { id: 'P005', name: 'Vitamin D3 Supplements',         sku: 'VD3-060', brand: 'HealthPlus', category: 'Health',      subcategory: 'Vitamins',     price: 18.99,  stock: 1203, image: '/vitamin-bottle.jpg',         rating: 4.6, reviews: 4532 },
  { id: 'P006', name: 'Stainless Steel Water Bottle',   sku: 'SSW-750', brand: 'HydroLife',  category: 'Home',        subcategory: 'Kitchen',      price: 24.99,  stock: 567,  image: '/reusable-water-bottle.png',  rating: 4.4, reviews: 987  },
  { id: 'P007', name: 'Yoga Mat - Premium',             sku: 'YMP-001', brand: 'ZenFit',     category: 'Sports',      subcategory: 'Yoga',         price: 45.99,  stock: 234,  image: '/rolled-yoga-mat.png',        rating: 4.9, reviews: 1876 },
  { id: 'P008', name: 'LED Desk Lamp',                  sku: 'LDL-100', brand: 'BrightHome', category: 'Home',        subcategory: 'Lighting',     price: 39.99,  stock: 412,  image: '/modern-desk-lamp.png',       rating: 4.2, reviews: 654  },
  { id: 'P009', name: 'Protein Powder - Chocolate',     sku: 'PPC-2LB', brand: 'FitFuel',    category: 'Health',      subcategory: 'Nutrition',    price: 54.99,  stock: 678,  image: '/protein-powder.jpg',         rating: 4.5, reviews: 3245 },
  { id: 'P010', name: 'Wireless Charging Pad',          sku: 'WCP-015', brand: 'ChargeTech', category: 'Electronics', subcategory: 'Accessories',  price: 29.99,  stock: 890,  image: '/wireless-charger.png',       rating: 4.1, reviews: 1123 },
  { id: 'P011', name: 'Organic Coffee Beans',           sku: 'OCB-1KG', brand: 'BeanMaster', category: 'Grocery',     subcategory: 'Beverages',    price: 22.99,  stock: 445,  image: '/pile-of-coffee-beans.png',   rating: 4.8, reviews: 2876 },
  { id: 'P012', name: 'Bluetooth Speaker Portable',     sku: 'BSP-200', brand: 'SoundMax',   category: 'Electronics', subcategory: 'Audio',        price: 59.99,  stock: 321,  image: '/bluetooth-speaker.jpg',      rating: 4.4, reviews: 1567 },
];

const brands     = ['SoundMax','TeaLeaf','SprintPro','TechWear','HealthPlus','HydroLife','ZenFit','BrightHome','FitFuel','ChargeTech','BeanMaster'];
const categories = ['Electronics','Grocery','Apparel','Health','Home','Sports'];

// ── main component ────────────────────────────────────────────────────────────
export function ProductSelectionDrawer({ open, onClose, onSave, existingSelection }) {
  const [mode, setMode]                         = useState(existingSelection?.mode || 'manual');
  const [manualMode, setManualMode]             = useState(existingSelection?.manualMode || 'filter');
  const [currentView, setCurrentView]           = useState('entry');
  const [includedProducts, setIncludedProducts] = useState(existingSelection?.includedProducts || []);
  const [excludedProducts, setExcludedProducts] = useState(existingSelection?.excludedProducts || []);
  const [selectionMode, setSelectionMode]       = useState('include');

  const [selectedBrands, setSelectedBrands]       = useState(existingSelection?.filterCriteria?.brands || []);
  const [selectedCategories, setSelectedCategories] = useState(existingSelection?.filterCriteria?.categories || []);
  const [priceRange, setPriceRange]               = useState({ min: 0, max: 500 });
  const [selectedStockStatus]                     = useState(['In Stock']);
  const [filterLogic, setFilterLogic]             = useState('AND');
  const [searchQuery, setSearchQuery]             = useState('');
  const [expandedFilters, setExpandedFilters]     = useState(['brand', 'category']);

  const filteredProducts = useMemo(() => {
    let results = sampleProducts;
    if (currentView === 'filter') {
      if (filterLogic === 'AND') {
        if (selectedBrands.length > 0)     results = results.filter((p) => selectedBrands.includes(p.brand));
        if (selectedCategories.length > 0) results = results.filter((p) => selectedCategories.includes(p.category));
        results = results.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
      } else {
        if (selectedBrands.length > 0 || selectedCategories.length > 0) {
          results = results.filter((p) => selectedBrands.includes(p.brand) || selectedCategories.includes(p.category));
        }
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return results;
  }, [currentView, selectedBrands, selectedCategories, priceRange, filterLogic, searchQuery]);

  const toggleFilter = (key) => setExpandedFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);

  const toggleProduct = (productId) => {
    if (selectionMode === 'include') {
      setIncludedProducts((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
      setExcludedProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      setExcludedProducts((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
      setIncludedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleSave = () => {
    onSave({
      mode, manualMode,
      filterCriteria: currentView === 'filter' ? { brands: selectedBrands, categories: selectedCategories, priceRange, stockStatus: selectedStockStatus, logic: filterLogic } : undefined,
      includedProducts, excludedProducts,
    });
    onClose();
  };

  const totalSelected = includedProducts.length + (currentView === 'filter' ? filteredProducts.length : 0);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50 }} />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'calc(100% - 80px)',
        backgroundColor: BG_SUBTLE, zIndex: 51,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        fontFamily: FONT,
      }}>
        {/* Header */}
        <div style={{ backgroundColor: BG, borderBottom: `1px solid ${BORDER}`, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {currentView !== 'entry' && (
              <button
                onClick={() => setCurrentView('entry')}
                style={{ padding: 6, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, display: 'flex' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_MUTED)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <ChevronLeftIcon size={20} color={TEXT_MID} />
              </button>
            )}
            <PackageIcon size={24} color={ACCENT} />
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: TEXT }}>Product Selection</h2>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>
                {currentView === 'entry'      && 'Choose how you want to select products'}
                {currentView === 'filter'     && 'Use filters to select products'}
                {currentView === 'individual' && `${selectionMode === 'include' ? 'Include' : 'Exclude'} specific products`}
                {currentView === 'preview'    && 'Review your selection'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_MUTED)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CloseIcon size={20} color={TEXT_MID} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {currentView === 'entry' && (
            <EntryPointView
              mode={mode} setMode={setMode}
              manualMode={manualMode} setManualMode={setManualMode}
              totalSelected={totalSelected}
              onContinue={(view) => setCurrentView(view)}
              existingSelection={!!existingSelection}
            />
          )}
          {currentView === 'filter' && (
            <FilterBasedView
              products={filteredProducts}
              selectedBrands={selectedBrands}   setSelectedBrands={setSelectedBrands}
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
              priceRange={priceRange} setPriceRange={setPriceRange}
              filterLogic={filterLogic} setFilterLogic={setFilterLogic}
              expandedFilters={expandedFilters} toggleFilter={toggleFilter}
              excludedProducts={excludedProducts}
              toggleExclude={(id) => setExcludedProducts((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])}
            />
          )}
          {currentView === 'individual' && (
            <IndividualSelectionView
              products={sampleProducts}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              selectionMode={selectionMode} setSelectionMode={setSelectionMode}
              includedProducts={includedProducts} excludedProducts={excludedProducts}
              toggleProduct={toggleProduct} filteredProducts={filteredProducts}
            />
          )}
          {currentView === 'preview' && (
            <PreviewView
              includedProducts={includedProducts} excludedProducts={excludedProducts}
              allProducts={sampleProducts}
              filterCriteria={manualMode === 'filter' ? { brands: selectedBrands, categories: selectedCategories, priceRange, stockStatus: selectedStockStatus, logic: filterLogic } : undefined}
              onRemoveIncluded={(id) => setIncludedProducts((prev) => prev.filter((i) => i !== id))}
              onRemoveExcluded={(id) => setExcludedProducts((prev) => prev.filter((i) => i !== id))}
            />
          )}
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {currentView !== 'entry' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <span style={{ color: TEXT_MID }}>Selected:</span>
                <span style={{ fontWeight: 600, color: ACCENT }}>{totalSelected} products</span>
                {excludedProducts.length > 0 && (
                  <span style={{ color: EXC }}>({excludedProducts.length} excluded)</span>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            {currentView !== 'entry' && currentView !== 'preview' && (
              <Button variant="outline" onClick={() => setCurrentView('preview')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <EyeIcon size={15} /> Preview Selection
              </Button>
            )}
            {currentView === 'preview' ? (
              <Button variant="primary" onClick={handleSave}>Confirm Selection</Button>
            ) : (
              currentView !== 'entry' && <Button variant="primary" onClick={handleSave}>Apply Selection</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Entry Point ───────────────────────────────────────────────────────────────
function EntryPointView({ mode, setMode, manualMode, setManualMode, totalSelected, onContinue }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Mode selector */}
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: TEXT }}>Choose Selection Mode</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {/* Smart Mode */}
        <RadioCard selected={mode === 'smart'} onClick={() => setMode('smart')} style={{ padding: 24, position: 'relative' }}>
          {mode === 'smart' && (
            <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: '50%', backgroundColor: INC, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckIcon size={14} color="#fff" />
            </div>
          )}
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <SparklesIcon size={24} color="#fff" />
          </div>
          <h4 style={{ margin: '0 0 8px', fontWeight: 600, color: TEXT }}>Smart Mode</h4>
          <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>AI handles everything. Sit back and let our algorithm optimize product selection for maximum performance.</p>
        </RadioCard>

        {/* Manual Mode */}
        <RadioCard selected={mode === 'manual'} onClick={() => setMode('manual')} style={{ padding: 24, position: 'relative' }}>
          {mode === 'manual' && (
            <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: '50%', backgroundColor: INC, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckIcon size={14} color="#fff" />
            </div>
          )}
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #2563eb, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <FilterIcon size={24} color="#fff" />
          </div>
          <h4 style={{ margin: '0 0 8px', fontWeight: 600, color: TEXT }}>Manual Mode</h4>
          <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>
            You control. Choose products by filters or individually.
            {totalSelected > 0 && <span style={{ marginLeft: 4, color: ACCENT, fontWeight: 500 }}>({totalSelected} products selected)</span>}
          </p>
        </RadioCard>
      </div>

      {/* Manual sub-mode */}
      {mode === 'manual' && (
        <>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: TEXT }}>How would you like to select products?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {/* Filter-Based */}
            <RadioCard selected={manualMode === 'filter'} onClick={() => setManualMode('filter')} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <RadioDot selected={manualMode === 'filter'} />
                <h4 style={{ margin: 0, fontWeight: 600, color: TEXT }}>Filter-Based Selection</h4>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MID, paddingLeft: 28 }}>Select products by brand, category, price range, and more. Perfect for bulk selection.</p>
            </RadioCard>

            {/* Individual */}
            <RadioCard selected={manualMode === 'individual'} onClick={() => setManualMode('individual')} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <RadioDot selected={manualMode === 'individual'} />
                <h4 style={{ margin: 0, fontWeight: 600, color: TEXT }}>Individual Selection</h4>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MID, paddingLeft: 28 }}>Search and select specific products one by one. Best for precise control.</p>
            </RadioCard>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => onContinue(manualMode)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 32px' }}>
              Continue with {manualMode === 'filter' ? 'Filters' : 'Individual Selection'}
              <ChevronRightIcon size={16} color="#fff" />
            </Button>
          </div>
        </>
      )}

      {/* Smart Mode info panel */}
      {mode === 'smart' && (
        <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(37,99,235,0.06))', borderRadius: 12, padding: 24, border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: VI, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <SparklesIcon size={20} color="#fff" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px', fontWeight: 600, color: TEXT }}>How Smart Mode Works</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'AI analyzes your campaign goals and target audience',
                  'Automatically selects top-performing products based on historical data',
                  'Continuously optimizes selection for better conversion rates',
                  'You can exclude specific products if needed',
                ].map((point) => (
                  <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckIcon size={16} color={INC} style={{ marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: TEXT_MID }}>{point}</span>
                  </div>
                ))}
              </div>
              <Button variant="primary" onClick={() => {}} style={{ marginTop: 16, backgroundColor: VI, display: 'flex', alignItems: 'center', gap: 8 }}>
                Enable Smart Mode <SparklesIcon size={16} color="#fff" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Filter-Based View ─────────────────────────────────────────────────────────
function FilterBasedView({ products, selectedBrands, setSelectedBrands, selectedCategories, setSelectedCategories, priceRange, setPriceRange, filterLogic, setFilterLogic, expandedFilters, toggleFilter, excludedProducts, toggleExclude }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Filters sidebar */}
      <div style={{ width: 288, flexShrink: 0 }}>
        <SectionCard title="Filters" titleRight={<span style={{ fontSize: 12, color: ACCENT, cursor: 'pointer' }} onClick={() => { setSelectedBrands([]); setSelectedCategories([]); }}>Clear All</span>} bodyBg={BG} bodyPad={16}>
          {/* Logic toggle */}
          <div style={{ marginBottom: 16, padding: 12, backgroundColor: BG_SUBTLE, borderRadius: 8 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, color: TEXT_MID }}>Match products that meet:</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['AND','OR'].map((logic) => (
                <button key={logic} onClick={() => setFilterLogic(logic)} style={{
                  flex: 1, padding: '6px 0', fontSize: 13, borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s',
                  backgroundColor: filterLogic === logic ? ACCENT : BG,
                  color: filterLogic === logic ? '#fff' : TEXT_MID,
                  border: filterLogic === logic ? 'none' : `1px solid ${BORDER}`,
                  fontFamily: FONT,
                }}>
                  {logic === 'AND' ? 'All Filters (AND)' : 'Any Filter (OR)'}
                </button>
              ))}
            </div>
          </div>

          {/* Brand filter */}
          <FilterSection label="Brand" filterKey="brand" expanded={expandedFilters.includes('brand')} onToggle={() => toggleFilter('brand')}>
            {brands.map((brand) => (
              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '3px 0' }}>
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={() => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])}
                />
                <span style={{ fontSize: 13, color: TEXT_MID }}>{brand}</span>
              </label>
            ))}
          </FilterSection>

          {/* Category filter */}
          <FilterSection label="Category" filterKey="category" expanded={expandedFilters.includes('category')} onToggle={() => toggleFilter('category')}>
            {categories.map((cat) => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '3px 0' }}>
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])}
                />
                <span style={{ fontSize: 13, color: TEXT_MID }}>{cat}</span>
              </label>
            ))}
          </FilterSection>

          {/* Price range */}
          <FilterSection label="Price Range" filterKey="price" expanded={expandedFilters.includes('price')} onToggle={() => toggleFilter('price')}>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {[['min','Min'],['max','Max']].map(([key, lbl]) => (
                <div key={key} style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: TEXT_MID, marginBottom: 4 }}>{lbl}</div>
                  <input
                    type="number"
                    value={priceRange[key]}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                    style={{ width: '100%', padding: '6px 8px', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: FONT, color: TEXT, backgroundColor: BG, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
          </FilterSection>
        </SectionCard>
      </div>

      {/* Products grid */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>
            <span style={{ fontWeight: 600, color: TEXT }}>{products.length}</span> products match your filters
          </p>
          {excludedProducts.length > 0 && <p style={{ margin: 0, fontSize: 13, color: EXC }}>{excludedProducts.length} excluded</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {products.map((product) => {
            const isExcluded = excludedProducts.includes(product.id);
            return (
              <div key={product.id} style={{
                backgroundColor: isExcluded ? 'rgba(239,68,68,0.04)' : BG,
                border: isExcluded ? `1px solid rgba(239,68,68,0.3)` : `1px solid ${BORDER}`,
                borderRadius: 12, padding: 16,
                opacity: isExcluded ? 0.65 : 1,
                transition: 'all 0.15s',
              }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <img src={product.image || '/placeholder.svg'} alt={product.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', backgroundColor: BG_MUTED, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: '0 0 2px', fontWeight: 500, color: TEXT, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h4>
                    <p style={{ margin: 0, fontSize: 12, color: TEXT_MID }}>{product.brand}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600, color: ACCENT }}>${product.price}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SUB }}>{product.stock} in stock</span>
                  <ExcludeBtn excluded={isExcluded} onClick={() => toggleExclude(product.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Individual Selection View ─────────────────────────────────────────────────
function IndividualSelectionView({ searchQuery, setSearchQuery, selectionMode, setSelectionMode, includedProducts, excludedProducts, toggleProduct, filteredProducts }) {
  return (
    <div>
      {/* Mode toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', backgroundColor: BG_MUTED, borderRadius: 8, padding: 4 }}>
          <button
            onClick={() => setSelectionMode('include')}
            style={{
              padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
              backgroundColor: selectionMode === 'include' ? INC : 'transparent',
              color: selectionMode === 'include' ? '#fff' : TEXT_MID,
            }}
          >
            <PlusIcon size={13} color={selectionMode === 'include' ? '#fff' : TEXT_MID} /> Include Mode
          </button>
          <button
            onClick={() => setSelectionMode('exclude')}
            style={{
              padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
              backgroundColor: selectionMode === 'exclude' ? EXC : 'transparent',
              color: selectionMode === 'exclude' ? '#fff' : TEXT_MID,
            }}
          >
            <MinusIcon size={13} color={selectionMode === 'exclude' ? '#fff' : TEXT_MID} /> Exclude Mode
          </button>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>
          {selectionMode === 'include' ? 'Click products to add them to your campaign' : 'Click products to exclude them from your campaign'}
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <SearchIcon size={17} color={TEXT_SUB} />
        </div>
        <input
          type="text"
          placeholder="Search products by name, SKU, or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 12px 10px 40px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, color: TEXT, backgroundColor: BG, boxSizing: 'border-box', outline: 'none' }}
        />
      </div>

      {/* Products grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {filteredProducts.map((product) => {
          const isIncluded = includedProducts.includes(product.id);
          const isExcluded = excludedProducts.includes(product.id);
          return (
            <div
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              style={{
                backgroundColor: isIncluded ? 'rgba(34,197,94,0.05)' : isExcluded ? 'rgba(239,68,68,0.05)' : BG,
                border: isIncluded ? `2px solid ${INC}` : isExcluded ? `2px solid ${EXC}` : `1px solid ${BORDER}`,
                borderRadius: 12, padding: 16, cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
              }}
            >
              {(isIncluded || isExcluded) && (
                <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', backgroundColor: isIncluded ? INC : EXC, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isIncluded ? <PlusIcon size={13} color="#fff" /> : <MinusIcon size={13} color="#fff" />}
                </div>
              )}
              <img src={product.image || '/placeholder.svg'} alt={product.name} style={{ width: '100%', height: 96, borderRadius: 8, objectFit: 'cover', backgroundColor: BG_MUTED, marginBottom: 12, display: 'block' }} />
              <h4 style={{ margin: '0 0 2px', fontWeight: 500, color: TEXT, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h4>
              <p style={{ margin: 0, fontSize: 12, color: TEXT_MID }}>{product.brand}</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600, color: ACCENT }}>${product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Preview View ──────────────────────────────────────────────────────────────
function PreviewView({ includedProducts, excludedProducts, allProducts, filterCriteria, onRemoveIncluded, onRemoveExcluded }) {
  const includedData = allProducts.filter((p) => includedProducts.includes(p.id));
  const excludedData = allProducts.filter((p) => excludedProducts.includes(p.id));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ backgroundColor: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 16 }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: TEXT_MID }}>Total Products</p>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: TEXT }}>{filterCriteria ? allProducts.length : includedProducts.length}</p>
        </div>
        <div style={{ backgroundColor: 'rgba(34,197,94,0.06)', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', padding: 16 }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: INC }}>Included</p>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#16a34a' }}>{includedProducts.length}</p>
        </div>
        <div style={{ backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.25)', padding: 16 }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: EXC }}>Excluded</p>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#dc2626' }}>{excludedProducts.length}</p>
        </div>
      </div>

      {/* Active filters */}
      {filterCriteria && (filterCriteria.brands.length > 0 || filterCriteria.categories.length > 0) && (
        <div style={{ backgroundColor: BG_SUBTLE, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 16, marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 12px', fontWeight: 500, color: TEXT }}>Active Filters</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filterCriteria.brands.map((brand) => (
              <span key={brand} style={{ padding: '4px 12px', backgroundColor: ACCENT, color: '#fff', fontSize: 13, borderRadius: 999 }}>Brand: {brand}</span>
            ))}
            {filterCriteria.categories.map((cat) => (
              <span key={cat} style={{ padding: '4px 12px', backgroundColor: VI, color: '#fff', fontSize: 13, borderRadius: 999 }}>Category: {cat}</span>
            ))}
            <span style={{ padding: '4px 12px', backgroundColor: '#f59e0b', color: '#fff', fontSize: 13, borderRadius: 999 }}>${filterCriteria.priceRange.min} - ${filterCriteria.priceRange.max}</span>
          </div>
        </div>
      )}

      {/* Included list */}
      {includedData.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ margin: '0 0 12px', fontWeight: 500, color: TEXT, display: 'flex', alignItems: 'center', gap: 8 }}>
            <PlusIcon size={15} color={INC} /> Included Products ({includedData.length})
          </h4>
          <div style={{ backgroundColor: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            {includedData.map((product, i) => (
              <div key={product.id} style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16, borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                <img src={product.image || '/placeholder.svg'} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', backgroundColor: BG_MUTED, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: '0 0 2px', fontWeight: 500, color: TEXT, fontSize: 14 }}>{product.name}</h5>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>{product.brand} • ${product.price}</p>
                </div>
                <button onClick={() => onRemoveIncluded(product.id)} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, display: 'flex', color: EXC }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <TrashIcon size={15} color={EXC} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Excluded list */}
      {excludedData.length > 0 && (
        <div>
          <h4 style={{ margin: '0 0 12px', fontWeight: 500, color: TEXT, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MinusIcon size={15} color={EXC} /> Excluded Products ({excludedData.length})
          </h4>
          <div style={{ backgroundColor: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            {excludedData.map((product, i) => (
              <div key={product.id} style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16, opacity: 0.6, borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                <img src={product.image || '/placeholder.svg'} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', backgroundColor: BG_MUTED, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: '0 0 2px', fontWeight: 500, color: TEXT, fontSize: 14 }}>{product.name}</h5>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>{product.brand} • ${product.price}</p>
                </div>
                <button onClick={() => onRemoveExcluded(product.id)} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, display: 'flex' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <PlusIcon size={15} color={INC} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {includedData.length === 0 && excludedData.length === 0 && !filterCriteria && (
        <EmptyState
          icon={<AlertCircleIcon size={28} color={TEXT_SUB} />}
          iconBg="transparent"
          message="No products selected. Go back and select some products to include in your campaign."
          paddingY={48}
        />
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function FilterSection({ label, filterKey, expanded, onToggle, children }) {
  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, marginTop: 12 }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 0', fontFamily: FONT }}>
        <span style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{label}</span>
        {expanded ? <ChevronDownIcon size={15} color={TEXT_MID} /> : <ChevronRightIcon size={15} color={TEXT_MID} />}
      </button>
      {expanded && <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>}
    </div>
  );
}

function ExcludeBtn({ excluded, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontSize: 12, padding: '3px 10px', borderRadius: 6, cursor: 'pointer', border: 'none', fontFamily: FONT, transition: 'all 0.15s',
        backgroundColor: excluded ? EXC : hover ? 'rgba(239,68,68,0.1)' : BG_MUTED,
        color: excluded ? '#fff' : hover ? EXC : TEXT_MID,
      }}
    >
      {excluded ? 'Excluded' : 'Exclude'}
    </button>
  );
}
