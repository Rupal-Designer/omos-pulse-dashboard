// GeoTable — migrated to shared DataTable + TableCard (was 170 lines of custom header HTML).
// Tab switching (country/city) is now handled by TableCard's tabs prop.
import React, { useState } from 'react';
import { DataTable, TableCard, ColHeader, useOsmosTable } from '../../shared/components/data-table';

const COLUMNS = [
  { id: 'location',     accessorKey: 'location',     header: 'Country / City Name',                                  meta: { label: 'Country / City Name' } },
  { id: 'campaigns',    accessorKey: 'campaigns',    header: () => <ColHeader label="No. of Campaigns" info />,       meta: { label: 'No. of Campaigns' },   enableSorting: false },
  { id: 'clicks',       accessorKey: 'clicks',       header: () => <ColHeader label="Link Clicks"      info />,       meta: { label: 'Link Clicks' },        enableSorting: false },
  { id: 'productViews', accessorKey: 'productViews', header: () => <ColHeader label="Total Product Views" info />,    meta: { label: 'Total Product Views' },enableSorting: false },
  { id: 'addToCart',    accessorKey: 'addToCart',    header: () => <ColHeader label="Add to Carts"     info />,       meta: { label: 'Add to Carts' },       enableSorting: false },
  { id: 'orders',       accessorKey: 'orders',       header: () => <ColHeader label="Orders"           info />,       meta: { label: 'Orders' },             enableSorting: false },
  { id: 'revenue',      accessorKey: 'revenue',      header: () => <ColHeader label="Total Revenue"    info />,       meta: { label: 'Total Revenue' },      enableSorting: false },
];

const COUNTRY_DATA = [
  { location: 'United States',  campaigns: '09', clicks: '4.1M', productViews: '3.5M', addToCart: '450K', orders: '140K', revenue: '$230K' },
  { location: 'South Korea',    campaigns: '11', clicks: '2.7M', productViews: '1.2M', addToCart: '770K', orders: '370K', revenue: '$370K' },
  { location: 'New Zealand',    campaigns: '14', clicks: '934K', productViews: '810K', addToCart: '530K', orders: '438K', revenue: '$910K' },
  { location: 'United Kingdom', campaigns: '11', clicks: '750K', productViews: '615K', addToCart: '360K', orders: '190K', revenue: '$560K' },
  { location: 'India',          campaigns: '04', clicks: '769K', productViews: '610K', addToCart: '430K', orders: '280K', revenue: '$140K' },
];

const CITY_DATA = [
  { location: 'New York', campaigns: '07', clicks: '1.2M', productViews: '980K', addToCart: '220K', orders: '88K',  revenue: '$120K' },
  { location: 'Seoul',    campaigns: '09', clicks: '980K', productViews: '720K', addToCart: '340K', orders: '180K', revenue: '$190K' },
  { location: 'Auckland', campaigns: '11', clicks: '540K', productViews: '490K', addToCart: '280K', orders: '210K', revenue: '$450K' },
  { location: 'London',   campaigns: '08', clicks: '430K', productViews: '370K', addToCart: '190K', orders: '95K',  revenue: '$310K' },
  { location: 'Mumbai',   campaigns: '03', clicks: '380K', productViews: '290K', addToCart: '210K', orders: '130K', revenue: '$80K' },
];

const TABS = [
  { value: 'country', label: 'Country' },
  { value: 'city',    label: 'City' },
];

function GeoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export default function GeoTable() {
  const [activeTab, setActiveTab] = useState('country');

  const { table, globalFilter, setGlobalFilter } = useOsmosTable({
    columns: COLUMNS,
    data: activeTab === 'country' ? COUNTRY_DATA : CITY_DATA,
    features: { sort: true, search: true, columnVisibility: true },
  });

  return (
    <TableCard
      icon={<GeoIcon />}
      title="Geo Performance"
      searchPlaceholder="Search location"
      footerLeft="Comparison mode not applicable"
      footerRight="One Filter Applicable: Date"
      table={table}
      globalFilter={globalFilter}
      onSearch={setGlobalFilter}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DataTable table={table} />
    </TableCard>
  );
}
