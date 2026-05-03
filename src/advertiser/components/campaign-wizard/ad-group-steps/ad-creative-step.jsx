import { useState } from 'react';
import { Button, Input, Select, FileIcon, PlusIcon, TrashIcon, UploadIcon, Icon } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const ERROR    = 'var(--alert-error-primary)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const ImageIcon = (props) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </Icon>
);

const VideoIcon = (props) => (
  <Icon {...props}>
    <path d="m22 8-6 4 6 4V8z"/>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const adFormats = [
  { id: 'banner',   label: 'Banner Ad',   description: 'Standard display banner',  IconComp: ImageIcon, sizes: ['728x90', '300x250', '160x600'] },
  { id: 'native',   label: 'Native Ad',   description: 'Blends with content',       IconComp: FileIcon,  sizes: ['Responsive']                   },
  { id: 'video',    label: 'Video Ad',    description: 'Engaging video content',    IconComp: VideoIcon, sizes: ['16:9', '1:1', '9:16']           },
  { id: 'carousel', label: 'Carousel Ad', description: 'Multiple images',           IconComp: ImageIcon, sizes: ['1080x1080']                     },
];

const ctaOptions = [
  { value: 'Shop Now',   label: 'Shop Now'   },
  { value: 'Learn More', label: 'Learn More' },
  { value: 'Buy Now',    label: 'Buy Now'    },
  { value: 'Get Started',label: 'Get Started'},
  { value: 'Sign Up',    label: 'Sign Up'    },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function UploadZone() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `2px dashed ${hov ? ACCENT : BORDER}`,
        borderRadius: 8, padding: 24, textAlign: 'center',
        cursor: 'pointer', transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <UploadIcon size={24} color={TEXT_SUB} />
      </div>
      <p style={{ fontSize: 13, color: TEXT_MID }}>Click to upload or drag and drop</p>
      <p style={{ fontSize: 12, color: TEXT_SUB }}>PNG, JPG up to 5MB</p>
    </div>
  );
}

function RemoveBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', top: 12, right: 12,
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', borderRadius: 6,
        background: hov ? 'rgba(239,68,68,0.08)' : 'transparent',
        color: ERROR, cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      <TrashIcon size={14} color={ERROR} />
    </button>
  );
}

// ── AdCreativeStep ────────────────────────────────────────────────────────────
export function AdCreativeStep({ data, updateData }) {
  const [hoveredFormat, setHoveredFormat] = useState(null);

  const updateCreative = (index, field, value) => {
    const updated = [...data.creatives];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ creatives: updated });
  };

  const addCreative = () => {
    updateData({ creatives: [...data.creatives, { headline: '', description: '', ctaText: 'Shop Now' }] });
  };

  const removeCreative = (index) => {
    if (data.creatives.length > 1) {
      updateData({ creatives: data.creatives.filter((_, i) => i !== index) });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Ad Creative
        </h2>
        <p style={{ color: TEXT_MID }}>
          Choose your ad format and create compelling ad content.
        </p>
      </div>

      {/* Ad Format Selection */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <h4 style={{ fontWeight: 500, color: TEXT, marginBottom: 16 }}>Select Ad Format</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {adFormats.map(({ id, label, description, IconComp, sizes }) => {
            const isSelected = data.adFormat === id;
            const isHovered  = hoveredFormat === id;
            return (
              <button
                key={id}
                onClick={() => updateData({ adFormat: id })}
                onMouseEnter={() => setHoveredFormat(id)}
                onMouseLeave={() => setHoveredFormat(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: 16, borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSelected ? ACCENT : BG_SUB,
                }}>
                  <IconComp size={20} color={isSelected ? '#fff' : TEXT_MID} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 500, marginBottom: 4, color: isSelected ? ACCENT : TEXT }}>
                    {label}
                  </h4>
                  <p style={{ fontSize: 12, color: TEXT_MID, marginBottom: 8 }}>{description}</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {sizes.map((size) => (
                      <span key={size} style={{
                        padding: '2px 8px', background: BG_SUB,
                        color: TEXT_MID, fontSize: 10, borderRadius: 4,
                      }}>
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
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h4 style={{ fontWeight: 500, color: TEXT }}>Ad Content</h4>
          <Button variant="outline" onClick={addCreative} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <PlusIcon size={14} color={ACCENT} />
            Add Variation
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {data.creatives.map((creative, index) => (
            <div key={index} style={{ position: 'relative', padding: 16, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
              {data.creatives.length > 1 && (
                <RemoveBtn onClick={() => removeCreative(index)} />
              )}

              <span style={{ fontSize: 12, fontWeight: 500, color: TEXT_MID, display: 'block', marginBottom: 12 }}>
                Creative {index + 1}
              </span>

              {/* Image Upload */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>
                  Ad Image
                </label>
                <UploadZone />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <Input
                  label="Headline"
                  value={creative.headline}
                  onChange={(e) => updateCreative(index, 'headline', e.target.value)}
                  placeholder="Enter headline"
                />
                <Select
                  label="CTA Button"
                  value={creative.ctaText}
                  onChange={(e) => updateCreative(index, 'ctaText', e.target.value)}
                  options={ctaOptions}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: TEXT, marginBottom: 8 }}>
                  Description
                </label>
                <textarea
                  value={creative.description}
                  onChange={(e) => updateCreative(index, 'description', e.target.value)}
                  placeholder="Enter ad description"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '8px 12px', border: `1px solid ${BORDER}`,
                    borderRadius: 8, fontSize: 13, color: TEXT,
                    background: BG, fontFamily: FONT, outline: 'none',
                    resize: 'none', height: 80,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
