"use client";
import { useState } from "react";
import {
  X,
  Info,
  Check,
  Plus,
  Trash2,
  MapPin,
  Store,
  Monitor,
  ShoppingCart,
  HelpCircle,
  DollarSign,
  Calendar,
  ImageIcon,
  Package,
  Search,
  Filter,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
const storeLocations = [
  {
    id: 1,
    name: "Downtown Flagship Store",
    city: "New York",
    state: "NY",
    screens: 24,
    dailyFootfall: "15K",
    avgDwellTime: "45 min"
  },
  {
    id: 2,
    name: "Mall of America",
    city: "Minneapolis",
    state: "MN",
    screens: 18,
    dailyFootfall: "22K",
    avgDwellTime: "60 min"
  },
  {
    id: 3,
    name: "Beverly Center",
    city: "Los Angeles",
    state: "CA",
    screens: 12,
    dailyFootfall: "12K",
    avgDwellTime: "35 min"
  },
  {
    id: 4,
    name: "Michigan Avenue Store",
    city: "Chicago",
    state: "IL",
    screens: 16,
    dailyFootfall: "18K",
    avgDwellTime: "40 min"
  },
  {
    id: 5,
    name: "Union Square",
    city: "San Francisco",
    state: "CA",
    screens: 10,
    dailyFootfall: "9K",
    avgDwellTime: "30 min"
  },
  {
    id: 6,
    name: "Galleria Dallas",
    city: "Dallas",
    state: "TX",
    screens: 14,
    dailyFootfall: "14K",
    avgDwellTime: "50 min"
  }
];
const screenZones = [
  {
    id: 1,
    name: "Store Entrance",
    description: "High visibility screens at entry points",
    avgImpressions: "8.5K/day",
    screens: 45,
    stores: 12
  },
  {
    id: 2,
    name: "Checkout Area",
    description: "Screens near POS terminals",
    avgImpressions: "12K/day",
    screens: 68,
    stores: 18
  },
  {
    id: 3,
    name: "Aisle End Caps",
    description: "Digital displays at aisle ends",
    avgImpressions: "6.2K/day",
    screens: 120,
    stores: 20
  },
  {
    id: 4,
    name: "Department Sections",
    description: "Category-specific placements",
    avgImpressions: "4.8K/day",
    screens: 85,
    stores: 15
  },
  {
    id: 5,
    name: "Fitting Rooms",
    description: "Interactive screens in fitting areas",
    avgImpressions: "2.1K/day",
    screens: 32,
    stores: 10
  },
  {
    id: 6,
    name: "Window Displays",
    description: "Outward-facing digital windows",
    avgImpressions: "15K/day",
    screens: 28,
    stores: 14
  },
  {
    id: 7,
    name: "Frozen Section",
    description: "Screens near frozen food aisles",
    avgImpressions: "5.4K/day",
    screens: 42,
    stores: 16
  },
  {
    id: 8,
    name: "Dairy Section",
    description: "Digital displays in dairy area",
    avgImpressions: "4.9K/day",
    screens: 38,
    stores: 14
  },
  {
    id: 9,
    name: "Bakery Counter",
    description: "Screens at bakery service area",
    avgImpressions: "3.8K/day",
    screens: 25,
    stores: 12
  },
  {
    id: 10,
    name: "Deli Counter",
    description: "Digital menu boards at deli",
    avgImpressions: "4.2K/day",
    screens: 30,
    stores: 11
  },
  {
    id: 11,
    name: "Pharmacy Area",
    description: "Health-focused screen placements",
    avgImpressions: "3.1K/day",
    screens: 22,
    stores: 8
  },
  {
    id: 12,
    name: "Electronics Section",
    description: "Tech demo and promo screens",
    avgImpressions: "6.8K/day",
    screens: 55,
    stores: 15
  },
  {
    id: 13,
    name: "Customer Service",
    description: "Screens near service desk",
    avgImpressions: "2.8K/day",
    screens: 18,
    stores: 18
  },
  {
    id: 14,
    name: "Waiting Areas",
    description: "Screens in seating/waiting zones",
    avgImpressions: "3.5K/day",
    screens: 24,
    stores: 10
  },
  {
    id: 15,
    name: "Meat Counter",
    description: "Digital displays at meat section",
    avgImpressions: "4.1K/day",
    screens: 28,
    stores: 12
  }
];
const screenFormats = [
  { id: "digital_signage", name: "Digital Signage", dimensions: "1920 x 1080", orientation: "Landscape" },
  { id: "vertical_display", name: "Vertical Display", dimensions: "1080 x 1920", orientation: "Portrait" },
  { id: "interactive_kiosk", name: "Interactive Kiosk", dimensions: "1080 x 1920", orientation: "Portrait" },
  { id: "shelf_edge", name: "Shelf Edge Display", dimensions: "800 x 480", orientation: "Landscape" },
  { id: "video_wall", name: "Video Wall", dimensions: "3840 x 2160", orientation: "Landscape" }
];
const filterCriteria = [
  { id: "product_category", label: "Product Category" },
  { id: "brand", label: "Brand" },
  { id: "price_range", label: "Price Range" },
  { id: "sku", label: "SKU" },
  { id: "department", label: "Department" },
  { id: "supplier", label: "Supplier" }
];
const filterOperators = [
  { id: "contains", label: "contains" },
  { id: "equals", label: "equals" },
  { id: "starts_with", label: "starts with" },
  { id: "ends_with", label: "ends with" },
  { id: "not_equals", label: "does not equal" }
];
const sampleScreens = [
  {
    id: "1",
    name: "Billing_Back Screen",
    store: "FreshMart Central",
    city: "San Francisco",
    state: "CA",
    tags: ["Fruits", "Veggies", "+2"]
  },
  { id: "2", name: "Checkout Screen 1", store: "FreshMart North", city: "San Francisco", state: "CA", tags: ["East"] },
  {
    id: "3",
    name: "Frozen Section Screen",
    store: "FreshMart South",
    city: "San Francisco",
    state: "CA",
    tags: ["North"]
  },
  {
    id: "4",
    name: "Bakery Screen",
    store: "FreshMart East",
    city: "San Diego",
    state: "CA",
    tags: ["Clothes", "Care"]
  },
  {
    id: "5",
    name: "Dairy Section Screen",
    store: "FreshMart West",
    city: "San Diego",
    state: "CA",
    tags: ["North", "West"]
  },
  {
    id: "6",
    name: "Meat Counter Screen",
    store: "FreshMart Central",
    city: "San Diego",
    state: "CA",
    tags: ["East"],
    isNew: true
  },
  {
    id: "7",
    name: "Seafood Section Screen",
    store: "FreshMart North",
    city: "Oakland",
    state: "CA",
    tags: ["West"],
    isNew: true
  },
  {
    id: "8",
    name: "Health Foods Aisle Screen",
    store: "FreshMart West",
    city: "Oakland",
    state: "CA",
    tags: ["West"],
    isNew: true
  },
  {
    id: "9",
    name: "Waiting Areas",
    store: "FreshMart West",
    city: "Oakland",
    state: "CA",
    tags: ["West", "East"],
    isNew: true
  },
  { id: "10", name: "Entry Point", store: "FreshMart West", city: "Oakland", state: "CA", tags: ["West"], isNew: true }
];
function InstoreAdGroupWizard({
  open,
  onClose,
  onSave,
  campaignName = "In-store Campaign"
}) {
  const [adGroupName, setAdGroupName] = useState("In-store Ad Group 1");
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState(["summary"]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [productSelectionMode, setProductSelectionMode] = useState("filters");
  const [productFilters, setProductFilters] = useState([
    { criteria: "product_category", operator: "contains", value: "" }
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
    { field: "State", operator: "is", value: "California" }
  ]);
  const [selectedScreens, setSelectedScreens] = useState([]);
  const [showScreenSelector, setShowScreenSelector] = useState(false);
  const [screenSearchQuery, setScreenSearchQuery] = useState("");
  const filterFields = ["Placement Category", "Store", "City", "State", "Screen Type", "Tag"];
  const filterOperators2 = ["is", "is not", "contains", "does not contain"];
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
    setSelectedScreens((prev) => prev.includes(screenId) ? prev.filter((id) => id !== screenId) : [...prev, screenId]);
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
  const steps = [
    { id: 1, name: "Screen Selection", icon: Monitor },
    { id: 2, name: "Products", icon: Package },
    { id: 3, name: "Scheduling", icon: Calendar },
    { id: 4, name: "Creative", icon: ImageIcon },
    { id: 5, name: "Bidding", icon: DollarSign }
  ];
  const toggleSection = (section) => {
    setExpandedSections((prev) => prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]);
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
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave?.({
        name: adGroupName,
        stores: selectedStores,
        zones: selectedZonesCount,
        // Use placeholder value
        products: {
          mode: productSelectionMode,
          filters: productFilters,
          included: selectedProducts,
          excluded: excludedProducts
        },
        scheduling: {
          type: schedulingType,
          days: selectedDays,
          timeSlots
        },
        formats: selectedFormats,
        creatives,
        pricing: {
          model: pricingModel,
          bid: bidAmount
        },
        screens: eligibleScreens
        // Add screen count to summary
      });
      onClose();
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  if (!open) return null;
  return <>
      {
    /* Overlay */
  }
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {
    /* Drawer Container - slides from right */
  }
      <div
    className="fixed right-0 top-0 z-[60] h-full bg-white shadow-xl flex flex-col transition-transform duration-300"
    style={{ width: "85%" }}
  >
        {
    /* Header */
  }
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#efefef]">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#7b7b7b]">{campaignName || "In-Store Digital Campaign"}</span>
            <span className="text-[#c5c5c5]">&gt;</span>
            <span className="text-[#2d2d2d] font-medium">{adGroupName || "New Ad Group"}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-1.5 text-sm text-[#2563eb] hover:underline">
              <HelpCircle size={16} />
              How to create an In-store Ad Group?
            </a>
            <button onClick={onClose} className="text-[#7b7b7b] hover:text-[#2d2d2d]">
              <X size={20} />
            </button>
          </div>
        </div>

        {
    /* Body */
  }
        <div className="flex flex-1 overflow-hidden">
          {
    /* Sidebar */
  }
          <div className="w-64 border-r border-[#efefef] bg-[#fafafa] flex flex-col">
            <div className="p-4 flex-1">
              {
    /* Steps */
  }
              <div className="space-y-1">
                {steps.map((step, index) => {
    const Icon = step.icon;
    const isActive = currentStep === step.id;
    const isCompleted = currentStep > step.id;
    return <button
      key={step.id}
      onClick={() => setCurrentStep(step.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isActive ? "bg-[#2563eb] text-white" : isCompleted ? "text-[#2d2d2d] hover:bg-[#efefef]" : "text-[#7b7b7b] hover:bg-[#efefef]"}`}
    >
                      <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${isActive ? "bg-white/20 text-white" : isCompleted ? "bg-[#22c55e] text-white" : "bg-[#e5e5e5] text-[#7b7b7b]"}`}
    >
                        {isCompleted ? <Check size={12} /> : step.id}
                      </div>
                      <span className="text-sm font-medium">{step.name}</span>
                    </button>;
  })}
              </div>
            </div>

            {
    /* Ad Group Summary */
  }
            <div className="border-t border-[#efefef] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Store size={16} className="text-[#2563eb]" />
                <span className="font-medium text-[#2d2d2d] text-sm">Ad Group Summary</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#7b7b7b]">Screens</span>
                  <span className="text-[#2d2d2d] font-medium">{eligibleScreens}</span>
                </div>
                {
    /* CHANGE: Removed Screen Zones row from summary */
  }
                {
    /* <div className="flex justify-between">
      <span className="text-[#7b7b7b]">Screen Zones</span>
      <span className="text-[#2d2d2d] font-medium">{selectedZonesCount}</span>
    </div> */
  }
                <div className="flex justify-between">
                  <span className="text-[#7b7b7b]">Products</span>
                  <span className="text-[#2d2d2d] font-medium">
                    {productFilters.length > 0 ? `${productFilters.length} filters` : "0 filters"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7b7b7b]">Formats</span>
                  <span className="text-[#2d2d2d] font-medium">{selectedFormats.length}</span>
                </div>
              </div>
            </div>
          </div>

          {
    /* Main Content - updated background */
  }
          <div className="flex-1 overflow-y-auto p-6 bg-[#f8f9fb]">
            {
    /* Step Content */
  }
            {currentStep === 1 && <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Ad Group Details</h2>
                  <p className="text-[#7b7b7b] text-sm mb-4">Name your ad group and select screens for targeting.</p>
                </div>

                <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
                  <Label className="text-[#2d2d2d] font-medium mb-2 block">Ad Group Name</Label>
                  <Input
    value={adGroupName}
    onChange={(e) => setAdGroupName(e.target.value)}
    placeholder="Enter ad group name"
    className="bg-white border-[#e5e5e5] text-[#2d2d2d] h-11"
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
              </div>}

            {
    /* Step 2 is now Products */
  }
            {currentStep === 2 && <ProductsStep
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
  />}
            {currentStep === 3 && <SchedulingStep
    schedulingType={schedulingType}
    setSchedulingType={setSchedulingType}
    selectedDays={selectedDays}
    setSelectedDays={setSelectedDays}
    timeSlots={timeSlots}
    setTimeSlots={setTimeSlots}
  />}
            {currentStep === 4 && <CreativeStep
    formats={screenFormats}
    selectedFormats={selectedFormats}
    setSelectedFormats={setSelectedFormats}
    creatives={creatives}
    setCreatives={setCreatives}
  />}
            {currentStep === 5 && <BiddingStep
    pricingModel={pricingModel}
    setPricingModel={setPricingModel}
    bidAmount={bidAmount}
    setBidAmount={setBidAmount}
  />}
          </div>
        </div>

        {
    /* Footer */
  }
        <div className="border-t border-[#efefef] bg-white px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-[#7b7b7b]">
            Step {currentStep} of {steps.length}
          </span>
          <div className="flex items-center gap-3">
            <Button
    variant="outline"
    onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
    className="border-[#e5e5e5]"
  >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
    onClick={() => {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        onSave?.({
          name: adGroupName,
          screens: eligibleScreens,
          // Add screen count to summary
          zones: selectedZonesCount,
          // Add zone count to summary
          products: {
            mode: productSelectionMode,
            filters: productFilters,
            included: selectedProducts,
            excluded: excludedProducts
          },
          scheduling: {
            type: schedulingType,
            days: selectedDays,
            timeSlots
          },
          formats: selectedFormats,
          creatives,
          pricing: {
            model: pricingModel,
            bid: bidAmount
          }
        });
        onClose();
      }
    }}
    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
  >
              {currentStep === steps.length ? "Save Ad Group" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>;
}
function BasicsStep({
  stores,
  selectedStores,
  setSelectedStores
}) {
  const toggleStore = (id) => {
    setSelectedStores(selectedStores.includes(id) ? selectedStores.filter((s) => s !== id) : [...selectedStores, id]);
  };
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Select Store Locations</h2>
        <p className="text-[#7b7b7b] text-sm">Choose the retail locations where your in-store ads will be displayed.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stores.map((store) => <div
    key={store.id}
    onClick={() => toggleStore(store.id)}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedStores.includes(store.id) ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
            <div className="flex items-start gap-3">
              <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedStores.includes(store.id) ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
                {selectedStores.includes(store.id) && <Check size={12} className="text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Store size={16} className="text-[#2563eb]" />
                  <h3 className="font-semibold text-[#2d2d2d]">{store.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#7b7b7b] mb-3">
                  <MapPin size={12} />
                  <span>
                    {store.city}, {store.state}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-[#7b7b7b]">Screens</div>
                    <div className="text-[#2d2d2d] font-medium">{store.screens}</div>
                  </div>
                  <div>
                    <div className="text-[#7b7b7b]">Daily Footfall</div>
                    <div className="text-[#2d2d2d] font-medium">{store.dailyFootfall}</div>
                  </div>
                  <div>
                    <div className="text-[#7b7b7b]">Avg. Dwell</div>
                    <div className="text-[#2d2d2d] font-medium">{store.avgDwellTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {selectedStores.length > 0 && <div className="bg-[#f5f5f5] rounded-xl p-4 border border-[#e5e5e5]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#2d2d2d] font-medium">{selectedStores.length} stores selected</div>
              <div className="text-sm text-[#7b7b7b]">
                Total screens:{" "}
                {stores.filter((s) => selectedStores.includes(s.id)).reduce((acc, s) => acc + s.screens, 0)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#2d2d2d] font-medium">
                {stores.filter((s) => selectedStores.includes(s.id)).reduce((acc, s) => acc + Number.parseInt(s.dailyFootfall.replace("K", "000")), 0).toLocaleString()}
              </div>
              <div className="text-sm text-[#7b7b7b]">Combined daily footfall</div>
            </div>
          </div>
        </div>}
    </div>;
}
function ProductsStep({
  mode,
  setMode,
  filters,
  addFilter,
  removeFilter,
  updateFilter,
  selectedProducts,
  setSelectedProducts,
  excludedProducts,
  setExcludedProducts
}) {
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Product Selection</h2>
        <p className="text-[#7b7b7b] text-sm">
          Choose which products to feature in your in-store ads. Products matching your criteria will be dynamically
          displayed.
        </p>
      </div>

      {
    /* Selection Mode */
  }
      <div className="bg-[#f5f5f5] rounded-xl p-4 border border-[#e5e5e5]">
        <Label className="text-[#2d2d2d] mb-3 block">Selection Method</Label>
        <Select value={mode} onValueChange={(v) => setMode(v)}>
          <SelectTrigger className="bg-white border-[#e5e5e5] text-[#2d2d2d]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e5e5e5]">
            <SelectItem value="filters" className="text-[#2d2d2d] hover:bg-[#f5f5f5]">
              Select Products using Filters
            </SelectItem>
            <SelectItem value="include" className="text-[#2d2d2d] hover:bg-[#f5f5f5]">
              Select Individual Products to Include
            </SelectItem>
            <SelectItem value="exclude" className="text-[#2d2d2d] hover:bg-[#f5f5f5]">
              Select Individual Products to Exclude
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {
    /* Filter-based selection */
  }
      {mode === "filters" && <div className="bg-[#f5f5f5] rounded-xl p-5 border border-[#e5e5e5]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#7b7b7b] text-sm">
              Products will be automatically added to campaign matching filter condition.
            </p>
            <a href="#" className="text-[#2563eb] text-sm hover:underline">
              Guide to select a product by filters
            </a>
          </div>

          <div className="space-y-3">
            {filters.map((filter, index) => <div key={index} className="flex items-center gap-3">
                <Select value={filter.criteria} onValueChange={(v) => updateFilter(index, "criteria", v)}>
                  <SelectTrigger className="w-48 bg-white border-[#e5e5e5] text-[#2d2d2d]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    {filterCriteria.map((c) => <SelectItem key={c.id} value={c.id} className="text-[#2d2d2d] hover:bg-[#f5f5f5]">
                        {c.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={filter.operator} onValueChange={(v) => updateFilter(index, "operator", v)}>
                  <SelectTrigger className="w-36 bg-white border-[#e5e5e5] text-[#2d2d2d]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e5e5e5]">
                    {filterOperators.map((o) => <SelectItem key={o.id} value={o.id} className="text-[#2d2d2d] hover:bg-[#f5f5f5]">
                        {o.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                <Input
    value={filter.value}
    onChange={(e) => updateFilter(index, "value", e.target.value)}
    placeholder="Enter value..."
    className="flex-1 bg-white border-[#e5e5e5] text-[#2d2d2d] placeholder:text-[#a5a5a5]"
  />

                <button
    onClick={() => removeFilter(index)}
    className="text-[#7b7b7b] hover:text-red-500 transition-colors p-2"
    disabled={filters.length === 1}
  >
                  <Trash2 size={16} />
                </button>
              </div>)}
          </div>

          <button onClick={addFilter} className="mt-4 flex items-center gap-2 text-[#2563eb] text-sm hover:underline">
            <Plus size={16} />
            Add another filter
          </button>
        </div>}

      {
    /* Individual product selection */
  }
      {(mode === "include" || mode === "exclude") && <div className="bg-[#f5f5f5] rounded-xl p-5 border border-[#e5e5e5]">
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-[#c5c5c5] mb-4" />
            <h3 className="text-[#2d2d2d] font-medium mb-2">
              {mode === "include" ? "Select products to include" : "Select products to exclude"}
            </h3>
            <p className="text-[#7b7b7b] text-sm mb-4">Browse and select individual products from your catalog.</p>
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">Browse Product Catalog</Button>
          </div>
        </div>}
    </div>;
}
function SchedulingStep({
  schedulingType,
  setSchedulingType,
  selectedDays,
  setSelectedDays,
  timeSlots,
  setTimeSlots
}) {
  const days = [
    { id: "mon", label: "Mon" },
    { id: "tue", label: "Tue" },
    { id: "wed", label: "Wed" },
    { id: "thu", label: "Thu" },
    { id: "fri", label: "Fri" },
    { id: "sat", label: "Sat" },
    { id: "sun", label: "Sun" }
  ];
  const toggleDay = (dayId) => {
    setSelectedDays(selectedDays.includes(dayId) ? selectedDays.filter((d) => d !== dayId) : [...selectedDays, dayId]);
  };
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Scheduling & Dayparting</h2>
        <p className="text-[#7b7b7b] text-sm">
          Choose when your ads should be displayed. You can run ads continuously or set specific schedules.
        </p>
      </div>

      {
    /* Scheduling Type */
  }
      <div className="space-y-3">
        <div
    onClick={() => setSchedulingType("always")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${schedulingType === "always" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
          <div className="flex items-center gap-3">
            <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${schedulingType === "always" ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
              {schedulingType === "always" && <Check size={12} className="text-white" />}
            </div>
            <div>
              <h3 className="font-medium text-[#2d2d2d]">Run ads continuously</h3>
              <p className="text-sm text-[#7b7b7b]">Ads will be displayed during all store operating hours</p>
            </div>
          </div>
        </div>

        <div
    onClick={() => setSchedulingType("custom")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${schedulingType === "custom" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
          <div className="flex items-center gap-3">
            <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${schedulingType === "custom" ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
              {schedulingType === "custom" && <Check size={12} className="text-white" />}
            </div>
            <div>
              <h3 className="font-medium text-[#2d2d2d]">Custom schedule</h3>
              <p className="text-sm text-[#7b7b7b]">Set specific days and times for ad display</p>
            </div>
          </div>
        </div>
      </div>

      {
    /* Custom Schedule Options */
  }
      {schedulingType === "custom" && <div className="bg-[#f5f5f5] rounded-xl p-5 border border-[#e5e5e5] space-y-5">
          {
    /* Days Selection */
  }
          <div>
            <Label className="text-[#2d2d2d] mb-3 block">Select Days</Label>
            <div className="flex gap-2">
              {days.map((day) => <button
    key={day.id}
    onClick={() => toggleDay(day.id)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDays.includes(day.id) ? "bg-[#2563eb] text-white" : "bg-white border border-[#e5e5e5] text-[#7b7b7b] hover:border-[#c5c5c5]"}`}
  >
                  {day.label}
                </button>)}
            </div>
          </div>

          {
    /* Time Slots */
  }
          <div>
            <Label className="text-[#2d2d2d] mb-3 block">Time Range</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-[#7b7b7b] text-xs mb-1 block">Start Time</Label>
                <Input
    type="time"
    value={timeSlots.start}
    onChange={(e) => setTimeSlots({ ...timeSlots, start: e.target.value })}
    className="bg-white border-[#e5e5e5] text-[#2d2d2d]"
  />
              </div>
              <span className="text-[#7b7b7b] mt-5">to</span>
              <div className="flex-1">
                <Label className="text-[#7b7b7b] text-xs mb-1 block">End Time</Label>
                <Input
    type="time"
    value={timeSlots.end}
    onChange={(e) => setTimeSlots({ ...timeSlots, end: e.target.value })}
    className="bg-white border-[#e5e5e5] text-[#2d2d2d]"
  />
              </div>
            </div>
          </div>
        </div>}
    </div>;
}
function CreativeStep({
  formats,
  selectedFormats,
  setSelectedFormats,
  creatives,
  setCreatives
}) {
  const toggleFormat = (id) => {
    setSelectedFormats(
      selectedFormats.includes(id) ? selectedFormats.filter((f) => f !== id) : [...selectedFormats, id]
    );
  };
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Creative Assets</h2>
        <p className="text-[#7b7b7b] text-sm">
          Select the screen formats you want to target and upload your creative assets.
        </p>
      </div>

      {
    /* Format Selection */
  }
      <div>
        <Label className="text-[#2d2d2d] mb-3 block">Select Screen Formats</Label>
        <div className="grid grid-cols-2 gap-3">
          {formats.map((format) => <div
    key={format.id}
    onClick={() => toggleFormat(format.id)}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedFormats.includes(format.id) ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
              <div className="flex items-start gap-3">
                <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedFormats.includes(format.id) ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
                  {selectedFormats.includes(format.id) && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <h3 className="font-medium text-[#2d2d2d]">{format.name}</h3>
                  <p className="text-sm text-[#7b7b7b]">
                    {format.dimensions} • {format.orientation}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {
    /* Upload Area */
  }
      {selectedFormats.length > 0 && <div className="bg-[#f5f5f5] rounded-xl p-5 border border-[#e5e5e5]">
          <Label className="text-[#2d2d2d] mb-3 block">Upload Creatives</Label>
          <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-8 text-center bg-white">
            <Monitor size={48} className="mx-auto text-[#c5c5c5] mb-4" />
            <h3 className="text-[#2d2d2d] font-medium mb-2">Drag and drop your creative files</h3>
            <p className="text-[#7b7b7b] text-sm mb-4">Supported formats: JPG, PNG, MP4, GIF • Max file size: 50MB</p>
            <Button variant="outline" className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/5 bg-transparent">
              Browse Files
            </Button>
          </div>
        </div>}
    </div>;
}
function BiddingStep({
  pricingModel,
  setPricingModel,
  bidAmount,
  setBidAmount
}) {
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#2d2d2d] mb-2">Bidding & Pricing</h2>
        <p className="text-[#7b7b7b] text-sm">Set your pricing model and bid amount for this ad group.</p>
      </div>

      {
    /* Pricing Model */
  }
      <div className="space-y-3">
        <Label className="text-[#2d2d2d]">Pricing Model</Label>
        <div className="grid grid-cols-2 gap-3">
          <div
    onClick={() => setPricingModel("cpm")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${pricingModel === "cpm" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
            <div className="flex items-center gap-3">
              <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pricingModel === "cpm" ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
                {pricingModel === "cpm" && <Check size={12} className="text-white" />}
              </div>
              <div>
                <h3 className="font-medium text-[#2d2d2d]">CPM (Cost per Mille)</h3>
                <p className="text-sm text-[#7b7b7b]">Pay per 1,000 impressions</p>
              </div>
            </div>
          </div>

          <div
    onClick={() => setPricingModel("fixed")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${pricingModel === "fixed" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e5e5e5] bg-white hover:border-[#c5c5c5]"}`}
  >
            <div className="flex items-center gap-3">
              <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pricingModel === "fixed" ? "border-[#2563eb] bg-[#2563eb]" : "border-[#c5c5c5]"}`}
  >
                {pricingModel === "fixed" && <Check size={12} className="text-white" />}
              </div>
              <div>
                <h3 className="font-medium text-[#2d2d2d]">Fixed Rate</h3>
                <p className="text-sm text-[#7b7b7b]">Pay a fixed price per slot</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* Bid Amount */
  }
      <div className="bg-[#f5f5f5] rounded-xl p-5 border border-[#e5e5e5]">
        <Label className="text-[#2d2d2d] mb-3 block">{pricingModel === "cpm" ? "CPM Bid" : "Fixed Rate"} ($)</Label>
        <div className="flex items-center gap-3">
          <span className="text-[#7b7b7b] text-lg">$</span>
          <Input
    type="number"
    value={bidAmount}
    onChange={(e) => setBidAmount(e.target.value)}
    className="w-32 bg-white border-[#e5e5e5] text-[#2d2d2d] text-lg font-medium"
    step="0.01"
    min="0"
  />
          <span className="text-[#7b7b7b]">{pricingModel === "cpm" ? "per 1,000 impressions" : "per slot"}</span>
        </div>

        <div className="mt-4 p-3 bg-[#2563eb]/5 rounded-lg border border-[#2563eb]/20">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-[#2563eb] mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <span className="text-[#2d2d2d] font-medium">Suggested bid: $4.50 - $6.50</span>
              <p className="text-[#7b7b7b]">Based on current market rates for similar in-store placements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
function ScreenSelectionStep({
  selectionMode,
  setSelectionMode,
  filterRules,
  setFilterRules,
  selectedScreens,
  setSelectedScreens,
  stores,
  selectedStores,
  setSelectedStores
}) {
  const screenSearchQuery = "";
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
    setSelectedScreens((prev) => prev.includes(screenId) ? prev.filter((id) => id !== screenId) : [...prev, screenId]);
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
  return <div className="space-y-6">
      {
    /* Selection Mode Toggle */
  }
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
    type="radio"
    checked={selectionMode === "filter"}
    onChange={() => setSelectionMode("filter")}
    className="text-[#2563eb] w-4 h-4"
  />
          <span className="text-[#404040] text-sm">Select screens by filter</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
    type="radio"
    checked={selectionMode === "individual"}
    onChange={() => setSelectionMode("individual")}
    className="text-[#2563eb] w-4 h-4"
  />
          <span className="text-[#404040] text-sm">Select screens individually</span>
        </label>
        <button
    onClick={handleResetFilters}
    className="ml-auto flex items-center gap-1 text-[#2563eb] text-sm hover:underline"
  >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {
    /* Filter Mode */
  }
      {selectionMode === "filter" && <Card className="p-4 border-[#efefef]">
          <div className="flex gap-2 mb-4">
            <Button
    variant="outline"
    size="sm"
    onClick={handleAddFilter}
    className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/10 bg-transparent"
  >
              <Plus className="w-4 h-4 mr-1" /> Rule
            </Button>
            <Button
    variant="outline"
    size="sm"
    className="border-[#e5e5e5] text-[#7b7b7b] bg-transparent hover:bg-[#f5f5f5]"
  >
              <Plus className="w-4 h-4 mr-1" /> Rule Group
            </Button>
          </div>

          <div className="space-y-3">
            {filterRules.map((filter, index) => <div key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#7b7b7b]">
                  <div className="w-4 h-4 border-l-2 border-b-2 border-[#e5e5e5]" />
                </div>
                <Select value={filter.field} onValueChange={(v) => handleUpdateFilter(index, "field", v)}>
                  <SelectTrigger className="w-[180px] border-[#e5e5e5] bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterFields.map((f) => <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filter.operator} onValueChange={(v) => handleUpdateFilter(index, "operator", v)}>
                  <SelectTrigger className="w-[120px] border-[#e5e5e5] bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOperators2.map((op) => <SelectItem key={op} value={op}>
                        {op}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filter.value} onValueChange={(v) => handleUpdateFilter(index, "value", v)}>
                  <SelectTrigger className="w-[200px] border-[#e5e5e5] bg-white">
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="California">California</SelectItem>
                    <SelectItem value="Colorado">Colorado</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Home Goods">Home Goods</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="text-[#7b7b7b] hover:text-[#2d2d2d]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </Button>
                <Button
    variant="ghost"
    size="icon"
    onClick={() => handleRemoveFilter(index)}
    className="text-[#7b7b7b] hover:text-red-500"
  >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>)}
          </div>

          {
    /* Filter Tags */
  }
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#efefef]">
            <span className="text-sm text-[#7b7b7b]">Active filters:</span>
            {filterRules.filter((f) => f.value).map((filter, index) => <span
    key={index}
    className="inline-flex items-center gap-1 px-2 py-1 bg-[#f0f4ff] text-[#2563eb] text-xs rounded-full"
  >
                  {filter.field} {filter.operator} {filter.value}
                  <button onClick={() => handleRemoveFilter(index)} className="hover:text-[#1d4ed8]">
                    <X size={12} />
                  </button>
                </span>)}
          </div>
        </Card>}

      {
    /* Individual Selection Mode */
  }
      {selectionMode === "individual" && <Card className="p-4 border-[#efefef]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#2d2d2d]">{selectedScreens.length} Screens Selected</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b7b7b]" />
                <Input
    placeholder="Search Screen Name"
    value={screenSearchQuery}
    className="pl-9 w-64 border-[#e5e5e5]"
  />
              </div>
              <Button variant="outline" size="icon" className="border-[#e5e5e5] bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {
    /* Screens Table */
  }
          <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#fafafa]">
                <tr className="border-b border-[#e5e5e5]">
                  <th className="p-3 text-left">
                    <input
    type="checkbox"
    checked={selectedScreens.length === sampleScreens.length}
    onChange={handleSelectAllScreens}
    className="rounded border-[#c5c5c5]"
  />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-[#7b7b7b]">Screen Name</th>
                  <th className="p-3 text-left text-sm font-medium text-[#7b7b7b]">Store</th>
                  <th className="p-3 text-left text-sm font-medium text-[#7b7b7b]">City</th>
                  <th className="p-3 text-left text-sm font-medium text-[#7b7b7b]">State</th>
                  <th className="p-3 text-left text-sm font-medium text-[#7b7b7b]">Tag</th>
                </tr>
              </thead>
              <tbody>
                {sampleScreens.map((screen) => <tr key={screen.id} className="border-b border-[#e5e5e5] last:border-b-0 hover:bg-[#fafafa]">
                      <td className="p-3">
                        <input
    type="checkbox"
    checked={selectedScreens.includes(screen.id)}
    onChange={() => handleScreenToggle(screen.id)}
    className="rounded border-[#c5c5c5]"
  />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-[#f0f4ff] rounded flex items-center justify-center">
                            <Monitor size={16} className="text-[#2563eb]" />
                          </div>
                          <div>
                            <span className="text-sm text-[#2d2d2d] font-medium">{screen.name}</span>
                            {screen.isNew && <span className="ml-2 text-xs text-[#22c55e]">New</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-[#7b7b7b]">{screen.store}</td>
                      <td className="p-3 text-sm text-[#7b7b7b]">{screen.city}</td>
                      <td className="p-3 text-sm text-[#7b7b7b]">{screen.state}</td>
                      <td className="p-3 text-sm text-[#7b7b7b]">{screen.tags.join(", ")}</td>
                    </tr>)}
              </tbody>
            </table>
          </div>
        </Card>}
    </div>;
}
export {
  InstoreAdGroupWizard
};
