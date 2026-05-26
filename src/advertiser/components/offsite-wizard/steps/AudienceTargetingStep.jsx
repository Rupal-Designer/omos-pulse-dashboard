import { useState } from 'react';
import { Input, Select, Checkbox } from '../../../../ui';

// Inline warning chip (no separate InfoBanner component with type/message API)
function WarnBanner({ message }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(237,137,54,0.08)', border: '1px solid rgba(237,137,54,0.3)', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
      <span style={{ flexShrink: 0, fontSize: 14 }}>ℹ️</span>
      <span>{message}</span>
    </div>
  );
}

// Removable chip (Tag doesn't support onRemove)
function RemovableTag({ children, onRemove }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px 3px 10px', borderRadius: 20, border: '1px solid var(--osmos-border)', background: 'var(--osmos-bg-subtle)', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
      {children}
      <button onClick={onRemove} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--osmos-fg-muted)', fontSize: 14, lineHeight: 1 }}>×</button>
    </span>
  );
}

const LOCATIONS = [
  'India', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
  'Hyderabad', 'Pune', 'Kolkata', 'US', 'UK', 'UAE',
];

const PIXEL_EVENTS = [
  'Purchase', 'AddToCart', 'ViewContent', 'InitiateCheckout', 'Lead', 'CompleteRegistration',
];

function SectionHeader({ title, description }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px', fontFamily: "'Open Sans', sans-serif" }}>{title}</h3>
      {description && <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{description}</p>}
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontFamily: "'Open Sans', sans-serif" }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)' }}>{label}</label>
      {children}
    </div>
  );
}

function AccordionSection({ title, description, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid var(--osmos-border)`, borderRadius: 10, overflow: 'hidden', marginTop: 12, fontFamily: "'Open Sans', sans-serif" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: 'var(--osmos-bg-subtle)', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>{title}</span>
          {description && <span style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', marginLeft: 8 }}>{description}</span>}
        </div>
        <span style={{ fontSize: 14, color: 'var(--osmos-fg-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '16px', background: 'var(--osmos-bg)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function AudienceTargetingStep({ campaignData, onChange }) {
  const audience = campaignData.audience || {
    ageMin: 25, ageMax: 55, gender: 'all', location: '',
    customAudiences: [], pixelEvents: [],
  };

  const channels = campaignData.channels?.map(c => c.channel) || [];
  const hasMeta = channels.includes('Meta');
  const multiChannel = channels.length > 1;

  const [locationInput, setLocationInput] = useState('');
  const [customAudienceInput, setCustomAudienceInput] = useState('');

  function update(partial) {
    onChange({ audience: { ...audience, ...partial } });
  }

  function addLocation(loc) {
    if (!loc.trim() || audience.location === loc) return;
    update({ location: loc });
    setLocationInput('');
  }

  function addCustomAudience(val) {
    if (!val.trim()) return;
    update({ customAudiences: [...(audience.customAudiences || []), val.trim()] });
    setCustomAudienceInput('');
  }

  function togglePixelEvent(event) {
    const current = audience.pixelEvents || [];
    const next = current.includes(event)
      ? current.filter(e => e !== event)
      : [...current, event];
    update({ pixelEvents: next });
  }

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 640 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px' }}>
        Audience & Targeting
      </h2>
      <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', margin: '0 0 24px' }}>
        Define who should see your ads. Channel-specific options appear below.
      </p>

      {multiChannel && (
        <div style={{ marginBottom: 20 }}>
          <WarnBanner message="You've selected multiple channels. Demographics below apply to all channels. Channel-specific settings follow." />
        </div>
      )}

      {/* Shared demographics */}
      <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, padding: '20px 20px', marginBottom: 8 }}>
        <SectionHeader title="Demographics" description="Shared across all selected channels" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FieldRow label="Minimum Age">
            <Input
              type="number" min={18} max={65}
              value={audience.ageMin}
              onChange={e => update({ ageMin: Number(e.target.value) })}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </FieldRow>
          <FieldRow label="Maximum Age">
            <Input
              type="number" min={18} max={65}
              value={audience.ageMax}
              onChange={e => update({ ageMax: Number(e.target.value) })}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </FieldRow>
        </div>

        <div style={{ marginTop: 16 }}>
          <FieldRow label="Gender">
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', paddingTop: 4 }}>
              {[
                { value: 'all', label: 'All genders' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ].map(g => (
                <label key={g.value} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--osmos-fg)', cursor: 'pointer' }}>
                  <input
                    type="radio" name="gender" value={g.value}
                    checked={audience.gender === g.value}
                    onChange={() => update({ gender: g.value })}
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </FieldRow>
        </div>

        <div style={{ marginTop: 16 }}>
          <FieldRow label="Location">
            <div style={{ display: 'flex', gap: 8 }}>
              <Select
                value={locationInput}
                onChange={e => { setLocationInput(e.target.value); addLocation(e.target.value); }}
                options={[{ value: '', label: 'Select location...' }, ...LOCATIONS.map(l => ({ value: l, label: l }))]}
                style={{ flex: 1, fontFamily: "'Open Sans', sans-serif" }}
              />
            </div>
            {audience.location && (
              <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <RemovableTag onRemove={() => update({ location: '' })}>
                  {audience.location}
                </RemovableTag>
              </div>
            )}
          </FieldRow>
        </div>
      </div>

      {/* Meta-specific accordion */}
      {hasMeta && (
        <AccordionSection
          title="Meta — Custom Audiences & Pixel"
          description="Meta-specific targeting"
          defaultOpen
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FieldRow label="Custom Audience IDs">
              <div style={{ display: 'flex', gap: 8 }}>
                <Input
                  placeholder="Enter audience ID and press Add"
                  value={customAudienceInput}
                  onChange={e => setCustomAudienceInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomAudience(customAudienceInput)}
                  style={{ flex: 1, fontFamily: "'Open Sans', sans-serif" }}
                />
                <button
                  onClick={() => addCustomAudience(customAudienceInput)}
                  style={{ padding: '6px 14px', borderRadius: 7, border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg)', fontSize: 12, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}
                >
                  Add
                </button>
              </div>
              {(audience.customAudiences || []).length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(audience.customAudiences || []).map((a, i) => (
                    <RemovableTag
                      key={i}
                      onRemove={() => update({ customAudiences: audience.customAudiences.filter((_, idx) => idx !== i) })}
                    >
                      {a}
                    </RemovableTag>
                  ))}
                </div>
              )}
            </FieldRow>

            <FieldRow label="Pixel Events to track">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PIXEL_EVENTS.map(event => {
                  const checked = (audience.pixelEvents || []).includes(event);
                  return (
                    <label key={event} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--osmos-fg)', cursor: 'pointer', padding: '4px 10px', border: `1px solid ${checked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`, borderRadius: 20, background: checked ? `var(--osmos-brand-primary)10` : 'var(--osmos-bg)' }}>
                      <Checkbox
                        checked={checked}
                        onChange={() => togglePixelEvent(event)}
                        style={{ width: 14, height: 14 }}
                      />
                      {event}
                    </label>
                  );
                })}
              </div>
            </FieldRow>
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
