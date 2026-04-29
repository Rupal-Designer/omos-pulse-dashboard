import React from 'react';
import { TableCard, DataTable } from './DataTable';

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
  { label: 'Advertiser Name', sort: true },
  { label: 'No. of Campaigns', info: true },
  { label: 'No. of Trackers', info: true },
  { label: 'Link Clicks', info: true },
  { label: 'Total Product views', info: true },
  { label: 'Add to Cart', info: true },
  { label: 'Total Revenue', info: true },
];

const ROWS = [
  ['Sunsilk',  '10', '23', '12.6K', '-',    '-',   '$22K'],
  ['Bingo',    '9',  '14', '28.6K', '445',  '311', '$33K'],
  ['Sunfeast', '6',  '32', '23.6K', '574',  '113', '$25K'],
  ['Vivel',    '12', '15', '21.6K', '345',  '644', '$42K'],
  ['Red Label','14', '45', '32.6K', '455',  '234', '$32K'],
  ['Dove',     '6',  '42', '37.6K', '667',  '221', '$25K'],
  ['Vaseline', '13', '56', '64.6K', '322',  '323', '$25K'],
  ['Lakme',    '5',  '37', '37.6K', '724',  '112', '$41K'],
];

const TOTALS = ['', '49', '126', '1.1M', '8K', '6K', '$'];

export default function CampaignsTable() {
  return (
    <TableCard
      icon={<CampaignIcon />}
      title="Campaigns"
      searchPlaceholder="Search Brand Name"
    >
      <DataTable columns={COLUMNS} rows={ROWS} totals={TOTALS} />
    </TableCard>
  );
}
