import React, { useState, useRef } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

const UploadIcon = () => (
  <Icon size={32} color="var(--osmos-fg-muted)" strokeWidth={1.5}>
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </Icon>
);

const DownloadIcon = () => (
  <span style={{ verticalAlign: 'middle', display: 'inline-flex' }}>
    <Icon size={14} strokeWidth={2}>
      <polyline points="8 17 12 21 16 17" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </Icon>
  </span>
);

function UploadCard({ onFileSelect }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const s = {
    card: {
      position: 'relative',
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 10,
      padding: 24,
      maxWidth: 640,
      margin: '24px auto 0',
      fontFamily: "'Open Sans', sans-serif",
    },
    proBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'var(--osmos-brand-primary)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 10,
      letterSpacing: '0.04em',
      fontFamily: "'Open Sans', sans-serif",
    },
    stepRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    },
    stepBadge: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--osmos-brand-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      flexShrink: 0,
      fontFamily: "'Open Sans', sans-serif",
    },
    stepText: {
      flex: 1,
      fontSize: 13,
      color: 'var(--osmos-fg)',
    },
    downloadBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '6px 14px',
      border: 'none',
      borderRadius: 6,
      background: 'none',
      color: 'var(--osmos-brand-primary)',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: "'Open Sans', sans-serif",
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 3,
    },
    divider: {
      border: 'none',
      borderTop: '1px solid var(--osmos-border)',
      margin: '18px 0',
    },
    dropzone: (over) => ({
      border: `2px dashed ${over ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
      borderRadius: 8,
      height: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: 'pointer',
      background: over ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
      transition: 'border-color 0.15s, background 0.15s',
      marginTop: 14,
      width: '100%',
    }),
    dropText: {
      fontSize: 12,
      color: 'var(--osmos-fg-muted)',
      textAlign: 'center',
      lineHeight: 1.5,
    },
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div style={s.card}>
      <span style={s.proBadge}>PRO</span>

      {/* Step 1 */}
      <div style={s.stepRow}>
        <div style={s.stepBadge}>1</div>
        <span style={s.stepText}>Download Sample File</span>
        <button style={s.downloadBtn}>
          <DownloadIcon /> Download
        </button>
      </div>

      <hr style={s.divider} />

      {/* Step 2 */}
      <div style={s.stepRow}>
        <div style={s.stepBadge}>2</div>
        <span style={s.stepText}>Upload .xlsx file with details</span>
      </div>

      <div
        style={s.dropzone(dragOver)}
        onClick={() => fileRef.current && fileRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <UploadIcon />
        <div style={s.dropText}>
          Drag and drop or Upload your .xlsx file here
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files[0];
          if (file) onFileSelect(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

export default function ProductAdsKeywordBidPage() {
  const [activeTab, setActiveTab] = useState('cpc');
  const { toast, showToast } = useToast();

  const s = {
    page: {
      fontFamily: "'Open Sans', sans-serif",
      padding: 24,
      background: 'var(--osmos-bg-subtle)',
      minHeight: '100vh',
    },
    tabGroup: {
      display: 'inline-flex',
      gap: 4,
      background: 'var(--osmos-bg)',
      borderRadius: 20,
      padding: '3px',
      border: '1px solid var(--osmos-border)',
    },
    tab: (active) => ({
      padding: '6px 18px',
      borderRadius: 16,
      border: 'none',
      cursor: 'pointer',
      fontSize: 13,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: active ? 600 : 400,
      background: active ? 'var(--osmos-brand-primary)' : 'transparent',
      color: active ? '#fff' : 'var(--osmos-fg-muted)',
      transition: 'background 0.15s, color 0.15s',
    }),
  };

  return (
    <div style={s.page}>
      {/* Tab group */}
      <div style={s.tabGroup}>
        <button
          style={s.tab(activeTab === 'cpc')}
          onClick={() => setActiveTab('cpc')}
        >
          CPC Controls
        </button>
        <button
          style={s.tab(activeTab === 'cpm')}
          onClick={() => setActiveTab('cpm')}
        >
          CPM Controls
        </button>
      </div>

      {/* Upload card — identical layout for both tabs */}
      <UploadCard onFileSelect={() => showToast('File uploaded successfully')} />

      <Toast {...toast} />
    </div>
  );
}
