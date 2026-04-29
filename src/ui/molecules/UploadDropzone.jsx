import React, { useRef, useState } from 'react';
import { UploadIcon } from '../atoms/Icon';
import { Toast, useToast } from '../atoms/Toast';

const FONT = "'Open Sans', sans-serif";

/**
 * UploadDropzone — dashed dropzone with drag-drop + click-to-upload.
 * onFile: (file: File) => void  — called when a file is selected (optional)
 * accept: string (default ".xlsx")
 * label: string — section heading above the dropzone (default "Upload Your File")
 * successMessage: string (default "File uploaded successfully")
 */
export function UploadDropzone({
  onFile,
  accept = '.xlsx',
  label = 'Upload Your File',
  successMessage = 'File uploaded successfully',
}) {
  const fileRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { toast, showToast } = useToast();

  function handleFile(file) {
    if (!file) return;
    showToast(successMessage);
    onFile?.(file);
  }

  return (
    <div style={{ fontFamily: FONT }}>
      <Toast {...toast} />

      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 12 }}>
        <UploadIcon size={18} color="var(--osmos-fg)" />
        {label}
      </div>

      {/* Dropzone */}
      <div
        onClick={() => fileRef.current?.click()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onDragOver={e => { e.preventDefault(); setHovered(true); }}
        onDragLeave={() => setHovered(false)}
        onDrop={e => {
          e.preventDefault();
          setHovered(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        style={{
          border: '2px dashed var(--osmos-brand-primary)',
          borderRadius: 10,
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          backgroundColor: hovered ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)',
          transition: 'background 0.15s',
          marginBottom: 28,
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          backgroundColor: 'var(--osmos-brand-primary-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <UploadIcon size={22} color="var(--osmos-brand-primary)" />
        </div>
        <span style={{ fontSize: 14, color: 'var(--osmos-fg-muted)' }}>
          Drag and drop or Upload your {accept} file here
        </span>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
