import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon, Button, Input, Select } from "../../../ui";
import { AdGroupWizard } from "./ad-group-wizard";
import { ProductAdSettingsDrawer } from "./product-ad-settings-drawer";
import { BudgetStep } from "./steps/budget-step";
import { ProductAdGroupWizard } from "./product-ad-group-wizard";
import { OffsiteAdGroupWizard } from "./offsite-ad-group-wizard";

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const AMBER    = 'var(--osmos-brand-amber)';
const VI       = 'var(--osmos-brand-violet)';
const VI_BG    = 'var(--osmos-brand-violet-muted)';

// ── Hand-rolled icon atoms ────────────────────────────────────────────────────
const CheckIcon = (props) => (
  <Icon {...props}><polyline points="20 6 9 17 4 12" /></Icon>
);

const PlusIcon = (props) => (
  <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>
);

const EditIcon = (props) => (
  <Icon {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" /></Icon>
);

const TrashIcon = (props) => (
  <Icon {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></Icon>
);

const CopyIcon = (props) => (
  <Icon {...props}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Icon>
);

const SparklesIcon = (props) => (
  <Icon {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" /></Icon>
);

const PackageIcon = (props) => (
  <Icon {...props}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </Icon>
);

// ── Step config ───────────────────────────────────────────────────────────────
const campaignSteps = [
  { id: 1, title: "Campaign Setup", description: "Budget & schedule" },
  { id: 2, title: "Ad Groups",      description: "Create ad groups" },
  { id: 3, title: "Review & Launch", description: "Review and publish" },
];

// ── IconButton helper (hover state) ──────────────────────────────────────────
function IconBtn({ onClick, title, hoverBg = BG_SUB, color = TEXT_MID, dangerHover = false, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8,
        border: 'none',
        background: hov ? (dangerHover ? '#fef2f2' : hoverBg) : 'transparent',
        color: dangerHover ? (hov ? '#ef4444' : '#ef4444') : color,
        cursor: 'pointer',
        transition: 'all 0.15s',
        padding: 0,
        fontFamily: FONT,
      }}
    >
      {children}
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
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

  const [currentStep, setCurrentStep]               = useState(visibleSteps[0].id);
  const [adGroupWizardOpen, setAdGroupWizardOpen]   = useState(false);
  const [editingAdGroupIndex, setEditingAdGroupIndex] = useState(null);
  const [aiSuggestedFields, setAiSuggestedFields]   = useState(new Set());

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
        updates.totalBudget  = suggestions.budget.replace(/[$,]/g, "");
        updates.dailyBudget  = suggestions.dailyBudget.replace(/[$,]/g, "");
        updates.bidStrategy  = suggestions.bidStrategy.toLowerCase();
        updates.priority     = suggestions.priority.toLowerCase();
        updates.pacing       = suggestions.pacing.toLowerCase();

        setAiSuggestedFields(
          new Set(["totalBudget", "dailyBudget", "biddingStrategy", "priority", "pacing"]),
        );
      }

      if (initialData.copiedFromId) {
        updates.totalBudget = "300000";
        updates.dailyBudget = "10000";
        updates.bidStrategy = "cpm";
        updates.priority    = "guaranteed";
        updates.pacing      = "standard";
      }

      setCampaignData((prev) => ({ ...prev, ...updates }));
    }
  }, [initialData]);

  useEffect(() => {
    if (!open) {
      setCurrentStep(visibleSteps[0].id);
      setCampaignData({
        name: "", objective: "", type: "standard", priority: "medium",
        wallet: "", totalBudget: "", dailyBudget: "", startDate: "",
        endDate: "", bidStrategy: "cpm", pacing: "even", adGroups: [],
        flexiBudget: false, maxSpendCap: "",
        productSelection: { mode: "auto" }, bidSettings: { mode: "auto" },
        keywordSettings: { mode: "all" }, networkTargeting: { mode: "all" },
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
      awareness:   "Brand Awareness",
      traffic:     "Website Traffic",
      conversions: "Conversions",
      sales:       "Product Sales",
    };
    return objectives[objective] || objective;
  };

  const handleNext = () => {
    const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep);
    if (currentIndex < visibleSteps.length - 1) {
      setCurrentStep(visibleSteps[currentIndex + 1].id);
    } else {
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
      case 1:  return campaignData.dailyBudget !== "" && campaignData.startDate !== "";
      case 2:  return campaignData.adGroups.length > 0;
      case 3:  return true;
      default: return true;
    }
  };

  if (!open) return null;

  const isProductAds  = adType === "product";
  const isOffsiteAds  = adType === "offsite";

  // ── Ad Group Wizard renderer ────────────────────────────────────────────────
  const renderAdGroupWizard = () => {
    const commonProps = {
      open: adGroupWizardOpen,
      onClose: () => { setAdGroupWizardOpen(false); setEditingAdGroupIndex(null); },
      onSave: handleSaveAdGroup,
      editingAdGroup:
        editingAdGroupIndex !== null
          ? campaignData.adGroups[editingAdGroupIndex]
          : undefined,
    };
    if (isProductAds)  return <ProductAdGroupWizard {...commonProps} />;
    if (isOffsiteAds)  return <OffsiteAdGroupWizard {...commonProps} />;
    return <AdGroupWizard {...commonProps} />;
  };

  // ── Ad group summary builder ────────────────────────────────────────────────
  const getAdGroupSummary = (adGroup) => {
    if (isProductAds) {
      return {
        icon: <PackageIcon size={14} />,
        details: [
          { label: "Products",  value: adGroup.productSelection?.mode === "auto" ? "Auto" : "Manual" },
          { label: "Bidding",   value: adGroup.bidSettings?.mode === "auto" ? "Auto" : "Manual" },
          { label: "Keywords",  value: adGroup.keywordSettings?.mode === "all" ? "All" : "Manual" },
          { label: "Networks",  value: adGroup.networkSettings?.mode === "all" ? "All" : "Manual" },
        ],
      };
    }
    if (isOffsiteAds) {
      return {
        icon: <PackageIcon size={14} />,
        details: [
          { label: "Platform",   value: adGroup.platform ? adGroup.platform.charAt(0).toUpperCase() + adGroup.platform.slice(1) : "-" },
          { label: "Format",     value: adGroup.adFormat ? adGroup.adFormat.charAt(0).toUpperCase() + adGroup.adFormat.slice(1) : "-" },
          { label: "Budget",     value: adGroup.budget ? `$${adGroup.budget}/day` : "-" },
          { label: "Placements", value: adGroup.placements?.length ? adGroup.placements.length.toString() : "0" },
        ],
      };
    }
    return {
      icon: <LayersIcon size={14} />,
      details: [
        { label: "Pages",     value: adGroup.selectedPages.length.toString() },
        { label: "Format",    value: adGroup.adFormat || "-" },
        { label: "Creatives", value: adGroup.creatives.length.toString() },
      ],
    };
  };

  // ── Step renderers ──────────────────────────────────────────────────────────
  const renderSetupStep = () => (
    <BudgetStep
      data={campaignData}
      updateData={updateCampaignData}
      onFieldChange={handleFieldChange}
      adType={adType}
    />
  );

  const renderAdGroupsStep = () => {
    const adGroupTypeColor = isProductAds ? '#059669' : isOffsiteAds ? '#f59e0b' : ACCENT;

    return (
      <div style={{ maxWidth: 896, margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, color: '#2d2d2d', margin: 0, fontFamily: FONT }}>
              Ad Groups
            </h2>
            <p style={{ color: TEXT_MID, marginTop: 4, marginBottom: 0, fontFamily: FONT }}>
              {isProductAds
                ? "Create ad groups to organize products, bidding, keywords, and network targeting"
                : isOffsiteAds
                  ? "Create ad groups for your offsite campaigns, specifying targeting and creatives."
                  : "Create ad groups to organize your ads by inventory, targeting, and creatives"}
            </p>
          </div>
          <Button variant="primary" onClick={() => setAdGroupWizardOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PlusIcon size={16} />
            Create Ad Group
          </Button>
        </div>

        {campaignData.adGroups.length === 0 ? (
          <div style={{
            background: BG, borderRadius: 12, border: `1px solid ${BORDER}`,
            padding: 48, textAlign: 'center',
          }}>
            <div style={{
              width: 64, height: 64, background: '#f0f4ff', borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              {isProductAds
                ? <PackageIcon size={24} style={{ color: ACCENT }} />
                : isOffsiteAds
                  ? <PackageIcon size={24} style={{ color: '#f59e0b' }} />
                  : <LayersIcon  size={24} style={{ color: ACCENT }} />
              }
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2d2d2d', marginBottom: 8, fontFamily: FONT }}>
              No Ad Groups Yet
            </h3>
            <p style={{ color: TEXT_MID, marginBottom: 24, maxWidth: 448, marginLeft: 'auto', marginRight: 'auto', fontFamily: FONT }}>
              {isProductAds
                ? "Ad groups let you organize your product campaigns with different product selections, bidding strategies, keywords, and network targeting."
                : isOffsiteAds
                  ? "Ad groups allow you to define specific targeting and creatives for different segments of your offsite campaigns."
                  : "Ad groups let you organize your campaign by different placements, targeting options, and creatives."}
            </p>
            <Button variant="primary" onClick={() => setAdGroupWizardOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <PlusIcon size={16} />
              Create Your First Ad Group
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {campaignData.adGroups.map((adGroup) => {
              const summary = getAdGroupSummary(adGroup);
              return (
                <AdGroupCard
                  key={adGroup.id}
                  adGroup={adGroup}
                  summary={summary}
                  onDuplicate={() => handleDuplicateAdGroup(adGroup)}
                  onEdit={() => handleEditAdGroupFromList(adGroup)}
                  onDelete={() => handleDeleteAdGroupFromList(adGroup.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderReviewStep = () => (
    <div style={{ maxWidth: 896, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#2d2d2d', margin: 0, fontFamily: FONT }}>
          Review &amp; Launch
        </h2>
        <p style={{ color: TEXT_MID, marginTop: 4, marginBottom: 0, fontFamily: FONT }}>
          Review your campaign settings before launching
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Health / metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {/* Health card */}
          <div style={{
            background: 'linear-gradient(135deg,#10b981,#059669)',
            borderRadius: 12, padding: 20, color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.9, fontFamily: FONT }}>Campaign Health</span>
              <CheckIcon size={18} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, fontFamily: FONT }}>Ready</div>
            <p style={{ fontSize: 12, opacity: 0.8, margin: 0, fontFamily: FONT }}>All requirements met</p>
          </div>

          {/* Reach card */}
          <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_MID, marginBottom: 4, fontFamily: FONT }}>Est. Daily Reach</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2d2d2d', fontFamily: FONT }}>
              {campaignData.adGroups.length > 0
                ? `${(Number.parseFloat(campaignData.dailyBudget || "0") * 125).toLocaleString()}`
                : "-"}
            </div>
            <p style={{ fontSize: 12, color: GREEN, marginTop: 4, marginBottom: 0, fontFamily: FONT }}>+12% vs average</p>
          </div>

          {/* Impressions card */}
          <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_MID, marginBottom: 4, fontFamily: FONT }}>Est. Impressions</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2d2d2d', fontFamily: FONT }}>
              {campaignData.adGroups.length > 0
                ? `${(Number.parseFloat(campaignData.dailyBudget || "0") * 450).toLocaleString()}`
                : "-"}
            </div>
            <p style={{ fontSize: 12, color: TEXT_MID, marginTop: 4, marginBottom: 0, fontFamily: FONT }}>Per day</p>
          </div>
        </div>

        {/* Campaign overview */}
        <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
          <h3 style={{ fontWeight: 600, color: '#2d2d2d', marginBottom: 16, fontFamily: FONT, margin: '0 0 16px' }}>
            Campaign Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {[
              { label: "Campaign Name",    value: campaignData.name || "-" },
              { label: "Objective",        value: getObjectiveLabel(campaignData.objective) },
              { label: "Daily Budget",     value: campaignData.dailyBudget ? `$${campaignData.dailyBudget}` : "-" },
              { label: "Schedule",         value: `${campaignData.startDate} - ${campaignData.endDate || "No end date"}` },
              { label: "Bidding Strategy", value: campaignData.bidStrategy.toUpperCase() },
              { label: "Pacing",           value: campaignData.pacing === "even" ? "Standard (Even)" : "Accelerated" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label style={{ fontSize: 12, color: TEXT_MID, fontFamily: FONT, display: 'block', marginBottom: 2 }}>{label}</label>
                <p style={{ fontWeight: 500, color: TEXT, margin: 0, fontFamily: FONT }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad groups summary */}
        <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 600, color: '#2d2d2d', margin: 0, fontFamily: FONT }}>
              Ad Groups ({campaignData.adGroups.length})
            </h3>
            <span style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
              ${campaignData.dailyBudget || "0"} daily budget
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {campaignData.adGroups.map((adGroup) => {
              const summary = getAdGroupSummary(adGroup);
              return (
                <div key={adGroup.id} style={{
                  padding: 16, background: BG_SUB, borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, background: '#f0f4ff', borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT,
                      }}>
                        {summary.icon}
                      </div>
                      <div>
                        <span style={{ fontWeight: 500, color: TEXT, fontFamily: FONT }}>{adGroup.name}</span>
                        {isOffsiteAds && adGroup.platform && (
                          <span style={{
                            marginLeft: 8, padding: '2px 8px', fontSize: 12, fontWeight: 500,
                            background: 'rgba(245,158,11,0.1)', color: '#f59e0b', borderRadius: 4,
                            fontFamily: FONT,
                          }}>
                            {adGroup.platform.charAt(0).toUpperCase() + adGroup.platform.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: TEXT_MID, fontFamily: FONT }}>
                      Est. ${(Number.parseFloat(campaignData.dailyBudget || "0") / campaignData.adGroups.length).toFixed(0)}/day
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, fontSize: 13 }}>
                    {summary.details.map((detail, idx) => (
                      <div key={idx}>
                        <span style={{ color: TEXT_MID, fontSize: 12, fontFamily: FONT }}>{detail.label}</span>
                        <p style={{ fontWeight: 500, color: TEXT, margin: '2px 0 0', fontFamily: FONT }}>{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  {isOffsiteAds && adGroup.placements && adGroup.placements.length > 0 && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid #e5e7eb` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: TEXT_MID, flexWrap: 'wrap', fontFamily: FONT }}>
                        <span>Placements:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {adGroup.placements.slice(0, 3).map((placement) => (
                            <span key={placement} style={{
                              padding: '2px 8px', background: BG, borderRadius: 4, color: TEXT, fontFamily: FONT,
                            }}>
                              {placement.replace(/_/g, " ").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                            </span>
                          ))}
                          {adGroup.placements.length > 3 && (
                            <span style={{ padding: '2px 8px', color: TEXT_MID, fontFamily: FONT }}>
                              +{adGroup.placements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {!isOffsiteAds && adGroup.creatives && adGroup.creatives.length > 0 && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid #e5e7eb` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: FONT }}>
                        <span style={{ color: TEXT_MID }}>Creatives:</span>
                        <span style={{ fontWeight: 500, color: TEXT }}>
                          {adGroup.creatives.length} {adGroup.creatives.length === 1 ? "variant" : "variants"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Optimization tips */}
        {campaignData.adGroups.length > 0 && (
          <div style={{
            background: ACCENT_M, borderRadius: 12,
            border: `1px solid rgba(0,151,240,0.2)`, padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999, background: ACCENT,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <SparklesIcon size={16} style={{ color: '#fff' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#0369a1', marginBottom: 8, marginTop: 0, fontFamily: FONT }}>
                  Optimization Tips
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {campaignData.pacing === "even" && (
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#0c4ae6', fontFamily: FONT }}>
                      <CheckIcon size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>Even pacing will distribute your budget throughout the day for consistent delivery</span>
                    </li>
                  )}
                  {campaignData.adGroups.length === 1 && (
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#0c4ae6', fontFamily: FONT }}>
                      <span style={{ color: AMBER, marginTop: 2, flexShrink: 0 }}>💡</span>
                      <span>
                        Consider creating multiple ad groups to test different{" "}
                        {isOffsiteAds ? "platforms and targeting" : "placements and creatives"}
                      </span>
                    </li>
                  )}
                  {Number.parseFloat(campaignData.dailyBudget || "0") > 0 && (
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#0c4ae6', fontFamily: FONT }}>
                      <CheckIcon size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>
                        Your budget is estimated to reach{" "}
                        {(Number.parseFloat(campaignData.dailyBudget || "0") * 125).toLocaleString()} users daily
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── Footer renderer ─────────────────────────────────────────────────────────
  const renderFooter = () => {
    const footerStyle = {
      background: BG, borderTop: `1px solid ${BORDER}`,
      padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    };

    if (mode === "add_ad_group") {
      return (
        <div style={footerStyle}>
          <div style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
            {campaignData.adGroups.length === 0 && (
              <span style={{ color: AMBER }}>Create at least one ad group to continue</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button variant="outline" onClick={onClose} style={{ padding: '0 24px' }}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleLaunch}
              disabled={campaignData.adGroups.length === 0}
              style={{ padding: '0 32px', opacity: campaignData.adGroups.length === 0 ? 0.5 : 1 }}
            >
              Save Ad Groups
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div style={footerStyle}>
        <div style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
          {currentStep === 2 && campaignData.adGroups.length === 0 && (
            <span style={{ color: AMBER }}>Create at least one ad group to continue</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
            style={{ padding: '0 24px' }}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            variant="primary"
            onClick={currentStep === 3 ? handleLaunch : handleNext}
            disabled={!canProceed()}
            style={{ padding: '0 32px', opacity: canProceed() ? 1 : 0.5 }}
          >
            {currentStep === 3 ? "Launch Campaign" : "Continue"}
          </Button>
        </div>
      </div>
    );
  };

  // ── Wizard shell ────────────────────────────────────────────────────────────
  const wizardContent = (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: BG, display: 'flex', height: '100vh', overflow: 'hidden',
      fontFamily: FONT,
    }}>
      <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>

        {/* ── Left Sidebar ── */}
        <div style={{
          width: 288, background: BG_SUB, borderRight: `1px solid ${BORDER}`,
          display: 'flex', flexDirection: 'column', flexShrink: 0,
          height: '100%', overflow: 'hidden',
        }}>
          {/* Sidebar header */}
          <div style={{ padding: 24, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <h2 style={{
              fontWeight: 600, color: TEXT, margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              fontFamily: FONT,
            }}>
              {mode === "add_ad_group"
                ? selectedCampaign?.name || "Select Campaign"
                : campaignData.name || "New Campaign"}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 12, color: '#9a9a9a', margin: 0, fontFamily: FONT }}>
                {mode === "add_ad_group"
                  ? "Adding Ad Groups"
                  : getObjectiveLabel(campaignData.objective)}
              </p>
              {initialData?.template === "ai" && mode === "create_campaign" && (
                <span style={{
                  padding: '2px 8px', fontSize: 10, fontWeight: 500,
                  background: VI, color: '#fff', borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontFamily: FONT,
                }}>
                  <SparklesIcon size={10} />
                  AI Setup
                </span>
              )}
              <span style={{
                padding: '2px 8px', fontSize: 10, fontWeight: 500, borderRadius: 999,
                background: isProductAds ? '#059669' : isOffsiteAds ? '#f59e0b' : ACCENT,
                color: '#fff', fontFamily: FONT,
              }}>
                {isProductAds ? "Product Ads" : isOffsiteAds ? "Offsite Ads" : "Display Ads"}
              </span>
            </div>
          </div>

          {/* Steps nav */}
          {mode === "create_campaign" && (
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {visibleSteps.map((step) => (
                  <StepButton
                    key={step.id}
                    step={step}
                    currentStep={currentStep}
                    onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
                    disabled={step.id > currentStep}
                  />
                ))}
              </div>

              {/* Campaign summary */}
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                <h4 style={{
                  fontSize: 12, fontWeight: 600, color: '#9a9a9a',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  marginBottom: 12, marginTop: 0, fontFamily: FONT,
                }}>
                  Campaign Summary
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                  {[
                    { label: "Daily Budget", value: campaignData.dailyBudget ? `$${campaignData.dailyBudget}` : "-" },
                    { label: "Start Date",   value: campaignData.startDate || "-" },
                    { label: "Ad Groups",    value: campaignData.adGroups.length },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: TEXT_MID, fontFamily: FONT }}>{label}</span>
                      <span style={{ fontWeight: 500, color: TEXT, fontFamily: FONT }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === "add_ad_group" && (
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h4 style={{
                    fontSize: 12, fontWeight: 600, color: '#9a9a9a',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    marginBottom: 8, marginTop: 0, fontFamily: FONT,
                  }}>
                    Campaign Info
                  </h4>
                  <div style={{
                    background: BG, borderRadius: 8, padding: 12,
                    display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: TEXT_MID, fontFamily: FONT }}>Ad Type</span>
                      <span style={{ fontWeight: 500, color: TEXT, textTransform: 'capitalize', fontFamily: FONT }}>
                        {selectedCampaign?.adType || adType}
                      </span>
                    </div>
                    {selectedCampaign?.objective && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: TEXT_MID, fontFamily: FONT }}>Objective</span>
                        <span style={{ fontWeight: 500, color: TEXT, fontFamily: FONT }}>
                          {getObjectiveLabel(selectedCampaign.objective)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 style={{
                    fontSize: 12, fontWeight: 600, color: '#9a9a9a',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    marginBottom: 8, marginTop: 0, fontFamily: FONT,
                  }}>
                    New Ad Groups
                  </h4>
                  <div style={{ background: BG, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: ACCENT, fontFamily: FONT }}>
                      {campaignData.adGroups.length}
                    </div>
                    <p style={{ fontSize: 12, color: TEXT_MID, marginTop: 4, marginBottom: 0, fontFamily: FONT }}>
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

        {/* ── Main Content ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            padding: '16px 24px', background: BG, borderBottom: `1px solid ${BORDER}`,
            overflowX: 'auto', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, minWidth: 'min-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: BG_SUB,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <LayersIcon size={16} style={{ color: TEXT_MID }} />
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: TEXT, margin: 0, fontFamily: FONT }}>
                    {mode === "add_ad_group"
                      ? `Add Ad Groups to ${selectedCampaign?.name}`
                      : "Create Campaign"}
                  </h2>
                  <p style={{ fontSize: 13, color: TEXT_MID, marginTop: 2, marginBottom: 0, fontFamily: FONT }}>
                    {mode === "add_ad_group"
                      ? "Create and configure new ad groups for this campaign"
                      : "Set up a new campaign with ad groups"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {mode === "add_ad_group"
              ? renderAdGroupsStep()
              : currentStep === 1
                ? renderSetupStep()
                : currentStep === 2
                  ? renderAdGroupsStep()
                  : renderReviewStep()}
          </div>

          {renderFooter()}
        </div>
      </div>

      {renderAdGroupWizard()}

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

// ── Sub-components ────────────────────────────────────────────────────────────

function StepButton({ step, currentStep, onClick, disabled }) {
  const isActive   = currentStep === step.id;
  const isComplete = step.id < currentStep;
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: 12, borderRadius: 8, border: 'none',
        background: isActive
          ? `${BG}`
          : (isComplete && hov) ? 'rgba(255,255,255,0.5)' : 'transparent',
        outline: isActive ? `1px solid rgba(37,99,235,0.2)` : 'none',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 999, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 500,
        background: isActive ? '#2563eb' : isComplete ? '#16a34a' : '#e5e7eb',
        color: (isActive || isComplete) ? '#fff' : '#9a9a9a',
      }}>
        {isComplete ? <CheckIcon size={16} /> : step.id}
      </div>
      <div style={{ textAlign: 'left' }}>
        <p style={{
          fontSize: 13, fontWeight: 500, margin: '0 0 2px',
          color: isActive ? '#2563eb' : isComplete ? TEXT : '#9a9a9a',
          fontFamily: "'Open Sans', sans-serif",
        }}>
          {step.title}
        </p>
        <p style={{ fontSize: 12, color: '#9a9a9a', margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
          {step.description}
        </p>
      </div>
    </button>
  );
}

function AdGroupCard({ adGroup, summary, onDuplicate, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: BG, borderRadius: 12,
        border: `1px solid ${hov ? 'rgba(37,99,235,0.3)' : BORDER}`,
        padding: 20, transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{
            width: 40, height: 40, background: '#f0f4ff', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT,
          }}>
            {summary.icon}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: '#2d2d2d', margin: '0 0 8px', fontFamily: FONT }}>
              {adGroup.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: TEXT_MID, flexWrap: 'wrap' }}>
              {summary.details.map((detail, idx) => (
                <span key={idx} style={{ fontFamily: FONT }}>
                  {detail.label}:{' '}
                  <span style={{ fontWeight: 500, color: TEXT }}>{detail.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconBtn onClick={onDuplicate} title="Duplicate"><CopyIcon size={14} /></IconBtn>
          <IconBtn onClick={onEdit}      title="Edit"><EditIcon size={14} /></IconBtn>
          <IconBtn onClick={onDelete}    title="Delete" dangerHover><TrashIcon size={14} /></IconBtn>
        </div>
      </div>
    </div>
  );
}

// ── CampaignSetupStep (kept, converted) ──────────────────────────────────────
function CampaignSetupStep({ data, updateData, aiSuggestedFields, onFieldChange, aiReasoning }) {
  const getObjectiveLabel = (objective) => {
    const labels = { awareness: "Brand Awareness", traffic: "Website Traffic", conversions: "Conversions" };
    return labels[objective] || objective;
  };

  const isAiSuggested = (field) => aiSuggestedFields?.has(field);

  const AiBadge = () => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', fontSize: 10, fontWeight: 500,
      background: VI_BG, color: VI,
      borderRadius: 999, marginLeft: 8, fontFamily: FONT,
    }}>
      <SparklesIcon size={10} />
      AI Recommended
    </span>
  );

  return (
    <div style={{ maxWidth: 896, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {aiReasoning && (
        <div style={{
          background: 'linear-gradient(90deg,rgba(124,58,237,0.05),rgba(0,151,240,0.05))',
          borderRadius: 8, padding: 16, border: '1px solid rgba(124,58,237,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: VI,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <SparklesIcon size={16} style={{ color: '#fff' }} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: VI, marginBottom: 4, marginTop: 0, fontFamily: FONT }}>
                AI Recommendation Summary
              </p>
              <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontFamily: FONT }}>{aiReasoning}</p>
              <p style={{ fontSize: 12, color: '#9a9a9a', marginTop: 8, marginBottom: 0, fontFamily: FONT }}>
                Fields with the AI badge are pre-filled based on your inputs. Feel free to modify them.
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: BG_SUB, borderRadius: 8, padding: 16, border: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 12, color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px', fontFamily: FONT }}>
              Campaign
            </p>
            <p style={{ fontSize: 16, fontWeight: 600, color: TEXT, margin: 0, fontFamily: FONT }}>{data.name}</p>
          </div>
          <div style={{
            padding: '6px 12px', background: '#e8f4fd', color: ACCENT,
            fontSize: 13, fontWeight: 500, borderRadius: 999, fontFamily: FONT,
          }}>
            {getObjectiveLabel(data.objective)}
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 16, marginTop: 0, fontFamily: FONT }}>Schedule</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
              Start Date <span style={{ color: '#d83c3b' }}>*</span>
            </label>
            <Input
              type="date"
              value={data.startDate}
              onChange={(e) => onFieldChange?.("startDate", e.target.value) || updateData({ startDate: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>End Date (Optional)</label>
            <Input
              type="date"
              value={data.endDate}
              onChange={(e) => onFieldChange?.("endDate", e.target.value) || updateData({ endDate: e.target.value })}
            />
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#9a9a9a', marginTop: 8, marginBottom: 0, fontFamily: FONT }}>
          * Date will be set in the Asia/Kolkata timezone
        </p>
      </div>

      {/* Budget */}
      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 16, marginTop: 0, fontFamily: FONT }}>Budget</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'flex', alignItems: 'center', fontFamily: FONT }}>
              Total Budget ($) <span style={{ color: '#d83c3b' }}>*</span>
              {isAiSuggested("totalBudget") && <AiBadge />}
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={data.totalBudget}
              onChange={(e) => onFieldChange?.("totalBudget", e.target.value) || updateData({ totalBudget: e.target.value })}
              style={isAiSuggested("totalBudget") ? { boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' /* VI focus ring */ } : {}}
            />
            <p style={{ fontSize: 12, color: '#9a9a9a', margin: 0, fontFamily: FONT }}>Minimum budget should be $10</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'flex', alignItems: 'center', fontFamily: FONT }}>
              Daily Budget ($) <span style={{ color: '#d83c3b' }}>*</span>
              {isAiSuggested("dailyBudget") && <AiBadge />}
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={data.dailyBudget}
              onChange={(e) => onFieldChange?.("dailyBudget", e.target.value) || updateData({ dailyBudget: e.target.value })}
              style={isAiSuggested("dailyBudget") ? { boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' /* VI focus ring */ } : {}}
            />
            <p style={{ fontSize: 12, color: '#9a9a9a', margin: 0, fontFamily: FONT }}>Minimum budget should be $10</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
              Choose Wallet <span style={{ color: '#d83c3b' }}>*</span>
            </label>
            <Select
              value={data.wallet}
              onChange={(e) => updateData({ wallet: e.target.value })}
              options={[
                { value: "default",   label: "Default wallet" },
                { value: "marketing", label: "Marketing wallet" },
                { value: "promo",     label: "Promotional wallet" },
              ]}
            />
            <p style={{ fontSize: 12, color: '#9a9a9a', margin: 0, fontFamily: FONT }}>Wallet Balance: $5,850,489.59</p>
          </div>
        </div>
      </div>

      {/* Bidding strategy */}
      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 16, marginTop: 0, fontFamily: FONT }}>Bidding Strategy</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'flex', alignItems: 'center', fontFamily: FONT }}>
              Buying Type <span style={{ color: '#d83c3b' }}>*</span>
              {isAiSuggested("biddingStrategy") && <AiBadge />}
            </label>
            <Select
              value={data.bidStrategy}
              onChange={(e) => onFieldChange?.("bidStrategy", e.target.value) || updateData({ bidStrategy: e.target.value })}
              options={[
                { value: "cpm", label: "CPM (Cost per Mille)" },
                { value: "cpc", label: "CPC (Cost per Click)" },
                { value: "cpa", label: "CPA (Cost per Action)" },
              ]}
              style={isAiSuggested("biddingStrategy") ? { boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' /* VI focus ring */ } : {}}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'flex', alignItems: 'center', fontFamily: FONT }}>
              Priority Level
              {isAiSuggested("priority") && <AiBadge />}
            </label>
            <Select
              value={data.priority}
              onChange={(e) => onFieldChange?.("priority", e.target.value) || updateData({ priority: e.target.value })}
              options={[
                { value: "guaranteed", label: "Guaranteed" },
                { value: "high",       label: "High" },
                { value: "medium",     label: "Medium" },
                { value: "low",        label: "Low" },
              ]}
              style={isAiSuggested("priority") ? { boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' /* VI focus ring */ } : {}}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: TEXT_MID, display: 'flex', alignItems: 'center', fontFamily: FONT }}>
              Pacing
              {isAiSuggested("pacing") && <AiBadge />}
            </label>
            <Select
              value={data.pacing}
              onChange={(e) => onFieldChange?.("pacing", e.target.value) || updateData({ pacing: e.target.value })}
              options={[
                { value: "standard",    label: "Standard" },
                { value: "accelerated", label: "Accelerated" },
              ]}
              style={isAiSuggested("pacing") ? { boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' /* VI focus ring */ } : {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ReviewStep (kept, converted) ─────────────────────────────────────────────
function ReviewStep({ data }) {
  return (
    <div style={{ maxWidth: 896, display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 4px', fontFamily: FONT }}>
          Review &amp; Launch
        </h2>
        <p style={{ fontSize: 13, color: TEXT_MID, margin: 0, fontFamily: FONT }}>
          Review your campaign settings before launching.
        </p>
      </div>

      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h3 style={{ fontWeight: 600, color: TEXT, margin: '0 0 16px', fontFamily: FONT }}>Campaign Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, fontSize: 13 }}>
          {[
            { label: "Name:",         value: data.name },
            { label: "Budget:",       value: `$${Number(data.totalBudget).toLocaleString()}` },
            { label: "Daily Budget:", value: `$${Number(data.dailyBudget).toLocaleString()}` },
            { label: "Bidding:",      value: <span style={{ textTransform: 'uppercase' }}>{data.bidStrategy}</span> },
          ].map(({ label, value }, idx) => (
            <div key={idx}>
              <span style={{ color: '#9a9a9a', fontFamily: FONT }}>{label}</span>
              <span style={{ marginLeft: 8, color: TEXT, fontFamily: FONT }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: BG, borderRadius: 8, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h3 style={{ fontWeight: 600, color: TEXT, margin: '0 0 16px', fontFamily: FONT }}>
          Ad Groups ({data.adGroups.length})
        </h3>
        {data.adGroups.length === 0 ? (
          <p style={{ fontSize: 13, color: '#9a9a9a', margin: 0, fontFamily: FONT }}>No ad groups created yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.adGroups.map((ag) => (
              <div key={ag.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 12, background: BG_SUB, borderRadius: 8,
              }}>
                <span style={{ fontSize: 13, color: TEXT, fontFamily: FONT }}>{ag.name}</span>
                <span style={{ fontSize: 12, color: '#9a9a9a', fontFamily: FONT }}>
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
