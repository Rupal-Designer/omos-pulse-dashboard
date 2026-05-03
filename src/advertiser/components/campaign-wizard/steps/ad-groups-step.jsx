import { useState } from 'react';
import { Button, Badge, PlusIcon, SearchIcon, EditIcon, TrashIcon, Icon } from '../../../../ui';

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
const CopyIcon = (props) => (
  <Icon {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </Icon>
);

const LayersIcon = (props) => (
  <Icon {...props}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </Icon>
);

// ── ActionBtn — inline hover-state icon button ────────────────────────────────
function ActionBtn({ onClick, children, danger = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', borderRadius: 8, cursor: 'pointer',
        background: hov ? (danger ? 'rgba(239,68,68,0.08)' : BG_SUB) : 'transparent',
        color: danger ? ERROR : TEXT_MID,
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

// ── AdGroupsStep ──────────────────────────────────────────────────────────────
export function AdGroupsStep({ adGroups, onAddAdGroup, onEditAdGroup, onDeleteAdGroup }) {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
            Ad Groups
          </h2>
          <p style={{ color: TEXT_MID }}>
            Create ad groups to organize your ads by inventory, targeting, and creative.
          </p>
        </div>
        <Button variant="primary" onClick={onAddAdGroup} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PlusIcon size={16} color="#fff" />
          Add Ad Group
        </Button>
      </div>

      {adGroups.length === 0 ? (
        /* Empty State */
        <div style={{
          background: BG, borderRadius: 12, border: `1px solid ${BORDER}`,
          padding: 48, textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: ACCENT_M,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <LayersIcon size={28} color={ACCENT} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
            No ad groups yet
          </h3>
          <p style={{ color: TEXT_MID, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Ad groups help you organize your campaign by grouping ads that share
            the same inventory, targeting, and budget settings.
          </p>
          <Button variant="primary" onClick={onAddAdGroup} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <PlusIcon size={16} color="#fff" />
            Create Your First Ad Group
          </Button>
        </div>
      ) : (
        /* Ad Groups List */
        <div style={{
          background: BG, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden',
        }}>
          {/* Search Header */}
          <div style={{
            padding: 16, borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', border: `1px solid ${BORDER}`,
              borderRadius: 8, background: BG_SUB, width: 288,
            }}>
              <SearchIcon size={16} color={TEXT_SUB} />
              <input
                type="text"
                placeholder="Search ad groups..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 13, color: TEXT, flex: 1, fontFamily: FONT,
                }}
              />
            </div>
            <span style={{ fontSize: 13, color: TEXT_MID }}>
              {adGroups.length} ad group(s)
            </span>
          </div>

          {/* Ad Group Cards */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {adGroups.map((adGroup, index) => {
              const isHovered = hoveredGroup === adGroup.id;
              return (
                <div
                  key={adGroup.id}
                  onMouseEnter={() => setHoveredGroup(adGroup.id)}
                  onMouseLeave={() => setHoveredGroup(null)}
                  style={{
                    border: `1px solid ${isHovered ? TEXT_SUB : BORDER}`,
                    borderRadius: 12, padding: 20,
                    boxShadow: isHovered ? '0 1px 4px rgba(0,0,0,0.07)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {/* Row header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                      <h4 style={{ fontWeight: 600, color: TEXT, fontSize: 16, marginBottom: 4 }}>
                        {adGroup.name}
                      </h4>
                      <Badge status="Draft" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ActionBtn onClick={() => onEditAdGroup(index)}>
                        <EditIcon size={14} color={TEXT_MID} />
                      </ActionBtn>
                      <ActionBtn>
                        <CopyIcon size={14} color={TEXT_MID} />
                      </ActionBtn>
                      <ActionBtn danger onClick={() => onDeleteAdGroup(index)}>
                        <TrashIcon size={14} color={ERROR} />
                      </ActionBtn>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {[
                      { label: 'Inventory',  value: `${adGroup.selectedPages.length} page(s)` },
                      { label: 'Targeting',  value: `${Object.values(adGroup.targeting).flat().length} option(s)` },
                      { label: 'Ad Format',  value: adGroup.adFormat || 'Not set' },
                      { label: 'Creatives',  value: adGroup.creatives.length },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ background: BG_SUB, borderRadius: 8, padding: 12 }}>
                        <span style={{ fontSize: 12, color: TEXT_MID, display: 'block', marginBottom: 4 }}>
                          {label}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
