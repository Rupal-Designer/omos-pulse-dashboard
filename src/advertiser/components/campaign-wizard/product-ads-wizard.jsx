"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  HelpCircle,
  ChevronRight,
  Check,
  ArrowLeft,
} from "lucide-react";

const campaignTypes = [
  {
    id: "smart-shopping",
    name: "Smart Shopping",
    description:
      "AI-powered campaign that automatically optimizes your product ads across all placements",
    icon: Sparkles,
    recommended: true,
    features: [
      "Automatic bidding optimization",
      "Cross-channel placement",
      "Dynamic product selection",
    ],
  },
  {
    id: "manual",
    name: "Manual Campaign",
    description: "Full control over targeting, bidding, and product selection",
    icon: Target,
    recommended: false,
    features: [
      "Custom targeting rules",
      "Manual bid management",
      "Granular product control",
    ],
  },
  {
    id: "performance-max",
    name: "Performance Max",
    description:
      "Goal-based campaign that maximizes conversions across inventory",
    icon: TrendingUp,
    recommended: false,
    features: [
      "Conversion-focused",
      "Automated creative",
      "Full-funnel optimization",
    ],
  },
];

const wallets = [
  { id: "default", name: "Default", balance: 1904753.59 },
  { id: "sale-2024", name: "Sale 2024 - PLA", balance: 11748280 },
  { id: "2024-q3", name: "2024 Q3", balance: 11599459 },
  { id: "sale23", name: "Sale23", balance: 10000 },
  { id: "awareness", name: "Awareness Ads", balance: 19521925.4 },
  { id: "display", name: "display", balance: 1532113 },
];

const pacingOptions = [
  {
    id: "standard",
    label: "Standard (Even Distribution)",
    description: "Spread your budget evenly throughout the day",
    icon: "📊",
  },
  {
    id: "accelerated",
    label: "Accelerated",
    description: "Spend budget as quickly as possible",
    icon: "⚡",
  },
];

export function ProductAdsWizard({ open, onClose, onLaunch }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("type-selection");
  const [selectedType, setSelectedType] = useState(null);
  const [dailyBudget, setDailyBudget] = useState("100");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState("");
  const [maxSpendCap, setMaxSpendCap] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);
  const [pacing, setPacing] = useState("standard");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClose = () => {
    setStep("type-selection");
    setSelectedType(null);
    setDailyBudget("100");
    setSelectedWallet("");
    setEndDate("");
    setMaxSpendCap("");
    setIsLaunching(false);
    onClose();
  };

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      setStep("configuration");
    }
  };

  const handleBack = () => {
    setStep("type-selection");
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onLaunch({
        campaignType: selectedType || "smart-shopping",
        dailyBudget,
        wallet: selectedWallet,
        startDate,
        endDate,
        maxSpendCap,
        pacing,
      });
      handleClose();
    }, 1500);
  };

  const selectedWalletData = wallets.find((w) => w.id === selectedWallet);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#efefef]">
          <div className="flex items-center gap-3">
            {step === "configuration" && (
              <button
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] text-[#7b7b7b] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold text-[#404040]">
                {step === "type-selection"
                  ? "Create Product Ads Campaign"
                  : "Configure Campaign"}
              </h2>
              <p className="text-sm text-[#7b7b7b] mt-0.5">
                {step === "type-selection"
                  ? "Choose how you want to run your product ads"
                  : "Set your budget and schedule"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] text-[#7b7b7b] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === "type-selection" && (
            <div className="space-y-4">
              <p className="text-sm text-[#7b7b7b] mb-6">
                Select a campaign type to get started
              </p>

              <div className="grid gap-4">
                {campaignTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`
                      relative p-5 rounded-xl border-2 cursor-pointer transition-all
                      ${
                        selectedType === type.id
                          ? "border-[#0097f0] bg-[#f0f9ff]"
                          : "border-[#efefef] hover:border-[#dedede] bg-white"
                      }
                    `}
                  >
                    {type.recommended && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#0097f0] text-white text-xs font-medium rounded-full">
                        Recommended
                      </span>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          ${selectedType === type.id ? "bg-[#0097f0] text-white" : "bg-[#f5f5f5] text-[#7b7b7b]"}
                        `}
                      >
                        <type.icon size={24} />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-[#404040] mb-1">
                          {type.name}
                        </h3>
                        <p className="text-sm text-[#7b7b7b] mb-3">
                          {type.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {type.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-[#f5f5f5] rounded-md text-xs text-[#666]"
                            >
                              <Check size={12} className="text-green-500" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${selectedType === type.id ? "border-[#0097f0] bg-[#0097f0]" : "border-[#dedede]"}
                        `}
                      >
                        {selectedType === type.id && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "configuration" && (
            <div className="grid grid-cols-5 gap-8">
              {/* Left - Form */}
              <div className="col-span-3 space-y-6">
                {/* Daily Budget */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#404040]">
                      Daily Budget
                    </Label>
                    <span className="text-red-500">*</span>
                    <HelpCircle size={14} className="text-[#b0b0b0]" />
                  </div>
                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                    />
                    <Input
                      type="number"
                      value={dailyBudget}
                      onChange={(e) => setDailyBudget(e.target.value)}
                      className="pl-9 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                      placeholder="Enter daily budget"
                    />
                  </div>
                  <p className="text-xs text-[#7b7b7b]">
                    Minimum daily budget is $10
                  </p>
                </div>

                {/* Wallet */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#404040]">
                      Wallet
                    </Label>
                    <span className="text-red-500">*</span>
                    <HelpCircle size={14} className="text-[#b0b0b0]" />
                  </div>
                  <Select
                    value={selectedWallet}
                    onValueChange={setSelectedWallet}
                  >
                    <SelectTrigger className="border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]">
                      <SelectValue placeholder="Select a wallet" />
                    </SelectTrigger>
                    <SelectContent className="z-[200]">
                      {wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{wallet.name}</span>
                            <span className="text-[#7b7b7b] ml-2">
                              (${wallet.balance.toLocaleString()})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedWalletData && (
                    <p className="text-xs text-[#7b7b7b]">
                      Wallet Balance: $
                      {selectedWalletData.balance.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium text-[#404040]">
                        Start Date
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                      />
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="pl-9 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium text-[#404040]">
                        End Date
                      </Label>
                      <span className="text-[#7b7b7b] text-xs">(Optional)</span>
                    </div>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                      />
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="pl-9 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                        placeholder="Select a date"
                      />
                    </div>
                  </div>
                </div>

                {/* Max Spend Cap */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#404040]">
                      Maximum Spend Cap
                    </Label>
                    <span className="text-[#7b7b7b] text-xs">(Optional)</span>
                    <HelpCircle size={14} className="text-[#b0b0b0]" />
                  </div>
                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                    />
                    <Input
                      type="number"
                      value={maxSpendCap}
                      onChange={(e) => setMaxSpendCap(e.target.value)}
                      className="pl-9 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                      placeholder="No cap"
                    />
                  </div>
                  <p className="text-xs text-[#7b7b7b]">
                    Campaign will pause when this limit is reached
                  </p>
                </div>
              </div>

              {/* Right - Pacing Options */}
              <div className="col-span-2">
                <div className="sticky top-0 p-5 bg-white rounded-xl border border-[#e5e7eb]">
                  <h3 className="font-semibold text-[#404040] mb-3">Pacing</h3>
                  <p className="text-sm text-[#7b7b7b] mb-4">
                    Choose how your budget should be distributed over time
                  </p>

                  <div className="space-y-3">
                    {pacingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPacing(option.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          pacing === option.id
                            ? "border-[#0097f0] bg-[#f0f9ff]"
                            : "border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-[#404040] mb-1">
                              {option.label}
                            </div>
                            <div className="text-xs text-[#7b7b7b]">
                              {option.description}
                            </div>
                          </div>
                          {pacing === option.id && (
                            <div className="w-5 h-5 rounded-full bg-[#0097f0] flex items-center justify-center flex-shrink-0">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#efefef] bg-[#fafafa]">
          <div>
            {step === "configuration" && selectedType && (
              <div className="flex items-center gap-2 text-sm text-[#7b7b7b]">
                <span className="px-2 py-1 bg-[#f5f5f5] rounded-md font-medium">
                  {campaignTypes.find((t) => t.id === selectedType)?.name}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={step === "type-selection" ? handleClose : handleBack}
              className="border-[#dedede] text-[#7b7b7b] hover:bg-[#f5f5f5] bg-transparent"
            >
              {step === "type-selection" ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={
                step === "type-selection" ? handleContinue : handleLaunch
              }
              disabled={
                (step === "type-selection" && !selectedType) ||
                (step === "configuration" &&
                  (!dailyBudget || !selectedWallet)) ||
                isLaunching
              }
              className="px-6 bg-[#0097f0] hover:bg-[#2983d4] text-white"
            >
              {isLaunching ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Launching...
                </span>
              ) : step === "type-selection" ? (
                <span className="flex items-center gap-1">
                  Continue
                  <ChevronRight size={16} />
                </span>
              ) : (
                "Launch Campaign"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
