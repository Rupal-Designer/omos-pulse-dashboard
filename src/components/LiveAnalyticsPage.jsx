import React from 'react';
import { Box, Flex, Heading, Text, Stack, Card, Table, Button, Badge } from '@rishikeshjoshi-morpheus/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function SvgIcon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  );
}
const IconSearch   = <SvgIcon path={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const IconFilter   = <SvgIcon path={<path d="M4 6h16M7 12h10M10 18h4"/>} />;
const IconColumns  = <SvgIcon path={<><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></>} />;
const IconDownload = <SvgIcon path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />;
const IconCaret    = <SvgIcon path={<polyline points="6 9 12 15 18 9"/>} />;
const IconBolt     = <SvgIcon path={<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>} size={18} />;

const KPI_CHIPS = [
  { label: 'Global Ratio',       value: '70%', tone: 'neutral'  },
  { label: 'Product Ad Revenue', value: '70%', tone: 'positive' },
  { label: 'Display Ad Revenue', value: '70%', tone: 'positive' },
  { label: 'Display Ad CPM',     value: '70%', tone: 'positive' },
  { label: 'Product Ad CPM',     value: '70%', tone: 'positive' },
];
function KpiChip({ label, value, tone }) {
  const color = tone === 'positive' ? 'var(--osmos-brand-green)' : 'var(--osmos-brand-primary)';
  const bg = tone === 'positive' ? 'var(--osmos-brand-green-muted)' : 'var(--osmos-brand-primary-muted)';
  return (
    <Flex align="center" gap="2" bg="white" border="1px solid" borderColor="border" borderRadius="md" px="3" py="2" flex="1" minW="150px">
      <Box background={bg} color={color} borderRadius="full" px="2" py="0.5" fontSize="xs" fontWeight="700">{value}</Box>
      <Text fontSize="xs" color="fg" fontWeight="500" flex="1">{label}</Text>
    </Flex>
  );
}

const TREND_DATA = [
  { time: '00:00', yesterday: 0.28, tomorrow: 0.32, lastWeek: 0.30 },
  { time: '02:00', yesterday: 0.35, tomorrow: 0.41, lastWeek: 0.38 },
  { time: '04:00', yesterday: 0.42, tomorrow: 0.52, lastWeek: 0.47 },
  { time: '06:00', yesterday: 0.48, tomorrow: 0.60, lastWeek: 0.55 },
  { time: '08:00', yesterday: 0.55, tomorrow: 0.68, lastWeek: 0.62 },
  { time: '10:00', yesterday: 0.60, tomorrow: 0.66, lastWeek: 0.64 },
  { time: '12:00', yesterday: 0.62, tomorrow: 0.64, lastWeek: 0.63 },
  { time: '14:00', yesterday: 0.58, tomorrow: 0.70, lastWeek: 0.65 },
  { time: '16:00', yesterday: 0.68, tomorrow: 0.78, lastWeek: 0.72 },
  { time: '18:00', yesterday: 0.74, tomorrow: 0.80, lastWeek: 0.76 },
  { time: '20:00', yesterday: 0.66, tomorrow: 0.70, lastWeek: 0.68 },
  { time: '22:00', yesterday: 0.52, tomorrow: 0.58, lastWeek: 0.55 },
  { time: '23:00', yesterday: 0.48, tomorrow: 0.52, lastWeek: 0.50 },
];
const ADVERTISER_ROWS = Array.from({ length: 7 }, (_, i) => ({ advertiserName: `Advertiser ${i + 1}`, adRevenue: '', if: '', adImpressions: '', adClicks: '', cpc: '', cpm: '', ctr: '' }));
const CAMPAIGN_ROWS = [
  { campaignName: 'African Holidays and destinations', campaignId: '410037', if: '$612', dailyBudget: '$1.35',   adRevenue: '$1.4', adClicks: '7.6 B',  cpc: '15.8 M', cpm: '0.75', ctr: '0.43', budgetUtilization: '57%' },
  { campaignName: 'South American Escapes',            campaignId: '410037', if: '$562', dailyBudget: '$18.7 M', adRevenue: '$1.6', adClicks: '15.8 B', cpc: '18.7 M', cpm: '0.82', ctr: '0.46', budgetUtilization: '62%' },
  { campaignName: 'Asian Getaways and suppliers',      campaignId: '410037', if: '$641', dailyBudget: '$2.1',    adRevenue: '$1.8', adClicks: '21.1 B', cpc: '18.7 M', cpm: '0.89', ctr: '0.51', budgetUtilization: '68%' },
  { campaignName: 'North American Travel',             campaignId: '410037', if: '$662', dailyBudget: '$1.2',    adRevenue: '$1.5', adClicks: '19.5 B', cpc: '21.1 M', cpm: '0.78', ctr: '0.48', budgetUtilization: '65%' },
  { campaignName: 'Australian Journey',                campaignId: '410037', if: '$643', dailyBudget: '$82.5',   adRevenue: '$2.7', adClicks: '24.2 B', cpc: '19.5 M', cpm: '0.95', ctr: '0.55', budgetUtilization: '71%' },
  { campaignName: 'European Adventures and vendors',   campaignId: '410037', if: '$625', dailyBudget: '$5.8',    adRevenue: '$2.7', adClicks: '31.5 B', cpc: '24.2 M', cpm: '0.98', ctr: '0.58', budgetUtilization: '74%' },
  { campaignName: 'Antarctic Expeditions and vendors', campaignId: '410037', if: '$571', dailyBudget: '$31.5',   adRevenue: '$3.1', adClicks: '38.1 B', cpc: '31.5 M', cpm: '1.02', ctr: '0.62', budgetUtilization: '78%' },
  { campaignName: 'African Holidays and destinations', campaignId: '410037', if: '$607', dailyBudget: '$31.5',   adRevenue: '$3.3', adClicks: '38.1 B', cpc: '31.5 M', cpm: '1.05', ctr: '0.65', budgetUtilization: '82%' },
];

function Panel({ title, icon, toolbar, children, footerNote }) {
  return (
    <Card variant="outline" bg="bg" borderColor="border" boxShadow="xs">
      <Card.Header px="5" pt="4" pb="3">
        <Flex align="center" justify="space-between" gap="4" wrap="wrap">
          <Flex align="center" gap="2">
            {icon && <Box color="var(--osmos-brand-primary)" display="flex" alignItems="center">{icon}</Box>}
            <Heading size="sm" fontWeight="600" color="fg">{title}</Heading>
            <Badge variant="subtle" colorPalette="gray" size="xs" borderRadius="full" width="14px" height="14px" p="0" display="inline-flex" alignItems="center" justifyContent="center" fontSize="9px">i</Badge>
          </Flex>
          {toolbar}
        </Flex>
      </Card.Header>
      <Card.Body pt="0">{children}</Card.Body>
      {footerNote && <Box px="5" pb="3"><Text fontSize="xs" color="fg.muted">{footerNote}</Text></Box>}
    </Card>
  );
}
function DropdownPill({ label }) {
  return <Button variant="outline" size="xs" colorPalette="gray" fontWeight="500"><Flex align="center" gap="1.5">{label}{IconCaret}</Flex></Button>;
}
function IconBtn({ icon, 'aria-label': ariaLabel }) {
  return <Button variant="ghost" size="xs" colorPalette="gray" aria-label={ariaLabel} px="2">{icon}</Button>;
}
function SearchInput({ placeholder, minW = '220px' }) {
  return (
    <Flex align="center" gap="2" border="1px solid" borderColor="border" borderRadius="md" px="2" height="28px" bg="white" minW={minW}>
      <Box color="fg.muted">{IconSearch}</Box>
      <Text fontSize="xs" color="fg.muted">{placeholder}</Text>
    </Flex>
  );
}
function PageToolbar() {
  return (
    <Flex align="center" justify="space-between" px="4" py="3" bg="white" borderBottom="1px solid" borderColor="border">
      <Flex align="center" gap="2">
        <Box color="var(--osmos-brand-primary)" display="flex" alignItems="center">{IconBolt}</Box>
        <Heading size="md" fontWeight="600">Live Insights</Heading>
      </Flex>
      <Flex align="center" gap="2">
        <IconBtn icon={IconSearch} aria-label="Search" />
        <IconBtn icon={IconFilter} aria-label="Filter" />
        <IconBtn icon={IconColumns} aria-label="Column settings" />
        <Box width="1px" height="18px" background="var(--osmos-border)" />
        <DropdownPill label="All Pages" />
      </Flex>
    </Flex>
  );
}
function DataTable({ columns, rows, emptyRows = false }) {
  return (
    <Box overflowX="auto" borderTop="1px solid" borderColor="border">
      <Table size="sm" variant="outline" borderWidth="0">
        <Table.Header bg="bg.muted">
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeader key={c.key} textAlign={c.align === 'right' ? 'right' : 'left'} fontSize="xs" fontWeight="600" color="fg.muted" textTransform="none" px="4" py="2.5" _first={{ pl: '5' }} _last={{ pr: '5' }}>{c.label}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i} _hover={{ bg: 'bg.muted' }}>
              {columns.map((c) => (
                <Table.Cell key={c.key} textAlign={c.align === 'right' ? 'right' : 'left'} fontSize="sm" color={emptyRows && c.key !== columns[0].key ? 'fg.muted' : 'fg'} px="4" py="2.5" _first={{ pl: '5' }} _last={{ pr: '5' }}>
                  {row[c.key] || (emptyRows && c.key !== columns[0].key ? '—' : '')}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <Box bg="white" border="1px solid" borderColor="border" borderRadius="md" boxShadow="lg" p="3" minW="160px">
      <Text fontSize="xs" fontWeight="700" color="fg" mb="2">{label}</Text>
      <Stack gap="1">
        {payload.map((p) => (
          <Flex key={p.dataKey} align="center" justify="space-between" gap="4">
            <Flex align="center" gap="2">
              <Box width="8px" height="8px" borderRadius="full" background={p.color} />
              <Text fontSize="xs" color="fg.muted">{p.dataKey === 'yesterday' ? 'Yesterday' : p.dataKey === 'tomorrow' ? 'Tomorrow' : 'Same day (last week)'}</Text>
            </Flex>
            <Text fontSize="xs" fontWeight="600" color="fg">{`${(p.value * 100).toFixed(1)} K`}</Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}

export default function LiveAnalyticsPage() {
  const advertiserCols = [
    { key: 'advertiserName', label: 'Advertiser Name' },
    { key: 'adRevenue', label: 'Ad Revenue', align: 'right' },
    { key: 'if', label: 'IF', align: 'right' },
    { key: 'adImpressions', label: 'Ad Impressions', align: 'right' },
    { key: 'adClicks', label: 'Ad Clicks', align: 'right' },
    { key: 'cpc', label: 'CPC', align: 'right' },
    { key: 'cpm', label: 'CPM', align: 'right' },
    { key: 'ctr', label: 'CTR', align: 'right' },
  ];
  const campaignCols = [
    { key: 'campaignName', label: 'Campaign Name' },
    { key: 'campaignId', label: 'Campaign ID', align: 'right' },
    { key: 'if', label: 'IF', align: 'right' },
    { key: 'dailyBudget', label: 'Daily Budget', align: 'right' },
    { key: 'adRevenue', label: 'Ad Revenue', align: 'right' },
    { key: 'adClicks', label: 'Ad Clicks', align: 'right' },
    { key: 'cpc', label: 'CPC', align: 'right' },
    { key: 'cpm', label: 'CPM', align: 'right' },
    { key: 'ctr', label: 'CTR', align: 'right' },
    { key: 'budgetUtilization', label: 'Budget Utilization', align: 'right' },
  ];
  return (
    <Box>
      <PageToolbar />
      <Stack gap="3" p="4">
        <Flex gap="2" wrap="wrap">
          {KPI_CHIPS.map((chip) => <KpiChip key={chip.label} {...chip} />)}
        </Flex>
        <Panel
          title="Today Performance Trend"
          icon={<SvgIcon path={<><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></>} size={14} />}
          toolbar={
            <Flex align="center" gap="2">
              <Flex align="center" gap="3" mr="2">
                <Flex align="center" gap="1.5"><Box width="12px" height="2px" background="var(--osmos-brand-amber)" /><Text fontSize="xs" color="fg.muted">Yesterday</Text></Flex>
                <Flex align="center" gap="1.5"><Box width="12px" height="2px" background="var(--osmos-brand-green)" /><Text fontSize="xs" color="fg.muted">Tomorrow</Text></Flex>
                <Flex align="center" gap="1.5"><Box width="12px" height="2px" background="var(--osmos-brand-primary)" /><Text fontSize="xs" color="fg.muted">Same day (last week)</Text></Flex>
              </Flex>
              <DropdownPill label="Current Epoch" />
              <IconBtn icon={IconDownload} aria-label="Download" />
            </Flex>
          }
        >
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} />
                <YAxis stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} tickFormatter={(v) => `${Math.round(v * 100)}%`} domain={[0, 1]} />
                <Tooltip content={<TrendTooltip />} />
                <ReferenceLine x="12:00" stroke="#D4D7E0" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="yesterday" stroke="var(--osmos-brand-amber)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tomorrow"  stroke="var(--osmos-brand-green)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="lastWeek"  stroke="var(--osmos-brand-primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Panel>
        <Panel
          title="Advertiser Performance Report"
          icon={<SvgIcon path={<><path d="M16 11V3H8v8H2l10 10 10-10z"/></>} size={14} />}
          toolbar={<Flex align="center" gap="2"><SearchInput placeholder="Search advertiser" /><IconBtn icon={IconDownload} aria-label="Download" /></Flex>}
        >
          <DataTable columns={advertiserCols} rows={ADVERTISER_ROWS} emptyRows />
        </Panel>
        <Panel
          title="Product Ads - Campaign Performance Report"
          icon={<SvgIcon path={<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>} size={14} />}
          toolbar={<Flex align="center" gap="2"><SearchInput placeholder="Search campaign" /><IconBtn icon={IconDownload} aria-label="Download" /></Flex>}
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={campaignCols} rows={CAMPAIGN_ROWS} />
        </Panel>
      </Stack>
    </Box>
  );
}
