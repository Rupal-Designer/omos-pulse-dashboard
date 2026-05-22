import { StatCard, Checkbox, Badge, RadioCard, RadioDot } from '../../../../ui';

const OBJECTIVES = [
  { value: 'Sales',     label: 'Sales',     icon: '🛒', desc: 'Drive purchases and conversions' },
  { value: 'Awareness', label: 'Awareness', icon: '📢', desc: 'Reach new audiences at scale' },
  { value: 'Traffic',   label: 'Traffic',   icon: '🌐', desc: 'Send people to your store or site' },
  { value: 'Reach',     label: 'Reach',     icon: '👥', desc: 'Maximise unique people reached' },
];

const REACH_BY_CHANNEL = {
  Meta: '80M – 120M',
  Google: '120M – 200M',
  TikTok: '40M – 60M',
  Snapchat: '15M – 25M',
  YouTube: '60M – 90M',
  'DV-360': '150M – 250M',
};

// ── Channel SVG logos ─────────────────────────────────────────────────────────
const MetaLogo = () => (
  <svg viewBox="0 0 36 36" style={{ width: 40, height: 40 }}>
    <defs>
      <linearGradient id="meta-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0081FB" />
        <stop offset="100%" stopColor="#0064E0" />
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="8" fill="url(#meta-g)" />
    <path d="M18 10c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="white" />
  </svg>
);

const CHANNEL_DEFINITIONS = [
  {
    id: 'Meta', label: 'Meta', logo: <MetaLogo />, popular: true,
    desc: 'Facebook, Instagram, Messenger, Audience Network',
    reach: REACH_BY_CHANNEL.Meta,
  },
  {
    id: 'Google', label: 'Google', logo: (
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#EA433511', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#EA4335' }}>G</div>
    ),
    desc: 'Search, Display, YouTube, Shopping, Discover', reach: REACH_BY_CHANNEL.Google, comingSoon: true,
  },
  {
    id: 'TikTok', label: 'TikTok', logo: (
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#00000011', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#010101' }}>TT</div>
    ),
    desc: 'In-Feed Ads, Spark Ads, Pangle Network', reach: REACH_BY_CHANNEL.TikTok, comingSoon: true,
  },
  {
    id: 'Snapchat', label: 'Snapchat', logo: (
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#FFFC0022', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👻</div>
    ),
    desc: 'Snap Ads, Story Ads, Collection Ads', reach: REACH_BY_CHANNEL.Snapchat, comingSoon: true,
  },
  {
    id: 'YouTube', label: 'YouTube', logo: (
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#FF000011', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>▶</div>
    ),
    desc: 'Skippable, Non-skippable, Bumper Ads', reach: REACH_BY_CHANNEL.YouTube, comingSoon: true,
  },
  {
    id: 'DV-360', label: 'DV-360', logo: (
      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#4285F411', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#4285F4' }}>DV</div>
    ),
    desc: 'Display & Video 360, Programmatic Ads', reach: REACH_BY_CHANNEL['DV-360'], comingSoon: true,
  },
];

export default function ChannelObjectiveStep({ campaignData, onChange }) {
  const selectedChannels = campaignData.channels || [];

  function getObjectiveForChannel(channelId) {
    return selectedChannels.find(c => c.channel === channelId)?.objective || null;
  }

  function toggleChannel(channelId) {
    const exists = selectedChannels.some(c => c.channel === channelId);
    if (exists) {
      onChange({ channels: selectedChannels.filter(c => c.channel !== channelId) });
    } else {
      onChange({ channels: [...selectedChannels, { channel: channelId, objective: null }] });
    }
  }

  function setObjective(channelId, objective) {
    onChange({
      channels: selectedChannels.map(c =>
        c.channel === channelId ? { ...c, objective } : c
      ),
    });
  }

  const totalReach = selectedChannels.length > 0
    ? `${selectedChannels.length * 40}M – ${selectedChannels.length * 80}M`
    : null;

  return (
    <div style={{ display: 'flex', gap: 32, fontFamily: "'Open Sans', sans-serif" }}>
      {/* Left — channel cards */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px' }}>
          Channel & Objective
        </h2>
        <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', margin: '0 0 24px' }}>
          Select one or more channels to advertise on, then choose a campaign objective for each.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CHANNEL_DEFINITIONS.map(ch => {
            const isChecked = selectedChannels.some(c => c.channel === ch.id);
            const objective = getObjectiveForChannel(ch.id);

            return (
              <div key={ch.id} style={{ opacity: ch.comingSoon ? 0.5 : 1 }}>
                {/* Channel card */}
                <div
                  onClick={() => !ch.comingSoon && toggleChannel(ch.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    border: `1.5px solid ${isChecked ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                    borderRadius: isChecked ? '10px 10px 0 0' : 10,
                    background: isChecked ? `var(--osmos-brand-primary)08` : 'var(--osmos-bg)',
                    cursor: ch.comingSoon ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s',
                    borderBottom: isChecked ? `1px dashed var(--osmos-brand-primary)44` : undefined,
                  }}
                >
                  {ch.logo}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>{ch.label}</span>
                      {ch.popular && (
                        <Badge style={{ fontSize: 10, padding: '1px 7px', background: `var(--osmos-brand-primary)18`, color: 'var(--osmos-brand-primary)', borderColor: `var(--osmos-brand-primary)30` }}>
                          Most popular
                        </Badge>
                      )}
                      {ch.comingSoon && (
                        <Badge style={{ fontSize: 10, padding: '1px 7px', background: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-subtle)' }}>
                          Coming soon
                        </Badge>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>{ch.desc}</span>
                  </div>
                  <Checkbox
                    checked={isChecked}
                    onChange={() => !ch.comingSoon && toggleChannel(ch.id)}
                    disabled={ch.comingSoon}
                  />
                </div>

                {/* Inline objective picker — appears immediately below on check */}
                {isChecked && (
                  <div style={{
                    padding: '14px 16px 16px',
                    border: `1.5px solid var(--osmos-brand-primary)`,
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                    background: `var(--osmos-brand-primary)05`,
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                      Campaign Objective for {ch.label}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {OBJECTIVES.map(obj => {
                        const selected = objective === obj.value;
                        return (
                          <RadioCard
                            key={obj.value}
                            selected={selected}
                            onClick={() => setObjective(ch.id, obj.value)}
                            style={{ padding: '10px 12px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <RadioDot selected={selected} />
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                                  <span style={{ fontSize: 13 }}>{obj.icon}</span>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>{obj.label}</span>
                                </div>
                                <p style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', margin: 0 }}>{obj.desc}</p>
                              </div>
                            </div>
                          </RadioCard>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right — reach estimate */}
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ position: 'sticky', top: 0 }}>
          {totalReach ? (
            <StatCard
              label="Estimated Reach"
              value={totalReach}
              sub="people / month"
              trendDir="up"
              trend={`${selectedChannels.length} channel${selectedChannels.length !== 1 ? 's' : ''}`}
            />
          ) : (
            <div style={{
              border: `1px dashed var(--osmos-border)`, borderRadius: 10, padding: '20px 16px',
              textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 12,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
              Select a channel to see estimated reach
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
