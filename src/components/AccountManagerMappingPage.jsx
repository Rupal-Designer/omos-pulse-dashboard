import React, { useState, useRef } from "react";

const styles = {
  page: {
    fontFamily: "'Open Sans', sans-serif",
    padding: "32px",
    color: "var(--osmos-fg)",
    maxWidth: "900px",
  },
  breadcrumb: {
    fontSize: "13px",
    color: "var(--osmos-fg-muted)",
    marginBottom: "8px",
  },
  breadcrumbSep: {
    margin: "0 6px",
    color: "var(--osmos-fg-subtle)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "var(--osmos-fg)",
    marginBottom: "24px",
  },
  infoBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--osmos-bg-subtle)",
    border: "1px solid var(--osmos-border)",
    borderRadius: "8px",
    padding: "14px 18px",
    marginBottom: "28px",
    gap: "16px",
  },
  infoBannerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },
  fileIcon: {
    width: "36px",
    height: "36px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--osmos-brand-primary-muted)",
    borderRadius: "6px",
  },
  fileIconSvg: {
    color: "var(--osmos-brand-primary)",
  },
  infoBannerText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  fileName: {
    fontWeight: "700",
    fontSize: "14px",
    color: "var(--osmos-fg)",
  },
  fileDesc: {
    fontSize: "13px",
    color: "var(--osmos-fg-muted)",
  },
  downloadLink: {
    fontSize: "13px",
    color: "var(--osmos-brand-primary)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    flexShrink: 0,
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    fontWeight: "600",
    color: "var(--osmos-fg)",
    marginBottom: "12px",
  },
  dropzone: {
    border: "2px dashed var(--osmos-brand-primary)",
    borderRadius: "10px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    backgroundColor: "var(--osmos-bg-subtle)",
    transition: "background 0.15s",
    marginBottom: "28px",
  },
  dropzoneHover: {
    backgroundColor: "var(--osmos-brand-primary-muted)",
  },
  uploadCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "var(--osmos-brand-primary-muted)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropzoneText: {
    fontSize: "14px",
    color: "var(--osmos-fg-muted)",
  },
  howItWorksCard: {
    backgroundColor: "var(--osmos-bg-subtle)",
    border: "1px solid var(--osmos-border)",
    borderRadius: "8px",
    padding: "18px 20px",
    maxWidth: "520px",
  },
  howItWorksHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "700",
    fontSize: "14px",
    color: "var(--osmos-fg)",
    marginBottom: "14px",
  },
  bulletList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingLeft: "0",
    margin: "0",
    listStyle: "none",
  },
  bulletItem: {
    fontSize: "13px",
    color: "var(--osmos-fg-muted)",
    lineHeight: "1.55",
    paddingLeft: "0",
  },
  learnMore: {
    color: "var(--osmos-brand-primary)",
    textDecoration: "none",
    cursor: "pointer",
    marginLeft: "4px",
  },
  toast: {
    position: "fixed",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "var(--osmos-brand-green)",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "'Open Sans', sans-serif",
    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
    zIndex: 9999,
    pointerEvents: "none",
  },
};

export default function AccountManagerMappingPage() {
  const [hovered, setHovered] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const fileInputRef = useRef(null);

  const handleDropzoneClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      showToast();
      e.target.value = "";
    }
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div style={styles.page}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span>Control Center</span>
        <span style={styles.breadcrumbSep}>&gt;</span>
        <span>User Access Management</span>
      </div>

      {/* Title */}
      <div style={styles.title}>Advertiser Account Manager Mapping</div>

      {/* Info Banner */}
      <div style={styles.infoBanner}>
        <div style={styles.infoBannerLeft}>
          <div style={styles.fileIcon}>
            <svg style={styles.fileIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div style={styles.infoBannerText}>
            <span style={styles.fileName}>merchant_account_manager_mapping.xlsx</span>
            <span style={styles.fileDesc}>
              Excel template with sample data. Get the template file with the correct format and structure
            </span>
          </div>
        </div>
        <a style={styles.downloadLink} href="#download" onClick={(e) => e.preventDefault()}>
          ↓ Download file for all advertisers
        </a>
      </div>

      {/* Section Label */}
      <div style={styles.sectionLabel}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 16 12 12 8 16"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        </svg>
        Upload Your File
      </div>

      {/* Dropzone */}
      <div
        style={{
          ...styles.dropzone,
          ...(hovered ? styles.dropzoneHover : {}),
        }}
        onClick={handleDropzoneClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onDragOver={(e) => { e.preventDefault(); setHovered(true); }}
        onDragLeave={() => setHovered(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHovered(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            showToast();
          }
        }}
      >
        <div style={styles.uploadCircle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16"/>
            <line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
          </svg>
        </div>
        <span style={styles.dropzoneText}>Drag and drop or Upload your .xlsx file here</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* How it works card */}
      <div style={styles.howItWorksCard}>
        <div style={styles.howItWorksHeader}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--osmos-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          How it works?
        </div>
        <ul style={styles.bulletList}>
          <li style={styles.bulletItem}>
            Click on "Download all advertiser details" link to download account manager details for all advertisers
          </li>
          <li style={styles.bulletItem}>
            Update the account manager for the advertisers you want to update
          </li>
          <li style={styles.bulletItem}>
            Save the file
          </li>
          <li style={styles.bulletItem}>
            Upload the file back to apply changes.
            <a style={styles.learnMore} href="#learn-more" onClick={(e) => e.preventDefault()}>
              Learn More
            </a>
          </li>
        </ul>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div style={styles.toast}>File uploaded successfully</div>
      )}
    </div>
  );
}
