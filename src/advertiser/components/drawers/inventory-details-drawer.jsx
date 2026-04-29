"use client";

import { useState } from "react";
import { X, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const adSlots = [
  {
    id: "slot-1",
    name: "Header Banner",
    position: "Top of page",
    dimensions: "728x90",
    avgCTR: "2.4%",
    avgCPM: "$4.50",
    dailyImpressions: "125K",
    viewability: "92%",
  },
  {
    id: "slot-2",
    name: "Sidebar Rectangle",
    position: "Right sidebar",
    dimensions: "300x250",
    avgCTR: "1.8%",
    avgCPM: "$3.20",
    dailyImpressions: "98K",
    viewability: "85%",
  },
  {
    id: "slot-3",
    name: "In-Content Banner",
    position: "Within content",
    dimensions: "728x90",
    avgCTR: "2.1%",
    avgCPM: "$3.80",
    dailyImpressions: "110K",
    viewability: "88%",
  },
  {
    id: "slot-4",
    name: "Native Product Carousel",
    position: "Below hero",
    dimensions: "Responsive",
    avgCTR: "3.2%",
    avgCPM: "$5.50",
    dailyImpressions: "145K",
    viewability: "94%",
  },
  {
    id: "slot-5",
    name: "Footer Leaderboard",
    position: "Page footer",
    dimensions: "970x90",
    avgCTR: "0.9%",
    avgCPM: "$1.80",
    dailyImpressions: "180K",
    viewability: "65%",
  },
  {
    id: "slot-6",
    name: "Sticky Bottom Banner",
    position: "Fixed bottom",
    dimensions: "320x50",
    avgCTR: "1.5%",
    avgCPM: "$2.40",
    dailyImpressions: "200K",
    viewability: "98%",
  },
];

export function InventoryDetailsDrawer({ open, onClose, page }) {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId],
    );
  };

  const selectAll = () => {
    if (selectedSlots.length === adSlots.length) {
      setSelectedSlots([]);
    } else {
      setSelectedSlots(adSlots.map((slot) => slot.id));
    }
  };

  if (!open || !page) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/15" onClick={onClose} />
      <div
        className="fixed right-0 top-0 z-[70] h-full bg-[#f4f6f9] shadow-xl flex flex-col transition-transform duration-300"
        style={{ width: "70%" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e7eb]">
          <div>
            <h2 className="text-lg font-semibold text-[#2d2d2d]">
              {page.name} - Ad Slots
            </h2>
            <p className="text-sm text-[#6b7280]">
              Select specific ad placement locations
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#2d2d2d] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Page Summary */}
        <div className="px-6 py-4 bg-white border-b border-[#e5e7eb]">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-xs text-[#6b7280] uppercase tracking-wider">
                Est. Daily Impressions
              </span>
              <p className="text-lg font-semibold text-[#2d2d2d]">
                {page.estDailyImp}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#6b7280] uppercase tracking-wider">
                Total Slots
              </span>
              <p className="text-lg font-semibold text-[#2d2d2d]">
                {page.totalInventories}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#6b7280] uppercase tracking-wider">
                Targeting Options
              </span>
              <p className="text-lg font-semibold text-[#2d2d2d]">
                {page.targetingOptions}
              </p>
            </div>
            <div className="flex gap-2">
              {page.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-[#eff6ff] text-[#2563eb] rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
            {/* Table Header */}
            <div className="px-5 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={selectAll}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedSlots.length === adSlots.length
                      ? "bg-[#2563eb] border-[#2563eb]"
                      : "border-[#d1d5db] hover:border-[#9ca3af]"
                  }`}
                >
                  {selectedSlots.length === adSlots.length && (
                    <Check size={12} className="text-white" />
                  )}
                </button>
                <span className="font-semibold text-[#2d2d2d]">
                  Available Ad Slots
                </span>
                <span className="text-xs bg-[#e5e7eb] text-[#6b7280] px-2 py-0.5 rounded-full">
                  {selectedSlots.length} selected
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] bg-transparent"
              >
                <Eye size={14} className="mr-1" />
                Preview Page
              </Button>
            </div>

            {/* Slots Grid */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {adSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedSlots.includes(slot.id)
                        ? "border-[#2563eb] bg-[#eff6ff] shadow-sm"
                        : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:shadow-sm"
                    }`}
                    onClick={() => toggleSlot(slot.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedSlots.includes(slot.id)
                            ? "bg-[#2563eb] border-[#2563eb]"
                            : "border-[#d1d5db]"
                        }`}
                      >
                        {selectedSlots.includes(slot.id) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[#2d2d2d]">
                            {slot.name}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-[#f3f4f6] text-[#6b7280] rounded">
                            {slot.dimensions}
                          </span>
                        </div>
                        <p className="text-sm text-[#6b7280] mb-3">
                          {slot.position}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#9ca3af]">Avg CTR</span>
                            <span className="text-[#16a34a] font-medium">
                              {slot.avgCTR}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9ca3af]">Avg CPM</span>
                            <span className="text-[#2d2d2d] font-medium">
                              {slot.avgCPM}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9ca3af]">Daily Imp</span>
                            <span className="text-[#2d2d2d] font-medium">
                              {slot.dailyImpressions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9ca3af]">Viewability</span>
                            <span
                              className={`font-medium ${
                                Number.parseInt(slot.viewability) >= 90
                                  ? "text-[#16a34a]"
                                  : Number.parseInt(slot.viewability) >= 80
                                    ? "text-[#d97706]"
                                    : "text-[#ef4444]"
                              }`}
                            >
                              {slot.viewability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#e5e7eb] flex justify-between items-center">
          <div className="text-sm text-[#6b7280]">
            <span className="font-semibold text-[#2d2d2d]">
              {selectedSlots.length}
            </span>{" "}
            slots selected
            {selectedSlots.length > 0 && (
              <span className="ml-2">
                • Est. combined impressions:{" "}
                <span className="font-semibold text-[#2d2d2d]">485K/day</span>
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="px-6 border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] bg-transparent"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              onClick={onClose}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
