"use client";

import { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowLeft,
  Package,
  DollarSign,
  Key,
  Globe,
  Sparkles,
  Search,
  Plus,
  ShoppingCart,
  ListOrdered,
  MousePointer,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPortal } from "react-dom";

const productAdGroupSteps = [
  {
    id: 1,
    label: "Basics",
    description: "Name & campaign type",
    icon: Package,
  },
  { id: 2, label: "Pricing", description: "CPC or CPM", icon: DollarSign },
  {
    id: 3,
    label: "Products",
    description: "Select products",
    icon: ShoppingCart,
  },
  {
    id: 4,
    label: "Bidding",
    description: "Set bid strategy",
    icon: DollarSign,
  },
  { id: 5, label: "Keywords", description: "Target keywords", icon: Key },
  { id: 6, label: "Networks", description: "Select networks", icon: Globe },
];

const mockCategories = [
  { id: "electronics", name: "Electronics", productCount: 1250 },
  { id: "clothing", name: "Clothing & Apparel", productCount: 3420 },
  { id: "home", name: "Home & Garden", productCount: 890 },
  { id: "sports", name: "Sports & Outdoors", productCount: 567 },
  { id: "beauty", name: "Beauty & Personal Care", productCount: 2100 },
  { id: "toys", name: "Toys & Games", productCount: 430 },
];

const mockBrands = [
  { id: "nike", name: "Nike" },
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "sony", name: "Sony" },
  { id: "adidas", name: "Adidas" },
  { id: "loreal", name: "L'Oreal" },
];

const mockProducts = [
  {
    id: "p1",
    name: "Wireless Headphones Pro",
    sku: "WHP-001",
    category: "Electronics",
    brand: "Sony",
    price: 149.99,
  },
  {
    id: "p2",
    name: "Smart Watch Series 5",
    sku: "SWS-005",
    category: "Electronics",
    brand: "Apple",
    price: 299.99,
  },
  {
    id: "p3",
    name: "Running Shoes Elite",
    sku: "RSE-102",
    category: "Sports & Outdoors",
    brand: "Nike",
    price: 129.99,
  },
  {
    id: "p4",
    name: "Organic Face Cream",
    sku: "OFC-050",
    category: "Beauty & Personal Care",
    brand: "L'Oreal",
    price: 45.99,
  },
  {
    id: "p5",
    name: "Cotton T-Shirt Basic",
    sku: "CTB-200",
    category: "Clothing & Apparel",
    brand: "Adidas",
    price: 24.99,
  },
  {
    id: "p6",
    name: "Garden Tool Set",
    sku: "GTS-010",
    category: "Home & Garden",
    brand: "Generic",
    price: 89.99,
  },
  {
    id: "p7",
    name: "Bluetooth Speaker",
    sku: "BTS-015",
    category: "Electronics",
    brand: "Samsung",
    price: 79.99,
  },
  {
    id: "p8",
    name: "Yoga Mat Premium",
    sku: "YMP-022",
    category: "Sports & Outdoors",
    brand: "Nike",
    price: 45.99,
  },
];

const mockNetworks = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "150M+ users",
  },
  {
    id: "walmart",
    name: "Walmart",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "120M+ users",
  },
  {
    id: "target",
    name: "Target",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "45M+ users",
  },
  {
    id: "costco",
    name: "Costco",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "35M+ users",
  },
  {
    id: "kroger",
    name: "Kroger",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "28M+ users",
  },
  {
    id: "instacart",
    name: "Instacart",
    logo: "/placeholder.svg?height=32&width=32",
    reach: "20M+ users",
  },
];

const filterCriteria = [
  { id: "category", name: "Product Category" },
  { id: "brand", name: "Brand" },
  { id: "price", name: "Price Range" },
  { id: "inventory", name: "Inventory Status" },
  { id: "margin", name: "Profit Margin" },
  { id: "rating", name: "Product Rating" },
];

const filterOperators = [
  { id: "contains", name: "contains" },
  { id: "equals", name: "equals" },
  { id: "not_equals", name: "does not equal" },
  { id: "greater_than", name: "greater than" },
  { id: "less_than", name: "less than" },
];

export function ProductAdGroupWizard({
  open,
  onClose,
  onSave,
  editingAdGroup,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [adGroupData, setAdGroupData] = useState({
    id: "",
    name: "",
    selectedPages: [],
    productSelection: { mode: "filter", products: [] },
    targeting: {
      demographics: [],
      interests: [],
      behaviors: [],
      keywords: [],
    },
    adFormat: null,
    creatives: [],
    config: {
      frequencyCap: "3",
      frequencyPeriod: "day",
      deliveryType: "standard",
      dayParting: [],
    },
    bidSettings: { mode: "auto", categoryBids: [] },
    keywordSettings: { mode: "all", keywords: [] },
    networkSettings: { mode: "all", networks: [] },
    campaignType: "smart_shopping",
    pricingModel: "cpc",
    productSelectionMethod: "filter",
    productFilters: [
      { id: "1", field: "category", operator: "contains", value: "" },
    ],
    includedProducts: [],
    excludedProducts: [],
  });

  const [productSearch, setProductSearch] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  useEffect(() => {
    if (editingAdGroup) {
      setAdGroupData(editingAdGroup);
    } else {
      setAdGroupData({
        id: `ag-${Date.now()}`,
        name: "",
        selectedPages: [],
        productSelection: { mode: "filter", products: [] },
        targeting: {
          demographics: [],
          interests: [],
          behaviors: [],
          keywords: [],
        },
        adFormat: null,
        creatives: [],
        config: {
          frequencyCap: "3",
          frequencyPeriod: "day",
          deliveryType: "standard",
          dayParting: [],
        },
        bidSettings: { mode: "auto", categoryBids: [] },
        keywordSettings: { mode: "all", keywords: [] },
        networkSettings: { mode: "all", networks: [] },
        campaignType: "smart_shopping",
        pricingModel: "cpc",
        productSelectionMethod: "filter",
        productFilters: [
          { id: "1", field: "category", operator: "contains", value: "" },
        ],
        includedProducts: [],
        excludedProducts: [],
      });
      setCurrentStep(1);
    }
  }, [editingAdGroup, open]);

  const updateAdGroupData = (updates) => {
    setAdGroupData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave(adGroupData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return adGroupData.name.trim() !== "" && adGroupData.campaignType;
      case 2:
        return adGroupData.pricingModel;
      default:
        return true;
    }
  };

  const addFilter = () => {
    const newFilter = {
      id: `${Date.now()}`,
      field: "category",
      operator: "contains",
      value: "",
    };
    updateAdGroupData({
      productFilters: [...(adGroupData.productFilters || []), newFilter],
    });
  };

  const updateFilter = (filterId, updates) => {
    updateAdGroupData({
      productFilters: adGroupData.productFilters?.map((f) =>
        f.id === filterId ? { ...f, ...updates } : f,
      ),
    });
  };

  const removeFilter = (filterId) => {
    updateAdGroupData({
      productFilters: adGroupData.productFilters?.filter(
        (f) => f.id !== filterId,
      ),
    });
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
    updateAdGroupData({
      networkSettings: {
        ...adGroupData.networkSettings,
        networks: newNetworks,
      },
    });
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      const keywords = keywordInput
        .split(/[,\n]/)
        .map((k) => k.trim())
        .filter((k) => k);
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
    const existingIndex = currentBids.findIndex(
      (b) => b.category === categoryId,
    );
    let newBids;
    if (existingIndex >= 0) {
      newBids = [...currentBids];
      newBids[existingIndex] = { category: categoryId, bid };
    } else {
      newBids = [...currentBids, { category: categoryId, bid }];
    }
    updateAdGroupData({
      bidSettings: { ...adGroupData.bidSettings, categoryBids: newBids },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Ad Group Basics
              </h2>
              <p className="text-[#6b7280]">
                Name your ad group and select the campaign type.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Ad Group Name <span className="text-[#ef4444]">*</span>
                </label>
                <Input
                  value={adGroupData.name}
                  onChange={(e) => updateAdGroupData({ name: e.target.value })}
                  placeholder="e.g., Electronics - High Intent, Summer Sale Products"
                  className="w-full border-[#e5e7eb] focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                />

                <p className="text-xs text-[#9ca3af] mt-2">
                  Use a name that describes the products or targeting strategy
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-3">
                  Campaign Type <span className="text-[#ef4444]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      updateAdGroupData({ campaignType: "smart_shopping" })
                    }
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      adGroupData.campaignType === "smart_shopping"
                        ? "border-[#2563eb] bg-[#2563eb]/5"
                        : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          adGroupData.campaignType === "smart_shopping"
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#f3f4f6] text-[#6b7280]"
                        }`}
                      >
                        <Sparkles size={20} />
                      </div>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          adGroupData.campaignType === "smart_shopping"
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#e5e7eb] text-[#6b7280]"
                        }`}
                      >
                        RECOMMENDED
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">
                      Smart Shopping Campaigns
                    </h3>
                    <p className="text-sm text-[#6b7280]">
                      AI-powered optimization across search, display, and
                      shopping networks for maximum conversions.
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      updateAdGroupData({ campaignType: "search_listing" })
                    }
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      adGroupData.campaignType === "search_listing"
                        ? "border-[#2563eb] bg-[#2563eb]/5"
                        : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          adGroupData.campaignType === "search_listing"
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#f3f4f6] text-[#6b7280]"
                        }`}
                      >
                        <ListOrdered size={20} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">
                      Search Listing Campaigns
                    </h3>
                    <p className="text-sm text-[#6b7280]">
                      Target users actively searching for your products with
                      sponsored listings in search results.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Pricing Model
              </h2>
              <p className="text-[#6b7280]">
                Choose how you want to pay for your ads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => updateAdGroupData({ pricingModel: "cpc" })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  adGroupData.pricingModel === "cpc"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      adGroupData.pricingModel === "cpc"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <MousePointer size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] text-lg mb-2">
                  Cost Per Click (CPC)
                </h3>
                <p className="text-sm text-[#6b7280] mb-4">
                  Pay only when someone clicks on your ad. Best for driving
                  traffic and conversions.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#16a34a] bg-[#16a34a]/10 px-3 py-1.5 rounded-full w-fit">
                  <Check size={14} />
                  <span>Recommended for Product Ads</span>
                </div>
              </button>

              <button
                onClick={() => updateAdGroupData({ pricingModel: "cpm" })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  adGroupData.pricingModel === "cpm"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      adGroupData.pricingModel === "cpm"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Eye size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] text-lg mb-2">
                  Cost Per Mille (CPM)
                </h3>
                <p className="text-sm text-[#6b7280] mb-4">
                  Pay for every 1,000 impressions. Best for brand awareness and
                  reach campaigns.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#6b7280] bg-[#f3f4f6] px-3 py-1.5 rounded-full w-fit">
                  <span>Best for Brand Awareness</span>
                </div>
              </button>
            </div>

            {adGroupData.pricingModel && (
              <div className="bg-[#f8f9fb] rounded-xl p-4 border border-[#e5e7eb]">
                <h4 className="font-medium text-[#2d2d2d] mb-2">
                  {adGroupData.pricingModel === "cpc"
                    ? "CPC Pricing Details"
                    : "CPM Pricing Details"}
                </h4>
                <p className="text-sm text-[#6b7280]">
                  {adGroupData.pricingModel === "cpc"
                    ? "You'll set a maximum bid per click in the bidding step. Average CPC for product ads ranges from $0.50 to $2.00 depending on category competition."
                    : "You'll set a maximum bid per 1,000 impressions in the bidding step. Average CPM ranges from $5.00 to $15.00 depending on targeting and placement."}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Product Selection
              </h2>
              <p className="text-[#6b7280]">
                Choose which products to include in this ad group.
              </p>
            </div>

            {/* Selection Method Dropdown - matching user's reference image */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                Selection Method
              </label>
              <Select
                value={adGroupData.productSelectionMethod}
                onValueChange={(value) =>
                  updateAdGroupData({ productSelectionMethod: value })
                }
              >
                <SelectTrigger className="w-full md:w-[350px] border-[#e5e7eb]">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filter">
                    Select Products using Filters
                  </SelectItem>
                  <SelectItem value="include">
                    Select Individual Product to Include
                  </SelectItem>
                  <SelectItem value="exclude">
                    Select Individual Product to Exclude
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter-based Selection */}
            {adGroupData.productSelectionMethod === "filter" && (
              <div className="bg-[#f8f9fb] rounded-xl p-6 border border-[#e5e7eb]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-[#6b7280]">
                    Products will be automatically added to campaign matching
                    filter condition.
                  </p>
                  <a
                    href="#"
                    className="text-sm text-[#2563eb] hover:underline"
                  >
                    Guide to select a product by filters
                  </a>
                </div>

                <div className="space-y-3">
                  {adGroupData.productFilters?.map((filter, index) => (
                    <div key={filter.id} className="flex items-center gap-3">
                      <Select
                        value={filter.field}
                        onValueChange={(value) =>
                          updateFilter(filter.id, { field: value })
                        }
                      >
                        <SelectTrigger className="w-[180px] bg-white border border-[#e5e7eb] rounded-lg text-[#2d2d2d]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterCriteria.map((criteria) => (
                            <SelectItem key={criteria.id} value={criteria.id}>
                              {criteria.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={filter.operator}
                        onValueChange={(value) =>
                          updateFilter(filter.id, { operator: value })
                        }
                      >
                        <SelectTrigger className="w-[140px] bg-white border border-[#e5e7eb] rounded-lg text-[#2d2d2d]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOperators.map((op) => (
                            <SelectItem key={op.id} value={op.id}>
                              {op.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={filter.value}
                        onValueChange={(value) =>
                          updateFilter(filter.id, { value: value })
                        }
                      >
                        <SelectTrigger className="flex-1 bg-white border border-[#e5e7eb] rounded-lg text-[#2d2d2d]">
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.field === "category"
                            ? mockCategories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))
                            : filter.field === "brand"
                              ? mockBrands.map((brand) => (
                                  <SelectItem key={brand.id} value={brand.id}>
                                    {brand.name}
                                  </SelectItem>
                                ))
                              : [
                                  { id: "high", name: "High" },
                                  { id: "medium", name: "Medium" },
                                  { id: "low", name: "Low" },
                                ].map((opt) => (
                                  <SelectItem key={opt.id} value={opt.id}>
                                    {opt.name}
                                  </SelectItem>
                                ))}
                        </SelectContent>
                      </Select>

                      {(adGroupData.productFilters?.length || 0) > 1 && (
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="p-2 text-[#9ca3af] hover:text-[#ef4444] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={addFilter}
                  className="mt-4 flex items-center gap-2 text-[#6b7280] hover:text-[#2563eb] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full border border-[#e5e7eb] flex items-center justify-center">
                    <Plus size={14} />
                  </div>
                  <span className="text-sm">Add another condition</span>
                </button>
              </div>
            )}

            {/* Individual Product Selection (Include) */}
            {adGroupData.productSelectionMethod === "include" && (
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                      size={16}
                    />
                    <Input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products by name, SKU, or category..."
                      className="pl-10 border-[#e5e7eb]"
                    />
                  </div>
                  <span className="text-sm text-[#6b7280] whitespace-nowrap">
                    {adGroupData.includedProducts?.length || 0} selected
                  </span>
                </div>

                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {mockProducts
                    .filter(
                      (p) =>
                        p.name
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()) ||
                        p.sku
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()) ||
                        p.category
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()),
                    )
                    .map((product) => (
                      <label
                        key={product.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
                          adGroupData.includedProducts?.includes(product.id)
                            ? "border-[#2563eb] bg-[#2563eb]/5"
                            : "border-[#e5e7eb] hover:border-[#d1d5db]"
                        }`}
                      >
                        <Checkbox
                          checked={adGroupData.includedProducts?.includes(
                            product.id,
                          )}
                          onCheckedChange={() =>
                            toggleIncludedProduct(product.id)
                          }
                        />

                        <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center shrink-0">
                          <Package size={16} className="text-[#9ca3af]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#2d2d2d] text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {product.sku} • {product.category} • {product.brand}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[#2d2d2d]">
                          ${product.price}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {/* Individual Product Selection (Exclude) */}
            {adGroupData.productSelectionMethod === "exclude" && (
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-lg p-3 mb-4">
                  <p className="text-sm text-[#92400e]">
                    <strong>Note:</strong> All products will be included except
                    those you select below.
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                      size={16}
                    />
                    <Input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products to exclude..."
                      className="pl-10 border-[#e5e7eb]"
                    />
                  </div>
                  <span className="text-sm text-[#6b7280] whitespace-nowrap">
                    {adGroupData.excludedProducts?.length || 0} excluded
                  </span>
                </div>

                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {mockProducts
                    .filter(
                      (p) =>
                        p.name
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()) ||
                        p.sku
                          .toLowerCase()
                          .includes(productSearch.toLowerCase()),
                    )
                    .map((product) => (
                      <label
                        key={product.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
                          adGroupData.excludedProducts?.includes(product.id)
                            ? "border-[#ef4444] bg-[#ef4444]/5"
                            : "border-[#e5e7eb] hover:border-[#d1d5db]"
                        }`}
                      >
                        <Checkbox
                          checked={adGroupData.excludedProducts?.includes(
                            product.id,
                          )}
                          onCheckedChange={() =>
                            toggleExcludedProduct(product.id)
                          }
                        />

                        <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center shrink-0">
                          <Package size={16} className="text-[#9ca3af]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#2d2d2d] text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {product.sku} • {product.category} • {product.brand}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[#2d2d2d]">
                          ${product.price}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      // Steps 4-6 remain similar but renumbered
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Bid Settings
              </h2>
              <p className="text-[#6b7280]">
                Configure how you want to bid on ad placements
                {adGroupData.pricingModel === "cpc"
                  ? " (Cost Per Click)"
                  : " (Cost Per Mille)"}
                .
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  updateAdGroupData({
                    bidSettings: { mode: "auto", categoryBids: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.bidSettings?.mode === "auto"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.bidSettings?.mode === "auto"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Sparkles size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.bidSettings?.mode === "auto"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    AUTO
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Automatic Bidding
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Let AI optimize bids to maximize your campaign performance.
                </p>
              </button>

              <button
                onClick={() =>
                  updateAdGroupData({
                    bidSettings: { mode: "manual", categoryBids: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.bidSettings?.mode === "manual"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.bidSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <DollarSign size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.bidSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    MANUAL
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Manual Bidding
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Set custom bid amounts per category.
                </p>
              </button>
            </div>

            {adGroupData.bidSettings?.mode === "manual" && (
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                <h3 className="font-medium text-[#2d2d2d] mb-4">
                  Category Bids (
                  {adGroupData.pricingModel === "cpc"
                    ? "per click"
                    : "per 1,000 impressions"}
                  )
                </h3>
                <div className="space-y-3">
                  {mockCategories.map((category) => {
                    const bid =
                      adGroupData.bidSettings?.categoryBids?.find(
                        (b) => b.category === category.id,
                      )?.bid || "";
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-lg border border-[#e5e7eb]"
                      >
                        <div>
                          <p className="font-medium text-[#2d2d2d] text-sm">
                            {category.name}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {category.productCount} products
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#6b7280]">$</span>
                          <Input
                            type="number"
                            value={bid}
                            onChange={(e) =>
                              updateCategoryBid(category.id, e.target.value)
                            }
                            placeholder={
                              adGroupData.pricingModel === "cpc"
                                ? "0.50"
                                : "5.00"
                            }
                            className="w-24 border-[#e5e7eb] text-right"
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

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Keyword Targeting
              </h2>
              <p className="text-[#6b7280]">
                Define which keywords should trigger your ads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  updateAdGroupData({
                    keywordSettings: { mode: "all", keywords: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.keywordSettings?.mode === "all"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.keywordSettings?.mode === "all"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Globe size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.keywordSettings?.mode === "all"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    ALL
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  All Keywords
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Target all relevant keywords automatically for maximum reach.
                </p>
              </button>

              <button
                onClick={() =>
                  updateAdGroupData({
                    keywordSettings: { mode: "manual", keywords: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.keywordSettings?.mode === "manual"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.keywordSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Key size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.keywordSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    MANUAL
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Manual Keywords
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Specify exact keywords for precise targeting.
                </p>
              </button>
            </div>

            {adGroupData.keywordSettings?.mode === "manual" && (
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                    Enter Keywords
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Enter keywords separated by commas or new lines..."
                      className="flex-1 min-h-[80px] px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm resize-none focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/20"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-[#9ca3af]">
                      Max 50 keywords allowed
                    </p>
                    <Button
                      size="sm"
                      onClick={addKeyword}
                      disabled={!keywordInput.trim()}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    >
                      <Plus size={14} className="mr-1" />
                      Add Keywords
                    </Button>
                  </div>
                </div>

                {(adGroupData.keywordSettings?.keywords?.length || 0) > 0 && (
                  <div>
                    <p className="text-sm font-medium text-[#2d2d2d] mb-2">
                      Added Keywords (
                      {adGroupData.keywordSettings?.keywords?.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {adGroupData.keywordSettings?.keywords?.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] rounded-full text-sm"
                        >
                          {keyword}
                          <button
                            onClick={() => removeKeyword(keyword)}
                            className="text-[#9ca3af] hover:text-[#ef4444] transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Network Targeting
              </h2>
              <p className="text-[#6b7280]">
                Choose which retail networks to advertise on.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  updateAdGroupData({
                    networkSettings: { mode: "all", networks: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.networkSettings?.mode === "all"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.networkSettings?.mode === "all"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Globe size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.networkSettings?.mode === "all"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    ALL
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  All Networks
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Advertise across all available retail partner networks.
                </p>
              </button>

              <button
                onClick={() =>
                  updateAdGroupData({
                    networkSettings: { mode: "manual", networks: [] },
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  adGroupData.networkSettings?.mode === "manual"
                    ? "border-[#2563eb] bg-[#2563eb]/5"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      adGroupData.networkSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    <Package size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      adGroupData.networkSettings?.mode === "manual"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}
                  >
                    SELECT
                  </span>
                </div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Select Networks
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Choose specific retail networks.
                </p>
              </button>
            </div>

            {adGroupData.networkSettings?.mode === "manual" && (
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#2d2d2d]">
                    Select Networks
                  </h3>
                  <span className="text-sm text-[#6b7280]">
                    {adGroupData.networkSettings?.networks?.length || 0}{" "}
                    selected
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockNetworks.map((network) => {
                    const isSelected =
                      adGroupData.networkSettings?.networks?.includes(
                        network.id,
                      );
                    return (
                      <label
                        key={network.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#2563eb] bg-[#2563eb]/5"
                            : "border-[#e5e7eb] hover:border-[#d1d5db]"
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleNetwork(network.id)}
                        />
                        <img
                          src={network.logo || "/placeholder.svg"}
                          alt={network.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#2d2d2d] text-sm">
                            {network.name}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {network.reach}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!open || !portalContainer) return null;

  const wizardContent = (
    <>
      <div className="fixed inset-0 z-[110] bg-black/40" onClick={onClose} />

      <div className="fixed top-0 bottom-0 right-0 w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-300px)] max-w-[1400px] z-[111] bg-[#f8f9fb] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create Product Ad Group
              </h2>
              <p className="text-sm text-gray-500">
                Step {currentStep} of {productAdGroupSteps.length} • Return to
                Campaign
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Steps Sidebar */}
          <div className="w-64 bg-white border-r flex flex-col">
            <div className="flex-1 p-4 space-y-1 overflow-y-auto">
              {productAdGroupSteps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isDisabled = step.id > currentStep;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                      isCurrent
                        ? "bg-primary/10 border border-primary"
                        : isCompleted
                          ? "hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${isCurrent ? "text-primary" : isCompleted ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {step.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div className="border-t p-4 bg-gray-50">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Ad Group Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900 truncate max-w-[120px]">
                    {adGroupData.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {adGroupData.campaignType?.replace("_", " ") || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pricing</span>
                  <span className="font-medium text-gray-900 uppercase">
                    {adGroupData.pricingModel || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Products</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {adGroupData.productSelectionMethod || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bidding</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {adGroupData.bidSettings?.mode || "Auto"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8">{renderStepContent()}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="min-w-[120px]"
            >
              {currentStep === productAdGroupSteps.length
                ? "Save Ad Group"
                : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(wizardContent, portalContainer);
}
