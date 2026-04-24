import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Grid,
  Card,
  Table,
  Tabs,
  Button,
  Badge,
  Icon,
  EmptyState,
} from '@rishikeshjoshi-morpheus/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/* ── Icons (inline SVG, Open Source Feather style) ─────────────── */
function SvgIcon({ path, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}
const IconSearch   = <SvgIcon path={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const IconFilter   = <SvgIcon path={<path d="M4 6h16M7 12h10M10 18h4"/>} />;
const IconColumns  = <SvgIcon path={<><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></>} />;
const IconDownload = <SvgIcon path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />;
const IconMore     = <SvgIcon path={<><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>} />;
const IconCalendar = <SvgIcon path={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />;
const IconPlus     = <SvgIcon path={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const IconCaret    = <SvgIcon path={<polyline points="6 9 12 15 18 9"/>} />;

/* ── Mock data ────────────────────────────────────────────────── */
const GAP_ROWS = [
  { categoryL1: 'Body Care',               requests: '257 M', if: '30%', responseRate: '—', adRevenue: '$150 K', computedDailyBudget: '$120 K', budgetUtilization: '—', campaignCount: '7 K' },
  { categoryL1: 'Skin Care',               requests: '200 M', if: '50%', responseRate: '—', adRevenue: '$175 K', computedDailyBudget: '$150 K', budgetUtilization: '—', campaignCount: '12 K' },
  { categoryL1: 'Makeup',                  requests: '400 M', if: '45%', responseRate: '—', adRevenue: '$210 K', computedDailyBudget: '$200 K', budgetUtilization: '—', campaignCount: '14 K' },
  { categoryL1: 'Body Care',               requests: '650 M', if: '50%', responseRate: '—', adRevenue: '$350 K', computedDailyBudget: '$320 K', budgetUtilization: '—', campaignCount: '9 K' },
  { categoryL1: 'Oral Care',               requests: '600 M', if: '52%', responseRate: '—', adRevenue: '$330 K', computedDailyBudget: '$300 K', budgetUtilization: '—', campaignCount: '6 K' },
  { categoryL1: 'Fragrance',               requests: '750 M', if: '75%', responseRate: '—', adRevenue: '$520 K', computedDailyBudget: '$480 K', budgetUtilization: '—', campaignCount: '11 K' },
  { categoryL1: 'Sun Care',                requests: '900 M', if: '60%', responseRate: '—', adRevenue: '$420 K', computedDailyBudget: '$400 K', budgetUtilization: '—', campaignCount: '7 K' },
  { categoryL1: 'Hair Care',               requests: '1 B',   if: '80%', responseRate: '—', adRevenue: '$680 K', computedDailyBudget: '$640 K', budgetUtilization: '—', campaignCount: '18 K' },
  { categoryL1: 'Hair Care',               requests: '1.2 B', if: '90%', responseRate: '—', adRevenue: '$850 K', computedDailyBudget: '$820 K', budgetUtilization: '—', campaignCount: '22 K' },
  { categoryL1: 'Hair Styling Products',   requests: '1 M',   if: '30%', responseRate: '—', adRevenue: '$50 K',  computedDailyBudget: '$40 K',  budgetUtilization: '—', campaignCount: '10%' },
];

const GMV_DATA = [
  { name: 'Skin Care',     adv: 22,  nonAdv: 0  },
  { name: 'Body Care',     adv: 78,  nonAdv: 10 },
  { name: 'Hair Care',     adv: 38,  nonAdv: 0  },
  { name: 'Makeup',        adv: 12,  nonAdv: 0  },
  { name: 'Fragrance',     adv: 96,  nonAdv: 0  },
  { name: 'Oral Care',     adv: 28,  nonAdv: 0  },
  { name: 'Sun Care',      adv: 62,  nonAdv: 0  },
  { name: 'Body Care 2',   adv: 26,  nonAdv: 0  },
  { name: 'Fragrance 2',   adv: 50,  nonAdv: 0  },
];

const CAT_PERF_ROWS = [
  { categoryL1: 'Body Care', adRevenue: '$150 K', programCpc: '$1.05', programCpm: '$1.4', adImpressions: '1.4 B', adClicks: '13.6 M', attributedAtc: '175 K', attributedOrders: '12 K' },
  { categoryL1: 'Foot Care', adRevenue: '$175 K', programCpc: '$0.82', programCpm: '$1.6', adImpressions: '1.8 B', adClicks: '18.7 M', attributedAtc: '192 K', attributedOrders: '16 K' },
  { categoryL1: 'Makeup',    adRevenue: '$200 K', programCpc: '$1.52', programCpm: '$2.1', adImpressions: '2.2 B', adClicks: '21.1 M', attributedAtc: '201 K', attributedOrders: '17 K' },
  { categoryL1: 'Oral Care', adRevenue: '$225 K', programCpc: '$0.94', programCpm: '$2.2', adImpressions: '2.6 B', adClicks: '24.2 M', attributedAtc: '229 K', attributedOrders: '19 K' },
  { categoryL1: 'Hair Care', adRevenue: '$280 K', programCpc: '$0.45', programCpm: '$1.8', adImpressions: '3.3 B', adClicks: '18.1 M', attributedAtc: '251 K', attributedOrders: '21 K' },
  { categoryL1: 'Body Care', adRevenue: '$400 K', programCpc: '$1.35', programCpm: '$2.7', adImpressions: '5.1 B', adClicks: '31.5 M', attributedAtc: '312 K', attributedOrders: '28 K' },
];

/* ── Heatmap (hand-rolled CSS grid) ───────────────────────────── */
const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
const HEAT_PALETTE = ['#1a1f3d', '#2e5a4a', '#2f7d56', '#3aa874', '#56c57d', '#9ad557', '#d4e05a'];
function seedHeatmap(seed) {
  const cells = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const n = Math.sin((d + 1) * (h + 1) * seed) * 10000;
      const v = Math.abs(n - Math.floor(n));
      const level = v < 0.15 ? 0 : v < 0.3 ? 1 : v < 0.5 ? 2 : v < 0.7 ? 3 : v < 0.85 ? 4 : v < 0.95 ? 5 : 6;
      cells.push({ day: d, hour: h, level, value: `$0.${Math.floor(v * 100)}` });
    }
  }
  return cells;
}
const HEAT_A = seedHeatmap(0.313);
const HEAT_B = seedHeatmap(0.721);

function Heatmap({ cells }) {
  return (
    <Box overflowX="auto">
      <Box display="grid" gridTemplateColumns="50px repeat(24, 1fr)" gap="2px" minWidth="720px">
        <Box />
        {Array.from({ length: 24 }).map((_, h) => (
          <Box key={h} fontSize="10px" color="fg.muted" textAlign="center" pb="1">
            {h % 2 === 0 ? `${h}:00` : ''}
          </Box>
        ))}
        {DAYS.map((day, d) => (
          <React.Fragment key={day}>
            <Box fontSize="11px" color="fg.muted" display="flex" alignItems="center" pr="2">{day}</Box>
            {cells
              .filter((c) => c.day === d)
              .map((c) => (
                <Box
                  key={`${c.day}-${c.hour}`}
                  title={`${day} ${c.hour}:00 — ${c.value}`}
                  background={HEAT_PALETTE[c.level]}
                  height="22px"
                  borderRadius="2px"
                  fontSize="9px"
                  color="rgba(255,255,255,0.85)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="600"
                >
                  {c.level >= 3 ? c.value : ''}
                </Box>
              ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

/* ── Shared panel primitives ──────────────────────────────────── */
function Panel({ title, icon, toolbar, children, footerNote }) {
  return (
    <Card variant="outline" bg="bg" borderColor="border" boxShadow="xs">
      <Card.Header px="5" pt="4" pb="3">
        <Flex align="center" justify="space-between" gap="4" wrap="wrap">
          <Flex align="center" gap="2">
            {icon && (
              <Box color="var(--osmos-brand-primary)" display="flex" alignItems="center">
                {icon}
              </Box>
            )}
            <Heading size="sm" fontWeight="600" color="fg">
              {title}
            </Heading>
            <Badge
              variant="subtle"
              colorPalette="gray"
              size="xs"
              borderRadius="full"
              width="14px"
              height="14px"
              p="0"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              fontSize="9px"
            >
              i
            </Badge>
          </Flex>
          {toolbar}
        </Flex>
      </Card.Header>
      <Card.Body pt="0">{children}</Card.Body>
      {footerNote && (
        <Box px="5" pb="3">
          <Text fontSize="xs" color="fg.muted">{footerNote}</Text>
        </Box>
      )}
    </Card>
  );
}

function DropdownPill({ label, icon = IconCaret }) {
  return (
    <Button variant="outline" size="xs" colorPalette="gray" fontWeight="500">
      <Flex align="center" gap="1.5">
        {label}
        {icon}
      </Flex>
    </Button>
  );
}

function IconBtn({ icon, 'aria-label': ariaLabel }) {
  return (
    <Button variant="ghost" size="xs" colorPalette="gray" aria-label={ariaLabel} px="2">
      {icon}
    </Button>
  );
}

function SearchInput({ placeholder }) {
  return (
    <Flex
      align="center"
      gap="2"
      border="1px solid"
      borderColor="border"
      borderRadius="md"
      px="2"
      height="28px"
      bg="bg"
      minW="220px"
    >
      <Box color="fg.muted">{IconSearch}</Box>
      <Text fontSize="xs" color="fg.muted">{placeholder}</Text>
    </Flex>
  );
}

/* ── Page toolbar ─────────────────────────────────────────────── */
function PageToolbar() {
  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      py="3"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Flex align="center" gap="2">
        <Box color="var(--osmos-brand-primary)" display="flex" alignItems="center">
          <SvgIcon path={<><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 4-4"/></>} size={18} />
        </Box>
        <Heading size="md" fontWeight="600">Demand & Supply</Heading>
      </Flex>
      <Flex align="center" gap="2">
        <IconBtn icon={IconSearch} aria-label="Search" />
        <IconBtn icon={IconFilter} aria-label="Filter" />
        <IconBtn icon={IconColumns} aria-label="Column settings" />
        <Box width="1px" height="18px" bg="border" />
        <DropdownPill label="All Pages" />
        <Flex
          align="center"
          gap="2"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          px="2"
          height="28px"
          bg="bg"
        >
          <Box color="fg.muted">{IconCalendar}</Box>
          <Text fontSize="xs" color="fg">08 May 26 - 14 May 26</Text>
          <Box color="fg.muted">{IconCaret}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

/* ── Table helpers ────────────────────────────────────────────── */
function DataTable({ columns, rows, totals }) {
  return (
    <Box overflowX="auto" borderTop="1px solid" borderColor="border">
      <Table size="sm" variant="outline" borderWidth="0">
        <Table.Header bg="bg.muted">
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeader
                key={c.key}
                textAlign={c.align === 'right' ? 'right' : 'left'}
                fontSize="xs"
                fontWeight="600"
                color="fg.muted"
                textTransform="none"
                px="4"
                py="2.5"
                _first={{ pl: '5' }}
                _last={{ pr: '5' }}
              >
                {c.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i} _hover={{ bg: 'bg.muted' }}>
              {columns.map((c) => (
                <Table.Cell
                  key={c.key}
                  textAlign={c.align === 'right' ? 'right' : 'left'}
                  fontSize="sm"
                  color="fg"
                  px="4"
                  py="2.5"
                  _first={{ pl: '5' }}
                  _last={{ pr: '5' }}
                >
                  {row[c.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          {totals && (
            <Table.Row bg="bg.muted" fontWeight="600">
              {columns.map((c) => (
                <Table.Cell
                  key={c.key}
                  textAlign={c.align === 'right' ? 'right' : 'left'}
                  fontSize="sm"
                  color="fg"
                  fontWeight="700"
                  px="4"
                  py="2.5"
                  _first={{ pl: '5' }}
                  _last={{ pr: '5' }}
                >
                  {totals[c.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Box>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function DemandSupplyPage() {
  const [tabA, setTabA] = useState('days-hours');
  const [tabB, setTabB] = useState('days-hours');

  const gapCols = [
    { key: 'categoryL1', label: 'Category L1' },
    { key: 'requests', label: 'Requests', align: 'right' },
    { key: 'if', label: 'IF', align: 'right' },
    { key: 'responseRate', label: 'Response Rate (%)', align: 'right' },
    { key: 'adRevenue', label: 'Ad Revenue', align: 'right' },
    { key: 'computedDailyBudget', label: 'Computed Daily Budget', align: 'right' },
    { key: 'budgetUtilization', label: 'Budget Utilization (%)', align: 'right' },
    { key: 'campaignCount', label: 'Campaign Count', align: 'right' },
  ];

  const perfCols = [
    { key: 'categoryL1', label: 'category L1' },
    { key: 'adRevenue', label: 'Ad Revenue', align: 'right' },
    { key: 'programCpc', label: 'Program CPC', align: 'right' },
    { key: 'programCpm', label: 'Program CPM', align: 'right' },
    { key: 'adImpressions', label: 'Ad Impressions', align: 'right' },
    { key: 'adClicks', label: 'Ad Clicks', align: 'right' },
    { key: 'attributedAtc', label: 'Attributed Add to cart', align: 'right' },
    { key: 'attributedOrders', label: 'Attributed Orders', align: 'right' },
  ];

  const perfTotals = {
    categoryL1: 'Total',
    adRevenue: '$27 M',
    programCpc: '$27',
    programCpm: '$2.1',
    adImpressions: '19 B',
    adClicks: '108 M',
    attributedAtc: '7 M',
    attributedOrders: '',
  };

  const SeasonalityTabs = ({ value, onChange }) => (
    <Tabs value={value} onValueChange={(e) => onChange(e.value)} size="sm" variant="subtle">
      <Tabs.List bg="bg.subtle" borderRadius="md" p="2px">
        <Tabs.Trigger value="days-hours" fontSize="xs" py="1" px="3">Days & Hours</Tabs.Trigger>
        <Tabs.Trigger value="days" fontSize="xs" py="1" px="3">Days</Tabs.Trigger>
        <Tabs.Trigger value="hours" fontSize="xs" py="1" px="3">Hours</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );

  return (
    <Box>
      <PageToolbar />
      <Stack gap="3" p="4">
        {/* Gap Analytics */}
        <Panel
          title="Demand & Supply Gap Analytics"
          icon={<SvgIcon path={<><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 4-4"/></>} size={14} />}
          toolbar={
            <Flex align="center" gap="2">
              <Button variant="ghost" size="xs" colorPalette="blue">
                <Flex align="center" gap="1">{IconPlus} Add a Filter</Flex>
              </Button>
              <Box flex="1" />
              <SearchInput placeholder="Search category L1" />
              <IconBtn icon={IconDownload} aria-label="Download" />
              <IconBtn icon={IconMore} aria-label="More" />
            </Flex>
          }
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={gapCols} rows={GAP_ROWS} />
        </Panel>

        {/* Seasonality pair */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="3">
          <Panel
            title="Seasonality"
            icon={<SvgIcon path={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} size={14} />}
            toolbar={
              <Flex align="center" gap="2">
                <SeasonalityTabs value={tabA} onChange={setTabA} />
                <DropdownPill label="All Impressions" />
                <IconBtn icon={IconDownload} aria-label="Download" />
              </Flex>
            }
            footerNote="Data from Ans.Taxa"
          >
            <Heatmap cells={HEAT_A} />
          </Panel>
          <Panel
            title="Seasonality"
            icon={<SvgIcon path={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} size={14} />}
            toolbar={
              <Flex align="center" gap="2">
                <SeasonalityTabs value={tabB} onChange={setTabB} />
                <DropdownPill label="All Impressions" />
                <IconBtn icon={IconDownload} aria-label="Download" />
              </Flex>
            }
            footerNote="Data from Ans.Taxa"
          >
            <Heatmap cells={HEAT_B} />
          </Panel>
        </Grid>

        {/* Advertiser Overall GMV */}
        <Panel
          title="Advertiser Overall GMV"
          icon={<SvgIcon path={<><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>} size={14} />}
          toolbar={
            <Flex align="center" gap="2">
              <Flex align="center" gap="3">
                <Flex align="center" gap="1.5">
                  <Box width="10px" height="10px" borderRadius="sm" background="var(--osmos-brand-amber)" />
                  <Text fontSize="xs" color="fg.muted">Non-Advertiser Members</Text>
                </Flex>
                <Flex align="center" gap="1.5">
                  <Box width="10px" height="10px" borderRadius="sm" background="var(--osmos-brand-green)" />
                  <Text fontSize="xs" color="fg.muted">Advertiser Members</Text>
                </Flex>
              </Flex>
              <Box flex="1" />
              <DropdownPill label="All Impressions" />
              <IconBtn icon={IconDownload} aria-label="Download" />
            </Flex>
          }
        >
          <Box height="280px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GMV_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--osmos-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} />
                <YAxis stroke="var(--osmos-fg-subtle)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--osmos-border)' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} contentStyle={{ fontSize: '12px', borderRadius: '6px' }} />
                <Bar dataKey="adv" stackId="a" fill="var(--osmos-brand-amber)" name="Non-Advertiser Members" radius={[0, 0, 0, 0]} />
                <Bar dataKey="nonAdv" stackId="a" fill="var(--osmos-brand-green)" name="Advertiser Members" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Panel>

        {/* Search Demand Planner — empty state */}
        <Panel
          title="Search Demand Planner"
          icon={<SvgIcon path={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} size={14} />}
          toolbar={
            <Flex align="center" gap="2">
              <SearchInput placeholder="Search category L1" />
              <IconBtn icon={IconDownload} aria-label="Download" />
            </Flex>
          }
        >
          <Box borderTop="1px solid" borderColor="border">
            <Flex bg="bg.muted" px="4" py="2.5" gap="8">
              {['Category L1', 'Total Search Volume', 'High Demand Search Queries', 'Response Rate of High Demand Search Queries'].map((c) => (
                <Text key={c} fontSize="xs" fontWeight="600" color="fg.muted" flex="1">
                  {c}
                </Text>
              ))}
            </Flex>
            <Box py="14">
              <EmptyState>
                <EmptyState.Content>
                  <EmptyState.Title>
                    <Text fontSize="sm" color="fg.muted">No Data Available</Text>
                  </EmptyState.Title>
                </EmptyState.Content>
              </EmptyState>
            </Box>
          </Box>
        </Panel>

        {/* Category Performance */}
        <Panel
          title="Category Performance Report"
          icon={<SvgIcon path={<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>} size={14} />}
          toolbar={
            <Flex align="center" gap="2">
              <SearchInput placeholder="Search category L1" />
              <IconBtn icon={IconDownload} aria-label="Download" />
            </Flex>
          }
          footerNote="Ans.Tax Applicable Data"
        >
          <DataTable columns={perfCols} rows={CAT_PERF_ROWS} totals={perfTotals} />
        </Panel>
      </Stack>
    </Box>
  );
}
