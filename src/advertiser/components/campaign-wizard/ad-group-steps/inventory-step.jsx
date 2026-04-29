"use client";

import { Check, Sparkles, DollarSign } from "lucide-react";
import { useState } from "react";

const websitePages = [
  {
    id: 0,
    name: "Home Page",
    impressions: "2.5M",
    inventories: 8,
    targeting: 5,
    tags: ["High Traffic", "Premium"],
  },
  {
    id: 1,
    name: "Category Page",
    impressions: "1.8M",
    inventories: 6,
    targeting: 4,
    tags: ["High Intent", "Category Specific"],
  },
  {
    id: 2,
    name: "Product Detail Page",
    impressions: "3.2M",
    inventories: 10,
    targeting: 6,
    tags: ["High Conversion", "Product Specific"],
  },
  {
    id: 3,
    name: "Search Results",
    impressions: "1.5M",
    inventories: 4,
    targeting: 3,
    tags: ["High Intent", "Keyword Based"],
  },
  {
    id: 4,
    name: "Cart Page",
    impressions: "800K",
    inventories: 3,
    targeting: 2,
    tags: ["High Conversion", "Checkout Flow"],
  },
  {
    id: 5,
    name: "Checkout Page",
    impressions: "600K",
    inventories: 2,
    targeting: 2,
    tags: ["Premium", "Checkout Flow"],
  },
];

export function InventoryStep({ data, updateData }) {
  const [bidOverrides, setBidOverrides] = useState(data.bidOverrides || {});
  const [showBidOverrides, setShowBidOverrides] = useState(false);

  const togglePage = (id) => {
    const updated = data.selectedPages.includes(id)
      ? data.selectedPages.filter((p) => p !== id)
      : [...data.selectedPages, id];
    updateData({ selectedPages: updated });
  };

  const updateBidOverride = (pageId, value) => {
    const updated = { ...bidOverrides, [pageId]: value };
    setBidOverrides(updated);
    updateData({ bidOverrides: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Select Inventory
        </h2>
        <p className="text-[#6b7280]">
          Choose the website pages where your ads will be displayed.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-[#7349a1]" />
            <span className="text-sm font-medium text-[#2d2d2d]">
              Enable Inventory-Level Bid Overrides
            </span>
          </div>
          <button
            onClick={() => setShowBidOverrides(!showBidOverrides)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showBidOverrides ? "bg-[#7349a1]" : "bg-[#d1d5db]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showBidOverrides ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>
        {showBidOverrides && (
          <p className="text-xs text-[#6b7280] mt-2">
            Set custom bid amounts for specific inventory pages to prioritize
            high-value placements
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {websitePages.map((page) => {
          const isSelected = data.selectedPages.includes(page.id);
          return (
            <div key={page.id} className="space-y-2">
              <button
                onClick={() => togglePage(page.id)}
                className={`w-full p-5 rounded-xl border-2 text-left transition-all relative ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#2563eb] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}

                <h4
                  className={`font-semibold mb-2 ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                >
                  {page.name}
                </h4>

                <div className="flex items-center gap-1 text-[#f59e0b] text-sm mb-3">
                  <Sparkles size={14} />
                  <span>Est. Daily Imp: {page.impressions}</span>
                </div>

                <div className="space-y-1 text-sm text-[#6b7280]">
                  <div className="flex justify-between">
                    <span>Total Inventories</span>
                    <span className="font-medium text-[#2d2d2d]">
                      {page.inventories}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Targeting Options</span>
                    <span className="font-medium text-[#2d2d2d]">
                      {page.targeting}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#f3f4f6] text-[#6b7280] text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>

              {isSelected && showBidOverrides && (
                <div className="px-4 py-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                  <label className="block text-xs font-medium text-[#6b7280] mb-2">
                    Custom Bid ($)
                  </label>
                  <input
                    type="number"
                    value={bidOverrides[page.id] || ""}
                    onChange={(e) => updateBidOverride(page.id, e.target.value)}
                    placeholder="Leave empty for default"
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:border-[#2563eb] outline-none"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.selectedPages.length > 0 && (
        <div className="bg-[#eff6ff] rounded-lg p-4 flex items-center justify-between">
          <span className="text-sm text-[#2563eb]">
            {data.selectedPages.length} page(s) selected
          </span>
          <button
            onClick={() => updateData({ selectedPages: [] })}
            className="text-sm text-[#2563eb] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
