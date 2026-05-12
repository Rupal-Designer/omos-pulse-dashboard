import React from 'react';
import { DataTable, TableCard, ColHeader, useOsmosTable } from '../../shared/components/data-table';

function CampaignIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--osmos-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22l-4-9-9-4 19-7z"/>
    </svg>
  );
}

const COLUMNS = [
  { id: 'name',         accessorKey: 'name',         header: 'Advertiser Name',                                      meta: { label: 'Advertiser Name' } },
  { id: 'campaigns',    accessorKey: 'campaigns',    header: () => <ColHeader label="No. of Campaigns"    info />,    meta: { label: 'No. of Campaigns' },    enableSorting: false },
  { id: 'trackers',     accessorKey: 'trackers',     header: () => <ColHeader label="No. of Trackers"     info />,    meta: { label: 'No. of Trackers' },     enableSorting: false },
  { id: 'clicks',       accessorKey: 'clicks',       header: () => <ColHeader label="Link Clicks"         info />,    meta: { label: 'Link Clicks' },         enableSorting: false },
  { id: 'productViews', accessorKey: 'productViews', header: () => <ColHeader label="Total Product Views" info />,    meta: { label: 'Total Product Views' }, enableSorting: false },
  { id: 'addToCart',    accessorKey: 'addToCart',    header: () => <ColHeader label="Add to Cart"         info />,    meta: { label: 'Add to Cart' },         enableSorting: false },
  { id: 'revenue',      accessorKey: 'revenue',      header: () => <ColHeader label="Total Revenue"       info />,    meta: { label: 'Total Revenue' },       enableSorting: false },
];

const DATA = [
  { name: 'Sunsilk',   campaigns: '10', trackers: '23', clicks: '12.6K', productViews: '-',   addToCart: '-',   revenue: '$22K' },
  { name: 'Bingo',     campaigns: '9',  trackers: '14', clicks: '28.6K', productViews: '445', addToCart: '311', revenue: '$33K' },
  { name: 'Sunfeast',  campaigns: '6',  trackers: '32', clicks: '23.6K', productViews: '574', addToCart: '113', revenue: '$25K' },
  { name: 'Vivel',     campaigns: '12', trackers: '15', clicks: '21.6K', productViews: '345', addToCart: '644', revenue: '$42K' },
  { name: 'Red Label', campaigns: '14', trackers: '45', clicks: '32.6K', productViews: '455', addToCart: '234', revenue: '$32K' },
  { name: 'Dove',      campaigns: '6',  trackers: '42', clicks: '37.6K', productViews: '667', addToCart: '221', revenue: '$25K' },
  { name: 'Vaseline',  campaigns: '13', trackers: '56', clicks: '64.6K', productViews: '322', addToCart: '323', revenue: '$25K' },
  { name: 'Lakme',     campaigns: '5',  trackers: '37', clicks: '37.6K', productViews: '724', addToCart: '112', revenue: '$41K' },
];

const FOOTER = ['Totals', '49', '126', '1.1M', '8K', '6K', '$265K'];

export default function CampaignsTable() {
  const { table, globalFilter, setGlobalFilter } = useOsmosTable({
    columns: COLUMNS,
    data: DATA,
    features: { sort: true, search: true, columnVisibility: true },
  });

  return (
    <TableCard
      icon={<CampaignIcon />}
      title="Campaigns"
      searchPlaceholder="Search Brand Name"
      table={table}
      globalFilter={globalFilter}
      onSearch={setGlobalFilter}
    >
      <DataTable table={table} footer={FOOTER} />
    </TableCard>
  );
}
