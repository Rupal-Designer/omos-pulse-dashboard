import React from 'react';
import { InfoBanner } from '../molecules/InfoBanner';
import { UploadDropzone } from '../molecules/UploadDropzone';
import { FileIcon } from '../atoms/Icon';

const FONT = "'Open Sans', sans-serif";

/**
 * UploadPage pattern — InfoBanner + UploadDropzone + "How it works?" card.
 * Replaces the full AccountManagerMappingPage / AttributionOverridesPage / WalletTopUpPage pattern.
 *
 * fileName: string  e.g. "merchant_account_manager_mapping.xlsx"
 * fileDesc: string  description shown in the banner
 * downloadText: string (default: "↓ Download file for all advertisers")
 * howItWorksBullets: string[]  — bullet list items
 * accept: string (default ".xlsx")
 * onFile: (file: File) => void — optional file handler
 */
export function UploadPage({
  fileName,
  fileDesc,
  downloadText,
  howItWorksBullets = [],
  accept = '.xlsx',
  onFile,
}) {
  return (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 900 }}>
      <InfoBanner
        fileName={fileName}
        fileDesc={fileDesc}
        downloadText={downloadText}
      />
      <UploadDropzone accept={accept} onFile={onFile} />
      {howItWorksBullets.length > 0 && (
        <div style={{
          backgroundColor: 'var(--osmos-bg-subtle)',
          border: '1px solid var(--osmos-border)',
          borderRadius: 8,
          padding: '18px 20px',
          maxWidth: 520,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontWeight: 700, fontSize: 14, color: 'var(--osmos-fg)',
            marginBottom: 14,
          }}>
            <FileIcon size={16} color="var(--osmos-fg)" />
            How it works?
          </div>
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {howItWorksBullets.map((bullet, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.55 }}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
