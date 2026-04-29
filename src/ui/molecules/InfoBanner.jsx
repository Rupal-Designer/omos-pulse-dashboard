import React from 'react';
import { FileIcon } from '../atoms/Icon';

const FONT = "'Open Sans', sans-serif";

/**
 * InfoBanner — file download banner shown at the top of upload pages.
 * fileName: string  e.g. "merchant_account_manager_mapping.xlsx"
 * fileDesc: string  description text
 * downloadText: string (default: "↓ Download file for all advertisers")
 * onDownload: optional click handler
 */
export function InfoBanner({
  fileName,
  fileDesc,
  downloadText = '↓ Download file for all advertisers',
  onDownload,
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--osmos-bg-subtle)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 8,
      padding: '14px 18px',
      marginBottom: 28,
      gap: 16,
      fontFamily: FONT,
    }}>
      {/* Left: icon + text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <div style={{
          width: 36, height: 36, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'var(--osmos-brand-primary-muted)',
          borderRadius: 6,
        }}>
          <FileIcon size={20} color="var(--osmos-brand-primary)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--osmos-fg)' }}>{fileName}</span>
          <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)' }}>{fileDesc}</span>
        </div>
      </div>
      {/* Right: download link */}
      <a
        href="#download"
        onClick={e => { e.preventDefault(); onDownload?.(); }}
        style={{
          fontSize: 13,
          color: 'var(--osmos-brand-primary)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          flexShrink: 0,
          fontWeight: 500,
        }}
      >
        {downloadText}
      </a>
    </div>
  );
}
