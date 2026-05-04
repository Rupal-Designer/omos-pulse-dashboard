import { NavShell, OsmosLogoMark } from '../../ui';

// ── Raw SVG path fragments (NavShell wraps these in <Icon size={20}>) ─────────
const ICON_ROCKET = <>
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
</>;

const ICON_CART = <>
  <circle cx="8" cy="21" r="1" />
  <circle cx="19" cy="21" r="1" />
  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
</>;

const ICON_IMAGE = <>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</>;

const ICON_MEGAPHONE = <>
  <path d="m3 11 18-5v12L3 14v-3z" />
  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
</>;

const ICON_MONITOR_PLAY = <>
  <rect x="2" y="3" width="20" height="14" rx="2" />
  <path d="m10 8 6 4-6 4V8z" />
  <path d="M12 17v4" />
  <path d="M8 21h8" />
</>;

const ICON_MESSAGE = <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;

const ICON_LAYOUT_GRID = <>
  <rect width="7" height="7" x="3" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="14" rx="1" />
  <rect width="7" height="7" x="3" y="14" rx="1" />
</>;

const ICON_DOLLAR = <>
  <line x1="12" x2="12" y1="2" y2="22" />
  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
</>;

const ICON_ACTIVITY = <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />;

const ICON_HELP = <>
  <circle cx="12" cy="12" r="10" />
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
  <path d="M12 17h.01" />
</>;

const ICON_SETTINGS = <>
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
  <circle cx="12" cy="12" r="3" />
</>;

const ICON_LINK = <>
  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
</>;

const ICON_SLIDERS = <>
  <line x1="4" y1="21" x2="4" y2="14" />
  <line x1="4" y1="10" x2="4" y2="3" />
  <line x1="12" y1="21" x2="12" y2="12" />
  <line x1="12" y1="8" x2="12" y2="3" />
  <line x1="20" y1="21" x2="20" y2="16" />
  <line x1="20" y1="12" x2="20" y2="3" />
  <line x1="1" y1="14" x2="7" y2="14" />
  <line x1="9" y1="8" x2="15" y2="8" />
  <line x1="17" y1="16" x2="23" y2="16" />
</>;

// ── Sub-item icon constants ───────────────────────────────────────────────────
const CAMPAIGN_SUB_ITEMS = [
  { icon: ICON_CART,         label: 'Product Ads' },
  { icon: ICON_IMAGE,        label: 'Display Ads' },
  { icon: ICON_MEGAPHONE,    label: 'Sponsorship Ads' },
  { icon: ICON_MONITOR_PLAY, label: 'Offsite Ads' },
  { icon: ICON_MESSAGE,      label: 'In-Store Digital Ads' },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
export function Sidebar({ onAdTypeChange, activeAdType = 'Product Ads', onNavigate }) {
  const currentRoute = window.location.hash.replace(/^#/, '') || '/';

  const isYieldRoute = currentRoute === '/yield-control/cpc' || currentRoute === '/yield-control/cpm';

  function navigate(path) {
    if (onNavigate) onNavigate(path);
    else window.location.hash = path;
  }

  const NAV_ITEMS = [
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: ICON_ROCKET,
      subItems: CAMPAIGN_SUB_ITEMS.map(s => ({
        id: s.label,
        label: s.label,
        icon: s.icon,
        active: !isYieldRoute && activeAdType === s.label && (currentRoute === '/' || currentRoute === ''),
        onClick: () => {
          onAdTypeChange?.(s.label);
          navigate('/');
        },
      })),
    },
    {
      id: 'yield-control',
      label: 'Yield Control',
      icon: ICON_SLIDERS,
      subItems: [
        {
          id: 'cpc-controls',
          label: 'CPC Controls',
          active: currentRoute === '/yield-control/cpc',
          onClick: () => navigate('/yield-control/cpc'),
        },
        {
          id: 'cpm-controls',
          label: 'CPM Controls',
          active: currentRoute === '/yield-control/cpm',
          onClick: () => navigate('/yield-control/cpm'),
        },
      ],
    },
    {
      id: 'byot',
      label: 'BYOT',
      icon: ICON_LINK,
      badge: 'Beta',
      active: currentRoute === '/byot',
    },
    { id: 'packages',        label: 'Packages',        icon: ICON_LAYOUT_GRID, hasSub: true, badge: 'Alpha' },
    { id: 'finance',         label: 'Finance',         icon: ICON_DOLLAR,      hasSub: true },
    { id: 'activity-center', label: 'Activity Center', icon: ICON_ACTIVITY,    hasSub: true },
    { id: 'help-center',     label: 'Help Center',     icon: ICON_HELP,        hasSub: true },
  ];

  const BOTTOM_ITEMS = [
    { id: 'settings', label: 'Settings', icon: ICON_SETTINGS, hasSub: true },
  ];

  function handleSelect(id) {
    if (id === 'byot') {
      navigate('/byot');
    }
  }

  const activeId = currentRoute === '/byot'
    ? 'byot'
    : isYieldRoute
    ? 'yield-control'
    : 'campaigns';

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
