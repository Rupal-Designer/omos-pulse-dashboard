"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { InteractiveDashboard } from "@/components/design-system/interactive-dashboard";
import { CampaignTable } from "@/components/campaign-table";
import { PerformanceTable } from "@/components/performance-table";

export default function DashboardPage() {
  const [activeAdType, setActiveAdType] = useState("Product Ads");

  const handleAdTypeChange = (adType) => {
    setActiveAdType(adType);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#edf0f5]">
      <Sidebar
        onAdTypeChange={handleAdTypeChange}
        activeAdType={activeAdType}
      />
      <div className="flex-1 flex flex-col ml-16 min-w-0">
        <div className="sticky top-0 z-30 bg-white">
          <Header activeAdType={activeAdType} />
        </div>
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary">
          <InteractiveDashboard
            activeAdType={activeAdType}
            onAdTypeChange={handleAdTypeChange}
            initialSelectedMetrics={["CTR", "Ad Clicks"]}
          />

          <CampaignTable activeAdType={activeAdType} />
          <PerformanceTable />
        </main>
      </div>
    </div>
  );
}
