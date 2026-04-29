"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Copy,
  FileText,
  Search,
  Check,
  ArrowLeft,
  Loader2,
  ImageIcon,
  Video,
  Layers,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPortal } from "react-dom";

const templates = [
  {
    id: "scratch",
    label: "Start from scratch",
    description: "Create a new campaign with default settings",
    icon: FileText,
  },
  {
    id: "copy",
    label: "Copy existing campaign",
    description: "Duplicate settings from a previous campaign",
    icon: Copy,
  },
  {
    id: "ai",
    label: "AI-assisted setup",
    description: "Let AI recommend optimal settings",
    icon: Sparkles,
    badge: "Beta",
  },
];

const adFormats = [
  {
    id: "banner",
    label: "Banner Ads",
    description:
      "Drive attention with impactful banners on your own site or app.",
    icon: ImageIcon,
    features: [
      "Premium placements on owned inventory",
      "Full control over brand experience",
      "Real-time targeting and optimization",
    ],
    images: [
      "/placeholder.svg?height=160&width=280",
      "/placeholder.svg?height=160&width=280",
    ],
  },
  {
    id: "video",
    label: "Video Ads",
    description:
      "Deliver engaging video experiences within your content ecosystem.",
    icon: Video,
    features: [
      "Supports in-feed and pre-roll formats",
      "Boosts engagement with autoplay delivery",
      "High-yield, brand-safe video monetization",
    ],
    images: [
      "/placeholder.svg?height=160&width=280",
      "/placeholder.svg?height=160&width=280",
    ],
  },
  {
    id: "carousel",
    label: "Carousel Ads",
    description: "Showcase multiple creatives with swipeable ad units onsite.",
    icon: Layers,
    features: [
      "Scrollable panels for deeper engagement",
      "Great for multi-product storytelling",
      "Seamlessly fits platform UI design",
    ],
    images: [
      "/placeholder.svg?height=160&width=280",
      "/placeholder.svg?height=160&width=280",
    ],
  },
  {
    id: "story",
    label: "Story Ads",
    description: "Create immersive, swipeable stories within your platform.",
    icon: BookOpen,
    features: [
      "Familiar full-screen mobile format",
      "Interactive storytelling with swipe gestures",
      "Ideal for short-form promotional content",
    ],
    images: [
      "/placeholder.svg?height=160&width=280",
      "/placeholder.svg?height=160&width=280",
    ],
  },
];

// Mock existing campaigns for copy feature
const existingCampaigns = [
  {
    id: "1",
    name: "Keyword Targeting Campaign",
    budget: "$300K",
    status: "active",
    performance: "High",
  },
  {
    id: "2",
    name: "Email Campaign Automation",
    budget: "$250K",
    status: "active",
    performance: "Medium",
  },
  {
    id: "3",
    name: "SEO Performance Analysis",
    budget: "$350K",
    status: "paused",
    performance: "High",
  },
  {
    id: "4",
    name: "Social Media Engagement",
    budget: "$150K",
    status: "active",
    performance: "Low",
  },
  {
    id: "5",
    name: "Influencer Partnership",
    budget: "$450K",
    status: "active",
    performance: "High",
  },
  {
    id: "6",
    name: "Pay-Per-Click Advertising",
    budget: "$400K",
    status: "draft",
    performance: "Medium",
  },
];

export function CreateCampaignModal({
  open,
  onClose,
  onContinue,
  adType = "product",
}) {
  const [step, setStep] = useState("initial");
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("scratch");
  const [error, setError] = useState("");
  const [adFormat, setAdFormat] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState({});

  // Copy campaign state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  // AI questionnaire state
  const [aiAnswers, setAiAnswers] = useState({
    goal: "",
    audience: "",
    budgetRange: "",
    timeline: "",
  });

  const filteredCampaigns = existingCampaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedCampaign = existingCampaigns.find(
    (c) => c.id === selectedCampaignId,
  );

  const handleAdFormatSelect = (formatId) => {
    setAdFormat(formatId);
  };

  const handleAdFormatContinue = () => {
    if (!adFormat) {
      setError("Please select an ad format");
      return;
    }
    setError("");
    setStep("initial");
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter a campaign name");
      return;
    }

    if (template === "copy") {
      setStep("copy-select");
    } else if (template === "ai") {
      setStep("ai-questionnaire");
    } else {
      onContinue({
        name,
        template,
        adType: adType,
        adFormat: adFormat,
      });
    }
  };

  const handleCopyCampaign = () => {
    if (!selectedCampaignId) {
      setError("Please select a campaign to copy");
      return;
    }

    const selectedCampaign = existingCampaigns.find(
      (c) => c.id === selectedCampaignId,
    );
    if (selectedCampaign) {
      onContinue({
        name: name || `${selectedCampaign.name} (Copy)`,
        template: "copy",
        copiedFromId: selectedCampaignId,
        adType: adType,
        adFormat: adFormat,
      });
    }
  };

  const handleAiGenerate = () => {
    if (
      !aiAnswers.goal ||
      !aiAnswers.audience ||
      !aiAnswers.budgetRange ||
      !aiAnswers.timeline
    ) {
      setError("Please answer all questions to generate AI recommendations");
      return;
    }

    setStep("ai-generating");

    // Simulate AI generation
    setTimeout(() => {
      const suggestions = generateAiSuggestions(aiAnswers);
      onContinue({
        name,
        template: "ai",
        aiSuggestions: suggestions,
        adType: adType,
        adFormat: adFormat,
      });
    }, 2000);
  };

  const generateAiSuggestions = (answers) => {
    const budgetMap = {
      small: { total: "$50,000", daily: "$1,500" },
      medium: { total: "$150,000", daily: "$5,000" },
      large: { total: "$500,000", daily: "$15,000" },
      enterprise: { total: "$1,000,000", daily: "$30,000" },
    };

    const budget = budgetMap[answers.budgetRange] || budgetMap.medium;
    const goalStrategy =
      answers.goal === "sales"
        ? "CPA"
        : answers.goal === "traffic"
          ? "CPC"
          : "CPM";

    return {
      budget: budget.total,
      dailyBudget: budget.daily,
      bidStrategy: goalStrategy,
      priority: answers.timeline === "urgent" ? "High" : "Standard",
      pacing: answers.timeline === "urgent" ? "Accelerated" : "Even",
      reasoning: `Based on your ${answers.goal} goal and ${answers.budgetRange} budget, I recommend a ${goalStrategy} bidding strategy. ${answers.timeline === "urgent" ? "Given your urgent timeline, accelerated pacing will help deliver impressions quickly." : "Even pacing will distribute your budget consistently throughout the campaign duration."}`,
    };
  };

  const handleClose = () => {
    setName("");
    setTemplate("scratch");
    setError("");
    setStep("initial");
    setSearchQuery("");
    setSelectedCampaignId(null);
    setAiAnswers({ goal: "", audience: "", budgetRange: "", timeline: "" });
    setAdFormat(null);
    setCarouselIndex({});
    onClose();
  };

  const handleBack = () => {
    if (step !== "initial") {
      setStep("initial");
    }
    setError("");
    setSelectedCampaignId(null);
    setSearchQuery("");
  };

  const handleCarouselPrev = (formatId) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [formatId]: prev[formatId] === 0 ? 1 : 0,
    }));
  };

  const handleCarouselNext = (formatId) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [formatId]: prev[formatId] === 1 ? 0 : 1,
    }));
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl mx-4 overflow-hidden w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#efefef]">
          <div className="flex items-center gap-3">
            {step !== "initial" && step !== "ai-generating" && (
              <button
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] text-[#7b7b7b] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold text-[#404040]">
                {step === "initial" && "Create New Campaign"}
                {step === "copy-select" && "Select Campaign to Copy"}
                {step === "ai-questionnaire" && "AI Campaign Setup"}
                {step === "ai-generating" && "Generating Recommendations"}
              </h2>
              <p className="text-sm text-[#7b7b7b] mt-0.5">
                {step === "initial" &&
                  (adType === "display"
                    ? "Set up your display advertising campaign"
                    : adType === "offsite"
                      ? "Set up your offsite advertising campaign"
                      : adType === "instore"
                        ? "Set up your in-store digital advertising campaign"
                        : "Set up your product advertising campaign")}
                {step === "copy-select" &&
                  "Choose an existing campaign to use as a template"}
                {step === "ai-questionnaire" &&
                  "Answer a few questions and let AI configure your campaign"}
                {step === "ai-generating" &&
                  "Please wait while we analyze your inputs..."}
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
        <div className="p-6">
          {step === "initial" && (
            <div className="space-y-6">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="campaign-name"
                  className="text-sm font-medium text-[#404040]"
                >
                  Campaign Name <span className="text-[#d83c3b]">*</span>
                </Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Summer Sale 2025, Black Friday Promotion"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className="h-11 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                />

                <p className="text-xs text-[#9a9a9a]">
                  Choose a descriptive name to easily identify this campaign
                  later
                </p>
              </div>

              {/* Template Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-[#404040]">
                  How would you like to start?
                </Label>
                <div className="space-y-2">
                  {templates.map((tpl) => {
                    const Icon = tpl.icon;
                    const isSelected = template === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => setTemplate(tpl.id)}
                        className={`
                          w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all
                          ${
                            isSelected
                              ? "border-[#0097f0] bg-[#e8f4fd]"
                              : "border-[#efefef] hover:border-[#dedede] hover:bg-[#fafafa]"
                          }
                        `}
                      >
                        <div
                          className={`
                          w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                          ${isSelected ? "bg-[#0097f0] text-white" : "bg-[#f5f5f5] text-[#7b7b7b]"}
                        `}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={`font-medium text-sm ${isSelected ? "text-[#0097f0]" : "text-[#404040]"}`}
                            >
                              {tpl.label}
                            </p>
                            {tpl.badge && (
                              <span className="px-2 py-0.5 text-[10px] font-medium bg-[#7c3aed] text-white rounded-full">
                                {tpl.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#9a9a9a] mt-0.5">
                            {tpl.description}
                          </p>
                        </div>
                        <div
                          className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${isSelected ? "border-[#0097f0] bg-[#0097f0]" : "border-[#dedede]"}
                        `}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Copy Campaign Selection Step */}
          {step === "copy-select" && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
                />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 border-[#dedede] focus:border-[#0097f0] focus:ring-[#0097f0]"
                />
              </div>

              {/* Campaign List */}
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {filteredCampaigns.map((campaign) => {
                  const isSelected = selectedCampaignId === campaign.id;
                  return (
                    <button
                      key={campaign.id}
                      onClick={() => {
                        setSelectedCampaignId(campaign.id);
                        setError("");
                      }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all
                        ${isSelected ? "border-[#0097f0] bg-[#e8f4fd]" : "border-[#efefef] hover:border-[#dedede] hover:bg-[#fafafa]"}
                      `}
                    >
                      <div
                        className={`
                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                        ${isSelected ? "bg-[#0097f0] text-white" : "bg-[#f5f5f5] text-[#7b7b7b]"}
                      `}
                      >
                        <Copy size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-medium text-sm ${isSelected ? "text-[#0097f0]" : "text-[#404040]"}`}
                          >
                            {campaign.name}
                          </p>
                          <span
                            className={`
                            px-2 py-0.5 text-[10px] font-medium rounded-full capitalize
                            ${
                              campaign.status === "active"
                                ? "bg-[#dcfce7] text-[#16a34a]"
                                : campaign.status === "paused"
                                  ? "bg-[#fef3c7] text-[#d97706]"
                                  : "bg-[#f3f4f6] text-[#6b7280]"
                            }
                          `}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-[#9a9a9a]">
                            Budget: {campaign.budget}
                          </p>
                          <p className="text-xs text-[#9a9a9a]">
                            Performance: {campaign.performance}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                        ${isSelected ? "border-[#0097f0] bg-[#0097f0]" : "border-[#dedede]"}
                      `}
                      >
                        {isSelected && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Campaign Preview */}
              {selectedCampaign && (
                <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                  <p className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-2">
                    Preview
                  </p>
                  <p className="text-sm text-[#404040]">
                    New campaign will be created as:{" "}
                    <span className="font-medium">
                      {name} (Copy of {selectedCampaign.name})
                    </span>
                  </p>
                  <p className="text-xs text-[#9a9a9a] mt-1">
                    All settings, ad groups, and configurations will be
                    duplicated. You can modify them before launching.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* AI Questionnaire Step */}
          {step === "ai-questionnaire" && (
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-r from-[#7c3aed]/10 to-[#0097f0]/10 rounded-lg border border-[#7c3aed]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-[#7c3aed]" />
                  <p className="text-sm font-medium text-[#7c3aed]">
                    AI-Powered Recommendations
                  </p>
                </div>
                <p className="text-xs text-[#64748b]">
                  Answer a few questions and our AI will suggest optimal
                  campaign settings based on your goals and industry best
                  practices.
                </p>
              </div>

              {/* Question 1: Goal */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#404040]">
                  What's your primary goal for this campaign?{" "}
                  <span className="text-[#d83c3b]">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "sales",
                      label: "Increase Sales",
                      desc: "Drive more purchases",
                    },
                    {
                      id: "leads",
                      label: "Generate Leads",
                      desc: "Capture customer info",
                    },
                    {
                      id: "awareness",
                      label: "Build Awareness",
                      desc: "Reach new audiences",
                    },
                    {
                      id: "engagement",
                      label: "Boost Engagement",
                      desc: "Increase interactions",
                    },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() =>
                        setAiAnswers((prev) => ({ ...prev, goal: goal.id }))
                      }
                      className={`
                        p-3 rounded-lg border-2 text-left transition-all
                        ${aiAnswers.goal === goal.id ? "border-[#7c3aed] bg-[#7c3aed]/5" : "border-[#efefef] hover:border-[#dedede]"}
                      `}
                    >
                      <p
                        className={`text-sm font-medium ${aiAnswers.goal === goal.id ? "text-[#7c3aed]" : "text-[#404040]"}`}
                      >
                        {goal.label}
                      </p>
                      <p className="text-xs text-[#9a9a9a]">{goal.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Target Audience */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#404040]">
                  Describe your target audience (optional)
                </Label>
                <Input
                  placeholder="e.g., Health-conscious millennials, tech enthusiasts, parents with young children"
                  value={aiAnswers.audience}
                  onChange={(e) =>
                    setAiAnswers((prev) => ({
                      ...prev,
                      audience: e.target.value,
                    }))
                  }
                  className="h-11 border-[#dedede] focus:border-[#7c3aed] focus:ring-[#7c3aed]"
                />
              </div>

              {/* Question 3: Budget Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#404040]">
                  What's your budget range?{" "}
                  <span className="text-[#d83c3b]">*</span>
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "small", label: "Small", range: "$10K - $50K" },
                    { id: "medium", label: "Medium", range: "$50K - $200K" },
                    { id: "large", label: "Large", range: "$200K - $500K" },
                    { id: "enterprise", label: "Enterprise", range: "$500K+" },
                  ].map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() =>
                        setAiAnswers((prev) => ({
                          ...prev,
                          budgetRange: budget.id,
                        }))
                      }
                      className={`
                        p-3 rounded-lg border-2 text-center transition-all
                        ${aiAnswers.budgetRange === budget.id ? "border-[#7c3aed] bg-[#7c3aed]/5" : "border-[#efefef] hover:border-[#dedede]"}
                      `}
                    >
                      <p
                        className={`text-sm font-medium ${aiAnswers.budgetRange === budget.id ? "text-[#7c3aed]" : "text-[#404040]"}`}
                      >
                        {budget.label}
                      </p>
                      <p className="text-xs text-[#9a9a9a]">{budget.range}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Timeline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#404040]">
                  How soon do you need results?{" "}
                  <span className="text-[#d83c3b]">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "urgent", label: "ASAP", desc: "Within 1-2 weeks" },
                    { id: "normal", label: "Standard", desc: "1-3 months" },
                    { id: "longterm", label: "Long-term", desc: "3+ months" },
                  ].map((timeline) => (
                    <button
                      key={timeline.id}
                      onClick={() =>
                        setAiAnswers((prev) => ({
                          ...prev,
                          timeline: timeline.id,
                        }))
                      }
                      className={`
                        p-3 rounded-lg border-2 text-center transition-all
                        ${aiAnswers.timeline === timeline.id ? "border-[#7c3aed] bg-[#7c3aed]/5" : "border-[#efefef] hover:border-[#dedede]"}
                      `}
                    >
                      <p
                        className={`text-sm font-medium ${aiAnswers.timeline === timeline.id ? "text-[#7c3aed]" : "text-[#404040]"}`}
                      >
                        {timeline.label}
                      </p>
                      <p className="text-xs text-[#9a9a9a]">{timeline.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Generating Step */}
          {step === "ai-generating" && (
            <div className="py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0097f0] flex items-center justify-center mb-6">
                <Loader2 size={32} className="text-white animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-[#404040] mb-2">
                Generating AI Recommendations
              </h3>
              <p className="text-sm text-[#7b7b7b] text-center max-w-md">
                Our AI is analyzing your requirements and generating optimized
                campaign settings based on industry best practices and
                historical performance data.
              </p>
              <div className="mt-8 space-y-2 w-full max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#16a34a] flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <p className="text-sm text-[#404040]">
                    Analyzing campaign goal
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#16a34a] flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <p className="text-sm text-[#404040]">
                    Processing budget constraints
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Loader2 size={16} className="text-[#7c3aed] animate-spin" />
                  <p className="text-sm text-[#7b7b7b]">
                    Generating recommendations...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 px-4 py-3 bg-[#fef2f2] border border-[#fecaca] rounded-lg">
              <p className="text-sm text-[#dc2626]">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "ai-generating" && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#efefef] bg-[#fafafa]">
            <Button
              variant="outline"
              onClick={
                step === "initial" &&
                adType !== "display" &&
                adType !== "offsite" &&
                adType !== "instore"
                  ? handleClose
                  : handleBack
              }
              className="border-[#dedede] text-[#7b7b7b] hover:bg-[#f5f5f5] bg-transparent"
            >
              {step === "initial" &&
              adType !== "display" &&
              adType !== "offsite" &&
              adType !== "instore"
                ? "Cancel"
                : "Back"}
            </Button>
            <Button
              onClick={
                step === "initial"
                  ? handleContinue
                  : step === "copy-select"
                    ? handleCopyCampaign
                    : handleAiGenerate
              }
              className={`
                px-6 text-white
                ${step === "ai-questionnaire" ? "bg-[#7c3aed] hover:bg-[#6d28d9]" : "bg-[#0097f0] hover:bg-[#2983d4]"}
              `}
            >
              {step === "initial" && "Continue to Setup"}
              {step === "copy-select" && "Copy & Continue"}
              {step === "ai-questionnaire" && (
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Generate Recommendations
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
