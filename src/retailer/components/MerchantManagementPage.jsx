import React from 'react';

export default function MerchantManagementPage() {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: 'var(--osmos-bg-subtle)', minHeight: '100vh',
      padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--osmos-fg-muted)' }}>
        <svg width={40} height={40} viewBox="0 0 24 24" fill="none"
          stroke="var(--osmos-border)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
          style={{ marginBottom: 16 }}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M9 9h6M9 13h4"/>
        </svg>
        <p style={{ fontSize: 14, fontWeight: 600 }}>Merchant Management</p>
        <p style={{ fontSize: 12, marginTop: 4 }}>Coming soon</p>
      </div>
    </div>
  );
}
