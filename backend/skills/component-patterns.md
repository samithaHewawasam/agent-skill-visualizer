# Component Patterns - IntelliOps

This document covers all reusable component patterns including panels, cards, tables, lists, and forms.

---

## Table of Contents

- [Form Patterns](#form-patterns)
- [GenericPanel](#genericpanel)
- [GenericCard](#genericcard)
- [GenericTableListCardView](#generictablelistcardview)
- [List View Pattern](#list-view-pattern)

---

## Form Patterns

Standard patterns for forms and input fields.

### Form Field Label Pattern

Always use this consistent label pattern:

```tsx
<label className="mb-2 block text-sm font-medium text-foreground">
  Field Name *
  <span className="ml-2 text-xs font-normal text-text-secondary">(optional)</span>
</label>
```

**Usage:**

```tsx
// Required field
<label className="mb-2 block text-sm font-medium text-foreground">
  Email Address *
</label>
<Input type="email" placeholder="Enter email" />

// Optional field
<label className="mb-2 block text-sm font-medium text-foreground">
  Phone Number
  <span className="ml-2 text-xs font-normal text-text-secondary">(optional)</span>
</label>
<Input type="tel" placeholder="Enter phone" />
```

### Card Selection Pattern (Type Picker)

For selectable cards/options:

```tsx
<button className={cn(
  "relative rounded-lg border-2 p-4 transition-all",
  isSelected
    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
    : "border-border hover:border-primary/50"
)}>
  {/* Card content */}
</button>
```

**Complete Example:**

```tsx
const TypePicker = ({ selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            "relative rounded-lg border-2 p-4 text-left transition-all",
            selectedType === type.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <type.icon className="size-5 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">{type.name}</h3>
          <p className="text-sm text-text-secondary">{type.description}</p>
        </button>
      ))}
    </div>
  );
};
```

---

## GenericPanel

**CRITICAL:** Always use `GenericPanel` for panels. Never use Dialog/Modal for panels. Panels should be used with `ContentLayout`.

See [Layout Patterns](./layout-patterns.md) for integration with `ContentLayout`.

### Basic Props

```tsx
interface GenericPanelProps {
  // Required
  title: string;
  onClose: () => void;

  // Optional
  subtitle?: string;
  icon?: React.ComponentType;

  // Search functionality
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Selection info
  selectedCount?: number;
  totalCount?: number;

  // Footer/Actions
  showFooter?: boolean;
  submitText?: string;
  onSubmit?: () => void;
  submitDisabled?: boolean;

  // Content
  children: React.ReactNode;
}
```

### Complete Example

```tsx
import { GenericPanel } from '@components/Panel/GenericPanel';
import { Package } from 'lucide-react';

<GenericPanel
  title="Edit Application"
  subtitle="Update application details"
  icon={Package}
  onClose={handleClose}
  showSearch
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  selectedCount={selectedItems.length}
  totalCount={totalItems}
  showFooter
  submitText="Save Changes"
  onSubmit={handleSubmit}
  submitDisabled={!isValid}
>
  <div className="space-y-4 p-6">
    {/* Form fields */}
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        Name *
      </label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        Description
        <span className="ml-2 text-xs font-normal text-text-secondary">(optional)</span>
      </label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
    </div>
  </div>
</GenericPanel>
```

### Usage Variations

**Simple Panel (No Footer):**

```tsx
<GenericPanel
  title="Details"
  icon={Info}
  onClose={handleClose}
>
  <div className="p-6">
    {/* Read-only content */}
  </div>
</GenericPanel>
```

**Panel with Search:**

```tsx
<GenericPanel
  title="Select Items"
  icon={ListIcon}
  onClose={handleClose}
  showSearch
  searchValue={search}
  onSearchChange={setSearch}
  selectedCount={selected.length}
  totalCount={items.length}
  showFooter
  onSubmit={handleConfirm}
>
  <div className="p-6">
    {/* Searchable list */}
  </div>
</GenericPanel>
```

---

## GenericCard

**CRITICAL:** NEVER create custom card components. Always use `GenericCard` from `@components/Generics/GenericCard`.

### Full Props Interface

```typescript
interface GenericCardProps {
  // Required
  title: string;

  // Basic
  subtitle?: string;
  icon?: React.ReactNode;
  iconBgClass?: string;
  variant?: "default" | "metric";
  noSelection?: boolean;

  // Content
  content?: React.ReactNode;  // Custom content area

  // Metrics (for variant="metric" or footer metrics)
  mainMetric?: {
    value: string | number;
    label?: string;
    icon?: React.ReactNode;
    valueColor?: "success" | "error" | "warning" | "info" | "primary" | "secondary";
  };
  secondaryMetric?: MetricData;
  trend?: {
    direction: "up" | "down";
    value: string;
    label?: string;
  };

  // Status
  status?: string;
  statusVariant?: "active" | "pending" | "draft" | "paused" | "error";
  statusPlacement?: "header" | "footer" | "top-right";

  // Tags
  tags?: Array<{
    label: string;
    variant?: "success" | "error" | "warning" | "info" | "neutral";
  }>;

  // Timestamps
  lastUpdated?: string;

  // Interaction
  onClick?: () => void;
  isSelected?: boolean;
  isActive?: boolean;  // false = muted/disabled appearance

  // Actions
  showMoreMenu?: boolean;
  onMoreClick?: () => void;
  showHoverActions?: boolean;
  hoverActions?: Array<{
    icon: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
  }>;

  // Expand/Collapse (for hierarchical items)
  hasChildren?: boolean;
  childCount?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;

  // Styling
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  iconWrapperClassName?: string;
  selectedIndicatorClass?: string;
}
```

### Variant Guide

| Use Case | Variant | Example |
|----------|---------|---------|
| List/grid items | `default` | Application cards, team members, connectors |
| Dashboard stats | `metric` | Total users, active tasks, completion rate |
| Selectable items | `default` | Feature selection, entity picker |
| KPI displays | `metric` | Revenue, growth %, counts |

### Default Variant Examples

**Basic Card:**

```tsx
import { GenericCard } from '@components/Generics/GenericCard';
import { AppWindow } from 'lucide-react';

<GenericCard
  title="Application Name"
  subtitle="Brief description of the application"
  icon={<AppWindow className="size-5 text-primary" />}
  iconBgClass="bg-primary/10 border border-primary/20"
  onClick={() => navigate(`/apps/${item.uid}`)}
/>
```

**Card with Status:**

```tsx
<GenericCard
  title="Production API"
  subtitle="Main production environment"
  icon={<Cloud className="size-5 text-success" />}
  iconBgClass="bg-success/10 border border-success/20"
  status="Active"
  statusVariant="active"
  statusPlacement="top-right"
  onClick={handleClick}
/>
```

**Card with Tags:**

```tsx
<GenericCard
  title="User Service"
  subtitle="Authentication and user management"
  icon={<Users className="size-5 text-primary" />}
  iconBgClass="bg-primary/10 border border-primary/20"
  tags={[
    { label: "API", variant: "info" },
    { label: "Production", variant: "success" }
  ]}
  onClick={handleClick}
/>
```

**Selectable Card:**

```tsx
<GenericCard
  title="Feature A"
  subtitle="Enable advanced features"
  icon={<Sparkles className="size-5 text-primary" />}
  iconBgClass="bg-primary/10 border border-primary/20"
  isSelected={selectedId === item.id}
  onClick={() => setSelectedId(item.id)}
/>
```

**Card with Actions:**

```tsx
<GenericCard
  title="Database Connection"
  subtitle="PostgreSQL production instance"
  icon={<Database className="size-5 text-primary" />}
  iconBgClass="bg-primary/10 border border-primary/20"
  showHoverActions
  hoverActions={[
    { icon: <Eye />, onClick: handleView, ariaLabel: "View" },
    { icon: <Edit2 />, onClick: handleEdit, ariaLabel: "Edit" },
  ]}
  showMoreMenu
  onMoreClick={handleMoreClick}
/>
```

**Hierarchical Card (with expand/collapse):**

```tsx
<GenericCard
  title="Parent Feature"
  subtitle="Contains 3 sub-features"
  icon={<Layers className="size-5 text-primary" />}
  iconBgClass="bg-primary/10 border border-primary/20"
  hasChildren
  childCount={3}
  isExpanded={expanded}
  onToggleExpand={() => setExpanded(!expanded)}
/>
```

### Metric Variant Examples

**Simple Metric:**

```tsx
<GenericCard
  variant="metric"
  title="Total Members"
  icon={<Users className="size-4 text-primary" />}
  iconBgClass="bg-primary/10"
  mainMetric={{
    value: "1,234",
    valueColor: "primary"
  }}
/>
```

**Metric with Trend:**

```tsx
<GenericCard
  variant="metric"
  title="Active Users"
  icon={<Activity className="size-4 text-success" />}
  iconBgClass="bg-success/10"
  mainMetric={{
    value: "856",
    valueColor: "success"
  }}
  trend={{
    direction: "up",
    value: "+12%",
    label: "vs last month"
  }}
/>
```

**Metric with Multiple Values:**

```tsx
<GenericCard
  variant="metric"
  title="Task Completion"
  icon={<CheckCircle2 className="size-4 text-success" />}
  iconBgClass="bg-success/10"
  mainMetric={{
    value: "87%",
    label: "Complete",
    valueColor: "success"
  }}
  secondaryMetric={{
    value: "124/142",
    label: "Tasks"
  }}
/>
```

---

## GenericTableListCardView

Versatile component for displaying data in table, list, or card views with pagination.

### Import

```tsx
import GenericTableListCardView from '@components/TableListCard/GenericTableListCardView';
import { TableColumn } from '@components/TableListCard/TableColumn';
import { ItemAction, ItemBulkAction } from 'pages/Connectors/components/TableAction';
```

**IMPORTANT:** Always add `className="p-6"` to GenericTableListCardView for proper padding/spacing in list views.

### Basic Props

```typescript
interface GenericTableListCardViewProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: ItemAction<T>[];
  bulkActions?: ItemBulkAction<T>[];
  className?: string;  // Use "p-6" for proper padding
  pagination?: PaginationProps;
  listComponent?: React.ComponentType<{ item: T; actions: ItemAction<T>[] }>;
  cardComponent?: React.ComponentType<{ item: T }>;
  module: string;
  onRowClick?: (item: T) => void;
}

interface TableColumn<T> {
  key: string;
  header: string;
  type: 'text' | 'custom';
  sortable?: boolean;
  customRender?: (value: any, item: T) => React.ReactNode;
}

interface ItemAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: React.ComponentType;
  variant?: 'default' | 'danger' | 'destructive';
  isDefault?: boolean;  // Shows as primary button

  // Inline delete confirmation (MUST use for destructive actions)
  requiresConfirmation?: boolean;
  confirmationTitle?: string;
  confirmationMessage?: string;
  confirmLabel?: string;
  loadingText?: string;
}
```

### Complete Example

```tsx
import { AppWindow, Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from '@components/ui/statusbadge';

const columns: TableColumn<Application>[] = [
  {
    key: 'name',
    header: 'Name',
    type: 'text',
    sortable: true
  },
  {
    key: 'uid',
    header: 'UID',
    type: 'text'
  },
  {
    key: 'status',
    header: 'Status',
    type: 'custom',
    customRender: (value, item) => (
      <StatusBadge
        label={value}
        variant={value === 'active' ? 'active' : 'pending'}
        size="sm"
      />
    )
  },
  {
    key: 'createdAt',
    header: 'Created',
    type: 'custom',
    customRender: (value) => formatTimeAgo(value)
  }
];

const actions: ItemAction<Application>[] = [
  {
    label: 'View',
    onClick: handleView,
    icon: Eye,
    variant: 'default',
    isDefault: true  // Primary action
  },
  {
    label: 'Edit',
    onClick: handleEdit,
    icon: Edit2,
    variant: 'default'
  },
  {
    label: 'Delete',
    onClick: async (item) => {
      try {
        await deleteItem.mutateAsync(item.uid);
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    },
    icon: Trash2,
    variant: 'destructive',
    // CRITICAL: MUST use inline confirmation for delete actions
    requiresConfirmation: true,
    confirmationTitle: 'Delete Application',
    confirmationMessage: 'Are you sure you want to delete this application? This action cannot be undone.',
    confirmLabel: 'Delete',
    loadingText: 'Deleting...',
  },
];

const bulkActions: ItemBulkAction<Application>[] = [
  {
    label: 'Delete Selected',
    onClick: handleBulkDelete,
    icon: Trash2,
    variant: 'danger'
  }
];

<GenericTableListCardView<Application>
  data={applications}
  columns={columns}
  actions={actions}
  bulkActions={bulkActions}
  className="p-6"
  pagination={{
    page: currentPage,
    pageSize: pageSize,
    total: totalItems,
    onNextPage: handleNextPage,
    onPreviousPage: handlePreviousPage,
    onPageSizeChange: handlePageSizeChange
  }}
  listComponent={ApplicationListView}
  cardComponent={ApplicationCardView}
  module="application"
  onRowClick={handleRowClick}
/>
```

### Inline Delete Confirmation

**CRITICAL:** For all destructive actions (delete, remove, unlink, etc.), ALWAYS use inline confirmation. NEVER use `window.confirm()` or `confirm()`.

**Pattern:**

```tsx
import { Trash2 } from 'lucide-react';

const actions: ItemAction<T>[] = [
  {
    label: 'Delete',
    onClick: async (item) => {
      try {
        await deleteItem.mutateAsync(item.uid);
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    },
    icon: Trash2,
    variant: 'destructive',
    requiresConfirmation: true,
    confirmationTitle: 'Delete Item',
    confirmationMessage: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmLabel: 'Delete',
    loadingText: 'Deleting...',
  },
];
```

**For Bulk Actions:**

```tsx
const bulkActions: ItemBulkAction<T>[] = [
  {
    label: 'Delete Selected',
    onClick: async (items) => {
      try {
        const uids = items.map(item => item.uid);
        const result = await bulkDeleteMutation.mutateAsync({ uids });
        return {
          succeeded: result.successUIds,
          failed: result.failedUIds,
        };
      } catch (error) {
        console.error('Failed to delete:', error);
        return {
          succeeded: [],
          failed: items.map(item => item.uid),
        };
      }
    },
    icon: Trash2,
    variant: 'destructive',
    requiresConfirmation: true,
    confirmationTitle: 'Delete Items',
    confirmationMessage: 'Are you sure you want to delete the selected items? This action cannot be undone.',
    confirmLabel: 'Delete',
    loadingText: 'Deleting...',
  },
];
```

**Key Points:**
- Set `requiresConfirmation: true` for destructive actions
- Use descriptive `confirmationTitle` and `confirmationMessage`
- Use `variant: 'destructive'` for delete actions
- The `onClick` handler should NOT include `confirm()` - confirmation is handled automatically
- Include `loadingText` to show progress during the action

### Mandatory Column Patterns

**CRITICAL:** Always follow these patterns for specific column types to maintain consistency.

#### UID Columns

**MUST use `CopyableLabel` component:**

```tsx
import CopyableLabel from '@components/ui/copyable-label';

const columns: TableColumn<T>[] = [
  {
    key: 'uid',
    header: 'UID',
    type: 'custom',
    customRender: (value) => <CopyableLabel text={value} />
  }
];
```

#### Status Columns

**MUST use `StatusBadge` component:**

```tsx
import StatusBadge from '@components/ui/statusbadge';

const columns: TableColumn<T>[] = [
  {
    key: 'status',
    header: 'Status',
    type: 'custom',
    customRender: (value) => (
      <StatusBadge
        label={value}
        variant={getStatusVariant(value)}  // 'active' | 'pending' | 'paused' | 'draft' | 'error'
        size="sm"
      />
    )
  }
];

// Status variant mapping helper
const getStatusVariant = (status: string): 'active' | 'pending' | 'paused' | 'draft' | 'error' => {
  const variants: Record<string, 'active' | 'pending' | 'paused' | 'draft' | 'error'> = {
    active: 'active',
    inactive: 'paused',
    pending: 'pending',
    draft: 'draft',
    archived: 'draft',
    error: 'error',
    failed: 'error',
  };
  return variants[status.toLowerCase()] || 'draft';
};
```

#### Time/Date Columns

**MUST use `formatTimeAgo` for relative time display:**

```tsx
import { formatTimeAgo } from 'utils/datetime-util';

const columns: TableColumn<T>[] = [
  {
    key: 'createdAt',
    header: 'Created',
    type: 'custom',
    customRender: (value) => (
      <span className="text-sm text-text-secondary">
        {formatTimeAgo(value)}
      </span>
    )
  },
  {
    key: 'updatedAt',
    header: 'Last Updated',
    type: 'custom',
    customRender: (value) => (
      <span className="text-sm text-text-secondary">
        {formatTimeAgo(value)}
      </span>
    )
  }
];
```

**Output examples:** "8 hours ago", "2 days ago", "3 months ago"

#### Complete Column Definition Example

```tsx
import CopyableLabel from '@components/ui/copyable-label';
import StatusBadge from '@components/ui/statusbadge';
import { formatTimeAgo } from 'utils/datetime-util';

const columns: TableColumn<Team>[] = [
  {
    key: 'name',
    header: 'Name',
    type: 'text',
    sortable: true,
  },
  {
    key: 'uid',
    header: 'UID',
    type: 'custom',
    customRender: (value) => <CopyableLabel text={value} />,
  },
  {
    key: 'status',
    header: 'Status',
    type: 'custom',
    customRender: (value) => (
      <StatusBadge
        label={value}
        variant={value === 'active' ? 'active' : 'paused'}
        size="sm"
      />
    ),
  },
  {
    key: 'memberCount',
    header: 'Members',
    type: 'text',
  },
  {
    key: 'updatedAt',
    header: 'Last Updated',
    type: 'custom',
    customRender: (value) => (
      <span className="text-sm text-text-secondary">
        {formatTimeAgo(value)}
      </span>
    ),
  },
];
```

---

## List View Pattern

List views are used with `GenericTableListCardView` via the `listComponent` prop. **CRITICAL:** Always add action buttons to show actions on the right side of each row. Always use `COLUMN_WIDTHS` for consistent spacing.

### Required Imports

```tsx
import { ItemAction } from "pages/Connectors/components/TableAction";
import { TruncatedText } from "@components/ui/tooltip";
import CopyableLabel from "@components/ui/copyable-label";
import StatusBadge from "@components/ui/statusbadge";
import { formatTimeAgo } from "utils/datetime-util";
import { COLUMN_WIDTHS } from "@constants/table-columns";
```

### Column Widths Reference

```typescript
const COLUMN_WIDTHS = {
  icon: "w-10",
  iconWithName: "w-64",
  name: "w-48",
  nameWide: "w-64",
  type: "w-32",
  uid: "w-48",
  source: "w-40",
  status: "w-32",
  enabled: "w-24",
  count: "w-20",
  countWithLabel: "w-32",
  date: "w-32",
  dateWide: "w-40",
  actions: "w-24",
  actionsWide: "w-32",
};
```

### Standard List View Structure

**IMPORTANT:** List view components MUST accept both `item` and `actions` props.

```tsx
import { AppWindow } from 'lucide-react';
import { ItemAction } from 'pages/Connectors/components/TableAction';

interface ListViewProps {
  item: YourItemType;
  actions?: ItemAction<YourItemType>[];
}

export const ApplicationListView: React.FC<ListViewProps> = ({ item, actions }) => (
  <div className="flex items-center justify-between p-4 hover:bg-elevation-1 transition-colors">
    {/* Main content */}
    <div className="flex flex-1 items-center gap-4">
      {/* Icon + Name column */}
      <div className={`flex ${COLUMN_WIDTHS.iconWithName} shrink-0 items-center gap-3`}>
        <div className="flex size-9 items-center justify-center rounded-lg border-0.5 border-primary-500/30 bg-primary-500/10">
          <AppWindow className="size-4 text-primary-500" />
        </div>
        <TruncatedText
          text={item.name}
          className="text-sm font-medium text-text-primary"
          lineClamp={2}
        />
      </div>

      {/* UID column */}
      <div className={`flex ${COLUMN_WIDTHS.uid} shrink-0`}>
        <CopyableLabel text={item.uid} />
      </div>

      {/* Status column */}
      <div className={`flex ${COLUMN_WIDTHS.status} shrink-0`}>
        <StatusBadge
          label={item.status}
          variant={item.status === 'active' ? 'active' : 'pending'}
          size="sm"
        />
      </div>

      {/* Date column */}
      <div className={`flex ${COLUMN_WIDTHS.date} shrink-0`}>
        <span className="text-sm text-text-secondary">
          {formatTimeAgo(item.createdAt)}
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className="ml-4 flex items-center gap-2">
      {actions?.map((action, idx) => (
        <button
          key={idx}
          onClick={() => action.onClick(item)}
          className="rounded p-1.5 hover:bg-elevation-2 transition-colors"
        >
          {action.icon && <action.icon className="size-4" />}
        </button>
      ))}
    </div>
  </div>
);
```

### Variations

**Compact List View:**

```tsx
export const CompactListView = ({ item }) => (
  <div className="flex items-center gap-3 p-3">
    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="size-4 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{item.name}</p>
      <p className="text-xs text-text-secondary truncate">{item.description}</p>
    </div>
  </div>
);
```

**List View with Multiple Actions:**

```tsx
export const DetailedListView = ({ item, actions }) => (
  <div className="flex items-center justify-between p-4 border-b border-border-subtle">
    <div className="flex flex-1 items-center gap-4">
      {/* Columns */}
    </div>

    {/* Action buttons */}
    <div className="flex items-center gap-2">
      {actions.filter(a => a.isDefault).map((action, idx) => (
        <Button
          key={idx}
          size="sm"
          variant="outline"
          onClick={() => action.onClick(item)}
        >
          {action.icon && <action.icon className="mr-2 size-4" />}
          {action.label}
        </Button>
      ))}
      {/* More menu for other actions */}
    </div>
  </div>
);
```

---

## Card View Pattern

Card views use `GenericCard` with `GenericTableListCardView` via the `cardComponent` prop. **CRITICAL:** Always add hover actions to show actions on card hover.

### Card Component Structure

```tsx
import GenericCard from '@components/Generics/GenericCard';
import { ItemAction } from 'pages/Connectors/components/TableAction';
import { Users } from 'lucide-react';

interface CardProps {
  item: YourItemType;
  actions?: ItemAction<YourItemType>[];
}

export const YourItemCard: React.FC<CardProps> = ({ item, actions }) => {
  const defaultAction = actions?.find((action) => action.isDefault);

  // Convert actions to hover actions format (shows on card hover)
  const hoverActions = actions?.map((action) => ({
    icon: action.icon ? <action.icon className="size-4" /> : undefined,
    onClick: () => action.onClick(item),
    ariaLabel: action.label,
  })).filter((action) => action.icon);

  return (
    <GenericCard
      title={item.name}
      subtitle={item.description}
      icon={<Users className="size-5 text-primary" />}
      iconBgClass="bg-primary/10 border-0.5 border-primary/20"
      status={item.status}
      statusVariant="active"
      statusPlacement="top-right"
      onClick={defaultAction ? () => defaultAction.onClick(item) : undefined}
      showHoverActions={hoverActions && hoverActions.length > 0}
      hoverActions={hoverActions}
      tags={[{ label: 'Active', variant: 'success' }]}
      lastUpdated={item.updatedAt}
    />
  );
};
```

### Hover Actions Behavior

- Actions appear at the bottom of the card on hover
- Displayed as icon buttons with tooltips
- Smooth slide-up animation
- Automatically filtered to only show actions with icons
- Stops click propagation (won't trigger card onClick)

### When to Use Each Action Type

| Use Case | Action Type | Display |
|----------|-------------|---------|
| **Primary action** | `isDefault: true` | Card onClick handler |
| **Secondary actions** | Regular actions | Hover action buttons at bottom |
| **No actions needed** | Omit | Card not clickable |

### Card with More Menu (Alternative)

For cards that need a menu button instead of hover actions:

```tsx
<GenericCard
  title={item.name}
  subtitle={item.description}
  showMoreMenu={true}
  onMoreClick={() => openActionMenu(item)}
  // ... other props
/>
```

**Note:** Use hover actions for better UX - more menu is less discoverable.

---

## Best Practices

### ✅ Do

- Always use `GenericPanel` for panels (not Dialog/Modal)
- Always use `GenericCard` for cards (never create custom cards)
- Use `COLUMN_WIDTHS` for list view columns
- Use consistent form field labels
- Provide appropriate actions for list items

### ❌ Don't

- Create custom card components
- Use Dialog/Modal for panels
- Hard-code column widths in list views
- Mix different label patterns in forms
- Forget to provide key actions in tables/lists

---

**Related Documentation:**
- [Layout Patterns](./layout-patterns.md) - Using components in layouts
- [Design System](./design-system.md) - Styling components
- [State Management](./state-management.md) - Managing component state
