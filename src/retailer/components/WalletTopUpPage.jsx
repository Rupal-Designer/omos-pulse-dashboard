import React, { useState, useRef } from 'react';
import { Icon, FileIcon, DownloadIcon, UploadIcon, CloseIcon, InfoIcon } from '../../ui/atoms/Icon';
import { Button } from '../../ui/atoms/Button';
import { Toast, useToast } from '../../ui/atoms/Toast';

const FONT = "'Open Sans', sans-serif";

export default function WalletTopUpPage() {
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
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header card */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28,
              background: 'var(--osmos-brand-primary-muted)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={13} color="var(--osmos-brand-primary)">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </Icon>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', fontFamily: FONT }}>
              Wallet Top Up
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6, fontFamily: FONT }}>
            Bulk top-up advertiser wallets by uploading a spreadsheet. Download the template, fill in
            Advertiser IDs and amounts, then upload for processing.
          </p>
        </div>

        {/* Step 1 — Download Template */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6, fontFamily: FONT }}>
            Step 1 — Download Template
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
            Template columns: <strong>Advertiser ID</strong>, <strong>Top-Up Amount (₹)</strong>,{' '}
            <strong>Payment Method</strong>, <strong>Reference Number</strong>.
          </p>
          <Button variant="outline" onClick={() => showToast('Template downloaded')}>
            <DownloadIcon size={14} />
            Download Template (.xlsx)
          </Button>
        </div>

        {/* Step 2 — Upload */}
        <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6, fontFamily: FONT }}>
            Step 2 — Upload Filled Template
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
            Supports .xlsx. Maximum 500 rows per upload.
          </p>

          {!uploadedFile ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                borderRadius: 8,
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                cursor: 'pointer',
                background: dragOver ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
                transition: 'all 0.2s',
              }}
            >
              {uploading ? (
                <>
                  <div style={{
                    width: 32, height: 32,
                    border: '3px solid var(--osmos-brand-primary-muted)',
                    borderTop: '3px solid var(--osmos-brand-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>Uploading…</span>
                </>
              ) : (
                <>
                  <UploadIcon size={32} color="var(--osmos-fg-subtle)" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg-muted)', fontFamily: FONT }}>
                    Drag &amp; drop your file here
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
                    or click to browse (.xlsx, max 500 rows)
                  </span>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.csv"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div style={{
              border: '1px solid var(--osmos-brand-green)',
              borderRadius: 8,
              padding: '16px 20px',
              background: 'var(--osmos-brand-green-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileIcon size={20} color="var(--osmos-brand-green)" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-brand-green)', fontFamily: FONT }}>
                    {uploadedFile.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--osmos-brand-green)', opacity: 0.75, fontFamily: FONT }}>
                    {(uploadedFile.size / 1024).toFixed(1)} KB · Uploaded successfully
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setUploadedFile(null); showToast('File cleared'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
              >
                <CloseIcon size={16} color="var(--osmos-brand-green)" />
              </button>
            </div>
          )}

          {uploadedFile && (
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => { showToast('Top-ups submitted for processing'); setUploadedFile(null); }}>
                Submit Top-Ups
              </Button>
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div style={{
          background: 'rgba(245,166,35,0.08)',
          border: '1px solid rgba(245,166,35,0.30)',
          borderRadius: 8,
          padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <InfoIcon size={16} color="var(--osmos-brand-amber)" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--osmos-brand-amber)', marginBottom: 4, fontFamily: FONT }}>
                Important Notes
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 12, color: 'var(--osmos-brand-amber)', lineHeight: 1.8, fontFamily: FONT }}>
                <li>Ensure Advertiser IDs match exactly — invalid IDs will be skipped</li>
                <li>Amounts must be in INR (₹) without commas or currency symbols</li>
                <li>Processing may take up to 30 minutes after submission</li>
                <li>A summary report will be emailed to your registered address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
