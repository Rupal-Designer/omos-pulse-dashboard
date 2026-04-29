"use client";

import { Info, Clock, Zap, Calendar } from "lucide-react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hoursOfDay = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);

export function ConfigStep({ data, updateData }) {
  const updateConfig = (field, value) => {
    updateData({
      config: {
        ...data.config,
        [field]: value,
      },
    });
  };

  const toggleDayPart = (slot) => {
    const current = data.config.dayParting;
    const updated = current.includes(slot)
      ? current.filter((s) => s !== slot)
      : [...current, slot];
    updateConfig("dayParting", updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Configuration
        </h2>
        <p className="text-[#6b7280]">
          Fine-tune delivery settings for your ad group.
        </p>
      </div>

      {/* Frequency Capping */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={20} className="text-[#6b7280]" />
          <h4 className="font-medium text-[#2d2d2d]">Frequency Capping</h4>
          <Info size={14} className="text-[#9ca3af]" />
        </div>
        <p className="text-sm text-[#6b7280] mb-4">
          Limit how often a user sees your ad to prevent ad fatigue.
        </p>
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm text-[#6b7280] mb-2 block">
              Max impressions
            </label>
            <input
              type="number"
              value={data.config.frequencyCap}
              onChange={(e) => updateConfig("frequencyCap", e.target.value)}
              className="w-24 px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-[#6b7280] mb-2 block">Per</label>
            <select
              value={data.config.frequencyPeriod}
              onChange={(e) => updateConfig("frequencyPeriod", e.target.value)}
              className="px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm"
            >
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={20} className="text-[#6b7280]" />
          <h4 className="font-medium text-[#2d2d2d]">Delivery Type</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => updateConfig("deliveryType", "standard")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              data.config.deliveryType === "standard"
                ? "border-[#2563eb] bg-[#eff6ff]"
                : "border-[#e5e7eb] hover:border-[#d1d5db]"
            }`}
          >
            <h5
              className={`font-medium mb-1 ${
                data.config.deliveryType === "standard"
                  ? "text-[#2563eb]"
                  : "text-[#2d2d2d]"
              }`}
            >
              Standard
            </h5>
            <p className="text-xs text-[#6b7280]">
              Evenly distribute impressions throughout the day
            </p>
          </button>
          <button
            onClick={() => updateConfig("deliveryType", "accelerated")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              data.config.deliveryType === "accelerated"
                ? "border-[#2563eb] bg-[#eff6ff]"
                : "border-[#e5e7eb] hover:border-[#d1d5db]"
            }`}
          >
            <h5
              className={`font-medium mb-1 ${
                data.config.deliveryType === "accelerated"
                  ? "text-[#2563eb]"
                  : "text-[#2d2d2d]"
              }`}
            >
              Accelerated
            </h5>
            <p className="text-xs text-[#6b7280]">
              Deliver impressions as quickly as possible
            </p>
          </button>
        </div>
      </div>

      {/* Day Parting */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-[#6b7280]" />
          <h4 className="font-medium text-[#2d2d2d]">Day Parting</h4>
          <span className="text-xs text-[#9ca3af]">(Optional)</span>
        </div>
        <p className="text-sm text-[#6b7280] mb-4">
          Select specific days and hours when your ads should run.
        </p>

        <div className="flex gap-2 mb-4">
          {daysOfWeek.map((day) => {
            const isSelected = data.config.dayParting.some((d) =>
              d.startsWith(day),
            );
            return (
              <button
                key={day}
                onClick={() => {
                  if (isSelected) {
                    updateConfig(
                      "dayParting",
                      data.config.dayParting.filter((d) => !d.startsWith(day)),
                    );
                  } else {
                    updateConfig("dayParting", [
                      ...data.config.dayParting,
                      `${day}-all`,
                    ]);
                  }
                }}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                    : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {data.config.dayParting.length > 0 && (
          <div className="p-3 bg-[#f9fafb] rounded-lg">
            <p className="text-sm text-[#6b7280]">
              Ads will run on:{" "}
              {data.config.dayParting.map((d) => d.split("-")[0]).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
