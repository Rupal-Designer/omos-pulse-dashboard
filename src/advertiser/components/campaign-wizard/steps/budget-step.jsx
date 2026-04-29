"use client";

import {
  DollarSign,
  Wallet,
  Info,
  AlertCircle,
  Zap,
  Search,
  BarChart3,
  Rocket,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const walletOptions = [
  {
    id: "default",
    name: "Default",
    balance: 1904753.59,
    promoBalance: 6089649.19,
  },
  {
    id: "sale2024-pla",
    name: "Sale 2024 - PLA",
    balance: 11748280,
    promoBalance: 0,
  },
  { id: "2024q3", name: "2024 Q3", balance: 11599459, promoBalance: 0 },
  { id: "sale23", name: "Sale23", balance: 10000, promoBalance: 0 },
  {
    id: "awareness",
    name: "Awareness Ads",
    balance: 19521925.4,
    promoBalance: 0,
  },
];

const budgetTypes = [
  {
    id: "daily",
    label: "Daily Budget",
    description: "Set a daily spending limit",
  },
  {
    id: "lifetime",
    label: "Lifetime Budget",
    description: "Total budget for campaign duration",
  },
];

const pacingOptions = [
  {
    id: "standard",
    label: "Standard (Even Distribution)",
    description:
      "Spread your budget evenly throughout the day to maintain consistent visibility",
    icon: <BarChart3 size={24} className="text-[#6366f1]" />,
  },
  {
    id: "accelerated",
    label: "Accelerated",
    description:
      "Spend budget as quickly as possible to maximize early impressions and reach",
    icon: <Rocket size={24} className="text-[#f59e0b]" />,
  },
];

export function BudgetStep({
  data,
  updateData,
  onFieldChange,
  adType = "display",
}) {
  const [budgetType, setBudgetType] = useState(data.budgetType || "daily");
  const [cboEnabled, setCboEnabled] = useState(data.cboEnabled || false);
  const [walletSearch, setWalletSearch] = useState("");
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);

  const isProductAds = adType === "product";

  const totalBudget = Number.parseFloat(data.totalBudget) || 0;
  const dailyBudget = Number.parseFloat(data.dailyBudget) || 0;
  const estimatedDays =
    dailyBudget > 0 ? Math.ceil(totalBudget / dailyBudget) : 0;

  const handleBudgetTypeChange = (type) => {
    setBudgetType(type);
    updateData({ budgetType: type });
  };

  const handleCboToggle = () => {
    const newValue = !cboEnabled;
    setCboEnabled(newValue);
    updateData({ cboEnabled: newValue });
  };

  const handleFieldChange = (field, value) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    } else {
      updateData({ [field]: value });
    }
  };

  const filteredWallets = walletOptions.filter((w) =>
    w.name.toLowerCase().includes(walletSearch.toLowerCase()),
  );

  const selectedWallet = walletOptions.find((w) => w.id === data.wallet);

  // Product Ads Layout
  if (isProductAds) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#2d2d2d]">
            Campaign Setup
          </h2>
          <p className="text-sm text-[#6b7280] mt-1">
            Configure your Product Ads campaign budget and schedule.
          </p>
        </div>

        <div className="space-y-6">
          {/* Daily Budget */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium text-[#2d2d2d]">
                Daily Budget:
              </Label>
              <Info size={14} className="text-[#9ca3af]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
                  $
                </span>
                <Input
                  type="number"
                  value={data.dailyBudget}
                  onChange={(e) =>
                    handleFieldChange("dailyBudget", e.target.value)
                  }
                  className="pl-7 w-32 border-[#e5e7eb]"
                  placeholder="100"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b7280]">FlexiBudget</span>
                <Info size={14} className="text-[#9ca3af]" />
                <Switch
                  checked={data.flexiBudget}
                  onCheckedChange={(checked) =>
                    updateData({ flexiBudget: checked })
                  }
                />
              </div>
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">
              Your average daily budget can be in the range from $12,250 to
              $15,925. This is based on overall data from 2nd Dec, 2025 - 8th
              Dec, 2025.
            </p>
          </div>

          {/* Wallet Selection */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
            <Label className="text-sm font-medium text-[#2d2d2d] mb-3 block">
              Choose Wallet
            </Label>
            <div className="relative">
              <button
                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-left bg-white hover:bg-[#f9fafb] transition-colors"
              >
                {selectedWallet ? (
                  <div>
                    <span className="text-[#2d2d2d]">
                      {selectedWallet.name} ($
                      {selectedWallet.balance.toLocaleString()})
                    </span>
                  </div>
                ) : (
                  <span className="text-[#9ca3af]">Select Wallet</span>
                )}
              </button>

              {walletDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                  <div className="p-2 border-b border-[#e5e7eb]">
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                      />
                      <Input
                        value={walletSearch}
                        onChange={(e) => setWalletSearch(e.target.value)}
                        placeholder="Search"
                        className="pl-9 border-[#e5e7eb]"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredWallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => {
                          updateData({ wallet: wallet.id });
                          setWalletDropdownOpen(false);
                          setWalletSearch("");
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-[#f9fafb] transition-colors ${
                          data.wallet === wallet.id ? "bg-[#eff6ff]" : ""
                        }`}
                      >
                        <div className="text-sm text-[#2d2d2d]">
                          {wallet.name} (${wallet.balance.toLocaleString()})
                        </div>
                        <div className="text-xs text-[#9ca3af]">
                          Promotion Balance $
                          {wallet.promoBalance.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Start & End Date */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm font-medium text-[#2d2d2d]">
                    Start Date
                  </Label>
                  <Info size={14} className="text-[#9ca3af]" />
                </div>
                <Input
                  type="date"
                  value={data.startDate}
                  onChange={(e) =>
                    handleFieldChange("startDate", e.target.value)
                  }
                  className="border-[#e5e7eb]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm font-medium text-[#2d2d2d]">
                    End Date
                  </Label>
                  <span className="text-xs text-[#9ca3af]">(Optional)</span>
                </div>
                <Input
                  type="date"
                  value={data.endDate}
                  onChange={(e) => handleFieldChange("endDate", e.target.value)}
                  className="border-[#e5e7eb]"
                />
              </div>
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">
              * Date will be set in the Asia/Kolkata (+05:30) timezone
            </p>
          </div>

          {/* Maximum Spend Cap */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium text-[#2d2d2d]">
                Maximum Spend Cap:
              </Label>
              <Info size={14} className="text-[#9ca3af]" />
              <span className="text-xs text-[#9ca3af]">(Optional)</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
                $
              </span>
              <Input
                type="number"
                value={data.maxSpendCap}
                onChange={(e) => updateData({ maxSpendCap: e.target.value })}
                className="pl-7 w-48 border-[#e5e7eb]"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
            <h3 className="text-sm font-semibold text-[#2d2d2d] mb-3">
              Pacing
            </h3>
            <p className="text-sm text-[#6b7280] mb-4">
              Choose how your budget should be distributed over time
            </p>
            <div className="grid grid-cols-2 gap-3">
              {pacingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateData({ pacing: option.id })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    data.pacing === option.id
                      ? "border-[#2563eb] bg-[#eff6ff]"
                      : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">{option.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-[#2d2d2d] mb-1">
                        {option.label}
                      </div>
                      <div className="text-xs text-[#6b7280]">
                        {option.description}
                      </div>
                    </div>
                    {data.pacing === option.id && (
                      <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display Ads Layout (Redesigned)
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#2d2d2d]">
          Budget & Schedule
        </h2>
        <p className="text-sm text-[#6b7280]">
          Configure your campaign budget, schedule, and payment settings.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-[#e5e7eb] p-5 space-y-5">
        <div>
          <label className="block font-medium text-[#2d2d2d] mb-2">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="e.g., Summer Sale 2025"
            className="h-9 border-[#e5e7eb] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          />
        </div>

        {/* Budget Type - Compact chip selector */}
        <div className="pb-4 border-b border-[#f3f4f6]">
          <Label className="text-sm font-medium text-[#2d2d2d] mb-2 block">
            Budget Type
          </Label>
          <div className="flex gap-2">
            {budgetTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleBudgetTypeChange(type.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  budgetType === type.id
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb]"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* CBO Toggle - Compact inline */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f3f4f6]">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#7c3aed]" />
            <span className="text-sm font-medium text-[#2d2d2d]">
              Campaign Budget Optimization
            </span>
            <Info size={12} className="text-[#9ca3af]" />
          </div>
          <Switch checked={cboEnabled} onCheckedChange={handleCboToggle} />
        </div>

        {/* Budget Inputs - Two columns */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#f3f4f6]">
          <div>
            <Label className="text-sm font-medium text-[#2d2d2d] mb-1.5 block">
              Total Budget <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <DollarSign
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
              <Input
                type="number"
                value={data.totalBudget}
                onChange={(e) => updateData({ totalBudget: e.target.value })}
                placeholder="10,000"
                className="pl-8 h-9 border-[#e5e7eb] text-sm"
              />
            </div>
            <p className="text-xs text-[#9ca3af] mt-1">Min: $10</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#2d2d2d] mb-1.5 block">
              Daily Budget <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <DollarSign
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
              <Input
                type="number"
                value={data.dailyBudget}
                onChange={(e) => updateData({ dailyBudget: e.target.value })}
                placeholder="500"
                className="pl-8 h-9 border-[#e5e7eb] text-sm"
              />
            </div>
            <p className="text-xs text-[#9ca3af] mt-1">Min: $10</p>
          </div>
        </div>

        {/* Budget Estimation - Compact inline */}
        {estimatedDays > 0 && (
          <div className="flex items-center gap-2 text-sm text-[#16a34a] pb-4 border-b border-[#f3f4f6]">
            <Info size={14} />
            <span>
              Estimated duration: <strong>{estimatedDays} days</strong>
            </span>
          </div>
        )}

        {dailyBudget > totalBudget && totalBudget > 0 && (
          <div className="flex items-center gap-2 text-sm text-[#d97706] pb-4 border-b border-[#f3f4f6]">
            <AlertCircle size={14} />
            <span>Daily budget exceeds total budget</span>
          </div>
        )}

        {/* Schedule + Wallet - Three columns */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-[#2d2d2d] mb-1.5 block">
              Start Date <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="date"
              value={data.startDate}
              onChange={(e) => handleFieldChange("startDate", e.target.value)}
              className="h-9 border-[#e5e7eb] text-sm"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-[#2d2d2d] mb-1.5 block">
              End Date
            </Label>
            <Input
              type="date"
              value={data.endDate}
              onChange={(e) => handleFieldChange("endDate", e.target.value)}
              className="h-9 border-[#e5e7eb] text-sm"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-[#2d2d2d] mb-1.5 block">
              Wallet <span className="text-[#ef4444]">*</span>
            </Label>
            <select
              value={data.wallet}
              onChange={(e) => updateData({ wallet: e.target.value })}
              className="w-full px-3 py-2 h-9 border border-[#e5e7eb] rounded-lg text-sm bg-white focus:border-[#2563eb] outline-none"
            >
              <option value="">Select</option>
              {walletOptions.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Wallet Balance - Compact */}
        {selectedWallet && (
          <div className="flex items-center gap-2 text-sm">
            <Wallet size={14} className="text-[#16a34a]" />
            <span className="text-[#16a34a]">
              Balance: ${selectedWallet.balance.toLocaleString()}
            </span>
          </div>
        )}

        {/* Pacing Options section */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-5">
          <h3 className="font-semibold text-[#2d2d2d] mb-3">Pacing</h3>
          <p className="text-sm text-[#6b7280] mb-4">
            Choose how your budget should be distributed over time
          </p>
          <div className="grid grid-cols-2 gap-3">
            {pacingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData({ pacing: option.id })}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  data.pacing === option.id
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">{option.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-[#2d2d2d] mb-1">
                      {option.label}
                    </div>
                    <div className="text-xs text-[#6b7280]">
                      {option.description}
                    </div>
                  </div>
                  {data.pacing === option.id && (
                    <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
