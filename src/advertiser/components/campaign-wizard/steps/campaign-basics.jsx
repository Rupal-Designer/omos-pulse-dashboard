import { useState } from 'react';
import { Input, Icon, EyeIcon } from '../../../../ui';

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
const TrendingUpIcon = (props) => (
  <Icon {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </Icon>
);

const UsersIcon = (props) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Icon>
);

const ShoppingCartIcon = (props) => (
  <Icon {...props}>
    <circle cx="8" cy="21" r="1"/>
    <circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </Icon>
);

const TargetIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </Icon>
);

const MegaphoneIcon = (props) => (
  <Icon {...props}>
    <path d="M11 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/>
    <polyline points="11 5 19 3 19 21 11 19"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const objectives = [
  { id: 'awareness',     label: 'Brand Awareness', description: 'Increase visibility and reach new customers',  IconComp: EyeIcon         },
  { id: 'traffic',       label: 'Website Traffic',  description: 'Drive more visitors to your website',          IconComp: TrendingUpIcon   },
  { id: 'engagement',    label: 'Engagement',        description: 'Get more interactions with your content',      IconComp: UsersIcon        },
  { id: 'conversions',   label: 'Conversions',       description: 'Drive purchases and sign-ups',                 IconComp: ShoppingCartIcon },
  { id: 'retargeting',   label: 'Retargeting',       description: 'Re-engage previous visitors',                  IconComp: TargetIcon       },
  { id: 'product_sales', label: 'Product Sales',     description: 'Promote specific products',                    IconComp: MegaphoneIcon    },
];

// ── CampaignBasicsStep ────────────────────────────────────────────────────────
export function CampaignBasicsStep({ data, updateData }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Campaign Basics
        </h2>
        <p style={{ color: TEXT_MID }}>
          Give your campaign a name and select your primary objective.
        </p>
      </div>

      {/* Campaign Name */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ maxWidth: 480 }}>
          <Input
            label="Campaign Name"
            required
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Enter a descriptive name for your campaign"
          />
        </div>
        <p style={{ fontSize: 12, color: TEXT_SUB, marginTop: 8 }}>
          Use a clear name that helps you identify this campaign later (e.g., "Summer Sale 2025")
        </p>
      </div>

      {/* Campaign Objective */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 16 }}>
          Campaign Objective <span style={{ color: ERROR }}>*</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {objectives.map(({ id, label, description, IconComp }) => {
            const isSelected = data.objective === id;
            const isHovered  = hoveredId === id;
            return (
              <button
                key={id}
                onClick={() => updateData({ objective: id })}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: 20, borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSelected ? ACCENT : isHovered ? TEXT_MID : BORDER}`,
                  background: isSelected ? ACCENT_M : isHovered ? BG_SUB : BG,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: FONT,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12,
                  background: isSelected ? ACCENT : BG_SUB,
                }}>
                  <IconComp size={20} color={isSelected ? '#fff' : TEXT_MID} />
                </div>
                <h4 style={{
                  fontWeight: 500, marginBottom: 4, fontSize: 14,
                  color: isSelected ? ACCENT : TEXT,
                }}>
                  {label}
                </h4>
                <p style={{ fontSize: 12, color: TEXT_MID, margin: 0 }}>
                  {description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
