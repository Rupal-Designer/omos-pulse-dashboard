import { useState } from "react";
import { Button, Input, Select, Icon, CheckIcon, PlusIcon, TrashIcon, SearchIcon, FilterIcon, CalendarIcon } from '../../../ui';

// ─── Design tokens ────────────────────────────────────────────────────────────
const FONT    = "'Open Sans', sans-serif";
const TEXT    = 'var(--osmos-fg)';
const TEXT_MID= 'var(--osmos-fg-muted)';
const TEXT_SUB= 'var(--osmos-fg-subtle)';
const BORDER  = 'var(--osmos-border)';
const BG      = 'var(--osmos-bg)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M= 'var(--osmos-brand-primary-muted)';
const GREEN   = 'var(--osmos-brand-green)';
const AMBER   = 'var(--osmos-brand-amber)';

// ─── Hand-rolled SVG icons (not in ui exports) ────────────────────────────────
function MapPinIcon(props) {
  return (
    <Icon {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </Icon>
  );
}
function StoreIcon(props) {
  return (
    <Icon {...props}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
    </Icon>
  );
}
function MonitorIcon(props) {
  return (
    <Icon {...props}>
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <path d="M8 21h8m-4-4v4"/>
    </Icon>
  );
}
function DollarSignIcon(props) {
  return (
    <Icon {...props}>
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </Icon>
  );
}
function RotateCcwIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </Icon>
  );
}
function ShoppingCartIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </Icon>
  );
}
function PackageIcon(props) {
  return (
    <Icon {...props}>
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </Icon>
  );
}
function ImageIconSvg(props) {
  return (
    <Icon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </Icon>
  );
}
function HelpCircleIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <path d="M12 17h.01"/>
    </Icon>
  );
}
function InfoIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </Icon>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const storeLocations = [
  { id: 1, name: "Downtown Flagship Store", city: "New York", state: "NY", screens: 24, dailyFootfall: "15K", avgDwellTime: "45 min" },
  { id: 2, name: "Mall of America", city: "Minneapolis", state: "MN", screens: 18, dailyFootfall: "22K", avgDwellTime: "60 min" },
  { id: 3, name: "Beverly Center", city: "Los Angeles", state: "CA", screens: 12, dailyFootfall: "12K", avgDwellTime: "35 min" },
  { id: 4, name: "Michigan Avenue Store", city: "Chicago", state: "IL", screens: 16, dailyFootfall: "18K", avgDwellTime: "40 min" },
  { id: 5, name: "Union Square", city: "San Francisco", state: "CA", screens: 10, dailyFootfall: "9K", avgDwellTime: "30 min" },
  { id: 6, name: "Galleria Dallas", city: "Dallas", state: "TX", screens: 14, dailyFootfall: "14K", avgDwellTime: "50 min" },
];
const screenZones = [
  { id: 1, name: "Store Entrance", description: "High visibility screens at entry points", avgImpressions: "8.5K/day", screens: 45, stores: 12 },
  { id: 2, name: "Checkout Area", description: "Screens near POS terminals", avgImpressions: "12K/day", screens: 68, stores: 18 },
  { id: 3, name: "Aisle End Caps", description: "Digital displays at aisle ends", avgImpressions: "6.2K/day", screens: 120, stores: 20 },
  { id: 4, name: "Department Sections", description: "Category-specific placements", avgImpressions: "4.8K/day", screens: 85, stores: 15 },
  { id: 5, name: "Fitting Rooms", description: "Interactive screens in fitting areas", avgImpressions: "2.1K/day", screens: 32, stores: 10 },
  { id: 6, name: "Window Displays", description: "Outward-facing digital windows", avgImpressions: "15K/day", screens: 28, stores: 14 },
  { id: 7, name: "Frozen Section", description: "Screens near frozen food aisles", avgImpressions: "5.4K/day", screens: 42, stores: 16 },
  { id: 8, name: "Dairy Section", description: "Digital displays in dairy area", avgImpressions: "4.9K/day", screens: 38, stores: 14 },
  { id: 9, name: "Bakery Counter", description: "Screens at bakery service area", avgImpressions: "3.8K/day", screens: 25, stores: 12 },
  { id: 10, name: "Deli Counter", description: "Digital menu boards at deli", avgImpressions: "4.2K/day", screens: 30, stores: 11 },
  { id: 11, name: "Pharmacy Area", description: "Health-focused screen placements", avgImpressions: "3.1K/day", screens: 22, stores: 8 },
  { id: 12, name: "Electronics Section", description: "Tech demo and promo screens", avgImpressions: "6.8K/day", screens: 55, stores: 15 },
  { id: 13, name: "Customer Service", description: "Screens near service desk", avgImpressions: "2.8K/day", screens: 18, stores: 18 },
  { id: 14, name: "Waiting Areas", description: "Screens in seating/waiting zones", avgImpressions: "3.5K/day", screens: 24, stores: 10 },
  { id: 15, name: "Meat Counter", description: "Digital displays at meat section", avgImpressions: "4.1K/day", screens: 28, stores: 12 },
];
const screenFormats = [
  { id: "digital_signage", name: "Digital Signage", dimensions: "1920 x 1080", orientation: "Landscape" },
  { id: "vertical_display", name: "Vertical Display", dimensions: "1080 x 1920", orientation: "Portrait" },
  { id: "interactive_kiosk", name: "Interactive Kiosk", dimensions: "1080 x 1920", orientation: "Portrait" },
  { id: "shelf_edge", name: "Shelf Edge Display", dimensions: "800 x 480", orientation: "Landscape" },
  { id: "video_wall", name: "Video Wall", dimensions: "3840 x 2160", orientation: "Landscape" },
];
const filterCriteria = [
  { id: "product_category", label: "Product Category" },
  { id: "brand", label: "Brand" },
  { id: "price_range", label: "Price Range" },
  { id: "sku", label: "SKU" },
  { id: "department", label: "Department" },
  { id: "supplier", label: "Supplier" },
];
const filterOperators = [
  { id: "contains", label: "contains" },
  { id: "equals", label: "equals" },
  { id: "starts_with", label: "starts with" },
  { id: "ends_with", label: "ends with" },
  { id: "not_equals", label: "does not equal" },
];
const sampleScreens = [
  { id: "1", name: "Billing_Back Screen", store: "FreshMart Central", city: "San Francisco", state: "CA", tags: ["Fruits", "Veggies", "+2"] },
  { id: "2", name: "Checkout Screen 1", store: "FreshMart North", city: "San Francisco", state: "CA", tags: ["East"] },
  { id: "3", name: "Frozen Section Screen", store: "FreshMart South", city: "San Francisco", state: "CA", tags: ["North"] },
  { id: "4", name: "Bakery Screen", store: "FreshMart East", city: "San Diego", state: "CA", tags: ["Clothes", "Care"] },
  { id: "5", name: "Dairy Section Screen", store: "FreshMart West", city: "San Diego", state: "CA", tags: ["North", "West"] },
  { id: "6", name: "Meat Counter Screen", store: "FreshMart Central", city: "San Diego", state: "CA", tags: ["East"], isNew: true },
  { id: "7", name: "Seafood Section Screen", store: "FreshMart North", city: "Oakland", state: "CA", tags: ["West"], isNew: true },
  { id: "8", name: "Health Foods Aisle Screen", store: "FreshMart West", city: "Oakland", state: "CA", tags: ["West"], isNew: true },
  { id: "9", name: "Waiting Areas", store: "FreshMart West", city: "Oakland", state: "CA", tags: ["West", "East"], isNew: true },
  { id: "10", name: "Entry Point", store: "FreshMart West", city: "Oakland", state: "CA", tags: ["West"], isNew: true },
];

// ─── Main component ───────────────────────────────────────────────────────────
function InstoreAdGroupWizard({ open, onClose, onSave, campaignName = "In-store Campaign" }) {
  const [adGroupName, setAdGroupName] = useState("In-store Ad Group 1");
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState(["summary"]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [productSelectionMode, setProductSelectionMode] = useState("filters");
  const [productFilters, setProductFilters] = useState([
    { criteria: "product_category", operator: "contains", value: "" },
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [excludedProducts, setExcludedProducts] = useState([]);
  const [schedulingType, setSchedulingType] = useState("always");
  const [selectedDays, setSelectedDays] = useState(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
  const [timeSlots, setTimeSlots] = useState({ start: "09:00", end: "21:00" });
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [pricingModel, setPricingModel] = useState("cpm");
  const [bidAmount, setBidAmount] = useState("5.00");
  const [screenSelectionMode, setScreenSelectionMode] = useState("filter");
  const [filterRules, setFilterRules] = useState([
    { field: "State", operator: "is", value: "California" },
  ]);
  const [selectedScreens, setSelectedScreens] = useState([]);

  const steps = [
    { id: 1, name: "Screen Selection", IconComp: MonitorIcon },
    { id: 2, name: "Products", IconComp: PackageIcon },
    { id: 3, name: "Scheduling", IconComp: CalendarIcon },
    { id: 4, name: "Creative", IconComp: ImageIconSvg },
    { id: 5, name: "Bidding", IconComp: DollarSignIcon },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const addProductFilter = () => {
    setProductFilters([...productFilters, { criteria: "product_category", operator: "contains", value: "" }]);
  };
  const removeProductFilter = (index) => {
    setProductFilters(productFilters.filter((_, i) => i !== index));
  };
  const updateProductFilter = (index, field, value) => {
    const updated = [...productFilters];
    updated[index] = { ...updated[index], [field]: value };
    setProductFilters(updated);
  };

  const eligibleScreens = screenSelectionMode === "filter" ? filterRules.length * 10 : selectedScreens.length;
  const selectedZonesCount = 0;

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed', right: 0, top: 0, zIndex: 60, height: '100%',
          background: BG, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', transition: 'transform 0.3s',
          width: '85%', fontFamily: FONT,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: TEXT_MID }}>{campaignName || "In-Store Digital Campaign"}</span>
            <span style={{ color: TEXT_SUB }}>&gt;</span>
            <span style={{ color: TEXT, fontWeight: 500 }}>{adGroupName || "New Ad Group"}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: ACCENT, textDecoration: 'none' }}
            >
              <HelpCircleIcon size={16} />
              How to create an In-store Ad Group?
            </a>
            <CloseButton onClick={onClose} />
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div style={{
            width: 256, borderRight: `1px solid ${BORDER}`, background: BG_SUB,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ padding: 16, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <StepButton
                      key={step.id}
                      step={step}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      onClick={() => setCurrentStep(step.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ad Group Summary */}
            <div style={{ borderTop: `1px solid ${BORDER}`, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <StoreIcon size={16} color={ACCENT} />
                <span style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>Ad Group Summary</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: TEXT_MID }}>Screens</span>
                  <span style={{ color: TEXT, fontWeight: 500 }}>{eligibleScreens}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: TEXT_MID }}>Products</span>
                  <span style={{ color: TEXT, fontWeight: 500 }}>
                    {productFilters.length > 0 ? `${productFilters.length} filters` : "0 filters"}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: TEXT_MID }}>Formats</span>
                  <span style={{ color: TEXT, fontWeight: 500 }}>{selectedFormats.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f8f9fb' }}>
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Ad Group Details</h2>
                  <p style={{ color: TEXT_MID, fontSize: 13, margin: '0 0 16px' }}>
                    Name your ad group and select screens for targeting.
                  </p>
                </div>

                <div style={{
                  background: BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20,
                }}>
                  <label style={{ display: 'block', color: TEXT, fontWeight: 500, marginBottom: 8, fontSize: 13 }}>
                    Ad Group Name
                  </label>
                  <Input
                    value={adGroupName}
                    onChange={(e) => setAdGroupName(e.target.value)}
                    placeholder="Enter ad group name"
                    style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT, height: 44 }}
                  />
                </div>

                <ScreenSelectionStep
                  selectionMode={screenSelectionMode}
                  setSelectionMode={setScreenSelectionMode}
                  filterRules={filterRules}
                  setFilterRules={setFilterRules}
                  selectedScreens={selectedScreens}
                  setSelectedScreens={setSelectedScreens}
                  stores={storeLocations}
                  selectedStores={selectedStores}
                  setSelectedStores={setSelectedStores}
                />
              </div>
            )}

            {currentStep === 2 && (
              <ProductsStep
                mode={productSelectionMode}
                setMode={setProductSelectionMode}
                filters={productFilters}
                addFilter={addProductFilter}
                removeFilter={removeProductFilter}
                updateFilter={updateProductFilter}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                excludedProducts={excludedProducts}
                setExcludedProducts={setExcludedProducts}
              />
            )}

            {currentStep === 3 && (
              <SchedulingStep
                schedulingType={schedulingType}
                setSchedulingType={setSchedulingType}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                timeSlots={timeSlots}
                setTimeSlots={setTimeSlots}
              />
            )}

            {currentStep === 4 && (
              <CreativeStep
                formats={screenFormats}
                selectedFormats={selectedFormats}
                setSelectedFormats={setSelectedFormats}
                creatives={creatives}
                setCreatives={setCreatives}
              />
            )}

            {currentStep === 5 && (
              <BiddingStep
                pricingModel={pricingModel}
                setPricingModel={setPricingModel}
                bidAmount={bidAmount}
                setBidAmount={setBidAmount}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${BORDER}`, background: BG, padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: TEXT_MID }}>
            Step {currentStep} of {steps.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (currentStep < steps.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  onSave?.({
                    name: adGroupName,
                    screens: eligibleScreens,
                    zones: selectedZonesCount,
                    products: {
                      mode: productSelectionMode,
                      filters: productFilters,
                      included: selectedProducts,
                      excluded: excludedProducts,
                    },
                    scheduling: { type: schedulingType, days: selectedDays, timeSlots },
                    formats: selectedFormats,
                    creatives,
                    pricing: { model: pricingModel, bid: bidAmount },
                  });
                  onClose();
                }
              }}
            >
              {currentStep === steps.length ? "Save Ad Group" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Close button (inline hover) ─────────────────────────────────────────────
function CloseButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        color: hov ? TEXT : TEXT_MID, transition: 'color 0.15s',
      }}
    >
      <Icon size={20}>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </Icon>
    </button>
  );
}

// ─── Step button (sidebar) ────────────────────────────────────────────────────
function StepButton({ step, isActive, isCompleted, onClick }) {
  const [hov, setHov] = useState(false);
  const bg = isActive ? ACCENT : (hov ? BORDER : 'transparent');
  const color = isActive ? '#fff' : (isCompleted ? TEXT : TEXT_MID);
  const badgeBg = isActive ? 'rgba(255,255,255,0.2)' : (isCompleted ? GREEN : BORDER);
  const badgeColor = isActive ? '#fff' : (isCompleted ? '#fff' : TEXT_MID);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
        background: bg, color, textAlign: 'left', transition: 'all 0.15s', fontFamily: FONT,
      }}
    >
      <div style={{
        width: 24, height: 24, borderRadius: 999, background: badgeBg, color: badgeColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 500, flexShrink: 0,
      }}>
        {isCompleted ? <CheckIcon size={12} /> : step.id}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{step.name}</span>
    </button>
  );
}

// ─── BasicsStep ───────────────────────────────────────────────────────────────
function BasicsStep({ stores, selectedStores, setSelectedStores }) {
  const toggleStore = (id) => {
    setSelectedStores(
      selectedStores.includes(id) ? selectedStores.filter((s) => s !== id) : [...selectedStores, id]
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Select Store Locations</h2>
        <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
          Choose the retail locations where your in-store ads will be displayed.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            selected={selectedStores.includes(store.id)}
            onToggle={() => toggleStore(store.id)}
          />
        ))}
      </div>

      {selectedStores.length > 0 && (
        <div style={{
          background: BG_SUB, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>{selectedStores.length} stores selected</div>
              <div style={{ color: TEXT_MID, fontSize: 13 }}>
                Total screens:{' '}
                {stores.filter((s) => selectedStores.includes(s.id)).reduce((acc, s) => acc + s.screens, 0)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>
                {stores
                  .filter((s) => selectedStores.includes(s.id))
                  .reduce((acc, s) => acc + Number.parseInt(s.dailyFootfall.replace("K", "000")), 0)
                  .toLocaleString()}
              </div>
              <div style={{ color: TEXT_MID, fontSize: 13 }}>Combined daily footfall</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StoreCard({ store, selected, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
        border: selected ? `1px solid ${ACCENT}` : `1px solid ${hov ? '#c5c5c5' : BORDER}`,
        background: selected ? ACCENT_M : BG,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 999, border: `2px solid ${selected ? ACCENT : '#c5c5c5'}`,
          background: selected ? ACCENT : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
        }}>
          {selected && <CheckIcon size={12} color="#fff" />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <StoreIcon size={16} color={ACCENT} />
            <span style={{ fontWeight: 600, color: TEXT, fontSize: 13 }}>{store.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: TEXT_MID, marginBottom: 12 }}>
            <MapPinIcon size={12} />
            <span>{store.city}, {store.state}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, fontSize: 13 }}>
            <div>
              <div style={{ color: TEXT_MID }}>Screens</div>
              <div style={{ color: TEXT, fontWeight: 500 }}>{store.screens}</div>
            </div>
            <div>
              <div style={{ color: TEXT_MID }}>Daily Footfall</div>
              <div style={{ color: TEXT, fontWeight: 500 }}>{store.dailyFootfall}</div>
            </div>
            <div>
              <div style={{ color: TEXT_MID }}>Avg. Dwell</div>
              <div style={{ color: TEXT, fontWeight: 500 }}>{store.avgDwellTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ProductsStep ─────────────────────────────────────────────────────────────
function ProductsStep({ mode, setMode, filters, addFilter, removeFilter, updateFilter, selectedProducts, setSelectedProducts, excludedProducts, setExcludedProducts }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Product Selection</h2>
        <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
          Choose which products to feature in your in-store ads. Products matching your criteria will be dynamically displayed.
        </p>
      </div>

      {/* Selection Mode */}
      <div style={{ background: BG_SUB, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}` }}>
        <label style={{ display: 'block', color: TEXT, marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
          Selection Method
        </label>
        <Select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          options={[
            { value: "filters", label: "Select Products using Filters" },
            { value: "include", label: "Select Individual Products to Include" },
            { value: "exclude", label: "Select Individual Products to Exclude" },
          ]}
        />
      </div>

      {/* Filter-based selection */}
      {mode === "filters" && (
        <div style={{ background: BG_SUB, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
              Products will be automatically added to campaign matching filter condition.
            </p>
            <a href="#" style={{ color: ACCENT, fontSize: 13 }}>Guide to select a product by filters</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filters.map((filter, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Select
                  value={filter.criteria}
                  onChange={(e) => updateFilter(index, "criteria", e.target.value)}
                  options={filterCriteria.map((c) => ({ value: c.id, label: c.label }))}
                  style={{ width: 192 }}
                />
                <Select
                  value={filter.operator}
                  onChange={(e) => updateFilter(index, "operator", e.target.value)}
                  options={filterOperators.map((o) => ({ value: o.id, label: o.label }))}
                  style={{ width: 144 }}
                />
                <Input
                  value={filter.value}
                  onChange={(e) => updateFilter(index, "value", e.target.value)}
                  placeholder="Enter value..."
                  style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, color: TEXT }}
                />
                <RemoveButton
                  onClick={() => removeFilter(index)}
                  disabled={filters.length === 1}
                />
              </div>
            ))}
          </div>

          <TextButton onClick={addFilter} style={{ marginTop: 16 }}>
            <PlusIcon size={16} />
            Add another filter
          </TextButton>
        </div>
      )}

      {/* Individual product selection */}
      {(mode === "include" || mode === "exclude") && (
        <div style={{ background: BG_SUB, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}` }}>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <ShoppingCartIcon size={48} color="#c5c5c5" style={{ display: 'block', margin: '0 auto 16px' }} />
            <h3 style={{ color: TEXT, fontWeight: 500, margin: '0 0 8px', fontSize: 14 }}>
              {mode === "include" ? "Select products to include" : "Select products to exclude"}
            </h3>
            <p style={{ color: TEXT_MID, fontSize: 13, margin: '0 0 16px' }}>
              Browse and select individual products from your catalog.
            </p>
            <Button variant="primary">Browse Product Catalog</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SchedulingStep ───────────────────────────────────────────────────────────
function SchedulingStep({ schedulingType, setSchedulingType, selectedDays, setSelectedDays, timeSlots, setTimeSlots }) {
  const days = [
    { id: "mon", label: "Mon" }, { id: "tue", label: "Tue" }, { id: "wed", label: "Wed" },
    { id: "thu", label: "Thu" }, { id: "fri", label: "Fri" }, { id: "sat", label: "Sat" },
    { id: "sun", label: "Sun" },
  ];
  const toggleDay = (dayId) => {
    setSelectedDays(
      selectedDays.includes(dayId) ? selectedDays.filter((d) => d !== dayId) : [...selectedDays, dayId]
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Scheduling & Dayparting</h2>
        <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
          Choose when your ads should be displayed. You can run ads continuously or set specific schedules.
        </p>
      </div>

      {/* Scheduling Type */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SchedulingOption
          active={schedulingType === "always"}
          onClick={() => setSchedulingType("always")}
          title="Run ads continuously"
          description="Ads will be displayed during all store operating hours"
        />
        <SchedulingOption
          active={schedulingType === "custom"}
          onClick={() => setSchedulingType("custom")}
          title="Custom schedule"
          description="Set specific days and times for ad display"
        />
      </div>

      {/* Custom Schedule */}
      {schedulingType === "custom" && (
        <div style={{
          background: BG_SUB, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* Days */}
          <div>
            <label style={{ display: 'block', color: TEXT, marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
              Select Days
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {days.map((day) => (
                <DayButton
                  key={day.id}
                  label={day.label}
                  active={selectedDays.includes(day.id)}
                  onClick={() => toggleDay(day.id)}
                />
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label style={{ display: 'block', color: TEXT, marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
              Time Range
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: TEXT_MID, fontSize: 12, marginBottom: 4 }}>Start Time</label>
                <Input
                  type="time"
                  value={timeSlots.start}
                  onChange={(e) => setTimeSlots({ ...timeSlots, start: e.target.value })}
                  style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT }}
                />
              </div>
              <span style={{ color: TEXT_MID, marginTop: 20 }}>to</span>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: TEXT_MID, fontSize: 12, marginBottom: 4 }}>End Time</label>
                <Input
                  type="time"
                  value={timeSlots.end}
                  onChange={(e) => setTimeSlots({ ...timeSlots, end: e.target.value })}
                  style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SchedulingOption({ active, onClick, title, description }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
        border: active ? `1px solid ${ACCENT}` : `1px solid ${hov ? '#c5c5c5' : BORDER}`,
        background: active ? ACCENT_M : BG,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 999, border: `2px solid ${active ? ACCENT : '#c5c5c5'}`,
          background: active ? ACCENT : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {active && <CheckIcon size={12} color="#fff" />}
        </div>
        <div>
          <div style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{title}</div>
          <div style={{ fontSize: 13, color: TEXT_MID }}>{description}</div>
        </div>
      </div>
    </div>
  );
}

function DayButton({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.15s', border: 'none',
        background: active ? ACCENT : BG,
        color: active ? '#fff' : hov ? TEXT : TEXT_MID,
        boxShadow: active ? 'none' : `0 0 0 1px ${hov ? '#c5c5c5' : BORDER}`,
        fontFamily: FONT,
      }}
    >
      {label}
    </button>
  );
}

// ─── CreativeStep ─────────────────────────────────────────────────────────────
function CreativeStep({ formats, selectedFormats, setSelectedFormats, creatives, setCreatives }) {
  const toggleFormat = (id) => {
    setSelectedFormats(
      selectedFormats.includes(id) ? selectedFormats.filter((f) => f !== id) : [...selectedFormats, id]
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Creative Assets</h2>
        <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
          Select the screen formats you want to target and upload your creative assets.
        </p>
      </div>

      {/* Format Selection */}
      <div>
        <label style={{ display: 'block', color: TEXT, fontWeight: 500, marginBottom: 12, fontSize: 13 }}>
          Select Screen Formats
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {formats.map((format) => (
            <FormatCard
              key={format.id}
              format={format}
              selected={selectedFormats.includes(format.id)}
              onToggle={() => toggleFormat(format.id)}
            />
          ))}
        </div>
      </div>

      {/* Upload Area */}
      {selectedFormats.length > 0 && (
        <div style={{ background: BG_SUB, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}` }}>
          <label style={{ display: 'block', color: TEXT, fontWeight: 500, marginBottom: 12, fontSize: 13 }}>
            Upload Creatives
          </label>
          <div style={{
            border: `2px dashed ${BORDER}`, borderRadius: 12, padding: 32,
            textAlign: 'center', background: BG,
          }}>
            <MonitorIcon size={48} color="#c5c5c5" style={{ display: 'block', margin: '0 auto 16px' }} />
            <h3 style={{ color: TEXT, fontWeight: 500, margin: '0 0 8px', fontSize: 14 }}>
              Drag and drop your creative files
            </h3>
            <p style={{ color: TEXT_MID, fontSize: 13, margin: '0 0 16px' }}>
              Supported formats: JPG, PNG, MP4, GIF • Max file size: 50MB
            </p>
            <Button variant="outline">Browse Files</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FormatCard({ format, selected, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
        border: selected ? `1px solid ${ACCENT}` : `1px solid ${hov ? '#c5c5c5' : BORDER}`,
        background: selected ? ACCENT_M : BG,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 999, border: `2px solid ${selected ? ACCENT : '#c5c5c5'}`,
          background: selected ? ACCENT : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
        }}>
          {selected && <CheckIcon size={12} color="#fff" />}
        </div>
        <div>
          <div style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{format.name}</div>
          <div style={{ fontSize: 13, color: TEXT_MID }}>{format.dimensions} • {format.orientation}</div>
        </div>
      </div>
    </div>
  );
}

// ─── BiddingStep ──────────────────────────────────────────────────────────────
function BiddingStep({ pricingModel, setPricingModel, bidAmount, setBidAmount }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>Bidding & Pricing</h2>
        <p style={{ color: TEXT_MID, fontSize: 13, margin: 0 }}>
          Set your pricing model and bid amount for this ad group.
        </p>
      </div>

      {/* Pricing Model */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>Pricing Model</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          <PricingOption
            active={pricingModel === "cpm"}
            onClick={() => setPricingModel("cpm")}
            title="CPM (Cost per Mille)"
            description="Pay per 1,000 impressions"
          />
          <PricingOption
            active={pricingModel === "fixed"}
            onClick={() => setPricingModel("fixed")}
            title="Fixed Rate"
            description="Pay a fixed price per slot"
          />
        </div>
      </div>

      {/* Bid Amount */}
      <div style={{ background: BG_SUB, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}` }}>
        <label style={{ display: 'block', color: TEXT, fontWeight: 500, marginBottom: 12, fontSize: 13 }}>
          {pricingModel === "cpm" ? "CPM Bid" : "Fixed Rate"} ($)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: TEXT_MID, fontSize: 16 }}>$</span>
          <Input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            step="0.01"
            min="0"
            style={{
              width: 128, background: BG, border: `1px solid ${BORDER}`,
              color: TEXT, fontSize: 16, fontWeight: 500,
            }}
          />
          <span style={{ color: TEXT_MID, fontSize: 13 }}>
            {pricingModel === "cpm" ? "per 1,000 impressions" : "per slot"}
          </span>
        </div>

        <div style={{
          marginTop: 16, padding: 12, background: ACCENT_M, borderRadius: 8,
          border: `1px solid ${ACCENT}`, opacity: 0.8,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <InfoIcon size={16} color={ACCENT} style={{ marginTop: 2, flexShrink: 0 }} />
            <div style={{ fontSize: 13 }}>
              <span style={{ color: TEXT, fontWeight: 500 }}>Suggested bid: $4.50 - $6.50</span>
              <p style={{ color: TEXT_MID, margin: '4px 0 0' }}>
                Based on current market rates for similar in-store placements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingOption({ active, onClick, title, description }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
        border: active ? `1px solid ${ACCENT}` : `1px solid ${hov ? '#c5c5c5' : BORDER}`,
        background: active ? ACCENT_M : BG,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 999, border: `2px solid ${active ? ACCENT : '#c5c5c5'}`,
          background: active ? ACCENT : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {active && <CheckIcon size={12} color="#fff" />}
        </div>
        <div>
          <div style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{title}</div>
          <div style={{ fontSize: 13, color: TEXT_MID }}>{description}</div>
        </div>
      </div>
    </div>
  );
}

// ─── ScreenSelectionStep ──────────────────────────────────────────────────────
function ScreenSelectionStep({ selectionMode, setSelectionMode, filterRules, setFilterRules, selectedScreens, setSelectedScreens, stores, selectedStores, setSelectedStores }) {
  const [screenSearchQuery, setScreenSearchQuery] = useState("");

  const handleAddFilter = () => {
    setFilterRules([...filterRules, { field: "Placement Category", operator: "is", value: "" }]);
  };
  const handleRemoveFilter = (index) => {
    setFilterRules(filterRules.filter((_, i) => i !== index));
  };
  const handleUpdateFilter = (index, key, value) => {
    const newFilters = [...filterRules];
    newFilters[index] = { ...newFilters[index], [key]: value };
    setFilterRules(newFilters);
  };
  const handleScreenToggle = (screenId) => {
    setSelectedScreens((prev) =>
      prev.includes(screenId) ? prev.filter((id) => id !== screenId) : [...prev, screenId]
    );
  };
  const handleSelectAllScreens = () => {
    if (selectedScreens.length === sampleScreens.length) {
      setSelectedScreens([]);
    } else {
      setSelectedScreens(sampleScreens.map((s) => s.id));
    }
  };
  const handleResetFilters = () => {
    setFilterRules([{ field: "Placement Category", operator: "is", value: "" }]);
    setSelectedScreens([]);
  };

  const filterFields = ["Placement Category", "Store", "City", "State", "Screen Type", "Tag"];
  const filterOperators2 = ["is", "is not", "contains", "does not contain"];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Selection Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: TEXT }}>
          <input
            type="radio"
            checked={selectionMode === "filter"}
            onChange={() => setSelectionMode("filter")}
            style={{ width: 16, height: 16, accentColor: ACCENT }}
          />
          Select screens by filter
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: TEXT }}>
          <input
            type="radio"
            checked={selectionMode === "individual"}
            onChange={() => setSelectionMode("individual")}
            style={{ width: 16, height: 16, accentColor: ACCENT }}
          />
          Select screens individually
        </label>
        <TextButton onClick={handleResetFilters} style={{ marginLeft: 'auto' }}>
          <RotateCcwIcon size={14} />
          Reset
        </TextButton>
      </div>

      {/* Filter Mode */}
      {selectionMode === "filter" && (
        <div style={{
          background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16,
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <Button
              variant="outline"
              onClick={handleAddFilter}
              style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, color: ACCENT, borderColor: ACCENT }}
            >
              <PlusIcon size={16} /> Rule
            </Button>
            <Button
              variant="outline"
              style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, color: TEXT_MID }}
            >
              <PlusIcon size={16} /> Rule Group
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filterRules.map((filter, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', color: TEXT_MID }}>
                  <div style={{
                    width: 16, height: 16,
                    borderLeft: `2px solid ${BORDER}`,
                    borderBottom: `2px solid ${BORDER}`,
                  }} />
                </div>
                <Select
                  value={filter.field}
                  onChange={(e) => handleUpdateFilter(index, "field", e.target.value)}
                  options={filterFields.map((f) => ({ value: f, label: f }))}
                  style={{ width: 180 }}
                />
                <Select
                  value={filter.operator}
                  onChange={(e) => handleUpdateFilter(index, "operator", e.target.value)}
                  options={filterOperators2.map((op) => ({ value: op, label: op }))}
                  style={{ width: 120 }}
                />
                <Select
                  value={filter.value}
                  onChange={(e) => handleUpdateFilter(index, "value", e.target.value)}
                  options={[
                    { value: "California", label: "California" },
                    { value: "Colorado", label: "Colorado" },
                    { value: "New York", label: "New York" },
                    { value: "Home Goods", label: "Home Goods" },
                    { value: "Electronics", label: "Electronics" },
                  ]}
                  style={{ width: 200 }}
                />
                {/* Copy icon */}
                <button
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                    color: TEXT_MID,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
                <RemoveButton onClick={() => handleRemoveFilter(index)} />
              </div>
            ))}
          </div>

          {/* Active Filter Tags */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 16,
            paddingTop: 16, borderTop: `1px solid ${BORDER}`, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 13, color: TEXT_MID }}>Active filters:</span>
            {filterRules.filter((f) => f.value).map((filter, index) => (
              <FilterTag
                key={index}
                label={`${filter.field} ${filter.operator} ${filter.value}`}
                onRemove={() => handleRemoveFilter(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Individual Selection Mode */}
      {selectionMode === "individual" && (
        <div style={{
          background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>
              {selectedScreens.length} Screens Selected
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ position: 'relative' }}>
                <SearchIcon
                  size={16}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: TEXT_MID }}
                />
                <Input
                  placeholder="Search Screen Name"
                  value={screenSearchQuery}
                  onChange={(e) => setScreenSearchQuery(e.target.value)}
                  style={{
                    paddingLeft: 36, width: 256, border: `1px solid ${BORDER}`,
                    background: BG, color: TEXT,
                  }}
                />
              </div>
              <Button variant="outline" style={{ padding: '0 10px' }}>
                <FilterIcon size={16} />
              </Button>
            </div>
          </div>

          {/* Screens Table */}
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: BG_SUB }}>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>
                    <input
                      type="checkbox"
                      checked={selectedScreens.length === sampleScreens.length}
                      onChange={handleSelectAllScreens}
                      style={{ borderRadius: 4, accentColor: ACCENT }}
                    />
                  </th>
                  {["Screen Name", "Store", "City", "State", "Tag"].map((h) => (
                    <th key={h} style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 500, color: TEXT_MID }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleScreens.map((screen) => (
                  <ScreenRow
                    key={screen.id}
                    screen={screen}
                    selected={selectedScreens.includes(screen.id)}
                    onToggle={() => handleScreenToggle(screen.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenRow({ screen, selected, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: `1px solid ${BORDER}`,
        background: hov ? BG_SUB : BG,
        transition: 'background 0.1s',
      }}
    >
      <td style={{ padding: 12 }}>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          style={{ borderRadius: 4, accentColor: ACCENT }}
        />
      </td>
      <td style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 40, height: 40, background: ACCENT_M, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MonitorIcon size={16} color={ACCENT} />
          </div>
          <div>
            <span style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{screen.name}</span>
            {screen.isNew && (
              <span style={{ marginLeft: 8, fontSize: 12, color: GREEN }}>New</span>
            )}
          </div>
        </div>
      </td>
      <td style={{ padding: 12, fontSize: 13, color: TEXT_MID }}>{screen.store}</td>
      <td style={{ padding: 12, fontSize: 13, color: TEXT_MID }}>{screen.city}</td>
      <td style={{ padding: 12, fontSize: 13, color: TEXT_MID }}>{screen.state}</td>
      <td style={{ padding: 12, fontSize: 13, color: TEXT_MID }}>{screen.tags.join(", ")}</td>
    </tr>
  );
}

// ─── Tiny reusable helpers ────────────────────────────────────────────────────
function RemoveButton({ onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: disabled ? 'default' : 'pointer',
        padding: 8, color: hov && !disabled ? '#ef4444' : TEXT_MID,
        transition: 'color 0.15s', opacity: disabled ? 0.4 : 1,
      }}
    >
      <TrashIcon size={16} />
    </button>
  );
}

function TextButton({ onClick, children, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', gap: 8,
        color: ACCENT, fontSize: 13, textDecoration: hov ? 'underline' : 'none',
        fontFamily: FONT, ...style,
      }}
    >
      {children}
    </button>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 8px', background: ACCENT_M, color: ACCENT,
      fontSize: 12, borderRadius: 999,
    }}>
      {label}
      <button
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', lineHeight: 1 }}
      >
        <Icon size={12}>
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </Icon>
      </button>
    </span>
  );
}

export { InstoreAdGroupWizard };
