import React from 'react';
import { TableCard, DataTable } from './DataTable';

const COLUMNS = [
  { label: 'Device Name', sort: true },
  { label: 'No. of Campaigns', info: true },
  { label: 'Link Clicks', info: true },
  { label: 'Total Product Views', info: true },
  { label: 'Add to Carts', info: true },
  { label: 'Orders', info: true },
  { label: 'Total Revenue', info: true },
];

const ROWS = [
  ['Desktop', '15', '3.2M', '3.7M', '4.2M', '4.7M', '$750K'],
  ['Mobile',  '30', '3.3M', '3.8M', '4.3M', '4.8M', '$700K'],
  ['Tablet',  '15', '3.4M', '3.9M', '4.4M', '4.9M', '$850K'],
  ['E-Reader','60', '3.5M', '4.0M', '4.5M', '5.0M', '$950K'],
  ['Unknown', '45', '3.6M', '4.1M', '4.6M', '5.1M', '$900K'],
];

function DeviceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

export default function DeviceTable() {
  return (
    <TableCard
      icon={<DeviceIcon />}
      title="Performance by Device"
      searchPlaceholder="Search Category L1"
      footerLeft="Comparison mode not applicable"
      footerRight="One Filter Applicable: Date"
    >
      <DataTable columns={COLUMNS} rows={ROWS} />
    </TableCard>
  );
}
