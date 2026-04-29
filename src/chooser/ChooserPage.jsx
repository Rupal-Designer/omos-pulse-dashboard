import React from 'react';

/* ── Tokens ──────────────────────────────────────────────────────── */
const FONT     = "'Open Sans', sans-serif";
const BORDER   = 'var(--osmos-border)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const WHITE    = 'var(--osmos-bg)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';

/* ── Card definitions ────────────────────────────────────────────── */
const APPS = [
  {
    href: '/retailer.html',
    title: 'Retailer Console',
    tag: 'For retailers',
    desc: 'Run the retail-media platform — manage advertisers, catalog rules, segments, ad ops, finance, and reports.',
    accent: ACCENT,
    accentSoft: ACCENT_M,
    icon: (size, color) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
  },
  {
    href: '/advertiser.html',
    title: 'Advertiser Console',
    tag: 'For brands & sellers',
    desc: 'Plan, launch and measure campaigns on the retail-media network — budgets, creatives, performance.',
    accent: '#1BA87A',
    accentSoft: 'rgba(27,168,122,0.10)',
    icon: (size, color) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-8v18z"/>
        <path d="M11.6 16.8a3 3 0 1 1-5.2 0"/>
      </svg>
    ),
  },
];

/* ── Card component ──────────────────────────────────────────────── */
function AppCard({ app }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={app.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: WHITE,
        border: `1px solid ${hover ? app.accent : BORDER}`,
        borderRadius: 14,
        padding: '28px 26px',
        width: 320,
        boxShadow: hover
          ? `0 12px 32px -16px ${app.accent}80, 0 4px 14px -8px rgba(0,0,0,0.08)`
          : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.18s ease',
        fontFamily: FONT,
        cursor: 'pointer',
      }}
    >
      {/* Icon tile */}
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: app.accentSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18,
      }}>
        {app.icon(24, app.accent)}
      </div>

      {/* Tag pill */}
      <span style={{
        display: 'inline-block',
        background: app.accentSoft, color: app.accent,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
        padding: '3px 8px', borderRadius: 12,
        textTransform: 'uppercase', marginBottom: 10,
      }}>
        {app.tag}
      </span>

      {/* Title */}
      <div style={{
        fontSize: 18, fontWeight: 700, color: TEXT_HI,
        marginBottom: 8, letterSpacing: '-0.01em',
      }}>
        {app.title}
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13, color: TEXT_MID, lineHeight: 1.55,
        margin: 0, marginBottom: 18,
      }}>
        {app.desc}
      </p>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 13, fontWeight: 600, color: app.accent,
      }}>
        Open
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
          stroke={app.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: hover ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.15s' }}>
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </a>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ChooserPage() {
  return (
    <div style={{
      minHeight: '100vh', background: BG_SUB, fontFamily: FONT,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px',
    }}>
      {/* Brand mark */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: ACCENT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '-0.02em',
        }}>
          O
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: TEXT_HI, letterSpacing: '-0.01em' }}>
          Pulse
        </span>
      </div>

      {/* Subhead */}
      <p style={{
        fontSize: 13, color: TEXT_MID, margin: '0 0 36px',
      }}>
        Choose a console to continue
      </p>

      {/* Cards */}
      <div style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        justifyContent: 'center', maxWidth: 720,
      }}>
        {APPS.map(app => <AppCard key={app.href} app={app} />)}
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 48, fontSize: 11, color: 'var(--osmos-fg-subtle)',
      }}>
        © Osmos · One platform · Two consoles
      </p>
    </div>
  );
}
