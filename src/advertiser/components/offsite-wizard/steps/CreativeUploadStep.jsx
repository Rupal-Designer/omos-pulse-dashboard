import { useState } from 'react';
import { UploadDropzone } from '../../../../ui';

function WarnBanner({ message }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(237,137,54,0.08)', border: '1px solid rgba(237,137,54,0.3)', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
      <span style={{ flexShrink: 0 }}>⚠️</span>
      <span>{message}</span>
    </div>
  );
}

// Per-channel creative spec definitions
const CHANNEL_SPECS = {
  Meta: [
    { format: 'Feed Image',   dimensions: '1080×1080',  types: 'JPG, PNG',    maxSize: '30 MB',  length: '—' },
    { format: 'Story Image',  dimensions: '1080×1920',  types: 'JPG, PNG',    maxSize: '30 MB',  length: '—' },
    { format: 'Feed Video',   dimensions: '1080×1080',  types: 'MP4, MOV',    maxSize: '4 GB',   length: '≤ 240 min' },
    { format: 'Story Video',  dimensions: '1080×1920',  types: 'MP4, MOV',    maxSize: '4 GB',   length: '≤ 60 sec' },
  ],
  Google: [
    { format: 'Responsive Display', dimensions: 'Multiple', types: 'JPG, PNG, GIF', maxSize: '5 MB', length: '—' },
    { format: 'Video Ad',           dimensions: '16:9',     types: 'MP4, AVI',      maxSize: '1 GB', length: '≤ 6 min' },
  ],
  TikTok: [
    { format: 'In-Feed Video', dimensions: '9:16 (1080×1920)', types: 'MP4, MOV', maxSize: '500 MB', length: '5–60 sec' },
  ],
  Snapchat: [
    { format: 'Snap Ad',       dimensions: '1080×1920', types: 'MP4, MOV', maxSize: '32 MB', length: '3–180 sec' },
    { format: 'Collection Ad', dimensions: '1080×1920', types: 'MP4, MOV', maxSize: '32 MB', length: '3–180 sec' },
  ],
  YouTube: [
    { format: 'Skippable In-Stream', dimensions: '16:9',  types: 'MP4, AVI', maxSize: '1 GB', length: '≥ 12 sec' },
    { format: 'Bumper Ad',           dimensions: '16:9',  types: 'MP4, AVI', maxSize: '256 MB', length: '≤ 6 sec' },
  ],
  'DV-360': [
    { format: 'Display Banner', dimensions: '300×250, 728×90, 320×50', types: 'JPG, PNG, HTML5', maxSize: '200 KB', length: '—' },
    { format: 'Video',          dimensions: '16:9',                    types: 'MP4',              maxSize: '1 GB',   length: 'Any' },
  ],
};

function SpecTable({ specs }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Open Sans', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid var(--osmos-border)` }}>
            {['Format', 'Dimensions', 'File Types', 'Max Size', 'Length'].map(h => (
              <th key={h} style={{ padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-muted)', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid var(--osmos-border)` }}>
              <td style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg)' }}>{row.format}</td>
              <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{row.dimensions}</td>
              <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{row.types}</td>
              <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{row.maxSize}</td>
              <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UploadArea({ channelId, format, creatives, onUpload }) {
  const uploaded = creatives.filter(c => c.channel === channelId && c.format === format.format);
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', margin: '0 0 8px', fontFamily: "'Open Sans', sans-serif" }}>
        {format.format} <span style={{ fontWeight: 400, color: 'var(--osmos-fg-subtle)' }}>({format.dimensions} · {format.types})</span>
      </p>
      {uploaded.length > 0 ? (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {uploaded.map((c, i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 8, background: `var(--osmos-brand-primary)0D`,
              border: `1px solid var(--osmos-brand-primary)33`, fontSize: 12, color: 'var(--osmos-brand-primary)', fontFamily: "'Open Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              ✓ {c.name}
            </div>
          ))}
        </div>
      ) : null}
      <UploadDropzone
        onUpload={(files) => {
          const newCreatives = Array.from(files).map(f => ({
            channel: channelId, format: format.format, name: f.name, size: f.size,
          }));
          onUpload(newCreatives);
        }}
        accept="image/*,video/*"
        label={`Upload ${format.format}`}
        style={{ borderRadius: 8 }}
      />
    </div>
  );
}

export default function CreativeUploadStep({ campaignData, onChange }) {
  const channels = campaignData.channels?.map(c => c.channel) || ['Meta'];
  const [activeTab, setActiveTab] = useState(channels[0] || 'Meta');
  const creatives = campaignData.creatives || [];

  function handleUpload(newCreatives) {
    onChange({ creatives: [...creatives, ...newCreatives] });
  }

  const specs = CHANNEL_SPECS[activeTab] || [];
  const uploadedCount = creatives.filter(c => c.channel === activeTab).length;
  const requiredCount = specs.length;
  const hasMissing = uploadedCount < requiredCount;

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 720 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px' }}>
        Creative / Ads Upload
      </h2>
      <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', margin: '0 0 20px' }}>
        Upload your ad creatives per channel. Specs are shown inline.
      </p>

      {/* Channel tabs */}
      {channels.length > 1 && (
        <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid var(--osmos-border)`, marginBottom: 24 }}>
          {channels.map(ch => {
            const cnt = creatives.filter(c => c.channel === ch).length;
            const isActive = activeTab === ch;
            return (
              <button
                key={ch}
                onClick={() => setActiveTab(ch)}
                style={{
                  padding: '10px 18px', border: 'none', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                  background: 'transparent', fontSize: 13, fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                  borderBottom: `2px solid ${isActive ? 'var(--osmos-brand-primary)' : 'transparent'}`,
                  marginBottom: '-1px', display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {ch}
                {cnt > 0 && (
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: `var(--osmos-brand-primary)18`, color: 'var(--osmos-brand-primary)', fontWeight: 700 }}>
                    {cnt}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Spec table */}
      <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
          {activeTab} Creative Specifications
        </p>
        <SpecTable specs={specs} />
      </div>

      {/* Warning if missing required formats */}
      {hasMissing && creatives.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <WarnBanner message={`${requiredCount - uploadedCount} required format${requiredCount - uploadedCount !== 1 ? 's' : ''} missing for ${activeTab}. You can still proceed — gaps will be flagged on the Review step.`} />
        </div>
      )}

      {/* Upload areas */}
      <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, padding: '20px' }}>
        {specs.map(format => (
          <UploadArea
            key={format.format}
            channelId={activeTab}
            format={format}
            creatives={creatives}
            onUpload={handleUpload}
          />
        ))}
      </div>
    </div>
  );
}
