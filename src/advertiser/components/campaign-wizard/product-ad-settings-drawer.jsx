import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../../ui";

// ─── Design tokens ───────────────────────────────────────────────────────────
const FONT    = "'Open Sans', sans-serif";
const TEXT    = "var(--osmos-fg)";
const TEXT_MID = "var(--osmos-fg-muted)";
const TEXT_SUB = "var(--osmos-fg-subtle)";
const BORDER  = "var(--osmos-border)";
const BG      = "var(--osmos-bg)";
const BG_SUB  = "var(--osmos-bg-subtle)";
const ACCENT  = "var(--osmos-brand-primary)";
const ACCENT_M = "var(--osmos-brand-primary-muted)";

// ─── Hand-rolled icon components ─────────────────────────────────────────────
const CloseIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Type-specific icons (hand-rolled, no lucide dependency)
const PackageIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const DollarIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const KeyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const GlobeIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ─── Static data ─────────────────────────────────────────────────────────────
const mockProducts = [
  { id: "1", name: "iPhone 15 Pro Max",  category: "Electronics", sku: "APPL-IP15PM", price: 1199 },
  { id: "2", name: "Samsung Galaxy S24", category: "Electronics", sku: "SAMS-GS24",   price: 999  },
  { id: "3", name: "Sony WH-1000XM5",   category: "Electronics", sku: "SONY-WH1000", price: 399  },
  { id: "4", name: "Nike Air Max 90",    category: "Footwear",    sku: "NIKE-AM90",   price: 130  },
  { id: "5", name: "Adidas Ultraboost",  category: "Footwear",    sku: "ADID-UB22",   price: 180  },
  { id: "6", name: "Levi's 501 Jeans",   category: "Apparel",     sku: "LEVI-501",    price: 69   },
];

const mockCategories = [
  { id: "electronics", name: "Electronics",            productCount: 1250 },
  { id: "footwear",    name: "Footwear",               productCount: 890  },
  { id: "apparel",     name: "Apparel",                productCount: 2100 },
  { id: "home",        name: "Home & Garden",          productCount: 1560 },
  { id: "beauty",      name: "Beauty & Personal Care", productCount: 980  },
];

const mockNetworks = [
  { id: "amazon",    name: "Amazon",    logo: "🛒", reach: "150M+" },
  { id: "walmart",   name: "Walmart",   logo: "🏪", reach: "120M+" },
  { id: "target",    name: "Target",    logo: "🎯", reach: "80M+"  },
  { id: "costco",    name: "Costco",    logo: "📦", reach: "60M+"  },
  { id: "kroger",    name: "Kroger",    logo: "🛍️", reach: "45M+"  },
  { id: "instacart", name: "Instacart", logo: "🚗", reach: "40M+"  },
];

// ─── Shared sub-components ───────────────────────────────────────────────────

/** Reusable 2-column mode-picker card */
function ModeCard({ active, onClick, label, description }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: FONT,
        padding: 16,
        borderRadius: 8,
        border: active ? `2px solid ${ACCENT}` : hov ? "2px solid var(--osmos-border-muted, #dedede)" : `2px solid ${BORDER}`,
        background: active ? ACCENT_M : BG,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.15s",
        outline: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT }}>{label}</span>
        {active && <CheckIcon size={16} color={ACCENT} />}
      </div>
      <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_MID, margin: 0 }}>{description}</p>
    </button>
  );
}

/** Selectable row item (categories, products, networks) */
function SelectableRow({ active, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: FONT,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
        borderRadius: 8,
        border: active ? `1px solid ${ACCENT}` : hov ? "1px solid var(--osmos-border-muted, #dedede)" : `1px solid ${BORDER}`,
        background: active ? ACCENT_M : BG,
        cursor: "pointer",
        transition: "all 0.15s",
        outline: "none",
        boxSizing: "border-box",
      }}
    >
      {children}
      {active && <CheckIcon size={16} color={ACCENT} />}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ProductAdSettingsDrawer({ open, onClose, type, data, updateData }) {
  const [searchQuery,        setSearchQuery]        = useState("");
  const [selectedProducts,   setSelectedProducts]   = useState(data.productSelection?.selectedProducts  || []);
  const [selectedCategories, setSelectedCategories] = useState(data.productSelection?.selectedCategories || []);
  const [productMode,        setProductMode]        = useState(data.productSelection?.mode     || "auto");
  const [bidMode,            setBidMode]            = useState(data.bidSettings?.mode          || "auto");
  const [categoryBids,       setCategoryBids]       = useState(data.bidSettings?.categoryBids  || {});
  const [keywordMode,        setKeywordMode]        = useState(data.keywordSettings?.mode      || "all");
  const [keywords,           setKeywords]           = useState(data.keywordSettings?.keywords  || []);
  const [keywordInput,       setKeywordInput]       = useState("");
  const [networkMode,        setNetworkMode]        = useState(data.networkTargeting?.mode     || "all");
  const [selectedNetworks,   setSelectedNetworks]   = useState(data.networkTargeting?.networks || []);

  // Hover states
  const [closeHov,  setCloseHov]  = useState(false);
  const [cancelHov, setCancelHov] = useState(false);

  useEffect(() => {
    if (data.productSelection) {
      setProductMode(data.productSelection.mode);
      setSelectedProducts(data.productSelection.selectedProducts   || []);
      setSelectedCategories(data.productSelection.selectedCategories || []);
    }
    if (data.bidSettings) {
      setBidMode(data.bidSettings.mode);
      setCategoryBids(data.bidSettings.categoryBids || {});
    }
    if (data.keywordSettings) {
      setKeywordMode(data.keywordSettings.mode);
      setKeywords(data.keywordSettings.keywords || []);
    }
    if (data.networkTargeting) {
      setNetworkMode(data.networkTargeting.mode);
      setSelectedNetworks(data.networkTargeting.networks || []);
    }
  }, [data]);

  const handleSave = () => {
    if (type === "product") {
      updateData({
        productSelection: {
          mode: productMode,
          selectedProducts:   productMode === "manual" ? selectedProducts   : undefined,
          selectedCategories: productMode === "manual" ? selectedCategories : undefined,
        },
      });
    } else if (type === "bid") {
      updateData({
        bidSettings: {
          mode: bidMode,
          categoryBids: bidMode === "manual" ? categoryBids : undefined,
        },
      });
    } else if (type === "keyword") {
      updateData({
        keywordSettings: {
          mode: keywordMode,
          keywords: keywordMode === "manual" ? keywords : undefined,
        },
      });
    } else if (type === "network") {
      updateData({
        networkTargeting: {
          mode: networkMode,
          networks: networkMode === "manual" ? selectedNetworks : undefined,
        },
      });
    }
    onClose();
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw) => setKeywords(keywords.filter((k) => k !== kw));
  const toggleProduct  = (id) => setSelectedProducts((prev)   => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  const toggleCategory = (id) => setSelectedCategories((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  const toggleNetwork  = (id) => setSelectedNetworks((prev)   => prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]);

  const getTitle = () => {
    switch (type) {
      case "product": return "Product Selection";
      case "bid":     return "Bid Settings";
      case "keyword": return "Keyword Settings";
      case "network": return "Network Targeting";
      default:        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "product": return <PackageIcon size={20} color="#f59e0b" />;
      case "bid":     return <DollarIcon  size={20} color="#10b981" />;
      case "keyword": return <KeyIcon     size={20} color="#7349a1" />; // brand-secondary — no osmos token yet
      case "network": return <GlobeIcon   size={20} color="#0ea5e9" />;
      default:        return null;
    }
  };

  if (!open || !type) return null;

  // ── Shared label style ──
  const labelStyle = {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 500,
    color: TEXT,
    display: "block",
  };

  // ── Shared input style ──
  const inputStyle = {
    fontFamily: FONT,
    width: "100%",
    padding: "8px 12px",
    fontSize: 13,
    color: TEXT,
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box",
  };

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
      />

      {/* Drawer panel */}
      <div style={{
        position: "relative",
        width: 500,
        maxWidth: "100%",
        height: "100%",
        background: BG,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT,
      }}>
        {/* ── Header ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {getIcon()}
            <h2 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: TEXT, margin: 0 }}>
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            onMouseEnter={() => setCloseHov(true)}
            onMouseLeave={() => setCloseHov(false)}
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: "none",
              background: closeHov ? BG_SUB : "transparent",
              color: TEXT_MID,
              cursor: "pointer",
              transition: "all 0.15s",
              padding: 0,
            }}
          >
            <CloseIcon size={20} color={TEXT_MID} />
          </button>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

          {/* ===== PRODUCT ===== */}
          {type === "product" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Mode Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={labelStyle}>Selection Mode</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <ModeCard
                    active={productMode === "auto"}
                    onClick={() => setProductMode("auto")}
                    label="Automatic"
                    description="AI selects best performing products"
                  />
                  <ModeCard
                    active={productMode === "manual"}
                    onClick={() => setProductMode("manual")}
                    label="Manual"
                    description="Select specific products or categories"
                  />
                </div>
              </div>

              {productMode === "manual" && (
                <>
                  {/* Search */}
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}>
                      <SearchIcon size={16} color={TEXT_SUB} />
                    </span>
                    <input
                      placeholder="Search products or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 36 }}
                    />
                  </div>

                  {/* Categories */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <label style={labelStyle}>Categories</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {mockCategories.map((cat) => (
                        <SelectableRow
                          key={cat.id}
                          active={selectedCategories.includes(cat.id)}
                          onClick={() => toggleCategory(cat.id)}
                        >
                          <div>
                            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT, margin: 0 }}>{cat.name}</p>
                            <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_SUB, margin: 0 }}>{cat.productCount.toLocaleString()} products</p>
                          </div>
                        </SelectableRow>
                      ))}
                    </div>
                  </div>

                  {/* Individual Products */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <label style={labelStyle}>Individual Products</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 240, overflowY: "auto" }}>
                      {mockProducts.map((product) => (
                        <SelectableRow
                          key={product.id}
                          active={selectedProducts.includes(product.id)}
                          onClick={() => toggleProduct(product.id)}
                        >
                          <div>
                            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT, margin: 0 }}>{product.name}</p>
                            <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_SUB, margin: 0 }}>{product.category} · ${product.price}</p>
                          </div>
                        </SelectableRow>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===== BID ===== */}
          {type === "bid" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Mode Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={labelStyle}>Bidding Mode</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <ModeCard
                    active={bidMode === "auto"}
                    onClick={() => setBidMode("auto")}
                    label="Automatic"
                    description="AI optimizes bids for best ROI"
                  />
                  <ModeCard
                    active={bidMode === "manual"}
                    onClick={() => setBidMode("manual")}
                    label="Manual"
                    description="Set custom bids per category"
                  />
                </div>
              </div>

              {bidMode === "manual" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <label style={labelStyle}>Category Bids</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {mockCategories.map((cat) => (
                      <div
                        key={cat.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 12,
                          background: BG_SUB,
                          borderRadius: 8,
                        }}
                      >
                        <div>
                          <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT, margin: 0 }}>{cat.name}</p>
                          <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_SUB, margin: 0 }}>Suggested: $0.50 - $1.20</p>
                        </div>
                        <div style={{ position: "relative", width: 96 }}>
                          <span style={{
                            position: "absolute",
                            left: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontFamily: FONT,
                            fontSize: 13,
                            color: TEXT_MID,
                            pointerEvents: "none",
                          }}>$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={categoryBids[cat.id] || ""}
                            onChange={(e) => setCategoryBids({ ...categoryBids, [cat.id]: e.target.value })}
                            placeholder="0.00"
                            style={{
                              ...inputStyle,
                              paddingLeft: 24,
                              height: 32,
                              width: "100%",
                              fontSize: 13,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== KEYWORD ===== */}
          {type === "keyword" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Mode Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={labelStyle}>Keyword Mode</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <ModeCard
                    active={keywordMode === "all"}
                    onClick={() => setKeywordMode("all")}
                    label="All Keywords"
                    description="Target all relevant keywords"
                  />
                  <ModeCard
                    active={keywordMode === "manual"}
                    onClick={() => setKeywordMode("manual")}
                    label="Manual"
                    description="Specify exact keywords to target"
                  />
                </div>
              </div>

              {keywordMode === "manual" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <label style={labelStyle}>Add Keywords</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      placeholder="Enter keyword..."
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <Button
                      variant="primary"
                      onClick={addKeyword}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 12px",
                        height: 36,
                        minWidth: 36,
                      }}
                    >
                      <PlusIcon size={16} color="#fff" />
                    </Button>
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_SUB, margin: 0 }}>
                    Phrase match type. Max 50 keywords.
                  </p>

                  {keywords.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={labelStyle}>Keywords ({keywords.length})</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {keywords.map((kw) => (
                          <KeywordChip key={kw} label={kw} onRemove={() => removeKeyword(kw)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ===== NETWORK ===== */}
          {type === "network" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Mode Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={labelStyle}>Network Targeting</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <ModeCard
                    active={networkMode === "all"}
                    onClick={() => setNetworkMode("all")}
                    label="All Networks"
                    description="Show on all retail networks"
                  />
                  <ModeCard
                    active={networkMode === "manual"}
                    onClick={() => setNetworkMode("manual")}
                    label="Select Networks"
                    description="Choose specific retail networks"
                  />
                </div>
              </div>

              {networkMode === "manual" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <label style={labelStyle}>Select Retail Networks</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {mockNetworks.map((network) => (
                      <SelectableRow
                        key={network.id}
                        active={selectedNetworks.includes(network.id)}
                        onClick={() => toggleNetwork(network.id)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 24 }}>{network.logo}</span>
                          <div style={{ textAlign: "left" }}>
                            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: TEXT, margin: 0 }}>{network.name}</p>
                            <p style={{ fontFamily: FONT, fontSize: 12, color: TEXT_SUB, margin: 0 }}>Reach: {network.reach} users</p>
                          </div>
                        </div>
                      </SelectableRow>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 12,
          padding: "16px 24px",
          borderTop: `1px solid ${BORDER}`,
        }}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Keyword chip — isolated hover state ──────────────────────────────────────
function KeywordChip({ label, onRemove }) {
  const [hov, setHov] = useState(false);
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "6px 12px",
      background: BG_SUB,
      color: TEXT,
      fontSize: 13,
      fontFamily: FONT,
      borderRadius: 999,
      border: `1px solid ${BORDER}`,
    }}>
      {label}
      <button
        onClick={onRemove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          alignItems: "center",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: hov ? "#d83c3b" : TEXT_MID,
          transition: "color 0.15s",
        }}
      >
        <CloseIcon size={14} color={hov ? "#d83c3b" : TEXT_MID} />
      </button>
    </span>
  );
}
