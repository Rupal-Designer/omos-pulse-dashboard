import { useState } from 'react';
import { Icon, CloseIcon, ChevronRightIcon } from '../../ui';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const GREEN     = 'var(--osmos-brand-green)';
const GREEN_M   = 'var(--osmos-brand-green-muted)';
const AMBER     = 'var(--osmos-brand-amber)';
const ERROR     = '#EF4444';     // intentional — critical alert color
const VI        = '#7c3aed';     // violet-primary — AI brand, no osmos token
const VI_BG     = 'rgba(124,58,237,0.12)';
const VI_HOVER  = '#6d28d9';
const VI_ICONS  = '#8b5cf6';

// ── Hand-rolled icons ─────────────────────────────────────────────────────────
const SparklesIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" /><path d="M19 17v4" />
    <path d="M3 5h4" /><path d="M17 19h4" />
  </Icon>
);

const LayoutGridIcon = ({ size = 16, color = '#fff' }) => (
  <Icon size={size} color={color}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Icon>
);

const ListIcon = ({ size = 16, color = '#fff' }) => (
  <Icon size={size} color={color}>
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </Icon>
);

const AlertTriangleIcon = ({ size = 18, color = ERROR }) => (
  <Icon size={size} color={color}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" /><path d="M12 17h.01" />
  </Icon>
);

const TrendingUpIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>
);

const DollarIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

const TargetIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);

const UsersIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const ZapIcon = ({ size = 16, color = VI_ICONS }) => (
  <Icon size={size} color={color}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);

// ── Mock data ─────────────────────────────────────────────────────────────────
const suggestions = [
  {
    id: '1', title: 'Increase Daily Budget',
    description: 'These campaigns are consistently hitting their daily budget caps before peak hours',
    affectedCount: 157, type: 'critical', category: 'budget',
    impact: '+23% potential impressions',
  },
  {
    id: '2', title: 'Expand Audience Targeting',
    description: 'Similar audiences are showing 40% better engagement rates',
    affectedCount: 89, type: 'warning', category: 'audience',
    impact: '+18% reach',
  },
  {
    id: '3', title: 'Optimize Bidding Strategy',
    description: 'Switching to target CPA could reduce cost per conversion',
    affectedCount: 45, type: 'warning', category: 'performance',
    impact: '-15% CPA',
  },
  {
    id: '4', title: 'Refresh Ad Creatives',
    description: 'Ad fatigue detected - CTR has dropped 25% in the last 2 weeks',
    affectedCount: 32, type: 'critical', category: 'creative',
    impact: '+30% CTR potential',
  },
  {
    id: '5', title: 'Adjust Targeting Keywords',
    description: 'Negative keywords could save budget on irrelevant clicks',
    affectedCount: 78, type: 'info', category: 'targeting',
    impact: '-12% wasted spend',
  },
  {
    id: '6', title: 'Schedule Optimization',
    description: 'Peak performance hours identified - consider dayparting',
    affectedCount: 120, type: 'info', category: 'performance',
    impact: '+20% conversion rate',
  },
];

const CATEGORY_ICONS = {
  budget:      <DollarIcon />,
  targeting:   <TargetIcon />,
  performance: <TrendingUpIcon />,
  audience:    <UsersIcon />,
  creative:    <ZapIcon />,
};

const TYPE_STYLE = {
  critical: { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)' },
  warning:  { bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.3)' },
  info:     { bg: BG_SUBTLE,               border: BORDER },
};

// ── AISuggestionsPanel ────────────────────────────────────────────────────────
export function AISuggestionsPanel({ open, onClose }) {
  const [viewMode,          setViewMode]         = useState('list');
  const [selectedCategory,  setSelectedCategory] = useState(null);

  if (!open) return null;

  const criticalCount      = suggestions.filter((s) => s.type === 'critical').length;
  const filteredSuggestions = selectedCategory
    ? suggestions.filter((s) => s.category === selectedCategory)
    : suggestions;

  const CATEGORIES = ['budget', 'targeting', 'performance', 'audience', 'creative'];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 40,
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        height: '100%', width: 420,
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)', zIndex: 50,
        display: 'flex', flexDirection: 'column',
        backgroundColor: BG, fontFamily: FONT,
      }}>
        {/* ── Gradient header ── */}
        <div style={{
          padding: 16, color: '#fff',
          background: `linear-gradient(135deg, ${VI} 0%, ${VI_ICONS} 50%, #5b21b6 100%)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronRightIcon size={20} color="#fff" />
              <SparklesIcon size={20} color="#fff" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                {suggestions.length} Suggestions by Sofie ({criticalCount} Critical)
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: 4, borderRadius: 4, border: 'none',
                background: 'transparent', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <CloseIcon size={20} color="#fff" />
            </button>
          </div>

          {/* View mode toggle — card / list */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8,
            padding: 4, width: 'fit-content',
          }}>
            {[{ mode: 'card', Icon: LayoutGridIcon }, { mode: 'list', Icon: ListIcon }].map(({ mode, Icon: Ic }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: 8, borderRadius: 4, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  backgroundColor: viewMode === mode ? 'rgba(255,255,255,0.3)' : 'transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (viewMode !== mode) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (viewMode !== mode) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Ic size={16} color="#fff" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Category filters ── */}
        <div style={{
          padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap',
          borderBottom: `1px solid ${BORDER}`,
        }}>
          {/* All */}
          <CategoryChip
            label={`All (${suggestions.length})`}
            active={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          />
          {CATEGORIES.map((cat) => {
            const count = suggestions.filter((s) => s.category === cat).length;
            if (count === 0) return null;
            return (
              <CategoryChip
                key={cat}
                label={`${cat} (${count})`}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            );
          })}
        </div>

        {/* ── Suggestions list ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredSuggestions.map((s) => {
            const ts = TYPE_STYLE[s.type] || TYPE_STYLE.info;
            return (
              <div
                key={s.id}
                style={{
                  padding: 16, borderRadius: 8, cursor: 'pointer',
                  border: `1px solid ${ts.border}`,
                  backgroundColor: ts.bg,
                  transition: 'box-shadow 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ color: VI_ICONS }}>
                        {CATEGORY_ICONS[s.category] || <SparklesIcon size={16} />}
                      </span>
                      <h4 style={{ margin: 0, fontWeight: 600, fontSize: 13, color: TEXT }}>{s.title}</h4>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: 13, color: TEXT_MID }}>
                      in {s.affectedCount} campaigns
                    </p>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: TEXT_MID }}>
                      {s.description}
                    </p>
                    {/* Impact chip */}
                    <span style={{
                      display: 'inline-block', padding: '4px 8px', fontSize: 11,
                      borderRadius: 4, fontWeight: 500,
                      backgroundColor: GREEN_M, color: GREEN,
                    }}>
                      {s.impact}
                    </span>
                  </div>

                  {/* Right — alert icon + chevron */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.type === 'critical' && <AlertTriangleIcon size={18} color={ERROR} />}
                    {s.type === 'warning'  && <AlertTriangleIcon size={18} color={AMBER} />}
                    <ChevronRightIcon size={18} color={TEXT_MID} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <div style={{ padding: 16, borderTop: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE }}>
          <button
            style={{
              width: '100%', padding: '10px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              border: 'none', borderRadius: 8,
              backgroundColor: VI, color: '#fff',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = VI_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = VI)}
          >
            <SparklesIcon size={16} color="#fff" />
            Apply All Recommendations
          </button>
        </div>
      </div>
    </>
  );
}

// ── CategoryChip ──────────────────────────────────────────────────────────────
function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px', borderRadius: 999, border: 'none',
        fontSize: 12, fontWeight: 500, textTransform: 'capitalize',
        cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT,
        backgroundColor: active ? VI : VI_BG,
        color: active ? '#fff' : VI,
      }}
      onMouseEnter={(e) => { if (active) e.currentTarget.style.backgroundColor = VI_HOVER; }}
      onMouseLeave={(e) => { if (active) e.currentTarget.style.backgroundColor = VI; }}
    >
      {label}
    </button>
  );
}
