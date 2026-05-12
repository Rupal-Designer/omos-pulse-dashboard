import React from 'react';
import { DataTable, TableCard, ColHeader, useOsmosTable } from '../../shared/components/data-table';

const COLUMNS = [
  { id: 'device',       accessorKey: 'device',       header: 'Device Name',                                          meta: { label: 'Device Name' } },
  { id: 'campaigns',    accessorKey: 'campaigns',    header: () => <ColHeader label="No. of Campaigns" info />,       meta: { label: 'No. of Campaigns' },   enableSorting: false },
  { id: 'clicks',       accessorKey: 'clicks',       header: () => <ColHeader label="Link Clicks"      info />,       meta: { label: 'Link Clicks' },        enableSorting: false },
  { id: 'productViews', accessorKey: 'productViews', header: () => <ColHeader label="Total Product Views" info />,    meta: { label: 'Total Product Views' },enableSorting: false },
  { id: 'addToCart',    accessorKey: 'addToCart',    header: () => <ColHeader label="Add to Carts"     info />,       meta: { label: 'Add to Carts' },       enableSorting: false },
  { id: 'orders',       accessorKey: 'orders',       header: () => <ColHeader label="Orders"           info />,       meta: { label: 'Orders' },             enableSorting: false },
  { id: 'revenue',      accessorKey: 'revenue',      header: () => <ColHeader label="Total Revenue"    info />,       meta: { label: 'Total Revenue' },      enableSorting: false },
];

const DATA = [
  { device: 'Desktop',  campaigns: '15', clicks: '3.2M', productViews: '3.7M', addToCart: '4.2M', orders: '4.7M', revenue: '$750K' },
  { device: 'Mobile',   campaigns: '30', clicks: '3.3M', productViews: '3.8M', addToCart: '4.3M', orders: '4.8M', revenue: '$700K' },
  { device: 'Tablet',   campaigns: '15', clicks: '3.4M', productViews: '3.9M', addToCart: '4.4M', orders: '4.9M', revenue: '$850K' },
  { device: 'E-Reader', campaigns: '60', clicks: '3.5M', productViews: '4.0M', addToCart: '4.5M', orders: '5.0M', revenue: '$950K' },
  { device: 'Unknown',  campaigns: '45', clicks: '3.6M', productViews: '4.1M', addToCart: '4.6M', orders: '5.1M', revenue: '$900K' },
];

function DeviceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

export default function DeviceTable() {
  const { table, globalFilter, setGlobalFilter } = useOsmosTable({
    columns: COLUMNS,
    data: DATA,
    features: { sort: true, search: true, columnVisibility: true },
  });

  return (
    <TableCard
      icon={<DeviceIcon />}
      title="Performance by Device"
      searchPlaceholder="Search Category L1"
      footerLeft="Comparison mode not applicable"
      footerRight="One Filter Applicable: Date"
      table={table}
      globalFilter={globalFilter}
      onSearch={setGlobalFilter}
    >
      <DataTable table={table} />
    </TableCard>
  );
}
