"use client";

import { useState } from "react";
import {
  X,
  Pencil,
  Info,
  ChevronDown,
  Calendar,
  Search,
  RefreshCw,
  Download,
  Plus,
  MoreVertical,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateAdGroupDrawer } from "./create-ad-group-drawer";

export function CreateCampaignDrawer({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("estimator");
  const [adGroupDrawerOpen, setAdGroupDrawerOpen] = useState(false);
  const [adGroups, setAdGroups] = useState([]);
  const [editingAdGroupIndex, setEditingAdGroupIndex] = useState(null);

  const handleAddAdGroup = (adGroupData) => {
    const newAdGroup = {
      id: `ag-${Date.now()}`,
      name: adGroupData.name || `Ad Group ${adGroups.length + 1}`,
      status: "draft",
      biddingStrategy: "CPM",
      creationDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      }),
      dailyBudget: "$500",
      adSpend: "$0",
      impressions: "0",
      clicks: "0",
    };

    if (editingAdGroupIndex !== null) {
      const updated = [...adGroups];
      updated[editingAdGroupIndex] = {
        ...updated[editingAdGroupIndex],
        ...newAdGroup,
      };
      setAdGroups(updated);
      setEditingAdGroupIndex(null);
    } else {
      setAdGroups([...adGroups, newAdGroup]);
    }
  };

  const handleEditAdGroup = (index) => {
    setEditingAdGroupIndex(index);
    setAdGroupDrawerOpen(true);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div
        className="fixed right-0 top-0 z-50 h-full bg-[#f4f6f9] shadow-xl flex flex-col transition-transform duration-300"
        style={{ width: "90%" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e0e0e0]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#2d2d2d]">
              Campaign Name (8th September | 10:00)
            </span>
            <button className="text-[#6b7280] hover:text-[#2d2d2d] transition-colors">
              <Pencil size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-[#2563eb] hover:underline"
            >
              <Info size={14} />
              How to create and modify a campaign?
            </a>
            <button
              onClick={onClose}
              className="text-[#6b7280] hover:text-[#2d2d2d] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Campaign Settings Card */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm mb-6">
              <div className="px-5 py-3 border-b border-[#e5e7eb]">
                <span className="text-sm font-medium text-[#6b7280]">
                  Campaign Settings
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Bidding Strategy & Schedule */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Bidding Strategy */}
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-4">
                      Bidding Strategy
                    </h3>
                    <div className="border border-[#e5e7eb] rounded-lg p-4 bg-[#fafafa]">
                      <label className="text-sm text-[#2d2d2d] flex items-center gap-1 mb-2">
                        Select buying type{" "}
                        <span className="text-[#ef4444]">*</span>
                        <Info size={12} className="text-[#9ca3af]" />
                      </label>
                      <div className="relative">
                        <select className="w-52 px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#6b7280] appearance-none bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors">
                          <option>Choose strategy</option>
                          <option>CPM</option>
                          <option>CPC</option>
                          <option>CPA</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                        />
                      </div>
                      <p className="text-xs text-[#9ca3af] mt-2">
                        You can select the buying type like CPM/CPC
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-4">
                      Schedule
                    </h3>
                    <div className="border border-[#e5e7eb] rounded-lg p-4 bg-[#fafafa]">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-sm text-[#2d2d2d] mb-2 block">
                            Start date
                          </label>
                          <div className="flex items-center gap-2 px-3 py-2.5 border border-[#e5e7eb] rounded-lg bg-white">
                            <Calendar size={16} className="text-[#2563eb]" />
                            <span className="text-sm text-[#2d2d2d]">
                              08 Sept 2025
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="text-sm text-[#2d2d2d] mb-2 block">
                            End date{" "}
                            <span className="text-[#9ca3af] italic text-xs">
                              (Optional)
                            </span>
                          </label>
                          <div className="flex items-center gap-2 px-3 py-2.5 border border-[#e5e7eb] rounded-lg bg-white">
                            <Calendar size={16} className="text-[#2563eb]" />
                            <span className="text-sm text-[#2d2d2d]">
                              28 Sept 2025
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#9ca3af] mt-3">
                        * Date range will be set in the Asia/Kolkata timezone
                      </p>
                    </div>
                  </div>
                </div>

                {/* Budget & Wallet */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Budget */}
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-4">
                      Budget
                    </h3>
                    <div className="border border-[#e5e7eb] rounded-lg p-4 bg-[#fafafa]">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-sm text-[#2d2d2d] mb-2 block">
                            Enter Total Budget ($)
                            <span className="text-[#ef4444]">*</span>
                          </label>
                          <Input
                            placeholder="Enter here"
                            className="border-[#e5e7eb] bg-white focus:border-[#2563eb]"
                          />

                          <p className="text-xs text-[#9ca3af] mt-1">
                            Minimum budget should be $10
                          </p>
                        </div>
                        <div className="flex-1">
                          <label className="text-sm text-[#2d2d2d] mb-2 block">
                            Enter Daily Budget ($)
                            <span className="text-[#ef4444]">*</span>
                          </label>
                          <Input
                            placeholder="Enter here"
                            className="border-[#e5e7eb] bg-white focus:border-[#2563eb]"
                          />

                          <p className="text-xs text-[#9ca3af] mt-1">
                            Minimum budget should be $10
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-4">
                      Wallet
                    </h3>
                    <div className="border border-[#2563eb]/20 rounded-lg p-4 bg-[#eff6ff]">
                      <label className="text-sm text-[#2d2d2d] flex items-center gap-1 mb-2">
                        Choose wallet <span className="text-[#ef4444]">*</span>
                        <Info size={12} className="text-[#9ca3af]" />
                      </label>
                      <div className="relative">
                        <select className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#2d2d2d] appearance-none bg-white focus:border-[#2563eb] outline-none">
                          <option>Default wallet</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                        />
                      </div>
                      <p className="text-xs text-[#059669] mt-2 font-medium">
                        Wallet Balance: $5,850,489.59
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Setting */}
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-4">
                    Additional Setting
                  </h3>
                  <div className="border border-[#e5e7eb] rounded-lg p-4 bg-[#fafafa]">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-[#2d2d2d] flex items-center gap-1 mb-2">
                          Campaign Priority{" "}
                          <Info size={12} className="text-[#9ca3af]" />
                        </label>
                        <div className="relative">
                          <select className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#2d2d2d] appearance-none bg-white focus:border-[#2563eb] outline-none">
                            <option>Guaranteed</option>
                            <option>Standard</option>
                            <option>Low</option>
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-[#2d2d2d] flex items-center gap-1 mb-2">
                          Campaign Pacing{" "}
                          <Info size={12} className="text-[#9ca3af]" />
                        </label>
                        <div className="relative">
                          <select className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#2d2d2d] appearance-none bg-white focus:border-[#2563eb] outline-none">
                            <option>Accelerated</option>
                            <option>Standard</option>
                            <option>Smooth</option>
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advance Setting Link */}
                <button className="flex items-center gap-1 text-sm text-[#2563eb] hover:underline font-medium">
                  Advance Setting
                  <ChevronDown size={14} className="-rotate-90" />
                </button>
              </div>
            </div>

            {/* Ad Groups Section */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
              <div className="px-5 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2d2d2d]">
                    Ad Groups
                  </span>
                  <span className="text-xs bg-[#e5e7eb] text-[#6b7280] px-2 py-0.5 rounded-full">
                    {adGroups.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
                    <RefreshCw size={14} />
                  </button>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#e5e7eb] rounded-lg bg-white">
                    <Search size={14} className="text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Search Ad Groups"
                      className="text-sm outline-none placeholder:text-[#9ca3af] w-36"
                    />
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
                    <Download size={14} />
                  </button>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-1.5"
                    onClick={() => {
                      setEditingAdGroupIndex(null);
                      setAdGroupDrawerOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    Add Ad Group
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e7eb] text-left bg-[#f9fafb]">
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Bidding Strategy{" "}
                          <Info size={10} className="text-[#9ca3af]" />
                        </div>
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Creation Date
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Daily Budget{" "}
                          <Info size={10} className="text-[#9ca3af]" />
                        </div>
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Ad Spend
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Impressions
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="p-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adGroups.map((adGroup, index) => (
                      <tr
                        key={adGroup.id}
                        className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors"
                      >
                        <td className="p-3">
                          <span
                            className="text-sm text-[#2563eb] font-medium hover:underline cursor-pointer"
                            onClick={() => handleEditAdGroup(index)}
                          >
                            {adGroup.name}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                              adGroup.status === "active"
                                ? "bg-[#dcfce7] text-[#16a34a]"
                                : adGroup.status === "paused"
                                  ? "bg-[#fef3c7] text-[#d97706]"
                                  : "bg-[#f3f4f6] text-[#6b7280]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                adGroup.status === "active"
                                  ? "bg-[#16a34a]"
                                  : adGroup.status === "paused"
                                    ? "bg-[#d97706]"
                                    : "bg-[#6b7280]"
                              }`}
                            />

                            {adGroup.status.charAt(0).toUpperCase() +
                              adGroup.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.biddingStrategy}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.creationDate}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.dailyBudget}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.adSpend}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.impressions}
                        </td>
                        <td className="p-3 text-sm text-[#6b7280]">
                          {adGroup.clicks}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <button className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:bg-[#e5e7eb] rounded transition-colors">
                              <TrendingUp size={14} />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:bg-[#e5e7eb] rounded transition-colors">
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {adGroups.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#eff6ff] flex items-center justify-center mb-4">
                    <Plus size={24} className="text-[#2563eb]" />
                  </div>
                  <p className="text-[#6b7280] mb-4 text-center">
                    Start building your Campaign by adding Ad Groups
                  </p>
                  <Button
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-1.5"
                    onClick={() => {
                      setEditingAdGroupIndex(null);
                      setAdGroupDrawerOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    Add Your First Ad Group
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Media Estimator */}
          <div className="w-72 bg-white border-l border-[#e5e7eb] flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-[#e5e7eb]">
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "estimator"
                    ? "text-[#2563eb] border-b-2 border-[#2563eb] bg-[#eff6ff]"
                    : "text-[#6b7280] hover:bg-[#f9fafb]"
                }`}
                onClick={() => setActiveTab("estimator")}
              >
                Media Estimator
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "delivery"
                    ? "text-[#2563eb] border-b-2 border-[#2563eb] bg-[#eff6ff]"
                    : "text-[#6b7280] hover:bg-[#f9fafb]"
                }`}
                onClick={() => setActiveTab("delivery")}
              >
                Delivery so far
              </button>
            </div>

            <div className="flex-1 p-5 space-y-6">
              <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <div className="flex items-center gap-1 text-sm font-medium text-[#2d2d2d] mb-2">
                  Impressions <Info size={12} className="text-[#9ca3af]" />
                </div>
                <p className="text-xs text-[#9ca3af] italic leading-relaxed">
                  Your estimated and max impressions will be displayed here.
                </p>
              </div>

              <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                <div className="flex items-center gap-1 text-sm font-medium text-[#2d2d2d] mb-2">
                  Pricing <Info size={12} className="text-[#9ca3af]" />
                </div>
                <p className="text-xs text-[#9ca3af] italic leading-relaxed">
                  Your suggested CPM and suggested total budget will be
                  displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#e5e7eb] flex justify-center gap-3">
          <Button
            variant="outline"
            className="px-8 border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff] bg-transparent"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-8 bg-[#475569] hover:bg-[#334155] text-white"
            disabled={adGroups.length === 0}
          >
            Launch Campaign
          </Button>
        </div>
      </div>

      {/* Ad Group Drawer (80% width) */}
      <CreateAdGroupDrawer
        open={adGroupDrawerOpen}
        onClose={() => setAdGroupDrawerOpen(false)}
        onSave={handleAddAdGroup}
      />
    </>
  );
}
