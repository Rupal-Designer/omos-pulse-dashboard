"use client";

import { Calendar, Clock, Info } from "lucide-react";

export function ScheduleStep({ data, updateData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Campaign Schedule
        </h2>
        <p className="text-[#6b7280]">
          Set when your campaign should start and end.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Start Date <span className="text-[#ef4444]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => updateData({ startDate: e.target.value })}
                className="w-full px-4 py-3 pl-11 border border-[#e5e7eb] rounded-lg text-[#2d2d2d] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none"
              />

              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2563eb]"
              />
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">
              Campaign will start at 12:00 AM on this date
            </p>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              End Date{" "}
              <span className="text-[#9ca3af] text-xs italic">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={data.endDate}
                onChange={(e) => updateData({ endDate: e.target.value })}
                className="w-full px-4 py-3 pl-11 border border-[#e5e7eb] rounded-lg text-[#2d2d2d] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none"
              />

              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2563eb]"
              />
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">
              Leave empty for an ongoing campaign
            </p>
          </div>
        </div>

        {/* Timezone Info */}
        <div className="mt-6 p-4 bg-[#eff6ff] rounded-lg flex items-start gap-3">
          <Info size={16} className="text-[#2563eb] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-[#2d2d2d] font-medium">Timezone</p>
            <p className="text-xs text-[#6b7280]">
              All dates and times will be set in{" "}
              <span className="font-medium">Asia/Kolkata (IST)</span> timezone.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Schedule Options */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <label className="block text-sm font-medium text-[#2d2d2d] mb-4">
          Quick Schedule
        </label>
        <div className="flex gap-3">
          {[
            { label: "Start Today", days: 0 },
            { label: "Start Tomorrow", days: 1 },
            { label: "Start Next Week", days: 7 },
          ].map((option) => {
            const date = new Date();
            date.setDate(date.getDate() + option.days);
            const dateStr = date.toISOString().split("T")[0];
            return (
              <button
                key={option.label}
                onClick={() => updateData({ startDate: dateStr })}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  data.startDate === dateStr
                    ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                    : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                }`}
              >
                <Clock size={14} className="inline mr-2" />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
