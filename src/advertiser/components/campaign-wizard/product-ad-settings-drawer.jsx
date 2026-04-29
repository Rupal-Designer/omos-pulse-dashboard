"use client";

import { useState, useEffect } from "react";
import {
  X,
  Package,
  DollarSign,
  Key,
  Globe,
  Search,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPortal } from "react-dom";

const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    sku: "APPL-IP15PM",
    price: 1199,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    category: "Electronics",
    sku: "SAMS-GS24",
    price: 999,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    sku: "SONY-WH1000",
    price: 399,
  },
  {
    id: "4",
    name: "Nike Air Max 90",
    category: "Footwear",
    sku: "NIKE-AM90",
    price: 130,
  },
  {
    id: "5",
    name: "Adidas Ultraboost",
    category: "Footwear",
    sku: "ADID-UB22",
    price: 180,
  },
  {
    id: "6",
    name: "Levi's 501 Jeans",
    category: "Apparel",
    sku: "LEVI-501",
    price: 69,
  },
];

const mockCategories = [
  { id: "electronics", name: "Electronics", productCount: 1250 },
  { id: "footwear", name: "Footwear", productCount: 890 },
  { id: "apparel", name: "Apparel", productCount: 2100 },
  { id: "home", name: "Home & Garden", productCount: 1560 },
  { id: "beauty", name: "Beauty & Personal Care", productCount: 980 },
];

const mockNetworks = [
  { id: "amazon", name: "Amazon", logo: "🛒", reach: "150M+" },
  { id: "walmart", name: "Walmart", logo: "🏪", reach: "120M+" },
  { id: "target", name: "Target", logo: "🎯", reach: "80M+" },
  { id: "costco", name: "Costco", logo: "📦", reach: "60M+" },
  { id: "kroger", name: "Kroger", logo: "🛍️", reach: "45M+" },
  { id: "instacart", name: "Instacart", logo: "🚗", reach: "40M+" },
];

export function ProductAdSettingsDrawer({
  open,
  onClose,
  type,
  data,
  updateData,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(
    data.productSelection?.selectedProducts || [],
  );
  const [selectedCategories, setSelectedCategories] = useState(
    data.productSelection?.selectedCategories || [],
  );
  const [productMode, setProductMode] = useState(
    data.productSelection?.mode || "auto",
  );
  const [bidMode, setBidMode] = useState(data.bidSettings?.mode || "auto");
  const [categoryBids, setCategoryBids] = useState(
    data.bidSettings?.categoryBids || {},
  );
  const [keywordMode, setKeywordMode] = useState(
    data.keywordSettings?.mode || "all",
  );
  const [keywords, setKeywords] = useState(
    data.keywordSettings?.keywords || [],
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [networkMode, setNetworkMode] = useState(
    data.networkTargeting?.mode || "all",
  );
  const [selectedNetworks, setSelectedNetworks] = useState(
    data.networkTargeting?.networks || [],
  );

  useEffect(() => {
    if (data.productSelection) {
      setProductMode(data.productSelection.mode);
      setSelectedProducts(data.productSelection.selectedProducts || []);
      setSelectedCategories(data.productSelection.selectedCategories || []);
    }
    if (data.bidSettings) {
      setBidMode(data.bidSettings.mode);
      setCategoryBids(data.bidSettings.categoryBids || {});
    }
    if (data.keywordSettings) {
      setKeywordMode(data.keywordSettings.mode);
      setKeywords(data.keywordSettings.keywords || []);
    }
    if (data.networkTargeting) {
      setNetworkMode(data.networkTargeting.mode);
      setSelectedNetworks(data.networkTargeting.networks || []);
    }
  }, [data]);

  const handleSave = () => {
    if (type === "product") {
      updateData({
        productSelection: {
          mode: productMode,
          selectedProducts:
            productMode === "manual" ? selectedProducts : undefined,
          selectedCategories:
            productMode === "manual" ? selectedCategories : undefined,
        },
      });
    } else if (type === "bid") {
      updateData({
        bidSettings: {
          mode: bidMode,
          categoryBids: bidMode === "manual" ? categoryBids : undefined,
        },
      });
    } else if (type === "keyword") {
      updateData({
        keywordSettings: {
          mode: keywordMode,
          keywords: keywordMode === "manual" ? keywords : undefined,
        },
      });
    } else if (type === "network") {
      updateData({
        networkTargeting: {
          mode: networkMode,
          networks: networkMode === "manual" ? selectedNetworks : undefined,
        },
      });
    }
    onClose();
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const toggleNetwork = (id) => {
    setSelectedNetworks((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const getTitle = () => {
    switch (type) {
      case "product":
        return "Product Selection";
      case "bid":
        return "Bid Settings";
      case "keyword":
        return "Keyword Settings";
      case "network":
        return "Network Targeting";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "product":
        return <Package size={20} className="text-[#f59e0b]" />;
      case "bid":
        return <DollarSign size={20} className="text-[#10b981]" />;
      case "keyword":
        return <Key size={20} className="text-[#8b5cf6]" />;
      case "network":
        return <Globe size={20} className="text-[#0ea5e9]" />;
      default:
        return null;
    }
  };

  if (!open || !type) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[500px] max-w-full h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#efefef]">
          <div className="flex items-center gap-3">
            {getIcon()}
            <h2 className="text-lg font-semibold text-[#404040]">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] text-[#7b7b7b]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {type === "product" && (
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#404040]">
                  Selection Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setProductMode("auto")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      productMode === "auto"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Automatic
                      </span>
                      {productMode === "auto" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      AI selects best performing products
                    </p>
                  </button>
                  <button
                    onClick={() => setProductMode("manual")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      productMode === "manual"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Manual
                      </span>
                      {productMode === "manual" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Select specific products or categories
                    </p>
                  </button>
                </div>
              </div>

              {productMode === "manual" && (
                <>
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
                    />
                    <Input
                      placeholder="Search products or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-[#dedede]"
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#404040]">
                      Categories
                    </label>
                    <div className="space-y-2">
                      {mockCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                            selectedCategories.includes(cat.id)
                              ? "border-[#0097f0] bg-[#e8f4fd]"
                              : "border-[#efefef] hover:border-[#dedede]"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium text-[#404040]">
                              {cat.name}
                            </p>
                            <p className="text-xs text-[#9a9a9a]">
                              {cat.productCount.toLocaleString()} products
                            </p>
                          </div>
                          {selectedCategories.includes(cat.id) && (
                            <Check size={16} className="text-[#0097f0]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Products */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#404040]">
                      Individual Products
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mockProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => toggleProduct(product.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                            selectedProducts.includes(product.id)
                              ? "border-[#0097f0] bg-[#e8f4fd]"
                              : "border-[#efefef] hover:border-[#dedede]"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium text-[#404040]">
                              {product.name}
                            </p>
                            <p className="text-xs text-[#9a9a9a]">
                              {product.category} · ${product.price}
                            </p>
                          </div>
                          {selectedProducts.includes(product.id) && (
                            <Check size={16} className="text-[#0097f0]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {type === "bid" && (
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#404040]">
                  Bidding Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBidMode("auto")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      bidMode === "auto"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Automatic
                      </span>
                      {bidMode === "auto" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      AI optimizes bids for best ROI
                    </p>
                  </button>
                  <button
                    onClick={() => setBidMode("manual")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      bidMode === "manual"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Manual
                      </span>
                      {bidMode === "manual" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Set custom bids per category
                    </p>
                  </button>
                </div>
              </div>

              {bidMode === "manual" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#404040]">
                    Category Bids
                  </label>
                  <div className="space-y-3">
                    {mockCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#404040]">
                            {cat.name}
                          </p>
                          <p className="text-xs text-[#9a9a9a]">
                            Suggested: $0.50 - $1.20
                          </p>
                        </div>
                        <div className="relative w-24">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            value={categoryBids[cat.id] || ""}
                            onChange={(e) =>
                              setCategoryBids({
                                ...categoryBids,
                                [cat.id]: e.target.value,
                              })
                            }
                            className="pl-7 h-8 text-sm border-[#dedede]"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {type === "keyword" && (
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#404040]">
                  Keyword Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKeywordMode("all")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      keywordMode === "all"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        All Keywords
                      </span>
                      {keywordMode === "all" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Target all relevant keywords
                    </p>
                  </button>
                  <button
                    onClick={() => setKeywordMode("manual")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      keywordMode === "manual"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Manual
                      </span>
                      {keywordMode === "manual" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Specify exact keywords to target
                    </p>
                  </button>
                </div>
              </div>

              {keywordMode === "manual" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#404040]">
                    Add Keywords
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter keyword..."
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                      className="border-[#dedede]"
                    />

                    <Button
                      onClick={addKeyword}
                      className="bg-[#0097f0] hover:bg-[#2983d4] text-white"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-[#9a9a9a]">
                    Phrase match type. Max 50 keywords.
                  </p>

                  {keywords.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#404040]">
                        Keywords ({keywords.length})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((kw) => (
                          <span
                            key={kw}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f0f0f0] text-[#404040] text-sm rounded-full"
                          >
                            {kw}
                            <button
                              onClick={() => removeKeyword(kw)}
                              className="hover:text-[#d83c3b]"
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
          )}

          {type === "network" && (
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#404040]">
                  Network Targeting
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNetworkMode("all")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      networkMode === "all"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        All Networks
                      </span>
                      {networkMode === "all" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Show on all retail networks
                    </p>
                  </button>
                  <button
                    onClick={() => setNetworkMode("manual")}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      networkMode === "manual"
                        ? "border-[#0097f0] bg-[#e8f4fd]"
                        : "border-[#efefef] hover:border-[#dedede]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#404040]">
                        Select Networks
                      </span>
                      {networkMode === "manual" && (
                        <Check size={16} className="text-[#0097f0]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7b7b7b]">
                      Choose specific retail networks
                    </p>
                  </button>
                </div>
              </div>

              {networkMode === "manual" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#404040]">
                    Select Retail Networks
                  </label>
                  <div className="space-y-2">
                    {mockNetworks.map((network) => (
                      <button
                        key={network.id}
                        onClick={() => toggleNetwork(network.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                          selectedNetworks.includes(network.id)
                            ? "border-[#0097f0] bg-[#e8f4fd]"
                            : "border-[#efefef] hover:border-[#dedede]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{network.logo}</span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-[#404040]">
                              {network.name}
                            </p>
                            <p className="text-xs text-[#9a9a9a]">
                              Reach: {network.reach} users
                            </p>
                          </div>
                        </div>
                        {selectedNetworks.includes(network.id) && (
                          <Check size={16} className="text-[#0097f0]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#efefef]">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#dedede] bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#0097f0] hover:bg-[#2983d4] text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
