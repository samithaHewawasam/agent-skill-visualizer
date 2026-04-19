# Project Structure - IntelliOps

This document covers the project directory structure, component imports, and organization patterns.

---

## Table of Contents

- [Directory Structure](#directory-structure)
- [Component Imports](#component-imports)
- [Icon Usage](#icon-usage)
- [File Organization Patterns](#file-organization-patterns)

---

## Directory Structure

### Frontend App Overview

```
src/
├── api/                          # API client and hooks
│   ├── httpClient.ts            # Base HTTP client
│   └── hooks/                   # React Query hooks
│       ├── useApplications.ts
│       ├── useFeatures.ts
│       ├── useProducts.ts
│       └── useMembers.ts
│
├── components/                   # Shared components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── statusbadge.tsx
│   │   ├── tooltip.tsx
│   │   └── copyable-label.tsx
│   │
│   ├── Entity/                  # Entity-related components
│   │   └── EntityHome.tsx       # Segment container
│   │
│   ├── FloatingChat/            # Floating chat system
│   │   ├── components/
│   │   │   └── Flow/            # Flow components
│   │   ├── stores/
│   │   │   └── floatingChatStore.ts
│   │   ├── hooks/
│   │   │   └── useFlowState.ts
│   │   └── types/
│   │       └── flow.types.ts
│   │
│   ├── Generics/                # Generic components
│   │   └── GenericCard.tsx      # Card component
│   │
│   ├── Panel/                   # Panel components
│   │   └── GenericPanel.tsx     # Panel component
│   │
│   ├── Settings/                # Settings components
│   │   └── EntitySettings/
│   │
│   └── TableListCard/           # Table/List/Card view
│       ├── GenericTableListCardView.tsx
│       └── TableColumn.tsx
│
├── constants/                    # App constants
│   ├── constants.ts             # SubPaths, general constants
│   ├── enums.ts                 # Enums (DrawerMenu, EntityTypes)
│   └── table-columns.ts         # COLUMN_WIDTHS
│
├── layouts/                      # Layout components
│   ├── ContentLayout.tsx        # Layout with panel support
│   ├── PageLayout.tsx           # Standard page layout
│   ├── LeftMenu/                # Left navigation menu
│   │   └── LeftMenu.tsx
│   └── store.ts                 # Layout state
│
├── pages/                        # Page components
│   ├── Home/
│   │   └── Home.tsx
│   │
│   ├── Application/             # Application feature
│   │   ├── ApplicationList.tsx
│   │   ├── ApplicationHome.tsx
│   │   ├── segments/
│   │   │   ├── ApplicationOverview.tsx
│   │   │   ├── ApplicationMembers.tsx
│   │   │   └── ApplicationSettings.tsx
│   │   ├── components/
│   │   │   ├── ApplicationCard.tsx
│   │   │   └── ApplicationListView.tsx
│   │   ├── store/
│   │   │   └── useApplicationStore.ts
│   │   └── index.ts
│   │
│   ├── Product/                 # Product feature
│   │   ├── ProductList.tsx
│   │   ├── ProductHome.tsx
│   │   ├── Capabilities/
│   │   │   ├── ProductCapabilities.tsx
│   │   │   ├── CapabilityDetails.tsx
│   │   │   └── store/
│   │   │       └── usePRAnalysisStore.ts
│   │   ├── ProductDesign/
│   │   │   ├── FeaturesView.tsx     # React Flow graph
│   │   │   └── components/
│   │   │       ├── FeatureNode.tsx
│   │   │       └── FeatureDetails.tsx
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   └── index.ts
│   │
│   └── Tasks/
│       └── TaskCreationModal.tsx
│
├── types/                        # TypeScript types
│   ├── application.types.ts
│   ├── feature.types.ts
│   ├── product.types.ts
│   ├── common.types.ts
│   └── product-component-types.ts
│
├── utils/                        # Utility functions
│   ├── cn-utils.ts              # Classname utilities
│   └── datetime-util.ts         # Date formatting
│
├── Routes.tsx                    # App routing
└── App.tsx                       # Root component
```

---

## Feature Directory Pattern

Each feature should follow this structure:

```
pages/
└── Feature/                      # Feature name (PascalCase)
    ├── FeatureList.tsx          # List page
    ├── FeatureHome.tsx          # Detail page with segments
    │
    ├── segments/                # Segment components
    │   ├── FeatureOverview.tsx
    │   ├── FeatureMembers.tsx
    │   ├── FeatureAnalytics.tsx
    │   └── FeatureSettings.tsx
    │
    ├── components/              # Feature-specific components
    │   ├── FeatureCard.tsx
    │   ├── FeatureListView.tsx
    │   ├── FeaturePanel.tsx
    │   └── FeatureNode.tsx      # If using React Flow
    │
    ├── store/                   # Feature state (Zustand)
    │   └── useFeatureStore.ts
    │
    ├── types/                   # Feature-specific types
    │   └── feature.types.ts
    │
    └── index.ts                 # Exports
```

### index.ts Pattern

```tsx
// pages/Feature/index.ts
export { FeatureList } from './FeatureList';
export { FeatureHome } from './FeatureHome';
```

---

## Component Imports

### UI Components

Always import UI components from `@components/ui`:

```tsx
import { Button, Input, Textarea } from "@components/ui";
import { cn } from "@utils/cn-utils";
```

### Available UI Components

```tsx
// Form controls
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Select } from "@components/ui/select";
import { Checkbox } from "@components/ui/checkbox";
import { RadioGroup } from "@components/ui/radio-group";
import { Switch } from "@components/ui/switch";

// Feedback
import { Spinner } from "@components/ui/spinner";
import { StatusBadge } from "@components/ui/statusbadge";
import { Toast } from "@components/ui/toast";

// Display
import { CopyableLabel } from "@components/ui/copyable-label";
import { TruncatedText } from "@components/ui/tooltip";
import { Avatar } from "@components/ui/avatar";

// Overlays
import { Dialog } from "@components/ui/dialog";
import { Popover } from "@components/ui/popover";
import { Tooltip } from "@components/ui/tooltip";
```

### Layout Components

```tsx
import { PageLayout } from "layouts/PageLayout";
import { ContentLayout } from "layouts/ContentLayout";
```

### Generic Components

```tsx
import { GenericCard } from "@components/Generics/GenericCard";
import { GenericPanel } from "@components/Panel/GenericPanel";
import GenericTableListCardView from "@components/TableListCard/GenericTableListCardView";
import { TableColumn } from "@components/TableListCard/TableColumn";
```

### Entity Components

```tsx
import { EntityHome } from "@components/Entity/EntityHome";
```

### Utilities

```tsx
import { cn } from "@utils/cn-utils";
import { formatTimeAgo, formatDate } from "utils/datetime-util";
```

### Constants

```tsx
import { COLUMN_WIDTHS } from "@constants/table-columns";
import { EntityTypes, DrawerMenu } from "@constants/enums";
import { ApplicationSubPaths } from "@constants/constants";
```

### Actions

```tsx
import { ItemAction, ItemBulkAction } from "pages/Connectors/components/TableAction";
```

---

## Icon Usage

We use [Lucide React](https://lucide.dev/) for icons.

### Basic Import

```tsx
import { Icon1, Icon2, Icon3 } from "lucide-react";

// Example
import {
  Home,
  AppWindow,
  Users,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
```

### Icon Sizing

```tsx
// Tailwind size classes
<Icon className="size-3" />   // 12px - Tiny (badges, inline)
<Icon className="size-4" />   // 16px - Small (buttons, cards)
<Icon className="size-5" />   // 20px - Medium (card headers)
<Icon className="size-6" />   // 24px - Large (page headers)
<Icon className="size-8" />   // 32px - Extra large (empty states)
```

### Common Icons Reference

```tsx
// Navigation
import { Home, AppWindow, Package, Layers, Box } from "lucide-react";

// Actions
import {
  Plus,           // Create/Add
  Edit2,          // Edit
  Trash2,         // Delete
  Eye,            // View
  EyeOff,         // Hide
  Copy,           // Copy
  Download,       // Download
  Upload,         // Upload
  RefreshCw,      // Refresh
  Save,           // Save
  X,              // Close/Remove
} from "lucide-react";

// Status/Feedback
import {
  CheckCircle2,   // Success
  AlertCircle,    // Warning/Info
  XCircle,        // Error
  Info,           // Information
  HelpCircle,     // Help
  Loader2,        // Loading (with animate-spin)
} from "lucide-react";

// Navigation/UI
import {
  ChevronRight,   // Expand/Next
  ChevronDown,    // Collapse
  ChevronLeft,    // Back/Previous
  ChevronUp,      // Collapse
  MoreVertical,   // More menu (vertical)
  MoreHorizontal, // More menu (horizontal)
  Menu,           // Hamburger menu
  Search,         // Search
  Filter,         // Filter
  Settings,       // Settings
} from "lucide-react";

// People/Team
import {
  Users,          // Members/Team
  User,           // Single user
  UserPlus,       // Add user
  UserMinus,      // Remove user
} from "lucide-react";

// Data/Content
import {
  Database,       // Database
  Cloud,          // Cloud/API
  Plug,           // Connectors
  Link2,          // Link/Connection
  File,           // File
  FileText,       // Document
  Folder,         // Folder
  Image,          // Image
} from "lucide-react";

// Analytics
import {
  Activity,       // Analytics/Activity
  TrendingUp,     // Trending up
  TrendingDown,   // Trending down
  BarChart2,      // Chart
  PieChart,       // Pie chart
} from "lucide-react";

// Features
import {
  Sparkles,       // AI/Magic
  Zap,            // Fast/Quick
  Lock,           // Security/Private
  Unlock,         // Unlocked
  Shield,         // Protection
  Key,            // API Key/Access
} from "lucide-react";
```

### Icon Usage Examples

```tsx
// In button
<Button>
  <Plus className="mr-2 size-4" />
  New Item
</Button>

// In card icon
<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
  <AppWindow className="size-4 text-primary" />
</div>

// Loading spinner
<Loader2 className="size-4 animate-spin" />

// Status icon
<CheckCircle2 className="size-4 text-success" />

// Navigation icon
<ChevronRight className="size-4 text-text-secondary" />
```

### Icon in LeftMenu

Icons in LeftMenu use a namespace import:

```tsx
import * as LucideIcon from "lucide-react";

// Usage
{renderDrawerMenuItem(
  DrawerMenu.Feature,
  "Features",
  LucideIcon.Layers,
  false,
  isCollapsed,
  "Link"
)}
```

---

## File Organization Patterns

### Naming Conventions

```
✅ Good
- PascalCase for components: ApplicationList.tsx, FeatureCard.tsx
- camelCase for utilities: cn-utils.ts, datetime-util.ts
- camelCase for stores: useApplicationStore.ts, useFeatureStore.ts
- camelCase for hooks: useGetApplications.ts
- kebab-case for UI components: button.tsx, status-badge.tsx
- .types.ts suffix for type files: application.types.ts
- .tsx for React components
- .ts for utilities, types, stores

❌ Bad
- application-list.tsx (use ApplicationList.tsx)
- applicationList.tsx (use ApplicationList.tsx)
- Application-List.tsx (use ApplicationList.tsx)
- utils.ts (be specific: datetime-util.ts)
```

### Import Order

```tsx
// 1. External libraries
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 2. Layouts
import { PageLayout } from 'layouts/PageLayout';
import { ContentLayout } from 'layouts/ContentLayout';

// 3. Components (generic → specific)
import { GenericCard } from '@components/Generics/GenericCard';
import { GenericPanel } from '@components/Panel/GenericPanel';
import GenericTableListCardView from '@components/TableListCard/GenericTableListCardView';

// 4. UI Components
import { Button, Input } from '@components/ui';

// 5. Feature-specific components
import { FeatureCard } from './components/FeatureCard';
import { FeatureListView } from './components/FeatureListView';

// 6. Hooks & API
import { useGetFeatures } from '@api/hooks/useFeatures';
import { useFeatureStore } from './store/useFeatureStore';

// 7. Types
import { Feature } from '@types/feature.types';

// 8. Constants
import { COLUMN_WIDTHS } from '@constants/table-columns';
import { EntityTypes } from '@constants/enums';

// 9. Utils
import { cn } from '@utils/cn-utils';
import { formatTimeAgo } from 'utils/datetime-util';

// 10. Icons (last)
import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';
```

### Path Aliases

Common path aliases (configured in tsconfig.json):

```tsx
import { Component } from "@components/...";
import { Layout } from "layouts/...";
import { Page } from "pages/...";
import { Type } from "@types/...";
import { constant } from "@constants/...";
import { util } from "@utils/...";
import { hook } from "@api/hooks/...";
```

---

## Creating a New Feature

Step-by-step guide to creating a new feature following the project structure:

### 1. Create Feature Directory

```bash
mkdir -p src/pages/Feature/{segments,components,store,types}
```

### 2. Create Base Files

```bash
# List page
touch src/pages/Feature/FeatureList.tsx

# Detail page
touch src/pages/Feature/FeatureHome.tsx

# Segments
touch src/pages/Feature/segments/FeatureOverview.tsx
touch src/pages/Feature/segments/FeatureSettings.tsx

# Components
touch src/pages/Feature/components/FeatureCard.tsx
touch src/pages/Feature/components/FeatureListView.tsx

# Store
touch src/pages/Feature/store/useFeatureStore.ts

# Types
touch src/pages/Feature/types/feature.types.ts

# Index
touch src/pages/Feature/index.ts
```

### 3. Add API Hooks

```bash
touch src/api/hooks/useFeatures.ts
```

### 4. Add Types

```bash
touch src/types/feature.types.ts
```

### 5. Add Constants

Update `src/constants/constants.ts`:

```tsx
export const FeatureSubPaths = ['overview', 'settings'];
```

### 6. Add Routes

Update `src/Routes.tsx` (see [Navigation](./navigation.md))

### 7. Add Menu Item

Update `src/layouts/LeftMenu/LeftMenu.tsx` (see [Navigation](./navigation.md))

---

## Best Practices

### ✅ Do

- Follow the established directory structure
- Use path aliases for imports
- Keep components colocated with their feature
- Use consistent naming conventions
- Organize imports by category
- Create index.ts for clean exports
- Use TypeScript for all files

### ❌ Don't

- Create deeply nested directories (max 3 levels)
- Mix naming conventions
- Put everything in a single file
- Skip type definitions
- Use relative imports for cross-feature imports
- Create circular dependencies

---

**Related Documentation:**
- [Component Patterns](./component-patterns.md) - Component structure
- [Layout Patterns](./layout-patterns.md) - Page layouts
- [Navigation](./navigation.md) - Routes and menu
- [API & Types](./api-and-types.md) - API organization
