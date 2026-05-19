import React from 'react';
import { SectionCard } from '../molecules/SectionCard';
import { Tabs } from '../molecules/Tabs';

/**
 * SettingsPage — section title + optional tabs + content area.
 * Covers the 12 settings pages sharing this layout.
 *
 * Usage:
 *   <SettingsPage
 *     title="Account Settings"
 *     icon={<SettingsIcon />}
 *     tabs={[{ id: 'general', label: 'General' }, { id: 'billing', label: 'Billing' }]}
 *     activeTab="general"
 *     onTabChange={setTab}
 *     toolbar={<Button>Save</Button>}
 *   >
 *     <FormField label="Name"><Input /></FormField>
 *   </SettingsPage>
 */
export function SettingsPage({
  title,
  icon,
  tabs = [],
  activeTab,
  onTabChange,
  toolbar,
  children,
  style,
}) {
  const hasTabs = tabs.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Open Sans', sans-serif", ...style }}>
      <SectionCard
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon && <span style={{ display: 'inline-flex', opacity: 0.7 }}>{icon}</span>}
            {title}
          </span>
        }
        titleRight={toolbar}
      >
        {hasTabs && (
          <div style={{ marginBottom: 20, borderBottom: '1px solid var(--osmos-border)', paddingBottom: 0 }}>
            <Tabs
              value={activeTab}
              onValueChange={onTabChange}
              items={tabs}
              style={{ marginBottom: -1 }}
            />
          </div>
        )}
        <div style={{ paddingTop: hasTabs ? 16 : 0 }}>
          {children}
        </div>
      </SectionCard>
    </div>
  );
}
