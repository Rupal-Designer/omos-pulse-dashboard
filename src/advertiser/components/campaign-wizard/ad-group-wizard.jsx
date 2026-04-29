"use client";

import { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  ImageIcon,
  Video,
  Layers,
  BookOpen,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSelectionStep } from "./ad-group-steps/product-selection-step";
import { TargetingStep } from "./ad-group-steps/targeting-step";
import { AdCreativeStep } from "./ad-group-steps/ad-creative-step";
import { ConfigStep } from "./ad-group-steps/config-step";
import { createPortal } from "react-dom";

const adGroupSteps = [
  { id: 1, label: "Basics", description: "Name your ad group" },
  { id: 2, label: "Pages", description: "Select target pages" },
  { id: 3, label: "Format", description: "Select ad format" },
  { id: 4, label: "Products", description: "Choose products" },
  { id: 5, label: "Targeting", description: "Define audience" },
  { id: 6, label: "Creative", description: "Create ads" },
  { id: 7, label: "Config", description: "Settings" },
];

const pageInventory = [
  {
    id: "homepage",
    name: "Homepage",
    description: "Main landing page with hero section",
    reach: "2.5M monthly visitors",
    supportedFormats: ["banner", "video", "carousel"],
  },
  {
    id: "category-electronics",
    name: "Electronics Category",
    description: "Browse electronics products",
    reach: "1.2M monthly visitors",
    supportedFormats: ["banner", "carousel", "story"],
  },
  {
    id: "category-fashion",
    name: "Fashion Category",
    description: "Browse fashion products",
    reach: "980K monthly visitors",
    supportedFormats: ["banner", "video", "carousel", "story"],
  },
  {
    id: "product-detail",
    name: "Product Detail Pages",
    description: "Individual product pages",
    reach: "5.1M monthly visitors",
    supportedFormats: ["banner", "video"],
  },
  {
    id: "cart",
    name: "Shopping Cart",
    description: "Cart and checkout flow",
    reach: "450K monthly visitors",
    supportedFormats: ["banner"],
  },
  {
    id: "search-results",
    name: "Search Results",
    description: "Product search results page",
    reach: "3.2M monthly visitors",
    supportedFormats: ["banner", "carousel"],
  },
];

const adFormats = [
  {
    id: "banner",
    name: "Banner Ads",
    description:
      "Drive attention with impactful banners on your own site or app.",
    features: [
      "Premium placements on owned inventory",
      "Full control over brand experience",
      "Real-time targeting and optimization",
    ],
    images: [
      "/placeholder.svg?height=180&width=280",
      "/placeholder.svg?height=180&width=280",
    ],
  },
  {
    id: "video",
    name: "Video Ads",
    description:
      "Deliver engaging video experiences within your content ecosystem.",
    features: [
      "Supports in-feed and pre-roll formats",
      "Boosts engagement with autoplay delivery",
      "High-yield, brand-safe video monetization",
    ],
    images: [
      "/placeholder.svg?height=180&width=280",
      "/placeholder.svg?height=180&width=280",
    ],
  },
  {
    id: "carousel",
    name: "Carousel Ads",
    description: "Showcase multiple creatives with swipeable ad units onsite.",
    features: [
      "Scrollable panels for deeper engagement",
      "Great for multi-product storytelling",
      "Seamlessly fits platform UI design",
    ],
    images: [
      "/placeholder.svg?height=180&width=280",
      "/placeholder.svg?height=180&width=280",
    ],
  },
  {
    id: "story",
    name: "Story Ads",
    description: "Create immersive, swipeable stories within your platform.",
    features: [
      "Familiar full-screen mobile format",
      "Interactive storytelling with swipe gestures",
      "Ideal for short-form promotional content",
    ],
    images: [
      "/placeholder.svg?height=180&width=280",
      "/placeholder.svg?height=180&width=280",
    ],
  },
];

export function AdGroupWizard({ open, onClose, onSave, editingAdGroup }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState({});
  const [adGroupData, setAdGroupData] = useState({
    id: "",
    name: "",
    selectedPages: [],
    productSelection: null,
    targeting: {
      demographics: [],
      interests: [],
      behaviors: [],
      keywords: [],
    },
    adFormat: null,
    creatives: [{ headline: "", description: "", ctaText: "Shop Now" }],
    config: {
      frequencyCap: "3",
      frequencyPeriod: "day",
      deliveryType: "standard",
      dayParting: [],
    },
  });
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  useEffect(() => {
    if (editingAdGroup) {
      setAdGroupData(editingAdGroup);
      setCurrentStep(1);
    } else {
      setAdGroupData({
        id: `ag-${Date.now()}`,
        name: "",
        selectedPages: [],
        productSelection: null,
        targeting: {
          demographics: [],
          interests: [],
          behaviors: [],
          keywords: [],
        },
        adFormat: null,
        creatives: [{ headline: "", description: "", ctaText: "Shop Now" }],
        config: {
          frequencyCap: "3",
          frequencyPeriod: "day",
          deliveryType: "standard",
          dayParting: [],
        },
      });
      setCurrentStep(1);
      setCarouselIndex({});
    }
  }, [editingAdGroup, open]);

  const updateAdGroupData = (updates) => {
    setAdGroupData((prev) => ({ ...prev, ...updates }));
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

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave(adGroupData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return adGroupData.name.trim() !== "";
      case 2:
        return adGroupData.selectedPages.length > 0;
      case 3:
        return adGroupData.adFormat !== null;
      default:
        return true;
    }
  };

  const getAvailableFormats = () => {
    if (adGroupData.selectedPages.length === 0) return [];

    // Get all formats supported by at least one selected page
    const allSupportedFormats = new Set();
    adGroupData.selectedPages.forEach((pageId) => {
      const page = pageInventory.find((p) => p.id === pageId);
      if (page) {
        page.supportedFormats.forEach((format) =>
          allSupportedFormats.add(format),
        );
      }
    });

    return adFormats.filter((format) => allSupportedFormats.has(format.id));
  };

  const togglePage = (pageId) => {
    const newPages = adGroupData.selectedPages.includes(pageId)
      ? adGroupData.selectedPages.filter((p) => p !== pageId)
      : [...adGroupData.selectedPages, pageId];

    // Reset ad format if new selection doesn't support current format
    let newFormat = adGroupData.adFormat;
    if (newFormat) {
      const newSupportedFormats = new Set();
      newPages.forEach((pId) => {
        const page = pageInventory.find((p) => p.id === pId);
        if (page) {
          page.supportedFormats.forEach((f) => newSupportedFormats.add(f));
        }
      });
      if (!newSupportedFormats.has(newFormat)) {
        newFormat = null;
      }
    }

    updateAdGroupData({ selectedPages: newPages, adFormat: newFormat });
  };

  const getFormatIcon = (formatId) => {
    switch (formatId) {
      case "banner":
        return <ImageIcon size={20} />;
      case "video":
        return <Video size={20} />;
      case "carousel":
        return <Layers size={20} />;
      case "story":
        return <BookOpen size={20} />;
      default:
        return <ImageIcon size={20} />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Ad Group Basics
              </h2>
              <p className="text-[#6b7280]">
                Give your ad group a descriptive name.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                Ad Group Name <span className="text-[#ef4444]">*</span>
              </label>
              <Input
                value={adGroupData.name}
                onChange={(e) => updateAdGroupData({ name: e.target.value })}
                placeholder="e.g., Homepage Banner Ads, Product Page Promotions"
                className="w-full border-[#e5e7eb] focus:border-[#2563eb] focus:ring-[#2563eb]/20"
              />

              <p className="text-xs text-[#9ca3af] mt-2">
                Use a name that describes the inventory or targeting strategy
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Select Target Pages
              </h2>
              <p className="text-[#6b7280]">
                Choose which pages to display your ads on. Available ad formats
                will be determined by your selection.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#2d2d2d]">Available Pages</h3>
                <span className="text-sm text-[#6b7280]">
                  {adGroupData.selectedPages.length} selected
                </span>
              </div>

              <div className="space-y-3">
                {pageInventory.map((page) => {
                  const isSelected = adGroupData.selectedPages.includes(
                    page.id,
                  );
                  return (
                    <label
                      key={page.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#2563eb] bg-[#2563eb]/5"
                          : "border-[#e5e7eb] hover:border-[#d1d5db]"
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => togglePage(page.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Layout size={16} className="text-[#6b7280]" />
                          <p className="font-medium text-[#2d2d2d]">
                            {page.name}
                          </p>
                        </div>
                        <p className="text-sm text-[#6b7280] mb-2">
                          {page.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-[#16a34a]">{page.reach}</span>
                          <span className="text-[#9ca3af]">
                            Formats:{" "}
                            {page.supportedFormats
                              .map(
                                (f) => f.charAt(0).toUpperCase() + f.slice(1),
                              )
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {adGroupData.selectedPages.length > 0 && (
              <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-4">
                <h4 className="font-medium text-[#166534] mb-2">
                  Available Ad Formats
                </h4>
                <p className="text-sm text-[#15803d]">
                  Based on your selection, you can use:{" "}
                  {getAvailableFormats()
                    .map((f) => f.name)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        const availableFormats = getAvailableFormats();
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
                Choose Ad Format
              </h2>
              <p className="text-[#6b7280]">
                Select the format for your ad group creatives. Available formats
                are based on your selected pages.
              </p>
            </div>

            {availableFormats.length === 0 ? (
              <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-xl p-4">
                <p className="text-[#92400e]">
                  Please go back and select at least one page to see available
                  ad formats.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {availableFormats.map((format) => {
                  const isSelected = adGroupData.adFormat === format.id;
                  return (
                    <div
                      key={format.id}
                      onClick={() => updateAdGroupData({ adFormat: format.id })}
                      className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        isSelected
                          ? "border-[#2563eb] shadow-md"
                          : "border-[#e5e7eb] hover:border-[#cbd5e1]"
                      }`}
                    >
                      {/* Format Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected
                                ? "bg-[#2563eb]/10 text-[#2563eb]"
                                : "bg-[#f5f5f5] text-[#6b7280]"
                            }`}
                          >
                            {getFormatIcon(format.id)}
                          </div>
                          <span className="font-semibold text-[#2d2d2d]">
                            {format.name}
                          </span>
                        </div>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg hover:bg-[#f5f5f5] text-[#9ca3af]"
                        >
                          <Eye size={16} />
                        </button>
                      </div>

                      {/* Image Carousel */}
                      <div className="relative bg-[#f8f9fa] h-36 flex items-center justify-center overflow-hidden">
                        <img
                          src={format.images[carouselIndex[format.id] || 0]}
                          alt={format.name}
                          className="w-full h-full object-cover"
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCarouselPrev(format.id);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                        >
                          <ChevronLeft size={16} className="text-[#404040]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCarouselNext(format.id);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                        >
                          <ChevronRight size={16} className="text-[#404040]" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {format.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                (carouselIndex[format.id] || 0) === idx
                                  ? "bg-[#2563eb]"
                                  : "bg-black/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Description & Features */}
                      <div className="p-4">
                        <p className="text-sm text-[#6b7280] mb-3">
                          {format.description}
                        </p>
                        <ul className="space-y-1.5">
                          {format.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs"
                            >
                              <Check
                                size={14}
                                className="text-[#16a34a] mt-0.5 shrink-0"
                              />
                              <span className="text-[#404040]">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Select Button */}
                      <div className="px-4 pb-4">
                        <div
                          className={`w-full py-2.5 rounded-lg font-medium text-sm text-center transition-colors ${
                            isSelected
                              ? "bg-[#2563eb] text-white"
                              : "bg-[#f5f5f5] text-[#404040]"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <ProductSelectionStep
            data={adGroupData}
            updateData={updateAdGroupData}
          />
        );
      case 5:
        return (
          <TargetingStep data={adGroupData} updateData={updateAdGroupData} />
        );
      case 6:
        return (
          <AdCreativeStep data={adGroupData} updateData={updateAdGroupData} />
        );
      case 7:
        return <ConfigStep data={adGroupData} updateData={updateAdGroupData} />;
      default:
        return null;
    }
  };

  if (!open || !portalContainer) return null;

  const wizardContent = (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[110] bg-black/40" onClick={onClose} />

      <div className="fixed top-0 bottom-0 right-0 w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-300px)] max-w-[1400px] z-[111] bg-[#f8f9fb] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create Display Ad Group
              </h2>
              <p className="text-sm text-gray-500">
                Step {currentStep} of {adGroupSteps.length} • Return to Campaign
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Steps Sidebar */}
          <div className="w-64 bg-white border-r flex flex-col">
            <div className="flex-1 p-4 space-y-1 overflow-y-auto">
              {adGroupSteps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isDisabled = step.id > currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                      isCurrent
                        ? "bg-primary/10 border border-primary"
                        : isCompleted
                          ? "hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${isCurrent ? "text-primary" : isCompleted ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {step.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div className="border-t p-4 bg-gray-50">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Ad Group Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900 truncate max-w-[120px]">
                    {adGroupData.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pages</span>
                  <span className="font-medium text-gray-900">
                    {adGroupData.selectedPages.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {adGroupData.adFormat || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Creatives</span>
                  <span className="font-medium text-gray-900">
                    {adGroupData.creatives.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8">{renderStepContent()}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            {currentStep === 2 && adGroupData.selectedPages.length === 0 && (
              <p className="text-sm text-red-500">
                Select at least one page to continue
              </p>
            )}
            {currentStep === 3 && !adGroupData.adFormat && (
              <p className="text-sm text-red-500">
                Select an ad format to continue
              </p>
            )}
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="min-w-[120px]"
              >
                {currentStep === adGroupSteps.length
                  ? "Save Ad Group"
                  : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(wizardContent, portalContainer);
}
