"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Package,
  Layers,
} from "lucide-react";
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
import { AdGroupWizard } from "./ad-group-wizard";
import { ProductAdSettingsDrawer } from "./product-ad-settings-drawer";
import { BudgetStep } from "./steps/budget-step";
import { ProductAdGroupWizard } from "./product-ad-group-wizard";
import { OffsiteAdGroupWizard } from "./offsite-ad-group-wizard";

// Modified campaignSteps to include title for header
const campaignSteps = [
  { id: 1, title: "Campaign Setup", description: "Budget & schedule" },
  { id: 2, title: "Ad Groups", description: "Create ad groups" },
  { id: 3, title: "Review & Launch", description: "Review and publish" },
];

export function CampaignWizard({
  open,
  onClose,
  onLaunch,
  initialData,
  adType = "product",
  mode = "create_campaign",
  selectedCampaign,
}) {
  const visibleSteps =
    mode === "add_ad_group" ? campaignSteps.slice(1) : campaignSteps;

  const [currentStep, setCurrentStep] = useState(visibleSteps[0].id);
  const [adGroupWizardOpen, setAdGroupWizardOpen] = useState(false);
  const [editingAdGroupIndex, setEditingAdGroupIndex] = useState(null);
  const [aiSuggestedFields, setAiSuggestedFields] = useState(new Set());

  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [activeSettingsType, setActiveSettingsType] = useState(null);

  const [campaignData, setCampaignData] = useState({
    name: initialData?.name || "",
    objective: initialData?.objective || "",
    type: "standard",
    priority: "medium",
    wallet: "",
    totalBudget: "",
    dailyBudget: "",
    startDate: "",
    endDate: "",
    bidStrategy: "cpm",
    pacing: "even",
    adGroups: [],
    flexiBudget: false,
    maxSpendCap: "",
    productSelection: { mode: "auto" },
    bidSettings: { mode: "auto" },
    keywordSettings: { mode: "all" },
    networkTargeting: { mode: "all" },
  });

  useEffect(() => {
    if (initialData) {
      const updates = {
        name: initialData.name,
        objective: initialData.objective,
      };

      if (initialData.aiSuggestions) {
        const suggestions = initialData.aiSuggestions;
        updates.totalBudget = suggestions.budget.replace(/[$,]/g, "");
        updates.dailyBudget = suggestions.dailyBudget.replace(/[$,]/g, "");
        updates.bidStrategy = suggestions.bidStrategy.toLowerCase();
        updates.priority = suggestions.priority.toLowerCase();
        updates.pacing = suggestions.pacing.toLowerCase();

        setAiSuggestedFields(
          new Set([
            "totalBudget",
            "dailyBudget",
            "biddingStrategy",
            "priority",
            "pacing",
          ]),
        );
      }

      if (initialData.copiedFromId) {
        updates.totalBudget = "300000";
        updates.dailyBudget = "10000";
        updates.bidStrategy = "cpm";
        updates.priority = "guaranteed";
        updates.pacing = "standard";
      }

      setCampaignData((prev) => ({ ...prev, ...updates }));
    }
  }, [initialData]);

  useEffect(() => {
    if (!open) {
      setCurrentStep(visibleSteps[0].id);
      setCampaignData({
        name: "",
        objective: "",
        type: "standard",
        priority: "medium",
        wallet: "",
        totalBudget: "",
        dailyBudget: "",
        startDate: "",
        endDate: "",
        bidStrategy: "cpm",
        pacing: "even",
        adGroups: [],
        flexiBudget: false,
        maxSpendCap: "",
        productSelection: { mode: "auto" },
        bidSettings: { mode: "auto" },
        keywordSettings: { mode: "all" },
        networkTargeting: { mode: "all" },
      });
      setAiSuggestedFields(new Set());
      setEditingAdGroupIndex(null);
      setAdGroupWizardOpen(false);
      setSettingsDrawerOpen(false);
      setActiveSettingsType(null);
    }
  }, [open, visibleSteps]);

  const updateCampaignData = (updates) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
  };

  const handleFieldChange = (field, value) => {
    updateCampaignData({ [field]: value });
    if (aiSuggestedFields.has(field)) {
      const newSet = new Set(aiSuggestedFields);
      newSet.delete(field);
      setAiSuggestedFields(newSet);
    }
  };

  const getObjectiveLabel = (objective) => {
    const objectives = {
      awareness: "Brand Awareness",
      traffic: "Website Traffic",
      conversions: "Conversions",
      sales: "Product Sales",
    };
    return objectives[objective] || objective;
  };

  const handleNext = () => {
    const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep);
    if (currentIndex < visibleSteps.length - 1) {
      setCurrentStep(visibleSteps[currentIndex + 1].id);
    } else {
      // Last step
      handleLaunch();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddAdGroup = (adGroup) => {
    if (editingAdGroupIndex !== null) {
      const updated = [...campaignData.adGroups];
      updated[editingAdGroupIndex] = adGroup;
      updateCampaignData({ adGroups: updated });
      setEditingAdGroupIndex(null);
    } else {
      updateCampaignData({ adGroups: [...campaignData.adGroups, adGroup] });
    }
    setAdGroupWizardOpen(false);
  };

  const handleEditAdGroup = (index) => {
    setEditingAdGroupIndex(index);
    setAdGroupWizardOpen(true);
  };

  const handleDeleteAdGroup = (index) => {
    const updated = campaignData.adGroups.filter((_, i) => i !== index);
    updateCampaignData({ adGroups: updated });
  };

  // Handle AdGroup Save and Edit for unified wizard
  const handleSaveAdGroup = (adGroup) => {
    if (editingAdGroupIndex !== null) {
      const updated = [...campaignData.adGroups];
      updated[editingAdGroupIndex] = adGroup;
      updateCampaignData({ adGroups: updated });
    } else {
      updateCampaignData({ adGroups: [...campaignData.adGroups, adGroup] });
    }
    setAdGroupWizardOpen(false);
    setEditingAdGroupIndex(null);
  };

  const handleEditAdGroupFromList = (adGroup) => {
    setEditingAdGroupIndex(
      campaignData.adGroups.findIndex((ag) => ag.id === adGroup.id),
    );
    setAdGroupWizardOpen(true);
  };

  const handleDeleteAdGroupFromList = (adGroupId) => {
    setCampaignData((prev) => ({
      ...prev,
      adGroups: prev.adGroups.filter((ag) => ag.id !== adGroupId),
    }));
  };

  const handleDuplicateAdGroup = (adGroup) => {
    const duplicated = {
      ...adGroup,
      id: `ag-${Date.now()}`,
      name: `${adGroup.name} (Copy)`,
    };
    setCampaignData((prev) => ({
      ...prev,
      adGroups: [...prev.adGroups, duplicated],
    }));
  };

  const handleLaunch = () => {
    if (mode === "add_ad_group") {
      // When adding ad groups to existing campaign, only send the ad groups
      console.log(
        "[v0] Saving ad groups to campaign:",
        selectedCampaign?.id,
        campaignData.adGroups,
      );
      onLaunch?.({
        campaignId: selectedCampaign?.id,
        adGroups: campaignData.adGroups,
        mode: "add_ad_group",
      });
    } else {
      // When creating new campaign, send full campaign data
      console.log("[v0] Launching campaign:", campaignData);
      onLaunch?.(campaignData);
    }
    onClose();
  };

  const openSettingsDrawer = (type) => {
    setActiveSettingsType(type);
    setSettingsDrawerOpen(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return campaignData.dailyBudget !== "" && campaignData.startDate !== "";
      case 2:
        return campaignData.adGroups.length > 0;
      case 3:
        return true;
      default:
        return true;
    }
  };

  if (!open) return null;

  const isProductAds = adType === "product";
  const isOffsiteAds = adType === "offsite";

  const renderAdGroupWizard = () => {
    if (isProductAds) {
      return (
        <ProductAdGroupWizard
          open={adGroupWizardOpen}
          onClose={() => {
            setAdGroupWizardOpen(false);
            setEditingAdGroupIndex(null);
          }}
          onSave={handleSaveAdGroup}
          editingAdGroup={
            editingAdGroupIndex !== null
              ? campaignData.adGroups[editingAdGroupIndex]
              : undefined
          }
        />
      );
    }
    // Render OffsiteAdGroupWizard for Offsite Ads campaign flow
    if (isOffsiteAds) {
      return (
        <OffsiteAdGroupWizard
          open={adGroupWizardOpen}
          onClose={() => {
            setAdGroupWizardOpen(false);
            setEditingAdGroupIndex(null);
          }}
          onSave={handleSaveAdGroup}
          editingAdGroup={
            editingAdGroupIndex !== null
              ? campaignData.adGroups[editingAdGroupIndex]
              : undefined
          }
        />
      );
    }
    return (
      <AdGroupWizard
        open={adGroupWizardOpen}
        onClose={() => {
          setAdGroupWizardOpen(false);
          setEditingAdGroupIndex(null);
        }}
        onSave={handleSaveAdGroup}
        editingAdGroup={
          editingAdGroupIndex !== null
            ? campaignData.adGroups[editingAdGroupIndex]
            : undefined
        }
      />
    );
  };

  const getAdGroupSummary = (adGroup) => {
    if (isProductAds) {
      return {
        icon: <Package size={14} />,
        details: [
          {
            label: "Products",
            value:
              adGroup.productSelection?.mode === "auto" ? "Auto" : "Manual",
          },
          {
            label: "Bidding",
            value: adGroup.bidSettings?.mode === "auto" ? "Auto" : "Manual",
          },
          {
            label: "Keywords",
            value: adGroup.keywordSettings?.mode === "all" ? "All" : "Manual",
          },
          {
            label: "Networks",
            value: adGroup.networkSettings?.mode === "all" ? "All" : "Manual",
          },
        ],
      };
    }
    // Fixed offsite ad group summary to use correct data structure
    if (isOffsiteAds) {
      return {
        icon: <Package size={14} />,
        details: [
          {
            label: "Platform",
            value: adGroup.platform
              ? adGroup.platform.charAt(0).toUpperCase() +
                adGroup.platform.slice(1)
              : "-",
          },
          {
            label: "Format",
            value: adGroup.adFormat
              ? adGroup.adFormat.charAt(0).toUpperCase() +
                adGroup.adFormat.slice(1)
              : "-",
          },
          {
            label: "Budget",
            value: adGroup.budget ? `$${adGroup.budget}/day` : "-",
          },
          {
            label: "Placements",
            value: adGroup.placements?.length
              ? adGroup.placements.length.toString()
              : "0",
          },
        ],
      };
    }
    return {
      icon: <Layers size={14} />,
      details: [
        { label: "Pages", value: adGroup.selectedPages.length.toString() },
        { label: "Format", value: adGroup.adFormat || "-" },
        { label: "Creatives", value: adGroup.creatives.length.toString() },
      ],
    };
  };

  // Render helper for the setup step
  const renderSetupStep = () => (
    <BudgetStep
      data={campaignData}
      updateData={updateCampaignData}
      onFieldChange={handleFieldChange}
      adType={adType}
    />
  );

  // Render helper for the ad groups step
  const renderAdGroupsStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#2d2d2d]">Ad Groups</h2>
          <p className="text-[#7b7b7b] mt-1">
            {isProductAds
              ? "Create ad groups to organize products, bidding, keywords, and network targeting"
              : isOffsiteAds
                ? "Create ad groups for your offsite campaigns, specifying targeting and creatives."
                : "Create ad groups to organize your ads by inventory, targeting, and creatives"}
          </p>
        </div>
        <Button
          onClick={() => setAdGroupWizardOpen(true)}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
        >
          <Plus size={16} className="mr-2" />
          Create Ad Group
        </Button>
      </div>

      {campaignData.adGroups.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#efefef] p-12 text-center">
          <div className="w-16 h-16 bg-[#f0f4ff] rounded-full flex items-center justify-center mx-auto mb-4">
            {isProductAds ? (
              <Package size={24} className="text-[#2563eb]" />
            ) : isOffsiteAds ? (
              <Package size={24} className="text-[#f59e0b]" />
            ) : (
              <Layers size={24} className="text-[#2563eb]" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-[#2d2d2d] mb-2">
            No Ad Groups Yet
          </h3>
          <p className="text-[#7b7b7b] mb-6 max-w-md mx-auto">
            {isProductAds
              ? "Ad groups let you organize your product campaigns with different product selections, bidding strategies, keywords, and network targeting."
              : isOffsiteAds
                ? "Ad groups allow you to define specific targeting and creatives for different segments of your offsite campaigns."
                : "Ad groups let you organize your campaign by different placements, targeting options, and creatives."}
          </p>
          <Button
            onClick={() => setAdGroupWizardOpen(true)}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            <Plus size={16} className="mr-2" />
            Create Your First Ad Group
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {campaignData.adGroups.map((adGroup) => {
            const summary = getAdGroupSummary(adGroup);
            return (
              <div
                key={adGroup.id}
                className="bg-white rounded-xl border border-[#efefef] p-5 hover:border-[#2563eb]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f0f4ff] rounded-lg flex items-center justify-center text-[#2563eb]">
                      {summary.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2d2d2d]">
                        {adGroup.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-[#7b7b7b]">
                        {summary.details.map((detail, idx) => (
                          <span key={idx}>
                            {detail.label}:{" "}
                            <span className="font-medium text-[#404040]">
                              {detail.value}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicateAdGroup(adGroup)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-[#7b7b7b] hover:bg-[#f5f5f5] transition-colors"
                      title="Duplicate"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => handleEditAdGroupFromList(adGroup)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-[#7b7b7b] hover:bg-[#f5f5f5] transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteAdGroupFromList(adGroup.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Render helper for the review step
  const renderReviewStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#2d2d2d]">
          Review & Launch
        </h2>
        <p className="text-[#7b7b7b] mt-1">
          Review your campaign settings before launching
        </p>
      </div>

      <div className="space-y-6">
        {/* Campaign Health Score and Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">
                Campaign Health
              </span>
              <Check size={18} />
            </div>
            <div className="text-3xl font-bold mb-1">Ready</div>
            <p className="text-xs opacity-80">All requirements met</p>
          </div>

          <div className="bg-white rounded-xl border border-[#efefef] p-5">
            <div className="text-sm text-[#7b7b7b] mb-1">Est. Daily Reach</div>
            <div className="text-2xl font-bold text-[#2d2d2d]">
              {campaignData.adGroups.length > 0
                ? `${(Number.parseFloat(campaignData.dailyBudget || "0") * 125).toLocaleString()}`
                : "-"}
            </div>
            <p className="text-xs text-[#10b981] mt-1">+12% vs average</p>
          </div>

          <div className="bg-white rounded-xl border border-[#efefef] p-5">
            <div className="text-sm text-[#7b7b7b] mb-1">Est. Impressions</div>
            <div className="text-2xl font-bold text-[#2d2d2d]">
              {campaignData.adGroups.length > 0
                ? `${(Number.parseFloat(campaignData.dailyBudget || "0") * 450).toLocaleString()}`
                : "-"}
            </div>
            <p className="text-xs text-[#7b7b7b] mt-1">Per day</p>
          </div>
        </div>

        {/* Campaign Overview */}
        <div className="bg-white rounded-xl border border-[#efefef] p-6">
          <h3 className="font-semibold text-[#2d2d2d] mb-4">
            Campaign Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-[#7b7b7b]">Campaign Name</Label>
              <p className="font-medium text-[#404040]">
                {campaignData.name || "-"}
              </p>
            </div>
            <div>
              <Label className="text-xs text-[#7b7b7b]">Objective</Label>
              <p className="font-medium text-[#404040]">
                {getObjectiveLabel(campaignData.objective)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-[#7b7b7b]">Daily Budget</Label>
              <p className="font-medium text-[#404040]">
                {campaignData.dailyBudget
                  ? `$${campaignData.dailyBudget}`
                  : "-"}
              </p>
            </div>
            <div>
              <Label className="text-xs text-[#7b7b7b]">Schedule</Label>
              <p className="font-medium text-[#404040]">
                {campaignData.startDate} -{" "}
                {campaignData.endDate || "No end date"}
              </p>
            </div>
            <div>
              <Label className="text-xs text-[#7b7b7b]">Bidding Strategy</Label>
              <p className="font-medium text-[#404040]">
                {campaignData.bidStrategy.toUpperCase()}
              </p>
            </div>
            <div>
              <Label className="text-xs text-[#7b7b7b]">Pacing</Label>
              <p className="font-medium text-[#404040]">
                {campaignData.pacing === "even"
                  ? "Standard (Even)"
                  : "Accelerated"}
              </p>
            </div>
          </div>
        </div>

        {/* Ad Groups Summary - Enhanced */}
        <div className="bg-white rounded-xl border border-[#efefef] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#2d2d2d]">
              Ad Groups ({campaignData.adGroups.length})
            </h3>
            <span className="text-sm text-[#7b7b7b]">
              ${campaignData.dailyBudget || "0"} daily budget
            </span>
          </div>
          <div className="space-y-3">
            {campaignData.adGroups.map((adGroup, index) => {
              const summary = getAdGroupSummary(adGroup);
              // Enhanced ad group cards with more details
              return (
                <div
                  key={adGroup.id}
                  className="p-4 bg-[#f8f9fa] rounded-lg border border-[#efefef]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f0f4ff] rounded-lg flex items-center justify-center text-[#2563eb]">
                        {summary.icon}
                      </div>
                      <div>
                        <span className="font-medium text-[#404040]">
                          {adGroup.name}
                        </span>
                        {isOffsiteAds && adGroup.platform && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] rounded">
                            {adGroup.platform.charAt(0).toUpperCase() +
                              adGroup.platform.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#7b7b7b]">
                      Est. $
                      {(
                        Number.parseFloat(campaignData.dailyBudget || "0") /
                        campaignData.adGroups.length
                      ).toFixed(0)}
                      /day
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {summary.details.map((detail, idx) => (
                      <div key={idx}>
                        <span className="text-[#7b7b7b] text-xs">
                          {detail.label}
                        </span>
                        <p className="font-medium text-[#404040]">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {isOffsiteAds &&
                    adGroup.placements &&
                    adGroup.placements.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#e5e7eb]">
                        <div className="flex items-center gap-2 text-xs text-[#7b7b7b]">
                          <span>Placements:</span>
                          <div className="flex flex-wrap gap-1">
                            {adGroup.placements.slice(0, 3).map((placement) => (
                              <span
                                key={placement}
                                className="px-2 py-0.5 bg-white rounded text-[#404040]"
                              >
                                {placement
                                  .replace(/_/g, " ")
                                  .split(" ")
                                  .map(
                                    (w) =>
                                      w.charAt(0).toUpperCase() + w.slice(1),
                                  )
                                  .join(" ")}
                              </span>
                            ))}
                            {adGroup.placements.length > 3 && (
                              <span className="px-2 py-0.5 text-[#7b7b7b]">
                                +{adGroup.placements.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  {!isOffsiteAds &&
                    adGroup.creatives &&
                    adGroup.creatives.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#e5e7eb]">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#7b7b7b]">Creatives:</span>
                          <span className="font-medium text-[#404040]">
                            {adGroup.creatives.length}{" "}
                            {adGroup.creatives.length === 1
                              ? "variant"
                              : "variants"}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {campaignData.adGroups.length > 0 && (
        <div className="bg-[#f0f9ff] rounded-xl border border-[#0097f0]/20 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0097f0] flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#0369a1] mb-2">
                Optimization Tips
              </p>
              <ul className="space-y-1.5 text-sm text-[#0c4ae6]">
                {campaignData.pacing === "even" && (
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" />
                    <span>
                      Even pacing will distribute your budget throughout the day
                      for consistent delivery
                    </span>
                  </li>
                )}
                {campaignData.adGroups.length === 1 && (
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-0.5 shrink-0">💡</span>
                    <span>
                      Consider creating multiple ad groups to test different{" "}
                      {isOffsiteAds
                        ? "platforms and targeting"
                        : "placements and creatives"}
                    </span>
                  </li>
                )}
                {Number.parseFloat(campaignData.dailyBudget || "0") > 0 && (
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" />
                    <span>
                      Your budget is estimated to reach{" "}
                      {(
                        Number.parseFloat(campaignData.dailyBudget || "0") * 125
                      ).toLocaleString()}{" "}
                      users daily
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFooter = () => {
    // In add_ad_group mode, we only show the ad groups step, so button behavior is simpler
    if (mode === "add_ad_group") {
      return (
        <div className="bg-white border-t border-[#efefef] px-8 py-4 flex items-center justify-between shrink-0">
          <div className="text-sm text-[#7b7b7b]">
            {campaignData.adGroups.length === 0 && (
              <span className="text-[#f59e0b]">
                Create at least one ad group to continue
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="px-6 border-[#efefef] text-[#7b7b7b] hover:bg-[#f5f5f5] bg-transparent"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="px-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50"
              onClick={handleLaunch}
              disabled={campaignData.adGroups.length === 0}
            >
              Save Ad Groups
            </Button>
          </div>
        </div>
      );
    }

    // Original footer for create_campaign mode
    return (
      <div className="bg-white border-t border-[#efefef] px-8 py-4 flex items-center justify-between shrink-0">
        <div className="text-sm text-[#7b7b7b]">
          {currentStep === 2 && campaignData.adGroups.length === 0 && (
            <span className="text-[#f59e0b]">
              Create at least one ad group to continue
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="px-6 border-[#efefef] text-[#7b7b7b] hover:bg-[#f5f5f5] bg-transparent"
            onClick={currentStep === 1 ? onClose : handleBack}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            className="px-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50"
            onClick={currentStep === 3 ? handleLaunch : handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 3 ? "Launch Campaign" : "Continue"}
          </Button>
        </div>
      </div>
    );
  };

  const wizardContent = (
    <div className="fixed inset-0 z-[100] bg-white flex h-screen overflow-hidden">
      <div className="relative flex w-full h-full overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 bg-[#f8f9fa] border-r border-[#efefef] flex flex-col shrink-0 h-full overflow-hidden">
          <div className="p-6 border-b border-[#efefef] shrink-0">
            <h2 className="font-semibold text-[#404040] truncate">
              {mode === "add_ad_group"
                ? selectedCampaign?.name || "Select Campaign"
                : campaignData.name || "New Campaign"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-[#9a9a9a]">
                {mode === "add_ad_group"
                  ? "Adding Ad Groups"
                  : getObjectiveLabel(campaignData.objective)}
              </p>
              {initialData?.template === "ai" && mode === "create_campaign" && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-[#7c3aed] text-white rounded-full flex items-center gap-1">
                  <Sparkles size={10} />
                  AI Setup
                </span>
              )}
              <span
                className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${isProductAds ? "bg-[#059669] text-white" : isOffsiteAds ? "bg-[#f59e0b] text-white" : "bg-[#2563eb] text-white"}`}
              >
                {isProductAds
                  ? "Product Ads"
                  : isOffsiteAds
                    ? "Offsite Ads"
                    : "Display Ads"}
              </span>
            </div>
          </div>

          {/* Steps Navigation - only show in create_campaign mode */}
          {mode === "create_campaign" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {visibleSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    disabled={step.id > currentStep}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? "bg-white border border-[#2563eb]/20"
                        : step.id < currentStep
                          ? "hover:bg-white/50 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step.id
                          ? "bg-[#2563eb] text-white"
                          : step.id < currentStep
                            ? "bg-[#16a34a] text-white"
                            : "bg-[#e5e7eb] text-[#9a9a9a]"
                      }`}
                    >
                      {step.id < currentStep ? <Check size={16} /> : step.id}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${currentStep === step.id ? "text-[#2563eb]" : step.id < currentStep ? "text-[#404040]" : "text-[#9a9a9a]"}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-[#9a9a9a]">
                        {step.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Campaign Summary */}
              <div className="mt-6 pt-4 border-t border-[#efefef]">
                <h4 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider mb-3">
                  Campaign Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7b7b7b]">Daily Budget</span>
                    <span className="font-medium text-[#404040]">
                      {campaignData.dailyBudget
                        ? `$${campaignData.dailyBudget}`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7b7b7b]">Start Date</span>
                    <span className="font-medium text-[#404040]">
                      {campaignData.startDate || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7b7b7b]">Ad Groups</span>
                    <span className="font-medium text-[#404040]">
                      {campaignData.adGroups.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "add_ad_group" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider mb-2">
                    Campaign Info
                  </h4>
                  <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7b7b7b]">Ad Type</span>
                      <span className="font-medium text-[#404040] capitalize">
                        {selectedCampaign?.adType || adType}
                      </span>
                    </div>
                    {selectedCampaign?.objective && (
                      <div className="flex justify-between">
                        <span className="text-[#7b7b7b]">Objective</span>
                        <span className="font-medium text-[#404040]">
                          {getObjectiveLabel(selectedCampaign.objective)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider mb-2">
                    New Ad Groups
                  </h4>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#2563eb]">
                      {campaignData.adGroups.length}
                    </div>
                    <p className="text-xs text-[#7b7b7b] mt-1">
                      {campaignData.adGroups.length === 0
                        ? "No ad groups created yet"
                        : `${campaignData.adGroups.length} ad group${campaignData.adGroups.length > 1 ? "s" : ""} ready to save`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-[#efefef] overflow-x-auto">
            <div className="flex items-center gap-8 min-w-min">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                  <Layers size={16} className="text-[#7b7b7b]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#404040]">
                    {mode === "add_ad_group"
                      ? `Add Ad Groups to ${selectedCampaign?.name}`
                      : "Create Campaign"}
                  </h2>
                  <p className="text-sm text-[#7b7b7b] mt-0.5">
                    {mode === "add_ad_group"
                      ? "Create and configure new ad groups for this campaign"
                      : "Set up a new campaign with ad groups"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {mode === "add_ad_group"
              ? renderAdGroupsStep()
              : currentStep === 1
                ? renderSetupStep()
                : currentStep === 2
                  ? renderAdGroupsStep()
                  : renderReviewStep()}
          </div>

          {/* Footer */}
          {renderFooter()}
        </div>
      </div>

      {/* Ad Group Wizard */}
      {renderAdGroupWizard()}

      {/* Product Ad Settings Drawer */}
      <ProductAdSettingsDrawer
        open={settingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
        type={activeSettingsType}
        data={campaignData}
        updateData={updateCampaignData}
      />
    </div>
  );

  if (typeof window !== "undefined") {
    return createPortal(wizardContent, document.body);
  }

  return wizardContent;
}

function CampaignSetupStep({
  data,
  updateData,
  aiSuggestedFields,
  onFieldChange,
  aiReasoning,
}) {
  const getObjectiveLabel = (objective) => {
    const labels = {
      awareness: "Brand Awareness",
      traffic: "Website Traffic",
      conversions: "Conversions",
    };
    return labels[objective] || objective;
  };

  const isAiSuggested = (field) => aiSuggestedFields?.has(field);

  const AiBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-[#7c3aed]/10 text-[#7c3aed] rounded-full ml-2">
      <Sparkles size={10} />
      AI Recommended
    </span>
  );

  return (
    <div className="max-w-4xl space-y-8">
      {aiReasoning && (
        <div className="bg-gradient-to-r from-[#7c3aed]/5 to-[#0097f0]/5 rounded-lg p-4 border border-[#7c3aed]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#7c3aed] mb-1">
                AI Recommendation Summary
              </p>
              <p className="text-sm text-[#64748b]">{aiReasoning}</p>
              <p className="text-xs text-[#9a9a9a] mt-2">
                Fields with the AI badge are pre-filled based on your inputs.
                Feel free to modify them.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#f8f9fa] rounded-lg p-4 border border-[#efefef]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#9a9a9a] uppercase tracking-wide">
              Campaign
            </p>
            <p className="text-lg font-semibold text-[#404040] mt-1">
              {data.name}
            </p>
          </div>
          <div className="px-3 py-1.5 bg-[#e8f4fd] text-[#0097f0] text-sm font-medium rounded-full">
            {getObjectiveLabel(data.objective)}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-[#efefef] p-6">
        <h3 className="text-base font-semibold text-[#404040] mb-4">
          Schedule
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b]">
              Start Date <span className="text-[#d83c3b]">*</span>
            </Label>
            <Input
              type="date"
              value={data.startDate}
              onChange={(e) =>
                onFieldChange?.("startDate", e.target.value) ||
                updateData({ startDate: e.target.value })
              }
              className="border-[#dedede]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b]">
              End Date (Optional)
            </Label>
            <Input
              type="date"
              value={data.endDate}
              onChange={(e) =>
                onFieldChange?.("endDate", e.target.value) ||
                updateData({ endDate: e.target.value })
              }
              className="border-[#dedede]"
            />
          </div>
        </div>
        <p className="text-xs text-[#9a9a9a] mt-2">
          * Date will be set in the Asia/Kolkata timezone
        </p>
      </div>
      <div className="bg-white rounded-lg border border-[#efefef] p-6">
        <h3 className="text-base font-semibold text-[#404040] mb-4">Budget</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b] flex items-center">
              Total Budget ($) <span className="text-[#d83c3b]">*</span>
              {isAiSuggested("totalBudget") && <AiBadge />}
            </Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={data.totalBudget}
              onChange={(e) =>
                onFieldChange?.("totalBudget", e.target.value) ||
                updateData({ totalBudget: e.target.value })
              }
              className={`border-[#dedede] ${isAiSuggested("totalBudget") ? "ring-2 ring-[#7c3aed]/20" : ""}`}
            />

            <p className="text-xs text-[#9a9a9a]">
              Minimum budget should be $10
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b] flex items-center">
              Daily Budget ($) <span className="text-[#d83c3b]">*</span>
              {isAiSuggested("dailyBudget") && <AiBadge />}
            </Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={data.dailyBudget}
              onChange={(e) =>
                onFieldChange?.("dailyBudget", e.target.value) ||
                updateData({ dailyBudget: e.target.value })
              }
              className={`border-[#dedede] ${isAiSuggested("dailyBudget") ? "ring-2 ring-[#7c3aed]/20" : ""}`}
            />

            <p className="text-xs text-[#9a9a9a]">
              Minimum budget should be $10
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b]">
              Choose Wallet <span className="text-[#d83c3b]">*</span>
            </Label>
            <Select
              value={data.wallet}
              onValueChange={(v) => updateData({ wallet: v })}
            >
              <SelectTrigger className="border-[#dedede]">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                <SelectItem value="default">Default wallet</SelectItem>
                <SelectItem value="marketing">Marketing wallet</SelectItem>
                <SelectItem value="promo">Promotional wallet</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-[#9a9a9a]">
              Wallet Balance: $5,850,489.59
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-[#efefef] p-6">
        <h3 className="text-base font-semibold text-[#404040] mb-4">
          Bidding Strategy
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b] flex items-center">
              Buying Type <span className="text-[#d83c3b]">*</span>
              {isAiSuggested("biddingStrategy") && <AiBadge />}
            </Label>
            <Select
              value={data.bidStrategy}
              onValueChange={(v) =>
                onFieldChange?.("bidStrategy", v) ||
                updateData({ bidStrategy: v })
              }
            >
              <SelectTrigger
                className={`border-[#dedede] ${isAiSuggested("biddingStrategy") ? "ring-2 ring-[#7c3aed]/20" : ""}`}
              >
                <SelectValue placeholder="Choose strategy" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                <SelectItem value="cpm">CPM (Cost per Mille)</SelectItem>
                <SelectItem value="cpc">CPC (Cost per Click)</SelectItem>
                <SelectItem value="cpa">CPA (Cost per Action)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b] flex items-center">
              Priority Level
              {isAiSuggested("priority") && <AiBadge />}
            </Label>
            <Select
              value={data.priority}
              onValueChange={(v) =>
                onFieldChange?.("priority", v) || updateData({ priority: v })
              }
            >
              <SelectTrigger
                className={`border-[#dedede] ${isAiSuggested("priority") ? "ring-2 ring-[#7c3aed]/20" : ""}`}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                <SelectItem value="guaranteed">Guaranteed</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#7b7b7b] flex items-center">
              Pacing
              {isAiSuggested("pacing") && <AiBadge />}
            </Label>
            <Select
              value={data.pacing}
              onValueChange={(v) =>
                onFieldChange?.("pacing", v) || updateData({ pacing: v })
              }
            >
              <SelectTrigger
                className={`border-[#dedede] ${isAiSuggested("pacing") ? "ring-2 ring-[#7c3aed]/20" : ""}`}
              >
                <SelectValue placeholder="Select pacing" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="accelerated">Accelerated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ data }) {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#404040]">
          Review & Launch
        </h2>
        <p className="text-sm text-[#7b7b7b] mt-1">
          Review your campaign settings before launching.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-[#efefef] p-6 space-y-4">
        <h3 className="font-semibold text-[#404040]">Campaign Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[#9a9a9a]">Name:</span>
            <span className="ml-2 text-[#404040]">{data.name}</span>
          </div>
          <div>
            <span className="text-[#9a9a9a]">Budget:</span>
            <span className="ml-2 text-[#404040]">
              ${Number(data.totalBudget).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[#9a9a9a]">Daily Budget:</span>
            <span className="ml-2 text-[#404040]">
              ${Number(data.dailyBudget).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[#9a9a9a]">Bidding:</span>
            <span className="ml-2 text-[#404040] uppercase">
              {data.bidStrategy}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#efefef] p-6 space-y-4">
        <h3 className="font-semibold text-[#404040]">
          Ad Groups ({data.adGroups.length})
        </h3>
        {data.adGroups.length === 0 ? (
          <p className="text-sm text-[#9a9a9a]">No ad groups created yet.</p>
        ) : (
          <div className="space-y-2">
            {data.adGroups.map((ag) => (
              <div
                key={ag.id}
                className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg"
              >
                <span className="text-sm text-[#404040]">{ag.name}</span>
                <span className="text-xs text-[#9a9a9a]">
                  {ag.selectedPages.length} pages selected
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
