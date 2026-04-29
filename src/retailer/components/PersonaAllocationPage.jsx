import React, { useState, useRef } from 'react';
import { Icon, DownloadIcon, FileIcon, CloseIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

export default function PersonaAllocationPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { toast, showToast } = useToast();
  const fileRef = useRef();

  function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      showToast('Please upload an .xlsx or .csv file', 'error');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploadedFile(file);
      setUploading(false);
      showToast(`${file.name} uploaded successfully`);
    }, 1200);
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: FONT }}>
      <Toast {...toast} />

      <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header card */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={13} color="var(--osmos-brand-primary)">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </Icon>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>Advertiser Persona Allocation</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, fontFamily: FONT }}>
            Bulk-assign personas (Platinum / Gold / Silver / Beta) to advertisers by uploading a spreadsheet. Download the template, fill in the Advertiser ID and Persona columns, then upload.
          </p>
        </div>

        {/* Step 1 — Download Template */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6, fontFamily: FONT }}>Step 1 — Download Template</div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
            Download the Excel template with required column headers: <strong>Advertiser ID</strong>, <strong>Persona</strong>.
          </p>
          <Button variant="outline" onClick={() => showToast('Template downloaded')}>
            <DownloadIcon size={13} />
            Download Template (.xlsx)
          </Button>
        </div>

        {/* Step 2 — Upload */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6, fontFamily: FONT }}>Step 2 — Upload Filled Template</div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
            Supports .xlsx files. Maximum 1000 rows per upload.
          </p>

          {!uploadedFile ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                borderRadius: 8, padding: '40px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 10, cursor: 'pointer',
                background: dragOver ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
                transition: 'all 0.2s',
              }}>
              {uploading ? (
                <>
                  <div style={{ width: 32, height: 32, border: '3px solid var(--osmos-brand-primary-muted)', borderTop: '3px solid var(--osmos-brand-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Uploading…</span>
                </>
              ) : (
                <>
                  <Icon size={32} color="var(--osmos-fg-subtle)" strokeWidth={1.5}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </Icon>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Drag & drop your file here</span>
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>or click to browse (.xlsx, max 1000 rows)</span>
                </>
              )}
              <input ref={fileRef} type="file" accept=".xlsx,.csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div style={{ border: '1px solid var(--osmos-brand-green)', borderRadius: 8, padding: '16px 20px', background: 'var(--osmos-brand-green-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileIcon size={20} color="var(--osmos-brand-green)" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-brand-green)', fontFamily: FONT }}>{uploadedFile.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--osmos-brand-green)', fontFamily: FONT }}>{(uploadedFile.size / 1024).toFixed(1)} KB · Uploaded successfully</div>
                </div>
              </div>
              <button onClick={() => setUploadedFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-brand-green)', display: 'flex', alignItems: 'center', padding: 4 }}>
                <CloseIcon size={16} color="var(--osmos-brand-green)" />
              </button>
            </div>
          )}
        </div>

        {/* How it works */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 14, fontFamily: FONT }}>How it works</div>
          {[
            { step: 1, text: 'Download the Excel template using the button above' },
            { step: 2, text: 'Fill in Advertiser ID and the target Persona (Platinum / Gold / Silver / Beta)' },
            { step: 3, text: 'Upload the filled file. Rows with unrecognised IDs or invalid personas will be skipped.' },
            { step: 4, text: 'A summary report will be shown after processing. You can download it for audit purposes.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: FONT }}>
                {item.step}
              </div>
              <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, paddingTop: 2, fontFamily: FONT }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
