import React, { useState, useRef } from 'react';
import { Icon, DownloadIcon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

const TABS = ['Create Campaign', 'Update Campaign', 'Activate Campaign', 'Pause Campaign'];

const HOW_IT_WORKS = {
  'Update Campaign': [
    'Click on the "Download file for all merchants". This file will contain all campaign settings for all your merchants.',
    'Change the settings for the campaign you want to update.',
    'Save your file and upload it back to the platform.',
  ],
  'Activate Campaign': [
    'Click on the "Download file for all merchants". This file will contain paused campaigns for all your merchants.',
    'Change the status to "ACTIVE" for the campaign you want to activate.',
    'Save your file and upload it back to the platform.',
  ],
  'Pause Campaign': [
    'Click on the "Download file for all merchants". This file will contain active campaigns for all your merchants.',
    'Change the status to "PAUSED" for the campaign you want to pause.',
    'Save your file and upload it back to the platform.',
  ],
};

/* ─── Icons ─────────────────────────────────────────────────────────────── */

const CloudUploadIcon = () => (
  <Icon size={48} color="var(--osmos-fg-subtle)" strokeWidth={1.25}>
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </Icon>
);


/* ─── Step Number Circle ──────────────────────────────────────────────────── */

function StepNumber({ number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1px solid var(--osmos-border)',
        fontSize: 20,
        fontWeight: 400,
        color: 'var(--osmos-fg)',
        flexShrink: 0,
        fontFamily: "'Open Sans', sans-serif",
        background: 'transparent',
      }}
    >
      {number}
    </span>
  );
}

/* ─── Upload Card ─────────────────────────────────────────────────────────── */

function UploadCard({ onUpload, caption }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    onUpload();
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        width: '100%',
        height: 300,
        border: `1.5px dashed ${dragging ? 'var(--osmos-brand-primary)' : '#d0d0d0'}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: dragging ? 'var(--osmos-brand-primary-muted)' : '#fff',
        transition: 'border-color 0.15s, background 0.15s',
        boxSizing: 'border-box',
      }}
    >
      <CloudUploadIcon />
      <span
        style={{
          fontSize: 15,
          color: 'var(--osmos-fg)',
          fontFamily: "'Open Sans', sans-serif",
          marginTop: 12,
        }}
      >
        Upload .xlsx file with details
      </span>
      {caption && (
        <span
          style={{
            fontSize: 12,
            color: 'var(--osmos-fg-subtle)',
            fontFamily: "'Open Sans', sans-serif",
            fontStyle: 'italic',
            marginTop: 6,
          }}
        >
          {caption}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={() => onUpload()}
      />
    </div>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

function HowItWorks({ points }) {
  return (
    <div
      style={{
        background: 'var(--osmos-bg-subtle)',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
      }}
    >
      <p
        style={{
          margin: '0 0 10px 0',
          fontWeight: 700,
          fontSize: 13,
          color: 'var(--osmos-fg)',
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        How it works?
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 13,
              color: 'var(--osmos-fg-muted)',
              fontFamily: "'Open Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--osmos-fg-muted)',
                flexShrink: 0,
                marginTop: 6,
              }}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Tab Content ─────────────────────────────────────────────────────────── */

function TabContent({ tab, onUpload }) {
  const isCreate = tab === 'Create Campaign';
  const step1Label = isCreate ? 'Download Sample File' : 'Download file for all merchants';
  const uploadCaption = isCreate ? '(Upto 1,000 campaign can be created)' : null;
  const howItWorksPoints = HOW_IT_WORKS[tab] || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Step 1 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <StepNumber number={1} />
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 14,
            color: 'var(--osmos-brand-primary)',
            fontFamily: "'Open Sans', sans-serif",
            textDecoration: 'none',
          }}
        >
          <DownloadIcon />
          {step1Label}
        </a>
      </div>

      {/* Step 2 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <StepNumber number={2} />
        <div style={{ flex: 1 }}>
          <UploadCard onUpload={onUpload} caption={uploadCaption} />
          {howItWorksPoints && <HowItWorks points={howItWorksPoints} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ProductAdsBulkActionsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { toast, showToast } = useToast();

  const handleUpload = () => {
    showToast('File uploaded successfully');
  };

  return (
    <div
      style={{
        padding: 40,
        background: 'var(--osmos-bg)',
        minHeight: '100vh',
        fontFamily: "'Open Sans', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* Tab bar — subtle underline style */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--osmos-border)',
          marginBottom: 40,
          gap: 0,
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--osmos-brand-primary)' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                marginBottom: -1,
                transition: 'color 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <TabContent tab={activeTab} onUpload={handleUpload} />

      <Toast {...toast} />
    </div>
  );
}
