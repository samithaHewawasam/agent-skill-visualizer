# Design System - IntelliOps

This document covers all design tokens, colors, spacing, and styling conventions used throughout the IntelliOps application.

---

## Table of Contents

- [Elevation System](#elevation-system)
- [Border System](#border-system)
- [Text Colors](#text-colors)
- [Semantic Colors](#semantic-colors)
- [Shadow System](#shadow-system)
- [Spacing Conventions](#spacing-conventions)
- [Complete Reference](#complete-reference)

---

## Elevation System

The elevation system creates visual hierarchy through background colors. Use these instead of arbitrary gray values.

### Background Colors (Elevation)

```css
bg-elevation-0  /* Base canvas background - Page background */
bg-elevation-1  /* Raised surface - Cards, sidebar */
bg-elevation-2  /* Higher surface - Panels, modals, headers */
bg-elevation-3  /* Highest surface - Dropdowns, tooltips, popovers */
```

### Usage Examples

```tsx
// Page background
<div className="bg-elevation-0">
  {/* Content */}
</div>

// Card
<div className="bg-elevation-1 rounded-lg border border-border p-6">
  {/* Card content */}
</div>

// Panel
<div className="bg-elevation-2 rounded-lg border border-border p-6">
  {/* Panel content */}
</div>

// Dropdown
<div className="bg-elevation-3 rounded-lg border border-border shadow-elevation-lg p-2">
  {/* Dropdown items */}
</div>
```

---

## Border System

Consistent border styling for different emphasis levels.

### Border Classes

```css
border-border-subtle   /* Subtle/light borders - Low emphasis dividers */
border-border          /* Default borders - Standard emphasis */
border-border-default  /* Standard borders - Same as border-border */
border-border-strong   /* Emphasized borders - High emphasis */
```

### Usage Examples

```tsx
// Subtle divider
<div className="border-b border-border-subtle" />

// Standard card border
<div className="border border-border rounded-lg">
  {/* Content */}
</div>

// Emphasized section
<div className="border-2 border-border-strong rounded-lg">
  {/* Important content */}
</div>
```

---

## Text Colors

Hierarchy for text content.

### Text Color Classes

```css
text-foreground       /* Primary text - Main headings, important content */
text-text-primary     /* Primary text - Alternative for main content */
text-text-secondary   /* Secondary/muted text - Labels, descriptions */
text-text-tertiary    /* Tertiary/hint text - Placeholders, hints */
```

### Usage Examples

```tsx
// Heading
<h1 className="text-xl font-semibold text-foreground">Page Title</h1>

// Body text
<p className="text-sm text-text-primary">Main content goes here.</p>

// Label
<label className="text-sm text-text-secondary">Field Label</label>

// Hint text
<span className="text-xs text-text-tertiary">Optional hint text</span>
```

---

## Semantic Colors

Use semantic colors for status, actions, and feedback.

### Color Tokens

```css
/* Primary - Main brand actions */
text-primary
bg-primary
bg-primary/10    /* 10% opacity for subtle backgrounds */
bg-primary/5     /* 5% opacity for very subtle backgrounds */
border-primary

/* Info - Informational states */
text-info
bg-info
bg-info/10
border-info

/* Warning - Warning states */
text-warning
bg-warning
bg-warning/10
border-warning

/* Error - Error states */
text-error
bg-error
bg-error/10
border-error

/* Success - Success states */
text-success
bg-success
bg-success/10
border-success

/* Secondary - Secondary actions */
text-secondary
bg-secondary
bg-secondary/10
border-secondary
```

### Usage Examples

```tsx
// Primary button
<button className="bg-primary text-white px-4 py-2 rounded-lg">
  Primary Action
</button>

// Success badge
<span className="bg-success/10 text-success px-2 py-1 rounded text-xs">
  Active
</span>

// Error message
<div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg">
  Error message here
</div>

// Info callout
<div className="bg-info/10 border border-info/20 text-info p-3 rounded-lg">
  Info message here
</div>
```

---

## Shadow System

Elevation shadows for depth and hierarchy.

### Shadow Classes

```css
shadow-elevation-sm   /* Subtle shadow - Small cards, buttons */
shadow-elevation-md   /* Medium shadow - Modals, panels */
shadow-elevation-lg   /* Large shadow - Dropdowns, tooltips */
```

### Usage Examples

```tsx
// Card with subtle shadow
<div className="bg-elevation-1 rounded-lg shadow-elevation-sm">
  {/* Card content */}
</div>

// Modal with medium shadow
<div className="bg-elevation-2 rounded-lg shadow-elevation-md">
  {/* Modal content */}
</div>

// Dropdown with large shadow
<div className="bg-elevation-3 rounded-lg shadow-elevation-lg">
  {/* Dropdown items */}
</div>
```

---

## Spacing Conventions

Consistent spacing patterns throughout the application.

### Standard Spacing Values

```css
/* Content padding */
p-6             /* Main content areas */
p-4             /* Compact content areas */

/* Header/Footer padding */
px-6 py-4       /* Section headers and footers */
px-6 py-3       /* Toolbars and compact headers */

/* Element gaps */
gap-3           /* Small gaps between related elements */
gap-4           /* Standard gaps between elements */
gap-6           /* Large gaps between sections */

/* Stacked content */
space-y-4       /* Standard vertical spacing */
space-y-6       /* Large vertical spacing */
space-y-2       /* Compact vertical spacing */
```

### Usage Examples

```tsx
// Content container
<div className="p-6">
  {/* Content with standard padding */}
</div>

// Header
<header className="px-6 py-4 border-b border-border-subtle">
  {/* Header content */}
</header>

// Form with vertical spacing
<form className="space-y-4">
  <div>{/* Field 1 */}</div>
  <div>{/* Field 2 */}</div>
  <div>{/* Field 3 */}</div>
</form>

// Horizontal layout with gaps
<div className="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## Complete Reference

### Quick Reference Table

| Use Case | Class | Example |
|----------|-------|---------|
| **Backgrounds** | | |
| Page canvas | `bg-elevation-0` | Main page background |
| Cards | `bg-elevation-1` | Card components |
| Panels/Modals | `bg-elevation-2` | Side panels, modals |
| Dropdowns | `bg-elevation-3` | Dropdown menus, tooltips |
| **Text** | | |
| Headings | `text-foreground` | Page titles, section headings |
| Primary text | `text-text-primary` | Body text, main content |
| Labels | `text-text-secondary` | Form labels, descriptions |
| Hints | `text-text-tertiary` | Placeholder text, hints |
| **Borders** | | |
| Subtle | `border-border-subtle` | Light dividers |
| Standard | `border-border` | Default borders |
| Strong | `border-border-strong` | Emphasized borders |
| **Shadows** | | |
| Subtle | `shadow-elevation-sm` | Cards, buttons |
| Medium | `shadow-elevation-md` | Modals, panels |
| Large | `shadow-elevation-lg` | Dropdowns, tooltips |
| **Spacing** | | |
| Content | `p-6` | Main content padding |
| Headers | `px-6 py-4` | Section headers |
| Gaps | `gap-4` | Element spacing |
| Stacked | `space-y-4` | Vertical spacing |

---

## Best Practices

### ✅ Do

- Use elevation tokens for backgrounds (`bg-elevation-1`, `bg-elevation-2`)
- Use semantic colors for status (`text-success`, `bg-error/10`)
- Use text color hierarchy (`text-foreground` → `text-text-primary` → `text-text-secondary`)
- Use consistent spacing (`p-6`, `gap-4`, `space-y-4`)

### ❌ Don't

- Use arbitrary gray values (`bg-gray-100`, `text-gray-600`)
- Use hex colors or RGB values inline
- Mix spacing values inconsistently
- Create custom shadow values

---

## Dark Mode Support

All design tokens automatically support dark mode. The system handles color inversion, so you don't need to write separate dark mode classes.

```tsx
// This works in both light and dark mode automatically
<div className="bg-elevation-1 text-text-primary border border-border">
  Content adapts to theme automatically
</div>
```

---

## Interactive Elements

### Button Sizing

Consistent sizing across all button variants:

```css
/* Size classes */
xs      /* h-7  px-2  text-xs   icon: size-3.5 */
sm      /* h-8  px-3  text-xs   icon: size-4   */
default /* h-9  px-4  text-sm   icon: size-4   */
lg      /* h-10 px-5  text-sm   icon: size-4.5 */
xl      /* h-11 px-6  text-base icon: size-5   */
xxl     /* h-12 px-7  text-base icon: size-5   */

/* Icon-only buttons */
icon    /* size-9  p-0 */
icon-xs /* size-7  p-0 */
icon-sm /* size-8  p-0 */
icon-lg /* size-10 p-0 */
icon-xl /* size-11 p-0 */
```

**Usage:**

```tsx
// Standard button with icon
<Button size="default">
  <Plus className="size-4 mr-2" />
  Add Item
</Button>

// Icon-only button
<Button size="icon" variant="ghost">
  <Settings className="size-4" />
</Button>
```

### Button Variants

```tsx
// Default (primary action)
<Button variant="default">
  bg-gradient-to-r from-primary to-primary/90
  hover:-translate-y-0.5 shadow-elevation-sm hover:shadow-elevation-md
</Button>

// Outline
<Button variant="outline">
  border-0.5 border-border-subtle bg-elevation-2
  hover:bg-elevation-3
</Button>

// Ghost
<Button variant="ghost">
  text-text-secondary hover:bg-elevation-2
  border-0.5 border-transparent
</Button>

// Destructive
<Button variant="destructive">
  bg-gradient-to-r from-error to-error/90
</Button>
```

### Badge Sizing

Consistent sizing for badges and status indicators:

```css
xs /* h-5  px-2   py-0.5 text-xs gap-1   */
sm /* h-6  px-2.5 py-1   text-xs gap-1.5 */
md /* h-7  px-3   py-1   text-xs gap-2   */
lg /* h-8  px-4   py-1.5 text-sm gap-2   */
```

**Pattern:**

```tsx
// Semantic badge pattern (consistent across all variants)
<Badge variant="success">
  bg-success/10 text-success border-success/20 shadow-elevation-sm
</Badge>

<Badge variant="warning">
  bg-warning/10 text-warning border-warning/20 shadow-elevation-sm
</Badge>
```

### Input & Form Fields

**Standard input pattern:**

```tsx
<input className="
  h-9 rounded-lg border-0.5 border-border-subtle bg-elevation-1
  px-4 text-sm text-text-primary
  placeholder:text-text-secondary
  focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20
  disabled:cursor-not-allowed disabled:opacity-50
  transition-all duration-200
" />
```

**Textarea pattern:**

```tsx
<textarea className="
  rounded-lg border-0.5 border-border-subtle bg-elevation-1
  px-4 py-2 text-sm
  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
  transition-all duration-200
" />
```

**Search pattern:**

```tsx
<div className="
  flex w-full items-center gap-2 rounded-lg
  border-0.5 border-border-subtle bg-elevation-1
  transition-all duration-200
  hover:border-border-default
  focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20
">
  {/* Search icon and input */}
</div>
```

---

## Border Patterns

### Hairline Borders

Use `border-0.5` for subtle, hairline borders throughout the UI:

```tsx
// Standard pattern
<div className="border-0.5 border-border-subtle">
  Consistent hairline border
</div>

// With interactive states
<button className="
  border-0.5 border-border-subtle
  hover:border-border-default
  focus:border-primary
">
  Interactive element
</button>
```

### Border States

```css
border-border-subtle      /* Default subtle state */
border-border-default     /* Standard/hover state */
border-border-strong      /* Emphasized state */
border-primary            /* Interactive/focus state */
border-primary/20         /* Subtle primary accent */
border-primary/30         /* Medium primary accent */
```

---

## Focus & State Patterns

### Focus Ring

Standard focus ring pattern for all interactive elements:

```tsx
// For inputs, textareas, selects
focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2

// For buttons and clickable elements
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2

// Minimal focus for inline elements
focus:outline-none focus:ring-1 focus:ring-primary/20
```

### Selection States

**Card/item selection:**

```tsx
// Unselected
<div className="
  border-0.5 border-border-subtle bg-elevation-1
  hover:border-primary/20 hover:bg-elevation-2
">

// Selected
<div className="
  border-0.5 border-primary bg-primary/5
  shadow-[0_0_0_1px_hsl(var(--primary)),0_0_12px_hsla(var(--primary),0.15)]
">
```

### Hover States

Common hover patterns:

```tsx
// Cards
hover:border-primary/30 hover:bg-primary/5 hover:shadow-elevation-sm

// Buttons with lift
hover:-translate-y-0.5 hover:shadow-elevation-md

// Ghost/transparent elements
hover:bg-elevation-2

// Elevated surfaces
hover:bg-elevation-3
```

---

## Gradient Patterns

### Button Gradients

```tsx
// Primary button
bg-gradient-to-r from-primary to-primary/90

// Semantic buttons
bg-gradient-to-r from-success to-success/90
bg-gradient-to-r from-error to-error/90
bg-gradient-to-r from-warning to-warning/90
```

### Background Gradients

```tsx
// Subtle header accent
bg-gradient-to-r from-primary/[0.03] via-transparent to-transparent

// Card hover state
bg-gradient-to-br from-primary/5 via-transparent to-secondary/5

// Empty state backgrounds
bg-gradient-to-br from-primary/20 to-primary/10
```

### Gradient Text

```tsx
<span className="
  bg-gradient-to-r from-primary to-secondary
  bg-clip-text text-transparent
">
  Gradient text
</span>
```

---

## Transition Patterns

Standard transitions used throughout:

```css
transition-all duration-200      /* General state changes */
transition-colors duration-200   /* Color-only changes */
transition-all duration-300      /* Slower animations (cards) */
transition-transform duration-200 /* Movement animations */
```

**Common combinations:**

```tsx
// Button with lift
<button className="
  transition-all duration-200
  hover:-translate-y-0.5
">

// Smooth color transitions
<div className="
  transition-colors duration-200
  hover:bg-elevation-2
">

// Card with shadow
<div className="
  transition-all duration-200
  hover:shadow-elevation-md
">
```

---

## Icon Patterns

### Icon Sizing

Icons should match their container's button/input size:

```css
Button default (h-9)  → icon size-4
Button lg (h-10)      → icon size-4.5
Button xl (h-11)      → icon size-5

Badge xs (h-5)        → icon size-3
Badge sm (h-6)        → icon size-3.5
Badge md/lg           → icon size-4
```

### Icon Wrapper Pattern

Consistent icon container styling:

```tsx
// Default
<div className="
  flex size-9 shrink-0 items-center justify-center rounded-lg
  border-0.5 border-border-subtle bg-elevation-2
">
  <Icon className="size-4 text-text-secondary" />
</div>

// With semantic color
<div className="
  flex size-10 shrink-0 items-center justify-center rounded-lg
  bg-primary/10 border-0.5 border-primary/20
">
  <Icon className="size-5 text-primary" />
</div>
```

---

## Layout Patterns

### Flex with Text Truncation

Standard pattern for flexible text containers:

```tsx
<div className="flex min-w-0 flex-1 items-center gap-3">
  <div className="shrink-0">
    {/* Icon or fixed-width element */}
  </div>
  <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-medium">
      {/* Text that can truncate */}
    </p>
  </div>
</div>
```

**Key classes:**
- `min-w-0` - Allows flex items to shrink below content size
- `flex-1` - Takes remaining space
- `shrink-0` - Prevents shrinking (for icons)
- `truncate` - Adds ellipsis for overflow text

### Card/List Item Structure

Standard structure for list items:

```tsx
<div className="flex items-center justify-between p-4">
  {/* Left: Icon + Content */}
  <div className="flex min-w-0 flex-1 items-center gap-4">
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="size-4 text-primary" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-text-primary">Title</p>
      <p className="truncate text-xs text-text-secondary">Subtitle</p>
    </div>
  </div>

  {/* Right: Actions */}
  <div className="flex shrink-0 items-center gap-2">
    {/* Badges, buttons, etc. */}
  </div>
</div>
```

---

## Typography Patterns

### Label Pattern

Standard form field label:

```tsx
<label className="mb-2 block text-sm font-medium text-foreground">
  Field Name *
  <span className="ml-2 text-xs font-normal text-text-secondary">(optional)</span>
</label>
```

### Section Headings

```tsx
// Main heading
<h2 className="text-base font-semibold text-text-primary">

// Sub-heading
<h3 className="text-sm font-medium text-text-primary">

// Section label (all caps)
<p className="text-xs font-medium tracking-wider uppercase text-text-tertiary">
```

### Text Hierarchy

```tsx
// Primary content
text-sm text-text-primary font-medium

// Secondary content
text-xs text-text-secondary

// Tertiary/hints
text-xs text-text-tertiary

// Monospace (code/IDs)
font-mono text-xs text-text-secondary
```

---

## Code/Copyable Pattern

Standard styling for code blocks and copyable content:

```tsx
<code className="
  rounded-md px-2.5 py-1.5
  bg-elevation-2 border-0.5 border-border-subtle
  font-mono text-xs text-text-secondary
  shadow-elevation-sm
">
  copyable-value
</code>

// With hover state
<div className="group">
  <code className="
    rounded-md px-2.5 py-1.5
    bg-elevation-2 border-0.5 border-border-subtle
    group-hover:bg-elevation-3 group-hover:border-border-default
    transition-colors duration-200
  ">
    hover-me
  </code>
</div>
```

---

## Empty State Pattern

Consistent empty state sizing:

```tsx
// Small
<div className="p-4 space-y-4 max-w-xs">
  <div className="size-12 rounded-xl"> {/* Icon wrapper */}
    <Icon className="size-6" />
  </div>
</div>

// Medium (default)
<div className="p-6 space-y-5 max-w-sm">
  <div className="size-16 rounded-2xl">
    <Icon className="size-8" />
  </div>
</div>

// Large
<div className="p-8 space-y-6 max-w-md">
  <div className="size-20 rounded-2xl">
    <Icon className="size-10" />
  </div>
</div>
```

**Icon wrapper with gradient:**

```tsx
<div className="
  mx-auto flex size-16 items-center justify-center rounded-2xl
  bg-gradient-to-br from-primary/20 to-primary/10
  ring-1 ring-primary/30
  shadow-elevation-md
">
  <Icon className="size-8 text-primary" />
</div>
```

---

## Advanced Patterns

### Multi-line Text Truncation

```tsx
// Single line
<p className="truncate">Long text...</p>

// Multi-line with line-clamp
<p className="line-clamp-2">
  Long text that will be clamped to 2 lines...
</p>

// Using TruncatedText component
<TruncatedText text={longText} className="text-sm" lineClamp={2} />
```

### Selected Item Indicator

Pattern for selected cards with ring:

```tsx
<div className={cn(
  "rounded-xl border-0.5 p-4",
  isSelected
    ? "border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)),0_0_12px_hsla(var(--primary),0.15)]"
    : "border-border-subtle bg-elevation-1"
)}>
```

### Checkbox & Switch States

```tsx
// Checkbox
<input type="checkbox" className="
  size-4 shrink-0 rounded-sm border-0.5 border-primary
  data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
  disabled:cursor-not-allowed disabled:opacity-50
" />

// Switch
<button className="
  inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
  border-2 border-transparent transition-colors
  data-[state=checked]:bg-primary data-[state=unchecked]:bg-elevation-3
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
">
  <span className="
    size-5 rounded-full bg-white shadow-lg
    data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0
    transition-transform
  " />
</button>
```

---

## Complete Pattern Reference

### Quick Pattern Lookup

| Pattern | Classes | Usage |
|---------|---------|-------|
| **Hairline border** | `border-0.5 border-border-subtle` | All borders |
| **Focus ring** | `focus:ring-2 focus:ring-primary/20` | Inputs, buttons |
| **Card selected** | `border-primary bg-primary/5 shadow-[...]` | Selected items |
| **Icon wrapper** | `size-9 rounded-lg bg-primary/10 border-primary/20` | Icon containers |
| **Truncate text** | `min-w-0 flex-1 truncate` | Flexible text |
| **Button lift** | `hover:-translate-y-0.5` | Primary buttons |
| **Transition** | `transition-all duration-200` | State changes |
| **Code block** | `rounded-md px-2.5 py-1.5 bg-elevation-2 font-mono` | Code/IDs |
| **Badge** | `h-6 px-2.5 py-1 bg-[color]/10 text-[color]` | Status badges |
| **Gradient button** | `bg-gradient-to-r from-primary to-primary/90` | Primary actions |

---

**Related Documentation:**
- [Component Patterns](./component-patterns.md) - Using design tokens in components
- [Layout Patterns](./layout-patterns.md) - Page and layout styling
