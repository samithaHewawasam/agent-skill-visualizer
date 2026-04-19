# Navigation - IntelliOps

This document covers routing setup and left menu configuration.

---

## Table of Contents

- [Adding Routes](#adding-routes)
- [Adding Left Menu Items](#adding-left-menu-items)
- [Route Patterns](#route-patterns)
- [Complete Example](#complete-example)

---

## Adding Routes

Routes are configured in `src/Routes.tsx`. Follow this pattern for adding new routes.

### Step 1: Add SubPaths to Constants

Add your route's sub-paths to `src/constants/constants.ts`:

```tsx
// src/constants/constants.ts

// Existing
export const ApplicationSubPaths = ['overview', 'members', 'settings'];
export const ProductSubPaths = ['design', 'capabilities', 'settings'];

// Add new
export const FeatureSubPaths = ['dashboard', 'analytics', 'settings'];
```

### Step 2: Create Route Function in Routes.tsx

Import your SubPaths and page components:

```tsx
// src/Routes.tsx
import { FeatureSubPaths } from "./constants/constants";
import { FeatureList, FeatureHome } from "./pages/Feature";
```

Create a route function:

```tsx
const featureRoutes = () => (
  <>
    {/* List page */}
    <Route path="/features" element={<FeatureList />} />

    {/* Detail page with segments */}
    {createRoutesWithConversation(
      "/features/:entityUId",
      <FeatureHome />,
      FeatureSubPaths
    )}
  </>
);
```

### Step 3: Add to BaseLayout

Add your route function to the BaseLayout component:

```tsx
const BaseLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Existing routes */}
        {homeRoutes()}
        {applicationRoutes()}
        {productRoutes()}

        {/* Add new routes */}
        {featureRoutes()}

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
```

---

## Route Patterns

### Pattern Overview

```tsx
// List page
/features                          → FeatureList component

// Detail page (default segment)
/features/:entityUId               → FeatureHome (shows default segment)

// Detail page (specific segment)
/features/:entityUId/dashboard     → FeatureHome (shows dashboard segment)
/features/:entityUId/analytics     → FeatureHome (shows analytics segment)
/features/:entityUId/settings      → FeatureHome (shows settings segment)
```

### createRoutesWithConversation

This helper creates routes for detail pages with segments and floating chat support.

```tsx
createRoutesWithConversation(
  basePath: string,           // e.g., "/features/:entityUId"
  element: React.ReactElement, // e.g., <FeatureHome />
  subPaths: string[]          // e.g., ['dashboard', 'analytics', 'settings']
)
```

**Generated Routes:**

```tsx
// With FeatureSubPaths = ['dashboard', 'analytics', 'settings']

/features/:entityUId
/features/:entityUId/dashboard
/features/:entityUId/analytics
/features/:entityUId/settings

// Each route renders <FeatureHome /> which handles segment display
```

### Simple Routes (No Segments)

For pages without segments:

```tsx
const settingsRoutes = () => (
  <>
    <Route path="/settings" element={<Settings />} />
    <Route path="/settings/account" element={<AccountSettings />} />
    <Route path="/settings/billing" element={<BillingSettings />} />
  </>
);
```

---

## Page Components Structure

### List Page Component

```tsx
// src/pages/Feature/FeatureList.tsx
import { PageLayout } from 'layouts/PageLayout';
import GenericTableListCardView from '@components/TableListCard/GenericTableListCardView';
import { Layers } from 'lucide-react';

export const FeatureList = () => {
  return (
    <PageLayout
      title="Features"
      subtitle="Manage product features"
      icon={Layers}
      fullHeight
    >
      <GenericTableListCardView {...props} />
    </PageLayout>
  );
};
```

### Detail Page Component (with Segments)

```tsx
// src/pages/Feature/FeatureHome.tsx
import { PageLayout } from 'layouts/PageLayout';
import { EntityHome } from '@components/Entity/EntityHome';
import { EntityTypes } from '@constants/enums';
import { useParams } from 'react-router-dom';
import { Layers, Home, Activity, Settings } from 'lucide-react';

// Import segment components
import { FeatureDashboard } from './segments/FeatureDashboard';
import { FeatureAnalytics } from './segments/FeatureAnalytics';
import { FeatureSettings } from './segments/FeatureSettings';

export const FeatureHome = () => {
  const { entityUId } = useParams();
  const { data } = useGetFeature(entityUId);

  const segments = [
    {
      label: 'Dashboard',
      key: 'dashboard',
      segmentPath: 'dashboard',
      icon: Home,
      component: FeatureDashboard,
      isDefault: true,  // This is the default segment
    },
    {
      label: 'Analytics',
      key: 'analytics',
      segmentPath: 'analytics',
      icon: Activity,
      component: FeatureAnalytics,
    },
    {
      label: 'Settings',
      key: 'settings',
      segmentPath: 'settings',
      icon: Settings,
      component: FeatureSettings,
    },
  ];

  return (
    <PageLayout
      title={data?.name || 'Loading...'}
      subtitle={data?.uid}
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

### Index File

```tsx
// src/pages/Feature/index.ts
export { FeatureList } from './FeatureList';
export { FeatureHome } from './FeatureHome';
```

---

## Adding Left Menu Items

Left menu items are configured in `src/layouts/LeftMenu/LeftMenu.tsx`.

### Step 1: Add to DrawerMenu Enum

Add your menu item to `src/constants/enums.ts`:

```tsx
// src/constants/enums.ts
export enum DrawerMenu {
  Home = 'Home',
  Application = 'Application',
  Product = 'Product',
  Feature = 'Feature',      // Add new item
  Workspace = 'Workspace',
  Connector = 'Connector',
  // ... other items
}
```

### Step 2: Add Entity Type Mapping

In `LeftMenu.tsx`, add to `menuToEntityType` mapping:

```tsx
// src/layouts/LeftMenu/LeftMenu.tsx

const menuToEntityType: Record<DrawerMenu, string> = {
  [DrawerMenu.Home]: '',
  [DrawerMenu.Application]: 'application',
  [DrawerMenu.Product]: 'product',
  [DrawerMenu.Feature]: 'feature',          // Add mapping
  [DrawerMenu.Workspace]: 'workspace',
  // ... other mappings
};
```

### Step 3: Add Path Mapping

Add to `pathMap` for route highlighting:

```tsx
const pathMap: Record<string, DrawerMenu> = {
  "/home": DrawerMenu.Home,
  "/applications": DrawerMenu.Application,
  "/products": DrawerMenu.Product,
  "/features": DrawerMenu.Feature,          // Add path
  "/workspaces": DrawerMenu.Workspace,
  // ... other paths
};
```

### Step 4: Add Menu Item

Add the menu item using `renderDrawerMenuItem`:

```tsx
// In the menu items section
{renderDrawerMenuItem(
  DrawerMenu.Feature,
  "Features",
  LucideIcon.Layers,
  false,
  isCollapsed,
  "Link"  // "Link" for simple navigation or "Drawer" for recent items
)}
```

### Menu Item Types

**"Link" Type** - Simple navigation:

```tsx
{renderDrawerMenuItem(
  DrawerMenu.Feature,
  "Features",
  LucideIcon.Layers,
  false,
  isCollapsed,
  "Link"
)}
```

**"Drawer" Type** - Shows recent items:

```tsx
{renderDrawerMenuItem(
  DrawerMenu.Application,
  "Applications",
  LucideIcon.Application,
  false,
  isCollapsed,
  "Drawer"
)}
```

### Step 5: Configure Drawer (if using "Drawer" type)

If using "Drawer" type, add configuration in `renderDynamicDrawer`:

```tsx
const renderDynamicDrawer = () => {
  switch (activeDrawer) {
    case DrawerMenu.Application:
      return (
        <DynamicDrawer
          title="Applications"
          entityType="application"
          onClose={closeDrawer}
        />
      );

    case DrawerMenu.Feature:  // Add case
      return (
        <DynamicDrawer
          title="Features"
          entityType="feature"
          onClose={closeDrawer}
        />
      );

    // ... other cases
  }
};
```

---

## Available Icons

Common icons from Lucide (import as `LucideIcon`):

```tsx
import * as LucideIcon from 'lucide-react';

// Available icons:
LucideIcon.Home          // Home
LucideIcon.Application   // Applications (if exists, otherwise use AppWindow)
LucideIcon.AppWindow     // Applications
LucideIcon.Workspace     // Workspace (if exists, otherwise use Building2)
LucideIcon.Building2     // Workspace
LucideIcon.Box           // Features
LucideIcon.Layers        // Features (alternative)
LucideIcon.Cloud         // Cloud/Services
LucideIcon.Plug          // Connectors
LucideIcon.Database      // Database
LucideIcon.Settings      // Settings
LucideIcon.Lock          // Security
LucideIcon.CreditCard    // Billing
LucideIcon.Activity      // Analytics
LucideIcon.Users         // Members/Team
LucideIcon.Package       // Products
```

---

## Complete Example

### Adding a "Projects" Feature

**1. Constants (constants.ts):**

```tsx
export const ProjectSubPaths = ['overview', 'tasks', 'settings'];
```

**2. Enum (enums.ts):**

```tsx
export enum DrawerMenu {
  // ... existing
  Project = 'Project',
}
```

**3. Routes (Routes.tsx):**

```tsx
import { ProjectSubPaths } from "./constants/constants";
import { ProjectList, ProjectHome } from "./pages/Project";

const projectRoutes = () => (
  <>
    <Route path="/projects" element={<ProjectList />} />
    {createRoutesWithConversation("/projects/:entityUId", <ProjectHome />, ProjectSubPaths)}
  </>
);

// In BaseLayout
{projectRoutes()}
```

**4. LeftMenu (LeftMenu.tsx):**

```tsx
// menuToEntityType
[DrawerMenu.Project]: 'project',

// pathMap
"/projects": DrawerMenu.Project,

// Menu item
{renderDrawerMenuItem(
  DrawerMenu.Project,
  "Projects",
  LucideIcon.FolderKanban,
  false,
  isCollapsed,
  "Drawer"
)}

// Drawer config
case DrawerMenu.Project:
  return (
    <DynamicDrawer
      title="Projects"
      entityType="project"
      onClose={closeDrawer}
    />
  );
```

**5. Page Components:**

```tsx
// src/pages/Project/ProjectList.tsx
export const ProjectList = () => (
  <PageLayout title="Projects" icon={FolderKanban} fullHeight>
    <GenericTableListCardView {...props} />
  </PageLayout>
);

// src/pages/Project/ProjectHome.tsx
export const ProjectHome = () => {
  const { entityUId } = useParams();
  const segments = [
    { label: 'Overview', key: 'overview', segmentPath: 'overview', icon: Home, component: ProjectOverview, isDefault: true },
    { label: 'Tasks', key: 'tasks', segmentPath: 'tasks', icon: CheckSquare, component: ProjectTasks },
    { label: 'Settings', key: 'settings', segmentPath: 'settings', icon: Settings, component: ProjectSettings },
  ];

  return (
    <PageLayout
      title={data?.name}
      icon={FolderKanban}
      entityType={EntityTypes.Project}
      entityUId={entityUId}
    >
      <EntityHome entityType={EntityTypes.Project} entityUId={entityUId} segments={segments} />
    </PageLayout>
  );
};

// src/pages/Project/index.ts
export { ProjectList } from './ProjectList';
export { ProjectHome } from './ProjectHome';
```

---

## Navigation Utilities

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/features');
    // or
    navigate(`/features/${featureUid}`);
    // or
    navigate(`/features/${featureUid}/settings`);
  };

  return <Button onClick={handleClick}>Go to Features</Button>;
};
```

### Get Current Route Info

```tsx
import { useParams, useLocation } from 'react-router-dom';

const MyComponent = () => {
  const { entityUId } = useParams();  // Get :entityUId from URL
  const location = useLocation();     // Get current path

  console.log('Entity UID:', entityUId);
  console.log('Current path:', location.pathname);

  return ...;
};
```

### Link Component

```tsx
import { Link } from 'react-router-dom';

<Link to="/features" className="text-primary hover:underline">
  View Features
</Link>

<Link to={`/features/${feature.uid}`}>
  {feature.name}
</Link>
```

---

## Best Practices

### ✅ Do

- Always add SubPaths to constants.ts
- Use `createRoutesWithConversation` for detail pages with segments
- Add proper entity type mappings in LeftMenu
- Use descriptive route paths (kebab-case)
- Set one segment as `isDefault: true`
- Keep route structure consistent across features

### ❌ Don't

- Hard-code sub-paths in Routes.tsx
- Forget to add path mapping in LeftMenu
- Skip entity type mapping
- Use inconsistent route patterns
- Forget to export components from index.ts

---

## Route Patterns Reference

| Pattern | Example | Use Case |
|---------|---------|----------|
| List | `/features` | Display all items |
| Detail | `/features/:entityUId` | Item details (default segment) |
| Segment | `/features/:entityUId/analytics` | Specific segment view |
| Nested | `/features/:entityUId/members/:memberId` | Nested resource |
| Settings | `/settings/account` | Settings pages |
| Action | `/features/new` | Create new item |

---

**Related Documentation:**
- [Layout Patterns](./layout-patterns.md) - Page components for routes
- [Component Patterns](./component-patterns.md) - Components used in pages
- [Project Structure](./project-structure.md) - File organization
