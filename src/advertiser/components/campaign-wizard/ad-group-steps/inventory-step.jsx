import { useState } from 'react';
import { CheckIcon, Icon } from '../../../../ui';

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparklesIcon = (props) => (
  <Icon {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/>
    <path d="M3 5h4"/><path d="M17 19h4"/>
  </Icon>
);

const DollarSignIcon = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </Icon>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const websitePages = [
  { id: 0, name: 'Home Page',           impressions: '2.5M', inventories: 8,  targeting: 5, tags: ['High Traffic', 'Premium']             },
  { id: 1, name: 'Category Page',       impressions: '1.8M', inventories: 6,  targeting: 4, tags: ['High Intent', 'Category Specific']    },
  { id: 2, name: 'Product Detail Page', impressions: '3.2M', inventories: 10, targeting: 6, tags: ['High Conversion', 'Product Specific'] },
  { id: 3, name: 'Search Results',      impressions: '1.5M', inventories: 4,  targeting: 3, tags: ['High Intent', 'Keyword Based']        },
  { id: 4, name: 'Cart Page',           impressions: '800K', inventories: 3,  targeting: 2, tags: ['High Conversion', 'Checkout Flow']    },
  { id: 5, name: 'Checkout Page',       impressions: '600K', inventories: 2,  targeting: 2, tags: ['Premium', 'Checkout Flow']            },
];

// ── InventoryStep ─────────────────────────────────────────────────────────────
export function InventoryStep({ data, updateData }) {
  const [bidOverrides,    setBidOverrides]    = useState(data.bidOverrides || {});
  const [showBidOverrides, setShowBidOverrides] = useState(false);
  const [hoveredPage,     setHoveredPage]     = useState(null);
  const [clearHovered,    setClearHovered]    = useState(false);

  const togglePage = (id) => {
    const updated = data.selectedPages.includes(id)
      ? data.selectedPages.filter((p) => p !== id)
      : [...data.selectedPages, id];
    updateData({ selectedPages: updated });
  };

  const updateBidOverride = (pageId, value) => {
    const updated = { ...bidOverrides, [pageId]: value };
    setBidOverrides(updated);
    updateData({ bidOverrides: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Open Sans', sans-serif" }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 8 }}>
          Select Inventory
        </h2>
        <p style={{ color: 'var(--osmos-fg-muted)' }}>
          Choose the website pages where your ads will be displayed.
        </p>
      </div>

      {/* Bid Override Toggle */}
      <div style={{ background: 'var(--osmos-bg)', borderRadius: 12, border: `1px solid ${'var(--osmos-border)'}`, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DollarSignIcon size={16} color={'#7349a1'} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)' }}>
              Enable Inventory-Level Bid Overrides
            </span>
          </div>
          {/* Toggle switch */}
          <button
            onClick={() => setShowBidOverrides(!showBidOverrides)}
            style={{
              position: 'relative',
              width: 44, height: 24, borderRadius: 999,
              background: showBidOverrides ? '#7349a1' : 'var(--osmos-fg-subtle)',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.15s', flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: 4,
              width: 16, height: 16, borderRadius: '50%', background: '#fff',
              transform: showBidOverrides ? 'translateX(24px)' : 'translateX(4px)',
              transition: 'transform 0.15s',
              display: 'block',
            }} />
          </button>
        </div>
        {showBidOverrides && (
          <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', marginTop: 8 }}>
            Set custom bid amounts for specific inventory pages to prioritize high-value placements
          </p>
        )}
      </div>

      {/* Page Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {websitePages.map((page) => {
          const isSelected = data.selectedPages.includes(page.id);
          const isHovered  = hoveredPage === page.id;
          return (
            <div key={page.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => togglePage(page.id)}
                onMouseEnter={() => setHoveredPage(page.id)}
                onMouseLeave={() => setHoveredPage(null)}
                style={{
                  position: 'relative', width: '100%',
                  padding: 20, borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSelected ? 'var(--osmos-brand-primary)' : isHovered ? 'var(--osmos-fg-muted)' : 'var(--osmos-border)'}`,
                  background: isSelected ? 'var(--osmos-brand-primary-muted)' : isHovered ? 'var(--osmos-bg-subtle)' : 'var(--osmos-bg)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--osmos-brand-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckIcon size={14} color="#fff" />
                  </div>
                )}

                <h4 style={{ fontWeight: 600, marginBottom: 8, color: isSelected ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg)' }}>
                  {page.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--osmos-brand-amber)', fontSize: 13, marginBottom: 12 }}>
                  <SparklesIcon size={14} color={'var(--osmos-brand-amber)'} />
                  <span>Est. Daily Imp: {page.impressions}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: 'var(--osmos-fg-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Inventories</span>
                    <span style={{ fontWeight: 500, color: 'var(--osmos-fg)' }}>{page.inventories}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Targeting Options</span>
                    <span style={{ fontWeight: 500, color: 'var(--osmos-fg)' }}>{page.targeting}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  {page.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: '4px 8px', background: 'var(--osmos-bg-subtle)',
                      color: 'var(--osmos-fg-muted)', fontSize: 12, borderRadius: 4,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </button>

              {/* Bid Override Input */}
              {isSelected && showBidOverrides && (
                <div style={{
                  padding: '12px 16px', background: 'var(--osmos-bg-subtle)',
                  borderRadius: 8, border: `1px solid ${'var(--osmos-border)'}`,
                }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--osmos-fg-muted)', marginBottom: 8 }}>
                    Custom Bid ($)
                  </label>
                  <input
                    type="number"
                    value={bidOverrides[page.id] || ''}
                    onChange={(e) => updateBidOverride(page.id, e.target.value)}
                    placeholder="Leave empty for default"
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '8px 12px', border: `1px solid ${'var(--osmos-border)'}`,
                      borderRadius: 8, fontSize: 13, color: 'var(--osmos-fg)',
                      background: 'var(--osmos-bg)', fontFamily: "'Open Sans', sans-serif", outline: 'none',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {data.selectedPages.length > 0 && (
        <div style={{
          background: 'var(--osmos-brand-primary-muted)', borderRadius: 8, padding: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: 'var(--osmos-brand-primary)' }}>
            {data.selectedPages.length} page(s) selected
          </span>
          <button
            onClick={() => updateData({ selectedPages: [] })}
            onMouseEnter={() => setClearHovered(true)}
            onMouseLeave={() => setClearHovered(false)}
            style={{
              fontSize: 13, color: 'var(--osmos-brand-primary)', background: 'none', border: 'none',
              cursor: 'pointer', textDecoration: clearHovered ? 'underline' : 'none',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
