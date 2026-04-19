# Layout Patterns - IntelliOps

This document covers page layouts, content layouts, and the complete page flow patterns.

---

## Table of Contents

- [PageLayout](#pagelayout)
- [ContentLayout with Panel](#contentlayout-with-panel)
- [Page Flow Pattern](#page-flow-pattern)
- [Complete Examples](#complete-examples)

---

## PageLayout

**Use `PageLayout` for all pages.** Located at `src/layouts/PageLayout.tsx`.

### Basic Props

```typescript
interface PageLayoutProps {
  // Header
  title: string;
  subtitle?: string;
  icon?: React.ComponentType;

  // Actions in header
  actions?: React.ReactNode[];

  // Entity context (for detail pages)
  entityType?: string;
  entityUId?: string;

  // Layout options
  fullHeight?: boolean;  // For pages that need full viewport height

  // Content
  children: React.ReactNode;
}
```

### List Page Pattern

Use `PageLayout` + `GenericTableListCardView` for list pages.

```tsx
import { PageLayout } from 'layouts/PageLayout';
import GenericTableListCardView from '@components/TableListCard/GenericTableListCardView';
import { AppWindow, Plus } from 'lucide-react';
import { Button } from '@components/ui';

const ApplicationsListPage = () => {
  return (
    <PageLayout
      title="Applications"
      subtitle="Manage your applications"
      icon={AppWindow}
      actions={[
        <SearchInput key="search" />,
        <Button key="new" onClick={handleNew}>
          <Plus className="mr-2 size-4" />
          New Application
        </Button>
      ]}
      fullHeight  // Important for list pages with tables
    >
      <GenericTableListCardView
        data={applications}
        columns={columns}
        actions={actions}
        className="p-6"
        pagination={pagination}
        listComponent={ApplicationListView}
        cardComponent={ApplicationCardView}
        module="application"
      />
    </PageLayout>
  );
};
```

### Detail Page with Segments

Use `PageLayout` + `EntityHome` for detail pages with multiple segments/tabs.

```tsx
import { PageLayout } from 'layouts/PageLayout';
import { EntityHome } from '@components/Entity/EntityHome';
import { EntityTypes } from '@constants/enums';
import { AppWindow, Home, Settings, Users, Activity } from 'lucide-react';

const ApplicationDetailPage = () => {
  const { entityUId } = useParams();
  const { data } = useGetApplication(entityUId);

  const segments = [
    {
      label: 'Overview',
      key: 'overview',
      segmentPath: 'overview',
      icon: Home,
      component: ApplicationOverview,
      isDefault: true,
    },
    {
      label: 'Members',
      key: 'members',
      segmentPath: 'members',
      icon: Users,
      component: ApplicationMembers,
    },
    {
      label: 'Activity',
      key: 'activity',
      segmentPath: 'activity',
      icon: Activity,
      component: ApplicationActivity,
    },
    {
      label: 'Settings',
      key: 'settings',
      segmentPath: 'settings',
      icon: Settings,
      component: ApplicationSettings,
    },
  ];

  return (
    <PageLayout
      title={data?.name || 'Loading...'}
      subtitle={data?.uid}
      icon={AppWindow}
      entityType={EntityTypes.Application}
      entityUId={entityUId}
    >
      <EntityHome
        entityType={EntityTypes.Application}
        entityUId={entityUId}
        segments={segments}
      />
    </PageLayout>
  );
};
```

### Segment Interface

```typescript
interface Segment {
  label: string;           // Display name in tabs
  key: string;            // Unique identifier
  segmentPath: string;    // URL segment (e.g., 'overview', 'settings')
  icon: React.ComponentType;
  component: React.ComponentType;
  isDefault?: boolean;    // Default segment to show
  isLoading?: boolean;    // Show loading state
}
```

### Simple Content Page

For pages without segments:

```tsx
const SimplePage = () => {
  return (
    <PageLayout
      title="Dashboard"
      subtitle="Overview of your workspace"
      icon={LayoutDashboard}
      actions={[
        <Button key="refresh" variant="outline" onClick={handleRefresh}>
          <RefreshCw className="size-4" />
        </Button>
      ]}
    >
      <div className="p-6 space-y-6">
        {/* Page content */}
        <div className="grid grid-cols-3 gap-6">
          <GenericCard variant="metric" {...metricProps} />
          <GenericCard variant="metric" {...metricProps} />
          <GenericCard variant="metric" {...metricProps} />
        </div>
      </div>
    </PageLayout>
  );
};
```

---

## ContentLayout with Panel

**CRITICAL:** Always use `ContentLayout` + `GenericPanel` for pages with panels. **NEVER use Dialog/Modal for panels.**

### Why ContentLayout?

- Provides consistent page header
- Manages panel state and animations
- Supports multiple panel widths
- Handles responsive behavior
- Maintains proper z-index layers

### Basic Props

```typescript
interface ContentLayoutProps {
  // Header
  title: string;
  subtitle?: string;
  icon?: React.ComponentType;
  actions?: React.ReactNode[];

  // Panel management
  isPanelOpen: boolean;
  onPanelOpenChange: (open: boolean) => void;
  panel?: React.ReactNode;
  panelWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "50%";

  // Content
  children: React.ReactNode;
}
```

### Panel Width Guide

| Width | Size | Use Case |
|-------|------|----------|
| `sm` | ~400px | Simple forms, quick actions |
| `md` | ~500px | Standard forms |
| `lg` | ~640px | Detailed forms (default) |
| `xl` | ~768px | Complex forms with multiple sections |
| `2xl` | ~896px | Very large forms or embedded content |
| `50%` | Half screen | Side-by-side comparison |

### Complete Panel Example

```tsx
import { ContentLayout } from 'layouts/ContentLayout';
import { GenericPanel } from '@components/Panel/GenericPanel';
import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { Button, Input, Textarea } from '@components/ui';

const FeaturesPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async () => {
    // Save logic
    await saveFeature(formData);
    setIsPanelOpen(false);
    setFormData({ name: '', description: '' });
  };

  const isFormValid = formData.name.trim().length > 0;

  return (
    <ContentLayout
      title="Features"
      subtitle="Manage product features"
      icon={Package}
      actions={[
        <Button key="new" onClick={() => setIsPanelOpen(true)}>
          <Plus className="mr-2 size-4" />
          New Feature
        </Button>
      ]}
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panelWidth="lg"
      panel={
        <GenericPanel
          title={selectedFeature ? 'Edit Feature' : 'New Feature'}
          subtitle={selectedFeature ? 'Update feature details' : 'Create a new feature'}
          icon={Package}
          onClose={() => setIsPanelOpen(false)}
          showFooter
          submitText={selectedFeature ? 'Save Changes' : 'Create Feature'}
          onSubmit={handleSubmit}
          submitDisabled={!isFormValid}
        >
          <div className="space-y-4 p-6">
            {/* Form fields */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter feature name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Description
                <span className="ml-2 text-xs font-normal text-text-secondary">(optional)</span>
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the feature"
                rows={4}
              />
            </div>
          </div>
        </GenericPanel>
      }
    >
      {/* Main content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <GenericCard
              key={feature.id}
              title={feature.name}
              subtitle={feature.description}
              icon={<Package className="size-5 text-primary" />}
              iconBgClass="bg-primary/10 border border-primary/20"
              onClick={() => {
                setSelectedFeature(feature);
                setFormData({ name: feature.name, description: feature.description });
                setIsPanelOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </ContentLayout>
  );
};
```

### Panel with Search

For panels that display lists with search:

```tsx
<ContentLayout
  title="Assign Members"
  icon={Users}
  isPanelOpen={isPanelOpen}
  onPanelOpenChange={setIsPanelOpen}
  panelWidth="md"
  panel={
    <GenericPanel
      title="Select Members"
      icon={Users}
      onClose={() => setIsPanelOpen(false)}
      showSearch
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCount={selectedMembers.length}
      totalCount={filteredMembers.length}
      showFooter
      submitText="Add Members"
      onSubmit={handleAddMembers}
      submitDisabled={selectedMembers.length === 0}
    >
      <div className="divide-y divide-border-subtle">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => toggleMember(member.id)}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer hover:bg-elevation-1",
              selectedMembers.includes(member.id) && "bg-primary/5"
            )}
          >
            <Checkbox checked={selectedMembers.includes(member.id)} />
            <div className="flex-1">
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-text-secondary">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </GenericPanel>
  }
>
  {/* Main content */}
</ContentLayout>
```

### Panel without Footer

For read-only or informational panels:

```tsx
<GenericPanel
  title="Feature Details"
  subtitle={feature.name}
  icon={Info}
  onClose={() => setIsPanelOpen(false)}
>
  <div className="space-y-6 p-6">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Description</h3>
      <p className="text-sm text-text-primary">{feature.description}</p>
    </div>

    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Status</h3>
      <StatusBadge label={feature.status} variant="active" />
    </div>

    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Created</h3>
      <p className="text-sm text-text-primary">{formatDate(feature.createdAt)}</p>
    </div>
  </div>
</GenericPanel>
```

---

## Page Flow Pattern

Standard navigation flow in the application:

### 1. List Page (`/applications`)

**Layout:** `PageLayout` + `GenericTableListCardView`

**Purpose:** Display all items in a table/list/card view

**Features:**
- Search and filters
- Sorting
- Pagination
- Bulk actions
- Create new item

### 2. Detail Page (`/applications/:entityUId`)

**Layout:** `PageLayout` + `EntityHome` + segments

**Purpose:** Show details with multiple segments/tabs

**Features:**
- Entity header with title, subtitle, icon
- Segmented navigation (Overview, Members, Settings, etc.)
- Context menu for entity actions
- Breadcrumb navigation

### 3. Segment Content

**Layout Options:**

**Option A:** Simple segment (no panels)
```tsx
const OverviewSegment = () => (
  <div className="p-6 space-y-6">
    {/* Segment content */}
  </div>
);
```

**Option B:** Segment with panels
```tsx
const MembersSegment = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <ContentLayout
      title="Members"
      subtitle="Manage team members"
      icon={Users}
      actions={[
        <Button onClick={() => setIsPanelOpen(true)}>
          Add Member
        </Button>
      ]}
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panel={<GenericPanel {...panelProps} />}
    >
      <GenericTableListCardView
        data={members}
        columns={columns}
        actions={actions}
        className="p-6"
        {...otherProps}
      />
    </ContentLayout>
  );
};
```

### Flow Diagram

```
┌─────────────────────────────────────────┐
│  List Page (/applications)              │
│  PageLayout + GenericTableListCardView  │
└────────────┬────────────────────────────┘
             │ Click item
             ▼
┌─────────────────────────────────────────┐
│  Detail Page (/applications/:uid)       │
│  PageLayout + EntityHome + Segments     │
├─────────────────────────────────────────┤
│  Segments:                              │
│  - Overview (default)                   │
│  - Members                              │
│  - Settings                             │
└────────────┬────────────────────────────┘
             │ Select segment
             ▼
┌─────────────────────────────────────────┐
│  Segment Content                        │
│  Option A: Simple div                   │
│  Option B: ContentLayout + Panel        │
└─────────────────────────────────────────┘
```

---

## Complete Examples

### Example 1: Feature List → Detail → Members with Panel

**List Page:**

```tsx
// /features
const FeaturesList = () => (
  <PageLayout
    title="Features"
    subtitle="Product features"
    icon={Layers}
    actions={[<Button>New Feature</Button>]}
    fullHeight
  >
    <GenericTableListCardView {...tableProps} className="p-6" />
  </PageLayout>
);
```

**Detail Page:**

```tsx
// /features/:entityUId
const FeatureDetail = () => {
  const segments = [
    { label: 'Overview', key: 'overview', segmentPath: 'overview', icon: Home, component: FeatureOverview, isDefault: true },
    { label: 'Members', key: 'members', segmentPath: 'members', icon: Users, component: FeatureMembers },
    { label: 'Settings', key: 'settings', segmentPath: 'settings', icon: Settings, component: FeatureSettings },
  ];

  return (
    <PageLayout
      title={feature.name}
      subtitle={feature.uid}
      icon={Layers}
      entityType={EntityTypes.Feature}
      entityUId={entityUId}
    >
      <EntityHome
        entityType={EntityTypes.Feature}
        entityUId={entityUId}
        segments={segments}
      />
    </PageLayout>
  );
};
```

**Members Segment with Panel:**

```tsx
// /features/:entityUId/members
const FeatureMembers = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <ContentLayout
      title="Members"
      subtitle="Manage feature team"
      icon={Users}
      actions={[<Button onClick={() => setIsPanelOpen(true)}>Add Member</Button>]}
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panelWidth="md"
      panel={
        <GenericPanel
          title="Add Members"
          icon={Users}
          onClose={() => setIsPanelOpen(false)}
          showFooter
          onSubmit={handleAddMembers}
        >
          {/* Member selection list */}
        </GenericPanel>
      }
    >
      <GenericTableListCardView
        data={members}
        columns={memberColumns}
        actions={memberActions}
        className="p-6"
        {...memberTableProps}
      />
    </ContentLayout>
  );
};
```

---

## Entity Settings Pattern

**CRITICAL:** For settings segments in entity detail pages, always use the `EntitySettings` component pattern with left navigation and right content panels.

### Pattern Overview

The EntitySettings component provides a consistent two-panel layout for managing entity settings:
- **Left Panel**: Collapsible navigation with search and settings sections
- **Right Panel**: Dynamic content based on selected section

### Basic Structure

```tsx
import { EntitySettings } from '@components/Settings/EntitySettings/EntitySettings';
import { EntityTypes } from '@intelliops/types';

const ApplicationSettings: React.FC = () => {
  const { entityUId } = useParams();

  return (
    <EntitySettings
      entityType={EntityTypes.Application}
      entityUId={entityUId!}
      onUpdate={() => {}}
      saveSetting={async (path, value) => {}}
    />
  );
};
```

### How It Works

**1. EntitySettings Component** (`src/components/Settings/EntitySettings/EntitySettings.tsx`)
- Fetches entity settings using `useGetEntitySettings(entityType, entityUId)`
- Manages selected section state
- Handles left navigation collapse state
- Renders appropriate content based on section type

**2. Left Navigation** (`SettingsLeftNavigation`)
- Search functionality for filtering settings
- Collapsible navigation (expandable/collapsible with icon button)
- Supports nested settings groups
- Active section highlighting

**3. Right Content Panel** - Conditional rendering based on section type:
- **Standard Settings**: `StandardSettingsSection` - Form fields for configuration
- **Custom Sections**: Custom components (e.g., `ManageAccessSection` for access control)
- **Empty States**: No settings, no selection, or group selection prompts

### Key Features

**Settings Section Types:**
- `settingsSection`: Standard settings with form fields
- `settingsGroup`: Nested group of settings sections
- Custom sections: Special section IDs like `"manage-access"`

**StandardSettingsSection Pattern:**
```tsx
import { StandardSettingsSection } from '@components/Settings/EntitySettings/StandardSettingsSection';

// Used automatically by EntitySettings for standard sections
<StandardSettingsSection
  section={selectedSection}
  onChange={async (sectionId, settingId, value) => {
    await saveEntitySetting.mutateAsync({ sectionId, settingId, value });
    await refetch();
  }}
/>
```

Uses `ContentLayout` with:
- `showBorder={false}`
- `fullHeight={true}`
- `bg-elevation-0` for background
- Settings fields rendered in `<div className="space-y-6 bg-elevation-0 p-6">`

**Custom Section Pattern (Example: ManageAccessSection):**
```tsx
import { ManageAccessSection } from '@components/Settings/EntitySettings/ManageAccessSection';

// For special sections like access management
{selectedSection.id === "manage-access" ? (
  <ManageAccessSection
    entityType={entityType}
    entityUId={entityUId}
    onAddGroupsPanelOpenChange={(isOpen) => {
      if (isOpen) {
        setIsSettingsNavCollapsed(true);
      }
    }}
  />
) : (
  <StandardSettingsSection ... />
)}
```

### Layout Structure

```
┌──────────────────────────────────────────────────────┐
│  EntitySettings Container (flex h-full)              │
├──────────────┬───────────────────────────────────────┤
│  LEFT NAV    │  RIGHT CONTENT                        │
│  (w-80 or    │  (flex-1)                             │
│   w-16)      │                                       │
│              │                                       │
│  ┌────────┐  │  ┌─────────────────────────────────┐ │
│  │ Search │  │  │ ContentLayout (if standard)     │ │
│  │ Toggle │  │  │   title={section.title}         │ │
│  └────────┘  │  │   icon={Settings}               │ │
│              │  │                                 │ │
│  • Section 1 │  │   <div className="space-y-6    │ │
│  • Section 2 │  │         bg-elevation-0 p-6">   │ │
│  ▼ Group     │  │     <SettingField />           │ │
│    - Sub 1   │  │     <SettingField />           │ │
│    - Sub 2   │  │   </div>                       │ │
│  • Section 3 │  │                                 │ │
│              │  └─────────────────────────────────┘ │
└──────────────┴───────────────────────────────────────┘
```

### Complete Example

```tsx
// In your entity segment file (e.g., TeamSettings.tsx)
import React from 'react';
import { useParams } from 'react-router-dom';
import { EntitySettings } from '@components/Settings/EntitySettings/EntitySettings';
import { EntityTypes } from '@intelliops/types';

export const ApplicationSettings: React.FC = () => {
  const { entityUId } = useParams<{ entityUId: string }>();

  return (
    <EntitySettings
      entityType={EntityTypes.Application}
      entityUId={entityUId!}
      onUpdate={() => {
        // Optional: Handle updates (e.g., refetch entity data)
      }}
      saveSetting={async (path: string[], newValue: any) => {
        // This is handled internally by EntitySettings
        // You don't need to implement this
      }}
    />
  );
};
```

### Empty States

EntitySettings includes built-in empty states:

1. **No Settings Available**: When entity has no settings configured
2. **No Selection**: When user hasn't selected a section yet
3. **Group Selected**: When user selects a group (prompts to choose nested section)

All empty states follow the pattern:
```tsx
<div className="flex h-full min-h-[280px] items-center justify-center bg-elevation-0 px-6 text-center">
  <div className="max-w-md space-y-2">
    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-lg border border-border-subtle bg-elevation-1">
      <Settings className="size-6 text-text-tertiary" />
    </div>
    <h2 className="text-sm font-semibold text-text-primary">
      Title
    </h2>
    <p className="text-xs text-text-secondary">
      Description
    </p>
  </div>
</div>
```

### API Integration

**Query Hook:**
```tsx
import { useGetEntitySettings } from '@query/entity-settings-query';

const { data: entitySettings, isLoading, refetch } = useGetEntitySettings(
  EntityTypes.Application,
  applicationUId
);
```

**Mutation Hook:**
```tsx
import { useSaveEntitySetting } from '@query/entity-settings-query';

const saveEntitySetting = useSaveEntitySetting(EntityTypes.Application, applicationUId);

await saveEntitySetting.mutateAsync({
  sectionId: 'general',
  settingId: 'appName',
  value: 'New Application Name'
});
```

### Settings Data Structure

```typescript
interface EntitySettings {
  sections: SettingsSection[];
}

interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  sectionType: 'settingsSection' | 'settingsGroup';
  settings?: SettingItem[];  // For settingsSection
  sections?: SettingsSection[];  // For settingsGroup (nested)
}

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'text' | 'toggle' | 'select' | 'number' | 'textarea';
  value: any;
  options?: { label: string; value: string }[];  // For select type
}
```

### Best Practices for Entity Settings

**✅ Do:**
- Use `EntitySettings` component for all entity settings segments
- Keep settings organized in logical sections and groups
- Provide clear section titles and descriptions
- Use appropriate setting field types (toggle, text, select, etc.)
- Handle loading states and errors gracefully

**❌ Don't:**
- Create custom settings layouts - use EntitySettings component
- Mix settings with other content types
- Forget to handle the collapse state when opening panels
- Use custom section components without proper integration

### When to Use Custom Sections

Create custom sections for specialized functionality that doesn't fit standard settings fields:
- Access management (groups, users, permissions)
- Workflow configuration with complex UI
- Preview/visualization features
- Multi-step configuration wizards

Example custom sections:
- `"manage-access"`: Access control management
- `"workflow-builder"`: Visual workflow designer
- `"integrations"`: Third-party integration setup

---

## Best Practices

### ✅ Do

- Use `PageLayout` for all top-level pages
- Use `ContentLayout` when you need panels
- Use `GenericPanel` for all panels (never Dialog/Modal)
- Set `fullHeight` on list pages
- Provide clear segment labels and icons
- Mark one segment as `isDefault`

### ❌ Don't

- Use Dialog/Modal for panels
- Mix different layout patterns inconsistently
- Forget to set `isPanelOpen` state
- Create custom panel components
- Use panels for alerts or confirmations (use Dialog for those)

### When to Use What

| Use Case | Layout | Component |
|----------|--------|-----------|
| List of items | `PageLayout` | `GenericTableListCardView` |
| Detail with tabs | `PageLayout` | `EntityHome` + segments |
| Page with side panel | `ContentLayout` | `GenericPanel` |
| Entity settings segment | N/A | `EntitySettings` (two-panel layout) |
| Simple content page | `PageLayout` | Direct content |
| Modal dialog | N/A | `Dialog` component |
| Alert/Confirm | N/A | `AlertDialog` component |

---

**Related Documentation:**
- [Component Patterns](./component-patterns.md) - GenericPanel and other components
- [Design System](./design-system.md) - Styling layouts
- [Navigation](./navigation.md) - Setting up routes
