import React, { useState } from 'react';

/* ── Nav data ─────────────────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    ),
    subnav: [],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: (
      <>
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </>
    ),
    subnav: [
      { id: 'product-ads', label: 'Product Ads' },
      { id: 'display-ads', label: 'Display Ads' },
      { id: 'sponsored-ads', label: 'Sponsored Ads', active: true },
      { id: 'byot', label: 'BYOT' },
      { id: 'non-digital', label: 'Non-Digital Ads' },
      { id: 'offsite', label: 'Offsite Ads' },
      { id: 'product-contextual', label: 'Product Contextual' },
    ],
  },
  {
    id: 'health',
    label: 'Health',
    icon: (
      <>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </>
    ),
    subnav: [
      { id: 'overview', label: 'Overview' },
      { id: 'budget-health', label: 'Budget Health' },
      { id: 'delivery-health', label: 'Delivery Health' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: (
      <>
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </>
    ),
    subnav: [
      { id: 'invoices', label: 'Invoices' },
      { id: 'wallet', label: 'Wallet' },
      { id: 'billing', label: 'Billing' },
    ],
  },
  {
    id: 'control-center',
    label: 'Control Center',
    icon: (
      <>
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41"/>
      </>
    ),
    subnav: [
      { id: 'advertisers', label: 'Advertisers', group: 'Advertiser Management' },
      { id: 'persona-config', label: 'Persona Configuration', group: 'Advertiser Management' },
      { id: 'product-catalog', label: 'Product Catalog Management', group: 'Product Catalog Management' },
      { id: 'manage-segments', label: 'Manage Segments', group: 'Audience Manager' },
      { id: 'manage-attributes', label: 'Manage Attributes', group: 'Audience Manager' },
      { id: 'super-admin', label: 'Super Admin Users', group: 'User Access Management' },
      { id: 'ops-user', label: 'Ops User', group: 'User Access Management' },
      { id: 'setup-details', label: 'Setup Details', group: 'Developer Settings' },
      { id: 'event-debug', label: 'Event Debugging', group: 'Developer Settings' },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </>
    ),
    subnav: [
      { id: 'app-store', label: 'App Store' },
      { id: 'integrations', label: 'Integrations' },
    ],
  },
];

const BOTTOM_NAV = [
  {
    id: 'support',
    label: 'Support',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  },
  {
    id: 'whats-new',
    label: "What's New",
    icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41"/></>,
  },
];

/* ── SVG icon helper ──────────────────────────────────────────── */
function Icon({ children, size = 18, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

/* ── Collapsed icon sidebar (always visible) ──────────────────── */
function IconRail({ activeSection, onSelect, expanded }) {
  return (
    <div style={{
      width: 68,
      minHeight: '100vh',
      background: '#1e2266',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        width: '100%', height: 80,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 3,
        borderBottom: '1px solid rgba(123,130,248,0.25)',
        marginBottom: 8,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color="#7B82F8">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </Icon>
        </div>
        <span style={{
          fontSize: 8, fontWeight: 700, color: '#fff',
          background: '#F5A623', borderRadius: 3,
          padding: '1px 4px', letterSpacing: 0.3,
        }}>PRO</span>
      </div>

      {/* Main icons */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px' }}>
        {NAV_SECTIONS.map(item => {
          const isActive = activeSection === item.id;
          return (
            <button key={item.id} title={item.label} aria-label={item.label}
              onClick={() => onSelect(item.id)}
              style={{
                width: '100%', height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isActive ? 'rgba(123,130,248,0.25)' : 'transparent',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                color: isActive ? '#7B82F8' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon>{item.icon}</Icon>
            </button>
          );
        })}
      </div>

      {/* Bottom icons */}
      <div style={{
        width: '100%', padding: '8px 6px 16px',
        borderTop: '1px solid rgba(123,130,248,0.25)',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {BOTTOM_NAV.map(item => (
          <button key={item.id} title={item.label} aria-label={item.label} style={{
            width: '100%', height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', borderRadius: 8,
            color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          >
            <Icon>{item.icon}</Icon>
          </button>
        ))}
        {/* User avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: '#7B82F8', margin: '4px auto 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff',
        }}>R</div>
      </div>
    </div>
  );
}

/* ── Expanded sub-nav panel ───────────────────────────────────── */
function SubNavPanel({ section, onClose }) {
  const [activeItem, setActiveItem] = useState(
    section?.subnav.find(i => i.active)?.id ?? section?.subnav[0]?.id
  );

  if (!section) return null;

  // Group sub-items
  const groups = [];
  const seenGroups = new Set();
  if (section.subnav.some(i => i.group)) {
    section.subnav.forEach(item => {
      if (item.group && !seenGroups.has(item.group)) {
        seenGroups.add(item.group);
        groups.push({ label: item.group, items: section.subnav.filter(i => i.group === item.group) });
      }
    });
  }
  const ungrouped = section.subnav.filter(i => !i.group);

  return (
    <div style={{
      width: 220,
      background: '#212563',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid rgba(123,130,248,0.2)',
      overflow: 'hidden',
    }}>
      {/* Panel header */}
      <div style={{
        padding: '20px 16px 12px',
        borderBottom: '1px solid rgba(123,130,248,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: 0.1 }}>
            {section.label}
          </span>
          <button onClick={onClose} aria-label="Close panel" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', padding: 2, borderRadius: 4,
          }}>
            <Icon size={16}>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </Icon>
          </button>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
          Click here to close
        </div>
      </div>

      {/* Sub-nav items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {groups.length > 0 ? (
          groups.map(group => (
            <div key={group.label} style={{ marginBottom: 8 }}>
              <div style={{
                padding: '8px 16px 4px',
                fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', letterSpacing: 0.8,
              }}>
                {group.label}
              </div>
              {group.items.map(item => (
                <SubNavItem key={item.id} item={item} active={activeItem === item.id}
                  onClick={() => setActiveItem(item.id)} />
              ))}
            </div>
          ))
        ) : (
          ungrouped.map(item => (
            <SubNavItem key={item.id} item={item} active={activeItem === item.id}
              onClick={() => setActiveItem(item.id)} />
          ))
        )}
      </div>
    </div>
  );
}

function SubNavItem({ item, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left',
        padding: '8px 16px',
        background: active
          ? 'rgba(123,130,248,0.2)'
          : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: 'none',
        borderLeft: active ? '3px solid #7B82F8' : '3px solid transparent',
        cursor: 'pointer',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 13, fontWeight: active ? 600 : 400,
        color: active ? '#fff' : 'rgba(255,255,255,0.6)',
        transition: 'all 0.15s',
      }}>
      {item.label}
    </button>
  );
}

/* ── Root LeftNav ─────────────────────────────────────────────── */
export default function LeftNav({ activePage, onPageChange }) {
  const [activeSection, setActiveSection] = useState(activePage ?? 'analytics');
  const [expanded, setExpanded] = useState(activePage !== 'home');

  const section = NAV_SECTIONS.find(s => s.id === activeSection);
  const hasSubnav = section?.subnav?.length > 0;

  function handleSelect(id) {
    // Notify parent for page-level routing
    onPageChange?.(id);

    if (activeSection === id && expanded) {
      setExpanded(false);
    } else {
      setActiveSection(id);
      const s = NAV_SECTIONS.find(n => n.id === id);
      setExpanded(s?.subnav?.length > 0);
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'sticky', top: 0, flexShrink: 0 }}>
      <IconRail activeSection={activeSection} onSelect={handleSelect} expanded={expanded} />
      {expanded && hasSubnav && (
        <SubNavPanel
          section={section}
          onClose={() => setExpanded(false)}
        />
      )}
    </div>
  );
}
