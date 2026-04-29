"use client";

import { Check, Calendar, DollarSign, Target, Layers } from "lucide-react";

export function ReviewStep({ data }) {
  const totalBudget = Number.parseFloat(data.totalBudget) || 0;
  const dailyBudget = Number.parseFloat(data.dailyBudget) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Review & Launch
        </h2>
        <p className="text-[#6b7280]">
          Review your campaign settings before launching.
        </p>
      </div>

      {/* Campaign Overview */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
        <div className="px-6 py-4 bg-[#f9fafb] border-b border-[#e5e7eb]">
          <h3 className="font-semibold text-[#2d2d2d]">
            {data.name || "Untitled Campaign"}
          </h3>
          <p className="text-sm text-[#6b7280] capitalize">
            {data.objective.replace("_", " ")} Campaign
          </p>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Schedule */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center">
              <Calendar size={20} className="text-[#2563eb]" />
            </div>
            <div>
              <h4 className="font-medium text-[#2d2d2d] mb-1">Schedule</h4>
              <p className="text-sm text-[#6b7280]">
                {data.startDate}{" "}
                {data.endDate ? `- ${data.endDate}` : "(Ongoing)"}
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
              <DollarSign size={20} className="text-[#16a34a]" />
            </div>
            <div>
              <h4 className="font-medium text-[#2d2d2d] mb-1">Budget</h4>
              <p className="text-sm text-[#6b7280]">
                ${totalBudget.toLocaleString()} total · $
                {dailyBudget.toLocaleString()}/day
              </p>
            </div>
          </div>

          {/* Bidding */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
              <Target size={20} className="text-[#d97706]" />
            </div>
            <div>
              <h4 className="font-medium text-[#2d2d2d] mb-1">Bidding</h4>
              <p className="text-sm text-[#6b7280] uppercase">
                {data.biddingStrategy} · {data.pacing} pacing
              </p>
            </div>
          </div>

          {/* Ad Groups */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#f3e8ff] flex items-center justify-center">
              <Layers size={20} className="text-[#7c3aed]" />
            </div>
            <div>
              <h4 className="font-medium text-[#2d2d2d] mb-1">Ad Groups</h4>
              <p className="text-sm text-[#6b7280]">
                {data.adGroups.length} ad group(s) configured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Groups Summary */}
      {data.adGroups.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e5e7eb]">
            <h3 className="font-semibold text-[#2d2d2d]">Ad Groups Summary</h3>
          </div>
          <div className="divide-y divide-[#e5e7eb]">
            {data.adGroups.map((adGroup, index) => (
              <div
                key={adGroup.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-sm font-medium text-[#2563eb]">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2d2d2d]">
                      {adGroup.name}
                    </h4>
                    <p className="text-xs text-[#6b7280]">
                      {adGroup.selectedPages.length} pages ·{" "}
                      {adGroup.adFormat || "No format"} ·{" "}
                      {adGroup.creatives.length} creative(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#16a34a]" />
                  <span className="text-sm text-[#16a34a]">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] p-6">
        <h3 className="font-semibold text-[#16a34a] mb-4 flex items-center gap-2">
          <Check size={20} />
          Ready to Launch
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
            <Check size={14} className="text-[#16a34a]" />
            Campaign name and objective set
          </div>
          <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
            <Check size={14} className="text-[#16a34a]" />
            Schedule configured
          </div>
          <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
            <Check size={14} className="text-[#16a34a]" />
            Budget and wallet selected
          </div>
          <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
            <Check size={14} className="text-[#16a34a]" />
            Bidding strategy defined
          </div>
          <div className="flex items-center gap-2 text-sm text-[#2d2d2d]">
            <Check size={14} className="text-[#16a34a]" />
            {data.adGroups.length} ad group(s) created
          </div>
        </div>
      </div>
    </div>
  );
}
