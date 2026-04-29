"use client";
import { useState } from "react";
import {
  X,
  Monitor,
  Search,
  Plus,
  Trash2,
  Info,
  Edit2,
  Copy,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { InstoreAdGroupWizard } from "./instore-ad-group-wizard";
import { Switch } from "@/components/ui/switch";

// Sample data for screens
const sampleScreens = [
  {
    id: "1",
    name: "Billing_Back Screen",
    store: "FreshMart Central",
    city: "San Francisco",
    state: "CA",
    tags: ["Fruits", "Veggies"],
    loopProfile: "Playlist Demo (15s slots @ $0.52 each)",
  },
  {
    id: "2",
    name: "Checkout Screen 1",
    store: "FreshMart North",
    city: "San Francisco",
    state: "CA",
    tags: ["East"],
    loopProfile: "Playlist Demo (15s slots @ $0.52 each)",
  },
  {
    id: "3",
    name: "Frozen Section Screen",
    store: "FreshMart South",
    city: "San Francisco",
    state: "CA",
    tags: ["North"],
    loopProfile: "Instore Launch Playlist (30s slots @ $1 each)",
  },
  {
    id: "4",
    name: "Bakery Screen",
    store: "FreshMart East",
    city: "San Diego",
    state: "CA",
    tags: ["Clothes", "Care"],
    loopProfile: "Playlist Demo (15s slots @ $0.52 each)",
  },
  {
    id: "5",
    name: "Dairy Section Screen",
    store: "FreshMart West",
    city: "San Diego",
    state: "CA",
    tags: ["North", "West"],
    loopProfile: "Instore Launch Playlist (30s slots @ $1 each)",
  },
  {
    id: "6",
    name: "Meat Counter Screen",
    store: "FreshMart Central",
    city: "San Diego",
    state: "CA",
    tags: ["East"],
    loopProfile: "Pickcel_QA_Template_4 (30s slots @ $1 each)",
  },
  {
    id: "7",
    name: "Seafood Section Screen",
    store: "FreshMart North",
    city: "Oakland",
    state: "CA",
    tags: ["West"],
    loopProfile: "Playlist Demo (15s slots @ $0.52 each)",
  },
  {
    id: "8",
    name: "Health Foods Aisle Screen",
    store: "FreshMart West",
    city: "Oakland",
    state: "CA",
    tags: ["West"],
    loopProfile: "Instore Launch Playlist (30s slots @ $1 each)",
  },
  {
    id: "9",
    name: "Waiting Areas",
    store: "FreshMart West",
    city: "Oakland",
    state: "CA",
    tags: ["West", "East"],
    loopProfile: "Pickcel_QA_Template_4 (30s slots @ $1 each)",
  },
  {
    id: "10",
    name: "Entry Point",
    store: "FreshMart West",
    city: "Oakland",
    state: "CA",
    tags: ["West"],
    loopProfile: "Playlist Demo (15s slots @ $0.52 each)",
  },
];

// Loop profiles data
const loopProfiles = [
  {
    id: "1",
    name: "Playlist Demo (15s slots @ ₹0.52 each)",
    slotDuration: "15s",
    pricePerSlot: 0.52,
    applicableScreens: 11,
    totalAvailablePlays: 105600,
    fillRate: 100,
    totalBookablePlay: 105600,
  },
  {
    id: "2",
    name: "Instore Launch Playlist (30s slots @ ₹1 each)",
    slotDuration: "30s",
    pricePerSlot: 1,
    applicableScreens: 1,
    totalAvailablePlays: 4800,
    fillRate: 100,
    totalBookablePlay: 4800,
  },
  {
    id: "3",
    name: "Pickcel_QA_Template_4 (30s slots @ ₹1 each)",
    slotDuration: "30s",
    pricePerSlot: 1,
    applicableScreens: 1,
    totalAvailablePlays: 4800,
    fillRate: 100,
    totalBookablePlay: 4800,
  },
];

// Ad formats based on selected screens
const adFormats = [
  { id: "1", name: "Qa Image Ad Format", eligibleScreens: 11, type: "image" },
  { id: "2", name: "test Video Ad format", eligibleScreens: 11, type: "video" },
  {
    id: "3",
    name: "Full HD Video - Landscape",
    eligibleScreens: 2,
    type: "video",
  },
  {
    id: "4",
    name: "Full HD Image - Landscape",
    eligibleScreens: 2,
    type: "image",
  },
  { id: "5", name: "4k video landscape", eligibleScreens: 1, type: "video" },
  { id: "6", name: "4K Image Landscape", eligibleScreens: 1, type: "image" },
];

const steps = [
  { id: 1, title: "Campaign Setup", description: "Budget & schedule" },
  { id: 2, title: "Ad Groups", description: "Create ad groups" },
  { id: 3, title: "Review & Launch", description: "Review and publish" },
];

export function InstoreCampaignWizard({ open, onClose, campaignData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState(
    campaignData?.campaignName ||
      `In-Store Digital Campaign - (${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
  );
  const [isEditingName, setIsEditingName] = useState(false);

  // Campaign Setup State
  const [dailyBudget, setDailyBudget] = useState("100");
  const [flexiBudget, setFlexiBudget] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxSpendCap, setMaxSpendCap] = useState("");

  // Screen Selection State
  const [campaignType, setCampaignType] = useState("in-house");
  const [dateRange, setDateRange] = useState({
    start: "2026-01-05",
    end: "2026-01-14",
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([
    "morning",
    "afternoon",
    "evening",
    "night",
  ]);
  const [screenSelectionMode, setScreenSelectionMode] = useState("filter");
  const [screenFilters, setScreenFilters] = useState([
    { field: "Placement Category", operator: "is", value: "Home Goods" },
  ]);
  const [selectedScreens, setSelectedScreens] = useState([]);
  const [showScreenSelector, setShowScreenSelector] = useState(false);

  // Ads Upload State
  const [selectedAdFormat, setSelectedAdFormat] = useState(
    adFormats[0]?.id || "",
  );
  const [uploadedAds, setUploadedAds] = useState({});

  // Ad Groups State - Start with empty array for empty state
  const [adGroups, setAdGroups] = useState([]);
  const [showAdGroupWizard, setShowAdGroupWizard] = useState(false);

  // Config State
  const [playsToBook, setPlaysToBook] = useState({
    "1": { value: 100, type: "percent" },
    "2": { value: 23, type: "percent" },
    "3": { value: 23, type: "percent" },
  });

  const [slotsSelected, setSlotsSelected] = useState(20000);
  const maxSlots = 120000;

  // Calculate metrics
  const eligibleScreens =
    screenSelectionMode === "filter" ? 13 : selectedScreens.length;
  const totalBookablePlays = loopProfiles.reduce(
    (sum, lp) => sum + lp.totalBookablePlay,
    0,
  );
  const bookedPlays = loopProfiles.reduce((sum, lp) => {
    const booking = playsToBook[lp.id];
    if (!booking) return sum;
    const plays =
      booking.type === "percent"
        ? Math.floor((lp.totalBookablePlay * booking.value) / 100)
        : booking.value;
    return sum + plays;
  }, 0);
  const totalCost = loopProfiles.reduce((sum, lp) => {
    const booking = playsToBook[lp.id];
    if (!booking) return sum;
    const plays =
      booking.type === "percent"
        ? Math.floor((lp.totalBookablePlay * booking.value) / 100)
        : booking.value;
    return sum + plays * lp.pricePerSlot;
  }, 0);

  const totalPlays = 345000;
  const totalScreensAvailable = 22765;
  const totalImpressionsAvailable = 3450000;
  const amountToPay = (slotsSelected / maxSlots) * 800;

  const timeSlots = [
    { id: "morning", label: "Morning (6AM - 12PM)" },
    { id: "afternoon", label: "Afternoon (12PM - 5PM)" },
    { id: "evening", label: "Evening (5PM - 9PM)" },
    { id: "night", label: "Night (9PM - 6AM)" },
  ];

  const filterFields = [
    "Placement Category",
    "Store",
    "City",
    "State",
    "Screen Type",
    "Tag",
  ];

  const filterOperators = ["is", "is not", "contains", "does not contain"];

  const handleAddFilter = () => {
    setScreenFilters([
      ...screenFilters,
      { field: "Placement Category", operator: "is", value: "" },
    ]);
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
      prev.includes(screenId)
        ? prev.filter((id) => id !== screenId)
        : [...prev, screenId],
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
    setUploadedAds((prev) => ({
      ...prev,
      [formatId]: [...(prev[formatId] || []), newAd],
    }));
  };

  const handleSaveAdGroup = (data) => {
    const newAdGroup = {
      id: `ag-${Date.now()}`,
      name: data.name,
      stores: data.stores,
      zones: data.zones,
      applicableScreens: data.stores.length * 20, // Mock calculation
      perSlotDuration: "15 Secs",
      slotsUtilized: 0,
      totalPlays: 0,
    };
    setAdGroups([...adGroups, newAdGroup]);
    setShowAdGroupWizard(false);
  };

  // Handlers for Ad Group Management (New additions based on updates)
  const handleDuplicateAdGroup = (adGroup) => {
    const duplicatedGroup = {
      ...adGroup,
      id: `ag-${Date.now()}`,
      name: `${adGroup.name} Copy`,
    };
    setAdGroups([...adGroups, duplicatedGroup]);
  };

  const handleEditAdGroup = (adGroup) => {
    // Logic to edit an existing ad group would go here
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

  return (
    <div className="fixed inset-0 z-[100] bg-screen-bg flex h-screen overflow-hidden">
      <div className="relative flex w-full h-full overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 bg-surface-1 border-r border-stroke flex flex-col shrink-0 h-full overflow-hidden">
          <div className="p-6 border-b border-stroke shrink-0">
            <h2 className="font-semibold text-text-primary truncate">
              {campaignName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {campaignData?.template === "ai" && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-violet-primary text-white rounded-full flex items-center gap-1">
                  <Sparkles size={10} />
                  AI Setup
                </span>
              )}
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-primary text-white">
                In-Store Digital
              </span>
            </div>
          </div>

          {/* Steps Navigation */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id);
                  }}
                  disabled={step.id > currentStep}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    currentStep === step.id
                      ? "bg-screen-bg border border-blue-primary/20"
                      : step.id < currentStep
                        ? "hover:bg-screen-bg/50 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step.id
                        ? "bg-blue-primary text-white"
                        : step.id < currentStep
                          ? "bg-success-primary text-white"
                          : "bg-surface-2 text-text-secondary"
                    }`}
                  >
                    {step.id < currentStep ? <Check size={16} /> : step.id}
                  </div>
                  <div className="text-left">
                    <p
                      className={`text-sm font-medium ${currentStep === step.id ? "text-blue-primary" : step.id < currentStep ? "text-text-primary" : "text-text-secondary"}`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Campaign Summary */}
            <div className="mt-6 pt-4 border-t border-stroke">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Campaign Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Daily Budget</span>
                  <span className="font-medium text-text-primary">
                    {dailyBudget ? `$${dailyBudget}` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Start Date</span>
                  <span className="font-medium text-text-primary">
                    {startDate || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Ad Groups</span>
                  <span className="font-medium text-text-primary">
                    {adGroups.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-stroke shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-bg rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-text-primary">
                  Create Campaign
                </h1>
                <p className="text-sm text-text-secondary">
                  Set up a new in-store digital campaign with ad groups
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Step 1: Campaign Setup */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Campaign Setup
                  </h2>
                  <p className="text-text-secondary">
                    Configure your In-Store Digital campaign budget and
                    schedule.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Daily Budget */}
                  <Card className="p-6 border-stroke">
                    <div className="flex items-center gap-2 mb-4">
                      <Label className="text-text-primary font-medium">
                        Daily Budget:
                      </Label>
                      <Info className="w-4 h-4 text-text-secondary" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                          $
                        </span>
                        <Input
                          type="number"
                          value={dailyBudget}
                          onChange={(e) => setDailyBudget(e.target.value)}
                          className="pl-7 w-32 border-stroke"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary text-sm">
                          FlexiBudget
                        </span>
                        <Info className="w-4 h-4 text-text-secondary" />
                        <Switch
                          checked={flexiBudget}
                          onCheckedChange={setFlexiBudget}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      Your average daily budget can be in the range from $12,250
                      to $15,925. This is based on overall data from 2nd Dec,
                      2025 - 8th Dec, 2025.
                    </p>
                  </Card>

                  {/* Wallet Selection */}
                  <Card className="p-6 border-stroke">
                    <Label className="text-text-primary font-medium mb-4 block">
                      Choose Wallet
                    </Label>
                    <Select
                      value={selectedWallet}
                      onValueChange={setSelectedWallet}
                    >
                      <SelectTrigger className="border-stroke">
                        <SelectValue placeholder="Select Wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">
                          Main Wallet ($50,000)
                        </SelectItem>
                        <SelectItem value="campaign">
                          Campaign Wallet ($25,000)
                        </SelectItem>
                        <SelectItem value="reserve">
                          Reserve Wallet ($10,000)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>

                  {/* Date Range */}
                  <Card className="p-6 border-stroke">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-text-primary font-medium">
                            Start Date
                          </Label>
                          <Info className="w-4 h-4 text-text-secondary" />
                        </div>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border-stroke"
                        />
                      </div>
                      <div>
                        <Label className="text-text-primary font-medium mb-2 block">
                          End Date{" "}
                          <span className="text-text-secondary font-normal">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border-stroke"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      * Date will be set in the Asia/Kolkata (+05:30) timezone
                    </p>
                  </Card>

                  {/* Maximum Spend Cap */}
                  <Card className="p-6 border-stroke">
                    <div className="flex items-center gap-2 mb-4">
                      <Label className="text-text-primary font-medium">
                        Maximum Spend Cap:
                      </Label>
                      <Info className="w-4 h-4 text-text-secondary" />
                      <span className="text-text-secondary text-sm">
                        (Optional)
                      </span>
                    </div>
                    <div className="relative w-48">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={maxSpendCap}
                        onChange={(e) => setMaxSpendCap(e.target.value)}
                        className="pl-7 border-stroke"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 2: Ad Groups */}
            {currentStep === 2 && (
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">
                      Ad Groups
                    </h2>
                    <p className="text-text-secondary mt-1">
                      Create ad groups to organize your in-store ads by screen
                      type and placement
                    </p>
                  </div>
                  {adGroups.length > 0 && (
                    <Button
                      onClick={() => setShowAdGroupWizard(true)}
                      className="bg-blue-primary hover:bg-blue-darker-1 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Ad Group
                    </Button>
                  )}
                </div>

                {/* Empty State */}
                {adGroups.length === 0 ? (
                  <Card className="p-12 border-stroke border-dashed">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-blue-bg rounded-full flex items-center justify-center mb-4">
                        <Layers className="w-8 h-8 text-blue-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        No Ad Groups Yet
                      </h3>
                      <p className="text-text-secondary mb-6 max-w-md">
                        Ad groups help you organize your in-store ads by screen
                        type, placement, and creative formats. Create your first
                        ad group to get started.
                      </p>
                      <Button
                        onClick={() => setShowAdGroupWizard(true)}
                        className="bg-blue-primary hover:bg-blue-darker-1 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Ad Group
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {adGroups.map((adGroup) => (
                      <Card
                        key={adGroup.id}
                        className="p-4 border-stroke hover:border-blue-primary/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-bg rounded-lg flex items-center justify-center">
                              <Monitor className="w-5 h-5 text-blue-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-text-primary">
                                {adGroup.name}
                              </h4>
                              <p className="text-sm text-text-secondary">
                                {adGroup.applicableScreens} Screens ·{" "}
                                {adGroup.perSlotDuration} · {adGroup.totalPlays}{" "}
                                Plays
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicateAdGroup(adGroup)}
                              className="text-text-secondary hover:text-blue-primary"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-secondary hover:text-blue-primary"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAdGroup(adGroup.id)}
                              className="text-text-secondary hover:text-error-primary"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review & Launch */}
            {currentStep === 3 && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-text-primary mb-2">
                  Review & Launch
                </h2>
                <p className="text-text-secondary mb-6">
                  Review your campaign settings before launching.
                </p>

                <div className="space-y-6">
                  <Card className="p-6 border-stroke">
                    <h3 className="font-semibold text-text-primary mb-4">
                      Campaign Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-stroke">
                        <span className="text-text-secondary">
                          Campaign Name
                        </span>
                        <span className="font-medium text-text-primary">
                          {campaignName}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stroke">
                        <span className="text-text-secondary">
                          Daily Budget
                        </span>
                        <span className="font-medium text-text-primary">
                          ${dailyBudget}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stroke">
                        <span className="text-text-secondary">Start Date</span>
                        <span className="font-medium text-text-primary">
                          {startDate || "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-text-secondary">Ad Groups</span>
                        <span className="font-medium text-text-primary">
                          {adGroups.length}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {adGroups.length > 0 && (
                    <Card className="p-6 border-stroke">
                      <h3 className="font-semibold text-text-primary mb-4">
                        Ad Groups Summary
                      </h3>
                      <div className="space-y-3">
                        {adGroups.map((adGroup) => (
                          <div
                            key={adGroup.id}
                            className="flex justify-between py-2 border-b border-stroke last:border-0"
                          >
                            <span className="text-text-secondary">
                              {adGroup.name}
                            </span>
                            <span className="font-medium text-text-primary">
                              {adGroup.applicableScreens} screens
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-stroke shrink-0">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : handleBack}
              className="border-stroke bg-transparent"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-blue-primary hover:bg-blue-darker-1 text-white"
            >
              {currentStep === 3 ? "Launch Campaign" : "Continue"}
            </Button>
          </div>
        </div>
      </div>

      {/* Screen Selector Modal */}
      {showScreenSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-screen-bg rounded-lg w-[900px] max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stroke">
              <h3 className="text-lg font-semibold text-text-primary">
                Select Screens
              </h3>
              <button
                onClick={() => setShowScreenSelector(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-text-primary">
                  {selectedScreens.length} Screens Selected
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input
                      placeholder="Search Screen Name"
                      className="pl-9 w-[200px] bg-screen-bg border-stroke"
                    />
                  </div>
                </div>
              </div>

              {/* Applied Filters */}
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stroke bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-1" />
                </Button>
                <Badge
                  variant="secondary"
                  className="bg-surface-1 text-text-primary"
                >
                  State is California, Colorado
                  <button className="ml-2 text-text-secondary hover:text-text-primary">
                    ×
                  </button>
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-surface-1 text-text-primary"
                >
                  City is New York, San Francisco, San Diego, Los Angeles,
                  Oakland
                  <button className="ml-2 text-text-secondary hover:text-text-primary">
                    ×
                  </button>
                </Badge>
              </div>

              {/* Screen Table */}
              <div className="border border-stroke rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-1">
                    <tr className="text-sm text-text-secondary">
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={
                            selectedScreens.length === sampleScreens.length
                          }
                          onCheckedChange={handleSelectAllScreens}
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Screen Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Store</th>
                      <th className="px-4 py-3 text-left font-medium">City</th>
                      <th className="px-4 py-3 text-left font-medium">State</th>
                      <th className="px-4 py-3 text-left font-medium">Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleScreens.map((screen) => (
                      <tr
                        key={screen.id}
                        className="border-t border-stroke hover:bg-surface-1"
                      >
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={selectedScreens.includes(screen.id)}
                            onCheckedChange={() =>
                              handleScreenToggle(screen.id)
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-surface-1 rounded flex items-center justify-center">
                              <Monitor className="w-4 h-4 text-text-secondary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-text-primary">
                                {screen.name}
                              </div>
                              {screen.id > "5" && (
                                <Badge
                                  variant="secondary"
                                  className="bg-success-primary text-white text-xs"
                                >
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary">
                          {screen.store}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary">
                          {screen.city}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary">
                          {screen.state}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-secondary">
                          {screen.tags.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stroke flex justify-center">
              <Button
                className="bg-blue-primary hover:bg-blue-darker-1 text-white px-8"
                onClick={() => setShowScreenSelector(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Group Wizard */}
      <InstoreAdGroupWizard
        open={showAdGroupWizard}
        onClose={() => setShowAdGroupWizard(false)}
        onSave={handleSaveAdGroup}
        campaignName={campaignName}
      />
    </div>
  );
}
