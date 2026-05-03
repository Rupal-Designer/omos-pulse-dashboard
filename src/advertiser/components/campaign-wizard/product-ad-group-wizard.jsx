import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Icon,
  CloseIcon,
  CheckIcon,
  ChevronLeftIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  EyeIcon,
} from "../../../ui";
import { Button } from "../../../ui";
import { Input, Select } from "../../../ui";
import { Checkbox } from "../../../ui";

// ─── Design tokens ───────────────────────────────────────────────────────────
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

// ─── Hand-rolled icons ────────────────────────────────────────────────────────
const DollarSignIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

const PackageIcon = (props) => (
  <Icon {...props}>
    <path d="m7.5 4.27 9 5.15"/>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
  </Icon>
);

const KeyIcon = (props) => (
  <Icon {...props}>
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
    <path d="m21 2-9.6 9.6"/>
    <circle cx="7.5" cy="15.5" r="5.5"/>
  </Icon>
);

const GlobeIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </Icon>
);

const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </Icon>
);

const ShoppingCartIcon = (props) => (
  <Icon {...props}>
    <circle cx="8" cy="21" r="1"/>
    <circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </Icon>
);

const ListOrderedIcon = (props) => (
  <Icon {...props}>
    <line x1="10" x2="21" y1="6" y2="6"/>
    <line x1="10" x2="21" y1="12" y2="12"/>
    <line x1="10" x2="21" y1="18" y2="18"/>
    <path d="M4 6h1v4"/>
    <path d="M4 10h2"/>
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
  </Icon>
);

const MousePointerIcon = (props) => (
  <Icon {...props}>
    <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/>
  </Icon>
);

// ─── Static data ──────────────────────────────────────────────────────────────
const productAdGroupSteps = [
  { id: 1, label: "Basics",   description: "Name & campaign type", icon: PackageIcon },
  { id: 2, label: "Pricing",  description: "CPC or CPM",           icon: DollarSignIcon },
  { id: 3, label: "Products", description: "Select products",      icon: ShoppingCartIcon },
  { id: 4, label: "Bidding",  description: "Set bid strategy",     icon: DollarSignIcon },
  { id: 5, label: "Keywords", description: "Target keywords",      icon: KeyIcon },
  { id: 6, label: "Networks", description: "Select networks",      icon: GlobeIcon },
];

const mockCategories = [
  { id: "electronics", name: "Electronics",              productCount: 1250 },
  { id: "clothing",    name: "Clothing & Apparel",       productCount: 3420 },
  { id: "home",        name: "Home & Garden",            productCount: 890  },
  { id: "sports",      name: "Sports & Outdoors",        productCount: 567  },
  { id: "beauty",      name: "Beauty & Personal Care",   productCount: 2100 },
  { id: "toys",        name: "Toys & Games",             productCount: 430  },
];

const mockBrands = [
  { id: "nike",    name: "Nike"    },
  { id: "apple",   name: "Apple"   },
  { id: "samsung", name: "Samsung" },
  { id: "sony",    name: "Sony"    },
  { id: "adidas",  name: "Adidas"  },
  { id: "loreal",  name: "L'Oreal" },
];

const mockProducts = [
  { id: "p1", name: "Wireless Headphones Pro", sku: "WHP-001", category: "Electronics",           brand: "Sony",    price: 149.99 },
  { id: "p2", name: "Smart Watch Series 5",    sku: "SWS-005", category: "Electronics",           brand: "Apple",   price: 299.99 },
  { id: "p3", name: "Running Shoes Elite",     sku: "RSE-102", category: "Sports & Outdoors",     brand: "Nike",    price: 129.99 },
  { id: "p4", name: "Organic Face Cream",      sku: "OFC-050", category: "Beauty & Personal Care",brand: "L'Oreal", price: 45.99  },
  { id: "p5", name: "Cotton T-Shirt Basic",    sku: "CTB-200", category: "Clothing & Apparel",    brand: "Adidas",  price: 24.99  },
  { id: "p6", name: "Garden Tool Set",         sku: "GTS-010", category: "Home & Garden",         brand: "Generic", price: 89.99  },
  { id: "p7", name: "Bluetooth Speaker",       sku: "BTS-015", category: "Electronics",           brand: "Samsung", price: 79.99  },
  { id: "p8", name: "Yoga Mat Premium",        sku: "YMP-022", category: "Sports & Outdoors",     brand: "Nike",    price: 45.99  },
];

const mockNetworks = [
  { id: "amazon",    name: "Amazon",    logo: "/placeholder.svg?height=32&width=32", reach: "150M+ users" },
  { id: "walmart",   name: "Walmart",   logo: "/placeholder.svg?height=32&width=32", reach: "120M+ users" },
  { id: "target",    name: "Target",    logo: "/placeholder.svg?height=32&width=32", reach: "45M+ users"  },
  { id: "costco",    name: "Costco",    logo: "/placeholder.svg?height=32&width=32", reach: "35M+ users"  },
  { id: "kroger",    name: "Kroger",    logo: "/placeholder.svg?height=32&width=32", reach: "28M+ users"  },
  { id: "instacart", name: "Instacart", logo: "/placeholder.svg?height=32&width=32", reach: "20M+ users"  },
];

const filterCriteria = [
  { id: "category",  name: "Product Category" },
  { id: "brand",     name: "Brand"            },
  { id: "price",     name: "Price Range"      },
  { id: "inventory", name: "Inventory Status" },
  { id: "margin",    name: "Profit Margin"    },
  { id: "rating",    name: "Product Rating"   },
];

const filterOperators = [
  { id: "contains",     name: "contains"       },
  { id: "equals",       name: "equals"         },
  { id: "not_equals",   name: "does not equal" },
  { id: "greater_than", name: "greater than"   },
  { id: "less_than",    name: "less than"      },
];

// ─── Main component ──────────────────────────────────────────────────────────
export function ProductAdGroupWizard({ open, onClose, onSave, editingAdGroup }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [adGroupData, setAdGroupData] = useState({
    id: "",
    name: "",
    selectedPages: [],
    productSelection: { mode: "filter", products: [] },
    targeting: { demographics: [], interests: [], behaviors: [], keywords: [] },
    adFormat: null,
    creatives: [],
    config: { frequencyCap: "3", frequencyPeriod: "day", deliveryType: "standard", dayParting: [] },
    bidSettings: { mode: "auto", categoryBids: [] },
    keywordSettings: { mode: "all", keywords: [] },
    networkSettings: { mode: "all", networks: [] },
    campaignType: "smart_shopping",
    pricingModel: "cpc",
    productSelectionMethod: "filter",
    productFilters: [{ id: "1", field: "category", operator: "contains", value: "" }],
    includedProducts: [],
    excludedProducts: [],
  });

  const [productSearch, setProductSearch]   = useState("");
  const [keywordInput, setKeywordInput]     = useState("");
  const [portalContainer, setPortalContainer] = useState(null);

  // hover states
  const [hoverClose, setHoverClose]   = useState(false);
  const [hoverBack, setHoverBack]     = useState(false);
  const [addFilterHover, setAddFilterHover] = useState(false);

  useEffect(() => { setPortalContainer(document.body); }, []);

  useEffect(() => {
    if (editingAdGroup) {
      setAdGroupData(editingAdGroup);
    } else {
      setAdGroupData({
        id: `ag-${Date.now()}`,
        name: "",
        selectedPages: [],
        productSelection: { mode: "filter", products: [] },
        targeting: { demographics: [], interests: [], behaviors: [], keywords: [] },
        adFormat: null,
        creatives: [],
        config: { frequencyCap: "3", frequencyPeriod: "day", deliveryType: "standard", dayParting: [] },
        bidSettings: { mode: "auto", categoryBids: [] },
        keywordSettings: { mode: "all", keywords: [] },
        networkSettings: { mode: "all", networks: [] },
        campaignType: "smart_shopping",
        pricingModel: "cpc",
        productSelectionMethod: "filter",
        productFilters: [{ id: "1", field: "category", operator: "contains", value: "" }],
        includedProducts: [],
        excludedProducts: [],
      });
      setCurrentStep(1);
    }
  }, [editingAdGroup, open]);

  const updateAdGroupData = (updates) => setAdGroupData((prev) => ({ ...prev, ...updates }));

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
    else onSave(adGroupData);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return adGroupData.name.trim() !== "" && adGroupData.campaignType;
      case 2: return adGroupData.pricingModel;
      default: return true;
    }
  };

  const addFilter = () => {
    const newFilter = { id: `${Date.now()}`, field: "category", operator: "contains", value: "" };
    updateAdGroupData({ productFilters: [...(adGroupData.productFilters || []), newFilter] });
  };

  const updateFilter = (filterId, updates) => {
    updateAdGroupData({
      productFilters: adGroupData.productFilters?.map((f) => f.id === filterId ? { ...f, ...updates } : f),
    });
  };

  const removeFilter = (filterId) => {
    updateAdGroupData({ productFilters: adGroupData.productFilters?.filter((f) => f.id !== filterId) });
  };

  const toggleIncludedProduct = (productId) => {
    const current = adGroupData.includedProducts || [];
    const newProducts = current.includes(productId)
      ? current.filter((p) => p !== productId)
      : [...current, productId];
    updateAdGroupData({ includedProducts: newProducts });
  };

  const toggleExcludedProduct = (productId) => {
    const current = adGroupData.excludedProducts || [];
    const newProducts = current.includes(productId)
      ? current.filter((p) => p !== productId)
      : [...current, productId];
    updateAdGroupData({ excludedProducts: newProducts });
  };

  const toggleNetwork = (networkId) => {
    const currentNetworks = adGroupData.networkSettings?.networks || [];
    const newNetworks = currentNetworks.includes(networkId)
      ? currentNetworks.filter((n) => n !== networkId)
      : [...currentNetworks, networkId];
    updateAdGroupData({ networkSettings: { ...adGroupData.networkSettings, networks: newNetworks } });
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      const keywords = keywordInput.split(/[,\n]/).map((k) => k.trim()).filter((k) => k);
      const currentKeywords = adGroupData.keywordSettings?.keywords || [];
      updateAdGroupData({
        keywordSettings: {
          ...adGroupData.keywordSettings,
          keywords: [...new Set([...currentKeywords, ...keywords])],
        },
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword) => {
    const currentKeywords = adGroupData.keywordSettings?.keywords || [];
    updateAdGroupData({
      keywordSettings: {
        ...adGroupData.keywordSettings,
        keywords: currentKeywords.filter((k) => k !== keyword),
      },
    });
  };

  const updateCategoryBid = (categoryId, bid) => {
    const currentBids = adGroupData.bidSettings?.categoryBids || [];
    const existingIndex = currentBids.findIndex((b) => b.category === categoryId);
    let newBids;
    if (existingIndex >= 0) {
      newBids = [...currentBids];
      newBids[existingIndex] = { category: categoryId, bid };
    } else {
      newBids = [...currentBids, { category: categoryId, bid }];
    }
    updateAdGroupData({ bidSettings: { ...adGroupData.bidSettings, categoryBids: newBids } });
  };

  // ── Helper: campaign type card ───────────────────────────────────────────
  function CampaignTypeCard({ type, isSelected, onClick, icon: CardIcon, badge, title, description }) {
    const [hov, setHov] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: 20,
          borderRadius: 12,
          border: isSelected ? `2px solid ${ACCENT}` : `2px solid ${hov ? '#d1d5db' : BORDER}`,
          background: isSelected ? ACCENT_M : BG,
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all 0.15s',
          fontFamily: FONT,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isSelected ? ACCENT : BG_SUB,
            color: isSelected ? '#fff' : TEXT_MID,
            flexShrink: 0,
          }}>
            <CardIcon size={20} />
          </div>
          {badge && (
            <span style={{
              padding: '2px 8px', fontSize: 11, fontWeight: 600, borderRadius: 4,
              background: isSelected ? ACCENT : BORDER,
              color: isSelected ? '#fff' : TEXT_MID,
            }}>
              {badge}
            </span>
          )}
        </div>
        <div style={{ fontWeight: 600, color: TEXT, marginBottom: 4, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>{description}</div>
      </button>
    );
  }

  // ── renderStepContent ─────────────────────────────────────────────────────
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
                Ad Group Basics
              </h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>
                Name your ad group and select the campaign type.
              </p>
            </div>

            <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Ad Group Name */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
                  Ad Group Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Input
                  value={adGroupData.name}
                  onChange={(e) => updateAdGroupData({ name: e.target.value })}
                  placeholder="e.g., Electronics - High Intent, Summer Sale Products"
                />
                <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 6, fontFamily: FONT }}>
                  Use a name that describes the products or targeting strategy
                </p>
              </div>

              {/* Campaign Type */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 12, fontFamily: FONT }}>
                  Campaign Type <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <CampaignTypeCard
                    type="smart_shopping"
                    isSelected={adGroupData.campaignType === "smart_shopping"}
                    onClick={() => updateAdGroupData({ campaignType: "smart_shopping" })}
                    icon={SparklesIcon}
                    badge="RECOMMENDED"
                    title="Smart Shopping Campaigns"
                    description="AI-powered optimization across search, display, and shopping networks for maximum conversions."
                  />
                  <CampaignTypeCard
                    type="search_listing"
                    isSelected={adGroupData.campaignType === "search_listing"}
                    onClick={() => updateAdGroupData({ campaignType: "search_listing" })}
                    icon={ListOrderedIcon}
                    title="Search Listing Campaigns"
                    description="Target users actively searching for your products with sponsored listings in search results."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2: {
        const pricingCards = [
          {
            model: 'cpc',
            icon: MousePointerIcon,
            title: 'Cost Per Click (CPC)',
            desc: 'Pay only when someone clicks on your ad. Best for driving traffic and conversions.',
            badge: null,
            pill: { label: 'Recommended for Product Ads', color: GREEN, bg: 'rgba(22,163,74,0.08)', check: true },
          },
          {
            model: 'cpm',
            icon: EyeIcon,
            title: 'Cost Per Mille (CPM)',
            desc: 'Pay for every 1,000 impressions. Best for brand awareness and reach campaigns.',
            badge: null,
            pill: { label: 'Best for Brand Awareness', color: TEXT_MID, bg: BG_SUB, check: false },
          },
        ];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>Pricing Model</h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>Choose how you want to pay for your ads.</p>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {pricingCards.map(({ model, icon: PIcon, title, desc, pill }) => {
                const sel = adGroupData.pricingModel === model;
                return (
                  <PricingCard
                    key={model}
                    model={model}
                    isSelected={sel}
                    onClick={() => updateAdGroupData({ pricingModel: model })}
                    icon={PIcon}
                    title={title}
                    description={desc}
                    pill={pill}
                  />
                );
              })}
            </div>

            {adGroupData.pricingModel && (
              <div style={{ background: BG_SUB, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}` }}>
                <h4 style={{ fontWeight: 500, color: TEXT, marginBottom: 8, fontFamily: FONT, fontSize: 14 }}>
                  {adGroupData.pricingModel === 'cpc' ? 'CPC Pricing Details' : 'CPM Pricing Details'}
                </h4>
                <p style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT, lineHeight: 1.5 }}>
                  {adGroupData.pricingModel === 'cpc'
                    ? "You'll set a maximum bid per click in the bidding step. Average CPC for product ads ranges from $0.50 to $2.00 depending on category competition."
                    : "You'll set a maximum bid per 1,000 impressions in the bidding step. Average CPM ranges from $5.00 to $15.00 depending on targeting and placement."}
                </p>
              </div>
            )}
          </div>
        );
      }

      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>Product Selection</h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>Choose which products to include in this ad group.</p>
            </div>

            {/* Selection Method */}
            <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
                Selection Method
              </label>
              <Select
                value={adGroupData.productSelectionMethod}
                onChange={(e) => updateAdGroupData({ productSelectionMethod: e.target.value })}
                options={[
                  { value: 'filter',  label: 'Select Products using Filters' },
                  { value: 'include', label: 'Select Individual Product to Include' },
                  { value: 'exclude', label: 'Select Individual Product to Exclude' },
                ]}
                style={{ maxWidth: 350 }}
              />
            </div>

            {/* Filter-based Selection */}
            {adGroupData.productSelectionMethod === 'filter' && (
              <div style={{ background: BG_SUB, borderRadius: 12, padding: 24, border: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <p style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
                    Products will be automatically added to campaign matching filter condition.
                  </p>
                  <a href="#" style={{ fontSize: 13, color: ACCENT, fontFamily: FONT }}>
                    Guide to select a product by filters
                  </a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {adGroupData.productFilters?.map((filter) => (
                    <FilterRow
                      key={filter.id}
                      filter={filter}
                      onUpdate={(updates) => updateFilter(filter.id, updates)}
                      onRemove={() => removeFilter(filter.id)}
                      canRemove={(adGroupData.productFilters?.length || 0) > 1}
                    />
                  ))}
                </div>

                <button
                  onClick={addFilter}
                  onMouseEnter={() => setAddFilterHover(true)}
                  onMouseLeave={() => setAddFilterHover(false)}
                  style={{
                    marginTop: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: addFilterHover ? ACCENT : TEXT_MID,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: FONT,
                    fontSize: 13,
                    transition: 'color 0.15s',
                    padding: 0,
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 999,
                    border: `1px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <PlusIcon size={14} />
                  </div>
                  <span>Add another condition</span>
                </button>
              </div>
            )}

            {/* Include individual products */}
            {adGroupData.productSelectionMethod === 'include' && (
              <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB, display: 'flex' }}>
                      <SearchIcon size={16} />
                    </div>
                    <input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products by name, SKU, or category..."
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        padding: '8px 10px 8px 32px',
                        border: `1px solid ${BORDER}`, borderRadius: 6,
                        fontSize: 13, fontFamily: FONT, color: TEXT,
                        background: BG, outline: 'none',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 13, color: TEXT_MID, whiteSpace: 'nowrap', fontFamily: FONT }}>
                    {adGroupData.includedProducts?.length || 0} selected
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 350, overflowY: 'auto' }}>
                  {mockProducts
                    .filter((p) =>
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((product) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        isSelected={adGroupData.includedProducts?.includes(product.id)}
                        onToggle={() => toggleIncludedProduct(product.id)}
                        selectionColor={ACCENT}
                        selectionBg={ACCENT_M}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Exclude individual products */}
            {adGroupData.productSelectionMethod === 'exclude' && (
              <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
                <div style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: `1px solid ${AMBER}`,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}>
                  <p style={{ fontSize: 13, color: '#92400e', fontFamily: FONT }}>
                    <strong>Note:</strong> All products will be included except those you select below.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB, display: 'flex' }}>
                      <SearchIcon size={16} />
                    </div>
                    <input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products to exclude..."
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        padding: '8px 10px 8px 32px',
                        border: `1px solid ${BORDER}`, borderRadius: 6,
                        fontSize: 13, fontFamily: FONT, color: TEXT,
                        background: BG, outline: 'none',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 13, color: TEXT_MID, whiteSpace: 'nowrap', fontFamily: FONT }}>
                    {adGroupData.excludedProducts?.length || 0} excluded
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 350, overflowY: 'auto' }}>
                  {mockProducts
                    .filter((p) =>
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.sku.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((product) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        isSelected={adGroupData.excludedProducts?.includes(product.id)}
                        onToggle={() => toggleExcludedProduct(product.id)}
                        selectionColor="#ef4444"
                        selectionBg="rgba(239,68,68,0.05)"
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4: {
        const bidModeCards = [
          {
            mode: 'auto',
            icon: SparklesIcon,
            badge: 'AUTO',
            title: 'Automatic Bidding',
            desc: 'Let AI optimize bids to maximize your campaign performance.',
            payload: { mode: 'auto', categoryBids: [] },
          },
          {
            mode: 'manual',
            icon: DollarSignIcon,
            badge: 'MANUAL',
            title: 'Manual Bidding',
            desc: 'Set custom bid amounts per category.',
            payload: { mode: 'manual', categoryBids: [] },
          },
        ];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>Bid Settings</h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>
                Configure how you want to bid on ad placements
                {adGroupData.pricingModel === 'cpc' ? ' (Cost Per Click)' : ' (Cost Per Mille)'}.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {bidModeCards.map(({ mode, icon: BIcon, badge, title, desc, payload }) => (
                <ModeCard
                  key={mode}
                  isSelected={adGroupData.bidSettings?.mode === mode}
                  onClick={() => updateAdGroupData({ bidSettings: payload })}
                  icon={BIcon}
                  badge={badge}
                  title={title}
                  description={desc}
                />
              ))}
            </div>

            {adGroupData.bidSettings?.mode === 'manual' && (
              <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
                <h3 style={{ fontWeight: 500, color: TEXT, marginBottom: 16, fontFamily: FONT, fontSize: 14 }}>
                  Category Bids ({adGroupData.pricingModel === 'cpc' ? 'per click' : 'per 1,000 impressions'})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mockCategories.map((category) => {
                    const bid = adGroupData.bidSettings?.categoryBids?.find((b) => b.category === category.id)?.bid || '';
                    return (
                      <div key={category.id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                        padding: 12, borderRadius: 8, border: `1px solid ${BORDER}`,
                      }}>
                        <div>
                          <p style={{ fontWeight: 500, color: TEXT, fontSize: 13, fontFamily: FONT, marginBottom: 2 }}>{category.name}</p>
                          <p style={{ fontSize: 12, color: TEXT_MID, fontFamily: FONT }}>{category.productCount} products</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: TEXT_MID, fontFamily: FONT }}>$</span>
                          <input
                            type="number"
                            value={bid}
                            onChange={(e) => updateCategoryBid(category.id, e.target.value)}
                            placeholder={adGroupData.pricingModel === 'cpc' ? '0.50' : '5.00'}
                            style={{
                              width: 80, padding: '7px 8px', border: `1px solid ${BORDER}`,
                              borderRadius: 6, fontSize: 13, fontFamily: FONT, color: TEXT,
                              background: BG, outline: 'none', textAlign: 'right',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 5: {
        const kwModeCards = [
          {
            mode: 'all',
            icon: GlobeIcon,
            badge: 'ALL',
            title: 'All Keywords',
            desc: 'Target all relevant keywords automatically for maximum reach.',
            payload: { mode: 'all', keywords: [] },
          },
          {
            mode: 'manual',
            icon: KeyIcon,
            badge: 'MANUAL',
            title: 'Manual Keywords',
            desc: 'Specify exact keywords for precise targeting.',
            payload: { mode: 'manual', keywords: [] },
          },
        ];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>Keyword Targeting</h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>Define which keywords should trigger your ads.</p>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {kwModeCards.map(({ mode, icon: KIcon, badge, title, desc, payload }) => (
                <ModeCard
                  key={mode}
                  isSelected={adGroupData.keywordSettings?.mode === mode}
                  onClick={() => updateAdGroupData({ keywordSettings: payload })}
                  icon={KIcon}
                  badge={badge}
                  title={title}
                  description={desc}
                />
              ))}
            </div>

            {adGroupData.keywordSettings?.mode === 'manual' && (
              <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
                    Enter Keywords
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <textarea
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Enter keywords separated by commas or new lines..."
                      style={{
                        flex: 1, minHeight: 80, padding: '8px 12px',
                        border: `1px solid ${BORDER}`, borderRadius: 8,
                        fontSize: 13, fontFamily: FONT, color: TEXT,
                        background: BG, outline: 'none', resize: 'none',
                        lineHeight: 1.5,
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <p style={{ fontSize: 12, color: TEXT_SUB, fontFamily: FONT }}>Max 50 keywords allowed</p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={addKeyword}
                      disabled={!keywordInput.trim()}
                    >
                      <PlusIcon size={14} />
                      Add Keywords
                    </Button>
                  </div>
                </div>

                {(adGroupData.keywordSettings?.keywords?.length || 0) > 0 && (
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
                      Added Keywords ({adGroupData.keywordSettings?.keywords?.length})
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {adGroupData.keywordSettings?.keywords?.map((keyword) => (
                        <KeywordTag key={keyword} keyword={keyword} onRemove={() => removeKeyword(keyword)} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      case 6: {
        const netModeCards = [
          {
            mode: 'all',
            icon: GlobeIcon,
            badge: 'ALL',
            title: 'All Networks',
            desc: 'Advertise across all available retail partner networks.',
            payload: { mode: 'all', networks: [] },
          },
          {
            mode: 'manual',
            icon: PackageIcon,
            badge: 'SELECT',
            title: 'Select Networks',
            desc: 'Choose specific retail networks.',
            payload: { mode: 'manual', networks: [] },
          },
        ];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>Network Targeting</h2>
              <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>Choose which retail networks to advertise on.</p>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {netModeCards.map(({ mode, icon: NIcon, badge, title, desc, payload }) => (
                <ModeCard
                  key={mode}
                  isSelected={adGroupData.networkSettings?.mode === mode}
                  onClick={() => updateAdGroupData({ networkSettings: payload })}
                  icon={NIcon}
                  badge={badge}
                  title={title}
                  description={desc}
                />
              ))}
            </div>

            {adGroupData.networkSettings?.mode === 'manual' && (
              <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 500, color: TEXT, fontFamily: FONT, fontSize: 14 }}>Select Networks</h3>
                  <span style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
                    {adGroupData.networkSettings?.networks?.length || 0} selected
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {mockNetworks.map((network) => {
                    const isSelected = adGroupData.networkSettings?.networks?.includes(network.id);
                    return (
                      <NetworkRow
                        key={network.id}
                        network={network}
                        isSelected={isSelected}
                        onToggle={() => toggleNetwork(network.id)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (!open || !portalContainer) return null;

  const wizardContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.4)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, bottom: 0, right: 0,
        width: 'calc(100% - 280px)', maxWidth: 1400,
        zIndex: 111,
        background: BG_SUB,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        fontFamily: FONT,
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: `1px solid ${BORDER}`,
          background: BG,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={onClose}
              onMouseEnter={() => setHoverBack(true)}
              onMouseLeave={() => setHoverBack(false)}
              style={{
                padding: 8, borderRadius: 8, border: 'none',
                background: hoverBack ? BG_SUB : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >
              <ChevronLeftIcon size={20} style={{ color: TEXT_MID }} />
            </button>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: TEXT, fontFamily: FONT, margin: 0 }}>
                Create Product Ad Group
              </h2>
              <p style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT, marginTop: 2 }}>
                Step {currentStep} of {productAdGroupSteps.length} &bull; Return to Campaign
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            style={{
              padding: 8, borderRadius: 8, border: 'none',
              background: hoverClose ? BG_SUB : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            <CloseIcon size={20} style={{ color: TEXT_MID }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Steps Sidebar */}
          <div style={{ width: 256, background: BG, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
              {productAdGroupSteps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent   = step.id === currentStep;
                const isDisabled  = step.id > currentStep;
                return (
                  <StepItem
                    key={step.id}
                    step={step}
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    isDisabled={isDisabled}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                  />
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div style={{ borderTop: `1px solid ${BORDER}`, padding: 16, background: BG_SUB }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, fontFamily: FONT }}>
                Ad Group Summary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Name',     value: adGroupData.name || '-' },
                  { label: 'Type',     value: adGroupData.campaignType?.replace('_', ' ') || '-' },
                  { label: 'Pricing',  value: adGroupData.pricingModel?.toUpperCase() || '-' },
                  { label: 'Products', value: adGroupData.productSelectionMethod || '-' },
                  { label: 'Bidding',  value: adGroupData.bidSettings?.mode || 'Auto' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontFamily: FONT }}>
                    <span style={{ color: TEXT_MID }}>{label}</span>
                    <span style={{
                      fontWeight: 500, color: TEXT,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      maxWidth: 120, textTransform: 'capitalize',
                    }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: 32 }}>{renderStepContent()}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${BORDER}`,
          background: BG,
          padding: '16px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>Back</Button>
            )}
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              style={{ minWidth: 120 }}
            >
              {currentStep === productAdGroupSteps.length ? 'Save Ad Group' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(wizardContent, portalContainer);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModeCard({ isSelected, onClick, icon: MIcon, badge, title, description }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 20, borderRadius: 12, textAlign: 'left', cursor: 'pointer',
        border: isSelected ? `2px solid ${ACCENT}` : `2px solid ${hov ? '#d1d5db' : BORDER}`,
        background: isSelected ? ACCENT_M : BG,
        transition: 'all 0.15s', fontFamily: FONT, flex: 1, minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isSelected ? ACCENT : BG_SUB,
          color: isSelected ? '#fff' : TEXT_MID,
        }}>
          <MIcon size={20} />
        </div>
        {badge && (
          <span style={{
            padding: '2px 8px', fontSize: 11, fontWeight: 600, borderRadius: 4,
            background: isSelected ? ACCENT : BORDER,
            color: isSelected ? '#fff' : TEXT_MID,
          }}>{badge}</span>
        )}
      </div>
      <div style={{ fontWeight: 600, color: TEXT, marginBottom: 4, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>{description}</div>
    </button>
  );
}

function PricingCard({ isSelected, onClick, icon: PIcon, title, description, pill }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 24, borderRadius: 12, textAlign: 'left', cursor: 'pointer',
        border: isSelected ? `2px solid ${ACCENT}` : `2px solid ${hov ? '#d1d5db' : BORDER}`,
        background: isSelected ? ACCENT_M : BG,
        transition: 'all 0.15s', fontFamily: FONT, flex: 1, minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isSelected ? ACCENT : BG_SUB,
          color: isSelected ? '#fff' : TEXT_MID,
        }}>
          <PIcon size={24} />
        </div>
      </div>
      <div style={{ fontWeight: 600, color: TEXT, marginBottom: 8, fontSize: 16 }}>{title}</div>
      <div style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16, lineHeight: 1.5 }}>{description}</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, color: pill.color,
        background: pill.bg,
        padding: '6px 12px', borderRadius: 999,
      }}>
        {pill.check && <CheckIcon size={14} />}
        <span>{pill.label}</span>
      </div>
    </button>
  );
}

function FilterRow({ filter, onUpdate, onRemove, canRemove }) {
  const [trashHov, setTrashHov] = useState(false);

  const valueOptions = filter.field === 'category'
    ? mockCategories.map((c) => ({ value: c.id, label: c.name }))
    : filter.field === 'brand'
      ? mockBrands.map((b) => ({ value: b.id, label: b.name }))
      : [{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Select
        value={filter.field}
        onChange={(e) => onUpdate({ field: e.target.value })}
        options={filterCriteria.map((c) => ({ value: c.id, label: c.name }))}
        style={{ width: 180 }}
      />
      <Select
        value={filter.operator}
        onChange={(e) => onUpdate({ operator: e.target.value })}
        options={filterOperators.map((op) => ({ value: op.id, label: op.name }))}
        style={{ width: 140 }}
      />
      <Select
        value={filter.value}
        onChange={(e) => onUpdate({ value: e.target.value })}
        options={[{ value: '', label: 'Select value' }, ...valueOptions]}
        style={{ flex: 1 }}
      />
      {canRemove && (
        <button
          onClick={onRemove}
          onMouseEnter={() => setTrashHov(true)}
          onMouseLeave={() => setTrashHov(false)}
          style={{
            padding: 8, border: 'none', background: 'none', cursor: 'pointer',
            color: trashHov ? '#ef4444' : TEXT_SUB,
            transition: 'color 0.15s', display: 'flex', alignItems: 'center',
          }}
        >
          <TrashIcon size={16} />
        </button>
      )}
    </div>
  );
}

function ProductRow({ product, isSelected, onToggle, selectionColor, selectionBg }) {
  const [hov, setHov] = useState(false);
  return (
    <label
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: 12,
        borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
        border: isSelected ? `1px solid ${selectionColor}` : `1px solid ${hov ? '#d1d5db' : BORDER}`,
        background: isSelected ? selectionBg : BG,
        fontFamily: FONT,
      }}
    >
      <Checkbox checked={isSelected} onChange={onToggle} />
      <div style={{
        width: 40, height: 40, background: BG_SUB, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <PackageIcon size={16} style={{ color: TEXT_SUB }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 500, color: TEXT, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 12, color: TEXT_MID, margin: 0, marginTop: 2 }}>
          {product.sku} &bull; {product.category} &bull; {product.brand}
        </p>
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: TEXT, flexShrink: 0 }}>${product.price}</span>
    </label>
  );
}

function NetworkRow({ network, isSelected, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <label
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: 16,
        borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
        border: isSelected ? `1px solid ${ACCENT}` : `1px solid ${hov ? '#d1d5db' : BORDER}`,
        background: isSelected ? ACCENT_M : BG,
        fontFamily: FONT,
      }}
    >
      <Checkbox checked={isSelected} onChange={onToggle} />
      <img src={network.logo || '/placeholder.svg'} alt={network.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 500, color: TEXT, fontSize: 13, margin: 0 }}>{network.name}</p>
        <p style={{ fontSize: 12, color: TEXT_MID, margin: 0, marginTop: 2 }}>{network.reach}</p>
      </div>
    </label>
  );
}

function StepItem({ step, isCompleted, isCurrent, isDisabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={isDisabled}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 12px', borderRadius: 8, textAlign: 'left',
        border: isCurrent ? `1px solid ${ACCENT}` : '1px solid transparent',
        background: isCurrent ? ACCENT_M : hov && !isDisabled ? BG_SUB : 'transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition: 'all 0.15s', fontFamily: FONT,
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 999, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 500,
        background: isCompleted ? GREEN : isCurrent ? ACCENT : BG_SUB,
        color: (isCompleted || isCurrent) ? '#fff' : TEXT_MID,
        transition: 'all 0.15s',
      }}>
        {isCompleted ? <CheckIcon size={16} /> : step.id}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500,
          color: isCurrent ? ACCENT : isCompleted ? TEXT : TEXT_SUB,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {step.label}
        </div>
        <div style={{ fontSize: 12, color: TEXT_SUB, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {step.description}
        </div>
      </div>
    </button>
  );
}

function KeywordTag({ keyword, onRemove }) {
  const [hov, setHov] = useState(false);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', background: BG_SUB, borderRadius: 999,
      fontSize: 13, fontFamily: FONT, color: TEXT,
    }}>
      {keyword}
      <button
        onClick={onRemove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', padding: 0,
          color: hov ? '#ef4444' : TEXT_SUB,
          transition: 'color 0.15s',
        }}
      >
        <CloseIcon size={14} />
      </button>
    </span>
  );
}

// Re-export mock data so filterCriteria/filterOperators/mockCategories/mockBrands
// are accessible inside FilterRow (they're module-scope, so no issue)
