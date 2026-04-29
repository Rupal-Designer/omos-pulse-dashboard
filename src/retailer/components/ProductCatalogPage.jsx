import React, { useState } from 'react';
import { Icon } from '../../ui/atoms/Icon';
import { Toast, useToast } from '../../ui/atoms/Toast';

const INITIAL_PRODUCTS = [
  { id: 1, status: 'Active', productId: 'PRD001', name: 'Colgate Strong Teeth Toothpaste 200g', category: 'Oral Care', brand: 'Colgate', mrp: '₹120', sellingPrice: '₹99', stock: '1,240' },
  { id: 2, status: 'Active', productId: 'PRD002', name: 'Dove Soap Bar 100g', category: 'Personal Care', brand: 'Dove', mrp: '₹60', sellingPrice: '₹52', stock: '3,560' },
  { id: 3, status: 'Active', productId: 'PRD003', name: 'Maggi Noodles 70g Pack', category: 'Food', brand: 'Nestle', mrp: '₹14', sellingPrice: '₹14', stock: '8,900' },
  { id: 4, status: 'Inactive', productId: 'PRD004', name: 'Nike Air Max Running Shoes', category: 'Footwear', brand: 'Nike', mrp: '₹8,999', sellingPrice: '₹7,499', stock: '45' },
  { id: 5, status: 'Active', productId: 'PRD005', name: 'Samsung 65W Fast Charger', category: 'Electronics', brand: 'Samsung', mrp: '₹2,499', sellingPrice: '₹1,899', stock: '230' },
  { id: 6, status: 'Active', productId: 'PRD006', name: 'Britannia Good Day Biscuits 200g', category: 'Snacks', brand: 'Britannia', mrp: '₹40', sellingPrice: '₹38', stock: '12,400' },
  { id: 7, status: 'Active', productId: 'PRD007', name: 'HUL Surf Excel Matic 1kg', category: 'Home Care', brand: 'HUL', mrp: '₹370', sellingPrice: '₹329', stock: '780' },
  { id: 8, status: 'Inactive', productId: 'PRD008', name: 'Gillette Mach3 Razor', category: 'Grooming', brand: 'Gillette', mrp: '₹299', sellingPrice: '₹249', stock: '120' },
];

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8 }) {
  return <Icon size={size} color={stroke} strokeWidth={sw}>{d}</Icon>;
}

export default function ProductCatalogPage() {
  const [data, setData] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const { toast, showToast } = useToast();

  function handleDelete(id) {
    setData(d => d.filter(r => r.id !== id));
    showToast('Product deleted');
  }

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.productId.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      <Toast {...toast} />

      <div style={{ background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)' }}>
            Products
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--osmos-brand-primary-muted)', color: 'var(--osmos-brand-primary)', borderRadius: 10, fontSize: 11, fontWeight: 700, padding: '1px 8px', marginLeft: 6 }}>1,240</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
              <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 180 }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-bg)', color: 'var(--osmos-fg)', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
              ↑ Upload Catalog
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
              ＋ Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Status', 'Product ID', 'Product Name', 'Category', 'Brand', 'MRP', 'Selling Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--osmos-fg-muted)', fontSize: 13 }}>No products found.</td></tr>
              ) : filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: row.status === 'Active' ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-bg-subtle)', color: row.status === 'Active' ? 'var(--osmos-brand-green)' : 'var(--osmos-fg-muted)' }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontFamily: 'monospace', fontSize: 11 }}>{row.productId}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.category}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.brand}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.mrp}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.sellingPrice}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', textAlign: 'right' }}>{row.stock}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button style={{ background: 'none', border: '1px solid var(--osmos-border)', borderRadius: 5, color: 'var(--osmos-fg-muted)', fontSize: 11, padding: '3px 10px', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Edit</button>
                      <button onClick={() => handleDelete(row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ef4444', lineHeight: 1 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
