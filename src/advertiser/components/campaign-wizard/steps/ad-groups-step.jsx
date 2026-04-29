"use client";

import { Plus, Search, Pencil, Trash2, Copy, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdGroupsStep({
  adGroups,
  onAddAdGroup,
  onEditAdGroup,
  onDeleteAdGroup,
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
            Ad Groups
          </h2>
          <p className="text-[#6b7280]">
            Create ad groups to organize your ads by inventory, targeting, and
            creative.
          </p>
        </div>
        <Button
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-2"
          onClick={onAddAdGroup}
        >
          <Plus size={16} />
          Add Ad Group
        </Button>
      </div>

      {adGroups.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#eff6ff] flex items-center justify-center mx-auto mb-4">
            <Layers size={28} className="text-[#2563eb]" />
          </div>
          <h3 className="text-lg font-semibold text-[#2d2d2d] mb-2">
            No ad groups yet
          </h3>
          <p className="text-[#6b7280] mb-6 max-w-md mx-auto">
            Ad groups help you organize your campaign by grouping ads that share
            the same inventory, targeting, and budget settings.
          </p>
          <Button
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-2"
            onClick={onAddAdGroup}
          >
            <Plus size={16} />
            Create Your First Ad Group
          </Button>
        </div>
      ) : (
        /* Ad Groups List */
        <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#e5e7eb] rounded-lg bg-[#f9fafb] w-72">
              <Search size={16} className="text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search ad groups..."
                className="bg-transparent text-sm outline-none placeholder:text-[#9ca3af] flex-1"
              />
            </div>
            <span className="text-sm text-[#6b7280]">
              {adGroups.length} ad group(s)
            </span>
          </div>

          {/* Ad Groups Cards */}
          <div className="p-4 space-y-4">
            {adGroups.map((adGroup, index) => (
              <div
                key={adGroup.id}
                className="border border-[#e5e7eb] rounded-xl p-5 hover:border-[#d1d5db] hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-[#2d2d2d] text-lg">
                      {adGroup.name}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#f3f4f6] text-[#6b7280] rounded text-xs mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280]" />
                      Draft
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditAdGroup(index)}
                      className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteAdGroup(index)}
                      className="w-8 h-8 flex items-center justify-center text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <span className="text-xs text-[#6b7280] block mb-1">
                      Inventory
                    </span>
                    <span className="text-sm font-semibold text-[#2d2d2d]">
                      {adGroup.selectedPages.length} page(s)
                    </span>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <span className="text-xs text-[#6b7280] block mb-1">
                      Targeting
                    </span>
                    <span className="text-sm font-semibold text-[#2d2d2d]">
                      {Object.values(adGroup.targeting).flat().length} option(s)
                    </span>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <span className="text-xs text-[#6b7280] block mb-1">
                      Ad Format
                    </span>
                    <span className="text-sm font-semibold text-[#2d2d2d]">
                      {adGroup.adFormat || "Not set"}
                    </span>
                  </div>
                  <div className="bg-[#f9fafb] rounded-lg p-3">
                    <span className="text-xs text-[#6b7280] block mb-1">
                      Creatives
                    </span>
                    <span className="text-sm font-semibold text-[#2d2d2d]">
                      {adGroup.creatives.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
