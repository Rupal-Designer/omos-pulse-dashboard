"use client";

import { useState, useMemo } from "react";
import {
  X,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Check,
  Sparkles,
  Package,
  Trash2,
  Eye,
  AlertCircle,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const sampleProducts = [
  {
    id: "P001",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    brand: "SoundMax",
    category: "Electronics",
    subcategory: "Audio",
    price: 79.99,
    stock: 245,
    image: "/wireless-headphones.png",
    rating: 4.5,
    reviews: 1247,
  },
  {
    id: "P002",
    name: "Organic Green Tea - 100 Bags",
    sku: "OGT-100",
    brand: "TeaLeaf",
    category: "Grocery",
    subcategory: "Beverages",
    price: 12.99,
    stock: 892,
    image: "/green-tea-box.png",
    rating: 4.8,
    reviews: 3421,
  },
  {
    id: "P003",
    name: "Running Shoes - Men's",
    sku: "RSM-042",
    brand: "SprintPro",
    category: "Apparel",
    subcategory: "Footwear",
    price: 129.99,
    stock: 156,
    image: "/running-shoes.jpg",
    rating: 4.3,
    reviews: 876,
  },
  {
    id: "P004",
    name: "Smart Watch Series 5",
    sku: "SWS-005",
    brand: "TechWear",
    category: "Electronics",
    subcategory: "Wearables",
    price: 299.99,
    stock: 89,
    image: "/smartwatch-lifestyle.png",
    rating: 4.7,
    reviews: 2156,
  },
  {
    id: "P005",
    name: "Vitamin D3 Supplements",
    sku: "VD3-060",
    brand: "HealthPlus",
    category: "Health",
    subcategory: "Vitamins",
    price: 18.99,
    stock: 1203,
    image: "/vitamin-bottle.jpg",
    rating: 4.6,
    reviews: 4532,
  },
  {
    id: "P006",
    name: "Stainless Steel Water Bottle",
    sku: "SSW-750",
    brand: "HydroLife",
    category: "Home",
    subcategory: "Kitchen",
    price: 24.99,
    stock: 567,
    image: "/reusable-water-bottle.png",
    rating: 4.4,
    reviews: 987,
  },
  {
    id: "P007",
    name: "Yoga Mat - Premium",
    sku: "YMP-001",
    brand: "ZenFit",
    category: "Sports",
    subcategory: "Yoga",
    price: 45.99,
    stock: 234,
    image: "/rolled-yoga-mat.png",
    rating: 4.9,
    reviews: 1876,
  },
  {
    id: "P008",
    name: "LED Desk Lamp",
    sku: "LDL-100",
    brand: "BrightHome",
    category: "Home",
    subcategory: "Lighting",
    price: 39.99,
    stock: 412,
    image: "/modern-desk-lamp.png",
    rating: 4.2,
    reviews: 654,
  },
  {
    id: "P009",
    name: "Protein Powder - Chocolate",
    sku: "PPC-2LB",
    brand: "FitFuel",
    category: "Health",
    subcategory: "Nutrition",
    price: 54.99,
    stock: 678,
    image: "/protein-powder.jpg",
    rating: 4.5,
    reviews: 3245,
  },
  {
    id: "P010",
    name: "Wireless Charging Pad",
    sku: "WCP-015",
    brand: "ChargeTech",
    category: "Electronics",
    subcategory: "Accessories",
    price: 29.99,
    stock: 890,
    image: "/wireless-charger.png",
    rating: 4.1,
    reviews: 1123,
  },
  {
    id: "P011",
    name: "Organic Coffee Beans",
    sku: "OCB-1KG",
    brand: "BeanMaster",
    category: "Grocery",
    subcategory: "Beverages",
    price: 22.99,
    stock: 445,
    image: "/pile-of-coffee-beans.png",
    rating: 4.8,
    reviews: 2876,
  },
  {
    id: "P012",
    name: "Bluetooth Speaker Portable",
    sku: "BSP-200",
    brand: "SoundMax",
    category: "Electronics",
    subcategory: "Audio",
    price: 59.99,
    stock: 321,
    image: "/bluetooth-speaker.jpg",
    rating: 4.4,
    reviews: 1567,
  },
];

const brands = [
  "SoundMax",
  "TeaLeaf",
  "SprintPro",
  "TechWear",
  "HealthPlus",
  "HydroLife",
  "ZenFit",
  "BrightHome",
  "FitFuel",
  "ChargeTech",
  "BeanMaster",
];
const categories = [
  "Electronics",
  "Grocery",
  "Apparel",
  "Health",
  "Home",
  "Sports",
];
const stockStatuses = ["In Stock", "Low Stock", "Out of Stock"];

export function ProductSelectionDrawer({
  open,
  onClose,
  onSave,
  existingSelection,
}) {
  const [mode, setMode] = useState(existingSelection?.mode || "manual");
  const [manualMode, setManualMode] = useState(
    existingSelection?.manualMode || "filter",
  );
  const [currentView, setCurrentView] = useState("entry");
  const [includedProducts, setIncludedProducts] = useState(
    existingSelection?.includedProducts || [],
  );
  const [excludedProducts, setExcludedProducts] = useState(
    existingSelection?.excludedProducts || [],
  );
  const [selectionMode, setSelectionMode] = useState("include");

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState(
    existingSelection?.filterCriteria?.brands || [],
  );
  const [selectedCategories, setSelectedCategories] = useState(
    existingSelection?.filterCriteria?.categories || [],
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedStockStatus, setSelectedStockStatus] = useState(["In Stock"]);
  const [filterLogic, setFilterLogic] = useState("AND");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFilters, setExpandedFilters] = useState(["brand", "category"]);

  const filteredProducts = useMemo(() => {
    let results = sampleProducts;

    if (currentView === "filter") {
      if (filterLogic === "AND") {
        if (selectedBrands.length > 0) {
          results = results.filter((p) => selectedBrands.includes(p.brand));
        }
        if (selectedCategories.length > 0) {
          results = results.filter((p) =>
            selectedCategories.includes(p.category),
          );
        }
        results = results.filter(
          (p) => p.price >= priceRange.min && p.price <= priceRange.max,
        );
      } else {
        if (selectedBrands.length > 0 || selectedCategories.length > 0) {
          results = results.filter(
            (p) =>
              selectedBrands.includes(p.brand) ||
              selectedCategories.includes(p.category),
          );
        }
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query),
      );
    }

    return results;
  }, [
    currentView,
    selectedBrands,
    selectedCategories,
    priceRange,
    filterLogic,
    searchQuery,
  ]);

  const toggleFilter = (filterType) => {
    setExpandedFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType],
    );
  };

  const toggleProduct = (productId) => {
    if (selectionMode === "include") {
      setIncludedProducts((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
      setExcludedProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      setExcludedProducts((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
      setIncludedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleSave = () => {
    onSave({
      mode,
      manualMode,
      filterCriteria:
        currentView === "filter"
          ? {
              brands: selectedBrands,
              categories: selectedCategories,
              priceRange,
              stockStatus: selectedStockStatus,
              logic: filterLogic,
            }
          : undefined,
      includedProducts,
      excludedProducts,
    });
    onClose();
  };

  const totalSelected =
    includedProducts.length +
    (currentView === "filter" ? filteredProducts.length : 0);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[calc(100%-80px)] bg-[#f8fafc] z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentView !== "entry" && (
              <button
                onClick={() => setCurrentView("entry")}
                className="p-1.5 hover:bg-[#f3f4f6] rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-[#6b7280]" />
              </button>
            )}
            <Package size={24} className="text-[#2563eb]" />
            <div>
              <h2 className="text-lg font-semibold text-[#1f2937]">
                Product Selection
              </h2>
              <p className="text-sm text-[#6b7280]">
                {currentView === "entry" &&
                  "Choose how you want to select products"}
                {currentView === "filter" && "Use filters to select products"}
                {currentView === "individual" &&
                  `${selectionMode === "include" ? "Include" : "Exclude"} specific products`}
                {currentView === "preview" && "Review your selection"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f3f4f6] rounded-lg"
          >
            <X size={20} className="text-[#6b7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Entry Point View */}
          {currentView === "entry" && (
            <EntryPointView
              mode={mode}
              setMode={setMode}
              manualMode={manualMode}
              setManualMode={setManualMode}
              totalSelected={totalSelected}
              onContinue={(view) => setCurrentView(view)}
              existingSelection={!!existingSelection}
            />
          )}

          {/* Filter-Based Selection View */}
          {currentView === "filter" && (
            <FilterBasedView
              products={filteredProducts}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              filterLogic={filterLogic}
              setFilterLogic={setFilterLogic}
              expandedFilters={expandedFilters}
              toggleFilter={toggleFilter}
              excludedProducts={excludedProducts}
              toggleExclude={(id) => {
                setExcludedProducts((prev) =>
                  prev.includes(id)
                    ? prev.filter((i) => i !== id)
                    : [...prev, id],
                );
              }}
            />
          )}

          {/* Individual Selection View */}
          {currentView === "individual" && (
            <IndividualSelectionView
              products={sampleProducts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectionMode={selectionMode}
              setSelectionMode={setSelectionMode}
              includedProducts={includedProducts}
              excludedProducts={excludedProducts}
              toggleProduct={toggleProduct}
              filteredProducts={filteredProducts}
            />
          )}

          {/* Preview View */}
          {currentView === "preview" && (
            <PreviewView
              includedProducts={includedProducts}
              excludedProducts={excludedProducts}
              allProducts={sampleProducts}
              filterCriteria={
                manualMode === "filter"
                  ? {
                      brands: selectedBrands,
                      categories: selectedCategories,
                      priceRange,
                      stockStatus: selectedStockStatus,
                      logic: filterLogic,
                    }
                  : undefined
              }
              onRemoveIncluded={(id) =>
                setIncludedProducts((prev) => prev.filter((i) => i !== id))
              }
              onRemoveExcluded={(id) =>
                setExcludedProducts((prev) => prev.filter((i) => i !== id))
              }
            />
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentView !== "entry" && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6b7280]">Selected:</span>
                <span className="font-semibold text-[#2563eb]">
                  {totalSelected} products
                </span>
                {excludedProducts.length > 0 && (
                  <span className="text-[#ef4444]">
                    ({excludedProducts.length} excluded)
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentView !== "entry" && currentView !== "preview" && (
              <Button
                variant="outline"
                onClick={() => setCurrentView("preview")}
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                Preview Selection
              </Button>
            )}
            {currentView === "preview" ? (
              <Button
                onClick={handleSave}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Confirm Selection
              </Button>
            ) : (
              currentView !== "entry" && (
                <Button
                  onClick={handleSave}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                >
                  Apply Selection
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Entry Point Component
function EntryPointView({
  mode,
  setMode,
  manualMode,
  setManualMode,
  totalSelected,
  onContinue,
  existingSelection,
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Mode Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#1f2937] mb-4">
          Choose Selection Mode
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Smart Mode Card */}
          <div
            onClick={() => setMode("smart")}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
              mode === "smart"
                ? "border-[#2563eb] bg-[#eff6ff] shadow-md"
                : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:shadow-sm"
            }`}
          >
            {mode === "smart" && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-[#1f2937] mb-2">Smart Mode</h4>
            <p className="text-sm text-[#6b7280]">
              AI handles everything. Sit back and let our algorithm optimize
              product selection for maximum performance.
            </p>
          </div>

          {/* Manual Mode Card */}
          <div
            onClick={() => setMode("manual")}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
              mode === "manual"
                ? "border-[#2563eb] bg-[#eff6ff] shadow-md"
                : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:shadow-sm"
            }`}
          >
            {mode === "manual" && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] flex items-center justify-center mb-4">
              <Filter size={24} className="text-white" />
            </div>
            <h4 className="font-semibold text-[#1f2937] mb-2">Manual Mode</h4>
            <p className="text-sm text-[#6b7280]">
              You control. Choose products by filters or individually.
              {totalSelected > 0 && (
                <span className="ml-1 text-[#2563eb] font-medium">
                  ({totalSelected} products selected)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Manual Mode Options */}
      {mode === "manual" && (
        <div className="transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#1f2937] mb-4">
            How would you like to select products?
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Filter-Based Card */}
            <div
              onClick={() => setManualMode("filter")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                manualMode === "filter"
                  ? "border-[#2563eb] bg-[#eff6ff]"
                  : "border-[#e5e7eb] bg-white hover:border-[#9ca3af]"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    manualMode === "filter"
                      ? "border-[#2563eb] bg-[#2563eb]"
                      : "border-[#d1d5db]"
                  }`}
                >
                  {manualMode === "filter" && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <h4 className="font-semibold text-[#1f2937]">
                  Filter-Based Selection
                </h4>
              </div>
              <p className="text-sm text-[#6b7280] ml-8">
                Select products by brand, category, price range, and more.
                Perfect for bulk selection.
              </p>
            </div>

            {/* Individual Selection Card */}
            <div
              onClick={() => setManualMode("individual")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                manualMode === "individual"
                  ? "border-[#2563eb] bg-[#eff6ff]"
                  : "border-[#e5e7eb] bg-white hover:border-[#9ca3af]"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    manualMode === "individual"
                      ? "border-[#2563eb] bg-[#2563eb]"
                      : "border-[#d1d5db]"
                  }`}
                >
                  {manualMode === "individual" && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <h4 className="font-semibold text-[#1f2937]">
                  Individual Selection
                </h4>
              </div>
              <p className="text-sm text-[#6b7280] ml-8">
                Search and select specific products one by one. Best for precise
                control.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => onContinue(manualMode)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8"
            >
              Continue with{" "}
              {manualMode === "filter" ? "Filters" : "Individual Selection"}
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Smart Mode Info */}
      {mode === "smart" && (
        <div className="bg-gradient-to-br from-[#f5f3ff] to-[#eff6ff] rounded-xl p-6 border border-[#e5e7eb]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#8b5cf6] flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1f2937] mb-2">
                How Smart Mode Works
              </h4>
              <ul className="text-sm text-[#6b7280] space-y-2">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                  <span>
                    AI analyzes your campaign goals and target audience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                  <span>
                    Automatically selects top-performing products based on
                    historical data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                  <span>
                    Continuously optimizes selection for better conversion rates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                  <span>You can exclude specific products if needed</span>
                </li>
              </ul>
              <Button className="mt-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
                Enable Smart Mode
                <Sparkles size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter-Based Selection View
function FilterBasedView({
  products,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  filterLogic,
  setFilterLogic,
  expandedFilters,
  toggleFilter,
  excludedProducts,
  toggleExclude,
}) {
  return (
    <div className="flex gap-6">
      {/* Filters Sidebar */}
      <div className="w-72 shrink-0">
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1f2937]">Filters</h3>
            <button className="text-sm text-[#2563eb] hover:underline">
              Clear All
            </button>
          </div>

          {/* Logic Toggle */}
          <div className="mb-4 p-3 bg-[#f9fafb] rounded-lg">
            <p className="text-xs text-[#6b7280] mb-2">
              Match products that meet:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterLogic("AND")}
                className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                  filterLogic === "AND"
                    ? "bg-[#2563eb] text-white"
                    : "bg-white border border-[#e5e7eb] text-[#6b7280]"
                }`}
              >
                All Filters (AND)
              </button>
              <button
                onClick={() => setFilterLogic("OR")}
                className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                  filterLogic === "OR"
                    ? "bg-[#2563eb] text-white"
                    : "bg-white border border-[#e5e7eb] text-[#6b7280]"
                }`}
              >
                Any Filter (OR)
              </button>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="border-b border-[#e5e7eb] pb-3 mb-3">
            <button
              onClick={() => toggleFilter("brand")}
              className="w-full flex items-center justify-between py-2"
            >
              <span className="font-medium text-[#1f2937]">Brand</span>
              {expandedFilters.includes("brand") ? (
                <ChevronDown size={16} className="text-[#6b7280]" />
              ) : (
                <ChevronRight size={16} className="text-[#6b7280]" />
              )}
            </button>
            {expandedFilters.includes("brand") && (
              <div className="space-y-2 mt-2">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand),
                          );
                        }
                      }}
                    />

                    <span className="text-sm text-[#4b5563]">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="border-b border-[#e5e7eb] pb-3 mb-3">
            <button
              onClick={() => toggleFilter("category")}
              className="w-full flex items-center justify-between py-2"
            >
              <span className="font-medium text-[#1f2937]">Category</span>
              {expandedFilters.includes("category") ? (
                <ChevronDown size={16} className="text-[#6b7280]" />
              ) : (
                <ChevronRight size={16} className="text-[#6b7280]" />
              )}
            </button>
            {expandedFilters.includes("category") && (
              <div className="space-y-2 mt-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== category),
                          );
                        }
                      }}
                    />

                    <span className="text-sm text-[#4b5563]">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="pb-3">
            <button
              onClick={() => toggleFilter("price")}
              className="w-full flex items-center justify-between py-2"
            >
              <span className="font-medium text-[#1f2937]">Price Range</span>
              {expandedFilters.includes("price") ? (
                <ChevronDown size={16} className="text-[#6b7280]" />
              ) : (
                <ChevronRight size={16} className="text-[#6b7280]" />
              )}
            </button>
            {expandedFilters.includes("price") && (
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <div>
                    <label className="text-xs text-[#6b7280]">Min</label>
                    <Input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="h-8"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#6b7280]">Max</label>
                    <Input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#6b7280]">
            <span className="font-semibold text-[#1f2937]">
              {products.length}
            </span>{" "}
            products match your filters
          </p>
          {excludedProducts.length > 0 && (
            <p className="text-sm text-[#ef4444]">
              {excludedProducts.length} excluded
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border p-4 transition-all ${
                excludedProducts.includes(product.id)
                  ? "border-[#fecaca] bg-[#fef2f2] opacity-60"
                  : "border-[#e5e7eb] hover:border-[#2563eb] hover:shadow-sm"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#f3f4f6]"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#1f2937] text-sm truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#6b7280]">{product.brand}</p>
                  <p className="text-sm font-semibold text-[#2563eb] mt-1">
                    ${product.price}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-[#6b7280]">
                  {product.stock} in stock
                </span>
                <button
                  onClick={() => toggleExclude(product.id)}
                  className={`text-xs px-2 py-1 rounded-md transition-colors ${
                    excludedProducts.includes(product.id)
                      ? "bg-[#ef4444] text-white"
                      : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#fecaca] hover:text-[#ef4444]"
                  }`}
                >
                  {excludedProducts.includes(product.id)
                    ? "Excluded"
                    : "Exclude"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual Selection View
function IndividualSelectionView({
  products,
  searchQuery,
  setSearchQuery,
  selectionMode,
  setSelectionMode,
  includedProducts,
  excludedProducts,
  toggleProduct,
  filteredProducts,
}) {
  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-[#f3f4f6] rounded-lg p-1">
          <button
            onClick={() => setSelectionMode("include")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectionMode === "include"
                ? "bg-[#22c55e] text-white"
                : "text-[#6b7280] hover:text-[#1f2937]"
            }`}
          >
            <Plus size={14} className="inline mr-1" />
            Include Mode
          </button>
          <button
            onClick={() => setSelectionMode("exclude")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectionMode === "exclude"
                ? "bg-[#ef4444] text-white"
                : "text-[#6b7280] hover:text-[#1f2937]"
            }`}
          >
            <Minus size={14} className="inline mr-1" />
            Exclude Mode
          </button>
        </div>
        <p className="text-sm text-[#6b7280]">
          {selectionMode === "include"
            ? "Click products to add them to your campaign"
            : "Click products to exclude them from your campaign"}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
        />
        <Input
          type="text"
          placeholder="Search products by name, SKU, or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const isIncluded = includedProducts.includes(product.id);
          const isExcluded = excludedProducts.includes(product.id);

          return (
            <div
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                isIncluded
                  ? "border-[#22c55e] bg-[#f0fdf4] ring-2 ring-[#22c55e]/20"
                  : isExcluded
                    ? "border-[#ef4444] bg-[#fef2f2] ring-2 ring-[#ef4444]/20"
                    : "border-[#e5e7eb] hover:border-[#2563eb] hover:shadow-sm"
              }`}
            >
              {(isIncluded || isExcluded) && (
                <div
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    isIncluded ? "bg-[#22c55e]" : "bg-[#ef4444]"
                  }`}
                >
                  {isIncluded ? (
                    <Plus size={14} className="text-white" />
                  ) : (
                    <Minus size={14} className="text-white" />
                  )}
                </div>
              )}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-24 rounded-lg object-cover bg-[#f3f4f6] mb-3"
              />

              <h4 className="font-medium text-[#1f2937] text-sm truncate">
                {product.name}
              </h4>
              <p className="text-xs text-[#6b7280]">{product.brand}</p>
              <p className="text-sm font-semibold text-[#2563eb] mt-1">
                ${product.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Preview View
function PreviewView({
  includedProducts,
  excludedProducts,
  allProducts,
  filterCriteria,
  onRemoveIncluded,
  onRemoveExcluded,
}) {
  const includedProductData = allProducts.filter((p) =>
    includedProducts.includes(p.id),
  );
  const excludedProductData = allProducts.filter((p) =>
    excludedProducts.includes(p.id),
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
          <p className="text-sm text-[#6b7280]">Total Products</p>
          <p className="text-2xl font-semibold text-[#1f2937]">
            {filterCriteria ? allProducts.length : includedProducts.length}
          </p>
        </div>
        <div className="bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] p-4">
          <p className="text-sm text-[#22c55e]">Included</p>
          <p className="text-2xl font-semibold text-[#16a34a]">
            {includedProducts.length}
          </p>
        </div>
        <div className="bg-[#fef2f2] rounded-xl border border-[#fecaca] p-4">
          <p className="text-sm text-[#ef4444]">Excluded</p>
          <p className="text-2xl font-semibold text-[#dc2626]">
            {excludedProducts.length}
          </p>
        </div>
      </div>

      {/* Filter Criteria */}
      {filterCriteria &&
        (filterCriteria.brands.length > 0 ||
          filterCriteria.categories.length > 0) && (
          <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-4 mb-6">
            <h4 className="font-medium text-[#1f2937] mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filterCriteria.brands.map((brand) => (
                <span
                  key={brand}
                  className="px-3 py-1 bg-[#2563eb] text-white text-sm rounded-full"
                >
                  Brand: {brand}
                </span>
              ))}
              {filterCriteria.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-[#8b5cf6] text-white text-sm rounded-full"
                >
                  Category: {category}
                </span>
              ))}
              <span className="px-3 py-1 bg-[#f59e0b] text-white text-sm rounded-full">
                ${filterCriteria.priceRange.min} - $
                {filterCriteria.priceRange.max}
              </span>
            </div>
          </div>
        )}

      {/* Included Products */}
      {includedProductData.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-[#1f2937] mb-3 flex items-center gap-2">
            <Plus size={16} className="text-[#22c55e]" />
            Included Products ({includedProductData.length})
          </h4>
          <div className="bg-white rounded-xl border border-[#e5e7eb] divide-y divide-[#e5e7eb]">
            {includedProductData.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-[#f3f4f6]"
                />

                <div className="flex-1">
                  <h5 className="font-medium text-[#1f2937]">{product.name}</h5>
                  <p className="text-sm text-[#6b7280]">
                    {product.brand} • ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveIncluded(product.id)}
                  className="p-2 text-[#ef4444] hover:bg-[#fef2f2] rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Excluded Products */}
      {excludedProductData.length > 0 && (
        <div>
          <h4 className="font-medium text-[#1f2937] mb-3 flex items-center gap-2">
            <Minus size={16} className="text-[#ef4444]" />
            Excluded Products ({excludedProductData.length})
          </h4>
          <div className="bg-white rounded-xl border border-[#e5e7eb] divide-y divide-[#e5e7eb]">
            {excludedProductData.map((product) => (
              <div
                key={product.id}
                className="p-4 flex items-center gap-4 opacity-60"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-[#f3f4f6]"
                />

                <div className="flex-1">
                  <h5 className="font-medium text-[#1f2937]">{product.name}</h5>
                  <p className="text-sm text-[#6b7280]">
                    {product.brand} • ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveExcluded(product.id)}
                  className="p-2 text-[#22c55e] hover:bg-[#f0fdf4] rounded-lg"
                >
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {includedProductData.length === 0 &&
        excludedProductData.length === 0 &&
        !filterCriteria && (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto text-[#9ca3af] mb-4" />
            <h4 className="font-medium text-[#1f2937] mb-2">
              No products selected
            </h4>
            <p className="text-sm text-[#6b7280]">
              Go back and select some products to include in your campaign.
            </p>
          </div>
        )}
    </div>
  );
}
