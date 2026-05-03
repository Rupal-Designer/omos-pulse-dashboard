import { useState } from "react";
import {
  Icon,
  SearchIcon,
  PlusIcon,
  TrashIcon,
  InfoIcon,
  CheckIcon,
  CloseIcon,
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
} from "../../../ui";
import { InstoreAdGroupWizard } from "./instore-ad-group-wizard";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const FONT    = "'Open Sans', sans-serif";
const TEXT    = 'var(--osmos-fg)';
const TEXT_MID= 'var(--osmos-fg-muted)';
const TEXT_SUB= 'var(--osmos-fg-subtle)';
const BORDER  = 'var(--osmos-border)';
const BG      = 'var(--osmos-bg)';
const BG_SUB  = 'var(--osmos-bg-subtle)';
const ACCENT  = 'var(--osmos-brand-primary)';
const ACCENT_M= 'var(--osmos-brand-primary-muted)';
const GREEN   = 'var(--osmos-brand-green)';
const AMBER   = 'var(--osmos-brand-amber)';

// ─── Hand-rolled lucide icons not in ui/index.js ──────────────────────────────
const MonitorIcon = (props) => (
  <Icon {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </Icon>
);

const EditIcon = (props) => (
  <Icon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

const CopyIcon = (props) => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="M12 3l1.88 5.76L20 10l-6.12 1.24L12 17l-1.88-5.76L4 10l6.12-1.24z" />
    <path d="M5 3l.88 2.12L8 6l-2.12.88L5 9l-.88-2.12L2 6l2.12-.88z" />
    <path d="M19 13l.88 2.12L22 16l-2.12.88L19 19l-.88-2.12L16 16l2.12-.88z" />
  </Icon>
);

// ─── Sample Data ──────────────────────────────────────────────────────────────
const sampleScreens = [
  { id: "1", name: "Billing_Back Screen",      store: "FreshMart Central", city: "San Francisco", state: "CA", tags: ["Fruits", "Veggies"], loopProfile: "Playlist Demo (15s slots @ $0.52 each)" },
  { id: "2", name: "Checkout Screen 1",        store: "FreshMart North",   city: "San Francisco", state: "CA", tags: ["East"],             loopProfile: "Playlist Demo (15s slots @ $0.52 each)" },
  { id: "3", name: "Frozen Section Screen",    store: "FreshMart South",   city: "San Francisco", state: "CA", tags: ["North"],            loopProfile: "Instore Launch Playlist (30s slots @ $1 each)" },
  { id: "4", name: "Bakery Screen",            store: "FreshMart East",    city: "San Diego",     state: "CA", tags: ["Clothes", "Care"],  loopProfile: "Playlist Demo (15s slots @ $0.52 each)" },
  { id: "5", name: "Dairy Section Screen",     store: "FreshMart West",    city: "San Diego",     state: "CA", tags: ["North", "West"],    loopProfile: "Instore Launch Playlist (30s slots @ $1 each)" },
  { id: "6", name: "Meat Counter Screen",      store: "FreshMart Central", city: "San Diego",     state: "CA", tags: ["East"],             loopProfile: "Pickcel_QA_Template_4 (30s slots @ $1 each)" },
  { id: "7", name: "Seafood Section Screen",   store: "FreshMart North",   city: "Oakland",       state: "CA", tags: ["West"],             loopProfile: "Playlist Demo (15s slots @ $0.52 each)" },
  { id: "8", name: "Health Foods Aisle Screen",store: "FreshMart West",    city: "Oakland",       state: "CA", tags: ["West"],             loopProfile: "Instore Launch Playlist (30s slots @ $1 each)" },
  { id: "9", name: "Waiting Areas",            store: "FreshMart West",    city: "Oakland",       state: "CA", tags: ["West", "East"],     loopProfile: "Pickcel_QA_Template_4 (30s slots @ $1 each)" },
  { id: "10", name: "Entry Point",             store: "FreshMart West",    city: "Oakland",       state: "CA", tags: ["West"],             loopProfile: "Playlist Demo (15s slots @ $0.52 each)" },
];

const loopProfiles = [
  { id: "1", name: "Playlist Demo (15s slots @ ₹0.52 each)",           slotDuration: "15s", pricePerSlot: 0.52, applicableScreens: 11, totalAvailablePlays: 105600, fillRate: 100, totalBookablePlay: 105600 },
  { id: "2", name: "Instore Launch Playlist (30s slots @ ₹1 each)",    slotDuration: "30s", pricePerSlot: 1,    applicableScreens: 1,  totalAvailablePlays: 4800,   fillRate: 100, totalBookablePlay: 4800   },
  { id: "3", name: "Pickcel_QA_Template_4 (30s slots @ ₹1 each)",      slotDuration: "30s", pricePerSlot: 1,    applicableScreens: 1,  totalAvailablePlays: 4800,   fillRate: 100, totalBookablePlay: 4800   },
];

const adFormats = [
  { id: "1", name: "Qa Image Ad Format",        eligibleScreens: 11, type: "image" },
  { id: "2", name: "test Video Ad format",       eligibleScreens: 11, type: "video" },
  { id: "3", name: "Full HD Video - Landscape",  eligibleScreens: 2,  type: "video" },
  { id: "4", name: "Full HD Image - Landscape",  eligibleScreens: 2,  type: "image" },
  { id: "5", name: "4k video landscape",         eligibleScreens: 1,  type: "video" },
  { id: "6", name: "4K Image Landscape",         eligibleScreens: 1,  type: "image" },
];

const steps = [
  { id: 1, title: "Campaign Setup",   description: "Budget & schedule" },
  { id: 2, title: "Ad Groups",        description: "Create ad groups"  },
  { id: 3, title: "Review & Launch",  description: "Review and publish" },
];

// ─── Wallet options for Select ────────────────────────────────────────────────
const walletOptions = [
  { value: "main",     label: "Main Wallet ($50,000)"     },
  { value: "campaign", label: "Campaign Wallet ($25,000)" },
  { value: "reserve",  label: "Reserve Wallet ($10,000)"  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function InstoreCampaignWizard({ open, onClose, campaignData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState(
    campaignData?.campaignName ||
      `In-Store Digital Campaign - (${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
  );
  const [isEditingName, setIsEditingName] = useState(false);

  // Campaign Setup State
  const [dailyBudget, setDailyBudget]     = useState("100");
  const [flexiBudget, setFlexiBudget]     = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [startDate, setStartDate]         = useState("");
  const [endDate, setEndDate]             = useState("");
  const [maxSpendCap, setMaxSpendCap]     = useState("");

  // Screen Selection State
  const [campaignType, setCampaignType]           = useState("in-house");
  const [dateRange, setDateRange]                 = useState({ start: "2026-01-05", end: "2026-01-14" });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(["morning", "afternoon", "evening", "night"]);
  const [screenSelectionMode, setScreenSelectionMode] = useState("filter");
  const [screenFilters, setScreenFilters]         = useState([{ field: "Placement Category", operator: "is", value: "Home Goods" }]);
  const [selectedScreens, setSelectedScreens]     = useState([]);
  const [showScreenSelector, setShowScreenSelector] = useState(false);

  // Ads Upload State
  const [selectedAdFormat, setSelectedAdFormat] = useState(adFormats[0]?.id || "");
  const [uploadedAds, setUploadedAds]           = useState({});

  // Ad Groups State
  const [adGroups, setAdGroups]             = useState([]);
  const [showAdGroupWizard, setShowAdGroupWizard] = useState(false);

  // Config State
  const [playsToBook, setPlaysToBook] = useState({
    "1": { value: 100, type: "percent" },
    "2": { value: 23,  type: "percent" },
    "3": { value: 23,  type: "percent" },
  });
  const [slotsSelected, setSlotsSelected] = useState(20000);
  const maxSlots = 120000;

  // Calculated metrics
  const eligibleScreens    = screenSelectionMode === "filter" ? 13 : selectedScreens.length;
  const totalBookablePlays = loopProfiles.reduce((sum, lp) => sum + lp.totalBookablePlay, 0);
  const bookedPlays = loopProfiles.reduce((sum, lp) => {
    const booking = playsToBook[lp.id];
    if (!booking) return sum;
    const plays = booking.type === "percent"
      ? Math.floor((lp.totalBookablePlay * booking.value) / 100)
      : booking.value;
    return sum + plays;
  }, 0);
  const totalCost = loopProfiles.reduce((sum, lp) => {
    const booking = playsToBook[lp.id];
    if (!booking) return sum;
    const plays = booking.type === "percent"
      ? Math.floor((lp.totalBookablePlay * booking.value) / 100)
      : booking.value;
    return sum + plays * lp.pricePerSlot;
  }, 0);

  const totalPlays                = 345000;
  const totalScreensAvailable     = 22765;
  const totalImpressionsAvailable = 3450000;
  const amountToPay               = (slotsSelected / maxSlots) * 800;

  const timeSlots = [
    { id: "morning",   label: "Morning (6AM - 12PM)"  },
    { id: "afternoon", label: "Afternoon (12PM - 5PM)" },
    { id: "evening",   label: "Evening (5PM - 9PM)"    },
    { id: "night",     label: "Night (9PM - 6AM)"      },
  ];

  const filterFields    = ["Placement Category", "Store", "City", "State", "Screen Type", "Tag"];
  const filterOperators = ["is", "is not", "contains", "does not contain"];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddFilter = () => {
    setScreenFilters([...screenFilters, { field: "Placement Category", operator: "is", value: "" }]);
  };

  const handleRemoveFilter = (index) => {
    setScreenFilters(screenFilters.filter((_, i) => i !== index));
  };

  const handleUpdateFilter = (index, key, value) => {
    const newFilters = [...screenFilters];
    newFilters[index] = { ...newFilters[index], [key]: value };
    setScreenFilters(newFilters);
  };

  const handleScreenToggle = (screenId) => {
    setSelectedScreens((prev) =>
      prev.includes(screenId) ? prev.filter((id) => id !== screenId) : [...prev, screenId],
    );
  };

  const handleSelectAllScreens = () => {
    if (selectedScreens.length === sampleScreens.length) {
      setSelectedScreens([]);
    } else {
      setSelectedScreens(sampleScreens.map((s) => s.id));
    }
  };

  const handleAddAd = (formatId) => {
    const newAd = {
      id: `ad-${Date.now()}`,
      name: `New Ad ${(uploadedAds[formatId]?.length || 0) + 1}`,
    };
    setUploadedAds((prev) => ({ ...prev, [formatId]: [...(prev[formatId] || []), newAd] }));
  };

  const handleSaveAdGroup = (data) => {
    const newAdGroup = {
      id: `ag-${Date.now()}`,
      name: data.name,
      stores: data.stores,
      zones: data.zones,
      applicableScreens: data.stores.length * 20,
      perSlotDuration: "15 Secs",
      slotsUtilized: 0,
      totalPlays: 0,
    };
    setAdGroups([...adGroups, newAdGroup]);
    setShowAdGroupWizard(false);
  };

  const handleDuplicateAdGroup = (adGroup) => {
    const duplicatedGroup = { ...adGroup, id: `ag-${Date.now()}`, name: `${adGroup.name} Copy` };
    setAdGroups([...adGroups, duplicatedGroup]);
  };

  const handleEditAdGroup = (adGroup) => {
    console.log("Editing ad group:", adGroup.id);
  };

  const handleDeleteAdGroup = (id) => {
    setAdGroups(adGroups.filter((group) => group.id !== id));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!open) return null;

  // ── Inline styles ─────────────────────────────────────────────────────────
  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 100,
      background: BG, display: 'flex',
      height: '100vh', overflow: 'hidden', fontFamily: FONT,
    },
    inner: {
      position: 'relative', display: 'flex',
      width: '100%', height: '100%', overflow: 'hidden',
    },
    // Sidebar
    sidebar: {
      width: 288, background: BG_SUB,
      borderRight: `1px solid ${BORDER}`,
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, height: '100%', overflow: 'hidden',
    },
    sidebarHeader: {
      padding: 24, borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
    },
    sidebarTitle: {
      fontWeight: 600, color: TEXT,
      fontSize: 14, margin: 0,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    badgeRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 },
    aiBadge: {
      padding: '2px 8px', fontSize: 10, fontWeight: 500,
      background: 'var(--osmos-brand-violet)', color: '#fff', borderRadius: 999,
      display: 'flex', alignItems: 'center', gap: 4,
    },
    instoreBadge: {
      padding: '2px 8px', fontSize: 10, fontWeight: 500,
      background: ACCENT, color: '#fff', borderRadius: 999,
    },
    sidebarScroll: { flex: 1, overflowY: 'auto', padding: 24 },
    stepsContainer: { display: 'flex', flexDirection: 'column', gap: 8 },
    stepBtn: (isActive, isPast, isFuture) => ({
      width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: 12, borderRadius: 8, border: 'none', cursor: isFuture ? 'not-allowed' : 'pointer',
      background: isActive ? BG : 'transparent',
      outline: isActive ? `1px solid ${ACCENT}22` : 'none',
      opacity: isFuture ? 0.5 : 1,
      transition: 'all 0.15s', textAlign: 'left',
    }),
    stepCircle: (isActive, isPast) => ({
      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 500,
      background: isActive ? ACCENT : isPast ? GREEN : BG_SUB,
      color: (isActive || isPast) ? '#fff' : TEXT_SUB,
    }),
    stepLabel: (isActive, isPast) => ({
      fontSize: 13, fontWeight: 500,
      color: isActive ? ACCENT : isPast ? TEXT : TEXT_SUB,
      margin: 0,
    }),
    stepDesc: { fontSize: 12, color: TEXT_SUB, margin: 0 },
    summarySection: { marginTop: 24, paddingTop: 16, borderTop: `1px solid ${BORDER}` },
    summaryTitle: {
      fontSize: 11, fontWeight: 600, color: TEXT_SUB,
      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
    },
    summaryRows: { display: 'flex', flexDirection: 'column', gap: 8 },
    summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13 },
    // Main
    main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' },
    topBar: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
    },
    topBarLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    iconBox: {
      width: 40, height: 40, background: ACCENT_M, borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    mainTitle: { fontSize: 20, fontWeight: 600, color: TEXT, margin: 0 },
    mainSub:   { fontSize: 13, color: TEXT_MID, margin: 0 },
    closeBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: TEXT_MID, display: 'flex', alignItems: 'center',
    },
    contentScroll: { flex: 1, overflowY: 'auto', padding: 32 },
    footer: {
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      gap: 12, padding: '16px 32px', borderTop: `1px solid ${BORDER}`, flexShrink: 0,
    },
    // Step content
    stepHeading: { fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 },
    stepSubhead: { fontSize: 14, color: TEXT_MID, marginBottom: 0 },
    card: {
      background: BG, border: `1px solid ${BORDER}`,
      borderRadius: 12, padding: 24,
    },
    cardDashed: {
      background: BG, border: `1px dashed ${BORDER}`,
      borderRadius: 12, padding: 48,
    },
    fieldLabel: { fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 0 },
    helperText: { fontSize: 13, color: TEXT_MID, marginTop: 8 },
    inlineLabel: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 },
    // Switch
    switchBtn: (checked) => ({
      position: 'relative', width: 44, height: 24, borderRadius: 999,
      background: checked ? ACCENT : TEXT_SUB, border: 'none',
      cursor: 'pointer', transition: 'background 0.15s',
    }),
    switchThumb: (checked) => ({
      position: 'absolute', top: 4, width: 16, height: 16, borderRadius: '50%',
      background: '#fff',
      transform: checked ? 'translateX(24px)' : 'translateX(4px)',
      transition: 'transform 0.15s', display: 'block',
    }),
    // Grid
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 },
    // Ad groups list
    adGroupCard: {
      background: BG, border: `1px solid ${BORDER}`,
      borderRadius: 12, padding: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    adGroupLeft: { display: 'flex', alignItems: 'center', gap: 16 },
    adGroupName: { fontSize: 14, fontWeight: 500, color: TEXT, margin: 0 },
    adGroupMeta: { fontSize: 13, color: TEXT_MID, margin: 0 },
    adGroupActions: { display: 'flex', alignItems: 'center', gap: 8 },
    // Review table rows
    reviewRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 },
    reviewRowLast: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 },
    // Screen modal
    modalOverlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60,
    },
    modalBox: {
      background: BG, borderRadius: 8, width: 900, maxHeight: '80vh',
      display: 'flex', flexDirection: 'column',
    },
    modalHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 24px', borderBottom: `1px solid ${BORDER}`,
    },
    modalTitle: { fontSize: 16, fontWeight: 600, color: TEXT, margin: 0 },
    modalBody: { padding: 24, flex: 1, overflowY: 'auto' },
    modalFooter: { padding: '16px 24px', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'center' },
    tableWrap: { border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' },
    tableHead: { background: BG_SUB },
    tableHeadCell: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 500, color: TEXT_MID },
    tableRow: (hover) => ({ borderTop: `1px solid ${BORDER}`, background: hover ? BG_SUB : BG }),
    tableCell: { padding: '12px 16px', fontSize: 13, color: TEXT_MID },
    // Badges in filter row
    filterBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', background: BG_SUB, borderRadius: 6,
      border: `1px solid ${BORDER}`, fontSize: 13, color: TEXT,
    },
    filterBadgeClose: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: TEXT_MID, marginLeft: 4, lineHeight: 1,
    },
    // Input prefix wrapper
    prefixWrap: { position: 'relative' },
    prefixSymbol: {
      position: 'absolute', left: 12, top: '50%',
      transform: 'translateY(-50%)', color: TEXT_MID, pointerEvents: 'none',
    },
    searchIconWrap: {
      position: 'absolute', left: 12, top: '50%',
      transform: 'translateY(-50%)', pointerEvents: 'none',
      display: 'flex', alignItems: 'center',
    },
    // Empty state
    emptyCenter: {
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    },
    emptyIcon: {
      width: 64, height: 64, background: ACCENT_M, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    },
    emptyH3: { fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 8 },
    emptyP: { fontSize: 14, color: TEXT_MID, marginBottom: 24, maxWidth: 400 },
  };

  return (
    <div style={s.overlay}>
      <div style={s.inner}>
        {/* ── Left Sidebar ── */}
        <div style={s.sidebar}>
          <div style={s.sidebarHeader}>
            <p style={s.sidebarTitle}>{campaignName}</p>
            <div style={s.badgeRow}>
              {campaignData?.template === "ai" && (
                <span style={s.aiBadge}>
                  <SparklesIcon size={10} />
                  AI Setup
                </span>
              )}
              <span style={s.instoreBadge}>In-Store Digital</span>
            </div>
          </div>

          <div style={s.sidebarScroll}>
            <div style={s.stepsContainer}>
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isPast   = step.id < currentStep;
                const isFuture = step.id > currentStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => { if (isPast) setCurrentStep(step.id); }}
                    disabled={isFuture}
                    style={s.stepBtn(isActive, isPast, isFuture)}
                  >
                    <div style={s.stepCircle(isActive, isPast)}>
                      {isPast ? <CheckIcon size={16} /> : step.id}
                    </div>
                    <div>
                      <p style={s.stepLabel(isActive, isPast)}>{step.title}</p>
                      <p style={s.stepDesc}>{step.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Campaign Summary */}
            <div style={s.summarySection}>
              <p style={s.summaryTitle}>Campaign Summary</p>
              <div style={s.summaryRows}>
                <div style={s.summaryRow}>
                  <span style={{ color: TEXT_MID }}>Daily Budget</span>
                  <span style={{ fontWeight: 500, color: TEXT }}>{dailyBudget ? `$${dailyBudget}` : "-"}</span>
                </div>
                <div style={s.summaryRow}>
                  <span style={{ color: TEXT_MID }}>Start Date</span>
                  <span style={{ fontWeight: 500, color: TEXT }}>{startDate || "-"}</span>
                </div>
                <div style={s.summaryRow}>
                  <span style={{ color: TEXT_MID }}>Ad Groups</span>
                  <span style={{ fontWeight: 500, color: TEXT }}>{adGroups.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={s.main}>
          {/* Header */}
          <div style={s.topBar}>
            <div style={s.topBarLeft}>
              <div style={s.iconBox}>
                <LayersIcon size={20} color={ACCENT} />
              </div>
              <div>
                <h1 style={s.mainTitle}>Create Campaign</h1>
                <p style={s.mainSub}>Set up a new in-store digital campaign with ad groups</p>
              </div>
            </div>
            <button style={s.closeBtn} onClick={onClose}>
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Step Content */}
          <div style={s.contentScroll}>

            {/* ── Step 1: Campaign Setup ── */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h2 style={s.stepHeading}>Campaign Setup</h2>
                  <p style={s.stepSubhead}>Configure your In-Store Digital campaign budget and schedule.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Daily Budget card */}
                  <div style={s.card}>
                    <div style={s.inlineLabel}>
                      <label style={s.fieldLabel}>Daily Budget:</label>
                      <InfoIcon size={16} color={TEXT_MID} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={s.prefixWrap}>
                        <span style={s.prefixSymbol}>$</span>
                        <Input
                          type="number"
                          value={dailyBudget}
                          onChange={(e) => setDailyBudget(e.target.value)}
                          style={{ paddingLeft: 28, width: 128 }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: TEXT }}>FlexiBudget</span>
                        <InfoIcon size={16} color={TEXT_MID} />
                        <button
                          onClick={() => setFlexiBudget(!flexiBudget)}
                          style={s.switchBtn(flexiBudget)}
                        >
                          <span style={s.switchThumb(flexiBudget)} />
                        </button>
                      </div>
                    </div>
                    <p style={s.helperText}>
                      Your average daily budget can be in the range from $12,250 to $15,925. This is based on overall data from 2nd Dec, 2025 - 8th Dec, 2025.
                    </p>
                  </div>

                  {/* Wallet Selection card */}
                  <div style={s.card}>
                    <label style={{ ...s.fieldLabel, display: 'block', marginBottom: 16 }}>Choose Wallet</label>
                    <Select
                      label=""
                      value={selectedWallet}
                      onChange={(e) => setSelectedWallet(e.target.value)}
                      options={walletOptions}
                    />
                  </div>

                  {/* Date Range card */}
                  <div style={s.card}>
                    <div style={s.grid2}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <label style={s.fieldLabel}>Start Date</label>
                          <InfoIcon size={16} color={TEXT_MID} />
                        </div>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ ...s.fieldLabel, display: 'block', marginBottom: 8 }}>
                          End Date{' '}
                          <span style={{ fontWeight: 400, color: TEXT_MID }}>(Optional)</span>
                        </label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <p style={s.helperText}>* Date will be set in the Asia/Kolkata (+05:30) timezone</p>
                  </div>

                  {/* Max Spend Cap card */}
                  <div style={s.card}>
                    <div style={s.inlineLabel}>
                      <label style={s.fieldLabel}>Maximum Spend Cap:</label>
                      <InfoIcon size={16} color={TEXT_MID} />
                      <span style={{ fontSize: 13, color: TEXT_MID }}>(Optional)</span>
                    </div>
                    <div style={{ ...s.prefixWrap, width: 192 }}>
                      <span style={s.prefixSymbol}>$</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={maxSpendCap}
                        onChange={(e) => setMaxSpendCap(e.target.value)}
                        style={{ paddingLeft: 28 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Ad Groups ── */}
            {currentStep === 2 && (
              <div style={{ maxWidth: 896 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ ...s.stepHeading, fontSize: 22 }}>Ad Groups</h2>
                    <p style={{ ...s.stepSubhead, marginTop: 4 }}>
                      Create ad groups to organize your in-store ads by screen type and placement
                    </p>
                  </div>
                  {adGroups.length > 0 && (
                    <Button variant="primary" onClick={() => setShowAdGroupWizard(true)}>
                      <PlusIcon size={16} style={{ marginRight: 8 }} />
                      Add Ad Group
                    </Button>
                  )}
                </div>

                {adGroups.length === 0 ? (
                  <div style={s.cardDashed}>
                    <div style={s.emptyCenter}>
                      <div style={s.emptyIcon}>
                        <LayersIcon size={32} color={ACCENT} />
                      </div>
                      <h3 style={s.emptyH3}>No Ad Groups Yet</h3>
                      <p style={s.emptyP}>
                        Ad groups help you organize your in-store ads by screen type, placement, and creative formats. Create your first ad group to get started.
                      </p>
                      <Button variant="primary" onClick={() => setShowAdGroupWizard(true)}>
                        <PlusIcon size={16} style={{ marginRight: 8 }} />
                        Create Your First Ad Group
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {adGroups.map((adGroup) => (
                      <div key={adGroup.id} style={s.adGroupCard}>
                        <div style={s.adGroupLeft}>
                          <div style={s.iconBox}>
                            <MonitorIcon size={20} color={ACCENT} />
                          </div>
                          <div>
                            <p style={s.adGroupName}>{adGroup.name}</p>
                            <p style={s.adGroupMeta}>
                              {adGroup.applicableScreens} Screens · {adGroup.perSlotDuration} · {adGroup.totalPlays} Plays
                            </p>
                          </div>
                        </div>
                        <div style={s.adGroupActions}>
                          <Button variant="ghost" size="sm" onClick={() => handleDuplicateAdGroup(adGroup)}>
                            <CopyIcon size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditAdGroup(adGroup)}>
                            <EditIcon size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteAdGroup(adGroup.id)}>
                            <TrashIcon size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Step 3: Review & Launch ── */}
            {currentStep === 3 && (
              <div style={{ maxWidth: 768 }}>
                <h2 style={{ ...s.stepHeading, fontSize: 22, marginBottom: 8 }}>Review & Launch</h2>
                <p style={{ ...s.stepSubhead, marginBottom: 24 }}>Review your campaign settings before launching.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={s.card}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 16 }}>Campaign Details</h3>
                    <div>
                      <div style={s.reviewRow}>
                        <span style={{ color: TEXT_MID }}>Campaign Name</span>
                        <span style={{ fontWeight: 500, color: TEXT }}>{campaignName}</span>
                      </div>
                      <div style={s.reviewRow}>
                        <span style={{ color: TEXT_MID }}>Daily Budget</span>
                        <span style={{ fontWeight: 500, color: TEXT }}>${dailyBudget}</span>
                      </div>
                      <div style={s.reviewRow}>
                        <span style={{ color: TEXT_MID }}>Start Date</span>
                        <span style={{ fontWeight: 500, color: TEXT }}>{startDate || "Not set"}</span>
                      </div>
                      <div style={s.reviewRowLast}>
                        <span style={{ color: TEXT_MID }}>Ad Groups</span>
                        <span style={{ fontWeight: 500, color: TEXT }}>{adGroups.length}</span>
                      </div>
                    </div>
                  </div>

                  {adGroups.length > 0 && (
                    <div style={s.card}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 16 }}>Ad Groups Summary</h3>
                      <div>
                        {adGroups.map((adGroup, idx) => (
                          <div
                            key={adGroup.id}
                            style={idx === adGroups.length - 1 ? s.reviewRowLast : s.reviewRow}
                          >
                            <span style={{ color: TEXT_MID }}>{adGroup.name}</span>
                            <span style={{ fontWeight: 500, color: TEXT }}>{adGroup.applicableScreens} screens</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={s.footer}>
            <Button variant="outline" onClick={currentStep === 1 ? onClose : handleBack}>
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === 3 ? "Launch Campaign" : "Continue"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Screen Selector Modal ── */}
      {showScreenSelector && (
        <div style={s.modalOverlay}>
          <div style={s.modalBox}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>Select Screens</h3>
              <button style={s.closeBtn} onClick={() => setShowScreenSelector(false)}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div style={s.modalBody}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>
                  {selectedScreens.length} Screens Selected
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={s.searchIconWrap}>
                    <SearchIcon size={16} color={TEXT_MID} />
                  </span>
                  <Input
                    placeholder="Search Screen Name"
                    style={{ paddingLeft: 36, width: 200 }}
                  />
                </div>
              </div>

              {/* Applied Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <Button variant="outline" size="sm">
                  <PlusIcon size={16} />
                </Button>
                <span style={s.filterBadge}>
                  State is California, Colorado
                  <button style={s.filterBadgeClose}>×</button>
                </span>
                <span style={s.filterBadge}>
                  City is New York, San Francisco, San Diego, Los Angeles, Oakland
                  <button style={s.filterBadgeClose}>×</button>
                </span>
              </div>

              {/* Screen Table */}
              <div style={s.tableWrap}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={s.tableHead}>
                    <tr>
                      <th style={s.tableHeadCell}>
                        <Checkbox
                          checked={selectedScreens.length === sampleScreens.length}
                          onChange={handleSelectAllScreens}
                        />
                      </th>
                      <th style={s.tableHeadCell}>Screen Name</th>
                      <th style={s.tableHeadCell}>Store</th>
                      <th style={s.tableHeadCell}>City</th>
                      <th style={s.tableHeadCell}>State</th>
                      <th style={s.tableHeadCell}>Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleScreens.map((screen) => (
                      <tr key={screen.id} style={s.tableRow(false)}>
                        <td style={s.tableCell}>
                          <Checkbox
                            checked={selectedScreens.includes(screen.id)}
                            onChange={() => handleScreenToggle(screen.id)}
                          />
                        </td>
                        <td style={s.tableCell}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 48, height: 32, background: BG_SUB, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <MonitorIcon size={16} color={TEXT_MID} />
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{screen.name}</div>
                              {screen.id > "5" && (
                                <span style={{ fontSize: 11, fontWeight: 500, background: GREEN, color: '#fff', borderRadius: 4, padding: '2px 6px' }}>
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td style={s.tableCell}>{screen.store}</td>
                        <td style={s.tableCell}>{screen.city}</td>
                        <td style={s.tableCell}>{screen.state}</td>
                        <td style={s.tableCell}>{screen.tags.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={s.modalFooter}>
              <Button variant="primary" style={{ paddingLeft: 32, paddingRight: 32 }} onClick={() => setShowScreenSelector(false)}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Ad Group Wizard ── */}
      <InstoreAdGroupWizard
        open={showAdGroupWizard}
        onClose={() => setShowAdGroupWizard(false)}
        onSave={handleSaveAdGroup}
        campaignName={campaignName}
      />
    </div>
  );
}
