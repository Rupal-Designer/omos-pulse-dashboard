import React, { useState } from "react";

const ADVERTISER_OPTIONS = [
  "Demo Multi Wallet (DEMO_MULTI_WALLET)",
  "Advertiser Alpha (ADV_ALPHA)",
  "Advertiser Beta (ADV_BETA)",
];

const INITIAL_USERS = [
  { id: 1, name: "Aayushi Patel",    email: "aayushi.patel@onlinesales.ai",             role: "Viewer" },
  { id: 2, name: "Demo Multi Wallet",email: "demo_multi_wallet@internal-qa-ecommerce.com", role: "Editor" },
  { id: 3, name: "Soham Kumbhar",    email: "soham.kumbhar@onlinesales.ai",             role: "Administrator" },
  { id: 4, name: "Swami Patil",      email: "swami.patil@onlinesales.ai",               role: "Viewer" },
];

const ACCESS_ROLE_OPTIONS = ["Administrator", "Viewer", "Editor", "API Access"];

const s = {
  page: {
    fontFamily: "'Open Sans', sans-serif",
    padding: "24px 32px",
    background: "var(--osmos-bg-subtle)",
    minHeight: "100vh",
    color: "var(--osmos-fg)",
  },
  breadcrumb: {
    fontSize: "12px",
    color: "var(--osmos-fg-muted)",
    marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "var(--osmos-fg)",
    margin: "0 0 16px 0",
  },
  advertiserRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  advertiserLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--osmos-fg-muted)",
    whiteSpace: "nowrap",
  },
  advertiserSelect: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "13px",
    padding: "7px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: "6px",
    outline: "none",
    color: "var(--osmos-fg)",
    background: "#fff",
    minWidth: "280px",
    cursor: "pointer",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  changeLogBtn: {
    fontFamily: "'Open Sans', sans-serif",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--osmos-brand-primary)",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "13px",
    padding: "7px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: "6px",
    outline: "none",
    color: "var(--osmos-fg)",
    background: "#fff",
    width: "200px",
  },
  addButton: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    padding: "7px 16px",
    background: "var(--osmos-brand-primary)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  tableWrapper: {
    background: "#fff",
    border: "1px solid var(--osmos-border)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    textAlign: "left",
    padding: "11px 16px",
    fontWeight: "600",
    fontSize: "12px",
    color: "var(--osmos-fg-muted)",
    background: "var(--osmos-bg-subtle)",
    borderBottom: "1px solid var(--osmos-border)",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  thSortable: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },
  td: {
    padding: "11px 16px",
    borderBottom: "1px solid var(--osmos-border)",
    color: "var(--osmos-fg)",
    verticalAlign: "middle",
  },
  tdMuted: {
    padding: "11px 16px",
    borderBottom: "1px solid var(--osmos-border)",
    color: "var(--osmos-fg-muted)",
    verticalAlign: "middle",
  },
  tdDelete: {
    padding: "8px 16px",
    borderBottom: "1px solid var(--osmos-border)",
    textAlign: "right",
    verticalAlign: "middle",
    width: "48px",
  },
  roleCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    maxWidth: "280px",
    overflow: "hidden",
  },
  roleText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "255px",
    display: "inline-block",
  },
  chevron: {
    color: "var(--osmos-fg-muted)",
    fontSize: "10px",
    flexShrink: 0,
  },
  deleteBtn: {
    fontFamily: "'Open Sans', sans-serif",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--osmos-fg-subtle)",
    padding: "4px 6px",
    borderRadius: "4px",
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
  },
  emptyRow: {
    textAlign: "center",
    padding: "40px",
    color: "var(--osmos-fg-muted)",
    fontSize: "13px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "var(--osmos-bg)",
    borderRadius: "10px",
    padding: "28px 32px",
    width: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    fontFamily: "'Open Sans', sans-serif",
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--osmos-fg)",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--osmos-fg-muted)",
    marginBottom: "5px",
  },
  fieldInput: {
    fontFamily: "'Open Sans', sans-serif",
    width: "100%",
    fontSize: "13px",
    padding: "8px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: "6px",
    outline: "none",
    color: "var(--osmos-fg)",
    background: "#fff",
    boxSizing: "border-box",
    marginBottom: "14px",
  },
  fieldSelect: {
    fontFamily: "'Open Sans', sans-serif",
    width: "100%",
    fontSize: "13px",
    padding: "8px 12px",
    border: "1px solid var(--osmos-border)",
    borderRadius: "6px",
    outline: "none",
    color: "var(--osmos-fg)",
    background: "#fff",
    boxSizing: "border-box",
    marginBottom: "20px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    padding: "8px 18px",
    background: "none",
    border: "1px solid var(--osmos-border)",
    borderRadius: "6px",
    cursor: "pointer",
    color: "var(--osmos-fg-muted)",
  },
  saveBtn: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    padding: "8px 18px",
    background: "var(--osmos-brand-primary)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  toast: {
    position: "fixed",
    bottom: "28px",
    right: "32px",
    background: "#222",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "'Open Sans', sans-serif",
    zIndex: 2000,
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },
  errorText: {
    color: "#e53935",
    fontSize: "11px",
    marginTop: "-10px",
    marginBottom: "10px",
    display: "block",
  },
};

export default function AdvertiserUserRolePage() {
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(ADVERTISER_OPTIONS[0]);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Administrator" });
  const [errors, setErrors] = useState({});

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), name: form.name.trim(), email: form.email.trim(), role: form.role },
    ]);
    setModalOpen(false);
    setForm({ name: "", email: "", role: "Administrator" });
    setErrors({});
    showToast("User added successfully");
  };

  const openModal = () => {
    setForm({ name: "", email: "", role: "Administrator" });
    setErrors({});
    setModalOpen(true);
  };

  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>Control Center &rsaquo; User Role Management</div>
      <h1 style={s.pageTitle}>Advertiser User</h1>

      <div style={s.advertiserRow}>
        <span style={s.advertiserLabel}>Select Advertiser:</span>
        <select
          style={s.advertiserSelect}
          value={selectedAdvertiser}
          onChange={(e) => setSelectedAdvertiser(e.target.value)}
        >
          {ADVERTISER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div style={s.topBar}>
        <button style={s.changeLogBtn} onClick={() => showToast("Opening change log...")}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Change Log
        </button>
        <div style={s.topBarRight}>
          <input
            style={s.searchInput}
            placeholder="Search Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button style={s.addButton} onClick={openModal}>
            <span>＋</span> Add New User
          </button>
        </div>
      </div>

      <div style={s.tableWrapper}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>
                <span style={s.thSortable} onClick={() => setSortAsc((v) => !v)}>
                  Name <span style={{ fontSize: "10px" }}>{sortAsc ? "▲" : "▼"}</span>
                </span>
              </th>
              <th style={s.th}>Email</th>
              <th style={s.th}>Access Role</th>
              <th style={{ ...s.th, textAlign: "right" }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={s.emptyRow}>No users found.</td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td style={s.td}>{u.name}</td>
                  <td style={s.tdMuted}>{u.email}</td>
                  <td style={s.td}>
                    <span style={s.roleCell}>
                      <span style={s.roleText} title={u.role}>{u.role}</span>
                      <span style={s.chevron}>&#9662;</span>
                    </span>
                  </td>
                  <td style={s.tdDelete}>
                    <button style={s.deleteBtn} title="Delete user" onClick={() => handleDelete(u.id)}>
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={s.overlay} onClick={() => setModalOpen(false)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalTitle}>Add New User</div>
            <label style={s.label}>Name *</label>
            <input
              style={s.fieldInput}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            {errors.name && <span style={s.errorText}>{errors.name}</span>}
            <label style={s.label}>Email *</label>
            <input
              style={s.fieldInput}
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <span style={s.errorText}>{errors.email}</span>}
            <label style={s.label}>Access Role</label>
            <select
              style={s.fieldSelect}
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            >
              {ACCESS_ROLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
              <button style={s.saveBtn} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}
