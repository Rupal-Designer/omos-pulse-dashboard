"use client";
import { useState } from "react";
import {
  X,
  Pencil,
  Info,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InventoryDetailsDrawer } from "./inventory-details-drawer";
import { ProductSelectionDrawer } from "./product-selection-drawer";

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
      // Save and close
      onSave({
        name: adGroupName,
        selectedPages,
        targeting: selectedTargeting,
        adFormat: selectedAdFormat,
        creatives: adCreatives,
        productSelection: selectedProducts,
      });
      onClose();
      // Reset state
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
      <div className="fixed inset-0 z-[60] bg-black/20" onClick={onClose} />
      <div
        className="fixed right-0 top-0 z-[60] h-full bg-[#f4f6f9] shadow-xl flex flex-col transition-transform duration-300"
        style={{ width: "80%" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <Input
              value={adGroupName}
              onChange={(e) => setAdGroupName(e.target.value)}
              className="text-lg font-semibold text-[#2d2d2d] border-none shadow-none p-0 h-auto focus-visible:ring-0 w-auto"
            />

            <button className="text-[#6b7280] hover:text-[#2d2d2d] transition-colors">
              <Pencil size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-[#2563eb] hover:underline"
            >
              <Info size={14} />
              How to create an Ad Group?
            </a>
            <button
              onClick={onClose}
              className="text-[#6b7280] hover:text-[#2d2d2d] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Stepper */}
            <div className="px-6 py-4 bg-white border-b border-[#e5e7eb]">
              <div className="flex items-center gap-8">
                <StepItem
                  number={1}
                  label="Inventory"
                  active={currentStep === 1}
                  completed={currentStep > 1}
                />
                <StepItem
                  number={2}
                  label="Targeting"
                  active={currentStep === 2}
                  completed={currentStep > 2}
                />
                <StepItem
                  number={3}
                  label="Ad Creation"
                  active={currentStep === 3}
                  completed={currentStep > 3}
                />
                <StepItem
                  number={4}
                  label="Configure"
                  active={currentStep === 4}
                  completed={currentStep > 4}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-auto p-6">
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
            <div className="px-6 py-4 bg-white border-t border-[#e5e7eb] flex justify-center gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  className="px-8 border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] bg-transparent"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button
                variant="outline"
                className="px-8 border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff] bg-transparent"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="px-8 bg-[#475569] hover:bg-[#334155] text-white"
                onClick={handleNext}
              >
                {currentStep === 4 ? "Save Ad Group" : "Next"}
              </Button>
            </div>
          </div>

          {/* Ad Group Summary Sidebar */}
          <div className="w-64 bg-white border-l border-[#e5e7eb] flex flex-col">
            <div className="bg-[#7c3aed] text-white px-4 py-3 flex items-center gap-2">
              <ChevronRight size={16} />
              <span className="font-medium">Ad Group Summary</span>
            </div>

            <div className="flex-1 overflow-auto">
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

      {/* Inventory Details Drawer (70% width) */}
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

function StepItem({ number, label, active = false, completed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
          active
            ? "bg-[#2563eb] text-white"
            : completed
              ? "bg-[#16a34a] text-white"
              : "bg-[#e5e7eb] text-[#6b7280]"
        }`}
      >
        {completed ? <Check size={14} /> : number}
      </div>
      <span
        className={`text-sm font-medium ${active ? "text-[#2563eb]" : completed ? "text-[#16a34a]" : "text-[#6b7280]"}`}
      >
        {label}
      </span>
    </div>
  );
}

function SummarySection({ label, expanded, onToggle, count, active }) {
  return (
    <div
      className={`border-b border-[#e5e7eb] ${active ? "bg-[#eff6ff]" : ""}`}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f9fafb] transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${active ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
          >
            {label}
          </span>
          {count !== undefined && count > 0 && (
            <span className="text-xs bg-[#2563eb] text-white px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <ChevronRight
          size={16}
          className={`text-[#6b7280] transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>
    </div>
  );
}

function InventoryStep({ pages, selectedPages, togglePage, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
      <button className="w-full flex items-center justify-between p-4 text-left border-b border-[#e5e7eb]">
        <span className="font-semibold text-[#2d2d2d]">Select Page</span>
        <ChevronDown size={20} className="text-[#6b7280]" />
      </button>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-4">
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

function InventoryCard({ page, selected, onToggle, onViewDetails }) {
  return (
    <div
      className={`border rounded-xl p-4 transition-all cursor-pointer ${
        selected
          ? "border-[#2563eb] bg-[#eff6ff] shadow-sm"
          : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
            selected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#d1d5db]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {selected && <Check size={12} className="text-white" />}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#2d2d2d] mb-1">{page.name}</h4>
          <div className="flex items-center gap-1 text-sm">
            <Sparkles size={12} className="text-[#7c3aed]" />
            <span className="text-[#7c3aed]">Est. Daily Imp(next 30 days)</span>
            <span className="text-[#2d2d2d] font-semibold ml-auto">
              {page.estDailyImp}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Project Daily Impression</span>
          <span className="text-[#2d2d2d] font-medium">
            {page.projectDailyImp}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Avg. Daily Impression</span>
          <span className="text-[#2d2d2d] font-medium">{page.avgDailyImp}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Total Inventories</span>
          <span className="text-[#2d2d2d] font-medium">
            {page.totalInventories}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Targeting Options</span>
          <span className="text-[#2d2d2d] font-medium">
            {page.targetingOptions}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        {page.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-md border border-[#e5e7eb]"
          >
            {tag}
          </span>
        ))}
        {page.extraTags > 0 && (
          <span className="text-xs text-[#2563eb] font-medium">
            +{page.extraTags}
          </span>
        )}
      </div>

      <button
        className="text-xs text-[#2563eb] hover:underline font-medium"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
      >
        View Ad Slots →
      </button>
    </div>
  );
}

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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="9" cy="7" r="4" stroke="#2563eb" strokeWidth="2" />
          <path
            d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="17" cy="11" r="3" stroke="#2563eb" strokeWidth="2" />
          <path
            d="M21 21v-1.5a3 3 0 00-3-3h-1"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      iconBg: "bg-[#eff6ff]",
      selectedCount: selected.demographics.length,
    },
    {
      id: "interests",
      title: "Interests & Behaviours",
      description: "Target based on shopping interests and browsing behavior",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconBg: "bg-[#f5f3ff]",
      selectedCount: selected.interests.length,
    },
    {
      id: "behaviors",
      title: "Audience Segments",
      description:
        "Target specific customer segments like loyal customers or cart abandoners",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke="#10b981"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke="#10b981"
            strokeWidth="2"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke="#10b981"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke="#10b981"
            strokeWidth="2"
          />
        </svg>
      ),
      iconBg: "bg-[#ecfdf5]",
      selectedCount: selected.behaviors.length,
    },
    {
      id: "keywords",
      title: "Keyword Targeting",
      description:
        "Use relevant keywords to reach customers searching for your products",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" stroke="#f59e0b" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      iconBg: "bg-[#fffbeb]",
      selectedCount: selected.keywords.length,
    },
    {
      id: "products",
      title: "Product Catalog",
      description:
        "Choose specific products or categories to feature in your ads",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
            stroke="#06b6d4"
            strokeWidth="2"
          />

          <path
            d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
            stroke="#06b6d4"
            strokeWidth="2"
          />
        </svg>
      ),
      iconBg: "bg-[#ecfeff]",
      selectedCount: productSelection?.includedProducts?.length || 0,
      isProduct: true,
    },
  ];

  const getStatusBadge = (type) => {
    if (type.isProduct) {
      if (productSelection) {
        return (
          <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
            {productSelection.mode === "smart" ? "SMART" : "MANUAL"}
          </span>
        );
      }
      return (
        <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#f3f4f6] text-[#6b7280] border border-[#e5e7eb]">
          NOT CONFIGURED
        </span>
      );
    }
    if (type.selectedCount > 0) {
      return (
        <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
          {type.selectedCount} SELECTED
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#f3f4f6] text-[#6b7280] border border-[#e5e7eb]">
        NOT CONFIGURED
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1f2937]">Targeting</h2>
          <p className="text-sm text-[#6b7280] mt-1">
            Configure how your ads reach the right audience (optional)
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-[#f3f4f6] rounded-lg">
          <button
            onClick={() => setTargetingMode("auto")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              targetingMode === "auto"
                ? "bg-white text-[#1f2937] shadow-sm"
                : "text-[#6b7280] hover:text-[#1f2937]"
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setTargetingMode("manual")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              targetingMode === "manual"
                ? "bg-white text-[#1f2937] shadow-sm"
                : "text-[#6b7280] hover:text-[#1f2937]"
            }`}
          >
            Manual
          </button>
        </div>
      </div>

      {targetingMode === "auto" ? (
        <div className="bg-gradient-to-br from-[#eff6ff] to-[#f5f3ff] rounded-xl border border-[#e5e7eb] p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M2 17l10 5 10-5"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M2 12l10 5 10-5"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
                AI-Optimized Targeting
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Our AI will automatically optimize your ad targeting based on
                your campaign objective, creative content, and historical
                performance data. This typically results in 20-30% better
                performance compared to manual targeting.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#6b7280] border border-[#e5e7eb]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Smart audience discovery
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#6b7280] border border-[#e5e7eb]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Real-time optimization
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#6b7280] border border-[#e5e7eb]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Cross-platform learning
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {targetingTypes.map((type) => (
            <div
              key={type.id}
              onClick={() =>
                type.isProduct
                  ? onOpenProductSelection()
                  : setActiveModal(type.id)
              }
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#e5e7eb] cursor-pointer hover:border-[#2563eb] hover:shadow-sm transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${type.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                {type.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#1f2937]">
                  {type.title}
                </h3>
                <p className="text-xs text-[#6b7280] mt-0.5">
                  {type.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(type)}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  className="group-hover:stroke-[#2563eb] transition-colors"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals for each targeting type - only shown in manual mode */}
      {targetingMode === "manual" && (
        <>
          {/* Demographics Modal */}
          {activeModal === "demographics" && (
            <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                  <h3 className="text-lg font-semibold text-[#1f2937]">
                    Demographics Targeting
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {options.demographics.map((demo) => (
                      <label
                        key={demo.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#2563eb] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.demographics.includes(demo.id)}
                          onChange={() =>
                            toggleTargeting("demographics", demo.id)
                          }
                          className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                        />

                        <span className="text-sm text-[#1f2937]">
                          {demo.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-[#e5e7eb] flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    onClick={() => setActiveModal(null)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Interests Modal */}
          {activeModal === "interests" && (
            <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                  <h3 className="text-lg font-semibold text-[#1f2937]">
                    Interests & Behaviours
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {options.interests.map((interest) => (
                      <label
                        key={interest.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#2563eb] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.interests.includes(interest.id)}
                          onChange={() =>
                            toggleTargeting("interests", interest.id)
                          }
                          className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                        />

                        <span className="text-sm text-[#1f2937]">
                          {interest.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-[#e5e7eb] flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    onClick={() => setActiveModal(null)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Behaviors Modal */}
          {activeModal === "behaviors" && (
            <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                  <h3 className="text-lg font-semibold text-[#1f2937]">
                    Audience Segments
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {options.behaviors.map((behavior) => (
                      <label
                        key={behavior.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#2563eb] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.behaviors.includes(behavior.id)}
                          onChange={() =>
                            toggleTargeting("behaviors", behavior.id)
                          }
                          className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                        />

                        <span className="text-sm text-[#1f2937]">
                          {behavior.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-[#e5e7eb] flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    onClick={() => setActiveModal(null)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Keywords Modal */}
          {activeModal === "keywords" && (
            <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                  <h3 className="text-lg font-semibold text-[#1f2937]">
                    Keyword Targeting
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1 hover:bg-[#f3f4f6] rounded"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {options.keywords.map((keyword) => (
                      <label
                        key={keyword.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#2563eb] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selected.keywords.includes(keyword.id)}
                          onChange={() =>
                            toggleTargeting("keywords", keyword.id)
                          }
                          className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                        />

                        <span className="text-sm text-[#1f2937]">
                          {keyword.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-[#e5e7eb] flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    onClick={() => setActiveModal(null)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AdCreationStep({
  formats,
  selectedFormat,
  setSelectedFormat,
  creatives,
  setCreatives,
}) {
  const addCreative = () => {
    setCreatives([
      ...creatives,
      { headline: "", description: "", ctaText: "Shop Now" },
    ]);
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
    <div className="space-y-6">
      {/* Ad Format Selection */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <h3 className="font-semibold text-[#2d2d2d] mb-4">Select Ad Format</h3>
        <div className="grid grid-cols-3 gap-4">
          {formats.map((format) => (
            <div
              key={format.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedFormat === format.id
                  ? "border-[#2563eb] bg-[#eff6ff] shadow-sm"
                  : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:shadow-sm"
              }`}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedFormat === format.id
                      ? "border-[#2563eb] bg-[#2563eb]"
                      : "border-[#d1d5db]"
                  }`}
                >
                  {selectedFormat === format.id && (
                    <Check size={8} className="text-white" />
                  )}
                </div>
                <span className="font-medium text-[#2d2d2d]">
                  {format.name}
                </span>
              </div>
              <div className="ml-6 text-sm text-[#6b7280]">
                <p>{format.dimensions}</p>
                <p className="text-xs mt-1">{format.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Creatives */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#2d2d2d]">Ad Creatives</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addCreative}
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] bg-transparent"
          >
            <Plus size={14} className="mr-1" />
            Add Creative
          </Button>
        </div>

        <div className="space-y-4">
          {creatives.map((creative, index) => (
            <div
              key={index}
              className="border border-[#e5e7eb] rounded-xl p-4 bg-[#fafafa]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-[#6b7280]">
                  Creative {index + 1}
                </span>
                {creatives.length > 1 && (
                  <button
                    onClick={() => removeCreative(index)}
                    className="text-[#ef4444] hover:text-[#dc2626]"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="border-2 border-dashed border-[#d1d5db] rounded-xl p-8 text-center bg-white hover:border-[#2563eb] transition-colors cursor-pointer">
                    <Upload size={32} className="mx-auto text-[#9ca3af] mb-2" />
                    <p className="text-sm text-[#6b7280]">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-[#9ca3af] mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#2d2d2d] mb-1 block font-medium">
                    Headline
                  </label>
                  <Input
                    placeholder="Enter headline"
                    value={creative.headline}
                    onChange={(e) =>
                      updateCreative(index, "headline", e.target.value)
                    }
                    className="border-[#e5e7eb] focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#2d2d2d] mb-1 block font-medium">
                    CTA Text
                  </label>
                  <Input
                    placeholder="Shop Now"
                    value={creative.ctaText}
                    onChange={(e) =>
                      updateCreative(index, "ctaText", e.target.value)
                    }
                    className="border-[#e5e7eb] focus:border-[#2563eb]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-[#2d2d2d] mb-1 block font-medium">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    value={creative.description}
                    onChange={(e) =>
                      updateCreative(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm resize-none h-20 focus:border-[#2563eb] outline-none"
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

function ConfigStep({ settings, setSettings }) {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`,
  );

  const toggleHour = (hour) => {
    const current = settings.dayParting;
    if (current.includes(hour)) {
      setSettings({
        ...settings,
        dayParting: current.filter((h) => h !== hour),
      });
    } else {
      setSettings({ ...settings, dayParting: [...current, hour] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Frequency Capping */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <h3 className="font-semibold text-[#2d2d2d] mb-4">Frequency Capping</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm text-[#6b7280] mb-1 block">
              Max impressions per user
            </label>
            <Input
              type="number"
              value={settings.frequencyCap}
              onChange={(e) =>
                setSettings({ ...settings, frequencyCap: e.target.value })
              }
              className="w-32 border-[#e5e7eb] focus:border-[#2563eb]"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-[#6b7280] mb-1 block">
              Time period
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm appearance-none bg-white focus:border-[#2563eb] outline-none"
                value={settings.frequencyPeriod}
                onChange={(e) =>
                  setSettings({ ...settings, frequencyPeriod: e.target.value })
                }
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
                <option value="month">Per Month</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <h3 className="font-semibold text-[#2d2d2d] mb-4">Delivery Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              id: "standard",
              label: "Standard",
              desc: "Distribute evenly over time",
            },
            {
              id: "accelerated",
              label: "Accelerated",
              desc: "Spend budget as fast as possible",
            },
            {
              id: "frontloaded",
              label: "Frontloaded",
              desc: "More impressions early in the day",
            },
          ].map((type) => (
            <div
              key={type.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                settings.deliveryType === type.id
                  ? "border-[#2563eb] bg-[#eff6ff] shadow-sm"
                  : "border-[#e5e7eb] bg-white hover:border-[#9ca3af]"
              }`}
              onClick={() =>
                setSettings({ ...settings, deliveryType: type.id })
              }
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    settings.deliveryType === type.id
                      ? "border-[#2563eb] bg-[#2563eb]"
                      : "border-[#d1d5db]"
                  }`}
                >
                  {settings.deliveryType === type.id && (
                    <Check size={8} className="text-white" />
                  )}
                </div>
                <span className="font-medium text-[#2d2d2d]">{type.label}</span>
              </div>
              <p className="text-xs text-[#6b7280] ml-6">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day Parting */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <h3 className="font-semibold text-[#2d2d2d] mb-4">
          Day Parting (Optional)
        </h3>
        <p className="text-sm text-[#6b7280] mb-4">
          Select specific hours to run your ads
        </p>
        <div className="grid grid-cols-8 gap-2">
          {hours.map((hour) => (
            <button
              key={hour}
              className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                settings.dayParting.includes(hour)
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#9ca3af]"
              }`}
              onClick={() => toggleHour(hour)}
            >
              {hour}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Safety */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
        <h3 className="font-semibold text-[#2d2d2d] mb-4">Brand Safety</h3>
        <div className="space-y-3">
          {[
            { id: "adult", label: "Exclude adult content" },
            { id: "violence", label: "Exclude violent content" },
            { id: "gambling", label: "Exclude gambling content" },
            { id: "political", label: "Exclude political content" },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
              />

              <span className="text-sm text-[#2d2d2d] group-hover:text-[#2563eb] transition-colors">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
