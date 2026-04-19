# API & Types - IntelliOps

This document covers API patterns using React Query and TypeScript type definitions.

---

## Table of Contents

- [React Query Patterns](#react-query-patterns)
- [TypeScript Types](#typescript-types)
- [Best Practices](#best-practices)

---

## React Query Patterns

We use [React Query (TanStack Query)](https://tanstack.com/query) for server state management, caching, and data fetching.

### Basic Imports

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient, HttpMethod } from '@api/httpClient';
```

---

## Query Hooks

Queries are for fetching data (GET requests).

### Basic Query Hook

```tsx
import { useQuery } from '@tanstack/react-query';
import { httpClient, HttpMethod } from '@api/httpClient';

// Hook definition
export const useGetProduct = (productUId: string) => {
  return useQuery(
    ['product', productUId],  // Query key (for caching)
    () => httpClient(`products/${productUId}`, HttpMethod.Get),
    {
      enabled: !!productUId,  // Only run if productUId exists
    }
  );
};

// Usage in component
const ProductDetail = ({ productUId }) => {
  const { data, isLoading, error, refetch } = useGetProduct(productUId);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return <div>{data.name}</div>;
};
```

### Query with Parameters

```tsx
interface GetApplicationsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
}

export const useGetApplications = (params: GetApplicationsParams) => {
  return useQuery(
    ['applications', params],  // Include params in key for proper caching
    () => httpClient('applications', HttpMethod.Get, undefined, { params }),
    {
      keepPreviousData: true,  // Show old data while fetching new
    }
  );
};

// Usage
const ApplicationsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetApplications({
    page,
    pageSize: 20,
    search,
  });

  return ...;
};
```

### Dependent Queries

```tsx
// Second query depends on first query's result
const FeatureDetail = ({ featureUId }) => {
  // First query
  const { data: feature } = useGetFeature(featureUId);

  // Second query (only runs when feature.productUId exists)
  const { data: product } = useGetProduct(feature?.productUId, {
    enabled: !!feature?.productUId,
  });

  return ...;
};
```

### Query with Polling

```tsx
export const useGetTaskStatus = (taskId: string) => {
  return useQuery(
    ['task-status', taskId],
    () => httpClient(`tasks/${taskId}/status`, HttpMethod.Get),
    {
      refetchInterval: 5000,  // Poll every 5 seconds
      refetchIntervalInBackground: false,  // Stop when tab inactive
    }
  );
};
```

---

## Mutation Hooks

Mutations are for modifying data (POST, PUT, PATCH, DELETE requests).

### Basic Mutation Hook

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateFeatureData) =>
      httpClient('features', HttpMethod.Post, data),
    {
      onSuccess: () => {
        // Invalidate and refetch queries
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};

// Usage in component
const CreateFeatureForm = () => {
  const createFeature = useCreateFeature();

  const handleSubmit = async (data) => {
    try {
      await createFeature.mutateAsync(data);
      toast.success('Feature created!');
      navigate('/features');
    } catch (error) {
      toast.error('Failed to create feature');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button
        type="submit"
        disabled={createFeature.isLoading}
      >
        {createFeature.isLoading ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
};
```

### Update Mutation

```tsx
interface UpdateFeatureData {
  uid: string;
  name?: string;
  description?: string;
}

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uid, ...data }: UpdateFeatureData) =>
      httpClient(`features/${uid}`, HttpMethod.Put, data),
    {
      onSuccess: (data, variables) => {
        // Invalidate specific query
        queryClient.invalidateQueries(['feature', variables.uid]);
        // Invalidate list query
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};
```

### Delete Mutation

```tsx
export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (featureUid: string) =>
      httpClient(`features/${featureUid}`, HttpMethod.Delete),
    {
      onSuccess: (data, featureUid) => {
        // Remove from cache
        queryClient.removeQueries(['feature', featureUid]);
        // Refresh list
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};

// Usage
const FeatureCard = ({ feature }) => {
  const deleteFeature = useDeleteFeature();

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await deleteFeature.mutateAsync(feature.uid);
        toast.success('Feature deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  return ...;
};
```

### Optimistic Updates

```tsx
export const useToggleFeatureStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uid, status }: { uid: string; status: string }) =>
      httpClient(`features/${uid}/status`, HttpMethod.Patch, { status }),
    {
      // Optimistically update the UI before the request completes
      onMutate: async ({ uid, status }) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries(['feature', uid]);

        // Snapshot previous value
        const previousFeature = queryClient.getQueryData(['feature', uid]);

        // Optimistically update
        queryClient.setQueryData(['feature', uid], (old: any) => ({
          ...old,
          status,
        }));

        // Return context with snapshot
        return { previousFeature, uid };
      },
      // On error, rollback
      onError: (err, variables, context) => {
        if (context?.previousFeature) {
          queryClient.setQueryData(
            ['feature', context.uid],
            context.previousFeature
          );
        }
      },
      // Always refetch after error or success
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries(['feature', variables.uid]);
      },
    }
  );
};
```

---

## Query Key Patterns

Consistent query key structure for proper caching and invalidation.

### Query Key Structure

```tsx
// Entity list
['features']
['features', { page: 1, search: 'api' }]

// Entity detail
['feature', featureUid]

// Nested resource
['feature', featureUid, 'members']
['application', appUid, 'settings']

// Related data
['feature', featureUid, 'product']
```

### Example API Hook File

```tsx
// src/api/hooks/useFeatures.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient, HttpMethod } from '@api/httpClient';

// List query
export const useGetFeatures = (params?: { page?: number; search?: string }) => {
  return useQuery(
    ['features', params],
    () => httpClient('features', HttpMethod.Get, undefined, { params }),
    {
      keepPreviousData: true,
    }
  );
};

// Detail query
export const useGetFeature = (featureUid: string) => {
  return useQuery(
    ['feature', featureUid],
    () => httpClient(`features/${featureUid}`, HttpMethod.Get),
    {
      enabled: !!featureUid,
    }
  );
};

// Create mutation
export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateFeatureData) =>
      httpClient('features', HttpMethod.Post, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};

// Update mutation
export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uid, ...data }: UpdateFeatureData) =>
      httpClient(`features/${uid}`, HttpMethod.Put, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['feature', variables.uid]);
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};

// Delete mutation
export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (featureUid: string) =>
      httpClient(`features/${featureUid}`, HttpMethod.Delete),
    {
      onSuccess: (data, featureUid) => {
        queryClient.removeQueries(['feature', featureUid]);
        queryClient.invalidateQueries(['features']);
      },
    }
  );
};
```

---

## TypeScript Types

Common type definitions used throughout the application.

### ProductItem

```tsx
interface ProductItem {
  id: string;
  uid?: string;
  name?: string;
  label?: string;
  description?: string;
  type?: string;  // 'product' | 'feature' | 'subfeature'
  parentId?: string;
  expanded?: boolean;
  children?: ProductItem[];
  connectorUId?: string;
  sourceId?: string;
  entityDatasourceExternalId?: string;
}
```

### CapabilityType

```tsx
enum CapabilityType {
  FEATURE = "feature",
  SUB_FEATURE = "subfeature",
  EPIC = "epic",
  STORY = "story",
}
```

### Application

```tsx
interface Application {
  id: string;
  uid: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  metadata?: Record<string, any>;
}
```

### Feature

```tsx
interface Feature {
  id: string;
  uid: string;
  name: string;
  description?: string;
  type: 'feature' | 'subfeature';
  parentId?: string;
  productUId: string;
  status: 'active' | 'planned' | 'deprecated';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
```

### User/Member

```tsx
interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'invited' | 'inactive';
}
```

### Pagination

```tsx
interface PaginationParams {
  page: number;
  pageSize: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
```

### API Response

```tsx
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
```

### Form Data Types

```tsx
// Create
interface CreateFeatureData {
  name: string;
  description?: string;
  type: 'feature' | 'subfeature';
  parentId?: string;
  productUId: string;
  priority?: 'low' | 'medium' | 'high';
}

// Update
interface UpdateFeatureData {
  uid: string;
  name?: string;
  description?: string;
  status?: 'active' | 'planned' | 'deprecated';
  priority?: 'low' | 'medium' | 'high';
}
```

---

## Best Practices

### ✅ Do

- Use React Query for all server data (not Zustand)
- Include all dynamic values in query keys
- Use `enabled` option to control when queries run
- Invalidate queries after mutations
- Use TypeScript for all API types
- Keep API hooks in dedicated files (e.g., `src/api/hooks/useFeatures.ts`)
- Use `keepPreviousData: true` for paginated queries
- Handle loading and error states

### ❌ Don't

- Store server data in Zustand (use React Query)
- Forget to invalidate queries after mutations
- Use inconsistent query key patterns
- Ignore TypeScript errors in API responses
- Mutate query data directly without React Query
- Forget `enabled` option for conditional queries
- Skip error handling

---

## Common Patterns

### List Page with Pagination

```tsx
const ApplicationsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useGetApplications({
    page,
    pageSize: 20,
    search,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <PageLayout title="Applications">
      <GenericTableListCardView
        data={data.data}
        columns={columns}
        pagination={{
          page: data.pagination.page,
          pageSize: data.pagination.pageSize,
          total: data.pagination.total,
          onNextPage: () => setPage(p => p + 1),
          onPreviousPage: () => setPage(p => p - 1),
        }}
      />
    </PageLayout>
  );
};
```

### Detail Page with Dependencies

```tsx
const FeatureDetail = () => {
  const { entityUId } = useParams();

  // Main query
  const { data: feature, isLoading } = useGetFeature(entityUId);

  // Dependent queries
  const { data: product } = useGetProduct(feature?.productUId, {
    enabled: !!feature?.productUId,
  });

  const { data: members } = useGetFeatureMembers(entityUId, {
    enabled: !!entityUId,
  });

  if (isLoading) return <Spinner />;

  return (
    <PageLayout title={feature.name}>
      {/* Content */}
    </PageLayout>
  );
};
```

### Form with Mutation

```tsx
const EditFeaturePanel = ({ feature, onClose }) => {
  const [formData, setFormData] = useState({
    name: feature.name,
    description: feature.description,
  });

  const updateFeature = useUpdateFeature();

  const handleSubmit = async () => {
    try {
      await updateFeature.mutateAsync({
        uid: feature.uid,
        ...formData,
      });
      toast.success('Feature updated');
      onClose();
    } catch (error) {
      toast.error('Failed to update feature');
    }
  };

  return (
    <GenericPanel
      title="Edit Feature"
      onClose={onClose}
      showFooter
      onSubmit={handleSubmit}
      submitDisabled={updateFeature.isLoading || !formData.name}
    >
      <div className="space-y-4 p-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
    </GenericPanel>
  );
};
```

---

## File Organization

```
src/
├── api/
│   ├── httpClient.ts           # Base HTTP client
│   └── hooks/
│       ├── useApplications.ts  # Application API hooks
│       ├── useFeatures.ts      # Feature API hooks
│       ├── useProducts.ts      # Product API hooks
│       └── useMembers.ts       # Member API hooks
└── types/
    ├── application.types.ts
    ├── feature.types.ts
    ├── product.types.ts
    └── common.types.ts
```

---

**Related Documentation:**
- [State Management](./state-management.md) - Zustand for UI state
- [Component Patterns](./component-patterns.md) - Using API data in components
- [Project Structure](./project-structure.md) - File organization
