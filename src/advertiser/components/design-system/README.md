# Design System Components

A comprehensive library of reusable UI components built with semantic design tokens for consistent theming across light and dark modes.

## Installation

Copy the entire `components/design-system` folder to your project. Ensure you have the design system CSS variables defined in your `globals.css`.

## Components

### Navigation Components

#### Sidebar
Collapsible navigation sidebar with menu items and sub-items.

**Props:**
- `brandLogo`: ReactNode - Custom logo component
- `brandName`: string - Brand name to display (default: "QA")
- `items`: SidebarItem[] - Array of navigation items
- `activeItem`: string - Currently active item label
- `onItemClick`: (label: string) => void - Click handler for items

**Example:**
```tsx
import { Sidebar } from "@/components/design-system"
import { Rocket, ShoppingCart, Settings } from "lucide-react"

const items = [
  {
    icon: <Rocket size={20} />,
    label: "Campaigns",
    hasSubmenu: true,
    subItems: [
      { icon: <ShoppingCart size={18} />, label: "Product Ads" },
      { icon: <ImageIcon size={18} />, label: "Display Ads" },
    ]
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    badge: "3",
    badgeColor: "error"
  }
]

<Sidebar
  items={items}
  activeItem="Product Ads"
  onItemClick={(label) => console.log(label)}
/>
```

#### NavItem
Individual navigation item with icon, label, and optional badge.

**Props:**
- `icon`: ReactNode
- `label`: string
- `active`: boolean
- `expanded`: boolean
- `hasSubmenu`: boolean
- `badge`: string - Badge text
- `badgeColor`: "error" | "warning" | "success" | "violet"

#### SubItem
Sub-menu item for nested navigation.

### Header Components

#### Header
Top navigation header with logo, company selector, and actions.

**Example:**
```tsx
import { Header, HeaderIconButton } from "@/components/design-system"
import { Search, Bell, Settings } from "lucide-react"

<Header
  companyName="Whitakers (Whitakers)"
  actions={
    <>
      <HeaderIconButton icon={<Search size={14} />} />
      <HeaderIconButton icon={<Bell size={14} />} badge />
      <HeaderIconButton icon={<Settings size={14} />} />
    </>
  }
/>
```

#### HeaderIconButton (IconButton)
Icon button for header actions with optional badge.

**Props:**
- `icon`: ReactNode
- `onClick`: () => void
- `badge`: boolean - Show notification badge
- `badgeColor`: string - Badge color (default: error-primary)

#### Dropdown
Dropdown selector with label and chevron.

### Table Components

#### DataTable
Complete data table with sorting, selection, and custom rendering.

**Props:**
- `columns`: Column[] - Column definitions
- `data`: any[] - Row data
- `selectable`: boolean - Enable row selection
- `onRowSelect`: (rows: any[]) => void - Selection handler
- `footer`: ReactNode - Custom footer content

**Example:**
```tsx
import { DataTable } from "@/components/design-system"

const columns = [
  { key: "name", label: "Name", hasFilter: true },
  { key: "status", label: "Status", render: (val) => <Badge>{val}</Badge> },
  { key: "budget", label: "Budget", hasInfo: true, width: "120px" }
]

const data = [
  { name: "Campaign 1", status: "Active", budget: "$1,000" },
  { name: "Campaign 2", status: "Paused", budget: "$500" }
]

<DataTable
  columns={columns}
  data={data}
  selectable
  onRowSelect={(rows) => console.log(rows)}
/>
```

#### TableHeaderCell
Table header cell with optional filter/info icons.

#### TableCell
Standard table data cell.

#### TableRow
Table row with hover effect.

### Drawer Components

#### Drawer
Side drawer that slides from the right (partial overlay).

**Props:**
- `open`: boolean
- `onClose`: () => void
- `width`: "small" | "medium" | "large" | "xlarge"

**Example:**
```tsx
import { 
  Drawer, 
  DrawerHeader, 
  DrawerContent, 
  DrawerFooter 
} from "@/components/design-system"

<Drawer open={isOpen} onClose={() => setIsOpen(false)} width="large">
  <DrawerHeader
    title="Create Ad Group"
    onClose={() => setIsOpen(false)}
    actions={<HelpLink />}
  />
  <DrawerContent>
    {/* form content */}
  </DrawerContent>
  <DrawerFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary">Save</Button>
  </DrawerFooter>
</Drawer>
```

#### FullScreenModal
Full-screen modal for multi-step wizards.

**Example:**
```tsx
import { FullScreenModal } from "@/components/design-system"

<FullScreenModal open={isOpen} onClose={() => setIsOpen(false)}>
  {/* wizard content with sidebar */}
</FullScreenModal>
```

#### DrawerHeader, DrawerContent, DrawerFooter
Drawer section components with semantic styling.

### Stepper Components

#### VerticalStepper
Vertical step indicator for multi-step forms.

**Props:**
- `steps`: Step[] - Array of step objects
- `currentStep`: number - Active step number
- `onStepClick`: (stepId: number) => void - Step click handler

**Example:**
```tsx
import { VerticalStepper } from "@/components/design-system"

const steps = [
  { id: 1, title: "Basics", description: "Name & type" },
  { id: 2, title: "Targeting", description: "Audience selection" },
  { id: 3, title: "Budget", description: "Set budget & schedule" }
]

<VerticalStepper
  steps={steps}
  currentStep={2}
  onStepClick={(id) => setCurrentStep(id)}
/>
```

#### HorizontalStepper
Horizontal step indicator for top navigation.

**Example:**
```tsx
import { HorizontalStepper } from "@/components/design-system"

<HorizontalStepper
  steps={steps}
  currentStep={2}
  onStepClick={(id) => setCurrentStep(id)}
/>
```

#### VerticalStepperItem, HorizontalStepperItem
Individual step items with active/completed states.

### Buttons

#### DSButton
Primary button component with multiple variants and sizes.

**Props:**
- `variant`: "primary" | "secondary" | "ghost" | "danger" | "success"
- `size`: "sm" | "md" | "lg"
- `icon`: ReactNode
- `iconPosition`: "left" | "right"
- `loading`: boolean

**Example:**
```tsx
import { DSButton } from "@/components/design-system"
import { Plus } from "lucide-react"

<DSButton variant="primary" size="md" icon={<Plus size={16} />}>
  Create Campaign
</DSButton>
```

#### DSIconButton
Icon-only button for actions.

**Example:**
```tsx
import { DSIconButton } from "@/components/design-system"
import { Settings } from "lucide-react"

<DSIconButton icon={<Settings size={16} />} variant="default" />
```

### Form Elements

#### DSInput
Text input with label, error, and helper text support.

**Example:**
```tsx
import { DSInput } from "@/components/design-system"

<DSInput
  label="Campaign Name"
  placeholder="Enter name"
  error="This field is required"
  helperText="Choose a descriptive name"
/>
```

#### DSSearchInput
Pre-configured search input with icon.

**Example:**
```tsx
import { DSSearchInput } from "@/components/design-system"

<DSSearchInput placeholder="Search campaigns..." />
```

#### DSSelect
Dropdown select with styling.

**Example:**
```tsx
import { DSSelect } from "@/components/design-system"

<DSSelect label="Status">
  <option value="active">Active</option>
  <option value="paused">Paused</option>
</DSSelect>
```

#### DSTextarea
Multi-line text input.

#### DSCheckbox & DSRadio
Form controls with labels.

### Badges

#### DSStatusBadge
Status indicators for Active, Paused, Ended, Draft states.

**Example:**
```tsx
import { DSStatusBadge } from "@/components/design-system"

<DSStatusBadge status="Active" />
```

#### DSLabelBadge
General-purpose badge with variants.

**Example:**
```tsx
import { DSLabelBadge } from "@/components/design-system"

<DSLabelBadge variant="primary">New</DSLabelBadge>
<DSLabelBadge variant="alpha">Alpha</DSLabelBadge>
```

### Layout Components

#### DSCard
Card container with optional hover effect.

**Example:**
```tsx
import { DSCard, DSCardHeader } from "@/components/design-system"

<DSCard padding="lg" hover>
  <DSCardHeader 
    title="Campaign Performance"
    subtitle="Last 30 days"
  />
  {/* content */}
</DSCard>
```

#### DSTable
Complete table components with semantic styling.

**Example:**
```tsx
import { DSTable, DSTableHeader, DSTableHead, DSTableBody, DSTableRow, DSTableCell } from "@/components/design-system"

<DSTable>
  <DSTableHeader>
    <DSTableHead>Name</DSTableHead>
    <DSTableHead>Status</DSTableHead>
  </DSTableHeader>
  <DSTableBody>
    <DSTableRow>
      <DSTableCell>Campaign 1</DSTableCell>
      <DSTableCell>Active</DSTableCell>
    </DSTableRow>
  </DSTableBody>
</DSTable>
```

### Overlays

#### DSDrawer
Side drawer for forms and details.

**Example:**
```tsx
import { DSDrawer } from "@/components/design-system"

<DSDrawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create Ad Group"
  subtitle="Configure your ad group settings"
  size="large"
>
  {/* content */}
</DSDrawer>
```

#### DSModal
Centered modal dialog.

**Example:**
```tsx
import { DSModal } from "@/components/design-system"

<DSModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  {/* content */}
</DSModal>
```

### Empty State

#### DSEmptyState
Empty state placeholder with icon, text, and action.

**Example:**
```tsx
import { DSEmptyState } from "@/components/design-system"
import { Inbox } from "lucide-react"

<DSEmptyState
  icon={<Inbox size={32} />}
  title="No campaigns yet"
  description="Create your first campaign to get started"
  action={{
    label: "Create Campaign",
    onClick: () => handleCreate()
  }}
/>
```

## Design Tokens

All components use semantic CSS variables from the design system:

### Background Colors
- `--screen-bg`: Main background
- `--surface-1`: Card/elevated surfaces
- `--surface-2`: Nested surfaces
- `--left-nav-bg-1`, `--left-nav-bg-2`: Navigation gradient

### Text Colors
- `--text-primary`: Main text
- `--text-secondary`: Secondary text
- `--text-tertiary`: Tertiary/disabled text

### Borders
- `--stroke`: Default borders
- `--stroke-light`: Light borders

### Brand Colors
- `--blue-primary`: Primary actions
- `--blue-darker-1`, `--blue-darker-2`: Hover states
- `--blue-bg`: Light backgrounds
- `--violet-primary`: Accent color
- `--violet-bg`: Accent backgrounds

### Alert Colors
- `--success-primary`, `--success-bg`: Success states
- `--error-primary`, `--error-bg`: Error states
- `--warning-primary`, `--warning-bg`: Warning states

### Chart Colors
- `--chart-1` through `--chart-12`: Data visualization

These automatically adapt to light/dark themes via the `.dark` class.

## Theming

Components automatically support theme switching when using ThemeProvider:

```tsx
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system">
  <App />
</ThemeProvider>
```

## Common Patterns

### Multi-Step Wizard with Drawer

```tsx
import { 
  Drawer, 
  DrawerHeader, 
  DrawerContent, 
  VerticalStepper 
} from "@/components/design-system"

function AdGroupWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const steps = [
    { id: 1, title: "Basics", description: "Name & type" },
    { id: 2, title: "Products", description: "Select products" },
    { id: 3, title: "Budget", description: "Set budget" }
  ]
  
  return (
    <Drawer open={open} onClose={onClose} width="xlarge">
      <div className="flex h-full">
        <div className="w-64 border-r p-4">
          <VerticalStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        <div className="flex-1">
          <DrawerContent>
            {/* step content */}
          </DrawerContent>
        </div>
      </div>
    </Drawer>
  )
}
```

### Data Table with Actions

```tsx
import { DataTable, DSIconButton } from "@/components/design-system"
import { Edit, Trash } from "lucide-react"

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  {
    key: "actions",
    label: "",
    width: "80px",
    render: (_, row) => (
      <div className="flex gap-2">
        <DSIconButton icon={<Edit size={14} />} />
        <DSIconButton icon={<Trash size={14} />} variant="danger" />
      </div>
    )
  }
]
```

### Sidebar with Header Layout

```tsx
import { Sidebar, Header } from "@/components/design-system"

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 ml-16">
        <Header companyName="Acme Corp" actions={headerActions} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
```

## Customization

Override styles using className prop or extend components:

```tsx
<DSButton className="w-full" style={{ backgroundColor: "var(--violet-primary)" }}>
  Custom Button
</DSButton>
```

## Copy to Other Repos

To use in another repository:

1. Copy the `components/design-system` folder
2. Copy the design token CSS variables from `app/globals.css`
3. Install dependencies: `lucide-react`, `next-themes`
4. Import and use: `import { DSButton, Sidebar } from "@/components/design-system"`

All components are self-contained and use only semantic tokens, ensuring consistency across projects.
