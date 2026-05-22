import { useState } from 'react';
import { SearchBar, Select, Button, Checkbox } from '../../../../ui';
import { DataTable } from '../../design-system/tables';

// ── Mock product catalog ──────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: 1,  name: 'Slim-Fit Cotton Shirt',   brand: 'Osmos Apparel', category: 'Apparel',     availability: 'In Stock',    price: '₹1,299', salePrice: '₹999',   img: '👕', recent: true },
  { id: 2,  name: 'Wireless Noise-Cancel Headphones', brand: 'SoundWave', category: 'Electronics', availability: 'In Stock', price: '₹8,999', salePrice: '₹6,499', img: '🎧', recent: true },
  { id: 3,  name: 'Vitamin C Serum 30ml',    brand: 'GlowLab',      category: 'Beauty',       availability: 'In Stock',    price: '₹699',   salePrice: '₹549',   img: '✨', recent: true },
  { id: 4,  name: 'Running Shoes Pro',        brand: 'Stride',       category: 'Footwear',     availability: 'Low Stock',   price: '₹4,499', salePrice: '₹3,799', img: '👟', recent: false },
  { id: 5,  name: 'Stainless Steel Bottle',  brand: 'EcoPure',      category: 'Home',         availability: 'In Stock',    price: '₹599',   salePrice: '',        img: '🍶', recent: false },
  { id: 6,  name: 'Face Moisturiser SPF 30', brand: 'GlowLab',      category: 'Beauty',       availability: 'Out of Stock',price: '₹1,199', salePrice: '₹899',   img: '🧴', recent: false },
  { id: 7,  name: 'Yoga Mat — 6mm',          brand: 'FitZone',      category: 'Sports',       availability: 'In Stock',    price: '₹899',   salePrice: '',        img: '🧘', recent: false },
  { id: 8,  name: 'Smart Watch Series 3',    brand: 'TechWear',     category: 'Electronics',  availability: 'In Stock',    price: '₹12,999',salePrice: '₹10,499',img: '⌚', recent: false },
];

const CATEGORIES = ['All Categories', 'Apparel', 'Electronics', 'Beauty', 'Footwear', 'Home', 'Sports'];
const AVAIL_OPTS = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

function ProductImage({ img }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--osmos-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
      {img}
    </div>
  );
}

function AvailBadge({ availability }) {
  const color = availability === 'In Stock' ? 'var(--osmos-brand-green)'
    : availability === 'Low Stock' ? 'var(--osmos-brand-amber)'
    : 'var(--osmos-fg-subtle)';
  return <span style={{ fontSize: 11, fontWeight: 500, color, fontFamily: "'Open Sans', sans-serif" }}>{availability}</span>;
}

export default function ProductSelectionStep({ campaignData, onChange }) {
  const [mode, setMode]           = useState('browse'); // 'browse' | 'csv' | 'saved'
  const [query, setQuery]         = useState('');
  const [category, setCategory]   = useState('All Categories');
  const [avail, setAvail]         = useState('All');
  const selectedIds               = new Set((campaignData.selectedProducts || []).map(p => p.id));

  function filteredProducts() {
    return ALL_PRODUCTS.filter(p => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.brand.toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== 'All Categories' && p.category !== category) return false;
      if (avail !== 'All' && p.availability !== avail) return false;
      return true;
    });
  }

  function toggleProduct(product) {
    const current = campaignData.selectedProducts || [];
    if (selectedIds.has(product.id)) {
      onChange({ selectedProducts: current.filter(p => p.id !== product.id) });
    } else {
      onChange({ selectedProducts: [...current, product] });
    }
  }

  const filtered = filteredProducts();
  const recentFirst = [...ALL_PRODUCTS.filter(p => p.recent), ...ALL_PRODUCTS.filter(p => !p.recent)];
  const displayProducts = (query || category !== 'All Categories' || avail !== 'All') ? filtered : recentFirst;

  const TABLE_COLUMNS = [
    { key: '_img',   label: '',           width: 52,  render: (_, row) => <ProductImage img={row.img} /> },
    { key: 'name',   label: 'Name',       width: 200, render: (v, row) => (
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>{v}</div>
        {row.recent && <span style={{ fontSize: 10, color: 'var(--osmos-brand-primary)', fontWeight: 600, fontFamily: "'Open Sans', sans-serif" }}>Recently used</span>}
      </div>
    )},
    { key: 'brand',          label: 'Brand',       width: 120 },
    { key: 'category',       label: 'Category',    width: 100 },
    { key: 'availability',   label: 'Availability',width: 110, render: (v) => <AvailBadge availability={v} /> },
    { key: 'price',          label: 'Price',       width: 90 },
    { key: 'salePrice',      label: 'Sale Price',  width: 90, render: (v) => v || <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span> },
    { key: '_select',        label: '',            width: 48,  render: (_, row) => (
      <Checkbox
        checked={selectedIds.has(row.id)}
        onChange={() => toggleProduct(row)}
      />
    )},
  ];

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 800 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px' }}>
        Product Selection
      </h2>
      <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', margin: '0 0 20px' }}>
        Choose the products you want to promote. Selected products will appear in your ads.
      </p>

      {/* How to choose toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg-muted)' }}>How to choose products?</span>
        <div style={{ display: 'flex', gap: 0, border: `1px solid var(--osmos-border)`, borderRadius: 8, overflow: 'hidden' }}>
          {[
            { value: 'browse', label: 'Browse Catalog' },
            { value: 'csv',    label: 'Upload CSV' },
            { value: 'saved',  label: 'Saved Group' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              style={{
                padding: '6px 14px', border: 'none', cursor: 'pointer',
                background: mode === opt.value ? 'var(--osmos-brand-primary)' : 'var(--osmos-bg)',
                color: mode === opt.value ? '#fff' : 'var(--osmos-fg-muted)',
                fontSize: 12, fontWeight: mode === opt.value ? 600 : 400,
                fontFamily: "'Open Sans', sans-serif", transition: 'all 0.15s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected count bar */}
      {selectedIds.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: `var(--osmos-brand-primary)0D`, border: `1px solid var(--osmos-brand-primary)33`, borderRadius: 8, marginBottom: 14, fontSize: 13, color: 'var(--osmos-brand-primary)', fontWeight: 600 }}>
          <span>✓ {selectedIds.size} product{selectedIds.size !== 1 ? 's' : ''} selected</span>
          <button
            onClick={() => onChange({ selectedProducts: [] })}
            style={{ fontSize: 11, color: 'var(--osmos-fg-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}
          >
            Clear all
          </button>
        </div>
      )}

      {mode === 'browse' && (
        <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, overflow: 'hidden' }}>
          {/* Search + filters */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid var(--osmos-border)`, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <SearchBar
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, minWidth: 200 }}
            />
            <Select
              value={category}
              onChange={e => setCategory(e.target.value)}
              options={CATEGORIES.map(c => ({ value: c, label: c }))}
              style={{ minWidth: 140, fontFamily: "'Open Sans', sans-serif" }}
            />
            <Select
              value={avail}
              onChange={e => setAvail(e.target.value)}
              options={AVAIL_OPTS.map(a => ({ value: a, label: a }))}
              style={{ minWidth: 120, fontFamily: "'Open Sans', sans-serif" }}
            />
            {(query || category !== 'All Categories' || avail !== 'All') && (
              <button
                onClick={() => { setQuery(''); setCategory('All Categories'); setAvail('All'); }}
                style={{ padding: '6px 12px', borderRadius: 7, border: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg-subtle)', color: 'var(--osmos-fg-muted)', fontSize: 12, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}
              >
                Clear filters
              </button>
            )}
          </div>

          {displayProducts.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--osmos-fg-subtle)', fontSize: 13 }}>
              No products match your filters. Try adjusting the category or availability.
            </div>
          ) : (
            <DataTable
              columns={TABLE_COLUMNS}
              data={displayProducts.map(p => ({ ...p, _img: null, _select: null }))}
            />
          )}
        </div>
      )}

      {mode === 'csv' && (
        <div style={{ background: 'var(--osmos-bg)', border: `1px dashed var(--osmos-border)`, borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', margin: '0 0 6px' }}>Upload a CSV file</p>
          <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', margin: '0 0 16px' }}>Format: SKU ID, Product Name, Price — one row per product</p>
          <label style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 8, border: `1px solid var(--osmos-brand-primary)`, color: 'var(--osmos-brand-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={() => {}} />
            Choose CSV file
          </label>
        </div>
      )}

      {mode === 'saved' && (
        <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)', margin: '0 0 6px' }}>No saved groups yet</p>
          <p style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', margin: '0 0 16px' }}>Save product groups (e.g. "Holiday SKUs") from past campaigns to reuse here.</p>
        </div>
      )}
    </div>
  );
}
