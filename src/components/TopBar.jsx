import React from 'react';

function IconBtn({ children, title }) {
  return (
    <button
      title={title}
      aria-label={title}
      style={{
        width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fff', border: '1px solid #DEDEDE',
        borderRadius: 8, cursor: 'pointer', color: '#555', flexShrink: 0,
        transition: 'background 0.12s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#F5F5F8'}
      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

export default function TopBar() {
  return (
    <header style={{
      height: 72,
      background: '#fff',
      borderBottom: '1px solid #EBEBEB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      gap: 16,
    }}>
      {/* Left: back + breadcrumb + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <div style={{
          width: 36, height: 36, background: '#EFEFEF', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>
            Analytics &gt; Sponsored Ads
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E', lineHeight: 1 }}>
            Sponsored Ads
          </div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <IconBtn title="Theme">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </IconBtn>
        <IconBtn title="Search">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </IconBtn>
        <IconBtn title="Users">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </IconBtn>
        <IconBtn title="Refresh">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </IconBtn>

        {/* All Pages dropdown */}
        <button style={{
          height: 36, padding: '0 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', border: '1px solid #DEDEDE',
          borderRadius: 8, cursor: 'pointer', fontSize: 12, color: '#333',
          fontFamily: "'Open Sans', sans-serif", flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          All Pages
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {/* Date range */}
        <button style={{
          height: 36, padding: '0 12px',
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', border: '1px solid #DEDEDE',
          borderRadius: 8, cursor: 'pointer', fontSize: 12, color: '#333',
          fontFamily: "'Open Sans', sans-serif", flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          08 May 25 - 14 May 25
        </button>

        {/* Team avatars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: -4 }}>
          {['#7B82F8','#48BB78','#ED8936'].map((color, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: '50%',
              background: color, border: '2px solid #fff',
              marginLeft: i > 0 ? -8 : 0, fontSize: 10, fontWeight: 600,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 3 - i,
            }}>
              {['R','A','M'][i]}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
