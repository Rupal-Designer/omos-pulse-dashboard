import { useState } from 'react';
import { Button, CheckIcon, ChevronDownIcon, ChevronRightIcon, CloseIcon, Icon } from '../../../../ui';

const FONT     = "'Open Sans', sans-serif";
const TEXT     = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_SUB = 'var(--osmos-fg-subtle)';
const BORDER   = 'var(--osmos-border)';
const BG       = 'var(--osmos-bg)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const AMBER    = 'var(--osmos-brand-amber)';

// ── Icons ─────────────────────────────────────────────────────────────────────
const UsersIcon = (props) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Icon>
);

const HeartIcon = (props) => (
  <Icon {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </Icon>
);

const ShoppingBagIcon = (props) => (
  <Icon {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" x2="21" y1="6" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </Icon>
);

const TagIcon = (props) => (
  <Icon {...props}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/>
    <path d="M7 7h.01"/>
  </Icon>
);

const StoreIcon = (props) => (
  <Icon {...props}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
    <path d="M2 7h20"/>
  </Icon>
);

const NetworkIcon = (props) => (
  <Icon {...props}>
    <rect x="16" y="16" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
    <path d="M12 12V8"/>
  </Icon>
);

// ── Shared sub-components ─────────────────────────────────────────────────────

// Accordion section header with hover state
function SectionHeader({ IconComp, label, count, countLabel, subtitle, isExpanded, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: hov ? BG_SUB : BG,
        border: 'none', cursor: 'pointer',
        transition: 'background 0.12s', fontFamily: FONT,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8,
          background: BG_SUB,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <IconComp size={20} color={TEXT_MID} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ fontWeight: 500, color: TEXT }}>{label}</h4>
          {subtitle && <span style={{ fontSize: 12, color: TEXT_MID }}>{subtitle}</span>}
          {count > 0 && <span style={{ fontSize: 12, color: ACCENT, display: 'block' }}>{count} {countLabel || 'selected'}</span>}
        </div>
      </div>
      {isExpanded
        ? <ChevronDownIcon size={20} color={TEXT_MID} />
        : <ChevronRightIcon size={20} color={TEXT_MID} />
      }
    </button>
  );
}

// Small option chip with inline checkbox
function OptionChip({ label, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 8, textAlign: 'left',
        border: `1px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        color: isSelected ? ACCENT : TEXT_MID,
        fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: FONT,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 3, flexShrink: 0,
        border: `2px solid ${isSelected ? ACCENT : BORDER}`,
        background: isSelected ? ACCENT : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSelected && <CheckIcon size={10} color="#fff" />}
      </div>
      {label}
    </button>
  );
}

// Store row option
function StoreOption({ name, location, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderRadius: 8, textAlign: 'left',
        border: `1px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: FONT,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 3, flexShrink: 0,
        border: `2px solid ${isSelected ? ACCENT : BORDER}`,
        background: isSelected ? ACCENT : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSelected && <CheckIcon size={10} color="#fff" />}
      </div>
      <div>
        <div style={{ fontWeight: 500, color: isSelected ? ACCENT : TEXT, fontSize: 13 }}>{name}</div>
        <div style={{ fontSize: 12, color: TEXT_SUB }}>{location}</div>
      </div>
    </button>
  );
}

// Network grid option
function NetworkOption({ logo, name, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderRadius: 8, textAlign: 'left',
        border: `1px solid ${isSelected ? ACCENT : hov ? TEXT_MID : BORDER}`,
        background: isSelected ? ACCENT_M : hov ? BG_SUB : BG,
        cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: FONT,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 3, flexShrink: 0,
        border: `2px solid ${isSelected ? ACCENT : BORDER}`,
        background: isSelected ? ACCENT : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSelected && <CheckIcon size={10} color="#fff" />}
      </div>
      <span style={{ fontSize: 18 }}>{logo}</span>
      <span style={{ fontWeight: 500, color: isSelected ? ACCENT : TEXT_MID, fontSize: 13 }}>{name}</span>
    </button>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const targetingOptions = {
  demographics: [
    { id: 'age-18-24', label: '18-24 years' },
    { id: 'age-25-34', label: '25-34 years' },
    { id: 'age-35-44', label: '35-44 years' },
    { id: 'age-45-54', label: '45-54 years' },
    { id: 'age-55+',   label: '55+ years'   },
    { id: 'male',      label: 'Male'         },
    { id: 'female',    label: 'Female'       },
  ],
  interests: [
    { id: 'tech',          label: 'Technology'       },
    { id: 'sports',        label: 'Sports & Fitness'  },
    { id: 'fashion',       label: 'Fashion & Beauty'  },
    { id: 'travel',        label: 'Travel'            },
    { id: 'food',          label: 'Food & Dining'     },
    { id: 'entertainment', label: 'Entertainment'     },
  ],
  behaviors: [
    { id: 'frequent-buyer', label: 'Frequent Buyers'     },
    { id: 'cart-abandoner', label: 'Cart Abandoners'     },
    { id: 'new-visitor',    label: 'New Visitors'        },
    { id: 'returning',      label: 'Returning Customers' },
    { id: 'high-value',     label: 'High-Value Customers'},
  ],
};

const availableStores = [
  { id: 'store-1', name: 'Downtown Store', location: '123 Main St'         },
  { id: 'store-2', name: 'Mall Location',  location: '456 Shopping Center' },
  { id: 'store-3', name: 'Airport Store',  location: '789 Terminal Dr'     },
  { id: 'store-4', name: 'Suburban Store', location: '321 Oak Ave'         },
];

const availableNetworks = [
  { id: 'amazon',    name: 'Amazon',    logo: '🛒' },
  { id: 'walmart',   name: 'Walmart',   logo: '🛍️' },
  { id: 'costco',    name: 'Costco',    logo: '📦' },
  { id: 'target',    name: 'Target',    logo: '🎯' },
  { id: 'kroger',    name: 'Kroger',    logo: '🏪' },
  { id: 'instacart', name: 'Instacart', logo: '🛵' },
];

const mainSections = [
  { key: 'demographics', label: 'Demographics', IconComp: UsersIcon,      options: targetingOptions.demographics },
  { key: 'interests',    label: 'Interests',    IconComp: HeartIcon,       options: targetingOptions.interests    },
  { key: 'behaviors',    label: 'Behaviors',    IconComp: ShoppingBagIcon, options: targetingOptions.behaviors    },
];

// ── TargetingStep ─────────────────────────────────────────────────────────────
export function TargetingStep({ data, updateData }) {
  const [expandedSections, setExpandedSections] = useState(['demographics', 'interests', 'behaviors']);
  const [keywords,        setKeywords]         = useState('');
  const [negativeKeywords, setNegativeKeywords] = useState('');
  const [selectedStores,  setSelectedStores]   = useState(data.targeting.stores  || []);
  const [selectedNetworks, setSelectedNetworks] = useState(data.targeting.networks || []);

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section],
    );
  };

  const toggleOption = (category, id) => {
    const current = data.targeting[category];
    const updated = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
    updateData({ targeting: { ...data.targeting, [category]: updated } });
  };

  const addKeyword = () => {
    if (keywords.trim()) {
      updateData({ targeting: { ...data.targeting, keywords: [...data.targeting.keywords, keywords.trim()] } });
      setKeywords('');
    }
  };

  const removeKeyword = (keyword) => {
    updateData({ targeting: { ...data.targeting, keywords: data.targeting.keywords.filter((k) => k !== keyword) } });
  };

  const addNegativeKeyword = () => {
    if (negativeKeywords.trim()) {
      updateData({ targeting: { ...data.targeting, negativeKeywords: [...(data.targeting.negativeKeywords || []), negativeKeywords.trim()] } });
      setNegativeKeywords('');
    }
  };

  const removeNegativeKeyword = (keyword) => {
    updateData({ targeting: { ...data.targeting, negativeKeywords: (data.targeting.negativeKeywords || []).filter((k) => k !== keyword) } });
  };

  const toggleStore = (storeId) => {
    const updated = selectedStores.includes(storeId) ? selectedStores.filter((s) => s !== storeId) : [...selectedStores, storeId];
    setSelectedStores(updated);
    updateData({ targeting: { ...data.targeting, stores: updated } });
  };

  const toggleNetwork = (networkId) => {
    const updated = selectedNetworks.includes(networkId) ? selectedNetworks.filter((n) => n !== networkId) : [...selectedNetworks, networkId];
    setSelectedNetworks(updated);
    updateData({ targeting: { ...data.targeting, networks: updated } });
  };

  // Shared styles
  const card = { background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' };
  const inputStyle = {
    flex: 1, padding: '8px 16px',
    border: `1px solid ${BORDER}`, borderRadius: 8,
    fontSize: 13, color: TEXT, background: BG,
    fontFamily: FONT, outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
          Audience Targeting
        </h2>
        <p style={{ color: TEXT_MID }}>
          Define who should see your ads based on demographics, interests, behaviors, stores, and networks.
        </p>
      </div>

      {/* Main targeting sections (demographics / interests / behaviors) */}
      {mainSections.map(({ key, label, IconComp, options }) => {
        const isExpanded   = expandedSections.includes(key);
        const selectedCount = data.targeting[key].length;
        return (
          <div key={key} style={card}>
            <SectionHeader
              IconComp={IconComp} label={label}
              count={selectedCount}
              isExpanded={isExpanded}
              onClick={() => toggleSection(key)}
            />
            {isExpanded && (
              <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${BORDER}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 16 }}>
                  {options.map((option) => (
                    <OptionChip
                      key={option.id}
                      label={option.label}
                      isSelected={data.targeting[key].includes(option.id)}
                      onClick={() => toggleOption(key, option.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Store Targeting */}
      <div style={card}>
        <SectionHeader
          IconComp={StoreIcon} label="Store Targeting"
          count={selectedStores.length}
          isExpanded={expandedSections.includes('stores')}
          onClick={() => toggleSection('stores')}
        />
        {expandedSections.includes('stores') && (
          <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 16 }}>
              {availableStores.map((store) => (
                <StoreOption
                  key={store.id}
                  name={store.name} location={store.location}
                  isSelected={selectedStores.includes(store.id)}
                  onClick={() => toggleStore(store.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Network Targeting */}
      <div style={card}>
        <SectionHeader
          IconComp={NetworkIcon} label="Retail Network Targeting"
          subtitle="Select which retail partner networks to run ads on"
          count={selectedNetworks.length}
          countLabel="networks selected"
          isExpanded={expandedSections.includes('networks')}
          onClick={() => toggleSection('networks')}
        />
        {expandedSections.includes('networks') && (
          <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${BORDER}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 16 }}>
              {availableNetworks.map((network) => (
                <NetworkOption
                  key={network.id}
                  logo={network.logo} name={network.name}
                  isSelected={selectedNetworks.includes(network.id)}
                  onClick={() => toggleNetwork(network.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keyword Targeting */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: BG_SUB, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <TagIcon size={20} color={TEXT_MID} />
          </div>
          <div>
            <h4 style={{ fontWeight: 500, color: TEXT }}>Keyword Targeting</h4>
            <span style={{ fontSize: 12, color: TEXT_MID }}>Target users searching for specific terms</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
            placeholder="Enter keyword and press Enter"
            style={inputStyle}
          />
          <Button variant="primary" onClick={addKeyword}>Add</Button>
        </div>
        {data.targeting.keywords.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.targeting.keywords.map((keyword) => (
              <span key={keyword} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', background: ACCENT_M, color: ACCENT,
                borderRadius: 999, fontSize: 13,
              }}>
                {keyword}
                <button onClick={() => removeKeyword(keyword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT, lineHeight: 1, padding: 0, fontSize: 16 }}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Negative Keyword Targeting */}
      <div style={{ background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--osmos-brand-amber-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CloseIcon size={20} color={AMBER} />
          </div>
          <div>
            <h4 style={{ fontWeight: 500, color: TEXT }}>Negative Keyword Targeting</h4>
            <span style={{ fontSize: 12, color: TEXT_MID }}>Exclude users searching for specific terms</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            value={negativeKeywords}
            onChange={(e) => setNegativeKeywords(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNegativeKeyword()}
            placeholder="Enter negative keyword and press Enter"
            style={inputStyle}
          />
          <button
            onClick={addNegativeKeyword}
            style={{
              padding: '8px 16px', background: AMBER, color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500,
              cursor: 'pointer', fontFamily: FONT, transition: 'opacity 0.12s',
            }}
          >
            Add
          </button>
        </div>
        {data.targeting.negativeKeywords && data.targeting.negativeKeywords.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.targeting.negativeKeywords.map((keyword) => (
              <span key={keyword} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', background: 'var(--osmos-brand-amber-muted)', color: AMBER,
                borderRadius: 999, fontSize: 13,
              }}>
                {keyword}
                <button onClick={() => removeNegativeKeyword(keyword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: AMBER, lineHeight: 1, padding: 0, fontSize: 16 }}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
