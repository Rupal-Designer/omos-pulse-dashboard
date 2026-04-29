"use client";

import { useState } from "react";
import {
  Search,
  Check,
  Sparkles,
  Package,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const sampleProducts = [
  {
    id: "p1",
    name: "Wireless Headphones Pro",
    sku: "WHP-001",
    price: 199.99,
    category: "Electronics",
    brand: "TechSound",
  },
  {
    id: "p2",
    name: "Organic Green Tea",
    sku: "OGT-002",
    price: 24.99,
    category: "Food & Beverage",
    brand: "NatureTea",
  },
  {
    id: "p3",
    name: "Running Shoes X1",
    sku: "RSX-003",
    price: 129.99,
    category: "Sports",
    brand: "ActiveRun",
  },
  {
    id: "p4",
    name: "Smart Watch Elite",
    sku: "SWE-004",
    price: 299.99,
    category: "Electronics",
    brand: "TechWear",
  },
  {
    id: "p5",
    name: "Vitamin D3 Supplement",
    sku: "VD3-005",
    price: 19.99,
    category: "Health",
    brand: "VitaLife",
  },
  {
    id: "p6",
    name: "Yoga Mat Premium",
    sku: "YMP-006",
    price: 49.99,
    category: "Sports",
    brand: "ZenFit",
  },
];

const categories = ["Electronics", "Food & Beverage", "Sports", "Health"];

export function ProductSelectionStep({ data, updateData }) {
  const [mode, setMode] = useState("smart");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryBids, setShowCategoryBids] = useState(false);
  const [categoryBids, setCategoryBids] = useState(data.categoryBids || {});
  const [showKeywordBids, setShowKeywordBids] = useState(false);
  const [keywordBids, setKeywordBids] = useState(data.keywordBids || {});

  const filteredProducts = sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Product Selection
        </h2>
        <p className="text-[#6b7280]">
          Choose which products to advertise in this ad group.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setMode("smart")}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            mode === "smart"
              ? "border-[#2563eb] bg-[#eff6ff]"
              : "border-[#e5e7eb] hover:border-[#d1d5db]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              mode === "smart"
                ? "bg-[#2563eb] text-white"
                : "bg-[#f3f4f6] text-[#6b7280]"
            }`}
          >
            <Sparkles size={24} />
          </div>
          <h4
            className={`font-semibold mb-1 ${mode === "smart" ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
          >
            Smart Selection
          </h4>
          <p className="text-sm text-[#6b7280]">
            Automatically select products based on category, brand, or price
            filters
          </p>
        </button>

        <button
          onClick={() => setMode("manual")}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            mode === "manual"
              ? "border-[#2563eb] bg-[#eff6ff]"
              : "border-[#e5e7eb] hover:border-[#d1d5db]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              mode === "manual"
                ? "bg-[#2563eb] text-white"
                : "bg-[#f3f4f6] text-[#6b7280]"
            }`}
          >
            <Package size={24} />
          </div>
          <h4
            className={`font-semibold mb-1 ${mode === "manual" ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
          >
            Manual Selection
          </h4>
          <p className="text-sm text-[#6b7280]">
            Manually pick individual products to include or exclude
          </p>
        </button>
      </div>

      {/* Smart Selection Filters */}
      {mode === "smart" && (
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
          <h4 className="font-medium text-[#2d2d2d] mb-4">Filter Products</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-[#6b7280] mb-2 block">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Sports</option>
                <option>Health</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#6b7280] mb-2 block">Brand</label>
              <select className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm">
                <option>All Brands</option>
                <option>TechSound</option>
                <option>ActiveRun</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#6b7280] mb-2 block">
                Price Range
              </label>
              <select className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm">
                <option>Any Price</option>
                <option>Under $50</option>
                <option>$50 - $100</option>
                <option>Over $100</option>
              </select>
            </div>
          </div>
          <div className="mt-4 p-3 bg-[#f9fafb] rounded-lg">
            <span className="text-sm text-[#6b7280]">Matching products: </span>
            <span className="text-sm font-semibold text-[#2d2d2d]">
              156 products
            </span>
          </div>
        </div>
      )}

      {/* Manual Selection */}
      {mode === "manual" && (
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or SKU..."
                className="pl-10 border-[#e5e7eb]"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-80 overflow-auto">
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-[#2563eb] bg-[#eff6ff]"
                      : "border-[#e5e7eb] hover:border-[#d1d5db]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-[#2563eb] border-[#2563eb]"
                          : "border-[#d1d5db]"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2d2d2d]">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#6b7280]">
                        {product.sku} · {product.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#2d2d2d]">
                    ${product.price}
                  </span>
                </div>
              );
            })}
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-4 p-3 bg-[#eff6ff] rounded-lg flex items-center justify-between">
              <span className="text-sm text-[#2563eb]">
                {selectedProducts.length} product(s) selected
              </span>
              <button
                onClick={() => setSelectedProducts([])}
                className="text-sm text-[#2563eb] hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-[#7349a1]" />
            <div>
              <h4 className="font-medium text-[#2d2d2d]">Category Bidding</h4>
              <p className="text-xs text-[#6b7280]">
                Set custom bids for specific product categories
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCategoryBids(!showCategoryBids)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showCategoryBids ? "bg-[#7349a1]" : "bg-[#d1d5db]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showCategoryBids ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {showCategoryBids && (
          <div className="space-y-3 pt-4 border-t border-[#e5e7eb]">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-[#2d2d2d]">
                    {category}
                  </label>
                </div>
                <div className="w-40">
                  <div className="relative">
                    <DollarSign
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
                    />
                    <input
                      type="number"
                      value={categoryBids[category] || ""}
                      onChange={(e) =>
                        updateCategoryBid(category, e.target.value)
                      }
                      placeholder="Default"
                      className="w-full pl-8 pr-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:border-[#2563eb] outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-[#7349a1]" />
            <div>
              <h4 className="font-medium text-[#2d2d2d]">Keyword Bidding</h4>
              <p className="text-xs text-[#6b7280]">
                Set custom bids for specific keywords
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowKeywordBids(!showKeywordBids)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showKeywordBids ? "bg-[#7349a1]" : "bg-[#d1d5db]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showKeywordBids ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {showKeywordBids && (
          <div className="pt-4 border-t border-[#e5e7eb]">
            <p className="text-sm text-[#6b7280] mb-4">
              Customize bids for keywords selected in the Targeting step. Higher
              bids increase visibility for those keywords.
            </p>
            <div className="space-y-3">
              {data.targeting.keywords.length > 0 ? (
                data.targeting.keywords.map((keyword) => (
                  <div key={keyword} className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-[#2d2d2d]">
                        {keyword}
                      </label>
                    </div>
                    <div className="w-40">
                      <div className="relative">
                        <DollarSign
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
                        />
                        <input
                          type="number"
                          value={keywordBids[keyword] || ""}
                          onChange={(e) =>
                            updateKeywordBid(keyword, e.target.value)
                          }
                          placeholder="Default"
                          className="w-full pl-8 pr-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:border-[#2563eb] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#fef3c7] rounded-lg border border-[#fde68a]">
                  <p className="text-sm text-[#d97706]">
                    No keywords selected yet. Add keywords in the Targeting step
                    to enable keyword bidding.
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
