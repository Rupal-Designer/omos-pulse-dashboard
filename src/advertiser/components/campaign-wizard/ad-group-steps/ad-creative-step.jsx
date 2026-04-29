"use client";
import { ImageIcon, Video, FileText, Plus, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const adFormats = [
  {
    id: "banner",
    label: "Banner Ad",
    description: "Standard display banner",
    icon: ImageIcon,
    sizes: ["728x90", "300x250", "160x600"],
  },
  {
    id: "native",
    label: "Native Ad",
    description: "Blends with content",
    icon: FileText,
    sizes: ["Responsive"],
  },
  {
    id: "video",
    label: "Video Ad",
    description: "Engaging video content",
    icon: Video,
    sizes: ["16:9", "1:1", "9:16"],
  },
  {
    id: "carousel",
    label: "Carousel Ad",
    description: "Multiple images",
    icon: ImageIcon,
    sizes: ["1080x1080"],
  },
];

export function AdCreativeStep({ data, updateData }) {
  const updateCreative = (index, field, value) => {
    const updated = [...data.creatives];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ creatives: updated });
  };

  const addCreative = () => {
    updateData({
      creatives: [
        ...data.creatives,
        { headline: "", description: "", ctaText: "Shop Now" },
      ],
    });
  };

  const removeCreative = (index) => {
    if (data.creatives.length > 1) {
      updateData({
        creatives: data.creatives.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-2">
          Ad Creative
        </h2>
        <p className="text-[#6b7280]">
          Choose your ad format and create compelling ad content.
        </p>
      </div>

      {/* Ad Format Selection */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <h4 className="font-medium text-[#2d2d2d] mb-4">Select Ad Format</h4>
        <div className="grid grid-cols-2 gap-4">
          {adFormats.map((format) => {
            const Icon = format.icon;
            const isSelected = data.adFormat === format.id;
            return (
              <button
                key={format.id}
                onClick={() => updateData({ adFormat: format.id })}
                className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                  isSelected
                    ? "border-[#2563eb] bg-[#eff6ff]"
                    : "border-[#e5e7eb] hover:border-[#d1d5db]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-[#2563eb] text-white"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4
                    className={`font-medium mb-1 ${isSelected ? "text-[#2563eb]" : "text-[#2d2d2d]"}`}
                  >
                    {format.label}
                  </h4>
                  <p className="text-xs text-[#6b7280] mb-2">
                    {format.description}
                  </p>
                  <div className="flex gap-1">
                    {format.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-0.5 bg-[#f3f4f6] text-[#6b7280] text-[10px] rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Creative Content */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-[#2d2d2d]">Ad Content</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={addCreative}
            className="gap-1 bg-transparent"
          >
            <Plus size={14} />
            Add Variation
          </Button>
        </div>

        <div className="space-y-6">
          {data.creatives.map((creative, index) => (
            <div
              key={index}
              className="p-4 border border-[#e5e7eb] rounded-lg relative"
            >
              {data.creatives.length > 1 && (
                <button
                  onClick={() => removeCreative(index)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-[#ef4444] hover:bg-[#fef2f2] rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <span className="text-xs font-medium text-[#6b7280] mb-3 block">
                Creative {index + 1}
              </span>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="text-sm text-[#2d2d2d] mb-2 block">
                  Ad Image
                </label>
                <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center hover:border-[#2563eb] transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-[#9ca3af] mb-2" />
                  <p className="text-sm text-[#6b7280]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[#9ca3af]">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#2d2d2d] mb-2 block">
                    Headline
                  </label>
                  <Input
                    value={creative.headline}
                    onChange={(e) =>
                      updateCreative(index, "headline", e.target.value)
                    }
                    placeholder="Enter headline"
                    className="border-[#e5e7eb]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#2d2d2d] mb-2 block">
                    CTA Button
                  </label>
                  <select
                    value={creative.ctaText}
                    onChange={(e) =>
                      updateCreative(index, "ctaText", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm"
                  >
                    <option>Shop Now</option>
                    <option>Learn More</option>
                    <option>Buy Now</option>
                    <option>Get Started</option>
                    <option>Sign Up</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-[#2d2d2d] mb-2 block">
                  Description
                </label>
                <textarea
                  value={creative.description}
                  onChange={(e) =>
                    updateCreative(index, "description", e.target.value)
                  }
                  placeholder="Enter ad description"
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm resize-none h-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
