import { useState } from "react";
import {
  CloseIcon,
  EditIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
  CheckIcon,
  Icon,
} from '../../../ui';
import { Button } from '../../../ui';
import { Checkbox } from '../../../ui';
import { Stepper } from '../../../ui';
import { Modal } from '../../../ui';
import { RadioCard, RadioDot } from '../../../ui';
import { InventoryDetailsDrawer } from './inventory-details-drawer';
import { ProductSelectionDrawer } from './product-selection-drawer';

// ─── Design tokens ────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const TEXT_SUB  = 'var(--osmos-fg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const GREEN     = 'var(--osmos-brand-green)';
const GREEN_M   = 'var(--osmos-brand-green-muted)';
const VI        = 'var(--osmos-brand-violet)';  // violet-primary — AI brand
const VI_BG     = 'var(--osmos-brand-violet-muted)';

// ─── Style constants ──────────────────────────────────────────────────────────
const SELECT_STYLE = {
  padding: '8px 32px 8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, color: TEXT, backgroundColor: BG, appearance: 'none',
  outline: 'none', width: '100%', fontFamily: FONT, cursor: 'pointer',
};

const INPUT_STYLE = {
  padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, color: TEXT, backgroundColor: BG,
  outline: 'none', fontFamily: FONT, width: '100%', boxSizing: 'border-box',
};

// ─── Hand-rolled SparklesIcon (no lucide equivalent in ui/atoms) ──────────────
const SparklesIcon = ({ size = 16, color = '#8b5cf6' }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

// ─── Round multi-select check (not RadioDot — needs multi-select semantics) ───
function RoundCheck({ checked, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${checked ? ACCENT : BORDER}`,
      backgroundColor: checked ? ACCENT : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    }}>
      {checked && <CheckIcon size={12} color="#fff" />}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const websitePages = [
  {
    name: "Home Page",
    estDailyImp: "850K",
    projectDailyImp: "875 K",
    avgDailyImp: "820 K",
    totalInventories: 8,
    targetingOptions: 5,
    tags: ["High Traffic", "Premium"],
    extraTags: 3,
  },
  {
    name: "Category Page",
    estDailyImp: "420K",
    projectDailyImp: "445 K",
    avgDailyImp: "410 K",
    totalInventories: 6,
    targetingOptions: 4,
    tags: ["High Conversion", "Contextual"],
    extraTags: 2,
  },
  {
    name: "Product Detail Page",
    estDailyImp: "680K",
    projectDailyImp: "695 K",
    avgDailyImp: "670 K",
    totalInventories: 5,
    targetingOptions: 6,
    tags: ["Purchase Intent", "High CTR"],
    extraTags: 1,
  },
  {
    name: "Search Results",
    estDailyImp: "520K",
    projectDailyImp: "535 K",
    avgDailyImp: "510 K",
    totalInventories: 4,
    targetingOptions: 7,
    tags: ["Keyword Targeted", "High Intent"],
    extraTags: 2,
  },
  {
    name: "Cart Page",
    estDailyImp: "180K",
    projectDailyImp: "190 K",
    avgDailyImp: "175 K",
    totalInventories: 3,
    targetingOptions: 3,
    tags: ["Upsell", "Cross-sell"],
    extraTags: 1,
  },
  {
    name: "Checkout Page",
    estDailyImp: "95K",
    projectDailyImp: "100 K",
    avgDailyImp: "92 K",
    totalInventories: 2,
    targetingOptions: 2,
    tags: ["Last Touch", "Premium"],
    extraTags: 0,
  },
  {
    name: "Order Confirmation",
    estDailyImp: "75K",
    projectDailyImp: "80 K",
    avgDailyImp: "72 K",
    totalInventories: 3,
    targetingOptions: 2,
    tags: ["Post-Purchase", "Loyalty"],
    extraTags: 1,
  },
  {
    name: "Account Dashboard",
    estDailyImp: "120K",
    projectDailyImp: "130 K",
    avgDailyImp: "115 K",
    totalInventories: 4,
    targetingOptions: 4,
    tags: ["Personalized", "Retention"],
    extraTags: 2,
  },
  {
    name: "Deals & Offers",
    estDailyImp: "340K",
    projectDailyImp: "355 K",
    avgDailyImp: "330 K",
    totalInventories: 6,
    targetingOptions: 5,
    tags: ["High Traffic", "Promotion"],
    extraTags: 1,
  },
];

const targetingOptions = {
  demographics: [
    { id: "age_18_24", label: "Age 18-24", reach: "2.1M" },
    { id: "age_25_34", label: "Age 25-34", reach: "3.8M" },
    { id: "age_35_44", label: "Age 35-44", reach: "2.9M" },
    { id: "age_45_54", label: "Age 45-54", reach: "1.7M" },
    { id: "age_55_plus", label: "Age 55+", reach: "1.2M" },
  ],
  interests: [
    { id: "electronics", label: "Electronics", reach: "4.2M" },
    { id: "fashion", label: "Fashion & Apparel", reach: "5.1M" },
    { id: "home_garden", label: "Home & Garden", reach: "3.3M" },
    { id: "sports", label: "Sports & Outdoors", reach: "2.8M" },
    { id: "beauty", label: "Beauty & Personal Care", reach: "3.9M" },
  ],
  behaviors: [
    { id: "frequent_buyer", label: "Frequent Buyers", reach: "1.8M" },
    { id: "cart_abandoner", label: "Cart Abandoners", reach: "2.4M" },
    { id: "new_visitor", label: "New Visitors", reach: "5.6M" },
    { id: "returning_customer", label: "Returning Customers", reach: "3.2M" },
    { id: "high_value", label: "High-Value Shoppers", reach: "890K" },
  ],
  keywords: [
    { id: "kw_1", label: "wireless headphones", volume: "45K" },
    { id: "kw_2", label: "running shoes", volume: "82K" },
    { id: "kw_3", label: "organic skincare", volume: "38K" },
    { id: "kw_4", label: "smart home devices", volume: "67K" },
    { id: "kw_5", label: "gaming laptop", volume: "54K" },
  ],
};

const adFormats = [
  {
    id: "banner_728x90",
    name: "Leaderboard Banner",
    dimensions: "728 x 90",
    type: "Display",
  },
  {
    id: "banner_300x250",
    name: "Medium Rectangle",
    dimensions: "300 x 250",
    type: "Display",
  },
  {
    id: "banner_160x600",
    name: "Wide Skyscraper",
    dimensions: "160 x 600",
    type: "Display",
  },
  {
    id: "native_feed",
    name: "Native Feed Ad",
    dimensions: "Responsive",
    type: "Native",
  },
  {
    id: "sponsored_product",
    name: "Sponsored Product",
    dimensions: "Product Card",
    type: "Native",
  },
  {
    id: "video_instream",
    name: "In-Stream Video",
    dimensions: "16:9",
    type: "Video",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CreateAdGroupDrawer({ open, onClose, onSave }) {
  const [adGroupName, setAdGroupName] = useState("Ad Group 1");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);
  const [inventoryDetailsOpen, setInventoryDetailsOpen] = useState(false);
  const [selectedPageForDetails, setSelectedPageForDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState(["summary"]);

  const [productSelectionOpen, setProductSelectionOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [selectedTargeting, setSelectedTargeting] = useState({
    demographics: [],
    interests: [],
    behaviors: [],
    keywords: [],
  });

  const [selectedAdFormat, setSelectedAdFormat] = useState(null);
  const [adCreatives, setAdCreatives] = useState([
    { headline: "", description: "", ctaText: "Shop Now" },
  ]);

  const [configSettings, setConfigSettings] = useState({
    frequencyCap: "3",
    frequencyPeriod: "day",
    deliveryType: "standard",
    dayParting: [],
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const togglePage = (index) => {
    setSelectedPages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const openInventoryDetails = (index) => {
    setSelectedPageForDetails(index);
    setInventoryDetailsOpen(true);
  };

  const toggleTargeting = (category, id) => {
    setSelectedTargeting((prev) => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter((i) => i !== id)
        : [...prev[category], id],
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave({
        name: adGroupName,
        selectedPages,
        targeting: selectedTargeting,
        adFormat: selectedAdFormat,
        creatives: adCreatives,
        productSelection: selectedProducts,
      });
      onClose();
      setCurrentStep(1);
      setSelectedPages([]);
      setSelectedTargeting({
        demographics: [],
        interests: [],
        behaviors: [],
        keywords: [],
      });
      setSelectedAdFormat(null);
      setAdCreatives([{ headline: "", description: "", ctaText: "Shop Now" }]);
      setSelectedProducts(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: 'rgba(0,0,0,0.2)' }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed', right: 0, top: 0, zIndex: 60,
          height: '100%', width: '80%',
          backgroundColor: BG_SUBTLE,
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.3s',
          fontFamily: FONT,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', backgroundColor: BG, borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              value={adGroupName}
              onChange={(e) => setAdGroupName(e.target.value)}
              style={{
                fontSize: 18, fontWeight: 600, color: TEXT, border: 'none',
                outline: 'none', background: 'transparent', fontFamily: FONT, padding: 0,
              }}
            />
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2 }}>
              <EditIcon size={16} color={TEXT_MID} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: ACCENT, textDecoration: 'none' }}
            >
              <InfoIcon size={14} color={ACCENT} />
              How to create an Ad Group?
            </a>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2 }}
            >
              <CloseIcon size={20} color={TEXT_MID} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Main content area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Stepper bar */}
            <div style={{ padding: '16px 24px', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
              <Stepper
                steps={[
                  { label: 'Inventory' },
                  { label: 'Targeting' },
                  { label: 'Ad Creation' },
                  { label: 'Configure' },
                ]}
                current={currentStep}
              />
            </div>

            {/* Step content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {currentStep === 1 && (
                <InventoryStep
                  pages={websitePages}
                  selectedPages={selectedPages}
                  togglePage={togglePage}
                  onViewDetails={openInventoryDetails}
                />
              )}
              {currentStep === 2 && (
                <TargetingStep
                  options={targetingOptions}
                  selected={selectedTargeting}
                  toggleTargeting={toggleTargeting}
                  productSelection={selectedProducts}
                  onOpenProductSelection={() => setProductSelectionOpen(true)}
                />
              )}
              {currentStep === 3 && (
                <AdCreationStep
                  formats={adFormats}
                  selectedFormat={selectedAdFormat}
                  setSelectedFormat={setSelectedAdFormat}
                  creatives={adCreatives}
                  setCreatives={setAdCreatives}
                />
              )}
              {currentStep === 4 && (
                <ConfigStep
                  settings={configSettings}
                  setSettings={setConfigSettings}
                />
              )}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 12,
              padding: '12px 24px', backgroundColor: BG, borderTop: `1px solid ${BORDER}`,
            }}>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>Back</Button>
              )}
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={handleNext}>
                {currentStep === 4 ? 'Save Ad Group' : 'Next'}
              </Button>
            </div>
          </div>

          {/* Ad Group Summary Sidebar */}
          <div style={{
            width: 256, backgroundColor: BG,
            borderLeft: `1px solid ${BORDER}`,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              backgroundColor: VI, color: '#fff',
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <ChevronRightIcon size={16} color="#fff" />
              <span style={{ fontWeight: 500, fontSize: 14 }}>Ad Group Summary</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <SummarySection
                label="Inventory Setup"
                expanded={expandedSections.includes("inventory")}
                onToggle={() => toggleSection("inventory")}
                count={selectedPages.length}
                active={currentStep === 1}
              />
              <SummarySection
                label="Targeting"
                expanded={expandedSections.includes("targeting")}
                onToggle={() => toggleSection("targeting")}
                count={Object.values(selectedTargeting).flat().length}
                active={currentStep === 2}
              />
              <SummarySection
                label="Ad Creation"
                expanded={expandedSections.includes("adCreation")}
                onToggle={() => toggleSection("adCreation")}
                count={selectedAdFormat ? 1 : 0}
                active={currentStep === 3}
              />
              <SummarySection
                label="Config"
                expanded={expandedSections.includes("config")}
                onToggle={() => toggleSection("config")}
                active={currentStep === 4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Details Drawer */}
      <InventoryDetailsDrawer
        open={inventoryDetailsOpen}
        onClose={() => setInventoryDetailsOpen(false)}
        page={
          selectedPageForDetails !== null
            ? websitePages[selectedPageForDetails]
            : null
        }
      />

      <ProductSelectionDrawer
        open={productSelectionOpen}
        onClose={() => setProductSelectionOpen(false)}
        onSave={(products) => {
          setSelectedProducts(products);
          setProductSelectionOpen(false);
        }}
        existingSelection={selectedProducts || undefined}
      />
    </>
  );
}

// ─── SummarySection ───────────────────────────────────────────────────────────
function SummarySection({ label, expanded, onToggle, count, active }) {
  return (
    <div style={{
      borderBottom: `1px solid ${BORDER}`,
      backgroundColor: active ? ACCENT_M : 'transparent',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 16, textAlign: 'left', background: 'none', border: 'none',
          cursor: 'pointer', fontFamily: FONT,
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = BG_SUBTLE; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: active ? ACCENT : TEXT }}>
            {label}
          </span>
          {count !== undefined && count > 0 && (
            <span style={{
              backgroundColor: ACCENT, color: '#fff',
              padding: '2px 6px', borderRadius: 999,
              fontSize: 11, fontWeight: 500,
            }}>
              {count}
            </span>
          )}
        </div>
        <div style={{
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s',
          display: 'flex',
        }}>
          <ChevronRightIcon size={16} color={TEXT_MID} />
        </div>
      </button>
    </div>
  );
}

// ─── InventoryStep ────────────────────────────────────────────────────────────
function InventoryStep({ pages, selectedPages, togglePage, onViewDetails }) {
  return (
    <div style={{
      backgroundColor: BG, borderRadius: 12,
      border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <button style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 16, borderBottom: `1px solid ${BORDER}`, background: 'none', border: 'none',
        borderBottom: `1px solid ${BORDER}`,
        cursor: 'pointer', fontFamily: FONT,
      }}>
        <span style={{ fontWeight: 600, color: TEXT, fontSize: 14 }}>Select Page</span>
        <ChevronDownIcon size={20} color={TEXT_MID} />
      </button>

      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {pages.map((page, index) => (
            <InventoryCard
              key={index}
              page={page}
              selected={selectedPages.includes(index)}
              onToggle={() => togglePage(index)}
              onViewDetails={() => onViewDetails(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── InventoryCard ────────────────────────────────────────────────────────────
function InventoryCard({ page, selected, onToggle, onViewDetails }) {
  return (
    <div
      style={{
        border: `1px solid ${selected ? ACCENT : BORDER}`,
        borderRadius: 12, padding: 16,
        backgroundColor: selected ? ACCENT_M : BG,
        boxShadow: selected ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = TEXT_SUB; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = BORDER; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{ marginTop: 2 }}>
          <RoundCheck
            checked={selected}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontWeight: 600, color: TEXT, margin: '0 0 4px', fontSize: 13 }}>{page.name}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            <SparklesIcon size={12} color={VI} />
            <span style={{ color: VI }}>Est. Daily Imp(next 30 days)</span>
            <span style={{ color: TEXT, fontWeight: 600, marginLeft: 'auto' }}>{page.estDailyImp}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: TEXT_MID }}>Project Daily Impression</span>
          <span style={{ color: TEXT, fontWeight: 500 }}>{page.projectDailyImp}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: TEXT_MID }}>Avg. Daily Impression</span>
          <span style={{ color: TEXT, fontWeight: 500 }}>{page.avgDailyImp}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: TEXT_MID }}>Total Inventories</span>
          <span style={{ color: TEXT, fontWeight: 500 }}>{page.totalInventories}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: TEXT_MID }}>Targeting Options</span>
          <span style={{ color: TEXT, fontWeight: 500 }}>{page.targetingOptions}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {page.tags.map((tag, i) => (
          <span key={i} style={{
            fontSize: 11, padding: '2px 8px', backgroundColor: BG_SUBTLE,
            color: TEXT_MID, borderRadius: 6, border: `1px solid ${BORDER}`,
          }}>
            {tag}
          </span>
        ))}
        {page.extraTags > 0 && (
          <span style={{ fontSize: 11, color: ACCENT, fontWeight: 500 }}>+{page.extraTags}</span>
        )}
      </div>

      <button
        style={{ fontSize: 11, color: ACCENT, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0, fontFamily: FONT }}
        onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
      >
        View Ad Slots →
      </button>
    </div>
  );
}

// ─── TargetingStep ────────────────────────────────────────────────────────────
function TargetingStep({
  options,
  selected,
  toggleTargeting,
  productSelection,
  onOpenProductSelection,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [targetingMode, setTargetingMode] = useState("auto");

  const targetingTypes = [
    {
      id: "demographics",
      title: "Demographics",
      description: "Target by age, gender, income, and parental status",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="7" r="4" stroke="#2563eb" strokeWidth="2" />
          <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="11" r="3" stroke="#2563eb" strokeWidth="2" />
          <path d="M21 21v-1.5a3 3 0 00-3-3h-1" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      iconBg: ACCENT_M,
      selectedCount: selected.demographics.length,
    },
    {
      id: "interests",
      title: "Interests & Behaviours",
      description: "Target based on shopping interests and browsing behavior",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: VI_BG,
      selectedCount: selected.interests.length,
    },
    {
      id: "behaviors",
      title: "Audience Segments",
      description: "Target specific customer segments like loyal customers or cart abandoners",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="#10b981" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="#10b981" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="#10b981" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="#10b981" strokeWidth="2" />
        </svg>
      ),
      iconBg: GREEN_M,
      selectedCount: selected.behaviors.length,
    },
    {
      id: "keywords",
      title: "Keyword Targeting",
      description: "Use relevant keywords to reach customers searching for your products",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="#f59e0b" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      iconBg: 'rgba(245,158,11,0.12)',
      selectedCount: selected.keywords.length,
    },
    {
      id: "products",
      title: "Product Catalog",
      description: "Choose specific products or categories to feature in your ads",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#06b6d4" strokeWidth="2" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#06b6d4" strokeWidth="2" />
        </svg>
      ),
      iconBg: 'rgba(6,182,212,0.12)',
      selectedCount: productSelection?.includedProducts?.length || 0,
      isProduct: true,
    },
  ];

  const getStatusBadge = (type) => {
    const baseStyle = {
      padding: '4px 10px', fontSize: 11, fontWeight: 500, borderRadius: 4,
      border: '1px solid', display: 'inline-block',
    };
    if (type.isProduct) {
      if (productSelection) {
        return (
          <span style={{ ...baseStyle, backgroundColor: GREEN_M, color: GREEN, borderColor: GREEN }}>
            {productSelection.mode === "smart" ? "SMART" : "MANUAL"}
          </span>
        );
      }
      return (
        <span style={{ ...baseStyle, backgroundColor: BG_SUBTLE, color: TEXT_MID, borderColor: BORDER }}>
          NOT CONFIGURED
        </span>
      );
    }
    if (type.selectedCount > 0) {
      return (
        <span style={{ ...baseStyle, backgroundColor: GREEN_M, color: GREEN, borderColor: GREEN }}>
          {type.selectedCount} SELECTED
        </span>
      );
    }
    return (
      <span style={{ ...baseStyle, backgroundColor: BG_SUBTLE, color: TEXT_MID, borderColor: BORDER }}>
        NOT CONFIGURED
      </span>
    );
  };

  // Modal checkbox rows helper
  const renderModalCheckboxRows = (items, category) =>
    items.map((item) => (
      <div
        key={item.id}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: 12,
          borderRadius: 8, border: `1px solid ${selected[category].includes(item.id) ? ACCENT : BORDER}`,
          cursor: 'pointer', marginBottom: 8,
        }}
        onClick={() => toggleTargeting(category, item.id)}
      >
        <Checkbox
          checked={selected[category].includes(item.id)}
          onChange={() => toggleTargeting(category, item.id)}
        />
        <span style={{ fontSize: 13, color: TEXT }}>{item.label}</span>
      </div>
    ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: 0 }}>Targeting</h2>
          <p style={{ fontSize: 13, color: TEXT_MID, marginTop: 4, marginBottom: 0 }}>
            Configure how your ads reach the right audience (optional)
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: 4, backgroundColor: BG_SUBTLE, borderRadius: 8,
        }}>
          {['auto', 'manual'].map((mode) => (
            <button
              key={mode}
              onClick={() => setTargetingMode(mode)}
              style={{
                padding: '8px 16px', fontSize: 13, fontWeight: 500, borderRadius: 6,
                border: 'none', cursor: 'pointer', fontFamily: FONT,
                backgroundColor: targetingMode === mode ? BG : 'transparent',
                color: targetingMode === mode ? TEXT : TEXT_MID,
                boxShadow: targetingMode === mode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Auto targeting panel */}
      {targetingMode === 'auto' ? (
        <div style={{
          background: 'linear-gradient(135deg, var(--osmos-brand-primary-muted), rgba(124,58,237,0.05))',
          borderRadius: 12, border: `1px solid ${BORDER}`, padding: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', backgroundColor: BG,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)', flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 8, marginTop: 0 }}>
                AI-Optimized Targeting
              </h3>
              <p style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6, margin: 0 }}>
                Our AI will automatically optimize your ad targeting based on your campaign objective,
                creative content, and historical performance data. This typically results in 20-30%
                better performance compared to manual targeting.
              </p>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Smart audience discovery', 'Real-time optimization', 'Cross-platform learning'].map((chip) => (
                  <span key={chip} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', backgroundColor: BG, borderRadius: 999,
                    fontSize: 12, color: TEXT_MID, border: `1px solid ${BORDER}`,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {targetingTypes.map((type) => (
            <RadioCard
              key={type.id}
              selected={false}
              onClick={() => type.isProduct ? onOpenProductSelection() : setActiveModal(type.id)}
              style={{ padding: 0, border: `1px solid ${BORDER}`, borderRadius: 12 }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 16, cursor: 'pointer',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: type.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {type.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: '0 0 2px' }}>
                    {type.title}
                  </h3>
                  <p style={{ fontSize: 11, color: TEXT_MID, margin: 0 }}>{type.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  {getStatusBadge(type)}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEXT_SUB} strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </RadioCard>
          ))}
        </div>
      )}

      {/* Targeting modals (manual mode) */}
      {targetingMode === 'manual' && (
        <>
          <Modal
            open={activeModal === 'demographics'}
            onClose={() => setActiveModal(null)}
            title="Demographics Targeting"
            zIndex={200}
            footer={
              <>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => setActiveModal(null)}>Apply</Button>
              </>
            }
          >
            {renderModalCheckboxRows(options.demographics, 'demographics')}
          </Modal>

          <Modal
            open={activeModal === 'interests'}
            onClose={() => setActiveModal(null)}
            title="Interests & Behaviours"
            zIndex={200}
            footer={
              <>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => setActiveModal(null)}>Apply</Button>
              </>
            }
          >
            {renderModalCheckboxRows(options.interests, 'interests')}
          </Modal>

          <Modal
            open={activeModal === 'behaviors'}
            onClose={() => setActiveModal(null)}
            title="Audience Segments"
            zIndex={200}
            footer={
              <>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => setActiveModal(null)}>Apply</Button>
              </>
            }
          >
            {renderModalCheckboxRows(options.behaviors, 'behaviors')}
          </Modal>

          <Modal
            open={activeModal === 'keywords'}
            onClose={() => setActiveModal(null)}
            title="Keyword Targeting"
            zIndex={200}
            footer={
              <>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => setActiveModal(null)}>Apply</Button>
              </>
            }
          >
            {renderModalCheckboxRows(options.keywords, 'keywords')}
          </Modal>
        </>
      )}
    </div>
  );
}

// ─── AdCreationStep ───────────────────────────────────────────────────────────
function AdCreationStep({
  formats,
  selectedFormat,
  setSelectedFormat,
  creatives,
  setCreatives,
}) {
  const addCreative = () => {
    setCreatives([...creatives, { headline: "", description: "", ctaText: "Shop Now" }]);
  };

  const removeCreative = (index) => {
    setCreatives(creatives.filter((_, i) => i !== index));
  };

  const updateCreative = (index, field, value) => {
    const updated = [...creatives];
    updated[index] = { ...updated[index], [field]: value };
    setCreatives(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Ad Format Selection */}
      <div style={{
        backgroundColor: BG, borderRadius: 12,
        border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20,
      }}>
        <h3 style={{ fontWeight: 600, color: TEXT, marginTop: 0, marginBottom: 16, fontSize: 14 }}>
          Select Ad Format
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {formats.map((format) => (
            <RadioCard
              key={format.id}
              selected={selectedFormat === format.id}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <RadioDot selected={selectedFormat === format.id} size={16} />
                <span style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{format.name}</span>
              </div>
              <div style={{ marginLeft: 24, fontSize: 13, color: TEXT_MID }}>
                <p style={{ margin: 0 }}>{format.dimensions}</p>
                <p style={{ margin: '4px 0 0', fontSize: 11 }}>{format.type}</p>
              </div>
            </RadioCard>
          ))}
        </div>
      </div>

      {/* Ad Creatives */}
      <div style={{
        backgroundColor: BG, borderRadius: 12,
        border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, color: TEXT, margin: 0, fontSize: 14 }}>Ad Creatives</h3>
          <Button variant="outline" onClick={addCreative}>
            <PlusIcon size={14} color={ACCENT} />
            Add Creative
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {creatives.map((creative, index) => (
            <div
              key={index}
              style={{
                border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16,
                backgroundColor: BG_SUBTLE,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: TEXT_MID }}>
                  Creative {index + 1}
                </span>
                {creatives.length > 1 && (
                  <button
                    onClick={() => removeCreative(index)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#ef4444' }}
                  >
                    <TrashIcon size={16} color="#ef4444" />
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Upload zone — full width */}
                <div
                  style={{
                    gridColumn: '1 / -1',
                    border: `2px dashed ${BORDER}`, borderRadius: 12, padding: 32,
                    textAlign: 'center', backgroundColor: BG, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    <UploadIcon size={32} color={TEXT_SUB} />
                  </div>
                  <p style={{ fontSize: 13, color: TEXT_MID, margin: 0 }}>Drag and drop or click to upload</p>
                  <p style={{ fontSize: 11, color: TEXT_SUB, marginTop: 4, marginBottom: 0 }}>PNG, JPG, GIF up to 5MB</p>
                </div>

                {/* Headline */}
                <div>
                  <label style={{ fontSize: 13, color: TEXT, display: 'block', marginBottom: 4, fontWeight: 500 }}>
                    Headline
                  </label>
                  <input
                    placeholder="Enter headline"
                    value={creative.headline}
                    onChange={(e) => updateCreative(index, 'headline', e.target.value)}
                    style={INPUT_STYLE}
                  />
                </div>

                {/* CTA */}
                <div>
                  <label style={{ fontSize: 13, color: TEXT, display: 'block', marginBottom: 4, fontWeight: 500 }}>
                    CTA Text
                  </label>
                  <input
                    placeholder="Shop Now"
                    value={creative.ctaText}
                    onChange={(e) => updateCreative(index, 'ctaText', e.target.value)}
                    style={INPUT_STYLE}
                  />
                </div>

                {/* Description — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 13, color: TEXT, display: 'block', marginBottom: 4, fontWeight: 500 }}>
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    value={creative.description}
                    onChange={(e) => updateCreative(index, 'description', e.target.value)}
                    style={{
                      ...INPUT_STYLE, resize: 'none', height: 80, lineHeight: 1.5,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ConfigStep ───────────────────────────────────────────────────────────────
function ConfigStep({ settings, setSettings }) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const toggleHour = (hour) => {
    const current = settings.dayParting;
    setSettings({
      ...settings,
      dayParting: current.includes(hour)
        ? current.filter((h) => h !== hour)
        : [...current, hour],
    });
  };

  const [brandSafety, setBrandSafety] = useState({
    adult: true, violence: true, gambling: true, political: true,
  });

  const deliveryTypes = [
    { id: 'standard',    label: 'Standard',    desc: 'Distribute evenly over time' },
    { id: 'accelerated', label: 'Accelerated', desc: 'Spend budget as fast as possible' },
    { id: 'frontloaded', label: 'Frontloaded', desc: 'More impressions early in the day' },
  ];

  const brandSafetyItems = [
    { id: 'adult',    label: 'Exclude adult content' },
    { id: 'violence', label: 'Exclude violent content' },
    { id: 'gambling', label: 'Exclude gambling content' },
    { id: 'political',label: 'Exclude political content' },
  ];

  const cardStyle = {
    backgroundColor: BG, borderRadius: 12,
    border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Frequency Capping */}
      <div style={cardStyle}>
        <h3 style={{ fontWeight: 600, color: TEXT, marginTop: 0, marginBottom: 16, fontSize: 14 }}>
          Frequency Capping
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'block', marginBottom: 4 }}>
              Max impressions per user
            </label>
            <input
              type="number"
              value={settings.frequencyCap}
              onChange={(e) => setSettings({ ...settings, frequencyCap: e.target.value })}
              style={{ ...INPUT_STYLE, width: 128 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'block', marginBottom: 4 }}>
              Time period
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={settings.frequencyPeriod}
                onChange={(e) => setSettings({ ...settings, frequencyPeriod: e.target.value })}
                style={SELECT_STYLE}
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
                <option value="month">Per Month</option>
              </select>
              <div style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', display: 'flex',
              }}>
                <ChevronDownIcon size={16} color={TEXT_MID} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div style={cardStyle}>
        <h3 style={{ fontWeight: 600, color: TEXT, marginTop: 0, marginBottom: 16, fontSize: 14 }}>
          Delivery Type
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {deliveryTypes.map((type) => (
            <RadioCard
              key={type.id}
              selected={settings.deliveryType === type.id}
              onClick={() => setSettings({ ...settings, deliveryType: type.id })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <RadioDot selected={settings.deliveryType === type.id} size={16} />
                <span style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{type.label}</span>
              </div>
              <p style={{ fontSize: 11, color: TEXT_MID, margin: 0, marginLeft: 24 }}>{type.desc}</p>
            </RadioCard>
          ))}
        </div>
      </div>

      {/* Day Parting */}
      <div style={cardStyle}>
        <h3 style={{ fontWeight: 600, color: TEXT, marginTop: 0, marginBottom: 4, fontSize: 14 }}>
          Day Parting (Optional)
        </h3>
        <p style={{ fontSize: 13, color: TEXT_MID, marginTop: 0, marginBottom: 16 }}>
          Select specific hours to run your ads
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
          {hours.map((hour) => {
            const active = settings.dayParting.includes(hour);
            return (
              <button
                key={hour}
                onClick={() => toggleHour(hour)}
                style={{
                  padding: '8px 4px', fontSize: 11, borderRadius: 8, cursor: 'pointer',
                  fontFamily: FONT, transition: 'all 0.15s',
                  backgroundColor: active ? ACCENT : BG,
                  color: active ? '#fff' : TEXT_MID,
                  border: `1px solid ${active ? ACCENT : BORDER}`,
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = TEXT_SUB; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = BORDER; }}
              >
                {hour}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Safety */}
      <div style={cardStyle}>
        <h3 style={{ fontWeight: 600, color: TEXT, marginTop: 0, marginBottom: 16, fontSize: 14 }}>
          Brand Safety
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {brandSafetyItems.map((item) => (
            <Checkbox
              key={item.id}
              checked={brandSafety[item.id]}
              onChange={() => setBrandSafety((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
