import React from 'react';
import { DataTable, TableCard, ColHeader, useOsmosTable } from '../../shared/components/data-table';

const COLUMNS = [
  { id: 'referrer',     accessorKey: 'referrer',     header: 'Referrer Name',                                        meta: { label: 'Referrer Name' } },
  { id: 'campaigns',    accessorKey: 'campaigns',    header: () => <ColHeader label="No. of Campaigns" info />,       meta: { label: 'No. of Campaigns' },   enableSorting: false },
  { id: 'clicks',       accessorKey: 'clicks',       header: () => <ColHeader label="Link Clicks"      info />,       meta: { label: 'Link Clicks' },        enableSorting: false },
  { id: 'productViews', accessorKey: 'productViews', header: () => <ColHeader label="Total Product Views" info />,    meta: { label: 'Total Product Views' },enableSorting: false },
  { id: 'addToCart',    accessorKey: 'addToCart',    header: () => <ColHeader label="Add to Carts"     info />,       meta: { label: 'Add to Carts' },       enableSorting: false },
  { id: 'orders',       accessorKey: 'orders',       header: () => <ColHeader label="Orders"           info />,       meta: { label: 'Orders' },             enableSorting: false },
  { id: 'revenue',      accessorKey: 'revenue',      header: () => <ColHeader label="Total Revenue"    info />,       meta: { label: 'Total Revenue' },      enableSorting: false },
];

const DATA = [
  { referrer: 'linkedin.com',     campaigns: '15', clicks: '4.2M', productViews: '1.3M', addToCart: '550K', orders: '149K', revenue: '$830K' },
  { referrer: 'google.in',        campaigns: '17', clicks: '4.4M', productViews: '0.9M', addToCart: '880K', orders: '770K', revenue: '$570K' },
  { referrer: 'web.whatsapp.com', campaigns: '21', clicks: '910K', productViews: '829K', addToCart: '640K', orders: '750K', revenue: '$990K' },
  { referrer: 'x.com',            campaigns: '14', clicks: '950K', productViews: '960K', addToCart: '960K', orders: '890K', revenue: '$660K' },
];

function ReferrerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

export default function ReferrerTable() {
  const { table, globalFilter, setGlobalFilter } = useOsmosTable({
    columns: COLUMNS,
    data: DATA,
    features: { sort: true, search: true, columnVisibility: true },
  });

  return (
    <TableCard
      icon={<ReferrerIcon />}
      title="Performance By Referrer"
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
