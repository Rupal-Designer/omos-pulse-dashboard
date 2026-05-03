import { useState } from 'react';
import { Icon, NavShell, OsmosLogoMark } from '../../ui';

// ── Design tokens (icon colour only — layout handled by NavShell) ─────────────
const WHITE   = '#fff';
const WHITE70 = 'rgba(255,255,255,0.7)';

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
  const currentRoute = window.location.hash.replace(/^#/, '') || '/';

  const NAV_ITEMS = [
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: <RocketNavIcon />,
      subItems: CAMPAIGN_SUB_ITEMS.map(s => ({
        id: s.label,
        label: s.label,
        icon: <s.IconComp />,
        active: activeAdType === s.label,
        onClick: () => {
          onAdTypeChange?.(s.label);
          if (onNavigate) onNavigate('/');
        },
      })),
    },
    {
      id: 'byot',
      label: 'BYOT',
      icon: <LinkNavIcon />,
      badge: 'Beta',
      active: currentRoute === '/byot',
    },
    { id: 'packages',        label: 'Packages',        icon: <LayoutGridNavIcon />, hasSub: true, badge: 'Alpha' },
    { id: 'finance',         label: 'Finance',         icon: <DollarNavIcon />,     hasSub: true },
    { id: 'activity-center', label: 'Activity Center', icon: <ActivityNavIcon />,   hasSub: true },
    { id: 'help-center',     label: 'Help Center',     icon: <HelpNavIcon />,       hasSub: true },
  ];

  const BOTTOM_ITEMS = [
    { id: 'settings', label: 'Settings', icon: <SettingsNavIcon />, hasSub: true },
  ];

  function handleSelect(id) {
    if (id === 'byot') {
      if (onNavigate) onNavigate('/byot');
      else window.location.hash = '/byot';
    }
  }

  const activeId = currentRoute === '/byot' ? 'byot' : 'campaigns';

  return (
    <NavShell
      items={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      activeId={activeId}
      onSelect={handleSelect}
      logoMark={<OsmosLogoMark size={36} />}
      logoText="OSMOS"
      userInitial="A"
    />
  );
}
