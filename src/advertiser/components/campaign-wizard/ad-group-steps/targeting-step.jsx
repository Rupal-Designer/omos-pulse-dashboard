"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Users,
  Heart,
  ShoppingBag,
  Tag,
  Store,
  Network,
  X,
} from "lucide-react";

const targetingOptions = {
  demographics: [
    { id: "age-18-24", label: "18-24 years" },
    { id: "age-25-34", label: "25-34 years" },
    { id: "age-35-44", label: "35-44 years" },
    { id: "age-45-54", label: "45-54 years" },
    { id: "age-55+", label: "55+ years" },
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
  ],
  interests: [
    { id: "tech", label: "Technology" },
    { id: "sports", label: "Sports & Fitness" },
    { id: "fashion", label: "Fashion & Beauty" },
    { id: "travel", label: "Travel" },
    { id: "food", label: "Food & Dining" },
    { id: "entertainment", label: "Entertainment" },
  ],
  behaviors: [
    { id: "frequent-buyer", label: "Frequent Buyers" },
    { id: "cart-abandoner", label: "Cart Abandoners" },
    { id: "new-visitor", label: "New Visitors" },
    { id: "returning", label: "Returning Customers" },
    { id: "high-value", label: "High-Value Customers" },
  ],
};

export function TargetingStep({ data, updateData }) {
  const [expandedSections, setExpandedSections] = useState([
    "demographics",
    "interests",
    "behaviors",
  ]);
  const [keywords, setKeywords] = useState("");
  const [negativeKeywords, setNegativeKeywords] = useState("");
  const [selectedStores, setSelectedStores] = useState(
    data.targeting.stores || [],
  );
  const [selectedNetworks, setSelectedNetworks] = useState(
    data.targeting.networks || [],
  );

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const toggleOption = (category, id) => {
    const current = data.targeting[category];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    updateData({
      targeting: {
        ...data.targeting,
        [category]: updated,
      },
    });
  };

  const addKeyword = () => {
    if (keywords.trim()) {
      updateData({
        targeting: {
          ...data.targeting,
          keywords: [...data.targeting.keywords, keywords.trim()],
        },
      });
      setKeywords("");
    }
  };

  const removeKeyword = (keyword) => {
    updateData({
      targeting: {
        ...data.targeting,
        keywords: data.targeting.keywords.filter((k) => k !== keyword),
      },
    });
  };

  const addNegativeKeyword = () => {
    if (negativeKeywords.trim()) {
      updateData({
        targeting: {
          ...data.targeting,
          negativeKeywords: [
            ...(data.targeting.negativeKeywords || []),
            negativeKeywords.trim(),
          ],
        },
      });
      setNegativeKeywords("");
    }
  };

  const removeNegativeKeyword = (keyword) => {
    updateData({
      targeting: {
        ...data.targeting,
        negativeKeywords: (data.targeting.negativeKeywords || []).filter(
          (k) => k !== keyword,
        ),
      },
    });
  };

  const toggleStore = (storeId) => {
    const updated = selectedStores.includes(storeId)
      ? selectedStores.filter((s) => s !== storeId)
      : [...selectedStores, storeId];
    setSelectedStores(updated);
    updateData({
      targeting: {
        ...data.targeting,
        stores: updated,
      },
    });
  };

  const toggleNetwork = (networkId) => {
    const updated = selectedNetworks.includes(networkId)
      ? selectedNetworks.filter((n) => n !== networkId)
      : [...selectedNetworks, networkId];
    setSelectedNetworks(updated);
    updateData({
      targeting: {
        ...data.targeting,
        networks: updated,
      },
    });
  };

  const sections = [
    {
      key: "demographics",
      label: "Demographics",
      icon: Users,
      options: targetingOptions.demographics,
    },
    {
      key: "interests",
      label: "Interests",
      icon: Heart,
      options: targetingOptions.interests,
    },
    {
      key: "behaviors",
      label: "Behaviors",
      icon: ShoppingBag,
      options: targetingOptions.behaviors,
    },
  ];

  const availableStores = [
    { id: "store-1", name: "Downtown Store", location: "123 Main St" },
    { id: "store-2", name: "Mall Location", location: "456 Shopping Center" },
    { id: "store-3", name: "Airport Store", location: "789 Terminal Dr" },
    { id: "store-4", name: "Suburban Store", location: "321 Oak Ave" },
  ];

  const availableNetworks = [
    { id: "amazon", name: "Amazon", logo: "🛒" },
    { id: "walmart", name: "Walmart", logo: "🛍️" },
    { id: "costco", name: "Costco", logo: "📦" },
    { id: "target", name: "Target", logo: "🎯" },
    { id: "kroger", name: "Kroger", logo: "🏪" },
    { id: "instacart", name: "Instacart", logo: "🛵" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Audience Targeting
        </h2>
        <p className="text-[#6b7280]">
          Define who should see your ads based on demographics, interests,
          behaviors, stores, and networks.
        </p>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedSections.includes(section.key);
        const selectedCount = data.targeting[section.key].length;

        return (
          <div
            key={section.key}
            className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#f9fafb] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
                  <Icon size={20} className="text-[#6b7280]" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-[#2d2d2d]">
                    {section.label}
                  </h4>
                  {selectedCount > 0 && (
                    <span className="text-xs text-[#2563eb]">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown size={20} className="text-[#6b7280]" />
              ) : (
                <ChevronRight size={20} className="text-[#6b7280]" />
              )}
            </button>

            {isExpanded && (
              <div className="p-4 pt-0 border-t border-[#e5e7eb]">
                <div className="grid grid-cols-3 gap-2 pt-4">
                  {section.options.map((option) => {
                    const isSelected = data.targeting[section.key].includes(
                      option.id,
                    );
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleOption(section.key, option.id)}
                        className={`px-4 py-2 rounded-lg border text-sm text-left transition-all flex items-center gap-2 ${
                          isSelected
                            ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                            : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "bg-[#2563eb] border-[#2563eb]"
                              : "border-[#d1d5db]"
                          }`}
                        >
                          {isSelected && (
                            <Check size={10} className="text-white" />
                          )}
                        </div>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Store Targeting */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
        <button
          onClick={() => toggleSection("stores")}
          className="w-full p-4 flex items-center justify-between hover:bg-[#f9fafb] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
              <Store size={20} className="text-[#6b7280]" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-[#2d2d2d]">Store Targeting</h4>
              {selectedStores.length > 0 && (
                <span className="text-xs text-[#2563eb]">
                  {selectedStores.length} selected
                </span>
              )}
            </div>
          </div>
          {expandedSections.includes("stores") ? (
            <ChevronDown size={20} className="text-[#6b7280]" />
          ) : (
            <ChevronRight size={20} className="text-[#6b7280]" />
          )}
        </button>

        {expandedSections.includes("stores") && (
          <div className="p-4 pt-0 border-t border-[#e5e7eb]">
            <div className="space-y-2 pt-4">
              {availableStores.map((store) => {
                const isSelected = selectedStores.includes(store.id);
                return (
                  <button
                    key={store.id}
                    onClick={() => toggleStore(store.id)}
                    className={`w-full px-4 py-3 rounded-lg border text-sm text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                        : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-[#2563eb] border-[#2563eb]"
                          : "border-[#d1d5db]"
                      }`}
                    >
                      {isSelected && <Check size={10} className="text-white" />}
                    </div>
                    <div>
                      <div className="font-medium">{store.name}</div>
                      <div className="text-xs text-[#9ca3af]">
                        {store.location}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Network Targeting */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
        <button
          onClick={() => toggleSection("networks")}
          className="w-full p-4 flex items-center justify-between hover:bg-[#f9fafb] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
              <Network size={20} className="text-[#6b7280]" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-[#2d2d2d]">
                Retail Network Targeting
              </h4>
              <span className="text-xs text-[#6b7280]">
                Select which retail partner networks to run ads on
              </span>
              {selectedNetworks.length > 0 && (
                <span className="text-xs text-[#2563eb] block">
                  {selectedNetworks.length} networks selected
                </span>
              )}
            </div>
          </div>
          {expandedSections.includes("networks") ? (
            <ChevronDown size={20} className="text-[#6b7280]" />
          ) : (
            <ChevronRight size={20} className="text-[#6b7280]" />
          )}
        </button>

        {expandedSections.includes("networks") && (
          <div className="p-4 pt-0 border-t border-[#e5e7eb]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pt-4">
              {availableNetworks.map((network) => {
                const isSelected = selectedNetworks.includes(network.id);
                return (
                  <button
                    key={network.id}
                    onClick={() => toggleNetwork(network.id)}
                    className={`px-4 py-3 rounded-lg border text-sm text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                        : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-[#2563eb] border-[#2563eb]"
                          : "border-[#d1d5db]"
                      }`}
                    >
                      {isSelected && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-lg">{network.logo}</span>
                    <span className="font-medium">{network.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Keywords */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
            <Tag size={20} className="text-[#6b7280]" />
          </div>
          <div>
            <h4 className="font-medium text-[#2d2d2d]">Keyword Targeting</h4>
            <span className="text-xs text-[#6b7280]">
              Target users searching for specific terms
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addKeyword()}
            placeholder="Enter keyword and press Enter"
            className="flex-1 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:border-[#2563eb] outline-none"
          />

          <button
            onClick={addKeyword}
            className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm hover:bg-[#1d4ed8] transition-colors"
          >
            Add
          </button>
        </div>

        {data.targeting.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.targeting.keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#eff6ff] text-[#2563eb] rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-[#1d4ed8]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Negative Keywords */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
            <X size={20} className="text-[#d97706]" />
          </div>
          <div>
            <h4 className="font-medium text-[#2d2d2d]">
              Negative Keyword Targeting
            </h4>
            <span className="text-xs text-[#6b7280]">
              Exclude users searching for specific terms
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={negativeKeywords}
            onChange={(e) => setNegativeKeywords(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addNegativeKeyword()}
            placeholder="Enter negative keyword and press Enter"
            className="flex-1 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:border-[#d97706] outline-none"
          />

          <button
            onClick={addNegativeKeyword}
            className="px-4 py-2 bg-[#d97706] text-white rounded-lg text-sm hover:bg-[#b45309] transition-colors"
          >
            Add
          </button>
        </div>

        {data.targeting.negativeKeywords &&
          data.targeting.negativeKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.targeting.negativeKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#fef3c7] text-[#d97706] rounded-full text-sm"
                >
                  {keyword}
                  <button
                    onClick={() => removeNegativeKeyword(keyword)}
                    className="hover:text-[#b45309]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
