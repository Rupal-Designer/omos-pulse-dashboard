"use client";

import { Info, Zap, Clock } from "lucide-react";

const strategies = [
  {
    id: "cpm",
    label: "CPM",
    description: "Cost per 1,000 impressions",
    recommended: true,
  },
  { id: "cpc", label: "CPC", description: "Cost per click" },
  { id: "cpa", label: "CPA", description: "Cost per acquisition" },
  {
    id: "vcpm",
    label: "vCPM",
    description: "Viewable cost per 1,000 impressions",
  },
];

const pacingOptions = [
  {
    id: "standard",
    label: "Standard",
    description: "Evenly distribute budget throughout the day",
    icon: Clock,
  },
  {
    id: "accelerated",
    label: "Accelerated",
    description: "Spend budget as quickly as possible",
    icon: Zap,
  },
];

const priorityOptions = [
  {
    id: "guaranteed",
    label: "Guaranteed",
    description: "Highest priority delivery",
  },
  { id: "standard", label: "Standard", description: "Normal priority" },
  { id: "house", label: "House", description: "Fill unsold inventory" },
];

export function BiddingStep({ data, updateData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Bidding Strategy
        </h2>
        <p className="text-[#6b7280]">
          Choose how you want to pay for your ads and control delivery.
        </p>
      </div>

      {/* Bidding Strategy */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-4">
          Select Buying Type <span className="text-[#ef4444]">*</span>
        </label>
        <div className="grid grid-cols-4 gap-4">
          {strategies.map((strategy) => {
            const isSelected = data.biddingStrategy === strategy.id;
            return (
              <button
                key={strategy.id}
                onClick={() => updateData({ biddingStrategy: strategy.id })}
                className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                {strategy.recommended && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#16a34a] text-white text-[10px] font-medium rounded-full">
                    Recommended
                  </span>
                )}
                <h4
                  className={`font-semibold mb-1 ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                >
                  {strategy.label}
                </h4>
                <p className="text-xs text-[#6b7280]">{strategy.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pacing */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-4 flex items-center gap-1">
          Campaign Pacing <Info size={12} className="text-[#9ca3af]" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          {pacingOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = data.pacing === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateData({ pacing: option.id })}
                className={`p-5 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-[#2563eb] text-white"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4
                    className={`font-medium mb-1 ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                  >
                    {option.label}
                  </h4>
                  <p className="text-xs text-[#6b7280]">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-4 flex items-center gap-1">
          Campaign Priority <Info size={12} className="text-[#9ca3af]" />
        </label>
        <div className="flex gap-3">
          {priorityOptions.map((option) => {
            const isSelected = data.priority === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateData({ priority: option.id })}
                className={`px-5 py-3 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                <h4
                  className={`font-medium text-sm ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                >
                  {option.label}
                </h4>
                <p className="text-xs text-[#6b7280]">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
