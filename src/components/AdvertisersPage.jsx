import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, Stack, HStack, VStack, Spacer, Grid,
  Button, Input, Badge, Checkbox, Switch, Tag, Separator,
  Table, Modal, Tabs, Select, Breadcrumb, Alert, Timeline,
  FileUpload, Tooltip, Menu, Textarea,
} from '@rishikeshjoshi-morpheus/ui';

/* ═══════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════ */
const ADVERTISERS = [
  { id: 'CA_08001', storeId: 'B002', name: 'Garnier Fresh', persona: 'Mass.con', pSpendYtd: '-', pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08011', storeId: 'B001', name: 'Tata Madisons', persona: 'Mass.con', pSpendYtd: 15, pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 3:19 PM' },
  { id: 'CA_08014', storeId: 'B034', name: 'Gourmet Grocers', persona: 'Luxe', pSpendYtd: '-', pSpendYoY: '-', autoPopulate: false, catalogRules: 0, created: '2 May 25, 6:19 PM' },
  { id: 'CA_08003', storeId: 'B001', name: 'Luma Brand Mall Store', persona: 'Econ', pSpendYtd: 18, pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 6:19 PM' },
  { id: 'CA_08005', storeId: 'B001', name: 'John Artesia Ltd', persona: 'Luxe', pSpendYtd: 14, pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 4:11 PM' },
  { id: 'CA_08007', storeId: 'B001', name: 'Beauty Essentials', persona: 'Mass.con', pSpendYtd: '-', pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08009', storeId: 'B001', name: 'Garden Supplies Co', persona: 'Luxe', pSpendYtd: 12, pSpendYoY: '-', autoPopulate: false, catalogRules: 0, created: '2 May 25, 3:11 PM' },
  { id: 'CA_08010', storeId: 'RES_5', name: 'Tia Treasures', persona: 'Mass.con', pSpendYtd: '-', pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 3:19 PM' },
  { id: 'CA_08013', storeId: 'M100', name: 'Natural Foods Inc', persona: 'Econ', pSpendYtd: 15, pSpendYoY: '-', autoPopulate: true, catalogRules: 0, created: '2 May 25, 5:11 PM' },
  { id: 'CA_08Y11', storeId: 'M100', name: 'Beauty Equipment Store', persona: 'Econ', pSpendYtd: '-', pSpendYoY: 17, autoPopulate: true, catalogRules: 0, created: '2 May 25, 3:19 PM' },
];

const CHANGE_HISTORY = [
  {
    date: '26th August 2025, 10:10am by Alice Tanaka',
    status: 'Deactivated',
    changes: [
      { field: 'Advertiser ID', from: 'CA_08001', to: 'CA_08001', category: 'Targeting/Qualify', prodType: 'Super Category Cosmetics | OldsFlap Cosmetics | Umbrella Soap' },
      { field: 'Brand Name', from: 'Micromatic', to: 'Johnson\'s', category: 'In Media Bids', prodType: 'Super Category Media/Bids' },
      { field: 'Transaction body', from: 'old', to: 'Category 3.9 Media Group', category: 'Product Media' },
      { field: 'Brand Model Max', from: '', to: 'Category 3.5 Generic Toiletries', category: 'Lookup Lot/Inventories' },
    ],
  },
  {
    date: '24th August 2025, 10:10am by Alice Tanaka',
    status: 'Deactivated',
    changes: [
      { field: 'Offer ID filter', from: 'PremiumNQ', to: 'New Brand', category: 'opt_kly-typ and "category_id_updated"', prodType: 'File Folder Mods' },
      { field: 'Brand/Mfr Batch Read', from: 'Category 3.9 Media Group', to: 'Category: This is All Mode', prodType: 'File Filter Mode' },
    ],
  },
  {
    date: '21st August 2025, 10:10am by Alice Tanaka',
    status: 'Activated',
    changes: [
      { field: 'Advertiser ID', from: 'CA_08001', to: 'CA_08001', category: 'Targeting/Qualify', prodType: 'Super Category: "NewBigQuality Cosmetics | Category_Desc"' },
      { field: 'Brand Name', from: 'Micromatic', to: 'Johnson & White Micro', category: 'In Product Mode', prodType: 'Whole Mode' },
    ],
  },
];

const RULE_FIELD_OPTIONS = [
  { label: 'Brand Name', value: 'brand_name' },
  { label: 'Category', value: 'category' },
  { label: 'Product ID', value: 'product_id' },
  { label: 'Product Name', value: 'product_name' },
  { label: 'Price', value: 'price' },
  { label: 'SKU', value: 'sku' },
];

const RULE_OPERATOR_OPTIONS = [
  { label: '=', value: 'eq' },
  { label: '!=', value: 'neq' },
  { label: '>', value: 'gt' },
  { label: '<', value: 'lt' },
  { label: 'contains', value: 'contains' },
  { label: 'in', value: 'in' },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICON HELPER (reused from existing codebase pattern)
   ═══════════════════════════════════════════════════════════════ */
function Icon({ children, size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOP BAR (Advertisers-specific)
   ═══════════════════════════════════════════════════════════════ */
function AdvertiserTopBar() {
  return (
    <Box
      as="header"
      bg="white"
      borderBottomWidth="1px"
      borderColor="border"
      px="6"
      py="3"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexShrink={0}
    >
      <Flex alignItems="center" gap="3">
        <Box
          w="9" h="9" bg="gray.100" borderRadius="md"
          display="flex" alignItems="center" justifyContent="center"
          cursor="pointer"
        >
          <Icon size={16} color="#555">
            <polyline points="15 18 9 12 15 6"/>
          </Icon>
        </Box>
        <Box>
          <Text fontSize="xs" color="fg.muted">
            Online Ad Management &gt; Space World
          </Text>
          <Heading size="md" color="fg" fontWeight="semibold">
            Advertisers
          </Heading>
        </Box>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Button variant="outline" size="sm">
          <Icon size={14}>
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
          </Icon>
        </Button>
        <Button variant="outline" size="sm">
          <Icon size={14}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </Icon>
        </Button>
        <Button variant="outline" size="sm">
          <Icon size={14}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </Icon>
        </Button>
        <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="md" fontSize="xs">
          Advertiser's Onboard Code
        </Badge>
      </Flex>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADD ADVERTISER MODAL
   ═══════════════════════════════════════════════════════════════ */
function AddAdvertiserModal({ open, onClose }) {
  const [storeId, setStoreId] = useState('');
  const [advName, setAdvName] = useState('');
  const [persona, setPersona] = useState('');

  function handleAdd() {
    onClose();
    setStoreId('');
    setAdvName('');
    setPersona('');
  }

  return (
    <Modal open={open} onOpenChange={(d) => { if (!d.open) onClose(); }} size="sm">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Advertiser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap="4">
            <Input
              label="Store(s) ID *"
              placeholder="e.g. B002"
              required
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
            />
            <Input
              label="Advertiser Name * :"
              placeholder="Garnier Fresh"
              required
              value={advName}
              onChange={(e) => setAdvName(e.target.value)}
            />
            <Input
              label="Persona * :"
              placeholder="Luxe"
              required
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button colorPalette="blue" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BULK UPLOAD MODAL
   ═══════════════════════════════════════════════════════════════ */
function BulkUploadModal({ open, onClose }) {
  const [step, setStep] = useState(0); // 0 = upload, 1 = success
  const [uploadedFile, setUploadedFile] = useState(null);

  function handleClose() {
    setStep(0);
    setUploadedFile(null);
    onClose();
  }

  return (
    <Modal open={open} onOpenChange={(d) => { if (!d.open) handleClose(); }} size="lg">
      <Modal.Content>
        <Modal.Header>
          <Flex alignItems="center" gap="3" w="100%">
            <Modal.Title>Bulk Upload</Modal.Title>
            {step === 1 && (
              <Badge colorPalette="green" variant="solid" size="sm">
                Advertiser Added Successfully
              </Badge>
            )}
            <Spacer />
            <Flex alignItems="center" gap="2">
              <Icon size={14} color="#636CFF">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </Icon>
              <Text fontSize="xs" color="blue.500" fontWeight="medium">
                Sample_Template.xlsx
              </Text>
              <Text fontSize="xs" color="blue.600" fontWeight="semibold" cursor="pointer" textDecoration="underline">
                Download
              </Text>
            </Flex>
          </Flex>
        </Modal.Header>

        <Modal.Body>
          {step === 0 ? (
            <Stack gap="5">
              <Text fontSize="xs" color="fg.muted">
                Bulk upload/edit advertiser data and link the corresponding root link creation rules / Root logics.
              </Text>

              {/* Upload zone */}
              <Box
                border="2px dashed"
                borderColor="border.muted"
                borderRadius="lg"
                p="8"
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: 'blue.300', bg: 'blue.50' }}
                transition="all 0.15s"
                onClick={() => {
                  setUploadedFile({ name: 'advertisers_batch.xlsx' });
                  setStep(1);
                }}
              >
                <Flex direction="column" alignItems="center" gap="2">
                  <Icon size={32} color="#aaa" strokeWidth={1.2}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </Icon>
                  <Text fontSize="sm" color="fg.muted">upload your .csv files here</Text>
                </Flex>
              </Box>

              {/* Tabs for help content */}
              <Tabs defaultValue="basic" variant="line" size="sm">
                <Tabs.List>
                  <Tabs.Trigger value="basic">Basic Format: Links with a directory</Tabs.Trigger>
                  <Tabs.Trigger value="root">Root Logic & Rule Creation</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="basic">
                  <Stack gap="3" pt="3">
                    <Text fontSize="xs" fontWeight="semibold" color="fg">Sheet 1 : Advertisers</Text>
                    <Box bg="gray.50" p="3" borderRadius="md" fontSize="xs" color="fg.muted">
                      <Text>advertiser_id</Text>
                      <Text>store_id</Text>
                      <Text>advertiser_name</Text>
                      <Text>persona</Text>
                      <Text>billing_advertiser_id (optional)</Text>
                      <Text>billing_invoice_name (optional)</Text>
                    </Box>
                    <Text fontSize="xs" fontWeight="semibold" color="fg">Sheet 2 : Rules</Text>
                    <Box bg="gray.50" p="3" borderRadius="md" fontSize="xs" color="fg.muted">
                      <Text>advertiser_id</Text>
                      <Text>rule_name</Text>
                      <Text>field_name</Text>
                      <Text>operator</Text>
                      <Text>value</Text>
                    </Box>
                  </Stack>
                </Tabs.Content>
                <Tabs.Content value="root">
                  <Stack gap="3" pt="3">
                    <Text fontSize="xs" fontWeight="semibold" color="fg">Root Logic Configuration</Text>
                    <Box bg="gray.50" p="3" borderRadius="md">
                      <Text fontSize="xs" color="fg.muted">
                        Configure root-level rules and conditional branching. Use the template to set up multi-condition rules with AND/OR logic.
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="fg.muted">
                      <strong>Note:</strong> For root-level architectures, use dedicated column markers in the spreadsheet.
                      A root link is for a set of Rules. To use <strong>&gt;= 2</strong> conditions in the root rule bundle multiple fields.
                    </Text>
                  </Stack>
                </Tabs.Content>
              </Tabs>
            </Stack>
          ) : (
            /* Success state */
            <Flex direction="column" alignItems="center" gap="4" py="6">
              <Box
                w="120px" h="120px"
                borderRadius="full"
                bg="green.50"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon size={56} color="#22C55E" strokeWidth={1.5}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </Icon>
              </Box>
              <Text fontSize="md" fontWeight="semibold" color="fg">Uploaded Successfully</Text>
              <Text fontSize="xs" color="fg.muted" textAlign="center">
                File has been processed and uploaded successfully. You can<br/>
                create the associated accounts in the table.
              </Text>
              <Button colorPalette="blue" size="sm" onClick={handleClose}>
                Done
              </Button>
            </Flex>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADD / EDIT RULE MODAL
   ═══════════════════════════════════════════════════════════════ */
function RuleModal({ open, onClose, editMode = false, initialConditions = null }) {
  const emptyCondition = { field: '', operator: '', value: '' };
  const [conditions, setConditions] = useState(
    initialConditions || [{ ...emptyCondition }]
  );
  const [applyCondition, setApplyCondition] = useState(true);

  function addCondition() {
    setConditions([...conditions, { ...emptyCondition }]);
  }

  function removeCondition(idx) {
    setConditions(conditions.filter((_, i) => i !== idx));
  }

  function updateCondition(idx, field, val) {
    const updated = [...conditions];
    updated[idx] = { ...updated[idx], [field]: val };
    setConditions(updated);
  }

  function handleSave() {
    onClose();
    if (!editMode) {
      setConditions([{ ...emptyCondition }]);
    }
  }

  function handleClose() {
    onClose();
    if (!editMode) {
      setConditions([{ ...emptyCondition }]);
    }
  }

  return (
    <Modal open={open} onOpenChange={(d) => { if (!d.open) handleClose(); }} size="lg">
      <Modal.Content>
        <Modal.Header>
          <Flex alignItems="center" gap="2" w="100%">
            <Modal.Title>{editMode ? 'Edit Rule' : 'Add Rule'}</Modal.Title>
            <Spacer />
            <Badge colorPalette="blue" variant="subtle" size="sm">
              Advertiser's Onboard Code
            </Badge>
          </Flex>
        </Modal.Header>
        <Modal.Body>
          <Stack gap="4">
            {/* Info alert */}
            <Alert status="info" title="">
              <Text fontSize="xs">
                A rule is associated mapping of product through a set of conditions to an advertising tier.
                If a line with CIID is required for at-least one primary key within the CID slot in addition to criteria.
                This is useful for organizing &gt; 10 rule sets at the same tier level.{' '}
                <Text as="span" color="blue.500" cursor="pointer" fontWeight="medium">
                  Learn more
                </Text>
              </Text>
            </Alert>

            {/* Apply condition switch */}
            <Flex alignItems="center" gap="3">
              <Text fontSize="sm" fontWeight="medium">Apply Condition *</Text>
              <Switch
                checked={applyCondition}
                onCheckedChange={(e) => setApplyCondition(e.checked)}
              />
              {applyCondition && (
                <Text fontSize="xs" color="blue.500" cursor="pointer" fontWeight="medium" ml="auto">
                  Advanced Suggestion
                </Text>
              )}
            </Flex>

            {applyCondition && (
              <Stack gap="3">
                {conditions.map((cond, idx) => (
                  <Flex key={idx} gap="3" alignItems="flex-end">
                    {idx > 0 && (
                      <Badge variant="subtle" colorPalette="gray" size="sm" alignSelf="center">
                        AND
                      </Badge>
                    )}
                    <Box flex="1">
                      <Select
                        label={idx === 0 ? 'Field Name' : ''}
                        placeholder="Brand Name"
                        options={RULE_FIELD_OPTIONS}
                        size="sm"
                      />
                    </Box>
                    <Box flex="0 0 100px">
                      <Select
                        label={idx === 0 ? '' : ''}
                        placeholder="="
                        options={RULE_OPERATOR_OPTIONS}
                        size="sm"
                      />
                    </Box>
                    <Box flex="1">
                      <Input
                        label={idx === 0 ? 'Value' : ''}
                        placeholder="Nike"
                        size="sm"
                        value={cond.value}
                        onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                      />
                    </Box>
                    {conditions.length > 1 && (
                      <Box
                        cursor="pointer"
                        onClick={() => removeCondition(idx)}
                        color="red.500"
                        pb="2"
                      >
                        <Icon size={16} color="#DC2626">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </Icon>
                      </Box>
                    )}
                  </Flex>
                ))}

                {/* Add button */}
                <Button
                  variant="ghost"
                  size="sm"
                  colorPalette="blue"
                  onClick={addCondition}
                  alignSelf="flex-start"
                >
                  <Icon size={14}>
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </Icon>
                  Add
                </Button>
              </Stack>
            )}
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button colorPalette="blue" onClick={handleSave}>
            {editMode ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHANGE HISTORY MODAL
   ═══════════════════════════════════════════════════════════════ */
function ChangeHistoryModal({ open, onClose }) {
  return (
    <Modal open={open} onOpenChange={(d) => { if (!d.open) onClose(); }} size="lg">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Change History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Timeline>
            {CHANGE_HISTORY.map((entry, ei) => (
              <Timeline.Item key={ei}>
                <Timeline.Indicator
                  bg={entry.status === 'Activated' ? 'green.500' : 'red.500'}
                />
                <Timeline.Connector />
                <Timeline.Content>
                  <Flex alignItems="center" gap="2" mb="2">
                    <Timeline.Title>
                      <Text fontSize="xs" color="fg.muted">{entry.date}</Text>
                    </Timeline.Title>
                    <Badge
                      colorPalette={entry.status === 'Activated' ? 'green' : 'red'}
                      variant="subtle"
                      size="sm"
                    >
                      {entry.status}
                    </Badge>
                  </Flex>
                  <Stack gap="2">
                    {entry.changes.map((change, ci) => (
                      <Box key={ci} fontSize="xs" color="fg.muted" pl="2" borderLeftWidth="2px" borderColor="border.muted">
                        <Flex gap="1" flexWrap="wrap" alignItems="center">
                          <Tag size="sm" colorPalette="blue" variant="subtle">{change.field}</Tag>
                          <Text>from</Text>
                          <Text fontWeight="medium" color="fg">{change.from || '(empty)'}</Text>
                          <Text>to</Text>
                          <Text fontWeight="medium" color="fg">{change.to}</Text>
                          {change.category && (
                            <>
                              <Text>·</Text>
                              <Text>Category:</Text>
                              <Tag size="sm" variant="outline">{change.category}</Tag>
                            </>
                          )}
                        </Flex>
                        {change.prodType && (
                          <Text mt="1" fontSize="xs" color="fg.subtle">
                            Product Type: {change.prodType}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </Stack>
                  {ei < CHANGE_HISTORY.length - 1 && (
                    <Text fontSize="xs" color="blue.500" cursor="pointer" mt="2" fontWeight="medium">
                      See More
                    </Text>
                  )}
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ADVERTISERS PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function AdvertisersPage() {
  /* Modal states */
  const [showAddAdvertiser, setShowAddAdvertiser] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAddRule, setShowAddRule] = useState(false);
  const [showEditRule, setShowEditRule] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  /* Table state */
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');

  const allSelected = selected.length === ADVERTISERS.length;

  function toggleAll() {
    setSelected(allSelected ? [] : ADVERTISERS.map(a => a.id));
  }

  function toggleOne(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  const filtered = ADVERTISERS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" flex="1" minW="0" bg="#EDF0F5">
      {/* Top Bar */}
      <AdvertiserTopBar />

      {/* Main Content */}
      <Box as="main" flex="1" p="6" overflowY="auto">
        {/* Info Banner */}
        <Alert status="info" mb="4">
          <Text fontSize="xs">
            Edit Advertiser info and configure tracking codes. You can set the directly from the tab above, or edit the settings from the bulk action button below.
          </Text>
        </Alert>

        {/* Tab Bar */}
        <Tabs defaultValue="advertisers" variant="line" mb="4">
          <Tabs.List gap="4">
            <Tabs.Trigger value="advertisers" px="3">Advertisers</Tabs.Trigger>
            <Tabs.Trigger value="onboard-code" px="3">Advertiser's Onboard Code</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="advertisers">
            {/* Toolbar */}
            <Box mt="4" mb="4">
              <Flex
                alignItems="center"
                justifyContent="space-between"
                bg="white"
                p="4"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border"
              >
                <Flex alignItems="center" gap="3">
                  <Select
                    placeholder="Active"
                    options={[
                      { label: 'Active', value: 'active' },
                      { label: 'Inactive', value: 'inactive' },
                      { label: 'All', value: 'all' },
                    ]}
                    size="sm"
                  />
                  <Input
                    placeholder="Search advertisers..."
                    size="sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Flex>
                <Flex gap="2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkUpload(true)}
                  >
                    <Icon size={14}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </Icon>
                    Bulk Upload
                  </Button>
                  <Button
                    colorPalette="green"
                    size="sm"
                    onClick={() => setShowAddAdvertiser(true)}
                  >
                    <Icon size={14} color="white">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </Icon>
                    Create Advertiser
                  </Button>
                </Flex>
              </Flex>
              {/* Count sits cleanly below toolbar */}
              <Text fontSize="xs" color="fg.muted" mt="2" pl="1">
                Showing {filtered.length} of {ADVERTISERS.length} advertisers
              </Text>
            </Box>

            {/* Data Table */}
            <Box
              bg="white"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border"
              overflow="hidden"
            >
              <Table size="sm">
                <Table.Header>
                  <Table.Row bg="gray.50">
                    <Table.ColumnHeader w="40px" px="4">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all advertisers"
                      />
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>Advertiser ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Store/Unit ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Advertiser Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Persona</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Product Spend for Year</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Product Spend for Role</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Catalog Rules</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filtered.map((adv) => (
                    <Table.Row
                      key={adv.id}
                      _hover={{ bg: 'blue.50' }}
                      transition="background 0.1s"
                    >
                      <Table.Cell px="4">
                        <Checkbox
                          checked={selected.includes(adv.id)}
                          onCheckedChange={() => toggleOne(adv.id)}
                          aria-label={`Select ${adv.name}`}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="xs" fontWeight="medium">{adv.id}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="xs">{adv.storeId}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="xs" fontWeight="medium">{adv.name}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="xs">{adv.persona}</Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Text fontSize="xs" color={adv.pSpendYtd === '-' ? 'fg.subtle' : 'fg'}>
                          {adv.pSpendYtd}
                        </Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Text fontSize="xs" color={adv.pSpendYoY === '-' ? 'fg.subtle' : 'fg'}>
                          {adv.pSpendYoY}
                        </Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Badge
                          colorPalette={adv.catalogRules > 0 ? 'blue' : 'gray'}
                          variant="subtle"
                          size="sm"
                          cursor="pointer"
                          onClick={() => setShowAddRule(true)}
                        >
                          {adv.catalogRules > 0 ? adv.catalogRules : 'Add'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Flex gap="2" justifyContent="flex-end">
                          <Text
                            fontSize="xs"
                            color="blue.500"
                            cursor="pointer"
                            fontWeight="medium"
                            onClick={() => setShowEditRule(true)}
                            _hover={{ textDecoration: 'underline' }}
                          >
                            Edit
                          </Text>
                          <Text
                            fontSize="xs"
                            color="blue.500"
                            cursor="pointer"
                            fontWeight="medium"
                            onClick={() => setShowHistory(true)}
                            _hover={{ textDecoration: 'underline' }}
                          >
                            History
                          </Text>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              {/* Table footer / pagination area */}
              <Flex
                px="4" py="3"
                alignItems="center"
                justifyContent="space-between"
                borderTopWidth="1px"
                borderColor="border"
                bg="gray.50"
              >
                <Text fontSize="xs" color="fg.muted">
                  Showing {filtered.length} of {ADVERTISERS.length} advertisers
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  Last updated: {new Date().toLocaleDateString()}
                </Text>
              </Flex>
            </Box>
          </Tabs.Content>

          <Tabs.Content value="onboard-code">
            <Box bg="white" p="6" borderRadius="lg" mt="4" borderWidth="1px" borderColor="border">
              <Text fontSize="sm" color="fg.muted">
                Onboard code configuration will appear here. Use this tab to manage tracking pixels and integration scripts for each advertiser.
              </Text>
            </Box>
          </Tabs.Content>
        </Tabs>
      </Box>

      {/* ── Modals ── */}
      <AddAdvertiserModal
        open={showAddAdvertiser}
        onClose={() => setShowAddAdvertiser(false)}
      />
      <BulkUploadModal
        open={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
      />
      <RuleModal
        open={showAddRule}
        onClose={() => setShowAddRule(false)}
        editMode={false}
      />
      <RuleModal
        open={showEditRule}
        onClose={() => setShowEditRule(false)}
        editMode={true}
        initialConditions={[
          { field: 'brand_name', operator: 'eq', value: 'Nike' },
          { field: 'category', operator: 'contains', value: 'Footwear' },
          { field: 'price', operator: 'gt', value: '1000' },
        ]}
      />
      <ChangeHistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </Box>
  );
}
