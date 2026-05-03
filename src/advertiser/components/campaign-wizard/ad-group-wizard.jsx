import { useState, useEffect } from "react";
import {
  CloseIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  Icon,
  Button,
  Input,
  Checkbox,
} from "../../../ui";
import { ProductSelectionStep } from "./ad-group-steps/product-selection-step";
import { TargetingStep } from "./ad-group-steps/targeting-step";
import { AdCreativeStep } from "./ad-group-steps/ad-creative-step";
import { ConfigStep } from "./ad-group-steps/config-step";
import { createPortal } from "react-dom";

// ── Design tokens ──────────────────────────────────────────────────────────────
const FONT    = "'Open Sans', sans-serif";
const TEXT    = "var(--osmos-fg)";
const TEXT_MID = "var(--osmos-fg-muted)";
const TEXT_SUB = "var(--osmos-fg-subtle)";
const BORDER  = "var(--osmos-border)";
const BG      = "var(--osmos-bg)";
const BG_SUB  = "var(--osmos-bg-subtle)";
const ACCENT  = "var(--osmos-brand-primary)";
const ACCENT_M = "var(--osmos-brand-primary-muted)";

// ── Hand-rolled icons not in the ui export ─────────────────────────────────────
const ArrowLeftIcon = (props) => (
  <Icon {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </Icon>
);

const ImageIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <polyline points="21 15 16 10 5 21" stroke="currentColor" strokeWidth="2" fill="none"/>
  </Icon>
);

const VideoIcon = (props) => (
  <Icon {...props}>
    <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <polyline points="2 17 12 22 22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
    <polyline points="2 12 12 17 22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
  </Icon>
);

const BookOpenIcon = (props) => (
  <Icon {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </Icon>
);

const LayoutIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
    <line x1="9" y1="21" x2="9" y2="9" stroke="currentColor" strokeWidth="2"/>
  </Icon>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const adGroupSteps = [
  { id: 1, label: "Basics",   description: "Name your ad group" },
  { id: 2, label: "Pages",    description: "Select target pages" },
  { id: 3, label: "Format",   description: "Select ad format" },
  { id: 4, label: "Products", description: "Choose products" },
  { id: 5, label: "Targeting",description: "Define audience" },
  { id: 6, label: "Creative", description: "Create ads" },
  { id: 7, label: "Config",   description: "Settings" },
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
    description: "Drive attention with impactful banners on your own site or app.",
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
    description: "Deliver engaging video experiences within your content ecosystem.",
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

// ── Small hover-aware sub-components ──────────────────────────────────────────

function StepButton({ step, isCurrent, isCompleted, isDisabled, onClick }) {
  const [hov, setHov] = useState(false);

  const containerStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px",
    borderRadius: 8,
    textAlign: "left",
    transition: "all 0.15s",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.5 : 1,
    background: isCurrent
      ? ACCENT_M
      : hov && !isDisabled
        ? BG_SUB
        : "transparent",
    border: isCurrent ? `1px solid ${ACCENT}` : "1px solid transparent",
    fontFamily: FONT,
  };

  const dotStyle = {
    width: 32,
    height: 32,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 500,
    flexShrink: 0,
    transition: "all 0.15s",
    background: isCompleted ? "#16a34a" : isCurrent ? ACCENT : "var(--osmos-bg-subtle)",
    color: isCompleted || isCurrent ? "#fff" : TEXT_SUB,
  };

  return (
    <button
      style={containerStyle}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={dotStyle}>
        {isCompleted ? <CheckIcon size={16} /> : step.id}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: isCurrent ? ACCENT : isCompleted ? TEXT : TEXT_SUB,
        }}>
          {step.label}
        </div>
        <div style={{
          fontSize: 12,
          color: TEXT_MID,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {step.description}
        </div>
      </div>
    </button>
  );
}

function CarouselNavButton({ onClick, side }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute",
        [side]: 8,
        top: "50%",
        transform: "translateY(-50%)",
        width: 28,
        height: 28,
        borderRadius: 999,
        background: hov ? BG : "rgba(255,255,255,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "all 0.15s",
        border: "none",
        padding: 0,
      }}
    >
      {side === "left"
        ? <ChevronLeftIcon size={16} style={{ color: TEXT }} />
        : <ChevronRightIcon size={16} style={{ color: TEXT }} />}
    </button>
  );
}

function PreviewButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 6,
        borderRadius: 8,
        background: hov ? BG_SUB : "transparent",
        border: "none",
        cursor: "pointer",
        color: TEXT_SUB,
        display: "flex",
        alignItems: "center",
        transition: "all 0.15s",
      }}
    >
      <EyeIcon size={16} />
    </button>
  );
}

function CloseHeaderButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 8,
        borderRadius: 8,
        background: hov ? BG_SUB : "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "all 0.15s",
      }}
    >
      <CloseIcon size={20} style={{ color: TEXT_MID }} />
    </button>
  );
}

function BackHeaderButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 8,
        borderRadius: 8,
        background: hov ? BG_SUB : "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "all 0.15s",
      }}
    >
      <ArrowLeftIcon size={20} style={{ color: TEXT_MID }} />
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
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
      case 1: return adGroupData.name.trim() !== "";
      case 2: return adGroupData.selectedPages.length > 0;
      case 3: return adGroupData.adFormat !== null;
      default: return true;
    }
  };

  const getAvailableFormats = () => {
    if (adGroupData.selectedPages.length === 0) return [];
    const allSupportedFormats = new Set();
    adGroupData.selectedPages.forEach((pageId) => {
      const page = pageInventory.find((p) => p.id === pageId);
      if (page) page.supportedFormats.forEach((f) => allSupportedFormats.add(f));
    });
    return adFormats.filter((format) => allSupportedFormats.has(format.id));
  };

  const togglePage = (pageId) => {
    const newPages = adGroupData.selectedPages.includes(pageId)
      ? adGroupData.selectedPages.filter((p) => p !== pageId)
      : [...adGroupData.selectedPages, pageId];

    let newFormat = adGroupData.adFormat;
    if (newFormat) {
      const newSupportedFormats = new Set();
      newPages.forEach((pId) => {
        const page = pageInventory.find((p) => p.id === pId);
        if (page) page.supportedFormats.forEach((f) => newSupportedFormats.add(f));
      });
      if (!newSupportedFormats.has(newFormat)) newFormat = null;
    }
    updateAdGroupData({ selectedPages: newPages, adFormat: newFormat });
  };

  const getFormatIcon = (formatId) => {
    switch (formatId) {
      case "banner":   return <ImageIcon size={20} />;
      case "video":    return <VideoIcon size={20} />;
      case "carousel": return <LayersIcon size={20} />;
      case "story":    return <BookOpenIcon size={20} />;
      default:         return <ImageIcon size={20} />;
    }
  };

  // ── Step renderers ───────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
          Ad Group Basics
        </h2>
        <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>
          Give your ad group a descriptive name.
        </p>
      </div>

      <div style={{
        background: BG,
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        padding: 24,
      }}>
        <label style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          color: TEXT,
          marginBottom: 8,
          fontFamily: FONT,
        }}>
          Ad Group Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <Input
          value={adGroupData.name}
          onChange={(e) => updateAdGroupData({ name: e.target.value })}
          placeholder="e.g., Homepage Banner Ads, Product Page Promotions"
          style={{ width: "100%" }}
        />
        <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 8, fontFamily: FONT }}>
          Use a name that describes the inventory or targeting strategy
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
          Select Target Pages
        </h2>
        <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>
          Choose which pages to display your ads on. Available ad formats will be determined by your selection.
        </p>
      </div>

      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontWeight: 500, color: TEXT, fontSize: 14, fontFamily: FONT }}>Available Pages</h3>
          <span style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
            {adGroupData.selectedPages.length} selected
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pageInventory.map((page) => {
            const isSelected = adGroupData.selectedPages.includes(page.id);
            return (
              <PageRow
                key={page.id}
                page={page}
                isSelected={isSelected}
                onToggle={() => togglePage(page.id)}
              />
            );
          })}
        </div>
      </div>

      {adGroupData.selectedPages.length > 0 && (
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: 12,
          padding: 16,
        }}>
          <h4 style={{ fontWeight: 500, color: "#166534", marginBottom: 8, fontSize: 14, fontFamily: FONT }}>
            Available Ad Formats
          </h4>
          <p style={{ fontSize: 13, color: "#15803d", fontFamily: FONT }}>
            Based on your selection, you can use:{" "}
            {getAvailableFormats().map((f) => f.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => {
    const availableFormats = getAvailableFormats();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8, fontFamily: FONT }}>
            Choose Ad Format
          </h2>
          <p style={{ fontSize: 14, color: TEXT_MID, fontFamily: FONT }}>
            Select the format for your ad group creatives. Available formats are based on your selected pages.
          </p>
        </div>

        {availableFormats.length === 0 ? (
          <div style={{
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: 12,
            padding: 16,
          }}>
            <p style={{ color: "#92400e", fontSize: 14, fontFamily: FONT }}>
              Please go back and select at least one page to see available ad formats.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}>
            {availableFormats.map((format) => {
              const isSelected = adGroupData.adFormat === format.id;
              return (
                <FormatCard
                  key={format.id}
                  format={format}
                  isSelected={isSelected}
                  carouselIndex={carouselIndex}
                  onSelect={() => updateAdGroupData({ adFormat: format.id })}
                  onCarouselPrev={(e) => { e.stopPropagation(); handleCarouselPrev(format.id); }}
                  onCarouselNext={(e) => { e.stopPropagation(); handleCarouselNext(format.id); }}
                  getFormatIcon={getFormatIcon}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return <ProductSelectionStep data={adGroupData} updateData={updateAdGroupData} />;
      case 5: return <TargetingStep data={adGroupData} updateData={updateAdGroupData} />;
      case 6: return <AdCreativeStep data={adGroupData} updateData={updateAdGroupData} />;
      case 7: return <ConfigStep data={adGroupData} updateData={updateAdGroupData} />;
      default: return null;
    }
  };

  if (!open || !portalContainer) return null;

  const wizardContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 110,
          background: "rgba(0,0,0,0.4)",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        width: "calc(100% - 280px)",
        maxWidth: 1400,
        zIndex: 111,
        background: BG_SUB,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        fontFamily: FONT,
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${BORDER}`,
          background: BG,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <BackHeaderButton onClick={onClose} />
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: TEXT, fontFamily: FONT }}>
                Create Display Ad Group
              </h2>
              <p style={{ fontSize: 13, color: TEXT_MID, fontFamily: FONT }}>
                Step {currentStep} of {adGroupSteps.length} • Return to Campaign
              </p>
            </div>
          </div>
          <CloseHeaderButton onClick={onClose} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Steps sidebar */}
          <div style={{
            width: 256,
            background: BG,
            borderRight: `1px solid ${BORDER}`,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
              {adGroupSteps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent  = step.id === currentStep;
                const isDisabled = step.id > currentStep;
                return (
                  <StepButton
                    key={step.id}
                    step={step}
                    isCurrent={isCurrent}
                    isCompleted={isCompleted}
                    isDisabled={isDisabled}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                  />
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div style={{
              borderTop: `1px solid ${BORDER}`,
              padding: 16,
              background: BG_SUB,
            }}>
              <h4 style={{
                fontSize: 11,
                fontWeight: 600,
                color: TEXT_SUB,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 12,
                fontFamily: FONT,
              }}>
                Ad Group Summary
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Name",      value: adGroupData.name || "-" },
                  { label: "Pages",     value: adGroupData.selectedPages.length },
                  { label: "Format",    value: adGroupData.adFormat || "-" },
                  { label: "Creatives", value: adGroupData.creatives.length },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: TEXT_MID, fontFamily: FONT }}>{label}</span>
                    <span style={{
                      fontWeight: 500,
                      color: TEXT,
                      textTransform: label === "Format" ? "capitalize" : undefined,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 120,
                      fontFamily: FONT,
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: 32 }}>
              {renderStepContent()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${BORDER}`,
          background: BG,
          padding: "16px 24px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              {currentStep === 2 && adGroupData.selectedPages.length === 0 && (
                <p style={{ fontSize: 13, color: "#ef4444", fontFamily: FONT }}>
                  Select at least one page to continue
                </p>
              )}
              {currentStep === 3 && !adGroupData.adFormat && (
                <p style={{ fontSize: 13, color: "#ef4444", fontFamily: FONT }}>
                  Select an ad format to continue
                </p>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>Back</Button>
              )}
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
                style={{ minWidth: 120 }}
              >
                {currentStep === adGroupSteps.length ? "Save Ad Group" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(wizardContent, portalContainer);
}

// ── Page row sub-component (needs hover) ──────────────────────────────────────
function PageRow({ page, isSelected, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <label
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: 16,
        borderRadius: 12,
        border: isSelected
          ? `2px solid ${ACCENT}`
          : hov
            ? `2px solid var(--osmos-border)`
            : `2px solid var(--osmos-border)`,
        background: isSelected ? ACCENT_M : "var(--osmos-bg)",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={onToggle}
        style={{ marginTop: 2 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <LayoutIcon size={16} style={{ color: "var(--osmos-fg-muted)", flexShrink: 0 }} />
          <p style={{ fontWeight: 500, color: "var(--osmos-fg)", fontSize: 14, fontFamily: FONT }}>
            {page.name}
          </p>
        </div>
        <p style={{ fontSize: 13, color: "var(--osmos-fg-muted)", marginBottom: 8, fontFamily: FONT }}>
          {page.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
          <span style={{ color: "#16a34a", fontFamily: FONT }}>{page.reach}</span>
          <span style={{ color: "var(--osmos-fg-subtle)", fontFamily: FONT }}>
            Formats:{" "}
            {page.supportedFormats
              .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
              .join(", ")}
          </span>
        </div>
      </div>
    </label>
  );
}

// ── Format card sub-component (needs hover) ───────────────────────────────────
function FormatCard({ format, isSelected, carouselIndex, onSelect, onCarouselPrev, onCarouselNext, getFormatIcon }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--osmos-bg)",
        borderRadius: 12,
        border: isSelected
          ? `2px solid ${ACCENT}`
          : hov
            ? `2px solid var(--osmos-border)`
            : `2px solid var(--osmos-border)`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: isSelected || hov ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {/* Format header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: `1px solid var(--osmos-border)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            padding: 8,
            borderRadius: 8,
            background: isSelected ? ACCENT_M : "var(--osmos-bg-subtle)",
            color: isSelected ? ACCENT : "var(--osmos-fg-muted)",
            display: "flex",
          }}>
            {getFormatIcon(format.id)}
          </div>
          <span style={{ fontWeight: 600, color: "var(--osmos-fg)", fontSize: 14, fontFamily: FONT }}>
            {format.name}
          </span>
        </div>
        <PreviewButton onClick={(e) => e.stopPropagation()} />
      </div>

      {/* Image carousel */}
      <div style={{
        position: "relative",
        background: "var(--osmos-bg-subtle)",
        height: 144,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src={format.images[carouselIndex[format.id] || 0]}
          alt={format.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <CarouselNavButton
          side="left"
          onClick={(e) => { e.stopPropagation(); onCarouselPrev(e); }}
        />
        <CarouselNavButton
          side="right"
          onClick={(e) => { e.stopPropagation(); onCarouselNext(e); }}
        />
        {/* Dot indicators */}
        <div style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
        }}>
          {format.images.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                transition: "all 0.15s",
                background: (carouselIndex[format.id] || 0) === idx
                  ? ACCENT
                  : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Description & features */}
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 13, color: "var(--osmos-fg-muted)", marginBottom: 12, fontFamily: FONT }}>
          {format.description}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
          {format.features.map((feature, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12 }}>
              <CheckIcon size={14} style={{ color: "#16a34a", marginTop: 1, flexShrink: 0 }} />
              <span style={{ color: "var(--osmos-fg)", fontFamily: FONT }}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Select pill */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 13,
          textAlign: "center",
          transition: "all 0.15s",
          background: isSelected ? ACCENT : "var(--osmos-bg-subtle)",
          color: isSelected ? "#fff" : "var(--osmos-fg)",
          fontFamily: FONT,
        }}>
          {isSelected ? "Selected" : "Select"}
        </div>
      </div>
    </div>
  );
}
