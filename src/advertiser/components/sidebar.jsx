import { useState } from 'react';
import { Icon, ChevronRightIcon } from '../../ui';

// ── Design tokens ────────────────────────────────────────────────────────────
const NAV_GRAD   = 'linear-gradient(to bottom, #3d4a99, #1e1f5e)';
const FONT       = "'Open Sans', sans-serif";
const WHITE      = '#fff';
const WHITE70    = 'rgba(255,255,255,0.7)';
const WHITE50    = 'rgba(255,255,255,0.5)';
const WHITE20    = 'rgba(255,255,255,0.2)';
const WHITE10    = 'rgba(255,255,255,0.1)';
const ACTIVE_BG  = 'rgba(99,102,241,0.3)';  // #6366f1 @ 30% — nav item active
const SUBNAV_ACT = '#6366f1';                // sub-item active fill

// ── Hand-rolled icon components (Lucide SVG paths, stroke-only) ──────────────
const RocketNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>
);

const CartNavIcon = ({ size = 18, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Icon>
);

const ImageNavIcon = ({ size = 18, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </Icon>
);

const MegaphoneNavIcon = ({ size = 18, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Icon>
);

const MonitorPlayNavIcon = ({ size = 18, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="m10 8 6 4-6 4V8z" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
  </Icon>
);

const MessageNavIcon = ({ size = 18, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

const LayoutGridNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Icon>
);

const DollarNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

const ActivityNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </Icon>
);

const HelpNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </Icon>
);

const SettingsNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const ChevUpNavIcon = ({ size = 16, color = WHITE50 }) => (
  <Icon size={size} color={color}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
);

// ── Sub-item data (component refs, not JSX — so NavItem controls icon color) ─
const CAMPAIGN_SUB_ITEMS = [
  { IconComp: CartNavIcon,        label: 'Product Ads' },
  { IconComp: ImageNavIcon,       label: 'Display Ads' },
  { IconComp: MegaphoneNavIcon,   label: 'Sponsorship Ads' },
  { IconComp: MonitorPlayNavIcon, label: 'Offsite Ads' },
  { IconComp: MessageNavIcon,     label: 'In-Store Digital Ads' },
];

// ── BYOT nav icon ─────────────────────────────────────────────────────────────
const LinkNavIcon = ({ size = 20, color = WHITE70 }) => (
  <Icon size={size} color={color}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Icon>
);

// ── Sidebar ───────────────────────────────────────────────────────────────────
export function Sidebar({ onAdTypeChange, activeAdType = 'Product Ads', onNavigate }) {
  const [isExpanded, setIsExpanded]       = useState(false);
  const [campaignsOpen, setCampaignsOpen] = useState(true);
  const currentRoute = window.location.hash.replace(/^#/, '') || '/';

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        width: isExpanded ? 256 : 64,
        background: NAV_GRAD,
        display: 'flex', flexDirection: 'column',
        padding: '16px 0',
        height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 40,
        overflowY: 'auto',
        transition: 'width 0.3s',
        fontFamily: FONT,
      }}
    >
      {/* Brand logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 12px', marginBottom: 24,
        justifyContent: isExpanded ? 'flex-start' : 'center',
      }}>
        <div style={{
          width: 40, height: 40, flexShrink: 0,
          background: WHITE20, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: WHITE, fontSize: 12, fontWeight: 500 }}>QA</span>
        </div>
        {isExpanded && (
          <span style={{ color: WHITE, fontWeight: 600, fontSize: 18 }}>QA</span>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
        {/* Campaigns (expandable) */}
        <NavItem
          IconComp={RocketNavIcon}
          label="Campaigns"
          expanded={isExpanded}
          hasSubmenu
          isOpen={campaignsOpen}
          active={campaignsOpen}
          onClick={() => setCampaignsOpen(!campaignsOpen)}
        />

        {/* Campaigns sub-items — only visible when sidebar and campaigns are open */}
        {isExpanded && campaignsOpen && (
          <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
            {CAMPAIGN_SUB_ITEMS.map((item) => (
              <SubItem
                key={item.label}
                IconComp={item.IconComp}
                label={item.label}
                active={activeAdType === item.label}
                onClick={() => {
                  onAdTypeChange && onAdTypeChange(item.label);
                  // Navigate to dashboard when changing ad type from a non-dashboard page (e.g. BYOT)
                  if (onNavigate) onNavigate('/');
                }}
              />
            ))}
          </div>
        )}

        <NavItem
          IconComp={LinkNavIcon}
          label="BYOT"
          expanded={isExpanded}
          active={currentRoute === '/byot'}
          onClick={() => { if (onNavigate) onNavigate('/byot'); else window.location.hash = '/byot'; }}
          badge="Beta"
        />
        <NavItem IconComp={LayoutGridNavIcon} label="Packages"        expanded={isExpanded} hasSubmenu badge="Alpha" />
        <NavItem IconComp={DollarNavIcon}     label="Finance"         expanded={isExpanded} hasSubmenu />
        <NavItem IconComp={ActivityNavIcon}   label="Activity Center" expanded={isExpanded} hasSubmenu />
        <NavItem IconComp={HelpNavIcon}       label="Help Center"     expanded={isExpanded} hasSubmenu />
      </div>

      {/* Settings pinned to bottom */}
      <div style={{ padding: '0 8px', marginTop: 'auto' }}>
        <NavItem IconComp={SettingsNavIcon} label="Settings" expanded={isExpanded} hasSubmenu />
      </div>
    </div>
  );
}

// ── NavItem ───────────────────────────────────────────────────────────────────
function NavItem({ IconComp, label, active, expanded, hasSubmenu, isOpen, onClick, badge }) {
  const [hover, setHover] = useState(false);
  const iconColor = active ? WHITE : WHITE70;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 8,
        cursor: 'pointer', transition: 'all 0.15s',
        background: active ? ACTIVE_BG : (hover ? WHITE10 : 'transparent'),
        justifyContent: expanded ? 'flex-start' : 'center',
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0 }}>
        <IconComp size={20} color={iconColor} />
      </div>

      {/* Label + badge + chevron (only when expanded) */}
      {expanded && (
        <>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: iconColor }}>
            {label}
          </span>
          {badge && (
            <span style={{
              padding: '2px 8px', background: '#f45858',
              color: WHITE, fontSize: 11, borderRadius: 999,
            }}>
              {badge}
            </span>
          )}
          {hasSubmenu && (
            <div>
              {isOpen
                ? <ChevUpNavIcon size={16} color={WHITE50} />
                : <ChevronRightIcon size={16} color={WHITE50} />
              }
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── SubItem ───────────────────────────────────────────────────────────────────
function SubItem({ IconComp, label, active, onClick }) {
  const [hover, setHover] = useState(false);
  const bg    = active ? SUBNAV_ACT : (hover ? WHITE10 : 'transparent');
  const color = active || hover ? WHITE : WHITE70;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 12px', borderRadius: 8,
        cursor: 'pointer', transition: 'all 0.15s',
        background: bg,
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <IconComp size={18} color={color} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color }}>{label}</span>
    </div>
  );
}
