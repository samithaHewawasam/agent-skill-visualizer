# State Management - IntelliOps

This document covers state management patterns using Zustand and integration with the FloatingChat store.

---

## Table of Contents

- [Zustand Store Pattern](#zustand-store-pattern)
- [FloatingChat Store](#floatingchat-store)
- [Best Practices](#best-practices)

---

## Zustand Store Pattern

We use [Zustand](https://github.com/pmndrs/zustand) for state management. It's lightweight, simple, and doesn't require providers.

### Basic Store Structure

```tsx
import { create } from 'zustand';

interface StoreState {
  // State properties
  selectedItem: Item | null;
  isLoading: boolean;
  items: Item[];

  // Actions (functions that modify state)
  setSelectedItem: (item: Item | null) => void;
  setLoading: (loading: boolean) => void;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  selectedItem: null,
  isLoading: false,
  items: [],

  // Actions
  setSelectedItem: (item) => set({ selectedItem: item }),
  setLoading: (loading) => set({ isLoading: loading }),
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((item) => item.id !== itemId)
  })),
  reset: () => set({
    selectedItem: null,
    isLoading: false,
    items: [],
  }),
}));
```

### Using the Store in Components

```tsx
import { useStore } from './store/useMyStore';

const MyComponent = () => {
  // Select specific state (component only re-renders when these change)
  const selectedItem = useStore((state) => state.selectedItem);
  const isLoading = useStore((state) => state.isLoading);

  // Select actions
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  const addItem = useStore((state) => state.addItem);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div onClick={() => handleSelect(item)}>
          {selectedItem?.name}
        </div>
      )}
    </div>
  );
};
```

### Multiple State Selectors

```tsx
// ✅ Good - Selects only what's needed
const MyComponent = () => {
  const selectedItem = useStore((state) => state.selectedItem);
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  // Component only re-renders when selectedItem changes
};

// ❌ Bad - Selects entire state
const MyComponent = () => {
  const store = useStore();
  // Component re-renders on ANY state change
};
```

### Store File Location

```
src/
└── pages/
    └── Product/
        ├── ProductDesign/
        │   ├── FeaturesView.tsx
        │   └── store/
        │       └── useFeatureStore.ts
        └── Capabilities/
            ├── ProductCapabilities.tsx
            └── store/
                └── usePRAnalysisStore.ts
```

---

## Common Store Patterns

### Feature Store Example

```tsx
import { create } from 'zustand';

interface Feature {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  expanded?: boolean;
}

interface FeatureStoreState {
  // Selection
  selectedFeature: Feature | null;
  setSelectedFeature: (feature: Feature | null) => void;

  // Panel state
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;

  // Expansion state
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;

  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useFeatureStore = create<FeatureStoreState>((set, get) => ({
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),

  isPanelOpen: false,
  setIsPanelOpen: (open) => set({ isPanelOpen: open }),

  expandedIds: new Set(),
  toggleExpanded: (id) => set((state) => {
    const newExpanded = new Set(state.expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    return { expandedIds: newExpanded };
  }),
  expandAll: () => {
    // Logic to get all IDs and expand them
    set({ expandedIds: new Set(allIds) });
  },
  collapseAll: () => set({ expandedIds: new Set() }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
```

### Usage in React Flow

```tsx
import { useFeatureStore } from './store/useFeatureStore';

const FeaturesView = () => {
  const selectedFeature = useFeatureStore((state) => state.selectedFeature);
  const setSelectedFeature = useFeatureStore((state) => state.setSelectedFeature);
  const isPanelOpen = useFeatureStore((state) => state.isPanelOpen);
  const setIsPanelOpen = useFeatureStore((state) => state.setIsPanelOpen);
  const expandedIds = useFeatureStore((state) => state.expandedIds);
  const toggleExpanded = useFeatureStore((state) => state.toggleExpanded);

  const handleNodeClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsPanelOpen(true);
  };

  return (
    <ContentLayout
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panel={<FeaturePanel />}
    >
      <ReactFlow nodes={nodes} edges={edges} />
    </ContentLayout>
  );
};
```

### Filter/Search Store Example

```tsx
interface FilterStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;

  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;

  clearFilters: () => void;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  selectedStatus: [],
  setSelectedStatus: (status) => set({ selectedStatus: status }),

  dateRange: { start: null, end: null },
  setDateRange: (range) => set({ dateRange: range }),

  clearFilters: () => set({
    searchQuery: '',
    selectedStatus: [],
    dateRange: { start: null, end: null },
  }),
}));
```

---

## FloatingChat Store

The FloatingChat store manages the AI chat interface state.

### Import

```tsx
import { useFloatingChatStore } from "@components/FloatingChat/stores/floatingChatStore";
```

### Available Methods

```tsx
const {
  // Opening/closing
  isVisible,                  // boolean - Chat visibility state
  openWithCommand,           // (command: string, context?: ContextItem[]) => void
  close,                     // () => void

  // Context management
  clearContextItems,         // () => void
  addContextItem,            // (item: ContextItem) => void
  removeContextItem,         // (itemId: string) => void

  // Command management
  setSelectedCommand,        // (command: string) => void - Set command without opening
} = useFloatingChatStore();
```

### Context Item Type

```typescript
interface ContextItem {
  id: string;
  type: 'product' | 'application' | 'feature' | 'subfeature' | 'custom';
  label: string;
  entityId?: string;
}
```

### Usage Examples

**Open Chat with Command:**

```tsx
import { useFloatingChatStore } from "@components/FloatingChat/stores/floatingChatStore";

const FeatureCard = ({ feature }) => {
  const { openWithCommand, addContextItem } = useFloatingChatStore();

  const handleAIAnalysis = () => {
    // Add context
    addContextItem({
      id: feature.id,
      type: 'feature',
      label: feature.name,
      entityId: feature.uid,
    });

    // Open chat with command
    openWithCommand('analyze-feature');
  };

  return (
    <GenericCard
      title={feature.name}
      onClick={handleAIAnalysis}
    />
  );
};
```

**Clear Context Before Adding New:**

```tsx
const handleNewAnalysis = (item) => {
  const { clearContextItems, addContextItem, openWithCommand } = useFloatingChatStore.getState();

  // Clear previous context
  clearContextItems();

  // Add new context
  addContextItem({
    id: item.id,
    type: 'application',
    label: item.name,
    entityId: item.uid,
  });

  // Open chat
  openWithCommand('analyze-app');
};
```

**Set Command Without Opening:**

```tsx
const CommandSelector = () => {
  const setSelectedCommand = useFloatingChatStore((state) => state.setSelectedCommand);

  return (
    <select onChange={(e) => setSelectedCommand(e.target.value)}>
      <option value="analyze">Analyze</option>
      <option value="generate">Generate</option>
      <option value="refactor">Refactor</option>
    </select>
  );
};
```

**Check Visibility:**

```tsx
const MyComponent = () => {
  const isVisible = useFloatingChatStore((state) => state.isVisible);

  return (
    <div>
      {isVisible && <div>Chat is open</div>}
    </div>
  );
};
```

### Integration with Panels

```tsx
const FeaturePanel = () => {
  const feature = useFeatureStore((state) => state.selectedFeature);
  const { openWithCommand, addContextItem, clearContextItems } = useFloatingChatStore();

  const handleAskAI = () => {
    clearContextItems();
    addContextItem({
      id: feature.id,
      type: 'feature',
      label: feature.name,
      entityId: feature.uid,
    });
    openWithCommand('improve-feature');
  };

  return (
    <GenericPanel title="Feature Details" onClose={handleClose}>
      <div className="p-6">
        <Button onClick={handleAskAI} variant="outline">
          <Sparkles className="mr-2 size-4" />
          Ask AI
        </Button>
      </div>
    </GenericPanel>
  );
};
```

---

## Best Practices

### ✅ Do

- Create stores at the feature/page level (colocate with components)
- Use TypeScript interfaces for type safety
- Select only the state you need in components
- Provide clear action names (setX, addX, removeX, toggleX)
- Include a reset() action for cleanup
- Use `get()` parameter for accessing state within actions

### ❌ Don't

- Create global stores for everything (keep state local when possible)
- Select entire store in components (causes unnecessary re-renders)
- Mutate state directly (always use set())
- Put derived state in the store (compute in components or use selectors)
- Use stores for server data (use React Query instead)

### State Management Decision Tree

```
Need to share state?
├─ Between components in same feature?
│  └─ ✅ Use Zustand store
├─ Between different features/pages?
│  └─ ✅ Use global Zustand store or URL state
├─ Server data (API)?
│  └─ ✅ Use React Query (see api-and-types.md)
└─ Component-only state?
   └─ ✅ Use useState/useReducer
```

### Example: Local vs Store State

```tsx
// ✅ Good - Local state for UI-only concerns
const MyComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Use store for shared state
  const selectedItem = useStore((state) => state.selectedItem);

  return ...;
};

// ❌ Bad - Don't put UI-only state in stores
interface StoreState {
  isHovered: boolean;        // ❌ Local to component
  dropdownOpen: boolean;     // ❌ Local to component
  selectedItem: Item | null; // ✅ Shared across components
}
```

### Combining Stores

```tsx
// Can use multiple stores in one component
const FeaturePage = () => {
  // Feature store
  const selectedFeature = useFeatureStore((state) => state.selectedFeature);
  const setSelectedFeature = useFeatureStore((state) => state.setSelectedFeature);

  // Filter store
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

  // FloatingChat store
  const { openWithCommand } = useFloatingChatStore();

  return ...;
};
```

---

## Advanced Patterns

### Computed/Derived State

```tsx
// Use selectors for derived state
const useFilteredItems = () => {
  const items = useStore((state) => state.items);
  const searchQuery = useStore((state) => state.searchQuery);

  return useMemo(() =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [items, searchQuery]
  );
};

// Usage
const MyComponent = () => {
  const filteredItems = useFilteredItems();
  return ...;
};
```

### Async Actions

```tsx
interface StoreState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getItems();
      set({ items: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

### Middleware (Persist)

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist<StoreState>(
    (set) => ({
      // Store definition
    }),
    {
      name: 'my-store', // localStorage key
      partialize: (state) => ({
        // Only persist specific fields
        selectedView: state.selectedView,
        preferences: state.preferences,
      }),
    }
  )
);
```

---

**Related Documentation:**
- [API & Types](./api-and-types.md) - React Query for server state
- [Component Patterns](./component-patterns.md) - Using state in components
- [Specialized Features](./specialized-features.md) - FloatingChat flows
