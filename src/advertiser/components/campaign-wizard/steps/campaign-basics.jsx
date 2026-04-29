"use client";

import {
  Megaphone,
  Target,
  Users,
  ShoppingCart,
  Eye,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const objectives = [
  {
    id: "awareness",
    label: "Brand Awareness",
    description: "Increase visibility and reach new customers",
    icon: Eye,
  },
  {
    id: "traffic",
    label: "Website Traffic",
    description: "Drive more visitors to your website",
    icon: TrendingUp,
  },
  {
    id: "engagement",
    label: "Engagement",
    description: "Get more interactions with your content",
    icon: Users,
  },
  {
    id: "conversions",
    label: "Conversions",
    description: "Drive purchases and sign-ups",
    icon: ShoppingCart,
  },
  {
    id: "retargeting",
    label: "Retargeting",
    description: "Re-engage previous visitors",
    icon: Target,
  },
  {
    id: "product_sales",
    label: "Product Sales",
    description: "Promote specific products",
    icon: Megaphone,
  },
];

export function CampaignBasicsStep({ data, updateData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Campaign Basics
        </h2>
        <p className="text-[#6b7280]">
          Give your campaign a name and select your primary objective.
        </p>
      </div>

      {/* Campaign Name */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
          Campaign Name <span className="text-[#ef4444]">*</span>
        </label>
        <Input
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="Enter a descriptive name for your campaign"
          className="max-w-lg border-[#e5e7eb] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
        />

        <p className="text-xs text-[#9ca3af] mt-2">
          Use a clear name that helps you identify this campaign later (e.g.,
          "Summer Sale 2025")
        </p>
      </div>

      {/* Campaign Objective */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-4">
          Campaign Objective <span className="text-[#ef4444]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {objectives.map((objective) => {
            const Icon = objective.icon;
            const isSelected = data.objective === objective.id;
            return (
              <button
                key={objective.id}
                onClick={() => updateData({ objective: objective.id })}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected
                      ? "bg-[#2563eb] text-white"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <h4
                  className={`font-medium mb-1 ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                >
                  {objective.label}
                </h4>
                <p className="text-xs text-[#6b7280]">
                  {objective.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
