import React from 'react';
import { TableCard, DataTable } from './DataTable';

const COLUMNS = [
  { label: 'Referrer Name', sort: true },
  { label: 'No. of Campaigns', info: true },
  { label: 'Link Clicks', info: true },
  { label: 'Total Product Views', info: true },
  { label: 'Add to Carts', info: true },
  { label: 'Orders', info: true },
  { label: 'Total Revenue', info: true },
];

const ROWS = [
  ['linkedin.com',    '15', '4.2M', '1.3M', '550K', '149K', '$830K'],
  ['google.in',       '17', '4.4M', '0.9M', '880K', '770K', '$570K'],
  ['web.whatsapp.com','21', '910K', '829K', '640K', '750K', '$990K'],
  ['x.com',           '14', '950K', '960K', '960K', '890K', '$660K'],
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
  return (
    <TableCard
      icon={<ReferrerIcon />}
      title="Performance By Referrer"
      searchPlaceholder="Search Category L1"
      footerLeft="Comparison mode not applicable"
      footerRight="One Filter Applicable: Date"
    >
      <DataTable columns={COLUMNS} rows={ROWS} />
    </TableCard>
  );
}
