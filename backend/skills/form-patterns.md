# Form Patterns with React Hook Form

This document outlines the standard patterns for building forms in IntelliOps using `react-hook-form`.

> **Note:** For Claude Code agents, see the comprehensive skill file at `.claude/skills/react-hook-form/SKILL.md` which includes all patterns extracted from the actual codebase.

---

## Table of Contents

1. [Basic Form Setup](#basic-form-setup)
2. [Form with Validation](#form-with-validation)
3. [Form in GenericPanel](#form-in-genericpanel)
4. [Select/Dropdown Fields](#selectdropdown-fields)
5. [File Upload Fields](#file-upload-fields)
6. [Dynamic Fields](#dynamic-fields)
7. [Form State Management](#form-state-management)

---

## 1. Basic Form Setup

### Simple Form Structure

```tsx
import { useForm } from 'react-hook-form';
import { Button, Input } from '@components/ui';

interface FormData {
  name: string;
  email: string;
  description?: string;
}

export const BasicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // API call or mutation
      await saveData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Name *
        </label>
        <Input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-error">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Email *
        </label>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};
```

---

## 2. Form with Validation

### Validation Rules

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  mode: 'onBlur', // Validate on blur
  defaultValues: { /* ... */ },
});

// Required field
<Input
  {...register('name', { required: 'Name is required' })}
/>

// Min/Max length
<Input
  {...register('description', {
    minLength: { value: 10, message: 'Min 10 characters' },
    maxLength: { value: 500, message: 'Max 500 characters' },
  })}
/>

// Pattern matching
<Input
  {...register('email', {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email',
    },
  })}
/>

// Custom validation
<Input
  {...register('username', {
    validate: (value) =>
      value.length >= 3 || 'Username must be at least 3 characters',
  })}
/>
```

---

## 3. Form in GenericPanel

### Pattern for Panel Forms

```tsx
import { useForm } from 'react-hook-form';
import { GenericPanel } from '@components/Panel/GenericPanel';
import { ContentLayout } from 'layouts/ContentLayout';

interface MemberFormData {
  userId: string;
  userName: string;
  userEmail: string;
  role: string;
}

export const MembersPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<MemberFormData>({
    defaultValues: {
      userId: '',
      userName: '',
      userEmail: '',
      role: 'member',
    },
  });

  const handleAddMember = () => {
    setIsAdding(true);
    reset(); // Reset form to defaults
    setIsPanelOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setIsAdding(false);
    reset({
      userId: member.userId,
      userName: member.userName,
      userEmail: member.userEmail,
      role: member.role,
    });
    setIsPanelOpen(true);
  };

  const onSubmit = async (data: MemberFormData) => {
    try {
      if (isAdding) {
        await addMemberMutation.mutateAsync(data);
        toast.success('Member added successfully');
      } else {
        await updateMemberMutation.mutateAsync(data);
        toast.success('Member updated successfully');
      }
      setIsPanelOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error?.message || 'Operation failed');
    }
  };

  return (
    <ContentLayout
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panel={
        <GenericPanel
          title={isAdding ? 'Add Member' : 'Edit Member'}
          onClose={() => {
            setIsPanelOpen(false);
            reset();
          }}
          showFooter
          submitText={isAdding ? 'Add' : 'Update'}
          onSubmit={handleSubmit(onSubmit)}
          submitDisabled={isSubmitting || !isDirty}
        >
          <form className="space-y-4 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                User ID *
              </label>
              <Input
                {...register('userId', { required: 'User ID is required' })}
                placeholder="Enter user ID"
              />
              {errors.userId && (
                <p className="mt-1 text-xs text-error">
                  {errors.userId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Role *
              </label>
              <select
                {...register('role', { required: 'Role is required' })}
                className="w-full rounded-lg border border-border bg-elevation-1 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-xs text-error">{errors.role.message}</p>
              )}
            </div>
          </form>
        </GenericPanel>
      }
    >
      {/* Main content */}
    </ContentLayout>
  );
};
```

---

## 4. Select/Dropdown Fields

### Using Native Select

```tsx
<div>
  <label className="mb-2 block text-sm font-medium text-foreground">
    Status *
  </label>
  <select
    {...register('status', { required: 'Status is required' })}
    className="w-full rounded-lg border border-border bg-elevation-1 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
  >
    <option value="">Select status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
    <option value="archived">Archived</option>
  </select>
  {errors.status && (
    <p className="mt-1 text-xs text-error">{errors.status.message}</p>
  )}
</div>
```

### Using Controller with Custom Select

```tsx
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

<Controller
  name="visibility"
  control={control}
  rules={{ required: 'Visibility is required' }}
  render={({ field }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        Visibility *
      </label>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="internal">Internal</SelectItem>
        </SelectContent>
      </Select>
      {errors.visibility && (
        <p className="mt-1 text-xs text-error">{errors.visibility.message}</p>
      )}
    </div>
  )}
/>
```

---

## 5. File Upload Fields

```tsx
import { Controller } from 'react-hook-form';

const { control, setValue } = useForm<FormData>();
const [preview, setPreview] = useState<string | null>(null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setValue('avatar', file, { shouldDirty: true });
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }
};

<div>
  <label className="mb-2 block text-sm font-medium text-foreground">
    Profile Picture
  </label>
  {preview && (
    <img src={preview} alt="Preview" className="mb-2 size-20 rounded-lg" />
  )}
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="w-full text-sm text-text-secondary file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-600"
  />
</div>
```

---

## 6. Dynamic Fields

### Array of Fields

```tsx
import { useFieldArray } from 'react-hook-form';

interface FormData {
  tags: { value: string }[];
}

const { control, register } = useForm<FormData>({
  defaultValues: {
    tags: [{ value: '' }],
  },
});

const { fields, append, remove } = useFieldArray({
  control,
  name: 'tags',
});

<div className="space-y-2">
  {fields.map((field, index) => (
    <div key={field.id} className="flex gap-2">
      <Input
        {...register(`tags.${index}.value` as const, {
          required: 'Tag is required',
        })}
        placeholder="Enter tag"
      />
      <Button
        type="button"
        variant="ghost"
        onClick={() => remove(index)}
        disabled={fields.length === 1}
      >
        Remove
      </Button>
    </div>
  ))}
  <Button type="button" onClick={() => append({ value: '' })}>
    Add Tag
  </Button>
</div>
```

---

## 7. Form State Management

### Watching Values

```tsx
const { watch, setValue } = useForm<FormData>();

// Watch single field
const name = watch('name');

// Watch multiple fields
const [firstName, lastName] = watch(['firstName', 'lastName']);

// Watch all fields
const formData = watch();

// React to changes
useEffect(() => {
  if (name) {
    setValue('slug', name.toLowerCase().replace(/\s/g, '-'));
  }
}, [name, setValue]);
```

### Resetting Forms

```tsx
const { reset } = useForm<FormData>();

// Reset to default values
reset();

// Reset with new values
reset({
  name: 'John Doe',
  email: 'john@example.com',
});

// Reset specific field
reset({ ...watch(), name: 'New Name' });
```

### Programmatic Validation

```tsx
const { trigger, setError, clearErrors } = useForm<FormData>();

// Validate specific field
await trigger('email');

// Validate all fields
await trigger();

// Set custom error
setError('username', {
  type: 'manual',
  message: 'Username already exists',
});

// Clear errors
clearErrors('username');
```

---

## Best Practices

1. **Always use TypeScript interfaces** for form data
2. **Use `defaultValues`** to initialize form state
3. **Validate on blur** (`mode: 'onBlur'`) for better UX
4. **Reset form** after successful submission
5. **Disable submit button** when `isSubmitting` or form is invalid
6. **Show loading state** during submission
7. **Use `isDirty`** to prevent unnecessary submissions
8. **Clear errors** when panel/modal closes
9. **Use native HTML validation** where possible (type="email", required, etc.)
10. **Keep validation messages user-friendly** and specific

---

## Common Patterns

### Edit vs Create Mode

```tsx
const [isAdding, setIsAdding] = useState(true);
const { reset } = useForm<FormData>();

const handleAdd = () => {
  setIsAdding(true);
  reset({ /* defaults */ });
  setPanelOpen(true);
};

const handleEdit = (item: Item) => {
  setIsAdding(false);
  reset({
    name: item.name,
    email: item.email,
    // ... other fields
  });
  setPanelOpen(true);
};
```

### Error Handling

```tsx
const onSubmit = async (data: FormData) => {
  try {
    await mutation.mutateAsync(data);
    toast.success('Success!');
    setIsPanelOpen(false);
    reset();
  } catch (error: any) {
    // Handle specific field errors
    if (error.fieldErrors) {
      Object.entries(error.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof FormData, {
          type: 'manual',
          message: message as string,
        });
      });
    } else {
      toast.error(error?.message || 'Operation failed');
    }
  }
};
```

---

## Integration with GenericPanel

The `GenericPanel` component should be used with forms like this:

```tsx
<GenericPanel
  title="Form Title"
  onClose={() => {
    setIsPanelOpen(false);
    reset(); // Always reset on close
  }}
  showFooter
  submitText="Save"
  onSubmit={handleSubmit(onSubmit)} // Pass handleSubmit wrapped function
  submitDisabled={isSubmitting || !isDirty}
>
  <form className="space-y-4 p-6">
    {/* Form fields */}
  </form>
</GenericPanel>
```

**Key Points:**
- `onSubmit` prop receives the wrapped `handleSubmit(onSubmit)` function
- `submitDisabled` uses `isSubmitting` and `isDirty` states
- Always `reset()` form when panel closes
- Form fields are wrapped in `<form>` tag with proper spacing

---

## Examples in Codebase

- **Team Members Form**: `src/pages/Teams/segments/TeamMembers.tsx` - Complete example with add/edit modes, validation, and GenericPanel integration
- **Profile Form**: `src/pages/Profile/ProfileUpdate.tsx`
- **Prompt Template**: `src/pages/Prompting/CreatePromptTemplateWizard.tsx`
- **Workspace Creation**: `src/pages/Workspaces/WorkspaceCreate/CreateWorkspaceWizard/Workspacemetaprompts.tsx`
